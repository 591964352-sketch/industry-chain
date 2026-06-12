# 景气六维框架 · SOP 试水样板 v3（面向 30+ 条产业链）

> 在现有「物理卡口（壁垒）」研究之上，叠加一层**可打分、可解释、可渲染、可复用、可扩展到几十条链**的景气六维。
> 六维 = 景气持续性 × 业绩可见度 × 政策确定性 × 供需紧张度 × 估值性价比 × 壁垒(安全垫)。
> **v2 变更**：① 共享「维度说明 PROSPERITY_META」上页；② 个股也打六维（`stock.dims6`）；③ 估值方向翻转（5=最便宜）；④ 渲染为卡片、全标 🆪。
> **v3 变更（30 条扩展，见第八节）**：⑤ 全站统一综合分 `computeLtFit()`（横向可比）；⑥ 赛道级 `meta`（板块/状态/更新/综合分→分组筛选）；⑦ 跨链重复个股一致性 `STOCK_REGISTRY`；⑧「赛道擂台」总入口；⑨ **数据外置 + 干掉双文件镜像**的架构演进（最优单文件解法）。
> PCB 为试点；确认后其余现有赛道 + 新增赛道按本模板生成。所有评分为 🆪 AI 主观判断（cron 不刷数据截止日）；不构成投资建议。

---

## 一、方案说明：六维怎么加（与现有 schema 的关系）

### 1. 纯叠加，不推翻。六维里已有两维半在现有字段：

| 维度 | 现有字段（复用/roll-up） | 新增动作 |
|---|---|---|
| 景气持续性 | `cyclePosition.stage/reason` | 升格为打分+趋势，锚定 cyclePosition |
| 业绩可见度 | （无） | **新增**：用最近财报兑现度打分 |
| 政策确定性 | `overview` 零散提及 | **新增**：用专项/大基金/规划倾斜打分 |
| 供需紧张度 | `supplyGap`/`fourQuestions②③` | **新增**：用缺口/紧张度打分 |
| 估值性价比 | `chokePoints[].valuation.pePercentile` | **roll-up** 到赛道级（个股级直接打分） |
| 壁垒安全垫 | `segments[].barrier`/卡口 `strength` | **roll-up** 到赛道级（个股级直接打分） |

### 2. 三个层级，各司其职

- **赛道级六维**（`CHAINS.<id>.prosperity`）→ 决定「选哪条赛道」，4 维赛道属性 + 2 维 roll-up 概览。
- **个股级六维**（`stock.dims6`）→ 决定「赛道内选谁、什么买点」，6 维全部按该股自身情况打分，可横向比同环节个股。
- **共享维度说明**（`PROSPERITY_META`，全站一份）→ 每维的定义+标尺+依据，渲染成页面 tooltip/折叠，**所有赛道共用、不重复造**。

### 3. 打分口径（统一"越高越有利"，便于横向比 + 雷达图）

- `score` 1–5 整数，5=最强/最优。
- **估值维度方向已翻转**：5=最便宜（pePercentile 低）、1=最贵。消除"高分=贵"歧义。
- `trend` `up`/`flat`/`down`，标边际方向。
- 每维带 `reason`（含硬数据）+ `evidence`（来源+时点）+ `flag:'🆪'`。

---

## 二、Schema

### 2.1 共享维度说明（`PROSPERITY_META`，全站一份，供页面渲染"依据/说明"）

