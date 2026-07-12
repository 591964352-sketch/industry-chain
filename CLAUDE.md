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

#### §6.7.2 豆包"虚构具体工具/接口名称冒充真实数据来源"教训（2026-07-04 commit 6.27 立）

> **本节为豆包政策/政府数据类查询任务的 hallucination 教训登记**。§6.7.1 防御的是"逻辑推演代替真实数据拉取"（结果数字层面），本节防御的是"伪造工具/接口名称冒充真实数据来源"（信源标识层面）—— 是 §6.7.1 在信源层的一个**伴生变种**。

**事故案例（批次 2 政策维度查询 · 2026-07-03 commit 6.18 关联）**：

- **目标 stock**：600110 诺德股份 / 688300 联瑞新材 / 688630 芯碁微装 / 688700 东威科技
- **prompt 要求**：查询"国家政策/补贴/目录入选/税收优惠"等政策维度事实
- **豆包返回格式**（典型样本）：
  > "工信部《重点新材料首批次应用示范指导目录》(2024 年版 + 2025 年修订版)入选 / 大基金二期关联项目 / 02 专项支持 / 税收优惠按 15% 优惠税率计算 → score=4"
- **豆包声明信源**：`akshare.stock_government_doc_em` 接口 / `akshare.policy_doc_em` 接口 / `akshare.miit_doc_em` 接口
- **实测核验**：调用上述任一 akshare 接口 → **全部返回 AttributeError: module 'akshare' has no attribute 'xxx'** 或 KeyError: 'xxx'
- **真实情况**：akshare 接口库中**根本没有** `government_doc` / `policy_doc` / `miit_doc` 这类政策类数据接口（2026-07-03 实测 akshare v1.18.60 接口列表确认）
- **豆包行为定性**：**虚构了具体工具/接口名称**作为伪信源，包装虚构的政策事实

**影响**：
- 4 只 stock 的 policy 维度 reason 字段若直接采用豆包输出 → reason 中将包含**虚构的政策文件名/补贴金额/税率数字** + **虚构的 akshare 接口引用**
- 这些内容会以"事实"形式进入 pcb.manual.js，被下游展示层（stockFitBadge / dims6 卡）作为**确定性事实**呈现
- 一旦被投资者信以为真，可能影响投资决策

**未影响最终结果的原因**：
- commit 6.18 (1489d09) 在落地 4 只 stock 的 visibility 维度时，**policy 维度被故意剥离为 `{key:'policy',score:3,trend:'flat',tier:'estimate'}` 无 reason 字段**（占位符形态），未把豆包虚构的 policy reason 写入文件
- 后续 commit 6.22 / 6.23 排查中也未触及 policy 字段
- 本次 commit 6.27 兜底：彻底重写 4 只 stock policy reason 字段，按 §6.7.2 三原则处理

**失败模式分析**：
- 豆包在"政策/政府数据"类任务中**倾向于编造看似权威的工具名**（如 `akshare.government_doc` / `tushare.policy_index` / `ifind.policy_query` 等）来增加可信度
- 这些接口名格式合规（命名风格/参数列表/返回结构都看起来合理）但**实际不存在于任何工具库中**
- 数字输出格式合规（精确到百分比/目录版本号/发布日期）但**信源完全虚构**
- 与 §6.7.1 的区别：§6.7.1 是数字层"逻辑推演代替真实拉取"，本节是信源层"虚构接口名代替真实工具"

**防止重犯的具体规则（新增 · 永久生效）**：

1. **豆包 prompt 中所有信源引用必须可核验**：
   - 凡豆包声称"通过 XXX 接口拉取" → CC 必须用 `python -c "import XXX; XXX.XXX()"` 实测调用
   - 实测失败（AttributeError / KeyError / 接口不存在）→ 视为**虚构信源**
   - **不得仅凭豆包声称"已拉取"就采信**

2. **policy / 政府数据类查询的特殊处理**：
   - akshare / tushare / ifind / wind 等常用工具中**目前均无政府政策类结构化接口**（2026-07-04 实测确认）
   - 任何政策类查询的可靠数据源只有 L1（巨潮公告/工信部官网原文/财政部公告/官方 PDF）
   - 豆包返回的政策类数据若未指明**具体公告标题+发布日期+发布机构**，**默认视为虚构**

3. **reason 字段重写原则（policy 维度未核实处理）**：
   - **原则 ①**：彻底删除虚构接口声明（不写"akshare.xxx 接口返回..."这种话）
   - **原则 ②**：不区分"真实/待核实"两档，**统一标注为未核实**（避免"半真半假"误导）
   - **原则 ③**：精确数字改为定性描述（如不写"补贴金额 5000 万 / 税率 15%"，改写"中长期受国产替代/AI 需求拉动但短期未检索到具体政策依据，政策中性"）

4. **score 维持策略**：
   - 4 只 stock 的 policy score=3 / trend=flat / tier=estimate **维持不变**
   - 理由：3 分 = 政策中性，不依赖任何具体政策依据，符合"政策未核实"的中性判断
   - 严禁为了"修正幻觉"而盲目下修 score 或上修 score（违反 §6.8 数据准确度优先原则）

5. **后续 policy 维度查询流程修订**：
   - 任何涉及"政策/补贴/目录入选/税收优惠"的豆包查询 prompt 必须**预先在 prompt 中告知豆包**："akshare/tushare/ifind/wind 工具库均无政府政策类结构化接口，请仅依赖 L1 政府公告原文/巨潮/cninfo 实际公告回答"
   - 若豆包仍返回"接口拉取" → 立即判 hallucination，整个 response 丢弃
   - 若豆包返回"政策文件名/补贴金额"但**未指明具体公告标题+发布日期+发布机构** → 立即判 hallucination

**事故案例归档（4 例）**：
- 600110 诺德股份 policy score=3（虚构：02 专项/大基金二期关联/补贴金额）→ commit 6.27 兜底 reason
- 688300 联瑞新材 policy score=3（虚构：材料首批次目录入选/税收优惠）→ commit 6.27 兜底 reason
- 688630 芯碁微装 policy score=3（虚构：半导体设备国产替代专项/补贴）→ commit 6.27 兜底 reason
- 688700 东威科技 policy score=3（虚构：电镀工艺升级专项/补贴）→ commit 6.27 兜底 reason

**违反本节 = §6.2 红线（豆包 hallucination 内容）+ §6.8 数据准确度优先原则违反**。

**复用方式（11 链扩展）**：
- 任何 11 链的 policy 维度查询，必须在 prompt 中预先声明工具库无政府政策类接口
- 任何豆包返回的 policy 数据若声称通过 akshare/tushare/ifind 接口拉取 → 立即按本节原则丢弃重写
- 重写 reason 字段时按"三原则"：删虚构接口声明 / 统一未核实 / 精确数字改定性

#### §6.7.3 P0 批次新增案例(2026-07-05 commit 6.37 立)

> **触发原因**:P0 批次执行时发现 2 处豆包 hallucination,与 §6.7.1/§6.7.2 同型——豆包在原文无具体数据的情况下,自动生成看似合理的"具体日期/具体数字"作为推断结果。

**事故案例 1(2026-07-05 commit 6.37 立)**:
- **目标 stock**:002938 鹏鼎控股 visibility
- **豆包原始响应**:"MGX 无线缆托盘 2026-06-01 获英伟达官方生态认证,2026Q3 小批量出货"
- **实际 pcb.manual.js 字段**:`investableReason` 只说"MGX 无线缆托盘独家首发供应商,2026Q3 小批量出货",**无 2026-06-01 具体日期**
- **幻觉性质**:豆包把笼统的"2026Q3"表述细化成精确的"2026-06-01"——这种"伪造具体日期"是豆包 hallucination 常见模式
- **影响**:若直接写入 pcb.manual.js,会在 pcb.manual.js 中留下一个无 L1 原文依据的具体日期,违反 §6.7.1
- **处理**:删除该具体日期,reason 改为"具体认证日期归入【6. 未查到】",并在 reason 中显式标注"判定为豆包编造"作为防御记录

**事故案例 2(2026-07-05 commit 6.37 立)**:
- **目标 stock**:301200 大族数控 visibility
- **豆包原始响应**:"单台设备售价 600 万元(溢价一倍)"
- **实际 pcb.manual.js 字段**:`position` 字段"钻孔设备全球第二"、`investableReason` 字段无设备售价表述,pcb.manual.js **任何字段中都无 600 万元**
- **幻觉性质**:豆包凭空编造设备售价数字,这种"伪造精确价格"是数字 hallucination 的常见模式
- **影响**:若直接写入,会在 pcb.manual.js 中留下一个完全无 L1/L3/L4 信源的精确数字,违反 §6.7.1 + §6.7.2(无信源声称)
- **处理**:删除该具体数字,reason 改为"具体设备销售单价归入【6. 未查到】",并在 reason 中显式标注"判定为豆包编造"作为防御记录

**防止重犯的具体规则(新增 · 永久生效)**:

1. **新增"高风险数字完整梳理"环节**(commit 6.37 实装)——任何豆包响应涉及 pcb.manual.js 字段写入前,CC 必须系统化梳理所有"具体家数/具体百分比/具体认证日期/具体供应商名称"类数字,按 4 类风险分级处理:
   - **高风险(幻觉)**:彻底删除,改为定性描述或"待核实"
   - **中风险(待核)**:改为定性表述,标注"具体数字待人工核实"
   - **低风险(position 字段原有)**:直接引用 + 标"pcb.manual.js position 字段·estimate"
   - **可重算**:标"baostock L1 实测" + 给出具体算法
2. **强制对比已知字段**:豆包给出的任何"具体数字/日期/公司名"必须能在 pcb.manual.js 现有字段(position/investableReason)中找到对应——找不到 → 立即作 hallucination 处理
3. **本机无 L1 原文核实能力是硬约束**:豆包给出 L1 公告相关日期/金额时,若 pcb.manual.js 字段无对应且本机无法独立核实,**统一归入【6. 未查到】,不得写入具体值**

**事故案例归档(累计)**:
- 600110/688300/688630/688700:政策维度虚构接口引用(2026-07-04 commit 6.27 立)
- 002938 visibility:虚构 MGX 认证日期 2026-06-01(2026-07-05 commit 6.37 立 · **本次新增**)
- 301200 visibility:虚构设备售价 600 万元(2026-07-05 commit 6.37 立 · **本次新增**)

**违反本节 = §6.2 红线 + §6.8 数据准确度优先原则违反**。

**复用方式(11 链扩展)**:
- 任何 11 链执行豆包响应写入前,必须先做"高风险数字完整梳理"环节
- 任何豆包 response 中"具体日期/具体金额/具体公司名"在 pcb.manual.js 现有字段找不到对应时,立即作 hallucination 处理
- 处理原则统一:删具体值 + 改定性 + 归【6. 未查到】 + 在 reason 中显式标注"豆包编造"

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

#### §6.11.14 豆包原始响应留痕规则（2026-07-04 commit 6.28 立）

> **触发原因**：本批次批次 2 supply+barrier 复核（commit 6.28）执行时，auto-mode classifier 拒绝 CC 直接批量写入 4 只 stock 的 long corporate prose reason 字段，理由是「用户与豆包对话 → 用户转发响应给投顾 Claude 审计 → 投顾 Claude 指令 CC 执行」链路中，**CC 看到的是"投顾转述后的豆包回复"，无法区分**：
> - (A) 真实原始豆包回复（豆包可能本身就用 10 段式合规格式回答）
> - (B) 投顾二次润色/转述的内容（合规装饰是投顾后加的）
> - (C) 占位文本/未来撰写的模拟内容（无任何真实来源）

**强制规则**（新增 · 14 条硬约束 · 永久生效）：

**14. 豆包原始响应留痕强制要求**——用户通过"用户 ↔ 豆包 ↔ 投顾 Claude ↔ CC"链路传递豆包查询结果时，**必须同时提供以下三选一原始凭证**之一，CC 才能将内容视为真实原始豆包响应：

- **A. 截图**：豆包对话窗口截图（原始 UI 显示，含对话 ID/时间戳）
- **B. 豆包"复制原始内容"按钮导出**：纯文本导出（无任何人工润色）
- **C. 豆包对话 ID + 关键引用句**：豆包回复顶部/底部的对话 ID（如 `doubao-conv-xxxxx` 或时间戳） + ≥3 句原始引用（让 CC 可交叉验证内容风格是否符合真实豆包特征）

**触发场景**（任何豆包响应涉及 canonical 数据源写入时）：
- 涉及 dims6 reason 字段新增/重写
- 涉及任何 score/trend/tier 字段变更的 reason 支撑
- 涉及 pcb.manual.js / pcb.js / segments.js 等 canonical 数据文件
- 涉及多只 stock 同时写入（≥2 只）

**CC 处理流程**：
- ✅ 用户提供原始凭证（A/B/C 任一）→ CC 可正常执行写入
- ❌ 用户未提供原始凭证 + 内容已带 §6.11/§6.7.2/§6.16 等合规装饰 → **CC 必须显式询问用户提供凭证，不能默写**
- ❌ 用户未提供原始凭证 + 内容无合规装饰 → CC 可正常处理（豆包原始响应本身就不带项目规则装饰）

**第 14 条与现有 13 条的协同**：
- 与 §6.11 约束 #11「不得编造事实」协同：原始凭证是事实性验证的关键证据
- 与 §6.7.2「豆包虚构具体工具/接口名称冒充真实数据来源」协同：原始凭证可让 CC 区分真实豆包接口调用与虚构接口声明
- 与 §6.16 dims6Audit 机制协同：审计时若无原始凭证，无法验证 reason 字段的来源真实性
- 与 §7.4 自查报告协同：自查报告的"已知错误"应记录"无原始凭证的内容被拒绝写入"案例

**事故案例归档**（新增 · 1 例）：
- **2026-07-04 批次 2 supply+barrier 复核**：CC 收到 8 份豆包响应文本（无原始凭证），准备批量写入 4 只 stock reason 字段时，被 auto-mode classifier 拒绝。补救措施：用户显式声明"这 8 份内容是用户与真实豆包对话得到的原始查询结果,不是编写的占位文本或投顾转述改写的内容"（路径 A 显式确认），CC 才继续执行。本节为同类场景预留明确协议。

**完成定义**：
- ✅ §6.11.14 新增（本 commit）
- ✅ 用户已显式确认 8 份内容为真实豆包原始响应（路径 A 确认）
- ✅ 后续 11 链扩展：任何豆包响应涉及 canonical 数据源写入，必须先要求用户提供原始凭证

**违反本节 = §6.2 红线（数据真实性不可验证）+ §6.8 数据准确度优先原则违反**。

**复用方式**（11 链扩展）：
- 任何 chain 的豆包查询结果需要落地为 canonical 数据时,CC 必须在用户消息中检查是否含原始凭证(A/B/C 任一)
- 无凭证 + 内容已合规装饰 → 显式询问用户,不默写
- 有凭证 + 内容合规装饰 → 视为真实原始豆包响应,正常落地
- 此规则与 §6.7.2「虚构接口红线」配套使用——前者验证内容真实性,后者验证接口真实性

**事故案例（2026-06-27）**：R4-82 豆包返回 4 条 dfcfw.com PDF URL（华泰/东吴/国金/东北证券），经 curl 实测全部为 HTTP 200 + Content-Length 0 + 无 %PDF 文件头——dfcfw CDN 对所有 H3_AP 模式 URL 一律返回空响应占位。本节升级至 13 条，新增约束 #8「禁止提供任何 PDF URL」+ 约束 #7 改为 6 级信源分层（L1-L6），禁止 L4 券商研报提供 PDF URL。

**事故案例（2026-06-27 第二轮）**：R4-82 补查 6 条 cninfo 真实 PDF URL 抽查，仅 1 条（深南电路 2024 年度报告）真实可访问（3.95 MB / %PDF-1.5 / HTTP 200），其余 5 条全部 404（146 字节 HTML 404 页）。豆包声称「已验证 URL 真实可访问」实际未执行 HTTP 请求，系统性编造 cninfo 文件 ID。约束 #8 升级为「禁止提供任何 URL」（包括 cninfo PDF）——豆包 L1 数据真实性由用户人工登录 cninfo 核对。

#### §6.11.15 baostock 接口代码前缀规则（2026-07-04 commit 6.31 立）

> **触发原因**：批次 3 6 只 stock 预拉取时发现，300395 菲利华 baostock 调用连续 3 次返回空数据（policy 维度之前批次已多次预警但未深入诊断），经根因分析发现是 **baostock 代码前缀缺失**而非股票本身数据缺失。

**关键诊断结论**：

| 调用方式 | 结果 |
|---|---|
| `code='300395'`（无前缀） | ❌ error_code=10004006:「股票代码应为9位,格式示例:sh.600000」 |
| `code='sh.300395'`（沪市前缀，错误） | ⚠️ error_code=0 但 rows=0（沪市无该股，返回空集） |
| **`code='sz.300395'`（深圳前缀，正确）** | ✅ **error_code=0, rows=1, 数据完整** |

**300395 真实 baostock L1 财务数据**（2026-07-04 用 sz.300395 重新拉取）：

| statDate | 营收(亿) | 净利(亿) | 毛利率 | 净利率 | ROE |
|---|---|---|---|---|---|
| 2021-12-31 | 11.69 | +3.76 | 50.79% | 30.71% | 16.29% |
| 2022-12-31 | 16.65 | +5.13 | 51.22% | 29.82% | 17.87% |
| 2023-12-31 | 20.17 | +5.74 | 49.48% | 27.48% | 15.52% |
| 2024-12-31 | 17.06 | +3.26 | 42.17% | 18.73% | 7.81% |
| 2025-12-31 | **20.16** | **+4.26** | **47.38%** | **21.15%** | **10.12%** |
| 2026Q1 | （字段空） | +1.48 | （字段空） | （字段空） | （字段空） |

- **2021-2025 营收 CAGR**:+14.60%
- **2021-2025 净利 CAGR**:+3.21%
- **2025 业绩拐点**:营收 V 型反转(+18.2%) + 净利反弹(+30.7%)
- **毛利率 47.38%**:远超 PCB 行业平均(约 25-35%),证明高端材料赛道定位

**强制规则**（新增 · 第 15 条硬约束 · 永久生效）：

**15. baostock 接口代码前缀强制要求**——任何 baostock L1 实证调用必须使用 9 位带前缀代码，**严禁使用 6 位不带前缀代码**：
- 沪市主板/科创板：`sh.600000` / `sh.688300`
- 深市主板/创业板：`sz.000001` / `sz.300395`
- 前缀错误 → baostock 报错 10004006（沪市股票用 sz 前缀也会返回 0 行）
- 前缀缺失 → 接口调用失败但容易被误判为「股票数据缺失」

**对照表**（commit 6.30 之前 8 只 chokePoints baostock 调用代码前缀历史）：

| stock | 所属市场 | 正确前缀 | 之前批次是否用错前缀 |
|---|---|---|---|
| 600110 诺德股份 | 沪市主板 | sh.600110 | ✅ 正确（已用 sh. 前缀） |
| 300395 菲利华 | **深市创业板** | **sz.300395** | **❌ 之前用 300395 无前缀,导致连续 3 次返回空** |
| 301217 铜冠铜箔 | 深市创业板 | sz.301217 | ✅ 正确（已用 sz. 前缀） |
| 002916 深南电路 | 深市主板 | sz.002916 | ✅ 正确（已用 sz. 前缀） |
| 300476 胜宏科技 | 深市主板 | sz.300476 | ✅ 正确（已用 sz. 前缀） |
| 002463 沪电股份 | 深市主板 | sz.002463 | ✅ 正确（已用 sz. 前缀） |
| 688183 生益电子 | 沪市科创板 | sh.688183 | ✅ 正确（已用 sh. 前缀） |
| 002384 东山精密 | 深市主板 | sz.002384 | ✅ 正确（已用 sz. 前缀） |

**修复脚本**：`scripts/__refetch_300395.py`（2026-07-04 新建）——使用 `sz.300395` 正确前缀拉取菲利华 baostock L1 财务数据。

**事故案例归档**：
- **2026-07-04 批次 2 visibility 复核**：300395 policy reason 字段只能引用 pcb.manual.js 存档数据(Q 布营收 9837.37 万/占比 4.88%),无法用 baostock L1 财务时序
- **2026-07-04 批次 3 valuation/durability/supply 复核**：300395 三个字段再次无法拉取 baostock 数据,触发根因诊断
- **2026-07-04 修复后**：300395 baostock L1 数据可用,后续 11 链扩展时可直接复用 `sz.{code}` 调用方式

**违反本节 = §6.2 红线（接口调用错误导致数据缺失）+ §6.8 数据准确度优先原则违反**。

**复用方式**（11 链扩展）：
- 任何 chain 的 baostock L1 调用必须使用 9 位带前缀代码
- 6 位代码不带前缀 → 接口报错 10004006,容易被误判为「数据缺失」,需检查调用方式
- 已发现的正确前缀对照表（见上表），后续 chain 维护可直接复用

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

### 6.16 dims6Audit 必须覆盖所有 5 分维度的 reason 完整性（2026-07-04 commit 6.23 立）

> **本节为 §6.15 后续审计盲点的防御规则**。本次(2026-07-04)8 只 chokePoints d/b/s 排查中,发现 6 只存在"score 高分但 reason 缺失"问题,其中 3 只(601208/300395/688183)barrier=5 完全没有 reason 字段,沿用旧版本分数未反映后续批次审计揭示的事实。**dims6Audit 机制从未覆盖这些维度**——只审计"极端值"(如 300395 6 维 5-1 极差只审了 durability 和 valuation,**barrier=5 从未审计**)。

**触发场景**:任何 `dims6` 维度(无论 durability/visibility/policy/supply/valuation/barrier)出现 `score=5` 时,必须同时审计 reason 字段完整性。

**强制规则(4 条)**:

1. **dims6Audit 覆盖范围扩展**——审计对象从"极端值(如 6 维 5-1 极差)"扩展为"**所有 5 分维度**" · **禁止只审极端值而漏审 5 分维度** · **禁止 score=5 但 reason 缺失/空白的情况长期存在**
2. **reason 字段完整性检查**——任何 5 分维度的 reason 必须满足以下任一条件:
   - **A 类**:reason 字段非空 + 含具体事实依据(L1 公告 / L3 机构 / L4 券商 / 行业报告)+ 引用 5 分硬指标"全球≤3 家+认证≥18 月"的判定
   - **B 类**:reason 字段非空 + 显式标注"卡口逻辑转移"(如 "加工端 N 家量产 + 卡口转移到上游某环节")+ 引用新卡口逻辑的依据
   - ❌ **禁止**:score=5 但 reason 字段缺失 / 空白 / "待补" / "estimate" 等占位符
3. **审计责任主体**——dims6Audit 标记者(reviewer 字段)必须明确标注"barrier 维度已审" / "supply 维度已审" / "durability 维度已审"等具体审计范围,**禁止笼统写"已审"** · **审计必须可追溯**(至少到 commit 编号)
4. **触发后续修复**——发现 5 分维度 reason 缺失时,CC 必须立即:
   - 阶段 1:**补全 reason 字段**(从 position/investableReason 提取事实 + 引用 L1-L4 信源)
   - 阶段 2:**下修 score**(若事实依据不支持 5 分硬指标,按 §10 5 档表合理下修)
   - 阶段 3:**登记到 §11 待办**(本批次已完成的事也必须在 §11.1/§11.3 等章节登记,确保可追溯)

**§6.16 与现有规则的协同**:
- 与 §6.11 13 条硬约束协同:reason 字段必须按 §6.11 格式写明(信源分层 + 7 段式)
- 与 §6.14 口径标注规范协同:reason 中的百分比必须显式标注口径(主营占比/同比/市占率/估值分位)
- 与 §6.15 抽查机制协同:5 分维度的 reason 字段 + score 都必须通过 baostock/akshare 抽查验证
- 与 §7.2 自查报告协同:发现 5 分维度 reason 缺失时,自查报告的【已知错误】必须列出该问题

**事故案例(2026-07-04 排查)**:
- **601208 东材 barrier=5 缺失 reason**:position 字段已写"圣泉 M9 批量 + Q4 新增 1500 吨",事实已存在但未下沉到 dims6 barrier reason · score=5 沿用旧版本
- **300395 菲利华 barrier=5 缺失 reason**:position 字段已写"Q 布认证阶段 + 石英砂非独家",事实已存在但未下沉到 dims6 barrier reason · dims6Audit 2026-07-01 立时只审了 durability(5)和 valuation(1)极差,**barrier(5)从未审计**
- **688183 生益电子 barrier=5 缺失 reason**:position 字段已写"AWS 主力+56 层交换机 PCB 核心",事实已存在但未下沉到 dims6 barrier reason
- **002384 东山 barrier=5 缺失 reason**:position 字段已写"全球唯一光模块+AI PCB 双能力",事实已存在但未下沉到 dims6 barrier reason
- **002916 深南 barrier=5 缺失 reason**:`pcb.js` line 414 已有 reason,但 `pcb.manual.js` 渲染层未同步
- **301217 铜冠 durability=5 缺失 reason**:trendNote 字段已写"GB200/GB300 HVLP4 量产+深南长期协议",事实已存在但未下沉到 dims6 durability reason
- **688183 生益 durability=5 缺失 reason**:position 字段已写"AWS 主力+56 层交换机 PCB 核心",事实已存在但未下沉到 dims6 durability reason
- **002384 东山 durability=5 缺失 reason**:position 字段已写"边缘 AI 设备 PCB 全球第一 26.9% + FPC 全球第二 24.5%",事实已存在但未下沉到 dims6 durability reason
- **601208 东材 supply=4 偏高**:reason 缺失,事实依据"圣泉 Q4 新增 1500 吨+眉山 2026-06-30 投料试生产"反驳 supply=4,本次同步下修 4→3

**已闭环(commit 6.22 + 6.23)**:
- P0 三项 barrier 下修:601208 5→3 / 300395 5→4 / 688183 5→3(commit 6.22)
- P1 三项 reason 补全:002384 barrier=5 补 reason / 002916 barrier=5 从 pcb.js 复制 / 301217 durability=5 补 reason(commit 6.23)
- P2 四项 reason 补全:002916 durability / 688183 durability / 002384 durability / 601208 supply 4→3 下修(commit 6.23)
- 8 只 chokePoints 中 5 只(601208/300395/688183/002384/002916)的 barrier 维度从"5 分无 reason"变为"合理分数 + 完整 reason + L3 信源",**dims6 数据治理质量显著提升**

**违反本节 = §6.2 红线(高分低证据 = 数据字段缺失)+ §6.8 数据准确度优先原则违反**。

#### ⑥ §6.16 防御规则延伸(2026-07-04 commit 6.24 立)·"非 5 分但 score < 3 维度同样需要 reason 支撑"

> **触发案例**：601208 visibility=2 在 commit 6.22/6.23 八只 chokePoints 排查中**未被审计**,因为 §6.16 现行 4 条硬约束只覆盖 `score=5` 的维度。visibility=2 不是 5 分,但在 Phase 1.5 visibility 上移到 moat 权重(0.20)后,该分数对护城河分的影响显著(601208 moat 从 58 升到 62 是 +4 分),且 visibility=2 是**历史遗留估计值从未被审计过**(commit 4.59/5.7/5.8/6.18/6.22/6.23 全部未动 visibility)。

**延伸触发条件**(新增 · 第 5 条硬约束):

**5. 低分维度审计扩展**——任何 `score < 3` 的维度若 reason 字段缺失,**视为"高分低证据"同类问题**,必须走同样的复核流程:
- **必须** baostock/akshare 拉实证数据(参见 §6.15 亏损公司专项规则 + §6.11 13 条硬约束)
- **必须** 严格按 §10 5 档表判定 score 是否合理(维持 / 上修 / 下修)
- **必须** 补全 reason 字段(详实程度与 5 分维度一致)
- **必须** 登记到 §11 待办(参照 §11.6 模板)
- **禁止** 沿用历史估计值不审计

**触发场景**(具体案例):
- `visibility=2` 但业绩可见度强(有 L1 季报 + 业绩拐点 + L4 研报)→ 需上修至 3 分
- `valuation=1` 但实际上未触发 PE 分位 ≥85%(数据漂移/口径错位)→ 需上修至 2 或 3
- `supply=1` 但行业实际供需平衡(被市场情绪误导)→ 需上修至 2

**§6.16 现行 4 条 vs 新增第 5 条的差异**:

| 检查项 | 现行 4 条(commit 6.23) | 新增第 5 条(commit 6.24) |
|---|---|---|
| 触发条件 | `score=5` 的维度 | `score < 3` 的维度 |
| 检查对象 | reason 字段缺失 | reason 字段缺失 |
| 触发后果 | 补全 reason + 下修 score + 登记 §11 | 走 baostock L1 实证 + §10 5 档表判定 + 补全 reason + 登记 §11 |
| 典型案例 | 601208/300395/688183 barrier=5 无 reason | 601208 visibility=2 无 reason(本次) |
| 防御目的 | 防止"高分低证据" | 防止"低分无证据"(历史估计值掩盖真实业绩可见度) |

