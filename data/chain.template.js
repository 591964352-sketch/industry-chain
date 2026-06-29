// chain.template.js —— 通用产业链梳理模板 v1.0
// 由 pcb.manual.js 抽象而来（保持同构·可直接 <script src> 加载·脚本只读不写本文件）
// 设计目标：换链 = 只改「必改项清单」里的参数，结构/校验/风控原样复用。
//
// ★ 本模板相对 PCB_MANUAL 已在「结构层」修复三处硬伤，避免缺陷随模板扩散：
//   硬伤1 结构漏卡口  → 新增 chainCompleteness 环节审计块（强制勾选「覆盖/有意排除」）
//   硬伤2 打分全主观  → dims6 每维强制带 tier，并新增 dimsDataRatio 自检（estimate 占比过高告警）
//   硬伤3 级别站不住  → chokePoints 强制 chokepointType（physical/alpha-competitive）+ 强制 falsifySignal
//   附带           → _meta 声明数 vs 实际数自动对账；riskMetrics 用 status 显式标注（杜绝静默 null）；
//                    investable 必须带 reason；市占类字段必须带 caliber（口径），防「55% vs 30%」误读。
//
// ══════════════════════════════════════════════════════════════════════════════
// ========== 0. 用法 & 「必改项清单」（克隆新链时，只动这 7 项）==========
// ══════════════════════════════════════════════════════════════════════════════
//  ① CHAIN_KEY        —— 命名空间，如 'HSI'（高速互连）。一处改，全局生效。
//  ② chainCompleteness.archetypes —— 本链的「应有环节」清单 + 每个环节 covered/excluded 判定。
//                       （这是防「漏掉钻针级真卡口」的闸门，克隆后必须逐条重填）
//  ③ stocks{}         —— 个股单点真理（code 为键）。fundamentals 落库前用 akshare 三表复核。
//  ④ chokePoints{}    —— 卡口判定。每只必须给 chokepointType + strength + falsifySignal。
//  ⑤ referenceChokepoints[] —— 海外卡脖子主体 → 国产替代 code 映射（沿用 PCB 风格）。
//  ⑥ macro.dims       —— 景气维度必须换成本链的（PCB=铜箔/玻纤价；HSI=DDR5渗透/HBM占比/服务器出货/标准代际）。
//  ⑦ decisionFramework—— 链无关，通常原样复用；仅当本链波动特征不同才微调阈值。
//
//  落库后跑一次 window[CHAIN_KEY+'_MANUAL'].validate() —— 控制台会报：数目对账、dims 数据占比、
//  缺 falsifySignal 的卡口、空 riskMetrics、无 reason 的 investable。全绿再上线。
//
// ══════════════════════════════════════════════════════════════════════════════
// ========== 1. 字段规范（SCHEMA SPEC，注释即文档）==========
// ══════════════════════════════════════════════════════════════════════════════
//  stock = {
//    code, name, region:'国内'|'海外',
//    rank:Number,                       // 链内排序（建议由 dims6 加权得出，别手拍）
//    barrier:'极高'|'高'|'中'|'低',
//    tier:'primary'|'secondary'|'reference',
//    position:String,                   // 一句话卡位（含市占必带口径，见 caliber）
//    caliber:String|null,               // ★新增：市占/份额口径，如 '全球石英布口径' vs '国内口径'
//    investable:Boolean,
//    investableReason:String,           // ★新增：可投/不可投的理由（禁止全 true 无差别）
//    dims6:[{key, score:1-5, trend:'up'|'flat'|'down', tier:'primary'|'broker'|'estimate', evidence:String|null}],
//                                       //   六维固定：durability/visibility/policy/supply/valuation/barrier
//                                       //   ★tier 必填：estimate=拍的，broker=券商，primary=三表/季报
//    fundamentals:{ asOf, roe, roeQuarterly, grossMargin, grossMarginTrend,
//                   revenueGrowth, netProfitGrowth, fcfPositive, scissorGap:'ok'|'warn', note, source },
//    riskMetrics:{ status:'filled'|'deferred',   // ★新增：deferred = 显式承认未填，前端不当真
//                  stopLoss, stopLossReason, maxDrawdown5y, reentryCondition, concentrationRisk, note },
//    segments:[{idx, name}],            // 该股归属环节（可多段，靠 code 单点真理去重）
//  }
//
//  chokePoint = {
//    code, name, segment,
//    chokepointType:'physical'|'alpha-competitive',  // ★关键新增：
//        //   physical          = 物理卡口（无替代/设备锁死/独供）→ 可给 ★★★
//        //   alpha-competitive = 有α但国产竞争充分（如 HVLP4 加工端）→ 上限 ★★☆，必须写 lowScoreNote
//    strength:'★★★'|'★★☆'|'★☆☆',
//    tags:[String],                     // 4 个量化标签（份额/缺口/认证/业绩弹性）
//    logic:String,                      // 150+ 字逻辑
//    verification:{ logic, sources:[{tier:'primary'|'broker', desc, src}], falsifySignal:String }, // falsifySignal 必填
//    lowScoreNote:String|null,          // 非 ★★★ 时必填：为什么降级
//  }
//
// ══════════════════════════════════════════════════════════════════════════════
// ========== 2. 模板本体 ==========
// ══════════════════════════════════════════════════════════════════════════════

