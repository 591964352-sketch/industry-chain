# 10 条赛道字段对照卡(S1-S10)· 2026-06-14

> **本文件 = 阶段三 3A.2 产出**。基于 [chain-research-template.md §0](./chain-research-template.md) 15 顶层字段清单,逐条扫描 10 条存量赛道(`semi`/`ai-server`/`robotics`/`autonomous-driving`/`power-semi`/`ai-apps`/`cpo`/`solid-battery`/`low-altitude`/`commercial-aero`)的字段完成度,标"已填 / 缺 / 待核"三态。
>
> **本步只盘点、不改任何数据**。等用户决策"哪条先走完整 SOP"。
>
> **纪律**:
> - 字段口径严格按 [chain-research-template.md](./chain-research-template.md)
> - tier 四档(primary/broker/media/estimate)、asOf 必填等规则不放松
> - 缺 tier/缺 src/标存疑的关键数 → 保留旧值 + 列"待核清单"(同 refresh-sop.md §2)

---

## 0. 总览(10 条赛道 · 103 只个股 · 28 个卡口 · 19 条 supplyGap)

### 0.1 字段完成度矩阵

| 赛道 id | 段数 | 个股 | 卡口 | supplyGap | FQ 段 | ov 卡 | treeMap 列 | midstream | **15字段齐** | **核心缺** |
|---|---|---|---|---|---|---|---|---|---|---|
| `semi` | 5 | 21 | 3 | 3 | 4 | 10 | **6** ⚠️ | ✓ | 12/15 | meta/prosperity/cyclePosition |
| `ai-server` | 3 | 13 | 3 | 2 | 4 | 8 | 5 | ✓ | 12/15 | 同上 |
| `robotics` | 4 | 10 | 3 | 2 | 4 | 8 | 5 | ✓ | 12/15 | 同上 |
| `autonomous-driving` | 4 | 12 | 3 | 2 | 4 | 8 | 5 | ✓ | 12/15 | 同上 |
| `power-semi` | 3 | 8 | 2 | 2 | 3 | 8 | 5 | ✓ | 12/15 | 同上 |
| `ai-apps` | 4 | 10 | 2 | **0** ⚠️ | **2** ⚠️ | 8 | 5 | ✓ | 12/15 | 同上 + **supplyGap 缺** + **FQ 段偏少** |
| `cpo` | 3 | 10 | 2 | 2 | 3 | 8 | 5 | ✓ | 12/15 | 同上 |
| `solid-battery` | 3 | 7 | 3 | 2 | 3 | 8 | 5 | ✓ | 12/15 | 同上 |
| `low-altitude` | 4 | 6 | 3 | 2 | 3 | 8 | 5 | ✓ | 12/15 | 同上 |
| `commercial-aero` | 3 | 6 | 2 | 2 | 3 | 8 | 5 | ✓ | 12/15 | 同上 |
| **合计** | **36** | **103** | **28** | **19** | **33** | **82** | — | **10/10** | **120/150(80%)** | 3 字段 × 10 赛道 = **30 缺** |

### 0.2 共同缺口(三项必填字段 100% 缺)

10 条赛道**完全同构**缺:
- ❌ `meta`(Header 副标题:`{sector, tier, status, updatedAt, ltFit}`)
- ❌ `prosperity`(6 维景气打分 + verdict)
- ❌ `cyclePosition`(周期位置)

→ **这 3 字段是 10 条赛道"长线/景气/估值"呈现的根基**。不补 → 用户在赛道页看不到「① 景气六维」卡 + 擂台无综合分。

### 0.3 全局 0% 覆盖(三大类硬数据 100% 缺)

| 数据类 | 覆盖 | 备注 |
|---|---|---|
| **卡口 valuation 9 字段** | 0/252(0%) | 28 卡口 × 9 字段 = 252 字段,**全空**(全 0 字段填) |
| **个股 dims6[6] + dims6Note + tier + valAsOf** | 0/412(0%) | 103 只股 × 4 字段 = 412 字段,**全空** |
| **卡口 tier** | 0/28(0%) | 28 卡口全 estimate / 全缺 tier 标 |

→ **这 3 类是"数据深度"的关键**。不补 → 用户在个股分维卡 + 卡口估值条 + 卡口 tier 角标全部失声。

### 0.4 特殊异常(2 个赛道有结构异常)