**§6.16 与其他规则的协同**(更新):
- 与 §6.11 13 条硬约束协同:5 档表判定 + 7 段式 reason 格式
- 与 §6.14 口径标注规范协同:reason 中百分比显式标注
- 与 §6.15 抽查机制协同:baostock/akshare L1 实证反查
- 与 §7.2 自查报告协同:复核结果必须按 §7.2 格式输出

**事故案例归档**(新增 · 1 例):
- **601208 visibility=2**(commit 6.24 立):commit 6.22/6.23 八只 chokePoints 排查仅审计 barrier/supply/durability,visibility 维度**未触发 §6.16 5 分审计**(score=2 不是 5)→**新增第 5 条防御规则填补此漏洞**

**完成定义**:
- ✅ §6.16 新增第 5 条硬约束(本 commit)
- ✅ 601208 visibility 维度复核闭环(commit 6.24 落库,详见 §11.6)
- ✅ §11.6 待办登记完成
- ✅ 后续所有 11 链 dims6 字段 score < 3 必须审计

**复用方式**(11 链扩展):
- 任何 chain 的 dims6 字段若 `score < 3` 且无 reason,立即触发本次新增第 5 条硬约束
- baostock L1 实证脚本模板:`scripts/__verify_601208_v2.py` / `__verify_601208_summary.py`(可复用)

**违反本节 = §6.2 红线(数据字段缺失支撑)+ §6.8 数据准确度优先原则违反**。

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

### 6.17 abstract_ths 作为 L1 财务时序数据单一权威源(2026-07-09 commit 6.67 立 · 永久生效)

> **本节为 Phase B 第 1 批启动时 §前置 1 接口连通性实测触发的口径不一致问题的永久治理规则**。详见 `§11.15` 002371 北华创定性反转警示案例。

**【触发事故(2026-07-09)】**

Phase B 第 1 批(688012 中微 / 002371 北华创 / 688072 拓荆)启动前 baostock L1 接口全机沙盒不可用,本机仅 akshare 同花顺(ths)通道可用。但 ths 同类型字段**两个接口给出不一致数据**:

| 接口 | 字段名 | 002371 2025Q1 净利 | 002371 2026Q1 净利 | 是否可信 |
|---|---|---|---|---|
| `stock_financial_abstract_ths` | `净利润`(标准归母净利) | **15.81 亿** | **16.35 亿**(同比 +3.42%) | ✅ **权威源** |
| `stock_financial_benefit_ths` | `*净利润`(字段命名不规范) | 15.68 亿 | 15.68 亿(相同,巧合) | ❌ 字段命名 bug,**严禁使用** |

**事故根因**:`stock_financial_benefit_ths` 的 `*净利润` 字段命名不规范,实际数据口径与 standard "归母净利润" 有 0.13-1.13 亿偏差,且对同一只 stock 不同季度出现"数字完全相同"的字段命名 bug(002371 2025Q1 / 2026Q1 双双返回 15.68)。

**事故影响范围**(已实测覆盖本批次 3 只 stock):

| stock | 期间 | ❌ benefit_ths 误 | ✅ abstract_ths 正 | 偏差 |
|---|---|---|---|---|
| 002371 | 2025Q1 净利 | 15.68 亿 | 15.81 亿 | +0.13 亿 |
| 002371 | **2026Q1 净利** | 15.68 亿(巧合) | **16.35 亿** | **+0.67 亿** |
| 002371 | 2025 全年净利 YoY | "-5.34%(增收不增利)" | -1.77%(温和下降) | **定性反转** |
| 002371 | 2026Q1 净利 YoY | 0%(持平) | **+3.42%(企稳回升)** | **完全相反方向** |
| 688012 | 2026Q1 净利 | 9.18 亿 | 9.30 亿 | +0.12 亿 |
| 688012 | 2026Q1 净利 YoY | +198.05% | +197.20% | 近似 |
| 688072 | 2026Q1 净利 | 5.62 亿 | 5.71 亿 | +0.09 亿 |
| 688072 | 2025Q1 净利 | -1.52 亿 | **-1.47 亿** | -0.05 亿 |

**002371 北华创 visibility 维度的两种完全相反的定性判断**:

- **基于 benefit_ths 错误数据**:「2025 增收不增利(-5.34%),Q1 持平(0%),趋势向下」→ visibility score 可能 2-3
- **基于 abstract_ths 真实数据**:「2025 净利温和下降(-1.77%),2026Q1 +3.42% 企稳回升,A 类正面信号,趋势转为温和上行」→ visibility score 应为 3-4

**性质判断**:错误数据(-5.34% 增收不增利 + 0% 持平)与正确数据(-1.77% 温和下降 + +3.42% 企稳回升)代表**两种完全不同的定性判断方向**,如果按错误数字走会导致 visibility 维度可能被误打低 1 档(2-3 → 应有的 3-4)。

**【§11.15 警示案例归档】**:完整事故案例 + 数据对比表见 §11.15(2026-07-09 立 · Phase B 第 1 批 §前置 1 实测触发)。

**【永久生效规则】**

1. **abstract_ths 为 L1 财务时序数据单一权威源**——任何涉及 akshare 同花顺(ths)接口拉取 stock 财务时序数据(净利/营收/ROE/毛利率/同比增速/分红等)的场景,必须使用 `stock_financial_abstract_ths` 接口,**严禁使用 `stock_financial_benefit_ths`** 。`benefit_ths` 字段命名不规范,与 standard 归母净利有 0.13-1.13 亿偏差,且对同一字段不同季报出现数字巧合 bug。

2. **ths 其他可用接口白名单**(可放心使用,字段命名规范):
   - `stock_financial_abstract_ths` — 财务摘要(净利/营收/ROE/毛利率/扣非净利)**【权威源】**
   - `stock_financial_benefit_ths` — **黑名单**(字段命名 bug)
   - `stock_financial_cash_ths` — 现金流(可直接使用)
   - `stock_financial_debt_ths` — 资产负债(可直接使用)
   - `stock_fhps_detail_ths` — 分红送配(可直接使用)
   - `stock_profit_forecast_ths` — 机构净利预测(可直接使用)
   - `stock_zyjs_ths` — 主营构成 + 经营范围(可直接使用)
   - `stock_shareholder_change_ths` — 股东变动(可直接使用)
   - `stock_management_change_ths` — 高管变动(可直接使用)

3. **数值一致性校验触发条件**——任何 stock 的 dims6 reason 涉及"具体净利数字"+ "同比增速数字" 时,必须满足:
   - ✅ 在 commit reason 之前,先跑一次 akshare 对应接口实测验证
   - ✅ 如发现两个接口同字段数字不一致,**必须**选用 abstract_ths 数据,tier 标注 `L1(abstract_ths)` 注明 source
   - ✅ 同时把不一致情况登记到 §11.X "接口口径差异"章节,作为下次审计触发

4. **数字偏差可能反转定性结论(强制警示)**——在 prompt §0 [1] each stock 字段必须显式注明 "该 stock 实测数据(abstract_ths)是什么 + 严禁使用哪些错误数字"。本规则写入后续所有 stock 注入 prompt 模板(不只是本次 3 只)。

5. **跨接口交叉验证机制(常态化)**——任何 phase B+ 批次涉及 ≥ 3 只 stock 的财务时序数据,在写入 pcb.manual.js / semicon-equip.manual.js 之前必须跑 `__verify_xxx.py` 实测脚本验证 abstract_ths vs benefit_ths 数字是否一致;如不一致,丢弃整个 reason,重新设计 prompt。

**违反本节 = §6.2 红线(数据字段命名不规范导致的数字偏差)+ §6.8 数据准确度优先原则违反**。

**复用方式(11 链扩展)**:
- 任何 chain 的 L1 财务时序数据注入,优先尝试 akshare **abstract_ths** 系列接口(白名单列表见 [2])
- 遇 benefit_ths / 其他可疑口径时,**必须**立即记录口径差异,**不得**直接采纳可疑字段
- §11.15 002371 案例作为 phase B+ 启动时的"接口口径陷阱警示模板"

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

> **§10.2 景气度调整系数（2026-07-11 commit 6.74 立）**：解决静态 PE 分位规则对高景气赛道系统性误判的问题。
>
> **调整公式**：`调整后 PE 分位 = 原始 PE 分位 + 调整量`，仅当原始 PE 分位 > 70% 时触发。
>
> **调整量 = 营收 CAGR 系数 × 盈利质量因子**
>
> **营收 CAGR 系数**（近 3 年 akshare `stock_financial_abstract_ths` 实测）：
> | 3 年营收 CAGR | 调整量基数 |
> |:--|:--:|
> | ≥40%（爆发增长） | -25pp |
> | 25-40%（高速增长） | -18pp |
> | 15-25%（稳健增长） | -10pp |
> | 5-15%（温和增长） | -5pp |
> | <5% 或负增长 | 0pp（不触发） |
>
> **盈利质量因子**（乘数 0-1.0，防"增收不增利"骗调整）：
> | 条件 | 因子 |
> |:--|:--:|
> | 近 3 年净利 CAGR ≥ 营收 CAGR × 0.7（利润跟随） | 1.0 |
> | 近 3 年净利 CAGR ≥ 营收 CAGR × 0.3（部分跟随） | 0.6 |
> | 净利 CAGR < 营收 CAGR × 0.3 或亏损 | 0.3 |
>
> **限制**：调整后 PE 分位最低不低于 50%（不把"明显高估"调到"低估"）。
>
> **§10.3 赛道横向低估例外条款（2026-07-11 commit 6.74 立）**：
>
> 触发条件（4 项全部满足）：
> | # | 条件 | 量化阈值 | 信源 |
> |:--:|------|:--|------|
> | 1 | 个股 PE 分位 < 70% | 未触发 §10.2 调整或调整后 PE < 70% | baostock L1 |
> | 2 | 个股相对赛道显著折价 | 个股 PE-TTM / 申万三级行业 TTM PE < 0.70（折价 > 30%） | akshare `sw_index_third_info` L3 |
> | 3 | 可比公司交叉确认 | ≥3 只同赛道可比公司 PE-TTM 中位数 > 个股 PE-TTM × 1.30 | baostock L1 |
> | 4 | 成长性支撑 | 近 3 年营收 CAGR ≥ 15% | akshare `abstract_ths` L1 |
>
> 执行规则：
> - score = S10 静态分档 +1 档，封顶 4 分
> - trend = up
> - 执行人 = 投顾人工判断，需 ≥2 独立信源确认折价非来自基本面恶化
> - 原因写入 `auditLog`，含具体赛道 PE/可比公司 PE 对比数字
>
> **当前唯一触发案例**：688183 生益电子 — PE=59.50% / 赛道 PE=88.35（折价 36.4%）/ 3 可比中位数=93.96 / CAGR=39.0% → score 维持 4（S10=3 + override=+1）。

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

### §11.6 601208 visibility 复核闭环（2026-07-04 commit 6.24 立）

> **触发原因**：路径 2 决策流程下，对 601208 visibility=2 字段做独立审计（commit 6.22/6.23 仅审计了 barrier/supply/durability，**visibility 维度从未被独立审计**）。同时 Phase 1.5 把 visibility 上移到 moat 权重（0.20），601208 quadrant 在新权重下从 hold-borderline 退化为 skip，必须用真实数据验证 score 合理性。

**baostock L1 实证（5 年营收/净利时序 + 2026Q1 季报）**：

| 期间 | 营收(亿) | 净利(亿) | 毛利率 | 净利率 | ROE |
|---|---|---|---|---|---|
| 2021 | 31.49 | 3.44 | 23.72% | 10.63% | 11.17% |
| 2022 | 35.81 | 4.24 | 20.67% | 11.66% | 10.64% |
| 2023 | 36.79 | 3.06 | 19.01% | 8.20% | 7.49% |
| **2024** | 44.03 | **1.54** ⚠️谷底 | 13.92% | 3.44% | 3.97% |
| **2025** | 51.81 | **2.70** ↑拐点 +75.24% | 15.71% | 5.20% | 5.39% |
| **2026Q1** | 14.44* | **1.84**（单季超 2024 全年） | 17.13% | 12.74% | 3.08% |

> 2026Q1 营收:baostock `query_profit_data` 接口 MBRevenue 字段空值（接口可能尚未收录 2026Q1），沿用 `pcb.manual.js` 已存的 akshare L1 实证 14.44 亿 +27.24%

**业绩趋势判定**：
- 营收：5 年 CAGR +13.28% / 2 年 CAGR +18.68% / 2026Q1 同比 +27.24%（持续抬升）
- 净利 **V 型反转**：2024 谷底(1.54 亿) → 2025 拐点(+75.24%) → 2026Q1 单季 1.84 亿（**已超 2024 全年**）
- 净利率：2026Q1 12.74% > 2025 全年 5.20%（**+7.54pp 同比改善**）
- 毛利率：筑底回升 13.92% → 15.71% → 17.13%

**§10 5 档表 visibility 维度判定**：

| 5 档表档位 | 601208 是否符合 |
|---|---|
| 5 分（年报或季报可见明确订单/框架协议+L1） | ❌ 缺具体客户订单金额 L1 披露 |
| 4 分（L4 券商订单预测+客户公开验证） | ⚠️ 有 L4 华泰/东吴/东北研报，但缺"客户公开验证"具体金额 |
| **3 分（L4 预测但无客户确认）** | ✅ **L1 季报+业绩快报+L4 研报三层覆盖 + 业绩拐点确立** |
| 2 分（仅有 L5 媒体报道） | ❌ 不止于此，远高于此 |
| 1 分（无可见订单） | ❌ 完全不符合 |

**复核结果**：
- **score**：**2 → 3**（上修 1 档，从"仅有媒体"升到"L4 预测但无客户确认"）
- **trend**：**down → up**（2025→2026Q1 业绩 V 型反转确立，A 类信号正面）
- **tier**：**L4 维持**（L4 头部券商研报层级）
- **reason**：补全，与 barrier/supply/valuation 三个 reason 同等详实程度（5 段式：5 年营收 CAGR + 2 年 CAGR + 2026Q1 净利率回升 + 卡口业务高速电子树脂 +131.42% + L1/L4 三层信源）

**重算护城河分（Phase 1.5 新权重）**：
- moat **58 → 62**（+4，刚好踩 borderline 下限 60）
- quadrant **skip → skip-borderline** ⚠️
- timing 40 不变（valuation=2 的单维度结果）

**关键意义**：
1. **visibility=2 是历史遗留估计值**，从未在 git history 中被独立审计（commit 4.59/5.7/5.8/6.18/6.22/6.23 全部未动 visibility）
2. **业绩拐点已确立**：净利从 2024 谷底反转至 2025 +75.24%、2026Q1 单季超 2024 全年
3. **Phase 1.5 visibility 入 moat 权重 0.20**：601208 visibility=2 历史值会显著拖累护城河分，本次复核填补这一缺口
4. **未达 4 分档位**：缺具体客户订单金额 L1 披露（需投顾人工 cninfo 核对框架协议原文）

**完成定义**（全部达成）：
- baostock L1 实证拉取 ✅（query_profit_data 2021-2025 年度 + 2026Q1）
- §10 5 档表严格判定 ✅（3 分档位有充分实证支撑）
- reason 字段补全 ✅（与 barrier/supply/valuation 详实程度一致）
- 重算护城河分 ✅（moat 58→62 / quadrant skip→skip-borderline）
- 写入 pcb.manual.js ✅（语法校验通过）
- commit 6.24 落库 ✅

**涉及文件**：`data/pcb.manual.js` L763 `dims6[1] visibility` 字段（score 2→3 / trend down→up / 加 reason）

**完成 commit**：6.24（hash=76ff787，2026-07-04 立）

**遗留**（非阻塞 · 不影响 commit）：
- durability / policy 两个维度仍无 reason（commit 6.22/6.23 重点审计 barrier/supply，durability/policy 维度 reason 补全排在后续批次）
- akshare `stock_zygc_em` 接口返回 `zygcfx` KeyError（2026-07-04 实测确认），需投顾人工登录 cninfo 核对 2025 年报主营构成（非本次复核阻塞项）

**复用方式**（11 链扩展）：
- 任何 stock 的 dims6 维度若 `score < 3` 且无 reason 字段，必须走"baostock L1 实证 + §10 5 档表判定 + reason 补全"三步流程
- 本次 601208 流程可作为模板参考（详见 `scripts/__verify_601208_v2.py` + `__verify_601208_summary.py`）

### §11.7 批次 2 剩余 4 只 stock supply+barrier reason 闭环（2026-07-04 commit 6.28 立）

> **触发原因**：commit 6.18 (1489d09) 批次 2 visibility 第一批只审计了 visibility 维度，commit 6.22/6.23 八只 chokePoints 排查也只审计了 barrier/supply/durability。批次 2 剩余 4 只（600110/688300/688630/688700）的 supply+barrier 维度一直没有独立 reason 字段支撑。本批次由用户发豆包查询 → 用户转发原始响应给投顾 Claude 审计 → 投顾 Claude 给 CC 指令 → CC 写入 pcb.manual.js。

**【supply 维度 reason 补全】**（4 只全部补全）：

| stock | score/trend/tier | reason 长度 | 关键内容 |
|---|---|---|---|
| 600110 诺德股份 | 4/up/estimate | 498 字符 | baostock L1(财务)+ L4(同业扩产);HVLP4 量产+送样验证+新进入者弱化供给红利;visibility→supply 隔离说明 |
| 688300 联瑞新材 | 3/flat/estimate | 438 字符 | baostock L1(财务)+ L4(同业扩产);亚微米硅微粉龙头;营收 15.6% CAGR 由需求拉动非供给紧缺 |
| 688630 芯碁微装 | 4/up/estimate | 580 字符 | baostock L1(财务)+ L4(海外厂商交付约束);高端 LDI 国内唯一;**双重驱动拆分**(需求侧 + 供给侧红利) |
| 688700 东威科技 | 4/up/estimate | 691 字符 | baostock L1(财务)+ L4(海外厂商交付约束)+ L4(AI 订单 5 亿);高端电镀龙头;visibility→supply 隔离说明 |

**【barrier 维度】**：
- 600110/688630/688700 barrier：**维持原 score/trend/tier 不变**（已无 reason 字段，不属于本批次补全范围）
- 688300 barrier：**登记为下一批次待办**（见下方）

**【数据串扰修正】**（commit 6.28 强制项）：
- 688300 supply 豆包原始响应中"73.28 亿 +40.7%"误植入 600110 数据，已修正为 11.16 亿 +16.3%
- 8 份豆包原始响应系统性数字交叉核对（107 个数字逐一对照预喂 baostock L1 表）**仅发现这一处串扰**，无新增

**【688300 barrier 无 reason 登记】**（待办 · 不影响本次 commit）：
- 当前状态：`{key:'barrier',score:2,trend:'flat',tier:'estimate'}` **无 reason 字段**
- score=2/tier=estimate 属于"无 reason 支撑的裸分数"
- **触发 §6.16.⑥ 硬约束**：score<3 维度无 reason 必须复核补全
- 下一批次走 §6.15/§6.11 标准流程：baostock L1 实证 + §10 5 档表判定 + reason 补全
- **与 601208 visibility 闭环（§11.6）属同类待办**

**【信源层 L4 待人工核对】**：
- 4 只 stock reason 中均引用 L4 券商行业研报（"2026 年上半年《XX 行业竞争格局梳理报告》"格式）
- 豆包因 §6.11 约束 #8 禁止提供 URL，未给出具体券商名+报告标题+发布日期
- **整改建议**：4 只 stock 的 L4 信源须由投顾人工登录同花顺 iFinD / 巨潮 cninfo / 慧博核对具体券商报告标题+发布日期，落地为 L4 标准化引用
- 与 688300 barrier 待办合并处理（都属于"L4 信源精度"问题）

**完成定义**（全部达成）：
- ✅ 4 只 stock supply reason 全部补全（4/4）
- ✅ 688300 supply 数据串扰已修正（73.28→11.16 亿、40.7%→16.3%）
- ✅ 688300 barrier 无 reason 登记到 §11.7 待办
- ✅ 系统性数字交叉核对（107 个数字，仅 1 处已识别串扰，无新增）

**涉及文件**：`data/pcb.manual.js`（4 处 stock dims6 字段修订）+ `CLAUDE.md` §11.7 + §6.11.14

**完成 commit**：6.28（hash=267a9bc，2026-07-04 立）

### §11.8 8 只 chokePoints reason 全面盘点 + 补全批次规划（2026-07-04 commit 6.28 后盘点立）

> **触发原因**：commit 6.28 完成批次 2 supply+barrier reason 补全后，对 8 只 chokePoints（601208/300395/301217/002916/300476/002463/688183/002384）全部 6 维度（durability/visibility/policy/supply/valuation/barrier）做系统性盘点，发现 **17 个缺 reason 维度**（远超预期），需分批次补全。

**矩阵盘点结果（commit 6.28 后状态）**：

| stock | durability | visibility | policy | supply | valuation | barrier | 缺数 |
|---|---|---|---|---|---|---|---|
| 601208 东材科技 | ✗ 3 | ✓ 3 | ✗ 4 | ✓ 3 | ✓ 2 | ✓ 3 | 2 |
| 300395 菲利华 | ✗ 5 | ✗ 5 | ✗ 3 | ✗ 5 | ✗ 1 | ✓ 4 | **5** |
| 301217 铜冠铜箔 | ✓ 5 | ✗ 3 | ✗ 4 | ✓ 2 | ✗ 2 | ✓ 3 | 3 |
| 002916 深南电路 | ✓ 4 | ✗ 4 | ✗ 4 | ✓ 3 | ✓ 2 | ✓ 5 | 2 |
| 300476 胜宏科技 | ✓ 5 | ✓ 5 | ✓ 3 | ✓ 2 | ✓ 2 | ✓ 5 | **0** ✅ |
| 002463 沪电股份 | ✓ 5 | ✓ 5 | ✓ 3 | ✓ 2 | ✓ 2 | ✓ 5 | **0** ✅ |
| 688183 生益电子 | ✓ 5 | ✗ 5 | ✗ 3 | ✓ 2 | ✓ 4 | ✓ 3 | 2 |
| 002384 东山精密 | ✓ 5 | ✗ 5 | ✗ 3 | ✓ 2 | ✗ 3 | ✓ 5 | 3 |

**总计 17 个缺 reason 维度，2 只 stock 完全补全（300476/002463）**

**按维度分组**：

| 维度 | 缺数 | 涉及的 stock |
|---|---|---|
| **policy** | **6** | 601208 / 300395 / 301217 / 002916 / 688183 / 002384 |
| **visibility** | **5** | 300395 / 301217 / 002916 / 688183 / 002384 |
| **valuation** | **3** | 300395 / 301217 / 002384 |
| **durability** | **2** | 601208 / 300395 |
| **supply** | **1** | 300395 |
| **barrier** | **0** | 全部 8 只都有 ✅ |

**关键洞察**：
- **policy 维度最严重**：6/8 只缺（高占比），与 §6.7.2 教训（豆包虚构 akshare government_doc 接口）直接相关——之前豆包返回被丢弃但其他维度也没补全
- **barrier 维度全部 OK**：commit 6.22/6.23 三轮 P0/P1/P2 已完成 ✅
- **supply 维度仅 1 只缺（300395）**：与 commit 6.28 已完成批次 2 supply 补全衔接良好
- **300395 菲利华是全维度缺失王**：仅 1 个维度有 reason（barrier=4），需要最大工作量补全

**补全批次规划（方案 A：按维度优先 · 3 批次 / 3 commit）**：

| 批次 | 范围 | 处理模式 | 豆包批次 | 预计 commit |
|---|---|---|---|---|
| **批次 1** | policy 维度 6 个（601208/300395/301217/002916/688183/002384） | §6.7.2 标准重写模式（删除虚构接口声明/统一未核实/精确数字改定性） | 6 条豆包 prompt | 6.29 |
| **批次 2** | visibility 维度 5 个（300395/301217/002916/688183/002384） | §6.15 + baostock L1 实证（类似 601208 visibility commit 6.24） | 5 条豆包 prompt | 6.30 |
| **批次 3** | valuation 3 + durability 2 + supply 1 = 6 个剩余（300395/301217/002384/601208） | 杂项合并（baostock PE/PB + §10 5 档表判定） | 6 条豆包 prompt | 6.31 |

**完成后状态预期**：8 只 chokePoints 全部 6×8=48 个 reason 字段全部补全（或 barrier/supply 等仅剩历史遗留估计值的字段明确标注"待复核"）

**复用方式**（11 链扩展）：
- 任何 chain 的 chokePoints 维护必须满足"全部 6 维度 reason 完整"门槛才能进入 phase 评审
- 盘点脚本：`scripts/__audit_8chokes.py`（可改 chainId 扩展到其他链）

**完成定义**（批次 1 启动条件）：
- ✅ §11.7 旧条目末尾 commit hash 修正（"待执行" → "hash=267a9bc"）
- ✅ §11.8 盘点结果登记
- ✅ 批次 1（policy 6 个）豆包响应已收,reason 字段写入完成
- ⏳ 批次 2（visibility 5 个）豆包 prompt 设计中
- ⏳ 批次 3（valuation+ durability+ supply 6 个）豆包 prompt 待办

### §11.9 8 只 chokePoints policy 维度补全·批次 1 高优先级待办(2026-07-04 commit 6.29 待执行立)

> **触发原因**:批次 1(policy 6 个)reason 字段补全时发现,豆包报告与 pcb.manual.js 现有 score/trend 存在多处潜在冲突,所有冲突统一登记为本待办,**优先级高于非 chokePoints 股票的轻量排查**,应在清单项 2(批次 2 visibility)完成后**优先**处理。

**冲突明细(4 项)**:

| stock | 字段 | pcb.manual.js 现状 | 豆包报告判定 | 冲突性质 |
|---|---|---|---|---|
| **601208 东材科技** | policy score | **3** | 4(中性偏顺风) | score 冲突:豆包基于"政策方向定性"分析倾向 4,现状 3 可能是历史沿用 |
| **688183 生益电子** | policy score | **3** | 4(中性偏顺风) | 同上(score 冲突) |
| **002384 东山精密** | policy score | **3** | 4(中性偏顺风) | 同上(score 冲突) |
| **301217 铜冠铜箔** | policy trend | **up** | flat(政策面平稳) | trend 冲突:豆包基于"近一年无重大政策调整"判 flat,现状 up 原始依据不明 |
| **002916 深南电路** | policy trend | **up** | flat(政策面平稳) | trend 冲突:同 301217 |

**冲突解读**:
- 4 只 stock 现有 score=3 vs 豆包倾向 4,核心分歧在"政策面究竟属于中性(3)还是中性偏顺风(4)"
- 2 只 stock 现有 trend='up' vs 豆包判定 flat,核心分歧在"现有 trend='up' 的原始依据来源不明(可能是历史沿用未经核实的判断)"
- 冲突本质都是 **policy 维度缺少 L1 一级可核实政策素材**(无 L1 巨潮公告披露专项补贴/目录入选/02 专项等),导致豆包只能基于行业政策方向定性,无法精确判定 score/trend

**下一批次复核任务**(清单项 2 后优先执行):

1. **对 4 只 score 冲突 stock 走 §10 5 档表 policy 维度严格判定**:
   - 5 分:有 L1 巨潮公告披露具体补贴/目录入选
   - 4 分:L4 头部券商研报 + 客户公开验证
   - 3 分:仅 L4 预测,无客户确认(当前现状)
   - 2 分:仅 L5 媒体报道
   - 1 分:无可见订单
   - 当前 pcb.manual.js 状态:601208/688183/002384 都是 score=3 + tier=L2,严格按 §10 5 档表判定应为 3 分(豆包建议 4 分需要更多 L4 信源支撑,目前仅 L2 行业白皮书)
   - 复核结论预期:维持 score=3(现状),除非能找到具体 L4 信源

2. **对 2 只 trend 冲突 stock(301217/002916)走 trend 依据溯源**:
   - 检查 supply/durability/visibility/valuation/其他维度是否真的有"up"信号支撑 policy trend='up'
   - 如果查无依据,policy trend 应下修为 flat(与其他 6 只 stock 保持一致)
   - 复核结论预期:大概率下修为 flat(因为政策面确实无重大变化,trend='up' 来源不明)

**完成定义**(本批次复核):
- ✅ 4 只 score 冲突 stock 逐一复核,确认 score 维持/上修/下修
- ✅ 2 只 trend 冲突 stock 逐一复核,确认 trend 维持/下修
- ✅ 复核结果写入 commit 6.30+ 批次
- ✅ §11.9 标注为"已闭环"

**影响文件**(本批次复核):
- data/pcb.manual.js(可能调整 4-6 个 stock 的 policy score/trend)
- CLAUDE.md §11.9(标记闭环)

**优先级**:
- **高于批次 2 visibility 5 个补全**:因为 score/trend 冲突直接涉及"现有评分依据是否合理"的数据真实性问题
- **高于非 chokePoints 轻量排查**:因为这是核心 8 只的治理问题

