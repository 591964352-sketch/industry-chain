// scripts/validate_dims6_2cases.js
// 反向验证专用 - 仅校验 2 个已知案例(不扫描全量 38 只)
// 案例 a: 300395 菲利华 valuation=1(已确认真实合理)
// 案例 b: 300476 胜宏科技 valuation=2 但 PE 分位 ~90% 应判 1(本次审计发现差异)

global.window = {};
global.window.PCB_AUTO = { valuations: {} };
global.window.PCB_MANUAL = {};
require('../data/pcb.manual.js');
require('../data/pcb.auto.js');
const PCB_MANUAL = global.window.PCB_MANUAL;
const PCB_AUTO = global.window.PCB_AUTO;

function valuationTheoreticalScore(pePercentile) {
  if (pePercentile === null || pePercentile === undefined) return null;
  if (pePercentile < 30) return 5;
  if (pePercentile < 50) return 4;
  if (pePercentile < 70) return 3;
  if (pePercentile < 85) return 2;
  return 1;
}

const cases = [
  { code: '300395', name: '菲利华', expectDiff: false, desc: '已确认合理的 1 分' },
  { code: '300476', name: '胜宏科技', expectDiff: true, desc: 'PE 分位 >85% 应判 1 但实际 2' }
];

console.log('==================================================');
console.log('validate_dims6_score · 反向验证 2 案例');
console.log('==================================================\n');

cases.forEach(c => {
  const s = PCB_MANUAL.stocks[c.code];
  const valDim = s.dims6.find(d => d.key === 'valuation');
  const pePctl = PCB_AUTO.valuations[c.code]?.pePercentile;
  const theoretical = valuationTheoreticalScore(pePctl);
  const actual = valDim.score;
  const diff = Math.abs(actual - theoretical);
  const isDiff = diff >= 1;

  console.log(`案例 ${c.expectDiff ? 'b' : 'a'}: ${c.code} ${c.name}`);
  console.log(`  描述: ${c.desc}`);
  console.log(`  PE 分位: ${pePctl?.toFixed?.(2)}%`);
  console.log(`  实际 score: ${actual}`);
  console.log(`  理论 score (§10): ${theoretical}`);
  console.log(`  差异: ${diff} 档 (${diff >= 1 ? '≥1 档 → FAIL' : '0 档 → PASS'})`);
  console.log(`  期望: ${c.expectDiff ? '脚本标记为差异' : '脚本不标记为差异'}`);
  console.log(`  实际: ${isDiff ? '标记为差异' : '未标记为差异'}`);
  console.log(`  ${c.expectDiff === isDiff ? '✅ PASS · 脚本判断与期望一致' : '❌ FAIL · 脚本判断与期望不一致'}`);
  console.log();
});

process.exit(0);