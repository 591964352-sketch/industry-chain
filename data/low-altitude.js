window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['low-altitude'] = {
  "id": "low-altitude",
  "name": "低空经济",
  "icon": "✈️",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "低空经济 = \"空中出租车+无人机物流+空中的士站\"——把地面交通搬到300米以下空域，从二维升级到三维",
    "paragraphs": [
      "低空经济不只是\"造飞行器\"，而是<strong>飞行器制造+空管系统+起降场+运营服务</strong>四个维度同时从0→1。2026年是低空经济的<strong>\"建设提速年\"</strong>——\"十五五\"规划把低空装备、低空基建双双列入专栏，五部委联合发文夯实\"数字底座\"。亿航智能全球首家获载人eVTOL全链条适航证，2026年3月正式开启售票商业化运营。",
      "<strong>低空经济产业链的\"卡口\"在哪？</strong>和此前的AI硬件赛道不同，低空经济的核心瓶颈不是\"某种材料只有3家能做\"，而是<strong>适航取证+空域管理+基础设施三层壁垒</strong>。适航取证周期3-5年（亿航花了3年多），空管系统需要与民航体系深度绑定（莱斯信息国家队垄断），起降场/通信覆盖需要政府规划→这些壁垒比纯技术壁垒更难突破。"
    ],
    "flowSteps": [
      "适航取证→TC/PC/AC",
      "eVTOL/无人机整机制造",
      "空管系统→通信+导航+监视",
      "起降场/充电桩基建",
      "商业运营→客运/物流/巡检"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：低空经济的\"卡口\"是复合型的——硬件+许可+基础设施：</strong><br>① <strong>空管系统</strong>：莱斯信息是民航空管系统国家队（\"天幕\"系统），低空飞行必须通过其批准的空域管理系统→许可壁垒类似\"只有它发了牌照\"。② <strong>适航取证</strong>：亿航全球首家全链条适航证→领先优势3年+。③ <strong>碳纤维机身</strong>：光威复材航空级碳纤维市占>60%→物理卡口（全球仅3-4家T800+量产）。④ <strong>通航运营</strong>：中信海直\"国家队\"拥有全国最大直升机机队。"
  },
  "overview": [
    {
      "label": "✈️ 中国低空经济市场(2030E)",
      "value": "~2万亿",
      "note": "CAGR>50%·政策十五五重点专栏",
      "color": "var(--accent)"
    },
    {
      "label": "🏗️ 上海低空目标(2028)",
      "value": "核心产业~800亿",
      "note": "建设\"世界eVTOL之都\"",
      "color": "var(--blue)"
    },
    {
      "label": "🛩️ 亿航EH216-S",
      "value": "全球首家全链条适航证",
      "note": "2026.3正式售票商业运营·交付221架",
      "color": "var(--green)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "建设提速年(2026)",
      "note": "适航标准发布+基建规划+试点运营",
      "color": null
    },
    {
      "label": "📐 eVTOL取证竞争",
      "value": "亿航领先3年+",
      "note": "峰飞V2000CG全球首款吨级货运eVTOL取证",
      "color": null
    },
    {
      "label": "⚡ 核心催化",
      "value": "十五五专栏+适航审定加速",
      "note": "全球首部载人eVTOL适航标准发布",
      "color": null
    },
    {
      "label": "🔴 核心矛盾",
      "value": "eVTOL主机厂多未上市",
      "note": "亿航美股/沃飞长空未上市·A股抓配套+基建",
      "color": "var(--red)"
    },
    {
      "label": "📋 千帆星座卫星",
      "value": "162颗→年底324颗",
      "note": "商业航天与低空共享空域管理逻辑",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "载人客运(eVTOL)·物流配送·巡检·农业·应急",
      "barrier": "low",
      "note": "亿航2026.3正式售票·初期场景→旅游观光+跨城通勤"
    },
    "midstream": {
      "name": "eVTOL/无人机制造+运营服务",
      "barrier": "low",
      "note": "亿航(美股)/万丰奥威/纵横股份→主机厂竞争激烈·无卡口"
    },
    "equipment": [
      {
        "name": "空管系统(U-space/ATM)",
        "barrier": "extreme",
        "choke": true,
        "note": "莱斯信息国家队·\"天幕\"系统独家"
      },
      {
        "name": "碳纤维航空机身材料",
        "barrier": "extreme",
        "choke": true,
        "note": "光威复材T800+市占>60%·全球仅3-4家"
      }
    ],
    "materials": [
      {
        "name": "eVTOL电推进系统(电机+电控)",
        "barrier": "high",
        "choke": false,
        "note": "卧龙电驱→小鹏汇天/亿航核心供应商"
      },
      {
        "name": "低空通信/导航/监视(CNS)",
        "barrier": "high",
        "choke": false,
        "note": "四川九洲→低空\"红绿灯\"监视方案"
      },
      {
        "name": "适航检测服务",
        "barrier": "high",
        "choke": false,
        "note": "广电计量→适航审定检测"
      }
    ],
    "sideBranches": [
      {
        "name": "通航运营(中信海直)",
        "barrier": "high",
        "note": "全国最大直升机机队·eVTOL运营筹备中"
      },
      {
        "name": "工业无人机(纵横/航天彩虹)",
        "barrier": "mid",
        "note": "物流/巡检/测绘已商业化"
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
