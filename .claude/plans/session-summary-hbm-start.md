# HBM 产业链启动摘要

> 生成时间：2026-06-23 · 为 HBM 链启动准备的事实清单与操作入口
> 范围：仅事实 + 入口文件位置 + 关键纪律，不含研究内容

---

## 1. 当前状态

### PCB（已收尾·稳定态）

- **HEAD**：`83bbe49`（已 push）
- **阶段**：R3-18
- **规模**：34 只 stock（segments[0]-[6]）
- **质量**：fourQ 覆盖 90.9% / 健康度 4.1/5 / 71 处 ⚠️ 已诚实标记
- **trend**：稳定，本批无重大变化
- **待办**（不阻塞 HBM 启动）：
  - 28 只 stock 的 `src` 真 URL 补全（当前为 akshare 链接，需替换为 cninfo / dfcfw 真实链接）
  - tier 字段规范化（primary / broker / media / estimate）
  - 状态：**暂缓**——待 HBM 链进入 R2+ 再回头批量修

### 仓库 HBM 现状

- `data/hbm.js` **已存在**（259 行，六维 + 卡口 + 估值框架已搭）
- 本次 HBM 启动 = **从已有空壳推进到 R1 数据填实**（非从零新增）
- 侧栏 / manifest / `renderChain` guard 链路已通

---

## 2. 关键文件位置

| 类别 | 路径 | 用途 |
|---|---|---|
| 治理规则 | [CLAUDE.md](CLAUDE.md) §6.9 / §6.10 / §6.11 | 双重检查 + 三重验证 + 11 条 prompt 硬约束 |
| 刷新 SOP | [.claude/plans/refresh-sop.md](.claude/plans/refresh-sop.md) §9 | R3-17 经验段（新增/刷新统一流程） |
| 研究模板 | [.claude/plans/chain-research-template.md](.claude/plans/chain-research-template.md) §17 | HBM R1 起步的 checklist + 豆包 prompt 框架 |
| 筛查脚本 | [.claude/plans/tools/pcb-hallucination-screen.js](.claude/plans/tools/pcb-hallucination-screen.js) | L3 digits 计数已修复（commit 2d17952），可直接复用 |
| 预检脚本 | [.claude/plans/tools/pcb-pre-flight-check.js](.claude/plans/tools/pcb-pre-flight-check.js) | stock 退市 / 停牌 / ST 扫描 |
| 失败教训 | [.claude/plans/lessons-learned-2026-06-21-chaohua-delisting.md](.claude/plans/lessons-learned-2026-06-21-chaohua-delisting.md) | 002288 超华科技退市事故归档 |
| 操作手册 | [.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md) | CHAINS schema + 渲染入口 |
| 待核清单样例 | [.claude/plans/commercial-aero-待核清单-2026-06-14.md](.claude/plans/commercial-aero-待核清单-2026-06-14.md) | 风险字段显式列出范本 |
| 上次会话摘要 | [.claude/plans/session-summary-2026-06-22.md](.claude/plans/session-summary-2026-06-22.md) | PCB R3-17 → R3-18 收尾参考 |

---

## 3. HBM 启动任务（按序）

### 第一步：仓库现状核查

```bash
ls d:/乌龟/产业链全景/data/ | grep -i hbm
git log --oneline -- data/hbm.js | head -10
```

**预期**：`hbm.js` 存在（已确认 259 行），最近 commit 时间查清（确认是否已 R1 起步）。

### 第二步：checklist 设计（按 chain-research-template §17.1）

- **段位划分**：参考 `data/hbm.js` 已有的 `segments` 结构（HBM 本体 / 封测 / 设备 / 材料 卡口）
- **stock 列表**：用 `chain-research-template §17.3` 的 11 条硬约束 prompt 问豆包取候选清单
- **三层清单**（必须输出到 `.claude/scratch/hbm-R1-checklist.md`）：
  - ✅ 已确认事实（含 src + tier）
  - ⚠️ 存疑待核（单源 / 概念票 / 数字未佐证）
  - ❌ 完全缺失（必须显式列出，不准伪装为待补）

