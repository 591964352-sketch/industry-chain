window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['autonomous-driving'] = {
  "id": "autonomous-driving",
  "name": "智能驾驶",
  "icon": "🚗",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "智能驾驶 = 给汽车装上\"眼睛+大脑+小脑\"——从L2辅助驾驶到L4无人驾驶，是一场汽车界的\"iPhone时刻\"",
    "paragraphs": [
      "2025年L2辅助驾驶渗透率已达62.6%，2026年<strong>L3+渗透率预计从个位数跃升至20-25%</strong>——意味着400-500万辆新车将自带L3硬件。这不是\"未来概念\"，而是正在发生的<strong>千万级量产</strong>。产业链从感知（激光雷达/摄像头/毫米波）→决策（智驾芯片/域控制器）→执行（线控底盘），三条链路上都有A股核心标的。",
      "<strong>纯视觉vs多传感器融合之争，对产业链意味着什么？</strong>特斯拉FSD坚持纯视觉（不用激光雷达），国内主流采用多传感器融合路线——激光雷达+摄像头+毫米波。这意味着<strong>激光雷达产业链在国内有巨大增量市场</strong>。禾赛科技（美股）全球车载激光雷达市占33.5%，但A股主要抓上游供应链（炬光科技/万集科技）。域控制器环节确定性最高——不管什么传感器方案，都要用域控制器做信息融合。"
    ],
    "flowSteps": [
      "感知层→激光雷达+摄像头",
      "决策层→智驾芯片+域控制器",
      "执行层→线控制动+转向",
      "整车集成→L3/L4量产"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：智能驾驶产业链的\"卡口\"更偏向软件/芯片，物理卡口不如PCB/半导体那么硬。但有几个环节接近卡口标准：</strong><br>① <strong>域控制器</strong>：德赛西威高算力域控国内市占近35%第一，深度绑定英伟达（国内唯一Orin授权）+华为+地平线三生态。② <strong>智驾芯片</strong>：英伟达Orin高端垄断（但非A股），国产地平线征程6（560TOPS）追赶。③ <strong>激光雷达上游器件</strong>：炬光科技VCSEL芯片+光学组件是激光雷达核心元器件。④ <strong>线控制动</strong>：伯特利累计订单超500万套，国产市占>50%。"
  },
  "overview": [
    {
      "label": "🚗 L2+渗透率（2025）",
      "value": "62.6%",
      "note": "2026 L3+渗透→20-25%",
      "color": "var(--accent)"
    },
    {
      "label": "📐 中国智驾市场（2030E）",
      "value": "~3000亿",
      "note": "L4出租车+物流+乘用车",
      "color": "var(--blue)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "L3量产元年",
      "note": "法规落地+车企L3牌照发放",
      "color": "var(--green)"
    },
    {
      "label": "🧠 域控制器",
      "value": "德赛国内35%第一",
      "note": "绑定英伟达+华为+地平线三生态",
      "color": null
    },
    {
      "label": "📡 激光雷达国内格局",
      "value": "禾赛33.5%+华为+速腾27%",
      "note": "三家合计>89%·禾赛美股非A股",
      "color": "var(--barrier-high)"
    },
    {
      "label": "⚡ 核心催化",
      "value": "L3法规落地+城市NOA普及",
      "note": "比亚迪/理想/小鹏/小米全系标配",
      "color": null
    },
    {
      "label": "🔴 核心矛盾",
      "value": "智驾芯片仍依赖英伟达",
      "note": "地平线征程6追赶·华为MDC自成体系",
      "color": "var(--red)"
    },
    {
      "label": "📋 线控制动国产化率",
      "value": "伯特利国产>50%",
      "note": "WCBS累计订单>500万套",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "乘用车(L3)·商用车·无人配送·Robotaxi",
      "barrier": "low",
      "note": "比亚迪/理想/小鹏/蔚来/小米→智驾下沉全系标配"
    },
    "midstream": {
      "name": "Tier1系统集成（华为/德赛西威/经纬恒润）",
      "barrier": "low",
      "note": "华为智驾方案渗透率快速提升·德赛域控第一"
    },
    "equipment": [
      {
        "name": "域控制器",
        "barrier": "high",
        "choke": true,
        "note": "德赛高算力域控国内35%第一·绑定英伟达独家"
      },
      {
        "name": "激光雷达",
        "barrier": "extreme",
        "choke": true,
        "note": "禾赛33.5%(美股)·A股抓上游器件"
      },
      {
        "name": "智驾芯片/SoC",
        "barrier": "extreme",
        "choke": false,
        "note": "英伟达Orin高端垄断·地平线(港股)国产替代"
      }
    ],
    "materials": [
      {
        "name": "线控制动(WCBS)",
        "barrier": "high",
        "choke": true,
        "note": "伯特利国产>50%·订单>500万套"
      },
      {
        "name": "车载摄像头(CIS+镜头)",
        "barrier": "high",
        "choke": false,
        "note": "韦尔股份/联创电子→车载CIS龙头"
      },
      {
        "name": "4D毫米波雷达",
        "barrier": "high",
        "choke": false,
        "note": "华域汽车→国产替代"
      }
    ],
    "sideBranches": [
      {
        "name": "线控转向+悬架",
        "barrier": "high",
        "note": "浙江世宝/拓普集团→执行层全链"
      },
      {
        "name": "高精地图(四维图新)",
        "barrier": "high",
        "note": "覆盖全国45万公里·lobbying中"
      }
    ]
  },
  "fourQuestions": {
    "segments": []
  },
  "chokePoints": [],
  "supplyGap": [],
  "methodologyNotes": "",
  "status": "skeleton"
};
})(window.CHAINS);
