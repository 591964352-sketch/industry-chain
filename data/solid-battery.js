window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['solid-battery'] = {
  "id": "solid-battery",
  "name": "固态电池",
  "icon": "🔋",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "固态电池 = 把电池里的\"电解液\"换成\"固体陶瓷\"——从\"水袋\"变成\"砖头\"，能量密度翻倍、安全性质的飞跃",
    "paragraphs": [
      "锂离子电池有三层：正极（锂的仓库）、负极（锂的\"家\"）、电解液（锂离子游动的\"泳池\"）。<strong>传统锂电池的电解液是液体</strong>——容易燃烧（电动车起火80%因为它）。<strong>固态电池把液体电解液换成固体电解质</strong>——陶瓷或聚合物，不仅不会燃烧，还能用锂金属做负极，能量密度从当前的250-300Wh/kg<strong>跃升至400-500Wh/kg+</strong>（续航从600km→1000km+）。",
      "2026年是固态电池<strong>从中试向量产过渡的关键元年</strong>。三条技术路线并行：硫化物（离子电导率最高/宁德时代主攻）、氧化物（稳定性最好/清陶能源/上海洗霸量产）、聚合物（加工性优异/特定场景）。当前半固态（含少量电解液）已小批量装车，全固态预计2027-2028年规模量产。产业链最大增量不在电芯（宁德/比亚迪寡头），而在<strong>固态电解质材料</strong>——这是传统锂电完全没有的新环节。"
    ],
    "flowSteps": [
      "固态电解质(LLZO/硫化物)合成",
      "正极+电解质+负极→叠片",
      "干法/等静压成型",
      "固态电芯组装",
      "→装车/储能/消费电子"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：固态电池创造了全新的\"固态电解质\"环节——传统锂电产业链没有的位置：</strong><br>① <strong>LLZO氧化物电解质</strong>：上海洗霸良品率98%行业最高/独供比亚迪刀片固态电池，全球仅3-4家吨级量产。② <strong>干法设备</strong>：先导智能全球唯一可提供固态电池全段设备（市占>70%），深度绑定宁德时代/清陶。③ <strong>硫化锂</strong>：天赐材料百吨级中试线，向宁德时代批量供货。④ 电芯端宁德时代/比亚迪寡头格局，但传统锂电巨头也在做→非纯增量。"
  },
  "overview": [
    {
      "label": "🔋 固态电池市场（2030E）",
      "value": "~$200亿+",
      "note": "CAGR>60%·全球动力电池~$4000亿",
      "color": "var(--accent)"
    },
    {
      "label": "🇨🇳 产业化阶段",
      "value": "中试→量产过渡",
      "note": "2026年关键节点·全固态2027-28量产",
      "color": "var(--green)"
    },
    {
      "label": "🧪 固态电解质成本占比",
      "value": "~30%+",
      "note": "传统锂电无此环节→最大增量",
      "color": "var(--red)"
    },
    {
      "label": "🏭 技术路线",
      "value": "硫化物/氧化物/聚合物",
      "note": "氧化物(LLZO)当前量产最快",
      "color": null
    },
    {
      "label": "📐 先导智能固态设备",
      "value": "全球唯一全段设备商",
      "note": "市占>70%·深度绑定宁德/清陶",
      "color": "var(--blue)"
    },
    {
      "label": "⚡ 宁德时代凝聚态电池",
      "value": "500Wh/kg已量产",
      "note": "硫化物全固态2027小批量生产",
      "color": null
    },
    {
      "label": "🔴 最大瓶颈",
      "value": "成本+良率+界面阻抗",
      "note": "固态电解质成本需从35万→10万/吨",
      "color": "var(--red)"
    },
    {
      "label": "📋 LLZO电解质龙头",
      "value": "上海洗霸良率98%",
      "note": "独供比亚迪·扩至5000吨·A股最纯",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "新能源车(主驱)70%·储能20%·消费电子10%",
      "barrier": "low",
      "note": "2027年半固态装车量预计>10万辆"
    },
    "midstream": {
      "name": "固态电芯制造",
      "barrier": "low",
      "note": "宁德时代/比亚迪寡头·清陶能源未上市·国轩/亿纬跟随"
    },
    "equipment": [
      {
        "name": "干法/等静压设备(全新需求)",
        "barrier": "extreme",
        "choke": true,
        "note": "先导智能全球唯一全段设备·市占>70%"
      },
      {
        "name": "固态电解质前驱体(LLZO/硫化锂)",
        "barrier": "extreme",
        "choke": true,
        "note": "上海洗霸·天赐材料·厦钨新能→全球仅3-4家吨级量产"
      }
    ],
    "materials": [
      {
        "name": "LLZO氧化物粉体",
        "barrier": "extreme",
        "choke": true,
        "note": "上海洗霸良率98%·三祥新材液相法35万/吨"
      },
      {
        "name": "硫化锂(硫化物路线核心)",
        "barrier": "high",
        "choke": false,
        "note": "天赐材料·厦钨新能→成本较日企低40%"
      },
      {
        "name": "LiTFSI添加剂",
        "barrier": "high",
        "choke": false,
        "note": "天赐材料市占60%+·向宁德批量供货"
      }
    ],
    "sideBranches": [
      {
        "name": "固态电池设备(纳科诺尔/宏工科技)",
        "barrier": "high",
        "note": "干法辊压+等静压·绑定清陶能源"
      },
      {
        "name": "硅负极→固态电池配套升级",
        "barrier": "high",
        "note": "贝特瑞/杉杉→负极从石墨→硅碳"
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
