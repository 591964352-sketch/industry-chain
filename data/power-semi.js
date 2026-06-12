// data/power-semi.js — 升级九 STEP 4 小步 2：POWER SEMICONDUCTOR / SiC (功率半导体) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.power-semi 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== POWER SEMICONDUCTOR / SiC ====================
CHAINS['power-semi'] = {
  id: 'power-semi', name: '功率半导体/SiC', icon: '⚡',
  plainIntro: {
    analogy: 'SiC（碳化硅）= 电力电子界的"高速公路"——它让电能以更少损耗、更高效率在车内/数据中心/充电桩中流动',
    paragraphs: [
      '你电动车的续航、AI数据中心的电费、手机快充的速度——这些背后都有一个共同的"电力管家"叫<strong>功率半导体</strong>。它不像CPU那样做计算，而是<strong>控制电流的开关、转换电压、调节功率</strong>。传统的硅（Si）功率器件就像普通铁轨，碳化硅（SiC）就像高铁轨道——耐压更高、损耗更低、体积更小。新能源车用SiC后，续航能提升<strong>5-10%</strong>（相当于省出一个电池包的边际成本）。',
      '<strong>SiC产业链的最大卡点在哪？</strong>不在下游器件设计（斯达/士兰/华润微都在做），而在<strong>最上游的SiC衬底</strong>——这是用2300°C高温把碳化硅粉末"种"成晶锭的过程。全球衬底市场曾被Wolfspeed（美）垄断，但<strong>天岳先进2025年市占27.6%跃居全球第一</strong>，8英寸市占51.3%。更关键的是，英伟达GB300开始用SiC做电源——AI+新能源双驱动。'
    ],
    flowSteps: ['高纯碳粉+硅粉','2300°C长晶→SiC晶锭','切割研磨→SiC衬底','外延生长→SiC外延片','器件制造→SiC MOSFET/二极管','模块封装→装车/装服务器'],
    highlightBox: '<strong>💡 物理卡口 视角：SiC产业链最核心的物理卡口在衬底环节：</strong><br>① <strong>SiC衬底</strong>：2300°C长晶+切割工艺壁垒极高。天岳先进全球市占27.6%第一（8英寸51.3%），超过Wolfspeed。全球能批量供应8英寸SiC衬底的企业只有<strong>天岳/Wolfspeed/Coherent/三安</strong>四家。② <strong>长晶炉/外延炉</strong>：晶盛机电8英寸长晶设备已交付天科合达/三安，国产替代加速。③ <strong>车规SiC模块</strong>：斯达半导2026Q1 SiC模块收入+350%，比亚迪/理想/小鹏全面采用。'
  },
  overview: [
    { label: '⚡ 全球SiC市场（2030E）', value: '~$180亿', note: 'CAGR >40%，新能源车占60%+', color: 'var(--accent)' },
    { label: '🚗 新能源车SiC渗透率(2026)', value: '~30%', note: '800V平台标配SiC·成本持续下降', color: 'var(--blue)' },
    { label: '🇨🇳 天岳先进衬底全球市占', value: '27.6%', note: '全球第一·8英寸51.3%·超越Wolfspeed', color: 'var(--green)' },
    { label: '🏭 产业阶段', value: '渗透率加速期', note: '6英寸→8英寸切换·价格触底反弹', color: null },
    { label: '🔧 SiC器件国产化率', value: '衬底30%+·器件<20%', note: '车规器件仍以Wolfspeed/英飞凌为主', color: 'var(--barrier-high)' },
    { label: '⚡ AI驱动新需求', value: 'GB300用SiC', note: '英伟达AI服务器电源→SiC增量市场', color: null },
    { label: '🔴 核心矛盾', value: '8英寸衬底良率爬坡', note: '天岳2025亏损2.08亿→以价换量', color: 'var(--red)' },
    { label: '📋 SiC成本 vs IGBT', value: '2-3x(下降中)', note: '8英寸量产→成本再降30%→渗透加速', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: '新能源车(主驱+OBC)60%·AI数据中心电源·充电桩·光伏逆变器', barrier: 'low', note: '800V高压平台标配SiC·GB300电源SiC化' },
    midstream: { name: 'SiC器件/模块制造（设计+制造+封测）', barrier: 'low', note: '斯达/士兰/华润/时代电气→设计多/制造少' },
    equipment: [
      { name: 'SiC衬底（长晶+切割）, 壁垒:极高', barrier: 'extreme', choke: true, note: '全球仅4家8英寸·天岳全球第一27.6%' },
      { name: 'SiC外延片', barrier: 'extreme', choke: true, note: '瀚天天成/天域半导体→国产化加速' },
      { name: '长晶炉/外延炉设备', barrier: 'high', choke: false, note: '晶盛机电/晶升股份→国产替代' }
    ],
    materials: [
      { name: '高纯碳粉/石墨坩埚', barrier: 'mid', choke: false, note: 'SiC长晶核心耗材·国产替代低' },
      { name: '车规SiC MOSFET', barrier: 'high', choke: false, note: '斯达半导车载市占>20%·国产龙头' }
    ],
    sideBranches: [
      { name: 'GaN氮化镓→低压高频场景', barrier: 'high', note: '快充/数据中心·英诺赛科全球第一' },
      { name: 'IGBT→SiC过渡方案', barrier: 'mid', note: '时代电气/斯达半导→双业务驱动' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// Power Semi Segments
CHAINS['power-semi'].segments = [
  {
    name: 'SiC衬底 — 功率半导体的"皇冠明珠"', costRatio: 'SiC器件成本~45%', barrier: 'extreme', choke: true, border: true,
    intro: 'SiC衬底是用<strong>2300°C</strong>高温把碳化硅粉末物理气相沉积"种"成晶锭，再切割研磨而成。这是SiC产业链<strong>技术壁垒最高、价值占比最大</strong>的环节——衬底成本占SiC器件的45%。从6英寸→8英寸过渡是2026年最大看点：8英寸单片芯片产出多88%、成本降30%。<strong>全球仅天岳先进/Wolfspeed/Coherent/三安光电四家</strong>能量产8英寸。天岳先进2025年全球市占27.6%跃居第一（8英寸51.3%），出货折合69.04万片（+68.31%），但"以价换量"→2025亏损2.08亿。',
    globalLandscape: [
      { lbl: '🥇 天岳先进（中）', val: '全球市占27.6%第一·8英寸51.3%', note: '2025出货69万片+68%·Q1毛利率回升至19.12%' },
      { lbl: '🥈 Wolfspeed（美）', val: 'SiC先驱→市占被中国追赶', note: '持续亏损·产能利用率不足' },
      { lbl: '🥉 Coherent（美）', val: '全球第三', note: '与Wolfspeed构成双寡头被打破' },
      { lbl: '三安光电（中）', val: 'SiC全产业链IDM', note: '与意法半导体合资8英寸产线' }
    ],
    stocks: [
      { rank:1, name:'天岳先进', code:'688234', position:'全球SiC衬底市占27.6%第一·8英寸51.3%', barrier:'极高', hits:4, strength:'★★★', logic:'全球第一的SiC衬底龙头。8英寸全球市占51.3%。2025出货69万片+68%。2026Q1毛利率19.12%环比+25pct。但2025亏损2.08亿→以价换量阶段。机构预计2026有望扭亏' },
      { rank:2, name:'三安光电', code:'600703', position:'SiC全产业链IDM', barrier:'高', hits:null, strength:null, logic:'衬底+外延+器件全链。与意法合资8英寸产线。但衬底市占远低于天岳' },
      { rank:3, name:'露笑科技', code:'002617', position:'SiC衬底追赶者', barrier:'中', hits:null, strength:null, logic:'6英寸导电型衬底量产。8英寸验证中。市占<5%' }
    ]
  },
  {
    name: 'SiC器件/模块 — 车规级核心', costRatio: 'SiC器件成本~55%', barrier: 'high', choke: false, border: false,
    intro: 'SiC器件/模块是<strong>直接装车/装服务器的最终产品</strong>。斯达半导是国内车规SiC MOSFET模块龙头（市占>20%），2026Q1 SiC模块收入同比<strong>+350%</strong>，深度绑定比亚迪/理想/小鹏。但器件环节全球参与者>10家→不构成绝对寡头。英飞凌/安森美/Wolfspeed仍垄断高端。',
    globalLandscape: [
      { lbl: '🥇 斯达半导（中）', val: '国产车规SiC模块>20%·Q1+350%', note: '比亚迪/理想/小鹏主流供应商' },
      { lbl: '🥈 时代电气（中）', val: '中车旗下功率半导体龙头', note: '轨交+新能源车双驱动' },
      { lbl: '🥉 英飞凌+安森美（德/美）', val: '全球SiC器件TOP2', note: '仍垄断高端车规市场' }
    ],
    stocks: [
      { rank:1, name:'斯达半导', code:'603290', position:'国产车规SiC模块市占>20%·Q1+350%', barrier:'极高', hits:3, strength:'★★☆', logic:'Q1 SiC模块收入+350%。AEC-Q101车规认证。比亚迪/理想/小鹏全面采用。但英飞凌/安森美可替代→非独家寡头' },
      { rank:2, name:'时代电气', code:'688187', position:'中车旗下功率半导体龙头', barrier:'高', hits:null, strength:null, logic:'轨交IGBT垄断地位+新能源车SiC双驱动。制造成本低于fabless' },
      { rank:3, name:'士兰微', code:'600460', position:'IDM功率半导体', barrier:'高', hits:null, strength:null, logic:'SiC从衬底→器件全链布局。但营收仍以LED为主' }
    ]
  },
  {
    name: 'SiC设备 — 长晶炉/外延炉', costRatio: '设备投资~30%+', barrier: 'high', choke: false, border: false,
    intro: 'SiC产业扩产潮下，<strong>长晶炉和外延炉是最核心的专用设备</strong>。晶体生长炉需要精确控制2300°C高温下的热场分布→稍有偏差晶体就报废。外延炉是在衬底上"种"出高质量外延层。晶盛机电8英寸长晶设备已交付天科合达/三安光电。但全球供应商>5家→不构成寡头。',
    globalLandscape: [
      { lbl: '晶盛机电（中）', val: '8英寸长晶炉龙头', note: '交付天科合达/三安光电' },
      { lbl: '晶升股份（中）', val: 'SiC长晶炉+外延炉', note: '国产替代核心设备商' }
    ],
    stocks: [
      { rank:1, name:'晶盛机电', code:'300316', position:'SiC长晶炉龙头', barrier:'高', hits:null, strength:null, logic:'8英寸长晶炉已交付天科合达/三安光电。同时布局SiC衬底。但全球>5家设备商→非寡头' },
      { rank:2, name:'晶升股份', code:'688478', position:'SiC长晶炉+外延炉双设备', barrier:'高', hits:null, strength:null, logic:'国产替代核心设备商。SiC扩产潮直接受益' }
    ]
  }
];

// Power Semi Four Questions
CHAINS['power-semi'].fourQuestions = {
  segments: [
    {
      name: 'SiC衬底（核心卡口）',
      stocks: [
        { name:'天岳先进', code:'688234', q1:true, q1note:'全球仅4家8英寸量产', q2:true, q2note:'长晶扩产>18月', q3:true, q3note:'器件端无法跳过衬底', q4:true, q4note:'新能源车+AI服务器刚需', hits:4, strength:'★★★' },
        { name:'三安光电', code:'600703', q1:true, q1note:'全球仅4家', q2:true, q2note:'', q3:true, q3note:'', q4:true, q4note:'', hits:4, strength:'★★★' }
      ]
    },
    {
      name: 'SiC器件/模块',
      stocks: [
        { name:'斯达半导', code:'603290', q1:false, q1note:'全球>10家', q2:true, q2note:'车规认证12-18月', q3:false, q3note:'英飞凌/安森美可替', q4:true, q4note:'新能源车标配', hits:2, strength:null }
      ]
    },
    {
      name: 'SiC设备',
      stocks: [
        { name:'晶盛机电', code:'300316', q1:false, q1note:'全球>5家', q2:true, q2note:'', q3:false, q3note:'北方华创/晶升可替', q4:true, q4note:'', hits:2, strength:null }
      ]
    }
  ]
};

// Power Semi Choke Points
CHAINS['power-semi'].chokePoints = [
  { rank:1, name:'天岳先进', code:'688234', segment:'SiC衬底', strength:'★★★', logic:'<strong>全球第一</strong>的SiC衬底企业（市占27.6%）。8英寸市占51.3%遥遥领先。全球仅4家能量产8英寸SiC衬底。2300°C长晶工艺壁垒极高——新进入者至少需要3-5年研发+<strong>$5亿+</strong>资本投入。2025出货69万片+68%。2026Q1毛利率回升至19.12%。机构预计2026年扭亏。', tags:['全球市占27.6%第一','8英寸51.3%','全球仅4家','$5亿+资本壁垒'] },
  { rank:2, name:'三安光电', code:'600703', segment:'SiC衬底+全链IDM', strength:'★★★', logic:'中国唯一<strong>SiC全产业链IDM</strong>——从衬底到外延到器件到模块全链条。与意法半导体合资8英寸产线。IDM模式最大优势：不受代工产能限制+技术迭代更快。但衬底市占远低于天岳。', tags:['唯一全链IDM','意法合资','衬底市占<天岳'] }
];
CHAINS['power-semi'].supplyGap = [
  { segment:'SiC衬底', demand:'2026E~300万片(6寸等效)', capacity:'全球有效产能~200万片', gap:'~100万片', rate:'~33%', bottleneck:'长晶速度+切割良率+8英寸爬坡' },
  { segment:'车规SiC MOSFET', demand:'2026E全球~$50亿', capacity:'英飞凌/Wolfspeed主导', gap:'国产份额<20%', rate:'>80%进口', bottleneck:'晶圆产能+车规认证周期' }
];
CHAINS['power-semi'].methodologyNotes = 'SiC赛道最大特征是"上游衬底寡头、中下游竞争分散"。天岳先进和Wolfspeed/Coherent构成全球衬底四强——这是一个真正的物理卡口：产能扩张需18月+、$5亿+资本壁垒、良率爬坡极难。但器件/模块/设备环节竞争格局分散→不满足寡头条件。车规SiC MOSFET主要被英飞凌/Wolfspeed垄断→斯达半导是国产替代最确定标的但非独家。';


})(window.CHAINS);
