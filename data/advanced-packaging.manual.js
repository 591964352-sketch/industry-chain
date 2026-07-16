window.ADVANCED_PACKAGING_MANUAL = window.ADVANCED_PACKAGING_MANUAL || {};
(function(MAN){
  MAN._meta = {
    chainId: "advanced-packaging",
    description: "先进封装产业链 manual 层 · 个股六维景气打分 + 基本面 + 风险指标",
    created: "2026-07-16",
    phase: "Phase A 骨架 · dims6 全为占位符 · Phase B 补真实数据",
    dataVersion: "advanced-packaging.manual@2026-07-16.PhaseA-skeleton",
    stockCount: 10
  };

  // ====== 10 只新标的（Phase B 补 dims6）======
  MAN.stocks = {};

  // --- Seg[0] OSAT 综合封测龙头 ---
  MAN.stocks["600584"] = {
    code: "600584", name: "长电科技",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:4,trend:"flat",tier:"estimate",reason:"国内封测龙头·全球第三·XDFOI Chiplet平台·4nm量产·客户覆盖英伟达/华为昇腾/SK海力士(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  MAN.stocks["002156"] = {
    code: "002156", name: "通富微电",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:4,trend:"flat",tier:"estimate",reason:"深度绑定AMD·全球70%高端CPU/GPU封测独家·2026Q1净利+224%·先进封装收入占比≈70%(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  MAN.stocks["002185"] = {
    code: "002185", name: "华天科技",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:3,trend:"flat",tier:"estimate",reason:"eSiFO扇出/TSV/2.5D HP工艺·2026Q1净利+568%·南京基地先进封装产线(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  // --- Seg[1] 细分领域先进封装 ---
  MAN.stocks["688362"] = {
    code: "688362", name: "甬矽电子",
    dims6: [
      {key:"durability",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补·注意:体量和客户验证阶段显著早于三巨头)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:2,trend:"flat",tier:"estimate",reason:"高弹性先进封装新星·124亿投资2.5D堆叠·CoWoS-L产能爬坡·体量显著小于三巨头(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  MAN.stocks["603005"] = {
    code: "603005", name: "晶方科技",
    dims6: [
      {key:"durability",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补·注意:非AI芯片赛道·聚焦车载+安防CIS)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:2,trend:"flat",tier:"estimate",reason:"车载CIS晶圆级封装龙头·TSV/异质集成/3D堆叠·非AI芯片赛道(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  // --- Seg[2] 封装专用设备 ---
  MAN.stocks["600520"] = {
    code: "600520", name: "文一科技",
    dims6: [
      {key:"durability",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补·⚠️ 强制核实项:样机已交付华为-盛合晶微=验证阶段非批量供货·durability不能因'稀缺标的'概念性描述偏高·详见Phase B打分前核查清单)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补·⚠️ 必须严格核查L1公告是否有客户订单金额/批量供货合同·无→诚实标注'商业化程度有限·样机验证阶段')",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:2,trend:"flat",tier:"estimate",reason:"12寸晶圆级塑封设备·样机交付华为-盛合晶微·⚠️ 验证阶段·'稀缺'≠'已建立的竞争壁垒'(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"},
    _phaseB_checklist: "⚠️ Phase B 打分前强制核实:(1)L1公告是否有客户订单金额/批量供货合同?(2)塑封设备营收贡献占公司总营收比例?(3)盛合晶微之外是否有第二家验证客户?(4)与海外竞品(Towa/APIC Yamada)的技术差距?参照长光华芯'CW 100mW仍在验证中'处理方式——durability/visibility 严格按实际商业化进展评定,不得因'稀缺标的'概念性描述偏高。"
  };

  // --- Seg[3] 封装材料 ---
  MAN.stocks["300398"] = {
    code: "300398", name: "飞凯材料",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:3,trend:"flat",tier:"estimate",reason:"临时键合材料国产龙头·全球BGA/CSP锡球领导厂商·已实现小批量销售(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  MAN.stocks["688720"] = {
    code: "688720", name: "艾森股份",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:3,trend:"flat",tier:"estimate",reason:"先进封装负性光刻胶+PSPI量产·机构调研330+次(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  MAN.stocks["603773"] = {
    code: "603773", name: "沃格光电",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:3,trend:"flat",tier:"estimate",reason:"国内唯一打通TGV激光打孔-填铜-RDL布线全流程量产(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

  MAN.stocks["300666"] = {
    code: "300666", name: "江丰电子",
    dims6: [
      {key:"durability",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"visibility",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"policy",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"supply",score:3,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"valuation",score:2,trend:"flat",tier:"estimate",reason:"(Phase B 补)",evidence:"",flag:"",src:"",weight:1},
      {key:"barrier",score:3,trend:"flat",tier:"estimate",reason:"超高纯溅射靶材·TSV薄膜沉积刚需耗材(Phase B 补·barrier预估值)",evidence:"",flag:"",src:"",weight:1}
    ],
    fundamentals: null,
    riskMetrics: {status:"deferred"}
  };

})(window.ADVANCED_PACKAGING_MANUAL);
