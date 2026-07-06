// 3 处组合 tier 逻辑澄清修正
// 1. 300476 durability: L3+L4 → L4 (无 L1 也无 L3)
// 2. 300476 visibility: L3+L4 → L1 (含 L1 一季报)
// 3. 002463 barrier: L3+L4 → L1 (无 L3,只有 L1 + L4,主驱动 L1)

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const CHANGES = [
  // 1. 300476 durability: L3+L4 → L4
  {
    stock: '300476',
    desc: '300476 durability 组合 tier L3+L4 → L4(已确认无 L1 也无 L3 行业机构数据)',
    old: "{key:'durability',score:5,trend:'up',tier:'L3+L4',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'}",
    new: "{key:'durability',score:5,trend:'up',tier:'L4',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'}",
  },
  // 2. 300476 visibility: L3+L4 → L1
  {
    stock: '300476',
    desc: '300476 visibility 组合 tier L3+L4 → L1(含 L1 一季报 26Q1 营收/净利)',
    old: "{key:'visibility',score:5,trend:'up',tier:'L3+L4',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'}",
    new: "{key:'visibility',score:5,trend:'up',tier:'L1',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'}",
  },
  // 3. 002463 barrier: L3+L4 → L1
  {
    stock: '002463',
    desc: '002463 barrier 组合 tier L3+L4 → L1(已确认 reason 中无 L3 行业机构数据,只有 L1 + L4,主驱动 L1)',
    old: "{key:'barrier',score:5,trend:'flat',tier:'L3+L4',reason:'78 层 M9 全球独家量产（broker 华泰 2026-05-25）+GB200/GB300 全系认证+AI 板良率 92-98%+全球仅沪电与日本 Ibiden 通过认证(后者未量产),壁垒极高;豆包 2026-06-26 确认 → 5'}",
    new: "{key:'barrier',score:5,trend:'flat',tier:'L1',reason:'78 层 M9 全球独家量产（broker 华泰 2026-05-25）+GB200/GB300 全系认证+AI 板良率 92-98%+全球仅沪电与日本 Ibiden 通过认证(后者未量产),壁垒极高;豆包 2026-06-26 确认 → 5'}",
  },
];

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) return startPos + 10 + m.index;
  return code.length;
}

let totalReplaced = 0;
for (const change of CHANGES) {
  const stock = change.stock;
  const stockStart = code.indexOf(`'${stock}':`);
  if (stockStart === -1) {
    console.log(`[${stock}] NOT FOUND`);
    continue;
  }
  const stockEnd = findStockEnd(code, stockStart);
  const stockBlock = code.substring(stockStart, stockEnd);
  const occurrences = (stockBlock.match(new RegExp(escapeRegex(change.old), 'g')) || []).length;
  if (occurrences === 0) {
    console.log(`[${stock}] [MISS] ${change.desc}`);
    continue;
  }
  if (occurrences > 1) {
    console.log(`[${stock}] [AMBIGUOUS] ${change.desc} - ${occurrences} 次`);
    continue;
  }
  const before = code.substring(0, stockStart);
  const block = code.substring(stockStart, stockEnd);
  const after = code.substring(stockEnd);
  code = before + block.split(change.old).join(change.new) + after;
  totalReplaced += 1;
  console.log(`[${stock}] [OK] ${change.desc}`);
}

console.log(`\n总替换: ${totalReplaced} 处 (预期 ${CHANGES.length} 处)`);
if (totalReplaced === CHANGES.length) {
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log('write done');
}