```javascript
// 放 script 顶部常量区；6 维的定义、评分标尺、数据依据来源。页面上每维旁边的 ⓘ 展开它。
const PROSPERITY_META = {
  durability: {
    name: '景气持续性',
    define: '本轮上行能持续多久——看周期位置 + 需求增速相对行业均速的超额。',
    scale: { 5:'多年超级周期、需求 CAGR ≫ 行业均速', 3:'温和复苏 / 结构分化', 1:'周期下行' },
    basis: '依据：cyclePosition + 下游 CAGR vs 行业均速（Prismark/券商）。'
  },
  visibility: {
    name: '业绩可见度',
    define: '景气是否已落到报表——头部最近财报兑现度 + 订单/长协可见性。',
    scale: { 5:'头部已兑现 + 长协锁单', 3:'部分兑现、预期为主', 1:'纯主题、未盈利' },
    basis: '依据：上市公司最近年报/季报营收净利同比 + 在手订单/扩产长协公告。'
  },
  policy: {
    name: '政策确定性',
    define: '国家政策的扶持强度与确定性——专项/大基金/规划倾斜 vs 无政策或逆风。',
    scale: { 5:'国家专项直补 + 卡脖子重点', 3:'方向受益、非直补', 1:'无政策 / 有逆风' },
    basis: '依据：十五五倾斜、大基金、02 专项、国产替代主体地位。'
  },
  supply: {
    name: '供需紧张度',
    define: '供需格局松紧——缺口/涨价/长协锁死 vs 过剩内卷；区分结构性紧张。',
    scale: { 5:'全面缺货 / 涨价 / 长协锁死', 3:'结构性紧（高端紧低端松）', 1:'普遍过剩内卷' },
    basis: '依据：缺口测算、涨价函、长协公告、产能利用率。'
  },
  valuation: {
    name: '估值性价比',
    define: '当前价位的安全度（方向已翻转：分越高越便宜）——PE 历史分位。',
    scale: { 5:'PE 分位 < 30%', 3:'分位 30–70%', 1:'分位 > 80%、严重透支' },
    basis: '依据：roll-up 自 chokePoints[].valuation.pePercentile / 个股自身 PE 分位。'
  },
  barrier: {
    name: '壁垒安全垫',
    define: '护城河深度——核心环节寡头/认证壁垒 vs 无壁垒纯成本竞争。',
    scale: { 5:'核心环节 T0 寡头 + 认证', 3:'中高、可替代', 1:'无壁垒、纯成本竞争' },
    basis: '依据：roll-up 自 segments[].barrier + 卡口 strength / 个股自身 barrier。'
  }
};
```

### 2.2 赛道级六维（`CHAINS.<id>.prosperity`）

```javascript
prosperity: {
  dims: [
    { key:'durability', name:'景气持续性', score:_, trend:'_', reason:'', evidence:'', flag:'🆪' },
    { key:'visibility',  name:'业绩可见度', score:_, trend:'_', reason:'', evidence:'', flag:'🆪' },
    { key:'policy',      name:'政策确定性', score:_, trend:'_', reason:'', evidence:'', flag:'🆪' },
    { key:'supply',      name:'供需紧张度', score:_, trend:'_', reason:'', evidence:'', flag:'🆪' },
    { key:'valuation',   name:'估值性价比', score:_, trend:'_', reason:'', evidence:'', flag:'🆪', rollupFrom:'chokePoints[].valuation.pePercentile' },
    { key:'barrier',     name:'壁垒安全垫', score:_, trend:'_', reason:'', evidence:'', flag:'🆪', rollupFrom:'segments[].barrier' }
  ],
  verdict: { longTermFit:'', oneLine:'🆪 ', stockHint:'' }
}
```

### 2.3 个股级六维（追加到每个 `segments[].stocks[]` 元素）

```javascript
// 在原 stock 对象（含 name/code/barrier/rank/position/logic/trend/trendNote）基础上 append：
dims6: [
  // 顺序固定与赛道级一致；个股级每维都按"该股自身"打分
  { key:'durability', score:_, trend:'_' },
  { key:'visibility',  score:_, trend:'_' },
  { key:'policy',      score:_, trend:'_' },
  { key:'supply',      score:_, trend:'_' },
  { key:'valuation',   score:_, trend:'_' },   // 个股自身 PE 分位；与该股若为卡口的 valuation 一致
  { key:'barrier',     score:_, trend:'_' }    // 与该股 barrier 字段一致（极高=5/高=4/中高=3/中=2/低=1）
],
dims6Note: '🆪 <一句话画像：这只票六维的取舍，如"业绩派/壁垒派/赔率派">'
// 注：dims6 的 score 是简表（驱动雷达图/横向比）；详细依据走赛道级 reason + PROSPERITY_META 标尺，避免每股 6 段重复文案。
```

