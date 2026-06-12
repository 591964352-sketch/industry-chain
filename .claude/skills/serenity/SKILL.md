# Serenity 物理卡口投研 + 产业链全景网站

## 概述

基于海外知名交易员 Serenity 的物理卡口方法论（Choke Point Theory），实现两个能力：
1. **产业链深度研究** — 从龙头往下深挖，用四大物理追问筛选卡口标的
2. **全景网站维护** — 将研究成果渲染为可交互的产业链全景网页

网站文件：`产业链全景.html`（根目录，浏览器直接打开）

## 核心方法论

### 四大物理追问（逐标的必问）

| # | 追问 | 通过条件 |
|---|------|---------|
| ① | **供给端：寡头垄断？** | 全球能量产的企业 ≤3 家，且该标的为其中之一 |
| ② | **产能端：扩产周期？** | 扩产周期 ≥12 个月，且供给缺口明确 |
| ③ | **替代端：有无替代？** | 无成熟替代方案（替代品需 ≥2 年验证周期） |
| ④ | **需求端：下游刚需？** | 下游必须使用该产品，替换认证周期 ≥6 个月 |

### 卡口强度判定

- ★★★ 核心卡口 = 命中 4/4
- ★★☆ 潜在卡口 = 命中 3/4
- 不通过 = 命中 ≤2/4

## 触发方式

### 模式 1：添加新产业链（最常用）

**触发契约**：用户说以下任意一句即按本 SOP 执行——
- "加入/添加/研究 XX 产业链"
- "/serenity --add <赛道名>"

**执行流程**（详见下方"## 新赛道 SOP（第三层）"章节）：

1. **深度搜索** — 用 WebSearch 对目标产业链做多轮（≥5 次）搜索
2. **四问筛选** — 对每个标的套四大追问，标注 ★★★/★★☆/不通过
3. **数据结构化** — 按下方"数据模板"整理 JS 对象
4. **三处必改注入** — CHAINS 数据块 / 侧栏 nav-item / CHANGELOG
5. **验证** — 双文件同步 + JS 语法自检 + 浏览器测试

> **关键卡点（Step 3 → Step 4 之间）**：数据结构化完成后，**必须逐条对照《内容质量标准》S1–S8 + 《避坑清单》自检，不达标不得注入网站**（详见下方"## 新赛道 SOP（第三层）" 章节）。S1–S8 见"## 内容质量标准"，避坑清单在 SOP 章节末尾。

### 模式 2：仅研究（不更新网站）

- `/serenity --sector <赛道名>` — 运行完整六步下钻研究
- `/workflow serenity-choke-point --args '{ "sector": "xxx", "leader": "xxx" }'` — 直接调 workflow

## 新赛道 SOP（第三层 · 操作手册）

> 模式 1（添加新产业链）的展开版。把"做法"和"避坑"沉淀成通用规范，以后研究 HBM/CPO/机器人/光模块/任何新赛道都按此执行。

### 触发契约

用户说以下任一句即按本 SOP 执行——

| 触发语 | 含义 |
|---|---|
| "加入 XX 产业链" / "添加 XX 赛道" | 新增一条完整赛道到 CHAINS |
| "研究 XX 行业" | 先研究再决定是否注入 |
| "/serenity --add <赛道名>" | CLI 形式触发 |

### 5 步执行流程

#### Step 1 · 深度搜索（WebSearch 多轮 ≥5 次）

覆盖：
1. 产业链全景结构（上游→中游→下游，各环节格局）
2. 上游核心壁垒环节（材料/设备/元器件，国产化率）
3. 每个壁垒环节的全球寡头格局（谁垄断？几家能量产？认证周期？）
4. 每个环节的 A 股标的（名称 + 代码 + 壁垒评级 + 核心逻辑 + **市占率/排名**）
5. 下游需求测算（龙头放量节奏、单台用量、缺口计算）

数据精度：每个环节 ≥5 次独立 WebSearch，关键数据交叉验证。数据等效参考研报 ≥200 篇。

#### Step 2 · 四问筛选

对每个标的套四大追问（详见"## 核心方法论 → 四大物理追问"），标注 ★★★/★★☆/不通过：
- ★★★ 核心卡口 = 命中 4/4
- ★★☆ 潜在卡口 = 命中 3/4
- 不通过 = 命中 ≤2/4

#### Step 3 · 数据结构化（关键卡点）

