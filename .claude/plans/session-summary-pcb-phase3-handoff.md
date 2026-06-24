# PCB 产业链看板 · 阶段三 + 阶段四 + 阶段五 Handoff 会话摘要

> **HEAD**: `2095a2f`（commit 4.13·流图关联 supplyGap + 删除 segments[6]）
> **天然还原点**: `192ee85`（HBM R1 完成态）/ `f2ef298`（阶段一末）/ `4fe4fba`（阶段二末·卡口动态化完成）/ `0aecae0`（阶段三 3.5 末）/ `c403f12`（阶段三 3.4.1 末）/ `91f1a59`（commit 4.0）/ `888fdc8`（commit 4.5）/ `fa8d7f5`（commit 4.6）/ `2386e7b`（commit 4.7 修复）/ `7d8e036`（commit 4.8）/ `ede2e52`（commit 4.9）/ `7d32670`（commit 4.12）/ `7ac0c7d`（commit 4.13 单源核实）/ `2095a2f`（commit 4.13 流图+segments[6]）
> **前置规则**: CLAUDE.md §6 全部纪律 + §6.8 数据准确度优先 + §6.9 双重检查 + §6.10 三重验证 + §7 数据自查纪律 + verify-single-source skill

---

## ⚠️ 历史遗留：commit 4.10 / 4.11 在 git reflog 中丢失

`git reflog` 显示 HEAD@{7} 出现 `reset: moving to HEAD`，commit 4.10（流图视图/数据截止/changelog/git 接口 5 需求合并）与 commit 4.11（chokepoint 弱卡口补全 + 注释清理 + segments[6] 设计问题）的 commit hash 在 git history 中**不可恢复**（已被 reset 丢弃）。

**代码改动状态**：通过 `git diff b0c51c5 HEAD` 验证，commit 4.10 / 4.11 的部分代码改动（midstream 折叠修复、referenceChokepoints 中文名+数组换行、CSS word-wrap 溢出修复、commit 4.11 选 B TODO 注释等）已合并进 commit 4.9 (ede2e52) 与 commit 4.12 (7d32670) 之间的代码状态。

**commit 4.10 / 4.11 真实改动**（虽然 commit hash 丢失但功能已落地）：
- commit 4.10：5 需求合并（删刷新指令按钮 + 删 pin/unpin + 数据截止重定位 + changelog 过滤 + git 接口 + fallback）
- commit 4.11：chokepoint 002916/600183 补全 + 注释清理 + segments[6] 设计问题报告 + CSS 溢出修复
- commit 4.12：3 条自动 ⚠️ flag 规则（数据过期/分位极端高/单源PE）

**未来 commit 引用**：如需精确回滚到 4.10 / 4.11 改动状态，可参考 `git show ede2e52` 的代码快照。

---

## 0. 阶段三 + 阶段四 + 阶段五全部 commit 已完成 ✅

### 阶段三（数据层·估值流水线）

| Commit | Hash | 内容 | 状态 |
|---|---|---|---|
| 3.1 | `620dfde` | baostock 单源拉 38 只 pe_ttm | ✅ |
| 3.1.1 | `e7f1c9c` | pe_history 序列写入 + 亏损股修复（latest_pe 距今 30 天内·pe_history 保留历史有效数据）| ✅ |
| 3.2 | `375def4` | numpy 算 PE 分位 + entryZone + fromHigh_pe（不拉网络）| ✅ |
| 3.3 | — | **跳过**（commit 2.2 通用注入自动覆盖 segments+midstream+chokePoints 4 字段·无需新代码）| ✅（跳过）|
| 3.4 | `6f59b9d` | 买入信号 A/B 模块（program-derived·5 条排除规则·growthAdj 通道暂留空）| ✅ |
| 3.4.1 | `c403f12` | growthAdj 名单（8 只核心 AI 链）+ peAbsMax:60 | ✅ |
| 3.5 | `0aecae0` | baostock 拉 close 历史 + 真实价格 fromHigh（覆盖 commit 3.2 fromHigh_pe 占位字段·改名 fromHigh）| ✅ |

### 阶段四（数据治理）

| Commit | Hash | 内容 | 状态 |
|---|---|---|---|
| **4.0** | **`91f1a59`** | **删 688234 错码股票（3 文件 38→37）+ L1563 fromHigh 友好文案格式化（formatFromHigh helper·9/9 单元测试通过）** | **✅** |

### 阶段五（UI 体验优化·结论优先 + 视觉收敛 + 图景可视化 + 字体统一）✅ 全部完成

