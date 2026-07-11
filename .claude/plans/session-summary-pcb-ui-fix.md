# 会话摘要·PCB UI Fix 启动（2026-06-23）

## 当前 HEAD

```
192ee85  feat: HBM R1 准入提质（fourQ 5段对齐+4处tier降级+31只trendNote真值）
ed74d34  chore: HBM R1 · segments[2]命名修正 + 豆包prompt v1写入
f040fe3  chore: HBM R1 批1 · 4处tier降级 + fourQ 4段→5段骨架 + HBM 工具复用
```

天然还原点：`f040fe3`（HBM R1 批 1）/ `ed74d34`（R1 段名修正）/ `192ee85`（R1 完成·当前）

---

## ⚠️ PCB 页面优化 7 项需求（用户口述·2026-06-23）

### 1. 趋势箭头颜色 bug

- **问题**：持平 `flat` / 向右 `→` 应显示**灰色**
- **现状 bug**：当前"壁垒安全垫 3/5"向右显示**红色**（应该是灰色）
- 涉及：trendBadge 函数 + .tg-gray CSS 类（已存在但 flat 没走灰分支）

### 2. 表格排版三类问题（主表）

- 壁垒评级（极高 / 高）**换行问题**
- tier 圆点后字母看不懂（如 ●★★☆ 视觉不直观）
- 列宽分配不合理（有的列挤压 / 有的列空）

### 3. 同问题 2·全表通篇检查

- 把第 2 项的三类问题扩展到**所有表格**（segments 主表 + 备用表 + midstream + fourQuestions + chokePoints + treeMap 等）
- 不只 PCB·13 赛道全量过一遍（用户原话"同问题2，通篇检查"）

### 4. 胜宏科技（300476）dims6 不一致 bug

- **问题**：在 **AI PCB 段**和**中游段**的 dims6 评分**不一致**（应为同一只 stock 全站 dims6 一致）
- 根因：dims6 可能在两处硬编码副本·未走单点真理来源
- 修法：每只 stock 的 dims6 只能有 1 份·按 stock code 单点真理·多段引用同一份

### 5. 物理卡口表格横向滚动条 bug

- **问题 1**：物理卡口表格有**横向滚动条**（说明列宽溢出）
- **问题 2**：单元格**内容过长**（长字段未换行/截断/展开）
- **问题 3**：应**删除底部滚动条**（横向溢出要靠列宽自适应处理掉·不该出现滚动条）
- 涉及：chokePoints 表格 + verification 面板

### 6. 卡口标的数量待确认

- **问题**：卡口标的是**固定 3 个**（PCB 当前是 3 个 chokePoint）还是**动态筛选**？
- **待确认**：用户倾向哪种？固定 3 个简单可控 / 动态筛选（按 tier 阈值）灵活但需规则
- 决定后影响：data/pcb.js `chokePoints` 数组是写死 3 个 还是程序从 segments.stocks 筛 tier≥★★☆ 自动生成

### 7. 卡口标的六维评分偏低·原因说明

- **现象**：卡口标的的 dims6 综合分**比其他标的低**（直觉上卡口应该最强）
- **根因待查**：可能是 barrier 维度评分被其他维度拉低 / 卡口标的在 visibility/supply 维天然不高
- **需要**：在卡口卡片底部加**说明文字**解释"为什么评分看起来低·其实壁垒高在 barrier 维单点"
- 写作模板：参考 methodologyNotes 风格

PCB 现状基线（用于设计参考）：
- meta.status = `'active'` / `updatedAt='2026-06-23'` / 完整度 90.9%
- segments 6 段 + 40 只 stock + 5 列 treeMap + 4 问 5 段 + 3 卡口 + 6 维景气
- 所有 stock 有 dims6（6 维全填）+ src + trend/trendNote
- chokePoints[].valuation 已填 PE 分位 + grossMargin + 🆪 note
- 27 处 src 中文描述无 URL（P1 暂缓）

---

## ✅ Serenity 买入信号模块设计（用户口述·2026-06-23）

### 完整闭环公式

> **买入信号 = 物理卡口 + 估值回落（低 PE 分位）+ 六维确认壁垒未走弱**

三条件 AND，缺一不触发：

| 条件 | 阈值 | 数据来源 |
|---|---|---|
| **物理卡口** | tier ≥ ★★☆（极高/高）·覆盖供给寡头/需求刚性/技术壁垒三维 | `data/<id>.js` `chokePoints[].tier` |
| **估值回落** | PE 分位 < 阈值（**功能 A** 用 50% / **功能 B** 用 40%） | `valuation.pePercentile` |
| **六维未走弱** | dims6 综合分不显著下滑·barrier 维未走 down | `stocks[].dims6[barrier].trend !== 'down'` |

闭环：
```
筛选卡口 → 结合六维 → 买入持有 → 等待重新定价
```

### 新功能 A·上车点分析模块

- **位置**：chain 视图新增独立 section（位置待定·建议放「③ 卡口」之前或「⑤ 总结」之后）
- **筛选条件**：
  - `barrier` 极高（5）或高（4）
  - `pePercentile < 50%`
  - `trend === 'up'`
