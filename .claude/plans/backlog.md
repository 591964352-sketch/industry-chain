# Backlog · PCB 阶段一后续优化候选（暂不做）

> **使用方式**：本文件记录"讨论时拍板'先不做'但有价值的优化点"，**纯文本沉淀**，不进入当前阶段。**触发条件**：用户说"做 backlog 第 N 条"才动；不主动开启。

---

## 选项 4 · 估值维拆两维

**背景**（2026-06-14 PCB 阶段一 1.4 调优 C 决策时）：

`prosperity.dims[4]` valuation 一维 (1-5 分) 难以同时承载：
- **估值真值**（PE-TTM 真实分位，硬数据）
- **估值口径**（TTM 失真 / forward / 上市<5y / 早期放量低基数等口径修正）

——导致 3 卡口 PE 真实状态不同（东材 forward 远低于 TTM / 菲利华 TTM 可作硬依据 / 铜冠 TTM 失真），但同被一维 `valuation: 1` 兜底→综合 60+⚠门控。

**问题**：
- 7 维综合分(score 1-5)被一维 gate → "卡口业务强+估值高"被一棒打翻
- verdict 模板只能写"估值偏贵 / 不宜追"等单边叙述
- 同一 score=1 后面藏着 3 种完全不同估值真值/口径

**候选方案**（任挑一，待用户拍板）：

### 4A · 估值维加 sub-dim（轻）

`prosperity.dims[4]` 改为：
```js
{
  key:'valuation', name:'估值性价比', score:1, trend:'down',
  pePercentile: { 东材:99.8, 菲利华:99.9, 铜冠:null },  // 透出 3 卡口真值
  caliberIssues: ['东材 early-stage forward 显著低于 TTM', '铜冠 TTM 失真'],  // 口径修正提示
  reason:'...',
  ...
}
```

渲染：dims 卡片下方加折叠 "📊 3 卡口 PE 真实分位" + 口径备注。

### 4B · 估值维拆 2 维（中）

`prosperity.dims[4]` 拆为 `dims[4a] 估值真值` + `dims[4b] 估值口径修正`：
- 4a: 1-5 分（PE 分位，越低分越高 = 性价比越好）
- 4b: 1-5 分（口径可信度，TTM 可作硬依据 = 5 / TTM 失真 = 1 / forward 远低于 TTM = 4）
- 6 维 → 7 维；weights 重排（durability 0.20 / visibility 0.20 / valuation-real 0.15 / caliber 0.10 / supply 0.15 / barrier 0.12 / policy 0.08）
- 安全垫门控：`valuation-real ≤ 1 OR barrier ≤ 1` → `score = min(score, 60)` + `risk=true`

### 4C · 估值维 + 风险标签（重）

保留 6 维，但加独立 `prosperity.caliberFlags: string[]` 数组，渲染时在 dim 4 旁加 ⚠️ 浮动提示（"含 1 只 TTM 失真 / 1 只 early-stage forward 偏低"）；不改 schema、不动 weights、纯加修饰层。

---

**3 选 1 推荐**：
- 短期（≤ 5 行代码）= 4C
- 中期（≤ 30 行代码）= 4A
- 长期（> 50 行代码 + 重排 weights）= 4B

**当前不做**（2026-06-14 用户拍板）："选项 4 记入 backlog 以后做"

**触发**：
- 阶段一 1.4 全部主题 (A/B/C) 验收后
- 或下一条赛道（HBM 等）遇到相同 TTM 失真困境时
- 或用户主动说"做 backlog 选项 4"
