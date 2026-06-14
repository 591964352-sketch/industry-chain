// data/optical.js — 光模块（Optical Module）赛道骨架 · 2026-06-14 新增
// 本文件 = 阶段 B2"建链"步骤 1：仅搭结构骨架，**不填任何"会变"数据**
// 阶段 B2 步骤 2：用户从 Gemini 端取回带源数据后，CC 注入（带守门校验）
//
// 严格遵循"不造数"铁律：
//   ✅ 已填 = 稳定信息（公司名+代码 / 环节命名 / barrier 定性 / 卡口候选类型 / treeMap 列序）
//   ❌ 留空/标"待核" = 会变数据（市占率/PE/PE分位/营收/净利/缺口/CAGR/六维分/财报数）
//   ❌ 不加 = 完全不写 prosperity 字段（避免 6 维 0 分污染综合分；cpo.js 同款处理）
//
// 渲染层验证：
//   - 缺 prosperity → 景气六维卡 + 擂台表 自动跳过该行（line 994 + 2133 守卫）
//   - 缺 valuation → 估值条不渲染（typeof === 'number' 守卫）
//   - 缺 dims6 → 个股六维折叠不显示
//   - barrier 字符串+'高/极高'等定性 = 表格排序/徽章/色块正常

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== OPTICAL ====================
CHAINS.optical = {
  id: 'optical', name: '光模块', icon: '🔦',
  // 赛道级 meta（分组/筛选/治理）—— 升级九 STEP 2 样板
  meta: { sector:'中游', tier:'核心', status:'active', updatedAt:'2026-06-14', ltFit:null },

  // ⚠️ prosperity 字段暂不加（与 cpo.js 同款）：等六维数据核实后再注入。
  //   留白期间：景气六维卡 + 擂台表 该赛道行不渲染（用户不会看到 0 分误判）。

  // 周期位置（AI 初版，🆪）—— 等数据回填后用真实口径覆盖
  cyclePosition: { stage:'boom', label:'（待核 — AI初版）', reason:'（待核 — AI初版，周一cron会用真实数据覆盖）', watchSignals:['（待核 — 英伟达/谷歌 1.6T 采购指引）','（待核 — 头部厂商 800G/1.6T 出货量）','（待核 — 上游光芯片扩产节奏）'] },

  plainIntro: {
    analogy: '光模块 = 数据中心里"GPU 之间的光纤对讲机"',
    paragraphs: [
      '（待核 — 光模块在 AI 数据中心的作用、与 GPU/交换机的连接关系、对带宽的依赖）',
      '（待核 — 800G → 1.6T → 3.2T/CPO 的演进节奏 + AI 算力超级上行 + CPO/LPO 替代分支）'
    ],
    flowSteps: ['光芯片(DFB/EML/CW/可调)','硅光芯片(PIC)','光器件(FAU/MPO/AWG/隔离器)','光模块制造(800G/1.6T/CPO/LPO)','装入AI服务器/交换机/电信设备'],
    highlightBox: '<strong>💡 物理卡口 视角（骨架 · 待核）：</strong>光模块产业链的卡口不在制造端（≥10家可切换 = 不构成卡口），而在上游光芯片和硅光 PIC 端：<br>① <strong>100mW+ CW 激光器</strong>：CPO 架构必须外置高功率光源，全球<5家能批量（待核具体数字）<br>② <strong>100G/200G 高速 EML 激光器</strong>：1.6T 光模块核心芯片，海外寡头主导（待核）<br>③ <strong>硅光 PIC 设计/代工</strong>：A股无直接代工标的（台积电 COUPE 主导），但抓设计+器件侧有结构机会（待核）<br>以上 3 个卡口候选环节是结构性的，**数据待 Gemini 核实后注入**。'
  },

  overview: [
    // 8 张必含卡：宏观/本土占比/驱动/阶段/M9口径/下一代/核心矛盾/国产化率 全部"待核"
    { label: '🌍 全球光模块市场（2026E）', value: '—', note: '（待核 — Lightcounting/Coincidence 2026Q1 报告）', color: null, tier:null, src:null },
    { label: '🇨🇳 中国大陆全球占比', value: '—', note: '（待核 — 国内 5 大厂合计市占）', color: null, tier:null, src:null },
    { label: '🤖 AI 算力核心驱动', value: '—', note: '（待核 — 单 AI 服务器光模块用量/价值量）', color: null, tier:null, src:null },
    { label: '🏭 产业阶段', value: '—', note: '（待核 — 800G 放量 / 1.6T 导入 / 3.2T 预研 各自位置）', color: null, tier:null, src:null },
    { label: '📐 1.6T 光模块需求(2026E)', value: '—', note: '（待核 — 英伟达/谷歌/Broadcom 合计 1.6T 采购量）', color: null, tier:null, src:null },
    { label: '⚡ 下一代催化', value: '—', note: '（待核 — 3.2T / CPO / LPO 三条技术路径进展）', color: null, tier:null, src:null },
    { label: '🔴 核心矛盾', value: '—', note: '（待核 — 上游 CW 激光器 / 高速 EML 缺口或产能瓶颈）', color: null, tier:null, src:null },
    { label: '📋 上游材料国产化率', value: '—', note: '（待核 — DFB/EML/CW/硅光 PIC 4 项分型）', color: null, tier:null, src:null }
  ],

  // 5 列树状图（骨架）：下游→中游→上游材料→上游设备→侧枝
  //   sub-card 的 name + barrier 定性 = 稳定信息（产业方法论结论）；note 留 '—'
  treeMap: {
    // ============ ① 下游 (3 个 sub-card) ============
    downstream: [
      { name: 'AI 数据中心(AI 服务器+交换机)', barrier: 'high', note: '—', companies: [
        { name:'工业富联', code:'601138', position:'英伟达 AI 服务器整机代工龙头', barrier:'高' },
        { name:'中科曙光', code:'603019', position:'海光信息+智算中心', barrier:'高' },
        { name:'紫光股份', code:'000938', position:'新华三 AI 交换机/服务器', barrier:'高' }
      ]},
      { name: '电信设备(5G/骨干网)', barrier: 'mid', note: '—', companies: [
        { name:'中兴通讯', code:'000063', position:'5G 基站+光通信设备', barrier:'高' },
        { name:'烽火通信', code:'600498', position:'光通信传输设备', barrier:'中' }
      ]},
      { name: '消费/工业/汽车', barrier: 'low', note: '—', companies: [
        // 暂无纯光模块 A 股直接标的占此格（消费侧光模块用量小）
      ]}
    ],
    // ============ ② 中游 (1 个 sub-card, 含 3 公司 inline) ============
    midstream: [
      { name: '光模块制造(800G/1.6T/CPO/LPO)', barrier: 'low', choke: false, note: '—', companies: [
        { name:'中际旭创', code:'300308', position:'全球光模块龙头(800G/1.6T 主力)', barrier:'极高' },
        { name:'新易盛', code:'300502', position:'800G/1.6T/LPO 核心供应商', barrier:'高' },
        { name:'光迅科技', code:'002281', position:'硅光+模块+芯片一体化', barrier:'高' }
      ]}
    ],
    // ============ ③ 上游材料 (4 个 sub-card, 卡口候选环节) ============
    materials: [
      { name: '光芯片(DFB/EML/CW/可调激光器/探测器)', barrier: 'extreme', choke: true, note: '—', companies: [
        { name:'源杰科技', code:'688498', position:'国内 100mW CW 激光器量产', barrier:'极高' },
        { name:'长光华芯', code:'688048', position:'EML/DFB/CW 多线布局', barrier:'高' },
        { name:'仕佳光子', code:'688313', position:'AWG+CW+PLC 多产品', barrier:'高' },
        { name:'三安光电', code:'600703', position:'化合物半导体/砷化镓代工(光芯片非主业)', barrier:'中' }
      ]},
      { name: '硅光芯片(PIC)设计与代工', barrier: 'extreme', choke: true, note: '—', companies: [
        { name:'光迅科技', code:'002281', position:'硅光设计+1.6T 模块一体化', barrier:'极高' },
        { name:'仕佳光子', code:'688313', position:'AWG 硅光核心子器件', barrier:'高' },
        { name:'博创科技', code:'300548', position:'PLC 光分路器+硅光模块', barrier:'高' }
      ]},
      { name: '光器件(FAU/MPO/AWG/隔离器/透镜)', barrier: 'high', choke: false, note: '—', companies: [
        { name:'天孚通信', code:'300394', position:'光器件平台型公司(FA/MPO 全系列)', barrier:'高' },
        { name:'太辰光', code:'300570', position:'MT 插芯+光纤连接器', barrier:'中' },
        { name:'仕佳光子', code:'688313', position:'MPO/FAU 进 CPO 场景', barrier:'中' }
      ]}
    ],
    // ============ ④ 上游设备 (2 个 sub-card) ============
    equipment: [
      { name: '光模块测试设备(误码仪/光功率计/示波器)', barrier: 'high', choke: false, note: '—', companies: [
        { name:'精测电子', code:'300567', position:'面板/半导体/光通信测试', barrier:'中' },
        { name:'思林杰', code:'688115', position:'光模块测试方案', barrier:'中' }
      ]},
      { name: '光模块封装+自动化设备(贴片/耦合/共晶焊)', barrier: 'high', choke: false, note: '—', companies: [
        { name:'罗博特科', code:'300757', position:'光模块自动化设备', barrier:'中' },
        { name:'杰普特', code:'688025', position:'激光器/光器件加工设备', barrier:'中' }
      ]}
    ],
    // ============ ⑤ 侧枝 (1 个 sub-card) ============
    sideBranches: [
      { name: '光纤光缆(配套)', barrier: 'mid', note: '—', companies: [
        { name:'长飞光纤', code:'601869', position:'光纤光缆龙头', barrier:'中' },
        { name:'亨通光电', code:'600487', position:'光纤光缆+海洋通信', barrier:'中' },
        { name:'中天科技', code:'600522', position:'光纤光缆+电网', barrier:'中' }
      ]}
    ]
  },

  // 6 环节 segments —— 与 treeMap 5 列子节点 1:1 对齐
  //   name / barrier / choke = 稳定结论；intro / globalLandscape / stocks[].logic / stocks[].position 数字 = 全待核
  segments: [
    {
      name: '光芯片(DFB/EML/CW/可调激光器/探测器) — 卡口候选 ①',
      costRatio: '光模块 BOM ~25-35%',
      barrier: 'extreme', choke: true, border: true,
      intro: '（待核 — 全球 DFB/EML/CW 激光器供应商格局，海外寡头份额，CPO/1.6T 对高功率 CW 的需求拉动，扩产周期 12-18 月）',
      globalLandscape: [
        { lbl: '（待核 — 龙头 1）', val: '—', note: '—' },
        { lbl: '（待核 — 龙头 2）', val: '—', note: '—' },
        { lbl: '（待核 — 龙头 3）', val: '—', note: '—' }
      ],
      stocks: [
        { rank:1, name:'源杰科技', code:'688498', position:'国内 100mW CW 激光器量产(全球<5家结构性结论,具体市占待核)', barrier:'极高', hits:4, strength:'★★★', logic:'（待核 — 100mW+ CW 出货节奏 / 产能 / 毛利率 / 客户绑定 / 估值）' },
        { rank:2, name:'长光华芯', code:'688048', position:'EML/DFB/CW 多线布局', barrier:'高', hits:null, strength:null, logic:'（待核 — 100G/200G EML 验证进度 / 海外大厂出货 / 估值）' },
        { rank:3, name:'仕佳光子', code:'688313', position:'AWG+CW+PLC 多产品线', barrier:'高', hits:null, strength:null, logic:'（待核 — CW 100mW 进度 / AWG 全球市占 / MPO/FAU 进入 CPO 节奏）' },
        { rank:4, name:'三安光电', code:'600703', position:'化合物半导体/砷化镓代工(光芯片非主业)', barrier:'中', hits:null, strength:null, logic:'（待核 — 砷化镓代工产能 / 光芯片业务占比 / 客户结构）' }
      ]
    },
    {
      name: '硅光芯片 PIC(设计+代工) — 卡口候选 ②',
      costRatio: '光模块/光引擎 ~35%',
      barrier: 'extreme', choke: true, border: true,
      intro: '（待核 — 硅光 PIC 在 CPO/1.6T 渗透率曲线；台积电 COUPE 平台独供对 A 股的影响；硅光设计公司 + 核心子器件 AWG 的国产替代节奏）',
      globalLandscape: [
        { lbl: '（待核 — 台积电 COUPE 平台）', val: '—', note: '—' },
        { lbl: '（待核 — 海外硅光设计公司）', val: '—', note: '—' },
        { lbl: '（待核 — A 股设计代表）', val: '—', note: '—' }
      ],
      stocks: [
        { rank:1, name:'光迅科技', code:'002281', position:'硅光设计+1.6T 模块一体化(国内唯一1.6T硅光模块批量,具体节奏待核)', barrier:'极高', hits:3, strength:'★★☆', logic:'（待核 — 1.6T 硅光出货 / 特种光纤军工壁垒 / 估值）' },
        { rank:2, name:'仕佳光子', code:'688313', position:'AWG 硅光核心子器件', barrier:'高', hits:null, strength:null, logic:'（待核 — AWG 全球市占 / 400G/800G AWG 进度）' },
        { rank:3, name:'博创科技', code:'300548', position:'PLC 光分路器+硅光模块', barrier:'高', hits:null, strength:null, logic:'（待核 — 硅光模块出货 / 海外客户结构）' }
      ]
    },
    {
      name: '光器件/光无源(FAU/MPO/AWG/隔离器/透镜)',
      costRatio: '光模块 BOM ~15-25%',
      barrier: 'high', choke: false, border: false,
      intro: '（待核 — CPO 推动 FAU/MPO 通道数从 4→16→32→64+；全球供应商数量；A 股天孚/太辰/仕佳的相对位置）',
      globalLandscape: [
        { lbl: '（待核 — 海外 FAU 龙头）', val: '—', note: '—' },
        { lbl: '（待核 — 国内代表）', val: '—', note: '—' }
      ],
      stocks: [
        { rank:1, name:'天孚通信', code:'300394', position:'光器件平台型公司(FA/MPO 全系列)', barrier:'高', hits:null, strength:null, logic:'（待核 — CPO 关键配套出货 / 800G/1.6T 光器件订单 / 估值）' },
        { rank:2, name:'太辰光', code:'300570', position:'MT 插芯+光纤连接器', barrier:'中', hits:null, strength:null, logic:'（待核 — CPO 高密度连接方案出货）' }
      ]
    },
    {
      name: '光模块制造(800G/1.6T/CPO/LPO) — 中游制造(充分竞争)',
      costRatio: '产业链总价值 ~40-50%',
      barrier: 'low', choke: false, border: false,
      intro: '（待核 — 全球光模块制造 ≥10 家，中际旭创龙头规模与硅光技术领先；新易盛/光迅/剑桥/华工/博创/联特等跟随；CPO 替代风险跟踪）',
      globalLandscape: [
        { lbl: '（待核 — 中际旭创规模龙头）', val: '—', note: '—' },
        { lbl: '（待核 — 海外 Coherent/II-VI/Lumentum）', val: '—', note: '—' }
      ],
      stocks: [
        { rank:1, name:'中际旭创', code:'300308', position:'全球光模块龙头(规模+硅光双优)', barrier:'极高', hits:null, strength:null, logic:'（待核 — Q1-Q4 出货节奏 / 1.6T 客户结构 / 毛利率 / 估值）' },
        { rank:2, name:'新易盛', code:'300502', position:'800G/1.6T/LPO 核心供应商', barrier:'高', hits:null, strength:null, logic:'（待核 — 北美数据中心客户 / LPO 进度 / 估值）' },
        { rank:3, name:'剑桥科技', code:'603083', position:'光模块+无线小基站', barrier:'中', hits:null, strength:null, logic:'（待核 — 北美客户结构 / 800G 占比）' },
        { rank:4, name:'华工科技', code:'000988', position:'激光+光模块+传感器', barrier:'中', hits:null, strength:null, logic:'（待核 — 激光业务对冲 / 光模块业务占比）' },
        { rank:5, name:'博创科技', code:'300548', position:'PLC + 硅光模块', barrier:'中', hits:null, strength:null, logic:'（待核 — 海外客户结构 / 硅光占比）' },
        { rank:6, name:'联特科技', code:'301205', position:'1.6T 光模块新晋', barrier:'中', hits:null, strength:null, logic:'（待核 — 1.6T 验证进度 / 客户结构）' }
      ]
    },
    {
      name: '光模块测试与封装设备',
      costRatio: '制造投资 ~10-15%',
      barrier: 'high', choke: false, border: false,
      intro: '（待核 — 800G/1.6T 高速光模块对测试设备精度要求提升；误码仪/光功率计/示波器国产替代节奏）',
      globalLandscape: [
        { lbl: '（待核 — Keysight/EXFO 海外龙头）', val: '—', note: '—' },
        { lbl: '（待核 — 国内测试方案）', val: '—', note: '—' }
      ],
      stocks: [
        { rank:1, name:'精测电子', code:'300567', position:'面板/半导体/光通信测试', barrier:'中', hits:null, strength:null, logic:'（待核 — 光通信测试业务占比）' },
        { rank:2, name:'思林杰', code:'688115', position:'光模块测试方案', barrier:'中', hits:null, strength:null, logic:'（待核 — 800G/1.6T 测试方案出货）' },
        { rank:3, name:'罗博特科', code:'300757', position:'光模块自动化设备', barrier:'中', hits:null, strength:null, logic:'（待核 — 光模块自动化订单）' },
        { rank:4, name:'杰普特', code:'688025', position:'激光器/光器件加工设备', barrier:'中', hits:null, strength:null, logic:'（待核 — 光器件加工设备出货）' }
      ]
    },
    {
      name: '侧枝：光纤光缆+陶瓷套管+配套材料',
      costRatio: '—',
      barrier: 'mid', choke: false, border: false,
      intro: '（待核 — 光纤光缆与光模块的间接配套关系；A 股龙头长飞/亨通/中天 的全球份额；陶瓷套管/插芯等无源配套）',
      globalLandscape: [
        { lbl: '（待核 — 长飞光纤龙头）', val: '—', note: '—' },
        { lbl: '（待核 — 海外康宁/普睿斯曼）', val: '—', note: '—' }
      ],
      stocks: [
        { rank:1, name:'长飞光纤', code:'601869', position:'光纤光缆龙头', barrier:'中', hits:null, strength:null, logic:'（待核 — 全球光纤市占 / 光棒自给率）' },
        { rank:2, name:'亨通光电', code:'600487', position:'光纤光缆+海洋通信', barrier:'中', hits:null, strength:null, logic:'（待核 — 海洋通信订单）' },
        { rank:3, name:'中天科技', code:'600522', position:'光纤光缆+电网', barrier:'中', hits:null, strength:null, logic:'（待核 — 电网业务对冲）' }
      ]
    }
  ],

  // ④ 中游制造（与 segments[3] 重复环节,但按 PCB 范式单列）
  //   与 segments[3] 光模块制造 stocks 保持 1:1,但 midstream 不带 q1-q4
  midstream: {
    description: '光模块制造是充分竞争行业——全球≥10家可切换，**不构成物理卡口**。但中际旭创的规模优势+硅光技术领先构成事实上的行业主导地位。卡口结论见 segments[0-2] + chokePoints。',
    stocks: [
      { rank:1, name:'中际旭创', code:'300308', barrier:'极高', trend:null, trendNote:null, note:'（待核 — 全球光模块龙头 · 800G/1.6T 主力 · 深度绑定英伟达/谷歌）' },
      { rank:2, name:'新易盛', code:'300502', barrier:'高', trend:null, trendNote:null, note:'（待核 — 800G/1.6T/LPO 核心供应商 · 北美数据中心）' },
      { rank:3, name:'光迅科技', code:'002281', barrier:'高', trend:null, trendNote:null, note:'（待核 — 硅光+模块+芯片一体化 · 1.6T 硅光批量）' },
      { rank:4, name:'剑桥科技', code:'603083', barrier:'中', trend:null, trendNote:null, note:'（待核 — 光模块+无线小基站 · 北美客户结构）' },
      { rank:5, name:'华工科技', code:'000988', barrier:'中', trend:null, trendNote:null, note:'（待核 — 激光+光模块+传感器 · 激光业务对冲）' },
      { rank:6, name:'博创科技', code:'300548', barrier:'中', trend:null, trendNote:null, note:'（待核 — PLC + 硅光模块）' },
      { rank:7, name:'联特科技', code:'301205', barrier:'中', trend:null, trendNote:null, note:'（待核 — 1.6T 光模块新晋）' }
    ]
  },

  // ⑤ 四问筛选（卡口候选只标"全球<5家/扩产>12月/无替代/下游刚需"的环节 → 4/4 命中）
  //   4 问 true/false 是结构性判断（基于公开产业链方法论稳定结论）→ 可填
  //   q1-q4note 文字描述待核
  fourQuestions: {
    segments: [
      {
        name: '光芯片(100mW+ CW 激光器)',
        stocks: [
          { name:'源杰科技', code:'688498', q1:true, q1note:'（待核 — 全球 100mW+ CW 供应商家数）', q2:true, q2note:'（待核 — 扩产周期具体月数）', q3:true, q3note:'（待核 — CPO 架构必须外置高功率光源）', q4:true, q4note:'（待核 — 英伟达/谷歌 1.6T 刚需）', hits:4, strength:'★★★' },
          { name:'长光华芯', code:'688048', q1:false, q1note:'（待核 — 全球 100G/200G EML 供应商家数）', q2:true, q2note:'（待核）', q3:false, q3note:'（待核 — 海外可替代）', q4:true, q4note:'（待核）', hits:2, strength:null }
        ]
      },
      {
        name: '硅光芯片 PIC(设计+代工)',
        stocks: [
          { name:'光迅科技', code:'002281', q1:false, q1note:'（待核 — 硅光设计>5家）', q2:true, q2note:'（待核 — 1.6T 验证>12月）', q3:false, q3note:'（待核 — 中际旭创等可替）', q4:true, q4note:'（待核 — CPO 核心器件）', hits:2, strength:null }
        ]
      },
      {
        name: '光模块制造(充分竞争)',
        stocks: [
          { name:'中际旭创', code:'300308', q1:false, q1note:'（待核 — 全球>10家光模块）', q2:false, q2note:'', q3:false, q3note:'（待核 — 新易盛/光迅/Coherent/II-VI 可替）', q4:false, q4note:'', hits:0, strength:null }
        ]
      }
    ]
  },

  // ⑥ 卡口结论 —— 3 大卡口候选（★★/★★/★★/★ 待核）骨架
  //   rank/name/code/segment/strength 标 "（待核）" 等待核后定 ★★★/★★☆/不通过
  //   logic/tags/valuation/verification 全留骨架
  chokePoints: [
    {
      rank:1, name:'（待核 — 卡口 ① CW 激光器主标的）', code:'（待核）', segment:'100mW+ CW 激光器', strength:'（待核）',
      logic:'（待核 — 150 字卡口逻辑：全球供应商家数 / 扩产周期 / 替代缺位 / 下游刚需 / 公司具体位置）',
      tags:['（待核）','（待核）','（待核）','（待核）'],
      valuation: null,  // 全留 null,数据核实后再注入
      verification: null
    },
    {
      rank:2, name:'（待核 — 卡口 ② 高速 EML 主标的）', code:'（待核）', segment:'100G/200G 高速 EML', strength:'（待核）',
      logic:'（待核 — 150 字卡口逻辑）',
      tags:['（待核）','（待核）','（待核）','（待核）'],
      valuation: null,
      verification: null
    },
    {
      rank:3, name:'（待核 — 卡口 ③ 硅光 PIC 主标的）', code:'（待核）', segment:'硅光 PIC 设计+1.6T 模块', strength:'（待核）',
      logic:'（待核 — 150 字卡口逻辑）',
      tags:['（待核）','（待核）','（待核）','（待核）'],
      valuation: null,
      verification: null
    }
  ],

  // ⑦ 供需缺口 —— 3 条骨架
  supplyGap: [
    { segment:'（待核 — 光芯片）', demand:'—', capacity:'—', gap:'—', rate:'—', bottleneck:'（待核 — 认证周期/扩产周期）', tier:'estimate', src:'待核' },
    { segment:'（待核 — 硅光 PIC）', demand:'—', capacity:'—', gap:'—', rate:'—', bottleneck:'（待核）', tier:'estimate', src:'待核' },
    { segment:'（待核 — 光器件）', demand:'—', capacity:'—', gap:'—', rate:'—', bottleneck:'（待核）', tier:'estimate', src:'待核' }
  ],

  // 方法论边界
  methodologyNotes: '光模块产业链的卡口特征：<strong>制造端(中游) ≥10 家可切换 = 不构成物理卡口</strong>(segments[3] 4 问 0 命中,正确方法论结果);<strong>卡口集中在上游光芯片/硅光 PIC 端</strong>(segments[0-1])。3 大卡口候选 = ① 100mW+ CW 激光器(全球<5家结构性结论)② 100G/200G 高速 EML(海外寡头主导)③ 硅光 PIC 设计+1.6T 模块(A股唯一批量)。**所有"会变"数据(市占/PE/PE分位/营收/净利/缺口/CAGR/六维分)留空标"待核",等 Gemini 端核实后注入**。'
};

})(window.CHAINS);
