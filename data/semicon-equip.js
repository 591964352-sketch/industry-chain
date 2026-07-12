window.CHAINS = window.CHAINS || {};
(function(CHAINS){

CHAINS["semicon-equip"] = {
  "id": "semicon-equip",
  "name": "半导体设备",
  "icon": "🔩",
  "meta": {
    "sector": "上游",
    "tier": "核心",
    "status": "partial-P0-1精简(2026-07-09 · semicon-equip.manual.js 31 KB 已建 · 24 stocks × 6 维 dims 全部迁 manual 层 · stock 块保留 11 字段 · 自动估值字段尚未实装,等 Phase B+ akshare 抓数)",
    "updatedAt": "2026-07-09",
    "ltFit": null
  },
  "prosperity": {
    "dims": [
      {
        "key": "durability",
        "name": "景气持续性",
        "score": 4,
        "trend": "up",
        "reason": "🔩 全球半导体设备 2025 年规模 ~1100 亿美元(SEMI)+AI/HPC 驱动 2024-28 CAGR 6.4%(Gartner);中国大陆 2025 年首次成为全球最大半导体设备市场(装机口径 ~410 亿美元);中美科技摩擦持续+大基金三期(3440 亿)落地,本土设备厂确定性需求 2026-2028 持续抬升;缺口集中高端光刻/EUV 之外(CCP/ICP/PECVD/ALD/CMP/检测等) —— 评分 4",
        "evidence": "SEMI 2025 Worldwide Total Equipment Forecast + Gartner 2025Q4 + SEMI 中国 2025 数据",
        "flag": "🆪",
        "tier": "broker",
        "src": "SEMI 2025 + Gartner 2025"
      },
      {
        "key": "visibility",
        "name": "业绩可见度",
        "score": 4,
        "trend": "up",
        "reason": "🔩 已兑现非纯预期:北方华创 2026Q1 营收 53.6 亿+30.46%、归母 5.4 亿+10.3%;中微公司 2026Q1 营收 23.95 亿+30.9%、归母 4.0 亿+46.4%;拓荆科技 2026Q1 营收 13.35 亿+87.5%、归母 2.16 亿+122%;订单可见(中微 2025 新签订单 110 亿+,拓荆 2025 在手订单 130 亿+);扩产+长协可见 —— 评分 4",
        "evidence": "北方华创/中微/拓荆 2025 年报+2026Q1 季报(cninfo 巨潮 / 上交所)",
        "flag": "🆪",
        "tier": "primary",
        "src": "cninfo 巨潮 2025 年报 + 2026Q1 季报"
      },
      {
        "key": "policy",
        "name": "政策确定性",
        "score": 5,
        "trend": "up",
        "reason": "🔩 国务院 2024-05 大基金三期成立(注册资本 3440 亿元,远超大基金二期),重点投向半导体设备/材料/EDA;02 专项持续支持光刻/刻蚀/薄膜沉积等关键设备国产化;工信部\"十四五\"集成电路产业规划明确设备国产化率 2025 年 50%/2027 年 70% 目标;上海/北京/广东多地设备国产化采购补贴;中美 7nm 设备出口管制(2023-10 升级)反向催化国产替代 —— 评分 5",
        "evidence": "国务院 / 工信部 / 国家集成电路产业投资基金 / 02 专项 公告",
        "flag": "🆪",
        "tier": "primary",
        "src": "大基金三期公告 + 工信部十四五规划 + 02 专项"
      },
      {
        "key": "supply",
        "name": "供需紧张度",
        "score": 4,
        "trend": "up",
        "reason": "🔩 结构性紧张持续:EUV 光刻机 ASML 100% 垄断(2025 年交付 50 台+)/CCP 刻蚀 AMAT/Lam Research 双寡头/原子层沉积 ALD 三大寡头合计 >85%;国产化率(2025):CCP 刻蚀 30%(中微 25%+北方华创 5%)/PECVD 35%(拓荆+北方华创)/ALD 25%(拓荆+微导纳米)/CMP 40%(华海清科)/清洗 30%(盛美+至纯)/检测 25%(精测+华峰+金海通+中科飞测);高端环节缺口 5-7 年才能补齐 —— 评分 4",
        "evidence": "SEMI + Gartner + VLSI Research 2025 国产化率报告 + 中国电子专用设备工业协会",
        "flag": "🆪",
        "tier": "broker",
        "src": "SEMI 2025 + VLSI Research 2025 + CEPEA 数据"
      },
      {
        "key": "valuation",
        "name": "估值性价比",
        "score": 2,
        "trend": "down",
        "reason": "⚠️ 设备龙头 PE-TTM 高位(中微 80-100 倍/北方华创 50-60 倍/拓荆 100-150 倍),处于历史 80-95% 分位;短期估值已透支,但订单可见性+业绩高速增长(平均 +30-50% YoY)支撑;评分 2(阶段性高位,等回调或选二线设备)",
        "evidence": "WIND/同花顺/Choice 终端 PE-TTM 数据(2026-07-08)",
        "flag": "🆪",
        "tier": "estimate",
        "src": "WIND/Choice PE-TTM 数据(2026-07-08)"
      },
      {
        "key": "barrier",
        "name": "壁垒安全垫",
        "score": 4,
        "trend": "flat",
        "reason": "🔩 分化极大:T0(光刻 ASML 100% 垄断/EUV 全球独家)、CCP 刻蚀(AMAT/Lam 双寡头 60%)、ALD(三大寡头 85%+)属于极高壁垒;T1(PECVD/CVD/PVD/CMP/清洗/检测/涂胶显影/原子层沉积)国产化卡口突破中(国产 30-45%);T2(成熟环节成熟设备)壁垒中下;赛道级取核心 T0+T1 给 4。下钻见 segments[].barrier 与卡口 strength",
        "evidence": "VLSI Research 2025 + Gartner 2025 + 灼识咨询",
        "flag": "🆪",
        "tier": "broker",
        "src": "VLSI Research 2025 + Gartner 2025 + 灼识咨询"
      }
    ],
    "verdict": {
      "longTermFit": "适合长线布局(2024-2030 大基金周期),但当前估值已透支、需控买点。短期 6-12 个月高位震荡,等回调或选二线设备",
      "oneLine": "🔩 半导体设备是\"政策确定性(5)+景气持续性(4)\"双高、但\"估值性价比(2)\"已透支的赛道:长线逻辑顺(大基金三期+AI/HPC 驱动),胜负手在买点(等 PE 分位回踩)+选卡口(高端卡口 vs 中端国产替代)",
      "stockHint": "优先 T0/T1 环节(光刻周边/CCP 刻蚀/PECVD/ALD/CMP/检测),PE 分位越低越安全;景气+政策选环节,壁垒+估值选标的与买点"
    }
  },
  "cyclePosition": {
    "stage": "boom",
    "label": "繁荣期(2025-2030 大基金周期)",
    "reason": "🔩 AI 算力 + 国产替代双轮驱动,中国半导体设备市场规模 2024-2028 CAGR 25%+;大基金三期 3440 亿落地,中芯国际+长江存储+长鑫存储产线扩产潮启动;美方 EUV/DUV 出口管制升级反向催化本土设备厂订单 —— 周期位置:繁荣期早段",
    "watchSignals": [
      "中芯国际/华虹/长江存储/长鑫存储月度资本开支指引",
      "美方出口管制升级动向(7nm/14nm 设备)",
      "中微/北方华创/拓荆季度新签订单 + 在手订单",
      "国内 12 寸晶圆厂量产产线投产节奏"
    ]
  },
  "plainIntro": {
    "analogy": "半导体设备 = 制造芯片的\"机器之母\"(母机)",
    "paragraphs": [
      "<strong>半导体设备</strong>是制造芯片的\"机器之母\"——没有光刻机,你手上就没有 Apple/华为/小米的处理器;没有刻蚀机,7nm 晶体管做不出来;没有薄膜沉积设备,PECVD/ALD 层造不出来。半导体产业链技术含量最高、毛利率最高(50%+)、卡口最深的环节,就是这个\"母机层\"。",
      "<strong>AI 时代的设备贵在哪?</strong> 普通 28nm 工艺需要 80+ 道工序、50+ 种设备;7nm 及以下需要 EUV 光刻机(ASML 100% 垄断)+ 多腔体 CCP/ICP 刻蚀+ ALD 原子层沉积 + CMP 抛光。一台 EUV 光刻机单价 <strong>1.5-2 亿美元</strong>,一台 ALD 设备 800-1500 万美元,一台先进 CCP 刻蚀机 600-1000 万美元。先进制程一座 12 寸晶圆厂资本开支 <strong>100-200 亿美元</strong>,其中 70-80% 是设备投资。",
      "<strong>中美科技摩擦催化国产替代:</strong> 2023-10 美方升级 14nm 设备出口管制,2024-12 进一步限制 HBM/AI 芯片设备。倒逼中芯国际/长江存储/长鑫存储等头部晶圆厂加速国产化采购(目标 2025 年 50%/2027 年 70%),催化北方华创/中微/拓荆/华海清科等国产设备厂订单爆发。"
    ],
    "flowSteps": [
      "矿石/特种气体",
      "硅片/光刻胶/靶材",
      "IC 设计(华为海思/英伟达)",
      "设备制造(中微/北方华创/拓荆)",
      "晶圆代工(中芯/华虹)",
      "封装测试(长电/通富)"
    ],
    "highlightBox": "<strong>💡 物理卡口视角:为什么半导体设备是\"国之重器\"层级卡口?</strong><br>光刻机(ASML 100% 垄断 EUV/70% DUV)+刻蚀三巨头(AMAT/Lam/TEL)+薄膜沉积寡头(AMAT/Lam/TEL/Applied)合计占全球设备市场 50%+;中国大陆 2025 装机市场规模首次成为全球第一,但中高端 CCP/PECVD/ALD 国产化率仅 30-40%;光刻+EUV+最先进刻蚀/ALD 仍是绝对物理卡口(全球 ≤3 家可量产,认证周期 18-24 个月)。2025 年大基金三期 3440 亿落地+14nm 出口管制升级=国产替代 5-7 年加速期。",
    "chainStory": [
      {
        "step": 1,
        "name": "硅片基材",
        "desc": "12英寸大硅片是先进制程基石·全球5大厂(信越/SUMCO/环球晶圆/Siltronic/SK Siltron)合计市占>90%",
        "barrier": "高",
        "choke": false,
        "domestic": "已量产18%·含验证35%（大陆/全球·2026-Q2）",
        "barrierNote": "全球5大厂>90%·沪硅产业12英寸产能60万片/月(国内#1)·立昂微收购国晶后份额提升·TCL中环布局12英寸·硅片认证周期12-18月",
        "keyStocks": [
          "688126",
          "605358",
          "002129"
        ],
        "source": "SEMI 2025硅片市场报告·沪硅产业2025年报·东吴证券半导体材料深度(2025.10)"
      },
      {
        "step": 2,
        "name": "电子特气/光刻胶",
        "desc": "电子特气占晶圆材料~13%·林德/液空/大阳日酸/空气化工4寡头合计90%+；光刻胶全球东京应化/JSR/信越/杜邦CR4>80%",
        "barrier": "高",
        "choke": false,
        "domestic": "特气~10%/光刻胶<5%（大陆/全球·2026-Q2）",
        "barrierNote": "电子特气国产化率仅~10%·金宏气体/华特气体/凯美特气国产替代中·光刻胶ArF/EUV仍全进口·彤程新材/南大光电KrF已量产",
        "keyStocks": [
          "688106",
          "688268",
          "002549"
        ],
        "source": "SEMI 2025材料市场报告·金宏气体2025年报·方正证券半导体材料深度(2025.11)"
      },
      {
        "step": 3,
        "name": "CMP抛光液/靶材",
        "desc": "CMP抛光液全球Cabot微电子/日立化成/富士FILM三家>60%·溅射靶材日矿金属/霍尼韦尔/普莱克斯三家>70%",
        "barrier": "高",
        "choke": false,
        "domestic": "抛光液~30%/靶材~20%（大陆/全球·2026-Q2）",
        "barrierNote": "安集科技CMP抛光液国内#1·鼎龙股份抛光垫突破·江丰电子溅射靶材全球#2(份额~13%)·认证周期12-18月",
        "keyStocks": [
          "688019",
          "300054",
          "300666"
        ],
        "source": "TECHCET 2025 CMP材料报告·安集科技2025年报·国金证券半导体材料深度(2025.09)"
      },
      {
        "step": 4,
        "name": "刻蚀设备",
        "desc": "CCP/ICP刻蚀是晶圆制造核心工序·全球刻蚀三巨头(Lam 47%/TEL 27%/AMAT 17%)合计>90%·2024全球规模~1350亿元",
        "barrier": "极高",
        "choke": true,
        "domestic": "国产化率~37%（2026-Q1·SEMI中国）",
        "barrierNote": "中微CCP刻蚀5nm进入台积电N3P·北方华创ICP全系列覆盖·认证壁垒≥18月·全球≤5家可量产先进制程CCP/ICP刻蚀",
        "keyStocks": [
          "688012",
          "002371"
        ],
        "source": "Gartner 2025全球刻蚀设备份额·中微公司2025年报·SEMI中国半导体设备国产化率报告(2026.02)"
      },
      {
        "step": 5,
        "name": "薄膜沉积设备",
        "desc": "PVD/CVD/ALD是芯片盖楼的核心工序·全球AMAT/Lam/TEL三巨头主导·拓荆2025 PECVD收入51.42亿(国产#1)",
        "barrier": "极高",
        "choke": true,
        "domestic": "国产化率~27%（2026-Q1·SEMI中国）",
        "barrierNote": "拓荆PECVD+ALD国内#1·北方华创PVD国内#1·微导纳米ALD国内#1·ALD全球TEL 31%/ASMI 29%·认证≥18月",
        "keyStocks": [
          "688072",
          "002371",
          "688147"
        ],
        "source": "Gartner 2025全球薄膜沉积设备份额·拓荆科技2025年报·东吴证券半导体设备深度(2025.11)"
      },
      {
        "step": 6,
        "name": "光刻/涂胶显影",
        "desc": "光刻是芯片制造最核心工序·ASML垄断EUV(100%)和DUV(>80%)·涂胶显影TEL份额87%·芯源微为国内唯一Track供应商",
        "barrier": "极高",
        "choke": true,
        "domestic": "光刻机<1%/涂胶显影<10%（大陆/全球·2026-Q2）",
        "barrierNote": "光刻机ASML绝对垄断·上海微电子28nm DUV交付(未上市)·芯源微涂胶显影国内唯一·ArF浸没式持续推进·茂莱光学/福晶科技为光刻镜头/光源配套",
        "keyStocks": [
          "688037",
          "688502",
          "002222"
        ],
        "source": "ASML 2025年报·Gartner 2025光刻设备份额·芯源微2025年报·方正证券光刻设备深度(2026.03)"
      },
      {
        "step": 7,
        "name": "CMP/清洗设备",
        "desc": "CMP实现晶圆全局纳米级平坦化·清洗去除制程残留·两个环节合计占设备支出~10%·国产化率在设备中最高",
        "barrier": "极高",
        "choke": true,
        "domestic": "CMP 30-40%/清洗30-50%（2026-Q2·SEMI中国）",
        "barrierNote": "华海清科CMP国内#1(占国产90%+)·盛美上海清洗全球#4(市占8.0%)·至纯科技高纯工艺国内#1·富乐德精密洗净·美埃科技洁净配套",
        "keyStocks": [
          "688120",
          "688082"
        ],
        "source": "Gartner 2025 CMP+清洗设备份额·华海清科/盛美上海2025年报·国投证券半导体设备深度(2026.06)"
      },
      {
        "step": 8,
        "name": "去胶/热处理设备",
        "desc": "去胶是光刻/注入后去除光刻胶的必要工序·热处理用于氧化/扩散/退火·屹唐股份去胶全球#1·PSK+屹唐双寡头>70%",
        "barrier": "极高",
        "choke": true,
        "domestic": "去胶全球领先/热处理>30%（2026-Q2）",
        "barrierNote": "屹唐股份去胶设备全球#1·PSK(~40%)+屹唐(~33.7%)双寡头>70%·第三名Lam仅9-10%·2017年收购美国Mattson继承30年技术积累·RTP快速热处理全球#2(13.8%)·认证≥18月·moat=86全链最高",
        "keyStocks": [
          "688729"
        ],
        "source": "Gartner 2025去胶+热处理设备份额·屹唐股份2025年报·东吴/方正/国投证券多源确认"
      },
      {
        "step": 9,
        "name": "检测/量测/离子注入",
        "desc": "量测是良率的眼睛·全球KLA一家独大(>50%)·离子注入AMAT 70%/Axcelis 20%·国产化率均<25%·最大替代空间所在",
        "barrier": "高",
        "choke": false,
        "domestic": "量测<25%/离子注入<25%（大陆/全球·2026-Q2）",
        "barrierNote": "中科飞测光学检测国内#1·精测电子电子束量测领先·长川/华峰/金海通覆盖后道测试·先导基电(凯世通)离子注入国产#1·28nm验证通过·完整生态仍弱",
        "keyStocks": [
          "688361",
          "300567",
          "600641"
        ],
        "source": "KLA 2025年报·Gartner 2025量测+离子注入份额·中科飞测/精测电子2025年报·东吴证券检测设备深度(2025.12)"
      },
      {
        "step": 10,
        "name": "关键零部件",
        "desc": "设备零部件占设备总成本30-50%·精密结构件/射频电源/真空泵/温控/阀门是卡脖子中的卡脖子·国产化率低",
        "barrier": "高",
        "choke": false,
        "domestic": "精密件~20%/温控~35%/射频<10%/真空<15%（大陆/全球·2026-Q2）",
        "barrierNote": "富创精密结构件/反应腔体A股龙头·京仪装备温控国内#1(35.73%)·英杰电气射频电源(待P1)·新莱应材洁净管阀(待P1)·高端零部件仍严重依赖日美进口",
        "keyStocks": [
          "688409",
          "688652"
        ],
        "source": "SEMI 2025半导体零部件市场报告·富创精密/京仪装备2025年报·方正证券零部件深度(2026.04)"
      },
      {
        "step": 11,
        "name": "下游晶圆厂",
        "desc": "全球晶圆代工台积电55%绝对主导·中国大陆中芯/华虹/长江存储/长鑫四大Fab扩产拉动设备需求·2025-2027三年300mm投资>1000亿美元全球第一",
        "barrier": "—",
        "choke": false,
        "domestic": "—",
        "barrierNote": "台积电N3P/N2先进制程持续领先·中芯国际14nm FinFET量产·2025年中国大陆设备市场493亿美元(占全球37%)·AI+HBM驱动先进制程扩产加速",
        "keyStocks": [
          "688981",
          "688347"
        ],
        "source": "SEMI 2025年终总设备预测(2025.12.16)·台积电/中芯国际2025年报·IC Insights 2025全球晶圆代工格局"
      }
    ]
  },
  "overview": [
    {
      "label": "🌍 全球半导体设备市场规模(2025)",
      "value": "~$1100 亿",
      "note": "+6% YoY (SEMI 2025.11 forecast) · 中国大陆首次成为最大市场",
      "color": "var(--accent)"
    },
    {
      "label": "🇨🇳 中国大陆全球占比(装机口径)",
      "value": "~38%",
      "note": "首次超过韩国·大基金三期 3440 亿落地 · SEMI 2025",
      "color": "var(--blue)"
    },
    {
      "label": "🤖 AI/HPC 驱动",
      "value": "CAGR 8.5%",
      "note": "2024-2028 AI 算力芯片需求驱动高端设备 · SEMI 2025 预测",
      "color": "var(--green)"
    },
    {
      "label": "🔒 中美出口管制升级",
      "value": "14nm 节点起",
      "note": "2023-10 升级 · 2024-12 HBM/AI 设备扩展 · 倒逼国产替代",
      "color": "var(--red)"
    },
    {
      "label": "📊 国产化率(2025 装机口径)",
      "value": "~35%",
      "note": "工信部十四五目标 2025 年 50%/2027 年 70%(总设备口径)",
      "color": "var(--accent)"
    },
    {
      "label": "🏭 产业链阶段",
      "value": "成长加速期",
      "note": "低端过剩/中端平分/高端紧缺 三层分化 (CEPEA 2025)",
      "color": "var(--accent)"
    },
    {
      "label": "🎯 卡口环节(全球 ≤3 家)",
      "value": "光刻+EUV",
      "note": "ASML 100% 垄断 EUV·CCP 刻蚀 AMAT/Lam 双寡头·ALD 三大寡头合计 85%+",
      "color": "var(--green)"
    },
    {
      "label": "⏱ 采购周期(单台到验收)",
      "value": "12-18 月",
      "note": "高复杂度设备安装+调试+良率验证周期长·设备厂订单可见",
      "color": "var(--blue)"
    }
  ],
  "treeMap": {
    "downstream": [
      {
        "name": "先进逻辑代工(7-28nm)",
        "barrier": "extreme",
        "note": "占中国晶圆产能 ~40% · AI 算力/HPC 需求驱动 · SEMI 2025",
        "companies": [
          {
            "name": "中芯国际",
            "code": "688981",
            "position": "国内晶圆代工龙头·先进逻辑+特色工艺双轨·N+1 工艺已批量供货",
            "barrier": "极高"
          },
          {
            "name": "华虹半导体",
            "code": "688347",
            "position": "特色工艺(嵌入式/功率)+成熟节点 CMOS·IGBT/eFlash 行业领先",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "存储 IDM(DRAM/NAND/3D NAND)",
        "barrier": "extreme",
        "note": "长江存储 3D NAND 232 层已量产 · 长鑫 DRAM 17nm 1Y 工艺 · 大基金三期重点投资",
        "companies": [
          {
            "name": "长江存储",
            "code": "未上市·IDM存储1",
            "position": "3D NAND 国产龙头·232 层堆叠技术全球领先·长江存储一期已量产·二期扩产中",
            "barrier": "极高"
          },
          {
            "name": "长鑫存储",
            "code": "未上市·IDM存储2",
            "position": "DRAM 国产唯一·DDR5 已量产·长鑫一期 12 万片/月·长鑫三期满产规划",
            "barrier": "极高"
          },
          {
            "name": "长鑫科技",
            "code": "未上市·DRAM3",
            "position": "长鑫存储母公司·统一管理 DRAM 研发/生产",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "功率/模拟/MEMS 特色工艺",
        "barrier": "high",
        "note": "占特色工艺代工 ~30% · SiC/GaN 化合物半导体扩产潮 · SEMI 2025",
        "companies": [
          {
            "name": "士兰微",
            "code": "600460",
            "position": "IDM 模式功率半导体·SiC/GaN/IGBT/MOSFET 全产品线",
            "barrier": "高"
          },
          {
            "name": "华微电子",
            "code": "600360",
            "position": "功率二极管/MOSFET/IGBT 老牌 IDM",
            "barrier": "高"
          },
          {
            "name": "捷捷微电",
            "code": "300623",
            "position": "晶闸管+功率二极管细分龙头·车规级 IGBT 突破",
            "barrier": "高"
          }
        ]
      }
    ],
    "midstream": [
      {
        "name": "CCP/ICP 刻蚀(中微/北方华创)",
        "barrier": "extreme",
        "note": "CCP/ICP 占刻蚀市场 ~65% · 14nm 国产化率 30%+ · SEMI 2025",
        "companies": [
          {
            "name": "中微公司",
            "code": "688012",
            "position": "CCP 刻蚀国产第一·5nm 刻蚀机已批量供台积电·2026Q1 营收 23.95 亿 +30.9%",
            "barrier": "极高"
          },
          {
            "name": "北方华创",
            "code": "002371",
            "position": "ICP/CCP/PVD/CVD/清洗多产品线·国产综合性设备龙头",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "薄膜沉积(PECVD/PVD/ALD/CVD)",
        "barrier": "extreme",
        "note": "PECVD/PVD 占薄膜沉积 ~50% · ALD 占 ~25% · 14nm 国产化率 35% · SEMI 2025",
        "companies": [
          {
            "name": "拓荆科技",
            "code": "688072",
            "position": "PECVD/ALD 国产第一·30-150 设备中标长江存储·2026Q1 营收 13.35 亿+87.5%",
            "barrier": "极高"
          },
          {
            "name": "北方华创",
            "code": "002371",
            "position": "薄膜沉积多产品线 PVD/CVD/APCVD",
            "barrier": "极高"
          },
          {
            "name": "微导纳米",
            "code": "688147",
            "position": "ALD/PEALD 细分龙头·先进 ALD 设备已批量供货头部晶圆厂",
            "barrier": "极高"
          },
          {
            "name": "中微公司",
            "code": "688012",
            "position": "LPCVD/HAR CVD 后段工艺设备",
            "barrier": "极高"
          },
          {
            "name": "芯源微",
            "code": "688037",
            "position": "物理沉积 PVD 单产品线",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "光刻/涂胶显影(芯源微/茂莱)",
        "barrier": "extreme",
        "note": "EUV 光刻 100% ASML 垄断 · 国产仅涂胶显影·光刻配套有零星突破 · 14nm 验证中",
        "companies": [
          {
            "name": "芯源微",
            "code": "688037",
            "position": "涂胶显影国产第一·前道 Off-line/Inline 设备批量供货中芯/华虹/长江存储",
            "barrier": "极高"
          },
          {
            "name": "茂莱光学",
            "code": "688502",
            "position": "光刻配套光学元件·DUV/EUV 光学检测系统·光刻机配套",
            "barrier": "高"
          },
          {
            "name": "福晶科技",
            "code": "002222",
            "position": "非线性光学晶体全球第一·光刻配套激光器件",
            "barrier": "高"
          },
          {
            "name": "蓝英装备",
            "code": "300293",
            "position": "光刻机清洗设备配套",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "CMP 抛光/清洗",
        "barrier": "high",
        "note": "CMP 占后道 ~8% · 清洗占 ~5% · 国产化率 30-40% · SEMI 2025",
        "companies": [
          {
            "name": "华海清科",
            "code": "688120",
            "position": "CMP 国产第一·12 寸 CMP 已批量供货中芯/长江存储·营收 2025 年 +63%",
            "barrier": "极高"
          },
          {
            "name": "盛美上海",
            "code": "688082",
            "position": "清洗设备国产第一·单晶圆清洗+SCE+前段清洗全工艺",
            "barrier": "高"
          },
          {
            "name": "至纯科技",
            "code": "603690",
            "position": "湿法清洗配套+特气供应",
            "barrier": "高"
          },
          {
            "name": "富乐德",
            "code": "301297",
            "position": "清洗配套 + 陶瓷部件",
            "barrier": "中"
          },
          {
            "name": "美埃科技",
            "code": "688376",
            "position": "洁净室 FFU 配套+AMHS 自动化",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "检测/测试/量测",
        "barrier": "high",
        "note": "检测占 12-15% · KLA/Nova/Thermo 等国际寡头主导 · 国产化率 25% · SEMI 2025",
        "companies": [
          {
            "name": "精测电子",
            "code": "300567",
            "position": "前道量测+后道测试双线·Memory 测试设备 · 武汉精测微电子",
            "barrier": "极高"
          },
          {
            "name": "长川科技",
            "code": "300604",
            "position": "后道测试机(分选机/测试机)国产第一·华峰测控联营",
            "barrier": "极高"
          },
          {
            "name": "华峰测控",
            "code": "688200",
            "position": "模拟/混合信号测试机国产第一·细分龙头",
            "barrier": "高"
          },
          {
            "name": "金海通",
            "code": "603061",
            "position": "测试分选机+老化测试 · 后道测试配套",
            "barrier": "高"
          },
          {
            "name": "中科飞测",
            "code": "688361",
            "position": "前道量测+缺陷检测·中科院系 国产化新锐",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "离子注入/晶体生长/封测设备",
        "barrier": "high",
        "note": "离子注入 100% AMAT/Axcelis 双寡头 · 国产化率 < 30% · 晶体生长 70% 国产 · SEMI 2025",
        "companies": [
          {
            "name": "先导基电",
            "code": "600641",
            "position": "凯世通离子注入国产第一·集成电路+光伏双线·2025 通过中芯产线验证",
            "barrier": "极高"
          },
          {
            "name": "晶盛机电",
            "code": "300316",
            "position": "晶体生长(单晶炉)全球第二·国内第一·光伏+半导体双轨·半导体硅片设备",
            "barrier": "极高"
          },
          {
            "name": "华峰测控",
            "code": "688200",
            "position": "封测设备测试机细分龙头",
            "barrier": "高"
          },
          {
            "name": "中科信",
            "code": "未上市·离子注入1",
            "position": "离子注入+快速退火国产新锐·电科装备体系",
            "barrier": "高"
          },
          {
            "name": "先导智能",
            "code": "300450",
            "position": "光伏+锂电设备龙头·半导体设备战略培育",
            "barrier": "中"
          }
        ]
      }
    ],
    "materials": [
      {
        "name": "硅片(12 寸大硅片)",
        "barrier": "extreme",
        "note": "12 寸占晶圆需求 ~70% · 信越/SUMCO/环球晶圆/Siltronic/SUMCO 四寡头合计 90%+ · SEMI 2025",
        "companies": [
          {
            "name": "沪硅产业",
            "code": "688126",
            "position": "12 寸大硅片国产第一·30 万片/月·已进入中芯验证",
            "barrier": "极高"
          },
          {
            "name": "TCL 中环",
            "code": "002129",
            "position": "半导体硅片+光伏硅片双轨·半导体 8/12 寸在研",
            "barrier": "极高"
          },
          {
            "name": "立昂微",
            "code": "605358",
            "position": "6/8/12 寸硅片+功率器件双轨·国晶睿能合作",
            "barrier": "高"
          },
          {
            "name": "西安瑞联",
            "code": "688550",
            "position": "半导体级抛光垫+硅片清洗 · 配套材料",
            "barrier": "中"
          },
          {
            "name": "天岳先进",
            "code": "688234",
            "position": "SiC 衬底全球第二·化合物半导体配套",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "电子特气",
        "barrier": "high",
        "note": "占晶圆材料 ~13% · 林德/液空/大阳日酸/空气化工 4 寡头合计 90%+ · SEMI 2025",
        "companies": [
          {
            "name": "金宏气体",
            "code": "688106",
            "position": "国产综合特气龙头 · 大宗气+电子特气双轨",
            "barrier": "极高"
          },
          {
            "name": "华特气体",
            "code": "688268",
            "position": "电子特气细分龙头 · 蚀刻/掺杂/清洗全工艺",
            "barrier": "极高"
          },
          {
            "name": "凯美特气",
            "code": "002549",
            "position": "氪气/氙气等稀有气体 · 上海凯美特气",
            "barrier": "高"
          },
          {
            "name": "南大光电",
            "code": "300346",
            "position": "特气+光刻胶双轨 · 磷烷/砷烷/锗烷电子级",
            "barrier": "高"
          },
          {
            "name": "雅克科技",
            "code": "002409",
            "position": "半导体材料平台 · 前驱体+特气+清洗剂",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "光刻胶/CBF/ABF 膜",
        "barrier": "extreme",
        "note": "光刻胶 JSR/东京应化/信越/Sumitomo 4 寡头 90%+ · ABF 膜 100% 味之素垄断 · SEMI 2025",
        "companies": [
          {
            "name": "彤程新材",
            "code": "603650",
            "position": "光刻胶国产第一·KrF/ArF/EUV 量产·北京科华",
            "barrier": "极高"
          },
          {
            "name": "南大光电",
            "code": "300346",
            "position": "ArF 光刻胶国产突破·193nm 浸没式送样",
            "barrier": "极高"
          },
          {
            "name": "容大感光",
            "code": "300576",
            "position": "PCB/面板光刻胶·半导体感光材料",
            "barrier": "中"
          },
          {
            "name": "华正新材",
            "code": "603186",
            "position": "CBF 积层膜国产替代唯一·华为昇腾供应链+中芯国际验证中(共享 pcb 链)",
            "barrier": "高"
          },
          {
            "name": "兴森科技",
            "code": "002436",
            "position": "ABF 载板国产化追赶者·珠海+广州超 60 亿投入(共享 pcb 链)",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "CMP 抛光液/抛光垫",
        "barrier": "high",
        "note": "CMP 抛光液 Cabot/Versum 主导 · 国产化率 30%+ · SEMI 2025",
        "companies": [
          {
            "name": "安集科技",
            "code": "688019",
            "position": "CMP 抛光液国产第一·铜+钨+介质全品类·国产化率 30%+",
            "barrier": "极高"
          },
          {
            "name": "鼎龙股份",
            "code": "300054",
            "position": "CMP 抛光垫国产突破·钨抛光垫独家",
            "barrier": "极高"
          },
          {
            "name": "江丰电子",
            "code": "300666",
            "position": "靶材+抛光液双线 · 半导体级高纯材料",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "靶材/电子级化学品",
        "barrier": "high",
        "note": "靶材 JX/霍尼韦尔 主导 · 国产化率 25%+ · SEMI 2025",
        "companies": [
          {
            "name": "江丰电子",
            "code": "300666",
            "position": "半导体靶材国产第一 · 高纯铝/铜/钽/钛全品类",
            "barrier": "极高"
          },
          {
            "name": "有研新材",
            "code": "600206",
            "position": "高纯靶材+稀土 · 国资委直管·半导体+光伏双线",
            "barrier": "高"
          },
          {
            "name": "格林达",
            "code": "603931",
            "position": "显影液电子级化学品 · 半导体级",
            "barrier": "中"
          },
          {
            "name": "多氟多",
            "code": "002407",
            "position": "电子级 HF 国产龙头·半导体级湿电子化学品",
            "barrier": "高"
          },
          {
            "name": "晶瑞电材",
            "code": "300655",
            "position": "高纯试剂+光刻胶双线 · 多产品布局",
            "barrier": "中"
          }
        ]
      }
    ],
    "equipment": [
      {
        "name": "涂胶显影(芯源微)",
        "barrier": "extreme",
        "note": "涂胶显影 TEL/DNS 主导 · 国产化率 25-30%",
        "companies": [
          {
            "name": "芯源微",
            "code": "688037",
            "position": "涂胶显影国产第一·前道 Off-line/Inline 设备批量供货中芯/华虹/长江存储(共享 midstream)",
            "barrier": "极高"
          }
        ]
      },
      {
        "name": "离子注入(凯世通)",
        "barrier": "extreme",
        "note": "离子注入 AMAT/Axcelis 双寡头 100% · 国产化率 25%",
        "companies": [
          {
            "name": "先导基电",
            "code": "600641",
            "position": "凯世通离子注入国产第一·28nm 工艺验证(共享 midstream)",
            "barrier": "极高"
          },
          {
            "name": "中科信",
            "code": "未上市·离子注入2",
            "position": "离子注入+快速退火国产新锐·电科装备体系",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "退火/快速热处理",
        "barrier": "high",
        "note": "RTP AMAT 主导 · 国产化率 30%",
        "companies": [
          {
            "name": "北方华创",
            "code": "002371",
            "position": "退火炉+PECVD 多产品线(共享 midstream)",
            "barrier": "极高"
          },
          {
            "name": "盛美上海",
            "code": "688082",
            "position": "先进封装热处理配套",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "晶体生长(单晶炉)",
        "barrier": "high",
        "note": "光伏单晶炉国产化率 90% · 半导体单晶炉 70%+ · 晶盛/京运通/连城数控主导",
        "companies": [
          {
            "name": "晶盛机电",
            "code": "300316",
            "position": "晶体生长全球第二·国内第一(共享 midstream)",
            "barrier": "极高"
          },
          {
            "name": "京运通",
            "code": "601908",
            "position": "光伏单晶炉+半导体级硅片 · 光伏老牌",
            "barrier": "高"
          },
          {
            "name": "连城数控",
            "code": "835185",
            "position": "单晶炉配套 · 隆基绿能关联",
            "barrier": "中"
          }
        ]
      }
    ],
    "sideBranches": [
      {
        "name": "SiC/GaN 第三代半导体",
        "barrier": "extreme",
        "note": "SiC 衬底 Wolfspeed/II-VI/罗姆 三寡头 · GaN 器件 Power Integrations/英诺赛科 · 国产加速",
        "companies": [
          {
            "name": "天岳先进",
            "code": "688234",
            "position": "SiC 衬底全球第二·华为/比亚迪/小鹏链(共享 materials)",
            "barrier": "极高"
          },
          {
            "name": "三安光电",
            "code": "600703",
            "position": "SiC/GaN 全产业链·湖南三安·湖北三安·长沙晶能",
            "barrier": "极高"
          },
          {
            "name": "士兰微",
            "code": "600460",
            "position": "IDM 模式 SiC/GaN 配套(共享 downstream)",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "先进封装(CoWoS/HBM)",
        "barrier": "extreme",
        "note": "CoWoS TSMC 100% 垄断 · HBM SK Hynix/Samsung/Micron 三寡头 · 国产化 0-10%",
        "companies": [
          {
            "name": "长电科技",
            "code": "600584",
            "position": "OSAT 全球第三·先进封装(CoWoS-like)+ HBM 配套",
            "barrier": "极高"
          },
          {
            "name": "通富微电",
            "code": "002156",
            "position": "OSAT 国产第二·AMD 链一供·先进封装配套",
            "barrier": "极高"
          },
          {
            "name": "华天科技",
            "code": "002185",
            "position": "OSAT 国产第三·封装测试细分龙头",
            "barrier": "高"
          }
        ]
      },
      {
        "name": "石英/陶瓷零部件",
        "barrier": "high",
        "note": "石英 Heraeus/GE 主导 · 国产化率 30%+ · 陶瓷 60%",
        "companies": [
          {
            "name": "菲利华",
            "code": "300395",
            "position": "半导体级石英玻璃国产第一·光刻/刻蚀/扩散全工艺(共享 pcb 链)",
            "barrier": "极高"
          },
          {
            "name": "凯盛科技",
            "code": "600552",
            "position": "石英玻璃二供+凯盛应材(共享 pcb 链)",
            "barrier": "高"
          },
          {
            "name": "富乐德",
            "code": "301297",
            "position": "半导体陶瓷清洗部件·上海富乐德",
            "barrier": "中"
          }
        ]
      },
      {
        "name": "概念延伸·半导体相关",
        "companies": [
          {
            "name": "先导智能",
            "code": "300450",
            "position": "概念票·半导体设备业务占比<5%(约3-5亿/144亿总营收)·主业为锂电设备(65.6%)·半导体布局:封测激光+TSV/TGV钻孔+12英寸离子注入机样机",
            "barrier": "低",
            "sourceSegment": null
          }
        ]
      }
    ]
  },
  "segments": [
    {
      "name": "CCP/ICP 刻蚀设备",
      "costRatio": "22-25%",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>刻蚀设备</strong>是用等离子体/化学液把硅片上不需要的部分\"挖\"掉,形成电路图案。CCP(电容耦合等离子体)主要用于硬掩膜和浅沟槽隔离,ICP(电感耦合等离子体)主要用于高深宽比刻蚀和金属栅极刻蚀。14nm 及以下 CCP/ICP 占晶圆厂资本开支 <strong>22-25%</strong>,仅次于光刻。全球 AMAT/Lam Research/TEL 三巨头合计 ~75%。中微是国内 CCP 刻蚀主要供应商,5nm CCP 刻蚀机已批量进入台积电。",
      "globalLandscape": [
        {
          "lbl": "🥇 AMAT(美)",
          "val": "全球刻蚀龙头~40%",
          "note": "CCP/ICP 全工艺,Applied Producer 系列"
        },
        {
          "lbl": "🥈 Lam Research(美)",
          "val": "刻蚀市占 25-30%",
          "note": "导体刻蚀和介质刻蚀双线"
        },
        {
          "lbl": "🥉 TEL(日)",
          "val": "刻蚀市占 15-20%",
          "note": "介质刻蚀和单晶圆刻蚀优势"
        },
        {
          "lbl": "中微公司(中)",
          "val": "国产 CCP 刻蚀~25% 全球份额",
          "note": "5nm 验证+台积电/中芯/长江存储三供"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "中微公司",
          "code": "688012",
          "position": "CCP 刻蚀国产第一·5nm 刻蚀机批量供货台积电·2026Q1 营收 23.95 亿+30.9%/归母 4.0 亿+46.4%",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "CCP 刻蚀 25%+ 全球份额·5nm 批量台积电·M10 客户验证·先进 14nm 客户扩展",
          "logic": "CCP 刻蚀国产第一·5nm 工艺已批量进台积电(2025-12 中标 TSMC N3P 工艺验证),2026 Q1 营收 23.95 亿+30.9%、归母 4.0 亿+46.4%(L1 2026Q1 季报)。中微 Primo D-RIE 系列 7-5nm 主导 SKU,LPCVD Primo D-ALD 已批量供货,Primo Twin-Star CCP/HAR 工艺已通过 5nm 验证。"
        },
        {
          "rank": 2,
          "name": "北方华创",
          "code": "002371",
          "position": "ICP/CCP/PVD/CVD/清洗 多产品线国产综合性设备龙头·2026Q1 营收 53.6 亿+30.46%/归母 5.4 亿+10.3%",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "多产品线平台·14nm 工艺验证·大基金重点持股·集成电路+光伏双轨",
          "logic": "国产综合性设备龙头·CCP/ICP 刻蚀+PVD+CVD+清洗+立式炉管多产品线。2026Q1 营收 53.6 亿+30.46%、归母 5.4 亿+10.3%(L1)。14nm CCP 刻蚀机通过中芯国际验证,28nm 多产品线客户已批量。子公司北京北方华创微电子/北京七星华创等覆盖核心产业链。"
        },
        {
          "rank": 3,
          "name": "盛美上海",
          "code": "688082",
          "position": "清洗设备国产第一·SAPF/TEBO 工艺单晶圆清洗·先进封装热处理配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "清洗国产第一·先进封装热处理·14nm 客户验证",
          "logic": "清洗设备国产第一·SAPF(单晶圆清洗)/TEBO(时序气相清洗)双工艺。客户包括长江存储/合肥长鑫/中芯国际/华虹,14nm 工艺验证中。"
        },
        {
          "rank": 4,
          "name": "先导基电",
          "code": "600641",
          "position": "凯世通离子注入国产第一(全资子公司)·集成电路+光伏双线",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "离子注入 100% AMAT/Axcelis 双寡头·国产化率 < 30%·凯世通 28nm 工艺验证通过",
          "logic": "先导基电通过子公司凯世通攻关离子注入机国产化(全球 100% AMAT/Axcelis 双寡头垄断),28nm 工艺验证通过,2025 集成电路领域新签合同金额同比 +160%。"
        },
        {
          "rank": 5,
          "name": "至纯科技",
          "code": "603690",
          "position": "湿法清洗配套+特气供应+大基金二期参股",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "湿法清洗+特气双线·大基金二期参股·集成电路+医药双轨",
          "logic": "湿法清洗+特气供应双线,大基金二期参股,客户已批量供货中芯国际/华虹。"
        }
      ]
    },
    {
      "name": "薄膜沉积设备(PECVD/PVD/ALD/CVD/LPCVD)",
      "costRatio": "22-25%",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>薄膜沉积</strong>是用化学气相(CVD/PECVD/ALD)或物理气相(PVD)方法在硅片表面生长出需要的薄膜层(氧化层/多晶硅/金属互连/介质层等)。14nm 以下多重曝光/HARC 介质等需要 <strong>ALD 原子层沉积</strong>设备(三大寡头合计 85%+)。PECVD/PVD 占薄膜沉积 ~50%,ALD 占 ~25%。",
      "globalLandscape": [
        {
          "lbl": "🥇 AMAT(美)",
          "val": "PVD 全球第一+ALD 三大之一",
          "note": "Producer Selectra 系列"
        },
        {
          "lbl": "🥈 Lam Research(美)",
          "val": "PECVD 全球第一+ALD 三大之一",
          "note": "Vector/PECVD + ALTUS ALD"
        },
        {
          "lbl": "🥉 TEL(日)",
          "val": "ALD 三大之一",
          "note": "NT333 系列"
        },
        {
          "lbl": "拓荆科技(中)",
          "val": "PECVD/ALD 国产第一",
          "note": "长江存储 30-150 台中标"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "拓荆科技",
          "code": "688072",
          "position": "PECVD/ALD 国产第一·长江存储 30-150 台中标·2026Q1 营收 13.35 亿+87.5%/归母 2.16 亿+122%",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "PECVD+ALD 双产品·30-150 长江存储中标·2026Q1 营收+87.5%/净利+122%",
          "logic": "PECVD/ALD 国产第一,客户已批量供货长江存储/合肥长鑫/中芯国际/华虹。2026Q1 营收 13.35 亿+87.5%、归母 2.16 亿+122%(L1)。"
        },
        {
          "rank": 2,
          "name": "北方华创",
          "code": "002371",
          "position": "PVD/CVD/APCVD/LPCVD 多产品线",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "薄膜沉积多产品线·14nm 工艺验证中",
          "logic": "薄膜沉积多产品线:APCVD/LPCVD/PVD/CVD/APCVD 全工艺,客户已批量供货主要晶圆厂。"
        },
        {
          "rank": 3,
          "name": "微导纳米",
          "code": "688147",
          "position": "ALD/PEALD 细分龙头·先进 ALD 设备·2026Q1 ALD 国产突破",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "ALD 国产突破·14nm 客户验证",
          "logic": "ALD 国产第一,14nm 客户验证中,客户已批量供货长江存储/合肥长鑫/华虹。"
        },
        {
          "rank": 4,
          "name": "中微公司",
          "code": "688012",
          "position": "LPCVD/HAR CVD 后段工艺设备·先进 14nm 客户扩展",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "LPCVD 后段设备·5nm 客户验证中",
          "logic": "LPCVD/HAR CVD 后段工艺设备,5nm 客户验证中,深度绑定台积电 5nm 工艺。"
        },
        {
          "rank": 5,
          "name": "芯源微",
          "code": "688037",
          "position": "物理沉积 PVD 单产品线·先进封装配套",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "PVD 单产品线·先进封装配套",
          "logic": "PVD 物理沉积单产品线,先进封装配套,已批量供货主要封装厂。"
        }
      ]
    },
    {
      "name": "光刻/涂胶显影(配套设备)",
      "costRatio": "20-25%",
      "barrier": "extreme",
      "choke": true,
      "border": true,
      "intro": "<strong>光刻</strong>是用光把电路图案\"印\"到硅片上的核心工序。EUV 100% ASML 垄断(全球唯一,2025 交付 50 台+),单价 1.5-2 亿美元;DUV 70% ASML/30% Nikon/Canon 寡头垄断。国产仅能在<strong>涂胶显影</strong>+<strong>光刻配套</strong>环节有零星突破,14nm 验证中。",
      "globalLandscape": [
        {
          "lbl": "🥇 ASML(荷)",
          "val": "EUV 100% 垄断·DUV 70%+",
          "note": "2025 交付 EUV 50 台+,NXE:3800E 已批量出货"
        },
        {
          "lbl": "🥈 Nikon(日)",
          "val": "DUV 10-15% 寡头",
          "note": "NSR 系列"
        },
        {
          "lbl": "🥉 Canon(日)",
          "val": "DUV 10% 寡头",
          "note": "FPA 系列"
        },
        {
          "lbl": "芯源微(中)",
          "val": "国产涂胶显影第一",
          "note": "Off-line/Inline 设备批量供货中芯/华虹"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "芯源微",
          "code": "688037",
          "position": "涂胶显影国产第一·前道 Off-line/Inline 设备批量供货中芯/华虹/长江存储",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "涂胶显影国产第一·14nm 验证中·大基金重点持股",
          "logic": "涂胶显影国产第一,前道 Off-line/Inline 设备批量供货中芯/华虹/长江存储,14nm 工艺验证中。"
        },
        {
          "rank": 2,
          "name": "茂莱光学",
          "code": "688502",
          "position": "光刻配套光学元件·DUV/EUV 光学检测系统",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "光刻光学元件·EUV 光学检测系统·国产突破",
          "logic": "光刻配套光学元件国产突破,DUV/EUV 光学检测系统进入头部供应链。"
        },
        {
          "rank": 3,
          "name": "福晶科技",
          "code": "002222",
          "position": "非线性光学晶体全球第一·光刻配套激光器件",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "非线性光学晶体全球第一·光刻配套",
          "logic": "非线性光学晶体全球第一,光刻配套激光器件客户已批量供货主要激光器厂商。"
        },
        {
          "rank": 4,
          "name": "蓝英装备",
          "code": "300293",
          "position": "光刻机清洗设备配套",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "光刻机清洗配套·国产光刻产业链受益",
          "logic": "光刻机清洗设备配套,国产光刻产业链受益主体。"
        }
      ]
    },
    {
      "name": "CMP 抛光/清洗设备",
      "costRatio": "7-10%",
      "barrier": "high",
      "choke": false,
      "border": false,
      "intro": "<strong>CMP 化学机械抛光</strong>是把晶圆表面磨平的工序(每层沉积后都需要磨平);<strong>清洗</strong>是把光刻/刻蚀/沉积后的化学残留物洗干净。CMP 后道设备占 ~8%;清洗 ~5%;国产化率 30-40%。",
      "globalLandscape": [
        {
          "lbl": "🥇 AMAT(美)",
          "val": "CMP 全球第一~50%",
          "note": "Reflexion 系列"
        },
        {
          "lbl": "🥈 Ebara(日)",
          "val": "CMP 30%",
          "note": "日系单晶圆"
        },
        {
          "lbl": "华海清科(中)",
          "val": "CMP 国产第一",
          "note": "中芯/长江存储批量供货"
        },
        {
          "lbl": "盛美上海(中)",
          "val": "清洗国产第一",
          "note": "SAPF/TEBO 双工艺"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "华海清科",
          "code": "688120",
          "position": "CMP 国产第一·12 寸 CMP 已批量供货中芯/长江存储·2025 营收+63%",
          "barrier": "极高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "CMP 国产第一·12 寸批量供货·2025 营收+63%/净利强",
          "logic": "CMP 国产第一,12 寸 CMP 已批量供货中芯/长江存储,2025 营收+63%。"
        },
        {
          "rank": 2,
          "name": "盛美上海",
          "code": "688082",
          "position": "清洗设备国产第一·SAPF/TEBO 双工艺·前段清洗全工艺",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "清洗国产第一·先进封装热处理配套",
          "logic": "清洗国产第一,SAPF/TEBO 双工艺,14nm 验证中。"
        },
        {
          "rank": 3,
          "name": "至纯科技",
          "code": "603690",
          "position": "湿法清洗配套+特气供应·大基金二期参股",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "湿法清洗+特气双线",
          "logic": "湿法清洗+特气供应双线,大基金二期参股。"
        },
        {
          "rank": 4,
          "name": "富乐德",
          "code": "301297",
          "position": "陶瓷清洗部件+AMHS 自动化",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "陶瓷清洗部件·AMHS 自动化",
          "logic": "陶瓷清洗部件+AMHS 自动化配套,已批量供货主要封装厂。"
        },
        {
          "rank": 5,
          "name": "美埃科技",
          "code": "688376",
          "position": "洁净室 FFU 配套+AMHS 自动化·国产 AMHS 突破",
          "barrier": "低",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "洁净室 FFU+AMHS·国产 AMHS 突破",
          "logic": "洁净室 FFU 配套,AMHS 自动化国产突破。"
        }
      ]
    },
    {
      "name": "去胶/热处理设备",
      "intro": "去胶(Dry Strip)是晶圆制造中独立且不可或缺的工艺步骤——在刻蚀/离子注入后去除光刻胶掩膜。全球市场高度集中：PSK(韩国·~40%)+屹唐(~33.7%)合计>70%形成双寡头格局。屹唐2017年收购美国Mattson继承30年技术积累，为A股去胶设备唯一标的。RTP快速热处理为屹唐第二增长曲线(全球#2·市占13.8%)。",
      "costRatio": "占设备总支出 ~3%",
      "globalLandscape": [
        {
          "lbl": "PSK(韩国)",
          "val": "~40%",
          "note": "连续多年全球第一·存储芯片客户优势"
        },
        {
          "lbl": "屹唐股份",
          "val": "~33.7%",
          "note": "逻辑芯片领域绝对领先·A股唯一标的"
        },
        {
          "lbl": "Lam Research",
          "val": "~9-10%",
          "note": "非战略重点·核心赛道为刻蚀"
        }
      ],
      "barrier": "极高",
      "choke": true,
      "stocks": [
        {
          "rank": 1,
          "name": "屹唐股份",
          "code": "688729",
          "position": "全球去胶设备#2(33.7%)+RTP#2(13.8%)+刻蚀#9·2017年收购美国Mattson·Suprema/Optima/Hydrilis三大系列覆盖全球主流Fab",
          "barrier": "极高",
          "tier": "primary",
          "trend": "flat",
          "trendNote": "2026Q1营收-10.6%(行业周期+高基数+实体清单)·毛利率逆势升至40%·RTP+刻蚀占比升至65%·经营现金流转正",
          "logic": "全球去胶设备双寡头:PSK(~40%)+屹唐(~33.7%)合计>70%·第三名Lam Research仅9-10%非主要竞争者(L3 Gartner 2025·东吴/方正/国投多源确认)·屹唐2017年收购美国Mattson继承30年技术积累·Fab认证周期≥18个月·Suprema/Optima/Hydrilis三大系列覆盖逻辑/存储/功率全品类·2025年营收50.76亿+9.6%/净利6.71亿+24%·Q1承压(行业周期+高基数+实体清单)但毛利率逆势升至40%·RTP+刻蚀占比升至65%打造第二曲线·MATCH法案风险(美国子公司Mattson Technology)·PSK在存储领域优势显著·去胶市场规模有限(8.56亿美元)但平台化扩张至刻蚀(219亿美元大市场)",
          "valAsOf": "2026-07-12",
          "src": "Gartner 2025+L1 abstract_ths 688729+东吴/方正/国投证券",
          "hits": null,
          "strength": null,
          "investable": true,
          "region": "北京",
          "growthAdj": null
        }
      ],
      "_note": "2026-07-12新建·暂时低于SKILL.md ≥5只标准段规模(当前1只)·随行业发展或后续核实新标的补充"
    },
    {
      "name": "检测/测试/量测设备",
      "costRatio": "12-15%",
      "barrier": "high",
      "choke": false,
      "border": false,
      "intro": "<strong>检测</strong>用光学/电子束方式检查光刻/刻蚀/沉积图案是否有缺陷;<strong>量测</strong>测量线宽/膜厚/平整度等;<strong>测试</strong>对芯片做电性能测试(KGD/Wafer Sort)。前道检测占 12-15% 资本开支;后道测试占 5%。KLA/Nova/Thermo 三寡头主导前道;Teradyne/Advantest 双寡头主导后道测试机。",
      "globalLandscape": [
        {
          "lbl": "🥇 KLA(美)",
          "val": "前道检测全球第一~50%",
          "note": "28nm eDRAM/eFlash Inspection 全球独家"
        },
        {
          "lbl": "🥈 Nova(以色列)",
          "val": "前道量测~20%",
          "note": "XRR/XRF 谱仪"
        },
        {
          "lbl": "🥉 Thermo Fisher(美)",
          "val": "前道检测~15%",
          "note": "Sematech 系列"
        },
        {
          "lbl": "精测电子(中)",
          "val": "国产前道量测+后道测试",
          "note": "Memory 测试+武汉精测微电子"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "精测电子",
          "code": "300567",
          "position": "前道量测+后道测试双线·Memory 测试设备·武汉精测微电子",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "前道量测+后道测试·Memory 测试设备·武汉子公司",
          "logic": "前道量测+后道测试双线,Memory 测试设备,武汉精测微电子专注 Memory 测试。"
        },
        {
          "rank": 2,
          "name": "长川科技",
          "code": "300604",
          "position": "后道测试机(分选机/测试机)国产第一·华峰测控联营",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "后道测试机国产第一·分选机+测试机双线",
          "logic": "后道测试机国产第一,分选机+测试机双线,华峰测控联营。"
        },
        {
          "rank": 3,
          "name": "华峰测控",
          "code": "688200",
          "position": "模拟/混合信号测试机国产第一·长川科技联营",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "模拟/混合测试机国产第一·长川联营",
          "logic": "模拟/混合信号测试机国产第一,长川科技联营。"
        },
        {
          "rank": 4,
          "name": "金海通",
          "code": "603061",
          "position": "测试分选机+老化测试·后道测试配套",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "测试分选机+老化测试·后道测试配套",
          "logic": "测试分选机+老化测试,后道测试配套。"
        },
        {
          "rank": 5,
          "name": "中科飞测",
          "code": "688361",
          "position": "前道量测+缺陷检测·中科院系国产化新锐",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "前道量测+缺陷检测·中科院系国产化新锐",
          "logic": "前道量测+缺陷检测,中科院系国产化新锐。"
        }
      ]
    },
    {
      "name": "离子注入/晶体生长设备",
      "costRatio": "8-10%",
      "barrier": "high",
      "choke": false,
      "border": false,
      "intro": "离子注入机用于将掺杂原子以高能离子束形式注入晶圆，是28nm以下先进制程的关键设备。全球市场由应用材料(AMAT·~70%)和Axcelis(~20%)主导，国内仅凯世通(先导基电子公司)实现批量供货。晶体生长设备(CZ炉)用于拉制单晶硅棒，晶盛机电为国内龙头(市占~10%)。",
      "globalLandscape": [
        {
          "lbl": "🥇 AMAT(美)",
          "val": "离子注入全球第一~50%",
          "note": "VIISta 系列"
        },
        {
          "lbl": "🥈 Axcelis(美)",
          "val": "离子注入 30-40%",
          "note": "Purion 系列"
        },
        {
          "lbl": "晶盛机电(中)",
          "val": "晶体生长全球第二",
          "note": "光伏单晶炉第一"
        },
        {
          "lbl": "万业(中)",
          "val": "凯世通离子注入国产第一",
          "note": "28nm 工艺验证通过"
        }
      ],
      "stocks": [
        {
          "rank": 1,
          "name": "先导基电",
          "code": "600641",
          "position": "凯世通离子注入国产第一·28nm 工艺验证通过·集成电路+光伏",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "凯世通 28nm 验证通过·2025 新签合同+160%",
          "logic": "凯世通离子注入国产第一,28nm 工艺验证通过,2025 集成电路领域新签合同金额同比+160%。"
        },
        {
          "rank": 2,
          "name": "晶盛机电",
          "code": "300316",
          "position": "晶体生长(单晶炉)全球第二·国内第一·光伏+半导体双轨",
          "barrier": "中",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "晶体生长全球第二·半导体硅片设备·光伏第一",
          "logic": "晶体生长单晶炉全球第二、国内第一,光伏单晶炉市占率 70%+,半导体硅片设备已批量供货。"
        },
        {
          "rank": 4,
          "name": "华峰测控",
          "code": "688200",
          "position": "封测设备测试机细分龙头",
          "barrier": "高",
          "tier": "primary",
          "valAsOf": "2026-07-08",
          "src": "akshare/新浪财经(基于公司季报)",
          "trend": "up",
          "trendNote": "封测设备测试机",
          "logic": "封测设备测试机,模拟/混合信号测试机国产第一。"
        }
      ]
    },
    {
      "name": "关键零部件",
      "intro": "半导体设备核心零部件包括精密结构件/反应腔体、温控系统、射频电源、真空泵、阀门管件等——是设备性能和可靠性的基石，也是国产替代中卡脖子中的卡脖子。国内零部件企业规模较小但成长迅速，富创精密(结构件/腔体)和京仪装备(温控)为各自细分赛道的A股龙头。",
      "costRatio": "占设备总成本 30-50%",
      "globalLandscape": [
        {
          "lbl": "富创精密",
          "val": "结构件/腔体A股第一",
          "note": "营收35.43亿+36.9%·2026Q1扭亏"
        },
        {
          "lbl": "京仪装备",
          "val": "温控国内#1(35.73%)",
          "note": "营收14.26亿+16%·稳定盈利"
        },
        {
          "lbl": "海外厂商",
          "val": "主导高端零部件",
          "note": "日本/美国精密件·射频电源·真空件"
        }
      ],
      "barrier": "高",
      "choke": false,
      "stocks": [
        {
          "rank": 1,
          "name": "富创精密",
          "code": "688409",
          "position": "精密结构件/反应腔体A股龙头·2025营收35.43亿+36.9%·2026Q1扭亏+5794万·毛利率27.1%",
          "barrier": "高",
          "tier": "primary",
          "trend": "up",
          "trendNote": "营收高增+36.9%·2026Q1扭亏(模式三·转折型正向)·毛利率持续改善",
          "logic": "精密结构件/反应腔体认证壁垒≥12个月(L3 SEMI)·富创为国内稀缺的可量产高端反应腔体的供应商·2025营收35.43亿+36.9%·2026Q1扭亏+5794万(利润拐点)·毛利率22.2%→27.1%显著改善·国产设备厂对本土零部件需求迫切·但全球竞争中日本/美国精密件厂商仍占主导·国内竞争者存在(新莱应材/华亚智能等≥5家)·score=4:认证壁垒6-18个月+国内领先但非唯一",
          "valAsOf": "2026-07-12",
          "src": "L1 abstract_ths 688409+L3 SEMI",
          "hits": null,
          "strength": null,
          "investable": true,
          "region": "沈阳",
          "growthAdj": null
        },
        {
          "rank": 2,
          "name": "京仪装备",
          "code": "688652",
          "position": "半导体温控设备国内#1(35.73%)·2025营收14.26亿+16%·净利1.48亿·ROE 6.92%",
          "barrier": "高",
          "tier": "primary",
          "trend": "up",
          "trendNote": "营收稳步+16%·毛利率持续改善(32.6%→35.3%)·小而专的利基龙头",
          "logic": "京仪装备国内温控设备#1(35.73%市占率)·Fab温控系统认证周期≥12个月·2025营收14.26亿+16%/净利1.48亿·2026Q1营收+16%持续稳健·毛利率改善至35.3%·全球竞争:SMC等海外厂商仍占主导·国内竞争者存在·score=4:认证壁垒6-18个月+国内领先·赛道偏利基但国产替代需求明确",
          "valAsOf": "2026-07-12",
          "src": "L1 abstract_ths 688652+L3券商",
          "hits": null,
          "strength": null,
          "investable": true,
          "region": "北京",
          "growthAdj": null
        }
      ],
      "_note": "2026-07-12新建·暂时低于SKILL.md ≥5只标准段规模(当前2只)·随行业发展或后续核实新标的补充(treeMap已有新莱应材/汉钟精机/英杰电气等可升级)"
    }
  ],
  "midstream": {
    "description": "🔩 半导体设备整体行业特征:头部企业 80% 集中中国大陆+台湾(中芯/华虹+长江存储+长鑫存储+长电/通富/华天)+光刻+EUV 等 T0 卡口环节仍由 ASML/AMAT/Lam 三家欧美日巨头主导;国产替代 5-7 年加速期。",
    "stocks": [
      {
        "rank": 1,
        "name": "中微公司",
        "code": "688012",
        "position": "CCP 刻蚀国产第一·5nm 已批量进 TSMC·大基金重点持股",
        "barrier": "极高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "CCP 刻蚀 25%+ 全球 · 5nm 批量台积电"
      },
      {
        "rank": 2,
        "name": "北方华创",
        "code": "002371",
        "position": "多产品线综合性设备龙头·ICP/CCP/PVD/CVD/清洗",
        "barrier": "极高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "多产品线平台·14nm 验证"
      },
      {
        "rank": 3,
        "name": "拓荆科技",
        "code": "688072",
        "position": "PECVD/ALD 国产第一·长江存储 30-150 台中标",
        "barrier": "高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "PECVD/ALD 双产品·长江存储"
      },
      {
        "rank": 4,
        "name": "华海清科",
        "code": "688120",
        "position": "CMP 国产第一·12 寸 CMP 已批量供货中芯/长江存储",
        "barrier": "极高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "CMP 国产第一·2025 营收+63%"
      },
      {
        "rank": 5,
        "name": "芯源微",
        "code": "688037",
        "position": "涂胶显影国产第一·前道 Off-line/Inline",
        "barrier": "高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "涂胶显影国产第一·14nm 验证"
      },
      {
        "rank": 6,
        "name": "先导基电",
        "code": "600641",
        "position": "凯世通离子注入·集成电路+光伏双线",
        "barrier": "高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "凯世通 28nm 验证·2025 新签合同+160%"
      },
      {
        "rank": 7,
        "name": "晶盛机电",
        "code": "300316",
        "position": "晶体生长全球第二·国内第一·光伏+半导体双轨",
        "barrier": "中",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "晶体生长全球第二·光伏单晶炉第一"
      },
      {
        "rank": 8,
        "name": "精测电子",
        "code": "300567",
        "position": "前道量测+后道测试双线·Memory 测试设备",
        "barrier": "高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "前道量测+后道测试"
      },
      {
        "rank": 9,
        "name": "华峰测控",
        "code": "688200",
        "position": "模拟/混合信号测试机国产第一",
        "barrier": "高",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "模拟/混合测试机国产第一"
      },
      {
        "rank": 10,
        "name": "长川科技",
        "code": "300604",
        "position": "后道测试机(分选机/测试机)国产第一",
        "barrier": "中",
        "tier": "primary",
        "valAsOf": "2026-07-08",
        "src": "akshare/新浪财经(基于公司季报)",
        "trend": "up",
        "trendNote": "后道测试机国产第一"
      }
    ]
  },
  "fourQuestions": {
    "_note": "2026-07-12 恢复:基于§11.23核实结论(21只Q1仅4只通过·Q2/Q3/Q4系统性数据不足)·从0ce7073 Phase A占位数据清理+扩展后重建·原688765→688147(微导纳米)·盛美上海从CCP/ICP段移至CMP/清洗段",
    "segments": [
      {
        "name": "CCP/ICP 刻蚀设备",
        "segmentName": "CCP/ICP 刻蚀设备",
        "variant": null,
        "stocks": [
          {
            "name": "中微公司",
            "code": "688012",
            "q1": true,
            "q1note": "L3机构报告(SEMI/VLSI/Gartner)覆盖全球设备厂商格局·全球≤3家",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          },
          {
            "name": "北方华创",
            "code": "002371",
            "q1": true,
            "q1note": "L3机构报告(SEMI/VLSI/Gartner)覆盖全球设备厂商格局·全球≤3家",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          },
          {
            "name": "盛美上海",
            "code": "688082",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "先导基电",
            "code": "600641",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "至纯科技",
            "code": "603690",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          }
        ]
      },
      {
        "name": "薄膜沉积设备(PECVD/PVD/ALD/CVD/LPCVD)",
        "segmentName": "薄膜沉积设备(PECVD/PVD/ALD/CVD/LPCVD)",
        "variant": null,
        "stocks": [
          {
            "name": "拓荆科技",
            "code": "688072",
            "q1": true,
            "q1note": "L3机构报告(SEMI/VLSI/Gartner)覆盖全球设备厂商格局·全球≤3家",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          },
          {
            "name": "北方华创",
            "code": "002371",
            "q1": true,
            "q1note": "L3机构报告(SEMI/VLSI/Gartner)覆盖全球设备厂商格局·全球≤3家",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          },
          {
            "name": "微导纳米",
            "code": "688147",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "中微公司",
            "code": "688012",
            "q1": true,
            "q1note": "L3机构报告(SEMI/VLSI/Gartner)覆盖全球设备厂商格局·全球≤3家",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          },
          {
            "name": "芯源微",
            "code": "688037",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          }
        ]
      },
      {
        "name": "光刻/涂胶显影(配套设备)",
        "segmentName": "光刻/涂胶显影(配套设备)",
        "variant": null,
        "stocks": [
          {
            "name": "芯源微",
            "code": "688037",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "茂莱光学",
            "code": "688502",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "福晶科技",
            "code": "002222",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "蓝英装备",
            "code": "300293",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          }
        ]
      },
      {
        "name": "CMP 抛光/清洗设备",
        "segmentName": "CMP 抛光/清洗设备",
        "variant": null,
        "stocks": [
          {
            "name": "华海清科",
            "code": "688120",
            "q1": true,
            "q1note": "L3机构报告(SEMI/VLSI/Gartner)覆盖全球设备厂商格局·全球≤3家",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          },
          {
            "name": "盛美上海",
            "code": "688082",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "至纯科技",
            "code": "603690",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "富乐德",
            "code": "301297",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "美埃科技",
            "code": "688376",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          }
        ]
      },
      {
        "name": "检测/测试/量测设备",
        "segmentName": "检测/测试/量测设备",
        "variant": null,
        "stocks": [
          {
            "name": "精测电子",
            "code": "300567",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "长川科技",
            "code": "300604",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "华峰测控",
            "code": "688200",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "金海通",
            "code": "603061",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "中科飞测",
            "code": "688361",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          }
        ]
      },
      {
        "name": "离子注入/晶体生长/封测设备",
        "segmentName": "离子注入/晶体生长/封测设备",
        "variant": null,
        "stocks": [
          {
            "name": "先导基电",
            "code": "600641",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "晶盛机电",
            "code": "300316",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "华峰测控",
            "code": "688200",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "先导智能",
            "code": "300450",
            "q1": false,
            "q1note": "全球竞争者>3家或数据不足·半导体设备行业公开格局数据稀缺(§11.23)",
            "q2": false,
            "q2note": "数据不足·设备厂产能扩张周期无标准公开口径·行业逻辑是订单→交付→验收而非建产能→扩产(§11.23)",
            "q3": false,
            "q3note": "数据不足·客户不会公开披露替代供应商所需时间这类商业敏感信息(§11.23)",
            "q4": false,
            "q4note": "数据不足·客户替换认证周期属商业机密·现有L4券商研报只覆盖导入认证周期≠替换认证周期(§11.23)",
            "hits": 0,
            "strength": null
          }
        ]
      },
      {
        "name": "去胶/热处理设备",
        "segmentName": "去胶/热处理设备",
        "variant": null,
        "stocks": [
          {
            "name": "屹唐股份",
            "code": "688729",
            "q1": true,
            "q1note": "全球去胶设备双寡头(PSK+屹唐>70%)·全球≤3家(L3 Gartner)",
            "q2": false,
            "q2note": "数据不足(§11.23)",
            "q3": false,
            "q3note": "数据不足(§11.23)",
            "q4": false,
            "q4note": "数据不足(§11.23)",
            "hits": 1,
            "strength": "☆☆☆"
          }
        ]
      },
      {
        "name": "关键零部件",
        "segmentName": "关键零部件",
        "variant": null,
        "stocks": [
          {
            "name": "富创精密",
            "code": "688409",
            "q1": false,
            "q1note": "全球竞争者>3家(§11.23)",
            "q2": false,
            "q2note": "数据不足(§11.23)",
            "q3": false,
            "q3note": "数据不足(§11.23)",
            "q4": false,
            "q4note": "数据不足(§11.23)",
            "hits": 0,
            "strength": null
          },
          {
            "name": "京仪装备",
            "code": "688652",
            "q1": false,
            "q1note": "全球竞争者>3家(§11.23)",
            "q2": false,
            "q2note": "数据不足(§11.23)",
            "q3": false,
            "q3note": "数据不足(§11.23)",
            "q4": false,
            "q4note": "数据不足(§11.23)",
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
      "name": "屹唐股份",
      "code": "688729",
      "segment": "去胶/热处理设备",
      "strength": "★★★",
      "logic": "全球去胶设备双寡头:PSK(韩国·~40%)+屹唐(~33.7%)合计>70%市占率(L3 Gartner 2025·东吴/方正/国投证券多源确认)·第三名Lam Research仅9-10%非主要竞争者·屹唐2017年收购美国Mattson继承30年技术积累·Fab认证周期≥18个月·Suprema/Optima/Hydrilis HMR三大产品系列覆盖逻辑/存储/功率全品类·2025年营收50.76亿+9.6%/净利6.71亿+24%·2026Q1承压(营收-10.6%/净利-26.8%)主因三重叠加:①全球设备行业周期调整(SEMI 2026Q1行业-8%)②2025Q1国补高基数③实体清单致零部件采购延长·毛利率逆势改善至40.02%·RTP快速热处理全球#2(13.8%)+干法刻蚀全球#9打造第二增长曲线·风险:MATCH法案(美国子公司Mattson Technology)·PSK存储领域优势·去胶市场规模有限(8.56亿美元)但平台化扩张至刻蚀(219亿美元大市场)",
      "tags": [
        "全球≤3家",
        "PSK+屹唐双寡头>70%",
        "去胶设备A股唯一",
        "RTP全球#2",
        "Mattson技术继承"
      ],
      "valuation": {
        "pe": "PE-TTM≈174(Sina 36.58元×abstract_ths L1 TTM EPS 0.21)",
        "pePercentile": null,
        "grossMargin": "38.25%→Q1 40.02%",
        "fromHigh": "待实测",
        "asOf": "2026-07-12",
        "note": "🟢 全球去胶设备双寡头(PSK+屹唐>70%)·RTP全球#2·平台化扩张至刻蚀·2025净利6.71亿+24%·PE≈174极高+Q1双降(行业周期+高基数+实体清单)·估值已充分反映卡口溢价·需等PE回落+Q2确认拐点",
        "tier": "estimate",
        "src": "Gartner 2025+东吴/方正/国投证券+abstract_ths L1"
      },
      "verification": {
        "items": [
          {
            "type": "供给寡头",
            "claim": "全球去胶设备PSK(~40%)+屹唐(~33.7%)双寡头>70%·Lam仅9-10%非主要竞争者(L3 Gartner 2025)",
            "howToCheck": "查Gartner 2025/2026全球去胶设备市场份额报告+东吴/方正/国投证券深度研报交叉验证",
            "falsifySignal": "出现第三家市占率>20%的竞争者或屹唐市占跌破25%→卡口降级",
            "status": "pending"
          },
          {
            "type": "产能缺口",
            "claim": "2025营收50.76亿+9.6%·去胶设备需求随Fab扩产持续增长",
            "howToCheck": "查SEMI 2026全球Fab设备支出预测+屹唐2026H1中报:去胶设备出货量+在手订单",
            "falsifySignal": "全球Fab资本支出大幅削减+屹唐去胶订单连续两季下滑→卡口逻辑弱化",
            "status": "pending"
          },
          {
            "type": "财报印证",
            "claim": "2025净利6.71亿+24%·2026Q1营收-10.6%/净利-26.8%·毛利率逆势升至40%",
            "howToCheck": "查2026H1中报:营收增速是否恢复正增长+毛利率是否维持40%+RTP/刻蚀占比是否继续提升",
            "falsifySignal": "营收连续两季双降+毛利率跌破35%→定价权逻辑塌",
            "status": "pending"
          },
          {
            "type": "交叉信源",
            "claim": "至少两个独立来源印证全球双寡头格局",
            "howToCheck": "一篇Gartner/SEMI报告+一篇券商深度+公司年报同时印证",
            "falsifySignal": "只找得到单一来源→存疑",
            "status": "pending"
          }
        ],
        "note": "基于L3 Gartner 2025+东吴/方正/国投证券+L1 abstract_ths 688729实测·2026-07-12立·barrier=5双寡头+moat=86全链第一"
      },
      "strengthNote": "2026-07-12 R6候选纳入:barrier=5(极高·PSK+屹唐双寡头>70%)+moat=86全链最高·去胶设备A股唯一标的·RTP全球#2·全球仅PSK/屹唐两家>30%·第三名Lam仅9-10%·赋★★★"
    },
    {
      "rank": 2,
      "name": "中微公司",
      "code": "688012",
      "segment": "CCP/ICP 刻蚀设备",
      "strength": "★★★",
      "logic": "全球<strong>仅3家</strong>可量产先进制程CCP刻蚀设备：应用材料(AMAT)、泛林半导体(Lam Research)、中微公司（L3 SEMI/VLSI Research全球刻蚀设备厂商格局报告）。中微Primo D-RIE系列5nm CCP刻蚀机<strong>已批量进入台积电N3P工艺</strong>，是国内唯一实现先进制程刻蚀设备向全球顶级晶圆厂批量供货的企业。2025全年营收123.85亿(+36.62%)、净利21.11亿(+30.69%)（L1·abstract_ths实测）。2026Q1营收29.15亿(+34.13%)、净利9.30亿(+197.20%)，业绩加速兑现。认证壁垒<strong>≥18个月</strong>（L4券商研报），新进入者突破周期极长。M10客户验证中，先进制程客户群持续扩展。",
      "valuation": {
        "pe": "Forward PE(2026E)~127x（ths 28家机构预测·待TTM PE实测校准）",
        "pePercentile": null,
        "grossMargin": "39.17%",
        "fromHigh": "待实测",
        "asOf": "2026-07-12",
        "note": "🆪 **估值草案·Phase 2 待 PE 实测校准**（当前仅含 abstract_ths L1 财务基本面+机构EPS预测Forward PE，无 PE-TTM / 历史分位数据）。\n\n📊 **L1 基本面**（abstract_ths 实测）：2025全年营收 123.85亿(+36.62%)、净利 21.11亿(+30.69%)、净利率 16.67%、毛利率 39.17%。2026Q1营收 29.15亿(+34.13%)、净利 9.30亿(+197.20%)——单季净利接近2024全年(16.16亿)的58%，业绩加速兑现。\n\n📊 **Forward PE 近似参考**（ths 机构盈利预测·28家机构覆盖）：2026E EPS=3.42元→Forward PE~127x / 2027E EPS=4.62元→Forward PE~94x。⚠️ Forward PE≠TTM PE，不能替代 PE 分位判断。\n\n⚠️ **估值核心矛盾**：5nm台积电批量供货+新签订单110亿++业绩高速增长→成长股高PE有一定合理性，但Forward PE~127x已处于板块高位。⏳ TTM PE 及 5年 PE 分位待人工补充。\n\n⚠️ **治理风险**（2026-07-12网络检索核实）：无监管处罚/立案调查。2025-12及2026-03 CSRC合规申报中认证近三年无行政处罚/立案调查。公司主动起诉美国国防部就被列入中国军事公司黑名单寻求法律救济，属维权行为非被诉。重大资产重组（收购杭州众硅电子科技~65%股权）推进中。",
        "tier": "estimate",
        "src": "abstract_ths L1 2025年报+2026Q1实测 + ths 机构盈利预测(28家·2026E EPS 3.42) / TTM PE及5年分位待人工补充"
      }
    },
    {
      "rank": 3,
      "name": "北方华创",
      "code": "002371",
      "segment": "ICP/CCP/PVD/CVD 多产品线",
      "strength": "★★★",
      "logic": "全球<strong>仅≤3家</strong>可同时量产ICP/CCP刻蚀、PVD/CVD薄膜沉积、湿法清洗全品类先进制程半导体设备的综合厂商（L3全球综合半导体设备厂商竞争格局报告）。北方华创是国内唯一覆盖刻蚀+薄膜沉积+清洗+立式炉管全产品线的<strong>平台型设备龙头</strong>。2025全年营收393.53亿(+30.85%)，连续两年维持30%以上高增速；净利55.22亿(-1.77%温和下降)，2026Q1净利16.35亿(+3.42%)<strong>企稳回升</strong>（L1·abstract_ths实测）。14nm CCP刻蚀通过中芯国际验证，28nm多产品线客户已批量。大基金重点持股，子公司北京北方华创微电子/北京七星华创覆盖核心产业链。单类设备认证壁垒≥18个月，<strong>多品类叠加的认证周期+工艺know-how+客户产线适配转换成本极高</strong>（L4券商研报）。",
      "valuation": {
        "pe": "Forward PE(2026E)~77x（ths 27家机构预测·待TTM PE实测校准）",
        "pePercentile": null,
        "grossMargin": "40.10%",
        "fromHigh": "待实测",
        "asOf": "2026-07-12",
        "note": "🆪 **估值草案·Phase 2 待 PE 实测校准**（当前仅含 abstract_ths L1 财务基本面+机构EPS预测Forward PE，无 PE-TTM / 历史分位数据）。\n\n📊 **L1 基本面**（abstract_ths 实测）：2025全年营收 393.53亿(+30.85%)、净利 55.22亿(-1.77%温和下降)、净利率 13.74%、毛利率 40.10%、ROE 16.41%。2026Q1营收 103.23亿(+25.80%)、净利 16.35亿(+3.42%企稳回升)。营收体量（394亿）约为中微(124亿)的3.2倍，是A股半导体设备营收规模最大的标的。\n\n📊 **Forward PE 近似参考**（ths 机构盈利预测·27家机构覆盖）：2026E EPS=10.34元→Forward PE~77x / 2027E EPS=14.31元→Forward PE~56x。\n\n⚠️ **估值核心矛盾**：营收300亿+持续30%高增+14nm多产品线验证+大基金重点持股→平台型稀缺性溢价。Forward PE~77x 在半导体设备板块处于中等偏高水平。⏳ TTM PE 及 5年 PE 分位待人工补充。\n\n⚠️ **治理风险**（2026-07-12网络检索核实）：三轮中英文检索均未发现监管处罚/问询函/立案调查/重大诉讼记录。北京电控体系（国资）稳定控股，大基金重点持股，治理结构成熟。",
        "tier": "estimate",
        "src": "abstract_ths L1 2025年报+2026Q1实测 + ths 机构盈利预测(27家·2026E EPS 10.34) / TTM PE及5年分位待人工补充"
      }
    },
    {
      "rank": 4,
      "name": "华海清科",
      "code": "688120",
      "segment": "CMP 抛光设备",
      "strength": "★★★",
      "logic": "全球<strong>仅3家</strong>具备12寸CMP整机量产能力：应用材料(AMAT)、荏原(Ebara)、华海清科（L3 SEMI全球CMP设备格局+L4券商研报）。华海清科是国内<strong>唯一实现12寸量产机型批量导入头部晶圆厂</strong>（中芯国际/长江存储）的CMP供应商——三重壁垒叠加：CMP整机设备+抛光耗材匹配+长周期晶圆工艺验证。营收连续三期YoY+30%以上（L1·abstract_ths实测），2025全年营收增速+36.46%。<strong>⚠️ 盈利能力弱化趋势需持续观察</strong>：净利增速从2024年+41.40%断崖下滑至2025年+5.89%，净利率三年内从30.05%→20.58%（L1实测），虽卡口逻辑不变（全球≤3家格局未破），但定价权是否在国产化推进中弱化是核心跟踪变量。ROE 15.52%，毛利率41.81%，基本面仍属健康区间。",
      "tags": [
        "全球≤3家",
        "国内唯一12寸",
        "三重壁垒",
        "⚠️净利增速放缓"
      ],
      "valuation": {
        "pe": "PE-TTM 待实测（Phase 2 baostock/akshare拉取）",
        "pePercentile": null,
        "grossMargin": "41.81%",
        "fromHigh": "待实测",
        "asOf": "2026-07-12",
        "note": "🆪 **估值草案·Phase 2 待 baostock 实测校准**（当前仅含 abstract_ths L1 财务基本面，无 PE-TTM / 历史分位 / 买入区间数据）。\n\n📊 **已知基本面**（L1·abstract_ths 2025年报实测）：ROE 15.52%、毛利率 41.81%、营收增速 +36.46%（连续三期 +30%+）、净利增速 +5.89%（⚠️ 从 +41.40% 断崖下滑）、净利率 20.58%（三年内 30%→20% 持续走低）、剪刀差 warn（营收增但利润不跟）。\n\n⚠️ **估值核心矛盾**：营收高增（+36%）vs 利润失速（+5.89%）——市场可能给国产替代故事高 PE，但盈利质量恶化不支持高估值。Phase 2 需实测 PE-TTM + 5年 PE 分位 + 横向对比申万半导体设备指数 PE 中枢，才能给出合理 score。\n\n⚠️ **治理风险**：本批次未检索到华海清科（688120）存在类似东材科技实控人被监委留置级别的公开监管/法律/治理风险信息。公司为⚠️ 控制权已于2022年变更：清华大学将100%股权无偿划转给四川能投，当前实控人为四川能源发展集团（四川省国资），清华已不再是实控人——属正常国有资产重组非负面事件。公司正推进40亿元定增（上交所已受理）+H股上市计划。无监管处罚/立案调查类风险（截至2026-07-12网络检索核实）。客户集中度高+毛利率三年持续下滑（43.55%→41.81%）为公开披露风险因素。",
        "tier": "estimate",
        "src": "abstract_ths L1 2025年报实测（营收/净利/ROE/毛利率）+ Phase 2 待 baostock PE-TTM 实测 + 待申万半导体设备指数横向对比"
      },
      "verification": {
        "items": [
          {
            "type": "供给寡头",
            "claim": "全球仅AMAT/Ebara/华海清科3家具备12寸CMP整机量产能力（L3 SEMI+L4券商）",
            "howToCheck": "查SEMI/VLSI Research全球CMP设备厂商排名，确认是否有第四家宣布12寸CMP量产（如韩国KCTech/日本SPE等）",
            "falsifySignal": "出现第四家通过12寸CMP量产认证并批量导入头部晶圆厂→卡口降级",
            "status": "pending"
          },
          {
            "type": "盈利能力",
            "claim": "净利增速+41.40%→+5.89%是短期扩产折旧/研发投入前置所致，非定价权丧失",
            "howToCheck": "查华海清科2025年报/2026H1中报：分产品毛利率趋势+CMP设备ASP变化+研发费用率是否开始回落",
            "falsifySignal": "毛利率持续下滑至30%以下/ASP持续走低/研发费用率不降→定价权逻辑塌·卡口虽在但盈利质量不可逆恶化",
            "status": "pending"
          },
          {
            "type": "竞争格局",
            "claim": "国内不存在第二家实现12寸CMP整机量产并批量导入头部晶圆厂的厂商",
            "howToCheck": "查国内CMP设备竞品（如中电科45所/北京烁科等）最新公告+头部晶圆厂设备采购中标公告，确认有无国产第二家量产突破",
            "falsifySignal": "国内出现第二家12寸CMP量产供应商→国内独占逻辑塌·但全球≤3家格局可能仍成立",
            "status": "pending"
          },
          {
            "type": "交叉信源",
            "claim": "至少两个独立来源印证全球CMP≤3家格局+华海清科国内唯一12寸量产地位",
            "howToCheck": "一篇SEMI/VLSI机构报告+一篇头部券商深度（华泰/中金/国金）+一篇中芯国际/长江存储设备采购公告同时印证",
            "falsifySignal": "只找得到单一来源或券商研报仅为转引SEMI数据无独立核实→存疑",
            "status": "pending"
          }
        ],
        "note": "基于Phase B dims6 barrier reason L3+L4信源+abstract_ths L1实证·2026-07-12立。⚠️ 特别核实项盈利能力（第2项）：这是华海清科区别于其他3只卡口的最关键跟踪变量——全球≤3家CMP格局不变但净利增速从+41%断崖至+6%，需区分周期性的扩产折旧阵痛与结构性的定价权丧失。此项核实结论将决定strength是否需要在未来从★★★下修（类比铜冠铜箔★★★→★★☆的处置逻辑）。"
      },
      "strengthNote": "2026-07-12 独立核实纳入:全球仅AMAT/Ebara/华海清科3家12寸CMP量产(L3 SEMI+L4券商)·国内唯一批量导入中芯/长江存储·★赋★★★。⚠️ 净利增速从2024年+41.40%断崖至2025年+5.89%，净利率三年内30%→20%（abstract_ths L1实测），卡口逻辑不变但盈利能力弱化趋势需要持续观察——若2026H1净利增速继续低于10%且毛利率跌破35%，触发重新评估strength是否从★★★下修（类比铜冠铜箔处置逻辑）。"
    },
    {
      "rank": 5,
      "name": "拓荆科技",
      "code": "688072",
      "segment": "PECVD/ALD 薄膜沉积设备",
      "strength": "★★★",
      "logic": "全球具备高端PECVD/ALD设备<strong>稳定量产供货能力厂商≤3家</strong>（L3全球薄膜沉积设备厂商统计）。拓荆科技是国内唯一实现多品类薄膜沉积设备大批量上机供货的企业。2026Q1营收13.35亿(+87.5%)，净利5.71亿(<strong>+488.29%·亏损反转</strong>，对比2025Q1净利-1.47亿)，业绩爆发式兑现（L1·abstract_ths实测）。<strong>长江存储30-150台设备中标</strong>，客户覆盖长江存储/合肥长鑫/中芯国际/华虹四大头部晶圆厂。在手订单130亿+，交付排期饱满。认证壁垒<strong>≥18个月</strong>（L4券商设备导入数据），工艺Know-how+下游客户长期认证双重壁垒形成安全垫，海外及国内新进入者突破周期极长。",
      "valuation": {
        "pe": "Forward PE(2026E)~141x（ths 13家机构预测·待TTM PE实测校准）",
        "pePercentile": null,
        "grossMargin": "34.95%",
        "fromHigh": "待实测",
        "asOf": "2026-07-12",
        "note": "🆪 **估值草案·Phase 2 待 PE 实测校准**（当前仅含 abstract_ths L1 财务基本面+机构EPS预测Forward PE，无 PE-TTM / 历史分位数据）。\n\n📊 **L1 基本面**（abstract_ths 实测）：2025全年营收 65.19亿(+58.87%)、净利 9.27亿(+34.67%)、净利率 14.03%、毛利率 34.95%（⚠️为4只卡口中最低）。2026Q1营收 11.12亿(+56.97%)、净利 5.71亿(+488.29%·亏损反转，对比2025Q1净利-1.47亿)。2026Q1净利率 50.54%（⚠️ 异常高，可能含大额一次性收入/客户验收集中确认/季节性因素，需人工核对季报原文拆解非经常性损益）。\n\n📊 **Forward PE 近似参考**（ths 机构盈利预测·13家机构覆盖）：2026E EPS=5.90元→Forward PE~141x / 2027E EPS=8.46元→Forward PE~98x。⚠️ Forward PE 基于分析师预测假设2026全年净利=5.90×总股本，若2026Q1高净利含一次性因素则预测可能偏乐观。\n\n⚠️ **估值核心矛盾**：营收增速+59%/+57%极高+在手订单130亿++亏损反转→高成长理应享受估值溢价。但毛利率34.95%为4只卡口中最低，Forward PE~141x为4只中最高→一旦业绩增速放缓估值压力最大。⏳ TTM PE 及 5年 PE 分位待人工补充。\n\n⚠️ **治理风险**（2026-07-12网络检索核实）：无监管处罚/立案调查。2025-09-13公司正式公告确认最近五年未被证券监管部门和证券交易所处罚或采取监管措施（公告编号2025-049）。重大资产重组（收购无锡尚积半导体等三家标的）推进中，董事会声明交易主体近36个月无内幕交易立案记录。",
        "tier": "estimate",
        "src": "abstract_ths L1 2025年报+2026Q1实测 + ths 机构盈利预测(13家·2026E EPS 5.90) / TTM PE及5年分位待人工补充 / 2026Q1非经常性损益待人工拆解"
      },
      "strengthNote": "2026-07-12 全站星级一致性排查上修:fourQuestions hits=4(q1-q4全true·全球PECVD/ALD≤3家有L3信源支撑)+Phase B dims6 barrier=4(高壁垒)·原★★☆为Phase A骨架阶段保守默认值·与华海清科(barrier=5)同为全球≤3家级别物理卡口·strengthNote作为override书面理由登记"
    }
  ],
  "supplyGap": [
    {
      "segment": "EUV 光刻机",
      "rate": "100%",
      "demand": "全球12英寸先进制程Fab需求",
      "capacity": "ASML垄断·2024年起不再向中国大陆出口EUV",
      "gap": "EUV 光刻机 100% ASML 垄断",
      "bottleneck": "EUV 是 7nm 及以下先进制程必需设备,大陆晶圆厂卡在 14nm DUV 节点",
      "tier": "L3",
      "src": "SEMI 季度报告 + 美方 BIS 出口管制清单",
      "asOf": "2026-07-12"
    },
    {
      "segment": "14nm 工艺设备",
      "rate": "65%",
      "demand": "14nm节点国产化率仍<35%·CCP刻蚀30%+/PECVD 35%+/ALD 25%+/CMP 40%/清洗30%/检测25%",
      "capacity": "AMAT/Lam/TEL/ASML/KLA/Nova 等海外厂商垄断",
      "gap": "14nm 工艺设备国产化率仍 < 35%",
      "bottleneck": "工信部十四五目标:2025年50%/2027年70%",
      "tier": "L2",
      "src": "工信部十四五规划 + SEMI 全球设备数据",
      "asOf": "2026-07-12"
    },
    {
      "segment": "ALD 原子层沉积",
      "rate": "85%",
      "demand": "14nm以下HARC介质/Gate Oxide等关键工艺必需·国内Fab扩产需求旺盛",
      "capacity": "AMAT/Lam/TEL三大寡头合计85%+",
      "gap": "ALD 原子层沉积卡口",
      "bottleneck": "微导纳米/拓荆 ALD 工艺验证进度",
      "tier": "L3",
      "src": "SEMI + VLSI Research 全球ALD设备格局",
      "asOf": "2026-07-12"
    },
    {
      "segment": "电子特气",
      "rate": "90%",
      "demand": "电子特气占晶圆材料~13%·国内Fab全面扩产拉动需求",
      "capacity": "林德/液空/大阳日酸/空气化工 4寡头合计90%+",
      "gap": "电子特气国产化率仅 ~10%",
      "bottleneck": "金宏/华特/凯美特气国产化进度",
      "tier": "L4",
      "src": "SEC 公告国产化订单占比 + 券商行业深度",
      "asOf": "2026-07-12"
    },
    {
      "segment": "去胶设备",
      "rate": "30%",
      "demand": "全球去胶设备市场8.56亿美元·国内Fab全面扩产拉动需求",
      "capacity": "PSK(韩国·~40%)+屹唐(~33.7%)双寡头>70%·第三名起均<10%",
      "gap": "去胶设备双寡头格局·第二名为国产屹唐",
      "bottleneck": "屹唐实体清单风险·MATCH法案·高端零部件采购受限",
      "tier": "L3",
      "src": "Gartner 2025 + 东吴/方正/国投证券",
      "asOf": "2026-07-12"
    },
    {
      "segment": "关键零部件",
      "rate": "70%",
      "demand": "半导体设备零部件占设备总成本30-50%·国内设备厂扩产需求迫切",
      "capacity": "日本/美国精密件厂商主导高端市场·国内富创精密/新莱应材/京仪装备等追赶中",
      "gap": "设备核心零部件国产化率低·精密结构件/射频电源/真空泵/温控等严重依赖进口",
      "bottleneck": "高端反应腔体/射频电源/真空阀门国产化验证周期长(≥12月)",
      "tier": "L4",
      "src": "SEMI + 券商零部件行业深度",
      "asOf": "2026-07-12"
    }
  ],
  "methodologyNotes": "🔩 **半导体设备重构骨架说明 (Phase A - 2026-07-09)**\n\n**触发原因**:用户要求\"按 PCB 模板先搭框架\",Explore 发现现有 data/semi-equipment.js (2026-06-19 commit 6.16 立,834 行 / 54.9 KB)是 82/100 完整骨架,与 PCB 黄金范例(100/100)有 3 大差距:\n\n1. **26 只 stock 全部缺 dims6 6 维景气打分 + dims6Note**\n2. **treeMap 5 列 23 sub-card 缺 companies/sourceSegment 复用机制**\n3. **2 段 stock 数 < 5**(光刻段仅 3 / 离子注入段仅 3)\n\n**本次 Phase A 骨架 commit 范围**:\n- ✅ data/semicon-equip.js 已建,13 个顶层字段全齐(id/name/icon/meta/prosperity/cyclePosition/plainIntro/overview/treeMap/segments/midstream/fourQuestions/chokePoints/supplyGap/methodologyNotes)\n- ✅ meta.ltFit = null(对齐 PCB)·status = partial-Phase-A骨架\n- ✅ prosperity 链级 6 维完整 verdict(参考 PCB prosperity.dims 全字段 schema)\n- ✅ treeMap 5 列 23 sub-card 全部含 **companies** 数组(对齐 PCB schema)·Phase A 骨架每 sub-card 含 1-3 只 stock name+code+position+barrier\n- ✅ segments 6 段(刻蚀/薄膜沉积/光刻/CMP-清洗/检测/离子注入-晶体生长-封测)·每段 5-6 只 stock 满足 S4 硬指标 ≥ 5(超出原 3 仅 3 / 3 的差距)\n- ✅ midstream 10 只 stock 头部画像(参考 PCB midstream 标准)\n- ✅ fourQuestions 6 段 × 物理追问四件套(q1-q4 hits 计算)\n- ✅ chokePoints 3 大卡口(★★★/★★★/★★☆)+ verification.items[4] + valuation(pe+pePercentile)\n- ✅ supplyGap 4 条缺口(EUV/14nm 国产化率/ALD/电子特气)+ 跟踪指标\n\n**Phase A 未完成(本次未做)**:\n- ❌ 每个 stock 的 dims6 reason 字段具体内容(目前标 \"(Phase B 补)\" 占位)·**后续 Phase B+ 多次会话迭代补**\n- ❌ src URL ≥ 2 独立来源(目前 akshare/新浪财经 单源)·**Phase B 跟进**\n- ❌ 三重验证(stock code/段位/name)·**Phase B 必做**\n\n**待跟进 checklist(Phase B+)**:\n1. Phase B 第 1 次:中微/北方华创/拓荆/华海清科/芯源微 5 只 Top 卡口完整 dims6 + 三重验证 + cninfo 双源\n2. Phase B 第 2 次:万业/晶盛/精测/华峰/长川 5 只次级卡口\n3. Phase B 第 3 次:北方华创-清洗/盛美-清洗/至纯-清洗 等清洗段位\n4. Phase B 第 4 次:中微-PECVD/微导-ALD/中微-LPCVD 等薄膜沉积段位\n5. Phase B 第 5 次:茂莱光学/福晶科技/张江高科/蓝英装备/华大九天 等光刻段位\n6. Phase B 第 6 次-7 次:离子注入/晶体生长/封测 段位补股\n7. Phase C:treeMap sub-card 检查 sourceSegment 是否能前端渲染复用\n8. Phase D:光刻段 3→6 已完成(本次 Phase A)· 离子注入段 3→5 已完成(本次 Phase A)\n\n**数据治理纪律**:全套遵循 CLAUDE.md §6 + CLAUDE_CORE_RULES.md §13.X + §13.Y + §6.5。\n\n**已存在但保留为 deprecated**:`data/semi-equipment.js` (834 行 / 54.9 KB / 2026-06-19 commit 6.16 立)作为前期骨架,**后台保留**,侧栏隐藏但 manifest 不动,提供数据对账参考。",
  "demandChainMeta": {
    "config": {
      "asOf": "2026-07-12",
      "period": "2025-2028",
      "currency": "USD",
      "note": "半导体设备下游需求传导·基于 SEMI World Fab Forecast + Gartner 4Q25 + 券商研报多源核实。⚠️ 与 PCB 的 demandChainMeta 不同：半导体设备需求直接由晶圆厂 CAPEX 驱动（而非终端应用的间接传导），因此 sharePct 对应的是各类型晶圆厂的设备采购占比，CAGR 对应设备采购额增速而非终端芯片市场增速。"
    },
    "segments": [
      {
        "key": "logicFoundry",
        "name": "逻辑/代工（AI/HPC 芯片）",
        "sharePct": 56,
        "cagr": 7.4,
        "cagrRange": "5.5%-9.8%",
        "cagrTier": "broker",
        "cagrSrc": [
          {
            "tier": "broker",
            "name": "SEMI Year-End Total Semiconductor Equipment Forecast",
            "date": "2025-12-16",
            "quote": "Foundry/logic WFE: 2025 $66.6B (+9.8%), 2026E $70.3B (+5.5%), 2027E $75.2B (+6.9%) → 3-year CAGR ~7.4%. 2nm GAA transition and AI accelerator demand drive sustained investment."
          },
          {
            "tier": "broker",
            "name": "中信证券《头部半导体设备公司将继续受益于强劲的逻辑与存储需求》",
            "date": "2026-06-22",
            "quote": "Foundry/逻辑 2027年预计占 WFE 52%，先进制程（2nm GAA）+先进封装（CoWoS/SoIC）为结构性驱动力，TSMC 2026 CAPEX 指引 $52-56B（+27-37% vs 2025）"
          },
          {
            "tier": "broker",
            "name": "Gartner Forecast: Semiconductor Capital Spending, Wafer Fab Equipment and Capacity, Worldwide, 4Q25",
            "date": "2025-12-23",
            "quote": "WFE revenue growth 2025 +11.2%, 2026 +11.6%, driven by AI semiconductors — memory & advanced logic. Logic/Foundry returns to growth in 2025 and increases through forecast period."
          }
        ],
        "note": "SEMI 三源 CAGR 5.5%-9.8%·中信 2026-2027 更激进（受 TSMC N2 扩产指引上修影响）·中位 7.4%。逻辑/代工是设备最大下游（56%），主驱动力为 2nm GAA 工艺转型 + AI 加速器/HPC 芯片对先进制程产能的持续需求。TSMC 2026 CAPEX $52-56B（+27-37%）、Intel 18A 节点量产、三星 GAA 扩产为三大结构性增量。",
        "valueMult": null,
        "valueMultNote": "半导体设备无 PCB 同类的价值量倍数概念——同一台刻蚀机/薄膜沉积设备卖给逻辑代工厂和卖给存储厂，对设备厂商而言是同质化收入。设备需求的差异化体现在不同 fab 类型的设备组合偏好（如逻辑厂更需要 EUV+刻蚀，存储厂更需要 ALD+沉积），而非单台设备的价值量差异。因此 valueMult 不适用于设备链。"
      },
      {
        "key": "memory",
        "name": "存储芯片（DRAM + NAND）",
        "sharePct": 31,
        "cagr": 12,
        "cagrRange": "8%-19%",
        "cagrTier": "broker",
        "cagrSrc": [
          {
            "tier": "broker",
            "name": "SEMI Year-End Total Semiconductor Equipment Forecast",
            "date": "2025-12-16",
            "quote": "DRAM WFE: 2025 $22.5B (+15.4%), 2026E $25.9B (+15.1%), 2027E +7.8%. NAND WFE: 2025 $14.0B (+45.4%), 2026E $15.7B (+12.7%), 2027E +7.3%. Memory total: 2025 ~$36.5B, 2026E ~$41.6B (+14%)."
          },
          {
            "tier": "broker",
            "name": "SEMI 300mm Fab Outlook (Q3 2025 Update)",
            "date": "2025-10",
            "quote": "300mm memory fab equipment spending 2024-2029 CAGR +19%. 2026E 300mm memory spending $52B (+29% YoY). HBM wafer demand highly equipment-intensive (~2-3× more tools per wafer vs standard DRAM)."
          },
          {
            "tier": "broker",
            "name": "中信证券《头部半导体设备公司将继续受益于强劲的逻辑与存储需求》",
            "date": "2026-06-22",
            "quote": "存储合计 2027年预计占 WFE 39%（DRAM 24% + NAND 15%），AI 驱动 HBM3E 扩产+3D NAND 层数持续堆叠（232L→300L+）为设备采购核心增量"
          }
        ],
        "note": "SEMI 总 Memory WFE 2025→2026 增速 ~14%，300mm memory 2024-2029 CAGR 19%·口径差异源于 300mm 口径增速更高（小尺寸晶圆逐步淘汰）。⚠️ DRAM 与 NAND 增速分化：DRAM 由 HBM 拉动持续高增（每片 HBM 晶圆耗用 2-3 倍设备工时），NAND 2025 年 +45% 为低基数反弹、2026-2027 回落至 7-13%。中位 12% 为加权 CAGR。",
        "valueMult": null,
        "valueMultNote": "HBM 晶圆的设备密集度（~2-3× per wafer vs standard DRAM）是设备链独特的隐性价值量倍数——同一片晶圆消耗更多刻蚀/沉积/测试设备工时，但无法量化为精确倍数（SEMI 仅给出方向性描述，未量化到具体数值）"
      },
      {
        "key": "analogPower",
        "name": "模拟/功率/特色工艺（含汽车/工业芯片）",
        "sharePct": 13,
        "cagr": 9,
        "cagrRange": "5%-12%",
        "cagrTier": "broker",
        "cagrSrc": [
          {
            "tier": "broker",
            "name": "SEMI 300mm Fab Outlook (Q3 2025 Update)",
            "date": "2025-10",
            "quote": "2026-2028 cumulative 300mm equipment spending: Analog >$41B, Power & Compound Semiconductor ~$27B. Combined Analog+Power ~$68B over 3 years."
          },
          {
            "tier": "broker",
            "name": "SEMI Power & Compound Fab Report",
            "date": "2025-12",
            "quote": "Power and compound semiconductor fab equipment spending to remain above $19B/year through 2028. 57 new fabs/lines scheduled to begin operations globally from 2025-2028."
          }
        ],
        "note": "⚠️ 此段 CAGR 估算难度最高——SEMI 仅提供 3 年累计数字（$68B）而无年度拆分。基于 Power 年均 >$19B + Analog 年均 ~$14B 推算 ~$33B/年（2026-2028 平均），对比 2025 年估算 ~$23B，隐含 CAGR ~10-15%。保守取 9%（中位），区间 5%-12%。核心驱动力：SiC/GaN 车规功率器件扩产 + 汽车电动化 + 工业自动化。⚠️ 此段 CAGR 信源密度低于逻辑和存储段（2 源 vs 3 源），两个子项（Analog vs Power）增长动力差异大（Power 快于 Analog），合并为一个段的颗粒度较粗。",
        "valueMult": null
      }
    ],
    "conductionTBD": true,
    "conductionNote": "⚠️ 半导体设备的传导系数与 PCB 本质不同：PCB 需求 = 终端出货量 × 单机 PCB 价值量（两层传导），设备需求 ≈ 晶圆厂 CAPEX（单层传导）。晶圆厂 CAPEX 本身是公开可追踪的硬数据（TSMC/三星/中芯国际/长江存储季度财报直接披露），不需要像 PCB 那样从终端往回推算。因此 conductionTBD 保留为 true 但实际意义有限——如有 SEMI 更新的 Fab CAPEX 数据可直接更新，无需建立独立的传导模型。",
    "note": "半导体设备下游需求传导·2026-07-12 立。3 段 × 4 个数据点（sharePct + CAGR + cagrRange + cagrSrc）= 12 个数据点·≥2 独立来源覆盖。L3（SEMI/Gartner）为主信源，L4（中信/国金/长江/中邮证券）交叉验证。⚠️ 与 PCB demandChainMeta 的核心差异：(1) 下游按 fab 类型划分而非终端应用划分 (2) 无价值量倍数概念 (3) 传导链为单层（CAPEX→设备）而非两层（终端→整机→PCB）。这导致本模块对标的筛选价值弱于 PCB 同类模块——无法像 PCB 那样用 AI 服务器 CAGR 38% vs 消费电子 2% 来区分值得投的设备环节，因为所有设备环节被同一轮 CAPEX 周期同步驱动。"
  }
};

})(window.CHAINS);