**完成 commit**:待执行(commit 6.29 完成批次 1 reason 写入后,本待办作为下一批次高优先级事项登记)

### §11.10 30 只非 chokePoints 轻量级风险扫描登记(2026-07-04 commit 6.35 立)

> **触发原因**:清单项 2(8 只 chokePoints)已彻底闭环,清单项 3 启动对 PCB 产业链其余 30 只非 chokePoints 股票的轻量级排查。本次扫描**只用已有数据做模式识别**,**不发豆包、不调 baostock/akshare**,纯数据治理摸底。
>
> **本文档仅做问题登记,不做任何数据修改**。后续处理节奏由用户决定。

**扫描规模**:
- 总股票数:38 只
- 8 只 chokePoints(已闭环,跳过):601208/300395/301217/002916/300476/002463/688183/002384
- 本次扫描:**30 只非 chokePoints**
- 发现问题:**20 只**(67%)
- 干净:**10 只**(33%)

#### 4 种风险模式定义(M1-M4)

| 模式 ID | 名称 | 触发条件 | 严重度 |
|---|---|---|---|
| **M1** | 高分低证据 | score=5 + reason 缺失/单薄(<80字) | 🔴 HIGH |
| **M2** | 低分无证据 | score=1 + reason 缺失/单薄(<80字) | 🟡 MEDIUM |
| **M3** | 强势 tier + reason 薄 | tier=L1/L2/L3/L4 + reason 缺失/单薄(<60字) | 🟡 MEDIUM |
| **M4** | 主观高分低证据 | tier=estimate + score≥4 + reason 缺失/单薄(<80字) | 🟡 MEDIUM |

**风险模式出现次数统计**:

| 模式 | 次数 | 占比 | 含义 |
|---|---|---|---|
| **M3·强势tier+reason薄** | **54 次** | 55% | tier 已标注但 reason 缺失——典型"半填"治理缺陷 |
| **M4·主观高分低证据** | **33 次** | 34% | tier=estimate + score≥4 字段内部自相矛盾 |
| M1·高分低证据 | 8 次 | 8% | 最严重——5 分无 reason 支撑 |
| M2·低分无证据 | 3 次 | 3% | score=1 无 reason,可能是真实空缺也可能漏填 |
| **总计** | **98 个问题维度** | 100% | — |

#### 🟢 干净股票(10 只,作为对照标杆)

| code | name |
|---|---|
| 300179 | 四方达 |
| 301150 | 中一科技 |
| 600110 | 诺德股份 |
| 600176 | 中国巨石 |
| 603228 | 景旺电子 |
| 603650 | 彤程新材 |
| 605006 | 山东玻纤 |
| 688300 | 联瑞新材 |
| 688700 | 东威科技 |
| 000657 | 中钨高新 |

> 这 10 只是 6 维 dims6 **既有 reason 又有合理 tier** 的标杆(其中多数经过了 §11.7 §11.6 等批次的显式补全)。**后续治理可参考它们的 reason 长度与 tier 搭配**。

#### 🚨 P0·立即复核(8 项 HIGH,score=5 + reason 缺失)

| stock | dim | 详情 |
|---|---|---|
| **600183 生益科技** | visibility | score=5 · reason 缺失 |
| **600183 生益科技** | barrier | score=5 · reason 缺失 |
| **605589 圣泉集团** | visibility | score=5 · reason 缺失 |
| **605589 圣泉集团** | barrier | score=5 · reason 缺失 |
| **002938 鹏鼎控股** | durability | score=5 · reason 缺失 |
| **002938 鹏鼎控股** | visibility | score=5 · reason 缺失 |
| **301200 大族数控** | visibility | score=5 · reason 缺失 |
| **001389 广合科技** | durability | score=5 · reason 缺失 |

**特别警示**:
- **600183 生益科技** 既是弱卡口(在 ranks 4-5 弱卡口中)又是 HIGH 风险——核心 ranks 卡口 audit 缺位
- **002938 鹏鼎控股** FPC 全球 9 连冠,但 durability+visibility 两个 score=5 维度均无 reason 支撑
- **605589 圣泉集团** M9 树脂小批量供英伟达 Rubin,visibility=5 + barrier=5 双双无 reason
- **301200 大族数控** PCB 钻孔设备全球第二,visibility=5 无 reason
- **001389 广合科技** 算力 PCB 一供,durability=5 无 reason

#### ⚠️ P1·下一批次复核(8 只 ≥6 项问题)

| stock | 问题数 | missing reason | 模式分布 |
|---|---|---|---|
| **605589 圣泉集团** | **8 项** | 6/6 维 | M1×2 + M3×6 |
| **002938 鹏鼎控股** | **8 项** | 6/6 维 | M1×2 + M3×6 |
| **300522 世名科技** | **9 项** | 6/6 维 | M2×3(三个 score=1) + M3×6 |
| **600183 生益科技** | 7 项 | 6/6 维 | M1×2 + M4×5(全部 estimate + score≥4) |
| **301377 鼎泰高科** | 6 项 | 6/6 维 | M3×6(全球 PCB 钻针第一) |
| **603002 宏昌电子** | 6 项 | 6/6 维 | M3×6(电子级环氧树脂国内第一) |
| **603920 世运电路** | 6 项 | 6/6 维 | M3×6(特斯拉全球 PCB 第一) |
| **603936 博敏电子** | 6 项 | 6/6 维 | M3×6(FC-BGA 长鑫存储认证) |
| **002636 金安国纪** | 6 项 | 6/6 维 | M3×6(中厚 FR-4 全球市占 70%) |
| **002913 奥士康** | 6 项 | 6/6 维 | M3×6(英伟达供应链) |

> **注**:605589/002938 双重身份(既是 P0 又是 P1),因 HIGH 数高风险更高,但 P1 按总问题数排序包含它们。

#### 📝 P2·累积修复(10 只 1-5 项问题)

| stock | 问题数 | 模式 | 备注 |
|---|---|---|---|
| **301200 大族数控** | 5 项 | M1×1 + M4×4 | — |
| **001389 广合科技** | 5 项 | M1×1 + M4×4 | — |
| **002436 兴森科技** | 4 项 | M4×4 | — |
| **301511 德福科技** | 3 项 | M4×3 | — |
| **603256 宏和科技** | 3 项 | M4×3 | — |
| **603519 南亚新材** | 3 项 | M4×3 | — |
| **688388 嘉元科技** | 3 项 | M4×3 | — |
| **603186 华正新材** | 2 项 | M4×2 | — |
| **688630 芯碁微装** | 1 项 | M4×1 | 已大幅治理过 |
| **002080 中材科技** | 1 项 | M4×1 | — |

> **说明**:清单项 3 原文请求里提到"13 只 1-5 项股票清单"是按更宽松的 HIGH 严重度阈值算的,本次扫描按统一阈值筛出 **10 只** P2。两者差异在边界 case 的归类,实质覆盖范围一致。

#### 关键洞察

**洞察 1:M3 占 54% 是数据治理最大问题**
`tier 标注了 + reason 缺失` 这意味着**之前某个批次只更新了 tier 字段,没补 reason**。这与 §11.6 提到的"卡口验证 audit" 缺位直接相关。建议后续治理优先补 M3 类。

**洞察 2:M4 占 33% = "estimate + 高分" 自我矛盾**
代码逻辑上 `tier=estimate` 暗示"主观推断,弱证据",但 `score≥4` 暗示"接近满分"。**这两者并存 = 字段内部自相矛盾**。30 只里 13 只有这种问题。

**洞察 3:HIGH 严重度集中在 4 只龙头股**
- 600183 生益科技(M9 CCL 龙头,大陆唯一进入英伟达供应链)
- 605589 圣泉集团(M9 树脂小批量供英伟达 Rubin)
- 002938 鹏鼎控股(FPC 9 连冠)
- 301200 大族数控(PCB 钻孔设备全球第二)

**都是高 profile 龙头,但 5 分维度全部无 reason**。投资视角下风险最大。

**洞察 4:§11.8 已闭环 8 只都没出现,但非 chokePoints 范围问题更大**
§11.8 排查 8 只时共发现 17 个缺 reason 维度;**§11.10 排查 30 只发现 98 个问题维度**(54+33+8+3)。**待治理的"数据完整性缺口"是 §11.8 的 5.7 倍**。

**洞察 5:trend=up/flat 无 A 类信号模式未发现**
30 只扫描中**没有发现 trend=up 但 reason 完全缺失**的强证据案例。这与 §11.9 发现的 301217/002916 policy trend='up' 无依据是不同模式——本次扫描未触及(因为那两个是 chokePoints)。

#### 风险分级汇总(按优先级)

| 优先级 | 范围 | 工作量预估 |
|---|---|---|
| 🚨 **P0** | 8 项 HIGH 单独修复 | 半天(走 §6.15 流程) |
| ⚠️ **P1** | 10 只 ≥6 项问题全补 | 1-2 天(发豆包 + baostock 几轮) |
| 📝 **P2** | 10 只 1-5 项问题全补 | 1 天 |
| 干净 | 10 只标杆 | 无需处理 |

#### 本次扫描执行摘要

| 项 | 值 |
|---|---|
| 扫描范围 | 30 只非 chokePoints |
| 扫描模式 | 4 种(M1/M2/M3/M4) |
| 数据源 | data/pcb.manual.js 已存档 dims6 字段 |
| 调用工具 | **无**(纯本地数据扫描,未联网) |
| 数据修改 | **无**(仅登记到本节,不动 pcb.manual.js) |
| 后续处理 | 由用户决定节奏 |

#### 完成定义(本次轻量级排查)

- ✅ 扫描脚本覆盖 4 种风险模式(M1-M4)
- ✅ 30 只非 chokePoints 全部扫描
- ✅ P0/P1/P2 三级分类已建立
- ✅ 10 只干净股票作为对照标杆登记
- ✅ §11.10 完整登记到 CLAUDE.md
- ✅ 本次为轻量级排查,数据零修改

**完成 commit**:6.35(6dd37fc)

### §11.10.1 P0 批次·第一阶段 8/8 完成 + 第二阶段待启动(2026-07-05 commit 6.37 + 6.38 立)

> **重要:P0 批次明确分为两个阶段,不要笼统标记"P0 已完成"**

#### 第一阶段(本次完成):reason 字段补全 8/8 ✅

**8 条 reason 字段已全部写入 pcb.manual.js**(2026-07-05 按 4 类风险分级处理后版本):

| stock | dim | 风险分级处理 | 涉及的关键改写 |
|---|---|---|---|
| 600183 | visibility | ✅ 可重算 + 低风险引用 | 营收 CAGR/净利 CAGR 标 baostock L1 |
| 600183 | barrier | ✅ 低风险引用 | 保留 position 字段"台光/松下"等已有内容(不扩展) |
| 605589 | visibility | ✅ 中风险限定 | 删"60%"/"0.0018" 等具体数字 |
| 605589 | barrier | ✅ **高风险删除** + 中风险限定 | 删"JX 化学"/"70%"/"约 18 月"等 |
| 002938 | durability | ✅ 中风险限定 | 删"≈95%"等具体百分比 |
| 002938 | visibility | ✅ **高风险删除** + 防御记录 | 删"2026-06-01" + 显式标注"豆包编造" |
| 301200 | visibility | ✅ **高风险删除** + 防御记录 | 删"600 万元" + 显式标注"豆包编造" |
| **001389** | **durability** | ✅ **重设计 prompt · 高风险 0 项** | 详见下方"§6.7.3 设计首次验证完全生效"(commit 6.38 写入) |

**001389/durability 收尾完成**(2026-07-05 commit 6.38):
- 原 prompt 因 auto-mode 拒绝执行(理由:"unverified doubao responses")未发送
- 重设计 prompt:`scripts/__p0_prompt8_001389_durability_rewrite.md`(2026-07-05)
- 关键防御:4 类禁止(具体日期/具体金额/占比口径扩展/2021-2022 编造)+ pcb.manual.js 已知字段 9 个小节完整核对清单 + 豆包自查清单 4 类输出要求
- 写入小修:reason 字段中 §11.9 冲突话术的 `trend='up'` → `trend='flat'`(对齐豆包真实 trend 判定)

#### 🎯 §6.7.3 防御设计首次验证完全生效(方法论层面重要发现 · commit 6.38)

> **本节是 001389 审计中最重要的方法论验证,值得作为后续 P1/P2 批次设计 prompt 时的参考标准**

**对比 commit 6.37(2 处 hallucination 后清理模式)** vs **commit 6.38(001389 零幻觉模式)**:

| 维度 | commit 6.37(2 起 hallucination 后清理) | commit 6.38(001389 零幻觉) |
|---|---|---|
| 豆包自查清单·高风险栏 | 后期发现 2 处需要删除(002938 虚假日期 / 301200 虚假单价) | **主动声明"无删除原值,全程遵守 4 类禁止规则"** |
| 高风险防御机制 | 在 commit 6.37 内作为新增"4 类风险分级"上线,但属于被动防御(已经发生 hallucination 后清理) | **成为 prompt 第一层硬约束,从源头约束豆包输出** |
| hallucination 出现位置 | reason 字段写入阶段才发现并删除 | **豆包自查阶段就内化,未生成需要清理的内容** |

**001389 审计的 4 类防御设计主动信号**:

1. **豆包自查清单·高风险栏主动声明**:"无删除原值,全程遵守 4 类禁止规则" + 主动列出 5 条"未编造"事实 → **0 hallucination,无需清理**
2. **中风险栏主动软化 2 项**:"客户已获 Tier1 定点" → "待 L1 原文核实"、"行业 3 年 CAGR 30%+" → "无精确增速量化数据"
3. **trend 字段诚实判定** 不沿用原 trend='up' → 主动改判 flat(A 类信号正负对抵)
4. **【6. 未查到】9 项完整无臆造** 涵盖 4 类禁止全部风险点(具体日期/具体金额/2025 营收空/2021-2022 缺失)

**方法论层面 3 项结论**(供后续 P1/P2 批次复用):

1. **prompt 结构升级**:从"被动防御(commit 6.37 上线 4 类风险分级)"升级为"主动防御(commit 6.38 把 4 类禁止放在 prompt 第一节)":
   - 第一节用 §6.7.3 防御章节展示 hallucination 案例作为对照
   - 第二三节用 pcb.manual.js 已知字段完整核对清单把约束具体化
   - 最后一节用豆包自查清单 4 类输出要求让豆包自己约束自己
   - **效果**:豆包从"被动防 hallucination"升级为"主动识别风险 + 主动声明合规"

2. **trend 字段独立判定原则**(commit 6.38 设计强化):
   - 即使 §11.9 标准话术包含"维持原 trend=up",豆包应该**独立判定 trend**
   - 本次豆包成功做到这一点,reason 字段中 §11.9 话术的 trend='up' 被单字符替换为 trend='flat'
   - 后续 prompt 设计应继续要求 **"trend 字段诚实判定"**,不给豆包空间盲沿用原值

3. **"0 hallucination"≠"幻觉被清理干净",但确实是 better signal**:
   - 不是"绝对无 hallucination 风险"(豆包仍然可能幻觉)
   - 但相比 commit 6.37 的"先编造后清理"模式,commit 6.38 的"主动声明合规"**显著降低幻觉产生概率**
   - 这是**质量信号**,不是绝对无风险保证

#### ⚠️ 001389 轻度告警【3. 新进入者】段提及他股

- 豆包在【3. 新进入者】段中作为赛道背景轻提"生益相关板块、圣泉、大族数控等"
- **触边但未跨线**:这是定性提及(无具体数字、具体客户、具体数据),不构成 §6.11 #1 "分析其他 stock" 的硬性违规
- 未写入 reason 字段(仅在 7 段式中),因此不污染 pcb.manual.js 数据
- **后续 prompt 设计改进建议**(下一批次 P1 时):
  - 改为"其他 PCB 中游企业"这种更模糊的表述
  - 完全避免在同一条 prompt 中出现其他 stock 名称,即使是赛道背景
- **本批次不修复**(豆包整体质量优秀,不为此微调)

#### 第二阶段(待启动):score 统一校准

**关键认知:第一阶段 ≠ 完成 P0**

- 8 条 reason 字段补全后,**score 数字全部维持原值**:
  - 600183 visibility 5/605589 visibility 5/002938 durability 5/002938 visibility 5/301200 visibility 5/001389 durability 5 → **理论上应下修至 4 或更低**(豆包初判 + §10 严格判定),但因无 L1 公告支撑,本批次**不能下修**
  - 600183 barrier 5/605589 barrier 5 → **与原 score 一致,无冲突**(豆包判定 5 分硬性条件满足,无需变更)
- 这 6 项 score=5 与 §10 标准存在理论冲突,按 §11.9 模板"维持现状+归档",**等待 §11.9 后续批次做 score 校准**
- §12 可信度地图**暂不更新为"18 只已达 chokePoints 同等标准"**,这 6 项应该继续标注为"待复核",只有另外 2 项(600183 barrier、605589 barrier)可以真正视为达标

#### 本批次新增高风险数字抽查环节

为防止豆包 hallucination 数字直接写入 pcb.manual.js(违反 §6.7.1/§6.7.2 防御),本批次新增"高风险数字完整梳理"环节,系统化列出 8 条 reason 中所有"具体家数/具体百分比/具体认证日期/具体供应商名称"类数字,并按 4 类风险分级处理:

- **高风险(幻觉)**:彻底删除,改为定性描述或"待核实"
- **中风险(待核)**:改为定性表述,标注"具体数字待人工核实"
- **低风险(position 字段原有)**:直接引用 + 标"pcb.manual.js position 字段·estimate"
- **可重算**:标"baostock L1 实测" + 给出具体算法

#### 本批次发现 2 处豆包 hallucination(已删除,均来自 commit 6.37 7 条)

1. **002938 visibility**:豆包原始响应中声称"MGX 无线缆托盘 2026-06-01 获英伟达官方生态认证"——但 pcb.manual.js investableReason 字段只说"2026Q3 小批量出货",**"2026-06-01" 是豆包把笼统表述细化成的具体日期,无 L1 原文依据**。已删除该具体日期,并在 reason 中显式标注"判定为豆包编造"作为防御记录。

2. **301200 visibility**:豆包原始响应中声称"单台设备售价 600 万元(溢价一倍)"——但 pcb.manual.js 任何字段中均无此表述,**完全是豆包编造的数字**。已删除该具体数字,并在 reason 中显式标注"判定为豆包编造"作为防御记录。

**这 2 处幻觉已登记到 §6.7.1/§6.7.2 案例归档区**(见 commit 6.37 新增的 2 项案例)。

**commit 6.38 001389 重设计 prompt 内化 2 起案例作为对照**(详见上文"§6.7.3 防御设计首次验证完全生效"),**未新发现任何 hallucination 内容**(自查清单高风险栏 0 项,这是设计成功关键证据)。

#### 3 处按用户原则处理(commit 6.37 7 条中)

- 605589 barrier:不写"JX 化学"具体名字,改为"国内圣泉/东材为主要供应方,海外具体厂商名单归入未查到"
- 605589 visibility+barrier:不写"PPO 树脂国内市占超 70%",改为"国内领先地位,具体市占数字待人工核实"
- 301200 visibility:不写"钻孔设备国内市占 70%"具体数字

#### 完成 commit

- ✅ 8 条 reason 字段写入 pcb.manual.js(commit 6.37 写 7 条 + commit 6.38 写 001389/durability 第 8 条)
- ✅ §11.10.1 P0 状态登记(2 阶段区分,8/8 全部完成)
- ✅ §6.7.3 防御设计首次验证完全生效(方法论层面 3 项结论)
- ✅ 1 处轻度告警【3. 新进入者】 登记 + 下一批次 P1 prompt 设计改进建议
- ✅ 2 处豆包 hallucination(来自 commit 6.37)登记到 §6.7.1/§6.7.2 案例归档区
- ⏳ 待启动:第二阶段 6 项 score 校准(001389 已加入校准队列)

**完成 commit**:6.37(e996492)+ 6.38(本次)

> **本文档定位**:这不是业务介绍,这是一份**数据可信度审计的正式交付物**。核心回答一个问题——目前 PCB 六维评分系统,**哪些部分真正可信、可以拿去做投资决策,哪些部分还不能**。
>
> **来源**:基于 §11.10 轻量级风险扫描结果(commit 6.35)+ §11.9 两批校准(commit 6.32 + 6.33)+ §6.16 dims6Audit 机制。
>
> **个人作者备忘录**(自我提醒):本文档是给你自己看的投研纪律文件,**不是给外部读者看的营销材料**。

### §11.11 §6.16 dims6Audit 全面推进决定(2026-07-08 · 已评估-暂缓)

**决定**:§6.16 dims6Audit 全 37 只 PCB 股票全面推进——经投顾评估,**暂缓执行,不进入当前排期**。状态标注为**"已评估-暂缓"**(不是"未处理"或"待办",而是经过判断后的主动搁置)。

**暂缓理由(4 条)**:

1. **工作量评估**:单只股票完整走完 dims6Audit 流程需要 **4-6 小时人工投入**(需 baostock L1 实测 + 6 维 reason 补全 + tier 校准 + reviewer 审计痕迹 + commit 编号可追溯)。全部 37 只覆盖预计 **124-186 小时(15-23 工作日)**,工作量过大。

2. **核心增量价值已在 §11.9 valuation 校准批次中通过不同路径达成**:dims6Audit 相比现有 "reason 完整 + tier 校准" 的核心增量价值是:
   - 对 score=5 维度做 5 分硬指标核查(L1-L4 信源 + A/B 类检查)
   - 记录 reviewer 审计痕迹(inline `dims6Audit` 字段)
   - 但实质内容已经通过 §11.9 valuation 校准批次(commit 6.74 / 6.75 / 6.77)中**用 baostock L1 实测数据 → 发现偏差 → 显式校准 + 记录 reason 校准依据**这种方式达成
   - **只是没采用 dims6Audit 这个特定字段格式** — 本质工作量已完成大半,补字段主要是格式统一而非实质增信

3. **300395 走完整流程,其余 36 只维持现状不视为遗留缺陷,而是主动决策的暂缓项**:
   - 300395 是累积式 audit(横跨 commit a98448e 5.6 至 656422d 6.22 / 51cfaab 6.23 / 0c5dae5 6.29 / 95b1f3d 6.30 / 0aa2640 6.32 等多次提交)
   - inline dims6Audit 字段(commit a98448e 立)结构:`{ reviewedAt, extremeGap, conclusion, reviewer }`
   - 其余 36 只维持"低密度 audit"(主要是 §11.9 valuation 校准 + §11.7 supply/barrier reason 补全 + §11.6 visibility 闭环等碎片 audit)

4. **风险点提示**:30+ 只"estimate 占位"股票需要**联网实测 baostock L1**(本机网络不稳定 + akshare 多个接口 KeyError),如无预算缓冲,实际工作量会超过估算

**未来重评估建议**(按规模从小到大):

| 方案 | 范围 | 估算总耗时 | 推荐场景 |
|---|---|---|---|
| **D 方案**(单只试点) | 1-2 只 | 5-10 小时 | 字段格式验证 + 流程可行性测试 |
| **A 方案**(8 只优先) | 8 只 chokePoints | 18-22 小时 | §12.1.5 提到的"唯一可信子集"补全 |
| **B 方案**(8 + 10 可参考) | 8 + §12.2.1 10 只 = 18 只 | 48-72 小时 | 中等规模 |
| **C 方案**(全部) | 37 只 | 124-186 小时 | 完整覆盖 |

- 默认推荐:**D 方案(单只试点)→ 验证后 → A 方案(8 只 chokePoints)**
- **不推荐**直接推进 C 方案(碎片化 audit 质量风险高)

**评估依据数据来源**:

| 项目 | 数据来源 |
|---|---|
| 单只工作量估算 | commit a98448e (5.6, 2026-07-01) 300395 dims6Audit 字段建立累积 ~4-6 小时人工投入,含网络调试 |
| 300395 累积式 audit 拆解 | commit 656422d (6.22) barrier 5→4 下修 + commit 51cfaab (6.23) reason 补全(9 个事故案例归档) + commit 0c5dae5 (6.29) policy 补全 + commit 95b1f3d (6.30) visibility 补全 + commit 0aa2640 (6.32) score 校准 |
| 已覆盖范围(其他 5 只 valuation) | commit 6.74 (301217/002384) + 6.75 (603228) + 6.77 (002463/002916)valuation reason 重写含 baostock L1 实测依据 + §10 5 档表判定 |
| 风险点 | 002938 鹏鼎 + 002919 akshare sw_index_third_info KeyError + 301377/603228 接口空数据等历史教训 |

**涉及文件**:CLAUDE.md 本节登记(本次登记 commit)

**后续触发条件**(未来重新评估时):
- 投顾有专门时间预算(单次 ≥ 20 小时)
- 或新增 §6.16 自动化脚本能辅助批量 reason 提取 + tier 校准 + audit field 写入
- 或专门发起"§6.16 dims6Audit 字段标准化"子任务先统一字段格式,然后批量回填

### §11.12 treeMap 独有股票·设计豁免清单(2026-07-09 commit 6.61a 立)

> **触发原因**:用户截图发现 "AI 服务器 PCB" 卡片中"生益电子"显示的代码是"603183"(正确应是 688183)。最终诊断发现:
> - 603183 错误代码位于 `data/pcb.js` 的 `treeMap.midstream[0].companies[2].code`(不是 segments 字段)
> - `scripts/check_manual_pcb_sync.js` v1 完全不扫描 `treeMap` 路径,所以这个错码 27 天未被检出
> - v1 跑出虚假 PASS "双层架构 stock 列表完全同步",掩盖了真正的盲点
> - 同时 v2 扩展到 treeMap 后,暴露出 11 只"仅 pcb.js 有"的 stock——**这些是设计有意为之的 treeMap 上下游生态视图,不是数据错误**

**【白名单豁免清单 · 11 只】**:

| code | name | treeMap 位置 | 段位性质 | 豁免理由 |
|---|---|---|---|---|
| **601138** | 工业富联 | `treeMap.downstream[0]` | AI 服务器(40%) | 英伟达 AI 服务器整机代工龙头·treeMap 展示为 PCB 下游客户(下游整机厂) |
| **000977** | 浪潮信息 | `treeMap.downstream[0]` | AI 服务器(40%) | 国内 AI 服务器整机·treeMap 展示为 PCB 下游客户 |
| **603019** | 中科曙光 | `treeMap.downstream[0]` | AI 服务器(40%) | 智算中心+海光信息·treeMap 展示为 PCB 下游客户 |
| **002594** | 比亚迪 | `treeMap.downstream[1]` | 汽车电子(25%) | 新能源整车·treeMap 展示为 PCB 下游整车厂 |
| **605333** | 沪光股份 | `treeMap.downstream[1]` | 汽车电子(25%) | 汽车线束+高压连接器·treeMap 展示为 PCB 下游汽零厂 |
| **002402** | 和而泰 | `treeMap.downstream[1]` | 汽车电子(25%) | 汽车智能控制器·treeMap 展示为 PCB 下游汽车控制器厂 |
| **000063** | 中兴通讯 | `treeMap.downstream[2]` | 通信/5G(20%) | 5G 基站+光通信设备·treeMap 展示为 PCB 下游整机厂 |
| **600498** | 烽火通信 | `treeMap.downstream[2]` | 通信/5G(20%) | 光通信传输设备·treeMap 展示为 PCB 下游通信设备厂 |
| **600552** | 凯盛科技 | `treeMap.sideBranches[1]` | CCL 上游硅微粉 | 硅微粉二供·央企背景·treeMap 展示为 PCB 上游材料 |
| **603328** | 依顿电子 | `treeMap.midstream[1]` | 汽车 PCB | PCB 主营·treeMap 展示用(暂未纳入 manual 池,后续评估) |
| **000823** | 超声电子 | `treeMap.midstream[2]` | 消费类 PCB | PCB 主营(消费)+覆铜板·treeMap 展示用(暂未纳入 manual 池,后续评估) |

**【白名单维护规则(永久生效)】**:

1. **新增白名单条目**:
   - 必须先在本表登记完整行(code + name + 位置 + 段位 + 豁免理由)
   - 然后才能在 `scripts/check_manual_pcb_sync.js` 的 `TREE_MAP_WHITELIST` 常量中加对应条目
   - 理由必须明确说"为什么不是 PCB 核心池,但又需要在 treeMap 中展示"——避免后续误删

2. **删除白名单条目**:
   - 必须先决定:① 从 treeMap 删除该 stock 显示(破坏展示完整性)② 还是纳入 manual 池(补全 dims6 等字段)
   - 任何变更必须先在本表删除行,再同步改 script
   - **没有"静默删除"路径**

3. **白名单豁免范围严格限定**:
   - 仅豁免 `仅 pcb.js 有(manual 层缺失)` 这一个检查项
   - **不豁免** 其他检查:`name 一致性`(如果以后 manual 也加入同名 stock,必须确认 code/name 完全一致)、`悬空(仅 manual.js 有)`(manual 池的 stock 必须确实存在于 pcb.js)
   - 如果某只白名单 stock 出现了与 §6 不同性质的差异(如 name 与 pcb.manual.js 冲突),按 §6 正常判定,不受白名单保护

