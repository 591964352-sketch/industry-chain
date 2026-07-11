// __apply_valuation_adj.js — 19只PCB stock的valuation score调整 + auditLog写入
const fs = require('fs');
let manual = fs.readFileSync('data/pcb.manual.js', 'utf8');

// 调整表: [code, oldScore, newScore, trend, adj_pp, reason_summary]
const adjustments = [
  // 改善2档 (3→1)
  ['301377','鼎泰高科',3,1,'down',-10,
    '景气系数: rev CAGR 20.7%/qual 1.0→adj -10pp, PE 99.88→89.88%→S10=1。低增长高PE无景气支撑, 严格对齐S10'],
  ['002913','奥士康',3,1,'down',-2,
    '景气系数: rev CAGR 6.6%/qual 0.3→adj -2pp, PE 99.83→98.33%→S10=1。低增长+利润微弱, 无景气溢价, 严格对齐S10'],
  ['600183','生益科技',3,1,'down',-10,
    '景气系数: rev CAGR 16.4%/qual 1.0→adj -10pp, PE 99.67→89.67%→S10=1。M9卡口但PE历史极值>85%, 触发估值门控'],
  ['605589','圣泉集团',3,1,'down',0,
    '景气系数: rev CAGR 4.4%→adj=0, PE 99.66%→S10=1。低增长无法支撑高PE, 严格对齐S10'],
  ['603920','世运电路',3,1,'down',-5,
    '景气系数: rev CAGR 8.0%/qual 1.0→adj -5pp, PE 97.11→92.11%→S10=1。温和增长不足以对冲极端PE'],

  // 改善1档 (3→2)
  ['301200','大族数控',3,2,'down',-18,
    '景气系数: rev CAGR 27.5%/qual 1.0→adj -18pp, PE 100.00→82.00%→S10=2。高增长对冲极端PE但仍有1档虚高'],
  ['001389','广合科技',3,2,'down',-18,
    '景气系数: rev CAGR 31.5%/qual 1.0→adj -18pp, PE 96.28→78.28%→S10=2。高增长显著对冲, 改善1档'],
  ['688388','嘉元科技',3,2,'down',-5,
    '景气系数: rev CAGR 27.6%/qual 0.3(净利-52.2%)→adj -5pp, PE 88.93→83.53%→S10=2。盈利质量因子有效压缩调整量'],

  // 改善1档 (2→1)
  ['600176','中国巨石',2,1,'down',0,
    '景气系数: rev CAGR -2.2%→adj=0, PE 100.00%→S10=1。负增长无景气溢价, 严格对齐S10'],
  ['603002','宏昌电子',2,1,'down',0,
    '景气系数: rev CAGR 0.6%→adj=0, PE 99.83%→S10=1。微增长无景气溢价, 严格对齐S10'],
  ['601208','东材科技',2,1,'down',-2,
    '景气系数: rev CAGR 12.5%/qual 0.3(净利-11.8%)→adj -2pp, PE 99.75→98.25%→S10=1。盈利质量差→调整量微→PE仍极值'],
  ['002080','中材科技',2,1,'down',-2,
    '景气系数: rev CAGR 5.4%/qual 0.3(净利-20.2%)→adj -2pp, PE 99.75→98.25%→S10=1。低增长+利润下滑, 无景气溢价'],
  ['603256','宏和科技',2,1,'down',-10,
    '景气系数: rev CAGR 24.1%/qual 1.0→adj -10pp, PE 99.51→89.51%→S10=1。高增长调整充分但仍无法完全对冲极端PE'],
  ['603186','华正新材',2,1,'down',-5,
    '景气系数: rev CAGR 10.0%/qual 1.0→adj -5pp, PE 96.62→91.62%→S10=1。np CAGR 97.3%来自低基数, rev CAGR 10%是真实节奏'],

  // 改善1档 (3→2) — PE<85%
  ['301150','中一科技',3,2,'down',-5,
    '景气系数: rev CAGR 26.6%/qual 0.3(净利-45.9%)→adj -5pp, PE 80.50→75.10%→S10=2。盈利质量因子有效压缩调整量(否则adj=-18pp), 对齐S10'],
  ['603519','南亚新材',3,2,'down',-2,
    '景气系数: rev CAGR 6.0%/qual 0.3(净利-34.7%)→adj -2pp, PE 76.71→75.21%→S10=2。低增长+利润下滑, 对齐S10'],

  // 无变化 (score不变, 但记录调整)
  ['300476','胜宏科技',2,2,'down',-18,
    '景气系数: rev CAGR 34.7%/qual 1.0→adj -18pp, PE 90.17→72.17%→S10=2。高增长显著对冲但PE基数高, 调整后仍在70-85%区间, score=2维持。仍虚高1档'],
  ['603650','彤程新材',2,2,'down',-5,
    '景气系数: rev CAGR 11.1%/qual 1.0→adj -5pp, PE 89.35→84.35%→S10=2。调整后仍在70-85%区间, score=2维持。仍虚高1档'],

  // 赛道横向低估例外 (§10.3) — 维持 score=4
  ['688183','生益电子',4,4,'up',-18,
    '§10.3 赛道横向低估例外: PE=59.50%(baostock L1)/赛道PE=88.35(akshare L3,折价36.4%)/3可比中位数=93.96/rev CAGR=39.0%→满足4项触发条件→S10=3+override=+1→score=4维持。trend=up表征低估修复方向'],
];

