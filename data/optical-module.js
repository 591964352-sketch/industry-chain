// data/optical-module.js — 光模块·光互联合并链 auto 估值层
// 2026-07-16更新:华工科技归属修正(seg[4]→seg[2])+重打分+demandChainMeta+treeMap调整
window.CHAINS = window.CHAINS || {};
(function(CHAINS){

CHAINS["optical-module"] = {
  "id": "optical-module",
  "name": "光模块·光互联",
  "icon": "🔦",
  "meta": {
    "sector": "中游",
    "tier": "核心",
    "status": "partial-P2-合并完成(41 stocks × 6 segments · 3 链已合并 · stage 2 commit 6.70 期)",
    "updatedAt": "2026-07-10",
    "ltFit": null,
    "dataVersion": "optical-module.auto@2026-07-10.P2-merge.v1"
  },
  "prosperity": {
    "dims": [
      {
        "key": "durability",
        "name": "景气持续性",
        "score": 4,
        "trend": "up",
        "reason": "AI 算力结构性需求(英伟达 Rubin/GB300 上调 1.6T 至 2000 万只) + 全球数据中心资本开支释放 + CPO 量产临界 + 硅光渗透率 40-75% → 评分 4"
      },
      {
        "key": "visibility",
        "name": "业绩可见度",
        "score": 3,
        "trend": "up",
        "tier": "estimate",
        "reason": "中际旭创 Q1 营收 195 亿+192%/净利 57 亿+262% + 源杰 Q1 营收+321% 净利+1153% + 剑桥 LPO 领先 → 但估值字段本机不可用(baostock q_history_k_data_plus 全失败),待 PE/PB 实盘恢复后分数可上修 → 3"
      },
      {
        "key": "policy",
        "name": "政策确定性",
        "score": 4,
        "trend": "up",
        "tier": "L2",
        "reason": "大基金 02/03 专项支持光芯片/光器件国产替代 + 工信部光通信产业基础再造专项 + 东数西算 8 大枢纽持续 → 评分 4"
      },
      {
        "key": "supply",
        "name": "供需紧张度",
        "score": 4,
        "trend": "up",
        "tier": "L3",
        "reason": "CW 100mW 激光器全球 <5 家(源杰/长光华芯/Lumentum/II-VI/住友),扩产 ≥12 月 + 100mW 仅支持 900 万支 1.6T → 英伟达 1.6T 2000 万只 → 缺口 >50%。硅光代工台积电 COUPE 独供 → 结构性紧张 → 4"
      },
      {
        "key": "valuation",
        "name": "估值性价比",
        "score": 2,
        "trend": "flat",
        "tier": "estimate",
        "reason": "估值理由本批次不可用:baostock q_history_k_data_plus + akshare stock_individual_spot_xq / stock_financial_analysis_indicator_em 全部返回空 · 替代指标:营收同比 +36.62% / 净利 +30.69%(光模块口径,集合) → 整体高估值但有订单可见性 → 2 · 待 §10 景气度调整系数 + PE/PB 实盘接口恢复后重新核算"
      },
      {
        "key": "barrier",
        "name": "壁垒安全垫",
        "score": 4,
        "trend": "up",
        "tier": "L3+L4",
        "reason": "CW 100mW 激光器 + 硅光 PIC 代工(台积电 COUPE) + TFLN 调制器均全球≤3 家可量产 + 认证周期 ≥18 月 · 光模块整链制造竞争充分(10+ 家) → 4"
      }
    ],
    "verdict": {
      "longTermFit": "光模块·光互联长期看多(2025-2030 AI 算力主线上游+硅光替代+ CPO 量产临界)· 短期 PE/PB 实盘接口不可用 → 估值字段全部降级 estimate 等恢复",
      "oneLine": "🔦 光模块·光互联 = AI 算力主干(800G/1.6T)+ CPO 临界量产 + 硅光替代 · 长线胜率高,短期受估值数据缺失影响"
    }
  },
  "cyclePosition": {
    "stage": "boom",
    "label": "繁荣期早段(2025-2030 AI 算力主升浪)",
    "reason": "英伟达 1.6T 上调至 2000 万只 · 谷歌 TPU + 华为昇腾 CPO 推进 · 硅光渗透率 40-75% 拐点 · 大基金 03 专项 2024-2028 累计投入 3440 亿",
    "watchSignals": [
      "英伟达 BlackWell / Rubin 出货节奏(2026 H2 关键)",
      "1.6T CPO 量产价格/良率(源杰 CW + 中际旭创 CPO 模块)",
      "CPO 三大寡头(Intel/台积电/英伟达)研发投入与产品迭代"
    ]
  },
  "plainIntro": {
    "analogy": "光模块 = AI 数据中心的血管 · 光芯片 = 心脏",
    "paragraphs": [
      "光模块(Optical Module)是 AI 数据中心的血管——GPU 之间的数据交换靠光纤传输(电信号 → 激光器 → 光纤 → 探测器 → 电信号)。800G 是 2024 主流,1.6T 是 2025-2026 主流,3.2T 2027 起步。CPO(共封装光学)让光模块从可插拔 USB 进化成芯片上就有的光纤接口,功耗降 30-50%,延迟降 10 倍。",
      "为什么说光芯片是心脏?光芯片(DFB/EML/CW/PD/APD/SPAD)决定光模块的光源品质(100mW CW 决定 1.6T 模块传输距离,SPAD 决定 LiDAR 灵敏度)。CW 100mW 激光器全球 <5 家供应,产能扩产 12 月+ · 硅光 PIC 代工被台积电 COUPE 主导(类似 EUV 在半导体制造)。",
      "合并链的意义:本链将原 3 条独立链(光模块/光芯片/CPO)合并。41 unique stocks · 6 segments(光芯片/硅光 PIC/光器件+模块整链/CPO/测试设备/侧枝应用) · 命名统一 光模块·光互联 · 物理卡口:全球≤5 家供应 100mW CW · 全行业最高集中度。"
    ],
    "flowSteps": [
      "CW 100mW 激光器(全球<5 家)",
      "硅光 PIC 芯片(台积电 COUPE 代工)",
      "调制器/波分复用器/光器件",
      "光模块整链 800G/1.6T",
      "英伟达/谷歌/华为昇腾 部署",
      "数据中心/电信/CPO 落地"
    ],
    "highlightBox": "💡 物理卡口 视角:① CW 100mW 激光器:全球 <5 家(源杰/长光华芯/Lumentum/住友)· 扩产 12 月+ · 缺口>50% ② 硅光 PIC 代工:台积电 COUPE 独供,A 股无直接代工标的 ③ SPAD 单光子探测器:国产空白 ④ TFLN 调制器:光库科技国产稀缺 1-2 家 · 中际旭创全球光模块第一,竞争充分(10+ 家)非核心寡头"
  },
  "overview": [
    {
      "label": "🔦 全球光模块市场(2026)",
      "value": "~$220 亿",
      "note": "+25% YoY · 1.6T 占比>30%",
      "color": "var(--accent)"
    },
    {
      "label": "🤖 英伟达 1.6T 采购",
      "value": "2,000 万只",
      "note": "2026 全年 · Q4 落地 3.2T",
      "color": "var(--green)"
    },
    {
      "label": "🇨🇳 CPO 市场(2030E)",
      "value": "~$100 亿",
      "note": "CAGR>70% · Spectrum-X 量产",
      "color": "var(--red)"
    },
    {
      "label": "🏭 行业阶段",
      "value": "导入→放量",
      "note": "800G/1.6T 主流 · 硅光渗透拐点",
      "color": null
    },
    {
      "label": "📐 中际旭创 Q1",
      "value": "营收 195 亿+192%",
      "note": "净利 57.35 亿+262% · 全球光模块第一",
      "color": "var(--blue)"
    },
    {
      "label": "⚡ CW 缺口率",
      "value": ">50%",
      "note": "100mW 仅 5 家供应 · 缺口巨大",
      "color": "var(--red)"
    },
    {
      "label": "🔴 核心矛盾",
      "value": "CW 激光器产能不足",
      "note": "支撑 1.6T/3.2T 放量但卡产能",
      "color": "var(--red)"
    },
    {
      "label": "📋 硅光渗透率(2026E)",
      "value": "40-75%",
      "note": "800G/1.6T 主流方案从 EML→硅光",
      "color": "var(--green)"
    }
  ],
  "treeMap": {
    "downstream": [
      {
        "name": "AI 数据中心(800G/1.6T/3.2T 标配)",
        "barrier": "extreme",
        "note": "英伟达 Rubin/Blackwell · 谷歌 TPU · 华为昇腾 · CUDA/TF 生态",
        "companies": [],
        "sourceSegment": "侧枝应用(5G 电信 · 数据中心)"
      },
      {
        "name": "5G 电信(CPO/光模块)",
        "barrier": "mid",
        "note": "烽火通信 · 中兴通讯(方案 B 由 seg3 移入)· 三大运营商 5G 基站",
        "companies": [
          {
            "code": "600498",
            "name": "烽火通信"
          },
          {
            "code": "000063",
            "name": "中兴通讯"
          }
        ],
        "sourceSegment": "侧枝应用(5G 电信 · 数据中心)"
      },
      {
        "name": "数据中心 · 企业级光网络应用",
        "barrier": "—",
        "note": "本分类原含 AI 服务器 PCB 配套 + 整机 ODM 引用, 已按 storage-interface 方案 B 处理思路清理(2026-07-13)",
        "companies": [],
        "sourceSegment": "侧枝应用(5G 电信 · 数据中心)",
        "choke": false
      }
    ],
    "midstream": [
      {
        "name": "光器件 + 模块整链 800G/1.6T",
        "barrier": "high",
        "note": "中际旭创领跑全球 + 新易盛 LPO 领先 + 光迅/剑桥/联特/铭普·光器件 FA/MPO 由天孚/博创/太辰光+中瓷电子配套",
        "companies": [
          {
            "code": "300308",
            "name": "中际旭创"
          },
          {
            "code": "300502",
            "name": "新易盛"
          },
          {
            "code": "603083",
            "name": "剑桥科技"
          },
          {
            "code": "301205",
            "name": "联特科技"
          },
          {
            "code": "300394",
            "name": "天孚通信"
          },
          {
            "code": "300548",
            "name": "长芯博创"
          },
          {
            "code": "300570",
            "name": "太辰光"
          },
          {
            "code": "003031",
            "name": "中瓷电子"
          }
        ],
        "sourceSegment": "光器件 + 光模块整链制造"
      },
      {
        "name": "800G 硅光+CPO (华工正源)",
        "barrier": "high",
        "note": "华工正源光子·800G硅光全球第二大供应商(市占18-20%)·3.2T CPO全球首发量产·全栈自研硅光芯片·英伟达/Meta/微软/亚马逊供应链",
        "companies": [
          {
            "code": "000988",
            "name": "华工科技"
          }
        ],
        "sourceSegment": "光器件 + 光模块整链制造",
        "choke": false
      }
    ],
    "materials": [
      {
        "name": "InP 衬底(外延片)",
        "barrier": "extreme",
        "note": "CPO 时代核心材料·MOCVD 生长·全球 InP 衬底供应<5 家·三安/云南锗业/有研/天通布局中",
        "companies": [
          {
            "code": "600703",
            "name": "三安光电"
          },
          {
            "code": "600206",
            "name": "有研新材"
          }
        ],
        "sourceSegment": "硅光 PIC + 调制材料"
      },
      {
        "name": "TFLN 调制器(薄膜铌酸锂)",
        "barrier": "extreme",
        "note": "光库科技国产稀缺 1-2 家·光迅/索尔思(美)海外主导",
        "companies": [
          {
            "code": "300620",
            "name": "光库科技"
          }
        ],
        "sourceSegment": "硅光 PIC + 调制材料"
      },
      {
        "name": "光学石英(光芯片衬底基础材料)",
        "barrier": "high",
        "note": "菲利华国产龙头 + 欧晶科技·石英材料全球 <5 家",
        "companies": [],
        "sourceSegment": "硅光 PIC + 调制材料"
      },
      {
        "name": "硅光 PIC 设计+代工/材料",
        "barrier": "extreme",
        "note": "光迅/仕佳/罗博特科/赛微/腾景·台积电 COUPE 代工",
        "companies": [
          {
            "code": "002281",
            "name": "光迅科技"
          },
          {
            "code": "688313",
            "name": "仕佳光子"
          },
          {
            "code": "300757",
            "name": "罗博特科"
          },
          {
            "code": "300456",
            "name": "赛微电子"
          },
          {
            "code": "688195",
            "name": "腾景科技"
          },
          {
            "code": "600105",
            "name": "永鼎股份"
          }
        ],
        "sourceSegment": "硅光 PIC + 调制材料"
      }
    ],
    "equipment": [
      {
        "name": "晶圆制造设备(MOCVD/EBeam 光刻)",
        "barrier": "extreme",
        "note": "中微公司 CCP/刻蚀(共享) + 拓荆 ALD/PECVD(共享) · 光芯片生产设备",
        "companies": [
          {
            "code": "688012",
            "name": "中微公司"
          },
          {
            "code": "688072",
            "name": "拓荆科技"
          }
        ],
        "sourceSegment": "光芯片 + 模块测试封装设备"
      },
      {
        "name": "光芯片涂胶/显影设备",
        "barrier": "extreme",
        "note": "罗博特科国产 + 芯源微(共享) · DUV/EBeam 配套",
        "companies": [
          {
            "code": "300757",
            "name": "罗博特科"
          },
          {
            "code": "688037",
            "name": "芯源微"
          }
        ],
        "sourceSegment": "光芯片 + 模块测试封装设备"
      },
      {
        "name": "光芯片 + 模块测试分选机",
        "barrier": "high",
        "note": "华峰测控模拟测试机 + 长川科技测试分选机 + 精测电子前道量测",
        "companies": [
          {
            "code": "688200",
            "name": "华峰测控"
          },
          {
            "code": "300604",
            "name": "长川科技"
          },
          {
            "code": "300567",
            "name": "精测电子"
          }
        ],
        "sourceSegment": "光芯片 + 模块测试封装设备"
      },
      {
        "name": "通用电子测试测量仪器",
        "barrier": "mid",
        "note": "普源精电 / 鼎阳科技 · 光芯片研发测试基础仪器",
        "companies": [],
        "sourceSegment": "光芯片 + 模块测试封装设备"
      }
    ],
    "sideBranches": [
      {
        "name": "CW 100mW 激光器外置光源(2026 CPO 标配)",
        "barrier": "extreme",
        "note": "CPO 架构核心增量 · 全球 <5 家供应(源杰/长光华芯/Lumentum/住友/三菱)· 缺口>50%",
        "companies": [
          {
            "code": "688498",
            "name": "源杰科技"
          },
          {
            "code": "688048",
            "name": "长光华芯"
          }
        ],
        "sourceSegment": "光芯片(DFB/EML/CW/PD/APD)"
      }
    ]
  },
  "segments": [
    {
      "name": "光芯片(DFB/EML/CW/PD/APD)",
      "costRatio": "~20%",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "光芯片是光模块与 CPO 的光源+探测器基础——DFB/EML/CW 激光器发出光信号,PD/APD/SPAD 接收并转换回电信号。100mW+ CW DFB 激光器全球<5 家供应(源杰/长光华芯 主业)。探测器中 SPAD(单光子)国产空白。",
      "globalLandscape": [
        {
          "lbl": "🥇 Lumentum(美)",
          "val": "CW 激光器全球龙头",
          "note": "英伟达 CPO 一供但产能不足"
        },
        {
          "lbl": "🥈 II-VI/Coherent(美)",
          "val": "光芯片大厂",
          "note": "多产品布局"
        },
        {
          "lbl": "🥉 源杰科技(中)",
          "val": "100mW CW 出货",
          "note": "A股最纯光芯片标的"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "源杰科技",
          "code": "688498",
          "position": "CW 100mW DFB 激光器国产唯一量产",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "CW 100mW DFB 激光器国产唯一量产 阶段 2 commit · auto 层精简 11 字段",
          "logic": "CW 100mW DFB 激光器国产唯一量产 (stage 2 commit · seg0 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 2,
          "name": "长光华芯",
          "code": "688048",
          "position": "半导体激光器 DFB/EML/VCSEL 三产品线",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "半导体激光器 DFB/EML/VCSEL 三产品线 阶段 2 commit · auto 层精简 11 字段",
          "logic": "半导体激光器 DFB/EML/VCSEL 三产品线 (stage 2 commit · seg0 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 6,
          "name": "水晶光电",
          "code": "002273",
          "position": "光学元件+激光器",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光学元件+激光器 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光学元件+激光器 (stage 2 commit · seg0 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 4,
          "name": "永鼎股份",
          "code": "600105",
          "position": "光通信激光器芯片(子公司鼎芯光电·IDM模式)·100G EML已批量供货·光通信业务仅占公司总营收20%,光芯片产品由子公司鼎芯光电运营,与源杰科技(专营光芯片)存在本质差异",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3)+ 券商研报(L4)",
          "trend": "up",
          "trendNote": "光通信激光器芯片(鼎芯光电 IDM·100G EML稳定供货·CW HP研发中) auto层·归属核实后修正(原误入seg[5])",
          "logic": "光通信激光器芯片(子公司鼎芯光电·IDM模式·100G EML打破国外垄断稳定供货·100mW/70mW CW HP研发中) 光通信仅占公司总营收20%,与源杰科技(专营光芯片)存在本质差异",
          "hits": 4,
          "strength": "★★★"
        }
      ]
    },
    {
      "name": "硅光 PIC + 调制材料",
      "costRatio": "~25%",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "硅光 PIC 在硅基片上单片集成调制器/波分复用器/耦合器——台积电 COUPE 平台代工主导。A 股抓设计与材料(InP 衬底/光学石英/TFLN)。光库科技 TFLN 国产稀缺。",
      "globalLandscape": [
        {
          "lbl": "🥇 台积电 COUPE(台)",
          "val": "硅光代工主导",
          "note": "类似 EUV 在芯片代工"
        },
        {
          "lbl": "🥈 Cisco Acacia(美)",
          "val": "硅光模块设计",
          "note": "被 Cisco 收购"
        },
        {
          "lbl": "🥉 光库科技(中)",
          "val": "TFLN/AWG 国产",
          "note": "稀缺 1-2 家"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "赛微电子",
          "code": "300456",
          "position": "硅光代工(MEMS+硅光)",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "硅光代工(MEMS+硅光) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "硅光代工(MEMS+硅光) (stage 2 commit · seg1 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 2,
          "name": "光库科技",
          "code": "300620",
          "position": "TFLN+AWG(国产稀缺)",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "TFLN+AWG(国产稀缺) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "TFLN+AWG(国产稀缺) (stage 2 commit · seg1 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 3,
          "name": "腾景科技",
          "code": "688195",
          "position": "硅光 PIC 模块",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "硅光 PIC 模块 阶段 2 commit · auto 层精简 11 字段",
          "logic": "硅光 PIC 模块 (stage 2 commit · seg1 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 4,
          "name": "仕佳光子",
          "code": "688313",
          "position": "AWG+CW+FAU 三线(CPO 全配套)",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "AWG+CW+FAU 三线(CPO 全配套) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "AWG+CW+FAU 三线(CPO 全配套) (stage 2 commit · seg1 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 5,
          "name": "三安光电",
          "code": "600703",
          "position": "InP 衬底(三族衬底)",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "InP 衬底(三族衬底) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "InP 衬底(三族衬底) (stage 2 commit · seg1 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 7,
          "name": "有研新材",
          "code": "600206",
          "position": "高纯靶材+半导体材料",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "高纯靶材+半导体材料 阶段 2 commit · auto 层精简 11 字段",
          "logic": "高纯靶材+半导体材料 (stage 2 commit · seg1 归属)",
          "hits": 4,
          "strength": "★★★"
        }
      ]
    },
    {
      "name": "光器件 + 光模块整链制造",
      "costRatio": "~30%",
      "barrier": "high",
      "choke": false,
      "border": false,
      "intro": "光器件(FA/MPO/AWG/透镜)是光模块的神经末梢。光模块整链制造从中际旭创领跑全球 800G/1.6T 市场(竞争充分,10+ 家)。",
      "globalLandscape": [
        {
          "lbl": "🥇 中际旭创(中)",
          "val": "800G 全球第一",
          "note": "英伟达/谷歌核心供应商"
        },
        {
          "lbl": "🥈 Coherent(美)",
          "val": "传统光模块厂商",
          "note": "InP 工艺"
        },
        {
          "lbl": "🥉 新易盛(中)",
          "val": "LPO 方案领先",
          "note": "北数核心"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "中际旭创",
          "code": "300308",
          "position": "800G 光模块全球龙头",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "800G 光模块全球龙头 阶段 2 commit · auto 层精简 11 字段",
          "logic": "800G 光模块全球龙头 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 2,
          "name": "光迅科技",
          "code": "002281",
          "position": "硅光模块+特种光纤",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "硅光模块+特种光纤 阶段 2 commit · auto 层精简 11 字段",
          "logic": "硅光模块+特种光纤 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 3,
          "name": "新易盛",
          "code": "300502",
          "position": "800G/1.6T 高速模块",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "800G/1.6T 高速模块 阶段 2 commit · auto 层精简 11 字段",
          "logic": "800G/1.6T 高速模块 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 4,
          "name": "剑桥科技",
          "code": "603083",
          "position": "光模块+5G 通信",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光模块+5G 通信 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光模块+5G 通信 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 5,
          "name": "联特科技",
          "code": "301205",
          "position": "光模块+光器件",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光模块+光器件 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光模块+光器件 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 7,
          "name": "天孚通信",
          "code": "300394",
          "position": "FA/MPO 光器件平台",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "FA/MPO 光器件平台 阶段 2 commit · auto 层精简 11 字段",
          "logic": "FA/MPO 光器件平台 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 8,
          "name": "长芯博创",
          "code": "300548",
          "position": "AWG/VOA 光器件",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "AWG/VOA 光器件 阶段 2 commit · auto 层精简 11 字段",
          "logic": "AWG/VOA 光器件 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 9,
          "name": "太辰光",
          "code": "300570",
          "position": "MT 插芯+连接器(CPO 配套)",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "MT 插芯+连接器(CPO 配套) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "MT 插芯+连接器(CPO 配套) (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 10,
          "name": "中瓷电子",
          "code": "003031",
          "position": "光通信陶瓷封装",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光通信陶瓷封装 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光通信陶瓷封装 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 12,
          "name": "铭普光磁",
          "code": "002902",
          "position": "光通信侧",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光通信侧 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光通信侧 (stage 2 commit · seg2 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 11,
          "name": "华工科技",
          "code": "000988",
          "position": "800G硅光模块全球第二大供应商(市占18-20%)·3.2T CPO全球首发量产·全栈自研硅光(芯片设计→8寸晶圆流片→封装→模块·硅光芯片自给率>70%)·光互联业务42.5%为第一大主业(2026Q1超50%)·英伟达/Meta/微软/亚马逊供应链·微软3年超3亿美元CPO长单·产线满产至2027年",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "abstract_ths L1实测·2026-07-16+LightCounting+L4券商研报",
          "trend": "up",
          "trendNote": "归属修正(2026-07-16核实):光互联42.5%为第一大主业(2026Q1>50%)·800G硅光全球第二大供应商(市占18-20%)·3.2T CPO全球首发量产(微软3年超3亿美元长单)·全栈自研硅光芯片自给率>70%·产线满产满销订单排至2027年·毛利率仅13.3%远低于龙头(中际42.6%/新易盛47.8%)",
          "logic": "800G硅光模块全球第二大供应商(市占18-20%·2026-07-16核实)·3.2T CPO全球首发量产(微软3年超3亿美元长单·英伟达Spectrum-X定点)·全栈自研硅光(芯片设计→8寸晶圆流片→封装→模块·硅光芯片自给率>70%·与光迅科技依赖台积电COUPE形成对比)·光互联业务42.5%为第一大主业(2026Q1>50%)·英伟达/Meta/微软/亚马逊四大客户·产线24小时满产满销·800G+订单已排至2027年·核心短板:毛利率仅13.3%远低于龙头(中际42.6%/新易盛47.8%)",
          "hits": 4,
          "strength": "★★★"
        }
      ]
    },
    {
      "name": "CPO 共封装光学(应用端)",
      "costRatio": "~10%",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "CPO 把光引擎直接封装在交换芯片旁边——省掉铜线,功耗降 30-50%,延迟降 10 倍。英伟达 Spectrum-X 2026 量产。本段 stocks=[](A 股 CPO 核心客户群 Microsoft/Google/Meta/英伟达 均在美股 · A 股 CPO 核心持股 CW 100mW 激光器/硅光 PIC 已分配到 seg0/seg1)· 本段保留为产业链叙事节点,仅描述 CPO 工艺与 5G 电信 / 数据中心应用场景。光模块整机出货方(中际旭创/新易盛/光迅)在 seg2 —— 整机出货向 CPO 应用演进的方向已隐含在 seg2。",
      "globalLandscape": [
        {
          "lbl": "🥇 Intel(美)",
          "val": "CPO 整机量产 2026",
          "note": "Spectrum-X 全球首推"
        },
        {
          "lbl": "🥈 台积电 COUPE(台)",
          "val": "CPO 代工独供",
          "note": "硅光 PIC 一体化封装"
        },
        {
          "lbl": "🛰 应用场景(5G 电信+数据中心)",
          "val": "烽火通信/中兴通讯 在 seg5",
          "note": "本段 sub-card 不引具体股票名"
        },
        {
          "lbl": "↗ 光模块整机出货",
          "val": "中际旭创/新易盛 在 seg2",
          "note": "整机→CPO 应用演进"
        }
      ],
      "stocks": []
    },
    {
      "name": "光芯片 + 模块测试封装设备",
      "costRatio": "~10%",
      "barrier": "high",
      "choke": false,
      "border": false,
      "intro": "测试设备覆盖光芯片晶圆级到模块封装级——华峰测控/长川科技/精测电子为主,MOCVD/光刻/涂胶/显影配套。",
      "globalLandscape": [
        {
          "lbl": "🥇 Teradyne(美)",
          "val": "测试机全球龙头",
          "note": "SoC/A 类全覆盖"
        },
        {
          "lbl": "🥈 Advantest(日)",
          "val": "测试机强项",
          "note": "半导体 test SoC"
        },
        {
          "lbl": "🥉 华峰测控(中)",
          "val": "国产模拟测试机第一",
          "note": "光芯片领域开拓"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "罗博特科",
          "code": "300757",
          "position": "光芯片涂胶显影设备",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光芯片涂胶显影设备 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光芯片涂胶显影设备 (stage 2 commit · seg4 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 2,
          "name": "华峰测控",
          "code": "688200",
          "position": "模拟测试机",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "模拟测试机 阶段 2 commit · auto 层精简 11 字段",
          "logic": "模拟测试机 (stage 2 commit · seg4 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 3,
          "name": "长川科技",
          "code": "300604",
          "position": "测试分选机",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "测试分选机 阶段 2 commit · auto 层精简 11 字段",
          "logic": "测试分选机 (stage 2 commit · seg4 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 4,
          "name": "精测电子",
          "code": "300567",
          "position": "前道量测+后道测试",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "前道量测+后道测试 阶段 2 commit · auto 层精简 11 字段",
          "logic": "前道量测+后道测试 (stage 2 commit · seg4 归属)",
          "hits": 4,
          "strength": "★★★"
        }
      ]
    },
    {
      "name": "侧枝应用(5G 电信 · 数据中心)",
      "costRatio": "~5%",
      "barrier": "mid",
      "choke": false,
      "border": false,
      "intro": "光模块的最终客户应用——AI 数据中心(800G/1.6T 标配)/ 5G 电信 / 企业网。本段保留与光模块直接关联的下游应用场景股(由方案 B 从 seg3 CPO 移入的两只5G 概念股),不含 PCB/服务器整机链股(已清理)。",
      "globalLandscape": [
        {
          "lbl": "🥇 英伟达(美)",
          "val": "AI 计算 GPU 全球",
          "note": "Rubin GB300+ 标配 1.6T"
        },
        {
          "lbl": "🥈 谷歌 TPU(美)",
          "val": "自研 AI 芯片",
          "note": "CPO 接入"
        },
        {
          "lbl": "🥉 华为昇腾(中)",
          "val": "国产 AI",
          "note": "CPO 配套"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "烽火通信",
          "code": "600498",
          "position": "5G 电信光通信设备(原拟入 seg3 CPO · 用户方案 B 调整至 seg5 侧枝 · 它们是 A 股 CPO 概念股而非 CPO 核心持股)",
          "barrier": "中",
          "tier": "B",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "5G 电信光通信设备(原拟入 seg3 CPO · 用户方案 B 调整至 seg5 侧枝 · 它们是 A 股 CPO 概念股而非 CPO 核心持股) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "5G 电信光通信设备(原拟入 seg3 CPO · 用户方案 B 调整至 seg5 侧枝 · 它们是 A 股 CPO 概念股而非 CPO 核心持股) (stage 2 commit · seg5 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 2,
          "name": "中兴通讯",
          "code": "000063",
          "position": "5G 电信+硅光技术储备(原拟入 seg3 CPO · 用户方案 B 调整至 seg5 侧枝 · 它们有 CPO 概念但未规模商业化)",
          "barrier": "中",
          "tier": "B",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "5G 电信+硅光技术储备(原拟入 seg3 CPO · 用户方案 B 调整至 seg5 侧枝 · 它们有 CPO 概念但未规模商业化) 阶段 2 commit · auto 层精简 11 字段",
          "logic": "5G 电信+硅光技术储备(原拟入 seg3 CPO · 用户方案 B 调整至 seg5 侧枝 · 它们有 CPO 概念但未规模商业化) (stage 2 commit · seg5 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 11,
          "name": "特发信息",
          "code": "000070",
          "position": "光通信设备(线缆业务占公司营收80%·MPO连接器仅为产品线之一·公司整体定位为通信基础设施提供商而非光器件专营公司)",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光通信设备(线缆业务80%·光纤光缆+MPO连接器+电力线缆) auto层·归属核实后修正(明确标注业务实质)",
          "logic": "光通信设备(线缆业务占公司营收80%·MPO连接器仅为产品线之一·2025年归母净利润亏损4.96亿(计提资产减值4.21亿)按§6.15亏损公司规则处理) 公司整体定位为通信基础设施提供商而非光器件专营公司",
          "hits": 4,
          "strength": "★★★"
        }
      ]
    }
  ],
  "midstream": {
    "description": "🔦 光模块·光互联合并链整链制造端主要厂商集合(11 只核心股票·涵盖原 OM 中段 + OC midstream + CPO 节点)",
    "stocks": [
      {
        "rank": 1,
        "name": "中际旭创",
        "code": "300308",
        "barrier": "极高",
        "note": "全球光模块龙头·Q1 营收 195 亿+192%/净利 57 亿+262%·深度绑定英伟达/谷歌",
        "position": "800G/1.6T 全球第一供应商"
      },
      {
        "rank": 2,
        "name": "光迅科技",
        "code": "002281",
        "barrier": "极高",
        "note": "硅光模块+特种光纤+CPO 全链布局·1.6T 硅光已批量",
        "position": "硅光 1.6T 批量+特种光纤"
      },
      {
        "rank": 3,
        "name": "新易盛",
        "code": "300502",
        "barrier": "高",
        "note": "LPO 方案领先·北美数据中心核心供应商",
        "position": "LPO 800G 高速模块"
      },
      {
        "rank": 4,
        "name": "剑桥科技",
        "code": "603083",
        "barrier": "高",
        "note": "800G 光模块+5G 通信",
        "position": "光模块+5G 通信"
      },
      {
        "rank": 5,
        "name": "联特科技",
        "code": "301205",
        "barrier": "高",
        "note": "光模块+光器件集成",
        "position": "光器件+模块集成"
      },
      {
        "rank": 6,
        "name": "天孚通信",
        "code": "300394",
        "barrier": "高",
        "note": "Q1 营收 13.3 亿+40.82%/净利 4.92 亿+45.79%·CPO 关键配套",
        "position": "FA/MPO 平台型·CPO 关键配套"
      },
      {
        "rank": 7,
        "name": "仕佳光子",
        "code": "688313",
        "barrier": "高",
        "note": "AWG+CW+FAU 三线·CPO 全配套",
        "position": "AWG+CW+FAU 三线"
      },
      {
        "rank": 8,
        "name": "长芯博创",
        "code": "300548",
        "barrier": "中",
        "note": "光器件 AWG/VOA",
        "position": "AWG/VOA"
      },
      {
        "rank": 9,
        "name": "太辰光",
        "code": "300570",
        "barrier": "中",
        "note": "CPO 高密度连接器 MT 插芯",
        "position": "MT 插芯+光纤连接器"
      },
      {
        "rank": 10,
        "name": "铭普光磁",
        "code": "002902",
        "barrier": "中",
        "note": "光通信侧",
        "position": "光通信侧"
      },
      {
        "rank": 11,
        "name": "特发信息",
        "code": "000070",
        "barrier": "中",
        "note": "光通信设备",
        "position": "光通信设备"
      }
    ]
  },
  "fourQuestions": {
    "segments": [
      {
        "segmentName": "光芯片(CW 100mW + 探测器)",
        "stocks": [
          {
            "name": "源杰科技",
            "code": "688498",
            "q1": true,
            "q1note": "全球<5 家 100mW 量产",
            "q2": true,
            "q2note": "扩产>12 月",
            "q3": true,
            "q3note": "CPO 必须外置光源",
            "q4": true,
            "q4note": "英伟达 2000 万只 1.6T 刚需",
            "hits": 4,
            "strength": "★★★"
          },
          {
            "name": "长光华芯",
            "code": "688048",
            "q1": true,
            "q1note": "半导体激光器主业(CW+EML+VCSEL)",
            "q2": true,
            "q2note": "100G EML 验证通过",
            "q3": true,
            "q3note": "全球<5 家 100mW CW",
            "q4": true,
            "q4note": "海外大厂验证中",
            "hits": 4,
            "strength": "★★★"
          }
        ]
      },
      {
        "segmentName": "硅光 PIC + 调制材料",
        "stocks": [
          {
            "name": "光库科技",
            "code": "300620",
            "q1": true,
            "q1note": "TFLN/AWG 国产唯一",
            "q2": true,
            "q2note": "TFLN 验证>12 月",
            "q3": true,
            "q3note": "800G/1.6T TFLN 必经",
            "q4": true,
            "q4note": "英伟达 CPO 配套",
            "hits": 4,
            "strength": "★★★"
          },
          {
            "name": "仕佳光子",
            "code": "688313",
            "q1": true,
            "q1note": "AWG 全球主流光模块标配",
            "q2": true,
            "q2note": "100mW/400mW 验证>12 月",
            "q3": true,
            "q3note": "CPO 全配套(AWG+CW+FAU)",
            "q4": true,
            "q4note": "1.6T/CPO 刚需",
            "hits": 4,
            "strength": "★★★"
          }
        ]
      },
      {
        "segmentName": "光器件 + 光模块整链",
        "stocks": [
          {
            "name": "中际旭创",
            "code": "300308",
            "q1": false,
            "q1note": "光模块制造竞争充分(10+ 家)",
            "q2": true,
            "q2note": "扩产>18 月",
            "q3": true,
            "q3note": "1.6T 可替(新易盛/光迅/Finisar)",
            "q4": true,
            "q4note": "英伟达 2000 万只刚需",
            "hits": 2,
            "strength": "★★☆"
          },
          {
            "name": "光迅科技",
            "code": "002281",
            "q1": true,
            "q1note": "国内 1.6T 硅光唯一",
            "q2": true,
            "q2note": "硅光验证>18 月",
            "q3": false,
            "q3note": "中际旭创可替",
            "q4": true,
            "q4note": "CPO+电信双刚需",
            "hits": 3,
            "strength": "★★☆"
          }
        ]
      },
      {
        "segmentName": "CPO 共封装光学(应用端·无 A 股核心持股)",
        "stocks": [
          {
            "name": "烽火通信",
            "code": "600498",
            "q1": true,
            "q1note": "CPO 整机方案·全球<3 家可批量",
            "q2": true,
            "q2note": "CPO 验证>18 月",
            "q3": true,
            "q3note": "CPO 替代品极少(Intel/中际)",
            "q4": true,
            "q4note": "5G+数据中心双刚需",
            "hits": 4,
            "strength": "★★★"
          },
          {
            "name": "中兴通讯",
            "code": "000063",
            "q1": false,
            "q1note": "光模块非主业",
            "q2": false,
            "q2note": "扩产≤12 月",
            "q3": true,
            "q3note": "电信 CPO 替代少",
            "q4": true,
            "q4note": "5G 电信刚需",
            "hits": 2,
            "strength": "★★☆"
          }
        ]
      },
      {
        "segmentName": "侧枝应用",
        "stocks": [
          {
            "name": "中际旭创",
            "code": "300308",
            "q1": false,
            "q1note": "光模块制造竞争充分",
            "q2": true,
            "q2note": "扩产>18 月",
            "q3": true,
            "q3note": "1.6T 可替",
            "q4": true,
            "q4note": "AI 数据中心刚需",
            "hits": 2,
            "strength": "★★☆"
          }
        ]
      }
    ]
  },
  "chokePoints": [
    {
      "rank": 1,
      "name": "源杰科技",
      "code": "688498",
      "segment": "CW 100mW 激光器",
      "strength": "★★★",
      "chokePointType": "global-scarcity",
      "logic": "全球稀缺型·CW 100mW DFB激光器全球有效量产供应商<5家(实际批量交付≤3家:源杰/Lumentum/住友)。CPO架构必须外置高功率光源——每一条CPO链路离不开CW激光器。英伟达1.6T光模块上调至2000万只→需2000-3000万颗CW光源→缺口>50%(LightCounting 2026Q1)。认证壁垒≥18月(GR-468+IEC 60825+客户定制)+工艺壁垒(MOCVD外延+光栅刻蚀+端面镀膜·良率爬坡2-3年)。中际旭创预付定金锁定源杰2026年核心CW供应→商业层面证实切换成本极高。2025营收6.01亿+138.5%扭亏→2026Q1营收3.55亿+320.94%/净利1.79亿+1153%/毛利率77.81%。六维:dur=5/bar=5/vis=4/sup=5/pol=4/val=2·moat=94·hold。",
      "plainLanguageNote": "源杰科技做的是一种叫\"CW激光器\"的东西,你可以把它想象成AI数据中心的\"灯泡\"——每只1.6T光模块必须配一颗高功率灯泡才能把数据通过光纤传出去。全球能批量生产这种灯泡的只有3家公司(源杰/美国Lumentum/日本住友),而英伟达今年需要2000-3000万颗,产能缺口超过一半。更关键的是,新玩家想进入这个市场至少需要1年半的产品认证,加上2-3年的工艺磨合——等你做出来了,英伟达的下一代芯片已经换代了。中际旭创(全球最大光模块厂)已经用预付定金的方式把源杰2026年的核心产能锁定了,等于提前\"占坑\"。风险:营收基数极小(2025全年仅6亿),当前市值可能已经透支了2-3年的增长预期;如果Lumentum或住友大幅扩产,供给缺口可能收窄。",
      "tags": [
        "全球<3家",
        "CW 100mW",
        "CPO必须配置",
        "缺口>50%",
        "毛利率77.81%"
      ],
      "verification": {
        "status": "verified",
        "asOf": "2026-07-16",
        "source": "L1 abstract_ths+L3 LightCounting+L4券商"
      }
    },
    {
      "rank": 2,
      "name": "仕佳光子",
      "code": "688313",
      "segment": "AWG+CW+FAU 三线全配套",
      "strength": "★★★",
      "chokePointType": "domestic-substitution",
      "logic": "国产替代型·AWG(阵列波导光栅)+CW光源+FAU(光纤阵列单元)三线CPO全配套,国内唯一。AWG为波分复用核心器件(CPO每条链路标配),CW 100mW/400mW小批量量产从无源向有源光芯片升级,FAU为CPO高密度光纤接口必需。国内竞争对手各自覆盖1-2条线(光库TFLN+AWG双线/源杰CW+EML双线),三线完整性的系统级壁垒国内无人能及。全球AWG供应商约5-8家竞争者适度。2025营收21.29亿+98.15%/净利3.72亿+473%/ROE27.10%。认证≥12月(GR-1221/1209)。六维:dur=5/bar=4/vis=5/sup=4/pol=4/val=2·moat=89·hold。",
      "plainLanguageNote": "仕佳光子做的事情可以用\"一站式配齐\"来理解——CPO(芯片上直接装光纤)需要三种核心零件:AWG(分光器,把一束光分成很多束)、CW光源(灯泡)、FAU(光纤插头)。这三种零件每家CPO厂商都需要,但国内只有仕佳能三种同时供应。其他竞争对手有的做分光器,有的做灯泡,但没有第二家能三样全做——这就好比你去装修,仕佳是唯一能同时提供水管+电线+开关的全套供应商,省去了你找三家协调的麻烦。这种\"一站式\"能力构成了一种系统性的竞争壁垒。风险:全球AWG有5-8家供应商,不是绝对寡头;CW光源还在小批量阶段,与源杰的大批量交付有差距;2025净利暴增473%后基数已大幅抬高,2026年增速会自然回落。",
      "tags": [
        "三线全配套",
        "AWG+CW+FAU",
        "CPO核心",
        "国内唯一",
        "ROE27.10%"
      ],
      "verification": {
        "status": "verified",
        "asOf": "2026-07-16",
        "source": "L1 abstract_ths+L3 LightCounting+L4券商"
      }
    },
    {
      "rank": 3,
      "name": "光库科技",
      "code": "300620",
      "segment": "TFLN 薄膜铌酸锂调制器",
      "strength": "★★★",
      "chokePointType": "domestic-substitution",
      "logic": "国产替代型·TFLN(薄膜铌酸锂)调制器国内唯一量产供应商,全球4-5家(光库科技/富士通/住友/索尔思/Lumentum)。TFLN是1.6T光模块的必经技术路线——相比传统铌酸锂调制器体积缩小90%/功耗降低50%/带宽提升至100GHz+。英伟达1.6T 2000万只→对应2000-4000万颗TFLN调制器需求。工艺壁垒极高(薄膜剥离/键合+亚微米光刻+精密刻蚀·堪比半导体前道制造),新进入者从零起步需3-5年。认证≥12-18月(Telcordia GR-468+客户定制)。2025营收14.74亿+47.56%/净利1.77亿+163.76%→2026Q1营收4.26亿+60.80%/净利4474万+312.52%/毛利率36.63%。六维:dur=4/bar=4/vis=4/sup=4/pol=4/val=3·moat=80·core。",
      "plainLanguageNote": "光库科技做的东西叫\"TFLN调制器\",你可以把它理解为光纤通信的\"翻译官\"——电信号要变成光信号才能在光纤里传输,调制器就是做这个翻译工作的。1.6T光模块速度快了,老的翻译官(传统铌酸锂调制器)体积太大、功耗太高,必须换成新一代的\"薄膜翻译官\"(TFLN)。这个薄膜工艺难度极高——需要把铌酸锂晶体剥离到只有几微米薄,然后在上面刻出纳米级的光路,全球只有4-5家公司掌握这个技术,国内就光库科技一家。每个光模块厂要使用光库的TFLN,得先花一年半做认证测试,一旦通过就不会轻易更换。风险:全球毕竟有4-5家供应商(不是绝对寡头),如果富士通/住友大幅扩产可能改变竞争格局;TFLN目前渗透率约15%,如果技术路线被其他方案(如硅光调制器)替代,卡口逻辑会松动。",
      "tags": [
        "TFLN国产唯一",
        "1.6T必经",
        "全球4-5家",
        "认证≥12月",
        "毛利率36.63%"
      ],
      "verification": {
        "status": "verified",
        "asOf": "2026-07-16",
        "source": "L1 abstract_ths+L3 LightCounting+L4券商"
      }
    },
    {
      "rank": 4,
      "name": "天孚通信",
      "code": "300394",
      "segment": "FA/MPO 光器件平台",
      "strength": "★★☆",
      "chokePointType": "domestic-substitution",
      "logic": "国产替代型·FA(光纤阵列)/MPO(多芯连接器)光器件平台型龙头,CPO架构核心配套——CPO将光引擎封装在交换芯片旁,每端口需要配套FA/MPO进行高密度光纤连接。全球FA/MPO供应商约8家(天孚/US Conec/Senko/住友等),国内天孚通信为龙头(营收52亿vs太辰光15亿),平台型产品矩阵(FA+MPO+WDM+隔离器+透镜)提供一站式解决方案,客户切换成本高(切换需重新验证全部配套器件)。认证≥12月(Telcordia GR-1435)。2025营收51.63亿+58.79%/净利20.17亿+50.15%/毛利率53.96%→56.60%/ROE41.91%——高毛利率印证强定价权。六维:dur=4/bar=4/vis=5/sup=4/pol=4/val=2·moat=84·hold。未达★★★原因:全球有8家供应商,非≤3家物理卡口;FA/MPO制造壁垒低于TFLN/CW激光器等上游核心器件。",
      "plainLanguageNote": "天孚通信做的是光纤通信中的\"插头\"和\"排线\"——FA就像一排整齐排列的光纤插头,MPO就像多芯光纤的接线板。CPO技术把光引擎直接封装在芯片旁边,每个光引擎都需要配套这种高密度光纤插头,就像每个电器都需要电源插座一样。天孚的厉害之处在于它不是一个只卖插头的公司,而是能提供\"全屋水电一站式解决方案\"——从插头到接线板到信号分配器全都能做。客户一旦用了天孚的全套方案,想换供应商就得把整个系统的配件全部重新验证一遍,非常麻烦。毛利率54%说明产品有很强的定价权(普通制造业不可能有这么高的毛利)。风险:全球有约8家供应商,竞争者不少;高估值(PE>85%)意味着市场已经给足了预期;如果CPO推进不及预期,FA/MPO需求可能低于预期。",
      "tags": [
        "FA/MPO平台龙头",
        "CPO核心配套",
        "一站式方案",
        "毛利率53.96%",
        "ROE41.91%"
      ],
      "verification": {
        "status": "verified",
        "asOf": "2026-07-16",
        "source": "L1 abstract_ths+L3 LightCounting+L4券商"
      }
    },
    {
      "rank": 5,
      "name": "长光华芯",
      "code": "688048",
      "segment": "EML/CW 光芯片 IDM",
      "strength": "★★☆",
      "chokePointType": "domestic-substitution",
      "logic": "国产替代型·国内少数同时布局DFB+EML+VCSEL三产品线的IDM光芯片厂商(设计→外延→工艺→测试全流程闭环)。100G EML已通过国内主流光模块厂商验证并稳定供货(打破国外垄断),海外大厂验证中。100mW/70mW CW HP研发中,配套800G/1.6T需求。国产光芯片供给极度稀缺(全球光芯片份额<10%),长光华芯为源杰之后国产第二梯队核心标的。2025营收4.77亿+75.09%/净利2176万扭亏为盈,但盈利体量极小(净利率4.80%)。认证≥12月(100G EML通过国内验证)。六维:dur=4/bar=4/vis=3/sup=4/pol=4/val=2·moat=76·hold。未达★★★原因:CW 100mW仍验证中(未像源杰那样批量交付)+全球EML赛道竞争者≥6-7家(非寡头)+微利状态盈利底盘薄弱。",
      "plainLanguageNote": "长光华芯做的是光芯片——光模块的心脏部件,把电信号变成光信号。它有IDM模式(自己设计+自己制造,一条龙全包),国内只有极少数厂商有这个能力。它的100G EML芯片已经通过国内光模块厂的测试并稳定供货,这在以前是被美国和日本公司垄断的,能\"破圈\"本身就是一个重要的技术进步。但它跟在光芯片领域的\"国内一哥\"源杰科技比,有两个差距:①源杰已经批量交付的100mW大功率激光器(CW),长光还在研发验证阶段——这就像源杰已经在跑马拉松了,长光还在训练;②光芯片这个赛道全球有六七家公司竞争,长光的盈利体量还很小(2025全年净利仅2176万),抗风险能力弱。风险:盈利底盘极薄,一旦研发投入加大或产品降价,可能重回亏损;CW 100mW能否通过验证存在不确定性。",
      "tags": [
        "IDM三产品线",
        "100G EML稳定供货",
        "CW仍验证中",
        "国产第二梯队",
        "微利状态"
      ],
      "verification": {
        "status": "verified",
        "asOf": "2026-07-16",
        "source": "L1 abstract_ths+L4券商"
      }
    },
    {
      "rank": 6,
      "name": "光迅科技",
      "code": "002281",
      "segment": "硅光模块+特种光纤",
      "strength": "★★☆",
      "chokePointType": "domestic-substitution",
      "logic": "国产替代型·国内唯一1.6T硅光模块批量交付企业,硅光芯片设计+光模块制造一体化,特种光纤(保偏/掺铒)自产能力国内稀缺。1.6T硅光模块为英伟达CPO生态核心器件,全球硅光渗透率从40%升至75%持续拉动需求。2025营收119.29亿+44.20%/净利9.46亿+43.10%→2026Q1净利+59.76%加速。六维:dur=4/bar=4/vis=3/sup=3/pol=4/val=3·moat=72·core。降级★★☆的核心原因(原为预存★★★):①硅光PIC晶圆代工完全依赖台积电COUPE平台——核心制造环节不自主,台积电若产能紧张或提价则直接影响光迅硅光模块的竞争力和毛利率;②全球硅光模块竞争者≥5家(Coherent/Intel/Cisco/中际旭创也在布局硅光),非独家垄断;③特种光纤虽国内稀缺但营收体量有限,对整体卡口逻辑的支撑力度不足以将评级推至★★★。",
      "plainLanguageNote": "光迅科技的独特之处在于它同时能做两件事:设计硅光芯片和制造光模块,国内只有它实现了1.6T硅光模块的批量交付。硅光的意思是\"用硅来做光芯片\",可以像做普通芯片一样大规模生产,成本比传统方案低很多。光迅还有一项独门手艺——特种光纤(保偏光纤和掺铒光纤),这些光纤不是普通通信光纤,能在极端条件下保持光信号的稳定,国产非常稀缺。但它有一个关键软肋:它的硅光芯片虽然是自己设计的,但制造必须委托台积电(台湾的COUPE平台)来做——这就好比你会设计衣服但不会自己缝,得找代工厂。台积电如果产能紧张,或者因为地缘政治无法给光迅代工,光迅的整个硅光模块业务就会受制于人。这是它不能拿★★★的主要原因。优点和风险都很明确:技术能力强,但核心制造环节不在自己手里。",
      "tags": [
        "1.6T硅光批量",
        "国内唯一",
        "代工依赖台积电",
        "特种光纤壁垒",
        "硅光渗透拐点"
      ],
      "verification": {
        "status": "verified",
        "asOf": "2026-07-16",
        "source": "L1 abstract_ths+L3+L4券商"
      }
    }
  ],
  "supplyGap": [
    {
      "segment": "CW 100mW 激光器(2026 1.6T 主战场)",
      "demand": "英伟达上调 2026 全年 1.6T 至 2000 万只 → 需 2000-3000 万颗 CW",
      "capacity": "全球 <5 家有效产能 ~ 1500 万颗(源杰 2026 扩至 7000 万颗含其他产品)",
      "gap": "~500-1500 万颗(2026)",
      "rate": ">50%",
      "bottleneck": "100mW CW 芯片良率 + 产能扩产 > 12 月 · 中际旭创预付定金锁 CW 供应"
    },
    {
      "segment": "硅光 PIC 代工(台积电 COUPE)",
      "demand": "硅光渗透率 40-75% → 需海量 PIC",
      "capacity": "台积电 COUPE 产能有限",
      "gap": "扩产慢(COUPE 平台独供)",
      "rate": "~30%",
      "bottleneck": "台积电独供 · A 股无直接代工标的"
    },
    {
      "segment": "光芯片测试设备(国产替代)",
      "demand": "光模块制造扩产 + 硅光芯片研发测试需求增长",
      "capacity": "华峰测控+长川+精测国内一线·但与 Teradyne/Advantest 仍有差距",
      "gap": "高端测试机国产化 < 30%",
      "rate": "~30-40%",
      "bottleneck": "测试精度与一致性 · 国产替代信任积累"
    }
  ],
  "methodologyNotes": "🔦 光模块·光互联合并链(stage 2 commit 6.70 立) · 由原光模块(33 股)+ 光芯片(54 股) + CPO(7 股)三链合一 · unique 去重 41 只 · 6 个 segment · 双层架构(参照 semicon-equip P0 经验,避免返工) · PE/PB 实盘接口本机不可用 → valuation tier 全部降级 estimate · 等§10 景气度调整系数设计 + akshare PE 接口恢复后重新核算 · 【关键归类调整(commit message 显式说明)】 · 1. 烽火通信 600498 + 中兴通讯 000063 原本预入 seg3 (CPO 共封装光学) · 实际身份 = 5G 电信光模块应用方,不是 CPO 核心持股 · 调整至 seg5 侧枝应用(方案 B 决定,用户 review 通过) · 2. seg3 保留为空段 + sub-card only 工艺说明 · 引用 seg2 中际旭创/新易盛/光迅作为光模块整机出货方向 CPO 应用演进的方向说明 · 类似 PCB 链 sideBranches 只做工艺说明不占实际持股 的处理方式",
  "demandChainMeta": {
    "_hasDemandData": true,
    "source": "LightCounting 2026.04+Yole 2025+L4券商研报",
    "updatedAt": "2026-07-16",
    "segments": [
      {
        "name": "AI 数据中心 (800G/1.6T/3.2T)",
        "sharePct": 62.6,
        "cagr": 65,
        "desc": "英伟达 Rubin/Blackwell+谷歌 TPU+华为昇腾·1.6T 2026 规模放量·3.2T CPO 2027 导入·需求超出供给 30%",
        "sources": [
          "LightCounting 2026.04",
          "LC 以太网光模块 2026E +65%"
        ]
      },
      {
        "name": "云计算数据中心 (400G/800G)",
        "sharePct": 24.3,
        "cagr": 20,
        "desc": "AWS/Azure/阿里云传统数据中心向 800G 升级·非 AI 通用计算需求稳健",
        "sources": [
          "LightCounting 2026.04",
          "Yole 2025 数据中心占比"
        ]
      },
      {
        "name": "5G 电信 (25G/100G)",
        "sharePct": 13.1,
        "cagr": 5,
        "desc": "5G 承载网+FTTx·建设高峰已过·增速放缓·占比持续下降",
        "sources": [
          "LightCounting 2026.04",
          "LC 2026 电信市场占比"
        ]
      }
    ]
  }
};

})(window.CHAINS);
