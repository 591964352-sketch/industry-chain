# 产业链刷新模板（Chain Refresh Template · 阶段四 commit 4.4 模板化）

> **适用版本**：v5（2026-06-25 · 阶段五 commit 4.37 新增 §8「新增 stock 标准流程（三步缺一不可）」+ §8/§9/§10 重编号）
> **前置规则**：[CLAUDE.md §6](../../CLAUDE.md) 数据治理铁律 + §6.8 数据准确度优先 + §6.9 双重检查 + §6.10 三重验证 + §7 数据自查纪律
> **基线**：[data/pcb.js](../../data/pcb.js) + [data/pcb.manual.js](../../data/pcb.manual.js) + [data/pcb.auto.js](../../data/pcb.auto.js) + [scripts/validate_stock_codes.py](../../scripts/validate_stock_codes.py) + [scripts/refresh_pcb_valuation.py](../../scripts/refresh_pcb_valuation.py) + [scripts/calc_percentile.py](../../scripts/calc_percentile.py) + [scripts/fetch_close_history.py](../../scripts/fetch_close_history.py) + [scripts/fetch_volume_history.py](../../scripts/fetch_volume_history.py) + [scripts/calc_signal_c.py](../../scripts/calc_signal_c.py) + [scripts/refresh_all.py](../../scripts/refresh_all.py)

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
# 0) ★ commit 4.36 新增：stock code-name 一致性校验（akshare · ~10 秒）· 阻断式
python scripts/validate_stock_codes.py

# 1) 拉 pe_ttm + pe_history（baostock · ~3 分钟）
python scripts/refresh_xxx_valuation.py

# 2) 算分位 + 买入区间（numpy · ~10 秒）
python scripts/calc_percentile.py

# 3) 拉 close 历史 + 算 fromHigh（baostock · ~3 分钟）
python scripts/fetch_close_history.py

# 4) 拉 volume + turn 5y 历史（baostock · ~3 分钟）— 阶段五 commit 4.15
python scripts/fetch_volume_history.py

# 5) 算信号 C 基础字段（volRatio5d + maxPctl30d/60d/90d）— 阶段五 commit 4.16
python scripts/calc_signal_c.py
```

**六步串行**：必须按顺序，因 ② 依赖 ① 的 pe_history，③ 不依赖 ①② 但 commit 3.5 起要覆盖 commit 3.2 的 fromHigh_pe 占位字段，⑤ 依赖 ① 的 pe_history + ④ 的 volume_history。

**★ Step 0 校验（commit 4.36 · 强制前置）**：

| 项 | 说明 |
|---|---|
| **做什么** | 用 akshare.stock_info_a_code_name() 拉 A 股全量 5529 只 (code, name) 映射 · 对比 pcb.manual.js 的 (code, name) 是否一致 |
| **拦截条件** | 任何 1 只 stock code-name 不一致（如 002443 写「金洲精工」但 A 股 002443 实为「金洲管道」）→ exit 1 |
| **覆盖场景** | (a) name 错位（最常见）(b) code 错位（code 在 akshare 全量中找不到 · 多为退市/暂停/虚构）(c) 同名异 code 警告（非阻断） |
| **降级路径** | `--warn-only` 只打印警告不阻断（CI 监测场景） |
| **跳过路径** | `python scripts/refresh_all.py --skip-validate` 紧急跳过（不推荐） |

**为什么必要（commit 4.35 教训）**：

- pcb.manual.js 历史出现过 code-name 错位：'002443':{name:'金洲精工'}（实际 002443 是金洲管道）· '603519':{name:'南亚新材'}（实际 603519 是神马电力）
- 注入估值时按 code 拉 baostock 数据，name 与 code 不匹配 → 数据错位 / 假数据伪装
- Step 0 校验是「数据进入自动层前的最后一道闸」· 防 commit 4.35 类型 bug 重演

### 3.4.1 校验失败时的修复流程

1. 跑 `python scripts/validate_stock_codes.py` 看具体哪几只 stock 错位
2. 人工核对真实 A 股 code-name（同花顺 / 巨潮 / akshare）
3. 修正 `data/pcb.manual.js` 的 code 或 name
4. 重跑校验 → 确认全部 PASS
5. 继续后续 5 步

### 3.5 `fetch_volume_history.py`（拉 volume + turn 5y 历史）

**直接复用，不改任何代码**。

**commit 4.15 引入**：baostock 单源拉 37 只 stock 的 volume + turn 5y 日频（每只 ~1000+ 行）· 注入 `xxx.auto.js.valuations[code].volume_history` 字段。**信号 C 基础数据**——`calc_signal_c.py` 用 volume_history 算 volRatio5d（5 日均量 / 60 日均量）。

### 3.6 `calc_signal_c.py`（算 volRatio5d + maxPctl30d/60d/90d）

**直接复用，不改任何代码**。

**commit 4.16 引入**：基于 commit 4.15 的 volume_history + commit 3.1.2 的 pe_history 算 4 个字段：
- `volRatio5d`（5 日均量 / 60 日均量 · 不足 60 天返回 null）
- `maxPctl30d/60d/90d`（近 N 天内每个 pe 在全历史中的分位的最大值）

写入 `xxx.auto.js.valuations[code]` · 供 `xxx.js` 的信号 C 监测调用。

### 3.7 `refresh_all.py`（★ commit 4.23 + 4.36 · 一键执行全链路）

**入口脚本**：按顺序调用上述 6 个脚本（含 Step 0 校验），**用户首选**：

```bash
# 完整 6 步（Step 0 校验 + 网络 + 计算）
python scripts/refresh_all.py

