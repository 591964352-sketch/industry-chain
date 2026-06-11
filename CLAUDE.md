# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库工作时提供指引。

## 仓库是什么

一个单文件静态 HTML 投研网站，承载 **Serenity 物理卡口（Choke Point）** 方法论 —— 对 A 股产业链（PCB、半导体、HBM、人形机器人、CPO 等）做拆解，挖出 ★★★/★★☆ 的"卡口"标的。**无构建系统、无包管理器、无依赖。** 浏览器直接打开 HTML 即可；所有 CSS 和 JS 都内联在文件里。

仓库里**没有测试套件、没有 lint、没有 CI**。"构建" = 保存文件；"运行" = 浏览器打开。

## 三个 HTML 文件 —— 各自的角色

| 文件 | 角色 |
|------|------|
| [index.html](index.html) | 主站，GitHub Pages 默认入口 |
| [产业链全景.html](产业链全景.html) | **与 `index.html` 字节级镜像一致**，保留中文 URL |
| [PCB产业链全景.html](PCB产业链全景.html) | 早期 PCB-only 独立页面，主站不再链接它，没明确要求别动 |

**关键不变式：** `index.html` 和 `产业链全景.html` 必须保持字节级完全一致。最近的 commit 历史里能看到它俩跑偏过（参见 `f1ff548 同步 index.html`）—— 任何编辑必须**同一个 commit 内**同步到两个文件。提交前用 `diff -q index.html 产业链全景.html` 验证。

## `index.html` 的架构

单页应用，三层结构叠在同一个文件里：

1. **`<style>`** —— 全局 CSS，深色主题，固定侧栏 + flex 主区。两个 media query：`@media (max-width: 900px)` 和 `@media (max-width: 480px)`。
2. **`<body>`** —— 静态侧栏导航（`<div class="sidebar-nav" id="nav-list">`）、Header、空的 `#chain-content` 容器、右侧浮动变更面板、底部免责。
3. **`<script>`** —— 数据 + 渲染 + 路由 + 业务逻辑（行 285 起，约 3050+ 行）。

### 路由：3 类视图 + 1 个 hash 分发器

- **赛道视图**（`#pcb` / `#semi` / ... 共 12 个 + `#ai-full-chain`）→ `switchChain(chainId)` → `renderChain(chainId)`
- **决策卡片库**（`#cards`）→ `renderCards()`
- **交易日志**（`#trades`）→ `renderTrades()`

**`route()` 函数**（script 末尾）统一读 `window.location.hash` 分发到上面 3 类。`switchChain` 函数顶有 guard `if (chainId === 'cards' || chainId === 'trades')` —— **绕开 CHAINS lookup**，否则 `CHAINS['cards']` 是 undefined、renderChain 静默 return。

侧栏 nav-item 的 `onclick` 用 `window.location.hash='xxx'` 触发 hashchange → `route()`。**不要**用 `switchChain('cards')`，会被 guard 接住但 nav 高亮会错位。

### 三个数据 / 业务层

| 层 | 存储 | 入口函数 | 渲染函数 |
|---|---|---|---|
| **CHAINS 赛道数据** | 静态 JS 对象 | `CHAINS[id]` | `renderChain(id)` |
| **决策卡片库** | localStorage `myCards` 数组 | `loadCards/saveCards/addToDecisionCard/...` | `renderCards()` |
| **交易日志** | localStorage `myTrades` 数组 | `loadTrades/saveTrades/addTrade/...` | `renderTrades()` |

localStorage 助手 (`LS.get/set`) + key 字典 (`LS_KEYS.verify/cards/trades`) 集中在 script 顶部。

### 5 项升级的字段 + 渲染位置

| 升级 | commit | CHAINS 字段位置 | 渲染位置 | localStorage key |
|---|---|---|---|---|
| 卡口验证 | `44a41c3` | `chokePoints[i].verification` | choke-card 底部折叠区 | `verify_<chainId>_<code>` |
| 估值/择时条 | `2eb8f8f` | `chokePoints[i].valuation` | choke-card logic 下方 | — |
| 周期位置 | `0f773a2` | `CHAINS[id].cyclePosition` | 「① 赛道概览」末尾独立 .card | — |
| 决策卡片库 | `ca5de6d` | — | `#cards` 独立视图 | `myCards` |
| 交易日志 | `c5685d1` | — | `#trades` 独立视图 | `myTrades` |

