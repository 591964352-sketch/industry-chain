// scripts/edit_dim_field.js · 精确修改某只 stock 某 dim 字段的某个子字段
//
// 用法:
//   node scripts/edit_dim_field.js <stockCode> <dimKey> <fieldName> <newValue>
//
// 字段名(fieldName)取值:score / trend / tier / reason / evidence / verifiedAt
//   - score: 必须是 1-5 整数
//   - trend: 必须 'up' / 'flat' / 'down'
//   - tier: 允许 primary/broker/media/estimate + L1-L5
//   - reason / evidence:字符串(必须已存在)
//   - verifiedAt:字符串(允许新增到 reason 之后)

'use strict';

const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'data', 'pcb.manual.js');

const VALID_DIMS = ['durability', 'visibility', 'policy', 'supply', 'valuation', 'barrier'];
const VALID_TRENDS = ['up', 'flat', 'down'];
const NUMERIC_FIELDS = new Set(['score']);

const argv = process.argv.slice(2);
if (argv.length < 4) {
  console.error('[ERR] 参数不足');
  console.error('用法: node scripts/edit_dim_field.js <stockCode> <dimKey> <fieldName> <newValue>');
  process.exit(1);
}

const [stockCode, dimKey, fieldName, ...rest] = argv;
const newValueRaw = rest.join(' ');

if (!/^\d{6}$/.test(stockCode)) {
  console.error(`[ERR] stockCode 必须是 6 位数字: ${stockCode}`);
  process.exit(1);
}
if (!VALID_DIMS.includes(dimKey)) {
  console.error(`[ERR] dimKey 必须为 ${VALID_DIMS.join('|')}: ${dimKey}`);
  process.exit(1);
}
if (!['key', 'score', 'trend', 'tier', 'reason', 'evidence', 'verifiedAt'].includes(fieldName)) {
  console.error(`[ERR] fieldName 必须是 key|score|trend|tier|reason|evidence|verifiedAt`);
  process.exit(1);
}

if (fieldName === 'score') {
  const n = Number(newValueRaw);
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    console.error(`[ERR] score 必须是 1-5 整数: ${newValueRaw}`);
    process.exit(1);
  }
}
if (fieldName === 'trend' && !VALID_TRENDS.includes(newValueRaw)) {
  console.error(`[ERR] trend 必须是 up|flat|down: ${newValueRaw}`);
  process.exit(1);
}

// ---------- 单 pass 解析 dims6 数组边界 ----------
const source = fs.readFileSync(FILE, 'utf8');

// 找到 stock + dimKey 的 dims6 块 — 用括号深度跟踪 dim 块
function locateDimBlock(src, stock, dim) {
  // step 1: 找到 'XXXXXX': 出现位置
  const stockKey = `'${stock}':`;
  const stockPositions = [];
  let scanPos = 0;
  while (true) {
    const i = src.indexOf(stockKey, scanPos);
    if (i === -1) break;
    stockPositions.push(i);
    scanPos = i + 1;
  }
  if (stockPositions.length === 0) return { error: `找不到 stock '${stock}'` };

  // step 2: 对每个 stock 位置,验证其后 30KB 内是否有 dims6:[ 且目标 dim 在内
  for (const pos of stockPositions) {
    const window = src.substring(pos, pos + 30000);
    const dIdx = window.indexOf('dims6:[');
    if (dIdx < 0) continue;
    const dims6Abs = pos + dIdx + 'dims6:['.length;

    // step 3: 单 pass 解析 dims6 数组内所有顶层 {key:'X',...} 块
    const blocks = [];
    let i = dims6Abs;
    let depth = 0;
    let inString = false;
    let escape = false;
    let blockStart = -1;
    let lastKeyName = null;

    while (i < src.length) {
      const c = src[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (c === '\\') { escape = true; }
        else if (c === "'") {
          // 检查字符串是否在 "key:'X'," 模式里 — 取其后 5 字符决定这是不是 key
          inString = false;
          // 解析 key 字符串
          if (lastKeyName === null) {
            // 这是 key 字符串
            // 找前一个 '{key:' 位置
            const blockTextSoFar = src.substring(blockStart, i + 1);
            const keyMatch = blockTextSoFar.match(/\{key:'([^']*)'$/);
            if (keyMatch) lastKeyName = keyMatch[1];
          }
        }
        i++; continue;
      }

      if (c === "'") { inString = true; i++; continue; }

      if (c === '{') {
        if (depth === 0) { blockStart = i; lastKeyName = null; }
        depth++;
        i++; continue;
      }
      if (c === '}') {
        depth--;
        if (depth === 0 && blockStart >= 0) {
          const blockText = src.substring(blockStart, i + 1);
          if (lastKeyName) blocks.push({ dimKey: lastKeyName, start: blockStart, end: i + 1, text: blockText });
          blockStart = -1;
          lastKeyName = null;
        }
        i++; continue;
      }
      if (c === ']' && depth === 0) {
        // dims6 结束
        const match = blocks.find((b) => b.dimKey === dim);
        if (match) return { block: match };
        return { error: `stock=${stock} dims6 中无 dim=${dim}(包含: ${blocks.map((b) => b.dimKey).join(',')})` };
      }
      i++;
    }
  }

  return { error: `stock=${stock} 块内找不到 dims6:[ 起点` };
}

