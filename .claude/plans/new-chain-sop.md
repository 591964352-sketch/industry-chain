# 新链建链 SOP v1.0
> 基于 PCB 链实战提炼 · 2026-06-17
> 存放路径建议：`.claude/plans/new-chain-sop.md`

---

## 一、建链前必读：PCB 是黄金范例

新建任何链之前，先看一眼 `data/pcb.js`，它是所有字段、格式、打分逻辑的活文档。
本 SOP 是 PCB 实战的文字提炼，两者配合使用。

---

## 二、从零建链的完整流程（七步）

### Step 0：定义链的边界

在动手之前先想清楚三个问题：

- **这条链的核心卡口在哪里？** 找 2-3 个物理卡口（choke:true），它们是整条链的叙事锚点
- **A 股有哪些标的？** 粗估 20-40 只，太少说明链太窄，太多说明边界太宽
- **这条链的景气驱动是什么？** 一句话能说清楚（例：AI 算力需求→PCB 价值量提升 5-10 倍）

输出：`id`、`name`、`plainIntro`、`cyclePosition` 骨架，`meta.status` 先设 `draft`

---

### Step 1：搭骨架

参照 PCB 的 segments 结构，把链拆成 3-6 个环节：

```js
segments: [
  { name: '环节名', costRatio: 'xx%', barrier: 'high/extreme/medium/low',
    choke: true/false, border: true/false,
    intro: '一句话说清楚这个环节干什么',
    stocks: [
      { rank:1, name:'公司名', code:'xxxxxx',
        position: '定性描述（先填，后面补硬数字）',
        barrier: '极高/高/中/低',
        tier: 'primary',  // 先占位
        dims6: [...],     // 先占位，按 Step 3 标准填
      }
    ]
  }
]
```

**卡口（choke:true）**要额外填：
- `chokePoints[]`：含 `supply`/`valuation`/`strength` 子字段
- `barrier` 字段填 `extreme`

---

### Step 2：A 类数据——用 akshare 补财报

CC 在本机执行，不联网，每只 sleep(1)：

```python
import akshare as ak
import time

codes = ['600183', '300395', ...]  # 所有个股代码

for code in codes:
    df = ak.stock_financial_report_sina(stock=code, symbol="资产负债表")
    # 取最新季报：营收、归母净利、毛利率
    time.sleep(1)
```

填入字段：
- `valAsOf`：实际披露日（从季报公告日取，不能用今天）
- `src`：`'akshare/新浪财经(基于公司季报)'`
- `tier`：`'primary'`
- PE-TTM + 3 年历史分位：用亿牛网聚合页，`asOf` 标收盘日

**PE 失真处理**：亏损期 PE 负值 → 标 `'PE-TTM失真(亏损期)'`，score 不能基于失真 PE 推断，必须改用 PB/PS。

---

### Step 3：六维打分（dims6）

每只个股填 6 维，顺序固定：`durability / visibility / policy / supply / valuation / barrier`

**方向定义（最容易打反的两维）**：

| 维度 | score=5 | score=1 |
|------|---------|---------|
| valuation | 最便宜/历史低位 | 最贵/历史极高 |
| supply | 供需最紧张/供不应求 | 产能严重过剩 |

**打分规则**：
- score 基于 PE 3 年历史分位：>90% → score≤2；40-85% → score 3；<40% → score≥4
- trend 方向：`up` = 性价比在改善（PE 在回落）；`down` = 性价比在恶化（PE 在上涨）
- **高危组合**：PE 分位>90% + 净利极小 + trend=up → 方向打反（见 G3 陷阱清单第3条）
- 个股 score 与赛道级 prosperity.dims 对应维度不得相差>1 档

**dims6Note 写法**：一句话，含 PE 数字 + 分位 + 定性判断，例：
`'壁垒最强·Q1净利+37%；PE-TTM 143.43倍/3年分位99.30%——估值历史极贵，等回踩'`

---

### Step 4：B 类数据——Gemini 三档查询

给 Gemini 的指令格式：

```
查以下个股的 [市占率/排名/产能/客户集中度]，
来源优先级：①年报/季报原文 > ②券商研报 > ③行业协会 > ④媒体
输出三档：
①可直接写入（≥2源核实）
②单源待核（给出来源）
③无数据（说明原因）
```

**position 字段只写①档数据**，②单源标注 `⚠️单源待核`，③跳过不填。

**常见能查到的**：市占率%、全球排名、产能（吨/年）、客户名称
**常见查不到的**：价格/毛利率（商业机密）、单一客户锁单数量（单源）

---

### Step 5：赛道级六维（prosperity.dims）

这是整条链的总判断，6 个维度打分 + reason + evidence：

