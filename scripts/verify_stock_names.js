// scripts/verify_stock_names.js
// stock name 自动校验框架(2026-07-02 commit 6.5 立 · 参数化版)
//
// 动机:601208 / 603519 等历史命名错位问题反复出现,根因是系统从未有过自动化的
//       "code ↔ 官方名称"校验机制。
//
// 复用设计(11 链可复制):
//   - 函数签名包含 chainId / manualKey 参数 · 不硬编码 window.PCB_MANUAL
//   - OFFICIAL_STOCK_NAMES 按 <chainId>_OFFICIAL 命名空间动态派生
//   - chainId 缺省 → 'pcb'(零回归默认)
//   - 校验逻辑纯通用,无链专属业务概念
//
// 反向验证: 用 TEST_MANUAL 全局对象 + TEST_OFFICIAL 命名空间证明 chainId 动态读取
//   (参考 commit 5.7.1 的 TEST_MANUAL 验证方法)
//
// 使用方式:
//   1. 默认 PCB: node scripts/verify_stock_names.js
//   2. 指定链:   node scripts/verify_stock_names.js semi
//   3. 投顾拿到豆包核验结果后,在对应 <chainId>_OFFICIAL 对象填入
//      window.PCB_OFFICIAL = { '601208': '东材科技', ... };

// ──────────── 默认 chainId ────────────
const _chainId = (process.argv[2] || 'pcb').toLowerCase();
const _manualKey = _chainId.toUpperCase() + '_MANUAL';
const _officialKey = _chainId.toUpperCase() + '_OFFICIAL';

// ──────────── window 初始化(支持动态 chainId) ────────────
global.window = global.window || {};
global.window[_manualKey] = global.window[_manualKey] || {};
global.window[_officialKey] = global.window[_officialKey] || {};

// 加载对应 chainId 的数据
let MANUAL = {};
try {
  require('../data/' + _chainId + '.manual.js');
  MANUAL = global.window[_manualKey];
} catch (e) {
  console.log('❌ ' + _manualKey + ' 加载失败:' + e.message);
  console.log('  提示:11 链扩展尚未完成,当前仅 pcb 链支持 manual.js');
  process.exit(1);
}

let CHAINS_DATA = null;
try {
  global.window.CHAINS = global.window.CHAINS || {};
  if (!global.window.CHAINS[_chainId]) {
    require('../data/' + _chainId + '.js');
  }
  CHAINS_DATA = global.window.CHAINS[_chainId];
} catch (e) {
  console.log('❌ data/' + _chainId + '.js 加载失败:' + e.message);
  process.exit(1);
}

const OFFICIAL = global.window[_officialKey] || {};

// ──────────── 多源采集(纯通用,无链专属) ────────────
function collectAllStocks() {
  const map = {};  // code -> [{ source, name }]
  function add(code, name, source) {
    if (!code) return;
    if (!map[code]) map[code] = [];
    map[code].push({ source, name });
  }
  // 1. manual 层
  Object.values(MANUAL.stocks || {}).forEach(s => add(s.code, s.name, 'manual'));
  // 2. data 层 segments
  (CHAINS_DATA.segments || []).forEach((seg, i) => {
    (seg.stocks || []).forEach(s => add(s.code, s.name, 'segments[' + i + ']'));
  });
  // 3. data 层 midstream
  if (CHAINS_DATA.midstream && CHAINS_DATA.midstream.stocks) {
    CHAINS_DATA.midstream.stocks.forEach(s => add(s.code, s.name, 'midstream'));
  }
  // 4. data 层 chokePoints
  (CHAINS_DATA.chokePoints || []).forEach(c => add(c.code, c.name, 'chokePoints'));
  // 5. data 层 referenceChokepoints(海外对标)
  if (CHAINS_DATA.referenceChokepoints) {
    Object.values(CHAINS_DATA.referenceChokepoints).forEach(c => add(c.code, c.name, 'referenceChokepoints'));
  }
  return map;
}

