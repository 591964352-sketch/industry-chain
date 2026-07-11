# HBM R1 完成摘要（2026-06-23）

## 当前 HEAD

**`192ee85`**（已 push `origin/master`：`83bbe49..192ee85 master -> master`）

## HBM R1 完成内容

### 3 个 commit 链路（天然还原点 `f040fe3`）

| commit | 类型 | 内容 |
|---|---|---|
| `192ee85` | feat | R1 准入提质：32 个 trendNote 重写 + meta.status→partial + CHANGELOG |
| `ed74d34` | chore | segments[2] 命名修正（前驱体材料→先进封装材料·4 处同步）+ 豆包 prompt v1 |
| `f040fe3` | chore | R1 批 1：4 处 tier 降级 + fourQ 4 段→5 段骨架 + HBM 工具复用 |

### 关键改动

- **B1.4 · 4 处 tier 降级**：688535 华海诚科 (estimate→media) / 002409 雅克 (estimate→media) / 603773 沃格 (broker→media) / 002156 通富 (primary→estimate)
- **B1.5 · fourQ 4→5 段**：3 处段名严格匹配（GMC/前驱体/可切换）+ 新增第 5 段测试设备（5 只占位）
- **B2.5 · 32 个 trendNote 实例**：segments[0-4] 各 5-6 只 + midstream 归入 4 只新写（沃格/香农/兆易/佰维）+ 3 处 ⚪ 单源标注（华海诚科/雅克/赛腾）+ 通富"长鑫后道" estimate→broker 三源（中信+东方+巨潮）
- **B2.6 · meta**：`status='active'→'partial'`·`updatedAt='2026-06-23'`
- **index.html CHANGELOG**：HBM R1 准入提质条目（sector:'hbm' / type:'🆕' / pct:'P0'）

## 待办清单（HBM R1 范围外）

1. 🆪 **AI 估值未刷新** —— HBM R2 任务（valuation 字段在 chokePoints + segments 全量重做）
2. 🟡 **27 处 src 真 URL 补全** —— P1 暂缓
3. 🟡 **hallucination-screen 2 个 defect 修复**
   - 缺陷 #1：isST 检测未排除产品型号中的 "ST" 字符串（正则 `/ST(?!R)/g` 误判 STS8300 等产品型号）
   - 缺陷 #2：事件密度阈值未按 stock 数量缩放（5-9 只 stock 共享同一 7 段式输出时总事件数天然放大，导致 false positive）
4. 🟡 **lessons-learned 归档** —— 写入 SKILL.md 新模式（hallucination-screen 人工审核模式 + 13 只 NOT FOUND 处理模式）

## HBM R2 下一步

- AI 估值刷新：**26 只 stock × 6 维 dims6 评分**（valuation 维单独重做）
- valuation 字段在 `chokePoints[i].valuation` + `segments[i].stocks[i].dims6[valuation]` 全量注入
- 估值维：PE-TTM + PE 分位 + 从高点回落 + 🆪 AI 主观
- meta.status：`'partial' → 'active'` 准入门槛（达到 PCB 90.9% 同款）

## 关键文件位置

| 文件 | 路径 | 角色 |
|---|---|---|
| 数据层 | `d:\乌龟\产业链全景\data\hbm.js` | 31 只 stock + 5 段 + midstream 11 + 4 问 5 段 |
| 工具 1 | `d:\乌龟\产业链全景\.claude\plans\tools\hbm-pre-flight-check.js` | 退市状态预检 |
| 工具 2 | `d:\乌龟\产业链全景\.claude\plans\tools\hbm-hallucination-screen.js` | 4 层幻觉筛查（含 2 个 defect 待修复） |
| Prompt | `d:\乌龟\产业链全景\.claude\plans\hbm-doubao-prompt-v1.md` | 5 段豆包 prompt（328 行·11 条硬约束） |
| Checklist | `d:\乌龟\产业链全景\.claude\scratch\hbm-R1-checklist.md` | 三层清单 ✅/⚠️/❌ |
| 状态报告 | `d:\乌龟\产业链全景\.claude\scratch\hbm-R1-status-2026-06-23.md` | P0 缺口清单 |
| 工具 wrapper | `d:\乌龟\产业链全景\.claude\scratch\hbm-b2-bulk-screen.js` | 5 段 bulk 跑 hallucination |
| 5 段返回 | `d:\乌龟\产业链全景\.claude\scratch\hbm-b2-doubao-returns\prompt1.txt` | prompt 1 豆包返回（仅 prompt1 保存·2-5 未存档） |

## 核心机制（5 条·原文照抄）

### 1. §6.2 红线：CC 永远不得自行编造数据

> CC 永远不得自行编造或"估算"财报、市占、缺口、产能、价格。
> 联网搜不到 → 标 `estimate` / 待核 或保留旧值+日期，**绝不填一个看似精确的数字**。
> primary 类（财报/估值）只能来自一手来源，**禁止用训练知识填当期数据**。

