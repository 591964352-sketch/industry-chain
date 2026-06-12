// data/low-altitude.js — 升级九 STEP 4 小步 2：LOW-ALTITUDE ECONOMY (低空经济) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.low-altitude 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== LOW-ALTITUDE ECONOMY ====================
CHAINS['low-altitude'] = {
  id: 'low-altitude', name: '低空经济', icon: '✈️',
  plainIntro: {
    analogy: '低空经济 = "空中出租车+无人机物流+空中的士站"——把地面交通搬到300米以下空域，从二维升级到三维',
    paragraphs: [
      '低空经济不只是"造飞行器"，而是<strong>飞行器制造+空管系统+起降场+运营服务</strong>四个维度同时从0→1。2026年是低空经济的<strong>"建设提速年"</strong>——"十五五"规划把低空装备、低空基建双双列入专栏，五部委联合发文夯实"数字底座"。亿航智能全球首家获载人eVTOL全链条适航证，2026年3月正式开启售票商业化运营。',
      '<strong>低空经济产业链的"卡口"在哪？</strong>和此前的AI硬件赛道不同，低空经济的核心瓶颈不是"某种材料只有3家能做"，而是<strong>适航取证+空域管理+基础设施三层壁垒</strong>。适航取证周期3-5年（亿航花了3年多），空管系统需要与民航体系深度绑定（莱斯信息国家队垄断），起降场/通信覆盖需要政府规划→这些壁垒比纯技术壁垒更难突破。'
    ],
    flowSteps: ['适航取证→TC/PC/AC','eVTOL/无人机整机制造','空管系统→通信+导航+监视','起降场/充电桩基建','商业运营→客运/物流/巡检'],
    highlightBox: '<strong>💡 物理卡口 视角：低空经济的"卡口"是复合型的——硬件+许可+基础设施：</strong><br>① <strong>空管系统</strong>：莱斯信息是民航空管系统国家队（"天幕"系统），低空飞行必须通过其批准的空域管理系统→许可壁垒类似"只有它发了牌照"。② <strong>适航取证</strong>：亿航全球首家全链条适航证→领先优势3年+。③ <strong>碳纤维机身</strong>：光威复材航空级碳纤维市占>60%→物理卡口（全球仅3-4家T800+量产）。④ <strong>通航运营</strong>：中信海直"国家队"拥有全国最大直升机机队。'
  },
  overview: [
    { label: '✈️ 中国低空经济市场(2030E)', value: '~2万亿', note: 'CAGR>50%·政策十五五重点专栏', color: 'var(--accent)' },
    { label: '🏗️ 上海低空目标(2028)', value: '核心产业~800亿', note: '建设"世界eVTOL之都"', color: 'var(--blue)' },
    { label: '🛩️ 亿航EH216-S', value: '全球首家全链条适航证', note: '2026.3正式售票商业运营·交付221架', color: 'var(--green)' },
    { label: '🏭 产业阶段', value: '建设提速年(2026)', note: '适航标准发布+基建规划+试点运营', color: null },
    { label: '📐 eVTOL取证竞争', value: '亿航领先3年+', note: '峰飞V2000CG全球首款吨级货运eVTOL取证', color: null },
    { label: '⚡ 核心催化', value: '十五五专栏+适航审定加速', note: '全球首部载人eVTOL适航标准发布', color: null },
    { label: '🔴 核心矛盾', value: 'eVTOL主机厂多未上市', note: '亿航美股/沃飞长空未上市·A股抓配套+基建', color: 'var(--red)' },
    { label: '📋 千帆星座卫星', value: '162颗→年底324颗', note: '商业航天与低空共享空域管理逻辑', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: '载人客运(eVTOL)·物流配送·巡检·农业·应急', barrier: 'low', note: '亿航2026.3正式售票·初期场景→旅游观光+跨城通勤' },
    midstream: { name: 'eVTOL/无人机制造+运营服务', barrier: 'low', note: '亿航(美股)/万丰奥威/纵横股份→主机厂竞争激烈·无卡口' },
    equipment: [
      { name: '空管系统(U-space/ATM)', barrier: 'extreme', choke: true, note: '莱斯信息国家队·"天幕"系统独家' },
      { name: '碳纤维航空机身材料', barrier: 'extreme', choke: true, note: '光威复材T800+市占>60%·全球仅3-4家' }
    ],
    materials: [
      { name: 'eVTOL电推进系统(电机+电控)', barrier: 'high', choke: false, note: '卧龙电驱→小鹏汇天/亿航核心供应商' },
      { name: '低空通信/导航/监视(CNS)', barrier: 'high', choke: false, note: '四川九洲→低空"红绿灯"监视方案' },
      { name: '适航检测服务', barrier: 'high', choke: false, note: '广电计量→适航审定检测' }
    ],
    sideBranches: [
      { name: '通航运营(中信海直)', barrier: 'high', note: '全国最大直升机机队·eVTOL运营筹备中' },
      { name: '工业无人机(纵横/航天彩虹)', barrier: 'mid', note: '物流/巡检/测绘已商业化' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

CHAINS['low-altitude'].segments = [
  {
    name: '空管系统 — 低空的"空中交通管制"', costRatio: '基建投资~25%', barrier: 'extreme', choke: true, border: true,
    intro: '低空经济要安全运行，<strong>必须先有空中交通管制系统（U-space/ATM）</strong>——管理飞行器申请/航线规划/冲突避让/应急指挥。莱斯信息是<strong>民航空管系统国家队</strong>，其"天幕"系统是低空飞行服务保障体系的底层技术底座。空管系统的壁垒不是"技术"而是<strong>许可+体系绑定</strong>——民航局指定的空域管理系统只有它能做，替换成本=整个民航体系重建。全球类似定位的企业≤5家。',
    globalLandscape: [
      { lbl: '🥇 莱斯信息（中）', val: '民航空管国家队·"天幕"系统独家', note: '低空飞行必须通过其批准的空域管理系统' },
      { lbl: '🥈 四川九洲（中）', val: '空管通信+低空监视', note: '低空"红绿灯"监视方案' },
      { lbl: '🥉 中科星图（中）', val: '低空云平台+数字孪生', note: '低空监测"数字底座"' }
    ],
    stocks: [
      { rank:1, name:'莱斯信息', code:'688631', position:'民航空管国家队·低空"天幕"系统独家', barrier:'极高', hits:4, strength:'★★★', logic:'民航局指定的空域管理系统唯一供应商。U-space低空飞行服务底层技术底座。低空经济"基建"→必须先建空管才能飞。全球类似定位≤5家' },
      { rank:2, name:'四川九洲', code:'000801', position:'空管通信设备+低空监视方案', barrier:'高', hits:null, strength:null, logic:'低空"红绿灯"监视方案供应商。提供低空目标监视/识别/跟踪解决方案。但空管核心软件被莱斯垄断' }
    ]
  },
  {
    name: '碳纤维航空材料 — eVTOL的"轻量化骨骼"', costRatio: 'eVTOL机身~20%', barrier: 'extreme', choke: true, border: true,
    intro: 'eVTOL（电动垂直起降飞行器）对重量极度敏感——<strong>每减轻1kg=多飞1分钟</strong>。航空级碳纤维复合材料（T800+级别）是eVTOL机身的必需材料。全球能批量供应<strong>T800+航空级碳纤维</strong>的企业仅东丽（日）/光威复材（中）/赫氏（美）/东邦（日）3-4家。光威复材市占超60%，为亿航/小鹏汇天/沃飞长空等几乎所有国产eVTOL提供机身材料。',
    globalLandscape: [
      { lbl: '🥇 光威复材（中）', val: '航空级碳纤维市占>60%', note: '供应几乎所有国产eVTOL·全球仅3-4家T800+量产' },
      { lbl: '🥈 东丽（日）+赫氏（美）', val: '全球碳纤维双寡头', note: 'T1000+更高端但价格昂贵' }
    ],
    stocks: [
      { rank:1, name:'光威复材', code:'300699', position:'航空级碳纤维市占>60%·国产eVTOL标配', barrier:'极高', hits:3, strength:'★★☆', logic:'T800+航空级碳纤维全球仅3-4家量产。国产eVTOL全系供应商。军品+民品双壁垒。但东丽/赫氏可替代→非独家' }
    ]
  },
  {
    name: 'eVTOL整机制造 — 主机厂竞争激烈', costRatio: '—', barrier: 'high', choke: false, border: false,
    intro: 'eVTOL整机制造是低空经济最受关注的环节，但竞争格局极度分散——全球>200个eVTOL项目。亿航智能（美股）全球首家全链条适航证，领先3年+。万丰奥威收购Volocopter资产全球布局。A股纯正eVTOL主机厂标的极少——主要抓配套和关联映射。',
    globalLandscape: [
      { lbl: '亿航智能（美股）', val: '全球首家全链条适航证(TC/PC/AC)', note: 'EH216-S售票运营·交付221架·Non-GAAP盈利' },
      { lbl: '万丰奥威（中）', val: '收购Volocopter全球eVTOL布局', note: '通过收购钻石飞机切入轻量化结构件' },
      { lbl: '纵横股份（中）', val: '工业无人机龙头·垂直起降固定翼', note: '2025年成功扭亏为盈' }
    ],
    stocks: [
      { rank:1, name:'万丰奥威', code:'002085', position:'收购Volocopter→全球eVTOL布局', barrier:'高', hits:null, strength:null, logic:'A股最接近eVTOL整机的标的。收购Volocopter+钻石飞机双线。但eVTOL认证尚早→短期业绩贡献有限' },
      { rank:2, name:'纵横股份', code:'688070', position:'工业无人机龙头·已扭亏', barrier:'中', hits:null, strength:null, logic:'垂直起降固定翼市占率领先。2025年成功扭亏。工业无人机先行→eVTOL布局中' }
    ]
  },
  {
    name: '通航运营 — "空中出租车"队', costRatio: '—', barrier: 'high', choke: false, border: false,
    intro: '通航运营是低空经济的"最后一公里"——拥有飞行器机队+飞行员+航线网络的企业。中信海直是<strong>通航运营"国家队"</strong>，拥有全国最大直升机机队，已与主流eVTOL制造商建立沟通机制，视适航取证节奏适时开展eVTOL运营。已开通eVTOL海上石油运输与跨城物流航线。',
    globalLandscape: [
      { lbl: '中信海直（中）', val: '全国最大直升机机队·通航国家队', note: 'eVTOL海上石油运输+跨城物流已开通' }
    ],
    stocks: [
      { rank:1, name:'中信海直', code:'000099', position:'通航运营国家队·全国最大直升机机队', barrier:'高', hits:null, strength:null, logic:'与主流eVTOL制造商均建立沟通。已开通eVTOL航线。通航运营壁垒→机队+飞行员+航线许可' }
    ]
  }
];

CHAINS['low-altitude'].fourQuestions = {
  segments: [
    {
      name: '空管系统（莱斯信息）',
      stocks: [
        { name:'莱斯信息', code:'688631', q1:true, q1note:'民航局指定唯一系统', q2:true, q2note:'体系绑定.替换=民航重建', q3:true, q3note:'低空飞行不可跳过空管', q4:true, q4note:'法规强制配备', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '碳纤维航空材料',
      stocks: [
        { name:'光威复材', code:'300699', q1:true, q1note:'全球仅3-4家T800+', q2:true, q2note:'认证周期>18月', q3:false, q3note:'东丽/赫氏可替', q4:true, q4note:'eVTOL轻量化刚需', hits:3, strength:'★★☆' }
      ]
    },
    {
      name: 'eVTOL整机（竞争激烈）',
      stocks: [
        { name:'万丰奥威', code:'002085', q1:false, q1note:'全球>200个项目', q2:false, q2note:'', q3:false, q3note:'亿航/沃飞/小鹏可替', q4:true, q4note:'低空经济核心载体', hits:1, strength:null }
      ]
    }
  ]
};

CHAINS['low-altitude'].chokePoints = [
  { rank:1, name:'莱斯信息', code:'688631', segment:'空管系统(U-space)', strength:'★★★', logic:'<strong>民航局指定唯一</strong>空域管理系统供应商。"天幕"系统是低空U-space的底层技术底座。低空经济必须先建空管→所有飞行器起飞必须经过其批准的空域管理系统。这个壁垒不是技术壁垒而是<strong>许可壁垒</strong>——替换成本=整个民航体系重建。全球类似定位企业≤5家。', tags:['民航局指定唯一','许可壁垒','低空必须先建空管','全球≤5家'] },
  { rank:2, name:'光威复材', code:'300699', segment:'航空级碳纤维', strength:'★★☆', logic:'航空级T800+碳纤维<strong>全球仅3-4家</strong>量产。国产eVTOL全系标配。市占>60%。但东丽/赫氏可替代→非绝对寡头。碳纤维卡口虽不完美，但eVTOL爆发→碳纤维需求是最确定的增量材料方向。', tags:['全球仅3-4家','国产eVTOL标配','市占>60%','非独家寡头'] },
  { rank:3, name:'中信海直', code:'000099', segment:'通航运营', strength:'★★☆', logic:'通航运营<strong>"国家队"</strong>。全国最大直升机机队。已开通eVTOL航线。与所有主流eVTOL制造商建立沟通。运营壁垒（机队/飞行员/航线许可）是eVTOL商业化不可跳过的一环。但运营商非独家→其他通航公司可参与。', tags:['通航国家队','全国最大机队','eVTOL航线已开通','非独家'] }
];
CHAINS['low-altitude'].supplyGap = [
  { segment:'低空空管系统', demand:'全国>500个低空空域·>1000个起降场', capacity:'莱斯信息独家+四川九洲协作', gap:'建设周期3-5年', rate:'>80%新建', bottleneck:'空管系统与民航体系深度绑定→无法替代' },
  { segment:'eVTOL适航取证', demand:'>10款eVTOL申请取证', capacity:'亿航唯一全链条取证', gap:'其他主机厂滞后2-3年', rate:'>90%未取证', bottleneck:'适航审定周期3-5年' }
];
CHAINS['low-altitude'].methodologyNotes = '低空经济是"许可壁垒+基建壁垒"主导的赛道，纯物理卡口逻辑适用性有限。莱斯信息的空管系统壁垒是"许可型卡口"——民航局指定唯一系统、低空飞行不可跳过、替换=重建整个民航体系。碳纤维材料是传统物理卡口（全球仅3-4家T800+）。eVTOL主机厂竞争极度分散→不满足寡头条件。亿航智能（美股）是目前唯一全链条适航的企业→A股只能抓上下游配套。';


})(window.CHAINS);
