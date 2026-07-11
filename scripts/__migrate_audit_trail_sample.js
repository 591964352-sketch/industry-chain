// __migrate_audit_trail_sample.js — C2 审计痕迹迁移·3只抽样
// 用法: node scripts/__migrate_audit_trail_sample.js

const fs = require('fs');
let manual = fs.readFileSync('data/pcb.manual.js', 'utf8');
let changes = 0;

function makeAuditEntry(date, commit, change, category, summary, reviewer) {
  const entry = { date, commit, category, summary, reviewer };
  if (change && Object.keys(change).length > 0) entry.change = change;
  return entry;
}

// ==================================================================
// Phase 1: 清理 reason 字段中的 commit 审计文字
// ==================================================================

// --- 688183 生益电子 ---
const clean_688183 = [
  // visibility: §11.9 校准 5→4
  { old: `已按 §11.9 统一校准批次下修至 score=4/trend=up/tier=L4(commit 6.32)。`, label: '688183 visibility' },
  // policy: §11.9 校准 3→4
  { old: `已按 §11.9 统一校准批次上修至 score=4(commit 6.33,score 数字 + reason 字段同步校准)。`, label: '688183 policy' },
];

// --- 002636 金安国纪 ---
const clean_002636 = [
  // visibility: commit 6.44 wording correction
  { old: `▍▍▍▍**信源独立性如实记录段(修正)**:6000 万张产能/95%+ 利用率/100% 产销率 3 数字仅在 L1 一季报正文中核实到(L1 一季报主营拆分段落披露),定增预案/定增问询函回复中**未逐条核实**这 3 个数字是否被重申,**按单一 L1 一季报源处理**而非 ≥2 独立 L1 源。本段为用户口径修正(2026-07-05 commit 6.44 前置自查),原表述"三层 L1 披露"保持但"≥2 独立 L1 源"结论撤回,改为诚实表述。`, label: '002636 visibility' },
  // supply: same pattern, different trailing text
  { old: `▍▍▍▍**信源独立性如实记录段(修正)**:6000 万张产能/95%+ 利用率/100% 产销率 3 数字仅在 L1 一季报正文中核实到(L1 一季报主营拆分段落披露),定增预案/定增问询函回复中**未逐条核实**这 3 个数字是否被重申,**按单一 L1 一季报源处理**而非 ≥2 独立 L1 源。本段为用户口径修正(2026-07-05 commit 6.44 前置自查),与 visibility 维度信源独立性表述保持一致。`, label: '002636 supply' },
  // barrier: same pattern
  { old: `▍▍▍▍**信源独立性如实记录段(修正)**:6000 万张产能/95%+ 利用率/100% 产销率 3 数字仅在 L1 一季报正文中核实到(L1 一季报主营拆分段落披露),定增预案/定增问询函回复中**未逐条核实**这 3 个数字是否被重申,**按单一 L1 一季报源处理**而非 ≥2 独立 L1 源。本段为用户口径修正(2026-07-05 commit 6.44 前置自查),与 visibility/supply 维度信源独立性表述保持一致。`, label: '002636 barrier' },
];