**硬约束（注入前自检，沿用 SOP 的 S 系列纪律）**
- P1 `dims` 6 项齐、key 固定顺序不变；个股 `dims6` 同序。
- P2 每维 `score`∈1–5；赛道级 `reason` 含**可核查硬数据**（占比/增速/缺口/财报数字之一）。
- P3 `valuation`/`barrier` 两维与 `chokePoints[].valuation` / `segments[].barrier` **数值一致**，不得自相矛盾。
- P4 个股 `dims6.barrier` 必须等于该股 `barrier` 映射分（极高5/高4/中高3/中2/低1）。
- P5 `verdict.oneLine` 必须点出"胜负手维度"（最低分那维或最关键变量）。
- P6 全标 `🆪`，不刷数据截止日期。
- P7 `PROSPERITY_META` 全站一份，赛道数据里**不复制**定义/标尺（只填该赛道的 reason/evidence）。

---

## 三、PCB 填好（试点样板，可交 Claude Code）

### 3.1 赛道级

```javascript
CHAINS.pcb.prosperity = {
  dims: [
    { key:'durability', name:'景气持续性', score:4, trend:'up',
      reason:'AI 结构性上行：单机 PCB 价值量较传统服务器提升 5–10 倍(UBS)；高多层/IC载板/高速CCL 2024–29 CAGR 约 15.7%/7.4%/40%，远超行业 5% 均速；GB200/300+2026 Rubin+中板/背板持续抬升。总量温和、弹性集中高端，故 4。',
      evidence:'Prismark、UBS / 2026-06', flag:'🆪' },
    { key:'visibility', name:'业绩可见度', score:5, trend:'up',
      reason:'已兑现非纯预期：沪电 2026Q1 营收+54%/净利+63%、2025 营收189亿(+42%)；胜宏 2025 净利43.1亿居A股PCB首位；生益电子 2025 前三季净利约+500%。订单+扩产长协可见。',
      evidence:'2025年报/2026Q1公告 / 2026-06', flag:'🆪' },
    { key:'policy', name:'政策确定性', score:3, trend:'flat',
      reason:'主体由 AI capex 市场驱动、政策为辅；但 IC 载板纳入"02 专项"、大基金二期投兴森，国产替代有政策顺风。制造环节中等、载板/上游材料更强。',
      evidence:'大基金二期、02专项 / 2026-06', flag:'🆪' },
    { key:'supply', name:'供需紧张度', score:4, trend:'up',
      reason:'结构性紧张：高速 CCL 阶段性缺货、高端电子布(石英布/Low-DK)2026–28 缺口显著、ABF 膜(味之素)卡脖子、HVLP 铜箔偏紧；低端单双面板过剩内卷。紧张集中高端材料。',
      evidence:'行业供需测算/公司公告 / 2026-06', flag:'🆪' },
    { key:'valuation', name:'估值性价比', score:2, trend:'down',
      reason:'⚠️本轮最大扣分项：部分龙头 2023 底至今涨幅数倍、PE 历史高位，性价比偏低，需等回调或选估值合理的二线高端环节。下钻见各卡口 valuation.pePercentile。',
      evidence:'roll-up 自 chokePoints[].valuation / 2026-06', flag:'🆪', rollupFrom:'chokePoints[].valuation.pePercentile' },
    { key:'barrier', name:'壁垒安全垫', score:4, trend:'flat',
      reason:'分化极大：T0(ABF载板/高速CCL M9–M10/高端电子布)极高、安全垫足；T4(单双面/普通多层)几无壁垒、内卷。赛道级取核心卡口环节给 4。下钻见 segments[].barrier 与卡口 strength。',
      evidence:'roll-up 自 segments[].barrier / 2026-06', flag:'🆪', rollupFrom:'segments[].barrier' }
  ],
  verdict: {
    longTermFit:'适合长线研究/跟踪，但不宜当前高位追——等买点或选环节',
    oneLine:'🆪 PCB 是"业绩可见度(5)+景气持续性(4)"双高、但"估值性价比(2)"明显偏贵的赛道：长线逻辑顺，胜负手在买点与选环节。',
    stockHint:'壁垒看 segments[].barrier(T0/T1 优先)，买点看 chokePoints[].valuation.pePercentile(分位越低越安全)。"景气+确定性选环节，壁垒+估值选标的与买点"。'
  }
}
```