| Commit | Hash | 内容 | 状态 |
|---|---|---|---|
| **4.5** | **`888fdc8`** | **结构重组：卡口结论 promoted to ① 顶部 + 买入信号监测紧跟 + 深度默认折叠 + 顶部锚点导航 + sessionStorage 折叠记忆** | **✅** |
| **4.6** | **`fa8d7f5`** | **视觉收敛：4 档语义色（绿/红/黄橙/灰）+ 标签精简至 3（壁垒/趋势/PE）+ 核心逻辑摘要+展开 + 字号分层 + 间距 8→24** | **✅** |
| **4.7** | **`2386e7b`** | **产业链图景可视化优化：横向流图（默认）+ 5 列列表（切换）+ 节点点击展开 + 🔒 卡口高亮 + sessionStorage 视图记忆（含切换按钮失效修复）** | **✅** |
| **4.8** | **`7d8e036`** | **字体统一简化：单字体栈（PingFang SC/Microsoft YaHei）+ 字号 5 档层级 + 删 16 处 font-family 残留 + 删 Google Fonts 4 行外部依赖** | **✅** |
| **4.9** | **`ede2e52`** | **中游 PCB section 折叠（默认展开 + 可点收起）** | **✅** |
| **4.10** | **⚠️ git history 中丢失（reset 丢弃）· 代码改动已合并到后续 commit** | **5 需求合并（删刷新指令 + 删 pin/unpin + 数据截止重定位 + changelog 过滤 + git 接口 + fallback）** | **⚠️ hash 丢失** |
| **4.11** | **⚠️ git history 中丢失（reset 丢弃）· 代码改动已合并到后续 commit** | **chokepoint 002916/600183 补全 + 注释清理 + segments[6] 设计问题报告 + CSS 溢出修复** | **⚠️ hash 丢失** |
| **4.12** | **`7d32670`** | **3 条自动 ⚠️ flag 规则（数据过期 / 分位极端高 / 单源PE）+ GBK stdout fix + _meta.note 更新** | **✅** |
| **4.13** | **`7ac0c7d`** | **301511 德福科技 HVLP5 ⚠️单源→✅双源核实（兴业证券·2026-05-16）· 按 verify-single-source skill 流程** | **✅** |
| **4.13'** | **`2095a2f`** | **流图关联 supplyGap（4 级 fallback 匹配 v4·双向单字重叠）+ 删除 segments[6]「AI PCB 制造(中游)」段（与 midstream 100% 重叠）+ 匹配算法修复（避免 CCL 误匹配）** | **✅** |

**🎉 阶段 A（结构重组）+ 阶段 B（视觉收敛）+ 产业链图景可视化（横向流图 + supplyGap 关联）+ 字体统一 + 折叠增强 + 自动 ⚠️ 规则 + 单源核实流程 + segments 去重 全部完成 ✅**

---

## 6. 下一阶段待办

### 6.1 commit 4.13' ✅ 已完成（`2095a2f`）

- ✅ 流图关联 supplyGap（4 级 fallback 匹配 v4·双向单字重叠）
- ✅ 删除 segments[6]「AI PCB 制造(中游)」段（与 midstream 100% 重叠）
- ✅ 匹配算法修复（避免 CCL 误匹配 HVLP4 铜箔）
- ✅ segments.stocks 合计 34 → 29（去重后真实数）
- ✅ 3 个核心卡口节点（电子树脂 / 玻纤布 / HVLP4 铜箔）匹配 supplyGap 显示缺口率

### 6.2 未来可能 commit（用户决策）

- segments.stocks 命名清理（如「电子树脂(碳氢/PPO)」改为「M9 碳氢树脂」与 supplyGap.segment 一致，简化匹配算法）
- supplyGap 数据扩展（增加 ABF 膜 / BT 载板 等其他 3 个 chokePoints 对应的缺口数据）
- 002916 深南电路 ⚠️单源待核 待 verify-single-source skill 处理

---

## 7. PCB 收尾后 · HBM R2 恢复（下一个项目）

**阶段三 6 个 commit + 阶段四 1 个 commit**· 阶段三 3.3 跳过· PCB 估值流水线全部跑通 + 阶段四 688234 错码清理完成。

---

## 1. 当前数据完整性（commit 4.0 HEAD = `91f1a59`）

