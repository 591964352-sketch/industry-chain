// scripts/check_manual_pcb_sync.js
// 双层架构(pcb.manual.js ↔ pcb.js)stock 列表自动 diff 校验脚本(2026-07-02 立)
//
// 反向验证案例(已确认合理):
//   - 603519 当前状态:已同步(commit 5.6 补回 manual.js)· 不应再报告为异常
//   - 300179 / 000657 当前状态:悬空(仅 manual.js 有 · pcb.js segments/stocks 或 companies 无)
//
// 扫描路径(commit 6.61a 升级盲点修复,2026-07-09):
//   - PCB.segments[i].stocks        ← 7 个段位 stocks(主要·30 只)
//   - PCB.segments[i].companies     ← 兼容路径(实测 PCB 当前 segments 不含 companies,但保留以应对未来结构变化)
//   - PCB.midstream.stocks
//   - PCB.chokePoints[]
//   - PCB.treeMap.{downstream,midstream,materials,equipment,sideBranches}[i].companies  ← **本路径于 commit 6.61a 新增**(真实盲点)
//
// 历史盲点(2026-07-02 立 → 2026-07-09 检出的盲点窗口期·实际盲点比初判更深一层):
//   scripts/check_manual_pcb_sync.js v1 仅扫描 seg.stocks,不扫描 treeMap 路径
//   data/pcb.js treeMap.midstream[0].companies[2] = { name:'生益电子', code:'603183' }
//   → v1 跑出虚假 PASS "双层架构 stock 列表完全同步" (实际漏检 27 天)
//   v2 修复:增 treeMap.*[*].companies 扫描,source 字段区分路径(stocks/companies/treeMap/midstream/chokePoints)
//
// treeMap 独有股票白名单(commit 6.61a 立,2026-07-09):
//   当 v2 扫描范围扩大到 treeMap 后,暴露出 11 只"仅 pcb.js 有"的 stock。
//   这些 stock **不是数据错误**,而是设计有意为之的 treeMap 上下游生态视图展示:
//     - 它们不进入 pcb.manual.js STOCK_REGISTRY 核心池(38 只 PCB 六维评分对象)
//     - 它们在 pcb.js treeMap 的下游(downstream) / 侧枝(sideBranches)等位置作为"上游材料/下游整机/同期公司"展示
//     - 强行将它们纳入 manual 池会偏离"PCB 六维评分"本意(整机厂/材料厂的 6 维不适配 PCB 卡口)
//     - 删除会破坏 treeMap 上下游展示完整性
//   → 结论:**白名单豁免** + **在 CLAUDE.md §11.12 完整登记**(未来治理参考)
//   白名单维护规则:任何新增/删除都必须先在 CLAUDE.md §11.12 改登记,再改本表
const TREE_MAP_WHITELIST = {
  '601138': { name: '工业富联', reason: 'AI 服务器整机代工龙头·treeMap downstream[0] AI 服务器(40%) 展示为 PCB 下游客户' },
  '000977': { name: '浪潮信息', reason: 'AI 服务器整机·treeMap downstream[0] 展示为 PCB 下游客户' },
  '603019': { name: '中科曙光', reason: '智算中心+海光信息·treeMap downstream[0] 展示为 PCB 下游客户' },
  '002594': { name: '比亚迪',   reason: '新能源整车·treeMap downstream[1] 汽车电子(25%) 展示为 PCB 下游整车厂' },
  '605333': { name: '沪光股份', reason: '汽车线束+高压连接器·treeMap downstream[1] 展示为 PCB 下游汽零厂' },
  '002402': { name: '和而泰',   reason: '汽车智能控制器·treeMap downstream[1] 展示为 PCB 下游汽车控制器厂' },
  '000063': { name: '中兴通讯', reason: '5G 基站+光通信·treeMap downstream[2] 通信/5G(20%) 展示为 PCB 下游整机厂' },
  '600498': { name: '烽火通信', reason: '光通信传输·treeMap downstream[2] 展示为 PCB 下游通信设备厂' },
  '600552': { name: '凯盛科技', reason: '硅微粉·treeMap sideBranches[1] CCL 上游硅微粉 展示为 PCB 上游材料' },
  '603328': { name: '依顿电子', reason: '汽车 PCB 主营·treeMap midstream[1] 汽车 PCB 段位展示(暂未纳入 manual 池评估中)' },
  '000823': { name: '超声电子', reason: '消费 PCB+覆铜板·treeMap midstream[2] 消费类 PCB 段位展示(暂未纳入 manual 池评估中)' }
};

global.window = {};
global.window.PCB_MANUAL = {};
require('../data/pcb.manual.js');
const PCB_MANUAL = global.window.PCB_MANUAL;

global.window.CHAINS = global.window.CHAINS || {};
require('../data/pcb.js');
const PCB = global.window.CHAINS.pcb;

// 提取 pcb.js 实际 stock list(seg.stocks + seg.companies + midstream.stocks + chokePoints + treeMap.*[*].companies 去重)
// commit 6.61a 修复:同时扫描 treeMap 路径(此前漏扫,treeMap.midstream[0].companies[2].code='603183' 错码案例)
const pcbStocks = {};  // code -> { name, sources[] }
function addPcb(code, name, source) {
  if (!code) return;
  if (!pcbStocks[code]) pcbStocks[code] = { name, sources: [] };
  else if (name && pcbStocks[code].name !== name) pcbStocks[code].nameConflict = true;
  pcbStocks[code].sources.push(source);
  if (name && !pcbStocks[code].name) pcbStocks[code].name = name;
}

