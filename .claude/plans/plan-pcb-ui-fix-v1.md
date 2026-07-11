# PCB 产业链看板优化 · 执行计划 v1（待确认）

> **状态**：Step 0 开工前计划·等用户确认后进阶段一
> **天然还原点**：`192ee85`（HBM R1 完成态）
> **前置规则**：CLAUDE.md §6 全部纪律 + §6.8 数据准确度优先 + §6.9 双重检查 + §6.10 三重验证 + §6.11 prompt 11 条硬约束

---

## 0. 背景与冲突消化

### 0.1 与旧 session-summary-pcb-ui-fix.md 的冲突点（5 项已细化）

| # | 旧 summary 状态 | 新提示词决策 | 处置 |
|---|---|---|---|
| 1 | ⑥「待确认·固定 3 vs 动态」 | **动态化**（程序筛 tier≥★★☆）+ 手动参考名单另开 | ✅ 采纳 |
| 2 | 无 | **新增字段** investable + region（可投/参考分离） | ✅ 采纳 |
| 3 | 无 | **新增物理分层** pcb.manual.js + pcb.auto.json 双文件 | ✅ 采纳 |
| 4 | 数据源「路径 C 券商研报」 | **改路径** akshare 主 + baostock 备·自己算 5 年分位 | ⚠️ **覆盖旧决策·需用户确认** |
| 5 | 无入场区间字段 | **新增派生字段** pe@30% + pe@70% | ✅ 采纳 |

### 0.2 与 CLAUDE.md 既有规则的对齐检查

| 规则 | 落实点 |
|---|---|
| §6.2 不丢字段 | 阶段二做单点真理时，原 segments[].stocks[].dims6 字段**原样保留**到 STOCK_REGISTRY（不删） |
| §6.3 src URL 必填 | 阶段三自动层 `source` 字段必带 URL（akshare 接口文档 / 同花顺手动核对截图） |
| §6.4 ≥2 独立来源 | 自动层 pe_ttm 走 akshare + baostock 双源，差异>5% 标 ⚠️数据存疑 |
| §6.5 概念票不算数 | 阶段二把"参考主体"（国外卡脖子）独立出 segments·**不计入 stock 总数** |
| §6.8 数据准确度优先 | 阶段三估值回填**宁可 R3-19 全量不跑完**，也不许脚本写坏数据；adapter 必须报错不静默 |
| §6.9 双重检查 | 阶段三每次跑脚本前再跑 pcb-pre-flight-check.js（保护退市标的） |
| §6.10 三重验证 | 阶段二拆文件后·old pcb.js 与 new pcb.manual.js 的 stock/code/name 三重校验 |
| §6.11 prompt 11 条 | 阶段三脚本**所有 akshare 调用**前先在 SKILL.md 加 §adapter 报错模板 |
| 分阶段 commit | 每个 commit 单独·中文 message 描述内容变化 |
| 阶段边界停下等确认 | 阶段一末 / 阶段二末各停一次 |

---

## 1. 总原则（贯穿全程 · 硬约束）

### 1.1 五原则（直接抄 §1 提示词）
1. **不造数**：🔵(akshare/券商/官方) 与 🆪(AI主观) UI 视觉区分·🆪 不冒充结论
2. **单点真理**：dims6 / valuation / 注解以 **stock code 为键**·多段引用同一份
3. **派生优先**：能从底层数据按规则推出的（卡口成员、信号命中、入场区间、景气度），一律程序派生
4. **手动/自动物理分层**：
   - **手动层**（人工填·脚本只读不写）：dims6 六维护城河打分 / tier 评级 / 卡口注解 / 可投标记 / region / 景气度人工覆盖值
   - **自动层**（脚本生成）：现价 / pe_ttm / pePercentile / fromHigh / 入场区间(30/70分位PE) / asOf / source / akshare 版本戳
5. **脚本永不覆盖手动字段**：刷新脚本只重写 *.auto.json / pcb.auto.json，**绝不触碰 pcb.manual.js**