完整 schema（包含所有可选字段）见 [.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md#数据模板)。

### 新增/编辑赛道的数据流

新增赛道 `xxx` 必须按顺序改**三处**：

1. 在合适的 `// ==================== <NAME> ====================` 分隔处追加数据块：`CHAINS.xxx = { ... }`。
2. 在 `<div class="sidebar-nav" id="nav-list">` 里添加 `<span class="nav-item" data-chain="xxx" onclick="switchChain('xxx')">…</span>`。**侧栏里的顺序就是用户看到的顺序。** 注意末尾 "━ 我的决策" / "━ 整合视图" 分隔行不要破坏。
3. 如果要让用户看到这次更新，往 `CHANGELOG` 前面插一条今日日期的记录 —— 之后 7 天它会出现在浮动面板里。`sector` 取赛道 id 或 `'system'`（系统级变更）。`sectorName` / `sectorColor` 三元映射（`renderChangelog` 内）需要把新 id 加进去。

漏掉第 2 步 → 赛道除了 URL hash 之外不可达；漏掉第 3 步 → 用户感知不到变化。

### `ai-full-chain` 是特殊的"元赛道"

`CHAINS['ai-full-chain']` **不是**普通赛道，而是横跨所有 AI 相关赛道的"整合视图"。`renderChain` 针对它独有的两个可选字段做了分支：

- `socraticInquiry` → 渲染 Section ⓪「苏格拉底六问」。**只要它存在，后续所有 section 序号整体向后挪一位**（`hasSocratic` 标志）。
- `occamRazor` → 渲染 Section ④「奥卡姆剃刀」。

如果照搬这个赛道的结构去做新赛道，会继承"section 序号偏移"的副作用。**只在真的需要这两个 section 时才填这两个字段。**

### 决策卡片示例卡（仅 1 张）

首次访问时 `initDemoCard()` IIFE 会向 `myCards` 数组塞一张**东材占位示例卡**（`id: 'demo_pcb_601208'`），whyWatch / buyLogic / sellConditions 等字段**全标"（占位）"**。**仅用于演示 UI 长啥样，不准用作出入市的实盘依据。** 用户删除后再访问不会再出现。

### 交易日志：不预填任何示例

**永远不**给交易日志预填占位数据 —— 交易是真金白银的记录，"示例买入 100 股 @50 元"可能被误当真 → 实盘下单亏损风险。空状态 + 提示"去决策卡片库关联"是正确选择。

## 常用命令

```bash
# 提交前：验证两个主 HTML 仍然同步（应无输出）
diff -q index.html 产业链全景.html

# 提交后：推到 origin（GitHub Pages 才能拿到最新版本）
git push

# 提交前：JS 语法粗检（避免低级语法错）
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const m=html.match(/<script>([\s\S]+)<\/script>/);try{new Function(m[1]);console.log('OK',m[1].length,'chars');}catch(e){console.log('ERR',e.message);}"

# 本地预览
py -m http.server 8000   # 浏览器开 http://localhost:8000/index.html
```

**没有依赖要装、没有构建要跑、没有测试要执行。**

## Serenity Skill —— 主要的操作入口

[.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md) 是本仓库的操作手册，已经作为可调用 skill (`serenity`) 注册。它涵盖：

- **四大物理追问**（供给寡头 / 产能周期 / 替代缺位 / 下游刚需）—— 每个标的的卡口评级标准。
- `CHAINS.<id>` 的完整 schema（plainIntro / overview / treeMap / segments / midstream? / fourQuestions / chokePoints / supplyGap / methodologyNotes / **verification** / **valuation** / **cyclePosition**）。
- 决策卡片库（`myCards`）和交易日志（`myTrades`）的 localStorage 业务层说明。
- 周度自动更新协议（cron 每周一 09:07；变化 >15% 加 `<mark class="updated">` + `<sup class="change-badge">` 徽章；基本面重大变化加 `<tr class="major-change">`；高亮保留一周后滚出）。

用户要加赛道、刷新数据、研究产业链时，**调用 `serenity` skill 而不是临场发挥** —— skill 给出的数据 schema 必须与 `renderChain` / `renderCards` / `renderTrades` 期望的字段对得上。

## 约定

- 所有面向用户的文案用简体中文，技术标识符（赛道 id、CSS class、JS 函数名）保持英文小写连字符。
- 每个 segment 里的标的严格按 `barrier` 降序排列（极高 → 高 → 中）。
- 页面底部"不构成投资建议"免责声明必须保留，不要删。
- Header 上的"数据截止：YYYY-MM-DD"由周度 cron 维护 —— **只有真实数据/财报/扩产等硬变化才刷**，AI 估值/周期位置这种"主观判断"标 🆪 即可、**不刷日期**。
- 仓库的 commit message 都用中文，描述**内容**层面的变化（改了哪些赛道、哪些字段），不是机械的"修改了文件"。
- 5 项升级的 CHANGELOG 条目用 `🆕`（稳定功能）；AI 估值/周期位置等"AI 估的"字段用 `🆪`（区别 `🆕` 真实功能，周一 cron 会覆盖）。
- 任何新功能**先复用现有 .tag / .choke-card / .card / .stock-tbl / `var(--*)` 调色板**；非要新加 CSS 类，**append** 到主结构后面、不改既有定义；`</style>` 之前所有行号都会随升级漂移，**改时用 grep 重新定位、不依赖记忆**。

## 用户的"按顺序做事"铁律

- 一次只做一个升级，**严格按用户给的"做什么"原文执行**，不替用户决定范围
- 改之前确认天然还原点（`git status` 干净 + HEAD 是稳定 commit），`git reset --hard HEAD` 兜底
- 改完**只报告改了哪里 + 验证清单**，不主动 commit
- 等用户**显式说"通过"** 才 commit；不主动开启下一项
- 每次开新升级**重写 plan 文件**（沿用 `C:\Users\Administrator\.claude\plans\app-buzzing-pond.md`），不要在老 plan 上小修小补
