# 跨赛道研究模板 · PCB 黄金范例 v1 · 2026-06-14

> **本文件 = 跨赛道复制的"字段骨架模板"**。任何新赛道（hbm/semi/robotics/...）上线前,都应按本清单出"字段对照卡"→ 走 [refresh-sop.md](./refresh-sop.md) 三步流程 → 注入 `data/<id>.js`。
>
> **唯一模板源**：`data/pcb.js`（阶段一推到 10/10 后冻结、只读）。本文件由 CC 一次性抽取自 PCB,后续 PCB 改动需同步刷新本文件。
>
> **纪律**:
> - `sourceSegment` 是 PCB 特殊模式(5 段材料/设备 sub-card 跨引用 segments[].name),其他赛道**按 segments[].stocks 直填、不用 sourceSegment 引用**。
> - 任何新字段不得自创,必须先看 PCB 有没有 → 没有则不填、待委员会决定是否升级 schema。
> - 16 条数据治理铁律(见 [CLAUDE.md](../../CLAUDE.md))全部继承。

---

## 0. PCB 15 顶层字段速览

| # | 字段 | 类型 | 必填 | 渲染位置 | 备注 |
|---|---|---|---|---|---|
| 1 | `id` | string | ✅ | 路由/侧栏/manifest | 与 manifest 数组、nav `data-chain`、文件名保持一致 |
| 2 | `name` | string | ✅ | 侧栏/Header | 中文名 |
| 3 | `icon` | string (emoji) | ✅ | 侧栏/Header | 单 emoji |
| 4 | `meta` | object | ✅ | Header 副标题 | `{sector, tier, status, updatedAt, ltFit}` |
| 5 | `prosperity` | object | ✅* | 「① 景气六维」卡 + 擂台 | 6 维 + verdict;**6 维全空 = 不渲染六维卡**(光模块当前状态) |
| 6 | `cyclePosition` | object | ✅* | 「① 赛道概览」末尾独立 .card | `{stage, label, reason, watchSignals[]}` |
| 7 | `plainIntro` | object | ✅ | 「⓪ 投资须知」段 | `{analogy, paragraphs[2], flowSteps[], highlightBox}` |
| 8 | `overview` | array[8] | ✅ | 「① 赛道概览」8 卡 | 每卡 `{label, value, note?, color?, tier, src}` |
| 9 | `treeMap` | object | ✅ | 「② 产业链树状图」5 列 | `{downstream[], midstream[], materials[], equipment[], sideBranches[]}` |
| 10 | `segments` | array[6-7] | ✅ | 「③ 环节拆解」表格 | 每段 `{name, costRatio?, barrier, choke, border?, intro, globalLandscape?, stocks[5]}` |
| 11 | `midstream` | object? | ⭕ | 「③ 环节拆解」中游卡 | `{description, stocks[]}` 仅当制造段是赛道核心时(如 PCB/HBM) |
| 12 | `fourQuestions` | object | ✅ | 「④ 四大物理追问」折叠区 | `{segments[4-5]: [{name, stocks[2-5]}]}` |
| 13 | `chokePoints` | array[3-5] | ✅ | 「⑤ 物理卡口」3-5 卡 | 每卡 `{rank, name, code, segment, strength, logic, tags[4], valuation, verification}` |
| 14 | `supplyGap` | array[3] | ✅ | 「⑥ 供需缺口」3 卡 | 每条 `{segment, demand, capacity, gap, rate, bottleneck, tier, src}` |
| 15 | `methodologyNotes` | string (HTML) | ⭕ | 「⑦ 方法论说明」折叠 | 1-2 段方法论注释 |

> ✅\* = 字段必填;但 6 维 score 1-5 必填、verdict 3 槽位必填;**任一缺失则六维卡不渲染**(渲染层 fail-soft)。

---

## 1. meta 字段 (Header 副标题)

```js
meta: {
  sector: "中游",              // 上游/中游/下游/整合 — 用于 Header 副标题
  tier: "核心",                // 核心/重要/边缘 — 决定侧栏颜色徽章
  status: "active",            // active/draft/deprecated
  updatedAt: "2026-06-12",     // 硬数据最后更新日;🆪 主观判断不刷
  ltFit: null                  // 长线适合度 1-5(stockHint 抽出前用 null 占位)
}
```

---

## 2. prosperity · 6 维景气打分

```js
prosperity: {
  dims: [
    { key:"durability",  name:"景气持续性",  score:4, trend:"up",   reason:"...", evidence:"...",  flag:"🆪", tier:"broker",  src:"Prismark 2026.6 + UBS 行业报告" },
    { key:"visibility",  name:"业绩可见度",  score:5, trend:"up",   reason:"...", evidence:"...",  flag:"🆪", tier:"primary", src:"2025年报+2026Q1公告(cninfo)" },
    { key:"policy",      name:"政策确定性",  score:4, trend:"up",   reason:"...", evidence:"...",  flag:"🆪", tier:"estimate", src:"..." },
    { key:"supply",      name:"供需紧张度",  score:4, trend:"up",   reason:"...", evidence:"...",  flag:"🆪", tier:"broker",  src:"..." },
    { key:"valuation",   name:"估值性价比",  score:1, trend:"down", reason:"...", evidence:"...",  flag:"🆪", tier:"broker",  src:"...", asOf:"2026-06-12" },
    { key:"barrier",     name:"壁垒安全垫",  score:5, trend:"flat", reason:"...", evidence:"...",  flag:"🆪", tier:"broker",  src:"..." }
  ],
  verdict: {
    longTermFit: "适合长线研究/跟踪,但不宜当前高位追——等买点或选环节",  // 1 句口语化,用 T0/T1 OR 环节名
    oneLine: "🆪 PCB 是\"业绩可见度(5)+景气持续性(4)\"双高、但\"估值性价比(1)\"处绝对历史高位、门控触发的赛道:长线逻辑顺,胜负手在买点(等 PE 分位回踩)与选环节。",  // 1 句综合判断
    stockHint: "优先 T0/T1 环节(极高/高壁垒),PE 分位越低越安全;景气+确定性选环节,壁垒+估值选标的与买点。"  // 3 槽位:[环节指引],[买点指引];[方法论一句话]
  }
}
```

