// __migrate_audit_trail_batch.js — C2 审计痕迹迁移·剩余20只批量执行
const fs = require('fs');
let manual = fs.readFileSync('data/pcb.manual.js', 'utf8');
let reasonCleans = 0;
let auditInjects = 0;

function makeEntry(date, commit, change, category, summary, reviewer) {
  const e = { date, commit, category, summary, reviewer };
  if (change && Object.keys(change).length > 0) e.change = change;
  return e;
}

// Replace audit trail text in the file (works on the full manual string)
function replaceText(oldStr, label) {
  if (!manual.includes(oldStr)) {
    console.log('  ⚠ NOT FOUND:', label.substring(0, 80));
    return false;
  }
  manual = manual.replace(oldStr, '');
  reasonCleans++;
  console.log('  ✓', label.substring(0, 80));
  return true;
}

// Inject auditLog before closing brace of a dim entry
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
  auditInjects++;
  return true;
}

// ====================================================================
// Group A: §11.9 统一校准批次
// ====================================================================

// 300395 菲利华 — 3 dims, commit 6.32, same score下修
replaceText('§11.9 统一校准批次下修至 4(commit 6.32)。B 类业绩支撑 t', '300395 durability');
replaceText('§11.9 统一校准批次下修至 4(commit 6.32),trend=up ', '300395 visibility');
replaceText('§11.9 统一校准批次下修至 4(commit 6.32)。B 类同业扩产支撑', '300395 supply');
const e395 = makeEntry('2026-07-04','6.32',{score:{from:5,to:4}},'score下修',
  '§11.9 统一校准：300395 6 维 5-1 极差人工核实后，durability/visibility/supply 原 score=5 属历史估计，下修至 4',
  '§11.9统一校准');
injectAuditLog('300395','durability',[e395]);
injectAuditLog('300395','visibility',[e395]);
injectAuditLog('300395','supply',[e395]);

// 002384 东山精密
replaceText('§11.9 统一校准批次下修至 score=4/trend=up/tier=L4(commit 6.32):原 score=5 属历史估计','002384 visibility');
injectAuditLog('002384','visibility',[makeEntry('2026-07-04','6.32',
  {score:{from:5,to:4},tier:{from:'L1',to:'L4'}},'score下修',
  '§11.9 统一校准：原 score=5 属历史估计，按 §10 5 档表判定下修至 4，tier L1→L4','§11.9统一校准')]);
replaceText('§11.9 统一校准批次上修至 score=4(commit 6.33,score 数字 + reason 字段同步校准)。近一年无重大顶层政策调整','002384 policy');
injectAuditLog('002384','policy',[makeEntry('2026-07-04','6.33',
  {score:{from:3,to:4}},'score上修',
  '§11.9 统一校准：原 score=3 偏保守，综合全球唯一光模块+AI PCB 双能力定位上修至 4','§11.9统一校准')]);

// 600110 诺德股份
replaceText('§11.9 统一校准批次上修至 score=4(commit 6.33)。近一年','600110 policy');
injectAuditLog('600110','policy',[makeEntry('2026-07-04','6.33',
  {score:{from:3,to:4}},'score上修',
  '§11.9 统一校准：综合电子信息制造国产替代+政策方向定性，上修至 4','§11.9统一校准')]);

// 301217/002916 policy trend=flat
replaceText('§11.9 统一校准批次下修至 trend=flat(commit 6.33)。','301217 policy');
injectAuditLog('301217','policy',[makeEntry('2026-07-04','6.33',
  {trend:{from:'up',to:'flat'}},'trend修正',
  '§11.9 统一校准：policy trend up→flat，近一年无重大政策调整','§11.9统一校准')]);
replaceText('§11.9 统一校准批次下修至 trend=flat(commit 6.33)。','002916 policy');
injectAuditLog('002916','policy',[makeEntry('2026-07-04','6.33',
  {trend:{from:'up',to:'flat'}},'trend修正',
  '§11.9 统一校准：policy trend up→flat，近一年无重大政策调整','§11.9统一校准')]);