**PCB 赛道六维速读**

| 维度 | 分 | 趋势 | 一句话 |
|---|:--:|:--:|---|
| 景气持续性 | 4 | ↑ | AI 结构性上行，高端 CAGR 远超均速 |
| 业绩可见度 | 5 | ↑ | 头部已逐季兑现（沪电/胜宏/生益电子） |
| 政策确定性 | 3 | → | 市场驱动为主，载板/材料有专项顺风 |
| 供需紧张度 | 4 | ↑ | 高端材料缺口紧、低端过剩（结构分化） |
| 估值性价比 | 2 | ↓ | **胜负手**：龙头 PE 历史高位、偏贵 |
| 壁垒安全垫 | 4 | → | 分化：T0 载板/CCL 极高、T4 低端内卷 |

### 3.2 个股六维示例（4 只代表，CC 据此把其余个股补齐）

> 顺序 = durability / visibility / policy / supply / valuation / barrier

| 个股 | 持续 | 兑现 | 政策 | 供需 | 估值 | 壁垒 | dims6Note |
|---|:--:|:--:|:--:|:--:|:--:|:--:|---|
| **沪电股份 002463** | 5↑ | 5↑ | 3→ | 4↑ | 2↓ | 4→ | 🆪 兑现最快、估值同样不便宜——业绩派首选、但需控买点 |
| **胜宏科技 300476** | 5↑ | 5↑ | 2→ | 4↑ | 2↓ | 4→ | 🆪 弹性最大(英伟达显卡板~50%)，但出口近八成、汇率敏感+估值最贵 |
| **深南电路 002916** | 4↑ | 4↑ | 4↑ | 4↑ | 3→ | 5→ | 🆪 壁垒(载板全栈)+政策最强、估值相对温和；载板兑现慢——壁垒派首选 |
| **东材科技 601208** | 4↑ | 3→ | 4↑ | 5↑ | 2↓ | 5→ | 🆪 M9 树脂唯一国产，壁垒+供需双满分、业绩未放量——赔率/左侧派 |

对应 `dims6` 写法（以深南电路为例）：

```javascript
dims6:[
  {key:'durability',score:4,trend:'up'},{key:'visibility',score:4,trend:'up'},
  {key:'policy',score:4,trend:'up'},{key:'supply',score:4,trend:'up'},
  {key:'valuation',score:3,trend:'flat'},{key:'barrier',score:5,trend:'flat'}
],
dims6Note:'🆪 壁垒(PCB+载板全栈,ABF良率破80%)+政策(内资份额~63%)最强、估值相对温和；载板折旧压利润、兑现偏慢——壁垒派首选'
```

> **框架价值点**：纯壁垒派会直奔 ABF 载板/深南(壁垒5)，但其业绩可见度低、兑现慢；六维横截面立刻分出三类打法——**业绩派**(沪电/胜宏：兑现5但估值2)、**壁垒派**(深南：壁垒5政策4)、**赔率派**(东材：壁垒5供需5但兑现3)。同一条 PCB，六维让"按什么风格选谁、在什么价位"一目了然，这正是单看壁垒给不了的信息。

---

## 四、渲染建议（交 CC，0 CSS 增量）