**6 维标尺**(PCB 范例口径,1-5):
- **durability 景气持续性** — 1=衰退/产能严重过剩 / 5=超级上行/强结构性
- **visibility 业绩可见度** — 1=纯预期无落地 / 5=已兑现/订单可见
- **policy 政策确定性** — 1=无政策/有压制 / 5=政策强力支持
- **supply 供需紧张度** — 1=严重过剩 / 5=硬缺口+扩产慢
- **valuation 估值性价比** — **方向翻转!** 1=绝对高位(贵)/ 5=绝对低位(便宜)
- **barrier 壁垒安全垫** — 1=无壁垒充分竞争 / 5=极高/寡头/认证锁定

**门控规则**:`valuation≤1` 或 `barrier≤1` → 综合分封顶 60(防"贵+低壁垒"幻觉高分)。

---

## 3. cyclePosition · 周期位置

```js
cyclePosition: {
  stage: "boom",                          // 4 选 1: recovery/boom/peak/decline
  label: "繁荣中后期",                    // 中文标签
  reason: "🆪 AI 算力超级上行周期,需求强劲但估值已高,2027 年上游集中扩产可能形成供给拐点(AI初版,周一cron覆盖)",
  watchSignals: [
    "英伟达资本开支指引(季度财报披露)",
    "上游集中扩产公告(M9 树脂/HVLP 铜箔新产能落地)",
    "M9 材料缺口率变化(缺口收窄 = 见顶信号)"
  ]
}
```

---

## 4. plainIntro · 投资须知

```js
plainIntro: {
  analogy: "PCB = 所有电子产品的\"骨架 + 血管系统\"",   // 1 句话,稳定
  paragraphs: [
    "你手机里那块绿色的板子、电脑显卡上密密麻麻的线路、汽车里的控制电路——<strong>都是 PCB(印制电路板)</strong>。它做两件事:① 把芯片、电阻、电容这些零件<strong>固定住</strong>(像骨骼),② 用铜线把它们<strong>连起来通电</strong>(像血管)。没有 PCB,再强的芯片也只是散落一地的沙子。",
    "<strong>AI 时代的 PCB 贵在哪?</strong> 普通 PCB 像一栋 4 层板房,AI 服务器用的 PCB 像 30 层的摩天大楼——层数越多信号传输越快但干扰也越大,对材料的要求成倍飙升。一块 AI 服务器 PCB 的价格是普通 PCB 的 <strong>10-50 倍</strong>,而材料成本占 PCB 总成本的 <strong>60% 以上</strong>。"
  ],
  flowSteps: [  // 5-6 步,稳定信息
    "矿石/石油",
    "树脂+玻纤布",
    "铜箔",
    "三者压合=覆铜板CCL",
    "蚀刻钻孔=PCB",
    "装进显卡/服务器"
  ],
  highlightBox: "<strong>💡 物理卡口 视角:...</strong><br>...<br>2026 年英伟达 Rubin 架构全面采用 M9 级别材料,缺口最大的就是这三个环节。"
}
```

**注意**: `paragraphs[]` **必须 2 段**(结构稳定);`flowSteps[]` **必须 5-6 步**;`highlightBox` 含 **3 卡口结论** + 关键数字。

---

## 5. overview · 8 张赛道概览卡

```js
overview: [
  { label:"🌍 全球 PCB 产值(2026E)", value:"~$958 亿", note:"2025实际$852亿,+12.5%(Prismark 2026.6)", color:"var(--accent)", tier:"broker", src:"Prismark 2026.6" },
  // ...共 8 张
  { label:"上游材料国产化率", value:"总装>90% / 高端 EML<10%", note:"...", color:"...", tier:"broker", src:"国信证券 2026 + 新浪新闻引述 2026" }
]
```

**每张必填 4 项**:`value` / `note` / `tier` (primary/broker/media/estimate) / `src` (报告标题+链接+日期)。

**`id` 字段可选**(渲染层不依赖);**`color` 字段可选**(缺省用 `var(--accent)`)。

**8 张固定卡**(可改 label/value,顺序可调):
1. 全球市场规模(年)
2. 中国/大陆全球占比
3. AI/下游核心驱动
4. 产业阶段
5. 下一代产品(1.6T/3.2T/...)需求
6. 下一代催化
7. 核心矛盾
8. 上游材料国产化率

---

## 6. treeMap · 5 列产业链树状图

```js
treeMap: {
  downstream:   [ { name, barrier, note, companies:[{name, code, position, barrier}] }, ... ],   // 3-4 个
  midstream:    [ { name, barrier, note, companies:[] }, ... ],                                  // 2-3 个
  materials:    [ { name, barrier, choke, note, sourceSegment } | { name, barrier, choke, note, companies:[] } ],  // 3-4 个
  equipment:    [ { name, barrier, choke, note, sourceSegment } | { name, barrier, note, companies:[] } ],       // 2-3 个
  sideBranches: [ { name, barrier, note, sourceSegment } | { name, barrier, note, companies:[] } ]              // 1-2 个
}
```

**⚠️ `sourceSegment` 是 PCB 特殊模式**(materials/equipment/sideBranches 这 3 列里 5 个 sub-card 用 `sourceSegment: "电子树脂(碳氢树脂/PPO)"` 跨引用 `segments[].name`,渲染层严格 `===` 匹配)。

**其他赛道建议**:
- 已有 segments[] 含完整材料的赛道(如 HBM)→ **用 sourceSegment 引用**、与 PCB 对齐
- 仅有"上下游-中游"结构的赛道(如 CPO 集成光路)→ **按 segments[].stocks 直填 companies[]**,不用 sourceSegment

**barrier 取值**:`"extreme"`(极高)/ `"high"`(高)/ `"mid"`(中)/ `"low"`(低)

**choke 取值**:`true` = 物理卡口、`false` = 充分竞争(默认)

---

## 7. segments · 6-7 段环节拆解