按下方"## 数据模板"整理 JS 对象。**结构化后必须逐条对照《内容质量标准》S1–S10 + 《避坑清单》自检，任何一条不达标都不得注入网站**。具体硬约束包括但不限于：
- `segments < 6 环节` → 不达标
- 任一 `segments[].stocks < 5 家` → 不达标
- `midstream.stocks < 10 家`（若赛道有 midstream）→ 不达标
- 任一 `stock.position` 缺市占率/排名 → 不达标
- 任一 `stock.logic` 缺可核查依据 → 不达标
- 任一卡口 `chokePoints[i].valuation.pePercentile` 缺 → 不达标
- 任一卡口 `chokePoints[i].verification.items < 4 项` → 不达标
- `overview` 缺 8 类必含项任一 → 不达标
- `treeMap` 缺 5 列任一列或任一列 sub-card < 2 个 → 不达标

S1–S10 完整版见"## 内容质量标准（所有赛道必须达标）"。

#### Step 4 · 三处必改注入（缺一不可）

| 顺序 | 改哪里 | 漏改后果 |
|---|---|---|
| 1 | 在合适 `// ==================== <NAME> ====================` 分隔处追加 `CHAINS.xxx = { ... };` | 数据不可达 |
| 2 | 在 `<div class="sidebar-nav" id="nav-list">` 里加 `<span class="nav-item" data-chain="xxx" onclick="switchChain('xxx')">…</span>` | 侧栏看不到、URL hash 之外不可达 |
| 3 | 在 `CHANGELOG` 前面插一条今日日期记录（`sector: 赛道id` 或 `'system'`） | 用户 7 天内感知不到变化 |

> **侧栏顺序 = 用户看到顺序**。注意末尾 "━ 我的决策" / "━ 整合视图" 分隔行不要破坏。`renderChangelog` 内的 `sectorName` / `sectorColor` 三元映射可能要把新 id 加进去。

#### Step 5 · 验证

```bash
# 1. 双文件字节级同步（必须无输出）
diff -q index.html 产业链全景.html

# 2. JS 语法粗检（必须 OK）
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const m=html.match(/<script>([\s\S]+)<\/script>/);try{new Function(m[1]);console.log('OK',m[1].length,'chars');}catch(e){console.log('ERR',e.message);}"

# 3. 浏览器测试（手动）
py -m http.server 8000   # 浏览器开 http://localhost:8000/index.html#<新赛道id>
```

校验点（手动）：
- 侧栏点新赛道 → 内容正确渲染
- ② 树状图 5 列全部为 array（`Array.isArray(d.treeMap.downstream)` 走新布局），每列 ≥2 sub-card、每个 sub-card note 含占比+来源
- ③ segments 表每段 ≥5 stocks，每个 stock 旁有趋势徽章（绿/红/灰）
- ④ chokePoints 三大卡口 verification 默认 4 项 + 整体徽章
- ⑤ 顶部"数据截止"日期未动

### 模式 2：刷新现有赛道（同样按 PCB 黄金范例）

**触发契约**：用户说以下任一句即按本 SOP 执行——
- "刷新 XX 赛道" / "重做 XX 赛道" / "全量研究 XX 赛道"
- "/serenity --refresh <赛道id>"

**执行流程**：与"模式 1 添加新赛道"**完全相同**的 5 步流程（深度搜索 → 四问筛选 → 数据结构化 → 注入替换 → 验证），**字段密度要求与新增赛道一致**（S1–S10 全套硬标准）。

**核心约束**：
- 刷新产出的新 `CHAINS.xxx` 数据块**必须**与黄金范例 `CHAINS.pcb` 同款结构与字段密度（segments ≥ 6 / 个股 ≥ 5 / midstream ≥ 10 / 卡口 3 大 / verification 4 项 / valuation.pePercentile 必填 / S1-S10 全过）
- 任意一条不达标 → **不替换原数据**（保留旧版本 + 在 CHANGELOG 加 1 条 `❌ 刷新未达标未注入` 记录原因）
- 注入替换路径：直接 Edit 现有 `CHAINS.<id> = { ... }` 块（不需要新建分隔行；保持原 `// ==================== <NAME> ====================` 行）
- 替换后**双文件同步 + JS 语法自检 + 浏览器抽查**（3 个 anchor 段：segments 表格、treeMap、chokePoints）

### 避坑清单（数据落入前最后一遍）

数据落入**前**对照这一节，**避免常见错误**：

