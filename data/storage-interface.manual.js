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

  console.log('[storage-interface.manual] loaded · stocks=' + Object.keys(MANUAL.stocks).length + ' · PhaseA-aligned');

})(window.STORAGE_INTERFACE_MANUAL);