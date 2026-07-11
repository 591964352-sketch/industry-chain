// scripts/walkthrough_layer1.js —— 第一层 pcb.manual.js 字段统计
const fs = require('fs');
global.window = {};

eval(fs.readFileSync('data/pcb.manual.js', 'utf8'));
const stocks = global.window.PCB_MANUAL.stocks;

const FIELDS = ['code','name','rank','barrier','tier','position','investable','region','dims6','growthAdj','peAbsMax','src','valAsOf','trend','trendNote','hits','strength','segments'];
const stats = {};
for (const f of FIELDS) stats[f] = 0;
let dims6Len = {};
let typeIssues = [];
let growthAdjTrue = 0;
let peAbsMaxValues = {};

for (const [code, s] of Object.entries(stocks)) {
  for (const f of FIELDS) {
    if (s[f] !== undefined && s[f] !== null && s[f] !== '') stats[f]++;
  }
  if (Array.isArray(s.dims6)) {
    const len = s.dims6.length;
    dims6Len[len] = (dims6Len[len]||0) + 1;
    if (len !== 6) typeIssues.push(code + ' ' + s.name + ' dims6.length=' + len);
    // 检查 dims6 元素结构
    s.dims6.forEach((d, i) => {
      if (typeof d !== 'object' || d === null) {
        typeIssues.push(code + ' dims6[' + i + '] 非对象: ' + typeof d);
      } else {
        if (!d.key) typeIssues.push(code + ' dims6[' + i + '] 缺 key');
        if (typeof d.score !== 'number') typeIssues.push(code + ' dims6[' + i + '] score 非 number: ' + d.score);
        if (!d.trend) typeIssues.push(code + ' dims6[' + i + '] 缺 trend');
      }
    });
  } else if (s.dims6 !== undefined) {
    typeIssues.push(code + ' ' + s.name + ' dims6 非数组· type=' + typeof s.dims6);
  }
  if (s.growthAdj === true) growthAdjTrue++;
  if (s.growthAdj !== undefined && typeof s.growthAdj !== 'boolean') {
    typeIssues.push(code + ' growthAdj 非 boolean · val=' + s.growthAdj);
  }
  if (s.peAbsMax !== undefined) {
    if (typeof s.peAbsMax !== 'number') {
      typeIssues.push(code + ' peAbsMax 非 number · val=' + s.peAbsMax);
    } else {
      peAbsMaxValues[s.peAbsMax] = (peAbsMaxValues[s.peAbsMax]||0) + 1;
    }
  }
}

console.log('=== 第一层 pcb.manual.js 字段统计 ===');
console.log('总 stock 数:', Object.keys(stocks).length);
console.log();
console.log('字段存在率:');
for (const f of FIELDS) {
  console.log('  ' + f.padEnd(15) + ' ' + stats[f] + '/' + Object.keys(stocks).length);
}
console.log();
console.log('growthAdj=true 数量:', growthAdjTrue);
console.log('peAbsMax 取值分布:', JSON.stringify(peAbsMaxValues));
console.log('dims6 长度分布:', JSON.stringify(dims6Len));
console.log('类型/结构问题数:', typeIssues.length);
if (typeIssues.length) {
  console.log('问题列表:');
  typeIssues.forEach(i => console.log('  ⚠️', i));
}