- ❌ **不**填 `socraticInquiry` / `occamRazor`——除非真需要这两个 section，会继承 section 序号偏移的副作用（`ai-full-chain` 专属）
- ❌ **不**预填交易日志示例（`myTrades` 保持空状态）——交易是真金白银的记录
- ❌ **不**动顶部"数据截止"日期——只有真实数据/财报/扩产等硬变化才刷，AI 主观判断标 🆪 不刷日期
- ❌ **不**主动 commit——改完只报告，等用户显式说"通过"再 `git commit`（中文 message 描述内容变化）
- ❌ **不**破 `barrier` 降序（极高 → 高 → 中 → 低）——`rank` 字段对应
- ❌ **不**丢原 `logic` / `note` / `position` / `hits` / `strength` 字段——升级 A/B 是叠加非替换
- ❌ **不**复制-粘贴别人的 logic 不改 stock 名——每条 logic 必须对应该 stock 的具体业务
- ❌ **不**为凑数塞无关标的——segments[].stocks <5 时老实写 4-5 家，不强凑
- ❌ **不**加自定义 CSS 类——先复用现有 `.tag / .choke-card / .card / .stock-tbl / var(--*)` 调色板
- ❌ **不**在树状图 mini 表（`tree-sub-mini-tbl`）加 trend 徽章——空间太小，避免拥挤
- ❌ **不**破坏 `// ==================== <NAME> ====================` 分隔行——下次找数据靠 grep 定位
- ❌ **不**改 CSS 主结构——非要新加 CSS 类 append 到主结构后面（`</style>` 之前），不改既有定义
- ❌ **不**改 `index.html` 之外的孤立 PCB-only 页面（[PCB产业链全景.html](PCB产业链全景.html) 早期独立页，没明确要求别动）

### 验收清单（改完逐项自查并回报结果）

- [ ] **S1 宏观完整**：overview 8-9 卡，6 类必含项全 + 来源+时点
- [ ] **S2 全景五列**：treeMap 5 列齐全（列名与 PCB 完全一致），每列 ≥2 sub-card，全部为 array
- [ ] **S3 分支占比**：每个 sub-card 的 note 含占比/规模数字 + 来源
- [ ] **S4 个股密度**：segments **≥ 6 环节**、每个 `segments[].stocks` ≥ 5、`midstream.stocks` ≥ 10
- [ ] **S5 市占率/定位 + 可核查逻辑**：每个 stock 的 position 含市占率/排名硬定位 + logic 含可核查依据
- [ ] **S6 壁垒排序**：每段 stocks 严格 barrier 降序、rank 对应
- [ ] **S7 进步/退步**：每个 stock 有 `trend` 字段（up/down/flat）+ `trendNote` 一句理由
- [ ] **S8 卡口方法论**：**3 大卡口**（★★★/★★★/★★☆ 至少 1 个 ★★★）配齐 hits/strength/tags/valuation(pePercentile 必填)/verification(4 项 howToCheck+falsifySignal) + supplyGap 2-4 条
- [ ] **S9 数据时效**：关键数据带最近一期财报 + `<mark class="updated">` 标注 + 来源+时点 + AI 估算标 🆪
- [ ] **S10 研究纪律**：≥2-3 独立信源交叉验证 + 只摘事实数据 + **严禁复制研报/文章原文**
- [ ] **PCB 黄金范例对齐**：字段密度+结构与 `CHAINS.pcb` 同款（不达标不注入）
- [ ] **避坑清单**：13 条全部通过
- [ ] **三处必改**：CHAINS 数据块 / 侧栏 nav-item / CHANGELOG 今日记录齐
- [ ] **双文件同步**：`diff -q index.html 产业链全景.html` 无输出
- [ ] **JS 语法**：`node -e` 输出 `OK <chars>`
- [ ] **浏览器测试**：3 个 anchor（segments 表格、treeMap、chokePoints）正常渲染
- [ ] **既有赛道不破坏**：现有 12 条赛道 + 升级一-六视图视觉不变
- [ ] **未自动 commit**——已列改动清单等用户确认

### 通用约束

- 面向用户文案用简体中文，技术标识符（赛道 id、CSS class、JS 函数名）保持英文小写连字符
- 底部"不构成投资建议"免责声明必须保留，不要删
- AI 主观判断（周期位置/估值分位）标 🆪 不刷日期
- 不预填交易日志示例
- commit message 用中文，描述**内容**层面的变化（改了哪些赛道、哪些字段）

## 数据模板

以下为 `CHAINS.xxx` 的完整数据结构。添加新产业链时必须按此格式整理数据。

