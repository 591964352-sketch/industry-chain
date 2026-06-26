# PCB看板 · 卡片border颜色语义规范

> **每次新增卡片必须对照此表选择 border-left 颜色。** 跨人/跨会话不丢语义，commit 4.69 立。

## 6 档语义表

| 颜色变量 | 语义 | 适用场景 |
|---|---|---|
| `--color-risk` 红 | 风险/减仓 | 减仓信号触发、风险警示、亏损提示、risk 门控 |
| `--color-signal` 紫 | 信号/决策 | 信号C 触发/历史回放、距离最近 TOP3、决策信号汇总 |
| `--color-data` 蓝 | 数据/排名 | 数据展示、排名榜、供需缺口、估值数据 |
| `--color-bull` 绿 | 景气/正面 | 利好提示、正面景气、"无 risk" 安全提示 |
| `--color-warn` 黄 | 警示/注意 | Hero 身份卡、周期位置、买入警示、操作提醒 |
| `--color-muted` 灰 | 参考/历史 | 历史回放、参考信息、折叠内容、无触发提示 |

## 选色决策树

```
该卡片是【风险/减仓】相关吗？
  ├─ 是 → --color-risk 红
  └─ 否 → 该卡片是【信号/决策】吗？（信号触发、TOP3、决策汇总）
         ├─ 是 → --color-signal 紫
         └─ 否 → 该卡片是【利好/正面】吗？
                ├─ 是 → --color-bull 绿
                └─ 否 → 该卡片是【警示/注意】吗？
                       ├─ 是 → --color-warn 黄
                       └─ 否 → 该卡片是【数据展示/排名】吗？
                              ├─ 是 → --color-data 蓝
                              └─ 否 → 该卡片是【参考/历史】吗？
                                     ├─ 是 → --color-muted 灰
                                     └─ 否 → 提请顾问确认归属
```

## 用法（代码层）

```html
<!-- 标准用法：inline style 写 border-left:3px solid var(--color-XXX); -->
<div class="card" style="padding:12px 16px;margin-bottom:18px;border-left:3px solid var(--color-signal);">
  ...
</div>
```

- **不要**硬编码颜色（`#58a6ff` / `rgba(...,...)` 等）—— 必须走 CSS 变量，保证主题一致
- **不要**为单张卡另起颜色变量——6 档够用，超出语义先来本表讨论
- **Hero/周期位置** 是 warn 黄色 —— 是"中性观察"语义，不是"危险"

## 变更历史

| commit | 改动 |
|---|---|
| 4.69 | 初版 6 档语义表（红/紫/蓝/绿/黄/灰）· 6 处 border 修正（hero=warn→data·1458/1497=warn→muted·1532/1586/3317=data→signal·3188=risk→data）· hero L1370 保留 warn 不改 |

## 配套

- 实施位置：[index.html](index.html) 内 `<style>` 块的 `--color-*` 变量定义（L14）
- 验证脚本：[scripts/page_audit.py](scripts/page_audit.py) → 14/14 PASS
- 视觉参考：[screenshots/visual_audit/](screenshots/visual_audit/) 6 张
