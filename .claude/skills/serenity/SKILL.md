# Serenity 物理卡口投研 + 产业链全景网站

## ⚠️ 治理文档保护（最高优先级，先于其他所有规则）

`SKILL.md` 和 `.claude/plans/refresh-sop.md` 是数据治理的固化规范，**只有用户明确说出
"修改SKILL.md" / "更新refresh-sop.md" / "调整数据质量关卡" / "改一下治理文档"
这类直接指向这两个文件的指令时，才能改动它们**。

在任何其他任务中（刷新赛道 / 修bug / 新增链 / 调整页面样式等），**即使发现这两个文件
有可改进、可优化、措辞不一致之处，也只在报告里提出建议，不直接修改文件**。

这条规则本身写在被保护的文件里，是不可逾越的边界，**不需要用户每次任务单独声明**。
commit 前如果 `git diff` 中出现这两个文件的改动而任务本身未授权，视为越界，应撤回该部分改动。

---

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
4. **四处必改注入** — 新建 `data/<id>.js` / 在 `index.html` manifest 数组加 `'<id>'` / 侧栏 nav-item / CHANGELOG（升级九 STEP 4 后由 3 处改 4 处）
5. **验证** — `data/<id>.js` 独立加载自检 + 主 inline script JS 语法自检 + 浏览器测试（双文件镜像 `diff -q` 已废弃）

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

#### Step 4 · 四处必改注入（缺一不可，升级九 STEP 4 后由 3 处改 4 处）

| 顺序 | 改哪里 | 漏改后果 |
|---|---|---|
| 1 | **新建 `data/<id>.js`**（参考 `data/pcb.js` 结构：`window.CHAINS = window.CHAINS \|\| {}; (function(CHAINS){ CHAINS.<id> = {...}; })(window.CHAINS);`）| 数据完全不存在 |
| 2 | 在 `index.html` 顶部 `DATA_MANIFEST` 数组（line ~360）加 `'<id>'` | 数据文件存在但浏览器不加载 → `renderChain` guard 显示「该赛道数据加载失败」红色卡 |
| 3 | 在 `<div class="sidebar-nav" id="nav-list">` 里加 `<span class="nav-item" data-chain="<id>" onclick="switchChain('<id>')">…</span>` | 数据可达但侧栏看不到（URL hash 之外不可达）|
| 4 | 在 `CHANGELOG` 前面插一条今日日期记录（`sector: 赛道id` 或 `'system'`） | 用户 7 天内感知不到变化 |

> **侧栏顺序 = 用户看到顺序**。注意末尾 "━ 我的决策" / "━ 整合视图" 分隔行不要破坏。`renderChangelog` 内的 `sectorName` / `sectorColor` 三元映射可能要把新 id 加进去。
> **manifest 数组顺序 = 浏览器加载顺序**（与侧栏顺序独立）。新赛道追加到数组末尾即可。

#### Step 5 · 验证（升级九 STEP 4 后）

```bash
# 1. 单条 data/<id>.js 独立加载验证（替换 <id> 为新赛道 id）
node -e "global.window={};require('./data/<id>.js');const c=global.window.CHAINS.<id>;console.log(c?'OK '+c.name+' segments='+c.segments.length:'FAIL');"

# 2. 模拟完整浏览器加载，确认全部 13+ 条赛道注册（manifest 数组要先更新过）
node -e "global.window={};['pcb','semi','ai-server','hbm','robotics','autonomous-driving','power-semi','ai-apps','cpo','solid-battery','low-altitude','commercial-aero','ai-full-chain','<id>'].forEach(i=>require('./data/'+i+'.js'));console.log(Object.keys(global.window.CHAINS).length+' 条');"

# 3. 主 inline script JS 语法粗检（不会因为 data/<id>.js 而失败，因为已外置）
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const m=html.match(/<script>\s*\n\s*\/\/ ={5,}\n\/\/ DATA LAYER[\s\S]+?<\/script>/);const code=m[0].replace(/^<script>/,'').replace(/<\/script>$/,'');try{new Function(code);console.log('OK',code.length,'chars');}catch(e){console.log('ERR',e.message);}"

# 4. 浏览器测试（必须用 http server，file:// 下 <script src> 可能受同源限制）
py -m http.server 8000   # 浏览器开 http://localhost:8000/index.html#<新赛道id>
```

> **升级九 STEP 4 后已废弃**：`diff -q index.html 产业链全景.html`（产业链全景.html 是 16 行跳转页，不再镜像）。

校验点（手动）：
- 侧栏点新赛道 → 内容正确渲染（不进 `renderChain` guard 的红色错误卡）
- ② 树状图 5 列全部为 array（`Array.isArray(d.treeMap.downstream)` 走新布局），每列 ≥2 sub-card、每个 sub-card note 含占比+来源
- ③ segments 表每段 ≥5 stocks，每个 stock 旁有趋势徽章（绿/红/灰）
- ④ chokePoints 三大卡口 verification 默认 4 项 + 整体徽章
- ⑤ 顶部"数据截止"日期未动
- ⑥ 浏览器 DevTools Network 应看到 14+ 个 `data/*.js` 全 200（包含新赛道）
- ⑦ DevTools Console 无红色 JS 错误
- ⑧ 进 `#arena` 赛道擂台 → 新赛道行出现（如填了 prosperity，应看到综合分；否则显示"六维待回填"）
- ⑨ **G0-G7 关卡自检**（数据质量关卡 v2）— 注入后跑机械自检：①一手覆盖率 = `dims6Note` 含"具体财报数字+报告期+[来源]"的个股数/总数，**X/Y 个股带财报、缺 N 只：清单**，不到 100% 须列缺项 + 缺项票标 `⚠️财报待核`；②推算占比 = 标 `⚠️推算非披露` 的个股数/总数，>30% 需复查阶段专项核对；③确认 G7 优先级标签已打、复查按序走完、复查纪要已归档（详见「数据质量关卡 v2」G0-G7）

### 模式 2：刷新现有赛道（同样按 PCB 黄金范例）

**触发契约**：用户说以下任一句即按本 SOP 执行——
- "刷新 XX 赛道" / "重做 XX 赛道" / "全量研究 XX 赛道"
- "/serenity --refresh <赛道id>"

**执行流程**：与"模式 1 添加新赛道"**完全相同**的 5 步流程（深度搜索 → 四问筛选 → 数据结构化 → 注入替换 → 验证），**字段密度要求与新增赛道一致**（S1–S10 全套硬标准）。

**核心约束**：
- 刷新产出的新数据**必须**与黄金范例 `data/pcb.js` 同款结构与字段密度（segments ≥ 6 / 个股 ≥ 5 / midstream ≥ 10 / 卡口 3 大 / verification 4 项 / valuation.pePercentile 必填 / S1-S10 全过）
- 任意一条不达标 → **不替换原数据**（保留旧版本 + 在 CHANGELOG 加 1 条 `❌ 刷新未达标未注入` 记录原因）
- 注入替换路径：**直接 Edit `data/<id>.js`**（IIFE 内的 `CHAINS.<id> = { ... }` 块或后续独立赋值；保持顶部 `window.CHAINS = ...; (function(CHAINS){` 包装结构不变）
- 替换后验证：`data/<id>.js` 独立加载自检 + 主 inline script JS 语法 + 浏览器抽查 3 个 anchor 段（segments 表格、treeMap、chokePoints）
- 升级九 STEP 4 后**已废弃**：`diff -q` 双文件同步（产业链全景.html 是跳转页，不再镜像）

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
- ❌ **不**破坏 `// ==================== <NAME> ====================` 分隔行——`data/<id>.js` 内仍保留，便于阅读定位（虽然不再用 grep 跨文件定位）
- ❌ **不**改 CSS 主结构——非要新加 CSS 类 append 到主结构后面（`</style>` 之前），不改既有定义
- ❌ **不**在 `index.html` 主 `<script>` 里直接写 `CHAINS.xxx = {...}`——升级九 STEP 4 后赛道数据**一律**放 `data/<id>.js`
- ❌ **不**改 `index.html` 之外的孤立 PCB-only 页面（[PCB产业链全景.html](PCB产业链全景.html) 早期独立页，没明确要求别动）
- ❌ **不**期待 `产业链全景.html` 内有数据——升级九 STEP 4-2 后它是 16 行 meta-refresh 跳转页，不再镜像 `index.html`

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
- [ ] **PCB 黄金范例对齐（G8）**：跑「数据质量关卡v2 G8」结构差异表，**0个不达标项**才算对齐；有不达标项 → `meta.status` 不设 `active`，差异表存 `.claude/scratch/<id>-gap-report.md`
- [ ] **避坑清单**：13 条全部通过
- [ ] **四处必改**（升级九 STEP 4 后）：`data/<id>.js` 已建 / `index.html` 的 `DATA_MANIFEST` 数组已加 `'<id>'` / 侧栏 nav-item 已加 / CHANGELOG 今日记录已加
- [ ] **`data/<id>.js` 独立加载**：`node -e "global.window={};require('./data/<id>.js');..."` 输出 OK
- [ ] **主 inline script JS 语法**：`node -e` 输出 `OK <chars>`
- [ ] **浏览器测试**：3 个 anchor（segments 表格、treeMap、chokePoints）正常渲染；DevTools Network 看到该 `data/<id>.js` 200；Console 无红色 JS 错误
- [ ] **既有赛道不破坏**：现有 13 条赛道 + 升级一-九视图视觉不变
- [ ] **未自动 commit**——已列改动清单等用户确认

### 三重验证机制（涉及 ≥10 只 stock 必走·R3-16+ 防御措施）

> **触发时机**：任何涉及 ≥10 只 stock 的数据刷新 / 注入前（豆包 / DeepSeek / Gemini 返回时），必须先做三重验证 + 数据冲突检查。R3-16+ 批 1（2026-06-22）豆包编造 4 只 pcb.js 不存在 stock + 2 只错位段位 stock 事故后强制启用。

**三重验证流程（顺序执行，不可跳步）**：

1. **stock code 校验**——动态提取 `data/pcb.js` 实际 stock list（segments + midstream + fourQuestions 三路径），验证所有返回的 stock code 在 pcb.js 中
2. **stock 段位校验**——对比返回 stock 的 segIdx 与 pcb.js 实际 segIdx
3. **stock name 校验**——对比返回 stock 的 name 与 pcb.js 实际 name

**数据冲突检查**：

- 对比上一稳定版本（如 R3-15+ P1）的 `trendNote` 与新数据
- 重大数据漂移（如 trend 从 up → down / 营收增长率从 +50% → +200%）必须显式标注 ⚠️
- 不在 pcb.js 中佐证的数字 → 标 ⚠️参考

**验证脚本模板**（可复用）：

```js
global.window = {};
require('d:/乌龟/产业链全景/data/pcb.js');
const c = global.window.CHAINS.pcb;

// 1. 提取 pcb.js 实际 stock list
const pcbStocks = {};
for (const seg of c.segments) {
  for (const s of (seg.stocks || [])) {
    pcbStocks[s.code] = { name: s.name, segIdx: ..., rank: s.rank };
  }
}

// 2-4. 验证 code / 段位 / name + 数据冲突
const doubaoStocks = [ /* 豆包返回的 stock list */ ];
for (const ds of doubaoStocks) {
  if (!pcbStocks[ds.code]) console.log('✗ ' + ds.code + ' 不在 pcb.js 中');
  else if (pcbStocks[ds.code].segIdx !== ds.segIdx) console.log('✗ ' + ds.code + ' 段位错');
  else if (pcbStocks[ds.code].name !== ds.name) console.log('✗ ' + ds.code + ' name 错');
}
```