- **`semi` treeMap 6 列**(多了 `upstreamTools`),其他 5 列 → **渲染层兼容?需验**
- **`ai-apps` 缺 supplyGap 全 0 条** + **FQ 仅 2 段**(其他 3-4 段) → **结构偏薄**

---

## 1. S1 · `semi`(半导体)· 5 段/21 只/3 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | semi / 半导体 / 🔬 | ✅ |
| **meta** | 缺 | ❌ 待填 `{sector:"中游", tier:"核心", status:"active", updatedAt, ltFit}` |
| **prosperity** | 缺 | ❌ 待填 6 维 + verdict |
| **cyclePosition** | 缺 | ❌ 待填 `{stage, label, reason, watchSignals[]}` |
| **plainIntro** | 已填 | ✅ |
| **overview** | 10 卡 ⚠️ | ✅(PCB 范例 8 卡,semi 多了 2 张,渲染层兼容) |
| **treeMap** | 6 列 ⚠️ | ⚠️ 多了 `upstreamTools`,其他 5 列,需验渲染 |
| **segments** | 5 段/21 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 4 段 | ✅ |
| **chokePoints** | 3 卡 · val9 全空 | ❌ 估值 9 字段 × 3 = **27 待填** |
| **supplyGap** | 3 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(5 段):EDA 工具 — 芯片之母 / 半导体设备 — 工业皇冠明珠 / 半导体材料 — 制造的"血液与粮食" / 晶圆制造 — 技术壁垒最高 / 封装测试 — 中国最具优势

**卡口**(3 ★★★):华大九天(EDA) / 北方华创(设备) / 南大光电(材料)

**快速诊断**:**5 段最多、overview 10 卡最多、treeMap 6 列异常**。是 10 条里结构最复杂的,数据补齐的"性价比"也最高(21 只 + 3 卡 + 3 缺口)。

**预计注入工作量**(P0 + P1 + P2 全部):
- `meta` 1 行 + `prosperity` 6 维(60 字/维)+ `cyclePosition` 4 字段 ≈ 500 字
- 3 卡口 9 字段 × 3 = 27 字段(估值硬数据)
- 21 只股 dims6 + tier + valAsOf = 21 × 4 = 84 字段
- **总计 ~110 字段**

---

## 2. S2 · `ai-server`(AI 服务器)· 3 段/13 只/3 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | ai-server / AI 服务器 / 🖥️ | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 3 段/13 只 | ✅(段数偏少,但因环节少可接受) |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 4 段 | ✅ |
| **chokePoints** | 3 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(3 段):液冷散热 — 从"可选"到"必须" / 铜连接/高速互联 — "光退铜进" / BBU/超级电容 + 48V 电源

**卡口**(2 ★★★ + 1 ★★☆):英维克(液冷)/ 沃尔核材(铜连接)/ 江海股份(★★☆ 电容)

**快速诊断**:**段数仅 3** 是 10 条里段数最少的之一(solid-battery/commercial-aero/cpo 也 3 段)。与光模块/optical 强相关(GB300/Rubin 同款驱动),数据补齐后**光模块(optical)+ AI 服务器(ai-server)** 可形成"光退铜进"完整叙事。

**预计注入工作量**:~70 字段(meta/prosperity/cyclePosition 500 字 + 3 卡口 27 字段 + 13 股 52 字段)

---

## 3. S3 · `robotics`(人形机器人)· 4 段/10 只/3 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | robotics / 人形机器人 / 🤖 | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 4 段/10 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 4 段 | ✅ |
| **chokePoints** | 3 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(4 段):行星滚柱丝杠 — 线性执行器"肌肉" / 六维力传感器 — "触觉神经" / 谐波减速器 — 关节"肌腱" / 空心杯电机/灵巧手动力

**卡口**(2 ★★★ + 1 ★★☆):恒立液压(丝杠)/ 柯力传感(传感器)/ 绿的谐波(★★☆ 减速器)

**快速诊断**:**卡口都是"机械件+传感器"** 偏硬科技(与 PCB/光模块的"光/电"不同),估值波动更大,6 维中 valuation 维的"方向翻转"标尺**特别难判**(恒立液压历史 PE 区间宽)。建议 Gemini 出价时**显式标 pePercentile 来源**(iFinD/同花顺模块)。

**预计注入工作量**:~65 字段

---

