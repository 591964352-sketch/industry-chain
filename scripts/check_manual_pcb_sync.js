// scripts/check_manual_pcb_sync.js
// 双层架构(pcb.manual.js ↔ pcb.js)stock 列表自动 diff 校验脚本(2026-07-02 立)
//
// 反向验证案例(已确认合理):
//   - 603519 当前状态:已同步(commit 5.6 补回 manual.js)· 不应再报告为异常
//   - 300179 / 000657 当前状态:悬空(仅 manual.js 有 · pcb.js segments/midstream 无)

global.window = {};
global.window.PCB_MANUAL = {};
require('../data/pcb.manual.js');
const PCB_MANUAL = global.window.PCB_MANUAL;

global.window.CHAINS = global.window.CHAINS || {};
require('../data/pcb.js');
const PCB = global.window.CHAINS.pcb;

// 提取 pcb.js 实际 stock list(segments + midstream + chokePoints 去重)
const pcbStocks = {};  // code -> { name, sources[] }
function addPcb(code, name, source) {
  if (!code) return;
  if (!pcbStocks[code]) pcbStocks[code] = { name, sources: [] };
  else if (name && pcbStocks[code].name !== name) pcbStocks[code].nameConflict = true;
  pcbStocks[code].sources.push(source);
  if (name && !pcbStocks[code].name) pcbStocks[code].name = name;
}

(PCB.segments || []).forEach((seg, i) => {
  (seg.stocks || []).forEach(s => addPcb(s.code, s.name, 'segments[' + i + ']'));
});
if (PCB.midstream && PCB.midstream.stocks) {
  PCB.midstream.stocks.forEach(s => addPcb(s.code, s.name, 'midstream'));
}
(PCB.chokePoints || []).forEach(c => addPcb(c.code, c.name, 'chokePoints'));

// manual.js stock list
const manualStocks = Object.values(PCB_MANUAL.stocks).map(s => ({ code: s.code, name: s.name }));

console.log('==================================================');
console.log('check_manual_pcb_sync · 双层架构 stock 列表 diff');
console.log('==================================================\n');

console.log('【统计】');
console.log('  pcb.manual.js stock 数:', manualStocks.length);
console.log('  pcb.js 唯一 stock 数(segments+midstream+chokePoints):', Object.keys(pcbStocks).length);
console.log();

// name 一致性检查
let nameConflicts = 0;
manualStocks.forEach(m => {
  const p = pcbStocks[m.code];
  if (p && p.name !== m.name) nameConflicts++;
});

console.log('【name 一致性】');
console.log('  名称不一致:', nameConflicts);
console.log();

// 仅 manual.js 有(悬空 stock)
const onlyManual = manualStocks.filter(m => !pcbStocks[m.code]);
console.log('【仅 pcb.manual.js 有(渲染层悬空)】');
if (onlyManual.length === 0) console.log('  (无)');
else onlyManual.forEach(m => console.log('  ' + m.code + ' ' + m.name + '  ← 需评估:是否应补到 pcb.js'));
console.log();

// 仅 pcb.js 有(manual 层缺失)
const onlyPcb = Object.keys(pcbStocks).filter(c => !PCB_MANUAL.stocks[c]);
console.log('【仅 pcb.js 有(manual 层缺失)】');
if (onlyPcb.length === 0) console.log('  (无)');
else onlyPcb.forEach(c => console.log('  ' + c + ' ' + pcbStocks[c].name + '  ← 需评估:是否应补到 manual.js'));
console.log();

// 总结
console.log('==================================================');
const diffCount = onlyManual.length + onlyPcb.length + nameConflicts;
if (diffCount === 0) {
  console.log('✅ 双层架构 stock 列表完全同步');
} else {
  console.log(`⚠ 共 ${diffCount} 处差异:`);
  console.log(`  - 悬空(仅 manual.js): ${onlyManual.length}`);
  console.log(`  - 缺失(仅 pcb.js): ${onlyPcb.length}`);
  console.log(`  - name 不一致: ${nameConflicts}`);
}
console.log('==================================================');

process.exit(diffCount > 0 ? 1 : 0);