### 第三步：豆包查询 → 三重验证 → 幻觉筛查 → trend 评估 → commit

1. **豆包查询**：用 §17.3 框架，每个 stock 跑 7 段式返回
2. **三重验证**（§6.10）：stock code / 段位 / name 全部对齐 pcb.js —— **HBM 改为对齐 `data/hbm.js`**
3. **幻觉筛查**：复制 `pcb-hallucination-screen.js` 改造成 `hbm-hallucination-screen.js`（替换 stock 列表来源）
4. **trend 评估**：A 类（壁垒维度变化）为主、B 类（业绩）为辅
5. **commit**：
   - 数据填实：`feat: HBM R1 segments[i] X只stock初始化 + trend评估`
   - 每批独立 commit，沿用 PCB R3-17 / R3-18 模板化存档

---

## 4. 角色分工（CLAUDE.md 约定·3 行）

- **CC（我）**：结构 / 代码 / prompt 设计 / 注入 + 标 tier / 三重验证脚本 / 不造事实
- **网页端 Claude（能联网）**：豆包查询 + ≥2 独立来源核实 + 真 URL 采集
- **用户**：所有"会变的事实"必须用户显式确认 + commit 前用户说"通过"才执行

---

## 5. 核心机制（持续生效·不可松）

1. **§6.8 数据准确度优先** —— 宁可 R1 任务不完成、数据保持空壳状态，**绝不为流程跑完而注入违规数据**
2. **§6.10 三重验证** —— stock code / 段位 / name + 数据冲突检查，每批 ≥10 只 stock **必须**先过
3. **§6.11 精确 stock 列表 11 条硬约束** —— prompt 必含精确列表 / 禁止引入新 stock / code 6 位 / 段位匹配 / 查不到不替换 / 7 段式 / tier+broker 双源 / 品类标注 / 量产状态 / 不编造 / A·B 类拆分
4. **§6.9 双重检查** —— pre-flight-check（退市 / 停牌 / ST）+ hallucination-screen（事件密度 / 数字可验证）顺序执行，缺一不算合规
5. **A/B 类信号拆分** —— trend 主依据必须是 A 类（认证 / 客户验证 / 技术领先 / 竞争位置 / 产能变化），B 类（营收 / 订单）仅辅助
6. **诚实降级** —— media 单源直接拒绝 → 标"⚪单源待核"；broker 单源 → 标"待核"；查不到 → 显式列【6. 未查到】，**不准替换为其他 stock**
7. **失败教训归档** —— 任何"丢字段 / 凑数 / 单源当事实 / 概念票混入 / 漏报缺陷"必须写到 `.claude/scratch/<phase>-lessons-learned-<date>.md`（≤30 行，含失败模式 / 影响 / 防重犯规则）
8. **不主动 commit** —— 等用户显式说"通过"

---

## 6. 关键反例（R3-16+ 批 1 · 2026-06-22）

豆包在缺 §6.11 约束下返回 **4 只 pcb.js 不存在的 stock**（600143 金发科技 / 600346 恒力石化 / 600160 巨化股份 / 688519 南亚新材错码）+ **2 只错位段位 stock**（603228 景旺电子、002916 深南电路）。

R3-16+ 批 2/3 加 11 条硬约束后 → 100% 一致。

**结论**：HBM R1 起步必须从批 1 就用满 11 条硬约束，**不存"先跑跑看"**。

---

## 7. PCB 待办（不阻塞·可后续回头）

- 28 只 stock `src` 真 URL 补全（akshare → cninfo / dfcfw 真实链接）
- tier 字段规范化（统一 primary / broker / media / estimate）
- 待 HBM R1 → R2 进入稳态后批量处理

---

**会话开始指令**（用户触发后）："开始 HBM R1" → CC 先 ls + git log data/hbm.js 确认现状 → 按 §3 三步推进。