let scoreChanges = 0;
let auditInjects = 0;

function makeEntry(date, commit, change, category, summary, reviewer) {
  const e = { date, commit, category, summary, reviewer };
  if (change && Object.keys(change).length > 0) e.change = change;
  return e;
}

function injectAuditLog(stockCode, dimKey, entries) {
  const stockStart = manual.indexOf(`"${stockCode}": {`);
  if (stockStart < 0) { console.log(`  ⚠ stock ${stockCode} not found`); return false; }
  const re = new RegExp(`\\n\\s{4}"\\d{6}":\\s*\\{`, 'g');
  re.lastIndex = stockStart + 10;
  const nextMatch = re.exec(manual);
  const searchEnd = nextMatch ? nextMatch.index : manual.length;
  const region = manual.substring(stockStart, searchEnd);
  const dimIdx = region.indexOf(`"key": "${dimKey}"`);
  if (dimIdx < 0) { console.log(`  ⚠ ${stockCode}.${dimKey}: key not found`); return false; }
  const fromDim = region.substring(dimIdx);
  const vaIdx = fromDim.indexOf('"verifiedAt"');
  if (vaIdx < 0) { console.log(`  ⚠ ${stockCode}.${dimKey}: verifiedAt not found`); return false; }
  const fromVA = fromDim.substring(vaIdx);
  const closeMatch = fromVA.match(/"verifiedAt":\s*"[^"]*"\s*\n(\s*)\}/);
  if (!closeMatch) { console.log(`  ⚠ ${stockCode}.${dimKey}: closing brace not found`); return false; }
  const absIdx = stockStart + dimIdx + vaIdx + closeMatch.index + closeMatch[0].length - 1;
  const indent = closeMatch[1];
  const json = JSON.stringify(entries, null, 10);
  const indented = json.replace(/\n/g, `\n${indent}`);
  manual = manual.substring(0, absIdx) + ',\n' + indent + `"auditLog": ${indented}` + '\n' + manual.substring(absIdx);
  return true;
}