// ====================================================================
// Group B: commit 6.65/6.66 严标准下修
// ====================================================================
const grpB = [
  {code:'000657',dim:'visibility',old:'▍▍▍▍ 评分下修记录(commit 6.65 · 2026-07-07 下修):2026',cn:'6.65'},
  {code:'300179',dim:'visibility',old:'▍▍▍▍ 评分下修记录(commit 6.65 · 2026-07-07 下修):2026',cn:'6.65'},
  {code:'301150',dim:'visibility',old:'▍▍▍▍ 评分下修记录(commit 6.65 · 2026-07-07 下修):2026',cn:'6.65'},
  {code:'600176',dim:'visibility',old:'▍▍▍▍ 评分下修记录(commit 6.66 · 2026-07-07 下修):2026',cn:'6.66'},
];
grpB.forEach(({code,dim,old,cn}) => {
  // Remove from ▍▍▍▍ to the next ▍ separator or end of sentence
  const idx = manual.indexOf(old);
  if (idx < 0) { console.log('  ⚠ NOT FOUND:', code, dim, 'group B'); return; }
  // Find the right boundary: the next ▍ after the marker
  const searchFrom = idx + old.length;
  let endIdx = manual.indexOf('▍', searchFrom);
  if (endIdx < 0 || endIdx - searchFrom > 600) {
    // Fallback: next sentence end
    endIdx = manual.indexOf('。', searchFrom) + 1;
  }
  if (endIdx <= 0) endIdx = searchFrom;
  const removed = manual.substring(idx, endIdx);
  manual = manual.substring(0, idx) + manual.substring(endIdx);
  reasonCleans++; console.log('  ✓', code, dim, 'commit', cn);
  injectAuditLog(code, dim, [makeEntry('2026-07-07',cn,
    {score:{from:3,to:2}},'score下修',
    `commit ${cn} 严标准下修：原 score=3 偏乐观，严格按 §10 visibility 5 档表判定下修至 2`,'前置自查')]);
});

// Also clean remaining commit 6.65 references within 600176 visibility reason
// (the ▍▍▍▍ block already removed, but inline refs may remain)
// We skip this — the block removal already handled the main audit text

// ====================================================================
// Group C: durability (a) 类改措辞 — 前置自查
// ====================================================================
const grpC_codes = ['301377','603256','605589','002436'];
grpC_codes.forEach(code => {
  const old = '▍▍▍▍durability (a) 类改措辞记录(commit 前置自查 · 2026-07-06)';
  const idx = manual.indexOf(old);
  if (idx < 0) { console.log('  ⚠ NOT FOUND:', code, 'durability (a)'); return; }
  // Find end: next ▍ after the marker
  let endIdx = manual.indexOf('▍', idx + old.length);
  if (endIdx < 0 || endIdx - idx > 500) {
    endIdx = manual.indexOf('。', idx + old.length) + 1;
  }
  if (endIdx <= 0) endIdx = idx + old.length;
  manual = manual.substring(0, idx) + manual.substring(endIdx);
  reasonCleans++; console.log('  ✓', code, 'durability (a)');
  injectAuditLog(code, 'durability', [makeEntry('2026-07-06','前置自查',{},
    '措辞修正','durability (a) 类改措辞：原"部分客户锁单"等措辞过度，修正为诚实表述，不下修 score','前置自查')]);
});

// ====================================================================
// Group D: 评分下修记录(commit 前置自查 2026-07-06 / commit 6.47)
// ====================================================================
[
  {code:'603519',dim:'durability',old:'评分下修记录(commit 前置自查 · 2026-07-06):原 score=4',from:4,to:3},
  {code:'603519',dim:'valuation',old:'评分下修记录(commit 6.47 前置自查 · 2026-07-05):原 score=4',from:4,to:3,cn:'6.47',dt:'2026-07-05'},
  {code:'688388',dim:'durability',old:'评分下修记录(commit 前置自查 · 2026-07-06):原 score=4',from:4,to:3},
  {code:'688388',dim:'visibility',old:'评分下修记录(commit 6.47 前置自查 · 2026-07-05):原 score=4',from:4,to:3,cn:'6.47',dt:'2026-07-05'},
  {code:'002938',dim:'durability',old:'评分下修记录(commit 前置自查 · 2026-07-06):原 score=4',from:4,to:3},
].forEach(({code,dim,old,from,to,cn,dt}) => {
  const idx = manual.indexOf(old);
  if (idx < 0) { console.log('  ⚠ NOT FOUND:', code, dim, 'score down'); return; }
  let endIdx = manual.indexOf('▍', idx + old.length);
  if (endIdx < 0 || endIdx - idx > 500) {
    endIdx = manual.indexOf('。', idx + old.length) + 1;
  }
  if (endIdx <= 0) endIdx = idx + old.length;
  manual = manual.substring(0, idx) + manual.substring(endIdx);
  reasonCleans++; console.log('  ✓', code, dim, 'score', from+'→'+to);
  injectAuditLog(code, dim, [makeEntry(dt||'2026-07-06',cn||'前置自查',
    {score:{from:from,to:to}},'score下修',
    `前置自查：原 score=${from} 偏高，严格按 §10 5 档表判定下修至 ${to}`,'前置自查')]);
});

