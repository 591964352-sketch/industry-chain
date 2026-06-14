# 产业链数据 SOP · 通用模板（新增 / 刷新存量）· 三步版

> 适用于**任意产业链**。把 `<赛道id>`（pcb/hbm/semi…）、`<赛道名>`替换成目标链即可。PCB 是黄金范例，所有链对齐它。

---

## 0. 流程（三步接力）

```
CC 盘点(出清单) → Gemini 查(带源+tier)并直接出 PCB-schema 注入块 → CC 注入(带守门校验)
```

页面右上角 🔄 刷新按钮生成的就是"盘点指令"。

⚠️ **取舍提醒**：本版省去了人工复查层。微妙口径错/幻觉若 Gemini 没自查出来，会直接进线上数据。CC 无法联网验真，只能挡"无来源/标存疑"的项。**对没把握的关键数字，随时可单独贴给网页 Claude 做 spot-check（可选、非必经）。**

---

## 1. 角色分工

| 角色 | 联网 | 职责 |
|---|---|---|
| **CC** | ❌ | ① 盘点(出清单) ② 注入(带守门：无源/存疑项不写、留旧值) ③ 结构/双校验。**绝不自己查数、绝不编造。** |
| **Gemini** | ✅ | 核实每个数字(带源+tier+口径)，**自跑质检**，**直接输出 PCB schema 注入块**。 |
| **你** | — | 传递 + 拍板"通过"；可选把可疑数贴给网页 Claude spot-check。 |

---

## 2. 不做假铁律

1. **CC 不查不编**：只出清单 + 注入已核数据。
2. **查必带源**：每数有出处；关键数(市占/缺口/CAGR/PE)≥2 独立源、优先 primary/broker、排除单一 media。
3. **核不到留旧标待更新**，**绝不用估算覆盖真实数据**。
4. **该刷才刷日期**：硬数据变才动"数据截止"日；纯六维主观(🆪)不动。
5. **估值/PE 带 valAsOf**；注释 PE 带"(截至X日)"。

## 3. 信源四档（TIER_RULES）
- primary 🟢 一手：财报/公告/巨潮cninfo/交易所
- broker 🔵 券商·机构：券商研报/Prismark/协会
- media ⚪ 自媒体：股吧/财富号/雪球 → **单一来源关键数标"存疑(待核)"**
- estimate 🆪 推断：AI 主观/测算（六维分本身属此档）

---

## 4. 场景 A：刷新存量链 `<赛道id>`

### A1 · 给 CC（盘点 · 不联网不改数据）
```
【全量刷新 <赛道id> · 第1步：出待核清单 · 不联网不改数据】
你联网不通，本步只"盘点"、不改任何数据：
1. 扫描 data/<赛道id>.js，把所有"会变的事实"按四类列出：
   ① overview 宏观(市场规模/CAGR/缺口/国产化率/产业阶段)
   ② 卡口 chokePoints(财报数/市占/PE·pePercentile/风险点)
   ③ 各 segment 个股(最新季报营收/净利/同比/市占/PE/风险)
   ④ 六维 prosperity(各维 reason 引用的硬数据)
2. 每项给：字段路径 + 当前值 + 当前 asOf + 当前 tier + 建议重核?
3. 输出结构化"待核清单"(markdown 表)，我交给联网端核实。
不改数据、不动日期、不 commit。
```

### A2 · 给 Gemini（查 + 直接出注入块 · 用第 6 节模板）
把 A1 清单 + 第 6 节模板发给 Gemini，它直接产出 PCB schema 注入块。

### A3 · 给 CC（注入 · 不联网 · 带守门）
```
【全量刷新 <赛道id> · 注入已核数据 · 不联网 · 守门校验】
这是 Gemini 核实并按 PCB schema 产出的注入块。注入 data/<赛道id>.js 规则：
【守门 · 先过滤再写】
  - 任何数据点缺"来源"或缺"tier" → 不写，保留旧值，列入"被拒清单"报我。
  - 任何标"存疑/待核"的关键数 → 保留旧值 + 标"截至X日待更新"，不覆盖。
  - 单位/口径异常(如 PE 突然翻数倍、市占>100%、季度环比异常) → 不写，列入"存疑清单"报我。
【正常注入】
  - 通过守门的项：逐字段更新 值+asOf+tier。
  - 硬数据(财报/市占/缺口)有变 → 刷对应"数据截止"日；纯六维主观(🆪) → 不动日期。
  - 六维 dims6 若给了新值，按 PCB schema 更新；computeFit/个股分/擂台自动重算。
逐项报告 旧值→新值+tier+来源 + "被拒/存疑清单"，双校验(node自检/全链加载/抽查六维卡+擂台)，等"通过"再 commit。
```

---

## 5. 场景 B：新增链 `<赛道名>`

