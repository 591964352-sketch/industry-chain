window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['ai-server'] = {
  "id": "ai-server",
  "name": "AI服务器",
  "icon": "🖥️",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "AI服务器 = 算力时代的\"发电厂\"——把电力（GPU/液冷/铜连接）转化为智能",
    "paragraphs": [
      "你手机里的AI助手、抖音的推荐算法、ChatGPT的每一次回答——<strong>背后都是AI服务器在\"烧\"算力</strong>。一台AI服务器不像普通电脑那样用风扇吹，它发热量堪比一个工业烤箱。英伟达GB300机柜功耗飙到<strong>135-140kW</strong>（是上一代的2倍），不用液冷根本跑不起来。",
      "<strong>为什么2026年AI服务器产业链这么关键？</strong>因为英伟达从GB200升级到GB300再到下半年的Vera Rubin平台，每次架构升级都带来全新的供应链增量机会。GB300单机柜价值量比GB200<strong>提升20-30%</strong>，而Vera Rubin（Kyber机柜）电源价值将是GB200的<strong>10倍以上</strong>。液冷、铜连接、BBU超级电容——这些在传统服务器里占比很小的环节，正在变成AI服务器的核心成本项。"
    ],
    "flowSteps": [
      "英伟达GPU→台积电代工",
      "高速PCB→胜宏/沪电",
      "铜连接背板→安费诺/沃尔",
      "液冷散热→英维克/高澜",
      "电源/BBU→麦格米特/江海",
      "AI服务器整机→工业富联/浪潮"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：AI服务器的\"卡口\"不在整机制造（工业富联/浪潮/华勤充分竞争），而在几个增量核心部件：</strong><br>① <strong>液冷系统</strong>：英维克是国内唯一获英伟达NPN Tier1认证的液冷供应商，GB300冷板市占率42%、CDU市占率第一。液冷从\"可选\"→\"标配\"→Rubin强制100%液冷。② <strong>高速铜连接</strong>：沃尔核材224G铜缆全球市占24.2%、国内唯一量产，深度绑定安费诺→间接进英伟达全系。③ <strong>BBU超级电容</strong>：GB300标配BBU，江海股份超级电容通过认证。这些环节的共同特征：全球≤3家能做、认证周期>12月、下游100%刚需。"
  },
  "overview": [
    {
      "label": "🖥️ GB300机柜出货（2026E）",
      "value": "5.5-8.5万台",
      "note": "同比+100%+，2026Q2大规模交付",
      "color": "var(--accent)"
    },
    {
      "label": "🔌 GB300单机柜功耗",
      "value": "135-140kW",
      "note": "GB200的2倍，液冷覆盖率80%+",
      "color": "var(--red)"
    },
    {
      "label": "💧 英伟达系液冷市场（2026E）",
      "value": "~$100亿",
      "note": "中性预测，Rubin强制100%液冷",
      "color": "var(--blue)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "爆发前夜",
      "note": "GB300 Q2放量 + Rubin Q3爬坡",
      "color": "var(--green)"
    },
    {
      "label": "🔗 铜连接市场空间（2026E）",
      "value": "~67亿元",
      "note": "同比+106%，超节点服务器驱动",
      "color": "var(--accent)"
    },
    {
      "label": "⚡ Kyber机柜电源价值",
      "value": "10x GB200",
      "note": "48V高压架构+超级电容BBU",
      "color": "var(--red)"
    },
    {
      "label": "🔴 核心矛盾",
      "value": "液冷产能不足+铜缆缺口",
      "note": "英维克/沃尔定单>产能",
      "color": "var(--red)"
    },
    {
      "label": "📋 液冷国产化率",
      "value": "CDU>70%/冷板>80%",
      "note": "海外毛利率是国内3x，出海是破局关键",
      "color": null
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "北美CSP(微软/谷歌/亚马逊50%+)·国内(字节/阿里/腾讯30%+)",
      "barrier": "low",
      "note": "2026年四大CSP AI基建投资$6000亿"
    },
    "midstream": {
      "name": "AI服务器整机（ODM/OEM/JDM）",
      "barrier": "low",
      "note": "工业富联(GB300独家设计生产)·浪潮·华勤·联想→CR5<40%→无卡口"
    },
    "equipment": [
      {
        "name": "液冷散热(冷板式/浸没式)",
        "barrier": "extreme",
        "choke": true,
        "note": "英维克国内唯一NPN Tier1认证"
      },
      {
        "name": "铜连接/高速背板(224G)",
        "barrier": "extreme",
        "choke": true,
        "note": "沃尔核材全球24.2%/国内唯一量产"
      },
      {
        "name": "BBU超级电容/48V电源",
        "barrier": "high",
        "choke": false,
        "note": "江海/麦格米特→GB300标配"
      }
    ],
    "materials": [
      {
        "name": "液冷管路/快换接头",
        "barrier": "high",
        "choke": false,
        "note": "高澜/川环→获海外认证"
      },
      {
        "name": "CDU/冷板组件",
        "barrier": "high",
        "choke": false,
        "note": "英维克/申菱→国产市占>70%"
      },
      {
        "name": "高速铜缆(224G PAM4)",
        "barrier": "extreme",
        "choke": true,
        "note": "沃尔独占国内量产"
      }
    ],
    "sideBranches": [
      {
        "name": "光模块(1.6T)→已覆盖CPO赛道",
        "barrier": "high",
        "note": "中际旭创/天孚/新易盛"
      },
      {
        "name": "AI服务器PCB→已覆盖PCB赛道",
        "barrier": "high",
        "note": "胜宏/沪电/鹏鼎→HDI/高多层"
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