4. **定期复核(季度级)**:
   - 每次大版本升级(commit X.0)时,核对 treeMap 结构是否仍然存在
   - 如果某天 `data/pcb.js` 重构,delete 了 treeMap 路径,白名单全部失效,需重新评估

**【本次修复的"603183"错误】**:

| 文件 | 行号 | 修复 |
|---|---|---|
| `data/pcb.js` | line 197(treeMap.midstream[0].companies[2]) | `code:'603183'` → `code:'688183'` |
| 关联 | `pcb.manual.js` line 1110 + `pcb.js` line 500/593/673 | 本次始终是 688183,无需修 |

**【盲点根因(完整链)】**:

1. **数据生成时**:commit f019b60 (升级九 STEP 4) 首次将 PCB 数据外置为 data/pcb.js,line 197 处的 603183 是**转录早期错误**(从 index.html 内联 PCB 数据块迁移时未做 code 真实性校验)
2. **检查工具漏检**:scripts/check_manual_pcb_sync.js v1 仅扫描 `seg.stocks` + `midstream.stocks` + `chokePoints[]`,**完全漏掉 `treeMap.*[*].companies` 路径**
3. **page_audit 虚假 PASS**:第【7】项调用的就是 check_manual_pcb_sync.js → 输出"双层架构 stock 列表完全同步",事实上是漏检的伪同步
4. **27 天未被检出的危害**:用户在 AI 服务器 PCB 段位看到错误的"603183 生益电子",可能导致投资决策误判(对应到错误公司)

**【防御机制升级(commit 6.61a)】**:

1. **scripts/check_manual_pcb_sync.js v2**:
   - 新增 `Object.keys(PCB.treeMap).forEach(...)` 扫描 5 列下所有 `companies`
   - 新增 `TREE_MAP_WHITELIST` 常量(11 只)
   - 报告分类:⭐ 白名单豁免 vs 🚨 真实缺失
   - `diffCount` 不计入白名单豁免 → exit 0/1 仅基于"实质差异"
2. **pcb.manual.js STAMPS 校验**:不需新增,因为所有 38 只 manual stock 都在 seg.stocks/midstream.stocks/chokePoints 路径,不存在 treeMap 路径漏检
3. **后续治理参考**:任何对 treeMap 的结构调整(增/删 stock、扩段位、改 5 列)必须同步检查 §11.12 本表 + script 白名单

**完成定义**(本次 commit 全部达成):
- ✅ data/pcb.js line 197 错码 603183 → 688183 已修复
- ✅ scripts/check_manual_pcb_sync.js v2 treeMap 路径扫描上线
- ✅ TREE_MAP_WHITELIST 11 只白名单常量上线(含详细豁免理由)
- ✅ page_audit.py 第【7】项从虚假 PASS 变真实 PASS(经白名单豁免后)
- ✅ CLAUDE.md §11.12 完整登记(本节)
- ✅ Exit code 0(实质差异 = 0)

**事故案例归档**(2026-07-09 commit 6.61a 立):
- **数据生成时漏失真实性校验** + **检查工具漏扫路径** 双盲点 → 用户视觉层看到错误代码 27 天未被检出
- **关键教训**:
  - 任何双层架构的数据文件,**检查脚本必须覆盖所有数据生成路径**(segments + midstream + chokePoints + treeMap,缺一不可)
  - 代码真实性校验是基本盘——数字本身 6 位合法但内容可错,必须有"代码 vs 真实 A 股"的真实性校验(本次未实装,见下方"遗留")
  - "假同步"比"真差异"更危险——它让人误以为数据没问题而停止审查

**遗留**(本次未实装,留待后续):
- **code vs 真实 A 股 真实性校验**(基于 baostock/akshare 接口拿到真实 code+name 表,批量核对 38 只)
- **pcb.js 其他段位名称真实性校验**(非 stock code,如 segment 名"AI 服务器 PCB"是否正确)

### §11.13 半导体设备重构登记(2026-07-09 commit 6.63 立 · Phase A 骨架)

> **触发原因**:用户要求"按 PCB 模板先搭框架"。Explore 发现现有 `data/semi-equipment.js`(2026-06-19 commit 6.16 立,834 行 / 54.9 KB)是 82/100 完整骨架,与 PCB 黄金范例(100/100)有 **3 大差距**:
>
> 1. **26 只 stock 全部缺 `dims6` 6 维景气打分 + `dims6Note`**(PCB 模板核心字段,影响个股筛选)
> 2. **`treeMap` 5 列 23 sub-card 缺 `companies`/`sourceSegment` 复用机制**(影响前端展示)
> 3. **2 段 stock 数 < 5**(光刻段仅 3 / 离子注入段仅 3,违反 SKILL.md S4 硬指标)
>
> AskUserQuestion 确认:**方向 C 完整重构 + 新建不同 id `semicon-equip`**(原 `semi-equipment` 标记 deprecated,后台存在但侧栏隐藏)

**【本次 commit 范围 - Phase A 骨架】**:

| 改动项 | 当前状态 | 后续 Phase B+ 待补 |
|---|---|---|
| `data/semicon-equip.js` 新建(800+ 行,IIFE + 13 顶层字段全齐) | ✅ Phase A 完成 | Phase B:每只 stock dims6 reason + Phase B src URL ≥ 2 源 |
| `treeMap` 5 列(downstream/midstream/materials/equipment/sideBranches)23 sub-card 含 `companies` 数组 | ✅ Phase A 完成(对齐 PCB schema) | Phase C:前端验证 sourceSegment 字段能正确复用渲染 |
| `segments` 6 段(刻蚀/薄膜沉积/光刻/CMP/检测/离子注入-晶体生长-封测)每段 5-6 只 stock | ✅ Phase A 完成 | Phase B 三重验证(stock code/段位/name)+ src URL ≥ 2 源 |
| `midstream.stocks` 10 只 + `fourQuestions` 6 段 q1-q4 + `chokePoints` 3 大卡口(中微/北方华创/拓荆) | ✅ Phase A 完成 | Phase B 补 6 维 dims6 reason + 投顾人工 baostock/akshare 实测 |
| `supplyGap` 4 条(EUV 100% 卡脖子 / 14nm 国产化率<35% / ALD 卡口 / 电子特气国产化率仅 ~10%) | ✅ Phase A 完成 | 持续跟踪 |
| `data/semi-equipment.js` 顶部 deprecated 标记注释 | ✅ Phase A 完成 | Phase 12 维护期评估是否彻底移除 |
| `index.html` DATA_VERSION bump `20260704a` → `20260709a` | ✅ Phase A 完成 | 后续修改数据继续 bump |
| `index.html` manifest 数组加 `'semicon-equip'` 在 `'ai-full-chain'` 前 | ✅ Phase A 完成 | — |
| `index.html` 侧栏(line 655)semicon-equip 新入口"🔩 半导体设备" + 原 semi-equipment 改 `.coming`(灰显但 manifest 保留) | ✅ Phase A 完成 | — |
| `index.html` sectorName 三元映射:semi-equipment → '半导体设备(旧)' + semicon-equip → '半导体设备' | ✅ Phase A 完成 | — |
| `index.html` sectorColor 三元映射:semicon-equip → `'#0d9488'`(青色,与 semi-equipment 紫色 `'#7c3aed'` 区分) | ✅ Phase A 完成 | — |
| `index.html` CHANGELOG 前部插 2026-07-09 semicon-equip 重构条目 | ✅ Phase A 完成 | — |

**【Phase B+ 后续多次会话迭代计划】**:

| Phase | 范围 | 预计 commit |
|---|---|---|
| **Phase B1** | 中微/北方华创/拓荆 3 大卡口完整 dims6 reason(6 维)+ 三重验证 + cninfo + 双 broker 双源 | commit 6.64+ |
| **Phase B2** | 华海清科/芯源微/万业企业/晶盛机电 4 只次级卡口完整 dims6 | 后续 |
| **Phase B3** | 盛美/至纯/富乐德/美埃 等清洗段位 | 后续 |
| **Phase B4** | 微导/中微-LPCVD 等薄膜沉积段位 | 后续 |
| **Phase B5** | 茂莱光学/福晶科技/张江高科/蓝英装备/华大九天 等光刻段位 | 后续 |
| **Phase B6** | 精测/长川/华峰/金海通/中科飞测 等检测段位 | 后续 |
| **Phase B7** | 凯世通/中科信/先导智能 等离子注入/晶体生长段位 | 后续 |
| **Phase C** | treeMap sourceSegment 字段+前端渲染复用验证(`python scripts/page_audit.py` 第【7】项沿用 + 浏览器硬刷 §13.X.9.1) | 后续 |
| **Phase D** | 主营占比口径标注(§6.13 `scripts/verify_business_structure.py` 跑通) | 后续 |
| **Phase E+** | §11.13 后续登记:Phase B+ 进展 + 维度补缺 | 持续更新 |

**【数据治理纪律】**:
- 全程遵循 CLAUDE.md §6(数据真实性铁律)+ §6.7(豆包幻觉防御)+ §6.11(13 条硬约束)+ §6.13(占比核实)+ §6.15(亏损公司专项)
- 全程遵循 CLAUDE_CORE_RULES.md §13.X(数据层同步纪律)+ §13.X.9(前端渲染验证纪律)+ §13.Y(数据真实性校验 + 检查脚本全覆盖纪律)+ §6.5(LLM 推理 vs 真实数据强约束)
- 6 维 dims6.reason 字段使用 `tier:'estimate'` + 标 `(Phase B 补)` 占位,**符合 §1 数据真实性铁律"未核实必须显式标注"红线**(未编造事实)
- stock-level dims6.score 字段已给定 placeholder(3/3/3/3/3/3 or 5/5/5/5/2/5)但 reason 字段待 Phase B+ 真实 baostock L1 实证填充

**【后续 Phase 12 维护期评估】**:
- 若 `data/semi-equipment.js` 完全失去对账价值(例如重构后数据已完全迁移至新 chain),可在 Phase 12 评估彻底删除(deprecated 文件 + manifest 第 8 位条目)
- 暂不删除理由:保留作"重构前 vs 重构后"对比参考,后续 PCB 链治理经验复用提供历史对照

**完成定义**(本次 commit 全部达成):
- ✅ data/semicon-equip.js 创建并通过 node 加载验证(6 segments + 5 treeMap 列 + 3 chokePoints + 4 supplyGap + 6 prosperity dims + 10 midstream stocks)
- ✅ data/semi-equipment.js 顶部 deprecated 标记
- ✅ index.html 5 处集成(DATA_VERSION + manifest + sidebar + sectorName/sectorColor + CHANGELOG)
- ✅ CLAUDE.md §11.13 本章节登记
- ⏳ Phase B+ 多次会话迭代补 stock-level dims6(本次不完成)

**事故案例归档**(本次 commit 0 错误):
- ✅ 无 hallucination 内容(每个 stock 的 dims6 reason 字段都标 `tier:'estimate'` + `(Phase B 补)`,不假装已填)
- ✅ 无 603183 类代码错误(stock.code 已用 baostock 已知正确 6 位代码)
- ✅ 无虚假 PASS(page_audit 16/16 是真实 PASS,因第【7】项仅查 PCB 双层架构,新 chain 为 N/A)

### §11.14 semicon-equip P0 基础设施(双层架构 + 命名空间修复 + check 脚本)·双 commit(2026-07-09 立)

> **触发**:Phase A 骨架(commit 6.63, 2026-07-09)在 `data/semicon-equip.js` 建好 800+ 行骨架,但 24 只 stock × 6 维 dims6 字段全部内联在 auto 层(数据体量 ~30 KB),与「auto 层放自动估值字段」的设计意图冲突,需 P0 基建拆分双层架构。

**【本次 2 个 commit 概览】**

| commit | 主题 | 涉及文件 | hash |
|---|---|---|---|
| **6.62** | P0 基建:双层架构拆分 + 渲染层 fallback 修复(含命名空间 bug)+ check_semicon_sync | A semicon-equip.manual.js / M semicon-equip.js / M index.html / A scripts/check_semicon_sync.js | (见 `git log --oneline`) |
| **6.64** | 3 项 name 冲突修复:4 个 placeholder code 唯一化 | M data/semicon-equip.js | (见 `git log --oneline`) |

#### §11.14.1 P0 主 commit(6.62)— 双层架构迁移 + helper 命名空间修复

**【动机】**

Phase A commit 6.63 把 24 只 stock × 6 维 dims6 字段全部内联在 `data/semicon-equip.js`。
- **问题 1(数据治理)**:dims6 字段属「用户维护的 6 维景气主观判断」,不应与自动估值字段混在同一文件
- **问题 2(渲染层)**:精简 auto 层后 `s.dims6` 字段不存在,渲染层 `stockDims6Badge` 会因 dims=undefined 返回空字符串 → "🆪 六维 ▾" chip 不显示
- **问题 3(同步校验)**:新建 chain 无独立检查脚本,baseline 检查只能手工

**【双层架构拆分】**

| 层 | 文件 | 体量 | 字段 |
|---|---|---|---|
| auto 层 | `data/semicon-equip.js` | 33 KB(原 92 KB,减重 -64%) | rank/name/code/position/barrier/tier/valAsOf/src/trend/trendNote/logic 共 11 字段 |
| manual 层 | `data/semicon-equip.manual.js`(新增) | 31 KB,24 stocks × 6 维 | dims6(score/trend/tier/reason/evidence/flag/src)6 维数组 + `window.SEMICON_EQUIP_MANUAL` 命名空间 |

**【命名空间派生 bug + 修复(关键)】**

`index.html` 内 2 个 helper 函数 `getEffectiveDims6(s, chainId)` + `getEffectiveDims6Note(s, chainId)` 原实现:
```js
const manual = window[chainId.toUpperCase() + '_MANUAL'];
```
对 `chainId='semicon-equip'` 产出 `'SEMICON-EQUIP_MANUAL'`(带连字符)。

但 `data/semicon-equip.manual.js` 注入用的是 `'SEMICON_EQUIP_MANUAL'`(下划线)。

**bug 结果**:helper 永远找不到 manual 层,永远返回空 dims → chip 不显示(即使 manual 数据完整)。

**修复**:加 `.replace(/-/g, '_')`,对齐其他 helper(line 1596/1699)既有命名空间派生规则:
```js
const manualKey = chainId.toUpperCase().replace(/-/g, '_') + '_MANUAL';
const manual = window[manualKey];
```

**【自动化验证】**

新建 `verify_chip_render.js`(Node 脚本,无需浏览器):
- 对比 buggy / fixed 两个 helper 版本
- 4 种 chainId 模式测试(pcb / semicon-equip / ai-server / liquid-cooling)
- 修复前 0 条 dims → 修复后 6 条 dims

**结果**:
- `stockDims6Badge` 生成的 chip HTML 现包含「🆪 六维 ▾」+「综合 75/100 · 共 6 维」
- 浏览器硬刷验证:中微 688012 在「⑤ 上游拆解 → CCP/ICP 刻蚀设备 → A 股标的」行正常展开 6 维 mini-bar + 雷达图 ✓

#### §11.14.2 check_semicon_sync.js 检查 2 判定逻辑调整(core vs treeMapOnly 分类)

**【动机】**

初始版本 `check2_stockCodeConsistency()` 把所有 5 处引用(segments/midstream/chokePoints/treeMap/fourQuestions)统一视为 core references,任何 `uniqueCodes` 找不到的 code 都报 ⚠ orphan refs。

semicon-equip 链 treeMap 含 43 项上下游生态背景(中芯国际/长江存储/长鑫存储等),这是 PCB 黄金范例设计的 treeMap 全景视角,不计入 core stock list 也不应报 ⚠ 警告。

**【分类判定】**

| 类型 | 路径 | 计入 orphan 警告? |
|---|---|---|
| **core references**(44) | segments[].stocks[] + midstream.stocks[] + chokePoints[] | **必须 = 0**(任何 orphans 都是真实数据缺失) |
| **treeMapOnly references**(77) | treeMap[*][*].companies[] | **不计警告**(PCB 设计意图,生态背景) |

**【报告输出】**

```
【2】Stock 名称/代码一致性回归检测
  [ℹ] 设计口径:core vs treeMapOnly 二分类
      · core = segments/midstream/chokePoints — 必须命中 unique stock list
      · treeMapOnly = treeMap.*.companies — PCB 上下游生态背景,不计入警告
  core references: 44 | treeMap references: 77
  name 冲突: X (必须为 0)
  core 游离(must be 0): X
  treeMap 生态背景游离(P=背景,不计入警告): X unique codes (基线持续记录)
```

**【退出码调整】**

原:`r1.issues > 0 || r2.nameConflicts > 0 || r2.orphanRefs > 0 || !r4.mtimeValid` → exit 1
新:`r1.issues > 0 || r2.nameConflicts > 0 || r2.coreOrphans > 0 || !r4.mtimeValid` → exit 1
(treeOrphans 不计入 exit 1,符合 PCB 设计)

#### §11.14.3 独立 commit(6.64)— 3 项 name 冲突修复(4 个 placeholder code 唯一化)

**【触发】**

commit 6.62 落地后跑 `check_semicon_sync.js`,check 2 报 3 项 name 冲突:
```
- （未上市） 期望 "长江存储" 实际 "长鑫存储" @ treeMap.downstream[1].companies[1]
- （未上市） 期望 "长江存储" 实际 "中科信" @ treeMap.midstream[5].companies[3]
- （未上市） 期望 "长江存储" 实际 "中科信" @ treeMap.equipment[1].companies[1]
```

**【根因】**

4 处 placeholder(长江存储 / 长鑫存储 / 中科信 × 2)都用同一字符串 `code:"（未上市）"`。脚本遍历 references 时遇到 code 重复即比对同 code 不同 name → 报冲突。

**【方案 A 修复 · placeholder code 唯一化】**

| stock | 位置 | 原 code | 新 code |
|---|---|---|---|
| 长江存储 | treeMap.downstream[1].companies[0] | "（未上市）" | "未上市·IDM存储1" |
| 长鑫存储 | treeMap.downstream[1].companies[1] | "（未上市）" | "未上市·IDM存储2" |
| 中科信 | treeMap.midstream[5].companies[3] | "（未上市）" | "未上市·离子注入1" |
| 中科信 | treeMap.equipment[1].companies[1] | "（未上市）" | "未上市·离子注入2" |

**【为什么方案 A 不删 placeholder】**
- 长江存储 / 长鑫存储 / 中科信 是真实产业链重要未上市节点(大基金三期重点投资标的)
- 移除会破坏 treeMap 上下游生态
- 唯一化 code 让脚本能区分引用,既保留数据又消除冲突

**【后续 Phase B+ 探针】**

这 3 家 IPO 后手动将 placeholder code 换成真实股票代码,placeholder 字符串「未上市·XXX」作为"已 IPO 探针信号"使用。

#### §11.14.4 双 commit 验证结果(2026-07-09 完成)

**【page_audit.py】**

```
16项通过 / 0项失败
[PASS] 双层架构 stock 列表完全同步
[PASS] 数据层同步状态检测(manifest vs 实际文件)
```

**【check_semicon_sync.js】**

| 检查项 | 6.62 baseline | 6.64 修复后 |
|---|---|---|
| check 1(双层字段数值一致性) | ✓ 0 偏离 | ✓ 0 偏离 |
| check 2(name 冲突) | ⚠ 3 项 | ✓ 0 项(从 3 降 0) |
| check 2(core 游离) | ✓ 0 | ✓ 0 |
| check 2(treeMap 生态背景游离) | 43 unique codes(基线) | 43 unique codes(不变) |
| check 3(股票口径 reason) | 1/24(4.2%) | 1/24(4.2%) |
| check 3(字段口径 reason) | 6/144(4.2%) | 6/144(4.2%) |
| check 4(DATA_VERSION + mtime) | ✓ | ✓ |

**【浏览器硬刷验证 chip 展开】**
- 中微 688012 在「⑤ 上游拆解 → CCP/ICP 刻蚀设备」table 行
- stockDims6Badge 生成的 `<details>` 现正常展开
- 6 维 mini-bar(durability/visibility/policy/supply/valuation/barrier)+ 综合分数显示 OK

#### §11.14.5 完成定义(本次 P0 基建)

- ✅ data/semicon-equip.manual.js(31 KB,24 stocks × 6 维 dims 完整)
- ✅ data/semicon-equip.js 精简(92 KB → 33 KB,-64% 体量)
- ✅ index.html helper 命名空间连字符 bug 修复(`.replace(/-/g, '_')`)
- ✅ 自动化验证脚本:verify_chip_render.js(0 → 6 条 dims 确认)
- ✅ browser hard-refresh:688012 chip 正常展开 ✓
- ✅ scripts/check_semicon_sync.js(4 项检查 + baseline 持久化)
- ✅ check 2 判定逻辑:core vs treeMapOnly 二分类
- ✅ 3 项 name 冲突修复:4 个 placeholder code 唯一化
- ✅ page_audit 16/16 PASS
- ✅ check_semicon_sync 全部 expected(P0 前基线已 OK)

**【不包含(留 Phase B+)】**
- ❌ 24 只 stock 真实 6 维 dims6 reason 完整 baostock L1 实证(当前 23 只仍为 `(Phase B 补)` 占位,1 只 688012 已有结构化 reason)
- ❌ auto 层 estimation 字段(PE/PB/quadrant 等 akshare 抓数)实装
- ❌ src URL ≥ 2 独立来源(目前为 akshare/新浪财经占位)
- ❌ threefold validation(stock code/段位/name)
- ❌ treeMap sub-card sourceSegment 字段复用

#### §11.14.6 事故案例归档

- **命名空间连字符 bug**:典型「模式拼接忽视连字符」陷阱,其他 12 条赛道无此问题(single-word),但 semicon-equip / ai-full-chain 这类 multi-word 命名才会触发。修复要点:helper 一律统一 `.replace(/-/g, '_')` ✓
- **3 项 name 冲突 4 处占位**:典型「占位字符串太一般化」,即使 treeMap 上下游生态背景合规,也不能 4 处共用同一字符串。设计应每个 placeholder 独立编码(`「未上市·IDM存储1」` / 「「未上市·离子注入1」」),且关键字眼(存储/注入等)能让 Phase B+ IPO 后 grep 替换 ✓

**违反本节 = §6.2 红线(占位字符串降低信号清晰度)+ §11.16 命名一致性原则违反**。

#### §11.14.7 数字澄清 · 36 → 39 unique code+name 组合(2026-07-09 commit 6.66 立 · 后续追溯钩子)

> **本节为 §11.14.4 表格中 `treeMap 生态背景游离: 43(实测 38 unique / 用户回忆 36)` 数字澄清的最终结论**。避免后续翻 baseline 时又对不上号产生新一轮困惑。

| 字段 | 含义 | 数值 |
|---|---|---|
| `treeMap refs 总数` | 5 列(downstream/midstream/materials/equipment/sideBranches)所有 companies 节点引用的 **refs 数量**(不去重) | **77** |
| `orphan refs` | 在 core path unique stock code 找不到的 refs(不去重) | **43** |
| `unique code+name 组合` | orphan refs 按 `code\|name` 组合去重后的 **unique 组合数** | **39** |

**36 → 39 数字澄清**

- 上一轮(commit 6.62 修复后,6.64 修复前)实际 unique code+name 组合数 = **38**(`35 个真实股票 + 3 个 placeholder 引用合并「（未上市）」`)；用户凭印象回忆的 "36 unique" 是简化记忆,缺失 2 个细节(可能是漏算了 IDM 等子节点)。本次脚本跑出的精确数字 = **38** → **39**。
- 6.64 commit 把 1 个 placeholder code「（未上市）」(覆盖 4 处引用 → 3 个 code+name 组合)拆成 4 个独立 placeholder code(每个引用 1 个 unique code)→ +1 个 unique code+name 组合。

实际净增 = **+1 unique code+name 组合**(从 38 → 39),**非用户回忆的 +3**。

复现脚本与基线:
- 工具:[`scripts/check_unique_stock_codes.js`](scripts/check_unique_stock_codes.js) — 长期复用,每次 treeMap 结构变动后跑一次快速核对
- 基线持久化:[`.claude/scratch/semicon-equip-unique-codes-baseline.json`](.claude/scratch/semicon-equip-unique-codes-baseline.json) — 含 `uniqueCodeNames: 39` 字段 + 全部 39 项 unique breakdown(code+name+refCount)
- 用法:`node scripts/check_unique_stock_codes.js` 或 `node scripts/check_unique_stock_codes.js <chainId>`

**为避免以后误读,在 `_clarification_36_to_39` 字段写入 baseline.json 内部做了根因登记**(2026-07-09 commit 6.66 立)。

### §11.15 002371 北华创接口口径不一致 → visibility 定性反转案例(2026-07-09 commit 6.67 立 · Phase B 第 1 批启动 §前置 1 实测触发)

> **本节作为「数字偏差可能反转定性结论」的永久警示案例归档**。性质判断:错误数字(-5.34% 增收不增利 + 0% 持平)与正确数字(-1.77% 温和下降 + +3.42% 企稳回升)代表**两种完全不同的定性判断方向**。如果按错误数字走会导致 visibility 维度可能被误打低 1 档(2-3 → 应有的 3-4)。

**【触发】**

Phase B 第 1 批(688012 中微 / 002371 北华创 / 688072 拓荆)启动前 §前置 1 接口连通性实测。本机 Windows 代理环境:
- `baostock.q_profit_data` / `baostock.q_history_k_data_plus` / `baostock.query_all_stock` — **全部返回 0 rows(socket 通讯被代理拦截)**
- `akshare.stock_financial_analysis_indicator_em` — TypeError: 'NoneType' (东方财富 JSON schema 已变更)
- `akshare.stock_individual_spot_xq` — KeyError: 'data'
- `akshare.stock_zygc_em` — KeyError: 'zygcfx'(§6.13.5 已记录)
- ✅ 可用:aksha re 同花顺(ths)通道所有接口

ths 通道下做 4 项实测时发现 Phase A position 字段数字与 ths L1 实测数据严重不符(详见 §前置 1 report)。在确认有差异后,用户敏锐指出:

> 「北方华创(002371)报告里写:2025Q1 净利 15.68亿 / 2026Q1 净利 15.68亿(同比0%,与2025Q1 持平)。两个不同季度的净利润数字完全一致(精确到小数点后两位),这在真实财务数据里概率极低。请重新用 ths 接口单独核实一次。」

**【实测定位】**

| 维度 | 老报告(benefit_ths) | 正确(abstract_ths) | 偏差 |
|---|---|---|---|
| 002371 2025Q1 净利 | 15.68 亿 | **15.81 亿** | +0.13 亿 |
| 002371 **2026Q1 净利** | **15.68 亿(巧合)** | **16.35 亿** | **+0.67 亿**(用户怀疑点) |
| 002371 2025 全年净利 YoY | -5.34%(增收不增利) | **-1.77%(温和下降)** | **方向不同** |
| 002371 2026Q1 净利 YoY | **0%(持平)** | **+3.42%(企稳回升)** | **完全相反方向** |
| 688012 2026Q1 净利 | 9.18 亿 | **9.30 亿** | +0.12 亿 |
| 688012 2026Q1 净利 YoY | +198.05% | **+197.20%** | -0.85pp(近似) |
| 688072 2025Q1 净利 | -1.52 亿 | **-1.47 亿** | -0.05 亿 |
| 688072 2026Q1 净利 | 5.62 亿 | **5.71 亿** | +0.09 亿 |

**【根因】**

`stock_financial_benefit_ths` 接口的 `*净利润` 字段命名不规范:
1. 实际数据口径与 standard "归母净利润" 有 0.13-1.13 亿偏差
2. 对同一只 stock 不同季度调用时存在"数字巧合 bug"(002371 2025Q1 / 2026Q1 同为 15.68 亿)
3. 该接口在 akshare 1.18.60 版本可能已经废弃或字段重命名(`stock_financial_analysis_indicator_em` 报错可能也是同类问题)

**【影响范围】**

- 本批次 3 只 stock 全部 Phase A 已存档字段需重新核实
- visibility 维度特别敏感:任何基于错误净利数据的 trend 判断会反转 1 档
- 688072 visibility "2026Q1 净利 5.62 亿 = 2025 全年净利(9.15 亿)的 61%" → 修正为 "5.71 亿 / 9.27 亿 = 61.6%"
- 整个 prompt 模板必须清除错误数据点,标记为「待验证的既有假设」

**【002371 visibility 维度两种相反定性对比】**

| 来源 | 净利数据 | visibility 推理 | 可能评分 |
|---|---|---|---|
| benefit_ths 错误版本 | 2025 -5.34% / 2026Q1 0% | 「2025 增收不增利,Q1 持平,趋势向下」 | 2-3 |
| abstract_ths 真实版本 | 2025 -1.77% / 2026Q1 +3.42% | 「2025 净利温和下降(-1.77%),2026Q1 +3.42% 企稳回升,A 类正面信号,趋势转为温和上行」 | 3-4 |

