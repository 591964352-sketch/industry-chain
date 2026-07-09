// scripts/check_unique_stock_codes.js
// P0 收官工具(2026-07-09 commit 6.66 立)
// 目的:每次 treeMap 结构变动后,快速核对 unique code+name 组合基线数字
// 用法: node scripts/check_unique_stock_codes.js [chainId]
//   默认 'semicon-equip',可选其他 chainId(如 'pcb')
// 输出:core stocks / treeMap refs / orphan refs / unique code+name 组合 / 较 baseline delta
// baseline 持久化:.claude/scratch/<chainId>-unique-codes-baseline.json

global.window = global;
const fs = require('fs');
const path = require('path');

const chainId = process.argv[2] || 'semicon-equip';
const BASELINE_PATH = path.join(__dirname, '..', '.claude', 'scratch', `${chainId}-unique-codes-baseline.json`);

// 加载 auto 层
try {
  require(`../data/${chainId}.js`);
} catch (e) {
  console.error('[ERR] 加载 data/' + chainId + '.js 失败:', e.message);
  process.exit(1);
}
const CHAIN = global.window.CHAINS[chainId];
if (!CHAIN) {
  console.error('[ERR] chainId "' + chainId + '" 在 window.CHAINS 中未注册');
  process.exit(1);
}

// 加载 manual 层(可能不存在,如 pcb)
let MANUAL = null;
const manualKey = chainId.toUpperCase().replace(/-/g, '_') + '_MANUAL';
try {
  require(`../data/${chainId}.manual.js`);
  MANUAL = global.window[manualKey];
} catch (e) {
  // manual 层可选(单层 chain 不报错)
}

// 收集 core path unique stock codes
function collectCoreCodes() {
  const codes = new Set();
  (CHAIN.segments || []).forEach(s => (s.stocks || []).forEach(st => codes.add(st.code)));
  (CHAIN.midstream.stocks || []).forEach(st => codes.add(st.code));
  (CHAIN.chokePoints || []).forEach(c => codes.add(c.code));
  if (MANUAL && MANUAL.stocks) Object.keys(MANUAL.stocks).forEach(c => codes.add(c));
  return codes;
}
const coreCodes = collectCoreCodes();

// 收集 treeMap refs
const refs = [];
Object.keys(CHAIN.treeMap || {}).forEach(colKey => {
  const col = CHAIN.treeMap[colKey];
  if (!Array.isArray(col)) return;
  col.forEach((node, ni) => {
    if (!node || !Array.isArray(node.companies)) return;
    node.companies.forEach((c, ci) => {
      if (c && c.code) refs.push({
        code: c.code,
        name: c.name,
        loc: colKey + '[' + ni + '(' + (node.name || '?') + ')].companies[' + ci + ']'
      });
    });
  });
});

// 在 coreCodes 找不到 → treeMap orphan
const orphans = refs.filter(r => !coreCodes.has(r.code));

// 按 code+name 组合去重
const grouped = {};
orphans.forEach(r => {
  const k = r.code + '|' + r.name;
  if (!grouped[k]) grouped[k] = [];
  grouped[k].push(r.loc);
});

// baseline 加载/保存
function loadBaseline() {
  try {
    if (fs.existsSync(BASELINE_PATH)) {
      return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
    }
  } catch (e) {}
  return null;
}
function saveBaseline(report) {
  try {
    const dir = path.dirname(BASELINE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(report, null, 2));
    return true;
  } catch (e) {
    return false;
  }
}

const prev = loadBaseline();
const today = new Date().toISOString().slice(0, 10);

let exitCode = 0;

console.log('==================================================');
console.log('check_unique_stock_codes · ' + chainId + ' 链 unique code+name 组合基线核对');
console.log('  生成日期:', today);
console.log('  baseline 路径:', BASELINE_PATH);
console.log('==================================================\n');

console.log('【核心路径 unique stock code 数】:', coreCodes.size);
console.log('【treeMap refs 总数】:', refs.length);
console.log('【treeMap orphan refs(在 coreCodes 找不到)】:', orphans.length);
console.log('【unique code+name 组合(去重后)】:', Object.keys(grouped).length);
console.log();

if (prev) {
  const cur = Object.keys(grouped).length;
  const prevUnique = prev.uniqueCodeNames || 0;
  const delta = cur - prevUnique;
  console.log('=== 与 baseline 对比 ===');
  console.log('  baseline date:', prev.date || '?');
  console.log('  baseline unique code+name:', prevUnique);
  console.log('  current unique code+name:', cur);
  console.log('  delta:', delta >= 0 ? '+' + delta : delta);
  if (delta !== 0) {
    console.log('  [⚠] 有变化,需追查 +' + delta + ' unique 是新增还是减少');
    exitCode = 1;
  } else {
    console.log('  ✓ 与 baseline 一致');
  }
  console.log();
}

console.log('=== unique code+name 组合清单(' + Object.keys(grouped).length + ' 项) ===');
const sortedKeys = Object.keys(grouped).sort();
sortedKeys.forEach((k, i) => {
  const idx = k.indexOf('|');
  const code = k.substring(0, idx);
  const name = k.substring(idx + 1);
  const locs = grouped[k];
  const flag = locs.length > 1 ? ' [×' + locs.length + ']' : '';
  console.log('  ' + String(i + 1).padStart(2, ' ') + '. code=' + code.padEnd(20, ' ') + 'name=' + name.padEnd(10, ' ') + flag);
});

const ok = saveBaseline({
  date: today,
  chainId,
  coreStocks: coreCodes.size,
  treeMapRefs: refs.length,
  orphanRefs: orphans.length,
  uniqueCodeNames: Object.keys(grouped).length,
  uniqueBreakdown: sortedKeys.map(k => {
    const idx = k.indexOf('|');
    return {
      code: k.substring(0, idx),
      name: k.substring(idx + 1),
      refCount: grouped[k].length
    };
  })
});
if (ok) {
  console.log('\n=== baseline 已保存到 ' + BASELINE_PATH + ' ===');
} else {
  console.log('\n[⚠] baseline 持久化失败');
}

process.exit(exitCode);
