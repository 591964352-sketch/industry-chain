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
    "phase": "成长期 → 扩张期",
    "label": "AI 算力驱动封装需求爆发·CoWoS 产能建设周期 18-24 月",
    "tier": "estimate",
    "note": "🆪 Phase B 补真实周期定位·当前为 AI 主观判断"
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
        "desc": "ABF/BT 载板·硅中介层·TGV 玻璃基板——先进封装的物理基础",
        "barrier": "extreme",
        "choke": true,
        "domestic": "ABF 载板国产化率~4%·深南/兴森小批量突围",
        "barrierNote": "ABF 膜 97% 依赖日本味之素——绝对卡口",
        "keyStocks": [
          {
            "name": "深南电路",
            "code": "002916",
            "note": "FC-BGA/FC-CSP 双龙头·C 类跨链"
          }
        ],
        "source": "L3 Prismark 2026·L4 券商产业链研究"
      },
      {
        "step": 2,
        "name": "封装设备",
        "desc": "键合机/临时键合/解键合·光刻·塑封·检测——先进封装的制造工具",
        "barrier": "extreme",
        "choke": true,
        "domestic": "键合设备国产化率<20%·光刻 DI 国产化率 30%",
        "barrierNote": "临时键合/解键合被 TEL/EVG 主导·芯源微国产唯一突破",
        "keyStocks": [
          {
            "name": "芯源微",
            "code": "688037",
            "note": "临时键合/解键合国产龙头·C 类跨链"
          },
          {
            "name": "文一科技",
            "code": "600520",
            "note": "12寸晶圆级塑封·⚠️验证阶段"
          }
        ],
        "source": "L3 SEMI 2025·L4 东吴证券"
      },
      {
        "step": 3,
        "name": "封装材料",
        "desc": "临时键合胶·PSPI 光刻胶·Underfill·环氧塑封料——先进封装的耗材弹药",
        "barrier": "extreme",
        "choke": true,
        "domestic": "临时键合胶国产化率<10%·PSPI 国产化率<5%",
        "barrierNote": "飞凯/德邦/鼎龙从 0 到 1 突破·但距批量替代 Brewer Science/HD Micro 仍有距离",
        "keyStocks": [
          {
            "name": "飞凯材料",
            "code": "300398",
            "note": "临时键合材料·小批量销售"
          },
          {
            "name": "艾森股份",
            "code": "688720",
            "note": "PSPI 光刻胶量产"
          }
        ],
        "source": "L3 SEMI 2025·L4 券商产业链研究"
      },
      {
        "step": 4,
        "name": "OSAT 封测代工",
        "desc": "长电科技/通富微电/华天科技——承接台积电 CoWoS 外溢订单的核心载体",
        "barrier": "high",
        "choke": false,
        "domestic": "全球 OSAT CR5≈60%·中国大陆占全球封测产能~25%",
        "barrierNote": "OSAT 环节非卡口（竞争充分）·价值集中在承接外溢订单的业绩弹性",
        "keyStocks": [
          {
            "name": "长电科技",
            "code": "600584",
            "note": "国内封测龙头·全球第三"
          },
          {
            "name": "通富微电",
            "code": "002156",
            "note": "深度绑定AMD"
          }
        ],
        "source": "L3 Prismark 2026·L4 方正证券"
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
    ]
  },
  "overview": [
    {
      "label": "全球市场规模",
      "value": "581-587 亿美元",
      "unit": "(2026E)",
      "trend": "up",
      "note": "SEMI 2025 预测·2025-2028 CAGR 10-15%",
      "tier": "broker"
    },
    {
      "label": "中国封测产能占比",
      "value": "~25%",
      "unit": "全球",
      "trend": "up",
      "note": "长电科技全球第三·通富微电全球第五·华天科技全球第六",
      "tier": "broker"
    },
    {
      "label": "CoWoS 产能缺口",
      "value": "30-40%",
      "unit": "供需缺口",
      "trend": "up",
      "note": "台积电 CoWoS 产能不足·外溢至 OSAT·缺口预计延续至 2027 年",
      "tier": "broker"
    },
    {
      "label": "封装设备国产化率",
      "value": "<20%",
      "unit": "键合/解键合",
      "trend": "flat",
      "note": "临时键合 TEL/EVG 主导·芯源微国产唯一突破·塑封设备文一科技验证中",
      "tier": "broker"
    },
    {
      "label": "封装材料国产化率",
      "value": "<15%",
      "unit": "键合胶/PSPI",
      "trend": "flat",
      "note": "临时键合胶 Brewer Science 主导·PSPI HD Micro 主导·飞凯/艾森从 0 到 1",
      "tier": "broker"
    },
    {
      "label": "ABF 载板国产化率",
      "value": "~4%",
      "unit": "依赖进口",
      "trend": "flat",
      "note": "ABF 膜 97% 依赖日本味之素·深南/兴森 FC-BGA 小批量验证中",
      "tier": "broker"
    },
    {
      "label": "下游需求 CAGR",
      "value": "20-25%",
      "unit": "(2025-2028)",
      "trend": "up",
      "note": "AI/HPC 芯片封装需求爆发·单颗 GPU CoWoS 封装价值量 30-40% 芯片总成本",
      "tier": "broker"
    },
    {
      "label": "产业链评级",
      "value": "🆪 AI 预评",
      "unit": "Phase B 补",
      "trend": "flat",
      "note": "产业链整体评分 78/100·强劲景气·OSAT 环节非卡口（竞争充分）·上游设备/材料才是物理卡口",
      "tier": "estimate"
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
        "barrier": "extreme",
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
        "barrier": "extreme",
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
        "barrier": "high",
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
          "logic": "国内封测绝对龙头·全球第三·XDFOI Chiplet 平台已实现 4nm 芯粒集成量产。英伟达 CoWoS 产能缺口背景下，台积电将部分 CoWoS 封装外包给长电科技，公司 78 亿上海临港高端工厂专为承接外溢订单而建。"
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
          "logic": "全球唯一同时覆盖 AMD CPU/GPU 全系先进封装的中国 OSAT。AMD MI300 系列采用 CoWoS 封装，通富微电作为独家封测供应商直接受益。先进封装收入占比约 70%，客户高度集中（既是壁垒也是风险）。"
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
          "logic": "eSiFO 扇出封装差异化路线·避开与长电/通富在 CoWoS 赛道的直接竞争。2026Q1 净利暴增 568%，南京基地先进封装产线已批量交付，高弹性增长但体量仍显著小于长电和通富。"
        }
      ]
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
          "logic": "高弹性先进封装新星·124 亿大手笔投资 2.5D 堆叠和系统级封装。CoWoS-L 产能爬坡中，体量和客户验证阶段显著早于 OSAT 三巨头——属于'期权型'标的：成功则弹性格巨大，失败则 124 亿投资回报存疑。"
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
          "logic": "车载 CIS 晶圆级封装龙头·TSV/异质集成/3D 堆叠能力完备。需注意：聚焦车载+安防 CIS 图像传感器封装，与前三家面向的英伟达/AMD AI 芯片市场完全不同——不能因为同在'先进封装'赛道就将其与长电/通富的 AI 封装需求增速等同。"
        }
      ]
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
          "logic": "C 类跨链复用（已在 semicon-equip 链有完整 dims6）·临时键合/解键合国产龙头，已通过多家客户验证进入放量阶段。在先进封装语境下，临时键合是 CoWoS/HBM 堆叠工艺的必选设备——芯源微是目前 A 股唯一兑现的标的。"
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
          "logic": "C 类跨链复用（已在 PCB 链有完整 dims6）·先进封装直写光刻 DI 设备龙头，受益于扇出面板级封装 FOPLP 和 TGV 玻璃基板两大新趋势。"
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
          "logic": "12 寸晶圆级塑封设备，样机已交付华为-盛合晶微试用。⚠️ Phase B 打分前强制核实：(1)L1 公告是否有客户订单金额/批量供货合同？(2)塑封设备营收贡献占比？(3)盛合晶微之外是否有第二家验证客户？参照长光华芯'CW 100mW 仍在验证中'处理方式——durability/visibility 严格按实际商业化进展评定，不得因'稀缺标的'概念性描述偏高。"
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
          "logic": "C 类跨链复用（已在存储与接口链）·先进封装 TCB 热压键合设备取得重大突破，但商业化阶段仍需进一步验证。"
        }
      ]
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
          "logic": "临时键合材料国产龙头·全球 BGA/CSP 锡球领导厂商。临时键合胶国产化率<10%，飞凯是国产替代的先行者——已实现小批量销售，逐步推进放量。需注意：从'小批量'到'规模替代 Brewer Science'仍有距离。"
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
          "logic": "先进封装负性光刻胶+PSPI（光敏聚酰亚胺）量产，是 A 股 PSPI 国产替代的核心标的。机构调研 330+次，市场关注度极高。PSPI 国产化率<5%，替代空间巨大但需时间验证。"
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
          "logic": "国内唯一打通 TGV 激光打孔-填铜-RDL 布线全流程量产的企业。TGV 玻璃基板是硅中介层的下一代替代方案（Intel/三星已宣布采用），沃格光电在这个新兴赛道占据先发优势。但需注意：TGV 方案仍处于产业导入期，大规模商业化时间线不确定。"
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
          "logic": "超高纯溅射靶材国产替代龙头·TSV（硅通孔）薄膜沉积工艺的刚需耗材。先进封装 TSV 用量随 HBM 堆叠层数增加而线性增长，江丰电子作为国内靶材龙头直接受益。"
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
          "logic": "C 类跨链复用（已在存储与接口链）·IC 封装材料平台型公司，CDAF（芯片贴装膜）国内首家量产，同时布局 Underfill/TIM 等先进封装关键材料。"
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
          "logic": "C 类跨链复用（已在存储与接口链）·PSPI 光敏聚酰亚胺国产唯一供应商，同时覆盖 CMP 抛光液（适配 TGV 玻璃基板）和临时键合胶，是 A 股先进封装材料布局最广的标的之一。"
        }
      ]
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
          "logic": "C 类跨链复用（已在 PCB 链有完整 dims6 和 chokePoint 评估）·FC-BGA/FC-CSP 封装基板双龙头，是 ABF 载板国产替代的核心标的。需注意：ABF 膜 97% 仍依赖日本味之素——载板环节的真正的物理卡口在上游 ABF 膜材料，不在载板制造。"
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
          "logic": "C 类跨链复用（已在 PCB 链有完整 dims6）·FC-BGA 封装基板国产突围者，已实现小批量出货。与深南电路同属 ABF 载板国产替代赛道，但体量和客户验证进度落后于深南。"
        }
      ]
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
        "note": "英伟达/华为昇腾/SK海力士 CoWoS 外溢订单承接方·上海临港 78 亿高端工厂"
      },
      {
        "name": "通富微电",
        "code": "002156",
        "position": "深度绑定 AMD·70% 高端 CPU/GPU 封测独家",
        "barrier": "极高",
        "tier": "L4",
        "note": "AMD MI300 系列 CoWoS 封装独家供应商·2026Q1 净利+224%"
      },
      {
        "name": "华天科技",
        "code": "002185",
        "position": "eSiFO 扇出/TSV·高弹性追赶型",
        "barrier": "高",
        "tier": "L4",
        "note": "2026Q1 净利+568%·南京基地先进封装产线·体量小于长电/通富"
      },
      {
        "name": "甬矽电子",
        "code": "688362",
        "position": "2.5D 堆叠新星·124 亿投资·CoWoS-L 爬坡",
        "barrier": "中",
        "tier": "L4",
        "note": "高弹性但客户验证阶段早·期权型标的"
      },
      {
        "name": "晶方科技",
        "code": "603005",
        "position": "车载 CIS 晶圆级封装龙头·非 AI 赛道",
        "barrier": "中",
        "tier": "L4",
        "note": "聚焦车载+安防 CIS·与 AI 芯片封装市场增速不同步"
      },
      {
        "name": "芯源微",
        "code": "688037",
        "position": "临时键合/解键合国产龙头·C 类跨链",
        "barrier": "极高",
        "tier": "C",
        "note": "已批量出货台积电/长电/华天·先进封装必选设备"
      },
      {
        "name": "文一科技",
        "code": "600520",
        "position": "12寸晶圆级塑封设备·⚠️验证阶段",
        "barrier": "中",
        "tier": "L4",
        "note": "样机交付华为-盛合晶微·Phase B 强制核实商业化进展"
      },
      {
        "name": "飞凯材料",
        "code": "300398",
        "position": "临时键合材料国产龙头",
        "barrier": "高",
        "tier": "L4",
        "note": "小批量销售·从 0 到 1 突破关键期"
      },
      {
        "name": "艾森股份",
        "code": "688720",
        "position": "PSPI 光刻胶量产·机构高关注",
        "barrier": "高",
        "tier": "L4",
        "note": "PSPI 国产化率<5%·替代空间大"
      },
      {
        "name": "沃格光电",
        "code": "603773",
        "position": "TGV 玻璃基板全流程量产·国内唯一",
        "barrier": "中",
        "tier": "L4",
        "note": "下一代中介层方案·产业导入期"
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
            "hits": 3,
            "strength": "★★☆"
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
            "strength": "★★☆"
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
            "strength": "★☆☆"
          }
        ]
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
            "strength": null
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
            "hits": 0,
            "strength": null
          }
        ]
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
            "hits": 3,
            "strength": "★★☆"
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
            "hits": 3,
            "strength": "★★☆"
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
            "hits": 2,
            "strength": "★☆☆"
          }
        ]
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
            "hits": 3,
            "strength": "★★☆"
          }
        ]
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
      "chokePointType": "physical",
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
      "strengthNote": "★★★保留:临时键合/解键合为 CoWoS/HBM 必选设备·全球仅三家可批量供货·国产唯一"
    },
    {
      "code": "002916",
      "name": "深南电路",
      "strength": "★★★",
      "moatScore": 75,
      "timingScore": 45,
      "chokePointType": "physical",
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
      "strengthNote": "★★★保留:FC-BGA 载板国产唯一·但需注意真卡口在 ABF 膜(味之素)"
    }
  ],
  "supplyGap": [
    {
      "name": "CoWoS 封装产能",
      "costRatio": "30-40%",
      "gap": "30-40% 缺口",
      "barrier": "extreme",
      "desc": "台积电 CoWoS 产能不足→外溢至 OSAT·缺口预计延续至 2027 年(SEMI 2025)",
      "companies": [
        {
          "name": "长电科技",
          "code": "600584"
        },
        {
          "name": "通富微电",
          "code": "002156"
        }
      ]
    },
    {
      "name": "临时键合/解键合设备",
      "costRatio": "5-8%",
      "gap": "国产化率<20%",
      "barrier": "extreme",
      "desc": "TEL/EVG 双寡头主导·芯源微国产唯一突破·已批量出货",
      "companies": [
        {
          "name": "芯源微",
          "code": "688037"
        }
      ]
    },
    {
      "name": "ABF 载板",
      "costRatio": "8-12%",
      "gap": "国产化率~4%",
      "barrier": "extreme",
      "desc": "ABF 膜 97% 依赖日本味之素——绝对物理卡口·深南/兴森 FC-BGA 小批量验证中",
      "companies": [
        {
          "name": "深南电路",
          "code": "002916"
        },
        {
          "name": "兴森科技",
          "code": "002436"
        }
      ]
    },
    {
      "name": "临时键合胶",
      "costRatio": "2-3%",
      "gap": "国产化率<10%",
      "barrier": "extreme",
      "desc": "Brewer Science 主导·飞凯材料小批量销售·鼎龙股份已有客户稳定出货",
      "companies": [
        {
          "name": "飞凯材料",
          "code": "300398"
        },
        {
          "name": "鼎龙股份",
          "code": "300054"
        }
      ]
    },
    {
      "name": "PSPI 光刻胶",
      "costRatio": "1-2%",
      "gap": "国产化率<5%",
      "barrier": "extreme",
      "desc": "HD Micro 主导·艾森股份+强力新材国产突破·PSPI 为 TSV 工艺必需材料",
      "companies": [
        {
          "name": "艾森股份",
          "code": "688720"
        },
        {
          "name": "鼎龙股份",
          "code": "300054"
        }
      ]
    }
  ],
  "methodologyNotes": "先进封装产业链采用 Serenity 物理卡口（Choke Point）方法论。核心判断：① OSAT 封测代工环节竞争充分（全球 CR5≈60%），非物理卡口——价值在承接台积电 CoWoS 外溢订单的业绩弹性，而非护城河壁垒；② 真正的物理卡口在上游——封装设备（键合机/临时键合/解键合·国产化率<20%）和封装材料（键合胶/PSPI/ABF 膜·国产化率<15%）；③ 本链 10 只新标的 Phase A 骨架阶段 dims6 为占位符，Phase B 补真实六维数据（abstract_ths L1 实测+豆包 prompt v3+黑名单核实）；④ 7 只 C 类跨链复用标的从 semicon-equip/PCB/storage-interface 链引用已有 dims6 数据，在先进封装语境下需调整 reason 的行业背景描述（score 不变）。"
};
})(window.CHAINS);