const stockMap = collectAllStocks();
const allCodes = Object.keys(stockMap).sort();

console.log('==================================================');
console.log('verify_stock_names · ' + _chainId + ' 链 stock 完整清单');
console.log('==================================================\n');

console.log('【统计】');
console.log('  chainId:', _chainId);
console.log('  唯一 stock code 数:', allCodes.length);
console.log('  已登记官方名称数:', Object.keys(OFFICIAL).length);
console.log();

// 输出完整清单
console.log('【完整清单 · code + name + 来源】\n');
allCodes.forEach(code => {
  const entries = stockMap[code];
  const uniqueNames = [...new Set(entries.map(e => e.name))];
  const isConflict = uniqueNames.length > 1;
  const marker = isConflict ? '⚠️' : ' ';
  const sources = entries.map(e => e.source).join(' / ');
  console.log(`  ${marker} ${code}  ${uniqueNames.join(' / ')}  (${sources})`);
});

// 名称一致性检查(本地多源)
let nameConflicts = [];
allCodes.forEach(code => {
  const entries = stockMap[code];
  const uniqueNames = [...new Set(entries.map(e => e.name))];
  if (uniqueNames.length > 1) {
    nameConflicts.push({ code, names: uniqueNames });
  }
});

console.log();
console.log('【本地多源名称冲突】');
if (nameConflicts.length === 0) console.log('  (无)');
else nameConflicts.forEach(c => console.log('  ⚠ ' + c.code + ' 本地多 name:' + c.names.join(' vs ')));
console.log();

// 与官方名称比对
let officialMismatches = [];
allCodes.forEach(code => {
  if (OFFICIAL[code]) {
    const official = OFFICIAL[code];
    const localNames = [...new Set(stockMap[code].map(e => e.name))];
    if (!localNames.includes(official)) {
      officialMismatches.push({ code, official, localNames });
    }
  }
});

console.log('【与官方名称比对(' + _officialKey + ')】');
if (Object.keys(OFFICIAL).length === 0) {
  console.log('  ⚠ ' + _officialKey + ' 暂为空,所有 stock 暂未核验');
  console.log('  → 需投顾设计"名称核验"豆包批次,逐只核验后填入');
} else if (officialMismatches.length === 0) {
  console.log('  ✅ 所有已登记官方名称均与本地一致');
} else {
  console.log('  ⚠ 与官方名称不一致:');
  officialMismatches.forEach(m => {
    console.log('    ' + m.code + ' 官方="' + m.official + '" 本地="' + m.localNames.join(' / ') + '"');
  });
}
console.log();

// 输出核验批次建议
console.log('==================================================');
console.log('【核验批次建议 · 供投顾设计豆包提示词】');
console.log('==================================================');
console.log('待核验 stock 数:', allCodes.length);
console.log('已核验 stock 数:', Object.keys(OFFICIAL).length);
console.log();
console.log(`【豆包提示词模板 · 适用 chainId=${_chainId}】`);
console.log(`
【任务】从巨潮资讯网/上交所/公司官网核对以下 A 股 stock 的官方证券简称
【信源严格性】仅使用 L1 一手来源(巨潮 cninfo / 上交所 / 公司官网)
【输出格式】纯 JSON:{ "code": "官方简称" }
【核验清单】${allCodes.length} 只:
${allCodes.slice(0, 5).map(c => `  ${c}  (${[...new Set(stockMap[c].map(e=>e.name))].join('/')})`).join('\n')}
  ... 共 ${allCodes.length} 只
【特别注意】名称必须以 L1 公告/官网为准,不得引用任何媒体或股吧
`);
console.log('==================================================');

const exitCode = (nameConflicts.length > 0 || officialMismatches.length > 0) ? 1 : 0;
console.log('退出码:', exitCode, exitCode === 0 ? '(完全通过)' : '(存在差异)');
process.exit(exitCode);