- **展示**：表格列出命中 stock·3 列（股票名 / 当前 PE 分位 / 趋势）+ 一句话上车理由

### 新功能 B·卡口但低估模块

- **位置**：chain 视图新增独立 section（紧跟新功能 A 之后）
- **标题**：`📍卡口但低估：市场尚未定价的机会`
- **筛选条件**：
  - 命中卡口标的（`chokePoints[].code`）
  - `pePercentile < 40%`（**比功能 A 阈值更严**）
  - 卡口壁垒维度（`barrier`）未走弱（trend !== 'down'）
- **展示**：每条卡口标的·PE 分位数字 + 一句话"市场尚未定价"理由 + 链接到对应卡口卡

### 待细化（PCB 实施时敲定）

1. PE 分位阈值（A=50% / B=40% 暂定·验证 PCB 数据后再调）
2. 六维综合分阈值（4.0？3.5？）
3. "未走弱"严格定义（barrier 单维 ≠ 'down'？还是综合分不下降？）
4. 是否生成自动信号列表（按 stock 全量扫·给"建议关注"清单）
5. 是否联动 localStorage `myCards` 自动建占位卡
6. 命中卡口标的时·信号推送到决策卡片库是否要用户手动确认

---

## HBM R2 估值刷新·状态（暂停·待 PCB 改完后恢复）

| 项 | 状态 | 数据 |
|---|---|---|
| meta.status | `'partial'` | 等 R2 完成后才推进 `'active'` |
| akshare PE-TTM | ✅ 可用 | `stock_zh_a_spot_em`（akshare 1.18.60） |
| akshare PE 分位 | ❌ 无现成接口 | 硬阻塞·需 K 线+自己算 or 第三方 or 券商研报 |
| akshare 从高点回落 | ❌ 无现成接口 | 同上 |
| 31 只 stock code | ✅ 已盘点 | segments 27 + midstream 4 = 31 |
| dims6 6 维 key | durability/visibility/policy/supply/valuation/barrier | 每 dim `{key, score, trend}` |
| valuation 字段结构 | `{pe, pePercentile, grossMargin, fromHigh, asOf, note}` 6 子字段 | pe/note 全 🆪 AI 主观 |
| segments[].stocks[].valuation | **全部 undefined** | 字段缺失·需 R2 全量补 |
| chokePoints[].valuation | 3/3 全填·全 🆪 | fromHigh 全 `—` |

### 数据获取路径·用户选择：**路径 C（券商研报·最合规）**

| 路径 | PE-TTM | PE 分位 | 速度 | 合规性 | 选 |
|---|---|---|---|---|---|
| A · akshare 批量 + 第三方分位 | ✅ | ⚠️ 第三方补 | 中 | 🆪 推断 | _ |
| B · 豆包逐只查 | ⚠️ | ⚠️ | 慢 | 🆪 主观 | _ |
| C · 券商研报引用 | ✅ | ✅ | 快 | 🔵 broker | **✅** |

---

## 关键文件位置

| 角色 | 路径 |
|---|---|
| PCB 数据层 | `d:\乌龟\产业链全景\data\pcb.js` |
| HBM 数据层 | `d:\乌龟\产业链全景\data\hbm.js` |
| 渲染/路由/业务 JS | `d:\乌龟\产业链全景\index.html`（主 inline script ~157K chars） |
| 容错 guard | `index.html` `renderChain` 函数顶部（单条 data 加载失败显示红卡） |
| PCB 预检工具 | `d:\乌龟\产业链全景\.claude\plans\tools\pcb-pre-flight-check.js` |
| HBM 预检工具 | `d:\乌龟\产业链全景\.claude\plans\tools\hbm-pre-flight-check.js` |
| 幻觉筛查工具 | `d:\乌龟\产业链全景\.claude\plans\tools\hbm-hallucination-screen.js` |
| 豆包 prompt v1 | `d:\乌龟\产业链全景\.claude\plans\hbm-doubao-prompt-v1.md` |
| R1 完成摘要 | `d:\乌龟\产业链全景\.claude\plans\session-summary-hbm-r1-done.md` |
| R2 暂停摘要 | `d:\乌龟\产业链全景\.claude\plans\session-summary-hbm-r2-paused.md` |
| **本摘要** | `d:\乌龟\产业链全景\.claude\plans\session-summary-pcb-ui-fix.md` |

---

## PCB 工作流（恢复后按此顺序）

1. 用户 CLEAR → 我读本摘要 + 询问 7 项 PCB 优化具体内容
2. 用户给出 7 项 + 买入信号详细规格
3. 启动 serenity skill 走 PCB 修改流程
4. 改完 commit（每个升级一个 commit·中文 message 描述内容变化）
5. 恢复 HBM R2·按路径 C 跑 31 只 stock 估值
6. 路径 C 完成后 meta.status `partial → active`·HBM R2 commit

---

## 紧急回滚

```bash
git reset --hard 192ee85  # HBM R1 完成态（最稳）
git reset --hard f040fe3  # HBM R1 批 1（次稳·不含 R1 trendNote 真值）
```
