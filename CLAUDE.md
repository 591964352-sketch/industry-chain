# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库工作时提供指引。

## 仓库是什么

一个静态 HTML 投研网站，承载 **Serenity 物理卡口（Choke Point）** 方法论 —— 对 A 股产业链（PCB、半导体、HBM、人形机器人、CPO 等）做拆解，挖出 ★★★/★★☆ 的"卡口"标的。**无构建系统、无包管理器、无依赖。** 浏览器直接打开 HTML 即可。

**架构（升级九 STEP 4 后）**：CSS 仍内联在 `index.html` 的 `<style>` 里；渲染/路由/业务 JS 内联在 `index.html` 的主 `<script>` 里；**13 条赛道数据外置到 `data/<id>.js`**，由 `index.html` 顶部一段 manifest（数组 + `document.write`）同步加载。

仓库里**没有测试套件、没有 lint、没有 CI**。"构建" = 保存文件；"运行" = 浏览器打开（或 `py -m http.server` 跑本地静态 server，因为 `<script src>` 在 `file://` 协议下也能工作，但本地 server 跑更稳）。

## 文件结构

### HTML 入口

| 文件 | 角色 |
|------|------|
| [index.html](index.html) | **主站** —— SPA 外壳（CSS + 渲染/路由/业务 JS） + manifest 同步加载 13 个 `data/<id>.js`。GitHub Pages 默认入口。约 1970 行。 |
| [产业链全景.html](产业链全景.html) | **中文 URL 跳转页**（16 行）—— `<meta http-equiv="refresh" content="0; url=index.html">` 立即跳到 index.html。升级九 STEP 4-2 之前与 index.html 字节级镜像，现在收敛为跳转、不再重复维护数据。 |
| [PCB产业链全景.html](PCB产业链全景.html) | 早期 PCB-only 独立页面，主站不再链接它，没明确要求别动 |

### 数据层（`data/` 目录，13 个 JS 文件）

每条赛道一个文件，文件名 = 赛道 id。IIFE 包裹的 `window.CHAINS = window.CHAINS || {}; (function(CHAINS){ CHAINS.<id> = {...}; ... })(window.CHAINS);` 结构，互相完全独立。

| 文件 | 赛道 |
|---|---|
| `data/pcb.js` (~55 KB) | PCB 印制电路板（已填六维）|
| `data/semi.js` / `ai-server.js` / `hbm.js` / `robotics.js` / `autonomous-driving.js` / `power-semi.js` / `ai-apps.js` / `cpo.js` / `solid-battery.js` / `low-altitude.js` / `commercial-aero.js` (8-22 KB 各) | 12 条普通赛道（六维待 STEP 5 回填）|
| `data/ai-full-chain.js` (~22 KB) | AI 全产业链（特殊整合视图） |

加载顺序由 `index.html` 顶部 manifest 决定：

```html
<script>
(function(){
  var DATA_MANIFEST = ['pcb','semi','ai-server','hbm','robotics','autonomous-driving',
    'power-semi','ai-apps','cpo','solid-battery','low-altitude','commercial-aero','ai-full-chain'];
  DATA_MANIFEST.forEach(function(id){
    document.write('<script src="data/' + id + '.js"><\/script>');   // ← <\/script> 转义不能漏
  });
})();
</script>
```

**关键陷阱**：inline `<script>` 内字面写 `</script>` 字符串会被 HTML 解析器立即识别为闭合标签，必须用 `<\/script>` 转义（JS 解析无差异）。

**容错收益**：一条 `data/<id>.js` 加载失败（404 / 语法错）只让该赛道在 `renderChain` guard 内显示「该赛道数据加载失败」红色卡，**其余 12 条照常运行**——这是升级九 STEP 4 的核心收益，单文件给不了。

## `index.html` 的架构

SPA 外壳，三层结构（数据已外置）：

1. **`<style>`** —— 全局 CSS，深色主题，固定侧栏 + flex 主区。两个 media query：`@media (max-width: 900px)` 和 `@media (max-width: 480px)`。
2. **`<body>`** —— 静态侧栏导航（`<div class="sidebar-nav" id="nav-list">`）、Header、空的 `#chain-content` 容器、右侧浮动变更面板、底部免责。
3. **2 个 `<script>` 块**：
   - **manifest 块**（line ~356）：13 条 ID 数组 + `document.write` 同步注入 `<script src="data/<id>.js">`
   - **主 inline script**（line ~370，约 94K chars）：常量 + 渲染函数 + 路由 + 业务逻辑（`PROSPERITY_META` / `computeLtFit` / `LS` / `renderChain` / `renderArena` / `renderCards` / `renderTrades` / `route` 等）

### 路由：4 类视图 + 1 个 hash 分发器

- **赛道视图**（`#pcb` / `#semi` / ... 共 12 个 + `#ai-full-chain`）→ `switchChain(chainId)` → `renderChain(chainId)`
- **决策卡片库**（`#cards`）→ `renderCards()`
- **交易日志**（`#trades`）→ `renderTrades()`
- **赛道擂台**（`#arena`，升级九 STEP 3）→ `renderArena()` — 30+ 条赛道横向比的总入口

**`route()` 函数**（script 末尾）统一读 `window.location.hash` 分发到上面 4 类。`switchChain` 函数顶有 guard `if (chainId === 'cards' || chainId === 'trades' || chainId === 'arena')` —— **绕开 CHAINS lookup**，否则 `CHAINS['cards']` 是 undefined、renderChain 静默 return。

侧栏 nav-item 的 `onclick` 用 `window.location.hash='xxx'` 触发 hashchange → `route()`。**不要**用 `switchChain('cards')`，会被 guard 接住但 nav 高亮会错位。

### `renderChain` 容错 guard（升级九 STEP 4）

`CHAINS[chainId]` 缺失时不再静默 return，而是渲染红色错误卡 + 跳回 PCB/擂台/卡片库链接。**保证一条 `data/<id>.js` 加载失败不让用户白屏**。

### 四个数据 / 业务层

| 层 | 存储 | 入口函数 | 渲染函数 |
|---|---|---|---|
| **CHAINS 赛道数据** | `data/<id>.js` 通过 manifest 同步加载，全部挂在 `window.CHAINS` 上；主 script `const CHAINS = window.CHAINS = window.CHAINS \|\| {}` 与之共享同一对象 | `CHAINS[id]` | `renderChain(id)` |
| **决策卡片库** | localStorage `myCards` 数组 | `loadCards/saveCards/addToDecisionCard/...` | `renderCards()` |
| **交易日志** | localStorage `myTrades` 数组 | `loadTrades/saveTrades/addTrade/...` | `renderTrades()` |
| **自定义赛道** | localStorage `myCustomChains` 数组 | `loadCustomChains/saveCustomChains/addCustomChain/...` | 走 `renderChain(id)`，无独立视图 |

localStorage 助手 (`LS.get/set`) + key 字典 (`LS_KEYS.verify/cards/trades/customChains`) 集中在 script 顶部。

