# 产业链刷新模板（Chain Refresh Template · 阶段四 commit 4.4 模板化）

> **适用版本**：v2（2026-06-24 · 阶段五 commit 4.14 加 §4.1 peAbsMax 设置规范）
> **前置规则**：[CLAUDE.md §6](../../CLAUDE.md) 数据治理铁律 + §6.8 数据准确度优先 + §6.9 双重检查 + §6.10 三重验证 + §7 数据自查纪律
> **基线**：[data/pcb.js](../../data/pcb.js) + [data/pcb.manual.js](../../data/pcb.manual.js) + [data/pcb.auto.js](../../data/pcb.auto.js) + [scripts/refresh_pcb_valuation.py](../../scripts/refresh_pcb_valuation.py) + [scripts/calc_percentile.py](../../scripts/calc_percentile.py) + [scripts/fetch_close_history.py](../../scripts/fetch_close_history.py)

---

## 1. 模板适用场景

| 场景 | 触发 | 工作量 |
|---|---|---|
| **新增产业链**（从零开始） | 用户说"新增 XX 产业链" | 10 步 checklist（§5）|
| **刷新已有产业链估值数据** | 用户说"刷新 XX 链" / 周一手动触发 🔄 按钮 | 6 步 checklist（§6）|
| **微调单只 stock 估值字段** | 财报披露 / 异常 PE 修复 | 见 §5 步骤 4 注释 |

**不适用场景**：
- 仅修改 CSS/UI 排版（直接改 `index.html` 即可）
- 修改治理纪律 / 文档（直接改 `CLAUDE.md`）
- 添加决策卡片 / 交易日志（前端 localStorage 层，与数据层无关）

---

## 2. 文件结构说明

PCB 阶段三确立的「3 文件 + 3 脚本」结构是**通用模板**，所有赛道都按此布局。`xxx` = 赛道 id（如 `hbm` / `ai-server` / `solid-battery`）。

### 2.1 `data/xxx.manual.js`（手动层·人手填）

**IIFE 包裹**：`window.PCB_MANUAL = window.PCB_MANUAL || {}; (function(M){ M.stocks = { ... }; })(window.PCB_MANUAL);`

| 字段 | 必填 | 类型 | 说明 |
|---|---|---|---|
| `code` | ✓ | str | 6 位股票代码（如 `'600183'`）|
| `name` | ✓ | str | 股票简称（如 `'生益科技'`）|
| `barrier` | ✓ | str | 物理卡口评级：`极高` / `高` / `中` / `低` |
| `tier` | ✓ | str | 投资分级：`★★★` / `★★☆` / `★☆☆` |
| `investable` | ✓ | bool | 是否可投（`true` = 可投，`false` = 概念票/退市风险）|
| `region` | ✓ | str | 上市地：`国内` / `海外`（影响信号排除）|
| `position` | ✗ | str | 一句话卡位说明（≤50 字）|
| `src` | ✓ | str | 信源 URL ≥1 条（cninfo / 巨潮 / 公司公告）|
| `valAsOf` | ✓ | date | 字段填写日期（YYYY-MM-DD）|
| `trend` | ✓ | str | 当前趋势：`up` / `down` / `flat` |
| `trendNote` | ✓ | str | 趋势判断依据（≤80 字）|
| `segments` | ✗ | array | 涉及段位 `[{idx:6,name:'AI PCB 制造(中游)'}]` |
| `dims6` | ✗ | object | 6 维景气评分 `{price,volume,policy,tech,customer,supply}` 各 0-5 |
| `dims6Note` | ✗ | str | 6 维评分说明 |
| `growthAdj` | ✗ | bool | 是否纳入 growthAdj 通道（AI 链放宽阈值）|
| `peAbsMax` | ✗ | number | growthAdj 通道 PE 上限（AI 硬件 60 / AI 半导体 80 / AI 软件 120）|

### 2.2 `data/xxx.auto.js`（自动层·脚本生成）

**IIFE 包裹**：`window.PCB_AUTO = window.PCB_AUTO || {}; (function(A){ A.valuations = { ... }; A._meta = {...}; })(window.PCB_AUTO);`

