window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['ai-apps'] = {
  "id": "ai-apps",
  "name": "AI应用",
  "icon": "🧠",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "AI应用 = AI时代的\"石油化工厂\"——把底层算力(石油原料)加工成各行各业能直接用的\"产品\"",
    "paragraphs": [
      "2026年被定义为<strong>\"AI应用元年\"</strong>。如果说2023-2025是\"烧钱建炼油厂（买GPU/建数据中心）\"，那2026年开始是<strong>\"炼油厂出产品\"</strong>——DeepSeek V4、字节豆包（月活1.57亿）、Kimi Agent集群（300子Agent协作）、智谱GLM-5等大模型层出不穷。AI从\"能做PPT\"进化到\"能编复杂代码/能分析财报/能跨系统自动完成工作流\"，商业价值开始<strong>从预期转向兑现</strong>。",
      "<strong>AI应用赛道的物理卡口在哪？</strong>说实话——软件/服务层很难用\"企业数量≤3家/产能扩产≥12月\"这种物理框架来筛。大模型确实是寡头格局（DeepSeek/豆包/文心/Kimi/通义<10家），但它们的壁垒是<strong>数据飞轮+用户生态+模型迭代速度</strong>，不是物理产能。所以这个章节的处理方式不同于硬件赛道——我们承认方法论局限，但依然按框架格式输出，标注\"类卡口\"而非\"物理卡口\"。核心抓<strong>数据价值链（数据采集/标注/版权）+ 企业级AI Agent落地 + 国产算力生态受益</strong>三个方向。"
    ],
    "flowSteps": [
      "大模型→DeepSeek/Kimi/智谱/豆包",
      "数据→Hugging Face+爬虫+版权语料",
      "MaaS平台→阿里云/火山引擎/百度",
      "AI Agent→编程/客服/营销/办公",
      "落地应用→WPS AI/Fensai/BlueFocus"
    ],
    "highlightBox": "<strong>⚠️ 方法论重要说明：AI应用赛道是软件/服务驱动的产业链，\"物理卡口\"框架适用性有限。</strong><br>本章节的关键调整：① 大模型层：\"寡头\"指数据和生态垄断而非物理产能；② 应用层：壁垒来自网络效应和用户粘性而非硬件产能；③ 标注的\"卡口\"实际是\"类卡口\"——有寡头特征但非传统物理瓶颈。④ 大模型公司大多未上市（DeepSeek/豆包/Kimi/智谱），A股主要抓关联产业链标的。"
  },
  "overview": [
    {
      "label": "🤖 中国AI应用市场(2025)",
      "value": "~182亿",
      "note": "AI Agent行业+78%·2026E>300亿",
      "color": "var(--accent)"
    },
    {
      "label": "📱 豆包月活",
      "value": "1.57亿",
      "note": "中国原生AI App榜首·环比+6.6%",
      "color": "var(--blue)"
    },
    {
      "label": "🏭 产业阶段",
      "value": "商业化拐点",
      "note": "推理需求=训练8倍·应用>基建",
      "color": "var(--green)"
    },
    {
      "label": "🧠 国产大模型数量",
      "value": ">200个",
      "note": "真正商业化<5家·集中度在快速提升",
      "color": null
    },
    {
      "label": "📐 AI Agent覆盖率目标(2027)",
      "value": ">70%",
      "note": "国务院智能体政策写入2026政府报告",
      "color": null
    },
    {
      "label": "⚡ 核心催化",
      "value": "大模型从10→100",
      "note": "DeepSeek V4+智谱IPO(150亿)+字节AI商业化",
      "color": null
    },
    {
      "label": "🔴 核心矛盾",
      "value": "大模型未上市",
      "note": "A股只能抓赋能/关联/生态标的",
      "color": "var(--red)"
    },
    {
      "label": "💻 AI推理算力占比",
      "value": "全球70-80%",
      "note": "推理算力是训练的8倍→国产算力受益",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "C端(搜索/助手/创作/社交)·B端(Agent/编程/客服/营销)",
      "barrier": "low",
      "note": "用户基数庞大·但付费转化率仍在爬坡"
    },
    "midstream": {
      "name": "AI应用/Agent开发商",
      "barrier": "low",
      "note": "金山办公/科大讯飞/蓝色光标/汉得信息→充分竞争·无卡口"
    },
    "equipment": [
      {
        "name": "大模型(类卡口/数据+生态壁垒)",
        "barrier": "extreme",
        "choke": true,
        "note": "DeepSeek/豆包/Kimi/智谱<10家·A股关联抓生态"
      },
      {
        "name": "AI芯片/算力(物理卡口)",
        "barrier": "extreme",
        "choke": true,
        "note": "寒武纪/海光→已在半导体赛道覆盖"
      }
    ],
    "materials": [
      {
        "name": "训练数据/数据要素(版权壁垒)",
        "barrier": "high",
        "choke": false,
        "note": "高质量语料→大模型\"石油\"·版权护城河"
      },
      {
        "name": "AI安全/风控",
        "barrier": "high",
        "choke": false,
        "note": "360/深信服→AI防火墙/内容审核"
      }
    ],
    "sideBranches": [
      {
        "name": "AI编程(Copilot/CodeBuddy)",
        "barrier": "mid",
        "note": "GitHub Copilot+TONGYI Lingma+商汤Raccoon"
      },
      {
        "name": "AI搜索→替代传统搜索",
        "barrier": "mid",
        "note": "百度重构·豆包搜索·Kimi探索版"
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