const result = locateDimBlock(source, stockCode, dimKey);
if (result.error) {
  console.error(`[ERR] ${result.error}`);
  process.exit(1);
}

const blk = result.block;

// ---------- 解析当前 dim 块中每个字段的当前值 ----------
function parseFields(blockText) {
  const m = {};
  // 用宽松正则解析:key:'x',score:N,trend:'x',tier:'x',[evidence:null,]reason:'...'
  // 顺序固定且唯一
  const patterns = [
    ['key', /^key:'((?:\\'|[^'])*)'/],
    ['score', /^score:(\d+)/],
    ['trend', /^trend:'((?:\\'|[^'])*)'/],
    ['tier', /^tier:'((?:\\'|[^'])*)'/],
    ['evidence', /^evidence:(null|true|false|'((?:\\'|[^'])*)')/],
    ['reason', /^reason:'((?:\\'|[^'])*)'/],
    ['verifiedAt', /^verifiedAt:'((?:\\'|[^'])*)'/],
  ];
  let cursor = 0;
  for (const [name, re] of patterns) {
    // 在 blockText 中找到下一个 ',' 或 '^' 之后开始匹配
    let searchFrom = blockText.indexOf(name + ':');
    if (searchFrom < 0) continue;
    const slice = blockText.substring(searchFrom);
    const mm = slice.match(re);
    if (!mm) continue;
    let v = mm[1];
    if (v === 'null') v = null;
    else if (v === 'true') v = true;
    else if (v === 'false') v = false;
    else if (name === 'score') v = parseInt(v, 10);
    else if (typeof v === 'string' && v[0] === "'") {
      v = v.slice(1, -1).replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    }
    m[name] = v;
  }
  return m;
}

const curFields = parseFields(blk.text);

// ---------- 校验字段是否已存在 ----------
if (!(fieldName in curFields) && fieldName !== 'verifiedAt') {
  console.error(`[ERR] dim 块里没有字段 ${fieldName} (现有字段: ${Object.keys(curFields).join(', ')})`);
  process.exit(1);
}

// ---------- 构造新 dim 块文本 ----------
let newBlockText;
const valEscaped = newValueRaw.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

if (fieldName === 'score') {
  // 替换 score:N 为 score:newValue
  const oldScore = curFields.score;
  const re = new RegExp(`score:${oldScore}(,?)`);
  if (!re.test(blk.text)) {
    console.error(`[ERR-INT] 字段 score anchor 找不到`);
    process.exit(1);
  }
  newBlockText = blk.text.replace(re, `score:${newValueRaw}$1`);
} else if (fieldName in curFields) {
  // 替换已有字段
  const v = curFields[fieldName];
  // 转义回源码形式
  const oldLit = "'" + (v == null ? '' : String(v)).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  const re = new RegExp(`${fieldName}:${oldLit.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(,?)`);
  if (!re.test(blk.text)) {
    console.error(`[ERR-INT] 字段 ${fieldName} anchor 找不到: ${oldLit}`);
    process.exit(1);
  }
  newBlockText = blk.text.replace(re, `${fieldName}:'${valEscaped}'$1`);
} else if (fieldName === 'verifiedAt') {
  // 新增 verifiedAt:在 reason 字段结尾单引号之后、} 之前插入
  // dim 块尾部应该是 'reason_value'}
  // 找最后一个 ',reason:' 块,然后定位其结尾单引号
  // 用 lookahead(?=\}$)允许字符串末尾是 } 而不是 '
  const re = /(reason:'((?:\\'|[^'])*)')(?=\}$)/;
  const m = blk.text.match(re);
  if (!m) {
    console.error('[ERR-INT] 找不到 reason 字段结尾,无法插入 verifiedAt');
    process.exit(1);
  }
  // m.index 是 reason: 起始位置,m[0] 是 reason:'...' 整段
  // 我们要在 m.index + m[0].length 处(即 ' 之后)是 }, 之前
  const insertPos = m.index + m[0].length;
  const before = blk.text.substring(0, insertPos);
  const after = blk.text.substring(insertPos);  // 应该是 }
  newBlockText = before + `,verifiedAt:'${valEscaped}'` + after;
} else {
  console.error(`[ERR] 不支持的字段操作: ${fieldName}`);
  process.exit(1);
}

// ---------- 写回源码 + 语法校验 ----------
const newSource = source.substring(0, blk.start) + newBlockText + source.substring(blk.end);

try {
  new Function(newSource);
} catch (e) {
  console.error(`[ERR] patch 后语法校验失败: ${e.message}`);
  console.error(`  本次未写入文件。请检查 newValue 中的特殊字符。`);
  process.exit(2);
}

fs.writeFileSync(FILE, newSource);

console.log(`[OK] ${stockCode} ${dimKey} ${fieldName}:`);
if (fieldName in curFields) {
  const ov = curFields[fieldName];
  const ovStr = ov == null ? 'null' : String(ov);
  console.log(`     旧值: ${ovStr.substring(0, 60)}${ovStr.length > 60 ? '...' : ''}`);
} else {
  console.log(`     (字段不存在,新增 verifiedAt)`);
}
console.log(`     新值: ${newValueRaw}`);
console.log(`     字符偏移: ${blk.start}-${blk.end}`);
