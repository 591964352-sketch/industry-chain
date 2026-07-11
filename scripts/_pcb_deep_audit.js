// scripts/_pcb_deep_audit.js · PCB 链路最终深度检查（只读）
const fs = require('fs');

console.log('==================================================');
console.log('PCB 链路最终深度检查 · ' + new Date().toISOString().slice(0, 10));
console.log('==================================================\n');

// 加载 pcb.js
global.window = {};
eval(fs.readFileSync('data/pcb.js', 'utf8'));
const pcb = global.window.CHAINS.pcb;

// ====================================================
// 检查 1：数据一致性
// ====================================================
console.log('## 检查 1：数据一致性\n');

// 1.1 segments+midstream stock 总数
const segStocks = [];
pcb.segments.forEach((seg, segIdx) => {
  if (seg.stocks) seg.stocks.forEach(s => segStocks.push({ ...s, segIdx, segName: seg.name }));
});
const midStocks = [];
if (pcb.midstream && pcb.midstream.stocks) {
  pcb.midstream.stocks.forEach(s => midStocks.push({ ...s, segIdx: 'mid', segName: pcb.midstream.name || 'midstream' }));
}

// 去重（同一只 stock 在 segments 和 midstream 都出现算一只）
const allStocksMap = new Map();
[...segStocks, ...midStocks].forEach(s => {
  if (!allStocksMap.has(s.code)) allStocksMap.set(s.code, s);
});
const uniqueStockCount = allStocksMap.size;
const totalOccurrences = segStocks.length + midStocks.length;

console.log(`1.1 segments stock 总数：${segStocks.length}`);
console.log(`    midstream stock 总数：${midStocks.length}`);
console.log(`    总出现次数：${totalOccurrences}`);
console.log(`    去重 unique stock 总数：${uniqueStockCount}`);
console.log(`    index.html 显示 36 只 → ${uniqueStockCount === 36 ? '✓ 一致' : '✗ 不一致（实际 ' + uniqueStockCount + ' 只）'}\n`);

// 1.2 景气六维 dims6 检查
let dims6Missing = 0;
let dims6WrongCount = 0;
const dims6Issues = [];
const allUnique = [...allStocksMap.values()];
allUnique.forEach(s => {
  if (!s.dims6) {
    dims6Missing++;
    if (dims6Issues.length < 5) dims6Issues.push(s.code + ' ' + s.name + ' 缺 dims6');
  } else if (!Array.isArray(s.dims6) || s.dims6.length !== 6) {
    dims6WrongCount++;
    if (dims6Issues.length < 5) dims6Issues.push(s.code + ' ' + s.name + ' dims6 长度=' + (s.dims6 ? s.dims6.length : 'N/A'));
  }
});
console.log(`1.2 dims6 检查：${allUnique.length} 只 stock`);
console.log(`    缺 dims6：${dims6Missing} 只`);
console.log(`    dims6 长度≠6：${dims6WrongCount} 只`);
if (dims6Issues.length) console.log('    示例：' + dims6Issues.join(' / '));
console.log();

// 1.3 overview 数组
const overviewLen = pcb.overview ? pcb.overview.length : 0;
console.log(`1.3 overview 数组长度：${overviewLen}${overviewLen === 8 ? ' ✓' : ' ✗（期望 8 格）'}\n`);

// 1.4 demandChainMeta CAGR
const dc = pcb.demandChainMeta;
console.log('1.4 demandChainMeta CAGR:');
if (dc && dc.segments) {
  dc.segments.forEach(s => {
    console.log(`    ${s.name}: cagr=${s.cagr}%${s.cagrRange ? ' range=' + s.cagrRange : ''}`);
  });
} else {
  console.log('    ✗ demandChainMeta 缺失');
}
console.log();

