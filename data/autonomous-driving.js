// data/autonomous-driving.js — 升级九 STEP 4 小步 2：AUTONOMOUS DRIVING (智能驾驶) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.autonomous-driving 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== AUTONOMOUS DRIVING ====================
CHAINS['autonomous-driving'] = {
  id: 'autonomous-driving', name: '智能驾驶', icon: '🚗',
  plainIntro: {
    analogy: '智能驾驶 = 给汽车装上"眼睛+大脑+小脑"——从L2辅助驾驶到L4无人驾驶，是一场汽车界的"iPhone时刻"',
    paragraphs: [
      '2025年L2辅助驾驶渗透率已达62.6%，2026年<strong>L3+渗透率预计从个位数跃升至20-25%</strong>——意味着400-500万辆新车将自带L3硬件。这不是"未来概念"，而是正在发生的<strong>千万级量产</strong>。产业链从感知（激光雷达/摄像头/毫米波）→决策（智驾芯片/域控制器）→执行（线控底盘），三条链路上都有A股核心标的。',
      '<strong>纯视觉vs多传感器融合之争，对产业链意味着什么？</strong>特斯拉FSD坚持纯视觉（不用激光雷达），国内主流采用多传感器融合路线——激光雷达+摄像头+毫米波。这意味着<strong>激光雷达产业链在国内有巨大增量市场</strong>。禾赛科技（美股）全球车载激光雷达市占33.5%，但A股主要抓上游供应链（炬光科技/万集科技）。域控制器环节确定性最高——不管什么传感器方案，都要用域控制器做信息融合。'
    ],
    flowSteps: ['感知层→激光雷达+摄像头','决策层→智驾芯片+域控制器','执行层→线控制动+转向','整车集成→L3/L4量产'],
    highlightBox: '<strong>💡 物理卡口 视角：智能驾驶产业链的"卡口"更偏向软件/芯片，物理卡口不如PCB/半导体那么硬。但有几个环节接近卡口标准：</strong><br>① <strong>域控制器</strong>：德赛西威高算力域控国内市占近35%第一，深度绑定英伟达（国内唯一Orin授权）+华为+地平线三生态。② <strong>智驾芯片</strong>：英伟达Orin高端垄断（但非A股），国产地平线征程6（560TOPS）追赶。③ <strong>激光雷达上游器件</strong>：炬光科技VCSEL芯片+光学组件是激光雷达核心元器件。④ <strong>线控制动</strong>：伯特利累计订单超500万套，国产市占>50%。'
  },
  overview: [
    { label: '🚗 L2+渗透率（2025）', value: '62.6%', note: '2026 L3+渗透→20-25%', color: 'var(--accent)' },
    { label: '📐 中国智驾市场（2030E）', value: '~3000亿', note: 'L4出租车+物流+乘用车', color: 'var(--blue)' },
    { label: '🏭 产业阶段', value: 'L3量产元年', note: '法规落地+车企L3牌照发放', color: 'var(--green)' },
    { label: '🧠 域控制器', value: '德赛国内35%第一', note: '绑定英伟达+华为+地平线三生态', color: null },
    { label: '📡 激光雷达国内格局', value: '禾赛33.5%+华为+速腾27%', note: '三家合计>89%·禾赛美股非A股', color: 'var(--barrier-high)' },
    { label: '⚡ 核心催化', value: 'L3法规落地+城市NOA普及', note: '比亚迪/理想/小鹏/小米全系标配', color: null },
    { label: '🔴 核心矛盾', value: '智驾芯片仍依赖英伟达', note: '地平线征程6追赶·华为MDC自成体系', color: 'var(--red)' },
    { label: '📋 线控制动国产化率', value: '伯特利国产>50%', note: 'WCBS累计订单>500万套', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: '乘用车(L3)·商用车·无人配送·Robotaxi', barrier: 'low', note: '比亚迪/理想/小鹏/蔚来/小米→智驾下沉全系标配' },
    midstream: { name: 'Tier1系统集成（华为/德赛西威/经纬恒润）', barrier: 'low', note: '华为智驾方案渗透率快速提升·德赛域控第一' },
    equipment: [
      { name: '域控制器', barrier: 'high', choke: true, note: '德赛高算力域控国内35%第一·绑定英伟达独家' },
      { name: '激光雷达', barrier: 'extreme', choke: true, note: '禾赛33.5%(美股)·A股抓上游器件' },
      { name: '智驾芯片/SoC', barrier: 'extreme', choke: false, note: '英伟达Orin高端垄断·地平线(港股)国产替代' }
    ],
    materials: [
      { name: '线控制动(WCBS)', barrier: 'high', choke: true, note: '伯特利国产>50%·订单>500万套' },
      { name: '车载摄像头(CIS+镜头)', barrier: 'high', choke: false, note: '韦尔股份/联创电子→车载CIS龙头' },
      { name: '4D毫米波雷达', barrier: 'high', choke: false, note: '华域汽车→国产替代' }
    ],
    sideBranches: [
      { name: '线控转向+悬架', barrier: 'high', note: '浙江世宝/拓普集团→执行层全链' },
      { name: '高精地图(四维图新)', barrier: 'high', note: '覆盖全国45万公里·lobbying中' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// Autonomous Driving Segments
CHAINS['autonomous-driving'].segments = [
  {
    name: '域控制器 — 智驾"大脑"', costRatio: '智驾系统~30%', barrier: 'high', choke: true, border: true,
    intro: '域控制器是智能驾驶的<strong>核心决策单元</strong>——把激光雷达、摄像头、毫米波等传感器的数据融合计算，输出驾驶决策。德赛西威高算力智驾域控国内市占近<strong>35%第一</strong>，是国内唯一获英伟达Orin授权的域控供应商。2025年智驾域控营收41.47亿（+55.49%）。经纬恒润国内第二龙。卡口判定：德赛是英伟达生态的<strong>独家入口</strong>——任何想用英伟达芯片的车企必须经过德赛的域控方案。',
    globalLandscape: [
      { lbl: '🥇 德赛西威（中）', val: '高算力域控国内35%第一', note: '国内唯一英伟达Orin授权+华为+地平线三生态' },
      { lbl: '🥈 经纬恒润（中）', val: '国内域控第二龙', note: '智驾+底盘域控双龙·新增定点年化>80亿' },
      { lbl: '🥉 华为（中）', val: 'MDC智驾全家桶', note: '自研芯片+域控+算法·车企接受度提升' }
    ],
    stocks: [
      { rank:1, name:'德赛西威', code:'002920', position:'高算力域控国内35%第一·英伟达独家授权', barrier:'极高', hits:4, strength:'★★★', logic:'国内唯一英伟达Orin授权域控供应商。2025营收~200亿+40%/净利~25亿+50%。全系车企覆盖。华为+地平线双备份。域控赛道确定性最高' },
      { rank:2, name:'经纬恒润', code:'688326', position:'域控+底盘域控双龙', barrier:'高', hits:null, strength:null, logic:'智驾域控营收+60%。新增定点年化>80亿。但域控市场份额远低于德赛' },
      { rank:3, name:'中科创达', code:'300496', position:'智驾OS龙头·市占40%', barrier:'高', hits:null, strength:null, logic:'操作系统+中间件层。与高通/英伟达/地平线深度绑定' }
    ]
  },
  {
    name: '激光雷达 — "眼睛"上游器件', costRatio: '智驾系统~25%', barrier: 'extreme', choke: true, border: true,
    intro: '激光雷达是L3+智驾的<strong>核心传感器</strong>——通过发射激光束构建三维点云。核心器件：<strong>激光发射器(VCSEL/EEL芯片)、探测器(SPAD/APD)、扫描器(转镜/MEMS)、光学组件</strong>。全球车载激光雷达龙头禾赛科技（美股）国内市占33.5%，120+车型定点。A股主要抓上游器件：炬光科技的VCSEL芯片+光学组件是激光雷达核心元器件，供应头部激光雷达厂商。',
    globalLandscape: [
      { lbl: '🥇 禾赛科技（美股）', val: '全球车载激光雷达33.5%', note: '120+车型定点·营收30.28亿+45.79%' },
      { lbl: '🥈 速腾聚创（中）', val: '市占~27%', note: '比亚迪80%份额·港股上市' },
      { lbl: '🥉 炬光科技（中）', val: '上游VCSEL+光学组件核心供应商', note: '供禾赛/速腾/华为激光雷达' }
    ],
    stocks: [
      { rank:1, name:'炬光科技', code:'688167', position:'激光雷达VCSEL芯片+光学组件核心供应商', barrier:'极高', hits:3, strength:'★★☆', logic:'全球>3家VCSEL芯片供应商。供应禾赛/速腾/华为激光雷达。但下游激光雷达厂可切换供应商→非独家' },
      { rank:2, name:'万集科技', code:'300552', position:'激光雷达+车路协同双龙', barrier:'高', hits:null, strength:null, logic:'车规级激光雷达已量产。V2X/RSU同时受益。但激光雷达销量远小于禾赛/速腾' }
    ]
  },
  {
    name: '线控制动 — L3+的"安全底线"', costRatio: '底盘~15%', barrier: 'high', choke: true, border: false,
    intro: 'L3+自动驾驶要求制动系统<strong>完全解耦（不依赖驾驶员踩踏板）</strong>，线控制动（Brake-by-Wire）是唯一方案。伯特利WCBS累计订单超<strong>500万套</strong>，国产市占>50%，深度绑定奇瑞/吉利/长安等国产主力车型。核心壁垒：①安全认证周期3-5年；②与整车底盘深度绑定→一旦定点几乎不换。',
    globalLandscape: [
      { lbl: '🥇 博世（德）+大陆（德）', val: '全球线控制动双寡头', note: 'iBooster+MK系列垄断高端' },
      { lbl: '🥈 伯特利（中）', val: '国产线控制动>50%市占', note: 'WCBS订单>500万套·深度绑定奇瑞/吉利' },
      { lbl: '🥉 拓普集团（中）', val: '集成式线控底盘', note: '特斯拉核心供应商·底盘全链覆盖' }
    ],
    stocks: [
      { rank:1, name:'伯特利', code:'603596', position:'线控制动国产>50%·订单>500万套', barrier:'极高', hits:3, strength:'★★☆', logic:'WCBS订单>500万套。安全认证周期3-5年→一旦定点极难替换。与整车底盘深度绑定。国产替代博世/大陆' },
      { rank:2, name:'拓普集团', code:'601689', position:'集成式线控底盘龙头', barrier:'高', hits:null, strength:null, logic:'特斯拉核心供应商。底盘制动+转向+悬架全链。多点开花但单一环节市占不突出' }
    ]
  },
  {
    name: '车载摄像头 + 智驾感知', costRatio: '感知~20%', barrier: 'high', choke: false, border: false,
    intro: '车载摄像头是<strong>所有传感器路线（纯视觉/融合）都必须的</strong>。单车配备5-12颗，随智驾等级提升而增加。核心器件：CIS芯片（韦尔股份全球市占>29%）+光学镜头（联创电子ADAS镜头市占~18%）+模组。卡口判定：全球供应商>10家→不构成寡头。但韦尔/联创在各自细分有强壁垒。',
    globalLandscape: [
      { lbl: '韦尔股份（中）', val: '车载CIS全球>29%', note: '仅次于Onsemi/Omnivision' },
      { lbl: '联创电子（中）', val: 'ADAS镜头市占~18%', note: '深度绑定特斯拉/华为' }
    ],
    stocks: [
      { rank:1, name:'韦尔股份', code:'603501', position:'车载CIS全球>29%', barrier:'高', hits:null, strength:null, logic:'全球TOP3车载CIS供应商。图像传感器是摄像头核心器件（价值量>50%）。竞争格局优于其他感知环节' },
      { rank:2, name:'联创电子', code:'002036', position:'ADAS镜头市占~18%', barrier:'高', hits:null, strength:null, logic:'深度绑定特斯拉/华为。ADAS镜头认证周期>12月' }
    ]
  }
];

// Autonomous Driving Midstream
CHAINS['autonomous-driving'].midstream = {
  description: 'Tier1系统集成和整车环节格局分散。华为智驾方案渗透率快速提升（自研芯片+软件+域控全家桶），但其他A股Tier1标的非寡头。智能驾驶整车企业众多→不构成卡口。',
  stocks: [
    { rank:1, name:'德赛西威', code:'002920', barrier:'极高', note:'域控国内第一+英伟达生态独家入口+华为/地平线双备份' },
    { rank:2, name:'经纬恒润', code:'688326', barrier:'高', note:'智驾+底盘域控双龙·新增定点年化>80亿' },
    { rank:3, name:'伯特利', code:'603596', barrier:'极高', note:'线控制动国产>50%·WCBS订单>500万套·安全认证壁垒' }
  ]
};

// Autonomous Driving Four Questions
CHAINS['autonomous-driving'].fourQuestions = {
  segments: [
    {
      name: '域控制器',
      stocks: [
        { name:'德赛西威', code:'002920', q1:true, q1note:'国内唯一Orin授权域控', q2:true, q2note:'客户定点排他2-3年', q3:true, q3note:'英伟达生态独家入口', q4:true, q4note:'L2+/L3必须域控', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '激光雷达上游器件',
      stocks: [
        { name:'炬光科技', code:'688167', q1:true, q1note:'VCSEL全球<5家', q2:true, q2note:'光学器件认证>12月', q3:false, q3note:'Lumentum/ams可替', q4:true, q4note:'L3+必需', hits:3, strength:'★★☆' }
      ]
    },
    {
      name: '线控制动',
      stocks: [
        { name:'伯特利', code:'603596', q1:true, q1note:'国产>50%', q2:true, q2note:'认证周期3-5年', q3:true, q3note:'L3/L4不可跳过', q4:true, q4note:'法规强制', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '车载摄像头（竞争分散）',
      stocks: [
        { name:'韦尔股份', code:'603501', q1:false, q1note:'全球≥5家CIS', q2:false, q2note:'', q3:false, q3note:'Onsemi/Sony可替', q4:false, q4note:'', hits:0, strength:null }
      ]
    }
  ]
};

// Autonomous Driving Choke Points
CHAINS['autonomous-driving'].chokePoints = [
  { rank:1, name:'德赛西威', code:'002920', segment:'域控制器', strength:'★★★', logic:'国内<strong>唯一</strong>获英伟达Orin授权域控供应商。高算力域控市占近35%。深度绑定英伟达+华为+地平线三生态。2025营收~200亿+40%。域控是智驾的核心决策单元→没有域控就没有L2+/L3。客户定点后锁定2-3年→极难替换。', tags:['国内唯一Orin授权','市占35%','英伟达生态独家入口','锁定2-3年'] },
  { rank:2, name:'伯特利', code:'603596', segment:'线控制动', strength:'★★★', logic:'国产线控制动<strong>>50%</strong>市占。WCBS累计订单>500万套。安全认证周期3-5年→一旦定点几乎不换。L3+法规强制要求电子制动解耦→线控制动是不可跳过的安全底线。深度绑定奇瑞/吉利/长安等主力车企。', tags:['国产>50%','订单>500万套','认证3-5年','L3+法规强制'] },
  { rank:3, name:'炬光科技', code:'688167', segment:'激光雷达上游器件', strength:'★★☆', logic:'VCSEL芯片+光学组件是激光雷达核心元器件。全球<5家能量产车规级VCSEL。供应禾赛/速腾/华为。但下游激光雷达厂可切换供应商→降级。且禾赛/速腾本身竞争激烈→上游面临降价压力。', tags:['VCSEL全球<5家','核心元器件','供应商可切换','下游价格战'] }
];
CHAINS['autonomous-driving'].supplyGap = [
  { segment:'英伟达Orin授权域控', demand:'L2+/L3全系车企', capacity:'德赛独供+华为自研', gap:'英伟达生态=德赛独家', rate:'100%', bottleneck:'英伟达Orin产能+车企定点排他' },
  { segment:'线控制动(WCBS)', demand:'L3+渗透率20-25%→500万+', capacity:'伯特利+博世+大陆', gap:'国产产能不足', rate:'~30%', bottleneck:'认证周期3-5年' }
];
CHAINS['autonomous-driving'].methodologyNotes = '智能驾驶是"软硬结合"赛道，纯物理卡口逻辑适用性中等。域控制器（德赛）和线控制动（伯特利）最接近物理卡口标准——都是独家/高市占+认证周期极长+下游刚需。但激光雷达/摄像头/毫米波等感知环节竞争格局分散→不符合寡头条件。智驾芯片的最大玩家英伟达/高通不在A股，国产地平线（港股）是最接近的替代标的。';


})(window.CHAINS);