- `durability`：景气能持续几年？看 CAGR 和技术迭代周期
- `visibility`：当期财报已兑现的比例有多高？
- `policy`：政策顺风/逆风/中性？
- `supply`：整体供需格局，区分高端/低端
- `valuation`：卡口标的的整体估值水位，**取最贵的那只作为门控**
- `barrier`：赛道整体壁垒，取核心卡口环节

写完后填 `verdict`（一句话总结）和 `cyclePosition`（周期位置）。

---

### Step 6：G8 对齐检查（设 active 前必做）

在设 `meta.status = 'active'` 之前，逐项核查：

1. 所有个股 35 个字段完整（无 undefined/null）
2. A 类数据（营收/净利/毛利率/PE）全部有 `tier:primary` + `valAsOf` + `src`
3. PE 失真的个股有替代估值口径（PB/PS）
4. dims6 六维 score 方向无打反（valuation/supply 重点查）
5. 个股 dims6 score 与赛道级对应维度差值≤1
6. position 字段无绝对化表述（独家/唯一/100%）未标注 `⚠️待核≥2源`
7. 所有 `⚠️` 标注均有对应的 pcb-gap-report 记录
8. akshare 覆盖率（A 类财报数据覆盖只数 / 总只数）≥ 80%

8 项全过 → 可设 `active`，你拍板通过 → commit。

---

### Step 7：commit 规范

```bash
git add data/<chain-id>.js
git commit -m "feat: 新增<链名>链(active·<N>只·G8通过)"
git push
```

---

## 三、数据来源优先级速查

| 级别 | 来源 | 用于 | 标注 |
|------|------|------|------|
| primary | 季报/年报原文（akshare/cninfo） | 营收/净利/毛利率/PE | `tier:'primary'` |
| broker | 券商研报（≥2源） | 市占率/产能/行业数据 | `tier:'broker'` |
| estimate | 行业协会/Prismark/公司官方 | 全球排名/CAGR | `tier:'estimate'` |
| media | 媒体/自媒体（单源） | 参考，不单独作为硬数字 | `tier:'media'` + `⚠️单源待核` |

---

## 四、G3 反向陷阱清单（建链时逐条过）

1. **多业务板块陷阱**：某板块亏损 ≠ 目标产业链相关板块景气下滑（来源：液冷·博威合金）
2. **绝对化表述**："独家/唯一/100%" 需 ≥2 源核实（来源：PCB·菲利华体检）
3. **小净利+高PE+trend=up**：PE 分位>90% 且近期净利极小时，valuation trend=up 方向大概率打反，应为 down（来源：PCB六维复查·宏昌/宏和/兴森/世名）
4. **个股 vs 赛道级打分不对齐**：同一只票在 segments 里的 dims6 score 与 prosperity.dims 对应维度相差>1 档时，个股级优先对齐赛道级（来源：PCB·菲利华）
5. **PE失真期score无依据**：亏损/微利期 PE-TTM 失真，score 不能基于失真 PE 推断，必须补 PB/PS 替代指标（来源：PCB六维复查·5只PE失真票）
6. **成本结构占比 ≠ 国产化率**（来源：液冷链）
7. **市占率时序陷阱**：数字要核对对应年份（来源：PCB·鼎泰高科）
8. **历史季度数据年份不得改动**（来源：PCB·胜宏科技）

---

## 五、position 字段写法规范

**格式**：`'关键词1·关键词2·关键词3'`（·分隔，不超过3个核心点）

**必须包含**（按优先级）：
- 市占率或全球排名（有①级数据时写具体数字，否则写定性描述）
- 核心竞争力（技术壁垒/客户/认证）
- 景气相关性（AI纯度高/纯度低/国产替代）

**禁止写**：
- 无来源的绝对化数字
- 超过3个核心点（太长读不下去）
- 纯主观判断（"前景广阔"之类）

**示例对比**：

❌ 差：`'覆铜板龙头，市场前景广阔，技术壁垒高'`
✅ 好：`'刚性CCL全球前10·大陆第三(Prismark·2023)·M8量产M9测试中'`

---

## 六、新链启动快捷指令

给 CC 的标准启动语：

```
按 new-chain-sop.md 建 [链名] 链（id:[chain-id]）。
已知标的：[列出10-20只个股代码和名称]
核心卡口初判：[1-2个环节]
第一步先搭骨架，A类数据用akshare补，dims6按规范打分，G8过了再设active。
对照pcb.js的结构，字段格式保持一致。
```

---

*本文档随每条新链的实战经验持续更新，下次更新触发条件：新链建成后发现 PCB SOP 未覆盖的问题模式。*