## 4. S4 · `autonomous-driving`(智能驾驶)· 4 段/12 只/3 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | autonomous-driving / 智能驾驶 / 🚗 | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 4 段/12 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 4 段 | ✅ |
| **chokePoints** | 3 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(4 段):域控制器 — 智驾"大脑" / 激光雷达 — "眼睛"上游 / 线控制动 — L3+ 安全底线 / 车载摄像头 + 智驾感知

**卡口**(2 ★★★ + 1 ★★☆):德赛西威(域控)/ 伯特利(线控)/ 炬光科技(★★☆ 激光雷达)

**快速诊断**:**"政策维"强**(L3+ 法规、智能驾驶试点城市),6 维里 policy 维分可能高;**"估值维"波动大**(德赛西威历史 PE 60-150x 区间宽);**"产业阶段"可能是 recovery(从 L2→L3 商业化拐点)**。

**预计注入工作量**:~70 字段

---

## 5. S5 · `power-semi`(功率半导体/SiC)· 3 段/8 只/2 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | power-semi / 功率半导体/SiC / ⚡ | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 3 段/8 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 3 段 | ✅ |
| **chokePoints** | 2 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(3 段):SiC 衬底 — "皇冠明珠" / SiC 器件/模块 — 车规级核心 / SiC 设备 — 长晶炉/外延炉

**卡口**(2 ★★★):天岳先进(衬底)/ 三安光电(器件)

**快速诊断**:**2 卡口是 10 条里最少的**(并列 ai-apps/cpo/commercial-aero),卡口候选偏少 → 段数也仅 3,4 问仅 3 段 → **结构偏薄**。**与新能源车(800V 高压平台)+ 光伏储能强相关**,景气与下游车销量直接挂钩。

**预计注入工作量**:~50 字段(2 卡口最少,8 只股也偏少)

---

## 6. S6 · `ai-apps`(AI 应用)· 4 段/10 只/2 卡 ⚠️

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | ai-apps / AI 应用 / 🧠 | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 4 段/10 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | **2 段** ⚠️ | ⚠️ 偏少(其他 3-4 段) |
| **chokePoints** | 2 卡 · val9 全空 | ❌ |
| **supplyGap** | **0 条** ⚠️ | ⚠️ 全 10 条唯一 0 条 |
| **methodologyNotes** | 已填 | ✅ |

**段名**(4 段):国产大模型生态 — "类卡口" / AI Agent/企业应用 — 商业化最后一公里 / 训练数据/数据要素 — "石油" / AI 安全 — "免疫系统"

**卡口**(1 ★★★ + 1 ★★☆):寒武纪(算力底座,实为类卡口)/ 字节豆包生态(★★☆ 类卡口,非传统物理卡口)

**快速诊断**:**结构异常** —— supplyGap 0 条 + FQ 仅 2 段 + 2 卡口都是"类卡口"(非物理卡口),与 PCB/光模块"硬科技"叙事不同。**建议先扩 FQ 到 3 段(增加"数据要素"或"Agent 平台"2 段)+ 补 supplyGap 2-3 条(数据要素缺口/算力缺口),再做数据补齐**。否则 6 维中"supply 维"无据可依。

**预计注入工作量**(含结构补全):~80 字段

---

## 7. S7 · `cpo`(CPO 共封装光学)· 3 段/10 只/2 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | cpo / CPO 共封装光学 / 💡 | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 3 段/10 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 3 段 | ✅ |
| **chokePoints** | 2 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(3 段):CW 激光器(外置光源)— CPO 核心增量 / 硅光芯片(PIC)— CPO "中央处理器" / 高密度光纤阵列(FAU/MPO)— CPO "感官神经"

**卡口**(1 ★★★ + 1 ★★☆):源杰科技(★ CW)/ 光迅科技(★★ PIC)

**快速诊断**:**与光模块(optical)强相关**(源杰科技、光迅都是 optical 也有)→ 数据**部分可复用**。但 CPO 本身是"光模块的下一代形态",**prosperity 6 维中 durability 维分应该比 optical 高**(技术演进路径更明)。

**预计注入工作量**:~50 字段(可与 optical 协同)

---

## 8. S8 · `solid-battery`(固态电池)· 3 段/7 只/3 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | solid-battery / 固态电池 / 🔋 | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 3 段/7 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 3 段 | ✅ |
| **chokePoints** | 3 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(3 段):固态电解质(LLZO 氧化物)— 最大增量 / 固态电池设备 — "换设备潮" / 硫化锂/硫化物前驱体 — 全固态终极

