window.CHAINS = window.CHAINS || {};
(function(CHAINS){
  CHAINS["advanced-packaging"] = {
  "id": "advanced-packaging",
  "name": "先进封装",
  "icon": "📦",
  "meta": {
    "status": "Phase A 骨架 · 10 只新标的 dims6 待 Phase B 补全 · 7 只 C 类跨链复用",
    "asOf": "2026-07-16",
    "tier": "estimate",
    "source": "WebSearch 行业调研 + 现有四链 cross-reference",
    "note": "OSAT 封测代工为核心增量·设备/材料/载板段位以 C 类跨链复用为主"
  },
  "prosperity": {
    "verdict": {
      "compositeScore": 78,
      "compositeLabel": "强劲景气 (AI 算力驱动封装需求爆发)",
      "stockHint": "先进封装是 AI 芯片产能瓶颈的核心环节，CoWoS 产能缺口预计延续至 2027 年。长电科技/通富微电承接台积电外溢订单，设备和材料国产替代加速。但需注意：OSAT 行业竞争格局与前端晶圆制造不同——全球 OSAT 集中度中等（日月光/安靠/长电/通富/华天 CR5≈60%），非 ≤3 家寡头垄断格局。🆪 综合分为 AI 主观测算·Phase B 补真实六维数据后修正。",
      "asOf": "2026-07-16"
    },
    "dims": [
      {
        "key": "durability",
        "score": 4,
        "trend": "up",
        "tier": "estimate",
        "reason": "AI 算力驱动 CoWoS/2.5D/3D 封装需求至少 3 年高景气(Phase B 补)",
        "asOf": "2026-07-16"
      },
      {
        "key": "visibility",
        "score": 3,
        "trend": "up",
        "tier": "estimate",
        "reason": "长电/通富已承接台积电 CoWoS 外溢订单·L4 券商覆盖(Phase B 补)",
        "asOf": "2026-07-16"
      },
      {
        "key": "policy",
        "score": 4,
        "trend": "up",
        "tier": "estimate",
        "reason": "大基金三期重点投向先进封装·国家集成电路产业支持(Phase B 补)",
        "asOf": "2026-07-16"
      },
      {
        "key": "supply",
        "score": 4,
        "trend": "up",
        "tier": "estimate",
        "reason": "全球 CoWoS 产能缺口 30-40%·台积电产能不足外溢至 OSAT(Phase B 补)",
        "asOf": "2026-07-16"
      },
      {
        "key": "valuation",
        "score": 2,
        "trend": "flat",
        "tier": "estimate",
        "reason": "SW 电子板块 PE≈118 倍·远高于 5 年中枢 56 倍·估值偏高(Phase B 补)",
        "asOf": "2026-07-16"
      },
      {
        "key": "barrier",
        "score": 3,
        "trend": "flat",
        "tier": "estimate",
        "reason": "OSAT 全球 CR5≈60%·非寡头垄断·但先进封装认证壁垒高(12-18月)(Phase B 补)",
        "asOf": "2026-07-16"
      }
    ],
    "dataSource": "🆪 AI 辅助评估(Phase B 补真实六维)",
    "pctNote": "所有 score 均为 Phase A 预估值·未经 abstract_ths L1 实测+豆包独立查询验证"
  },
  "cyclePosition": {
    "label": "AI 算力驱动封装需求爆发·CoWoS 产能建设周期 18-24 月",
    "tier": "estimate",
    "stage": "成长期 → 扩张期",
    "reason": "🆪 Phase B 补真实周期定位·当前为 AI 主观判断",
    "watchSignals": [
      "CoWoS产能缺口是否如期收窄",
      "台积电/日月光扩产节奏",
      "OSAT三巨头盈利改善进度"
    ]
  },
  "plainIntro": {
    "analogy": "先进封装 = 芯片界的「3D 打印」——不是简单地把芯片装进塑料壳，而是像搭乐高一样把不同工艺的芯片精密堆叠在一起",
    "paragraphs": [
      "当芯片制程逼近物理极限（3nm→2nm→1.4nm），靠缩小晶体管提升性能越来越难。<strong>先进封装</strong>打开了另一条路——把多个芯片（CPU+GPU+HBM）用 2.5D/3D 堆叠的方式集成在一起，让信号在芯片之间以最短距离传输，性能提升 30-50% 的同时降低功耗。英伟达的 GB300 超级芯片、AMD 的 MI300 系列，核心机密不仅在设计，更在封装——<strong>没有先进封装，就没有 AI 大模型时代</strong>。",
      "<strong>全球 CoWoS 产能缺口有多大？</strong> 台积电 2026 年 CoWoS 产能预计约 60 万片，但英伟达一家的需求就接近这个数字——AMD、谷歌、亚马逊都在排队等产能。台积电产能不足带来的外溢效应，正加速中国 OSAT 龙头（长电科技/通富微电/华天科技）的先进封装订单增长。<strong>封装设备和材料的国产替代</strong>也因此从「可选项」变成「必选项」——临时键合设备国产化率<20%、临时键合胶<10%、ABF 膜 97% 依赖日本味之素，每一个数字背后都是一个从 0 到 1 的国产替代故事。"
    ],
    "flowSteps": [
      "硅晶圆/玻璃基板",
      "IC 载板(ABF/BT/Si 中介层)",
      "晶圆级封装(CoWoS/InFO)",
      "临时键合+解键合",
      "芯片堆叠键合(TCB/Hybrid Bonding)",
      "测试分选+成品"
    ],
    "highlightBox": "🔑 <strong>核心判断</strong>：先进封装的物理卡口不在 OSAT 封测代工环节（全球竞争充分），而在上游——封装设备（键合机国产化率<20%）和封装材料（ABF 膜 97% 依赖味之素）。投资逻辑两条线：① 长电/通富/华天承接台积电 CoWoS 外溢订单的业绩弹性 ② 芯源微/飞凯/艾森/深南的国产替代从 0 到 1 突破。",
    "coreLogic": "先进封装产业链的核心卡口不在封测代工环节（全球 OSAT 竞争充分），而在上游——封装设备（键合机/临时键合/解键合设备国产化率<20%）、封装材料（临时键合胶/PSPI/Underfill 国产化率<15%）、IC 载板（ABF 载板 97% 依赖日本味之素）。A 股的投资机会集中在两条线：① OSAT 龙头承接 CoWoS 外溢订单的业绩弹性 ② 封装设备和材料的国产替代从 0 到 1 突破。",
    "chainStory": [
      {
        "step": 1,
        "name": "IC 载板与中介层",
        "desc": "ABF/BT 载板·硅中介层·TGV 玻璃基板——先进封装的物理基础。FC-BGA 载板全球仅约 5 家公司可量产（ibiden/Shinko/Unimicron/深南/兴森），ABF 膜 97% 依赖日本味之素——绝对物理卡口。深南电路为大陆唯一批量交付（★★★ global-scarcity·正式物理卡口·良率>80%·广州 60 亿工厂 2027 投产），兴森科技 FC-BGA 小批量出货·第二国产供应商（barrier=3·追赶者·战略备选价值）。⚠️ 重要注脚：深南电路处于卡口的下游加工端——真正的核心瓶颈在 ABF 膜（味之素 97% 垄断），深南解决的是\"谁能把 ABF 膜加工成合格的 FC-BGA 载板\"（全球约 5 家能做到），而不是\"谁能自己做 ABF 膜\"（只有味之素）。",
        "barrier": "extreme",
        "choke": true,
        "domestic": "ABF 载板国产化率~4%·深南/兴森小批量突围",
        "barrierNote": "ABF 膜 97% 依赖日本味之素——绝对卡口",
        "keyStocks": [
          "002916",
          "002436"
        ],
        "source": "L3 Prismark 2026·L4 方正/国金证券 FC-BGA 行业分析"
      },
      {
        "step": 2,
        "name": "封装设备",
        "desc": "键合机/临时键合/解键合·光刻·塑封·检测——先进封装的制造工具。芯源微（688037）临时键合/解键合国产唯一——全球仅 TEL/EVG/芯源微三家可批量供货（★★★ global-scarcity·正式物理卡口·barrier=5），已批量出货台积电/长电/华天（C 类跨链·moat=81·hold）。芯碁微装（688630）直写光刻 DI 国内唯一（PCB LDI 全球市占 18.8% 第一·FOPLP/TGV 第二增长曲线·PE 195x 极度高估·C 类跨链）。文一科技（600520）12 寸晶圆级塑封设备·样机交付华为-盛合晶微·⚠️ 验证阶段（watch·moat=50·_phaseB_checklist 四项中三项未查到）。快克智能（603203）TCB 热压键合国产追赶者（C 类跨链·全球 ASM Pacific/BESI 主导·踩线 hold·moat=60）。",
        "barrier": "extreme",
        "choke": true,
        "domestic": "键合设备国产化率<20%·光刻 DI 国产化率 30%",
        "barrierNote": "临时键合/解键合被 TEL/EVG 主导·芯源微国产唯一突破",
        "keyStocks": [
          "688037",
          "688630",
          "600520",
          "603203"
        ],
        "source": "L3 SEMI 2025·L4 申万宏源/方正证券设备行业分析"
      },
      {
        "step": 3,
        "name": "封装材料",
        "desc": "PSPI 光刻胶·临时键合胶·CMP 抛光垫·溅射靶材·Underfill——先进封装的耗材弹药。鼎龙股份（300054）唯一同时覆盖 PSPI+CMP 抛光垫+临时键合胶三条线的国产供应商（★★☆ domestic-platform·准卡口·全链财务质量最优·ROE 12.8%/毛利率 50.9%/moat=80 core·C 类跨链）——单线均非全球寡头（PSPI 全球 HD Micro 主导>70%/CMP 抛光垫 Dow/Cabot 主导 CR2>60%/临时键合胶 Brewer Science 主导>70%），但三线广度构成国产唯一的平台型协同壁垒。江丰电子（300666）超高纯溅射靶材国产龙头（pure-play·B2 批次最高 moat=67·营收 46 亿+27.7%·全球非 top3·hold）。飞凯材料（300398）临时键合胶小批量销售（mixed·moat=60 踩线 hold）。艾森股份（688720）PSPI 量产（mixed·营收仅 5.93 亿·机构调研 330+次·moat=62 踩线 hold）。德邦科技（688035）CDAF+Underfill 国内首家量产（C 类跨链·通用封装>10 家供应商·毛利率 27.5% 偏低·moat=62 踩线 hold）。沃格光电（603773）TGV 玻璃基板产业导入期·⚠️ skip（§6.15 亏损扩大·营收增长+亏损扩大+毛利率三年最低·moat=50/timing=20——正确但太早）。",
        "barrier": "extreme",
        "choke": true,
        "domestic": "临时键合胶国产化率<10%·PSPI 国产化率<5%",
        "barrierNote": "飞凯/德邦/鼎龙从 0 到 1 突破·但距批量替代 Brewer Science/HD Micro 仍有距离",
        "keyStocks": [
          "300398",
          "688720",
          "300054",
          "688035",
          "300666",
          "603773"
        ],
        "source": "L3 SEMI 2025 全球半导体材料报告·L4 券商材料行业分析"
      },
      {
        "step": 4,
        "name": "OSAT 封测代工",
        "desc": "长电科技/通富微电/华天科技——承接台积电 CoWoS 外溢订单的核心载体。OSAT 环节非物理卡口（全球 CR5≈60%·竞争充分·>10 家供应商），价值在承接外溢订单的业绩弹性而非护城河壁垒。长电科技（600584）综合平台型·国内封测绝对龙头（营收 389 亿·全球第三·覆盖英伟达/华为/SK 海力士三大 AI 客户·moat=72·hold·XDFOI Chiplet 4nm 量产）。通富微电（002156）AMD 深度绑定型（全球 70% CPU/GPU 封测独家·营收 279 亿·moat=76 全链最高·hold·⚠️ 单一大客户依赖既是壁垒也是脆弱性来源）。华天科技（002185）高弹性追赶型（营收 172 亿·eSiFO 差异化路线·Q1 营收+34.5%·moat=62 踩线 hold）。甬矽电子（688362）124 亿投资押注 CoWoS-L·⚠️ watch（净利仅 8,173 万·负债率 73%·高杠杆微利·方向正确但太早）。晶方科技（603005）车载 CIS WLCSP 封装龙头·🔵 core（踩线·moat=60/timing=60·毛利率 47% 全链最高·负债率仅 10%）·⚠️ 非 AI 芯片赛道——与前三家面向的英伟达/AMD AI 芯片市场完全不同，产业逻辑不可对标。",
        "barrier": "high",
        "choke": false,
        "domestic": "全球 OSAT CR5≈60%·中国大陆占全球封测产能~25%",
        "barrierNote": "OSAT 环节非卡口（竞争充分）·价值集中在承接外溢订单的业绩弹性",
        "keyStocks": [
          "600584",
          "002156",
          "002185",
          "688362",
          "603005"
        ],
        "source": "L3 Prismark 2026 全球 OSAT 排名·L4 方正证券 2026-06"
      },
      {
        "step": 5,
        "name": "下游：AI/HPC 芯片",
        "desc": "英伟达 GB300/Rubin·AMD MI300·华为昇腾——CoWoS 封装的终极需求方",
        "barrier": "extreme",
        "choke": false,
        "domestic": "—",
        "barrierNote": "英伟达 CoWoS 产能缺口 → 台积电外包 → A 股 OSAT 承接外溢订单",
        "keyStocks": [],
        "source": "L3 SEMI 2025·L4 券商产业链研究"
      }
    ],
    "fullGuide": {
      "opening": "如果把芯片制造比作盖房子，先进封装就是「精装修」——晶圆厂负责把地基和框架盖好（芯片制造），封装厂负责把毛坯房装修成可以拎包入住的精装房（把芯片装进保护壳、连上外部电路）。普通的封装就像给房子刷个大白墙、铺个地砖——够用就行。AI 时代来了，英伟达的 GPU 芯片就像一栋 30 层的摩天大楼——光靠刷白墙不够用了，需要把好几栋楼用空中走廊连起来（把 CPU+GPU+HBM 内存堆叠在一起封装），这栋楼的装修标准（信号传输速度、散热能力）比普通住宅高了不止一个量级。<br><br>这就是先进封装突然被资本市场热炒的原因：以前房子够住就行，现在突然发现「高端精装修」才是决定房子能不能卖出高价的关键——而能做好这个精装修的公司，全球数得过来。",
      "storyLine": [
        {
          "title": "🔬 材料篇：做封装好比「装修耗材」，材料不高端、装修注定不高级",
          "content": "先进封装需要几种关键材料，就像精装修需要好的瓷砖、涂料、防水层。其中 PSPI 光刻胶就像「墙壁的防水涂层」——芯片里成千上万的 TSV（硅通孔，可以想象成芯片里极细的「电线孔」）需要这层涂层来保护。这种涂层的技术门槛极高——全球 70% 以上被日本一家叫 HD Micro 的公司垄断。<br><br>但有意思的是另一家公司——<strong>鼎龙股份</strong>。它做的事比较特别：PSPI（防水涂层）、CMP 抛光垫（磨平地板的砂纸）、临时键合胶（施工过程中粘住东西用的「双面胶」）——这三样装修材料，鼎龙是国内唯一同时做这三种的公司。如果把材料公司比作建材店，鼎龙就是一家「一站式建材超市」——任何一样单品单独拿出来，都不能跟全球最大的专卖店比（PSPI 比不过 HD Micro、抛光垫比不过美国 Dow 公司），但这家超市的好处是：你装修一套房子不用跑三家店，来这里一次性配齐，省时省力。<br><br>这种「三线布局、一站式供应」的独特地位，让鼎龙在国产替代的赛道上，比那些只做单一产品的公司多了一层护城河。"
        },
        {
          "title": "⚙️ 设备篇：全世界只有三家能修的「精密机床」",
          "content": "先进封装工艺里有一道关键工序叫「临时键合」：芯片堆叠时，需要先把芯片临时粘在一个基座上进行加工，加工完再「解键合」（把胶去掉、把芯片取下来）。这个过程对精度的要求堪比在头发丝上刻字——稍有偏差，整颗芯片就废了。<br><br>能造这种临时键合/解键合设备的公司，全球只有三家：日本的 TEL、奥地利的 EVG，和中国的<strong>芯源微</strong>。就像全世界只有三个地方能修某种精密机床——只要这种精装房的需求还在增长，这三个地方的生意就不会断。芯源微是这个「限定俱乐部」里唯一的中国成员，它的临时键合设备已经卖给了台积电、长电科技、华天科技这些大客户。<br><br>但要注意：芯源微虽然是「三家之一」，但它的市占率目前还不到 15%（TEL 一家就占了 >60%）——它现在是「拿到入场券」，不是「成了主角」。盈利还在恶化（2025 年净利掉了 64.6%），就像一台刚上赛道的赛车，油门还没踩到位，车架就已经开始晃了。这是芯源微两个面孔的真相：设备稀缺性是它的「硬通货」，但盈利不给力是它的「软肋」。"
        },
        {
          "title": "📐 载板篇：裁缝手艺再精湛，布料被别人攥着",
          "content": "先进封装需要一样关键部件叫 FC-BGA 载板——可以把它想象成芯片和外部世界的「翻译官」。芯片说一种语言，主板说另一种语言，载板负责把这两种语言互相翻译——没有它，芯片装好了也「听不懂话」。<br><br>全球能做这种高端载板的公司大约只有 5 家，<strong>深南电路</strong>是大陆唯一能量产交付的一家——就像全国只有这一家裁缝能做出符合日本和服标准的高级衣服，手艺确实精良。但故事到这里有一个急转弯：做 FC-BGA 载板需要用一种关键原材料叫 ABF 膜——而全球 97% 的 ABF 膜掌握在日本味之素（没错，就是那家做味精的公司）手里。<br><br>这就回到了一个经典的制约关系：深南电路的裁缝手艺再精湛，但布料几乎全被日本人攥着——哪天如果味之素优先把布料供给日本本国的载板厂（ibiden/Shinko），深南电路的订单再多、手艺再好，也可能面临「巧妇难为无米之炊」的尴尬。所以深南电路是正式物理卡口没错，但卡口的真正命门不在它的手里——在上游材料端。"
        },
        {
          "title": "🏗️ 组装篇：帮台积电「接私活」的封测厂",
          "content": "最后一步是 OSAT（封测代工）——把设计好的芯片按照封装方案组装、测试、包装好。中国有三家主要的封测厂：<strong>长电科技</strong>（国内最大、全球第三）、<strong>通富微电</strong>（深度绑定 AMD、70% 的 CPU/GPU 封装都给它独家做）、<strong>华天科技</strong>（体量最小、增速最快、走差异化路线）。<br><br>这三家的共同特点是：它们做生意靠的不是「这个活儿只有我能干」（全球能干的超过 10 家），而是「这个活儿别人忙不过来了、我帮你做」。当前全球最紧俏的 CoWoS 封装产能被台积电一手主导，但台积电自己的产能根本不够（英伟达一家就快把它的产能吸干了），多出来的订单就「外溢」给了长电、通富这些 OSAT 厂。<br><br>就像三里屯最火的网红奶茶店——排队太长，一部分订单分流给了隔壁的茶饮店。隔壁生意不错，但不是因为它家的奶茶独一无二，而是因为「人流溢出」。这就是 OSAT 的投资逻辑：赚的是外溢订单的弹性，不是护城河的壁垒。一旦台积电自己扩产完成了、或者 AI 芯片需求增速放缓，这波外溢的红利就会消退。"
        },
        {
          "title": "🔬 细分篇：不是所有「先进封装」都吃AI红利——期权赌注与独立赛道",
          "content": "先进封装的大故事是AI芯片对CoWoS/HBM封装的旺盛需求——但这个叙事不是对所有公司都适用的。seg[1]里的两家公司，一家押注了同一个方向但体量太小、杠杆太高，另一家则完全不在AI封装这条赛道上——把这两家跟长电/通富/华天放在同一个逻辑框架里理解，会得出完全错误的结论。<br><br><strong>甬矽电子</strong>做了一件非常大胆的事：投入124亿元建设2.5D/CoWoS-L先进封装产能——相当于用一家年营收仅44亿、年净利仅8,173万的公司，押注了一个相当于自身营收2.8倍、净利152倍的赌注。这个类比就是：<strong>你拿全部积蓄加上银行贷款，在规划中的高铁站旁边买了一块地——方向是对的（高铁确实会通到这里），但你的贷款利息已经快还不上了（资产负债率73.05%且持续攀升），而高铁什么时候通车、通车后有多少客流，都不是你能控制的。</strong>甬矽面临台积电（CoWoS技术绝对领先·全球>80%份额）和长电科技（已有英伟达认证·78亿临港工厂）的双重竞争——产能建成不等于订单填满，正确的方向不等于正确的时机。甬矽当前在先进封装链的全部10只新标的中moat排倒数第二（50分·watch），核心症结就是：方向对、体量太小、杠杆太高、竞争对手太强。<br><br><strong>晶方科技</strong>则是一个完全不同的故事：它聚焦车载CIS（CMOS图像传感器）晶圆级封装——为汽车摄像头芯片提供WLCSP封装服务。晶方跟长电/通富/华天的核心区别是：<strong>它不做AI芯片的CoWoS封装——它服务的客户是车载摄像头厂商（韦尔股份/格科微/思特威），不是英伟达/AMD。</strong>这个区别有多重要？就像开了一家高端车美容店——生意稳定、利润不错（毛利率47.10%全链最高、负债率仅10.24%几乎零杠杆），但车美容店的增长逻辑跟AI芯片封装是两个完全不同的赛道：车载CIS封装市场的CAGR约8-12%，而CoWoS封装CAGR约30%+。把晶方科技跟长电/通富的AI封装需求增速对标，是不合理的跨赛道误读。2026Q1净利+0.1%几乎零增长，也在提示——车载CIS封装的增长不是爆发式的，而是稳步推进的。<br><br>这两家公司放在一起，恰好构成了先进封装产业链里两个重要的「非主流叙事」：一个是看多AI封装方向但押注过早的「期权型」风险，一个是赛道完全不同、需要独立评估的「隔离型」标的。把它们跟长电/通富/华天混为一谈，是这条产业链里最常见的误判。"
        }
      ],
      "chokeTeaser": "读到这里，你可能会问：这条产业链里，哪些公司是真正的「关键先生」？简单来说有三个：<strong>芯源微</strong>（全球仅三家能造的设备——物理稀缺）、<strong>深南电路</strong>（大陆唯一能做高端载板——但命门在别家手里）、<strong>鼎龙股份</strong>（三线同时布局的国产唯一平台——单线不是全球最强但「一站式」形成协同壁垒）。这三家各自的「稀缺性」性质完全不同——一个是「全球只有三家」，一个是「大陆只有一家但核心材料被卡」，一个是「国产唯一的三线超市」。具体的卡口深度拆解，请滚动到下方「投资决策」板块查看完整结论。",
      "cycleSignal": "现在这条产业链处于什么阶段？用一个比喻来说：就像一个新的高铁站在建——轨道已经铺好了（台积电 CoWoS 产能正在扩）、列车已经订购了（英伟达 GB300/Rubin 对封装的需求已经确认）、但站台还没完全竣工（长电科技上海临港工厂、深南电路广州工厂都还在建设中、预计要到 2027 年左右才能大规模投产）。这个阶段叫「产能建设期」——需求是确定的、方向是正确的，但供给还在路上。<br><br>值得关注的信号：① 长电科技上海临港 78 亿工厂是否按期投产——这是判断「外溢订单能否转化为真实营收」的核心观察窗口；② 深南电路广州 FC-BGA 工厂（2027 年量产目标）的良率爬坡进度——良率每提升 5%，利润端就可能发生质的飞跃；③ CoWoS 产能缺口的收窄速度——如果台积电、日月光扩产超预期，OSAT 厂承接外溢订单的窗口可能比预期的 2-3 年更短。"
    }
  },
  "overview": [
    {
      "label": "全球市场规模",
      "value": "581-587 亿美元",
      "unit": "(2026E)",
      "trend": "up",
      "note": "SEMI 2025 预测·2025-2028 CAGR 10-15%",
      "tier": "broker",
      "color": "var(--accent)",
      "src": "SEMI 2025先进封装市场报告"
    },
    {
      "label": "中国封测产能占比",
      "value": "~25%",
      "unit": "全球",
      "trend": "up",
      "note": "长电科技全球第三·通富微电全球第五·华天科技全球第六",
      "tier": "broker",
      "color": "var(--accent)",
      "src": "Prismark 2026全球OSAT排名"
    },
    {
      "label": "CoWoS 产能缺口",
      "value": "30-40%",
      "unit": "供需缺口",
      "trend": "up",
      "note": "台积电 CoWoS 产能不足·外溢至 OSAT·缺口预计延续至 2027 年",
      "tier": "broker",
      "color": "var(--accent)",
      "src": "SEMI 2025+方正证券2026-06"
    },
    {
      "label": "封装设备国产化率",
      "value": "<20%",
      "unit": "键合/解键合",
      "trend": "flat",
      "note": "临时键合 TEL/EVG 主导·芯源微国产唯一突破·塑封设备文一科技验证中",
      "tier": "broker",
      "color": "var(--color-bull)",
      "src": "SEMI 2025全球半导体设备报告"
    },
    {
      "label": "封装材料国产化率",
      "value": "<15%",
      "unit": "键合胶/PSPI",
      "trend": "flat",
      "note": "临时键合胶 Brewer Science 主导·PSPI HD Micro 主导·飞凯/艾森从 0 到 1",
      "tier": "broker",
      "color": "var(--color-bull)",
      "src": "SEMI 2025全球半导体材料报告"
    },
    {
      "label": "ABF 载板国产化率",
      "value": "~4%",
      "unit": "依赖进口",
      "trend": "flat",
      "note": "ABF 膜 97% 依赖日本味之素·深南/兴森 FC-BGA 小批量验证中",
      "tier": "broker",
      "color": "var(--color-bull)",
      "src": "Prismark 2026全球IC载板排名"
    },
    {
      "label": "下游需求 CAGR",
      "value": "20-25%",
      "unit": "(2025-2028)",
      "trend": "up",
      "note": "AI/HPC 芯片封装需求爆发·单颗 GPU CoWoS 封装价值量 30-40% 芯片总成本",
      "tier": "broker",
      "color": "var(--accent)",
      "src": "SEMI 2025+Prismark 2026+券商研报"
    },
    {
      "label": "产业链评级",
      "value": "🆪 AI 预评",
      "unit": "Phase B 补",
      "trend": "flat",
      "note": "产业链整体评分 78/100·强劲景气·OSAT 环节非卡口（竞争充分）·上游设备/材料才是物理卡口",
      "tier": "estimate",
      "color": "var(--color-warn)",
      "src": "🆪 AI预评·Phase B数据整合"
    }
  ],
  "treeMap": {
    "downstream": [
      {
        "name": "AI/HPC 芯片(CoWoS/2.5D/3D)",
        "barrier": "extreme",
        "note": "英伟达 GB300 CoWoS-L 封装需求 2026 年预计 60 万片（vs 2025 年 40 万片）·单颗 GPU 需 1 颗 CoWoS 中介层——需求传导：英伟达 CoWoS 产能缺口 → 台积电外包部分 CoWoS 给长电科技/通富微电 → A 股 OSAT 龙头承接外溢订单·AI 芯片封装价值量占芯片总成本 30-40%（SEMI 2025）",
        "companies": [
          {
            "name": "英伟达",
            "code": "NVDA(美股)",
            "position": "AI GPU 霸主·GB300 CoWoS-L 封装最大需求方",
            "barrier": "极高"
          },
          {
            "name": "AMD",
            "code": "AMD(美股)",
            "position": "MI300 系列·先进封装第二大需求方",
            "barrier": "极高"
          },
          {
            "name": "华为昇腾",
            "code": "(非上市)",
            "position": "国产 AI 芯片·盛合晶微 3D 封装核心客户",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "HBM 存储(堆叠键合/TCB/MR-MUF)",
        "barrier": "extreme",
        "note": "SK 海力士 HBM3E 12Hi 2026 年出货量预计同比+80%·单颗 HBM 需 8-12 层 DRAM 堆叠键合——需求传导：SK 海力士 HBM 扩产（无锡/重庆厂）→ 拉动长电科技 HBM 封装外包 + 通富微电配套 FC-BGA 载板封装·HBM 封装设备（TCB 键合机/MR-MUF 设备）国产化率<10%（SEMI 2025）",
        "companies": [
          {
            "name": "SK 海力士",
            "code": "(韩股)",
            "position": "HBM 全球霸主·HBM3E 12Hi 主供英伟达",
            "barrier": "极高"
          },
          {
            "name": "三星电子",
            "code": "(韩股)",
            "position": "HBM 第二大供应商",
            "barrier": "极高"
          },
          {
            "name": "美光",
            "code": "MU(美股)",
            "position": "HBM 第三大供应商",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "汽车/5G 芯片(Fan-Out/WLCSP/SiP)",
        "barrier": "mid",
        "note": "高通骁龙/特斯拉 FSD 采用 Fan-Out 封装·单颗自动驾驶芯片封装价值量 50-100 美元——需求传导：汽车芯片封装以 WLCSP/Fan-Out 为主（非 CoWoS 高端路线）→ 晶方科技车载 CIS 封装 + 华天科技 eSiFO 扇出封装直接受益·汽车芯片封装认证周期 18-24 月，一旦进入供应链切换成本高（AEC-Q100 车规）",
        "companies": [
          {
            "name": "高通",
            "code": "QCOM(美股)",
            "position": "骁龙车载平台·Fan-Out 封装大客户",
            "barrier": "极高"
          },
          {
            "name": "特斯拉",
            "code": "TSLA(美股)",
            "position": "FSD 自动驾驶芯片·先进封装需求增长",
            "barrier": "极高"
          }
        ]
      }
    ],
    "midstream": [
      {
        "name": "OSAT 综合封测龙头",
        "barrier": "high",
        "note": "国内封测三巨头·全球 OSAT CR5≈60%·承接台积电 CoWoS 外溢订单",
        "companies": [
          {
            "name": "长电科技",
            "code": "600584",
            "position": "国内封测龙头·全球第三·XDFOI Chiplet·4nm 量产",
            "barrier": "极高"
          },
          {
            "name": "通富微电",
            "code": "002156",
            "position": "深度绑定 AMD·70% 高端 CPU/GPU 封测独家",
            "barrier": "极高"
          },
          {
            "name": "华天科技",
            "code": "002185",
            "position": "eSiFO 扇出/TSV·2026Q1 净利+568%·高弹性",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "细分领域先进封装",
        "barrier": "mid",
        "note": "甬矽电子 2.5D 产能爬坡·晶方科技聚焦车载 CIS 封装（非 AI 赛道）",
        "companies": [
          {
            "name": "甬矽电子",
            "code": "688362",
            "position": "2.5D 堆叠新星·124 亿投资·CoWoS-L 爬坡",
            "barrier": "中"
          },
          {
            "name": "晶方科技",
            "code": "603005",
            "position": "车载 CIS 晶圆级封装龙头·非 AI 赛道",
            "barrier": "中"
          }
        ]
      }
    ],
    "materials": [
      {
        "name": "临时键合材料",
        "barrier": "high",
        "note": "临时键合胶国产化率<10%·Brewer Science 主导·飞凯/鼎龙从 0 到 1",
        "companies": [
          {
            "name": "飞凯材料",
            "code": "300398",
            "position": "临时键合材料国产龙头·小批量销售",
            "barrier": "高"
          },
          {
            "name": "鼎龙股份",
            "code": "300054",
            "position": "临时键合胶已有客户稳定出货·C 类跨链",
            "barrier": "高"
          },
          {
            "name": "德邦科技",
            "code": "688035",
            "position": "IC 封装材料平台·Underfill/TIM·C 类跨链",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "PSPI 光刻胶与塑封料",
        "barrier": "high",
        "note": "PSPI 国产化率<5%·HD Micro 主导·艾森/强力新材国产突破",
        "companies": [
          {
            "name": "艾森股份",
            "code": "688720",
            "position": "先进封装负性光刻胶+PSPI 量产",
            "barrier": "高"
          },
          {
            "name": "鼎龙股份",
            "code": "300054",
            "position": "PSPI 光敏聚酰亚胺国产唯一·C 类跨链",
            "barrier": "高"
          },
          {
            "name": "华海诚科",
            "code": "688535",
            "position": "环氧塑封料龙头·GMC 用于 HBM·C 类跨链",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "IC 载板与中介层",
        "barrier": "extreme",
        "note": "ABF 载板 97% 依赖日本味之素·深南/兴森 FC-BGA 小批量验证·TGV 玻璃基板为下一代方案",
        "companies": [
          {
            "name": "深南电路",
            "code": "002916",
            "position": "FC-BGA/FC-CSP 封装基板双龙头·C 类跨链",
            "barrier": "极高"
          },
          {
            "name": "兴森科技",
            "code": "002436",
            "position": "FC-BGA 封装基板国产突围·小批量出货·C 类跨链",
            "barrier": "高"
          },
          {
            "name": "沃格光电",
            "code": "603773",
            "position": "TGV 激光打孔-填铜-RDL 全流程量产·国内唯一",
            "barrier": "中"
          }
        ]
      }
    ],
    "equipment": [
      {
        "name": "键合设备(临时键合/解键合/TCB)",
        "barrier": "extreme",
        "note": "临时键合/解键合 TEL/EVG 主导·TCB 键合 ASM/BESI 主导·国产化率<20%",
        "companies": [
          {
            "name": "芯源微",
            "code": "688037",
            "position": "临时键合/解键合国产龙头·已批量出货·C 类跨链",
            "barrier": "极高"
          },
          {
            "name": "快克智能",
            "code": "603203",
            "position": "TCB 热压键合设备重大突破·C 类跨链",
            "barrier": "高"
          },
          {
            "name": "文一科技",
            "code": "600520",
            "position": "12寸晶圆级塑封设备·样机交付·⚠️验证阶段",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "光刻/塑封/检测设备",
        "barrier": "high",
        "note": "先进封装专用光刻 DI 芯碁微装国产突破·塑封设备文一科技验证中",
        "companies": [
          {
            "name": "芯碁微装",
            "code": "688630",
            "position": "先进封装直写光刻 DI 龙头·已批量·C 类跨链",
            "barrier": "极高"
          },
          {
            "name": "文一科技",
            "code": "600520",
            "position": "12寸晶圆级塑封·⚠️验证阶段·同 stock 跨两节点展示",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "检测/测试设备",
        "barrier": "high",
        "note": "长川科技/华峰测控/中科飞测——封测检测设备国产替代主力",
        "companies": [
          {
            "name": "长川科技",
            "code": "300604",
            "position": "封测测试设备龙头·C 类跨链(semicon-equip)",
            "barrier": "高"
          },
          {
            "name": "华峰测控",
            "code": "688200",
            "position": "封测设备测试机细分龙头·C 类跨链(semicon-equip)",
            "barrier": "高"
          }
        ]
      }
    ],
    "sideBranches": [
      {
        "name": "TGV 玻璃基板(下一代中介层)",
        "barrier": "low",
        "note": "TGV 玻璃基板是硅中介层的下一代替代方案·Intel/三星已宣布采用·国内仅沃格光电全流程量产",
        "companies": [
          {
            "name": "沃格光电",
            "code": "603773",
            "position": "国内唯一 TGV 全流程量产·激光打孔-填铜-RDL",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "Chiplet/UCIe 生态(先进封装设计)",
        "barrier": "high",
        "note": "Chiplet 互连标准 UCIe 1.0 已发布·芯原股份是 UCIe 标准核心贡献者（已在存储与接口链）",
        "companies": [
          {
            "name": "芯原股份",
            "code": "688521",
            "position": "UCIe IP 核心贡献者·Chiplet 设计服务·C 类跨链(storage-interface)",
            "barrier": "高"
          }
        ]
      }
    ]
  },
  "segments": [
    {
      "name": "OSAT 综合封测龙头",
      "barrier": "高",
      "choke": false,
      "desc": "国内封测三巨头·全球 OSAT CR5≈60%·承接台积电 CoWoS 外溢订单",
      "stocks": [
        {
          "rank": 1,
          "name": "长电科技",
          "code": "600584",
          "position": "国内封测龙头·全球第三·XDFOI Chiplet 平台支持 4nm 芯粒集成量产·上海临港 78 亿高端工厂建设中·客户覆盖英伟达/华为昇腾/SK 海力士（综合平台型·客户覆盖面最广）",
          "barrier": "极高",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 方正证券 2026-06"
          ],
          "trend": "up",
          "trendNote": "先进封装订单饱满·承接台积电 CoWoS 外溢",
          "logic": "国内封测绝对龙头·全球第三·XDFOI Chiplet 平台已实现 4nm 芯粒集成量产。英伟达 CoWoS 产能缺口背景下，台积电将部分 CoWoS 封装外包给长电科技，公司 78 亿上海临港高端工厂专为承接外溢订单而建。",
          "dims6Note": "综合 72/100 · 共6维 · hold"
        },
        {
          "rank": 2,
          "name": "通富微电",
          "code": "002156",
          "position": "深度绑定 AMD·全球 70% 高端 CPU/GPU 封测独家供应商·2026Q1 净利同比+224%·先进封装收入占比≈70%（AMD 深度绑定型·客户高度集中）",
          "barrier": "极高",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 方正证券 2026-06"
          ],
          "trend": "up",
          "trendNote": "Q1 净利+224%·AMD MI300 封装订单放量",
          "logic": "全球唯一同时覆盖 AMD CPU/GPU 全系先进封装的中国 OSAT。AMD MI300 系列采用 CoWoS 封装，通富微电作为独家封测供应商直接受益。先进封装收入占比约 70%，客户高度集中（既是壁垒也是风险）。",
          "dims6Note": "综合 76/100 · 共6维 · hold"
        },
        {
          "rank": 3,
          "name": "华天科技",
          "code": "002185",
          "position": "eSiFO 扇出/TSV/2.5D HP 工艺·2026Q1 净利同比+568%·南京基地先进封装产线已批量交付（高弹性追赶型·产能爬坡增速最快但体量仍小于前两家）",
          "barrier": "高",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 方正证券 2026-06"
          ],
          "trend": "up",
          "trendNote": "Q1 净利+568%·南京基地产能爬坡·增速最快",
          "logic": "eSiFO 扇出封装差异化路线·避开与长电/通富在 CoWoS 赛道的直接竞争。2026Q1 净利暴增 568%，南京基地先进封装产线已批量交付，高弹性增长但体量仍显著小于长电和通富。",
          "dims6Note": "综合 62/100 · 共6维 · hold"
        }
      ],
      "intro": "国内封测三巨头——长电科技（全球第三·388亿营收·覆盖英伟达/华为/SK海力士）、通富微电（深度绑定AMD·70% CPU/GPU封测独家）、华天科技（eSiFO差异化路线·高弹性追赶者）。OSAT环节全球CR5≈60%，非寡头垄断，核心投资逻辑在于承接台积电CoWoS产能缺口外溢订单的业绩弹性。",
      "costRatio": "—",
      "border": false
    },
    {
      "name": "细分领域先进封装",
      "barrier": "中",
      "choke": false,
      "desc": "甬矽电子 2.5D 产能爬坡·晶方科技聚焦车载 CIS 封装（非 AI 芯片赛道）",
      "stocks": [
        {
          "rank": 1,
          "name": "甬矽电子",
          "code": "688362",
          "position": "高弹性先进封装新星·124 亿投资押注系统级封装+2.5D 堆叠·CoWoS-L 产能爬坡中·体量和客户验证阶段显著早于三巨头",
          "barrier": "中",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "CoWoS-L 产能爬坡·高弹性但客户验证阶段早",
          "logic": "高弹性先进封装新星·124 亿大手笔投资 2.5D 堆叠和系统级封装。CoWoS-L 产能爬坡中，体量和客户验证阶段显著早于 OSAT 三巨头——属于'期权型'标的：成功则弹性格巨大，失败则 124 亿投资回报存疑。",
          "dims6Note": "综合 50/100 · 共6维 · watch"
        },
        {
          "rank": 2,
          "name": "晶方科技",
          "code": "603005",
          "position": "车载 CIS 晶圆级封装龙头·TSV/异质集成/3D 堆叠能力·非 AI 芯片赛道——聚焦车载+安防 CIS 图像传感器封装，与前三家面向的英伟达/AMD AI 芯片市场完全不同",
          "barrier": "中",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "flat",
          "trendNote": "车载 CIS 封装稳定增长·但非 AI 芯片赛道增速受限",
          "logic": "车载 CIS 晶圆级封装龙头·TSV/异质集成/3D 堆叠能力完备。需注意：聚焦车载+安防 CIS 图像传感器封装，与前三家面向的英伟达/AMD AI 芯片市场完全不同——不能因为同在'先进封装'赛道就将其与长电/通富的 AI 封装需求增速等同。",
          "dims6Note": "综合 60/100 · 共6维 · core"
        }
      ],
      "intro": "甬矽电子（124亿投资押注CoWoS-L·高杠杆微利·方向正确但太早）与晶方科技（车载CIS WLCSP封装龙头·毛利率47%全链最高·⚠️非AI芯片赛道——与前三家产业逻辑完全不同）。两者均处于各自细分领域的追赶/验证阶段，关注产能爬坡和客户认证进展。",
      "costRatio": "—",
      "border": false
    },
    {
      "name": "封装专用设备",
      "barrier": "高",
      "choke": true,
      "desc": "键合机/临时键合/解键合国产化率<20%·芯源微国产唯一突破·文一科技验证中",
      "stocks": [
        {
          "rank": 1,
          "name": "芯源微",
          "code": "688037",
          "position": "临时键合/解键合国产龙头·后道设备已批量供台积电/长电/华天·已批量出货（C 类跨链·已在 semicon-equip seg[2]）",
          "barrier": "极高",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 申万宏源 2026-06"
          ],
          "trend": "up",
          "trendNote": "键合品类收入占比大幅提升·2025 签单加速",
          "logic": "C 类跨链复用（已在 semicon-equip 链有完整 dims6）·临时键合/解键合国产龙头，已通过多家客户验证进入放量阶段。在先进封装语境下，临时键合是 CoWoS/HBM 堆叠工艺的必选设备——芯源微是目前 A 股唯一兑现的标的。",
          "dims6Note": "综合 81/100 · 共6维 · hold"
        },
        {
          "rank": 2,
          "name": "芯碁微装",
          "code": "688630",
          "position": "先进封装直写光刻(DI)龙头·受益 FOPLP 和玻璃基板扩产·已批量出货（C 类跨链·已在 PCB seg[6]）",
          "barrier": "极高",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "FOPLP+玻璃基板扩产拉动 DI 光刻需求",
          "logic": "C 类跨链复用（已在 PCB 链有完整 dims6）·先进封装直写光刻 DI 设备龙头，受益于扇出面板级封装 FOPLP 和 TGV 玻璃基板两大新趋势。",
          "dims6Note": "综合 78/100 · 共6维 · hold"
        },
        {
          "rank": 3,
          "name": "文一科技",
          "code": "600520",
          "position": "12 寸晶圆级塑封设备·样机已交付华为-盛合晶微·稀缺标的·⚠️ 验证阶段（非批量供货）·Phase B 打分前强制核实商业化进展",
          "barrier": "中",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "flat",
          "trendNote": "样机交付验证中·尚未批量供货·商业化阶段需严格核实",
          "logic": "12 寸晶圆级塑封设备，样机已交付华为-盛合晶微试用。⚠️ Phase B 打分前强制核实：(1)L1 公告是否有客户订单金额/批量供货合同？(2)塑封设备营收贡献占比？(3)盛合晶微之外是否有第二家验证客户？参照长光华芯'CW 100mW 仍在验证中'处理方式——durability/visibility 严格按实际商业化进展评定，不得因'稀缺标的'概念性描述偏高。",
          "dims6Note": "综合 50/100 · 共6维 · watch"
        },
        {
          "rank": 4,
          "name": "快克智能",
          "code": "603203",
          "position": "先进封装 TCB 热压键合设备·重大突破（C 类跨链·已在存储与接口链）",
          "barrier": "高",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "TCB 键合设备国产替代早期·商业化验证中",
          "logic": "C 类跨链复用（已在存储与接口链）·先进封装 TCB 热压键合设备取得重大突破，但商业化阶段仍需进一步验证。",
          "dims6Note": "综合 60/100 · 共6维 · hold"
        }
      ],
      "intro": "临时键合/解键合（芯源微★★★国产唯一·全球仅三家）、直写光刻DI（芯碁微装·PCB LDI全球第一18.8%）、TCB热压键合（快克智能·国产追赶者）、塑封设备（文一科技·样机验证阶段⚠️）。设备端是先进封装国产替代最薄弱的环节——临时键合国产化率<20%、TCB<10%。",
      "costRatio": "—",
      "border": false
    },
    {
      "name": "封装材料",
      "barrier": "高",
      "choke": true,
      "desc": "临时键合胶国产化率<10%·PSPI<5%·飞凯/艾森/沃格/江丰从 0 到 1 突破",
      "stocks": [
        {
          "rank": 1,
          "name": "飞凯材料",
          "code": "300398",
          "position": "临时键合材料国产龙头·全球 BGA/CSP 锡球领导厂商·已实现小批量销售（逐步推进放量）",
          "barrier": "高",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "临时键合材料从 0 到 1·小批量→放量关键期",
          "logic": "临时键合材料国产龙头·全球 BGA/CSP 锡球领导厂商。临时键合胶国产化率<10%，飞凯是国产替代的先行者——已实现小批量销售，逐步推进放量。需注意：从'小批量'到'规模替代 Brewer Science'仍有距离。",
          "dims6Note": "综合 60/100 · 共6维 · hold"
        },
        {
          "rank": 2,
          "name": "艾森股份",
          "code": "688720",
          "position": "先进封装负性光刻胶+PSPI 量产·机构调研 330+次·高关注度新材料标的",
          "barrier": "高",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "PSPI 光刻胶国产替代·高机构关注度",
          "logic": "先进封装负性光刻胶+PSPI（光敏聚酰亚胺）量产，是 A 股 PSPI 国产替代的核心标的。机构调研 330+次，市场关注度极高。PSPI 国产化率<5%，替代空间巨大但需时间验证。",
          "dims6Note": "综合 62/100 · 共6维 · hold"
        },
        {
          "rank": 3,
          "name": "沃格光电",
          "code": "603773",
          "position": "国内唯一打通 TGV 激光打孔-填铜-RDL 布线全流程量产企业·TGV 玻璃基板是硅中介层的下一代替代方案",
          "barrier": "中",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "TGV 玻璃基板·下一代中介层方案·国产唯一",
          "logic": "国内唯一打通 TGV 激光打孔-填铜-RDL 布线全流程量产的企业。TGV 玻璃基板是硅中介层的下一代替代方案（Intel/三星已宣布采用），沃格光电在这个新兴赛道占据先发优势。但需注意：TGV 方案仍处于产业导入期，大规模商业化时间线不确定。",
          "dims6Note": "综合 50/100 · 共6维 · skip"
        },
        {
          "rank": 4,
          "name": "江丰电子",
          "code": "300666",
          "position": "超高纯溅射靶材·TSV 薄膜沉积刚需耗材·国产替代龙头",
          "barrier": "中",
          "tier": "L4",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "溅射靶材国产替代·TSV 工艺刚需耗材",
          "logic": "超高纯溅射靶材国产替代龙头·TSV（硅通孔）薄膜沉积工艺的刚需耗材。先进封装 TSV 用量随 HBM 堆叠层数增加而线性增长，江丰电子作为国内靶材龙头直接受益。",
          "dims6Note": "综合 67/100 · 共6维 · hold"
        },
        {
          "rank": 5,
          "name": "德邦科技",
          "code": "688035",
          "position": "IC 封装材料平台型公司·CDAF 国内首家量产·布局 Underfill/TIM 材料（C 类跨链·已在存储与接口链）",
          "barrier": "中",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "IC 封装材料平台·CDAF 量产+Underfill 布局",
          "logic": "C 类跨链复用（已在存储与接口链）·IC 封装材料平台型公司，CDAF（芯片贴装膜）国内首家量产，同时布局 Underfill/TIM 等先进封装关键材料。",
          "dims6Note": "综合 62/100 · 共6维 · hold"
        },
        {
          "rank": 6,
          "name": "鼎龙股份",
          "code": "300054",
          "position": "PSPI 光敏聚酰亚胺国产唯一·CMP 抛光液适配 TGV 玻璃基板·临时键合胶已有客户稳定出货（C 类跨链·已在存储与接口链）",
          "barrier": "高",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "PSPI+TGV CMP+临时键合胶·三道材料同时布局",
          "logic": "C 类跨链复用（已在存储与接口链）·PSPI 光敏聚酰亚胺国产唯一供应商，同时覆盖 CMP 抛光液（适配 TGV 玻璃基板）和临时键合胶，是 A 股先进封装材料布局最广的标的之一。",
          "dims6Note": "综合 80/100 · 共6维 · core"
        }
      ],
      "intro": "PSPI光刻胶·临时键合胶·CMP抛光垫·溅射靶材·Underfill——单一材料线均非全球寡头（每条线>3家供应商）。鼎龙股份（★★☆ domestic-platform）是唯一同时覆盖PSPI+CMP抛光垫+临时键合胶三条线的国产供应商，江丰电子靶材国产龙头（pure-play·B2最高moat=67），其余标的均为mixed或早期阶段。",
      "costRatio": "—",
      "border": false
    },
    {
      "name": "IC 载板与中介层",
      "barrier": "高",
      "choke": true,
      "desc": "ABF 载板 97% 依赖日本味之素·深南/兴森 FC-BGA 小批量验证·全部 C 类跨链复用",
      "stocks": [
        {
          "rank": 1,
          "name": "深南电路",
          "code": "002916",
          "position": "FC-BGA/FC-CSP 封装基板双龙头·ABF 载板国产替代核心标的（C 类跨链·已在 PCB seg[4]）",
          "barrier": "极高",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "FC-BGA 载板验证推进·ABF 膜仍依赖日本味之素",
          "logic": "C 类跨链复用（已在 PCB 链有完整 dims6 和 chokePoint 评估）·FC-BGA/FC-CSP 封装基板双龙头，是 ABF 载板国产替代的核心标的。需注意：ABF 膜 97% 仍依赖日本味之素——载板环节的真正的物理卡口在上游 ABF 膜材料，不在载板制造。",
          "dims6Note": "综合 90/100 · 共6维 · hold"
        },
        {
          "rank": 2,
          "name": "兴森科技",
          "code": "002436",
          "position": "FC-BGA 封装基板国产突围者·已小批量出货（C 类跨链·已在 PCB seg[4]）",
          "barrier": "高",
          "tier": "C",
          "valAsOf": "2026Q1",
          "src": [
            "L4 券商研究"
          ],
          "trend": "up",
          "trendNote": "FC-BGA 小批量出货·国产替代验证中",
          "logic": "C 类跨链复用（已在 PCB 链有完整 dims6）·FC-BGA 封装基板国产突围者，已实现小批量出货。与深南电路同属 ABF 载板国产替代赛道，但体量和客户验证进度落后于深南。",
          "dims6Note": "综合 73/100 · 共6维 · hold"
        }
      ],
      "intro": "FC-BGA载板全球仅约5家公司可量产——深南电路（★★★大陆唯一批量交付·良率>80%·广州60亿工厂2027投产）与兴森科技（小批量出货·第二国产供应商·追赶者）。⚠️真正的核心瓶颈在ABF膜——味之素97%全球垄断，深南电路处于卡口的下游加工端而非最核心的材料端。",
      "costRatio": "—",
      "border": false
    }
  ],
  "midstream": {
    "description": "先进封装产业链中游核心标的——综合封测龙头+高弹性新星",
    "stocks": [
      {
        "name": "长电科技",
        "code": "600584",
        "position": "国内封测龙头·全球第三·XDFOI Chiplet 平台·4nm 量产",
        "barrier": "极高",
        "tier": "L4",
        "note": "英伟达/华为昇腾/SK海力士 CoWoS 外溢订单承接方·上海临港 78 亿高端工厂",
        "rank": 1
      },
      {
        "name": "通富微电",
        "code": "002156",
        "position": "深度绑定 AMD·70% 高端 CPU/GPU 封测独家",
        "barrier": "极高",
        "tier": "L4",
        "note": "AMD MI300 系列 CoWoS 封装独家供应商·2026Q1 净利+224%",
        "rank": 2
      },
      {
        "name": "华天科技",
        "code": "002185",
        "position": "eSiFO 扇出/TSV·高弹性追赶型",
        "barrier": "高",
        "tier": "L4",
        "note": "2026Q1 净利+568%·南京基地先进封装产线·体量小于长电/通富",
        "rank": 3
      },
      {
        "name": "甬矽电子",
        "code": "688362",
        "position": "2.5D 堆叠新星·124 亿投资·CoWoS-L 爬坡",
        "barrier": "中",
        "tier": "L4",
        "note": "高弹性但客户验证阶段早·期权型标的",
        "rank": 4
      },
      {
        "name": "晶方科技",
        "code": "603005",
        "position": "车载 CIS 晶圆级封装龙头·非 AI 赛道",
        "barrier": "中",
        "tier": "L4",
        "note": "聚焦车载+安防 CIS·与 AI 芯片封装市场增速不同步",
        "rank": 5
      },
      {
        "name": "芯源微",
        "code": "688037",
        "position": "临时键合/解键合国产龙头·C 类跨链",
        "barrier": "极高",
        "tier": "C",
        "note": "已批量出货台积电/长电/华天·先进封装必选设备",
        "rank": 6
      },
      {
        "name": "文一科技",
        "code": "600520",
        "position": "12寸晶圆级塑封设备·⚠️验证阶段",
        "barrier": "中",
        "tier": "L4",
        "note": "样机交付华为-盛合晶微·Phase B 强制核实商业化进展",
        "rank": 7
      },
      {
        "name": "飞凯材料",
        "code": "300398",
        "position": "临时键合材料国产龙头",
        "barrier": "高",
        "tier": "L4",
        "note": "小批量销售·从 0 到 1 突破关键期",
        "rank": 8
      },
      {
        "name": "艾森股份",
        "code": "688720",
        "position": "PSPI 光刻胶量产·机构高关注",
        "barrier": "高",
        "tier": "L4",
        "note": "PSPI 国产化率<5%·替代空间大",
        "rank": 9
      },
      {
        "name": "沃格光电",
        "code": "603773",
        "position": "TGV 玻璃基板全流程量产·国内唯一",
        "barrier": "中",
        "tier": "L4",
        "note": "下一代中介层方案·产业导入期",
        "rank": 10
      }
    ]
  },
  "fourQuestions": {
    "segments": [
      {
        "name": "OSAT 综合封测龙头",
        "barrier": "高",
        "stocks": [
          {
            "name": "长电科技",
            "code": "600584",
            "q1": false,
            "q1note": "全球 OSAT CR5≈60%·非≤3 家寡头·但先进封装认证壁垒高(12-18月)",
            "q2": true,
            "q2note": "CoWoS 产能建设周期 18-24 月(SEMI 2025)",
            "q3": true,
            "q3note": "先进封装国内仅长电/通富/华天三家可承接 CoWoS 订单",
            "q4": true,
            "q4note": "AI 芯片 CoWoS 封装刚需·英伟达 2026 年预计 60 万片",
            "hits": 4,
            "strength": "★★★",
            "q1p": true,
            "q1pClaim": "英伟达GPU/华为昇腾/SK海力士HBM三大AI核心客户全覆盖·XDFOI Chiplet平台已实现4nm芯粒集成量产·78亿上海临港高端工厂专为承接CoWoS外溢订单而建·进入英伟达CoWoS供应商体系需通过12-18月认证",
            "q1pSrc": "L1长电科技2025年报+L4方正证券2026-06先进封装深度报告",
            "q2p": true,
            "q2pClaim": "全球OSAT第三大(仅次于日月光/安靠·中国大陆第一)·XDFOI Chiplet平台为国内唯一实现4nm芯粒集成量产的封测平台·营收389亿为国内封测最高——体量构建的产能+良率+客户信任综合壁垒",
            "q2pSrc": "L1 akshare abstract_ths实测(2025营收388.71亿)+L4方正证券2026-06",
            "q3p": true,
            "q3pClaim": "全球OSAT第三·中国大陆封测绝对龙头·先进封装CoWoS外溢订单国内首选承接方——日月光/安靠/长电三家承接了全球>50%的先进封装外包订单·但OSAT行业CR5≈60%(非≤3家寡头·日月光全球第一长电第三)",
            "q3pSrc": "L3 Prismark 2026全球OSAT排名+L1长电科技2025年报",
            "q4p": true,
            "q4pClaim": "CoWoS封装为AI芯片主流方案至少3-5年确定性高(英伟达GB300/Rubin均采用CoWoS-L)·中长期面临硅光子/CPO等技术演进风险——但先进封装本身是这些新技术的使能者(硅光子仍需2.5D封装)而非被替代者·封装技术路线升级风险低于可插拔光模块",
            "q4pSrc": "L3 SEMI 2025先进封装技术路线图+L4券商技术趋势分析"
          },
          {
            "name": "通富微电",
            "code": "002156",
            "q1": false,
            "q1note": "同上·非供给寡头",
            "q2": true,
            "q2note": "AMD 独家验证周期>18 月",
            "q3": true,
            "q3note": "AMD CPU/GPU 封测 70% 独家·短期无替代",
            "q4": true,
            "q4note": "AMD MI300 系列 CoWoS 封装刚需",
            "hits": 3,
            "strength": "★★☆",
            "q1p": true,
            "q1pClaim": "全球70%AMD高端CPU/GPU封测独家供应商·与AMD的封测合作超过10年·AMD MI300系列CoWoS封装独家封测供应商·AMD切换封测供应商需重新完成全套产品认证(估计12-18月)——客户集中度既是壁垒也是风险",
            "q1pSrc": "L1通富微电2025年报+L4方正证券2026-06",
            "q2p": true,
            "q2pClaim": "全球唯一同时覆盖AMD CPU/GPU全系先进封装的中国OSAT·先进封装收入占比≈70%——国内先进封装纯度最高的封测标的·2025净利+79.86%验证绑定AMD的商业实质正在兑现",
            "q2pSrc": "L1 akshare abstract_ths实测(2025净利12.19亿+79.86%)+L4方正证券",
            "q3p": true,
            "q3pClaim": "国内封测第二(仅次于长电科技)·全球约第五·AMD封装独家供应商地位构成细分赛道的独占性——但这个独占性由客户关系决定(AMD选择了通富),而非技术独占(台积电InFO也为AMD提供部分封装)",
            "q3pSrc": "L3 Prismark 2026全球OSAT排名+L1通富微电2025年报",
            "q4p": false,
            "q4pClaim": "通富微电的技术路线确定性受制于AMD的战略决策而非自身技术能力——如果AMD决定引入第二家封测供应商(台积电CoWoS产能缓解后),或AMD的CPU/GPU市场份额被英伟达进一步侵蚀,通富微电将面临订单分流风险。先进封装技术本身前景广阔,但通富微电的路线确定性取决于AMD的路线确定性",
            "q4pSrc": "L4券商AMD竞争格局分析+L3 Mercury Research CPU/GPU市场份额数据"
          },
          {
            "name": "华天科技",
            "code": "002185",
            "q1": false,
            "q1note": "非供给寡头",
            "q2": true,
            "q2note": "南京基地产能建设>12 月",
            "q3": false,
            "q3note": "eSiFO 路线可被长电 XDFOI/通富方案替代",
            "q4": true,
            "q4note": "国产芯片封装需求增长",
            "hits": 2,
            "strength": "★☆☆",
            "q1p": false,
            "q1pClaim": "华天科技主要服务国内芯片设计公司和消费电子客户——缺乏英伟达/AMD级别的战略大客户深度绑定。eSiFO扇出封装为差异化路线(消费电子/物联网芯片封装·非AI芯片主赛道),AEC-Q100车规认证在推进中但尚未形成规模化的车规级大客户。与长电(绑定英伟达)/通富(绑定AMD)的客户壁垒有实质差距",
            "q1pSrc": "L1华天科技2025年报+L4券商研究",
            "q2p": true,
            "q2pClaim": "eSiFO扇出封装差异化路线·南京基地先进封装产线已批量交付·2026Q1营收+34.5%为三家最高(真实增长信号)·但eSiFO技术非独占(台积电InFO是同一大类)——不构成'国内唯一'的壁垒",
            "q2pSrc": "L1 akshare abstract_ths实测(2026Q1营收48亿+34.5%)+L4券商研究",
            "q3p": false,
            "q3pClaim": "华天科技全球约第六·国内第三·营收172亿仅为长电的44%——体量劣势在重资产OSAT行业意味着更低的设备利用率和更弱的定价权。在先进封装大客户认证中,日月光/安靠/长电/通富通常优先获得认证机会,华天作为追赶者进入顶级客户供应链需要更长周期",
            "q3pSrc": "L3 Prismark 2026全球OSAT排名+L1华天科技2025年报(营收172.14亿)",
            "q4p": true,
            "q4pClaim": "eSiFO扇出封装路线为成熟技术(台积电InFO已验证商业化可行性)·华天科技的路线风险低于甬矽(甬矽押注CoWoS但与台积电/长电正面竞争)——在消费电子/物联网封装领域,eSiFO路线的技术替代风险可控,但需求增速天花板低于AI芯片封装",
            "q4pSrc": "L4券商先进封装技术路线分析"
          }
        ],
        "variant": "techBarrier"
      },
      {
        "name": "细分领域先进封装",
        "barrier": "中",
        "stocks": [
          {
            "name": "甬矽电子",
            "code": "688362",
            "q1": false,
            "q1note": "2.5D 封测非寡头·台积电/日月光/安靠均可做",
            "q2": true,
            "q2note": "124 亿投资·产能建设>18 月",
            "q3": false,
            "q3note": "长电/通富/华天均可替代",
            "q4": false,
            "q4note": "客户验证阶段早·需求确定性待验证",
            "hits": 1,
            "strength": null,
            "q1p": false,
            "q1pClaim": "甬矽电子尚未形成战略大客户的深度绑定——L1年报未披露任何单一客户营收占比>10%,与长电(绑定英伟达)/通富(绑定AMD)有实质差距。CoWoS-L产能仍在爬坡中(未形成有效供给),没有已通过量产验证的大客户认证记录可查",
            "q1pSrc": "L1甬矽电子2025年报(akshare abstract_ths实测·2025营收43.98亿+21.9%/净利8,173万+23.2%)+L4券商先进封装行业报告",
            "q2p": false,
            "q2pClaim": "2.5D/CoWoS封装技术不是甬矽的独家技术——台积电(绝对领先)/日月光/安靠/长电/通富/三星均可提供同类封装服务。124亿投资的产能尚在建设中(建成之前不构成对竞争者的有效威慑),且当前净利仅8,173万(净利率0.89%)——重资产产能建成后若利用率不足,巨额折旧将迅速吞噬微薄利润。资产负债率73.05%持续攀升(2022 64.6%→2025 73.1%)——高杠杆约束了后续的产能扩张和技术迭代能力",
            "q2pSrc": "L1 akshare abstract_ths实测(净利8,173万/净利率0.89%/负债率73.05%)+L4券商行业格局分析",
            "q3p": false,
            "q3pClaim": "全球OSAT排名未进入前十,国内排第四(次于长电/通富/华天)。CoWoS-L产能建成≠订单填满——面临的竞争包括台积电(CoWoS技术绝对领先·市占>80%)和长电科技(已有英伟达认证·78亿临港工厂直接竞争)。甬矽目前没有任何技术或客户维度上的独占性优势",
            "q3pSrc": "L3 Prismark 2026全球OSAT排名+L1甬矽电子2025年报",
            "q4p": true,
            "q4pClaim": "CoWoS封装为AI芯片主流方案确定性高(英伟达GB300/Rubin均采用CoWoS-L),甬矽选择的技术路线方向正确。但技术路线的正确性≠甬矽在这条路线上的商业成功——124亿投资押注CoWoS-L是'正确但太早'的典型案例(产业方向对、但公司体量和利润规模尚不足以支撑这种规模的投资)",
            "q4pSrc": "L3 SEMI 2025先进封装技术路线图+L1甬矽电子2025年报"
          },
          {
            "name": "晶方科技",
            "code": "603005",
            "q1": false,
            "q1note": "车载 CIS 封装非寡头",
            "q2": false,
            "q2note": "产能扩张周期<12 月",
            "q3": false,
            "q3note": "华天/通富均有 CIS 封装能力",
            "q4": false,
            "q4note": "车载 CIS 需求增速<AI 芯片·非爆发赛道",
            "hits": 3,
            "strength": "★★☆",
            "q1p": true,
            "q1pClaim": "AEC-Q100车规级CIS封装认证周期12-18月,进入汽车供应链后切换成本极高(整车厂不愿频繁换封测供应商,一旦涉及安全件封测变更需要重新做全套验证)。晶方科技国内车载CIS WLCSP封装市占率>50%,客户覆盖韦尔股份/格科微/思特威——在车载CIS这个细分赛道形成了稳固的客户壁垒。⚠️此壁垒是'汽车供应链认证壁垒'而非'AI芯片供应链认证壁垒'——与长电/通富的英伟达/AMD绑定性质完全不同赛道",
            "q1pSrc": "L1晶方科技2025年报(akshare abstract_ths实测·2025营收14.74亿+30.4%/净利3.70亿+46.2%/毛利率47.1%)+L4券商车载CIS封装行业分析",
            "q2p": true,
            "q2pClaim": "毛利率47.10%属封装行业极高水平(远超长电14%/通富15%/华天13%),验证了WLCSP细分赛道的高附加值属性和非价格竞争特征——晶方不是靠拼低价拿订单,而是靠技术溢价。但WLCSP技术本身非独占——华天科技/精材科技(台)均可提供同类封装服务",
            "q2pSrc": "L1 akshare abstract_ths实测(毛利率47.10%)+L4券商WLCSP封装行业分析",
            "q3p": true,
            "q3pClaim": "国内车载CIS WLCSP封装市占率>50%(国内第一),全球与精材科技(台)竞争,WLCSP细分赛道全球CR3≈70%——竞争格局相对集中但非寡头垄断。⚠️晶方科技的这个竞争位次是'车载CIS封装'赛道的位次,不是'AI芯片封装'赛道的位次——将其与长电/通富在CoWoS封装赛道的排名直接对比是不合理的跨赛道对标",
            "q3pSrc": "L4券商车载CIS封装行业格局分析+L1晶方科技2025年报",
            "q4p": false,
            "q4pClaim": "车载CIS封装赛道增速天花板低于AI芯片封装(车载CIS市场CAGR≈8-12% vs CoWoS封装CAGR≈30%+)。晶方科技聚焦车载+安防CIS,不涉及AI芯片CoWoS/2.5D/3D封装——不会受益于AI算力驱动的封装需求爆发。2026Q1净利+0.1%几乎零增长——在车载CIS市场仍在增长的背景下增速骤降,可能是客户备货节奏变化或竞争加剧的信号。技术路线本身(WLCSP)是成熟技术,替代风险低但增长空间也有限",
            "q4pSrc": "L3 Yole 2026车载CIS市场预测+L1 akshare abstract_ths实测(2026Q1净利+0.1%)"
          }
        ],
        "variant": "techBarrier"
      },
      {
        "name": "封装专用设备",
        "barrier": "高",
        "stocks": [
          {
            "name": "芯源微",
            "code": "688037",
            "q1": true,
            "q1note": "临时键合/解键合国产唯一·全球 TEL/EVG/芯源微三家可批量供货",
            "q2": true,
            "q2note": "设备验证+扩产>18 月",
            "q3": true,
            "q3note": "临时键合/解键合国产无替代",
            "q4": true,
            "q4note": "CoWoS/HBM 扩产→键合设备刚需",
            "hits": 4,
            "strength": "★★★"
          },
          {
            "name": "芯碁微装",
            "code": "688630",
            "q1": false,
            "q1note": "直写光刻 DI 全球 5+家·非寡头",
            "q2": true,
            "q2note": "FOPLP+玻璃基板扩产·设备验证>12 月",
            "q3": false,
            "q3note": "日本 SCREEN/ORC 等可替代",
            "q4": true,
            "q4note": "先进封装扩产拉动 DI 光刻需求",
            "hits": 2,
            "strength": "★☆☆"
          },
          {
            "name": "文一科技",
            "code": "600520",
            "q1": false,
            "q1note": "全球塑封设备 TOWA/APIC Yamada 主导·文一为国产唯一验证中",
            "q2": false,
            "q2note": "样机验证阶段·尚未进入量产扩产周期",
            "q3": false,
            "q3note": "TOWA/APIC Yamada 可替代",
            "q4": true,
            "q4note": "12寸晶圆级塑封为先进封装必选设备",
            "hits": 1,
            "strength": null
          },
          {
            "name": "快克智能",
            "code": "603203",
            "q1": false,
            "q1note": "TCB热压键合全球ASM/BESI主导·快克为国产追赶者·非寡头",
            "q2": false,
            "q2note": "TCB设备仍处验证→商业化过渡期·未批量供货",
            "q3": false,
            "q3note": "全球TCB设备>5家·快克份额极小",
            "q4": true,
            "q4note": "TCB为Chiplet/2.5D封装必需设备·需求确定性高",
            "hits": 1,
            "strength": null
          }
        ]
      },
      {
        "name": "封装材料",
        "barrier": "高",
        "stocks": [
          {
            "name": "飞凯材料",
            "code": "300398",
            "q1": false,
            "q1note": "全球 Brewer Science/HD Micro 主导·飞凯为国产唯一小批量",
            "q2": true,
            "q2note": "材料验证+放量>18 月",
            "q3": true,
            "q3note": "临时键合胶国产无替代（鼎龙可互补非替代）",
            "q4": true,
            "q4note": "先进封装扩产→键合胶耗材刚需",
            "hits": 1,
            "strength": null,
            "q1p": false,
            "q1pClaim": "临时键合胶国产化率<10%,但飞凯材料的临时键合胶目前处于'小批量销售'阶段——不是'已通过大客户量产认证并批量供货'。Brewer Science(美国·全球市占>70%)是绝对主导者,飞凯的客户认证仍在从'小批量→规模放量'的过渡期",
            "q1pSrc": "L1飞凯材料2025年报(营收32.26亿+10.6%/净利3.90亿+58.4%/毛利率36.4%)+L4券商临时键合胶行业分析",
            "q2p": false,
            "q2pClaim": "临时键合胶≠飞凯的独占技术——鼎龙股份+德邦科技同步布局,国内至少三条国产替代线在同时推进。毛利率36.4%在材料行业中属中等偏上(对比鼎龙50.9%),验证了其产品有一定技术含量但非寡头级别的技术溢价",
            "q2pSrc": "L1 akshare abstract_ths实测(毛利率36.41%)+L4券商行业格局",
            "q3p": false,
            "q3pClaim": "临时键合胶——全球Brewer Science市占>70%(绝对主导),飞凯小批量销售·全球份额估计<3%。BGA锡球——飞凯在该细分有一定全球份额(估计>10%),但这个细分不属于先进封装的核心赛道。综合:在先进封装材料的全球竞争格局中,飞凯的份额极小",
            "q3pSrc": "L4券商临时键合胶全球格局分析+L1飞凯材料2025年报",
            "q4p": true,
            "q4pClaim": "临时键合/解键合工艺为CoWoS/HBM堆叠的必选工艺——设备端(芯源微)和耗材端(临时键合胶+解键合胶)是同一工艺的两个必需配套。只要先进封装持续扩产,临时键合胶的需求确定性就高。飞凯的技术路线没有问题——问题不在路线而在商业化进度(小批量→规模放量仍需时间)",
            "q4pSrc": "L3 SEMI 2025先进封装设备与材料报告"
          },
          {
            "name": "艾森股份",
            "code": "688720",
            "q1": false,
            "q1note": "PSPI HD Micro 主导·国产化率<5%",
            "q2": true,
            "q2note": "光刻胶验证周期>18 月",
            "q3": true,
            "q3note": "PSPI 国产仅艾森/强力新材有量产能力",
            "q4": true,
            "q4note": "先进封装 PSPI 刚需·用量随 TSV 密度增长",
            "hits": 1,
            "strength": null,
            "q1p": false,
            "q1pClaim": "PSPI光刻胶已实现量产(不是验证阶段),在国内PSPI供应商中处于领先位置。但PSPI量产规模极小——艾森全年营收仅5.93亿,PSPI只占其中一部分(估计<30%≈<1.8亿)。机构调研330+次反映的是高市场关注度,不是客户认证的深度",
            "q1pSrc": "L1艾森股份2025年报(营收5.93亿+37.1%/净利5,124万+53.1%/毛利率29.0%)+L4券商PSPI行业分析",
            "q2p": false,
            "q2pClaim": "PSPI全球主导者为HD Micro(日本·市占>70%),艾森是国产替代的先行者——但非独家。强力新材也在推进PSPI量产,国产替代赛道非艾森独占。艾森的优势在于先发(已实现量产)和机构关注度高(330+次调研),但技术本身不构成独占性壁垒",
            "q2pSrc": "L4券商PSPI全球格局分析+L1艾森股份2025年报",
            "q3p": false,
            "q3pClaim": "PSPI全球份额估计<3%(全球HD Micro主导>70%/Asahi Kasei≈15%/Fujifilm≈10%)。艾森的PSPI业务营收体量极小(估计<1.8亿),在全球维度不具备有意义的竞争位次。在国内维度,艾森是PSPI国产替代的核心标的——但'国内领先'≠'全球竞争位次'",
            "q3pSrc": "L4券商PSPI全球格局分析+L1艾森股份2025年报",
            "q4p": true,
            "q4pClaim": "PSPI为TSV(硅通孔)工艺的必需材料——3D堆叠层数越多,PSPI用量线性增长。只要先进封装继续向3D堆叠方向演进,PSPI的需求确定性就高。艾森选择的PSPI赛道方向正确——问题同样不在路线而在商业化规模(营收5.93亿太小·净利仅5,124万·大规模放量需时间)",
            "q4pSrc": "L3 SEMI 2025先进封装材料路线图"
          },
          {
            "name": "沃格光电",
            "code": "603773",
            "q1": false,
            "q1note": "TGV 玻璃基板产业导入期·全球参与者<10 家",
            "q2": true,
            "q2note": "TGV 全流程量产建设>12 月",
            "q3": true,
            "q3note": "国内唯一 TGV 全流程量产·无替代方案",
            "q4": false,
            "q4note": "TGV 为下一代方案·当前主流仍是硅中介层·需求确定性待验证",
            "hits": 0,
            "strength": null,
            "q1p": false,
            "q1pClaim": "TGV玻璃基板属于产业导入期技术——Intel/三星已宣布采用但尚未大规模量产。沃格建成国内第一条TGV全流程产线,但'产线建成'≠'有客户订单'——当前没有任何L1公告或公开信息可以验证沃格已获得量产的TGV客户认证和批量订单。传统光电玻璃业务(占营收绝大部分)处于低毛利/持续亏损状态——这个'基本盘'不但不能支撑先进封装客户壁垒,反而在消耗公司的财务资源",
            "q1pSrc": "L1沃格光电2025年报(营收25.51亿+14.9%/净利-1.58亿-29.5%·亏损扩大/毛利率16.95%/负债率70.71%)+§6.15亏损扩大模式",
            "q2p": false,
            "q2pClaim": "TGV玻璃基板不是沃格的独占技术——康宁/SCHOTT/AGC等全球玻璃巨头拥有更深厚的技术积累和客户关系,一旦TGV需求规模启动可以快速跟进。沃格的先发优势是'建成了第一条产线'——这是时间差优势而非技术壁垒。'国内唯一TGV全流程量产'这个描述的实质是'在产业导入期建成了第一条产线'——不是壁垒,是期权",
            "q2pSrc": "L4券商TGV技术路线分析+§6.15亏损公司专项·'国内唯一产线'=期权非壁垒",
            "q3p": false,
            "q3pClaim": "TGV玻璃基板产业导入期·全球参与者<10家——沃格不在其中任何可验证的排名中占据优势位置。传统光电玻璃业务处于深陷亏损的低端竞争(毛利率17%持续下降),这个基本盘的竞争位次反而在拖累公司在先进封装领域的资源配置能力",
            "q3pSrc": "L1沃格光电2025年报(毛利率16.95%·三年持续下降·2022 22.2%→2025 17.0%)",
            "q4p": false,
            "q4pClaim": "TGV玻璃基板作为下一代中介层方案的技术方向大概率正确(Intel/三星均已宣布采用)——但技术路线的正确性≠技术路线对沃格光电的商业价值。当前硅中介层仍是2.5D/3D封装的主流方案,TGV的产业导入至少需要3-5年。沃格光电在财务上无法支撑到TGV放量那天(持续亏损+毛利率下降+负债率70.7%)——'正确但太早'是沃格光电最精准的概括。'太早'意味着公司可能在TGV商业化曙光到来之前,已被传统业务的亏损拖垮",
            "q4pSrc": "L3 Intel/三星TGV技术路线图+L1沃格光电2025年报(§6.15亏损扩大·净利-1.58亿·负债率70.71%)"
          },
          {
            "name": "江丰电子",
            "code": "300666",
            "q1": false,
            "q1note": "溅射靶材全球CR3≈60%·非寡头·但国内龙头",
            "q2": false,
            "q2note": "",
            "q3": false,
            "q3note": "",
            "q4": true,
            "q4note": "TSV工艺必需耗材·需求确定性高",
            "hits": 3,
            "strength": "★★☆",
            "q1p": true,
            "q1pClaim": "超高纯溅射靶材——进入台积电/中芯国际/长江存储的靶材供应商名录需通过12-18月认证,认证完成后客户粘性高(靶材是持续性耗材,与设备的一次性采购不同)。江丰电子是国内唯一通过头部晶圆厂靶材认证并稳定供货的国产供应商,客户覆盖国内主要晶圆厂和封测厂。TSV薄膜沉积每片晶圆都需要靶材——耗材属性带来持续性订单,客户粘性优于设备类公司",
            "q1pSrc": "L1江丰电子2025年报(营收46.04亿+27.7%/净利5.00亿+24.7%/ROE10.58%)+L4券商靶材行业分析",
            "q2p": true,
            "q2pClaim": "超高纯溅射靶材技术壁垒——金属纯度(>99.999%)/晶粒尺寸/微观组织均匀性——国内具备量产能力的供应商不超过3家,江丰电子在国内靶材市场的份额估计15-20%(国内第一)。营收46亿+ROE10.6%验证了技术壁垒已转化为商业价值——不是'小批量验证阶段',而是'规模放量中的国内龙头'。靶材的耗材属性意味着客户一旦认证通过,会持续复购——不是一次性设备采购",
            "q2pSrc": "L1 akshare abstract_ths实测(营收46.04亿/净利5.00亿/ROE10.58%)+L4券商靶材行业分析",
            "q3p": false,
            "q3pClaim": "全球溅射靶材由日矿金属(JX Nippon)/东曹(Tosoh)/霍尼韦尔(Honeywell)主导,CR3≈60%。江丰电子全球份额估计<10%,属中小供应商。在国内维度江丰是第一,但全球维度不是top 3——这个差异决定了barrier不能高于3(技术壁垒存在但竞争者>5家)",
            "q3pSrc": "L4券商靶材全球格局分析+L1江丰电子2025年报",
            "q4p": true,
            "q4pClaim": "溅射靶材为物理气相沉积(PVD)工艺的核心耗材——TSV/薄膜沉积均为先进封装的必需工艺,靶材的技术路线无即期替代风险。但需注意:靶材的国产替代从'高端产品验证'阶段进入'规模放量+价格竞争'阶段——毛利率从30%→27%的小幅下降是正常的产业规律,代表国产替代从'高溢价验证期'进入'规模竞争期'",
            "q4pSrc": "L3 SEMI 2025半导体材料报告+L1 akshare abstract_ths实测(毛利率27.17%·小幅下降趋势)"
          },
          {
            "name": "德邦科技",
            "code": "688035",
            "q1": false,
            "q1note": "Underfill全球>10家·非寡头",
            "q2": false,
            "q2note": "",
            "q3": false,
            "q3note": "",
            "q4": true,
            "q4note": "FC封装必需材料·需求确定性高",
            "hits": 1,
            "strength": null,
            "q1p": false,
            "q1pClaim": "CDAF(芯片贴装膜)国内首家量产,Underfill(底部填充胶)国内布局中。但德邦的客户认证受限于产品定位——CDAF/Underfill的客户认证在HBM封装场景下较集中(全球3-4家供应商),但在通用先进封装场景下供应商>10家,德邦在其中不是top 3。毛利率仅27.50%(在材料行业中偏低)间接验证了其产品溢价能力有限",
            "q1pSrc": "L1德邦科技2025年报(营收15.47亿+32.6%/净利1.08亿+10.5%/ROE4.66%/毛利率27.50%)·C类跨链",
            "q2p": false,
            "q2pClaim": "Underfill/CDAF全球供应商>10家(Namics/Henkel/德邦/Shin-Etsu等)——德邦不是全球top 3。CDAF国内首家量产的先发优势在HBM封装语境下有价值(供应商3-4家),但在通用先进封装语境下被稀释(供应商>10家)。毛利率27.5%与鼎龙(50.9%)差距显著——间接验证了德邦的产品在价值链中处于中低端位置,技术溢价有限",
            "q2pSrc": "L4券商Underfill/CDAF全球格局分析·C类跨链·先进封装语境重评",
            "q3p": false,
            "q3pClaim": "CDAF——国内首家量产,全球非top 3(Namics/Henkel主导)。Underfill——全球非top 5。德邦在全球先进封装材料市场的竞争位次不显著——在国内维度有一定先发优势(CDAF首家量产),但这个优势在通用先进封装语境下(供应商>10家)的竞争壁垒有限",
            "q3pSrc": "L4券商行业格局分析·C类跨链",
            "q4p": true,
            "q4pClaim": "Underfill/CDAF为FC封装(倒装焊)的必需材料——所有采用FC封装的芯片都需要Underfill来填补芯片与基板之间的空隙。只要先进封装继续增长,Underfill/CDAF的需求确定性就高。德邦的技术路线没有问题——问题在竞争格局更分散(通用封装>10家供应商)导致的溢价能力受限",
            "q4pSrc": "L3 SEMI 2025先进封装材料报告·C类跨链"
          },
          {
            "name": "鼎龙股份",
            "code": "300054",
            "q1": false,
            "q1note": "三线平台·单线均非全球寡头",
            "q2": false,
            "q2note": "",
            "q3": false,
            "q3note": "",
            "q4": true,
            "q4note": "先进封装三大核心工艺覆盖·路线确定性高",
            "hits": 3,
            "strength": "★★☆",
            "q1p": true,
            "q1pClaim": "PSPI(TSV必需材料)+CMP抛光垫(平坦化必需)+临时键合胶(键合必需耗材)——三条材料线均已通过客户认证并有稳定出货。鼎龙不是'小批量验证中',而是已进入规模供货阶段(CMP抛光垫国产替代主力·PSPI国内唯二量产·临时键合胶已有客户稳定出货)。三条线同时获得客户认证的协同效应——客户一站式采购降低了多供应商管理的复杂度,这种'认证广度'本身就是一种壁垒",
            "q1pSrc": "L1鼎龙股份2025年报(营收36.60亿+9.7%/净利7.20亿+38.3%/ROE12.83%/毛利率50.85%)·C类跨链",
            "q2p": true,
            "q2pClaim": "鼎龙的壁垒不是'单线的技术独占'而是'三线的广度协同'——PSPI全球HD Micro主导(>70%)/CMP抛光垫Dow/Cabot主导(CR2>60%)/临时键合胶Brewer Science主导(>70%)——在任何单线中鼎龙都不是全球top 3。但三条线同时布局的国产供应商仅鼎龙一家——这种'三线广度'构成独特的协同壁垒:客户一站式采购(降低供应商管理成本)+研发协同(三条线的材料科学底层相通)+渠道共享(同一批封测客户可以交叉销售)。毛利率50.85%验证了这种广度壁垒已转化为定价权——不是低毛利的价格竞争者",
            "q2pSrc": "L4 SEMI 2025全球材料格局+L1鼎龙股份2025年报·C类跨链·先进封装语境重评",
            "q3p": false,
            "q3pClaim": "如果按单线排名:PSPI全球第四(列HD Micro/Asahi/Fujifilm之后)/CMP抛光垫全球第四(列Dow/Cabot之后)/临时键合胶全球第四(列Brewer Science之后)。任何单线都不是全球top 3。如果按三线平台广度排名:国产唯一(没有第二家同时覆盖这三条线的中国公司)。鼎龙的竞争位次取决于用什么维度衡量——单线深度视角→非寡头;平台广度视角→国产唯一",
            "q3pSrc": "L4 SEMI/券商全球材料格局分析·C类跨链",
            "q4p": true,
            "q4pClaim": "PSPI+CMP抛光垫+临时键合胶——三条线均服务于先进封装的核心工艺(TSV/平坦化/键合),这些工艺在未来5-10年内没有即期替代风险。鼎龙的三线平台不是押注单一技术路线,而是覆盖了先进封装的三个关键工艺节点——这种'多路线覆盖'本身降低了单一技术路线被替代的风险(即使某条线被新技术替代,其他两条线仍在)",
            "q4pSrc": "L3 SEMI 2025先进封装技术路线图·C类跨链"
          }
        ],
        "variant": "techBarrier"
      },
      {
        "name": "IC 载板与中介层",
        "barrier": "高",
        "stocks": [
          {
            "name": "深南电路",
            "code": "002916",
            "q1": false,
            "q1note": "ABF 载板全球 Ibiden/Shinko/Unimicron 主导·国产化率~4%",
            "q2": true,
            "q2note": "FC-BGA 载板验证+产能建设>18 月",
            "q3": true,
            "q3note": "国内仅深南/兴森有 FC-BGA 量产能力",
            "q4": true,
            "q4note": "AI 芯片封装→FC-BGA 载板刚需·ABF 膜 97% 依赖味之素为真卡口",
            "hits": 4,
            "strength": "★★★",
            "q1p": true,
            "q1pClaim": "FC-BGA载板全球仅约5家公司可量产(ibiden/Shinko/Unimicron/深南/兴森),深南电路是大陆唯一批量交付的供应商。华为昇腾核心供货方(配套份额超六成)+英伟达/AMD供应商认证覆盖。广州60亿FC-BGA投资(2027量产)验证了下游客户的长期需求承诺。ABF良率突破80%+认证18-24月——客户切换成本极高",
            "q1pSrc": "L1深南电路2025年报(营收+37.9%/净利+73.0%/ROE19.1%)+L3 Prismark 2026·C类跨链",
            "q2p": true,
            "q2pClaim": "PCB+封装基板+装联3-in-1全栈能力——国内唯一。ABF载板良率突破80%(良率是载板制造的核心壁垒)。全球仅约5家公司具备FC-BGA载板的规模量产能力,深南电路在其中不是'追赶者'(兴森是),而是'已量产的中国代表'。⚠️重要注脚:FC-BGA载板的核心原材料ABF膜97%依赖日本味之素——深南电路的制造壁垒受到上游原料供给的约束。真正的物理卡口在ABF膜材料端,深南电路处于卡口的下游加工端",
            "q2pSrc": "L3 Prismark 2026·ABF膜味之素97%格局+L1深南电路2025年报·C类跨链",
            "q3p": true,
            "q3pClaim": "FC-BGA载板全球约第4-5位(列ibiden/Shinko/Unimicron之后,与兴森/其他日韩厂商竞争),大陆绝对第一(大陆唯一批量交付)。全球FC-BGA载板市场集中度较高(CR5>80%),深南电路在其中占据了一个稳固但非领先的位置。⚠️注脚:深南电路的全球竞争位次受限于ABF膜供给——如果味之素优先供货给ibiden/Shinko(日系优先),深南的产能扩张可能受到原料约束",
            "q3pSrc": "L3 Prismark 2026全球IC载板排名+L1深南电路2025年报·C类跨链",
            "q4p": true,
            "q4pClaim": "FC-BGA载板为2.5D/3D先进封装的标准基板方案——只要CoWoS/HBM封装继续增长,FC-BGA载板的需求确定性就高。ABF膜的技术路线短期内无替代方案(BT载板适用于中低端,无法替代ABF载板在高端芯片封装中的位置)。长期风险:TGV玻璃基板可能在未来5-10年部分替代ABF载板——但玻璃基板替代方案仍处于产业导入期,短期内ABF载板地位稳固",
            "q4pSrc": "L3 Prismark 2026 IC载板技术路线+L4券商TGV技术趋势分析·C类跨链"
          },
          {
            "name": "兴森科技",
            "code": "002436",
            "q1": false,
            "q1note": "FC-BGA小批量出货·追赶深南·非寡头",
            "q2": false,
            "q2note": "",
            "q3": false,
            "q3note": "",
            "q4": true,
            "q4note": "FC-BGA路线方向正确·但追赶窗口可能收窄",
            "hits": 1,
            "strength": null,
            "q1p": false,
            "q1pClaim": "FC-BGA载板处于'小批量出货→批量供货'的过渡阶段——不是'已批量交付'(深南电路的状态)。FCBGA Rubin 200批量供货+双AI巨头验证+台积电BT载板验证——这三条都是真实的客户进展,但'小批量出货'≠'客户已锁定'。深南电路的FC-BGA良率已突破80%并持续批量交付,兴森仍在追赶良率和产能规模的阶段",
            "q1pSrc": "L1兴森科技2025年报(营收+15.1%/净利+100%·低基数0.42亿/ROE2.52%/毛利率19.2%)·C类跨链",
            "q2p": false,
            "q2pClaim": "FC-BGA载板量产是兴森的目标而非已实现的状态——FCBGA Rubin 200批量供货是一个重要的里程碑,但兴森的FC-BGA业务体量仍极小(公司整体净利仅0.42亿,FC-BGA贡献估计极小)。毛利率仅19.2%(对比深南29.2%)——间接验证了兴森的FC-BGA产品仍处于'低附加值的初期量产阶段',尚未达到'高良率+高附加值'的量产成熟期。全球FC-BGA供应的核心竞争维度是良率——深南>80% vs 兴森的良率未公开披露(可能更低),这个差距决定了兴森是追赶者而非同级别竞争者",
            "q2pSrc": "L1兴森科技2025年报(毛利率19.17% vs 深南29.17%)+L4券商FC-BGA行业分析·C类跨链",
            "q3p": false,
            "q3pClaim": "FC-BGA载板全球约第5-6位(追赶者·列ibiden/Shinko/Unimicron/深南之后)。在国内维度,兴森是FC-BGA载板的第二国产供应商(深南是第一)——这个'第二'的位置有战略备选价值(如果深南的产能无法满足全部国产需求,兴森是唯一的备选方案),但这个价值是'备选价值'而非'竞争价值'。兴森不是在与深南竞争——深南已经领先至少2-3年的良率和产能积累",
            "q3pSrc": "L3 Prismark 2026·C类跨链·先进封装语境重评(barrier从home链4→3下调即基于此位次差异)",
            "q4p": true,
            "q4pClaim": "FC-BGA载板的技术路线前景与深南电路共享——只要CoWoS/HBM封装继续增长,FC-BGA载板的需求确定性就高。兴森面临的技术路线风险与深南相同(ABF膜依赖味之素+TGV长期替代可能),但兴森的额外风险在于:如果在FC-BGA领域追赶深南的过程中,深南的良率和产能优势进一步扩大(深南广州60亿工厂2027投产后),兴森的追赶窗口可能关闭",
            "q4pSrc": "L3 Prismark 2026+L4券商FC-BGA竞争格局·C类跨链"
          }
        ],
        "variant": "techBarrier"
      }
    ]
  },
  "chokePoints": [
    {
      "code": "688037",
      "name": "芯源微",
      "strength": "★★★",
      "moatScore": 75,
      "timingScore": 45,
      "chokePointType": "global-scarcity",
      "barrier": "极高",
      "tier": "C",
      "logic": "<strong>临时键合/解键合国产唯一</strong>——全球仅 TEL/EVG/芯源微三家可批量供货，键合设备是 CoWoS/HBM 堆叠工艺的必选设备。后道设备已批量供台积电/长电/华天，2025 年签单加速。C 类跨链复用（已在 semicon-equip 链有完整 dims6）。",
      "pln": "<strong>💡 大白话：为什么芯源微是物理卡口？</strong><br><br>先进封装就像盖高楼——芯片一层层堆叠起来，每一层之间需要用一种叫'临时键合'的技术先粘住、加工完再'解键合'分开。这个粘住和分开的设备，全球只有三家能造：日本的 TEL、奥地利的 EVG，和中国的芯源微。芯源微的设备已经卖给了台积电、长电科技、华天科技这些大厂，在国产替代路径上没有第二家可选。",
      "src": [
        "L4 申万宏源 2026-06",
        "L1 芯源微 2025 年报"
      ],
      "verification": [
        {
          "question": "芯源微临时键合收入",
          "result": "已确认",
          "source": "L1 2025年报"
        }
      ],
      "asOf": "2026-07-16",
      "pctNote": "C 类跨链·估值/择时请参考 semicon-equip 链",
      "strengthNote": "★★★保留:临时键合/解键合为 CoWoS/HBM 必选设备·全球仅三家可批量供货·国产唯一",
      "plainLanguageNote": "<strong>💡 大白话：为什么芯源微是物理卡口？</strong><br><br>先进封装就像盖高楼——芯片一层层堆叠起来，每一层之间需要用一种叫'临时键合'的技术先粘住、加工完再'解键合'分开。这个粘住和分开的设备，全球只有三家能造：日本的 TEL、奥地利的 EVG，和中国的芯源微。芯源微的设备已经卖给了台积电、长电科技、华天科技这些大厂，在国产替代路径上没有第二家可选。",
      "segment": "封装专用设备"
    },
    {
      "code": "002916",
      "name": "深南电路",
      "strength": "★★★",
      "moatScore": 75,
      "timingScore": 45,
      "chokePointType": "global-scarcity",
      "barrier": "极高",
      "tier": "C",
      "logic": "<strong>FC-BGA 封装基板国产替代核心</strong>——ABF 载板是 AI 芯片封装的'地基'，但 ABF 膜 97% 仍依赖日本味之素（真正的物理卡口在上游材料端）。深南电路在载板制造环节为国内绝对龙头，FC-BGA 验证推进中。C 类跨链复用（已在 PCB 链有完整 chokePoint 评估）。",
      "pln": "<strong>💡 大白话：为什么深南电路是物理卡口？</strong><br><br>AI 芯片封装需要一种叫 ABF 载板的'高级地基'——普通的 PCB 板子做不了这个精度。全球能做 ABF 载板的公司不超过 5 家，深南电路是中国唯一能量产 FC-BGA 封装基板的公司。但要注意：ABF 载板的核心原材料 ABF 膜，全球 97% 掌握在日本味之素手里——真正的物理卡口在上游材料，不在载板制造。",
      "src": [
        "L4 方正证券 2026-06",
        "L3 Prismark 2026"
      ],
      "verification": [],
      "asOf": "2026-07-16",
      "pctNote": "C 类跨链·估值/择时请参考 PCB 链",
      "strengthNote": "★★★保留:FC-BGA 载板国产唯一·但需注意真卡口在 ABF 膜(味之素)",
      "plainLanguageNote": "<strong>💡 大白话：为什么深南电路是物理卡口？</strong><br><br>AI 芯片封装需要一种叫 ABF 载板的'高级地基'——普通的 PCB 板子做不了这个精度。全球能做 ABF 载板的公司不超过 5 家，深南电路是中国唯一能量产 FC-BGA 封装基板的公司。但要注意：ABF 载板的核心原材料 ABF 膜，全球 97% 掌握在日本味之素手里——真正的物理卡口在上游材料，不在载板制造。",
      "segment": "IC 载板与中介层"
    },
    {
      "code": "300054",
      "name": "鼎龙股份",
      "strength": "★★☆",
      "moatScore": 80,
      "timingScore": 80,
      "chokePointType": "domestic-platform",
      "barrier": "高",
      "tier": "C",
      "logic": "<strong>PSPI+CMP 抛光垫+临时键合胶三线国产唯一平台</strong>——单线均非全球≤3家寡头(PSPI 全球 HD Micro 主导>70%/CMP 抛光垫 Dow/Cabot 主导 CR2>60%/临时键合胶 Brewer Science 主导>70%),但三条线同时布局的国产供应商仅鼎龙一家,构成独特的广度协同壁垒(客户一站式采购+研发协同+渠道共享)。性质:国产平台型壁垒(domestic-platform)·非技术独占型卡口。",
      "pln": "<strong>💡 大白话:为什么鼎龙股份是准卡口(★★☆)?</strong><br><br>鼎龙不像芯源微那样'全球只有三家能做',也不像深南电路那样'大陆只有一家能量产'。但它做了一件独特的事:PSPI 光刻胶(TSV 工艺必需)+CMP 抛光垫(平坦化工序必需)+临时键合胶(键合工艺必需)——这三样东西,全球每一家先进封装厂都需要,但全球没有第二家公司同时做这三样。鼎龙是国内唯一同时覆盖这三条核心材料线的公司,相当于你在小区里开了三家不同的便利店——每一家都能单独活下去,但三家一起开,顾客一站式采购的粘性就出来了。这不是单一品种的寡头壁垒,而是多品种覆盖的平台型壁垒。",
      "src": [
        "L4 券商材料行业分析",
        "L1 鼎龙股份 2025 年报"
      ],
      "verification": [],
      "asOf": "2026-07-17",
      "pctNote": "C 类跨链·估值/择时请参考 storage-interface 链",
      "strengthNote": "★★☆准卡口:三线平台·国产唯一·但单线非全球≤3家——domestic-platform 类型首次使用",
      "plainLanguageNote": "<strong>💡 大白话:为什么鼎龙股份是准卡口(★★☆)?</strong><br><br>鼎龙不像芯源微那样'全球只有三家能做',也不像深南电路那样'大陆只有一家能量产'。但它做了一件独特的事:PSPI 光刻胶(TSV 工艺必需)+CMP 抛光垫(平坦化工序必需)+临时键合胶(键合工艺必需)——这三样东西,全球每一家先进封装厂都需要,但全球没有第二家公司同时做这三样。鼎龙是国内唯一同时覆盖这三条核心材料线的公司,相当于你在小区里开了三家不同的便利店——每一家都能单独活下去,但三家一起开,顾客一站式采购的粘性就出来了。这不是单一品种的寡头壁垒,而是多品种覆盖的平台型壁垒。",
      "segment": "封装材料"
    }
  ],
  "supplyGap": [
    {
      "segment": "CoWoS 封装产能",
      "demand": "英伟达2026年CoWoS需求预计60万片(vs 2025年40万片)·AMD/谷歌/亚马逊排队等产能",
      "capacity": "台积电2026年CoWoS产能约60万片(全球>80%)·长电/通富/甬矽合计<20%",
      "gap": "30-40% 缺口",
      "rate": "30-40%",
      "bottleneck": "台积电CoWoS产能为全球瓶颈·扩产周期18-24月·产能缺口预计延续至2027年",
      "tier": "broker",
      "src": "SEMI 2025先进封装市场报告·方正证券2026-06",
      "treeMapMatches": [
        "AI/HPC 芯片(CoWoS/2.5D/3D)"
      ]
    },
    {
      "segment": "临时键合/解键合设备",
      "demand": "全球CoWoS/HBM扩产拉动键合设备需求·2026年全球临时键合设备市场预计>15亿美元",
      "capacity": "TEL(>60%)+EVG(~25%)+芯源微(<15%)全球仅三家可批量供货·交付周期>12月",
      "gap": "国产化率<20%",
      "rate": "<20%",
      "bottleneck": "TEL/EVG双寡头主导·芯源微为国产唯一·设备交付周期长·产能扩张受限于核心零部件供给",
      "tier": "broker",
      "src": "SEMI 2025全球半导体设备报告·申万宏源2026-06",
      "treeMapMatches": [
        "键合设备(临时键合/解键合/TCB)"
      ]
    },
    {
      "segment": "ABF 载板",
      "demand": "每片CoWoS晶圆需≥1片FC-BGA载板·AI芯片封装驱动需求2025-2028 CAGR>25%",
      "capacity": "全球仅约5家可量产(ibiden/Shinko/Unimicron/深南/兴森)·ABF膜97%依赖日本味之素",
      "gap": "国产化率~4%",
      "rate": "~4%",
      "bottleneck": "ABF膜味之素97%全球垄断为绝对物理卡口·载板制造端国产化率~4%·深南电路大陆唯一批量交付",
      "tier": "broker",
      "src": "Prismark 2026全球IC载板排名·方正/国金证券ABF膜行业分析",
      "treeMapMatches": [
        "IC 载板与中介层"
      ]
    },
    {
      "segment": "临时键合胶",
      "demand": "临时键合/解键合工艺为CoWoS/HBM必选工艺·每片晶圆需消耗临时键合胶·耗材属性需求跟随产能线性增长",
      "capacity": "Brewer Science(美·>70%)全球主导·飞凯/鼎龙/德邦合计国产化率<10%",
      "gap": "国产化率<10%",
      "rate": "<10%",
      "bottleneck": "Brewer Science绝对主导·国产替代处于小批量→规模放量过渡期·客户认证周期12-18月",
      "tier": "broker",
      "src": "SEMI 2025全球半导体材料报告·券商材料行业分析",
      "treeMapMatches": [
        "临时键合材料"
      ]
    },
    {
      "segment": "PSPI 光刻胶",
      "demand": "PSPI为TSV工艺必需材料·3D堆叠层数越多PSPI用量线性增长·先进封装扩产直接拉动需求",
      "capacity": "HD Micro(日·>70%)+Asahi Kasei(~15%)全球主导·艾森/强力新材合计国产化率<5%",
      "gap": "国产化率<5%",
      "rate": "<5%",
      "bottleneck": "HD Micro绝对主导·PSPI量产技术壁垒极高(纯度/分辨率/热稳定性)·国产验证周期12-18月",
      "tier": "broker",
      "src": "SEMI 2025全球半导体材料报告·券商PSPI行业分析",
      "treeMapMatches": [
        "PSPI 光刻胶与塑封料"
      ]
    }
  ],
  "methodologyNotes": "先进封装产业链采用 Serenity 物理卡口（Choke Point）方法论，17 只股票 Phase B 六维打分已全部完成（10 只新标的经 abstract_ths L1 实测+豆包 prompt v3+黑名单核实·7 只 C 类跨链复用从 semicon-equip/PCB/storage-interface 链引用已有财务数据并基于先进封装链语境重新评估六维评分）。核心判断：① OSAT 封测代工环节竞争充分（全球 CR5≈60%·>10 家供应商），非物理卡口——价值在承接台积电 CoWoS 外溢订单的业绩弹性，而非护城河壁垒；② 真正的物理卡口在上游——封装设备（临时键合/解键合·国产化率<20%）和封装材料（ABF 膜·味之素 97% 垄断）；③ 本链正式 chokePoint 三条：芯源微（★★★ global-scarcity·临时键合全球仅 TEL/EVG/芯源微三家·barrier=5）、深南电路（★★★ global-scarcity·FC-BGA 载板全球≤5 家·大陆唯一·唯真卡口在 ABF 膜材料端）、鼎龙股份（★★☆ domestic-platform·PSPI+CMP 抛光垫+临时键合胶三线国产唯一平台·单线非全球≤3家但广度构成协同壁垒）；④ 四问筛选采用双重评估体系——设备段（芯源微 q1=true·标准四问适用）与 OSAT/细分封装/材料/载板四段（标准 q1\"全球≤3家\"不适用·改以技术壁垒型四问 q1p-q4p 评估）；⑤ 六维打分严格遵循景气六维打分规则·visibility 按信息渠道层级铁律（信息渠道层级≠业绩好坏）·亏损公司按亏损公司专项规则（沃格光电·亏损扩大模式）；⑥ 跨链复用的 C 类标的采用双轨原则——L1 财务数据直接复用 home 链已验证数据·六维评分基于先进封装链语境重新评估（非简单照搬 home 链分数）·tier 统一标注为 \"C\"。本链 17 只股票完整六维评分、3 条正式 chokePoint 认定及 4 段位 variant 技术壁垒型四问评估均已落地，具体个股评分和 chokePoint 类型判定详见各 segment 和 chokePoints 字段。",
  "globalLandscape": [
    {
      "segmentName": "OSAT 综合封测龙头",
      "globalPattern": "日月光(台·全球第一·市占~30%) | 安靠(美·全球第二·~18%) | 长电科技(中·全球第三·~14%) | 力成(台·第四) | 通富微电(中·全球第五·~8%) · 全球CR5≈60%",
      "domesticPosition": "长电科技国内绝对龙头(营收389亿·覆盖英伟达/华为/SK海力士)·通富微电深度绑定AMD(70%CPU/GPU封测独家·营收279亿)·华天科技eSiFO差异化路线(营收172亿·追赶者)",
      "chokeStatus": "非物理卡口——OSAT行业CR5≈60%·全球>10家供应商·竞争充分。价值在承接台积电CoWoS外溢订单的业绩弹性,非护城河壁垒",
      "keyGap": "先进封装(CoWoS)产能缺口30-40%·台积电主导(>80%份额)·国内三巨头通过产能建设承接外溢·窗口期2-3年",
      "sources": [
        "L3 Prismark 2026全球OSAT排名",
        "L4方正证券2026-06先进封装深度报告",
        "L1 akshare abstract_ths长电/通富/华天2025年报实测"
      ]
    },
    {
      "segmentName": "细分领域先进封装",
      "globalPattern": "台积电CoWoS/InFo/SoIC全栈主导(>80%先进封装份额) | 三星I-Cube/X-Cube | 英特尔EMIB/Foveros · CoWoS-L产能2026年预计60万片",
      "domesticPosition": "甬矽电子(124亿投资2.5D堆叠·CoWoS-L产能爬坡·净利仅8,173万·追赶者) | 晶方科技(车载CIS WLCSP封装龙头·毛利率47%·非AI芯片赛道·与前三家产业逻辑完全不同)",
      "chokeStatus": "非物理卡口——台积电技术绝对领先·国内追赶者体量和客户验证均处于早期。晶方科技在其细分赛道(车载CIS)有稳固壁垒但赛道增速天花板低于AI芯片封装",
      "keyGap": "国内CoWoS产能严重不足(台积电主导·长电/通富/甬矽合计<20%)·产能建设周期18-24月·追赶需时间",
      "sources": [
        "L3 SEMI 2025先进封装技术路线图",
        "L4券商台积电CoWoS产能分析",
        "L1 akshare abstract_ths甬矽/晶方2025年报实测"
      ]
    },
    {
      "segmentName": "封装专用设备",
      "globalPattern": "临时键合/解键合:TEL(日·>60%)+EVG(奥·~25%)+芯源微(中·<15%)全球仅三家 | DI光刻:海德堡(德)+Orc(日)+SCREEN(日)+芯碁微装(中·PCB LDI全球第一18.8%) | TCB键合:ASM Pacific(>50%)+BESI(~30%)+快克智能(中·追赶者)",
      "domesticPosition": "芯源微★★★(临时键合国产唯一·全球≤3家·正式物理卡口) | 芯碁微装(直写光刻国内唯一·FOPLP/TGV第二增长曲线·PE195x高估) | 文一科技(12寸塑封设备·样机验证阶段·watch) | 快克智能(TCB国产追赶者·C类)",
      "chokeStatus": "芯源微为正式物理卡口★★★(临时键合/解键合·全球仅三家可批量供货·国产唯一)。其他设备标的均为追赶者或验证阶段,不构成卡口",
      "keyGap": "临时键合设备国产化率<20%·DI光刻国产化率~30%·TCB键合国产化率<10%——设备端是先进封装国产替代最薄弱的环节",
      "sources": [
        "L3 SEMI 2025全球半导体设备报告",
        "L4申万宏源/方正证券设备行业分析",
        "L1 akshare abstract_ths芯源微/芯碁/文一/快克2025年报实测"
      ]
    },
    {
      "segmentName": "封装材料",
      "globalPattern": "PSPI:HD Micro(日·>70%)+Asahi Kasei(~15%)+Fujifilm(~10%) | 临时键合胶:Brewer Science(美·>70%) | CMP抛光垫:Dow(美)+Cabot(美)·CR2>60% | 溅射靶材:日矿金属+东曹+霍尼韦尔·CR3≈60% | Underfill:Namics/Henkel·全球>10家",
      "domesticPosition": "鼎龙股份★★☆(三线国产唯一平台:PSPI+CMP抛光垫+临时键合胶·domestic-platform·全链财务最优·毛利率50.9%) | 江丰电子(靶材国产龙头·营收46亿·pure-play·全球非top3) | 飞凯材料(临时键合胶小批量·mixed) | 艾森股份(PSPI量产·营收5.9亿极小·mixed) | 德邦科技(CDAF+Underfill·C类·毛利率27.5%偏低) | 沃格光电(TGV产业导入期·skip)",
      "chokeStatus": "单一材料线均非全球寡头(每条线>3家供应商)。鼎龙股份的壁垒性质为domestic-platform(三线广度·国产唯一),非global-scarcity——★★☆准卡口",
      "keyGap": "PSPI国产化率<5%·临时键合胶<10%·CMP抛光垫20-30%·溅射靶材20-30%——每条材料线都存在显著的国产替代空间,但均非唯一国产供应商独占的局面",
      "sources": [
        "L3 SEMI 2025全球半导体材料报告",
        "L4券商材料行业分析(PSPI/CMP/键合胶/靶材)",
        "L1 akshare abstract_ths各公司2025年报实测"
      ]
    },
    {
      "segmentName": "IC 载板与中介层",
      "globalPattern": "FC-BGA载板全球约5家可量产:ibiden(日·第一)+Shinko(日·第二)+Unimicron(台·第三)+深南电路(中·大陆唯一)·兴森科技(中·追赶者) | ABF膜:味之素(日·97%全球垄断)——绝对物理卡口",
      "domesticPosition": "深南电路★★★(FC-BGA全球≤5家·大陆唯一批量交付·良率>80%·广州60亿工厂2027投产·正式物理卡口) | 兴森科技(FC-BGA小批量出货·第二国产供应商·追赶者·barrier=3·战略备选价值)",
      "chokeStatus": "深南电路为正式物理卡口★★★(FC-BGA载板全球≤5家·大陆唯一)。但真正的核心瓶颈在ABF膜(味之素97%垄断)——深南电路处于卡口的下游加工端,非最核心的材料端",
      "keyGap": "ABF膜97%依赖日本味之素(单一供应商风险)——这是先进封装全产业链最集中的供给瓶颈·国产替代尚无时间表。FC-BGA载板制造端国产化率~4%",
      "sources": [
        "L3 Prismark 2026全球IC载板排名",
        "L4方正/国金证券ABF膜行业分析",
        "L1 akshare abstract_ths深南/兴森2025年报实测"
      ]
    }
  ],
  "demandChainMeta": {
    "config": {
      "period": "2025-2028",
      "note": "🆪 AI辅助测算·CAGR来自SEMI 2025/Prismark 2026/L4券商·部分细分市场为定性估计"
    },
    "segments": [
      {
        "key": "aiHpc",
        "name": "AI/HPC 芯片(CoWoS/2.5D/3D)",
        "sharePct": 55,
        "cagr": 30,
        "cagrRange": "25%-35%",
        "cagrTier": "broker",
        "cagrSrc": [
          {
            "tier": "broker",
            "name": "SEMI 2025 先进封装市场报告",
            "date": "2025-Q4",
            "quote": "CoWoS产能2026年预计60万片(vs 2025年40万片)·AI芯片封装需求CAGR>30%·缺口延续至2027年"
          },
          {
            "tier": "broker",
            "name": "方正证券《先进封装深度报告》",
            "date": "2026-06",
            "quote": "AI算力驱动先进封装需求爆发·CoWoS/HBM封装2025-2028 CAGR 25-35%"
          }
        ],
        "valueMult": 5,
        "valueMultRange": "3-6 倍",
        "valueMultNote": "单颗GPU CoWoS封装价值量占芯片总成本30-40%(SEMI 2025)·vs传统封装仅占5-10%",
        "valueMultSrc": [
          {
            "tier": "broker",
            "name": "SEMI 2025 先进封装成本结构分析",
            "date": "2025-Q4",
            "quote": "AI芯片封装价值量占芯片总成本30-40%"
          }
        ],
        "note": "英伟达GB300/Rubin·AMD MI300·华为昇腾——CoWoS封装终极需求方。台积电产能缺口外溢至OSAT·长电/通富承接。⚠️ 口径说明：HBM存储封装是物理上独立的封装工艺（DRAM堆叠 vs 逻辑芯片CoWoS），SEMI/Prismark将两者分为独立子市场统计——合计75%不存在物理口径上的重复计算。但两者的需求驱动力高度相关（均来自AI算力投资），在需求周期性下行时可能同步收缩。"
      },
      {
        "key": "hbm",
        "name": "HBM 存储(堆叠键合)",
        "sharePct": 20,
        "cagr": 25,
        "cagrRange": "20%-30%",
        "cagrTier": "broker",
        "cagrSrc": [
          {
            "tier": "broker",
            "name": "SEMI 2025 HBM封装市场报告",
            "date": "2025-Q4",
            "quote": "SK海力士HBM3E 12Hi 2026年出货量预计同比+80%·单颗HBM需8-12层DRAM堆叠键合"
          },
          {
            "tier": "broker",
            "name": "方正证券《HBM封装产业链研究》",
            "date": "2026-05",
            "quote": "HBM封装市场2025-2028 CAGR 20-30%·TCB键合+MR-MUF为核心工艺"
          }
        ],
        "note": "SK海力士HBM扩产(无锡/重庆厂)→拉动长电科技HBM封装外包+通富微电FC-BGA载板配套。⚠️ 与AI/HPC段的关系：HBM存储封装与AI芯片封装共享同一需求驱动力（AI算力capex），统计口径上是两个独立子市场但在周期性维度上高度相关。"
      },
      {
        "key": "automotive",
        "name": "汽车电子(Fan-Out/WLCSP)",
        "sharePct": 15,
        "cagr": 10,
        "cagrRange": "8%-12%",
        "cagrTier": "broker",
        "cagrSrc": [
          {
            "tier": "broker",
            "name": "Yole 2026 车载CIS封装市场预测",
            "date": "2026-Q1",
            "quote": "车载CIS封装市场2025-2028 CAGR≈8-12%·单车摄像头数量从5颗→12颗"
          }
        ],
        "note": "晶方科技车载CIS封装直接受益·高通骁龙/特斯拉FSD采用Fan-Out封装·非AI芯片赛道·AEC-Q100车规认证12-18月"
      },
      {
        "key": "consumer",
        "name": "消费电子/物联网(SiP/WLCSP)",
        "sharePct": 10,
        "cagr": 5,
        "cagrRange": "3%-8%",
        "cagrTier": "estimate",
        "cagrSrc": [
          {
            "tier": "estimate",
            "name": "🆪 AI推算(基于Prismark消费电子PCB数据+智能手机/可穿戴出货量趋势)",
            "date": "2026-07",
            "quote": "消费电子封装需求增速平缓·CAGR估计3-8%·受智能手机/可穿戴出货量饱和约束"
          }
        ],
        "note": "华天科技eSiFO扇出封装·消费电子/物联网芯片封装为差异化路线·增速低于AI/HPC"
      }
    ],
    "conductionTBD": true,
    "conductionNote": "下游X%→先进封装需求Y%的弹性系数未实装·当前阶段仅提供CAGR量化锚点",
    "note": "先进封装产业链的下游需求传导以AI/HPC芯片(55%)为绝对主力——CoWoS产能缺口是核心驱动力。HBM(20%)与AI芯片需求强相关·两者合计75%说明先进封装周期与AI算力投资周期高度绑定。汽车电子(15%)为独立增长曲线·不受AI周期影响。消费电子(10%)为存量市场·增速平缓。"
  }
};
})(window.CHAINS);