**强制规则**：

- 任何涉及 ≥10 只 stock 的数据刷新**必须**先过三重验证
- 单一检查通过不算合规，三项必须都通过
- 数据冲突检查必须列出所有重大漂移并标注 ⚠️，否则不算合规

**完整范例**：参考 `.claude/scratch/R3-16-batch2-hallucination-screen.js`（19 只 segments[0]-[3]）+ `.claude/scratch/R3-16-batch3-hallucination-screen.js`（15 只 segments[4]-[6]）。

**prompt 11 条硬约束**（豆包 / DeepSeek / Gemini prompt 设计时必走）：

1. 精确 stock 列表（code + name + 段位 + rank + barrier + tier + trend + trendNote）
2. 禁止引入新 stock（明确告知模型"pcb.js 中只有以下 stock"）
3. stock code 必须精确（6 位数字 + 板块标识）
4. stock 段位必须精确匹配
5. 查询不到不替换（在【6. 未查到】段列出）
6. 7 段式格式（认证进展/客户切换/新进入者/技术产能/品类归属/未查到/信源清单）
7. 信源 tier + broker 双源（primary/broker/media + 时间口径 + 数字 + 时点）
8. 段位品类标注（明确告知每段品类）
9. 量产/验证/在研状态标注（已量产/验证中/样品认证/在研/未启动 五档）
10. 不得编造事实——联网搜不到的事实必须显式列在【6. 未查到】段，不得填入主段伪装成事实，不得编造客户名、数字、日期
11. A/B 类信号拆分——A 类=壁垒维度本身变化（认证/客户验证/技术领先/竞争位置/产能变化）；B 类=经营业绩（营收/订单/亏损/份额变化）；trend 判断主依据必须是 A 类，B 类仅辅助印证

**违反本节 = CLAUDE.md §6.2 红线（造数）+ §6.8 数据准确度优先原则违反**。

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

### verdict.stockHint 写作模板（新增/刷新赛道必走）

`prosperity.verdict.stockHint` 是六维卡末尾"选股提示"那行金色框文本，**面向普通用户、不是给写代码的人看的**。

> ⚠️ **渲染器会自动加 `<strong>选股提示：</strong>` 前缀**（`index.html` line 1002），所以数据里**不要**写"选股："开头 —— 否则会渲染成"选股提示：选股：..."重复。

#### 结构（3 个槽位，1-2 句完成）

```
[环节指引]，[买点指引]；[方法论一句话总结]。
```

| 槽位 | 写法 | 范例 |
|---|---|---|
| **环节指引** | 用 `T0/T1` 等级 OR 具体环节名，**不**写 `segments[].barrier` 这种字段路径 | "优先 T0/T1 环节（极高/高壁垒）" / "优先 GMC/前驱体/混合键合设备 等 T0/T1 环节" |
| **买点指引** | 用 `PE 分位越低越安全` / `等节奏或换环节` 这类口语化 | "PE 分位越低越安全" / "PE 分位越低越安全，等节奏或换环节" |
| **方法论总结** | 一句话讲本赛道选股哲学，**不**超过 30 字 | "纯度>概念（卖铲子逻辑，避模组封测蹭概念）" / "景气+确定性选环节，壁垒+估值选标的与买点" |

#### 写作时查这个字段对照表（内部路径 → 用户语言）

| 字段路径 | 用户语言 |
|---|---|
| `segments[i].barrier === '极高'` | T0（极高壁垒） |
| `segments[i].barrier === '高'` | T1（高壁垒） |
| `segments[i].barrier === '中'` | T2（中等壁垒） |
| `chokePoints[i].valuation.pePercentile` | PE 分位 |
| `chokePoints[i].strength` | 强度（极高/高/中） |

> 字段路径**只**用于查数据时定位，**绝不**出现在 `stockHint` 文案里。

#### ✅ 好的范例

```js
// PCB
stockHint:'优先 T0/T1 环节（极高/高壁垒），PE 分位越低越安全；景气+确定性选环节，壁垒+估值选标的与买点。'

// HBM
stockHint:'优先 T0/T1 环节（GMC/前驱体/混合键合设备为真卡口），PE 分位越低越安全；纯度>概念（卖铲子逻辑，避模组封测蹭概念）。'
```

#### ❌ 不好的范例（代码感、用户读不懂）

```js
// 反面教材 1：堆字段路径
stockHint:'壁垒看 segments[].barrier(T0/T1 优先)，买点看 chokePoints[].valuation.pePercentile(分位越低越安全)。'
// → 错：T 容易看成 7；普通用户不知 segments/chokePoints 是啥

// 反面教材 2：太长、信息散
stockHint:'本赛道壁垒集中在 T0 极高壁垒环节，估值要看 PE 分位越低越安全，选股要景气+确定性选环节，壁垒+估值选标的与买点，不要追高。'
// → 错：把"卖点提示"和"选股"混在一起；超过 1 句承载量
```

#### 改写 SOP（已有赛道是代码感时）

1. 在数据文件里搜 `segments\[\]\|chokePoints\[` —— 找到所有 stockHint / prosperity.dim.reason 里残留的字段路径
2. 对照上表换成用户语言（T0/T1 / PE 分位 / 强度等）
3. 跑自检脚本：`grep -n "segments\[\]\|chokePoints\[" data/<id>.js` —— 应返回 0 行（reason 字段允许例外，但要标 🆪）

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

## 网站文件结构（升级九 STEP 4 后）

```
仓库根目录
├─ index.html (~1970 行)
│  ├─ <style>        — 全局 CSS（深色主题）
│  ├─ <header>       — Header（含 Jack唐的投研看板 + 数据截止日期）
│  ├─ <nav>          — 侧栏（含搜索框 + 13 条赛道 + 整合视图 + 我的决策）
│  ├─ <main>         — 动态内容容器 #chain-content（JS 渲染）
│  ├─ <aside>        — 右侧浮动变更面板（CHANGELOG，7 天滚动）
│  ├─ <footer>       — 免责声明
│  ├─ <script> #1    — manifest 块（DATA_MANIFEST 数组 + document.write 同步注入 13 个 <script src>）
│  └─ <script> #2    — 主 inline script（~94K chars）
│      ├─ const CHAINS = window.CHAINS = window.CHAINS || {}  ← 共享外部注入
│      ├─ PROSPERITY_META / computeLtFit() / STOCK_REGISTRY    ← 升级九 STEP 1
│      ├─ LS / LS_KEYS                                          ← localStorage 助手
│      ├─ trendBadge() / stockDims6Badge()                      ← 渲染辅助
│      ├─ renderChain() / renderCards() / renderTrades() / renderArena()
│      ├─ switchChain() / route()                               ← 路由
│      ├─ CHANGELOG[] / renderChangelog()                       ← 变更面板
│      └─ init()                                                 ← 初始化 + URL hash 路由
│
├─ data/                              ← 升级九 STEP 4 新增的数据目录
│  ├─ pcb.js              (~55 KB)    ← 黄金范例（已填六维）
│  ├─ semi.js              (14 KB)    ← 12 条普通赛道（六维待 STEP 5 回填）
│  ├─ ai-server.js         (10 KB)
│  ├─ hbm.js               (19 KB)
│  ├─ robotics.js          (10 KB)
│  ├─ autonomous-driving.js(10 KB)
│  ├─ power-semi.js         (9 KB)
│  ├─ ai-apps.js            (9 KB)
│  ├─ cpo.js                (9 KB)
│  ├─ solid-battery.js      (9 KB)
│  ├─ low-altitude.js       (9 KB)
│  ├─ commercial-aero.js    (8 KB)
│  └─ ai-full-chain.js     (22 KB)    ← AI 全产业链特殊整合视图
│
├─ 产业链全景.html (16 行)            ← 中文 URL 跳转页（meta-refresh → index.html）
└─ PCB产业链全景.html                 ← 早期 PCB-only 独立页面（主站不再链接，没明确要求别动）
```

**数据加载流程**：
1. 浏览器解析 `index.html` → 看到第 1 个 `<script>`（manifest）→ 同步执行
2. manifest 内 `document.write` 在 HTML parse 期顺序注入 13 个 `<script src="data/<id>.js">`
3. 浏览器按 manifest 数组顺序同步加载 13 个 `data/<id>.js` → 每个文件 `window.CHAINS.<id> = {...}`
4. **然后**才执行第 2 个 `<script>`（主 inline script）→ `const CHAINS = window.CHAINS = window.CHAINS || {}` 共享同一对象 → 渲染函数能拿到全部 13 条数据
5. `init()` 读 URL hash → `route()` 分发 → 对应的 `renderChain/renderCards/renderTrades/renderArena` 执行

**新增赛道只需**（升级九 STEP 4 后）：
1. 新建 `data/<id>.js`（IIFE + window.CHAINS 注入）
2. 在 `index.html` 顶部 `DATA_MANIFEST` 数组加 `'<id>'`
3. 在 `<nav class="sidebar">` 内加 nav-item
4. 在 `CHANGELOG` 加今日记录

**CSS 完全无需改动**（复用现有 .tag / .choke-card / .card / .stock-tbl / `var(--*)` 调色板）。

## 已有赛道（升级九 STEP 4 后，共 13 条，全部外置到 `data/<id>.js`）

| 赛道 ID | 数据文件 | 卡口标的 | 六维（升级九 STEP 1+2） |
|---------|---------|---------|---------|
| `pcb` | `data/pcb.js` | 东材科技/菲利华/铜冠铜箔 | ✅ **黄金范例**（meta + prosperity + 40 只 dims6） |
| `semi` | `data/semi.js` | 华大九天/北方华创/南大光电 | 🔜 待 STEP 5 回填 |
| `ai-server` | `data/ai-server.js` | 沃尔核材/英维克 | 🔜 待 STEP 5 回填 |
| `hbm` | `data/hbm.js` | 长鑫/兆易创新（间接）/材料商 | 🔜 待 STEP 5 回填（**建议优先**） |
| `robotics` | `data/robotics.js` | 鸣志电器/绿的谐波/拓普集团 | 🔜 待 STEP 5 回填 |
| `autonomous-driving` | `data/autonomous-driving.js` | 德赛/伯特利 | 🔜 待 STEP 5 回填 |
| `power-semi` | `data/power-semi.js` | 天岳先进/斯达半导 | 🔜 待 STEP 5 回填 |
| `ai-apps` | `data/ai-apps.js` | 金山办公/科大讯飞 | 🔜 待 STEP 5 回填 |
| `cpo` | `data/cpo.js` | 中际旭创/天孚通信 | 🔜 待 STEP 5 回填 |
| `solid-battery` | `data/solid-battery.js` | 当升科技/恩捷股份 | 🔜 待 STEP 5 回填 |
| `low-altitude` | `data/low-altitude.js` | 万丰奥威/亿航 | 🔜 待 STEP 5 回填 |
| `commercial-aero` | `data/commercial-aero.js` | 航天电子/中国卫星 | 🔜 待 STEP 5 回填 |
| `ai-full-chain` | `data/ai-full-chain.js` | （元赛道，整合视图） | 🔜 待 STEP 5 回填（特殊：含 socraticInquiry / occamRazor） |

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
| `index.html` | 主站 SPA 外壳（CSS + 渲染/路由/业务 JS + manifest 加载 data/<id>.js） |
| `data/<id>.js` | 13 个赛道数据文件（升级九 STEP 4 新增；IIFE + window.CHAINS 注入） |
| `产业链全景.html` | 中文 URL 跳转页（16 行 meta-refresh → index.html；升级九 STEP 4-2 后不再镜像） |
| `.claude/skills/serenity/SKILL.md` | 本 Skill 文档 |
| `.claude/workflows/serenity-choke-point.js` | 六步下钻工作流脚本 |
| `sector_research/docs/serenity-choke-point-methodology.md` | 方法论详细文档 |
| `景气六维_SOP试水样板_PCB.md` | 升级九所有改动的依据样板（v3） |

