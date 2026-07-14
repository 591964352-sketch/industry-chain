// data/ai-full-chain.js — 升级九 STEP 4 小步 2：AI 全产业链 (Meta-Sector 整合视图) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.ai-full-chain 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== AI 全产业链（Meta-Sector） ====================
CHAINS['ai-full-chain'] = {
  "id": "ai-full-chain",
  "name": "AI 全产业链",
  "icon": "🧠",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "AI = 计算 × 存储 × 互联 × 供电 × 散热 — 五个物理维度，缺一不可",
    "paragraphs": [
      "普通投研从\"AI服务器出货量\"开始分析。我们换个角度——<strong>从物理定律出发，把AI产业链拆成五个不可再拆的基本维度</strong>：",
      "<strong>计算（Compute）</strong>：GPU = 晶体管密度 × 芯片面积 × 架构效率。物理极限：3nm以下量子隧穿效应，单芯片面积受光罩尺寸约束→Chiplet是唯一路径→<strong>先进封装成为卡口</strong>。",
      "<strong>存储（Memory）</strong>：HBM = 3D堆叠 × 带宽密度。物理极限：TSV微凸点间距≤45μm→<strong>混合键合成为卡口</strong>。DRAM工艺与逻辑工艺不兼容→存储芯片必须独立制造。",
      "<strong>互联（Interconnect）</strong>：带宽 = 通道数 × 每通道速率 / 距离。物理极限：铜的RC延迟在224Gbps触顶→224G以上必须转向光互联。<strong>硅是间接带隙半导体→不能高效发光→必须用III-V族（InP/GaAs）→化合物半导体成为卡口。</strong>",
      "<strong>供电（Power）</strong>：GB300单机柜功耗~140kW。物理极限：传统UPS转换效率~92%，HVDC可达98%。BBU超级电容响应速度<1ms，锂电池>10ms。",
      "<strong>散热（Cooling）</strong>：热力学第二定律不可违反。单相液冷散热密度~50kW/rack，风冷~20kW/rack→<strong>液冷是120kW+机柜的刚需，不是选项</strong>。"
    ],
    "flowSteps": [
      "物理定律",
      "计算(晶体管×面积×架构)",
      "存储(带宽×容量/功耗)",
      "互联(带宽×距离/衰减)",
      "供电(功率密度×效率)",
      "散热(热密度/冷媒)",
      "→ 五维满足 → AI集群成立"
    ],
    "highlightBox": "<strong>💡 第一性原理的核心贡献</strong>：把\"AI产业链\"从行业术语翻译成物理约束——<strong>硅不能发光→光子学必须用III-V族、铜RC延迟触顶→224G以上必光进铜退、热力学第二定律→液冷不是选项是必须</strong>。这三个物理事实不随英伟达架构升级、不随中美博弈变化、不随市场情绪波动——它们是方法论的\"地基\"。<br><br><strong>🔑 关键推论</strong>：AI产业链最大卡口不在A股——GPU（英伟达>80%）、HBM（海力士/三星/美光）、CoWoS（台积电垄断）、EUV光刻机（ASML 100%）——全球寡头都不是A股上市公司。A股能抓的卡口是：<strong>卖铲人</strong>（北方华创/拓荆）、<strong>材料商</strong>（东材科技/菲利华/铜冠铜箔/南大光电）、<strong>组件卡口</strong>（英维克/沃尔核材/源杰科技）。"
  },
  "overview": [
    {
      "label": "🌍 全球AI芯片市场(2026E)",
      "value": "~$1650亿",
      "note": "GPU+ASIC+FPGA，英伟达>80%",
      "color": "var(--accent)"
    },
    {
      "label": "🖥️ AI服务器出货(2026E)",
      "value": "GB300 5.5-8.5万台",
      "note": "Vera Rubin H2接棒，价值量再翻倍",
      "color": "var(--green)"
    },
    {
      "label": "💰 AI数据中心CapEx(2026E)",
      "value": "$3000亿+",
      "note": "北美四巨头+中国BAT，+45% YoY",
      "color": "var(--blue)"
    },
    {
      "label": "🧠 HBM市场规模(2026E)",
      "value": "$300亿+",
      "note": "占DRAM总营收30%+，海力士>50%",
      "color": "var(--accent)"
    },
    {
      "label": "🔴 A股可抓卡口标的",
      "value": "~10个",
      "note": "集中在材料+组件+设备环节",
      "color": "var(--red)"
    },
    {
      "label": "⚠️ 不在A股的核心卡口",
      "value": "GPU/HBM/CoWoS/EUV",
      "note": "全球寡头均非A股上市（最大遗憾）",
      "color": "var(--red)"
    },
    {
      "label": "⚡ 核心驱动",
      "value": "Scaling Law + Rubin架构",
      "note": "英伟达年更架构→硬件迭代加速",
      "color": null
    },
    {
      "label": "📋 A股投资逻辑",
      "value": "卖铲人+材料+组件",
      "note": "东材/菲利华/铜冠/沃尔/英维克/源杰/北方华创/华大九天",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": {
      "name": "AI应用层：Agent·代码助手·AI搜索·办公·自动驾驶·科学研究",
      "barrier": "low",
      "note": "软件/服务驱动→类卡口（数据+生态+用户粘性），详见 AI应用 赛道"
    },
    "systemAssembly": {
      "name": "AI服务器整机 (ODM/OEM/JDM)",
      "barrier": "low",
      "note": "工业富联(GB300独家)·浪潮·华勤→CR5<40%→充分竞争·无卡口"
    },
    "computeLabel": "▼ 物理维度①：计算 — GPU/HBM/先进封装",
    "compute": [
      {
        "name": "GPU/AI芯片",
        "barrier": "extreme",
        "choke": true,
        "note": "英伟达>80%垄断(不在A股)·寒武纪/海光国产替代·华为昇腾(非上市)"
      },
      {
        "name": "HBM高带宽存储",
        "barrier": "extreme",
        "choke": true,
        "note": "海力士50%+三星35%+美光15%(均不在A股)·长鑫存储(未上市)"
      },
      {
        "name": "先进封装 CoWoS",
        "barrier": "extreme",
        "choke": true,
        "note": "台积电垄断(不在A股)·长电/通富代工溢出·拓荆混合键合(A股✓)"
      }
    ],
    "interconnectLabel": "▼ 物理维度②：互联 — 铜连接 + CPO光互联",
    "interconnect": [
      {
        "name": "铜连接(224G/448G背板)",
        "barrier": "extreme",
        "choke": true,
        "note": "安费诺一供·沃尔核材(A股✓)224G全球24%·博创AEC"
      },
      {
        "name": "CPO/硅光引擎",
        "barrier": "extreme",
        "choke": true,
        "note": "CW激光器源杰科技(A股✓)国内唯一100mW量产·中际旭创全球龙头(非卡口)"
      }
    ],
    "pcLabel": "▼ 物理维度③④：供电 + 散热 — 机柜级基础设施",
    "pc": [
      {
        "name": "液冷散热(CDU/冷板)",
        "barrier": "high",
        "choke": true,
        "note": "英维克(A股✓)国内唯一NPN Tier1·高澜/申菱跟随"
      },
      {
        "name": "BBU/超级电容",
        "barrier": "high",
        "choke": true,
        "note": "江海股份(A股✓)全球仅3家认证·麦格米特HVDC"
      }
    ],
    "mfgLabel": "▼ 上游制造：半导体设备 + EDA — 国产替代主战场",
    "manufacturing": [
      {
        "name": "半导体设备(刻蚀/薄膜/清洗)",
        "barrier": "extreme",
        "choke": true,
        "note": "北方华创(A股✓)国内唯一平台型·全球第5·中微刻蚀·拓荆薄膜"
      },
      {
        "name": "EDA设计工具",
        "barrier": "extreme",
        "choke": true,
        "note": "Synopsys/Cadence/西门子81%·华大九天(A股✓)国内唯一全流程"
      },
      {
        "name": "晶圆制造(7nm以下)",
        "barrier": "extreme",
        "choke": false,
        "note": "台积电56%+三星(不在A股)·中芯国际(A股✓)但制程落后→非卡口"
      }
    ],
    "matLabel": "▼ 上游材料：物理卡口最密集区 — 全球≤3家的\"物质基础\"",
    "materials": [
      {
        "name": "M9碳氢树脂",
        "barrier": "extreme",
        "choke": true,
        "note": "全球仅2家·东材科技(A股✓)国内唯一·缺口63%"
      },
      {
        "name": "Q布/石英纤维布",
        "barrier": "extreme",
        "choke": true,
        "note": "菲利华(A股✓)全球~80%绝对龙头·缺口>40%"
      },
      {
        "name": "HVLP4铜箔",
        "barrier": "extreme",
        "choke": true,
        "note": "日韩四强85%·铜冠铜箔(A股✓)国内唯一全系列·缺口23%"
      },
      {
        "name": "ArF光刻胶",
        "barrier": "extreme",
        "choke": true,
        "note": "日本70%+·南大光电(A股✓)国内唯一量产·缺口~98%"
      },
      {
        "name": "ABF载板膜",
        "barrier": "extreme",
        "choke": true,
        "note": "味之素垄断97%(不在A股)·华正新材CBF膜对彪(A股✓)"
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
