// data/liquid-cooling.js  —— 升级 X · 新增链（场景 B）：液冷产业链骨架
// 由 index.html 顶部 manifest 同步加载；window.CHAINS 由本文件首次注入。
//
// 2026-06-15 骨架首版 + 二轮注入（CLAUDE.md 数据治理规则·不造数铁律）：
//   骨架版：环节拆解 + 上市公司名单
//   二轮注入：prosperity.dims[6] AI 主观打分 + verdict AI 主观 + 21 只个股 barrier 档
//            + 3 个卡口 + 2 个缺口；**所有"硬数据"（财报/PE/市占/缺口率/估值）全留"待核"**。
//
// Gemini 端（2026-06-15）自查暴露 30+ 项硬数据无源，CC 守门决定：
//   - score 1-5（六维分本身属 estimate 🆪）→ 保留 Gemini 主观打分
//   - evidence / dims6Note / valuation 全部标"待核" → 保留,绝不编造
//   - 维谛技术 300590 标的错误（300590=移为通信,维谛=NYSE:VRT）→ 移除
//   - segments 数：22→21 只；总 5 段
//
// 等下一轮 Gemini 端联网核实 26Q1 财报/PE/分位/市占/缺口率后，再注第三轮。
//
// 与 PCB 黄金范例（data/pcb.js）的差异：
//   - meta.tier='待核' / meta.status='skeleton' 标记本链为"骨架态"
//   - prosperity.dims[].score 全 null（不参与擂台主排名 —— 详见 computeFit gate）
//   - segments[].stocks[].barrier='—'（避免无数据时门控失效）
//   - chokePoints/fourQuestions/supplyGap 全空数组（等 Gemini 端出卡口候选+缺口再注入）
//   - treeMap sub-card 的 position/barrier/note 全 "—"（避免被当作硬数据渲染）

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== 液冷 ====================
CHAINS['liquid-cooling'] = {
  id: 'liquid-cooling', name: '液冷', icon: '❄️',
  // ★ 升级九 STEP 2：赛道级 meta —— 骨架态标记
  // ★ 升级九 STEP 2+ 复查(2026-06-15):meta.status 不再标 'active'(完整态)
  //   真实状态:结构骨架100%对齐PCB schema + chokePoints/部分dims6已核实,
  //   但 S4b/S4c/S5/S8 数据密度未达PCB标准,详见 .claude/scratch/liquid-cooling-gap-report.md
  meta: { sector:'中游', tier:'待核', status:'结构骨架对齐+数据密度待补(S4b/S4c/S5/S8未达)', updatedAt:'2026-06-15', ltFit:true },
  // ★ 升级九 STEP 2：景气六维 —— 骨架版（6 维 score/trend/reason 全留空，标"待核"）
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:5, trend:'up', reason:'AI 算力功耗激增，Nvidia GB200/GB300 单机柜功耗远超风冷极限，液冷成为刚需。冷板式率先爆发，浸没式蓄势待发。', evidence:'待核（需补充 Nvidia GTC 2026 功耗指引或 IDC 预测；Gemini 端自查时未拿到一手）', flag:'Nvidia 新一代 GPU 功耗及液冷方案标配情况', tier:'estimate', src:'' },
      { key:'visibility', name:'业绩可见度', score:4, trend:'up', reason:'服务器集成商及 CDU 核心部件厂商已开始实质性兑现液冷订单，渗透率处于加速爬坡期。', evidence:'待核（需补充头部厂商如英维克、浪潮信息 26Q1 财报液冷收入占比）', flag:'各大 CSP 及运营商液冷服务器集采中标份额', tier:'estimate', src:'' },
      { key:'policy', name:'政策确定性', score:4, trend:'flat', reason:'国家"东数西算"及多地新规强制要求新建数据中心 PUE 降至 1.2 甚至 1.15 以下，风冷已无法达标。', evidence:'待核（需补充发改委/工信部 2025-2026 最新 PUE 强制标准文件）', flag:'老旧数据中心液冷改造补贴或强制淘汰政策', tier:'estimate', src:'' },
      { key:'supply', name:'供需紧张度', score:4, trend:'up', reason:'受 3M 退出 PFAS 生产影响，高质量氟化液存在供给缺口预期；AI 爆发导致 CDU 及快接头出现阶段性产能吃紧。', evidence:'待核（需补充 3M 产能退出进度及国产替代产能爬坡数据）', flag:'核心部件扩产周期与 AI 服务器出货周期的错配', tier:'estimate', src:'' },
      { key:'valuation', name:'估值性价比', score:null, trend:'flat', reason:'待核——Gemini 端自查未拿到核心标的 PE-TTM 与历史分位数据,留空不填。', evidence:'待核（需获取最新估值数据）', flag:'估值是否已透支未来两年高增预期', tier:'estimate', src:'' },
      { key:'barrier', name:'壁垒安全垫', score:4, trend:'flat', reason:'液冷系统对防漏液要求极高（漏液即造成昂贵算力设备损毁），核心部件（如快接头、CDU、冷却液）认证周期长，存在 know-how 与专利壁垒。', evidence:'待核（需补充海外龙头在快接头/氟化液的专利保护期及国内厂商突破情况）', flag:'整机厂是否倾向于扶持二供拉低毛利率', tier:'estimate', src:'' }
    ],
    verdict: {
      longTermFit:true,
      oneLine:'AI 算力尽头是电力与散热，液冷是从"可选"走向"必选"的高确定性渗透率提升赛道，聚焦卡脖子的核心部件与材料环节。',
      stockHint:'重点关注具有极高认证壁垒的核心部件（快接、CDU）及具备国产替代逻辑的介质（氟化液）寡头。'
    }
  },
  // ★ 升级九 STEP 2+：周期位置 —— 三轮注入（AI 主观 estimate 🆪,4 条 watchSignals）
  cyclePosition: {
    stage: '繁荣',
    label: '渗透率加速爬坡期',
    reason: '受 Nvidia 新一代 GPU 及国内智算中心建设驱动,液冷从"可选"变为"必选"。2026 年是冷板式液冷大面积商用的关键节点。部分部件厂商(英维克、双良节能)26Q1 利润受压,但产业链前端营收扩张趋势明显,景气度处于上行阶段。AI 主观判断,非具体数字。',
    watchSignals: [
      '核心部件厂(英维克、永贵电器等)单季度毛利率能否止跌修复',
      '巨化股份、新宙邦等氟化液新增产能的客户导入进度与订单落地情况',
      '国家对老旧 IDC 强制进行 PUE 降级改造的补贴政策发布',
      '整机厂(浪潮、曙光)对二供(Second Source)的扶持力度引发的价格战风险'
    ]
  },
  // ★ 升级三/四：白话介绍 —— 可填（产业事实，不是"会变的数据"）
  plainIntro: {
    analogy: '液冷 = 数据中心的"中央空调 + 散热血管"',
    paragraphs: [
      '你的手机/笔记本/台式机都靠<strong>风冷</strong>（风扇吹散热）——简单但效率低。数据中心几千张 GPU 同时跑，总功耗动辄几十兆瓦，风冷已经<strong>触顶</strong>（单机柜 30kW+ 散不出去）。',
      '<strong>液冷</strong>用液体（纯水/氟化液/油）直接带走热量，效率是风冷的 <strong>1000-3000 倍</strong>（水的导热系数是空气的 ~25 倍、密度 ~800 倍），单机柜功率上限突破到 50-100kW+。PUE（电力使用效率）从 1.3-1.5（风冷）降到 <strong>1.05-1.15</strong>。',
      '<strong>AI 时代的"刚需"在哪？</strong>单张 H100 GPU 700W，GB200 NVL72 单机柜 72 颗 = 120kW+，直接超风冷极限。英伟达 GB300/Rubin 强制液冷，谷歌/微软/AWS 2024 起新数据中心全液冷部署。<strong>需求拐点已过、供给端刚起步</strong>——这是"卡口"机会的物理基础。'
    ],
    flowSteps: ['氟化液/纯水(冷却介质)','快接/CDU/管路(核心部件)','液冷服务器/机柜(系统集成)','IDC 机房(下游)','风液混合(侧枝)'],
    highlightBox: '<strong>💡 物理卡口 视角：为什么液冷上游材料比"中游服务器"更有"卡口"价值？</strong><br>液冷服务器/机柜全球有 20+ 家集成商，客户随时可换。但上游的<strong>氟化液 3M/科慕曾垄断全球 80%+，2022 年环保压力停产退出后，国产承接方巨化/新宙邦/天赐</strong>——这是 3M 退出的"卡口真空"。<strong>CDU 温控（英维克/维谛）、快接接头（永贵）、管路（川环）、导热材料（中石/思泉/飞荣达）</strong>也是 3-5 家寡头格局，需求必须从这几家过。'
  },
  // ★ 升级一/二：赛道概览 —— 二轮注入（4 项有数据 + 4 项仍待核，tier 全 estimate 🆪 或 media ⚪）
  overview: [
    { label: '🌍 全球液冷市场规模(2026E)', value: '60 亿美元', note: '2026E 全球液冷市场 60 亿美元;预计 2035E 达 271 亿美元(CAGR 18.2%)。来源:Global Market Insights(截至 2026-06)', color: 'var(--blue)', tier:'estimate', src:'https://www.gminsights.com/industry-analysis/liquid-cooling-market' },
    { label: '🇨🇳 中国液冷市场全球占比', value: '—（待核）', note: '②待补。2026-06-15 第 4-2 轮 Gemini 端拿到 IDC+中商产业研究院(中国 2026E 液冷服务市场 257 亿元)+Omdia(全球数据中心冷却市场 2028 年 168.7 亿美元);但「中国液冷服务市场」vs「全球数据中心冷却市场」口径不可比(后者含风冷),Gemini 主动拒绝强行相除算占比。', color: 'var(--muted)', tier:'media', src:'IDC+中商产业研究院 2026-03-03 / Omdia 2025-09-30' },
    { label: '🤖 AI 算力核心驱动', value: 'GB300 >100kW', note: 'Nvidia 新一代机柜功耗超 100kW,远超风冷极限,液冷成高密度"必选配置"。来源:IDC 2026 GTC 趋势报告(截至 2026-06)', color: 'var(--red)', tier:'broker', src:'IDC 官方博客' },
    { label: '🏭 产业阶段', value: '繁荣期(渗透加速)', note: '冷板式液冷大面积铺开,服务器厂商加速集采。AI 主观定性,非具体数字。', color: 'var(--green)', tier:'estimate', src:'产业常识' },
    { label: '📐 氟化液全球市场规模(2026E)', value: '—（待核）', note: '②待补。2026-06-15 第 4-2 轮 Gemini 端找到浸没式液冷市场 2026 年 28 亿美元(新浪财经转引)+非氟流体占浸没式 55%+ 份额;按 28 亿×(1-55%)≈12.6 亿美元推算氟化液规模,仅覆盖浸没式液冷场景,氟化液大量用于半导体/航空/医疗等非数据中心场景,口径范围明显偏小,故标②待补。', color: 'var(--muted)', tier:'media', src:'新浪财经转引 2026 / 行业文章 2026' },
    { label: '⚡ 下一代催化', value: '浸没式商业化', note: '3M 退出倒逼国产浸没式氟化液验证加速;PUE≤1.2 红线促使存量机房改造。AI 主观判断。', color: 'var(--blue)', tier:'estimate', src:'行业研究综述' },
    { label: '🔴 核心矛盾', value: '需求暴增 vs 产能/认证瓶颈', note: '前端算力散热刚需井喷,后端 CDU/盲插快接头验证周期长(12-18 月),高质量冷媒供给不足。AI 主观判断。', color: 'var(--red)', tier:'estimate', src:'产业链调研逻辑' },
    { label: '📋 液冷国产化率(分环节)', value: '—（待核）', note: '②待补(5 项全)。2026-06-15 第 4-2 轮 Gemini 端仅查到冷板式液冷系统成本结构占比(液冷板 32% / 快接 28% / CDU 25% / 管路阀门 10% / 冷却液 5%),这是「成本占比」不是「国产化率」,无法用于推算,5 项全标②待补。', color: 'var(--muted)', tier:'media', src:'行业文章 2026' }
  ],
  // ★ 升级七：5 列横向树状图 —— 四轮注入（11 sub-card 全部 barrier/note/position 注入;companies[].barrier 严格与 segments 一致 11/11;3 个 sub-card 标 choke=true 对应 3 个卡口）
  treeMap: {
    // ============ ① 下游（2 个 sub-card）============
    downstream: [
      {
        name: 'AI 算力 IDC',
        barrier: 3,
        note: '液冷机架成新建算力中心标配,核心比拼 PUE 达标率与上架率。来源:IDC 行业调研(截至 2026-06)',
        companies: [
          { name:'润泽科技', code:'300442', position:'头部算力中心,占比待核。来源:待核', barrier:3 },
          { name:'光环新网', code:'300383', position:'一线城市 IDC,占比待核。来源:待核', barrier:2 },
          { name:'数据港', code:'603881', position:'阿里定制机房,占比待核。来源:待核', barrier:3 }
        ]
      },
      {
        name: 'HPC/超算中心',
        barrier: 4,
        note: '国家级超算项目驱动,浸没式液冷应用较早且成熟。来源:行业白皮书(截至 2026-06)',
        companies: [
          { name:'中科曙光', code:'603019', position:'超算领域龙头,份额领先。来源:待核', barrier:4 }
        ]
      }
    ],

    // ============ ② 中游（2 个 sub-card）============
    midstream: [
      {
        name: '液冷服务器整机',
        barrier: 3,
        note: 'AI 服务器带量提速,国内双寡头格局明显,集成端竞争激烈。来源:IDC 报告(截至 2026-05)',
        companies: [
          { name:'浪潮信息', code:'000977', position:'服务器市占第一,占比待核。来源:待核', barrier:3 },
          { name:'中科曙光', code:'603019', position:'市占前二,自研技术优。来源:待核', barrier:4 },
          { name:'紫光股份', code:'000938', position:'新华三份额前三,占比待核。来源:待核', barrier:3 }
        ]
      },
      {
        name: '液冷数据中心/机房',
        barrier: 2,
        note: '全生命周期微模块机房交付,技术门槛适中。来源:行业测算(截至 2026-06)',
        companies: [
          { name:'科华数据', code:'002335', position:'液冷微模块市占领先。来源:待核', barrier:2 }
        ]
      }
    ],

    // ============ ③ 上游材料（2 个 sub-card）============
    materials: [
      {
        name: '氟化液/浸没式冷却液',
        barrier: 5,
        choke: true,
        note: '3M 退出后迎绝佳替代窗口,高质量 C8/C6 冷媒严重供给不足。来源:化工研报(截至 2026-05)',
        sourceSegment: '冷却介质(氟化液/浸没式冷却液)',
        companies: [
          { name:'巨化股份', code:'600160', position:'国产替代龙头,占比待核。来源:待核', barrier:5 },
          { name:'新宙邦', code:'300037', position:'核心供应商,占比待核。来源:待核', barrier:4 },
          { name:'天赐材料', code:'002709', position:'加速切入。来源:待核', barrier:3 }
        ]
      },
      {
        name: '导热界面材料(TIM)',
        barrier: 3,
        choke: false,
        note: '格局相对分散,多为消费电子散热厂商横向拓展。来源:电子研报(截至 2026-05)',
        sourceSegment: '导热界面材料(TIM)',
        companies: [
          { name:'中石科技', code:'300684', position:'占比待核。来源:待核', barrier:3 },
          { name:'思泉新材', code:'301489', position:'占比待核。来源:待核', barrier:3 }
        ]
      }
    ],

    // ============ ④ 上游设备（3 个 sub-card）============
    equipment: [
      {
        name: 'CDU 冷却液分配单元',
        barrier: 5,
        choke: true,
        note: '液冷心脏,集中度极高,满负荷试错与防漏验证壁垒深。来源:招投标数据(截至 2026-06)',
        sourceSegment: 'CDU(冷却液分配单元)',
        companies: [
          { name:'英维克', code:'002837', position:'绝对龙头,份额领先。来源:待核', barrier:5 },
          { name:'高澜股份', code:'300499', position:'老牌温控厂,占比待核。来源:待核', barrier:3 },
          { name:'申菱环境', code:'301018', position:'稳居一梯队。来源:待核', barrier:3 }
        ]
      },
      {
        name: '快接接头/管路',
        barrier: 4,
        choke: true,
        note: '盲插防漏专利受限,海外史陶比尔等主导,国产突破中。来源:专利检索(截至 2026-05)',
        sourceSegment: '快接接头/管路',
        companies: [
          { name:'永贵电器', code:'300351', position:'快接头国产领跑。来源:待核', barrier:4 },
          { name:'川环科技', code:'300547', position:'管路龙头。来源:待核', barrier:3 }
        ]
      },
      {
        name: '液冷板/冷板',
        barrier: 3,
        choke: false,
        note: '制造门槛适中,五金件属性偏强,面临一定价格战压力。来源:产业链调研(截至 2026-06)',
        sourceSegment: '液冷板/冷板',
        companies: [
          { name:'飞荣达', code:'300602', position:'占比待核。来源:待核', barrier:3 }
        ]
      }
    ],

    // ============ ⑤ 侧枝（2 个 sub-card）============
    sideBranches: [
      {
        name: '二次侧冷却塔(风液混合)',
        barrier: 2,
        note: '传统商冷与暖通企业降维切入,门槛较低,竞争白热化。来源:暖通行业报告(截至 2026-06)',
        sourceSegment: '二次侧冷却塔(风液混合)',
        companies: [
          { name:'双良节能', code:'600481', position:'占比待核。来源:待核', barrier:2 },
          { name:'海容冷链', code:'603187', position:'占比待核。来源:待核', barrier:2 }
        ]
      },
      {
        name: '液冷温控芯片/智能控制',
        barrier: 3,
        note: '精细化温控与上游关键铜材供应商,辅助节点。来源:行业综述(截至 2026-06)',
        sourceSegment: '液冷温控芯片/智能控制',
        companies: [
          { name:'博威合金', code:'601137', position:'铜合金部件供应商。来源:待核', barrier:3 }
        ]
      }
    ]
  },
  // ★ 升级九 STEP 2：5 个 segments（沿用 PCB 风格：材料→设备→制造→下游→侧枝）—— barrier='—'/choke=false（避免被当作硬数据）
  segments: [
    {
      name: '冷却介质(氟化液/浸没式冷却液)', costRatio: '—', barrier: '—', choke: false, border: false,
      intro: '<strong>氟化液</strong>是液冷核心介质。3M Novec / 科慕 Opteon 曾垄断全球 80%+。<strong>2022 年 3M/科慕因环保压力（PFAS）退出</strong>，国产承接方崛起。浸没式液冷对介电性能、热稳定、绝缘要求严苛，技术壁垒高。',
      globalLandscape: [
        { lbl: '🥇 巨化股份(中)', val: '—', note: '3M 退出后国产主要承接者（具体份额待核）' },
        { lbl: '🥈 新宙邦(中)', val: '—', note: '氟化液/冷却液（具体份额待核）' },
        { lbl: '天赐材料(中)', val: '—', note: '冷却液（具体份额待核）' }
      ],
      stocks: [
        { rank:1, name:'巨化股份', code:'600160', position:'—（待核：氟化液全球份额/3M 退出后承接率）', barrier:5, trend:'flat', trendNote:'—（待核）', logic:'氟化液龙头，3M 退出核心受益者。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:5,trend:'flat'}
        ], dims6Note:'26Q1 营收 60.18 亿(+3.75%)/归母 11.73 亿(+45.93%)/毛利 34.39%;PE-TTM/分位待核。来源:巨潮资讯/东方财富财报摘录(截至 2026-04-29) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:2, name:'新宙邦', code:'300037', position:'—（待核：氟化液+冷却液份额）', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'半导体/数据中心冷却液布局。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收 33.61 亿(+67.85%)/归母 4.80 亿(+109.02%)/毛利 ~24.3%;PE-TTM/分位待核。来源:新浪/东方财富(截至 2026-04-28) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:3, name:'天赐材料', code:'002709', position:'—（待核：冷却液份额）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'切入冷却液领域。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 66.73 亿(+91.29%)/归母 16.54 亿(+1005.75%)/扣非归母 15.60 亿(+1062.23%)单季净利大增;PE-TTM/分位待核。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)', tier:'primary', valAsOf:'待核' }
      ]
    },
    {
      name: '核心部件(CDU/快接/管路/TIM)', costRatio: '—', barrier: '—', choke: false, border: false,
      intro: '液冷系统核心硬件：CDU（冷却液分配单元）、快接接头（防漏）、管路（防爆）、TIM（导热界面材料）、液冷板。全球 3-5 家寡头格局（英维克/维谛/AVC/永贵/川环/中石/思泉/飞荣达）。<strong>这一层技术壁垒中等，但客户认证周期 6-12 个月</strong>。',
      globalLandscape: [
        { lbl: '英维克(中)', val: '—', note: 'CDU 国产龙头（具体份额待核）' },
        { lbl: '维谛技术(中)', val: '—', note: '数据中心基础设施（具体份额待核）' },
        { lbl: 'AVC(台)', val: '—', note: 'CDU 海外品牌（具体份额待核）' },
        { lbl: '永贵电器(中)', val: '—', note: '液冷快接（具体份额待核）' }
      ],
      stocks: [
        { rank:1, name:'英维克', code:'002837', position:'—（待核：CDU 国产龙头/AI 算力液冷份额）', barrier:5, trend:'flat', trendNote:'—（待核）', logic:'国内 CDU 与全链条液冷温控龙头。⚠️重大风险:增收不增利', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:5,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 11.75 亿(+26.03%)/归母 866 万(-81.97%),增收不增利。PE-TTM/分位待核。来源:新浪/国际储能网(截至 2026-04-20) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:2, name:'永贵电器', code:'300351', position:'—（待核：液冷快接/连接器份额）', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'轨交/新能源接插件转液冷快接，突破海外垄断。⚠️重大风险:业绩转亏', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 4.74 亿(+6.30%)/归母 -2174 万(-193.46%)业绩转亏。PE-TTM/分位待核。来源:东方财富/格隆汇(截至 2026-04-26) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:3, name:'高澜股份', code:'300499', position:'—（待核：板式液冷换热/服务器液冷份额）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'老牌液冷厂商。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 2.12 亿(-2.77%)/归母 1514 万(+16.55%)/毛利 30.68%;PE-TTM/分位待核。来源:新浪(截至 2026-04-23) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:4, name:'申菱环境', code:'301018', position:'—（待核：数据中心精密空调+液冷）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'特种温控及液冷系统。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 6.17 亿(-1.80%)/归母 2831 万(-47.71%)/毛利 20.60%;PE-TTM/分位待核。来源:新浪(截至 2026-04-28) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:5, name:'川环科技', code:'300547', position:'—（待核：液冷管路份额）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'橡胶管路延展至服务器液冷。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 2.76 亿(-12.56%)/归母 3948.73 万,营收下滑。毛利率/PE-TTM/分位待核。来源:新浪财经(截至 2026-04-28) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:6, name:'中石科技', code:'300684', position:'—（待核：TIM 导热材料份额）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'TIM 导热界面材料。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 3.89 亿(+11.55%)/归母 6477.87 万(+4.94%)/经营现金流 1.64 亿(+264.06%);毛利率/PE-TTM 待核。来源:巨潮资讯/公司第一季度报告(截至 2026-04-29)', tier:'primary', valAsOf:'待核' },
        { rank:7, name:'思泉新材', code:'301489', position:'—（待核：导热材料）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'石墨及导热材料。⚠️重大风险:利润断崖', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 2.63 亿(+5.08%)/归母 1245.91 万(-77.10%)利润断崖式下滑;毛利率/PE-TTM 待核。来源:新浪财经(截至 2026-04-28) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:8, name:'飞荣达', code:'300602', position:'—（待核：散热模组+液冷板）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'散热模组及冷板集成。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 16.44 亿(+39.15%)/归母 7735.70 万(+33.92%)业绩稳健双增;毛利率/PE-TTM 待核。来源:东方财富(截至 2026-04-28) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' }
      ]
    },
    {
      name: '液冷系统集成(制造)', costRatio: '—', barrier: '—', choke: false, border: false,
      intro: '液冷系统集成商：液冷服务器、液冷机柜、液冷数据中心。AI 算力时代，GB300/Rubin 强制液冷，集成商迎来 2025-2027 年扩产周期。<strong>中游竞争激烈（20+ 家），不构成物理卡口</strong>。',
      globalLandscape: [
        { lbl: '浪潮信息(中)', val: '—', note: '液冷服务器整机（具体份额待核）' },
        { lbl: '中科曙光(中)', val: '—', note: '液冷服务器+HPC（具体份额待核）' },
        { lbl: '紫光股份(中)', val: '—', note: '新华三液冷（具体份额待核）' }
      ],
      stocks: [
        { rank:1, name:'中科曙光', code:'603019', position:'—（待核：液冷服务器+HPC 双轮）', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'自研冷板/浸没式技术，深耕超算。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收 31.99 亿(+23.71%)/归母 2.28 亿(+22.19%)稳健增长;PE-TTM/分位待核。来源:新浪/钛媒体(截至 2026-04-25) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:2, name:'浪潮信息', code:'000977', position:'—（待核：液冷服务器整机/AI 服务器市占）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'液冷服务器龙头，All in 液冷。⚠️重大风险:经营现金流为负', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 354.70 亿(-24.30%)/归母 6.05 亿(+30.74%)/经营现金流 -77.72 亿;PE-TTM/分位待核。来源:证券时报/东方财富(截至 2026-04-30) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:3, name:'紫光股份', code:'000938', position:'—（待核：新华三液冷服务器）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'新华三全栈液冷方案。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 279.85 亿(+34.61%)/归母 7.88 亿(+126.06%);PE-TTM/分位待核。来源:财联社/同花顺(截至 2026-04-28) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:4, name:'科华数据', code:'002335', position:'—（待核：液冷 UPS+液冷数据中心）', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'数据中心全生命周期与液冷集成。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'26Q1 营收 14.30 亿(+17.57%)/归母 7800.88 万(+13.15%)/经营现金流 1.21 亿(+160.80%);毛利率/PE-TTM 待核。来源:公司第一季度报告公告(截至 2026-04-26)', tier:'primary', valAsOf:'待核' }
      ]
    },
    {
      name: '液冷 IDC 运营(下游)', costRatio: '—', barrier: '—', choke: false, border: false,
      intro: '液冷 IDC 运营商：润泽/光环/数据港等。AI 算力 IDC 渗透率快速提升，PUE 1.1 以下机房规模扩张。<strong>重资产模式，扩产周期长（2-3 年）</strong>。',
      globalLandscape: [
        { lbl: '润泽科技(中)', val: '—', note: '液冷 IDC（具体份额待核）' },
        { lbl: '光环新网(中)', val: '—', note: 'IDC+液冷（具体份额待核）' },
        { lbl: '数据港(中)', val: '—', note: '阿里 IDC+液冷（具体份额待核）' }
      ],
      stocks: [
        { rank:1, name:'润泽科技', code:'300442', position:'—（待核：液冷 IDC 龙头地位）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'超大型液冷智算中心布局。AIDC 拓展驱动。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 18.40 亿(+53.55%)/归母 5.82 亿(+35.35%) AIDC 拓展驱动;PE-TTM/分位待核。来源:第一财经(截至 2026-04-09) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:2, name:'数据港', code:'603881', position:'—（待核：阿里 IDC+液冷）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'阿里定制数据中心，液冷应用较早。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️财报待核(无一手) | ②待补。2026-06-15 第 4-2 轮 Gemini 端口径自查通过(3.80 亿元是合并总营收,非分项),但精确到万元原文因 PDF 抓取空白仍②待补;3.80 亿/-3.76% 数字本身有证券之星/网易/搜狐 ≥3 独立二级来源交叉确认(2026-04-25 一季报),按 G1 一手纪律不能注入为硬数据,待精确万元数字。来源:http://static.sse.com.cn/disclosure/listedinfo/announcement/c/new/2026-04-25/603881_20260425_VTU6.pdf(原文 PDF 抓取空白,需 cninfo 人工下载)。', tier:'media', valAsOf:'待核' },
        { rank:3, name:'光环新网', code:'300383', position:'—（待核：IDC+液冷转型）', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'一线城市 IDC 液冷改造。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 16.33 亿/-10.83% / 归母 2246.52 万/-67.52%(扣非 1052.82 万/-82.48%) / 毛利率 14.09%/-6.9pct。来源:证券之星 2026-04-29/30 整理(公司一季报公告)。PE-TTM 约 173 倍 broker(因利润大幅下滑失真,口径不可信)。PE 历史分位 ②待补(因公司巨亏分位计算失真)。⚠️重大风险:控股股东舟山百汇达 2026-03-17~06-16 减持窗口期内,计划减持不超过 3% 股份(tier:primary,src:2026-02-13 公告)——作 ⚠️ 提示可见,不改 barrier。', tier:'primary', valAsOf:'2026-03-20' }
      ]
    },
    {
      name: '液冷侧枝(冷却塔/温控芯片)', costRatio: '—', barrier: '—', choke: false, border: false,
      intro: '液冷侧枝：二次侧冷却塔（风液混合，数据中心标配）、温控芯片、智能控制（液冷板散热管理）。<strong>侧枝技术壁垒中等</strong>。',
      globalLandscape: [
        { lbl: '双良节能(中)', val: '—', note: '二次侧冷却塔（具体份额待核）' },
        { lbl: '海容冷链(中)', val: '—', note: '冷却塔（具体份额待核）' }
      ],
      stocks: [
        { rank:1, name:'博威合金', code:'601137', position:'—（待核：铜合金冷却部件）', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'提供液冷系统所需的耐蚀铜合金材料。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 56.61 亿/+14.03% / 归母 -9135.98 万/-128.84%(由盈转亏,扣非 -7360.67 万/-124.06%) / 毛利率 8.07%/-6.22pct 环比-4.40pct。来源:新浪财经 2026-04-27 整理(公司一季报公告)。PE-TTM 约 149.29 倍 primary(2026-04-27)。PE 历史分位 ②待补(当期亏损,常规 PE-TTM 意义存疑)。⚠️G3 方向提示:本季亏损主因是新能源板块(汇兑损失+美国联邦补贴失去,单季亏损 1.59 亿元),液冷相关的铜合金散热新材料在 2025 年报中描述为正增长——dims6 方向判断时不要把新能源板块亏损等同于液冷散热业务景气下滑。博威是液冷侧枝(铜合金冷却部件),非纯液冷标的,液冷业务占比待核。', tier:'primary', valAsOf:'2026-04-27' },
        { rank:2, name:'双良节能', code:'600481', position:'—（待核：二次侧冷却塔/液冷配套）', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'二次侧换热及闭式冷却塔。⚠️重大风险:主业承压波及', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 归母 -3.945 亿(-144.60%)/毛利暴跌至 -11.04%,主业承压;PE-TTM/分位待核。来源:东方财富/经济观察网(截至 2026-04-30) ⚠️媒体转,非一手', tier:'media', valAsOf:'待核' },
        { rank:3, name:'海容冷链', code:'603187', position:'—（待核：冷却塔+液冷）', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'传统商冷拓展数据中心温控。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 8.37 亿/-7.96% / 归母 1.05 亿/+0.39%(扣非 1.02 亿/+1.34%) / 毛利率 29.63%/+4.21pct。来源:证券之星 2026-05-08 整理(公司一季报公告)。PE-TTM 精确倍数 ②待补(仅查到分位,未查到对应 TTM 倍数本身)。PE 历史分位 38.0%(近 1 年)broker,src:知了财报网。海容是液冷侧枝(冷却塔),非纯液冷标的,液冷相关业务占比待核。', tier:'primary', valAsOf:'2026-05-08' }
      ]
    }
  ],
  // ★ 升级三：midstream 整合视图 —— 骨架版（中游 4 只票与 segments[2] 重复，此处留空待 Gemini 决定是否并列双视图）
  midstream: { description: '液冷系统集成是充分竞争行业，全球 20+ 家集成商，客户可切换。AI 算力扩产周期带来 2025-2027 年规模放量，但非物理卡口。', stocks: [] },
  // ★ 升级二/三：四大物理追问 —— 三轮注入（5 段 4 问,strength [★★★/★★★/★★☆/★☆☆/★☆☆],全 estimate 🆪）
  fourQuestions: {
    segments: [
      {
        segmentName: '冷却介质',
        q1: '算力功耗跃升与智算中心 PUE 考核引发规模化替代需求',
        q2: '3M 因 PFAS 问题退出引发全球高质量冷媒供给真空,国产替代处于产能爬坡期',
        q3: '化工合成、提纯工艺极高,且存在严苛的环保与客户验证门槛,寡头格局(巨化等)难以被跨界打破',
        q4: '需警惕估值过度透支及国内出台类似 PFAS 禁令的黑天鹅环保风险',
        hits: 4,
        strength: '★★★'
      },
      {
        segmentName: '核心部件(CDU/快接)',
        q1: '整机液冷架构标配带来 CDU、接头组件随服务器出货量成倍放大',
        q2: '盲插防漏专利受限,高端快接头短期仍依赖进口;优质 CDU 产能相对吃紧',
        q3: '漏液烧毁服务器的代价极高(极高的试错成本),造就了长达 12-18 个月的客户验证壁垒,龙头难以被迅速替换',
        q4: '目前部分龙头如英维克 26Q1 出现增收不增利现象,需警惕跨界厂商大打价格战压垮毛利率',
        hits: 4,
        strength: '★★★'
      },
      {
        segmentName: '系统集成(服务器整机)',
        q1: 'CSP 资本开支回暖及 AI 大模型拉动液冷服务器采购潮',
        q2: '国内服务器集成商产能充足,供给非主要矛盾',
        q3: '比拼全栈方案设计能力及与芯片原厂(如 Nvidia)的深度绑定关系,竞争较激烈',
        q4: '毛利率长期受上游芯片与下游云厂商双重挤压,现金流压力大(如浪潮 26Q1),适合做 beta 配置',
        hits: 2,
        strength: '★★☆'
      },
      {
        segmentName: '液冷 IDC 运营',
        q1: '互联网及 AI 企业大规模租用算力机架',
        q2: '一线城市能耗指标受限,具备低 PUE 合规液冷机架的 IDC 资源稀缺',
        q3: '核心地段拿地能力及能耗批文获取能力,具有资源属性的护城河',
        q4: '重资产运营模式,折旧摊销压力大,需密切关注上架率及出租单价的边际变化',
        hits: 2,
        strength: '★☆☆'
      },
      {
        segmentName: '液冷侧枝(二次侧)',
        q1: '数据中心外循环换热设备同步扩容',
        q2: '传统冷却设备厂商大举切入,产能严重过剩',
        q3: '技术降维打击导致护城河极浅,陷入红海竞争',
        q4: '主业周期性极强(如双良节能受光伏硅片拖累暴亏),受数据中心拉动效应易被稀释,需规避',
        hits: 0,
        strength: '★☆☆'
      }
    ]
  },
  // ★ 升级三：卡口候选 —— 二轮注入 3 个（AI 主观 strength + valuation 全"待核"）
  chokePoints: [
    {
      name: '氟化液 (浸没式冷却液)',
      strength: '★★★',
      // 字段来源:code=卡口代表股(0.5 A 块 176「巨化 600160」三家国产承接首位);segment=卡口所属环节(0.6 G 块 237「materials 列第①位 氟化液/浸没式冷却液」)
      code: '600160',
      segment: '氟化液/浸没式冷却液',
      // tags 引用语料:0.5 F 块 4 问「氟化液 3M 退出后巨化承接」/0.5 A 块 176「巨化 600160 + 新宙邦 300037 + 天赐 002709」/0.6 G 块 237「materials 列第①位」/0.6 块 2.1.1「3M Novec 退出 PFAS」/0.6 块 2.1.2「巨化/新宙邦/天赐 国产承接率」/0.5 F 块 4 问「风冷 30kW 触顶 无替代」+「GB200/GB300 强制液冷」
      tags: ['3M PFAS 退市引发全球产能真空', '高精尖化工寡头格局', '巨化/新宙邦/天赐 三家国产承接', '下游 GB200/GB300 强制液冷', '风冷 30kW 触顶无替代'],
      logic: '3M 因环保(PFAS)退市引发全球产能真空，属于高精尖化工，国产替代的绝佳窗口，寡头格局明显。',
      howToCheck: '跟踪 3M 全球关停产线进度公告；查阅巨化等国产化龙头的扩产环评公告及下游服务器厂商的介质测试认证名单。',
      falsifySignal: '由于 PFAS 环保问题，数据中心放弃浸没式方案全面倒向冷板式（水/乙二醇）；或国内也出台严厉的 PFAS 禁令。',
      valuation: 'PE 及分位待核 (as of 待核)',
      risks: '环保政策超预期收紧；产能爬坡良率不及预期致使成本难降。'
    },
    {
      name: 'CDU (液冷分配单元)',
      strength: '★★★',
      // 字段来源:code=卡口代表股(0.5 A 块 177「英维克 002837」CDU 份额龙头);segment=卡口所属环节(0.6 G 块 240「equipment 列第①位 CDU 冷却液分配单元」)
      code: '002837',
      segment: 'CDU 冷却液分配单元',
      // tags 引用语料:0.5 F 块 4 问「CDU 英维克/AVC/维谛」/0.6 G 块 240「equipment 列第①位 英维克/维谛/AVC」/0.6 块 2.2.1「CDU 国产化率 英维克/维谛 vs AVC 海外」/0.5 F 块 4 问「CDU 国产化扩产」+「GB200/GB300 强制液冷」
      tags: ['液冷循环心脏 直接关系算力安全', '英维克/维谛/AVC 寡头格局', '客户验证周期长 整机厂不敢换供', 'CDU 国产化扩产期', '下游 GB200/GB300 强制液冷'],
      logic: '液冷循环的"心脏"，直接关系算力群组的安全，客户验证周期长，整机厂不敢轻易更换供应商。',
      howToCheck: '通过招标网跟踪三大运营商及头部互联网大厂液冷服务器集采中标结果中，英维克等厂商的 CDU 份额。',
      falsifySignal: '服务器整机厂（如浪潮、新华三）选择自行生产 CDU，跳过独立第三方温控厂商（供应商内卷化）。',
      valuation: 'PE 及分位待核 (as of 待核)',
      risks: '传统精密空调厂商大举跨界进入打价格战，导致毛利率迅速崩盘。'
    },
    {
      name: '快接头 (Quick Disconnects)',
      strength: '★★☆',
      // 字段来源:code=卡口代表股(0.5 A 块 177「永贵 300351」国产替代唯一标的);segment=卡口所属环节(0.6 G 块 241「equipment 列第②位 快接接头/管路」)
      code: '300351',
      segment: '快接接头/管路',
      // tags 引用语料:0.5 A 块 177「永贵 300351 + 川环 300547 列入 21 只个股」/0.6 G 块 241「equipment 列第②位 永贵电器/川环科技」/0.6 块 2.2.2「液冷 快接 永贵电器 川环科技 份额」/logic 原文「史陶比尔/派克汉尼汾 垄断 千万次盲插 专利壁垒」
      tags: ['千万次盲插不漏液 技术门槛', '史陶比尔/派克汉尼汾 外资垄断', '极高专利壁垒', '永贵/川环 国产替代', '漏液风险高 索赔代价大'],
      logic: '技术难点在于千万次插拔不漏液（盲插），长期被外资如史陶比尔、派克汉尼汾垄断，具有极高专利壁垒。',
      howToCheck: '查询国产接头厂商（如永贵电器）是否进入 Nvidia 或国产头部服务器整机厂核心供应链；查阅专利局突破盲插防漏专利的情况。',
      falsifySignal: '液冷架构向"无快接"直连演进；或者整机厂为降本降低防漏液标准，导致产品沦为低门槛五金件。',
      valuation: 'PE 及分位待核 (as of 待核)',
      risks: '海外龙头动用专利诉讼进行狙击；若发生重大漏液烧毁服务器事故将面临巨额索赔。'
    }
  ],
  // ★ 升级三：供需缺口 —— 二轮注入 2 个（demand/capacity/gap/rate 全"待核"）
  supplyGap: [
    {
      name: '高性能氟化液',
      demand: '待核 (预测值缺失)',
      capacity: '待核 (统计值缺失)',
      gap: '待核',
      rate: '待核',
      bottleneck: '高质量 C8/C6 氟化液合成工艺壁垒及环评审批周期',
      tier: '待核'
    },
    {
      name: 'AI 级 CDU',
      demand: '待核 (预测值缺失)',
      capacity: '待核 (统计值缺失)',
      gap: '待核',
      rate: '待核',
      bottleneck: '头部 CSP 严格的满负荷运行测试与长时间验证周期（认证产能不等于有效产能）',
      tier: '待核'
    }
  ]
};

// ==================== 二轮注入后状态（2026-06-15）====================
//
// ★ 二轮注入完成项：
//   - prosperity.dims[6]:5 维 score 1-5（AI 主观 🆪）+ valuation score=null（查不到 PE 留空）
//   - prosperity.verdict:{longTermFit:true, oneLine, stockHint} AI 主观
//   - segments[5]:21 只个股（移除 维谛 300590 标的错误 Gemini 自查发现）,barrier 档 5/4/3/2 注入
//     dims6Note + tier + valAsOf 三个新字段补齐,硬数据全"待核"
//   - chokePoints:3 个(氟化液★★★/CDU★★★/快接头★★☆)valuation 全"待核"
//   - supplyGap:2 个(氟化液/AI 级 CDU)demand/capacity/gap/rate 全"待核"
//
// ★ 仍待 Gemini 端下一轮核实补齐：
//   - segments[].stocks[].dims6[6 维数组]——等下一轮按 4 问方法论 + 财报补
//   - overview[8]——市场规模/CAGR/缺口/政策/产业阶段 全"待核"
//   - treeMap sub-card 的 barrier/note/position——全"—（待核）"
//   - cyclePosition——stage/label/watchSignals 全"待核"
//   - fourQuestions——segments[] 空,等 4 问方法论出"卡口候选"再注
//
// ★ meta.status='skeleton' / meta.tier='待核'——保留骨架态标记,等核心硬数据补齐后再升级为"active"

})(window.CHAINS);