// 1.5 chainStory step + keyStocks
const cs = pcb.plainIntro && pcb.plainIntro.chainStory;
console.log(`1.5 chainStory 数组长度：${cs ? cs.length : 0}${cs && cs.length === 10 ? ' ✓' : ' ✗（期望 10）'}`);
if (cs) {
  let missingStock = [];
  cs.forEach(step => {
    (step.keyStocks || []).forEach(code => {
      if (!allStocksMap.has(code)) missingStock.push(`Step ${step.step} (${step.name}): code=${code}`);
    });
  });
  if (missingStock.length) {
    console.log('    ✗ keyStocks 缺失：' + missingStock.join(' / '));
  } else {
    console.log('    ✓ 全部 keyStocks.code 在 pcb.js segments/midstream 中存在');
  }
  console.log();
}

// ====================================================
// 检查 2：stock 字段完整性
// ====================================================
console.log('## 检查 2：stock 字段完整性\n');

const requiredFields = ['code', 'name', 'barrier', 'tier', 'trend', 'trendNote'];
const missingFieldStocks = [];
const fieldCounts = { code: 0, name: 0, barrier: 0, tier: 0, trend: 0, trendNote: 0 };

allUnique.forEach(s => {
  requiredFields.forEach(f => {
    if (s[f] !== undefined && s[f] !== null && s[f] !== '') {
      fieldCounts[f]++;
    }
  });
  // 检查缺字段
  const missing = requiredFields.filter(f => !s[f]);
  if (missing.length) missingFieldStocks.push(`${s.code} ${s.name} 缺: ${missing.join(',')}`);
});

console.log('字段覆盖率：');
requiredFields.forEach(f => {
  const cnt = fieldCounts[f];
  const pct = ((cnt / allUnique.length) * 100).toFixed(1);
  console.log(`  ${f}: ${cnt}/${allUnique.length} = ${pct}%`);
});
console.log();

if (missingFieldStocks.length) {
  console.log('缺字段 stock 列表：');
  missingFieldStocks.forEach(s => console.log('  ' + s));
} else {
  console.log('✓ 所有 stock 字段完整');
}
console.log();

// ====================================================
// 检查 3：barrier 分布
// ====================================================
console.log('## 检查 3：barrier 分布\n');

const barrierCounts = {};
allUnique.forEach(s => {
  const b = s.barrier || '(空)';
  barrierCounts[b] = (barrierCounts[b] || 0) + 1;
});

['极高', '高', '中', '低'].forEach(b => {
  const cnt = barrierCounts[b] || 0;
  console.log(`  ${b}：${cnt} 只`);
});
console.log('  其他：');
Object.entries(barrierCounts).filter(([k]) => !['极高', '高', '中', '低'].includes(k)).forEach(([k, v]) => {
  console.log(`    ${k}：${v} 只`);
});
console.log();

// ====================================================
// 检查 4：逻辑一致性
// ====================================================
console.log('## 检查 4：逻辑一致性\n');

// 4.1 barrier=极高 的 stock 在 fourQuestions 中 q1 是否 true
const fourqMap = new Map();
if (pcb.fourQuestions) {
  pcb.fourQuestions.forEach(seg => {
    if (seg.stocks) seg.stocks.forEach(s => fourqMap.set(s.code, s));
  });
}

let extremeBarrierStocks = allUnique.filter(s => s.barrier === '极高');
let extremeBarrierQ1True = 0;
let extremeBarrierQ1False = 0;
let extremeBarrierNoFQ = 0;

extremeBarrierStocks.forEach(s => {
  const fq = fourqMap.get(s.code);
  if (!fq) {
    extremeBarrierNoFQ++;
  } else if (fq.q1 === true) {
    extremeBarrierQ1True++;
  } else {
    extremeBarrierQ1False++;
  }
});

console.log(`4.1 barrier=极高 stock 共 ${extremeBarrierStocks.length} 只：`);
console.log(`    fourQuestions.q1=true: ${extremeBarrierQ1True}`);
console.log(`    fourQuestions.q1≠true: ${extremeBarrierQ1False}`);
console.log(`    fourQuestions 缺失: ${extremeBarrierNoFQ}`);
console.log();

// 4.2 trend=up 的 stock 是否有正面 trendNote
// 简化判断：trendNote 是否包含 + / 增长 / 上升 / 量产 / 认证 / 第一 / 龙头 等关键词
const positiveKeywords = ['+', '增长', '上升', '量产', '认证', '第一', '龙头', '首', '突破', '独家', '全球第一', '全球第二'];
let trendUpCount = 0;
let trendUpPositiveNote = 0;
let trendUpIssues = [];