| 字段 | 必填 | 类型 | 来源脚本 | 说明 |
|---|---|---|---|---|
| `pe_ttm` | ✓ | number/null | `refresh_pcb_valuation.py` | 当前 PE-TTM（亏损股为 `null`）|
| `pe_history` | ✓ | array | `refresh_pcb_valuation.py` | 5 年 pe_ttm 历史 `[{date:'2021-06-23', pe:25.3}, ...]` |
| `pePercentile` | ✓ | number/null | `calc_percentile.py` | PE 在 5 年历史中的分位（0-100，亏损股为 `null`）|
| `entryZone` | ✓ | object | `calc_percentile.py` | 买入区间 `{p30: 25.03, p70: 36.26}` |
| `fromHigh` | ✓ | number | `fetch_close_history.py` | 当前价距 5 年最高价（负数）|
| `closeLatest` | ✓ | number | `fetch_close_history.py` | 最新收盘价 |
| `closeHigh5y` | ✓ | number | `fetch_close_history.py` | 5 年最高收盘价 |
| `flag` | ✗ | str/null | 脚本自动 | 异常标记（`⚠️PE异常高` / `⚠️单源` / null）|
| `source` | ✓ | str | 脚本自动 | `baostock/00.9.20/2026-06-24` |

### 2.3 `data/xxx.js`（合并层·加载顺序与注入）

**IIFE 包裹**：`window.CHAINS = window.CHAINS || {}; (function(CHAINS){ CHAINS.xxx = {...}; ... })(window.CHAINS);`

**关键注入函数**（在 pcb.js L629-L735 范本，**直接复用**）：

| 函数 | 作用 | 注入字段 |
|---|---|---|
| `injectValuation(arr)` | 把 `PCB_AUTO.valuations[code]` 合并到 `arr[i]` | `pe_ttm` / `pePercentile` / `entryZone` / `fromHigh` / `closeLatest` / `closeHigh5y` / `valuation` 对象 |
| `deriveSignal(code, s, v)` | program-derived 算信号 A/B | `signal = {A, B, channel, pctlA, pctlB, trend, barrier, pePercentile, peAbsMax, asOf}` |
| `injectSignal(arr)` | 把 signal 写到 `arr[i].signal` | `signal` 字段 |
| 顶部 `CHAINS.pcb.signalMeta` | 暴露 stats + thresholds + asOf | `signalMeta = {thresholds, stats, chokepointCodesCount, note, asOf}` |

**加载顺序（index.html manifest 数组）**：
```
'xxx.manual'   ← 必须先于 xxx.js 加载（注入 STOCK_REGISTRY）
'xxx.auto'     ← 必须先于 xxx.js 加载（估值字段全 null·commit 3.x 脚本回填）
'xxx'          ← 合并层·调 injectValuation + injectSignal
```

---

## 3. 脚本复用方法

### 3.1 `refresh_pcb_valuation.py`（拉 pe_ttm + pe_history）

**复用方式**：复制为 `refresh_xxx_valuation.py`，改**两个路径常量**：

```python
# scripts/refresh_xxx_valuation.py
ROOT = Path(__file__).resolve().parent.parent
MANUAL_JS = ROOT / 'data' / 'xxx.manual.js'   # ← 改
AUTO_JS   = ROOT / 'data' / 'xxx.auto.js'     # ← 改
```

**STOCKS 列表不用改**：`parse_stock_codes_from_manual()` 自动从 `xxx.manual.js` 用正则提取 6 位股票代码（`r"'([036]\d{5})':\s*\{\s*code:\s*'\1'"`）。

**START_DATE / END_DATE**：按需调整（默认 5 年窗口）。

### 3.2 `calc_percentile.py`（算 pePercentile + entryZone + fromHigh_pe）

**直接复用，不改任何代码**：

```bash
python scripts/calc_percentile.py
# 内部读 data/xxx.manual.js + data/xxx.auto.js（路径在脚本里写死为 pcb 系列）
# 如需支持多链路，复制为 calc_xxx_percentile.py 改 AUTO_JS 路径
```

**不拉网络**（纯 numpy 计算），10 秒内完成。

### 3.3 `fetch_close_history.py`（拉 close 5y 算真实 fromHigh）

**直接复用，不改任何代码**。