```javascript
CHAINS.<id> = {
  id: '<id>',           // 唯一标识，如 'cpo', 'robot'
  name: '<中文名>',      // 如 'CPO 共封装光学'
  icon: '<emoji>',       // Tab 图标

  // 周期位置（可选 — 缺 stage 就不渲染底部"周期位置"卡片）
  // 4 阶段：recovery(复苏) / boom(繁荣) / peak(顶部) / decline(下行)
  // 颜色规则：复苏=var(--green) / 繁荣=var(--barrier-high) / 顶部=rgba(246,70,93,0.4) / 下行=rgba(246,70,93,0.85)
  // 0 CSS 增量：复用现有 .card 容器 + inline 进度条
  cyclePosition: {
    stage: 'boom',                                      // 必填（4 选 1）
    label: '繁荣中后期',                                  // 中文标签
    reason: 'AI 算力超级上行周期，需求强劲但估值已高',     // 当前阶段理由
    watchSignals: [                                      // 关注哪些信号判断周期是否转向
      '英伟达资本开支指引',
      '上游集中扩产公告',
      'M9 材料缺口率变化'
    ]
  },

  // ⓪ 白话解读
  plainIntro: {
    analogy: '<一句话比喻>',
    paragraphs: ['<段落1>', '<段落2>'],
    flowSteps: ['步骤1', '步骤2', ...],  // 产业链流水账
    highlightBox: '<Serenity视角分析>'
  },

  // ① 赛道概览（8个数据卡片）
  overview: [
    { label: '🌍 指标名', value: '数值', note: '说明', color: 'var(--accent)' },
    // ... 共 8 个。color 可选: var(--accent)/var(--red)/var(--green)/var(--blue)/null
  ],

  // ② 产业链树图
  // ★ 升级七：横向 5 列布局（pcb 试点）
  // 5 列从左到右：downstream → midstream → materials → equipment → sideBranches
  // 每列内是 sub-card 数组；sub-card 选 1 个：sourceSegment 映射 OR inline companies[]
  // 其它 11 条赛道仍用旧 schema，渲染器自动 fallback（旧版纵向 5 段）
  //
  // ★ 新 schema（pcb 试点）：
  //   treeMap.downstream: [...]    // array of sub-cards
  //   sub-card: { name, barrier, note, companies?: [...], sourceSegment?: 'segments[].name' }
  //   sourceSegment: 渲染时从 segments[] 找同名项 → 用其 stocks（0 重复数据）
  //
  // ★ 旧 schema（其它 11 条赛道 + AI 全产业链 fallback）：
  //   treeMap.downstream: { name, barrier, note }   // 单对象
  //   treeMap.midstream:  { name, barrier, note }   // 单对象（或 systemAssembly）
  //   treeMap.materials: [{ name, barrier, choke, note }]   // 数组
  //   treeMap.equipment: [{ name, barrier, choke, note }]
  //   treeMap.sideBranches: [{ name, barrier, note }]
  //   可选: upstreamCCL (PCB 特色) / upstreamTools (半导体特色)
  //   AI 全产业链专属: computeLabel+compute[] / interconnectLabel+interconnect[] / pcLabel+pc[] / mfgLabel+manufacturing[]
  //
  // 渲染器检测 `Array.isArray(d.treeMap.downstream)` 决定走新/旧布局
  treeMap: {
    downstream: { name: '下游描述', barrier: 'low', note: '补充说明' },
    midstream: { name: '中游描述', barrier: 'low', note: '补充说明' },
    // 可选：upstreamCCL（PCB特色，有中间基材层时使用）
    // 可选：upstreamTools（半导体特色，有EDA等设计工具层时使用）

  // ③ 上游深度拆解（每个环节一个 segment）
  segments: [
    {
      name: '环节名称',
      costRatio: '成本占比或市场规模',  // 如 '26%' 或 '全球~$700亿'
      barrier: 'extreme'|'high'|'mid'|'low',
      choke: true|false,          // 是否为 Serenity 卡口环节
      border: true|false,         // 是否加红色边框突出显示
      intro: '<详细描述，150-250字>',
      globalLandscape: [
        { lbl: '企业名', val: '核心数据', note: '补充' },
        // ... 3-4 条
      ],
      stocks: [
        {
          rank: 1,                // 壁垒排名
          name: '标的名称',
          code: '股票代码',
          position: '全球/国内定位',
          barrier: '极高'|'高'|'中',
          hits: 4|null,           // 四问命中数（卡口标的填数字，非卡口填 null）
          strength: '★★★'|'★★☆'|null,  // 卡口强度（非卡口填 null）
          trend: 'up'|'down'|'flat',      // 可选·进步/承压/平稳（S7 彩色徽章）
          trendNote: '一句趋势理由',     // 可选·悬浮提示（≤15字）
          logic: '一句话投资逻辑'
        },
        // ... 3-7 个标的，按壁垒从高到低排序
      ]
    },
    // ... 5-7 个环节
  ],

  // ④ 中游制造（仅 PCB 等行业有独立中游环节时使用）
  midstream: {
    description: '<中游描述>',
    stocks: [
      { rank: 1, name: '标的', code: '代码', barrier: '极高'|'高'|'中', note: '一句话逻辑' },
      // ... 5-10 个标的
    ]
  },

  // ⑤ 四问筛选
  fourQuestions: {
    segments: [
      {
        name: '环节名称',
        stocks: [
          {
            name: '标的名称', code: '代码',
            q1: true|false, q1note: '说明',
            q2: true|false, q2note: '说明',
            q3: true|false, q3note: '说明',
            q4: true|false, q4note: '说明',
            hits: 0-4,
            strength: '★★★'|'★★☆'|null
          },
          // ...
        ]
      },
      // ... 3-5 个环节
    ]
  },

  // ⑥ 卡口结论
  chokePoints: [
    {
      rank: 1,
      name: '标的名称',
      code: '股票代码',
      segment: '卡口环节名',
      strength: '★★★',
      logic: '<150字卡口逻辑>',
      tags: ['标签1', '标签2', '标签3', '标签4'],

      // 估值/择时（可选 — 缺 pePercentile 就不渲染估值条）
      // 颜色按分位自动：≥80 红（tg-extreme）/ 30-80 橙（tg-high） / <30 绿（tg-green）
      // 复用现有 .tag + .tg-* 调色板，零 CSS 增量
      // pePercentile 是唯一必填字段（用 typeof === 'number' 守卫），其他缺则不显示
      valuation: {
        pe: '<TTM PE，如 "约50倍" / "32x">',          // 可选
        pePercentile: 85,                              // 必填（0-100 数字）
        fromHigh: '距前高-15%',                         // 可选
        grossMargin: '50%+',                            // 可选（毛利率 = 定价权印证）
        note: 'PE处历史85%分位，卡口逻辑已被充分定价'   // 可选
      },

      // 卡口验证清单（可选 — 缺则不渲染折叠区，整体状态徽章也不显示）
      // 整体状态从 items[].status 推导：全 confirmed → verified；有 broken → falsified；其余 → pending
      // 用户在网页上点击单项状态徽章可循环切换 pending → confirmed → broken，
      // 状态自动存 localStorage(key: `verify_${chainId}_${code}`)，刷新不丢。
      verification: {
        items: [
          {
            type: '供给寡头',         // 验证维度名（中文，建议 4 项：供给寡头/产能缺口/财报印证/交叉信源）
            claim: '<论断一句>',
            howToCheck: '<具体核查路径，写明查哪个公告/季报/研报>',
            falsifySignal: '<什么信号一出现，卡口判断就站不住>',
            status: 'pending'         // 初始状态：'pending'|'confirmed'|'broken'（运行时被 localStorage 覆盖）
          }
        ],
        note: '<验证总结备注（可选）>'
      }
    },
    // ... 2-3 个核心卡口
  ],

  // 供需缺口表
  supplyGap: [
    {
      segment: '环节名',
      demand: '2026E需求',
      capacity: '2026E产能',
      gap: '缺口量',
      rate: '缺口率',
      bottleneck: '核心瓶颈描述'
    },
    // ... 2-4 条
  ],

  // 方法论边界说明
  methodologyNotes: '<该赛道的卡口筛选总结，哪些环节有/无卡口，为什么>'
}
```

