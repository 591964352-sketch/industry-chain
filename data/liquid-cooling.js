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
  meta: { sector:'中游', tier:'★★☆', status:'active(Phase 8 行业协会专项突破·2026-06-18·7/8 项找到·A 4 sub-card 升级含 CDU 内部成本拆解首次出现(泵 22-40%/换热器 15-25%/阀门 10-15%/传感器 2-5%/控制器 5-10%)+ 一次侧 vs 二次侧价值(冷板式一次侧 20-30%/300 美元/kW,二次侧 70-80%/600-800 美元/kW)+ 二次侧冷却塔能耗占数据中心总能耗 1.2-3.5%+ 漏液检测传感器 BOM 占比 1.5-3%/CDU 2-5%+ B supplyGap[1] rate 2026 缺口率 20-25% 首次量化突破(Phase 5/7 ❌ Phase 8 通过 CDCC + 中招联合找到)+ C 联想 Neptune 海神全球部署 8 万套/HPC TOP500 第一(169 套)/AI 服务器+50% + 工业富联液冷营收 300 亿/同比+200%/GB200 出货 4000 台/单机柜 300 万美元·液冷链数据治理圆满)', updatedAt:'2026-06-18', ltFit:true },
  // ★ 升级九 STEP 2：景气六维 —— 骨架版（6 维 score/trend/reason 全留空，标"待核"）
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:5, trend:'up', reason:'AI 算力功耗激增，Nvidia GB200/GB300 单机柜功耗远超风冷极限，液冷成为刚需。冷板式率先爆发，浸没式蓄势待发。', evidence:'待核（需补充 Nvidia GTC 2026 功耗指引或 IDC 预测；Gemini 端自查时未拿到一手）', flag:'Nvidia 新一代 GPU 功耗及液冷方案标配情况', tier:'estimate', src:'' },
      { key:'visibility', name:'业绩可见度', score:4, trend:'up', reason:'服务器集成商及 CDU 核心部件厂商已开始实质性兑现液冷订单，渗透率处于加速爬坡期。', evidence:'待核（需补充头部厂商如英维克、浪潮信息 26Q1 财报液冷收入占比）', flag:'各大 CSP 及运营商液冷服务器集采中标份额', tier:'estimate', src:'' },
      { key:'policy', name:'政策确定性', score:4, trend:'flat', reason:'国家"东数西算"及多地新规强制要求新建数据中心 PUE 降至 1.2 甚至 1.15 以下，风冷已无法达标。', evidence:'待核（需补充发改委/工信部 2025-2026 最新 PUE 强制标准文件）', flag:'老旧数据中心液冷改造补贴或强制淘汰政策', tier:'estimate', src:'' },
      { key:'supply', name:'供需紧张度', score:4, trend:'up', reason:'受 3M 退出 PFAS 生产影响，高质量氟化液存在供给缺口预期；AI 爆发导致 CDU 及快接头出现阶段性产能吃紧。', evidence:'待核（需补充 3M 产能退出进度及国产替代产能爬坡数据）', flag:'核心部件扩产周期与 AI 服务器出货周期的错配', tier:'estimate', src:'' },
      { key:'valuation', name:'估值性价比', score:2, trend:'down',
        reason:'⚠️本轮最大扣分项（3 卡口 PE-TTM 口径已 akshare baidu 2026-06-18 直读）:(1) 巨化 600160 PE-TTM 31.05 倍/3 年分位 50.42% (asOf 2026-04-29)——估值中位、合理;(2) 英维克 002837 PE-TTM 197.06 倍/3 年分位 96.82% (asOf 2026-04-21)——历史极贵、Q1 净利 -81.97% 增收不增利(汇兑+费用);(3) 永贵 300351 PE-TTM 456.42 倍/3 年分位 99.18% (asOf 2026-04-27)——历史极贵、Q1 净利 -193.46% 转亏。三只卡口平均分位 82%+,门控触发 score=2 挡掉「业绩爆表+泡沫」陷阱,等分位回踩或换环节。下钻见各卡口 valuation。',
        evidence:'akshare baidu 2026-06-18 PE-TTM + 3 年分位直读,akshare/新浪财经 26Q1 季报 2026-04 披露', flag:'3 卡口 PE 全部处历史 50%+ 分位,业绩拐点确认前不追高', tier:'broker', asOf:'2026-06-18', src:'akshare baidu PE 聚合页(2026-06-18)+ akshare/新浪财经 26Q1 季报(2026-04 披露日)' },
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
    { label: '🇨🇳 中国液冷市场全球占比', value: '中国 159.8 亿元 vs 全球 48 亿美元(口径不同)', note: 'Phase 2 2026-06-18 Gemini B 类端核实:赛迪顾问测算 2025 中国液冷数据中心市场规模 159.8 亿元人民币,Global Market Insights 估算 2025 全球数据中心液冷市场 48 亿美元。⚠️由于中美研报换算口径、计算节点及汇率差异,不可强行相除,占比 ②诚标待核(口径不可比) 🔵broker。来源:每日经济新闻 2026-06-16 + GMI 行业报告', color: 'var(--muted)', tier:'broker', src:'https://www.nbd.com.cn/articles/2026-06-16/4428252.html / https://www.gminsights.com/zh/industry-analysis/data-center-liquid-cooling-market' },
    { label: '🤖 AI 算力核心驱动', value: 'GB300 >100kW', note: 'Nvidia 新一代机柜功耗超 100kW,远超风冷极限,液冷成高密度"必选配置"。来源:IDC 2026 GTC 趋势报告(截至 2026-06)', color: 'var(--red)', tier:'broker', src:'IDC 官方博客' },
    { label: '🏭 产业阶段', value: '<mark class="updated">繁荣期(渗透加速)</mark>', note: '冷板式液冷大面积铺开,服务器厂商加速集采。AI 主观定性,非具体数字。P1-3 三批联网核实后未变(产业阶段定性本就靠综合判断,无需精确数字)。', color: 'var(--green)', tier:'estimate', src:'产业常识' },
    { label: '📐 氟化液全球市场规模(2026E)', value: '约 30 亿美元(全球电子氟化液)', note: 'Phase 4 2026-06-18 DeepSeek 智能搜索核实:全球电子氟化液市场规模约 30 亿美元🔵broker(证券时报 2025-02-28);全球氟化液市场 2024 约 30.4 亿元🔵broker(申万宏源/浙商证券 2025-08~09);全球 Fluorinated Fluid 市场 2024 4.19 亿美元/2031 预计 5.36 亿美元🔵broker(恒州诚思 2026-03-12);全球数据中心浸没式冷却液市场 2025 约 200 亿元(国内市场)。⚠️口径分歧:氟化液定义范围不同(仅电子级 vs 全场景含半导体/航空/医疗),导致市场规模从数亿美元到 200 亿元人民币不等,需进一步明确口径范围。来源:证券时报 2025-02-28 + 申万宏源/浙商证券 + 恒州诚思 2026-03-12', color: 'var(--muted)', tier:'broker', src:'https://www.stcn.com/(证券时报)/https://www.yhresearch.cn/(恒州诚思)' },
    { label: '⚡ 下一代催化', value: '浸没式商业化', note: '3M 退出倒逼国产浸没式氟化液验证加速;PUE≤1.2 红线促使存量机房改造。AI 主观判断。', color: 'var(--blue)', tier:'estimate', src:'行业研究综述' },
    { label: '🔴 核心矛盾', value: '需求暴增 vs 产能/认证瓶颈', note: '前端算力散热刚需井喷,后端 CDU/盲插快接头验证周期长(12-18 月),高质量冷媒供给不足。AI 主观判断。', color: 'var(--red)', tier:'estimate', src:'产业链调研逻辑' },
    { label: '📋 液冷国产化率(分环节)', value: '<mark class="updated">整体渗透率 45%(2026E)·分环节缺失</mark>', note: 'Phase 2 2026-06-18 Gemini B 类端核实:前瞻产业研究院预计 2026 中国液冷数据中心市场渗透率将突破 45%🔵broker(新浪财经 2026-03-04)。⚠️具体分环节(氟化液/CDU/快接/管路/液冷板/传感器)的国产化率%未找到 ≥2 一手/独立来源,公开数据稀缺区诚实标 ②诚标待核。来源:前瞻产业研究院 + 新浪财经 2026-03-04', color: 'var(--muted)', tier:'media', src:'https://finance.sina.com.cn/roll/2026-03-04/doc-inhpusks6969794.shtml' }
  ],
  // ★ 升级七：5 列横向树状图 —— 四轮注入（11 sub-card 全部 barrier/note/position 注入;companies[].barrier 严格与 segments 一致 11/11;3 个 sub-card 标 choke=true 对应 3 个卡口）
  treeMap: {
    // ============ ① 下游（2 个 sub-card）============
    downstream: [
      {
        name: 'AI 算力 IDC',
        barrier: 3,
        note: '液冷机架成新建算力中心标配,核心比拼 PUE 达标率与上架率。来源:IDC 行业调研(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):TrendForce 预测 AI 数据中心液冷渗透率从 2024 年 14% 提升至 2026 年 40%;IDC 数据显示 2026 年 Q1 液冷渗透率攀升至 28%🔵broker(TrendForce + IDC,Phase 7 DeepSeek 智能搜索核实)。⚠️注:此为"液冷渗透率"口径,不是"AI 算力 IDC 在液冷需求中占比",两个口径需明确区分。',
        companies: [
          { name:'润泽科技', code:'300442', position:'头部算力中心,占比待核。来源:待核', barrier:3 },
          { name:'光环新网', code:'300383', position:'一线城市 IDC,占比待核。来源:待核', barrier:2 },
          { name:'数据港', code:'603881', position:'阿里定制机房,占比待核。来源:待核', barrier:3 }
        ]
      },
      {
        name: 'HPC/超算中心',
        barrier: 4,
        note: '国家级超算项目驱动,浸没式液冷应用较早且成熟。来源:行业白皮书(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):高盛报告显示通用/HPC 服务器液冷渗透率:2024 年 0% → 2025 年 4% → 2026 年 6% → 2027 年 8%🔵broker(高盛研报 + 网易引述,Phase 7 DeepSeek 智能搜索核实)。⚠️增速远低于 AI 训练服务器(2027 年仍仅 8%),HPC 不是液冷主战场。',
        companies: [
          { name:'中科曙光', code:'603019', position:'超算领域龙头,份额领先。来源:待核', barrier:4 }
        ]
      },
      // ★ P1-4 注入(2026-06-15):downstream +2 张 sub-card(S2 11→15+)
      //   companies 字段占位(训练知识,未联网核实),后续可单独复核
      {
        name: '边缘计算液冷',
        barrier: 2,
        note: '5G+MEC 边缘节点单机柜功耗上升,小型化液冷需求。来源:边缘计算白皮书(截至 2026-06)。⚠️ 部分找到(Phase 7 2026-06-18 DeepSeek 智能搜索核实):液冷方案在用户侧小型化数据中心渗透率从 2023 年 8% 跃升至 2025 年 22%;功率密度超 20kW/机柜场景中液冷渗透率达 31%🔵broker(IIM 行业研究,Phase 7 DeepSeek 智能搜索核实)。⚠️口径:用户侧小型化数据中心 ≠ 5G MEC 节点,需进一步细分。',
        companies: [
          { name:'浪潮信息', code:'000977', position:'边缘服务器供应商。来源:待核', barrier:2 },
          { name:'紫光股份', code:'000938', position:'新华三边缘方案。来源:待核', barrier:2 }
        ]
      },
      {
        name: '储能/电池液冷',
        barrier: 2,
        note: '储能/动力电池温控液冷,与数据中心液冷技术同源。来源:储能行业报告(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):2023 全球液冷储能市场 40-50 亿元 → 2025 年 165 亿元 → 2026 年预计突破 320 亿元;大储项目液冷渗透率已达 92.7%,2026 年预计达 85% 以上⚪media(东方财富 2026-05-02 + 雪球 AI,Phase 7 DeepSeek 智能搜索核实)——单源 media。⚠️口径:储能液冷渗透率高 ≠ 储能在数据中心液冷中占比高,两者是不同应用场景。',
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
        note: 'AI 服务器带量提速,国内双寡头格局明显,集成端竞争激烈。来源:IDC 报告(截至 2026-05)。✅ 占比数据(Phase 4 2026-06-18 DeepSeek 智能搜索核实):2025 冷板式液冷渗透率预计超 60%;中国液冷服务器渗透率预计 2025 年达 25-30%🔵broker(2025 服务器技术全景 + 液冷服务器技术发展报告 2026-05-26);冷板式液冷 2025 市占约 63%,浸没式单相 18%/两相 9%🔵broker;冷板式液冷在数据中心应用占比超 90%🔵broker;液冷技术整体渗透率 2025 达 14.3%🔵broker(同源)。⚠️冷板式因改造成本低占据短期主流。📌**一次侧 vs 二次侧价值首次出现**(Phase 8 行业协会专项):冷板式液冷一次侧(室外)价值量占 20%-30%(约 300 美元/kW),二次侧价值量占 70%-80%(约 600-800 美元/kW)——二次侧为利润核心🔵broker(东方财富 2026-01-13 + 中信建投证券)。',
        companies: [
          { name:'浪潮信息', code:'000977', position:'服务器市占第一,占比待核。来源:待核', barrier:3 },
          { name:'中科曙光', code:'603019', position:'市占前二,自研技术优。来源:待核', barrier:4 },
          { name:'紫光股份', code:'000938', position:'新华三份额前三,占比待核。来源:待核', barrier:3 }
        ]
      },
      {
        name: '液冷数据中心/机房',
        barrier: 2,
        note: '全生命周期微模块机房交付,技术门槛适中。来源:行业测算(截至 2026-06)。✅ 占比数据(Phase 5 2026-06-18 DeepSeek 智能搜索核实·冲突解决):⚠️关键澄清:Phase 2 vs Phase 4 不是数据冲突,而是**口径不同**——①480 亿=2025 中国液冷数据中心**产业规模**(赛迪顾问 CCID 定义:含硬件、服务、集成)🔵broker;②149.4 亿=2024 中国液冷数据中心**基础设施市场规模**(IDC 报告:仅含冷板/浸没等纯硬件采购)🔵broker。两者均为真实数据,口径差异 3 倍源于"产业规模 vs 纯硬件规模"维度。**Phase 5 升级**:2025 中国液冷数据中心产业规模约 480 亿元(含硬件、服务、集成)🔵broker(赛迪顾问 2025-12-25);2024 仅基础设施硬件市场约 21 亿美元(约 150 亿元人民币)🔵broker(IDC《中国液冷数据中心市场追踪》2025Q1);2025 全球新增模块化数据中心采用液冷方案比例已超 35%🔵broker;⚠️上海 2025 智算中心液冷机柜占比超 50%/北京新建 IDC 液冷渗透率 ≥30%/东数西算 50% 以上项目用液冷(政策口径,单源)。',
        companies: [
          { name:'科华数据', code:'002335', position:'液冷微模块市占领先。来源:待核', barrier:2 }
        ]
      },
      // ★ P1-4 注入(2026-06-15):midstream +1:漏液检测服务(对应 P1-1 新增 seg[5])
      //   companies 字段占位(训练知识,未联网核实),后续可单独复核
      {
        name: '漏液检测服务/系统集成',
        barrier: 3,
        note: '防漏卡口核心环节,提供"检测→告警→关断→维护"集成方案。来源:行业方案(截至 2026-06)。⚠️ 部分找到(Phase 7 2026-06-18 DeepSeek 智能搜索核实):赛迪顾问报告预计 2025 中国液冷市场规模突破千亿元,其中检测、验证与运维服务占比将显著提升;漏液检测已成为液冷系统制造与集成环节中不可或缺的质量保障环节🔵broker(赛迪顾问 + 中表仪,Phase 7 DeepSeek 智能搜索核实)——定性描述无精确占比。',
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
        note: '3M 退出后迎绝佳替代窗口,高质量 C8/C6 冷媒严重供给不足。来源:化工研报(截至 2026-05)。✅ 占比数据(Phase 4 2026-06-18 DeepSeek 智能搜索核实):浸没式方案中冷却液可占约 60% 的价值量;氟碳化合物占浸没式冷却液约 94.2% 份额;全球电子氟化液市场规模约 30 亿美元/国内自给率不足 20%;全球氟化液市场 2024 年约 30.4 亿元🔵broker(证券时报 2025-02-28 + 申万宏源/浙商证券 2025-08~09)。⚠️价格端:国产化推动下氟化液价格或降低 30-40% 🔵broker(同源)。按 G4「市占率档伪造」陷阱,不以历史产能规划平推。',
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
        note: '格局相对分散,多为消费电子散热厂商横向拓展。来源:电子研报(截至 2026-05)。⚠️ 占比数据(Phase 2 2026-06-18 Gemini B 类端核实):①TIM 占液冷板成本占比(%) ②TIM 国内市场规模(亿元) 均未找到 ≥2 一手/独立来源,公开数据稀缺区,受冷板材质(铜/铝)及方案差异影响无统一公允基准比例 → ②诚标待核 🆪estimate,拒绝编造平均数。',
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
        note: '防漏卡口核心元器件,气体/湿度/温度传感器。来源:行业方案(截至 2026-06)。✅ 占比数据(Phase 8 2026-06-18 DeepSeek 智能搜索核实 + 行业协会专项):漏液检测传感器在液冷系统 BOM 中占比约 1.5%-3%,在 CDU 中占比约 2%-5%;高精度方案可达 5%-8%,普通方案约 1%-2%🔵broker(热管理行业报告 2026 + 东方财富 2026-02-05)。⚠️漏液检测传感器市场规模仍缺精确第三方数据,但 BOM 占比首次出现可量化数字。',
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
        note: '不锈钢/橡胶/EPDM 管路 + 接头金属件(对应 equipment[1] 快接)。来源:行业方案(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):液冷系统成本结构中,歧管与管路占 5%-10%;另有报告显示管路阀门等配件占 10%,冷却液仅占 5%⚪media(EET China + 中商产业研究院,Phase 7 DeepSeek 智能搜索核实)——单源 media。⚠️此口径与"快接头占管路价值比例"仍不同,需进一步细分。',
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
        note: '液冷心脏,集中度极高,满负荷试错与防漏验证壁垒深。来源:招投标数据(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):CDU 占液冷系统价值量 30%-40%;另有报告显示 CDU 占液冷系统成本的 25%-35%🔵broker(西部证券 2026-02-02 + 东吴证券 + EET China,Phase 7 DeepSeek 智能搜索核实)——双源 broker。📌**CDU 内部成本拆解首次出现**(Phase 8 行业协会专项 + 反推法):泵 22%-40%(双层冗余方案近 40%)/换热器 15%-25%/阀门 10%-15%/传感器 2%-5%/控制器 5%-10%/其他配件 10%-15%🔵broker(东方财富 2026-02-05 + 抖音行业报告)。📌参考已知数据:全球 CDU 2025 22.4 亿美元/2026E 25.4 亿美元(Fortune BI)+ 维谛 2025 全球 CDU 市占 11.3% 居首/前五合计 35%🔵broker。⚠️**反推法补充**(Phase 7):英维克 2025 深圳总部服务器冷板/CDU 产能 50 万套(2026 规划 80 万套)🟢primary;CoolIT 多吉瓦级产能/18 个月扩 25 倍🟢primary;Asetek 2025 单一客户交付超 10 万台🟢primary;全球机架式 CDU 2025 销量约 7.1 万台🔵broker(QYResearch);全球 CDU 2025 销量约 8.8 万台🔵broker。⚠️**CDU 缺口率首次量化**(Phase 8):**2026 液冷 CDU 供需缺口率约 20-25%**🔵broker(中招联合 + 东方财富 2026-04-29)。',
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
        note: '盲插防漏专利受限,海外史陶比尔等主导,国产突破中。来源:专利检索(截至 2026-05)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):快接头(UQD)占液冷系统价值量 15%-20%;另有报告显示快接头占液冷系统成本 28%⚪media(EET China + 中商产业研究院,Phase 7 DeepSeek 智能搜索核实)——单源 media,需 ≥2 独立一手来源验证。⚠️UQD 国产化率仍属公开数据稀缺区(永贵降级 ★★☆ Phase 1 已诚实标记)。',
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
        note: '制造门槛适中,五金件属性偏强,面临一定价格战压力。来源:产业链调研(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):冷板占液冷系统价值量 40%-45%(最高单项);另有报告显示液冷板占液冷系统成本 32%⚪media(EET China + 中商产业研究院,Phase 7 DeepSeek 智能搜索核实)——单源 media。⚠️与 segments seg[1] 中飞荣达"液冷板单价 1500-3000 元/套"(Phase 5 已注入🔵broker 中泰证券)可交叉验证。',
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
        note: '传统商冷与暖通企业降维切入,门槛较低,竞争白热化。来源:暖通行业报告(截至 2026-06)。✅ 占比数据(Phase 8 2026-06-18 DeepSeek 智能搜索核实 + 中国制冷协会/CDCC 行业协会专项):二次侧冷却塔能耗占液冷系统总能耗 10%-20%,占数据中心制冷系统总能耗 5%-10%,占数据中心总能耗 1.2%-3.5%;变频群控可降低 30%+ 能耗🔵broker(CDCC 数据中心二次侧能耗报告 + Banyano 暖通 2026)。⚠️口径:此为能耗占比,不是价值占比,需进一步细分。',
        sourceSegment: '液冷侧枝(冷却塔/温控芯片)',
        companies: [
          { name:'双良节能', code:'600481', position:'占比待核。来源:待核', barrier:2 },
          { name:'海容冷链', code:'603187', position:'占比待核。来源:待核', barrier:2 }
        ]
      },
      {
        name: '液冷温控芯片/智能控制',
        barrier: 3,
        note: '精细化温控与上游关键铜材供应商,辅助节点。来源:行业综述(截至 2026-06)。⚠️ 占比数据(Phase 2 2026-06-18 Gemini B 类端核实):①温控芯片/智能控制在液冷板中价值占比(%) ②液冷控制 IC 国内市场规模(亿元) 均未找到 ≥2 一手/独立来源,公开数据稀缺区,智能控制 IC 在液冷板(纯五金结构件)与 CDU 控制模块中的价值占比边界模糊无统一公允数字 → ②诚标待核 🆪estimate',
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
        { rank:1, name:'巨化股份', code:'600160', position:'2025 目标 5000 吨/年(巨芯冷却液)·一期 2022 已建 1000 吨·应用 60% 半导体+40% 大数据中心·客户 阿里云/华为/台积电·纯度 99.9999% 适配 3nm 🔵 broker Gemini Advanced 1.5 Pro 联网 2026-06-18', barrier:5, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 60.18 亿(+3.75%)/归母 11.73 亿(+45.93%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。3M 退出后唯一具备 C8/C6 全链条规模化能力的上市化工龙头。⚠️风险:含氟聚合物(PFAS)面临环保政策收紧黑天鹅。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:5,trend:'flat'}
        ], dims6Note:'26Q1 营收 60.18 亿(+3.75%)/归母 11.73 亿(+45.93%)/毛利 34.39%;PE-TTM 31.05倍/3年分位50.42%(asOf 20260429)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-29)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260429' },
        { rank:2, name:'新宙邦', code:'300037', position:'2025 电子信息化学品营收 14.65 亿元🔵broker(同花顺);海斯福(子公司)受海外 3M/科慕退出影响市场份额有提升,但 IDC 冷却液国内精确市占率未披露⚪media(公司未单列);主业仍为锂电化学品占大头🟢primary。⚠️风险:主业锂电电解液若遇价格周期下行将严重拖累表观利润。', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 33.61 亿(+67.85%)/归母 4.80 亿(+109.02%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。海斯福(控股子公司)具备高性能氟材料产能且已切入半导体/IDC 冷却液。⚠️风险:主业锂电电解液若遇价格周期下行将严重拖累表观利润。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收 33.61 亿(+67.85%)/归母 4.80 亿(+109.02%)/毛利 ~24.3%;PE-TTM 48.11倍/3年分位71.71%(asOf 20260428)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260428' },
        { rank:3, name:'天赐材料', code:'002709', position:'核心主业为锂离子电池材料。2025 年报显示,锂离子电池材料(主要为电解液)营收占比约 93.6%,日化材料及特种化学品占比约 6.4%🔵broker(天赐材料 2025 年报 + 深度报告,Phase 6 DeepSeek 智能搜索核实);液冷氟化液被归入特种化学品中的"新材料"范畴,未单独拆分;投资者关系纪要显示该业务处于推广初期,规模极小🔵broker。**Phase 6 barrier 降级 3→2**:锂电主业占比超 93%,液冷氟化液属于占比极小的孵化业务,间接估算占公司总营收比例远低于 1%,仍属公开数据稀缺区。⚠️风险:跨界初期大客户验证周期长,存在失败沉没成本风险。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 66.73 亿(+91.29%)/归母 16.54 亿(+1005.75%)/扣非归母 15.60 亿(+1062.23%)</mark>(①直接命中,巨潮资讯/公司第一季度报告,tier=primary 🟢)。新设产线切入冷却液领域,但营收主体仍被锂电电解液绝对主导。⚠️风险:跨界初期大客户验证周期长,存在失败沉没成本风险。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 66.73 亿(+91.29%)/归母 16.54 亿(+1005.75%)/扣非归母 15.60 亿(+1062.23%)单季净利大增;PE-TTM 37.58倍/3年分位31.07%(asOf 20260428)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)', tier:'primary', valAsOf:'20260428' },
        // ★ P1-3 批次 1 注入(2026-06-15):seg[0] 氟化液 5 只 position 联网核实后全②待补(诚实)
        { rank:4, name:'多氟多', code:'002407', position:'主业为氟化工新材料。2025 年报显示,以六氟磷酸锂为核心的新材料板块营收占比约 82%,氟化盐/锂电池等占 18%🔵broker(多氟多 2025 年报 + 公司深度报告,Phase 6 DeepSeek 智能搜索核实);液冷用氟化液属于电子级氟化工产品,合并在新材料板块中,未单独列示;公司未在调研中给出具体体量🔵broker。**Phase 6 barrier 降级 3→2**:新材料板块整体营收高,但液冷氟化液作为尚未起量的细分产品,占比极小,直接营收贡献低于 1%,无法获得精确份额,仍属公开数据稀缺区。⚠️风险:主业六氟磷酸锂价格周期波动大。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 1 已查,具体业务/财报未拆分单项氟化液占比)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 1 联网核实后维持)', tier:'primary', valAsOf:'20260424' },
        { rank:5, name:'昊华科技', code:'600378', position:'2025 年报显示,氟化工板块(含制冷剂/含氟聚合物/电子化学品等)营收占比约 72%🔵broker(昊华科技 2025 年报 + 公司研究,Phase 6 DeepSeek 智能搜索核实);液冷用全氟聚醚/氢氟醚等氟化液仅为其中子项,公司未单独披露数据中心冷却液营收;投资者关系活动中称其处于客户导入与验证阶段🔵broker。**Phase 6 barrier 降级 3→2**:氟化工板块规模较大,但液冷氟化液是其中尚未形成体量的细分品种,据券商推算冷却液业务占总营收比例不高于 2%,无精确市占率数据,仍属公开数据稀缺区。⚠️风险:军工/航空配套业务波动可能掩盖液冷氟化液进展。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 1 已查,氟化工核心板块占比未拆分披露)。', dims6:[
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
        { rank:1, name:'英维克', code:'002837', position:'2024 营收 45.89 亿(+30.04%)/归母 4.53 亿(+31.59%)·机房温控占比 25% 折算液冷相关 ~11.47 亿🟢 primary 巨潮 2025-04 + 2025Q1 营收 9.33 亿(+25.07%)/归母 0.48 亿(-22.53% 增收不增利因交付/存货高增+汇兑)🟢 primary 巨潮 2025-04-21 + 英伟达 GB200/GB300 AVL 合格供应商 Tier 1🔵 broker (lctexpo.com + stcn.com 证券时报 + 中泰证券 三源)+ 全球 CDU 市场 2025 22.4 亿美元/2026E 25.4 亿美元 CAGR 14.3-18.2%🔵 broker Fortune Business Insights + 维谛 2025 全球 CDU 市占 11.3% 居首/前五合计 35%🔵 broker + 国内寡头英维克+维谛+AVC 三家(国内分项市占率公开数据稀缺)🔵 broker', barrier:5, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 11.75 亿(+26.03%)/归母 866 万(-81.97%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。构建"Coolinside"全链条方案,防漏认证壁垒深。⚠️重大风险:增收不增利(汇兑与费用侵蚀),一季报暴雷。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:5,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 11.75 亿(+26.03%)/归母 866 万(-81.97%),增收不增利。PE-TTM 197.06倍/3年分位96.82%(asOf 20260421)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-20)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260421' },
        { rank:2, name:'永贵电器', code:'300351', position:'2024 营收 20.20 亿(+33.04%)/归母 1.26 亿(+24.47%)·车载与能源信息板块 11.70 亿(占 57.90% YoY +52.24%)含液冷超充枪(赛力斯/吉利/奇瑞/比亚迪/华为 5 家)🟢 primary 巨潮/stcn.com + 2024 研发投入 1.65 亿(占营收 8.18%)🔵 broker + UQD 标准 OCP 2017 英特尔牵头 2020 Rev 1.0 批准 2021 UQDB 盲插版发布🔵 broker (OCP 官网+CEJN+Staubli+CPC 多源) + ⚠️ falsifySignal 三大反向证据:① 永贵未进入英伟达 GB200 供应链(暂无任何官方公告)🔵 broker Gemini 2026-06-18;② 数据中心高阶 UQD 市场仍由海外(史陶比尔/派克/Danfoss/CEJN/CPC)+ 台资代工把控🔵 broker;③ 永贵当前液冷业务实质是新能源液冷超充枪(车载大功率),非数据中心 UQD 严苛盲插防漏场景⚠️卡口评级从 ★★★ 降 ★★☆ (chokePoints[2] 已一致)·保留为"潜在国产替代标的"非"已实现卡口"', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 4.74 亿(+6.30%)/归母 -2174 万(-193.46%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。掌握防漏液盲插核心专利避开海外封锁。⚠️重大风险:一季报业绩转亏,轨交等主业承压严重掩盖液冷增量。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 4.74 亿(+6.30%)/归母 -2174 万(-193.46%)业绩转亏。PE-TTM 456.42倍/3年分位99.18%(asOf 20260427)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-26)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260427' },
        { rank:3, name:'高澜股份', code:'300499', position:'2025 高功率密度装置热管理(数据中心液冷+储能热管理)营收 2.643 亿元,占公司总营收 26.73%(全年)/2025H1 占 32.78%🟢primary(深交所指定信息披露平台 + 巨潮投资者关系活动记录表 2025-08-28,DeepSeek 智能搜索 Phase 3 双跑核实);公司明确表示"具体市场份额暂无全面统计数据"——国内精确份额仍属公开数据稀缺区⚠️。⚠️风险:面临服务器整机厂自研部件的降维蚕食。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 2.12 亿(-2.77%)/归母 1514 万(+16.55%)/毛利 30.68%</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。老牌温控企业,拥有冷板换热成熟技术体系。⚠️风险:面临服务器整机厂自研部件的降维蚕食。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 2.12 亿(-2.77%)/归母 1514 万(+16.55%)/毛利 30.68%;PE-TTM 385.7倍/3年分位93.22%(asOf 20260424)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-23)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260424' },
        { rank:4, name:'申菱环境', code:'301018', position:'2024 中国液冷 IDC 市占前三/智算市场和 CDU 市场市占第一🔵broker(赛迪顾问《2024-2025年中国液冷数据中心市场研究年度报告》+ 国泰海通证券 2026-05-21,DeepSeek 智能搜索 Phase 3 双跑核实);2025 数据服务板块营收占比已达 51.3-55.7%🔵broker(同源);⚠️华为/字节具体合作公告/招投标记录因保密协议未公开披露(申菱在多次投资者关系活动中回避具体客户名单)。⚠️风险:主营业务受下游非数据中心行业(如化工/特高压)周期影响。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 6.17 亿(-1.80%)/归母 2831 万(-47.71%)/毛利 20.60%</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。在华为等大客户液冷项目中具有长期配套交付经验。⚠️风险:主营业务受下游非数据中心行业(如化工/特高压)周期影响。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 6.17 亿(-1.80%)/归母 2831 万(-47.71%)/毛利 20.60%;PE-TTM 221.04倍/3年分位97.90%(asOf 20260429)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260429' },
        { rank:5, name:'川环科技', code:'300547', position:'2025 全年营收 15.23 亿元/同比+11.7%;2025H1 冷却系统胶管营收 3.83 亿元(占比 55.7%)🟢primary(东兴证券 2026-05-08 + 东北证券 2025-12-25,Phase 4 DeepSeek 核实);其中液冷管路贡献约 2.2 亿元🔵broker(中泰证券深度,Phase 5 DeepSeek 核实);子公司海威森承担部分液冷管路总成生产🟢primary(2026-01-10 投资者关系活动记录表,Phase 5 DeepSeek 核实);被券商列为国内液冷管路第一梯队🔵broker(中泰证券);持续推动大客户 6 万套服务器液冷管路系统订单交付🟢primary。⚠️国内精确份额%未公开(仍属公开数据稀缺区)。⚠️风险:管路产品五金化趋势明显,技术护城河相对偏低。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 2.76 亿(-12.56%)/归母 3948 万</mark>(①直接命中,新浪财经/媒体财报速递,tier=media ⚪)。利用车用管路技术平移研发液冷管路。⚠️风险:管路产品五金化趋势明显,技术护城河相对偏低。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 2.76 亿(-12.56%)/归母 3948.73 万,营收下滑。毛利率/PE-TTM 39.06倍/3年分位82.68%(asOf 20260429)。来源:新浪财经(截至 2026-04-28)', tier:'primary', valAsOf:'20260429' },
        { rank:6, name:'中石科技', code:'300684', position:'2025H1 营收 7.5 亿元/同增 16.1%;2025Q3 营收 5.50 亿元/同增 21.79%🟢primary(方正证券 2025-09-03 + 中石科技 2025 三季报点评 2025-11-04,Phase 4 DeepSeek 核实);热管理材料(TIM)业务在消费电子领域收入占比超 70%,在通信/算力领域占比约 25-30%(精确数字未公开)🔵broker(华泰证券深度 + 2025 半年报,Phase 5 DeepSeek 核实);公司是北美 A 客户核心供应商,对标莱尔德和富士高分子的产品导入 Dell/联想等服务器客户🔵broker(华泰证券深度);热模组核心零部件/TIM 材料等产品批量供货于服务器厂商,积极推进液冷散热模组客户导入和量产供货🟢primary。⚠️TIM 在算力/液冷设备国内精确份额仍未公开(仍属公开数据稀缺区)。⚠️风险:对北美 A 客户等消费电子终端的依赖过重。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 3.89 亿(+11.55%)/归母 6477.87 万(+4.94%)/经营现金流 1.64 亿(+264.06%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。消费电子高性能散热材料技术顺利横向拓展至算力设备。⚠️风险:对北美 A 客户等消费电子终端的依赖过重。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 3.89 亿(+11.55%)/归母 6477.87 万(+4.94%)/经营现金流 1.64 亿(+264.06%);毛利率/PE-TTM 待核。来源:巨潮资讯/公司第一季度报告(截至 2026-04-29)', tier:'primary', valAsOf:'20260429' },
        { rank:7, name:'思泉新材', code:'301489', position:'2025 热管理材料收入 8.04 亿元/同比+31.98%(高导热石墨膜/均热板等高附加值产品持续放量)+ 2025 导热材料业务全球市占率 2.78%🟢primary(东北证券 2026-05-28)+ 2025 来自谷歌 TPU 散热订单超 3 亿元🟢primary(中国证券报 2026-06-17);其他业务(含液冷散热)1.02 亿元/同比+195.42%🟢primary。⚠️重大风险:单季利润断崖式下滑,需警惕后续盈利能力。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 2.63 亿(+5.08%)/归母 1245.91 万(-77.10%)</mark>(①直接命中,媒体财报速递,tier=media ⚪)。均热板等产品用于算力散热。⚠️重大风险:单季利润出现断崖式下滑,需警惕后续盈利能力。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 2.63 亿(+5.08%)/归母 1245.91 万(-77.10%)利润断崖式下滑;毛利率/PE-TTM 待核。来源:新浪财经(截至 2026-04-28)', tier:'primary', valAsOf:'20260428' },
        { rank:8, name:'飞荣达', code:'300602', position:'2025 全年营收 65.27 亿元(+24.74%)/净利润 3.65 亿元(+59.97%);AI 服务器液冷国内市占率约 15-18%🔵broker(行业分析 + 国海证券 2025-10-15 + 中泰证券深度,Phase 5 DeepSeek 核实,中泰根据其英伟达 GB300 配套份额及产能测算,非官方数据);2025 液冷业务营收占比预计达 40%🔵broker;液冷板冷板模组已配套英伟达 GB300 机柜🔵broker;公司冷板单价约 1500-3000 元/套🔵broker(中泰证券深度,Phase 5 DeepSeek 核实)。⚠️液冷板单独营收未在 2025 年报中单独拆分(归入"热管理及电磁屏蔽产品"分类),液冷板精确市占率非官方数据(仍属公开数据稀缺区)。⚠️风险:冷板制造环节壁垒逐步下降,面临红海价格战压力。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 16.44 亿(+39.15%)/归母 7735.70 万(+33.92%)</mark>(①直接命中,媒体财报速递,tier=media ⚪)。有核心大客户供应链认证背书,具备液冷板打样量产能力。⚠️风险:冷板制造环节壁垒逐步下降,面临红海价格战压力。', dims6:[
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
        { rank:1, name:'中科曙光', code:'603019', position:'子公司曙光数创温控设备连续四年蝉联国内算力中心基础设施液冷市场榜首,市占率 >50%;2024 曙光数创在国内液冷 IDC 基础设施市场份额 61.3%🔵broker(《中国算力基础设施液冷技术发展现状分析》+ 曙光数创 2025 业绩说明会,DeepSeek 智能搜索 Phase 3 双跑核实);国内唯一实现浸没相变液冷大规模商业化部署的企业。⚠️风险:供应链核心芯片"卡脖子"。', barrier:4, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 31.99 亿(+23.71%)/归母 2.28 亿(+22.19%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。子公司曙光数创在浸没式相变液冷领域拥有核心全链条知识产权。⚠️风险:供应链核心芯片"卡脖子"。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:4,trend:'flat'}
        ], dims6Note:'26Q1 营收 31.99 亿(+23.71%)/归母 2.28 亿(+22.19%)稳健增长;PE-TTM 57.08倍/3年分位37.91%(asOf 20260425)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-25)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260425' },
        { rank:2, name:'浪潮信息', code:'000977', position:'AI 服务器国内市占率 >50%,连续多年稳居国内第一;2025Q1 服务器出货量全球第二/中国第一;2024 液冷服务器出货量中国第一🔵broker(Gartner + IDC 数据 + 多家券商研报,DeepSeek 智能搜索 Phase 3 双跑核实);⚠️2025 液冷业务营收 73 亿仅单源⚪media(东方财富 2026-02)/冷板式方案具体百分比/液冷收入分项均未找到一手。⚠️重大风险:单季经营活动现金流为负(-77.72 亿),资金面承压。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 354.70 亿(-24.30%)/归母 6.05 亿(+30.74%)/经营现金流 -77.72 亿</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。出货量极大带动冷板方案大面积普及。⚠️重大风险:单季经营活动现金流为负,资金面承压。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 营收 354.70 亿(-24.30%)/归母 6.05 亿(+30.74%)/经营现金流 -77.72 亿;PE-TTM 37.07倍/3年分位17.44%(asOf 20260430)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-30)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260430' },
        { rank:3, name:'紫光股份', code:'000938', position:'2025H1 中国加速服务器市场浪潮/新华三/联想位居前三/占据近 50% 市场份额⚪media(深交所互动易 2025-08-14 + 东方财富 2025-10-09,Phase 4 DeepSeek 核实);投资者提问提及"液冷渗透率预计 2025 年达 40%,新华三如何提升在 AI 服务器液冷市场的 50% 以上占有率"⚪media;新华三拥有全计算平台液冷产品。⚠️新华三液冷服务器精确市占率/三大运营商集采份额等具体数字无官方披露(仍属公开数据稀缺区)。⚠️风险:运营商市场价格战压制毛利率。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 279.85 亿(+34.61%)/归母 7.88 亿(+126.06%)</mark>(①直接命中,巨潮资讯/公司财报,tier=primary 🟢)。具备自研液冷机柜及整机端到端交付能力,频频中标三大运营商服务器集采。⚠️风险:运营商市场价格战压制毛利率。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 279.85 亿(+34.61%)/归母 7.88 亿(+126.06%);PE-TTM 36.62倍/3年分位20.49%(asOf 20260429)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-28)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260429' },
        { rank:4, name:'科华数据', code:'002335', position:'2025 营收 81.60 亿元/同比+5.20%;智算中心收入 35.23 亿元/占比 43.17%🟢primary(科华数据 2025 年报 2026-04-26);数据中心液冷+UPS 备用电源市场占有率位居第一 + 2024 中国高端电源(UPS)/微模块数据中心/预制式电力模组行业市占率第一🔵broker(前瞻产业研究院认证);2025 液冷业务收入预计突破 5 亿元。⚠️风险:系统集成属性强,技术可替代性高。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 14.30 亿(+17.57%)/归母 7800.88 万(+13.15%)/经营现金流 1.21 亿(+160.80%)</mark>(①直接命中,公司第一季度报告公告,tier=primary 🟢)。由传统 UPS 稳步切入智算液冷机房环境包揽业务。⚠️风险:系统集成属性强,技术可替代性高。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'26Q1 营收 14.30 亿(+17.57%)/归母 7800.88 万(+13.15%)/经营现金流 1.21 亿(+160.80%);毛利率/PE-TTM 待核。来源:公司第一季度报告公告(截至 2026-04-26)', tier:'primary', valAsOf:'20260427' },
        { rank:5, name:'工业富联', code:'601138', position:'全球 AI 服务器 ODM 代工份额约 40%🔵broker(TrendForce + 多家券商研报);GB200/GB300 液冷机柜代工份额 60-70%🔵broker(雪球引用 GB300 全球代工数据);AI 服务器代工份额 >90%🔵broker(搜狐引用同源,DeepSeek 智能搜索 Phase 3 双跑核实)。⚠️风险:北美大客户集中,地缘政治风险。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 2 已查,具体业务/财报下轮联网核实)。', dims6:[
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
        { rank:1, name:'润泽科技', code:'300442', position:'国内唯一提供纯液冷智算中心解决方案企业🔵broker(中国报告大厅),单项目 PUE≤1.2;与字节跳动合作机柜规模未找到一手披露⚪media。⚠️风险:重资产扩张模式下面临巨额折旧摊销压力。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 18.40 亿(+53.55%)/归母 5.82 亿(+35.35%)</mark>(①直接命中,财报公告,tier=primary 🟢)。以批发型 IDC 模式深度绑定字节跳动等头部算力大户。⚠️风险:重资产扩张模式下面临巨额折旧摊销压力。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'26Q1 营收 18.40 亿(+53.55%)/归母 5.82 亿(+35.35%) AIDC 拓展驱动;PE-TTM 25.61倍/3年分位13.68%(asOf 20260410)。来源:巨潮资讯/公司第一季度报告(截至 2026-04-09)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260410' },
        { rank:2, name:'数据港', code:'603881', position:'已建成 35 座数据中心/主营业务规模 371.1MW/折合 5kW 标准机柜约 74,200 个;2025 与阿里云签订 160 亿元订单/液冷技术解决方案占订单金额 20-25%🟢primary(2025 年报 + 重大合同公告,Phase 5 DeepSeek 核实);**前五大客户销售额占年度销售总额 98.81%,其中阿里系(含关联方)占比超 90%——几乎全部为面向阿里的批发型定制 IDC**🟢primary(2025 年报,Phase 5 DeepSeek 核实);160 亿元订单预计未来 3-5 年确认收入🟢primary(公司公告,Phase 5 DeepSeek 核实);机柜数有望翻倍至 15 万架🟢primary。⚠️液冷机柜精确规模(MW 数)未单独披露(仍属公开数据稀缺区)。⚠️风险:高度依赖单一互联网巨头,议价权弱。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'26Q1 精确财报数据 ②待补(G1 纪律严格执行:3.80 亿/-3.76% 数字有证券之星/网易/搜狐 ≥3 二级来源,但精确万元原文因 PDF 抓取空白仍②待补)。长期为阿里云提供定制化液冷基础设施。⚠️风险:高度依赖单一互联网巨头,议价权弱。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'⚠️财报待核(无一手) | ②待补。2026-06-15 第 4-2 轮 Gemini 端口径自查通过(3.80 亿元是合并总营收,非分项),但精确到万元原文因 PDF 抓取空白仍②待补。来源:http://static.sse.com.cn/disclosure/listedinfo/announcement/c/new/2026-04-25/603881_20260425_VTU6.pdf(原文 PDF 抓取空白,需 cninfo 人工下载)。', tier:'primary', valAsOf:'20260425' },
        { rank:3, name:'光环新网', code:'300383', position:'截至 2025 年末已投产机柜超过 8.2 万个/全国规划机柜规模超 23 万个/2025 年新投放 2.6 万台🟢primary(21 世纪经济报道 2026-03-18 + 深交所投资者关系活动记录 2026-03-03);IDC 机柜整体规划规模 23 万台;与百度合作液冷项目🟢primary。⚠️一线城市零售型 IDC 精确市占率/液冷机柜精确规模未单独披露(仍属公开数据稀缺区)。⚠️风险保留:控股股东舟山百汇达 2026-03-17 至 2026-06-16 减持窗口期内,计划减持不超过 3% 股份(🟢primary 公司公告 2026-02-13)。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'26Q1 财报数据 ②待补。重点风险提示:控股股东舟山百汇达于 2026-03-17 至 2026-06-16 减持窗口期内,计划减持不超过 3% 股份(①直接命中,巨潮资讯/公司 2026-02-13 公告,tier=primary 🟢)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 16.33 亿/-10.83% / 归母 2246.52 万/-67.52%(扣非 1052.82 万/-82.48%) / 毛利率 14.09%/-6.9pct。来源:证券之星 2026-04-29/30 整理(公司一季报公告)。PE-TTM 失真(akshare baidu 2026-06-18:-27.99 负值=TTM 累计净利为负,分位无法计算);分位不参与打分。⚠️重大风险:控股股东舟山百汇达 2026-03-17~06-16 减持窗口期内,计划减持不超过 3% 股份(tier:primary,src:2026-02-13 公告)——作 ⚠️ 提示可见,不改 barrier。', tier:'primary', valAsOf:'2026-03-20' },
        { rank:4, name:'宝信软件', code:'600845', position:'2025 全年营收 109.72 亿元/同比下降 19.59%;IDC 业务(服务外包)2025 营收 37.65 亿元/同比+2.98%🟢primary(宝信软件 2025 年报点评 2026-04-29 + 搜狐财经 2026-05-25,Phase 4 DeepSeek 核实);宝之云是公司核心算力中心资产🟢primary。⚠️宝之云液冷 IDC 精确份额/液冷业务在宝之云中占比等数据未披露(仍属公开数据稀缺区)。⚠️风险:宝武集团内消化为主,对外商业液冷份额低。', barrier:3, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 3 已查,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(P1-3 批次 3 联网核实后维持)', tier:'primary', valAsOf:'20260422' },
        { rank:5, name:'奥飞数据', code:'300738', position:'截至 2025 年 6 月自建自营数据中心 14 个/运营机柜 5.7 万架/在建机柜超 4.3 万架⚪media(东方财富 2025-10-05 + 格隆汇 2025-04-30,Phase 4 DeepSeek 核实);液冷机柜占比提升至 40%;AI 算力订单达 4.3 亿元/占营收 32%⚪media;2023 液冷机柜占比已达 20%(行业平均<10%)⚪media。Phase 6 DeepSeek 进一步核查广东省通信管理局/IDC 圈/信通院相关白皮书,均未发布"按区域及液冷细分"的 IDC 机架市占率排名⚪media(辅助源)。⚠️"华南液冷机架精确市占率"属未公开统计数据,公司和第三方机构均未披露,barrier 维持 2。⚠️风险:区域体量小,无大型算力客户。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(P1-3 批次 3 已查,具体业务/财报下轮联网核实)。', dims6:[
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
        { rank:1, name:'博威合金', code:'601137', position:'2025H1 营收 102.2 亿元/同比+15.2%;新材料板块营收 79.35 亿元/占总营收 78.53%🟢primary(证券之星 2025-08-20 + 新浪财经 2025-11-06,Phase 4 DeepSeek 核实);前三季度营收 154.74 亿元🟢primary;公司新材料聚焦"散热+高速传导"材料。Phase 6 DeepSeek 进一步核查:公司 2025 年报对"新材料"板块仅划分"精密细丝"与"精密板带"两类,未按终端应用(散热/连接器)拆分;子公司宁波博威合金材料、贝肯霍夫等报表亦未单独列示数据中心散热材料收入🟢primary(博威合金 2025 年报)。**Phase 6 barrier 降级 3→2**:液冷散热属于新材料板块下游诸多应用之一,公司严格保密客户与应用分项,精确营收无法从公开途径获取,属稀缺数据但有相关业务存在。⚠️【方向错位风险】受美国联邦补贴失去及汇兑损失影响,公司新能源板块严重拖累整体业绩报表,分析时须严格剥离新能源板块,聚焦液冷铜合金独立判断。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'26Q1 整体财报归母利润 ②待补;但根据 2025 年报线索,其液冷相关的"铜合金散热新材料"板块实为正增长(①直接命中,tier=primary 🟢)。⚠️【方向错位风险】受美国联邦补贴失去及汇兑损失影响,公司新能源板块严重拖累整体业绩报表,分析时须严格剥离新能源板块,聚焦液冷铜合金独立判断。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 56.61 亿/+14.03% / 归母 -9135.98 万/-128.84%(由盈转亏,扣非 -7360.67 万/-124.06%) / 毛利率 8.07%/-6.22pct 环比-4.40pct。来源:新浪财经 2026-04-27 整理(公司一季报公告)。PE-TTM 失真(akshare baidu 2026-06-18:-84.35 负值=TTM 累计净利为负,分位无法计算);分位不参与打分(液冷相关铜合金散热新材料 25 年报仍正增长)。⚠️G3 方向提示:本季亏损主因是新能源板块(汇兑损失+美国联邦补贴失去,单季亏损 1.59 亿元),液冷相关的铜合金散热新材料在 2025 年报中描述为正增长——dims6 方向判断时不要把新能源板块亏损等同于液冷散热业务景气下滑。博威是液冷侧枝(铜合金冷却部件),非纯液冷标的,液冷业务占比待核。', tier:'primary', valAsOf:'2026-04-27' },
        { rank:2, name:'双良节能', code:'600481', position:'节能节水系统 2025 营收 27.2 亿元;2025H1 光伏新能源行业营收 30.27 亿元(占比 68.99%);2025 全年收入构成中光伏产品 44.2 亿元(58.43%)/节能节水装备 27.23 亿元(36.00%)🟢primary(富途 2026-04-30 + 东方财富 2025 年报主营构成,Phase 4 DeepSeek 核实);公司在数据中心/零碳园区等领域实现订单开拓🟢primary。Phase 6 DeepSeek 进一步核查:公司节能节水装备年报中列出溴化锂制冷机/空冷器等产品,提及已服务于数据中心,但未公布数据中心冷却塔的具体份额,也无该类客户的销售明细🟢primary(双良节能 2025 年报 + 2026-04 投资者关系活动记录表);行业协会及 QYResearch 报告均以"蒸发冷却设备"整体市场统计,不单独切割"数据中心冷却塔"细分排名🟢primary。**barrier 维持 2**:公司仅定性提及数据中心冷却应用,但未给出该细分市场的量化收入和份额,精确数据缺乏公开来源。⚠️重点风险:主业光伏硅片环节严重承压导致暴亏(26Q1 归母 -144.60%),数据中心二次侧换热设备的增量被光伏下行周期完全稀释。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 归母净利 -3.945 亿(-144.60%)/毛利暴跌至 -11.04%</mark>(①直接命中,财报/东方财富,tier=primary 🟢)。重点风险提示:主业光伏硅片环节严重承压导致暴亏,数据中心二次侧换热设备的增量被光伏下行周期完全稀释。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:2,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'⚠️重大风险:26Q1 归母 -3.945 亿(-144.60%)/毛利暴跌至 -11.04%,主业承压;PE-TTM 失真(26Q1 归母 -144.60% 暴亏(主因光伏硅片环节严重承压));分位不参与打分。来源:巨潮资讯/公司第一季度报告(截至 2026-04-30)。tier 从 media 升 primary', tier:'primary', valAsOf:'20260430' },
        { rank:3, name:'海容冷链', code:'603187', position:'商用冷链设备龙头。2025 年报显示,商用冷藏/冷冻展示柜业务营收占比达 97.8%,其他业务收入占比 2.2%🟢primary(海容冷链 2025 年报 + 跟踪报告,Phase 6 DeepSeek 智能搜索核实);公司公告与投资者互动中从未提及数据中心液冷相关业务或技术储备🟢primary。**Phase 6 barrier 降级 2→1**:主营高度集中于商用冷链展示柜,占比超 97%,数据中心液冷业务为零,且无任何转型迹象,液冷关联度可忽略。⚠️风险:目前仅为边缘侧枝拓展,缺乏大型算力客户实质性大量订单。', barrier:1, trend:'flat', trendNote:'—（待核）', logic:'<mark>26Q1 营收 8.37 亿/-7.96%/归母 1.05 亿(+0.39%)/扣非 1.02 亿(+1.34%)/毛利率 29.63%(+4.21pct)</mark>(①直接命中,证券之星/公司一季报公告,tier=primary 🟢)。尝试将传统商用展示柜制冷技术向数据中心冷却做技术降维探索。⚠️风险:目前仅为边缘侧枝拓展,缺乏大型算力客户实质性大量订单;PE 历史分位 38.0%(近 1 年)broker,src:知了财报网。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'down'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'🟢 26Q1 营收 8.37 亿/-7.96% / 归母 1.05 亿/+0.39%(扣非 1.02 亿/+1.34%) / 毛利率 29.63%/+4.21pct。来源:证券之星 2026-05-08 整理(公司一季报公告)。PE-TTM 精确倍数 ②待补(仅查到分位,未查到对应 TTM 倍数本身)。PE 历史分位 38.0%(近 1 年)broker,src:知了财报网。海容是液冷侧枝(冷却塔),非纯液冷标的,液冷相关业务占比待核。', tier:'primary', valAsOf:'2026-05-08' },
        // ★ P1-1 注入(2026-06-15):seg[4] 侧枝 3→5
        { rank:4, name:'芯原股份', code:'688521', position:'主营业务为半导体 IP 授权及一站式芯片定制服务。2025 年报显示,芯片定制业务收入占比约 80%,IP 授权约 20%🟢primary(芯原股份 2025 年报,Phase 6 DeepSeek 智能搜索核实);经查公司公告/专利库/投资者关系记录,**未发现任何液冷温控相关专利/产品/合作**,半导体 IP 与数据中心散热无直接技术关联🟢primary(2025 年报 + 华泰证券深度)。**Phase 6 barrier 降级 2→1**:主营 100% 半导体 IP,液冷关联度极低。⚠️风险:液冷温控 IP 应用份额未披露,半导体 IP 主营业务占大头。', barrier:1, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'⚠️ 26Q1 营收 8.36 亿(微增)/归母 -3.41 亿(亏损期)/毛利 32.29%;PE-TTM 失真(akshare baidu 2026-06-18:-208.85 负值=TTM 累计净利为负,分位无法计算);分位不参与打分。来源:akshare/新浪财经(基于公司季报)(截至 2026-04-30)。tier:primary,valAsOf:2026-04-30', tier:'primary', valAsOf:'2026-04-30' },
        { rank:5, name:'中颖电子', code:'300327', position:'专注工控级 MCU 及 OLED 显示驱动芯片。2025 年报显示,工业控制(含家电/电机控制等)芯片营收占比约 91%,其余为消费电子芯片🟢primary(中颖电子 2025 年报 + 深度研究,Phase 6 DeepSeek 智能搜索核实);公司明确表示目前 MCU 产品主要面向家电及工业场景,**不涉及数据中心液冷温控 MCU 这一细分专用市场**🟢primary。**Phase 6 barrier 降级 2→1**:主营为通用 MCU,在液冷温控专用 MCU 领域无产品/无客户/无营收,业务关联度为零。⚠️风险:液冷温控 MCU 份额未披露,业务纯度低。', barrier:1, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
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
        { rank:1, name:'汉威科技', code:'300007', position:'公司投资者互动平台明确表示"产品暂不涉及液冷服务器领域"🟢primary(同花顺 2025-11-16 + 东方财富 2025-11-16,Phase 4 DeepSeek 主动反向证据验证);公司产品主要涵盖温度传感芯片/制冷剂泄漏传感器等,但未涉及 IDC 液冷漏液检测应用。⚠️降级信号:Phase 4 DeepSeek 验证发现反向证据——汉威不是液冷漏液检测标的,卡口逻辑不成立,barrier 应从 3 降 2。⚠️风险:液冷非主业,营收占比几近于无。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260429' },
        { rank:2, name:'四方光电', code:'688665', position:'主营气体传感器及气体分析仪器。2025 年报显示,气体传感器业务收入占比约 97%,主要应用于工业过程监控/汽车尾气/环境监测等领域🟢primary(四方光电 2025 年报 + 投资价值分析报告,Phase 6 DeepSeek 智能搜索核实);IDC 漏液检测:公司未披露任何专项产品/客户案例/技术布局,激光/红外传感器当前未涉及数据中心冷媒泄漏监测细分场景🟢primary。**Phase 6 barrier 降级 3→1**:主营几乎全部为工业及汽车气体传感器,IDC 漏液检测属于高度细分且未验证的跨界场景,液冷关联度极低。⚠️风险:液冷漏液检测认证中,激光红外传感器多家竞争。', barrier:1, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:3,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260430' },
        { rank:3, name:'精测电子', code:'300567', position:'主营显示面板检测系统。2025 年报显示,平板显示检测设备营收占比约 85%,半导体及新能源测试设备占比约 15%🟢primary(精测电子 2025 年报 + 深度报告,Phase 6 DeepSeek 智能搜索核实);公司在投资者问答中明确表示,目前未涉及数据中心液冷系统或相关测试设备🟢primary。**Phase 6 barrier 降级 2→1**:主营为显示测试,液冷测试设备尚处产业空白期,公司当前产品线与液冷无关。⚠️风险:液冷测试设备份额未披露,显示测试为主业。', barrier:1, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260428' },
        { rank:4, name:'雪迪龙', code:'002658', position:'主营业务为环境监测与分析仪器。2025 年报显示,环境监测系统及服务营收占比约 96.2%,工业过程分析系统占比约 3.8%🟢primary(雪迪龙 2025 年报 + 公司研究,Phase 6 DeepSeek 智能搜索核实);未涉及数据中心 IT 环境或液冷系统监测,也未披露相关在研项目或合作🟢primary。**Phase 6 barrier 降级 2→1**:主营环境监测占比超 96%,与数据中心液冷监测属于截然不同的技术路线和应用场景,无任何业务交叉。⚠️风险:液冷非主业,业务纯度极低。', barrier:1, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
          {key:'durability',name:'景气持续性',score:5,trend:'up'},
          {key:'visibility',name:'业绩可见度',score:4,trend:'flat'},
          {key:'policy',name:'政策确定性',score:4,trend:'flat'},
          {key:'supply',name:'供需紧张度',score:4,trend:'up'},
          {key:'valuation',name:'估值性价比',score:3,trend:'flat'},
          {key:'barrier',name:'壁垒安全垫',score:2,trend:'flat'}
        ], dims6Note:'②待补(本轮 P1-1 占位)', tier:'primary', valAsOf:'20260428' },
        // ★ P1-1 补全(2026-06-15):seg[5] 漏液检测 4→5
        { rank:5, name:'华工科技', code:'000988', position:'2025 全年营收 143.55 亿元/同比+22.59%;联接业务营收 60.97 亿元(+53.39%)/感知业务营收 40.27 亿元(+9.78%)🟢primary(同花顺 2026-03-26 + 老丫丫 2025,Phase 4 DeepSeek 核实);公司全球首家 3.2T 液冷 CPO 光引擎量产🟢primary。Phase 6 DeepSeek 进一步核查:公司感知业务涵盖温度/压力/激光传感器等,2025 年报显示该板块收入 40.27 亿,但未按应用领域拆分🔵broker(华泰证券深度);无论是公司公告还是行业报告,均未出现"数据中心漏液检测激光传感器"的市场份额统计,该细分赛道过于前期和小众,缺乏独立第三方数据🔵broker。**Phase 6 barrier 降级 3→2**:IDC 漏液检测传感器需求虽在增长,但目前无权威机构发布相关市场份额数据,属于高度细分的初期市场,精确份额无法获得。⚠️风险:激光主业占大头,液冷漏液检测份额未披露。', barrier:2, trend:'flat', trendNote:'—（待核）', logic:'②待补(本轮 P1-1 占位,具体业务/财报下轮联网核实)。', dims6:[
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
        position:'中科曙光通过子公司曙光数创在浸没式液冷领域占据绝对领先地位。第三方数据显示浸没式液冷市占率达 58.8%,液冷数据中心市占率 58.8%,市占率超 60%,主导制定 10 项国家液冷标准⚪media(雪球 2025-08-14 + 东方财富 2025-08-14,Phase 7 DeepSeek 智能搜索核实)——单源 media,需 ≥2 独立一手来源验证,barrier 维持 4 但 position 升级。',
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
        position:'2025 液冷服务器收入占比超 40%,带动整体营收增长 43.25% 至 1647.82 亿元;2024 液冷服务器国内市占率超 45%,全球 AI 服务器市占率达 46.6%⚪media(蓝鲸财经 2026 + 中国经营报/电子报 2026,Phase 7 DeepSeek 智能搜索核实)——单源 media,需 ≥2 独立一手来源验证,barrier 维持 3 但 position 升级。',
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
        position:'投资者互动中表示,新华三目标在 AI 服务器液冷市场占据 50% 以上占有率,通过冷板式与浸没式双技术路线布局推进全栈液冷落地🟢primary(深交所互动易 2025-08-14,Phase 7 DeepSeek 智能搜索核实)——仅为公司目标性表述,非已实现精确数据,barrier 维持 3。',
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
        position:'联想 Neptune 海神液冷系统全球部署量超 8 万套(2025 Q3)🟢primary(港股年报披露)+ 连续多年位居全球 HPC TOP500 份额第一(169 套系统)🔵broker(TOP500 官方榜单);AI 服务器业务收入同比增长 50%(2025/26 财年)🟢primary(联想港股年报 2025-11-13,Phase 8 DeepSeek 智能搜索核实)——全球温水冷集群龙头,HPC 市场强势地位稳固。⚠️风险:地缘政治影响核心元器件供应链。',
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
        position:'2025 液冷营收 300 亿元+,占云计算收入 25%,同比+200%+;GB200 液冷机柜出货 4000 台,单机柜价值 300 万美元;2026 GB300 年产能将达 24 万台🔵broker(雪球 2026 + 新浪财经 2025-11-17,Phase 8 DeepSeek 智能搜索核实 + 同步 segments 数据)——全球 AI 服务器代工龙头,液冷业务高速放量。⚠️风险:大客户过于集中,且代工毛利偏薄。',
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
        position:'根据前瞻产业研究院报告,科华数据在数据中心液冷和 UPS 备用电源市场占有率位居第一;公司官网披露 2025 年微模块数据中心市场份额 No.1🔵broker(前瞻产业研究院 + 公司官网,Phase 7 DeepSeek 智能搜索核实)——第三方研究机构非一手公告,barrier 维持 2。',
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
        position:'根据赛迪顾问报告,申菱环境 2024 年中国液冷数据中心市场占有率位居前三,其中智算行业液冷数据中心市场排名第一,CDU 市场占有率第一🔵broker(同花顺 2025-04-27 + 国金证券研报引述赛迪数据,Phase 7 DeepSeek 智能搜索核实)——barrier 维持 2。',
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
        position:'神州数码昇腾服务器年产能超 20 万台,中标中国移动百亿级智算中心项目,CANN 方案占比 60%;2025 一季度算力服务器销量同比暴涨 200%,信创业务营收占比超四成⚪media(雪球 2025-08-14 + 雪球 2025 Q1,Phase 7 DeepSeek 智能搜索核实)——单源 media,需 ≥2 独立一手来源验证,barrier 维持 2 但 position 升级。',
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
        position:'同方股份掌握数据中心冷却装备制造技术,基于华为昇腾平台的液冷服务器已在魏桥国科智算中心、建行内蒙古和林格尔新区数据中心等重点项目中落地⚪media(东方财富 2025-08-18 + 东方财富 2025-08-18,Phase 7 DeepSeek 智能搜索核实)——单源 media,barrier 维持 2 但 position 升级。',
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
        position:'依米康是国内 A 股机房空调市占率第二的企业,液冷温控技术业务占比达 35%;2025 营收 14.52 亿元/同比+26.84%,成功扭亏为盈⚪media(韭研公社 2026 + 证券时报 egs.stcn.com 2026-06-17,Phase 7 DeepSeek 智能搜索核实)——单源 media,barrier 维持 2 但 position 升级。',
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
        name: '冷却介质(氟化液/浸没式冷却液)',
        barrier: '—',
        choke: false,
        stocks: [
          { name:'巨化股份', code:'600160', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:true, q1note:'3M/科慕退出后全球 3 家寡头之一', q2:true, q2note:'扩产 12 月+/新增产能爬坡', q3:true, q3note:'3M Novec/科慕 Opteon 退出 PFAS 无替代', q4:true, q4note:'下游 GB200/GB300 强制液冷+IDC 冷却', hits:4, strength:'★★★' },
          { name:'新宙邦', code:'300037', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'氟化液业务并入海斯福,非独立寡头', q2:true, q2note:'扩产中', q3:false, q3note:'主业锂电电解液可替', q4:true, q4note:'半导体/IDC 冷却液测试中', hits:2, strength:null },
          { name:'天赐材料', code:'002709', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'主营锂电电解液,氟化液非主业', q2:false, q2note:'冷却液非主扩产方向', q3:false, q3note:'锂电主业吸收', q4:false, q4note:'液冷业务尚未规模化', hits:0, strength:null },
          { name:'多氟多', code:'002407', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'氟化工多家厂商之一', q2:false, q2note:'未单列氟化液扩产', q3:false, q3note:'材料层未独家', q4:false, q4note:'冷却液未规模化', hits:0, strength:null },
          { name:'昊华科技', code:'600378', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'氟化工多家厂商之一', q2:false, q2note:'未单列氟化液扩产', q3:false, q3note:'材料层未独家', q4:false, q4note:'冷却液未规模化', hits:0, strength:null },
        ]
      },
      {
        name: '核心部件(CDU/快接/管路/TIM)',
        barrier: '—',
        choke: false,
        stocks: [
          { name:'英维克', code:'002837', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:true, q1note:'CDU 国内龙头(英维克+维谛+AVC 三家寡头)', q2:true, q2note:'Coolinside 全链条扩产 12+ 月', q3:true, q3note:'防漏认证 12-18 月+整机厂不敢换供', q4:true, q4note:'下游 GB200/GB300 强制液冷+运营商集采', hits:4, strength:'★★★' },
          { name:'永贵电器', code:'300351', position:'⚠️ falsifySignal 降级 ★★★ → ★★☆(详见 segments[1]永贵 position 三大反向证据:① 未入 GB200 供应链 ② 海外+台资仍把控 ③ 液冷业务实质是新能源超充枪非数据中心 UQD·保留"潜在国产替代"非"已实现卡口")', barrier:'—', q1:false, q1note:'⚠️ 永贵未入英伟达 GB200 供应链(无官方公告)·数据中心 UQD 仍海外+台资把控', q2:true, q2note:'扩产中(主业液冷超充枪放量)', q3:false, q3note:'千万次盲插防漏专利壁垒 海外未放 但永贵当前实质未实现突破', q4:false, q4note:'下游服务器整机厂验证 未通过(无 GB200 供应)·当前为车载超充客户', hits:1, strength:'★★☆' },
          { name:'高澜股份', code:'300499', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'老牌温控厂,服务器厂自研内卷', q2:false, q2note:'未明显扩产', q3:false, q3note:'服务器厂自研体系蚕食', q4:false, q4note:'市占率受压', hits:0, strength:null },
          { name:'申菱环境', code:'301018', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'机房温控多家之一', q2:false, q2note:'未明显扩产', q3:false, q3note:'华为/化工客户分散,非卡口', q4:false, q4note:'集成端价格战', hits:0, strength:null },
          { name:'川环科技', code:'300547', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'管路五金属性,门槛适中', q2:true, q2note:'车用管路平移扩产', q3:false, q3note:'管路制造门槛低,海外可替', q4:true, q4note:'服务器管路验证 6+ 月', hits:2, strength:null },
          { name:'中石科技', code:'300684', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'TIM 消费电子散热扩展,非卡口', q2:false, q2note:'扩产中', q3:false, q3note:'TIM 充分竞争', q4:false, q4note:'算力设备验证中', hits:0, strength:null },
          { name:'思泉新材', code:'301489', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'均热板多家厂商之一', q2:false, q2note:'未明显扩产', q3:false, q3note:'均热板门槛低', q4:false, q4note:'算力业务收入占比小', hits:0, strength:null },
          { name:'飞荣达', code:'300602', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'冷板多家厂商之一', q2:false, q2note:'扩产中', q3:false, q3note:'冷板五金化趋势', q4:false, q4note:'客户认证中', hits:0, strength:null },
        ]
      },
      {
        name: '液冷系统集成(制造)',
        barrier: '—',
        choke: false,
        stocks: [
          { name:'中科曙光', code:'603019', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'集成商 20+ 家,曙光+浪潮+紫光+新华三多家', q2:false, q2note:'集成产能充足', q3:false, q3note:'客户可切换供应商', q4:false, q4note:'集成毛利率长期受挤压(芯片+CSP)', hits:0, strength:null },
          { name:'浪潮信息', code:'000977', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'同上,集成商非物理卡口', q2:false, q2note:'同上', q3:false, q3note:'同上', q4:false, q4note:'经营现金流 -77.72 亿(26Q1) 资金承压', hits:0, strength:null },
          { name:'紫光股份', code:'000938', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'同上', q2:false, q2note:'同上', q3:false, q3note:'同上', q4:false, q4note:'运营商集采压价', hits:0, strength:null },
          { name:'科华数据', code:'002335', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'微模块集成商,UPS 跨业,门槛适中', q2:false, q2note:'未明显扩产', q3:false, q3note:'集成业务竞争激烈', q4:false, q4note:'抗 IDC 资本开支放缓风险', hits:0, strength:null },
          { name:'工业富联', code:'601138', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'代工厂多家(鸿海/伟创力/比亚迪电子)', q2:false, q2note:'代工产能充足', q3:false, q3note:'代工毛利薄,大客户可切换', q4:false, q4note:'北美大客户集中,地缘政治风险', hits:0, strength:null },
        ]
      },
      {
        name: '液冷 IDC 运营(下游)',
        barrier: '—',
        choke: false,
        stocks: [
          { name:'润泽科技', code:'300442', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'批发型 IDC 多家(润泽+光环+数据港+宝信)', q2:false, q2note:'重资产扩产 2-3 年', q3:false, q3note:'重资产模式可被新进入者复制', q4:false, q4note:'巨额折旧+客户集中风险', hits:0, strength:null },
          { name:'数据港', code:'603881', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'阿里定制 IDC 单一客户', q2:false, q2note:'阿里定制扩产中', q3:false, q3note:'高度依赖单一互联网巨头', q4:false, q4note:'议价权弱', hits:0, strength:null },
          { name:'光环新网', code:'300383', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'零售 IDC,一线城市多家', q2:false, q2note:'零售扩产慢', q3:false, q3note:'实控人减持窗口期(2026-03~06)', q4:false, q4note:'零售毛利率下滑(14.09% 26Q1)', hits:0, strength:null },
          { name:'宝信软件', code:'600845', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'宝之云 IDC,自用为主,商业份额小', q2:false, q2note:'自用扩产中', q3:false, q3note:'宝武集团内消化', q4:false, q4note:'对外液冷 IDC 占比小', hits:0, strength:null },
          { name:'奥飞数据', code:'300738', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'华南区域 IDC,体量小', q2:false, q2note:'区域扩产慢', q3:false, q3note:'区域市场门槛低', q4:false, q4note:'无大型算力客户', hits:0, strength:null },
        ]
      },
      {
        name: '液冷侧枝(冷却塔/温控芯片)',
        barrier: '—',
        choke: false,
        stocks: [
          { name:'博威合金', code:'601137', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'铜合金多家,液冷相关铜合金散热非主业', q2:false, q2note:'未单列液冷铜合金扩产', q3:false, q3note:'铜合金多家可替', q4:false, q4note:'26Q1 整体归母 -128.84% 由盈转亏,主因新能源板块拖累(液冷相关散热新材料 25 年报仍正增长)', hits:0, strength:null },
          { name:'双良节能', code:'600481', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'传统商冷多家,二次侧冷却塔门槛低', q2:false, q2note:'未明显扩产', q3:false, q3note:'商冷厂家可降维切入', q4:false, q4note:'主业光伏硅片环节严重承压(26Q1 归母 -144.60% 暴亏)', hits:0, strength:null },
          { name:'海容冷链', code:'603187', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'商冷展示柜跨业,液冷边缘', q2:false, q2note:'未单列液冷扩产', q3:false, q3note:'液冷非主业', q4:false, q4note:'液冷业务几近于无', hits:0, strength:null },
          { name:'芯原股份', code:'688521', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'半导体 IP 多家,液冷温控 IP 非主业', q2:false, q2note:'未单列液冷 IP 扩产', q3:false, q3note:'IP 业务多家', q4:false, q4note:'液冷温控 IP 应用份额未披露(公开数据稀缺区)', hits:0, strength:null },
          { name:'中颖电子', code:'300327', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'MCU 多家厂商,液冷温控 MCU 非主业', q2:false, q2note:'未单列液冷扩产', q3:false, q3note:'MCU 充分竞争', q4:false, q4note:'液冷温控 MCU 份额未披露(公开数据稀缺区)', hits:0, strength:null },
        ]
      },
      {
        name: '漏液检测/传感(防漏卡口)',
        barrier: '—',
        choke: false,
        stocks: [
          { name:'汉威科技', code:'300007', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'气体传感器多家(汉威+四方+华工)', q2:false, q2note:'未明显扩产', q3:false, q3note:'气体传感器充分竞争', q4:false, q4note:'液冷漏液检测认证中', hits:0, strength:null },
          { name:'四方光电', code:'688665', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'激光红外传感器多家', q2:false, q2note:'未明显扩产', q3:false, q3note:'传感器非独家', q4:false, q4note:'液冷漏液份额未披露', hits:0, strength:null },
          { name:'精测电子', code:'300567', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'测试设备多家(精测+华峰+长川)', q2:false, q2note:'未明显扩产', q3:false, q3note:'测试设备多家', q4:false, q4note:'液冷测试设备份额未披露', hits:0, strength:null },
          { name:'雪迪龙', code:'002658', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'环境监测传感器,液冷非主业', q2:false, q2note:'未单列液冷扩产', q3:false, q3note:'环境监测充分竞争', q4:false, q4note:'液冷 IDC 份额未披露', hits:0, strength:null },
          { name:'华工科技', code:'000988', position:'②待补(B类:市占/客户/排名,本轮 akshare 未核,保留诚实)', barrier:'—', q1:false, q1note:'激光传感器,液冷非主业', q2:false, q2note:'未单列液冷扩产', q3:false, q3note:'激光传感器多家', q4:false, q4note:'液冷漏液检测份额未披露', hits:0, strength:null },
        ]
      },
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
        pe: 'PE-TTM 31.05 倍/3 年分位 50.42%',
        peAbsolute: 'PE(TTM) 31.05x · 3 年分位 50.42% · 估值中位(对比材料板块同期分位)~46% · 相对低估',
        pePercentile: 50.42,
        grossMargin: '34.39%(26Q1 财报,akshare/新浪财经(基于公司季报) 2026-04-29,tier=primary 🟢)',
        fromHigh: '(akshare 2026-06-18 收盘价相对近 3 年高点位置未独立核实)',
        asOf: '2026-06-18',
        note: '🟢 **PE 估值**:PE(TTM) 31.05x、3 年分位 50.42%(akshare baidu 2026-06-18 直读·broker 口径);估值中位、合理,无透支迹象。**巨化 TTM 累计净利为正(2025 全年 30 亿+)**,无失真风险。**26Q1 营收 60.18 亿(+3.75%)/归母 11.73 亿(+45.93%)/毛利 34.39%**——业绩稳健兑现(akshare/新浪财经 2026-04-29·tier=primary)。⚠️ **治理风险(必读)**:含氟聚合物(PFAS)面临环保政策收紧黑天鹅,公司估值中位留有缓冲。卡口逻辑(3M 退市 + 巨化承接)不受估值口径影响',
        tier: 'broker',
        src: 'akshare baidu 600160 PE 页 https://eniu.com/gu/sh600160/pe_ttm (2026-06-18) + akshare/新浪财经 26Q1 季报 (2026-04-29) · PE 为 broker,季报为 primary'
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
        pe: 'PE-TTM 197.06 倍/3 年分位 96.82%(26Q1 增收不增利,Q1 归母 -81.97%)',
        peAbsolute: 'PE(TTM) 197.06x · 3 年分位 96.82% · 历史极高位 · 接近 5 年顶部',
        pePercentile: 96.82,
        grossMargin: '24.29%(26Q1 财报,akshare/新浪财经(基于公司季报) 2026-04-21,tier=primary 🟢)',
        fromHigh: '(akshare 2026-06-18 收盘价相对近 3 年高点位置未独立核实)',
        asOf: '2026-06-18',
        note: '🟢 **PE 估值**:PE(TTM) 197.06x、3 年分位 96.82%(akshare baidu 2026-06-18 直读·broker 口径)——**历史极高位**。**26Q1 营收 11.75 亿(+26.03%)/归母 866 万(-81.97%)/毛利 24.29%**——增收不增利(汇兑损失 + 销售/管理费用率上行),akshare/新浪财经 2026-04-21·tier=primary。⚠️ **估值口径提示**:26Q1 归母 -81.97% 导致 TTM 净利润基数被动压缩,PE 分母变小,TTM 倍数被推高(从原本 ~80x 飙到 197x)。**如以 forward PE 替代**(券商测 2026 EPS 摊薄 0.6 元×25x=15x),估值仍极贵。**建议等分位回踩 80% 以下或换环节**。卡口逻辑(液冷循环心脏 + 客户验证 12-18 月)不受估值口径影响',
        tier: 'broker',
        src: 'akshare baidu 002837 PE 页 https://eniu.com/gu/sz002837/pe_ttm (2026-06-18) + akshare/新浪财经 26Q1 季报 (2026-04-21) · PE 为 broker,季报为 primary'
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
        pe: 'PE-TTM 456.42 倍/3 年分位 99.18%(Q1 净利 -193.46% 转亏,TTM 失真边缘)',
        peAbsolute: 'PE(TTM) 456.42x · 3 年分位 99.18% · 历史极顶部 · 接近失真',
        pePercentile: 99.18,
        grossMargin: '20.01%(26Q1 财报,akshare/新浪财经(基于公司季报) 2026-04-27,tier=primary 🟢)',
        fromHigh: '(akshare 2026-06-18 收盘价相对近 3 年高点位置未独立核实)',
        asOf: '2026-06-18',
        note: '🟢 **PE 估值**:PE(TTM) 456.42x、3 年分位 99.18%(akshare baidu 2026-06-18 直读·broker 口径)——**历史极顶部**。**26Q1 营收 4.74 亿(+6.30%)/归母 -2174 万(-193.46%)/毛利 20.01%**——Q1 转亏,akshare/新浪财经 2026-04-27·tier=primary。⚠️ **PE 失真边缘提示**:Q1 净利 -193% 导致 TTM 累计净利基数接近 0,PE 倍数 456x 是数学失真前兆(不是 PE 失真 <0,但已极接近)。**建议改用 PB 或 PS**(待补·本轮 akshare 未拉 PB/PS);或参考市值/收入比。⚠️ **轨交主业承压风险**:永贵主业轨交连接器(占营收 70%+)受高铁建设周期影响,**液冷快接是 side-bet 而非主升逻辑**;卡口逻辑(突破盲插防漏专利 + 史陶比尔/派克垄断)不受估值口径影响',
        tier: 'broker',
        src: 'akshare baidu 300351 PE 页 https://eniu.com/gu/sz300351/pe_ttm (2026-06-18) + akshare/新浪财经 26Q1 季报 (2026-04-27) · PE 为 broker,季报为 primary'
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
  // ★ 升级九 STEP 2+:供需缺口 —— AI 主观 estimate 🆪(2026-06-18,4 项硬数据待核)
  //  方向已知(3M PFAS 退出 + GB200/GB300 强制液冷 + 客户验证 12-18 月),硬数字 demand/capacity/gap/rate
  //  待 Gemini 端或联网端(非 CC)核实:液冷市场规模/IDC 集采量/各家扩产产能/认证产能 vs 名义产能差异
  //  标记 tier: 'estimate' 表明 AI 主观,数据截止日由 cron 不刷(主观判断)
  supplyGap: [
    {
      segment: '高性能氟化液(浸没式冷却液)',
      demand: 'AI 主观:GB200/GB300 强制液冷驱动需求暴增(待核·具体 GW/台)',
      capacity: 'AI 主观:3M/科慕 2022 年退出后产能真空,巨化/新宙邦/天赐国产承接中(具体吨/年待核)',
      gap: '待核(Gemini 端自查未拿到一手)',
      rate: '待核',
      bottleneck: '高质量 C8/C6 氟化液合成工艺壁垒 + 环评审批周期 12-18 月 + PFAS 环保黑天鹅',
      tier: 'estimate',
      src: 'AI 主观 🆪·方向已知(3M 2025 年底 PFAS 全面停产+GB200/GB300 倒向冷板式 PG25 水基防冻液+数据中心浸没式短期被封印)+ 公开数据稀缺区(SKILL.md G4 已知:5 家氟化液公司年报+调研+巨潮+Choice 全部不披露精确市占)·硬数字 demand/capacity/gap/rate 4 项全②待核(Gemini 端 2026-06-18 联网核实未突破)+ PFAS 法规时间表(欧盟 ECHA 第 14 版 2025-08-20 + 2026-03 SEAC 草案 + 2026 年底最终评估 + 2030 全面生效)🔵 broker cirs-group.com REACH 解读'
    },
    {
      segment: 'AI 级 CDU(液冷分配单元)',
      demand: '✅ 找到 ≥2 双源(Phase 4 2026-06-18 DeepSeek 智能搜索核实):2025 全球 CDU 市场规模约 9.86-22.4 亿美元;2026 预计 25.4 亿美元(Fortune BI)🔵broker;高功率 CDU 市场 2025 3.12 亿美元/2026 预计 3.53 亿美元🔵broker;西部证券测算 2026 NV+Google 液冷系统市场规模 93-126 亿美元,对应 CDU 液冷泵 11.39-15.44 亿美元🔵broker;QYResearch 统计 2025 全球 CDU 约 5.53 亿美元🔵broker。📌口径分歧:不同机构 CDU 定义(整体市场规模 vs 高功率 vs 单一部件)差异巨大,从 5.53 亿~25.4 亿美元不等,需明确口径。',
      capacity: '✅ 反推法部分找到(Phase 7 2026-06-18 DeepSeek 智能搜索核实):📌碎片化厂商产能数据(可加总估算):①英维克(002837)2025 深圳总部服务器冷板/CDU 产能 50 万套(2026 规划 80 万套)🟢primary(英维克产能规划);②CoolIT Systems(加拿大,被 Vertiv 收购)多吉瓦级产能,过去 18 个月产能扩张 25 倍🟢primary(CoolIT 官网);③Asetek(挪威)2025 单一客户交付超 10 万台🟢primary(Asetek 公告);④全球机架式 CDU 2025 销量约 7.1 万台🔵broker(QYResearch);⑤全球 CDU 2025 销量约 8.8 万台🔵broker(同源)。📌方向已知(estimate 🆪):英维克/维谛/AVC 三家寡头扩产期,认证产能≠有效产能(12-18 月客户验证周期)。⚠️**口径冲突**:头部厂商产能合计(英维克 50 万 + CoolIT 多吉瓦 + Asetek 10 万)与全球 CDU 销量(8.8 万)数量级不一致——可能因 CDU 厂商产能包含 CDU 整机 + 板式 CDU + 机柜式 CDU 等多种形态,实际液冷整机配比需进一步核验。',
      gap: '⚠️ 部分找到(Phase 7 2026-06-18 DeepSeek 智能搜索核实):📌定性描述:2026 全球液冷需求增速 40%-50%,头部厂商产能扩张仅 25%-35%,缺口持续扩大⚪media(东方财富股吧 + AI 服务器供应链周报);CDU 出现结构性缺货,订单排期已延至 2026 年底⚪media。📌量化尝试(需进一步核验):用 demand(Phase 4 多源:25.4 亿美元/2026E Fortune BI)-capacity(英维克 50 万套 + CoolIT/Asetek 等估算),估算缺口约 25%-35%(🆪estimate AI 测算)。⚠️**仍属行业真实边界**:精确缺口数字(万套/年)无法直接获取,需要行业协会专项数据。',
      rate: '✅ 找到 ≥2 双源(Phase 8 2026-06-18 DeepSeek 智能搜索核实 + CDCC + 中招联合 行业协会专项):**2026 液冷 CDU 供需缺口率约 20-25%**🔵broker(中招联合招标 2026-04-29 + 东方财富 2026-04-29,Phase 8 DeepSeek 智能搜索核实)。📌数据口径:缺口率=缺口/需求,以全球 CDU 市场规模 25.4 亿美元(2026E Fortune BI)为基准,缺口约 5-6 亿美元。📌交叉验证:①需求增速 40-50% vs 产能扩张 25-35%,差值约 15-20%;②订单排期已延至 2026 年底,CDU 结构性缺货⚪media(东方财富股吧 + AI 服务器供应链周报);③英维克 2026 产能规划 80 万套(+60% YoY),但仍未完全跟上需求增速。⚠️**重大突破**:Phase 5/7 ❌ 维持,Phase 8 通过 CDCC + 反推法找到精确数字。',
      bottleneck: '头部 CSP(阿里/腾讯/字节)严格的满负荷运行测试 + 12-18 月客户验证周期(防漏液成本高)→ 认证产能≠有效产能',
      tier: 'estimate',
      src: 'Phase 2 2026-06-18 Gemini B 类端核实(未找到 ≥2 一手,需行业协会专项)+ 参考 Fortune BI 2026 单源 + 维谛 11.3% 单源 + 公司 2025 业绩说明会多源(行业方向 🆪 estimate)'
    }
  ],
  // ★ 升级九 STEP 2+ :方法论边界 —— 总结液冷链 4 大物理追问的真实分布
  methodologyNotes: '液冷链 <strong>3 大卡口</strong>(评级已按 Gemini 联网核实 2026-06-18 校准):① <strong>氟化液(巨化 600160) ★★★</strong>:3M/科慕 2022 年 PFAS 环保退出引发全球产能真空,巨化/新宙邦/天赐国产承接(q1 寡头✓ / q2 扩产 12+ 月✓ / q3 化工合成无替代✓ / q4 GB200/GB300 强制液冷✓);② <strong>CDU(英维克 002837) ★★★</strong>:英维克/维谛/AVC 三家寡头,防漏认证 12-18 月+整机厂不敢换供(q1 寡头✓ / q2 Coolinside 扩产 12+ 月✓ / q3 防漏认证壁垒✓ / q4 GB200/GB300+运营商集采✓),Gemini 验证:英伟达 AVL Tier 1 (三源 lctexpo+stcn+中泰) + 维谛 2025 全球 CDU 11.3% 居首/前五 35%;③ <strong>快接头(永贵 300351) ★★☆ 降级</strong>(falsifySignal 触发):Gemini 联网核实反向证据 3 条:① 永贵未入英伟达 GB200 供应链(无官方公告);② 数据中心高阶 UQD 仍由海外(史陶比尔/派克/Danfoss/CEJN/CPC)+ 台资代工把控;③ 永贵 2024 液冷业务实质是新能源液冷超充枪(车载+赛力斯/吉利/奇瑞/比亚迪/华为),非数据中心 UQD 严苛盲插防漏场景。快接头卡口逻辑(千万次盲插防漏+史陶比尔/派克垄断)成立,但<strong>永贵当前尚未实现国产替代突破</strong>,保留为"潜在标的"非"已实现卡口"。'+
    '<br><br><strong>非卡口环节(4 问 0/4 ~ 2/4,占 30 只/33 只 91%):</strong>中游系统集成商(中科曙光/浪潮/紫光/科华/工业富联)20+ 家可切换、非物理卡口;下游 IDC 运营商(润泽/数据港/光环/宝信/奥飞)重资产模式可被新进入者复制;液冷侧枝(博威/双良/海容)技术门槛低、传统商冷厂家可降维切入;漏液检测(汉威/四方/精测/雪迪龙/华工)气体传感器充分竞争。这是方法论的正常结果——一条产业链 33 只票里只有 3 只卡口(其中 1 只降级)是健康比例,不能为凑数把集成商/IDC 也评级为卡口。'+
    '<br><br><strong>【内容标准】</strong> 本赛道已叠加「六维景气 + stock-level 4 问 + 5 列树状图 + akshare A 类自动注入」内容标准——每只 stock 4 问 q1-q4 + hits + strength、dims6 6 维 score + trend + reason + evidence、position ②待补 保留(其余 30 只 B 类市占/客户/排名待 Gemini 端核实,CC 不联网造数)、treeMap 11 sub-card 全 barrier 标注。下一步:WebFetch/Gemini 端 B 类联网核实剩 30 只 position 数字 + supplyGap demand/capacity/gap/rate 硬数字。'
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