adjustments.forEach(([code, name, oldScore, newScore, trend, adjVal, summary]) => {
  // 1. Update score
  const scorePat = `"key": "valuation"`;
  const stockStart = manual.indexOf(`"${code}": {`);
  const dimIdx = manual.indexOf(scorePat, stockStart);
  if (dimIdx < 0) { console.log(`  ⚠ ${code} valuation dim not found`); return; }

  // Find "score": oldScore within the valuation dim
  const scoreStr = `"score": ${oldScore}`;
  const scoreIdx = manual.indexOf(scoreStr, dimIdx);
  if (scoreIdx < 0) { console.log(`  ⚠ ${code} score=${oldScore} not found in valuation`); return; }

  // Only replace if the score is in the right dim (not another dim's score)
  const nextDimIdx = manual.indexOf('"key":', dimIdx + scorePat.length);
  if (scoreIdx > nextDimIdx && nextDimIdx > dimIdx) {
    console.log(`  ⚠ ${code} score found in wrong dim, skipping`);
    return;
  }

  if (newScore !== oldScore) {
    manual = manual.substring(0, scoreIdx) + `"score": ${newScore}` + manual.substring(scoreIdx + scoreStr.length);
    scoreChanges++;
    console.log(`  ✓ ${code} ${name}: score ${oldScore}→${newScore}`);
  } else {
    console.log(`  → ${code} ${name}: score=${oldScore} 维持 (auditLog记录)`);
  }

  // 2. Update trend if specified
  if (trend) {
    const trendStr = `"trend": "`;
    const trendIdx = manual.indexOf(trendStr, dimIdx);
    if (trendIdx > 0 && trendIdx < (nextDimIdx > dimIdx ? nextDimIdx : manual.length)) {
      const oldTrendEnd = manual.indexOf('"', trendIdx + trendStr.length);
      const oldTrend = manual.substring(trendIdx + trendStr.length, oldTrendEnd);
      if (oldTrend !== trend) {
        manual = manual.substring(0, trendIdx) + trendStr + trend + '"' + manual.substring(oldTrendEnd);
        console.log(`    trend: ${oldTrend}→${trend}`);
      }
    }
  }

  // 3. Update verifiedAt date
  const vaStr = '"verifiedAt": "';
  const vaIdx = manual.indexOf(vaStr, dimIdx);
  if (vaIdx > 0 && vaIdx < (nextDimIdx > dimIdx ? nextDimIdx : manual.length)) {
    const oldVAEnd = manual.indexOf('"', vaIdx + vaStr.length);
    const newDate = '2026-07-11';
    manual = manual.substring(0, vaIdx + vaStr.length) + newDate + manual.substring(oldVAEnd);
  }

  // 4. Inject auditLog (append if exists, create if not)
  // Check if auditLog already exists
  const auditCheck = manual.indexOf('"auditLog"', dimIdx);
  const closeBraceAfterVA = (() => {
    const fromVA2 = manual.substring(vaIdx);
    const m2 = fromVA2.match(/"verifiedAt":\s*"[^"]*"\s*\n(\s*)\}/);
    return m2 ? vaIdx + m2.index + m2[0].length - 1 : -1;
  })();

  if (auditCheck > 0 && auditCheck < closeBraceAfterVA) {
    // AuditLog already exists — append entry before closing ] of auditLog array
    const arrStart = manual.indexOf('[', auditCheck);
    const arrEnd = manual.lastIndexOf(']', closeBraceAfterVA);
    if (arrEnd > arrStart && arrEnd < closeBraceAfterVA) {
      const entry = makeEntry('2026-07-11','6.74',
        newScore !== oldScore ? {score:{from:oldScore,to:newScore}} : {},
        newScore !== oldScore ? 'score下修(景气系数)' : 'score维持(景气系数)',
        summary, 'CC+akshare CAGR');
      const entryJson = JSON.stringify(entry, null, 10);
      const arrIndent = manual.substring(arrStart + 1).match(/^(\s*)/)[1] || '          ';
      const indented = entryJson.replace(/\n/g, `\n${arrIndent}`);
      manual = manual.substring(0, arrEnd) + ',\n' + arrIndent + indented + '\n' + manual.substring(arrStart + 1).match(/^(\s*)/)[1] + manual.substring(arrEnd);
      auditInjects++;
    }
  } else {
    // No existing auditLog — create new
    const entry = makeEntry('2026-07-11','6.74',
      newScore !== oldScore ? {score:{from:oldScore,to:newScore}} : {},
      newScore !== oldScore ? 'score下修(景气系数)' : 'score维持(景气系数)',
      summary, 'CC+akshare CAGR');
    if (injectAuditLog(code, 'valuation', [entry])) auditInjects++;
  }
});

fs.writeFileSync('data/pcb.manual.js', manual, 'utf8');
console.log(`\n=== 完成 ===`);
console.log(`score 变更: ${scoreChanges} 处`);
console.log(`auditLog 追加: ${auditInjects} 个维度`);