## 内容质量标准（所有赛道必须达标）

评判"一个赛道内容是否合格"的 8 条硬标准。新增/优化赛道时**必须**逐条对照自检，不达标不得注入网站。

### S1 宏观完整
`overview` 恰 **8-9 卡**（黄金范例 `CHAINS.pcb` 用 8 卡；如赛道有特殊细分/对标/风险维度可酌情加 1 张至 9 张）。必含：①全球市场规模+增速 ②本土全球占比 ③核心需求驱动 ④产业周期阶段 ⑤核心矛盾/卡脖子点 ⑥关键环节国产化率 ⑦下一代技术/大客户催化 ⑧最具弹性的高端细分市场。每卡数据标来源（Prismark/SEMI/券商名/公司公告/CPCA 等）+ 时点。所有赛道产出必须与 PCB 黄金范例字段密度对齐。

### S2 全景五列
`treeMap` 五列齐全（**列名与 PCB 黄金范例完全一致**）：下游(需求) / 中游(制造) / 上游材料 / 上游设备 / 侧枝。**不缺列、不重命名**。每列 ≥2 个 sub-card。

### S3 分支占比
每个 sub-card 的 `note` 必含该环节的占比/规模数字 + 来源：
- 下游按应用占比（例：AI 服务器 40%）
- 中游按产品占比（例：AI 服务器 PCB 占中游 30-40%）
- 上游材料按占 CCL/PCB 成本占比（例：电子树脂占 CCL 26%）
- 上游设备按占设备投资占比（例：钻孔+曝光占 PCB 设备 ~37%）
- 侧枝按占整体规模占比（例：ABF 载板占 PCB 高端 5-8%）

占比之和逻辑自洽（下游 100% / 中游 100% / 上游材料成本占比与 CCL 100% 对账）。

### S4 个股密度（与 PCB 黄金范例对齐）
- `segments` 数量 **≥ 6 个环节**（黄金范例 `CHAINS.pcb` 用 6 环节）
- 每个 `segments[].stocks` **≥ 5 家**（pcb 多数环节 6-9 家）
- `midstream.stocks` **≥ 10 家**（pcb midstream 10 家）
- 标的须真实相关、不凑数（A 股直接标的实在不够时，可在 `globalLandscape` 列海外参照）

