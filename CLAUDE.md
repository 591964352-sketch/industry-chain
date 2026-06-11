# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库工作时提供指引。

## 仓库是什么

一个单文件静态 HTML 投研网站，承载 **Serenity 物理卡口（Choke Point）** 方法论 —— 对 A 股产业链（PCB、半导体、HBM、人形机器人、CPO 等）做拆解，挖出 ★★★/★★☆ 的"卡口"标的。**无构建系统、无包管理器、无依赖。** 浏览器直接打开 HTML 即可；所有 CSS 和 JS 都内联在文件里。

仓库里**没有测试套件、没有 lint、没有 CI**。"构建" = 保存文件；"运行" = 浏览器打开。

## 三个 HTML 文件 —— 各自的角色

| 文件 | 行数 | 角色 |
|------|------:|------|
| [index.html](index.html) | 2721 | 主站，GitHub Pages 默认入口 |
| [产业链全景.html](产业链全景.html) | 2721 | **与 `index.html` 字节级镜像一致**，保留中文 URL |
| [PCB产业链全景.html](PCB产业链全景.html) | 951 | 早期 PCB-only 独立页面，主站不再链接它，没明确要求别动 |

**关键不变式：** `index.html` 和 `产业链全景.html` 必须保持字节级完全一致。最近的 commit 历史里能看到它俩跑偏过（参见 `f1ff548 同步 index.html`）—— 任何编辑必须**同一个 commit 内**同步到两个文件。提交前用 `diff -q index.html 产业链全景.html` 验证。

## `index.html` 的架构

单页应用，三层结构叠在同一个文件里：

1. **`<style>`**（约 7–235 行）—— 全局 CSS，深色主题，固定 230px 侧栏 + flex 主区。新增赛道时 CSS 几乎不动。
2. **`<body>`**（约 240–283 行）—— 静态侧栏导航、Header、空的 `#chain-content` 容器、右侧浮动变更面板。
3. **`<script>`**（284–2717 行）—— 数据 + 渲染：
   - `const CHAINS = {}`（288 行）—— 赛道注册表。每个赛道在自己的分隔区块内填充 `CHAINS.<id> = {...}`。
   - 赛道数据块用 `// ==================== <NAME> ====================` 注释分隔。新增赛道时按这个标记找插入位置。
   - `renderChain(chainId)`（2303 行）—— 渲染引擎，读 `CHAINS[chainId]` 拼出各 section 的 HTML。
   - `switchChain(chainId)`（2291 行）—— 侧栏点击处理 + URL hash 同步。
   - `CHANGELOG` 数组（2632 行）—— 驱动右侧"数据更新"浮动面板。**只展示最近 7 天内的条目**（在 `renderChangelog` 里过滤）。
   - `init()`（2707 行）—— 读 `window.location.hash` 决定首屏展示哪个赛道，缺省 `pcb`。

### 新增/编辑赛道的数据流

新增赛道 `xxx` 必须按顺序改**三处**：

1. 在合适的 `// ==================== ... ====================` 分隔处追加数据块：`CHAINS.xxx = { ... }`（完整 schema 见 [.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md#数据模板)）。
2. 在 `<div class="sidebar-nav" id="nav-list">`（约 244 行）里添加 `<span class="nav-item" data-chain="xxx" onclick="switchChain('xxx')">…</span>`。**侧栏里的顺序就是用户看到的顺序。**
3. 如果要让用户看到这次更新，往 `CHANGELOG` 前面插一条今日日期的记录 —— 之后 7 天它会出现在浮动面板里。

漏掉第 2 步 → 赛道除了 URL hash 之外不可达；漏掉第 3 步 → 用户感知不到变化。

### `ai-full-chain` 是特殊的"元赛道"

`CHAINS['ai-full-chain']` **不是**普通赛道，而是横跨所有 AI 相关赛道的"整合视图"。`renderChain` 针对它独有的两个可选字段做了分支：

- `socraticInquiry` → 渲染 Section ⓪「苏格拉底六问」（2309–2325 行的分支）。**只要它存在，后续所有 section 序号整体向后挪一位**（`hasSocratic` 标志，2328 行）。
- `occamRazor` → 渲染 Section ④「奥卡姆剃刀」（2452 行起）。

如果照搬这个赛道的结构去做新赛道，会继承"section 序号偏移"的副作用。**只在真的需要这两个 section 时才填这两个字段。**

### 赛道颜色和中文名硬编码在 `renderChangelog` 里

`renderChangelog`（2669 行）用一个连珠炮三元表达式（2696–2697 行）把赛道 id 映射到中文显示名和高亮色。新增赛道时**两个三元表达式都要扩**，否则该赛道的变更记录会用 fallback 灰色 + 原始英文 id 渲染。

## 常用命令

```bash
# 验证两个主 HTML 仍然同步（应无输出）
diff -q index.html 产业链全景.html

# 本地预览 —— 任意静态服务器都行，例如：
python -m http.server 8000   # 然后打开 http://localhost:8000/index.html
```

**没有依赖要装、没有构建要跑、没有测试要执行。**

## Serenity Skill —— 主要的操作入口

[.claude/skills/serenity/SKILL.md](.claude/skills/serenity/SKILL.md) 是本仓库的操作手册，已经作为可调用 skill (`serenity`) 注册。它涵盖：

- **四大物理追问**（供给寡头 / 产能周期 / 替代缺位 / 下游刚需）—— 每个标的的卡口评级标准。
- `CHAINS.<id>` 的完整 schema（overview / treeMap / segments / fourQuestions / chokePoints / supplyGap / methodologyNotes）。
- 周度自动更新协议（cron 每周一 09:07；变化 >15% 加 `<mark class="updated">` + `<sup class="change-badge">` 徽章；基本面重大变化加 `<tr class="major-change">`；高亮保留一周后滚出）。

用户要加赛道、刷新数据、研究产业链时，**调用 `serenity` skill 而不是临场发挥** —— skill 给出的数据 schema 必须与 `renderChain` 期望的字段对得上。

## 约定

- 所有面向用户的文案用简体中文，技术标识符（赛道 id、CSS class、JS 函数名）保持英文小写连字符。
- 每个 segment 里的标的严格按 `barrier` 降序排列（极高 → 高 → 中）。
- 页面底部"不构成投资建议"免责声明必须保留，不要删。
- Header 上的"数据截止：YYYY-MM-DD"（约 265 行）由周度 cron 维护 —— 任何数据变更都要顺手刷新。
- 仓库的 commit message 都用中文，描述**内容**层面的变化（改了哪些赛道、哪些字段），不是机械的"修改了文件"。
