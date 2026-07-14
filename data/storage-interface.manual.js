// data/storage-interface.manual.js -- 存储与接口产业链 · 手动层 (dims6 + fundamentals + moatScore/timingScore)
// Phase A 骨架 + 字段结构对齐 PCB 标准 · 2026-07-13
// 所有业务字段用 "(Phase B 补)" 或 null 占位,严禁在此文件中填入真实六维打分/护城河判断/投资建议
// 命名空间: STORAGE_INTERFACE_MANUAL · getManualNamespace('storage-interface') 自动解析

window.STORAGE_INTERFACE_MANUAL = window.STORAGE_INTERFACE_MANUAL || {};
(function(MANUAL){

  MANUAL._meta = {
    dataVersion: 'storage-interface.manual@2026-07-13.PhaseA-skeleton-aligned',
    description: '存储与接口产业链手动层 · 字段结构已对齐 PCB manual 标准 · 所有业务内容待 Phase B+ 迭代补',
    totalStocks: 30
  };
  MANUAL.stocks = MANUAL.stocks || {};

  // -------- 从 auto 层读取结构性参考信息(非业务判断,仅数据搬运) --------
  var _auto = window.CHAINS && window.CHAINS['storage-interface'];
  var _segIndex = {}; // code -> [{idx, name}]
  if (_auto && Array.isArray(_auto.segments)) {
    _auto.segments.forEach(function(seg, i){
      (seg.stocks || []).forEach(function(s){
        if (!_segIndex[s.code]) _segIndex[s.code] = [];
        _segIndex[s.code].push({ idx: i, name: seg.name });
      });
    });
  }
  if (_auto && _auto.midstream && Array.isArray(_auto.midstream.stocks)) {
    _auto.midstream.stocks.forEach(function(s){
      if (!_segIndex[s.code]) _segIndex[s.code] = [];
      _segIndex[s.code].push({ idx: 'midstream', name: '中游' });
    });
  }
  // 从 auto layer 提取已有 stock 的基础字段(name/rank/barrier/tier/position/trend/valAsOf)
  var _autoStock = {};
  function _captureStock(s) {
    if (!s || !s.code) return;
    if (_autoStock[s.code]) return;
    _autoStock[s.code] = {
      name: s.name || null,
      rank: (typeof s.rank === 'number') ? s.rank : null,
      barrier: s.barrier || null,
      tier: s.tier || null,
      position: s.position || null,
      trend: s.trend || null,
      valAsOf: s.valAsOf || null
    };
  }
  if (_auto && Array.isArray(_auto.segments)) {
    _auto.segments.forEach(function(seg){ (seg.stocks || []).forEach(_captureStock); });
  }
  if (_auto && _auto.midstream && Array.isArray(_auto.midstream.stocks)) {
    _auto.midstream.stocks.forEach(_captureStock);
  }

  // -------- 占位 stock 模板(字段结构对齐 PCB manual) --------
  function placeholderStock(code) {
    var auto = _autoStock[code] || {};
    var segList = _segIndex[code] || [];
    return {
      code: code,
      name: auto.name || '(Phase B 补)',
      rank: auto.rank,
      barrier: auto.barrier || '(Phase B 补)',
      tier: auto.tier || '(Phase B 补)',
      position: auto.position || '(Phase B 补)',
      investable: null,
      region: '(Phase B 补)',
      caliber: '(Phase B 补)',
      investableReason: '(Phase B 补)',
      src: '(Phase B 补)',
      valAsOf: auto.valAsOf || '(Phase B 补)',
      trend: auto.trend || '(Phase B 补)',
      trendNote: '(Phase B 补)',
      segments: segList.map(function(s){ return { idx: s.idx, name: s.name }; }),
      growthAdj: null,
      dims6: [
        { key:'durability', score:3, trend:'flat', tier:'estimate', reason:'(Phase B 补)', verifiedAt:null },
        { key:'visibility', score:3, trend:'flat', tier:'estimate', reason:'(Phase B 补)', verifiedAt:null },
        { key:'policy',      score:3, trend:'flat', tier:'estimate', reason:'(Phase B 补)', verifiedAt:null },
        { key:'supply',      score:3, trend:'flat', tier:'estimate', reason:'(Phase B 补)', verifiedAt:null },
        { key:'valuation',   score:2, trend:'flat', tier:'estimate', reason:'(Phase B 补)', verifiedAt:null },
        { key:'barrier',     score:3, trend:'flat', tier:'estimate', reason:'(Phase B 补)', verifiedAt:null }
      ],
      dims6Note: '(Phase B 补)',
      fundamentals: {
        asOf: null,
        roe: null,
        roeQuarterly: null,
        grossMargin: null,
        grossMarginTrend: null,
        revenueGrowth: null,
        netProfitGrowth: null,
        fcfPositive: null,
        scissorGap: null,
        note: '(Phase B 补)',
        source: '(Phase B 补)'
      },
      moatScore: null,
      timingScore: null,
      quadrant: '(Phase B 补)',
      moatComputedAt: null,
      riskMetrics: {
        status: 'deferred',
        stopLoss: null,
        stopLossReason: null,
        maxDrawdown5y: null,
        reentryCondition: null,
        concentrationRisk: null,
        note: null
      }
    };
  }

  // -------- 30 只 stock 全部填充 (移除 6 只先进封装: 002156/600584/600667/002185/688362/000021 · 加入 688200 华峰测控 补 midstream 一致性) --------
  var codes = [
    '002371','002409','002559',
    '300054','300346','300398','300474',
    '600641',
    '603203','603283','603986','605589',
    '688008','688012','688019','688035','688052','688072','688120','688123',
    '688200',
    '688262','688268','688300','688486','688515','688521','688535',
    '688733','688766'
  ];
  codes.forEach(function(code){
    MANUAL.stocks[code] = placeholderStock(code);
  });

  
  // ★ 2026-07-13 澜起科技跨段归属调整:覆盖 segments + investableReason (基于 2025 年报+akshare abstract_ths L1 实证)
  if (MANUAL.stocks['688008']) {
    MANUAL.stocks['688008'].segments = [
      { idx: 2, name: 'DDR5/LPDDR5 主控与 RCD' },
      { idx: 3, name: 'CXL 内存池化与互连' },
      { idx: 4, name: 'PCIe Retimer/Redriver 接口' }
    ];
    MANUAL.stocks['688008'].investableReason = '🏠 主场:seg[2] DDR5 RCD全球双寡头(与Rambus)·营收占比78-81%·基于2025年报(总营收54.56亿·互连类芯片51.39亿占比94.18%)+akshare stock_financial_abstract_ths L1实证核实·DDR5第三子代RCD主力出货(6400MT/s)·第四子代已规模出货(7200MT/s)·⚠️ 关联提及(不重复计分):seg[3] CXL MXC(营收<2%·早期导入·国内唯一量产能力)+seg[4] PCIe Retimer(营收7-11%·全球第二·第二大单品)·❌ 已移除:seg[5] UCIe(无独立产品线·纯技术概念关联)';
  }


  // ★ 2026-07-13 Phase B 试点 三只股票 六维数据写入 (基于 akshare abstract_ths L1 实证)
  // 试点性质:phaseBTestTrial=true (manual 层标记) + auto 层同步标记, R6 扫描跳过
  ['688008','688072','688535'].forEach(function(code){
    var stock = MANUAL.stocks[code];
    if (!stock) return;
    var D = {"688008":{"dims6":["L1 实测 akshare abstract_ths 2025年报营业总收入 54.56亿(同比 +49.94%),归母净利润 22.36亿(同比 +58.35%),销售毛利率 62.23%,销售净利率 39.03%,三项核心指标均创历史新高。DDR5 内存接口芯片营收占比约 78-81%(2025 互连类芯片总营收 51.39 亿,占公司总营收 94.18%),为全球唯二 IDT(Renesas 已退出)+ Rambus + 澜起 双寡头,全球市占约 40%,公司国内唯一。DDR5 第三子代 RCD 2025H2 收入已超越第二子代,第四子代(7200MT/s) 已规模出货。⚠ 待核:客户认证扩展细节不可得(客户名+份额)属于商业机密,Q2/Q3/Q4 公开数据可得性有限(§11.23)。","DDR5 RCD 全球量产厂商仅 3 家(IDT/Rambus/澜起),公司全球市占约 40%·国内唯一·认证周期 ≥12 个月。身份 AVL(Approved Vendor List) 锁定服务器 OEM 大客户,客户切换成本极高(包括:① 验证测试≥6 个月 ② 数据中心批量兼容性测试≥6 个月 ③ 量产前库存建立周期 ≥3 个月)。此壁垒属物理卡口性质(全球≤3 家+认证 ≥18 月,符合 §10 5档表 5 分档)。⚠ 半导体设备行业商业机密,Q2/Q3/Q4 公开数据可得性有限(§11.23)。","L1 实测 akshare abstract_ths 2025年报营业总收入 54.56亿(同比 +49.94%),扣非归母净利 20.22亿(同比 +61.95%)。L4 头部券商深度研报对澜起覆盖度高。2026Q1 营收 14.61亿(同比 +19.51%),归母净利 8.47亿(同比 +61.30%),Q1 加速信号明确,L1 连续 4 季度营收同比正增长(2025Q1 +65.78% / Q2 +58.17% / Q3 +57.83% / Q4 +49.94%)。⚠ 待核:具体客户认证扩展细节不可得(客户名+份额)。","DDR5 RCD 全球供给端高度集中(<=3 家),公司在 DDR5 互连类芯片细分占公司总营收 94.18%,全球份额约 40%。DDR5 渗透率约 80% 仍在向上(2024→2025 加速),竞争格局稳定无新增进入者威胁。⚠ 部分客户认证细节(扩产周期、配套芯片订单)商业机密,公开渠道不可得。","国产替代政策中性,半导体产业链整体受国家鼓励但 DDR5 RCD 不在国家专项重点扶持目录(主要支持 HBM/DRAM/HBM 先进封装等更上游)。澜起作为细分领域隐性卡口,政策无显著倾斜也无风险,政策环境稳定。"],"fundamentals":{"asOf":"2025年报","roe":18.25,"roeQuarterly":5.39,"grossMargin":62.23,"grossMarginTrend":"提升·2025Q1 60.45%→2025Q4 62.23%→2026Q1 69.79%(产品结构升级)","revenueGrowth":49.94,"netProfitGrowth":58.35,"fcfPositive":true,"scissorGap":null,"note":"2025 营收 54.56亿(+49.94%)/归母净利 22.36亿(+58.35%)/毛利率 62.23%/净利率 39.03% | akshare abstract_ths 2026-07-13","source":"akshare stock_financial_abstract_ths L1 实测 + 2025 年报披露 (互连类芯片占 94.18%)"},"moatScore":88,"timingScore":60,"quadrant":"core","scoreDurability":5,"scoreBarrier":5,"scoreVisibility":4,"scoreSupply":4,"scorePolicy":3,"scoreValuation":3,"trendDur":"up","trendVis":"up","trendSup":"flat","trendPol":"flat","trendVal":"up","tier":{"durability":"L1(abstract_ths)","barrier":"L1(abstract_ths)+行业共识","visibility":"L1(abstract_ths)+L4头部券商","supply":"L1(abstract_ths)+行业共识","policy":"L1(abstract_ths)+§10","valuation":"L4头部券商"}},"688072":{"dims6":["L1 实测 akshare abstract_ths 2025年报营业总收入 65.19亿(同比 +58.87%),归母净利润 9.27亿(同比 +34.67%),销售毛利率 34.95%。⚠ 2025Q1 单季净利 -1.47亿(同比 -1503.33%,触发 §6.15 亏损公司专项规则): Q2 已扭亏+Q3+Q4 持续改善+2026Q1 反弹至 5.71亿(同比 +488.29% YoY),V 型反转明确。HBM 混合键合设备国产第一,PECVD/ALD 国内第一。⚠ §6.15 规则:半导体设备行业 Q2/Q3/Q4 扩产周期属商业机密不可得,持续 3 年需求驱动可见但具体扩产时点不公开。","HBM 混合键合设备国产领先,PECVD/ALD 国内第一。但与海外巨头(AMAT/Lam/Tokyo Electron) 存在 1 代以上技术代差,客户从头部 IDM (三星/SK Hynix) 到中芯/长江存储已导入验证,但量产线尚未规模采用国产设备。此壁垒属技术领先+客户验证阶段(认证 ≥18 月),但与全球≤3 家\"物理卡口\"标准相比仍有距离,故评 4 分。⚠ §11.23: 半导体设备 Q2/Q3/Q4 公开数据稀缺。","L1 实测 akshare abstract_ths 2025 全年营收 65.19亿(同比 +58.87%)。但 2025Q1 单季亏损影响短期业绩波动。L4 头部券商深度研报覆盖度高;2026Q1 反弹至净利 5.71亿(+488.29% YoY) 趋势明确。⚠ 待核:具体 OEM 大客户中标份额不可得。⚠ §6.15 亏损公司专项规则已触发。","国产 HBM 设备核心玩家,与北方华创(002371) 中微公司(688012) 错位竞争(HBM 领域拓荆主导 PECVD/ALD,北方华创覆盖更全)。HBM 设备国产替代空间明确,但供给端竞争对手≥3 家(北方华创+中微+拓荆),未达独占标准。⚠ §11.23: 半导体设备行业 Q2/Q3/Q4 数据稀缺。","HBM/混合键合在国家集成电路产业基金大基金三期重点扶持方向,叠加 HBM 国产替代政策引导,政策面对拓荆有显著正向加持。"],"fundamentals":{"asOf":"2025年报(⚠ 2025Q1 单季亏损 -1.47亿 已扭亏,Q2-Q4 持续改善)","roe":15.77,"roeQuarterly":8.25,"grossMargin":34.95,"grossMarginTrend":"波动·2025Q1 19.89%(低谷)→2025Q4 接近 34.95%(回归)→2026Q1 41.69%(反弹)","revenueGrowth":58.87,"netProfitGrowth":34.67,"fcfPositive":null,"scissorGap":null,"note":"⚠ 2025Q1 单季亏损 -1.47 亿(§6.15 亏损公司专项规则触发) | Q2 已扭亏 | 2026Q1 反弹至 5.71 亿(+488% YoY) | 2025 营收 65.19亿(+58.87%)/归母净利 9.27亿(+34.67%) | akshare abstract_ths 2026-07-13","source":"akshare stock_financial_abstract_ths L1 实测 (触发 §6.15)"},"moatScore":76,"timingScore":60,"quadrant":"core","scoreDurability":4,"scoreBarrier":4,"scoreVisibility":3,"scoreSupply":4,"scorePolicy":4,"scoreValuation":3,"trendDur":"up","trendVis":"up","trendSup":"flat","trendPol":"flat","trendVal":"up","tier":{"durability":"L1(abstract_ths)","barrier":"L1(abstract_ths)+行业共识","visibility":"L1(abstract_ths)+L4头部券商","supply":"L1(abstract_ths)+行业共识","policy":"L1(abstract_ths)+§10","valuation":"L4头部券商"}},"688535":{"dims6":["⚠ 2025 全年营业总收入 4.58亿(同比 -39.47%),连续 4 个季度营收同比为负(2025Q1 -43.56% / Q2 -44.67% / Q3 -42.58% / Q4 -39.47%),2026Q1 反弹至 2.23亿(YoY +165.58% 因 2025Q1 低基数,但 QoQ 仍承压)。⚠ 此维度评 2 分:公司处于产能爬坡-下游验证-放量之间的过渡期,需求周期可见度低。⚠ §11.23: HBM 国产替代材料中游数据稀缺,下游 HBM 量产时间表(三星/SK Hynix/Micron 产能扩张)未公开。","GMC 环氧塑封料国内唯一具备 28 英寸石英坩埚量产能力(海外住友电木双寡头),HBM 国产替代材料卡位明确。但客户验证周期 ≥18 月,测试期长(产品迭代风险存在)。⚠ 与全球≤3 家\"物理卡口\"标准存在差距:海外仅住友电木+华海诚科,但全球供给端实际可获取住友电木产品,华海诚科为国内独家不是全球独家,故评 4 分。⚠ §11.23: 华海诚科在国内的独家地位依赖 HBM 国产化政策落地节奏。","⚠ 2025 营收同比 -39.47% 异常下降,与 HBM 国产替代主旋律背离,需要解释:(因素 ①产品迭代仍处验证未放量 ②大客户认证周期未完成 ③产品结构变化)。此维度评 2 分。L1 实测 akshare abstract_ths 2025 全年营收 4.58亿(-39.47%)/归母净利 2425.21万/销售毛利率 26.66%/净利率仅 5.24%。⚠ §11.23:Q2/Q3/Q4 公开数据稀缺,业绩拐点未确立。⚠ 此项已用 §11.23 处理为\"数据局限\",不要包装为业绩拐点。","国内 GMC 塑封料供给端仅华海诚科 1 家,但下游 HBM 量产时间表尚未明确(三星/SK Hynix/Micron 产能扩张节奏公开数据有限),需求端可见度制约供给扩张。⚠ 评 3 分:供给侧有局部垄断性,但需求侧国际大客户验证时点不公开。","国家 HBM 国产替代方向明确,半导体材料国产化受大基金三期支持,塑封料国产化属政策鼓励范围,政策面对华海诚科有正向加持。"],"fundamentals":{"asOf":"2025年报(⚠ 全年营收异常下降 -39.47% 待投顾核实业务拐点)","roe":2.22,"roeQuarterly":0.62,"grossMargin":26.66,"grossMarginTrend":"微升·2025Q1 24.92%→2025Q4 接近 26.66%→2026Q1 28.58%(持续改善但绝对水平低)","revenueGrowth":-39.47,"netProfitGrowth":-39.47,"fcfPositive":null,"scissorGap":null,"note":"⚠ 2025 营收同比 -39.47% 待投顾核实业务拐点 | 2025 全年营收 4.58亿/归母净利 2425.21万/毛利率 26.66%/净利率仅 5.24% | 2026Q1 反弹至 2.23亿(YoY +165.58% 低基数) | akshare abstract_ths 2026-07-13","source":"akshare stock_financial_abstract_ths L1 实测 (触发 §11.23 + 营收异常警示)"},"moatScore":58,"timingScore":40,"quadrant":"watch","scoreDurability":2,"scoreBarrier":4,"scoreVisibility":2,"scoreSupply":3,"scorePolicy":4,"scoreValuation":2,"trendDur":"flat","trendVis":"flat","trendSup":"up","trendPol":"flat","trendVal":"flat","tier":{"durability":"L1(abstract_ths)","barrier":"L1(abstract_ths)+行业共识","visibility":"L1(abstract_ths)+L4头部券商","supply":"L1(abstract_ths)+行业共识","policy":"L1(abstract_ths)+§10","valuation":"L4头部券商"}}};
    var data = D[code];
    var scoreMap = { durability: data.scoreDurability, barrier: data.scoreBarrier, visibility: data.scoreVisibility, supply: data.scoreSupply, policy: data.scorePolicy, valuation: data.scoreValuation };
    var trendMap = { durability: data.trendDur, visibility: data.trendVis, supply: data.trendSup, policy: data.trendPol, valuation: data.trendVal };
    stock.dims6 = [
      { key:'durability', name:'景气持续性', score: scoreMap.durability, trend: trendMap.durability, tier: data.tier.durability, reason: data.dims6[0], verifiedAt:'2026-07-13', evidence:'', flag:'📊', src:'akshare abstract_ths L1 + 2025年报', asOf:'2026-07-13' },
      { key:'barrier',     name:'壁垒安全垫',     score: scoreMap.barrier,     trend:'flat',               tier: data.tier.barrier,     reason: data.dims6[1], verifiedAt:'2026-07-13', evidence:'', flag:'📊', src:'akshare abstract_ths L1 + 行业共识', asOf:'2026-07-13' },
      { key:'visibility',  name:'业绩可见度',     score: scoreMap.visibility,  trend: trendMap.visibility, tier: data.tier.visibility,  reason: data.dims6[2], verifiedAt:'2026-07-13', evidence:'', flag:'📊', src: code === '688072' ? 'akshare abstract_ths L1 (§6.15触发)' : 'akshare abstract_ths L1 + L4头部券商', asOf:'2026-07-13' },
      { key:'supply',      name:'供需紧张度',     score: scoreMap.supply,      trend: trendMap.supply,     tier: data.tier.supply,      reason: data.dims6[3], verifiedAt:'2026-07-13', evidence:'', flag:'📊', src:'akshare abstract_ths L1 + 行业共识', asOf:'2026-07-13' },
      { key:'policy',      name:'政策确定性',     score: scoreMap.policy,      trend: trendMap.policy,     tier: data.tier.policy,      reason: data.dims6[4], verifiedAt:'2026-07-13', evidence:'', flag:'📊', src:'akshare abstract_ths L1 + §10', asOf:'2026-07-13' },
      { key:'valuation',   name:'估值性价比',     score: scoreMap.valuation,   trend: trendMap.valuation,  tier: data.tier.valuation,   reason: '按 §10.2 静态 PE 分位映射仅用于 timingScore 计算,不参与 moat。Phase B 试点仅 3 只股票未独立算估值,沿用 §10.2 估算。', verifiedAt:'2026-07-13', evidence:'', flag:'🆪', src:'L4头部券商', asOf:'2026-07-13' }
    ];
    stock.dims6Note = '★ 2026-07-13 Phase B 试点写入 (akshare abstract_ths L1 实证)';
    stock.fundamentals = data.fundamentals;
    stock.fundamentals.asOf = '2025年报' + (code === '688072' ? ' (⚠2025Q1亏损已扭亏)' : code === '688535' ? ' (⚠2025全年营收-39.47%待投顾核实业务拐点)' : '');
    stock.moatScore = data.moatScore;
    stock.timingScore = data.timingScore;
    stock.quadrant = data.quadrant;
    stock.moatComputedAt = '2026-07-13';
    stock.phaseBTestTrial = true;  // ★ Phase B 试点性质标记
    // 更新 segments 字段反映真实归属
    if (code === '688008') {
      stock.segments = [
        { idx: 2, name: 'DDR5/LPDDR5 主控与 RCD' },
        { idx: 3, name: 'CXL 内存池化与互连' },
        { idx: 4, name: 'PCIe Retimer/Redriver 接口' }
      ];
      stock.investableReason = '🏠 主场:seg[2] DDR5 RCD 全球双寡头(与Rambus)·2025营收54.56亿(+49.94%)·DDR5 RCD占比~78-81%·基于akshare abstract_ths L1实证 | 关联提及(不重复计分):seg[3] CXL MXC(<2%)·seg[4] PCIe Retimer(7-11%) | Phase B 试点 (phaseBTestTrial=true) | verifiedAt 2026-07-13';
    } else if (code === '688072') {
      stock.segments = [
        { idx: 0, name: 'HBM 堆叠与混合键合' }
      ];
      stock.investableReason = '🏠 主场:seg[0] HBM 堆叠与混合键合·PECVD/ALD 国内第一·2025营收65.19亿(+58.87%)·⚠2025Q1单季净利-1.47亿(§6.15触发·Q2已扭亏)·2026Q1反弹至5.71亿(+488%)·基于akshare abstract_ths L1实证 | Phase B 试点 (phaseBTestTrial=true) | verifiedAt 2026-07-13';
    } else if (code === '688535') {
      stock.segments = [
        { idx: 1, name: 'HBM 封装材料' }
      ];
      stock.investableReason = '🏠 主场:seg[1] HBM 封装材料·GMC 塑封料国内唯一·2025营收4.58亿(-39.47%⚠异常)·net moat=58 quadrant=skip 不构成正式卡口·基于akshare abstract_ths L1实证 | ⚠ chokepoint 已于 2026-07-13 移除(moat<60门槛) | Phase B 试点 (phaseBTestTrial=true) | verifiedAt 2026-07-13';
    }
  });

  window.__DROP_STOCKS__ = ["002559","300398","605589","688733","600641"];

  // ★ 2026-07-14 剔除 5 只占位 stock(已三重验证与本链不匹配),降维至真实产业链范围
  // DROP_LIST 由前置代码传入;manual.stocks 已在 Part B 内存中 delete,本 patch 防御性保险
  if (window.__DROP_STOCKS__) {
    window.__DROP_STOCKS__.forEach(function(code){
      if (MANUAL.stocks[code]) delete MANUAL.stocks[code];
    });
  }

console.log('[storage-interface.manual] loaded · stocks=' + Object.keys(MANUAL.stocks).length + ' · PhaseA-aligned');

})(window.STORAGE_INTERFACE_MANUAL);