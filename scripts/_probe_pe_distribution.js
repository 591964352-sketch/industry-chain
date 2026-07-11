global.window={};require('../data/pcb.auto.js');
const vals = global.window.PCB_AUTO.valuations;
const stats = {
  pePctl_lt50: 0, pePctl_50_70: 0, pePctl_70_90: 0, pePctl_gt90: 0, pePctl_null: 0,
  fromHigh_neg10: 0, fromHigh_neg15: 0, fromHigh_neg05: 0,
  volRatio_lt1_5: 0, volRatio_gt2_0: 0
};
let total = 0;
Object.keys(vals).forEach(code => {
  const v = vals[code]; if (!v) return; total++;
  const pctl = v.pePercentile;
  if (pctl === null || pctl === undefined) stats.pePctl_null++;
  else if (pctl < 50) stats.pePctl_lt50++;
  else if (pctl < 70) stats.pePctl_50_70++;
  else if (pctl < 90) stats.pePctl_70_90++;
  else stats.pePctl_gt90++;
  if (v.fromHigh !== null && v.fromHigh <= -0.05) stats.fromHigh_neg05++;
  if (v.fromHigh !== null && v.fromHigh <= -0.10) stats.fromHigh_neg10++;
  if (v.fromHigh !== null && v.fromHigh <= -0.15) stats.fromHigh_neg15++;
  if (v.volRatio5d !== null && v.volRatio5d <= 1.5) stats.volRatio_lt1_5++;
  if (v.volRatio5d !== null && v.volRatio5d > 2.0) stats.volRatio_gt2_0;
});
console.log('当前 38 只 stock 估值状态:');
Object.entries(stats).forEach(([k,v]) => console.log('  '+k+': '+v));
console.log('总计:', total);