```js
segments: [
  {
    name: "覆铜板 CCL",                   // 段名(严格唯一,被 treeMap sourceSegment 引用)
    costRatio: "30-40%",                  // 占比(可选,string)
    barrier: "high",                      // extreme/high/mid/low
    choke: false,                         // 物理卡口? true=卡口段
    border: false,                        // 分段边框(可选,默认 false)
    intro: "覆铜板(CCL)由<strong>铜箔+树脂+玻纤布</strong>三层热压复合而成...",  // 1 段 HTML
    globalLandscape: [                    // 全球格局(可选,3-4 行)
      { lbl:"🥇 台光电子 EMC(台)", val:"M9全球市占60-70%", note:"英伟达AI服务器CCL主供" },
      // ...
    ],
    stocks: [
      {
        rank: 1,                          // 段内排名(barrier 降序)
        name: "生益科技",
        code: "600183",
        position: "全球第二大CCL·大陆唯一M9认证·M9市占30-40%",  // 必含市占/排名
        barrier: "极高",                  // 极高/高/中/低(中文!跟 segments 段不同)
        trend: "up",                      // up/down/flat
        trendNote: "M9大陆唯一·Q1净利+105%",
        logic: "2026Q1营收81.41亿+45%...。M9 CCL已批量供货英伟达供应链,全球市占14-15%,Q1毛利率28.10%",
        dims6: [                          // 6 维打分
          { key:"durability", score:4, trend:"up",   tier:"estimate" },
          { key:"visibility", score:5, trend:"up",   tier:"estimate" },
          { key:"policy",     score:4, trend:"up",   tier:"estimate" },
          { key:"supply",     score:4, trend:"up",   tier:"estimate" },
          { key:"valuation",  score:2, trend:"down", tier:"estimate" },
          { key:"barrier",    score:5, trend:"flat", tier:"estimate" }
        ],
        dims6Note: "🆪 大陆唯一 M9 CCL,业绩(Q1+105%)+壁垒双满分,估值已不便宜——业绩派"
      }
      // 共 5 只
    ]
  }
  // 共 6-7 段,每段 5 只,barrier 降序排列
]
```

**barrier 取值**: 段级 `"extreme"/"high"/"mid"/"low"`(英文) | 个股级 `"极高"/"高"/"中"/"低"`(中文) —— **不统一,模板沿用 PCB 既有约定**。

**segments 段数**: PCB 当前 7 段(覆铜板/树脂/玻纤布/铜箔/封装基板/PCB设备/AI PCB 制造);**HBM 建议 6 段**(HBM 制造/TSV/键合/封装基板/上游硅/DRAM 颗粒);其他赛道按 5-7 段灵活。

---

## 8. midstream · 中游制造(可选)

```js
midstream: {
  description: "PCB制造是充分竞争行业。2025年以来五大龙头新增投资合计超400亿元...",  // 1 段卡口判定
  stocks: [
    {
      rank: 1,                            // 段内排名(barrier 降序)
      name: "胜宏科技",
      code: "300476",
      barrier: "极高",
      trend: "up",
      trendNote: "GB300主供·Q1+40%",
      note: "英伟达Tier1,显卡PCB全球~50%(Prismark 2026),Q1净利12.88亿+40%",
      dims6: [ {key, score, trend, tier} × 6 ],
      dims6Note: "🆪 弹性最大(英伟达显卡板~50%),但出口近八成、汇率敏感+估值最贵"
    }
    // 共 10 只(PCB 当前)
  ]
}
```

**何时填 midstream**:
- **PCB 必填**: 中游是赛道核心(头部 10 家占赛道 30-40% 产值)
- **HBM 必填**: 中游(HBM 制造+封装)是赛道核心
- **CPO/Solid-Battery 选填**: 中游是充分竞争、卡口判定段
- **AI-full-chain 不填**: 整合视图,不重复中游

**midstream vs segments[6] 双段定义**: PCB 有 7 段(其中 segments[6]="AI PCB 制造(中游)"),与 midstream.stocks[] **完全重叠**。**约定**:midstream 段为"中游主视角(更长列表,10 只)",segments[6] 为"环节视角(更短列表,5 只)",**两段 tier/dims6 必须一致**。

---

## 9. fourQuestions · 四大物理追问

```js
fourQuestions: {
  segments: [
    {
      name: "电子树脂(碳氢树脂)",         // 段名(对应卡口段)
      stocks: [
        {
          name: "东材科技",
          code: "601208",
          q1: true,                       // 4 问 1:供给寡头?
          q1note: "全球仅2家",            // ≤15 字
          q2: true,                       // 4 问 2:产能周期长?
          q2note: "18个月+",
          q3: true,                       // 4 问 3:替代缺位?
          q3note: "PPO无法满足M9",
          q4: true,                       // 4 问 4:下游刚需?
          q4note: "台光排他协议",
          hits: 4,                        // 4 问命中数 0-4
          strength: "★★★"                // 命中 4=★★★ / 3=★★☆ / <3=null
        }
        // 共 2-5 只(卡口段)
      ]
    }
    // 共 4-5 段(2-3 段卡口硬约束 + 1 段中游软判定 + 1 段设备/侧枝)
  ]
}
```

**4 问定义**(PCB 黄金范例口径):
- **q1 供给寡头**: 全球可量产厂商是否 <5 家?(Yes → 加分)
- **q2 产能周期**: 扩产 + 认证是否 ≥12 个月?(Yes → 加分)
- **q3 替代缺位**: 是否无替代材料/工艺?(Yes → 加分)
- **q4 下游刚需**: 客户是否锁定 / 切换成本高?(Yes → 加分)

**strength 取值**:`"★★★"` / `"★★☆"` / `null`(不构成卡口)

---

## 10. chokePoints · 3-5 个物理卡口

```js
chokePoints: [
  {
    rank: 1,                              // 卡口排序(★★★→★★☆)
    name: "东材科技",
    code: "601208",
    segment: "M9碳氢树脂",                // 卡口所在段
    strength: "★★★",                     // ★★★ / ★★☆
    logic: "全球<strong>仅2家</strong>通过英伟达M9碳氢树脂认证。台光独供2-3年排他协议。眉山3500吨<strong>2026年6月30日投料试产</strong>。Q1净利1.87亿+103%,高速树脂+131%。2026年全球缺口<strong>~5000吨(63%)</strong>。M10树脂已进入客户验证。",
    tags: [ "双寡头", "无替代", "缺口63%", "Q1净利+103%" ],   // 4 词标签
    valuation: {
      pe: "PE 2025~120x(+360%)",
      peAbsolute: "PE(2025A)~120x(+360%) · 历史极高位(材料板块~93% 分位)",
      pePercentile: 93,                    // 0-100 数字(PCB 强制)
      grossMargin: "50%+",
      fromHigh: "(2026-06-12 数据·相对前高位置未独立核实)",
      asOf: "2026-06-12",                  // 估值日期 YYYY-MM-DD
      note: "🆪 **PE 估值**:...",          // 长 note,含 🆪 主观判断
      tier: "broker",                      // primary/broker/media/estimate
      src: "投资网+亿牛网 2026-06..."
    },
    verification: {
      items: [
        { type:"供给寡头", claim:"全球仅2家", howToCheck:"...", falsifySignal:"出现第三家 → 卡口降级", status:"pending" },
        { type:"产能缺口", claim:"缺口5000吨/63%", howToCheck:"...", falsifySignal:"缺口收窄/延期", status:"pending" },
        { type:"财报印证", claim:"高速树脂+131%", howToCheck:"...", falsifySignal:"毛利率平庸", status:"pending" },
        { type:"交叉信源", claim:"≥2独立来源", howToCheck:"...", falsifySignal:"仅单一来源", status:"pending" }
      ],
      note: "初始版本验证清单 — 实际状态需手动核查后切换"
    }
  }
  // 共 3-5 个
]
```

