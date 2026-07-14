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
        "reason": "(Phase B 补)",
        "evidence": "",
        "flag": "🆪",
        "tier": "estimate",
        "src": ""
      },
      {
        "key": "visibility",
        "name": "业绩可见度",
        "score": 4,
        "trend": "up",
        "reason": "(Phase B 补)",
        "evidence": "",
        "flag": "🆪",
        "tier": "estimate",
        "src": ""
      },
      {
        "key": "policy",
        "name": "政策确定性",
        "score": 4,
        "trend": "up",
        "reason": "(Phase B 补)",
        "evidence": "",
        "flag": "🆪",
        "tier": "estimate",
        "src": ""
      },
      {
        "key": "supply",
        "name": "供需紧张度",
        "score": 4,
        "trend": "up",
        "reason": "(Phase B 补)",
        "evidence": "",
        "flag": "🆪",
        "tier": "estimate",
        "src": ""
      },
      {
        "key": "valuation",
        "name": "估值性价比",
        "score": 2,
        "trend": "down",
        "reason": "(Phase B 补)",
        "evidence": "",
        "flag": "🆪",
        "tier": "estimate",
        "src": ""
      },
      {
        "key": "barrier",
        "name": "壁垒安全垫",
        "score": 4,
        "trend": "flat",
        "reason": "(Phase B 补)",
        "evidence": "",
        "flag": "🆪",
        "tier": "estimate",
        "src": ""
      }
    ],
    "verdict": {
      "longTermFit": "(Phase B 补)",
      "oneLine": "💾 存储与接口是AI算力基础设施的核心瓶颈——HBM高带宽存储、DDR5主控、CXL内存池化、PCIe/CXL高速接口芯片共同构成数据从存储到计算的完整通路",
      "stockHint": "(Phase B 补)"
    }
  },
  "cyclePosition": {
    "stage": "boom",
    "label": "繁荣期(2025-2030 AI存储升级周期)",
    "reason": "(Phase B 补)",
    "watchSignals": [
      "(Phase B 补)"
    ]
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
    "highlightBox": "<strong>(Phase B 补)</strong>"
  },
  "overview": [
    {
      "label": "(Phase B 补)",
      "value": "—",
      "note": "Phase B 补"
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
        "choke": true,
        "note": "PCIe 5.0仅3家量产｜澜起科技(688008)PCIe 5.0 Retimer全球第二·营收占比7-11%·主场seg[2] DDR5 RCD·仅做赛道展示",
        "companies": [
          {
            "name": "澜起科技",
            "code": "688008",
            "position": "PCIe 5.0 Retimer国内唯一·全球第二",
            "barrier": "极高"
          },
          {
            "name": "龙迅股份",
            "code": "688486",
            "position": "Redriver/Retimer",
            "barrier": "高"
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
          }
        ]
      },
      {
        "name": "测试分选/老化",
        "barrier": "高",
        "choke": false,
        "note": "后道测试设备",
        "companies": [
          {
            "name": "华峰测控",
            "code": "688200",
            "position": "模拟测试机国产第一",
            "barrier": "高"
          },
          {
            "name": "长川科技",
            "code": "300604",
            "position": "数字测试机国产第一",
            "barrier": "高"
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
          "lbl": "(Phase B 补)",
          "val": "—",
          "note": "—"
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)",
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 3,
          "name": "中微公司",
          "code": "688012",
          "position": "CCP刻蚀国产第一·5nm已批量进台积电",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 4,
          "name": "华海清科",
          "code": "688120",
          "position": "CMP国产第一·12寸批量供货中芯/长江存储",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 5,
          "name": "快克智能",
          "code": "603203",
          "position": "TCB热压键合设备",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 6,
          "name": "赛腾股份",
          "code": "603283",
          "position": "半导体检测分选设备",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
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
          "lbl": "(Phase B 补)",
          "val": "—",
          "note": "—"
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)",
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 3,
          "name": "联瑞新材",
          "code": "688300",
          "position": "硅微粉国产第一·HBM封装关键填料",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 4,
          "name": "雅克科技",
          "code": "002409",
          "position": "前驱体材料国产替代·HBM配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 5,
          "name": "安集科技",
          "code": "688019",
          "position": "CMP抛光液国产第一·HBM铜互联抛光",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 6,
          "name": "鼎龙股份",
          "code": "300054",
          "position": "CMP抛光垫国产第一·先进封装配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
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
          "trendNote": "★ Phase B 第二批试点写入(akshare abstract_ths L1)",
          "logic": "按 §6.16 dims6Audit 优化:本链 HBM/存储接口语境,光刻胶+前驱体材料与 seg[1] HBM 封装材料 强相关;六维 score 经抽象_ths L1 财务实测验证,详见 stock.dims6",
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
          "trendNote": "★ Phase B 第二批试点写入(akshare abstract_ths L1)",
          "logic": "按 §6.16 dims6Audit 优化:本链 HBM/存储接口语境,电子特气(HBM/DRAM 制造关键耗材)与 seg[1] HBM 封装材料 直接相关;六维 score 经抽象_ths L1 财务实测验证,详见 stock.dims6",
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
          "lbl": "(Phase B 补)",
          "val": "—",
          "note": "—"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "澜起科技",
          "code": "688008",
          "position": "DDR5 RCD全球双寡头(与Rambus)·国内唯一·市占~40%",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)",
          "scoringStatus": "primary",
          "phaseBTestTrial": true
        },
        {
          "rank": 2,
          "name": "聚辰股份",
          "code": "688123",
          "position": "SPD Hub温度传感器·DDR5配套芯片",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 3,
          "name": "兆易创新",
          "code": "603986",
          "position": "NOR Flash+DDR3/4 DRAM·存储主控布局",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 4,
          "name": "普冉股份",
          "code": "688766",
          "position": "NOR Flash+EEPROM·存储芯片设计",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
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
          "lbl": "(Phase B 补)",
          "val": "—",
          "note": "—"
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)",
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
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        }
      ]
    },
    {
      "name": "PCIe Retimer/Redriver 接口",
      "costRatio": "—",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>PCIe Retimer</strong>是高速信号长距离传输后恢复完整性的关键芯片。PCIe 5.0/6.0速率翻倍后，Retimer成为AI服务器主板必备芯片。全球仅澜起科技+Astera Labs(美)+Parade(台)三家量产PCIe 5.0 Retimer。",
      "globalLandscape": [
        {
          "lbl": "(Phase B 补)",
          "val": "—",
          "note": "—"
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)",
          "scoringStatus": "reference",
          "phaseBTestTrial": true
        },
        {
          "rank": 2,
          "name": "龙迅股份",
          "code": "688486",
          "position": "高速信号Redriver/Retimer·消费+汽车",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 3,
          "name": "裕太微",
          "code": "688515",
          "position": "高速SerDes PHY·以太网+PCIe物理层",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 4,
          "name": "纳芯微",
          "code": "688052",
          "position": "信号链+接口芯片·汽车+工业",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
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
          "lbl": "(Phase B 补)",
          "val": "—",
          "note": "—"
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
          "src": "(Phase B 补)",
          "trend": "up",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        },
        {
          "rank": 4,
          "name": "景嘉微",
          "code": "300474",
          "position": "GPU Chiplet方案·国产GPU互连",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-12",
          "src": "(Phase B 补)",
          "trend": "flat",
          "trendNote": "(Phase B 补)",
          "logic": "(Phase B 补)",
          "dims6Note": "(Phase B 补)"
        }
      ]
    }
  ],
  "midstream": {
    "description": "(Phase B 补)",
    "stocks": [
      {
        "name": "澜起科技",
        "code": "688008",
        "position": "DDR5 RCD全球双寡头(与Rambus)·国内唯一·市占~40%",
        "barrier": "极高",
        "trend": "up",
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
        "rank": 1,
        "fourQuestions": {
          "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
          "segments": []
        },
        "chokePoints": [
          {
            "rank": 1,
            "name": "澜起科技",
            "code": "688008",
            "segment": "DDR5 主控与 RCD",
            "strength": "★★★",
            "logic": "(Phase B 补)",
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
              "src": "(Phase B 补)"
            },
            "verification": {
              "items": [],
              "note": "(Phase B 补)"
            },
            "chokepointType": "(Phase B 补)",
            "barrier": "DDR5 RCD全球双寡头(与Rambus)·国内唯一·市占~40%"
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
            "asOf": "2026-07-12"
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
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
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
            "logic": "(Phase B 补)",
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
              "src": "(Phase B 补)"
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
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
            "logic": "(Phase B 补)",
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
              "src": "(Phase B 补)"
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
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
            "logic": "(Phase B 补)",
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
              "src": "(Phase B 补)"
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
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
            "logic": "(Phase B 补)",
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
              "src": "(Phase B 补)"
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
        "trendNote": "(Phase B 补)",
        "logic": "(Phase B 补)",
        "dims6Note": "(Phase B 补)",
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
            "logic": "(Phase B 补)",
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
              "src": "(Phase B 补)"
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
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
            "src": "(Phase B 补)",
            "asOf": "2026-07-12"
          }
        ],
        "methodologyNotes": "(Phase B 补)"
      }
    ]
  },
  "fourQuestions": {
    "_note": "四问筛选数据待 Phase B+ 投顾设计 + CC 核实后填入",
    "segments": []
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
        "note": "🆪 估值草案·Phase 2 待 PE 实测校准(L1 abstract_ths 财务已审验,缺 PE-TTM/历史分位数据)\n\n📊 L1 基本面(abstract_ths 实测):2025全年营收 25.04亿(+36.47%)/净利 7.84亿(+46.85%)/毛利率 56.72%/ROE 25.18%。2026Q1 营收 7.24亿(+34.8%)/净利 2.08亿(+40.7%)——业绩持续高增长\n\n📊 Forward PE 近似参考:2026E EPS=14.43元→Forward PE~72x / 2027E EPS=18.45元→Forward PE~56x\n\n⚠ 估值核心矛盾:ROE/GM 双高+业绩持续 30%+高增+赛道稀缺性溢价,但 Forward PE~72x 已显著高于半导体材料行业均值。⏳ TTM PE 及 5年 PE 分位待人工补充\n\n⚠ L3/L4 卡口来源待补:目前仅依靠 L1 abstract_ths 财务 + L4 头部券商研报行业评论(无全球 CMP 抛光液厂商格局报告)。建议补充 Cabot Microelectronics/Versum/Merck 三家全球 CMP 抛光液龙头 2025 市占率报告以验证全球≤3家物理卡口地位",
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
            "type": "全球卡口地位(待 L3 补)",
            "claim": "CMP 抛光液国产第一 + 行业卡口地位需全球厂商格局报告验证(Cabot Microelectronics/Versum/Merck 三家)",
            "howToCheck": "查 Cabot/Versum/Merck 2024/2025 全球 CMP 抛光液市场份额报告 + TecChem 2026 全球 CMP 抛光液供需专题",
            "falsifySignal": "全球 CMP 抛光液供给端有 ≥4 家可量产 + 国产厂商市占 <40% → 卡口地位下调",
            "status": "pending-L3"
          },
          {
            "type": "交叉信源",
            "claim": "至少 ≥2 个独立来源印证国产第一龙头地位",
            "howToCheck": "一篇券商 CMP 抛光液行业深度研报 +一篇公司公告/调研纪要 同时印证",
            "falsifySignal": "只找得到单一来源 → 存疑",
            "status": "pending"
          }
        ],
        "note": "基于 L1 abstract_ths 688019 实测(2026-07-14)+ L4 头部券商研报(行业评论)+ 本链 Phase B 第二批独立打分·R6 候选纳入·barrier=5(极高)+moat=94 全链最高·strength=★★★"
      },
      "strengthNote": "2026-07-14 6.92 立:本链首次入选 chokePoints 的 Phase B 第二批独立评估股票(A类,非跨链复用). barrier=5 来自 L1 abstract_ths 财务时序+L4 头部券商研报行业共识(§11.23 数据局限已记录,本链 L3 全球 CMP 抛光液厂商格局报告待补). moat=94 来自 storage-interface 链 5 维权重(durability 0.25 + barrier 0.25 + visibility 0.20 + supply 0.20 + policy 0.10)×100 公式反推. 本链 seg[1] HBM 封装材料 语境下,与 HBM 介质层抛光精度强相关. risk 门控:无(barrier=5+moat≥60)."
    }
  ],
  "supplyGap": [
    {
      "segment": "HBM 产能缺口",
      "demand": "—",
      "capacity": "—",
      "gap": "—",
      "rate": "—",
      "bottleneck": "(Phase B 补)",
      "tier": "estimate",
      "src": "(Phase B 补)",
      "asOf": "2026-07-12"
    },
    {
      "segment": "DDR5 RCD 国产化",
      "demand": "—",
      "capacity": "—",
      "gap": "—",
      "rate": "—",
      "bottleneck": "(Phase B 补)",
      "tier": "estimate",
      "src": "(Phase B 补)",
      "asOf": "2026-07-12"
    },
    {
      "segment": "CXL/PCIe 接口芯片",
      "demand": "—",
      "capacity": "—",
      "gap": "—",
      "rate": "—",
      "bottleneck": "(Phase B 补)",
      "tier": "estimate",
      "src": "(Phase B 补)",
      "asOf": "2026-07-12"
    },
    {
      "segment": "GMC 塑封料供给",
      "demand": "—",
      "capacity": "—",
      "gap": "—",
      "rate": "—",
      "bottleneck": "(Phase B 补)",
      "tier": "estimate",
      "src": "(Phase B 补)",
      "asOf": "2026-07-12"
    }
  ],
  "methodologyNotes": "(Phase B 补)"
};
})(window.CHAINS);