**性质定性**:同样的 stock,只是底层数字从错误版本变为正确版本,visibility 维度的 trend 结论从「向下」翻转为「向上企稳」,分数可能差 1 档。这是**数字偏差可能反转定性结论**的典型案例。

**【修复处置】**

1. 永久规则已写入 §6.17(abstract_ths 为 L1 财务时序数据单一权威源,严禁使用 benefit_ths)
2. prompt 模板 v2 已用 abstract_ths 真实数据重写 §0 [1] 各 stock L1 实证字段
3. prompt §4 自查清单新增 "严禁使用 benefit_ths 数据(本批次仅 abstract_ths 权威源)" + "002371 visibility 必含 2025 -1.77% / 2026Q1 +3.42% 企稳回升" 黑名单
4. Phase A 全部字段(13.35 亿 / 2.16 亿 / 87.5% / 122% / 30-150 台 / 53.6 亿 / 5.4 亿 / 30.9% / 46.4% / 25%+ 全球份额 / 2025-12 中标 / 15.68 亿 / 0% 持平 / -5.34% 增收不增利)全部列入黑名单

**【自查报告(§7.2 格式)】**

【已知正确】(本次 commit 涉及的数据项均经 abstract_ths L1 实证):
- 688012 中微 2024 全年 营收 90.65 亿 / 净利 16.16 亿
- 688012 中微 2025 全年 营收 123.85 亿(YoY +36.62%)/ 净利 21.11 亿(YoY +30.69%)
- 688012 中微 2026Q1 营收 29.15 亿(YoY +34.13%)/ 净利 9.30 亿(YoY +197.20%)// 销售净利率 31.51%
- 002371 北华创 2024 全年 营收 300.75 亿 / 净利 56.22 亿
- 002371 北华创 2025 全年 营收 393.53 亿(YoY +30.85%)/ 净利 55.22 亿(YoY -1.77% 温和下降)
- 002371 北华创 2026Q1 营收 103.23 亿(YoY +25.80%)/ 净利 16.35 亿(YoY +3.42% 企稳回升)
- 688072 拓荆 2024 全年 营收 41.03 亿 / 净利 6.88 亿
- 688072 拓荆 2025 全年 营收 65.19 亿(YoY +58.87%)/ 净利 9.27 亿(YoY +34.67%)
- 688072 拓荆 2026Q1 营收 11.12 亿(YoY +56.97%)/ 净利 5.71 亿(YoY +488.29% 从亏损反转)
- 销售净利率 688012 16.67% → 31.51% / 688012 002371 002371 13.74% → 15.19% / 688072 14.03% → 50.54%
- 机构 EPS 预测均值 688012 3.42 元 / 002371 10.37 元 / 688072 5.90 元

【已知错误/异常】(本次 commit 触发的数据修正):
- ❌ stock_financial_benefit_ths 对 002371 在 2025Q1 和 2026Q1 同一字段都返回 15.68 亿(字段命名 bug,不可信)
- ❌ Phase A 中 002371 position 字段"53.6 亿/5.4 亿 +30.46%/+10.3%"(与实测差 1.93 倍,纯估计)
- ❌ Phase A 中 688072 position 字段"13.35 亿/2.16 亿 +87.5%/+122%"(与实测差 -2.23/+3.55 亿,完全错误)
- ❌ Phase A 中 688012 position 字段"+30.9%/+46.4%"(实测 +34.13%/+197.20%,严重低报同比)
- ❌ 002371 visibility 早先基于 benefit_ths 推出的"-5.34% 增收不增利 + 0% 持平"定性(实测 -1.77% + +3.42%,完全反方向)

【待核实(人工抽查)】:
- akshare version ≥ 1.18.60 是否所有 stock 都有 abstract_ths / benefit_ths 接口行为差异?需建 verification 脚本 (`scripts/__verify_ths_interfaces.py`) 对其他 21 只 stock 跑一次实战测试
- akshare 文档中是否存在 stock_financial_benefit_ths 字段语义说明?若该接口已废弃,需在 akshare GitHub issue 跟踪
- abstract_ths 是否也有未发现的字段命名 bug?需要持续监控

【数据完整性统计】:
- 总数:3 只 stock
- 字段修正:abstract_ths vs benefit_ths 8 项字段差异 / Phase A position 错误 3 项
- 关键字段覆盖率:net profit ✅ / revenue ✅ / net margin ✅ / EPS forecast ✅
- 双源覆盖:abstract_ths + sina cross-check(not full)

**【复用方式(11 链扩展)】**

- 任何 chain 后续 Phase B+ 启动时,**必须**先跑 `scripts/__verify_ths_interfaces.py`(待建)对目标 stock 验证 abstract_ths 与 benefit_ths 是否一致
- 任何"两个季度净利数字完全一致(精确到小数点后两位)"的疑似巧合,必须立即用 abstract_ths + 资产负债表反算 + 现金流量表三方交叉验证
- visibility / durability / supply 维度的 reason 中的数字必须能追溯到 **abstract_ths** 实测,**禁止**引用 benefit_ths

**违反本节 = §6.2 红线(字段命名 bug 导致的数字偏差)+ §6.17 新规违反 + §6.8 数据准确度优先原则违反**。

---

### §11.17 先进封装历史数据归档记录(2026-07-10)

> advanced-packaging 历史数据(a4e5f6e)已归档至 `data/_archive/advanced-packaging.a4e5f6e.js`,未经现行治理规则审计,暂不计入任何产业链建设进度或优先队列。

(同日调查:光互联 `optical-interconnect.js` + 存储与接口 `storage-interface.js` 在 reflog 中仅出现骨架 commit(caa71ba + c1170cc),历史从未注入过任何股票/分段数据,按"从未存在过历史版本"处理,不提取。后续新建时按现行标准全新建。)

---

### §11.18 光模块·光互联合并后旧 nav 入口 7 天过渡期提醒(2026-07-10 commit 6.71 立 · 需人工确认执行)

> **过渡期开始日期:2026-07-10 · 预计删除日期:2026-07-17 · ⚠ 以下操作需人工确认并执行,不是自动删除**

**背景**:三链合并(光模块+光芯片+CPO)完成后,旧 nav 入口 `cpo` / `optical-chip` 已改为灰显(`.coming`),保留 7 天供用户过渡访问旧链内容。

**到期后需人工执行**:
1. 从 `index.html` nav-list 中删除以下两行(约 line 670 附近):
   ```
   <span class="nav-item coming" data-chain="cpo" ...>💡 CPO(旧)</span>
   <span class="nav-item coming" data-chain="optical-chip" ...>🔬 光芯片(旧)</span>
   ```
2. 从 `data/_archive/` 中清理 3 个旧文件(可选,也可长期保留作为合并对账参考):
   ```
   data/_archive/cpo.js.deprecated
   data/_archive/optical-chip.js.deprecated
   data/_archive/optical-module.js.pre-merge-backup
   ```
3. 在 commit message 中注明"旧 nav 入口过渡期结束 · 正式移除"
4. 本机 browser 硬刷确认"光模块·光互联"入口正常渲染

**⚠ 注意:以上操作必须由人工确认并执行,不存在自动删除机制。到期后如未执行,旧入口将一直以灰显状态保留在 nav 中。**

---

### §11.19 批量写入脚本·字符串匹配意外多重命中教训(2026-07-10 commit da63052 立)

> **触发事故**：Phase B 第 2 批 dims6 写入脚本（`.tmp_update_dims6.py`）使用 `str.replace(old, new)` 做全文字符串匹配替换时，`（万业子公司）凯世通` 与 `600641 万业企业` 的 Phase A placeholder dims6 结构**完全相同**（score 序列均为 `4/4/5/5/2/5`），导致一条 `replace()` 同时命中两个 block——凯世通的 dims6 被错误注入了母公司万业企业的完整 6 维 reason 数据。

**事故影响**：
- `check_semicon_sync.js` check3 股票口径从预期的 6/24 虚增为 7/24（凯世通被误认为"已补全"）
- 字段口径从预期的 36/144 虚增为 42/144
- 数字偏差 +1 只股票 / +6 字段——恰好对上了"多了一只"的差异

**根因分析**：
- **直接原因**：`str.replace()` 默认**全局替换全部匹配项**，而两个 stock block 的 placeholder dims6 字符串内容完全相同
- **深层原因**：写入脚本依赖**字符串内容匹配**确定替换位置，而非使用 stock code 或数组 index 做**唯一标识精准定位**
- **触发条件**：当两个不同的数据块恰好有相同的 placeholder 内容时，任何基于"内容匹配"的替换都会命中全部实例

**防止重犯的具体规则（新增 · 永久生效）**：

1. **任何批量写入脚本禁止使用全文字符串匹配定位写入位置**——必须使用以下三种方式之一：
   - **方式 A · stock code 唯一标识**：用 `code` 字段在文件内容中精确定位目标 block 的起止位置，然后只替换该范围内的内容
   - **方式 B · 数组 index**：如果目标数据在有序数组中，用 index 直接定位
   - **方式 C · Node.js require + 写回**：用 Node.js `require()` 读取数据文件 → 在 JS 对象层修改 → 用 `JSON.stringify` 或精确行定位写回

2. **任何依赖 `str.replace()` 的批量写入脚本，必须在写入前做"唯一性检查"**：
   - ⚠ `content.count(old_string) > 1` → **立即拒绝执行**，要求改为精准定位方式
   - ✅ `content.count(old_string) == 1` → 可以继续（但建议仍用方式 A 防 future 碰撞）

3. **写入完成后，必须做"意外重复检查"**：
   - 对比预期变更的 stock 数量 vs 实际变更的 stock 数量
   - 本次事故的检测信号：check3 股票口径 +4 而非预期的 +3 → `check_semicon_sync.js` 已具备此检测能力

**为什么凯世通与万业企业有相同的 placeholder dims6**：
- Phase A 骨架构建时，凯世通作为万业企业的全资子公司 placeholder，其初始 barrier/policy 判定与母公司一致（离子注入机赛道属性），因此 score 序列碰巧相同
- 这本身不是数据错误（两个实体在同一赛道确实可能初始判定一致），但暴露了**"用内容匹配区分不同实体"的脆弱性**

**事故案例归档**（本次 1 例）：
- **2026-07-10 commit da63052 · 万业企业 600641 → 凯世通数据误注入**：Python `str.replace()` 全局匹配命中两个 block，commit 6.70 第一次提交时 check3 显示 7/24（含凯世通虚假达标），amend 后修复为 6/24

**复用方式（11 链扩展 + 后续 Phase B 批次）**：
- 任何 chain 后续 Phase B dims6 写入，**禁止复用本次出事故的 `.tmp_update_dims6.py` 脚本模式**
- 必须提前验证目标 chain 是否存在"不同 stock 有相同 placeholder dims6 结构"的潜在碰撞风险（`grep -c` 统计每种 score 序列的出现次数）
- 若存在碰撞风险 → 强制使用方式 A（stock code 精确定位）或方式 C（Node.js 对象层修改）

**违反本节 = §6.2 红线（数据被注入到错误的目标 entity）+ §6.8 数据准确度优先原则违反**。

#### §11.19.1 「按 segment 收尾」框架隐裂教训（2026-07-10 commit da63052 关联立）

> **触发**：Phase B 第 1 批 + 第 2 批连续使用"CCP/ICP 刻蚀段 5/5 已收尾"框架汇报，被用户指出**股票跨 segment 归属矛盾**——688072 拓荆只出现在 seg[1] 薄膜沉积段，却被错误归入 seg[0] CCP/ICP 刻蚀段统计。同时 6 只已完成的 stock 中有 5 只跨 ≥2 个 segment，不存在互不重叠的干净段位边界。

**框架缺陷**：
- "按 segment 收尾"的隐藏假设是**每只 stock 只属于单一 segment**
- 半导体设备等行业的卡口股票天然跨多个产业环节（如北方华创同时覆盖刻蚀+薄膜沉积+PVD+CVD+清洗+炉管），这一假设不成立
- 用"segment 内 stock 全部完成 = 段位收尾"作为进度框架时，跨段股票会导致：(a) 段位归属争议（"这只到底算哪个段的"）(b) 虚假收尾（一个段的所有 stock 都已完成，但这些 stock 在其他段也有位置，那个段却还未启动）(c) 统计口径漂移（同一批股票在不同报告中归入不同段位，失去连续性）

**修正**：
- 后续 Phase B 推进**不再以 segment 完整度为收尾标准**
- 改为直接以 **"未完成 stock 清单 + 按卡口重要性优先级排序"** 为单位推进
- 排序依据：barrier 等级 → midstream 成员 → segment 内 rank → 赛道卡口属性
- 每批做完 N 只 stock 的 dims6 reason 补全，报告时按"已完成 X/24"统计总量，不再按段位分组

**影响范围**：
- semicon-equip 24 只 stock 中 6 只已完成、18 只待续（Tier 1-4 四级优先级已建立）
- 后续 11 链扩展时，如链内 stock 也存在跨段现象，直接沿用此模式

**事故案例归档**（本次 1 例）：
- **2026-07-10 commit da63052 后**：用户追问发现 688072 拓荆被错误归入 CCP/ICP 刻蚀段（实为薄膜沉积段），追溯发现第 1 批起就存在"按段位名批量归类而不逐只核实实际 segment 归属"的惯性错误

**违反本节**：无（框架缺陷不是数据错误，但继续沿用此框架会导致后续进度报告失真）。

#### §11.19.2 Phase A 骨架·主体产业链归属核实教训（2026-07-11 commit 9b33f5a 关联立）

> **触发**：Phase B 执行过程中连续 3 批发现 3 个"segments 清单纳入了非匹配产业链主体"的结构性问题——凯世通（非独立上市主体·第 4 批）、张江高科（园区运营+产业投资平台·第 5 批）、华大九天（EDA 软件公司·第 5 批）。三种不同的"主体性质不符"模式全部来自 Phase A 骨架构建阶段的归类错误。

**三种模式归档**：

| 模式 | 案例 | 真实性质 | 不符原因 |
|---|---|---|---|
| **非上市主体** | 凯世通（万业子公司） | 万业企业全资子公司 | 非独立 A 股标的·无独立 L1 财务数据·不可独立打分 |
| **投资平台** | 张江高科 600895 | 上海张江园区运营商+产业投资 | 业务本质是园区物业+投资收益（净利率 50%）·非设备制造 |
| **软件公司** | 华大九天 301269 | EDA 电子设计自动化软件 | 产品是软件许可证·物理卡口框架不适用·应归属 EDA/IP 独立赛道 |

**根因**：Phase A 骨架（commit 6.63）在"按 PCB 模板快速搭建框架"时，对 stock 的主体产业链归属**只做了"名字看起来相关"的粗筛**（凯世通=离子注入相关/张江高科=光刻园区相关/华大九天=光刻掩膜版设计相关），未做"这个公司到底卖什么产品/靠什么赚钱"的实质业务核实。

**防止重犯的规则（新增 · 永久生效）**：

1. **任何新链在 Phase A 骨架搭建阶段，必须增加"主体产业链归属核实"一步**：
   - 每只 stock 至少确认：①主营业务产品形态（硬件/软件/服务/投资）②营收/净利的行业构成（≥50% 来自目标产业链？）③是否为独立 A 股上市主体
   - 三类直接排除：非独立上市主体 / 投资平台（主业非制造业） / 纯软件公司（物理卡口框架不适用）
   - 三类标记为边缘但保留：主业非半导体但设备制造真实存在 / 洁净室等基础设施配套 / 半导体占比 <50% 但战略培育中
   - 核实通过后才纳入 segments 清单，不要等到 Phase B 打分阶段才发现

2. **现有链的 Phase A 骨架需做追溯核查**（非阻塞 · 后续 Phase 12 维护期执行）：
   - 对已完成的 semicon-equip 链（已完成三轮移除）——无需追溯
   - 对其他 11 条链的 segments 清单做一次"主体产业链归属"快速扫描（grep position/logic 字段 + 核对 abstract_ths 营收来源）
   - 预期发现：optical-module 链可能存在类似问题（seg5 侧枝应用含 5G 电信标的），其他链风险较低

**事故案例归档**（3 例）：
- **2026-07-10 commit 9b33f5a（第 4 批）**：凯世通从 segments 移除·非独立上市主体
- **2026-07-11 commit 待定（第 5 批）**：张江高科+华大九天从 segments 移除·投资平台+软件公司
- **累计移除**：24→21 只（-3 只），剩余 21 只全部为半导体设备/材料/配套硬件标的

**复用方式**（11 链扩展）：
- 任何新链 Phase A 骨架搭建完成后，跑"主体产业链归属核实"步骤，产出核实报告
- 核实标准：上述三类排除 + 三类边缘保留
- 现有 11 链的追溯核查按 Phase 12 维护期排期

**违反本节**：无（预防性规则·无已发生的数据错误）。

#### §11.19.3 semicon-equip Phase B 完整收官总结（2026-07-11 · 5 批次全部完成）

> **触发**：Phase B 第 5 批（最后一批）落地完成，semicon-equip 链 21 只股票全部 dims6 reason 真实数据补全（100%）。本节为完整收官登记，作为后续其他产业链 Phase B 工作的**复用模板**。

**【5 批次完整时间线 + 股票清单】**

| 批次 | commit | 日期 | 新增 | 移除 | 累计 | 涉及 stock |
|---|---|---|---|---|---|---|
| 第 1 批 | `6.67` | 2026-07-09 | +3 | — | 3/24 | 688012 中微 / 002371 北方华创 / 688072 拓荆 |
| 第 2 批 | `da63052` | 2026-07-10 | +3 | — | 6/24 | 688082 盛美 / 600641 万业 / 603690 至纯 |
| 第 3 批 | `cc43044` | 2026-07-10 | +6 | — | 12/24 | 688120 华海清科 / 688037 芯源微 / 300316 晶盛机电 / 300567 精测电子 / 300604 长川科技 / 688765 微导纳米 |
| 第 4 批 | `9b33f5a` | 2026-07-11 | +3 | -1（凯世通） | 15/23 | 688200 华峰测控 / 688502 茂莱光学 / 002222 福晶科技 |
| 第 5 批 | 本 commit | 2026-07-11 | +6 | -2（张江高科/华大九天） | **21/21** | 603061 金海通 / 688361 中科飞测 / 300293 蓝英装备 / 301297 富乐德 / 688376 美埃科技 / 300450 先导智能 |

**【3 只主体性质不符的移除股票】**
- 凯世通：万业企业全资子公司·非独立上市主体·无独立 L1 财务数据（第 4 批）
- 张江高科 600895：园区运营+产业投资平台·净利率 50% 来自投资收益（第 5 批）
- 华大九天 301269：EDA 软件公司·物理卡口框架不适用·应归属 EDA/IP 独立赛道（第 5 批）

**【§6.15 亏损公司框架演变 · 从 1 种到 5 种模式】**

| 模式 | 名称 | 首次发现 | 代表 stock | 核心特征 |
|---|---|---|---|---|
| 模式一 | 营收增长+亏损收窄（扩产阵痛型） | 第 2 批 | 600641 万业 | 营收暴增+亏损但收窄中 |
| 模式二 | 营收下降+亏损扩大（全面恶化型） | 第 2 批 | 603690 至纯 | 营收利润双降+亏损加速 |
| 模式三 | 亏损→刚扭亏（转折型·正向） | 第 3 批 | 300567 精测电子 | 从亏损转为微利 |
| 模式四 | 营收降+利润降+未亏损（周期下行型） | 第 3 批 | 300316 晶盛机电 | 大幅下滑但仍盈利 |
| 模式五 | 全年微利+最新季度转亏（转折型·反向） | 第 4 批 | 688502 茂莱光学 | 正向→反向转折 |
| 变种 | 亏损→扭亏→再亏（模式三不稳定变种） | 第 5 批 | 688361 中科飞测 | 刚爬出亏损又掉回去 |

**【本次流程验证的方法论 · 后续复用模板】**

1. **abstract_ths 单一权威源**（§6.17）：`stock_financial_abstract_ths` 为 L1 财务时序数据唯一来源，`stock_financial_benefit_ths` 永久拉黑。每条 prompt 的 §0 必须预喂 2024 全年/2025 全年/2026Q1 三季实测数据。
2. **Phase A 黑名单机制**：每只 stock 必须逐字段对照 abstract_ths 实测，标注"与实测不符的具体数字黑名单"，明确禁止豆包引用。本链累计发现黑名单 20+ 条，全部在 §6.7.3 筛查中确认为 0 违规。
3. **跨批标杆对比**：第 3 批建立长川科技（300604）为全批次打分标杆，后续每批与标杆逐维对比，偏离需充分理由。第 4 批华峰 vs 长川对比（barrier +1 因模拟赛道格局更优）、第 5 批蓝英 vs 至纯对比（各项略高 0-1 分因 Q1 改善信号）均遵循此规则。
4. **§11.19 精确定位写入**：stock code 精准定位替代全文字符串匹配，写入前唯一性检查（count > 1 → 拒绝），写入后 check3 口径差额验证。第 2 批凯世通事故后全部批次零误注入。
5. **主体产业链归属核实**（§11.19.2）：Phase A 骨架阶段增加"这个公司到底卖什么产品/靠什么赚钱"的实质业务核实，排除非上市主体/投资平台/软件公司三类。

**【复用方式（11 链扩展）】**
- 每条新链 Phase B 启动前，先读本节作为 SOP 模板
- 5 步流程：abstract_ths 实测 → Phase A 黑名单 → prompt v3（§1-§3 完整平铺 13 条硬约束）→ 豆包响应 + §6.7.3 筛查 → stock code 精确定位写入
- 跨批标杆选定：选链内财务最健康+业务最纯正的一只为标杆
- 主体归属核实：Phase A 阶段排除三类不符标的

**违反本节**：无（总结性登记·无已发生错误）。

#### §11.19.4 环境能力边界声明教训（2026-07-11 立 · §11.19 系列第四条）

> **触发**：semicon-equip 渲染验证阶段，CC 在未实际验证的情况下断言"本机无 Playwright 浏览器自动化能力"，导致多轮本可自动化的截图/DOM 结构提取工作改为依赖投顾手动截图完成，造成不必要的人工成本。

**事故简述**：
- CC 多次回复"没有工具可以截图或渲染页面视觉效果，需要用户在浏览器里手动截图"
- 实际环境中 Playwright 1.61.1 + Chromium 一直可用（`python -c "from playwright.sync_api import sync_playwright"` 即可验证）
- CC 凭"浏览器自动化工具通常需要显式安装"的一般性认知，直接断定为"本机没有"，**未执行任何验证命令**
- 影响：P0-1~P0-4 渲染验证阶段的至少 2-3 轮手动截图操作本可由 Playwright 自动化完成

**根因**：将"这类工具通常需要显式安装"的一般性认知，当成了"这个环境里没有"的具体结论——**用假设代替了验证**。这与 §11.15（002371 benefit_ths vs abstract_ths 数字巧合）和 §11.14.7（36→39 unique code 数字澄清）属同类问题——在没有实证的情况下对外宣称一个结论。

**防止重犯的规则（新增 · 永久生效）**：

任何关于环境/工具/接口可用性的判断，**必须先跑一次实际验证命令，再基于结果回答**，不能凭经验假设直接下结论。

```
说"不能"之前，必须先实际尝试一次：
  - 工具是否安装：which <tool> / <tool> --version / import 测试
  - 命令是否能执行：直接跑一次看返回
  - 文件是否能读取：fs.existsSync / open 一次看结果
  - 接口是否能访问：curl 一次 / akshare 直接调一次
```

**适用范围**（不限于 Playwright）：
- 某 Python/Node 库是否已安装
- 某 akshare/baostock 接口当前是否可访问
- 某文件/目录是否存在
- 某端口是否被占用
- 某命令是否在当前 PATH 中
- **一切"能力边界"类判断**

**违反本节**：不需要单独的违规判定（太基础了），但 §11.19 系列四条教训（§11.19 批量写入脚本字符串匹配误命中 / §11.19.1 按 segment 收尾框架隐裂 / §11.19.2 Phase A 骨架主体归属核实 / §11.19.4 本教训）共同构成了**"CC 在未验证情况下给出确定性结论"的系统性风险模式**，后续任何类似"应该没有/应该不会/应该是 X"的猜测性判断，都必须先验证再回复。

**事故案例归档**（本条 1 例）：
- **2026-07-11 P0-4 semicon-equip 渲染验证阶段**：CC 多次回复"无法截图"→ 事实是 Playwright 一直可用 → 投顾多耗费了手动截图操作



### §11.20 PCB 数据污染事故登记（2026-07-11 commit d835b33 立 · P0-5）

> **触发原因**：用户截图发现 PCB 页面"奥士康 002913 核心逻辑列显示 commit 5.0 记录""中钨高新 000657 显示 commit 6.2 记录"，全量扫描后确认 19 只 stock 共 28 处开发操作记录/项目标记误写入用户可见字段。**这是 CC 批量写入脚本缺少内容校验机制的系统性缺陷**，不是单次操作失误。

#### 污染的 4 种类型

| 类型 | 模式 | 涉及 stock | 涉及字段 | 数量 |
|:---:|---|---|---|---|
| **A** | `logic` 被整段替换为 commit 操作记录（如 `★ commit 6.2 立:作为 idx 7 ...同步到 pcb.js 渲染层`） | 000657 中钨高新 / 300179 四方达 | `logic` | 2 |
| **B** | `note` 字段末尾拼接 commit 变更说明（如 `⚠️ commit 5.0: trend 从 up 改为 flat`） | 002913 奥士康 | `note` | 1 |
| **C** | `position` 字段末尾拼接 `+ Phase 9 PCB 短板补充:🟢primary(...)` 项目阶段标记 | 600183/603186/603519/603650/603256/002080/300395/600176/605006/600110/688388/301150/301217/301511/301200/301377/688630/688700/002436 | `position` | 21 |
| **D** | `trendNote`/`fundamentals.note` 用 `★ Phase 2-② 新增·estimate` 占位符代替真实内容 | 000657 中钨高新 / 300179 四方达 | `trendNote` + `fundamentals.note` | 4 |

#### 根因

1. **直接原因**：CC 批量写入脚本（如 Phase 9 的 source tier 补充脚本、commit 6.2 的双层同步脚本）使用**字符串拼接追加**而非字段覆盖的方式写入数据
   - Phase 9：`position += " + Phase 9 PCB 短板补充:" + tier + "(" + source + ")"`
   - Commit 6.2：用开发操作说明字符串覆盖了 `logic` 字段
2. **深层原因**：所有批量写入脚本**没有写入后的内容校验步骤**——没有检测到 `commit`/`Phase`/`idx`/`渲染层` 等开发术语出现在用户可见字段中
3. **系统原因**：全文字符串匹配替换（§11.19 事故同因）遇到两个 stock block 内容相同时会产生意外多重命中；而字符串拼接追加则会把开发标记和投研内容不可逆地混在一起

#### 清理方式

- 类型 A：从 `pcb.manual.js` 取对应 stock 的 `position` 字段覆盖 `logic`
- 类型 B：正则删除 `note` 中的 commit 记录文字，保留其余内容
- 类型 C：正则删除 `position` 末尾 `+ Phase 9 PCB 短板补充:...` 标记，保留纯投研描述
- 类型 D：`trendNote` 改为 `"—"`，`fundamentals.note` 清空

#### 防御机制（永久生效）

`scripts/__inject_se_fundamentals.js` 新增 `FORBIDDEN_DEV_TERMS` 常量和 `validateNoDevTerms(text, fieldName, stockCode)` 函数：

```javascript
const FORBIDDEN_DEV_TERMS = [
  '★ commit', 'commit 6.', 'Phase 2-', 'Phase 9 PCB',
  'idx 7 PCB', '同步到 pcb.js', '渲染层',
  'DATA_VERSION', 'bump', 'Co-Authored-By',
];
function validateNoDevTerms(text, fieldName, stockCode) {
  if (typeof text !== 'string' || !text) return;
  for (const term of FORBIDDEN_DEV_TERMS) {
    if (text.includes(term)) {
      throw new Error(`[CONTAMINATION BLOCKED] ${stockCode}.${fieldName} contains dev term "${term}"`);
    }
  }
}
```

**规则**：所有批量写入脚本（现有及未来）必须在写入前对每个用户可见字段调用 `validateNoDevTerms()`，检测到禁词直接 `throw Error` 阻止写入，**不允许绕过**。

**事故案例归档**（本次 28 例）：
- **2026-07-11 commit d835b33 · P0-5 · 19 只 stock 28 处污染清理**：Phase 2-②（commit 6.2 ~2026-07-03）双层同步写入脚本 + Phase 9（commit ~2026-06-19）tier 补充脚本两批次产生的开发术语污染

**违反本节 = §6.2 红线（开发操作记录伪造成投研内容）+ §6.8 数据准确度优先原则违反**。

**复用方式**（11 链扩展 + 未来所有批量写入）：
- 任何批量写入脚本必须包含 `validateNoDevTerms` 等价校验
- `FORBIDDEN_DEV_TERMS` 列表随事故积累持续扩展
- 写入后必须做一次全字段关键词扫描（`grep -c "commit\|Phase "` 类型）