1. **赛道级面板**：「① 赛道概览」`overview` 后插一张 `.card`「① · 景气六维」，6 行 mini-bar（复用 overview 进度条）+ trend 箭头（↑`var(--green)`/→灰/↓`var(--red)`）；底部 `verdict` 用现有 highlight 样式。
2. **维度说明（满足"页面要有依据"）**：每行维度名后加一个 ⓘ，点击/悬停展开 `PROSPERITY_META[key]` 的 `define + scale + basis`；该赛道的 `reason/evidence` 折叠在同一展开区。**说明（标尺）走共享常量、依据（reason）走赛道数据**，两者都上页 → 有说服力且不冗余。
3. **个股六维**：segments 表每只票行尾加一个"六维"展开/雷达小图标，点开显示该股 `dims6`（6 mini-bar 或雷达）+ `dims6Note`；**保持 barrier 降序主排序不变**（六维是附加视图、不改排序）。
4. **雷达图（可选但推荐，0 依赖）**：纯内联 SVG 画 6 轴雷达（赛道一个、个股一个），直观横向比；移动端 `@media(max-width:480px)` 降级为 mini-bar 列表。

---

## 五、其他赛道复用模板

新增/刷新赛道时：① 填 2.2 赛道级 `prosperity`（reason 取证）；② 给每只 stock 补 2.3 `dims6`（按 PROSPERITY_META 标尺打分，barrier 维与 barrier 字段对齐）；③ `verdict.oneLine` 点出胜负手维度。打分标尺统一引用 `PROSPERITY_META`，保证 12 条赛道之间可横向比。

---

## 六、整体页面排版优化建议（回应你的提问，按性价比排序）

1. **加「赛道擂台」整合视图（最高价值）**：在 `ai-full-chain` 或新建 `#arena`，一张表把 12 条赛道的六维分 + 综合"长线适配度"列出来、**可点列排序**。你的目标是"看准一条赛道"，这张总表就是入口——比逐条点开高效得多。
2. **侧栏 nav-item 旁加"长线适配"小徽章**：用六维综合给每条赛道一个 🟢/🟡/🔴 或 1–5 圆点，一眼扫出哪条值得深研，不必进页面。
3. **维度说明做成 ⓘ tooltip 而非常驻文字**：依据要上页（增说服力），但常驻会让卡片臃肿——折叠/悬停展开最佳，既有说服力又不挤。
4. **六维雷达 > 纯条形**：雷达能一眼看出"形状"(均衡型 vs 单极型)，比 6 根独立 bar 更有信息量、更像投研报告，说服力强；纯内联 SVG、0 依赖，符合你"无构建无依赖"约束。
5. **颜色语义全站统一**：score 5→`var(--green)`、1→`var(--red)` 渐变；估值已翻转方向，确保"绿=好"贯穿；trend 箭头复用同一套色，别另起。
6. **决策卡片库联动**：加入决策卡时快照该股 `dims6`，卡片正面显示六维画像（"为什么选它"），把研究→决策打通，避免六维只停在浏览页。
7. **数据时效区分**：六维全程 🆪、与周一 cron 的真实财报数据视觉上区分（如 🆪 用浅色/斜体），避免主观分被误当硬数据。
8. **移动端降级链**：雷达→mini-bar→只显分数+趋势；擂台表横向滚动。沿用现有 `@media(max-width:900px/480px)` 两个断点，不新增。

---

## 七、如何使用（rollout）

1. **PCB 试点先行**：把第三节赛道级 + 个股 `dims6` + 第四节渲染交 CC，让它注入 + 双文件同步 + JS 自检 + 浏览器抽查，**只做 PCB 一条**，验收通过再铺开。
2. **SOP/提示词更新**：在 serenity SKILL.md 的"数据模板/S 系列硬标准"里加 `prosperity` + `dims6` 两步（你说让 CC 改提示词——把本文件第二、三节作为依据丢给它即可）。
3. **铺开**：其余 11 条现有赛道按第五节回填、新增赛道一并生成；六维全标 🆪 不刷数据截止日。