| 字段 | 注入数 | 覆盖率 |
|---|---|---|
| pe_ttm | 34/37（3 只亏损股 null）| 91.9% |
| pe_history | 37/37（3 只亏损股有历史但无最新）| 100% |
| pePercentile | 34/37（3 只亏损股 null）| 91.9% |
| entryZone | 37/37（3 只亏损股保留历史参考）| 100% |
| fromHigh（真实价格·commit 3.5）| 37/37 | 100% |
| fromHigh_pe（commit 3.2 占位·已删除）| 0/37 | 0%（已清理）|
| closeLatest + closeHigh5y | 37/37 | 100% |
| flag | 37/37（3 只亏损股 + 4 只 PE>500 异常·其余 null）| 100% |
| signal（commit 3.4·0 只命中）| 34/37 | 91.9% |
| **growthAdj:true（commit 3.4.1）** | **8/37** | **21.6%** |
| **peAbsMax:60（commit 3.4.1）** | **8/37** | **21.6%** |

**5 只可投卡口 valuation 完整字段**：

| code | name | pe_ttm | pePctl | fromHigh | flag |
|---|---|---|---|---|---|
| 601208 | 东材 | 190.81 | 99.75% | -10.00% | null |
| 300395 | 菲利华 | 138.96 | 95.87% | -15.92% | null |
| 301217 | 铜冠 | 867.20 | 82.88% | -14.09% | ⚠️PE异常高·可能失真 |
| 002916 | 深南 | 79.84 | 99.75% | -6.85% | null |
| 600183 | 生益 | 103.80 | 99.67% | -9.01% | null |

**8 只 growthAdj 名单（commit 3.4.1 已注入）**：

| code | name | barrier | pe_ttm | pePctl |
|---|---|---|---|---|
| 300395 | 菲利华 | 极高 | 138.96 | 95.87% |
| 600183 | 生益科技 | 极高 | 103.80 | 99.67% |
| 601208 | 东材科技 | 极高 | 190.81 | 99.75% |
| 002916 | 深南电路 | 极高 | 79.84 | 99.87% |
| 300476 | 胜宏科技 | 高 | 74.65 | 95.98% |
| 301377 | 鼎泰高科 | 高 | — | 99.88% |
| 002463 | 沪电股份 | 高 | 62.91 | 90.48% |
| 688630 | 芯碁微装 | 高 | — | 99.67% |

---

## 2. growthAdj 名单决策（commit 3.4.1 已完成）

### 阈值常量（plan §4.4 + 用户扩展）

| 通道 | 信号 A | 信号 B | peAbsMax 检查 |
|---|---|---|---|
| 普通 | barrier∈{极高,高} ∩ pePercentile<50% ∩ trend==='up' | 命中可投卡口 ∩ pePercentile<40% ∩ trend!=='down' | 否 |
| growthAdj | barrier∈{极高,高} ∩ pePercentile<70% ∩ pe_ttm<peAbsMax ∩ trend==='up' | 命中可投卡口 ∩ pePercentile<60% ∩ pe_ttm<peAbsMax ∩ trend!=='down' | 是 |

### 当前实际触发情况

⚠️ 8 只 growthAdj 股票全部未触发信号（0 命中）：

- **5 只卡口标的**（300395/600183/601208/002916/300476）pePercentile 95-99% · 远超 growthAdj 阈值 60%/70%
- **3 只高 barrier**（301377/002463/688630）pePercentile 90-99% · 同样远超阈值
- **原因**：当前 PCB 板块 PE 普遍高位（AI 热度持续）· growthAdj 通道是为「分位回调到 60%-70% 区间」预留的·触发条件未到
- **不删除字段**：未来 PCB 板块 PE 回调到 60% 分位以下时，growthAdj 通道将自动触发（信号 A 在分位<70% 时开始命中）

### 不入选名单（写进 commit message 说明原因）

- 301217 铜冠铜箔 · flag="⚠️PE异常高·可能失真" · 信号逻辑已排除 · growthAdj 无效
- 301200 大族数控 · pePctl=100% · fromHigh=0 · 今日创 5 年新高 · 加 growthAdj 放宽到 70% 也不命中
- 301511 德福科技 · AI 次链 · pePctl=60.86% · 待行情回调后再评估
- 688183 生益电子 · AI 次链 · pePctl=59.50% · 同上 · 后续补入
- 001389 广合科技 · AI 次链 · pePctl=96.28% · 现在加了也不命中 · 后续补入
- 002938 鹏鼎控股 · 消费占比约 70% · AI 暴露度不足 · 归传统链
- 603256 宏和科技 · flag="⚠️PE异常高" · 信号逻辑已排除 · growthAdj 无效
- 002436 兴森科技 · flag="⚠️PE异常高" · 同上
- 300522 世名科技 · 传统链 · AI 暴露度低
- 603519 南亚新材 · 传统链 · AI 暴露度低
- 605589 圣泉集团 · 传统链 · AI 暴露度低
- 603186 华正新材 · 传统链 · AI 暴露度低
- **688234 错码股票** · baostock 拉到的是天岳先进碳化硅衬底而非中一科技 · **commit 4.0 已删**