### 1.2 tier 视觉重做规范
- 旧：`●★★☆`（圆点 + 星号·视觉不直观）
- 新：`🔴 极高` / `🟠 高` / `🟡 中` / `⚪ 低`（圆点 + 中文·视觉直观）
- 映射：T0=极高(🔴) / T1=高(🟠) / T2=中(🟡) / T3=低(⚪)
- 注：tier 数值字段本身（T0/T1/T2/T3）不变·只改渲染函数

---

## 2. 阶段一 · 纯前端 UI 修复（零数据依赖·低风险·先做）

> 范围：仅改 `index.html` 主 inline script（CSS + 渲染函数），**不动 data/*.js**
> 验收：13 赛道 renderChain 全不报错 + 容错 guard 不出红卡

### 2.1 Commit 拆分（4 个 commit）

#### Commit 1.1 · ① trend 箭头颜色 fix
- **范围**：`trendBadge()` 函数 + `.tg-gray` CSS 类
- **现状 bug**：flat / → / 持平走红色
- **修法**：`trend === 'flat'` 或箭头字符为 `→` 时加 `tg-gray` class
- **不动**：trend 数值本身 / trendNote 文案 / trendBadge 其他分支
- **验收**：刷 PCB 页面 + 找一处 trend='flat' 的 stock + DevTools 检查 className 含 `tg-gray`
- **风险**：🟢 极低·纯样式

#### Commit 1.2 · ② 主表排版三类 fix
- **范围**：`segments[].stocks` 主表渲染函数（PCB 主表的渲染代码·grep `barrier` 在主表附近的 render 函数）
- **修法 3 项**：
  1. 壁垒评级（极高/高）**不换行** → CSS `white-space: nowrap` 套 tier badge 单元格
  2. tier 圆点后字母重做 → 按 §1.2 改 `●★★☆` 为 `🔴 极高 / 🟠 高 / 🟡 中 / ⚪ 低`
  3. 列宽重分 → 用 `colgroup` + `<col style="width:XX%">` 给主表 6 列固定百分比（品名 18% / tier 14% / 主营 24% / 壁垒 14% / 趋势 12% / 信号 18%）
- **不动**：表格数据 / 表头文字 / 行内 chip
- **验收**：浏览器硬刷 PCB 页面 + 主表无挤压无留白 + 极高/高 不换行
- **风险**：🟡 中·列宽改了可能影响其他表格·但本 commit 只动主表 selector

#### Commit 1.3 · ⑤ 卡口表溢出 fix
- **范围**：chokePoints 表格渲染 + verification 面板渲染
- **修法 3 项**：
  1. 横向滚动条删除 → `.choke-card` 加 `overflow-x:hidden` + 表格加 `table-layout:fixed; width:100%`
  2. 长字段换行/截断 → 加 CSS `word-break:break-word; max-width:XXXpx` 给 `verification` / `logic` / `evidence` 单元格
  3. 展开按钮 → 长字段超过 80 字自动加 `📖 展开` 按钮（点击切换 max-height）
- **不动**：chokePoints 数据 / valuation 字段 / tier 评级
- **验收**：DevTools 检查 .choke-card 父容器无 `overflow-x:auto` + 浏览器无水平滚动
- **风险**：🟡 中·展开按钮是新增 JS·需测试点击交互

#### Commit 1.4 · ③ 通篇推广
- **范围**：`index.html` 主 inline script 里**所有表格渲染函数**（grep `table` + `segments` + `midstream` + `fourQuestions` + `treeMap`）
- **推广项**：
  1. tier 视觉重做（全站统一切换）
  2. 列宽自适应（每个表给 colgroup）
  3. 长字段展开按钮（统一函数 `attachExpandButtons()`）
  4. word-break 通用规则
- **不动**：通篇只改样式 + 通用展开函数·不改任何赛道数据
- **13 赛道全量过**（不只是 PCB）：每个赛道 renderChain 都跑一次不报错
- **验收**：浏览器硬刷 13 个赛道 + 每赛道至少打开 1 张表无错位
- **风险**：🟠 中高·涉及表格多·可能漏改某表·需 grep 验证

### 2.2 阶段一验收清单

```
□ 1. trend='flat' 的 stock 在浏览器里显示灰色（不是红色）
□ 2. PCB 主表"极高"评级不换行
□ 3. PCB 主表 tier 列显示「🔴 极高 / 🟠 高 / 🟡 中 / ⚪ 低」（不是 ★★☆）
□ 4. PCB 主表 6 列宽度合理·无挤压无留白
□ 5. PCB chokePoints 表无横向滚动条
□ 6. PCB chokePoints 长字段点击「📖 展开」可展开/收起
□ 7. 13 赛道 renderChain 全部不报错（容错 guard 不出红卡）
□ 8. 控制台无 JS 报错
□ 9. 改动只在 index.html 主 inline script·data/*.js 字节级未变
```

**阶段一末停下·等用户确认再进阶段二**。

---

## 3. 阶段二 · 数据模型改造（单点真理 + 可投/参考 + 动态卡口）

> 范围：拆 `data/pcb.js` → `data/pcb.manual.js` + `data/pcb.auto.json`（pilot 赛道）
> 同时新增 `STOCK_REGISTRY`（以 stock code 为键的全站真相来源）+ `data/pcb.manual.js` 删冗余副本

### 3.1 文件结构设计

```
data/
├── pcb.manual.js          # 手动层（人工填·脚本只读）
├── pcb.auto.json          # 自动层（脚本生成·git 提交）
├── pcb.js                 # 兼容壳（require 时合并 manual + auto + 注入 CHAINS）
├── semi.js                # 其他赛道暂不动
├── ... (其余 11 条)
```

### 3.2 pcb.manual.js 数据结构（核心字段）

```js
// 手动层——dims6 + tier + 卡口注解 + 可投标记
window.PCB_MANUAL = {
  // ★ 单点真理：每只 stock 一份
  stocks: {
    '300476': {  // 胜宏科技
      code: '300476',
      name: '胜宏科技',
      segments: ['6_AI_PCB'],   // 出现段·多段不重复 dims6
      tier: 'T1',                // 高
      dims6: {
        durability:  {key:'durability',  score: 4, trend:'up',   reason:'AI 服务器板订单锁定到 26Q3'},
        visibility:  {key:'visibility',  score: 3, trend:'flat', reason:'订单可见度 1-2 季'},
        policy:      {key:'policy',      score: 4, trend:'up',   reason:'国产替代政策直接受益'},
        supply:      {key:'supply',      score: 3, trend:'flat', reason:'HVLP4 铜箔供给偏紧但有缓解'},
        valuation:   {key:'valuation',   score: 3, trend:'down', reason:'PE 分位 65% 偏贵'},
        barrier:     {key:'barrier',     score: 5, trend:'up',   reason:'高阶 AI PCB 工艺壁垒 18 个月'}
      },
      investable: true,
      region: '国内'
    },
    '300395': {  // 菲利华（卡脖子参考·国外卡源代表）—— 注意 region='国外' / investable=false
      code: '300395',
      name: '菲利华',
      tier: 'T2',  // 参考·不参与卡口动态化
      investable: true,
      region: '国内',
      dims6: {...},
      replacementCode: null  // 此例为国内·无 replacement
    }
  },
  chokePoints: {  // 注解·以 code 为键（与 segments.stocks 共用 STOCK_REGISTRY 的 tier）
    '300476': {logic:'...', valuation:{pe:..., pePercentile:..., grossMargin:..., fromHigh:..., asOf:..., note:'🆪 ...'}, flag:'核心'},
    '002916': {logic:'...', ...},
    '002463': {logic:'...', ...}
  },
  prosperity: {  // 景气度——可人工覆盖·偏离汇总值必填 reason + 🆪
    dims: {
      durability:  {score: 4.2, reason:'...'},
      visibility:  {score: 3.8, reason:'...'},
      policy:      {score: 4.0, reason:'...'},
      supply:      {score: 3.5, reason:'...'},
      valuation:   {score: 3.3, reason:'...'},
      barrier:     {score: 4.5, reason:'...'}
    },
    override: null  // 如填 {durability: {score: 5, reason:'🆪 人工上调：英伟达 GB300 订单超预期'}, ...}
  },
  // 卡口"参考主体"——非 A 股卡脖子（如三井高科 / IBIDEN）·只存名字 + 壁垒 + 可选 replacementCode
  referenceChokepoints: [
    {name:'三井高科', region:'日本', barrier:'ABF 膜', replacementCode:'002916'},
    {name:'IBIDEN',   region:'日本', barrier:'FC-BGA 载板', replacementCode:'002436'},
    {name:'Resonac',  region:'日本', barrier:'BT 载板', replacementCode:'—'}
  ]
};
```

### 3.3 pcb.auto.json 数据结构（自动层）

```json
{
  "_meta": {
    "asOf": "2026-06-23",
    "akshareVersion": "1.18.60",
    "baostockVersion": "0.8.9",
    "window": "5y"
  },
  "valuations": {
    "300476": {
      "price": 86.5,
      "pe_ttm": 24.3,
      "pePercentile": 0.62,
      "fromHigh": -0.18,
      "entryZone": {"p30": 18.2, "p70": 31.5},
      "source": {
        "pe": "akshare.stock_a_indicator_lg",
        "verify": "baostock.query_history_k_data"
      },
      "akshareStamp": "1.18.60/2026-06-23"
    },
    "002916": {...},
    ...
  }
}
```

### 3.4 pcb.js 兼容壳逻辑

```js
// data/pcb.js——加载时合并 manual + auto + 注入 CHAINS
window.CHAINS = window.CHAINS || {};
(function(CHAINS){
  const manual = window.PCB_MANUAL || {};
  // 自动层 JSON 通过 document.write 注入在前（见 manifest 调整）
  const auto = window.PCB_AUTO || {};
  
  // ① 单点真理：以 stock code 为键的 STOCK_REGISTRY
  const REGISTRY = {};
  Object.keys(manual.stocks || {}).forEach(code => {
    REGISTRY[code] = manual.stocks[code];
    // 自动层估值合并进来（手动层 tier 不被覆盖）
    if (auto.valuations && auto.valuations[code]) {
      REGISTRY[code].valuation = auto.valuations[code];
    }
  });
  window.STOCK_REGISTRY = window.STOCK_REGISTRY || {};
  Object.assign(window.STOCK_REGISTRY, REGISTRY);
  
  // ② 派生 segments.stocks（按 segments 引用 REGISTRY·不再硬编码 dims6）
  const SEGMENTS = [
    {name:'覆铜板 CCL', stocks: [
      {code:'600183'}, {code:'002636'}, {code:'603002'}, ...
    ]},
    ...
  ];
  SEGMENTS.forEach(seg => {
    seg.stocks = seg.stocks.map(s => REGISTRY[s.code]);
  });
  
  // ③ 派生 chokePoints 可投名单 = REGISTRY 中 tier∈{T0,T1} 的 code 集合
  // ④ 派生景气度综合分 = REGISTRY 各 stock dims6 均值（除 override 字段）
  // ⑤ 渲染函数读 REGISTRY 而非 stocks[i].dims6
  
  CHAINS.pcb = {...完整 schema...};
})(window.CHAINS);
```

### 3.5 ④ 胜宏 300476 不一致 fix

- **根因诊断**（先做）：grep `300476` 在 data/pcb.js 中找 dims6 出现处，**必有几处副本**
- **修法**：
  1. 在 `data/pcb.manual.js` 建 `stocks['300476']` 单点
  2. 原 `segments[6].stocks` 引用 `{code:'300476'}`·不存 dims6
  3. 原 `midstream.stocks[0]` 引用 `{code:'300476'}`·不存 dims6
  4. 原 `fourQuestions.segments[5].stocks[1]` 引用 `{code:'300476'}`·不存 dims6
  5. 渲染函数读 `REGISTRY['300476'].dims6` 而非 `stocks[i].dims6`
- **验收**：浏览器硬刷 PCB → 300476 在 segments[6] / midstream[0] / fourQ[5] 三处显示的 dims6 综合分**完全一致**

### 3.6 ⑥ 卡口动态化

- **可投卡口**（程序派生）：从 `REGISTRY` 筛 `tier ∈ {T0, T1}` ∩ `investable === true` ∩ `region === '国内'` → 自动写入 `CHAINS.pcb.chokePoints`
- **参考卡脖子主体**（手动名单）：`manual.referenceChokepoints` 数组·**渲染在独立 section**「🌐 卡脖子参考（非 A 股）」·不在 chokePoints 数组里
- **不写死 3 个**·数量由数据决定（PCB 实际可能有 5-8 只 tier≥T1）
- **人工注解保留**：原 chokePoints[].logic / valuation / flag 按 code 移到 `manual.chokePoints[code]`

### 3.7 阶段二 commit 拆分（建议 3 commit）

#### Commit 2.1 · 创建 STOCK_REGISTRY + 手动层文件
- 新建 `data/pcb.manual.js`
- **范围**：把现有 pcb.js 中所有 dims6 / tier / investable 字段**抄出来**到 pcb.manual.js 的 `stocks` 字典
- **验证**：旧 pcb.js 数据**原样保留**·只是搬到 manual.js
- **风险**：🟡 中·字段抄错·需三重验证（code / 段位 / name）

#### Commit 2.2 · 创建自动层模板 + 兼容壳
- 新建 `data/pcb.auto.json`（首次·全部估值字段为 null）
- 新建 `data/pcb.js` 兼容壳（合并 manual + auto + 派生）
- **范围**：只搭骨架·估值字段 null
- **验证**：浏览器硬刷·页面**功能不变**·只是底层改了

#### Commit 2.3 · ④ 300476 单点真理 fix + ⑥ 卡口动态化
- **范围**：所有段位引用 `{code:xxx}` 而非 `{code:xxx, dims6:..., tier:...}`·渲染读 REGISTRY
- **④ 验收**：300476 三段 dims6 完全一致
- **⑥ 验收**：chokePoints 数量 = REGISTRY 中 tier≥T1 的 code 数（≠ 固定 3）

### 3.8 阶段二验收清单

```
□ 1. data/pcb.manual.js 含 38 只 stock 的完整手动层数据
□ 2. data/pcb.auto.json 存在·估值字段全 null（阶段三填）
□ 3. data/pcb.js 兼容壳正确合并 manual + auto
□ 4. 300476 在 segments[6] / midstream[0] / fourQ[5] 三处显示 dims6 完全一致
□ 5. chokePoints 数量 ≠ 固定 3（按 tier 自动筛）
□ 6. 参考卡脖子主体（三井/IBIDEN/Resonac）独立 section 渲染·不进 chokePoints
□ 7. 13 赛道全部 renderChain 不报错（仅 pcb.js 改了·其他赛道不变）
□ 8. 改动后 pcb.js 数据与改前 pcb.js 数据语义完全一致（仅重构·无功能差异）
```

**阶段二末停下·等用户确认再进阶段三**。

---

## 4. 阶段三 · 自动刷新管线 + 买入信号

> 范围：新增 Python 刷新脚本 + akshare/baostock 数据获取 + 买入信号 A/B 模块
> 路径：`scripts/refresh_pcb_valuation.py`（本机跑·不在浏览器）

### 4.1 数据源决策（待用户最终确认）

| 路径 | PE-TTM | PE 分位 | 速度 | 合规性 | 旧决策 | 新决策 |
|---|---|---|---|---|---|---|
| **akshare 主** | ✅ stock_a_indicator_lg | 自己算（5 年窗口） | 快 | 🔵 官方接口 | _ | **✅ 采纳** |
| **baostock 备** | ✅ query_history_k_data | 自己算 | 中 | 🔵 官方接口 | _ | **✅ 采纳** |
| C · 券商研报 | ✅ | ✅ | 慢 | 🔵 broker | 旧 ✅ | ❌ 覆盖 |

**覆盖旧决策的理由**：
- 旧决策需要 31 只 stock 逐只找券商研报·人工成本高
- 新决策用 akshare 批量接口 + 自己 numpy/pandas 算分位·**速度从 O(31×N研报) 降到 O(31×1次接口调用)**
- 双源（akshare+baostock）做交叉对账·保留 ≥2 独立来源原则
- ⚠️ **需用户确认接受这个路径变更**

### 4.2 准确性护栏（§6.8 + §6.3 落实）

| 护栏 | 落实 |
|---|---|
| 统一口径 pe_ttm | config 默认 pe_ttm·`source` 字段记录 |
| 统一窗口 5 年 | config.WINDOW_YEARS=5（可调） |
| 亏损股 EPS<0 跳过 | 算分位前先查 eps>0·否则标 `pePercentile:null, flag:'亏损/PE无意义'` |
| 双源差异>5% 报警 | akshare vs baostock pe_ttm 对比·差异>5% 标 `flag:'⚠️数据存疑'` |
| adapter 改名报错 | 每个 akshare 调用包 try/except·**接口改名/缺字段必须 raise**（不写坏数据） |
| 版本戳 | 每字段盖 `source + asOf + akshare版本` |
| 同花顺手动核对 | 跑完抽 3-5 只·同花顺「个股→财务/简况→估值分析→改 5 年」路径核对 |
| pin akshare 版本 | requirements.txt 写死 `akshare==1.18.60` |

### 4.3 派生字段清单

| 字段 | 类型 | 来源 | 说明 |
|---|---|---|---|
| `price` | float | akshare 现价接口 | 实时 |
| `pe_ttm` | float | akshare 历史 PE-TTM 序列最新值 | 🔵 |
| `pePercentile` | float | numpy.percentile(pe_series, current_pe) | 🔵·5 年窗口 |
| `fromHigh` | float | (price - high_5y) / high_5y | 🔵 |
| `entryZone.p30` | float | numpy.percentile(pe_series, 30) | 🔵·入场区间下沿 |
| `entryZone.p70` | float | numpy.percentile(pe_series, 70) | 🔵·入场区间上沿 |
| `asOf` | string | 跑脚本日期 | 🔵 |
| `source` | object | `{pe: 'akshare...', verify: 'baostock...'}` | 🔵 |
| `akshareStamp` | string | `1.18.60/2026-06-23` | 🔵 |

**入场区间输出形态**：「当前 PE 24x（分位 62%）；30% 分位 ≈ 18x → 跌到 ~18x 可关注」

### 4.4 买入信号 A/B 模块

#### 阈值常量（具名 config·阶段三末校准）
```js
// data/_signal_thresholds.js（13 赛道共用）
const SIGNAL_THRESHOLDS = {
  PE_PCTL_A: 50,        // 上车点阈值（功能 A）
  PE_PCTL_B: 40,        // 卡口但低估阈值（功能 B·更严）
  SIXDIM_MIN: 4.0,      // 六维综合分阈值
  BARRIER_DOWN_FORBID: true  // barrier 维 trend==='down' 一票否决
};
```

#### 功能 A · 上车点
- **位置**：chain 视图新增 section「📍 上车点分析」·位置待定（建议放「③ 卡口」之前）
- **筛选条件**：`barrier.score ∈ {4,5}` ∩ `pePercentile < 50` ∩ `barrier.trend !== 'down'`
- **展示**：表格 3 列（股票名 / 当前 PE 分位 / 趋势）+ 一句话上车理由
- **排除**：`investable === false` ∪ `region !== '国内'` ∪ `pePercentile === null`（亏损股）
- **回填前**：命中项 🆪 占位「数据待核实」

#### 功能 B · 卡口但低估
- **位置**：紧跟功能 A 之后
- **标题**：`📍 卡口但低估：市场尚未定价的机会`
- **筛选条件**：命中可投卡口（`chokePoints[].code` 列表）∩ `pePercentile < 40` ∩ `barrier.trend !== 'down'`
- **展示**：每条卡口标的·PE 分位数字 + 一句话"市场尚未定价"理由 + 链接到对应卡口卡（锚点跳转）
- **排除规则同 A**
- **回填前**：同上 🆪 占位

### 4.5 ⑦ 卡口六维偏低说明

- **位置**：每张 choke-card 底部（在 methodologyNotes 之前）
- **写作模板**：
  ```
  ▸ 为什么综合分看起来低？
  壁垒（如高阶 AI PCB 工艺）被国外 X 攥着 → 国内 Y 是国产替代标的 →
  barrier 维高分来自「替代确定性」，但 visibility（订单可见度）/ supply（HVLP4 铜箔供给偏紧缓解中）等维天然不高，
  故综合分被拉低。判断壁垒强弱请以 barrier 单维为准，不看综合分。
  ```
- **来源**：`methodologyNotes` 风格·每只卡口标的单独写一段
- **数据位置**：`data/pcb.manual.js` 的 `chokePoints[code].lowScoreNote`

### 4.6 阶段三 commit 拆分（建议 5 commit）

#### Commit 3.1 · 创建 scripts 目录 + akshare 拉数脚本
- 新建 `scripts/refresh_pcb_valuation.py`
- 范围：只跑 akshare 拉 38 只 stock 的 pe_ttm 历史序列 → 写 `data/pcb.auto.json`（不含分位）
- 风险：🟠 中高·akshare 接口可能改名·需 §6.11 adapter 报错

#### Commit 3.2 · 加入 baostock 交叉对账 + 分位计算
- 范围：双源拉数 + numpy 分位 + 差异报警
- 风险：🟠 中高·双源对账逻辑

#### Commit 3.3 · 估值字段回填 manual 层 tier 标识 stock
- 范围：把 valuation 自动注入 REGISTRY['xxx'].valuation
- 验收：浏览器·segments[].stocks[].valuation 不再 undefined
- 风险：🟡 中

#### Commit 3.4 · 买入信号 A/B 模块
- 范围：chain 视图新增 2 个 section + 阈值常量
- 验收：浏览器看 PCB·命中项表格正常显示
- 风险：🟡 中·需真实数据校准阈值

#### Commit 3.5 · ⑦ 卡口六维偏低说明 + 景气度 override
- 范围：choke-card 底部加 lowScoreNote + prosperity override 字段
- 风险：🟢 低·纯文案

### 4.7 阶段三验收清单

```
□ 1. scripts/refresh_pcb_valuation.py 跑成功·38 只 stock 全部回填
□ 2. 双源差异>5% 的 stock 全部标 ⚠️数据存疑
□ 3. 亏损股 PE 分位=null 不参与信号计算
□ 4. akshare 版本戳写入·source 字段含 URL
□ 5. 同花顺手动核对 3-5 只 stock 分位一致
□ 6. 买入信号 A 命中项数 ≥0·表格渲染正常
□ 7. 买入信号 B 命中项数 ≥0·表格渲染正常·锚点跳转可用
□ 8. 卡口六维偏低说明在每张 choke-card 底部显示
□ 9. 景气度 override 字段存在·偏离汇总值时 reason + 🆪 标记
□ 10. 13 赛道全部 renderChain 不报错
```

---

## 5. 景气度设计（阶段二 + 阶段三各做一半）

### 5.1 派生为主
- **默认**：从该赛道 REGISTRY 各 stock 的 dims6 各 dim 求均值 → 6 维景气
- **程序实现**：`data/pcb.js` 兼容壳内 `deriveProsperity(REGISTRY)` 函数
- **输出**：`CHAINS.pcb.prosperity.dims[dim].score = mean(REGISTRY.stocks[*].dims6[dim].score)`

### 5.2 可人工覆盖
- **override 字段**：`data/pcb.manual.js` 的 `prosperity.override = {dim: {score, reason}}`
- **强制规则**：
  - override 字段非空 → 该 dim 渲染用 override.score 而非派生 score
  - 偏离派生均值>0.5 → **必须** 填 reason + 🆪 标记
  - reason 文案 ≥10 字·说明偏离理由

---

## 6. 长期红利（不在当前批次强求）

> 每次刷新 git commit 数据文件 = 免费时间序列快照
> 攒几次后·trend ↑↓→ 可从真实快照差值算出（🆪 升级 🔵）·替代现在手设的箭头
> 后续阶段·不在本次工作范围

---

## 7. 风险矩阵

| 风险 | 等级 | 触发条件 | 缓解 |
|---|---|---|---|
| akshare 接口改名 | 🟠 中高 | `stock_a_indicator_lg` 缺字段/404 | adapter try/except + 报错不静默 + pin 版本 |
| 30 只 stock 字段抄错 | 🟡 中 | 阶段二拆 manual.js | §6.10 三重验证 + 跑预检工具 |
| tier 视觉重做漏改某表 | 🟡 中 | 阶段一 commit 1.4 | grep `★★☆` 验证 0 处 + 13 赛道全过 |
| 胜宏 300476 仍有副本 | 🟢 低 | 阶段二 commit 2.3 | 浏览器硬刷 + 三处对比综合分 |
| 卡口动态化数量≠预期 | 🟢 低 | tier≥T1 的 code 数 | 文档化「PCB 实际可能 5-8 只」·非 bug |
| 双源 PE 差异>5% 频繁 | 🟡 中 | akshare vs baostock 数据源差异 | 标 ⚠️ 数据存疑·不静默采信 |
| 买入信号阈值需校准 | 🟡 中 | 阶段三末用真实数据回测 | config 字段可调·不硬编码 |
| HBM R2 恢复延期 | 🟢 低 | PCB 工作超时 | 阶段三末给 HBM R2 启动条件清单 |

---

## 8. 紧急回滚

```bash
# 阶段一任一 commit 后回滚（仅 UI 改动·数据未动）
git reset --hard 192ee85

# 阶段二拆文件后回滚（兼容壳失败）
git revert <commit-2.1>..<commit-2.3>

# 全量回滚
git reset --hard 192ee85
```

---

## 9. HBM R2 恢复节点

**条件**：阶段三 commit 3.5 完成 + 验收清单 10 项全过

**步骤**：
1. 复用 `scripts/refresh_pcb_valuation.py` 跑 hbm.manual.js 的 31 只 stock
2. 产出 `data/hbm.auto.json`
3. 合并到 `data/hbm.js` 兼容壳
4. `meta.status` `partial → active`
5. commit：「feat: HBM R2 估值回填（31只akshare+baostock双源+分位自动计算）」

---

## 10. 等待用户确认项

1. ⚠️ **数据源路径覆盖**：旧决策 C（券商研报）→ 新决策 akshare+baostock·是否接受？
2. ⚠️ **阶段一 4 commit 拆分**是否合理？如想合并为 1 commit 也可
3. ⚠️ **阶段二 3 commit 拆分**是否合理？
4. ⚠️ **阶段三 5 commit 拆分**是否合理？
5. ⚠️ **手动/自动物理分层**（pcb.manual.js + pcb.auto.json 双文件）是否符合预期？或仅用单文件 + 字段区分？
6. ⚠️ **胜宏 300476 三处副本** 是否需要先 grep 出具体位置再确认 commit 2.3 改法？
7. ⚠️ **可投/参考分离**字段命名 `investable + region` 是否合适？或用 `tradable + market`？

**确认后我开阶段一 commit 1.1（trend 箭头颜色）**。
