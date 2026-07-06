// 修正 002636 金安国纪 6 处 "2026-06-15 定增问询函回复" 日期
// 经投顾核实:2026 年 3 月 10 日收到深交所审核问询函,回复更新披露于 2026 年 4 月 1 日
// 原"2026-06-15" 与实际不符

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) return startPos + 10 + m.index;
  return code.length;
}

const stock = '002636';
const stockStart = code.indexOf(`'${stock}':`);
if (stockStart < 0) { console.log('NOT FOUND'); process.exit(1); }
const stockEnd = findStockEnd(code, stockStart);
let stockBlock = code.substring(stockStart, stockEnd);

const old = '2026-06-15 定增问询函回复';
const replaced = '2026 年 3 月 10 日收到深交所审核问询函,回复更新披露于 2026 年 4 月 1 日';

const occurrences = (stockBlock.match(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log(`匹配 "${old}" 次数:`, occurrences);

if (occurrences > 0) {
  stockBlock = stockBlock.split(old).join(replaced);
  code = code.substring(0, stockStart) + stockBlock + code.substring(stockEnd);
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log(`已替换 ${occurrences} 处`);
  console.log('write done');
}