---

## 3. 数据自查纪律（CLAUDE.md §7 已追加 · 2026-06-23 永久生效）

每个涉及数据的 commit 必须输出 `=== 数据自查报告 · [commit 编号] ===` 含 4 节：
1. 【已知正确】+ 验证依据
2. 【已知错误/异常】+ 根因 + 是否已修复
3. 【待核实（人工抽查）】+ 核对路径
4. 【数据完整性统计】

commit 2.3.1 / 3.1 / 3.1.1 / 3.2 / 3.4 / 3.4.1 / 3.5 均已输出自查报告。

---

## 4. 待人工核对（§7.3 阶段交界前必查）

| # | 项目 | 数量 | 核对路径 |
|---|---|---|---|
| 1 | PE-TTM 实际值核对（验证 baostock 没拉错）| 37 只 | 同花顺 → 个股 → 财务/简况 → 估值分析 → 改 5 年 |
| 2 | PE 分位核对 | 37 只 | 同花顺 / choice → 个股 → 估值指标 → 历史 PE |
| 3 | 亏损股确认（3 只·commit 4.0 后从 4→3）| 600110/603936/605006 | 同花顺 → 主要财务指标 → EPS 连续亏损 |
| 4 | PE>500 异常 PE 实际值（4 只）| 603002/301217/603256/002436 | 同花顺 → 财务/简况 → 估值分析 |
| 5 | close 价格 + fromHigh 核对 | 37 只 | 同花顺 → 个股 → K 线 → 当前收盘价 |
| 6 | 铜冠 301217 历史 < 5 年（701 行从 2022-01-27 起）·核对 baostock 起始日期 | 1 只 | 同花顺 → 个股 → 上市日期 |
| 7 | ~~688234 错码股票（baostock 拉到的是天岳先进碳化硅衬底）~~ | — | **commit 4.0 已删 688234·3 文件全清** |
| 8 | 业绩可见度中"Q1 营收+净利同比%"数字 | 37 只 | 巨潮 cninfo / 同花顺 F10 → 季报 |
| 9 | growthAdj 名单 8 只 peAbsMax:60 是否合适（PE 远高于 60·5 只 PE>100）| 8 只 | 同花顺 → 估值分析 → 当前 PE-TTM |

---

## 5. PCB 收尾后 · HBM R2 恢复（下一个项目）

### 5.1 复用 PCB 阶段三流水线

HBM 阶段三估值刷新可以**完全复用** PCB 的 3 个脚本：

| 脚本 | 路径 | PCB 用途 | HBM 复用要点 |
|---|---|---|---|
| `refresh_pcb_valuation.py` | `scripts/refresh_pcb_valuation.py` | 拉 pe_ttm + pe_history | 改 ① `MANUAL_JS = hbm.manual.js` ② baostock login 流程相同 ③ 输出文件名 `hbm.auto.js` |
| `calc_percentile.py` | `scripts/calc_percentile.py` | 算 pePercentile / entryZone / fromHigh | **完全复用**（只改 `AUTO_JS` 路径）· HBM 无 close 拉数需求（fromHigh_pe 即可） |
| `fetch_close_history.py` | `scripts/fetch_close_history.py` | 拉 close 5y 算真实 fromHigh | **可选** · HBM 可先省略（只有 H 股/科创板有完整 close 历史）|

### 5.2 HBM 流水线待办

按 plan §9 HBM R2 恢复：

1. **HBM 脚本迁移**——3 个 PCB 脚本复制为 `refresh_hbm_valuation.py` / `calc_hbm_percentile.py` / `fetch_hbm_close.py`（改路径+改文件名前缀）
2. **baostock 拉 31 只 pe_ttm**——`hbm.manual.js` 的 STOCK_REGISTRY 31 只 stock codes → 拉 5 年 pe_ttm 历史
3. **算 PE 分位 + fromHigh**——`hbm.auto.js` 生成
4. **合并到 hbm.js 兼容壳**——4 字段（pe_ttm/pePercentile/entryZone/fromHigh）注入
5. **meta.status 修正**：`partial → active` · 31 只 stock 全部覆盖
6. **growthAdj 名单**（按 PCB 模板·HBM 31 只按 barrier 极高/高 + AI 暴露度筛选）
7. **HBM 信号 A/B 注入**（复用 PCB commit 3.4 buySignal 模块代码）
8. **产出 handoff 文档**：`session-summary-hbm-phase3-handoff.md`

