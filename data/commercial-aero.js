// data/commercial-aero.js — 升级九 STEP 4 小步 2：COMMERCIAL AEROSPACE (商业航天) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.commercial-aero 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== COMMERCIAL AEROSPACE ====================
CHAINS['commercial-aero'] = {
  id: 'commercial-aero', name: '商业航天', icon: '🚀',
  plainIntro: {
    analogy: '商业航天 = "太空版互联网基建"——把4.2万颗卫星撒到低轨道，让全球任何角落都能上网',
    paragraphs: [
      'SpaceX星链已经发射了>7000颗卫星，在全球100+国家提供服务。中国的对标方案是<strong>千帆星座（上海垣信）和GW星座（中国星网）</strong>——两个巨型低轨卫星互联网计划，合计规划>2万颗卫星。截至2026年5月，千帆星座在轨卫星已达<strong>162颗</strong>（年底目标324颗），中国已向国际电信联盟（ITU）新申请超<strong>20万颗</strong>卫星频轨资源（较此前总量提升5倍），产业链天花板瞬间打开。',
      '商业航天产业链的核心逻辑：<strong>低轨卫星必须5-7年内完成部署（频轨资源"先占先得"），制造+发射必须从"手工作坊"切换到"流水线批量生产"</strong>。2025年中国商业航天发射50次（占全国54%）、入轨商业卫星311颗（占全国84%）。关键瓶颈：① 星载相控阵T/R芯片（铖昌科技/国博电子→卫星的"天线阵列核心"）；② 通信载荷（上海瀚讯→华为低轨项目载荷供应商）；③ 可回收火箭（蓝箭等→降本90%的关键）。'
    ],
    flowSteps: ['卫星平台+载荷制造','火箭发射→一箭多星','卫星入轨→星座组网','地面信关站→终端','手机直连卫星→全球覆盖'],
    highlightBox: '<strong>💡 物理卡口 视角：商业航天最核心的物理卡口在上游核心器件——卫星的"眼睛"和"嘴巴"：</strong><br>① <strong>星载相控阵T/R芯片</strong>：这是卫星通信的核心器件（每颗星几百到上千颗芯片），铖昌科技国内龙头。全球仅3-4家能量产（铖昌/国博+ADI/Anokiwave）。② <strong>通信载荷</strong>：上海瀚讯华为低轨项目载荷供应商→华为不是谁都能做的。③ <strong>卫星总装</strong>：中国卫星国家队→千帆星座批量交付核心。④ <strong>频轨资源</strong>：不是A股标的，但20万颗新申请打开了5倍产业空间。'
  },
  overview: [
    { label: '🛰️ 千帆星座在轨卫星', value: '162颗(2026.5)', note: '年底目标324颗·最终规划>1.2万颗', color: 'var(--accent)' },
    { label: '🇨🇳 中国新申请频轨资源', value: '>20万颗', note: '较此前5.13万颗提升5倍→产业链天花板', color: 'var(--red)' },
    { label: '🚀 2025商业航天发射', value: '50次(占全国54%)', note: '入轨商业卫星311颗(占84%)', color: 'var(--blue)' },
    { label: '🏭 产业阶段', value: '批量交付期', note: '从技术验证→批量制造/密集发射', color: 'var(--green)' },
    { label: '📡 卫星制造市场规模', value: '单星成本~$50万', note: '千帆+GW合计>2万颗→制造市场>千亿', color: null },
    { label: '⚡ 核心催化', value: '可回收火箭突破', note: '蓝箭等5家火箭公司递交上市申请', color: null },
    { label: '🔴 核心矛盾', value: '发射成本+产能不足', note: '卫星制造从手工→流水线的转型期瓶颈', color: 'var(--red)' },
    { label: '📋 T/R芯片国产化', value: '铖昌已批量交付', note: '相控阵天线是卫星通信核心→单星几百颗芯片', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: '手机直连卫星·远洋通信·应急救灾·航空WiFi·IoT', barrier: 'low', note: '华为Mate已支持天通卫星通信→C端普及在即' },
    midstream: { name: '卫星总装+火箭发射+星座运营', barrier: 'low', note: '中国卫星(国家队)·千帆/星网运营·蓝箭/天兵等火箭→竞争激烈' },
    equipment: [
      { name: '星载相控阵T/R芯片', barrier: 'extreme', choke: true, note: '铖昌科技龙头·全球仅3-4家量产' },
      { name: '通信载荷集成', barrier: 'extreme', choke: true, note: '上海瀚讯→华为低轨项目载荷供应商' }
    ],
    materials: [
      { name: '激光通信终端(星间链路)', barrier: 'high', choke: false, note: '航天电子→星网核心供应商' },
      { name: '地面信关站/终端芯片', barrier: 'high', choke: false, note: '海格通信→全系列天通终端及芯片' }
    ],
    sideBranches: [
      { name: '商业火箭→可回收(蓝箭/天兵)', barrier: 'extreme', note: '5家火箭公司递交上市申请·A股尚无纯正标的' },
      { name: '手机直连卫星(华为生态)', barrier: 'high', note: '华力创通→华为卫星基带芯片供应商' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

CHAINS['commercial-aero'].segments = [
  {
    name: '星载相控阵T/R芯片 — 卫星的"天线阵列核心"', costRatio: '星载成本~20%+', barrier: 'extreme', choke: true, border: true,
    intro: '低轨卫星通信的核心是<strong>相控阵天线</strong>——通过几百到上千颗T/R（收发）芯片电控波束方向，像手电筒一样精准指向地面用户。每颗卫星需要几百到上千颗T/R芯片→千帆+GW合计>2万颗卫星→T/R芯片总需求<strong>数亿颗</strong>。全球能批量供应星载级T/R芯片的企业仅<strong>铖昌科技/国博电子+ADI/Anokiwave</strong>等3-4家。铖昌科技已批量交付千帆星座。',
    globalLandscape: [
      { lbl: '🥇 铖昌科技（中）', val: '星载相控阵T/R芯片龙头', note: '已批量交付千帆星座' },
      { lbl: '🥈 国博电子（中）', val: '相控阵天线核心器件', note: '星载+地面终端双线' },
      { lbl: '🥉 ADI+Anokiwave（美）', val: '全球T/R芯片双寡头', note: '技术最成熟但受出口管制' }
    ],
    stocks: [
      { rank:1, name:'铖昌科技', code:'001270', position:'星载相控阵T/R芯片龙头·已批量交付', barrier:'极高', hits:4, strength:'★★★', logic:'全球仅3-4家星载T/R芯片量产。已批量交付千帆星座。单星几百到上千颗芯片→万星×千颗=数亿颗需求。出口管制→国产替代红利' },
      { rank:2, name:'国博电子', code:'688375', position:'相控阵天线核心器件', barrier:'高', hits:null, strength:null, logic:'星载+地面终端双线布局。相控阵天线核心供应商。但T/R芯片市占率被铖昌压制' }
    ]
  },
  {
    name: '通信载荷 — 卫星的"路由器+信号塔"', costRatio: '星载成本~25%+', barrier: 'extreme', choke: true, border: true,
    intro: '通信载荷是卫星的<strong>核心功能组件</strong>——负责信号的收发/处理/转发。技术难度极高：需要在太空极端温度/辐射环境下稳定工作5-7年，同时功耗/重量严格受限。上海瀚讯是<strong>华为低轨卫星项目载荷供应商</strong>，手机直连卫星5G正样件已交付。通信载荷的壁垒类似通信设备中的"基站"——技术壁垒+客户认证周期极长。',
    globalLandscape: [
      { lbl: '🥇 上海瀚讯（中）', val: '华为低轨项目载荷供应商', note: '手机直连5G正样件已交付' },
      { lbl: '🥈 航天电子（中）', val: '火箭电子+激光通信终端', note: '星网核心供应商·横跨火箭+卫星' }
    ],
    stocks: [
      { rank:1, name:'上海瀚讯', code:'300762', position:'华为低轨项目载荷供应商·手机直连5G', barrier:'极高', hits:3, strength:'★★☆', logic:'华为低轨项目载荷独家供应商。手机直连卫星5G正样件已交付。通信载荷壁垒=太空级硬件+华为认证+客户绑定。但非华为独家→降级' },
      { rank:2, name:'航天电子', code:'600879', position:'星网核心供应商·横跨火箭+卫星', barrier:'高', hits:null, strength:null, logic:'火箭电子+激光通信终端双线。星网批量交付。军方背景>民用弹性' }
    ]
  },
  {
    name: '卫星总装+地面终端', costRatio: '—', barrier: 'high', choke: false, border: false,
    intro: '卫星总装制造是劳动密集型→多型号共线生产→不构成寡头。中国卫星（国家队）千帆星座批量交付核心单位。海格通信全系列天通终端及芯片→地面侧核心。地面终端市场比卫星制造更大（每颗星配成千上万终端）。',
    globalLandscape: [
      { lbl: '中国卫星（中）', val: '卫星总装国家队', note: '千帆星座批量交付' },
      { lbl: '海格通信（中）', val: '全系列天通终端及芯片', note: '地面终端侧核心' }
    ],
    stocks: [
      { rank:1, name:'中国卫星', code:'600118', position:'卫星总装国家队·千帆批量交付', barrier:'高', hits:null, strength:null, logic:'千帆星座批量交付核心单位。军方背景稳定订单。但卫星总装>3家→非寡头' },
      { rank:2, name:'海格通信', code:'002465', position:'全系列天通终端及芯片', barrier:'高', hits:null, strength:null, logic:'地面终端市场>卫星制造。天通全系列芯片+终端。地面站+信关站双线' }
    ]
  }
];

CHAINS['commercial-aero'].fourQuestions = {
  segments: [
    {
      name: '星载相控阵T/R芯片',
      stocks: [
        { name:'铖昌科技', code:'001270', q1:true, q1note:'全球仅3-4家量产', q2:true, q2note:'星载认证周期>18月', q3:true, q3note:'相控阵天线不可跳过', q4:true, q4note:'千帆/GW星座必须T/R', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '通信载荷',
      stocks: [
        { name:'上海瀚讯', code:'300762', q1:true, q1note:'华为低轨独家载荷商', q2:true, q2note:'太空级认证>24月', q3:true, q3note:'通信载荷不可跳过', q4:true, q4note:'低轨卫星刚需', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '卫星总装（竞争分散）',
      stocks: [
        { name:'中国卫星', code:'600118', q1:false, q1note:'卫星总装>3家', q2:false, q2note:'', q3:false, q3note:'长光/微纳可替', q4:true, q4note:'', hits:1, strength:null }
      ]
    }
  ]
};

CHAINS['commercial-aero'].chokePoints = [
  { rank:1, name:'铖昌科技', code:'001270', segment:'星载相控阵T/R芯片', strength:'★★★', logic:'全球<strong>仅3-4家</strong>能批量供应星载级相控阵T/R芯片。千帆星座+G60+GW星座合计>2万颗卫星→单星几百到上千颗芯片→总需求数亿颗。T/R芯片是卫星通信的核心器件→不可跳过。ADI/Anokiwave受出口管制→国产替代是刚需。已批量交付千帆星座。', tags:['全球仅3-4家','数亿颗需求','出口管制红利','国产不可替代'] },
  { rank:2, name:'上海瀚讯', code:'300762', segment:'通信载荷集成', strength:'★★★', logic:'<strong>华为低轨卫星项目载荷供应商</strong>——能够获得华为认证本身就是最大的壁垒。手机直连卫星5G正样件已交付。通信载荷的太空级硬件要求+华为认证+与星载平台深度绑定→替换难度极高。华为低轨项目是千帆星座最核心的通信载荷方案→上海瀚讯是唯一供应渠道。', tags:['华为独家载荷商','太空级认证','手机直连5G','唯一供应渠道'] }
];
CHAINS['commercial-aero'].supplyGap = [
  { segment:'星载T/R芯片', demand:'万星×千颗=数亿颗需求(~数百亿市场)', capacity:'全球3-4家供应商有效产能', gap:'缺口>30%', rate:'>30%', bottleneck:'星载认证周期>18月' },
  { segment:'可回收火箭(降本关键)', demand:'千帆/GW需>1000次发射', capacity:'长征系列+商业火箭~100次/年', gap:'发射频率需翻倍', rate:'>50%缺口', bottleneck:'可回收技术+发射工位不足' }
];
CHAINS['commercial-aero'].methodologyNotes = '商业航天是典型的"国家队+商业队"混合赛道。物理卡口最确定的是上游核心器件（T/R芯片/通信载荷）——供应商极少、认证周期极长、下游需求爆发。但中下游（卫星总装/火箭发射/运营）参与者多→不构成寡头。商业火箭是最大的弹性环节（可回收火箭降本90%），但蓝箭/天兵等头部公司尚未上市→A股目前无纯正火箭标的。频轨资源新申请20万颗是最大产业催化→打开了产业链5倍空间。';


})(window.CHAINS);