**注意**：H 股 / 科创板 / 北交所可能 close 历史 < 5 年（baostock 起算日不同），需先跑验证再决定是否纳入。

### 3.4 执行顺序

```bash
# 1) 拉 pe_ttm + pe_history（baostock · ~3 分钟）
python scripts/refresh_xxx_valuation.py

# 2) 算分位 + 买入区间（numpy · ~10 秒）
python scripts/calc_percentile.py

# 3) 拉 close 历史 + 算 fromHigh（baostock · ~3 分钟）
python scripts/fetch_close_history.py
```

**三步串行**：必须按顺序，因 ② 依赖 ① 的 pe_history，③ 不依赖 ①② 但 commit 3.5 起要覆盖 commit 3.2 的 fromHigh_pe 占位字段。

---

## 4. growthAdj 名单决策标准

### 4.1 peAbsMax 设置规范（★ commit 4.14 新增）

**原则**：`peAbsMax` = 赛道合理 PE 区间上限的 **1.3-1.5 倍**

**按赛道类型设置**（刷新或新增产业链时按此表设，**不统一用 120**）：

| 赛道类型 | peAbsMax | 说明 |
|---|---|---|
| **PCB / AI 硬件**（中游制造·服务器·光模块·散热）| **120** | PCB 阶段三 commit 4.14 从 60 上调 → 120（PE 普遍 80-200 · 卡口极端高估股被信号逻辑排除）|
| **AI 半导体设备 / 材料**（EDA / 光刻 / 薄膜沉积 / 抛光）| **160** | 国产替代溢价高 + 营收基数低 → PE 弹性大 |
| **AI 软件 / 平台 / 应用**（SaaS / 模型 API / 行业大模型）| **300** | PS 估值法 · 利润率为负时 PE 无意义 |
| **传统制造**（消费 / 化工 / 建材 / 机械）| **60** | PE 区间窄（10-40）· 放宽意义不大 |

**设置流程**：
1. 刷新产业链时，先看该赛道最近 1 年的 PE 中位数 × 1.3-1.5 = 候选 peAbsMax
2. 与上表「赛道类型」行对照，取较大值
3. 写入 `MANUAL.stocks[code].peAbsMax` 字段（每个 stock 独立值）
4. 写入前必须 commit message 说明 peAbsMax 取值依据

**反例（不推荐）**：
- ❌ 所有赛道统一 120（PCB 卡口股与软件股共用 = 误判率上升）
- ❌ 所有赛道统一 60（PCB 卡口股 PE 普遍 100+ · 永不触发 growthAdj）
- ❌ 完全沿用上一版不调整（市场 PE 区间会变化）



### 4.2 入选条件（必须同时满足）

1. `barrier ∈ {极高, 高}` —— 必须有物理卡口或认证壁垒
2. **AI 暴露度高** —— 营收/产能/订单中 AI 占比 ≥ 30%
3. **非 PE 异常高** —— `pe_ttm < 500`（PE 异常高股已被信号逻辑排除）
4. **非退市 / 非 ST** —— pre-flight-check.js 通过
5. **非亏损股** —— `pe_ttm !== null`（亏损股已被信号逻辑排除）
6. **有 trend 字段** —— `trend ∈ {up, down, flat}`

### 4.3 PCB 阶段三 8 只 growthAdj 名单（commit 3.4.1 范本）

| code | name | barrier | AI 暴露度 |
|---|---|---|---|
| 300395 | 菲利华 | 极高 | Low Dk / 石英布独供胜宏 GB300 |
| 600183 | 生益科技 | 极高 | 算力 PCB CCL 全球前 3 |
| 601208 | 东材科技 | 极高 | Low Dk / Df 二代已批量 |
| 002916 | 深南电路 | 极高 | 28 层 GB200 + 32 层 GB300 |
| 300476 | 胜宏科技 | 高 | GB200/GB300/Rubin 主力 |
| 301377 | 鼎泰高科 | 高 | 0.02mm 沪电微钻 |
| 002463 | 沪电股份 | 高 | AI 服务器 PCB 龙头 |
| 688630 | 芯碁微装 | 高 | 半导体光刻设备 |