### B1 · 给 Gemini（研究全景 + 出整链注入块）
用第 6 节模板，范围设为"整条链"：赛道宏观(规模/CAGR/缺口/产业阶段/政策/周期) + 环节拆解(材料→设备→制造→下游→侧枝，每环节 3-5 家代表公司及最新季报/市占/PE/风险) + 卡口候选(寡头/认证/替代缺位及依据)。**直接输出 PCB schema 的完整 data/<赛道id>.js 数据块。**

### B2 · 给 CC（建链 · 不联网 · 带守门）
```
【新增 <赛道名>(<赛道id>) · 建链 · 不联网 · 守门校验】
这是 Gemini 按 PCB schema 产出的完整链数据块。建链：
【守门】缺源/缺 tier/标存疑/口径异常的项 → 不写或留空标待核，列清单报我，不编造补齐。
1. 新建 data/<赛道id>.js 写入数据块(meta/prosperity/cyclePosition/plainIntro/overview/treeMap/segments/midstream/fourQuestions/chokePoints/supplyGap)。
2. 三处必改：manifest 加载 + sidebar-nav 加 nav-item + CHANGELOG 记录。
3. 保持 PCB schema(见第 8 节)；computeFit/个股分/擂台自动纳入。
双校验(node自检/全链加载/破坏该文件验容错/抽查六维卡+卡口+擂台多一行)，报告改动+守门清单，等"通过"再 commit。
```

---

## 6. Gemini 查询模板（通用 · 查 + 自查 + 出注入块）

```
你是 A 股产业链投资研究的数据核查员。我要核「<赛道名>」。联网核实并严格遵守：

【纪律】
- 每个数字给来源(网站名+链接+日期)；关键数(财报/市占/缺口/PE)≥2 独立来源。
- 财报/估值类必须落一手(财报/公告/巨潮cninfo/交易所)，不能只用自媒体。
- 标 tier：primary/broker/media/estimate。仅 media 单一来源的关键数标"存疑(待核)"。
- 估值/PE 带"截至X日"。查不到写"待核"，绝不编造或估算精确数字。
- 写清口径：国产自给率 vs 某厂市占？美元 vs 人民币？TTM vs 年度？

【自查(输出前自己跑一遍，等于替我做质检)】
1. 有没有把财富号/股吧当成券商了？(纠正 tier)
2. 单位/口径有没有串？(¥/$、国产化率/市占、TTM失真)
3. 有没有遗漏重大风险？(实控人被查/减持/诉讼/订单不及预期)
4. 每个精确数字是否真有≥2 来源？(否则标存疑)
5. 估值是否带 asOf？

【要查的内容】
<粘贴 CC 的待核清单 / 或新增链则列环节+个股+赛道宏观>

【输出：直接给 PCB schema 注入块】
- 赛道级 prosperity.dims[6]：每维 {key,name,score(1-5),trend,reason(含硬数据),evidence(来源+日期),flag,tier}；verdict 对象{longTermFit,oneLine,stockHint}。
  六维标尺：景气持续性/业绩可见度/政策确定性/供需紧张度/估值性价比(5=最便宜！方向翻转)/壁垒安全垫，各 1-5。
- 每只个股：{name,code,barrier档,dims6[6维 key/score/trend],dims6Note(含财报数+来源),tier,valAsOf}；dims6 的 barrier 维分=barrier 档映射(极高5/高4/中高3/中2/低1)。
- 卡口：howToCheck + falsifySignal + valuation(pePercentile+asOf) + 风险点。
- 每个数字旁标 tier 和来源；存疑项明确标出。不给买卖建议。
```

---

## 7. PCB 黄金范例 schema（对齐用）
- 六维：`prosperity.dims[]` 每维 `{key,name,score,trend,reason,evidence,flag,tier}`；`verdict` 为对象。⚠️**禁止压缩格式**(否则六维卡渲染失败)。
- 个股：每股 `dims6[]`+`dims6Note`+`tier`+`code`+`valAsOf`；dims6 的 barrier 维=barrier 档映射分。
- 综合分：`computeFitFromDims` 唯一权重(dur.25/vis.25/val.20/sup.12/bar.10/pol.08)；门控 valuation≤1 或 barrier≤1→封顶60；档 ≥75🟢/55-74🟡/<55🔴。
- 卡口：howToCheck+falsifySignal+valuation(pePercentile+asOf)；风险作 ⚠️ 提示、不改 barrier。
- 环节：材料→设备→制造→下游→侧枝；barrier 降序；制造商 choke:false 但有 dims6。
- 箭头：up绿/down红/flat灰；高分 flat 上色(score≥4→绿 / barrier 高档→金)。

## 8. CC 注入后自检
- node 自检 OK / 全链加载 / 破坏 data 文件验容错 / barrier 降序未破 / 六维卡+卡口+个股分+擂台渲染正常。
- 报告 旧→新+tier+来源 + 守门"被拒/存疑清单"；🆪 不刷数据截止日、硬数据变才刷；**等"通过"再 commit**。

---

*本 SOP 为研究框架数据治理流程，不构成投资建议。数据以一手财报/公告为准。省去人工复查后，数据真实性主要依赖 Gemini 自查 + CC 守门，必要时仍可人工 spot-check。*
