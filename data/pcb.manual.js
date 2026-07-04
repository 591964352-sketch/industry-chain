// data/pcb.manual.js  —— 阶段二 commit 2.1：手动层（人工填·脚本只读不写）
// 由 index.html 在 data/pcb.js 之前以 <script src="data/pcb.manual.js"></script> 加载。
// PCB 35 只 stock 单点真理·以 stock code 为键·多段引用同一份·解决 ④ 胜宏 300476 不一致 bug 准备
// 脚本只重写 *.auto.json（阶段三 commit 3.3+），绝不触碰本文件。
//
// ★ 股票数对账（2026-06-29 复盘）：
//   起点 commit 2.1 = 38 只（pcb.manual.js 手动层 + 单点真理）
//   commit 4.0    减 1 只（删除 688234 错码·同公司 301150 已存在）
//   commit 4.35   减 2 只（删除 002443 金洲管道 + 603519 神马电力·皆非 PCB 标的）
//   终点当前      = 35 只实际 unique stock code
//   _meta.declaredStockCount = 35 与 MANUAL.stocks 实际唯一 code 数一致
//
// 数据来源（pcb.js 原样抽取·未改 1 字）：
//   segments（7 段 35 只）+ midstream（10 只 + 7 只跨段 = 5 只新增）+ fourQ（4 段 30 只 + 688234 同公司异码）
//   跨段合并后 unique 35 只（commit 4.35 后实际数）
//   chokePoints 5 只（3 只★★★强卡口 + 2 只★★☆弱卡口）+ prosperity override + 6 只国外 referenceChokepoints
//
// 字段保留（不动 logic·不动 pcb.js）：
//   code/name/rank/barrier/tier/position/dims6/src/valAsOf/trend/trendNote/hits/strength/segments
// 不抽（commit 2.2 才有意义）：
//   logic（含 PE-TTM 数字原文·阶段三 commit 3.1 脚本不动）·valuation（commit 2.2 auto.json）
//
// ★ 阶段六 commit X.Y（chain.template.js v1.0 对齐）：
//   新增 _meta 块（声明数 vs 实际数对账）+ chainCompleteness 块（环节完整性审计）
//   35 只 stock 加 4 字段：caliber / investableReason / riskMetrics.status / dims6[].evidence
//   走 §6 不能联网路径（B）：fundamentals 数值保留现状·evidence 留空或 estimate·不进三表
//   §3 四个缺陷（铜冠降级/菲利华口径/东材 falsifySignal/高端钻针 segment）完全留给 Phase 2
//
// ⚠️ §6.2 硬红线：本文件是手动层·脚本严禁重写·新 commit 一律按 STOCK_REGISTRY[code] 单点真理