> 给 CC 的指令范例：
> 「按《景气六维 SOP 样板 v2》：① 在 script 顶部加 PROSPERITY_META 常量；② 给 CHAINS.pcb 注入 prosperity，并给 segments 内每只票补 dims6（先按第三节 4 只示例，其余据 PROSPERITY_META 标尺补齐）；③ 按第四节渲染「① 景气六维」卡片(含 ⓘ 维度说明)+ 个股六维展开。只改 PCB 一条，双文件同步+JS 自检后报告改动清单，等我说通过再 commit。」

---

## 八、面向 30+ 条产业链的扩展架构（v3 核心）

> 六维评分逻辑本身能扛 30 条，但「跨链可比 + 管得过来 + 文件不崩」需要下面四块。前三块加在代码里、全站各一份；第四块是文件架构演进。

### 8.1 全站统一综合分 `computeLtFit()`（横向可比的根）

**问题**：每条链孤立打分时，PCB 的 4 分 ≠ 半导体设备的 4 分，擂台排序就是假的。
**解法**：① 打分**锚定 `PROSPERITY_META` 绝对标尺**（不在本链内拉曲线）；② 综合分函数**全站一份**，所有链同公式。

```javascript
// 长线适配度（针对 1-2 年持有；权重可调，但全站统一一处）
function computeLtFit(prosperity){
  const w = { durability:0.25, visibility:0.25, valuation:0.20, supply:0.12, barrier:0.10, policy:0.08 };
  const s = Object.fromEntries(prosperity.dims.map(d=>[d.key, d.score]));
  let score = Object.entries(w).reduce((a,[k,wk])=> a + (s[k]||0)/5*wk, 0) * 100; // 0-100
  // 安全垫门控：估值或壁垒≤1 → 封顶 60 并标风险（防"景气爆表但泡沫/无护城河"冲榜首）
  let risk = (s.valuation<=1 || s.barrier<=1);
  if (risk) score = Math.min(score, 60);
  let tier = score>=75 ? {k:'core',label:'🟢核心'} : score>=55 ? {k:'watch',label:'🟡观察'} : {k:'avoid',label:'🔴回避/等'};
  return { score: Math.round(score), tier: tier.label, risk };
}
// 用法：渲染时 const {score,tier,risk}=computeLtFit(CHAINS[id].prosperity)
```

- 权重默认偏向长线（持续+可见+估值占 70%）；你可调，但**只改这一处**，30 条同步生效。
- 擂台**默认按 score 排序，但每个维度列也可点排**（不同人权重不同，不锁死单一排名）。
- PCB 代入：持续4/可见5/政策3/供需4/估值2/壁垒4 → ≈ (4·.25+5·.25+2·.20+4·.12+4·.10+3·.08)/5×100 ≈ **74 🟡观察**（估值拖累，符合"逻辑顺但偏贵、不宜追高"的结论）。

### 8.2 赛道级 `meta`（30 条能分组/筛选/追踪的前提）

```javascript
// 追加到每个 CHAINS.<id> 顶部
meta: {
  sector: '中游',          // 上游 / 中游 / 下游 / 使能（侧栏按此分组）
  tier:   '核心',          // 核心 / 卫星 / 观察（你的关注层级）
  status: 'active',        // active / stale / draft（治理：谁过期了）
  updatedAt: '2026-06-12', // 最近一次六维校准日（与 cron 真实数据截止日分开）
  ltFit:  null             // 派生缓存，渲染时由 computeLtFit() 写入，供擂台/侧栏徽章读取
}
```

- 侧栏 30 条按 `sector` 分组折叠（上游/中游/下游/使能四组），不再平铺。
- nav-item 旁挂 `tier`/`ltFit` 徽章，不进页面就能扫出哪条值得深研。
- `status:'stale'` 超过 N 周未校准 → 擂台标灰，提醒回填。

### 8.3 跨链重复个股一致性 `STOCK_REGISTRY`

**问题**：30 条链里生益科技/中际旭创等会反复出现，各链打分不一致 → 擂台和决策卡自相矛盾。