// ====================================================================
// Group E: 评分一致性修正记录
// ====================================================================
[
  {code:'603920',dim:'visibility'},
  {code:'002938',dim:'visibility'},
].forEach(({code,dim}) => {
  const old = '评分一致性修正记录(commit 前置自查 · 2026-07-06):按 P2 阶段';
  const idx = manual.indexOf(old);
  if (idx < 0) { console.log('  ⚠ NOT FOUND:', code, dim, 'consistency'); return; }
  let endIdx = manual.indexOf('▍tier=', idx + old.length);
  if (endIdx < 0) endIdx = manual.indexOf('▍豆包', idx + old.length);
  if (endIdx < 0) { endIdx = manual.indexOf('。', idx + old.length) + 1; }
  if (endIdx <= 0) endIdx = idx + old.length;
  manual = manual.substring(0, idx) + manual.substring(endIdx);
  reasonCleans++; console.log('  ✓', code, dim, 'consistency');
  injectAuditLog(code, dim, [makeEntry('2026-07-06','前置自查',{},
    '措辞修正','P2 阶段评分一致性修正：按 P2 阶段执行标准统一评分尺度','前置自查')]);
});

// ====================================================================
// Group F: 专项修正
// ====================================================================
// 002080 durability — 锁单措辞修正 commit 6.45
{
  const old = '▍▍▍▍**锁单措辞修正记录(commit 6.45 前置自查 · 2026-0';
  const idx = manual.indexOf(old);
  if (idx >= 0) {
    let endIdx = manual.indexOf('▍', idx + old.length);
    if (endIdx < 0 || endIdx - idx > 500) endIdx = manual.indexOf('。', idx + old.length) + 1;
    if (endIdx <= 0) endIdx = idx + old.length;
    manual = manual.substring(0, idx) + manual.substring(endIdx);
    reasonCleans++; console.log('  ✓ 002080 durability lock claim fix');
    injectAuditLog('002080','durability',[makeEntry('2026-07-06','6.45',{},
      '措辞修正','锁单措辞修正：原"部分客户锁单(胜宏 GB300)"过度声称，修正为诚实表述','前置自查')]);
  } else { console.log('  ⚠ NOT FOUND: 002080 durability 6.45'); }
}

// 002384 barrier tier 修正 commit 6.56
{
  const old = '▍▍▍▍▍barrier tier 修正记录(commit 6.56 · 202';
  const idx = manual.indexOf(old);
  if (idx >= 0) {
    let endIdx = manual.indexOf('▍', idx + old.length);
    if (endIdx < 0 || endIdx - idx > 500) endIdx = manual.indexOf('。', idx + old.length) + 1;
    if (endIdx <= 0) endIdx = idx + old.length;
    manual = manual.substring(0, idx) + manual.substring(endIdx);
    reasonCleans++; console.log('  ✓ 002384 barrier tier fix');
    injectAuditLog('002384','barrier',[makeEntry('2026-07-06','6.56',
      {tier:{from:'L1',to:'L4'}},'tier修正',
      'chokePoints 信源诊断后 barrier tier L1→L4：原 tier=L1 标注为伪 L1 瑕疵','前置自查')]);
  } else { console.log('  ⚠ NOT FOUND: 002384 barrier 6.56'); }
}

// 002436 policy 评分依据核实修正 commit 6.46
{
  const old = '▍▍▍▍▍policy 评分依据核实修正记录(commit 6.46 前置自查';
  const idx = manual.indexOf(old);
  if (idx >= 0) {
    let endIdx = manual.indexOf('▍', idx + old.length);
    if (endIdx < 0 || endIdx - idx > 500) endIdx = manual.indexOf('。', idx + old.length) + 1;
    if (endIdx <= 0) endIdx = idx + old.length;
    manual = manual.substring(0, idx) + manual.substring(endIdx);
    reasonCleans++; console.log('  ✓ 002436 policy score fix');
    injectAuditLog('002436','policy',[makeEntry('2026-07-06','6.46',
      {score:{from:4,to:3}},'score下修',
      'policy 评分依据核实修正：原 4 分与同批次存双标嫌疑，下修至 3 分','前置自查')]);
  } else { console.log('  ⚠ NOT FOUND: 002436 policy 6.46'); }
}

// ====================================================================
// Write back
// ====================================================================
fs.writeFileSync('data/pcb.manual.js', manual, 'utf8');
console.log(`\n=== 批量迁移完成 ===`);
console.log(`reason 清理: ${reasonCleans} 处`);
console.log(`auditLog 注入: ${auditInjects} 个维度`);
