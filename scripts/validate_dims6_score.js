// scripts/validate_dims6_score.js
// score ↔ §10 模板自动校验脚本(2026-07-02 立)
// 校验规则(对照 CLAUDE.md §10):
//   valuation:
//     5 = PE 分位 <30%
//     4 = 30-50%
//     3 = 50-70%
//     2 = 70-85%
//     1 = >85%
//   supply:尝试从 reason 文本提取量化描述(产能利用率/缺口率/集中扩产)推断理论 score
//
// 反向验证案例(已确认合理):
//   - 300395 菲利华 valuation=1 (历史确认真实合理)
//   - 300476 胜宏科技 valuation=2 但 PE 分位 95.98% 应判 1 (本次审计发现差异)
//
// 输出:差异清单(只报告,不自动改 score)

global.window = {};
global.window.PCB_AUTO = { valuations: {} };
global.window.PCB_MANUAL = {};

let PCB_MANUAL;
try {
  require('../data/pcb.manual.js');
  PCB_MANUAL = global.window.PCB_MANUAL;
} catch (e) {
  console.log('❌ pcb.manual.js 加载失败:', e.message);
  process.exit(1);
}

let PCB_AUTO;
try {
  require('../data/pcb.auto.js');
  PCB_AUTO = global.window.PCB_AUTO;
} catch (e) {
  // pcb.auto.js 可能不存在(本地环境)· 仍可校验,只是 valuation 维度无 PE 数据
  console.log('⚠ pcb.auto.js 加载失败:', e.message);
  console.log('  → valuation 维度无法基于 pePercentile 计算理论 score · 仅 supply 维度校验');
  PCB_AUTO = { valuations: {} };
}

// §10 valuation 5 档规则
function valuationTheoreticalScore(pePercentile) {
  if (pePercentile === null || pePercentile === undefined) return null;
  if (pePercentile < 30) return 5;
  if (pePercentile < 50) return 4;
  if (pePercentile < 70) return 3;
  if (pePercentile < 85) return 2;
  return 1;
}

// supply 维度:从 reason 文本提取关键词推断理论 score
function supplyTheoreticalScore(reason) {
  if (!reason) return null;
  const r = reason;
  // 5 分关键词
  if (/缺口.{0,20}>30%|缺口率.{0,10}>30%|全球.{0,10}仅.{0,5}家|极度紧张|全面缺货/.test(r)) return 5;
  // 4 分关键词
  if (/缺口.{0,20}10-30%|10-30%/.test(r)) return 4;
  // 1 分关键词(严重过剩)
  if (/严重过剩|全面过剩/.test(r)) return 1;
  // 2 分关键词(略过剩 / 集中扩产 / 供给充足)
  if (/略过剩|集中.{0,5}扩产|扩产.{0,10}集中|集中扩产|供给.{0,5}充足|产能.{0,5}集中.{0,5}释放/.test(r)) return 2;
  return null; // 无法判断
}

console.log('==================================================');
console.log('validate_dims6_score · PCB dims6 ↔ §10 规则校验');
console.log('==================================================\n');

const stocks = Object.values(PCB_MANUAL.stocks);
const results = {
  valuation: { checked: 0, ok: 0, diff: 0, skip: 0, diffs: [] },
  supply:    { checked: 0, ok: 0, diff: 0, skip: 0, diffs: [] }
};

stocks.forEach(s => {
  if (!s.code || !s.dims6) return;

  // ─── valuation 维度 ───
  const valDim = s.dims6.find(d => d.key === 'valuation');
  const pePctl = PCB_AUTO.valuations && PCB_AUTO.valuations[s.code]
    ? PCB_AUTO.valuations[s.code].pePercentile
    : null;
  const theoreticalVal = valuationTheoreticalScore(pePctl);

  if (theoreticalVal !== null && valDim) {
    results.valuation.checked++;
    const diff = Math.abs(valDim.score - theoreticalVal);
    if (diff >= 1) {
      results.valuation.diff++;
      results.valuation.diffs.push({
        code: s.code, name: s.name,
        actual: valDim.score, theoretical: theoreticalVal,
        pePercentile: pePctl, diff: diff,
        reason: (valDim.reason || '').substring(0, 50)
      });
    } else {
      results.valuation.ok++;
    }
  } else {
    results.valuation.skip++;
  }

  // ─── supply 维度 ───
  const supDim = s.dims6.find(d => d.key === 'supply');
  const supReason = supDim && supDim.reason;
  const theoreticalSup = supplyTheoreticalScore(supReason);

  if (theoreticalSup !== null && supDim) {
    results.supply.checked++;
    const diff = Math.abs(supDim.score - theoreticalSup);
    if (diff >= 1) {
      results.supply.diff++;
      results.supply.diffs.push({
        code: s.code, name: s.name,
        actual: supDim.score, theoretical: theoreticalSup,
        diff: diff,
        reason: (supReason || '').substring(0, 60)
      });
    } else {
      results.supply.ok++;
    }
  } else {
    results.supply.skip++;
  }
});

// 输出汇总
console.log(`【valuation 维度校验】`);
console.log(`  已校验: ${results.valuation.checked}`);
console.log(`  PASS (差异 <2 档): ${results.valuation.ok}`);
console.log(`  FAIL (差异 ≥2 档): ${results.valuation.diff}`);
console.log(`  跳过 (无 PE 数据): ${results.valuation.skip}`);
console.log();
console.log(`【supply 维度校验】`);
console.log(`  已校验: ${results.supply.checked}`);
console.log(`  PASS (差异 <2 档): ${results.supply.ok}`);
console.log(`  FAIL (差异 ≥2 档): ${results.supply.diff}`);
console.log(`  跳过 (无 reason 或关键词不足): ${results.supply.skip}`);
console.log();

// 输出 FAIL 清单
if (results.valuation.diffs.length > 0) {
  console.log('==================================================');
  console.log('【valuation 差异清单 · 需人工核查】');
  console.log('==================================================');
  results.valuation.diffs.forEach(d => {
    console.log(`  ${d.code} ${d.name}: 实际=${d.actual} / 理论=${d.theoretical} / PE 分位=${d.pePercentile?.toFixed?.(2)}% / 差=${d.diff} 档`);
    console.log(`    reason: ${d.reason}...`);
  });
  console.log();
}

if (results.supply.diffs.length > 0) {
  console.log('==================================================');
  console.log('【supply 差异清单 · 需人工核查】');
  console.log('==================================================');
  results.supply.diffs.forEach(d => {
    console.log(`  ${d.code} ${d.name}: 实际=${d.actual} / 理论=${d.theoretical} / 差=${d.diff} 档`);
    console.log(`    reason: ${d.reason}...`);
  });
  console.log();
}

console.log('==================================================');
console.log(`汇总: ${results.valuation.diff + results.supply.diff} 处差异 · 需人工核查`);
console.log('==================================================');

process.exit(0);