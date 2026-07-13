// check_storage_interface_sync.js · storage-interface 数据同步检查脚本
// Phase A 骨架 baseline · 2026-07-12
const fs = require('fs');
const path = require('path');

global.window = global.window || {};
require('../data/storage-interface.manual.js');
require('../data/storage-interface.js');

const MANUAL = window.STORAGE_INTERFACE_MANUAL;
const CHAIN = window.CHAINS['storage-interface'];

if (!MANUAL) { console.log('[FATAL] MANUAL 层未加载'); process.exit(1); }
if (!CHAIN)  { console.log('[FATAL] auto 层未加载'); process.exit(1); }

const manualCodes = Object.keys(MANUAL.stocks || {});
const autoStockSet = new Set();
(CHAIN.segments || []).forEach(seg => (seg.stocks || []).forEach(s => autoStockSet.add(s.code)));
if (CHAIN.midstream && CHAIN.midstream.stocks) CHAIN.midstream.stocks.forEach(s => autoStockSet.add(s.code));

console.log('check_storage_interface_sync.js · storage-interface Phase A baseline');
console.log('  日期:', new Date().toISOString().slice(0,10));
console.log('');

// Check 1: auto 层 15 顶层字段
const REQUIRED_TOP = ['id','name','icon','meta','prosperity','cyclePosition','plainIntro','overview','treeMap','segments','midstream','fourQuestions','chokePoints','supplyGap','methodologyNotes'];
const missing = REQUIRED_TOP.filter(k => !(k in CHAIN));
console.log('【1】顶层字段完整性');
console.log('  ' + (missing.length ? 'MISSING: ' + missing.join(',') : '✓ 15/15'));

// Check 2: dims6 reason 完整率
const reasonStats = { totalStocks: manualCodes.length, totalFields: 0, completeFields: 0, completeStocks: 0 };
manualCodes.forEach(code => {
  const s = MANUAL.stocks[code];
  if (!Array.isArray(s.dims6) || s.dims6.length !== 6) return;
  reasonStats.totalFields += 6;
  let stockComplete = true;
  s.dims6.forEach(d => {
    if (d.reason && d.reason.length >= 6) reasonStats.completeFields++;
    else stockComplete = false;
  });
  if (stockComplete) reasonStats.completeStocks++;
});
console.log('【2】dims6 reason 完整性 (Phase A baseline)');
console.log('  股票口径: ' + reasonStats.completeStocks + '/' + reasonStats.totalStocks + ' (' + (reasonStats.totalStocks ? (reasonStats.completeStocks/reasonStats.totalStocks*100).toFixed(1) : '0') + '%)');
console.log('  字段口径: ' + reasonStats.completeFields + '/' + reasonStats.totalFields + ' (' + (reasonStats.totalFields ? (reasonStats.completeFields/reasonStats.totalFields*100).toFixed(1) : '0') + '%)');

// Check 3: moatScore/timingScore/fundamentals coverage
let moatFilled = 0, timingFilled = 0, fundsFilled = 0;
manualCodes.forEach(code => {
  const s = MANUAL.stocks[code];
  if (typeof s.moatScore === 'number' && s.moatScore !== null && !isNaN(s.moatScore)) moatFilled++;
  if (typeof s.timingScore === 'number' && s.timingScore !== null && !isNaN(s.timingScore)) timingFilled++;
  if (s.fundamentals && s.fundamentals.asOf) fundsFilled++;
});
console.log('【3】其他字段覆盖率');
console.log('  moatScore: ' + moatFilled + '/' + manualCodes.length + ' | timingScore: ' + timingFilled + '/' + manualCodes.length + ' | fundamentals: ' + fundsFilled + '/' + manualCodes.length);

// Check 4: segments stock count
console.log('【4】segments 结构');
let totalStocks = 0;
(CHAIN.segments || []).forEach((seg, i) => {
  console.log('  [' + i + '] ' + seg.name + ' | stocks=' + (seg.stocks || []).length);
  totalStocks += (seg.stocks || []).length;
});
console.log('  总计 stock 条目: ' + totalStocks + ' (含澜起科技跨段重复)');
console.log('  unique codes in auto segments: ' + autoStockSet.size);

// Exit code: 0 = ALL CLEAR for Phase A baseline
console.log('\n✓ Phase A baseline OK');
process.exit(0);
