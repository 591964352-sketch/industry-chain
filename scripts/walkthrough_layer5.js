// scripts/walkthrough_layer5.js —— 第五层 端到端一致性 5 只卡口
const fs = require('fs');
global.window = {};

eval(fs.readFileSync('data/pcb.manual.js', 'utf8'));
eval(fs.readFileSync('data/pcb.auto.js', 'utf8'));
eval(fs.readFileSync('data/pcb.js', 'utf8'));

const manual = global.window.PCB_MANUAL.stocks;
const auto = global.window.PCB_AUTO.valuations;
const pcb = global.window.CHAINS.pcb;

// 5 只可投卡口
const chokepointCodes = ['601208', '300395', '301217', '002916', '600183'];

console.log('=== 第五层 端到端一致性 ===');
console.log();
console.log('5 只卡口逐字段对比 (manual → auto → pcb.js CHAINS.pcb):');
console.log();

const headers = ['code', 'name', 'barrier', 'growthAdj', 'peAbsMax', 'trend', 'pe_ttm', 'pePercentile', 'entryZone.p30', 'entryZone.p70', 'fromHigh', 'fromHigh_p30to70'];
const rows = [headers];
const separator = ['---','---','---','---','---','---','---','---','---','---','---','---'];

chokepointCodes.forEach(code => {
  const m = manual[code];
  const a = auto[code];
  // 找 CHAINS.pcb 里的对应 stock
  let pcbStock = null;
  for (const seg of (pcb.segments || [])) {
    if (seg.stocks) {
      const s = seg.stocks.find(x => x.code === code);
      if (s) { pcbStock = { source: 'segments[' + (pcb.segments.indexOf(seg)) + ']', stock: s }; break; }
    }
  }
  if (!pcbStock && pcb.midstream && pcb.midstream.stocks) {
    const s = pcb.midstream.stocks.find(x => x.code === code);
    if (s) pcbStock = { source: 'midstream', stock: s };
  }

  // 取 CHAINS.pcb 的 valuation（应该等于 auto）
  const cv = pcbStock ? pcbStock.stock.valuation : null;
  // 取 CHAINS.pcb 的 barrier/trend/growthAdj（来自 manual，覆盖在 CHAINS.pcb）
  // 实际上是 segments.stocks[].barrier 直接读 pcb.js 内置数据，没合并 manual
  const cb = pcbStock ? pcbStock.stock.barrier : null;
  const ct = pcbStock ? pcbStock.stock.trend : null;
  const cg = pcbStock ? pcbStock.stock.growthAdj : null;

  // entryZone
  const aez = a && a.entryZone ? a.entryZone : null;
  const cvez = cv && cv.entryZone ? cv.entryZone : null;

  rows.push([
    code,
    m ? m.name : '?',
    // barrier
    m ? m.barrier : '?',
    // growthAdj
    m && m.growthAdj ? 'true' : (m && m.growthAdj === false ? 'false' : 'undefined'),
    // peAbsMax
    m && m.peAbsMax !== undefined ? String(m.peAbsMax) : 'undefined',
    // trend
    m ? m.trend : '?',
    // pe_ttm
    a && a.pe_ttm !== null && a.pe_ttm !== undefined ? String(a.pe_ttm) : 'null',
    // pePercentile
    a && a.pePercentile !== null && a.pePercentile !== undefined ? String(a.pePercentile) + '%' : 'null',
    // entryZone.p30
    aez ? String(aez.p30) : 'null',
    // entryZone.p70
    aez ? String(aez.p70) : 'null',
    // fromHigh
    a && a.fromHigh !== null && a.fromHigh !== undefined ? String((a.fromHigh*100).toFixed(2)) + '%' : 'null',
    // auto vs pcb.js CHAINS.pcb 一致性
    (JSON.stringify(a) === JSON.stringify(cv) ? '✓' : '⚠️ 不一致')
  ]);
});

// 简单表格输出
rows.forEach(r => {
  console.log(r.map(c => String(c).padEnd(15)).join('| '));
});
console.log();
console.log('--- 字段含义 ---');
console.log('  barrier/trend/growthAdj/peAbsMax  → 来自 pcb.manual.js（人工层）');
console.log('  pe_ttm/pePercentile/entryZone/fromHigh → 来自 pcb.auto.js（baostock 自动层）');
console.log('  auto vs pcb.js CHAINS.pcb 一致性 → 应该 ✓（injectValuation 函数）');
console.log();
console.log('--- 一致性检查 ---');
let allConsistent = true;
chokepointCodes.forEach(code => {
  const a = auto[code];
  const cv = (pcb.segments || []).flatMap(seg => seg.stocks || []).find(s => s.code === code);
  const cv2 = pcb.midstream && pcb.midstream.stocks ? pcb.midstream.stocks.find(s => s.code === code) : null;
  const realCv = cv || cv2;
  const cvVal = realCv ? realCv.valuation : null;
  // 关键字段：pe_ttm, pePercentile, entryZone, fromHigh 必须一致
  if (a && cvVal) {
    const checks = [
      ['pe_ttm', a.pe_ttm, cvVal.pe_ttm],
      ['pePercentile', a.pePercentile, cvVal.pePercentile],
      ['entryZone', JSON.stringify(a.entryZone), JSON.stringify(cvVal.entryZone)],
      ['fromHigh', a.fromHigh, cvVal.fromHigh]
    ];
    let allMatch = true;
    checks.forEach(([k, av, cv]) => {
      if (av !== cv) { allMatch = false; }
    });
    console.log('  ' + code + ' ' + (allMatch ? '✓ 估值字段一致' : '⚠️ 估值字段不一致'));
    if (!allMatch) {
      checks.forEach(([k, av, cv]) => {
        if (av !== cv) console.log('     ' + k + ': auto=' + av + ' vs pcb.js=' + cv);
      });
      allConsistent = false;
    }
  } else if (!a) {
    console.log('  ' + code + ' ⚠️ auto 缺数据');
    allConsistent = false;
  } else if (!cvVal) {
    console.log('  ' + code + ' ⚠️ pcb.js CHAINS.pcb 缺 valuation');
    allConsistent = false;
  }
});
console.log();
console.log('--- growthAdj 在 signal 计算中是否生效 ---');
// 看 segments.stocks[i].signal.channel
chokepointCodes.forEach(code => {
  const stocks = (pcb.segments || []).flatMap(seg => seg.stocks || []);
  const stock = stocks.find(s => s.code === code);
  if (stock && stock.signal) {
    console.log('  ' + code + ' signal.channel=' + stock.signal.channel + ' · A=' + stock.signal.A + ' · B=' + stock.signal.B);
  } else {
    console.log('  ' + code + ' 无 signal（亏损股被排除）');
  }
});
console.log();
console.log('--- 总结 ---');
console.log('auto vs pcb.js CHAINS.pcb 估值字段一致性: ' + (allConsistent ? '✓ 全部一致' : '⚠️ 存在不一致'));