(PCB.segments || []).forEach((seg, i) => {
  (seg.stocks || []).forEach(s => addPcb(s.code, s.name, 'segments[' + i + '].stocks'));
  // commit 6.61a 兼容路径:扫描 seg.companies(实测当前 segments 不含此字段,保留以应对未来结构变化)
  (seg.companies || []).forEach(c => addPcb(c.code, c.name, 'segments[' + i + '].companies'));
});
if (PCB.midstream && PCB.midstream.stocks) {
  PCB.midstream.stocks.forEach(s => addPcb(s.code, s.name, 'midstream.stocks'));
}
(PCB.chokePoints || []).forEach(c => addPcb(c.code, c.name, 'chokePoints'));

// commit 6.61a 核心修复:扫描 treeMap 5 列下所有 companies(本次盲点根因)
// 路径:PCB.treeMap.{downstream,midstream,materials,equipment,sideBranches}[i].companies
// PCB.treeMap 本身是 object(5 个 colKey),不是 array;每个 colKey 值是 array
Object.keys(PCB.treeMap || {}).forEach(colKey => {
  const treeCol = PCB.treeMap[colKey];
  if (!Array.isArray(treeCol)) return;
  treeCol.forEach((node, i) => {
    if (!node || !Array.isArray(node.companies)) return;
    node.companies.forEach(c => addPcb(c.code, c.name, 'treeMap.' + colKey + '[' + i + '].companies'));
  });
});

// manual.js stock list
const manualStocks = Object.values(PCB_MANUAL.stocks).map(s => ({ code: s.code, name: s.name }));

console.log('==================================================');
console.log('check_manual_pcb_sync · 双层架构 stock 列表 diff');
console.log('==================================================\n');

console.log('【统计】');
console.log('  pcb.manual.js stock 数:', manualStocks.length);
console.log('  pcb.js 唯一 stock 数(segments.stocks + segments.companies + midstream.stocks + chokePoints + treeMap.*[*].companies):', Object.keys(pcbStocks).length);
console.log();

// name 一致性检查
let nameConflicts = 0;
manualStocks.forEach(m => {
  const p = pcbStocks[m.code];
  if (p && p.name !== m.name) nameConflicts++;
});

console.log('【name 一致性】');
console.log('  名称不一致:', nameConflicts);
console.log();

// 仅 manual.js 有(悬空 stock)
const onlyManual = manualStocks.filter(m => !pcbStocks[m.code]);
console.log('【仅 pcb.manual.js 有(渲染层悬空)】');
if (onlyManual.length === 0) console.log('  (无)');
else onlyManual.forEach(m => console.log('  ' + m.code + ' ' + m.name + '  ← 需评估:是否应补到 pcb.js'));
console.log();

// 仅 pcb.js 有(manual 层缺失)—— 按白名单分类(commit 6.61a 立的机制)
const onlyPcbAll = Object.keys(pcbStocks).filter(c => !PCB_MANUAL.stocks[c]);
const onlyPcbWhitelisted = onlyPcbAll.filter(c => TREE_MAP_WHITELIST[c]);
const onlyPcbGenuine = onlyPcbAll.filter(c => !TREE_MAP_WHITELIST[c]);

console.log('【仅 pcb.js 有(manual 层缺失)】');
if (onlyPcbAll.length === 0) {
  console.log('  (无)');
} else {
  if (onlyPcbWhitelisted.length > 0) {
    console.log('  -- ⭐ 白名单豁免(treeMap 设计有意展示·非数据错误) --');
    onlyPcbWhitelisted.forEach(c => {
      const w = TREE_MAP_WHITELIST[c];
      console.log('    ' + c + ' ' + w.name + '  | 理由: ' + w.reason);
    });
  }
  if (onlyPcbGenuine.length > 0) {
    console.log('  -- 🚨 真实缺失(需评估:是否应补到 manual.js) --');
    onlyPcbGenuine.forEach(c => console.log('    ' + c + ' ' + pcbStocks[c].name + '  ← 需评估:是否应补到 manual.js'));
  }
}
console.log();

// 总结(diffCount 不计入白名单豁免·commit 6.61a 立的计数规则)
console.log('==================================================');
const diffCount = onlyManual.length + onlyPcbGenuine.length + nameConflicts;
const whiteCount = onlyPcbWhitelisted.length;
if (diffCount === 0) {
  if (whiteCount > 0) {
    console.log(`✅ 双层架构 stock 列表实质同步(${whiteCount} 只白名单豁免)`);
  } else {
    console.log('✅ 双层架构 stock 列表完全同步');
  }
} else {
  console.log(`⚠ 共 ${diffCount} 处实质差异:`);
  console.log(`  - 悬空(仅 manual.js): ${onlyManual.length}`);
  console.log(`  - 缺失(仅 pcb.js): ${onlyPcbGenuine.length}`);
  console.log(`  - name 不一致: ${nameConflicts}`);
  if (whiteCount > 0) console.log(`  ※ 白名单豁免: ${whiteCount} 只(非差异)`);
}
console.log('==================================================');

// 返回:exit 0/1 基于"实质差异"(不含白名单豁免) — page_audit 兼容
process.exit(diffCount > 0 ? 1 : 0);

process.exit(diffCount > 0 ? 1 : 0);