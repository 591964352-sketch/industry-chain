// scripts/verify_commit40.js —— 验证 commit 4.0 修复结果
const fs = require('fs');
global.window = {};

// 加载三个文件
eval(fs.readFileSync('data/pcb.manual.js', 'utf8'));
eval(fs.readFileSync('data/pcb.auto.js', 'utf8'));
eval(fs.readFileSync('data/pcb.js', 'utf8'));

const manual = global.window.PCB_MANUAL.stocks;
const auto = global.window.PCB_AUTO.valuations;
const pcb = global.window.CHAINS.pcb;

console.log('=== commit 4.0 验证报告 ===');
console.log();

// 1) pcb.manual.js stock 总数
const manualCount = Object.keys(manual).length;
console.log('pcb.manual.js stock 总数:', manualCount, '(预期 37)');
console.log('  含 688234?', '688234' in manual, '(预期 false)');
console.log('  含 301150?', '301150' in manual, '(segments[3] 实际正确 code)');

// 2) pcb.auto.js valuation 总数
const autoCount = Object.keys(auto).length;
console.log('pcb.auto.js valuation 总数:', autoCount, '(预期 37)');
console.log('  含 688234?', '688234' in auto, '(预期 false)');

// 3) pcb.js 中 688234 引用
const pcbJsText = fs.readFileSync('data/pcb.js', 'utf8');
const m688234 = pcbJsText.match(/688234/g);
console.log('pcb.js 中 688234 出现次数:', m688234 ? m688234.length : 0, '(预期 2·仅注释)');

// 4) 4 只亏损股确认
const lossStocks = ['600110', '603936', '605006', '688234'];
let lossCount = 0;
lossStocks.forEach(code => {
  if (auto[code] && auto[code].pe_ttm === null) {
    lossCount++;
    console.log('  亏损股 ' + code + ': pe_ttm=null · history 长度=' + (auto[code].pe_history ? auto[code].pe_history.length : 0));
  } else if (code === '688234' && !(code in auto)) {
    console.log('  亏损股 ' + code + ': 已从 auto.js 删除（不在名单中）');
  }
});
console.log('实际亏损股数:', lossCount, '(预期 3)');

// 5) CHAINS.pcb segments stocks 总数
let totalSegStocks = 0;
(pcb.segments || []).forEach((seg, i) => {
  const n = (seg.stocks || []).length;
  totalSegStocks += n;
});
console.log('CHAINS.pcb.segments 总 stocks:', totalSegStocks, '(预期 34)');

// 6) midstream
const midCount = pcb.midstream && pcb.midstream.stocks ? pcb.midstream.stocks.length : 0;
console.log('CHAINS.pcb.midstream stocks:', midCount, '(预期 10)');

// 7) fourQuestions 段位 stocks（按段位分别统计）
console.log('fourQuestions 段位 stocks 数:');
if (pcb.fourQuestions && pcb.fourQuestions.segments) {
  pcb.fourQuestions.segments.forEach((seg, i) => {
    const stocks = seg.stocks || [];
    const has688234 = stocks.some(s => s.code === '688234');
    console.log('  [' + i + '] ' + (seg.name || '?') + ': ' + stocks.length + ' 只' + (has688234 ? ' ⚠️ 还含 688234' : ''));
  });
}

// 8) chokePoints 动态派生（应该不依赖 688234）
console.log('chokePoints 数:', (pcb.chokePoints || []).length, '(预期 5)');

// 9) signalMeta 检查
console.log('signalMeta:', pcb.signalMeta ? '存在' : '缺失');
if (pcb.signalMeta && pcb.signalMeta.stats) {
  console.log('  stats.excluded.loss:', pcb.signalMeta.stats.excluded.loss, '(预期 3)');
}

// 10) formatFromHigh helper 函数
const indexHtmlText = fs.readFileSync('index.html', 'utf8');
console.log();
console.log('--- index.html formatFromHigh helper ---');
console.log('formatFromHigh 函数定义:', indexHtmlText.includes('function formatFromHigh') ? '✓ 存在' : '✗ 缺失');
console.log('L1563 area fromHigh 改造:', indexHtmlText.includes('formatFromHigh(c.valuation.fromHigh)') ? '✓ 已用' : '✗ 未用');

// 11) 单元测试 formatFromHigh 逻辑
console.log();
console.log('--- formatFromHigh 单元测试 ---');
// 在 node 模拟
function formatFromHigh(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') {
    if (!isFinite(v)) return null;
    return '距前高' + (v >= 0 ? '+' : '') + (v * 100).toFixed(1) + '%';
  }
  if (typeof v === 'string') return v;
  return null;
}
const tests = [
  ['null', null, null],
  ['undefined', undefined, null],
  ['number -0.1', -0.1, '距前高-10.0%'],
  ['number -0.15', -0.15, '距前高-15.0%'],
  ['number 0.05', 0.05, '距前高+5.0%'],
  ['number 0', 0, '距前高+0.0%'],
  ['string 旧格式', '距前高-15%', '距前高-15%'],
  ['NaN', NaN, null],
  ['Infinity', Infinity, null]
];
let pass = 0, fail = 0;
tests.forEach(([name, input, expected]) => {
  const actual = formatFromHigh(input);
  if (actual === expected) { pass++; console.log('  ✓ ' + name + ' → ' + actual); }
  else { fail++; console.log('  ✗ ' + name + ' → ' + actual + ' (预期 ' + expected + ')'); }
});
console.log('单元测试:', pass + ' pass / ' + fail + ' fail');

// 12) 5 只卡口 fromHigh 渲染模拟
console.log();
console.log('--- 5 只卡口 fromHigh 渲染模拟 ---');
['601208', '300395', '301217', '002916', '600183'].forEach(code => {
  const v = auto[code];
  if (v) {
    const rendered = formatFromHigh(v.fromHigh);
    console.log('  ' + code + ' fromHigh=' + v.fromHigh + ' → 渲染: "' + rendered + '"');
  }
});

console.log();
console.log('=== 验证结束 ===');