**valuation 9 字段**:
- `pe` / `peAbsolute` / `pePercentile` / `grossMargin` / `fromHigh` / `asOf` / `note` / `tier` / `src`
- **pePercentile 0-100 数字**(PCB 强制),缺则卡口 tier 降 estimate
- **asOf 必填**(YYYY-MM-DD)
- **tier 必填**(primary/broker/estimate,media 单源关键数 → 标"存疑(待核)")

**verification.items[4]**:4 项(供给寡头/产能缺口/财报印证/交叉信源)+ 每项 `status: "pending"`。

---

## 11. supplyGap · 3 条供需缺口

```js
supplyGap: [
  {
    segment: "M9碳氢树脂",                // 段名(严格匹配)
    demand: "~8000吨/年",
    capacity: "~3000吨/年",
    gap: "5000吨",
    rate: "~63%",
    bottleneck: "认证周期18-24个月",
    tier: "broker",
    src: "Prismark + 东材公告 / 2026-06"
  }
  // 共 3 条
]
```

**8 字段必填**:`segment` / `demand` / `capacity` / `gap` / `rate` / `bottleneck` / `tier` / `src`

---

## 12. methodologyNotes · 方法论说明(可选)

```js
methodologyNotes: "PCB制造、设备等环节找不到满足四大条件的卡口——这是方法论的正常结果。中游制造环节虽然胜宏/沪电等头部企业非常优秀,但按卡口标准,客户可切换供应商→不构成物理卡口。<br><br><strong>【内容标准】</strong> 本赛道已叠加「全景占比/个股密度/进步退步」内容标准——每 segment stocks 补至 ≥5 家、treeMap sub-card note 标占比+Prismark/CPCA 来源、stocks.logic 加 ⬆ 进步/⬇ 承压/➖ 平稳 趋势前缀、position 必含市占率/排名。"
```

---

## 13. 4 处必改清单(每条新赛道必须改齐)

> **漏改 → 用户看到"该赛道数据加载失败"或赛道不可达**。详见 [CLAUDE.md §新增/编辑赛道的数据流](../../CLAUDE.md)。

### 13.1. manifest 数组 (index.html, line ~360)

```bash
# 找位置
grep -n "DATA_MANIFEST" index.html
# 在 13 元素数组内加 '<新赛道id>'(位置 = 加载顺序,与侧栏顺序独立)
```

### 13.2. nav-item (index.html, line ~400, `<div class="sidebar-nav" id="nav-list">`)

```bash
# 找位置
grep -n 'data-chain="' index.html
# 在 nav-list 内加(注意:末尾 "━ 我的决策" / "━ 整合视图" 分隔行不要破坏)
```

### 13.3. CHANGELOG (index.html, 内嵌 CHANGELOG 数组)

```bash
# 找位置
grep -n "CHANGELOG\s*=" index.html
# 在 CHANGELOG 前面插一条今日日期记录
# sector = 赛道 id 或 'system'
# sectorName / sectorColor 三元映射(在 renderChangelog 内)需要把新 id 加进去
```

### 13.4. DATA_VERSION bump (index.html, 顶部 const)

```bash
# 找位置
grep -n "DATA_VERSION" index.html
# 同步 bump(YYYYMMDD)
```

### 13.5. 新建 data/<id>.js

```js
// data/<id>.js 模板
window.CHAINS = window.CHAINS || {};
(function(CHAINS){
  CHAINS.<id> = {
    id: '<id>',
    name: '<赛道名>',
    icon: '<emoji>',
    meta: {...},
    prosperity: {...},
    cyclePosition: {...},
    plainIntro: {...},
    overview: [...],
    treeMap: {...},
    segments: [...],
    midstream: {...},        // 可选
    fourQuestions: {...},
    chokePoints: [...],
    supplyGap: [...],
    methodologyNotes: '...'
  };
})(window.CHAINS);
```

---

## 14. 上线自检 6 步(注入后跑)

```bash
# 1. 主 inline script JS 语法粗检
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const m=html.match(/<script>\s*\n\s*\/\/ ={5,}\n\/\/ DATA LAYER[\s\S]+?<\/script>/);const code=m[0].replace(/^<script>/,'').replace(/<\/script>$/,'');try{new Function(code);console.log('OK',code.length,'chars');}catch(e){console.log('ERR',e.message);}"

# 2. 单条 data/<id>.js 加载验证
node -e "global.window={};require('./data/<id>.js');const c=global.window.CHAINS.<id>;console.log(c?'OK '+c.name+' segments='+c.segments.length:'FAIL');"

# 3. 模拟完整浏览器加载,确认 14 条赛道全部注册
node -e "global.window={};['pcb','semi','ai-server','hbm','robotics','autonomous-driving','power-semi','ai-apps','cpo','solid-battery','low-altitude','commercial-aero','ai-full-chain','<id>'].forEach(id=>require('./data/'+id+'.js'));console.log(Object.keys(global.window.CHAINS).length+' 条');"

# 4. 破坏该文件验容错(临时 mv data/<id>.js data/<id>.js.bak → 浏览器看红色卡 → mv 回来)
mv data/<id>.js data/<id>.js.bak
py -m http.server 8000  # 浏览器硬刷 #<id> 看红色"数据加载失败"卡
mv data/<id>.js.bak data/<id>.js

# 5. barrier 降序未破
node -e "global.window={};require('./data/<id>.js');const c=global.window.CHAINS.<id>;c.segments.forEach((s,i)=>{const order={'极高':5,'高':4,'中':2,'低':1};let prev=6;let bad=false;s.stocks.forEach(st=>{if(order[st.barrier]>prev){bad=true;}prev=order[st.barrier];});console.log('['+i+'] '+s.name+' '+(bad?'❌ barrier 乱序':'✅'));});"

# 6. 六维卡 + 卡口 + 个股分 + 擂台渲染正常
py -m http.server 8000
# 浏览器硬刷:
# - #<id> → 6 维卡(prosperity.dims 6 个齐才渲染)+ 卡口 3-5 卡 + 树状图 5 列
# - #arena → 新赛道行出现、computeFit 综合分计算
```

