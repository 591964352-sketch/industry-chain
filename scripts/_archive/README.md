# scripts/_archive/ - 方法论文档

本目录存放 commit 6.99 / 7.00 工序中产生的**一次性脚本**, 用于事故复盘和方法论参考. **不可直接用于生产**.

---

## 目录脚本清单

### `_p1_unlock_lanqi.js`
**用途**: 把澜起科技(688008)的 `phaseBTestTrial=true` 改为 `false`, 解锁 R6 候选门槛.
**适用场景**: 任何"试点标记解锁"操作 (step=1 的 unlock 工序).
**关键纪律**: 必须用唯一 anchor string count=1 校验, 避免字符串匹配多重命中 (§11.19).
**commit**: 6.99.

### `_p2_gen_chokes.js`
**用途**: 用 **JS 对象构造 + JSON.stringify 自动转义**, 批量安全生成 chokePoint 数组.
**解决的核心问题**: 早期手写字符串拼接(用户输入 ASCII 双引号 `"`)导致 JavaScript 语法断裂. 改用 `const obj = { plainLanguageNote: \`...\`, tags: [...], ...}` 形式 + `JSON.stringify(obj, null, 2)`, 自动转义所有引号/换行/HTML 实体.
**适用场景**: 任何需要批量插入 5+ 段长文本到 JS 对象数组的场景.
**使用模板**:
```js
function newChokeObj() {
  return { rank: 2, name: '...', code: '...', ..., 
           plainLanguageNote: `<long text with quotes/apostrophes>` };
}
JSON.stringify([oldChoke, ...[1,2,3].map(newChokeObj)], null, 2);
```
**commit**: 6.99.

### `_p2_apply_chokes.js`
**用途**: 自动检测 `chokePoints` 数组边界锚点, 把新生成的 5 只 chokePoint 字符串插入到 storage-interface.js.
**关键技术**: 用唯一 anchor 字符串(such as `    }\n  ],\n  "supplyGap"`)做整体替换, 保留 IIFE 结构和代码注释. 失败模式 = anchor count ≠ 1 立即退出而非强行替换.
**适用场景**: 任何需要把构造好的 JSON 数组片段插入到 IIFE 包裹的 `<chainId>.js` 文件末尾(在 chokePoints 数组里).
**commit**: 6.99.

### `verify_no_truncation_6_98d.py`
**用途**: Playwright 验证"快速卡口速览"功能完整可读性, 检查 `<details>` 折叠面板外 + `<details>` 折叠面板内两类 plainLanguageNote 容器是否有截断(scrollH > clientH 即"内容溢出但被外框截断").
**解决的核心问题**: 用户反馈"白话解读文字只看到一两句就断掉", 排查根因 = `shortNote` 字段(slice(0, dotIdx))只截取了第一句.
**修复方案**: 改为 `fullNote = full plainLanguageNote`, `white-space:pre-wrap` 容器自然撑高.
**适用场景**: 任何"内容应完整可读, 但用户反馈截断"的 bug 排查.
**commit**: 7.00 / 6.99 数据层准备 (验证 6.98d 数据层补齐).

### `verify_si_render_v2.py`
**用途**: Playwright 验证 storage-interface 链 5 只 choke-card 全部渲染成功 + 4 段 new plainLanguageNote 完整存在 (textContent 字符数比对源数据) + chainStory Step 7/8 「前瞻卡位」标注 + 龙迅股份已从 seg[4] 移除 + 速度板块对非 PCB/SE 链不渲染.
**关键技术**: 多重 selector + textContent.trim() 字数校验 + 错误信息修正(false-positive 排查).
**适用场景**: 类似"批量插入段验证 + 字数比对 + chainStory 文本验证"的综合验收脚本模板.
**commit**: 6.99.

### `verify_speed_dial_6_98.js`
**用途**: Node.js 版本(纯 JS, 无 Python 依赖), 用 vm 沙盒加载 index.html 主 inline script + 验证 `renderChokeSpeedDial` 函数被正确定义/可调用.
**适用场景**: 用户机无 Python + Playwright 环境时的快速语法/函数级 smoke test.
**commit**: 7.00 / 6.98.

### `verify_speed_dial_6_98.py`
**用途**: Playwright Python 版本, 模拟"用户从顶部打开 PCB/SE 页面不滚动", 截图 + 测量"速度板块"位置 + chainStory 渲染 + 验证 4 个 SPEED_DIAL_PICKS 股票名出现在屏幕上.
**适用场景**: 7.00 速度板块功能上线的端到端验收.
**commit**: 7.00.

---

## 通用方法论

本目录所有脚本共同体现的方法论原则:

1. **§11.19 精确定位写入**: 严禁使用全文字符串匹配定位插入点; 必须先 count=1 校验锚点, 或用 stock code/name 唯一键值定位.
2. **JSON.stringify 自动转义**: 任何含 ASCII `"` 或换行符的长文本, 必须用对象构造 + `JSON.stringify(obj, null, 2)`, 严禁 handwrite 字符串拼接.
3. **Playwright 字符数比对**: 验证完整可读性时, 必须对比 DOM textContent 字符数 vs 源数据, 而非仅检查 DOM 存在/坐标位置.
4. **scrollH vs clientH**: 验证容器是否有截断时, 必须用 `el.scrollHeight > el.clientHeight` 信号, 不能仅靠肉眼截图.
5. **vm 沙盒加载**: Node 验证数据层(JS 对象字面量)时, 必须 `vm.createContext({ window: {} })` + `new vm.Script(code).runInContext(ctx)`, 不能 require (因为 IIFE 用 `window` 而非 `module.exports`).

---

## 使用建议

- 这些脚本对应 commit 6.99 + 7.00 的工序, **新批次修复时优先复用这些模板**, 而不是重新发明轮子.
- 复跑时请确认 `index.html` / `data/<chainId>.js` / `data/<chainId>.manual.js` 内容与 commit 6.99 / 7.00 一致(用 `git checkout 3fecab1 -- data storage-interface.js index.html scripts/check_rating_consistency.js` 还原).
- 清理临时截图(`data/fulltext_*.png` / `data/speeddial_*.png` 等)即可, 不需要重跑这些验证脚本.