# 跳过网络拉取（步骤 1/3/4）· 只跑本地计算（步骤 2/5）· 数据已是最新时快速重算
python scripts/refresh_all.py --skip-fetch

# 跳过 Step 0 校验（紧急情况用 · 已确认 pcb.manual.js 干净）
python scripts/refresh_all.py --skip-validate

# 组合：跳过网络 + 跳过校验（只跑 calc_percentile + calc_signal_c 两个本地计算步）
python scripts/refresh_all.py --skip-fetch --skip-validate
```

**行为规范**：
- 每步完成后打印进度「[OK] Step X/6 完成：xxx.py」
- 任何一步失败（非零 exit code / exception）→ 立即停止并打印错误，不继续下一步
- 最后输出总耗时（秒 + 分钟）

**副作用**：本脚本端到端执行 6 个子脚本，运行后会刷新 `data/xxx.auto.js`（这是预期行为）。如需：
- 跳过网络拉取只重算本地数据 → `--skip-fetch`
- 跳过 Step 0 校验（紧急情况）→ `--skip-validate`

**Step 0 失败处理**：validate_stock_codes.py 任何 1 只 stock code-name 不一致 → 立即 exit 1 → refresh_all.py 终止后续 5 步。需要先修正 `data/pcb.manual.js` 后重跑。

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
| **0** | **★ commit 4.36 新增：stock code-name 校验**（新增 stock 写完 manual.js 后立即跑） | `python scripts/validate_stock_codes.py` | 全部 stock PASS · exit 0 |
| 1 | 建 `data/xxx.manual.js` | 复制 `pcb.manual.js` 结构 · 填新赛道 stock | node 解析出 N 只 stock code |
| 2 | 建 `data/xxx.auto.js` | 空壳 `valuations = {}; _meta = {asOf, stats: {success:0}}` | node 加载不报错 |
| 3 | 建 `data/xxx.js` | 复制 `pcb.js` 结构 · 改 `CHAIN_ID` 为 `xxx` | node 加载输出 OK |
| 4 | 跑 `refresh_xxx_valuation.py` | 拉 pe_ttm + pe_history | AUTO_JS 出现 N 只 valuations |
| 5 | 跑 `calc_percentile.py` | 算分位 + 买入区间 | 全部 stock 出现 pePercentile + entryZone |
| 6 | 跑 `fetch_close_history.py` | 算 fromHigh | 全部 stock 出现 fromHigh + closeLatest + closeHigh5y |
| 7 | 跑 `fetch_volume_history.py` | 拉 volume + turn 5y | 全部 stock 出现 volume_history 数组 |
| 8 | 跑 `calc_signal_c.py` | 算信号 C 4 字段 | 全部 stock 出现 volRatio5d + maxPctl30d/60d/90d |
| 9 | 填 growthAdj 名单 | `xxx.manual.js` 加 `growthAdj: true` + `peAbsMax: 60/80/120` | 入选 stock 在信号扫描时被识别为 growthAdj 通道 |
| 10 | 确认信号逻辑 | `xxx.js` 直接复用 `deriveSignal`（不写新逻辑） | signalMeta.stats.excluded.noBar 正确分类 |
| 11 | index.html 注册新赛道 | DATA_MANIFEST 数组加 `'xxx'` + 侧栏 `<div class="sidebar-nav">` 加 `<span class="nav-item" data-chain="xxx" onclick="switchChain('xxx')">` + CHANGELOG 加一条 + sectorName/sectorColor 加新 id | 浏览器 hash `#xxx` 能进入新赛道 |
| 12 | 输出数据自查报告 | `=== 数据自查报告 · [commit 编号] ===` 4 节格式 | §7.2 完整输出 |

