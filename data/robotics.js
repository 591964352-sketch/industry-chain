window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS.robotics = {
  "id": "robotics",
  "name": "人形机器人",
  "icon": "🤖",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "人形机器人 = \"会走路的智能手机\"——它不是一个硬件，是把AI大脑装进人类身体",
    "paragraphs": [
      "2026年是人形机器人从\"概念炒作\"到<strong>\"量产兑现\"</strong>的转折年。特斯拉Optimus Gen3上半年定型量产，宇树科技6月IPO上会，国内整机企业超140家，年出货量1.44万台，全球占比84.7%。一台人形机器人约50万元成本——<strong>核心零部件占60%以上</strong>，整机制造反而不怎么赚钱（宇树利润已腰斩）。产业链价值分布：<strong>上游吃肉、中游跑量、下游落地</strong>。",
      "<strong>人形机器人和工业机器人有什么本质区别？</strong>工业机器人（机械臂）在固定位置重复单一动作，核心是减速器+伺服电机。人形机器人要能走、能抓、能感知环境——多了<strong>行星滚柱丝杠（线性执行器）、六维力传感器（触觉）、IMU（平衡感）、灵巧手（精细操作）</strong>四大增量。这些零部件A股大部分有标的，而且技术壁垒比工业机器人高出1-2个数量级。"
    ],
    "flowSteps": [
      "AI大脑→芯片+算法",
      "感知层→六维力传感器+IMU+3D视觉",
      "执行层→丝杠+减速器+电机",
      "灵巧手→微型电机+电子皮肤",
      "关节模组→集成组装",
      "整机→特斯拉Optimus/宇树/傅利叶"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：人形机器人产业目前无绝对寡头，但有几个\"潜在卡口\"值得跟踪：</strong><br>① <strong>行星滚柱丝杠</strong>：特斯拉Optimus核心传动部件，精度要求相当于发丝的1/100，全球能批量供货的企业<5家。恒立液压已小批量供货。② <strong>六维力传感器</strong>：柯力传感A股唯一量产，2026产能10万套，送样50家客户。③ <strong>谐波减速器</strong>：绿的谐波国产绝对龙头，单价打到1300元（日本哈默纳科一半），特斯拉供应链。但以上环节尚处\"0→1\"阶段，需跟踪订单兑现。"
  },
  "overview": [
    {
      "label": "🤖 全球市场（2030E）",
      "value": "~$260亿",
      "note": "特斯拉Optimus年产百万台",
      "color": "var(--accent)"
    },
    {
      "label": "🇨🇳 中国出货量（2025）",
      "value": "1.44万台",
      "note": "全球占比84.7%，>140家整机企业",
      "color": "var(--blue)"
    },
    {
      "label": "🔩 行星滚柱丝杠需求(2029E)",
      "value": "~1400万根",
      "note": "单台14-28根·市场112亿元",
      "color": "var(--red)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "0→1爆发前夜",
      "note": "特斯拉Gen3定型·宇树IPO上会6月",
      "color": "var(--green)"
    },
    {
      "label": "💰 成本分布",
      "value": "电机30%+减速器19%",
      "note": "传感器12%+丝杠15%+整机25%",
      "color": null
    },
    {
      "label": "⚡ 核心催化",
      "value": "特斯拉Optimus Gen3",
      "note": "上半年量产·供应链定点加速",
      "color": null
    },
    {
      "label": "🔴 核心矛盾",
      "value": "0→1→业绩未兑现",
      "note": "多数丝杠/传感器企业Q1尚未体现",
      "color": "var(--red)"
    },
    {
      "label": "📋 六维力传感器",
      "value": "国产单价2.7万/颗",
      "note": "仅为海外1/4·柯力A股唯一量产",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "工业制造·仓储物流·家庭服务·医疗",
      "barrier": "low",
      "note": "工业先行→特斯拉工厂内应用→2027+家庭场景"
    },
    "midstream": {
      "name": "整机制造（特斯拉/宇树/傅利叶/优必选/小鹏等140+家）",
      "barrier": "low",
      "note": "充分竞争·价格战已开启→宇树利润腰斩·无卡口"
    },
    "equipment": [
      {
        "name": "行星滚柱丝杠（线性执行器）",
        "barrier": "extreme",
        "choke": true,
        "note": "全球能批量<5家·恒立液压小批量供货"
      },
      {
        "name": "六维力/力矩传感器",
        "barrier": "extreme",
        "choke": true,
        "note": "柯力传感A股唯一量产·毛利率40-45%"
      },
      {
        "name": "谐波减速器",
        "barrier": "extreme",
        "choke": false,
        "note": "绿的谐波国产绝对龙头·特斯拉供应链"
      }
    ],
    "materials": [
      {
        "name": "空心杯电机/无框力矩电机",
        "barrier": "high",
        "choke": false,
        "note": "鸣志电器/鼎智科技→灵巧手核心动力"
      },
      {
        "name": "IMU惯性测量单元",
        "barrier": "high",
        "choke": false,
        "note": "芯动联科→人形姿态控制必需品"
      },
      {
        "name": "电子皮肤/触觉传感器",
        "barrier": "high",
        "choke": false,
        "note": "汉威科技→灵巧手精密操作"
      }
    ],
    "sideBranches": [
      {
        "name": "RV减速器（双环传动）",
        "barrier": "high",
        "note": "关节扭转执行核心·国产化率提升中"
      },
      {
        "name": "人形机器人整机(宇树)→6月IPO",
        "barrier": "mid",
        "note": "整机竞争激烈·A股无纯正标的"
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
