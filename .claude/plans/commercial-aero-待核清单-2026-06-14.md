# 商业航天(commercial-aero)赛道 · 待核清单 · 2026-06-14

> **使用方式**:本清单 = 骨架 `data/commercial-aero.js` 的"待核字段全图",请把本文件**整份发给 Gemini**(含下方"Gemini 查询模板"段),让 Gemini 按 PCB schema 直接产出注入块。**CC 联网不通,本步只盘点+注入**。
>
> **纪律**([.claude/plans/refresh-sop.md §2](./refresh-sop.md)):
> - CC 永远不得自行编造或"估算" 财报、市占、缺口、产能、价格。**关键数字 ≥ 2 独立来源**。
> - primary 类(财报/估值)只能来自一手(巨潮/上交所/深交所/公司公告),不能只用自媒体。
> - 仅 media 单源 → 标"存疑(待核)",不当真值。
> - 估值/PE 必带 `asOf` 日期。
> - 🆪 AI 主观判断(六维分本身属此档)允许。
>
> **跨赛道模板**:[chain-research-template.md](./chain-research-template.md) v1(2026-06-14 落地)

---

## 0. 骨架状态(截至 2026-06-14,已 commit)

`data/commercial-aero.js`(6 段少/2 卡口少)已就位:

- ✅ **id/name/icon**: commercial-aero / 商业航天 / 🛰️
- ✅ **plainIntro**: analogy + 2 paragraphs + 5 flowSteps + highlightBox 全填
- ✅ **overview**: 8 卡 label+value+note 全填,**全缺 tier+src**(渲染时无信源角标)
- ✅ **treeMap**: 5 列齐(`downstream`/`midstream`/`equipment`/`materials`/`sideBranches`),**⚠️ 结构异常 1**:`downstream` 和 `midstream` 是 **object**(其他赛道是 array)
- ✅ **segments**: 3 段 / 6 只股(每只股 name/code/position/barrier/logic 全填)
- ⚠️ **midstream**: description 空 + stocks 0(空 array)→ **结构异常 2**(其他赛道 midstream 必填)
- ✅ **fourQuestions**: 3 段(2 卡口段 + 1 卫星总装软判定段)全填 q1-q4note
- ✅ **chokePoints**: 2 个(铖昌科技 T/R 芯片 / 上海瀚讯 通信载荷),name/code/segment/strength/logic/tags 全填,**全缺 valuation 9 字段 + verification**
- ✅ **supplyGap**: 2 条全字段齐
- ✅ **methodologyNotes**: 已填
- ❌ **meta**: 缺
- ❌ **prosperity**: 缺
- ❌ **cyclePosition**: 缺

### 0.1 字段总览(15 字段 vs PCB 范例)

| 字段 | 当前 | 状态 |
|---|---|---|
| id/name/icon | 全填 | ✅ |
| meta | 缺 | ❌ 必填 |
| prosperity | 缺 | ❌ 必填(6 维+verdict) |
| cyclePosition | 缺 | ❌ 必填 |
| plainIntro | 全填 | ✅ |
| overview | 8 卡 label+value+note 全填,**全缺 tier+src** | ⚠️ |
| treeMap | 5 列齐,downstream/midstream 是 object | ⚠️ 异常 1 |
| segments | 3 段/6 只,每只逻辑全填 | ✅ |
| midstream | description 空 + stocks 0 | ⚠️ 异常 2 |
| fourQuestions | 3 段 q1-q4note 全填 | ✅ |
| chokePoints | 2 个 logic+tags 全填,**全缺 valuation 9 字段 + verification** | ❌ |
| supplyGap | 2 条全字段齐 | ✅ |
| methodologyNotes | 全填 | ✅ |

**15 字段完成度:12/15**(与 10 条赛道均值一致,缺 meta/prosperity/cyclePosition)

### 0.2 结构异常 2 项