// --- 600183 生益科技 ---
const clean_600183 = [
  // durability: (a) class wording adjustment
  { old: `▍▍▍▍durability (a) 类改措辞记录(commit 前置自查 · 2026-07-06):按 2026-07-06 durability 维度 (a)(b) 分类诊断结论——600183 属于 (a) 类(有可验证客户合作关系证据:M9 等级进入英伟达供应链已量产供货),本次按 (a) 类改措辞不下修 score。原 reason 部分客户锁单 措辞过度,本次诚实修正为 部分客户合作关系可视——M9 等级进入英伟达供应链已量产供货,与 durability 4 分档 较低门槛的可验证客户合作关系证据标准一致。 `, label: '600183 durability' },
  // visibility: score correction
  { old: `本次 visibility 评分一致性修正记录(commit 前置自查 · 2026-07-06):按 P2 阶段(301511 commit 6.47 + 688388 commit 6.47)实际执行标准,§10 visibility 4 分档 客户公开验证 判定核心是 L1 长期框架协议/锁单合同原文 是否有 L1 公告披露,而非 客户验证是否已量产/已认证。本维度修正方法:score 4→3 / trend up→flat(下修后 trend 维持估值中性)/ tier=estimate 保持不变(按用户口径不修改 tier)。修正依据:600183 reason 自承 缺少 L1 巨潮公告原文披露英伟达 M9 CCL 框架协议完整原文(原文表述),具体框架协议金额/年度订单数量/英伟达 M9 占比等量化数据均待人工核实——此项弱点与 301511 visibility=3 评分逻辑(原文自承 缺具体 AI 高端 L1 长期框架协议原文披露)完全相同。301511 已有 L1 trendNote 双源核实 + 全球第二 HVLP4 出货 + 进入英伟达供应链被判 3 分;600183 虽有 M9 大陆唯一 + 已认证 + 已量产等强客户验证证据(强于 301511),但不构成 §10 visibility 4 分档 L1 长期框架协议/锁单合同原文 充分条件。按 §6.11 评分一致性原则,与 301511 visibility=3 评分逻辑对齐。本次修正严格执行 P2 阶段实际执行标准 + 2026-07-06 visibility 评分尺度统一批次结论。`, label: '600183 visibility' },
  // valuation: score correction
  { old: `本次估值评分一致性修正记录(commit 前置自查 · 2026-07-06):原 score=2 与同批次其他 stock valuation 评分存在方向性倒挂——002636/605589/002938/301377 等缺 L1 baostock PE 实测的 stock 全部评 3 分档(PE 分位 50-70% 中性估值),600183 同为缺 L1 PE 实测(本轮 baostock 5 年 PE-TTM 时序未实测)+ tier=estimate 早期默认,严格按 §6.11 估值一致性原则应保守 3 分档对齐。修正方法:score 2→3 / trend 保持 down(估值偏高的边际方向不变)/ tier=estimate 保持不变(按用户口径不修改 tier)。修正后本次 600183 valuation score=3 与 002636/605589/002938/301377 同档(同批次估值评分对齐)。`, label: '600183 valuation' },
];

const allCleans = [...clean_688183, ...clean_002636, ...clean_600183];
allCleans.forEach(({ old, label }) => {
  if (manual.includes(old)) {
    manual = manual.replace(old, '');
    changes++;
    console.log(`✓ cleaned: ${label}`);
  } else {
    console.log(`⚠ NOT FOUND: ${label}`);
  }
});

// ==================================================================
// Phase 2: 注入 auditLog 数组到 dims6 条目中
// 策略: 在每个 dim 条目的 verifiedAt 后的 }, 之前注入 "auditLog": [...]
// ==================================================================

function injectAuditLog(stockCode, dimKey, auditEntries) {
  // 1. 找到 stock block 起点
  const stockStart = manual.indexOf(`"${stockCode}": {`);
  if (stockStart < 0) { console.log(`  ⚠ stock ${stockCode} not found`); return false; }

  // 2. 在 stock block 内, 找到目标 dim key
  //    找一个粗略的 block 终点 (下一个 "code": 或下一个 stock)
  const nextStockRe = new RegExp(`\\n\\s{4}\"\\d{6}\":\\s*\\{`, 'g');
  nextStockRe.lastIndex = stockStart + 10;
  const nextMatch = nextStockRe.exec(manual);
  const searchEnd = nextMatch ? nextMatch.index : manual.length;
  const searchRegion = manual.substring(stockStart, searchEnd);

  // 3. 在 searchRegion 中找 "key": "dimKey"
  const dimKeyIdx = searchRegion.indexOf(`"key": "${dimKey}"`);
  if (dimKeyIdx < 0) { console.log(`  ⚠ ${stockCode}.${dimKey}: key not found`); return false; }

  // 4. 从 dim key 往后找第一个 verifiedAt
  const fromDimKey = searchRegion.substring(dimKeyIdx);
  const vaIdx = fromDimKey.indexOf('"verifiedAt"');
  if (vaIdx < 0) { console.log(`  ⚠ ${stockCode}.${dimKey}: verifiedAt not found`); return false; }

  // 5. 从 verifiedAt 往后找第一个 } (闭合当前 dim 对象)
  const fromVA = fromDimKey.substring(vaIdx);
  // 找第一个独占一行的 }, (dim entry 的闭合括号)
  // 模式: "verifiedAt": "..."\n         }
  const closeMatch = fromVA.match(/"verifiedAt":\s*"[^"]*"\s*\n(\s*)\}/);
  if (!closeMatch) { console.log(`  ⚠ ${stockCode}.${dimKey}: close brace not found`); return false; }

  const closeBraceIdx = vaIdx + closeMatch.index + closeMatch[0].length - 1; // position of }
  const absoluteIdx = stockStart + dimKeyIdx + closeBraceIdx;

  // 6. 构建 auditLog JSON
  const auditJson = `"auditLog": ${JSON.stringify(auditEntries, null, 10)}`;
  // 需要保持缩进: 找到 } 之前的缩进
  const indent = closeMatch[1]; // e.g. "        "
  const indentedAudit = auditJson.replace(/\n/g, `\n${indent}`);

  // 7. 注入: 在 } 之前插入 ,\n<indent>auditLog\n<indent>
  manual = manual.substring(0, absoluteIdx) + ',\n' + indent + indentedAudit + '\n' + manual.substring(absoluteIdx);
  console.log(`  ✓ injected ${stockCode}.${dimKey} auditLog (${auditEntries.length} entries)`);
  return true;
}