### S5 市占率/定位 + 可核查逻辑
- 每个 `stock.position` 必含**全球或国内市占率或排名**这一硬定位（例：'PCB 钻针全球第一 26.5%' / '英伟达显卡 PCB ~50%' / 'M9 大陆唯一认证'），而非空泛形容词（'国内龙头'、'老牌厂商' 这种不算）。
- 每个 `stock.logic` 必须含**可核查依据**（具体数据 / 财报数字 / 出处），不是空泛判断（"业绩高增"/"卡位龙头" 单独出现不构成 logic 主体，必须配数字+原因）。

### S6 壁垒排序
- `segments` 之间按**卡口强度/壁垒**排（卡口环节靠前）
- 每个 segment 内 stocks 与 midstream.stocks 一律按 `barrier`（极高 → 高 → 中 → 低）降序，`rank` 字段对应
- barrier 四档判定标准：
  - **extreme 极高**：全球能量产 ≤3 家且认证周期 >18 月 / 有卡脖子原料
  - **high 高**：全球 4~6 家寡头 / 国产刚突破 / 高认证壁垒
  - **mid 中**：车规等中等认证 / 规模成本主导
  - **low 低**：充分竞争、可快速切换

### S7 进步/退步（结构化 trend 字段 + 彩色徽章）
每个 `stock` 用结构化字段标注趋势，**渲染器自动生成彩色徽章**（绿/红/灰）：

```javascript
{ rank:1, name:'东材科技', code:'601208', barrier:'极高',
  trend:'up',           // 'up' | 'down' | 'flat'（缺省=不显示徽章）
  trendNote:'Q1+103%·台光排他',  // 可选·用于 title 悬浮提示（≤15字）
  logic:'<mark>...', ... }
```

渲染实现：`renderChain` 顶部内置 `trendBadge(t, note)` 函数，复用现成 `.tag .tg-green/.tg-extreme/.tg-gray` 三色，**零 CSS 增量**。在 3 处 `<td class="s-name">${s.name}</td>` 锚点注入 `${trendBadge(s.trend, s.trendNote)}`：
- segments 主表（带四问命中列那张）
- segments 备用表（`<h4>A股标的</h4>` 段）
- midstream 表

树状图 mini 表（`tree-sub-mini-tbl`）空间太小，**本次不加徽章**。

判定参考：
- **up**：份额提升 / 新认证通过 / 高端产能放量 / 业绩高增 / AI 卡位增强
- **down**：掉队 / AI 暴露低 / 被替代风险 / 扩产阵痛压制利润
- **flat**：维持现状
- 拿不准的标的**留空**（不填 trend）→ 自动不显示徽章，零影响

### S8 卡口方法论
- 保留物理卡口四问（供给寡头/产能周期/替代缺位/下游刚需）
- 卡口标的填 `hits: 0-4` + `strength: '★★★'|'★★☆'`
- 非卡口填 `hits: null, strength: null`
- 核心卡口在 `chokePoints` 配齐 **3 大卡口**（★★★/★★★/★★☆ 至少 1 个 ★★★）+ `tags / valuation(pePercentile 必填) / verification(4 项可核查清单，每项含 howToCheck + falsifySignal)`
- `supplyGap` 给出 2-4 条供需缺口

### S9 数据时效（最新财报 + 来源标注）
- 关键数据**尽量带最近一期财报**（如 2026Q1 营收/净利/同比），用 `<mark class="updated">最新值</mark>` 标注
- 关键数据**必标来源+时点**（Prismark 2026Q1 / SEMI 2026.6 / 某券商 2026-05-20 / 公司公告 2026-04-28 等）
- **AI 估算**（如估值分位、周期位置、卡口强度）必标 🆪，**不刷顶部"数据截止"日期**
- 旧数据（>1 年）若仍引用必须 `<mark class="outdated">` 标注

### S10 研究与准确性纪律
- **广泛多源检索**：每个环节 ≥5 次独立 WebSearch，覆盖产业格局/全球寡头/A 股标的/财报/认证进展
- **关键数据 ≥2-3 独立信源交叉验证**：单一来源不采信
- **只摘事实数据**：数字/事实/出处/时点；不输出主观情绪、不预测股价
- **严禁复制研报/文章原文**（版权红线）—— logic / plainIntro / methodologyNotes 全部 100% 自写，可参考思路但不可抄写表述
- **来源等效参考研报 ≥200 篇**（用 WebSearch 多轮覆盖，不下载全文）

