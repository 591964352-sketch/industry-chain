// data/semi.js — 升级九 STEP 4 小步 2：SEMICONDUCTOR (半导体) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.semi 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== SEMICONDUCTOR ====================
CHAINS.semi = {
  id: 'semi', name: '半导体', icon: '💻',
  plainIntro: {
    analogy: '半导体 = 现代工业的"粮食" + 数字世界的"细胞"',
    paragraphs: [
      '你手机里的处理器、电脑的内存、汽车里的控制芯片、AI服务器里的GPU——<strong>全都是半导体芯片</strong>。如果说 PCB 是电子产品的骨骼，半导体就是<strong>大脑</strong>。没有芯片，所有电子设备都是空壳。半导体产业链被誉为"人类历史上最复杂的制造体系"——从一粒沙子（硅）到一颗芯片，需要<strong>上千道工序、数百种材料、数十种核心设备</strong>。',
      '<strong>为什么半导体是"卡脖子"最严重的行业？</strong>因为全产业链的核心环节被极少数公司垄断：光刻机只有荷兰 ASML 能造（EUV 100%垄断），EDA 工具被美国三巨头控制 81%，高端光刻胶被日本企业占据 70%+。中国每年进口芯片超过<strong>4000 亿美元</strong>，超过石油进口金额。国产替代是国家级战略。'
    ],
    flowSteps: ['硅砂→高纯硅→硅片','光刻/刻蚀/沉积','晶圆制造(Foundry)','封装测试','芯片→装进产品'],
    highlightBox: '<strong>💡 物理卡口 视角：半导体行业真正的"河道收窄处"在哪里？</strong><br>① <strong>EUV 光刻机</strong>：ASML 100% 垄断，但 A 股无直接标的。② <strong>EDA 工具</strong>：Synopsys/Cadence/西门子占 81%，华大九天是国内唯一全流程替代。③ <strong>高端光刻胶</strong>：日本 JSR/TOK 占 70%+，南大光电是国内唯一 ArF 量产企业。④ <strong>大硅片</strong>：信越/SUMCO 垄断 12 英寸高端市场。半导体的卡口比 PCB 更硬、更深、更难突破——但一旦突破，就是数十年的护城河。'
  },
  overview: [
    { label: '🌍 全球半导体销售额（2026E）', value: '<mark class="updated">$15,112 亿</mark>', note: 'WSTS 2026.6春季预测，+89.9% YoY', color: 'var(--accent)' },
    { label: '📊 2025实际销售额', value: '$7,917 亿', note: 'SIA: +25.6% YoY', color: null },
    { label: '📈 2026年4月单月', value: '$1,105 亿', note: 'SIA: 环比+11%，同比+93.9%', color: 'var(--green)' },
    { label: '🇨🇳 中国进口芯片/年', value: '>$4000 亿', note: '超过石油进口金额', color: 'var(--red)' },
    { label: '🔧 国产设备自给率（2026）', value: '~35%', note: '2022年16%→2026突破35%，先进<15%', color: 'var(--barrier-high)' },
    { label: '🏭 产业阶段', value: '全面攻坚期', note: '大基金三期3440亿投入', color: 'var(--accent)' },
    { label: '📐 EDA国产化率（2026）', value: '<15%', note: '5nm以下<5%，华大九天全球第6', color: 'var(--red)' },
    { label: '⚡ 核心驱动', value: 'AI芯片+国产替代', note: '昇腾/寒武纪+长存全自主产线', color: null },
    { label: '🔴 最大瓶颈', value: 'EUV光刻机', note: 'ASML 100%垄断，10万+零部件', color: 'var(--red)' },
    { label: '📋 材料国产化率', value: '~30%', note: 'EUV光刻胶0%·12寸硅片<20%', color: null }
  ],
  treeMap: {
    downstream: { name: 'AI芯片·手机·汽车·IoT·5G', barrier: 'low', note: '中国占全球芯片消费60%+' },
    midstream: { name: 'IC设计→晶圆制造→封装测试', barrier: 'low', note: '设计3600+家/制造中芯国际全球第3/封测全球前三' },
    upstreamTools: { name: 'EDA+IP → 芯片设计工具', barrier: 'extreme', note: 'Synopsys/Cadence/西门子81%→华大九天<10%' },
    equipment: [
      { name: '光刻机 / EUV（极紫外）/ DUV（深紫外）', barrier: 'extreme', choke: true, note: 'ASML 100% EUV·28nm DUV刚突破' },
      { name: '刻蚀机', barrier: 'high', choke: false, note: '中微5nm进台积电·国产化~25%' },
      { name: '薄膜沉积', barrier: 'high', choke: false, note: '拓荆/北方华创·国产化~20%' },
      { name: '检测 / 量测（KLA垄断）', barrier: 'extreme', choke: false, note: 'KLA垄断·国产化<5%' }
    ],
    materials: [
      { name: '光刻胶 / ArF（氟化氩）/ EUV（极紫外）', barrier: 'extreme', choke: true, note: '日本70%+·EUV 0%国产' },
      { name: '12英寸硅片', barrier: 'extreme', choke: true, note: '信越+SUMCO 60%' },
      { name: '电子特气', barrier: 'high', choke: false, note: '华特唯一ASML认证' },
      { name: '靶材 / CMP（化学机械抛光）', barrier: 'high', choke: false, note: '江丰/安集突破' }
    ],
    sideBranches: [
      { name: '先进封装(Chiplet)', barrier: 'high', note: '长电科技全球第3' },
      { name: '存储芯片 / DRAM / NAND', barrier: 'extreme', note: '长鑫第4·长存第6' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// Semiconductor Segments
CHAINS.semi.segments = [
  {
    name: 'EDA工具 — 芯片之母', costRatio: '设计环节核心', barrier: 'extreme', choke: true, border: true,
    intro: 'EDA（电子设计自动化）是芯片设计的<strong>必备工具</strong>——没有EDA就画不了芯片。全球市场~118亿美元，<strong>Synopsys+ Cadence+西门子占81%</strong>。国内华大九天全球第6（营收1.56亿美元），全流程工具国产化率<strong><10%</strong>，先进制程（7nm以下）仍<strong>完全依赖进口</strong>。研发一套全流程EDA成本超10亿美元，需与晶圆厂工艺深度绑定。',
    globalLandscape: [
      { lbl: '🥇 Synopsys（美）+Cadence（美）', val: '全球EDA双寡头', note: '合计占~65%' },
      { lbl: '🥈 西门子EDA（德）', val: '全球第三', note: '三巨头合计占81%' },
      { lbl: '🥉 华大九天（中）', val: '全球第6，国内龙头', note: '模拟/存储/射频全流程覆盖' },
      { lbl: '概伦电子/合见工软（中）', val: '国产EDA追赶者', note: '点工具突破阶段' }
    ],
    stocks: [
      { rank:1, name:'华大九天', code:'301269', position:'国内EDA绝对龙头，全球第6', barrier:'极高', hits:4, strength:'★★★', logic:'国内唯一全流程EDA+全品类存储EDA设计平台。2026Q1营收2.57亿+9.65%，研发费用率64.84%→净利<mark class="updated">-0.73亿（由盈转亏）</mark>。境外营收+127.5%。3DIC设计验证全流程国内唯一。Synopsys/Cadence/西门子垄断81%→寡头格局明确。短期亏损是战略性研发投入的结果' },
      { rank:2, name:'概伦电子', code:'688206', position:'国产EDA第二', barrier:'高', hits:null, strength:null, logic:'SPICE仿真工具领先，但仅为点工具→尚不能替代全流程' },
      { rank:3, name:'芯原股份', code:'688521', position:'半导体IP+设计服务', barrier:'高', hits:null, strength:null, logic:'IP授权模式，ARM/x86替代路径，芯片设计平台化' }
    ]
  },
  {
    name: '半导体设备 — 工业皇冠上的明珠', costRatio: '制造投资70%+', barrier: 'extreme', choke: true, border: true,
    intro: '半导体设备是晶圆制造的<strong>"工业母机"</strong>。2026年全球设备出货预计$1240亿（+18.2%），ASML+应用材料+泛林三家占60%+。核心环节：<strong>光刻（ASML 100% EUV）→ 刻蚀（中微5nm突破）→ 薄膜沉积（拓荆/北方华创）→ 清洗/CMP/检测</strong>。国产设备整体自给率2026年突破<strong>35%</strong>（2022年仅16%），但先进制程<15%。北方华创Q1营收103亿首破百亿，在手订单超650亿排至2027Q3。',
    globalLandscape: [
      { lbl: '🥇 ASML（荷）', val: 'EUV 100%垄断+90%+先进DUV', note: '年营收327亿欧元，单台EUV>$1.5亿' },
      { lbl: '🥈 应用材料+泛林（美）', val: '刻蚀/沉积/检测全球领先', note: '与ASML/TEL并称四巨头' },
      { lbl: '🥉 北方华创（中）', val: '国内平台型设备龙头，全球第5', note: '2025营收467亿元，覆盖多环节' },
      { lbl: '中微公司（中）', val: '5nm刻蚀进台积电，全球第13', note: 'CCP介质刻蚀良率>98%' }
    ],
    stocks: [
      { rank:1, name:'北方华创', code:'002371', position:'国内最大平台型设备商，全球第5', barrier:'极高', hits:4, strength:'★★★', logic:'覆盖刻蚀/薄膜/清洗/热处理。全球PVD市占12%。国内唯一平台型设备商。2026Q1营收103亿+25.8%，<mark class="updated">净利16.35亿+3.42%</mark>，在手订单>650亿排至2027Q3' },
      { rank:2, name:'中微公司', code:'688012', position:'5nm刻蚀进台积电，全球第13', barrier:'极高', hits:3, strength:'★★☆', logic:'2026Q1营收29亿+34%，净利9.3亿+197%（创历史新高）。薄膜沉积收入+224%。在手订单>280亿排至2027Q1。但刻蚀全球>5家→非绝对寡头' },
      { rank:3, name:'拓荆科技', code:'688072', position:'国内PECVD龙头', barrier:'高', hits:null, strength:null, logic:'28nm-5nm全制程覆盖的薄膜沉积。ALD/HBM需求爆发受益' },
      { rank:4, name:'华海清科', code:'688120', position:'国内唯一12英寸CMP量产', barrier:'高', hits:null, strength:null, logic:'CMP国产化率~20%，28nm量产交付' },
      { rank:5, name:'盛美上海', code:'688082', position:'清洗设备龙头', barrier:'高', hits:null, strength:null, logic:'进入台积电CoWoS产线。清洗国产化~30%' },
      { rank:6, name:'中科飞测', code:'688361', position:'量测检测国产替代', barrier:'高', hits:null, strength:null, logic:'KLA垄断>70%的量测市场。国产化<5%' }
    ]
  },
  {
    name: '半导体材料 — 制造的"血液与粮食"', costRatio: '全球~$700亿', barrier: 'extreme', choke: true, border: true,
    intro: '半导体材料全球市场~700-732亿美元，中国占36.7%全球第一。但<strong>高端材料被日本垄断严重</strong>：19种主要材料中日本14种全球第一。最关键瓶颈：<strong>高端光刻胶（ArF浸没式~0-2%国产、EUV 0%）+12英寸大硅片（<20%）</strong>。2025年国内材料整体国产化率~30%，成熟制程材料~40-60%，但先进制程材料严重依赖进口。',
    globalLandscape: [
      { lbl: '光刻胶：日本JSR/TOK', val: '全球70%+，EUV光刻胶0%国产', note: '南大光电累计6款ArF通过验证，收入破2000万' },
      { lbl: '12英寸硅片：信越+SUMCO', val: '全球60%', note: '沪硅产业/立昂微追赶中' },
      { lbl: '电子特气：华特气体', val: '国内唯一通过ASML认证', note: 'NF₃/WF₆产能全球前列' },
      { lbl: '抛光液/垫：安集/鼎龙', val: '安集全球市占~10%', note: '鼎龙抛光垫国产替代率近80%' }
    ],
    stocks: [
      { rank:1, name:'南大光电', code:'300346', position:'国内唯一ArF光刻胶量产', barrier:'极高', hits:4, strength:'★★★', logic:'2026Q1营收<mark class="updated">6.62亿+5.45%</mark>，净利<mark class="updated">1.24亿+29.97%</mark>。通过中芯28nm验证，累计6款ArF光刻胶通过验证，光刻胶收入突破2000万。光刻胶是半导体材料壁垒最高品种。日本垄断70%+' },
      { rank:2, name:'沪硅产业', code:'688126', position:'12英寸硅片龙头', barrier:'极高', hits:3, strength:'★★☆', logic:'信越+SUMCO垄断60%高端市场。国产化~10-20%。12寸硅片认证周期1-2年。2026年进入提价周期' },
      { rank:3, name:'华特气体', code:'688268', position:'国内唯一ASML认证特气', barrier:'极高', hits:3, strength:'★★☆', logic:'光刻气市占率>60%。ASML认证壁垒极高。电子特气国产化~30-40%' },
      { rank:4, name:'安集科技', code:'688019', position:'CMP抛光液国内绝对龙头', barrier:'高', hits:null, strength:null, logic:'全球市占~10%，进入台积电供应链。Cabot+Fujimi占75%' },
      { rank:5, name:'江丰电子', code:'300584', position:'溅射靶材全球市占>38%', barrier:'高', hits:null, strength:null, logic:'已进入台积电/中芯供应链。全球靶材龙头。股价今年累计涨超60%' },
      { rank:6, name:'鼎龙股份', code:'300054', position:'抛光垫国产替代率近80%', barrier:'高', hits:null, strength:null, logic:'打破陶氏垄断。同时布局抛光液/光刻胶' },
      { rank:7, name:'立昂微', code:'605358', position:'12英寸硅片产能快速扩张', barrier:'高', hits:null, strength:null, logic:'2026年净利增速预期超12倍。硅片涨价弹性最大' }
    ]
  },
  {
    name: '晶圆制造 — 技术壁垒最高的核心战场', costRatio: '产业链价值核心', barrier: 'extreme', choke: false, border: false,
    intro: '晶圆制造（Foundry）将设计图纸变成实体芯片，是半导体产业链<strong>技术壁垒最高的环节</strong>。台积电全球代工份额56%。中芯国际2025Q2跃居第3（超过联电和格芯）。28nm及以上自给率>75%，但<strong>7nm以下自给率<20%</strong>——受EUV设备禁运限制。国内晶圆厂全球市占率有望从10%→30%（3倍扩产空间）。卡口判定：制造端台积电是绝对龙头但非A股标的；中芯国际等追赶者不满足寡头条件。',
    globalLandscape: [
      { lbl: '🥇 台积电（台）', val: '全球代工份额56%', note: '3nm量产，2nm研发中' },
      { lbl: '🥈 三星（韩）', val: '全球第二', note: '与台积电竞争先进制程' },
      { lbl: '🥉 中芯国际（中）', val: '全球第3，28nm规模化量产', note: '14nm良率>95%，7nm DUV多重曝光突破' }
    ],
    stocks: [
      { rank:1, name:'中芯国际', code:'688981', position:'全球第3代工厂', barrier:'极高', hits:null, strength:null, logic:'14nm良率>95%。7nm DUV突破但受EUV限制。月产能35万片。Q1净利大幅增长' },
      { rank:2, name:'华虹公司', code:'688347', position:'全球第6代工厂', barrier:'高', hits:null, strength:null, logic:'特色工艺（功率/模拟/嵌入式）。成熟制程为主' }
    ]
  },
  {
    name: '封装测试 — 中国最具优势环节', costRatio: '全球~$821亿', barrier: 'mid', choke: false, border: false,
    intro: '封装测试是半导体产业链中<strong>中国最具竞争力的环节</strong>。长电科技全球第3、通富微电全球第4、华天科技全球第6。传统封装国产化率>70%，先进封装（Chiplet/2.5D/3D）国产化率~30%。Chiplet成为突破摩尔定律的关键。卡口判定：该环节全球参与者>10家→不构成物理卡口。',
    globalLandscape: [
      { lbl: '🥇 日月光（台）', val: '全球封测第一', note: '规模最大' },
      { lbl: '🥈 长电科技（中）', val: '全球第3，$50亿营收', note: 'XDFOI方案规模量产' },
      { lbl: '🥉 通富微电+华天科技（中）', val: '全球第4+第6', note: '合计营收超$53亿' }
    ],
    stocks: [
      { rank:1, name:'长电科技', code:'600584', position:'全球封测第3', barrier:'高', hits:null, strength:null, logic:'XDFOI Chiplet方案规模量产。先进封装营收占比持续提升' },
      { rank:2, name:'通富微电', code:'002156', position:'全球封测第4', barrier:'中', hits:null, strength:null, logic:'AMD主要封测合作伙伴。先进封装布局' },
      { rank:3, name:'华天科技', code:'002185', position:'全球封测第6', barrier:'中', hits:null, strength:null, logic:'多基地布局，Chiplet封装推进中' }
    ]
  }
];

// Semiconductor Four Questions
CHAINS.semi.fourQuestions = {
  segments: [
    {
      name: 'EDA工具',
      stocks: [
        { name:'华大九天', code:'301269', q1:true, q1note:'Synopsys/Cadence/西门子81%', q2:true, q2note:'切换周期3-5年+', q3:true, q3note:'无替代工具', q4:true, q4note:'芯片设计刚需', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '半导体设备',
      stocks: [
        { name:'北方华创', code:'002371', q1:true, q1note:'国内平台型唯一', q2:true, q2note:'设备验证18-24月', q3:true, q3note:'多环节覆盖', q4:true, q4note:'晶圆厂刚需', hits:4, strength:'★★★' },
        { name:'中微公司', code:'688012', q1:true, q1note:'5nm刻蚀进台积电', q2:true, q2note:'', q3:false, q3note:'全球≥5家可替', q4:true, q4note:'', hits:3, strength:'★★☆' },
        { name:'中科飞测', code:'688361', q1:true, q1note:'KLA垄断70%+', q2:true, q2note:'', q3:false, q3note:'', q4:true, q4note:'', hits:3, strength:'★★☆' }
      ]
    },
    {
      name: '半导体材料',
      stocks: [
        { name:'南大光电', code:'300346', q1:true, q1note:'国内唯一ArF量产', q2:true, q2note:'认证周期1-2年', q3:true, q3note:'日本垄断70%+替代难', q4:true, q4note:'光刻工艺刚需', hits:4, strength:'★★★' },
        { name:'沪硅产业', code:'688126', q1:true, q1note:'信越+SUMCO 60%', q2:true, q2note:'认证周期1-2年', q3:false, q3note:'SUMCO/信越可替', q4:true, q4note:'', hits:3, strength:'★★☆' },
        { name:'华特气体', code:'688268', q1:true, q1note:'唯一ASML认证', q2:true, q2note:'', q3:false, q3note:'空气化工/林德可替', q4:true, q4note:'', hits:3, strength:'★★☆' }
      ]
    },
    {
      name: '晶圆制造/封测（充分竞争）',
      stocks: [
        { name:'中芯国际', code:'688981', q1:false, q1note:'台积电56%份额', q2:false, q2note:'', q3:false, q3note:'三星/台积电可替', q4:false, q4note:'', hits:0, strength:null },
        { name:'长电科技', code:'600584', q1:false, q1note:'日月光第一', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:0, strength:null }
      ]
    }
  ]
};

// Semiconductor Choke Points
CHAINS.semi.chokePoints = [
  { rank:1, name:'华大九天', code:'301269', segment:'EDA工具', strength:'★★★', logic:'全球EDA市场被<strong>Synopsys/Cadence/西门子垄断81%</strong>。华大九天是国内唯一全流程EDA工具提供商。芯片设计必须用EDA→下游100%刚需。切换EDA工具需重新培训团队+重跑验证流程→替换成本极高。研发一套全流程EDA成本>10亿美元。Q1营收2.57亿+9.65%，研发费用率64.84%→短期亏损是战略投入。', tags:['三巨头81%','替换成本极高','下游100%刚需','国产唯一全流程'] },
  { rank:2, name:'北方华创', code:'002371', position:'国内平台型唯一', segment:'半导体设备', strength:'★★★', logic:'国内<strong>唯一平台型设备商</strong>，覆盖刻蚀/薄膜/清洗/热处理全环节。全球第5，2025营收467亿+42%。晶圆厂扩产设备采购占投资70%+。设备验证周期18-24月→一旦导入几乎不更换。国产设备价格低20-40%。', tags:['国内唯一平台型','全球第5','验证周期锁定','扩产刚需'] },
  { rank:3, name:'南大光电', code:'300346', segment:'高端光刻胶(ArF)', strength:'★★★', logic:'国内<strong>唯一ArF光刻胶量产</strong>企业。全球ArF光刻胶日本垄断70%+，浸没式国产化0-2%。光刻胶是半导体材料壁垒最高品种→配方含数千种组分。通过中芯28nm验证。认证周期1-2年→一旦导入极难替换。', tags:['日本垄断70%+','国内唯一ArF','认证周期1-2年','数千种组分壁垒'] }
];
CHAINS.semi.supplyGap = [
  { segment:'EDA全流程工具', demand:'全球$118亿', capacity:'国产<10%覆盖', gap:'巨大', rate:'>90%进口', bottleneck:'研发成本>10亿美元' },
  { segment:'EUV光刻机', demand:'全球~$200亿+', capacity:'ASML 100%', gap:'0%国产', rate:'100%进口', bottleneck:'10万+零部件' },
  { segment:'ArF/EUV光刻胶', demand:'全球~$20亿+', capacity:'日本70%+', gap:'ArF浸没式0-2%国产', rate:'~98%进口(高端)', bottleneck:'数千种组分配方' }
];
CHAINS.semi.methodologyNotes = '半导体行业的核心物理卡口集中在三个环节：①EDA工具（Synopsys/Cadence/西门子81%寡头→华大九天国产替代）；②高端光刻胶（日本JSR/TOK垄断70%+→南大光电突破）；③半导体设备（特别是光刻机ASML 100%垄断，虽无A股直接标的，但北方华创作为国内唯一平台型设备商具备类卡口特征）。晶圆制造和封装测试环节竞争格局分散→不满足寡头条件。值得注意的是，半导体卡口比PCB更深——突破难度更大，但一旦突破护城河也更深。';



})(window.CHAINS);