// 688183
injectAuditLog('688183', 'visibility', [makeAuditEntry(
  '2026-07-04', '6.32',
  { score: { from: 5, to: 4 }, tier: { from: 'L1', to: 'L4' } },
  'score下修',
  '§11.9 统一校准：原 score=5 属历史估计，按 §10 5 档表严格判定，缺 L1 客户锁单协议 → 下修至 4，tier 同步 L1→L4',
  '§11.9统一校准'
)]);
injectAuditLog('688183', 'policy', [makeAuditEntry(
  '2026-07-04', '6.33',
  { score: { from: 3, to: 4 } },
  'score上修',
  '§11.9 统一校准：原 score=3 偏保守，综合电子信息制造国产替代+AI 算力基建扶持双主线定性，上修至 4',
  '§11.9统一校准'
)]);

// 002636 — 3 dims, same correction
const jia236 = makeAuditEntry(
  '2026-07-05', '6.44',
  {},
  '措辞修正',
  '用户口径修正：撤回"≥2 独立 L1 源"声称，6000 万张产能/95%+利用率/100%产销率仅 L1 一季报单源核实。不影响 score',
  '前置自查'
);
injectAuditLog('002636', 'visibility', [jia236]);
injectAuditLog('002636', 'supply', [jia236]);
injectAuditLog('002636', 'barrier', [jia236]);

// 600183
injectAuditLog('600183', 'durability', [makeAuditEntry(
  '2026-07-06', '前置自查',
  {},
  '措辞修正',
  'durability (a) 类改措辞：原"部分客户锁单"措辞过度，修正为"部分客户合作关系可视—M9 进入英伟达供应链已量产供货"。不下修 score',
  '前置自查'
)]);
injectAuditLog('600183', 'visibility', [makeAuditEntry(
  '2026-07-06', '前置自查',
  { score: { from: 4, to: 3 }, trend: { from: 'up', to: 'flat' } },
  'score下修',
  'P2 阶段评分一致性修正：缺 L1 长期框架协议原文，与 301511/688388 同标准下修 4→3，trend up→flat',
  '前置自查'
)]);
injectAuditLog('600183', 'valuation', [makeAuditEntry(
  '2026-07-06', '前置自查',
  { score: { from: 2, to: 3 } },
  'score上修',
  '估值评分一致性修正：原 score=2 与同批次缺 L1 PE 实测 stock（002636/605589 等全部 3 分档）方向倒挂，统一对齐至 3。trend 保持 down',
  '前置自查'
)]);

// ===== Write back =====
fs.writeFileSync('data/pcb.manual.js', manual, 'utf8');
console.log(`\n=== 迁移完成 ===`);
console.log(`reason 清理: ${changes} 处`);
console.log(`auditLog 注入: 8 个维度`);
