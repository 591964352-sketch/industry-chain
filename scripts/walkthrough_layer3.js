// scripts/walkthrough_layer3.js —— 第三层 pcb.js 合并层 CHAINS.pcb 检查
const fs = require('fs');
global.window = {};

// 按实际加载顺序加载 3 个文件
eval(fs.readFileSync('data/pcb.manual.js', 'utf8'));
eval(fs.readFileSync('data/pcb.auto.js', 'utf8'));
eval(fs.readFileSync('data/pcb.js', 'utf8'));

const pcb = global.window.CHAINS.pcb;

console.log('=== 第三层 CHAINS.pcb 合并层 ===');
console.log();
console.log('顶层字段:');
for (const k of Object.keys(pcb)) {
  const v = pcb[k];
  const summary = Array.isArray(v) ? '[Array len=' + v.length + ']' : (typeof v === 'object' ? '[Object]' : v);
  console.log('  ' + k + ' = ' + summary);
}
console.log();
console.log('meta:');
if (pcb.meta) {
  for (const [k, v] of Object.entries(pcb.meta)) {
    console.log('  ' + k + ' = ' + v);
  }
}
console.log();
console.log('--- segments ---');
if (pcb.segments) {
  console.log('总 segments:', pcb.segments.length);
  pcb.segments.forEach((seg, i) => {
    const stocks = seg.stocks || [];
    console.log('  [' + i + '] ' + (seg.name || '(无名)') + ' · stocks=' + stocks.length);
  });
}
console.log();
console.log('--- midstream ---');
if (pcb.midstream) {
  const m = pcb.midstream;
  if (Array.isArray(m)) {
    console.log('midstream 是数组（结构异常）len=' + m.length);
  } else {
    console.log('midstream.stocks:', (m.stocks || []).length);
    console.log('midstream.name:', m.name);
    if (m.companies) console.log('midstream.companies:', m.companies.length);
  }
} else {
  console.log('midstream 字段缺失');
}
console.log();
console.log('--- chokePoints ---');
if (pcb.chokePoints) {
  console.log('卡口数:', pcb.chokePoints.length);
  pcb.chokePoints.forEach((cp, i) => {
    const val = cp.valuation || {};
    console.log('  [' + i + '] ' + (cp.name || cp.title || '(无名)') + ' · tier=' + cp.tier + ' · ver=' + (cp.verification ? 'Y' : 'N') + ' · val.pe_ttm=' + (val.pe_ttm !== undefined ? val.pe_ttm : 'undefined'));
  });
} else {
  console.log('chokePoints 字段缺失');
}
console.log();
console.log('--- signalMeta / buySignal ---');
if (pcb.signalMeta) {
  console.log('signalMeta:');
  for (const [k, v] of Object.entries(pcb.signalMeta)) {
    console.log('  ' + k + ' = ' + JSON.stringify(v));
  }
} else if (pcb.buySignal) {
  console.log('buySignal:');
  for (const [k, v] of Object.entries(pcb.buySignal)) {
    console.log('  ' + k + ' = ' + JSON.stringify(v));
  }
} else {
  console.log('signalMeta / buySignal 字段都缺失');
}
console.log();
console.log('--- 随机抽 3 只 stock 完整 valuation 字段 ---');
const sampleCodes = ['601208', '300476', '688234'];
sampleCodes.forEach(code => {
  // 找 stock 在 segments 里的位置
  let found = null;
  if (pcb.segments) {
    for (const seg of pcb.segments) {
      if (seg.stocks) {
        const s = seg.stocks.find(x => x.code === code);
        if (s) { found = { source: 'segments[' + (pcb.segments.indexOf(seg)) + ']', stock: s }; break; }
      }
    }
  }
  if (!found && pcb.midstream && pcb.midstream.stocks) {
    const s = pcb.midstream.stocks.find(x => x.code === code);
    if (s) found = { source: 'midstream', stock: s };
  }
  if (!found) {
    console.log('  ' + code + ' · ❌ 未找到');
    return;
  }
  const s = found.stock;
  console.log('  ' + code + ' (' + s.name + ') · 来源=' + found.source);
  console.log('    manual 字段:');
  console.log('      code=' + s.code + ' · name=' + s.name);
  console.log('      barrier=' + s.barrier + ' · tier=' + s.tier + ' · trend=' + s.trend);
  console.log('      growthAdj=' + s.growthAdj + ' · peAbsMax=' + s.peAbsMax);
  console.log('      dims6.length=' + (s.dims6 ? s.dims6.length : 'undefined'));
  console.log('      segments=' + JSON.stringify(s.segments));
  console.log('    valuation 字段:');
  if (s.valuation === undefined) {
    console.log('      valuation=undefined (没注入·可能是 688234)');
  } else if (s.valuation === null) {
    console.log('      valuation=null (拉取失败)');
  } else {
    for (const [k, v] of Object.entries(s.valuation)) {
      if (k === 'pe_history') {
        console.log('        ' + k + ' = [Array len=' + v.length + ']');
      } else {
        console.log('        ' + k + ' = ' + JSON.stringify(v));
      }
    }
  }
});
console.log();
console.log('--- valuation 缺失/失败的 stock ---');
const noValuation = [];
const nullValuation = [];
if (pcb.segments) {
  for (const seg of pcb.segments) {
    if (seg.stocks) {
      for (const s of seg.stocks) {
        if (s.valuation === undefined) noValuation.push(s.code + ' ' + s.name);
        else if (s.valuation === null) nullValuation.push(s.code + ' ' + s.name);
      }
    }
  }
}
if (pcb.midstream && pcb.midstream.stocks) {
  for (const s of pcb.midstream.stocks) {
    if (s.valuation === undefined) noValuation.push(s.code + ' ' + s.name);
    else if (s.valuation === null) nullValuation.push(s.code + ' ' + s.name);
  }
}
console.log('valuation=undefined:', noValuation.length, '只');
noValuation.forEach(s => console.log('  ' + s));
console.log('valuation=null:', nullValuation.length, '只');
nullValuation.forEach(s => console.log('  ' + s));