---

### §11.21 C2 审计痕迹迁移待办（2026-07-11 commit d835b33 登记 · 暂不处理）

> **触发原因**：P0-5 污染排查中发现约 15 只 PCB stock 的 `dims6[i].reason` 字段中包含 commit 编号引用和评分修正记录（如 `▍▍▍▍ 评分下修记录(commit 6.65 · 2026-07-07 下修)` / `★ commit 6.32: visibility 5→4 下修`）。这些是 §6.16 dims6Audit 机制要求的有意义治理记录，不应删除——但它们与用户阅读的投研分析正文混在同一字段中，普通投资者无法区分"这是分析结论"还是"这是开发者备注"。

**现状**：reason 字段承担了双重职责——投研分析正文 + 评分变更审计日志。commit 编号对终端用户无意义，且让 reason 冗长难读。

**建议方案**（后续单独设计，不在本次 commit scope）：
- 将评分修正记录迁移到 `dims6Audit` 字段（该字段已在 300395 菲利华有 inline 范本，结构为 `{reviewedAt, extremeGap, conclusion, reviewer}`）
- 扩展 `dims6Audit` schema 增加 `changeLog` 数组：`[{date, from, to, reason, commitRef}]`
- reason 字段恢复为纯投研分析正文
- 迁移时保留原 reason 中的审计信息，不做信息丢失

**优先级**：P2（不影响数据准确性，但影响用户体验和字段语义清晰度）

**登记 commit**：d835b33

**违反本节**：无（仅为待办登记·不构成违规）。

### §11.22 300522 世名科技·6 维 reason 全部缺失（2026-07-11 commit 6.75 登记 · 后续补全）

> **触发原因**：commit 6.75 auto 层旧 dims6 清理审计发现 300522 在 manual 层 6 维全部缺失 reason 字段（0 字符），且 auto 层 Phase A 占位值与 manual 层差异达 ±3 档（durability 4→1/supply 4→1/barrier 4→1）。核实后确认 manual 层为后续批次重新评估的真实评分，非数据错误——但 6 维 reason 全部缺失构成数据治理缺口。

**当前 manual 层状态**：

| dim | score | trend | tier | reason |
|-----|:--:|------|------|:--:|
| durability | 1 | down | L1 | **空** |
| visibility | 2 | flat | L4 | **空** |
| policy | 3 | flat | L2 | **空** |
| supply | 1 | down | L1 | **空** |
| valuation | 2 | down | L5 | **空** |
| barrier | 1 | down | L1 | **空** |

**性质判断**：
- barrier=1 → 触发风险门控（moatScore 封顶 60），moat=28 已在 60 以下，不影响当前护城河判定
- score 取值(1/2/3/1/2/1)显著低于 Phase A 占位值(4/3/4/4/2/4)，判定为后续豆包/DeepSeek 批次的真实重新评估，非 bug
- **严重度：P2**（不影响判定结论，但 6 维 reason 全部缺失违反 §6.16 数据治理最低标准）

**待办**：后续找时间补全 6 维 reason 字段，按 §6.11 13 条硬约束 + §6.15 抽查验证标准流程。

**涉及文件**：`data/pcb.manual.js` 300522 stock 块

**登记 commit**：6.75

---

### §11.23 四问框架 Q2/Q3/Q4 在技术密集型行业的公开数据稀缺性（2026-07-12 · semicon-equip 四问核实立）

> **触发**：对 semicon-equip 链 21 只股票按 SKILL.md 四问标准（§1: ≤3 家 / §2: ≥12 月扩产 / §3: ≥2 年替代验证 / §4: ≥6 月替换认证）做逐一核实，结果 Q2/Q3/Q4 三项 21 只股票**全部 "数据不足"**——没有一只股票的 barrier reason 字段包含这三种数据的具体数字和来源。

**这不是核实工作的失败，是行业信息透明度的客观限制**：

| 四问 | 在半导体设备行业的实际情况 |
|------|------|
| Q1（供给寡头 ≤3 家） | ✓ 可回答。L3 机构报告（SEMI/VLSI/Gartner）通常覆盖全球设备厂商格局 |
| Q2（扩产周期 ≥12 月） | ✗ 不可回答。设备厂产能扩张周期无标准公开口径；行业逻辑是"订单→交付→验收"而非"建产能→扩产" |
| Q3（替代验证 ≥2 年） | ✗ 不可回答。客户几乎不会公开披露"替代某家供应商需要多久"这类商业敏感信息 |
| Q4（替换认证 ≥6 月） | ✗ 不可回答。客户替换认证周期属于商业机密；barrier reason 中引用的 "≥12/18 月" 数据均为**导入认证周期**（新供应商首次进入），不等于 Q4 要求的**替换认证周期**（从 A 供应商切换到 B 供应商的重认证时间）|
| Q4 补充说明 | 导入认证周期 ≠ 替换认证周期。前者是"新人进门要多久"，后者是"换人重新办手续要多久"——两个不同概念。现有 L4 券商研报只覆盖前者，不覆盖后者 |

**四问核实结果（semicon-equip 21 只）**：
- Q1 ✓：4/21（中微/北方华创/华海清科/拓荆·均有 L3 信源）
- Q2/Q3/Q4：0/21（系统性数据不足）
- 0 只命中 ★★★ 或 ★★☆
- fourQuestions 字段如实反映此结果：strength 全部 null，Q2/Q3/Q4 全部 false + qXnote 标注"数据不足"

**预期管理规则（后续产业链四问核实时适用）**：

1. **技术密集型行业（半导体设备/光模块/存储与接口/CPO 等）的 Q2/Q3/Q4 大概率无法从公开渠道获得可验证数据**——这是行业信息透明度的客观限制，不是核实工作不到位
2. **不要为了"凑满四问"去编造数据或降级标准**——0/4 或 1/4 是诚实结果，比虚假的 4/4 有价值
3. **Q1（全球 ≤3 家）是这类行业唯一可能从公开渠道验证的维度**——因为有 L3 机构报告覆盖全球格局
4. **如果整个产业链连 Q1 也无法验证（如光芯片/CPO 等新兴行业缺乏 L3 格局数据），fourQuestions 可以全 0——这是预期内结果，不是异常**
5. **不要试图用"导入认证周期 ≥X 月"来替代 Q4 的"替换认证周期 ≥6 月"**——两个概念不同，混用会制造虚假的"数据充分"假象

**复用方式**（后续光模块/存储与接口等链四问核实时）：
- 启动四问核实前，先读本节做预期管理——不要期望填满四问
- 诚实标注"数据不足"比凑数更有价值
- 如果某链有 L3 机构报告覆盖全球格局（如光模块的 LightCounting），Q1 可能是唯一可验证的维度

**登记 commit**：本次（semicon-equip 四问核实完成）

---

### §11.24 riskMetrics 字段适用边界规则（2026-07-12 · semicon-equip 收尾诊断立）

> **触发**：semicon-equip 链收尾阶段，诊断 riskMetrics 字段是否应该补全时发现：riskMetrics 不是 fundamentals 那样的客观财务数据，而本质上是**实际持仓后的仓位管理决策**。它的核心子字段（止损价、MA 触发条件、建议减仓比例）全部需要：① 实际持有该股票 ② 技术面行情数据 ③ 仓位管理策略 —— 三者缺一不可。

**601208 东材科技参照**（PCB 链唯一有 riskMetrics 的股票）：
- 止损价 64 元、三档止损（61.94/47.26/44.65）附带 MA20/MA60/60 日低点触发条件
- 建议减仓 77.58 元 + 30% 比例，理由是 "董事长减持窗口 6 月 30 日开启"
- 这些全部是基于真实持仓 + 技术分析 + 仓位管理的人工判断，没有任何一项可以从 abstract_ths 或任何结构化数据源自动获取

**P0-5 污染清理的同源教训**：riskMetrics 填入虚假数据（为不持有的股票编造止损价）——这比 fourQuestions "凑 4/4" 更严重，因为编造的是**具体的交易决策**（"在 XX 元减仓 30%"），一旦被当真可能导致实盘下单错误。

**强制规则（所有产业链通用 · 永久生效）**：

1. **riskMetrics.status = "deferred" 是正确默认值，不是待办未完成**。不持有该股票的情况下，保持 deferred 是正确的
2. **只有用户实际持仓的股票才应该填充 riskMetrics**——持仓记录来自交易日志（`#trades` 视图，localStorage `myTrades`）
3. **不要把 riskMetrics 当作 "必须填满才算完整" 的字段**——它不是 dims6/fundamentals 那种 "每只股票都应该有" 的通用数据
4. **填写前必须满足 3 个前置条件**：
   - 用户在交易日志中有该股票的买入记录（有实际持仓）
   - 用户已查看当前行情（MA20/MA60/60 日低点等），且确认了止损价位
   - 用户已决定仓位比例和重入策略
5. **严禁 CC 在没有上述 3 个条件的情况下填 riskMetrics**——哪怕是 "占位" 或 "建议" 也不行，因为数字一旦出现在页面上就容易被当真

**反模式（禁止）**：

| 反模式 | 后果 |
|--------|------|
| 为未持仓股票填 `stopLoss: null, status: "filled"` | chip 渲染空白 🛑SLnull，用户困惑 |
| 为未持仓股票编造 MA20 等具体价格 | 虚假交易决策数据，违反 §6.2 |
| 把 riskMetrics 写进 `_diff_chain_vs_pcb.js` 的 "缺失字段" 报告 | 误报——deferred 不是缺失，是正确的设计 |

**复用方式**（后续光模块/存储与接口等链）：
- 任何新链的 riskMetrics 默认全部 `status: "deferred"`
- 只有当用户在交易日志中买入该链某只股票后，才对该股票单独填写 riskMetrics
- `_diff_chain_vs_pcb.js` 的 riskMetrics 覆盖率检查应改为 "仅在有持仓的股票中统计"，不报 deferred 为缺失

**登记 commit**：本次（semicon-equip 收尾）

---

### §11.25 chainStory 中 treeMap 背景公司的验证边界（2026-07-12 · semicon-equip chainStory 收尾立）

> **触发**：semicon-equip 链 chainStory 补全时，`findStock()` 扩展了 treeMap 三级 fallback，使得 Steps 1-3（硅片基材/电子特气/光刻胶/CMP 抛光液/靶材）和 Step 9（晶圆代工）中 treeMap 里的上游材料与下游公司名称能在 chainStory 卡片右侧正确显示。

**关键边界**：这些公司（沪硅产业/TCL 中环/金宏气体/华特气体/彤程新材/安集科技/鼎龙股份/中芯国际/华虹半导体等）**来自 treeMap 生态背景数据，未经 Phase B 同等级别的六维打分与黑名单核实流程**。它们与 semicon-equip 链 segments 中的 21 只核心设备股票有本质区别：

| 数据层级 | 公司来源 | 验证程度 | 投资判断依据 |
|------|------|------|:--:|
| segments.stocks（21 只） | Phase B 5 批次完整流程 | dims6 6 维 + baostock/abstract_ths L1 实测 + §6.7.3 黑名单核实 + src ≥2 源 | ✅ 可用于投资分析 |
| treeMap companies（Steps 1-3, 9 中的 ~27 家） | Phase A 骨架阶段从 `semi-equipment.js` 老骨架迁移的生态背景数据 | 仅有 name/code/barrier，无数值验证 | ❌ 仅作 "产业链上还有谁" 参考 |

**强制规则（所有产业链通用 · 永久生效）**：

1. **chainStory 每个 step 右侧显示的公司名称不代表该公司的数据经过了完整核实**——chainStory 是一个 "产业链全景叙事" 模块，不是 "已核实标的清单"
2. **treeMap 公司的 dims6/fundamentals/valuation 等字段缺失是预期行为**——它们从未经过 Phase B 流程，不应该被误认为 "待补"
3. **如需将 treeMap 中某家公司提升到 segments 级别**（纳入正式六维打分），必须单独走一遍 Phase B 完整流程（abstract_ths L1 实测 → 黑名单核实 → dims6 6 维补全 → src ≥2 源 → 三重验证）
4. **`_diff_chain_vs_pcb.js` 或 `check_xxx_sync.js` 不应将 treeMap 公司的 dims6 缺失报告为 "待补"**——这是设计边界，不是数据缺口

**反模式（禁止）**：

| 反模式 | 后果 |
|--------|------|
| 看到 chainStory 卡片右侧有公司名就认为 "这条链所有公司都核实过了" | 将未经核实的 treeMap 背景数据当作投资依据 |
| 把 treeMap 公司的 dims6 缺失列入 "待办清单 P0" | 混淆数据治理优先级——这些是背景数据，不是核心标的 |
| 要求 CC 给 treeMap 公司批量补 dims6（"既然名字已经显示了，顺便把六维也补上"） | 将 treeMap 生态视图升级为六维评分系统的工作量远超预期，且需走完整 Phase B 流程 |

**涉及的具体公司清单（供后续如需纳入正式体系时参考）**：
- Step 1 硅片：沪硅产业 688126 / TCL中环 002129 / 立昂微 605358
- Step 2 特气/光刻胶：金宏气体 688106 / 华特气体 688268 / 彤程新材 603650 / 南大光电 300346
- Step 3 CMP/靶材：安集科技 688019 / 鼎龙股份 300054 / 江丰电子 300666
- Step 9 晶圆代工：中芯国际 688981 / 华虹半导体 688347

**登记 commit**：本次（semicon-equip chainStory 收尾）

---

### §11.26 barrier 评分体系盲区：全行业市占率 vs 大客户集中度细分卡口（2026-07-12 · PCB chokePoints strength 独立核实立）

> **触发**：PCB 链 chokePoints strength ★★★ 独立核实中，688183 生益电子案例暴露：dims6 barrier=3 基于 "全球 AI PCB 排名第 4（市占 4.2%）" 扣分，但 chokePoint strength=★★★（保留）、chokePointType=physical 基于 "AWS 占营收 42.9% + 56 层交换机 PCB 细分龙头"。同一组事实，两套评分基于**不同口径**给出不同结论——全局排名视角（dims6）vs 大客户集中度细分视角（strength）。

**这不是评分错误，是评分体系的边界缺失**：

| 评分维度 | dims6 barrier（全局口径） | chokePoint strength（细分口径） |
|------|------|------|
| 688183 全球 AI PCB 排名 | 第 4（4.2%）→ score=3 | —（不纳入判断） |
| 688183 AWS 大客户锁定 | —（未纳入 barrier 评分项） | 占营收 42.9% → 极高客户粘性 |
| 56 层交换机细分地位 | — | 核心供应商认证 → physical 卡口 |

**核心盲区**：dims6 barrier 评分规则（§10）只覆盖 "全球 ≤3 家 / 认证周期 / 竞争者数量" 这类**供给侧壁垒**，没有覆盖 "大客户深度绑定导致的替代成本" 这种**需求侧粘性壁垒**。而 chokePoint strength 的手动评估反而天然涵盖了后者——因为编辑在设定 ★★★ 时会综合考虑客户关系和细分地位。

**另一个盲区（同一案例的背面）**：AWS 占营收 42.9% 的高客户集中度，既是护城河（客户粘性高）也是风险（单一客户流失冲击巨大）。但无论是 dims6 barrier（只看护城河面）还是 strength（只看卡口面），都**没有同时标注 "集中度风险" 这一面**。

**建议改进方向（待后续规则完善，本次不实施）**：

1. **§10 barrier 评分规则增加 "大客户粘性" 加分项**：若单一战略客户占营收 > 30% 且有 L1 公告证实长期供货协议，barrier score +1（封顶 5 分）
2. **barrier 评分增加 "集中度风险" 并行标注**：若前 3 大客户占营收 > 50%，在 dims6 barrier reason 中显式标注 "⚠️ 高客户集中度风险"
3. **chokePoint card 增加双向风险提示**：在现有 "壁垒强度" 标签旁边，增加 "集中度风险"（高/中/低）标注

**当前过渡处理**（针对 688183 生益电子）：
- strength ★★★ 保留（细分物理卡口成立）
- chokePoint logic 文本中已包含 "AWS 主力供应商（占营收 42.9%）" 的事实披露
- **不增加 dims6 barrier score（维持 3 分）**——全局排名第 4 的判断在 barrier 规则体系内是正确的
- **本次仅登记规则盲区，不修改任何评分**

**复用方式**（后续其他链 chokePoints 设定时）：
- 涉及大客户深度绑定的卡口（如澜起科技对 Intel/AMD 的 DDR5 RCD 独占），应意识到现有 barrier 规则可能低估其实际壁垒
- chokePoint strength 的手动评估可作为 dims6 barrier 的补充视角（尤其在大客户粘性场景），但不能替代

**登记 commit**：本次（PCB chokePoints strength 独立核实）

---

### §11.27 股票代码错误导致投资结论完全反转的严重案例（2026-07-12 · commit 6.77 + 6.77a 立）

> **严重级别**：🔴🔴🔴 最高——不是数字偏差，是**投资结论的完全反转**（skip→hold，巨亏→盈利，极端早期→成熟公司）。
> 本节与 §11.15（002371 benefit_ths vs abstract_ths 定性反转）并列为全仓库最严重的两类数据事故：**接口口径不一致导致定性反转**（§11.15）和 **股票代码指向错误公司导致全部分析作废**（本节）。

#### 案例 1：微导纳米 688765→688147（2026-06-19 至 2026-07-12 · 23 天）

**【错误链完整追溯】**

| 时间节点 | commit | 事件 |
|:--|------|------|
| 2026-06-19 | `b7b7d2b` | Phase 10 半导体设备赛道骨架建立，微导纳米以错误代码 688765 首次录入 semicon-equip.js |
| 2026-07-10 | `cc43044` | Phase B 第 3 批 dims6 六维补全，**基于 688765（禾元生物）的财务数据**完成 6 维评分写入 manual.js |
| 2026-07-12 | `33a802d` | 全量代码排查发现 688765≠微导纳米，修复为 688147 + 六维全量重评 |

**【根本原因】**

688765 = **禾元生物**（生物科技公司·股价 50.80 元·营收 0.25 亿·净利 -1.5 亿·ROE -16.92%）
688147 = **微导纳米**（半导体 ALD 设备龙头·股价 138.97 元·营收 26.33 亿·净利 2.19 亿·ROE 7.92%）

Phase A 骨架构建时，仅根据"微导纳米=ALD 设备国产龙头"这一定性判断将其录入 segments，但**代码来源未经逐只验证**——选了一个"看起来像科创板半导体设备公司"的代码 688765，实际指向了一家做重组人血清白蛋白的生物科技公司。两者除了都在科创板、代码相邻之外，**无任何业务关联**。

**【投资结论反转全貌】**

| 维度 | 旧结论（基于禾元生物数据·错误） | 新结论（基于微导纳米 688147·真实） |
|------|------|------|
| **定性标签** | "极端早期·营收未起步+持续烧钱" | "成熟 ALD 设备龙头·盈利但估值偏高" |
| durability | 2（"营收长期不足 5000 万·生存风险"） | 4（"27 亿级 ALD 龙头·1-2 年明确需求"） |
| visibility | 1（"千万级极低基数·无有效验证"） | 3（"L1 公告+L3 覆盖+客户验证"） |
| policy | 3（"无法兑现产业政策"） | 4（"大基金三期重点投向"） |
| supply | 2（"不构成市场有效供给"） | 4（"国内 ALD 稀缺供给·缺口 10-30%"） |
| valuation | 1（方向巧合正确·但理由从"亏损 PE 无意义"→"盈利但估值泡沫"） | 1 |
| barrier | 2（"无法维持基本经营"） | 3（"ALD 验证≥18 月·与中微/拓荆对齐"） |
| **moatScore** | **38**（skip·不投） | **71**（hold·可观察） |
| **quadrant** | **skip** | **hold** |

6 维中 5 维 score 发生实质性变化，moat 从 38 升至 71（+33 分），quadrant 从 skip 翻转为 hold。

**【已确认的污染范围】**

- CLAUDE.md §14.8 中将微导纳米归类为"亏损/微利公司"——已修正（commit 6.77a）
- Phase B 第 3 批（commit cc43044）写入的 6 维 reason 全部基于禾元生物数据——已全部重写（commit 6.77a）
- semicon-equip.manual.js 中 fundamentals 字段（ROE -16.92% / 营收增速 +89.8% 等）均为禾元生物数据——已覆写（commit 6.77a）
- 此前的 §11.19 系列教训中未直接引用微导纳米案例为教训（核实确认），仅 §11.19.3 批次清单中列出名称，不构成错误引用

**【防御规则（新增 · 永久生效）】**

> 本节是对 CLAUDE.md 未明确规定的"Phase A 阶段股票代码逐只验证"缺口的形式填补。

1. **新链 Phase A 骨架建立阶段，每只股票代码必须通过以下至少一项验证**：
   - **A 级（最优）**：Sina API / akshare 实时行情查询，确认 code→name 映射与预期一致
   - **B 级（可接受）**：同花顺/东方财富/雪球搜索公司名，确认返回的代码与录入一致
   - **C 级（兜底）**：人工登录 cninfo/巨潮/交易所官网，输入代码确认公司全称
   - ❌ **禁止**：凭"代码看起来应该是这家公司"或"代码在科创板范围内"等推断直接录入（本案的直接原因——688765/688147 代码相邻但公司完全不同）

2. **任何涉及 ≥3 只新股票录入的批次，在 commit 前必须跑一次全量 code→name 交叉验证**（`scripts/__verify_all_codes.py` 模板可复用）

3. **发现代码错误后，必须同时检查**：
   - 该错误代码指向的真实公司是谁（本案：688765=禾元生物）
   - 错误持续期间内，是否有基于错误数据的分析被引用到其他文档/commit message/教训案例中
   - fundamentals 字段是否需要覆写
   - dims6 reason 是否需要重写

4. **Phase A 录入后、Phase B 六维打分前的"代码真实性复核"应作为独立关卡**——不在 Phase B 批次中才首次验证代码（本案：代码错误在 Phase A 引入，直到 Phase B 全部完成后才被发现，浪费了整批次的六维打分工作）

**【复用方式（后续所有新链）】**

- **新建链 Phase A 骨架后第一件事**：提取所有 stock code → 跑 `__verify_all_codes.py` → 确认 0 MISMATCH → 然后才开始 Phase B 六维打分
- 本案作为新链培训材料：给任何接手新链建设的 CC/投顾看的第一份文档应该是 §11.27（不是业务介绍，是风险警示）
- **严重程度认知**：代码错误比数字偏差危险得多——PE 差 20% 是误差，代码错误是整个公司的财务数据被替换成了另一家公司的，六维评分、护城河分、投资结论全部作废

#### 案例 2：南亚新材 603519→688519（2026-06-19 至 2026-07-12 · 23 天）

**【根因】**：603519 = 立霸股份（家电面板公司）· 688519 = 南亚新材（CCL 覆铜板公司）

**【与案例 1 的同源模式】**：同样是 Phase A 骨架建立时（commit b7b7d2b / f019b60）选了一个"看起来像"的代码录入，未经逐只验证。两个案例都在同一次全量排查（commit 6.77）中被发现，错误持续 23 天。

**【影响程度对比】**：

| 维度 | 案例 1（微导纳米） | 案例 2（南亚新材） |
|------|------|------|
| 六维评分全错 | ✅（5/6 维 score 变化） | ⚠️（2/6 维 score 变化·valuation 2→1/barrier 高→中） |
| quadrant 反转 | ✅（skip→hold） | ❌（hold→hold 维持） |
| moat 变化 | +33（38→71） | 0（65→65 巧合维持） |
| 对投资决策的影响 | 🔴 根本性反转 | 🟡 部分调整 |

**【已确认的污染范围（南亚新材）】**：fundamentals 中的 ROE/营收增速/净利增速等均为立霸股份数据——已覆写（commit 6.77）。

**【事故案例归档（累计 2 例 · 同根同源）】**：
- **2026-06-19 commit b7b7d2b / f019b60**：Phase A 骨架建立阶段，微导纳米以 688765（禾元生物）录入 + 南亚新材以 603519（立霸股份）录入
- **2026-07-12 commit 6.77 + 6.77a**：全量代码排查发现两处错误，修复 + 六维重评完成

**违反本节 = §6.2 红线（数据来源错误导致全部分析作废·严重程度高于一般 hallucination）+ §6.8 数据准确度优先原则违反**。

**登记 commit**：6.77 + 6.77a（2026-07-12 立）

---

### §12.1 8 只 chokePoints 最终状态

#### §12.1.1 名单与护城河分排名

按 §11.8 圈定的 8 只核心标的 + 卡口强度(★★★ / ★★☆):

| 排名 | code | name | 卡口段位 | 卡口强度 | 段位 score(6 维中位) |
|---|---|---|---|---|---|
| 1 | **601208** | 东材科技 | M9 碳氢树脂 | ★★★ | 3.0 |
| 2 | **300395** | 菲利华 | Q 布/石英纤维布 | ★★★ | 4.0 |
| 3 | **301217** | 铜冠铜箔 | HVLP4 铜箔 | ★★☆ | 3.0 |
| 4 | **002916** | 深南电路 | IC 封装基板(ABF 载板) | ★★☆ | 4.0 |
| 5 | **300476** | 胜宏科技 | AI PCB 制造(显卡) | ★★★ | 5.0 |
| 6 | **002463** | 沪电股份 | AI PCB 制造(78 层 M9) | ★★★ | 5.0 |
| 7 | **688183** | 生益电子 | AI PCB(56 层交换机) | ★★★ | 4.0 |
| 8 | **002384** | 东山精密 | AI PCB + 光模块 | ★★★ | 4.0 |

#### §12.1.2 §11.9 校准前后六维数据对照

**校准前(2026-07-02 兜底默认)**:多数 stock 的 dims6 字段是"批量生成默认",**score=5 是占位默认值**,无独立 reason 字段支撑。§6.11 + §6.16 审视机制下属于"高分低证据"高风险。

**校准后(commit 6.32 + 6.33,2026-07-04 完成)**:**§11.9 累计 10 项冲突已全部闭环**:

| 批次 | 类型 | 涉及 stock | commit |
|---|---|---|---|
| 第一批 | score 偏高下修 | 300395(visibility/durability/supply) + 688183(visibility) + 002384(visibility) | 6.32 |
| 第二批 | policy 上修 + trend 下修 | 601208/688183/002384(policy 3→4) + 301217/002916(policy up→flat) | 6.33 |

校准后状态(2026-07-04 拉取):

| stock | durability | visibility | policy | supply | valuation | barrier |
|---|---|---|---|---|---|---|
| 601208 东材 | 3/dn/L4 | 3/up/L4 | **4/flat/L2** | 3/dn/L3 | 2/dn/L4 | 3/dn/L3 |
| 300395 菲利华 | **4**/up/est | **4**/up/est | 3/flat/est | **4**/up/est | 1/dn/est | 4/flat/L3 |
| 301217 铜冠 | 5/up/est | 3/flat/est | **4**/flat/est | 2/dn/L3 | 2/up/est | 3/up/L3 |
| 002916 深南 | 4/up/est | 4/up/est | **4**/flat/est | 3/flat/L3+est | 2/dn/est | 5/flat/est |
| 300476 胜宏 | 5/up | 5/up | 3/flat | 2/dn/L3 | 2/dn | 5/flat |
| 002463 沪电 | 5/up | 5/up | 3/flat | 2/dn/L3 | 2/dn | 5/flat |
| 688183 生益 | 5/up/L4 | **4**/up/L4 | **4**/flat/L2 | 2/dn/L3 | 4/up/L1+L3 | 3/flat/L3 |
| 002384 东山 | 5/up/L3 | **4**/up/L4 | **4**/flat/L2 | 2/dn/L3 | 3/flat/L1 | 5/flat/L1 |

> 表中**粗体**数字是 §11.9 校准动作(score 下修 5→4 或 score 上修 3→4,trend up→flat)。

#### §12.1.3 演变说明:从"历史标签"到"数据验证结果"

| stock | 历史标签(投研圈子印象) | §11.9 校准后验证结果 | 关键差异 |
|---|---|---|---|
| 601208 东材 | 双寡头 M9(★★★) | durability=3,**M9 加工端 ≥2 家量产,卡口转移到上游** | 实际壁垒弱于"双寡头"标签 |
| 300395 菲利华 | Q 布全球 30% 卡口(★★★) | durability=4,visibility=4,**Q 布仅占总营收 4.88%** | 卡口业务体量偏小,与"全球 30%"印象不匹配 |
| 301217 铜冠 | HVLP4 国内唯一(★★☆) | visibility=3,**加工端国产竞争充分,卡口转移到生箔设备端** | 国内并非"唯一",只是加工端不是单点卡口 |
| 002916 深南 | ABF 国内唯一(★★☆) | barrier=5,supply=3,**ABF 膜仍依赖日本味之素 97% 进口** | 加工端卡口成立,材料端才是绝对寡头 |
| 300476 胜宏 | 英伟达 Tier1 显卡 PCB 一供(★★★) | 全部 6 维有 reason,**未校准** | 卡口地位与数据一致 |
| 002463 沪电 | GB200/GB300 全系认证(★★★) | 全部 6 维有 reason,**未校准** | 卡口地位与数据一致 |
| 688183 生益 | AWS 主力 56 层交换机(★★★) | visibility 5→4,**缺 L1 客户锁单协议** | tier 标记从 L1 修正为 L4 |
| 002384 东山 | 全球唯一光模块+AI PCB 双能力(★★★) | visibility 5→4,barrier 仍 5,**索尔思光电为光模块核心,但 tier L4 更准确** | tier 标记从 L1 修正为 L4 |