allUnique.forEach(s => {
  if (s.trend === 'up') {
    trendUpCount++;
    const note = s.trendNote || '';
    const hasPositive = positiveKeywords.some(kw => note.includes(kw));
    if (hasPositive) {
      trendUpPositiveNote++;
    } else {
      trendUpIssues.push(s.code + ' ' + s.name + ' trendNote=' + note.slice(0, 30));
    }
  }
});

console.log(`4.2 trend=up stock 共 ${trendUpCount} 只：`);
console.log(`    trendNote 含正面关键词: ${trendUpPositiveNote}`);
console.log(`    trendNote 缺正面关键词: ${trendUpIssues.length}`);
if (trendUpIssues.length && trendUpIssues.length <= 5) {
  trendUpIssues.forEach(s => console.log('    - ' + s));
}
console.log();

// 4.3 景气六维综合分 + barrier 极高 触发的提示
// prosperity.dims[4] 是 valuation, 看其 reason
if (pcb.prosperity && pcb.prosperity.dims) {
  const valDim = pcb.prosperity.dims.find(d => d.key === 'valuation');
  if (valDim) {
    console.log('4.3 景气六维·估值维信息：');
    console.log(`    score=${valDim.score} trend=${valDim.trend}`);
    console.log(`    reason（前 200 字符）：${(valDim.reason || '').slice(0, 200)}`);
    console.log(`    是否含"估值高位/分位"关键词: ${/估值|分位|高位|门控/i.test(valDim.reason || '') ? '✓' : '✗'}`);
  }
  // 综合分（如果 verdict 有）
  if (pcb.prosperity.verdict) {
    console.log(`    verdict.longTermFit: ${pcb.prosperity.verdict.longTermFit || ''}`);
    console.log(`    verdict.oneLine: ${(pcb.prosperity.verdict.oneLine || '').slice(0, 200)}`);
  }
}
console.log();

// ====================================================
// 检查 5：渲染函数
// ====================================================
console.log('## 检查 5：渲染函数检查\n');

const html = fs.readFileSync('index.html', 'utf8');

// 5.1 findStock 函数
const findStockMatch = html.match(/function findStock\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);
console.log(`5.1 findStock 函数: ${findStockMatch ? '✓ 存在（' + findStockMatch[0].length + ' chars）' : '✗ 缺失'}`);
if (findStockMatch) {
  // 看是否扫描 segments + midstream
  const hasSeg = findStockMatch[0].includes('d.segments');
  const hasMid = findStockMatch[0].includes('d.midstream');
  console.log(`    扫描 segments: ${hasSeg ? '✓' : '✗'}`);
  console.log(`    扫描 midstream: ${hasMid ? '✓' : '✗'}`);
}

// 5.2 setDistFilter 函数
const setDistFilterMatch = html.match(/function setDistFilter\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);
console.log(`\n5.2 setDistFilter 函数: ${setDistFilterMatch ? '✓ 存在（' + setDistFilterMatch[0].length + ' chars）' : '✗ 缺失'}`);

// 5.3 toggleChangelog 函数
const toggleChangelogMatch = html.match(/function toggleChangelog\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);
console.log(`\n5.3 toggleChangelog 函数: ${toggleChangelogMatch ? '✓ 存在（' + toggleChangelogMatch[0].length + ' chars）' : '✗ 缺失'}`);
if (toggleChangelogMatch) {
  const func = toggleChangelogMatch[0];
  const hasDisplayNone = /display\s*[=:]\s*['"]none['"]/i.test(func) || /style\.display\s*=\s*['"]none['"]/i.test(func);
  const hasDisplayBlock = /display\s*[=:]\s*['"]block['"]/i.test(func) || /style\.display\s*=\s*['"]block['"]/i.test(func);
  console.log(`    含 display=none: ${hasDisplayNone ? '✓' : '✗'}`);
  console.log(`    含 display=block: ${hasDisplayBlock ? '✓' : '✗'}`);
}

console.log('\n==================================================');
console.log('检查完成');
console.log('==================================================');