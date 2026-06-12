// data/solid-battery.js — 升级九 STEP 4 小步 2：SOLID-STATE BATTERY (固态电池) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.solid-battery 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== SOLID-STATE BATTERY ====================
CHAINS['solid-battery'] = {
  id: 'solid-battery', name: '固态电池', icon: '🔋',
  plainIntro: {
    analogy: '固态电池 = 把电池里的"电解液"换成"固体陶瓷"——从"水袋"变成"砖头"，能量密度翻倍、安全性质的飞跃',
    paragraphs: [
      '锂离子电池有三层：正极（锂的仓库）、负极（锂的"家"）、电解液（锂离子游动的"泳池"）。<strong>传统锂电池的电解液是液体</strong>——容易燃烧（电动车起火80%因为它）。<strong>固态电池把液体电解液换成固体电解质</strong>——陶瓷或聚合物，不仅不会燃烧，还能用锂金属做负极，能量密度从当前的250-300Wh/kg<strong>跃升至400-500Wh/kg+</strong>（续航从600km→1000km+）。',
      '2026年是固态电池<strong>从中试向量产过渡的关键元年</strong>。三条技术路线并行：硫化物（离子电导率最高/宁德时代主攻）、氧化物（稳定性最好/清陶能源/上海洗霸量产）、聚合物（加工性优异/特定场景）。当前半固态（含少量电解液）已小批量装车，全固态预计2027-2028年规模量产。产业链最大增量不在电芯（宁德/比亚迪寡头），而在<strong>固态电解质材料</strong>——这是传统锂电完全没有的新环节。'
    ],
    flowSteps: ['固态电解质(LLZO/硫化物)合成','正极+电解质+负极→叠片','干法/等静压成型','固态电芯组装','→装车/储能/消费电子'],
    highlightBox: '<strong>💡 物理卡口 视角：固态电池创造了全新的"固态电解质"环节——传统锂电产业链没有的位置：</strong><br>① <strong>LLZO氧化物电解质</strong>：上海洗霸良品率98%行业最高/独供比亚迪刀片固态电池，全球仅3-4家吨级量产。② <strong>干法设备</strong>：先导智能全球唯一可提供固态电池全段设备（市占>70%），深度绑定宁德时代/清陶。③ <strong>硫化锂</strong>：天赐材料百吨级中试线，向宁德时代批量供货。④ 电芯端宁德时代/比亚迪寡头格局，但传统锂电巨头也在做→非纯增量。'
  },
  overview: [
    { label: '🔋 固态电池市场（2030E）', value: '~$200亿+', note: 'CAGR>60%·全球动力电池~$4000亿', color: 'var(--accent)' },
    { label: '🇨🇳 产业化阶段', value: '中试→量产过渡', note: '2026年关键节点·全固态2027-28量产', color: 'var(--green)' },
    { label: '🧪 固态电解质成本占比', value: '~30%+', note: '传统锂电无此环节→最大增量', color: 'var(--red)' },
    { label: '🏭 技术路线', value: '硫化物/氧化物/聚合物', note: '氧化物(LLZO)当前量产最快', color: null },
    { label: '📐 先导智能固态设备', value: '全球唯一全段设备商', note: '市占>70%·深度绑定宁德/清陶', color: 'var(--blue)' },
    { label: '⚡ 宁德时代凝聚态电池', value: '500Wh/kg已量产', note: '硫化物全固态2027小批量生产', color: null },
    { label: '🔴 最大瓶颈', value: '成本+良率+界面阻抗', note: '固态电解质成本需从35万→10万/吨', color: 'var(--red)' },
    { label: '📋 LLZO电解质龙头', value: '上海洗霸良率98%', note: '独供比亚迪·扩至5000吨·A股最纯', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: '新能源车(主驱)70%·储能20%·消费电子10%', barrier: 'low', note: '2027年半固态装车量预计>10万辆' },
    midstream: { name: '固态电芯制造', barrier: 'low', note: '宁德时代/比亚迪寡头·清陶能源未上市·国轩/亿纬跟随' },
    equipment: [
      { name: '干法/等静压设备(全新需求)', barrier: 'extreme', choke: true, note: '先导智能全球唯一全段设备·市占>70%' },
      { name: '固态电解质前驱体(LLZO/硫化锂)', barrier: 'extreme', choke: true, note: '上海洗霸·天赐材料·厦钨新能→全球仅3-4家吨级量产' }
    ],
    materials: [
      { name: 'LLZO氧化物粉体', barrier: 'extreme', choke: true, note: '上海洗霸良率98%·三祥新材液相法35万/吨' },
      { name: '硫化锂(硫化物路线核心)', barrier: 'high', choke: false, note: '天赐材料·厦钨新能→成本较日企低40%' },
      { name: 'LiTFSI添加剂', barrier: 'high', choke: false, note: '天赐材料市占60%+·向宁德批量供货' }
    ],
    sideBranches: [
      { name: '固态电池设备(纳科诺尔/宏工科技)', barrier: 'high', note: '干法辊压+等静压·绑定清陶能源' },
      { name: '硅负极→固态电池配套升级', barrier: 'high', note: '贝特瑞/杉杉→负极从石墨→硅碳' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

CHAINS['solid-battery'].segments = [
  {
    name: '固态电解质(LLZO氧化物) — 最大增量新环节', costRatio: '电芯成本~30%+', barrier: 'extreme', choke: true, border: true,
    intro: '固态电解质是固态电池区别于传统锂电池的<strong>核心新环节</strong>——传统锂电产业链完全没这个位置。LLZO（锂镧锆氧）氧化物电解质离子电导率接近液态电解液水平，且空气耐受性强→当前半固态量产主流路线。核心瓶颈：<strong>粉体批次一致性+烧结致密度</strong>——普通化工企业做不了。全球能吨级量产LLZO的企业仅<strong>上海洗霸/三祥新材/清陶能源（未上市）+日本TDK</strong>等3-4家。上海洗霸良品率98%、独供比亚迪刀片固态电池、2026扩至5000吨。',
    globalLandscape: [
      { lbl: '🥇 上海洗霸（中）', val: 'LLZO良率98%行业最高', note: '独供比亚迪刀片·2026扩至5000吨' },
      { lbl: '🥈 三祥新材（中）', val: '液相法LLZO粉体·成本35万/吨', note: '与清陶能源签订3年供货协议' },
      { lbl: '🥉 清陶能源（未上市）', val: '氧化物固态电解质自主生产', note: '半固态电池量产·上汽/当升合作' },
      { lbl: '国瓷材料（中）', val: '氧化物电解质核心供应商', note: '获宁德/比亚迪订单' }
    ],
    stocks: [
      { rank:1, name:'上海洗霸', code:'603200', position:'LLZO良率98%行业最高·独供比亚迪', barrier:'极高', hits:4, strength:'★★★', logic:'LLZO良品率98%行业最高。独供比亚迪刀片固态电池。吨级量产已实现。2026扩至5000吨。固态电解质是传统锂电完全没有的新增量→纯增量弹性最大' },
      { rank:2, name:'三祥新材', code:'603663', position:'液相法LLZO粉体·与清陶3年供货协议', barrier:'极高', hits:3, strength:'★★☆', logic:'液相法LLZO成本35万/吨。与清陶能源签订3年供货协议。锆基电解质原料。但LLZO非独家→上海洗霸/清陶可替' },
      { rank:3, name:'天赐材料', code:'002709', position:'LiTFSI市占60%+硫化物前驱体', barrier:'高', hits:null, strength:null, logic:'LiTFSI市占60%+。百吨级硫化物前驱体中试线2026年中投产。向宁德时代批量供货。但LiTFSI壁垒中等' }
    ]
  },
  {
    name: '固态电池设备 — "换设备潮"核心受益', costRatio: '设备投资~40%+', barrier: 'extreme', choke: true, border: true,
    intro: '固态电池需要的<strong>干法电极/等静压/热压复合</strong>设备与传统液态锂电池完全不同——不是"改造旧产线"而是"新建全套产线"。先导智能是<strong>全球唯一</strong>可提供固态电池全段设备的企业（涂布-热压-封装），市占率超70%，深度绑定宁德时代、清陶能源。2026年固态设备营收预计增210%。纳科诺尔干法辊压+等静压设备市占率23%+，绑定清陶能源。',
    globalLandscape: [
      { lbl: '🥇 先导智能（中）', val: '全球唯一全段设备·市占>70%', note: '固态设备营收2026E增210%·绑定宁德/清陶' },
      { lbl: '🥈 纳科诺尔（中）', val: '干法辊压+等静压·市占23%+', note: '绑定清陶能源' },
      { lbl: '🥉 宏工科技（中）', val: '干法混合纤维化设备', note: '2026年订单预计超50亿' }
    ],
    stocks: [
      { rank:1, name:'先导智能', code:'300450', position:'全球唯一固态电池全段设备商', barrier:'极高', hits:4, strength:'★★★', logic:'市占>70%。全球唯一全段(涂布→热压→封装)。深度绑定宁德时代+清陶能源。2026E固态设备营收增210%。全球仅此一家→寡头格局极清晰' },
      { rank:2, name:'纳科诺尔', code:'832522', position:'干法辊压+等静压·市占23%+', barrier:'高', hits:null, strength:null, logic:'干法设备是固态电池核心新工艺→传统湿法涂布无法替代。绑定清陶能源。市占23%+。但先导智能综合实力更强' }
    ]
  },
  {
    name: '硫化锂/硫化物前驱体 — 全固态终极路线', costRatio: '硫化物路线成本~25%', barrier: 'high', choke: false, border: false,
    intro: '硫化物电解质离子电导率最高（接近液态），是全固态电池的<strong>终极方案</strong>（宁德时代/比亚迪/丰田均主攻此路线）。但硫化物对水分极度敏感（遇水产生H₂S有毒气体），生产需全惰性气氛→工艺壁垒极高。目前全球仅<strong>日本三井金属/宁德时代/天赐材料/厦钨新能</strong>等少数企业能量产硫化锂前驱体。天赐材料百吨级中试线2026年中投产。',
    globalLandscape: [
      { lbl: '天赐材料（中）', val: 'LiTFSI市占60%+硫化物前驱体', note: '百吨级中试线2026年中投产·向宁德批量供货' },
      { lbl: '厦钨新能（中）', val: '硫化锂成本较日企低40%', note: '氧化物电解质吨级量产同时布局' }
    ],
    stocks: [
      { rank:1, name:'天赐材料', code:'002709', position:'LiTFSI全球60%+硫化物前驱体', barrier:'高', hits:null, strength:null, logic:'LiTFSI市占60%+。百吨级硫化物前驱体中试线2026年中投产。全球>5家硫化物→非绝对寡头' },
      { rank:2, name:'厦钨新能', code:'688778', position:'硫化锂成本较日企低40%', barrier:'高', hits:null, strength:null, logic:'硫化物+氧化物双线布局。但营收仍以传统正极材料为主→固态贡献尚小' }
    ]
  }
];

CHAINS['solid-battery'].fourQuestions = {
  segments: [
    {
      name: 'LLZO氧化物电解质（最大增量）',
      stocks: [
        { name:'上海洗霸', code:'603200', q1:true, q1note:'全球仅3-4家吨级量产', q2:true, q2note:'LLZO扩产>12月', q3:true, q3note:'固态电池无液体电解液替代', q4:true, q4note:'半固态已装车刚需', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '固态电池全段设备',
      stocks: [
        { name:'先导智能', code:'300450', q1:true, q1note:'全球唯一全段设备', q2:true, q2note:'新产线建设>18月', q3:true, q3note:'干法/等静压不可跳过', q4:true, q4note:'电池厂扩产刚需', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '硫化物前驱体（终极路线）',
      stocks: [
        { name:'天赐材料', code:'002709', q1:false, q1note:'全球>5家硫化物', q2:true, q2note:'', q3:false, q3note:'氧化物可替代硫化物路线', q4:true, q4note:'全固态远期刚需', hits:2, strength:null }
      ]
    }
  ]
};

CHAINS['solid-battery'].chokePoints = [
  { rank:1, name:'上海洗霸', code:'603200', segment:'LLZO氧化物电解质', strength:'★★★', logic:'LLZO良品率<strong>98%行业最高</strong>。独供比亚迪刀片固态电池。全球仅3-4家吨级量产LLZO。固态电解质是传统锂电完全没有的纯增量环节→弹性最大。2026扩至5000吨。固态电池从0→1过程中，电解质是最确定的新增需求。', tags:['良率98%行业最高','独供比亚迪','全球仅3-4家','纯增量环节'] },
  { rank:2, name:'先导智能', code:'300450', segment:'固态电池全段设备', strength:'★★★', logic:'<strong>全球唯一</strong>可提供固态电池全段设备（涂布→热压→封装）。市占>70%。深度绑定宁德时代+清陶能源。2026E固态设备营收增210%。固态电池产线必须全套新建→先导是"卖铲人"中的唯一选择。', tags:['全球唯一全段','市占>70%','绑定宁德/清陶','设备营收+210%'] },
  { rank:3, name:'三祥新材', code:'603663', segment:'LLZO氧化物粉体', strength:'★★☆', logic:'液相法LLZO成本35万/吨。与清陶能源签订<strong>3年供货协议</strong>——锁定核心客户。锆基电解质原料自供。但LLZO全球>3家（上海洗霸/清陶/TDK可替）→非独家寡头。', tags:['清陶3年协议','成本35万/吨','锆基原料自供','非独家寡头'] }
];
CHAINS['solid-battery'].supplyGap = [
  { segment:'LLZO固态电解质', demand:'2027E~5000-10000吨(半固态装车)', capacity:'全球有效产能~2000吨', gap:'3000-8000吨', rate:'>60%', bottleneck:'粉体批次一致性+烧结工艺壁垒' },
  { segment:'固态电池全段设备', demand:'2026E>100GWh产线规划', capacity:'先导智能独占>70%', gap:'交期>15月', rate:'~40%', bottleneck:'设备复杂度高→全球仅先导全段' }
];
CHAINS['solid-battery'].methodologyNotes = '固态电池产业链最大的投资逻辑是"新环节出现"——固态电解质是传统锂电完全没有的位置，从0→1的增量弹性最大。LLZO氧化物电解质（上海洗霸）和干法全段设备（先导智能）是最接近物理卡口的环节。但全固态量产还早（2027-2028），短期业绩主要由半固态（含少量电解液）驱动。注意硫化物vs氧化物的技术路线之争——如果硫化物成为终极方案、LLZO氧化物需求可能低于预期。';


})(window.CHAINS);
