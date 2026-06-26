# 操作审批规则

## 无需顾问确认·直接 commit

page_audit 14/14 PASS 后直接 commit，不需要截图：

- 数据字段更新（barrier / ROE / macro / position / trendNote 等）
- 豆包数据写入 pcb.manual.js（已经顾问投研判断后）
- 文字内容修改（note / summary / logic 等）
- 遗留 bug 修复（已有明确方案）
- 交接文档和模板文件更新
- 脚本参数调整（非渲染逻辑）

## 必须截图·等顾问确认后才能 commit

- 任何 CSS 样式修改
- 新增渲染函数（renderXXX）
- 页面 section 顺序/位置调整
- 首屏显示内容变化
- 新增卡片或 UI 组件
- 折叠/展开逻辑变化

## 必须等顾问投研判断·CC 不自行决定

- 壁垒等级变更（barrier 字段）
- 六维评分变更（dims6）
- 信号 C 阈值变更
- 持仓决策相关字段（reduceSignal / stopLoss 等）
- macro 景气判断变更