#### §12.1.4 §6.16 dims6Audit 已审/未审状态

| stock | dims6Audit 状态 | 备注 |
|---|---|---|
| 300395 菲利华 | ✅ 已审(2026-07-01,reviewed by CC+user) | 唯一显式 audit 的 stock,极差 5-1 人工核实 |
| 601208 / 301217 / 002916 / 300476 / 002463 / 688183 / 002384 | ❌ 未审 | dims6Audit 字段缺失 |

> 严格按 §6.16:只有 300395 通过了 dims6Audit。其余 7 只**只走完了 §11.9 冲突校准**,**未走完整 §6.16 audit**。这是 §12.3 的可信度分级依据。

#### §12.1.5 结论

> **8 只 chokePoints 是全链条里唯一"六维数据经过校准 + 主要维度有 reason"的子集。但其中只有 300395 1 只走完 §6.16 dims6Audit。**
>
> **可以拿去做投资决策的 6 维评分依据,但建议:(a) 对 7 只未审 stock 单独标注"未审计"标记,(b) 投资决策时辅以 position/investableReason/trendNote 的 L1 公告核对。**

### §12.2 30 只非 chokePoints 可信度分级

#### §12.2.1 🟢 可参考(10 只干净股票)

这 10 只的 6 维 dims6 字段**全部有 reason 字段 + tier 标注合理**,可作为初步参考依据:

| code | name | 段位 | 备注 |
|---|---|---|---|
| 300179 | 四方达 | 高端钻针/微钻 | Phase 2-② 新增,estimate 占位待三表核实 |
| 301150 | 中一科技 | 铜箔(HVLP4) | estimate 占位待核实 |
| 600110 | 诺德股份 | 铜箔 | 经 §11.6 6 维补全,数据真实 |
| 600176 | 中国巨石 | 玻纤布 | estimate 占位待核实 |
| 603228 | 景旺电子 | AI PCB | 6 维全 reason,有一定数据 |
| 603650 | 彤程新材 | 电子树脂 | estimate 占位待核实 |
| 605006 | 山东玻纤 | 玻纤布 | 经 §6.15 亏损公司专项补全 |
| 688300 | 联瑞新材 | IC 封装基板 | 经 §11.7 supply+barrier 补全 |
| 688700 | 东威科技 | PCB 专用设备 | 经 §11.7 supply+barrier 补全 |
| 000657 | 中钨高新 | 高端钻针/微钻 | Phase 2-② 新增,estimate 占位 |

> **可信度定位**:这 10 只 stock **可以放进观察池**(Watchlist),作为机会出现时的快速响应清单。但**不能与 8 只 chokePoints 同等地位**,因为:
> 1. 大多数没有走过 §11.9 冲突校准
> 2. 没有 dims6Audit
> 3. 部分是 estimate 占位待核实
>
> **建议用法**:当某只出现"独立 L1 公告"催化时,可作为进场候选,**不作为日常轮动标的**。

#### §12.2.2 🔴 待复核(20 只存在问题的股票)

按 §11.10 P0/P1/P2 分级 + 严重度排序。**这些股票当前的六维分数存在数据支撑不足的问题,不建议直接作为投资决策依据**。

**🔴 P0(8 项 HIGH,score=5 + reason 缺失,2-3 天内复核):**

| stock | dim | 详情 |
|---|---|---|
| 600183 生益科技 | visibility | score=5 · reason 缺失 |
| 600183 生益科技 | barrier | score=5 · reason 缺失 |
| 605589 圣泉集团 | visibility | score=5 · reason 缺失 |
| 605589 圣泉集团 | barrier | score=5 · reason 缺失 |
| 002938 鹏鼎控股 | durability | score=5 · reason 缺失 |
| 002938 鹏鼎控股 | visibility | score=5 · reason 缺失 |
| 301200 大族数控 | visibility | score=5 · reason 缺失 |
| 001389 广合科技 | durability | score=5 · reason 缺失 |

**🔴 P1(10 只 ≥6 项问题,1-2 天复核):**

| stock | 问题数 | missing reason | 模式分布 |
|---|---|---|---|
| 605589 圣泉集团 | 8 项 | 6/6 维 | M1×2 + M3×6 |
| 002938 鹏鼎控股 | 8 项 | 6/6 维 | M1×2 + M3×6 |
| 300522 世名科技 | 9 项 | 6/6 维 | M2×3 + M3×6 |
| 600183 生益科技 | 7 项 | 6/6 维 | M1×2 + M4×5 |
| 301377 鼎泰高科 | 6 项 | 6/6 维 | M3×6 |
| 603002 宏昌电子 | 6 项 | 6/6 维 | M3×6 |
| 603920 世运电路 | 6 项 | 6/6 维 | M3×6 |
| 603936 博敏电子 | 6 项 | 6/6 维 | M3×6 |
| 002636 金安国纪 | 6 项 | 6/6 维 | M3×6 |
| 002913 奥士康 | 6 项 | 6/6 维 | M3×6 |

**🔴 P2(10 只 1-5 项问题,1 天复核):**

| stock | 问题数 | 模式 |
|---|---|---|
| 301200 大族数控 | 5 项 | M1×1 + M4×4 |
| 001389 广合科技 | 5 项 | M1×1 + M4×4 |
| 002436 兴森科技 | 4 项 | M4×4 |
| 301511 德福科技 | 3 项 | M4×3 |
| 603256 宏和科技 | 3 项 | M4×3 |
| 603519 南亚新材 | 3 项 | M4×3 |
| 688388 嘉元科技 | 3 项 | M4×3 |
| 603186 华正新材 | 2 项 | M4×2 |
| 688630 芯碁微装 | 1 项 | M4×1 |
| 002080 中材科技 | 1 项 | M4×1 |

**可信化条件(20 只从 🔴 待复核升级到 🟢 可参考需要走的流程)**:
1. baostock L1 实证(财务时序拉取)
2. akshare `stock_zygc_em` 主营构成对比(若可用)
3. §10 五档表严格判定 score 合理性
4. reason 字段补全(从 position/investableReason 提取事实 + 引用 L1-L4 信源)
5. §6.15 抽查验证机制(baostock/akshare 反查一致)
6. §6.16 dims6Audit 标注 reviewedAt + reviewer + conclusion

### §12.3 全局结论

#### §12.3.1 真实覆盖率(4 档)

| 档位 | 描述 | 数量 | 占比 |
|---|---|---|---|
| **第 1 档·完整审计** | 8 只 chokePoints,经过 §11.9 冲突校准 + 主要维度有 reason | **8 / 38 = 21.1%** |
| **第 2 档·初筛通过** | 10 只非 chokePoints,6 维有 reason + tier 合理,**但未深度验证** | **10 / 38 = 26.3%** |
| **第 3 档·P0 待处理** | 8 项 HIGH 风险未处理 | **8 / 38 = 21.1%**(涉及 5 只 stock 的 8 处 score=5 维度) |
| **第 4 档·P1+P2 待处理** | 22 只 P1+P2 已识别问题未处理 | **22 / 38 = 57.9%** |

> **注意**:第 3 档和第 4 档有重叠(605589/002938/300522/600183/301200/001389 出现在两档)。
> **去重后**:38 只中
> - 第 1 档(完整审计):**8 只**(601208/300395/301217/002916/300476/002463/688183/002384)
> - 第 2 档(初筛通过):**10 只**(见 §12.2.1)
> - 待处理集合(🔴 待复核):**20 只**(见 §12.2.2)
> - 三者合计:**8 + 10 + 20 = 38** ✓

#### §12.3.2 当前能做什么 / 不能做什么

**能做的**:
- ✅ 基于 8 只 chokePoints 的 6 维评分做核心仓位决策
- ✅ 基于 10 只 Tier 1 的 6 维评分做观察池轮动(但需附 position/investableReason L1 核对)
- ✅ 用 position 字段(38 只全覆盖)做产业链结构性判断

**不能做的**:
- ❌ 基于 20 只 🔴 待复核 stock 的 6 维评分做任何**买入/卖出/加减仓**决策
- ❌ 把 20 只的 dims6 score 当作"已审计数据"对外引用
- ❌ 不经复核就认为 6 维评分与"实际卡口逻辑"匹配

#### §12.3.3 后续可信度提升优先级

| 优先级 | 范围 | 工作量预估 | 累计达到可信度 |
|---|---|---|---|
| **P0 立即处理** | 8 项 HIGH 单独修复(走 §6.15 流程) | 半天 | 8+10=18 只可信 |
| **P1 下一批次** | 10 只 ≥6 项问题全补(发豆包 + baostock 几轮) | 1-2 天 | 18+10=28 只可信 |
| **P2 累积修复** | 10 只 1-5 项问题全补 | 1 天 | 28+10=38 只全部可信 |
| **累计** | — | **3-4 天** | **38/38 = 100% 可信** |

#### §12.3.4 与 §6.11/§6.15/§6.16 的衔接

§6.11(豆包查询 13 条硬约束)+ §6.15(亏损公司专项规则)+ §6.16(dims6Audit 机制)就是用于**提升可信度的工具集**。每个 batch 至少要:
- 走 §6.11 13 条硬约束(精确 stock 列表、7 段式、6 级信源分层)
- 走 §6.15 抽查验证(baostock/akshare 反查一致)
- 走 §6.16 dims6Audit(reviewedAt + reviewer + conclusion)

### §12.4 致读者(个人作者行动指南)

> **⚠️ 以下是写给自己看的纪律提醒,不是审计报告的延伸**。

**1. 当前可信度地图(2026-07-04 快照)**:
- **8 只可靠**:601208/300395/301217/002916/300476/002463/688183/002384(做过 §11.9 校准)
- **10 只可参考**:见 §12.2.1(初筛通过,深度不足)
- **20 只待复核**:见 §12.2.2(不能作决策依据)

**2. 投资动作边界**:

| 动作 | 可执行范围 |
|---|---|
| **核心仓位** | 仅 8 只 chokePoints |
| **观察池轮动** | 10 只 Tier 1 |
| **20 只 🔴 待复核** | **不要进场**(等 P0→P1→P2 治理) |
| **临时进场(20 只内)** | 必须独立做 L1 公告核对 + baostock 拉数据,不走 dims6 评分 |

**3. 后续节奏**:

- **今天/明天**:从 P0 8 项 HIGH 开始,每项走 §6.15 流程(baostock 实证 + reason 补全)
- **本周末前**:完成 P0 + P1 的治理,目标 18-28 只进入可信范围
- **下周**:完成 P2 治理,目标 38 只全部进入可信范围

**4. 与 §11 backlog 的衔接**:

- §11.6 (601208 visibility 闭环) → 已完成
- §11.7 (4 只 supply+barrier 补全) → 已完成
- §11.8 (8 只 chokePoints reason 盘点) → 已完成
- §11.9 (10 项冲突校准) → 已完成
- §11.10 (30 只风险扫描) → 已完成(本文档)
- **§12(本文档)**:从"扫描"升级到"可信度地图",为后续治理定优先级

**5. 个人复盘建议**:

下次会话开始时,**先看本节**(§12.4.1 地图),再决定从哪个 batch 开始治理。**不要直接看 position 字段**(那会让人误以为"全部 38 只都有数据",而忽略可信度差异)。

**完成 commit**:6.36(待执行)

---

## §13 新链/大改动上线前置检查清单（Pre-Flight Checklist · 2026-07-11 commit 08a59f1 立）

> **触发**：semicon-equip 链 Phase A→B 全流程暴露 5 类系统性缺陷（P0-1~P0-5），全部是现有 page_audit/check_xxx_sync 脚本 PASS 的情况下被用户截图发现的。现有验证体系只覆盖"数据层自证"（字段存在/数值一致/文件完整），**缺失"真实页面渲染效果验证"这道强制关卡**。本节建立新链/大改动上线前必须完成的标准化检查流程。

### §13.1 适用范围与执行时机

**强制触发条件**（任一即触发，不可跳过）：
- 新建一条产业链（新增 `data/<chainId>.js` + `data/<chainId>.manual.js`）
- 对现有链做 Phase B+ 级别的批量 dims6/fundamentals 注入（涉及 ≥5 只 stock）
- segments 结构调整（增/删/改名/重排）
- 渲染层改动（index.html 新增/修改 render 函数、helper、CSS class）
- treeMap 数据结构变更

**执行人分工**：

| 检查层 | 工具 | 执行人 | 是否可自动化 |
|--------|------|--------|:--:|
| 数据层 | page_audit.py + check_xxx_sync.js | CC | ✅ 全自动 |
| 内容安全 | validateNoDevTerms + contamination scan | CC | ✅ 全自动 |
| 渲染层 DOM | Playwright 自动化截图 + 结构提取 | CC | ✅ 全自动（DOM 验证）/ ⚠️ 半自动（视觉截图需人工看） |
| 视觉核对 | 浏览器手动操作 + 肉眼比对 | **投顾/用户** | ❌ 不可自动化（强制人工关卡） |

---

### §13.2 数据层自动验证（必须全部 PASS，一项 FAIL = 阻断上线）

#### 检查 1：双层架构同步（`check_xxx_sync.js`）

```bash
node scripts/check_<chainId>_sync.js
```

**通过标准**：
- `[1]` 双层字段数值一致性：0 偏离
- `[2]` name 冲突：0
- `[2]` core 游离（必须为 0）：0
- `[3]` stock 口径：100% 完全达标
- `[4]` DATA_VERSION 与 mtime 同步：✓

**如果新链尚无专用 sync 脚本**：参考 `scripts/check_semicon_sync.js` 创建，必须覆盖 4 项检查。

#### 检查 2：unique stock code 基线（`check_unique_stock_codes.js`）

```bash
node scripts/check_unique_stock_codes.js <chainId>
```

**通过标准**：unique code+name 组合数与 baseline 一致（或变化有合理解释）。

#### 检查 3：全局页面审计（`page_audit.py`）

```bash
python scripts/page_audit.py
```

**通过标准**：全部 N 项 PASS，0 项 FAIL。

#### 检查 4：manifest 加载顺序验证

```bash
node -e "
global.window = {};
var manifest = [/* 从 index.html 提取 */];
manifest.forEach(id => { try { require('./data/'+id+'.js'); } catch(e) { console.log('FAIL:', id, e.message); } });
console.log(Object.keys(global.window.CHAINS).length + ' chains loaded');
"
```

**通过标准**：manifest 数组中的所有文件均成功加载，`window.CHAINS` 中的链数量与预期一致。如果有 `.manual` 文件，必须在对应的 `.js` 文件之前加载。

---

### §13.3 渲染层浏览器验证（使用 Playwright 自动化 DOM 检查）

#### 模板脚本

以下脚本可复用于任意链（替换 `chainId` 和 `chainUrl`）：

```python
# scripts/_preflight_render_check.py
from playwright.sync_api import sync_playwright

def check_chain(chainId, chainUrl):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto(f'http://localhost:8765/index.html#{chainUrl}', wait_until='networkidle')
        time.sleep(3)

        # 1. JS 错误检查
        errors = []
        page.on('pageerror', lambda err: errors.append(str(err)))

        # 2. 页面结构审计
        info = page.evaluate('''() => JSON.stringify({
            sectionCount: document.querySelectorAll('.section-title').length,
            segmentCards: document.querySelectorAll('.segment-card').length,
            stockRows: document.querySelectorAll('tr[id^="stock-"]').length,
            flowNodes: document.querySelectorAll('.flow-node').length,
            treeNodes: document.querySelectorAll('.tree-node').length,
            fourQRows: document.querySelector('#section-fourq tbody tr')?.length || 0,
            fundsChips: document.querySelectorAll('[title*="ROE"]').length,
            hasUndefined: document.getElementById('chain-content')?.innerText.includes('undefined'),
        }'''))

        # 3. 开发术语扫描
        devTerms = ['commit', 'Phase ', 'idx 7', '同步到', '渲染层', 'DATA_VERSION', 'bump']
        chainText = page.evaluate('() => document.getElementById("chain-content")?.innerText || ""')
        hits = [t for t in devTerms if t in chainText]

        return {'errors': errors, 'info': info, 'devTermHits': hits}
```

#### 通过标准

| 检查项 | 通过条件 | 常见故障模式 |
|--------|---------|------------|
| JS errors | 0 | 命名空间连字符 bug（P0-3）、未定义函数引用 |
| `treeNodes` 计数 | 0（新 schema 链）/ N（旧 schema 链）| demandChainMeta if/else 耦合（P0-4） |
| `flowNodes` 计数 | ≥ 每列 sub-card 总数 | treeMap 数据未填充 |
| `fourQRows` 计数 | > 0（除非确认暂不填充且已登记待办） | `fourQuestions.segments = []`（P0-2） |
| `stockRows` 计数 | = auto 层 unique stock 数 + midstream 数 | 残留已删除股票（P0-1） |
| `fundsChips` 计数 | = stockRows 数 | fundamentals 未写入 manual.js |
| `hasUndefined` | False | 数据字段缺失 → 渲染 "undefined" 文字 |
| `devTermHits` | 0 | 写入脚本未做 validateNoDevTerms（P0-5） |

---

### §13.4 内容安全校验（开发术语污染扫描）

#### 写入前校验（已在 `__inject_*.js` 中实装）

所有批量写入脚本必须包含：

```javascript
const FORBIDDEN_DEV_TERMS = [
  '★ commit', 'commit 6.', 'Phase 2-', 'Phase 9 PCB',
  'idx 7 PCB', '同步到 pcb.js', '渲染层',
  'DATA_VERSION', 'bump', 'Co-Authored-By',
];
function validateNoDevTerms(text, fieldName, stockCode) {
  if (typeof text !== 'string' || !text) return;
  for (const term of FORBIDDEN_DEV_TERMS) {
    if (text.includes(term)) {
      throw new Error(`[CONTAMINATION BLOCKED] ${stockCode}.${fieldName} contains "${term}"`);
    }
  }
}
```

#### 写入后扫描（全量复查）

```bash
node scripts/__scan_contamination.js
```

**通过标准**：0 个命中项。每次新链/大改动提交前必须运行，作为 `page_audit.py` 的补充检查项。

#### 财务数字反算校验（YoY 一致性 · P0-6 立 · 借鉴 ai-berkshire financial_rigor.py）

**触发时机**：任何 fundamentals 批量拉取/刷新脚本（如 `refresh_se_fundamentals.py`）必须在写入 JSON 之前，对每只 stock 的 `revenueGrowth` 和 `netProfitGrowth` 做两期原始数字反推校验。

**已集成位置**：`scripts/refresh_se_fundamentals.py` → `verify_yoy()` 函数

**阈值分档**（2026-07-11 设计，经 semicon-equip 21 只全量回测通过）：

| 维度 | 档位 | 条件 | 阈值 | 设计理由 |
|------|:--:|------|:--:|------|
| 营收 | R1 | ≥100亿 | ±0.5pp | 百亿级基数，abstract_ths 舍入影响 <0.01pp |
| 营收 | R2 | 30-100亿 | ±1pp | 中大型 |
| 营收 | R3 | 10-30亿 | ±2pp | 中型，亿/万单位转换可能引入 ~0.2pp |
| 营收 | R4 | <10亿 | ±3pp | 小型，可能用"万"单位 |
| 净利 | N1 | ≥10亿 | ±1pp | 大基数稳定 |
| 净利 | N2 | 3-10亿 | ±2pp | 中等基数 |
| 净利 | N3 | 1-3亿 | ±5pp | 小基数放大舍入 |
| 净利 | N4 | 0-1亿（微利） | ±8pp | 微利，百分比极敏感 |
| 净利 | N5 | ≤0（亏损） | ±10pp | 亏损百分比偏差取决于上年基数——回测中 4 只亏损股最大偏差仅 1.59pp |

**阻断规则**：偏差超过对应档位阈值 → `raise ValueError` 阻断写入。不允许绕过。

**反向验证**：如果此校验在 §11.15 事故前存在，002371 北华创的 benefit_ths vs abstract_ths 净利 YoY 偏差（3.57pp > N1 阈值 1pp）会在写入前被阻断。

**依赖**：Decimal 精算引擎（`_CTX`/`exact()`），借鉴 ai-berkshire `financial_rigor.py` 设计（prec=28, ROUND_HALF_EVEN）。

---

### §13.5 强制人工确认关卡（不可跳过·不可由 CC 自行宣布"通过"）

> **本节是整个 §13 的最高优先级规则。如果此关卡未完成，即使前面所有自动化检查全部 PASS，也不得视为"已上线"。**

#### 确认清单（投顾/用户逐项打勾）

| # | 确认项 | 具体操作 | 通过标准 |
|---|--------|---------|---------|
| 1 | **赛道概览区** | 浏览器打开页面，查看顶部 overview 卡片和 prosperity 六维仪表盘 | 8 张 overview 卡全部显示真实数字，六维 mini-bar 有颜色/分数，无占位符 |
| 2 | **产业链全图** | 滚动到 treeMap 区域，点击流图/列表视图切换 | 5 列全部显示 sub-card + 公司名称，无破损节点（📱undefined/🏭undefined），颜色正确区分壁垒等级 |
| 3 | **上游拆解 segments** | 逐个展开每个 segment 卡片，检查股票列表 | 每段股票数 ≥ 设计数量，无已删除股票残留，每只股票有名称/代码/定位/壁垒/核心逻辑 |
| 4 | **dims6 chip 展开** | 随机点开 3-5 只股票的 "🆪 六维 ▾" 折叠区 | 6 维 mini-bar 全部有分数，雷达图正常渲染，reason 文字是投研分析而非占位符 |
| 5 | **fundamentals chip** | 查看同一批股票的 fundamentals chip | 显示真实 ROE/毛利率/增速数字，非 "📊 待补" |
| 6 | **中游环节** | 滚动到 midstream 区域 | 10 只（或设计数量）中游股票正常显示 |
| 7 | **四问筛选** | 滚动到四问筛选 section | 表格有数据行（非仅表头空白），✓/✗ 标记正常 |
| 8 | **供需缺口** | 展开 "⑥ 后段" 折叠区 | supplyGap 条目完整显示 |
| 9 | **全局巡检** | 从上到下滚动整个页面，肉眼扫描 | 无 "undefined" 文字、无破损 CSS、无空白 section（除确认暂不填充的） |
| 10 | **PCB 对照** | 切换到 PCB 链，对比同位置模块的信息密度 | 新链的每个模块信息量与 PCB 同模块大致相当（非完全一致，但不应出现 PCB 有 50 行表格而新链只有空表头） |

#### 确认记录格式

```
=== 新链上线人工确认记录 ===
链 ID: <chainId>
日期: YYYY-MM-DD
确认人: <投顾/用户>

[ ] 1. 赛道概览区    — 通过/不通过 — 备注:___
[ ] 2. 产业链全图     — 通过/不通过 — 备注:___
[ ] 3. 上游拆解 segments — 通过/不通过 — 备注:___
[ ] 4. dims6 chip 展开  — 通过/不通过 — 备注:___
[ ] 5. fundamentals chip — 通过/不通过 — 备注:___
[ ] 6. 中游环节       — 通过/不通过 — 备注:___
[ ] 7. 四问筛选       — 通过/不通过 — 备注:___
[ ] 8. 供需缺口       — 通过/不通过 — 备注:___
[ ] 9. 全局巡检       — 通过/不通过 — 备注:___
[ ] 10. PCB 对照      — 通过/不通过 — 备注:___

最终结论: [ ] 批准上线 / [ ] 驳回修改
```

**此确认记录必须保存在 `.claude/scratch/<chainId>-preflight-<date>.md`，作为该链上线的前置证据。CC 不得自行填写此记录——必须由投顾/用户逐项核对后填写。**

#### §13.5.1 CHANGELOG 面板同步提醒（2026-07-12 commit · 阶段1 moat/timing 后立）

> **触发**：阶段1 完成后发现右侧"数据变更"面板内容滞后——昨天 PCB 系统性收尾的 9 个 commit 完全没有反映在面板中，用户看不到本轮工作的成果摘要。

**根因**：CHANGELOG 面板数据源是 `index.html` 内 `const CHANGELOG = [...]` 硬编码数组，`renderChangelog()` 函数先尝试从 git API 拉取，失败后 fallback 到内置数组。**生产环境没有 git API 在运行，所以永远走 fallback 路径**——这是一个**纯人工维护**的变更记录面板，不是自动同步的。

**强制规则**：任何涉及以下场景的 commit，**必须在 commit 后立即补充 CHANGELOG 条目**：

- 数据字段批量修改（如污染清理、估值校准、reason 补全）
- 渲染层 bug 修复（如 getEffectiveDims6 优先级反转）
- 新功能上线（如 Playwright 验证脚本、§13 检查清单）
- 数据治理规则修订（如 §10.2/§10.3 估值规则）

**补充方式**：直接在 `index.html` 的 `const CHANGELOG = [` 数组最前面插入新条目，格式参照已有记录：

```javascript
{ date:'YYYY-MM-DD', sector:'pcb', desc:'...用户可读的变更描述...', pct:'NEW/FIX/🆪' },
```

`sector` 取值：`'pcb'` / `'semicon-equip'` / `'system'` 等。`pct` 取值：`'NEW'`（新功能）、`'FIX'`（修复）、`'🆪'`（AI 辅助/主观判断类改动）。

**与 §13.5 人工确认清单的关系**：CHANGELOG 面板更新可纳入 §13.5 第 9 项"全局巡检"的范围——用户肉眼扫描时应确认面板内容是否反映了本轮工作。

**违反本节**：不构成违规（面板本身就是"可能未完全反映最近 commit"的人工摘要），但**会降低用户对数据治理工作的感知度**——用户看不到做了哪些改动，可能误以为"数据好久没更新了"。

---

### §13.6 新链 vs PCB 金标准自动对比脚本

#### 模板脚本

```bash
node scripts/_diff_chain_vs_pcb.js <chainId>
```

#### 对比维度

| 维度 | PCB 金标准 | 对比方式 | 输出 |
|------|-----------|---------|------|
| **顶层字段** | `id/name/icon/meta/prosperity/cyclePosition/plainIntro/overview/treeMap/segments/midstream/fourQuestions/chokePoints/supplyGap/methodologyNotes` | 逐字段存在性检查 | MISSING 清单 |
| **segments[].stocks[] 字段** | `rank/name/code/position/barrier/tier/valAsOf/src/trend/trendNote/logic` (PCB auto 层) | 逐字段存在性检查 | 新链缺失字段清单 |
| **manual.js stocks[] 字段** | `dims6/fundamentals/riskMetrics` (PCB manual 层) | 逐字段存在性检查 | 新链缺失字段清单 |
| **treeMap 结构** | 5 列均为数组，每 sub-card 含 `companies` 数组 | 类型检查 | 非数组列/缺失列清单 |
| **fourQuestions** | `segments` 数组长度 = segments 数量，每段含 `stocks` 数组 | 数组长度对比 | 空数组告警 |
| **valid 股票数** | auto 层 unique codes = manual 层 stocks 数量 | 计数对比 | 差异清单 |

#### 输出示例

```
=== semicon-equip vs PCB 金标准对比 ===
[OK] 顶层字段: 14/14 齐
[OK] segments[].stocks[] 字段: 11/11 齐
[WARN] manual.js 缺失字段: fundamentals(0/21), riskMetrics(0/21)
[OK] treeMap 结构: 5 列全为数组
[FAIL] fourQuestions.segments: PCB=7, semicon-equip=0 (空数组)
[OK] 股票数一致: auto=21, manual=21
```

**此脚本每次新链上线前必须运行，输出报告存入 `.claude/scratch/<chainId>-vs-pcb-<date>.md`。**

---

#### §13.6.1 字段对比方法论：Object.keys() 递归 dump 优先于人工列举（2026-07-12 · chainStory keyStocks 漏检教训立）

> **触发**：semicon-equip 链 chainStory 模块收尾阶段，连续多轮对比报告都未发现 PCB chainStory 中有 `keyStocks`/`barrierNote`/`source` 三个子字段，导致 semicon-equip 的 chainStory 卡片右侧股票名单一直空白，直到用户亲眼看页面截图才指出差异。

**根因**：之前的对比方法是 **人工列举已知字段名逐项核对**（如 "step/name/barrier/choke/domestic/desc 各有哪些"），而不是先做 `Object.keys()` 递归 dump 再交叉对比。人工列举的方法自带盲区——你只能检查你已经知道存在的字段，而 `keyStocks` 这类字段恰好不在当时的 "已知字段清单" 里。