```javascript
// 全站一份，按代码存 canonical 六维 + 出现链；链内 stock 引用而非各自打分
const STOCK_REGISTRY = {
  '600183': { name:'生益科技', dims6:[/*6项*/], inChains:['pcb','ccl'], updatedAt:'2026-06-12' },
  // ...
};
// 取数优先级：stock.dims6 缺省时回退 STOCK_REGISTRY[code].dims6；二者都有则校验一致，不一致 console.warn
```

- 现在先**留钩子**（每只 stock 带 `code`，渲染时查注册表做一致性校验并告警）；20 条以上再把 canonical 数据正式收进注册表。便宜的前瞻投资。

### 8.4「赛道擂台」整合视图（30 条的总入口）

- 路由 `#arena`（或并入 `ai-full-chain`）。一张表：每行一条链，列 = 六维分 + `computeLtFit` 综合分 + tier 徽章 + sector。
- **表头每列可点排序**；顶部按 sector / tier / status 过滤。
- 这是你"看准一条赛道"的真入口——30 条时比逐条点开高效一个数量级。
- 0 依赖：纯 JS 生成 `<table>`，复用现有 `.stock-tbl` 样式。

### 8.5 单文件最优解：数据外置 + 干掉双文件镜像

**现状两个痛点**（30 条≈1–1.5MB 时爆发）：① 改一条链要动 1MB+ 巨文件；② `index.html` 与 `产业链全景.html` 字节级镜像，每次同步两个巨文件、**一个逗号错全站白屏**（整个 `<script>` 解析失败）。

**最优解（仍满足"无构建/无依赖/浏览器直开/Pages 可托管"）——分两步、可灰度、不破现网：**

1. **数据外置到 `data/<id>.js`**：每条链一个小文件，内容 `window.CHAINS=window.CHAINS||{}; window.CHAINS['pcb']={...};`。`index.html` 只留外壳（CSS + 路由 + 渲染 + PROSPERITY_META/computeLtFit/STOCK_REGISTRY），用一段 manifest 循环 `<script src>` 逐条加载。
   - **关键收益：独立 `<script>` 各自解析、互不连坐**——pcb.js 写错只让 PCB 这条加载失败，其余 29 条照常（render 里加 guard：`CHAINS[id]` 缺失就显示"该赛道数据加载失败"而非白屏）。这是单文件给不了的容错。
   - 编辑从"动 1MB"降到"动单条几十 KB"。
2. **干掉双文件镜像**：把 `产业链全景.html` 改成**一行 meta-refresh 跳转到 `index.html`**（中文 URL 入口保留、内容不再重复维护）；若必须保留独立内容，则退而用提交前一句 `cp index.html 产业链全景.html`（一次复制，不算"构建系统"）。两种都消灭"手工同步两个巨文件"的脆弱。

> **迁移安全**：先只外置 PCB 一条（`data/pcb.js`）跑通验证，再逐条搬其余链——**任何一步都不破现网**，契合你"一次一个升级 + 天然还原点"的纪律。GitHub Pages 直接托管 `data/` 子目录 JS，无需构建。

> 取舍诚实说：这一步轻微让渡"所有东西在一个文件"的纯粹性，但换来**容错(不连坐) + 编辑轻量 + 镜像零负担**，30 条时净收益巨大；且没引入 npm / 打包 / 任何依赖，浏览器和 Pages 照常直开。

### 8.6 v3 注入顺序（给 CC）

1. 加全站常量/函数：`PROSPERITY_META` + `computeLtFit()` + `STOCK_REGISTRY`（空壳留钩子）。
2. PCB 试点：`CHAINS.pcb` 加 `meta` + `prosperity` + 每股 `dims6`（带 `code`）。
3. 渲染：「① 景气六维」卡（含 ⓘ 说明）+ 个股六维展开 + `#arena` 擂台。
4. 架构演进**单独一个升级**：先外置 `data/pcb.js` 验证 → 再批量；同步把 `产业链全景.html` 改跳转/复制。**与六维注入分开提交**，各自有还原点。

---

*本样板用于研究框架搭建，所有评分为 AI 主观判断、不构成投资建议；估值与买卖决策请独立判断或咨询持牌投顾。*
