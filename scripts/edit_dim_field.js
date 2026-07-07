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
//   - tier:字符串(允许新增到 trend 之后,reason 之前)

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

function locateDimBlock(src, stock, dim) {
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

  for (const pos of stockPositions) {
    const window = src.substring(pos, pos + 30000);
    const dIdx = window.indexOf('dims6:[');
    if (dIdx < 0) continue;
    const dims6Abs = pos + dIdx + 'dims6:['.length;

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
          if (lastKeyName === null) {
            const slice = src.substring(blockStart, i + 1);
            const m = slice.match(/\{key:'([^']*)'$/);
            if (m) lastKeyName = m[1];
          }
          inString = false;
        }
        i++; continue;
      }
      if (c === "'") { inString = true; i++; continue; }
      if (c === '{') { if (depth === 0) { blockStart = i; lastKeyName = null; } depth++; i++; continue; }
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
  const patterns = [
    ['key', /^key:'((?:\\'|[^'])*)'/],
    ['score', /^score:(\d+)/],
    ['trend', /^trend:'((?:\\'|[^'])*)'/],
    ['tier', /^tier:'((?:\\'|[^'])*)'/],
    ['evidence', /^evidence:(null|true|false|'((?:\\'|[^'])*)')/],
    ['reason', /^reason:'((?:\\'|[^'])*)'/],
    ['verifiedAt', /^verifiedAt:'((?:\\'|[^'])*)'/],
  ];
  for (const [name, re] of patterns) {
    const searchFrom = blockText.indexOf(name + ':');
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
// verifiedAt / tier / reason 是允许新增的字段(其他字段必须已存在)
if (!(fieldName in curFields) && fieldName !== 'verifiedAt' && fieldName !== 'tier' && fieldName !== 'reason') {
  console.error(`[ERR] dim 块里没有字段 ${fieldName} (现有字段: ${Object.keys(curFields).join(', ')})`);
  process.exit(1);
}

// ---------- 构造新 dim 块文本 ----------
let newBlockText;
const valEscaped = newValueRaw.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

if (fieldName === 'score') {
  // 替换 score:N 为 score:newValue(字面 indexOf 匹配)
  const oldScore = curFields.score;
  const fieldText = `score:${oldScore}`;
  const idx = blk.text.indexOf(fieldText);
  if (idx < 0) {
    console.error(`[ERR-INT] 字段 score anchor 找不到: ${fieldText}`);
    process.exit(1);
  }
  // 找到该 score 字段结尾位置(下一个 , 或 })
  let endIdx = idx + fieldText.length;
  while (endIdx < blk.text.length && blk.text[endIdx] !== ',' && blk.text[endIdx] !== '}') {
    endIdx++;
  }
  newBlockText = blk.text.substring(0, idx) + `score:${newValueRaw}` + blk.text.substring(endIdx);
} else if (fieldName in curFields) {
  // 替换已有字段(字面 indexOf 匹配)
  const v = curFields[fieldName];
  const escapedV = (v == null ? '' : String(v)).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const fieldText = `${fieldName}:'${escapedV}'`;
  const idx = blk.text.indexOf(fieldText);
  if (idx < 0) {
    console.error(`[ERR-INT] 字段 ${fieldName} anchor 找不到: ${fieldText.substring(0, 100)}...`);
    console.error(`  block 末尾 200 字符: ${blk.text.substring(blk.text.length - 200)}`);
    process.exit(1);
  }
  newBlockText = blk.text.substring(0, idx) + `${fieldName}:'${valEscaped}'` + blk.text.substring(idx + fieldText.length);
} else if (fieldName === 'verifiedAt') {
  // 新增 verifiedAt:放在最后一个字段之后(允许 evidence 后 / reason 后)
  // 优先:在 lastIndexOf('}') 之前直接插入
  // verifiedAt 应作为元数据字段放在 dim block 最末尾
  const lastIdx = blk.text.lastIndexOf('}');
  if (lastIdx < 0) {
    console.error('[ERR-INT] 找不到 } 锚点,无法插入 verifiedAt');
    process.exit(1);
  }
  newBlockText = blk.text.substring(0, lastIdx) + `,verifiedAt:'${valEscaped}'` + blk.text.substring(lastIdx);
} else if (fieldName === 'tier') {
  // 新增 tier:把 ',reason: 替换为 ',tier:'VALUE',reason:
  // 这样插入位置自动正确,不需要手动算偏移
  const anchor = "',reason:";
  const idx = blk.text.indexOf(anchor);
  if (idx < 0) {
    console.error('[ERR-INT] 找不到 \',reason: 锚点,无法插入 tier');
    console.error(`  block 末尾 200 字符: ${blk.text.substring(blk.text.length - 200)}`);
    process.exit(1);
  }
  // idx 是 closing single quote 位置;replace 整段 ',reason:
  const replacement = `',tier:'${valEscaped}',reason:`;
  // 用 splice 而非 replace(只替换第一个 occurrence)
  newBlockText = blk.text.substring(0, idx) + replacement + blk.text.substring(idx + anchor.length);
} else if (fieldName === 'reason' && !(fieldName in curFields)) {
  // 新增 reason:在 tier 之后、evidence 之前插入
  // 如果有 evidence:null 字段,用 ',evidence: 替换为 ',reason:'VALUE',evidence:
  // 如果没有 evidence,在 lastIndexOf('}') 之前插入
  let anchorIdx = blk.text.indexOf(',evidence:');
  if (anchorIdx >= 0) {
    newBlockText = blk.text.substring(0, anchorIdx) + `,reason:'${valEscaped}'` + blk.text.substring(anchorIdx);
  } else {
    // 没有 evidence 字段(常见):在 } 前插入
    const lastIdx = blk.text.lastIndexOf('}');
    if (lastIdx < 0) {
      console.error('[ERR-INT] 找不到 } 锚点,无法插入 reason');
      process.exit(1);
    }
    newBlockText = blk.text.substring(0, lastIdx) + `,reason:'${valEscaped}'` + blk.text.substring(lastIdx);
  }
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
  console.log(`     (字段不存在,新增 ${fieldName})`);
}
console.log(`     新值: ${newValueRaw}`);
console.log(`     字符偏移: ${blk.start}-${blk.end}`);
