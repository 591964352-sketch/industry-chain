// data/ai-server.js — 升级九 STEP 4 小步 2：AI SERVER (AI 服务器) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.ai-server 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== AI SERVER ====================
CHAINS['ai-server'] = {
  id: 'ai-server', name: 'AI服务器', icon: '🖥️',
  plainIntro: {
    analogy: 'AI服务器 = 算力时代的"发电厂"——把电力（GPU/液冷/铜连接）转化为智能',
    paragraphs: [
      '你手机里的AI助手、抖音的推荐算法、ChatGPT的每一次回答——<strong>背后都是AI服务器在"烧"算力</strong>。一台AI服务器不像普通电脑那样用风扇吹，它发热量堪比一个工业烤箱。英伟达GB300机柜功耗飙到<strong>135-140kW</strong>（是上一代的2倍），不用液冷根本跑不起来。',
      '<strong>为什么2026年AI服务器产业链这么关键？</strong>因为英伟达从GB200升级到GB300再到下半年的Vera Rubin平台，每次架构升级都带来全新的供应链增量机会。GB300单机柜价值量比GB200<strong>提升20-30%</strong>，而Vera Rubin（Kyber机柜）电源价值将是GB200的<strong>10倍以上</strong>。液冷、铜连接、BBU超级电容——这些在传统服务器里占比很小的环节，正在变成AI服务器的核心成本项。'
    ],
    flowSteps: ['英伟达GPU→台积电代工','高速PCB→胜宏/沪电','铜连接背板→安费诺/沃尔','液冷散热→英维克/高澜','电源/BBU→麦格米特/江海','AI服务器整机→工业富联/浪潮'],
    highlightBox: '<strong>💡 物理卡口 视角：AI服务器的"卡口"不在整机制造（工业富联/浪潮/华勤充分竞争），而在几个增量核心部件：</strong><br>① <strong>液冷系统</strong>：英维克是国内唯一获英伟达NPN Tier1认证的液冷供应商，GB300冷板市占率42%、CDU市占率第一。液冷从"可选"→"标配"→Rubin强制100%液冷。② <strong>高速铜连接</strong>：沃尔核材224G铜缆全球市占24.2%、国内唯一量产，深度绑定安费诺→间接进英伟达全系。③ <strong>BBU超级电容</strong>：GB300标配BBU，江海股份超级电容通过认证。这些环节的共同特征：全球≤3家能做、认证周期>12月、下游100%刚需。'
  },
  overview: [
    { label: '🖥️ GB300机柜出货（2026E）', value: '5.5-8.5万台', note: '同比+100%+，2026Q2大规模交付', color: 'var(--accent)' },
    { label: '🔌 GB300单机柜功耗', value: '135-140kW', note: 'GB200的2倍，液冷覆盖率80%+', color: 'var(--red)' },
    { label: '💧 英伟达系液冷市场（2026E）', value: '~$100亿', note: '中性预测，Rubin强制100%液冷', color: 'var(--blue)' },
    { label: '🏭 产业阶段', value: '爆发前夜', note: 'GB300 Q2放量 + Rubin Q3爬坡', color: 'var(--green)' },
    { label: '🔗 铜连接市场空间（2026E）', value: '~67亿元', note: '同比+106%，超节点服务器驱动', color: 'var(--accent)' },
    { label: '⚡ Kyber机柜电源价值', value: '10x GB200', note: '48V高压架构+超级电容BBU', color: 'var(--red)' },
    { label: '🔴 核心矛盾', value: '液冷产能不足+铜缆缺口', note: '英维克/沃尔定单>产能', color: 'var(--red)' },
    { label: '📋 液冷国产化率', value: 'CDU>70%/冷板>80%', note: '海外毛利率是国内3x，出海是破局关键', color: null }
  ],
  treeMap: {
    downstream: { name: '北美CSP(微软/谷歌/亚马逊50%+)·国内(字节/阿里/腾讯30%+)', barrier: 'low', note: '2026年四大CSP AI基建投资$6000亿' },
    midstream: { name: 'AI服务器整机（ODM/OEM/JDM）', barrier: 'low', note: '工业富联(GB300独家设计生产)·浪潮·华勤·联想→CR5<40%→无卡口' },
    equipment: [
      { name: '液冷散热(冷板式/浸没式)', barrier: 'extreme', choke: true, note: '英维克国内唯一NPN Tier1认证' },
      { name: '铜连接/高速背板(224G)', barrier: 'extreme', choke: true, note: '沃尔核材全球24.2%/国内唯一量产' },
      { name: 'BBU超级电容/48V电源', barrier: 'high', choke: false, note: '江海/麦格米特→GB300标配' }
    ],
    materials: [
      { name: '液冷管路/快换接头', barrier: 'high', choke: false, note: '高澜/川环→获海外认证' },
      { name: 'CDU/冷板组件', barrier: 'high', choke: false, note: '英维克/申菱→国产市占>70%' },
      { name: '高速铜缆(224G PAM4)', barrier: 'extreme', choke: true, note: '沃尔独占国内量产' }
    ],
    sideBranches: [
      { name: '光模块(1.6T)→已覆盖CPO赛道', barrier: 'high', note: '中际旭创/天孚/新易盛' },
      { name: 'AI服务器PCB→已覆盖PCB赛道', barrier: 'high', note: '胜宏/沪电/鹏鼎→HDI/高多层' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// AI Server Segments
CHAINS['ai-server'].segments = [
  {
    name: '液冷散热 — 从"可选"到"必须"', costRatio: '整机15-20%', barrier: 'extreme', choke: true, border: true,
    intro: 'AI服务器功耗从GB200的70kW暴涨到GB300的135-140kW，<strong>液冷覆盖率从50%→80%+</strong>，2026H2的Vera Rubin平台<strong>强制100%液冷</strong>。液冷分冷板式（主流）和浸没式（未来方向）。单机柜液冷价值量~5万美元（较GB200提升20%）。2026年英伟达系液冷市场中性预测<strong>~100亿美元</strong>。国内CDU（冷液分配单元）国产市占超70%，冷板国产化率突破80%。核心矛盾：<strong>产能不足→英维克在手订单排到2027年</strong>。',
    globalLandscape: [
      { lbl: '🥇 英维克（中）', val: '国内唯一NPN Tier1认证', note: 'GB300项目国内份额近50%，获GB300+谷歌TPU液冷共~45亿订单' },
      { lbl: '🥈 高澜股份（中）', val: '快换接头(UQD)+冷板', note: '获字节跳动超5亿液冷订单，2026Q1毛利率30.68%' },
      { lbl: '🥉 申菱环境（中）', val: 'CDU核心供应商', note: '与英维克/高澜合计国产CDU市占>70%' },
      { lbl: '曙光数创（中）', val: '浸没式液冷唯一量产', note: '营收+782%但深陷亏损（冷板价格战影响）' }
    ],
    stocks: [
      { rank:1, name:'英维克', code:'002837', position:'国内唯一NPN Tier1液冷认证，GB300份额~50%', barrier:'极高', hits:4, strength:'★★★', logic:'GB300冷板市占42%/CDU第一。获NPN Tier1独家认证。在手订单>45亿排至2027。海外毛利率52.64%是国内3x。Q1营收+26%但利润承压（坏账计提9300万）' },
      { rank:2, name:'高澜股份', code:'300499', position:'快换接头(UQD)+高端冷板', barrier:'高', hits:3, strength:'★★☆', logic:'2026Q1唯一双位数毛利率+净利率的液冷企业。UQD接头从126→252对/柜。字节5亿+液冷订单。微通道液冷及双相冷板壁垒高' },
      { rank:3, name:'曙光数创', code:'872808', position:'国内唯一浸没相变液冷量产', barrier:'高', hits:null, strength:null, logic:'营收暴增782%但亏损扩大→冷板价格战+财务费用猛增。浸没式技术壁垒仍在，等待放量' },
      { rank:4, name:'申菱环境', code:'301018', position:'CDU核心供应商', barrier:'中', hits:null, strength:null, logic:'与英维克/高澜三分国产CDU市场>70%。跟随液冷大盘增长' }
    ]
  },
  {
    name: '铜连接/高速互联 — "光退铜进"新趋势', costRatio: '机柜互联12-18%', barrier: 'extreme', choke: true, border: true,
    intro: 'GB300架构引入<strong>高阶铜缆互联与高速背板方案</strong>——在机柜内部短距互联场景，铜连接性价比和功耗远优于光模块。英伟达NVL72/NVL36中铜连接覆盖：高速线背板、OverPass线、交换机互联AEC。2026年超节点服务器铜芯线市场空间<strong>~67亿元（同比+106%）</strong>。全球高速电缆市场五年增长2倍以上→2029年$67亿。核心瓶颈：<strong>224G PAM4铜缆全球仅3家能量产，发泡芯线挤出机交期超12月</strong>。',
    globalLandscape: [
      { lbl: '🥇 安费诺（美）', val: '英伟达铜连接一供', note: 'NVL72机柜背板独家设计' },
      { lbl: '🥈 沃尔核材（中）', val: '224G铜缆全球24.2%/国内唯一量产', note: '深度绑定安费诺+莫仕+泰科→间接进英伟达全系' },
      { lbl: '🥉 博创科技（中）', val: '800G/1.6T AEC铜缆认证', note: '短距传输替代部分光模块份额' },
      { lbl: '立讯精密（中）', val: '高速背板+连接器深度布局', note: '收购汇聚科技扩产铜连接器' }
    ],
    stocks: [
      { rank:1, name:'沃尔核材', code:'002130', position:'224G铜缆全球市占24.2%，国内唯一量产', barrier:'极高', hits:4, strength:'★★★', logic:'深度绑定安费诺→间接进英伟达GB200/GB300全系。448G已送样验证。2025高速通信线收入10.17亿（+238%）。卡位20余台进口发泡芯线挤出机→产能壁垒极高' },
      { rank:2, name:'博创科技', code:'300548', position:'800G/1.6T AEC铜缆龙头', barrier:'高', hits:3, strength:'★★☆', logic:'通过英伟达认证。短距互联"光退铜进"核心受益者。但也面临光模块回抢份额风险' },
      { rank:3, name:'立讯精密', code:'002475', position:'高速背板+铜连接器龙头', barrier:'高', hits:null, strength:null, logic:'GB200/GB300铜连接核心供应链。收购汇聚科技扩产。全球连接器TOP10' }
    ]
  },
  {
    name: 'BBU/超级电容 + 48V电源', costRatio: '整机8-12%', barrier: 'high', choke: false, border: false,
    intro: 'GB300功耗暴涨推动<strong>48V高压架构+BBU超级电容方案</strong>升级。BBU（Battery Backup Unit）在断电瞬间通过超级电容提供毫秒级供电保护。GB300标配BBU单柜价值~5万元。Vera Rubin（Kyber架构）单柜电源价值将是GB200的<strong>10倍以上</strong>。核心瓶颈：超级电容通过AI服务器认证的企业<strong>全球仅3家</strong>。',
    globalLandscape: [
      { lbl: '🥇 江海股份（中）', val: '超级电容通过AI服务器认证', note: 'GB300标配BBU核心供应商' },
      { lbl: '🥈 麦格米特（中）', val: '英伟达电源合作商', note: 'HVDC方案适配48V高压，海外市场布局' },
      { lbl: '🥉 禾望电气（中）', val: '数据中心电源预增65%', note: '切入HVDC海外市场' }
    ],
    stocks: [
      { rank:1, name:'江海股份', code:'002484', position:'超级电容通过AI服务器认证', barrier:'高', hits:3, strength:'★★☆', logic:'全球仅3家通过AI服务器超容认证。GB300 BBU标配单柜价值5万元。同时受益新能源+AI双驱动' },
      { rank:2, name:'麦格米特', code:'002851', position:'英伟达电源合作商', barrier:'高', hits:null, strength:null, logic:'HVDC方案直接适配GB300 48V架构。海外市场拓展中。AI电源增量明确' },
      { rank:3, name:'禾望电气', code:'603063', position:'数据中心电源+65%', barrier:'中', hits:null, strength:null, logic:'HVDC海外市场斩获订单。但供应商可替代→非寡头' }
    ]
  }
];

// AI Server Midstream
CHAINS['ai-server'].midstream = {
  description: 'AI服务器整机制造是充分竞争行业。工业富联（富士康）独家设计生产GB300，浪潮信息液冷基础设施全球第一，华勤技术深度绑定英伟达NVL20 GPU。卡口判定：该环节全球>10家ODM/OEM→不构成物理卡口。但头部企业强者恒强。',
  stocks: [
    { rank:1, name:'工业富联', code:'601138', barrier:'极高', note:'英伟达GB300核心代工厂（独家设计生产），已量产，订单可见度到2027年' },
    { rank:2, name:'浪潮信息', code:'000977', barrier:'高', note:'AI服务器龙头，液冷基础设施全球市占5.5%，单相冷板细分全球第一' },
    { rank:3, name:'华勤技术', code:'603296', barrier:'高', note:'NVL20 GPU深度绑定英伟达，业绩预增47%' }
  ]
};

// AI Server Four Questions
CHAINS['ai-server'].fourQuestions = {
  segments: [
    {
      name: '液冷散热（英维克vs高澜vs曙光）',
      stocks: [
        { name:'英维克', code:'002837', q1:true, q1note:'国内唯一NPN Tier1', q2:true, q2note:'一线产能12-15月', q3:true, q3note:'单相冷板无替代', q4:true, q4note:'GB300/TPU刚需', hits:4, strength:'★★★' },
        { name:'高澜股份', code:'300499', q1:false, q1note:'国内>3家CDU', q2:true, q2note:'', q3:false, q3note:'申菱/英维克可替', q4:true, q4note:'', hits:2, strength:null }
      ]
    },
    {
      name: '高速铜连接',
      stocks: [
        { name:'沃尔核材', code:'002130', q1:true, q1note:'全球仅3家量产224G', q2:true, q2note:'挤出机交期>12月', q3:true, q3note:'224G只有3家能做', q4:true, q4note:'GB300全系标配', hits:4, strength:'★★★' }
      ]
    },
    {
      name: 'BBU/超级电容',
      stocks: [
        { name:'江海股份', code:'002484', q1:true, q1note:'全球仅3家认证', q2:true, q2note:'认证周期>12月', q3:false, q3note:'Maxwell/Eaton可替', q4:true, q4note:'GB300标配', hits:3, strength:'★★☆' }
      ]
    },
    {
      name: 'AI服务器整机（充分竞争）',
      stocks: [
        { name:'工业富联', code:'601138', q1:false, q1note:'>10家ODM', q2:false, q2note:'', q3:false, q3note:'浪潮/华勤可替', q4:false, q4note:'', hits:0, strength:null }
      ]
    }
  ]
};

// AI Server Choke Points
CHAINS['ai-server'].chokePoints = [
  { rank:1, name:'英维克', code:'002837', segment:'液冷散热系统', strength:'★★★', logic:'国内<strong>唯一</strong>获英伟达NPN Tier1液冷认证。GB300冷板市占42%、CDU市占率第一。在手订单>45亿排至2027年。液冷从"可选"→GB300"标配"→Rubin"强制100%液冷"。海外毛利率52.64%是国内3x——出海放量只是时间问题。', tags:['国内唯一Tier1','冷板42%','GB300全系标配','订单排至2027'] },
  { rank:2, name:'沃尔核材', code:'002130', segment:'高速铜连接(224G)', strength:'★★★', logic:'全球<strong>仅3家</strong>224G PAM4铜缆量产。国内唯一。深度绑定安费诺→间接进英伟达GB200/GB300全系。2025高速通信线收入+238%。卡位20余台进口挤出机→新进入者至少等12-18个月产能。超节点铜连接市场2026E~67亿（+106%）。', tags:['全球仅3家','国内唯一量产','挤出机被卡','绑定安费诺→英伟达'] },
  { rank:3, name:'江海股份', code:'002484', segment:'BBU超级电容', strength:'★★☆', logic:'全球<strong>仅3家</strong>超级电容通过AI服务器认证。GB300标配BBU单柜价值~5万元。Vera Rubin电源价值10x GB200→BBU用量再升级。但Maxwell/Eaton可替代，非唯一寡头→降级。', tags:['全球仅3家认证','GB300标配','Rubin再升级','非唯一寡头'] }
];
CHAINS['ai-server'].supplyGap = [
  { segment:'液冷CDU/冷板产能', demand:'GB300液冷100%标配+谷歌TPU', capacity:'英维克在手>45亿排至2027', gap:'产能缺口>30%', rate:'~30%', bottleneck:'产线建设12-15月+海外扩产缓慢' },
  { segment:'224G高速铜缆', demand:'超节点2026E~67亿(英伟达+ASIC)', capacity:'安费诺+沃尔+另1家', gap:'二梯队厂商交期>18月', rate:'~20%', bottleneck:'发泡芯线挤出机交期>12月' }
];
CHAINS['ai-server'].methodologyNotes = 'AI服务器的物理卡口集中在液冷和铜连接两个环节。整机制造（工业富联/浪潮/华勤）虽然营收最大，但客户可切换供应商→不构成物理卡口。注意：①液冷目前产能严重不足，但技术门槛中等，需警惕新进入者出现；②铜连接有"正交背板"替代风险（Rubin Ultra架构变化），但中短期沃尔受益确定性高。';

})(window.CHAINS);
