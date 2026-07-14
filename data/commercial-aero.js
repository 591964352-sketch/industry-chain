window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['commercial-aero'] = {
  "id": "commercial-aero",
  "name": "商业航天",
  "icon": "🚀",
  "meta": {
    "sector": "整合",
    "tier": "核心",
    "status": "active",
    "updatedAt": "2026-06-14",
    "ltFit": 4
  },
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "商业航天 = \"太空版互联网基建\"——把4.2万颗卫星撒到低轨道，让全球任何角落都能上网",
    "paragraphs": [
      "SpaceX星链已经发射了>7000颗卫星，在全球100+国家提供服务。中国的对标方案是<strong>千帆星座（上海垣信）和GW星座（中国星网）</strong>——两个巨型低轨卫星互联网计划，合计规划>2万颗卫星。截至2026年5月，千帆星座在轨卫星已达<strong>162颗</strong>（年底目标324颗），中国已向国际电信联盟（ITU）新申请超<strong>20万颗</strong>卫星频轨资源（较此前总量提升5倍），产业链天花板瞬间打开。",
      "商业航天产业链的核心逻辑：<strong>低轨卫星必须5-7年内完成部署（频轨资源\"先占先得\"），制造+发射必须从\"手工作坊\"切换到\"流水线批量生产\"</strong>。2025年中国商业航天发射50次（占全国54%）、入轨商业卫星311颗（占全国84%）。关键瓶颈：① 星载相控阵T/R芯片（铖昌科技/国博电子→卫星的\"天线阵列核心\"）；② 通信载荷（上海瀚讯→华为低轨项目载荷供应商）；③ 可回收火箭（蓝箭等→降本90%的关键）。"
    ],
    "flowSteps": [
      "卫星平台+载荷制造",
      "火箭发射→一箭多星",
      "卫星入轨→星座组网",
      "地面信关站→终端",
      "手机直连卫星→全球覆盖"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：商业航天最核心的物理卡口在上游核心器件——卫星的\"眼睛\"和\"嘴巴\"：</strong><br>① <strong>星载相控阵T/R芯片</strong>：这是卫星通信的核心器件（每颗星几百到上千颗芯片），铖昌科技国内龙头。全球仅3-4家能量产（铖昌/国博+ADI/Anokiwave）。② <strong>通信载荷</strong>：上海瀚讯华为低轨项目载荷供应商→华为不是谁都能做的。③ <strong>卫星总装</strong>：中国卫星国家队→千帆星座批量交付核心。④ <strong>频轨资源</strong>：不是A股标的，但20万颗新申请打开了5倍产业空间。"
  },
  "overview": [
    {
      "label": "🛰️ 千帆星座在轨卫星",
      "value": "约198颗(2026.06)",
      "note": "长六改已完成第11批次发射(较骨架 162 颗+36 颗),年底目标324颗",
      "color": "var(--accent)",
      "tier": "primary",
      "src": "国家航天局发射公告 / 央视新闻 2026-06"
    },
    {
      "label": "🇨🇳 中国新申请频轨资源",
      "value": ">20万颗",
      "note": "较此前5.13万颗提升约5倍,千帆与GW为主力(单源中国网+ITU 公开数据,降 estimate)",
      "color": "var(--red)",
      "tier": "estimate",
      "src": "中国网 / ITU国际电联公开申报数据跟踪 2026"
    },
    {
      "label": "🚀 2025商业航天发射",
      "value": "50次(占全国54%)",
      "note": "入轨商业卫星311颗(占我国全年入轨卫星数84%)",
      "color": "var(--blue)",
      "tier": "primary",
      "src": "国家航天局《2025年度商业航天发射统计》"
    },
    {
      "label": "🏭 产业阶段",
      "value": "批量交付与常态化密集发射期",
      "note": "卫星制造正从\"实验室手工打磨\"转向\"流水线量产\"",
      "color": "var(--green)",
      "tier": "broker",
      "src": "中航证券深度研报 2026-04"
    },
    {
      "label": "📡 卫星制造市场规模",
      "value": "千亿级核心市场",
      "note": "单星成本压缩至~$50万,规划发射>2万颗",
      "color": null,
      "tier": "broker",
      "src": "中泰证券商业航天测算报告 2026"
    },
    {
      "label": "⚡ 核心催化",
      "value": "可回收火箭首飞突破",
      "note": "朱雀三号等复用火箭核心技术验证及商业发射场启用",
      "color": null,
      "tier": "broker",
      "src": "招商证券商业航天专题 2026"
    },
    {
      "label": "🔴 核心矛盾",
      "value": "火箭运力瓶颈与工位紧缺",
      "note": "卫星批产能力已大幅释放,但受制于商业发射场排期及火箭复用技术",
      "color": "var(--red)",
      "tier": "broker",
      "src": "国泰君安研报 2026-05"
    },
    {
      "label": "📋 T/R芯片国产化",
      "value": "铖昌科技已全自给并批量交付",
      "note": "相控阵天线占卫星载荷核心成本,单星需消耗数千颗核心芯片",
      "color": "var(--green)",
      "tier": "primary",
      "src": "铖昌科技(001270)2025年年度报告"
    }
  ],
  "treeMap": {
    "downstream": [
      {
        "name": "手机直连卫星·远洋通信·应急救灾·航空WiFi·IoT",
        "barrier": "low",
        "note": "华为Mate已支持天通卫星通信→C端普及在即"
      }
    ],
    "midstream": [
      {
        "name": "卫星总装+火箭发射+星座运营",
        "barrier": "low",
        "note": "中国卫星(国家队)·千帆/星网运营·蓝箭/天兵等火箭→竞争激烈"
      }
    ],
    "equipment": [
      {
        "name": "星载相控阵T/R芯片",
        "barrier": "extreme",
        "choke": true,
        "note": "铖昌科技龙头·全球仅3-4家量产"
      },
      {
        "name": "通信载荷集成",
        "barrier": "extreme",
        "choke": true,
        "note": "上海瀚讯→华为低轨项目载荷供应商"
      }
    ],
    "materials": [
      {
        "name": "激光通信终端(星间链路)",
        "barrier": "high",
        "choke": false,
        "note": "航天电子→星网核心供应商"
      },
      {
        "name": "地面信关站/终端芯片",
        "barrier": "high",
        "choke": false,
        "note": "海格通信→全系列天通终端及芯片"
      }
    ],
    "sideBranches": [
      {
        "name": "商业火箭→可回收(蓝箭/天兵)",
        "barrier": "extreme",
        "note": "5家火箭公司递交上市申请·A股尚无纯正标的"
      },
      {
        "name": "手机直连卫星(华为生态)",
        "barrier": "high",
        "note": "华力创通→华为卫星基带芯片供应商"
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
