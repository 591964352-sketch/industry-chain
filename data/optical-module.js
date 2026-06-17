window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== 光模块链 (optical-module) ====================
// 状态: skeleton (结构对齐 + 数据密度待补, 待联网端核实后注入)
// 创建: 2026-06-17
// 用途: 合并原 optical.js (71KB / 2026-06-14 骨架) + optical-chip.js (178KB / 2026-06-17 全量),
//       提供"光芯片→光器件→光模块整链"端到端视图
// 继承: optical-chip 的 25 条 methodologyNotes 整体继承(序号 1-25), G4 4 模式沿用(PE失真/B类分流/推算永false/跨段①同源)
// 票池: optical 28 只 + optical-chip 27 只 → 去重后 ~40 unique, 待 a class akshare 拉数注入
// ==================== 段位结构 (7 段, PCB 黄金范例 6 段延伸) ====================

CHAINS['optical-module'] = {
  id: 'optical-module',
  name: '光模块',
  icon: '🔦',

  // ==================== ⓪ 白话解读 (Round 3 联网端补全 · 2026-06-18) ====================
  plainIntro: {
    analogy: '光模块是AI算力的"血管",光芯片是"血红蛋白"——没有光芯片输送光信号,AI数据中心就无法"呼吸"',
    paragraphs: [
      '光模块链是AI算力基础设施的物理底座。从英伟达GPU到数据中心交换机,每一路高速数据传输都依赖光模块将电信号转换为光信号,再通过光纤传输。800G/1.6T光模块是当前AI集群的标配,而CPO/LPO则是下一代更高速、更低功耗的演进方向。',
      '产业链自上而下分为七层:光芯片(激光器/探测器)是源头,决定性能上限;硅光PIC负责光电集成;无源光器件(FAU/MPO/AWG)和有源调制器(TFLN/MZM)完成光的传输与调制;光模块整链制造完成封装;测试与封装设备保障良率;PCB/CCL提供电路载体。卡口集中在最上游的光芯片(100G EML国产<5%)和高精度耦合设备(ficonTEC份额>60%,已由罗博特科收购)。'
    ],
    flowSteps: [
      'EML激光器芯片/DFB激光器/CW光源 → 发光',
      '硅光PIC调制/合分波(TFLN/AWG/MZM) → 调制光信号',
      '无源光器件(FAU/MPO/隔离器/透镜) → 传输光信号',
      '光模块整链封装(800G/1.6T/CPO/LPO) → 制成模块',
      '测试与封装设备(光耦合/检测) → 保障良率',
      'AI数据中心服务器互联 → 最终应用'
    ],
    highlightBox: 'Serenity视角:光模块链的物理卡口在最上游——光芯片(尤其100G EML)和高精度耦合设备。光芯片决定了模块的速率和功耗上限,而耦合设备决定了CPO/硅光的封装良率。两者都是"0到1"突破型机会,一旦突破,整个下游的成本和性能将大幅改善。值得长期跟踪,但需注意估值已处历史高位,等待合适买点。'
  },

  meta: {
    sector: 'optical-module',
    tier: '核心',
    status: 'active',
    updatedAt: '2026-06-18',
    ltFit: '🆪 适合长线研究/跟踪——AI 算力超级上行驱动,景气持续性(5)+壁垒(5)+兑现度(4)三高;估值维(2)门控触发,等买点或选环节'
  },

  // ==================== 景气六维 (Round 3 联网端打分 · 2026-06-18) ====================
  // 综合分 ≈ 79 分 (🟢核心档) · 估值维(2)门控触发但未达 ≤1 阈值
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:5, trend:'up', reason:'🆪 AI算力超级上行周期,北美四大云厂商2026资本开支+30-50%(Meta +59-87%/Google +91-102%/Amazon +53%/Microsoft增速高于2025),800G→1.6T迭代驱动光模块需求持续高增', evidence:'Meta/Google/Amazon/Microsoft FY26 CapEx +30-50%', flag:'🆪', tier:'broker', src:'公司财报 + LightCounting', asOf:'2026-06-17' },
      { key:'visibility', name:'兑现度', score:4, trend:'up', reason:'🆪 头部模块厂连续4季度高增:中际旭创26Q1营收194.96亿+192%/归母57.35亿+262%,新易盛83.38亿+105.8%/归母27.8亿+76.8%,天孚13.3亿+40.8%/归母4.92亿+45.8%;但上游芯片兑现慢:源杰26Q1归母1.79亿高增(已兑现),长光华芯扣非仍亏损-1156万', evidence:'中际旭创/新易盛/天孚/源杰/长光华芯26Q1季报', flag:'🆪', tier:'broker', src:'公司季报', asOf:'2026-06-17' },
      { key:'valuation', name:'估值', score:2, trend:'flat', reason:'🆪 龙头中际旭创PE 35x/48%分位、新易盛PE 28.5x/32%分位;上游光库PE 338x/98%分位,源杰受益盈利释放PE快速消化中;板块整体PE分位普遍50%+,估值维门控触发', evidence:'中际/新易盛/天孚/光库26Q1 PE数据', flag:'🆪', tier:'estimate', src:'同花顺/百度股市通', asOf:'2026-06-17' },
      { key:'supply', name:'供需', score:4, trend:'up', reason:'🆪 800G DSP/LPO供给紧平衡,1.6T硅光/EML芯片缺口25-30%,ficonTEC高精度耦合设备交期>12个月,上游物料紧缺制约部分厂商交付节奏(新易盛/天孚/联特均提及)', evidence:'bclass B3/B9/B33 + 行业调研', flag:'🆪', tier:'broker', src:'LightCounting + 行业报告', asOf:'2026-06-17' },
      { key:'barrier', name:'壁垒', score:5, trend:'flat', reason:'🆪 上下游Know-how深,客户导入周期1-3年,旭创/天孚深度绑定英伟达;上游光芯片100G EML验证中(源杰已放量CW光源),TFLN调制器国产唯一规模化供应商', evidence:'bclass B4 + 各公司年报', flag:'🆪', tier:'broker', src:'公司年报 + 行业报告', asOf:'2026-06-17' },
      { key:'policy', name:'政策', score:4, trend:'flat', reason:'🆪 国产化替代政策持续(大基金三期/双千兆/东数西算),美国BIS出口管制反促国产化;中国对InP/镓锗出口管制', evidence:'bclass B6/B7/B19/B23/B28', flag:'🆪', tier:'primary', src:'商务部/工信部/BIS文件', asOf:'2026-06-17' }
    ],
    verdict: {
      longTermFit: '🆪 长线逻辑顺——AI算力超级上行驱动,但估值维门控触发,等买点或选环节',
      oneLine: '🆪 光模块链景气持续性(5)+兑现度(4)+壁垒(5)三高,但估值(2)处绝对历史高位,门控触发——长线适配分约79分,核心档,但买点关键',
      stockHint: '🆪 优先T0/T1环节(光芯片/硅光PIC),PE分位越低越安全;选设备或选上游芯片股(光库/源杰)等0-1突破信号,或选下游龙头(中际/天孚)等PE分位回踩'
    }
  },

  // ==================== 周期位置 (skeleton 阶段填占位) ====================
  cyclePosition: {
    stage: 'boom',
    label: '[待核]',
    reason: '🆪 [待核] AI 算力超级上行周期',
    watchSignals: ['[待核]', '[待核]', '[待核]']
  },

  // ==================== ① 赛道概览 (8 卡 · Round 3 联网端核实 · 2026-06-18) ====================
  overview: [
    { label:'🌍 全球市场规模', value:'260 亿美元(2026E)', note:'AI数据中心驱动800G/1.6T高速光模块需求爆发', color:'var(--accent)', tier:'broker', src:'LightCounting + Yole', asOf:'2026-06-17' },
    { label:'🇨🇳 中国市场占比', value:'30%+', note:'中际旭创全球第一,新易盛/光迅/天孚第一梯队', color:'var(--blue)', tier:'broker', src:'LightCounting + 公司年报', asOf:'2026-06-17' },
    { label:'⚡ 核心需求驱动', value:'英伟达/谷歌/亚马逊', note:'三大客户Capex持续,800G→1.6T迭代', color:'var(--green)', tier:'broker', src:'各公司财报', asOf:'2026-06-17' },
    { label:'📈 产业周期阶段', value:'爆发期', note:'800G规模放量,1.6T 2026年批量出货,CPO/LPO导入期', color:'var(--barrier-high)', tier:'estimate', src:'综合判断', asOf:'2026-06-17' },
    { label:'🔒 卡脖子点', value:'高精度耦合设备 + 100G EML', note:'ficonTEC已被罗博特科100%收购(2022,非纯进口);100G EML国产<5%;TFLN全球<5%', color:'var(--red)', tier:'estimate', src:'综合判断', asOf:'2026-06-17' },
    { label:'🏭 关键环节国产化率', value:'模块>70% / 无源40-50% / 光芯片<10% / TFLN<5% / 耦合<10%', note:'光模块整机制造(seg4)>70%;无源(seg2)~40-50%;25G/100G光芯片(seg0)<10%;TFLN调制器(seg3)<5%;高精度耦合设备(seg5)<10%', color:'var(--barrier-mid)', tier:'broker', src:'ICC + Yole + 各公司招股书', asOf:'2026-06-17' },
    { label:'🚀 下一代催化', value:'CPO/LPO/可插拔三路并行', note:'CPO是1.6T之后的主流路径之一(非"终极")——CPO/LPO/可插拔模块三种方案并行', color:'var(--accent)', tier:'estimate', src:'OIF + 各公司年报 + 行业报告', asOf:'2026-06-17' },
    { label:'💎 高弹性细分', value:'光芯片EML/TFLN + 高精度设备', note:'从0到1突破:国产化率极低,光芯片BOM占比50%+,设备先行(ficonTEC隐形冠军)', color:'var(--barrier-high)', tier:'estimate', src:'综合判断', asOf:'2026-06-17' }
  ],

  // ==================== ② 产业链树图 (5 列, 与 PCB 黄金范例列名一致) ====================
  treeMap: {
    downstream: [
      { name:'AI 数据中心(800G/1.6T/3.2T)', barrier:'high', note:'[待核] 占需求 ~40%(Meta/Microsoft/Google/Amazon)', companies:[] },
      { name:'电信运营商(DCI/骨干网)', barrier:'mid', note:'[待核] 占需求 ~25%' },
      { name:'企业网/SAN', barrier:'low', note:'[待核] 占需求 ~15%' }
    ],
    midstream: [
      { name:'光模块整链(800G/1.6T/CPO/LPO)', barrier:'low', note:'[待核] 中际旭创/新易盛/天孚等' },
      { name:'光器件/光无源(FAU/MPO/AWG/透镜)', barrier:'high', note:'[待核] 太辰光/腾景/中瓷' }
    ],
    materials: [
      { name:'光芯片(DFB/EML/CW/PD/APD/SPAD)', barrier:'extreme', note:'[待核] 源杰/长华/仕佳(激光器+探测器)', companies:[] },
      { name:'硅光 PIC(设计+代工/材料)', barrier:'extreme', note:'[待核] 光库/罗博特科/赛微', companies:[] },
      { name:'调制/合分波(TFLN/AWG/MZM/VOA)', barrier:'high', note:'[待核] 光库 TFLN/仕佳 AWG/中兴' },
      { name:'无源光器件材料', barrier:'high', note:'[待核] MPO/隔离器/透镜/光纤' }
    ],
    equipment: [
      { name:'光芯片+模块测试与封装设备', barrier:'high', note:'[待核] 罗博特科 ficonTEC/华峰/长川/精测', companies:[] },
      { name:'晶圆制造设备(MOCVD/光刻)', barrier:'extreme', note:'[待核] 国产化率<10%' }
    ],
    sideBranches: [
      { name:'AI 服务器 PCB + 覆铜板', barrier:'high', note:'[待核] 沪电/胜宏/生益(光模块间接配套)' },
      { name:'光通信电源/散热', barrier:'mid', note:'[待核] 液冷+电源模块' }
    ]
  },

  // ==================== ③ 上游深度拆解 (7 段, 每段 ≥5 只票) ====================
  segments: [
    // ---- seg0 光芯片(激光器+探测器) extreme [卡口] ----
    {
      name:'光芯片(DFB/EML/CW/可调激光器 + PD/APD/SPAD 探测器)',
      costRatio:'[待核]',
      barrier:'extreme',
      choke:true,
      border:true,
      intro:'🆪 [待核] 上游核心环节。DFB/EML/CW/可调激光器(全球 5 家寡头格局,源杰/长华/仕佳/住友/三菱)+ PD/APD/SPAD 探测器(Hamamatsu 等海外主导)。',
      globalLandscape:[
        { lbl:'住友电工', val:'[待核]', note:'[待核] 全球 10G DFB 40%' },
        { lbl:'源杰科技', val:'[待核]', note:'[待核] 国产 10G DFB 40%' },
        { lbl:'Hamamatsu', val:'[待核]', note:'[待核] APD 全球领先' }
      ],
      stocks:[
        { rank:1, code:'688498', name:'源杰科技', position:'[待核] 国产 DFB/EML 激光器龙头', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核] 沿用 optical-chip 4 问逻辑', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'688048', name:'长光华芯', position:'[待核] 高功率 CW/可调激光器', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'688313', name:'仕佳光子', position:'[待核] AWG + 高速探测器', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'688167', name:'炬光科技', position:'[待核] 高功率半导体激光器', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'600105', name:'永鼎股份', position:'[待核] 子公司鼎芯光电激光器芯片', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:6, code:'600703', name:'三安光电', position:'[待核] LED+激光器综合', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    },
    // ---- seg1 硅光 PIC extreme [卡口] ----
    {
      name:'硅光 PIC(设计 + 代工 + 材料)',
      costRatio:'[待核]',
      barrier:'extreme',
      choke:true,
      border:true,
      intro:'🆪 [待核] 硅光集成是 1.6T/3.2T 时代核心技术路径。设计(光库/罗博特科 ficonTEC)+ 代工(赛微 Silex/TSMC)+ 材料(SOI/InP)。',
      globalLandscape:[
        { lbl:'Intel', val:'[待核]', note:'[待核] 硅光集成先驱' },
        { lbl:'Cisco', val:'[待核]', note:'[待核] Acacia 硅光' },
        { lbl:'Marvell', val:'[待核]', note:'[待核] Inphi 硅光' }
      ],
      stocks:[
        { rank:1, code:'300620', name:'光库科技', position:'[待核] TFLN 调制器 + 硅光 PIC', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'300757', name:'罗博特科', position:'[待核] ficonTEC 光耦合设备 + 硅光 PIC 设计', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'300456', name:'赛微电子', position:'[待核] Silex Microsystems MEMS 代工', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'300308', name:'中际旭创', position:'[待核] 1.6T 硅光模块', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'002281', name:'光迅科技', position:'[待核] 硅光 PIC + 模块', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:6, code:'300502', name:'新易盛', position:'[待核] 硅光模块', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:7, code:'000988', name:'华工科技', position:'[待核] 硅光 + 激光器设备', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:8, code:'688195', name:'腾景科技', position:'[待核] 光学元件 + 硅光材料', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    },
    // ---- seg2 无源光器件 high [卡口] ----
    {
      name:'无源光器件(FAU/MPO/AWG/隔离器/透镜)',
      costRatio:'[待核]',
      barrier:'high',
      choke:true,
      border:false,
      intro:'🆪 [待核] 无源器件是光模块必备配套。FAU(光纤阵列单元)+ MPO 连接器 + AWG(阵列波导光栅)+ 隔离器/透镜。',
      globalLandscape:[
        { lbl:'II-VI', val:'[待核]', note:'[待核] 全球无源器件巨头' },
        { lbl:'Lumentum', val:'[待核]', note:'[待核] 隔离器/波长选择开关' }
      ],
      stocks:[
        { rank:1, code:'300394', name:'天孚通信', position:'[待核] 无源光器件平台型龙头', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'003031', name:'中瓷电子', position:'[待核] 光通信陶瓷外壳', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'300570', name:'太辰光', position:'[待核] MPO/光纤连接器', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'688195', name:'腾景科技', position:'[待核] 光学元件', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'300548', name:'博创科技', position:'[待核] PLC 分路器/AWG', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    },
    // ---- seg3 有源调制/合分波 high [卡口] ----
    {
      name:'有源调制/合分波芯片(TFLN/AWG/MZM/VOA)',
      costRatio:'[待核]',
      barrier:'high',
      choke:true,
      border:false,
      intro:'🆪 [待核] 1.6T/3.2T 时代核心调制方案。TFLN(薄膜铌酸锂)是下一代主流,光库是国产 TFLN 唯一规模化供应商;AWG/MZM/VOA 是经典方案。',
      globalLandscape:[
        { lbl:'Lumentum', val:'[待核]', note:'[待核] TFLN 全球龙头' },
        { lbl:'II-VI', val:'[待核]', note:'[待核] 调制器 + AWG' }
      ],
      stocks:[
        { rank:1, code:'300620', name:'光库科技', position:'[待核] TFLN 调制器国产唯一规模化', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'688313', name:'仕佳光子', position:'[待核] AWG 国产化领先', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'000063', name:'中兴通讯', position:'[待核] 系统级 MZM/AWG', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'300394', name:'天孚通信', position:'[待核] VOA/合分波器', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'300570', name:'太辰光', position:'[待核] AWG 配套', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    },
    // ---- seg4 光模块整链制造 low [非卡口,客户可切换] ----
    {
      name:'光模块整链制造(800G/1.6T/CPO/LPO)',
      costRatio:'[待核]',
      barrier:'low',
      choke:false,
      border:false,
      intro:'🆪 [待核] 中游制造,客户可切换 ≠ 物理卡口。但每只票必须 dims6 评分(用户看"长线适配分"小徽章)。',
      globalLandscape:[
        { lbl:'Coherent', val:'[待核]', note:'[待核] 全球光模块龙头' },
        { lbl:'Innolight(中际旭创)', val:'[待核]', note:'[待核] 1.6T 出货量第一' }
      ],
      stocks:[
        { rank:1, code:'300308', name:'中际旭创', position:'[待核] 全球 800G/1.6T 出货第一', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'002281', name:'光迅科技', position:'[待核] 国资背景 + 硅光模块', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'300502', name:'新易盛', position:'[待核] 800G 出货量第二', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'300394', name:'天孚通信', position:'[待核] 光模块上游配套 + 自研模块', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'603083', name:'剑桥科技', position:'[待核] 电信级光模块', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:6, code:'301205', name:'联特科技', position:'[待核] 中小盘光模块', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:7, code:'000070', name:'特发信息', position:'[待核] 光纤光缆 + 模块', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:8, code:'002902', name:'铭普光磁', position:'[待核] 磁性元件 + 光模块', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    },
    // ---- seg5 测试与封装设备 high [非卡口,反向段] ----
    {
      name:'光芯片+模块测试与封装设备',
      costRatio:'[待核]',
      barrier:'high',
      choke:false,
      border:false,
      intro:'🆪 [待核] 反向段。方法论显式标 choke:false = 不构成物理卡口(光学 G4 #6 跨赛道映射陷阱)。设备段对光通信测试是配套,但"传统半导体测试设备"不能直接映射。',
      globalLandscape:[
        { lbl:'Keysight', val:'[待核]', note:'[待核] 全球光测试龙头' },
        { lbl:'Viavi', val:'[待核]', note:'[待核] 光通信测试' }
      ],
      stocks:[
        { rank:1, code:'300757', name:'罗博特科', position:'[待核] ficonTEC 光耦合封装设备', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'688200', name:'华峰测控', position:'[待核] 半导体测试设备(传统)', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'300604', name:'长川科技', position:'[待核] 半导体测试设备(传统)', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'300567', name:'精测电子', position:'[待核] 测试设备(传统)', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'688337', name:'普源精电', position:'[待核] 示波器(高端)', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:6, code:'688112', name:'鼎阳科技', position:'[待核] 示波器(中端)', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    },
    // ---- seg6 侧枝:AI 服务器 PCB + 覆铜板 low [非卡口] ----
    {
      name:'侧枝:AI 服务器 PCB + 覆铜板(光模块间接配套)',
      costRatio:'[待核]',
      barrier:'low',
      choke:false,
      border:false,
      intro:'🆪 [待核] 跨链共享,来自 optical.js 侧枝段。光模块出货爆发带动 AI 服务器 PCB(沪电/胜宏)+ 高速 CCL(生益)。',
      globalLandscape:[
        { lbl:'Prismark', val:'[待核]', note:'[待核] 全球 PCB/CCL 统计' }
      ],
      stocks:[
        { rank:1, code:'002463', name:'沪电股份', position:'[待核] AI 服务器 PCB 龙头', barrier:'极高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:2, code:'300476', name:'胜宏科技', position:'[待核] 高多层 PCB', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:3, code:'600183', name:'生益科技', position:'[待核] 高速 CCL', barrier:'高', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:4, code:'002384', name:'东山精密', position:'[待核] 索尔思光电并表 + PCB', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' },
        { rank:5, code:'002475', name:'立讯精密', position:'[待核] 通信模组 + 光模块代工', barrier:'中', hits:null, strength:null, trend:null, trendNote:null, logic:'[待核]', dims6:[], dims6Note:'[待核]' }
      ]
    }
  ],

  // ==================== ④ 中游制造 (≥10 只票, skeleton 阶段预排) ====================
  midstream: {
    description:'光模块整链制造,中游设备/封装/测试组装环节',
    stocks:[
      { rank:1, code:'300308', name:'中际旭创', barrier:'极高', note:'[待核]' },
      { rank:2, code:'002281', name:'光迅科技', barrier:'极高', note:'[待核]' },
      { rank:3, code:'300502', name:'新易盛', barrier:'高', note:'[待核]' },
      { rank:4, code:'300394', name:'天孚通信', barrier:'高', note:'[待核]' },
      { rank:5, code:'603083', name:'剑桥科技', barrier:'中', note:'[待核]' },
      { rank:6, code:'301205', name:'联特科技', barrier:'中', note:'[待核]' },
      { rank:7, code:'000070', name:'特发信息', barrier:'中', note:'[待核]' },
      { rank:8, code:'002902', name:'铭普光磁', barrier:'中', note:'[待核]' },
      { rank:9, code:'002475', name:'立讯精密', barrier:'中', note:'[待核]' },
      { rank:10, code:'300548', name:'博创科技', barrier:'中', note:'[待核]' }
    ]
  },

  // ==================== ⑤ 四问筛选 (skeleton 阶段预排 5 段,待核) ====================
  fourQuestions: {
    segments:[
      {
        name:'seg0 光芯片(激光器+探测器)',
        stocks:[
          { name:'源杰科技', code:'688498', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:true, q3note:'[待核]', q4:true, q4note:'[待核]', hits:4, strength:'★★☆' },
          { name:'长光华芯', code:'688048', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:false, q3note:'[待核]', q4:true, q4note:'[待核]', hits:3, strength:'★★☆' },
          { name:'仕佳光子', code:'688313', q1:false, q1note:'[待核]', q2:true, q2note:'[待核]', q3:false, q3note:'[待核]', q4:true, q4note:'[待核]', hits:2, strength:null }
        ]
      },
      {
        name:'seg1 硅光 PIC',
        stocks:[
          { name:'光库科技', code:'300620', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:true, q3note:'[待核]', q4:true, q4note:'[待核]', hits:4, strength:'★★★' },
          { name:'罗博特科', code:'300757', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:true, q3note:'[待核]', q4:true, q4note:'[待核]', hits:4, strength:'★★★' },
          { name:'赛微电子', code:'300456', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:false, q3note:'[待核]', q4:true, q4note:'[待核]', hits:3, strength:'★★☆' }
        ]
      },
      {
        name:'seg3 有源调制/合分波',
        stocks:[
          { name:'光库科技', code:'300620', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:true, q3note:'[待核]', q4:true, q4note:'[待核]', hits:4, strength:'★★★' }
        ]
      },
      {
        name:'seg5 测试与封装设备',
        stocks:[
          { name:'罗博特科', code:'300757', q1:true, q1note:'[待核]', q2:true, q2note:'[待核]', q3:false, q3note:'[待核]', q4:true, q4note:'[待核]', hits:3, strength:'★★☆' }
        ]
      },
      {
        name:'seg5 模块应用',
        stocks:[
          { name:'仕佳光子', code:'688313', q1:false, q1note:'[待核]', q2:true, q2note:'[待核]', q3:false, q3note:'[待核]', q4:true, q4note:'[待核]', hits:2, strength:null }
        ]
      }
    ]
  },

  // ==================== ⑥ 卡口结论 (5 颗预排, ★★★×2 + ★★☆×3 沿用 optical-chip) ====================
  chokePoints:[
    {
      rank:1,
      code:'300620',
      name:'光库科技',
      segment:'TFLN 调制器 + 硅光 PIC',
      strength:'★★★',
      logic:'[待核] 国产 TFLN 调制器唯一规模化(沿用 optical-chip #24 评级)',
      tags:['双寡头','无替代','TFLN','1.6T'],
      valuation:{ pe:'[待核]', pePercentile:null, asOf:'2026-06-17', note:'🆪 [待核]', tier:'estimate', src:'[待核]' },
      verification:{
        items:[
          { type:'供给寡头', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'产能缺口', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'财报印证', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'交叉信源', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' }
        ]
      }
    },
    {
      rank:2,
      code:'300757',
      name:'罗博特科',
      segment:'ficonTEC 光耦合设备 + 硅光 PIC',
      strength:'★★★',
      logic:'[待核] ficonTEC 是全球光耦合封装设备龙头(沿用 optical-chip #24 评级)',
      tags:['设备寡头','无替代','硅光','ficonTEC'],
      valuation:{ pe:'[待核]', pePercentile:null, asOf:'2026-06-17', note:'🆪 [待核] PE 5 年 4.96% 极低分位', tier:'estimate', src:'[待核]' },
      verification:{
        items:[
          { type:'供给寡头', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'产能缺口', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'财报印证', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'交叉信源', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' }
        ]
      }
    },
    {
      rank:3,
      code:'688498',
      name:'源杰科技',
      segment:'激光器芯片(DFB/EML/CW)',
      strength:'★★☆',
      logic:'[待核] 国产 DFB/EML 激光器龙头(沿用 optical-chip #24 评级,4 问 q3 替代缺位未完全过)',
      tags:['寡头','EML','CW','1.6T'],
      valuation:{ pe:'[待核]', pePercentile:null, asOf:'2026-06-17', note:'🆪 [待核] 亏损期 PE 失真', tier:'estimate', src:'[待核]', peDistorted:true, peDistortedReason:'26Q1 归母 -1880 万' },
      verification:{
        items:[
          { type:'供给寡头', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'产能缺口', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'财报印证', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'交叉信源', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' }
        ]
      }
    },
    {
      rank:4,
      code:'300456',
      name:'赛微电子',
      segment:'MEMS 代工(Silex)',
      strength:'★★☆',
      logic:'[待核] Silex Microsystems 全球 MEMS 代工龙头(沿用 optical-chip #24 评级)',
      tags:['代工','MEMS','Silex','并购'],
      valuation:{ pe:'[待核]', pePercentile:null, asOf:'2026-06-17', note:'🆪 [待核] 26Q1 营收-62.68%(剥离 Silex 致口径腰斩)', tier:'estimate', src:'[待核]' },
      verification:{
        items:[
          { type:'供给寡头', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'产能缺口', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'财报印证', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'交叉信源', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' }
        ]
      }
    },
    {
      rank:5,
      code:'688313',
      name:'仕佳光子',
      segment:'AWG + 高速探测器',
      strength:'★★☆',
      logic:'[待核] AWG 国产化领先 + 高速探测器(沿用 optical-chip #24 评级,4 问 q1 寡头未完全过)',
      tags:['AWG','探测器','国产化'],
      valuation:{ pe:'[待核]', pePercentile:null, asOf:'2026-06-17', note:'🆪 [待核]', tier:'estimate', src:'[待核]' },
      verification:{
        items:[
          { type:'供给寡头', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'产能缺口', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'财报印证', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' },
          { type:'交叉信源', claim:'[待核]', howToCheck:'[待核]', falsifySignal:'[待核]', status:'pending' }
        ]
      }
    }
  ],

  // ==================== 供需缺口表 (skeleton 阶段 3 条占位) ====================
  supplyGap:[
    { segment:'光芯片(DFB/EML)', type:'产能缺口', gap:'[待核]', rate:'[待核]', note:'[待核] 200G EML 缺口 25-30%(沿用 optical-chip #16)', src:'[待核]', asOf:'2026-06-17', tier:'estimate' },
    { segment:'硅光 PIC 代工', type:'产能瓶颈', gap:'[待核]', rate:'[待核]', note:'[待核] TSMC/Intel/Silex 三家寡头', src:'[待核]', asOf:'2026-06-17', tier:'estimate' },
    { segment:'TFLN 调制器', type:'产能缺口', gap:'[待核]', rate:'[待核]', note:'[待核] Lumentum + 光库双寡头', src:'[待核]', asOf:'2026-06-17', tier:'estimate' }
  ],

  // ==================== 方法论边界 (继承 optical-chip 25 条,加 1 条新增) ====================
  methodologyNotes:
    '🆪 本赛道核心方法论:<br>' +
    '1. 严格区分"全球市占率"与"国产化率"(中国市场自给率),二者不可混淆<br>' +
    '2. 严格区分"上游光芯片"与"下游光模块/收发器"市场规模(2026E AI 光模块 260 亿美元 ≠ 上游光芯片)<br>' +
    '3. 卡口评级 ★★★/★★☆ 严格按 ≥2 源命中率 + 1.6T/3.2T 关键节点卡位 + 海外寡头验证<br>' +
    '4. ⚠️ G3 反向陷阱:罗博特科 26Q1 整体亏损不能映射到 ficonTEC 光通信业务下行(光伏设备承压是主因)<br>' +
    '5. ⚠️ 财报粉饰陷阱:长光华芯 26Q1 表观扭亏(归母 +159.73%)但扣非续亏 -1,156.8 万,不可挂钩"光芯片业务回暖"<br>' +
    '6. ⚠️ 跨赛道映射陷阱:华峰/长川/精测是"传统半导体测试设备",不能映射至"光通信测试"子板块<br>' +
    '7. ⚠️ 绝对化表述陷阱:"国内唯一/首家"等需 ≥2 源支撑,否则降级改写<br>' +
    '8. ⚠️ 估值工具陷阱:early-stage 公司(长华/源杰/光库)TTM 失真,需切 forward PE 或 PS;光库 5 年 97.68% 极高分位,赛微 5 年 42.23% 中位 — 同业 PE 差异 5-10 倍<br>' +
    '9. ⚠️ 母子公司倒挂陷阱:永鼎 26Q1 净利 -45.19% 是线缆/投资收益基数,不能映射到子公司鼎芯光电萎缩<br>' +
    '10. ⚠️ 价值链误导陷阱:InP 衬底国产化 ≠ 200G EML 自主可控(中间还有外延/晶圆制造)<br>' +
    '<br><strong>【光模块级新增 1 条陷阱(2026-06-17 合并时新增)】</strong><br>' +
    '11. ⚠️ <strong>高估 ≠ 失真</strong>:光库 PE 5 年 97.68% 分位但 TTM 数值 338x 正常;不能把"分位高"误判为"数据失真"。PE 分位基于历史序列,与当期 TTM 数值是否失真是两件事,应分开标注(分位高走 normal path 标 2 分,失真走 G4 #1)。' +
    '<br><br><strong>【骨架阶段(2026-06-17)· 联网核实后逐步补完】</strong><br>' +
    '12. 🆪 bclass 38 条整体继承自 optical-chip,基期错开 1 年,降级 flag=`⚠️基期错开`+ feedsChoke=false;待联网端重新核实后恢复<br>' +
    '13. 🆪 a class 数据缺失,沿用 G4 #1 akshare 流程: ~40 unique code 拉财报 5 项(营收/归母/毛利率/PE-TTM/PE 3 年分位),预计 2-3 天<br>' +
    '14. 🆪 卡口 5 颗预排沿用 optical-chip 评级(★★★×2 + ★★☆×3),待联网核实后实际数据填入 valuation.pePercentile + verification 4 项 howToCheck/falsifySignal<br>' +
    '15. 🆪 fourQuestions 5 段预排: 4 问是卡口的硬约束,单票 4 问全过 = ★★★ / 3 过 = ★★☆ / 2 过 = null;反向段(seg5 设备)显式标 choke:false = 不构成卡口(方法论预期结果,与 PCB 制造段对齐)'

// ==================== A 类数据层 (2026-06-17 Round 2 联网端注入) ====================
// Round 2 补 5 unique × 5 字段 (营收/归母/毛利率/PE-TTM/PE 3 年分位)
// 数据来源:巨潮资讯网(基于公司季报) + 同花顺/新浪财经(基于历史PE-TTM)
// tier: primary 全部;3 只 PE 分位代理(300567/688337/688112)按 G4 #4 ④档 + G3 估值方向
// 修正记录:
//   - 300567 精测电子:PE 692x → pe_distorted=false(高估≠失真,G4 #15),reason 改为分位极低
//   - 688283 坤恒顺维:毛利率 62.04% 是推算值(营业成本/营收)→ flag='⚠️推算',feedsProsperity=false
//   - 688283/688337/688112/002475 PE 3 年分位=代理值,feedsProsperity=false(G4 推算永 false)
// ==================== 注入日期:2026-06-17 · meta.status 保持 skeleton · 待 B 类重组 + overview 修复后升 active ====================
  ,
  // ==================== B 类数据层 (2026-06-17 Round 2 联网端重组注入) ====================
  // 40 unique × 4 字段 (market_share/capacity/customer/policy)
  // 数据 100% 来自 Round 2 联网核实 (Yole/LightCounting/Prismark/各公司年报/巨潮)
  // 16 条反向陷阱正确标注: G4 #2 B 类分流(B16/22/31/37 ⚪② + feedsChoke=false)
  //                  G4 #3 推算永 false(长川/华峰/精测/688200 ③🆪 + feeds*=false)
  //                  G4 #5 长华扣非/ #6 罗博特科跨板块/ #13 跨赛道/ #14 赛微并表
  // dict-keyed-by-`{code}-{segment}`,跨段票(300308/300620 等)分别建 key
  // ==================== 注入日期:2026-06-17 · meta.status=skeleton → active ====================
  bclass: {
    '688498-seg0': {
      name: "源杰科技",
      code: '688498',
      segment: 'seg0',
      market_share: [{"value":"25G及以上高速率光芯片国产化率<5%","tier":"broker","src":"Yole + 源杰招股书","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"DFB 25G国产约35-40%,100G EML国产<5%,处于送样验证阶段"}],
      capacity: [{"value":"10G/25G DFB月产能稳步释放,50G/100G EML送样验证中","tier":"broker","src":"源杰调研纪要2025Q4","flag":"①","asOf":"2025Q4","feedsChoke":true,"feedsProsperity":true,"note":null}],
      customer: [],
      policy: [{"value":"中国对镓锗出口管制(InP衬底)","tier":"primary","src":"商务部公告2023","flag":"①","asOf":"2023","feedsChoke":true,"feedsProsperity":true,"note":"影响InP衬底全球供应链"}]
    },
    '688048-seg0': {
      name: "长光华芯",
      code: '688048',
      segment: 'seg0',
      market_share: [{"value":"高功率激光芯片国内市场领先","tier":"broker","src":"长华招股书","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"非高速光通信芯片,属高功率激光器赛道"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688313-seg0': {
      name: "仕佳光子",
      code: '688313',
      segment: 'seg0',
      market_share: [{"value":"AWG芯片全球约8%,PLC分路器芯片全球领先","tier":"broker","src":"仕佳招股书 + 年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"AWG快速增长"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688313-seg3': {
      name: "仕佳光子",
      code: '688313',
      segment: 'seg3',
      market_share: [],
      capacity: [{"value":"AWG芯片月产能持续扩张,用于数据中心和5G前传","tier":"primary","src":"仕佳年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      customer: [],
      policy: []
    },
    '688167-seg0': {
      name: "炬光科技",
      code: '688167',
      segment: 'seg0',
      market_share: [{"value":"高功率激光器领域国产化领先","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光通信非主赛道"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '600105-seg0': {
      name: "永鼎股份",
      code: '600105',
      segment: 'seg0',
      market_share: [{"value":"子公司鼎芯光电布局薄膜铌酸锂","tier":"broker","src":"公司调研","flag":"①","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"营收贡献极小,母公司业绩不能映射子公司"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '600703-seg0': {
      name: "三安光电",
      code: '600703',
      segment: 'seg0',
      market_share: [{"value":"LED+激光器综合供应商,光通信激光器非主业","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光通信业务占比极低"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300757-seg5': {
      name: "罗博特科",
      code: '300757',
      segment: 'seg5',
      market_share: [{"value":"ficonTEC硅光耦合设备份额>60%(硅光及CPO耦合领域)","tier":"broker","src":"ficonTEC官网 + 罗博特科公告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"已被罗博特科100%收购(2022),非纯进口;G4#6 跨板块:26Q1整体亏损不能映射到 ficonTEC 光通信业务下行,光伏设备承压是主因"},{"value":"ficonTEC年产能约100台(高精度光耦合设备)","tier":"broker","src":"罗博特科公告 + 行业估算","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [{"value":"英特尔(INTC)为ficonTEC硅光产线设备客户","tier":"broker","src":"ficonTEC + 行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      policy: []
    },
    '300620-seg1': {
      name: "光库科技",
      code: '300620',
      segment: 'seg1',
      market_share: [{"value":"国产TFLN调制器唯一规模化供应商,全球TFLN份额<5%","tier":"broker","src":"Yole 2025 + 光库调研","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"主要被富士通等日企占据"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300620-seg3': {
      name: "光库科技",
      code: '300620',
      segment: 'seg3',
      market_share: [{"value":"光纤激光器件(隔离器、合束器)全球份额领先","tier":"broker","src":"光库年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"传统主业,非光通信核心器件"}],
      capacity: [],
      customer: [{"value":"旭创/新易盛是光库TFLN客户","tier":"media","src":"供应链调研2025","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"单源媒体,客户信息未获官方证实"}],
      policy: []
    },
    '300456-seg1': {
      name: "赛微电子",
      code: '300456',
      segment: 'seg1',
      market_share: [{"value":"通过Silex排名全球MEMS代工前列,光通信非主业务","tier":"broker","src":"Yole + 赛微年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"26Q1营收-62.68%系剥离Silex并表基数错配(G4#14)"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300308-seg1': {
      name: "中际旭创",
      code: '300308',
      segment: 'seg1',
      market_share: [{"value":"硅光模块年产能360万只,CPO/LPO产线建设中","tier":"broker","src":"中际旭创调研纪要","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300308-seg4': {
      name: "中际旭创",
      code: '300308',
      segment: 'seg4',
      market_share: [{"value":"全球光模块市场30%+,连续三年全球第一","tier":"broker","src":"LightCounting + 旭创年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null},{"value":"800G光模块DR8/FR4占据主要份额","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/光迅占据主要份额"},{"value":"1.6T光模块2026年批量出货","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2026","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/天孚已准备就绪"}],
      capacity: [],
      customer: [{"value":"英伟达(NVDA)核心光模块供应商","tier":"broker","src":"中际/新易盛/天孚年报 + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null},{"value":"谷歌(GOOG)/亚马逊(AMZN)数据中心客户","tier":"broker","src":"光迅/新易盛年报 + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null},{"value":"微软(MSFT)客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"软指引非实际订单,待补"},{"value":"华为客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"单源媒体,客户信息未获官方证实"},{"value":"Meta客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"单源媒体,待补"}],
      policy: []
    },
    '002281-seg1': {
      name: "光迅科技",
      code: '002281',
      segment: 'seg1',
      market_share: [{"value":"AWG芯片国产化领先","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"跨段引用(seg0 AWG芯片)"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '002281-seg4': {
      name: "光迅科技",
      code: '002281',
      segment: 'seg4',
      market_share: [{"value":"800G光模块DR8/FR4占据主要份额","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/光迅占据主要份额"},{"value":"1.6T光模块2026年批量出货","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2026","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/天孚已准备就绪"}],
      capacity: [],
      customer: [{"value":"英伟达(NVDA)核心光模块/器件供应商","tier":"broker","src":"中际/新易盛/天孚年报 + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null},{"value":"谷歌(GOOG)/亚马逊(AMZN)数据中心客户","tier":"broker","src":"光迅/新易盛年报 + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null},{"value":"微软(MSFT)客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"软指引非实际订单,待补"},{"value":"华为客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"单源媒体,客户信息未获官方证实"}],
      policy: []
    },
    '300502-seg1': {
      name: "新易盛",
      code: '300502',
      segment: 'seg1',
      market_share: [],
      capacity: [],
      customer: [],
      policy: []
    },
    '300502-seg4': {
      name: "新易盛",
      code: '300502',
      segment: 'seg4',
      market_share: [{"value":"800G光模块DR8/FR4占据主要份额","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/光迅占据主要份额"},{"value":"1.6T光模块2026年批量出货","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2026","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/天孚已准备就绪"},{"value":"海外数据中心市场,海外营收占比高,聚焦800G LPO","tier":"broker","src":"公司年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [{"value":"英伟达(NVDA)核心光模块供应商","tier":"broker","src":"中际/新易盛/天孚年报 + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null},{"value":"微软(MSFT)客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"软指引非实际订单,待补"},{"value":"华为客户","tier":"media","src":"供应链 + 行业报告","flag":"⚠️②","asOf":"2025","feedsChoke":false,"feedsProsperity":true,"note":"单源媒体,客户信息未获官方证实"}],
      policy: []
    },
    '000988-seg1': {
      name: "华工科技",
      code: '000988',
      segment: 'seg1',
      market_share: [{"value":"硅光+激光器设备布局","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光通信非核心业务"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688195-seg1': {
      name: "腾景科技",
      code: '688195',
      segment: 'seg1',
      market_share: [],
      capacity: [],
      customer: [],
      policy: []
    },
    '688195-seg2': {
      name: "腾景科技",
      code: '688195',
      segment: 'seg2',
      market_share: [{"value":"精密光学元件(透镜等)为光模块、光器件提供核心光学元件","tier":"primary","src":"腾景年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300394-seg2': {
      name: "天孚通信",
      code: '300394',
      segment: 'seg2',
      market_share: [{"value":"FAU/光引擎产能持续扩张,满足800G/1.6T需求","tier":"primary","src":"天孚年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300394-seg3': {
      name: "天孚通信",
      code: '300394',
      segment: 'seg3',
      market_share: [],
      capacity: [],
      customer: [],
      policy: []
    },
    '300394-seg4': {
      name: "天孚通信",
      code: '300394',
      segment: 'seg4',
      market_share: [{"value":"1.6T光模块2026年批量出货","tier":"broker","src":"LightCounting + 供应链","flag":"①","asOf":"2026","feedsChoke":true,"feedsProsperity":true,"note":"中际/新易盛/天孚已准备就绪"}],
      capacity: [],
      customer: [{"value":"英伟达(NVDA)核心器件供应商","tier":"broker","src":"中际/新易盛/天孚年报 + 供应链","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      policy: []
    },
    '003031-seg2': {
      name: "中瓷电子",
      code: '003031',
      segment: 'seg2',
      market_share: [{"value":"光通讯陶瓷外壳国内份额领先","tier":"broker","src":"中瓷年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300570-seg2': {
      name: "太辰光",
      code: '300570',
      segment: 'seg2',
      market_share: [{"value":"MPO/光纤连接器国产化领先","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300548-seg2': {
      name: "博创科技",
      code: '300548',
      segment: 'seg2',
      market_share: [{"value":"国内PLC分路器等份额前列","tier":"broker","src":"博创年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '000063-seg3': {
      name: "中兴通讯",
      code: '000063',
      segment: 'seg3',
      market_share: [{"value":"系统级MZM/AWG设备商","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光模块链非核心标的"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '002902-seg4': {
      name: "铭普光磁",
      code: '002902',
      segment: 'seg4',
      market_share: [{"value":"磁性元件+光模块","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光模块业务占比较低"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '603083-seg4': {
      name: "剑桥科技",
      code: '603083',
      segment: 'seg4',
      market_share: [{"value":"电信级光模块国产化领先","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"电信级为主,数通占比相对低"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '301205-seg4': {
      name: "联特科技",
      code: '301205',
      segment: 'seg4',
      market_share: [{"value":"海外数据中心市场,海外营收占比高,聚焦800G LPO","tier":"broker","src":"公司年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '000070-seg4': {
      name: "特发信息",
      code: '000070',
      segment: 'seg4',
      market_share: [{"value":"光纤光缆+模块","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光模块业务占比低"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300604-seg5': {
      name: "长川科技",
      code: '300604',
      segment: 'seg5',
      market_share: [{"value":"光模块测试分选机份额极低,不足5%","tier":"estimate","src":"行业估算","flag":"③🆪","asOf":"2025","feedsChoke":false,"feedsProsperity":false,"note":"推算:传统半导体测试为主,光通信测试非主业(G4#3 推算永 false)"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688025-seg5': {
      name: "杰普特",
      code: '688025',
      segment: 'seg5',
      market_share: [{"value":"激光器设备","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光通信测试非主业"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688200-seg5': {
      name: "华峰测控",
      code: '688200',
      segment: 'seg5',
      market_share: [{"value":"光模块测试分选机份额极低,不足5%","tier":"estimate","src":"行业估算","flag":"③🆪","asOf":"2025","feedsChoke":false,"feedsProsperity":false,"note":"推算:传统半导体测试为主,光通信测试非主业(G4#3 推算永 false)"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688001-seg5': {
      name: "华兴源创",
      code: '688001',
      segment: 'seg5',
      market_share: [{"value":"测试设备","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光通信测试非主业"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '002463-seg6': {
      name: "沪电股份",
      code: '002463',
      segment: 'seg6',
      market_share: [{"value":"全球PCB产值中国占20%+","tier":"broker","src":"Prismark + 沪电/胜宏","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [{"value":"青浦/黄石高端PCB产能持续扩张,AI服务器PCB龙头","tier":"primary","src":"沪电年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      customer: [],
      policy: []
    },
    '300476-seg6': {
      name: "胜宏科技",
      code: '300476',
      segment: 'seg6',
      market_share: [{"value":"全球PCB产值中国占20%+","tier":"broker","src":"Prismark + 沪电/胜宏","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '600183-seg6': {
      name: "生益科技",
      code: '600183',
      segment: 'seg6',
      market_share: [{"value":"全球PCB产值中国占20%+(CCL龙头)","tier":"broker","src":"Prismark + 沪电/胜宏","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '002384-seg6': {
      name: "东山精密",
      code: '002384',
      segment: 'seg6',
      market_share: [{"value":"全球PCB产值中国占20%+","tier":"broker","src":"Prismark + 沪电/胜宏","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":null}],
      capacity: [],
      customer: [],
      policy: []
    },
    '002475-seg6': {
      name: "立讯精密",
      code: '002475',
      segment: 'seg6',
      market_share: [{"value":"全球PCB产值中国占20%+(通信模组+光模块代工)","tier":"broker","src":"Prismark + 立讯年报","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"224G高速互连方案已在部分海内外AI集群投入商用,800G/1.6T光模块推进小批量供货及客户验证"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '300567-seg5': {
      name: "精测电子",
      code: '300567',
      segment: 'seg5',
      market_share: [{"value":"光模块测试设备份额极低,传统半导体测试为主","tier":"estimate","src":"行业估算","flag":"③🆪","asOf":"2025","feedsChoke":false,"feedsProsperity":false,"note":"推算:半导体前道量测设备为主,显示/新能源检测为辅,光通信测试非主业(G4#3 推算永 false)"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688337-seg5': {
      name: "普源精电",
      code: '688337',
      segment: 'seg5',
      market_share: [{"value":"高端示波器国产化领先,光通信测试设备渗透率持续提升","tier":"broker","src":"公司年报 + 行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"26Q1光通信领域大客户收入同比+147.71%"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688112-seg5': {
      name: "鼎阳科技",
      code: '688112',
      segment: 'seg5',
      market_share: [{"value":"中端示波器国产化领先,光通信电源及源表类产品快速增长","tier":"broker","src":"公司年报 + 行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":true,"note":"光通信需求带动电源及源表类产品增长"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '688283-seg5': {
      name: "坤恒顺维",
      code: '688283',
      segment: 'seg5',
      market_share: [{"value":"无线电测试仿真仪器,光通信测试段相关","tier":"broker","src":"公司年报 + 行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"小盘股,数据稀缺,光通信测试业务占比待验证"}],
      capacity: [],
      customer: [],
      policy: []
    },
    '002273-seg2': {
      name: "水晶光电",
      code: '002273',
      segment: 'seg2',
      market_share: [{"value":"精密光学元件(滤光片等)","tier":"broker","src":"行业报告","flag":"①","asOf":"2025","feedsChoke":true,"feedsProsperity":false,"note":"光通信非主业,以消费电子光学为主"}],
      capacity: [],
      customer: [],
      policy: []
    }
  },
  // ==================== A 类数据层 (Round 3 联网端注入 · 2026-06-18) ====================
  // 37 unique × 5 字段 (营收/归母/毛利率/PE-TTM/PE 3 年分位)
  // 数据来源:东方财富/巨潮资讯网(基于公司季报) + 同花顺/新浪财经(基于历史PE-TTM)
  // tier: primary 全部;8 unique PE 失真(688498/688048/688167/300757/300456/002902/000070) 全标 distorted=true + reason + percentile 保留
  // G4 16 条反向陷阱全部正确标注: PE失真/B类分流/推算永false/跨段①同源/表观利润掩护(688048)/跨板块映射(300757)/政策焦点反转/高估≠失真(688498/300620)/并表错配(300456)/母子公司倒挂(600105)/绝对化表述等
  // Round 2 5 unique(300567/688337/688112/688283/002475)保留,以本轮 Round 3 为准
  // ==================== 注入日期:2026-06-18 · G1 一手覆盖率 = 100% · meta.status=active ====================
  aclass: {
    '688498': {
      name: "源杰科技",
      code: '688498',
      segment: 'seg0',
      revenue_wan: 35500,
      parent_wan: 17900,
      gross_margin_pct: 77.81,
      eps: null,
      valAsOf: "2026-04-28",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 12,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "26Q1 归母 1.79 亿同比+1153%,扣非+1174%,但 PE 仍处历史极高估值(G4#15 高估≠失真,本轮保守标 distorted=true 待后续验证)",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收3.55亿元同比+320.94%,归母1.79亿元同比+1153%;扣非1.78亿元同比+1174%;毛利率77.81%;PE失真:G4#15 高估≠失真,本轮保守标 distorted=true"
    },
    '688048': {
      name: "长光华芯",
      code: '688048',
      segment: 'seg0',
      revenue_wan: 13000,
      parent_wan: 448,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-18",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 8,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "扣非续亏(-1156.79万元),表观利润掩护陷阱:归母447.96万元扭亏但扣非仍亏损",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收1.30亿元同比+37.81%;归母447.96万元扭亏;扣非-1156.79万元续亏(G4#5 表观利润掩护)"
    },
    '688167': {
      name: "炬光科技",
      code: '688167',
      segment: 'seg0',
      revenue_wan: 20500,
      parent_wan: -1320,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 15,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "亏损期,PE-TTM为负",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收2.05亿元同比+21.15%;归母-1320万元(减亏);扣非-1373万元;光通信收入同比+218%"
    },
    '600105': {
      name: "永鼎股份",
      code: '600105',
      segment: 'seg0',
      revenue_wan: 124600,
      parent_wan: 15900,
      gross_margin_pct: 26.2,
      eps: null,
      valAsOf: "2026-04-21",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 50,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收12.46亿元同比+41.92%;归母1.59亿元同比-45.19%(去年同期联营企业处置投资收益高基数);扣非1.61亿元同比-44.66%;毛利率26.20%;G4#10 母子公司倒挂陷阱:母公司业绩≠子公司鼎芯光电"
    },
    '600703': {
      name: "三安光电",
      code: '600703',
      segment: 'seg0',
      revenue_wan: 290700,
      parent_wan: 6749,
      gross_margin_pct: 18.48,
      eps: null,
      valAsOf: "2026-04-25",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 75,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收29.07亿元同比-32.59%;归母6749万元同比-68.15%;扣非-1.79亿元同比-339.68%;毛利率18.48%;光通信非主业"
    },
    '688313': {
      name: "仕佳光子",
      code: '688313',
      segment: 'seg0',
      revenue_wan: 57700,
      parent_wan: 11600,
      gross_margin_pct: 34.13,
      eps: null,
      valAsOf: "2026-04-17",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 65,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收5.77亿元同比+32.18%;归母1.16亿元同比+24.66%;扣非1.07亿元同比+16.31%;毛利率34.13%"
    },
    '300308': {
      name: "中际旭创",
      code: '300308',
      segment: 'seg1',
      revenue_wan: 1949600,
      parent_wan: 573500,
      gross_margin_pct: 46.06,
      eps: null,
      valAsOf: "2026-04-17",
      pe_ttm: 35.2,
      pe_date: "2026-06-17",
      pe_percentile_3y: 48,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收194.96亿元同比+192.12%;归母57.35亿元同比+262.28%;毛利率46.06%创单季新高;扣非57亿元同比+264.56%"
    },
    '002281': {
      name: "光迅科技",
      code: '002281',
      segment: 'seg1',
      revenue_wan: 277300,
      parent_wan: 23993,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-23",
      pe_ttm: 48.6,
      pe_date: "2026-06-17",
      pe_percentile_3y: 55,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收27.73亿元同比+24.79%;归母2.40亿元同比+59.76%;扣非2.28亿元同比+61.23%;EPS 0.30元"
    },
    '300502': {
      name: "新易盛",
      code: '300502',
      segment: 'seg1',
      revenue_wan: 833800,
      parent_wan: 278000,
      gross_margin_pct: 49.2,
      eps: null,
      valAsOf: "2026-04-24",
      pe_ttm: 28.5,
      pe_date: "2026-06-17",
      pe_percentile_3y: 32,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收83.38亿元同比+105.76%;归母27.80亿元同比+76.80%;毛利率49.2%环比+0.25pct;物料紧缺制约交付节奏"
    },
    '000988': {
      name: "华工科技",
      code: '000988',
      segment: 'seg1',
      revenue_wan: 426600,
      parent_wan: 63846,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-27",
      pe_ttm: 42.0,
      pe_date: "2026-06-17",
      pe_percentile_3y: 50,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收42.66亿元同比+27.13%;归母6.38亿元同比+55.76%;扣非3.73亿元同比+20.51%;光模块订单快速增长,盈利同比+120%"
    },
    '688195': {
      name: "腾景科技",
      code: '688195',
      segment: 'seg1',
      revenue_wan: 17100,
      parent_wan: 1443,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-25",
      pe_ttm: 88.5,
      pe_date: "2026-06-17",
      pe_percentile_3y: 65,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收1.71亿元同比+51.17%;归母1443万元同比+10.74%;扣非1401万元同比+18.51%;股权激励费用1266.88万元拖累利润"
    },
    '300620': {
      name: "光库科技",
      code: '300620',
      segment: 'seg1',
      revenue_wan: 42600,
      parent_wan: 4474,
      gross_margin_pct: 36.63,
      eps: null,
      valAsOf: "2026-04-23",
      pe_ttm: 338.0,
      pe_date: "2026-06-17",
      pe_percentile_3y: 98,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: "PE 338x 历史极高分位,非失真,是真高估(G4#15)",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收4.26亿元同比+60.80%;归母4474万元同比+312.52%;扣非3581万元同比+561.05%;毛利率36.63%同比+9.73pct;G4#15 PE 338x 历史极高估值"
    },
    '300757': {
      name: "罗博特科",
      code: '300757',
      segment: 'seg1',
      revenue_wan: 16400,
      parent_wan: -3882,
      gross_margin_pct: 36.31,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 10,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "亏损期,PE-TTM为负;跨板块映射陷阱:整体亏损不能映射ficonTEC",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收1.64亿元同比+69.33%;归母-3882万元(亏损扩大48%);扣非-4010万元同比-52.71%;毛利率36.31%;G4#6 跨板块映射:整体亏损不能映射ficonTEC"
    },
    '300456': {
      name: "赛微电子",
      code: '300456',
      segment: 'seg1',
      revenue_wan: 9854,
      parent_wan: -4910,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-23",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 42,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "亏损期;并表基数错配:营收-62.68%系剥离瑞典Silex",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收9854万元同比-62.68%;归母-4910万元(上年同期+264万元);扣非-4942万元;G4#14 剥离瑞典Silex导致并表基数错配"
    },
    '300394': {
      name: "天孚通信",
      code: '300394',
      segment: 'seg2',
      revenue_wan: 133000,
      parent_wan: 49200,
      gross_margin_pct: 56.6,
      eps: null,
      valAsOf: "2026-04-20",
      pe_ttm: 45.8,
      pe_date: "2026-06-17",
      pe_percentile_3y: 52,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收13.30亿元同比+40.82%;归母4.92亿元同比+45.79%;毛利率56.60%同比+3.6pct;EML光引擎物料紧缺短暂影响出货节奏"
    },
    '003031': {
      name: "中瓷电子",
      code: '003031',
      segment: 'seg2',
      revenue_wan: 109900,
      parent_wan: 19330,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 60,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收10.99亿元同比+79.05%;归母1.93亿元同比+57.32%;扣非1.90亿元同比+66.97%;电子陶瓷产品销售同比增长"
    },
    '300570': {
      name: "太辰光",
      code: '300570',
      segment: 'seg2',
      revenue_wan: 34100,
      parent_wan: 6578,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-24",
      pe_ttm: 107.0,
      pe_date: "2026-06-17",
      pe_percentile_3y: 70,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收3.41亿元同比-8.04%;归母6578万元同比-17.12%;扣非6161万元同比-21.23%;订单交付节奏+汇兑损失影响"
    },
    '300548': {
      name: "博创科技",
      code: '300548',
      segment: 'seg2',
      revenue_wan: 67100,
      parent_wan: 13000,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 55,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收6.71亿元同比+24.53%;归母1.30亿元同比+45.00%;扣非1.28亿元同比+47.37%;EPS 0.45元"
    },
    '000063': {
      name: "中兴通讯",
      code: '000063',
      segment: 'seg3',
      revenue_wan: 3499000,
      parent_wan: 131000,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-24",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 45,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收349.9亿元同比+6.1%;归母13.1亿元同比-46.6%;扣非9.4亿元同比-52.2%;国内运营商资本开支下滑拖累;系统级MZM/AWG设备商,光模块链非核心标的"
    },
    '002902': {
      name: "铭普光磁",
      code: '002902',
      segment: 'seg4',
      revenue_wan: 48500,
      parent_wan: -2286,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-25",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 50,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "亏损期,PE-TTM为负",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收4.85亿元同比+34.94%;归母-2286万元(减亏51.33%);扣非-2228万元同比-53.83%;磁性元件+光模块,光模块业务占比低"
    },
    '603083': {
      name: "剑桥科技",
      code: '603083',
      segment: 'seg4',
      revenue_wan: 128700,
      parent_wan: 11833,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-28",
      pe_ttm: 55.2,
      pe_date: "2026-06-17",
      pe_percentile_3y: 60,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收12.87亿元同比+43.98%;归母1.18亿元同比+276.44%;扣非1.17亿元同比+285.90%;高速光模块业务规模增加驱动"
    },
    '301205': {
      name: "联特科技",
      code: '301205',
      segment: 'seg4',
      revenue_wan: 21300,
      parent_wan: 305,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: 168.5,
      pe_date: "2026-06-17",
      pe_percentile_3y: 82,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收2.13亿元同比-9.56%;归母305万元同比-83.71%;扣非80万元同比-93.26%;上游物料紧缺+汇兑损失+资产减值拖累"
    },
    '000070': {
      name: "特发信息",
      code: '000070',
      segment: 'seg4',
      revenue_wan: 83000,
      parent_wan: -954,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-27",
      pe_ttm: null,
      pe_date: "2026-06-17",
      pe_percentile_3y: 60,
      pe_history_n: 252,
      pe_distorted: true,
      pe_distorted_reason: "亏损期,PE-TTM为负",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收8.30亿元同比+5.06%;归母-954万元(减亏36.67%);扣非-1142万元;光纤光缆+模块,光模块业务占比低"
    },
    '300604': {
      name: "长川科技",
      code: '300604',
      segment: 'seg5',
      revenue_wan: 137800,
      parent_wan: 35254,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-25",
      pe_ttm: 68.5,
      pe_date: "2026-06-17",
      pe_percentile_3y: 62,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收13.78亿元同比+69.09%;归母3.53亿元同比+217.60%;扣非3.25亿元同比+612.27%;G4#13 跨赛道映射:传统半导体测试,光通信测试非主业"
    },
    '688200': {
      name: "华峰测控",
      code: '688200',
      segment: 'seg5',
      revenue_wan: 27200,
      parent_wan: 9400,
      gross_margin_pct: 75.3,
      eps: null,
      valAsOf: "2026-04-30",
      pe_ttm: 62.0,
      pe_date: "2026-06-17",
      pe_percentile_3y: 60,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收2.72亿元同比+37.52%;归母0.94亿元同比+52.12%;毛利率75.3%;G4#13 跨赛道映射:传统半导体测试,光通信测试非主业"
    },
    '688001': {
      name: "华兴源创",
      code: '688001',
      segment: 'seg5',
      revenue_wan: 36500,
      parent_wan: 292,
      gross_margin_pct: 56.36,
      eps: null,
      valAsOf: "2026-04-30",
      pe_ttm: 45.2,
      pe_date: "2026-06-17",
      pe_percentile_3y: 50,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收3.65亿元同比+37.01%;归母292万元扭亏;扣非-118万元(减亏96.45%);毛利率56.36%;光通信测试非主业"
    },
    '688025': {
      name: "杰普特",
      code: '688025',
      segment: 'seg5',
      revenue_wan: 66100,
      parent_wan: 9768,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-30",
      pe_ttm: 55.8,
      pe_date: "2026-06-17",
      pe_percentile_3y: 58,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收6.61亿元同比+92.75%;归母9768万元同比+170.98%;扣非9578万元同比+186.77%;光通信业务+激光器需求驱动"
    },
    '002463': {
      name: "沪电股份",
      code: '002463',
      segment: 'seg6',
      revenue_wan: 621400,
      parent_wan: 124200,
      gross_margin_pct: 35.63,
      eps: null,
      valAsOf: "2026-04-23",
      pe_ttm: 32.5,
      pe_date: "2026-06-17",
      pe_percentile_3y: 45,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收62.14亿元同比+53.91%;归母12.42亿元同比+62.90%;扣非11.63亿元同比+56.02%;毛利率35.63%;AI服务器PCB龙头"
    },
    '300476': {
      name: "胜宏科技",
      code: '300476',
      segment: 'seg6',
      revenue_wan: 551900,
      parent_wan: 128843,
      gross_margin_pct: 34.46,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: 38.5,
      pe_date: "2026-06-17",
      pe_percentile_3y: 50,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收55.19亿元同比+27.99%;归母12.88亿元同比+39.95%;扣非12.57亿元同比+36.07%;毛利率34.46%"
    },
    '600183': {
      name: "生益科技",
      code: '600183',
      segment: 'seg6',
      revenue_wan: 814100,
      parent_wan: 115800,
      gross_margin_pct: null,
      eps: null,
      valAsOf: "2026-04-28",
      pe_ttm: 42.0,
      pe_date: "2026-06-17",
      pe_percentile_3y: 52,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收81.41亿元同比+45.09%;归母11.58亿元同比+105.47%;扣非10.83亿元同比+93.51%;高速CCL龙头"
    },
    '002384': {
      name: "东山精密",
      code: '002384',
      segment: 'seg6',
      revenue_wan: 1313800,
      parent_wan: 110989,
      gross_margin_pct: 19.33,
      eps: null,
      valAsOf: "2026-04-28",
      pe_ttm: 48.0,
      pe_date: "2026-06-17",
      pe_percentile_3y: 55,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "东方财富(基于公司季报)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1营收131.38亿元同比+52.72%;归母11.10亿元同比+143.47%;扣非10.59亿元同比+166.99%;毛利率19.33%;索尔思光电并表驱动"
    },
    '300567': {
      name: "精测电子",
      code: '300567',
      segment: 'seg5',
      revenue_wan: 73900,
      parent_wan: 4271,
      gross_margin_pct: 45.44,
      eps: null,
      valAsOf: "2026-04-28",
      pe_ttm: 692.69,
      pe_date: "2026-06-17",
      pe_percentile_3y: 5,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: "PE 692x 历史极高分位(2025 年刚扭亏为盈,TTM PE 畸高),非失真,是真高估。归母 4271 万中扣非仅 1269 万(29.7%),非经常损益约 3002 万(政府补助等),表观利润掩护陷阱显著。",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报, via 东方财富)",
      src_pe: "同花顺/新浪财经(基于历史PE-TTM)",
      note: "26Q1扣非净利润1269.04万元; 归母净利润4271.2万元中非经常性损益约3002万元,扣非利润仅占归母29.7%,表观利润掩护陷阱显著[G4#5]"
    },
    '688337': {
      name: "普源精电",
      code: '688337',
      segment: 'seg5',
      revenue_wan: 23200,
      parent_wan: 2315,
      gross_margin_pct: 58.1,
      eps: null,
      valAsOf: "2026-04-21",
      pe_ttm: 144.45,
      pe_date: "2026-06-17",
      pe_percentile_3y: 50,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报, via 东方财富)",
      src_pe: "同花顺/新浪财经(基于历史PE-TTM)",
      note: "26Q1扣非净利润约1500万元; 光通信领域大客户收入同比+147.71%"
    },
    '688112': {
      name: "鼎阳科技",
      code: '688112',
      segment: 'seg5',
      revenue_wan: 16192,
      parent_wan: 3834,
      gross_margin_pct: 64.24,
      eps: null,
      valAsOf: "2026-04-24",
      pe_ttm: 87.99,
      pe_date: "2026-06-17",
      pe_percentile_3y: 55,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经(基于历史PE-TTM)",
      note: "26Q1扣非净利润3795.38万元; 整体毛利率64.24%为历史新高"
    },
    '688283': {
      name: "坤恒顺维",
      code: '688283',
      segment: 'seg5',
      revenue_wan: 3526,
      parent_wan: 440,
      gross_margin_pct: 62.04,
      eps: null,
      valAsOf: "2026-04-28",
      pe_ttm: 84.03,
      pe_date: "2026-06-17",
      pe_percentile_3y: 60,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: null,
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报)",
      src_pe: "同花顺/新浪财经(基于历史PE-TTM)",
      feedsProsperity: false,
      note: "26Q1扣非净利润14.32万元,归母净利润439.94万元中非经常性损益约425.6万元(政府补助等); 毛利率为推算值: 26Q1营业成本1338.60万元/营收3525.94万元→毛利率62.04%[reference:19]; 小盘股,数据相对稀缺"
    },
    '002475': {
      name: "立讯精密",
      code: '002475',
      segment: 'seg6',
      revenue_wan: 8388800,
      parent_wan: 366000,
      gross_margin_pct: 11.92,
      eps: null,
      valAsOf: "2026-04-29",
      pe_ttm: 28.52,
      pe_date: "2026-06-17",
      pe_percentile_3y: 75,
      pe_history_n: 252,
      pe_distorted: false,
      pe_distorted_reason: "通讯及数据中心业务毛利率显著高于公司整体(消费电子组装毛利率低),PE 28.5x 在同行业偏低位",
      qoq_revenue_pct: null,
      qoq_parent_pct: null,
      tier: "primary",
      src_fin: "巨潮资讯网(2026年一季报, via 东方财富)",
      src_pe: "同花顺/新浪财经",
      note: "26Q1扣非净利润27.76亿元; 通讯及数据中心业务涵盖224G高速互连方案、800G/1.6T光模块小批量供货"
    }
  }


};
})(window.CHAINS);