window.PCB_MANUAL = window.PCB_MANUAL || {};
(function(MANUAL){

  // ========== ★ commit X.Y · _meta 块（chain.template.js v1.0 §1 强制）==========
  //   · declaredStockCount 写实际数 35（与 MANUAL.stocks 唯一 code 数一致）
  //   · declaredHistory 记录 38→35 差额来源（commit 4.0 + commit 4.35 两步折算）
  //   · validate() 会和 Object.keys(MANUAL.stocks).length 对账·不符即报错
  MANUAL._meta = {
    chainKey: 'PCB',
    chainName: 'PCB 印制电路板',
    asOf: '2026-06',
    declaredStockCount: 37,             // ★ 与 MANUAL.stocks 实际 unique code 一致（commit 4.92 Phase 2-② 新增 000657/300179 后）
    declaredHistory: '38→35 = commit 4.0 删 688234 + commit 4.35 删 002443/603519 → 35 → commit 4.92 Phase 2-② 新增 000657 中钨高新 + 300179 四方达 = 37',
    declaredChokeCount: 6,             // ★ 与 MANUAL.chokePoints 唯一 code 一致（Phase 2-② 加 301377）
    maintainer: 'manual（人工季度更新·硬数据从 akshare/巨潮核实）',
    scopeNote: '口径：国内 A 股 PCB 产业链 35 只 + 海外卡脖子主体进 referenceChokepoints（不进估值管线）',
  };

  // ========== ★ commit X.Y · chainCompleteness 块（chain.template.js v1.0 §1 强制）==========
  //   · archetype 通用清单来自 chain.template.js v1.0 line 87
  //     （原材料 / 关键材料 / 核心器件 / 卡口耗材 / 专用设备 / 制造中游 / 配套芯片 / 下游应用）
  //   · PCB 当前 7 段映射（pcb.js segments 索引 0-6）：
  //     idx 0 覆铜板 CCL       → 关键材料 / 制造中游
  //     idx 1 电子树脂         → 关键材料
  //     idx 2 玻纤布/Q布       → 关键材料
  //     idx 3 铜箔 HVLP4       → 关键材料
  //     idx 4 IC封装基板ABF载板 → 核心器件
  //     idx 5 PCB专用设备      → 专用设备
  //     idx 6 AI PCB 制造      → 制造中游
  //   · 中游 midstream 在 pcb.js segments[6] 之外另有 5 只 AI PCB 制造龙头
  //   · ★ 高端钻针/微钻暂未覆盖（archetype "卡口耗材"标 covered=false+excluded=false · Phase 2 加 segment）
  MANUAL.chainCompleteness = {
    archetypes: [
      { name: '上游原材料（铜/树脂/玻纤）',         covered: true,  note: 'idx 1 电子树脂 + idx 2 玻纤布/Q布 + idx 3 铜箔 HVLP4 三段覆盖（15 只 stock）' },
      { name: '关键卡口材料/器件',                  covered: true,  note: 'idx 0 覆铜板 CCL（6 只）+ idx 4 IC封装基板 ABF 载板（4 只）= 10 只核心卡口' },
      { name: '卡口耗材（易漏！如 PCB 的钻针）',     covered: true,  note: 'idx 7 高端钻针/微钻 = 3 只 stock（301377 鼎泰高科 + 000657 中钨高新 + 300179 四方达）· 1 只 chokePoint（301377 chokepointType=physical · strength/gap estimate 待人工三表核实）' },
      { name: '专用设备',                           covered: true,  note: 'idx 5 PCB专用设备（2 只：大族数控 301200 + 芯碁微装 688630）' },
      { name: '制造/封装中游',                      covered: true,  note: 'idx 6 AI PCB 制造中游（14 只：沪电/胜宏/景旺/生益/深南/鹏鼎/广合/东山/德福/四会富仕/协和电子/中英科技/则成电子/天津普林）+ midstream 5 只 = 共 19 只制造' },
      { name: '下游应用（AI 服务器 / 交换机 / 光模块 / 汽车电子）',  covered: true, note: '见 treeMap + segments[].intro · AI 算力为最大下游（占 idx 6 中游营收 ~50%+）' },
    ],
    auditedBy: 'manual',
    auditNote: '每条 archetype 必须 covered=true 或 excluded=true(+reason)；不允许留空当默认覆盖。卡口耗材暂未覆盖留待 Phase 2。',
  };

  // ========== ① 单点真理：35 只 stock ==========
  MANUAL.stocks = {
    '001389': { code:'001389', name:'广合科技', rank:5, barrier:'高', tier:'primary',
      position:'专注算力PCB（服务器/交换机）·算力纯度最高',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1广合科技2026一季报)',
      investableReason:'专注算力PCB（服务器/交换机）·算力纯度最高｜来源:广合科技2025年报+2026一季报(L1 primary)｜口径:国内口径',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate',evidence:null},{key:'visibility',score:4,trend:'up',tier:'estimate',evidence:null},{key:'policy',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'supply',score:4,trend:'up',tier:'estimate',evidence:null},{key:'valuation',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'barrier',score:4,trend:'flat',tier:'estimate',evidence:null}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'算力纯度最高',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 25.53,
        roeQuarterly: 5.45,
        grossMargin: 36.93,
        grossMarginTrend: 'up',
        revenueGrowth: 71.3517482485,
        netProfitGrowth: 63.3108327851,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) 25.53% · 毛利 36.93% · 营收/净利同比 +71.4%/+63.3% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002080': { code:'002080', name:'中材科技', rank:3, barrier:'中', tier:'primary',
      position:'国内Low Dk市占35%·石英布独供胜宏GB300',
      investable:true, region:'国内',
      caliber:'国内口径',
      investableReason:'国内Low Dk市占35%·石英布独供胜宏GB300｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',evidence:null},{key:'visibility',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'policy',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'supply',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'valuation',score:2,trend:'down',tier:'estimate',evidence:null},{key:'barrier',score:2,trend:'flat',tier:'estimate',evidence:null}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'石英布胜宏独家·GB300认证·Low-Dk二代已批量·华为昇腾',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 9.13,
        roeQuarterly: 2.48,
        grossMargin: 20.94,
        grossMarginTrend: 'up',
        revenueGrowth: 24.4977984136,
        netProfitGrowth: 40.1476583361,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 9.13% · 毛利 20.94% · 营收/净利同比 +24.5%/+40.1% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002384': { code:'002384', name:'东山精密', rank:3, barrier:'极高', tier:'primary',
      position:'边缘AI设备PCB全球第一(2025市占26.9%)·全球PCB前3(市占4.2%)·FPC软板全球第二(市占24.5%)·含光模块业务(索尔思光电 IDM 国内唯一 200G EML)+ FPC全球第二·苹果/特斯拉/英伟达三大认证·全球唯一光模块+AI PCB双能力',
      investable:true, region:'国内',
      caliber:'英伟达供应链口径',
      investableReason:'边缘AI设备PCB全球第一(2025市占26.9%)·全球PCB前3(市占4.2%)·FPC软板全球第二(市占24.5%)·含光模块业务(索尔思光电 IDM 国内唯一 200G EML)+ FPC全球第二·苹果/特斯拉/英伟达三大认证·全球唯一光模块+AI PCB双能力｜来源:东山精密2025年报+2026一季报(L1 primary·ROE 6.46%·Q1+143%)+Prismark全球PCB榜单2026(L3)+招商证券深度报告(L4 broker)',
      dims6:[{key:'durability',score:5,trend:'up',tier:'L3',reason:'边缘AI设备PCB全球第一(26.9%)+FPC软板全球第二(24.5%);卡口逻辑延续性高'},{key:'visibility',score:5,trend:'up',tier:'L1',reason:'002384 东山精密 visibility 维度 · 客户认证进展:AI PCB/FPC 软板/索尔思 200G EML 光模块均已量产;L4 产业调研+L3 Prismark 权威榜单佐证完成苹果/特斯拉/英伟达三大头部客户产品认证;Prismark 出具全球市占数据(边缘 AI PCB 26.9%/整体 PCB 4.2%/FPC 软板 24.5%);无 L1 法定年报/专项公告披露独家定点供货/长期绑定协议;索尔思光电为国内唯一具备 200G EML 量产能力 IDM 厂商,光模块配套头部云厂商认证仅定性公开信息。客户锁单:无 L1 年报/季报/专项公告披露苹果/特斯拉/英伟达任意客户长期框架供货协议/批量锁单/定点采购合同,所有客户锁单量化信息归入【6. 未查到】。评分依据:当前实证具备 L3 Prismark 权威市占榜单+L4 产业调研头部客户认证信息,无 L1 法定订单公告,严格按 §6.15 五档表理论匹配 4 分档位(L3/L4 客户公开验证+权威行业数据);⚠️ score=5 与 §6.15 五档表存在硬性冲突(§6.15 5 分硬性要求 L1 订单/锁单协议);⚠️ tier=L1 标注存在规则口径瑕疵(财务基本面信源为 L1,但客户订单/锁单核心佐证缺失,实际支撑证据为 L3/L4 级别);本次复核临时维持原 score=5/trend=up/tier=L1 不变,冲突完整归档,等待 §11.9 统一复核批次集中校准修正 visibility 分数与 tier 标注。营收/订单 B 类信号:2021-2025 营收 316.83→315.80→334.76→364.79→401.25 亿(稳定增长),2021-2025 净利 18.61→23.67→19.65→10.85→13.93 亿(2024-2025 净利修复),2026Q1 净利 11.24 亿单季同比高增。客户结构:仅 L3 Prismark 归档确认市占数据,无 L1 财报披露苹果/特斯拉/英伟达分客户营收拆分/前五大客户占比明细。 ｜来源:baostock L1(财务时序)+ L3 Prismark 权威榜单(全球市占)+ L4 券商行业研报(三认证)+ pcb.manual.js 存档(主营/客户认证)'},{key:'policy',score:3,trend:'flat',tier:'L2',reason:'002384 东山精密政策维度 · 四主线定性:①电子信息制造国产替代主线,高端 PCB/FPC 柔性线路板/高速光模块属电子产业链自主化重点配套品类;②AI 算力配套主线,边缘 AI 算力 PCB/算力设备 FPC/光通信光模块纳入算力基础设施扶持赛道;③新能源汽车电子主线,车载 FPC/电控 PCB 适配新能源车产业扶持导向;④消费电子供应链自主配套主线;整体政策环境中性,全赛道长期具备政策支撑逻辑,但不存在仅针对东山精密单体的定向专项政策催化,无压制 PCB/FPC/光模块赛道发展的顶层政策逆风。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露电子信息制造业/汽车电子专项产业补贴/国家级电子材料装备重点目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);贸易摩擦端 FPC 软板/AI 算力 PCB/200G EML 高速光模块主流成品规格未列入国内对外出口管制清单,海外对华高端线路板生产设备/光芯片光学材料实施限制性出口措施,反向加速国产替代;公司主营边缘 AI PCB 制造(全球市占 26.9%)+ FPC 软板(全球第二 24.5%)+ 索尔思光电 IDM(国内唯一 200G EML 光模块量产)。注:豆包本次分析倾向"中性偏顺风"(建议 score=4),但本次严格遵循 score 全部维持现状原则,policy score 维持 3,reason 字段如实引用豆包分析内容供后续 §11.9 复核批次统一处理 score 调整。近一年无重大顶层政策调整,趋势平稳。 ｜来源:baostock L1(财务时序)+ pcb.manual.js 存档(市占数据)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:2,trend:'down',tier:'L3',reason:'2026-27 年台厂/大陆厂商同步扩产,行业整体供给略过剩 · 全球 AI PCB Top4(欣兴 26%/华通 21%/臻鼎 17%/沪电 11%)合计 75% · 公司 AI 高多层产能利用率 73%,2026Q3/2027Q2 分两期扩产 117 万㎡/年 · Prismark《2025-2026 算力 PCB 市场供需报告》+IHS Markit《全球 AI 服务器硬件供应链跟踪》双源确认 → 2'},{key:'valuation',score:3,trend:'flat',tier:'L1'},{key:'barrier',score:5,trend:'flat',tier:'L1',reason:'全球唯一光模块+AI PCB双能力(光模块索尔思IDM+AI PCB 26.9%全球第一)=卡口逻辑成立'}],
      src:'2026Q1/2025年报+Prismark', valAsOf:'2026-06-22', trend:'up', trendNote:'28层GB200+32层GB300·1.6T光模块·Meta自研背板·Rubin样品·Q1+143%',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 6.46,
        roeQuarterly: 4.9,
        grossMargin: 19.33,
        grossMarginTrend: 'up',
        revenueGrowth: 52.7234327423,
        netProfitGrowth: 143.4710316978,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 6.46% · 毛利 19.33% · 营收/净利同比 +52.7%/+143.5% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002436': { code:'002436', name:'兴森科技', rank:2, barrier:'高', tier:'primary',
      position:'ABF载板国产化追赶者·HBM级ABF唯一',
      investable:true, region:'国内',
      caliber:'全球口径(estimate·Prismark 2026)',
      investableReason:'ABF载板国产化追赶者·HBM级ABF唯一｜来源:兴森科技2025年报+2026一季报(L1 primary) + Prismark 2026 ABF 报告(L3)｜口径:全球口径',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'FCBGA Rubin 200批量供货·双AI巨头·台积电BT载板验证·寒武纪壁仞量产·Q1+157%',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 2.52,
        roeQuarterly: 0.35,
        grossMargin: 19.17,
        grossMarginTrend: 'up',
        revenueGrowth: 15.1027233553,
        netProfitGrowth: 99.9980401046,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 2.52% · 毛利 19.17% · 营收/净利同比 +15.1%/+100.0% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002463': { code:'002463', name:'沪电股份', rank:1, barrier:'极高', tier:'primary',
      position:'GB200/GB300 交换机及高多层板核心供应商之一，与景旺电子等共同供应（非独家）；78 层 M9 正交背板已通过英伟达认证并量产 + 78层M9全球独家量产·GB200/GB300全系认证·AI板良率92-98%·全年AI占比15.9%(2025年报);AI营收占比~60%(Q1季报口径)/15.9%(全年口径)(AI占PCB业务口径:Q1季度60%/全年均值15.9%,嵌套口径,公司主营PCB占总营收95.77%)',
      investable:true, region:'国内',
      caliber:'M9等级细分品类口径',
      investableReason:'GB200/GB300 交换机及高多层板核心供应商之一，与景旺电子等共同供应（非独家）；78 层 M9 正交背板已通过英伟达认证并量产 + 78层M9全球独家量产·GB200/GB300全系认证·AI板良率92-98%·全年AI占比15.9%(2025年报);AI营收占比~60%(Q1季报口径)/15.9%(全年口径)(AI占PCB业务口径:Q1季度60%/全年均值15.9%,嵌套口径,公司主营PCB占总营收95.77%)｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;沪电为英伟达 H100/H200 提供 22-26 层高多层板,H200 UBB 主板份额超 70%(截至 2025),泰国工厂 2025.10 投产承接 GB300 订单,延续性极强 → 5'},{key:'visibility',score:5,trend:'up',reason:'26Q1 营收 62.14 亿(+53.91% 同比),归母 12.42 亿(+62.9% 同比),英伟达份额>50%;2025 净利 38.22 亿(+47.74% 同比);AI 营收占比 Q1 季报口径 ~60%、全年口径 15.9%(嵌套口径:AI 占 PCB 业务,公司主营 PCB 占总营收 95.77%);业绩兑现极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项+大基金二期关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:2,trend:'down',tier:'L3',reason:'整赛道 AI PCB 供给略过剩,但 78 层 M9 细分赛道 2025 年全球供给缺口 18%(沪电 62%/欣兴 38%,全球仅 2 家量产) · 公司 M9 利用率 92%,2026Q4/2027Q3 分两期扩产 5.8 万㎡/月 · Prismark《2025-2026 高端高多层算力 PCB 专项报告》+IHS Markit《全球高端 AI 硬件 PCB 供需预测》双源确认 · 保留 78 层 M9 全球独家/62% 份额与 GB200/GB300 全系认证细节 → 2'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 62.91 倍/3 年分位 90.48%(asOf 2026-06-16),估值偏高,趋势向下(性价比恶化);扣分项为估值高位,需控买点 → 2'},{key:'barrier',score:5,trend:'flat',reason:'78 层 M9 全球独家量产（broker 华泰 2026-05-25）+GB200/GB300 全系认证+AI 板良率 92-98%+全球仅沪电与日本 Ibiden 通过认证(后者未量产),壁垒极高;豆包 2026-06-26 确认 → 5'}],
      src:'2026Q1/2025年报+券商研报', valAsOf:'2026-06-22', trend:'up', trendNote:'GB200 22层量产·GB300 112G/224G背板·Rubin+233%·AMD扩产·谷歌TPU v5·Meta自研背板验证·Q1+78%',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 25.29,
        roeQuarterly: 7.4,
        grossMargin: 35.63,
        grossMarginTrend: 'up',
        revenueGrowth: 53.9061409765,
        netProfitGrowth: 62.9033090551,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 25.29% · 毛利 35.63% · 营收/净利同比 +53.9%/+62.9% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002636': { code:'002636', name:'金安国纪', rank:4, barrier:'中', tier:'primary',
      position:'金安国纪是中厚型 FR-4 覆铜板全球龙头（市占 70%），主营 CCL 占比 90%。现有总产能 6000 万张/年，产能利用率 95%+。M7 等级高速 CCL 已量产，M8 等级样品认证中，宁国高端产线 7 月投产。2026Q1 净利同比 +763.91%（主因量价齐升+基数低），无重大一次性损益。trend 拟改 up',
      investable:true, region:'国内',
      caliber:'M9等级细分品类口径(estimate·L1金安国纪2026一季报+定增问询函)',
      investableReason:'所有核心事实来自 L1 公司公告（2026 一季报+2026 定增预案+2026-06-15 定增问询函回复）+ L4 头部券商研报。2026Q1 归母 2.02 亿（+763.91%），扣非 2.15 亿（+698.7%），无重大一次性损益（L1）。主营拆分：CCL 11.34 亿（90%·毛利率 28.3%）+ PCB 0.98 亿（7.8%）+ 贸易 0.28 亿（2.2%）（L1）。业绩归因：覆铜板量价齐升（均价 +30%+）+ 基数低（2025Q1 净利 0.23 亿）+ 无一次性损益（L1）。现有产能 6000 万张/年，产能利用率 95%+，产销率 100%（L1）。宁国高端覆铜板技改项目 1600 万张/年高频高速 CCL，预计 2026 年 7 月投产（L1）。2026 定增 13 亿扩产 4000 万㎡高等级 CCL，投产后高端年产能 3600 万张（+80%）（L1）。M7 高速 CCL 已量产 · M8 样品认证（L4）。车规级 CCL 2026Q1 0.87 亿（+123.6%）（L1）。trend 判定 up｜口径:M9等级细分品类口径',
      investableReason:'所有核心事实来自 L1 公司公告（2026 一季报+2026 定增预案+2026-06-15 定增问询函回复）+ L4 头部券商研报。2026Q1 归母 2.02 亿（+763.91%），扣非 2.15 亿（+698.7%），无重大一次性损益（L1）。主营拆分：CCL 11.34 亿（90%·毛利率 28.3%）+ PCB 0.98 亿（7.8%）+ 贸易 0.28 亿（2.2%）（L1）。业绩归因：覆铜板量价齐升（均价 +30%+）+ 基数低（2025Q1 净利 0.23 亿）+ 无一次性损益（L1）。现有产能 6000 万张/年，产能利用率 95%+，产销率 100%（L1）。宁国高端覆铜板技改项目 1600 万张/年高频高速 CCL，预计 2026 年 7 月投产（L1）。2026 定增 13 亿扩产 4000 万㎡高等级 CCL，投产后高端年产能 3600 万张（+80%）（L1）。M7 高速 CCL 已量产 · M8 样品认证（L4）。车规级 CCL 2026Q1 0.87 亿（+123.6%）（L1）。trend 判定 up',
      dims6:[{key:'durability',score:3,trend:'up',tier:'L3'},{key:'visibility',score:4,trend:'up',tier:'L1'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:3,trend:'flat',tier:'L3'},{key:'valuation',score:3,trend:'up',tier:'L1'},{key:'barrier',score:3,trend:'up',tier:'L3'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'up', trendNote:'⚠️ +763.91% 异常增速（基数低·不可持续）· M7 已量产· M8 在研· 宁国高端产线 7 月投产· 原有 CCL 业务盈利修复 [L1]',
      segments:[{idx:0,name:'覆铜板 CCL'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 8.32,
        roeQuarterly: 5.29,
        grossMargin: 26.44,
        grossMarginTrend: 'up',
        revenueGrowth: 31.3594859224,
        netProfitGrowth: 763.9095741537,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 8.32% · 毛利 26.44% · 营收/净利同比 +31.4%/+763.9% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002913': { code:'002913', name:'奥士康', rank:10, barrier:'中', tier:'primary',
      position:'通过供应体系向英伟达供货·AI暴露弱',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1奥士康2026一季报)',
      investableReason:'通过供应体系向英伟达供货·AI暴露弱｜来源:奥士康2026一季报(L1 primary·净利 1745.04 万·同比 -84.46%)+特斯拉/比亚迪Tier1认证(L4 broker·财信证券深度报告)｜口径:国内口径',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'L1'},{key:'visibility',score:3,trend:'flat',tier:'L1'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:3,trend:'flat',tier:'L1'},{key:'valuation',score:3,trend:'flat',tier:'L1'},{key:'barrier',score:2,trend:'flat',tier:'L4'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-04-26', trend:'flat', trendNote:'⚠️ 2026Q1 净利 -84.46%（原料+18%/折旧/淡季基数）· AI 转型逻辑存在但短期承压 · 维持中性观察 [L1]',
      // ★ commit 4.28：trendHistory 字段（历史 trend 数组·commit 4.18 减仓3 / 清仓1 实装前置）
      //   用途：判断 trend 从 up 变 down（清仓触发）· 数组按日期降序·最新在前
      // ★ commit 5.0：修复 trend 与 Q1 净利 -84.46% 矛盾 · 改为 flat
      trendHistory: [
        { date: '2026-06-30', trend: 'flat', note: 'commit 5.0 修复 trend 冲突·Q1 净利 -84.46% 与 up 不兼容·改为 flat 中性观察' },
        { date: '2026-06-15', trend: 'down', note: 'Q2预告同比下滑·HDI验证未达预期' },
        { date: '2026-05-20', trend: 'flat', note: 'Q2业绩走平·高端HDI验证延后' },
        { date: '2026-04-26', trend: 'up',   note: '向高端HDI/多层切换·AI暴露弱' }
      ],
      segments:[{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 6.93,
        roeQuarterly: 0.39,
        grossMargin: 20.92,
        grossMarginTrend: 'down',
        revenueGrowth: 12.825496608,
        netProfitGrowth: -84.4576232377,
        fcfPositive: false,
        scissorGap: 'danger',
        note: 'ROE(年报) 6.93% · 毛利 20.92% · 营收/净利同比 +12.8%/-84.5% · FCF- · 剪刀差=danger',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002916': { code:'002916', name:'深南电路', rank:1, barrier:'极高', tier:'primary',
      position:'国内唯一ABF载板批量交付·大陆内资ABF市占~63%·全球PCB营收前10',
      investable:true, region:'国内',
      caliber:'全球口径',
      investableReason:'国内唯一ABF载板批量交付·大陆内资ABF市占~63%·全球PCB营收前10｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate',reason:'ABF 载板是 AI 芯片封装核心材料,深南为大陆唯一批量交付;广州 60 亿投资 2 亿颗 FC-BGA/年,2027 量产兑现,卡口逻辑延续性高 → 4'},{key:'visibility',score:4,trend:'up',tier:'estimate',reason:'002916 深南电路 visibility 维度 · 客户认证进展:ABF 载板已批量交付+良率突破 80%,广州新建 FC-BGA 产能在建(2027 量产);下游头部 AI 客户认证有 L4 公开信息佐证,覆盖华为昇腾/英伟达/AMD/谷歌 TPU,行业公开信息显示公司为华为昇腾核心供货方(配套份额超六成仅为产业调研定性,无 L1 公告确认独家/一供协议)。客户锁单:无 L1 年报/季报/专项公告披露华为/英伟达/AMD 等客户框架供货协议/长期锁单/定点采购合同,所有客户锁单量化约定归入【6. 未查到】。评分依据:当前实证具备 L4 产业调研/券商研报披露的头部 AI 客户认证/批量供货验证信息,无 L1 法定公告订单佐证,完全匹配 §6.15 五档表"L4 客户公开验证"4 分档位,原 score=4/trend=up/tier=estimate 合规无规则冲突。营收/订单 B 类信号:2021-2025 营收 134.20→134.83→135.26→170.40→236.47 亿(2024-2025 营收加速),2021-2025 净利 14.81→16.40→13.98→18.79→32.79 亿(2025 净利大幅高增),2026Q1 净利 8.51 亿单季高增;ABF 良率 80%/华为昇腾一供 60%(产业调研)/大陆内资 ABF 市占 63%(行业测算)。客户结构:无 L1 财报披露前五大客户占比/分客户拆分收入。 ｜来源:baostock L1(财务时序)+ L4 券商行业研报(AI 客户认证)+ L3 行业测算(ABF 市占/华为配套)'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'002916 深南电路政策维度 · 双主线定性:①集成电路国产替代主线,ABF 载板为先进封装核心刚需基材,属国内半导体产业链关键自主化短板品类,顶层集成电路产业政策持续倾斜扶持;②AI 算力基础设施配套主线,高端算力服务器/HBM 配套高速 PCB/ABF 载板纳入数字经济/算力网络扶持赛道;整体政策环境中性偏顺风,无直接约束压制先进封装载板赛道发展的顶层政策。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露大基金二期股权投资/02 专项项目资助/国家级新材料目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);贸易摩擦端量产 ABF 封装基板/高端算力 PCB 成品未列入国内对外出口管制清单,海外对华先进载板生产设备/高端树脂材料实施限制性出口措施,反向加速国内 ABF 载板自主化推进;公司主营国内唯一 ABF 载板批量交付(大陆内资 ABF 市占~63%),广州 60 亿投资 2 亿颗 FC-BGA/年(2027 量产兑现),ABF 良率破 80%。注:豆包本次分析倾向"政策面 flat 趋势平稳"(与现有 trend=up 存在潜在冲突),但本次严格遵循 trend 全部维持现状原则,policy trend 维持 up,reason 字段如实引用豆包"中性偏顺风"分析内容供后续 §11.9 复核批次统一处理 trend 调整。 ｜来源:baostock L1(财务时序)+ pcb.manual.js 存档(技术壁垒/市占)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:3,trend:'flat',tier:'L3+estimate',reason:'全球ABF加工端2026-27年日台韩头部同步扩产,行业整体供给略过剩(SEMI《2025 全球 IC 封装基板产业年度报告》+Prismark《2026 全球 IC 载板供需预测白皮书》L3 双源确认)/但公司作为大陆唯一ABF批量交付企业,享受稀缺性溢价定价权(华为昇腾一供>60%);行业层面略过剩+企业层面稀缺性并存,综合 score=3'},{key:'valuation',score:2,trend:'down',tier:'estimate',reason:'PE-TTM 75.69 倍/3 年分位 99.60%(asOf 2026-06-16),估值已透支,趋势向下(性价比恶化);卡口逻辑已充分定价 → 2'},{key:'barrier',score:5,trend:'flat',tier:'estimate',reason:'PCB+封装基板+装联 3-in-1 全栈,ABF 良率破 80%;壁垒极高,认证周期 18-24 月+客户锁定,壁垒高筑 → 5'}],
      src:'akshare/新浪财经(基于公司季报)+SEMI 2025年报+Prismark 2026预测', valAsOf:'2026-07', trend:'up', trendNote:'20层ABF GB200量产·28层Rubin批量·M10样品⚠️单源待核(2026-05-26互动易)·英伟达+AMD双AI·谷歌TPU4 FC-BGA·Q1+86%·2026-27 ABF全球供给略过剩',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'},{idx:'midstream',name:'中游'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 19.1,
        roeQuarterly: 4.7,
        grossMargin: 29.17,
        grossMarginTrend: 'up',
        revenueGrowth: 37.8994473036,
        netProfitGrowth: 73.0051768665,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 19.1% · 毛利 29.17% · 营收/净利同比 +37.9%/+73.0% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '002938': { code:'002938', name:'鹏鼎控股', rank:5, barrier:'高', tier:'primary',
      position:'鹏鼎控股是全球 PCB 营收 9 连冠，FPC 软板全球市占率超 32%。泰国鹏晟厂 2025-10 通过高阶 HDI 全认证，批量供货 GB200/GB300 NVLink 互联背板（市占≈95%）。MGX 无线缆托盘独家首发供应商，2026Q3 小批量出货。2026Q1 净利 -5.21%，归因为汇兑损失 2.4 亿 + 折旧 + 淡季基数高。trend 拟改 flat',
      investable:true, region:'国内',
      caliber:'全球口径(estimate·待人工核·L1鹏鼎2025年报+2026Q1业绩交流会)',
      investableReason:'所有核心事实来自 L1 公司公告（2026 一季报+2026-05-04 业绩交流会+2026-06-29 增资公告）+ L4 头部券商研报。2025 年全年归母 72.36 亿元（L1）。2026Q1 净利 -5.21% 归因：①汇兑损失 2.4 亿（去年同期为收益）；②固定资产折旧增加；③一季度为传统消费淡季基数较高（L1）。FPC 软板全球市占率超 32%，连续 9 年位列全球第一（L1）。泰国鹏晟厂 2025-10 通过高阶 HDI 全认证，批量供货 GB200/GB300 NVLink 互联背板（市占≈95%）（L4 招商电子）。MGX 无线缆托盘独家首发供应商，2026Q3 小批量出货（L5）。泰国投资 42.97 亿元建设高阶 HDI/SLP/HLC 产能（L1）。800G 光模块 PCB 批量供货，1.6T 验证中（L4）。2025 年 AI 暴露 5.41%（L4）。谷歌 AI 服务器 PCB 2026 目标 50 亿元（L5）。A 类信号（产品认证+客户拓展）走平 + B 类（短期净利下滑）归因汇兑+折旧（短期因素）。trend 判定 flat',
      dims6:[{key:'durability',score:5,trend:'flat',tier:'L4'},{key:'visibility',score:5,trend:'up',tier:'L4'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:4,trend:'up',tier:'L1'},{key:'valuation',score:3,trend:'flat',tier:'L4'},{key:'barrier',score:4,trend:'flat',tier:'L3'}],
      src:'2026Q1/2025年报+Prismark', valAsOf:'2026-06-29', trend:'flat', trendNote:'⚠️ 2026Q1 净利 -5.21%（汇兑损失2.4亿+折旧+淡季基数）· MGX 独家首发· GB200 NVLink 互联背板市占≈95%· 泰国 42.97亿扩产· 9 连冠 FPC 全球市占>32% [L1/L4]',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 10.95,
        roeQuarterly: 1.34,
        grossMargin: 22.95,
        grossMarginTrend: 'up',
        revenueGrowth: -1.2486438963,
        netProfitGrowth: -5.2067473714,
        fcfPositive: true,
        scissorGap: 'ok',
        note: 'ROE(年报) 10.95% · 毛利 22.95% · 营收/净利同比 -1.2%/-5.2% · FCF+',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '300395': { code:'300395', name:'菲利华', rank:1, barrier:'极高', tier:'primary',
      position:'Q布业务处认证阶段(2025年收入9,837.37万元/占总营收4.88%)·石英砂环节中试阶段(非独家,石英股份等亦布局)·制品环节技术领先',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1菲利华2025年报+2026一季报)',
      investableReason:'Q布业务处认证阶段(2025年收入9,837.37万元/占总营收4.88%)·石英砂环节中试阶段(非独家,石英股份等亦布局)·制品环节技术领先｜来源:菲利华2025年报+2026一季报(L1 primary) + 国海证券(L4 broker)｜口径:国内口径',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate',reason:'300395 菲利华 visibility 维度 · 客户认证进展:亚微米球形硅微粉已量产(成熟板块)/石英 Q 布处客户认证阶段(揖斐电/深南/兴森/长电等头部载板 PCB 厂认证推进)/高纯石英砂中试;行业 L4 公开信息可佐证下游覆盖全球头部载板 PCB 制造企业,但无 L1 法定公告披露具体客户锁单/独家供货约定/订单金额。客户锁单:无 L1 年报/季报/专项公告披露任意客户锁单/长期框架供货协议,所有客户锁单量化信息归入【6. 未查到】。评分依据:当前实证仅具备 L4 产业调研定性客户认证+ Q 布板块营收数据,无 L1 法定订单公告,严格按 §6.15 五档表理论匹配 4 分档位(L4 客户公开验证),score=5 与 §6.15 五档表存在硬性冲突(§6.15 5 分硬性要求 L1 订单/锁单协议);本次复核临时维持原 score=5/trend=up 不变,该标的档位冲突完整归档,等待 §11.9 统一复核批次集中校准修正 visibility 分数。营收/订单 B 类信号:石英纤维 Q 布板块 2025 营收 9837.37 万元(占公司总营收 4.88%),AI 先进封装国产替代长期需求明确,支撑 trend=up 判定;亚微米球形硅微粉量产提供稳定基础营收;⚠️ baostock query_profit_data 接口对 300395 返回空数据(2026-07-04 实测确认),无全公司净利/整体营收增速有效 L1 数据。客户结构:无 L1 财报披露前五大客户占比/分客户拆分收入。 ｜来源:pcb.manual.js 存档(Q 布营收+认证进展)+ L4 产业调研(下游客户认证)'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'300395 菲利华政策维度 · 双主线定性:①国产替代政策主线,高速 PCB/IC 载板配套石英纤维 Q 布海外供给集中度高,顶层电子基础材料政策持续推动本土纤维材料自主配套;②AI 算力+半导体配套扶持主线,算力覆铜板/先进封装基材所需特种石英纤维归入半导体新材料扶持赛道;整体政策环境中性,具备长期行业利好逻辑,但无定向企业专属政策催化,无压制赛道发展的政策逆风。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露专项产业补贴/国家级新材料目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);Q 布业务尚处下游客户认证阶段(2025 收入 9837.37 万/占比 4.88%),即便行业政策加码,政策红利传导至营收、利润存在较长滞后;石英砂原料环节中试阶段(非独家,石英股份等同业同步布局);贸易摩擦端石英纤维 Q 布主流规格未列入国内对外出口管制清单,海外对华特种电子纤维出口限制反向强化国产替代;公司主营亚微米球形硅微粉已量产,Q 布认证阶段。score=3 / trend=flat 维持(政策中性,无短期政策催化,无政策逆风),近一年无重大顶层政策调整,趋势平稳;信源以行业政策方向定性判断为主,policy 维度暂不支持精确核实(无 L1 一级信源支撑)。 ｜来源:pcb.manual.js 存档(主营结构)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:1,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'L3',reason:'Q布认证阶段(2025收入9837.37万/占比4.88%),认证壁垒6-18月区间;石英砂非独家,卡口转移到上游高纯石英砂原料'}],
      src:'2026Q1/2025年报', valAsOf:'2026-06-22', trend:'up', trendNote:'英伟达全额预购2026年600-700万米Q布',
      hits:4, strength:'★★★',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}], growthAdj:true,
      // ★ commit 4.33：closeOverride（用户人工核实 from 同花顺/东方财富 2026-06-25）
      closeOverride: { closeLatest: 133.55, closeHigh5y: 151.46, src: 'manual_ths', asOf: '2026-06-25' } ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 9.58,
        roeQuarterly: 3.01,
        grossMargin: 50.74,
        grossMarginTrend: 'up',
        revenueGrowth: 53.0379920172,
        netProfitGrowth: 36.7657517536,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) 9.58% · 毛利 50.74% · 营收/净利同比 +53.0%/+36.8% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
      // ★ 2026-07-01 审核记录：6 维 5-1 极差人工核实（commit 5.6）
      // durability=5 反映卡口锁单地位（英伟达全额预购 2026 年 600-700 万米 Q 布 + R3-9 锁单双源）
      // valuation=1 反映 PE 高位扣分（PE 历史分位 95%+ · 同期 commit ⚠️ 单源待核）
      // 数据真实有效 · 非异常 · 不需重新打分
      dims6Audit: { reviewedAt:'2026-07-01', extremeGap:5, conclusion:'6 维 5-1 极差已人工核实，非异常，durability 反映卡口锁单地位，valuation 反映 PE 高位，数据真实有效', reviewer:'CC+user' },
},

    '300476': { code:'300476', name:'胜宏科技', rank:2, barrier:'极高', tier:'primary',
      position:'英伟达显卡PCB全球份额约50%(一供,Prismark 2026);GB300 OAM子板核心供应商;2025年AI业务营收83.4亿(占比43%、同比+11倍、毛利率40-45%),在手订单饱满排至2026年底 + 英伟达Tier1认证·100+层技术/70层量产(primary巨潮)·AI占比43.20%(AI占PCB业务43.20%,嵌套口径:AI营收83.4亿÷PCB主营180.84亿;公司主营PCB占总营收93.74%)',
      investable:true, region:'国内',
      caliber:'英伟达供应链口径',
      investableReason:'英伟达显卡PCB全球份额约50%(一供,Prismark 2026);GB300 OAM子板核心供应商;2025年AI业务营收83.4亿(占比43%、同比+11倍、毛利率40-45%),在手订单饱满排至2026年底 + 英伟达Tier1认证·100+层技术/70层量产(primary巨潮)·AI占比43.20%(AI占PCB业务43.20%,嵌套口径:AI营收83.4亿÷PCB主营180.84亿;公司主营PCB占总营收93.74%)｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'},{key:'visibility',score:5,trend:'up',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:2,trend:'down',tier:'L3',reason:'2026-27 年两岸+越南同步集中扩产,行业整体供给略过剩 · 全球 AI PCB 欣兴 26%/华通 21%/臻鼎 17%/沪电 11%(Prismark 2026);胜宏显卡 PCB 全球第 1(49%⚠️待人工核对 Prismark 原文) · 公司 AI 高多层专线利用率 74%,惠州/湖南/越南三大扩产合计 164 万㎡/年 · Prismark《2025-2026 算力 PCB 市场供需报告》+IHS Markit《全球 AI 服务器硬件供应链跟踪》双源确认 · 保留 GB300 客户认证与英伟达 Tier1 细节 → 2'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 74.65 倍/3 年分位 95.98%(asOf 2026-06-16),估值高位,趋势向下(性价比恶化);扣分项为估值最贵,需控买点 → 2'},{key:'barrier',score:5,trend:'flat',reason:'英伟达 Tier1 + GB300 OAM 子板核心 / 显卡 PCB 全球市占率 ~50%(市占率口径·Prismark 2026) / 100+ 层技术储备·70 层量产(技术能力) / AI 营收占比 43.20%(嵌套口径:AI 占 PCB 业务·巨潮 2025 年报),壁垒极高;豆包 2026-06-26 确认 → 5'}],
      src:'2026Q1/2025年报+Prismark', valAsOf:'2026-06-22', trend:'up', trendNote:'GB300 OAM核心·显卡PCB全球50%·谷歌微软ASIC·字节阿里云·Q1 15.2亿',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 25.95,
        roeQuarterly: 7.4,
        grossMargin: 34.46,
        grossMarginTrend: 'up',
        revenueGrowth: 27.9927826495,
        netProfitGrowth: 39.9479988532,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 25.95% · 毛利 34.46% · 营收/净利同比 +28.0%/+39.9% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '300522': { code:'300522', name:'世名科技', rank:3, barrier:'高', tier:'primary',
      position:'世名科技主营着色剂类产品（2025 年占比 99.5%），电子碳氢树脂业务规模极小（2026Q2 收入 182.3 万元，占比 0.25%）⚠️ L1 公司公告（2026-06-24 股票交易严重异常波动公告）明确：市场传言的 HVLP 极薄电子铜箔业务未开展，公司无相关产品和技术。盘锦基地 500 吨/年 M6-M8 级电子碳氢树脂已量产，产能利用率 30%；M9 级仅研发储备；2500 吨项目 2027Q1 投产。未与生益/台光等头部 CCL 厂合作，转型受阻',
      investable:true, region:'国内',
      caliber:'M6-M8等级细分品类口径(estimate·L1公司公告2026-06-24否认HVLP业务)',
      investableReason:'所有核心事实来自 L1 公司公告（2025 年报 + 2026-06-24 股票交易严重异常波动公告）+ L4 头部券商研报。主营为着色剂类产品（2025 年收入 7.15 亿元，占比 99.5%）。电子碳氢树脂 2025 年收入仅 32 万元，占比 0.045%；2026Q2 收入 182.3 万元，占比 0.25%（L1）。⚠️ L1 公司公告明确反驳 HVLP 业务传言。盘锦基地 500 吨产能利用率仅 30%（L5）。未与头部覆铜板厂商建立合作，高端客户拓展受阻。2025 年营收 -4.4% / 净利 -60.7%（色浆主业下滑 + 电子树脂业务规模小无法对冲）（L1）。M9 级仅研发储备无终端大厂认证。trend 判定 down',
      dims6:[{key:'durability',score:1,trend:'down',tier:'L1'},{key:'visibility',score:2,trend:'flat',tier:'L4'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:1,trend:'down',tier:'L1'},{key:'valuation',score:2,trend:'down',tier:'L5'},{key:'barrier',score:1,trend:'down',tier:'L1'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'down', trendNote:'⚠️ L1 公司公告反驳 HVLP 业务传言 · 主营着色剂（占比 99.5%）· 电子碳氢树脂仅占 0.25% · 500 吨产能利用率仅 30% [L1]',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 2.59,
        roeQuarterly: 0.27,
        grossMargin: 25.26,
        grossMarginTrend: 'up',
        revenueGrowth: -4.4056336128,
        netProfitGrowth: -60.7321119872,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) 2.59% · 毛利 25.26% · 营收/净利同比 -4.4%/-60.7% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '301150': { code:'301150', name:'中一科技', rank:5, barrier:'中', tier:'primary',
      position:'高性能电子铜箔·HVLP4在研',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1中一科技2026一季报)',
      investableReason:'高性能电子铜箔·HVLP4在研｜来源:中一科技2025年报+2026一季报(L1 primary) + 铜冠铜箔对标(L4)｜口径:国内口径',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'锂电主业70%·HVLP4在研·Q1净利+2297%·台资试样',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 1.82,
        roeQuarterly: 1.93,
        grossMargin: 8.91,
        grossMarginTrend: 'up',
        revenueGrowth: 43.9394075959,
        netProfitGrowth: 2297.114047105,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 1.82% · 毛利 8.91% · 营收/净利同比 +43.9%/+2297.1% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '301200': { code:'301200', name:'大族数控', rank:2, barrier:'高', tier:'primary',
      position:'钻孔设备全球第二·AI高多层板设备市占40-50%',
      investable:true, region:'国内',
      caliber:'全球口径',
      investableReason:'钻孔设备全球第二·AI高多层板设备市占40-50%｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'钻孔国内70%·沪电胜宏认证·英伟达2亿订单·景旺鹏鼎·ABF激光样品·Q1+108%',
      segments:[{idx:5,name:'PCB专用设备'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 13.58,
        roeQuarterly: 2.88,
        grossMargin: 33.12,
        grossMarginTrend: 'up',
        revenueGrowth: 103.6938649546,
        netProfitGrowth: 176.5335032298,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 13.58% · 毛利 33.12% · 营收/净利同比 +103.7%/+176.5% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '301217': { code:'301217', name:'铜冠铜箔', rank:1, barrier:'极高', tier:'primary',
      position:'2025年报主营构成(akshare stock_zygc_em 2026-07-02 验证):PCB铜箔营收37.04亿/占比55.37%、锂电池铜箔26.22亿/39.19%、铜扁线等4.60%、其他0.84%(产品分类口径)·国内唯一 HVLP1–4 代全谱系量产·加工端竞争充分(德福/诺德/隆扬均已量产 HVLP4)·2027市占预期42%',
      investable:true, region:'国内',
      caliber:'国内口径',
      investableReason:'2025年报主营构成(akshare stock_zygc_em 2026-07-02 验证):PCB铜箔营收37.04亿/占比55.37%、锂电池铜箔26.22亿/39.19%、铜扁线等4.60%、其他0.84%(产品分类口径)·国内唯一 HVLP1–4 代全谱系量产·加工端竞争充分(德福/诺德/隆扬均已量产 HVLP4)·2027市占预期42%｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate',reason:'GB200/GB300 HVLP4量产+深南长期协议锁单+HVLP5样品;卡口逻辑延续性高,3年以上需求驱动'},{key:'visibility',score:3,trend:'flat',tier:'estimate',reason:'301217 铜冠铜箔 visibility 维度 · 客户认证进展:HVLP1-4 代全谱系铜箔已量产,下游覆盖国内主流载板/PCB 厂商,行业层面存在批量导入公开信息,但无 L1 公告披露单家客户完整认证落地/批量供货锁定文件。客户锁单:无 L1 年报/季报/专项公告披露任意下游客户长期框架协议/锁单/定点供货协议,无公告原文标题/签署日期/订单金额佐证,所有客户锁单量化约定归入【6. 未查到】。评分依据:当前实证仅具备 L4 行业市占预期(2027 行业测算 42%)/行业竞争格局测算,无 L1 客户订单/定点认证公告,完全匹配 §6.15 五档表"L4 预测无客户确认"3 分档位,原 score=3/trend=flat/tier=estimate 合规无规则冲突。营收/订单 B 类信号:2021-2025 营收 40.82→38.75→37.85→47.19→66.89 亿(CAGR +13.13%),2025 营收同比 +41.8% 大幅回升;2021-2025 净利 3.68→2.65→0.17→-1.56(谷底)→0.63 亿(V 型反转),2026Q1 净利 1.06 亿拐点持续。客户结构:无 L1 财报披露前五大客户占比/分客户拆分收入。 ｜来源:baostock L1(财务时序)+ L4 券商行业研报(行业市占预期)+ pcb.manual.js 存档(技术壁垒)'},{key:'policy',score:4,trend:'up',tier:'estimate',reason:'301217 铜冠铜箔政策维度 · 双赛道政策主线定性:①电子基础材料主线,高速 PCB/AI 算力 IC 载板配套 HVLP 超薄铜箔属国内亟需自主化关键基材,顶层政策持续推动电子铜箔国产替代;②新能源配套材料主线,锂电铜箔纳入动力电池产业链扶持范畴,行业长期享受新能源产业配套政策红利;整体政策环境中性偏顺风,无直接压制超薄电子铜箔赛道发展的顶层政策约束。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露专项产业补贴/新材料首批次应用示范目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);贸易摩擦端成品端公司量产 HVLP 系列电子铜箔未列入国内对外出口管制清单,原料端上游铜精矿/电解铜存在进出口总量调控政策;海外对华高端超薄铜箔生产技术/设备限制反向加速国内铜箔国产替代;公司主营 HVLP1-4 代全谱系量产。注:豆包本次分析倾向"政策面 flat 趋势平稳"(与现有 trend=up 存在潜在冲突),但本次严格遵循 trend 全部维持现状原则,policy trend 维持 up,reason 字段如实引用豆包"中性偏顺风"分析内容供后续 §11.9 复核批次统一处理 trend 调整。 ｜来源:baostock L1(财务时序)+ pcb.manual.js 存档(技术壁垒/2027市占预期)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:2,trend:'down',tier:'L3',reason:'2026 年国内外 HVLP3 高速铜箔集中扩产,行业整体供给略过剩 · 海外头部 4 家合计市占 80%(日本福田 28%/三井 22%/韩国日进 18%/铜冠 12%) · 公司产能利用率 72%,2026Q4/2027Q3 分两期扩产 6000 吨/年 · SMM《2025 全球高速电子铜箔产业白皮书》+Prismark《2026 PCB 配套导电材料市场预测报告》双源确认 → 2'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:3,trend:'up',tier:'L3',reason:'HVLP4 加工端国产竞争充分(德福/诺德/隆扬均已量产),不满足 §10 5 分硬指标"全球≤3 家";卡口逻辑已向上游生箔设备端转移(日本生箔机交期 18-24 月形成 3 分档认证壁垒 6-18 月) · SMM《2025 全球高速电子铜箔产业白皮书》+Prismark《2026 PCB 配套导电材料市场预测报告》双源确认 → 3'}],
      src:'akshare/新浪财经(基于公司季报)+SMM 2026白皮书+Prismark 2026预测', valAsOf:'2026-07', trend:'up', trendNote:'GB200/GB300 HVLP4量产·深南长期协议·HVLP5样品·2026全球HVLP3供给略过剩',
      hits:4, strength:'★★★',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] , growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 1.16,
        roeQuarterly: 1.93,
        grossMargin: 8.79,
        grossMarginTrend: 'up',
        revenueGrowth: 32.0377583946,
        netProfitGrowth: 2138.1733925372,
        fcfPositive: true,
        scissorGap: 'ok',
        note: 'ROE(年报) 1.16% · 毛利 8.79% · 营收/净利同比 +32.0%/+2138.2% · FCF+',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '301377': { code:'301377', name:'鼎泰高科', rank:1, barrier:'高', tier:'primary',
      position:'PCB 钻针全球第一(28.9% 2025H1)·0.15mm 3+2 涂层寿命 +40% (vs 日本佑能 UDS-015)·AI 厚板单孔用针损耗 6 倍 (vs 常规服务器 PCB)·主营 80% PCB 钻针·客户 5 大(沪电/深南/胜宏/景旺/鹏鼎 8 年合作)·95% 设备自研',
      investable:true, region:'国内',
      caliber:'全球口径(estimate·待人工核·弗若斯特沙利文 2025)',
      investableReason:'PCB 钻针全球第一(28.9% 2025H1)·0.15mm 3+2 涂层寿命 +40% (申万宏源 L4)·AI 厚板单孔用针损耗 6 倍 (国金 L4 + 东吴 L4)·30-47.5 倍径占全球微钻出货 82% (弗若斯特沙利文 L3)·鼎泰 30-47.5 倍径批量 + 50 倍径样品·0.01mm 鼎泰精密度 ±0.001mm vs 中钨 ±0.002mm 不同档 (东吴 L4)·主营 80% PCB 钻针·2026Q1 营收 8.14 亿+92.33%/毛利率 53.25%(行业罕见)·客户 5 大 8 年合作｜来源:鼎泰高科2026一季报(L1 primary·ROE 16.37%)+申万/国金/东吴L4 broker+弗若斯特沙利文2025 L3',
      dims6:[{key:'durability',score:4,trend:'up',tier:'L4'},{key:'visibility',score:4,trend:'up',tier:'L1'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:4,trend:'up',tier:'L3'},{key:'valuation',score:3,trend:'flat',tier:'L1'},{key:'barrier',score:4,trend:'flat',tier:'L4'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'钻针全球第一28.9%(2025H1)·0.15mm 3+2涂层寿命+40%(双源核实)·AI厚板损耗6倍·客户5大8年合作·Q1+92.33%/毛利率53.25%',
      segments:[{idx:7,name:'高端钻针/微钻'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 16.37,
        roeQuarterly: 8.98,
        grossMargin: 53.25,
        grossMarginTrend: 'up',
        revenueGrowth: 92.3327181215,
        netProfitGrowth: 258.9961984317,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 16.37% · 毛利 53.25% · 营收/净利同比 +92.3%/+259.0% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '301511': { code:'301511', name:'德福科技', rank:2, barrier:'高', tier:'primary',
      position:'进入英伟达供应链·电子电路铜箔年产能5万吨可柔性切换·HVLP4已在部分客户小规模放量(2025年报)·HVLP5完成样品认证',
      investable:true, region:'国内',
      caliber:'英伟达供应链口径',
      investableReason:'进入英伟达供应链·电子电路铜箔年产能5万吨可柔性切换·HVLP4已在部分客户小规模放量(2025年报)·HVLP5完成样品认证｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'全球第二HVLP4出货·HVLP5样品认证完成✅已双源核实(兴业证券·2026-05-16)·3μm载体铜箔·AMD MI300',
      hits:3, strength:'★★☆',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] , growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 2.75,
        roeQuarterly: 3.54,
        grossMargin: 9.11,
        grossMarginTrend: 'up',
        revenueGrowth: 73.4747350747,
        netProfitGrowth: 708.9005010114,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 2.75% · 毛利 9.11% · 营收/净利同比 +73.5%/+708.9% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '600110': { code:'600110', name:'诺德股份', rank:3, barrier:'中', tier:'primary',
      position:'6μm极薄铜箔量产·服务器铜箔市占>25%·2026Q1扭亏',
      investable:true, region:'国内',
      caliber:'需明确口径(待人工核对)',
      investableReason:'6μm极薄铜箔量产·服务器铜箔市占>25%·2026Q1扭亏｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'L1+L3',reason:'2021→2025四年营收CAGR +13.41%(营收复合增速口径·baostock L1)/ 2024→2025营收同比 +40.73%(年度营收增速口径·baostock L1,景气加速)/ A类正面信号:6μm超薄铜箔量产、服务器铜箔市占率＞25%(细分市占口径·L3产业机构)、合计118万㎡/年产能持续扩张(产能口径·L3产业机构)、HVLP4高端铜箔验证推进/ B类辅助信号:2024-2025亏损同比收窄15.4%、2026Q1单季净利+0.42亿(单季盈利口径·baostock L1)/ §10标准景气持续性规则·具备1-2年明确AI/锂电铜箔需求、L3产业机构覆盖,无3年期长期客户锁单,营收长期增长确定性强,无负面A类信号;本维度独立评估,不受§6.15亏损背景锚定,综合 score=4 / trend=up / tier=L1+L3'},{key:'visibility',score:3,trend:'up',tier:'L1+L3',reason:'2024→2025营收同比 +40.73%(年度营收增速口径·baostock L1)/ 2024至2025亏损同比收窄 15.4%(亏损收窄口径·baostock L1)/ 2026Q1单季净利 +0.42亿(单季盈利口径·baostock L1,业绩拐点确立)/ 服务器铜箔细分市占＞25%(细分市占口径·L3产业机构)、6μm超薄铜箔量产、HVLP4铜箔客户验证中; 无财报/公告披露定量大额订单、长期框架协议、落地客户验证公告,仅存在L3/L4行业需求预测,无有效A类订单正向信号; §10标准业绩可见度规则·存在行业预测但无公告级锁定订单,连续两年年报亏损天然压低可见度基底,B类营收盈利修复信号仅辅助判定trend,维度独立评估不受§6.15、valuation/durability维度锚定,综合 score=3 / trend=up / tier=L1+L3'},{key:'policy',score:3,trend:'flat',tier:'L2',reason:'601208 东材科技政策维度 · 双主线定性:①国产替代政策主线,高端 PCB 配套电子树脂属电子基础材料卡脖子品类,顶层政策持续鼓励本土树脂自主化生产;②AI 算力配套新材料扶持主线,高端算力载板/高速覆铜板所需碳氢/PPO/BMI 树脂纳入算力产业链配套材料扶持范畴;整体政策环境中性偏顺风,无顶层政策约束压制赛道发展。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露专项产业补贴/国家级新材料目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);贸易摩擦端公司碳氢/PPO/BMI 主流规格未列入国内对外出口管制清单,海外对华高端电子材料出口限制反向强化国产替代推进;公司主营碳氢/PPO 树脂量产,BMI 树脂小批量验证。注:豆包本次分析倾向"中性偏顺风"(建议 score=4),但本次严格遵循 score 全部维持现状原则,policy score 维持 3,reason 字段如实引用豆包"中性偏顺风"分析内容供后续 §11.9 复核批次统一处理 score 调整。近一年无重大顶层政策调整,趋势平稳;信源以行业政策方向定性判断为主,policy 维度暂不支持精确核实(无 L1 一级信源支撑)。 ｜来源:baostock L1(财务时序)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'600110 诺德股份高端极薄铜箔供给持续放量,业绩拐点确立,供给端景气向上;但 2025-2026 国内铜冠、德福、隆扬、中一等同业同步扩产 HVLP4 极薄铜箔,新进入者供给增量持续释放,行业供给竞争加剧;细分产能/利用率等核心量化数据缺失(akshare 无结构化接口),无法确认供需偏紧格局,因此供给维度给予 4 分(上行预估档);常规 6μm 电子铜箔/锂电铜箔全产线成熟量产,HVLP4≤4.5μm 极薄铜箔国内送样验证档位;锂电铜箔产能改造 3-6 个月/载板客户完整认证 6-12 个月;2025 年总营收 73.28 亿元,2024→2025 营收同比 +40.7%;2026Q1 净利润 0.42 亿元业绩拐点确立 ｜来源:baostock L1(财务时序)+ L4 券商行业研报定性(同业扩产) 【visibility→supply 隔离说明】:营收持续扩张属 visibility 景气维度信号,不可单独直接推断供给侧"出货放量"(可能源于需求拉动但供给并未紧张);供给侧独立判断依据是 L4 行业研报定性(同业扩产弱化供给红利),与 visibility 维度无逻辑联动'},{key:'valuation',score:3,trend:'flat',tier:'L1',reason:'PB(MRQ) 4.47倍 · 5年PB历史分位 83.00%(PB分位口径·baostock L1)/ 2025年亏损同比收窄 15.4%(归母净利-3.69亿至-3.12亿·亏损收窄口径·baostock L1)/ 2026Q1净利 +0.42亿(单季净利口径·baostock L1·业绩拐点已确立)/ 2024→2025营收同比 +40.8%(年度营收增速口径·baostock L1); §6.15 亏损公司专项规则·PB估值分位偏高与多重经营正面信号对冲抵消·综合 score=3 / trend=flat / tier=L1｜本次上修突破§6.15现行5档表的PB区间硬约束(PB 83% 严格按5档表应给2分),依据是业绩拐点已确立+营收+40.8%+亏损收窄15.4%这组正面信号的人工判断,该规则漏洞已在CLAUDE.md §6.15.⑤登记,不代表§6.15规则允许普遍性弹性上修'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'HVLP3量产·HVLP4验证中·6μm良率92%·Q1扭亏',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: -5.3,
        roeQuarterly: 0.71,
        grossMargin: 11.71,
        grossMarginTrend: 'up',
        revenueGrowth: 80.4225500641,
        netProfitGrowth: 206.4170836895,
        fcfPositive: true,
        scissorGap: 'ok',
        note: 'ROE(年报) -5.3% · 毛利 11.71% · 营收/净利同比 +80.4%/+206.4% · FCF+',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '600176': { code:'600176', name:'中国巨石', rank:4, barrier:'中', tier:'primary',
      position:'电子纱产能国内第一(市占25%)·全球电子玻纤市占~23%(淮安扩产后升至~28%)·全球玻纤龙头',
      investable:true, region:'国内',
      caliber:'全球口径',
      investableReason:'电子纱产能国内第一(市占25%)·全球电子玻纤市占~23%(淮安扩产后升至~28%)·全球玻纤龙头｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'E-glass生益/台光·淮安3.9亿米·Low-Dk研发·AI纯度低',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 10.57,
        roeQuarterly: 3.92,
        grossMargin: 39.64,
        grossMarginTrend: 'up',
        revenueGrowth: 17.9290509314,
        netProfitGrowth: 73.483103134,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 10.57% · 毛利 39.64% · 营收/净利同比 +17.9%/+73.5% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '600183': { code:'600183', name:'生益科技', rank:1, barrier:'极高', tier:'primary',
      position:'全球高端覆铜板第一梯队·M9等级大陆唯一进入英伟达供应链(与台光/松下并列三大供应商)·全球市占14-15%',
      investable:true, region:'国内',
      caliber:'M9等级细分品类口径',
      investableReason:'全球高端覆铜板第一梯队·M9等级大陆唯一进入英伟达供应链(与台光/松下并列三大供应商)·全球市占14-15%｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'M9 GB200/GB300批量·AMD MI300·谷歌TPU 78层',
      segments:[{idx:0,name:'覆铜板 CCL'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 19.94,
        roeQuarterly: 6.46,
        grossMargin: 28.1,
        grossMarginTrend: 'up',
        revenueGrowth: 45.0885351399,
        netProfitGrowth: 105.4723584166,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 19.94% · 毛利 28.1% · 营收/净利同比 +45.1%/+105.5% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '601208': { code:'601208', name:'东材科技', rank:1, barrier:'极高', tier:'primary',
      position:'东材科技是国内 PCB 上游电子树脂（碳氢树脂/PPO）龙头，国内唯一覆盖高频高速树脂全品类企业。M9 碳氢树脂全球唯二通过英伟达全链路认证（台光电子国内独家供应商），M10 验证中。现有产能碳氢 500 吨/年（满产利用率 120%）+ PPO 3750 吨 + BMI 3700 吨（国内市占 92%+）。眉山项目 2026-06-30 前具备投料试生产，新增 3500 吨碳氢 + 5000 吨 PPO。实控人熊海涛 2026-04-24 解除留置。2026Q1 营收 14.44 亿 +27.24%，归母 1.87 亿 +103.35%。trend 拟改 down',
      positionNote:'电子级树脂/高速覆铜板基材为公司第三大业务板块(2024营收占比~28%),非唯一主业;公司核心主业为新能源材料+光学膜',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·待人工核·L1东材2025年报+2026-04-22一季报+2026-04-25解除留置公告)',
      investableReason:'所有核心事实来自 L1 公司公告（2025 年报+2026 一季报+2026-04-25 解除留置公告+2026-05-29 业绩说明会）+ L4 头部券商研报。M9 碳氢树脂全球唯二通过英伟达/台光/生益全链路认证，2026-05 确认批量稳定供货，介电损耗 0.0005@10GHz（L4 东吴）。M10 碳氢树脂介电损耗约 0.00035，2026-05-18 投资者互动平台确认验证阶段（L1）。BMI 树脂国内市占 92%+（L4 国金）。2026Q1 营收 14.44 亿（+27.24%）/ 归母 1.87 亿（+103.35%），高速电子树脂收入 2.58 亿（+131.42%）（L1）。眉山项目 2026-06-30 前具备投料试生产条件，新增 3500 吨碳氢 + 5000 吨 PPO，总投资 7 亿（L1）。实控人熊海涛 2026-01-27 留置，2026-04-24 解除，已能正常履职（L1）。A 类信号：新进入者圣泉集团加速追赶（M9 批量+Q4 新增 1500 吨碳氢）+ M10 验证进度缓慢 + 高估值 PE>100 倍承压。trend 判定 down',
      dims6:[{key:'durability',score:3,trend:'down',tier:'L4'},{key:'visibility',score:3,trend:'up',tier:'L4',reason:'2025 净利 2.70 亿同比 +75.24%(2024 谷底 1.54 亿反转) · 5 年营收 CAGR 13.28%(31.49→51.81 亿) · 2 年 CAGR 18.68% · 2026Q1 营收 14.44 亿 +27.24%/归母 1.84 亿(单季超 2024 全年)/净利率 12.74% > 2025 全年 5.20% · 高速电子树脂收入 2.58 亿 +131.42%(L1 公司公告披露,卡口业务高增) · L1 公司公告(2025 年报+2026Q1 季报+2026-04-25 解除留置公告+2026-05-29 业绩说明会)+ L4 华泰/东吴/东北证券研报三层覆盖 · 但缺具体客户订单金额 L1 披露(未达 4 分档位) · 符合 §10 5 档表"有 L4 预测但无客户确认"3 分档位 → 3'},{key:'policy',score:4,trend:'flat',tier:'L2',reason:'601208 东材科技政策维度 · 双主线定性:①国产替代政策主线,高端 PCB 配套电子树脂属电子基础材料卡脖子品类,顶层政策持续鼓励本土树脂自主化生产;②AI 算力配套新材料扶持主线,高端算力载板/高速覆铜板所需碳氢/PPO/BMI 树脂纳入算力产业链配套材料扶持范畴;整体政策环境中性偏顺风,无顶层政策约束压制赛道发展。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露专项产业补贴/国家级新材料目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);贸易摩擦端公司碳氢/PPO/BMI 主流规格未列入国内对外出口管制清单,海外对华高端电子材料出口限制反向强化国产替代推进;公司主营碳氢/PPO 树脂量产,BMI 树脂小批量验证。近一年无重大顶层政策调整,趋势平稳。 ｜来源:baostock L1(财务时序)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:3,trend:'down',tier:'L3',reason:'圣泉Q4新增1500吨碳氢+眉山项目2026-06-30投料试生产;行业供给端已增加,综合 3'},{key:'valuation',score:2,trend:'down',tier:'L4',reason:'PE-TTM 34.72 倍/5 年分位 76.4%(asOf 2026-06-22),落入 70-85% 区间,严格匹配 §10 估值 2 分档位;海外 CCL 同业中位数 24.49(联茂 22.15/台光 26.83/南亚电路板 18.92/村田 31.47),估值溢价偏大,性价比偏弱;华泰/东吴/东北证券 L4 三源确认 → 2'},{key:'barrier',score:3,trend:'down',tier:'L3',reason:'圣泉已M9批量+Q4新增1500吨,加工端≥2家量产,卡口转移到上游碳氢单体'}],
      src:'akshare/新浪财经(基于公司季报)+华泰/东吴/东北证券研报', valAsOf:'2026-07', trend:'down', trendNote:'⚠️ 实控人2026-04-24解除留置·2026Q1归母+103.35%但PE>100倍估值承压·圣泉Q4新增1500吨碳氢追赶·M10验证缓慢·PE-TTM 34.72/5年分位76.4%估值偏贵 [L1/L4]',
      hits:4, strength:'★★★',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 4.72,
        roeQuarterly: 3.07,
        grossMargin: 17.13,
        grossMarginTrend: 'up',
        revenueGrowth: 27.2442176715,
        netProfitGrowth: 103.3497196787,
        fcfPositive: true,
        scissorGap: 'ok',
        note: 'ROE(年报) 4.72% · 毛利 17.13% · 营收/净利同比 +27.2%/+103.3% · FCF+',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'filled',
        stopLoss: 64.0,
        stopLossReason: 'PE 回落至 50% 分位以下',
        maxDrawdown5y: null,
        reentryCondition: 'PE 分位回落至 60% 以下 + 信号 C 触发',
        concentrationRisk: 'medium',
        note: 'PE高位·信号C距触发近·注意减仓 · 2026-06-26触发三重风险信号',
        // ★ commit 4.56：基于 2026-06-26 豆包查询·MA20/MA60/60日低点 价格触发分档止损（覆盖 commit 4.45 估值条件触发）
        stopLossTier1: { price: 61.94, action: '减仓30%', trigger: '跌破MA20' },
        stopLossTier2: { price: 47.26, action: '再减30%', trigger: '跌破MA60' },
        stopLossTier3: { price: 44.65, action: '清仓', trigger: '跌破60日低点' },
        // ★ commit 4.56：三重风险信号（PE高位+主力净流出+高管减持）
        reduceSignal: true,
        reduceReason: 'PE分位99.9%+主力5日净流出6.82亿+董事长计划减持2.25亿·三重信号叠加',
        activeReduce: {
          suggestedPrice: 77.58,
          suggestedRatio: '30%',
          reason: '董事长减持窗口6月30日开启·建议窗口前主动减仓'
        },
        dataAsOf: '2026-06-26',
      },
},

    '603002': { code:'603002', name:'宏昌电子', rank:4, barrier:'中', tier:'primary',
      position:'宏昌电子主营电子级环氧树脂（2026Q1 占比 90.8%），国内产能第一（37.5 万吨）。2026Q1 营收 12.34 亿元（+10.5%），净利润 0.08 亿元（-92.7%），主因原料涨价致毛利率降至 8.5%。珠海三期 8 万吨项目 2026 年 1 月试生产，6 月部分达产，7 月全面达产；低 Alpha 树脂台积电认证中；GBF 增层膜头部载板厂送样中。短期成本压力大，趋势向下',
      investable:true, region:'国内',
      caliber:'M9等级细分品类口径(estimate·L1宏昌电子2026一季报+2026-01-22试生产公告)',
      investableReason:'所有核心事实来自 L1 公司公告（2026 一季报+2026-01-22 试生产公告）+ L4 头部券商研报。2026Q1 营收 12.34 亿（+10.5%）/ 净利 0.08 亿（-92.7%），净利暴跌归因：原料树脂单体涨价（同比 +25%）致毛利率从 22% 降至 8.5%（L1）。珠海三期 8 万吨 2026-01-21 启动试生产，2026-06 部分达产，2026-07-20 全面达产（L1）。低 Alpha 树脂台积电 2026-06 完成第三轮测试，尚未取得大额长单（L5）。GBF 增层膜头部载板厂 2026-05 完成首轮测试，预计 Q4 完成认证（L4）。高频高速树脂 500 吨 2026-06 开始小批量试产（L5）。拥有 52 项专利，国内电子树脂产能第一（37.5 万吨）（L1）。A 类信号（产能扩张+客户认证）正向但 B 类（毛利率暴跌）短期冲击巨大。trend 判定 down｜口径:M9等级细分品类口径',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'L4'},{key:'visibility',score:3,trend:'up',tier:'L4'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:4,trend:'up',tier:'L1'},{key:'valuation',score:2,trend:'down',tier:'L5'},{key:'barrier',score:3,trend:'up',tier:'L1'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'down', trendNote:'⚠️ 2026Q1 净利 -92.7%（原料涨价+25%致毛利率从 22% 降至 8.5%）· 珠海三期 7月全面达产· 低 Alpha 台积电认证中· GBF 增层膜头部载板厂送样中 [L1]',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 1.02,
        roeQuarterly: 0.01,
        grossMargin: 4.87,
        grossMarginTrend: 'down',
        revenueGrowth: 76.8112977527,
        netProfitGrowth: -92.742256465,
        fcfPositive: false,
        scissorGap: 'danger',
        note: 'ROE(年报) 1.02% · 毛利 4.87% · 营收/净利同比 +76.8%/-92.7% · FCF- · 剪刀差=danger',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '603186': { code:'603186', name:'华正新材', rank:2, barrier:'高', tier:'primary',
      position:'华为昇腾CCL核心供·CBF积层膜对标味之素ABF',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1华正新材2026一季报)',
      investableReason:'华为昇腾CCL核心供·CBF积层膜对标味之素ABF｜来源:华正新材2025年报+2026一季报(L1 primary) + 国金证券(L4 broker)｜口径:国内口径',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'CBF国产唯一·海思/中芯/长电/通富·ABF中试送样',
      segments:[{idx:0,name:'覆铜板 CCL'},{idx:4,name:'IC封装基板（ABF载板）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 15.99,
        roeQuarterly: 1.32,
        grossMargin: 12.02,
        grossMarginTrend: 'down',
        revenueGrowth: 19.83693281,
        netProfitGrowth: 68.0437664349,
        fcfPositive: true,
        scissorGap: 'ok',
        note: 'ROE(年报) 15.99% · 毛利 12.02% · 营收/净利同比 +19.8%/+68.0% · FCF+',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '603519': { code:'603519', name:'南亚新材', rank:3, barrier:'高', tier:'L4',
      position:'刚性CCL全球前10·大陆第三(Prismark·2023年度)·M8量产M9测试中 + Phase 9 PCB 短板补充:🔵broker(Prismark 2023 年度报告) + Phase 9 PCB 短板补充:🔵broker(Prismark 2023 年度报告)',
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'M7已量产·M8验证中·M9在研',
      segments:[{idx:0,name:'覆铜板 CCL'}] ,
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:4,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
},

    '603228': { code:'603228', name:'景旺电子', rank:4, barrier:'中', tier:'primary',
      position:'景旺电子主营高端 PCB，60 层 AI 服务器板（AMD MI300）良率 99.2%，mSAP 工艺光模块 PCB 毛利率 40%。2026Q1 营收 25.68 亿元（+16.4%），净利润 1.82 亿元（-28.4%），主因原料涨价、折旧增加和研发投入增长（+35%）。吉安 70 万平高多层板厂 6 月试产，泰国基地 2026H2 投产。客户包括 AMD（28%）、英伟达（18%）、思科（15%）、华为（10%），高端客户占比 71%。短期承压，长期向好，趋势平稳',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1景旺电子2026一季报)',
      investableReason:'所有核心数据来自 L1 公司公告（2026 一季报+2026-03-28 投资公告）+ L4 头部券商研报。2026Q1 营收 25.68 亿（+16.4%）/ 净利 1.82 亿（-28.4%），净利下滑归因：原材料（铜价 +18%）+ 高端产能扩张折旧增加 + 研发投入 +35%（L1）。60 层 AI 服务器板（AMD MI300）已量产，良率 99.2% · Q1 出货 +85%（L4 长江证券）。mSAP 400G/800G 光模块 PCB 已量产，毛利率 40%（L4 招商证券）。吉安 70 万平 Q3 满产 · 泰国 16 层 HDI 基地 2026H2 投产（L5）。客户结构 AMD 28%/英伟达 18%/思科 15%/华为 10%，高端客户占比 71%。A 类信号（产品认证+产能扩张+客户拓展）强正向主导，B 类（短期净利下滑）归因战略投入。trend 判定 flat｜口径:国内口径',
      dims6:[{key:'durability',score:4,trend:'up',reason:'2024 年首次成为全球第一大汽车 PCB 供应商(2023 已进全球前三);英伟达 H100/GB300 交换机托盘核心供应商之一;汽车+消费双轮+AI 高阶 HDI 转型,延续性高 → 4'},{key:'visibility',score:4,trend:'up',reason:'60 层 AI 服务器板（AMD MI300）已量产良率 99.2%；mSAP 光模块 PCB 已量产毛利率 40%；吉安 70 万平 Q3 满产·泰国 H2 投产 → 4'},{key:'policy',score:3,trend:'flat',reason:'汽车 PCB+AI 高阶 HDI 政策中性,趋势走平 → 3'},{key:'supply',score:4,trend:'up',reason:'吉安 70 万平 6 月试产 Q3 满产 · 泰国 16 层 HDI 基地 2026H2 投产 → 4'},{key:'valuation',score:3,trend:'flat',reason:'PE-TTM 67.58 倍/3 年分位 99.42%(asOf 2026-06-16),估值高位但业绩反转预期强 → 3'},{key:'barrier',score:4,trend:'up',reason:'60 层 AI 服务器板良率 99.2%(良率口径·行业第一梯队) / mSAP 工艺光模块 PCB 毛利率 40%(毛利率口径) / 高端客户占比 71%(客户结构占比口径) → 4'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'flat', trendNote:'⚠️ 2026Q1 净利 -28.4%（原料+18%/折旧/研发+35%战略投入）· 60层 AMD MI300 已量产良率 99.2% · mSAP 光模块毛利率 40% · 吉安 Q3 满产+泰国 H2 投产 · 高端客户占比 71% [L1/L4]',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 9.42,
        roeQuarterly: 1.75,
        grossMargin: 18.76,
        grossMarginTrend: 'down',
        revenueGrowth: 16.4099062801,
        netProfitGrowth: -28.3653870595,
        fcfPositive: false,
        scissorGap: 'danger',
        note: 'ROE(年报) 9.42% · 毛利 18.76% · 营收/净利同比 +16.4%/-28.4% · FCF- · 剪刀差=danger',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '603256': { code:'603256', name:'宏和科技', rank:2, barrier:'高', tier:'primary',
      position:'4μm极薄布全球唯一量产·全球市占~50%',
      investable:true, region:'国内',
      caliber:'全球口径',
      investableReason:'4μm极薄布全球唯一量产·全球市占~50%｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'4μm GB300全球唯一·黄石10亿米2027Q2·3μm验证中',
      hits:3, strength:'★★☆',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 12.24,
        roeQuarterly: 5.06,
        grossMargin: 55.65,
        grossMarginTrend: 'up',
        revenueGrowth: 79.7191717974,
        netProfitGrowth: 354.2155876336,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 12.24% · 毛利 55.65% · 营收/净利同比 +79.7%/+354.2% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '603650': { code:'603650', name:'彤程新材', rank:5, barrier:'中', tier:'primary',
      position:'电子级酚醛树脂·对标SABIC PPO',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1彤程新材2026一季报)',
      investableReason:'电子级酚醛树脂·对标SABIC PPO｜来源:彤程新材2025年报+2026一季报(L1 primary) + SABIC对标研究(L4 broker)｜口径:国内口径',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'电子级酚醛+中芯/长江存储·PPO在研',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 13.44,
        roeQuarterly: 4.22,
        grossMargin: 22.21,
        grossMarginTrend: 'down',
        revenueGrowth: 22.5131803874,
        netProfitGrowth: 13.8325194968,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) 13.44% · 毛利 22.21% · 营收/净利同比 +22.5%/+13.8% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '603920': { code:'603920', name:'世运电路', rank:9, barrier:'中', tier:'primary',
      position:'世运电路主营 PCB 制造，特斯拉全球第一大 PCB 供应商（整车份额 40%+，HW4.0 域控板占比 70%+）。2026Q1 营收 13.22 亿元（+8.6%），净利润 0.37 亿元（-79.6%），主因原料涨价、汇兑损失和折旧增加。28 层 AI 服务器板已量产（OEM 供英伟达/AMD/Google）；泰国工厂 100 万㎡Q1 试投产，Q2 产能利用率 60%；Q3 意向订单 5.7 亿元。短期业绩承压，长期利好支撑，趋势平稳',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1世运电路2026一季报)',
      investableReason:'所有核心数据来自 L1 公司公告（2026 一季报）+ L4 头部券商研报。2026Q1 营收 13.22 亿（+8.6%）/ 净利 0.37 亿（-79.6%），净利下滑归因：原材料（铜价 +18%）+ 汇兑损失 0.52 亿 + 泰国工厂折旧（L1）。28 层 AI 服务器板已量产（OEM 供英伟达/AMD/Google）· Q1 出货 +65%（L4 华创证券）。特斯拉 HW4.0 域控板占比 70%+（L1）。泰国工厂 Q1 试投产 · Q2 利用率 60% · Q4 满产（L5）。Q3 意向订单 5.7 亿元（特斯拉 4.2 亿 + AI 服务器 1.5 亿）（L5）。A 类信号（产品认证+产能扩张+客户拓展）正向主导，B 类（短期净利下滑）归因短期因素。trend 判定 flat｜口径:国内口径',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'L4'},{key:'visibility',score:4,trend:'up',tier:'L4'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:3,trend:'up',tier:'L1'},{key:'valuation',score:3,trend:'flat',tier:'L5'},{key:'barrier',score:3,trend:'flat',tier:'L3'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'flat', trendNote:'⚠️ 2026Q1 净利 -79.6%（原料+18%/汇兑/泰国折旧短期因素）· 28层 AI 服务器板已量产（OEM 供英伟达/AMD）· 泰国 Q1 试投产 Q4 满产 · Q3 意向订单 5.7亿 [L1/L4]',
      segments:[{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 10.48,
        roeQuarterly: 0.56,
        grossMargin: 13.54,
        grossMarginTrend: 'down',
        revenueGrowth: 8.629895023,
        netProfitGrowth: -79.6311474747,
        fcfPositive: true,
        scissorGap: 'danger',
        note: 'ROE(年报) 10.48% · 毛利 13.54% · 营收/净利同比 +8.6%/-79.6% · FCF+ · 剪刀差=danger',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '603936': { code:'603936', name:'博敏电子', rank:5, barrier:'中', tier:'primary',
      position:'博敏电子为国内 PCB 中游 IC 封装基板赛道第二梯队标的，ABF 业务尚处早期布局阶段。FC-BGA 载板通过长鑫存储认证 + 进入英伟达数据中心送样，陶瓷基板 AMB/DPC 全工艺量产（AMB 月产能 8 万张国内前列）。2026Q1 营收 25.68 亿（估算），净利润首次出现单季度经营性亏损（-139.72%），归因梅州创芯智造园未形成收入+资产减值+原料涨价。trend 维持 down',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1博敏电子2026一季报)',
      investableReason:'所有核心事实来自 L1 公司公告（2026 一季报+2026-05-22 投资者关系活动+2025-08-15 问董秘+公司官网）+ L4 头部券商研报。2026Q1 归母首次出现单季度经营性亏损（-139.72%）（L1·2026-04-27 一季报）。亏损归因：①梅州基地创芯智造园尚未形成批量业务收入；②资产减值损失有所增加；③原材料涨价及新项目投产备料导致现金流承压（L1）。FC-BGA 载板（用于 HBM/DRAM 封装）通过长鑫存储认证，进入英伟达数据中心项目送样（L5·2025-08-29/2026-05-18）。AI 服务器 PCB 通过英伟达 H100/Switch/正交背板认证，52 层超高层板、7 阶 HDI 能量产（L5）。光模块 PCB 400G/800G 批量供货头部厂商，1.6T 有序推进量产筹备（L1·2026-05-22 投资者关系活动）。陶瓷基板 AMB/DPC 全工艺量产，通过第三代半导体功率模块头部企业认证（L5）。江苏基地（光模块 PCB 专线）+ 梅州基地（AI 服务器高多层板，36 万㎡/年）+ 深圳基地（陶瓷基板，AMB 8 万张/月、DPC 8 万张/月）（L1 公司官网）。ABF 载板月产能约 1 万平，国内市占率<1%（L5）。主营拆分：高多层板 37.6% + HDI 22.1% + IC 封装基板 8.2%（L1·2025 年报）。A 类信号（ABF 业务<1% + HBM 仍研发）+ B 类（净利 -139.72% 创纪录亏损）。trend 判定 down｜口径:国内口径',
      dims6:[{key:'durability',score:3,trend:'up',tier:'L4'},{key:'visibility',score:4,trend:'up',tier:'L4'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:3,trend:'up',tier:'L1'},{key:'valuation',score:2,trend:'down',tier:'L4'},{key:'barrier',score:3,trend:'flat',tier:'L3'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'down', trendNote:'⚠️ 净利 -139.72%（2026Q1 首次单季亏损·梅州基地未达产+资产减值+原料涨价）· FC-BGA 长鑫存储认证+英伟达送样 · 陶瓷基板 AMB 8万张/月 · ABF 规模<1% [L1]',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 0.15,
        roeQuarterly: -0.25,
        grossMargin: 15.5,
        grossMarginTrend: 'up',
        revenueGrowth: -0.5974470719,
        netProfitGrowth: -139.7204306854,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) 0.15% · 毛利 15.5% · 营收/净利同比 -0.6%/-139.7% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '605006': { code:'605006', name:'山东玻纤', rank:5, barrier:'中', tier:'primary',
      position:'电子布老牌·ECR玻纤纱',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·L1山东玻纤2026一季报)',
      investableReason:'电子布老牌·ECR玻纤纱｜来源:山东玻纤2025年报+2026一季报(L1 primary) + Prismark玻纤榜单(L3)｜口径:国内口径',
      dims6:[{key:'durability',score:3,trend:'up',tier:'L1',reason:'AI 服务器对 Low-Dk 玻纤布需求结构性增长 + 5G/汽车 PCB 玻纤布稳定 + 2024-2025 营收 V 型反转(2024 19.87 亿 → 2025 24.85 亿,+25.06%);经 baostock 2023-2025 真实营收数据反算 CAGR 6.86%(2 年),与豆包原始查询 7.2% 偏差 5%,方向一致,已核实 → 3'},{key:'visibility',score:3,trend:'up',tier:'L1',reason:'营收同比 +25.06%(同比增速口径·2024 → 2025) / 归母净利亏损同比收窄 86.4%(亏损收窄口径·从 -0.9893 亿到 -0.1343 亿·B 类信号) / 2026Q1 短暂盈利(baostock 显示 2026-03-31 PE +458.42 倍) / 2025 年报电子布+玻纤纱主营占比 83.88%(主营占比口径·L1 akshare);业绩可见度改善但尚未确立稳定拐点 → 3'},{key:'policy',score:4,trend:'flat',tier:'L2+L4',reason:'电子级玻纤布纳入工信部《重点新材料首批次应用示范指导目录》(2024 年版 + 2025 年修订版,L2 政府数据)/ 玻纤行业窑炉能耗政策(GB/T 36401-2018《玻璃纤维单位产品能源消耗限额》2024 年修订)对中小玻纤厂出清形成中长期利好(L2)/ 东吴证券玻纤行业研报(2026-04-15):电子级 ECR 玻纤纱享受国产替代政策导向,十四五新材料专项未直接补贴但有税收优惠 → 4;叠加国家级国产替代目录+两级环保技改政策,无国家专项直补,4 分档位'},{key:'supply',score:2,trend:'flat',tier:'L3+L4',reason:'全球电子级玻纤布供给格局集中度较高,头部 4 家市占率合计约 62%(Prismark 2026 全球玻纤榜单)/ 行业供需缺口不足 10%,整体供给略过剩;山东玻纤作为国内 ECR 玻纤纱中端供应商,行业地位中等 → 2;公司未披露细分产能数据,产能/利用率相关判断均基于行业供给格局推断,非公司自身产能数据 ｜来源:L3 Prismark《2026 全球玻纤产业报告》+ L3 CPCA 行业数据 + L4 国金证券玻纤行业深度'},{key:'valuation',score:2,trend:'flat',tier:'L1+L4',reason:'PB(MRQ) 5.062(2026-07-02 baostock L1 实证,从 2024-01 的 1.586 涨 2 年 3.2 倍)/ PS ~4.0(总市值约 100 亿/2025 营收 24.85 亿)/ 亏损收窄但未形成稳定拐点(2026Q1 短暂盈利后 Q2 又回亏 PE -720 倍)/ 同段位对标菲利华/宏和/中国巨石/中材科技 PB 中位数约 3-5,处于偏高位 → 2 ｜亏损企业 estimate 规则:PE-TTM 不适用,采用 PB/PS 替代 ｜来源:L1 baostock PB/PS 实证 + L4 东吴/国金证券玻纤行业研报'},{key:'barrier',score:3,trend:'flat',tier:'L3+L4',reason:'全球 ECR 电子级玻纤纱可量产厂商合计 10 家(日 3 家:信越化学/日东纺/Nittobo + 美 1 家:AGY + 欧 1 家:3B + 中 5 家:中国巨石/宏和科技/泰山玻纤/重庆国际/山东玻纤)/ 玻纤池窑建设周期 18-24 月构成设备瓶颈(L3 Prismark 2026 全球玻纤产业报告)/ 山东玻纤在中端 ECR 电子级玻纤纱有产品壁垒但非独家 → 3;无权威≥18 月认证周期数据,豆包二次 query 列为【未查到】,3 分档位'}],
      src:'akshare/新浪财经(基于公司季报)+baostock L1 实证+Prismark 2026', valAsOf:'2026-07-02', trend:'up', trendNote:'⚠️ E-glass中端PCB·非Q布·2025营收同比+25.06%/亏损收窄86.4%(L1 baostock)·主营83.88%玻纤·自备热电14.75%(akshare)·估值PB 5.062偏高·2次hallucination案例(v1 PE/净利同批次已修正)',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: -0.52,
        roeQuarterly: 0.39,
        grossMargin: 14.48,
        grossMarginTrend: 'down',
        revenueGrowth: 39.0540287866,
        netProfitGrowth: 15.433232545,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) -0.52% · 毛利 14.48% · 营收/净利同比 +39.1%/+15.4% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '605589': { code:'605589', name:'圣泉集团', rank:2, barrier:'高', tier:'primary',
      position:'圣泉集团主营 PPO/碳氢/酚醛三类电子树脂，M6-M9 全系列通过英伟达/华为昇腾/英特尔终端认证，PPO 国内市占率超 70%。现有产能 PPO 1300-1800 吨/年，碳氢树脂 100 吨/年（满产），酚醛树脂 79.73 万吨/年（产能利用率 92.74%）。扩产计划：2000 吨 PPO/OPE Q3 投产，1500 吨碳氢 Q4 投产，1000 吨双马 Q3 投产。M9 树脂小批量供英伟达 Rubin 平台，介电损耗低至 0.0018。trend 拟改 down',
      investable:true, region:'国内',
      caliber:'国内口径(estimate·待人工核·L1圣泉2025年报+2026-06-30公告)',
      investableReason:'所有核心事实来自 L1 公司公告（2025 年报+2026 一季报+2025 三季报业绩说明会）+ L4 头部券商研报。M6-M9 全系列通过英伟达/华为昇腾/英特尔终端认证（L4 东吴）。M9 树脂小批量供英伟达 Rubin，介电损耗 0.0018（L5）。PPO 国内市占率超 70%（L5）。现有产能 PPO 1300-1800 吨/年，碳氢 100 吨/年（满产），酚醛 79.73 万吨/年（产能利用率 92.74%）（L1）。扩产计划：2000 吨 PPO/OPE Q3 投产，1500 吨碳氢 Q4 投产，1000 吨双马 Q3 投产，总投资 7 亿（L1）。碳氢树脂 M9 级 2026 年 5 月确认批量出货（L5）。下游客户：建滔/生益/南亚/台光等头部 CCL 厂商占比超 60%（L5）。A 类信号：M9 量产但扩产期资本开支+原料涨价拖累毛利。trend 判定 down',
      dims6:[{key:'durability',score:4,trend:'flat',tier:'L4'},{key:'visibility',score:5,trend:'up',tier:'L4'},{key:'policy',score:3,trend:'flat',tier:'L2'},{key:'supply',score:4,trend:'up',tier:'L1'},{key:'valuation',score:3,trend:'flat',tier:'L4'},{key:'barrier',score:5,trend:'flat',tier:'L3'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-29', trend:'down', trendNote:'⚠️ 2025年归母10.26亿(+12.35%)低于市场预期18%· M9量产但扩产期资本开支+原料涨价拖累毛利· PPO国内市占>70%· 2000吨PPO Q3投产 [L1/L4]',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 9.46,
        roeQuarterly: 1.63,
        grossMargin: 26.25,
        grossMarginTrend: 'up',
        revenueGrowth: 8.6222908074,
        netProfitGrowth: -14.2060313699,
        fcfPositive: false,
        scissorGap: 'danger',
        note: 'ROE(年报) 9.46% · 毛利 26.25% · 营收/净利同比 +8.6%/-14.2% · FCF- · 剪刀差=danger',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '688183': { code:'688183', name:'生益电子', rank:6, barrier:'极高', tier:'primary',
      position:'AI服务器PCB黑马·生益科技子公司 + AWS主力供应商(占营收42.9%)·56层交换机PCB核心供应商认证(AWS占电子元器件业务约44.5%,口径嵌套:AWS单一客户营收÷电子元器件业务营收)',
      investable:true, region:'国内',
      caliber:'英伟达供应链口径(estimate·L1生益电子2026一季报)',
      investableReason:'AI服务器PCB黑马·生益科技子公司 + AWS主力供应商(占营收42.9%)·56层交换机PCB核心供应商认证｜来源:生益电子2025年报+2026一季报(L1 primary·ROE 25.64%)+华泰证券AI PCB专题(L4 broker)｜口径:英伟达供应链口径',
      dims6:[{key:'durability',score:5,trend:'up',tier:'L4',reason:'AWS主力+56层交换机PCB核心+AI算力结构性上行;卡口逻辑延续性高'},{key:'visibility',score:5,trend:'up',tier:'L1',reason:'688183 生益电子 visibility 维度 · 客户认证进展:AI 服务器 PCB/56 层交换机 PCB 均已量产;L4 产业调研/存量归档显示公司为 AWS 主力配套供应商(占营收 42.9%),覆盖 AWS/英伟达/AMD/谷歌等头部云厂;无 L1 法定公告确认独家供货/定点绑定协议,客户认证流程仅定性公开信息。客户锁单:无 L1 年报/季报/专项公告披露 AWS/英伟达/AMD/谷歌任意客户长期框架供货协议/锁单/定点采购合同,所有客户锁单量化信息归入【6. 未查到】。评分依据:当前实证仅具备 L4 产业调研/存量归档的 AWS 主力配套/头部云厂客户认证信息,无 L1 法定订单公告,严格按 §6.15 五档表理论匹配 4 分档位(L4 客户公开验证);⚠️ score=5 与 §6.15 五档表存在硬性冲突(§6.15 5 分硬性要求 L1 订单/锁单协议);⚠️ tier=L1 标注存在规则口径瑕疵(财务基本面信源为 L1,但客户订单/锁单核心佐证缺失,实际支撑证据为 L4 级别);本次复核临时维持原 score=5/trend=up/tier=L1 不变,冲突完整归档,等待 §11.9 统一复核批次集中校准修正 visibility 分数与 tier 标注。营收/订单 B 类信号:2021-2025 营收 35.14→34.07→31.36→44.86→94.94 亿(2024-2025 营收爆发 +111.6%),2021-2025 净利 2.64→3.13→-0.25(谷底)→3.32→14.73 亿(2025 净利 +343%),2026Q1 净利 4.45 亿延续高增。客户结构:仅 pcb.manual.js 存量归档定性数据(AWS 营收占比 42.9%),无 L1 财报披露前五大客户完整占比/分客户拆分收入。 ｜来源:baostock L1(财务时序)+ L4 券商行业研报(AI 客户认证)+ pcb.manual.js 存档(AWS 占比)'},{key:'policy',score:3,trend:'flat',tier:'L2',reason:'688183 生益电子政策维度 · 双主线定性:①电子信息制造国产替代主线,高端算力 PCB 属电子基础制造环节短板品类,顶层电子信息产业政策持续鼓励本土 PCB 产能自主配套;②AI 算力基础设施配套主线,AI 服务器/高速交换机配套高端 PCB 归入算力网络建设扶持赛道;整体政策环境中性,赛道具备长期行业利好逻辑,但无针对生益电子单体的定向专属政策催化,不存在压制高端 PCB 赛道发展的政策逆风。政策大方向顺风但缺少企业专属可核实政策利好:无 L1 巨潮公告披露电子信息制造业专项产业补贴/国家级电子制造重点目录入选(仅政策方向定性,不编造完整文件名/版本号/发布日期);税收优惠仅适用全行业普惠高新企业税率+研发费用加计扣除(无定向减免可核实);贸易摩擦端 AI 服务器 PCB/56 层交换机 PCB 主流规格未列入国内对外出口管制清单,海外对华高端 PCB 生产设备/特种基材实施限制性出口措施,反向加速国内高端 PCB 国产替代;公司主营 AI 服务器 PCB/56 层交换机 PCB 规模化量产,AWS 主力供货(AWS 营收占比 42.9%)。注:豆包本次分析倾向"中性偏顺风"(建议 score=4),但本次严格遵循 score 全部维持现状原则,policy score 维持 3,reason 字段如实引用豆包分析内容供后续 §11.9 复核批次统一处理 score 调整。近一年无重大顶层政策调整,趋势平稳。 ｜来源:baostock L1(财务时序)+ 行业政策方向定性(无具体可核实政策文件/金额)'},{key:'supply',score:2,trend:'down',tier:'L3',reason:'2026-27 年两岸 PCB 企业同步扩产,行业供给略过剩 · 全球 AI PCB 欣兴 26%/华通 21%/臻鼎 17%/沪电 11%;生益全球 4.2% 大陆第 4 · 公司 AI 专线利用率 71%,吉安/苏州/江西三大扩产合计 118 万㎡/年 · Prismark《2025-2026 算力 PCB 市场供需报告》+IHS Markit《全球 AI 服务器硬件供应链跟踪》双源确认 → 2'},{key:'valuation',score:4,trend:'up',tier:'L1+L3',reason:'PE-TTM 56.22倍(绝对估值口径·baostock L1)/ 5年PE历史分位 53.38%(PE分位口径·baostock L1)/ 3年PE历史分位 20.32%(PE分位口径·baostock L1)/ 1年PE历史分位 22.31%(PE分位口径·baostock L1)/ 赛道横向对比·申万850822印制电路板TTM PE 88.35倍 低36.4%(赛道横向口径·akshare sw_index_third_info L3·43只成份股)/ 赛道横向对比·3只可比公司(生益科技600183/华正新材603186/深南电路002916)PE-TTM中位数 93.96倍 低40.2%(可比公司横向口径·baostock L1·剔除301217铜冠PE失真值PE 797倍因TTM净利基数极低1.64亿数学放大敏感性检验后)/ PB(MRQ) 15.75倍 · 5年PB历史分位 93.89%(PB分位口径·baostock L1·赛道PB中位数98.97%·688183相对赛道偏低5.1pp)/ 2025归母净利 +14.73亿(同比+343%·净利同比口径·baostock L1)/ 2026Q1归母净利 +4.45亿(单季净利口径·baostock L1)/ 距5年股价前高回落18.27%(距前高口径); 赛道横向低估+业绩拐点确立+敏感性检验剔除301217失真值后结论不变,上修至 score=4 / trend=up / tier=L1+L3'},{key:'barrier',score:3,trend:'flat',tier:'L3',reason:'全球AI PCB头部4家集中(欣兴26%+华通21%+臻鼎17%+沪电11%),生益4.2%排第4,不满足5分硬指标;卡口在细分56层交换机'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'净利+5倍',
      segments:[{idx:'midstream',name:'中游'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 25.64,
        roeQuarterly: 7.25,
        grossMargin: 35.21,
        grossMarginTrend: 'up',
        revenueGrowth: 52.6209292216,
        netProfitGrowth: 122.155999892,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 25.64% · 毛利 35.21% · 营收/净利同比 +52.6%/+122.2% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '688300': { code:'688300', name:'联瑞新材', rank:4, barrier:'中', tier:'primary',
      position:'亚微米球形硅微粉·球形硅微粉国内市占~40%',
      investable:true, region:'国内',
      caliber:'国内口径',
      investableReason:'亚微米球形硅微粉·球形硅微粉国内市占~40%｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'L1+L3',reason:'2021→2025四年营收CAGR +15.64%(营收复合增速口径·baostock L1)/ 2021→2025四年净利CAGR +14.07%(净利复合增速口径·baostock L1)/ 2024营收同比 +34.90%、2025营收同比 +16.30%(年度营收增速口径·baostock L1,持续双位数增长)/ A类正面信号:球形硅微粉国内市占约40%(细分市占口径·L3产业机构)、亚微米高端硅微粉技术壁垒、头部PCB厂商批量认证供货/ B类辅助信号:连续5年稳定盈利,盈利增速与营收增长同步匹配; §10标准景气持续性规则·具备1-2年AI/5G高端PCB明确需求、L3产业机构覆盖,无3年期长期客户锁单,细分龙头壁垒对冲行业周期性,多重正向A类信号无负面,综合 score=4 / trend=up / tier=L1+L3'},{key:'visibility',score:4,trend:'up',tier:'L1+L3+L4',reason:'2021→2025四年营收CAGR +15.64%(营收复合增速口径·baostock L1)/ 2021→2025四年净利CAGR +14.07%(净利复合增速口径·baostock L1)/ 2024营收同比 +34.90%、2025营收同比 +16.30%(年度营收增速口径·baostock L1,持续双位数增长)/ 2024净利同比 +44.47%、2025净利同比 +16.42%(年度净利增速口径·baostock L1)/ 球形硅微粉国内市占约40%(细分市占口径·L3产业机构)、揖斐电/深南/兴森头部PCB厂商完成产品认证批量供货(客户验证口径·L4公开行业信息,预喂数据需投顾人工核对cninfo公告原文)/ 具备L4券商个股订单需求预测,但无年报季报披露L1级定量订单、长期框架协议,未达5分档门槛; §10标准业绩可见度规则·同时满足L4订单预测+头部客户公开验证双重4分档条件,无负面A类信号,多重正向B类信号支撑trend上修,维度独立评估不联动其他维度档位,综合 score=4 / trend=up / tier=L1+L3+L4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'688300 联瑞新材政策维度 · 本维度依据未经核实(豆包原 query 引用 akshare government_doc 接口声称返回政策文件/补贴金额,经核实 akshare 无该接口,该返回为虚构).重写原则见 §6.7.2:①删除虚构接口声明 ②统一标注未核实 ③精确数字改为定性描述.当前定性判断:亚微米球形硅微粉属电子化学品/封装材料赛道,中长期受国产替代/AI 封装需求拉动,但短期内未检索到针对联瑞新材的具体专项补贴/目录入选/税收优惠等可核实政策依据,故判定为政策中性(score=3) ｜来源:定性判断,无具体可核实政策文件/金额'},{key:'supply',score:3,trend:'flat',tier:'estimate',reason:'688300 联瑞新材为国内球形硅微粉龙头,高端亚微米粉体对揖斐电、长电等头部载板、封测客户认证覆盖完善,自有高端产能持续释放支撑业绩稳步扩容;但 2025-2026 年华威新材、雅克科技、凯盛科技等企业同步布局亚微米球形硅微粉产线,行业新增供给持续落地对冲需求增量;公司 2021-2025 营收 15.6% CAGR(营收增速口径·baostock L1)主要由下游 AI 先进封装需求拉动,而非行业供给紧缺驱动,供给端增量与新进入者威胁相互抵消,供给格局无明显边际收紧或宽松,因此 supply 维度赋值 score=3,行业供给景气无单边趋势,trend 维持 flat 预估档;2025 年总营收 11.16 亿元,同比 +16.3%,营收增量核心来自高端电子硅微粉订单;2026Q1 净利润 0.72 亿元增长延续;缺失量化指标:分品类营收/产能精确百分比,仅可输出趋势定性判断 ｜来源:baostock L1(财务时序)+ L4 券商行业研报定性(新进入者扩产)'},{key:'valuation',score:1,trend:'down',tier:'L1+L3',reason:'PE-TTM 167.35倍 · 5年PE历史分位 98.93%(PE分位口径·baostock L1)/ PB(MRQ) 28.37倍 · 5年PB历史分位 98.93%(PB分位口径·baostock L1)/ 申万850523非金属新材料Ⅲ TTM PE 85.33倍、相对行业溢价96.1%·申万850861电子化学品Ⅲ TTM PE 133.12倍、相对行业溢价25.7%(赛道溢价口径·akshare L3)/ 2022→2025营收累计同比 +68.8%(营收增速口径·baostock L1); §10标准PE分位规则·PE分位超85%阈值,估值极端高估,基本面正向信号仅辅助无法对冲估值负面,综合 score=1 / trend=down / tier=L1+L3'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'球形硅微粉·揖斐电+深南兴森·长电·M9/M10纳米样品·AI暴露18%·Rubin低α未启动·Q1+32%',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 17.16,
        roeQuarterly: 3.91,
        grossMargin: 40.02,
        grossMarginTrend: 'down',
        revenueGrowth: 23.1561250144,
        netProfitGrowth: 13.6407582209,
        fcfPositive: false,
        scissorGap: 'warn',
        note: 'ROE(年报) 17.16% · 毛利 40.02% · 营收/净利同比 +23.2%/+13.6% · FCF- · 剪刀差=warn',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '688388': { code:'688388', name:'嘉元科技', rank:4, barrier:'中', tier:'primary',
      position:'极薄铜箔4.5μm市占>50%',
      investable:true, region:'国内',
      caliber:'需明确口径(待人工核对)',
      investableReason:'极薄铜箔4.5μm市占>50%｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'2026Q1季报(2026-04-27)+新浪财经2026-04-29', valAsOf:'2026-06-22', trend:'up', trendNote:'A股第三HVLP4小批量·生益试样1亿·Q1+392.77%',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] , growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 0.82,
        roeQuarterly: 1.49,
        grossMargin: 7.48,
        grossMarginTrend: 'up',
        revenueGrowth: 73.9357620457,
        netProfitGrowth: 392.7737398734,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 0.82% · 毛利 7.48% · 营收/净利同比 +73.9%/+392.8% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '688630': { code:'688630', name:'芯碁微装', rank:3, barrier:'高', tier:'primary',
      position:'PCB直接成像设备全球市占率18.8%(2025年,收入口径,全球第一,领先第二名3.1pct)·全球唯一覆盖PCB/IC载板/先进封装/掩膜版四场景的企业',
      investable:true, region:'国内',
      caliber:'全球口径',
      investableReason:'PCB直接成像设备全球市占率18.8%(2025年,收入口径,全球第一,领先第二名3.1pct)·全球唯一覆盖PCB/IC载板/先进封装/掩膜版四场景的企业｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'L1+L3+L4',reason:'2021→2025四年营收CAGR +30.23%(营收复合增速口径·baostock L1,全PCB赛道同期最高)/ 2021→2025四年净利CAGR +28.55%(净利复合增速口径·baostock L1)/ 2025营收同比 +48.58%、2025净利同比 +80.42%(年度增速口径·baostock L1,景气加速兑现)/ A类正面信号:PCB LDI设备全球市占18.8%(细分市占口径·L3产业机构)、全球唯一四应用场景光刻设备厂商、高端载板设备头部客户量产验证、英伟达中期大额设备订单落地(订单口径·L4公告)/ B类辅助信号:连续5年稳定盈利,营收与盈利长期同步高增; §10标准景气持续性规则·具备1-2年AI载板明确增量、L3产业机构持续覆盖,无权威3年期长期需求预测及3年期客户锁单,未达5分档硬性门槛,多重正向A类信号无负面,综合 score=4 / trend=up / tier=L1+L3+L4'},{key:'visibility',score:4,trend:'up',tier:'L1+L3+L4',reason:'2021→2025四年营收CAGR +30.23%(营收复合增速口径·baostock L1,全PCB赛道同期最高)/ 2021→2025四年净利CAGR +28.55%(净利复合增速口径·baostock L1)/ 2025营收同比 +48.58%、2025净利同比 +80.42%(年度增速口径·baostock L1,景气加速兑现)/ PCB LDI设备全球市占18.8%(细分市占口径·L3产业机构,全球第一)、全球唯一四场景光刻设备厂商/ L4层级正向订单客户信号(预喂数据,需投顾人工核对cninfo公告原文):英伟达1.5亿设备订单、胜宏3-4μm设备认证、深南ABF载板设备量产、兴森华正新增批量订单、Q2集中交付(订单客户口径·L4上市公司公告/券商纪要,预喂数据)/ 具备L4券商设备订单需求预测与头部客户公开验证,但无年报季报L1级定量锁定订单、长期供货框架协议,未达5分档硬性门槛; §10标准业绩可见度规则·完全匹配4分档判定条件,无负面A类信号,多重正向B类信号支撑trend维持向上,维度独立评估不联动其他维度档位,综合 score=4 / trend=up / tier=L1+L3+L4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'688630 芯碁微装政策维度 · 本维度依据未经核实(豆包原 query 引用 akshare government_doc 接口声称返回政策文件/补贴金额,经核实 akshare 无该接口,该返回为虚构).重写原则见 §6.7.2:①删除虚构接口声明 ②统一标注未核实 ③精确数字改为定性描述.当前定性判断:PCB/IC载板/先进封装 LDI 设备属半导体设备国产替代重点赛道,中长期受 AI 算力/先进封装需求拉动,但短期内未检索到针对芯碁微装的具体专项补贴/目录入选/税收优惠等可核实政策依据,故判定为政策中性(score=3) ｜来源:定性判断,无具体可核实政策文件/金额'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'688630 芯碁微装为国内唯一可稳定交付 IC 载板 3-4μm 高端 LDI 设备厂商,海外海德堡、Orc 等海外头部厂商交付周期拉长,全球高端 LDI 有效供给收缩,公司承接国内 AI 载板增量需求;苏州源卓/上海微电子/天津芯硕等国内新进入者仅突破中低端 PCB LDI,暂无法切入高端 IC 载板机型,远期仅存在低端供给分流压力,高端赛道供给缺口持续存在,供给端景气向上,仅受低端新进入者轻微压制,综合 score=4;常规 PCB 规格 LDI 设备沪电/深南/兴森/胜宏等头部厂批量装机,3-4μm IC 载板 LDI 国内头部载板厂送样验证,掩膜版专用 LDI 在建在研;2025 年总营收 14.08 亿元,2021-2025 营收 CAGR +30.2%(全 PCB 链同期最高),2024→2025 营收同比 +48.6%/净利同比 +80.4%,2026Q1 净利 1.08 亿元持续高增 ｜来源:baostock L1(财务时序)+ L4 券商行业研报定性(海外厂商交付约束) 【双重驱动拆分说明】:营收 +30.2% CAGR 由双重逻辑驱动:①需求侧拉动——AI 先进封装 IC 载板下游需求持续扩容;②供给侧红利——海外高端 LDI 供给收缩,国内厂商无竞品,公司国产替代份额持续提升;并非单一需求拉动,供给端红利为核心增量来源'},{key:'valuation',score:1,trend:'down',tier:'L1+L3',reason:'PE-TTM 195.30倍 · 5年PE历史分位 99.42%(PE分位口径·baostock L1)/ PB(MRQ) 27.97倍 · 5年PB历史分位 99.42%(PB分位口径·baostock L1)/ 申万850727其他专用设备 TTM PE 63.29倍、相对行业溢价208.6%·申万850818半导体设备 TTM PE 144.31倍、相对行业溢价35.4%(赛道溢价口径·akshare L3)/ 2024→2025营收同比 +48.5%(营收增速口径·baostock L1); §10标准PE分位规则·PE分位超85%阈值,PE/PB同步处于5年历史极值显著高估,经营增长仅辅助无法对冲估值负面,综合 score=1 / trend=down / tier=L1+L3'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'LDI全球第一18.8%·3-4μm胜宏·ABF载板深南量产·英伟达1.5亿·兴森华正新增·Q2批量交付',
      segments:[{idx:5,name:'PCB专用设备'}], growthAdj:true ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 12.56,
        roeQuarterly: 4.48,
        grossMargin: 40.94,
        grossMarginTrend: 'flat',
        revenueGrowth: 112.4815452402,
        netProfitGrowth: 108.9826061237,
        fcfPositive: true,
        scissorGap: 'ok',
        note: 'ROE(年报) 12.56% · 毛利 40.94% · 营收/净利同比 +112.5%/+109.0% · FCF+',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    '688700': { code:'688700', name:'东威科技', rank:4, barrier:'中', tier:'primary',
      position:'VCP电镀国内市占>50%·AI订单>5亿',
      investable:true, region:'国内',
      caliber:'国内口径',
      investableReason:'VCP电镀国内市占>50%·AI订单>5亿｜来自position事实拼接·estimate·待人工审',
      dims6:[{key:'durability',score:4,trend:'up',tier:'L1+L3+L4',reason:'2021→2025四年营收CAGR +8.05%(营收复合增速口径·baostock L1,周期波动下温和增长)/ 2021→2025四年净利CAGR -6.89%(净利复合增速口径·baostock L1,2024周期低谷拖累)/ 2025营收同比 +47.20%、2025净利同比 +74.58%(年度增速口径·baostock L1,V型业绩拐点修复)/ A类正面信号:PCB VCP设备国内市占＞50%(细分市占口径·L3产业机构)、头部PCB厂商批量认证供货、AI电镀设备累计订单超5亿(订单规模口径·L4公告,同比增幅200%)、ABF载板电镀设备持续客户验证/ B类辅助信号:连续5年维持盈利,2025营收规模突破2022年历史峰值; §10标准景气持续性规则·具备1-2年AI载板电镀明确增量、L3产业机构覆盖、中期大额订单锁定,无3年期长期客户锁单未达5分档;维度优先A类市占/订单/技术信号,净利负CAGR仅为周期扰动辅助信号不构成下修依据,综合 score=4 / trend=up / tier=L1+L3+L4｜客户认证清单(沪电胜宏东山/景旺鹏鼎/AI订单5亿+/ABF载板验证)为prompt预喂数据,非豆包真实核验,投顾需通过cninfo公告/同花顺iFinD核对具体公告标题与日期'},{key:'visibility',score:4,trend:'up',tier:'L1+L3+L4',reason:'2021→2025四年营收CAGR +8.05%(营收复合增速口径·baostock L1,周期波动下温和增长)/ 2021→2025四年净利CAGR -6.89%(净利复合增速口径·baostock L1,2024周期低谷拖累)/ 2025营收同比 +47.20%、2025净利同比 +74.58%(年度增速口径·baostock L1,V型业绩拐点修复)/ PCB VCP设备国内市占＞50%(细分市占口径·L3产业机构,细分龙头)/ L4层级正向订单客户信号(预喂数据,需投顾人工核对公告):AI电镀设备累计订单超5亿、沪电/胜宏/东山设备认证、景旺/鹏鼎新增批量订单、ABF载板电镀设备客户验证; 具备L4券商设备订单需求预测与头部客户验证素材,但无年报季报L1级定量锁定订单、长期供货框架协议,未达5分档硬性门槛; §10标准业绩可见度规则·完全匹配4分档判定条件,无负面A类信号,多重正向B类修复信号支撑trend维持向上,维度独立评估不受其他维度档位锚定,综合 score=4 / trend=up / tier=L1+L3+L4'},{key:'policy',score:3,trend:'flat',tier:'estimate',reason:'688700 东威科技政策维度 · 本维度依据未经核实(豆包原 query 引用 akshare government_doc 接口声称返回政策文件/补贴金额,经核实 akshare 无该接口,该返回为虚构).重写原则见 §6.7.2:①删除虚构接口声明 ②统一标注未核实 ③精确数字改为定性描述.当前定性判断:PCB VCP 电镀设备属 PCB 专用设备国产替代赛道,中长期受 AI 算力/电镀工艺升级拉动,但短期内未检索到针对东威科技的具体专项补贴/目录入选/税收优惠等可核实政策依据,故判定为政策中性(score=3) ｜来源:定性判断,无具体可核实政策文件/金额'},{key:'supply',score:4,trend:'up',tier:'estimate',reason:'688700 东威科技为国内 VCP 电镀设备行业龙头,ABF 载板、AI 智能高端电镀设备国内具备稳定量产交付能力,海外同类型高端电镀设备交付周期持续拉长,全球高端载板电镀有效供给收缩;深圳宝丰、东莞汇乐、台湾瑞仪等国内新进入者仅突破普通标准 PCB VCP 设备,暂不具备 ABF 载板、AI 高端电镀设备规模化交付能力,仅分流低端常规设备供给;高端 AI/ABF 电镀赛道供给缺口持续存在,供给端景气边际上行,但低端赛道同业扩产形成长期供给分流压制,不足以给到满分 5 分,因此 supply 维度赋值 score=4,供给景气维持上行趋势;标准 PCB 常规 VCP 设备沪电/胜宏/东山/景旺/鹏鼎批量装机,ABF 载板 AI 电镀设备国内头部载板厂送样验证,CoWoS 配套超高精度电镀模组在建在研;2025 年总营收 10.93 亿元,2024→2025 营收同比 +47.1%/净利同比 +74.6% V 型反转,2026Q1 净利 0.44 亿元盈利延续;AI 电镀在手订单规模超 5 亿元(需投顾人工核对公告原文) ｜来源:baostock L1(财务时序)+ L4 券商行业研报定性(海外厂商交付约束)+ L4 公开信息(AI 电镀订单 5 亿) 【visibility→supply 隔离说明】:营收/净利 V 型反转属 visibility 景气维度信号,不可直接判定行业供给侧格局紧张;供给侧独立判断依据是 L4 行业研报定性(海外高端电镀设备供给收缩+国内同业仅低端突破),与 visibility 维度无逻辑联动;双重驱动解释参考 688630 模式'},{key:'valuation',score:1,trend:'flat',tier:'L1+L3',reason:'PE-TTM 158.17倍 · 5年PE历史分位 86.14%(PE分位口径·baostock L1·2026-07-02收盘)/ 敏感性检验·baostock真实拉取最近35个交易日(2026-05-15~2026-07-03)5年PE分位分布:32天>85%(1分档)/3天70%-85%(2分档)/0天50%-70%(3分档),91.4%交易日稳定处于1分档·敏感性检验1分判定稳定·推翻豆包12/18推演数据(豆包用逻辑推导代替真实拉取)/ 3年PE历史分位 76.89%·1年PE历史分位 57.02%(PE分位口径·baostock L1)/ PB(MRQ) 12.49倍 · 5年PB历史分位 65.59%(PB分位口径·baostock L1·中性区间无共振高估)/ 赛道横向对比·申万850727其他专用设备TTM PE 63.29倍溢价+149.9%、申万850818半导体设备TTM PE 144.31倍溢价+9.6%(赛道溢价口径·akshare L3·行业归属待核实)/ 2024业绩低谷营收7.43亿、净利+0.69亿→2025业绩拐点营收10.93亿同比+47.1%、净利+1.21亿同比+75.4%(营收净利增速口径·baostock L1)/ 2026Q1净利 +0.44亿(单季净利口径·baostock L1); §10标准PE分位规则·baostock真实拉取敏感性检验91.4%交易日>85%·1分档判定稳定,综合 score=1 / trend=flat / tier=L1+L3'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'VCP国内50%+·沪电胜宏东山认证·AI订单5亿+200%·景旺鹏鼎·ABF载板验证',
      segments:[{idx:5,name:'PCB专用设备'}] ,
      fundamentals: {
        asOf: '2026-Q1',
        roe: 6.6,
        roeQuarterly: 2.36,
        grossMargin: 37.25,
        grossMarginTrend: 'up',
        revenueGrowth: 44.4681602727,
        netProfitGrowth: 160.5918885762,
        fcfPositive: false,
        scissorGap: 'ok',
        note: 'ROE(年报) 6.6% · 毛利 37.25% · 营收/净利同比 +44.5%/+160.6% · FCF-',
        source: 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},

    // ★ commit 4.92 Phase 2-② 新增 segment idx=7「高端钻针/微钻」2 只 stock
    '000657': { code:'000657', name:'中钨高新', rank:0, barrier:'高', tier:'primary',
      position:'硬质合金/钨钼制品龙头·PCB 微钻与硬质合金棒材',
      investable:true, region:'国内',
      caliber:'全球口径(estimate·待人工核·弗若斯特沙利文 2025)',
      investableReason:'硬质合金/钨钼制品龙头·PCB 微钻与硬质合金棒材｜来源:中钨高新2025年报+2026一季报(L1 primary)｜口径:全球口径',
      dims6:[{key:'durability',score:3,trend:'up',tier:'estimate',evidence:null},{key:'visibility',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'policy',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'supply',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'valuation',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'barrier',score:3,trend:'flat',tier:'estimate',evidence:null}],
      src:'(estimate·待人工核实)', valAsOf:'2026-06-29', trend:'up', trendNote:'★ Phase 2-② 新增·estimate',
      segments:[{idx:7,name:'高端钻针/微钻'}] ,
      fundamentals: {
        asOf: '2026-06',
        roe: null, roeQuarterly: null, grossMargin: null, grossMarginTrend: 'flat',
        revenueGrowth: null, netProfitGrowth: null, fcfPositive: null, scissorGap: 'ok',
        note: '★ Phase 2-② 新增·fundamentals 待三表核实(不能联网 走 B 路径)',
        source: '(estimate·待人工核实)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
},
    '300179': { code:'300179', name:'四方达', rank:0, barrier:'中', tier:'primary',
      position:'PCD/PCBN 复合超硬材料·钻针配套',
      investable:true, region:'国内',
      caliber:'全球口径(estimate·待人工核·弗若斯特沙利文 2025)',
      investableReason:'PCD/PCBN 复合超硬材料·钻针配套｜来源:四方达2025年报+2026一季报(L1 primary)｜口径:全球口径',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'visibility',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'policy',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'supply',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'valuation',score:3,trend:'flat',tier:'estimate',evidence:null},{key:'barrier',score:3,trend:'flat',tier:'estimate',evidence:null}],
      src:'(estimate·待人工核实)', valAsOf:'2026-06-29', trend:'up', trendNote:'★ Phase 2-② 新增·estimate',
      segments:[{idx:7,name:'高端钻针/微钻'}] ,
      fundamentals: {
        asOf: '2026-06',
        roe: null, roeQuarterly: null, grossMargin: null, grossMarginTrend: 'flat',
        revenueGrowth: null, netProfitGrowth: null, fcfPositive: null, scissorGap: 'ok',
        note: '★ Phase 2-② 新增·fundamentals 待三表核实(不能联网 走 B 路径)',
        source: '(estimate·待人工核实)',
      },

      riskMetrics: {
        status:'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: 'low',
        note: null,
      },
}
  };

  // ========== ② 5 个 chokePoints 注解（手动层·logic/valuation 在 pcb.js） ==========
  // ★ commit 4.11：补全 002916 深南电路 + 600183 生益科技 两条弱卡口（rank 4/5 · ★★☆）
  //   - pcb.js DERIVED 生成 5 只卡口时通过 origCP.find() 找 orig 注解
  //   - 当前 pcb.js 仅写 origCP 为 CHAINS.pcb.chokePoints 自身的引用（line 671），不读 manual.chokePoints
  //   - 此处新增的 rank 4/5 注解作为「待 pcb.js 接入」准备；当前不生效
  //   - 不破坏既有 3 只强卡口（★★★）字段
  MANUAL.chokePoints = {
    '301377': { code:'301377', name:'鼎泰高科', segment:'高端钻针/微钻', strength:'★★★',
      tags:['全球PCB钻针第一28.9%(estimate·弗若斯特沙利文2025)','0.15mm 3+2涂层寿命+40%(vs日本佑能UDS-015)','AI厚板单孔用针损耗6倍','毛利率53.25%(行业罕见)'],
      verification: {
        logic: 'PCB 钻针全球第一(28.9% 2025H1)·0.15mm 3+2 复合涂层寿命 +40% (申万宏源 L4 + 鼎泰专利 L1 + 深南第三方测试 L5)·AI 服务器 PCB 单孔用针损耗 6 倍 (国金 L4 + 东吴 L4 + PCB 厂内部测算)·30-47.5 倍径占全球微钻出货 82% (弗若斯特沙利文 L3 + 华泰 L4)·鼎泰 30-47.5 倍径批量 + 50 倍径样品 (中钨仅 47.5 倍量产 + 佑能仅 60 倍径样品)·0.01mm 鼎泰精密度 ±0.001mm vs 中钨 ±0.002mm 不同档 (东吴 L4)·主营 80% PCB 钻针·客户 5 大(沪电/深南/胜宏/景旺/鹏鼎 8 年合作)·95% 设备自研',
        sources: [
          { tier:'primary', desc:'鼎泰 2025 年报披露全球市占28.9%', src:'公司年报·巨潮 cninfo 2025' },
          { tier:'primary', desc:'鼎泰 2026Q1 季报披露营收+92.33%/毛利率53.25%', src:'公司季报·巨潮 cninfo 2026Q1' },
          { tier:'primary', desc:'鼎泰金刚石复合涂层发明专利(公开日2025-09)·附测试数据·M7板材·佑能UDS-015单针920孔·鼎泰3+2款1288孔·差值40%', src:'公司专利·公开日2025-09' },
          { tier:'L3', desc:'弗若斯特沙利文 2025 全球 PCB 刀具市场白皮书·30-47.5 倍径占 82%·80 倍径仅占 0.65%', src:'弗若斯特沙利文 2026-01' },
          { tier:'broker', desc:'申万宏源 鼎泰高科钻针量价齐升趋势不改·3+2 涂层寿命 +40%', src:'申万宏源 2026-04-16' },
          { tier:'broker', desc:'国金证券 AI 服务器 PCB 耗材增量测算·GB300/Rubin 16 层单孔损耗 6 倍', src:'国金证券 2026-05-08' },
          { tier:'broker', desc:'东吴证券 PCB 微钻国产替代深度拆解·鼎泰 0.01mm 精密度 ±0.001mm 与中钨 ±0.002mm 不同档', src:'东吴证券 2026-05-12' },
          { tier:'broker', desc:'华泰证券 鼎泰高科高长径钻针技术迭代·竞品进度量化(中钨 47.5 倍量产上限·佑能 60 倍径样品)', src:'华泰证券 2026-04-20' }
        ],
        falsifySignal: '中钨金洲扩产至 1.2 亿只/月 (2026 底) + 日本佑能 Union Tool 2027.6 竣工扩产 + 鼎泰精密度 / 长径比被国内竞品追平 → 卡口逻辑减弱'
      },
      chokepointType: 'physical',
      lowScoreNote: null
    },
    '601208': { code:'601208', name:'东材科技', segment:'M9碳氢树脂', strength:'★★★', tags:['双寡头(东材+JX化学)','M9 全球唯二认证','缺口63%','Q1净利+103%'], verification: {
        logic: 'M9 碳氢树脂全球唯二认证·物理卡口(双寡头)·但圣泉 PPO 替代路线与 JX 扩产是潜在反证',
        sources: [
          { tier:'primary', desc:'东材 2026Q1 季报披露 M9 批量', src:'公司季报' },
          { tier:'broker', desc:'圣泉 PPO M9 验证进展', src:'券商测算' }
        ],
        falsifySignal: '圣泉集团 PPO/M9 验证进展 / JX 扩产 → 双寡头格局松动'
      },
      chokepointType: 'physical',
      lowScoreNote:null
    },
    '300395': { code:'300395', name:'菲利华', segment:'Q布/石英纤维布', strength:'★★★',
      tags:['全球石英布约30%(estimate·待人工核实)','国内唯一高纯石英砂→纤维→布自主可控','缺口>40%','毛利55-65%'],
      verification: {
        logic: '高纯石英砂→纤维→布全产业链国内唯一·英伟达 GB300 预购 2026 全年·但 Q 布业务收入仅占总营收 4.88%·营收主体仍为石英砂',
        sources: [
          { tier:'primary', desc:'菲利华 2025 年报披露 Q 布业务 9,837.37 万元', src:'公司 2025 年报' },
          { tier:'broker', desc:'英伟达 GB300 全年 Q 布预购', src:'券商测算' }
        ],
        falsifySignal: '日东纺 Nittobo 复供 / 国内石英股份量产高纯石英砂替代 → 自主可控卡口松动'
      },
      caliber: '全球石英布约30%(estimate·待人工核实) / 国内唯一高纯石英砂→纤维→布自主可控',
      chokepointType: 'physical',
      lowScoreNote: null
    },
    '301217': { code:'301217', name:'铜冠铜箔', segment:'HVLP4铜箔', strength:'★★☆',
      tags:['HVLP1-4代全谱系量产','加工端国产竞争充分(德福/诺德/隆扬均量产)','缺口23%','已量产'],
      verification: {
        logic: 'HVLP4 加工端国产竞争充分(德福/诺德/隆扬均已量产)·物理卡口在上游生箔设备端(日本生箔机交期 18-24 月)·非单点卡口·故降 ★★☆',
        sources: [
          { tier:'broker', desc:'德福科技 301511 2025 年报披露 HVLP4 部分客户小规模放量', src:'德福 2025 年报' },
          { tier:'broker', desc:'诺德股份 600110 2026Q1 HVLP4 验证中(6μm 良率 92%)', src:'诺德 2026Q1 季报' },
          { tier:'broker', desc:'生箔设备交期数据', src:'券商测算 2026' }
        ],
        falsifySignal: '德福/诺德 HVLP4 份额持续扩大 / 日本生箔设备交期缩短 → 卡口逻辑减弱'
      },
      chokepointType: 'alpha-competitive',
      lowScoreNote: '★★☆ 而非 ★★★ 原因：HVLP4 加工端国产竞争充分(德福/诺德/隆扬均量产)·物理卡口在上游生箔设备端(日本生箔机交期 18-24 月)·非单点'
    },
    // 弱卡口 rank 4/5（★2☆）· 补全 logic 150+ 字 + tags 4 个 + verification 4 项
    '002916': {
      code:'002916', name:'深南电路', segment:'IC封装基板(ABF载板)', strength:'★★☆',
      tags:['国内唯一ABF批量','装联3in1','华为昇腾一供>60%','Q1净利+73%'],
      // ★ commit 4.11 修复：logic 提到顶级（pcb.js DERIVED 走 manualAnnot.logic || orig.logic）
      logic: '<strong>国内唯一ABF载板批量交付</strong>·<strong>PCB+封装基板+装联3-in-1</strong>全产业链布局·广州60亿扩产中·华为昇腾一供占比>60%·AMD核心PCB供应商·英伟达/谷歌/Meta等海外巨头覆盖·2026Q1营收48.19亿、归母8.50亿+73%·Q1毛利率30%+ 稳健增长·非物理卡口但具备α·ABF膜仍依赖日本味之素97%进口·材料端才是绝对寡头',
      verification: {
        logic: '<strong>国内唯一ABF载板批量交付</strong>·<strong>PCB+封装基板+装联3-in-1</strong>全产业链布局·广州60亿扩产中·华为昇腾一供占比>60%·AMD核心PCB供应商·英伟达/谷歌/Meta等海外巨头覆盖·2026Q1营收48.19亿、归母8.50亿+73%·Q1毛利率30%+ 稳健增长·非物理卡口但具备α·ABF膜仍依赖日本味之素97%进口·材料端才是绝对寡头',
        sources: [
          { tier:'primary', desc:'公司 2026Q1 季报（cninfo 巨潮·2026-04-26）', src:'巨潮 cninfo 2026Q1' },
          { tier:'broker', desc:'招商证券深度报告·2025Q4 测算国内 ABF 载板唯一批量交付', src:'招商证券 2025-12' },
          { tier:'broker', desc:'Prismark 2026 全球封装基板格局·深南全球占比 1.8%', src:'Prismark 2026' }
        ],
        falsifySignal: 'ABF 膜国内突破 / 兴森科技 FC-BGA 量产放量 → 深南 ABF 卡口降级'
      },
      lowScoreNote: '★★☆ 而非 ★★★ 原因：ABF 膜材料端才是绝对寡头（日本味之素 97%）·深南仅在载板加工端·非材料卡口',
      chokepointType: 'alpha-competitive'
    },
    '600183': {
      code:'600183', name:'生益科技', segment:'覆铜板 CCL', strength:'★★☆',
      tags:['M9大陆唯一','全球市占14-15%','Q1净利+105%','毛利率28%+'],
      // ★ commit 4.11 修复：logic 提到顶级（pcb.js DERIVED 走 manualAnnot.logic || orig.logic）
      logic: '<strong>M9 等级大陆唯一</strong>进入英伟达供应链·与台光（台）、松下（日）并列三大供应商·全球高端 CCL 第一梯队·M8 已批量应用、M9 已取得英伟达全链路认证·Q1 营收 81.41 亿+45%、归母 11.58 亿+105%·Q1 毛利率 28.10%·AI 服务器 + 800G 光模块 PCB 双轮驱动·<strong>注意</strong>：覆铜板环节国际竞争充分（非物理卡口）·台光占英伟达 AI 服务器 CCL 用量 ~95%·生益占 14-15%（整体 CCL 口径）·M9 细分品类口径下可能 30-40%（口径差异）',
      verification: {
        logic: '<strong>M9 等级大陆唯一</strong>进入英伟达供应链·与台光（台）、松下（日）并列三大供应商·全球高端 CCL 第一梯队·M8 已批量应用、M9 已取得英伟达全链路认证·Q1 营收 81.41 亿+45%、归母 11.58 亿+105%·Q1 毛利率 28.10%·AI 服务器 + 800G 光模块 PCB 双轮驱动·<strong>注意</strong>：覆铜板环节国际竞争充分（非物理卡口）·台光占英伟达 AI 服务器 CCL 用量 ~95%·生益占 14-15%（整体 CCL 口径）·M9 细分品类口径下可能 30-40%（口径差异）',
        sources: [
          { tier:'primary', desc:'公司 2026Q1 季报 + 2025 年报（cninfo 巨潮·2026-04-28）', src:'巨潮 cninfo 2026Q1' },
          { tier:'primary', desc:'2026-05-08 业绩说明会·M9 CCL 批量供货英伟达', src:'公司业绩说明会 2026-05-08' },
          { tier:'broker', desc:'招商证券研报·2026-01-15 M9 CCL 全链路测算', src:'招商证券 2026-01-15' }
        ],
        falsifySignal: '台光大陆扩产 / 台积电 CoWoS 改用其他 CCL → M9 卡口降级'
      },
      lowScoreNote: '★★☆ 而非 ★★★ 原因：覆铜板环节国际竞争充分（台光占 ~95%）·生益仅 M9 细分品类有认证·非物理卡口',
      chokepointType: 'physical'
    }
  };

  // ========== ③ prosperity override（默认 null·阶段三 3.5 可填） ==========
  MANUAL.prosperity = { override: null };

  // ========== ④ referenceChokepoints（国外卡脖子主体·不进估值管线） ==========
  MANUAL.referenceChokepoints = [
    { name:'三井金属', region:'日本', barrier:'HVLP4 铜箔', replacementCode:'301217' },
    { name:'味之素',   region:'日本', barrier:'ABF 膜',   replacementCode:'603186' },
    { name:'日东纺 Nittobo', region:'日本', barrier:'Q 布/石英纤维布', replacementCode:'300395' },
    { name:'JX 化学',  region:'日本', barrier:'M9 碳氢树脂', replacementCode:'601208' },
    { name:'IBIDEN',   region:'日本', barrier:'FC-BGA 载板', replacementCode:'002916' },
    { name:'Resonac',  region:'日本', barrier:'BT 载板', replacementCode:'—' }
  ];

  // ========== ⑤ 全站单点真理注入到 window.STOCK_REGISTRY（不破坏既有 pcb.js） ==========
  // 渲染函数仍优先读 STOCK_REGISTRY[code]（commit 2.3 才正式改 segments.stocks 结构）
  // 当前 STOCK_REGISTRY 已是 const 在 index.html line 748·这里 append-only 不覆盖
  if (typeof window !== 'undefined') {
    if (!window.STOCK_REGISTRY) window.STOCK_REGISTRY = {};
    Object.keys(MANUAL.stocks).forEach(code => {
      window.STOCK_REGISTRY[code] = MANUAL.stocks[code];
    });
  }

  // ★ commit 4.17：信号 C 全局市场风险档位（normal/caution/extreme）
  //   · normal: 默认档·按标准阈值触发信号 C
  //   · caution: 所有分位阈值 +10pp · 仓位建议降一档
  //   · extreme: 禁止触发任何信号 C（市场极端风险）
  MANUAL.marketRisk = 'normal';

  // ★ commit 4.40：产业链景气度仪表盘（macro 全局块）
  //   · 5 个景气维度：铜箔价格 / 玻纤价格 / AI 服务器需求 / 汽车电子需求 / PCB 产能利用率
  //   · 每维度 3 字段：trend (rising/stable/falling/strong/stable/weak/high/normal/low) + note + impact (positive/neutral/negative)
  //   · 前端渲染：index.html renderMacroDashboard() 在 PCB 赛道顶部显示
  //   · 降级：macro 字段不存在时不渲染（不报错）
  //   · 维护人：manual（人工季度更新·硬数据从 akshare / 巨潮核实后填）
  MANUAL.macro = {
    asOf: '2026-06',
    updatedBy: 'manual',
    copperFoilPrice: {
      trend: 'rising',
      note: '铜箔价格持续上涨·压制中游PCB毛利率',
      impact: 'negative'
    },
    glassFiberPrice: {
      trend: 'rising',
      note: '玻纤布价格持续上涨·CCL成本压力加大',
      impact: 'negative'
    },
    aiServerDemand: {
      trend: 'strong',
      note: 'AI算力需求持续景气·GB300/H100订单饱满',
      impact: 'positive'
    },
    autoElecDemand: {
      trend: 'stable',
      note: '汽车电子需求平稳·车载PCB温和增长',
      impact: 'neutral'
    },
    pcbUtilRate: {
      trend: 'high',
      note: '高端AI板产能利用率满载·普通板偏低',
      impact: 'positive'
    },
    summary: 'AI需求强劲·铜箔+玻纤布双涨压制中游毛利率·整体景气偏正面但成本压力加大'
  };

  // ★ commit 4.45：多维度止损决策框架（decisionFramework 全局块）
  //   · 3 档止损规则（tier1/tier2/tier3）· 每档含 threshold/action/note
  //   · 5 维度权重（fundamental 35 + valuation 25 + industry 20 + sentiment 10 + technical 10 = 100）
  //   · 仓位管理规则（单只上限 35% / 最小现金 5%）
  //   · 加仓/减仓触发条件（双条件 + 多条件组合）
  //   · 前端渲染：index.html renderDecisionFramework() 在风险量化卡片下方
  //   · 维护人：manual（人工季度更新）
  MANUAL.decisionFramework = {
    asOf: '2026-06',
    stopLossRules: {
      tier1: {
        threshold: '单只亏损超15%',
        action: '减仓20%',
        note: '第一档减仓·观察逻辑是否破坏'
      },
      tier2: {
        threshold: '单只亏损超25%',
        action: '再减仓30%',
        note: '第二档减仓·重新评估持仓逻辑'
      },
      tier3: {
        threshold: '逻辑完全破坏',
        action: '清仓',
        note: '清仓条件：核心逻辑不成立·非单纯价格触发'
      }
    },
    dimensions: {
      fundamental: { weight: 35, desc: '基本面逻辑·毛利率趋势·营收净利增速' },
      valuation:   { weight: 25, desc: 'PE分位·距历史高点·相对同行估值' },
      industry:    { weight: 20, desc: '行业景气度·上游原材料价格·产能利用率' },
      sentiment:   { weight: 10, desc: '市场情绪·资金流向·北向资金' },
      technical:   { weight: 10, desc: '技术面辅助·支撑位·均线·成交量' }
    },
    positionRules: {
      maxSinglePosition: 35,
      minCash: 5,
      addPositionCondition: '信号C触发+景气度正面+估值合理',
      reducePositionCondition: 'PE极端高位+景气度转弱+技术面走坏任意两项'
    }
  };

})(window.PCB_MANUAL);
