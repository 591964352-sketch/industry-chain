window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['power-semi'] = {
  "id": "power-semi",
  "name": "功率半导体/SiC",
  "icon": "⚡",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "SiC（碳化硅）= 电力电子界的\"高速公路\"——它让电能以更少损耗、更高效率在车内/数据中心/充电桩中流动",
    "paragraphs": [
      "你电动车的续航、AI数据中心的电费、手机快充的速度——这些背后都有一个共同的\"电力管家\"叫<strong>功率半导体</strong>。它不像CPU那样做计算，而是<strong>控制电流的开关、转换电压、调节功率</strong>。传统的硅（Si）功率器件就像普通铁轨，碳化硅（SiC）就像高铁轨道——耐压更高、损耗更低、体积更小。新能源车用SiC后，续航能提升<strong>5-10%</strong>（相当于省出一个电池包的边际成本）。",
      "<strong>SiC产业链的最大卡点在哪？</strong>不在下游器件设计（斯达/士兰/华润微都在做），而在<strong>最上游的SiC衬底</strong>——这是用2300°C高温把碳化硅粉末\"种\"成晶锭的过程。全球衬底市场曾被Wolfspeed（美）垄断，但<strong>天岳先进2025年市占27.6%跃居全球第一</strong>，8英寸市占51.3%。更关键的是，英伟达GB300开始用SiC做电源——AI+新能源双驱动。"
    ],
    "flowSteps": [
      "高纯碳粉+硅粉",
      "2300°C长晶→SiC晶锭",
      "切割研磨→SiC衬底",
      "外延生长→SiC外延片",
      "器件制造→SiC MOSFET/二极管",
      "模块封装→装车/装服务器"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：SiC产业链最核心的物理卡口在衬底环节：</strong><br>① <strong>SiC衬底</strong>：2300°C长晶+切割工艺壁垒极高。天岳先进全球市占27.6%第一（8英寸51.3%），超过Wolfspeed。全球能批量供应8英寸SiC衬底的企业只有<strong>天岳/Wolfspeed/Coherent/三安</strong>四家。② <strong>长晶炉/外延炉</strong>：晶盛机电8英寸长晶设备已交付天科合达/三安，国产替代加速。③ <strong>车规SiC模块</strong>：斯达半导2026Q1 SiC模块收入+350%，比亚迪/理想/小鹏全面采用。"
  },
  "overview": [
    {
      "label": "⚡ 全球SiC市场（2030E）",
      "value": "~$180亿",
      "note": "CAGR >40%，新能源车占60%+",
      "color": "var(--accent)"
    },
    {
      "label": "🚗 新能源车SiC渗透率(2026)",
      "value": "~30%",
      "note": "800V平台标配SiC·成本持续下降",
      "color": "var(--blue)"
    },
    {
      "label": "🇨🇳 天岳先进衬底全球市占",
      "value": "27.6%",
      "note": "全球第一·8英寸51.3%·超越Wolfspeed",
      "color": "var(--green)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "渗透率加速期",
      "note": "6英寸→8英寸切换·价格触底反弹",
      "color": null
    },
    {
      "label": "🔧 SiC器件国产化率",
      "value": "衬底30%+·器件<20%",
      "note": "车规器件仍以Wolfspeed/英飞凌为主",
      "color": "var(--barrier-high)"
    },
    {
      "label": "⚡ AI驱动新需求",
      "value": "GB300用SiC",
      "note": "英伟达AI服务器电源→SiC增量市场",
      "color": null
    },
    {
      "label": "🔴 核心矛盾",
      "value": "8英寸衬底良率爬坡",
      "note": "天岳2025亏损2.08亿→以价换量",
      "color": "var(--red)"
    },
    {
      "label": "📋 SiC成本 vs IGBT",
      "value": "2-3x(下降中)",
      "note": "8英寸量产→成本再降30%→渗透加速",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "新能源车(主驱+OBC)60%·AI数据中心电源·充电桩·光伏逆变器",
      "barrier": "low",
      "note": "800V高压平台标配SiC·GB300电源SiC化"
    },
    "midstream": {
      "name": "SiC器件/模块制造（设计+制造+封测）",
      "barrier": "low",
      "note": "斯达/士兰/华润/时代电气→设计多/制造少"
    },
    "equipment": [
      {
        "name": "SiC衬底（长晶+切割）, 壁垒:极高",
        "barrier": "extreme",
        "choke": true,
        "note": "全球仅4家8英寸·天岳全球第一27.6%"
      },
      {
        "name": "SiC外延片",
        "barrier": "extreme",
        "choke": true,
        "note": "瀚天天成/天域半导体→国产化加速"
      },
      {
        "name": "长晶炉/外延炉设备",
        "barrier": "high",
        "choke": false,
        "note": "晶盛机电/晶升股份→国产替代"
      }
    ],
    "materials": [
      {
        "name": "高纯碳粉/石墨坩埚",
        "barrier": "mid",
        "choke": false,
        "note": "SiC长晶核心耗材·国产替代低"
      },
      {
        "name": "车规SiC MOSFET",
        "barrier": "high",
        "choke": false,
        "note": "斯达半导车载市占>20%·国产龙头"
      }
    ],
    "sideBranches": [
      {
        "name": "GaN氮化镓→低压高频场景",
        "barrier": "high",
        "note": "快充/数据中心·英诺赛科全球第一"
      },
      {
        "name": "IGBT→SiC过渡方案",
        "barrier": "mid",
        "note": "时代电气/斯达半导→双业务驱动"
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