## 数据治理规则（投资数据真实性铁律）

> 所有数据改动的**前置规则**。下方《数据手动刷新》的每一步都必须满足本节约束；信源分级机制（`index.html` 主 inline script 顶部的 `SOURCE_TIERS` 四档常量 + `sourceTierBadge` 渲染助手）是本规则在代码层的落实。

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

操作细节见下方 [`## 数据手动刷新`](#数据手动刷新升级八-step-3--升级九-step-4-后) 一节。

### 5. 交叉验证门槛

- 关键数字 ≥2 个独立来源；一手（财报）单源即可信；仅 media 单源 → 存疑。
- 卡口逻辑保留 `falsifySignal`：出现反证（第三家认证 / 缺口收窄 / 竞品扩产）即降级。

## §6 外部信源反核实纪律（豆包经验沉淀 · R3-11 增补）

> 本节是 §5 交叉验证门槛的延伸，专门处理"外部信源（豆包/Gemini/Claude Code 联网端）返回数据后，CC 注入前的反核实纪律"。
>
> 来源链：pcb R3-11 commit `e000a1b` · [R3-11 A5 summary](.claude/scratch/pcb-r3-11-A5-summary-2026-06-21.md)（2026-06-21）
>
> **三处文档互相 cross-ref**（不合并，按职责分工）：
> - **CLAUDE.md §6.1-§6.8** · 顶层治理纪律（面向 LLM 的总原则+硬约束+反模式）
> - **SKILL.md §6.1-§6.4（本节）** · 操作规则（面向操作员/CC 的具体可执行规则）
> - **refresh-sop.md §6.5** · 流程位置（CC 在 Gemini 查询模板后必须做的反核实步骤）

### §6.1 诚实降级原则（原则 A · 用户强约束 · 2026-06-21）

任何评级/排序变动都要诚实标注，**不得为维持排序稳定性而保留已被证伪的错误数据**。

如果修正后某 ★★★ 卡口降为 ★★☆：
- ✅ 正确做法：诚实降级、调整排序（因为修正后的数据更准）
- ❌ 错误做法：为了"保留好看的卡口数量"而保留旧数据（违反 CLAUDE.md §6.8.1）

**决策卡片/交易日志是用户主动写的历史记录**，不会因为 PCB 链数据修正而自动失效。板块拓扑（排序/卡口）会变，但已记录的卡片继续保留，仅供用户基于新数据重新评估。

### §6.2 口径区分原则（原则 B · 数据变动性质分类）

数据变动分两种性质，处理方式不同：

**1. 同口径订正**：新数据证伪旧数据本身（不是统计范围/时间点不同）
- → **必须诚实降级**，不得保留旧卡口
- 例：原 q1note="全球市占 30%" → 豆包核实后"全球市占 12%"（同一口径）

**2. 不同口径数据**：新旧数据统计口径不同
- 例：M9 细分品类市占 30% vs 整体 CCL 市占 14-15%（细分 vs 整体）
- 例：现有产能 vs 在建产能
- 例：今年新增 vs 累计
- → 这不是"数据错误"问题，是"口径不一致"问题
- → 处理顺序：
  1. 先标注清楚两个口径分别是什么
  2. 判断当前评级依据的是哪个口径
  3. 新口径下是否应该用新口径重新评级
- → **不得把口径混淆直接等同于"卡口波动"草率降级**
- → **也不得因口径不同就借口"不算同一件事"而回避评级判断**

### §6.3 外部信源 strength 字段硬约束（豆包教训 · R3-11 增补）

**核心约束**：`strength` 字段是**基于 hits 数（q1-q4 中 true 数量）机械推断**的结果，外部信源（豆包/Gemini/Claude Code 联网端）**不能独立评级**。

| hits 数（q1-q4 中 true 数） | 推断 strength |
|---|---|
| 4 | ★★★ |
| 3 | ★★☆ |
| 2 | ★☆☆ |
| 1 | ☆☆☆ |
| 0 | null |

**禁止行为**（R3-11 实际违反案例）：

- ❌ 豆包 `new='★★★'` 但 pcb.js 实际 hits=3 → 拒绝采纳，按 hits 数推断 ★★☆
  - 实际案例：002436 兴森 / 688183 生益电子 / 688630 芯碁（豆包 new 错误升 ★★☆→★★★）
- ❌ 豆包 `current='★★★'` 但 pcb.js 实际字段是 ★★☆ → 按 pcb.js 实际值，不采纳豆包 current
  - 实际案例：豆包 7 处 current 字段标错

**正确做法**：

- ✅ 豆包只负责核实事实真/假（q1=true/false、broker 来源、原文数据）
- ✅ `strength` 字段由 CC 按 pcb.js 实际 hits 数推断，**不采纳豆包 strength 字段值**

**豆包返回数据自检清单**（CC 注入前必做）：

```
□ 1. 豆包 current 字段值与 pcb.js 实际是否一致？
□ 2. 豆包 new 字段值是否基于 hits 数正确推断？
□ 3. 豆包 verification_type 是否区分"同口径订正"vs"口径不同"vs"维持"？
□ 4. 豆包 broker_sources 是否真独立（≥2 源·非同一信源转载）？
□ 5. 找到 ≥2 独立源 → q1note 加 broker 来源并去 ⚠️
□ 6. 找不到 ≥2 独立源 → 维持 ⚠️单源 + 加注原因
```

**自检实现参考**：[pcb-r3-11-verify-content.js](.claude/scratch/pcb-r3-11-verify-content.js)（R3-11 用 Node + `String.includes` 做 12 处字段自检）

### §6.4 strength='★★★(q1⚠️)' 标注形式的适用范围

**仅适用于 R3-10 新注入的 4 只 q1 单源 stock**：002443 金洲精工 / 002436 兴森科技 / 688183 生益电子 / 688630 芯碁微装。

核实后 strength 字段处理规则：

| 核实结果 | strength 字段处理 |
|---|---|
| q1 真（broker 第二源支撑） | `strength='★★★'` 保持不变（去掉 ⚠️ 标注）|
| q1 假（broker 证伪） | strength 降级（如 ★★★→★★☆）+ note 同步反映新状态 |
| 仍找不到 broker 第二源 | `strength='★★★(q1⚠️)'` 让字段本身可见 |

**不适用**于 R3-9 留下的 A2 的 8 处 ⚠️单源 标注（超华/东材/圣泉/世名/菲利华/铜冠/鼎泰/景旺），它们的 strength 按各自 hits 数推断维持，**不**向 strength 字段加 ⚠️ 标注——按 §6.3 核心约束，外部信源不独立评级。

**这条约束的核心**：strength 字段不能独立于 q1 真假状态存在，否则会出现"strength 显示 ★★★ 但 q1 实际待核"的字段矛盾（违反 §5 交叉验证门槛）。

## §7 混淆类型（数据准确度新风险类型·R3-13 增补）

> 本节是 §6.3 strength 字段硬约束的姊妹节，处理"数据准确度新风险类型——混淆"（R3-13 P0 景旺品类混淆发现）。
>
> 来源链：pcb R3-13 commit `e5584ab`
>
> **三处文档 cross-ref**（与 §6 同模式）：
> - **CLAUDE.md §6** · 顶层治理纪律
> - **SKILL.md §6 + §7（本节）** · 操作规则
> - **refresh-sop.md §6.5** · 流程位置

### §7.1 主体混淆（subject confusion）

- **表现**：把公司 A 的数据当成公司 B 的数据
- **案例**：大族激光 / 宏华数科（典型主体混淆案例）
- **严重性**：极高（数据完全不可用）
- **修复**：重新核实公司主体，明确是公司 A 还是公司 B 的数据

### §7.2 数据品类混淆（product category confusion）★ R3-13 新发现

- **表现**：同一公司内部不同产品品类/产品线的数据搞混
- **案例**：景旺 603228 R3-11 note "单源正交背板 25%+ 份额" 实际指 **Switch 板 20-25%**（品类归属错位）
- **严重性**：中（数据可用但分类错）
- **修复**：
  1. 拆分混淆的品类各自核实真实份额
  2. broker 双源验证
  3. note 字段按品类分别标注来源

### §7.3 概念混淆（concept confusion）

- **表现**：不同概念/术语的数据混用
- **案例**：（待增补）
- **严重性**：（待增补）
- **修复**：（待增补）

### §7.4 混淆性质判定流程（CC 必走）

1. **是不同公司** → §7.1 主体混淆
2. **是同一公司不同产品** → §7.2 品类混淆
3. **是同一产品不同概念** → §7.3 概念混淆
4. **修复时按各自流程处理，不得混用**

## §8 Stock 双重检查流程（pre-flight-check + hallucination-screen）

**触发场景**：任何 P1 数据刷新 / trend 推断 / R3-X 阶段任务开始前。

### §8.1 双重检查必要性

§6.3 外部信源不独立评级 + §6.4 ≥2 独立来源 + §6.8 数据准确度优先 → 三条原则要求"任何 stock 操作必须先做上市状态预检 + 豆包返回幻觉筛查"，因为：

- 已退市/停牌 stock 不应有 2024-2026 新事件披露（豆包容易幻觉）
- 正常存续 stock 的豆包返回也可能有"看似合理但实际编造"的事件（豆包幻觉不限于退市 stock）
- §6.7 失败教训归档规则要求"防止重犯"——本次超华事故双重检查机制即为此设计

### §8.2 Step 1 · 上市状态预检（pre-flight-check.js）

**脚本路径**：`.claude/plans/tools/pcb-pre-flight-check.js`

**触发时机**：任务开始前必跑。

**输入**：动态提取 pcb.js 中所有 stock code（segments + midstream + fourQuestions 三路径）。

**检测规则**：
- ANOMALY_PATTERNS 正则覆盖：退市/停牌/已退/ST/暂停上市/delisted/suspended
- 扫描字段：position/note/q1note/q2note/q3note/q4note/logic/src/trendNote/dims6Note
- 跨段对比是否一致（如 segments 段 vs fourQuestions 段对同一只 stock 状态描述矛盾）

**输出**：
- 动态提取 stock 总数
- 异常 stock 清单（如有）
- 写入 `.claude/scratch/stock-status-report.md`（临时报告，不入 git）

**异常处理**（4 选 1，需用户显式确认）：
- A · 从所有 segment 删除该 stock
- B · 标注退市 + barrier trend 改为 'n/a'
- C · 暂存待用户决策
- D · 用户手动核查后决定

### §8.3 Step 2 · 豆包返回幻觉筛查（hallucination-screen.js）

**脚本路径**：`.claude/plans/tools/pcb-hallucination-screen.js`

**触发时机**：每次豆包返回后必跑。

**输入**：豆包返回的方案 G 7 段式文本 + stock code + stock name。

**4 层防御**：
| Layer | 检测 | 严重度 | 计入 score |
|---|---|---|---|
| L1 退市窗口 | 已退市 stock 不应有实质性事件 | ❌ 严重 | 10 |
| L2 事件密度 | 总事件数 >15 警告 / >20 严重；单段落 >5 警告 / >8 严重 | ⚠️/❌ | 3/10 |
| L3 数字可验证性 | 数字未在 pcb.js 中佐证 | ⚠️ 参考 | 不计分 |
| L4 客户名可验证性 | 客户名未在 pcb.js 中出现 | ⚠️ 参考 | 不计分 |

**判定规则**：
- risk score >= 10 → ❌ 强烈疑似幻觉，禁止采信
- risk score 5-9 → ⚠️ 部分可疑，需人工核查
- risk score < 5 → ✅ 通过（Layer 3/4 findings 仅作参考，不强制复核）

### §8.4 阈值校准约定

**阈值暂不调整**：警告 15 / 严重 20 / 单段落警告 5 / 严重 8 这组阈值只在超华 1 个案例上验证过有效性。

**校准触发条件**：
- 后续 P1 批 2-7 实际跑起来积累 ≥5 个正常对照样本 + ≥1 个异常对照样本后
- 若误报率 >20% 或漏报率 >10%，重新评估阈值
- 校准需用户授权，不擅自调整

### §8.5 双重检查与单一检查的差异

| 情况 | 单一检查结果 | 双重检查结果 | 后续操作 |
|---|---|---|---|
| pre-flight ✅ + hallucination ✅ | ✅ 通过 | ✅ 通过 | 可采信 |
| pre-flight ✅ + hallucination ❌ | hallucination 失败 | ❌ 阻断 | 不采信，需人工核查 |
| pre-flight ❌ + hallucination ✅ | pre-flight 失败 | ❌ 阻断 | 异常 stock，需用户决策处理方式 |
| pre-flight ❌ + hallucination ❌ | 两项都失败 | ❌ 阻断 | 必须先处理 pre-flight 异常 |

**核心原则**：双重检查必须都通过，任一失败即阻断数据操作。

### §8.6 失败案例归档

按 §6.7 规则归档每次发现的幻觉事件/异常 stock。归档路径：
- 异常 stock → `.claude/plans/lessons-learned-YYYY-MM-DD-<事故简称>.md`
- 幻觉事件 → 追加到当前 lessons-learned 或新建 lessons-learned 文件

## TIER_RULES（信源四档·硬规则化）

> 本节为《数据治理规则》§1 的硬规则化。**所有"会变的事实"在写入 `data/<id>.js` 之前必须按本节定 `tier` + `src` + （估值类）`asOf`**。代码层 `SOURCE_TIERS` 四档（`index.html` line 678-683）+ `sourceTierBadge(tier, src)` 渲染助手（line 687-693）负责落实，4 处渲染点（overview / supplyGap / chokePoints.valuation / prosperity.dims）已挂角标。

### 4 档定义

| tier | 图标 | 含义 | 适用 |
|---|---|---|---|
| **primary** | 🟢 | **一手** | 财报 / 公告 / 交易所 / 巨潮 cninfo |
| **broker** | 🔵 | **券商·权威** | 券商研报 / Prismark / 行业协会 / TrendForce / CPCA |
| **media** | ⚪ | **自媒体（存疑）** | 股吧 / 财富号 / 雪球 / 转发 |
| **estimate** | 🆪 | **AI 推断** | AI 主观/测算（六维分、估值分位、卡口强度等）|

### 硬规则（缺一不可）

1. **关键数字（市占率 / 缺口率 / CAGR / PE 分位 / 产能 / 财报）若仅 media 单一来源 → 必须标"存疑(待核)"或降级表述**，**不得当事实陈述**。
2. **CC 永远不得自行编造或"估算" 财报、市占、缺口、产能、价格。** 联网搜不到 → 标 `estimate` / 待核 或保留旧值+日期，**绝不填一个看似精确的数字**。
3. **primary 类（财报/估值）只能来自一手来源**（巨潮 cninfo / 上交所 / 深交所 / 公司公告），**禁止用训练知识填当期数据**。
4. **所有估值/PE 数据必带 `asOf` 字段**（`YYYY-MM-DD` 字符串）；`chokePoints[].valuation.asOf` 与 `stock.valAsOf` **缺一不可**。
5. **🆪 AI 主观判断**（六维评分、估值分位、卡口强度、verdict.oneLine）一律标 `tier: 'estimate'`，**不刷 Header "数据截止" 日期**。
6. **关键数字优先 ≥ 2 个独立来源**；一手（财报）单源即可信；仅 media 单源 → 存疑。
7. **缺 `tier` 字段**的旧数据点 → `sourceTierBadge` 返回空字符串，向后兼容（不强制补 tier）。
8. **重大风险**（实控人被查 / 减持 / 诉讼 / 订单不及预期）→ `tier: 'primary'`（公司公告），与卡口数据同源即可。

### 4 处必标 tier 的渲染点（已落实）

`sourceTierBadge` 在以下 4 处挂 tier 角标；新增数据点时按字段类型选 tier，缺省时返回空串、向后兼容：

1. `overview[]` 卡片数值旁（`index.html` line 991）
2. `supplyGap[]` 行末（line 1485）
3. `chokePoints[].valuation` 行末（line 1432）
4. `prosperity.dims[]` 每维 + 同步反映到 `stockDims6Badge`（line 885）

## 数据手动刷新（升级八 STEP 3 + 升级九 STEP 4 后）

> **执行本节流程前，必须先读上方《数据治理规则》**（信源分级 / CC 不许造数 / 联网失败时保留旧值不假装刷新等硬约束）。本节是操作流程，治理规则是底层纪律。

**升级八 STEP 3 把"cron 周一自动刷"改为"用户手动按钮触发"**，理由：cron 会自动给所有赛道刷一遍（包括用户当前不关心的），token 浪费严重；改为按钮后用户只刷想看的那条，节省 token 且更可控。

### 触发方式

**首选**：浏览器侧栏每条赛道 nav-item 右侧的 🔄 按钮 → 点击弹 modal → 复制 modal 里**预生成的完整研究指令**（含 200+ 研报硬性要求 + PCB 同款结构 + 写回 `data/<id>.js` 指令）→ 粘贴到 Claude Code 让 Agent 跑。

**手动触发**（备用）：
- 用户直接说"刷新 PCB" / "全量研究刷新 PCB" / "/serenity --refresh pcb"
- 触发后走「模式 2：刷新现有赛道」5 步流程（深度搜索 → 四问筛选 → 数据结构化 → 注入替换 → 验证）

### 刷新流程（Claude Code 端跑）

1. **搜索最新数据** — WebSearch ≥5 次，覆盖：
   - 宏观数据：市场规模、国产化率、增长率
   - 个股业绩：最新季度营收/净利润/同比增速
   - 重大事件：认证进展、产能投产、大客户变化
   - 关键数据 ≥2-3 独立信源交叉验证；研报等效参考 ≥200 篇

2. **对比变化** — 与现有 `data/<id>.js` 数据对比：
   - 变化 <5%：不更新（避免无意义刷新）
   - 变化 5-15%：静默更新数字
   - 变化 >15%：**高亮标记** `<mark class="updated">` + 变化幅度徽章
   - 基本面重大变化：**整行高亮** `class="major-change"` + 追加说明

3. **高亮样式标准**（不变）：
   - 数据值变化 >15%：`<mark class="updated">新值</mark><sup class="change-badge up">📈+XX%</sup>`
   - 数据值下跌 >15%：`<sup class="change-badge down">📉-XX%</sup>`
   - 个股基本面重大变化（认证/产能/客户）：`<tr class="major-change">` + 逻辑列追加 `⚡【更新：XXX】`
   - 高亮保留一周，下次刷新该赛道时去除旧高亮再加新高亮

4. **写回 `data/<id>.js`** — 升级九 STEP 4 后赛道数据**一律**在 `data/<id>.js`（IIFE 内的 CHAINS.<id> 对象）；不再改 `index.html` 主 script 里的数据（已外置）。

5. **更新 Header 日期** — `index.html` 顶部"数据截止：YYYY-MM-DD"改为当天（**注意**：这一项仍在 index.html 内，不在 data/<id>.js 内）。AI 主观判断（六维分 / 周期位置）标 🆪、**不刷日期**。

6. **验证** — 走「## 新赛道 SOP（第三层）· Step 5 验证」的命令（`data/<id>.js` 独立加载 + 主 inline script JS 自检 + 浏览器测试），通过后报告改动清单、等用户说"通过"再 `git commit + push`。

### Token 参考

| 刷新类型 | Token 量级 | 备注 |
|---|---|---|
| 单条赛道全量刷新（200+ 研报硬性要求） | ~500K - 1M tokens | 升级八 STEP 3 commit message 估算 |
| 单条赛道轻量刷新（仅改财报数字 + 高亮）| ~30-50K tokens | 不含新研究、不重排 stocks |

### 已废弃

- ❌ **cron 周一自动刷**（升级八 STEP 3 前用过；按钮化后废弃。当前 `CronList` 应为空）
- ❌ **`/serenity --update` 自动触发指令**（同上，按钮化后没有自动触发的语义）
- ❌ **diff -q 双文件同步**（升级九 STEP 4-2 后 `产业链全景.html` 是跳转页）

## 数据质量关卡 v2（Quality Gates）

> **适用场景**：新建 / 刷新任何赛道，**判"完成"前必过 G0–G7**。任一关未过 → 标"草稿/待完善"，不得当完整链。
> **v1 复盘根因**：守门只挡"坏数据"不挡"缺数据"；六维🆪主观分无方向校验；先建后审。
> **v1→v2 新增根因**：模板复制的是 PCB 的"长相"，复制不了把它填准的那轮联网核实——CC 不能联网时，"严格按步骤"只保证格式纪律，不保证**覆盖**（每只都核了）和**判断**（六维方向对不对）。
> **角色分工**：CC 搭架子 + 守门 + 机械自检；联网端（Gemini / 带搜索的网页版会话）跑量查数；复查端做语义 QC；用户拍板"通过"。**唯一不能省的是"复查"**。
> **可机械自检**：G0 / G1 / G3结构部分 / G6 DoD / G7（CC 离线脚本）；G3方向语义 / G4 / G5 需联网端或复查端判定。

### G0 清单自检（CC 出待核清单后，发给联网端前）

CC 出完《待核清单》后自问：
- "如果这份清单 100% 被填满，六维（durability / visibility / policy / supply / valuation / barrier）里哪一维最可能仍是'有🆪分但无财报支撑'？"
- "哪个环节 / 标的最可能查不到一手数据、需要靠推算？"

在清单末尾追加【重点核查标记】小节，列出高风险维度 + 高风险环节 / 标的，标 `[高风险]`。

清单出完先扫一遍下方【六维反向陷阱清单】，命中场景的环节同步标 `[高风险-方向]`。

**缺这一节 = 清单不完整，不得发给联网端。**

### G1 覆盖率关（CC 离线机械自检，两个数字）

- **一手覆盖率** = `dims6Note` 含"**具体财报数字 + 报告期 + [来源]**"的个股数 / 总个股数
- **推算占比** = `dims6Note` 标 `⚠️推算非披露` 的个股数 / 总个股数

一手覆盖率不到 **100%** → **列出缺数据个股清单**，缺的票注释开头标 `⚠️财报待核`。
推算占比 **>30%** → 该链不得直接判"完成"，需在复查阶段对高推算占比的维度 / 环节做专项核对。

**合格财报注释** = ≥1 个带单位财务数（营收 / 净利 / 同比）+ 报告期 + tier。**纯 🆪 理由不计入一手覆盖率，禁止用打分理由顶替财报。**

### G2 个股注释分层

- `dims6Note` 须区分两层：
  - ① **财报事实**：数字 + 报告期 + 来源 + tier（🟢 primary / 🔵 broker）
  - ② **打分理由**：🆪 AI 主观评估
- **无 ① 者注释开头标 `⚠️财报待核`**，防止"有注释"被当"有数据"

### G3 六维方向关（CC 做结构检查，方向对错交复查端最终把关）

**CC 守门职责（结构性，不判断对错）**：
- 检查每个 `dims6` 维度的 `reason` 是否带一句现实依据（不能是空泛形容词）
- 检查方向是否有 `evidence` / `src` 支撑，不是裸结论
- 没有依据的条目 → 打回重填，**不进入复查**

**复查端职责（语义判断，最终把关）**：
- 对照下方【六维反向陷阱清单】核对方向语义：
  - `supply`：供不应求 → 高分；过剩 → 低分
  - `valuation`：**5 = 最便宜（方向翻转，CC 建链时最容易写反，复查必查）**
  - `durability / visibility / policy / barrier`：高分 = 好
- 命中陷阱清单场景的维度，**必查不可跳过**

**CC 仅凭推断给的方向性分须标 `🆪待人工确认`**。

#### 六维反向陷阱清单（持续累积，每条链 commit 后回填）

> 格式：维度 | 陷阱描述 | 来源链 | 正确判断要点

（持续累积中。每条新链 commit 后由复查端追加一行，按 commit 时间从新到旧排列在表头）

| 维度 | 陷阱描述 | 来源链 | 正确判断要点 |
|---|---|---|---|
| `durability/visibility` | **多业务板块公司**整体业绩(营收/归母)亏损时,不能直接映射为目标产业链相关板块的景气方向。某板块(主业)亏损可能完全由另一个非相关板块拖累(新能源/汇兑/补贴/诉讼等),目标板块景气可能仍然上行。**dims6 方向判断时必须按"目标产业链板块"独立判断,不能套用公司整体财报**。 | `liquid-cooling`(博威合金 601137:26Q1 整体归母 -9135.98 万 主因是新能源板块单季亏 1.59 亿(汇兑+美国联邦补贴失去),液冷相关铜合金散热新材料在 2025 年报中描述为正增长 → dims6 不应把整体亏损映射为液冷散热景气下滑) | 查公司 25 年报"分业务收入"段,识别目标产业链板块的实际营收/毛利同比;若公司未拆细,标 ⚠️G3 方向提示,不强行映射 |
| `position/logic 描述` | **绝对化表述("独家"/"唯一"/"100%"/"全部")**即使来自 ≥2 独立来源,也极易是财经媒体口径放大,**与"主流地位/核心供之一/占据 X 主流份额"这类保守表述对立**。典型场景:某客户(英伟达/台积电)某核心模组的供应商,实际格局 2-3 家分单,但 A3 收到的初稿常出现"A 独家供应"等绝对化。**注入前必须:① 复查 ≥2 源是否真为"独家"表述(非"主供之一"被夸大);② 与同段其他股票自查口径是否打架;③ 不达标则改 "核心供之一(与 X/Y 等共垄断)"。** G0 必查项,标 `[高风险-绝对化]`。 | `pcb`(2026-06-16 seg[6] 5 只票 position+logic 注入:沪电"GB200独家" / 景旺"高阶HDI行业唯一" / 胜宏"GB300 OAM独家" 3 个 A2 初稿同病,经 A3 一次打回+A3 二次复查全部软化为 "核心供之一" / "国内少数突破" / "核心供应商" 才注入) | position 写"主供/核心供之一/占据 X 主流份额",logic 配套写"与 X/Y 等共同供应/共垄断"(若确实 ≥2 源支撑独家,可保留但 tier 必须 primary);绝对化未达 primary 支撑前一律软化 |

### G4 先查后注（三档输出，替换原二档）

新增链 **CC 只产"结构骨架 + 待核个股清单"**，数据默认未核；联网端核实出注入块后再注入，**严禁先建满数据再审**。

联网端对清单每条**显式标档位**，落入三档之一：
- **① 直接命中**：数据 + 来源 + tier
- **② 待补**：检索范围内未找到，`dims6Note` 留空 / 标"待核"
- **③ ⚠️推算非披露**：无直接披露但可拼接推算，必须同时给出推算结果 + `⚠️推算非披露` 标记 + **推算逻辑**（用了哪些数据、如何组合）

③档不允许只给结论不给推算逻辑；不允许混入 `tier: 'estimate'` 而不加 ⚠️ 标记——⚠️ 优先级高于 tier 分类。

CC 注入时看到没标档位的条目 → 打回联网端重做，**不自行补标**。

**CC 搭完结构 ≠ 链完成**。

#### G4 ④档：akshare 直接拉取（财报 A 类，最高优先级，优先于联网端）

> **定位**：A 类数据(财报 5 项)有一类**机器可读、零人工复查**的来源——CC 端本机用 akshare 库直接拉取 A 股标准财报字段,不经过联网端(Gemini/DeepSeek),不需要人工复查确认。**比联网端三档更优先**(A 类数据默认走本档,只有 akshare 拉不到时才降级到联网端 ①/② 档)。

**适用字段(财报 A 类 5 项)**：
- 季报营收(¥ 精确到万元) + 同比(%)
- 季报归母净利润(¥ 精确到万元) + 同比(%)
- 季报毛利率(%)
- PE-TTM 当前值(倍) + valAsOf
- PE 历史分位(近 3 年自算) + asOf

**标注规范**：
- tier: `primary`
- src: `"akshare/新浪财经(基于公司季报)"`
- asOf: 季报**实际披露日**(从 akshare 返回数据取,不用固定日期)

**特殊情况**：
- 亏损期 PE 为负 → 标 `"PE-TTM 失真(亏损期)"`,分位不填
- akshare 返回空/报错 → 标 `"②待补(akshare 无数据)"`,**不编造**
- 数据停留在旧报告期(如仅到 2024Q3) → 标明报告期,**不强行用旧数据**

**调用示例**：
```python
import akshare as ak, time
df = ak.stock_financial_report_sina(stock='600183', symbol='利润表')  # 利润表
df_pe = ak.stock_zh_valuation_baidu(symbol='600183', indicator='市盈率(TTM)', period='近5年')  # PE-TTM
time.sleep(1)  # 每只票之间必须 sleep(1) 避免被封
```

**使用边界**：
- 仅适用于**财报 A 类 5 项**;B 类数据(市占率/卡口依据/六维 reason/国产化率/排名)仍走联网端 ①/② 档
- akshare 拉到的字段**不需要**走 G7 复查优先级——属于机器直读,信源可信度等同 primary
- 注入后报告"X/Y 只个股 A 类数据已通过 akshare 补全"+ G1 覆盖率自检

**首次确立**：`pcb` 2026-06-17 第三步 35/35 全字段完整(全部经 akshare 直拉 24 只新注入 + 11 只 PE 补全,0 编造,5 只 PE 失真诚实标注,1 只 002288 ②待补)。

#### G4 口径防串补充（持续累积）

> 联网端容易混淆的"同形不同义"指标，注入前必须先在 G0 清单中标 `[高风险-口径]`，复查端按 G7 优先级第 5 类扫读时重点核对。

- **「成本结构占比」≠「国产化率」**：成本结构占比 = 某环节成本占总成本比例(液冷板 32% / 快接 28% / CDU 25% / 管路阀门 10% / 冷却液 5% 等),反映的是 BOM 价值分布,不能直接推算"该环节有多少比例是国产的"。分环节国产化率类指标(氟化液国产率/CDU 国产率/快接国产率等)需要 ① 国产销售额 / ② 国产销售额 + 进口销售额 两者直接披露。**联网端若只给成本结构占比,不能强行 ③ 推算国产化率,标 ②待补**。
  - 来源链:`liquid-cooling`(2026-06-15 第 4-2 轮 Gemini 端仅查到冷板式液冷系统成本结构占比(液冷板 32%/快接 28%/CDU 25%/管路阀门 10%/冷却液 5%),主动拒绝按此推算 5 项分环节国产化率 → 5 项全②待补)

- **「市占率档伪造」(③档伪装成推断)**：Gemini 端倾向把"产能规划/历史份额/IDC 排名/TrendForce 历史基数"包装成 ③⚠️推算非披露,实际是**假设**,不是推算。**规则**:真推算必须基于"两个独立披露的具体数字 + 数学组合",如(已知 A 厂商产能 + 已知总产能)→ 市占率;不能基于"未来规划+历史基数"或"行业经验+主观推算"伪装。**典型伪装模式**(本次液冷 P0-1/P0-3 全中):
  - "产能规划及规模领先 → 市占第一"(规划是规划,实际是实际)
  - "IDC/赛迪报告市占率超三成的历史基数平移"(假设格局未变)
  - "新华三 ICT 综合份额平移 → 液冷份额"(两件事)
  - "批发型 IDC 园区规划机柜数 + 100% 液冷渗透率目标"(规划不是交付)
  - "海外龙头垄断 90%+"(无来源的笼统数字)
  - 来源链:`liquid-cooling`(2026-06-15 P0-3 Gemini 端 21 只票 7 只标③档,其中 5 只推算逻辑属此模式 → 整体拒绝注入,21/21 守门失败;P0-1 midstream 10 只 5 只同模式 → 整体拒绝);**联网端遇到此类③档必须降级为②待补**,除非能给出两个独立披露数字 + 推算公式。

- **「公开数据稀缺区」细分材料市占率类指标**(氟化液/电子特气/光刻胶/电子化学品等):企业年报+调研纪要普遍不披露精确细分占比,**属公开数据稀缺区**。**联网端查证顺序**(必查,查不到才标②待补):
  1. **行业协会**(CPCA / 中国氟硅有机材料工业协会 / SEMI / Prismark 等专项报告)
  2. **Choice / Wind / iFinD 专项数据库**(行业板块拆分,不是公司层面)
  3. **券商深度报告**(中信/华泰/海通/招商等,通常引用协会数据)
  4. **企业公告**(年报+调研纪要,**已确认此类指标披露率极低,不优先**)
  - 来源链:`liquid-cooling`(2026-06-15 P1-3 批次 1,5 家氟化液头部公司年报+调研+巨潮+Choice 全部确认无一手披露 → 5/5 ②待补);**后续涉及此类指标默认标 `[高风险-口径]`,联网端必须按 1-2-3 顺序查证,不要在企业公告阶段就标②待补**;仍查不到再②待补。

- **「时序错」(历史参考数据伪装成最新数据)**：当原始来源明确写的是"2025Q1"/"2024 全年"/"截至 X 日"等历史口径数据,**不要因为"当前已是 2026 年"就把年份改成 2026Q1/最新一期**。**这是把"历史参考"伪装成"最新数据"**,会让读者误以为是当下时点状态。**正确做法**:① 保留历史年份+报告期(如 "2025Q1 英伟达订单占比超 70%(历史参考数据)");② 显式标 ②待补("2026Q1 最新占比 ②待补")让读者知道缺口;③ 严禁不查实就改年份。
  - 来源链:`pcb`(2026-06-16 seg[6] 胜宏科技 300476:A3 一次打回要求"2025Q1 → 2026Q1",Gemini 二次修正拒绝改年份(理由:原始来源明确 2025 一季度,改年份构成编造),改为 "2025Q1 历史参考 + 2026Q1 ②待补" → A3 二次复查加分通过)→ **A3 复查端遇到此类诉求应反问"原始来源写的是哪一年",若 Gemini 无法证实是最新数据,保留历史口径+显式标②待补,不要为了"显得更新"而改年份**。

- **「单源工艺/产能数字」**：具体工艺参数(良率 95% / 镀层厚度 / 线宽线距)或具体产能数字(年产能 X 万平米 / 单月出货 Y 万片),即使来源看似正常的财经媒体/财富号,**极易是单源**——这种粒度数字公司公告/研报极少披露,媒体常从推算或单篇研报转引。**注入前必须**:① 复查 ≥2 独立源;② 单源则整段删除(不写 logic 也不写 position),**不要降级保留**——具体工艺数字保留单源比删除更危险(给读者"已核实"假象);③ 若实在需要写,加"据 X 研报口径"或"具体口径仅见单一媒体源,待核"限定。
  - 来源链:`pcb`(2026-06-16 seg[6] 胜宏科技 300476 A2 初稿 "24层HDI良率95%" 单源工艺数字 → A3 一次打回 → Gemini 二次修正整段删除(不保留)→ A3 二次复查通过;**典型反例:景旺"正交背板 25%+份额"也是单源,但因"研发标"本身有 ≥2 源支撑,保留事件+份额数字本身删+标"具体份额口径仅见单一媒体源,待核"**)。

- **「市占率/排名类数字时序陷阱」**：市占率/全球排名数字**即使来自 Prismark / Frost & Sullivan / CPCA 等权威机构,也必须核对"数据对应年份"**——行业排名年年都有更新,1-2 年前的"全球第一"今天可能已不是。**常见时序错形态**:① 标"全球第一·市占 26.5%"但实际是 2023 年数据,最新一期是 26.8%(2024)/28.9%(2025H1);② 标"国产市占 70%"但年报披露时点已超过 1 年,数字仍用旧版;③ 同段两只票市占数字时序不一致(A 用 2024,B 用 2023,合计数字失真)。**正确做法**:① position/logic 写市占率时**显式带年份**(如 "2024 年市占 26.8%/2025H1 进一步提升至 28.9%(Frost & Sullivan)");② 联网核实优先查**最新一期**行业协会/调研报告(Prismark 每季度更新 / Frost & Sullivan 年报更新);③ A3 复查遇到"市占数字无年份"应反问"原始来源是哪一年",若 Gemini 无法证实是最新数据,显式标 `⚠️时序已更新` + 旧数 → 新数。
  - 来源链:`pcb`(2026-06-16 seg[5] 鼎泰高科 301377 A5 联网核实:原"PCB钻针全球第一·市占26.5%"实为 2023 年 Prismark 旧数据,最新为 2024 年 26.8%(年报) / 2025H1 28.9%(港交所招股书·Frost & Sullivan) → 已更新为最新 + 加 `⚠️时序已更新` 标注 → 这是**PCB 黄金范例自身的第二个时序陷阱案例**,第一个是 `pcb-gap-report.md` 中的 2025 净利预增(鼎泰/大族)/2026Q1 预增(嘉元)类)。**G4 时序错陷阱的延伸**:历史参考数据伪装成最新数据(报表数字类)+ 旧年度市占率被当成最新数据(行业排名类),两者都是"时序错",但前者易识别(数字 2025Q1 字样),后者难识别(协会数字常不带年份,易混)。

- **「PE-TTM 失真处理」**：亏损期/微利期 pe_ttm 会出现**极端值**(负数或 |x|>10000),直接展示会误导读者,且**分位计算仍应保留**(基于历史序列本身,不是当期值)。**正确做法**:① 判 `pe_ttm < 0 or |pe_ttm| > 10000` → `pe_ttm = null` + 设 `pe_distorted: true` + 写 `pe_distorted_reason`(如 "亏损期"/"26Q1 归母-3.4 亿"等具体原因);② `pe_percentile_3y` 仍保留(基于历史 PE-TTM 序列在近 3 年的分位,跟当期 pe_ttm 是否失真无关);③ 渲染 dim.估值时展示 `pe_ttm='PE-TTM 失真(亏损期)'` 而非空白 + 显示失真原因,不参与打分。**G0 必查项,标 `[高风险-PE失真]`**。
  - 来源链:`optical-chip`(2026-06-17 A1.5 27 unique akshare 批量:3 只 PE 失真(688498 源杰 26Q1 归母 -1880 万 / 688498-seg1 长华 26Q1 归母 -1305 万 / 300570 太辰光 26Q1 归母 -71.1 万微利接近 0)→ 3/27 全部设 pe_distorted=true + percentile 保留 + 渲染时显式标"亏损期"原因 → A3 复查通过无异议;**典型反例:若直接把 pe_ttm=null 且 percentile 也清空,会丢维度评估依据(3 年分位本身是独立指标)**)。

- **「B 类 media 单源分流处理」**：media 单源字段**一刀切 ②待补**会损失有定性价值的客户/合作类数据。**正确做法**:**按字段类型分流**——① **客户/合作类(定性)**:即使 media 单源,仍保留 ①档 + 加 ⚠️注脚(如"⚠️客户类,media 单源,具体客户名待核")+ feedsChoke=true(定性的客户参与感对卡口逻辑有用);② **份额/产能/政策类(定量)**:media 单源必须降 estimate+🆪 + feedsChoke=false(定量数字不参与卡口/prosperity 打分);③ 注入时用 `tier: 'media'` + `flag: '⚠️存疑'` 标识,渲染时按 tier 决定是否展示角标。
  - 来源链:`optical-chip`(2026-06-17 A2 Gemini 端 B 类 38 条注入:9 条存疑按 B 方案分流——5 条客户/合作类(中际旭创 1.6T 量产口径/天孚通信 CPO 合作/新易盛 800G 出货/光迅科技 800G 份额/源杰科技 激光器芯片)保留 ①+⚠️注脚+feedsChoke=true;4 条份额类(中际旭创 800G 出货份额/长光华芯 高功率 VCSEL 份额/三安光电 LED+激光器综合份额/华工科技 激光器设备份额)降 estimate+🆪+feedsChoke=false → 4 份额类不参与卡口/prosperity 打分 → A3 复查通过无异议;**典型反例:9 条全 ②待补 会丢 5 条有定性价值的客户参与感数据;9 条全 ①会混入 4 条无出处的份额数字污染卡口**)。

- **「推算 ③ 字段 feeds* 永 false」**：推算类 B 字段(产能口径推算 / 历史基数平移 / 假设性 ③)即便**有推算依据**也不能流入卡口/prosperity 打分,否则会**用假设污染定量打分**。**正确做法**:① 推算字段 `tier: 'estimate'` + `flag: '③推算'` + 必带 `note` 写推算逻辑;② **`feedsChoke: false` + `feedsProsperity: false` 必设**(永 false,不进入打分通道);③ 渲染时折叠显示"推算依据"让用户可核查,但**不算入任何计算**。**G0 必查项,标 `[高风险-推算]`**。
  - 来源链:`optical-chip`(2026-06-17 A2 Gemini 端 6 条推算:永鼎 400G 光模块产能(规划+历史基数)/源杰-seg1 25G DFB 产能(规划+良率假设)/长华-seg1 高功率 VCSEL 产能(规划+扩产线)/中兴 硅光 PIC 产能(规划)/普源 高端示波器产能(规划)/鼎阳 高端示波器产能(规划) → 6/6 全部 feedsChoke/feedsProsperity=false,渲染时折叠显示"⚠️推算,基于 X 规划+Y 历史基数" → 不参与卡口/prosperity 打分;**典型反例:6 条全 feeds=true 会让"规划数"被当成"实际数"污染景气六维评估**)。

- **「跨段截断 ①同源 标位」**:同链跨段重复票(688498 在 seg0+seg1 / 000988 在 seg0+seg2+seg5 / 等)若用户未及时补完部分段位,会出现"某段缺数据,某段有数据"的空缺假象。**正确做法**:① bclass dict-keyed-by-`{code}-{segment}`,跨段重复时分别建 key;② 未补完段的 key 设 `flag: '①同源'` + `note` 引用同链其他段位(如 `note: '同源:688498-seg0 激光器芯片·已填'`);③ 渲染时按 flag 决定是否显示⚠️"此段沿用 X 段数据";④ **不要**把多段数据强行合并到一个 key(会丢段位语义)。
  - 来源链:`optical-chip`(2026-06-17 A4 注入:seg5 截断 3 段(300308 长芯科技/300502 新易盛/002281 光迅科技)用户明确"自己去补,先继续",3 段 bclass 全部 `flag: '①同源'` + `note: '同源:本票在 seg0/seg2 已有完整 B 类数据'` → seg5 渲染时显示"⚠️此段沿用 seg0/seg2 数据" → A3 复查通过无异议;**典型反例:3 段 key 直接删 → seg5 渲染会变 0 数据(更糟),或把 seg0 数据复制 3 份 → 段位语义丢失(更糟)**)。

- **「禁用源扫描·关键词不全漏变体」**:R3-6 prompt 禁用源清单的关键词(sina/xueqiu/toutiao/fxbaogao/hibor/akshare/eniu/eastmoney)用 OR 模糊匹配时,易漏**变体子域名**:caifuhao2.eastmoney.com(东方财富财富号子域)/vip.stock.finance.sina.com.cn(新浪财经 vip 子域)/bbs.xueqiu.com(雪球论坛子域)等。**正确做法**:① 不要用关键词模糊匹配;② 改用 `grep -E "https?://[^/]+/"` 提取所有 URL 的**完整域名段**(从 URL 起始到第一个 `/` 结束),逐条核对;③ 维护一个**完整禁用域名清单**(含变体子域),每个项目走 ①→②→③ 三道关:第一道按 R3-6 prompt 关键词 OR 匹配;第二道用 grep 提取完整域名段后逐条核对;第三道看域名是否属于"东方财富/新浪/雪球/今日头条/财富号/财富号 2"等品牌的所有子域(整品牌禁用,不仅是顶级域)。**G0 必查项,标 `[高风险-禁用源漏扫]`**。
  - 来源链:`pcb`(2026-06-20 R3-6 注入:用户先要求"按清单处理 17 处 + ST 超华 3 处 = 20 处",CC 处理 20 处后,用户再加问"全文件扫描变体域名(不只查 finance.sina.cn,查 vip.stock.finance.sina.com.cn 这类子域)" → 全文件 grep 全部 URL 后发现 **2 处遗漏**:line 35 caifuhao2.eastmoney.com(东方财富财富号子域)+ line 47/840 m.weibo.cn(新浪微博子域) → 总遗漏数 = 20+2 = 22 处,不是最初报告的 20 处;**典型反例:只按 R3-6 prompt 关键词 OR 匹配 → 漏 caifuhao2 / m.weibo 等子域 → 处理后用户再次扫描才发现遗漏 → 多一次往返**)。

- **「空 src + 已确认数据」的诚实标注**:某条数据 src 数组原本只有 1 个禁用 URL,删除后变 `[]`,此时如果 value/note 仍写得像已确认事实,读者会误以为"该数据已被核实"。**正确做法**:① src 变 `[]` 时,**必须**同步修改 note 加 `⚠️ 来源待核` 标注(注脚格式:`⚠️ 来源待核:原引用 X 不构成独立源,建议在 Y/Z 重新检索 ≥2 独立源`);② **不要**保留"已确认"语气(如"X 是 Y 龙头"/"X 占比 50%");③ note 中**显式说明**原 URL 是什么、为什么删除、应该去哪里补(给读者明确的检索路径);④ 同一条数据如果只删了部分 URL、仍剩合规 URL,src 数组留合规 URL,tier 保持不变(因为还有独立来源支撑);⑤ 同一条 URL 出现在多个位置时(如 m.weibo.cn 同一 URL 出现在 line 47 + line 840),**统一处理**(一处保留/一处删除会让数据呈现自相矛盾)。
  - 来源链:`pcb`(2026-06-20 R3-6 注入:line 35 caifuhao2.eastmoney.com 删后 src 变 `[]`,note 加"⚠️ 来源待核:原引用 caifuhao2.eastmoney.com(东方财富财富号)不构成独立源,建议在 CPCA / Prismark / cninfo 重新检索";line 47 m.weibo.cn 删后 src 变 `[]`,note 加类似标注;line 840 m.weibo.cn 删后 src 留 eet-china.com(合规信源独立支撑),tier 保持不变 → 3 处统一处理后,数据呈现一致(没有"已确认"假象也没有过度悲观);**典型反例:src 变 `[]` 但 note 不加 ⚠️ → 读者看到 `[]` 不知道是"没找到"还是"删除了"**)。

- **「全文件 grep 全部 URL」标准检查方法**:禁用源扫描**必须**走全文件 grep 全部 URL,不能依赖"按清单处理完就当完成"。**正确流程**:① 用 `grep -E "https?://" <file>` 列出**所有 URL**(含 src 数组/logic 文本/note 文本/value 文本);② 提取每个 URL 的**完整域名段**(`https?://[^/]+/` 模式);③ 逐条核对完整域名段是否在禁用清单(整品牌禁用,含变体子域);④ 报告 "0 残留" 或 "有 N 处新发现" → 等用户确认后才处理;⑤ **不要**"按清单处理完就 commit",必须等用户对全文件扫描结果的二次确认。**G0 必查项,标 `[高风险-扫描盲区]`**。
  - 来源链:`pcb`(2026-06-20 R3-6 注入:用户两次追加要求"全文件扫描特别关注变体域名" → 第一次扫到 ST 超华 3 处 + line 35 caifuhao2.eastmoney.com 1 处;第二次扫到 m.weibo.cn 2 处 → 整个 R3-6 清理流程累计发现 22 处,不是最初报告的 17 处也不是 20 处;**典型反例:17 处处理完就认为完成 → commit 后用户才发现还有遗漏 → 必须 revert 重做**)。

### G5 报告期时效

- 财报用"**当前已披露最新报告期**"（现 = 2026Q1）
- 搜到更旧报告期（如 2025 三季报）→ **继续找最新、不将就**
- 业绩预告 = `tier: broker` / 公告；正式季报出来后再升 `primary`
- 半年报 / 年报到期按 `refresh-sop` 流程刷新

### G8 PCB结构对齐检查（meta.status改 `active` 前必做，强制关卡）

> **触发时机**：新增链场景B第4步 / 刷新链场景A第4步，双校验通过后，**CC声明"完成"或将 `meta.status` 改为 `active` 之前**，必须先跑这一步。不可省略、不可凭印象判断"应该没问题"。
> **复盘根因**：液冷链曾出现"治理流程全部跑通(G0-G7) + 声明'整体收官'"，但实际 S4b/S4c/S5/S8 大量字段为空——**流程跑完 ≠ 数据齐全**。G8 是专门拦截这种落差的关卡。

**执行内容**（CC本地遍历对比，零成本，输出差异表，不传原始数据）：

对照本节「内容质量标准 S1–S10」+「验收清单」，对比 `data/<id>.js` 和 `data/pcb.js`，**只比字段结构（数量/是否存在/schema是否一致），不比数值内容**，输出两张表：

1. **主差异表**：逐项 S1–S10，标 PCB 范例值 / 当前链值 / 差距 / 严重度（严/中/软）。至少检查：overview 8-9卡+6类必含项；treeMap 5列+列名一致+sub-card数量；sub-card note 含占比+来源；segments≥6环节、每段stocks≥5；midstream.stocks≥10；每只股票position+logic非空泛；barrier降序；trend+trendNote覆盖率；chokePoints 的 valuation对象(含pePercentile+asOf+tier+src)+verification.items[4项]+tags+supplyGap；G1一手覆盖率/推算占比；logic是否自写。
2. **不达标项汇总**：每项不达标对应"页面哪个位置缺什么数据"，并按 P0(阻塞S5/S8) / P1(阻塞S4) / P2(其余) 分级，标工作量+阻塞性质。

**判定与后续动作**：
- **0个不达标项** → 可以声明完成、`meta.status: active`。
- **有不达标项** → `meta.status` **保持非 active**，note如实写差距摘要；差异表存入 `.claude/scratch/<id>-gap-report.md` 作为下一轮现成待核清单（G0已完成，下一轮免重新盘点）；CHANGELOG如实记录"结构对齐验证完成，数据密度待补"；是否立即补数据 / 暂缓 / 切下一条链，**由用户决策，不自动执行**。



链"完成" = 全部满足：

1. ✅ 对齐 PCB schema（S1–S10 全过，**以 G8 差异表"0个不达标项"为准，不得凭印象判断**）
2. ✅ G1 一手覆盖率 100%（或缺项已标 `⚠️财报待核`）+ 推算占比已知且 <30% 或已专项核对
3. ✅ G3 六维方向**已经复查端确认**（非 CC 自核）
4. ✅ `barrier` 降序未破（极高 → 高 → 中 → 低）
5. ✅ 双校验通过（node 加载 / 全链 14 赛道 / 浏览器抽查）
6. ✅ G7 复查已按优先级顺序走完
7. ✅ 复查纪要已归档（六维反向陷阱清单 / G4 推算提示已更新）
8. ✅ A 类数据 akshare 覆盖率：所有个股的 `dims6Note` 含季报 5 项(营收/归母/毛利率/PE-TTM/PE 分位),tier: `primary`,valAsOf 为实际披露日(亏损期/akshare 无数据的个股诚实标注,不强求 100% 填满)

**任一未达 → 标"草稿/待完善",不得当完整链。**

### G7 复查优先级标签（CC 注入时打标，复查端按序处理）

CC 给每个待复查条目打标签（取最高优先级）：

| 优先级 | 标签 | 判定条件 |
|---|---|---|
| 1 | `卡口` | `chokePoints` 相关条目 |
| 2 | `核心标的关键数` | segments 排名靠前个股的财务 / 产能关键指标 |
| 3 | `六维方向声明` | dims6 方向，尤其命中【六维反向陷阱清单】的 |
| 4 | `推算⚠️` | G4 第③档条目 |
| 5 | `背景信息` | 其余条目 |

**复查执行顺序**：按 1→5 处理，1-4 逐条核对，5 类批量扫读、异常才单独核查。省 token 约定（只读联网端提炼好的紧凑块、整条链一次过）配合本顺序执行，链再长也不会后段失焦。

### 复查纪要归档（commit 后必经，不可省略）

commit 完成后，复查端把本次实际抓到的问题**按模式**（不是具体修正值）写入：
- 模式="某类数据联网端倾向③档拼凑且容易被误判①档" → 追加到 G4 说明，标"此类指标强制走③档"
- 模式="某维度在某环节容易打反" → 按格式追加到上方【六维反向陷阱清单】

格式：`[YYYY-MM-DD | XX链commit] G3补充/G4补充：[问题模式] → [对后续链的约束]`

**这一步完成才算该链流程结束**；下一条链的 G0 会读取累积记录，关卡随链数增加而变严。

**累积索引**（按 commit 时间从新到旧）：

- `[2026-06-17 | optical-chip commit] G4补充:PE-TTM 失真(<0 or |x|>10000)→ pe_ttm=null + pe_distorted=true + reason,percentile 保留(基于历史序列本身)→ 后续 12 条链 A1.5 akshare 必判 pe_distorted 字段,渲染 dim.估值 展示失真原因不参与打分`
- `[2026-06-17 | optical-chip commit] G4补充:B 类 media 单源字段 → 客户/合作类(定性)保留 ①+⚠️注脚+feedsChoke=true;份额/产能/政策类(定量)降 estimate+🆪+feedsChoke=false → 后续 12 条链 B 类③档位判定按字段类型分流,不一刀切`
- `[2026-06-17 | optical-chip commit] G4补充:推算 ③ 字段(产能口径)→ tier:estimate + flag:③推算 + 推算依据 note + feedsChoke/feedsProsperity 永 false → 后续 12 条链推算类 B 字段必设 feeds*=false,渲染折叠显示依据不参与打分`
- `[2026-06-17 | optical-chip commit] G4补充:跨段重复票未补完 → bclass key 标 flag:①同源 + note 引用同链其他段位(如 seg5→seg2 硅光 PIC)→ 后续 12 条链 bclass 跨段重复时按此标位,不删 key 也不复制数据`

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

## 赛道数据标准 v1（PCB 范例）

> 本节为 `CHAINS.<id>` 的**硬 schema 与渲染约束**。所有赛道产出**必须**与 PCB 黄金范例（`data/pcb.js`）对齐。本节以代码层实际实现为准（`index.html` 主 inline script + `data/pcb.js`），不凭记忆——有疑义先 grep 定位。

### 1. 六维 schema（景气六维·赛道级）

**位置**：`CHAINS.<id>.prosperity.dims[]`，6 个元素，固定 6 key：`durability / visibility / policy / supply / valuation / barrier`（顺序不限，但 `computeFitFromDims` 按权重表查 key，缺 key 按 0 计）。

**每维完整字段**（⚠️ **禁止压缩格式**——HBM 教训：只填 `key/score/trend` 会致六维卡渲染失败，`reason / evidence / flag / tier / src` 都是渲染必读）：

```js
{
  key: 'durability',          // 必填，6 选 1
  name: '景气持续性',          // 必填，中文标签（与 PROSPERITY_META[key].name 一致）
  score: 4,                   // 必填，1-5 整数
  trend: 'up',                // 必填，'up' | 'down' | 'flat'
  reason: '...',              // 必填，1-2 句依据（roll-up 自 segments/chokePoints 也要标 🆪）
  evidence: 'Prismark 2026.6 + UBS / 2026-06',  // 必填，硬数据出处（短描述）
  flag: '🆪',                  // 必填，🆪 标识 AI 主观
  tier: 'broker',             // 必填，4 档之一
  src: 'Prismark 2026.6 + UBS 行业报告',         // 必填，来源详细
  // 可选：
  rollupFrom: 'chokePoints[].valuation.pePercentile',  // 仅当本维是 roll-up（标"自哪 roll"）
  asOf: '2026-06-12'          // 估值类必填，其他可选
}
```

**`verdict` 是对象**（**不是字符串**——HBM 也踩过这个坑）：

```js
verdict: {
  longTermFit: '适合长线研究/跟踪，但不宜当前高位追——等买点或选环节',
  oneLine: '🆪 PCB 是"业绩可见度(5)+景气持续性(4)"双高、但"估值性价比(1)"处绝对历史高位、门控触发的赛道：...',
  stockHint: '优先 T0/T1 环节（极高/高壁垒），PE 分位越低越安全；景气+确定性选环节，壁垒+估值选标的与买点。'
}
```

`stockHint` 写作模板见上方 [verdict.stockHint 写作模板] 一节（line 394-444），**不**写 `segments[].barrier` 等字段路径。

### 2. 个股 dims6 schema（个股级六维）

**位置**：`segments[].stocks[].dims6` + `midstream.stocks[].dims6`（**不是** `prosperity`）。

**每只票字段**：

```js
{
  name: '生益科技', code: '600183',
  position: '...',          // 必填，含市占率/排名硬定位
  barrier: '极高',           // 必填，'极高'|'高'|'中高'|'中'|'低'（字符串，驱动表格排序/徽章）
  trend: 'up',               // 可选，'up'|'down'|'flat'
  trendNote: 'M9大陆唯一·Q1净利+105%',  // 可选，≤15字悬浮提示
  logic: '<mark class="updated">2026Q1营收81.41亿+45%</mark>。...',  // 必填
  // 六维(与赛道级同 6 key, **不含 name**——name 由 PROSPERITY_META 提供)：
  dims6: [
    { key:'durability', score:4, trend:'up',   tier:'estimate' },
    { key:'visibility', score:5, trend:'up',   tier:'estimate' },
    { key:'policy',     score:4, trend:'up',   tier:'estimate' },
    { key:'supply',     score:4, trend:'up',   tier:'estimate' },
    { key:'valuation',  score:2, trend:'down', tier:'estimate' },
    { key:'barrier',    score:5, trend:'flat', tier:'estimate' }
  ],
  dims6Note: '🆪 大陆唯一 M9 CCL，业绩(Q1+105%)+壁垒双满分，估值已不便宜——业绩派',  // 可选
  tier: 'primary',           // 必填，4 档（标的整体数据质量档；估值类估值用）
  valAsOf: '2026-06-13'      // 必填，估值/PE 截至日
}
```

**barrier 维 = barrier 档映射分**（行内手动映射，**代码不强制**——`STOCK_REGISTRY` 跨链共享登记时也按此映射）：

| `barrier` 字符串 | dims6 `barrier` 维 score |
|---|---|
| 极高 | 5 |
| 高 | 4 |
| 中高 | 3 |
| 中 | 2 |
| 低 | 1 |

### 3. 综合分 `computeFitFromDims`（唯一权重源）

**位置**：`index.html` line 633-642，**赛道级**（`computeLtFit`）和**个股级**（`computeStockFit`）共用同一份权重。

**权重**（全站仅此一份，**禁止散落各赛道**重复实现）：

| 维度 | 权重 | 标尺方向 |
|---|---|---|
| durability 持续性 | **0.25** | 越高越好 |
| visibility 兑现度 | **0.25** | 越高越好 |
| valuation 估值 | **0.20** | **方向已翻转**：分越高越便宜（PE 分位 < 30% = 5 分）|
| supply 供需 | 0.12 | 越高越好（紧 = 高）|
| barrier 壁垒 | 0.10 | 越高越好 |
| policy 政策 | 0.08 | 越高越好 |

**安全垫门控**（防"业绩爆表+泡沫"陷阱）：

- `valuation <= 1` **或** `barrier <= 1` → 综合分 `Math.min(score, 60)`，并标 `risk: true`
- 渲染时显示 `⚠安全垫不足` 红字提示

**档位阈值**：

| 综合分 | 档位 | 徽章 class |
|---|---|---|
| **≥ 75** | 🟢核心 | `tg-green` |
| **55-74** | 🟡观察 | `tg-mid` |
| **< 55** | 🔴回避/等 | `tg-extreme` |

**`PROSPERITY_META` 标尺**（`index.html` line 589-626，**新增维度**必须先在此注册）：

- 6 维每维的 `name` / `define` / `scale`（5/3/1 三档描述）/ `basis` 集中定义
- 渲染时 `ⓘ` 折叠展开显示
- **新增维度** → ① 先在 `PROSPERITY_META` 加全字段；② 在 `computeFitFromDims` 权重表加 1 行；③ 6 条赛道数据同步加 dim

### 4. 卡口 `chokePoints` 硬约束

**位置**：`CHAINS.<id>.chokePoints[]`，**核心卡口 3 个**（★★★/★★★/★★☆ 至少 1 个 ★★★）。

**每卡必填**：

```js
{
  rank: 1,
  name: '东材科技', code: '601208',
  segment: 'M9碳氢树脂',         // 卡口所在环节
  strength: '★★★',               // 必填
  logic: '<150字卡口逻辑>',       // 必填
  tags: ['双寡头','无替代','缺口63%','Q1净利+103%'],  // 4 个

  // 估值/择时（pePercentile 必填；可为 null 表示"数据不足"）
  valuation: {
    pe: 'PE 2025~120x(+360%)',              // 可选
    peAbsolute: 'PE(2025A)~120x...',         // 可选
    pePercentile: 93,                        // 必填（0-100 数字；或 null = 数据不足）
    grossMargin: '50%+',                     // 可选（毛利率 = 定价权印证）
    fromHigh: '(2026-06-12 数据...)',        // 可选
    asOf: '2026-06-12',                      // 必填（估值日期）
    note: '🆪 **PE 估值**：...',              // 必填（给用户看的中文叙述）
    tier: 'broker',                          // 必填
    src: '投资网+亿牛网 2026-06...'           // 必填
  },

  // 卡口验证清单（4 项，howToCheck + falsifySignal 必填）
  verification: {
    items: [
      {
        type: '供给寡头',           // 4 项固定：供给寡头 / 产能缺口 / 财报印证 / 交叉信源
        claim: '...',               // 一句论断
        howToCheck: '...',          // 必填，具体核查路径（查哪个公告/季报/研报）
        falsifySignal: '...',       // 必填，什么信号一出现卡口判断就站不住
        status: 'pending'           // 运行时被 localStorage 覆盖
      }
    ],
    note: '...'                     // 可选
  }
}
```

**重大风险**（实控人被查 / 减持 / 诉讼 / 订单不及预期）：

- **作 ⚠️ 提示可见**（在 `valuation.note` 内或独立字段），**不**改 `barrier`（barrier 衡量产业链位势，不含治理）
- `tier` 用 `primary`（公司公告是一手）
- 例：PCB CP0 东材「⚠️ 治理风险(必读)：实控人熊海涛 2026-01 被留置」——可见、不改 barrier

### 5. 环节结构（5 列树状图 + segments）

**树状图 5 列**（`treeMap`，**列名与 PCB 黄金范例完全一致**）：

```
[下游(需求)] → [中游(制造)] → [上游材料] → [上游设备] → [侧枝]
```

5 列**顺序与命名**不可变；每列 ≥2 sub-card，每个 sub-card `note` 含占比+来源（S3）。

**segments（6 个环节）**——赛道深度拆解的典型结构：

| 顺序 | 环节类型 | 备注 |
|---|---|---|
| 1 | 上游材料（树脂/铜箔/玻纤布/...）| 高壁垒、卡口多 |
| 2 | 上游设备（钻针/曝光/电镀）| 高壁垒 |
| 3 | 中游制造（PCB 制造/载板）| 客户可切换 → `choke: false` 但每只标的有 dims6 |
| 4 | 下游（AI 服务器/通信/汽车/消费）| |
| 5 | 侧枝（模组/封装/...）| |

**排序硬纪律**：

- segments 整体按**卡口强度/壁垒**降序排（卡口环节靠前）
- 每个 segment 内 `stocks[]` 按 `barrier` 降序（极高→高→中高→中→低），`rank` 字段对应
- `midstream.stocks` 同上

**制造商规则**（重要）：

- 中游制造环节 `choke: false`（客户可切换 = 不构成物理卡口）
- **但每只制造商标的必须 dims6 评分**（用户要看到每只票的"长线适配分"小徽章）
- 卡口标的填 `hits: 0-4` + `strength: '★★★'|'★★☆'`
- 非卡口填 `hits: null, strength: null`

### 6. 趋势箭头 `arrowD` 配色

**位置**：`index.html` line 874（`stockDims6Badge` 内）+ line 998（赛道级六维卡内）。

```js
const arrowD = (t, sc) => t==='up' ? '<span style="color:var(--green);">↑</span>'      // 进步
                              : t==='down' ? '<span style="color:var(--red);">↓</span>'  // 承压
                              : (sc!=null && sc>=4 ? '<span style="color:var(--barrier-high);">→</span>'  // 高分平稳 → 金
                                                      : '<span style="color:var(--muted);">→</span>');     // 普通平稳 → 灰
```

| 状态 | 颜色 | 字符 | 含义 |
|---|---|---|---|
| trend=up | `var(--green)` 绿 | ↑ | 进步 |
| trend=down | `var(--red)` 红 | ↓ | 承压 |
| trend=flat, score≥4 | `var(--barrier-high)` 金 | → | **高分平稳用金色**，避免高分被压暗 |
| trend=flat, score<4 | `var(--muted)` 灰 | → | 普通平稳 |

> **注**：用户最初提议"score≥4 flat→绿 / barrier 高档 flat→金"（两 case），**实际代码**将 score≥4 统一映射到 `--barrier-high`（金，单 case）。**正确性以代码为准**——`stockDims6Badge` line 874 与赛道级六维卡 line 998 完全一致。

**`trendBadge` 字符串徽章**（个股行末用，`index.html` line 861-867）：

| trend | 徽章 | class |
|---|---|---|
| up | ⬆ 进步 | `tag tg-green` |
| down | ⬇ 承压 | `tag tg-extreme` |
| flat | ➖ 平稳 | `tag tg-gray` |
| 缺省 | （不显示）| — |

**score bar 配色**（`stockDims6Badge` 内 line 883）：

| score | barColor | 视觉 |
|---|---|---|
| ≥ 4 | `var(--green)` | 绿（高分） |
| ≥ 3 | `var(--barrier-high)` | 金（中高） |
| ≥ 2 | `var(--barrier-mid)` | 橙（中） |
| < 2 | `var(--red)` | 红（低分） |

### 7. 不可破的约束（汇总）

1. **六维必须 6 个**：缺 key 按 0 计分，综合分被严重拉低
2. **dims6 必含 `barrier` 维**：6 维综合分 = 6 维各自 score 加权，缺一维直接塌
3. **个股 `barrier` 字符串 + dims6 `barrier` 维数字** 不可只填其一：字符串驱动表格排序/徽章，数字驱动综合分
4. **`computeFitFromDims` 权重/门控/档位 全站一份**：不要在数据层重复实现
5. **制造商标的必须 dims6 评分**：中游制造虽 `choke: false`，但用户要看每只票的"长线适配分"小徽章
6. **重大风险（治理/减持/诉讼）⚠️ 提示可见，不改 barrier**
7. **stale 数据保留 + 标"待更新"**，不假装刷新、不估算覆盖
8. **🆪 主观判断不刷数据截止日**：六维分、估值分位、卡口强度标 `tier: 'estimate'`
9. **`stockHint` 不写字段路径**：用 T0/T1 / PE 分位 等口语词；详见 [verdict.stockHint 写作模板] 一节

## 相关文件索引

| 文件 | 角色 |
|---|---|
| `data/pcb.js` | 黄金范例（已填六维，555 行）|
| `index.html` 主 inline script | 渲染函数 + `PROSPERITY_META` (line 589-626) + `computeFitFromDims` (line 633-642) + `SOURCE_TIERS` (line 678-683) + `sourceTierBadge` (line 687-693) + `trendBadge` (line 861-867) + `stockDims6Badge` (line 870-891) + `arrowD` (line 874, 998) |
| `.claude/plans/refresh-sop.md` | 数据刷新/新增 SOP（三步版：CC 盘点 → Gemini 查 + 自查 + 出注入块 → CC 注入带守门）|

