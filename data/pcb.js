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
  meta: { sector:'中游', tier:'核心', status:'active(R3-15 深度检查后·2026-06-21·38 只 stock universe(segments 35 + fourQ 36 + midstream 10, 重叠 43)·94.7% fourQ 覆盖率(36/38)·健康度 4.8/5·7 处⚠️单源待核(R3-13 P0 景旺重新核实降低 5 处)·CLAUDE.md §6 + SKILL.md §6§7 + refresh-sop.md §6.5 三处 cross-ref 治理纪律已固化)', updatedAt:'2026-06-19', ltFit:null },
  // ★ 升级九 STEP 2：景气六维 —— 样板 §3.1 原文（全标 🟢 AI 主观判断，cron 不刷数据截止日）
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:4, trend:'up',
        reason:'AI 结构性上行：单机 PCB 价值量较传统服务器提升 5–10 倍(UBS)；高多层/IC载板/高速CCL 2024–29 CAGR 约 15.7%/7.4%/40%，远超行业 5% 均速；GB200/300+2026 Rubin+中板/背板持续抬升。总量温和、弹性集中高端，故 4。',
        evidence:'Prismark、UBS / 2026-06', flag:'🟢', tier:'broker', src:'Prismark 2026.6 + UBS 行业报告' },
      { key:'visibility', name:'业绩可见度', score:5, trend:'up',
        reason:'已兑现非纯预期：沪电 2026Q1 营收+54%/净利+63%、2025 营收189亿(+42%)；胜宏 2025 净利43.1亿居A股PCB首位；生益电子 2025 前三季净利约+500%。订单+扩产长协可见。',
        evidence:'2025年报/2026Q1公告 / 2026-06', flag:'🟢', tier:'primary', src:'2025年报+2026Q1公告（cninfo / 上交所 / 深交所）' },
      { key:'policy', name:'政策确定性', score:3, trend:'flat',
        reason:'主体由 AI capex 市场驱动、政策为辅；但 IC 载板纳入"02 专项"、大基金二期投兴森，国产替代有政策顺风。制造环节中等、载板/上游材料更强。',
        evidence:'大基金二期、02专项 / 2026-06', flag:'🟢', tier:'primary', src:'大基金二期公告 + 02 专项政府文件' },
      { key:'supply', name:'供需紧张度', score:3, trend:'up',
        reason:'结构性紧张仍存但缺口逐年收窄(P4 v1 豆包核实降级 4→3):高速 CCL 缺口 2026 32-37% → 2027 25-30% → 2028 15-20%;高端电子布(石英布/Low-DK)缺口 2026 28% → 2027 22% → 2028 18%;ABF 膜(味之素)卡脖子 + HVLP 铜箔偏紧不变;低端单双面板过剩内卷。紧张集中高端材料但呈缓和趋势。',
        evidence:'Prismark 2026 H1 + CPCA 2026 Q2 / 2026-06-21', flag:'🟢', tier:'broker', src:'Prismark 2026 H1 + CPCA 2026 Q2 + 公司公告交叉验证' },
      { key:'valuation', name:'估值性价比', score:1, trend:'down',
        reason:'⚠️本轮最大扣分项（更新·亿牛网2026-06-12）：3 只核心卡口估值口径须**分别看待**，不可拿一个 TTM 拍整体——(1) 东材 PE-TTM 270.8x/99.8% 含 2025 投产爬坡的非常规低基数(眉山 3500 吨 2026.6.30 投料),early-stage forward PE 显著低于 TTM,TTM 不可作硬依据; (2) 菲利华 PE-TTM 166.11x/99.9% 6 周 +19.5%,Q 布全球 ≥55% 市占+全系列认证逻辑已充分定价,TTM 可作硬依据; (3) 铜冠 PE-TTM 失真(2024 亏损+2025 盈利近零 + 上市<5y),亿牛网显示 ~10698x/分位 -1,TTM 不可作硬依据,建议改 PB/PS 上市以来分位代替。三只情况不同,综合 1 分=门控触发,挡掉"业绩爆表+泡沫"陷阱。下钻见各卡口 valuation。',
        evidence:'roll-up 自 chokePoints[].valuation / 2026-06-12', flag:'🟢', rollupFrom:'chokePoints[].valuation.pePercentile', tier:'media', src:'亿牛网 PE 聚合页（media 单源）· 3 卡口 PE-TTM 均为 2026-06-12 收盘·未独立交叉核实', asOf:'2026-06-12' },
      { key:'barrier', name:'壁垒安全垫', score:4, trend:'flat',
        reason:'分化极大：T0(ABF载板/高速CCL M9–M10/高端电子布)极高、安全垫足；T4(单双面/普通多层)几无壁垒、内卷。赛道级取核心卡口环节给 4。下钻见 segments[].barrier 与卡口 strength。',
        evidence:'roll-up 自 segments[].barrier / 2026-06', flag:'🟢', rollupFrom:'segments[].barrier', tier:'estimate', src:'AI 主观打分 + roll-up' }
    ],
    verdict: {
      longTermFit:'适合长线研究/跟踪，但不宜当前高位追——等买点或选环节',
      oneLine:'🟢 PCB 是"业绩可见度(5)+景气持续性(4)"双高、但"估值性价比(1)"处绝对历史高位、门控触发的赛道：长线逻辑顺，胜负手在买点（等 PE 分位回踩）与选环节。',
      stockHint:'优先 T0/T1 环节（极高/高壁垒），PE 分位越低越安全；景气+确定性选环节，壁垒+估值选标的与买点。'
    }
  },
  cyclePosition: { stage:'boom', label:'繁荣中后期', reason:'🟢 AI 算力超级上行周期，需求强劲但估值已高，2027 年上游集中扩产可能形成供给拐点（AI初版，周一cron覆盖）', watchSignals:['英伟达资本开支指引（季度财报披露）','上游集中扩产公告（M9 树脂/HVLP 铜箔新产能落地）','M9 材料缺口率变化（缺口收窄 = 见顶信号）'] },
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
    { label: '📐 M9 高速树脂市场（2026后续）', value: 'M9 高速树脂市场 ~80 亿元(2026后续)', note: '高频高速树脂市场 2026E ~50 亿元、后续超 80 亿元(**人民币**); 整个 M9 产业链 TAM ~1400 亿元。**原"$80 亿/CCL" 口径存疑(疑似树脂市场 80 亿元 RMB 误作 CCL 美元), 已修正**。缺口~20%(broker 估算)', color: 'var(--red)', tier:'broker', asOf:'2026-06-13', src:'艾邦/上海证券《AI PCB 浪潮 M9 材料升级》2026-01' },
    { label: '⚡ 下一代催化', value: 'Rubin + GB300', note: '英伟达GTC 2026：Rubin 2026Q3量产', color: null, tier:'broker', src:'英伟达 GTC 2026 / 券商纪要' },
    { label: '🔴 核心矛盾', value: '上游材料卡脖子', note: '碳氢树脂<30%·Q布<30%·HVLP4<15%（CPCA 2025）', color: 'var(--red)', tier:'broker', src:'CPCA 2025 国产化率统计' },
    { label: '📋 M9 材料国产化率（4 项分型）', value: '<mark class="updated">树脂早期替代 · 铜箔 15-20% · Q布上升 · CCL ~30%</mark>', note: '**4 项分指标 + 口径区分**(国产化率=中国市场供应份额 ≠ 全球市占):\n  - **树脂**: 国产替代早期,**东材为国内唯一 M9 认证 + 国内高速树脂市占 70-80%**;但**整体 M9 树脂国产化率仍低、大量依赖进口**(两个指标不同, 勿混)\n  - **铜箔(HVLP4)**: 国产化率低(**~15-20%**), 三井/金居主导, 国产扩产中\n  - **Q 布**: 国产化率上升, 菲利华/中材/宏和扩产, 供不应求至 2027H2\n  - **CCL**: 国产化率 **~30%**, 台光主导 M9 高端, 生益为大陆第二\n\n**整体标注**: 以上为券商/行业估算(**非一手统计**), 方向性参考', color: null, tier:'broker', asOf:'2026-06-13', src:'艾邦/上海证券《AI PCB 浪潮 M9 材料升级》2026-01 + CPCA 2025(部分指标)·树脂/铜箔/CCL 为 broker,Q 布 broker+estimate 混合' }
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
          { name:'深南电路', code:'002916', position:'通信 PCB+封装基板双轮·国内唯一 ABF 量产 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + CPCA) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + CPCA)', barrier:'高' },
          { name:'烽火通信', code:'600498', position:'光通信传输设备·光网络国家队', barrier:'中' }
        ]
      },
      {
        name: '消费电子(15%)',
        barrier: 'low',
        note: '手机/笔电/可穿戴 · 增速 0-3% · 充分竞争 (Prismark 2026)',
        companies: [
          { name:'鹏鼎控股', code:'002938', position:'全球 PCB 营收 9 连冠·苹果链 FPC 主供 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + Prismark 历年榜单) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + Prismark 历年榜单)', barrier:'中' },
          { name:'东山精密', code:'002384', position:'FPC+结构件双主业·苹果链核心 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + CPCA) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + CPCA)', barrier:'中' },
          { name:'景旺电子', code:'603228', position:'中低端 PCB 老牌·汽车+消费双轮 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + CPCA) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + CPCA)', barrier:'低' }
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
          { name:'胜宏科技', code:'300476', position:'英伟达 GB300 PCB 主供·显卡 PCB 全球~50% + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 多源券商) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 多源券商)', barrier:'极高' },
          { name:'沪电股份', code:'002463', position:'AI 服务器+汽车 PCB 双龙头·78 层 M9 正交背板已通过英伟达认证并量产（v3+v3.1 双 broker 源：太平洋证券+国盛证券） + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 多源券商) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 多源券商)', barrier:'极高' },
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
          { name:'联瑞新材', code:'688300', position:'球形硅微粉龙头·国内市占~40% + Phase 9 PCB 短板补充:🔵broker(中国电子材料协会 + 公司公告) + Phase 9 PCB 短板补充:🔵broker(中国电子材料协会 + 公司公告)', barrier:'高' },
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
      { rank:1, name:'生益科技', code:'600183', position:'全球高端覆铜板第一梯队·M9等级大陆唯一进入英伟达供应链(与台光/松下并列三大供应商)·全球市占14-15% + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 英伟达供应链公告) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 英伟达供应链公告)', barrier:'极高', tier:'primary', valAsOf:'2026-04-26', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'M9大陆唯一·Q1净利+105%', logic:'<mark class="updated">2026Q1营收81.41亿+45%，净利11.58亿+105%</mark>。M8 已批量应用、M9 已取得 N 客户（broker 口径隐指英伟达）认证（v3 豆包联网核实：cninfo 2025 年报 + 2026-05-08 业绩说明会 + 招商证券研报）；M9 CCL 已批量供货英伟达供应链，全球市占14-15%，Q1毛利率28.10%;PE-TTM 113.69倍(3年分位97.42%,asOf:2026-06-21) ⚠️口径待统一:position M9市占30-40% vs logic全球市占14-15%——口径不同(细分品类M9 vs 整体CCL) ⚠️待核≥2源:M9大陆唯一表述(国信/东方财富财富号 ≥2源已核实✅)',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;高多层/IC载板/高速 CCL 2024-29 CAGR 15.7%/7.4%/40%,远超 5% 均速;生益大陆唯一 M9 认证承接台光外溢需求,卡口逻辑延续性高 → 4'},{key:'visibility',score:5,trend:'up',tier:'estimate',reason:'26Q1 营收 81.41 亿+45%,归母 11.58 亿+105%,毛利率 28.10%;M9 CCL 已批量供货英伟达供应链,订单+长协可见,业绩派首选 → 5'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'IC 载板纳入 02 专项,大陆唯一 M9 认证获政策顺风,大基金二期关联投兴森;国产替代主线受益 → 4'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'全球 M9 高速 CCL 仅台光+生益两家通过英伟达全链路认证;台光占英伟达 AI 服务器 CCL 用量 ~95%、生益为大陆唯一,高端供给紧张 → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 110.93 倍/3 年分位 97.81%(asOf 2026-06-16),估值历史极高位,趋势向下(性价比恶化);业绩派首选,需控买点 → 2'},{key:'barrier',score:5,trend:'flat',tier:'estimate',reason:'M9 全链路认证落地,大陆唯一进入英伟达供应链,全球市占 14-15%;认证周期 18-24 月+台光排他协议,壁垒极高 → 5'}],
        dims6Note:'🟢 大陆唯一 M9 CCL，业绩(Q1+105%)+壁垒双满分，估值已不便宜——业绩派' },
      { rank:2, name:'华正新材', code:'603186', position:'华为昇腾CCL核心供·CBF积层膜对标味之素ABF + Phase 9 PCB 短板补充:⚪media(东方财富/雪球 + 公司公告) + Phase 9 PCB 短板补充:⚪media(东方财富/雪球 + 公司公告)', barrier:'高', tier:'primary', valAsOf:'2026-04-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'CBF膜切入华为/中芯·Q1毛利率12%偏低', logic:'<mark class="updated">2026Q1营收12.34亿、归母0.31亿、毛利率12.02%</mark>(2026-04-22季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 129.08倍(3年分位88.76%,asOf:2026-06-21)</mark>。AI服务器用高等级CCL+CBF膜切入华为/中芯,国产替代直接受益',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'AI 算力+5G+汽车多场景驱动,覆铜板老牌+CBF 膜切入华为昇腾/中芯;AI 算力结构性上行延续,需求场景丰富 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 12.34 亿,归母 0.31 亿,毛利率 12.02% 偏低;AI 业绩兑现尚需时间,趋势走平(基数低+毛利薄) → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'CBF 膜对标味之素 ABF 国产替代,政策中性偏顺风(华为昇腾一供>60% 关联);AI 纯度低,政策驱动有限 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'CCL 覆铜板全球供过于求(中低端),CBF 膜送样华为/中芯尚需验证;趋势走平(竞争充分) → 3'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 111.70 倍/3 年分位 98.53%(asOf 2026-06-16),估值已不便宜,趋势走平(分位维持高位) → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'CBF 膜国产替代潜力大,但当前规模小,华为/中芯验证中;老牌 CCL 提供基本盘,壁垒中等偏上 → 4'}],
        dims6Note:'🟢 CBF 膜国产替代潜力,业绩兑现尚需时间;Q1毛利率12%偏低;PE-TTM 111.70倍/3年分位98.53%(asOf 2026-06-16)——估值已不便宜' },
      { rank:3, name:'南亚新材', code:'603519', position:'刚性CCL全球前10·大陆第三(Prismark·2023年度)·M8量产M9测试中 + Phase 9 PCB 短板补充:🔵broker(Prismark 2023 年度报告) + Phase 9 PCB 短板补充:🔵broker(Prismark 2023 年度报告)', barrier:'高', tier:'primary', valAsOf:'2026-04-28', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'高速材料M8→M9·Q1毛利率15.71%', logic:'<mark class="updated">2026Q1营收3.95亿、归母0.34亿、毛利率15.71%</mark>(2026-04-28季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 25.32倍(3年分位75.91%,asOf:2026-06-21)。高速材料从M8→M9追赶中,AI服务器订单加速放量',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'AI 算力+5G+汽车三大场景,刚性 CCL 全球前 10·大陆第三(Prismark 2023);M8→M9 追赶中,需求侧高景气延续 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 3.95 亿,归母 0.34 亿,毛利率 15.71% 偏低;AI 服务器订单加速放量但未到主升期,趋势走平(基数效应) → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,无 02 专项直接受益,AI 纯度中等(高多层);政策驱动有限 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'覆铜板中端为主,AI 高端 CCL 追赶中,全球供给端有富余;趋势走平(中端供过于求) → 3'},{key:'valuation',score:4,trend:'flat',tier:'estimate',reason:'PE-TTM 24.05 倍/3 年分位 40.44%(asOf 2026-06-16),估值中位(分位中性),业绩弹性释放中,趋势走平 → 4'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'刚性 CCL 全球前 10·大陆第三(Prismark 2023),但 M9 仍测试中,壁垒中等偏上 → 4'}],
        dims6Note:'🟢 高速 CCL 第三梯队,M8→M9 追赶中;Q1毛利率15.71%偏低;PE-TTM 24.05倍/3年分位40.44%(asOf 2026-06-16)——估值中位' },
      { rank:4, name:'金安国纪', code:'002636', position:'国内龙头·全球CCL第7 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026)', barrier:'中', tier:'primary', valAsOf:'2026-04-29', src:'akshare/新浪财经(基于公司季报)', trend:'flat', trendNote:'涨价标杆·AI暴露弱·Q1净利2.02亿', logic:'<mark class="updated">2026Q1营收12.60亿、归母2.02亿、毛利率26.44%</mark>(2026-04-29季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 158.61倍(3年分位42.05%,asOf:2026-06-21)。涨价期情绪标杆,中低端CCL为主,AI暴露弱',
        dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate',reason:'中低端 CCL 为主,AI 暴露弱,2025 涨价周期贡献已过;行业整体温和(总量平稳),趋势走平 → 2'},{key:'visibility',score:2,trend:'flat',tier:'estimate',reason:'26Q1 营收 12.60 亿,归母 2.02 亿(涨价期业绩弹后),毛利率 26.44%;业绩已兑现,趋势走平(基数高+涨价过) → 2'},{key:'policy',score:2,trend:'flat',tier:'estimate',reason:'中低端 CCL 无政策顺风,AI 暴露弱;政策驱动中性 → 2'},{key:'supply',score:2,trend:'flat',tier:'estimate',reason:'中低端 CCL 全球供给充足,涨价情绪已过,趋势走平(供过于求) → 2'},{key:'valuation',score:2,trend:'up',tier:'estimate',reason:'PE-TTM 154.18 倍/3 年分位 81.00%(asOf 2026-06-16),PE 绝对值高但分位中位,趋势向上(分位仍有上行空间) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'国内龙头·全球 CCL 第 7,但 AI 高端无突破,壁垒中等偏下 → 2'}],
        dims6Note:'🟢 涨价情绪标杆,AI 暴露弱、估值便宜但缺驱动;Q1毛利率26.44%尚可;PE-TTM 154.18倍/3年分位81.00%(asOf 2026-06-16)——业绩弹后估值高' }
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
      { rank:1, name:'东材科技', code:'601208', position:'全球唯二M9碳氢树脂认证·国内唯一 + Phase 9 PCB 短板补充:🔵broker(M9 认证公告 + CPCA 2026) + Phase 9 PCB 短板补充:🔵broker(M9 认证公告 + CPCA 2026)', barrier:'极高', tier:'primary', valAsOf:'2026-04-23', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'M9 GB300·台光独家·眉山3500吨6.30投产', hits:4, strength:'★★★', logic:'<mark class="updated">2026Q1营收14.44亿、归母净利1.87亿+103%、毛利率17.13%</mark>(2026-04-23季报,tier:primary,src:akshare/新浪财经(基于公司季报));高速电子树脂营收2.58亿+131%;PE-TTM 198.72倍(3年分位63.47%,asOf:2026-06-21)。台光独供2-3年排他协议。眉山3500吨<mark class="updated">2026年6月30日投料试产(提前至Q2末)</mark>。高速电子级碳氢树脂供应商·价格/毛利率数据待2025年报树脂业务分项披露后核实 ⚠️口径待统一:价格80-120万元/吨+毛利50%+,协会极少披露价格区间 ⚠️单源待核:价格80-120万元/吨+毛利50%+(协会极少披露) ⚠️asOf待核:眉山3500吨 2026/6/30 投料试产 应标具体披露日(迫近 2026-06-16)',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'M9 碳氢树脂是 CCL 三大原材料中技术壁垒最高环节,东材为大陆唯一通过英伟达 M9 认证;AI 算力 2024-29 CAGR 15.7%/7.4%/40% 持续抬升需求,卡口逻辑延续性高 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 14.44 亿,归母 1.87 亿+103%,毛利率 17.13%;高速电子树脂营收 2.58 亿+131% 兑现中但量级小,业绩未到主升期,趋势走平 → 3'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'IC 载板 02 专项+大基金二期关联+国产替代主线下 M9 树脂唯一国产获政策顺风;趋势向上 → 4'},{key:'supply',score:5,trend:'up',tier:'estimate',reason:'全球仅东材+JX 化学 2 家通过英伟达 M9 碳氢树脂认证;2026 全球缺口~5000 吨(63%),台光独供 2-3 年排他协议;供给极度紧张,趋势向上 → 5'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 190.51 倍/3 年分位 99.85%(asOf 2026-06-16),估值已透支;early-stage forward PE 显著低于 TTM(眉山 3500 吨 2026.6.30 投料试产+早期摊销压低 2025 基数),但 TTM 不可作硬依据,趋势向下(性价比恶化) → 2'},{key:'barrier',score:5,trend:'flat',tier:'estimate',reason:'M9 碳氢树脂全球唯二认证之一,大陆唯一;认证周期 18-24 月+台光排他协议,壁垒极高 → 5'}],
        dims6Note:'🟢 M9 全球唯二+大陆唯一(GB300 2025-09 量产/台光 2025-10 独家/M10 2026-02 送样);眉山 3500 吨 2026.6.30 投料试产;Q1毛利率17.13%(高速树脂+131%);PE-TTM 190.51倍/3年分位99.85%(asOf 2026-06-16)——估值已透支' },
      { rank:2, name:'圣泉集团', code:'605589', position:'PPO国内唯一量产·全球第四 ⚠️→✅ R3-11 豆包反核实:酚醛树脂国产市占70%（国泰海通 2025-09-30 + 国信证券 2026-04-27 双 broker 确认）,全球产能第一（65万吨）,成本较中小厂商低15%-20% + Phase 9 PCB 短板补充:⚪media(东方财富 2026 + 公司公告) + Phase 9 PCB 短板补充:⚪media(东方财富 2026 + 公司公告)', barrier:'高', tier:'primary', valAsOf:'2026-04-25', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'PPO国产70%·碳氢投产', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收26.71亿、归母1.77亿、毛利率26.25%</mark>(2026-04-25季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 60.48倍(3年分位99.87%,asOf:2026-06-20)。PPO国内规模化量产领先(现有产能1300-1800吨/年,2026Q3新增2000吨/年项目投产)·碳氢树脂2026Q4投产1500吨,向上突破 ⚠️待核≥2源:"PPO国内唯一量产"未找到协会/研报≥2源支撑 ⚠️单源待核:"国产市占70%"未找到来源支撑,建议改为"待核"或删除',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'PPO 国内唯一量产+碳氢树脂 2026Q4 投产 1500 吨;AI 算力结构性上行+5G/汽车多场景驱动,需求侧高景气延续 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 26.71 亿,归母 1.77 亿,毛利率 26.25% 尚可;PPO 现有产能 1300-1800 吨/年,碳氢 2026Q3 新增 2000 吨/年,业绩待 Q4 投产兑现,趋势走平 → 3'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'PPO 国产替代+大基金二期关联+碳氢树脂国产化政策顺风,趋势向上 → 4'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'PPO 国内规模化量产领先(全球 SABIC+三菱瓦斯垄断 PPO 供给近 80%),国产替代空间大;碳氢 2026Q4 投产后供需双升,趋势向上 → 4'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 58.08 倍/3 年分位 99.87%(asOf 2026-06-16),估值高位,趋势走平(分位维持高位) → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'PPO 国内规模化量产领先,壁垒中等偏上;但 SABIC/三菱仍可替+碳氢尚未投产,壁垒待 Q4 兑现 → 4'}],
        dims6Note:'🟢 PPO 国产唯一+碳氢扩产,业绩待 Q4 投产兑现;Q1毛利率26.25%尚可;PE-TTM 58.08倍/3年分位99.87%(asOf 2026-06-16)——估值高位' },
      { rank:3, name:'世名科技', code:'300522', position:'盘锦500吨已投产·M9方案已认证 ⚠️→✅ R3-11 豆包反核实:500吨已投产+2500吨为2026年扩产目标,无混淆(东方证券 2026-06-17 + 公司公告 2026-06-17 双源确认);500吨2025年营收325.97万元 + Phase 9 PCB 短板补充:⚪media(公司公告 + 行业转述) + Phase 9 PCB 短板补充:⚪media(公司公告 + 行业转述)', barrier:'高', tier:'primary', valAsOf:'2026-04-15', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'M9方案已认证·扩产·Q1净利0.02亿', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收1.52亿、归母0.02亿、毛利率25.26%</mark>(2026-04-15季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 362.12倍(3年分位27.31%,asOf:2026-06-21)</mark>。已通过台光/生益/联茂M9方案认证,规划总产能2500吨·H2放量 ⚠️口径待统一:盘锦500吨已投产 vs position 2500吨,当前 vs 规划混淆',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'M9 方案已认证,盘锦 500 吨小批量+规划总产能 2500 吨;AI 算力结构性上行+5G/汽车多场景驱动,需求侧高景气延续 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 1.52 亿,归母 0.02 亿(扭亏边缘),毛利率 25.26%;H2 放量预期但当前基数极小,业绩可见度待 H2 验证,趋势走平 → 3'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'M9 树脂国产替代+02 专项+大基金二期关联,政策顺风;趋势向上 → 4'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'M9 全球缺口 63% 整体偏紧;世名已通过台光/生益/联茂 M9 方案认证,规划总产能 2500 吨·H2 放量,趋势向上(供需双升) → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 251.48 倍/3 年分位 79.64%(asOf 2026-06-16),估值偏高,趋势向下(分位回踩中);扣分项为业绩基数小 → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'M9 方案已认证,壁垒中等偏上;但规模小(500 吨已投产 vs 规划 2500 吨),壁垒待规模化兑现 → 4'}],
        dims6Note:'🟢 M9 方案已认证,500 吨小批量、扩产爬坡中;Q1净利0.02亿(扭亏边缘);PE-TTM 251.48倍/3年分位79.64%(asOf 2026-06-16)——估值偏高' },
      { rank:4, name:'宏昌电子', code:'603002', position:'环氧树脂龙头·GBF增层膜送样 + Phase 9 PCB 短板补充:🔵broker(中国电子材料协会 2026 + 公司公告) + Phase 9 PCB 短板补充:🔵broker(中国电子材料协会 2026 + 公司公告)', barrier:'中', tier:'primary', valAsOf:'2026-04-29', src:'akshare/新浪财经(基于公司季报)', trend:'flat', trendNote:'台积电低Alpha·珠海三期8万吨·52项专利', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收9.89亿、归母0.005亿、毛利率4.87%</mark>(2026-04-29季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 910.07倍(3年分位58.20%,asOf:2026-06-21)</mark>。GBF增层膜送样台积电/长电,但环氧树脂壁垒低→非卡口;Q1毛利率仅4.87%,业绩弹性极弱',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',reason:'环氧树脂龙头,但 AI 纯度低,GBF 增层膜送样台积电/长电尚需验证;行业整体温和,趋势走平 → 3'},{key:'visibility',score:2,trend:'flat',tier:'estimate',reason:'26Q1 营收 9.89 亿,归母 0.005 亿(扭亏边缘),毛利率 4.87% 极低;业绩弹性极弱,GBF 送样未贡献营收,趋势走平 → 2'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'GBF 增层膜对标味之素 ABF 国产替代,政策中性偏顺风,但当前规模小,政策驱动有限 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'环氧树脂全球供给充足,GBF 送样阶段未量产,趋势走平(竞争充分) → 3'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 813.95 倍/3 年分位 99.84%(asOf 2026-06-16),估值严重透支;Q1 净利 0.005 亿扭亏边缘,业绩基数小,趋势向下 → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'环氧树脂壁垒低,非卡口;GBF 增层膜送样阶段,壁垒待验证 → 2'}],
        dims6Note:'🟢 台积电低 Alpha 环氧 2025-12 认证(国内唯一量产打破日企垄断)+珠海三期 8 万吨 2026-01 试生产+52 项发明专利;Q1毛利率4.87%极低/净利0.005亿扭亏边缘;PE-TTM 813.95倍/3年分位99.84%(asOf 2026-06-16)——估值严重透支' },
      { rank:5, name:'彤程新材', code:'603650', position:'电子级酚醛树脂·对标SABIC PPO + Phase 9 PCB 短板补充:🔵broker(中国电子材料协会 + 公司公告) + Phase 9 PCB 短板补充:🔵broker(中国电子材料协会 + 公司公告)', barrier:'中', tier:'primary', valAsOf:'2026-04-18', src:'akshare/新浪财经(基于公司季报)', trend:'flat', trendNote:'电子级酚醛+中芯/长江存储·PPO对CCL(口径不纳)', logic:'<mark class="updated">2026Q1营收10.49亿、归母1.82亿、毛利率22.21%</mark>(2026-04-18季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 69.52倍(3年分位49.02%,asOf:2026-06-21)。电子级酚醛稳定供应·PPO对标SABIC·AI暴露弱',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',reason:'电子级酚醛稳定+PPO 对标 SABIC,AI 暴露弱;行业整体温和,趋势走平 → 3'},{key:'visibility',score:2,trend:'flat',tier:'estimate',reason:'26Q1 营收 10.49 亿,归母 1.82 亿,毛利率 22.21%;AI 业绩兑现弱,趋势走平(主业稳定) → 2'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'PPO 国产替代+大基金二期关联,政策中性偏顺风,但 AI 暴露弱,政策驱动有限 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'电子级酚醛全球供给稳定,PPO SABIC/三菱主导,趋势走平(竞争充分) → 3'},{key:'valuation',score:2,trend:'up',tier:'estimate',reason:'PE-TTM 67.42 倍/3 年分位 82.14%(asOf 2026-06-16),估值偏高,趋势向上(分位有上行空间);扣分项为 PE 绝对值高 → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'电子级酚醛+PPO 对标,壁垒中等偏下;非 M9 碳氢树脂主卡口,壁垒待 PPO 量产 → 2'}],
        dims6Note:'🟢 电子级酚醛通过头部 CCL 厂(2025 Q4)+中芯/长江存储(2026 Q1)全国产化路径打通;PPO 仅通过 CCL 厂(口径标注不纳入本段 barrier);Q1毛利率22.21%;PE-TTM 67.42倍/3年分位82.14%(asOf 2026-06-16)——估值偏高' }
    ]
  },
  {
    name: '玻纤布/Q布（石英纤维布）', costRatio: '19%', barrier: 'extreme', choke: true, border: true,
    intro: '玻纤布是CCL的增强材料。技术等级：E-glass→Low-Dk布→T-glass→<strong>Q布/石英布（Df≤0.0007）</strong>。Q布价格~260-300元/米，是普通电子布的<strong>8倍+</strong>。<strong><mark class="updated">Q布业务处认证阶段，2025年收入9,837.37万元（占总营收4.88%），市占率数据未披露（公司公告 2026-05-26 投资者关系活动 + 2025 年报 cninfo 巨潮原文）</mark></strong>。日东纺2026年受日本地震影响停产，黄仁勋亲自赴日催货。2026年菲利华产能扩至1000-1200万米/年，毛利率55-65%。',
    globalLandscape: [
      { lbl: '🥇 菲利华（中）', val: '<mark class="updated">Q布业务处认证阶段，市占率数据未披露</mark>', note: '2025年Q布收入9,837.37万元（占总营收4.88%），2026产能1000-1200万米' },
      { lbl: '🥈 日东纺Nittobo（日）', val: 'Q布原全球龙头，地震受损', note: '份额被菲利华快速取代' },
      { lbl: '🥉 圣戈班（法）', val: '全球第三家Q布量产', note: '份额远小于菲利华' },
      { lbl: '宏和科技（中）', val: '4μm极薄布全球唯一量产', note: '超薄电子布全球市占~50%' }
    ],
    stocks: [
      { rank:1, name:'菲利华', code:'300395', position:'Q布业务处认证阶段(2025年收入9,837.37万元/占总营收4.88%)·石英砂环节中试阶段(非独家,石英股份等亦布局)·制品环节技术领先 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 菲利华 2025 年报) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 菲利华 2025 年报)', barrier:'极高', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025年报', trend:'up', trendNote:'Q布全球≥55%·Q1+53%', hits:4, strength:'★★★', logic:'<mark class="updated">2026Q1营收6.22亿+53%，净利1.44亿+37%</mark>。已通过英伟达/台积电/台光/生益全链路认证。台光锁定500-700万米(C7 v1 豆包核实:primary 投资者关系活动 + 中泰证券 双源,台光锁定为行业传闻,2027目标为公司规划;P7 broker双源验证:中泰 2026-05-11 + 中信建投 2026-06-02)。全球缺口>40%。毛利率55-65%。2027目标2000万米/年(C7 v1 豆包核实:primary 投资者关系活动 + 中泰证券 双源);PE-TTM 148.12倍(3年分位94.77%,asOf:2026-06-21) ⚠️口径待统一:4数字密集(缺口>40%+毛利55-65%+台光锁500-700万米+2027目标2000万米/年),需厘清各自时间口径 ⚠️ R3-11 豆包反核实维持单源待核:仅找到国海证券 2026-04-25 1个 broker 源,台光锁单数据未获公司官方公告确认,2026 年实际出货量预计低于目标 ⚠️单源待核维持;⚠️已发现矛盾证据:原"国产唯一全产业链"表述不成立(石英砂环节中试阶段+石英股份同样布局),position已修订为分环节表述',
        dims6:[{key:'durability',score:5,trend:'up',tier:'estimate',reason:'Q 布(石英玻璃纤维)Df≤0.0007,价格~260-300 元/米是普通电子布 8 倍+;AI 算力 2024-29 CAGR 持续抬升,日东纺地震受损+黄仁勋亲赴日催货催化延续性极强 → 5'},{key:'visibility',score:5,trend:'up',tier:'estimate',reason:'26Q1 营收 6.22 亿+53%,归母 1.44 亿+37%;台光锁定 500-700 万米订单可见,2027 目标 2000 万米/年;已通过英伟达/台积电/台光/生益全链路认证,兑现极强 → 5'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代主线+大基金二期关联,政策顺风;但 Q 布全球 ≥55% 市占已属霸主,政策驱动相对有限 → 3'},{key:'supply',score:5,trend:'up',tier:'estimate',reason:'Q 布全球缺口 >40%,菲利华承接日东纺停产份额,2026 产能扩至 1000-1200 万米/年;日东纺地震受损后份额加速转移,供给极度紧张,趋势向上 → 5'},{key:'valuation',score:1,trend:'down',tier:'estimate',reason:'PE-TTM 143.43 倍/3 年分位 99.30%(asOf 2026-06-16),估值历史极贵;6 周 +19.5% 涨势,趋势向下(性价比恶化);TTM 可作硬依据,等分位回踩 → 1'},{key:'barrier',score:5,trend:'flat',tier:'estimate',reason:'Q 布全球市占 ≥55% 绝对龙头(券商口径),国内唯一全产业链自主;毛利率 55-65% 极强,壁垒极高 → 5'}],
        dims6Note:'🟢 Q布全球≥55%绝对龙头，六维近满分但估值历史极贵(PE分位99.30%)——长线核心，等PE分位回踩' },
      { rank:2, name:'宏和科技', code:'603256', position:'4μm极薄布全球唯一量产·全球市占~50% + Phase 9 PCB 短板补充:🔵broker(CPCA 2026 + 宏和年报) + Phase 9 PCB 短板补充:🔵broker(CPCA 2026 + 宏和年报)', barrier:'高', tier:'primary', valAsOf:'2026-04-17', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'4μm超薄布全球第一·Q1毛利率55.65%', hits:3, strength:'★★☆', logic:'<mark class="updated">2026Q1营收4.42亿、归母1.40亿、毛利率55.65%</mark>(2026-04-17季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 749.19倍(3年分位38.44%,asOf:2026-06-21)。超薄电子布全球市占~50%。但非AI最核心瓶颈→降级',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'4μm 极薄布全球唯一量产,超薄电子布全球市占~50%;AI 算力高多层板对超薄布需求抬升,延续性高(虽非 M9 核心瓶颈) → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 4.42 亿,归母 1.40 亿,毛利率 55.65% 极高;业绩稳健但非 AI 最核心瓶颈,机构关注度降级,趋势走平 → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'极薄布国产替代+大基金二期关联,政策中性偏顺风,但非 M9 核心,政策驱动有限 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'4μm 极薄布全球唯一量产,2026 产能持续扩产,AI 高多层板需求抬升,趋势向上 → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 731.03 倍/3 年分位 99.82%(asOf 2026-06-16),估值严重透支;扣分项为非 M9 核心瓶颈,趋势向下(性价比恶化) → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'4μm 极薄布全球唯一量产,壁垒中等偏上;但非 AI 最核心瓶颈(降级),壁垒待 AI 高端应用兑现 → 4'}],
        dims6Note:'🟢 4μm 超薄布全球唯一,但非 AI 最核心瓶颈;Q1毛利率55.65%极高;PE-TTM 731.03倍/3年分位99.82%(asOf 2026-06-16)——估值严重透支' },
      { rank:3, name:'中材科技', code:'002080', position:'国内Low Dk市占35%·石英布独供胜宏GB300 + Phase 9 PCB 短板补充:🟢primary(中材科技 2025 年报) + Phase 9 PCB 短板补充:🟢primary(中材科技 2025 年报)', barrier:'中', tier:'primary', valAsOf:'2026-04-25', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'石英布独供GB300·送样Rubin·Q1净利5.07亿', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收68.54亿、归母5.07亿、毛利率20.94%</mark>(2026-04-25季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 68.86倍(3年分位72.25%,asOf:2026-06-21)。Q布占特种纤维布约20-30%,特种纤维布占公司总营收2.08%(C8 v1 豆包核实:primary 中材公告 + 华泰证券 双源;P7 broker双源验证:华泰 2026-06-17 + 中泰 2026-04-28);非前三寡头·主业玻纤稳',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'石英布独供胜宏 GB300,送样英伟达 Rubin;Q 布产业链整体高景气延续,2026-28 缺口显著,趋势向上 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 68.54 亿,归母 5.07 亿,毛利率 20.94%;Q 布占比仅 20-30%,主业玻纤稳,业绩弹性有限,趋势走平 → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,无 02 专项直接受益,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'Q 布整体偏紧(缺口>40%)但中材非前三寡头,主业玻纤竞争充分,趋势走平(局部紧) → 3'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 64.04 倍/3 年分位 94.77%(asOf 2026-06-16),估值偏高,趋势向下(分位回踩中) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'Q 布占比仅 20-30%,主业玻纤壁垒中等偏下;非 Q 布寡头,壁垒待高端化兑现 → 2'}],
        dims6Note:'🟢 石英布独供 GB300,Q布占比仅 20-30%;Q1净利5.07亿;PE-TTM 64.04倍/3年分位94.77%(asOf 2026-06-16)——估值偏高' },
      { rank:4, name:'中国巨石', code:'600176', position:'电子纱产能国内第一(市占25%)·全球电子玻纤市占~23%(淮安扩产后升至~28%)·全球玻纤龙头 + Phase 9 PCB 短板补充:🔵broker(中国玻纤工业协会 2025 + 年报) + Phase 9 PCB 短板补充:🔵broker(中国玻纤工业协会 2025 + 年报)', barrier:'中', tier:'primary', valAsOf:'2026-04-25', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'高端电子布扩产·AI纯度升·Q1净利12.67亿', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收52.82亿、归母12.67亿、毛利率39.64%</mark>(2026-04-25季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 56.03倍(3年分位60.94%,asOf:2026-06-21)。全球玻纤龙头,但非Q布寡头·AI纯度低',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',reason:'全球玻纤龙头,电子纱产能国内第一(市占 25%),淮安扩产后升至~28%;AI 纯度低,行业整体温和,趋势走平 → 3'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 52.82 亿,归母 12.67 亿,毛利率 39.64% 强;主业玻纤稳,Q 布产业链占比小,业绩弹性有限,趋势走平 → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,无 02 专项直接受益,AI 纯度低,政策驱动有限 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'电子纱全球供给稳定,淮安扩产中;非 Q 布寡头,趋势走平(竞争充分) → 3'},{key:'valuation',score:2,trend:'up',tier:'estimate',reason:'PE-TTM 51.99 倍/3 年分位 84.05%(asOf 2026-06-16),估值偏高,趋势向上(分位有上行空间);扣分项为 PE 绝对值高 → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'全球玻纤龙头,但非 Q 布寡头,壁垒中等偏下;AI 纯度低,壁垒待高端化兑现 → 2'}],
        dims6Note:'🟢 全球玻纤龙头,但非 Q布寡头、AI 纯度低;Q1净利12.67亿/毛利率39.64%;PE-TTM 51.99倍/3年分位84.05%(asOf 2026-06-16)——估值偏高' },
      { rank:5, name:'山东玻纤', code:'605006', position:'电子布老牌·ECR玻纤纱 + Phase 9 PCB 短板补充:🆪estimate(山东玻纤 2025 年报) + Phase 9 PCB 短板补充:🆪estimate(山东玻纤 2025 年报)', barrier:'中', tier:'primary', valAsOf:'2026-04-30', src:'akshare/新浪财经(基于公司季报)', trend:'down', trendNote:'电子布老牌·非Q布·PE失真', logic:'<mark class="updated">2026Q1营收8.45亿、归母0.10亿、毛利率14.48%</mark>(2026-04-30季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 失真(-1246.93倍,2026-06-16,亏损/微利期)。中端电子布为主·非Q布寡头·AI暴露极弱',
        dims6:[{key:'durability',score:2,trend:'down',tier:'estimate',reason:'电子布老牌·ECR 玻纤纱,非 Q 布寡头,AI 暴露极弱;中端电子布为主,景气度走弱,趋势向下 → 2'},{key:'visibility',score:2,trend:'down',tier:'estimate',reason:'26Q1 营收 8.45 亿,归母 0.10 亿(微利),毛利率 14.48%;PE-TTM 失真(-1246.93 倍,微利期);业绩弹性极弱,趋势向下 → 2'},{key:'policy',score:2,trend:'flat',tier:'estimate',reason:'中端电子布无政策顺风,趋势走平 → 2'},{key:'supply',score:2,trend:'flat',tier:'estimate',reason:'中端电子布全球供给稳定,趋势走平(竞争充分) → 2'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 失真(-1246.93 倍,asOf 2026-06-16,微利期估值失真);趋势走平(无法计算) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'电子布老牌,但非 Q 布寡头,壁垒中等偏下 → 2'}],
        dims6Note:'🟢 电子布老牌,非 Q布寡头、AI 暴露极弱;Q1净利0.10亿微利;PE-TTM失真(-1246.93倍,asOf 2026-06-16,微利期估值失真)' }
    ]
  },
  {
    name: '铜箔（HVLP4超低轮廓铜箔）', costRatio: '42%', barrier: 'extreme', choke: true, border: true,
    intro: '铜箔是CCL的导电层。HVLP4粗糙度<1μm，M9级CCL<strong>必须使用HVLP4+铜箔</strong>。核心设备阴极辊被日本JCU垄断（交期18-24个月）。日韩四强（三井/福田/古河/斗山）垄断85%+。2026年底全球月缺口<strong>~23%</strong>。国产仅铜冠铜箔实现HVLP1-4全系列量产。',
    globalLandscape: [
      { lbl: '🥇 三井金属（日）', val: 'HVLP4全球~50%', note: '扩产极保守，年扩产仅25%' },
      { lbl: '日韩四强（其余）', val: '福田/古河/斗山', note: '合计垄断85%+高端产能' },
      { lbl: '铜冠铜箔（中）', val: '国内唯一HVLP1-4全系列量产', note: '2026年底HVLP产能目标300吨/月(公司披露+券商确认;P7 broker双源验证:招商 2026-05-15 + 中泰 2026-06-10 中泰测算 300-350 吨/月)' },
      { lbl: '德福科技（中）', val: 'HVLP3量产，HVLP4验证中', note: '进入英伟达供应链' }
    ],
    stocks: [
      { rank:1, name:'铜冠铜箔', code:'301217', position:'国内唯一HVLP1-4全系列量产·2027市占预期42% ⚠️待核≥2源:日韩四强垄断85%+(Prismark) + Phase 9 PCB 短板补充:🟢primary(铜冠铜箔 2025 年报 + Prismark) + Phase 9 PCB 短板补充:🟢primary(铜冠铜箔 2025 年报 + Prismark)', barrier:'极高', tier:'primary', valAsOf:'2026-04-28', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'设备锁定70%·2027市占42%·Q1净利1.06亿', hits:4, strength:'★★★', logic:'<mark class="updated">2026Q1营收18.42亿、归母1.06亿、毛利率8.79%</mark>(2026-04-28季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 1009.48倍(3年分位92.08%,asOf:2026-06-21)</mark>。<mark class="updated">锁定10台三船MSP-8000表面处理机(全球70%),产能确定性最强(C1 v1 豆包核实:primary 投资者关系活动 + 中信证券 + 中泰证券 三源;P7 broker双源验证:华泰 2026-05-20 + 中信 2026-05-17)</mark>。2026目标500吨/月。日韩四强垄断85%+。设备交期18-24月(C4 v1 豆包核实:primary 投资者关系活动 + 海通证券 双源)。2027年HVLP铜箔市占率目标40%(券商测算)。已实现HVLP4规模化量产 ⚠️口径待统一:2027中国1厂42% vs 日韩合计85%+,两口径统计基础不同 ⚠️→✅ R3-11 豆包反核实:锁定数量从10台订正为7台(天风证券 2026-04-05 + 杰富瑞 2026-06-18 双 broker 确认);2026目标500吨/月+2027高端HVLP铜箔市占42%(42%为高端HVLP口径,非整体铜箔市场);设备交期18-24月维持 ⚠️单源待核解除',
        dims6:[{key:'durability',score:5,trend:'up',tier:'estimate',reason:'HVLP4 铜箔是 M9 级 CCL 必需,M9 树脂+HVLP4+玻纤布 三大卡口之一;AI 算力 2026 月缺口~23% 持续抬升需求,2026 目标 500 吨/月,2027 市占预期 42% → 5'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 18.42 亿,归母 1.06 亿,毛利率 8.79% 偏低;PE-TTM 失真(上市<5y+利润近零),业绩弹性未充分兑现,趋势走平 → 3'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'IC 载板 02 专项+大基金二期关联+国产替代主线下 HVLP4 设备锁定获政策顺风,趋势向上 → 4'},{key:'supply',score:5,trend:'up',tier:'estimate',reason:'国内唯一 HVLP1-4 全系列量产,锁定 10 台三船 MSP-8000 表面处理机(全球 70%);日韩四强垄断 85%+,阴极辊交期 18-24 月,供给极度紧张,趋势向上 → 5'},{key:'valuation',score:2,trend:'up',tier:'estimate',reason:'PE-TTM 失真(2022-01 上市<5y+利润近零,亿牛网显示~10698x/分位 -1);PE 绝对值高但 3 年分位 25.00% 中低,赔率/左侧派,趋势向上(分位有上行空间) → 2'},{key:'barrier',score:5,trend:'flat',tier:'estimate',reason:'国产唯一 HVLP1-4 全系列量产+设备锁定全球 70%,壁垒极高;认证周期 18-24 月+阴极辊垄断,壁垒高筑 → 5'}],
        dims6Note:'🟢 国产唯一 HVLP1-4 全系列+设备锁定 70%;Q1净利1.06亿、毛利率8.79%偏低;PE-TTM 899.30倍/3年分位25.00%(asOf 2026-06-16)——PE绝对值高但3年分位中低,赔率/左侧派' },
      { rank:2, name:'德福科技', code:'301511', position:'进入英伟达供应链·电子电路铜箔年产能5万吨可柔性切换·HVLP4已在部分客户小规模放量(2025年报)·HVLP5完成样品认证 + Phase 9 PCB 短板补充:🟢primary(德福科技 2025 年报) + Phase 9 PCB 短板补充:🟢primary(德福科技 2025 年报)', barrier:'高', tier:'primary', valAsOf:'2026-04-25', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'5万吨切换·HVLP4验证', hits:3, strength:'★★☆', logic:'<mark class="updated">2026Q1营收43.38亿、归母1.47亿、毛利率9.11%</mark>(2026-04-25季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 419.87倍(3年分位85.32%,asOf:2026-06-21)。2025年报:电子电路铜箔年产能5万吨可柔性切换。HVLP4已在部分客户小规模放量(较"验证中"更进一步)·HVLP5完成样品认证。机构关注度高→降级',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'电子电路铜箔年产能 5 万吨可柔性切换,HVLP4 部分客户小规模放量+HVLP5 样品认证;AI 算力+5G 持续抬升需求,延续性高 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 43.38 亿,归母 1.47 亿,毛利率 9.11%;HVLP4 已在部分客户小规模放量(较"验证中"更进一步),业绩可见度待规模化兑现,趋势走平 → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,进入英伟达供应链获关联顺风,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'5 万吨可切换产能+HVLP4 验证中,2025 年报披露放量进度;日韩四强垄断 85%+ 高端,趋势向上 → 4'},{key:'valuation',score:3,trend:'flat',tier:'estimate',reason:'PE-TTM 442.65 倍/3 年分位 21.94%(asOf 2026-06-16),PE 绝对值高但 3 年分位低,赔率派;趋势走平(分位维持低位) → 3'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'进入英伟达供应链+5 万吨可切换产能,壁垒中等偏上;但 HVLP4 仍小规模放量,壁垒待规模化 → 4'}],
        dims6Note:'🟢 5 万吨产能可切换，HVLP4 验证中' },
      { rank:3, name:'诺德股份', code:'600110', position:'6μm极薄铜箔量产·服务器铜箔市占>25%·2026Q1扭亏 + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 赛迪) + Phase 9 PCB 短板补充:🔵broker(Prismark 2026 + 赛迪)', barrier:'中', tier:'primary', valAsOf:'2026-04-23', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'6μm·Q1扭亏·HVLP4量产·PE失真', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收25.43亿、归母0.40亿、毛利率11.71%</mark>(2026-04-23季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 失真(-123.02倍,2026-06-16,扭亏微利期)。服务器PCB用铜箔市占>25%,但HVLP4仍在认证',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'6μm 极薄铜箔量产+服务器铜箔市占>25%,2026Q1 扭亏;AI 算力高多层板对极薄铜箔需求抬升,趋势向上 → 4'},{key:'visibility',score:3,trend:'up',tier:'estimate',reason:'26Q1 营收 25.43 亿,归母 0.40 亿(扭亏),毛利率 11.71%;PE-TTM 失真(-123.02 倍,扭亏微利期);业绩兑现可期,趋势向上 → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'服务器铜箔市占>25%,HVLP4 仍在认证;供给端整体偏紧,趋势向上 → 4'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 失真(-123.02 倍,asOf 2026-06-16,扭亏期估值失真);趋势走平(无法计算) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'6μm 极薄铜箔量产+服务器市占>25%,壁垒中等偏下;HVLP4 仍在认证,壁垒待兑现 → 2'}],
        dims6Note:'🟢 6μm 极薄铜箔+Q1 扭亏(归母0.40亿),HVLP4 仍在认证;PE-TTM失真(-123.02倍,asOf 2026-06-16,扭亏期估值失真)' },
      { rank:4, name:'嘉元科技', code:'688388', position:'极薄铜箔4.5μm市占>50% + Phase 9 PCB 短板补充:🟢primary(嘉元科技 2025 年报) + Phase 9 PCB 短板补充:🟢primary(嘉元科技 2025 年报)', barrier:'中', tier:'primary', valAsOf:'2026-04-27', src:'2026Q1季报(2026-04-27)+新浪财经2026-04-29', trend:'up', trendNote:'锂电转HVLP·2026Q1净利+392.77%', hits:null, strength:null, logic:'2026Q1归母净利润1.21亿元(+392.77%),扣非净利1.09亿元(+1208%),营收34.45亿元(+73.94%)(2026-04-27季报)·锂电铜箔转产HVLP;PE-TTM 203.38倍(3年分位21.85%,asOf:2026-06-21)',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'极薄铜箔 4.5μm 市占>50%,锂电转 HVLP4 转型中;AI 算力高多层板对极薄铜箔需求抬升,趋势向上 → 4'},{key:'visibility',score:4,trend:'up',tier:'estimate',reason:'26Q1 营收 34.45 亿+73.94%,归母 1.21 亿+392.77%,扣非 1.09 亿+1208%;锂电转 HVLP 业绩弹性释放,趋势向上 → 4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,锂电转产 HVLP 获关联顺风,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'极薄铜箔 4.5μm 全球市占>50%,HVLP4 转产中;供给端整体偏紧,趋势向上 → 4'},{key:'valuation',score:3,trend:'flat',tier:'estimate',reason:'PE-TTM 211.04 倍/3 年分位 92.40%(asOf 2026-06-16),PE 绝对值高,趋势走平(分位维持高位) → 3'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'极薄铜箔 4.5μm 全球市占>50%,壁垒中等偏下;HVLP4 转产中,壁垒待 HVLP4 兑现 → 2'}],
        dims6Note:'🟢 锂电转 HVLP，2026Q1 净利 1.21 亿+392.77%' },
      { rank:5, name:'中一科技', code:'688234', position:'高性能电子铜箔·HVLP4在研 + Phase 9 PCB 短板补充:🟢primary(中一科技 2025 年报) + Phase 9 PCB 短板补充:🟢primary(中一科技 2025 年报)', barrier:'中', tier:'primary', valAsOf:'2026-04-29', src:'akshare/新浪财经(基于公司季报)', trend:'flat', trendNote:'高性能铜箔·主业稳', logic:'<mark class="updated">2026Q1营收3.66亿、归母-0.61亿(亏损)、毛利率19.12%</mark>(2026-04-29季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 失真(-245.85倍,2026-06-16,亏损期估值失真)。锂电铜箔主业转HVLP4,AI暴露弱·业绩弹性待验证',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',reason:'高性能电子铜箔,HVLP4 在研;锂电铜箔主业转 HVLP4,AI 暴露弱,趋势走平 → 3'},{key:'visibility',score:2,trend:'flat',tier:'estimate',reason:'26Q1 营收 3.66 亿,归母-0.61 亿(亏损),毛利率 19.12%;PE-TTM 失真(-245.85 倍,亏损期);业绩弹性待验证,趋势走平 → 2'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'国产替代政策中性,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'锂电铜箔主业稳定,HVLP4 在研未量产,趋势走平(竞争充分) → 3'},{key:'valuation',score:3,trend:'flat',tier:'estimate',reason:'PE-TTM 失真(-245.85 倍,asOf 2026-06-16,亏损期估值失真);趋势走平(无法计算) → 3'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'高性能铜箔+HVLP4 在研,壁垒中等偏下;非 HVLP4 主卡口,壁垒待兑现 → 2'}],
        dims6Note:'🟢 高性能铜箔+HVLP4 在研，AI 暴露弱' }
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
      { rank:1, name:'深南电路', code:'002916', position:'国内唯一ABF载板批量交付·大陆内资ABF市占~63%·全球PCB营收前10', barrier:'极高', tier:'primary', valAsOf:'2026-04-24', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'ABF国内唯一·Q1+73%·净利8.50亿', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收65.96亿、归母8.50亿、毛利率29.17%</mark>(2026-04-24季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 85.05倍(3年分位87.92%,asOf:2026-06-21)</mark>。FC-BGA 22 层及以下产品已量产，24 层及以上产品技术研发及打样中（公司公告 2026-03-12 投资者关系活动 + 2025 年报 cninfo 巨潮），良率数据未披露（v3 豆包联网核实）；广州60亿投资2亿颗FC-BGA/年。Q1净利+73%。封装基板营收41.48亿+30.8%。2026-06-13 公告拟募资36亿元建设无锡AI算力电子电路产品项目(核心产品为AI服务器PCB);2026-06-16 调研:泰国工厂+南通四期项目产能稳步爬坡,AI服务器PCB订单饱满(P3 v1 豆包联网核实)',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'ABF 载板是 AI 芯片封装核心材料,深南为大陆唯一批量交付;广州 60 亿投资 2 亿颗 FC-BGA/年,2027 量产兑现,卡口逻辑延续性高 → 4'},{key:'visibility',score:4,trend:'up',tier:'estimate',reason:'26Q1 营收 65.96 亿,归母 8.50 亿+73%,毛利率 29.17% 强;封装基板营收 41.48 亿+30.8%;业绩可见度高,趋势向上 → 4'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'IC 载板 02 专项+大基金二期关联+国产替代主线下大陆内资 ABF 市占~63% 获政策顺风,趋势向上 → 4'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'日本味之素垄断 ABF 膜 97%,深南为大陆唯一 ABF 批量交付;华为昇腾一供>60%,卡口逻辑成立,趋势向上 → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 75.69 倍/3 年分位 99.60%(asOf 2026-06-16),估值已透支,趋势向下(性价比恶化);卡口逻辑已充分定价 → 2'},{key:'barrier',score:5,trend:'flat',tier:'estimate',reason:'PCB+封装基板+装联 3-in-1 全栈,ABF 良率破 80%;壁垒极高,认证周期 18-24 月+客户锁定,壁垒高筑 → 5'}],
        dims6Note:'🟢 壁垒(PCB+载板全栈,ABF良率破80%)+政策(内资份额~63%)最强;Q1净利8.50亿+73%、毛利率29.17%;PE-TTM 75.69倍/3年分位99.60%(asOf 2026-06-16)——估值已透支 ⚠️口径待统一:ABF良率破80% + 内资份额~63% 两数字统计基础不同' },
      { rank:2, name:'兴森科技', code:'002436', position:'ABF载板国产化追赶者·HBM级ABF唯一 ⚠️待核≥2源:HBM级ABF唯一(深南也做ABF,需厘清"HBM级"限定) + Phase 9 PCB 短板补充:⚪media(深南电路互动易 + 媒体) + Phase 9 PCB 短板补充:⚪media(深南电路互动易 + 媒体)', barrier:'高', tier:'primary', valAsOf:'2026-04-25', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'HBM级ABF·华为入股·Q1净利0.19亿', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收18.18亿、归母0.19亿、毛利率19.17%</mark>(2026-04-25季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 613.12倍(3年分位79.10%,asOf:2026-06-21)</mark>。华为昇腾认证通过。华为哈勃入股。量产爬坡缓慢',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'HBM 级 ABF 国产替代追赶者,珠海+广州超 60 亿投入;AI 算力 HBM 高带宽存储需求抬升,卡口逻辑延续性高 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 18.18 亿,归母 0.19 亿(扭亏边缘),毛利率 19.17%;量产爬坡缓慢,业绩弹性待 H2 兑现,趋势走平 → 3'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'IC 载板 02 专项+大基金二期关联+华为哈勃入股,政策顺风极强,趋势向上 → 4'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'日本味之素垄断 ABF 膜 97%,兴森为追赶者;华为昇腾认证通过,趋势向上(国产替代主线) → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 519.38 倍/3 年分位 99.83%(asOf 2026-06-16),估值严重透支;Q1 净利 0.19 亿扭亏边缘,业绩基数小,趋势向下 → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'HBM 级 ABF 唯一+华为哈勃入股,壁垒中等偏上;但量产爬坡缓慢,壁垒待规模化兑现 → 4'}],
        dims6Note:'🟢 HBM 级 ABF+华为哈勃入股,量产爬坡缓慢;Q1净利0.19亿扭亏边缘、毛利率19.17%;PE-TTM 519.38倍/3年分位99.83%(asOf 2026-06-16)——估值严重透支' },
      { rank:3, name:'华正新材', code:'603186', position:'CBF积层膜对标味之素ABF', barrier:'高', tier:'primary', valAsOf:'2026-04-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'CBF膜华为/中芯·Q1毛利率12%偏低', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收12.34亿、归母0.31亿、毛利率12.02%</mark>(2026-04-22季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 129.08倍(3年分位98.53%,asOf:2026-06-20)</mark>。CBF膜切入华为昇腾供应链,中芯国际验证中',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'CBF 积层膜对标味之素 ABF,华为昇腾供应链+中芯国际验证中;AI 算力+5G+汽车多场景驱动,延续性高 → 4'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 12.34 亿,归母 0.31 亿,毛利率 12.02% 偏低;CBF 膜切入华为/中芯尚需规模化,趋势走平 → 3'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'IC 载板 02 专项+大基金二期关联+国产替代主线下 CBF 膜唯一看点,政策顺风,趋势向上 → 4'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'日本味之素垄断 ABF 膜 97%,CBF 膜对标国产替代空间大;趋势向上(国产替代主线) → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 111.70 倍/3 年分位 98.53%(asOf 2026-06-16),估值已不便宜,趋势向下(分位回踩中) → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'CBF 膜对标味之素 ABF,壁垒中等偏上;但当前规模小,壁垒待 H2 验证 → 4'}],
        dims6Note:'🟢 CBF 膜对标味之素,华为/中芯验证中;Q1毛利率12.02%偏低/净利0.31亿;PE-TTM 111.70倍/3年分位98.53%(asOf 2026-06-16)——估值已不便宜' },
      { rank:4, name:'联瑞新材', code:'688300', position:'亚微米球形硅微粉·球形硅微粉国内市占~40%', barrier:'中', tier:'primary', valAsOf:'2026-04-28', src:'akshare/新浪财经(基于公司季报)', trend:'flat', trendNote:'球形硅微粉稳·Q1净利0.72亿·毛利率40%', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收2.94亿、归母0.72亿、毛利率40.02%</mark>(2026-04-28季报,tier:primary,src:akshare/新浪财经(基于公司季报));<mark class="updated">PE-TTM 216.80倍(3年分位89.76%,asOf:2026-06-21)</mark>。ABF膜关键填料,进入头部供应链·主业硅微粉稳定',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',reason:'亚微米球形硅微粉+ABF 膜关键填料,主业球形硅微粉国内市占~40% 稳;AI 暴露中等,趋势走平 → 3'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'26Q1 营收 2.94 亿,归母 0.72 亿,毛利率 40.02% 极强;主业硅微粉稳定,ABF 填料贡献小,趋势走平 → 3'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'IC 载板 02 专项关联+国产替代主线顺风,但 ABF 填料占比小,政策驱动有限 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'球形硅微粉国内市占~40%,进入头部 ABF 膜供应链;趋势走平(主业稳定) → 3'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 176.35 倍/3 年分位 99.87%(asOf 2026-06-16),估值严重透支;趋势走平(分位维持高位) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'球形硅微粉壁垒中等偏下,ABF 膜填料非主卡口,壁垒待 ABF 膜规模化兑现 → 2'}],
        dims6Note:'🟢 ABF 膜关键填料,主业球形硅微粉稳;Q1净利0.72亿/毛利率40.02%极强;PE-TTM 176.35倍/3年分位99.87%(asOf 2026-06-16)——估值严重透支' },
      { rank:5, name:'博敏电子', code:'603936', position:'PCB+汽车切入ABF + Phase 9 PCB 短板补充:⚪media(公司公告 + 媒体) + Phase 9 PCB 短板补充:⚪media(公司公告 + 媒体)', barrier:'中', tier:'primary', valAsOf:'2026-04-28', src:'akshare/新浪财经(基于公司季报)', trend:'down', trendNote:'PCB切入ABF规模小·Q1亏损', logic:'<mark class="updated">2026Q1营收8.18亿、归母-0.11亿(亏损)、毛利率15.50%</mark>(2026-04-28季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 失真(-518.62倍,2026-06-16,亏损期估值失真)。PCB老牌厂商切入ABF,量产规模小·AI暴露弱',
        dims6:[{key:'durability',score:2,trend:'down',tier:'estimate',reason:'PCB 老牌厂商切入 ABF,量产规模小,AI 暴露弱;行业整体温和,趋势向下(主业承压) → 2'},{key:'visibility',score:2,trend:'down',tier:'estimate',reason:'26Q1 营收 8.18 亿,归母-0.11 亿(亏损),毛利率 15.50%;PE-TTM 失真(-518.62 倍,亏损期);业绩弹性待验证,趋势向下 → 2'},{key:'policy',score:2,trend:'flat',tier:'estimate',reason:'中端 PCB+切入 ABF 政策驱动有限,趋势走平 → 2'},{key:'supply',score:2,trend:'flat',tier:'estimate',reason:'PCB 切入 ABF 量产规模小,非主卡口,趋势走平(竞争充分) → 2'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 失真(-518.62 倍,asOf 2026-06-16,亏损期估值失真);趋势走平(无法计算) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'PCB 老牌+切入 ABF 量产规模小,壁垒中等偏下;非 ABF 主卡口,壁垒待规模化兑现 → 2'}],
        dims6Note:'🟢 PCB 切入 ABF,量产规模小、AI 暴露弱;Q1归母-0.11亿亏损、毛利率15.50%;PE-TTM失真(-518.62倍,asOf 2026-06-16,亏损期估值失真)' }
    ]
  },
  {
    name: 'PCB专用设备', costRatio: '—', barrier: 'mid', choke: false, border: false,
    intro: 'PCB制造扩产潮直接利好上游设备商。钻孔设备占全产业链~20%（最高），曝光~17%，电镀~7%。高端设备国产化率不足30%。卡口判定：全球供应商>5家，客户可切换→不构成物理卡口。但国产替代+扩产潮双击下，设备商有强β弹性。',
    globalLandscape: [
      { lbl: '鼎泰高科（中）', val: 'PCB钻针全球第一(2025H1市占28.9%)', note: '2025年报:净利4.34亿+91.1%' },
      { lbl: '大族数控（中）', val: '钻孔设备全球第二', note: '2025年报:净利8.24亿+173.68%' },
      { lbl: '芯碁微装（中）', val: 'PCB直接成像设备全球第一(2025市占18.8%)', note: '港交所招股书:全球唯一覆盖四场景' }
    ],
    stocks: [
      { rank:1, name:'鼎泰高科', code:'301377', position:'PCB钻针全球第一(2024年市占26.8%/2025H1进一步提升至28.9%,Frost&Sullivan数据) ⚠️口径待统一:钻针全球第一26.8% vs 同段金洲精工20.8% 全球第二,合计47.6%留52%+给其他 ⚠️时序已更新:原26.5%是2023年Prismark旧数据,本次更新为最新 + Phase 9 PCB 短板补充:🔵broker(Frost & Sullivan 2025) + Phase 9 PCB 短板补充:🔵broker(Frost & Sullivan 2025)', barrier:'高', tier:'primary', valAsOf:'2026-04-16', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一·AI高多层', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收8.14亿、归母2.61亿、毛利率53.25%</mark>(2026-04-16季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 397.10倍(3年分位82.30%,asOf:2026-06-21)。2025年报(2026-03-26):归母净利4.34亿元(+91.1%),毛利率42.34%(+6.54pct),扣非净利4.09亿元(+102.5%)·AI高多层板钻针耗量激增 ⚠️口径待统一:同position 26.8% + 20.8% 合计47.6% 张力 ⚠️→✅ R3-11 豆包反核实:AI服务器PCB钻孔数为普通服务器的5-10倍,单台钻孔量从10万→50万+孔(东北证券 2026-04-10 + 国海证券 2026-05-24 双 broker 源确认);M9基材使钻针寿命从3000孔降至100-200孔,形成供需共振 ⚠️单源待核解除',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'PCB 钻针全球第一(2024 市占 26.8%/2025H1 28.9%,Frost&Sullivan);AI 高多层板钻孔量级飙升,2025 钻孔数 AI服务器PCB较普通服务器增加5-10倍(券商测算;P7 broker双源验证:中信 2026-06-05 + 招商 2026-06-05),延续性强 → 4'},{key:'visibility',score:4,trend:'up',tier:'estimate',reason:'26Q1 营收 8.14 亿,归母 2.61 亿,毛利率 53.25% 极高;2025 年报(2026-03-26)归母净利 4.34 亿+91.1%,毛利率 42.34%(+6.54pct),扣非 4.09 亿+102.5%;业绩弹性兑现,趋势向上 → 4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'高端 PCB 设备国产替代政策中性,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'PCB 钻针全球第一+AI 高多层板钻孔量级飙升,扩产潮直接利好;趋势向上 → 4'},{key:'valuation',score:3,trend:'flat',tier:'estimate',reason:'PE-TTM 366.38 倍/3 年分位 99.87%(asOf 2026-06-16),PE 绝对值高,趋势走平(分位维持高位) → 3'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'PCB 钻针全球第一,壁垒中等偏上;非物理卡口(全球供应商>5 家可切换),壁垒待高端化兑现 → 4'}],
        dims6Note:'🟢 PCB 钻针全球第一+AI 高多层钻孔量级飙升' },
      { rank:2, name:'大族数控', code:'301200', position:'钻孔设备全球第二·AI高多层板设备市占40-50% + Phase 9 PCB 短板补充:🔵broker(Prismark + CPCA) + Phase 9 PCB 短板补充:🔵broker(Prismark + CPCA)', barrier:'高', tier:'primary', valAsOf:'2026-04-21', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'2025年报净利+173.68%', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收19.55亿、归母3.23亿、毛利率33.12%</mark>(2026-04-21季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 159.93倍(3年分位70.11%,asOf:2026-06-21)。2025年报(2026-03-31):营业总收入57.73亿元(+72.68%),归母净利润8.24亿元(+173.68%),扣非净利8.21亿元(+290.92%)·AI高多层板设备市占40-50%',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'钻孔设备全球第二+AI 高多层板设备市占 40-50%;AI 算力+5G 持续抬升 PCB 钻孔设备需求,延续性强 → 4'},{key:'visibility',score:5,trend:'up',tier:'estimate',reason:'26Q1 营收 19.55 亿,归母 3.23 亿,毛利率 33.12% 强;2025 年报(2026-03-31)营收 57.73 亿+72.68%,归母 8.24 亿+173.68%,扣非 8.21 亿+290.92%;业绩弹性极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'高端 PCB 设备国产替代政策中性,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'AI 高多层板设备市占 40-50%,PCB 扩产潮直接利好;趋势向上 → 4'},{key:'valuation',score:3,trend:'flat',tier:'estimate',reason:'PE-TTM 154.71 倍/3 年分位 99.87%(asOf 2026-06-16),PE 绝对值高,趋势走平(分位维持高位) → 3'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'钻孔设备全球第二+AI 高多层板设备市占 40-50%,壁垒中等偏上;非物理卡口,壁垒待高端化兑现 → 4'}],
        dims6Note:'🟢 钻孔设备全球第二+2025年报净利8.24亿+173.68%' },
      { rank:3, name:'芯碁微装', code:'688630', position:'PCB直接成像设备全球市占率18.8%(2025年,收入口径,全球第一,领先第二名3.1pct)·全球唯一覆盖PCB/IC载板/先进封装/掩膜版四场景的企业(灼识咨询·港交所招股书) + Phase 9 PCB 短板补充:🔵broker(灼识咨询·港交所招股书) + Phase 9 PCB 短板补充:🔵broker(灼识咨询 港交所招股书)', barrier:'高', tier:'primary', valAsOf:'2026-04-30', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'3-4μm小批量·双催化·Q1毛利率40.94%', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收5.15亿、归母1.08亿、毛利率40.94%</mark>(2026-04-30季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 190.89倍(3年分位96.39%,asOf:2026-06-21)。2026年港交所招股书(灼识咨询):PCB直接成像设备2025年全球市占18.8%(收入口径,全球第一,领先第二名3.1pct)·全球唯一覆盖PCB/IC载板/先进封装/掩膜版四场景企业 ⚠️单源待核:原"3-4μm线宽+2026激光钻孔订单70-100台"未找到对应来源,本次整体替换为招股书数据',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'PCB 直接成像设备全球第一(2025 市占 18.8%,收入口径,灼识咨询·港交所招股书);AI 算力+5G+IC 载板+先进封装四场景覆盖,延续性强 → 4'},{key:'visibility',score:4,trend:'up',tier:'estimate',reason:'26Q1 营收 5.15 亿,归母 1.08 亿,毛利率 40.94% 极强;2026 年 1-2 月单月设备交付量 65-68 台;业绩弹性兑现,趋势向上 → 4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'高端 PCB 设备+IC 载板设备国产替代政策中性,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'全球唯一覆盖 PCB/IC 载板/先进封装/掩膜版四场景企业,AI 高多层板设备需求抬升,趋势向上 → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 176.36 倍/3 年分位 99.87%(asOf 2026-06-16),估值严重透支;扣分项为 PE 绝对值高,趋势向下 → 2'},{key:'barrier',score:4,trend:'flat',tier:'estimate',reason:'PCB 直接成像设备全球第一+四场景覆盖,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 4'}],
        dims6Note:'🟢 PCB直接成像设备全球第一(2025市占18.8%)+港交所招股书披露四场景覆盖;Q1净利1.08亿/毛利率40.94%极强;PE-TTM 176.36倍/3年分位99.87%(asOf 2026-06-16)——估值严重透支' },
      { rank:4, name:'东威科技', code:'688700', position:'VCP电镀国内市占>50%·AI订单>5亿 + Phase 9 PCB 短板补充:⚪media(公司公告 + 行业转述) + Phase 9 PCB 短板补充:⚪media(公司公告 + 行业转述)', barrier:'中', tier:'primary', valAsOf:'2026-04-28', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'AI订单>5亿·Q1净利0.44亿·毛利率37.25%', hits:null, strength:null, logic:'<mark class="updated">2026Q1营收3.05亿、归母0.44亿、毛利率37.25%</mark>(2026-04-28季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 204.21倍(3年分位93.15%,asOf:2026-06-21)。AI订单>5亿。三合一电镀设备打破海外垄断',
        dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'VCP 电镀国内市占>50%+三合一电镀设备打破海外垄断;AI 算力+5G 持续抬升 PCB 电镀设备需求,延续性强 → 4'},{key:'visibility',score:4,trend:'up',tier:'estimate',reason:'26Q1 营收 3.05 亿,归母 0.44 亿,毛利率 37.25% 极强;AI 订单>5 亿,业绩弹性兑现,趋势向上 → 4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'高端 PCB 设备国产替代政策中性,趋势走平 → 3'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'VCP 电镀国内市占>50%+AI 订单>5 亿,扩产潮直接利好,趋势向上 → 4'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 197.00 倍/3 年分位 91.87%(asOf 2026-06-16),估值严重透支,趋势向下(分位回踩中) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'VCP 电镀国内市占>50%+三合一电镀设备打破海外垄断,壁垒中等偏下;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 2'}],
        dims6Note:'🟢 VCP 电镀国内>50%+AI 订单>5 亿;Q1净利0.44亿/毛利率37.25%极强;PE-TTM 197.00倍/3年分位91.87%(asOf 2026-06-16)——估值严重透支' },
      { rank:5, name:'金洲精工', code:'002443', position:'PCB钻针全球第二·全球PCB微钻市占20.8%(C9 v1 豆包核实:中信证券 21% + 中泰证券 20.8% 双 broker 源) ⚠️口径待统一:鼎泰26.8%(2024)/28.9%(2025H1,Frost&Sullivan) + 金洲20.8% 合计47.6%,与原26.5%+20.8%=47.3%略有差异(因鼎泰数据时序更新) ⚠️时序待核:金洲20.8%数据对应年份未独立核实 + Phase 9 PCB 短板补充:🔵broker(Frost & Sullivan 2025) + Phase 9 PCB 短板补充:🔵broker(Frost & Sullivan 2025)', barrier:'中', tier:'primary', valAsOf:'2026-04-28', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第二·市占20.8%·Q1净利0.40亿', logic:'<mark class="updated">2026Q1营收9.36亿、归母0.40亿、毛利率13.03%</mark>(2026-04-28季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 39.44倍(3年分位74.43%,asOf:2026-06-21)。PCB钻针老牌厂商,被鼎泰高科高端化替代·AI纯度低',
        dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',reason:'PCB 钻针全球第二·市占 20.8%,被鼎泰高科高端化替代;AI 纯度低,行业整体温和,趋势走平 → 3'},{key:'visibility',score:2,trend:'flat',tier:'estimate',reason:'26Q1 营收 9.36 亿,归母 0.40 亿,毛利率 13.03% 偏低;AI 纯度低+被鼎泰替代,业绩弹性有限,趋势走平 → 2'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'中端 PCB 设备无政策顺风,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'钻针全球第二但被鼎泰替代,趋势走平(竞争充分) → 3'},{key:'valuation',score:2,trend:'flat',tier:'estimate',reason:'PE-TTM 40.23 倍/3 年分位 78.24%(asOf 2026-06-16),估值偏高,趋势走平(分位维持高位) → 2'},{key:'barrier',score:2,trend:'flat',tier:'estimate',reason:'PCB 钻针老牌但被高端化替代,壁垒中等偏下;非物理卡口,壁垒待高端化兑现 → 2'}],
        dims6Note:'🟢 钻针老牌+被鼎泰高科高端化替代;Q1净利0.40亿/毛利率13.03%偏低;PE-TTM 40.23倍/3年分位78.24%(asOf 2026-06-16)——估值偏高' }
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
      { rank:1, name:'沪电股份', code:'002463', position:'GB200/GB300 交换机及高多层板核心供应商之一，与景旺电子等共同供应（非独家）；78 层 M9 正交背板已通过英伟达认证并量产', barrier:'高', tier:'primary', valAsOf:'2026-06-13', src:'2026Q1/2025年报+券商研报', trend:'up', trendNote:'AI营收占比升至~60%',
        dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;沪电为英伟达 H100/H200 提供 22-26 层高多层板,H200 UBB 主板份额超 70%(截至 2025),泰国工厂 2025.10 投产承接 GB300 订单,延续性极强 → 5'},{key:'visibility',score:5,trend:'up',reason:'26Q1 营收 62.14 亿+53.91%,归母 12.42 亿+62.9%,AI 营收占比升至~60%,英伟达份额>50%;2025 净利 38.22 亿+47.74%;业绩兑现极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项+大基金二期关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:4,trend:'up',reason:'与景旺电子等共同供应 GB200 服务器 UBB 基板/PCB 组件(非独家);AI 算力高多层板扩产潮直接利好,趋势向上 → 4'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 62.91 倍/3 年分位 90.48%(asOf 2026-06-16),估值偏高,趋势向下(性价比恶化);扣分项为估值高位,需控买点 → 2'},{key:'barrier',score:4,trend:'flat',reason:'英伟达 H100/H200 高多层板主供+78 层背板认证,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 4'}],
        logic:'为英伟达H100/H200提供22-26层高多层板,与景旺电子等共同供应GB200服务器UBB基板/PCB组件(非独家);78 层 M9 正交背板已通过英伟达认证并量产（v3+v3.1 双 broker 源：太平洋证券+国盛证券）;2025年10月泰国工厂投产,承接GB300订单,为下一代产品预留产能。2026-06-16 调研:高端PCB材料供应偏紧;已搭建CoWoP等前沿技术与mSAP等先进工艺孵化平台(P3 v1 豆包联网核实);PE-TTM 66.16倍(3年分位91.28%,asOf:2026-06-21)',
        dims6Note:'🟢 AI PCB最纯标的：26Q1营收62.14亿+53.91%/净利12.42亿+62.9%、AI营收占比升至~60%、英伟达份额>50%；2025净利38.22亿+47.74%。扣分项为估值高位(PE随股价波动，需刷新)。', src:'2026Q1/2025年报' },
      { rank:2, name:'胜宏科技', code:'300476', position:'英伟达显卡PCB全球份额约50%(一供,Prismark 2026);GB300 OAM子板核心供应商;2025年AI业务营收83.4亿(占比43%、同比+11倍、毛利率40-45%),在手订单饱满排至2026年底(v3 豆包联网核实)', barrier:'高', tier:'primary', valAsOf:'2026-06-13', src:'2026Q1/2025年报+Prismark', trend:'up', trendNote:'A 股 PCB 净利首位',
        dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'},{key:'visibility',score:5,trend:'up',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:4,trend:'up',reason:'2025Q1 英伟达订单占比超 70%(历史参考),AI 高多层板扩产潮直接利好;趋势向上 → 4'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 74.65 倍/3 年分位 95.98%(asOf 2026-06-16),估值高位,趋势向下(性价比恶化);扣分项为估值最贵,需控买点 → 2'},{key:'barrier',score:4,trend:'flat',reason:'英伟达 Tier1+GB300 主供+显卡 PCB 全球~50%,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 4'}],
        logic:'供应GB300的OAM五阶HDI板,单板价值量提升30%+;2025Q1英伟达订单占比超70%(历史参考数据,2026Q1最新占比②待补);数据中心PCB占比近50%(截至2025年Q1)',
        dims6Note:'🟢 AI弹性最大：2025净利43.12亿+273.52%(A股PCB首位)、26Q1净利12.88亿+40%;PE-TTM 77.49倍(3年分位83.91%,asOf:2026-06-21)(营收55.19亿+28%)、显卡/AI算力卡PCB领先。估值高位为扣分项(随股价刷新)。', src:'2026Q1/2025年报' },
      { rank:3, name:'东山精密', code:'002384', position:'边缘AI设备PCB全球第一(2025市占26.9%)·全球PCB前3(市占4.2%)·FPC软板全球第二(市占24.5%)', barrier:'高', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025年报+Prismark', trend:'up', trendNote:'Q1+143%·含光模块',
        dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力+5G+消费多场景,边缘 AI 设备 PCB 全球第一(2025 市占 26.9%)+全球 PCB 前 3(市占 4.2%)+FPC 软板全球第二(市占 24.5%);索尔思光电 200G EML 国内唯一量产 IDM,延续性强 → 5'},{key:'visibility',score:5,trend:'up',reason:'26Q1 营收 131.38 亿+52.72%,归母 11.10 亿+143%,扣非+167%;弹性主要来自索尔思光模块并表(非纯 PCB),为 PCB+光模块综合体;业绩兑现强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+光模块国产替代,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:4,trend:'up',reason:'子公司 Multek 78 层+高层数 PCB 量产适配英伟达 GB200;800G 光模块批量交付 Meta/微软·1.6T 通过英伟达验证(2026Q4 量产);珠海 10 亿美元高端 PCB 基地 2026Q3 投产,趋势向上 → 4'},{key:'valuation',score:3,trend:'flat',reason:'PE-TTM 223.61 倍/3 年分位 82.50%(asOf 2026-06-16),PE 绝对值高但分位中位;估值相对没沪电/胜宏极端(券商测 2026 PE~29x,截至 2026-04-26),趋势走平 → 3'},{key:'barrier',score:3,trend:'flat',reason:'边缘 AI 设备 PCB 全球第一+FPC 全球第二,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 3'}],
        logic:'子公司Multek 78层+高层数PCB量产适配英伟达GB200；2025收购索尔思光电(国内唯一量产200G EML光芯片IDM)·800G光模块批量交付Meta/微软·1.6T通过英伟达验证(2026Q4量产)；珠海10亿美元高端PCB基地2026Q3投产。2026-06-16 公告:子公司索尔思光电拟投资12亿美元扩建光芯片及光模块产能,间接利好AI服务器PCB需求(P3 v1 豆包联网核实);PE-TTM 245.10倍(3年分位76.78%,asOf:2026-06-21)',
        dims6Note:'🟢 26Q1营收131.38亿+52.72%/净利11.10亿+143%/扣非+167%；弹性主要来自索尔思光模块并表(非纯PCB)，为PCB+光模块综合体；估值相对没沪电/胜宏极端(券商测2026 PE~29x，截至2026-04-26)。', src:'2026Q1/2025快报' },
      { rank:4, name:'景旺电子', code:'603228', position:'2024年首次成为全球第一大汽车PCB供应商(2023年已进全球前三);英伟达H100/GB300交换机托盘核心供应商之一,与日本名幸等共同供应GB200服务器UBB基板', barrier:'中', tier:'primary', valAsOf:'2026-04-23', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'汽车PCB全球第一·Q1净利2.33亿',
        dims6:[{key:'durability',score:4,trend:'up',reason:'2024 年首次成为全球第一大汽车 PCB 供应商(2023 已进全球前三);英伟达 H100/GB300 交换机托盘核心供应商之一;汽车+消费双轮+AI 高阶 HDI 转型,延续性高 → 4'},{key:'visibility',score:3,trend:'flat',reason:'26Q1 营收 38.92 亿,归母 2.33 亿,毛利率 18.76% 稳健;2023.4 获英伟达合格供应商认证,2024 年高阶 HDI 一次性通过认证;正交背板项目获研发标(单源待核),趋势走平 → 3'},{key:'policy',score:3,trend:'flat',reason:'汽车 PCB+AI 高阶 HDI 政策中性,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',reason:'综合 PCB(软板/硬板/金属基),AI 纯度低;2026 全年规划新增约 200 万平米高端产能(珠海金湾+泰国基地),趋势走平(扩产中) → 3'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 67.58 倍/3 年分位 99.42%(asOf 2026-06-16),估值高位,趋势向下(分位回踩中);扣分项为 AI 纯度低 → 2'},{key:'barrier',score:3,trend:'flat',reason:'英伟达二级供应商+全球 PCB 第 9+汽车 PCB 全球第一,壁垒中等;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 3'}],
        logic:'<mark class="updated">2026Q1营收38.92亿、归母2.33亿、毛利率18.76%</mark>(2026-04-23季报,tier:primary,src:akshare/新浪财经(基于公司季报));PE-TTM 70.10倍(3年分位69.01%,asOf:2026-06-21)。2023年4月获英伟达合格供应商认证,2024年高阶HDI一次性通过认证(国内少数实现该突破的企业之一);正交背板项目获研发标(具体份额口径仅见单一媒体源,待核);2026年全年规划新增约200万平米高端产能(珠海金湾+泰国基地,泰国工厂2026年投产)',
        dims6Note:'🟢 综合PCB(软板/硬板/金属基)、AI纯度低;Q1净利2.33亿/毛利率18.76%稳健;PE-TTM 67.58倍/3年分位99.42%(asOf 2026-06-16)——估值高位。弹性弱于纯AI龙头。' },
      { rank:5, name:'鹏鼎控股', code:'002938', position:'全球PCB营收连续9年第一·FPC软板全球第二(2025市占25%)', barrier:'高', tier:'primary', valAsOf:'2026-05-22', src:'2026Q1/2025年报+Prismark', trend:'up', trendNote:'9连冠·AI暴露小',
        dims6:[{key:'durability',score:3,trend:'flat',reason:'全球 PCB 营收连续 9 年第一+FPC 软板全球第二(2025 市占 25%);消费电子占比~70%→AI 转型中;2026-01-15 调研披露"算力直接客户订单导入元年",AI 多场景布局推进中;趋势走平(消费弱) → 3'},{key:'visibility',score:2,trend:'down',reason:'26Q1 营收 79.86 亿同比-1.25%,归母净利 4.63 亿同比-5.21%,扣非-31.85%;AI 业务尚未兑现到整体业绩,业绩可见度低,趋势向下 → 2'},{key:'policy',score:3,trend:'flat',reason:'苹果链稳定+AI 转型政策中性,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',reason:'覆盖 AI 服务器/光模块/交换机等多场景;消费占比~70% 受消费电子周期影响,趋势走平 → 3'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 67.54 倍/3 年分位 99.58%(asOf 2026-06-16),估值贵(动态 PE~130x、TTM~65x,截至 2026-05-22),趋势向下 → 2'},{key:'barrier',score:4,trend:'flat',reason:'全球 PCB 营收 9 连冠+FPC 全球第二,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待 AI 转型兑现 → 4'}],
        logic:'主营FPC/SLP/HDI/高多层刚性板,覆盖AI服务器/光模块/交换机；2026-01-15调研纪要披露"算力直接客户订单导入元年",AI多场景布局推进中；但26Q1营收79.86亿同比-1.25%/归母净利4.63亿同比-5.21%,AI业务尚未兑现到整体业绩;<mark class="updated">PE-TTM 74.86倍(3年分位64.36%,asOf:2026-06-21)</mark>',
        dims6Note:'🟢 全球PCB营收9连冠/苹果软板核心，"大而不纯AI"：AI服务器板仅占营收5.41%；26Q1营收79.86亿-1.25%/净利4.63亿-5.21%/扣非-31.85%走弱；估值贵(动态PE~130x、TTM~65x，截至2026-05-22)。', src:'2026Q1/2025年报' }
    ]
  }
];

// PCB Midstream stocks
CHAINS.pcb.midstream = {
  description: 'PCB制造是充分竞争行业。2025年以来五大龙头新增投资合计超400亿元，产能预计2026-2027年集中释放。行业呈"K型分化"。卡口判定：该环节无物理卡口（客户可切换供应商）。但头部企业强者恒强。',
  stocks: [
    { rank:1, name:'胜宏科技', code:'300476', barrier:'极高', tier:'primary', valAsOf:'2026-06-13', src:'2026Q1/2025年报', trend:'up', trendNote:'GB300主供·Q1+40%', note:'英伟达Tier1，显卡PCB全球~50%(Prismark 2026)，Q1净利12.88亿+40%;2025年AI业务营收83.4亿(占比43%、同比+11倍),在手订单饱满排至2026年底(v3 豆包联网核实) ⚠️口径待统一:与seg[6] r2胜宏(50%)一致✅,但与seg[3]德福无重复去重',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 弹性最大(英伟达显卡板~50%)，但出口近八成、汇率敏感+估值最贵（样板 §3.2 原文）' },
    { rank:2, name:'沪电股份', code:'002463', barrier:'极高', tier:'primary', valAsOf:'2026-06-13', src:'2026Q1/2025年报', trend:'up', trendNote:'78层背板·Q1+62.9%', note:'78 层 M9 正交背板已通过英伟达认证并量产（v3+v3.1 双 broker 源：太平洋证券+国盛证券）·AI+汽车双龙头，Q1净利12.42亿+62.9%，年内四次扩产 ⚠️与seg[6] r1沪电:5/5已独立核,midstream 此处沿用新口径',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 兑现最快、估值同样不便宜——业绩派首选、但需控买点（样板 §3.2 原文）' },
    { rank:3, name:'深南电路', code:'002916', barrier:'极高', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025年报', trend:'up', trendNote:'Q1+73%·装联3in1', note:'PCB+封装基板+装联3-in-1·国内唯一ABF批量交付，Q1净利8.50亿+73%',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 壁垒(全栈)+政策最强、估值相对温和；载板兑现慢——壁垒派首选（样板 §3.2 原文）' },
    { rank:4, name:'鹏鼎控股', code:'002938', barrier:'高', tier:'primary', valAsOf:'2026-05-22', src:'2026Q1/2025快报', trend:'flat', trendNote:'苹果链FPC·消费占比高', note:'全球PCB营收9连冠·苹果链FPC主供，消费电子占比~70%→AI转型中 ⚠️与seg[6] r5鹏鼎:26Q1双下滑+AI元年叙事张力已独立核;<mark class="updated">PE-TTM 74.86倍(3年分位99.58%,asOf:2026-06-20)</mark>',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 全球 PCB 9 连冠，但消费占比~70%，AI 转型中' },
    { rank:5, name:'广合科技', code:'001389', barrier:'高', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025快报', trend:'up', trendNote:'算力纯度最高', note:'专注算力PCB（服务器/交换机）·算力纯度最高 | 🆕 A1.5 新增 PE-TTM 81.51倍(3年分位81.14%,asOf:2026-06-21) | ✅ P5 broker验证:华安证券 2026-04-27 测算82.1倍(+0.7%)',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 专注算力 PCB，纯度最高' },
    { rank:6, name:'生益电子', code:'688183', barrier:'高', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025快报', trend:'up', trendNote:'AI服务器黑马·净利+5倍', note:'AI服务器PCB黑马·净利增近5倍·生益科技子公司 | 🆕 A1.5 新增 PE-TTM 67.07倍(3年分位66.71%,asOf:2026-06-21) | ✅ P5 broker验证:招商证券 2026-05-04 测算66.8倍(-0.4%)',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 AI 服务器 PCB 黑马+净利近 5 倍，估值跟涨' },
    { rank:7, name:'景旺电子', code:'603228', barrier:'中', tier:'primary', valAsOf:'2026-06-13', src:'2026Q1/2025年报', trend:'flat', trendNote:'汽车+HDI·高阶转型', note:'刚性/FPC/金属基全覆盖,英伟达二级供应商·AI纯度低;汽车PCB全球市占9%(灼识咨询+申万宏源双确认),英伟达Rubin中板(midplane)份额40%+(招商证券+民生证券双确认),Switch板(交换板)份额20-25%;⚠️ R3-13 豆包反核实:正交背板25%+份额仍为单源且存在品类混淆(原标注实为Switch板份额,非正交背板),需区分中板/交换板/正交背板三个不同品类',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 全覆盖+二级供应商，AI 纯度低' },
    { rank:8, name:'东山精密', code:'002384', barrier:'中', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025快报', trend:'up', trendNote:'切入AI服务器供应链', note:'FPC龙头+光电双主业·苹果链稳定 ⚠️与seg[6] r3东山:Frost & Sullivan招股书数据已独立核',
      dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 FPC 龙头切入 AI 服务器，苹果链稳' },
    { rank:9, name:'世运电路', code:'603920', barrier:'中', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025年报', trend:'up', trendNote:'28层AI服务器板+转型AI/机器人', note:'特斯拉汽车/人形机器人PCB·汽车赛道稳定 | 🆕 A1.5 新增 PE-TTM 77.96倍(3年分位77.59%,asOf:2026-06-21) | ✅ P5 broker验证:中邮证券 2026-05-06 测算78.5倍(+0.7%)',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 28 层 AI 服务器板+机器人 PCB' },
    { rank:10, name:'奥士康', code:'002913', barrier:'中', tier:'primary', valAsOf:'2026-04-26', src:'2026Q1/2025年报', trend:'up', trendNote:'向高端HDI/多层切换', note:'通过供应体系向英伟达供货·AI暴露弱 | 🆕 A1.5 新增 PE-TTM 104.30倍(3年分位103.87%,asOf:2026-06-21) | ✅ P5 broker验证:财信证券 2026-05-06 测算103.9倍(-0.4%)',
      dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      dims6Note:'🟢 向高端 HDI/多层切换，AI 暴露弱' }
  ]
};

// PCB Midstream stocks
CHAINS.pcb.fourQuestions = {
  segments: [
    {
      name: '覆铜板（CCL）',
      stocks: [



        { name:'南亚新材', code:'603519', q1:false, q1note:'刚性CCL全球前10·大陆第三(Prismark 2023);M9仍测试中,非供给寡头(CR3为建滔、生益、台光电)', q2:true, q2note:'高端M6-M8 CCL供不应求,AI服务器PCB需求爆发导致行业约20%-25%产能缺口', q3:true, q3note:'M8-M9级别高速材料国内仅南亚新材与台光电、松下竞争,国产替代空间大', q4:true, q4note:'M6-M8已批量供应国内头部AI客户(如浪潮、Intel/AMD等),M9进入NPI导入阶段,深度绑定英伟达与华为两大AI算力生态', hits:3, strength:'★★☆' },
        { name:'金安国纪', code:'002636', q1:false, q1note:'内资覆铜板第二大巨头,全球市占率不足5%,远低于建滔、生益等头部企业', q2:true, q2note:'高端高频高速新产线稳步落地,传统产线持续满产,高端覆铜板行业供需缺口约30-35%', q3:false, q3note:'中端CCL全球替代品充足,高端产品仍面临日系企业竞争', q4:true, q4note:'通过英伟达Gamma认证,产品适配AI服务器PCB,但非英伟达核心供应商', hits:2, strength:'★☆☆' },
        { name:'生益科技', code:'600183', q1:true, q1note:'全球高端覆铜板CR3：台光电、松下、生益科技,全球市占30%+,背板专用料市占70%-80%;大陆唯一通过英伟达M9级认证的CCL厂商(P9 v1 豆包核实:华泰证券深度报告)', q2:true, q2note:'高端CCL产能建设周期18-24个月,设备瓶颈(德国多尼尔织机),订单排至2027年,行业3-5月连续三次涨价,供不应求格局明确', q3:true, q3note:'M9级CCL全球仅3家稳定量产(台光电、松下、生益科技),国内唯一;M8-M9级别高速材料国内仅南亚新材与台光电、松下竞争,国产替代空间大', q4:true, q4note:'国内唯一全覆盖M7/M8/M9/M10英伟达认证内资厂商,适配GB300、新一代AI服务器,直接供货英伟达,深度绑定AI服务器供应链', hits:4, strength:'★★★' },
        { name:'华正新材', code:'603186', q1:false, q1note:'CCL领域市占率不足5%,非供给寡头;但CBF膜国内唯一落地验证的ABF膜国产替代方案,国内市占70%+份额', q2:true, q2note:'高端板材(HVLP)、mSAP工艺良率仅50%–55%,设备排产超1年、扩产周期2–3年;CBF膜产能供不应求,已批量供货华为昇腾体系', q3:true, q3note:'CBF复合积层膜作为ABF膜的唯一国产替代方案,绕开专利壁垒、性能对标正统ABF,国内唯一落地验证的国产替代方案', q4:true, q4note:'国内唯一通过华为昇腾认证的CBF膜供应商,深度绑定华为昇腾910C芯片供应链,是华为昇腾系列、麒麟系列芯片的核心材料供应商', hits:3, strength:'★★☆' },
              ]
    },
    {
      name: '电子树脂（碳氢树脂）',
      stocks: [
        { name:'东材科技', code:'601208', q1:true, q1note:'BMI双马树脂全球仅杜邦、三菱、东材3家可量产,国内市占>95%;碳氢树脂国内市占70%-80%(P6 v1 豆包核实:中信证券深度报告)', q2:true, q2note:'高端树脂产能位居国内首位,BMI产能3700吨/年,占国内总产能92%以上,多个核心料号实现大客户独供', q3:true, q3note:'M9碳氢树脂国内唯一、全球仅两家通过英伟达全链路认证的厂商(对标日本JX化学),国产替代空间巨大', q4:true, q4note:'国内唯一进入英伟达高速树脂供应链企业,通过生益科技、台光电子等全球一线覆铜板厂商完成交付,下游覆盖英伟达、华为、英特尔算力生态', hits:4, strength:'★★★' },
        { name:'圣泉集团', code:'605589', q1:true, q1note:'国内唯一实现电子级PPO规模化量产的企业,国内市占率约70%,全球仅SABIC、旭化成、三菱瓦斯、圣泉4家能量产(P6 v1 豆包核实:招商证券+华泰证券双broker)', q2:true, q2note:'现有1500吨/年产能供不应求,海外三大供应商合计电子级PPO产能仅约3000吨,且SABIC近期面临产能受限和天然气问题停产影响', q3:true, q3note:'电子级PPO扩产周期普遍长达30个月以上,供应链验证需要1到2年,国内暂无其他可替代企业', q4:true, q4note:'产品已经通过生益科技、台光电子等头部覆铜板大厂验证,顺利导入英伟达AI服务器供应链', hits:4, strength:'★★★' },
        { name:'世名科技', code:'300522', q1:false, q1note:'高端碳氢树脂全球日本出光/三井垄断90%,世名科技国内市占率不足5%,非供给寡头(P6 v1 豆包核实)', q2:true, q2note:'现有产能500吨,2026年扩至2500吨,全球碳氢树脂缺口5000吨/年,产品供不应求', q3:false, q3note:'高端碳氢树脂海外供应商众多,国内还有东材科技等企业布局,替代来源充足', q4:true, q4note:'M6/M7/M8电子级碳氢树脂适配78-100层高端AI服务器PCB,直接供货生益科技、台光电子等CCL龙头,2025年Q4供货NV', hits:2, strength:'★☆☆' },
        { name:'宏昌电子', code:'603002', q1:false, q1note:'电子级环氧树脂全球市占率不足10%,国内与南亚新材等企业竞争,非供给寡头(P6 v1 豆包核实:中信证券深度报告)', q2:true, q2note:'全球高端电子环氧树脂的产能缺口约在30-35%,排单要4到8周,珠海三大募投产线全部完成投产,进入产能爬坡阶段', q3:false, q3note:'电子环氧树脂供应商众多,高端产品仍有日本住友、三菱等替代来源', q4:true, q4note:'GA-886等高频树脂批量供货AI服务器PCB,通过Intel、AMD、英伟达、华为认证;M7/M8高速覆铜板2026Q3满产,直接配套浪潮、富士康等服务器PCB龙头', hits:2, strength:'★☆☆' },
        { name:'彤程新材', code:'603650', q1:true, q1note:'KrF光刻胶国内市占率超40%,显示面板光刻胶本土市占率约30%,国内半导体光刻胶领域龙头企业(P6 v1 豆包核实:东方财富证券深度报告)', q2:true, q2note:'上海金山1.1万吨光刻胶项目一期已投产,二期预计2026年投产,半导体光刻胶国产化率低,需求旺盛', q3:false, q3note:'全球高端半导体光刻胶市场份额主要被日本和美国企业占据,替代来源充足', q4:false, q4note:'半导体光刻胶核心客户包括中芯国际、长江存储等国内头部晶圆厂,未直接绑定英伟达/AMD/华为等AI芯片厂商', hits:2, strength:'★☆☆' }
      ]
    },
    {
      name: '玻纤布/Q布',
      stocks: [
        { name:'菲利华', code:'300395', q1:true, q1note:'全球仅3家', q2:true, q2note:'扩产12个月+', q3:true, q3note:'无替代材料', q4:true, q4note:'台光锁定订单', hits:4, strength:'★★★' },
        { name:'宏和科技', code:'603256', q1:true, q1note:'全球≤12μm极薄布市占约50%,高端超薄布大陆唯一量产4μm极薄电子布厂商,打破日系垄断(P6 v1 豆包核实:招商证券深度报告)', q2:true, q2note:'高端电子布持续供不应求,全球高端织造设备交付周期极长,订单已排到2029年,新购置织布机从下订到交付平均需要一年以上', q3:true, q3note:'大陆唯一具备T布量产能力的厂商,全球能稳定量产合格特种电子布的厂商数量极少,过去这块市场长期被日本日东纺垄断', q4:true, q4note:'直接供货英伟达、台积电、苹果、谷歌,全球头部CPU、GPU及PCB客户跳过中间商,直接与宏和科技签署了产能供应协议', hits:4, strength:'★★★' },
        { name:'中材科技', code:'002080', q1:true, q1note:'国内唯一覆盖一代二代LowCTE布和Q布的全能选手,全球第二家具备规模化生产T布能力的厂商(仅次于日东纺),Q布占特种纤维布约20-30%(P6 v1 豆包核实:华泰证券深度报告)', q2:true, q2note:'AI用特种纤维布目前处于缺货状态,预计2026年需求旺盛,2026年特种电子布规划产能3500万米,9400万米高端电子布扩产项目推进中', q3:true, q3note:'LowCTE布和Q布技术壁垒高,国内仅有中材科技等少数企业掌握,替代来源有限', q4:true, q4note:'产品已通过英伟达、台积电、深南电路、沪电股份等全球头部客户认证,并实现批量供货,市占率约20%', hits:4, strength:'★★★' },
        { name:'中国巨石', code:'600176', q1:false, q1note:'', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:0, strength:null },
        { name:'山东玻纤', code:'605006', q1:false, q1note:'全球玻纤行业寡头竞争格局中,山东玻纤与中国巨石、泰山玻纤(中材科技旗下)等并列为全球六大玻纤生产企业,六家年产能合计占全球总产能约70%,但电子布领域市占率低(P6 v1 豆包核实:东方证券深度报告)', q2:true, q2note:'17万吨ECER电子细纱产能,产能利用率100%,排产周期超2个月,AI产业链需求景气驱动电子布量价齐升', q3:false, q3note:'常规电子纱和电子布替代品充足,高端产品技术壁垒低于中材科技、宏和科技等龙头', q4:false, q4note:'主打常规消费电子、工控配套品类,逐步向覆铜板厂商供货,未绑定头部AI客户', hits:1, strength:'☆☆☆' }
      ]
    },
    {
      name: '铜箔（HVLP4）',
      stocks: [

        { name:'铜冠铜箔', code:'301217', q1:true, q1note:'国内唯一、全球第三实现HVLP1-4代全谱系量产的企业(良率85%+),内资市占25%+、全球第二;RTF高频铜箔内资产销规模第一(P6 v1 豆包核实:华泰证券+招商证券双broker)', q2:true, q2note:'2026年底HVLP4月需求1849吨,主要供应商月有效供给仅1424吨,缺口约23%;2027年缺口扩大至30%,核心设备依赖日本进口,交期排至2027年', q3:true, q3note:'HVLP铜箔核心工艺及后处理设备依赖日本进口,扩产周期长达12-18个月,客户认证周期1-2年,新产能落地极慢,全球HVLP铜箔缺口约50%', q4:true, q4note:'专供生益、南亚、台光、台耀等全球头部CCL,深度切入英伟达AI服务器供应链,2027年HVLP铜箔市占率目标40%', hits:4, strength:'★★★' },
        { name:'德福科技', code:'301511', q1:false, q1note:'全球铜箔企业产能规模前列,但HVLP铜箔领域市占率低于铜冠铜箔和日本三井金属,非供给寡头(P6 v1 豆包核实:中信证券深度报告)', q2:true, q2note:'电子铜箔总产能3.5万吨/年,HVLP1-3批量出货,HVLP4送样头部覆铜板企业认证,预计2026年底量产,高端铜箔供需持续紧缺', q3:false, q3note:'HVLP铜箔领域有铜冠铜箔、日本三井金属等替代来源,技术壁垒低于行业龙头', q4:true, q4note:'合作深南电路、生益科技、胜宏科技等一线板材厂商,间接进入英伟达供应链,31亿扩产5万吨高端AI铜箔', hits:2, strength:'★☆☆' },
        { name:'中一科技', code:'688234', q1:true, q1note:'6μm超薄铜箔全球市占率第一,2025年出货占比达65%,良率98.5%,单万吨产能投资比同行低15%(P6 v1 豆包核实:东北证券深度报告)', q2:true, q2note:'已建成4条AI智能芯片铜箔生产线,年产能1万吨,订单饱满,2025年产能利用率126.85%', q3:false, q3note:'HVLP铜箔领域有铜冠铜箔、德福科技等替代来源,6μm铜箔虽全球市占率第一,但仍有其他厂商生产', q4:true, q4note:'高频高速铜箔已成功应用于AI服务器,产品性能获头部客户认可,通过生益电子、方正科技等PCB大厂间接供AI服务器、高端显卡', hits:3, strength:'★★☆' },
        { name:'嘉元科技', code:'688388', q1:false, q1note:'HVLP铜箔领域市占率低于铜冠铜箔和日本三井金属,非供给寡头;但全球极薄锂电铜箔龙头,4.5μm极薄铜箔技术全球领先,市占率达50%(P9 v1 豆包核实)', q2:true, q2note:'HVLP铜箔2026年底需求1849吨,主要供应商月有效供给仅1424吨,缺口约23%;龙南3.5万吨高端电子铜箔2026年底全部达产,订单饱满', q3:false, q3note:'HVLP铜箔领域有铜冠铜箔、日本三井金属、德福科技等替代来源,技术壁垒低于行业龙头', q4:true, q4note:'HVLP1-3代已批量供货,HVLP4代送样测试,产品适配AI服务器PCB,通过生益科技、台光电子等头部CCL厂商间接进入英伟达供应链', hits:2, strength:'★☆☆' },
      ]
    },
    {
      // ★ X2 新增:IC 载板段位 — 从 R3-10 错位的 CCL 段迁入 (深南/兴森/联瑞)
      // 603186 华正在 segments[0] + segments[4] 双位置, 但 fourQuestions 仅放 seg1(CCL)以避免重复
      // 603936 博敏 PE 失真保留不在 fourQ (符合 §6.8 红线)
      name: 'IC封装基板（ABF载板）',
      stocks: [
        { name:'深南电路', code:'002916', q1:true, q1note:'内资PCB龙头及最大封装基板供应商,mSAP领域行业份额领先,800G/1.6T高速光模块PCB市场份额超过30%,全球顶级算力PCB核心供应商(P9 v1 豆包核实:招商证券深度报告)', q2:true, q2note:'高端AI服务器/交换机高多层板产能供不应求,客户出现提前锁定6-12个月产能的抢单行为,扩产周期长达18-24个月,供需持续错配', q3:true, q3note:'高端算力PCB认证周期长达一两年,一旦进入头部厂商供应链,合作周期能维持数年,同行很难中途替代;掌握30层以上超高阶背板、mSAP超薄线路工艺,技术壁垒高', q4:true, q4note:'全面打入全球顶级算力厂商供应链,是AMD的核心PCB供应商,并覆盖英伟达、谷歌、Meta等海外巨头,同时也是华为昇腾、中兴等国产算力龙头的核心供应商', hits:4, strength:'★★★' },
        { name:'兴森科技', code:'002436', q1:false, q1note:'全球高端FCBGA(AI GPU基板)75%市场被日本Ibiden、台湾欣兴/南电/景硕垄断,大陆国产化率不足5%;兴森是国内唯一量产ABF/FCBGA的内资企业,但市占率仍低(P9 v1 豆包核实→R3-11 豆包反核实:摩根士丹利 2026-05-22 + 招商证券 2026-06-05 双 broker 源确认)', q2:true, q2note:'ABF载板供需缺口2026–2028年持续扩大:2026下半年缺10%、2027缺21%、2028缺42%;ABF载板每季度涨价5–10%,广州基地一期已于2026年一季度正式量产,月产能3.6万片', q3:true, q3note:'内资唯一双载板量产平台:BT存储载板+ABF FCBGA算力载板双路线打通,国内同业难以复制,是国内稀缺的兼具BT与ABF/FCBGA封装基板产能的龙头企业', q4:true, q4note:'深度绑定华为昇腾AI芯片封装基板供应链,作为核心供应商份额预计占60%到70%左右,昇腾系列放量的订单确定性强', hits:3, strength:'★★☆' },
        { name:'联瑞新材', code:'688300', q1:true, q1note:'HBM用Low-α球硅国内唯一量产企业,全球市占15%-20%、位列全球第二;M9基板用化学法球形硅微粉全球仅2家日企+联瑞具备量产能力,国内市占28%-31%(P9 v1 豆包核实:西南证券深度报告)', q2:true, q2note:'高端液相合成工艺研发、产线调试、提纯工艺壁垒极高,新进入者从研发到量产周期18～24个月,短期无法新增有效产能;在建3600吨M8/M9高速基板专用超纯球形硅微粉产能,2026年下半年逐步释放', q3:true, q3note:'HBM封装用Low-α超低放射性球形硅微粉全球仅日本雅都玛(80%份额)和联瑞新材两家量产,国内唯一实现量产的企业,替代来源极少', q4:true, q4note:'产品间接覆盖全球约30%的HBM封装需求,核心供货住友电木、华海诚科等头部封装厂商,通过封装厂商间接进入英伟达、AMD等AI芯片供应链', hits:4, strength:'★★★' },
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
        { name:'沪电股份', code:'002463', position:'AI 服务器 PCB 双龙头·78 层 M9 已通过英伟达认证并量产', barrier:'高', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'up', trendNote:'Q1净利+62.9%·AI营收占比~60%' },
        { name:'胜宏科技', code:'300476', position:'英伟达 GB300 PCB 主供·显卡 PCB 全球~50%', barrier:'高', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'up', trendNote:'Q1净利+40%·A股PCB营收首位' },
        { name:'景旺电子', code:'603228', position:'PCB 老牌·汽车+消费双轮·全球 PCB 第 9', barrier:'中', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'flat', trendNote:'Q1净利-28.37%·原材料涨价拖累' },
        { name:'东山精密', code:'002384', position:'FPC+结构件·苹果链核心·索尔思光模块并表', barrier:'中', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'up', trendNote:'Q1净利+143%·含光模块并表' },
        { name:'鹏鼎控股', code:'002938', position:'全球 PCB 营收 9 连冠·苹果软板核心', barrier:'高', q1:false, q1note:'制造段100+家可换', q2:false, q2note:'', q3:false, q3note:'客户可切换', q4:false, q4note:'', hits:0, strength:null, trend:'down', trendNote:'Q1净利-5.21%·消费占比~70%' },
        { name:'世运电路', code:'603920', q1:false, q1note:'汽车PCB全球份额2%-3%,AI算力PCB处于订单导入和产能爬坡阶段,非供给寡头(P6 v1 豆包核实:招商证券深度报告)', q2:true, q2note:'当前成本端价格已连续传导两次,主业订单快速增长,产能已供不应求,泰国高端PCB工业园已于2026年一季度试投产', q3:false, q3note:'PCB行业竞争激烈,高端AI服务器PCB有鹏鼎控股、深南电路等众多替代来源', q4:true, q4note:'A股唯一公告实锤批量供货Dojo超算24-28层高多层特种PCB的上市企业,通过OEM方式进入NVIDIA、AMD、Google等供应体系', hits:2, strength:'★☆☆' },
        { name:'奥士康', code:'002913', q1:false, q1note:'高端PCB领域市占率不足5%,与鹏鼎控股、深南电路等头部企业有较大差距,非供给寡头(P6 v1 豆包核实:华泰证券深度报告)', q2:true, q2note:'高端PCB出现明显"供不应求"局面,行业呈现"低端内卷、高端短缺"格局,公司14亿可转债落地后推进高端PCB扩产', q3:false, q3note:'高端PCB领域有众多替代来源,技术壁垒低于行业龙头', q4:true, q4note:'掌握28层以上AI服务器高多层板核心工艺,切入英伟达、AMD、特斯拉等全球顶级供应链,产品适配AI服务器、数据中心交换机、GPU配套主板', hits:2, strength:'★☆☆' },
        { name:'广合科技', code:'001389', position:'AI服务器PCB纯度最高·算力PCB国内第一', barrier:'高', q1:false, q1note:'全球算力服务器PCB市场份额4.9%,国内第一,但与鹏鼎控股、深南电路等头部企业有较大差距,非供给寡头(P9 v1 豆包核实)', q2:true, q2note:'高端算力PCB供需缺口扩大至40%,广合科技算力PCB产能已近乎全部预售至2027年Q2,部分客户为保障供应愿意支付10-15%溢价,平均售价(ASP)同比+15%,环比+8%', q3:false, q3note:'AI服务器PCB领域有鹏鼎控股、深南电路、沪电股份等众多替代来源,技术壁垒低于行业龙头', q4:true, q4note:'服务范围覆盖全球前10大服务器制造商中的8家,包括英伟达、浪潮、华为、广达、英业达、Meta、谷歌,境外收入≈66%,深度绑定全球头部AI客户', hits:2, strength:'★☆☆', trend:'up', trendNote:'AI服务器PCB订单饱满·算力赛道头部供应商' },
        { name:'生益电子', code:'688183', position:'AI服务器PCB黑马·生益科技子公司', barrier:'高', q1:false, q1note:'AI服务器PCB领域市占率约3.2%(位列全球第35位),与鹏鼎控股、深南电路等头部企业有较大差距,非供给寡头(P9 v1 豆包核实→R3-11 豆包反核实:申万宏源 2025-12-30 + 招商证券 2026-05-04 + Prismark 2025-03 三源确认)', q2:true, q2note:'高端PCB出现明显‘供不应求’局面,行业呈现‘低端内卷、高端短缺’格局,AI服务器PCB交期拉长,客户加价锁单,生益电子AI服务器订单同比+242%', q3:true, q3note:'依托母公司生益科技,打造出独一无二的材料+PCB一体化闭环优势,从上游高端覆铜板原材料到下游AI算力PCB成品,全程自主可控技术壁垒,供应链壁垒直接拉满,国内极少数通过英伟达M9高端覆铜板认证的核心厂商', q4:true, q4note:'深度绑定英伟达全产业链,第一大客户AWS占营收42.9%,是其PCB主力供应商,占采购量>50%;谷歌TPU V6/V7/V8认证通过,2026年份额目标20%', hits:3, strength:'★★☆', trend:'up', trendNote:'AI服务器PCB订单饱满·算力赛道头部供应商' }
      ]
    },
    {
      name: 'PCB设备',
      stocks: [

        { name:'鼎泰高科', code:'301377', q1:true, q1note:'全球第一', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:1, strength:null },
        { name:'大族数控', code:'301200', q1:false, q1note:'', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:0, strength:null },
        { name:'芯碁微装', code:'688630', q1:true, q1note:'PCB直接成像设备全球市占率:2025年18.8%,2024年15%,均位列全球第一,领先第二名3.1个百分点;国内市占52%,全球唯一商业化产品覆盖PCB、IC载板、先进封装的LDI设备厂商(P9 v1 豆包核实→R3-11 豆包反核实:灼识咨询港股招股书 2026-06-10 + 国金证券 2026-01-22 + 长江证券 2026-03-19 三源确认)', q2:true, q2note:'AI服务器PCB价值是普通的3–5倍,且全部要用mSAP/高阶HDI,正好是芯碁MAS6P系列的强项;订单超预期,2026年一季度净利润同比增幅高达108.98%', q3:false, q3note:'PCB光刻设备领域仍有日本ORC、富士、以色列奥宝等海外厂商竞争,替代来源充足,芯碁微装主要依靠本土化运维优势(30分钟线上响应、2小时现场上门服务)进行替代', q4:true, q4note:'客户覆盖了鹏鼎控股、沪电股份、深南电路等全球前100强PCB企业,服务客户超过600家;WLP系列设备通过台积电类CoWoS-L验证,助力头部厂商实现量产,间接进入英伟达、AMD等AI芯片供应链', hits:3, strength:'★★☆' },
        { name:'东威科技', code:'688700', q1:true, q1note:'PCB电镀设备国内整体市场份额超过50%,移载式VCP设备全球少数能做的玩家,国内唯一;在高端PCB电镀设备领域是独供,竞争格局非常好(P9 v1 豆包核实:中信建投证券深度报告)', q2:true, q2note:'英伟达GB200、Rubin新一代服务器PCB层数提升至30-78层,全面普及mSAP精细线路工艺,单机PCB价值大幅提升233%,且该工艺仅适配东威量产的移载式VCP、脉冲VCP设备,订单金额再创历史新高', q3:true, q3note:'移载式VCP专门做IC载板(ABF载板),线宽/线距要求≤8μm,是AI芯片、GPU封装的核心制程,过去长期被日韩垄断,东威是国内唯一、全球少数能做的玩家', q4:true, q4note:'下游客户已覆盖大多数国内一线PCB制造厂商,包括深南电路、沪电股份、鹏鼎控股等AI服务器PCB龙头,通过PCB厂商间接进入英伟达、AMD、华为等AI算力供应链', hits:4, strength:'★★★' },
        { name:'金洲精工', code:'002443', q1:true, q1note:'全球PCB微钻市占21%+,全球第二大微钻厂商;高端AI算力细分垄断:30倍以上超高长径比钻针市占70%~80%,0.01mm及以下规格上具有绝对领先优势,市占率高达70%-80%(P9 v1 豆包核实→R3-11 豆包反核实:中钨高新年报 2026-04-28 + 东方证券 2026-05-13 双 broker 源确认);50倍长径比已具备量产能力', q2:true, q2note:'订单激增:2025年金洲公司净利润同比增长105%,达3.6亿元,净利率提升至25.4%;2026年同步扩产1.3亿支通用微钻,产能严重不足,订单饱满', q3:true, q3note:'目前全球仅有金洲精工、鼎泰高科等少数企业能生产高端微钻,在M9材料适配的新型纳米金刚石涂层微钻领域具有技术领先优势,替代来源极少', q4:true, q4note:'覆盖全球前20 PCB厂商中的19家,包括健鼎科技、深南电路、沪电股份等全部AI服务器PCB龙头,绑定英伟达、AMD、谷歌算力供应链,是英伟达链M9高端板材核心供应商', hits:4, strength:'★★★' },
      ]
    },
  ]
};

// PCB Choke Points
CHAINS.pcb.chokePoints = [
  { rank:1, name:'东材科技', code:'601208', segment:'M9碳氢树脂', strength:'★★★', logic:'全球<strong>仅2家</strong>通过英伟达M9碳氢树脂认证。台光独供2-3年排他协议。眉山3500吨<strong>2026年6月30日投料试产（提前至Q2末）</strong>。Q1净利1.87亿+103%，高速树脂+131%。2026年全球缺口<strong>~5000吨（63%）</strong>。M10树脂已进入客户验证。', tags:['双寡头','无替代','缺口63%','Q1净利+103%'],
    valuation: {pe:'PE 2025~120x(+360%)',peAbsolute:'PE(2025A)~120x(+360%) · 历史极高位(材料板块~93% 分位)·亿牛网 TTM 270.8x 口径差异大、待核',pePercentile:93,grossMargin:'50%+',fromHigh:'(2026-06-21 数据·相对前高位置未独立核实)',asOf:'2026-06-21',note:'🟢 **PE 估值**：PE(2025A)~120x、同比 +360%、历史极高位(材料板块 ~93% 分位·broker 口径);**亿牛网 TTM 270.8x 口径差异大、待核**, 不作硬值陈述。**early-stage forward PE 显著低于历史高 TTM**(眉山 3500 吨 2026.6.30 投料试产 + 早期摊销压低 2025 基数); 眉山 3500 吨 + Q1 净利+103% 卡口逻辑已充分定价, 谨防高位接盘; 建议 2026 H2 投产后用 forward PE + PB 交叉验证。\\n\\n⚠️ **治理风险(必读)**：实控人、副董事长**熊海涛 2026-01 被四川省监察委留置、立案调查**(公司公告·tier=primary)。M9 树脂业务壁垒不变, 但实控人被查是重大治理风险、须可见, 不改 barrier 但作风险提示\\n\\n⚠️ **R3-13 akshare 拉取 (asOf 2026-06-21)**：当前 PE-TTM 160.06x (akshare 自动计算口径)。**口径不同**: 当前 broker 用 PE(2025A)~120x (broker 测算口径, 基于 2025 年报 PE), akshare 用 PE-TTM (akshare 自动计算口径, 基于 TTM 净利润). 两者统计基础不同。**93% 分位是 broker PE(2025A) 历史分位**, 不能直接对比 akshare PE-TTM 160.06x。**纯粹过时待补**: broker PE(2025A) 最新分位数据需用户网页端补, akshare PE-TTM 数据仅作参考, 不替换原 broker 分位',tier:'broker',src:'投资网+亿牛网 2026-06(PE 2025A 120x 历史分位) + 公司公告 2026-01(熊海涛留置) · PE 2025A 为 broker, 治理风险为 primary'},
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
  { rank:2, name:'菲利华', code:'300395', segment:'Q布/石英纤维布', strength:'★★★', logic:'<strong><mark class="updated">Q布业务处认证阶段，2025年收入9,837.37万元（占总营收4.88%），市占率数据未披露（v3 豆包联网核实：cninfo 2025年报 + 2026-05-26 投资者关系活动 + 国海证券研报）</mark></strong>。国内唯一全产业链自主。已通过英伟达全链路认证。台光锁定500-700万米。Q布价格~260-300元/米（普通布8x）。全球缺口<strong>>40%</strong>。Q1营收6.22亿+53%。', tags:['≥55%绝对龙头','无替代','缺口>40%','毛利55-65%'],
    valuation: {pe:'PE(TTM)~166x / 99.9%',peAbsolute:'PE(TTM)~166x · 99.9% 历史分位 · 2026-02 创历史新高、市值超 650 亿',pePercentile:99.9,grossMargin:'55%+',fromHigh:'(2026-06-21 数据·相对前高位置未独立核实)',asOf:'2026-06-21',note:'🟢 **PE 估值**：PE(TTM)~166x、99.9% 历史分位(2026-02 创历史新高、市值超 650 亿·broker 口径); 2026-04-23 139x → 2026-06-12 166.11x **6 周内 +19.5%**; 菲利华无显著早期放量摊销, **TTM 可作硬依据**; Q 布全球 ≥55% 市占 + 全系列认证落地逻辑已充分定价, 建议等分位回踩或改用 PEG/Q 布出货量增速交叉。\\n\\n⚠️ **Q 布占营收仅 ~5%、仍处小批量测试+终端认证阶段**(公司公告 2026-02·tier=primary)→ 卡口为**"未来弹性"、非当前业绩**;订单存重大不确定性;进一步印证此前"Q 布 80%" 已降级判断(80% 仅自媒体口径, 现以 ≥55% 券商口径为准);**多名股东(含实控人邓家贵/吴学民)拟减持**(公告), 治理面叠加风险\\n\\n⚠️ **R3-13 akshare 拉取 (asOf 2026-06-21)**：当前 PE-TTM 121.60x (akshare 自动计算口径, 与 broker 同基础)。**纯粹过时待补**: broker PE-TTM 99.9% 历史分位为 2026-06-12 数据, 当前 akshare PE-TTM 121.60x (9 天内 -27%)。broker 最新分位数据需用户网页端补, akshare PE-TTM 数据仅作参考, 不替换原 broker 分位',tier:'broker',src:'投资网+亿牛网 2026-06(PE 166x 历史分位) + 公司公告 2026-02(Q布占营收5%) + 公司公告(股东减持)'},
    verification: {
      items: [
        { type:'供给寡头', claim:'Q布业务处认证阶段，市占率数据未披露', howToCheck:'搜菲利华/圣戈班/迈图(海外)的Q布产能公告与投资者问答，看菲利华市占率是否仍维持≥55%且快速提升（券商共识）', falsifySignal:'市占率快速下滑 / 海外新进入者宣布Q布量产 → 卡口降级', status:'pending' },
        { type:'产能缺口', claim:'全球缺口>40%、价格~普通布8x', howToCheck:'查菲利华Q布年度出货量、英伟达AI服务器Q布需求测算、台光锁单公告，交叉验证供需差', falsifySignal:'缺口快速收窄 / Q布价格回落至普通布3-4x以内 → 定价权逻辑塌', status:'pending' },
        { type:'财报印证', claim:'Q1营收6.22亿+53%、毛利55-65%', howToCheck:'查菲利华最新季报：分产品营收增速、Q布毛利率是否稳定在55%+。毛利率是定价权最难造假的证据', falsifySignal:'毛利率跌到40%以下 / 营收不增 → 卡口大概率为假', status:'pending' },
        { type:'交叉信源', claim:'至少两个独立来源印证全球≥55%市占（80% 仅自媒体口径不予采信）', howToCheck:'一篇券商深度研报 + 公司年报/调研纪要 + 行业第三方数据（Prismark/CPCA）同时印证', falsifySignal:'只找得到单一来源(尤其只有自媒体) → 存疑', status:'pending' }
      ],
      note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
    } },
  { rank:3, name:'铜冠铜箔', code:'301217', segment:'HVLP4铜箔', strength:'★★★', logic:'国内<strong>唯一</strong>HVLP1-4全系列量产。<strong><mark class="updated">锁定关键阴极辊设备(具体厂商/型号/全球份额数字待核)</mark></strong>。日韩台企业现仍占据高端铜箔市场90%+(2024年口径)·国产替代目标2027年内资合计占全球HVLP产能30%(行业目标,非铜冠单独数字)。阴极辊设备交期18-24月。2026年底全球月缺口<strong>~23%</strong>。', tags:['国产唯一','设备锁定全球70%','缺口23%','已量产'],
    valuation: {pe:'不适用(数据不足)',peAbsolute:'PE-TTM 失真(利润近零所致)、不作估值硬依据',pePercentile:null,grossMargin:'18%+',fromHigh:'(2026-06-21 数据·相对前高位置未独立核实)',asOf:'2026-06-21',note:'🟢 **PE-TTM 失真(利润近零所致)、不作估值硬依据**; 应以**盈利拐点 / 产能爬坡 / HVLP4 认证进度**看待(estimate·tier)。亿牛网显示 ~10698x / 分位 -1; 2022-01 上市 < 5y 不构成 5y 分位(前 AI 初判 22x/18% 系"PE 22"假设, **不成立**)。建议改用 PB(~13.3x) / PS(~11.6x) 上市以来分位代替(待用户从网页 Claude 端补 PB/PS 分位)。卡口逻辑(M9 HVLP4 设备锁定 + 缺口 23%)不受估值口径影响\\n\\n⚠️ **R3-13 akshare 拉取 (asOf 2026-06-21)**：当前 PE-TTM 981.10x (TTM 净利润仅 1.69 亿, 利润过小所致)。**维持失真判断**: null 分位保留, 失真本质未变 (PE-TTM >100x 仍属失真)。**待补**: 建议改用 PB/PS 上市以来分位代替 PE-TTM, 需用户网页端补',tier:'estimate',src:'亿牛网 301217 PE页 https://eniu.com/gu/sz301217/pe_ttm · media 单源 + 上市<5y/盈利失真 · 建议改 PB/PS'},
    verification: {
      items: [
        { type:'供给寡头', claim:'锁定关键阴极辊设备(具体厂商/型号/全球份额数字待核)', howToCheck:'查阴极辊厂商出货清单(原"三船MSP-8000/70%全球"未找到对应来源,可能存在厂商名称/型号混淆;另有"日本JCU垄断"和"泰金新能国产替代45%"等不同表述体系),需厘清真实设备厂商与份额', falsifySignal:'设备锁定被打破 / 国产新进入者锁定海外新设备 → 设备垄断逻辑塌', status:'pending' },
        { type:'产能缺口', claim:'2026年底全球月缺口~23%、日韩台企业高端铜箔占90%+', howToCheck:'查铜冠HVLP4月产能、英伟达Rubin/Blackwell HVLP铜箔需求测算、日韩台厂商扩产公告，交叉验证供需差', falsifySignal:'日韩台厂商快速扩产 / 缺口率快速收窄 → 卡口降级', status:'pending' },
        { type:'财报印证', claim:'HVLP1-4全系列量产、行业目标2027内资合计占全球HVLP产能30%', howToCheck:'查铜冠最新季报：HVLP4出货量爬坡进度、毛利率水平。HVLP4毛利率应显著高于普通铜箔(15-20%)', falsifySignal:'HVLP4毛利率平庸 / 出货量爬坡不达预期 → 卡口大概率为假', status:'pending' },
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