---

## 15. 跨赛道应用:HBM 跑通 SOP 模板(首条验证)

> 阶段三 3A.4 三子步:3A.4a 字段对照 → 3A.4b 补 prosperity/cyclePosition → 3A.4c 提质 chokePoints。

### 3A.4a · 字段对照(CC 5 分钟)

```bash
# 1. 列出 hbm.js 顶层字段
node -e "global.window={};require('./data/hbm.js');console.log(Object.keys(global.window.CHAINS.hbm).join(' '));"
# 2. 对照 PCB 15 字段清单,标"已填/缺/待核"三态
# 3. 输出"字段对照卡"(.claude/plans/hbm-字段对照-2026-06-14.md)
```

### 3A.4b · 补 prosperity/cyclePosition(Gemini 联网 + CC 守门)

走 [refresh-sop.md §6 Gemini 查询模板](./refresh-sop.md#6-gemini-查询模板通用--查--自查--出注入块),范围设为"HBM prosperity + cyclePosition 6 维 + verdict"。

### 3A.4c · 提质 chokePoints(走 refresh-sop §6 卡口模板)

走 [refresh-sop.md §6 Gemini 查询模板](./refresh-sop.md#6-gemini-查询模板通用--查--自查--出注入块),范围设为"HBM 3-5 卡口各 9 字段(valuation 含 pePercentile + asOf + verification items[4])"。

---

## 16. 文档交叉引用

- **数据治理铁律**: [CLAUDE.md](../../CLAUDE.md) 第 0-5 节(信源四档/不造数/数据来源管道/手动刷新纪律/交叉验证门槛)
- **数据刷新 SOP**: [refresh-sop.md](./refresh-sop.md)(三步流程 / Gemini 模板 / 守门校验)
- **4 问物理追问**: [SKILL.md §四大物理追问](../skills/serenity/SKILL.md#四大物理追问)
- **verdict 写作模板**: [SKILL.md §verdict.stockHint 写作模板](../skills/serenity/SKILL.md#verdictstockhint-写作模板)
- **PCB 黄金范例**: [data/pcb.js](../../data/pcb.js)(冻结、只读)
- **ai-full-chain 元赛道差异**: 见 [CLAUDE.md §ai-full-chain 是特殊的"元赛道"](../../CLAUDE.md)

---

*本模板 = 跨赛道复制的"字段骨架"。新赛道上线前必须按本清单出"字段对照卡"→ 走 refresh-sop.md 三步流程。*

---

## 17. R3-18 阶段研究流程补充（2026-06-23 · PCB 治理体系提炼）

> **本节为 PCB R3-15+ → R3-16+ → R3-17 三轮治理经验沉淀的研究流程模板**，可直接复用到下一条产业链（HBM/CPO/AI 服务器/机器人/…）。
>
> 与原 §0-§16 字段骨架模板**互补**：
> - §0-§16 = 字段 schema（每个字段长什么样、必填/可选、渲染位置）—— **静态骨架**
> - §17 = 研究流程（如何初始化、如何刷新数据、如何防幻觉、如何守门）—— **动态方法**
>
> 与 [refresh-sop.md §9 R3-17 阶段经验补充](refresh-sop.md#9-r3-17-阶段经验补充2026-06-22--claudemd-610--611-沉淀) 配套使用，refresh-sop 是"存量刷新"流程，§17 是"新增链 + 大幅扩展"流程。

### 17.1 产业链初始化 Checklist

#### 17.1.1 股票列表确认（前置 · 必做）

- [ ] 列出 5 大环节的代表 stock（材料 → 设备 → 制造 → 下游 → 侧枝）
- [ ] 每只 stock 至少确认：6 位 code + 中文 name + 所属 segment + 当前 tier
- [ ] **退市 / 停牌 / ST 状态预检**（[pcb-pre-flight-check.js](.claude/plans/tools/pcb-pre-flight-check.js) · CLAUDE.md §6.9）
- [ ] **上市状态报告**输出至 `.claude/scratch/<id>-stock-status-report.md`

**首次确立**：PCB R3-15+ P1（2026-06-21）002288 超华科技已退市但被纳入豆包核实流程——本次 stock 列表确认即吸取教训。

#### 17.1.2 段位设计（5-7 段）

- [ ] 5-7 个段位（PCB=7 段：CCL/电子树脂/玻纤布+Q 布/铜箔/IC 封装基板/PCB 设备/AI PCB）
- [ ] 每段 ≥3 只 stock（保证 choke point 候选充分性）
- [ ] 段位命名 + 品类标注（用于豆包 prompt §17.3 第 8 条）
- [ ] 段位 barrier 档位设计（极高/高/中高/中/低 五档）

**段位设计模板**：

| 段位 | 品类 | 代表 stock | barrier 主导逻辑 |
|---|---|---|---|
| seg[0] | [品类 1] | [code] | 寡头/规模/技术 |
| seg[1] | [品类 2] | [code] | … |
| ... | ... | ... | ... |

#### 17.1.3 fourQuestions 覆盖

- [ ] 7 段 × ≥3 只 stock = 21+ 只 fourQ 候选
- [ ] 实际独立 stock 覆盖率目标 **≥90%**（PCB 实测 90.9% ✅）
- [ ] 4 问模板（CLAUDE.md §4）：
  - ①供给寡头：是否 CR3 ≥60% / 是否国产可替代
  - ②产能周期：当前扩张 / 收缩 / 平衡
  - ③替代缺位：海外是否垄断 / 国内是否突破
  - ④下游刚需：是否 AI/HBM/机器人等卡脖子环节下游

#### 17.1.4 数据文件创建（四处必改 · 见 §13）

- [ ] `data/<id>.js` IIFE + `window.CHAINS` 注入（见 §13.5 模板）
- [ ] `index.html` 顶部 manifest 数组加 `'<id>'`（见 §13.1）
- [ ] `<div class="sidebar-nav" id="nav-list">` 加 nav-item（见 §13.2）
- [ ] CHANGELOG 加今日日期记录（见 §13.3）
- [ ] DATA_VERSION bump（见 §13.4）

**漏改后果**：
- 漏 1 / 2 → 数据加载失败 → `renderChain` guard 显示红色错误卡（不白屏）
- 漏 3 → 赛道除 URL hash 之外不可达
- 漏 4 → 用户感知不到变化

### 17.2 数据刷新 SOP（六步 · 强制流程）

```
Step 1 · 三重验证（CLAUDE.md §6.10）—— 防御豆包引入新 stock / 错位段位 / 错码
  ↓
Step 2 · 豆包查询（CLAUDE.md §6.11）—— 11 条硬约束 prompt + 7 段式 + A/B 类拆分
  ↓
Step 3 · 幻觉筛查（CLAUDE.md §6.9）—— hallucination-screen.js 4 层防御
  ↓
Step 4 · trend 评估（A/B 类信号拆分）—— 主依据 A 类 + 辅助 B 类
  ↓
Step 5 · diff 审阅 —— 用户逐条审阅旧值→新值+tier+来源 + 被拒清单
  ↓
Step 6 · commit —— 等用户"通过"才执行 + commit message 显式标注范围 + asOf
```

#### Step 1 · 三重验证

- **触发**：任何涉及 ≥10 只 stock 的数据刷新
- **执行**：[pcb-pre-flight-check.js](.claude/plans/tools/pcb-pre-flight-check.js) + 三重验证脚本（[refresh-sop §9.1](refresh-sop.md#91-三重验证机制claudemd-610--stock-code--段位--name-校验)）
- **检查项**：stock code / 段位 / name 三项校验
- **数据冲突检查**：对比上一稳定版本 trendNote，重大漂移必标注 ⚠️

#### Step 2 · 豆包查询

- **触发**：三重验证通过后
- **执行**：按 §17.3 的 11 条硬约束 prompt 设计
- **输出格式**：7 段式（认证进展/客户切换/新进入者/技术产能/品类归属/未查到/信源清单）
- **A/B 类拆分**：trend 判断主依据必须是 A 类（认证/客户/技术/产能/竞争）

#### Step 3 · 幻觉筛查

- **触发**：豆包返回内容后
- **执行**：[pcb-hallucination-screen.js](.claude/plans/tools/pcb-hallucination-screen.js)（新链可复制改名 `<id>-hallucination-screen.js`）
- **4 层防御**：
  - Layer 1 退市窗口（❌ 严重）
  - Layer 2 事件密度（⚠️ 警告 / ❌ 严重）
  - Layer 3 数字可验证性（⚠️ 参考）
  - Layer 4 客户名可验证性（⚠️ 参考）
- **判定阈值**：risk score ≥10 → ❌ 强烈疑似幻觉，禁止采信

#### Step 4 · trend 评估

- **A 类信号**（主依据）：认证进展 / 客户验证 / 技术领先 / 竞争位置 / 产能变化
- **B 类信号**（辅助印证）：营收 / 订单 / 亏损 / 份额变化
- **判定**：up / flat / down 三档（每档严格基于 ≥1 个 A 类信号 + ≥1 个 B 类信号交叉）

#### Step 5 · diff 审阅

- 用户逐条审阅旧值→新值 + tier + 来源
- **被拒清单**：缺源 / 缺 tier / 三档标注缺失 / 单位口径异常
- **存疑清单**：单源待核 / 口径待统一 / 时序待核
- 输出：`R3-XX-conflicts-<date>.md`

#### Step 6 · commit

- **触发**：用户显式说"通过"
- **commit message 模板**：

```
feat: <链名> R3-XX 批<N> segments[A]-[B] M只 trendNote刷新（YYYY-MM-DD）
- N 处 trendNote 升级 + M 处 ⚠️ 单源标注 + ...
```

### 17.3 豆包 Prompt 通用框架（11 条硬约束 · CLAUDE.md §6.11）

> **使用方式**：复制以下 11 条作为 prompt header，正文按目标链的 stock list + 段位品类填充。

#### 11 条硬约束完整列表

1. **精确 stock 列表**——prompt 必须列出每只 stock 的 `code + name + segment 段位 + rank + barrier + tier + 当前 trend + 当前 trendNote`
2. **禁止引入新 stock**——明确告知模型"<id>.js 中只有以下 stock，禁止引入其他 stock"
3. **stock code 必须精确**——明确告知"stock code 是 6 位数字 + 板块标识（如 sz/sh）"，模型不得自编 stock code
4. **stock 段位必须精确匹配**——明确告知"每只 stock 必须在以下段位中"
5. **查询不到不替换**——明确告知"如查不到某只 stock 2024-Q4 至 2026-Q2 事实，在【6. 未查到】段列出，不要替换为其他 stock"
6. **7 段式格式**——【1. 认证进展】/【2. 客户切换】/【3. 新进入者】/【4. 技术产能壁垒】/【5. 品类归属】/【6. 未查到】/【7. 信源清单】
7. **信源 tier + broker 双源**——每条事实标注 tier（primary/broker/media）+ broker 双源 + 时间口径 + 数字 + 时点
8. **段位品类标注**——明确告知每段的品类（**留空待填**：`[seg[0]=品类A / seg[1]=品类B / seg[2]=品类C / ...]`）
9. **量产/验证/在研状态标注**——已量产/验证中/样品认证/在研/未启动 五档之一
10. **不得编造事实**——联网搜不到的事实必须显式列在【6. 未查到】段，不得填入主段伪装成事实，不得编造客户名、数字、日期
11. **A/B 类信号拆分**——A 类=壁垒维度本身变化（认证/客户验证/技术领先/竞争位置/产能变化）；B 类=经营业绩（营收/订单/亏损/份额变化）；trend 判断主依据必须是 A 类，B 类仅辅助印证

#### 段位品类填充模板（第 8 条）

```markdown
【段位品类标注 · 本链】
- segments[0] = [品类 1，如：覆铜板 CCL]
- segments[1] = [品类 2，如：电子树脂]
- segments[2] = [品类 3，如：玻纤布/Q 布]
- segments[3] = [品类 4，如：铜箔/HVLP]
- segments[4] = [品类 5，如：IC 封装基板/ABF 膜]
- segments[5] = [品类 6，如：PCB 设备/钻孔机]
- segments[6] = [品类 7，如：AI 服务器 PCB]
- midstream = [中游品类，如：PCB 制造]
```

### 17.4 质量门禁标准（PCB 验证阈值）

#### 17.4.1 结构层（必须 100%）

| 项 | 标准 | PCB 实测 | 新链目标 |
|---|---|---|---|
| segments[].stocks[].code | 100% 必填 | 34/34 ✅ | 100% |
| segments[].stocks[].name | 100% 必填 | 34/34 ✅ | 100% |
| segments[].stocks[].src | 100% 必填 | 34/34 ✅（真 URL 待 R3-18 补）| 100%（真 URL）|
| segments[].stocks[].logic | 100% 必填 | 34/34 ✅ | 100% |
| segments[].stocks[].trendNote | 100% 必填 | 34/34 ✅ | 100% |
| segments[].stocks[].dims6Note | 100% 必填 | 34/34 ✅ | 100% |

#### 17.4.2 来源层（⚠️ 单源 ≤30 处）

| 项 | 标准 | PCB 实测 | 新链建议 |
|---|---|---|---|
| ⚠️ 标注总数 | ≤30 处 | 46 处 ❌ | ≤20 处（更严）|
| 单源待核 | ≤10 处 | 4 处 ✅ | ≤5 处 |
| 口径待统一 | ≤10 处 | 8 处 ✅ | ≤5 处 |
| AI 暴露弱诚实标注 | N/A（按设计）| 6 处 | 按设计 |

#### 17.4.3 逻辑层（fourQ ≥90%）

| 项 | 标准 | PCB 实测 | 新链目标 |
|---|---|---|---|
| fourQ 独立 stock 覆盖率 | ≥90% | 90.9% ✅ | ≥90% |
| fourQ 段数 = segments 段数 | 必须 | 7=7 ✅ | 必须 |

#### 17.4.4 trend 一致性（必须 0 变化）

| 项 | 标准 | PCB 实测 | 新链目标 |
|---|---|---|---|
| 同批 stock trend 方向变化数 | 0 | 0 ✅ | 0 |

#### 17.4.5 meta.status 准入

- ✅ 0 个不达标项 → meta.status 可设 `active`
- ⚠️ 部分不达标但趋势向好 → meta.status 可设 `partial`，note 写差距摘要
- ❌ 多个不达标项 → meta.status 保持 `in-progress` / `planning`

### 17.5 常见陷阱清单（PCB 已踩 + 防御措施）

#### 17.5.1 品类混淆

**陷阱**：把"持有上海微电子 10% 股权的园区开发商"算作"半导体设备标的"是凑数；把"封测代工厂"算作"封测设备厂"是错分类。

**PCB 案例**：
- 603002 宏昌电子：环氧树脂壁垒低 → 非卡口；Q1 毛利率仅 4.87%
- 002938 鹏鼎控股：消费电子占比~70% + AI 暴露 5.41% → AI 暴露弱

**防御**：
- ⚠️品类混淆标注：`⚠️品类混淆：[品类 A] 属 [本段品类] · [品类 B] 段不纳入`
- 概念票不计入 stock 总数（CLAUDE.md §6.5）
- 段位设计阶段明确定义每段品类边界

#### 17.5.2 主体混淆

**陷阱**：stock code 错位（如 PCB 案例：中一 688234 → 301150 代码混淆，2026-06-22 修复）。

**PCB 案例**：
- 中一科技 stock code 混淆：688234（科创板）vs 301150（创业板）→ 实际为 301150
- 002288 超华科技已退市但 stock code 仍在 R3-15+ P1 阶段流程

**防御**：
- 三重验证脚本 name 校验（CLAUDE.md §6.10）
- 豆包 prompt 第 3 条"stock code 必须精确"
- pre-flight-check.js 退市状态预检

#### 17.5.3 数字口径

**陷阱**：同口径不区分（细分 vs 整体 / 当前 vs 规划 / 时序新旧）。

**PCB 8 处口径待统一案例**：
- 600183 生益：M9 市占 30-40% vs 全球市占 14-15%（细分 M9 vs 整体 CCL）
- 300522 世名：盘锦 500 吨已投产 vs position 2500 吨（当前 vs 规划）
- 301377 鼎泰：钻针 28.9% + 20.8% 合计 49.7% vs 原 26.5%+20.8%=47.3%（时序已更新）
- 002636 金安国纪：26.8% + 20.8% 合计 47.6% vs 原 26.5%+20.8%=47.3%（口径待统一）
- 002443 金洲：20.8% 数据对应年份未独立核实（时序待核）
- 688300 联瑞：position "国产第一 15%" vs "国内市占 ~40%" 张力
- 301217 铜冠：2027 中国 1 厂 42% vs 日韩合计 85%+（统计基础不同）
- 300476 胜宏：mSAP 良率 70-80% vs 二代低介电 Dk=4.3（口径未直接冲突但有张力）

**防御**：
- ⚠️口径待统一标注：`⚠️口径待统一:[数字 A] vs [数字 B],口径不同(细分品类 X vs 整体 Y)`
- 豆包 prompt 第 7 条"信源 tier + broker 双源 + 时间口径 + 数字 + 时点"
- data conflict 检查阶段显式列出所有 ⚠️口径项

#### 17.5.4 双视角副本

**陷阱**：同一 stock 在 segments + midstream + fourQuestions 多视图时 trendNote 复制粘贴。

**PCB 2 处典型案例**：
- 603186 华正新材：segments[0] CCL 段位 + segments[4] IC 段位副本（trendNote 不同属正常）
- 002916 深南电路：segments[4] IC 段位 + midstream.stocks rank 3 副本（trendNote 不同属正常）

**防御**：
- [refresh-sop §9.5 双视角副本保护规则](refresh-sop.md#95-双视角副本保护规则pcb-跨视图-stock-案例)
- 豆包 prompt 分批（CCL 副本和 IC 段位分两批 prompt）
- commit message 显式标注范围（segments[0]-[3] vs [4]-[6] vs midstream）

#### 17.5.5 退市 stock

**陷阱**：002288 超华科技已退市但被纳入 R3-15+ P1 豆包核实流程，豆包返回 13 项事件含 7 项 2026 幻觉事件（HVLP 铜箔/玉林基地/宁德时代比亚迪等）被采信为 down 判定依据（2026-06-21 事故）。

**防御**：
- CLAUDE.md §6.9 上市状态预检（[pcb-pre-flight-check.js](.claude/plans/tools/pcb-pre-flight-check.js)）
- [refresh-sop §6.6 双重检查前置流程](refresh-sop.md#66-stock-双重检查前置pre-flight--hallucination-screen)
- `knownDelistDates` 字典持续维护

#### 17.5.6 PE-TTM 估值失真

**陷阱**：亏损期 PE-TTM 失真（PCB 案例：605006 山东玻纤 -1246.93 倍、603936 博敏 -518.62 倍）。

**防御**：
- PE 亏损期标 `"PE-TTM 失真(亏损期)"`，分位不填
- 改用 PB/PS 上市以来分位代替（early-stage 公司）
- 估值门控触发时（如 R3-17 升益 3 卡口 PE-TTM 综合分 = 1）须**分别看待**：早期爬坡 PE-TTM 不可作硬依据 / Q 布高市占 TTM 可作硬依据 / 上市<5y 亏损 PE 改 PB/PS

#### 17.5.7 AI 暴露弱诚实标注

**陷阱**：把"AI 概念股"误判为"AI 卡口"，不诚实标注实际 AI 暴露占比。

**PCB 6 处 AI 暴露弱标注**：
- 300395 菲利华：Q 布业务处认证阶段（2025 年收入 9,837.37 万元 / 占总营收 4.88%）
- 688300 联瑞：主业硅微粉稳定 + AI 暴露弱（18%）
- 603002 宏昌：环氧树脂壁垒低 → 非卡口
- 603936 博敏：ABF 规模 <1% + HBM 在研 + Q1 亏损 + AI 载板落后
- 002938 鹏鼎：消费电子占比~70% + AI 暴露 5.41%
- 605006 山东玻纤：E-glass 中端 + 市占 5% + AI 暴露极弱

**防御**：
- AI 暴露弱诚实标注字段 `dims6Note` / `logic`
- 强制要求每只 stock 写明 AI 暴露比例 + 实际业务占比
- prosperity.verdict.stockHint 不写字段路径（CLAUDE.md 约定）

### 17.6 跨链通用 vs PCB 特化（提炼说明）

#### 17.6.1 通用框架（任何产业链直接复用）

| 章节 | 通用性 | 说明 |
|---|---|---|
| §17.1.1 股票列表确认 | ✅ 通用 | pre-flight-check.js 适用任何赛道 |
| §17.1.4 数据文件创建（四处必改）| ✅ 通用 | 见 §13 |
| §17.2 数据刷新 SOP 六步 | ✅ 通用 | 三重验证 + 豆包查询 + 幻觉筛查 + trend 评估 + diff 审阅 + commit |
| §17.3 豆包 Prompt 11 条硬约束 | ✅ 通用（除第 8 条品类外）| CLAUDE.md §6.11 沉淀 |
| §17.4 质量门禁标准 | ✅ 通用 | 结构 100% / 来源 ⚠️≤30 / 逻辑 fourQ ≥90% / trend 0 变化 |
| §17.5.1-§17.5.7 陷阱清单 | ✅ 通用框架 + PCB 案例 | 新链需替换自身案例 |

#### 17.6.2 PCB 特化（其他链需替换的内容）

| 章节 | PCB 特化部分 | 新链需替换 |
|---|---|---|
| §17.1.2 段位设计 | PCB=7 段（CCL/树脂/玻纤布/铜箔/IC 封装/PCB 设备/AI PCB）| 按目标链设计 5-7 段 |
| §17.3 第 8 条 段位品类标注 | PCB 段位品类已填 | **留空待填**（见 §17.3 段位品类填充模板）|
| §17.4.2 来源层阈值 | PCB=46 处超 30 处上限 | 新链建议 ≤20 处（更严）|
| §17.4.4 trend 一致性 | PCB 实测 0 变化 | 目标 0 变化 |
| §17.5.3 数字口径 | PCB 8 处案例 | 新链需收集自身口径冲突案例 |
| §17.5.4 双视角副本 | PCB 2 处典型（华正/深南）| 新链是否多视图待设计时决定 |
| §17.5.5 退市 stock | PCB 1 处（超华科技 002288）| `knownDelistDates` 字典需持续维护 |
| §17.5.6 PE-TTM 失真 | PCB 2 处（山东玻纤/博敏）| 新链按实际情况标注 |
| §17.5.7 AI 暴露弱 | PCB 6 处诚实标注 | 新链需根据行业 AI 关联度设计阈值 |

#### 17.6.3 PCB 已验证的字段 schema（跨链通用 · 见 §7）

按 §7 segments · 6-7 段环节拆解完整执行：
- `prosperity.dims[6]` 每维 `{key, name, score, trend, reason, evidence, flag, tier}`
- 个股 `dims6[]` + `dims6Note` + `tier` + `code` + `valAsOf`
- 综合分 `computeFitFromDims` 权重 dur.25/vis.25/val.20/sup.12/bar.10/pol.08
- 门控：valuation ≤1 或 barrier ≤1 → 封顶 60 分
- 档位：≥75🟢 / 55-74🟡 / <55🔴

### 17.7 下一步行动清单（用户决策）

完成本模板后，**用户需决策**：

- [ ] 是否启动下一条产业链（候选：HBM / CPO / AI 服务器 / 机器人 / 自动驾驶 / 商业航天）
- [ ] 候选优先级（按与 PCB 关联度 + 数据成熟度评估）
  - HBM：与 AI PCB 强相关（AI 服务器 PCB → HBM 存储）
  - CPO：与 PCB 关联度次高（1.6T 光模块 PCB 已涉及）
  - AI 服务器：AI 全产业链，含 PCB 主板
  - 机器人：人形机器人 PCB 用量
  - 自动驾驶：车载 PCB
  - 商业航天：航天级 PCB
- [ ] 启动时机（PCB R3-18 完成后 / 立即启动 / 暂缓）
- [ ] 数据源选择（HBM 首选：SK hynix / Micron 财报 + 三星合作公告；CPO 首选：中际旭创 / 天孚通信互动易）

---

*§17 节为 R3-18 阶段研究流程补充，原 §0-§16 字段骨架模板不变。本节配套使用：字段骨架用 §0-§16（schema 长什么样），研究流程用 §17（怎么治理）。任何新增链 / 大幅扩展任务**必须**配套阅读 [refresh-sop.md](refresh-sop.md) + CLAUDE.md §6.1-§6.11 全部纪律。*