### 通用约束
- 面向用户文案**中文**，技术标识符（赛道 id、CSS class、JS 函数名）**英文小写连字符**
- 底部免责声明保留
- AI 主观判断（周期位置 / 估值分位）标 🆪，**不刷顶部"数据截止"日期**
- 不预填交易日志示例
- **所有赛道产出必须与黄金范例 `CHAINS.pcb` 字段密度+结构对齐**（S1-S10 全套硬标准）

## 网站文件结构

`产业链全景.html` 是一个单文件 Web 应用：

```
HTML 框架
├─ <style>  — 全局 CSS（深色主题，1400px桌面端）
├─ <header> — 标题 + 方法论标签
├─ <div class="sector-tabs"> — Tab 切换栏
├─ <div id="chain-content"> — 动态内容容器（JS渲染）
├─ <div class="footer"> — 免责声明
└─ <script>
    ├─ CHAINS.pcb    — PCB 产业链数据
    ├─ CHAINS.semi   — 半导体产业链数据
    ├─ CHAINS.xxx    — 未来新赛道在此追加
    ├─ renderChain() — 渲染引擎（6个子函数）
    ├─ switchChain() — Tab 切换
    └─ init()        — 页面初始化 + URL hash 路由
```

**CSS 无需改动**，新增赛道只需：
1. 在 JS 数据区添加 `CHAINS.<id> = { ... };`
2. 在 Tab 栏添加 `<div class="tab" ...>`

## 已有赛道

| 赛道 ID | 名称 | 卡口标的 | 状态 |
|---------|------|---------|------|
| `pcb` | PCB 印制电路板 | 东材科技/菲利华/铜冠铜箔 | ✅ 完整 |
| `semi` | 半导体 | 华大九天/北方华创/南大光电 | ✅ 完整 |
| `cpo` | CPO 共封装光学 | （待研究） | 🔜 即将上线 |
| `robot` | 人形机器人 | （待研究） | 🔜 即将上线 |

## 注意事项

- **数据精度**：每个环节 ≥5 次独立 WebSearch，交叉验证关键数据。数据等效参考研报 ≥200 篇。
- **数据来源标注**：关键数据注明来源（Prismark/SEMI/券商名/公司公告等）
- **免责必须**：所有页面底部保留免责声明
- **风险提示**：不构成投资建议，市场有风险
- **个股排序**：每个环节的标的严格按壁垒高低排序（极高→高→中）
- **保持中文**：所有面向用户的内容用中文，技术术语保留英文
- **先确认再注入**：向网站注入新赛道前，先展示研究摘要给用户确认

## 相关文件

| 文件 | 说明 |
|------|------|
| `产业链全景.html` | 主网站文件（根目录） |
| `.claude/skills/serenity/SKILL.md` | 本 Skill 文档 |
| `.claude/workflows/serenity-choke-point.js` | 六步下钻工作流脚本 |
| `sector_research/docs/serenity-choke-point-methodology.md` | 方法论详细文档 |
| `sector_research/output/serenity_demo.html` | 早期 Demo 版本（已迁移到根目录） |

## 数据周度自动更新

### 触发方式

已设置 cron 定时任务：**每周一上午 9:07** 自动执行数据刷新。

手动触发更新：`/serenity --update`

### 更新流程

1. **搜索最新数据** — 对每个赛道（PCB/半导体等）WebSearch 搜索：
   - 宏观数据：市场规模、国产化率、增长率
   - 个股业绩：最新季度营收/净利润/同比增速
   - 重大事件：认证进展、产能投产、大客户变化

2. **对比变化** — 与页面现有数据对比：
   - 变化 <5%：不更新（避免无意义刷新）
   - 变化 5-15%：静默更新数字
   - 变化 >15%：**高亮标记** `<mark class="updated">` + 变化幅度徽章
   - 基本面重大变化：**整行高亮** `class="major-change"` + 追加说明

3. **高亮样式标准**：
   - 数据值变化 >15%：`<mark class="updated">新值</mark><sup class="change-badge up">📈+XX%</sup>`
   - 数据值下跌 >15%：`<sup class="change-badge down">📉-XX%</sup>`
   - 个股基本面重大变化（认证/产能/客户）：`<tr class="major-change">` + 逻辑列追加 `⚡【更新：XXX】`
   - 高亮保留一周，下周更新时去除旧高亮再加新高亮

4. **更新日期** — 页面顶部数据截止日期改为当天

5. **提交推送** — git commit + push

### Token 参考

| 更新类型 | Token | 耗时 |
|---------|-------|------|
| 2个赛道月度刷新 | ~5万-8万 | ~5分钟 |
| 30个赛道月度刷新（未来） | ~10万-15万 | ~10分钟 |

### Cron 续期

cron 任务 7 天后自动过期。如需长期运行，每次更新完成后自动重建 cron。

