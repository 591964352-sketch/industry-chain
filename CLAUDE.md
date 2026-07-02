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

- **605006 山东玻纤** · 6 维评分为兜底默认值（全 2 分 / 无 reason 字段）· **未走豆包 v2 真实查询**
  - 现状：durability/visibility/policy/supply/valuation/barrier 全 score=2，全 tier=estimate，无 reason
  - 同段位 idx 2 玻纤布 5 只 stock 中，**仅 605006 是兜底**（其余 4 只菲利华/中国巨石/宏和/中材都带 reason 字段）
  - **下一豆包批次必做**：按 §6.11 13 条硬约束 + §6.10 三重验证重新查询 6 维评分 + 补充 reason
  - 完成定义：6 维 score 不全相等 + 每维有 reason 字符串 + tier 不全为 estimate
  - 涉及文件：`data/pcb.manual.js` L1038-1069 stock 块

### §11.3 估值规则缺陷·下一批次可选核实项（优先级 P2 · 低于 §11.1）

- **688183 生益电子** · valuation 维度反向差异（唯一一只实际 score < §10 理论值）
  - 实际 score=2 · 理论 score=3（§10 规则）· PE 分位 59.50%
  - 全场 28 处 valuation 差异中**唯一反向**（其余 27 只都是实际 > 理论，反映 §10 估值规则普遍偏严；688183 反向说明该只实际估值确实便宜但被打分较高）
  - **待复核方向**：当前 score=2 是否反映 dims6 录入当时（commit 5.2 P0 升级）的特殊背景？是否需补 evidence / reason 说明打折逻辑？
  - 完成定义：补 reason 字段说明估值打 2 分的依据，或维持现状并在 metadata 标注
  - 涉及文件：`data/pcb.manual.js` L1114 stock 块 dims6[4] valuation

### §11.2 双层架构悬空 stock（page_audit 第【7】项 FAIL 阻塞）

- **000657 中钨高新** · 仅 `data/pcb.manual.js` 有 · `pcb.js` segments/midstream/chokePoints 均无
  - position 描述:"硬质合金/钨钼制品龙头·PCB 微钻与硬质合金棒材"
  - **决策选项**:A) 补到 `pcb.js` idx 7 钻针段位 · B) 从 `pcb.manual.js` 删除(非 PCB 主业)
  - 当前 commit 5.9 起被 page_audit 第【7】项标记 FAIL · 不得 commit

- **300179 四方达** · 仅 `data/pcb.manual.js` 有 · `pcb.js` segments/midstream/chokePoints 均无
  - position 描述:"PCD/PCBN 复合超硬材料·钻针配套"
  - **决策选项**:A) 补到 `pcb.js` idx 7 钻针段位 · B) 从 `pcb.manual.js` 删除(配套非主营)
  - 当前 commit 5.9 起被 page_audit 第【7】项标记 FAIL · 不得 commit

**决策建议(投顾定夺)**:两者均为 PCB 钻针段位(idx 7)的配套标的,业务相关但 pcb.js 渲染层未展示。如保留,**建议补到 idx 7 段位**;如认定非主营,**从 manual.js 删除并保留 audit 记录**。

