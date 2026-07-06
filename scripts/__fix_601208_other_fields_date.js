// 修复 601208 东材科技 4 个字段中的 2026-04-24 未核实日期
// 本次不留待后续批次,一并清理

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const changes = [
  // ========== 1. position 字段(758 行) ==========
  // 原文:实控人熊海涛 2026-04-24 解除留置。
  // 改为:实控人熊海涛治理事件经历留置→解除阶段(具体解除日期经投顾核实归未查到)。
  {
    name: '601208 position 字段: 删除具体解除日期',
    old: "实控人熊海涛 2026-04-24 解除留置。",
    new: "实控人熊海涛治理事件经历留置→解除阶段(具体解除日期经投顾核实未找到 L1 原文支撑,归未查到)。",
  },

  // ========== 2. caliber 字段(761 行) ==========
  // 原文:2026-04-22一季报+2026-04-25解除留置公告
  // "2026-04-25 解除留置公告"是 L1 公告文件名(公告日期 4-25)
  // 这个比"实控人 4-24 解除"可靠,但为一致性也按"具体日期归未查到"口径处理
  // 改为:2026-04-22 一季报 + 2026Q2 后续公告
  {
    name: '601208 caliber 字段: 删除公告日期',
    old: "L1东材2025年报+2026-04-22一季报+2026-04-25解除留置公告",
    new: "L1东材2025年报+2026-04-22一季报+2026Q2后续治理公告(具体留置解除相关公告披露日期归未查到)",
  },

  // ========== 3. investableReason 字段(762 行) ==========
  // 原文:实控人熊海涛 2026-01-27 留置，2026-04-24 解除，已能正常履职（L1）
  // 改为:实控人熊海涛治理事件经历留置→解除阶段(具体解除日期归未查到),已能正常履职(L1)
  {
    name: '601208 investableReason 字段: 删除具体解除日期',
    old: "实控人熊海涛 2026-01-27 留置，2026-04-24 解除，已能正常履职（L1）。",
    new: "实控人熊海涛治理事件经历留置→解除阶段(具体解除日期经投顾核实未找到 L1 原文支撑,归未查到),已能正常履职(L1)。",
  },

  // ========== 4. trendNote 字段(764 行) ==========
  // 原文:实控人2026-04-24解除留置
  // 改为:实控人治理解除阶段(具体解除日期归未查到)
  {
    name: '601208 trendNote 字段: 删除具体解除日期',
    old: "⚠️ 实控人2026-04-24解除留置·",
    new: "⚠️ 实控人治理事件已演进至解除阶段(具体解除日期归未查到)·",
  },
];

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) return startPos + 10 + m.index;
  return code.length;
}

const stock = '601208';
const stockStart = code.indexOf(`'${stock}':`);
if (stockStart < 0) { console.log('NOT FOUND'); process.exit(1); }
const stockEnd = findStockEnd(code, stockStart);
const stockBlock = code.substring(stockStart, stockEnd);

let newBlock = stockBlock;
let totalReplaced = 0;
for (const change of changes) {
  const occurrences = (newBlock.match(new RegExp(escapeRegex(change.old), 'g')) || []).length;
  if (occurrences === 0) {
    console.log(`[${stock}] [MISS] ${change.name}`);
    continue;
  }
  if (occurrences > 1) {
    console.log(`[${stock}] [AMBIGUOUS ${occurrences}] ${change.name}`);
    continue;
  }
  newBlock = newBlock.split(change.old).join(change.new);
  totalReplaced += 1;
  console.log(`[${stock}] [OK] ${change.name}`);
}

if (newBlock !== stockBlock) {
  code = code.substring(0, stockStart) + newBlock + code.substring(stockEnd);
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log(`\n总替换: ${totalReplaced} 处 (预期 ${changes.length} 处)`);
  console.log('write done');
}