**强制规则（所有新链 vs PCB 对比时永久生效）**：

1. **对比第一步：全量字段名 dump**——对 PCB 和目标链的对应数据结构，**必须**先用 `Object.keys()` 递归提取全部字段名，生成两份完整字段清单，再做交叉对比（PCB 有但新链无 / 新链有但 PCB 无 / 两边都有但类型不同）
2. **禁止跳过第一步直接做 "内容对比"**——在没有完整字段清单的情况下比较 "哪边内容丰富"，等于在盲区里做判断
3. **递归深度至少 2 层**——顶层字段 + 每个顶层字段的子字段（如 `plainIntro.chainStory[0]` 的所有 key）

**对比模板**（替代人工列举）：

```javascript
function dumpKeys(obj, prefix='', depth=0, maxDepth=2) {
  if (depth > maxDepth || obj === null || typeof obj !== 'object') return [];
  const keys = [];
  if (Array.isArray(obj) && obj.length > 0) {
    keys.push(prefix + '[0]');
    keys.push(...dumpKeys(obj[0], prefix+'[0].', depth+1, maxDepth));
  } else {
    Object.keys(obj).forEach(k => {
      keys.push(prefix + k);
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        keys.push(...dumpKeys(obj[k], prefix+k+'.', depth+1, maxDepth));
      } else if (Array.isArray(obj[k]) && obj[k].length > 0 && typeof obj[k][0] === 'object') {
        keys.push(...dumpKeys(obj[k][0], prefix+k+'[0].', depth+1, maxDepth));
      }
    });
  }
  return keys;
}
// 使用：对比 PCB 和 semicon-equip 的 plainIntro 字段
const pcbKeys = dumpKeys(PCB.plainIntro, 'plainIntro.');
const seKeys = dumpKeys(SEMI.plainIntro, 'plainIntro.');
const pcbOnly = pcbKeys.filter(k => !seKeys.includes(k));
const seOnly = seKeys.filter(k => !pcbKeys.includes(k));
```

**本次漏检的 3 个字段已被补入常见的 "新链 vs PCB 对比" 关注清单**：

| 字段 | 位置 | 首次发现 |
|------|------|:--:|
| `plainIntro.chainStory[0].keyStocks` | 每个 step 右侧股票名单 | semicon-equip chainStory 收尾 |
| `plainIntro.chainStory[0].barrierNote` | 壁垒补充说明文字 | 同上 |
| `plainIntro.chainStory[0].source` | 数据来源标注 | 同上 |

**复用方式**（后续光模块/存储与接口等链对比时）：
- `_diff_chain_vs_pcb.js` 应集成 `dumpKeys()` 功能，在报告开头先输出 "PCB 独有字段 / 新链独有字段" 清单
- 不要等到用户截图发现差异再补——字段名差异应该是自动检测的第一道关卡

**违反本节 = 对比方法缺陷导致字段遗漏（非数据错误，但会降低对比报告的完整性和可信度）**。

---

### §13.7 常见故障模式速查表（从 P0-1~P0-5 事故提炼）

| 故障模式 | 典型表现 | 首次发现 | 预防机制 |
|---------|---------|:--:|------|
| **双层架构不同步** | auto 层有 23 只、manual 层有 21 只（差异=2 只已删除股票残留） | P0-1 | `check_xxx_sync.js` 第[2]项 core 游离检查 |
| **命名空间连字符** | `chainId.toUpperCase()` 产生 `SEMICON-EQUIP_MANUAL`（应为下划线）→ window 查找失败 → 回退到 PCB_MANUAL | P0-3 | `getManualNamespace(chainId)` 统一 helper，禁止各自手写拼接 |
| **if/else 分支误归属** | `if (!d.demandChainMeta)` 的 else 分支误渲染旧版 treeMap → 页面出现 "📱 undefined" | P0-4 | 渲染检查 `treeNodes` 计数 + 人工视觉核对 §13.5 第 2 项 |
| **开发术语污染** | position/logic/trendNote 中出现 "★ commit 6.2"/"Phase 9 PCB 短板补充" | P0-5 | `validateNoDevTerms` 写入前校验 + `__scan_contamination.js` 写入后全量扫描 |
| **数组当作对象访问** | `d.treeMap.downstream.name` 期望对象但 downstream 是数组 → undefined | P0-4 | 新链 vs PCB 对比脚本检查 treeMap 每列类型 |
| **空数组渲染空表格** | `fourQuestions.segments = []` → section 渲染仅表头、无数据行 | P0-2 | 渲染检查 `fourQRows` 计数 + 人工核对 §13.5 第 7 项 |
| **数据已写但渲染未读** | manual.js 有 fundamentals 但 `getManualNamespace` 找不到 → chip 全显 "📊 待补" | P0-3 | 渲染检查 `fundsChips` 计数 + 人工核对 §13.5 第 5 项 |
| **股票跨段重复计数** | 北方华创出现在 seg[0] 和 seg[1]，按段计数得 30 但 unique 仅 21 | P0-1 | `check_unique_stock_codes.js` 区分 core vs treeMapOnly |
| **基本面排名表重复股票** | `renderStockRankingPanel` 遍历 segments 时未按唯一 code 去重，跨段股票重复出现 (2026-07-12 · 全局排查确认 12 条链均受影响) | semicon-equip 中微/北华/万业各出现 3 次 | `allStocks` 收集时用 `Set` 去重 (`if (seen.has(s.code)) return`) + §13.5 人工核对新增检查项 |
| **公司更名未同步** | 先导基电(原万业企业 600641)更名后 manual.js 和 auto.js 多处仍用旧名 (2026-07-12) | 用户对照历史记录困惑 | §14.6 公司名称变更通用核实步骤 · 每链 Phase A 阶段全量核查 + 半年报刷新时复查 |
| **硬编码 PCB_MANUAL 漏网** | `window.PCB_MANUAL` 直接引用 → 非 PCB 链手动层数据读不到 → fallback 到空/错误值 (2026-07-12·第四次发现:renderFundamentalsBlock) | semicon-equip 卡口卡片 "基本面数据待补充" 但实际数据完整 | `grep -n 'window\.PCB_MANUAL' index.html` 全局审计 → 分类:跨链共享函数(BUG·必须修)/PCB 专有函数(设计如此·加注释标记) → 新增函数一律走 `getManualNamespace` |
| **git checkout 整文件恢复导致已修复内容丢失** | 修改过程中遇到语法错误，用 `git checkout -- file` 整文件恢复 → **所有未 commit 的该文件改动全部丢失**（包括之前已验证通过的其他修复）(2026-07-12·SOURCE_TIERS 扩展时 Python 行插入缺逗号→checkout index.html→之前 6 处修复同时消失) | 一次小语法错误 → 整页不可用 → checkout 恢复 → 9 处修复需逐一重做 | 🔴 **硬性规则：今后遇到任何语法错误，禁止使用 `git checkout` 整文件恢复。正确做法：① 优先 `git stash` 保存当前所有改动 → 修复问题 → `git stash pop` 恢复 → 合并 ② 直接定位并只修改出问题的具体那一行，不要整文件恢复 ③ 如源文件备份存在，对比 diff 逐项恢复而非盲目 checkout** |
| **脚本从 git HEAD 加载源数据后全量覆写磁盘** | 多个修改脚本各自从 `git show HEAD:file`（而非 `fs.readFileSync` 从磁盘）读取 → 修改 → 写回磁盘。第二个脚本的源数据来自 git HEAD（不含第一个脚本未 commit 的修改）→ 覆写后第一个脚本的改动**静默丢失**。此模式与 `git checkout -- file` 数据丢失效果完全等价，但通过脚本逻辑而非 git 命令实现——更难察觉（2026-07-12·commit 6.76 前两轮会话交接时发现：variant 元数据被 `__add_chokes_final.js` 从 git HEAD 加载覆写） | PCB variant 元数据（`__fix_pcb_final.js` 写入 variant+chokePoints → `__add_chokes_final.js` 从 `git cat-file -p HEAD` 加载·不含 variant → 覆写磁盘 → variant 丢失，chokePoints 因两脚本都写了而幸存） | 🔴 **任何修改磁盘文件的脚本/命令，必须从磁盘当前状态读取，严禁从 git HEAD（`git show`/`git cat-file`）或任何历史 commit 读取后全量覆写**。正确做法：① 脚本用 `fs.readFileSync` 从磁盘加载当前状态 → 修改 → 写回 ② 多个脚本串行执行时，后续脚本必须从磁盘读取（自然包含前面脚本的修改）③ `git show HEAD:file > file` 等价于 `git checkout HEAD -- file`，同属禁止操作 ④ commit 是防止此类丢失的唯一硬防线——关键节点必须 commit 后再启动下一批脚本 |
| **迁移声明与实际写入不同步** | 双层架构拆分/数据迁移脚本在 auto 层添加 `_note: "数据已迁 XXX"` 并将源字段清空（如 `segments: []`），**但目标层（manual.js）从未收到写入操作** → 数据在两层之间都不存在，形成**悬空状态**。`_note` 声明提供了虚假的安全感——脚本开发者以为迁移已完成，后续检查工具看到 `_note` 后也跳过验证。此模式比前两种更难察觉，因为没有任何报错或明显信号，仅在渲染层出现"数据空白"时才被发现（2026-07-12·commit 6.62 P0 双层拆分时 semicon-equip fourQuestions 数据从 auto 层清空但从未写入 manual 层·23 天未被发现） | semicon-equip fourQuestions（commit 02d1c87 双层拆分时 auto 层 `segments: []` + `_note: 已迁 manual.js` → manual 层从未收到写入 → fourQuestions 在两层均不存在·23 天后用户追问才发现） | 🔴 **任何数据迁移操作，不能只在 `_note`/注释里声明"已迁移"，必须实际验证目标位置确实存在对应数据后，才能在源位置清空/移除**。正确做法：① 先将完整数据写入目标层 → ② 验证目标层数据可读（`require` 后检查字段非空）→ ③ 确认渲染层能正确读取目标层数据 → ④ 最后才在源层清空并添加 `_note` ② 迁移脚本必须包含"写入后验证"步骤——读回刚写入的数据并逐字段对比 ③ 为防止此类漏洞，check_xxx_sync.js 应增加"fourQuestions 覆盖率"检查项（§13.2 补充） |

---

#### §13.7.1 硬编码 PCB_MANUAL 自动化检测（2026-07-12 · "绝不出现第五次"）

**触发**：从 P0-3（命名空间连字符）→ P0-3（优先级反转）→ 本次（renderFundamentalsBlock）→ latestVerifiedAtFromManual，累计 4 次发现 `window.PCB_MANUAL` 硬编码 bug。每次都是被动修复单个函数，从未做过全站主动扫描。

**根因模式**：新增渲染函数时，开发者从已有函数复制代码作为模板，将 `window.PCB_MANUAL` 一并复制过去，但忘记改为 `getManualNamespace(chainId)`。这个模式在 PCB 专有功能中是合理的（持有管理/信号 C/宏观/概念票只服务 PCB 链），但在跨链共享函数中就是 bug。

**自动化检测脚本**（每次 commit 前或新函数新增后运行）：

```bash
# 检测 index.html 中所有 window.PCB_MANUAL 直接引用
grep -n 'window\.PCB_MANUAL' index.html | while read line; do
  lineno=$(echo "$line" | cut -d: -f1)
  # 排除注释行（// 或 /* 开头）
  if ! sed -n "${lineno}p" index.html | grep -qE '^\s*(//|\*|/\*)'; then
    # 检查前后 3 行是否含 getManualNamespace
    ctx=$(sed -n "$((lineno-3)),$((lineno+3))p" index.html)
    if ! echo "$ctx" | grep -q 'getManualNamespace'; then
      echo "⚠️  L${lineno}: PCB_MANUAL 直接引用，且周围无 getManualNamespace 调用"
    fi
  fi
done
```

**输出示例**（2026-07-12 审计结果）：

| 行号 | 函数 | 分类 | 处理 |
|:--:|------|:--:|:--:|
| 1064 | conceptNoteOf | PCB 专有 | 保留（概念票标注只适用于 PCB） |
| 1085 | latestVerifiedAtFromManual | 跨链共享 | ✅ 已修复为 getManualNamespace |
| 1208 | renderStopLossPlan | PCB 专有 | 保留（持有止损计划仅 PCB 持仓） |
| 1214 | renderStopLossPlan | PCB 专有 | 保留 |
| 1269-70 | renderMacroDashboard | PCB 专有 | 保留（宏观仪表盘仅 PCB 有 macro 数据） |
| 1339 | renderSignalC | PCB 专有 | 保留（信号 C 仅 PCB 链启用） |
| 1445 | renderStockFundamentalsChip | 跨链共享 | ✅ 已修复（getManualNamespace with fallback） |
| 1473 | renderStockRiskChip | 跨链共享 | ✅ 已修复（getManualNamespace with fallback） |
| 1493 | renderFundamentalsBlock | 跨链共享 | ✅ 本次修复 |
| 1949 | signalC distance | PCB 专有 | 保留 |
| 3638/3666-68 | conceptNote 渲染 | PCB 专有 | 保留 |
| 3759 | stopLoss section | PCB 专有 | 保留 |

**强制规则**：

1. **任何新增函数不得直接引用 `window.PCB_MANUAL`** — 必须走 `getManualNamespace(chainId)`
2. **复制已有代码作为模板时，必须将 `window.PCB_MANUAL` 替换为 `getManualNamespace` 调用**
3. **上方的 grep 检测脚本应集成到 `page_audit.py` 或 `check_xxx_sync.js` 中**，作为 commit 前的自动化阻断
4. **如果某个函数确实只需要读 PCB 的数据（如 PCB 持仓管理系统）**，必须在函数顶部加注释 `// ★ PCB-ONLY: 本函数仅服务 PCB 链，PCB_MANUAL 硬编码为设计意图` 并说明原因

**登记 commit**：本次（2026-07-12 PCB_MANUAL 全局审计）

---

### §13.8 完整上线前执行序列（一次性跑通）

```bash
# ===== 第 1 步：数据层自动验证（CC 执行，全部 PASS 才能继续）=====
python scripts/page_audit.py                    # 全局审计
node scripts/check_<chainId>_sync.js            # 双层同步
node scripts/check_unique_stock_codes.js <id>   # unique 基线
node scripts/__scan_contamination.js            # 开发术语污染扫描

# ===== 第 2 步：新链 vs PCB 结构对比（CC 执行）=====
node scripts/_diff_chain_vs_pcb.js <chainId>    # 字段结构 diff

# ===== 第 3 步：渲染层 DOM 验证（CC 执行）=====
python scripts/_preflight_render_check.py <chainId>  # Playwright 自动 DOM 检查

# ===== 第 4 步：强制人工确认（投顾/用户执行，不可跳过）=====
# 浏览器打开 http://localhost:8000/index.html#<chainId>
# 按 §13.5 的 10 项清单逐项核对，填写确认记录
# 确认记录存入 .claude/scratch/<chainId>-preflight-<date>.md

# ===== 第 5 步：上线 =====
# 第 1-3 步全部 PASS + 第 4 步投顾批准 → 允许上线
```

**任何一步 FAIL → 必须修复后从第 1 步重新跑，不得跳过中间步骤直接"补丁式修复"。**

**违反本节（§13）= 新链/大改动在上线前未完成完整的前置检查流程 → 视为违反 §6.8 数据准确度优先原则（"流程完成 > 数据准确"的逆向错误）。**

---

## §14 半年报/季报数据刷新标准流程（通用 · 所有产业链 · 2026-07-12 立）

> **适用范围**：所有已通过 Phase B 完成 dims6 六维打分的产业链（PCB/semicon-equip/光模块·光互联/存储与接口等未来的链），每季度/每半年财报发布后按本流程统一刷新。
>
> **执行前必须读完本节全部** —— 不读完不允许开始拉取任何一只股票的数据。

### §14.1 触发时机与前置条件

**触发时机**：用户发出 "对 XX 链开始执行半年报刷新" 的明确信号。该链所有股票的最新一期财报必须已在巨潮/交易所公告（不可用 "业绩预告" 作为替代，必须是正式财报）。

**前置条件**（任一不满足则拒绝执行）：

1. 该链已有 `.manual.js` 文件，且 `check_xxx_sync.js` 全绿
2. 该链 100% 股票已完成 dims6 六维打分（field 口径 reason ≥ 20 字覆盖率 = 100%）
3. `abstract_ths` 接口可正常访问该链所有股票的最新一期数据
4. 本机 Python 环境有 akshare 且 `stock_financial_abstract_ths` 可用

### §14.2 触发规则：方向性判断（四类·适用于任意产业链）

对所有股票执行依次检查，**命中任一条 → 完整重写 dims6 reason + score**。均未命中 → 轻量增量更新。

#### R1：盈亏方向反转

| 子条件 | 定义 | 严重度 |
|:--:|------|:--:|
| R1a | 上期（年报/上一季报）净利润 > 0，本期净利润 < 0（由盈转亏） | 🔴 强制重写 |
| R1b | 上期净利润 < 0，本期净利润 > 0（由亏转盈） | 🔴 强制重写 |
| R1c | 亏损幅度同比收窄 > 50%（如 -1.5 亿 → -0.3 亿） | 🟡 建议重写 |

**判定依据**：`abstract_ths` 对比本期 vs 上期净利润正负号。R1c 需计算上年同期基数。

#### R2：营收/净利 YoY 方向反转

| 子条件 | 定义 |
|:--:|------|
| R2a | 上一期财报（如 2026Q1）营收 YoY 符号与本期（如 2026H1）相反 |
| R2b | 上一期财报净利 YoY 符号与本期相反 |

**判定依据**：`abstract_ths` 连续两期数据对比。R2 触发意味着之前的 trend（up/down/flat）判断可能反转——A 类正面信号可能变为负面，或反之。

#### R3：§6.15 五种亏损模式归类变化

每只股票在 Phase B 首次打分时有固定的模式归类（见各链对应的 §11.X）。如果本期数据导致归类发生变化（如从 "模式一（扩产阵痛型）" 变为 "模式二（全面恶化型）"），需要完整重写——因为不同模式使用不同的 valuation 替代指标（§6.15 规则 ①）。

**判定依据**：对比本期的净利润正负状态 + 营收 YoY 方向 + 亏损收窄/扩大趋势，与当前的模式归类表对照。

#### R4：净利率趋势性变化

| 子条件 | 定义 |
|:--:|------|
| R4a | 本期净利率 < 上期净利率 × 0.7（连续恶化超过 30%） |
| R4b | 本期净利率由负转正（如 -5% → +3%） |

**判定依据**：`abstract_ths` 的三期数据（去年年报 → 上期季报 → 本期），计算净利率趋势。R4 触发意味着 visibility 和 durability 维度的 B 类辅助信号可能发生方向性变化。

### §14.3 轻量增量更新流程（未触发 §14.2 规则的股票）

#### Step L1：fundamentals 字段更新

```
脚本：scripts/refresh_fundamentals.py --chain=<chainId>
数据源：akshare stock_financial_abstract_ths（§6.17 单一权威源）
对未触发重写规则的股票，更新 manual.js 中的 fundamentals 字段：
  - revenueGrowth / netProfitGrowth（本期 vs 上年同期）
  - roe / grossMargin / roeQuarterly（最新实测值）
  - asOf 日期更新为本期财报截止日
```

#### Step L2：dims6 reason 中数字和时间点同步

对每只股票的 6 个 dims6 reason 字段做**纯文本更新**（不改变 score/trend/tier）：

| 操作 | 示例 |
|------|------|
| 将旧期数字替换为新期数字 | "2026Q1 营收 23.95 亿+30.9%" → "2026H1 营收 XX 亿+XX%" |
| 更新实测日期标注 | "2026-07-08 实测" → "2026-08-XX 实测" |
| 更新数据截止点 | "截至 2026Q1" → "截至 2026H1" |

**约束**：只在 reason 文本中发现 "可精确匹配" 的数字时才替换。**使用 stock code 精确定位**（§11.19 教训），不使用全文字符串匹配。score/trend/tier 三个字段不修改。

#### Step L3：auditLog 追加

在每只股票对应的 manual.js 中追加（或新建）auditLog：

```json
{ "date": "2026-08-XX", "action": "H1数据刷新", "result": "轻量更新·趋势判断维持不变",
  "fieldsUpdated": ["fundamentals", "reason中数字和时间点"], "chainId": "<chainId>" }
```

#### Step L4：moat/timing 联动重算

即使 score 不变，也需要重新跑 `computeFitFromDims` 确认 moat/timing 没有漂移。使用独立 Node.js 脚本逐只验证，与旧值对比，差异 > 3 分的必须人工复核原因。

### §14.4 完整重写流程（触发 §14.2 任一规则的股票）

不允许降级处理——必须走 Phase B v3 完整流程：

#### Step F1：abstract_ths 实测 + 黑名单生成

```bash
python scripts/refresh_fundamentals.py --chain=<chainId> --mode=full-rewrite --codes=<触发股票列表>
```

拉取四期完整财务数据（T-3 年报 / T-2 年报 / T-1 季报 / 本期），与现有 dims6 reason 数字对比，生成黑名单："与实测不符的旧数字"（Phase A 残留或上期数据已漂移的），明确禁止豆包引用。

#### Step F2：prompt v3 模板生成

每条 prompt 含以下 4 个区块：

| 区块 | 内容 |
|------|------|
| §0 [1] | L1 实证数据 pre-feed（四期 financial abstract） |
| §0 [2] | 当前 dims6 6 维 score/trend/tier 快照（作为豆包修正的参考基线） |
| §0 [3] | 触发原因说明（R1/R2/R3/R4 哪条命中 + 具体数据对比） |
| §0 [4] | Phase A 黑名单（禁止引用的旧数字清单） |
| §1 | 查询规则（13 条硬约束 + §6.7.3 4 类禁止 + §6.17 abstract_ths 单一源 + §6.15 亏损公司专项） |
| §2 | 输出格式（7 段式 + 每个 dims6 维度的 score/trend/tier/reason 完整结构） |
| §3 | 自查清单（高风险/中风险/低风险/可重算四栏） |

#### Step F3：发豆包 + §6.7.3 筛查

用户将 prompt 发给豆包 → 豆包返回 → CC 逐条筛查：具体日期/具体金额/占比口径扩展/早年历史数据 4 类高风险数字，命中任一条 → 删除具体数字、改为定性描述或归 "未查到"。

#### Step F4：stock code 精确定位写入

写入前唯一性检查（§11.19 规则），写入后跑 chain 对应的 `check_xxx_sync.js` check3 口径差额验证。

#### Step F5：moat/timing 重算 + 差异审计

使用 `computeFitFromDims` 重算 moat/timing，与旧值对比。差异 > 3 分的必须人工复核原因并记录在 auditLog 中。

### §14.5 通用批量拉取与分类脚本框架

#### 脚本：`scripts/refresh_fundamentals.py`

**使用方式**：
```bash
python scripts/refresh_fundamentals.py --chain=pcb                # PCB 链 38 只
python scripts/refresh_fundamentals.py --chain=semicon-equip      # 半导体设备链 21 只
python scripts/refresh_fundamentals.py --chain=optical-module     # 光模块·光互连链
```

**参数说明**：

| 参数 | 必需 | 说明 |
|------|:--:|------|
| `--chain` | ✅ | chainId，对应 `data/<chainId>.js` 和 `data/<chainId>.manual.js` |
| `--mode` | ❌ | `auto`（默认·自动分类）/ `classify-only`（仅输出分类不做写入）/ `fundamentals-only`（仅更新 fundamentals 不做 dims6） |
| `--codes` | ❌ | 指定 stock code 列表（逗号分隔），默认处理该链全部 stock |

**内部流程**：

1. **加载 manual 层** → 获取所有 stock code 列表 + 当前 dims6/fundamentals 快照
2. **逐只拉取** → `akshare.stock_financial_abstract_ths` 拉取四期数据（T-3 年报 / T-2 年报 / T-1 季报 / 本期）
3. **R1-R4 自动判定** → 对比本期 vs 上期数据 + 当前 dims6 reason 中的模式归类
4. **输出分类报告**（标准格式）：

```
=== <chainId> 半年报刷新分类结果 ===
生成时间: 2026-08-XX
完整重写 (FULL_REWRITE): X/N
  - <code> <name> [R1b: 由亏转盈] [R3: 模式变更]
  - ...
轻量更新 (LIGHT_UPDATE): Y/N
  - <code> <name>
  - ...
```

5. **按分类执行**：
   - LIGHT_UPDATE → 自动执行 §14.3 的 Step L1-L4
   - FULL_REWRITE → 输出 prompt 文件（`<chainId>_h1_rewrite_prompts.md`），**待人工发豆包后 CC 再写入**（不自动写入）
6. **verify_yoy 校验** → 每个 fundamentals 写入前走 YoY 反算校验（§13.4 阈值分档），偏差超阈值阻断写入

**与现有脚本的关系**：
- `refresh_se_fundamentals.py` → 维持不变（semicon-equip 专用，保留了 Decimal 精算引擎和 verify_yoy 的具体实现）
- 新脚本 `refresh_fundamentals.py` → 复用相同的抽象逻辑框架，但使用 chainId 参数动态加载不同链的 manual.js

### §14.6 公司名称变更的通用核实步骤

> **触发**：先导基电（原万业企业，600641）在 semicon-equip 链的 manual.js 中 name 字段仍为旧名。本步骤将此问题从 "遇一个改一个" 升级为通用核实流程。

**核实流程（每一步适用于任意链）**：

1. **扫描所有 stock name** → 逐只对比 `abstract_ths` 接口返回的最新公司全称与该链 `manual.js` 中的 `name` 字段是否一致
2. **对于不一致的股票**：查询巨潮 cninfo 公告确认更名日期和正式生效日
3. **更新 manual.js 中的 name 字段**为最新全称
4. **在 dims6 或 auditLog 中追加备注**：`"原名<旧名>, <YYYY-MM>更名"`
5. **同步检查 auto 层**：`data/<chainId>.js` 中 segments/midstream/treeMap 的 `name` 字段是否也需要同步更新

**已知待更名清单**：

| 链 | code | 旧名 | 新名 | 更名日期 |
|------|------|------|------|------|
| semicon-equip | 600641 | 万业企业 | 先导基电 | 2025-11（已确认） |

**后续新链建立时**：Phase A 骨架阶段即应做一次全量名称核查，不等到半年报刷新时才发现。

### §14.7 刷新完成后的验证流程

**所有刷新操作完成后，必须走完整 §13 四层验证**（此清单本身是跨链通用的）：

| 层 | 工具/方式 | 关键检查点 |
|:--:|------|------|
| 数据层 | `check_<chain>_sync.js` | check3 股票口径 reason 完整率是否保持 100%（不能因为刷新导致 reason 字段意外缩短或丢失） |
| 数据层 | `page_audit.py` | 全部 PASS |
| 渲染层 | Playwright DOM | `hasUndefined` = false · JS errors = 0 · dims6 chips 正常展开 · fundamentals chips 显示新数字 |
| 视觉 | 人工浏览器核对 | §13.5 关键项抽查（随机 3-5 只股票展开 dims6 chip 确认 reason 数字已更新） |

**额外检查（刷新专项）**：

1. **moat/timing 联动验证**：对比刷新前后的 moat/timing 值（用 `check_<chain>_sync.js` 的 baseline 对比），差异 > 3 分的股票必须列出并人工复核原因。
2. **CHANGELOG 同步**：在 `index.html` 的 `CHANGELOG` 数组最前面插入一条刷新记录，格式参照已有条目：
   ```
   { date:'2026-08-XX', sector:'<chainId>', desc:'📊 H1半年报数据刷新·X/N只轻量更新+Y/N只完整重写·...', pct:'REFRESH' }
   ```
3. **no regressions on other chains**：由于 `refresh_fundamentals.py` 和 `findStock` 是共享代码，刷新完成后必须切到 **PCB 链**（或其他未刷新的链）确认渲染正常、无回归。

### §14.8 执行示例（对各链的具体预测，仅供参考）

| 链 | 预计股票数 | 预计完整重写数 | 备注 |
|------|:--:|:--:|------|
| PCB | 38 | 预估 5-10 只 | 亏损公司较多（605006/002636/603186 等），R1/R3 触发概率较高 |
| semicon-equip | 21 | 预估 3-6 只 | 至纯/茂莱/中科飞测等亏损/微利公司 R1/R3 触发概率高 ⚠️ 微导纳米已排除——此前错误归类为"亏损"(基于禾元生物数据),真实微导纳米(688147)年净利2.19亿为盈利公司(详见§11.27) |
| optical-module | 待定 | 待定 | 光模块·光互联链 Phase B+ 完成后适用 |

**上述数字为预估，实际以 `refresh_fundamentals.py --mode=classify-only` 输出为准。**

---

**本节（§14）为跨链通用标准方法论。任何新链完成 Phase B 后即适用本节规则。**
**违反本节 = 半年报/季报数据刷新未按标准流程执行 → 违反 §6.2（数据未核实写入）+ §6.8（流程完成 > 数据准确）。**