## 决策卡片库（升级四，localStorage 业务层）

**不在 CHAINS 数据里**，是 localStorage 业务层（key: `myCards`）。详见 [index.html] 的 `loadCards / saveCards / addToDecisionCard / renderCards` 等业务函数。

数据结构（每张决策卡）：
- **自动从 choke-card 带入**（一键建卡时）：`chain / chainName / code / name / segment / strength / logic / tags / valuation / verification`
- **用户必填**：`whyWatch / grade / buyLogic / sellConditions / trackSignals / chokeBreakSignal`
- **系统自动维护**：`id / status / createdAt / updatedAt / reviews[]`
- **status 枚举**：`'watching'` 观察中 / `'holding'` 持仓中 / `'closed'` 已结案
- **完成度计算**：4 阶段（关注理由 / 卡口强度 / 估值判断 / 买卖逻辑对），已填即算"完成"，显示 `X/4` 进度

路由：
- 侧栏入口 `data-chain="cards"`，点击后 `window.location.hash = 'cards'`
- `route()` 函数分发：`#cards` → `renderCards()`；其他 → `switchChain(...)`
- 升级五预留 `LS_KEYS.trades = 'myTrades'` 和 hash 路由 `#trades` 的 guard，不需要再动路由代码

## 交易日志（升级五，localStorage 业务层）

**不在 CHAINS 数据里**，是 localStorage 业务层（key: `myTrades`）。详见 [index.html] 的 `loadTrades / saveTrades / addTrade / removeTrade / renderTrades` 等业务函数。

数据结构（每笔交易）：
- **核心**：`date / side / price / qty / amount / followedPlan`
- **可选**：`cardId / cardName / breakReason / note`
- **系统自动维护**：`id / createdAt`
- **side 枚举**：`'buy'` 买入 / `'sell'` 卖出
- **followedPlan 强制约束**：false 时 `breakReason` 必填（前端 alert 拦截）
- **统计字段**：从所有交易推导 `disciplined / impulse / discRate / impRate`

路由（升级四已预留，升级五打开）：
- 侧栏 `data-chain="trades"`，点击后 `window.location.hash = 'trades'`
- `route()` 函数分发：`#trades` → `renderTrades()`
- `switchChain` guard 已包含 `trades` 分支

**不预填示例**：交易是真金白银的记录，**不**给占位数据；首次进入空状态 + 提示"去决策卡片库关联"是正确选择。

## 自定义赛道（升级六，侧栏搜索 + "+"占位）

**不在 CHAINS 静态数据里**，是 localStorage 业务层（key: `myCustomChains`）。详见 [index.html] 的 `getPCBTemplate / loadCustomChains / saveCustomChains / addCustomChain / removeCustomChain / loadAllCustomChains / filterSidebar` 业务函数。

**用途**：用户搜索框输入赛道名 → 点"+"或回车 → 复制 PCB 完整结构（plainIntro / overview×8 / treeMap / segments×3 / fourQuestions / chokePoints×2 / supplyGap / methodologyNotes 全部保留，值清空为 `—` / `（待填写）`）→ 注入 `CHAINS[id]` → 插入 nav-list PCB 下方 → 跳转新赛道。**加完后用户回来说"我刚加了 XX，把数据填上"——再走研究流程把空模板填成真数据**。

数据结构（每条 custom 链）：
- **自动生成**：`id`（`custom_<name>_<ts>`）/ `name` / `icon: '📊'` / `_isCustom: true` / `_createdAt`
- **PCB 模板骨架**：所有 section 字段保留，值统一 `—` / `（待填写）` / `[]` / `null`
- **localStorage 存储**：每次 `addCustomChain` / `removeCustomChain` 都写 LS

路由（无需新加 — 走 `switchChain` → `CHAINS[hash]`）：
- 侧栏 nav-item `data-chain="<custom_id>"`，`onclick="switchChain('<custom_id>')"`
- `route()` 检测 `CHAINS[hash]` 存在 → 直接进 `switchChain`（无需 guard）
- `loadAllCustomChains()` 在 `init()` 开头调一次，把 LS 里的 custom 链复活（reload 不丢）

侧栏搜索 `filterSidebar(query)`：
- 键入即过滤 nav-list（不匹配项 `display:none`）
- 分隔行 `━ 整合视图` / `━ 我的决策` 在搜索时整组隐藏（不显示半空分组）
- 清空搜索框 → 全部恢复显示

**诚实声明**：
- 搜索加载出来的 custom 链**不是真研究**，是 PCB 结构的空模板（值是 `—` / `（待填写）`）
- 真正能用于投资决策的数据 = 我研究后填满的链
- 加完 custom 链后**回来说"我刚加了 XX，把数据填上"**——我才会用研究流程填数据

