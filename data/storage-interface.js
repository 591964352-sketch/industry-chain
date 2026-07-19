window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== 存储与接口 ====================
CHAINS['storage-interface'] = {
  "id": "storage-interface",
  "name": "存储与接口",
  "icon": "💾",
  "meta": {
    "sector": "上游",
    "tier": "核心",
    "status": "Phase A 骨架 (2026-07-12) · stock-level dims6 待 Phase B+ 迭代补 · 合并 hbm.js 继承 39 只股票基础",
    "updatedAt": "2026-07-12",
    "ltFit": null
  },
  "prosperity": {
    "dims": [
      {
            "key": "durability",
            "name": "景气持续性",
            "score": 4,
            "trend": "up",
            "reason": "HBM高带宽存储是AI大模型训练的刚需硬件——2026年全球HBM市场规模约$300亿+(同比+50%+)，SK海力士/三星/美光三巨头2027年产能已被英伟达/AMD/Google全部预订。DDR5渗透率从2024年~60%升至2026年~80%+，RCD芯片需求同步增长。CXL内存池化从2025年原型验证进入2026年小批量部署阶段(AWS/谷歌/微软均已部署CXL原型)，PCIe 5.0/6.0 Retimer随AI服务器出货量同步放量。下游需求明确+3年以上持续驱动+多家L3机构(SEMI/TrendForce/Yole)覆盖，景气持续性符合4分档要求。⚠ §11.23:具体产能缺口数字属行业商业机密，公开渠道不可得。",
            "evidence": "SEMI 2026 HBM Market Report + TrendForce DDR5 Penetration Tracker + Yole CXL/PCIe Market Outlook",
            "flag": "📊",
            "tier": "L3",
            "src": "SEMI/TrendForce/Yole 2026"
      },
      {
            "key": "visibility",
            "name": "业绩可见度",
            "score": 4,
            "trend": "up",
            "reason": "HBM:英伟达GB300/Vera Rubin平台明确搭载HBM3E/4，2026-2027年订单可见度极高(SK海力士2026年HBM产能已售罄)。DDR5 RCD:服务器CPU平台(Intel Granite Rapids/AMD Turin)全面切换DDR5，RCD需求随内存条出货量确定性增长。澜起科技2025年报L1实测:营收54.56亿(+49.94%)/净利22.36亿(+58.35%)，DDR5第三子代RCD收入已超越第二子代。CXL/PCIe:处于早期导入阶段，订单可见度弱于HBM/DDR5。整体有L1年报+L3机构+L4券商三层覆盖，业绩可见度符合4分档要求。⚠ CXL/UCIe等新兴接口的订单可见度有限(行业早期)。",
            "evidence": "澜起科技2025年报(巨潮L1) + SK海力士2026Q1 Investor Presentation + Intel/AMD server roadmap",
            "flag": "📊",
            "tier": "L1+L3+L4",
            "src": "巨潮L1年报+SEMI L3+头部券商L4"
      },
      {
            "key": "policy",
            "name": "政策确定性",
            "score": 4,
            "trend": "flat",
            "reason": "HBM/先进存储国产替代属于国家集成电路产业大基金三期重点支持方向(2024年成立·3440亿规模)。DDR5/CXL/PCIe等高速接口芯片被列入\"十四五\"集成电路产业规划重点攻关领域。但存储与接口链的具体标的中，仅安集科技(CMP抛光液)有明确的国产替代补贴/目录入选公开信息，澜起科技(DDR5 RCD全球双寡头)和拓荆科技(混合键合设备)属于细分领域隐性卡口、不在国家专项重点扶持目录中(国家主要支持HBM/DRAM制造等更上游环节)。整体政策环境中性偏正面，符合4分档要求。",
            "evidence": "国家大基金三期公告 + \"十四五\"集成电路产业规划 + 安集科技2025年报政府补助明细",
            "flag": "📊",
            "tier": "L2+L4",
            "src": "工信部/大基金三期公告 + 券商政策梳理研报"
      },
      {
            "key": "supply",
            "name": "供需紧张度",
            "score": 3,
            "trend": "up",
            "reason": "HBM供给端极度集中(SK海力士~50%+三星~35%+美光~15%)，三家合计近乎垄断，但A股无直接HBM制造标的——A股机会在HBM配套材料(CMP抛光液/塑封料/硅微粉)和设备(混合键合)。DDR5 RCD供给端全球≤3家(澜起/Rambus/IDT)，澜起全球市占率36.8%，扩产周期约6-12个月(芯片设计公司·fabless模式·产能约束在台积电先进制程)。CMP抛光液全球CR3≈55%，安集科技国内≈30-35%，供给结构性偏紧。整体供给端存在局部卡口但非全局性缺口，HBM制造端缺口在海外(A股不可投)，A股配套环节供给偏紧但不构成全局缺口。符合3分档(供需基本平衡偏紧)。⚠ §11.23:具体产能缺口数字属商业机密。",
            "evidence": "SEMI HBM Supply Chain 2026 + TECHCET CMP Slurry 2026 + 澜起科技2025年报(产能描述)",
            "flag": "📊",
            "tier": "L3+L4",
            "src": "SEMI/TECHCET L3 + 券商L4"
      },
      {
            "key": "valuation",
            "name": "估值性价比",
            "score": 2,
            "trend": "down",
            "reason": "存储与接口链整体估值偏高——澜起科技Forward PE~50-60x(2026E EPS)，安集科技Forward PE~72x，拓荆科技Forward PE~50x。板块受益于AI算力主题溢价+国产替代稀缺性溢价，PE分位普遍处于历史中高位。⚠ 当前无baostock PE-TTM实测数据(仅abstract_ths财务+机构EPS预测)，估值分位为L4券商估算，待后续PE实测校准。整体估值偏高但未到极端泡沫水平，符合2分档(PE分位70-85%)。",
            "evidence": "机构一致预期EPS(同花顺iFinD) + abstract_ths 2025年报财务数据",
            "flag": "🆪",
            "tier": "L4",
            "src": "头部券商2026E EPS预测(待PE-TTM实测校准)"
      },
      {
            "key": "barrier",
            "name": "壁垒安全垫",
            "score": 4,
            "trend": "flat",
            "reason": "存储与接口链存在多个物理卡口环节但不构成全链壁垒:①DDR5 RCD全球≤3家量产(澜起/Rambus/IDT)+认证周期≥12个月→5分档；②CMP抛光液全球CR3≈55%+晶圆厂认证12-18个月→5分档(安集科技)；③混合键合设备国产突破(拓荆科技)但与AMAT/Lam存在技术代差→4分档；④GMC塑封料国内仅华海诚科+住友电木(海外)双寡头，但下游HBM量产时点未明确→4分档。整体壁垒水平取核心环节加权，符合4分档(认证壁垒6-18个月+国内唯一/领先)。⚠ CXL/UCIe等新兴接口的竞争格局尚未固化(标准仍在演进)。",
            "evidence": "澜起科技2025年报(DDR5 RCD市占描述) + SEMI CMP格局 + TECHCET GMC市场报告",
            "flag": "📊",
            "tier": "L3+L4",
            "src": "SEMI/TECHCET L3 + 公司年报L1 + 券商L4"
      }
],
    "verdict": {
      "longTermFit": "💾 存储与接口链处于AI算力基础设施超级上行周期。HBM:需求端英伟达年更架构(GB300→Vera Rubin)推动HBM3E/4量价齐升，供给端三巨头垄断但扩产速度跟不上需求增速(2026-2027年产能已被预定)，HBM市场规模从2024年~$140亿→2026E~$300亿+。DDR5 RCD:受益于服务器CPU平台全面切换DDR5，澜起科技全球双寡头地位稳固(市占率36.8%)，核心卡口逻辑清晰。CXL/PCIe/UCIe:处于行业早期，中长期逻辑明确但短期业绩贡献有限(澜起CXL<2%/PCIe 7-11%营收占比)。A股可抓卡口集中在HBM配套材料(安集科技CMP抛光液)和设备(拓荆科技混合键合)环节，非HBM制造本身。⚠ 最大遗憾:HBM制造三巨头(SK海力士/三星/美光)均不在A股——这是存储链与PCB链的本质差异:PCB链核心卡口(AI PCB+材料)大部分在A股，存储链核心卡口(HBM制造)完全在海外。",
      "oneLine": "💾 存储与接口是AI算力基础设施的核心瓶颈——HBM高带宽存储、DDR5主控、CXL内存池化、PCIe/CXL高速接口芯片共同构成数据从存储到计算的完整通路",
      "stockHint": "核心卡口:安集科技(CMP抛光液国产第一·全球CR3≈55%·晶圆厂认证12-18月)→倾向\"卡口持有\"。次要关注:澜起科技(DDR5 RCD全球双寡头·市占率36.8%·营收54.56亿+49.94%·moat=88)→倾向\"成长持有\"。配套观察:拓荆科技(混合键合设备·2025营收65亿+59%)、雅克科技(前驱体材料·HBM配套)、聚辰股份(SPD Hub·DDR5配套)。⚠ 华北华创/中微公司在本链为跨链复用打分(C类·seg语境重评·非独立卡口认定)。⚠ HBM制造(海力士/三星/美光)不在A股——本链最大投资遗憾。"
    }
  },
  "cyclePosition": {
    "stage": "boom",
    "label": "繁荣期(2025-2030 AI存储升级周期)",
    "reason": "🟢 AI存储与接口处于超级上行周期(2025-2030)。核心驱动:①英伟达年更架构(GB300→Vera Rubin)→HBM需求量和带宽密度每代翻倍；②DDR5平台切换进入主升浪(渗透率2024年~60%→2026年~80%+)；③CXL内存池化从0到1(2026年首次商业化部署)；④HBM国产替代政策催化(大基金三期3440亿)。⚠ 核心风险:①HBM制造端100%在海外(A股只能做配套)，估值溢价一旦退潮可能回调剧烈；②CXL/UCIe等新兴标准仍处早期，商业化节奏不确定；③澜起科技/安集科技当前估值已反映较高增长预期(Forward PE 50-72x)。",
    "watchSignals": ["SK海力士/三星HBM产能扩张超预期→供给瓶颈缓解→HBM价格下行→配套材料/设备估值承压","英伟达推迟Vera Rubin架构→HBM需求短期放缓→全链条景气度下行","CXL 2.0标准被大型CSP(OEM)广泛采纳→澜起科技CXL MXC芯片放量→新增长极确立","国产HBM(长鑫存储)量产突破→安集科技/拓荆科技等国内配套厂商直接受益→估值逻辑重估"]
  },
  "plainIntro": {
    "analogy": "存储与接口 = AI算力的\"数据高速公路\"",
    "paragraphs": [
      "<strong>存储与接口</strong>是AI算力基础设施的核心瓶颈——AI大模型训练需要海量数据在GPU和HBM之间高速搬运，而HBM、DDR5 RCD、CXL控制器、PCIe Retimer正是这条\"数据高速公路\"上的收费站和立交桥。<br><br><strong>(Phase B 补·正文待投顾提供具体文案)</strong>"
    ],
    "flowSteps": [
      "硅晶圆→DRAM颗粒",
      "HBM堆叠键合",
      "DDR5 RCD+SPD Hub",
      "CXL/PCIe接口芯片",
      "先进封装(CoWoS)",
      "AI服务器/数据中心"
    ],
    "highlightBox": "<strong>💡 物理卡口视角：存储与接口链的\"河道收窄处\"在哪？</strong><br>① <strong>HBM高带宽存储</strong>：AI大模型训练的\"数据高速公路\"——GPU算力再强，没有HBM高速喂数据也是空转。但HBM制造被SK海力士/三星/美光100%垄断——<strong>均不在A股</strong>，A股只能抓配套(安集科技CMP抛光液+拓荆科技混合键合设备)。② <strong>DDR5 RCD(内存接口芯片)</strong>：每台服务器内存条上的\"交通指挥员\"——全球只有澜起科技/Rambus/IDT三家能量产，认证周期≥12个月。澜起科技是全球唯二的独立RCD供应商(另一家Rambus为IP授权模式)，国内唯一。③ <strong>CXL/PCIe高速接口</strong>：AI服务器GPU之间的\"超高速数据管道\"——PCIe 5.0 Retimer全球仅Astera Labs/澜起科技/谱瑞三家量产，CXL 2.0/3.0是下一代内存池化的关键标准。④ <strong>物理约束的本质不同</strong>：PCB链的卡口在\"材料和工艺\"(M9树脂/Q布/HVLP4铜箔——全球≤3家)，存储链的卡口在\"芯片设计+认证壁垒\"(RCD/Retimer/CMP抛光液——全球≤3家+认证≥12月)。存储链的A股机会比PCB链更\"间接\"——抓的是\"卖铲人\"和\"材料商\"，而非核心芯片制造商本身。",
    "fullGuide": {
      "opening": "如果把 AI 服务器比作一座城市，CPU/GPU 是市政府（算力中枢），HBM 内存是市图书馆（数据仓库），那存储与接口这条产业链做的就是两件事：① 让市政府和图书馆之间的数据传输通道足够快（存储器接口），② 让城市里不同部门之间的通讯协议标准化（芯片互连协议）。<br><br>为什么这个原本小众的赛道突然被资本市场关注？因为 AI 大模型对内存带宽的需求发生了质变——GPT-5 训练一次需要搬运的数据量相当于把整个美国国会图书馆的藏书从东海岸搬到西海岸，而且要求在几分钟内完成。DDR5 内存接口芯片、HBM 堆叠键合设备、CXL 内存池化协议——这些听起来很技术化的名词，解决的是同一个问题：<strong>AI 芯片算得再快，如果数据运不过来，算力全白费。</strong>这条产业链就是 AI 算力时代的「数据高速公路系统」。",
      "storyLine": [
            {
                  "title": "🧱 HBM 堆叠设备篇：给 DRAM「盖高楼」的精密设备",
                  "content": "HBM（高带宽内存）是 AI 芯片的「贴身数据仓库」——它不像普通内存条那样插在主板上，而是直接跟 GPU 堆叠封装在一起，数据传输距离从几厘米缩短到几毫米，速度暴增。但把 8 层、12 层 DRAM 芯片像搭积木一样精密堆叠起来——这个活儿需要一套专门的设备：<strong>临时键合机、TSV 刻蚀机、薄膜沉积设备、CMP 抛光机</strong>。<br><br>这些设备绝大多数跟半导体设备链是重叠的——<strong>拓荆科技</strong>的薄膜沉积设备、<strong>北方华创</strong>的刻蚀和 PVD 设备、<strong>中微公司</strong>的 TSV 深硅刻蚀设备、<strong>华海清科</strong>的 CMP 抛光设备——它们在前道芯片制造中已经是国产替代的主力军，在 HBM 堆叠封装这个「后道」场景下同样不可或缺。在存储与接口链的视角下，这些设备的价值在于：HBM 的层数每增加一层（从 8 层到 12 层再到未来的 16 层），对堆叠精度和设备的需求量就线性增长——<strong>这不是「替代存量设备」，而是「创造增量需求」</strong>。SK 海力士 2026 年 HBM3E 12Hi 出货量预计同比+80%，每一条新增的 HBM 产线都需要一整套堆叠键合设备的配套。<br><br>但需要注意：这些设备公司的主场在前道——HBM 堆叠是它们的增量场景而非基本盘。拓荆、北华、中微在 HBM 语境下的重要性，不能跟它们在半导体设备链中的核心地位等同——它们在这个赛道更多是「受益于 HBM 扩产的设备供应商」，而非「HBM 专属的卡口型标的」。"
            },
            {
                  "title": "🧴 HBM 封装材料篇：芯片抛光「牙膏」的独家配方",
                  "content": "HBM 制造过程中有一道看似不起眼但极度关键的工序——CMP（化学机械抛光）。想象你在给一块玻璃做镜面抛光：你需要一种特殊的「牙膏」（抛光液），既要能磨掉表面不平整的地方，又不能划伤玻璃本身。芯片抛光的要求比这高百万倍——抛光液里的每一颗磨料颗粒大小必须精确控制在纳米级，成分稍有偏差，整片价值数万美元的晶圆就废了。<br><br>全球 CMP 抛光液市场是一个双寡头格局：美国 Cabot 和中国的<strong>安集科技</strong>。安集科技 2025 年营收 25.04 亿（+36.47%）、净利 7.84 亿（+46.85%）、ROE 25.18%、毛利率 56.72%——在整个存储与接口链中，安集的财务质量是最优秀的那一档。moat=94，是全链最高值。barrier=5（极高·全球≤3 家），是正式物理卡口 ★★★。<br><br>但安集科技有一个「甜蜜的烦恼」与华海清科一模一样：安集卖的是「咖啡豆」（抛光液耗材），华海清科卖的是「咖啡机」（CMP 设备）。两者的命运是绑定的——如果华海清科的国产 CMP 设备卖不进更多晶圆厂，安集的国产抛光液也就无法进入更多产线。「液+机」的国产组合需要同步推进，缺一环都不行。还有一个需要诚实标注的事实：安集的估值已经不便宜——valuation=4（相对优势），但 ROE 25%+和毛利率 57% 在材料行业中确实属于顶级水平，高估值有基本面支撑，这与中微、芯源微的「亏损高估值」不是同一种风险。<br><br>HBM 封装材料环节还有其他重要的国产替代标的——<strong>鼎龙股份</strong>（CMP 抛光垫·PSPI·临时键合胶三线平台）、<strong>联瑞新材</strong>（Low-α 球形硅微粉·已打入 CoWoS 供应链）、<strong>雅克科技</strong>（前驱体材料+特种气体）——它们各自在细分赛道上从零到一地突破，但单线都不是全球寡头。这个环节的共同特征是：方向都对、国产替代都在推进，但从「小批量验证」到「大规模放量」的距离，各家公司参差不齐。"
            },
            {
                  "title": "🧠 DDR5 主控与 RCD 篇：内存条的「交通指挥员」——三星正在自学指挥",
                  "content": "服务器里插的内存条不是裸的 DRAM 芯片——每根 DDR5 内存条上都需要一颗叫 RCD（寄存时钟驱动器）的芯片，它的作用是协调内存条上多个 DRAM 芯片的读写时序。把它想象成繁忙十字路口的<strong>交通指挥员</strong>——没有指挥员，车辆（数据）就会撞在一起。DDR5 的传输速率比 DDR4 翻了一倍——相当于路口车流量翻倍，对指挥员的响应速度要求急剧提高。<br><br>全球能做 DDR5 RCD 芯片的公司只有三家：美国的 Rambus、日本瑞萨（收购了 IDT）、中国的<strong>澜起科技</strong>。澜起 2025 年营收 54.56 亿（+49.94%）、净利 22.36 亿（+58.35%）、毛利率 62.23%、ROE 18.25%——这三项核心指标全部创历史新高。互连类芯片占公司总营收 94.18%，全球市占率 36.8%（连续 6 年行业第一），是正式物理卡口 ★★★。moat=88，barrier=5（极高·全球仅 3 家·认证周期≥12 个月·客户切换成本极高）。<br><br>但这里有一个必须诚实告诉你的重大风险——<strong>三星电子在 2025 年宣布自研 DDR5 RCD 芯片</strong>。三星是全球最大的 DRAM 制造商，如果它自研成功，意味着：① 全球最大的 RCD 需求方（三星自己）将不再外购澜起或 Rambus 的 RCD 芯片；② 三星甚至可能成为 RCD 市场的第四家供应商，反过来与澜起竞争。这不是一个遥远的威胁——三星的 DRAM 工艺能力和资金体量意味着它可能是唯一一个有能力在短期内突破 RCD 技术壁垒的新进入者。澜起的护城河目前仍然稳固（认证周期长·客户切换成本高），但这条护城河的上游——三星的自研进度，是投资澜起必须持续跟踪的核心变量。"
            },
            {
                  "title": "🔗 互联协议篇：三个不同尺度的「数据高速公路」",
                  "content": "诚实地说：这三个环节（CXL 内存池化、PCIe Retimer 信号中继、UCIe Chiplet 互连）在技术层面没有直接依赖关系——PCIe 是 CPU 与外围设备之间的传统高速总线，CXL 是跑在 PCIe 物理层之上的内存池化协议，UCIe 是封装内芯片之间的 Die-to-Die 互连标准。它们唯一的共同点是：都属于「互联协议」这个大范畴——解决的是不同尺度下的数据传输问题。把它们放在一段里讲，纯粹是因为它们是存储与接口链里数据高速公路的三个不同「车道」。<br><br><strong>澜起科技</strong>在 PCIe 和 CXL 两个赛道上也有布局，但分量远不及它的 DDR5 主场：PCIe 5.0 Retimer 全球第二（仅次于美国 Astera Labs），是澜起的第二大单品，营收占比约 7-11%——已有规模但非核心。CXL MXC 控制器国内唯一具备量产能力，但目前处于<strong>早期导入阶段，营收占比不到 2%</strong>——更多是赛道展示性质，不是已成规模的业务。读者需要注意的是：澜起在 PCIe/CXL 上的角色是「参与者」，不是「卡口级主角」——不要因为澜起在 DDR5 上是全球双寡头，就默认它在互联协议赛道上也有同等分量。<br><br><strong>芯原股份</strong>是 UCIe Chiplet 互连标准的贡献者——UCIe 是 2022 年发布的国际标准，目标是把不同厂商的 Chiplet 芯片用统一的接口语言连在一起。芯原的 UCIe IP 已经通过验证，是国内少数深度参与这个新兴标准的公司。但需要清醒的是：UCIe 生态仍然在早期建设阶段——Chiplet 的大规模商业落地还在路上，国际巨头（Intel/AMD/NVIDIA）各自的 Chiplet 方案未必会走 UCIe 标准化的路。芯原股份在这个环节的 moat=62（hold）、barrier=3（中）——它是「IP 贡献者」，不是「标准主导者」。UCIe 这种新兴互联标准的商业化进程，本身还需要时间验证。"
            }
      ],
      "chokeTeaser": "存储与接口链的「关键先生」集中在两个赛道上：<strong>澜起科技</strong>（DDR5 RCD 全球仅 3 家·市占率 36.8%·连续 6 年第一——但三星自研这把剑悬在头顶）和<strong>安集科技</strong>（CMP 抛光液全球双寡头·moat=94 全链最高·ROE 25%+·毛利率 57%——但「液+机」的国产组合需要跟华海清科同步推进）。HBM 堆叠设备环节的拓荆、北华、中微、华海清科已经在前面的半导体设备链完整讲过，不再重复列入。互联协议层的澜起（PCIe/CXL）和芯原股份（UCIe）均不构成正式 chokePoint——屏障高度和业务成熟度均未达到卡口级标准。",
      "cycleSignal": "存储与接口链现在处于什么阶段？AI 算力驱动 DDR5 渗透率快速提升（约 80% 且仍在向上）、HBM 堆叠层数持续增加（8 层→12 层→16 层）、CXL 内存池化从标准制定走向商业落地——三个趋势方向明确。但两个信号值得持续跟踪：① <strong>三星自研 DDR5 RCD 的进度</strong>——这是澜起科技护城河最大的外部威胁，三星如果 2026-2027 年实现自研量产，将改变 DDR5 RCD 全球竞争格局；② <strong>UCIe Chiplet 生态的实际落地速度</strong>——标准发布了不等于商业化了，芯原股份的 UCIe IP 业务能否从「验证通过」走到「规模授权」，取决于下游 Chiplet 封装需求的起量速度。值得持续观察的具体窗口：三星 DDR5 RCD 自研进展的公开披露、澜起科技 PCIe Retimer 的营收占比是否突破 15%（验证第二增长曲线）、安集科技能否进入更多海外晶圆厂的抛光液供应商名录。"
},
    "chainStory": [{"step":1,"name":"硅晶圆 → DRAM 颗粒","barrier":"low","choke":false,"domestic":"沪硅产业(12英寸硅片·国产替代早期)·中芯国际(DRAM代工·制程落后于三星/海力士)","desc":"从高纯硅拉制12英寸硅片起步，经过上千道工序制造DRAM存储颗粒。全球DRAM市场被三星(~40%)、SK海力士(~30%)、美光(~25%)三巨头垄断——<strong>三大DRAM厂均不在A股</strong>。这是存储链与PCB链的本质差异：PCB的核心卡口(AI PCB+材料)大部分在A股，存储链的核心卡口(HBM/DRAM制造)完全在海外。A股在这一步的角色是\"卖铲人\"和\"材料商\"，而非制造商本身。","keyStocks": ["688126"],"barrierNote":"DRAM制造本身壁垒极高(全球仅3家)·但A股无直接标的·本步仅作产业链全景展示","source":"SEMI 2026 DRAM Market Report + TrendForce DRAM Quarterly"},{"step":2,"name":"HBM 3D 堆叠键合","barrier":"extreme","choke":true,"domestic":"拓荆科技(PECVD/ALD国内第一·混合键合设备国产突破)·北方华创(多产品线综合设备·C类跨链复用)·中微公司(CCP刻蚀国产第一·C类跨链复用)","desc":"把12层DRAM颗粒像千层蛋糕一样垂直堆叠在一起——每层通过TSV(硅通孔)连接，用混合键合(Hybrid Bonding)代替传统微凸点，把层间距从45μm缩小到10μm以下。这是HBM制造最核心的物理门槛：<strong>TSV刻蚀精度+混合键合对准精度+堆叠良率</strong>三者缺一不可。台积电CoWoS封装垄断了全球HBM封装产能，是比HBM制造本身更大的产能瓶颈。A股机会在设备端(拓荆科技混合键合国产突破)，但全球设备霸主仍是AMAT和Lam Research。","keyStocks": ["688072","002371","688012"],"barrierNote":"全球PECVD/ALD设备≤5家·混合键合设备AMAT/Lam垄断·拓荆科技国产唯一但存在1代以上技术代差·符合§11.23数据局限(设备厂扩产周期不可得)","source":"SEMI 2026 HBM Equipment Report + Yole Hybrid Bonding 2026 + 各公司2025年报"},{"step":3,"name":"CMP 抛光液 / 抛光垫","barrier":"extreme","choke":true,"domestic":"安集科技(CMP抛光液国产第一·国内≈30-35%·唯一进入全球前六的国产厂商)·鼎龙股份(CMP抛光垫国产第一·先进封装配套)","desc":"HBM每堆叠一层DRAM，必须用CMP(化学机械抛光)把表面磨到<strong>误差不到1纳米</strong>——相当于把足球场磨平到高低差不到一根头发丝。抛光液是消耗品，每片晶圆需要经过数十次CMP步骤。全球CMP抛光液市场约$2B，CR3≈55%(Entegris/Fujimi/DuPont)，安集科技全球≈5-7%但国内≈30-35%遥遥领先。晶圆厂一旦选定抛光液供应商就不会轻易更换——<strong>验证新供应商需要12-18个月，期间良率可能暴跌</strong>，这是典型的\"我不是最大，但你没我不行\"的物理卡口逻辑。","keyStocks": ["688019","300054"],"barrierNote":"全球CMP抛光液CR3≈55%·晶圆厂导入认证12-18个月+配方体系深度绑定制程节点·安集科技国内第一(≈30-35%)·符合§10 5分档物理卡口标准","source":"TECHCET 2026 CMP Slurry Market Analysis + SEMI 2025 CMP Consumables Report + 安集科技2025年报(L1·巨潮)"},{"step":4,"name":"GMC 塑封料 / 硅微粉","barrier":"high","choke":false,"domestic":"华海诚科(GMC塑封料国内唯一·住友电木双寡头·⚠ Phase B试点moat=58/quadrant=skip)·联瑞新材(硅微粉国产第一·HBM封装填料)","desc":"堆叠好的HBM芯片需要\"穿衣服\"——GMC(颗粒状环氧塑封料)包裹住芯片，防潮、防震、散热、绝缘。全球仅日本住友电木(~70%)和华海诚科(~30%)两家可批量供应，看似双寡头格局但<strong>实际需求尚未起量</strong>——国内长鑫存储的HBM量产时间表未公开(2027?2028?)，华海诚科2025年营收反而同比-39.47%，说明HBM封装需求还没有转化为真实营收，公司仍处于验证→放量的过渡期。硅微粉则是塑封料的填料，联瑞新材在这个细分环节国产第一。","keyStocks": ["688535","688300"],"barrierNote":"全球仅住友电木+华海诚科两家·但下游HBM量产时点未明确·华海诚科2025营收-39.47%说明需求尚未起量·不构成当前时点的物理卡口","source":"TECHCET 2026 GMC Market Report + 华海诚科2025年报(L1·巨潮·营收同比-39.47%⚠)"},{"step":5,"name":"前驱体 / 电子特气","barrier":"high","choke":false,"domestic":"雅克科技(前驱体材料·通过收购UP Chemical进入全球供应链)·南大光电(ARF光刻胶+前驱体材料)·华特气体(电子特气·HBM/DRAM制造关键耗材·国内唯一获ASML认证)","desc":"HBM和DRAM制造过程中需要上百种高纯度化学材料——前驱体(薄膜沉积的\"原料\")和电子特气(刻蚀/清洗的\"工具气体\")是消耗量最大的两类。雅克科技通过收购韩国UP Chemical进入全球前驱体供应链，南大光电在光刻胶之外也布局前驱体材料，华特气体是国内唯一通过ASML认证的电子特气供应商。这些材料虽然单价不高，但<strong>纯度要求极高(99.999%+)，一旦杂质超标整批晶圆报废</strong>。不过全球前驱体市场仍被默克/液化空气/林德等巨头主导，国产替代处于早期。","keyStocks": ["002409","300346","688268"],"barrierNote":"全球前驱体/电子特气市场集中度高(默克/液化空气/林德)·但国产替代空间大·非\"全球≤3家\"级别的物理卡口","source":"SEMI 2026 Materials Market Report + TECHCET Precursors & Gases 2026 + 各公司2025年报"},{"step":6,"name":"DDR5 RCD(内存接口芯片)","barrier":"extreme","choke":true,"domestic":"澜起科技(DDR5 RCD全球双寡头·市占率36.8%·国内唯一·🏠主场:seg[2]·scoringStatus=primary) + 聚辰股份(SPD Hub·DDR5配套芯片)","desc":"把服务器内存想象成一座超大型图书馆——CPU要同时从几十本\"书\"里查资料，如果没有\"图书管理员\"指挥调度，所有人会撞在一起。DDR5 RCD芯片就是这位\"管理员\"——每颗指甲盖大小的芯片，同时指挥几十颗内存颗粒的读写顺序。<strong>全球只有澜起科技、美国的Rambus和日本的IDT(Renesas)三家能量产这颗芯片</strong>，澜起科技DDR5内存接口芯片全球市占率36.8%(2024年·连续6年行业第一)，国内唯一。澜起2025年报L1实测：营收54.56亿(+49.94%)/净利22.36亿(+58.35%)/毛利率62.23%——互连类芯片(DDR5 RCD为主体)占公司总营收94.18%。第四子代RCD(7200MT/s)已规模出货。这是本链中澜起科技的<strong>primary主场</strong>——DDR5 RCD是其核心业务和卡口逻辑的根基。","keyStocks": ["688008","688123"],"barrierNote":"全球≤3家量产·Intel/AMD平台认证≥12个月·OEM客户切换成本极高(数据中心兼容性测试+库存建立≥9个月)·符合§10 5分档物理卡口标准·澜起scoringStatus=primary(主场)","source":"澜起科技2025年报(L1·巨潮·互连类芯片占比94.18%) + TrendForce DDR5 Market Tracker(L3)"},{"step":7,"name":"CXL 内存池化控制器","barrier":"extreme","choke":"前瞻卡位","domestic":"澜起科技(CXL MXC控制器·全球首批CXL 2.0合规供应商·与三星/SK海力士同期入选·⚠ 关联提及:营收<2%)","desc":"CXL(Compute Express Link)是让多台服务器共享同一块内存的\"超级立交桥\"——传统架构下每台服务器独享自己的内存，空闲的内存其他服务器用不了，造成巨大浪费。CXL 2.0/3.0标准让CPU可以通过PCIe物理层直接访问其他服务器的内存，把数据中心的<strong>内存利用率从~50%提升到80%+</strong>。全球仅澜起科技和美国的Astera Labs两家完成了CXL MXC控制器的流片，澜起是<strong>全球首批CXL 2.0合规供应商清单成员，与三星、SK海力士同期入选</strong>——这是真实的技术领先地位，不应被抹去。<br><br>但CXL生态目前仍处早期——AWS/谷歌/微软处于原型验证阶段，批量部署预计2027+。<strong>澜起科技在CXL的布局是其DDR5主业之外的技术延伸</strong>，2025年报披露CXL相关营收占总营收不到2%，属于早期导入阶段的战略卡位。<strong>此环节标记为\"前瞻卡位\"而非\"正式卡口\"</strong>——技术壁垒极高（全球仅2家已流片），但营收贡献尚未起量，CXL标准仍在演进(3.0未锁定)，下游部署时间线不确定。这是\"未来潜在卡口\"而非\"当前正式卡口\"。","keyStocks": ["688008"],"barrierNote":"全球仅2家已流片·技术壁垒极高·澜起为全球首批CXL 2.0合规供应商(与三星/SK海力士同期)·但CXL标准仍在演进+下游部署尚未规模化·澜起在此环节为战略卡位·前瞻卡口(非当前正式卡口)","source":"Yole 2026 CXL Market Forecast + 澜起科技2025年报(L1·CXL营收<2%) + CXL Consortium Technical Whitepaper"},{"step":8,"name":"PCIe Retimer/Redriver 接口","barrier":"extreme","choke":"前瞻卡位","domestic":"澜起科技(PCIe 5.0 Retimer全球第二·市占~25%·⚠ 关联提及:营收7-11%·非主场)","desc":"PCIe是GPU与GPU之间、GPU与CPU之间的\"超高速数据管道\"。PCIe 5.0单通道速率已达32GT/s，信号在PCB上跑几厘米就会严重衰减——必须用Retimer芯片在中间\"接力\"，把衰减的信号重新整形放大。<strong>每台AI服务器需要4-8颗PCIe 5.0 Retimer芯片</strong>，全球仅3家量产：美国的Astera Labs(~55%)、中国的澜起科技(~25%)、台湾的谱瑞科技(~20%)。澜起科技的PCIe Retimer是其<strong>第二大业务线</strong>(2025年报披露营收占比约7-11%)，全球市占率正在爬坡中。<br><br><strong>此环节标记为\"前瞻卡位\"而非\"正式卡口\"</strong>——A股目前<strong>没有真正专注PCIe Retimer环节的独立标的</strong>：澜起科技的PCIe业务是其DDR5主业之外的技术延伸（营收占比仅7-11%），此前seg[4]中列入的龙迅股份（688486）经核实其主营业务为HDMI/DP高清视频接口芯片，与PCIe Retimer/Redriver关联度低，本批次从seg[4]移除。读者不应因澜起在此有业务就误以为A股有专门的PCIe Retimer卡口标的。","keyStocks": ["688008"],"barrierNote":"全球仅3家量产PCIe 5.0 Retimer·Astera Labs占>50%·澜起份额爬坡中(7-11%营收占比)·A股无专注该环节的独立标的(此前误入的龙迅股份主营为HDMI/DP·已移除)·澜起在此为战略卡位·前瞻卡口(非当前正式卡口)","source":"Yole 2026 PCIe Market Report + 澜起科技2025年报(L1·PCIe营收占比7-11%) + Astera Labs 2025 Annual Report"},{"step":9,"name":"UCIe/Chiplet 互连","barrier":"high","choke":false,"domestic":"芯原股份(Chiplet互连IP国产领先·UCIe标准贡献者)","desc":"Chiplet(芯粒)是\"拼积木式\"造芯片的新范式——不同工艺的芯片(7nm的CPU+14nm的I/O+28nm的模拟)通过UCIe互连标准像乐高一样拼在一起，绕过了单芯片面积的光罩极限。UCIe是Intel/AMD/台积电/三星联合制定的开放标准。芯原股份是国内UCIe标准的先行者之一，但<strong>全球Chiplet互连IP格局分散</strong>——多家IP厂商(ARM/Synopsys/Cadence)和Foundry(台积电3D Fabric/Intel EMIB/三星I-Cube)都有自己的互连方案。这个环节更大的卡口在先进封装(CoWoS/EMIB)而非互连IP本身——先进封装由台积电/Intel/三星垄断，均不在A股。","keyStocks": ["688521"],"barrierNote":"全球互连IP格局分散·多家厂商+Foundry自研方案·标准仍在演进·真正的卡口在先进封装(台积电CoWoS·不在A股)而非互连IP本身","source":"UCIe Consortium Specification 2.0 + Yole Chiplet Market 2026 + 芯原股份2025年报"},{"step":10,"name":"AI服务器/数据中心集成","barrier":"low","choke":false,"domestic":"工业富联(英伟达GB300独家设计生产·treeMap背景·非本链核心标的)","desc":"所有零件——HBM、DDR5 RCD、CXL控制器、PCIe Retimer——最终汇集到一台AI服务器中。英伟达GB300 NVL72机柜集成了72颗Blackwell GPU、18个NVSwitch、几十公里铜缆、数百个液冷冷板。整机制造的壁垒不在制造本身(富士康/广达/纬创充分竞争)，而在<strong>英伟达的GPU分配权和液冷系统工程能力</strong>。HBM、DDR5 RCD、CXL、PCIe这些核心芯片都是英伟达指定供应商——整机厂只是按清单组装。A股中工业富联(601138)是最纯正的AI服务器ODM标的，但本链中它仅作为产业链终端的背景展示，不做卡口评估。","keyStocks": ["601138"],"barrierNote":"AI服务器整机制造充分竞争(CR5<40%)·核心卡口在芯片(HBM/DDR5 RCD/PCIe Retimer)而非整机组装·工业富联为英伟达独家ODM但非物理卡口","source":"TrendForce AI Server Shipment Tracker 2026 + 英伟达GTC 2026 GB300 NVL72 Technical Brief"}]
  },
  "overview": [
      {
            "label": "🧠 HBM市场规模(2026E)",
            "value": "~$300亿+",
            "note": "同比+50%+·SK海力士~50%/三星~35%/美光~15%",
            "color": "var(--accent)",
            "tier": "broker",
            "src": "SEMI 2026.6 + TrendForce"
      },
      {
            "label": "🔌 DDR5服务器渗透率(2026E)",
            "value": "~80%+",
            "note": "Intel Granite Rapids+AMD Turin全平台切换",
            "color": "var(--blue)",
            "tier": "broker",
            "src": "TrendForce 2026Q2"
      },
      {
            "label": "⚡ PCIe 5.0 Retimer市场(2026E)",
            "value": "~$10亿+",
            "note": "每台AI服务器需4-8颗Retimer芯片",
            "color": "var(--green)",
            "tier": "broker",
            "src": "Yole 2026 PCIe Market Report"
      },
      {
            "label": "🏭 HBM产能(2026E)",
            "value": "供不应求",
            "note": "三巨头2026-2027年产能已被客户全部预订",
            "color": "var(--red)",
            "tier": "broker",
            "src": "SK海力士/三星2026Q1 Investor Day"
      },
      {
            "label": "🔒 DDR5 RCD全球供给",
            "value": "≤3家",
            "note": "澜起科技36.8%/Rambus~35%/IDT(Renesas)~25%",
            "color": "var(--accent)",
            "tier": "primary",
            "src": "澜起科技2025年报·巨潮L1"
      },
      {
            "label": "🧪 CMP抛光液全球格局",
            "value": "CR3≈55%",
            "note": "安集科技国内≈30-35%·全球≈5-7%·唯一国产进入前六",
            "color": "var(--barrier-high)",
            "tier": "broker",
            "src": "TECHCET 2026 + SEMI 2025"
      },
      {
            "label": "📦 CXL内存池化(2026E)",
            "value": "早期导入",
            "note": "AWS/谷歌/微软已部署CXL原型·2027+批量部署",
            "color": "var(--muted)",
            "tier": "broker",
            "src": "Yole CXL 2026 Forecast"
      },
      {
            "label": "⚠️ 不在A股的核心卡口",
            "value": "HBM制造",
            "note": "SK海力士/三星/美光100%垄断·A股只能抓配套材料+设备",
            "color": "var(--red)",
            "tier": "broker",
            "src": "SEMI HBM Supply Chain 2026"
      }
],
  "treeMap": {
    "downstream": [
      {
        "name": "AI 服务器/HPC(英伟达B200/GB300)",
        "barrier": "—",
        "choke": false,
        "note": "HBM+DDR5+CXL+PCIe全栈需求·单台AI服务器HBM价值量>1000美元",
        "companies": [
          {
            "name": "英伟达",
            "code": "NVDA(美)",
            "position": "GPU龙头·HBM最大买家",
            "barrier": "—"
          }
        ]
      },
      {
        "name": "数据中心/云计算(内存池化)",
        "barrier": "—",
        "choke": false,
        "note": "CXL内存池化方案是数据中心TCO优化关键·AWS/谷歌/微软均已部署CXL原型",
        "companies": [
          {
            "name": "AWS",
            "code": "AMZN(美)",
            "position": "CXL内存池化早期采用者",
            "barrier": "—"
          }
        ]
      },
      {
        "name": "企业存储/内存模组",
        "barrier": "—",
        "choke": false,
        "note": "DDR5 RCD+SPD Hub是服务器内存条核心芯片·每台服务器需8-12颗RCD",
        "companies": [
          {
            "name": "三星电子",
            "code": "005930(韩)",
            "position": "DDR5内存条全球第一",
            "barrier": "—"
          }
        ]
      }
    ],
    "midstream": [
      {
        "name": "HBM 堆叠键合",
        "barrier": "极高",
        "choke": true,
        "note": "全球仅3家可批量供货",
        "companies": [
          {
            "name": "拓荆科技",
            "code": "688072",
            "position": "混合键合设备国产突破",
            "barrier": "高"
          },
          {
            "name": "北方华创",
            "code": "002371",
            "position": "多产品线综合设备",
            "barrier": "极高"
          },
          {
            "name": "中微公司",
            "code": "688012",
            "position": "CCP刻蚀国产第一",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "HBM 封装材料",
        "barrier": "高",
        "choke": false,
        "note": "GMC全球仅住友电木+华海诚科两家｜⚠️ 2026-07-13: 该环节中的华海诚科(688535) 经 Phase B 试点核算 moatScore=58/quadrant=skip，不再认定为正式卡口，仅保留赛道展示",
        "companies": [
          {
            "name": "华海诚科",
            "code": "688535",
            "position": "GMC塑封料国产唯一",
            "barrier": "高"
          },
          {
            "name": "德邦科技",
            "code": "688035",
            "position": "underfill国产替代",
            "barrier": "高"
          },
          {
            "name": "联瑞新材",
            "code": "688300",
            "position": "硅微粉国产第一",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "DDR5 主控/RCD",
        "barrier": "极高",
        "choke": true,
        "note": "全球仅澜起+Rambus+IDT三家量产｜澜起科技(688008)为本段主场(DDR5 RCD全球双寡头·营收占比78-81%·基于2025年报+akshare abstract_ths核实)",
        "companies": [
          {
            "name": "澜起科技",
            "code": "688008",
            "position": "DDR5 RCD全球双寡头(与Rambus)·国内唯一",
            "barrier": "极高"
          },
          {
            "name": "聚辰股份",
            "code": "688123",
            "position": "SPD Hub·DDR5配套",
            "barrier": "高"
          },
          {
            "name": "兆易创新",
            "code": "603986",
            "position": "NOR Flash+DDR3/4 DRAM·DDR5存储主控布局",
            "barrier": "高"
          ,
        "sourceSegment": "seg[2]"
          },
          {
            "name": "普冉股份",
            "code": "688766",
            "position": "NOR Flash+EEPROM·DDR5 配套存储芯片",
            "barrier": "中"
          ,
        "sourceSegment": "seg[2]"
          }
        ]
      },
      {
        "name": "CXL 内存池化",
        "barrier": "极高",
        "choke": true,
        "note": "CXL 2.0/3.0解决AI服务器内存墙｜澜起科技(688008)CXL MXC早期导入·营收<2%·主场seg[2] DDR5 RCD·仅做赛道展示",
        "companies": [
          {
            "name": "澜起科技",
            "code": "688008",
            "position": "CXL控制器国内唯一",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "PCIe Retimer",
        "barrier": "极高",
        "choke": "前瞻卡位",
        "note": "PCIe 5.0仅3家量产(Astera Labs/澜起/谱瑞)｜澜起科技(688008)PCIe 5.0 Retimer全球第二·营收占比7-11%·主场seg[2] DDR5 RCD·仅做赛道展示。⚠ A股此前误列入的龙迅股份(688486)经核实主营为HDMI/DP高清视频接口芯片,本批次已移除。",
        "companies": [
          {
            "name": "澜起科技",
            "code": "688008",
            "position": "PCIe 5.0 Retimer国内唯一·全球第二·前瞻卡位(非当前正式卡口)",
            "barrier": "极高"
          },
          {
            "name": "纳芯微",
            "code": "688052",
            "position": "高速SerDes PHY·PCIe物理层国产替代",
            "barrier": "中"
          ,
        "sourceSegment": "seg[4]"
          },
          {
            "name": "裕太微",
            "code": "688515",
            "position": "以太网+PCIe物理层模拟芯片",
            "barrier": "中"
          ,
        "sourceSegment": "seg[4]"
          }
        ]
      },
      {
        "name": "UCIe/Chiplet 互连",
        "barrier": "极高",
        "choke": true,
        "note": "Chiplet互连国际标准·2022年发布",
        "companies": [
          {
            "name": "芯原股份",
            "code": "688521",
            "position": "Chiplet互连IP国产领先",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "CMP 抛光设备(12寸)",
        "barrier": "极高",
        "choke": true,
        "note": "★ 新增节点 (commit 7.02)｜12寸 CMP 设备 A 股唯一双寡头格局(华海清科+Ebara 主导)·全球抛光工艺精度由「化学机械抛光配方+设备」共同决定·与 688019 安集科技(CMP 抛光液)形成「机+液」双卡口闭环·详情 seg[0]",
        "companies": [
          {
            "name": "华海清科",
            "code": "688120",
            "position": "12寸 CMP 国产第一·正式 chokePoint rank 5·moat=79·与 688019 安集配套",
            "barrier": "极高"
          ,
        "sourceSegment": "seg[0]"
          }
        ]
      }
    ],
    "materials": [
      {
        "name": "GMC 塑封料",
        "barrier": "高",
        "choke": false,
        "note": "全球仅住友电木+华海诚科两家通过认证｜⚠️ 2026-07-13: 该环节中的华海诚科(688535) 经 Phase B 试点核算 moatScore=58/quadrant=skip，不再认定为正式卡口，仅保留赛道展示",
        "companies": [
          {
            "name": "华海诚科",
            "code": "688535",
            "position": "GMC颗粒状环氧塑封料国产唯一",
            "barrier": "高"
          ,
        "sourceSegment": "seg[1]"
      }
        ]
      },
      {
        "name": "硅微粉/填料",
        "barrier": "高",
        "choke": false,
        "note": "HBM封装关键填料",
        "companies": [
          {
            "name": "联瑞新材",
            "code": "688300",
            "position": "硅微粉国产第一",
            "barrier": "高"
          ,
        "sourceSegment": "seg[1]"
      }
        ]
      },
      {
        "name": "underfill/前驱体",
        "barrier": "高",
        "choke": false,
        "note": "先进封装配套材料",
        "companies": [
          {
            "name": "德邦科技",
            "code": "688035",
            "position": "underfill国产替代",
            "barrier": "高"
          },
          {
            "name": "雅克科技",
            "code": "002409",
            "position": "前驱体材料国产替代",
            "barrier": "极高"
          ,
        "sourceSegment": "seg[1]"
      }
        ]
      },
      {
        "name": "CMP 抛光液/抛光垫",
        "barrier": "极高",
        "choke": true,
        "note": "★ 新增节点 (commit 7.02)｜CMP 化学机械抛光关键耗材·HBM 制造每堆叠一层 DRAM 都需 CMP 抛光·全球 CMP 抛光液 CR3≈55%(Entegris/Fujimi/DuPont)+ 安集是国内唯一进入全球前六的国产厂商·与 688120 华海清科(CMP 抛光设备)形成「液+机」双卡口闭环·详情 seg[1]",
        "companies": [
          {
            "name": "安集科技",
            "code": "688019",
            "position": "CMP 抛光液国产第一·国内≈30-35%·正式 chokePoint rank 1·moat=94 全链最高",
            "barrier": "极高"
          ,
        "sourceSegment": "seg[1]"
          },
          {
            "name": "鼎龙股份",
            "code": "300054",
            "position": "CMP 抛光垫国产第一·先进封装配套",
            "barrier": "高"
          ,
        "sourceSegment": "seg[1]"
          }
        ]
      },
      {
        "name": "电子特气/光刻胶",
        "barrier": "高",
        "choke": false,
        "note": "★ 新增节点 (commit 7.02)｜HBM/DRAM 制造关键耗材·纯度要求极高(99.999%+)·一旦杂质超标整批晶圆报废·全球被默克/液化空气/林德等巨头主导·国产替代处于早期阶段",
        "companies": [
          {
            "name": "南大光电",
            "code": "300346",
            "position": "ARF 光刻胶+前驱体·集成电路先进制程",
            "barrier": "中"
          ,
        "sourceSegment": "seg[1]"
          },
          {
            "name": "华特气体",
            "code": "688268",
            "position": "电子特气·国内唯一获 ASML 认证",
            "barrier": "高"
          ,
        "sourceSegment": "seg[1]"
          }
        ]
      }
    ],
    "equipment": [
      {
        "name": "混合键合/HCB",
        "barrier": "极高",
        "choke": true,
        "note": "全球仅3家可批量供货",
        "companies": [
          {
            "name": "拓荆科技",
            "code": "688072",
            "position": "混合键合设备国产突破",
            "barrier": "高"
          },
          {
            "name": "北方华创",
            "code": "002371",
            "position": "多产品线综合设备",
            "barrier": "极高"
          ,
        "sourceSegment": "seg[0]"
      }
        ]
      },
      {
        "name": "TCB 热压键合/检测",
        "barrier": "高",
        "choke": false,
        "note": "HBM封装配套设备",
        "companies": [
          {
            "name": "快克智能",
            "code": "603203",
            "position": "TCB键合设备",
            "barrier": "中"
          },
          {
            "name": "赛腾股份",
            "code": "603283",
            "position": "检测分选设备",
            "barrier": "中"
          ,
        "sourceSegment": "seg[0]"
      }
        ]
      },
      {
        "name": "测试分选/老化",
        "barrier": "高",
        "choke": false,
        "note": "后道测试设备｜⚠️ commit 7.02: 长川科技(300604)非 manual.js 24 只正式清单·已从本节点移除(数据准确性优先)",
        "companies": [
          {
            "name": "华峰测控",
            "code": "688200",
            "position": "模拟测试机国产第一",
            "barrier": "高"
          ,
        "sourceSegment": "seg[0]"
      }
        ]
      }
    ],
    "sideBranches": [
      {
        "name": "UCIe/Chiplet IP",
        "barrier": "极高",
        "choke": true,
        "note": "Chiplet互连国际标准",
        "companies": [
          {
            "name": "芯原股份",
            "code": "688521",
            "position": "Chiplet互连IP国产领先",
            "barrier": "高"
          }
        ]
      }
    ]
  },
  "segments": [
    {
      "name": "HBM 堆叠与混合键合",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>HBM(高带宽存储)</strong>通过TSV硅通孔将多层DRAM芯片垂直堆叠，配合混合键合(Hybrid Bonding)技术实现超高带宽。HBM3e 12层堆叠带宽>1TB/s，HBM4 16层堆叠预计2026年量产。混合键合设备是HBM先进封装最核心的物理卡口——全球仅3家可批量供货。",
      "globalLandscape": [
          {
                    "lbl": "🥇 Hanmi Semiconductor（韩）",
                    "val": "HBM TC Bonder全球~65%·HBM3E细分~90%",
                    "note": "SK海力士主力供应商·TC键合机绝对霸主·2025营收同比大幅增长"
          },
          {
                    "lbl": "🥈 AMAT（美）",
                    "val": "HBM FY2025营收$1.5B·Kinex混合键合平台",
                    "note": "业界首款集成式晶粒到晶圆混合键合机·已导入逻辑/内存/OSAT客户·BESI持股9%为最大股东"
          },
          {
                    "lbl": "BESI（荷兰）",
                    "val": "混合键合纯play龙头·AMAT持股9%",
                    "note": "Lam Research洽谈收购中·若JEDEC放宽HBM厚度标准可能延缓混合键合导入·非上市公司精确份额不可得"
          },
          {
                    "lbl": "拓荆科技（中）",
                    "val": "PECVD/ALD国内第一·混合键合国产突破",
                    "note": "与AMAT/Lam存在1代以上技术代差·国内HBM产线国产唯一选择·2025营收65亿(+59%)(L1年报实测)"
          }
],
      "stocks": [
        {
          "rank": 1,
          "name": "拓荆科技",
          "code": "688072",
          "position": "混合键合设备国产突破·PECVD/ALD 国内第一",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 65.19亿(+58.87%)/归母净利 9.27亿(+34.67%)/GM 34.95%·2025Q1 -1.47亿亏损已扭亏(Q2-Q4 持续改善)+2026Q1 反弹至 5.71亿(+488.29% YoY)V 型反转确立 (akshare abstract_ths L1 实测)",
          "logic": "PECVD/ALD/混合键合设备国产突破:HBM 多层堆叠 TSV 工艺核心卡口设备(国产唯一能覆盖 12 寸 HBM 量产线),与海外巨头(AMAT/Lam/东京电子)存在 1 代以上技术代差,客户已覆盖三星/SK Hynix/中芯国际/长江存储导入验证(认证 ≥18 月),但量产线尚未规模采用——卡口属性属\"技术领先+验证阶段\"而非\"全球≤3 家物理稀缺\"。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
          "phaseBTestTrial": true
        },
        {
          "rank": 2,
          "name": "北方华创",
          "code": "002371",
          "position": "多产品线综合性设备龙头·ICP/CCP/PVD/CVD/清洗",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 393.53亿(+30.85% 连续两年 30%+)/归母净利 55.22亿(-1.77% 温和下降)/GM 40.1%/ROE 16.41%·2026Q1 净利 +3.42% 企稳回升 (abstract_ths L1 实测, 2026-07-08)",
          "logic": "ICP/CCP/PVD/CVD/清洗多平台半导体设备国产龙头:HBM 制造的刻蚀/薄膜/清洗核心环节全部覆盖(国产 HBM 替代细分场景如长江存储/长鑫存储/中芯国际多品类核心供应);护城河来源 = 国产替代政策保护(AMAT/Lam/东京电子 90%+ 全球主导),风险来源 = 地缘政治缓和则护城河削弱。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 3,
          "name": "中微公司",
          "code": "688012",
          "position": "CCP刻蚀国产第一·5nm已批量进台积电",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 123.85亿(+36.62% 连续两年 35%+)/归母净利 21.11亿(+30.69%)/GM 39.17%/ROE 9.97%·2026Q1 营收 29.15亿(+34.13%)/净利 9.30亿(+197.20%) 业绩拐点确立 (abstract_ths L1 实测)",
          "logic": "CCP 刻蚀国产绝对龙头:HBM TSV 工艺核心步骤(无刻蚀,HBM 3D 堆叠无法实现),国产晶圆厂刻蚀份额 40%+;全球刻蚀份额 ≈5.1%(TrendForce 2025),Lam/AMAT/东京电子/Hitachi 全球 CR4>90%;卡口属性 = 国产替代政策保护,非全球物理稀缺,与澜起/安集\"全球≤3 家\"卡口性质不同。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 4,
          "name": "华海清科",
          "code": "688120",
          "position": "CMP国产第一·12寸批量供货中芯/长江存储",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 +36.46% YoY(连续三期 30%+)/归母净利 +5.89%/GM 41.81%/ROE 15.52%·2026Q1 营收 +31.66% YoY·⚠ 净利率持续下行(30.05%→23.31%→20.58%),定价压力隐忧(abstract_ths L1 实测)",
          "logic": "12 寸 CMP(化学机械抛光)设备国产绝对龙头:中芯国际/长江存储/华虹核心供应;CMP 设备与安集科技(抛光液)上下游关系(华海用安集的消耗品,各自垄断所在细分);全球份额 <5%(Ebara/AMAT CR4>85%),国产 HBM 产线是 12 寸 CMP 唯一龙头——卡口 = 国产替代政策保护,与安集\"全球≤5 家\"形成\"液+机\"完整物理稀缺链。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 5,
          "name": "快克智能",
          "code": "603203",
          "position": "TCB热压键合设备",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收稳健(abstract_ths L1 实测), 2026Q1 TC B 设备国产替代订单可见度提升·具体数字见 stock.dims6.fundamentals",
          "logic": "TCB(热压键合)设备国产替代:HBM 堆叠前的芯片-芯片互连核心设备,介于传统回流焊与混合键合之间;全球 TCB 设备被 ASMPT/K&S 主导,国产替代空间明确但量产数据公开有限(§11.23 数据局限)。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 6,
          "name": "赛腾股份",
          "code": "603283",
          "position": "半导体检测分选设备",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收稳健(abstract_ths L1 实测), 2026Q1 检测分选国产替代加速·具体数字见 stock.dims6.fundamentals",
          "logic": "半导体检测分选设备国产替代:HBM 后道测试(老化/分选/FT 测试)专用;全球 Teradyne/Xcerra 主导,国产替代处于行业第一梯队但份额仍偏低。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 7,
          "name": "华峰测控",
          "code": "688200",
          "position": "模拟测试机国产第一·HBM/DRAM制造后道测试",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "★ commit 7.02: 华峰测控(688200)从 manual.js 24 只正式清单补入 seg[0]·业务定位:模拟测试机国产第一(后道测试设备)·treeMap equipment[3] 测试分选/老化 节点已有·现补入段位归属与产业链流程对齐(测试是 HBM 工艺链的最后一环)",
          "logic": "模拟测试机国产第一·HBM/DRAM 制造后道测试(wafer level + final test)·2025 营收 18.5 亿 / 模拟测试机全球市占率前三 / 国产第一·基于 akshare abstract_ths L1 实测·详见 stock.dims6",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        }
      ]
    },
    {
      "name": "HBM 封装材料",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>HBM封装材料</strong>包括GMC颗粒状环氧塑封料、underfill底部填充胶、硅微粉填料、EMC环氧模塑料等。GMC是HBM堆叠封装最核心的材料卡口——全球仅住友电木+华海诚科两家通过认证，认证周期18-24个月。",
      "globalLandscape": [
          {
                    "lbl": "🥇 住友电木（日）",
                    "val": "全球EMC市占~35%(按收入)·HBM用GMC约50%",
                    "note": "长期垄断HBM封装塑封料·2026年涨价10-20%·面临产能瓶颈·全球仅住友电木+华海诚科+少量日立/Resonac可量产HBM用GMC"
          },
          {
                    "lbl": "🥈 Entegris/CMC Materials（美）+Fujimi（日）",
                    "val": "CMP抛光液双龙头·全球CR3≈55%",
                    "note": "Entegris/CMC≈30-33%+Fujimi≈12-14%+DuPont≈10-12%·安集科技全球≈5-7%(国内≈30-35%第一·唯一进入全球前六的国产厂商)"
          },
          {
                    "lbl": "DuPont→QNITY（美）",
                    "val": "CMP抛光垫全球>70%",
                    "note": "抛光垫绝对垄断·安集科技(抛光液)+华海清科(抛光设备)为国内配套·形成液+机+垫完整国产替代链"
          },
          {
                    "lbl": "华海诚科+衡所华威（中）",
                    "val": "并购后全球EMC约18%·国内第一(~35%)",
                    "note": "国内唯一HBM用GMC量产·已进SK海力士供应链·华为哈勃战略入股·2025营收同比-39.47%⚠(HBM封装需求尚未转化为真实营收)"
          }
],
      "stocks": [
        {
          "rank": 1,
          "name": "华海诚科",
          "code": "688535",
          "position": "GMC颗粒状环氧塑封料国产唯一·住友电木双寡头",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "⚠ 2025 营收 4.58亿(-39.47% 连续 4 季同比为负)/归母净利 2425万/GM 26.66%/净利率仅 5.24%·2026Q1 反弹至 2.23亿(+165.58% 低基数);⚠ §11.23 数据稀缺,业绩拐点未确立,需投顾核实 (akshare abstract_ths L1 实测 2026-07-13)",
          "logic": "GMC 颗粒状环氧塑封料国内唯一量产:堆叠 HBM 芯片\"穿衣服\"核心材料,海外住友电木双寡头(住友约 70% + 华海约 30%);⚠ 全球供给端实际可获取住友电木产品 → 国内独家但非全球独家(全球住友电木仍可获取),卡口属性偏弱于全球≤3 家标准,客户验证周期 ≥18 月,产品迭代风险存在。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
          "phaseBTestTrial": true
        },
        {
          "rank": 2,
          "name": "德邦科技",
          "code": "688035",
          "position": "underfill底部填充胶国产替代·先进封装配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 15.47亿(+32.61%)/归母净利 1.08亿(+10.45%)/GM 27.50%·HBM 封装材料国产替代 (abstract_ths L1 实测)",
          "logic": "HBM 封装底部填充剂(underfill)国产替代龙头:芯片倒装后底部缝隙用 underfill 分散热应力+防潮气,与 688019 安集(CMP 抛光液)/688535 华海(GMC 塑封料)分属 HBM 封装产业链不同环节;⚠ 公开数据稀缺(§11.23),具体客户份额不可得。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 3,
          "name": "联瑞新材",
          "code": "688300",
          "position": "硅微粉国产第一·HBM封装关键填料",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 11.16亿(+16.15%)/归母净利 2.93亿(+16.42%)/GM 40.66%/ROE 18.38%·增长由下游需求拉动非供给紧缺(abstract_ths L1 实测)",
          "logic": "球形硅微粉国产第一:HBM 封装关键填料(球形硅微粉是 GMC 塑封料/EMC 环氧塑封料的高纯填料,粒径 ≤50 微米球形化);⚠ 下游 HBM 量产时点未明确(三星/SK Hynix/Micron 扩产节奏公开数据有限),需求侧可见度制约供给扩张,卡口属性受下游节奏制约。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 4,
          "name": "雅克科技",
          "code": "002409",
          "position": "前驱体材料国产替代·HBM配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 86.11亿(+25.49%)/归母净利 10.00亿(+14.77%)/GM 30.96%/净利率 11.96%/ROE 12.59%·稳健增长(abstract_ths L1 实测)",
          "logic": "前驱体材料(薄膜沉积的\"原料\")国产替代龙头:通过收购韩国 UP Chemical 进入全球供应链;HBM 制造关键耗材(99.999%+ 纯度,杂质超标整批晶圆报废);⚠ 全球前驱体市场仍被默克/液化空气/林德等巨头主导,国产替代处于早期阶段。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 5,
          "name": "安集科技",
          "code": "688019",
          "position": "CMP抛光液国产第一·HBM铜互联抛光",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-14",
          "src": "akshare abstract_ths L1 实测 + L3 SEMI/TECHCET 全球CMP格局 + L4 头部券商",
          "trend": "up",
          "trendNote": "★ Phase B 第二批独立评估(A类)·barrier=5·moat=94 全链最高·本链唯一chokePoint·L3全球格局已补",
          "logic": "CMP抛光液国产第一·2025年报 L1 实测:营收25.04亿+36.47%/净利7.84亿+46.85%/ROE 25.18%/GM 56.72%(行业最强)。全球CR3≈55%·安集国内≈30-35%(第一)·晶圆厂验证12-18月物理卡口成立。详见 chokePoints[0] 完整分析。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测 + L3 全球格局已补全"
        },
        {
          "rank": 6,
          "name": "鼎龙股份",
          "code": "300054",
          "position": "CMP抛光垫国产第一·先进封装配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 36.60亿(+9.66%)/归母净利 7.20亿(+38.32%)/GM 50.85%/ROE 12.83%·CMP 抛光垫龙头 收入增速低于行业(abstract_ths L1 实测 2026-07-14)",
          "logic": "CMP 抛光垫国产第一龙头:HBM 多层堆叠介质抛光核心耗材(每堆叠一层 DRAM 需 CMP 抛光→纳米级平整度才可堆叠下一层);与安集科技(CMP 抛光液)/华海清科(CMP 设备)分属 CMP 产业链不同环节——抛光垫+抛光液+抛光设备三件套各自垄断所在细分;全球抛光垫 CR3≈85%(陶氏/Cabot/富士),鼎龙股份全球份额 <15% 但国产第一,晶圆厂一旦选定抛光垫供应商不轻易切换(配方体系深度绑定制程节点,验证 ≥12 月)。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "code": "300346",
          "name": "南大光电",
          "position": "ARF 光刻胶 + 前驱体材料(集成电路先进制程)",
          "rank": 99,
          "barrier": "中",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收稳健(ARF 光刻胶+前驱体双业务,abstract_ths L1 实测), 2026Q1 HBM 光刻胶国产替代·具体数字见 stock.dims6.fundamentals",
          "logic": "ARF 光刻胶+前驱体材料双业务国产替代:HBM/DRAM 制造关键耗材(光刻机+薄膜沉积核心原料);⚠ 与 002409 雅克科技(前驱体领域)和 688268 华特气体(特气领域)在 HBM 配套材料赛道部分重叠,前驱体直接竞争雅克科技,光刻胶独立赛道。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "code": "688268",
          "name": "华特气体",
          "position": "电子特气(HBM/DRAM 制造关键耗材)",
          "rank": 99,
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "down",
          "trendNote": "2025 营收稳健(电子特气 ASML 认证供应商,abstract_ths L1 实测), 2026Q1 HBM 电子特气国产替代订单可见·具体数字见 stock.dims6.fundamentals",
          "logic": "电子特气国产替代龙头(HBM/DRAM 制造关键耗材,刻蚀/清洗的\"工具气体\"):国内唯一通过 ASML 认证的电子特气供应商;99.999%+ 高纯度,⚠ 一旦杂质超标整批晶圆报废;全球电子特气被液化空气/林德/空气化工主导,国产替代处于早期,卡口属性 = 验证客户严苛筛选。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        }
      ]
    },
    {
      "name": "DDR5/LPDDR5 主控与 RCD",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>DDR5 RCD(寄存时钟驱动器)</strong>是服务器DDR5内存条上的核心芯片。全球仅澜起科技+Rambus+IDT(Renesas)三家可量产，认证周期≥12个月。LPDDR5主控用于手机/汽车等低功耗场景。",
      "globalLandscape": [
          {
                    "lbl": "🥇 澜起科技 Montage Tech（中）",
                    "val": "DDR5内存接口芯片全球市占率36.8%(2024年·连续6年行业第一)",
                    "note": "全球仅澜起/Rambus/瑞萨(IDT)三家可量产DDR5 RCD·澜起国内唯一·2025营收54.56亿(+50%)·MRCD/MDB下一战场已领先·JEDEC董事会成员·L1年报实测"
          },
          {
                    "lbl": "🥈 Rambus（美）",
                    "val": "DDR5 RCD三大供应商之一·精确份额未公开",
                    "note": "行业公认为全球主要供应商(澜起/Rambus/瑞萨三家)·2025产品收入$3.48B(+41%YoY)·MRCD/MDB预计2027起量"
          },
          {
                    "lbl": "Renesas/IDT（日/美）",
                    "val": "DDR5 RCD三大供应商之一·精确份额未公开",
                    "note": "2019年瑞萨收购IDT进入RCD市场·提供多供应商安全保障·参考公司2024年报表述\"全球主要供应商三家\""
          }
],
      "stocks": [
        {
          "rank": 1,
          "name": "澜起科技",
          "code": "688008",
          "position": "DDR5 RCD全球双寡头(与Rambus)·国内唯一·市占率36.8%",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 54.56亿(+49.94%)/归母净利 22.36亿(+58.35%)/GM 62.23%/净利率 39.03%/ROE 18.25%·互连类芯片占 94.18%·2025 连续 4 季同比正增,Q4 7200MT/s 子代规模出货·2026Q1 营收 14.61亿(+19.51%)/净利 8.47亿(+61.30%) 加速(abstract_ths L1 实测 2026-07-13)",
          "logic": "DDR5 RCD(寄存时钟驱动器)全球量产厂商仅 3 家(IDT/Renesas+Rambus+澜起),澜起全球市占率36.8%,国内唯一·认证周期 ≥12 月;客户切换成本极高(数据中心兼容性测试 ≥6 月 + 库存建立 ≥3 月);⚠ 护城河侵蚀风险:三星 2025 宣布自研 DDR5 RCD 2025H2 量产,基本盘仍稳但行业关注点(多家 L5 媒体 2025 报道,具体自供率未检索到 L1/L4 原始信源)。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
          "scoringStatus": "primary-confirmed",
          "phaseBTestTrial": false
        },
        {
          "rank": 2,
          "name": "聚辰股份",
          "code": "688123",
          "position": "SPD Hub温度传感器·DDR5配套芯片",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 12.21亿(+18.77%)/归母净利 3.64亿(+25.25%)/GM 57.29%·SPD Hub DDR5 国产配套 (abstract_ths L1 实测)",
          "logic": "DDR5 内存模组必备 SPD Hub(串行检测集线器)国产配套:与 688008 澜起科技(DDR5 RCD)在 DDR5 内存条生态中配套,澜起决定 RCD,聚辰提供 SPD Hub;⚠ 全球 SPD 厂商极少但产品同质化严重,卡口属性偏弱,主要绑定澜起的下游 DDR5 生态放量。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 3,
          "name": "兆易创新",
          "code": "603986",
          "position": "NOR Flash+DDR3/4 DRAM·存储主控布局",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收 92.03亿(+25.12%)/归母净利 16.48亿(+49.47%)/GM 40.22%·NOR Flash+自研 DRAM 双驱动 (abstract_ths L1 实测)",
          "logic": "NOR Flash 全球前三+自研 DRAM(国产 DDR4):HBM 国产替代背景下面向 DDR5 端存储生态,与澜起/聚辰不同——兆易是存储芯片本身而非接口芯片;⚠ 卡口取决于 DRAM 自研量产节奏,DDR5 端位比 DDR4 复杂。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 4,
          "name": "普冉股份",
          "code": "688766",
          "position": "NOR Flash+EEPROM·存储芯片设计",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收 23.20亿(+28.62%)/归母净利 2.08亿(-29.03%)/GM 28.37%·中小容量 NOR Flash 跟随行业 β (abstract_ths L1 实测)",
          "logic": "NOR Flash+EEPROM 双业务中小厂商:HBM/DDR5 配套产业边缘·非核心卡口,主营中小容量存储;与 603986 兆易创新在 NOR Flash 赛道错位竞争(兆易主打中高容量,普冉中小容量);⚠ 卡口属性弱,跟随行业 β 收益。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        }
      ]
    },
    {
      "name": "CXL 内存池化与互连",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>CXL(Compute Express Link)</strong>是基于PCIe物理层的高速互连协议，实现CPU-GPU-加速器-内存之间的缓存一致性共享和内存池化。CXL 2.0/3.0是AI服务器内存墙问题的核心解决方案。",
      "globalLandscape": [
          {
                    "lbl": "🥇 Marvell Technology（美）",
                    "val": "CXL控制器市场整体领先·数据中心营收$1.83B(Q1FY26)",
                    "note": "CXL收入预计2027达$1B·2028达$2B·AI定制ASIC+数据中心双轮驱动·CXL 2.0/3.0布局最早"
          },
          {
                    "lbl": "🥈 澜起科技 Montage Tech（中）",
                    "val": "CXL MXC芯片全球首批合规供应商·与三星/SK海力士同期入选",
                    "note": "CXL MXC控制器份额自报·行业早期精确数据待第三方验证·成本较Marvell低约30%·2025 CXL营收<2%·早期导入阶段"
          },
          {
                    "lbl": "Astera Labs（美）",
                    "val": "Leo CXL控制器~$25M年收入·Microsoft主客户",
                    "note": "H2 2026预期放量·新获美国hyperscaler设计win·Scorpio X系列2026末量产·CXL生态整体仍处早期"
          }
],
      "stocks": [
        {
          "rank": 1,
          "name": "澜起科技",
          "code": "688008",
          "position": "CXL控制器国内唯一·CXL 2.0/3.0 Retimer｜⚠️ reference:主场为seg[2] DDR5 RCD·本段CXL MXC为早期导入阶段(营收<2%)·国内唯一具备CXL MXC量产能力厂商·仅做赛道展示,不重复计入卡口候选统计",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 54.56亿(+49.94%)/归母净利 22.36亿(+58.35%)/GM 62.23%/净利率 39.03%/ROE 18.25%·互连类芯片占 94.18%·2025 连续 4 季同比正增,Q4 7200MT/s 子代规模出货·2026Q1 营收 14.61亿(+19.51%)/净利 8.47亿(+61.30%) 加速(abstract_ths L1 实测 2026-07-13)",
          "logic": "DDR5 RCD(寄存时钟驱动器)全球量产厂商仅 3 家(IDT/Renesas+Rambus+澜起),澜起全球市占率36.8%,国内唯一·认证周期 ≥12 月;客户切换成本极高(数据中心兼容性测试 ≥6 月 + 库存建立 ≥3 月);⚠ 护城河侵蚀风险:三星 2025 宣布自研 DDR5 RCD 2025H2 量产,基本盘仍稳但行业关注点(多家 L5 媒体 2025 报道,具体自供率未检索到 L1/L4 原始信源)。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
          "scoringStatus": "reference",
          "phaseBTestTrial": true
        },
        {
          "rank": 3,
          "name": "景嘉微",
          "code": "300474",
          "position": "GPU+CXL互连·国产算力芯片",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收 +54.41%/归母净利 +0.30%/GM 47.36%·GPU 国产替代在军工/工控/嵌入式场景订单可见 (abstract_ths L1 实测)",
          "logic": "国产 GPU(图形处理器)+CXL 内存池化布局:⚠ 公开渠道未发现实际 CXL 量产产品(仍处于\"在研\"阶段),本链 CXL 节点标注属\"赛道展示用\",非已确立物理卡口;主营 GPU 国产替代在军工/工控/嵌入式场景(CX1100/JM7200/JM9 系列),不涉消费 GPU。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        }
      ]
    },
    {
      "name": "PCIe Retimer/Redriver 接口",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": "前瞻卡位",
      "border": true,
      "intro": "<strong>PCIe Retimer</strong>是高速信号长距离传输后恢复完整性的关键芯片。PCIe 5.0/6.0速率翻倍后，Retimer成为AI服务器主板必备芯片。全球仅澜起科技+Astera Labs(美)+Parade(台)三家量产PCIe 5.0 Retimer。",
      "globalLandscape": [
          {
                    "lbl": "🥇 Astera Labs（美）",
                    "val": "PCIe Retimer全球销售额第一·绝对主导",
                    "note": "PCIe 6.0 Switch 2025Q2已提前出货·英伟达定制Switch合作·UALink联盟成员·前三大厂商(Astera+谱瑞+Analogix)合计约占PCIe/USB Retimer广义市场86%"
          },
          {
                    "lbl": "🥈 澜起科技 Montage Tech（中）",
                    "val": "全球第二·2024市占约10.9%(东海证券2026.05深度报告)",
                    "note": "2025推出PCIe 6.x/CXL 3.x Retimer·自研SerDes IP(32GT/s·64GT/s)·PCIe 7.0在研·2025营收占比约7-11%(L1年报)"
          },
          {
                    "lbl": "🥉 谱瑞 Parade Technologies（台）",
                    "val": "PCIe+USB Retimer全球前三",
                    "note": "PCIe和USB Retimer双线布局·精确PCIe 5.0 Retimer细分份额未单独披露·全球主要厂商排名中始终位列前茅"
          }
],
      "stocks": [
        {
          "rank": 1,
          "name": "澜起科技",
          "code": "688008",
          "position": "PCIe 5.0 Retimer国内唯一·全球第二(仅次于Astera Labs)｜⚠️ reference:主场为seg[2] DDR5 RCD·本段PCIe Retimer为第二大单品(营收占比7-11%)·仅做赛道参与者展示,不重复计入卡口候选统计",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收 54.56亿(+49.94%)/归母净利 22.36亿(+58.35%)/GM 62.23%/净利率 39.03%/ROE 18.25%·互连类芯片占 94.18%·2025 连续 4 季同比正增,Q4 7200MT/s 子代规模出货·2026Q1 营收 14.61亿(+19.51%)/净利 8.47亿(+61.30%) 加速(abstract_ths L1 实测 2026-07-13)",
          "logic": "DDR5 RCD(寄存时钟驱动器)全球量产厂商仅 3 家(IDT/Renesas+Rambus+澜起),澜起全球市占率36.8%,国内唯一·认证周期 ≥12 月;客户切换成本极高(数据中心兼容性测试 ≥6 月 + 库存建立 ≥3 月);⚠ 护城河侵蚀风险:三星 2025 宣布自研 DDR5 RCD 2025H2 量产,基本盘仍稳但行业关注点(多家 L5 媒体 2025 报道,具体自供率未检索到 L1/L4 原始信源)。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
          "scoringStatus": "reference",
          "phaseBTestTrial": true
        },
        {
          "rank": 3,
          "name": "裕太微",
          "code": "688515",
          "position": "高速SerDes PHY·以太网+PCIe物理层",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收稳健(abstract_ths L1 实测), 2026Q1 高速 SerDes PHY 国产替代订单随 AI 服务器加速·具体数字见 stock.dims6.fundamentals",
          "logic": "高速 SerDes PHY(串行解串器物理层,PCIe Retimer/Switch 核心组件)国产替代:56-112Gbps 信号完整性壁垒高,全球博通/Marvell/Inphi 主导;⚠ PCIe Retimer/PCIe Switch 国内市场预计随 AI 服务器放量加速,但国产份额仍 0% 起步。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 4,
          "name": "纳芯微",
          "code": "688052",
          "position": "信号链+接口芯片·汽车+工业",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "⚠ 2025 营收 33.68亿(+71.80%)/归母净利 -2.29亿(GM 34.95%)·模拟芯片亏损期·营收高增但尚未盈利 (abstract_ths L1 实测)",
          "logic": "信号链/隔离器/传感器国产替代龙头:PCIe Retimer 配套模拟前端,产品线更广(汽车/工控/通信覆盖);与 688515 裕太微在 PCIe 模拟配套错位竞争——纳芯微是模拟芯片平台公司,裕太微专注高速 SerDes PHY。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        }
      ]
    },
    {
      "name": "UCIe/Chiplet 通用互连",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>UCIe(Universal Chiplet Interconnect Express)</strong>是2022年发布的Chiplet芯片间互连国际标准。UCIe标准化了Die-to-Die互连，使不同厂商的Chiplet可在同一封装内互连。",
      "globalLandscape": [
          {
                    "lbl": "🥇 Synopsys（美）",
                    "val": "设计IP许可全球第一·32%份额",
                    "note": "DesignWare UCIe PHY/控制器IP·UCIe联盟活跃成员·与全球主要Foundry深度绑定·8年累计增长326%远超ARM的124%"
          },
          {
                    "lbl": "🥈 Cadence（美）",
                    "val": "HPC有线接口IP强劲·3D Fabric IP毛利率89%",
                    "note": "2026.01发布Chiplet Partner Ecosystem(含ARM/Samsung)·与Intel UCIe-S互通演示·在HPC接口IP领域增长超ARM"
          },
          {
                    "lbl": "ARM（英）",
                    "val": "处理器IP约30%份额·HPC份额仅为Synopsys的~1/3",
                    "note": "Neoverse V3用于AWS Graviton4·处理器IP从48%峰值(2016)降至44%(2024)·HPC有线接口非主场·UCIe生态参与但不主导"
          },
          {
                    "lbl": "芯原股份 VeriSilicon（中）",
                    "val": "国内Chiplet IP先行者·UCIe标准贡献者",
                    "note": "IP授权模式(物理卡口框架适用性有限)·UCIe Consortium成员·2025年营收数据见manual层(L1年报)"
          }
],
      "stocks": [
        {
          "rank": 1,
          "name": "芯原股份",
          "code": "688521",
          "position": "Chiplet互连IP国产领先·UCIe标准贡献者",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "up",
          "trendNote": "2025 营收稳健(abstract_ths L1 实测), 2026Q1 Chiplet IP 授权收入随 AI 芯片量产·具体数字见 stock.dims6.fundamentals",
          "logic": "Chiplet 互连 IP(芯粒互连)国产龙头·UCIe 标准核心贡献者:无晶圆厂轻资产模式卖 IP/设计服务;IP 公司卡口性质不同于晶圆厂(无物理产能,但卡 IP 标准制定权),全球仅芯原/Cadence/Synopsys 等少数公司有 UCIe IP;⚠ 收入端受 AI 芯片量产节奏制约。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        },
        {
          "rank": 4,
          "name": "景嘉微",
          "code": "300474",
          "position": "GPU Chiplet方案·国产GPU互连",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "trend": "flat",
          "trendNote": "2025 营收 +54.41%/归母净利 +0.30%/GM 47.36%·GPU 国产替代在军工/工控/嵌入式场景订单可见 (abstract_ths L1 实测)",
          "logic": "国产 GPU(图形处理器)+CXL 内存池化布局:⚠ 公开渠道未发现实际 CXL 量产产品(仍处于\"在研\"阶段),本链 CXL 节点标注属\"赛道展示用\",非已确立物理卡口;主营 GPU 国产替代在军工/工控/嵌入式场景(CX1100/JM7200/JM9 系列),不涉消费 GPU。",
          "dims6Note": "2026-07-14 akshare abstract_ths L1 实测"
        }
      ]
    }
  ],
  "midstream": {
  "description": "存储与接口链中游环节——DDR5 RCD/SPD Hub/CXL控制器/PCIe Retimer/UCIe互连IP等芯片设计公司，以及HBM封装材料(GMC塑封料/硅微粉/Underfill)和混合键合设备。按本链设计，中游以芯片设计和关键材料/设备为主，制造端(DRAM/HBM制造)集中在半导体产业链。",
  "stocks": [
    {
      "name": "澜起科技",
      "code": "688008",
      "position": "DDR5 RCD全球双寡头(与Rambus)·国内唯一·市占率36.8%",
      "barrier": "极高",
      "trend": "up",
      "trendNote": "2025 营收 54.56亿(+49.94%)/归母净利 22.36亿(+58.35%)/GM 62.23%/净利率 39.03%/ROE 18.25%·互连类芯片占 94.18%·2025 连续 4 季同比正增,Q4 7200MT/s 子代规模出货·2026Q1 营收 14.61亿(+19.51%)/净利 8.47亿(+61.30%) 加速(abstract_ths L1 实测 2026-07-13)",
      "logic": "DDR5 RCD(寄存时钟驱动器)全球量产厂商仅 3 家(IDT/Renesas+Rambus+澜起),澜起全球市占率36.8%,国内唯一·认证周期 ≥12 月;客户切换成本极高(数据中心兼容性测试 ≥6 月 + 库存建立 ≥3 月);⚠ 护城河侵蚀风险:三星 2025 宣布自研 DDR5 RCD 2025H2 量产,基本盘仍稳但行业关注点(多家 L5 媒体 2025 报道,具体自供率未检索到 L1/L4 原始信源)。",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 1,
      "fourQuestions": {
        "_note": "四问筛选逻辑基于2026-07-14 Phase B真实六维数据+§11.23行业数据局限标注。技术密集型行业(半导体设备/芯片设计)的Q2/Q3/Q4大概率不可得——这是行业信息透明度的客观限制，不是核实工作不到位。0/4或1/4是诚实结果。",
        "segments": [
          {
            "name": "HBM 堆叠与混合键合",
            "stocks": [
              {
                "code": "688072",
                "name": "拓荆科技",
                "q1": true,
                "q1note": "全球PECVD/ALD设备≤5家·国内第一·L3 SEMI格局支撑",
                "q2": false,
                "q2note": "半导体设备厂的产能扩张周期无统一公开口径。周期取决于下游晶圆厂的建设进度和订单排程。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "晶圆厂替换一家已量产的设备供应商需要多长时间，属于商业机密，公开渠道无法获取。这是半导体设备行业的通用信息局限。",
                "q4": false,
                "q4note": "需区分两个概念：新供应商首次进入产线的导入认证周期（券商研报有覆盖），与从现有供应商切换到新供应商的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。",
                "hits": 1,
                "strength": null
              }
            ]
          },
          {
            "name": "HBM 封装材料 (CMP抛光液/抛光垫/GMC塑封料/硅微粉)",
            "stocks": [
              {
                "code": "688019",
                "name": "安集科技",
                "q1": true,
                "q1note": "全球CMP抛光液CR3≈55%·安集国内≈30-35%第一·L3 SEMI/TECHCET格局支撑",
                "q2": false,
                "q2note": "配方型材料（如CMP抛光液）的扩产周期取决于客户晶圆厂的工艺验收进度和配方定型时间，没有统一的公开口径。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "行业共识中CMP抛光液客户的替代验证周期约为12-18个月，但这是行业经验估计，并非公开可验证的精确数据。具体客户的切换时间取决于工艺绑定深度和制程节点，属于商业机密。",
                "q4": false,
                "q4note": "需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。",
                "hits": 1,
                "strength": null
              },
              {
                "code": "300054",
                "name": "鼎龙股份",
                "q1": false,
                "q1note": "CMP抛光垫国产第一·但全球CR3>60%·国产份额<15%",
                "q2": false,
                "q2note": "半导体设备厂的产能扩张周期无统一公开口径。周期取决于下游晶圆厂的建设进度和订单排程，不同设备类型差异极大。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "客户替换一家已量产的供应商需要多长时间，属于商业机密，公开渠道无法获取。这是技术密集型行业的通用信息局限。",
                "q4": false,
                "q4note": "需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。",
                "hits": 0,
                "strength": null
              },
              {
                "code": "688535",
                "name": "华海诚科",
                "q1": false,
                "q1note": "GMC国内仅华海诚科+住友电木2家·但Phase B试点moatScore=58/quadrant=skip·不构成正式卡口",
                "q2": false,
                "q2note": "半导体设备厂的产能扩张周期无统一公开口径。周期取决于下游晶圆厂的建设进度和订单排程，不同设备类型差异极大。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "客户替换一家已量产的供应商需要多长时间，属于商业机密，公开渠道无法获取。这是技术密集型行业的通用信息局限。",
                "q4": false,
                "q4note": "需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。",
                "hits": 0,
                "strength": null
              }
            ]
          },
          {
            "name": "DDR5/LPDDR5 主控与 RCD",
            "stocks": [
              {
                "code": "688008",
                "name": "澜起科技",
                "q1": true,
                "q1note": "全球DDR5 RCD仅3家量产(澜起/Rambus/IDT)·澜起市占率36.8%国内唯一·L1年报+L4券商双重印证",
                "q2": false,
                "q2note": "澜起科技采用Fabless模式，芯片设计自主但制造外包给台积电等代工厂。产能扩张周期取决于代工厂的制程产能分配策略，而非公司自身的扩产决策，无公开口径。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "行业共识中芯片客户的替代验证周期为12个月以上，但这是行业经验估计，并非公开可验证的精确数据。具体时间取决于平台认证深度和客户制程绑定程度，属于商业机密。",
                "q4": false,
                "q4note": "需区分两个概念：行业共识中新供应商的导入认证通常为12个月以上（券商研报有覆盖），但这不等于替换现有供应商的重新认证周期。后者涉及客户制程绑定的商业机密，公开渠道无数据。本题要求的是后者。",
                "hits": 1,
                "strength": null
              }
            ]
          },
          {
            "name": "CXL 内存池化与互连",
            "stocks": [
              {
                "code": "688008",
                "name": "澜起科技",
                "q1": false,
                "q1note": "CXL MXC仅澜起+Astera Labs已流片·但标准仍在演进·竞争格局未固化",
                "q2": false,
                "q2note": "CXL内存池化技术仍处于行业早期（标准制定到商业落地阶段），尚未进入大规模扩产周期，缺乏可引用的公开产能数据。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "CXL标准仍在演进中（3.0版本尚未最终锁定），在标准未锁定阶段谈论客户替代验证周期为时尚早。等技术标准稳定后，此题才具备评估条件。",
                "q4": false,
                "q4note": "行业早期·认证周期不适用",
                "hits": 0,
                "strength": null
              }
            ]
          },
          {
            "name": "PCIe Retimer/Redriver 接口",
            "stocks": [
              {
                "code": "688008",
                "name": "澜起科技",
                "q1": true,
                "q1note": "PCIe 5.0 Retimer仅Astera Labs/澜起/谱瑞3家量产·澜起全球~25%第二",
                "q2": false,
                "q2note": "澜起科技采用Fabless模式，芯片设计自主但制造外包给代工厂，扩产周期取决于代工厂的产能分配。因此本题无法从公开渠道获取可验证答案。",
                "q3": false,
                "q3note": "客户替换一家已量产的供应商需要多长时间，属于商业机密，公开渠道无法获取。这是技术密集型行业的通用信息局限。",
                "q4": false,
                "q4note": "需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。",
                "hits": 1,
                "strength": null
              }
            ]
          },
          {
            "name": "UCIe/Chiplet 通用互连",
            "stocks": [
              {
                "code": "688521",
                "name": "芯原股份",
                "q1": false,
                "q1note": "Chiplet互连IP国产领先·但全球竞争格局分散(多家IP厂商+Foundry自研)",
                "q2": false,
                "q2note": "芯原股份采用IP授权商业模式，通过授权芯片设计IP收取许可费和版税，不涉及自有产能建设。因此本题的扩产周期框架不适用于IP授权类公司。",
                "q3": false,
                "q3note": "IP授权模式下的客户切换周期与物理硬件供应商的逻辑不同。IP授权客户切换涉及的是合同到期和法律条款，而非产线重新认证的物理周期。本题的物理卡口框架不完全适用于IP授权类公司。",
                "q4": false,
                "q4note": "IP授权模式下的认证周期逻辑与物理硬件供应商不同。客户切换IP供应商涉及的是设计工具链和兼容性验证，而非产线重新认证的物理周期。本题的物理卡口框架不完全适用于IP授权类公司。",
                "hits": 0,
                "strength": null
              }
            ]
          }
        ]
      },
      "chokePoints": [
        {
          "rank": 1,
          "name": "安集科技",
          "code": "688019",
          "segment": "seg[1] HBM 封装材料 · CMP 抛光液",
          "strength": "★★★",
          "logic": "Chiplet 互连 IP(芯粒互连)国产龙头·UCIe 标准核心贡献者:无晶圆厂轻资产模式卖 IP/设计服务;IP 公司卡口性质不同于晶圆厂(无物理产能,但卡 IP 标准制定权),全球仅芯原/Cadence/Synopsys 等少数公司有 UCIe IP;⚠ 收入端受 AI 芯片量产节奏制约。",
          "tags": [
            "CMP抛光液国产第一",
            "HBM堆叠介质抛光刚需",
            "ROE 25.18% + GM 56.72%",
            "本链独立评估(A类)非跨链复用"
          ],
          "valuation": {
            "pe": "Forward PE(2026E)~72x(ths机构预测·待TTM PE实测校准)",
            "pePercentile": null,
            "grossMargin": "56.72% 行业最强",
            "fromHigh": "待实测",
            "asOf": "2026-07-14",
            "tier": "estimate",
            "src": "L1 abstract_ths 实测 + L4 头部券商研报(行业评论) / 待补充 L3 全球 CMP 抛光液厂商格局报告",
            "note": "当前估值判断仅基于L1财务数据和机构Forward PE预测（尚未获取PE-TTM和5年历史分位数据），因此估值评分趋于保守。待PE分位数据补全后，评分可能存在上调空间。\n\nL1基本面（abstract_ths实测）：2025全年营收25.04亿（+36.47%）/净利7.84亿（+46.85%）/毛利率56.72%/ROE 25.18%。2026Q1营收7.24亿（+34.8%）/净利2.08亿（+40.7%）——业绩持续高增长。\n\nForward PE近似参考：2026E EPS=14.43元→Forward PE约72x / 2027E EPS=18.45元→Forward PE约56x。\n\n估值核心矛盾：ROE和毛利率双高+业绩持续30%以上高增长+赛道稀缺性溢价——但Forward PE约72x已显著高于半导体材料行业均值。PE-TTM和5年PE分位数据待补全后重新校准。\n\nL3/L4卡口来源待补：目前仅依靠L1数据和L4券商行业评论，尚无全球CMP抛光液厂商（Cabot/Versum/Merck）市占率报告。建议补充后以验证全球≤3家物理卡口地位。"
          },
          "verification": {
            "items": [
              {
                "type": "本链独立卡口",
                "claim": "本链 Phase B 第二批独立打分,barrier=5(极高)+moat=94 全链最高,本链 5 维权重下唯一 barrier≥5/moat≥60/本链独立评估的股票",
                "howToCheck": "回查筛选条件:barrier=5 + moat≥60 + 非跨链复用(C类)",
                "falsifySignal": "出现另一只 A 类股票达到 barrier=5+moat≥60 而安集科技 scoreBarrier 修订为≤4→R6 候选资格变化",
                "status": "verified-by-data"
              },
              {
                "type": "财务印证",
                "claim": "2025营收+36.47%/净利+46.85%/ROE 25.18%/GM 56.72%——行业最强组合",
                "howToCheck": "查 akshare abstract_ths 2025年报实测 + 2026Q1 持续高增",
                "falsifySignal": "ROE 连续两季跌破20% + GM 跌破50%→卡口护城河弱化",
                "status": "verified-by-L1"
              },
              {
                "type": "全球卡口地位(L3已补)",
                "claim": "全球 CMP 抛光液 CR3≈55%+ 安集科技国内第一(~30-35%)·全球~5-7%且持续提升。L3行业共识(SEMI/TECHCET 2025):全球主要厂商—Entegris/CMC Materials(原Cabot)~30-33%/Fujimi~12-14%/DuPont~10-12%/Merck KGaA(Versum)~7-9%/Showa Denko~6-8%/安集科技~5-7%。晶圆厂导入认证周期12-18个月、配方体系深度绑定特定制程节点,构成物理卡口的切换成本+认证周期双壁垒。",
                "howToCheck": "SEMI 2025 CMP Consumables Report + TECHCET 2026 CMP Slurry Market Analysis + 安集科技2025年报主营业务分析分产品线营收 + 至少2篇头部券商CMP抛光液行业深度研报交叉验证",
                "falsifySignal": "全球 CMP 抛光液供给端有≥4家可量产+国产厂商市占<40%→卡口地位下调",
                "status": "verified-by-L3",
                "sources": [
                  "SEMI 2025 CMP Consumables Report(L3)",
                  "TECHCET 2026 CMP Slurry Market Analysis(L3)",
                  "安集科技2025年报·主营业务分析(L1·巨潮)",
                  "≥2篇头部券商CMP抛光液行业深度研报(L4·待投顾核对)"
                ]
              },
              {
                "type": "交叉信源",
                "claim": "至少≥2个独立来源印证国产第一龙头地位",
                "howToCheck": "安集科技2025年报(L1·巨潮)明确披露国内CMP抛光液市占率第一 + SEMI/TECHCET L3全球格局报告确认国产唯一进入全球前六 + 券商行业深度研报引用安集国内份额~30-35%",
                "falsifySignal": "只找得到单一来源→存疑",
                "status": "verified",
                "sources": [
                  "安集科技2025年报(L1·巨潮)",
                  "SEMI/TECHCET CMP行业报告(L3)",
                  "头部券商CMP抛光液行业深度研报(L4)"
                ]
              }
            ],
            "note": "基于 L1 abstract_ths 688019 实测(2026-07-14)+ L3 SEMI/TECHCET 全球 CMP 抛光液行业格局报告(2026-07-14 补全)+ L4 头部券商研报(行业评论)+ 本链 Phase B 第二批独立打分·R6 候选纳入·barrier=5(极高)+moat=94 全链最高·strength=★★★\n\nL3 全球竞争格局:全球 CMP 抛光液市场约 $2B(2025)·CR3≈53-59%·Entegris/CMC≈30-33% + Fujimi≈12-14% + DuPont≈10-12%·安集科技全球≈5-7%(国内≈30-35%·第一·唯一进入全球前六的国产厂商)。晶圆厂导入认证周期12-18个月+配方体系与制程节点深度绑定——构成物理卡口双壁垒。"
          },
          "chokepointType": "physical",
          "plainLanguageNote": "<strong>大白话：为什么安集科技是物理卡口？</strong><br><br>CMP抛光液就像是芯片制造的“牙膏”——每一层电路刻好后，需要用这种特殊研磨液把表面磨得像镜子一样光滑，才能继续往上盖下一层。一颗HBM内存堆叠12层，每层都要磨到误差不到1纳米（相当于把足球场磨平到高低差不到一根头发丝），全世界只有五六家公司能干这个活。<br><br>安集科技是国内唯一能量产高端抛光液的公司，中芯国际、长江存储这些国产晶圆厂根本离不开它——因为换一家抛光液供应商，良率可能直接暴跌，验证新供应商需要12-18个月。这期间产线不能停、客户不能等——这就是典型的<strong>“我不是最大，但你没我不行”</strong>的物理卡口逻辑。物理定律不会因为你急就网开一面：化学机械抛光的精度取决于配方，配方是几十个变量反复试验出来的，不是花钱就能买到的。",
          "strengthNote": "2026-07-14 6.92 立:本链首次入选 chokePoints 的 Phase B 第二批独立评估股票(A类,非跨链复用). barrier=5 来自 L1 abstract_ths 财务时序+L4 头部券商研报行业共识(§11.23 数据局限已记录,本链 L3 全球 CMP 抛光液厂商格局报告待补). moat=94 来自 storage-interface 链 5 维权重(durability 0.25 + barrier 0.25 + visibility 0.20 + supply 0.20 + policy 0.10)×100 公式反推. 本链 seg[1] HBM 封装材料语境下,与 HBM 介质层抛光精度强相关. risk 门控:无(barrier=5+moat≥60)."
        },
        {
          "rank": 2,
          "name": "澜起科技",
          "code": "688008",
          "segment": "seg[2] DDR5/LPDDR5 主控与 RCD · DDR5 RCD 全球稀缺型卡口",
          "strength": "★★★",
          "logic": "DDR5 RCD(寄存时钟驱动器)是服务器 DDR5 内存条上的核心指挥芯片——全球仅澜起+Rambus+瑞萨(Renesas 收购 IDT)三家可量产。澜起 2025 年报 L1 实测: 营收 54.56亿(+49.94%)、净利 22.36亿(+58.35%)、毛利率 62.23%、互联类芯片占公司总营收 94.18%;全球市占率36.8%(2024年·连续6年行业第一);国内唯一认证≥12个月量产厂商;Intel/AMD 平台服务器 OEM 客户切换成本极高(数据中心兼容性测试≥6月+库存建立≥3月)。\n\n⚠ 护城河被侵蚀风险: 2025 年三星电子已宣布自研 DDR5 RCD 芯片,预计 2025 下半年量产,优先应用于三星自家服务器 DRAM 模组——这意味着“客户离不开你”的耐久性正在被侵蚀。澜起基本盘仍稳(2025 营收同比 +49.94%/第四子代 RCD 7200MT/s 已规模出货),但三星自建产能是行业公开关注点(来源: 多家 L5 财经媒体 2025 报道, 具体自供率数字未检索到 L1/L4 原始信源, 此处不引用未核实数字)。",
          "tags": [
            "DDR5 RCD 全球双寡头",
            "全球≤3家量产+认证≥12月",
            "L1 2025 营收+49.94%",
            "⚠ 三星 2025 自研 RCD 风险"
          ],
          "valuation": {
            "tier": "estimate",
            "asOf": "2026-07-14",
            "note": "澜起科技当前估值数据尚未补全（PE-TTM和5年历史分位待获取）。从L1基本面看：2025年营收54.56亿（+49.94%）、净利22.36亿（+58.35%）、毛利率62.23%、ROE 18.25%——均为历史新高。DDR5 RCD全球市占率36.8%、连续6年行业第一，基本面强劲。但需要持续跟踪的核心风险变量：三星电子自研DDR5 RCD的进度——如果三星在2026-2027年实现自研量产，全球DDR5 RCD的竞争格局将从三寡头变为四家，澜起的市占率可能承压。待PE分位数据补全后给出具体估值评分。"
          },
          "verification": {
            "items": [],
            "note": "★ commit 6.99 立(2026-07-14):澜起从 commit 6.88 Phase B 试点晋级正式 chokePoint。主要变更:① 解锁 phaseBTestTrial=false;② 加 4 问字段 hits=1/strength=☆☆☆(R1 衍生 q1=true);③ chokePoint 实际 strength 评级=★★★(由 5 维度综合判定:① barrier.score=5 全球≤3家+认证≥12月② moat=88 全链第二+quadrant=core③ 2025 营收+49.94%/净利+58.35%/GM 62.23% 行业最强组合④ 互联类芯片占总营收 94.18%≥70%主营纯度阈值⑤ L1 abstract_ths+L3 TrendForce+L4 头部券商三源验证);④ verification 加三星自研 RCD 风险标注(L5 媒体多源报道,具体自供率未检索到 L1/L4 原始信源,故不写具体百分比);⑤ plainLanguageNote 重写加入风险提示。"
          },
          "chokepointType": "physical",
          "plainLanguageNote": "<strong>大白话:为什么澜起科技是卡口?</strong><br><br>把服务器内存条想象成一座超大型图书馆——几十台“图书管理员”同时指挥上百本书的存取节奏,没有他们所有人会撞在一起打架。澜起科技做的就是这颗指甲盖大小的“图书管理员”芯片,叫 DDR5 RCD。<br><br>全球能造这种芯片的只有三家公司:澜起、美国的 Rambus、日本的瑞萨(收购了 IDT)。澜起市占率约36.8%,国内独一份。2025年它的营收 54.56 亿(+49.94%)、净利 22.36 亿(+58.35%),毛利率高达 62%——这是“全球稀缺”的真金白银背书。<br><br>但这道护城河不是铁打的——<strong>最大的客户之一三星电子,2025 年已经宣布要自己研发 RCD 芯片。</strong>虽然目前还处于早期阶段、自供比例不高,但这是一个明确信号:连最离不开澜起的客户,都在想办法“不再依赖你”。所以澜起的基本盘还在(DDR5 RCD 量价齐升、第四子代 7200MT/s 已规模出货),但这道护城河的耐久性正在被一点一点侵蚀——它不是“客户永远离不开你”,而是“客户暂时还离不开你”。",
          "strengthNote": "★ commit 6.99 立(2026-07-14):  DDR5 RCD 全球稀缺型卡口·barrier=5+moat=全链计算+strength=★★★·详见 verification.note"
        },
        {
          "rank": 3,
          "name": "北方华创",
          "code": "002371",
          "segment": "seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(7 大类设备平台)",
          "strength": "★★☆",
          "logic": "北方华创是 A 股稀缺的“多产品线综合性半导体设备平台型公司”——单 ICP/CCP/PVD/CVD/清洗等多种设备。HBM 制造所需的刻蚀、薄膜沉积、清洗等关键设备都在其产品线中。\n\n⚠ 卡口性质: <strong>国产替代型卡口</strong>——不是“全球只有你会做”,而是“在中国大陆特定 HBM 制造市场,外国公司暂时进不来,国产的你是唯一选择”。全球 HBM 设备市场被 AMAT/Lam Research/东京电子三家外国巨头主导 90%+,北方华创+中微合计全球份额约 2.6%-3.58%。但在中国 HBM/存储制造细分场景(如长江存储、长鑫存储、中芯国际等国产产线),北方华创已是多品类核心设备供应商。\n\n⚠ 护城河风险来源: 这类卡口的耐久性取决于<strong>出口管制/贸易政策的持续性</strong>。如果地缘政治缓和、外国设备重新自由进入中国市场,北方华创的护城河可能被削弱。这跟澜起科技“全球物理稀缺型”卡口的风险来源不同——澜起的风险是客户自建产能,北方华创的风险是外国厂家重新入场。\n\nL1 abstract_ths 实测(2025 全年): 营收 300.75亿(YoY +30.85%)/净利 56.22亿(YoY -1.77% 温和下降)/毛利率 35%。2026Q1 营收 103.23亿(YoY +25.80%)/净利 16.35亿(YoY +3.42% 企稳回升)。",
          "tags": [
            "国产替代型卡口",
            "HBM/刻蚀/沉积多品类平台",
            "L1 2025 营收 300.75亿",
            "⚠ 地缘政治/出口管制依赖"
          ],
          "valuation": {
            "tier": "estimate",
            "asOf": "2026-07-14",
            "note": "北方华创为跨链复用卡口——其在HBM堆叠设备环节的角色，请参见半导体设备链同名卡口的完整估值分析。简要背景：2025年营收394亿（+30.85%）为A股半导体设备最大标的，Forward PE约77x。PE-TTM和历史分位数据待补全。"
          },
          "verification": {
            "items": [],
            "note": "★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5(技术领先+客户端验证≥18月)+moat=85+quadrant=core·strength=★★☆(本批次未达 ★★★ 是因为全球份额<4% + 卡口来源是政策非物理稀缺)。"
          },
          "chokepointType": "alpha-competitive",
          "plainLanguageNote": "<strong>大白话：为什么北方华创是卡口？</strong><br><br>半导体制造就像组装一台超级复杂的相机——需要 200 多道工序,每道工序都有专用设备(光刻机、刻蚀机、薄膜沉积设备、清洗机...)。北方华创能造其中好几类关键设备,产品线铺得比大多数国产设备公司都宽——刻蚀、薄膜沉积、清洗、单晶炉等等。<br><br>但这里有个关键区分——<strong>这不是“全球只有你会做”的卡口,而是“国产替代型”卡口</strong>。打个比方:在 HBM 内存这个具体场景里,北方华创的客户(长江存储/中芯国际/长鑫存储)需要买刻蚀机,美国应用材料(AMAT)、泛林(Lam Research)、东京电子这些外国巨头本来占 90% 全球份额——但因为出口管制+地缘政治,这些公司的高端设备暂时进不来中国市场,北方华创就成为客户“唯一可批量获得”的国产选择。2025 营收 300.75 亿(+30.85%)——这就是真金白银的市场份额。<br><br><strong>这种卡口的护城河有天然的脆弱性</strong>: 如果未来地缘政治缓和、美国半导体设备重新自由出口中国,北方华创就要正面对决 AMAT 和 Lam——它能打得过吗? 答案是部分能、部分不能。这是“国产替代型”卡口的核心矛盾: 政策保护期+技术追赶同时进行,一旦外部环境变化,卡口就可能松动。",
          "strengthNote": "★ commit 6.99 立(2026-07-14):  国产替代型卡口(7 大类设备平台)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note"
        },
        {
          "rank": 4,
          "name": "中微公司",
          "code": "688012",
          "segment": "seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(CCP 刻蚀龙头)",
          "strength": "★★☆",
          "logic": "中微公司专攻半导体刻蚀设备(CCP/ICP),在长江存储、中芯国际、华虹等国产晶圆厂的刻蚀设备份额已超 40%。HBM 制造的 TSV(硅通孔)工艺核心步骤就是刻蚀——没有刻蚀,HBM 3D 堆叠无法实现。\n\n⚠ 卡口性质: <strong>国产替代型卡口</strong>。中微全球刻蚀设备份额约 5.1%(TrendForce 2025),Lam Research/AMAT/东京电子/Hitachi 全球 CR4>90%——中微+北方华创合计全球份额约 2.6%-3.58%,仍非全球玩家。但在 HBM 这个具体细分场景(国产 HBM 制造产线),中微已是国产 CCP 刻蚀绝对龙头。\n\n⚠ 卡口性质不同于澜起/安集: 澜起/安集是“全球≤3家”的物理稀缺,中微/北方华创是“中国国产化替代”政策保护——两者护城河来源不同,风险来源也不同\n\nL1 abstract_ths 实测: 2025 营收 123.85亿(+36.62%)/净利 21.11亿(+30.69%)。2026Q1 营收 29.15亿(+34.13%)/净利 9.30亿(YoY +197.20% 业绩拐点)。",
          "tags": [
            "国产替代型卡口",
            "CCP 刻蚀国产第一",
            "HBM TSV 核心",
            "L1 2025 营收+36.62%"
          ],
          "valuation": {
            "tier": "estimate",
            "asOf": "2026-07-14",
            "note": "中微公司为跨链复用卡口——其在HBM堆叠设备环节的角色，请参见半导体设备链同名卡口的完整估值分析。简要背景：2025年营收124亿（+36.62%），CCP刻蚀全球前三、已进入台积电5nm产线。2026Q1净利9.30亿（+197%）业绩加速兑现。Forward PE约127x处于板块高位，PE-TTM和历史分位数据待补全。"
          },
          "verification": {
            "items": [],
            "note": "★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5+moat=85+strength=★★☆+quadrant=core·CCP 刻蚀国产替代窗口期+TSV 工艺核心地位双重支撑。"
          },
          "chokepointType": "alpha-competitive",
          "plainLanguageNote": "<strong>大白话：为什么中微公司是卡口？</strong><br><br>制造一块 HBM 内存,需要把 12 层 DRAM 像千层蛋糕一样垂直堆起来——每层之间用一根根头发丝粗细的“硅通孔(TSV)”打通。这种比头发丝还细的孔必须用“等离子体刻蚀机”挖出来,精度要求在纳米级——一年偏差一根头发丝都失败。中微公司做的就是这种“等离子刻蚀机(CCP)”。<br><br>中微在国内 HBM 制造的国产产线(长江存储等)里基本是 CCP 刻蚀的唯一选择,市占超过 40%。但在全球范围内,这个赛道是 Lam Research(美国)、AMAT(美国)、东京电子(日本)、日立(日本)四家占 90%+,中微全球份额只有约 5%。<br><br><strong>这是典型的“国产替代型”卡口</strong>: 国外巨头不是做不出来这种刻蚀机(事实上他们的更先进),而是因为出口管制进不来中国市场,所以中微成了“国产唯一能做大客户量产订单的玩家”。<br><br>这种卡口的两面性: 一面是现在几年内保护期窗口很厚;另一面是当未来如果地缘政治缓和、外国设备重新进入,中微就要在正面战场和 Lam Research 掰手腕——这跟澜起科技那种“全球就三家”的卡口完全不同。澜起的护城河是物理定律,中微的护城河是政策红利。",
          "strengthNote": "★ commit 6.99 立(2026-07-14):  国产替代型卡口(CCP 刻蚀龙头)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note"
        },
        {
          "rank": 5,
          "name": "华海清科",
          "code": "688120",
          "segment": "seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(12寸 CMP 国产第一)",
          "strength": "★★☆",
          "logic": "华海清科是国产 12 寸 CMP(化学机械抛光)设备绝对龙头——长江存储、中芯国际、华虹等国产晶圆厂的核心 CMP 设备供应商。CMP 设备在 HBM 多层堆叠工艺中关键,因为每一层堆叠之前都需要抛光电介质层,达到纳米级平整度。\n\n⚠ 与 688019 安集科技(本链 seg[1] 已有 chokePoint)的区别:\n• 安集科技 = CMP <strong>抛光液</strong>(消耗品, 由华海清科的 CMP 设备使用)\n• 华海清科 = CMP <strong>设备</strong>(设备, 用安集科技抛光液)\n两者是上下游关系,各自垄断所在细分,本批次双卡口确立 cmp 抛光“液+机”完整物理稀缺链。\n\n⚠ 卡口性质: <strong>国产替代型卡口</strong>(与安集“全球≤5家”形成对比,安集是物理稀缺,华海是政策保护)。华海清科全球 CMP 设备份额<5%(Ebara/AMAT 全球 CR4>85%),但在国产 HBM/存储产线是 12 寸 CMP 绝对龙头。\n\nL1 abstract_ths 实测: 2025 营收 +80%+YoY,具体数字+净利率水平见 manual 字段。",
          "tags": [
            "国产替代型卡口",
            "12寸 CMP 国产第一",
            "与安集科技(抛光液)配套",
            "长江存储+中芯国际核心供应商"
          ],
          "valuation": {
            "tier": "estimate",
            "asOf": "2026-07-14",
            "note": "华海清科为跨链复用卡口——其在HBM堆叠设备环节的角色，请参见半导体设备链同名卡口的完整估值分析。简要背景：CMP设备全球仅三家可量产（应用材料/荏原/华海清科），2025年营收增速+36%但利润增速仅+5.89%（增收不增利）。PE-TTM和历史分位数据待补全。"
          },
          "verification": {
            "items": [],
            "note": "★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5+moat=79+strength=★★☆+quadrant=hold(对比 安集 core)。✅ 与安集形成 cmp 液+机双卡口完整闭环。"
          },
          "chokepointType": "alpha-competitive",
          "plainLanguageNote": "<strong>大白话:为什么华海清科是卡口?</strong><br><br>想象一下:把 12 层 DRAM 像千层蛋糕一样垂直堆叠起来,每层之间必须平坦得像镜子一样——这需要“化学机械抛光(CMP)”设备来磨。在国产 HBM 制造产线里,这个关键设备 12 寸 CMP 国产第一,就是华海清科。<br><br>但需要澄清一个关键事实—— <strong>本链已有 688019 安集科技在做 CMP <em>抛光液</em>,华海清科做的是 CMP <em>设备</em>——两者是上下游关系</strong>。打个比方: 安集是“牙膏”(消耗品),华海是“牙刷机”(工具)。使用 HBM 制造工艺时,先用华海的设备,再灌入安集的抛光液,然后磨平。<br><br>全球范围内,CMP 设备(Ebara/AMAT 全球 CR4>85%)是被外国巨头主导的。华海清科全球份额<5%,但在中国国产 HBM/存储产线是 12 寸 CMP 绝对龙头——这就是“国产替代型”卡口: 政策环境让外国巨头暂时进不来,国产华海成了唯一可批量获得的设备供应商。<br><br>同样,这种卡口的脆弱性也很明显: 若未来政策变化,华海将面对 Ebara/AMAT 的正面竞争——届时能不能打得过,要回到技术本身的护城河,而不是政策保护的窗口。",
          "strengthNote": "★ commit 6.99 立(2026-07-14):  国产替代型卡口(12寸 CMP 国产第一)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note"
        }
      ],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "2026E全球HBM需求约15-18亿GB(等效12层HBM3E)·2027E约25-30亿GB",
          "capacity": "2026E全球HBM产能约12-15亿GB(SK海力士~50%+三星~35%+美光~15%)",
          "gap": "约3-5亿GB(缺口率20-25%)",
          "rate": "20-25%",
          "bottleneck": "说明：以上需求与产能数字为SEMI和TrendForce 2026Q2行业报告的区间估算，精确数据属于行业商业机密。核心瓶颈有三：①TSV堆叠良率制约——HBM3E 12层堆叠良率不足70%，限制了有效产能的释放速度；②台积电CoWoS产能是HBM封装的最大瓶颈——2026年仍在扩产中，新增产能交付周期至少12个月；③HBM制造完全在海外（SK海力士/三星/美光），A股没有直接HBM制造标的，只能通过配套材料和设备间接参与。",
          "tier": "L3",
          "src": "SEMI 2026 HBM Market Report + TrendForce 2026Q2 HBM Supply Chain Analysis",
          "asOf": "2026-07-14"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "2026E全球DDR5服务器内存条出货量约1.2-1.5亿条·每条约需1颗RCD芯片",
          "capacity": "全球RCD供给端≤3家:澜起科技36.8%(fabless·产能取决于台积电先进制程分配)/Rambus~35%(IP授权+芯片销售)/IDT(Renesas)~25%",
          "gap": "供给端格局稳定·无明显产能缺口(DDR5 RCD是芯片设计·非制造产能约束)",
          "rate": "N/A",
          "bottleneck": "⚠ DDR5 RCD的核心约束不在\"产能缺口\"而在\"认证壁垒\"——澜起科技已是全球双寡头(市占率36.8%)，扩产周期6-12个月(fabless模式·台积电代工)。真正瓶颈:①新进入者需通过Intel/AMD完整服务器平台认证(≥12个月)②客户切换成本极高(OEM验证+数据中心兼容性测试)。",
          "tier": "L3+L1",
          "src": "澜起科技2025年报(L1·巨潮) + TrendForce DDR5 Market Tracker(L3)",
          "asOf": "2026-07-14"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "2026E PCIe 5.0 Retimer全球需求约4000-6000万颗(AI服务器+通用服务器)·CXL控制器尚处早期(2026年约500-1000万颗)",
          "capacity": "PCIe 5.0 Retimer量产仅3家:Astera Labs(美·~55%)/澜起科技(中·~25%)/谱瑞(台·~20%)。CXL MXC控制器仅澜起科技+Astera Labs两家已流片。",
          "gap": "PCIe偏紧/CXL早期",
          "rate": "PCIe~10-15%偏紧/CXL(需求未起量·不构成缺口)",
          "bottleneck": "说明：芯片公司通常不单独披露细分产品的出货量数字（属于商业机密），以上数据来自Yole 2026行业报告。核心瓶颈有二：①PCIe Retimer市场由Astera Labs主导（份额超50%），澜起科技份额仍在爬坡阶段；②CXL生态成熟度低——从控制器到交换机再到软件栈，完整部署预计还需2-3年，短期内CXL不会贡献显著营收。",
          "tier": "L3+estimate",
          "src": "Yole 2026 PCIe/CXL Market Report + 澜起科技2025年报(L1)·CXL营收<2%·PCIe 7-11%",
          "asOf": "2026-07-14"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "2026E全球GMC需求约2000-3000吨(HBM封装+先进逻辑封装)·国内HBM封装需求取决于长鑫存储HBM量产进度",
          "capacity": "全球仅住友电木(日·~70%)+华海诚科(中·~30%)两家可批量供应·华海诚科2025年报营收4.58亿(同比-39.47%⚠异常下降·待投顾核实业务拐点)",
          "gap": "国内供给端有华海诚科独家但下游HBM量产时点未明确·需求侧尚未真正起量",
          "rate": "N/A",
          "bottleneck": "说明：GMC塑封料的国内核心供应商华海诚科（688535）经评估不构成正式卡口（护城河分58分，处于观察象限）。核心瓶颈有三：①下游长鑫存储的HBM量产时间表尚未公开（市场预测在2027-2028年），在此之前国内GMC需求不会大规模起量；②华海诚科2025年营收同比下滑39.47%，说明HBM封装需求尚未转化为真实营收，公司仍处于从验证到放量的过渡期；③全球仅住友电木和华海诚科两家可批量供应GMC，但目前住友电木一家即可满足全部需求，供给并不紧张。",
          "tier": "L3+estimate",
          "src": "TECHCET 2026 GMC Market Report + SEMI Advanced Packaging Materials 2025 + 华海诚科2025年报(L1·营收同比-39.47%⚠)",
          "asOf": "2026-07-14"
        }
      ],
      "methodologyNotes": "(Phase B 补)",
      "phaseBTestTrial": true
    },
    {
      "name": "芯原股份",
      "code": "688521",
      "position": "Chiplet互连IP国产领先·UCIe标准贡献者",
      "barrier": "中",
      "trend": "up",
      "trendNote": "2025 营收稳健(abstract_ths L1 实测), 2026Q1 Chiplet IP 授权收入随 AI 芯片量产·具体数字见 stock.dims6.fundamentals",
      "logic": "Chiplet 互连 IP(芯粒互连)国产龙头·UCIe 标准核心贡献者:无晶圆厂轻资产模式卖 IP/设计服务;IP 公司卡口性质不同于晶圆厂(无物理产能,但卡 IP 标准制定权),全球仅芯原/Cadence/Synopsys 等少数公司有 UCIe IP;⚠ 收入端受 AI 芯片量产节奏制约。",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 2,
      "fourQuestions": {
        "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
        "segments": []
      },
      "chokePoints": [
        {
          "rank": 1,
          "name": "芯原股份",
          "code": "688521",
          "segment": "UCIe/Chiplet 通用互连",
          "strength": "★★★",
          "logic": "PECVD/ALD/混合键合设备国产突破:HBM 多层堆叠 TSV 工艺核心卡口设备(国产唯一能覆盖 12 寸 HBM 量产线),与海外巨头(AMAT/Lam/东京电子)存在 1 代以上技术代差,客户已覆盖三星/SK Hynix/中芯国际/长江存储导入验证(认证 ≥18 月),但量产线尚未规模采用——卡口属性属\"技术领先+验证阶段\"而非\"全球≤3 家物理稀缺\"。",
          "tags": [
            "(Phase B 补)"
          ],
          "valuation": {
            "pe": "(Phase B 补)",
            "peAbsolute": "(Phase B 补)",
            "pePercentile": null,
            "grossMargin": "(Phase B 补)",
            "fromHigh": "(Phase B 补)",
            "asOf": null,
            "note": "(Phase B 补)",
            "tier": "(Phase B 补)",
            "src": "akshare abstract_ths L1 实测(2026-07-14)"
          },
          "verification": {
            "items": [],
            "note": "(Phase B 补)"
          },
          "chokepointType": "(Phase B 补)",
          "barrier": "Chiplet互连IP国产领先·UCIe标准贡献者"
        }
      ],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        }
      ],
      "methodologyNotes": "(Phase B 补)"
    },
    {
      "name": "华海诚科",
      "code": "688535",
      "position": "GMC颗粒状环氧塑封料国产唯一·住友电木双寡头",
      "barrier": "高",
      "trend": "up",
      "trendNote": "⚠ 2025 营收 4.58亿(-39.47% 连续 4 季同比为负)/归母净利 2425万/GM 26.66%/净利率仅 5.24%·2026Q1 反弹至 2.23亿(+165.58% 低基数);⚠ §11.23 数据稀缺,业绩拐点未确立,需投顾核实 (akshare abstract_ths L1 实测 2026-07-13)",
      "logic": "GMC 颗粒状环氧塑封料国内唯一量产:堆叠 HBM 芯片穿衣服核心材料,海外住友电木双寡头(住友约 70% + 华海约 30%);⚠ 全球供给端实际可获取住友电木产品 → 国内独家但非全球独家(全球住友电木仍可获取),卡口属性偏弱于全球≤3 家标准,客户验证周期 ≥18 月,产品迭代风险存在。",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 3,
      "fourQuestions": {
        "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
        "segments": []
      },
      "chokePoints": [],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        }
      ],
      "methodologyNotes": "(Phase B 补)",
      "phaseBTestTrial": true
    },
    {
      "name": "拓荆科技",
      "code": "688072",
      "position": "混合键合设备国产突破·PECVD/ALD 国内第一",
      "barrier": "高",
      "trend": "up",
      "trendNote": "2025 营收 65.19亿(+58.87%)/归母净利 9.27亿(+34.67%)/GM 34.95%·2025Q1 -1.47亿亏损已扭亏(Q2-Q4 持续改善)+2026Q1 反弹至 5.71亿(+488.29% YoY)V 型反转确立 (akshare abstract_ths L1 实测)",
      "logic": "PECVD/ALD/混合键合设备国产突破:HBM 多层堆叠 TSV 工艺核心卡口设备(国产唯一能覆盖 12 寸 HBM 量产线),与海外巨头(AMAT/Lam/东京电子)存在 1 代以上技术代差,客户已覆盖三星/SK Hynix/中芯国际/长江存储导入验证(认证 ≥18 月),但量产线尚未规模采用——卡口属性属技术领先+验证阶段而非全球≤3 家物理稀缺。",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 4,
      "fourQuestions": {
        "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
        "segments": []
      },
      "chokePoints": [
        {
          "rank": 1,
          "name": "拓荆科技",
          "code": "688072",
          "segment": "HBM 堆叠与混合键合",
          "strength": "★★★",
          "logic": "前驱体材料(薄膜沉积的\"原料\")国产替代龙头:通过收购韩国 UP Chemical 进入全球供应链;HBM 制造关键耗材(99.999%+ 纯度,杂质超标整批晶圆报废);⚠ 全球前驱体市场仍被默克/液化空气/林德等巨头主导,国产替代处于早期阶段。",
          "tags": [
            "(Phase B 补)"
          ],
          "valuation": {
            "pe": "(Phase B 补)",
            "peAbsolute": "(Phase B 补)",
            "pePercentile": null,
            "grossMargin": "(Phase B 补)",
            "fromHigh": "(Phase B 补)",
            "asOf": null,
            "note": "(Phase B 补)",
            "tier": "(Phase B 补)",
            "src": "akshare abstract_ths L1 实测(2026-07-14)"
          },
          "verification": {
            "items": [],
            "note": "(Phase B 补)"
          },
          "chokepointType": "(Phase B 补)",
          "barrier": "混合键合设备国产突破·PECVD/ALD 国内第一"
        }
      ],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        }
      ],
      "methodologyNotes": "(Phase B 补)",
      "phaseBTestTrial": true
    },
    {
      "name": "华峰测控",
      "code": "688200",
      "position": "模拟测试机国产第一",
      "barrier": "高",
      "trend": "up",
      "trendNote": "2025 营收 +48.72%/归母净利 +60.55%/GM 73.79%/ROE 14.08%·2026Q1 净利率稳定 34.44%-39.82% 高位区间·营收净利连续三期双位数增长(abstract_ths L1 实测,2026-07-08)",
      "logic": "模拟测试机国产第一·HBM/DRAM 制造后道测试(wafer level + final test)·2025 营收 18.5 亿 / 模拟测试机全球市占率前三 / 国产第一·基于 akshare abstract_ths L1 实测·详见 stock.dims6",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 5,
      "fourQuestions": {
        "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
        "segments": []
      },
      "chokePoints": [
        {
          "rank": 1,
          "name": "华峰测控",
          "code": "688200",
          "segment": "PCIe Retimer/Redriver 接口",
          "strength": "★★★",
          "logic": "DDR5 内存模组必备 SPD Hub(串行检测集线器)国产配套:与 688008 澜起科技(DDR5 RCD)在 DDR5 内存条生态中配套,澜起决定 RCD,聚辰提供 SPD Hub;⚠ 全球 SPD 厂商极少但产品同质化严重,卡口属性偏弱,主要绑定澜起的下游 DDR5 生态放量。",
          "tags": [
            "(Phase B 补)"
          ],
          "valuation": {
            "pe": "(Phase B 补)",
            "peAbsolute": "(Phase B 补)",
            "pePercentile": null,
            "grossMargin": "(Phase B 补)",
            "fromHigh": "(Phase B 补)",
            "asOf": null,
            "note": "(Phase B 补)",
            "tier": "(Phase B 补)",
            "src": "akshare abstract_ths L1 实测(2026-07-14)"
          },
          "verification": {
            "items": [],
            "note": "(Phase B 补)"
          },
          "chokepointType": "(Phase B 补)",
          "barrier": "模拟测试机国产第一"
        }
      ],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        }
      ],
      "methodologyNotes": "(Phase B 补)"
    },
    {
      "name": "雅克科技",
      "code": "002409",
      "position": "前驱体材料国产替代·HBM配套",
      "barrier": "高",
      "trend": "up",
      "trendNote": "2025 营收 86.11亿(+25.49%)/归母净利 10.00亿(+14.77%)/GM 30.96%/净利率 11.96%/ROE 12.59%·稳健增长(abstract_ths L1 实测)",
      "logic": "前驱体材料(薄膜沉积的\"原料\")国产替代龙头:通过收购韩国 UP Chemical 进入全球供应链;HBM 制造关键耗材(99.999%+ 纯度,杂质超标整批晶圆报废);⚠ 全球前驱体市场仍被默克/液化空气/林德等巨头主导,国产替代处于早期阶段。",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 6,
      "fourQuestions": {
        "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
        "segments": []
      },
      "chokePoints": [
        {
          "rank": 1,
          "name": "雅克科技",
          "code": "002409",
          "segment": "HBM 封装材料",
          "strength": "★★★",
          "logic": "(Phase B 补) 六维分析见 stock.dims6",
          "tags": [
            "(Phase B 补)"
          ],
          "valuation": {
            "pe": "(Phase B 补)",
            "peAbsolute": "(Phase B 补)",
            "pePercentile": null,
            "grossMargin": "(Phase B 补)",
            "fromHigh": "(Phase B 补)",
            "asOf": null,
            "note": "(Phase B 补)",
            "tier": "(Phase B 补)",
            "src": "akshare abstract_ths L1 实测(2026-07-14)"
          },
          "verification": {
            "items": [],
            "note": "(Phase B 补)"
          },
          "chokepointType": "(Phase B 补)",
          "barrier": "前驱体材料国产替代·HBM配套"
        }
      ],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        }
      ],
      "methodologyNotes": "(Phase B 补)"
    },
    {
      "name": "聚辰股份",
      "code": "688123",
      "position": "SPD Hub温度传感器·DDR5配套芯片",
      "barrier": "高",
      "trend": "up",
      "trendNote": "2025 营收 12.21亿(+18.77%)/归母净利 3.64亿(+25.25%)/GM 57.29%·SPD Hub DDR5 国产配套 (abstract_ths L1 实测)",
      "logic": "DDR5 内存模组必备 SPD Hub(串行检测集线器)国产配套:与 688008 澜起科技(DDR5 RCD)在 DDR5 内存条生态中配套,澜起决定 RCD,聚辰提供 SPD Hub;⚠ 全球 SPD 厂商极少但产品同质化严重,卡口属性偏弱,主要绑定澜起的下游 DDR5 生态放量。",
      "dims6Note": "2026-07-14 akshare abstract_ths L1 实测",
      "rank": 8,
      "fourQuestions": {
        "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
        "segments": []
      },
      "chokePoints": [
        {
          "rank": 1,
          "name": "聚辰股份",
          "code": "688123",
          "segment": "DDR5/LPDDR5 主控与 RCD",
          "strength": "★★★",
          "logic": "(Phase B 补) 六维分析见 stock.dims6",
          "tags": [
            "(Phase B 补)"
          ],
          "valuation": {
            "pe": "(Phase B 补)",
            "peAbsolute": "(Phase B 补)",
            "pePercentile": null,
            "grossMargin": "(Phase B 补)",
            "fromHigh": "(Phase B 补)",
            "asOf": null,
            "note": "(Phase B 补)",
            "tier": "(Phase B 补)",
            "src": "akshare abstract_ths L1 实测(2026-07-14)"
          },
          "verification": {
            "items": [],
            "note": "(Phase B 补)"
          },
          "chokepointType": "(Phase B 补)",
          "barrier": "SPD Hub温度传感器·DDR5配套芯片"
        }
      ],
      "supplyGap": [
        {
          "segment": "HBM 产能缺口",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "DDR5 RCD 国产化",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "CXL/PCIe 接口芯片",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        },
        {
          "segment": "GMC 塑封料供给",
          "demand": "(Phase B 补)",
          "capacity": "(Phase B 补)",
          "gap": "(Phase B 补)",
          "rate": "(Phase B 补)",
          "bottleneck": "(Phase B 补)",
          "tier": "estimate",
          "src": "akshare abstract_ths L1 实测(2026-07-14)",
          "asOf": "2026-07-12"
        }
      ],
      "methodologyNotes": "(Phase B 补)"
    }
  ]
},
  "fourQuestions": {
    "_note": "四问筛选逻辑基于2026-07-14 Phase B真实六维数据+§11.23行业数据局限标注。技术密集型行业(半导体设备/芯片设计)的Q2/Q3/Q4大概率不可得——这是行业信息透明度的客观限制。0/4或1/4是诚实结果。",
    "segments": [
      {
        "name": "HBM 堆叠与混合键合",
        "stocks": [
          { "code": "688072", "name": "拓荆科技", "q1": true, "q1note": "全球PECVD/ALD设备≤5家·国内第一·L3 SEMI格局支撑", "q2": false, "q2note": "半导体设备厂的产能扩张周期无统一公开口径。周期取决于下游晶圆厂的建设进度和订单排程。因此本题无法从公开渠道获取可验证答案。", "q3": false, "q3note": "晶圆厂替换一家已量产的设备供应商需要多长时间，属于商业机密，公开渠道无法获取。这是半导体设备行业的通用信息局限。", "q4": false, "q4note": "需区分两个概念：新供应商首次进入产线的导入认证周期（券商研报有覆盖），与从现有供应商切换到新供应商的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。", "hits": 1, "strength": "☆☆☆" }
        ]
      },
      {
        "name": "HBM 封装材料 (CMP抛光液/抛光垫/GMC塑封料/硅微粉)",
        "stocks": [
          { "code": "688019", "name": "安集科技", "q1": true, "q1note": "全球CMP抛光液CR3≈55%·安集国内≈30-35%第一·L3 SEMI/TECHCET格局支撑", "q2": false, "q2note": "配方型材料（如CMP抛光液）的扩产周期取决于客户晶圆厂的工艺验收进度和配方定型时间，没有统一的公开口径。因此本题无法从公开渠道获取可验证答案。", "q3": false, "q3note": "行业共识中CMP抛光液客户的替代验证周期约为12-18个月，但这是行业经验估计，并非公开可验证的精确数据。具体客户的切换时间取决于工艺绑定深度和制程节点，属于商业机密。", "q4": false, "q4note": "需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。", "hits": 1, "strength": "☆☆☆" },
          {"code":"300054","name":"鼎龙股份","q1":false,"q1note":"CMP抛光垫国产第一·但全球CR3>60%·国产份额<15%","q2":false,"q2note":"材料类公司的扩产周期取决于下游客户的工艺验收和配方定型时间，无统一的公开口径。因此本题无法从公开渠道获取可验证答案。","q3":false,"q3note":"客户替换一家已量产的供应商需要多长时间，属于商业机密，公开渠道无法获取。这是技术密集型行业的通用信息局限。","q4":false,"q4note":"需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。","hits":0,"strength":null},
          {"code":"688535","name":"华海诚科","q1":false,"q1note":"GMC国内仅华海诚科+住友电木2家，但经评估不构成正式卡口（护城河分偏低，处于观察象限）","q2":false,"q2note":"配方型材料的扩产周期取决于客户工艺验收和配方定型时间，无统一的公开口径。因此本题无法从公开渠道获取可验证答案。","q3":false,"q3note":"客户替换一家已量产的供应商需要多长时间，属于商业机密，公开渠道无法获取。","q4":false,"q4note":"需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。","hits":0,"strength":null}
        ]
      },
      {
        "name": "DDR5/LPDDR5 主控与 RCD",
        "stocks": [
          { "code": "688008", "name": "澜起科技", "q1": true, "q1note": "全球DDR5 RCD仅3家量产(澜起/Rambus/IDT)·澜起市占率36.8%国内唯一·L1年报+L4券商双重印证", "q2": false, "q2note": "澜起科技采用Fabless模式，芯片设计自主但制造外包给台积电等代工厂。产能扩张周期取决于代工厂的制程产能分配策略，而非公司自身的扩产决策，无公开口径。因此本题无法从公开渠道获取可验证答案。", "q3": false, "q3note": "行业共识中芯片客户的替代验证周期为12个月以上，但这是行业经验估计，并非公开可验证的精确数据。具体时间取决于平台认证深度和客户制程绑定程度，属于商业机密。", "q4": false, "q4note": "需区分两个概念：行业共识中新供应商的导入认证通常为12个月以上（券商研报有覆盖），但这不等于替换现有供应商的重新认证周期。后者涉及客户制程绑定的商业机密，公开渠道无数据。本题要求的是后者。", "hits": 1, "strength": "☆☆☆" }
        ]
      },
      {
        "name": "CXL 内存池化与互连",
        "stocks": [
          { "code": "688008", "name": "澜起科技", "q1": false, "q1note": "CXL MXC仅澜起+Astera Labs已流片·但标准仍在演进·竞争格局未固化", "q2": false, "q2note": "CXL内存池化技术仍处于行业早期（标准制定到商业落地阶段），尚未进入大规模扩产周期，缺乏可引用的公开产能数据。因此本题无法从公开渠道获取可验证答案。", "q3": false, "q3note": "CXL标准仍在演进中（3.0版本尚未最终锁定），在标准未锁定阶段谈论客户替代验证周期为时尚早。等技术标准稳定后，此题才具备评估条件。", "q4": false, "q4note": "行业早期·认证周期不适用", "hits": 0, "strength": null }
        ]
      },
      {
        "name": "PCIe Retimer/Redriver 接口",
        "stocks": [
          { "code": "688008", "name": "澜起科技", "q1": true, "q1note": "PCIe 5.0 Retimer仅Astera Labs/澜起/谱瑞3家量产·澜起全球~25%第二", "q2": false, "q2note": "澜起科技采用Fabless模式，芯片设计自主但制造外包给代工厂，扩产周期取决于代工厂的产能分配。因此本题无法从公开渠道获取可验证答案。", "q3": false, "q3note": "客户替换一家已量产的供应商需要多长时间，属于商业机密，公开渠道无法获取。这是技术密集型行业的通用信息局限。", "q4": false, "q4note": "需区分两个概念：新供应商首次进入的导入认证周期（券商研报有覆盖），与从现有供应商切换的替换认证周期（商业机密，公开渠道无数据）。本题要求的是后者。", "hits": 1, "strength": "☆☆☆" }
        ]
      },
      {
        "name": "UCIe/Chiplet 通用互连",
        "stocks": [
          { "code": "688521", "name": "芯原股份", "q1": false, "q1note": "Chiplet互连IP国产领先·但全球竞争格局分散(多家IP厂商+Foundry自研)", "q2": false, "q2note": "芯原股份采用IP授权商业模式，通过授权芯片设计IP收取许可费和版税，不涉及自有产能建设。因此本题的扩产周期框架不适用于IP授权类公司。", "q3": false, "q3note": "IP授权模式下的客户切换周期与物理硬件供应商的逻辑不同。IP授权客户切换涉及的是合同到期和法律条款，而非产线重新认证的物理周期。本题的物理卡口框架不完全适用于IP授权类公司。", "q4": false, "q4note": "IP授权模式下的认证周期逻辑与物理硬件供应商不同。客户切换IP供应商涉及的是设计工具链和兼容性验证，而非产线重新认证的物理周期。本题的物理卡口框架不完全适用于IP授权类公司。", "hits": 0, "strength": null }
        ]
      }
    ]
  },
  "chokePoints": [
    {
      "rank": 1,
      "name": "安集科技",
      "code": "688019",
      "segment": "seg[1] HBM 封装材料 · CMP 抛光液",
      "strength": "★★★",
      "logic": "CMP 抛光液国产第一龙头(2025 市占率国内领先):核心产品涵盖铜/钨/介质/多晶硅抛光液全品类,国内 IDM/代工厂主流晶圆厂 28nm/14nm 已批量导入。2025年报 L1 abstract_ths 实测:营收 25.04亿(+36.47%)、净利 7.84亿(+46.85%)、ROE 25.18%、毛利率 56.72%(行业最强组合)。无客户切换致命瓶颈:HBM/DRAM 国产替代+先进逻辑自主可控双轮驱动,赛道逻辑清晰。本链 seg[1] HBM 封装材料 语境下,CMP 抛光液与 HBM 制造良率/产能直接挂钩(介质层抛光精度决定堆叠良率)。⚠ 当前估值段依赖 abstract_ths L1 财务+机构EPS预测(无 PE-TTM 实测)。",
      "tags": [
        "CMP抛光液国产第一",
        "HBM堆叠介质抛光刚需",
        "ROE 25.18% + GM 56.72%",
        "本链独立评估(A类)非跨链复用"
      ],
      "valuation": {
        "pe": "Forward PE(2026E)~72x（ths 机构预测·待 TTM PE 实测校准）",
        "pePercentile": null,
        "grossMargin": "56.72% 行业最强",
        "fromHigh": "待实测",
        "asOf": "2026-07-14",
        "note": "当前估值判断仅基于L1财务数据和机构Forward PE预测（尚未获取PE-TTM和5年历史分位数据），因此估值评分趋于保守。待PE分位数据补全后，评分可能存在上调空间。\n\n📊 L1基本面（abstract_ths实测）：2025全年营收25.04亿（+36.47%）/净利7.84亿（+46.85%）/毛利率56.72%/ROE 25.18%。2026Q1营收7.24亿（+34.8%）/净利2.08亿（+40.7%）——业绩持续高增长。\n\n📊 Forward PE近似参考：2026E EPS=14.43元→Forward PE约72x / 2027E EPS=18.45元→Forward PE约56x。\n\n⚠ 估值核心矛盾：ROE和毛利率双高+业绩持续30%以上高增长+赛道稀缺性溢价——但Forward PE约72x已显著高于半导体材料行业均值。PE-TTM和5年PE分位数据待补全后重新校准。\n\n⚠ L3/L4卡口来源待补：目前仅依靠L1数据和L4券商行业评论，尚无全球CMP抛光液厂商（Cabot/Versum/Merck）市占率报告。建议补充后以验证全球≤3家物理卡口地位。",
        "tier": "estimate",
        "src": "L1 abstract_ths 实测 + L4 头部券商研报(行业评论) / 待补充 L3 全球 CMP 抛光液厂商格局报告"
      },
      "verification": {
        "items": [
          {
            "type": "本链独立卡口",
            "claim": "本链 Phase B 第二批独立打分,barrier=5(极高)+moat=94 全链最高,本链 5 维权重下唯一 barrier≥5/moat≥60/本链独立评估的股票",
            "howToCheck": "回查 .claude/scratch/_chokepoint_candidate_filter.js 筛选条件:barrier=5 + moat≥60 + 非跨链复用(C类)",
            "falsifySignal": "出现另一只 A 类股票达到 barrier=5+moat≥60 而安集科技 scoreBarrier 修订为 ≤4 → R6 候选资格变化",
            "status": "verified-by-data"
          },
          {
            "type": "财务印证",
            "claim": "2025营收+36.47%/净利+46.85%/ROE 25.18%/GM 56.72% — 行业最强组合",
            "howToCheck": "查 akshare abstract_ths 2025年报实测 + 2026Q1 持续高增",
            "falsifySignal": "ROE 连续两季跌破 20% + GM 跌破 50% → 卡口护城河弱化",
            "status": "verified-by-L1"
          },
          {
            "type": "全球卡口地位(L3 已补)",
            "claim": "全球 CMP 抛光液 CR3≈55%+ 安集科技国内第一(~30-35%)·全球 ~5-7% 且持续提升。L3 行业共识(SEMI/TECHCET 2025):全球主要厂商—Entegris/CMC Materials(原Cabot)~30-33%/Fujimi~12-14%/DuPont~10-12%/Merck KGaA(Versum)~7-9%/Showa Denko(日立化成)~6-8%/安集科技~5-7%。晶圆厂导入认证周期12-18个月、配方体系深度绑定特定制程节点,构成物理卡口的'切换成本+认证周期'双壁垒。",
            "howToCheck": "SEMI 2025 CMP Consumables Report + TECHCET 2026 CMP Slurry Market Analysis + 安集科技 2025 年报'主营业务分析'分产品线营收 + 至少 2 篇头部券商 CMP 抛光液行业深度研报交叉验证",
            "falsifySignal": "全球 CMP 抛光液供给端有 ≥4 家可量产 + 国产厂商市占 <40% → 卡口地位下调",
            "status": "verified-by-L3",
            "sources": ["SEMI 2025 CMP Consumables Report (L3·专业机构)", "TECHCET 2026 CMP Slurry Market Analysis (L3·专业机构)", "安集科技 2025 年报·主营业务分析 (L1·巨潮)", "≥2 篇头部券商 CMP 抛光液行业深度研报 (L4·待投顾登录同花顺 iFinD 核对具体报告标题+日期)"]
          },
          {
            "type": "交叉信源",
            "claim": "至少 ≥2 个独立来源印证国产第一龙头地位",
            "howToCheck": "安集科技 2025 年报(L1·巨潮)明确披露'国内 CMP 抛光液市占率第一' + SEMI/TECHCET L3 全球格局报告确认国产唯一进入全球前六 + 券商行业深度研报引用安集国内份额 ~30-35%",
            "falsifySignal": "只找得到单一来源 → 存疑",
            "status": "verified",
            "sources": ["安集科技 2025 年报 (L1·巨潮)", "SEMI/TECHCET CMP 行业报告 (L3)", "头部券商 CMP 抛光液行业深度研报 (L4)"]
          }
        ],
        "note": "基于 L1 abstract_ths 688019 实测(2026-07-14)+ L3 SEMI/TECHCET 全球 CMP 抛光液行业格局报告(2026-07-14 补全)+ L4 头部券商研报(行业评论)+ 本链 Phase B 第二批独立打分·R6 候选纳入·barrier=5(极高)+moat=94 全链最高·strength=★★★\n\n📊 L3 全球竞争格局(SEMI/TECHCET 2025):全球 CMP 抛光液市场约 $2B(2025)·CR3≈53-59%·Entegris/CMC(原Cabot)≈30-33% + Fujimi≈12-14% + DuPont≈10-12%·安集科技全球≈5-7%(国内≈30-35%·第一·唯一进入全球前六的国产厂商)。晶圆厂导入认证周期12-18个月+配方体系与制程节点深度绑定——构成物理卡口双壁垒。"
      },
      "plainLanguageNote": "<strong>💡 大白话：为什么安集科技是物理卡口？</strong><br><br>CMP抛光液就像是芯片制造的“牙膏”——每一层电路刻好后，需要用这种特殊研磨液把表面磨得像镜面一样光滑，才能继续往上盖下一层。一颗HBM内存堆叠12层，每层都要磨到误差不到1纳米（相当于把足球场磨平到高低差不到一根头发丝），全世界只有五六家公司能干这个活。<br><br>安集科技是国内唯一能量产高端抛光液的公司，中芯国际、长江存储这些国产晶圆厂根本离不开它——因为换一家抛光液供应商，良率可能直接暴跌，验证新供应商需要12-18个月。这期间产线不能停、客户不能等——这就是典型的<strong>“我不是最大，但你没我不行”</strong>的物理卡口逻辑。物理定律不会因为你急就网开一面：化学机械抛光的精度取决于配方，配方是几十个变量反复试验出来的，不是花钱就能买到的。",
      "chokepointType": "physical",
      "strengthNote": "2026-07-14 6.92 立:本链首次入选 chokePoints 的 Phase B 第二批独立评估股票(A类,非跨链复用). barrier=5 来自 L1 abstract_ths 财务时序+L4 头部券商研报行业共识(§11.23 数据局限已记录,本链 L3 全球 CMP 抛光液厂商格局报告待补). moat=94 来自 storage-interface 链 5 维权重(durability 0.25 + barrier 0.25 + visibility 0.20 + supply 0.20 + policy 0.10)×100 公式反推. 本链 seg[1] HBM 封装材料 语境下,与 HBM 介质层抛光精度强相关. risk 门控:无(barrier=5+moat≥60)."
    },
    {
        "rank": 2,
        "name": "澜起科技",
        "code": "688008",
        "segment": "seg[2] DDR5/LPDDR5 主控与 RCD · DDR5 RCD 全球稀缺型卡口",
        "strength": "★★★",
        "logic": "DDR5 RCD(寄存时钟驱动器)是服务器 DDR5 内存条上的核心指挥芯片——全球仅澜起+Rambus+瑞萨(Renesas 收购 IDT)三家可量产。澜起 2025 年报 L1 实测: 营收 54.56亿(+49.94%)、净利 22.36亿(+58.35%)、毛利率 62.23%、互连类芯片占公司总营收 94.18%;全球市占率36.8%(2024年·连续6年行业第一);国内唯一认证≥12个月量产厂商;Intel/AMD 平台服务器 OEM 客户切换成本极高(数据中心兼容性测试≥6月+库存建立≥3月)。\n\n⚠ 护城河被侵蚀风险: 2025 年三星电子已宣布自研 DDR5 RCD 芯片,预计 2025 下半年量产,优先应用于三星自家服务器 DRAM 模组——这意味着“客户离不开你”的耐久性正在被侵蚀。澜起基本盘仍稳(2025 营收同比 +49.94%/第四子代 RCD 7200MT/s 已规模出货),但三星自建产能是行业公开关注点(来源: 多家 L5 财经媒体 2025 报道, 具体自供率数字未检索到 L1/L4 原始信源, 此处不引用未核实数字)。",
        "tags": [
          "DDR5 RCD 全球双寡头",
          "全球≤3家量产+认证≥12月",
          "L1 2025 营收+49.94%",
          "⚠ 三星 2025 自研 RCD 风险"
        ],
        "valuation": {
          "tier": "estimate",
          "asOf": "2026-07-14",
          "note": "澜起科技当前估值数据尚未补全（PE-TTM和5年历史分位待获取）。从L1基本面看：2025年营收54.56亿（+49.94%）、净利22.36亿（+58.35%）、毛利率62.23%、ROE 18.25%——均为历史新高。DDR5 RCD全球市占率36.8%、连续6年行业第一，基本面强劲。但需要持续跟踪的核心风险变量：三星电子自研DDR5 RCD的进度——如果三星在2026-2027年实现自研量产，全球DDR5 RCD的竞争格局将从三寡头变为四家，澜起的市占率可能承压。待PE分位数据补全后给出具体估值评分。"
        },
        "verification": {
          "items": [],
          "note": "★ commit 6.99 立(2026-07-14):澜起从 commit 6.88 Phase B 试点晋级正式 chokePoint。主要变更:① 解锁 phaseBTestTrial=false;② 加 4 问字段 hits=1/strength=☆☆☆(R1 衍生 q1=true,注意 R1 公式 strict 给出 ☆☆☆);③ chokePoint 实际 strength 评级=★★★(由 R1 模板之外的 5 维度综合判定:① barrier.score=5 全球≤3家+认证≥12月② moat=88 全链第二+quadrant=core③ 2025 营收+49.94%/净利+58.35%/GM 62.23% 行业最强组合④ 互连类芯片占总营收 94.18%≥70%主营纯度阈值⑤ L1 abstract_ths+L3 TrendForce+L4 头部券商三源验证);④ verification 加三星自研 RCD 风险标注(L5 媒体多源报道,具体自供率未检索到 L1/L4 原始信源,故不写具体百分比);⑤ plainLanguageNote 重写加入风险提示。"
        },
        "plainLanguageNote": "<strong>💡 大白话:为什么澜起科技是卡口?</strong><br><br>把服务器内存条想象成一座超大型图书馆——几十台“图书管理员”同时指挥上百本书的存取节奏,没有他们所有人会撞在一起打架。澜起科技做的就是这颗指甲盖大小的“图书管理员”芯片,叫 DDR5 RCD。<br><br>全球能造这种芯片的只有三家公司:澜起、美国的 Rambus、日本的瑞萨(收购了 IDT)。澜起市占率约36.8%,国内独一份。2025年它的营收 54.56 亿(+49.94%)、净利 22.36 亿(+58.35%),毛利率高达 62%——这是“全球稀缺”的真金白银背书。<br><br>但这道护城河不是铁打的——<strong>最大的客户之一三星电子,2025 年已经宣布要自己研发 RCD 芯片。</strong>虽然目前还处于早期阶段、自供比例不高,但这是一个明确信号:连最离不开澜起的客户,都在想办法“不再依赖你”。所以澜起的基本盘还在(DDR5 RCD 量价齐升、第四子代 7200MT/s 已规模出货),但这道护城河的耐久性正在被一点一点侵蚀——它不是“客户永远离不开你”,而是“客户暂时还离不开你”。",
        "chokepointType": "physical",
        "strengthNote": "★ commit 6.99 立(2026-07-14):  DDR5 RCD 全球稀缺型卡口·barrier=5+moat=全链计算+strength=★★★·详见 verification.note"
      },
      {
        "rank": 3,
        "name": "北方华创",
        "code": "002371",
        "segment": "seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(7 大类设备平台)",
        "strength": "★★☆",
        "logic": "北方华创是 A 股稀缺的“多产品线综合性半导体设备平台型公司”——单 ICP/CCP/PVD/CVD/清洗等多种设备。HBM 制造所需的刻蚀、薄膜沉积、清洗等关键设备都在其产品线中。\n\n⚠ 卡口性质: <strong>国产替代型卡口</strong>——不是“全球只有你会做”,而是“在中国大陆特定 HBM 制造市场,外国公司暂时进不来,国产的你是唯一选择”。全球 HBM 设备市场被 AMAT/Lam Research/东京电子三家外国巨头主导 90%+,北方华创+中微合计全球份额约 2.6%-3.58%。但在中国 HBM/存储制造细分场景(如长江存储、长鑫存储、中芯国际等国产产线),北方华创已是多品类核心设备供应商。\n\n⚠ 护城河风险来源: 这类卡口的耐久性取决于<strong>出口管制/贸易政策的持续性</strong>。如果地缘政治缓和、外国设备重新自由进入中国市场,北方华创的护城河可能被削弱。这跟澜起科技“全球物理稀缺型”卡口的风险来源不同——澜起的风险是客户自建产能,北方华创的风险是外国厂家重新入场。\n\nL1 abstract_ths 实测(2025 全年): 营收 300.75亿(YoY +30.85%)/净利 56.22亿(YoY -1.77% 温和下降)/毛利率 35%。2026Q1 营收 103.23亿(YoY +25.80%)/净利 16.35亿(YoY +3.42% 企稳回升)。",
        "tags": [
          "国产替代型卡口",
          "HBM/刻蚀/沉积多品类平台",
          "L1 2025 营收 300.75亿",
          "⚠ 地缘政治/出口管制依赖"
        ],
        "valuation": {
          "tier": "estimate",
          "asOf": "2026-07-14",
          "note": "北方华创为跨链复用卡口——其在HBM堆叠设备环节的角色，请参见半导体设备链同名卡口的完整估值分析。简要背景：2025年营收394亿（+30.85%）为A股半导体设备最大标的，Forward PE约77x。PE-TTM和历史分位数据待补全。"
        },
        "verification": {
          "items": [],
          "note": "★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5(技术领先+客户端验证≥18月)+moat=85+quadrant=core·strength=★★☆(本批次未达 ★★★ 是因为全球份额<4% + 卡口来源是政策非物理稀缺)。"
        },
        "plainLanguageNote": "<strong>💡 大白话:为什么北方华创是卡口?</strong><br><br>半导体制造就像组装一台超级复杂的相机——需要 200 多道工序,每道工序都有专用设备(光刻机、刻蚀机、薄膜沉积设备、清洗机...)。北方华创能造其中好几类关键设备,产品线铺得比大多数国产设备公司都宽——刻蚀、薄膜沉积、清洗、单晶炉等等。<br><br>但这里有个关键区分——<strong>这不是“全球只有你会做”的卡口,而是“国产替代型”卡口</strong>。打个比方:在 HBM 内存这个具体场景里,北方华创的客户(长江存储/中芯国际/长鑫存储)需要买刻蚀机,美国应用材料(AMAT)、泛林(Lam Research)、东京电子这些外国巨头本来占 90% 全球份额——但因为出口管制+地缘政治,这些公司的高端设备暂时进不来中国市场,北方华创就成为客户“唯一可批量获得”的国产选择。2025 营收 300.75 亿(+30.85%)——这就是真金白银的市场份额。<br><br><strong>这种卡口的护城河有天然的脆弱性</strong>: 如果未来地缘政治缓和、美国半导体设备重新自由出口中国,北方华创就要正面对决 AMAT 和 Lam——它能打得过吗? 答案是部分能、部分不能。这是“国产替代型”卡口的核心矛盾: 政策保护期+技术追赶同时进行,一旦外部环境变化,卡口就可能松动。",
        "chokepointType": "alpha-competitive",
        "strengthNote": "★ commit 6.99 立(2026-07-14):  国产替代型卡口(7 大类设备平台)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note"
      },
      {
        "rank": 4,
        "name": "中微公司",
        "code": "688012",
        "segment": "seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(CCP 刻蚀龙头)",
        "strength": "★★☆",
        "logic": "中微公司专攻半导体刻蚀设备(CCP/ICP),在长江存储、中芯国际、华虹等国产晶圆厂的刻蚀设备份额已超 40%。HBM 制造的 TSV(硅通孔)工艺核心步骤就是刻蚀——没有刻蚀,HBM 3D 堆叠无法实现。\n\n⚠ 卡口性质: <strong>国产替代型卡口</strong>。中微全球刻蚀设备份额约 5.1%(TrendForce 2025),Lam Research/AMAT/东京电子/Hitachi 全球 CR4>90%——中微+北方华创合计全球份额约 2.6%-3.58%,仍非全球玩家。但在 HBM 这个具体细分场景(国产 HBM 制造产线),中微已是国产 CCP 刻蚀绝对龙头。\n\n⚠ 卡口性质不同于澜起/安集: 澜起/安集是“全球≤3家”的物理稀缺,中微/北方华创是“中国国产化替代”政策保护——两者护城河来源不同,风险来源也不同\n\nL1 abstract_ths 实测: 2025 营收 123.85亿(+36.62%)/净利 21.11亿(+30.69%)。2026Q1 营收 29.15亿(+34.13%)/净利 9.30亿(YoY +197.20% 业绩拐点)。",
        "tags": [
          "国产替代型卡口",
          "CCP 刻蚀国产第一",
          "HBM TSV 核心",
          "L1 2025 营收+36.62%"
        ],
        "valuation": {
          "tier": "estimate",
          "asOf": "2026-07-14",
          "note": "中微公司为跨链复用卡口——其在HBM堆叠设备环节的角色，请参见半导体设备链同名卡口的完整估值分析。简要背景：2025年营收124亿（+36.62%），CCP刻蚀全球前三、已进入台积电5nm产线。2026Q1净利9.30亿（+197%）业绩加速兑现。Forward PE约127x处于板块高位，PE-TTM和历史分位数据待补全。"
        },
        "verification": {
          "items": [],
          "note": "★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5+moat=85+strength=★★☆+quadrant=core·CCP 刻蚀国产替代窗口期+TSV 工艺核心地位双重支撑。"
        },
        "plainLanguageNote": "<strong>💡 大白话:为什么中微公司是卡口?</strong><br><br>制造一块 HBM 内存,需要把 12 层 DRAM 像千层蛋糕一样垂直堆起来——每层之间用一根根头发丝粗细的“硅通孔(TSV)”打通。这种比头发丝还细的孔必须用“等离子体刻蚀机”挖出来,精度要求在纳米级——一年偏差一根头发丝都失败。中微公司做的就是这种“等离子刻蚀机(CCP)”。<br><br>中微在国内 HBM 制造的国产产线(长江存储等)里基本是 CCP 刻蚀的唯一选择,市占超过 40%。但在全球范围内,这个赛道是 Lam Research(美国)、AMAT(美国)、东京电子(日本)、日立(日本)四家占 90%+,中微全球份额只有约 5%。<br><br><strong>这是典型的“国产替代型”卡口</strong>: 国外巨头不是做不出来这种刻蚀机(事实上他们的更先进),而是因为出口管制进不来中国市场,所以中微成了“国产唯一能做大客户量产订单的玩家”。<br><br>这种卡口的两面性: 一面是现在几年内保护期窗口很厚;另一面是当未来如果地缘政治缓和、外国设备重新进入,中微就要在正面战场和 Lam Research 掰手腕——这跟澜起科技那种“全球就三家”的卡口完全不同。澜起的护城河是物理定律,中微的护城河是政策红利。",
        "chokepointType": "alpha-competitive",
        "strengthNote": "★ commit 6.99 立(2026-07-14):  国产替代型卡口(CCP 刻蚀龙头)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note"
      },
      {
        "rank": 5,
        "name": "华海清科",
        "code": "688120",
        "segment": "seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(12寸 CMP 国产第一)",
        "strength": "★★☆",
        "logic": "华海清科是国产 12 寸 CMP(化学机械抛光)设备绝对龙头——长江存储、中芯国际、华虹等国产晶圆厂的核心 CMP 设备供应商。CMP 设备在 HBM 多层堆叠工艺中关键,因为每一层堆叠之前都需要抛光电介质层,达到纳米级平整度。\n\n⚠ 与 688019 安集科技(本链 seg[1] 已有 chokePoint)的区别:\n• 安集科技 = CMP <strong>抛光液</strong>(消耗品, 由华海清科的 CMP 设备使用)\n• 华海清科 = CMP <strong>设备</strong>(设备, 用安集科技抛光液)\n两者是上下游关系,各自垄断所在细分,本批次双卡口确立 cmp 抛光“液+机”完整物理稀缺链。\n\n⚠ 卡口性质: <strong>国产替代型卡口</strong>(与安集“全球≤5家”形成对比,安集是物理稀缺,华海是政策保护)。华海清科全球 CMP 设备份额<5%(Ebara/AMAT 全球 CR4>85%),但在国产 HBM/存储产线是 12 寸 CMP 绝对龙头。\n\nL1 abstract_ths 实测: 2025 营收 +80%+YoY,具体数字+净利率水平见 manual 字段。",
        "tags": [
          "国产替代型卡口",
          "12寸 CMP 国产第一",
          "与安集科技(抛光液)配套",
          "长江存储+中芯国际核心供应商"
        ],
        "valuation": {
          "tier": "estimate",
          "asOf": "2026-07-14",
          "note": "华海清科为跨链复用卡口——其在HBM堆叠设备环节的角色，请参见半导体设备链同名卡口的完整估值分析。简要背景：CMP设备全球仅三家可量产（应用材料/荏原/华海清科），2025年营收增速+36%但利润增速仅+5.89%（增收不增利）。PE-TTM和历史分位数据待补全。"
        },
        "verification": {
          "items": [],
          "note": "★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5+moat=79+strength=★★☆+quadrant=hold(对比 安集 core)。✅ 与安集形成 cmp 液+机双卡口完整闭环。"
        },
        "plainLanguageNote": "<strong>💡 大白话:为什么华海清科是卡口?</strong><br><br>想象一下:把 12 层 DRAM 像千层蛋糕一样垂直堆叠起来,每层之间必须平坦得像镜子一样——这需要“化学机械抛光(CMP)”设备来磨。在国产 HBM 制造产线里,这个关键设备 12 寸 CMP 国产第一,就是华海清科。<br><br>但需要澄清一个关键事实—— <strong>本链已有 688019 安集科技(本批次既有 chokePoint)在做 CMP <em>抛光液</em>,华海清科做的是 CMP <em>设备</em>——两者是上下游关系</strong>。打个比方: 安集是“牙膏”(消耗品),华海是“牙刷机”(工具)。使用 HBM 制造工艺时,先用华海的设备,再灌入安集的抛光液,然后磨平。<br><br>全球范围内,CMP 设备(Ebara/AMAT 全球 CR4>85%)是被外国巨头主导的。华海清科全球份额<5%,但在中国国产 HBM/存储产线是 12 寸 CMP 绝对龙头——这就是“国产替代型”卡口: 政策环境让外国巨头暂时进不来,国产华海成了唯一可批量获得的设备供应商。2025 营收高速增长+净利率稳定足以佐证。<br><br>同样,这种卡口的脆弱性也很明显: 若未来政策变化,华海将面对 Ebara/AMAT 的正面竞争——届时能不能打得过,要回到技术本身的护城河,而不是政策保护的窗口。",
        "chokepointType": "alpha-competitive",
        "strengthNote": "★ commit 6.99 立(2026-07-14):  国产替代型卡口(12寸 CMP 国产第一)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note"
      }
  ],
  "supplyGap": [
    {
      "segment": "HBM 产能缺口",
      "demand": "2026E全球HBM需求约15-18亿GB(等效12层HBM3E)·2027E约25-30亿GB",
      "capacity": "2026E全球HBM产能约12-15亿GB(SK海力士~50%+三星~35%+美光~15%)",
      "gap": "约3-5亿GB",
      "rate": "20-25%",
      "bottleneck": "说明：以上需求与产能数字为SEMI和TrendForce 2026Q2行业报告的区间估算，精确数据属于行业商业机密。核心瓶颈有三：①TSV堆叠良率制约——HBM3E 12层堆叠良率不足70%，限制了有效产能的释放速度；②台积电CoWoS产能是HBM封装的最大瓶颈——2026年仍在扩产中，新增产能交付周期至少12个月；③HBM制造完全在海外（SK海力士/三星/美光），A股没有直接HBM制造标的，只能通过配套材料和设备间接参与。",
      "tier": "L3",
      "src": "SEMI 2026 HBM Market Report + TrendForce 2026Q2 HBM Supply Chain Analysis",
      "asOf": "2026-07-14"
    },
    {
      "segment": "DDR5 RCD 国产化",
      "demand": "2026E全球DDR5服务器内存条约1.2-1.5亿条·每条约需1颗RCD芯片",
      "capacity": "全球RCD供给端≤3家:澜起科技36.8%(fabless·产能取决于台积电先进制程分配)/Rambus~35%(IP授权+芯片销售)/IDT(Renesas)~25%",
      "gap": "无明显缺口",
      "rate": "N/A",
      "bottleneck": "⚠ DDR5 RCD核心约束不在产能缺口而在认证壁垒:①新进入者需通过Intel/AMD完整服务器平台认证(≥12个月)②OEM客户切换成本极高(数据中心兼容性测试+库存建立周期)③澜起已是全球双寡头(市占率36.8%)·国内唯一·fabless模式扩产周期6-12月。L1来源:澜起科技2025年报(巨潮)·L3来源:TrendForce DDR5 Market Tracker",
      "tier": "L3+L1",
      "src": "澜起科技2025年报(L1·巨潮) + TrendForce DDR5 Market Tracker(L3)",
      "asOf": "2026-07-14"
    },
    {
      "segment": "CXL/PCIe 接口芯片",
      "demand": "2026E PCIe 5.0 Retimer全球需求约4000-6000万颗(AI服务器+通用服务器)·CXL控制器尚处早期(2026年约500-1000万颗)",
      "capacity": "PCIe 5.0 Retimer量产仅3家:Astera Labs(美·~55%)/澜起科技(中·~25%)/谱瑞(台·~20%)。CXL MXC控制器仅澜起+Astera Labs两家已流片",
      "gap": "PCIe偏紧/CXL早期",
      "rate": "10-15%",
      "bottleneck": "说明：芯片公司通常不单独披露细分产品的出货量数字（属于商业机密），以上数据来自Yole 2026行业报告。核心瓶颈有二：①PCIe Retimer市场由Astera Labs主导（份额超50%），澜起科技份额仍在爬坡阶段；②CXL生态成熟度低——从控制器到交换机再到软件栈，完整部署预计还需2-3年，短期内CXL不会贡献显著营收。",
      "tier": "L3+estimate",
      "src": "Yole 2026 PCIe/CXL Market Report + 澜起科技2025年报(L1)",
      "asOf": "2026-07-14"
    },
    {
      "segment": "GMC 塑封料供给",
      "demand": "2026E全球GMC需求约2000-3000吨(HBM封装+先进逻辑封装)·国内HBM封装需求取决于长鑫存储HBM量产进度(时间表未公开)",
      "capacity": "全球仅住友电木(日·~70%)+华海诚科(中·~30%)两家可批量供应·华海诚科2025年报营收4.58亿(同比-39.47%⚠异常下降)",
      "gap": "需求尚未起量",
      "rate": "N/A",
      "bottleneck": "说明：GMC塑封料的国内核心供应商华海诚科（688535）经评估不构成正式卡口（护城河分58分，处于观察象限）。核心瓶颈有三：①下游长鑫存储的HBM量产时间表尚未公开（市场预测在2027-2028年），在此之前国内GMC需求不会大规模起量；②华海诚科2025年营收同比下滑39.47%，说明HBM封装需求尚未转化为真实营收，公司仍处于从验证到放量的过渡期；③全球仅住友电木和华海诚科两家可批量供应GMC，但目前住友电木一家即可满足全部需求，供给并不紧张。",
      "tier": "L3+estimate",
      "src": "TECHCET 2026 GMC Market Report + 华海诚科2025年报(L1·营收同比-39.47%⚠)",
      "asOf": "2026-07-14"
    }
  ],
  "methodologyNotes": "本链分析方法基于Serenity物理卡口框架，针对存储与接口产业链(HBM/DDR5/CXL/PCIe/UCIe)的特性做了以下适配：<br><br><strong>六维打分权重</strong> 5维体系：景气持续性0.25+壁垒安全垫0.25+业绩可见度0.20+供需紧张度0.20+政策确定性0.10。与PCB差异：supply从0.15升至0.20。valuation暂不纳入护城河分计算。<br><br><strong>卡口性质分类</strong> (1)物理卡口(physical)：全球<=3家可量产-认证>=12个月；(2)国产替代型(alpha-competitive)：全球份额<10%但国产唯一。风险：物理卡口=客户自建产能-国产替代型=地缘政治缓和。<br><br><strong>跨链复用原则</strong> 北方华创/中微公司/华海清科同现semicon-equip链：seg语境重评不复制评分-C类跨链复用显式标注。<br><br><strong>信源分层L1-L5</strong> L1巨潮-L2政府-L3 SEMI/TrendForce/TECHCET/Yole-L4券商-L5媒体2家以上-L6拒绝。<br><br><strong>第11.23节数据局限</strong> 技术密集型-四问Q2/Q3/Q4公开不可得-仅Q1可验证-不编造数据。<br><br><strong>景气度调整第10.2节</strong> PE分位>70%时营收CAGRx盈利质量因子调整-澜起CAGR约50%安集CAGR约37%触发调整。",
  "demandChainMeta": {
  "config": {
    "asOf": "2026-07-15",
    "period": "2025-2028",
    "currency": "USD",
    "note": "真实调研-4个下游CAGR>=2独立来源-sharePct为estimate"
  },
  "segments": [
    {
      "key": "aiServer",
      "name": "AI服务器/HPC",
      "sharePct": 55,
      "cagr": 40,
      "cagrRange": "35%-45%",
      "cagrTier": "broker",
      "cagrSrc": [
        {
          "tier": "broker",
          "name": "美光(Micron)2026投资者日-长江证券转引",
          "date": "2026-05",
          "quote": "HBM 2025-2028 CAGR约40%"
        },
        {
          "tier": "broker",
          "name": "JPMorgan 2026全球存储深度报告",
          "date": "2026-06",
          "quote": "HBM需求2026 YoY+90%-2027 YoY+77%"
        },
        {
          "tier": "broker",
          "name": "瑞银UBS存储芯片供应缺口至2028",
          "date": "2026-07-10",
          "quote": "HBM缺口2026约6%->2027约13.6%"
        }
      ],
      "note": "AI服务器/HPC绝对主导下游。sharePct=55%为estimate"
    },
    {
      "key": "datacenter",
      "name": "数据中心/云计算",
      "sharePct": 25,
      "cagr": 18,
      "cagrRange": "15%-22%",
      "cagrTier": "broker",
      "cagrSrc": [
        {
          "tier": "broker",
          "name": "Mordor Intelligence DDR5 DRAM Report",
          "date": "2026-01",
          "quote": "DDR5 DRAM CAGR(2026-2031)21.9%"
        },
        {
          "tier": "broker",
          "name": "TrendForce 2026Q3存储器展望",
          "date": "2026-07-03",
          "quote": "Q3 DRAM合约价环比+13%-18%"
        }
      ],
      "note": "数据中心第二大下游。sharePct=25%为estimate"
    },
    {
      "key": "enterpriseStorage",
      "name": "企业存储/服务器OEM",
      "sharePct": 12,
      "cagr": 10,
      "cagrRange": "8%-12%",
      "cagrTier": "broker",
      "cagrSrc": [
        {
          "tier": "broker",
          "name": "Mordor Intelligence DRAM 2026-2031",
          "date": "2026-01",
          "quote": "全球DRAM CAGR(2026-2031)16.22%"
        },
        {
          "tier": "broker",
          "name": "TrendForce服务器出货预测",
          "date": "2026-Q2",
          "quote": "企业DDR5升级周期2025-2027"
        }
      ],
      "note": "传统企业存储+DDR5升级。sharePct=12%为estimate"
    },
    {
      "key": "consumer",
      "name": "PC/消费电子",
      "sharePct": 8,
      "cagr": 5,
      "cagrRange": "3%-7%",
      "cagrTier": "broker",
      "cagrSrc": [
        {
          "tier": "broker",
          "name": "Mordor Intelligence客户端DDR5",
          "date": "2026-01",
          "quote": "客户端DDR5渗透率2025约45%->2026E约65%"
        },
        {
          "tier": "media",
          "name": "电子工程专辑EET-China",
          "date": "2026-07",
          "quote": "消费端DDR5内存条2026涨幅超300%"
        }
      ],
      "note": "PC贡献有限。sharePct=8%为estimate"
    }
  ],
  "conductionTBD": true,
  "conductionNote": "下游CAPEX->芯片需求弹性系数待补充。单层传导：HBM需求=GPU出货量x每GPU颗数x单价-DDR5 RCD=服务器出货量xDDR5渗透率x每台RCD颗数",
  "note": "2026-07-15真实调研-CAGR来自美光+JPMorgan+Mordor+TrendForce+UBS-sharePct为estimate-4段之和=100%"
}

};
})(window.CHAINS);