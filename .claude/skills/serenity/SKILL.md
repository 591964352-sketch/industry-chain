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

用户说以下任意一句即可触发：
- "加入 XX 产业链"
- "添加 XX 赛道"
- "研究 XX 行业"
- "/serenity --add <赛道名>"

**执行流程**：

1. **深度搜索** — 用 WebSearch 对目标产业链做多轮搜索：
   - 产业链全景结构（上游→中游→下游，各环节格局）
   - 上游核心壁垒环节（材料/设备/元器件，国产化率）
   - 每个壁垒环节的全球寡头格局（谁垄断？几家能量产？）
   - 每个环节的 A 股标的（名称+代码+壁垒评级+核心逻辑）
   - 下游需求测算（龙头放量节奏、单台用量、缺口计算）

2. **四问筛选** — 对每个标的套四大追问，标注 ★★★/★★☆/不通过

3. **数据结构化** — 将研究结果整理为 JS 对象，格式见下方"数据模板"

4. **注入网站** — 用 Edit 工具操作 `产业链全景.html`：
   - 在 `// ==================== CHAINS ====================` 区域末尾插入 `CHAINS.xxx = { ... };`
   - 在 Tab 栏添加 `<div class="tab" data-chain="xxx" onclick="switchChain('xxx')">🆕 赛道名</div>`
   - 将新的 "coming" Tab 改为活跃状态

5. **验证** — 浏览器打开确认 Tab 切换正常、数据完整

### 模式 2：仅研究（不更新网站）

- `/serenity --sector <赛道名>` — 运行完整六步下钻研究
- `/workflow serenity-choke-point --args '{ "sector": "xxx", "leader": "xxx" }'` — 直接调 workflow

## 数据模板

以下为 `CHAINS.xxx` 的完整数据结构。添加新产业链时必须按此格式整理数据。

```javascript
CHAINS.<id> = {
  id: '<id>',           // 唯一标识，如 'cpo', 'robot'
  name: '<中文名>',      // 如 'CPO 共封装光学'
  icon: '<emoji>',       // Tab 图标

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
  treeMap: {
    downstream: { name: '下游描述', barrier: 'low', note: '补充说明' },
    midstream: { name: '中游描述', barrier: 'low', note: '补充说明' },
    // 可选：upstreamCCL（PCB特色，有中间基材层时使用）
    // 可选：upstreamTools（半导体特色，有EDA等设计工具层时使用）
    materials: [
      { name: '材料/环节名', barrier: 'extreme'|'high'|'mid'|'low', choke: true|false, note: '说明' },
      // ... 4-6 个上游环节
    ],
    equipment: [  // 可选：有设备分支时使用
      { name: '设备名', barrier: 'extreme'|'high'|'mid', choke: false, note: '说明' },
    ],
    sideBranches: [  // 可选：产业链侧枝
      { name: '分支名', barrier: 'high'|'mid', note: '说明' },
    ]
  },

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
      tags: ['标签1', '标签2', '标签3', '标签4']
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
