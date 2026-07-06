// 601208 dims6 内部清理:3 处 2026-04-25 解除留置公告 + 3 处 2026-05-29 业绩说明会
// 按"不区别对待"原则,与 4-24 一样归【6. 未查到】

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) return startPos + 10 + m.index;
  return code.length;
}

const stock = '601208';
const stockStart = code.indexOf(`'${stock}':`);
const stockEnd = findStockEnd(code, stockStart);
let stockBlock = code.substring(stockStart, stockEnd);

const changes = [
  // ========== A 类信号开头(2 处,各在 durability + visibility) ==========
  {
    name: '601208 L1 公司公告清单 - 在 A 类信号开头 (durability)',
    old: "L1 公司公告(2025 年报+2026Q1 季报+2026-04-25 解除留置公告+2026-05-29 业绩说明会):1) 实控人",
    new: "L1 公司公告(2025 年报+2026Q1 季报,后续治理相关公告披露日期归【6. 未查到】):1) 实控人",
  },
  {
    name: '601208 L1 公司公告清单 - 在 visibility "(2025 年报+...业绩说明会)"',
    old: "L1 公司公告(2025 年报+2026Q1 季报+2026-04-25 解除留置公告+2026-05-29 业绩说明会)+ L4",
    new: "L1 公司公告(2025 年报+2026Q1 季报,后续治理相关公告披露日期归【6. 未查到】)+ L4",
  },
  // ========== 来源段(1 处,在 durability reason 末尾) ==========
  {
    name: '601208 来源段 - durability reason 末尾',
    old: "L1 2026Q1 季报 + L1 2026-04-25 解除留置公告 + L1 2026-05-29 业绩说明会",
    new: "L1 2026Q1 季报 + 后续治理相关公告(具体披露日期归【6. 未查到】)",
  },
];

let totalReplaced = 0;
for (const change of changes) {
  const occurrences = (stockBlock.match(new RegExp(escapeRegex(change.old), 'g')) || []).length;
  if (occurrences === 0) {
    console.log(`[${stock}] [MISS] ${change.name}`);
    continue;
  }
  if (occurrences > 1) {
    console.log(`[${stock}] [AMBIGUOUS ${occurrences}] ${change.name}`);
    continue;
  }
  stockBlock = stockBlock.split(change.old).join(change.new);
  totalReplaced += 1;
  console.log(`[${stock}] [OK] ${change.name}`);
}

if (totalReplaced > 0) {
  code = code.substring(0, stockStart) + stockBlock + code.substring(stockEnd);
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log(`\n总替换: ${totalReplaced} 处`);
  console.log('write done');
}
