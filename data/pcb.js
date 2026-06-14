// data/pcb.js  —— 升级九 STEP 4 小步 1：PCB 数据外置（30+ 条赛道容错隔离的第一步）
// 由 index.html 在主 <script> 之前以 <script src="data/pcb.js"></script> 加载。
// 全局 window.CHAINS 由本文件首次初始化（用 || 兜底）；index.html 主 script 通过
// const CHAINS = window.CHAINS = window.CHAINS || {} 绑定同一对象，继续加 semi/hbm 等链。
// 加载失败（404 / 语法错）→ window.CHAINS.pcb 缺失 → renderChain guard 显示"该赛道数据加载失败"
// 而非白屏 → 其余 11 条赛道照常渲染（独立 <script> 互不连坐，单文件无法做到的容错）。
//
// 内容 = 原 index.html line 565-1063 PCB 数据块原样搬运（IIFE 包一层，CHAINS 别名 = window.CHAINS）。
// 数据 schema、字段、注释、行号顺序与原内联版本字节对齐——仅"位置"变化，"内容"未变。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== PCB ====================
CHAINS.pcb = {
  id: 'pcb', name: 'PCB 印制电路板', icon: '🔌',
  // ★ 升级九 STEP 2：赛道级 meta（分组/筛选/治理）—— 样板 §8.2
  meta: { sector:'中游', tier:'核心', status:'active', updatedAt:'2026-06-12', ltFit:null },
  // ★ 升级九 STEP 2：景气六维 —— 样板 §3.1 原文（全标 🆪 AI 主观判断，cron 不刷数据截止日）
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:4, trend:'up',
        reason:'AI 结构性上行：单机 PCB 价值量较传统服务器提升 5–10 倍(UBS)；高多层/IC载板/高速CCL 2024–29 CAGR 约 15.7%/7.4%/40%，远超行业 5% 均速；GB200/300+2026 Rubin+中板/背板持续抬升。总量温和、弹性集中高端，故 4。',
        evidence:'Prismark、UBS / 2026-06', flag:'🆪', tier:'broker', src:'Prismark 2026.6 + UBS 行业报告' },
      { key:'visibility', name:'业绩可见度', score:5, trend:'up',
        reason:'已兑现非纯预期：沪电 2026Q1 营收+54%/净利+63%、2025 营收189亿(+42%)；胜宏 2025 净利43.1亿居A股PCB首位；生益电子 2025 前三季净利约+500%。订单+扩产长协可见。',
        evidence:'2025年报/2026Q1公告 / 2026-06', flag:'🆪', tier:'primary', src:'2025年报+2026Q1公告（cninfo / 上交所 / 深交所）' },
      { key:'policy', name:'政策确定性', score:3, trend:'flat',
        reason:'主体由 AI capex 市场驱动、政策为辅；但 IC 载板纳入"02 专项"、大基金二期投兴森，国产替代有政策顺风。制造环节中等、载板/上游材料更强。',
        evidence:'大基金二期、02专项 / 2026-06', flag:'🆪', tier:'primary', src:'大基金二期公告 + 02 专项政府文件' },
      { key:'supply', name:'供需紧张度', score:4, trend:'up',
        reason:'结构性紧张：高速 CCL 阶段性缺货、高端电子布(石英布/Low-DK)2026–28 缺口显著、ABF 膜(味之素)卡脖子、HVLP 铜箔偏紧；低端单双面板过剩内卷。紧张集中高端材料。',
        evidence:'行业供需测算/公司公告 / 2026-06', flag:'🆪', tier:'broker', src:'Prismark 2026.6 + CPCA 2025 + 公司公告交叉验证' },
      { key:'valuation', name:'估值性价比', score:1, trend:'down',
        reason:'⚠️本轮最大扣分项（更新·亿牛网2026-06-12）：3 只核心卡口 2 只 PE-TTM 99.8%/99.9% 绝对历史高位（东材 270.8x / 菲利华 166.11x）+ 1 只 TTM 失真（铜冠铜箔 2024亏损+2025盈利近零致TTM失真、上市<5y 不构成5y分位，建议改 PB/PS 上市以来分位代替）——比 AI 初判（82/45/18 错落分布）整体更贵，性价比进一步下修。下钻见各卡口 valuation。',
        evidence:'roll-up 自 chokePoints[].valuation / 2026-06-12', flag:'🆪', rollupFrom:'chokePoints[].valuation.pePercentile', tier:'media', src:'亿牛网 PE 聚合页（media 单源）· 3 卡口 PE-TTM 均为 2026-06-12 收盘·未独立交叉核实', asOf:'2026-06-12' },
      { key:'barrier', name:'壁垒安全垫', score:4, trend:'flat',
        reason:'分化极大：T0(ABF载板/高速CCL M9–M10/高端电子布)极高、安全垫足；T4(单双面/普通多层)几无壁垒、内卷。赛道级取核心卡口环节给 4。下钻见 segments[].barrier 与卡口 strength。',
        evidence:'roll-up 自 segments[].barrier / 2026-06', flag:'🆪', rollupFrom:'segments[].barrier', tier:'estimate', src:'AI 主观打分 + roll-up' }
    ],
    verdict: {
      longTermFit:'适合长线研究/跟踪，但不宜当前高位追——等买点或选环节',
      oneLine:'🆪 PCB 是"业绩可见度(5)+景气持续性(4)"双高、但"估值性价比(2)"明显偏贵的赛道：长线逻辑顺，胜负手在买点与选环节。',
      stockHint:'优先 T0/T1 环节（极高/高壁垒），PE 分位越低越安全；景气+确定性选环节，壁垒+估值选标的与买点。'
    }
  },
  cyclePosition: { stage:'boom', label:'繁荣中后期', reason:'🆪 AI 算力超级上行周期，需求强劲但估值已高，2027 年上游集中扩产可能形成供给拐点（AI初版，周一cron覆盖）', watchSignals:['英伟达资本开支指引（季度财报披露）','上游集中扩产公告（M9 树脂/HVLP 铜箔新产能落地）','M9 材料缺口率变化（缺口收窄 = 见顶信号）'] },
  plainIntro: {
    analogy: 'PCB = 所有电子产品的"骨架 + 血管系统"',
    paragraphs: [
      '你手机里那块绿色的板子、电脑显卡上密密麻麻的线路、汽车里的控制电路——<strong>都是 PCB（印制电路板）</strong>。它做两件事：① 把芯片、电阻、电容这些零件<strong>固定住</strong>（像骨骼），② 用铜线把它们<strong>连起来通电</strong>（像血管）。没有 PCB，再强的芯片也只是散落一地的沙子。',
      '<strong>AI 时代的 PCB 贵在哪？</strong> 普通 PCB 像一栋 4 层板房，AI 服务器用的 PCB 像 30 层的摩天大楼——层数越多信号传输越快但干扰也越大，对材料的要求成倍飙升。一块 AI 服务器 PCB 的价格是普通 PCB 的 <strong>10-50 倍</strong>，而材料成本占 PCB 总成本的 <strong>60% 以上</strong>。'
    ],
    flowSteps: ['矿石/石油','树脂+玻纤布','铜箔','三者压合=覆铜板CCL','蚀刻钻孔=PCB','装进显卡/服务器'],
    highlightBox: '<strong>💡 物理卡口 视角：为什么上游材料比 PCB 制造更有"卡口"价值？</strong><br>PCB 制造厂全球有 100+ 家，客户随时可以换供应商。但上游的<strong>碳氢树脂全球只有 2 家通过认证、Q布全球只有 3 家能量产、HVLP4 铜箔被日韩垄断 85%</strong>——这就是"河道收窄处"。不管下游 PCB 制造多卷，水流（需求）必须从这几家过。2026 年英伟达 Rubin 架构全面采用 M9 级别材料，缺口最大的就是这三个环节。'
  },
  overview: [
    { label: '🌍 全球 PCB 产值（2026E）', value: '~$958 亿', note: '2025实际$852亿，+12.5%（Prismark 2026.6）', color: 'var(--accent)', tier:'broker', src:'Prismark 2026.6' },
    { label: '🇨🇳 中国大陆全球占比', value: '~55%', note: '全球最大生产国（Prismark 2026）', color: 'var(--blue)', tier:'broker', src:'Prismark 2026（54-55% 区间已核实）' },
    { label: '🤖 AI 算力核心驱动', value: 'CAGR 30%+', note: '2024-2028 价值量 3-5x（Prismark 2026.6）', color: 'var(--green)', tier:'broker', src:'Prismark 2026.6' },
    { label: '🏭 产业阶段', value: '结构性升级期', note: '低端饱和/M7+供不应求（CPCA 2025）', color: 'var(--accent)', tier:'broker', src:'CPCA 2025' },
    { label: '📐 M9 CCL 市场（2026E）', value: '~$80 亿', note: 'CAGR 40%，缺口~20%（待核一手）', color: 'var(--red)', tier:'estimate', src:'未找到 Prismark 一手来源，AI 估算待核' },
    { label: '⚡ 下一代催化', value: 'Rubin + GB300', note: '英伟达GTC 2026：Rubin 2026Q3量产', color: null, tier:'broker', src:'英伟达 GTC 2026 / 券商纪要' },
    { label: '🔴 核心矛盾', value: '上游材料卡脖子', note: '碳氢树脂<30%·Q布<30%·HVLP4<15%（CPCA 2025）', color: 'var(--red)', tier:'broker', src:'CPCA 2025 国产化率统计' },
    { label: '📋 M9 材料国产化率', value: '<mark class="updated">树脂<10%·Q布国产化率~80%</mark>', note: '铜箔15-20%·CCL~30%（Prismark 2026.6；80%为国产化率(非全球市占)、估算待核）', color: null, tier:'media', src:'国产化率（80%为媒体估算，未见一手）' }
  ],
  // ★ 升级七：5 列横向树状图（下游→中游→上游材料→上游设备→侧枝）
  // 每列内是 sub-card 数组，sub-card 公司数据来源二选一：
  //   ① sourceSegment: 'xxx' → 渲染时从 segments[] 找同名 → 用其 stocks（0 重复数据）
  //   ② companies: [...]   → inline 写死（用于下游/中游/侧枝等 segments 没覆盖的环节）
  treeMap: {
    // ============ ① 下游 (4 个 sub-card) ============
    downstream: [
      {
        name: 'AI 服务器(40%)',
        barrier: 'high',
        note: '英伟达 GB300/Rubin · 华为昇腾 · 单机柜价值量 200 万+ (Prismark 2026)',
        companies: [
          { name:'工业富联', code:'601138', position:'英伟达 AI 服务器整机代工龙头·GB300 独家设计生产', barrier:'高' },
          { name:'浪潮信息', code:'000977', position:'国内 AI 服务器整机市占 50%+·液冷全球第 5.5%', barrier:'高' },
          { name:'中科曙光', code:'603019', position:'海光信息+曙光模组双驱·智算中心建设核心', barrier:'高' }
        ]
      },
      {
        name: '汽车电子(25%)',
        barrier: 'mid',
        note: '智能驾驶域控+车规 PCB+连接器 · 电动化催化 (CPCA 2025)',
        companies: [
          { name:'比亚迪', code:'002594', position:'整车+三电+智驾域控全链·新能源车全球销冠', barrier:'高' },
          { name:'沪光股份', code:'605333', position:'汽车线束+高压连接器·上汽/特斯拉供', barrier:'中' },
          { name:'和而泰', code:'002402', position:'汽车智能控制器·海外 Tier1 客户', barrier:'中' }
        ]
      },
      {
        name: '通信/5G(20%)',
        barrier: 'mid',
        note: '光模块+基站+路由器 · 5G-A 升级周期 (Prismark 2026)',
        companies: [
          { name:'中兴通讯', code:'000063', position:'5G 基站+光通信设备龙头·全球前 4', barrier:'高' },
          { name:'深南电路', code:'002916', position:'通信 PCB+封装基板双轮·国内唯一 ABF 量产', barrier:'高' },
          { name:'烽火通信', code:'600498', position:'光通信传输设备·光网络国家队', barrier:'中' }
        ]
      },
      {
        name: '消费电子(15%)',
        barrier: 'low',
        note: '手机/笔电/可穿戴 · 增速 0-3% · 充分竞争 (Prismark 2026)',
        companies: [
          { name:'鹏鼎控股', code:'002938', position:'全球 PCB 营收 9 连冠·苹果链 FPC 主供', barrier:'中' },
          { name:'东山精密', code:'002384', position:'FPC+结构件双主业·苹果链核心', barrier:'中' },
          { name:'景旺电子', code:'603228', position:'中低端 PCB 老牌·汽车+消费双轮', barrier:'低' }
        ]
      }
    ],

    // ============ ② 中游 (3 个 sub-card) ============
    midstream: [
      {
        name: 'AI 服务器 PCB',
        barrier: 'extreme',
        note: '占中游产值 30-40%(Prismark 2026) · 30-40 层高速 PCB · M9 级 CCL · 单价 10-50 万/块',
        companies: [
          { name:'胜宏科技', code:'300476', position:'英伟达 GB300 PCB 主供·显卡 PCB 全球~50%', barrier:'极高' },
          { name:'沪电股份', code:'002463', position:'AI 服务器+汽车 PCB 双龙头·78 层背板认证', barrier:'极高' },
          { name:'生益电子', code:'603183', position:'生益科技子公司·AI 服务器 PCB 黑马', barrier:'高' }
        ]
      },
      {
        name: '汽车 PCB',
        barrier: 'mid',
        note: '占中游产值 20-25%(CPCA 2025) · 车规级 AEC-Q 认证 · 单车 PCB 价值 1000-3000 元',
        companies: [
          { name:'依顿电子', code:'603328', position:'汽车 PCB 老牌厂商·国内份额前 5', barrier:'中' },
          { name:'世运电路', code:'603920', position:'特斯拉/比亚迪汽车 PCB 核心供', barrier:'中' },
          { name:'景旺电子', code:'603228', position:'汽车+消费双轮·全球 PCB 第 9', barrier:'中' }
        ]
      },
      {
        name: '消费类 PCB',
        barrier: 'low',
        note: '占中游产值 30-40%(Prismark 2026) · 中低端 FPC/RFPCB · 充分竞争 · 利润薄',
        companies: [
          { name:'鹏鼎控股', code:'002938', position:'全球 PCB 营收 9 连冠·苹果链 FPC 主供', barrier:'中' },
          { name:'东山精密', code:'002384', position:'FPC+结构件双主业·苹果链核心', barrier:'中' },
          { name:'超声电子', code:'000823', position:'中低端 PCB+覆铜板·老牌厂商', barrier:'低' }
        ]
      }
    ],

    // ============ ③ 上游材料 (4 个 sub-card) · 复用 segments 映射 ============
    materials: [
      {
        name: '电子树脂(碳氢/PPO)',
        barrier: 'extreme',
        choke: true,
        note: '占 CCL 成本 26%(Prismark) · M9 碳氢树脂全球仅 2 家认证 · 缺口率 63%',
        sourceSegment: '电子树脂（碳氢树脂/PPO）'
      },
      {
        name: '玻纤布/Q布(石英纤维布)',
        barrier: 'extreme',
        choke: true,
        note: '占 CCL 成本 19%(Prismark) · 菲利华 Q 布全球市占≥55%（绝对龙头·券商口径） · 价格 8 倍+',
        sourceSegment: '玻纤布/Q布（石英纤维布）'
      },
      {
        name: 'HVLP4 超低轮廓铜箔',
        barrier: 'extreme',
        choke: true,
        note: '占 CCL 成本 42%(Prismark) · M9 必须 HVLP4+ · 2026 月缺口~23%',
        sourceSegment: '铜箔（HVLP4超低轮廓铜箔）'
      },
      {
        name: 'CCL 覆铜板',
        barrier: 'high',
        choke: false,
        note: '占 PCB 成本 30-40%(Prismark) · M9 全球仅 2 家认证(台光+生益)',
        sourceSegment: '覆铜板 CCL'
      }
    ],

    // ============ ④ 上游设备 (2 个 sub-card) ============
    equipment: [
      {
        name: 'PCB 钻孔机/曝光机',
        barrier: 'high',
        choke: false,
        note: '占 PCB 设备投资~37%(CPCA 2025, 钻孔20%+曝光17%) · 高端曝光机国产化<10% · 钻孔机大族/鼎泰',
        sourceSegment: 'PCB专用设备'
      },
      {
        name: 'IC 封装基板设备',
        barrier: 'extreme',
        note: '占 ABF 载板投资 50%+ · 100% 进口(美能达/Adtec 等) · 国产空白',
        companies: []
      }
    ],

    // ============ ⑤ 侧枝 (2 个 sub-card) ============
    sideBranches: [
      {
        name: 'IC 封装基板(ABF 载板)',
        barrier: 'high',
        note: '占 PCB 高端 5-8%(Prismark 2026) · 全球仅味之素+兴森+1 家量产 · 国产化~4%',
        sourceSegment: 'IC封装基板（ABF载板）'
      },
      {
        name: 'CCL 上游硅微粉',
        barrier: 'mid',
        note: '占 CCL 成本 5-10%(CPCA) · 国产化率 60%+ · 联瑞/凯盛二供格局',
        companies: [
          { name:'联瑞新材', code:'688300', position:'球形硅微粉龙头·国内市占~40%', barrier:'高' },
          { name:'凯盛科技', code:'600552', position:'硅微粉二供·央企背景', barrier:'中' }
        ]
      }
    ]
  },
  segments: [/* filled below */],
  midstream: { description: 'PCB 制造是充分竞争行业。AI 服务器 PCB 有壁垒但不构成物理卡口。但头部企业强者恒强。', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// PCB Segments
CHAINS.pcb.segments = [
  {
    name: '覆铜板 CCL', costRatio: '30-40%', barrier: 'high', choke: false, border: false,
    intro: '覆铜板（CCL）由<strong>铜箔+树脂+玻纤布</strong>三层热压复合而成，是 PCB 的"地基"——决定电路板的介电性能、耐热性和信号完整性。M9 级别 CCL 需要 Df≤0.001。全球仅<strong>台光电子（台）+生益科技（大陆）</strong>通过英伟达 M9 全链路认证。台光占英伟达 AI 服务器 CCL 用量的 <strong>~95%</strong>。',
    globalLandscape: [
      { lbl: '🥇 台光电子 EMC（台）', val: 'M9全球市占60-70%', note: '英伟达AI服务器CCL主供' },
      { lbl: '🥈 生益科技（大陆）', val: '全球第二，M9市占30-40%', note: '大陆唯一M9认证' },
      { lbl: '日系三巨头', val: '松下/Resonac/三菱瓦斯', note: '定调高端标准，扩产保守' },
      { lbl: '台系五强（其余）', val: '台燿/联茂等', note: '紧跟英伟达' }
    ],
    stocks: [
      { rank:1, name:'生益科技', code:'600183', position:'全球第二大CCL·大陆唯一M9认证·M9市占30-40%', barrier:'极高', trend:'up', trendNote:'M9大陆唯一·Q1净利+105%', logic:'<mark class="updated">2026Q1营收81.41亿+45%，净利11.58亿+105%</mark>。M9 CCL已批量供货英伟达供应链，全球市占14-15%，Q1毛利率28.10%',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 大陆唯一 M9 CCL，业绩(Q1+105%)+壁垒双满分，估值已不便宜——业绩派' },
      { rank:2, name:'华正新材', code:'603186', position:'华为昇腾CCL核心供·CBF积层膜对标味之素ABF', barrier:'高', trend:'up', trendNote:'CBF膜切入华为/中芯', logic:'AI服务器用高等级CCL+CBF膜切入华为/中芯，国产替代直接受益',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 CBF 膜国产替代潜力，业绩兑现尚需时间' },
      { rank:3, name:'南亚新材', code:'603519', position:'覆铜板A股第三·M8量产M9测试中', barrier:'高', trend:'up', trendNote:'高速材料M8→M9', logic:'高速材料从M8→M9追赶中，AI服务器订单加速放量',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 高速 CCL 第三梯队，M8→M9 追赶中' },
      { rank:4, name:'金安国纪', code:'002636', position:'国内龙头·全球CCL第7', barrier:'中', trend:'flat', trendNote:'涨价标杆·AI暴露弱', logic:'涨价期情绪标杆，中低端CCL为主，AI暴露弱',
        dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:4,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 涨价情绪标杆，AI 暴露弱、估值便宜但缺驱动' },
      { rank:5, name:'超华科技', code:'002288', position:'中端覆铜板+铜箔一体化·铜箔营收占比30%', barrier:'中', trend:'down', trendNote:'中端CCL·AI纯度低', logic:'中端覆铜板+铜箔，AI纯度低，5G/汽车转型中',
        dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'down',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:4,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 中端 CCL+铜箔一体化，AI 纯度低，转型阵痛' }
    ]
  },
  {
    name: '电子树脂（碳氢树脂/PPO）', costRatio: '26%', barrier: 'extreme', choke: true, border: true,
    intro: '树脂是CCL三大原材料中<strong>技术壁垒最高的环节</strong>。M9级别要求Df≤0.001，PPO无法满足，<strong>碳氢树脂是唯一成熟方案</strong>。M9配方中碳氢树脂:PPO比例从M8的1:2反转为2:1。全球仅<strong>东材科技（中国）+JX化学（日本）</strong>通过英伟达M9认证。2026年全球缺口<strong>~5000吨（缺口率63%）</strong>。',
    globalLandscape: [
      { lbl: '🥇 东材科技（中）+JX化学（日）', val: '全球唯二M9碳氢树脂认证', note: '东材国内唯一，眉山3500吨2026.6.30投料试产，M10验证中' },
      { lbl: 'PPO双寡头', val: 'SABIC（沙特）+三菱瓦斯', note: '垄断全球PPO供给近80%' },
      { lbl: '圣泉集团（中）', val: 'PPO国内唯一量产', note: '碳氢树脂2026Q4投产1500吨' },
      { lbl: '世名科技（中）', val: '500吨已投产', note: '通过台光/生益M9方案认证' }
    ],
    stocks: [
      { rank:1, name:'东材科技', code:'601208', position:'全球唯二M9碳氢树脂认证·国内唯一', barrier:'极高', trend:'up', trendNote:'Q1+103%·台光排他', hits:4, strength:'★★★', logic:'<mark class="updated">2026Q1归母净利1.87亿+103%，高速电子树脂营收2.58亿+131%</mark>。台光独供2-3年排他协议。眉山3500吨<mark class="updated">2026年6月30日投料试产（提前至Q2末）</mark>。价格80-120万元/吨，毛利率50%+',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 M9 树脂唯一国产，壁垒+供需双满分、业绩未放量——赔率/左侧派（样板 §3.2 原文）' },
      { rank:2, name:'圣泉集团', code:'605589', position:'PPO国内唯一量产·全球第四', barrier:'高', trend:'up', trendNote:'PPO国产70%·碳氢投产', hits:null, strength:null, logic:'PPO国产市占70%稳定。碳氢树脂2026Q4投产1500吨，向上突破',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 PPO 国产唯一+碳氢扩产，业绩待 Q4 投产兑现' },
      { rank:3, name:'世名科技', code:'300522', position:'盘锦500吨已投产·M9方案已认证', barrier:'高', trend:'up', trendNote:'M9方案已认证·扩产', hits:null, strength:null, logic:'已通过台光/生益/联茂M9方案认证，规划总产能2500吨·H2放量',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 M9 方案已认证，500 吨小批量、扩产爬坡中' },
      { rank:4, name:'宏昌电子', code:'603002', position:'环氧树脂龙头·GBF增层膜送样', barrier:'中', trend:'flat', trendNote:'环氧树脂壁垒低', hits:null, strength:null, logic:'GBF增层膜送样台积电/长电，但环氧树脂壁垒低→非卡口',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 GBF 膜送样，但环氧树脂壁垒低，非卡口' },
      { rank:5, name:'彤程新材', code:'603650', position:'电子级酚醛树脂·对标SABIC PPO', barrier:'中', trend:'flat', trendNote:'PPO对标SABIC·AI弱', logic:'电子级酚醛稳定供应·PPO对标SABIC·AI暴露弱',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 电子级酚醛+PPO 对标，AI 暴露弱' }
    ]
  },
  {
    name: '玻纤布/Q布（石英纤维布）', costRatio: '19%', barrier: 'extreme', choke: true, border: true,
    intro: '玻纤布是CCL的增强材料。技术等级：E-glass→Low-Dk布→T-glass→<strong>Q布/石英布（Df≤0.0007）</strong>。Q布价格~260-300元/米，是普通电子布的<strong>8倍+</strong>。<strong><mark class="updated">菲利华Q布全球市占≥55%（券商硬数据·绝对龙头），已超越停产的日东纺；80% 仅自媒体口径不予采信</mark></strong>。日东纺2026年受日本地震影响停产，黄仁勋亲自赴日催货。2026年菲利华产能扩至1000-1200万米/年，毛利率55-65%。',
    globalLandscape: [
      { lbl: '🥇 菲利华（中）', val: '<mark class="updated">Q布全球市占≥55%（绝对龙头·券商口径）</mark>', note: '国内唯一全产业链自主，2026产能1000-1200万米' },
      { lbl: '🥈 日东纺Nittobo（日）', val: 'Q布原全球龙头，地震受损', note: '份额被菲利华快速取代' },
      { lbl: '🥉 圣戈班（法）', val: '全球第三家Q布量产', note: '份额远小于菲利华' },
      { lbl: '宏和科技（中）', val: '4μm极薄布全球唯一量产', note: '超薄电子布全球市占~50%' }
    ],
    stocks: [
      { rank:1, name:'菲利华', code:'300395', position:'<mark class="updated">Q布全球市占≥55%·绝对龙头（券商口径）</mark>·国产唯一全产业链', barrier:'极高', trend:'up', trendNote:'Q布全球≥55%·Q1+53%', hits:4, strength:'★★★', logic:'<mark class="updated">2026Q1营收6.22亿+53%，净利1.44亿+37%</mark>。已通过英伟达/台积电/台光/生益全链路认证。台光锁定500-700万米。全球缺口>40%。毛利率55-65%。2027目标2000万米/年',
        dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 Q布全球≥55%绝对龙头，六维近满分仅估值中位——长线核心' },
      { rank:2, name:'宏和科技', code:'603256', position:'4μm极薄布全球唯一量产·全球市占~50%', barrier:'高', trend:'up', trendNote:'4μm超薄布全球第一', hits:3, strength:'★★☆', logic:'超薄电子布全球市占~50%。但非AI最核心瓶颈→降级',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 4μm 超薄布全球唯一，但非 AI 最核心瓶颈' },
      { rank:3, name:'中材科技', code:'002080', position:'国内Low Dk市占35%·石英布独供胜宏GB300', barrier:'中', trend:'up', trendNote:'石英布独供GB300·送样Rubin', hits:null, strength:null, logic:'Q布占比仅20-30%，非前三寡头·主业玻纤稳',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 石英布独供 GB300，Q布占比仅 20-30%' },
      { rank:4, name:'中国巨石', code:'600176', position:'电子布销量A股第一·全球玻纤龙头', barrier:'中', trend:'up', trendNote:'高端电子布扩产·AI纯度升', hits:null, strength:null, logic:'全球玻纤龙头，但非Q布寡头·AI纯度低',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 全球玻纤龙头，但非 Q布寡头、AI 纯度低' },
      { rank:5, name:'山东玻纤', code:'605006', position:'电子布老牌·ECR玻纤纱', barrier:'中', trend:'down', trendNote:'电子布老牌·非Q布', logic:'中端电子布为主·非Q布寡头·AI暴露极弱',
        dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'down',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:4,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 电子布老牌，非 Q布寡头、AI 暴露极弱' }
    ]
  },
  {
    name: '铜箔（HVLP4超低轮廓铜箔）', costRatio: '42%', barrier: 'extreme', choke: true, border: true,
    intro: '铜箔是CCL的导电层。HVLP4粗糙度<1μm，M9级CCL<strong>必须使用HVLP4+铜箔</strong>。核心设备阴极辊被日本JCU垄断（交期18-24个月）。日韩四强（三井/福田/古河/斗山）垄断85%+。2026年底全球月缺口<strong>~23%</strong>。国产仅铜冠铜箔实现HVLP1-4全系列量产。',
    globalLandscape: [
      { lbl: '🥇 三井金属（日）', val: 'HVLP4全球~50%', note: '扩产极保守，年扩产仅25%' },
      { lbl: '日韩四强（其余）', val: '福田/古河/斗山', note: '合计垄断85%+高端产能' },
      { lbl: '铜冠铜箔（中）', val: '国内唯一HVLP1-4全系列量产', note: '2026目标500吨/月' },
      { lbl: '德福科技（中）', val: 'HVLP3量产，HVLP4验证中', note: '进入英伟达供应链' }
    ],
    stocks: [
      { rank:1, name:'铜冠铜箔', code:'301217', position:'国内唯一HVLP1-4全系列量产·2027市占预期42%', barrier:'极高', trend:'up', trendNote:'设备锁定70%·2027市占42%', hits:4, strength:'★★★', logic:'<mark class="updated">锁定10台三船MSP-8000表面处理机（全球70%），产能确定性最强</mark>。2026目标500吨/月。日韩四强垄断85%+。设备交期18-24月。2027市占率预期42%。已实现HVLP4规模化量产',
        dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:4,trend:'up',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 国产唯一 HVLP1-4 全系列+设备锁定 70%，估值低位（PE分位18%）——赔率派' },
      { rank:2, name:'德福科技', code:'301511', position:'进入英伟达供应链·5万吨产能可切换', barrier:'高', trend:'up', trendNote:'5万吨切换·HVLP4验证', hits:3, strength:'★★☆', logic:'5万吨产能可切换。HVLP4台光验证中，机构关注度高→降级',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 5 万吨产能可切换，HVLP4 验证中' },
      { rank:3, name:'诺德股份', code:'600110', position:'6μm极薄铜箔量产·服务器铜箔市占>25%·2026Q1扭亏', barrier:'中', trend:'up', trendNote:'6μm·Q1扭亏·HVLP4量产', hits:null, strength:null, logic:'服务器PCB用铜箔市占>25%，但HVLP4仍在认证',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 6μm 极薄铜箔+Q1 扭亏，HVLP4 仍在认证' },
      { rank:4, name:'嘉元科技', code:'688388', position:'极薄铜箔4.5μm市占>50%', barrier:'中', trend:'up', trendNote:'锂电转HVLP·Q1预增329%', hits:null, strength:null, logic:'锂电铜箔转产HVLP，2026Q1净利预增329-395%',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 锂电转 HVLP，Q1 预增 329%' },
      { rank:5, name:'中一科技', code:'688234', position:'高性能电子铜箔·HVLP4在研', barrier:'中', trend:'flat', trendNote:'高性能铜箔·主业稳', logic:'锂电铜箔主业转HVLP4，AI暴露弱·业绩弹性待验证',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 高性能铜箔+HVLP4 在研，AI 暴露弱' }
    ]
  },
  {
    name: 'IC封装基板（ABF载板）', costRatio: '—', barrier: 'high', choke: false, border: false,
    intro: 'IC载板连接芯片与PCB，ABF载板是AI芯片封装的核心材料。最大瓶颈：<strong>日本味之素垄断ABF膜97%</strong>。国内深南电路唯一批量交付ABF载板。高端FC-BGA 72%依赖进口。卡口判定：制造端非寡头，但ABF膜材料端是绝对寡头——A股无直接标的。',
    globalLandscape: [
      { lbl: '🥇 深南电路（中）', val: '国内唯一ABF载板批量交付', note: '广州60亿投资，华为昇腾一供>60%' },
      { lbl: '🥈 兴森科技（中）', val: 'ABF载板追赶者', note: '珠海+广州超60亿投入，华为哈勃入股' },
      { lbl: '华正新材（中）', val: 'CBF积层膜对标味之素ABF', note: 'ABF膜国产替代唯一看点' }
    ],
    stocks: [
      { rank:1, name:'深南电路', code:'002916', position:'国内唯一ABF载板批量交付·全球PCB营收前10', barrier:'极高', trend:'up', trendNote:'ABF国内唯一·Q1+73%', hits:null, strength:null, logic:'广州60亿投资2亿颗FC-BGA/年。Q1净利+73%。封装基板营收41.48亿+30.8%',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 壁垒(PCB+载板全栈,ABF良率破80%)+政策(内资份额~63%)最强、估值相对温和——壁垒派首选（样板 §3.2 原文）' },
      { rank:2, name:'兴森科技', code:'002436', position:'ABF载板国产化追赶者·HBM级ABF唯一', barrier:'高', trend:'up', trendNote:'HBM级ABF·华为入股', hits:null, strength:null, logic:'华为昇腾认证通过。华为哈勃入股。量产爬坡缓慢',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 HBM 级 ABF+华为哈勃入股，量产爬坡缓慢' },
      { rank:3, name:'华正新材', code:'603186', position:'CBF积层膜对标味之素ABF', barrier:'高', trend:'up', trendNote:'CBF膜华为/中芯', hits:null, strength:null, logic:'CBF膜切入华为昇腾供应链，中芯国际验证中',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 CBF 膜对标味之素，华为/中芯验证中' },
      { rank:4, name:'联瑞新材', code:'688300', position:'亚微米球形硅微粉·球形硅微粉国内市占~40%', barrier:'中', trend:'flat', trendNote:'球形硅微粉稳', hits:null, strength:null, logic:'ABF膜关键填料，进入头部供应链·主业硅微粉稳定',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 ABF 膜关键填料，主业球形硅微粉稳' },
      { rank:5, name:'博敏电子', code:'603936', position:'PCB+汽车切入ABF', barrier:'中', trend:'down', trendNote:'PCB切入ABF规模小', logic:'PCB老牌厂商切入ABF，量产规模小·AI暴露弱',
        dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'down',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 PCB 切入 ABF，量产规模小、AI 暴露弱' }
    ]
  },
  {
    name: 'PCB专用设备', costRatio: '—', barrier: 'mid', choke: false, border: false,
    intro: 'PCB制造扩产潮直接利好上游设备商。钻孔设备占全产业链~20%（最高），曝光~17%，电镀~7%。高端设备国产化率不足30%。卡口判定：全球供应商>5家，客户可切换→不构成物理卡口。但国产替代+扩产潮双击下，设备商有强β弹性。',
    globalLandscape: [
      { lbl: '鼎泰高科（中）', val: 'PCB钻针全球第一（市占26.5%）', note: '2025净利预增80-103%' },
      { lbl: '大族数控（中）', val: '钻孔设备全球第二', note: 'AI高多层板设备市占40-50%' },
      { lbl: '芯碁微装（中）', val: 'LDI曝光全球市占15%', note: '2026激光钻孔机订单70-100台' }
    ],
    stocks: [
      { rank:1, name:'鼎泰高科', code:'301377', position:'PCB钻针全球第一·市占26.5%', barrier:'高', trend:'up', trendNote:'钻针全球第一·AI高多层', hits:null, strength:null, logic:'AI高多层板单块钻孔数从10万→50万+，钻针耗量激增·2025净利预增80-103%',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 PCB 钻针全球第一+AI 高多层钻孔量级飙升' },
      { rank:2, name:'大族数控', code:'301200', position:'钻孔设备全球第二·AI高多层板设备市占40-50%', barrier:'高', trend:'up', trendNote:'净利预增161-194%', hits:null, strength:null, logic:'2025净利预增161-194%。AI高多层板设备市占40-50%',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 钻孔设备全球第二+净利预增 161-194%' },
      { rank:3, name:'芯碁微装', code:'688630', position:'LDI曝光全球市占15%·3-4μm线宽', barrier:'高', trend:'up', trendNote:'3-4μm小批量·双催化', hits:null, strength:null, logic:'3-4μm线宽小批量交付。PCB+先进封装双催化·2026激光钻孔订单70-100台',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 LDI 曝光全球 15%+激光钻孔订单 70-100 台' },
      { rank:4, name:'东威科技', code:'688700', position:'VCP电镀国内市占>50%·AI订单>5亿', barrier:'中', trend:'up', trendNote:'AI订单>5亿', hits:null, strength:null, logic:'AI订单>5亿。三合一电镀设备打破海外垄断',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 VCP 电镀国内>50%+AI 订单>5 亿' },
      { rank:5, name:'金洲精工', code:'002443', position:'PCB钻针全球第二·市占20.8%', barrier:'中', trend:'up', trendNote:'钻针全球第二·市占20.8%', logic:'PCB钻针老牌厂商，被鼎泰高科高端化替代·AI纯度低',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
        dims6Note:'🆪 钻针老牌+被鼎泰高科高端化替代' }
    ]
  },
  {
    // ★ 升级 PCB-完善（终版）：AI PCB 制造(中游) 段 — 流动性主线，**非物理卡口**
    // 方法论：制造段全球 100+ 家、客户可换，**不构成稀缺性卡口**（choke:false）；
    // 但作为 AI 算力主线下流动性最好的受益标的（AI 服务器/汽车/消费三方向），
    // 仍需评分上榜（barrier:high）。
    // 5 只票 roster：沪电(002463)/胜宏(300476)/景旺(603228)/东山(002384)/鹏鼎(002938)
    // 注：深南(002916)已在 ABF 载板段、生益(600183)已在 CCL 段 → 走 STOCK_REGISTRY 不重复。
    // 本段与 fourQuestions.segments[4] 同名壳（4-问视图独立用）形成"双视图并行"：树状图看 6 维、4-问看物理卡口打分。
    // 6-维时效：5 只票全部带 valAsOf:'YYYY-MM-DD'，渲染在 dims6 面板右下角灰字"📅 截至 MM-DD"。
    name: 'AI PCB 制造(中游)', costRatio: '—', barrier: 'high', choke: false, border: false,
    intro: 'PCB 制造是充分竞争行业、<strong>非物理卡口</strong>，但 AI 高多层/HDI 高端板有能力壁垒、且为本链<strong>最核心流动性标的</strong>。胜负手在"AI 纯度"与"估值"：纯 AI 受益(沪电/胜宏)业绩最硬但估值高；体量龙头(鹏鼎)AI 暴露小、Q1 走弱。',
    stocks: [
      { rank:1, name:'沪电股份', code:'002463', barrier:'高', tier:'primary', valAsOf:'2026-06-13',
        dims6:[{key:'durability',score:5,trend:'up'},{key:'visibility',score:5,trend:'up'},{key:'policy',score:3,trend:'flat'},{key:'supply',score:4,trend:'up'},{key:'valuation',score:2,trend:'down'},{key:'barrier',score:4,trend:'flat'}],
        dims6Note:'🟢 AI PCB最纯标的：26Q1营收62.14亿+53.91%/净利12.42亿+62.9%、AI营收占比升至~60%、英伟达份额>50%；2025净利38.22亿+47.74%。扣分项为估值高位(PE随股价波动，需刷新)。', src:'2026Q1/2025年报' },
      { rank:2, name:'胜宏科技', code:'300476', barrier:'高', tier:'primary', valAsOf:'2026-06-13',
        dims6:[{key:'durability',score:5,trend:'up'},{key:'visibility',score:5,trend:'up'},{key:'policy',score:3,trend:'flat'},{key:'supply',score:4,trend:'up'},{key:'valuation',score:2,trend:'down'},{key:'barrier',score:4,trend:'flat'}],
        dims6Note:'🟢 AI弹性最大：2025净利43.12亿+273.52%(A股PCB首位)、26Q1净利12.88亿+40%(营收55.19亿+28%)、显卡/AI算力卡PCB领先。估值高位为扣分项(随股价刷新)。', src:'2026Q1/2025年报' },
      { rank:3, name:'东山精密', code:'002384', barrier:'高', tier:'primary', valAsOf:'2026-04-26',
        dims6:[{key:'durability',score:5,trend:'up'},{key:'visibility',score:5,trend:'up'},{key:'policy',score:3,trend:'flat'},{key:'supply',score:4,trend:'up'},{key:'valuation',score:3,trend:'flat'},{key:'barrier',score:3,trend:'flat'}],
        dims6Note:'🟢 26Q1营收131.38亿+52.72%/净利11.10亿+143%/扣非+167%；弹性主要来自索尔思光模块并表(非纯PCB)，为PCB+光模块综合体；估值相对没沪电/胜宏极端(券商测2026 PE~29x，截至2026-04-26)。', src:'2026Q1/2025快报' },
      { rank:4, name:'景旺电子', code:'603228', barrier:'中', tier:'primary', valAsOf:'2026-06-13',
        dims6:[{key:'durability',score:4,trend:'up'},{key:'visibility',score:3,trend:'flat'},{key:'policy',score:3,trend:'flat'},{key:'supply',score:3,trend:'flat'},{key:'valuation',score:3,trend:'flat'},{key:'barrier',score:3,trend:'flat'}],
        dims6Note:'🟢 综合PCB(软板/硬板/金属基)、AI纯度低：26Q1营收38.92亿+16.41%但净利2.33亿-28.37%(原材料涨价备货拖累、含18.57%非经常)；2025营收153亿+20.92%。弹性弱于纯AI龙头。', src:'2026Q1/2025年报' },
      { rank:5, name:'鹏鼎控股', code:'002938', barrier:'高', tier:'primary', valAsOf:'2026-05-22',
        dims6:[{key:'durability',score:3,trend:'flat'},{key:'visibility',score:2,trend:'down'},{key:'policy',score:3,trend:'flat'},{key:'supply',score:3,trend:'flat'},{key:'valuation',score:2,trend:'down'},{key:'barrier',score:4,trend:'flat'}],
        dims6Note:'🟢 全球PCB营收9连冠/苹果软板核心，"大而不纯AI"：AI服务器板仅占营收5.41%；26Q1营收79.86亿-1.25%/净利4.63亿-5.21%/扣非-31.85%走弱；估值贵(动态PE~130x、TTM~65x，截至2026-05-22)。', src:'2026Q1/2025年报' }
    ]
  }
];

// PCB Midstream stocks
CHAINS.pcb.midstream = {
  description: 'PCB制造是充分竞争行业。2025年以来五大龙头新增投资合计超400亿元，产能预计2026-2027年集中释放。行业呈"K型分化"。卡口判定：该环节无物理卡口（客户可切换供应商）。但头部企业强者恒强。',
  stocks: [
    { rank:1, name:'胜宏科技', code:'300476', barrier:'极高', trend:'up', trendNote:'GB300主供·Q1+40%', note:'英伟达Tier1，显卡PCB全球~50%(Prismark 2026)，Q1净利12.88亿+40%',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 弹性最大(英伟达显卡板~50%)，但出口近八成、汇率敏感+估值最贵（样板 §3.2 原文）' },
    { rank:2, name:'沪电股份', code:'002463', barrier:'极高', trend:'up', trendNote:'78层背板·Q1+62.9%', note:'英伟达78层背板认证·AI+汽车双龙头，Q1净利12.42亿+62.9%，年内四次扩产',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 兑现最快、估值同样不便宜——业绩派首选、但需控买点（样板 §3.2 原文）' },
    { rank:3, name:'深南电路', code:'002916', barrier:'极高', trend:'up', trendNote:'Q1+73%·装联3in1', note:'PCB+封装基板+装联3-in-1·国内唯一ABF批量交付，Q1净利8.50亿+73%',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 壁垒(全栈)+政策最强、估值相对温和；载板兑现慢——壁垒派首选（样板 §3.2 原文）' },
    { rank:4, name:'鹏鼎控股', code:'002938', barrier:'高', trend:'flat', trendNote:'苹果链FPC·消费占比高', note:'全球PCB营收9连冠·苹果链FPC主供，消费电子占比~70%→AI转型中',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 全球 PCB 9 连冠，但消费占比~70%，AI 转型中' },
    { rank:5, name:'广合科技', code:'001389', barrier:'高', trend:'up', trendNote:'算力纯度最高', note:'专注算力PCB（服务器/交换机）·算力纯度最高',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 专注算力 PCB，纯度最高' },
    { rank:6, name:'生益电子', code:'688183', barrier:'高', trend:'up', trendNote:'AI服务器黑马·净利+5倍', note:'AI服务器PCB黑马·净利增近5倍·生益科技子公司',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 AI 服务器 PCB 黑马+净利近 5 倍，估值跟涨' },
    { rank:7, name:'景旺电子', code:'603228', barrier:'中', trend:'flat', trendNote:'汽车+HDI·高阶转型', note:'刚性/FPC/金属基全覆盖，英伟达二级供应商·AI纯度低',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 全覆盖+二级供应商，AI 纯度低' },
    { rank:8, name:'东山精密', code:'002384', barrier:'中', trend:'up', trendNote:'切入AI服务器供应链', note:'FPC龙头+光电双主业·苹果链稳定',
      dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 FPC 龙头切入 AI 服务器，苹果链稳' },
    { rank:9, name:'世运电路', code:'603920', barrier:'中', trend:'up', trendNote:'28层AI服务器板+转型AI/机器人', note:'特斯拉汽车/人形机器人PCB·汽车赛道稳定',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 28 层 AI 服务器板+机器人 PCB' },
    { rank:10, name:'奥士康', code:'002913', barrier:'中', trend:'up', trendNote:'向高端HDI/多层切换', note:'通过供应体系向英伟达供货·AI暴露弱',
      dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🆪 向高端 HDI/多层切换，AI 暴露弱' }
  ]
};

// PCB Midstream stocks
CHAINS.pcb.fourQuestions = {
  segments: [
    {
      name: '电子树脂（碳氢树脂）',
      stocks: [
        { name:'东材科技', code:'601208', q1:true, q1note:'全球仅2家', q2:true, q2note:'18个月+', q3:true, q3note:'PPO无法满足M9', q4:true, q4note:'台光排他协议', hits:4, strength:'★★★' },
        { name:'圣泉集团', code:'605589', q1:false, q1note:'全球~5家', q2:true, q2note:'', q3:false, q3note:'SABIC/三菱可替', q4:true, q4note:'', hits:2, strength:null },
        { name:'世名科技', code:'300522', q1:false, q1note:'', q2:true, q2note:'', q3:false, q3note:'', q4:true, q4note:'', hits:2, strength:null }
      ]
    },
    {
      name: '玻纤布/Q布',
      stocks: [
        { name:'菲利华', code:'300395', q1:true, q1note:'全球仅3家', q2:true, q2note:'扩产12个月+', q3:true, q3note:'无替代材料', q4:true, q4note:'台光锁定订单', hits:4, strength:'★★★' },
        { name:'宏和科技', code:'603256', q1:true, q1note:'4μm全球唯一', q2:false, q2note:'', q3:true, q3note:'', q4:true, q4note:'', hits:3, strength:'★★☆' },
        { name:'中材科技', code:'002080', q1:false, q1note:'', q2:false, q2note:'', q3:false, q3note:'', q4:true, q4note:'', hits:1, strength:null },
        { name:'中国巨石', code:'600176', q1:false, q1note:'', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:0, strength:null }
      ]
    },
    {
      name: '铜箔（HVLP4）',
      stocks: [
        { name:'铜冠铜箔', code:'301217', q1:true, q1note:'国内唯一全系列', q2:true, q2note:'设备交期18-24月', q3:true, q3note:'M9必须HVLP4', q4:true, q4note:'CCL厂刚需', hits:4, strength:'★★★' },
        { name:'德福科技', code:'301511', q1:true, q1note:'进入英伟达供应链', q2:true, q2note:'', q3:true, q3note:'', q4:false, q4note:'验证中', hits:3, strength:'★★☆' }
      ]
    },
    {
      // ★ PCB-完善（终版）：AI PCB 制造(中游) 4-问视图（与 segments[6] 双视图并行）
      // 合并：吸收老 FQ[3] "PCB制造（充分竞争）" 的 2 只票（胜宏/沪电）→ 5 只票完整覆盖制造段
      // 4-问视图只读 q1-q4/hits/strength——5 只票**全部不通过 4-问**（制造段 100+ 家可切换 = 不构成物理卡口）
      // 这正是方法论的预期结果：制造段流动性主线 ≠ 物理卡口，卡口结论请看 segments[6] + chokePoints
      // 5 只票 roster：沪电(002463)/胜宏(300476)/景旺(603228)/东山(002384)/鹏鼎(002938)
      // 注：深南(002916)已在 ABF 载板段、生益(600183)已在 CCL 段 → 走 STOCK_REGISTRY 不重复
      // 数据已联网端核实：财报为 primary（2026Q1/2025 年报），估值类周一 cron 刷新按真实口径重标
      name: 'AI PCB 制造(中游)',
      barrier: 'high',
      choke: false,
      stocks: [
        { name:'沪电股份', code:'002463', position:'AI 服务器 PCB 双龙头·78 层背板认证', barrier:'高', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'up', trendNote:'Q1净利+62.9%·AI营收占比~60%' },
        { name:'胜宏科技', code:'300476', position:'英伟达 GB300 PCB 主供·显卡 PCB 全球~50%', barrier:'高', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'up', trendNote:'Q1净利+40%·A股PCB营收首位' },
        { name:'景旺电子', code:'603228', position:'PCB 老牌·汽车+消费双轮·全球 PCB 第 9', barrier:'中', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'flat', trendNote:'Q1净利-28.37%·原材料涨价拖累' },
        { name:'东山精密', code:'002384', position:'FPC+结构件·苹果链核心·索尔思光模块并表', barrier:'中', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'up', trendNote:'Q1净利+143%·含光模块并表' },
        { name:'鹏鼎控股', code:'002938', position:'全球 PCB 营收 9 连冠·苹果软板核心', barrier:'高', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'down', trendNote:'Q1净利-5.21%·消费占比~70%' }
      ]
    },
    {
      name: 'PCB设备',
      stocks: [
        { name:'鼎泰高科', code:'301377', q1:true, q1note:'全球第一', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:1, strength:null },
        { name:'大族数控', code:'301200', q1:false, q1note:'', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:0, strength:null }
      ]
    }
  ]
};

// PCB Choke Points
CHAINS.pcb.chokePoints = [
  { rank:1, name:'东材科技', code:'601208', segment:'M9碳氢树脂', strength:'★★★', logic:'全球<strong>仅2家</strong>通过英伟达M9碳氢树脂认证。台光独供2-3年排他协议。眉山3500吨<strong>2026年6月30日投料试产（提前至Q2末）</strong>。Q1净利1.87亿+103%，高速树脂+131%。2026年全球缺口<strong>~5000吨（63%）</strong>。M10树脂已进入客户验证。', tags:['双寡头','无替代','缺口63%','Q1净利+103%'],
    valuation: { pe:'约270.8倍', peAbsolute:'PE-TTM 270.8x (2026-06-12)', pePercentile:99.8, grossMargin:'50%+', fromHigh:'(2026-06-12 数据·相对前高位置未独立核实)', asOf:'2026-06-12', note:'🆪 PE-TTM 270.8x 实际处历史99.8%绝对高位（亿牛网media口径），AI 初判 50x/82% 分位 严重低估；眉山3500吨 2026.6.30 投料试产 + Q1净利+103% 等卡口逻辑已充分定价，谨防高位接盘；建议用 PB 或 PS 上市以来分位交叉验证', tier:'media', src:'亿牛网 601208 历史PE页 https://eniu.com/gu/sh601208/pe_ttm · media 单源·未独立交叉核实' },
    verification: {
      items: [
        { type:'供给寡头', claim:'全球仅东材+JX化学2家通过英伟达M9认证', howToCheck:'搜圣泉(605589)、世名(300522)、SABIC最新公告与投资者问答，看有无第三家宣布M9认证', falsifySignal:'出现第三家通过认证 → 卡口降级', status:'pending' },
        { type:'产能缺口', claim:'2026全球缺口5000吨/缺口率63%', howToCheck:'查东材眉山3500吨项目投产公告(已承诺2026.6.30投料试产)，交叉验证英伟达Rubin实际用量', falsifySignal:'缺口率快速收窄 / 项目延期或大幅扩产 → 缺口逻辑塌', status:'pending' },
        { type:'财报印证', claim:'高速电子树脂营收+131%、毛利率50%+', howToCheck:'查东材最新季报：相关业务营收增速、毛利率是否高且稳。毛利率是定价权最难造假的证据', falsifySignal:'毛利率平庸或营收不增 → 卡口大概率为假', status:'pending' },
        { type:'交叉信源', claim:'至少两个独立来源印证', howToCheck:'一篇券商深度研报 + 公司年报/公告同时印证。只有单一来源(尤其只有自媒体)则存疑', falsifySignal:'只找得到单一来源 → 存疑', status:'pending' }
      ],
      note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
    }
  },
  { rank:2, name:'菲利华', code:'300395', segment:'Q布/石英纤维布', strength:'★★★', logic:'<strong><mark class="updated">Q布全球市占≥55%（绝对龙头·券商口径；80% 仅自媒体口径）</mark></strong>。国内唯一全产业链自主。已通过英伟达全链路认证。台光锁定500-700万米。Q布价格~260-300元/米（普通布8x）。全球缺口<strong>>40%</strong>。Q1营收6.22亿+53%。', tags:['≥55%绝对龙头','无替代','缺口>40%','毛利55-65%'],
    valuation: { pe:'约166.11倍(TTM)', peAbsolute:'PE-TTM 166.11x (2026-06-12)', pePercentile:99.9, grossMargin:'55%+', fromHigh:'(2026-06-12 数据·相对前高位置未独立核实)', asOf:'2026-06-12', note:'🆪 PE-TTM 166.11x 实际处历史99.9%绝对高位（亿牛网media口径）；AI 初判"前瞻35倍/45%分位"严重低估——2026-04-23 139x → 2026-06-12 166.11x 6周内 +19.5%；Q布全球≥55%市占+全系列认证落地逻辑已充分定价', tier:'media', src:'亿牛网 300395 历史PE页 https://eniu.com/gu/sz300395/pe_ttm · media 单源·未独立交叉核实' },
    verification: {
      items: [
        { type:'供给寡头', claim:'Q布全球市占≥55%（绝对龙头·券商口径）', howToCheck:'搜菲利华/圣戈班/迈图(海外)的Q布产能公告与投资者问答，看菲利华市占率是否仍维持≥55%且快速提升（券商共识）', falsifySignal:'市占率快速下滑 / 海外新进入者宣布Q布量产 → 卡口降级', status:'pending' },
        { type:'产能缺口', claim:'全球缺口>40%、价格~普通布8x', howToCheck:'查菲利华Q布年度出货量、英伟达AI服务器Q布需求测算、台光锁单公告，交叉验证供需差', falsifySignal:'缺口快速收窄 / Q布价格回落至普通布3-4x以内 → 定价权逻辑塌', status:'pending' },
        { type:'财报印证', claim:'Q1营收6.22亿+53%、毛利55-65%', howToCheck:'查菲利华最新季报：分产品营收增速、Q布毛利率是否稳定在55%+。毛利率是定价权最难造假的证据', falsifySignal:'毛利率跌到40%以下 / 营收不增 → 卡口大概率为假', status:'pending' },
        { type:'交叉信源', claim:'至少两个独立来源印证全球≥55%市占（80% 仅自媒体口径不予采信）', howToCheck:'一篇券商深度研报 + 公司年报/调研纪要 + 行业第三方数据（Prismark/CPCA）同时印证', falsifySignal:'只找得到单一来源(尤其只有自媒体) → 存疑', status:'pending' }
      ],
      note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
    } },
  { rank:3, name:'铜冠铜箔', code:'301217', segment:'HVLP4铜箔', strength:'★★★', logic:'国内<strong>唯一</strong>HVLP1-4全系列量产。<strong><mark class="updated">锁定10台三船MSP-8000设备（全球70%），未来3年产能确定性最强</mark></strong>。日韩四强垄断85%+。阴极辊设备交期18-24月。2026年底全球月缺口<strong>~23%</strong>。2027市占率预期42%。', tags:['国产唯一','设备锁定全球70%','缺口23%','已量产'],
    valuation: { pe:'不适用(数据不足)', peAbsolute:'PE-TTM 不适用(2024亏损/2025盈利近零·TTM失真;亿牛网显示~10698x,分位返回-1)', pePercentile:null, grossMargin:'18%+', fromHigh:'(2026-06-12 数据·相对前高位置未独立核实)', asOf:'2026-06-12', note:'🆪 PE-TTM 数据不足：2022-01 上市<5y(无完整5y分位) + 2024 亏损/2025 盈利近零致 TTM 失真(亿牛网显示~10698x·分位返回-1);AI 初判 22x/18% 分位系"PE-TTM 22"假设,不成立;建议改用 PB(~13.3x)/PS(~11.6x) 上市以来分位代替(待用户从网页Claude端补PB/PS分位)', tier:'estimate', src:'亿牛网 301217 PE页 https://eniu.com/gu/sz301217/pe_ttm · media 单源 + 上市<5y/盈利失真 · 建议改 PB/PS' },
    verification: {
      items: [
        { type:'供给寡头', claim:'锁定三船MSP-8000设备10台、全球70%阴极辊产能', howToCheck:'查三船/MSP-8000出货清单、铜冠铜箔/卢森堡/诺贝丽斯(海外)的设备锁定公告，看铜冠锁定比例', falsifySignal:'设备锁定被打破 / 国产新进入者锁定三船新设备 → 设备垄断逻辑塌', status:'pending' },
        { type:'产能缺口', claim:'2026年底全球月缺口~23%、日韩四强垄断85%+', howToCheck:'查铜冠HVLP4月产能、英伟达Rubin/Blackwell HVLP铜箔需求测算、日韩厂商扩产公告，交叉验证供需差', falsifySignal:'日韩厂商快速扩产 / 缺口率快速收窄 → 卡口降级', status:'pending' },
        { type:'财报印证', claim:'HVLP1-4全系列量产、2027市占率预期42%', howToCheck:'查铜冠最新季报：HVLP4出货量爬坡进度、毛利率水平。HVLP4毛利率应显著高于普通铜箔(15-20%)', falsifySignal:'HVLP4毛利率平庸 / 出货量爬坡不达预期 → 卡口大概率为假', status:'pending' },
        { type:'交叉信源', claim:'至少两个独立来源印证设备锁定+市占率', howToCheck:'一篇券商深度研报 + 公司年报/公告 + 三船公司出货公告同时印证。只有单一来源则存疑', falsifySignal:'只找得到单一来源(尤其只有自媒体) → 存疑', status:'pending' }
      ],
      note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
    } }
];
CHAINS.pcb.supplyGap = [
  { segment:'M9碳氢树脂', demand:'~8000吨/年', capacity:'~3000吨/年', gap:'5000吨', rate:'~63%', bottleneck:'认证周期18-24个月', tier:'broker', src:'Prismark + 东材公告 / 2026-06' },
  { segment:'Q布', demand:'~1500-1800万米/年', capacity:'~1000-1500万米/年', gap:'~300-685万米', rate:'>40%', bottleneck:'菲利华承接日东纺停产份额，扩产周期18-24月（产能爬坡是新瓶颈，非日东纺垄断）', tier:'broker', src:'菲利华公告+券商研报 / 2026-06' },
  { segment:'HVLP4铜箔', demand:'~1849吨/月(H2)', capacity:'~1424吨/月', gap:'~425吨/月', rate:'~23%', bottleneck:'阴极辊交期18-24月', tier:'broker', src:'CPCA + 铜冠铜箔公告 / 2026-06' }
];
CHAINS.pcb.methodologyNotes = 'PCB制造、设备等环节找不到满足四大条件的卡口——这是方法论的正常结果。中游制造环节虽然胜宏/沪电等头部企业非常优秀，但按卡口标准，客户可切换供应商→不构成物理卡口。<br><br><strong>【内容标准】</strong> 本赛道已叠加「全景占比/个股密度/进步退步」内容标准——每 segment stocks 补至 ≥5 家、treeMap sub-card note 标占比+Prismark/CPCA 来源、stocks.logic 加 ⬆ 进步/⬇ 承压/➖ 平稳 趋势前缀、position 必含市占率/排名。';

})(window.CHAINS);
