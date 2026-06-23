# HBM R1 豆包 prompt v1 · fourQ q1-q4 真值重写（5 段独立 prompt）

> **生成时间**：2026-06-23
> **适用范围**：HBM R1 批 2（B2.5 注入前的真值查证 → 替换 `fourQ.segments[*].stocks[*]` 的 q1-q4 占位/旧值）
> **实施说明**：每段独立发给豆包，返回后 CC 做 hallucination-screen 验证（[.claude/plans/tools/hbm-hallucination-screen.js](tools/hbm-hallucination-screen.js)）+ 三重验证（stock code / 段位 / name）+ 数据冲突检查后注入

---

## 元信息

- **来源约束**：[chain-research-template.md §17.3](../plans/chain-research-template.md) 11 条硬约束 + [CLAUDE.md §6.11](../CLAUDE.md#611-精确-stock-列表-prompt-模板防止豆包引入新-stock硬约束) 11 条硬约束（**两者同源**）
- **段位品类**（HBM 5 段，按 segments[] 索引）：
  - segments[0] **混合键合及核心设备**
  - segments[1] **GMC颗粒状环氧塑封料**
  - segments[2] **先进封装材料**（*2026-06-23 由"前驱体材料"扩名同步*）
  - segments[3] **测试设备**
  - segments[4] **先进封装(2.5D/3D)**
- **指标口径**：
  - **主指标**：归母净利（单位亿元，两位小数，时间口径 **2025Q1 / Q2 / Q3 / Q4**）
  - **辅指标**：营业收入（同上口径）
- **A/B 类信号拆分**（与 §6.11 第 11 条对齐）：
  - **A 类 = 壁垒维度**（认证 / 客户验证 / 技术领先 / 竞争位置 / 产能变化）→ trend 判断**主依据**
  - **B 类 = 经营业绩**（营收 / 净利 / 订单 / 份额变化）→ **辅助印证**

---

## 11 条硬约束（每个 prompt 头部嵌入 · 豆包必读）

```
【硬约束 · 违反一条即整体重出】
1. 精确 stock 列表：以下列出每只 stock 的 code + name + segment 段位 + rank + barrier + tier + 当前 trend + 当前 trendNote；豆包不得自创/替换任何 stock
2. 禁止引入新 stock：本 prompt 范围之外的 stock 一律不查、不返回
3. stock code 精确：6 位数字 + 板块标识（如 688535 / 002409），豆包不得自编
4. stock 段位精确：每只 stock 必须在 prompt 指定的段位，跨段需说明并归位到本段
5. 查询不到不替换：如查不到某只 stock 2025 Q1-Q4 事实，在【6. 未查到】段显式列出，不要替换为其他 stock
6. 7 段式格式：【1. 认证进展】【2. 客户切换】【3. 新进入者】【4. 技术产能壁垒】【5. 品类归属】【6. 未查到】【7. 信源清单】——顺序不可调
7. 信源 tier + broker 双源：每条事实标注 tier（primary/broker/media）+ ≥2 独立来源（禁用单一媒体源做事实陈述）+ 时间口径 + 数字 + 时点
8. 段位品类标注：每个事实必须说明与本段位品类的相关性
9. 量产/验证/在研状态：每条进展标 5 档之一（已量产 / 验证中 / 样品认证 / 在研 / 未启动）
10. 不得编造事实：联网搜不到的事实必须显式列在【6. 未查到】段，不得填入主段伪装成事实，不得编造客户名 / 数字 / 日期
11. A/B 类信号拆分：A 类 = 壁垒维度（认证 / 客户 / 技术 / 竞争 / 产能）；B 类 = 业绩（营收 / 净利 / 订单）；trend 判断主依据必须是 A 类事实
```

---

## Prompt 1（segments[0] · 混合键合及核心设备）

### 段位品类定义
HBM 4/8/12/16/20Hi 堆叠所需的混合键合（Hybrid Bonding 铜对铜直连）、TSV 刻蚀/减薄、TCB 热压键合等核心设备环节。卡口判定主依据：① 全球仅 Besi / ASMPT 量产；② 拓荆 / 北方华创 / 中微 / 华海清科追赶；③ HBM4 混合键合是必经之路。

### 本段 stock 列表（动态提取 + midstream 归入）
**用户执行时**用以下 node 命令动态填入 `STOCK_LIST` 占位符：
```bash
node -e "global.window={};require('./data/hbm.js');const c=global.window.CHAINS.hbm;const seg=c.segments[0];const list=seg.stocks.map(s=>'  - '+s.code+' '+s.name+' | rank='+s.rank+' | barrier='+s.barrier+' | tier='+s.tier+' | trend='+s.trend+' | trendNote='+s.trendNote).join('\n');console.log(list);"
```
然后**手动追加**沃格光电（midstream 归入）：
```
- 603773 沃格光电 | rank=NEW | barrier=高 | tier=media | trend=up | trendNote=TGV玻璃通孔(CoWoS/CoPoS下一代),进台积电CoPoS验证、订单90亿+ ⚪单源待核
```

### prompt 正文
```
【任务】HBM 产业链 segments[0] 混合键合及核心设备段 · fourQ 真值重写

【11 条硬约束】
（嵌入上方"硬约束"块全文）

【本段 stock 列表】
STOCK_LIST
  - 603773 沃格光电 | rank=NEW | barrier=高 | tier=media | trend=up | trendNote=TGV玻璃通孔(CoWoS/CoPoS下一代),进台积电CoPoS验证、订单90亿+ ⚪单源待核

【主指标】归母净利（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）
【辅指标】营业收入（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）

【输出格式 · 7 段式】
【1. 认证进展】每只 stock 在 HBM / 混合键合 / TSV 设备领域的客户认证进展，标 5 档状态（已量产 / 验证中 / 样品认证 / 在研 / 未启动）+ 信源 tier + 时点
【2. 客户切换】客户从 Besi / ASMPT 切换到本段 stock 的具体动作（如海力士导入国产设备）；标信源 + 时点
【3. 新进入者】2025-2026 进入本段的国产 / 外资新公司（如新增封测设备厂）；标信源
【4. 技术产能壁垒】关键良率 / 产能 / 技术指标（如混合键合铜对铜直连良率、HBM 堆叠层数提升路径）
【5. 品类归属】每只 stock 与"混合键合及核心设备"段位的相关性等级（核心 / 边缘 / 不属本段）
【6. 未查到】查不到的指标 / 财务数字 / 认证进展显式列出（含归母净利缺失的具体季度）
【7. 信源清单】≥2 独立来源（primary 巨潮 + broker 券商 PDF），禁用 akshare-web 单源；每条事实标注 tier + 时间 + 数字 + 来源

【执行规则】
- 严格按 7 段式顺序输出
- 主指标（归母净利）作为 B 类信号在【1. 认证进展】或【4. 技术产能壁垒】段顺带提，但 trend 判断主依据必须是 A 类事实
- 沃格光电属 midstream 归入，本段首次查证，重点关注 TGV / 玻璃通孔 与"混合键合及核心设备"段位相关性
- 严禁编造数字 / 客户名 / 日期
- 严禁把 stock 移到非本段
```

---

## Prompt 2（segments[1] · GMC颗粒状环氧塑封料）

### 段位品类定义
HBM 3D 堆叠封装的核心耗材：颗粒状环氧塑封料（GMC），保护芯片 + 散热 + low-α 填料（low-α 球硅 / 球铝占比 70-90%）。全球仅日本住友 / 昭和电工 + 华海诚科三家通过认证。GMC 关键填料由联瑞新材 / 壹石通 / 德邦 / 圣泉 / 飞凯供给。

### 本段 stock 列表（动态提取）
```bash
node -e "global.window={};require('./data/hbm.js');const c=global.window.CHAINS.hbm;const seg=c.segments[1];const list=seg.stocks.map(s=>'  - '+s.code+' '+s.name+' | rank='+s.rank+' | barrier='+s.barrier+' | tier='+s.tier+' | trend='+s.trend+' | trendNote='+s.trendNote).join('\n');console.log(list);"
```
> 预期输出 6 只 stock：华海诚科 688535（rank1/tier=media/trend=up）+ 联瑞新材 688300 + 德邦科技 688035 + 壹石通 688733 + 飞凯材料 300398 + 圣泉集团 605589

### prompt 正文
```
【任务】HBM 产业链 segments[1] GMC颗粒状环氧塑封料段 · fourQ 真值重写

【11 条硬约束】
（嵌入上方"硬约束"块全文）

【本段 stock 列表】
STOCK_LIST

【主指标】归母净利（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）
【辅指标】营业收入（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）

【输出格式 · 7 段式】
【1. 认证进展】每只 stock 在 GMC / low-α 球硅 / 球铝 / 底填 / 临时键合胶的客户认证进展，标 5 档状态
【2. 客户切换】HBM 厂（海力士 / 三星 / 美光 / 长鑫 / 武汉新芯）从日本住友 / 昭和切换到本段 stock 的具体动作
【3. 新进入者】2025-2026 进入 GMC / 球硅 / 球铝的国产新公司（如飞凯子公司长兴 EMC 是否量产）
【4. 技术产能壁垒】GMC 良率 / 球硅球形度（≥98%）/ low-α 纯度 / 产能数字
【5. 品类归属】每只 stock 与"GMC 颗粒状环氧塑封料"段位的相关性等级（核心 / 边缘 / 不属本段）
【6. 未查到】查不到的指标显式列出
【7. 信源清单】≥2 独立来源

【执行规则】
- 7 段式顺序输出
- 主指标（归母净利）作为 B 类信号
- 严禁编造
```

---

## Prompt 3（segments[2] · 先进封装材料）

### 段位品类定义
**先进封装所需的特种材料**：前驱体材料（HBM 堆叠介质层薄膜沉积）、电子特气、CMP 抛光液 / 抛光垫、ARF 光刻胶。**前驱体** = 雅克子公司韩国先科（UP Chemical）为 SK 海力士核心供应商；**CMP / 抛光垫** = 安集 / 鼎龙国产替代；**电子特气** = 华特气体 / 南大光电。

> 注：本段 2026-06-23 由 "前驱体材料" 扩名为 "先进封装材料"（含前驱体 + CMP + 特气 + 光刻胶），4 处全局同步（treeMap / segments / fourQ / chokePoints）

### 本段 stock 列表（动态提取）
```bash
node -e "global.window={};require('./data/hbm.js');const c=global.window.CHAINS.hbm;const seg=c.segments[2];const list=seg.stocks.map(s=>'  - '+s.code+' '+s.name+' | rank='+s.rank+' | barrier='+s.barrier+' | tier='+s.tier+' | trend='+s.trend+' | trendNote='+s.trendNote).join('\n');console.log(list);"
```
> 预期输出 5 只 stock：雅克科技 002409（rank1/tier=media/trend=up）+ 南大光电 300346 + 安集科技 688019 + 鼎龙股份 300054 + 华特气体 688268

### prompt 正文
```
【任务】HBM 产业链 segments[2] 先进封装材料段 · fourQ 真值重写

【11 条硬约束】
（嵌入上方"硬约束"块全文）

【段位品类定义 · 关键】
本段涵盖：① 前驱体材料（HBM 堆叠介质层薄膜沉积）+ ② 电子特气（光刻/沉积/蚀刻环节）+ ③ CMP 抛光液/垫（HBM 晶圆减薄/平坦化）+ ④ ARF 光刻胶（南大光电国产唯一）。前驱体是 HBM 介质层核心，特气配套存储晶圆制造，CMP/抛光垫是 HBM 多次减薄刚需耗材。

【本段 stock 列表】
STOCK_LIST

【主指标】归母净利（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）
【辅指标】营业收入（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）

【输出格式 · 7 段式】
【1. 认证进展】每只 stock 在前驱体 / 特气 / CMP 抛光液 / 抛光垫 / ARF 光刻胶的客户认证进展，标 5 档状态
【2. 客户切换】HBM / DRAM 厂从默克 / APD / 富士美 / Versum 切换到本段 stock 的具体动作
【3. 新进入者】2025-2026 进入前驱体 / 特气 / CMP / 抛光垫的国产新公司
【4. 技术产能壁垒】前驱体代际（HKMG / HBM 介质层专用）/ 特气纯度（6N+）/ CMP 抛光速率 / 抛光垫寿命
【5. 品类归属】每只 stock 在前驱体 / 特气 / CMP / 抛光垫 4 子品类中的归属等级
【6. 未查到】查不到的指标显式列出
【7. 信源清单】≥2 独立来源

【执行规则】
- 7 段式顺序输出
- 主指标（归母净利）作为 B 类信号
- 安集 / 鼎龙属 CMP 类（不属前驱体），但属本段"先进封装材料"范畴
- 严禁编造
```

---

## Prompt 4（segments[3] · 测试设备）

### 段位品类定义
HBM 堆叠层数高、测试复杂度与价值量显著高于普通 DRAM。模拟 / 数字测试机、晶圆边缘检测、膜厚 / 缺陷检测设备。全球泰瑞达 / 爱德万双寡头，国产华峰 / 长川主力。

### 本段 stock 列表（动态提取）
```bash
node -e "global.window={};require('./data/hbm.js');const c=global.window.CHAINS.hbm;const seg=c.segments[3];const list=seg.stocks.map(s=>'  - '+s.code+' '+s.name+' | rank='+s.rank+' | barrier='+s.barrier+' | tier='+s.tier+' | trend='+s.trend+' | trendNote='+s.trendNote).join('\n');console.log(list);"
```
> 预期输出 5 只 stock：华峰测控 688200 + 长川科技 300604 + 精测电子 300567 + 亚威股份 002559 + 赛腾股份 603283

### prompt 正文
```
【任务】HBM 产业链 segments[3] 测试设备段 · fourQ 真值重写

【11 条硬约束】
（嵌入上方"硬约束"块全文）

【段位品类定义】
本段涵盖：模拟 / 数字测试机、晶圆边缘检测、膜厚 / 缺陷检测、分选机、SoC 测试机。HBM 测试复杂度高于普通 DRAM 5-10x，带动单台测试机价值量翻倍。

【本段 stock 列表】
STOCK_LIST

【主指标】归母净利（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）
【辅指标】营业收入（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）

【输出格式 · 7 段式】
【1. 认证进展】每只 stock 在海力士 / 三星 / 美光 / 长鑫的测试机导入进展，标 5 档状态
【2. 客户切换】封测厂（通富 / 长电 / 华天 / 甬矽）从泰瑞达 / 爱德万切换到本段 stock 的具体动作
【3. 新进入者】2025-2026 进入 HBM 测试设备的新公司（如华峰 STS8300 是否已批量供货海力士）
【4. 技术产能壁垒】测试机台数 / 测试覆盖率 / 并测数（site count）/ HBM 堆叠测试良率
【5. 品类归属】每只 stock 与"测试设备"段位的相关性等级（核心 / 边缘 / 不属本段）
【6. 未查到】查不到的指标显式列出
【7. 信源清单】≥2 独立来源

【执行规则】
- 7 段式顺序输出
- 主指标（归母净利）作为 B 类信号
- 赛腾股份 603283 在 segments[0] 已存在（双视角副本，§9.5 保护），本段同样有 → trendNote 与 segments[0] 独立维护
- 亚威股份参股苏州芯测，间接受益 → 标边缘
- 严禁编造
```

---

## Prompt 5（segments[4] · 先进封装(2.5D/3D)）

### 段位品类定义
HBM 需经 2.5D/3D 先进封装（CoWoS 类）与 GPU 集成。HBM 后道封测、模组代理、利基存储设计。**客户可切换 → 非物理卡口**，但国产 HBM 量产将强拉动后道 β。

### 本段 stock 列表（动态提取 + midstream 3 只独有归入）
```bash
node -e "global.window={};require('./data/hbm.js');const c=global.window.CHAINS.hbm;const seg=c.segments[4];const list=seg.stocks.map(s=>'  - '+s.code+' '+s.name+' | rank='+s.rank+' | barrier='+s.barrier+' | tier='+s.tier+' | trend='+s.trend+' | trendNote='+s.trendNote).join('\n');console.log(list);"
```
> 预期输出 6 只（segments[4] 原有 6 只）：通富微电 002156（rank1/tier=estimate/trend=up）+ 长电科技 600584 + 太极实业 600667 + 华天科技 002185 + 甬矽电子 688362 + 深科技 000021
>
> **手动追加 midstream 3 只独有归入**：
```
- 300475 香农芯创 | rank=NEW | barrier=中 | tier=primary | trend=flat | trendNote=Q1营收237.65亿+200.6%/净利近80倍；SK海力士国内代理；但分销低毛利、壁垒低、周期
- 603986 兆易创新 | rank=NEW | barrier=中 | tier=primary | trend=flat | trendNote=Q1营收41.88亿+119%/净利14.61亿+523%；存储设计龙头；周期反转强但cyclical、估值已高
- 688525 佰维存储 | rank=NEW | barrier=中 | tier=primary | trend=flat | trendNote=Q1营收68.14亿+341%/净利28.99亿扭亏/毛利53.3%；存储模组=周期品、模组壁垒中、估值已高
```

### prompt 正文
```
【任务】HBM 产业链 segments[4] 先进封装(2.5D/3D)段 · fourQ 真值重写

【11 条硬约束】
（嵌入上方"硬约束"块全文）

【段位品类定义】
HBM 后道封测（CoWoS-like / 2.5D / 3D）+ 模组代理（海力士国内代理）+ 利基存储设计。**客户可切换 → 非物理卡口**（卡口判定关键）。国产 HBM 量产（长鑫 / 武汉新芯）将强拉动后道 β。

【本段 stock 列表】
STOCK_LIST
  - 300475 香农芯创 | rank=NEW | barrier=中 | tier=primary | trend=flat | trendNote=Q1营收237.65亿+200.6%/净利近80倍；SK海力士国内代理
  - 603986 兆易创新 | rank=NEW | barrier=中 | tier=primary | trend=flat | trendNote=Q1营收41.88亿+119%/净利14.61亿+523%；存储设计龙头
  - 688525 佰维存储 | rank=NEW | barrier=中 | tier=primary | trend=flat | trendNote=Q1营收68.14亿+341%/净利28.99亿扭亏/毛利53.3%；存储模组

【主指标】归母净利（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）
【辅指标】营业收入（亿元，两位小数，2025Q1 / Q2 / Q3 / Q4）

【输出格式 · 7 段式】
【1. 认证进展】每只 stock 在 HBM 后道封测 / 模组代理 / 利基存储的客户进展（封测厂以 AMD / 长鑫 / 武汉新芯 为主；模组代理以 SK 海力士为主）
【2. 客户切换】封测厂客户切换（如 AMD 长期伙伴通富 / 长电）；模组代理客户切换（海力士代理权）
【3. 新进入者】2025-2026 进入 HBM 后道封测 / 模组代理的国产新公司（如盛合晶微华为体系硅中介层是否上市）
【4. 技术产能壁垒】封测产能 / 良率 / 模组代理规模 / 利基存储设计代际（DDR5 / HBM 配套）
【5. 品类归属】每只 stock 与"先进封装(2.5D/3D)"段位的相关性等级
【6. 未查到】查不到的指标显式列出
【7. 信源清单】≥2 独立来源

【执行规则】
- 7 段式顺序输出
- 主指标（归母净利）作为 B 类信号
- 香农芯创 / 兆易 / 佰维属 midstream 归入，本段首次查证 → trendNote 由豆包新写
- 通富微电"长鑫后道"原 trendNote="estimate 调研纪要待核" → 本段需查 broker 双源印证
- 严禁编造
```

---

## 使用说明（用户执行时）

1. **每段 prompt 头部嵌入"11 条硬约束"块**（已写在文件元信息下，可直接复制）
2. **动态填入 stock 列表**：
   - 复制各 prompt 中"本段 stock 列表"上方对应的 node 命令
   - 在网页端 Claude（能联网）执行，输出粘到 prompt 占位符 `STOCK_LIST`
   - **手动追加 midstream 归入的 stock**（Prompt 1 沃格 / Prompt 5 香农芯创 + 兆易 + 佰维）
3. **复制完整 prompt**（含硬约束 + 段位定义 + 7 段式 + 执行规则）
4. **粘贴到豆包**，等 7 段式返回
5. **粘贴回 CC**，触发 B2.2 hallucination-screen 验证 + B2.3 三重验证

---

## 实施前决策提醒（2026-06-23 已处理）

### #1 segments[2] 命名分歧 · **已处理** ✅
- **用户决策**：命名扩为"先进封装材料"（含前驱体 + CMP + 特气 + 光刻胶）
- **实施**：4 处全局同步（treeMap.materials / segments[2] / fourQ.segments[1] / chokePoints[1].segment）已 commit 进 f040fe3 之后的 working tree（待本次 commit 落地）
- **依据**：sourceSegment 必须 == segments[].name（§B1.5 硬约束）；chokePoints[].segment 必须 == segments[].name（渲染层卡口归属）

### #2 midstream 归位 vs 现有段位 stock 重叠 · **已决策**
- 香农芯创 / 兆易 / 佰维 / 沃格 4 只 midstream 独有 stock 归入 fourQ 后，与原 segments[4] / segments[0] **去重逻辑**：
  - hbm.js segments[4] 已含 6 只 stock，通富/长电已 in fourQ；香农/兆易/佰维是新加
  - hbm.js segments[0] 已含 6 只 stock（含赛腾 603283），拓荆/北方华创已 in fourQ；沃格是新加（**603283 已在 segments[0] 内**）
- **双视角副本保护**：B2.5 注入时在 fourQ stock 上加 `crossChainNote` 字段（如 segments[0]/segments[3] 共有的 603283 赛腾 → `crossChainNote: 'segments[0]已存在，本段为测试设备视角独立维护'`）

### #3 财务指标范围 · **用户已确认**
- 主指标 = 归母净利 / 辅指标 = 营收 / 2025Q1-Q4 / 亿元 / 两位小数
- 注：豆包返回的归母净利若为季度披露数字（如某公司只披露 H1/H2 不披露 Q1/Q2/Q3/Q4 单季），需在【6. 未查到】段显式说明

---

## 后续流程（B2.2 → B2.6）

- **B2.2**：CC 运行 `node .claude/plans/tools/hbm-hallucination-screen.js` × 5 段 × N stock（risk score < 5 = ✅）
- **B2.3**：三重验证脚本（stock code / 段位 / name 100% 匹配）
- **B2.4**：数据冲突检查 + 跨链副本独立处理（联瑞 688300 PCB/HBM 双视角 + 603283 赛腾 segments[0]/segments[3] 双视角）
- **B2.5**：CC 注入 q1-q4 真值到 fourQ（守门 + G7 打标）
- **B2.6**：meta.status='active'→'partial' + CHANGELOG + git commit + push

---

## 天然还原点

- **本批次 commit 前**：`git reset --hard f040fe3`（回滚 HBM R1 批 1 之后的所有改动）
- **本次 commit 后**：`git reset --hard <本次 commit hash>`（回滚本批次）