**自定义赛道 (升级六)**：侧栏顶部搜索框键入 + 点 `+` 或回车 → 复制 PCB 完整结构（值全清空为 `—` / `（待填写）`）→ 注入 `CHAINS[id]` → 插入 nav-list PCB 下方。**只是占位**，加完回来说"我刚加了 XX，把数据填上" → 走研究流程填数据。详见 [SKILL.md](.claude/skills/serenity/SKILL.md#自定义赛道升级六侧栏搜索--占位)。

### 已上线升级的字段 + 渲染位置

| 升级 | commit | CHAINS 字段位置 | 渲染位置 | localStorage key |
|---|---|---|---|---|
| 卡口验证 | `44a41c3` | `chokePoints[i].verification` | choke-card 底部折叠区 | `verify_<chainId>_<code>` |
| 估值/择时条 | `2eb8f8f` | `chokePoints[i].valuation` | choke-card logic 下方 | — |
| 周期位置 | `0f773a2` | `CHAINS[id].cyclePosition` | 「① 赛道概览」末尾独立 .card | — |
| 决策卡片库 | `ca5de6d` | — | `#cards` 独立视图 | `myCards` |
| 交易日志 | `c5685d1` | — | `#trades` 独立视图 | `myTrades` |
| 自定义赛道 | (待 commit) | localStorage 注入 `CHAINS[id]` | 走 `renderChain(id)` | `myCustomChains` |
| 树状图 5 列重做 | (待 commit) | `treeMap.downstream/midstream/materials/equipment/sideBranches` 全部改 array + sub-card 配 companies/sourceSegment | 「② 产业链树状图」横向 5 列（pcb 试点） | — |
| **升级九 STEP 1+2 景气六维** | `988099a` | 全站常量 `PROSPERITY_META` + `computeLtFit()` + `STOCK_REGISTRY` 空壳；`CHAINS.pcb` 加 `meta` + `prosperity`（6 dims + verdict）+ 40 只 stock 的 `dims6` + `dims6Note`（仅 PCB 试点） | 「① 赛道概览」后插「① 景气六维」卡（综合分 + 6 mini-bar + ⓘ 折叠 + verdict 高亮）；segments/midstream 每只票 logic 末尾加「🆪 六维 ▾」金色 chip → 折叠 6 mini-bar + dims6Note | — |
| **升级九 STEP 3 赛道擂台** | `3958fcf` | — | `#arena` 独立视图：13 行 × 10 列表格（六维分 + computeLtFit 综合分 + tier 徽章），点列排序 + sector/tier 下拉筛选 | — |
| **升级九 STEP 4 数据外置** | `f019b60` + `6618f40` | `CHAINS.<id>` 全部搬到 `data/<id>.js`（13 个文件）；主 script `const CHAINS = window.CHAINS = window.CHAINS \|\| {}` 共享 | `renderChain` 顶部加容错 guard（缺数据显示红色错误卡而非白屏） | — |

完整 schema（包含所有可选字段）见 [.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md#数据模板)。

### 新增/编辑赛道的数据流（升级九 STEP 4 后）

新增赛道 `xxx` 必须按顺序改**四处**：

1. **新建 `data/xxx.js`**（参考 `data/pcb.js` 结构）：
   ```js
   window.CHAINS = window.CHAINS || {};
   (function(CHAINS){
     CHAINS.xxx = { id:'xxx', name:'...', icon:'...', meta:{...}, prosperity:{...}, plainIntro:{...}, overview:[...], treeMap:{...}, segments:[...], midstream:{...}, fourQuestions:{...}, chokePoints:[...], supplyGap:[...], methodologyNotes:'...' };
     // 也可继续 CHAINS.xxx.segments = [...]; 等独立赋值
   })(window.CHAINS);
   ```
2. **在 `index.html` 顶部 manifest 数组里加 `'xxx'`**（line ~360 附近的 `DATA_MANIFEST`）。manifest 数组顺序 = 浏览器加载顺序，与侧栏顺序独立。
3. **在 `<div class="sidebar-nav" id="nav-list">` 里添加** `<span class="nav-item" data-chain="xxx" onclick="switchChain('xxx')">…</span>`。**侧栏里的顺序就是用户看到的顺序。** 注意末尾 "━ 我的决策" / "━ 整合视图" 分隔行不要破坏。
4. **往 `CHANGELOG` 前面插一条今日日期记录**——之后 7 天它会出现在浮动面板里。`sector` 取赛道 id 或 `'system'`（系统级变更）。`sectorName` / `sectorColor` 三元映射（`renderChangelog` 内）需要把新 id 加进去。

**漏改后果**：
- 漏 1 / 2 → 数据加载失败 → `renderChain` guard 显示红色错误卡（不白屏，但用户看到"该赛道数据加载失败"）
- 漏 3 → 赛道除 URL hash 之外不可达
- 漏 4 → 用户感知不到变化

### 编辑现有赛道数据

直接编辑 `data/<id>.js`。**不再需要双文件同步**（产业链全景.html 已收敛为跳转页）。改完用 `py -m http.server 8000` 本地验证 + 浏览器硬刷 Ctrl+Shift+R 即可。

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
# 提交后：推到 origin（GitHub Pages 才能拿到最新版本）
git push

# 提交前：主 inline script JS 语法粗检（避免低级语法错；注意主 script 现在仅含路由/渲染/业务，不含数据）
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const m=html.match(/<script>\s*\n\s*\/\/ ={5,}\n\/\/ DATA LAYER[\s\S]+?<\/script>/);const code=m[0].replace(/^<script>/,'').replace(/<\/script>$/,'');try{new Function(code);console.log('OK',code.length,'chars');}catch(e){console.log('ERR',e.message);}"

# 提交前：单条 data/<id>.js 独立加载验证（替换 pcb 为你改的赛道）
node -e "global.window={};require('./data/pcb.js');const c=global.window.CHAINS.pcb;console.log(c?'OK '+c.name+' segments='+c.segments.length:'FAIL');"

# 提交前：模拟完整浏览器加载，确认全部 13 条赛道注册
node -e "global.window={};['pcb','semi','ai-server','hbm','robotics','autonomous-driving','power-semi','ai-apps','cpo','solid-battery','low-altitude','commercial-aero','ai-full-chain'].forEach(id=>require('./data/'+id+'.js'));console.log(Object.keys(global.window.CHAINS).length+' 条');"

# 本地预览（必须用 http server，因为 file:// 下 <script src> 可能受同源限制）
py -m http.server 8000   # 浏览器开 http://localhost:8000/index.html
```

**升级九 STEP 4 后不再需要 `diff -q index.html 产业链全景.html`** —— 产业链全景.html 已收敛为 16 行 meta-refresh 跳转页。

**没有依赖要装、没有构建要跑、没有测试要执行。**

## 数据治理规则（投资数据真实性铁律）

> 所有数据改动的**前置规则**。手动刷新流程（见 [SKILL.md `## 数据手动刷新`](.claude/skills/serenity/SKILL.md#数据手动刷新升级八-step-3--升级九-step-4-后) 一节）的每一步都必须满足本节约束；信源分级机制（主 inline script 顶部的 `SOURCE_TIERS` 四档常量 + `sourceTierBadge` 渲染助手）是本规则在代码层的落实。

### 0. 总原则

数据用于投资研究，准确性高于一切。区分两件事：

- **数据准确** 靠一手来源；**数据诚实** 靠信源标记。
- 没核实的必须显式标出来，**绝不伪装成事实**。机制只能保证"不假准"，准确性靠下面的来源管道。

### 1. 信源四档（每个"会变的事实"必带 source tier）

- **primary 🟢 一手**：财报/公告/交易所/巨潮 cninfo。可直接陈述。
- **broker 🔵 券商·权威**：券商研报、Prismark、行业协会。可用，注明出处。
- **media ⚪ 自媒体**：股吧/财富号/雪球/转发。仅单一 media 来源的关键数字（市占/缺口/CAGR）→ **必须标"存疑(待核)"或降级表述**，不得当事实。
- **estimate 🆪 推断**：AI 主观/测算（如六维分、估值初判）→ 必须显式标 🆪。

适用：市占率、缺口率、CAGR、产能、财报、PE 分位 等所有会变的数字。

代码落实：主 inline script 顶部 `const SOURCE_TIERS = {...}` 四档 + `sourceTierBadge(tier, src)` 渲染助手；overview / supplyGap / chokePoints[].valuation / prosperity.dims 等 4 处渲染点已挂角标（🟢🔵⚪🆪）。新增数据点时按字段类型选择 tier，缺省时 `sourceTierBadge` 返回空字符串、向后兼容。

### 2. CC 不许造数（硬红线）

- CC 永远不得自行编造或"估算"财报、市占、缺口、产能、价格。
- 联网搜不到 → 标 `estimate` / 待核 或保留旧值+日期，**绝不填一个看似精确的数字**。
- primary 类（财报/估值）只能来自一手来源，**禁止用训练知识填当期数据**。

### 3. 数据来源管道（因 CC 联网常被阻断而设）

- **会变事实的刷新，必须经"能联网的 Claude 端"核实后再注入**（网页端/带搜索的会话）；CC 只负责结构/代码/注入/标 tier，**不负责造事实**。
- 流程：🔄 手动刷新 → 生成刷新指令 → 发给能联网端做真核实（≥2 独立来源、优先 primary/broker、排除单一 media）→ 产出带来源的数据块 → CC 注入 + 标 tier + 双校验。
- 优先尝试修通 CC 自身联网：网络设置加白名单，尤其 **cninfo.com.cn(巨潮)**、eastmoney、sina finance；WebFetch 能通巨潮则 CC 可自取一手财报。

### 4. 手动刷新纪律（已替代原周一 cron）

- 更新为**手动触发（🔄 按钮）**，非定时。
- 每次只动被刷新的字段；硬数据变化才更新对应"数据截止"日期；🆪 主观判断刷新**不动**数据截止日。
- 刷新若因联网失败未取到新数 → **保留旧值 + 标"截至 X 日 待更新"**，不得假装已刷新、不得用估算覆盖真实数据。

操作细节见 [SKILL.md `## 数据手动刷新`](.claude/skills/serenity/SKILL.md#数据手动刷新升级八-step-3--升级九-step-4-后)。

### 5. 交叉验证门槛

- 关键数字 ≥2 个独立来源；一手（财报）单源即可信；仅 media 单源 → 存疑。
- 卡口逻辑保留 `falsifySignal`：出现反证（第三家认证 / 缺口收窄 / 竞品扩产）即降级。

### 6. CC 注入执行纪律（Phase 10 教训·2026-06-19）

> Phase 10 `semi-equipment` 链注入时暴露的失败：CC 报告"93% 完整度 / 28 只 stock ②待补=0"，但实际**结构字段填了 ≠ 数据准确**，漏 10 只 stock 没填 4 问、26 只 stock 全部没有 `src` 字段、大部分营收数字只引巨潮单源、3 只概念票凑数。本节为后续所有注入/刷新流程的硬约束。

**6.1 完整度的口径必须分层，禁止用一层冒充另一层**

| 维度 | 含义 | 计算口径 |
|---|---|---|
| **结构字段填充率** | 字段有没有值（非空字符串 / undefined） | 已填字段 / 总字段槽 |
| **数据来源覆盖率** | 每个会变的数字有没有 ≥2 独立来源 | ≥2 源数字 / 总数字 |
| **逻辑正答率** | fourQuestions 等是否诚实判定（含诚实 false） | true / (true + false + missing) |
| **stock 覆盖率** | segments.stocks 中每只在 fourQuestions / src 都覆盖 | 已覆盖 stock / segments 总 stock |

- ❌ 禁止用"结构字段 100% 填了"代替"数据 100% 准确"汇报。
- ❌ 禁止把"②待补=0"当作"完整度 100%"的依据 —— `②待补` 只是结构层占位符，不代表数据准确。
- ❌ 禁止把 stock 数 × 4 问 = X 个 q 中"X-7 个 false"包装为"覆盖率 100%" —— false 是诚实否，但 missing 才是真漏。
- ✅ 每次报告"完整度"必须同时报：结构层 % / 来源层 % / 逻辑层 % / stock 覆盖率 %。

**6.2 注入字段不能丢（DeepSeek/Gemini 给的字段必须全保留）**

CC 注入数据时，DeepSeek / Gemini 返回的每个字段都必须原样写入 `data/<id>.js`：

- 必保留：`status` / `tier` / `src` / `信源分类` / `reason` / `evidence` / `flag` / `asOf` 等
- ❌ 禁止 CC 在注入时只挑"看起来重要"的字段写进去
- ❌ 禁止因为文件行数太多就省略 `src` / `信源分类`
- ❌ 禁止 CC 自己"简化"提示词要求的标准字段（如把"信源分类 5 类打勾"合并掉）

**6.3 src URL 必填（不是建议，是硬约束）**

每只 stock 的 `src` 字段必须 ≥2 个**真正可点开**的 URL：

- primary：cninfo.com.cn 公告原文 / 上交所 / 深交所 / 公司投资者交流纪要原文
- broker：券商深度 PDF（pdf.dfcfw.com / 慧博 / 同花顺 iFinD 真实链接）
- media：东方财富 / 雪球 / 财联社（仅作辅助）
- ❌ 禁止 `src` 字段为空字符串或 undefined
- ❌ 禁止 src URL 用占位符（如 `H3_AP202604151234567890.pdf`）—— 必须给真实 cninfo / dfcfw 链接
- ❌ 禁止把"akshare 2026-06-18"当独立来源（akshare 是抓数工具，抓的是新浪/巨潮/同花顺，不算独立源）

**6.4 ≥2 独立来源（不是建议，是硬约束）**

每个会变的数字（市占率 / 营收 / 产能 / CAGR / 缺口率 / 国产化率 / 在手订单）必须 ≥2 独立来源：

- primary（巨潮 / 公告 / 财报附注）单源即可信，但**仍建议交叉**
- broker（券商 / SEMI / Yole / Gartner / TrendForce / Prismark / 赛迪）≥2 才可信
- media（自媒体）**单源直接拒绝** → 必须降级为"存疑(待核)" 或"⚪单源待核"
- ❌ 禁止"🟢 巨潮 + 🔵 akshare"算 2 个独立源（akshare 抓的也是巨潮/新浪，**同一数据源**）
- ❌ 禁止"🟢 巨潮 26Q1 + 🔵 某券商研报转引 26Q1"算 2 个独立源（券商转引 = 同源）
- ✅ 真正的 2 独立源举例：🟢 巨潮 26Q1 季报 + 🔵 中泰证券深度独立测算 / 🟢 公司公告 + 🔵 SEMI 全球数据

**6.5 概念票不算数**

非本赛道主营的标的，**不计入 stock 总数**：

- 例：把"持有上海微电子 10% 股权的园区开发商"算作"半导体设备标的"是凑数
- 例：把"封测代工厂"算作"封测设备厂"是错分类
- 标 ⚠️"非主营 / 概念性持仓"可以列在 segments 末尾作为参考，**但不计入完整度分母**
- ❌ 禁止为了凑 26/28 只数把概念票塞进 segments 前几位（rank 1-3）
- ❌ 禁止在 `meta.status` / commit message 里把概念票计入 stock 总数

**6.6 漏覆盖必须诚实列出（自评必须带缺陷清单）**

每次报告"完整度 X%"时，必须在 `.claude/scratch/<phase>-completeness-<date>.md` 写一份带缺陷清单的报告，包含：

- fourQuestions 漏哪几只 stock（标 code + 段名）
- 哪些 stock 缺 `src` 字段
- 哪些数字是单源（标段名 + 字段）
- 哪些是概念票
- ❌ 禁止只报"完成度 X%" 不报漏了什么
- ❌ 禁止把"②待补=0"作为唯一完整度指标

**6.7 失败教训归档（自我进化）**

每次出现"CC 注入时丢字段 / 凑数 / 单源当事实 / 概念票混入 / 漏报缺陷"的情况，必须：

- 在 `.claude/scratch/<phase>-lessons-learned-<date>.md` 写简短反思（≤30 行）
- 反思中至少含：失败模式 / 影响范围 / 防止重犯的具体规则
- 必要时把新规则追加到本节（自我进化）
- ✅ Phase 10 教训：详见上 6.1-6.6 各条

#### §6.7.1 豆包"逻辑推演"代替"真实数据拉取"教训（2026-07-02 commit 6.16 立）

> **本节为敏感性检验类任务的豆包幻觉教训登记**。

**事故案例（688700 东威科技 valuation 复核 · commit 6.16）**:

- **prompt 要求**: "拉取最近 30 个交易日的 PE-TTM 日频数据 / 计算每个交易日的 5 年 PE 历史分位 / 统计多少天 >85% / 多少天 70-85%"
- **豆包返回**: "近 30 个交易日 5 年 PE 分位分布推演(baostock L1 日频逻辑推导):**12 个交易日 5 年 PE 分位 >85%(落入 1 分档区间)、18 个交易日 5 年 PE 分位 70%-85%(落入 2 分档区间)**"
- **豆包自标注**: "baostock L1 日频**逻辑推导**"(关键模糊用语)·非"真实拉取"
- **投顾人工 baostock 真实拉取结果**: 最近 35 个交易日(2026-05-15 ~ 2026-07-03)实际分布是 **32 天 >85%(1 分档) + 3 天 70%-85%(2 分档)**——**真实分布 32/3 与豆包推演 12/18 严重不符**
- **影响**: 豆包基于错误的 12/18 分布判定"1 分档判定稳定性弱,维持 score=2" → **真实数据应判定 score=1**(91.4% 交易日稳定处于 1 分档 + 当前 86.14% 处于 1 分档稳定性区间)
- **未影响最终结果**: 投顾人工复核触发条件(用户设定阈值≥20 天 ≥85%)并强制真实拉取,最终下修至 score=1 · **避免了错误判定**

**失败模式分析**:
- 豆包在"敏感性检验""最近 N 天分布""统计多少天 >X%" 等**需要真实时序数据**的任务中,**倾向于用"逻辑推导"代替"真实数据拉取"**
- 豆包会用"baostock L1 日频逻辑推导"等模糊用语包装推演行为,**让用户难以快速识别"推演 vs 实测"的差异**
- 数字输出**格式合规**(精确到个位·占百分比·分布合理)但**与真实数据严重不符**

**防止重犯的具体规则(新增 · 永久生效)**:

1. **敏感性检验类任务强制要求投顾人工用 akshare/baostock 重新执行同样的检验步骤验证**:
   - 凡 prompt 中要求"拉取最近 N 天数据 / 计算每日 X / 统计多少天 >Y%" 类任务
   - 豆包返回后,**投顾必须用相同参数真实调用 baostock/akshare 重新执行一遍**
   - **不得仅凭豆包自称"已拉取"就采信**——豆包可能用"逻辑推导"伪装

2. **豆包报告中"逻辑推导""逻辑分析""推演""推算"等关键词 = 红色警告信号**:
   - 看到这些词,**默认豆包未真实拉取数据**
   - 必须触发投顾人工二次验证

3. **豆包输出格式合规但与已知数据有出入时 = 强信号**:
   - 688700 案例:豆包"12/18"看似合理(差不多一半一半)但与真实"32/3"(几乎全部 1 分档)差距巨大
   - 任何"看似合理但具体数字需要重新核验"的输出 → 必须投顾人工复核

4. **新增 prompt 设计要求**: 任何要求"拉取"数据的任务,prompt 必须**显式要求豆包标注"数据来源 + 真实调用接口名 + 调用时间戳"**——如不能给出 → 视为推演,标记为不可采信

5. **commit 强制项**: commit message 必须包含"投顾人工 baostock 真实拉取验证结果(对比豆包输出)"·否则不允许 commit

**违反本节 = §6.2 红线(豆包 hallucination 内容)+ §6.8 数据准确度优先原则违反**。

**新增防御工具**: 后续如需批量处理需要敏感性检验的 stock,可考虑新建 `scripts/sens_check.py` 模板脚本,自动拉取 N 天数据并计算每日分位分布,避免每次手动跑 python。

---

**6.8 数据准确度优先原则（用户 2026-06-19 明确指示·绝对优先）**

> **本节是 §6 全部纪律的最高原则。所有 CC 操作、所有 prompt 设计、所有方案推荐，必须先通过本节审查。**

**核心三原则（按优先级排序）**：

1. **数据准确度 > 流程完成** —— 宁可 Phase 任务不完成、数据保持上一稳定状态，也**绝不能为了"让流程跑完"而手动改字段或注入违规数据**
2. **严格遵守项目纪律** —— 所有 CC 操作必须符合 §6.1-§6.7 + G4 治理铁律
3. **绝不为了流程跑完而违反纪律** —— CC 推荐的所有方案必须先通过 §6.2 严格审查

**R2-X 演进教训（关键反例）**：

Phase 10 半导体设备 R2-1 → R2-2 → R2-3 → R2-4 累计 4 轮重出。CC 在 R2-3 输出扫描后曾推荐"手动修 5 步"以让流程跑完——这是错误：
- "手动修"违反 §6.2（字段必须原样写入）
- 即使"手动修"能让合规度从 70% → 85%，**也不能推荐**
- 推荐"手动修"的本质是**为了让流程跑完而牺牲数据准确度**
- **正确做法**：R2-4 重出，让 DeepSeek 修源数据，CC 不改字段；如果 R2-4 仍有违规 → R2-5 → ... 直至源数据合规

**未来 CC 决策规则（强制）**：

- 任何方案推荐前**先问**：**这是否符合 §6 全部纪律 + §6.8 三原则？**
- 如果方案能让"流程跑完"但违反纪律，**必须拒绝该方案**
- 如果所有合规方案都不能让"流程跑完"，**接受流程不跑完的状态**——保留上一稳定数据状态
- 如果不确定某操作是否合规，**停止操作**并询问用户

**反模式（禁止）**：

- ❌ "为了让 R2-4 数据注入项目，CC 可以小改字段"——违反 §6.2 + §6.8.1
- ❌ "手动修违规 akshare-web URL 比重新跑 DeepSeek 快"——违反 §6.2 + §6.8.3
- ❌ "流程上需要 commit，所以降低合规要求"——违反 §6.8.1
- ❌ "用户可能不耐烦，所以走捷径"——违反 §6.8.3
- ❌ "CC 代用户判断'哪些已修正'以节省 token"——违反 §6.6 + §6.8.2
- ❌ "既然 R2-3 截断了，那就 R2-4 只针对剩余违规"——违反 §6.6（必须完整扫描）

**验证清单（每次推荐方案前必走）**：

```
□ 1. 这个方案是否会让 CC 修改 DeepSeek 返回的字段？
   - 是 → ❌ 拒绝（§6.2）
   - 否 → 继续 □ 2
□ 2. 这个方案是否会注入违反 §6.3 的字段（如 akshare-web）？
   - 是 → ❌ 拒绝（§6.3）
   - 否 → 继续 □ 3
□ 3. 这个方案是否会让数据准确度降低？
   - 是 → ❌ 拒绝（§6.8.1）
   - 否 → 继续 □ 4
□ 4. 这个方案是否"为了流程跑完"而设计？
   - 是 → ❌ 拒绝（§6.8.3）
   - 否 → ✅ 可以推荐
```

### 6.9 stock code / 段位 / name 三重验证（实装·R3-16+ 落地）

**触发时机**：任何涉及具体 stock 的豆包/DeepSeek 注入批次提交前。

**实装脚本**：
- `.claude/scratch/R3-16-batch2-hallucination-screen.js`（segments[0]-[3] 19 只范例）
- `.claude/scratch/R3-16-batch3-hallucination-screen.js`（segments[4]-[6] 15 只范例）

**三重验证流程（顺序执行，不可跳步）**：

1. **stock code 校验**——动态提取 `pcb.js` 实际 stock list（segments + midstream + fourQuestions 三路径），验证豆包返回的所有 stock code 在 pcb.js 中
2. **stock 段位校验**——对比返回 stock 的 segIdx 与 pcb.js 实际 segIdx
3. **stock name 校验**——对比返回 stock 的 name 与 pcb.js 实际 name

**附：数据冲突检查**——对比上一稳定版本 trendNote 与新数据，重大漂移（如 trend 从 up → down / 营收增长率从 +50% → +200%）必须显式标注 ⚠️。

**强制规则**：
- 任何涉及 ≥10 只 stock 的数据刷新必须先过三重验证
- 单一检查通过不算合规，三项必须都通过
- 数据冲突检查必须列出所有重大漂移并标注 ⚠️

**违反本节 = §6.2 红线（造数）**。

**事故案例（2026-06-22）**：R3-16+ 批 1 豆包在缺上述约束下返回 4 只 pcb.js 不存在的 stock（600143 金发科技、600346 恒力石化、600160 巨化股份、688519 南亚新材错码），并把 603228 景旺电子、002916 深南电路错位到错误段位。三重验证机制即为此事故的防御措施。

> **设计稿·未实装**（2026-07-02 审计确认 gap）：§6.9 早期版本曾描述"上市状态预检"（`.claude/plans/tools/pcb-pre-flight-check.js`）+"4 层幻觉筛查"（含 risk score 量化）双重检查机制。截至本审计:
> - `pcb-pre-flight-check.js` **不存在**（`.claude/plans/tools/` 目录仅有 `helper_akshare.py` / `_akshare_spot_cache.json`）
> - `pcb-hallucination-screen.js` **不存在于** `.claude/plans/tools/`——脚本实际位于 `.claude/scratch/` 且仅做"stock code / 段位 / name"三重验证,无"4 层防御 + risk score 量化"
> - 退市窗口扫描、事件密度告警、数字可验证性、客户名可验证性这 4 层均**未实装**
>
> 若需恢复这 4 层防御+上市状态预检,需新建脚本(预计代码量 ~300 行),不在本批次 scope。**短期应对**:沿用现有三重验证 + 豆包 prompt 中显式约束 L1 数据由用户人工登录 cninfo 核对（§6.11 约束 #8）。

### 6.10 三重验证机制（stock code / 段位 / name 校验·硬约束）

> §6.9 防御的是"豆包幻觉事件"（退市 + 事件密度），本节防御的是"豆包引入不存在的 stock / 写错 stock code / stock 错位段位"——R3-16+ 批 1（2026-06-22）事故的防御措施。

**触发时机**：任何涉及 ≥10 只 stock 的数据刷新 / 注入前，必须先做三重验证 + 数据冲突检查。

**三重验证流程（顺序执行，不可跳步）**：

1. **stock code 校验**——动态提取 pcb.js 实际 stock list（segments + midstream + fourQuestions 三路径），验证所有返回的 stock code 在 pcb.js 中
2. **stock 段位校验**——对比返回 stock 的 segIdx 与 pcb.js 实际 segIdx
3. **stock name 校验**——对比返回 stock 的 name 与 pcb.js 实际 name

**数据冲突检查**：

- 对比上一稳定版本（如 R3-15+ P1）的 trendNote 与新数据
- 重大数据漂移（如 trend 从 up → down / 营收增长率从 +50% → +200%）必须显式标注 ⚠️
- 不在 pcb.js 中佐证的数字 → 标 ⚠️参考

**验证脚本模板**：

- 模板 A：[.claude/scratch/R3-16-batch2-hallucination-screen.js](.claude/scratch/R3-16-batch2-hallucination-screen.js)（19 只 stock segments[0]-[3] 范例）
- 模板 B：[.claude/scratch/R3-16-batch3-hallucination-screen.js](.claude/scratch/R3-16-batch3-hallucination-screen.js)（15 只 stock segments[4]-[6] 范例）

**三重验证强制规则**：

- 任何涉及 ≥10 只 stock 的数据刷新**必须**先过三重验证
- 单一检查通过不算合规，三项必须都通过
- 数据冲突检查必须列出所有重大漂移并标注 ⚠️，否则不算合规

**违反本节 = §6.2 红线（造数）**。

**事故案例（2026-06-22）**：R3-16+ 批 1 豆包编造 4 只 pcb.js 不存在的 stock（600143 金发科技、600346 恒力石化、600160 巨化股份、688519 南亚新材错码），并把 603228 景旺电子、002916 深南电路错位到错误段位。三重验证机制即为此事故的防御措施。

### 6.11 精确 stock 列表 prompt 模板（防止豆包引入新 stock·硬约束）

> R3-16+ 批 1（2026-06-22）事故根因：豆包 prompt 缺少 3 条硬约束——精确 stock 列表 / 禁止引入新 stock / stock code 必须精确。本节为强制规则。

**触发时机**：任何涉及具体 stock 的豆包 / DeepSeek / Gemini prompt 设计时。

**强制规则（13 条硬约束）**：

1. **精确 stock 列表**——prompt 必须列出每只 stock 的 `code + name + segment 段位 + rank + barrier + tier + 当前 trend + 当前 trendNote`
2. **禁止引入新 stock**——明确告知模型"只有以下 stock，禁止引入其他 stock"
3. **stock code 必须精确**——明确告知"stock code 是 6 位数字"，模型不得自编 stock code
4. **stock 段位必须精确匹配**——明确告知"每只 stock 必须在以下段位中"
5. **查询不到不替换**——明确告知"如查不到某只 stock 的事实，在【6. 未查到】段列出，不要替换为其他 stock"
6. **7 段式格式**——【1. 认证进展】/【2. 客户切换】/【3. 新进入者】/【4. 技术产能壁垒】/【5. 品类归属】/【6. 未查到】/【7. 信源清单】
7. **信源权威性分层（替换原双源规则）**：
   - L1=公司年报/公告（cninfo）→ 单源直接采信，标注公告标题+日期
   - L2=政府/监管数据（CPCA/工信部/证监会）→ 单源直接采信
   - L3=Prismark/IHS/弗若斯特沙利文等专业机构报告 → 单源采信，标注机构名+报告名+日期
   - L4=头部券商研报（华泰/东吴/国金/东北/东方证券等）→ 单源采信，只提供"券商名+报告标题+发布日期+关键数字"，禁止提供任何 PDF URL
   - L5=财经媒体（新浪/东方财富/雪球/今日头条）→ 需两家以上媒体同一数字才采信，标注每家媒体名+日期
   - L6=非公开调研纪要/雪球用户原创帖/匿名信源 → 直接拒绝，不得引用
8. **禁止提供任何 URL**——豆包不得提供任何 URL，包括 dfcfw.com、cninfo、static.cninfo.com.cn、慧博、iFinD 等任何链接。豆包不具备真实访问 URL 的能力，提供 URL 必然产生幻觉。只提供：来源机构名+报告/公告标题+发布日期+关键数字。L1 数据验证由用户人工登录 cninfo 核对，不依赖豆包。
9. **段位品类标注**——明确告知每段的品类
10. **量产/验证/在研状态标注**——已量产/验证中/样品认证/在研/未启动 五档之一
11. **不得编造事实**——联网搜不到的事实必须显式列在【6. 未查到】段，不得填入主段伪装成事实，不得编造客户名、数字、日期
12. **A/B 类信号拆分**——A 类=壁垒维度本身变化（认证/客户验证/技术领先/竞争位置/产能变化）；B 类=经营业绩（营收/订单/亏损/份额变化）；trend 判断主依据必须是 A 类，B 类仅辅助印证
13. **数字必须带单位+时间口径+地理范围**——每个数字必须明确：是"全球/国内/英伟达供应链"哪个口径，是哪个时间点，带什么单位，不得混用口径

**违反本节 = §6.2 红线（造数）+ §6.8 数据准确度优先原则违反**。

**事故案例（2026-06-22）**：R3-16+ 批 1 豆包在缺上述约束下返回 4 只 pcb.js 不存在的 stock + 2 只错位段位 stock。R3-16+ 批 2/3 重启时加入 11 条硬约束后，豆包返回内容与 pcb.js 100% 一致（[R3-16-batch2-hallucination-screen.js](.claude/scratch/R3-16-batch2-hallucination-screen.js) / [R3-16-batch3-hallucination-screen.js](.claude/scratch/R3-16-batch3-hallucination-screen.js) 三重验证全部通过✓）。

**事故案例（2026-06-27）**：R4-82 豆包返回 4 条 dfcfw.com PDF URL（华泰/东吴/国金/东北证券），经 curl 实测全部为 HTTP 200 + Content-Length 0 + 无 %PDF 文件头——dfcfw CDN 对所有 H3_AP 模式 URL 一律返回空响应占位。本节升级至 13 条，新增约束 #8「禁止提供任何 PDF URL」+ 约束 #7 改为 6 级信源分层（L1-L6），禁止 L4 券商研报提供 PDF URL。

**事故案例（2026-06-27 第二轮）**：R4-82 补查 6 条 cninfo 真实 PDF URL 抽查，仅 1 条（深南电路 2024 年度报告）真实可访问（3.95 MB / %PDF-1.5 / HTTP 200），其余 5 条全部 404（146 字节 HTML 404 页）。豆包声称「已验证 URL 真实可访问」实际未执行 HTTP 请求，系统性编造 cninfo 文件 ID。约束 #8 升级为「禁止提供任何 URL」（包括 cninfo PDF）——豆包 L1 数据真实性由用户人工登录 cninfo 核对。

### 6.12 双层架构同步校验（pcb.manual.js ↔ pcb.js·commit 5.9 立）

**触发时机**：每次 commit 前必须运行 `python scripts/page_audit.py` → 第【7】项会调用 `scripts/check_manual_pcb_sync.js` 自动 diff 两层文件的 stock 列表。

**校验范围**：
- 仅 `pcb.manual.js` 有 / pcb.js 渲染层无(悬空 stock · 需评估是否补 pcb.js)
- 仅 `pcb.js` 有 / `pcb.manual.js` 无(manual 层缺失 · 需评估是否补 manual.js)
- `name` 不一致(同一 code 两层 name 不同)

**强制规则**：
- 第【7】项 FAIL → **不得 commit** · 必须先修复差异
- 当前已发现 2 处悬空 stock(`000657 中钨高新` / `300179 四方达` · 仅 manual.js 有)· 详见 §11.1 待办

**历史事故**：
- commit 4.35 误删 `002443 金洲管道` / `603519 神马电力`(实为非 PCB 标的)——曾发生
- commit 5.6 同步补回 `603519 南亚新材`(commit 4.35 误删后)——已修复
- 当前 2 处悬空是**已知差异**,已纳入 §11.1 待办

**升级历史**：本机制在 commit 5.9 前**完全靠人工 `git diff data/pcb.js data/pcb.manual.js | grep` 检查**——易遗漏、不可靠。commit 5.9 起升级为 `scripts/check_manual_pcb_sync.js` 自动检查 + page_audit 第【7】项强制阻断 commit。

**违反本节 = §6.2 红线（双层数据不一致）**。

### 6.13 豆包返回涉及主营业务占比数字·强制 akshare stock_zygc_em 前置核验（2026-07-02 commit 6.6 立）

> **事故案例（2026-07-02）**：R3-16+ 批 2 / 豆包 E 批次 301217 铜冠铜箔 返回"电子电路铜箔营收占比 43%"，akshare `stock_zygc_em` 实证为 **"PCB 铜箔占比 55.37%"**（12pp 偏差 + 产品分类名称错位）。该 hallucination 未写入 `pcb.manual.js`（lessons-learned 标记作废有效），但暴露豆包在"营收占比类数字"上的**系统性不可信**。

**触发场景**：任何豆包 / DeepSeek / Gemini prompt 查询**涉及"某 stock 某业务/产品/产品分类占公司总营收 X%"** 类数字时，**必须**先走 akshare `stock_zygc_em` 实测核验，**不得**直接采信 LLM 返回的占比数字。

**强制规则**：

1. **前置核验**：豆包 prompt 返回后，先用 akshare `stock_zygc_em` 拉取同一报告期主营构成（`MAINOP_TYPE=2` 产品 + `MAINOP_TYPE=1` 行业），交叉对比
2. **对比口径**：
   - 产品分类占比（`MAINOP_TYPE=2`）—— 对应公司年报"按产品分类"披露
   - 行业分类占比（`MAINOP_TYPE=1`）—— 对应公司年报"按行业分类"披露
3. **偏差阈值**：偏差 >5pp 视为幻觉，**必须丢弃豆包数字改用 akshare**；偏差 ≤5pp 标注口径差异保留豆包数字但加 ⚠️ 口径差异
4. **产品分类名错位**：豆包常将"PCB 铜箔" / "电子电路铜箔" / "锂电铜箔" 等相似名称混淆 —— **必须以 akshare 的 `ITEM_NAME` 为准**
5. **akshare 数据通道属性**：akshare `stock_zygc_em` 数据源 = 东方财富（抓取自巨潮/年报），**实际信源等级 = L1 primary**（年报原始披露），只是通过 akshare 接口访问；不能因为用 akshare 就降级到 L5
   - **L1 等效限定**：此 L1 等效认定**仅适用于 akshare 成功完整解析返回数据的情况**（即 `r.json()` 成功 + `zygcfx` 字段齐全 + `MAINOP_TYPE=1/2` 行数 ≥1）；若接口返回 **JSON 解析失败 / 字段缺失 / 需正则补查**（如 `002938 鹏鼎控股` 案例，GBK 解码含特殊字符 → `json.JSONDecodeError`），该数据点**降级为"akshare 辅助 + 人工核实"**，**不自动视为 L1**——必须由投顾人工登录巨潮/年报核对原始数据后再标记 tier
   - **降级标记方式**：dims6 字段中 tier 标 `estimate`（或 `L4`）+ reason 字段末尾追加 `｜akshare 正则补查·降级为辅助·需人工核对 L1`
6. **不替代产能/产量**：akshare **没有**"产能/产能利用率/产量"结构化接口（2026-07-02 实测确认），这部分**仍须 LLM 读年报 PDF + 强制窄范围复核**（§6.11 约束 #11 不得编造）

**已验证规模**（2026-07-02 实测）：
- PCB 38 只 stock 全量核验：成功 37 / 失败 1（`002938 鹏鼎控股` JSON 解析失败，正则补查成功）
- 显著差异（偏差 >5pp 或产品名错位）：19 只中**绝大多数是细分口径差异**（如"AI 占 PCB 43%" vs "PCB 占公司 93.74%"），非数据错误
- 真正数据错误：**301217 铜冠** 1 只（豆包 43% vs akshare 55.37%，已 commit 6.6 修正）
- OCR 异常值 3 只已核实为同比增速（2026-07-02 验证）· 数据正确 · 无需修正：详见 §11.4 已闭环登记

**验证脚本**：`scripts/verify_business_structure.py` · 已对 PCB 38 只 stock 全量核验，结果写入 `.claude/scratch/business-structure-diff-<date>.json`

**复用方式**（11 链扩展）：
```bash
# 修改脚本中 chainId 参数即可对其他赛道核验
# scripts/verify_business_structure.py 默认 pcb · 可改为其他 11 链
```

**akshare 接口技术注意**：
- `stock_zygc_em` 底层走 `emweb.securities.eastmoney.com` —— **Windows 代理可通**
- `push2.eastmoney.com` 子域名（部分 akshare 默认调用）—— **Windows 代理会拦截**，需在能联网的环境跑
- `stock_zygc_em` 返回 GBK 编码，需 `r.encoding = 'gbk'`；个别 stock 接口返回含 GBK 解码不了的特殊字符（`002938 鹏鼎控股` 即此类），用正则提取兜底

**违反本节 = §6.2 红线（造数）+ §6.8 数据准确度优先原则违反**。

### 6.14 百分比字段口径标注规范（2026-07-02 commit 6.8 立）

> **事故案例（2026-07-02）**：`scripts/verify_business_structure.py` v1 仅有 `extract_pcts(text)` 把所有 `%` 数字当作主营占比与 akshare `stock_zygc_em` 对比，导致 27 只 stock 报"显著偏差"，实际**全部误报**——19 只是把"同比/市占率/估值"误判为"主营占比"，8 只是可解释的口径嵌套差异（细分业务占主营 / 单季 vs 全年 / 客户份额）。
>
> **结论**：v1 对 PCB 38 只 stock 报"27 只显著差异" → v2 修正口径关键词过滤后，**真实数据错误仅 1 只（301217 铜冠 43%→55.37%，已 commit 6.6 修正）**。

**触发场景**：任何涉及百分比的字段（`position` / `investableReason` / `dims6.reason` / `chokePoints.logic` / `verification.items` 等）新增/修改时，**必须显式标注口径类型**。

**强制规则**：

1. **不得只写裸数字+%** —— 必须明确说出"什么占什么的比例"
2. **标准口径词汇表**（任选其一，**前缀必须出现**）：

| 口径类型 | 标准写法示例 | akshare 验证接口 |
|---|---|---|
| 主营营收占比 | "电子材料营收占比 30.0%" / "主营 PCB 占比 93.74%" | `stock_zygc_em` MAINOP_TYPE=2 |
| 行业分类占比 | "化工新材料行业占比 98.23%" | `stock_zygc_em` MAINOP_TYPE=1 |
| 营收同比增速 | "营收同比 +27.24%" / "营收 YoY +131.42%" | 不适用（akshare 无同比接口） |
| 净利润同比增速 | "归母净利同比 +763.91%" / "扣非净利 +698.7%" | 不适用 |
| 市占率 | "全球边缘 AI 设备 PCB 市占率 26.9%" / "国内市占 25%" | 不适用（需 L3/L4 报告） |
| 产能利用率 | "产能利用率 95%+" / "产能利用率 120%" | 不适用（需读年报 PDF） |
| 毛利率/净利率 | "毛利率 53.25%" / "净利率 18.5%" | `stock_zh_a_indicator` 或读年报 |
| 产销率 | "产销率 100%" | 不适用 |
| 良率 | "良率 99.2%" | 不适用 |
| 估值分位 | "PE-TTM 34.72 倍 / 5 年分位 76.4%" | `stock_a_indicator_pe` 或 baostock |
| 单季占比 | "2026Q1 占比 90.8%"（必须带季度前缀） | `stock_zygc_em` 但需筛选季度 |

3. **歧义兜底规则**——若文本中只出现裸数字 + `%` 且无任何口径关键词（如"营收占比"/"同比"/"市占率"），**视为数据质量不达标**，后续脚本对比时自动跳过不纳入对比（不报错）
4. **单季 vs 全年显式区分**——必须带"2026Q1"/"2025 年报"等时间口径前缀，避免单季数据被误读为全年占比
5. **嵌套口径显式拆解**——若占比是"X 占 Y 的 Z%"嵌套结构，必须写完整三段："AI PCB 占公司 PCB 业务约 50%（公司主营 PCB 占比 93.74%）"，不要省略内层
6. **历史数据不强制批量修改**——38 只已有 position/investableReason 文本**暂不批量规范化**（成本高、收益有限），新数据起遵循本规范；自然更新（如 refresh / 豆包批次）时顺带规范化

**脚本落实**：

`scripts/verify_business_structure.py` v2 已实装 `extract_caliber_marked_pcts(text)` 口径关键词过滤：

- **SKIP_KEYWORDS**（跳过，非主营占比口径）：同比 / 增长 / 增幅 / 降幅 / 增速 / 市占率 / 市占 / 份额 / 产能利用 / 良率 / 合格率 / 毛利率 / 净利率 / 产销率 / YoY / PE分位 / PE-TTM / 估值 / 涨幅 / 跌幅
- **INCLUDE_KEYWORDS**（纳入，主营占比口径）：占比 / 占公司 / 占主营 / 营收占比 / 主营占比 / 占营业收入 / 占营收 / 营业总收入 / 总营收占比 / 收入占比

v2 实测结果：**从 27 只误报降到 0 只真实数据错误**（唯一真实错误 301217 铜冠已 commit 6.6 修正）。

**违反本节 = §6.2 红线（数据字段缺失口径标注，影响下游脚本审计）**。

### 6.15 亏损/经营异常公司六维查询专项规则（2026-07-02 commit 6.10 立）

> **事故案例（2026-07-02）**：605006 山东玻纤 6 维补全查询中,豆包 valuation 维度返回"PE(TTM)=24.7倍,5年历史分位72%,10年历史分位76%"、visibility 维度返回"2025年归母净利同比-6.75%/2026Q1净利同比-12.41%"。
>
> **baostock L1 实证反查**：
> - 公司 2024 年报净利 -0.99 亿 / 2025 年报净利 -0.13 亿（亏损收窄 86.4%）
> - PE-TTM 自 2024-05 起持续为负,2026-07-02 最新 -1049.81 倍
> - 营收同比 +25.06%（2024→2025） / 2 年 CAGR（2023→2025）+6.86%
>
> **判定**：① valuation 维度 PE 分位数字完全 hallucination（无 L1 依据）② visibility 维度"净利同比 -6.75%"方向性错误（实际是亏损收窄 86%,不是小幅下滑）③ 两个维度均通过 §6.11 13 条硬约束格式初判,但内容均被证实为虚构/错误——**格式合规 ≠ 内容真实**。

**触发场景**：dims6 6 维补全查询中,**目标 stock 处于以下任一状态**时,本节规则强制生效:
- L1 利润表最近 4 个季度中 ≥1 个季度净利润为负
- L1 利润表最近 2 个年度均为净亏损
- PE-TTM 长期为负（>30 个交易日持续）
- 主营业务剧烈下滑（营收 CAGR<-10% 或 yoy<-20%）

**强制规则 4 条**：

#### ① valuation 维度独立成条查询 + 强制替代指标

- **不得**与其他 5 维混在同一条 prompt
- **禁止使用** PE-TTM 或 PE 历史分位作为评分依据（数据无意义）
- **必须使用** 替代指标,按优先级:
  - A. PB（MRQ）当前水平 + 历史分位
  - B. 亏损收窄趋势（2024 -0.99 亿 → 2025 -0.13 亿,收窄 86.4% 算不算经营拐点）
  - C. PS（市销率）横向对比
  - D. 经营拐点观察（连续 2 季盈利?毛利率回升?一次性事件?）
- **评分规则**：使用亏损公司专用 5 档（PB + 亏损收窄 + 经营拐点组合）,**不**用 §10 标准 PE 分位 5 档

#### ② 查询前 baostock/akshare 预喂 L1 实证数据

- **必须**先调用 baostock `query_profit_data` 拉取最近 4 年完整年报利润表
- **必须**先调用 baostock `query_history_k_data_plus` 拉取最近 603 个交易日的 PE-TTM / PB 时间序列
- **必须**先调用 akshare `stock_zygc_em` 拉取最新主营构成（若接口可用）
- **预喂内容必须包含**:
  - 净利润正负状态（必须明确告知"公司是否亏损",让豆包无判断空间）
  - 营收同比方向（必须明确告知"营收是上升/下降/V 型反转"等方向）
  - PE-TTM 历史轨迹（关键转折点）
  - 实际 CAGR（2 年/3 年,基于 baostock 真实数据计算）
- **禁止**让豆包自行判断盈亏状态或营收趋势——这些是 L1 实证,必须由 baostock/akshare 提供

#### ③ 格式合规 ≠ 内容真实：抽查交叉验证机制

- §6.11 13 条硬约束是**必要条件**不是**充分条件**
- 高风险维度的数字必须做**抽查交叉验证**:
  - **必须抽查**:valuation / visibility / supply / 任何涉及"营收同比""净利同比""产能利用率"的维度
  - **抽查方法**:baostock 反算 CAGR + akshare 主营构成对比 + 与同段位对标公司对比
  - **偏差阈值**:与 baostock/akshare 实证偏差 >5pp 或方向不一致 → 判定 hallucination,整个维度作废
- 本次 605006 案例教训:valuation 和 visibility 都通过了 §6.11 格式初判（URL 禁令 ✓、L1-L6 信源分层 ✓、7 段式 ✓、A/B 类信号 ✓）,但内容均被证实为虚构/错误——**说明格式合规不能替代内容验证**
- **强制动作**:豆包 query 返回后,对每个维度的"关键数字"做至少 1 条 akshare/baostock 反查,记录在 commit message 中

#### ④ 高风险数字特征识别

以下特征组合 = 高风险 hallucination 信号,**必须**优先要求豆包标注具体信源章节或列入【未查到】:
- 数字精确到小数点后 1 位（如 92.5% / 76.4%）
- 整数百分比 + 精确数量（如"产能 3.2 亿米 / 利用率 71%"）
- 全球/全国厂商整齐分布（如"日本 5 家 + 韩国 3 家 + 中国 5 家 + 台湾 2 家"）
- 多家公司档位之间无矛盾（模型擅长生成"自洽幻觉"）
- 单一信源覆盖 10+ 家公司（实际单一信源通常覆盖 3-5 家）
- **处理方式**:看到这些特征时,要求豆包:
  - 标注"L1 年报 X 章节 + 公告标题 + 发布日期"
  - 或标注"L3 机构报告 + 报告名 + 日期"
  - 若无法标注 → **必须列入【未查到】段**,不得用"估算"或"推算"代替

**违反本节 = §6.2 红线（hallucination 内容）+ §6.8 数据准确度优先原则违反**。

**605006 山东玻纤本次处理模板**：

- **policy / barrier 维度未做独立交叉验证** → 写入 pcb.manual.js 时 `tier='estimate'` + reason 末尾追加统一标注：

  > `｜605006 本轮查询中 valuation 维度被证实完全编造(虚构 PE 分位)、visibility 维度被证实方向性错误(净利同比与实际亏损收窄趋势相反),本维度未做独立交叉验证,存在同批次污染风险,待后续复核`

- **durability 维度**(`近 3 年营收 CAGR 7.2%`) → baostock 实证 2 年 CAGR 6.86%,偏差 5%,方向一致 → 写入时 `tier='L1'`（已验证）+ reason 中注明"经 baostock 2023-2025 真实营收数据反算 CAGR 6.86%,与豆包 7.2% 偏差 5%,方向一致,已核实"

- **valuation / visibility / supply 维度**:等三条独立 query（valuation_v2 / visibility_v2 / supply_v2）返回后,**必须先做 baostock/akshare 抽查验证**,再决定是否写入

**复用方式**（11 链扩展）：
任何 PCB 链之外的目标 stock 触发"亏损/经营异常"条件,均按本节规则处理。

#### ⑤ §6.15 现行规则的已知局限（2026-07-02 commit 6.15 立）

> **本节为规则设计缺口登记，不在本次单只 stock 复核中临时改规则**。改进留待后续统一设计。

**发现案例**：600110 诺德股份 valuation 复核（2026-07-02 commit 6.15 立）
- baostock L1 实证：2024 年报净利 -3.69 亿 / 2025 年报净利 -3.12 亿 / 2026Q1 净利 +0.42 亿（业绩拐点已确立）/ 营收同比 +40.8%
- PB(MRQ) 4.47 倍 · 5 年 PB 历史分位 83.00%（介于 §6.15 5 档表的 2 分档 70-85% 区间）
- **问题**：现行 §6.15 5 档表仅以 **PB 历史分位区间卡档**，未纳入"业绩拐点确立""营收增长""亏损收窄"等正面经营信号的加分空间
- **直接后果**：
  - 605006 山东玻纤（拐点未确立 + 营收低迷）：按 §6.15 5 档表得 score=2（合理）
  - 600110 诺德股份（拐点已确立 + 营收 +40.8% + 亏损收窄 15.4%）：按 §6.15 5 档表也得 score=2（**与 605006 评分相同，但基本面差异显著**）
- **规则缺口**：
  - 5 档表 PB 区间是硬性卡档（70-85% → 2 分）
  - 没有"经营正面信号 → +1 档"的弹性空间
  - 实际投资实务中,业绩拐点确立+营收增长应当对冲 PB 偏高的估值压力
- **本次 600110 处理方式**（人工判断，不改规则）：
  - 采纳 score=3 上修（豆包初判 + 人工二次确认）
  - reason 字段显式标注"本次上修突破了 §6.15 现行 5 档表的 PB 区间硬约束,依据是业绩拐点已确立+营收+40.8%+亏损收窄 15.4% 这组正面信号的人工判断,该规则漏洞已登记,不代表 §6.15 规则允许普遍性弹性上修"
  - **本次仅为 600110 单只特例**，不形成普遍性规则
- **后续规则改进方向**（待 §6.15.1 或 §6.16 立，本次不实施）：
  - 5 档表新增"业绩拐点确立 + 营收同比 > 30%"等加分档位
  - 或采用"PB 基底档 + 经营信号加权"双因子评分
  - 或引入 §10 A/B 类信号规则（经营 A 类信号可对冲估值 A 类信号）
  - **改进前**:所有 §6.15 触发 stock 仍严格按现行 5 档表 PB 区间卡档 + 投顾人工判断弹性

**违反本节**：无（仅为规则设计缺口登记，不构成违规）。

---

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
- 升级九 STEP 4 后：**赛道数据一律放 `data/<id>.js`**（IIFE + `window.CHAINS` 注入），**不再在 `index.html` 主 `<script>` 里直接写 `CHAINS.xxx = {...}`**。常量 / 函数 / 渲染代码仍在主 inline script 里。
- `prosperity.verdict.stockHint`（以及 dim.reason）**不写 `segments[].barrier` / `chokePoints[].valuation.pePercentile` 这种字段路径**——面向用户的文案用 T0/T1（极高/高）、PE 分位 等口语词。字段路径**只**用于查数据时定位。完整写作模板见 [.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md) 的 `### verdict.stockHint 写作模板` 节。

- 一次只做一个升级，**严格按用户给的"做什么"原文执行**，不替用户决定范围
- 改之前确认天然还原点（`git status` 干净 + HEAD 是稳定 commit），`git reset --hard HEAD` 兜底
- 改完**只报告改了哪里 + 验证清单**，不主动 commit
- **不编造不糊弄** —— 任何"完整度"自评必须按 [§6.1](#6-cc-注入执行纪律phase-10-教训2026-06-19) 分 4 层报告（结构层 / 来源层 / 逻辑层 / stock 覆盖率），禁止用结构层填充率冒充数据准确度；注入时不丢 DeepSeek 给的 `src` / `信源分类` 等字段；概念票不计入 stock 总数。失败教训归档规则见 §6.7。
- **数据准确度 > 流程完成** —— 宁可 Phase 任务不完成、数据保持上一稳定状态，也**绝不能为了"让流程跑完"而手动改字段或注入违规数据**。所有方案推荐前必走 [§6.8 验证清单](#68-数据准确度优先原则用户-2026-06-19-明确指示绝对优先)，任何"小改一下让流程跑完"的诱惑一律拒绝。
- 等用户**显式说"通过"** 才 commit；不主动开启下一项

---

## §7 数据自查纪律（Data Integrity Check · 永久生效 · 2026-06-23 起）

> **触发**：commit 2.3.1 修卡口估值注入 bug 时确立·阶段三起每次 commit 必须输出。

### §7.1 触发条件（任一即触发）

以下任一情况**必须**输出数据自查报告，**不得跳过**：
- 任何涉及数据字段的 commit（新增 / 修改 / 删除）
- 脚本生成或覆盖数据文件后（如 `pcb.auto.js` 脚本生成）
- 发现数据异常或 bug 修复后
- 阶段交界验收时

### §7.2 自查报告格式（每次必须完整输出）

```
=== 数据自查报告 · [commit 编号] ===

【已知正确】
- 列出本次确认无误的数据项 + 验证依据（来源/方法）

【已知错误/异常】
- 列出发现的问题 + 根因 + 是否已修复 + 修复方法

【待核实（人工抽查）】
- 列出无法自动验证、需要人工核对的项目
- **必须指明**：哪几只 stock + 去哪里核对（同花顺/券商研报/公司公告）+ 核对路径

【数据完整性统计】
- 总数 / 有效数 / null 数 / 异常数
- 各关键字段覆盖率（pe_ttm / pePercentile / source / asOf）
```

### §7.3 硬约束

- **自查报告发现的【已知错误】必须在下一个 commit 修复，不得带病前进**
- **【待核实】项目必须在阶段交界验收前完成人工核对，未核对不得放行下一阶段**
- **数据准确度 > 流程完成**（§6.8 延伸）：宁可慢，不能错
- 自查报告**永久记录**在 commit message 或 commit 后回复里·可追溯

### §7.4 自查报告归档（commit 级别 · 历次 commit 永久追溯）

> 本节按 commit 编号归档每次涉及数据变更的自查报告，供阶段交界验收时回溯。报告格式按 §7.2 标准。

#### §7.4.1 commit 6.14 · 688183 valuation 上修（2026-07-02 立）

**触发原因**:
- §11.3 登记的 688183 valuation 反向差异复核
- 用户提供的 PE 分位 59.5% 与 baostock 实时值 53.38% 偏差 6.12pp（数据漂移）
- 全场 33 只已校验 stock 中**唯一反向**案例（实际 score=2 < §10 理论值 3）

**【已知正确】**（本 commit 涉及的数据项均经 baostock L1 / akshare L3 双源验证）:
- **688183 PE-TTM 56.22 倍**（baostock L1 · 2026-07-02 收盘价 115.30 元）
- **688183 5 年 PE 历史分位 53.38%**（rank 624/1169 · baostock 1169 行有效数据反算）
- **688183 3 年 PE 历史分位 20.32%**（rank 139/684）
- **688183 1 年 PE 历史分位 22.31%**（rank 54/242）
- **688183 PB(MRQ) 15.75 倍 · 5 年分位 93.89%**（rank 1138/1212）
- **688183 2025 年报净利 +14.73 亿（同比 +343%）+ 2026Q1 净利 +4.45 亿**（baostock query_profit_data）
- **申万 850822.SI 印制电路板 TTM PE 88.35 倍 · 43 只成份股 · PB 11.99**（akshare sw_index_third_info L3）
- **4 只可比公司 PE/PB**:600183（PE 93.96 / PB 20.59）/ 603186（PE 106.25 / PB 13.12）/ 301217（PE 797.09 / PB 23.80）/ 002916（PE 79.30 / PB 15.93）

**【已知错误/异常】**（豆包初判被推翻 · §6.8 抽查机制验证有效）:
- ❌ **豆包初判 score=2 维持 · 论据"PB 93.89% 极度高估主导"被推翻**
  - 根因 1:豆包缺失**赛道横向对比数据**（未调用 akshare sw_index_third_info / baostock peer comparison）
  - 根因 2:豆包误判 PB 93.89% 为"极度高估" · **baostock L1 实证赛道 PB 中位数 98.97% · 688183 实际低于赛道 5.1pp**
  - 根因 3:豆包套用 §10 EPS 脉冲修正规则 · **但本次 PE 失真场景不成立**（即使剔除 2025 EPS 暴增 343%,688183 PE 仍显著低于赛道 36-44%）
- ✅ **修复**:基于 baostock L1 + akshare L3 双源赛道横向对比 + 301217 敏感性检验 · score 2 → 4 · trend down → up · tier L1 → L1+L3 · reason 完整含赛道横向对比 + §6.14 口径标注

**【待核实（人工抽查）】**:
- 申万 850822 印制电路板 43 只成份股完整清单（akshare `index_component_sw` 接口 schema bug · 建议人工通过同花顺/申万官网核对成份股清单） · **核对路径**: 同花顺 iFinD → 申万行业分类 → 三级行业 → 印制电路板 → 成份股
- 688183 1 年 PE 分位 22.31% 略低于 3 年分位 20.32%（微小反序 · 正常应 1 年 ⊆ 3 年 ⊆ 5 年） · 建议人工核实 baostock 是否存在 2025 年末 EPS 披露导致分位错位
- L4 头部券商 PCB 覆铜板板块 2026 估值测算报告（华泰/东吴/国金/东北/东方证券） · 核对赛道 PE 中枢 88-100 倍区间合理性 · **核对路径**: 同花顺 iFinD → 行业研报 → PCB → 估值专题

**【数据完整性统计】**:
- 总数: 1 只 stock（688183）· 1 个 dimension（valuation）
- 字段变更: score（2→4）· trend（down→up）· tier（L1→L1+L3）· reason（替换）
- 关键字段覆盖率: pe_ttm ✅ · pePercentile 5y/3y/1y ✅ · pb_mrq + pbPctl 5y ✅ · source L1 ✅ · source L3（赛道） ✅ · asOf 2026-07-02 ✅
- 双源覆盖: ≥2 独立来源 ✅（baostock L1 + akshare L3）

**【第 2 次"格式合规但结论有误"案例归档】**:
- 本次是 **commit 6.10 立以来第 2 次**豆包"格式合规但结论有误"被抽查纠正案例
- **首次**: 605006 山东玻纤 valuation 维度（commit 6.10 + 6.12 · §6.15 亏损公司专项规则首次完整应用） · PE 分位数字完全 hallucination + 净利同比方向性错误
- **本次**: 688183 生益电子 valuation 维度 · 缺失赛道横向对比 + 误判 PB 极度高估 + 错误套用 EPS 脉冲修正规则
- **共同教训**: §6.11 13 条硬约束是**必要条件不是充分条件** · **格式合规 ≠ 内容真实** · 高风险维度（valuation/visibility/supply）必须做 baostock/akshare 抽查交叉验证（§6.15 规则 #3）
- **防御机制升级建议**（待 §6.16 立）: valuation 维度专项抽查清单 · 必查赛道横向 PE 中枢 + 赛道 PB 中位数 + 净利基数是否失真

---

- 每次开新升级**重写 plan 文件**（沿用 `C:\Users\Administrator\.claude\plans\app-buzzing-pond.md`），不要在老 plan 上小修小补

## §8 产业链刷新模板（Chain Refresh Template · 阶段四 commit 4.4 立）

**新增 / 刷新产业链数据**统一走模板：[`.claude/templates/chain-refresh-template.md`](.claude/templates/chain-refresh-template.md)

模板涵盖：适用场景（新增 vs 刷新）/ 3 文件结构（manual + auto + 合并层）/ 3 脚本复用方法 / growthAdj 名单决策标准 / 新增 10 步 checklist / 刷新 6 步 checklist / §7.2 自查报告格式 / 紧急回滚命令。

**触发时机**：用户说"新增 XX 产业链" / "刷新 XX 链" / 周一手动触发 🔄 按钮 / 阶段交界验收时。

## §9 报告输出中文化规范（永久生效 · 2026-06-24 立）

所有数据自查报告（§7.2 格式）和交付报告的输出内容，
涉及以下字段名时**必须使用中文说明**，不得直接输出英文字段名。

### 常用字段对照表

| 英文字段 | 中文说明 |
|---|---|
| `fromHigh` | 距前高回落幅度 |
| `pePercentile` | PE历史分位 |
| `pe_ttm` | 市盈率(TTM) |
| `volRatio5d` | 近5日/60日量比 |
| `maxPctl30d/60d/90d` | 近30/60/90天分位最高值 |
| `reduceSignal` | 减仓建议 |
| `exitSignal` | 清仓建议 |
| `triggeredList` | 命中标的列表 |
| `holdingMeta` | 持仓管理信号 |
| `signalCMeta` | 信号C汇总 |
| `entryZone` | 买入区间 |
| `closeLatest` | 最新收盘价 |
| `closeHigh5y` | 5年最高价 |
| `baostockStamp` | baostock版本 |
| `asOf` | 数据截止日期 |
| `flag` | 数据标注 |
| `barrier` | 壁垒等级 |
| `trend` | 景气趋势 |
| `investable` | 可投资性 |
| `region` | 地区 |
| `segments` | 产业链环节 |
| `midstream` | 中游 |
| `chokePoints` | 卡口标的 |
| `signalMeta` | 信号汇总 |

### 规则

1. 报告正文里出现字段值时，格式为「中文说明=值」
   - ✅ 正确：「距前高回落幅度=0（创新高）」
   - ❌ 错误：「fromHigh=0」
2. 代码注释里保留英文（用户看不到）
3. 新增字段时同步更新此对照表
4. 报告里列出标的时，格式：
   - ✅ 正确：「中国巨石 600176：距前高回落幅度=0（创新高）· PE历史分位=99%+」
   - ❌ 错误：「中国巨石 600176：fromHigh=0 · pePercentile=99%」
5. **待核实项里的 Console 查询路径**：中文说明（含预期值）在前，英文命令在后，格式：中文说明（预期值）：英文命令
   - ✅ 正确：「减仓命中数（应为 3）：CHAINS.pcb.holdingMeta.stats.reduce_count」
   - ✅ 正确：「5 只核心卡口命中标的列表（应为空）：CHAINS.pcb.holdingMeta.triggeredList」
   - ❌ 错误：「CHAINS.pcb.holdingMeta.stats.reduce_count = 3」
   - ❌ 错误：「reduce_count: 3（应为空）」

### 适用范围

所有赛道（PCB/HBM/光模块/半导体设备/液冷/光芯片/低空经济/商业航天等）· 永久生效。

## §10 景气六维打分规则模板（跨赛道横向可比基准）

### 打分规则（1-5分）

**景气持续性**
5分：有明确3年以上需求驱动+多家L3机构覆盖+下游客户锁单
4分：有1-2年明确需求+L3/L4覆盖+部分客户锁单
3分：需求存在但周期性强，无明确锁单
2分：需求疲软，行业产能过剩
1分：需求收缩，库存高企

**业绩可见度**
5分：年报或季报可见明确订单/框架协议+L1来源
4分：有L4券商订单预测+客户公开验证
3分：有L4预测但无客户确认
2分：仅有L5媒体报道
1分：无可见订单

**政策确定性**
5分：列入国家重点支持目录+专项补贴+L2来源
4分：行业政策支持+L2来源
3分：政策中性
2分：政策收紧或监管不确定
1分：政策明确不利

**供需紧张度**
5分：全球供给缺口>30%+L3机构测算
4分：供给缺口10-30%+L3/L4来源
3分：供需基本平衡
2分：供给略过剩
1分：严重过剩

**估值性价比**
5分：PE分位<30%+成长赛道历史低位
4分：PE分位30-50%
3分：PE分位50-70%
2分：PE分位70-85%
1分：PE分位>85%或处于历史极高位

**壁垒安全垫**
5分：物理卡口（全球≤3家）+认证壁垒≥18个月
4分：认证壁垒6-18个月+国内唯一/领先
3分：技术壁垒存在但竞争者≥5家
2分：壁垒低，竞争激烈
1分：无壁垒，完全竞争

### 打分原则
- 每个维度打分必须有数据依据，不得凭感觉
- 估值维度对于成长赛道（CAGR>20%）不封顶综合分，只加"⚠估值偏高"提示
- 壁垒维度score≤1时综合分封顶60（质地硬约束不可绕过）
- barrier=极高但q1=false时，在fourQuestions里加note字段说明原因（壁垒≠卡口）
- 每次打分后在dims6里的asOf字段记录打分日期（格式：YYYY-MM）

### 数据更新触发规则
以下事件发生时需重新跑豆包10批次更新数据：
- 英伟达/AMD发布新架构（如Rubin→Vera Rubin）
- 主要stock发布季报/年报
- 国产化率有重大突破（单环节+10pp以上）
- 上游材料认证状态发生变化（新增或失去认证）

### A/B类信号拆分规则（用于trend判断）
A类信号（trend判断主依据）：
- 认证状态变化（新增/失去客户认证）
- 竞争位置变化（市占率升降/新进入者/退出者）
- 技术壁垒变化（新专利/新工艺/认证周期变化）
- 产能变化（扩产/减产/利用率变化）

B类信号（辅助印证，不单独决定trend）：
- 营收/利润变化
- 订单金额变化
- 毛利率变化

trend判断规则：
- up：至少1条A类正面信号+无负面A类信号
- flat：A类信号中性或正负相抵
- down：至少1条A类负面信号（认证失去/市占下降/技术落后）

### 打分规则（1-5分）

**景气持续性**
5分：有明确3年以上需求驱动+多家L3机构覆盖+下游客户锁单
4分：有1-2年明确需求+L3/L4覆盖+部分客户锁单
3分：需求存在但周期性强，无明确锁单
2分：需求疲软，行业产能过剩
1分：需求收缩，库存高企

**业绩可见度**
5分：年报或季报可见明确订单/框架协议+L1来源
4分：有L4券商订单预测+客户公开验证
3分：有L4预测但无客户确认
2分：仅有L5媒体报道
1分：无可见订单

**政策确定性**
5分：列入国家重点支持目录+专项补贴+L2来源
4分：行业政策支持+L2来源
3分：政策中性
2分：政策收紧或监管不确定
1分：政策明确不利

**供需紧张度**
5分：全球供给缺口>30%+L3机构测算
4分：供给缺口10-30%+L3/L4来源
3分：供需基本平衡
2分：供给略过剩
1分：严重过剩

**估值性价比**
5分：PE分位<30%+成长赛道历史低位
4分：PE分位30-50%
3分：PE分位50-70%
2分：PE分位70-85%
1分：PE分位>85

> **已知限制（2026-07-02 commit 6.4 立）**：当前 valuation 量化规则基于静态 PE 历史分位，未考虑高景气赛道的估值溢价合理性。2026-07-02 全量校验显示 PCB 链 33 只已校验 stock 中 28 只（85%）实际打分宽松于 §10 理论值 1-2 档，方向高度一致，判定为**规则设计缺陷而非数据错误**。规则修订前，dims6 中现有 valuation score 维持不变，**不得强制对齐理论值**。

## §11 待办清单（Backlog · 2026-07-01 起）

> 本节登记**未在当前 commit 闭环、需在下一轮（豆包批次 / 阶段交界）处理的项**。避免遗漏。

### §11.1 下一豆包批次 P0 项（数据准确度阻塞）

- **605006 山东玻纤** · **6 维全部完成**(2026-07-02 commit 6.10 + 2026-07-02 commit 6.12 闭环)
  - **最终 6 维评分**(全部有 reason + 全部 tier 非 estimate):
    - durability score=3 / tier=L1(baostock 2023-2025 CAGR 6.86% 反算已验证,与豆包 7.2% 偏差 5%,方向一致)
    - visibility score=3 / tier=L1(营收同比 +25.06% / 亏损收窄 86.4% baostock L1 实证 + 豆包重查 L4)
    - valuation score=2 / tier=L1+L4(PB 5.062 / PS 4.0 baostock L1 实证 + 东吴/国金 L4 研报)
    - supply score=2 / tier=L3+L4(Prismark 2026 + CPCA + 国金证券,行业供给略过剩)
    - **policy score=4 / tier=L2+L4(2026-07-02 commit 6.12 闭环)**(工信部国产替代目录 + GB/T 36401-2018 能耗新规 + 东吴证券研报,无国家专项直补 4 分档位)
    - **barrier score=3 / tier=L3+L4(2026-07-02 commit 6.12 闭环)**(Prismark 全球厂商分布 + 东吴/国金 L4 研报,ECR 电子级可量产 10 家 / 无权威 ≥18 月认证周期数据 3 分档位)
  - **baostock L1 实证（已获取）**：
    - 2022 营收 27.55 亿 / 净利 +5.36 亿
    - 2023 营收 21.76 亿 / 净利 +1.05 亿
    - 2024 营收 19.87 亿 / 净利 -0.9893 亿(亏损)
    - 2025 营收 24.85 亿 / 净利 -0.1343 亿(亏损收窄 86.4%)
    - 2 年 CAGR(2023→2025)+6.86%
    - PE-TTM 自 2024-05 起持续为负,2026-07-02 最新 -1049.81 倍
    - PB(MRQ) 从 2024-01 的 1.586 涨到 2026-07 的 5.062
  - **完整处理历程**(从兜底到全闭环):
    1. **起点**(2026-07-02 之前):6 维全 score=2 / tier=estimate / 无 reason(兜底默认值,§11.1 P0 阻塞项)
    2. **baostock/akshare 预拉取**(2026-07-02):L1 实证数据就位,识别"公司长期亏损,PE-TTM 无意义"
    3. **豆包 v1 查询**(2026-07-02):发现 2 处严重 hallucination + 1 处高风险数据
       - ❌ valuation "PE 24.7/72%/76%" 完全编造(与 baostock PE-TTM -1049.81 倍矛盾)
       - ❌ visibility "净利同比 -6.75%/-12.41%" 方向错误(实际是亏损收窄 86%)
       - ⚠️ supply "产能 3.2 亿米/利用率 71%" 无法验证
    4. **三条独立重查 v2 prompt + 抽查验证**(commit 6.10):valuation/visibility/supply 重新查询,通过 §6.11 初判 + baostock/akshare 反查一致,写入 pcb.manual.js
    5. **policy/barrier 二次 query + 闭环**(commit 6.12):两条独立 prompt 经投顾执行并通过 §6.11 初判,质量高,barrier 对认证月数 / 全球厂家名单严格执行"未查到"兜底
    6. **状态**:6 维全部完成 / 全部有 reason / 全部 tier 非 estimate / 污染标注文案全部清除
  - **核心规则验证**(§6.15 亏损公司专项规则):本批次 6 维补全是 §6.15 规则的**首个完整应用案例**
    - valuation 维度独立成条 query + 强制替代指标(PB/PS/亏损收窄/经营拐点) ✅
    - 查询前 baostock/akshare 预喂 L1 实证数据 ✅
    - 抽查交叉验证机制(2 次幻觉及时发现) ✅
    - 高风险数字特征识别(精确小数 + 整数百分比 → 高度警惕) ✅
  - **完成定义**(全部达成):
    - 6 维 score 不全相等(2/3/3/2/2/3)✅
    - 每维有 reason 字符串(全部)✅
    - 6 维按 §6.15 抽查验证机制通过(全部)✅
    - tier 不全为 estimate(6 维全 L1/L1/L1+L4/L3+L4/L2+L4/L3+L4)✅
    - 污染标注文案全部清除(commit 6.12)✅
  - **涉及文件**:`data/pcb.manual.js` L1044-1075 stock 块
  - **完成 commit**:6.10(6 维首批 4 维)+ 6.12(6 维闭环:policy/barrier 补全 + 污染标注清除)

### §11.3 估值规则缺陷·下一批次可选核实项（优先级 P2 · 低于 §11.1）

- **688183 生益电子** · valuation 维度反向差异 · **✅ 已闭环 · score 2 上修至 4**（2026-07-02）
  - **修订前**:实际 score=2 · trend=down · tier=L1 · PE 5 年分位 53.38%（§10 理论值 3 分档）
  - **修订后**:score=4 · trend=up · tier=L1+L3 · 含赛道横向对比 + 敏感性检验说明
  - **依据**:
    - **赛道横向对比**（akshare L3 `sw_index_third_info`）:申万 850822 印制电路板 TTM PE 88.35 倍（43 只成份股加权）· 688183 56.22 倍低 **36.4%**
    - **可比公司横向对比**（baostock L1）:生益科技 600183 PE 93.96 / 华正新材 603186 PE 106.25 / 深南电路 002916 PE 79.30 · 3 只中位数 **93.96 倍** · 688183 低 **40.2%**
    - **敏感性检验**（剔除 301217 铜冠铜箔）:301217 PE 797.09 倍因 TTM 净利基数极低（1.64 亿，2024 亏损 1.56 亿 + 2025 刚扭亏 0.63 亿）数学失真 · 剔除后 3 只中位数 93.96 倍 · 688183 偏差仍 -40.2% · 结论不变
    - **PB 维度纠错**:豆包初判"PB 93.89% 极度高估" · baostock L1 实证:4 只可比公司 PB 中位数 18.26 / 申万印制电路板 PB 中位数 11.99 · 688183 15.75 倍**低于可比公司中位数 13.7%** · 赛道 PB 整体偏高非 688183 单独问题
  - **完成定义**(全部达成):
    - score 上修 2 → 4 ✅
    - trend 反向 down → up ✅（低估修复+业绩拐点双轮）
    - tier 升级 L1 → L1+L3（akshare 申万数据算 L3） ✅
    - reason 字段完整含赛道横向对比 + 敏感性检验 + §6.14 口径标注 ✅
  - **涉及文件**:`data/pcb.manual.js` L1115 stock 块 dims6[4] valuation
  - **核心规则验证**(§6.11 + §6.8 + §10):本次是豆包**第 2 次"格式合规但结论有误"被抽查纠正**案例（首次 605006） · **格式合规 ≠ 内容真实** ✅
  - **完成 commit**:待 commit 6.14（2026-07-02 立）

### §11.2 双层架构悬空 stock（page_audit 第【7】项 · ✅ 已完成 commit 11a8186）

> **状态：已完成**（2026-07-03 复核确认）。commit `11a8186`（6.2 P0任务3处置）已将两只 stock 补全到 `pcb.js` 渲染层（idx 7 钻针段位），消除双层架构悬空。`scripts/check_manual_pcb_sync.js` 重跑结果：pcb.manual.js 38 只 / pcb.js 38 只 · 名称不一致 0 · 悬空 0 · **双层架构 stock 列表完全同步**。page_audit 第【7】项不再 FAIL。

- **000657 中钨高新** · ✅ 已补到 `pcb.js` idx 7 钻针段位（[data/pcb.js:464](data/pcb.js#L464)）
  - position 描述:"硬质合金/钨钼制品龙头·PCB 微钻与硬质合金棒材"
  - **处置**:采纳选项 A（补到 idx 7 钻针段位）· barrier=高 · fundamentals 仍标 estimate 待人工三表核实

- **300179 四方达** · ✅ 已补到 `pcb.js` idx 7 钻针段位（[data/pcb.js:467](data/pcb.js#L467)）
  - position 描述:"PCD/PCBN 复合超硬材料·钻针配套"
  - **处置**:采纳选项 A（补到 idx 7 钻针段位）· barrier=中 · fundamentals 仍标 estimate 待人工三表核实

**遗留**:两只 stock 的 fundamentals（hits/strength）仍为 estimate 占位，待后续人工三表核实后回填（非阻塞 · 不影响 commit）。

### §11.4 已闭环登记（2026-07-02 验证 · 非数据错误 · 从待办中移除）

> 本节登记本次会话核实后**结论为"数据正确·无需修正"**的疑似异常项，避免后续误判。

**OCR 异常值 3 只核实结果**（核实方法：akshare `stock_zygc_em` 拉取最新主营构成 + position/investableReason 字段溯源定位）：

- **601208 东材科技 "131.42%"** · **数据正确** · `investableReason` L762："高速电子树脂收入 2.58 亿（+131.42%）" 是 **2026Q1 细分业务营收同比增速**，不是主营占比
  - 顺手核验：`positionNote` L759 写"电子级树脂/高速覆铜板基材...2024 营收占比~28%"与 akshare 2025 年报"电子材料 30.00%"基本一致

- **002636 金安国纪 "763.91%"** · **数据正确** · `position` L243 + `investableReason` L246 + `trendNote` L249 三处一致："2026Q1 净利同比 +763.91%（主因量价齐升+基数低）" 是 **归母净利同比异常增速**，不是主营占比
  - 顺手核验：`position` 中"主营 CCL 占比 90%"与 akshare"覆铜板(含半固化片) 91.98%"一致

- **002384 东山精密 "143.0%"** · **数据正确** · `investableReason` L147 + `trendNote` L149："Q1+143%" 是 **2026Q1 业绩同比增速**，不是主营占比
  - 顺手核验：position 中所有 % 都是市占率（边缘 AI 设备 PCB 26.9% / 全球 PCB 前 3 4.2% / FPC 软板 24.5%），非主营占比表述

**根因总结**（供后续脚本升级参考）：
- `scripts/verify_business_structure.py` v1 把所有 % 数字都当主营占比与 akshare 对比，导致 19 只的"同比/市占率/估值"被误报为占比偏差
- v2 新增 `extract_caliber_marked_pcts` 口径关键词过滤（SKIP/INCLUDE 关键词）后，**从 27 只误报降到 8 只可解释的口径嵌套差异，0 只真实数据错误**
- 详见 §6.14 口径标注规范

### §11.5 dims6 reason 字段"两个不同性质百分比挤同一句"统一治理（2026-07-02 commit 6.11 登记 · 待后续处理）

> **触发原因**：2026-07-02 commit 6.11 中处理 002463 沪电股份时发现 `dims6[visibility].reason` 中 "归母 12.42 亿+62.9%,AI 营收占比升至~60%" 这种写法,62.9% 是同比增速、60% 是 AI 营收占比,2 个不同性质的百分比挤在同一句话里,容易造成歧义(肉眼可分辨但脚本审计会误判)。**§6.14 已要求每个百分比数字必须显式标注口径**,但未要求"两个不同性质数字必须分行写"。本次扫描发现 3 处类似情况,登记作为后续统一治理项。

**扫描工具**:`.claude/scratch/scan_reason_density.py`(commit 6.11 立)· 检测规则:
- 同一句(以 `;` `,` `。` `;` 切分)中含 **2+ 个不同性质的百分比关键词**(占比/同比/增速/份额/良率/毛利率等)
- 且该句含 **2+ 个 % 数字**
- 同时满足 → 标记为"语义可能混淆"

**本次扫描发现 3 处**(✅ 2026-07-03 已全部治理完成):

| stock | dims6 维度 | 风险描述 | % 数字 | 涉及关键词 | 状态 |
|---|---|---|---|---|---|
| **300476 胜宏科技** | barrier(score=5) | "显卡 PCB 全球~50%(Prismark)+100+ 层技术储备/70 层量产+**AI 占比 43.20%**(巨潮 2025 年报)" —— 50% 是**市占率**,43.20% 是**AI 占 PCB 业务**,两数字挤在同一句 | 50.0 / 43.2 | 市占 / 占比 | ✅ 已拆分 |
| **603228 景旺电子** | barrier(score=4) | "60 层 AI 服务器板 99.2% 良率,行业第一梯队)+ mSAP 工艺光模块 PCB 毛利率 40% + **高端客户占比 71%**" —— 99.2% 是**良率**,40% 是**毛利率**,71% 是**客户占比**,3 个不同性质 % | 99.2 / 40.0 / 71.0 | 良率 / 毛利率 / 占比 | ✅ 已拆分 |
| **605006 山东玻纤** | visibility(score=3) | "营收同比 +25.06%(2024→2025)/ 归母净利亏损同比收窄 86.4%(从 -0.9893 亿到 -0.1343 亿)/ 2026Q1 短暂盈利(baostock 显示 2026-03-31 PE +458.42 倍)/ 2025 年报披露电子布+玻纤纱**主营占比 83.88%**(L1 akshare)" —— 25.06% 是**营收同比**,86.4% 是**亏损收窄**(B 类信号),83.88% 是**主营占比**,3 个不同性质 % | 25.06 / 86.4 / 83.88 | 同比 / 收窄 / 占比 | ✅ 已拆分 |

**✅ 治理结果(2026-07-03)**:3 处 reason 字段已按"每个百分比 + 显式口径前缀"重写,**数据值全部保持不变**,仅优化表述清晰度:
- 300476 barrier:`显卡 PCB 全球市占率 ~50%(市占率口径·Prismark 2026) / … / AI 营收占比 43.20%(嵌套口径:AI 占 PCB 业务·巨潮 2025 年报)`
- 603228 barrier:`良率 99.2%(良率口径·行业第一梯队) / … 毛利率 40%(毛利率口径) / 高端客户占比 71%(客户结构占比口径)`
- 605006 visibility:`营收同比 +25.06%(同比增速口径) / 亏损同比收窄 86.4%(亏损收窄口径·B 类信号) / … / 主营占比 83.88%(主营占比口径·L1 akshare)`
- `data/pcb.manual.js` 语法校验通过 · CHAINS 加载 OK

**完成定义**(后续统一治理时执行):
1. **拆分原则**:同一句中如果出现 2+ 个不同性质百分比,必须分行写,每行一个百分比 + 显式口径前缀(参见 §6.14)
2. **示例修正**:
   - 修改前:`26Q1 营收 62.14 亿+53.91%,归母 12.42 亿+62.9%,AI 营收占比升至~60%`
   - 修改后:`26Q1 营收 62.14 亿(+53.91% 同比)/ 归母 12.42 亿(+62.9% 同比)/ AI 营收占比 ~60%(嵌套口径)`
3. **优先级**:P3(数据可读性,非阻塞)· 与 §11.1 P0 / §11.2 P1 错峰处理
4. **批量修改建议**:下次刷新 dims6 任何字段时,顺带对相关 stock 同一句进行拆分

**违反本节 = §6.14 红线延伸(虽然本节本身不强制执行,但发现后必须登记,不得隐瞒)**。

**复用方式**(11 链扩展):
- 任何 stock 的 dims6 reason 字段新增/修改时,如发现"两个不同性质百分比挤同一句",必须按本节规则登记到该 chain 的 §11.X
- 扫描脚本可扩展支持 11 链(当前仅 PCB 链 38 只)