**★ Step 0 前置校验说明（commit 4.36）**：

- **新增 stock 必须先通过 validate 才能写入 manual.js** —— 反例：直接写 `xxx.manual.js` 的 38 只 stock，commit 后才跑 validate 发现 5 只 code-name 错位 → 必须 revert 重新写
- **流程**：手动核对每只 stock 的真实 code 和 name（同花顺 / 巨潮 / akshare 三方核对）→ 写入 manual.js → 立即跑 `validate_stock_codes.py` → 全部 PASS 才能 commit
- **失败处理**：发现错位 → 修正 manual.js → 重跑 validate → PASS → commit
- **常见错位**：code 写错位数（如 6 位写成 5 位）/ name 写印象名（公司更名前的旧名）/ code 误用 ETF 或港股代码

**替代方案（★ commit 4.23 + 4.36）**：步骤 4-8 可用 `python scripts/refresh_all.py` 一键执行全链路（**6 步顺序**含 Step 0 校验 + 失败立即停止 + 总耗时打印）。
- `--skip-fetch` 跳过网络拉取（1/3/4 步）· 只跑本地计算（2/5 步）· 用于数据已是最新时快速重算分位 + 信号 C
- `--skip-validate` 跳过 Step 0 校验（**紧急情况用** · 已确认 pcb.manual.js 干净）

**预检（步骤 1 前必做）**：
- 跑 `.claude/plans/tools/pcb-pre-flight-check.js` 查 stock 状态（退市 / ST / 暂停上市）
- 跑 `.claude/plans/tools/pcb-hallucination-screen.js` 查豆包 / DeepSeek 返回内容

**注入字段不能丢**（§6.2）：DeepSeek / Gemini 返回的每个字段（`status` / `tier` / `src` / `信源分类` / `reason` / `evidence` / `flag` / `asOf`）必须原样写入 `data/<id>.js`，**禁止 CC 注入时只挑"看起来重要"的字段**。

**src URL 必填**（§6.3）：每只 stock 的 `src` 字段必须 ≥2 个**真正可点开**的 URL（primary / broker），禁止占位符或单源 media。

**≥2 独立来源**（§6.4）：每个会变的数字（市占率 / 营收 / 产能 / CAGR）必须 ≥2 独立来源；仅 media 单源 → 标"存疑(待核)"。

**概念票不计入**（§6.5）：非本赛道主营的标的不计入 stock 总数；可标 ⚠️"非主营 / 概念性持仓"列在 segments 末尾作为参考。

---

## 6. 刷新已有产业链 checklist（8 步）

| # | 步骤 | 命令 / 工具 | 验证 |
|---|---|---|---|
| **0** | **★ commit 4.36 新增：stock code-name 校验**（refresh 前必跑 · 防止新加 stock 的 code-name 错位污染数据）| `python scripts/validate_stock_codes.py` | 全部 stock PASS · exit 0 |
| 1 | 跑 `refresh_xxx_valuation.py` | 覆盖 `xxx.auto.js` 的 `valuations.pe_ttm + pe_history` | stats.success = 实际成功数 · 失败列表为空 |
| 2 | 跑 `calc_percentile.py` | 覆盖 `pePercentile + entryZone` | 全部 stock 有 2 字段（亏损股 pePercentile=null）|
| 3 | 跑 `fetch_close_history.py` | 覆盖 `fromHigh + closeLatest + closeHigh5y` | 全部 stock 有 3 字段 |
| 4 | 跑 `fetch_volume_history.py` | 覆盖 `volume_history` 数组 | 全部 stock 出现 volume_history（37 只各 ~1100 行）|
| 5 | 跑 `calc_signal_c.py` | 覆盖 `volRatio5d + maxPctl30d/60d/90d` | 全部 stock 有 4 字段（亏损股 volRatio5d=null）|
| 6 | 检查亏损股 | 列出 `pe_ttm === null` 的 stock 名单 · 对比上一稳定版本是否变化 | 新增亏损股需更新 §7 自查报告【已知错误/异常】|
| 7 | 检查 PE 异常高 | 列出 `pe_ttm > 500` 或 `flag 含 "PE异常高"` 的 stock 名单 | 异常 PE 需到同花顺 / 巨潮核对 |
| 8 | 输出数据自查报告 | §7.2 4 节格式 | 报告归档到 commit message |