**卡口**(2 ★★★ + 1 ★★☆):上海洗霸(LLZO)/ 先导智能(设备)/ 三祥新材(★★☆ 锆基)

**快速诊断**:**政策维可能高**(国家"十四五"新能源车规划明确支持固态电池),**6 维中 policy 维分应=5**;**估值维极贵**(板块整体 PE 80-150x,半固态量产前),**valuation 维分应=1**;**触发门控** → 综合分封顶 60。**"硬数据"主要是硫化锂量产时点 + 半固态车量产时点**。

**预计注入工作量**:~55 字段

---

## 9. S9 · `low-altitude`(低空经济)· 4 段/6 只/3 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | low-altitude / 低空经济 / 🚁 | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 4 段/6 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 3 段 | ✅ |
| **chokePoints** | 3 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(4 段):空管系统 — 低空"空中交通管制" / 碳纤维航空材料 — eVTOL 轻量化 / eVTOL 整机制造 — 主机厂竞争激烈 / 通航运营 — "空中出租车"队

**卡口**(1 ★★★ + 2 ★★☆):莱斯信息(★ 空管)/ 光威复材(★★☆ 碳纤维)/ 中信海直(★★☆ 通航)

**快速诊断**:**政策驱动型赛道**(2024 国务院"低空经济"列战略新兴产业),**policy 维分应=5**;**6 只股是 10 条里最少之一**,数据深度推进的边际收益高。**注意**:eVTOL 主机厂"小鹏汇天/亿航/峰飞"多为非上市,只能聚焦上游材料+空管+通航。

**预计注入工作量**:~50 字段(6 只股少,但 3 卡口全 tier 待核)

---

## 10. S10 · `commercial-aero`(商业航天)· 3 段/6 只/2 卡

| 维度 | 当前 | 状态 |
|---|---|---|
| **id/name/icon** | commercial-aero / 商业航天 / 🛰️ | ✅ |
| **meta** | 缺 | ❌ |
| **prosperity** | 缺 | ❌ |
| **cyclePosition** | 缺 | ❌ |
| **plainIntro** | 已填 | ✅ |
| **overview** | 8 卡 | ✅ |
| **treeMap** | 5 列 | ✅ |
| **segments** | 3 段/6 只 | ✅ |
| **midstream** | 1 | ✅ |
| **fourQuestions** | 3 段 | ✅ |
| **chokePoints** | 2 卡 · val9 全空 | ❌ |
| **supplyGap** | 2 条 | ✅ |
| **methodologyNotes** | 已填 | ✅ |

**段名**(3 段):星载相控阵 T/R 芯片 — 卫星"天线阵列核心" / 通信载荷 — 卫星"路由器+信号塔" / 卫星总装+地面终端

**卡口**(2 ★★★):铖昌科技(T/R 芯片)/ 上海瀚讯(通信载荷)

**快速诊断**:**政策驱动型赛道**(国家"GW 星座""千帆星座"两大低轨星座 2024-2027 集中发射),**policy 维分应=5**;**铖昌科技 PE-TTM 历史在 200-400x 区间**,**valuation 维分应=1**(贵),**触发门控**;**6 只股少、2 卡口少** → 注入工作量最小(~40 字段)。

**预计注入工作量**:**10 条里最小,~40 字段**

---

## 11. 综合建议(10 条赛道优先级)

### 11.1 ROI 排序(综合"数据深度推进边际收益 / 注入工作量")

| 序 | 赛道 | ROI 论据 | 预计工作量 |
|---|---|---|---|
| 1 | **`commercial-aero`** | 6 股/2 卡/40 字段,工作量最小;政策驱动型数据相对好查(国家航天局/卫星发射公告) | **~40 字段** |
| 2 | **`cpo`** | 10 股/2 卡/50 字段;**与 optical 高度协同**(源杰/光迅 2 只股共用) | ~50 字段 |
| 3 | **`low-altitude`** | 6 股/3 卡/50 字段;政策驱动型;3 卡口全是 ★★☆ + ★★★,tier 升级潜力大 | ~50 字段 |
| 4 | **`power-semi`** | 8 股/2 卡/50 字段;与新能源车产业链协同;天岳先进/三安光电估值数据成熟 | ~50 字段 |
| 5 | **`solid-battery`** | 7 股/3 卡/55 字段;政策驱动;硫化锂/锆基硬数据较易查(化工类) | ~55 字段 |
| 6 | **`ai-server`** | 13 股/3 卡/70 字段;与 optical 协同;**段数仅 3 偏少,需补段** | ~70 字段 |
| 7 | **`autonomous-driving`** | 12 股/3 卡/70 字段;卡口强(德赛西威 PE 历史宽) | ~70 字段 |
| 8 | **`robotics`** | 10 股/3 卡/65 字段;机械件估值波动大,需显式标 pePercentile 来源 | ~65 字段 |
| 9 | **`ai-apps`** ⚠️ | 10 股/2 卡/80 字段(含结构补全);**结构异常**(0 supplyGap + 2 FQ 段)需先补结构 | ~80 字段 |
| 10 | **`semi`** | 21 股/3 卡/110 字段;**treeMap 6 列异常**需先验渲染;工作量最大 | ~110 字段 |