// ① 必改：命名空间
var CHAIN_KEY = 'TEMPLATE';   // 克隆时改成 'HSI' / 'OPTICAL' / 'HBM' 等
var MANUAL_VAR = CHAIN_KEY + '_MANUAL';

window[MANUAL_VAR] = window[MANUAL_VAR] || {};
(function (MANUAL) {

  // ---------- _meta：自检与对账（修硬伤3 附带项：声明数 vs 实际数）----------
  MANUAL._meta = {
    chainKey: CHAIN_KEY,
    chainName: '【改我】产业链中文名',
    asOf: '2026-06',
    declaredStockCount: 0,     // ★克隆后填你以为有几只；validate() 会和实际 unique code 对账
    declaredChokeCount: 0,
    maintainer: 'manual（人工季度更新·硬数据从 akshare/巨潮核实）',
    scopeNote: '口径：国内 A 股为主 + 海外卡脖子主体进 referenceChokepoints（不进估值管线）',
  };

  // ---------- ② 必改：chainCompleteness —— 环节完整性审计（修硬伤1）----------
  // 用法：列出「这条链按产业共识应有的环节原型」，逐个判定 covered / excluded，
  //       excluded 必须写 reason。PCB 当初就是漏了「高端钻针」这个 physical 卡口才扣分。
  // archetype 通用清单（AI 硬件链可直接套，按链增删）：
  //   原材料 / 关键材料 / 核心器件 / 卡口耗材 / 专用设备 / 制造中游 / 配套芯片 / 下游应用
  MANUAL.chainCompleteness = {
    archetypes: [
      { name: '【示例】上游原材料', covered: false, note: '克隆后填：覆盖了哪些 code，或为何排除' },
      { name: '【示例】关键卡口材料/器件', covered: false, note: '' },
      { name: '【示例】卡口耗材（易漏！如 PCB 的钻针）', covered: false, note: '⚠️ 重点核对：本链有没有「钻针式」的低调真卡口' },
      { name: '【示例】专用设备', covered: false, note: '' },
      { name: '【示例】制造/封装中游', covered: false, note: '' },
      { name: '【示例】下游应用', covered: false, excluded: false, note: '' },
    ],
    auditedBy: 'manual',
    auditNote: '每条 archetype 必须 covered=true 或 excluded=true(+reason)，不允许留空当默认覆盖。',
  };

  // ---------- ③ 必改：stocks —— 个股单点真理 ----------
  MANUAL.stocks = {
    // ===== 复制此模板块新增个股 =====
    '000000': {
      code: '000000', name: '【改我】', region: '国内',
      rank: 0, barrier: '高', tier: 'primary',
      position: '一句话卡位（含市占必写 caliber）',
      caliber: null,                       // 例：'全球口径' / '国内口径'（防口径误读）
      investable: true,
      investableReason: '【必填】为什么可投/不可投（禁止无差别 true）',
      dims6: [
        { key: 'durability', score: 3, trend: 'flat', tier: 'estimate', evidence: null },
        { key: 'visibility', score: 3, trend: 'flat', tier: 'estimate', evidence: null },
        { key: 'policy',     score: 3, trend: 'flat', tier: 'estimate', evidence: null },
        { key: 'supply',     score: 3, trend: 'flat', tier: 'estimate', evidence: null },
        { key: 'valuation',  score: 3, trend: 'flat', tier: 'estimate', evidence: null },
        { key: 'barrier',    score: 3, trend: 'flat', tier: 'estimate', evidence: null },
      ],
      fundamentals: {
        asOf: '2026-Q1', roe: null, roeQuarterly: null, grossMargin: null, grossMarginTrend: 'flat',
        revenueGrowth: null, netProfitGrowth: null, fcfPositive: null, scissorGap: 'ok',
        note: '落库前用 akshare 三表复核', source: 'akshare(三表)',
      },
      riskMetrics: {
        status: 'deferred',               // ★填了就改 'filled'；deferred 时前端按「未量化」处理
        stopLoss: null, stopLossReason: null, maxDrawdown5y: null,
        reentryCondition: null, concentrationRisk: 'low', note: null,
      },
      segments: [{ idx: 0, name: '【改我】环节名' }],
    },
  };

  // ---------- ④ 必改：chokePoints —— 卡口判定（修硬伤3：强制 type + falsifySignal）----------
  MANUAL.chokePoints = {
    '000000': {
      code: '000000', name: '【改我】', segment: '【改我】环节',
      chokepointType: 'physical',         // physical 才可 ★★★；alpha-competitive 上限 ★★☆
      strength: '★★★',
      tags: ['份额X%', '缺口X%', '认证X', '业绩+X%'],
      logic: '150+ 字：份额/缺口/认证/扩产周期/海外垄断主体/本股位置/是否物理卡口。',
      verification: {
        logic: '同上',
        sources: [
          { tier: 'primary', desc: '公司 2026Qx 季报（巨潮 cninfo）', src: '巨潮 cninfo' },
          { tier: 'broker',  desc: '券商深度测算', src: '券商 2026-xx' },
        ],
        falsifySignal: '【必填】什么信号出现 → 此卡口降级（如：竞品量产/海外扩产/技术代际替代）',
      },
      lowScoreNote: null,                 // 非 ★★★ 必填降级理由（PCB 铜冠 HVLP4 教训：加工端竞争充分→★★☆）
    },
  };

  // ---------- ⑤ 必改：referenceChokepoints —— 海外卡脖子主体 → 国产替代映射 ----------
  MANUAL.referenceChokepoints = [
    { name: '【海外主体】', region: '日本/美国', barrier: '【卡的环节】', replacementCode: '000000' },
  ];

  // ---------- prosperity（可后填）----------
  MANUAL.prosperity = { override: null };

  // ---------- ⑥ 必改：macro —— 景气仪表盘（维度必须换成本链的）----------
  MANUAL.macro = {
    asOf: '2026-06', updatedBy: 'manual',
    dims: {
      // PCB 用：copperFoilPrice / glassFiberPrice / aiServerDemand / autoElecDemand / pcbUtilRate
      // 换链改这里。每维 3 字段：trend / note / impact(positive|neutral|negative)
      dim1: { trend: 'stable', note: '【改我】本链景气维度1', impact: 'neutral' },
    },
    summary: '【改我】一句话景气总结',
  };

  // ---------- 全局市场风险档位（链无关·原样复用）----------
  MANUAL.marketRisk = 'normal';           // normal / caution(阈值+10pp,降一档) / extreme(禁触发)

  // ---------- ⑦ decisionFramework —— 风控（链无关·通常原样复用）----------
  MANUAL.decisionFramework = {
    asOf: '2026-06',
    stopLossRules: {
      tier1: { threshold: '单只亏损超15%', action: '减仓20%', note: '观察逻辑是否破坏' },
      tier2: { threshold: '单只亏损超25%', action: '再减仓30%', note: '重评持仓逻辑' },
      tier3: { threshold: '逻辑完全破坏（非单纯价格）', action: '清仓', note: '核心逻辑不成立才清' },
    },
    dimensions: {
      fundamental: { weight: 35, desc: '基本面·毛利趋势·营收净利增速' },
      valuation:   { weight: 25, desc: 'PE 分位·距高点·相对同行' },
      industry:    { weight: 20, desc: '景气度·上游原料价·产能利用率' },
      sentiment:   { weight: 10, desc: '资金流向·北向' },
      technical:   { weight: 10, desc: '支撑位·均线·量' },
    },
    positionRules: {
      maxSinglePosition: 35, minCash: 5,
      addPositionCondition: '信号C触发+景气正面+估值合理',
      reducePositionCondition: 'PE极端高位+景气转弱+技术走坏 任意两项',
    },
  };

  // ---------- 注入 STOCK_REGISTRY（append-only·不覆盖既有链）----------
  if (typeof window !== 'undefined') {
    if (!window.STOCK_REGISTRY) window.STOCK_REGISTRY = {};
    Object.keys(MANUAL.stocks).forEach(function (code) {
      window.STOCK_REGISTRY[code] = MANUAL.stocks[code];
    });
  }

  // ---------- validate()：上线前自检（直接修三处硬伤的检查器）----------
  MANUAL.validate = function () {
    var out = [];
    // 对账：声明数 vs 实际 unique
    var actualStocks = Object.keys(MANUAL.stocks).length;
    if (MANUAL._meta.declaredStockCount !== actualStocks)
      out.push('❌ 个股对账不符：声明 ' + MANUAL._meta.declaredStockCount + ' / 实际 ' + actualStocks);
    var actualChoke = Object.keys(MANUAL.chokePoints).length;
    if (MANUAL._meta.declaredChokeCount !== actualChoke)
      out.push('❌ 卡口对账不符：声明 ' + MANUAL._meta.declaredChokeCount + ' / 实际 ' + actualChoke);
    // dims 数据占比（硬伤2）
    var tot = 0, est = 0;
    Object.values(MANUAL.stocks).forEach(function (s) {
      (s.dims6 || []).forEach(function (d) { tot++; if (d.tier === 'estimate') est++; });
      if (s.investable && !s.investableReason) out.push('⚠️ ' + s.code + ' investable 缺 reason');
      if (s.riskMetrics && s.riskMetrics.status === 'filled' && s.riskMetrics.stopLoss == null)
        out.push('⚠️ ' + s.code + ' riskMetrics 标 filled 但 stopLoss 空');
    });
    if (tot && est / tot > 0.8) out.push('⚠️ dims6 中 estimate 占比 ' + Math.round(est / tot * 100) + '%（>80%：打分几乎全主观，慎用 rank 排序）');
    // 卡口闸门（硬伤3）
    Object.values(MANUAL.chokePoints).forEach(function (c) {
      if (!c.chokepointType) out.push('❌ ' + c.code + ' 缺 chokepointType');
      if (c.chokepointType === 'alpha-competitive' && c.strength === '★★★')
        out.push('❌ ' + c.code + ' 竞争充分却给 ★★★（PCB 铜冠式错误）');
      if (c.strength !== '★★★' && !c.lowScoreNote) out.push('❌ ' + c.code + ' 非★★★ 缺 lowScoreNote');
      if (!c.verification || !c.verification.falsifySignal) out.push('❌ ' + c.code + ' 缺 falsifySignal');
    });
    // 完整性审计（硬伤1）
    (MANUAL.chainCompleteness.archetypes || []).forEach(function (a) {
      if (!a.covered && !a.excluded) out.push('⚠️ 环节「' + a.name + '」未判定 covered/excluded（可能漏卡口）');
    });
    console.log(out.length ? out.join('\n') : '✅ ' + CHAIN_KEY + ' 全部通过');
    return out;
  };

})(window[MANUAL_VAR]);