**未入选原因**（决策依据）：301217 铜冠（PE 异常高） / 301200 大族数控（PE 分位 100%） / 002938 鹏鼎（消费占比 70% · AI 暴露度不足）/ 300522 世名（传统链） / 等。

---

## 5. 新增产业链 checklist（10 步）

| # | 步骤 | 文件 / 命令 | 验证 |
|---|---|---|---|
| 1 | 建 `data/xxx.manual.js` | 复制 `pcb.manual.js` 结构 · 填新赛道 stock | node 解析出 N 只 stock code |
| 2 | 建 `data/xxx.auto.js` | 空壳 `valuations = {}; _meta = {asOf, stats: {success:0}}` | node 加载不报错 |
| 3 | 建 `data/xxx.js` | 复制 `pcb.js` 结构 · 改 `CHAIN_ID` 为 `xxx` | node 加载输出 OK |
| 4 | 跑 `refresh_xxx_valuation.py` | 拉 pe_ttm + pe_history | AUTO_JS 出现 N 只 valuations |
| 5 | 跑 `calc_percentile.py` | 算分位 + 买入区间 | 全部 stock 出现 pePercentile + entryZone |
| 6 | 跑 `fetch_close_history.py` | 算 fromHigh | 全部 stock 出现 fromHigh + closeLatest + closeHigh5y |
| 7 | 填 growthAdj 名单 | `xxx.manual.js` 加 `growthAdj: true` + `peAbsMax: 60/80/120` | 入选 stock 在信号扫描时被识别为 growthAdj 通道 |
| 8 | 确认信号逻辑 | `xxx.js` 直接复用 `deriveSignal`（不写新逻辑） | signalMeta.stats.excluded.noBar 正确分类 |
| 9 | index.html 注册新赛道 | DATA_MANIFEST 数组加 `'xxx'` + 侧栏 `<div class="sidebar-nav">` 加 `<span class="nav-item" data-chain="xxx" onclick="switchChain('xxx')">` + CHANGELOG 加一条 + sectorName/sectorColor 加新 id | 浏览器 hash `#xxx` 能进入新赛道 |
| 10 | 输出数据自查报告 | `=== 数据自查报告 · [commit 编号] ===` 4 节格式 | §7.2 完整输出 |

**预检（步骤 1 前必做）**：
- 跑 `.claude/plans/tools/pcb-pre-flight-check.js` 查 stock 状态（退市 / ST / 暂停上市）
- 跑 `.claude/plans/tools/pcb-hallucination-screen.js` 查豆包 / DeepSeek 返回内容

**注入字段不能丢**（§6.2）：DeepSeek / Gemini 返回的每个字段（`status` / `tier` / `src` / `信源分类` / `reason` / `evidence` / `flag` / `asOf`）必须原样写入 `data/<id>.js`，**禁止 CC 注入时只挑"看起来重要"的字段**。

**src URL 必填**（§6.3）：每只 stock 的 `src` 字段必须 ≥2 个**真正可点开**的 URL（primary / broker），禁止占位符或单源 media。

**≥2 独立来源**（§6.4）：每个会变的数字（市占率 / 营收 / 产能 / CAGR）必须 ≥2 独立来源；仅 media 单源 → 标"存疑(待核)"。

**概念票不计入**（§6.5）：非本赛道主营的标的不计入 stock 总数；可标 ⚠️"非主营 / 概念性持仓"列在 segments 末尾作为参考。

---

## 6. 刷新已有产业链 checklist（6 步）

| # | 步骤 | 命令 / 工具 | 验证 |
|---|---|---|---|
| 1 | 跑 `refresh_xxx_valuation.py` | 覆盖 `xxx.auto.js` 的 `valuations.pe_ttm + pe_history` | stats.success = 实际成功数 · 失败列表为空 |
| 2 | 跑 `calc_percentile.py` | 覆盖 `pePercentile + entryZone` | 全部 stock 有 2 字段（亏损股 pePercentile=null）|
| 3 | 跑 `fetch_close_history.py` | 覆盖 `fromHigh + closeLatest + closeHigh5y` | 全部 stock 有 3 字段 |
| 4 | 检查亏损股 | 列出 `pe_ttm === null` 的 stock 名单 · 对比上一稳定版本是否变化 | 新增亏损股需更新 §7 自查报告【已知错误/异常】|
| 5 | 检查 PE 异常高 | 列出 `pe_ttm > 500` 或 `flag 含 "PE异常高"` 的 stock 名单 | 异常 PE 需到同花顺 / 巨潮核对 |
| 6 | 输出数据自查报告 | §7.2 4 节格式 | 报告归档到 commit message |

