// 7 只 chokePoints tier 修复·第二批(commit 6.57 前置 · 25 处改动)
// 300476/002463 完全无 tier 字段 → 补 tier(单行 dims6 模式)
// 601208/300395/002916/301217 → 改 tier 准确性
// 仅改 tier,不动 score/trend

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 每条改动: [stockCode, oldSubstring, newSubstring]
// oldSubstring 是唯一字符串(用完整 dimBlock 或 key+score+trend+tier 组合)
const CHANGES = [
  // ========== 300476 胜宏科技(5 处补 tier) ==========
  // durability:无 tier,补 L3+L4(含 Prismark + L4 调研)
  {
    stock: '300476',
    desc: '300476 durability 补 L3+L4',
    old: "{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'",
    new: "{key:'durability',score:5,trend:'up',tier:'L3+L4',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'",
  },
  // visibility:无 tier,补 L3+L4(Prismark L3 + L1 财报 + L4 调研综合)
  {
    stock: '300476',
    desc: '300476 visibility 补 L3+L4',
    old: "{key:'visibility',score:5,trend:'up',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'",
    new: "{key:'visibility',score:5,trend:'up',tier:'L3+L4',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'",
  },
  // policy:无 tier,补 estimate(政策方向定性,沿用 §6.7.2 口径)
  {
    stock: '300476',
    desc: '300476 policy 补 estimate',
    old: "{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'",
    new: "{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'AI capex 市场驱动+IC 载板 02 专项关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'",
  },
  // valuation:无 tier,补 L1(PE-TTM baostock L1)
  {
    stock: '300476',
    desc: '300476 valuation 补 L1',
    old: "{key:'valuation',score:2,trend:'down',reason:'PE-TTM 74.65 倍/3 年分位 95.98%(asOf 2026-06-16),估值高位,趋势向下(性价比恶化);扣分项为估值最贵,需控买点 → 2'",
    new: "{key:'valuation',score:2,trend:'down',tier:'L1',reason:'PE-TTM 74.65 倍/3 年分位 95.98%(asOf 2026-06-16),估值高位,趋势向下(性价比恶化);扣分项为估值最贵,需控买点 → 2'",
  },
  // barrier:无 tier,补 L3+L4(类比 002384 修复)
  {
    stock: '300476',
    desc: '300476 barrier 补 L3+L4',
    old: "{key:'barrier',score:5,trend:'flat',reason:'英伟达 Tier1 + GB300 OAM 子板核心 / 显卡 PCB 全球市占率 ~50%(市占率口径·Prismark 2026) / 100+ 层技术储备·70 层量产(技术能力) / AI 营收占比 43.20%(嵌套口径:AI 占 PCB 业务·巨潮 2025 年报),壁垒极高;豆包 2026-06-26 确认 → 5'",
    new: "{key:'barrier',score:5,trend:'flat',tier:'L3+L4',reason:'英伟达 Tier1 + GB300 OAM 子板核心 / 显卡 PCB 全球市占率 ~50%(市占率口径·Prismark 2026) / 100+ 层技术储备·70 层量产(技术能力) / AI 营收占比 43.20%(嵌套口径:AI 占 PCB 业务·巨潮 2025 年报),壁垒极高;豆包 2026-06-26 确认 → 5'",
  },

  // ========== 002463 沪电股份(5 处补 tier) ==========
  // durability:无 tier,补 L1(含 L1 泰国工厂公告 + L4 调研)
  {
    stock: '002463',
    desc: '002463 durability 补 L1',
    old: "{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;沪电为英伟达 H100/H200 提供 22-26 层高多层板,H200 UBB 主板份额超 70%(截至 2025),泰国工厂 2025.10 投产承接 GB300 订单,延续性极强 → 5'",
    new: "{key:'durability',score:5,trend:'up',tier:'L1',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;沪电为英伟达 H100/H200 提供 22-26 层高多层板,H200 UBB 主板份额超 70%(截至 2025),泰国工厂 2025.10 投产承接 GB300 订单,延续性极强 → 5'",
  },
  // visibility:无 tier,补 L1(L1 营收/净利财报)
  {
    stock: '002463',
    desc: '002463 visibility 补 L1',
    old: "{key:'visibility',score:5,trend:'up',reason:'26Q1 营收 62.14 亿(+53.91% 同比),归母 12.42 亿(+62.9% 同比),英伟达份额>50%;2025 净利 38.22 亿(+47.74% 同比);AI 营收占比 Q1 季报口径 ~60%、全年口径 15.9%(嵌套口径:AI 占 PCB 业务,公司主营 PCB 占总营收 95.77%);业绩兑现极强,趋势向上 → 5'",
    new: "{key:'visibility',score:5,trend:'up',tier:'L1',reason:'26Q1 营收 62.14 亿(+53.91% 同比),归母 12.42 亿(+62.9% 同比),英伟达份额>50%;2025 净利 38.22 亿(+47.74% 同比);AI 营收占比 Q1 季报口径 ~60%、全年口径 15.9%(嵌套口径:AI 占 PCB 业务,公司主营 PCB 占总营收 95.77%);业绩兑现极强,趋势向上 → 5'",
  },
  // policy:无 tier,补 L2(政策方向定性 + L2 02 专项 + 大基金)
  {
    stock: '002463',
    desc: '002463 policy 补 L2',
    old: "{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项+大基金二期关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'",
    new: "{key:'policy',score:3,trend:'flat',tier:'L2',reason:'AI capex 市场驱动+IC 载板 02 专项+大基金二期关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'",
  },
  // valuation:无 tier,补 L1(PE-TTM baostock L1)
  {
    stock: '002463',
    desc: '002463 valuation 补 L1',
    old: "{key:'valuation',score:2,trend:'down',reason:'PE-TTM 62.91 倍/3 年分位 90.48%(asOf 2026-06-16),估值偏高,趋势向下(性价比恶化);扣分项为估值高位,需控买点 → 2'",
    new: "{key:'valuation',score:2,trend:'down',tier:'L1',reason:'PE-TTM 62.91 倍/3 年分位 90.48%(asOf 2026-06-16),估值偏高,趋势向下(性价比恶化);扣分项为估值高位,需控买点 → 2'",
  },
  // barrier:无 tier,补 L3+L4(类比 002384 修复,含 L1 GB200/GB300 + L4 华泰)
  {
    stock: '002463',
    desc: '002463 barrier 补 L3+L4',
    old: "{key:'barrier',score:5,trend:'flat',reason:'78 层 M9 全球独家量产（broker 华泰 2026-05-25）+GB200/GB300 全系认证+AI 板良率 92-98%+全球仅沪电与日本 Ibiden 通过认证(后者未量产),壁垒极高;豆包 2026-06-26 确认 → 5'}",
    new: "{key:'barrier',score:5,trend:'flat',tier:'L3+L4',reason:'78 层 M9 全球独家量产（broker 华泰 2026-05-25）+GB200/GB300 全系认证+AI 板良率 92-98%+全球仅沪电与日本 Ibiden 通过认证(后者未量产),壁垒极高;豆包 2026-06-26 确认 → 5'}",
  },

  // ========== 002916 深南电路备注 ==========
  // supply L3+estimate → L3 + 4 处其他 = 总 5 处,不在这里重复

  // ========== 601208 东材科技(4 处改 tier) ==========
  // visibility: L4 → L1(含 baostock L1 + L1 公司公告)
  {
    stock: '601208',
    desc: '601208 visibility L4 → L1',
    old: "key:'visibility',score:3,trend:'up',tier:'L4'",
    new: "key:'visibility',score:3,trend:'up',tier:'L1'",
  },
  // valuation: L4 → L1(PE-TTM baostock L1)
  {
    stock: '601208',
    desc: '601208 valuation L4 → L1',
    old: "key:'valuation',score:2,trend:'down',tier:'L4'",
    new: "key:'valuation',score:2,trend:'down',tier:'L1'",
  },
  // supply: L3 → L1(核心数据是 L1 公告)
  {
    stock: '601208',
    desc: '601208 supply L3 → L1',
    old: "key:'supply',score:3,trend:'down',tier:'L3'",
    new: "key:'supply',score:3,trend:'down',tier:'L1'",
  },
  // barrier: L3 → L1(核心数据是 L1 公告)
  {
    stock: '601208',
    desc: '601208 barrier L3 → L1',
    old: "key:'barrier',score:3,trend:'down',tier:'L3'",
    new: "key:'barrier',score:3,trend:'down',tier:'L1'",
  },

  // ========== 300395 菲利华(5 处改 tier) ==========
  // durability: estimate → L1
  {
    stock: '300395',
    desc: '300395 durability estimate → L1',
    old: "key:'durability',score:4,trend:'up',tier:'estimate'",
    new: "key:'durability',score:4,trend:'up',tier:'L1'",
  },
  // visibility: estimate → L1
  {
    stock: '300395',
    desc: '300395 visibility estimate → L1',
    old: "key:'visibility',score:4,trend:'up',tier:'estimate'",
    new: "key:'visibility',score:4,trend:'up',tier:'L1'",
  },
  // supply: estimate → L1
  {
    stock: '300395',
    desc: '300395 supply estimate → L1',
    old: "key:'supply',score:4,trend:'up',tier:'estimate'",
    new: "key:'supply',score:4,trend:'up',tier:'L1'",
  },
  // valuation: estimate → L1
  {
    stock: '300395',
    desc: '300395 valuation estimate → L1',
    old: "key:'valuation',score:1,trend:'down',tier:'estimate'",
    new: "key:'valuation',score:1,trend:'down',tier:'L1'",
  },
  // barrier: L3 → L1
  {
    stock: '300395',
    desc: '300395 barrier L3 → L1',
    old: "key:'barrier',score:4,trend:'flat',tier:'L3'",
    new: "key:'barrier',score:4,trend:'flat',tier:'L1'",
  },

  // ========== 002916 深南电路(4 处改 tier) ==========
  // durability: estimate → L1(含 L1 项目公告)
  {
    stock: '002916',
    desc: '002916 durability estimate → L1',
    old: "key:'durability',score:4,trend:'up',tier:'estimate'",
    new: "key:'durability',score:4,trend:'up',tier:'L1'",
  },
  // visibility: estimate → L4(实际是 L4)
  {
    stock: '002916',
    desc: '002916 visibility estimate → L4',
    old: "key:'visibility',score:4,trend:'up',tier:'estimate'",
    new: "key:'visibility',score:4,trend:'up',tier:'L4'",
  },
  // supply: L3+estimate → L3(单一权威)
  {
    stock: '002916',
    desc: '002916 supply L3+estimate → L3',
    old: "key:'supply',score:3,trend:'flat',tier:'L3+estimate'",
    new: "key:'supply',score:3,trend:'flat',tier:'L3'",
  },
  // valuation: estimate → L1(baostock L1)
  {
    stock: '002916',
    desc: '002916 valuation estimate → L1',
    old: "key:'valuation',score:2,trend:'down',tier:'estimate'",
    new: "key:'valuation',score:2,trend:'down',tier:'L1'",
  },
  // barrier: estimate → L4(实际是 L4)
  {
    stock: '002916',
    desc: '002916 barrier estimate → L4',
    old: "key:'barrier',score:5,trend:'flat',tier:'estimate'",
    new: "key:'barrier',score:5,trend:'flat',tier:'L4'",
  },

  // ========== 301217 铜冠铜箔(2 处改 tier) ==========
  // durability: estimate → L4(实际是 L4 行业推断)
  {
    stock: '301217',
    desc: '301217 durability estimate → L4',
    old: "key:'durability',score:5,trend:'up',tier:'estimate'",
    new: "key:'durability',score:5,trend:'up',tier:'L4'",
  },
  // visibility: estimate → L4(实际是 L4)
  {
    stock: '301217',
    desc: '301217 visibility estimate → L4',
    old: "key:'visibility',score:3,trend:'flat',tier:'estimate'",
    new: "key:'visibility',score:3,trend:'flat',tier:'L4'",
  },
];

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) return startPos + 10 + m.index;
  return code.length;
}