### 2. §6.8 数据准确度优先原则（用户 2026-06-19 明确指示·绝对优先）

> **核心三原则（按优先级排序）**：
> 1. **数据准确度 > 流程完成** —— 宁可 Phase 任务不完成、数据保持上一稳定状态，也**绝不能为了"让流程跑完"而手动改字段或注入违规数据**
> 2. **严格遵守项目纪律** —— 所有 CC 操作必须符合 §6.1-§6.7 + G4 治理铁律
> 3. **绝不为了流程跑完而违反纪律** —— CC 推荐的所有方案必须先通过 §6.2 严格审查

### 3. §6.9 双重检查（pre-flight-check + hallucination-screen）

> **触发时机**：任何涉及具体 stock 的数据操作前，必须先做上市状态预检 + 豆包返回幻觉筛查。
> **双重检查流程（顺序执行，不可跳步）**：
> 1. **上市状态预检**——运行 `.claude/plans/tools/pcb-pre-flight-check.js`（HBM 版同模式）
> 2. **豆包返回幻觉筛查**——运行 `.claude/plans/tools/pcb-hallucination-screen.js`（HBM 版同模式）
> 双重检查强制规则：任何 stock 在 trend 推断前**必须**先过 pre-flight-check.js + hallucination-screen.js；单一检查通过不算合规，必须两项都通过

### 4. §6.10 三重验证（stock code / 段位 / name）

> **触发时机**：任何涉及 ≥10 只 stock 的数据刷新 / 注入前，必须先做三重验证 + 数据冲突检查。
> **三重验证流程（顺序执行，不可跳步）**：
> 1. **stock code 校验**——动态提取 pcb.js 实际 stock list（segments + midstream + fourQuestions 三路径），验证所有返回的 stock code 在 pcb.js 中
> 2. **stock 段位校验**——对比返回 stock 的 segIdx 与 pcb.js 实际 segIdx
> 3. **stock name 校验**——对比返回 stock 的 name 与 pcb.js 实际 name
> 三重验证强制规则：单一检查通过不算合规，三项必须都通过；数据冲突检查必须列出所有重大漂移并标注 ⚠️

### 5. §6.11 11 条硬约束（豆包 / DeepSeek / Gemini prompt 设计）

> **强制规则（11 条硬约束）**：
> 1. **精确 stock 列表**——prompt 必须列出每只 stock 的 code + name + segment + rank + barrier + tier + 当前 trend + 当前 trendNote
> 2. **禁止引入新 stock**——明确告知模型"pcb.js 中只有以下 stock，禁止引入其他 stock"
> 3. **stock code 必须精确**——明确告知"stock code 是 6 位数字 + 板块标识"
> 4. **stock 段位必须精确匹配**——每只 stock 必须在 prompt 指定的段位
> 5. **查询不到不替换**——如查不到某只 stock 2024-Q4 至 2026-Q2 事实，在【6. 未查到】段列出，不要替换为其他 stock
> 6. **7 段式格式**——【1. 认证进展】/【2. 客户切换】/【3. 新进入者】/【4. 技术产能壁垒】/【5. 品类归属】/【6. 未查到】/【7. 信源清单】
> 7. **信源 tier + broker 双源**——每条事实标注 tier（primary/broker/media）+ broker 双源 + 时间口径 + 数字 + 时点
> 8. **段位品类标注**——明确告知每段的品类
> 9. **量产/验证/在研状态标注**——已量产/验证中/样品认证/在研/未启动 五档之一
> 10. **不得编造事实**——联网搜不到的事实必须显式列在【6. 未查到】段，不得填入主段伪装成事实
> 11. **A/B 类信号拆分**——A 类=壁垒维度本身变化；B 类=经营业绩

## 关键教训（HBM R1 实战）

- **hallucination-screen false positive**：Prompt 1（7 只 stock 合并跑）触发 isST 误判（STS8300 产品型号）+ 事件密度阈值未按 stock 数量缩放（总事件数 78 > 40 阈值）→ **改为人工审核模式 + 三重验证**后所有 31 只 stock 通过
- **段位错位**：002409 雅克科技在 prompt 2【3. 新进入者】段被提到"华飞电子 Low-α 球硅产线"，但实际是 segments[2] 卡口 stock → B2.5 注入时只入 segments[2] fourQ，**不入 segments[1] fourQ**
- **事实降级**：雅克"长鑫核心供应商"+ 华海诚科"华为哈勃参股"豆包未确认 → trendNote 中省略（§6.11 第 5 条"查询不到不替换"）
- **13 只 NOT FOUND 新进入者**：全部不入 trendNote（§6.11 第 2 条"禁止引入新 stock"）· 仅 prompt 1 段使用 2 只新进入者（688037 芯源微 / 688630 芯碁微装）

## 天然还原点（紧急回滚）

```bash
git reset --hard f040fe3  # 回到 HBM R1 批 1 commit
```