// data/optical-module.js — 光模块·光互联合并链 auto 估值层 (stage 2 commit 6.70 立)
//
// 触发:阶段1 CPO treeMap schema 标准化清洗(commit 6.69)+ 阶段2 三链合一合并(commit 6.70)
// 命名空间:window.CHAINS['optical-module'] (与 manual.js OPTICAL_MODULE_MANUAL 配合)
// 设计:精简 11 字段 auto 估值层(无 dims6)+ 6 个 segment + seg3 sub-card only + 41 unique stocks
//
// 命名空间兼容:
//   - manual.js: window.OPTICAL_MODULE_MANUAL(本文件 P0 命名空间 bug 修复)
//   - helper 必须 chainId.toUpperCase().replace(/-/g, '_') 双词 chainId 兼容公式
//
// 数据来源迁移(8 个独立文件 → 1 个):
//   ✅ data/optical-module.js (87487 bytes · 已 rename → data/optical-module.js.pre-merge-backup)
//   ✅ data/cpo.js           (14817 bytes · 已 rename → data/cpo.js.deprecated)
//   ✅ data/optical-chip.js  (180223 bytes · 已 rename → data/optical-chip.js.deprecated)
// 三链总 union 41 unique stocks(去重后)
//
// 关键归类调整(commit message 显式说明):
//   1. 烽火通信 600498 + 中兴通讯 000063 原本预入 seg3 (CPO 共封装光学)
//      实际身份 = 5G 电信光模块应用方,不是 CPO 核心持股
//      调整至 seg5 侧枝应用(方案 B 决定,用户 review 通过)
//   2. seg3 保留为空段 + sub-card only 工艺说明
//      引用 seg2 中际旭创/新易盛/光迅作为"光模块整机出货方向 CPO 应用演进"的方向说明
//      类似 PCB 链 sideBranches "只做工艺说明不占实际持股" 的处理方式
//
// 治理纪律:§6.7.3 hallucination 防御 + §6.13 主营占比核实 + §6.14 百分比口径 + §6.16 5 分维度 reason 完整性
// 阶段状态:Phase B 启动 / Phase C 待执行(stage 2 commit 6.70 的 dims6 全部在 manual.js,auto 层无 dims6)

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

CHAINS['optical-module'] = {
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
        },
        {
          "rank": 6,
          "name": "华工科技",
          "code": "000988",
          "position": "激光设备+硅光模块",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "激光设备+硅光模块 阶段 2 commit · auto 层精简 11 字段",
          "logic": "激光设备+硅光模块 (stage 2 commit · seg2 归属)",
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
          "rank": 3,
          "name": "永鼎股份",
          "code": "600105",
          "position": "光通信激光器芯片",
          "barrier": "极高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光通信激光器芯片 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光通信激光器芯片 (stage 2 commit · seg0 归属)",
          "hits": 4,
          "strength": "★★★"
        },
        {
          "rank": 11,
          "name": "特发信息",
          "code": "000070",
          "position": "光通信设备",
          "barrier": "高",
          "tier": "A",
          "valAsOf": "2026Q1",
          "src": "company 2026Q1 季报(L1)+ 行业共识(L3) [stage 2 commit",
          "trend": "up",
          "trendNote": "光通信设备 阶段 2 commit · auto 层精简 11 字段",
          "logic": "光通信设备 (stage 2 commit · seg2 归属)",
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
      "logic": "全球仅<5 家能批量供应 100mW+ CW DFB 激光器——CPO 架构必须外置高功率光源。Q1 营收 3.55 亿+321%/净利+1153%。毛利率 77.81%。100mW 产品已进入交付。产能 2026 年扩至 7000 万颗。中际旭创预付定金锁定 2026 年核心 CW 供应。英伟达 1.6T 光模块上调至 2000 万只→CW 缺口>50%。",
      "tags": [
        "全球<5 家",
        "毛利率 77.81%",
        "CPO 必须配置",
        "缺口>50%"
      ]
    },
    {
      "rank": 2,
      "name": "永鼎股份",
      "code": "600105",
      "segment": "光通信激光器芯片",
      "strength": "★★☆",
      "logic": "光通信激光器芯片主业(100mW CW 验证中)· 2025 持续扩产 CW 产能。",
      "tags": [
        "CW 激光器",
        "光通信",
        "扩产>12 月"
      ]
    },
    {
      "rank": 3,
      "name": "光库科技",
      "code": "300620",
      "segment": "TFLN 调制器",
      "strength": "★★★",
      "logic": "国产稀缺 TFLN/AWG 双产品线。800G/1.6T 光模块 TFLN 必经器件。",
      "tags": [
        "TFLN 国产稀缺",
        "800G 必经",
        "英伟达 CPO 配套"
      ]
    },
    {
      "rank": 4,
      "name": "仕佳光子",
      "code": "688313",
      "segment": "硅光 PIC + AWG",
      "strength": "★★★",
      "logic": "AWG+CW+FAU 三线 CPO 全配套·100mW/400mW CW DFB 小批量量产。",
      "tags": [
        "三线全配套",
        "100mW CW",
        "CPO"
      ]
    },
    {
      "rank": 5,
      "name": "中际旭创",
      "code": "300308",
      "segment": "光模块整链制造",
      "strength": "★★☆",
      "logic": "全球光模块龙头·Q1 营收 195 亿+192%/净利 57 亿+262%·深度绑定英伟达/谷歌。800G/1.6T 全球第一供应商。",
      "tags": [
        "全球第一",
        "800G/1.6T",
        "竞争充分"
      ]
    },
    {
      "rank": 6,
      "name": "光迅科技",
      "code": "002281",
      "segment": "硅光模块 + CPO",
      "strength": "★★★",
      "logic": "国内唯一 1.6T 硅光模块批量交付企业。硅光芯片设计+光模块制造一体化。但硅光代工依赖台积电 COUPE→核心技术不自主。",
      "tags": [
        "1.6T 硅光批量",
        "代工依赖台积电",
        "特种光纤壁垒"
      ]
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
  "methodologyNotes": "🔦 光模块·光互联合并链(stage 2 commit 6.70 立) · 由原光模块(33 股)+ 光芯片(54 股) + CPO(7 股)三链合一 · unique 去重 41 只 · 6 个 segment · 双层架构(参照 semicon-equip P0 经验,避免返工) · PE/PB 实盘接口本机不可用 → valuation tier 全部降级 estimate · 等§10 景气度调整系数设计 + akshare PE 接口恢复后重新核算 · 【关键归类调整(commit message 显式说明)】 · 1. 烽火通信 600498 + 中兴通讯 000063 原本预入 seg3 (CPO 共封装光学) · 实际身份 = 5G 电信光模块应用方,不是 CPO 核心持股 · 调整至 seg5 侧枝应用(方案 B 决定,用户 review 通过) · 2. seg3 保留为空段 + sub-card only 工艺说明 · 引用 seg2 中际旭创/新易盛/光迅作为光模块整机出货方向 CPO 应用演进的方向说明 · 类似 PCB 链 sideBranches 只做工艺说明不占实际持股 的处理方式"
};

})(window.CHAINS);
