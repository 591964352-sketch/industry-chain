// data/liquid-cooling.js  —— 升级 X · 新增链（场景 B）：液冷产业链骨架
// 由 index.html 顶部 manifest 同步加载；window.CHAINS 由本文件首次注入。
//
// 2026-06-15 骨架首版（CLAUDE.md 数据治理规则·不造数铁律）：
//   本步只搭"环节拆解 + 上市公司名单"骨架，**所有"会变的事实"字段
//   （市场规模 / CAGR / 缺口率 / 国产化率 / 最新季报 / PE / PE 分位 / 六维分 / 卡口强度）
//   一律留空或显式标"待核"**。绝不用训练知识填任何财报/市占/缺口/PE 数字。
//
// 等 Gemini 端按 .claude/plans/refresh-sop.md 场景 B 模板核实后，
// 再注入第二轮（prosperity 实分 + 个股财报 + 卡口 + 缺口率 + 树状图实数据）。
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
  meta: { sector:'中游', tier:'待核', status:'skeleton', updatedAt:'2026-06-15', ltFit:null },
  // ★ 升级九 STEP 2：景气六维 —— 骨架版（6 维 score/trend/reason 全留空，标"待核"）
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:null, trend:'flat', reason:'待核（Gemini 端按 refresh-sop 场景 B 核实）', evidence:'', flag:'🆪', tier:'estimate', src:'' },
      { key:'visibility', name:'业绩可见度', score:null, trend:'flat', reason:'待核', evidence:'', flag:'🆪', tier:'estimate', src:'' },
      { key:'policy', name:'政策确定性', score:null, trend:'flat', reason:'待核', evidence:'', flag:'🆪', tier:'estimate', src:'' },
      { key:'supply', name:'供需紧张度', score:null, trend:'flat', reason:'待核', evidence:'', flag:'🆪', tier:'estimate', src:'' },
      { key:'valuation', name:'估值性价比', score:null, trend:'flat', reason:'待核', evidence:'', flag:'🆪', tier:'estimate', src:'' },
      { key:'barrier', name:'壁垒安全垫', score:null, trend:'flat', reason:'待核', evidence:'', flag:'🆪', tier:'estimate', src:'' }
    ],
    verdict: {
      longTermFit:'待核（Gemini 端核实后再填）',
      oneLine:'🆪 液冷是 AI 算力热管理的"必经之路"——风冷触顶后液冷成刚需，但六维打分与个股标的待 Gemini 端核实后填。',
      stockHint:'优先 T0/T1 环节（材料/设备寡头）；待 Gemini 核实个股数据后再细化选股建议'
    }
  },
  // ★ 升级九 STEP 2+：周期位置 —— 骨架版
  cyclePosition: { stage:null, label:null, reason:'待核（Gemini 端核实 AI 算力液冷渗透率拐点）', watchSignals:[] },
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
  // ★ 升级一/二：赛道概览 —— 全部"待核"（市场规模/CAGR/缺口/政策/产业阶段 全是"会变的数据"）
  overview: [
    { label: '🌍 全球液冷市场规模(2026E)', value: '—', note: '待核（Gemini 端按 refresh-sop 场景 B 核实）', color: 'var(--muted)', tier:'', src:'' },
    { label: '🇨🇳 中国液冷市场全球占比', value: '—', note: '待核', color: 'var(--muted)', tier:'', src:'' },
    { label: '🤖 AI 算力核心驱动', value: '—', note: '待核（GB300/Rubin 单机柜 120kW+ 倒逼液冷）', color: 'var(--muted)', tier:'', src:'' },
    { label: '🏭 产业阶段', value: '—', note: '待核（AI 算力液冷渗透率拐点）', color: 'var(--muted)', tier:'', src:'' },
    { label: '📐 氟化液全球市场规模(2026E)', value: '—', note: '待核（3M 退出后，巨化/新宙邦/天赐承接）', color: 'var(--muted)', tier:'', src:'' },
    { label: '⚡ 下一代催化', value: '—', note: '待核（英伟达 Rubin/GB300 全液冷路线）', color: 'var(--muted)', tier:'', src:'' },
    { label: '🔴 核心矛盾', value: '—', note: '待核（冷却液/温控/CDU 国产化率分项）', color: 'var(--muted)', tier:'', src:'' },
    { label: '📋 液冷国产化率(分环节)', value: '—', note: '待核（按冷却液/CDU/快接/管路/TIM 分项）', color: 'var(--muted)', tier:'', src:'' }
  ],
  // ★ 升级七：5 列横向树状图 —— 骨架版（sub-card 框架 + 上市公司名单（稳定信息），所有"会变"数据留空"—"）
  // 注：sub-card 的 barrier/note/companies[].position 全 "—"，避免被渲染成硬数据
  treeMap: {
    // ============ ① 下游（2 个 sub-card）============
    downstream: [
      {
        name: 'AI 算力 IDC',
        barrier: '—',
        note: '—（待核：液冷 IDC 渗透率/单机柜功率/PUE）',
        companies: [
          { name:'润泽科技', code:'300442', position:'—（待核：液冷 IDC 龙头地位）', barrier:'—' },
          { name:'光环新网', code:'300383', position:'—（待核：IDC+液冷转型进度）', barrier:'—' },
          { name:'数据港', code:'603881', position:'—（待核：阿里 IDC+液冷）', barrier:'—' }
        ]
      },
      {
        name: 'HPC/超算中心',
        barrier: '—',
        note: '—（待核：HPC 液冷部署率）',
        companies: [
          { name:'中科曙光', code:'603019', position:'—（待核：HPC 液冷服务器+算力中心）', barrier:'—' }
        ]
      }
    ],

    // ============ ② 中游（2 个 sub-card）============
    midstream: [
      {
        name: '液冷服务器整机',
        barrier: '—',
        note: '—（待核：GB300 份额/液冷服务器全球市占）',
        companies: [
          { name:'浪潮信息', code:'000977', position:'—（待核：液冷服务器整机/AI 服务器市占）', barrier:'—' },
          { name:'中科曙光', code:'603019', position:'—（待核：液冷服务器+HPC 双轮）', barrier:'—' },
          { name:'紫光股份', code:'000938', position:'—（待核：新华三液冷服务器/交换机）', barrier:'—' }
        ]
      },
      {
        name: '液冷数据中心/机房',
        barrier: '—',
        note: '—（待核：PUE 1.1 以下液冷机房规模）',
        companies: [
          { name:'科华数据', code:'002335', position:'—（待核：液冷 UPS+液冷数据中心）', barrier:'—' }
        ]
      }
    ],

    // ============ ③ 上游材料（2 个 sub-card）============
    materials: [
      {
        name: '氟化液/浸没式冷却液',
        barrier: '—',
        choke: false,
        note: '—（待核：3M 退出后全球份额/巨化新宙邦天赐承接率）',
        sourceSegment: '冷却介质(氟化液/浸没式冷却液)'
      },
      {
        name: '导热界面材料(TIM)',
        barrier: '—',
        choke: false,
        note: '—（待核：国产化率/中石科技思泉新材飞荣达份额）',
        sourceSegment: '导热界面材料(TIM)'
      }
    ],

    // ============ ④ 上游设备（3 个 sub-card）============
    equipment: [
      {
        name: 'CDU 冷却液分配单元',
        barrier: '—',
        choke: false,
        note: '—（待核：英维克/维谛/AVC 份额）',
        sourceSegment: 'CDU(冷却液分配单元)'
      },
      {
        name: '快接接头/管路',
        barrier: '—',
        choke: false,
        note: '—（待核：永贵电器/川环科技份额）',
        sourceSegment: '快接接头/管路'
      },
      {
        name: '液冷板/冷板',
        barrier: '—',
        choke: false,
        note: '—（待核：飞荣达/中石科技份额）',
        sourceSegment: '液冷板/冷板'
      }
    ],

    // ============ ⑤ 侧枝（2 个 sub-card）============
    sideBranches: [
      {
        name: '二次侧冷却塔(风液混合)',
        barrier: '—',
        note: '—（待核：双良/海容/隆华份额）',
        sourceSegment: '二次侧冷却塔(风液混合)'
      },
      {
        name: '液冷温控芯片/智能控制',
        barrier: '—',
        note: '—（待核：温控芯片国产化率）',
        sourceSegment: '液冷温控芯片/智能控制'
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
        { rank:1, name:'巨化股份', code:'600160', position:'—（待核：氟化液全球份额/3M 退出后承接率）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'3M 退出后，氟化液国产替代核心承接方。具体份额/2026Q1 业绩/PE 待 Gemini 端核实' },
        { rank:2, name:'新宙邦', code:'300037', position:'—（待核：氟化液+冷却液份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'氟化液+冷却液双轮。具体业绩/PE 待 Gemini 端核实' },
        { rank:3, name:'天赐材料', code:'002709', position:'—（待核：冷却液份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'锂电电解液龙头+冷却液业务。具体待 Gemini 端核实' }
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
        { rank:1, name:'英维克', code:'002837', position:'—（待核：CDU 国产龙头/AI 算力液冷份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'数据中心精密温控+液冷 CDU 龙头。具体业绩/PE 待 Gemini 端核实' },
        { rank:2, name:'高澜股份', code:'300499', position:'—（待核：板式液冷换热/服务器液冷份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'板式液冷换热+服务器液冷。具体待 Gemini 端核实' },
        { rank:3, name:'申菱环境', code:'301018', position:'—（待核：数据中心精密空调+液冷）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'数据中心精密空调+液冷。具体待 Gemini 端核实' },
        { rank:4, name:'维谛技术', code:'300590', position:'—（待核：数据中心基础设施）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'原维谛，数据中心基础设施龙头。具体待 Gemini 端核实' },
        { rank:5, name:'永贵电器', code:'300351', position:'—（待核：液冷快接/连接器份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'液冷快接接头。具体待 Gemini 端核实' },
        { rank:6, name:'川环科技', code:'300547', position:'—（待核：液冷管路份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'液冷管路。具体待 Gemini 端核实' },
        { rank:7, name:'中石科技', code:'300684', position:'—（待核：TIM 导热材料份额）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'导热界面材料 TIM。具体待 Gemini 端核实' },
        { rank:8, name:'思泉新材', code:'301489', position:'—（待核：导热材料）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'导热材料。具体待 Gemini 端核实' },
        { rank:9, name:'飞荣达', code:'300602', position:'—（待核：散热模组+液冷板）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'散热模组+液冷板。具体待 Gemini 端核实' }
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
        { rank:1, name:'浪潮信息', code:'000977', position:'—（待核：液冷服务器整机/AI 服务器市占）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'液冷服务器整机龙头。具体业绩/PE 待 Gemini 端核实' },
        { rank:2, name:'中科曙光', code:'603019', position:'—（待核：液冷服务器+HPC 双轮）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'液冷服务器+HPC。具体待 Gemini 端核实' },
        { rank:3, name:'紫光股份', code:'000938', position:'—（待核：新华三液冷服务器）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'新华三液冷服务器+交换机。具体待 Gemini 端核实' },
        { rank:4, name:'科华数据', code:'002335', position:'—（待核：液冷 UPS+液冷数据中心）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'液冷 UPS+液冷数据中心。具体待 Gemini 端核实' }
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
        { rank:1, name:'润泽科技', code:'300442', position:'—（待核：液冷 IDC 龙头地位）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'液冷 IDC 龙头，PUE 1.1 以下机房规模扩张。具体待 Gemini 端核实' },
        { rank:2, name:'光环新网', code:'300383', position:'—（待核：IDC+液冷转型）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'IDC+液冷转型。具体待 Gemini 端核实' },
        { rank:3, name:'数据港', code:'603881', position:'—（待核：阿里 IDC+液冷）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'阿里 IDC+液冷。具体待 Gemini 端核实' }
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
        { rank:1, name:'双良节能', code:'600481', position:'—（待核：二次侧冷却塔/液冷配套）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'二次侧冷却塔+液冷配套。具体待 Gemini 端核实' },
        { rank:2, name:'海容冷链', code:'603187', position:'—（待核：冷却塔+液冷）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'冷却塔+液冷。具体待 Gemini 端核实' },
        { rank:3, name:'博威合金', code:'601137', position:'—（待核：铜合金冷却部件）', barrier:'—', trend:'flat', trendNote:'—（待核）', logic:'铜合金冷却部件。具体待 Gemini 端核实' }
      ]
    }
  ],
  // ★ 升级三：midstream 整合视图 —— 骨架版（中游 4 只票与 segments[2] 重复，此处留空待 Gemini 决定是否并列双视图）
  midstream: { description: '液冷系统集成是充分竞争行业，全球 20+ 家集成商，客户可切换。AI 算力扩产周期带来 2025-2027 年规模放量，但非物理卡口。', stocks: [] },
  // ★ 升级二/三：四大物理追问 —— 留空（等 Gemini 端按 4 问方法论出"卡口候选"再注入）
  fourQuestions: { segments: [] },
  // ★ 升级三：卡口候选 —— 留空（骨架态无卡口强度打分）
  chokePoints: [],
  // ★ 升级三：供需缺口 —— 留空（骨架态无缺口率/规模数据）
  supplyGap: []
};

// ==================== 骨架首版备注（2026-06-15）====================
//
// ★ 限制清单（绝不破）：
//   - prosperity.dims[].score 全 null + reason 全"待核"——禁止用训练知识填六维分
//   - segments[].stocks[] 仅含 name/code/position(待核)/barrier(—)/trend=flat——禁止编造财报/市占/PE
//   - treeMap sub-card 的 note/companies[].position/barrier 全 "—"/"待核"——避免路径化模板被当成硬数据
//   - chokePoints/supplyGap/fourQuestions 全空数组——等 Gemini 端出"卡口候选+缺口率"再注入
//   - meta.status='skeleton' 与 meta.tier='待核'——标记本链为"骨架态"，不参与擂台主排名
//
// ★ 等待 Gemini 端按 .claude/plans/refresh-sop.md 场景 B 模板核实后，再注入第二轮：
//   ① prosperity.dims[].score 1-5（带 reason/evidence/tier）② segments[].stocks[].dims6 + dims6Note（带 2026Q1 财报+PE+分位）③ chokePoints 3-5 个（带 howToCheck/falsifySignal/valuation）④ supplyGap 各环节缺口率（带 demand/capacity/gap/rate/bottleneck）⑤ overview 各指标（市场规模/CAGR/缺口/政策）⑥ treeMap sub-card 的 barrier/note/position（带占比/排名）

})(window.CHAINS);