const stocks = ['601208', '300395', '301217', '002916', '300476', '002463', '688183'];

let totalReplaced = 0;
let totalFound = 0;
const changesByStock = {};
for (const stock of stocks) {
  changesByStock[stock] = 0;
}

for (const change of CHANGES) {
  const stock = change.stock;
  // 在每只 stock 范围内做替换
  const stockStart = code.indexOf(`'${stock}':`);
  if (stockStart === -1) {
    console.log(`[${stock}] NOT FOUND, 跳过 ${change.desc}`);
    continue;
  }
  const stockEnd = findStockEnd(code, stockStart);
  const stockBlock = code.substring(stockStart, stockEnd);

  const occurrences = (stockBlock.match(new RegExp(escapeRegex(change.old), 'g')) || []).length;
  if (occurrences === 0) {
    console.log(`[${stock}] [MISS] ${change.desc} — old 字符串在 stock 块内找不到`);
    continue;
  }
  if (occurrences > 1) {
    console.log(`[${stock}] [AMBIGUOUS] ${change.desc} — 出现 ${occurrences} 次,跳过`);
    continue;
  }

  // 在文件级做替换(仅匹配这一只 stock 范围内)
  const before = code.substring(0, stockStart);
  const block = code.substring(stockStart, stockEnd);
  const after = code.substring(stockEnd);
  const newBlock = block.split(change.old).join(change.new);
  if (newBlock !== block) {
    code = before + newBlock + after;
    totalReplaced += 1;
    totalFound += 1;
    changesByStock[stock] += 1;
    console.log(`[${stock}] [OK] ${change.desc}`);
  }
}

console.log(`\n总替换: ${totalReplaced} 处 (预期 ${CHANGES.length} 处)`);

if (totalReplaced === CHANGES.length) {
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log('write done');
} else {
  console.log('数量不匹配,未写入文件');
}

console.log('\n=== 各 stock 改动汇总 ===');
for (const stock of stocks) {
  if (changesByStock[stock] > 0) {
    console.log(`${stock}: ${changesByStock[stock]} 处`);
  }
}