### 11.2 跨赛道协同建议

- **`optical` + `cpo` + `ai-server`**:光/铜叙事完整(optical 当前 P0+P1 完成;cpo 协同项 2/2 卡口共用 2 只股;ai-server 液冷/铜连接与 optical 强互补)→ **建议顺序: optical(已完)→ cpo → ai-server**
- **`autonomous-driving` + `low-altitude` + `commercial-aero`**:政策驱动型"陆海空"叙事(智驾→低空→航天)→ **建议顺序: 选 1-2 条先做**
- **`robotics` + `solid-battery` + `power-semi`**:新能源/新硬件叙事(电池→功率器件→机器人执行器)→ **建议顺序: 选 1 条先做**

### 11.3 结构异常优先处理(2 个)

- **`semi` treeMap 6 列**:`upstreamTools` 是多余列,渲染层兼容待验 → **注入前先验**(`py -m http.server` 浏览器硬刷 #semi 看树状图)
- **`ai-apps` 缺 supplyGap 0 条 + FQ 仅 2 段**:结构偏薄,先扩 FQ 到 3 段 + 补 supplyGap 2-3 条,再做数据补齐

---

## 12. 跨赛道注入 3 步流程(每条赛道按此走)

> 完整 SOP 见 [refresh-sop.md §4 场景 A](./refresh-sop.md#4-场景-a刷新存量链-赛道id) / [chain-research-template.md §15](./chain-research-template.md#15-跨赛道应用hbm-跑通-sop-模板首条验证)。

### 12.1 第 1 步 · CC 盘点(本步已部分完成,本文件即为产出)

输出"字段对照卡"(本文件),标"已填 / 缺 / 待核"三态。

### 12.2 第 2 步 · Gemini 查数(联网)

走 [refresh-sop.md §6 Gemini 查询模板](./refresh-sop.md#6-gemini-查询模板通用--查--自查--出注入块),按"全量刷新"范围给完整 PCB schema 注入块(7 类别:overview 8 卡 / 卡口 9 字段 / 个股 8 字段 / prosperity 6 维 / cyclePosition / supplyGap / plainIntro)。

### 12.3 第 3 步 · CC 守门注入

走 [chain-research-template.md §14 6 步自检](./chain-research-template.md#14-上线自检-6-步注入后跑),逐项报告 旧→新+tier+来源 + 守门"被拒/存疑清单"。

### 12.4 4 处必改(本步无需,只改 data/<id>.js)

- manifest 数组已含 10 id,无需改
- nav-item 已含 10 id,无需改
- CHANGELOG:每次注入后加一条今日记录
- DATA_VERSION bump:每次注入后同步

---

## 13. 文档交叉引用

- **跨赛道字段模板**: [chain-research-template.md](./chain-research-template.md)(15 字段速览 + 6 维标尺 + 4 处必改 + 6 步自检)
- **数据刷新 SOP**: [refresh-sop.md](./refresh-sop.md)(三步流程 / Gemini 模板 / 守门校验)
- **数据治理铁律**: [CLAUDE.md](../../CLAUDE.md)(信源四档/不造数/数据来源管道/手动刷新纪律)
- **PCB 黄金范例**: [data/pcb.js](../../data/pcb.js)(冻结、只读)
- **光模块(optical)范例**: [data/optical.js](../../data/optical.js)(已 P0+P1 完整,完整 SOP 跑通案例)

---

*本文件 = 阶段三 3A.2 产出。10 条存量赛道的"字段完成度全景"已盘点,等用户决策"哪条先走完整 SOP"。本步**不改任何数据**,等用户拍板。*
