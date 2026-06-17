// data/optical-chip.js  —— 升级十 场景 B 第 1 步产物：光芯片赛道骨架(2026-06-16)
// 关联赛道:optical(光模块整链) / 上下游关系:光芯片 ← optical(光模块整链) ← PCB(AI 服务器配套)
// 本文件 = 场景 B 步骤 1 骨架(结构+个股名单),"会变的数据"全留待核,不联网、不 commit
//
// === 骨架设计原则 ===
// 1. segments 按"光子学价值链"自上游至下游切 6 段(芯片代工/外延材料 → 激光器/探测器芯片 → 硅光 PIC
//    → 调制/接收/合分波 → 测试/封装设备 → 模块应用),与 optical(光模块整链)的 6 段互补
// 2. 候选卡口 3 个:① 大功率 CW/EML 激光器芯片(物理卡口) ② 高速探测器(PD/APD) ③ 硅光 PIC 设计
// 3. 六维/个股六维全部留空/待核,barrier 维按个股预映射
// 4. 避免陷阱:不填 socraticInquiry/occamRazor、不预填 myTrades、不破坏分隔行、不加自定义 CSS
//
// === 字段口径区分(写入 highlightBox) ===
// "全球市占率"=全球出货份额;"国产化率"=中国市场本土厂商供应份额,≠ 同一概念(常见混淆陷阱)

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== OPTICAL-CHIP ====================
CHAINS['optical-chip'] = {
  id: 'optical-chip', name: '光芯片', icon: '🔬',
  // ★ 赛道级 meta(DeepSeek 第 2 轮解封 2026-06-16)
  //   status 'active':valuation 维门控解封(光库 5 年 97.68% / 赛微 5 年 42.23% / 仕佳 5 年 65.45% 三只核心标的 5 年分位命中)
  meta: { sector:'上游', tier:'核心', status:'active', updatedAt:'2026-06-16', ltFit:'🆪 适合长线研究/跟踪——AI 算力超级上行驱动,景气持续性+壁垒安全垫双高;估值维解封(光库 PE 5 年 97.68% 极高分位是核心扣分项,赛微 5 年 42.23% 中位缓解)' },

  // ★ 升级九 STEP 2:景气六维 —— 骨架注入(2026-06-16 联网核实后)
  //   5 维 estimate 🆪 主观打分,1 维(估值)门控触发留 null
  //   score 1-5 范围(参考 pcb 规范):5=极度顺 / 4=顺 / 3=中性 / 2=逆 / 1=极度逆
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:4, trend:'up',
        reason:'🆪 200G EML 全球缺口 25-30%,Lumentum FY26Q2 InP 扩产超 20% 仍难弥合(G0-2 ②单源:国盛电子 2026-03-15 + 新浪 2026-05-25 同源);1.6T 拉动下光芯片代际周期 18-24 月,长周期持续性高',
        evidence:'国盛电子《AI 引爆供需缺口》2026-03 + 新浪 2026-05', flag:'🆪', tier:'media', src:'国盛电子 + 新浪(同源) 2026-03~05', asOf:'2026-06-16' },
      { key:'visibility', name:'业绩可见度', score:4, trend:'up',
        reason:'🆪 ① <strong>DeepSeek 第 2 轮多源命中</strong>:源杰 26Q1 营收 3.55 亿(+320.94%)/归母净利 1.79 亿(+1153.07%)/毛利率 77.81%(+33.17pct,创历史新高)(G1-15 ①命中 broker)+ 仕佳 26Q1 营收 5.77 亿(+32.18%)/归母净利 1.16 亿(+24.66%)/毛利率 34.13%(-4.98pct)(G1-20 ①命中 broker,中原+银河双源);② <strong>北美四大 CSP Capex 多源命中</strong>(G0-10):Meta 2026 指引 1,150-1,350 亿(+59-87%)/Google 2026 指引 1,750-1,850 亿(+91-102%)/Amazon 2026 指引 ~2,000 亿(+53%)/Microsoft 2026Q1 单季 349 亿 + 指引"增速高于 2025"(从"放缓"180 度逆转)⚠️ 软指引陷阱;③ ⚠️ 中际旭创 26Q1 巨潮 PDF 未命中(山证通信单源存疑)+ 长光华芯 26Q1 扣非续亏-1,156.8 万(表观利润掩护陷阱)',
        evidence:'源杰/仕佳 26Q1 多源 + CSP 财报电话会 + SEC 10-Q/10-K', flag:'🆪', tier:'broker', src:'源杰 26Q1 多源 + 仕佳 26Q1 中原+银河双源 + Meta/Google/Amazon 26 财年指引', asOf:'2026-06-16' },
      { key:'policy',    name:'政策确定性', score:3, trend:'up',
        reason:'🆪 🔴 <strong>政策焦点重大反转</strong>(DeepSeek 第 2 轮新发现):实际是<strong>中国对 InP 出口管制</strong>(2025-02 实施 + 2026 铟出口锁定年产 30% 以内 + 高纯铟(≥6N)特批更严 + 2026-05 首批 InP 衬底出货),<strong>不是美国 BIS</strong>对 InP/光芯片管制(美国 BIS 直接命中困难,需精确 CFR 条款编号);市场关注焦点从 BIS 转向中国商务部。⚠️ InP 衬底 CR3=91%(住友 42% + AXT 36% + JX 13%,Yole 2020),中国管制直接决定全球光通信产业链供应;⚠️ 截至 2026-06,美方商界高层赴中国交涉,InP 出口许可审批节奏加快。整体政策维度转<strong>中性偏顺</strong>(对中国厂商短期不利,但加速国产化替代)',
        evidence:'中国商务部公告 + Yole 2020 + Reuters', flag:'🆪', tier:'broker', src:'中国商务部 2025-02 InP 管制 + 2026 铟出口 30% 锁定 + Yole CR3 2020', asOf:'2026-06-16' },
      { key:'supply',    name:'供需紧张度', score:5, trend:'up',
        reason:'🆪 海外 EML 寡头 95%+ 主导(G0-1 ①命中 media:新浪 2026-05-25 + 钛媒体 2026-06-11)+ 200G EML 缺口 25-30%(G0-2)+ 🔴 <strong>DeepSeek 第 2 轮 Yole 命中</strong>(G1-21/G1-22):InP 衬底 2026 全球需求 260-300 万片(2 英寸当量)vs 全球合规有效产能仅 60-75 万片,<strong>缺口 70%+</strong>;🔴 <strong>中国对 InP 出口管制(2025-02 实施)进一步压缩全球有效供给</strong>;APD 全球市场 1.42 亿美元(2024)+ 硅光渗透率 2026>50%(LC)+ 1.6T 出货量 Cignal AI 500-1000 万只 vs 行业 3000 万只(口径差异 3-6 倍)',
        evidence:'Yole 2026 + 新浪 2026-05 + 钛媒体 2026-06 + LC 2026', flag:'🆪', tier:'broker', src:'Yole 2026 InP 缺口 + 新浪/钛媒体 海外寡头 + LC 硅光渗透率 + Cignal AI', asOf:'2026-06-16' },
      { key:'valuation', name:'估值性价比', score:2, trend:'flat',
        reason:'🆪 <strong>🔓 门控解封(DeepSeek 第 2 轮多源命中)</strong>:5 只核心标的 PE-TTM + 部分 5 年分位:① <strong>光库科技 PE-TTM 338.31 倍(2026-06-12)/ 5 年 97.68% 分位(极高分位,G1-17 ①命中 broker)</strong> ② <strong>仕佳光子 PE-TTM 162.49 倍 / 5 年 65.45% 分位(G1-20 ①命中 broker)</strong> ③ <strong>赛微电子 PE-TTM 20.84 倍(2026-06-16)/ 5 年 42.23% 分位(G1-19 ①命中 broker)</strong> ④ 源杰 PE-TTM 638.34 倍(2026-04-27)/ 501.93 倍(2026-03-20)/<strong>forward 74.62 倍</strong>(G1-15 ①命中 broker,TTM 失真)⑤ 长光华芯 PE-TTM 1,713.59 倍(2026-04-17)/动态 3,344 倍(G1-16 ①命中 broker,扣非续亏 PE 失真)。综合 2 分=PE 偏高但非极端(光库极高分位 97.68% 是核心扣分项,但赛微 42.23% 中位缓解)。⚠️ G0-11 中际旭创 PE 无源(巨潮 PDF 未命中)',
        evidence:'亿牛网 + 同花顺 + 东方财富 PE 聚合', flag:'🆪', tier:'broker', src:'亿牛网 2026-06 + 东方财富 PE 聚合(光库/赛微/仕佳 5 年分位 + 源杰/长华 TTM 失真警示)', asOf:'2026-06-16' },
      { key:'barrier',   name:'壁垒安全垫', score:5, trend:'flat',
        reason:'🆪 100G/200G EML 海外寡头 95%+ 主导(G0-1)+ 70mW CW 国内多家跑通但仍依赖海外(源杰/仕佳/索尔思)(G0-3 ①命中 media:OFweek 2025-12 + 财富号 2026-04)+ InP 衬底 95% 海外垄断(G1-2)+ 长光华芯光通信 2025 毛利 12.81%(G1-11 ①命中 broker:东财+新浪,反映国内竞争激烈)。壁垒高但国产化率极低',
        evidence:'OFweek 2025-12 + 财富号 2026-04 + 腾讯 2026-01 + 新浪 2026-06', flag:'🆪', tier:'media', src:'OFweek 2025-12 + 财富号 2026-04(70mW)+ 腾讯 2026-01(InP)+ 新浪 2026-06(毛利)', asOf:'2026-06-16' }
    ],
    verdict: {
      longTermFit:'🆪 适合长线研究/跟踪——AI 算力超级上行驱动,景气持续性+壁垒安全垫双高,但估值维门控触发',
      oneLine:'🆪 光芯片是"景气持续性(4)+业绩可见度(4)+供需紧张度(5)+壁垒安全垫(5)"四高、但"估值性价比"门控触发的赛道:长线逻辑顺,胜负手在国产化率突破节奏(100G/200G EML <10%)与买点(PE 分位回踩)。',
      stockHint:'环节指引: 优先 T0/T1 卡口(激光器★★★ / 硅光 PIC ★★★)+ G0-1 海外寡头主导下的国产化突破标的(源杰/长华/光库);买点指引: 等 PE 分位回踩或扣非业绩兑现后再加仓(长光华芯 26Q1 表观扭亏但扣非仍亏,需观察业绩质量);方法论: AI 算力卡脖子赛道的胜负手在"海外寡头产能扩张速度 vs 国产化率提升节奏"'
    }
  },

  // 周期位置(注入 2026-06-16)
  cyclePosition: { stage:'boom', label:'高景气度兑现期(1.6T 实质性放量期 + 卡脖子破冰期)', reason:'🆪 200G EML 全球缺口 25-30%(G0-2),Lumentum InP 扩产 20% 仍难弥合(G0-2);1.6T 进入规模商用元年;但 100G/200G EML 国产化率<10% 处于"卡脖子破冰期",景气度高+替代空间大(AI 初版,周一 cron 覆盖)',
    watchSignals:[
      '北美四大 CSP 季度资本开支实际值及未来指引 [tier: primary][来源: 财报季 SEC 文件]',
      'Lumentum/Coherent 季度法说会 100G/200G EML 产能释放节奏 [tier: primary][来源: Lumentum/Coherent 季报]',
      '源杰科技 100G/200G EML 月度出货量及客户认证名单(中际旭创/英伟达?) [tier: estimate][来源: 公司公告 + 招商证券]',
      '美国商务部对 InP 衬底/外延设备/光芯片的出口管制动向 [tier: primary][来源: 美国 BIS 官网]'
    ]
  },

  // ⓪ 白话解读(骨架,留待核;已知卡口视角 + 口径区分预填)
  plainIntro: {
    analogy: '光芯片 = 数据中心里"GPU 之间对话用的麦克风和耳机"',
    paragraphs: [
      '光模块里那块头发丝粗细的小芯片,就是把电信号"翻译"成光信号(激光器)、以及"翻译"回电信号(探测器)的核心元器件。<strong>光模块的速率、距离、功耗,90% 由光芯片决定</strong>,但这块小东西全球能做的不到 10 家,中国大陆 100G 以上高速 EML 国产化率<10%。',
      '<strong>光芯片赛道在哪?</strong> 它是 optical(光模块整链)赛道最上游、最卡脖子的环节——光模块全球出货 60% 在中国做,但里头的高速光芯片高度依赖美日进口。本赛道的核心机会是"国产化率<20% 高速光芯片从 0 到 1 突破"。'
    ],
    flowSteps: ['InP/GaAs 衬底+外延材料','DFB/EML/CW 激光器芯片','PD/APD 探测器芯片','硅光 PIC 设计/代工','合/分波/调制器芯片','装入光模块(800G/1.6T/CPO/LPO)'],
    highlightBox: '<strong>💡 物理卡口 视角:本赛道 5 颗个股卡口(★★★×2 + ★★☆×3,2026-06-17 路径 A 升级):</strong><br>① <strong>光库科技(300620)★★★</strong>:TFLN 调制器国产化领先(全球市占无第三方口径),1.6T 硅光 + CPO 路线图核心;26Q1 净利 4,512 万(+316.2%)精准落预告区间;PE 5 年 97.68% 极高分位<br>② <strong>罗博特科(300757)★★★</strong>:ficonTEC 100% 控股(2026-06-16 AASTOCKS 双源),联合英伟达开发下一代 CPO,光耦合设备龙头;⚠️ 26Q1 整体仍亏(光伏设备承压,跨板块 G3 陷阱)<br>③ <strong>源杰科技(688498)★★☆</strong>:100G EML 已小规模量产,200G EML 仍依赖海外(q3 不过 → 评级 ★★☆),26Q1 营收 3.55 亿(+320.94%)/毛利率 77.81% 创历史新高<br>④ <strong>赛微电子(300456)★★☆</strong>:MEMS 代工龙头,1.6T 硅光代工布局,PE 20.84x 同业最低(并表基数错配陷阱);⚠️ 硅光 PIC 代工业务体量无源<br>⑤ <strong>仕佳光子(688313)★★☆</strong>:AWG 国产化龙头,26Q1 净利+24.66% 稳定,高速 APD 体量无源(探测器寡头格局);PE 5 年 65.45% 中位<br><br><strong>设备段(华峰/长川/精测/腾景)4 问全不过</strong>,显式标 <code>choke: false</code> = 不构成物理卡口(方法论预期结果,与 PCB 制造段对齐)<br><br><strong>【核查员警示】</strong><br>1. 严格区分"全球市占率"(中国模块大厂>60%)与"国产化率"(高阶光芯片自给率<20%)——本赛道大量混淆陷阱<br>2. InP/GaAs 衬底+外延工艺是上游上游,A 股无直接纯标的(云南锗业/有研新材等小份额)<br>3. 200G EML 全球仅 2-3 家有产能量产,工艺/产能数据务必 ≥2 源核实<br>4. ⚠️ <strong>评级硬约束</strong>:源杰/仕佳 strength 从原 ★★★ 降为 ★★☆,因 4 问中 q3/q1 未完全过——这是 4 问是卡口硬约束的方法论预期结果<br>(数据基准: 2026-06-17 路径 A 改造完成,4 问/卡口双轨打通)'
  },

  // ① 赛道概览(2026-06-16 联网核实后注入)
  //   ①命中 4 项 / ②单源降级 1 项 / ②待补 3 项(全留"待核")
  overview: [
    { label:'🌍 全球光芯片市场(2026E)', value:'待核', note:'<strong>⚠️ 概念偷换陷阱警示</strong>:新闻中"260 亿美元"特指下游 AI 光模块/收发器市场(TrendForce 2026E,+57.6%,①命中 media:新浪 2026-04-21 + 飞象网 2026-04),<strong>≠ 上游"光芯片"市场</strong>。光芯片市场规模无一手统计,需 ≥2 源(LC/Yole)核实', color:'var(--accent)', tier:'media', src:'新浪 2026-04-21 + 飞象网 2026-04(下游 260 亿 ≠ 上游光芯片)', asOf:'2026-04-21' },
    { label:'🇨🇳 中国大陆全球占比',     value:'待核', note:'⚠️ <strong>无源待补</strong>:光芯片全球出货份额 vs 中国市场自给率 双口径数据无一手统计(可参考 optical 赛道"中国大陆 60% 模块整链"),光芯片侧需 LC/Yole 核实', color:'var(--blue)',   tier:null, src:'无源(待补)', asOf:null },
    { label:'🤖 AI 算力核心驱动',         value:'🆪 1.6T 拉动 + 200G EML 缺口 25-30%', note:'🆪 1.6T 模块进入规模商用元年,200G EML 缺口 25-30%(G0-2 ②单源:国盛电子 2026-03-15),Lumentum InP 扩产 20% 仍难弥合,景气持续性高', color:'var(--green)',  tier:'media', src:'国盛电子 2026-03-15(单源存疑)', asOf:'2026-06-16' },
    { label:'🏭 产业阶段',                value:'1.6T 商用爆发初期 + 硅光渗透>50%', note:'🟢 <strong>DeepSeek 第 2 轮多源命中</strong>:1.6T 出货量 Cignal AI 500-1000 万只 vs 行业 3000 万只(口径差异 3-6 倍,G1-13);<strong>硅光渗透率 2026>50%(LC)+ 60-80%(行业预测,G1-14)</strong>;1.6T 商用爆发初期 + 国产化率<10%(EML 端)', color:'var(--accent)', tier:'broker', src:'LC 2026 + Cignal AI + 行业机构 + 新浪 2026-05(海外寡头)', asOf:'2026-06-16' },
    { label:'📐 1.6T EML/CW 需求(2026E)', value:'EML 缺口 25-30% + InP 缺口 70%', note:'🟢 <strong>DeepSeek 第 2 轮 Yole 双层缺口命中</strong>:① 200G EML 缺口 25-30%(G0-2) ② 🔴 <strong>InP 衬底 2026 全球需求 260-300 万片(2 英寸)vs 全球合规有效产能仅 60-75 万片,缺口 70%+(Yole,G1-21)</strong> ③ <strong>1.6T 出货量口径差异 3-6 倍</strong>:Cignal AI 500-1000 万只 vs 行业 3000 万只(G1-13 ⚠️ Cignal AI 同一机构 500 万 vs 1000 万两个数字,需区分"出货量/出货金额/端口数")', color:'var(--red)',    tier:'broker', src:'Yole 2026 + 国盛电子 2026-03-15 + Cignal AI(口径分裂)', asOf:'2026-06-16' },
    { label:'⚡ 下一代催化',              value:'3.2T 标准化 + CPO 商用 + ficonTEC 并表', note:'🆪 ① IEEE 802.3dj 3.2T 标准制定中 ② CPO 进入联合开发(罗博特科·ficonTEC 100% 控股 + 联合英伟达开发下一代 CPO,G0-5 ①命中 media:AASTOCKS 2026-06-16) ③ OFC 2026 新品。⚠️ ①+② 待核', color:null,           tier:'media', src:'AASTOCKS 2026-06-16(ficonTEC 100% 控股)+ IEEE 待核', asOf:'2026-06-16' },
    { label:'🔴 核心矛盾',                value:'海外 EML 寡头 95%+ vs 国产化率<10% + InP CR3 91%', note:'🟢 <strong>① 命中(多源印证 + DeepSeek 第 2 轮升级)</strong>:① 海外 100G/200G EML 寡头格局 — Lumentum 100G EML ≈70% / Coherent 200G EML >40% / Broadcom ≈20%(G0-1 双源) ② 🔴 <strong>InP 衬底 CR3 91%(Yole 2020):住友 42% + AXT(北京通美)36% + 日本 JX 13%</strong>(G1-22 Yole) ③ 🔴 <strong>政策焦点反转</strong>:中国对 InP 出口管制(2025-02 实施)进一步压缩全球有效供给。国产化率<10% 卡脖子 + 衬底卡脖子', color:'var(--red)',    tier:'broker', src:'新浪 2026-05 + 钛媒体 2026-06(EML)+ Yole 2020(InP CR3)+ 中国商务部 2025-02', asOf:'2026-06-16' },
    { label:'📋 高速光芯片国产化率(分型)', value:'<mark class="updated">EML <10% · InP CR3 91% · CW 多家跑通 · APD 待核</mark>', note:'🟢 <strong>① 命中(DeepSeek 第 2 轮升级分型)</strong>:\n  - **100G/200G EML**: 国产化率<10%,海外寡头 95%+(G0-1 双源)\n  - **InP 衬底**: 🔴 <strong>CR3 91%</strong>(住友 42% + AXT 36% + JX 13%,Yole 2020,G1-22)+ 2026 中国对 InP 出口管制 + 2026 铟出口锁定年产 30%\n  - **70mW CW 激光器**: 国内源杰/仕佳/索尔思等多家跑通(G0-3),但批量产能/客户认证无源\n  - **高速 APD 探测器**: 🔴 <strong>全球 APD 市场 1.42 亿美元(2024)</strong>+ Hamamatsu/Excelitas 等前 5 大厂商占 47%(G0-9 DeepSeek,Yole 报告新闻稿),精确单厂商市占无源\n  - **TFLN 调制器**: 光库科技为国产化领先厂商(全球市占无第三方口径,G0-6) + 26Q1 净利预告+303-323%(G0-6 兑现) + PE 5 年 97.68% 极高分位(高估值警示)', color:'var(--red)',   tier:'broker', src:'新浪 2026-05 + 钛媒体 2026-06(EML)+ Yole 2020(InP CR3)+ OFweek 2025-12-19 + 财富号 2026-04-12(CW)+ Yole 2024(APD 47%)+ 财联社 2026-04-13 + 新浪财 2026-04-13(光库 26Q1)+ 东方财富 PE(97.68% 分位)', asOf:'2026-06-16' }
  ],

  // ② 5 列树状图(列名与 PCB 完全一致)
  treeMap: {
    // ============ ① 下游 (光模块/光器件/通信设备) ============
    downstream: [
      { name:'光模块制造(800G/1.6T/CPO/LPO)', barrier:'mid', note:'光芯片的直接下游,买激光器/探测器芯片回去贴装', companies: [
        { name:'中际旭创', code:'300308', position:'全球光模块龙头(800G/1.6T 主力,深度绑定英伟达)', barrier:'极高' },
        { name:'新易盛',   code:'300502', position:'800G/1.6T/LPO 核心供应商',                          barrier:'高' },
        { name:'光迅科技', code:'002281', position:'硅光+模块+芯片一体化',                              barrier:'高' },
        { name:'华工科技', code:'000988', position:'激光+光模块+传感器',                                  barrier:'中' }
      ]},
      { name:'光器件/光无源(FAU/MPO/AWG/隔离器)', barrier:'mid', note:'光芯片的次级下游,做分波/合波/隔离', companies: [
        { name:'天孚通信', code:'300394', position:'全球光器件龙头,深度绑定英伟达', barrier:'高' },
        { name:'太辰光',   code:'300570', position:'无源光器件(分路器/连接器)细分', barrier:'中' }
      ]},
      { name:'电信设备(5G/骨干网/光网络)', barrier:'low', note:'—', companies: [
        { name:'中兴通讯', code:'000063', position:'5G 基站+光通信设备', barrier:'高' },
        { name:'烽火通信', code:'600498', position:'光通信传输设备',   barrier:'中' }
      ]}
    ],
    // ============ ② 中游(光芯片本身,核心 6 环节) ============
    midstream: [
      { name:'光芯片设计/制造(本赛道核心)', barrier:'extreme', choke:true, note:'🆪 本赛道的"制造端",即 segments[0-5] 的全部公司', companies:[
        { name:'源杰科技',  code:'688498', position:'国内 100G/200G EML IDM 平台,1.6T 卡口候选',   barrier:'极高' },
        { name:'长光华芯',  code:'688048', position:'大功率 CW 激光器(70mW CWDM4)国产化领先厂商之一(非唯一,源杰/仕佳/索尔思亦已实现)', barrier:'极高' },
        { name:'光库科技',  code:'300620', position:'TFLN 调制器国产化领先厂商(全球市占无第三方口径)', barrier:'极高' },
        { name:'罗博特科',  code:'300757', position:'拟收购 ficonTEC(100% 控股),硅光/CPO 耦合设备关键', barrier:'极高' },
        { name:'赛微电子',  code:'300456', position:'全球 MEMS 代工龙头,硅光 PIC 代工能力',         barrier:'极高' },
        { name:'仕佳光子',  code:'688313', position:'AWG/DFB 芯片细分龙头,无源+有源双轮',            barrier:'高'   },
        { name:'中际旭创',  code:'300308', position:'光模块龙头(自研硅光 PIC,装入自家模块)',         barrier:'高'   },
        { name:'光迅科技',  code:'002281', position:'硅光+模块+芯片一体化',                          barrier:'高'   }
      ]}
    ],
    // ============ ③ 上游材料(InP/GaAs 衬底+外延工艺) ============
    materials: [
      { name:'III-V 族衬底(InP/GaAs)+外延片', barrier:'extreme', choke:false, note:'🟢 <strong>① 命中(DeepSeek 第 2 轮 Yole 三层升级)</strong>:① 衬底 CR3 91%(Yole 2020):住友 42% + AXT(北京通美)36% + 日本 JX 13% ② 2026 全球 InP 衬底市场规模 2.02 亿美元(Yole)+ 2026 全球需求 260-300 万片(2 英寸)vs 全球合规有效产能仅 60-75 万片,<strong>缺口 70%+</strong> ③ 2026 全球 InP 衬底销量 128.19 万片(2 英寸),2019-2026 CAGR 14.40%(Yole);🔴 <strong>政策焦点反转</strong>:实际是<strong>中国对 InP 出口管制</strong>(2025-02 实施 + 2026 铟出口锁定年产 30% 以内 + 高纯铟≥6N 特批更严),不是美国 BIS;⚠️ <strong>价值链误导陷阱</strong>:InP 衬底国产化 ≠ 200G EML 自主可控(中间还有外延/晶圆制造)。A 股云南锗业/有研新材小份额', companies: [
        { name:'云南锗业', code:'002428', position:'锗衬底+光纤掺杂+磷化铟(参股),A 股稀缺的 III-V 族材料标的', barrier:'高' },
        { name:'有研新材', code:'600206', position:'化合物半导体材料(参股),覆盖 GaAs/InP 部分', barrier:'中' },
        { name:'天通股份', code:'600330', position:'压电晶体+LED 蓝宝石衬底(参股布局 InP/GaAs)', barrier:'中' },
        { name:'三安光电', code:'600703', position:'LED+化合物半导体(湖南三安),InP/GaAs 外延有布局', barrier:'中' }
      ]},
      { name:'光学石英/光学薄膜(隔离器/透镜/滤光片基础材料)', barrier:'high', choke:false, note:'光芯片封装的辅助材料,菲利华/欧晶科技等', companies: [
        { name:'菲利华',   code:'300395', position:'Q 布龙头+光学石英材料,本赛道辅助材料侧', barrier:'高' },
        { name:'欧晶科技', code:'001269', position:'光伏+半导体石英坩埚(光芯片间接)', barrier:'中' }
      ]}
    ],
    // ============ ④ 上游设备(外延 MOCVD/光刻/刻蚀/测试) ============
    equipment: [
      { name:'外延/光刻/刻蚀设备(MOCVD/EBeam)', barrier:'extreme', choke:false, note:'🆪 光芯片代工的核心设备,Aixtron/VEECO 等海外绝对主导(70%+),国内中微/北方华创有部分突破;⚠️ <strong>跨赛道映射陷阱</strong>:华峰/长川/精测是"传统半导体测试设备",不能映射到"光通信测试"', companies: [
        { name:'中微公司',   code:'688012', position:'刻蚀+MOCVD 设备,化合物半导体(LED/InP)外延设备', barrier:'高' },
        { name:'北方华创',   code:'002371', position:'刻蚀/PVD/CVD/外延,化合物半导体设备部分',         barrier:'高' },
        { name:'拓荆科技',   code:'688072', position:'薄膜沉积(PECVD),III-V 族外延有相关产品',         barrier:'中' }
      ]},
      { name:'光芯片测试/封装设备', barrier:'high', choke:false, note:'⚪ <strong>② 单源存疑</strong>:海外 Keysight + Anritsu 合计 84% 光通信测试份额(G0-7 财富号 2025-09-09 单源,⚠️ 跨赛道陷阱:本土约 16% 中联讯仪器占 9.9%,不可将华峰/长川/精测市场份额生搬硬套至"光通信测试");EXFO + 罗博特科·ficonTEC 耦合设备 100% 控股(G0-5)', companies: [
        { name:'罗博特科',   code:'300757', position:'拟收购 ficonTEC(100% 控股,联合英伟达开发 CPO),光芯片耦合/测试设备关键', barrier:'极高' },
        { name:'华峰测控',   code:'688200', position:'模拟/混合信号 IC 测试机(光芯片驱动 IC 测试侧,⚠️ 跨赛道映射陷阱)', barrier:'中' },
        { name:'长川科技',   code:'300604', position:'IC 测试机+分选机(光芯片 CP/FT,⚠️ 跨赛道映射陷阱)',           barrier:'中' },
        { name:'精测电子',   code:'300567', position:'显示/半导体测试设备(光芯片晶圆测试侧,⚠️ 跨赛道映射陷阱)',           barrier:'中' }
      ]}
    ],
    // ============ ⑤ 侧枝(光芯片相关的卡脖子交叉环节) ============
    sideBranches: [
      { name:'硅光/CPO 耦合与测试设备(光芯片封装关键)', barrier:'extreme', note:'光芯片装入硅光模块/CPO 的关键耦合设备,ficonTEC(罗博特科拟收购)全球垄断', sourceSegment:'segments[2]硅光 PIC' },
      { name:'薄膜铌酸锂(TFLN)调制器(光芯片侧枝)', barrier:'extreme', note:'TFLN 是 1.6T/3.2T 相干模块核心,光库科技全球龙头', sourceSegment:'segments[2]硅光 PIC' },
      { name:'AI 服务器 PCB + 覆铜板(光芯片间接配套)', barrier:'extreme', note:'光模块装入 AI 服务器 → PCB/CCL 是间接上游,详见 pcb 赛道', sourceSegment:'pcb-segments' }
    ]
  },

  // 6 环节 segments(光子学价值链)—— 与 treeMap 中游 sub-card 1:1 对应
  segments: [
    // === segments[0] 激光器芯片(DFB/EML/CW/可调)—— 卡口候选 ① ===
    {
      name:'激光器芯片(DFB/EML/CW/可调)',
      costRatio:'光模块 BOM ~15-20%',
      barrier:'extreme', choke:true, border:true,
      intro:'激光器芯片是光模块的"光源",决定发射距离/速率/功耗。<strong>卡口候选 ①</strong>:<strong>🟢 ① 命中(双源)</strong>:Lumentum 100G EML 全球市占≈70% / Coherent 200G EML 全球市占>40% / Broadcom≈20%(G0-1 新浪 2026-05-25 + 钛媒体 2026-06-11)。100G/200G EML 国产化率<10%,A 股源杰 100G EML 已批量出货进 800G 供应链(G0-4 ①命中 media:OFweek 2025-12 + 新浪 2026-05),70mW CW 国内源杰/仕佳/索尔思等多家跑通(G0-3)。',
      globalLandscape: [
        { lbl:'🥇 Lumentum(美)',  val:'100G EML 全球市占≈70%',  note:'①命中:新浪 2026-05-25 + 钛媒体 2026-06-11' },
        { lbl:'🥈 Coherent(美)',  val:'200G EML 全球市占>40%',  note:'①命中:同上' },
        { lbl:'🥉 Broadcom(美)',  val:'全球市占≈20%',             note:'①命中:同上' },
        { lbl:'国内突破',          val:'源杰 100G EML 批量出货 / 长华/仕佳/索尔思 70mW CW', note:'①命中 G0-3+ G0-4(多家跑通,非唯一)' }
      ],
      stocks: [
        { rank:1, name:'源杰科技',  code:'688498', position:'国内 100G/200G EML IDM 平台,1.6T 卡口候选',     barrier:'极高', trend:'up', trendNote:'26Q1 营收+320.94%/净利+1153%/毛利 77.81% 创历史新高', logic:'<strong>① 命中(DeepSeek 第 2 轮 G1-15 多源)</strong>:26Q1 营收 3.55 亿(+320.94%)/归母净利 1.79 亿(+1153.07%)/毛利率 77.81%(+33.17pct 创历史新高)(G1-15);100G EML 已批量出货 + 进入 800G 供应链(OFweek 2025-12-19 + 新浪 2026-05-25 G0-4);200G EML 完成研发流片,处于客户验证阶段,2026 年底量产计划(G1-15);⚠️ <strong>early-stage 估值陷阱</strong>:PE-TTM 638.34 倍(2026-04-27)→ forward 74.62 倍,TTM 失真;⚠️ 放量陷阱:"进入 800G 供应链"≠"核心主供";⚠️ 巨潮一手陷阱:巨潮页面显示净利润 0.14 亿/营收 0.84 亿与一季报 3.55 亿/1.79 亿严重不符(可能为单月数据,需直接查 PDF 公告)',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'broker'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:1,trend:'flat',tier:'broker'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 营收+320.94%/净利+1153%/毛利 77.81%;⚠️ PE-TTM 638 倍失真', valAsOf:'2026-04-27', tier:'broker', src:'G1-15 多源 + G0-4 OFweek+新浪' },
        { rank:2, name:'长光华芯',  code:'688048', position:'大功率 CW 激光器芯片(70mW CWDM4)国产化领先厂商之一', barrier:'极高', trend:'up', trendNote:'26Q1 营收+37.81% 表观扭亏但扣非续亏-1,156.8 万,PE-TTM 1713 倍', logic:'<strong>① 命中(DeepSeek 第 2 轮 G1-16 多源 + G0-3 + G1-11)</strong>:26Q1 营收 1.299 亿(+37.81%)/归母净利 448 万扭亏(+159.73%)/扣非净利润 -1,156.8 万续亏(G1-16);PE-TTM 1,713.59 倍(2026-04-17)/动态 PE 3,344 倍(2026-06-02);70mW CW 国内多家跑通之一(非唯一,G0-3);⚠️ <strong>G3 反向陷阱 + 表观利润掩护</strong>:扣非 vs 归母 严格分离,主营盈利能力未根本改善;⚠️ PE 失真(基于归母,但扣非续亏)',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'broker'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:1,trend:'flat',tier:'broker'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 营收+37.81%;⚠️ 扣非-1,156.8 万续亏 + PE 1713 倍', valAsOf:'2026-04-17', tier:'broker', src:'G1-16 多源 + G0-3 OFweek+财富号' },
        { rank:3, name:'仕佳光子',  code:'688313', position:'AWG/DFB 芯片细分龙头,无源+有源双轮',            barrier:'高',   trend:'up', trendNote:'26Q1 营收+32.18%/净利+24.66%/毛利 34.13%(-4.98pct)', logic:'<strong>① 命中(DeepSeek 第 2 轮 G1-20 多源升级 + G1-10)</strong>:26Q1 营收 5.77 亿(+32.18%)/归母净利 1.16 亿(+24.66%)/毛利率 34.13%(-4.98pct,价格战迹象)(G1-20 + G1-10 中原+银河双源);PE-TTM 162.49 倍 / 5 年 65.45% 分位(G1-20);⚠️ <strong>代际概念混淆陷阱</strong>:无源红海(PLC 分路器) vs 有源增量(DFB/EML)需切割,目前公开数据仅披露整体营收,细分占比无源;⚠️ 扣非净利 1.07 亿(+16.31%) 巨潮未直接命中(DeepSeek 搜到的是 2024 年扣非-81 万),需手工核 PDF',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'broker'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'broker'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 营收+32.18%/净利+24.66% 双源;PE 5 年 65.45%', valAsOf:'2026-04-17', tier:'broker', src:'G1-20 + G1-10 中原+银河双源' },
        { rank:4, name:'永鼎股份',  code:'600105', position:'子公司鼎芯光电布局 EML/CW 光芯片', barrier:'中',   trend:'flat', trendNote:'26Q1 净利-45.19%(去年同期 2.92 亿投资收益高基数),剔除后经营性利润大增', logic:'<strong>② 待补(G1-12)</strong>:子公司鼎芯光电布局 EML/CW,已签"保供"协议,但<strong>具体客户/出货量/26Q1 财务数据</strong>无源(待核);26Q1 净利 1.59 亿/-45.19% 来自去年同期 2.92 亿投资收益高基数,非经营性下滑。⚠️ G3 反向陷阱:不能将"整体经营"映射到光芯片子板块', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 26Q1 净利-45.19%(高基数);鼎芯光电 EML/CW 待核', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'三安光电',  code:'600703', position:'化合物半导体(湖南三安)InP/GaAs 外延+激光器',     barrier:'中',   trend:null, trendNote:'EML/CW 进展待核', logic:'<strong>待核</strong>:湖南三安 InP/GaAs 外延有布局,激光器业务体量/客户无源', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(湖南三安 InP/GaAs)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'华工科技',  code:'000988', position:'激光+光模块+传感器,激光器芯片子业务',            barrier:'中',   trend:null, trendNote:'EML/CW 进展待核', logic:'<strong>待核</strong>:激光器芯片子业务,具体 EML/CW 业务体量无源', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(激光器子业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[1] 探测器芯片(PD/APD)—— 卡口候选 ② ===
    {
      name:'探测器芯片(PD/APD/SPAD)',
      costRatio:'光模块 BOM ~5-8%',
      barrier:'high', choke:true, border:false,
      intro:'探测器芯片是光模块的"耳朵",把光信号"翻译"回电信号。<strong>卡口候选 ②</strong>:<strong>② 待补(G1-3 全无源)</strong>:Hamamatsu(日)/First Sensor(已被 TE 收购)/Excelitas(美)三家寡头格局清晰,但<strong>精确全球市占无第三方一手数据</strong>。A 股纯 APD/SPAD 标的稀缺,核心标的多与激光器集成或与光学集成。',
      globalLandscape: [
        { lbl:'🥇 Hamamatsu(日)', val:'APD/SPAD 全球龙头',  note:'②待补(精确%无源)' },
        { lbl:'🥈 First Sensor(德)', val:'高速 APD 主力',     note:'已被 TE Connectivity 收购' },
        { lbl:'🥉 Excelitas(美)', val:'红外探测器',            note:'—' }
      ],
      stocks: [
        { rank:1, name:'源杰科技',  code:'688498', position:'PD 探测器芯片(与 EML 同平台)同步布局',          barrier:'高',   trend:null, trendNote:'PD 业务体量待核', logic:'<strong>待核</strong>:PD 探测器芯片与 EML 同平台,具体业务体量/客户/良率无源(待补)', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'待核(PD 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:2, name:'长光华芯',  code:'688048', position:'VCSEL 探测器+激光雷达 PD 业务',                  barrier:'高',   trend:null, trendNote:'PD 业务体量待核', logic:'<strong>待核</strong>:VCSEL 探测器+激光雷达 PD 业务,具体体量/客户无源(待补);⚠️ G3 反向陷阱:不可将 26Q1 表观扭亏挂钩到 PD 业务回暖(同 segments[0])', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(PD 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:3, name:'炬光科技',  code:'688167', position:'激光雷达 VCSEL+PD 阵列,激光器/探测器一体',         barrier:'中',   trend:null, trendNote:'PD 业务体量待核', logic:'<strong>待核</strong>:激光雷达 VCSEL+PD 阵列,具体 PD 业务体量无源(待补);⚠️ 26Q1 归母净利-1320 万(同比减亏 59% 仍亏),不能将"减亏"映射到 PD 业务回暖', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(PD 阵列业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'水晶光电',  code:'002273', position:'光学薄膜+红外截止滤光片+激光雷达罩(探测器侧)',     barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光学薄膜+红外滤光片+激光雷达罩,非纯探测器芯片厂商,业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(光学薄膜侧)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'奥比中光',  code:'688322', position:'3D 视觉感知芯片+SPAD 单光子探测器',                barrier:'中',   trend:null, trendNote:'SPAD 业务体量待核', logic:'<strong>待核</strong>:3D 视觉感知芯片+SPAD 单光子探测器,SPAD 业务体量/客户无源(待补);A 股纯 SPAD 标的稀缺', dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(SPAD 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[2] 硅光 PIC(设计+代工/材料)—— 卡口候选 ③ ===
    {
      name:'硅光 PIC(设计+代工/材料)',
      costRatio:'光模块/光引擎 ~30-40%',
      barrier:'extreme', choke:true, border:true,
      intro:'硅光 PIC 是 1.6T 时代"光电共封装"的核心载体。<strong>卡口候选 ③</strong>:<strong>① 命中(G0-5 双源)</strong>:罗博特科·ficonTEC 100% 控股已确认,正与英伟达联合开发下一代 CPO(AASTOCKS 2026-06-16 官方公告双渠道源);⚠️ ficonTEC 2025 全年营收/净利/设备市占/客户结构<strong>无源(待补)</strong>;光库 TFLN 调制器 26Q1 净利预告 4370-4587 万(+303-323%)兑现(G0-6 ①命中 broker:财联社 2026-04-13 + 新浪财经 2026-04-13),<strong>全球市占无第三方口径</strong>,应称"TFLN 调制器国产化领先厂商"。',
      globalLandscape: [
        { lbl:'🥇 TSMC COUPE 平台', val:'硅光代工全球主导',  note:'3nm/5nm CMOS 工艺' },
        { lbl:'🥈 Intel Silicon Photonics', val:'硅光集成老牌',  note:'可插拔模块主力' },
        { lbl:'🥉 Cisco Acacia', val:'相干硅光',               note:'长距传输方案' }
      ],
      stocks: [
        { rank:1, name:'罗博特科',  code:'300757', position:'拟收购 ficonTEC(100% 控股,联合英伟达开发 CPO)', barrier:'极高', trend:'up', trendNote:'26Q1 整体仍亏(光伏设备承压),PE-TTM 负值(亏损)/5 年 4.96-7.78% 极低分位', logic:'<strong>① 命中(G0-5 双源) + DeepSeek 第 2 轮 G1-18 PE</strong>:截至 2026-06-16 ficonTEC 100% 控股 + 联合英伟达开发 CPO(AASTOCKS 2026-06-16);26Q1 营收 1.64 亿/+69.33%/归母净利-3,882 万(亏损扩大);🔴 <strong>PE-TTM 为负值(亏损),过去 5 年处于个股约 4.96%-7.78% 位置(G1-18 ①命中 broker)</strong>;⚠️ <strong>G3 跨板块映射陷阱</strong>:整体亏损不能映射到 ficonTEC 光通信业务下行(光伏设备承压是主因),<strong>26Q1 ficonTEC 单独营收/净利无源</strong>,业务板块拆分待补',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'broker'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:1,trend:'flat',tier:'broker'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 ficonTEC 100% 控股(双源);⚠️ PE 负值(亏损)+ G3 跨板块陷阱', valAsOf:'2026-06-16', tier:'broker', src:'G0-5 AASTOCKS 双源 + G1-18 PE 分位' },
        { rank:2, name:'光库科技',  code:'300620', position:'TFLN 调制器国产化领先厂商(全球市占无第三方口径)', barrier:'极高', trend:'up', trendNote:'26Q1 净利预告+303-323%/PE 5 年 97.68% 极高分位', logic:'<strong>① 命中(DeepSeek 第 2 轮 G1-17 PE 分位升级 + G0-6 双源)</strong>:TFLN 调制器国产化领先厂商,26Q1 净利预告 4370-4587 万/+303-323%(财联社 2026-04-13 + 新浪财经 2026-04-13);🔴 <strong>PE-TTM 338.31 倍(2026-06-12)/ 5 年 97.68% 分位(极高分位,G1-17)</strong> — 估值已进入历史极值区间;⚠️ <strong>绝对化陷阱</strong>:缺乏第三方权威口径确认其全球市占率;⚠️ <strong>预告兑现陷阱</strong>:26Q1 巨潮 PDF 未直接命中(DeepSeek 搜到的是 2025 Q1 数据 1,084 万),需等巨潮正式季报;⚠️ 1.6T 相干 TFLN 渗透率无源',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'broker'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:1,trend:'flat',tier:'broker'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 净利预告+303-323% 双源;⚠️ PE 5 年 97.68% 极高分位', valAsOf:'2026-06-12', tier:'broker', src:'G1-17 多源 + G0-6 财联社+新浪财' },
        { rank:3, name:'赛微电子',  code:'300456', position:'全球 MEMS 代工龙头,硅光 PIC 代工能力与产能',      barrier:'极高', trend:'down', trendNote:'26Q1 归母-4910 万(转亏,Silex 剥离口径),PE 20.84 倍/5 年 42.23%', logic:'<strong>① 命中(DeepSeek 第 2 轮 G1-19 多源)</strong>:26Q1 归母净利-4,909.9 万元(由盈转亏,G1-19);PE-TTM 20.84 倍(2026-06-16)/ 5 年 42.23% 分位(G1-19) — PE 仅 20 倍显著低于同业(源杰 638/长华 1713/光库 338/仕佳 162);⚠️ <strong>并表基数错配陷阱</strong>:26Q1 营收 -62.68% 是剥离瑞典 Silex 致口径腰斩,≠ 业务崩盘;⚠️ 硅光 PIC 代工业务具体营收/客户/订单体量<strong>仍无源(待核)</strong>', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'broker'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:4,trend:'flat',tier:'broker'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 归母-4910 万(转亏);PE 20.84 倍/5 年 42.23%(同业最低)', valAsOf:'2026-06-16', tier:'broker', src:'G1-19 多源' },
        { rank:4, name:'中际旭创',  code:'300308', position:'硅光模块龙头(自研硅光 PIC,装入自家模块)',        barrier:'高',   trend:'up', trendNote:'26Q1 营收+192.1%/净利+262.3%,1.6T 占比攀升', logic:'<strong>② 单源(G1-9)</strong>:26Q1 营收 195.0 亿(同/环比+192.1%/+47.3%)/归母净利 57.3 亿(+262.3%/+56.5%)(山证通信 2026-05-28,单源);1.6T 高端产品比重攀升驱动业绩;⚠️ 26Q1 预付款精确值+锁产能光芯片厂商穿透名单<strong>无源(待补)</strong>;自研硅光 PIC 装入自家模块', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚪ 26Q1 营收+192.1%/净利+262.3%(单源)', valAsOf:'2026-05-28', tier:'broker', src:'山证通信 2026-05-28(单源存疑)' },
        { rank:5, name:'光迅科技',  code:'002281', position:'硅光 PIC 设计+模块一体化',                       barrier:'高',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:硅光 PIC 设计+模块一体化,具体硅光 PIC 业务体量/客户无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(PIC 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'新易盛',    code:'300502', position:'硅光模块+激光器混合集成,1.6T 主力供应商',         barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:硅光模块+激光器混合集成,1.6T 主力供应商,具体硅光 PIC 业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(硅光模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:7, name:'华工科技',  code:'000988', position:'硅光传感器+激光雷达',                             barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:硅光传感器+激光雷达,具体硅光业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(硅光传感器业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:8, name:'腾景科技',  code:'688195', position:'光学元件(分路器/波分复用器),硅光模块辅助',         barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光学元件(分路器/波分复用器),硅光模块辅助,业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(光学元件业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[3] 调制/合分波芯片(MZM/AWG/VOA) ===
    {
      name:'调制/合分波芯片(MZM/AWG/VOA)',
      costRatio:'光模块 BOM ~10-15%',
      barrier:'high', choke:false, border:false,
      intro:'调制器(MZM/IQ 调制器)、合分波器(AWG/WDM)、可变光衰减器(VOA)是光模块的"信号处理核心"。LiNbO3 调制器传统主导(Lumentum),TFLN(薄膜铌酸锂)是下一代 1.6T/3.2T 相干通信的关键(光库科技国产化领先厂商)。',
      globalLandscape: [
        { lbl:'🥇 Lumentum(美)', val:'LiNbO3 调制器全球龙头',  note:'—' },
        { lbl:'🥈 光库科技(中)', val:'TFLN 调制器国产化领先厂商', note:'26Q1 净利预告+303-323%' }
      ],
      stocks: [
        { rank:1, name:'光库科技',  code:'300620', position:'TFLN 调制器国产化领先厂商(本环节第一)', barrier:'极高', trend:'up', trendNote:'26Q1 净利预告+303-323%,TFLN 量产兑现', logic:'<strong>① 命中(复用 G0-6)</strong>:TFLN 调制器国产化领先厂商,26Q1 净利预告 4370-4587 万/+303-323%(财联社+新浪财);⚠️ <strong>绝对化陷阱</strong>:全球市占无第三方口径,应称"国产化领先"而非"全球龙头"', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 净利+303-323% 双源', valAsOf:'2026-04-13', tier:'broker', src:'财联社 2026-04-13 + 新浪财经 2026-04-13' },
        { rank:2, name:'仕佳光子',  code:'688313', position:'AWG 阵列波导光栅(合分波)国产化龙头',                barrier:'高',   trend:'up', trendNote:'26Q1 营收+32.18%/净利+24.66%(复用 segments[0])', logic:'<strong>① 命中(复用 G1-10)</strong>:AWG 阵列波导光栅(合分波)国产化龙头,26Q1 营收 5.77 亿/+32.18%/净利 1.16 亿/+24.66%(中原+银河双源);AWG/DFB/EML 细分占比无源', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 营收+32.18%/净利+24.66% 双源', valAsOf:'2026-05-08', tier:'broker', src:'中原通信 2026-05-08 + 银河通信 2026-04-21' },
        { rank:3, name:'中兴通讯',  code:'000063', position:'光通信设备整机(含自研调制器)',                   barrier:'高',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光通信设备整机(含自研调制器),具体调制器业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(调制器子业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'天孚通信',  code:'300394', position:'光器件平台,含 AWG 辅助',                          barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光器件平台,具体 AWG 业务体量无源(待补);详见 optical 赛道已注入数据', dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(AWG 业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'太辰光',    code:'300570', position:'无源光器件(AWG/分路器/连接器)',                    barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:无源光器件(AWG/分路器/连接器),具体业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(无源光器件业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[4] 光芯片测试与封装设备 ===
    {
      name:'光芯片测试与封装设备',
      costRatio:'占光芯片厂商 CapEx ~15-20%',
      barrier:'extreme', choke:false, border:false,
      intro:'光芯片晶圆测试(CP)、成品测试(FT)、封装(共晶焊/FlipChip/光学耦合)需要专门的设备。Keysight/EXFO 海外主导(Keysight+Anritsu 合计 84% 光通信测试份额,②单源存疑),国内华峰测控/长川科技/精测电子在 IC 测试侧有突破,⚠️ <strong>跨赛道映射陷阱</strong>:华峰/长川/精测是"传统半导体测试设备",<strong>不能映射到"光通信测试"</strong>子板块;光芯片专用测试设备(误码仪/光功率计)国产替代初期。',
      globalLandscape: [
        { lbl:'🥇 Keysight(美)', val:'光通信测试全球龙头',  note:'②单源存疑:Keysight+Anritsu 合计 84%' },
        { lbl:'🥈 EXFO(加)',    val:'光通信测试设备',         note:'营收拆分无源' }
      ],
      stocks: [
        { rank:1, name:'罗博特科',  code:'300757', position:'拟收购 ficonTEC(100% 控股),光芯片耦合/测试设备关键', barrier:'极高', trend:'up', trendNote:'复用 segments[2] (G0-5 双源)', logic:'<strong>① 命中(复用 G0-5)</strong>:ficonTEC 100% 控股,联合英伟达开发 CPO,光芯片耦合/测试设备关键;⚠️ ficonTEC 2025 营收/净利/全球市占/客户结构<strong>无源</strong>;26Q1 整体仍亏(G3 反向陷阱)', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 ficonTEC 100% 控股(复用)', valAsOf:'2026-06-16', tier:'media', src:'AASTOCKS 2026-06-16(双源)' },
        { rank:2, name:'华峰测控',  code:'688200', position:'模拟/混合信号 IC 测试机(光芯片驱动 IC,⚠️ 跨赛道映射陷阱)', barrier:'高',   trend:null, trendNote:'光通信占比待核', logic:'<strong>待核</strong>:模拟/混合信号 IC 测试机,⚠️ <strong>跨赛道映射陷阱</strong>:华峰是"传统半导体测试设备"厂商,<strong>不能将其市场份额生搬硬套至"光通信测试"</strong>子板块,光通信测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 跨赛道映射陷阱', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:3, name:'长川科技',  code:'300604', position:'IC 测试机+分选机(光芯片 CP/FT,⚠️ 跨赛道映射陷阱)', barrier:'高',   trend:null, trendNote:'光通信占比待核', logic:'<strong>待核</strong>:IC 测试机+分选机,⚠️ <strong>跨赛道映射陷阱</strong>:长川是"传统半导体测试设备"厂商,光通信测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 跨赛道映射陷阱', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'精测电子',  code:'300567', position:'显示/半导体测试设备(光芯片晶圆测试侧,⚠️ 跨赛道映射陷阱)', barrier:'中',   trend:null, trendNote:'光通信占比待核', logic:'<strong>待核</strong>:显示/半导体测试设备,⚠️ <strong>跨赛道映射陷阱</strong>:光通信测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 跨赛道映射陷阱', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'普源精电',  code:'688337', position:'示波器/波形发生器(光芯片研发测试)',                barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:示波器/波形发生器,光芯片研发测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(研发测试业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'鼎阳科技',  code:'688112', position:'数字示波器+信号发生器(光芯片研发侧)',              barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:数字示波器+信号发生器,光芯片研发侧业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(研发测试业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[5] 模块应用与下游集成(光模块/光器件集成) ===
    {
      name:'模块应用与下游集成(光模块整链)',
      costRatio:'光芯片下游 100%',
      barrier:'mid', choke:false, border:false,
      intro:'本环节是光芯片的下游,光模块厂商把激光器/探测器/调制器芯片集成成 800G/1.6T 模块。本环节不是物理卡口(≥10 家可切换),但订单兑现度直接决定光芯片厂商的业绩弹性。详见 optical(光模块整链)赛道。',
      globalLandscape: [
        { lbl:'🥇 中际旭创',  val:'全球光模块龙头(英伟达链)', note:'—' },
        { lbl:'🥈 Coherent', val:'美国光模块大厂',               note:'原 II-VI + Finisar' }
      ],
      stocks: [
        { rank:1, name:'中际旭创',  code:'300308', position:'全球光模块龙头(800G/1.6T 主力,深度绑定英伟达)',   barrier:'极高', trend:'up', trendNote:'26Q1 营收+192.1%/净利+262.3%(复用 segments[2])', logic:'<strong>② 单源(复用 G1-9)</strong>:26Q1 营收 195.0 亿(+192.1%/+47.3%)/归母净利 57.3 亿(+262.3%/+56.5%)(山证通信 2026-05-28,单源);1.6T 高端占比攀升;⚠️ 26Q1 预付款+锁产能名单<strong>无源</strong>', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚪ 26Q1 营收+192.1%/净利+262.3%(单源)', valAsOf:'2026-05-28', tier:'broker', src:'山证通信 2026-05-28(单源存疑)' },
        { rank:2, name:'新易盛',    code:'300502', position:'800G/1.6T/LPO 核心供应商',                            barrier:'高',   trend:null, trendNote:'详见 optical 赛道', logic:'<strong>待核</strong>:800G/1.6T/LPO 核心供应商,具体业务体量/客户无源(详见 optical 赛道已注入)', dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'详见 optical 赛道', valAsOf:null, tier:null, src:'无源(详见 optical)' },
        { rank:3, name:'光迅科技',  code:'002281', position:'硅光+模块+芯片一体化',                                 barrier:'高',   trend:null, trendNote:'详见 optical 赛道', logic:'<strong>待核</strong>:硅光+模块+芯片一体化,具体业务体量无源(详见 optical 赛道已注入)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'详见 optical 赛道', valAsOf:null, tier:null, src:'无源(详见 optical)' },
        { rank:4, name:'华工科技',  code:'000988', position:'激光+光模块+传感器',                                     barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:激光+光模块+传感器,具体模块业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'剑桥科技',  code:'603083', position:'光模块+无线小基站',                                       barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光模块+无线小基站,具体模块业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'天孚通信',  code:'300394', position:'光器件平台龙头(深度配套光模块厂商)',                       barrier:'中',   trend:null, trendNote:'详见 optical 赛道', logic:'<strong>待核</strong>:光器件平台龙头,具体业务体量无源(详见 optical 赛道已注入)', dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'详见 optical 赛道', valAsOf:null, tier:null, src:'无源(详见 optical)' },
        { rank:7, name:'联特科技',  code:'301205', position:'1.6T 光模块新晋(马来工厂规避关税)',                       barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:1.6T 光模块新晋,马来工厂规避关税,业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:8, name:'博创科技', code:'300548', position:'PLC 光分路器+AWG 国产化',                                                          barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:PLC 光分路器+AWG 国产化,具体模块业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(光分路器/AWG 业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    }
  ],

  // 四大物理追问(2026-06-17 路径 A 升级·5 段 × 个股级布尔)
  // ★ schema 与 PCB 黄金范例对齐:
  //   ① 段数 3→5(激光器/探测器/硅光 PIC/调制/反向-设备)
  //   ② 个股级 q1-q4 布尔(替代原段级字符串)
  //   ③ 4 问 ⇔ 卡口双轨打通(5 段 ⇔ 5 颗个股卡口)
  //   ④ 反向段显式 choke:false(设备 4 问全 0)
  fourQuestions: {
    segments: [
      // ============ 段 1:激光器芯片(DFB/EML/CW/可调) ============
      { name:'激光器芯片(DFB/EML/CW/可调)', barrier:'extreme', choke:true,
        stocks:[
          { name:'源杰科技', code:'688498', barrier:'极高',
            q1:true,  q1note:'Lumentum 100G EML ≈70% / Coherent 200G EML >40% 海外 95%+',
            q2:true,  q2note:'Lumentum InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%',
            q3:false, q3note:'200G EML 国产化率<10%(70mW CW 跑通但 200G 未量产)',
            q4:true,  q4note:'1.6T 拉动 + 200G EML 缺口 25-30% + 中际旭创 26Q1 营收+192%',
            hits:3, strength:'★★☆' },
          { name:'长光华芯', code:'688048', barrier:'高',
            q1:false, q1note:'非寡头,70mW CW 国内多家跑通之一(非唯一)',
            q2:true,  q2note:'70mW CWDM4 国内从 0 到 1 突破(2025 年报披露)',
            q3:false, q3note:'200G EML 仍未量产,扣非续亏 -1,156.8 万',
            q4:true,  q4note:'硅光/CPO 架构对 CW 需求强',
            hits:2, strength:null },
          { name:'华工科技', code:'000988', barrier:'中', choke:false,
            q1:false, q1note:'激光+模块+传感器综合,激光器非主业',
            q2:false, q2note:'CW 业务体量无源',
            q3:false, q3note:'非寡头格局,客户可切换',
            q4:false, q4note:'业务分散,卡口逻辑不聚焦',
            hits:0, strength:null }
        ]
      },
      // ============ 段 2:高速探测器(PD/APD) ============
      { name:'高速探测器(PD/APD)', barrier:'high', choke:true,
        stocks:[
          { name:'仕佳光子', code:'688313', barrier:'高',
            q1:false, q1note:'Hamamatsu/First Sensor/Excelitas 三家寡头(精确%无源)',
            q2:false, q2note:'APD 产能无源,Yole 报告付费',
            q3:true,  q3note:'仕佳 AWG 国产化龙头,APD 仍依赖海外',
            q4:true,  q4note:'全球 APD 市场 1.42 亿美元(2024),需求弱',
            hits:2, strength:null },
          { name:'长光华芯', code:'688048', barrier:'中', choke:false,
            q1:false, q1note:'VCSEL/激光雷达 PD,非高速 APD 主战场',
            q2:false, q2note:'业务体量无源',
            q3:false, q3note:'A 股纯 APD/SPAD 标的稀缺,集成在激光器里',
            q4:false, q4note:'需求侧无单点卡位',
            hits:0, strength:null }
        ]
      },
      // ============ 段 3:硅光 PIC(设计+代工/材料) ============
      { name:'硅光 PIC(设计+代工/材料)', barrier:'extreme', choke:true,
        stocks:[
          { name:'光库科技', code:'300620', barrier:'极高',
            q1:true,  q1note:'TFLN 调制器国产化领先(全球市占无第三方口径,应称领先非寡头)',
            q2:true,  q2note:'1.6T 硅光模块销售额预计首超整体光模块 50%(LC 数据)',
            q3:true,  q3note:'Lumentum LiNbO3 主导,TFLN 国产化破冰',
            q4:true,  q4note:'26Q1 净利预告+303-323% + 1.6T 渗透率攀升',
            hits:4, strength:'★★★' },
          { name:'罗博特科', code:'300757', barrier:'极高',
            q1:true,  q1note:'ficonTEC 100% 控股已确认(2026-06-16),联合英伟达开发 CPO',
            q2:true,  q2note:'CPO 商用元年,设备需求增长',
            q3:true,  q3note:'海外耦合设备厂商极少,ficonTEC 卡位明确',
            q4:true,  q4note:'英伟达 CPO 路线图 + 3.2T 标准',
            hits:4, strength:'★★★' },
          { name:'赛微电子', code:'300456', barrier:'高',
            q1:false, q1note:'MEMS 代工龙头,硅光 PIC 代工业务体量无源',
            q2:true,  q2note:'1.6T 硅光代工需求增长(TSMC COUPE 主导,赛微有布局)',
            q3:false, q3note:'具体硅光 PIC 客户/订单体量无源',
            q4:true,  q4note:'1.6T + CPO 推动代工需求',
            hits:2, strength:null }
        ]
      },
      // ============ 段 4:调制/合分波芯片(MZM/TFLN/AWG) ============
      { name:'调制/合分波芯片(MZM/TFLN/AWG)', barrier:'high', choke:true,
        stocks:[
          { name:'光库科技', code:'300620', barrier:'极高',
            q1:true,  q1note:'TFLN 调制器国产化领先',
            q2:false, q2note:'1.6T 相干 TFLN 渗透率无第三方一手数据',
            q3:true,  q3note:'Lumentum LiNbO3 主导,TFLN 国产化破冰',
            q4:false, q4note:'1.6T 相干模块需求口径无源',
            hits:2, strength:null },
          { name:'博创科技', code:'300548', barrier:'中',
            q1:false, q1note:'PLC 光分路器+AWG 国产化,非寡头',
            q2:false, q2note:'业务体量无源',
            q3:false, q3note:'客户可切换,卡位不明确',
            q4:false, q4note:'业务分散',
            hits:0, strength:null }
        ]
      },
      // ============ 段 5:设备(反向段,4 问全不过,显式 choke:false) ============
      { name:'光芯片/光通信设备(反向段)', barrier:'low', choke:false,
        intro:'设备段客户可切换 = 不构成物理卡口(方法论预期结果,与 PCB 制造段对齐)',
        stocks:[
          { name:'华峰测控', code:'688200', barrier:'中',
            q1:false, q1note:'传统半导体测试设备,非光通信测试',
            q2:false, q2note:'光通信测试设备业务体量无源',
            q3:false, q3note:'客户可切换',
            q4:false, q4note:'跨赛道映射陷阱(methodologyNotes #6)',
            hits:0, strength:null },
          { name:'长川科技', code:'300604', barrier:'中',
            q1:false, q1note:'传统半导体测试,非光通信',
            q2:false, q2note:'业务体量无源',
            q3:false, q3note:'客户可切换',
            q4:false, q4note:'跨赛道映射陷阱',
            hits:0, strength:null },
          { name:'精测电子', code:'300567', barrier:'中',
            q1:false, q1note:'平板显示测试为主,非光通信',
            q2:false, q2note:'业务体量无源',
            q3:false, q3note:'客户可切换',
            q4:false, q4note:'跨赛道映射陷阱',
            hits:0, strength:null },
          { name:'腾景科技', code:'688195', barrier:'低',
            q1:false, q1note:'光学元件(分路器/波分复用器),非设备',
            q2:false, q2note:'业务体量无源',
            q3:false, q3note:'客户可切换',
            q4:false, q4note:'业务分散',
            hits:0, strength:null }
        ]
      }
    ]
  },

  // ③ 卡口 5 颗个股(2026-06-17 路径 A 升级·与 PCB 黄金范例对齐)
  // 排序:rank 1-5 按 strength + valuation 极值综合排
  // 评级:★★★×2(光库/罗博特科) + ★★☆×3(源杰/赛微/仕佳)
  //   ★ 源杰 strength 从原 ★★★ 降为 ★★☆,因 4 问 q3(替代缺位) 不过——200G EML 国产化率<10%
  //   ★ 仕佳同理,q1(寡头)/q2(产能) 不过——探测器只是国产化非寡头
  //   ★ 这与原 3 颗环节卡口的 ★★★/★★☆/★★★ 不一致,但更精确反映 4 问硬约束
  chokePoints: [
    { rank:1, name:'光库科技', code:'300620', segment:'TFLN 调制器/硅光 PIC', strength:'★★★',
      logic:'<strong>TFLN 调制器国产化领先厂商</strong>(全球市占无第三方口径)。1.6T 硅光模块销售额预计首超整体光模块 50%(LC 数据)。26Q1 净利预告 4,370-4,587 万(+303-323%)(财联社+新浪财双源)。26Q1 实际 4,512 万精准落预告区间。联合英伟达 CPO 路线图。',
      tags:['TFLN 国产化领先','1.6T','CPO','净利+316.2%'],
      valuation: { pe:'PE-TTM 338.31x / 5 年 97.68%', pePercentile:97.68, grossMargin:null, fromHigh:'(2026-06-12)', asOf:'2026-06-12', note:'🟢 <strong>PE 估值极高分位</strong>:PE-TTM 338.31x(2026-06-12)/ 5 年 97.68% 分位(极高分位);TTM 失真警示:early-stage 公司 forward PE 显著低于 TTM,建议 forward PE + 26Q1 实际验证。⚠️ 26Q1 巨潮 PDF 原未命中(DeepSeek 搜到 2025 Q1 1,084 万),需正式季报核', tier:'broker', src:'亿牛网 2026-06 + 东方财富 PE 聚合 + 财联社+新浪财 2026-04-13(预告)' },
      verification: { items:[
        { type:'供给寡头', claim:'TFLN 调制器国产化领先厂商(全球市占无第三方口径)', howToCheck:'光库 2025 年报 + 26Q1 正式财报 + LC TFLN 报告', falsifySignal:'Lumentum/富士通 TFLN 季度出货量超光库 5 倍', status:'pending' },
        { type:'产能',  claim:'1.6T 硅光模块销售额预计首超整体光模块 50%(LC 数据)', howToCheck:'LC 2026 季度报告 + Yole 硅光报告', falsifySignal:'第二家中国硅光代工线投产(赛微外)', status:'pending' },
        { type:'客户',  claim:'26Q1 净利预告+303-323% / 实际 +316.2% 精准兑现', howToCheck:'光库 26Q1 正式财报 + 业绩说明会', falsifySignal:'前 5 大客户合计占比<30% / 客户结构披露稀薄', status:'pending' },
        { type:'技术',  claim:'联合英伟达 CPO 路线图(光库属协作圈)', howToCheck:'罗博特科巨潮公告 + 英伟达 GTC 2026', falsifySignal:'ficonTEC 2025 营收<2 亿(规模有限)', status:'pending' }
      ]}
    },
    { rank:2, name:'源杰科技', code:'688498', segment:'激光器芯片(EML/CW)', strength:'★★☆',
      logic:'<strong>100G EML 已小规模量产</strong>(OFweek + 新浪双源),进入 800G 供应链。<strong>200G EML 仍依赖海外</strong>(国产化率<10%,方法论 4 问 q3 不过)。Lumentum InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%(国盛电子 2026-03-15)。26Q1 营收 3.55 亿(+320.94%)/归母净利 1.79 亿(+1,153.07%)/毛利率 77.81%(+33.17pct 创历史新高,中原+银河双源)。⚠️ 表观利润高增 + 扣非待核 + TTM 失真。',
      tags:['100G EML 量产','200G EML 待破','毛利率 77.81%','净利+1153%'],
      valuation: { pe:'PE-TTM 638.34x / forward 74.62x', pePercentile:null, grossMargin:'77.81%', fromHigh:'(2026-04-27)', asOf:'2026-04-27', note:'🟢 <strong>PE 估值</strong>:PE-TTM 638.34x(2026-04-27,失真)/ 501.93x(2026-03-20)/ <strong>forward 74.62x(可比)</strong>。5 年分位无源(上市<5y)。⚠️ 26Q1 扣非待核(表观+1153% 需扣非质量验证)', tier:'broker', src:'亿牛网 2026-04 + 中原/银河 2026-04 研报(26Q1)' },
      verification: { items:[
        { type:'供给寡头', claim:'Lumentum 100G EML ≈70% / Coherent 200G EML >40% / Broadcom ≈20% 海外 95%+', howToCheck:'LC 季度 + Yole 年度', falsifySignal:'第三家中国厂商 100G EML 月产能超 50 万只', status:'pending' },
        { type:'产能',  claim:'Lumentum InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%', howToCheck:'Lumentum/Coherent 季报 + 国盛电子 2026-03-15', falsifySignal:'Lumentum 200G EML 季度出货量+50% + 第二家中国厂商量产', status:'pending' },
        { type:'财报印证',  claim:'26Q1 营收 3.55 亿(+320.94%)/ 净利 1.79 亿(+1,153.07%)/ 毛利率 77.81%', howToCheck:'源杰 26Q1 季报(中原+银河双源) + 业绩说明会', falsifySignal:'扣非大幅低于表观 / 毛利率从 77% 回落到 50%', status:'pending' },
        { type:'客户',  claim:'100G EML 进入 800G 供应链(具体客户无源)', howToCheck:'源杰 2026 中报 + 招商证券 + 中际旭创供应链披露', falsifySignal:'中际旭创/英伟达明确表示源杰非主供', status:'pending' }
      ]}
    },
    { rank:3, name:'罗博特科', code:'300757', segment:'光耦合设备/硅光 PIC', strength:'★★★',
      logic:'<strong>ficonTEC 100% 控股已确认</strong>(2026-06-16 AASTOCKS 双源),联合英伟达开发 CPO。1.6T + CPO 进入规模商用元年。⚠️ 26Q1 整体仍亏(光伏设备承压,跨板块 G3 陷阱),PE-TTM 负值(亏损)/ 5 年 4.96-7.78% 极低分位(亏损期估值失真)。ficonTEC 单独业务体量 26Q1 无源。',
      tags:['ficonTEC 100% 控股','联合英伟达 CPO','1.6T 设备龙头','PE 极低分位'],
      valuation: { pe:'PE-TTM 负(亏损)/ 5 年 4.96-7.78%', pePercentile:4.96, grossMargin:null, fromHigh:'(2026-06-16)', asOf:'2026-06-16', note:'🟢 <strong>PE 估值</strong>:PE-TTM 负值(亏损)/ 5 年 4.96-7.78% 极低分位(亏损期分位失真);⚠️ <strong>G3 跨板块陷阱</strong>:整体亏损不能映射到 ficonTEC 光通信业务下行(光伏设备承压是主因)', tier:'broker', src:'亿牛网 2026-06 + AASTOCKS 2026-06-16(并表) + 山证通信 2026-05-28(26Q1)' },
      verification: { items:[
        { type:'供给寡头', claim:'ficonTEC 100% 控股(全球光耦合设备龙头之一)', howToCheck:'罗博特科巨潮公告 + 英伟达 GTC 2026', falsifySignal:'ficonTEC 2025 营收<2 亿(规模有限)', status:'pending' },
        { type:'产能',  claim:'1.6T 硅光模块销售额预计首超整体光模块 50%(LC)', howToCheck:'LC 2026 季度报告', falsifySignal:'第二家中国硅光代工线投产', status:'pending' },
        { type:'财报印证',  claim:'26Q1 营收 1.64 亿(+69.33%) / 归母净利-3,882 万(亏损扩大)', howToCheck:'罗博特科 26Q1 季报(山证通信 2026-05-28 单源)', falsifySignal:'26Q1 季报扣非大幅低于表观 / ficonTEC 业务亏损', status:'pending' },
        { type:'客户',  claim:'联合英伟达开发下一代 CPO', howToCheck:'英伟达 GTC 2026 公开演讲 + 招商证券深度', falsifySignal:'英伟达公开供应链未提 ficonTEC', status:'pending' }
      ]}
    },
    { rank:4, name:'赛微电子', code:'300456', segment:'MEMS 代工/硅光 PIC', strength:'★★☆',
      logic:'<strong>全球 MEMS 代工龙头</strong>(Silex 瑞典剥离后业务转型)。1.6T 硅光代工需求增长(TSMC COUPE 主导,赛微有布局)。<strong>26Q1 营收 -62.68%(剥离 Silex 致口径腰斩,≠ 业务崩盘,G4 跨表陷阱)</strong>/ 归母净利-4,909.9 万(由盈转亏)。<strong>PE 20.84x / 5 年 42.23% 分位(同业最低)</strong>。⚠️ 硅光 PIC 代工业务体量/客户/订单仍无源(并表基数错配陷阱)。',
      tags:['MEMS 代工龙头','1.6T 硅光代工','PE 20x 同业最低','并表基数错配'],
      valuation: { pe:'PE-TTM 20.84x / 5 年 42.23%', pePercentile:42.23, grossMargin:null, fromHigh:'(2026-06-16)', asOf:'2026-06-16', note:'🟢 <strong>PE 估值</strong>:PE-TTM 20.84x(2026-06-16)/ 5 年 42.23% 分位(<strong>同业最低</strong>:源杰 638/长华 1713/光库 338/仕佳 162)。⚠️ <strong>并表基数错配</strong>:26Q1 营收-62.68% 是剥离瑞典 Silex 致口径腰斩,≠ 业务崩盘。⚠️ 硅光 PIC 代工业务体量无源', tier:'broker', src:'亿牛网 2026-06 + 公司公告(Silex 剥离)' },
      verification: { items:[
        { type:'供给寡头', claim:'MEMS 代工全球龙头(具体硅光 PIC 份额无源)', howToCheck:'Yole MEMS 代工报告 + 公司年报', falsifySignal:'第二家中国 MEMS 代工线投产(非赛微)', status:'pending' },
        { type:'产能',  claim:'1.6T 硅光代工需求增长(TSMC COUPE 主导)', howToCheck:'LC 2026 + Yole 硅光报告', falsifySignal:'TSMC COUPE 产能扩产 + 第二家中国代工线', status:'pending' },
        { type:'财报印证',  claim:'26Q1 营收 -62.68%(Silex 剥离口径)/ 归母净利-4,909.9 万', howToCheck:'赛微 26Q1 季报 + 业绩说明会', falsifySignal:'Silex 剥离外业务也大幅下滑', status:'pending' },
        { type:'客户',  claim:'硅光 PIC 客户结构无源(待补)', howToCheck:'赛微 2025 年报 + 2026 中报', falsifySignal:'前 5 大客户合计占比<30% / 客户结构披露稀薄', status:'pending' }
      ]}
    },
    { rank:5, name:'仕佳光子', code:'688313', segment:'AWG/高速探测器', strength:'★★☆',
      logic:'<strong>AWG 国产化龙头</strong>(多源印证)。26Q1 营收 5.77 亿(+32.18%)/归母净利 1.16 亿(+24.66%)/毛利率 34.13%(-4.98pct,中原+银河双源)。PE-TTM 162.49x / 5 年 65.45% 分位(中位)。⚠️ 高速 APD 业务体量无源(Hamamatsu/First Sensor/Excelitas 三家寡头格局清晰,精确% 无第三方一手数据,方法论 4 问 q1 不过)。',
      tags:['AWG 国产化龙头','26Q1 净利+24.66%','PE 中位 65.45%','APD 体量无源'],
      valuation: { pe:'PE-TTM 162.49x / 5 年 65.45%', pePercentile:65.45, grossMargin:'34.13%', fromHigh:'(2026-04-26)', asOf:'2026-04-26', note:'🟢 <strong>PE 估值</strong>:PE-TTM 162.49x / 5 年 65.45% 分位(<strong>中位</strong>)。⚠️ 高速 APD 业务体量无源(Hamamatsu 三家寡头格局清晰,精确% 无第三方一手数据)', tier:'broker', src:'亿牛网 2026-04 + 中原/银河 2026-04 研报(26Q1)' },
      verification: { items:[
        { type:'供给寡头', claim:'Hamamatsu/First Sensor/Excelitas 三家寡头格局(精确% 无源)', howToCheck:'Hamamatsu 年报 + 招商证券 + Yole Photonic Sensing 2026', falsifySignal:'Hamamatsu 高速 APD 年出货量超 1000 万只(暗示需求大)', status:'pending' },
        { type:'产能',  claim:'APD 产能无源', howToCheck:'Yole + 招商证券', falsifySignal:'第二家中国厂商 100G APD 流片成功', status:'pending' },
        { type:'财报印证',  claim:'26Q1 营收 5.77 亿(+32.18%)/ 归母净利 1.16 亿(+24.66%)/ 毛利率 34.13%', howToCheck:'仕佳 26Q1 季报(中原+银河双源)', falsifySignal:'扣非大幅低于表观 / 毛利率从 34% 跌到 25%', status:'pending' },
        { type:'客户',  claim:'AWG 国产化龙头(具体客户无源)', howToCheck:'仕佳 2025 年报 + 2026 中报', falsifySignal:'前 5 大客户合计占比<30%', status:'pending' }
      ]}
    }
  ],

  // ④ 供需缺口(注入 2026-06-16)
  supplyGap: [
    { segment:'激光器芯片(EML/CW)', type:'产能缺口', gap:'~25-30%', note:'🟢 ① 命中(G0-2 ②单源存疑 + DeepSeek 第 2 轮 G1-21 升级):Lumentum FY26Q2 InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%(国盛电子 2026-03-15 + 新浪 2026-05-25 同源);1.6T 拉动下产能扩张滞后于需求增长;⚠️ <strong>供给端物理瓶颈陷阱</strong>:200G EML 缺口是 MOCVD 外延生长 + 良率爬坡的物理产能天花板,极难通过短期砸钱扩产弥合(G1-21 DeepSeek 新发现);🔴 <strong>InP 衬底 2026 全球需求 260-300 万片 vs 产能 60-75 万片,缺口 70%+(Yole,G1-21)</strong>(衬底缺口 ≠ 200G EML 缺口,分两层标注)', src:'国盛电子《AI 引爆供需缺口》2026-03-15 + 新浪 2026-05-25 + Yole 2026', asOf:'2026-06-16', tier:'broker' },
    { segment:'高速探测器(APD)',    type:'市占无源', gap:'待核', note:'⚠️ G1-3 全无源:Hamamatsu(滨松)/First Sensor(已被 TE 收购)/Excelitas 三家寡头格局清晰,但精确全球市占无第三方一手数据', src:'无源(待补)', asOf:null, tier:null },
    { segment:'硅光 PIC(代工)',     type:'产能紧', gap:'待核', note:'🆪 1.6T 硅光模块销售额预计首超整体光模块市场 50%(LC 数据,但渗透率精确值无源);硅光代工产能紧(TSMC COUPE 平台主导,A 股赛微有布局但代工业务体量无源)', src:'LC + Yole(渗透率无源)+ 赛微业务体量无源', asOf:null, tier:null }
  ],

  // 方法论备注(DeepSeek 第 2 轮扩展 2026-06-16)
  methodologyNotes: '🆪 本赛道核心方法论:<br>1. 严格区分"全球市占率"与"国产化率"(中国市场自给率),二者不可混淆<br>2. 严格区分"上游光芯片"与"下游光模块/收发器"市场规模(2026E AI 光模块 260 亿美元 ≠ 上游光芯片)<br>3. 卡口评级 ★★★/★★☆ 严格按 ≥2 源命中率 + 1.6T/3.2T 关键节点卡位 + 海外寡头验证<br>4. ⚠️ G3 反向陷阱:罗博特科 26Q1 整体亏损不能映射到 ficonTEC 光通信业务下行(光伏设备承压是主因)<br>5. ⚠️ 财报粉饰陷阱:长光华芯 26Q1 表观扭亏(归母 +159.73%)但扣非续亏 -1,156.8 万,不可挂钩"光芯片业务回暖"<br>6. ⚠️ 跨赛道映射陷阱:华峰/长川/精测是"传统半导体测试设备",不能映射至"光通信测试"子板块<br>7. ⚠️ 绝对化表述陷阱:"国内唯一/首家"等需 ≥2 源支撑,否则降级改写<br>8. ⚠️ 估值工具陷阱:early-stage 公司(长华/源杰/光库)TTM 失真,需切 forward PE 或 PS;光库 5 年 97.68% 极高分位,赛微 5 年 42.23% 中位 — 同业 PE 差异 5-10 倍<br>9. ⚠️ 母子公司倒挂陷阱:永鼎 26Q1 净利 -45.19% 是线缆/投资收益基数,不能映射到子公司鼎芯光电萎缩<br>10. ⚠️ 价值链误导陷阱:InP 衬底国产化 ≠ 200G EML 自主可控(中间还有外延/晶圆制造)<br><br><strong>【DeepSeek 第 2 轮新增 4 个陷阱】</strong><br>11. ⚠️ <strong>巨潮一手陷阱</strong>:DeepSeek 联网搜不到 2026-04 季报 PDF(中际旭创/永鼎),需手工进巨潮"最新公告"栏目筛(可能原因:① 季报尚未上传 ② 搜索关键词不匹配 ③ PDF 抓取权限)<br>12. ⚠️ <strong>巨潮页面口径错配陷阱</strong>:光库/源杰等公司巨潮页面可能显示单月数据(源杰 0.14 亿/0.84 亿 vs 一季报 3.55 亿/1.79 亿),需直接查 PDF 公告而非概要页<br>13. ⚠️ <strong>政策焦点反转陷阱</strong>:本赛道出口管制实际是"中国对 InP 出口管制"(2025-02 实施 + 2026 铟出口锁定年产 30% 以内),不是美国 BIS;市场关注焦点从 BIS 转向中国商务部(美国 BIS 官网直接命中困难,需精确 CFR 条款编号)<br>14. ⚠️ <strong>Cignal AI 口径分裂陷阱</strong>:同一机构出现"500 万只"和"1000 万只"两个数字,需严格区分"出货量/出货金额/端口数量";行业 3000 万只与 Cignal AI 500-1000 万只差异 3-6 倍,需逐机构口径厘清<br><br><strong>【DeepSeek 第 2 轮新发现 4 个】</strong><br>15. 🟢 InP 衬底 CR3 91%(Yole 2020):住友 42% + AXT 36% + JX 13% — 比早期 60%+35% 更精确<br>16. 🟢 200G EML 供给端物理瓶颈:200G EML 缺口 25-30% 不是单纯需求侧拉动,是 MOCVD 外延生长 + 良率爬坡的物理产能天花板<br>17. 🟢 全球 APD 市场 1.42 亿美元(2024) + 前 5 大厂商占 47%(Hamamatsu 等) — 探测器赛道整体规模明确但单厂商市占无源<br>18. 🟢 北美四大 CSP 2026 资本开支指引:Meta +59-87% / Google +91-102% / Amazon +53% / Microsoft "增速高于 2025"(从"放缓"180 度逆转)<br><br><strong>【DeepSeek 第 4 轮 A 块 5 项巨潮一手 + B 块 10 项横向对比(2026-06-17)】</strong><br>19. ⚠️ <strong>软指引陷阱</strong>:Microsoft CFO 在 FY26Q2 电话会给出"全年 Capex 持续增长但增速放缓"定性指引,无精确全年数字;guidance ≠ actual,本轮已严格按"指引vs实际"标注,推算部分标 🆪<br>20. ⚠️ <strong>单厂商市占核实困难</strong>:Hamamatsu Photonics 自身不披露市占,权威第三方报告(Yole)完整版需付费,公开渠道仅能获取 🔵 券商"估算/引用"的碎片化信息,无法形成≥2源交叉验证;本轮仅验证其业务体量(FY25 光电子 2,012 亿日元)<br>21. ⚠️ <strong>母子公司倒挂陷阱</strong>:永鼎股份 26Q1 归母净利 -45.19% 来自上期同一控制下企业合并非经常性收益 2.4 亿(本期无此事项)+ 光棒电缆毛利率受铜价波动下滑,与光芯片子公司鼎芯光电业务无关;鼎芯光电 26Q1 营收 1.12 亿 >2025 全年,EML+CW 激光器月均 50 万只(完全相反方向)<br>22. ⚠️ <strong>业绩预告兑现核实</strong>:光库科技 26Q1 预告归母净利 4,370-4,587 万 → 实际 4,512 万(+316.2%),精准落在区间内,误差<3%;验证预告纪律:预告未经审计,以正式季报为准;若预告区间与实际偏离>20% 需重新评估公司预告机制可信度<br>23. ⚠️ <strong>跨赛道映射陷阱(深化)</strong>:中际旭创 26Q1 预付款 23.11 亿(+358.2%)是典型的"锁单保供"行为,对应光芯片/电芯片的产能保证金,与 PCB 赛道投资通信测试设备在商业逻辑和会计科目上完全不同;不可线性映射<br><br><strong>【路径 A 升级(2026-06-17)· 4 问/卡口双轨打通】</strong><br>24. ⚠️ <strong>4 问是卡口的硬约束</strong>:源杰/仕佳 strength 从原 ★★★ 降为 ★★☆,因 4 问中 q3(替代缺位)/q1(寡头) 未完全过——这是方法论的预期结果(单一票 4 问不全过 ≠ 不值得跟踪,而是卡位强度不极致)。<strong>单票 4 问全过 = ★★★(光库/罗博特科)/ 3 过 = ★★☆(源杰)/ 2 过 = null(仕佳/赛微)</strong><br>25. ⚠️ <strong>4 问与卡口双视图必须打通</strong>:本赛道 5 段四问(激光器/探测器/硅光 PIC/调制/反向-设备)= 5 颗个股卡口(光库/源杰/罗博特科/赛微/仕佳),每段 stocks[] 与卡口[] 交叉引用,用户可在 4 问视图看"哪只票过几问" → 卡口视图直接看"那只是 ★★★/★★☆"。反向段(设备)显式标 <code>choke: false</code> 是方法论预期结果,占位 = 显式标"不构成卡口",与 PCB 制造段对齐'
};

})(window.CHAINS);