// ══════════════════════════════════════════════════════════════════════════════
// ========== 3. 示例：高速互连芯片链(HSI) 首个卡口「澜起科技」——演示怎么克隆 ==========
//   仅示意填法（数字为公开口径·落库前请用 akshare 三表复核后改 tier=primary）
//   要点：内存接口芯片 = 互连/接口芯片，不归存储链；HSI 同时装 RCD/DB + PCIe Retimer/Switch + CXL
// ══════════════════════════════════════════════════════════════════════════════
/*
window.HSI_MANUAL = window.HSI_MANUAL || {};
(function (MANUAL) {
  MANUAL._meta = { chainKey:'HSI', chainName:'高速互连芯片', asOf:'2026-06',
    declaredStockCount:1, declaredChokeCount:1, maintainer:'manual',
    scopeNote:'A股为主 + 博通(PCIe Switch)/瑞萨/Rambus 进 referenceChokepoints' };

  MANUAL.chainCompleteness = { archetypes:[
    { name:'内存接口芯片 RCD/DB/MRCD/MDB', covered:true,  note:'澜起 688008 龙头' },
    { name:'内存模组配套芯片 PMIC/SPD/TS', covered:true,  note:'澜起覆盖（亚洲唯一整体方案）' },
    { name:'PCIe Retimer',               covered:false, note:'澜起全球第二·待补' },
    { name:'PCIe Switch',                covered:false, excluded:false,
      note:'⚠️下一个更硬卡口：博通基本垄断·国产化≈0·重点盯国产突破' },
    { name:'CXL MXC 内存扩展',           covered:false, note:'澜起全球先行·待补' },
  ], auditedBy:'manual' };

  MANUAL.stocks = {
    '688008': { code:'688008', name:'澜起科技', region:'国内',
      rank:1, barrier:'极高', tier:'primary',
      position:'全球内存接口芯片龙头·DDR5 RCD/MDB/CKD 国际标准牵头者',
      caliber:'RCD 全球口径约47% / 内存互连全球口径36.8%(2024 F&S)',  // ←口径写清，防误读
      investable:true,
      investableReason:'全球3家寡头·标准话语权·60%+毛利·运力新品(MRCD/Retimer/CXL)放量第二曲线',
      dims6:[
        { key:'durability', score:5, trend:'up',   tier:'broker',   evidence:'DDR5迭代+标准制定权' },
        { key:'visibility', score:5, trend:'up',   tier:'broker',   evidence:'26Q1新品+93.8%' },
        { key:'policy',     score:4, trend:'up',   tier:'estimate', evidence:'国产替代+长鑫配套' },
        { key:'supply',     score:4, trend:'flat', tier:'estimate', evidence:'Fabless·绑三星Fab' },
        { key:'valuation',  score:2, trend:'down', tier:'estimate', evidence:'高估值·需盯PE分位' },
        { key:'barrier',    score:5, trend:'flat', tier:'broker',   evidence:'全球仅3家' },
      ],
      fundamentals:{ asOf:'2026-Q1', roe:null, roeQuarterly:null, grossMargin:65, grossMarginTrend:'up',
        revenueGrowth:19.51, netProfitGrowth:61.30, fcfPositive:null, scissorGap:'ok',
        note:'25年归母22.36亿+58.35%·26Q1营收14.61亿+19.51%/归母8.47亿+61.30%·互连类毛利~65%（公开口径·待三表复核）',
        source:'公司年报/季报(公开)→落库改 akshare 三表' },
      riskMetrics:{ status:'deferred', stopLoss:null, stopLossReason:null, maxDrawdown5y:null,
        reentryCondition:null, concentrationRisk:'low', note:'高估值标的·建议补 PE 分位止损' },
      segments:[{ idx:0, name:'内存接口芯片' }],
    },
  };

  MANUAL.chokePoints = {
    '688008': { code:'688008', name:'澜起科技', segment:'内存接口芯片 RCD/DB',
      chokepointType:'physical',     // 全球3家+标准话语权 → 真物理/生态卡口
      strength:'★★★',
      tags:['全球3家寡头','RCD约47%居首','毛利~60%','标准牵头'],
      logic:'全球内存接口芯片仅澜起/瑞萨/Rambus 三家·澜起 RCD 约47%居首·牵头 DDR5 RCD/MDB/CKD 国际标准·' +
            '注意：AI服务器用 HBM 不走传统 RCD，AI弹性来自运力新品(MRCD/MDB/PCIe Retimer/CXL MXC)·' +
            '26Q1 四款新品收入同比+93.8% 占互连类19%·下一更硬卡口=PCIe Switch(博通垄断·国产≈0)。',
      verification:{ logic:'同上',
        sources:[
          { tier:'primary', desc:'澜起 2025年报/2026Q1季报', src:'公司公告' },
          { tier:'broker',  desc:'东海/开源 互连芯片测算', src:'券商 2026' },
        ],
        falsifySignal:'瑞萨/Rambus 抢 DDR5 子代份额 / 国内竞品 RCD 量产 / HBM 进一步挤压 RDIMM 用量 → 降级',
      },
      lowScoreNote:null,
    },
  };

  MANUAL.referenceChokepoints = [
    { name:'博通 Broadcom', region:'美国', barrier:'PCIe Switch', replacementCode:'—' },
    { name:'瑞萨 Renesas',  region:'日本', barrier:'RCD/PMIC',    replacementCode:'688008' },
    { name:'Rambus',        region:'美国', barrier:'内存接口IP',  replacementCode:'688008' },
  ];

  MANUAL.prosperity = { override:null };
  MANUAL.macro = { asOf:'2026-06', updatedBy:'manual', dims:{
    ddr5Penetration:{ trend:'rising',  note:'DDR5渗透率提升·接口芯片量价齐升', impact:'positive' },
    hbmShare:{        trend:'rising',  note:'HBM占比升·挤压传统RCD但利好运力新品', impact:'neutral' },
    serverShipment:{  trend:'strong',  note:'AI/通用服务器出货景气', impact:'positive' },
    standardGen:{     trend:'rising',  note:'DDR5子代迭代+MRDIMM代际跨越', impact:'positive' },
  }, summary:'DDR5迭代+运力新品放量双驱动·景气强·盯HBM对RDIMM的替代' };
  MANUAL.marketRisk = 'normal';
  // decisionFramework 原样复用模板那份

  if (typeof window!=='undefined'){ if(!window.STOCK_REGISTRY) window.STOCK_REGISTRY={};
    Object.keys(MANUAL.stocks).forEach(function(c){ window.STOCK_REGISTRY[c]=MANUAL.stocks[c]; }); }
})(window.HSI_MANUAL);
*/
