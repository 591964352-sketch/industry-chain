// _diff_chain_vs_pcb.js — 新链 vs PCB 金标准自动对比
// 用法: node scripts/_diff_chain_vs_pcb.js <chainId>
// 输出: 字段结构差异报告 · 写入 .claude/scratch/<chainId>-vs-pcb-<date>.md

const fs = require('fs');
const chainId = process.argv[2];
if (!chainId) { console.error('Usage: node scripts/_diff_chain_vs_pcb.js <chainId>'); process.exit(1); }

global.window = { CHAINS: {}, PCB_MANUAL: { stocks: {} } };

// Load PCB golden standard
eval(fs.readFileSync('data/pcb.js', 'utf8'));
eval(fs.readFileSync('data/pcb.manual.js', 'utf8'));
const pcb = global.window.CHAINS.pcb;
const pcbM = global.window.PCB_MANUAL;

// Load target chain
const autoFile = `data/${chainId}.js`;
const manualFile = `data/${chainId}.manual.js`;
if (!fs.existsSync(autoFile)) { console.error(`File not found: ${autoFile}`); process.exit(1); }
eval(fs.readFileSync(autoFile, 'utf8'));
const chain = global.window.CHAINS[chainId];
if (!chain) { console.error(`Chain ${chainId} not loaded`); process.exit(1); }

let chainM = null;
if (fs.existsSync(manualFile)) {
  eval(fs.readFileSync(manualFile, 'utf8'));
  const nsKey = chainId.toUpperCase().replace(/-/g, '_') + '_MANUAL';
  chainM = global.window[nsKey];
}

const lines = [];
function L(s) { lines.push(s); console.log(s); }

L(`=== ${chainId} vs PCB 金标准对比 ===`);
L(`日期: ${new Date().toISOString().split('T')[0]}`);
L('');

// ── 1. 顶层字段 ──
L('【1】顶层字段');
const topFields = ['id','name','icon','meta','prosperity','cyclePosition','plainIntro','overview','treeMap','segments','midstream','fourQuestions','chokePoints','supplyGap','methodologyNotes'];
let missingTop = [];
topFields.forEach(f => { if (chain[f] === undefined) missingTop.push(f); });
if (missingTop.length) {
  L(`  [WARN] 缺失顶层字段(${missingTop.length}): ${missingTop.join(', ')}`);
} else {
  L(`  [OK] 顶层字段: ${topFields.length}/${topFields.length} 齐`);
}

// ── 2. segments stocks 字段 ──
L('');
L('【2】segments[].stocks[] 字段 (auto 层)');
const pcbStockFields = new Set();
pcb.segments.forEach(seg => seg.stocks.forEach(s => Object.keys(s).forEach(k => pcbStockFields.add(k))));
const chainStockFields = new Set();
(chain.segments||[]).forEach(seg => (seg.stocks||[]).forEach(s => Object.keys(s).forEach(k => chainStockFields.add(k))));
const missingAutoFields = [...pcbStockFields].filter(f => !chainStockFields.has(f));
const extraAutoFields = [...chainStockFields].filter(f => !pcbStockFields.has(f));
if (missingAutoFields.length) L(`  [WARN] 缺失字段: ${missingAutoFields.join(', ')}`);
if (extraAutoFields.length) L(`  [INFO] 独有字段: ${extraAutoFields.join(', ')}`);
if (!missingAutoFields.length && !extraAutoFields.length) L(`  [OK] stock 字段完全一致`);

// ── 3. manual.js stocks 字段 ──
L('');
L('【3】manual.js stocks[] 字段');
if (!chainM || !chainM.stocks) {
  L('  [INFO] 无双层架构 (无 manual.js)');
} else {
  const pcbMFields = new Set();
  Object.values(pcbM.stocks).forEach(s => Object.keys(s).forEach(k => pcbMFields.add(k)));
  const chainMFields = new Set();
  Object.values(chainM.stocks).forEach(s => Object.keys(s).forEach(k => chainMFields.add(k)));
  const missingMFields = [...pcbMFields].filter(f => !chainMFields.has(f));
  const extraMFields = [...chainMFields].filter(f => !pcbMFields.has(f));

  // Report with coverage stats
  if (missingMFields.length) {
    // Which fields are most impactful
    const criticalFields = ['dims6', 'fundamentals', 'riskMetrics', 'position', 'investableReason'];
    const missingCritical = missingMFields.filter(f => criticalFields.includes(f));
    const missingNonCritical = missingMFields.filter(f => !criticalFields.includes(f));
    L(`  [WARN] 缺失字段(${missingMFields.length}): ${missingMFields.join(', ')}`);
    if (missingCritical.length) L(`         其中关键字段: ${missingCritical.join(', ')}`);
  }
  if (extraMFields.length) L(`  [INFO] 独有字段: ${extraMFields.join(', ')}`);

  // Coverage stats for key fields
  const stocks = Object.values(chainM.stocks);
  const total = stocks.length;
  ['dims6','fundamentals','riskMetrics'].forEach(f => {
    const covered = stocks.filter(s => s[f] && (Array.isArray(s[f]) ? s[f].length : !!s[f].asOf || Object.keys(s[f]).length > 0)).length;
    L(`  [COV] ${f}: ${covered}/${total} (${(covered/total*100).toFixed(0)}%)`);
  });
}

