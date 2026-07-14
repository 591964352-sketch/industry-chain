// data/liquid-cooling.js  —— 升级 X · 新增链（场景 B）：液冷产业链骨架
// 由 index.html 顶部 manifest 同步加载；window.CHAINS 由本文件首次注入。
//
// 2026-06-15 骨架首版 + 二轮注入（CLAUDE.md 数据治理规则·不造数铁律）：
//   骨架版：环节拆解 + 上市公司名单
//   二轮注入：prosperity.dims[6] AI 主观打分 + verdict AI 主观 + 21 只个股 barrier 档
//            + 3 个卡口 + 2 个缺口；**所有"硬数据"（财报/PE/市占/缺口率/估值）全留"待核"**。
//
// Gemini 端（2026-06-15）自查暴露 30+ 项硬数据无源，CC 守门决定：
//   - score 1-5（六维分本身属 estimate 🆪）→ 保留 Gemini 主观打分
//   - evidence / dims6Note / valuation 全部标"待核" → 保留,绝不编造
//   - 维谛技术 300590 标的错误（300590=移为通信,维谛=NYSE:VRT）→ 移除
//   - segments 数：22→21 只；总 5 段
//
// 等下一轮 Gemini 端联网核实 26Q1 财报/PE/分位/市占/缺口率后，再注第三轮。
//
// 与 PCB 黄金范例（data/pcb.js）的差异：
//   - meta.tier='待核' / meta.status='skeleton' 标记本链为"骨架态"
//   - prosperity.dims[].score 全 null（不参与擂台主排名 —— 详见 computeFit gate）
//   - segments[].stocks[].barrier='—'（避免无数据时门控失效）
//   - chokePoints/fourQuestions/supplyGap 全空数组（等 Gemini 端出卡口候选+缺口再注入）
//   - treeMap sub-card 的 position/barrier/note 全 "—"（避免被当作硬数据渲染）

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== 液冷 ====================
CHAINS['liquid-cooling'] = {
  "id": "liquid-cooling",
  "name": "液冷",
  "icon": "❄️",
  "meta": {
    "sector": "中游",
    "tier": "★★☆",
    "status": "active(Phase 8 行业协会专项突破·2026-06-18·7/8 项找到·A 4 sub-card 升级含 CDU 内部成本拆解首次出现(泵 22-40%/换热器 15-25%/阀门 10-15%/传感器 2-5%/控制器 5-10%)+ 一次侧 vs 二次侧价值(冷板式一次侧 20-30%/300 美元/kW,二次侧 70-80%/600-800 美元/kW)+ 二次侧冷却塔能耗占数据中心总能耗 1.2-3.5%+ 漏液检测传感器 BOM 占比 1.5-3%/CDU 2-5%+ B supplyGap[1] rate 2026 缺口率 20-25% 首次量化突破(Phase 5/7 ❌ Phase 8 通过 CDCC + 中招联合找到)+ C 联想 Neptune 海神全球部署 8 万套/HPC TOP500 第一(169 套)/AI 服务器+50% + 工业富联液冷营收 300 亿/同比+200%/GB200 出货 4000 台/单机柜 300 万美元·液冷链数据治理圆满)",
    "updatedAt": "2026-06-18",
    "ltFit": true
  },
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "液冷 = 数据中心的\"中央空调 + 散热血管\"",
    "paragraphs": [
      "你的手机/笔记本/台式机都靠<strong>风冷</strong>（风扇吹散热）——简单但效率低。数据中心几千张 GPU 同时跑，总功耗动辄几十兆瓦，风冷已经<strong>触顶</strong>（单机柜 30kW+ 散不出去）。",
      "<strong>液冷</strong>用液体（纯水/氟化液/油）直接带走热量，效率是风冷的 <strong>1000-3000 倍</strong>（水的导热系数是空气的 ~25 倍、密度 ~800 倍），单机柜功率上限突破到 50-100kW+。PUE（电力使用效率）从 1.3-1.5（风冷）降到 <strong>1.05-1.15</strong>。",
      "<strong>AI 时代的\"刚需\"在哪？</strong>单张 H100 GPU 700W，GB200 NVL72 单机柜 72 颗 = 120kW+，直接超风冷极限。英伟达 GB300/Rubin 强制液冷，谷歌/微软/AWS 2024 起新数据中心全液冷部署。<strong>需求拐点已过、供给端刚起步</strong>——这是\"卡口\"机会的物理基础。"
    ],
    "flowSteps": [
      "氟化液/纯水(冷却介质)",
      "快接/CDU/管路(核心部件)",
      "液冷服务器/机柜(系统集成)",
      "IDC 机房(下游)",
      "风液混合(侧枝)"
    ],
    "highlightBox": "<strong>💡 物理卡口 视角：为什么液冷上游材料比\"中游服务器\"更有\"卡口\"价值？</strong><br>液冷服务器/机柜全球有 20+ 家集成商，客户随时可换。但上游的<strong>氟化液 3M/科慕曾垄断全球 80%+，2022 年环保压力停产退出后，国产承接方巨化/新宙邦/天赐</strong>——这是 3M 退出的\"卡口真空\"。<strong>CDU 温控（英维克/维谛）、快接接头（永贵）、管路（川环）、导热材料（中石/思泉/飞荣达）</strong>也是 3-5 家寡头格局，需求必须从这几家过。"
  },
  "overview": [
    {
      "label": "🌍 全球液冷市场规模(2026E)",
      "value": "60 亿美元",
      "note": "2026E 全球液冷市场 60 亿美元;预计 2035E 达 271 亿美元(CAGR 18.2%)。来源:Global Market Insights(截至 2026-06)",
      "color": "var(--blue)",
      "tier": "estimate",
      "src": "https://www.gminsights.com/industry-analysis/liquid-cooling-market"
    },
    {
      "label": "🇨🇳 中国液冷市场全球占比",
      "value": "中国 159.8 亿元 vs 全球 48 亿美元(口径不同)",
      "note": "Phase 2 2026-06-18 Gemini B 类端核实:赛迪顾问测算 2025 中国液冷数据中心市场规模 159.8 亿元人民币,Global Market Insights 估算 2025 全球数据中心液冷市场 48 亿美元。⚠️由于中美研报换算口径、计算节点及汇率差异,不可强行相除,占比 ②诚标待核(口径不可比) 🔵broker。来源:每日经济新闻 2026-06-16 + GMI 行业报告",
      "color": "var(--muted)",
      "tier": "broker",
      "src": "https://www.nbd.com.cn/articles/2026-06-16/4428252.html / https://www.gminsights.com/zh/industry-analysis/data-center-liquid-cooling-market"
    },
    {
      "label": "🤖 AI 算力核心驱动",
      "value": "GB300 >100kW",
      "note": "Nvidia 新一代机柜功耗超 100kW,远超风冷极限,液冷成高密度\"必选配置\"。来源:IDC 2026 GTC 趋势报告(截至 2026-06)",
      "color": "var(--red)",
      "tier": "broker",
      "src": "IDC 官方博客"
    },
    {
      "label": "🏭 产业阶段",
      "value": "<mark class=\"updated\">繁荣期(渗透加速)</mark>",
      "note": "冷板式液冷大面积铺开,服务器厂商加速集采。AI 主观定性,非具体数字。P1-3 三批联网核实后未变(产业阶段定性本就靠综合判断,无需精确数字)。",
      "color": "var(--green)",
      "tier": "estimate",
      "src": "产业常识"
    },
    {
      "label": "📐 氟化液全球市场规模(2026E)",
      "value": "约 30 亿美元(全球电子氟化液)",
      "note": "Phase 4 2026-06-18 DeepSeek 智能搜索核实:全球电子氟化液市场规模约 30 亿美元🔵broker(证券时报 2025-02-28);全球氟化液市场 2024 约 30.4 亿元🔵broker(申万宏源/浙商证券 2025-08~09);全球 Fluorinated Fluid 市场 2024 4.19 亿美元/2031 预计 5.36 亿美元🔵broker(恒州诚思 2026-03-12);全球数据中心浸没式冷却液市场 2025 约 200 亿元(国内市场)。⚠️口径分歧:氟化液定义范围不同(仅电子级 vs 全场景含半导体/航空/医疗),导致市场规模从数亿美元到 200 亿元人民币不等,需进一步明确口径范围。来源:证券时报 2025-02-28 + 申万宏源/浙商证券 + 恒州诚思 2026-03-12",
      "color": "var(--muted)",
      "tier": "broker",
      "src": "https://www.stcn.com/(证券时报)/https://www.yhresearch.cn/(恒州诚思)"
    },
    {
      "label": "⚡ 下一代催化",
      "value": "浸没式商业化",
      "note": "3M 退出倒逼国产浸没式氟化液验证加速;PUE≤1.2 红线促使存量机房改造。AI 主观判断。",
      "color": "var(--blue)",
      "tier": "estimate",
      "src": "行业研究综述"
    },
    {
      "label": "🔴 核心矛盾",
      "value": "需求暴增 vs 产能/认证瓶颈",
      "note": "前端算力散热刚需井喷,后端 CDU/盲插快接头验证周期长(12-18 月),高质量冷媒供给不足。AI 主观判断。",
      "color": "var(--red)",
      "tier": "estimate",
      "src": "产业链调研逻辑"
    },
    {
      "label": "📋 液冷国产化率(分环节)",
      "value": "<mark class=\"updated\">整体渗透率 45%(2026E)·分环节缺失</mark>",
      "note": "Phase 2 2026-06-18 Gemini B 类端核实:前瞻产业研究院预计 2026 中国液冷数据中心市场渗透率将突破 45%🔵broker(新浪财经 2026-03-04)。⚠️具体分环节(氟化液/CDU/快接/管路/液冷板/传感器)的国产化率%未找到 ≥2 一手/独立来源,公开数据稀缺区诚实标 ②诚标待核。来源:前瞻产业研究院 + 新浪财经 2026-03-04",
      "color": "var(--muted)",
      "tier": "media",
      "src": "https://finance.sina.com.cn/roll/2026-03-04/doc-inhpusks6969794.shtml"
    }
  ],
  "treeMap": {
    "downstream": [
      {
        "name": "AI 算力 IDC",
        "barrier": 3,
        "note": "液冷机架成新建算力中心标配,核心比拼 PUE 达标率与上架率。来源:IDC 行业调研(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):TrendForce 预测 AI 数据中心液冷渗透率从 2024 年 14% 提升至 2026 年 40%;IDC 数据显示 2026 年 Q1 液冷渗透率攀升至 28%🔵broker(TrendForce + IDC,Phase 7 DeepSeek 智能搜索核实)。⚠️注:此为\"液冷渗透率\"口径,不是\"AI 算力 IDC 在液冷需求中占比\",两个口径需明确区分。",
        "companies": [
          {
            "name": "润泽科技",
            "code": "300442",
            "position": "头部算力中心,占比待核。来源:待核",
            "barrier": 3
          },
          {
            "name": "光环新网",
            "code": "300383",
            "position": "一线城市 IDC,占比待核。来源:待核",
            "barrier": 2
          },
          {
            "name": "数据港",
            "code": "603881",
            "position": "阿里定制机房,占比待核。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "HPC/超算中心",
        "barrier": 4,
        "note": "国家级超算项目驱动,浸没式液冷应用较早且成熟。来源:行业白皮书(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):高盛报告显示通用/HPC 服务器液冷渗透率:2024 年 0% → 2025 年 4% → 2026 年 6% → 2027 年 8%🔵broker(高盛研报 + 网易引述,Phase 7 DeepSeek 智能搜索核实)。⚠️增速远低于 AI 训练服务器(2027 年仍仅 8%),HPC 不是液冷主战场。",
        "companies": [
          {
            "name": "中科曙光",
            "code": "603019",
            "position": "超算领域龙头,份额领先。来源:待核",
            "barrier": 4
          }
        ]
      },
      {
        "name": "边缘计算液冷",
        "barrier": 2,
        "note": "5G+MEC 边缘节点单机柜功耗上升,小型化液冷需求。来源:边缘计算白皮书(截至 2026-06)。⚠️ 部分找到(Phase 7 2026-06-18 DeepSeek 智能搜索核实):液冷方案在用户侧小型化数据中心渗透率从 2023 年 8% 跃升至 2025 年 22%;功率密度超 20kW/机柜场景中液冷渗透率达 31%🔵broker(IIM 行业研究,Phase 7 DeepSeek 智能搜索核实)。⚠️口径:用户侧小型化数据中心 ≠ 5G MEC 节点,需进一步细分。",
        "companies": [
          {
            "name": "浪潮信息",
            "code": "000977",
            "position": "边缘服务器供应商。来源:待核",
            "barrier": 2
          },
          {
            "name": "紫光股份",
            "code": "000938",
            "position": "新华三边缘方案。来源:待核",
            "barrier": 2
          }
        ]
      },
      {
        "name": "储能/电池液冷",
        "barrier": 2,
        "note": "储能/动力电池温控液冷,与数据中心液冷技术同源。来源:储能行业报告(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):2023 全球液冷储能市场 40-50 亿元 → 2025 年 165 亿元 → 2026 年预计突破 320 亿元;大储项目液冷渗透率已达 92.7%,2026 年预计达 85% 以上⚪media(东方财富 2026-05-02 + 雪球 AI,Phase 7 DeepSeek 智能搜索核实)——单源 media。⚠️口径:储能液冷渗透率高 ≠ 储能在数据中心液冷中占比高,两者是不同应用场景。",
        "companies": [
          {
            "name": "宁德时代",
            "code": "300750",
            "position": "储能/电池液冷龙头。来源:待核",
            "barrier": 2
          },
          {
            "name": "阳光电源",
            "code": "300274",
            "position": "储能温控方案。来源:待核",
            "barrier": 2
          }
        ]
      }
    ],
    "midstream": [
      {
        "name": "液冷服务器整机",
        "barrier": 3,
        "note": "AI 服务器带量提速,国内双寡头格局明显,集成端竞争激烈。来源:IDC 报告(截至 2026-05)。✅ 占比数据(Phase 4 2026-06-18 DeepSeek 智能搜索核实):2025 冷板式液冷渗透率预计超 60%;中国液冷服务器渗透率预计 2025 年达 25-30%🔵broker(2025 服务器技术全景 + 液冷服务器技术发展报告 2026-05-26);冷板式液冷 2025 市占约 63%,浸没式单相 18%/两相 9%🔵broker;冷板式液冷在数据中心应用占比超 90%🔵broker;液冷技术整体渗透率 2025 达 14.3%🔵broker(同源)。⚠️冷板式因改造成本低占据短期主流。📌**一次侧 vs 二次侧价值首次出现**(Phase 8 行业协会专项):冷板式液冷一次侧(室外)价值量占 20%-30%(约 300 美元/kW),二次侧价值量占 70%-80%(约 600-800 美元/kW)——二次侧为利润核心🔵broker(东方财富 2026-01-13 + 中信建投证券)。",
        "companies": [
          {
            "name": "浪潮信息",
            "code": "000977",
            "position": "服务器市占第一,占比待核。来源:待核",
            "barrier": 3
          },
          {
            "name": "中科曙光",
            "code": "603019",
            "position": "市占前二,自研技术优。来源:待核",
            "barrier": 4
          },
          {
            "name": "紫光股份",
            "code": "000938",
            "position": "新华三份额前三,占比待核。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "液冷数据中心/机房",
        "barrier": 2,
        "note": "全生命周期微模块机房交付,技术门槛适中。来源:行业测算(截至 2026-06)。✅ 占比数据(Phase 5 2026-06-18 DeepSeek 智能搜索核实·冲突解决):⚠️关键澄清:Phase 2 vs Phase 4 不是数据冲突,而是**口径不同**——①480 亿=2025 中国液冷数据中心**产业规模**(赛迪顾问 CCID 定义:含硬件、服务、集成)🔵broker;②149.4 亿=2024 中国液冷数据中心**基础设施市场规模**(IDC 报告:仅含冷板/浸没等纯硬件采购)🔵broker。两者均为真实数据,口径差异 3 倍源于\"产业规模 vs 纯硬件规模\"维度。**Phase 5 升级**:2025 中国液冷数据中心产业规模约 480 亿元(含硬件、服务、集成)🔵broker(赛迪顾问 2025-12-25);2024 仅基础设施硬件市场约 21 亿美元(约 150 亿元人民币)🔵broker(IDC《中国液冷数据中心市场追踪》2025Q1);2025 全球新增模块化数据中心采用液冷方案比例已超 35%🔵broker;⚠️上海 2025 智算中心液冷机柜占比超 50%/北京新建 IDC 液冷渗透率 ≥30%/东数西算 50% 以上项目用液冷(政策口径,单源)。",
        "companies": [
          {
            "name": "科华数据",
            "code": "002335",
            "position": "液冷微模块市占领先。来源:待核",
            "barrier": 2
          }
        ]
      },
      {
        "name": "漏液检测服务/系统集成",
        "barrier": 3,
        "note": "防漏卡口核心环节,提供\"检测→告警→关断→维护\"集成方案。来源:行业方案(截至 2026-06)。⚠️ 部分找到(Phase 7 2026-06-18 DeepSeek 智能搜索核实):赛迪顾问报告预计 2025 中国液冷市场规模突破千亿元,其中检测、验证与运维服务占比将显著提升;漏液检测已成为液冷系统制造与集成环节中不可或缺的质量保障环节🔵broker(赛迪顾问 + 中表仪,Phase 7 DeepSeek 智能搜索核实)——定性描述无精确占比。",
        "companies": [
          {
            "name": "汉威科技",
            "code": "300007",
            "position": "漏液检测传感器供应商。来源:待核",
            "barrier": 3
          },
          {
            "name": "四方光电",
            "code": "688665",
            "position": "气体传感器方案。来源:待核",
            "barrier": 3
          },
          {
            "name": "精测电子",
            "code": "300567",
            "position": "测试设备。来源:待核",
            "barrier": 2
          }
        ]
      }
    ],
    "materials": [
      {
        "name": "氟化液/浸没式冷却液",
        "barrier": 5,
        "choke": true,
        "note": "3M 退出后迎绝佳替代窗口,高质量 C8/C6 冷媒严重供给不足。来源:化工研报(截至 2026-05)。✅ 占比数据(Phase 4 2026-06-18 DeepSeek 智能搜索核实):浸没式方案中冷却液可占约 60% 的价值量;氟碳化合物占浸没式冷却液约 94.2% 份额;全球电子氟化液市场规模约 30 亿美元/国内自给率不足 20%;全球氟化液市场 2024 年约 30.4 亿元🔵broker(证券时报 2025-02-28 + 申万宏源/浙商证券 2025-08~09)。⚠️价格端:国产化推动下氟化液价格或降低 30-40% 🔵broker(同源)。按 G4「市占率档伪造」陷阱,不以历史产能规划平推。",
        "sourceSegment": "冷却介质(氟化液/浸没式冷却液)",
        "companies": [
          {
            "name": "巨化股份",
            "code": "600160",
            "position": "国产替代龙头,占比待核。来源:待核",
            "barrier": 5
          },
          {
            "name": "新宙邦",
            "code": "300037",
            "position": "核心供应商,占比待核。来源:待核",
            "barrier": 4
          },
          {
            "name": "天赐材料",
            "code": "002709",
            "position": "加速切入。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "导热界面材料(TIM)",
        "barrier": 3,
        "choke": false,
        "note": "格局相对分散,多为消费电子散热厂商横向拓展。来源:电子研报(截至 2026-05)。⚠️ 占比数据(Phase 2 2026-06-18 Gemini B 类端核实):①TIM 占液冷板成本占比(%) ②TIM 国内市场规模(亿元) 均未找到 ≥2 一手/独立来源,公开数据稀缺区,受冷板材质(铜/铝)及方案差异影响无统一公允基准比例 → ②诚标待核 🆪estimate,拒绝编造平均数。",
        "sourceSegment": "核心部件(CDU/快接/管路/TIM)",
        "companies": [
          {
            "name": "中石科技",
            "code": "300684",
            "position": "占比待核。来源:待核",
            "barrier": 3
          },
          {
            "name": "思泉新材",
            "code": "301489",
            "position": "占比待核。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "漏液检测传感器",
        "barrier": 3,
        "choke": true,
        "note": "防漏卡口核心元器件,气体/湿度/温度传感器。来源:行业方案(截至 2026-06)。✅ 占比数据(Phase 8 2026-06-18 DeepSeek 智能搜索核实 + 行业协会专项):漏液检测传感器在液冷系统 BOM 中占比约 1.5%-3%,在 CDU 中占比约 2%-5%;高精度方案可达 5%-8%,普通方案约 1%-2%🔵broker(热管理行业报告 2026 + 东方财富 2026-02-05)。⚠️漏液检测传感器市场规模仍缺精确第三方数据,但 BOM 占比首次出现可量化数字。",
        "sourceSegment": "漏液检测/传感(防漏卡口)",
        "companies": [
          {
            "name": "汉威科技",
            "code": "300007",
            "position": "气体传感器国内龙头。来源:待核",
            "barrier": 3
          },
          {
            "name": "四方光电",
            "code": "688665",
            "position": "激光红外传感器。来源:待核",
            "barrier": 3
          },
          {
            "name": "华工科技",
            "code": "000988",
            "position": "激光传感器方案。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "管路/接头材料",
        "barrier": 3,
        "choke": false,
        "note": "不锈钢/橡胶/EPDM 管路 + 接头金属件(对应 equipment[1] 快接)。来源:行业方案(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):液冷系统成本结构中,歧管与管路占 5%-10%;另有报告显示管路阀门等配件占 10%,冷却液仅占 5%⚪media(EET China + 中商产业研究院,Phase 7 DeepSeek 智能搜索核实)——单源 media。⚠️此口径与\"快接头占管路价值比例\"仍不同,需进一步细分。",
        "sourceSegment": "核心部件(CDU/快接/管路/TIM)",
        "companies": [
          {
            "name": "川环科技",
            "code": "300547",
            "position": "液冷管路供应商。来源:待核",
            "barrier": 3
          },
          {
            "name": "中石科技",
            "code": "300684",
            "position": "导热界面。来源:待核",
            "barrier": 3
          },
          {
            "name": "利安隆",
            "code": "300596",
            "position": "高分子材料。来源:待核",
            "barrier": 3
          }
        ]
      }
    ],
    "equipment": [
      {
        "name": "CDU 冷却液分配单元",
        "barrier": 5,
        "choke": true,
        "note": "液冷心脏,集中度极高,满负荷试错与防漏验证壁垒深。来源:招投标数据(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):CDU 占液冷系统价值量 30%-40%;另有报告显示 CDU 占液冷系统成本的 25%-35%🔵broker(西部证券 2026-02-02 + 东吴证券 + EET China,Phase 7 DeepSeek 智能搜索核实)——双源 broker。📌**CDU 内部成本拆解首次出现**(Phase 8 行业协会专项 + 反推法):泵 22%-40%(双层冗余方案近 40%)/换热器 15%-25%/阀门 10%-15%/传感器 2%-5%/控制器 5%-10%/其他配件 10%-15%🔵broker(东方财富 2026-02-05 + 抖音行业报告)。📌参考已知数据:全球 CDU 2025 22.4 亿美元/2026E 25.4 亿美元(Fortune BI)+ 维谛 2025 全球 CDU 市占 11.3% 居首/前五合计 35%🔵broker。⚠️**反推法补充**(Phase 7):英维克 2025 深圳总部服务器冷板/CDU 产能 50 万套(2026 规划 80 万套)🟢primary;CoolIT 多吉瓦级产能/18 个月扩 25 倍🟢primary;Asetek 2025 单一客户交付超 10 万台🟢primary;全球机架式 CDU 2025 销量约 7.1 万台🔵broker(QYResearch);全球 CDU 2025 销量约 8.8 万台🔵broker。⚠️**CDU 缺口率首次量化**(Phase 8):**2026 液冷 CDU 供需缺口率约 20-25%**🔵broker(中招联合 + 东方财富 2026-04-29)。",
        "sourceSegment": "核心部件(CDU/快接/管路/TIM)",
        "companies": [
          {
            "name": "英维克",
            "code": "002837",
            "position": "绝对龙头,份额领先。来源:待核",
            "barrier": 5
          },
          {
            "name": "高澜股份",
            "code": "300499",
            "position": "老牌温控厂,占比待核。来源:待核",
            "barrier": 3
          },
          {
            "name": "申菱环境",
            "code": "301018",
            "position": "稳居一梯队。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "快接接头/管路",
        "barrier": 4,
        "choke": true,
        "note": "盲插防漏专利受限,海外史陶比尔等主导,国产突破中。来源:专利检索(截至 2026-05)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):快接头(UQD)占液冷系统价值量 15%-20%;另有报告显示快接头占液冷系统成本 28%⚪media(EET China + 中商产业研究院,Phase 7 DeepSeek 智能搜索核实)——单源 media,需 ≥2 独立一手来源验证。⚠️UQD 国产化率仍属公开数据稀缺区(永贵降级 ★★☆ Phase 1 已诚实标记)。",
        "sourceSegment": "核心部件(CDU/快接/管路/TIM)",
        "companies": [
          {
            "name": "永贵电器",
            "code": "300351",
            "position": "快接头国产领跑。来源:待核",
            "barrier": 4
          },
          {
            "name": "川环科技",
            "code": "300547",
            "position": "管路龙头。来源:待核",
            "barrier": 3
          }
        ]
      },
      {
        "name": "液冷板/冷板",
        "barrier": 3,
        "choke": false,
        "note": "制造门槛适中,五金件属性偏强,面临一定价格战压力。来源:产业链调研(截至 2026-06)。✅ 占比数据(Phase 7 2026-06-18 DeepSeek 智能搜索核实):冷板占液冷系统价值量 40%-45%(最高单项);另有报告显示液冷板占液冷系统成本 32%⚪media(EET China + 中商产业研究院,Phase 7 DeepSeek 智能搜索核实)——单源 media。⚠️与 segments seg[1] 中飞荣达\"液冷板单价 1500-3000 元/套\"(Phase 5 已注入🔵broker 中泰证券)可交叉验证。",
        "sourceSegment": "核心部件(CDU/快接/管路/TIM)",
        "companies": [
          {
            "name": "飞荣达",
            "code": "300602",
            "position": "占比待核。来源:待核",
            "barrier": 3
          }
        ]
      }
    ],
    "sideBranches": [
      {
        "name": "二次侧冷却塔(风液混合)",
        "barrier": 2,
        "note": "传统商冷与暖通企业降维切入,门槛较低,竞争白热化。来源:暖通行业报告(截至 2026-06)。✅ 占比数据(Phase 8 2026-06-18 DeepSeek 智能搜索核实 + 中国制冷协会/CDCC 行业协会专项):二次侧冷却塔能耗占液冷系统总能耗 10%-20%,占数据中心制冷系统总能耗 5%-10%,占数据中心总能耗 1.2%-3.5%;变频群控可降低 30%+ 能耗🔵broker(CDCC 数据中心二次侧能耗报告 + Banyano 暖通 2026)。⚠️口径:此为能耗占比,不是价值占比,需进一步细分。",
        "sourceSegment": "液冷侧枝(冷却塔/温控芯片)",
        "companies": [
          {
            "name": "双良节能",
            "code": "600481",
            "position": "占比待核。来源:待核",
            "barrier": 2
          },
          {
            "name": "海容冷链",
            "code": "603187",
            "position": "占比待核。来源:待核",
            "barrier": 2
          }
        ]
      },
      {
        "name": "液冷温控芯片/智能控制",
        "barrier": 3,
        "note": "精细化温控与上游关键铜材供应商,辅助节点。来源:行业综述(截至 2026-06)。⚠️ 占比数据(Phase 2 2026-06-18 Gemini B 类端核实):①温控芯片/智能控制在液冷板中价值占比(%) ②液冷控制 IC 国内市场规模(亿元) 均未找到 ≥2 一手/独立来源,公开数据稀缺区,智能控制 IC 在液冷板(纯五金结构件)与 CDU 控制模块中的价值占比边界模糊无统一公允数字 → ②诚标待核 🆪estimate",
        "sourceSegment": "液冷侧枝(冷却塔/温控芯片)",
        "companies": [
          {
            "name": "博威合金",
            "code": "601137",
            "position": "铜合金部件供应商。来源:待核",
            "barrier": 3
          }
        ]
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

// ==================== 二轮注入后状态（2026-06-15）====================
//
// ★ 二轮注入完成项：
//   - prosperity.dims[6]:5 维 score 1-5（AI 主观 🆪）+ valuation score=null（查不到 PE 留空）
//   - prosperity.verdict:{longTermFit:true, oneLine, stockHint} AI 主观
//   - segments[5]:21 只个股（移除 维谛 300590 标的错误 Gemini 自查发现）,barrier 档 5/4/3/2 注入
//     dims6Note + tier + valAsOf 三个新字段补齐,硬数据全"待核"
//   - chokePoints:3 个(氟化液★★★/CDU★★★/快接头★★☆)valuation 全"待核"
//   - supplyGap:2 个(氟化液/AI 级 CDU)demand/capacity/gap/rate 全"待核"
//
// ★ 仍待 Gemini 端下一轮核实补齐：
//   - segments[].stocks[].dims6[6 维数组]——等下一轮按 4 问方法论 + 财报补
//   - overview[8]——市场规模/CAGR/缺口/政策/产业阶段 全"待核"
//   - treeMap sub-card 的 barrier/note/position——全"—（待核）"
//   - cyclePosition——stage/label/watchSignals 全"待核"
//   - fourQuestions——segments[] 空,等 4 问方法论出"卡口候选"再注
//
// ★ meta.status='skeleton' / meta.tier='待核'——保留骨架态标记,等核心硬数据补齐后再升级为"active"

})(window.CHAINS);
