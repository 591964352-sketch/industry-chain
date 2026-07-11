// scripts/walkthrough_layer2.js —— 第二层 pcb.auto.js 字段统计
const fs = require('fs');
global.window = {};

eval(fs.readFileSync('data/pcb.auto.js', 'utf8'));
const vals = global.window.PCB_AUTO.valuations;

const FIELDS = ['pe_ttm','pe_history','pePercentile','entryZone','fromHigh','closeLatest','closeHigh5y','flag','source','baostockStamp','asOf'];
const stats = {};
for (const f of FIELDS) stats[f] = 0;
let flagContents = {};
let peHistoryNonEmptyButNoTtm = [];
let peTtmNull = [];
let peTtmNotNull = [];
let pePercentileRanges = { lt50: 0, p50_70: 0, p70_90: 0, gte90: 0, isNull: 0 };
let fromHighRanges = { ltMinus50: 0, m50_m20: 0, m20_0: 0, gte0: 0, isNull: 0 };

for (const [code, v] of Object.entries(vals)) {
  if (v === null) {
    // 拉取失败
    for (const f of FIELDS) stats[f] += 0;
    continue;
  }
  for (const f of FIELDS) {
    if (v[f] !== undefined && v[f] !== null && v[f] !== '') stats[f]++;
  }
  if (v.flag && v.flag !== null) {
    flagContents[v.flag] = (flagContents[v.flag]||0) + 1;
  }
  if (v.pe_ttm === null) {
    peTtmNull.push(code);
    if (v.pe_history && v.pe_history.length > 0) {
      peHistoryNonEmptyButNoTtm.push({ code, histLen: v.pe_history.length });
    }
  } else {
    peTtmNotNull.push(code);
  }
  // pePercentile 分布
  if (v.pePercentile === null || v.pePercentile === undefined) {
    pePercentileRanges.isNull++;
  } else if (v.pePercentile < 50) {
    pePercentileRanges.lt50++;
  } else if (v.pePercentile < 70) {
    pePercentileRanges.p50_70++;
  } else if (v.pePercentile < 90) {
    pePercentileRanges.p70_90++;
  } else {
    pePercentileRanges.gte90++;
  }
  // fromHigh 分布
  if (v.fromHigh === null || v.fromHigh === undefined) {
    fromHighRanges.isNull++;
  } else if (v.fromHigh < -0.5) {
    fromHighRanges.ltMinus50++;
  } else if (v.fromHigh < -0.2) {
    fromHighRanges.m50_m20++;
  } else if (v.fromHigh < 0) {
    fromHighRanges.m20_0++;
  } else {
    fromHighRanges.gte0++;
  }
}

console.log('=== 第二层 pcb.auto.js 字段统计 ===');
console.log('总 stock 数:', Object.keys(vals).length);
console.log('拉取失败 (val=null):', Object.values(vals).filter(v => v === null).length);
console.log();
console.log('字段存在率 (排除拉取失败):');
const realTotal = Object.values(vals).filter(v => v !== null).length;
for (const f of FIELDS) {
  console.log('  ' + f.padEnd(15) + ' ' + stats[f] + '/' + realTotal);
}
console.log();
console.log('--- pe_ttm / pe_history ---');
console.log('pe_ttm=null:', peTtmNull.length, '只');
console.log('  - 其中 pe_history 非空（保留历史）:', peHistoryNonEmptyButNoTtm.length, '只');
peHistoryNonEmptyButNoTtm.forEach(o => console.log('    ' + o.code + ' history=' + o.histLen));
console.log('pe_ttm 有值:', peTtmNotNull.length, '只');
console.log();
console.log('--- pePercentile 分布 ---');
console.log('  <50%:', pePercentileRanges.lt50);
console.log('  50-70%:', pePercentileRanges.p50_70);
console.log('  70-90%:', pePercentileRanges.p70_90);
console.log('  >=90%:', pePercentileRanges.gte90);
console.log('  null:', pePercentileRanges.isNull);
console.log();
console.log('--- fromHigh 分布 ---');
console.log('  <-50%:', fromHighRanges.ltMinus50);
console.log('  -50%~-20%:', fromHighRanges.m50_m20);
console.log('  -20%~0%:', fromHighRanges.m20_0);
console.log('  >=0%:', fromHighRanges.gte0);
console.log('  null:', fromHighRanges.isNull);
console.log();
console.log('--- flag 内容分布 ---');
for (const [flag, count] of Object.entries(flagContents)) {
  console.log('  [' + count + '只] ' + flag);
}