// ── 4. treeMap 结构 ──
L('');
L('【4】treeMap 结构');
const pcbTmKeys = Object.keys(pcb.treeMap);
const chainTmKeys = Object.keys(chain.treeMap || {});
const missingTmKeys = pcbTmKeys.filter(k => !chainTmKeys.includes(k));
if (missingTmKeys.length) L(`  [WARN] 缺失列: ${missingTmKeys.join(', ')}`);
chainTmKeys.forEach(k => {
  const isArr = Array.isArray(chain.treeMap[k]);
  const pcbIsArr = Array.isArray(pcb.treeMap[k]);
  const len = isArr ? chain.treeMap[k].length : 'N/A';
  const status = (isArr === pcbIsArr) ? 'OK' : 'TYPE_MISMATCH';
  L(`  ${status === 'OK' ? '[OK]' : '[FAIL]'} ${k}: ${isArr ? 'array['+len+']' : typeof chain.treeMap[k]} (PCB: ${pcbIsArr ? 'array['+pcb.treeMap[k].length+']' : typeof pcb.treeMap[k]})`);
});

// ── 5. fourQuestions ──
L('');
L('【5】fourQuestions');
const pcbFqLen = (pcb.fourQuestions && pcb.fourQuestions.segments) ? pcb.fourQuestions.segments.length : 'N/A';
const chainFqLen = (chain.fourQuestions && chain.fourQuestions.segments) ? chain.fourQuestions.segments.length : 0;
const segLen = (chain.segments || []).length;
L(`  fourQuestions.segments: ${chainFqLen} (PCB: ${pcbFqLen}, 本链 segments: ${segLen})`);
if (chainFqLen === 0 && segLen > 0) {
  L('  [FAIL] fourQuestions.segments 为空数组 — 四问筛选 section 将完全不渲染');
} else if (chainFqLen < segLen) {
  L(`  [WARN] fourQuestions 段数(${chainFqLen}) < segments 数(${segLen})`);
} else {
  L('  [OK]');
}

// ── 6. 股票数一致 ──
L('');
L('【6】股票数一致');
const autoCodes = new Set();
(chain.segments||[]).forEach(seg => (seg.stocks||[]).forEach(s => { if (s.code) autoCodes.add(s.code); }));
(chain.midstream && chain.midstream.stocks||[]).forEach(s => { if (s.code) autoCodes.add(s.code); });
(chain.chokePoints||[]).forEach(cp => { if (cp.code) autoCodes.add(cp.code); });
const manualCodeCount = chainM && chainM.stocks ? Object.keys(chainM.stocks).length : 0;
L(`  auto 层 unique codes: ${autoCodes.size}`);
L(`  manual 层 stocks: ${manualCodeCount}`);
if (manualCodeCount > 0 && autoCodes.size !== manualCodeCount) {
  L(`  [FAIL] 股票数不一致: auto=${autoCodes.size}, manual=${manualCodeCount}, 差异=${Math.abs(autoCodes.size - manualCodeCount)}`);
} else {
  L('  [OK]');
}

// ── 7. signals/holdingMeta ──
L('');
L('【7】signal/holdingMeta (PCB 特有)');
['holdingMeta','signalMeta','signalCMeta'].forEach(f => {
  const has = chain[f] !== undefined;
  L(`  ${f}: ${has ? 'present' : 'MISSING'} (PCB: ${pcb[f] !== undefined ? 'present' : 'MISSING'})`);
});

// ── 8. 写入报告 ──
const report = lines.join('\n');
const date = new Date().toISOString().split('T')[0];
const reportPath = `.claude/scratch/${chainId}-vs-pcb-${date}.md`;
fs.writeFileSync(reportPath, report, 'utf8');
console.log(`\n报告已写入: ${reportPath}`);

// Exit code
const hasFail = lines.some(l => l.includes('[FAIL]'));
process.exit(hasFail ? 1 : 0);
