window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS.semi = {
  "id": "semi",
  "name": "半导体",
  "icon": "💻",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "半导体 = 现代工业的\"粮食\" + 数字世界的\"细胞\"",
    "paragraphs": [
      "你手机里的处理器、电脑的内存、汽车里的控制芯片、AI服务器里的GPU——<strong>全都是半导体芯片</strong>。如果说 PCB 是电子产品的骨骼，半导体就是<strong>大脑</strong>。没有芯片，所有电子设备都是空壳。半导体产业链被誉为\"人类历史上最复杂的制造体系\"——从一粒沙子（硅）到一颗芯片，需要<strong>上千道工序、数百种材料、数十种核心设备</strong>。",
      "<strong>为什么半导体是\"卡脖子\"最严重的行业？</strong>因为全产业链的核心环节被极少数公司垄断：光刻机只有荷兰 ASML 能造（EUV 100%垄断），EDA 工具被美国三巨头控制 81%，高端光刻胶被日本企业占据 70%+。中国每年进口芯片超过<strong>4000 亿美元</strong>，超过石油进口金额。国产替代是国家级战略。"
    ],
    "flowSteps": [
      "硅砂→高纯硅→硅片",
      "光刻/刻蚀/沉积",
      "晶圆制造(Foundry)",
      "封装测试",
      "芯片→装进产品"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：半导体行业真正的\"河道收窄处\"在哪里？</strong><br>① <strong>EUV 光刻机</strong>：ASML 100% 垄断，但 A 股无直接标的。② <strong>EDA 工具</strong>：Synopsys/Cadence/西门子占 81%，华大九天是国内唯一全流程替代。③ <strong>高端光刻胶</strong>：日本 JSR/TOK 占 70%+，南大光电是国内唯一 ArF 量产企业。④ <strong>大硅片</strong>：信越/SUMCO 垄断 12 英寸高端市场。半导体的卡口比 PCB 更硬、更深、更难突破——但一旦突破，就是数十年的护城河。"
  },
  "overview": [
    {
      "label": "🌍 全球半导体销售额（2026E）",
      "value": "<mark class=\"updated\">$15,112 亿</mark>",
      "note": "WSTS 2026.6春季预测，+89.9% YoY",
      "color": "var(--accent)"
    },
    {
      "label": "📊 2025实际销售额",
      "value": "$7,917 亿",
      "note": "SIA: +25.6% YoY",
      "color": null
    },
    {
      "label": "📈 2026年4月单月",
      "value": "$1,105 亿",
      "note": "SIA: 环比+11%，同比+93.9%",
      "color": "var(--green)"
    },
    {
      "label": "🇨🇳 中国进口芯片/年",
      "value": ">$4000 亿",
      "note": "超过石油进口金额",
      "color": "var(--red)"
    },
    {
      "label": "🔧 国产设备自给率（2026）",
      "value": "~35%",
      "note": "2022年16%→2026突破35%，先进<15%",
      "color": "var(--barrier-high)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "全面攻坚期",
      "note": "大基金三期3440亿投入",
      "color": "var(--accent)"
    },
    {
      "label": "📐 EDA国产化率（2026）",
      "value": "<15%",
      "note": "5nm以下<5%，华大九天全球第6",
      "color": "var(--red)"
    },
    {
      "label": "⚡ 核心驱动",
      "value": "AI芯片+国产替代",
      "note": "昇腾/寒武纪+长存全自主产线",
      "color": null
    },
    {
      "label": "🔴 最大瓶颈",
      "value": "EUV光刻机",
      "note": "ASML 100%垄断，10万+零部件",
      "color": "var(--red)"
    },
    {
      "label": "📋 材料国产化率",
      "value": "~30%",
      "note": "EUV光刻胶0%·12寸硅片<20%",
      "color": null
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "AI芯片·手机·汽车·IoT·5G",
      "barrier": "low",
      "note": "中国占全球芯片消费60%+"
    },
    "midstream": {
      "name": "IC设计→晶圆制造→封装测试",
      "barrier": "low",
      "note": "设计3600+家/制造中芯国际全球第3/封测全球前三"
    },
    "upstreamTools": {
      "name": "EDA+IP → 芯片设计工具",
      "barrier": "extreme",
      "note": "Synopsys/Cadence/西门子81%→华大九天<10%"
    },
    "equipment": [
      {
        "name": "光刻机 / EUV（极紫外）/ DUV（深紫外）",
        "barrier": "extreme",
        "choke": true,
        "note": "ASML 100% EUV·28nm DUV刚突破"
      },
      {
        "name": "刻蚀机",
        "barrier": "high",
        "choke": false,
        "note": "中微5nm进台积电·国产化~25%"
      },
      {
        "name": "薄膜沉积",
        "barrier": "high",
        "choke": false,
        "note": "拓荆/北方华创·国产化~20%"
      },
      {
        "name": "检测 / 量测（KLA垄断）",
        "barrier": "extreme",
        "choke": false,
        "note": "KLA垄断·国产化<5%"
      }
    ],
    "materials": [
      {
        "name": "光刻胶 / ArF（氟化氩）/ EUV（极紫外）",
        "barrier": "extreme",
        "choke": true,
        "note": "日本70%+·EUV 0%国产"
      },
      {
        "name": "12英寸硅片",
        "barrier": "extreme",
        "choke": true,
        "note": "信越+SUMCO 60%"
      },
      {
        "name": "电子特气",
        "barrier": "high",
        "choke": false,
        "note": "华特唯一ASML认证"
      },
      {
        "name": "靶材 / CMP（化学机械抛光）",
        "barrier": "high",
        "choke": false,
        "note": "江丰/安集突破"
      }
    ],
    "sideBranches": [
      {
        "name": "先进封装(Chiplet)",
        "barrier": "high",
        "note": "长电科技全球第3"
      },
      {
        "name": "存储芯片 / DRAM / NAND",
        "barrier": "extreme",
        "note": "长鑫第4·长存第6"
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