- **⚠️ 异常 1**:`treeMap.downstream` 和 `treeMap.midstream` 是 **object** (其他赛道是 array)→ **注入前先验**(`py -m http.server` 浏览器硬刷 #commercial-aero 看树状图 5 列是否正常)
- **⚠️ 异常 2**:`midstream.description` 空 + `midstream.stocks` 0(空 array)→ **商业航天中游"卫星总装+火箭发射"竞争分散,卡口判定应写"非寡头"** + **暂不填 stocks**(商业火箭头部未上市,无 A 股纯正标的)

### 0.3 数据深度 0% 覆盖(3 类)

| 数据类 | 覆盖 | 待补 |
|---|---|---|
| **卡口 valuation 9 字段** | 0/18(0%) | 2 卡口 × 9 字段 = 18 字段全空 |
| **个股 dims6 + dims6Note + tier + valAsOf** | 0/24(0%) | 6 只股 × 4 字段 = 24 字段全空 |
| **overview 8 卡 tier+src** | 0/16(0%) | 8 卡 × 2 字段 = 16 字段全空 |
| **卡口 tier** | 0/2(0%) | 2 卡口全缺 tier 标 |

→ **用户视角**:`commercial-aero` 页面**六维卡不渲染 + 估值条失声 + 6 维分卡 100% 失声**。本清单是补齐这些的输入。

---

## 1. 类别 ① · overview 宏观(8 卡,**必填 tier+src**)

| # | 字段路径 | 当前 value | 当前 note | 当前 tier | 当前 src | 建议重核? | 信源建议 |
|---|---|---|---|---|---|---|---|
| 0 | `overview[0]` 千帆星座在轨卫星 | '162颗(2026.5)' | '年底目标324颗·最终规划>1.2万颗' | 缺 | 缺 | ✅ 重核 | 上海垣信公告 / 千帆星座官网 / ITU 公开数据 |
| 1 | `overview[1]` 中国新申请频轨资源 | '>20万颗' | '较此前5.13万颗提升5倍' | 缺 | 缺 | ✅ 重核 | ITU 申报文件 / 工信部公告 / 21财经报道 |
| 2 | `overview[2]` 2025 商业航天发射 | '50次(占全国54%)' | '入轨商业卫星311颗(占84%)' | 缺 | 缺 | ✅ 重核 | 航天科技集团 2025 年报 / 中国航天科技活动蓝皮书 |
| 3 | `overview[3]` 产业阶段 | '批量交付期' | '从技术验证→批量制造/密集发射' | 缺 | 缺 | ✅ 重核 | 行业研究机构(赛迪/前瞻) |
| 4 | `overview[4]` 卫星制造市场规模 | '单星成本~$50万' | '千帆+GW合计>2万颗→制造市场>千亿' | 缺 | 缺 | ✅ 重核 | 千帆/GW 规划文件 + 单星成本测算 |
| 5 | `overview[5]` 核心催化 | '可回收火箭突破' | '蓝箭等5家火箭公司递交上市申请' | 缺 | 缺 | ✅ 重核 | 蓝箭航天/天兵科技/星河动力 IPO 文件 / 上交所公告 |
| 6 | `overview[6]` 核心矛盾 | '发射成本+产能不足' | '卫星制造从手工→流水线的转型期瓶颈' | 缺 | 缺 | ✅ 重核 | 行业研究(中航证券/招商证券) |
| 7 | `overview[7]` T/R 芯片国产化 | '铖昌已批量交付' | '相控阵天线是卫星通信核心→单星几百颗芯片' | 缺 | 缺 | ✅ 重核 | 铖昌科技 2025 年报 + 千帆星座供应链公告 |

**每卡必填 4 项**:`value` / `note` / `tier` (primary/broker/media/estimate) / `src` (报告标题+链接+发布日期)。**如缺 tier → CC 守门不写**(只补现 value/note)。

---

## 2. 类别 ② · 卡口 chokePoints(2 个 · **每卡 18 字段待核**)

### 卡口 ① · 铖昌科技(星载相控阵 T/R 芯片)

| 字段 | 当前 | 建议重核? | 信源建议 |
|---|---|---|---|
| `name` / `code` / `segment` / `strength` | 全填(铖昌科技/001270/星载相控阵T/R芯片/★★★) | ✅ 保留 | 骨架已稳定 |
| `logic` | '全球<strong>仅3-4家</strong>能批量供应星载级相控阵T/R芯片。千帆星座+G60+GW星座合计>2万颗卫星...' | ✅ 重写(带硬数据 + 卡口结论) | 铖昌 2025 年报 + 千帆公告 + 同业(国博/ADI) |
| `tags[0-3]` | ['全球仅3-4家','数亿颗需求','出口管制红利','国产不可替代'] | ✅ 4 词卡口标签 | 4 问 + 评级 |
| `valuation.pe` | 缺 | ✅ 重核 | 投资网/亿牛网 PE-TTM(截至 2026-06-13 收盘) |
| `valuation.peAbsolute` | 缺 | ✅ 重核 | 同上 |
| `valuation.pePercentile` | 缺 | ✅ 重核 | 同花顺 iFinD PE 分位模块 / 券商研报(铖昌上市<5y 历史分位可能 null) |
| `valuation.grossMargin` | 缺 | ✅ 重核 | 铖昌 2025 年报 / 巨潮 cninfo |
| `valuation.fromHigh` | 缺 | ✅ 重核 | 相对 52 周前高位置 |
| `valuation.asOf` | 缺 | ✅ 重核 | 估值日期 YYYY-MM-DD |
| `valuation.tier` | 缺 | ✅ 重核 | primary/broker/estimate(media 单源 → 标存疑) |
| `valuation.src` | 缺 | ✅ 重核 | 报告标题+链接 |
| `valuation.note` | 缺 | ✅ 重核 | 🆪 长 note 含主观判断 + 风险点 |
| `verification.items[0-3]` | 缺 | ✅ 4 项 howToCheck + falsifySignal | 供给寡头/产能缺口/财报印证/交叉信源 |
| `verification.note` | 缺 | ✅ 重核 | 初始版本提示语 |

### 卡口 ② · 上海瀚讯(通信载荷集成)

| 字段 | 当前 | 建议重核? | 信源建议 |
|---|---|---|---|
| `name` / `code` / `segment` / `strength` | 全填(上海瀚讯/300762/通信载荷集成/★★★) | ✅ 保留 | 骨架已稳定 |
| `logic` | '<strong>华为低轨卫星项目载荷供应商</strong>...' | ✅ 重写(带硬数据 + 华为独家判断) | 上海瀚讯 2025 年报 + 华为低轨公告 + 5G 正样件交付新闻 |
| `tags[0-3]` | ['华为独家载荷商','太空级认证','手机直连5G','唯一供应渠道'] | ✅ 4 词卡口标签 | 4 问 + 评级 |
| `valuation.pe` / `peAbsolute` / `pePercentile` / `grossMargin` / `fromHigh` / `asOf` / `tier` / `src` / `note` | 缺(9 字段) | ✅ 同卡口 ① | 投资网/亿牛网/巨潮 |
| `verification.items[0-3]` + `note` | 缺 | ✅ 同卡口 ① | 4 项 howToCheck + falsifySignal |

**18 字段 × 2 卡口 = 36 字段待核**

---

## 3. 类别 ③ · segments 个股(3 段 × 2 只 = **6 只票**,**每股 8 字段待核**)

| 段 | 标的 | 当前 | 待核字段 | 信源建议 |
|---|---|---|---|---|
| [0] 星载相控阵T/R芯片 | **铖昌科技**(001270) | 4 个 fills 字段(rank/name/code/position/barrier/hits/strength/logic) | trend/trendNote/dims6[6]/dims6Note/tier/valAsOf | 铖昌 2025 年报 + 2026Q1 公告(巨潮) |
| [0] | **国博电子**(688375) | 同上 | 同上 | 国博 2025 年报 + 巨潮 |
| [1] 通信载荷 | **上海瀚讯**(300762) | 同上 | 同上 | 上海瀚讯 2025 年报 + 巨潮 |
| [1] | **航天电子**(600879) | 同上 | 同上 | 航天电子 2025 年报 + 巨潮 |
| [2] 卫星总装+地面终端 | **中国卫星**(600118) | 同上 | 同上 | 中国卫星 2025 年报 + 巨潮 |
| [2] | **海格通信**(002465) | 同上 | 同上 | 海格通信 2025 年报 + 巨潮 |

**每股 8 字段 × 6 只 = 48 字段待核**

| 字段 | 类型 | 必填 | 备注 |
|---|---|---|---|
| `trend` | 'up'/'down'/'flat' | ✅ | 进步/承压/平稳 |
| `trendNote` | ≤15 字理由 | ⭕ 可选 | 例:M9大陆唯一·Q1净利+105% |
| `dims6[6]` | 数组 6 元素 | ✅ | {key, score(1-5), trend, tier} 6 维 |
| `dims6Note` | 1-2 句 | ⭕ 可选 | 含财报数+来源 |
| `tier` | primary/broker/media/estimate | ✅ | 标的整体数据质量档 |
| `valAsOf` | YYYY-MM-DD | ✅ | 估值日期 |

**6 维**= durability/visibility/policy/supply/valuation/barrier
- valuation 维分**方向翻转**(1=贵/5=便宜,见 chain-research-template.md §2)
- barrier 维分 = barrier 档映射(极高 5/高 4/中 2/低 1)

---

## 4. 类别 ④ · 景气六维 prosperity.dims(6 维全空)

⚠️ **特别提醒**:当前骨架**没有 prosperity 字段**。**等 Gemini 给出 6 维数据后,CC 注入 `prosperity.dims[]` 6 个元素 + `verdict` 对象**。这会触发**六维卡渲染** + **擂台综合分**。

| # | key | 中文 | 字段全 |
|---|---|---|---|
| 0 | `durability` | 景气持续性 | `name` / `score(1-5)` / `trend(up/down/flat)` / `reason`(1-2 句 + 硬数据) / `evidence` / `flag:'🆪'` / `tier` / `src` / 可选 `rollupFrom` |
| 1 | `visibility` | 业绩可见度 | 同上 |
| 2 | `policy` | 政策确定性 | 同上(商业航天**强政策驱动**,本维应=5) |
| 3 | `supply` | 供需紧张度 | 同上(T/R 芯片缺口>30%,本维应=4-5) |
| 4 | `valuation` | 估值性价比 | 同上 + `asOf` 必填(板块 PE 80-150x,**本维应=1,触发门控** → 综合分封顶 60) |
| 5 | `barrier` | 壁垒安全垫 | 同上(T/R 芯片全球 3-4 家,本维应=4-5) |

**verdict 对象**(3 字段):
- `longTermFit`:1 句口语化(用 T0/T1 等级 OR 具体环节名,**不写字段路径**)
- `oneLine`:1 句综合判断(标 🆪)
- `stockHint`:3 槽位([环节指引],[买点指引];[方法论一句话])—— **不写 `segments[].barrier` 等字段路径**

**写作模板**:[chain-research-template.md §2](./chain-research-template.md#2-prosperity--6-维景气打分) + [SKILL.md「verdict.stockHint 写作模板」](../skills/serenity/SKILL.md#verdictstockhint-写作模板)

---

## 5. 类别 ⑤ · 周期位置 cyclePosition(全空)

| 字段 | 当前 | 建议重核? | 信源建议 |
|---|---|---|---|
| `stage` | 缺 | ✅ 4 选 1 (recovery/boom/peak/decline) | 行业拐点信号 |
| `label` | 缺 | ✅ | 中文标签(参考 PCB:繁荣中后期) |
| `reason` | 缺 | ✅ | 1-2 句 + 硬数据 |
| `watchSignals[0-2]` | 缺 | ✅ 3 条 | 千帆/GW 发射进度 / 蓝箭可回收突破 / T/R 芯片产能扩产 |

**预判**(仅供 Gemini 参考,不强制):
- `stage`: `boom`(批量交付期,2 万颗在 5-7 年内集中部署)
- `label`: "商业航天超级上行周期初"
- `reason`: GW 星座新申请 20 万颗 + 千帆 2026 年底 324 颗目标 + 蓝箭可回收突破

---

## 6. 类别 ⑥ · supplyGap 缺口(2 条 · **基本齐,只需核 tier+src**)

| 字段 | 当前值 | 当前 tier | 当前 src | 建议重核? | 信源建议 |
|---|---|---|---|---|---|
| `supplyGap[0].segment` | '星载T/R芯片' | 缺 | 缺 | ✅ | 保留 |
| `supplyGap[0].demand` | '万星×千颗=数亿颗需求(~数百亿市场)' | 缺 | 缺 | ✅ 重核数字 | 千帆+GW 规划 + 单星芯片数测算 |
| `supplyGap[0].capacity` | '全球3-4家供应商有效产能' | 缺 | 缺 | ✅ 重核 | 铖昌/国博/ADI 公告 |
| `supplyGap[0].gap` | '缺口>30%' | 缺 | 缺 | ✅ 重核 | 同上 |
| `supplyGap[0].rate` | '>30%' | 缺 | 缺 | ✅ 重核 | 同上 |
| `supplyGap[0].bottleneck` | '星载认证周期>18月' | 缺 | 缺 | ✅ 重核 | 行业研究 |
| `supplyGap[0].tier` | 缺 | ✅ | broker 优先 | 优先 broker 研报 |
| `supplyGap[0].src` | 缺 | ✅ | 报告标题+链接+日期 | |
| `supplyGap[1].segment` | '可回收火箭(降本关键)' | 缺 | 缺 | ✅ | 保留 |
| `supplyGap[1].demand` | '千帆/GW需>1000次发射' | 缺 | 缺 | ✅ 重核 | 千帆+GW 规划 + 5-7 年部署期 |
| `supplyGap[1].capacity` | '长征系列+商业火箭~100次/年' | 缺 | 缺 | ✅ 重核 | 航天科技集团 + 蓝箭/天兵公告 |
| `supplyGap[1].gap` | '发射频率需翻倍' | 缺 | 缺 | ✅ 重核 | 同上 |
| `supplyGap[1].rate` | '>50%缺口' | 缺 | 缺 | ✅ 重核 | 同上 |
| `supplyGap[1].bottleneck` | '可回收技术+发射工位不足' | 缺 | 缺 | ✅ 重核 | 行业研究 |
| `supplyGap[1].tier` | 缺 | ✅ | broker 优先 | |
| `supplyGap[1].src` | 缺 | ✅ | 报告标题+链接+日期 | |

**16 字段待核(2 条 × 8 字段)**

---

## 7. 类别 ⑦ · plainIntro(已齐,无需核)

✅ `analogy` / `paragraphs[2]` / `flowSteps[5]` / `highlightBox` 全填。

**但** `paragraphs` 是 2024 年中后期数据(千帆 162 颗、年底 324 颗)→ **可选项**:Gemini 视情况更新到 2026-06 最新。

---

## 8. 类别 ⑧ · meta(全空)

| 字段 | 类型 | 必填 | 备注 |
|---|---|---|---|
| `meta.sector` | '上游'/'中游'/'下游'/'整合' | ✅ | 商业航天 = **整合**(上中下游全链) |
| `meta.tier` | '核心'/'重要'/'边缘' | ✅ | **核心**(政策强力支持 + 20 万颗频轨申请) |
| `meta.status` | 'active'/'draft'/'deprecated' | ✅ | 'active' |
| `meta.updatedAt` | YYYY-MM-DD | ✅ | 硬数据最后更新日 = 2026-06-14(Gemini 注入日) |
| `meta.ltFit` | 1-5 / null | ⭕ | 长线适合度,等 verdict.stockHint 抽出后回填 |

---

## 9. Gemini 查询模板(直接复制)

```
你是 A 股产业链投资研究的数据核查员。我要核「商业航天(Commercial Aerospace / 商业航天)赛道」。

【已知骨架】
data/commercial-aero.js(3 段/6 只股/2 卡口)已就位,字段位置严格按 PCB schema。骨架已选 6 只 A 股(T/R 芯片 2 + 通信载荷 2 + 总装/地面 2)。2 个卡口 = ① 铖昌科技(星载相控阵 T/R 芯片)② 上海瀚讯(通信载荷集成,华为低轨独家)。

【本批待核字段】
- overview 8 卡:每卡 value/note 重核 + 4 项必填(tier/src)
- 卡口 2 个:每卡 valuation 9 字段(pe/peAbsolute/pePercentile/grossMargin/fromHigh/asOf/tier/src/note) + verification items[4] + logic 重写带硬数据
- 6 只股:每只 trend/trendNote/dims6[6]/dims6Note/tier/valAsOf
- prosperity 6 维:每维 name/score/trend/reason/evidence/flag/tier/src + verdict 3 槽位
- cyclePosition 4 字段:stage/label/reason/watchSignals[3]
- supplyGap 2 条:每条 demand/capacity/gap/rate/bottleneck 重核 + tier/src
- meta 5 字段

【纪律】
- 每个数字给来源(网站名+链接+日期);关键数(财报/市占/缺口/PE)≥2 独立来源。
- 财报/估值类必须落一手(财报/公告/巨潮 cninfo/交易所),不能只用自媒体。
- 标 tier:primary/broker/media/estimate。仅 media 单一来源的关键数标"存疑(待核)"。
- 估值/PE 带"截至X日"。查不到写"待核",绝不编造或估算精确数字。
- 写清口径:全球 T/R 芯片市占 vs 国内市占?美元 vs 人民币?TTM vs 年度?
- 区分"频轨资源申请数"(ITU 文件)vs"实际发射数"(公开数据)vs"已部署卫星数"(官网)。

【自查(输出前自跑质检)】
1. 有没有把财富号/股吧当成券商了?(纠正 tier)
2. 单位/口径有没有串?(¥/$、全球/国内、TTM 失真)
3. 有没有遗漏重大风险?(实控人被查/减持/诉讼/订单不及预期)
4. 每个精确数字是否真有≥2 来源?(否则标存疑)
5. 估值是否带 asOf?
6. 商业航天特定的"政策依赖"和"频轨资源"是否在 valuation.note 标出?

【要查的内容】
请按以下 8 类别逐项给出**完整数据 + 来源**:

① overview 8 卡:每卡 value/note/tier/src
② 2 大卡口各 18 字段(铖昌科技 / 上海瀚讯):name/code/segment/strength(已填)/logic/tags×4(已填)/valuation×9/verification×4
③ 6 只票各 8 字段(铖昌/国博/上海瀚讯/航天电子/中国卫星/海格通信),按 segments 顺序列
④ prosperity.dims 6 维(durability/visibility/policy/supply/valuation/barrier):每维 name/score/trend/reason/evidence/flag/tier/src;verdict 对象{longTermFit, oneLine, stockHint}
⑤ cyclePosition 4 字段(stage/label/reason/watchSignals×3)
⑥ supplyGap 2 条各 8 字段(segment/demand/capacity/gap/rate/bottleneck/tier/src)
⑦ plainIntro paragraphs[2](可选更新到 2026-06)+ highlightBox
⑧ meta 5 字段

【输出:直接给 PCB schema 注入块】
按 data/commercial-aero.js 现有结构产出完整链数据块,字段名严格与骨架一致。
每个数字旁标 tier 和来源;存疑项明确标出。不给买卖建议。
```

---

## 10. CC 注入后自检(注入时跑)

- [ ] `data/commercial-aero.js` 独立加载 OK(已验证)
- [ ] 14 条赛道全部加载 OK(已验证)
- [ ] 主 inline script JS 语法 OK(已验证,126391 chars)
- [ ] **新增** prosperity 6 维全 key 齐 + verdict 对象齐 → 浏览器硬刷 #commercial-aero 看六维卡渲染
- [ ] **新增** 2 卡口 valuation.pePercentile 必填 + asOf 必填
- [ ] **新增** 6 只票 dims6 全 6 维齐 + tier + valAsOf
- [ ] **新增** overview 8 卡全带 tier + src(信源角标)
- [ ] 守门:缺 tier/缺 src/标存疑的关键数 → 保留旧值 + 列"被拒清单"
- [ ] 浏览器硬刷 3 anchor(segments 表格 / 树状图 5 列 / 卡口 2 卡)渲染正常
- [ ] **验** `treeMap.downstream` / `treeMap.midstream` 是 object(非 array)→ 浏览器硬刷是否正常
- [ ] **验** `midstream.stocks` 仍为 0(空 array,商业火箭头部未上市)
- [ ] 进 #arena 赛道擂台 → commercial-aero 行出现且综合分计算(需 prosperity 数据)
- [ ] Header "数据截止" 日期:硬数据变才刷,🆪 主观判断不刷

---

## 11. 字段总账(8 类别合计待核)

| 类别 | 待核字段数 | 备注 |
|---|---|---|
| ① overview 8 卡 | 16(8 卡 × tier+src)| 必填 |
| ② 卡口 2 个 | 36(2 × 18)| valuation 9 + verification 5 + logic 重写 + tags 重核 |
| ③ 6 只股 | 48(6 × 8)| trend + trendNote + dims6[6] + dims6Note + tier + valAsOf |
| ④ prosperity 6 维 | 54(6 维 × 9)+ verdict 3 = 57 | + 6 维 score(1-5) |
| ⑤ cyclePosition | 6 | stage/label/reason + watchSignals[3] |
| ⑥ supplyGap 2 条 | 16(2 × 8)| 8 字段全 |
| ⑦ plainIntro | 0(可选 6) | paragraphs[2] 可选更新 + highlightBox 可选加数字 |
| ⑧ meta | 5 | sector/tier/status/updatedAt/ltFit |
| **合计** | **184 字段** | 实际工作量 ~40-50 个 JSON 块(因 verdict 算 1 块、watchSignals 算 1 块)|

---

## 12. 跨赛道引用

- **跨赛道字段模板**:[chain-research-template.md](./chain-research-template.md) v1(2026-06-14 落地,15 字段速览 + 6 维标尺 + 4 处必改 + 6 步自检)
- **数据刷新 SOP**:[refresh-sop.md](./refresh-sop.md)(三步流程 / Gemini 模板 / 守门校验)
- **10 条赛道字段对照卡**:[chain-field-audit-2026-06-14.md](./chain-field-audit-2026-06-14.md)(commercial-aero 是 10 条里 S10,工作量最小 ~40 字段)
- **光模块(optical)首条跑通 SOP 案例**:[data/optical.js](../../data/optical.js) P0+P1 完整
- **PCB 黄金范例**:[data/pcb.js](../../data/pcb.js)(冻结、只读)
- **数据治理铁律**:[CLAUDE.md](../../CLAUDE.md)(信源四档/不造数/数据来源管道/手动刷新纪律)

---

*本清单 = 骨架`data/commercial-aero.js`的"待核字段全图"。Gemini 出注入块后,CC 守门注入(参照 [refresh-sop.md §4 A3](./refresh-sop.md#4-场景-a刷新存量链-赛道id))。*

*本步**只盘点,不改数据**。等用户把"§9 Gemini 查询模板"段发给 Gemini 拿回数据,再走第 3 步 CC 注入。*
