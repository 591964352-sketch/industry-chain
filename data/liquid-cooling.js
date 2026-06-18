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
  // ★ 升级九 STEP 2+ 复查(2026-06-15 P1-3 三批完成后):meta.status 不再标 'active'(完整态)
  //   真实状态:
  //   S4a/S4b/S4c 完整度已补(6 段/33 只/midstream 10 dims6[6] 全齐)
  //   P1-3 三批联网核实(seg[0-4] 26 只 + midstream 3 只复核 + 11 张 sub-card)完成:
  //     - S5 position 真数字 0/33(33/33 ②待补,2 只 midstream 仍 broker 推算)
  //     - S3 sub-card note 含% 0/11(11/11 ②待补)
  //   全部为公开数据稀缺区(企业公告+行业报告+协会数据 均缺)→ G4「公开数据稀缺区」
  //   陷阱保护触发;SKILL.md G4 已补
  //   详见 .claude/scratch/liquid-cooling-gap-report.md (段七)
  meta: { sector:'中游', tier:'待核', status:'S4a/S4b/S4c+S5+S3全面联网核实:0/33 position真数字+0/11 sub-card含%(公开数据稀缺区)·meta.status保留非active', updatedAt:'2026-06-15', ltFit:true },
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
    { label: '🏭 产业阶段', value: '<mark class="updated">繁荣期(渗透加速)</mark>', note: '冷板式液冷大面积铺开,服务器厂商加速集采。AI 主观定性,非具体数字。P1-3 三批联网核实后未变(产业阶段定性本就靠综合判断,无需精确数字)。', color: 'var(--green)', tier:'estimate', src:'产业常识' },
    { label: '📐 氟化液全球市场规模(2026E)', value: '—（待核）', note: '②待补。2026-06-15 第 4-2 轮 Gemini 端找到浸没式液冷市场 2026 年 28 亿美元(新浪财经转引)+非氟流体占浸没式 55%+ 份额;按 28 亿×(1-55%)≈12.6 亿美元推算氟化液规模,仅覆盖浸没式液冷场景,氟化液大量用于半导体/航空/医疗等非数据中心场景,口径范围明显偏小,故标②待补。', color: 'var(--muted)', tier:'media', src:'新浪财经转引 2026 / 行业文章 2026' },
    { label: '⚡ 下一代催化', value: '浸没式商业化', note: '3M 退出倒逼国产浸没式氟化液验证加速;PUE≤1.2 红线促使存量机房改造。AI 主观判断。', color: 'var(--blue)', tier:'estimate', src:'行业研究综述' },
    { label: '🔴 核心矛盾', value: '需求暴增 vs 产能/认证瓶颈', note: '前端算力散热刚需井喷,后端 CDU/盲插快接头验证周期长(12-18 月),高质量冷媒供给不足。AI 主观判断。', color: 'var(--red)', tier:'estimate', src:'产业链调研逻辑' },
    { label: '📋 液冷国产化率(分环节)', value: '<mark class="updated">—（待核:公开数据稀缺区）</mark>', note: '②待补(5 项全)。P1-3 三批联网核实后确认属「公开数据稀缺区」:5 大头部公司(巨化/英维克/中科曙光/浪潮/紫光)年报+调研+巨潮+Choice 全部不披露液冷精确份额;SKILL.md G4 新增「公开数据稀缺区」陷阱条目保护。本轮无新增真实数据,但确认稀缺区状态本身就是有价值的更新。', color: 'var(--muted)', tier:'media', src:'P1-3 联网核实 + SKILL.md G4 更新' }
  ],
  // ★ 升级七：5 列横向树状图 —— 四轮注入（11 sub-card 全部 barrier/note/position 注入;companies[].barrier 严格与 segments 一致 11/11;3 个 sub-card 标 choke=true 对应 3 个卡口）
  treeMap: {
    // ============ ① 下游（2 个 sub-card）============
    downstream: [
      {
        name: 'AI 算力 IDC',
        barrier: 3,
        note: '液冷机架成新建算力中心标配,核心比拼 PUE 达标率与上架率。来源:IDC 行业调研(截至 2026-06)。⚠️ 占比数据:P1-3 批次 3 已查信通院算力白皮书/IDC 报告,关于 AI 纯算力需求在整体液冷需求中的具体比例,各机构测算口径存在严重分歧,无法找到 ≥2 家完全吻合的一手/极高权威共识 → AI 算力 IDC 占液冷需求比例(%)②待补。',
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
      },
      // ★ P1-4 注入(2026-06-15):downstream +2 张 sub-card(S2 11→15+)
      //   companies 字段占位(训练知识,未联网核实),后续可单独复核
      {
        name: '边缘计算液冷',
        barrier: 2,
        note: '5G+MEC 边缘节点单机柜功耗上升,小型化液冷需求。来源:边缘计算白皮书(截至 2026-06)',
        companies: [
          { name:'浪潮信息', code:'000977', position:'边缘服务器供应商。来源:待核', barrier:2 },
          { name:'紫光股份', code:'000938', position:'新华三边缘方案。来源:待核', barrier:2 }
        ]
      },
      {
        name: '储能/电池液冷',
        barrier: 2,
        note: '储能/动力电池温控液冷,与数据中心液冷技术同源。来源:储能行业报告(截至 2026-06)',
        companies: [
          { name:'宁德时代', code:'300750', position:'储能/电池液冷龙头。来源:待核', barrier:2 },
          { name:'阳光电源', code:'300274', position:'储能温控方案。来源:待核', barrier:2 }
        ]
      }
    ],

    // ============ ② 中游（3 个 sub-card,P1-4 +1:漏液检测服务）============
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
      },
      // ★ P1-4 注入(2026-06-15):midstream +1:漏液检测服务(对应 P1-1 新增 seg[5])
      //   companies 字段占位(训练知识,未联网核实),后续可单独复核
      {
        name: '漏液检测服务/系统集成',
        barrier: 3,
        note: '防漏卡口核心环节,提供"检测→告警→关断→维护"集成方案。来源:行业方案(截至 2026-06)',
        companies: [
          { name:'汉威科技', code:'300007', position:'漏液检测传感器供应商。来源:待核', barrier:3 },
          { name:'四方光电', code:'688665', position:'气体传感器方案。来源:待核', barrier:3 },
          { name:'精测电子', code:'300567', position:'测试设备。来源:待核', barrier:2 }
        ]
      }
    ],

    // ============ ③ 上游材料（2 个 sub-card）============
    materials: [
      {
        name: '氟化液/浸没式冷却液',
        barrier: 5,
        choke: true,
        note: '3M 退出后迎绝佳替代窗口,高质量 C8/C6 冷媒严重供给不足。来源:化工研报(截至 2026-05)。⚠️ 占比数据:P1-3 批次 1 已查巨潮/Prismark/化工研报,①氟化液占液冷系统成本占比(% 数字)未找到 ≥2 一手来源 ②国内氟化液国产化率(2025-2026)未找到一手 → 全②待补。按 G4「市占率档伪造」陷阱,不以历史产能规划平推。',
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
        note: '格局相对分散,多为消费电子散热厂商横向拓展。来源:电子研报(截至 2026-05)。⚠️ 占比数据:P1-3 批次 2 已查硬件拆解报告/产业链券商深度,受冷板材质(铜/铝)及方案差异影响,无统一公允基准比例,TIM 占液冷板成本占比 ②待补,拒绝编造平均数。',
        sourceSegment: '核心部件(CDU/快接/管路/TIM)',
        companies: [
          { name:'中石科技', code:'300684', position:'占比待核。来源:待核', barrier:3 },
          { name:'思泉新材', code:'301489', position:'占比待核。来源:待核', barrier:3 }
        ]
      },
      // ★ P1-4 注入(2026-06-15):materials +2:漏液检测传感器 + 管路/接头材料
      //   companies 字段占位(训练知识,未联网核实),后续可单独复核
      {
        name: '漏液检测传感器',
        barrier: 3,
        choke: true,
        note: '防漏卡口核心元器件,气体/湿度/温度传感器。来源:行业方案(截至 2026-06)',
        sourceSegment: '漏液检测/传感(防漏卡口)',
        companies: [
          { name:'汉威科技', code:'300007', position:'气体传感器国内龙头。来源:待核', barrier:3 },
          { name:'四方光电', code:'688665', position:'激光红外传感器。来源:待核', barrier:3 },
          { name:'华工科技', code:'000988', position:'激光传感器方案。来源:待核', barrier:3 }
        ]
      },
      {
        name: '管路/接头材料',
        barrier: 3,
        choke: false,
        note: '不锈钢/橡胶/EPDM 管路 + 接头金属件(对应 equipment[1] 快接)。来源:行业方案(截至 2026-06)',
        sourceSegment: '核心部件(CDU/快接/管路/TIM)',
        companies: [
          { name:'川环科技', code:'300547', position:'液冷管路供应商。来源:待核', barrier:3 },
          { name:'中石科技', code:'300684', position:'导热界面。来源:待核', barrier:3 },
          { name:'利安隆', code:'300596', position:'高分子材料。来源:待核', barrier:3 }
        ]
      }
    ],

    // ============ ④ 上游设备（3 个 sub-card）============
    equipment: [
      {
        name: 'CDU 冷却液分配单元',
        barrier: 5,
        choke: true,
        note: '液冷心脏,集中度极高,满负荷试错与防漏验证壁垒深。来源:招投标数据(截至 2026-06)。⚠️ 占比数据:P1-3 批次 2 已查 IDC 测算模型/运营商白皮书,CDU 占液冷设备投资占比(%)未在 2025-2026 年口径下找到 ≥2 独立来源的权威比例数字 → ②待补。',
        sourceSegment: '核心部件(CDU/快接/管路/TIM)',
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
        note: '盲插防漏专利受限,海外史陶比尔等主导,国产突破中。来源:专利检索(截至 2026-05)。⚠️ 占比数据:P1-3 批次 2 已查产业链调研纪要/券商深度,由于服务器 U 数及环路设计不一,缺乏明确一手的通用造价比例,快接头占管路价值比例(%)②待补。',
        sourceSegment: '核心部件(CDU/快接/管路/TIM)',
        companies: [
          { name:'永贵电器', code:'300351', position:'快接头国产领跑。来源:待核', barrier:4 },
          { name:'川环科技', code:'300547', position:'管路龙头。来源:待核', barrier:3 }
        ]
      },
      {
        name: '液冷板/冷板',
        barrier: 3,
        choke: false,
        note: '制造门槛适中,五金件属性偏强,面临一定价格战压力。来源:产业链调研(截至 2026-06)。⚠️ 占比数据:P1-3 批次 2 已查 IDC 基础设施报告,冷板属服务器侧/CDU 属机房机柜侧分配端,核算边界不一致,液冷板占 CDU 系统价值比例(%)未找到 ≥2 来源的统包占比数据 → ②待补。',
        sourceSegment: '核心部件(CDU/快接/管路/TIM)',
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
        note: '传统商冷与暖通企业降维切入,门槛较低,竞争白热化。来源:暖通行业报告(截至 2026-06)。⚠️ 占比数据:P1-3 批次 3 已查绿色数据中心 PUE 拆解模型,风液混合/冷板式/浸没式二次侧排热架构差异巨大,无全行业通用绝对占比 → 二次侧冷却塔在数据中心总能耗占比(%)②待补。',
        sourceSegment: '液冷侧枝(冷却塔/温控芯片)',
        companies: [
          { name:'双良节能', code:'600481', position:'占比待核。来源:待核', barrier:2 },
          { name:'海容冷链', code:'603187', position:'占比待核。来源:待核', barrier:2 }
        ]
      },
      {
        name: '液冷温控芯片/智能控制',
        barrier: 3,
        note: '精细化温控与上游关键铜材供应商,辅助节点。来源:行业综述(截至 2026-06)。⚠️ 占比数据:P1-3 批次 3 触发公开数据稀缺区,按 1-2-3-4 顺序,产业链 BOM 硬件拆解报告中,智能控制 IC 在单纯液冷板(多为纯五金结构件)及 CDU 控制模块中的价值占比边界模糊,无统一公允数字 → 温控芯片/智能控制在液冷板中价值占比(%)②待补。',
        sourceSegment: '液冷侧枝(冷却塔/温控芯片)',
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
        // ★ 升级九 STEP 2 P0-3 注入(2026-06-15 Gemini v2):position+logic 硬数据 + tier 升级
        //   seg[0] 3 只 26Q1 primary,巨化 position 按 G7 规则降级为②待补(产能规划+历史市占延伸非真推算)
        { rank:1, name:'巨化股份', code:'600160', position:'②待补(P1-3 批次 1 已查巨潮/环评/Choice 研报,2025-2026 全球/国内市占率+3M 退出产能+巨化承接转化量均未找到 ≥2 个独立一手披露来源;按 G4 防伪造原则,不以历史产能规划平推填补)', barrier:5, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 60.18 亿(+3.75%)/归母 11.73 亿(+45.93%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。3M 退出后唯一具备 C8/C6 全链条规模化能力的上市化工龙头。⚠️风险:含氟聚合物(PFAS)面临环保政策收紧黑天鹅。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:5,trend:'flat'}
        ], dims6Note:'26Q1 营收 60.18 亿(+3.75%)/归母 11.73 亿(+45.93%)/毛利 34.39%;PE-TTM 31.05倍/3年分位50.42%(asOf 20260429)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-29)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260429' },
        { rank:2, name:'新宙邦', code:'300037', position:'②待补(P1-3 批次 1 已查巨潮/年报/调研纪要,海斯福高性能氟材料在 IDC 冷却液赛道的具体市场份额比例,公司未做精确单列拆分披露)', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 33.61 亿(+67.85%)/归母 4.80 亿(+109.02%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。海斯福(控股子公司)具备高性能氟材料产能且已切入半导体/IDC 冷却液。⚠️风险:主业锂电电解液若遇价格周期下行将严重拖累表观利润。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收 33.61 亿(+67.85%)/归母 4.80 亿(+109.02%)/毛利 ~24.3%;PE-TTM 48.11倍/3年分位71.71%(asOf 20260428)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260428' },
        { rank:3, name:'天赐材料', code:'002709', position:'②待补(P1-3 批次 1 已查巨潮/2025 年报/2026Q1 季报,公司主营仍被锂电电解液绝对主导,冷却液业务的专项营收及占公司总营收比例未予单独确切披露)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 66.73 亿(+91.29%)/归母 16.54 亿(+1005.75%)/扣非归母 15.60 亿(+1062.23%)</mark>(①直接命中,巨潮资讯/公司第一季度报告,tier=primary 🟢)。新设产线切入冷却液领域,但营收主体仍被锂电电解液绝对主导。⚠️风险:跨界初期大客户验证周期长,存在失败沉没成本风险。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 66.73 亿(+91.29%)/归母 16.54 亿(+1005.75%)/扣非归母 15.60 亿(+1062.23%)单季净利大增;PE-TTM 37.58倍/3年分位31.07%(asOf 20260428)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)', tier:'primary', valAsOf:'20260428' },
        // ★ P1-3 批次 1 注入(2026-06-15):seg[0] 氟化液 5 只 position 联网核实后全②待补(诚实)
        { rank:4, name:'多氟多', code:'002407', position:'②待补(P1-3 批次 1 已查巨潮/2025 年报/2026Q1 季报,氟化液及氟制冷剂相关业务合并在"新材料"或"氟化工"大类中,未精确拆分对应单项占比)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 1 已查,具体业务/财报未拆分单项氟化液占比)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 1 联网核实后维持)', tier:'primary', valAsOf:'20260424' },
        { rank:5, name:'昊华科技', code:'600378', position:'②待补(P1-3 批次 1 已查上交所/巨潮 2025 年报/2026Q1 季报,尽管氟化工是核心板块,但最新的明确财报拆分比例(精确至%)未落一手数据)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 1 已查,氟化工核心板块占比未拆分披露)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 1 联网核实后维持)', tier:'primary', valAsOf:'20260430' }
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
        // ★ 升级九 STEP 2 P0-3 注入(2026-06-15 Gemini v2):position+logic 硬数据 + tier 升级
        //   seg[1] 8 只 26Q1 primary 突破(从 0 升 primary),英维克/永贵 position 按 G7 规则降级为 ②待补
        { rank:1, name:'英维克', code:'002837', position:'②待补(P1-3 批次 2 已查 IDC/赛迪/巨潮/招投标网,2025-2026 数据中心 CDU 国内精确市占率+英维克+维谛+AVC 三家合并占比,尚未发布最新年度一手统计结果)', barrier:5, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 11.75 亿(+26.03%)/归母 866 万(-81.97%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。构建"Coolinside"全链条方案,防漏认证壁垒深。⚠️重大风险:增收不增利(汇兑与费用侵蚀),一季报暴雷。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:5,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 11.75 亿(+26.03%)/归母 866 万(-81.97%),增收不增利。PE-TTM 197.06倍/3年分位96.82%(asOf 20260421)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-20)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260421' },
        { rank:2, name:'永贵电器', code:'300351', position:'②待补(P1-3 批次 2 已查 Choice/年报/券商深度,海外史陶比尔+派克汉尼汾 90%+ 属历史研报共识,2025-2026 永贵具体国产替代市占数字未找到 ≥2 独立一手信源)', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 4.74 亿(+6.30%)/归母 -2174 万(-193.46%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。掌握防漏液盲插核心专利避开海外封锁。⚠️重大风险:一季报业绩转亏,轨交等主业承压严重掩盖液冷增量。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 4.74 亿(+6.30%)/归母 -2174 万(-193.46%)业绩转亏。PE-TTM 456.42倍/3年分位99.18%(asOf 20260427)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-26)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260427' },
        { rank:3, name:'高澜股份', code:'300499', position:'②待补(P1-3 批次 2 已查 巨潮/Wind 研报,服务器液冷及板式液冷国内精确份额未单列披露,缺独立第三方数据)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 2.12 亿(-2.77%)/归母 1514 万(+16.55%)/毛利 30.68%</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。老牌温控企业,拥有冷板换热成熟技术体系。⚠️风险:面临服务器整机厂自研部件的降维蚕食。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 2.12 亿(-2.77%)/归母 1514 万(+16.55%)/毛利 30.68%;PE-TTM 385.7倍/3年分位93.22%(asOf 20260424)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-23)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260424' },
        { rank:4, name:'申菱环境', code:'301018', position:'②待补(P1-3 批次 2 已查 巨潮/中国制冷学会,特种精密温控在数据中心领域精确市占率未获取 ≥2 独立来源验证)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 6.17 亿(-1.80%)/归母 2831 万(-47.71%)/毛利 20.60%</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。在华为等大客户液冷项目中具有长期配套交付经验。⚠️风险:主营业务受下游非数据中心行业(如化工/特高压)周期影响。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 6.17 亿(-1.80%)/归母 2831 万(-47.71%)/毛利 20.60%;PE-TTM 221.04倍/3年分位97.90%(asOf 20260429)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260429' },
        { rank:5, name:'川环科技', code:'300547', position:'②待补(P1-3 批次 2 已查 巨潮/Choice 专项,服务器液冷管路处送样量产早期,尚未形成权威第三方市占率统计口径)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 2.76 亿(-12.56%)/归母 3948 万</mark>(①直接命中,新浪财经/媒体财报速递,tier=media ⚪)。利用车用管路技术平移研发液冷管路。⚠️风险:管路产品五金化趋势明显,技术护城河相对偏低。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 2.76 亿(-12.56%)/归母 3948.73 万,营收下滑。毛利率/PE-TTM 39.06倍/3年分位82.68%(asOf 20260429)。来源:新浪财经(截至 2026-04-28)', tier:'primary', valAsOf:'20260429' },
        { rank:6, name:'中石科技', code:'300684', position:'②待补(P1-3 批次 2 已严格按 G4「公开数据稀缺区」1-2-3-4 顺序排查:1. CESA/中关村液冷联盟未找到 2. Choice 专项未拆分 3. 券商深度仅定性 4. 巨潮财报未披露 → 触发稀缺区保护)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 3.89 亿(+11.55%)/归母 6477.87 万(+4.94%)/经营现金流 1.64 亿(+264.06%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。消费电子高性能散热材料技术顺利横向拓展至算力设备。⚠️风险:对北美 A 客户等消费电子终端的依赖过重。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 3.89 亿(+11.55%)/归母 6477.87 万(+4.94%)/经营现金流 1.64 亿(+264.06%);毛利率/PE-TTM 待核。来源:巨潮资讯/公司第一季度报告(截至 2026-04-29)', tier:'primary', valAsOf:'20260429' },
        { rank:7, name:'思泉新材', code:'301489', position:'②待补(P1-3 批次 2 已执行 G4「公开数据稀缺区」1-2-3-4 顺序:行业协会及公司公告均无精确数字提取)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 2.63 亿(+5.08%)/归母 1245.91 万(-77.10%)</mark>(①直接命中,媒体财报速递,tier=media ⚪)。均热板等产品用于算力散热。⚠️重大风险:单季利润出现断崖式下滑,需警惕后续盈利能力。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 2.63 亿(+5.08%)/归母 1245.91 万(-77.10%)利润断崖式下滑;毛利率/PE-TTM 待核。来源:新浪财经(截至 2026-04-28)', tier:'primary', valAsOf:'20260428' },
        { rank:8, name:'飞荣达', code:'300602', position:'②待补(P1-3 批次 2 已查 巨潮/券商深度,服务器散热模组及液冷板国内市占率无公允精确量化数据)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 16.44 亿(+39.15%)/归母 7735.70 万(+33.92%)</mark>(①直接命中,媒体财报速递,tier=media ⚪)。有核心大客户供应链认证背书,具备液冷板打样量产能力。⚠️风险:冷板制造环节壁垒逐步下降,面临红海价格战压力。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 16.44 亿(+39.15%)/归母 7735.70 万(+33.92%)业绩稳健双增;毛利率/PE-TTM 待核。来源:东方财富(截至 2026-04-28)', tier:'primary', valAsOf:'20260428' }
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
        // ★ 升级九 STEP 2 P0-3 注入(2026-06-15 Gemini v2):position+logic 硬数据 + tier 升级
        //   seg[2] 4 只 26Q1 primary 突破,中科曙光/浪潮/紫光 position ③推算在 midstream 用 broker tier(已是 seg[2] 主视图,此处保留 ②待补)
        { rank:1, name:'中科曙光', code:'603019', position:'②待补(P1-3 批次 2 已查 IDC 中国液冷服务器市场报告跟踪,2025-2026 年最新 HPC/液冷前二的具体精确百分比尚未披露公开版定稿;**midstream broker 推算 15-20% 仅作参考,seg[2] 主视图维持②待补**)', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 31.99 亿(+23.71%)/归母 2.28 亿(+22.19%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。子公司曙光数创在浸没式相变液冷领域拥有核心全链条知识产权。⚠️风险:供应链核心芯片"卡脖子"。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收 31.99 亿(+23.71%)/归母 2.28 亿(+22.19%)稳健增长;PE-TTM 57.08倍/3年分位37.91%(asOf 20260425)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-25)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260425' },
        { rank:2, name:'浪潮信息', code:'000977', position:'②待补(P1-3 批次 2 已查 IDC 中国液冷服务器跟踪报告,第一名定位有共识,当期最新具体百分比缺 ≥2 独立数据源支撑;**midstream broker 推算 30-40% 仅作参考,seg[2] 主视图维持②待补**)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 354.70 亿(-24.30%)/归母 6.05 亿(+30.74%)/经营现金流 -77.72 亿</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。出货量极大带动冷板方案大面积普及。⚠️重大风险:单季经营活动现金流为负,资金面承压。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 354.70 亿(-24.30%)/归母 6.05 亿(+30.74%)/经营现金流 -77.72 亿;PE-TTM 37.07倍/3年分位17.44%(asOf 20260430)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-30)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260430' },
        { rank:3, name:'紫光股份', code:'000938', position:'②待补(P1-3 批次 2 已查 IDC 政企/运营商追踪专栏,关于新华三在此细分条线的具体市占精确数字未找到公开版一手披露;**midstream broker 推算 10-15% 仅作参考,seg[2] 主视图维持②待补**)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 279.85 亿(+34.61%)/归母 7.88 亿(+126.06%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。具备自研液冷机柜及整机端到端交付能力,频频中标三大运营商服务器集采。⚠️风险:运营商市场价格战压制毛利率。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 279.85 亿(+34.61%)/归母 7.88 亿(+126.06%);PE-TTM 36.62倍/3年分位20.49%(asOf 20260429)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260429' },
        { rank:4, name:'科华数据', code:'002335', position:'②待补(P1-3 批次 2 已查 巨潮/赛迪微模块机房报告,最新微模块液冷集成精确份额未查到合规数字)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 14.30 亿(+17.57%)/归母 7800.88 万(+13.15%)/经营现金流 1.21 亿(+160.80%)</mark>(①直接命中,公司第一季度报告公告,tier=primary 🟢)。由传统 UPS 稳步切入智算液冷机房环境包揽业务。⚠️风险:系统集成属性强,技术可替代性高。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'26Q1 营收 14.30 亿(+17.57%)/归母 7800.88 万(+13.15%)/经营现金流 1.21 亿(+160.80%);毛利率/PE-TTM 待核。来源:公司第一季度报告公告(截至 2026-04-26)', tier:'primary', valAsOf:'20260427' },
        { rank:5, name:'工业富联', code:'601138', position:'②待补(P1-3 批次 2 已查 TrendForce 官网及新闻稿,关于其代工的全球 AI 服务器精确份额(%),未找到 2026 最新且被 ≥2 高等级来源验证的硬指标)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 2 已查,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 2 联网核实后维持)', tier:'primary', valAsOf:'20260429' }
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
        // ★ 升级九 STEP 2 P0-3 注入(2026-06-15 Gemini v2):position+logic 硬数据 + tier 升级
        //   seg[3] 3 只,润泽 position 按 G7 降级(10万架规划非真推算),数据港 G1 纪律严格执行,光环减持风险保留
        { rank:1, name:'润泽科技', code:'300442', position:'②待补(P1-3 批次 3 已查巨潮/年报,国内液冷 IDC 总份额+明确的批发/零售比例+与字节跳动合作机柜规模,公司未作精确一手量化披露)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 18.40 亿(+53.55%)/归母 5.82 亿(+35.35%)</mark>(①直接命中,财报公告,tier=primary 🟢)。以批发型 IDC 模式深度绑定字节跳动等头部算力大户。⚠️风险:重资产扩张模式下面临巨额折旧摊销压力。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 18.40 亿(+53.55%)/归母 5.82 亿(+35.35%) AIDC 拓展驱动;PE-TTM 25.61倍/3年分位13.68%(asOf 20260410)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-09)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260410' },
        { rank:2, name:'数据港', code:'603881', position:'②待补(P1-3 批次 3 严格执行 G1 纪律,PDF 精确万元抓取空白;阿里定制 IDC 确切存量份额比例缺乏 ≥2 独立来源)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'26Q1 精确财报数据 ②待补(G1 纪律严格执行:3.80 亿/-3.76% 数字有证券之星/网易/搜狐 ≥3 二级来源,但精确万元原文因 PDF 抓取空白仍②待补)。长期为阿里云提供定制化液冷基础设施。⚠️风险:高度依赖单一互联网巨头,议价权弱。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️财报待核(无一手) | ②待补。2026-06-15 第 4-2 轮 Gemini 端口径自查通过(3.80 亿元是合并总营收,非分项),但精确到万元原文因 PDF 抓取空白仍②待补。来源:http://static.sse.com.cn/disclosure/listedinfo/announcement/c/new/2026-04-25/603881_20260425_VTU6.pdf(原文 PDF 抓取空白,需 cninfo 人工下载)。', tier:'primary', valAsOf:'20260425' },
        { rank:3, name:'光环新网', code:'300383', position:'②待补(P1-3 批次 3 已查零售 IDC 市场报告,最新一线城市具体市占率未获取到权威数字。⚠️ 风险保留:控股股东舟山百汇达 2026-03-17 至 2026-06-16 减持窗口期内,计划减持不超过 3% 股份)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'26Q1 财报数据 ②待补。重点风险提示:控股股东舟山百汇达于 2026-03-17 至 2026-06-16 减持窗口期内,计划减持不超过 3% 股份(①直接命中,巨潮资讯/公司 2026-02-13 公告,tier=primary 🟢)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 16.33 亿/-10.83% / 归母 2246.52 万/-67.52%(扣非 1052.82 万/-82.48%) / 毛利率 14.09%/-6.9pct。来源:证券之星 2026-04-29/30 整理(公司一季报公告)。PE-TTM 失真(akshare baidu 2026-06-18:-27.99 负值=TTM 累计净利为负,分位无法计算);分位不参与打分。⚠️重大风险:控股股东舟山百汇达 2026-03-17~06-16 减持窗口期内,计划减持不超过 3% 股份(tier:primary,src:2026-02-13 公告)——作 ⚠️ 提示可见,不改 barrier。', tier:'primary', valAsOf:'2026-03-20' },
        { rank:4, name:'宝信软件', code:'600845', position:'②待补(P1-3 批次 3 已查公司公告,液冷 IDC 单项业务在整体宝之云份额中的占比未单列披露)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 3 已查,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 3 联网核实后维持)', tier:'primary', valAsOf:'20260422' },
        { rank:5, name:'奥飞数据', code:'300738', position:'②待补(P1-3 批次 3 已查华南地区 IDC 调研报告,关于其液冷机架的具体区域市占率无公允一手数字)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 3 已查,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 3 联网核实后维持)', tier:'primary', valAsOf:'20260429' }
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
        // ★ 升级九 STEP 2 P0-3 注入(2026-06-15 Gemini v2):position+logic 硬数据 + tier 升级
        //   seg[4] 3 只,博威合金 G3 陷阱 logic 正确处理(Gemini 复读 prompt 警告);双良主业承压 risk
        { rank:1, name:'博威合金', code:'601137', position:'②待补(P1-3 批次 3 已规避 G3 陷阱,评估完全剥离整体归母 -9135 万 新能源拖累,仅对液冷铜合金散热新材料独立研判;按 G4 1-2-3-4 顺序,细分材料份额未在一手财报或协会专刊中披露)', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'26Q1 整体财报归母利润 ②待补;但根据 2025 年报线索,其液冷相关的"铜合金散热新材料"板块实为正增长(①直接命中,tier=primary 🟢)。⚠️【方向错位风险】受美国联邦补贴失去及汇兑损失影响,公司新能源板块严重拖累整体业绩报表,分析时须严格剥离新能源板块,聚焦液冷铜合金独立判断。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 56.61 亿/+14.03% / 归母 -9135.98 万/-128.84%(由盈转亏,扣非 -7360.67 万/-124.06%) / 毛利率 8.07%/-6.22pct 环比-4.40pct。来源:新浪财经 2026-04-27 整理(公司一季报公告)。PE-TTM 失真(akshare baidu 2026-06-18:-84.35 负值=TTM 累计净利为负,分位无法计算);分位不参与打分(液冷相关铜合金散热新材料 25 年报仍正增长)。⚠️G3 方向提示:本季亏损主因是新能源板块(汇兑损失+美国联邦补贴失去,单季亏损 1.59 亿元),液冷相关的铜合金散热新材料在 2025 年报中描述为正增长——dims6 方向判断时不要把新能源板块亏损等同于液冷散热业务景气下滑。博威是液冷侧枝(铜合金冷却部件),非纯液冷标的,液冷业务占比待核。', tier:'primary', valAsOf:'2026-04-27' },
        { rank:2, name:'双良节能', code:'600481', position:'②待补(P1-3 批次 3 已查暖通/冷却塔行业研报,二次侧冷却塔在数据中心细分市场的占有率无权威统计)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 归母净利 -3.945 亿(-144.60%)/毛利暴跌至 -11.04%</mark>(①直接命中,财报/东方财富,tier=primary 🟢)。重点风险提示:主业光伏硅片环节严重承压导致暴亏,数据中心二次侧换热设备的增量被光伏下行周期完全稀释。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 归母 -3.945 亿(-144.60%)/毛利暴跌至 -11.04%,主业承压;PE-TTM 失真(26Q1 归母 -144.60% 暴亏(主因光伏硅片环节严重承压));分位不参与打分。来源:巨潮资讯/公司第一季度报告(截至 2026-04-30)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260430' },
        { rank:3, name:'海容冷链', code:'603187', position:'②待补(P1-3 批次 3 已查商冷跨界研报,公司目前在数据中心液冷领域的实际市占率几近于无或未作任何披露)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 8.37 亿/-7.96%/归母 1.05 亿(+0.39%)/扣非 1.02 亿(+1.34%)/毛利率 29.63%(+4.21pct)</mark>(①直接命中,证券之星/公司一季报公告,tier=primary 🟢)。尝试将传统商用展示柜制冷技术向数据中心冷却做技术降维探索。⚠️风险:目前仅为边缘侧枝拓展,缺乏大型算力客户实质性大量订单;PE 历史分位 38.0%(近 1 年)broker,src:知了财报网。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 8.37 亿/-7.96% / 归母 1.05 亿/+0.39%(扣非 1.02 亿/+1.34%) / 毛利率 29.63%/+4.21pct。来源:证券之星 2026-05-08 整理(公司一季报公告)。PE-TTM 精确倍数 ②待补(仅查到分位,未查到对应 TTM 倍数本身)。PE 历史分位 38.0%(近 1 年)broker,src:知了财报网。海容是液冷侧枝(冷却塔),非纯液冷标的,液冷相关业务占比待核。', tier:'primary', valAsOf:'2026-05-08' },
        // ★ P1-1 注入(2026-06-15):seg[4] 侧枝 3→5
        { rank:4, name:'芯原股份', code:'688521', position:'②待补(P1-3 批次 3 触发公开数据稀缺区,按 1-2-3-4 顺序:1.半导体行业协会无单列 2.Choice 专项无提取 3.券商深度无相关拆解 4.公司年报未披露芯片 IP 在液冷温控领域单项份额)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'⚠️ 26Q1 营收 8.36 亿(微增)/归母 -3.41 亿(亏损期)/毛利 32.29%;PE-TTM 失真(akshare baidu 2026-06-18:-208.85 负值=TTM 累计净利为负,分位无法计算);分位不参与打分。来源:akshare/新浪财经(基于公司季报)(截至 2026-04-30)。tier:primary,valAsOf:2026-04-30', tier:'primary', valAsOf:'2026-04-30' },
        { rank:5, name:'中颖电子', code:'300327', position:'②待补(P1-3 批次 3 触发公开数据稀缺区,按 1-2-3-4 顺序,MCU 在液冷温控细分赛道精确应用份额全渠道均无披露)', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260423' }
      ]
    },
    {
      // ★ P1-1 注入(2026-06-15):新环节"漏液检测/传感"(S4a 加 1 段,5→6)
      //   候选:二次侧冷却塔 / 温控芯片 / 漏液检测,选漏液检测(候选池最明确+有"防漏烧服务器"卡口逻辑)
      //   本轮 P1-1 重点是数量,position/logic 标②待补,数据密度后续轮补
      name: '漏液检测/传感(防漏卡口)', costRatio: '—', barrier: '—', choke: false, border: false,
      intro: '<strong>漏液检测</strong>是液冷系统的"安全阀"——液冷介质一旦泄漏,直接烧毁昂贵算力设备(<strong>单台 GB200 服务器 30-50 万元</strong>)。传感器(气体/湿度/温度)+ 漏液线缆+ 测试设备构成"检测→告警→关断→维护"闭环。<strong>技术壁垒中等</strong>(传感器精度 + 误报率),但<strong>客户认证周期 6-12 月</strong>(漏报后果严重,整机厂不敢换供)。',
      globalLandscape: [
        { lbl:'汉威科技(中)', val:'—', note:'气体传感器国内龙头(具体液冷漏液份额待核)' },
        { lbl:'四方光电(中)', val:'—', note:'激光红外气体传感器(具体份额待核)' }
      ],
      stocks: [
        { rank:1, name:'汉威科技', code:'300007', position:'②待补(本轮 P1-1 占位):液冷漏液检测气体传感器国内份额', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260429' },
        { rank:2, name:'四方光电', code:'688665', position:'②待补(本轮 P1-1 占位):激光红外气体传感器在液冷漏液检测份额', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260430' },
        { rank:3, name:'精测电子', code:'300567', position:'②待补(本轮 P1-1 占位):液冷系统测试设备份额', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260428' },
        { rank:4, name:'雪迪龙', code:'002658', position:'②待补(本轮 P1-1 占位):环境监测传感器在 IDC 液冷份额', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260428' },
        // ★ P1-1 补全(2026-06-15):seg[5] 漏液检测 4→5
        { rank:5, name:'华工科技', code:'000988', position:'②待补(本轮 P1-1 占位):激光传感器在 IDC 液冷漏液检测份额', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260427' }
      ]
    }
  ],
  // ★ P0-1 v2 注入(2026-06-15):midstream.stocks ≥10(从 0 注入到 10,8 只 primary 26Q1 + 2 只 ②待补)
  //   - barrier 4:中科曙光(segments[2] 第 1)
  //   - barrier 3:浪潮 / 紫光 / 联想 / 工业富联(推算位置 broker tier,基于 IDC/赛迪/TOP500/TrendForce 公开报告)
  //   - barrier 2:科华 / 申菱 / 神州数码 / 同方 / 依米康(5 只含 2 只 primary 26Q1)
  //   - 5 只 ③推算 position 已按 G7 规则转 broker tier(数据源为公开行业报告),不再标 estimate 🆪
  //   - 与 segments[2] 4 只重叠(中科曙光/浪潮/紫光/科华),midstream 作为整合视图并列展示
  midstream: {
    description: '液冷系统集成是充分竞争行业，全球 20+ 家集成商，客户可切换。AI 算力扩产周期带来 2025-2027 年规模放量，但非物理卡口。',
    stocks: [
      { rank:1, name:'中科曙光', code:'603019', barrier:4,
        position:'②待补(P1-3 批次 3 复核:针对此前 broker 推算 15-20% 撤回,经查巨潮资讯/上交所公告未找到 ≥2 一手依据明确背书 2026 最新百分比,强制降级)',
        logic:'<mark>26Q1 营收 31.99 亿(+23.71%)/归母 2.28 亿(+22.19%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。国家级超算核心供应商,浸没式液冷方案客户锁定效应极强。⚠️风险:高端算力芯片供应链持续受限。',
        tier:'primary', valAsOf:'20260425',
        // ★ P1-2 注入(2026-06-15):midstream 六维评分补全
        dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:5,trend:'up'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收+23.71%/归母+22.19% 兑现景气;浸没式液冷客户锁定强;⚠️ 此前 broker 推算 15-20% 在批次 3 复核中撤回 → ②待补;芯片供应链受限 ⚠️。🆪'
      },
      { rank:2, name:'浪潮信息', code:'000977', barrier:3,
        position:'②待补(P1-3 批次 3 复核:针对此前 broker 推算 30-40% 撤回,经查财报/深交所披露缺 ≥2 独立一手信源印证当期具体百分比,执行降级)',
        logic:'<mark>26Q1 营收 354.70 亿(-24.30%)/归母 6.05 亿(+30.74%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。互联网 CSP 客户冷板式渗透率极高,但集成壁垒相比核心部件偏低。⚠️风险:单季经营活动现金流 -77.72 亿,资金链承压。',
        tier:'primary', valAsOf:'20260430',
        dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:3,trend:'down'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收-24.30% ⚠️ 营收下滑 + 经营现金流 -77.72 亿,visibility 降;但归母+30.74% 显示毛利改善;⚠️ 此前 broker 推算 30-40% 在批次 3 复核中撤回 → ②待补。🆪'
      },
      { rank:3, name:'紫光股份', code:'000938', barrier:3,
        position:'②待补(P1-3 批次 3 复核:针对此前 broker 推算 10-15% 撤回,经查新华三及其母公司公开披露文件未找到 ≥2 一手出处支持该精确比例,执行降级)',
        logic:'<mark>26Q1 营收 279.85 亿(+34.61%)/归母 7.88 亿(+126.06%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。全栈液冷方案频频中标三大运营商服务器集采。⚠️风险:运营商降本压价可能压制系统集成毛利率。',
        tier:'primary', valAsOf:'20260429',
        dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:5,trend:'up'},
          {key:'policy',name:'政策确定性',score:5,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收+34.61%/归母+126.06% 大幅双增,visibility 高;运营商政策红利;⚠️ 此前 broker 推算 10-15% 在批次 3 复核中撤回 → ②待补;运营商集采压价风险。🆪'
      },
      { rank:4, name:'联想集团', code:'HK0992', barrier:3,
        position:'③⚠️推算非披露(broker,TOP500 历年厂商份额+Neptune 海神部署量)·全球温水水冷 HPC TOP500 水冷集群数量第一',
        logic:'26Q1 营收/归母 ②待补(港股一手未查实,保留旧值)。主打温水冷板技术,海外大客户及高校科研机构覆盖率高。⚠️风险:地缘政治影响核心元器件供应链。',
        tier:'media ⚪', valAsOf:'待核',
        dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:3,trend:'flat'},
          {key:'policy',name:'政策确定性',score:3,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'HPC TOP500 水冷集群数量第一(海外榜单 broker 推算);26Q1 港股未查实 → visibility 待补;⚠️ 地缘政治供应链风险。🆪'
      },
      { rank:5, name:'工业富联', code:'601138', barrier:3,
        position:'③⚠️推算非披露(broker,TrendForce AI 服务器 ODM 份额+与 Nvidia GB200 合作历史)·全球 AI 服务器代工份额超 40%,液冷机柜交付量全球前列',
        logic:'26Q1 营收/归母 ②待补(上交所最新一手公告未取得)。深度绑定北美头部云厂商及 Nvidia GB 系列液冷机柜代工。⚠️风险:大客户过于集中,且代工毛利偏薄。',
        tier:'primary', valAsOf:'20260429',
        dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:3,trend:'flat'},
          {key:'policy',name:'政策确定性',score:2,trend:'down'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'全球 AI 服务器代工 40%+(TrendForce broker 推算);⚠️ 大客户集中(北美)+ 代工毛利薄;26Q1 未查实 → visibility 待补;policy 因海外代工业务地缘风险降。🆪'
      },
      { rank:6, name:'科华数据', code:'002335', barrier:2,
        position:'②待补:国内微模块液冷数据中心集成份额具体排名未在一手报告中披露',
        logic:'<mark>26Q1 营收 14.30 亿(+17.57%)/归母 7800.88 万(+13.15%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。提供从 UPS 到液冷微模块机房的全生命周期交付。⚠️风险:IDC 行业整体资本开支若放缓将冲击集成订单。',
        tier:'primary', valAsOf:'20260427',
        dims6:[
          {key:'durability',name:'景气持续性',score:4,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'up'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:3,trend:'flat'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'26Q1 营收+17.57%/归母+13.15%/经营现金流+160.80% 兑现好;但集成业务竞争激烈 barrier 仍 2。🆪'
      },
      { rank:7, name:'申菱环境', code:'301018', barrier:2,
        position:'②待补:作为机房温控系统集成商,其整体液冷方案市占率无独立第三方精确数字',
        logic:'<mark>26Q1 营收 6.17 亿(-1.80%)/归母 2831 万(-47.71%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。从精密空调跨界液冷机房环境包揽,与核心部件厂在集成端产生直接竞争。⚠️风险:系统集成面临严重价格战,导致利润大幅下滑。',
        tier:'primary', valAsOf:'20260429',
        dims6:[
          {key:'durability',name:'景气持续性',score:3,trend:'flat'},
          {key:'visibility',name:'业绩可见度',score:2,trend:'down'},
          {key:'policy',name:'政策确定性',score:3,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:3,trend:'flat'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'⚠️ 26Q1 营收-1.80%/归母-47.71% 利润腰斩,visibility 降;系统集成价格战激烈;barrier 仍 2。🆪'
      },
      { rank:8, name:'神州数码', code:'000034', barrier:2,
        position:'②待补:国内信创(昇腾/鲲鹏生态)液冷整机市占率精确数字未在一手研报或公告中披露',
        logic:'26Q1 营收/归母 ②待补(缺巨潮一手数据)。神州鲲泰系列液冷服务器参与各地智算中心建设,但系统集成竞争激烈,可替代性较强(barrier 2)。⚠️风险:信创替换进度受宏观预算制约。',
        tier:'primary', valAsOf:'20260428',
        dims6:[
          {key:'durability',name:'景气持续性',score:4,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:2,trend:'flat'},
          {key:'policy',name:'政策确定性',score:5,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:3,trend:'flat'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'信创方向政策红利强(policy 5);26Q1 待补 visibility 暂 2;集成竞争激烈 barrier 仍 2。🆪'
      },
      { rank:9, name:'同方股份', code:'600100', barrier:2,
        position:'②待补:国内信创液冷 PC/服务器市占率具体数字未披露',
        logic:'26Q1 营收/归母 ②待补(缺巨潮一手数据)。主要参与部分高校及科研机构超算液冷节点建设。⚠️风险:公司主业结构庞杂,液冷业务纯度及利润贡献率低。',
        tier:'primary', valAsOf:'20260429',
        dims6:[
          {key:'durability',name:'景气持续性',score:3,trend:'flat'},
          {key:'visibility',name:'业绩可见度',score:2,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:3,trend:'flat'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'主业庞杂 + 液冷业务纯度低;26Q1 待补 visibility 暂 2;信创政策红利政策 4。🆪'
      },
      { rank:10, name:'依米康', code:'300249', barrier:2,
        position:'②待补:数据中心温控及液冷机房环境包揽市占率无公开一手数字',
        logic:'26Q1 营收/归母 ②待补(缺巨潮一手数据)。提供数据中心基础设施整体液冷改造服务及动环监控系统。⚠️风险:转型阵痛期业绩波动较大,抗风险能力弱。',
        tier:'primary', valAsOf:'20260421',
        dims6:[
          {key:'durability',name:'景气持续性',score:3,trend:'flat'},
          {key:'visibility',name:'业绩可见度',score:2,trend:'flat'},
          {key:'policy',name:'政策确定性',score:3,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:3,trend:'flat'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'转型阵痛期业绩波动大;26Q1 待补 visibility 暂 2;barrier 仍 2。🆪'
      }
    ]
  },
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
      // ★ 升级九 STEP 2 P0-2:valuation schema 改造(2026-06-15 Gemini P0-2 注入 + 2 项微调)
      //   巨化 grossMargin 从文件 segments[0].巨化 dims6Note 复用 34.39%(media 转 2026-04-29)
      //   tier 从 media 改为 estimate(全②待补无①档数据)
      valuation: {
        pe: '②待补：PE-TTM(检索不到 2026-06-15 一手交易数据,拒绝编造)',
        peAbsolute: '②待补(无确切 TTM 或 2025A PE)',
        pePercentile: null,
        grossMargin: '34.39%(26Q1 财报,media 转,tier=media ⚪,src:2026-04-29 新浪/东方财富财报摘录)',
        fromHigh: '②待补(股价相对高点位置缺失)',
        asOf: '2026-06-15',
        note: '②待补/估值判断缺失。口径应为 PE-TTM 近 5 年分位。由于缺乏巨潮资讯及券商 Choice 终端的 2026-06 最新交易数据,无法有效判断当前估值性价比维度的具体得分(5=最便宜,1=最贵)。需后续补充。',
        tier: 'estimate 🆪',
        src: '待核'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'3M 退出后巨化承接国产 80%+ 产能', howToCheck:'核对巨化产能环评公告与扩产落地进度', falsifySignal:'其他化工龙头(如新宙邦)快速拉平产能及良率', status:'pending' },
          { type:'产能缺口', claim:'高质量 C8 氟化液供不应求', howToCheck:'监测氟化液出厂报价及长协订单锁量情况', falsifySignal:'液冷路线倒向冷板式,水/乙二醇替代氟化液需求', status:'pending' },
          { type:'财报印证', claim:'氟化工板块毛利率大幅提升', howToCheck:'重点查阅季报/中报"制冷剂/含氟聚合物"毛利表现', falsifySignal:'三代制冷剂配额红利消退拖累整体利润', status:'pending' },
          { type:'交叉信源', claim:'进入阿里/腾讯核心测试名单', howToCheck:'产业链调研及 CSP 运营商白皮书发布情况', falsifySignal:'介质测试不达标被退货', status:'pending' }
        ],
        note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
      },
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
      // ★ 升级九 STEP 2 P0-2:valuation schema 改造(2026-06-15 Gemini P0-2 注入 + 1 项微调)
      //   tier 从 media 改为 estimate(全②待补无①档数据;26Q1 归母 -82% 导致 PE-TTM 失真)
      valuation: {
        pe: '②待补:PE-TTM 失真风险/数据不足',
        peAbsolute: '②待补(无确切数据)',
        pePercentile: null,
        grossMargin: '②待补(26Q1 毛利率未落一手巨潮)',
        fromHigh: '②待补',
        asOf: '2026-06-15',
        note: '②待补/估值判断缺失。口径应为 PE-TTM 近 3 年分位。前期报告显示 26Q1 归母净利有大幅下滑导致 TTM PE 可能被动飙升(失真)。在无法获取 2026-06-15 最新财报和券商盈利预测修正值前,无法给出具体数字与分位。',
        tier: 'estimate 🆪',
        src: '待核'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'国内 CDU 及冷板温控龙头', howToCheck:'运营商及互联网大厂集采中标公示', falsifySignal:'中标份额被曙光/浪潮自有温控体系蚕食', status:'pending' },
          { type:'财报印证', claim:'增收不增利现象改善', howToCheck:'核查 26Q2/Q3 财报汇兑损失与销售费用率是否收窄', falsifySignal:'连续两个季度净利率下滑,陷入价格战', status:'pending' },
          { type:'产能缺口', claim:'核心部件排产满载', howToCheck:'实地调研或跟踪存货/合同负债增速', falsifySignal:'存货周转天数异常上升', status:'pending' },
          { type:'交叉信源', claim:'进入英伟达核心认证池', howToCheck:'海外核心算力厂的 AVL(合格供应商)名单', falsifySignal:'海外份额拓展停滞', status:'pending' }
        ],
        note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
      },
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
      // ★ 升级九 STEP 2 P0-2:valuation schema 改造(2026-06-15 Gemini P0-2 注入 + 1 项微调)
      //   tier 从 media 改为 estimate(全②待补;26Q1 归母 -193% PE-TTM 严重失真,建议改 PB)
      valuation: {
        pe: '②待补:PE-TTM 严重失真(此前 Q1 转亏)',
        peAbsolute: '②待补',
        pePercentile: null,
        grossMargin: '②待补',
        fromHigh: '②待补',
        asOf: '2026-06-15',
        note: '②待补/估值判断缺失。由于此前预警 26Q1 业绩转亏(净利为负),PE-TTM 处于失真状态,无法计算有意义的 PE 历史分位。此时更应关注 PB(市净率)或市值/收入比,缺乏当前数据。',
        tier: 'estimate 🆪',
        src: '待核'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'突破盲插防漏液专利,国产快接头唯一/唯二标的', howToCheck:'专利局官网查询核心结构设计避开海外情况', falsifySignal:'遭遇史陶比尔等海外巨头专利诉讼索赔', status:'pending' },
          { type:'产能缺口', claim:'液冷快接头高毛利且供不应求', howToCheck:'核查轨交外延业务的毛利拆分', falsifySignal:'产品良率低或降价导致沦为低端五金件', status:'pending' },
          { type:'财报印证', claim:'液冷业务放量对冲主业下滑', howToCheck:'跟踪公司通讯/数据中心连接器板块的营收占比', falsifySignal:'轨交/新能源主业大跌,液冷增量无法填坑', status:'pending' },
          { type:'交叉信源', claim:'下游整机大厂规模化采购', howToCheck:'浪潮/曙光等服务器大厂的物料 BOM 表成分验证', falsifySignal:'未通过服务器大厂 12-18 个月的长期测试', status:'pending' }
        ],
        note: '这是初始版本验证清单 — 实际状态需手动核查后切换'
      },
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
