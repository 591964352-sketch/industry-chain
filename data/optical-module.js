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

  meta: {
    sector: 'optical-module',
    tier: '核心',
    status: 'skeleton',
    updatedAt: '2026-06-17',
    ltFit: '🆪 待联网核实后填入'
  },

  // ==================== 景气六维 (skeleton 阶段全部 estimate, 待联网核实) ====================
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:0, trend:'flat', reason:'🆪 [待核] 沿用 optical-chip 评级: AI 算力超级上行驱动,持续性强', evidence:'[待核]', flag:'🆪', tier:'estimate', src:'[待核]' },
      { key:'visibility', name:'业绩兑现度', score:0, trend:'flat', reason:'🆪 [待核] 沿用 optical-chip 评级', evidence:'[待核]', flag:'🆪', tier:'estimate', src:'[待核]' },
      { key:'policy', name:'政策支持', score:0, trend:'flat', reason:'🆪 [待核] 沿用 optical-chip 评级', evidence:'[待核]', flag:'🆪', tier:'estimate', src:'[待核]' },
      { key:'supply', name:'供需关系', score:0, trend:'flat', reason:'🆪 [待核] 沿用 optical-chip 评级', evidence:'[待核]', flag:'🆪', tier:'estimate', src:'[待核]' },
      { key:'valuation', name:'估值水平', score:0, trend:'flat', reason:'🆪 [待核] 沿用 optical-chip 评级: 光模块股 PE 普遍 50-200x, 估值维门控触发', evidence:'[待核]', flag:'🆪', tier:'estimate', src:'[待核]' },
      { key:'barrier', name:'壁垒强度', score:0, trend:'flat', reason:'🆪 [待核] 沿用 optical-chip 评级', evidence:'[待核]', flag:'🆪', tier:'estimate', src:'[待核]' }
    ],
    verdict: {
      longTermFit: '🆪 [待核] 待联网核实后填入',
      oneLine: '🆪 [待核] 待联网核实后填入',
      stockHint: '🆪 [待核] 待联网核实后填入'
    }
  },

  // ==================== 周期位置 (skeleton 阶段填占位) ====================
  cyclePosition: {
    stage: 'boom',
    label: '[待核]',
    reason: '🆪 [待核] AI 算力超级上行周期',
    watchSignals: ['[待核]', '[待核]', '[待核]']
  },

  // ==================== ① 赛道概览 (8 卡, 全部 [待核]) ====================
  overview: [
    { label:'🌍 全球市场规模', value:'[待核]', note:'2026E AI 光模块/光器件 全链路', color:'var(--accent)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'🇨🇳 中国市场占比', value:'[待核]', note:'含中国厂商全球份额', color:'var(--blue)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'⚡ 核心需求驱动', value:'[待核]', note:'AI 算力/1.6T/3.2T CPO 部署节奏', color:'var(--green)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'📈 产业周期阶段', value:'[待核]', note:'6 段全产业链景气位置', color:'var(--barrier-high)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'🔒 卡脖子点', value:'[待核]', note:'InP 衬底/200G EML/硅光 PIC 设计', color:'var(--red)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'🏭 关键环节国产化率', value:'[待核]', note:'光芯片 10%/光器件 60%/模块 90%', color:'var(--barrier-mid)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'🚀 下一代催化', value:'[待核]', note:'3.2T/CPO/LPO/硅光集成', color:'var(--accent)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' },
    { label:'💎 高弹性细分', value:'[待核]', note:'TFLN 调制器/硅光 PIC/EML 激光器', color:'var(--barrier-high)', tier:'estimate', src:'[待核]', asOf:'2026-06-17' }
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

};

})(window.CHAINS);