**★ Step 0 前置校验说明（commit 4.36）**：

- **刷新前必跑 Step 0** —— 防止新增 / 修改 stock 后出现 code-name 错位污染 pcb.auto.js
- **特别场景**：刷新时新加 stock（如 PCB 新增东财新覆盖标的）→ 必须先在 pcb.manual.js 加 stock → 跑 validate → PASS → 才能进 Step 1
- **批量刷新流程**：
  1. 收集新一周 stock 列表（豆包 / DeepSeek 返回）
  2. 人工核对每只 stock 的真实 code-name（同花顺 / 巨潮 / akshare）
  3. 写入 / 修正 `pcb.manual.js`
  4. **Step 0**: `python scripts/validate_stock_codes.py` → 全部 PASS
  5. Step 1-5: `python scripts/refresh_all.py`（自动跑 Step 0 校验 + 5 步刷新）

**替代方案（★ commit 4.23 + 4.36）**：步骤 1-5 可用 `python scripts/refresh_all.py` 一键执行全链路（**6 步顺序**含 Step 0 校验 + 失败立即停止 + 总耗时打印）。
- `--skip-fetch` 跳过网络拉取（1/3/4 步）· 只跑本地计算（2/5 步）· 用于数据已是最新时快速重算分位 + 信号 C
- `--skip-validate` 跳过 Step 0 校验（**紧急情况用** · 已确认 pcb.manual.js 干净）

**刷新策略（§6.4 手动刷新纪律）**：
- 每次只动被刷新的字段；硬数据变化才更新对应"数据截止"日期；🆪 主观判断刷新**不动**数据截止日
- 刷新若因联网失败未取到新数 → 保留旧值 + 标"截至 X 日 待更新"，不得假装已刷新、不得用估算覆盖真实数据
- commit 4.23 同步修复 `calc_percentile.py` / `calc_signal_c.py` 幂等性 bug（重复跑不再追加字段）

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

## 8. 新增 stock 标准流程（三步缺一不可 · commit 4.37 立）

> **背景**：commit 4.35 教训——pcb.manual.js 历史上出现过 code-name 错位问题（不匹配真实 A 股），必须按「巨潮确认 → validate 通过 → 三重核验」三步走，杜绝凭印象写 stock code / name。

### Step 1 · 巨潮确认（cninfo.com.cn · primary 一手）

**目的**：在写入 pcb.manual.js 之前，先在巨潮资讯（cninfo.com.cn）确认新 stock 的真实 code 和 name。

**操作**：