### 5.3 HBM 阶段三预估工时

| 子任务 | 复杂度 | 预估 commit 数 | 预估 token |
|---|---|---|---|
| 脚本迁移 | 低 | 1（一次提交 3 脚本 + 1 README）| ~50k |
| baostock 拉数 | 中 | 1 | ~80k |
| 算分位 | 低 | 1（脚本复用）| ~50k |
| 合并到 hbm.js | 中 | 1 | ~80k |
| meta.status + growthAdj 名单 | 中 | 1-2 | ~60k |
| HBM 信号注入 | 中 | 1（复用 PCB 模块）| ~60k |
| handoff 文档 | 低 | 1 | ~30k |
| **总计** | — | **6-8 个 commit** | **~410k token** |

### 5.4 HBM 阶段三 · 风险点（PCB 阶段三的教训）

- ⚠️ **688234 类错码**：HBM 是否存在类似 baostock 错码的 stock？需 pre-flight-check
- ⚠️ **亏损股 PE 处理**：HBM 31 只中可能有亏损股（按 PCB 模板·pe_ttm=null 保留 history）
- ⚠️ **HBM PE 历史覆盖期**：HBM 概念 2024 起火·历史 < 5 年· WIN_HISTORY_MIN=252（1y）可能需调低
- ⚠️ **growthAdj 名单**：HBM 31 只需逐一审查 AI 暴露度·不能直接套 PCB 8 只

---

## 6. PCB 阶段四（plan §4.6 未列·用户可加·非阻塞）

| Commit | 内容 | 状态 |
|---|---|---|
| **4.0** | **删 688234 错码股票（3 文件 38→37）+ L1563 fromHigh 友好文案格式化** | **✅ `91f1a59`** |
| 4.1 | 信号 UI 渲染（chain 视图新增「📍 上车点分析」+「📍 卡口但低估」两个 section）| 待用户决策 |
| 4.2 | 卡口六维偏低说明（methodologyNotes 风格）| 待用户决策 |
| 4.3 | 景气度 override（commit 3.5 遗留）| 待用户决策 |

**当前 HBM R2 恢复优先于 PCB 阶段四**（commit 4.0 已完成·4.1/4.2/4.3 待用户决策）。

---

## 7. 紧急回滚

```bash
# 阶段三+commit 3.4.1+commit 4.0 任一 commit 后回滚
git reset --hard 91f1a59   # 保留到 commit 4.0（保留阶段一+阶段二+阶段三 3.1-3.5 + 阶段四 4.0）
git reset --hard c403f12   # 保留到 commit 3.4.1
git reset --hard 0aecae0   # 保留到 commit 3.5（保留阶段一+阶段二+阶段三 3.1-3.5）
git reset --hard f2ef298   # 回滚阶段三·保留阶段一+阶段二
git reset --hard 192ee85   # 完全回滚（阶段一二三都不要）
```

---

## 8. 关键文件位置

| 角色 | 路径 |
|---|---|
| PCB 数据层 | `d:\乌龟\产业链全景\data\pcb.js` |
| PCB 手动层（38 只 stock）| `d:\乌龟\产业链全景\data\pcb.manual.js` |
| PCB 自动层（38 只 stock 估值·1.57 MB）| `d:\乌龟\产业链全景\data\pcb.auto.js` |
| HBM 手动层（31 只 stock）| `d:\乌龟\产业链全景\data\hbm.manual.js` |
| HBM 数据层 | `d:\乌龟\产业链全景\data\hbm.js` |
| 阶段一末 commit | `f2ef298` |
| 阶段二末 commit | `4fe4fba` |
| 阶段三 3.5 末 commit | `0aecae0` |
| 阶段三 3.4.1 末 commit | `c403f12` |
| **阶段四 4.0 末 commit（HEAD）** | **`91f1a59`** |
| 拉数脚本 | `d:\乌龟\产业链全景\scripts\refresh_pcb_valuation.py` |
| 分位脚本 | `d:\乌龟\产业链全景\scripts\calc_percentile.py` |
| close 脚本 | `d:\乌龟\产业链全景\scripts\fetch_close_history.py` |
| 渲染/路由/业务 JS | `d:\乌龟\产业链全景\index.html` |
| 治理纪律 | `d:\乌龟\产业链全景\CLAUDE.md` |
