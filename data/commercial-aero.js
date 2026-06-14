// data/commercial-aero.js — 升级九 STEP 4 小步 2：COMMERCIAL AEROSPACE (商业航天) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.commercial-aero 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== COMMERCIAL AEROSPACE ====================
CHAINS['commercial-aero'] = {
  id: 'commercial-aero', name: '商业航天', icon: '🚀',
  meta: { sector: '整合', tier: '核心', status: 'active', updatedAt: '2026-06-14', ltFit: 4 },
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
    { label: '🛰️ 千帆星座在轨卫星', value: '约198颗(2026.06)', note: '长六改已完成第11批次发射(较骨架 162 颗+36 颗),年底目标324颗', color: 'var(--accent)', tier: 'primary', src: '国家航天局发射公告 / 央视新闻 2026-06' },
    { label: '🇨🇳 中国新申请频轨资源', value: '>20万颗', note: '较此前5.13万颗提升约5倍,千帆与GW为主力(单源中国网+ITU 公开数据,降 estimate)', color: 'var(--red)', tier: 'estimate', src: '中国网 / ITU国际电联公开申报数据跟踪 2026' },
    { label: '🚀 2025商业航天发射', value: '50次(占全国54%)', note: '入轨商业卫星311颗(占我国全年入轨卫星数84%)', color: 'var(--blue)', tier: 'primary', src: '国家航天局《2025年度商业航天发射统计》' },
    { label: '🏭 产业阶段', value: '批量交付与常态化密集发射期', note: '卫星制造正从"实验室手工打磨"转向"流水线量产"', color: 'var(--green)', tier: 'broker', src: '中航证券深度研报 2026-04' },
    { label: '📡 卫星制造市场规模', value: '千亿级核心市场', note: '单星成本压缩至~$50万,规划发射>2万颗', color: null, tier: 'broker', src: '中泰证券商业航天测算报告 2026' },
    { label: '⚡ 核心催化', value: '可回收火箭首飞突破', note: '朱雀三号等复用火箭核心技术验证及商业发射场启用', color: null, tier: 'broker', src: '招商证券商业航天专题 2026' },
    { label: '🔴 核心矛盾', value: '火箭运力瓶颈与工位紧缺', note: '卫星批产能力已大幅释放,但受制于商业发射场排期及火箭复用技术', color: 'var(--red)', tier: 'broker', src: '国泰君安研报 2026-05' },
    { label: '📋 T/R芯片国产化', value: '铖昌科技已全自给并批量交付', note: '相控阵天线占卫星载荷核心成本,单星需消耗数千颗核心芯片', color: 'var(--green)', tier: 'primary', src: '铖昌科技(001270)2025年年度报告' }
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
  supplyGap: [],
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:5, trend:'up', reason:'低轨卫星轨道(LEO)和频段资源严格遵循"先到先得",在大国太空博弈下,千帆+GW的两万星星座部署具备极强且不可逆的国家战略持久性。', evidence:'国际电联(ITU)超20万颗频轨新申请及严格的发射履约倒计时限', flag:'🆪', tier:'primary', src:'ITU申报文件/央视新闻 2026' },
      { key:'visibility', name:'业绩可见度', score:5, trend:'up', reason:'2026年上半年千帆星座已发射至第11批次(在轨约198颗),发射节奏从实验网彻底转向实质性大规模生产交付。', evidence:'长六改及长八等常态化"一箭多星"组网发射成功记录', flag:'🆪', tier:'primary', src:'国家航天局发射公告 2026-06' },
      { key:'policy', name:'政策确定性', score:5, trend:'flat', reason:'商业航天连续被写入政府工作报告并界定为"新质生产力"代表,多地政府(如上海/海南)已出台高达数亿元的专项航天产业补贴与产业园规划。', evidence:'政府工作报告及地方政府支持性文件', flag:'🆪', tier:'broker', src:'中航证券深度研报 2026' },
      { key:'supply', name:'供需紧张度', score:2, trend:'down', reason:'卫星前端制造产能(如格思航天流水线)已释放,但上游太空级T/R芯片与下游运载火箭(尤其是可回收复用技术)及发射工位极度缺乏,形成严重的"哑铃型"供需失衡。', evidence:'我国商业火箭年发射次数远低于两万星组网的理论要求运力', flag:'🆪', tier:'broker', src:'招商证券商业航天专题 2026' },
      { key:'valuation', name:'估值性价比', score:1, trend:'down', reason:'板块属于典型的主题催化期,远期预期被高度透支。核心卡口市盈率动辄上百倍(如铖昌科技>200倍)或处于亏损"市梦率"阶段(如上海瀚讯)。', evidence:'巨潮资讯网实测A股商业航天标的PE中位数及极值', flag:'🆪', asOf:'2026-06-14', tier:'primary', src:'深交所/行情软件 2026-06' },
      { key:'barrier', name:'壁垒安全垫', score:5, trend:'flat', reason:'航天级芯片、抗辐照载荷等需要极其漫长且严苛的太空在轨飞行认证试验,具备先发优势的企业护城河极深,后发者几无可能在短时间内弯道超车。', evidence:'铖昌科技/上海瀚讯等在大型星座的独家或双寡头供应商地位', flag:'🆪', tier:'broker', src:'国泰君安研报 2026' }
    ],
    verdict: {
      longTermFit: '大国博弈的太空圈地战,A股极其稀缺的纯正国家级科技战略赛道。',
      oneLine: '纸面规划已成过去,紧盯核心物料排产爆发与可回收火箭运力突破!🆪',
      stockHint: '果断拥抱星载T/R芯片与通信载荷的物理寡头(看壁垒);警惕传统体制内总装厂的估值泡沫与民间内卷(防陷阱);在密集发射催化期寻找核心供应商财务报表净利润转正的PEG拐点(赚周期的钱)。'
    }
  },
  cyclePosition: {
    stage: 'boom',
    label: '商业航天超级部署期',
    reason: '我国低轨宽带星座已彻底告别实验性质的纸面规划,进入规模化流水线制造与密集发射阶段。2026上半年千帆星座已常态化执行多次"一箭十八星"组网发射,赛道处于主升浪的早期兑现阶段。 [tier: broker][来源: 综合券商研报]',
    watchSignals: [
      '海南商业航天发射场(尤其是商业专属二号工位)的满负荷排期及发射频次提升情况 [tier: primary][来源: 航天科技集团公告]',
      '蓝箭航天、天兵科技等民营火箭大推力液氧甲烷一子级复用首飞及入轨验证重大节点 [tier: media][来源: 航天企业官微披露]',
      '上海垣信等星座主体的在轨测试良率,以及单星制造成本(BOM)的下降斜率 [tier: broker][来源: 产业链调研反馈]'
    ]
  }
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
      { rank:1, name:'铖昌科技', code:'001270', position:'星载相控阵T/R芯片龙头·已批量交付', barrier:'极高', hits:4, strength:'★★★', logic:'全球仅3-4家星载T/R芯片量产。已批量交付千帆星座。单星几百到上千颗芯片→万星×千颗=数亿颗需求。出口管制→国产替代红利', trend:'up', trendNote:'扭亏摘帽,订单放量', dims6:[ {key:'durability',score:5,trend:'up',tier:'primary'}, {key:'visibility',score:5,trend:'up',tier:'primary'}, {key:'policy',score:5,trend:'flat',tier:'primary'}, {key:'supply',score:2,trend:'down',tier:'broker'}, {key:'valuation',score:1,trend:'down',tier:'primary'}, {key:'barrier',score:5,trend:'flat',tier:'primary'} ], dims6Note:'2025年归母净利1.17亿元,同比大幅扭亏为盈 [来源: 2025年报]', tier:'primary', valAsOf:'2026-06-14' },
      { rank:2, name:'国博电子', code:'688375', position:'相控阵天线核心器件', barrier:'高', hits:null, strength:null, logic:'星载+地面终端双线布局。相控阵天线核心供应商。但T/R芯片市占率被铖昌压制', trend:'flat', trendNote:'T/R芯片双寡头之一', dims6:[ {key:'durability',score:5,trend:'flat',tier:'broker'}, {key:'visibility',score:4,trend:'flat',tier:'broker'}, {key:'policy',score:5,trend:'flat',tier:'broker'}, {key:'supply',score:3,trend:'flat',tier:'broker'}, {key:'valuation',score:2,trend:'down',tier:'primary'}, {key:'barrier',score:5,trend:'flat',tier:'broker'} ], dims6Note:'受特种领域订单节奏影响,商业航天业务占比正逐步爬坡 [来源: 券商研报]', tier:'broker', valAsOf:'2026-06-14' }
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
      { rank:1, name:'上海瀚讯', code:'300762', position:'华为低轨项目载荷供应商·手机直连5G', barrier:'极高', hits:3, strength:'★★☆', logic:'华为低轨项目载荷独家供应商。手机直连卫星5G正样件已交付。通信载荷壁垒=太空级硬件+华为认证+客户绑定。但非华为独家→降级', trend:'flat', trendNote:'年报亏损,博弈载荷订单', dims6:[ {key:'durability',score:5,trend:'flat',tier:'primary'}, {key:'visibility',score:2,trend:'up',tier:'primary'}, {key:'policy',score:5,trend:'flat',tier:'primary'}, {key:'supply',score:3,trend:'flat',tier:'broker'}, {key:'valuation',score:1,trend:'down',tier:'primary'}, {key:'barrier',score:4,trend:'flat',tier:'broker'} ], dims6Note:'2025年营收5.03亿(+42%),但净利亏损1.22亿,处爆发前夜 [来源: 2025年报]', tier:'primary', valAsOf:'2026-06-14' },
      { rank:2, name:'航天电子', code:'600879', position:'星网核心供应商·横跨火箭+卫星', barrier:'高', hits:null, strength:null, logic:'火箭电子+激光通信终端双线。星网批量交付。军方背景>民用弹性', trend:'flat', trendNote:'航天国家队主力', dims6:[ {key:'durability',score:5,trend:'flat',tier:'primary'}, {key:'visibility',score:4,trend:'flat',tier:'primary'}, {key:'policy',score:5,trend:'flat',tier:'primary'}, {key:'supply',score:3,trend:'flat',tier:'broker'}, {key:'valuation',score:3,trend:'flat',tier:'primary'}, {key:'barrier',score:5,trend:'flat',tier:'broker'} ], dims6Note:'基本面稳健,承担多项国家级重大航天工程测控载荷 [来源: 财报]', tier:'primary', valAsOf:'2026-06-14' }
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
      { rank:1, name:'中国卫星', code:'600118', position:'卫星总装国家队·千帆批量交付', barrier:'高', hits:null, strength:null, logic:'千帆星座批量交付核心单位。军方背景稳定订单。但卫星总装>3家→非寡头', trend:'down', trendNote:'大盘蓝筹,缺乏弹性', dims6:[ {key:'durability',score:4,trend:'flat',tier:'primary'}, {key:'visibility',score:4,trend:'flat',tier:'primary'}, {key:'policy',score:5,trend:'flat',tier:'primary'}, {key:'supply',score:4,trend:'flat',tier:'broker'}, {key:'valuation',score:3,trend:'flat',tier:'primary'}, {key:'barrier',score:5,trend:'flat',tier:'broker'} ], dims6Note:'体制内主力总装厂,但在新型商业星座招标中面临民营内卷竞争 [来源: 券商分析]', tier:'primary', valAsOf:'2026-06-14' },
      { rank:2, name:'海格通信', code:'002465', position:'全系列天通终端及芯片', barrier:'高', hits:null, strength:null, logic:'地面终端市场>卫星制造。天通全系列芯片+终端。地面站+信关站双线', trend:'flat', trendNote:'地面终端核心供应商', dims6:[ {key:'durability',score:5,trend:'flat',tier:'primary'}, {key:'visibility',score:4,trend:'flat',tier:'primary'}, {key:'policy',score:5,trend:'flat',tier:'primary'}, {key:'supply',score:4,trend:'flat',tier:'broker'}, {key:'valuation',score:3,trend:'flat',tier:'primary'}, {key:'barrier',score:4,trend:'flat',tier:'broker'} ], dims6Note:'北斗导航与低轨卫星通信终端双驱动,盈利能力稳健 [来源: 2025年报]', tier:'primary', valAsOf:'2026-06-14' }
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
  { rank:1, name:'铖昌科技', code:'001270', segment:'星载相控阵T/R芯片', strength:'★★★', logic:'从第一性原理看,低轨宽带卫星的核心在于相控阵天线,而天线的灵魂是T/R组件。全球仅3-4家企业具备太空级高可靠性T/R芯片的大规模量产能力。面对千帆+GW超2万颗卫星、单星动辄数千颗芯片的极高规格需求,铖昌科技不仅打破外资垄断,且于2025年实现归母净利1.17亿元强势扭亏摘帽。作为真正掌握星载物理卡口的纯正标的,其在商业航天产业链中具备难以逾越的护城河。 [tier: primary][来源: 铖昌科技2025年报+中航证券]', tags:['全球寡头格局','单星数千颗','纯正核心卡口','批量交付期'], valuation:{ pe:'PE-TTM 214.68x', peAbsolute:'PE-TTM 214.68x(截至2026-06-14·上市<5y 历史分位无法计算)', pePercentile:null, grossMargin:'75.38% (2025年报)', fromHigh:'待核(近期波动剧烈)', asOf:'2026-06-14', tier:'primary', src:'巨潮资讯网 / Futu 行情数据', note:'🆪 极高估值警示:公司于2026年5月"摘星脱帽"复牌,受千帆星座加速发射的强烈情绪催化,当前市盈率已飙升至200倍以上,严重透支短期预期,具备高弹性与高波动的典型科技股特征。' }, verification:{ items:[ { type:'供给寡头', claim:'全球与国内仅3-4家具备太空级宇航认证的T/R芯片寡头', howToCheck:'搜国博电子/13所/ADI/Anokiwave 公告,确认是否出现第四家量产', falsifySignal:'出现第四家通过认证 → 卡口降级', status:'pending' }, { type:'产能缺口', claim:'T/R芯片绝对缺口>30%', howToCheck:'跟踪铖昌产能扩张公告+千帆/GW 实际发射节奏', falsifySignal:'缺口收窄/同行扩产', status:'pending' }, { type:'财报印证', claim:'2025年报归母净利1.17亿元扭亏,毛利率75.38%', howToCheck:'查铖昌2025年报巨潮 cninfo 全文', falsifySignal:'毛利率下行/卫星订单不及预期', status:'pending' }, { type:'交叉信源', claim:'≥2独立来源印证(年报+中航证券)', howToCheck:'年报+券商研报同时印证', falsifySignal:'单一来源 → 存疑', status:'pending' } ], note:'这是初始版本验证清单 — 实际状态需手动核查后切换' } },
  { rank:2, name:'上海瀚讯', code:'300762', segment:'通信载荷集成', strength:'★★★', logic:'上海瀚讯是业内高度共识的"华为低轨卫星项目核心载荷集成商",其通信载荷技术是实现低轨卫星宽带通信及"手机直连卫星(Direct-to-Cell)"的咽喉要道。尽管公司2025年报仍体现1.22亿元的归母净利润亏损,但全年营收5.03亿已实现同比+42.23%的逆转反弹。随着低轨宽带载荷实质性进入批产拐点,其系统级垄断地位有望在今明两年迎来基本面的彻底重塑。 [tier: primary][来源: 瀚讯2025年报+东方财富测算]', tags:['华为星网预期','手机直连卫星','载荷核心集成','批产拐点'], valuation:{ pe:'PE 失真(2025年亏损)', peAbsolute:'PE-LYR 失真(2025归母净利润-1.22亿)', pePercentile:null, grossMargin:'33.01% (2025年报)', fromHigh:'待核', asOf:'2026-06-14', tier:'primary', src:'巨潮资讯网 上海瀚讯2025年年度报告', note:'🆪 公司2025年净利润持续亏损,静态PE为负值(失真)。当前超200亿的总市值主要建立在市场对"远期华为星网组网带来的天量空间"及"核心载荷排他性地位"的市梦率预期上。' }, verification:{ items:[ { type:'供给寡头', claim:'华为低轨项目核心载荷集成商(独家/双寡头之一)', howToCheck:'跟踪华为/星网集团公告,确认载荷中标份额分配', falsifySignal:'出现第二家供应商进入华为链 → 卡口降级', status:'pending' }, { type:'产能缺口', claim:'低轨宽带载荷批产拐点', howToCheck:'跟踪营收/净现金流是否转正', falsifySignal:'批产不及预期/亏损扩大', status:'pending' }, { type:'财报印证', claim:'2025营收5.03亿(+42.23%) 但归母净利-1.22亿', howToCheck:'查瀚讯2025年报全文', falsifySignal:'营收同比下滑/亏损扩大', status:'pending' }, { type:'交叉信源', claim:'≥2独立来源印证(年报+东方财富)', howToCheck:'年报+券商研报同时印证', falsifySignal:'单一来源 → 存疑', status:'pending' } ], note:'这是初始版本验证清单 — 实际状态需手动核查后切换' } }
];
CHAINS['commercial-aero'].supplyGap = [
  { segment:'星载相控阵 T/R 芯片', demand:'千帆+GW星座超2万颗卫星规划,按单星搭载数千颗测算,带来数亿颗级芯片的海量总需求', capacity:'全球仅铖昌科技、国博电子等3-4家企业具备通过太空级认证的大规模批产能力', gap:'绝对缺口 > 30%', rate:'极度紧缺', bottleneck:'太空级高可靠性抗辐照测试及长达18个月以上的严苛在轨飞行认证周期', tier:'broker', src:'中泰证券商业航天行业报告 2026' },
  { segment:'可回收运载火箭与发射资源', demand:'为抢占ITU频轨资源,必须在5-7年内部署上万颗卫星,要求国家年均具备上百次的重载运力发射能力', capacity:'当前年宇航发射总数仅50-60次区间(2025年商业发射25次),且绝大部分为不可回收的一次性火箭', gap:'运力缺口 > 50%', rate:'严重不足', bottleneck:'大推力液氧甲烷发动机可重复使用技术尚未彻底成熟,且专属商业航天发射工位严重短缺', tier:'primary', src:'国家航天局《2025年度商业航天发射统计》' }
];
CHAINS['commercial-aero'].methodologyNotes = '商业航天是典型的"国家队+商业队"混合赛道。物理卡口最确定的是上游核心器件（T/R芯片/通信载荷）——供应商极少、认证周期极长、下游需求爆发。但中下游（卫星总装/火箭发射/运营）参与者多→不构成寡头。商业火箭是最大的弹性环节（可回收火箭降本90%），但蓝箭/天兵等头部公司尚未上市→A股目前无纯正火箭标的。频轨资源新申请20万颗是最大产业催化→打开了产业链5倍空间。';


})(window.CHAINS);