1. 在 [cninfo.com.cn](http://www.cninfo.com.cn) 「证券搜索」框输入 **stock code**（6 位数字）
   - 命中公司全称 → 记录公司全称
   - 未命中 → 此 code 不存在 A 股，**立即停止**（不要尝试猜测 name）
2. 反向操作：输入**公司名**（如「东材科技」）→ 确认返回的 code 与你手上的一致
   - 一致 → 继续
   - 不一致 → **以巨潮返回的 code 为准**（你手上的 code 可能记错 / 印象名）

**判定标准**：
- ✅ 双向（code → name / name → code）都匹配 → 进入 Step 2
- ❌ 任一不匹配 → 立即修正记忆中的 code/name → 重新跑 Step 1

**反例（commit 4.35 教训）**：
- ❌ 凭印象写 `002443: { name: '金洲精工' }` → 巨潮 002443 实为「金洲管道」(管道公司)
- ❌ 凭印象写 `603519: { name: '南亚新材' }` → 巨潮 603519 实为「神马电力」(电力公司)
- ✅ 真实南亚新材 code = `688519`（688 开头是科创板）

### Step 2 · validate 通过（commit 4.36 · 强制阻断）

**目的**：将新 stock 写入 pcb.manual.js 后，立即跑 validate_stock_codes.py 做机器校验。

**操作**：

```bash
# 写入 pcb.manual.js 后立即跑：
python scripts/validate_stock_codes.py
```

**判定标准**：
- ✅ 全部 `[PASS]` → 进入 Step 3
- ❌ 任一 `[FAIL]` → **立即修正 pcb.manual.js**（按错误提示比对真实 A 股）→ 重跑 validate → 全部 PASS

**集成路径**：跑 `python scripts/refresh_all.py` 时，Step 0 自动跑 validate · 失败 exit 1 阻断后续 5 步。但**手动校验优于依赖自动化**——任何新增 / 修改 stock 后**先跑一次**再 commit。

### Step 3 · 三重核验（§6.11 硬约束）

**目的**：确认新 stock 不仅 code-name 一致，还要确实属于本产业链。

| 核验项 | 检查内容 | 失败处理 |
|---|---|---|
| **code 校验** | pcb.manual.js 里 stock code = Step 1 巨潮确认的 code | 不一致 → 修正 manual.js |
| **name 校验** | pcb.manual.js 里 stock name = 巨潮确认的 name | 不一致 → 修正 manual.js |
| **业务归属校验** | 该 stock 主营 = 本产业链核心业务（如 PCB 链必须是 PCB/CCL/载板/设备/材料厂）· 不是凑数 / 概念票 | 不属于 → 移到 segments 末尾并标 ⚠️"非主营 / 概念性持仓"（按 §6.5 不计入 stock 总数）|

**业务归属校验的具体动作**：

1. 查公司主营收入结构（公司年报「分行业 / 分产品」段）· 占比 ≥30% 才算本赛道主营
2. 查卡口评级（`barrier` = `极高` / `高` / `中` / `低`）· 不达标的 stock 应放 segments 末尾
3. 防止「持有 XX 公司 10% 股权的园区开发商」类概念票混入
4. 防止「封测代工厂」算作「封测设备厂」类错分类

### 违反后果（commit 4.35 案例）

| 失败模式 | 后果 | 修复成本 |
|---|---|---|
| code-name 错位（Step 1/2 跳过） | baostock 按错位 code 拉估值 → 假数据伪装成真数据 | **整块删除 stock + 重做基本面注入**（commit 4.35 做了 14 行删除）|
| 业务归属错（Step 3 跳过）| 注入估值时按 code 拉数据，但 stock 与赛道无关 → 信号扫描污染 + 完整度虚高 | **从 segments 移到末尾 + 移除 growthAdj 资格** + 自查报告列缺陷 |
| 三步全跳过 | 提交后立即被 validate 阻断（commit 4.36 Step 0）· 必须 revert 整个 commit | **revert commit + 重新走三步**（约 30 分钟）|

### 三步流程速查图

```
         巨潮 (cninfo.com.cn)
              ↓
   Step 1 双向核对 (code→name / name→code)
              ↓
         写入 pcb.manual.js
              ↓
   Step 2 validate_stock_codes.py
              ↓
         全部 PASS？
            ↓ Yes                       ↓ No
   Step 3 三重核验 (code/name/业务)   立即修正 → 重跑 validate
              ↓
         三项全过？
            ↓ Yes                       ↓ No
         commit 提交 ✅                  移到 segments 末尾 + 标 ⚠️
```

### 与其他章节的关联

- **§3.4 Step 0 校验**：refresh_all.py 集成版（自动化）
- **§3.4.1 校验失败修复流程**：单步修复指引
- **§5 新增产业链 checklist**：在「步骤 1 建 pcb.manual.js」前**先走 §8 三步**
- **§6 刷新已有产业链 checklist**：在「批量刷新流程第 3 步写入/修正 pcb.manual.js」后**必走 §8 三步**
- **CLAUDE.md §6.10 三重验证**：三重核验是 §6.10 在「新增 stock」场景的具体化
- **CLAUDE.md §6.11 11 条硬约束**：豆包 / DeepSeek / Gemini 返回新 stock 时**强制走 §8 三步**

---

## 9. 紧急回滚命令格式

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

## 10. 模板更新记录

| 版本 | 日期 | commit | 改动 |
|---|---|---|---|
| v1 | 2026-06-24 | 阶段四 commit 4.4 | 初版 · 8 节（适用场景 / 文件结构 / 脚本复用 / growthAdj 决策 / 新增 checklist / 刷新 checklist / 自查报告 / 紧急回滚）|
| v2 | 2026-06-24 | 阶段五 commit 4.14 | §4.1 peAbsMax 设置规范重写（PCB 120 / 半导体设备 160 / 软件 300 / 传统 60）· 原则 = 赛道合理 PE 上限的 1.3-1.5 倍 |
| v3 | 2026-06-24 | 阶段五 commit 4.24 | §3.4 补 4/5 步（fetch_volume_history + calc_signal_c）· 新增 §3.5/§3.6 介绍新脚本 · 新增 §3.7 refresh_all.py 一键入口 + --skip-fetch 说明 · §5 新增 checklist 补 7/8 步 · §6 刷新 checklist 补 4/5 步（6 步→8 步）· §10 加 3 个新文件关联 |
| v4 | 2026-06-25 | 阶段五 commit 4.36 | 新增 §3.4 Step 0 stock code-name 校验（akshare · 阻断式）· 新增 §3.4.1 校验失败修复流程 · §3.7 refresh_all.py 加 Step 0 集成 + --skip-validate 参数（5 步→6 步）· §5 新增 checklist 加 Step 0 前置校验说明 + 「新增 stock 必须先通过 validate」约束 · §6 刷新 checklist 加 Step 0 前置校验说明 + 批量刷新流程 · §10 加 validate_stock_codes.py 关联 |
| v5 | 2026-06-25 | 阶段五 commit 4.37 | 新增 §8「新增 stock 标准流程（三步缺一不可）」· Step 1 巨潮确认 + Step 2 validate 通过 + Step 3 三重核验（code/name/业务归属）· 违反后果表（commit 4.35 案例）· 速查图 · §8→§9 §9→§10 §10→§11 重编号 |

---

## 11. 关联文件清单

| 角色 | 路径 |
|---|---|
| 模板文件（本文件）| [`.claude/templates/chain-refresh-template.md`](./chain-refresh-template.md) |
| 治理纪律 | [`CLAUDE.md`](../../CLAUDE.md) |
| PCB 手动层（37 只 stock 范本）| [`data/pcb.manual.js`](../../data/pcb.manual.js) |
| PCB 自动层（37 只 stock 估值范本）| [`data/pcb.auto.js`](../../data/pcb.auto.js) |
| PCB 合并层（injectValuation + deriveSignal 范本）| [`data/pcb.js`](../../data/pcb.js) |
| **一键刷新入口**（★ commit 4.23 + 4.36 加 Step 0 校验）| [`scripts/refresh_all.py`](../../scripts/refresh_all.py) |
| **★ stock code-name 校验脚本**（commit 4.36 新增 · Step 0 阻断式）| [`scripts/validate_stock_codes.py`](../../scripts/validate_stock_codes.py) |
| 拉 pe_ttm + pe_history 脚本 | [`scripts/refresh_pcb_valuation.py`](../../scripts/refresh_pcb_valuation.py) |
| 算分位 + 买入区间脚本 | [`scripts/calc_percentile.py`](../../scripts/calc_percentile.py) |
| 拉 close 5y 算 fromHigh 脚本 | [`scripts/fetch_close_history.py`](../../scripts/fetch_close_history.py) |
| **拉 volume + turn 5y 脚本**（★ commit 4.15）| [`scripts/fetch_volume_history.py`](../../scripts/fetch_volume_history.py) |
| **算信号 C 4 字段脚本**（★ commit 4.16）| [`scripts/calc_signal_c.py`](../../scripts/calc_signal_c.py) |
| **pcb.auto.js 一次性清理脚本**（★ commit 4.23）| [`scripts/cleanup_pcb_auto_duplicates.py`](../../scripts/cleanup_pcb_auto_duplicates.py) |
| 上市状态预检工具 | [`.claude/plans/tools/pcb-pre-flight-check.js`](../plans/tools/pcb-pre-flight-check.js) |
| 豆包返回幻觉筛查工具 | [`.claude/plans/tools/pcb-hallucination-screen.js`](../plans/tools/pcb-hallucination-screen.js) |