**刷新策略（§6.4 手动刷新纪律）**：
- 每次只动被刷新的字段；硬数据变化才更新对应"数据截止"日期；🆪 主观判断刷新**不动**数据截止日
- 刷新若因联网失败未取到新数 → 保留旧值 + 标"截至 X 日 待更新"，不得假装已刷新、不得用估算覆盖真实数据

---

## 7. 数据自查报告格式（§7.2 强制）

每次涉及数据字段的 commit **必须**输出：

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

**自查报告发现的【已知错误】必须在下一个 commit 修复，不得带病前进**。

**【待核实】项目必须在阶段交界验收前完成人工核对，未核对不得放行下一阶段**。

完整规则见 [CLAUDE.md §7](../../CLAUDE.md)。

---

## 8. 紧急回滚命令格式

```bash
# 保留到指定 commit（<hash> = git log --oneline 第一列的 7 位 hash）
git reset --hard <hash>

# 常用还原点
git reset --hard 91f1a59   # 阶段四 commit 4.0（保留阶段一+二+三+阶段四 4.0）
git reset --hard c403f12   # 阶段三 commit 3.4.1
git reset --hard 0aecae0   # 阶段三 commit 3.5
git reset --hard f2ef298   # 阶段一+二（回滚阶段三）
git reset --hard 192ee85   # 完全回滚（阶段一二三都不要）

# 推到远端（GitHub Pages 才能拿到回滚后的版本）
git push --force-with-lease
```

**回滚前必查**：`git status` 干净 + HEAD 是稳定 commit（避免丢未提交修改）。

**回滚后必做**：`git log --oneline -5` 确认 HEAD 正确 + 浏览器硬刷（Ctrl+Shift+R）确认页面已回滚。

---

## 9. 模板更新记录

| 版本 | 日期 | commit | 改动 |
|---|---|---|---|
| v1 | 2026-06-24 | 阶段四 commit 4.4 | 初版 · 8 节（适用场景 / 文件结构 / 脚本复用 / growthAdj 决策 / 新增 checklist / 刷新 checklist / 自查报告 / 紧急回滚）|
| v2 | 2026-06-24 | 阶段五 commit 4.14 | §4.1 peAbsMax 设置规范重写（PCB 120 / 半导体设备 160 / 软件 300 / 传统 60）· 原则 = 赛道合理 PE 上限的 1.3-1.5 倍 |

---

## 10. 关联文件清单

| 角色 | 路径 |
|---|---|
| 模板文件（本文件）| [`.claude/templates/chain-refresh-template.md`](./chain-refresh-template.md) |
| 治理纪律 | [`CLAUDE.md`](../../CLAUDE.md) |
| PCB 手动层（37 只 stock 范本）| [`data/pcb.manual.js`](../../data/pcb.manual.js) |
| PCB 自动层（37 只 stock 估值范本）| [`data/pcb.auto.js`](../../data/pcb.auto.js) |
| PCB 合并层（injectValuation + deriveSignal 范本）| [`data/pcb.js`](../../data/pcb.js) |
| 拉 pe_ttm + pe_history 脚本 | [`scripts/refresh_pcb_valuation.py`](../../scripts/refresh_pcb_valuation.py) |
| 算分位 + 买入区间脚本 | [`scripts/calc_percentile.py`](../../scripts/calc_percentile.py) |
| 拉 close 5y 算 fromHigh 脚本 | [`scripts/fetch_close_history.py`](../../scripts/fetch_close_history.py) |
| 上市状态预检工具 | [`.claude/plans/tools/pcb-pre-flight-check.js`](../plans/tools/pcb-pre-flight-check.js) |
| 豆包返回幻觉筛查工具 | [`.claude/plans/tools/pcb-hallucination-screen.js`](../plans/tools/pcb-hallucination-screen.js) |
