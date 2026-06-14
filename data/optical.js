// data/optical.js — 光模块（Optical Module）赛道 · 数据注入版 · 2026-06-14
// 历史：v0=2026-06-14 骨架(6 segments/3 卡口/27 只候选)；v1=2026-06-14 Gemini 注入后(28 只/6 维齐/卡口估值带 PE)
// 本文件 = 场景 B2 步骤 2 产物:Gemini 输出经 CC 守门校验后注入的整链数据
//
// === 守门校验报告(注入前过滤) ===
// 1. Gemini 自报 27 只 vs 实际清点 28 只(差 1)→ 按 28 只注入,差异列入"被拒清单"
// 2. Gemini 个股字段 `tier: 'primary'` 是数据源 attribution,不是 PCB 渲染字段 → 删除个股对象层级 tier,保留 dims6 元素内 tier
// 3. Gemini 6 维 score 范围 1-10 vs PCB 期望 1-5 → normalize 规则:10→5, 8-9→4, 6-7→3, 4-5→2, 1-3→1
// 4. Gemini 卡口 valuation 用 array 5 段,PCB 用 object → reshape 保留 PE 段+市场空间段作为 note,pePercentile 留 null
// 5. Gemini 卡口 verification 用 array 4 段 → reshape 为 items[4](type/claim/howToCheck/falsifySignal/status:'pending')
// 6. Gemini cyclePosition.stage 字符串"成长后期至繁荣期" → PCB enum 'boom'
// 7. Gemini verdict.longTermFit 是 boolean true → 改写为 string"适合长线研究(AI 初版)"
// 8. Gemini verdict.stockHint 是 1 句长策略 → 重塑为 3 槽位模板[环节指引],[买点指引];[方法论]
// 9. Gemini 把"罗博特科"从原骨架"测试/封装设备"段移到"硅光 PIC"段(因拟收购 ficonTEC)→ 接受,在 segment intro 备注
// 10. 原骨架"光模块测试"4 只(精测/思林杰/罗博特科/杰普特) → 被 Gemini 重写为 5 只(杰普特/普源/鼎阳/坤恒/华兴),原精测/思林杰被替换 → 接受
// 11. 侧枝从原骨架"光纤光缆(长飞/亨通/中天)"改用 Gemini"PCB/CCL(沪电/胜宏/生益)"——后者的"AI 服务器 PCB 配套"逻辑更聚焦主线 → 接受
// 12. Gemini 多处 [tier: primary][来源: 巨潮资讯网] 缺具体公告/URL → 保留 primary tier + src 标"巨潮资讯网(建议补具体公告)"
//
// === 字段口径区分提醒(写入 highlightBox) ===
// "国产化率"=本土厂商在中国市场供应份额,≠ "全球市占率"=全球出货份额。光模块总装国产化率>90%,但上游 100G/200G EML 自给率<20%。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== OPTICAL ====================
CHAINS.optical = {
  id: 'optical', name: '光模块', icon: '🔦',
  meta: { sector:'中游', tier:'核心', status:'active', updatedAt:'2026-06-14', ltFit:'🆪 适合长线研究/跟踪；景气+确定性双高但估值偏贵，建议等买点或选卡口左侧' },

  // ★ 升级九 STEP 2：景气六维（Gemini 数据 normalize 1-5）
  //   score 原始 1-10 → 1-5 映射:10→5, 8-9→4, 6-7→3, 4-5→2, 1-3→1
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:4, trend:'up',
        reason:'🆪 算力集群从万卡向十万卡演进,网络拓扑复杂度指数级增加,光互连不仅是数量增长更是代际周期缩短。Nvidia 算力路线图已将更新频率提速,1.6T 之后 3.2T 标准已在 IEEE 802.3dj 提上日程。',
        evidence:'Nvidia Computex Keynote 2026-06 + IEEE 官网 2026-05 + LightCounting 光互连 10 年预测报告 2026-06', flag:'🆪', tier:'primary', src:'LightCounting 2026-06' },
      { key:'visibility', name:'业绩可见度', score:4, trend:'flat',
        reason:'🆪 头部光模块厂商在手订单已排至 2027 上半年,以太网与 NVLink 配套份额格局清晰。2025Q4 及 2026Q1 微软/Meta 资本开支连续 3 季度超预期。',
        evidence:'各大云厂商财报/SEC 文件 2026-04', flag:'🆪', tier:'primary', src:'Wind 宏观经济数据库 2026-06' },
      { key:'policy', name:'政策确定性', score:3, trend:'flat',
        reason:'🆪 国内虽有"东数西算"及自主可控强指引,但本赛道景气度主要来源于不受国内宏观干预的北美出海需求。光模块多次被纳入美国关税豁免清单,具备"美国离不开中国制造"特质。',
        evidence:'ICC 讯石光通讯 2026-04-22 + C114 通信网 2026-05', flag:'🆪', tier:'media', src:'C114 通信网 2026-05' },
      { key:'supply', name:'供需紧张度', score:2, trend:'down',
        reason:'🆪 总装产能易扩,但受制于上游 DSP 电芯片与 200G EML 光芯片的良率爬坡,实际有效产出处于紧平衡。LC 提示需求超出核心光器件供应 30% 以上。',
        evidence:'LightCounting 2026-05-07', flag:'🆪', tier:'broker', src:'中信建投通信研报 2026-05' },
      { key:'valuation', name:'估值性价比', score:2, trend:'down',
        reason:'🆪 核心标的(旭创/天孚)经历 2023-2025 戴维斯双击,市值已部分透支 2026 业绩预期。核心光模块厂平均 PE(TTM) 在 40-50 倍,相较历史中枢 30 倍有显著溢价。',
        evidence:'巨潮资讯网 2026-06-14 + 沪深交易所/Choice 数据 2026-06', flag:'🆪', tier:'primary', src:'巨潮资讯网 2026-06-14', asOf:'2026-06-14' },
      { key:'barrier', name:'壁垒安全垫', score:4, trend:'up',
        reason:'🆪 1.6T 对散热/功耗/耦合精度要求使二三线小厂几乎无法跨越 Nvidia/Google 认证门槛。单波 200G 时代的 PAM4 眼图测试与 DSP 算法匹配需要数年试错迭代。',
        evidence:'招商证券研报 2026-04', flag:'🆪', tier:'broker', src:'招商证券 2026-04' }
    ],
    verdict: {
      longTermFit:'🆪 适合长线研究/跟踪——AI 算力超级上行驱动,景气持续性+能见度双高,卡口在上游光芯片端(国产化率<20%)',
      oneLine:'🆪 光模块是"业绩可见度(4)+景气持续性(4)+壁垒安全垫(4)"三高、但"估值性价比(2)+供给紧张度(2)"触发紧平衡的赛道:长线逻辑顺,胜负手在选卡口(光芯片国产化)与等买点(PE 分位回踩)。',
      stockHint:'环节指引: 优先 T0/T1 整机龙头(中际旭创/天孚通信)与 T0 卡口(100G/200G EML+CW 激光器);买点指引: 等 PE 分位回踩或一季报兑现后再加仓,当前 40-50x PE 已偏贵;方法论: AI 算力赛道的胜负手在"龙头利润兑现+卡口国产化"双线'
    }
  },

  cyclePosition: { stage:'boom', label:'高景气度兑现期(1.6T 实质性放量期)', reason:'🆪 800G 利润已连续多个季度兑现至财务报表,1.6T 在 2026 年进入实质性放量期;产业脱离了纯概念炒作,进入严苛的按季度业绩考核模式。',
    watchSignals:[
      '北美四大 CSP 季度资本开支实际值及未来指引 [tier: primary][来源: 财报季 SEC 文件]',
      '台积电 CoWoS 等先进封装产能的扩产实际落地数据 [tier: primary][来源: 台积电季度法说会]',
      '1.6T 光模块的月度出货量及价格降幅(能否维持在 1300-1500 美元高位) [tier: estimate][来源: 券商草根调研/维科号 2026-05]'
    ]
  },

  plainIntro: {
    analogy: '光模块 = 数据中心里"GPU 之间的光纤对讲机"',
    paragraphs: [
      '光通信赛道是全球 AI 算力基础设施运转的"物理大动脉"。在当前阶段,产业的核心驱动力已彻底由传统的"电信网与数据中心建设"转化为"AI 超大规模算力集群互联"引发的速率倍增革命。2026 年正值 1.6T 高速光模块的规模商用元年,中国大陆龙头厂商在这一轮全球竞争中取得了压倒性优势,出货量占据全球超 60% 的市场份额。本土产业正快速从早期的"代工组装封装",向硅光 PIC 设计、LPO 线性直驱及 CPO 光电共封装等深水区全面突围。',
      '然而,在繁荣周期的表象下,我国光通信产业链上游仍暗藏严重的"卡脖子"隐忧。尽管整机端傲视全球,但决定利润与性能天花板的核心卡口——100G/200G EML 光芯片、大功率 CW 连续波激光器及高端 DSP 电芯片,其本土供给自给率至今仍不足 20%,高度受制于美日等海外大厂的产能分配乃至潜在的断供威胁。因此,本赛道投资的核验逻辑必须二分:一是紧盯头部模块厂在全球 AI 浪潮中的利润兑现度;二是深度追踪底层光芯片与测试设备厂商在"国产替代"零的突破下的估值弹性。'
    ],
    flowSteps: ['光芯片(DFB/EML/CW/可调)','硅光芯片(PIC)','光器件(FAU/MPO/AWG/隔离器)','光模块制造(800G/1.6T/CPO/LPO)','装入AI服务器/交换机/电信设备'],
    highlightBox: '<strong>💡 物理卡口 视角：光模块产业链的卡口集中在上游光芯片端。</strong>制造端(中游)≥10 家可切换 = 不构成物理卡口(segments[3] 4 问 0 命中,方法论正常结果);卡口集中在 segments[0-1]光芯片/硅光 PIC 端。<br>① <strong>大功率 CW 激光器</strong>:CPO/硅光架构唯一外置"引擎",全球<5家能批量,长光华芯 70mW CWDM4 填补国内空白<br>② <strong>100G/200G 高速 EML</strong>:1.6T 单波 200G PAM4 调制核心,海外寡头主导,源杰科技 100G EML 量产中<br>③ <strong>硅光 PIC 设计</strong>:CMOS 工艺高密度集成,解决 1.6T 功耗/成本瓶颈,光库 TFLN/赛微 MEMS 代工/罗博特科(拟收购 ficonTEC)耦合设备构成国产化梯队<br><br><strong>【核查员最高级别警示】</strong><br>1. 严格区分"全球市占率"(中国模块大厂极强,>60%)与"国产化率"(高阶光芯片自给率极弱,<20%)。<br>2. 当前核心标的 PE(TTM) 中枢 40-50x,已部分透支 2026H2 业绩。务必紧盯下季度北美 CSP 资本开支指引,一旦 Capex 增速放缓,板块将面临剧烈杀估值。<br>3. 密切关注美国商务部对 InP 衬底材料及光芯片外延设备的出口管制动向。<br>(数据基准核验日期: 2026-06-14)'
  },

  // 8 张宏观卡(Gemini object → PCB array)
  overview: [
    { label:'🌍 全球光模块市场(2026E)', value:'~$230 亿', note:'以太网光模块 ~$170 亿 [tier: estimate][来源1: LightCounting 2025-12-17] [来源2: 证券时报 2026-01-22]', color:'var(--accent)', tier:'estimate', src:'LightCounting + 证券时报 2026-01', asOf:'2026-06-14' },
    { label:'🇨🇳 中国大陆全球占比', value:'~60% (出货量)', note:'<strong>口径:全球出货量占比,非自给率</strong>;招商证券通信组 2026-02-15 + ICC 讯石 2026-04 双源印证', color:'var(--blue)', tier:'broker', src:'招商证券 + ICC 讯石 2026-02', asOf:'2026-06-14' },
    { label:'🤖 AI 算力核心驱动', value:'AI 超大集群 Scale-up + 分布式推理', note:'AI 集群 Scale-up 与多地分布式推理网络引发对高速率/低延时光互连的爆炸性需求 [tier: primary]', color:'var(--green)', tier:'primary', src:'Nvidia 2026 GTC + LightCounting 2026-06', asOf:'2026-06-14' },
    { label:'🏭 产业阶段', value:'1.6T 商用爆发初期', note:'从 800G 常态化放量步入 1.6T 商用爆发初期,硅光/CPO 架构渗透率迎来核心向上拐点 [tier: broker]', color:'var(--accent)', tier:'broker', src:'天风证券 2026-04-12', asOf:'2026-06-14' },
    { label:'📐 1.6T 光模块需求(2026E)', value:'1200-2000 万只', note:'<strong>1 源标"存疑(待核)"</strong>:维科号/OFweek 2026-05(存疑) + 发现报告云厂商 Capex 测算 2025-06-16', color:'var(--red)', tier:'estimate', src:'维科号(存疑) + 发现报告 2025-06', asOf:'2026-06-14' },
    { label:'⚡ 下一代催化', value:'CoWoS 扩产 + 3.2T + OFC 2026', note:'台积电 CoWoS 先进封装产能大规模释放、3.2T 以太网标准落地、OFC 2026 新秀产品量产 [tier: primary]', color:null, tier:'primary', src:'TSMC Q1 法说会 2026-04-18', asOf:'2026-06-14' },
    { label:'🔴 核心矛盾', value:'CSP 高 Capex 确定性 vs 200G EML+DSP 短缺', note:'下游北美四大 CSP 极高 Capex 增长确定性 vs 上游高阶光芯片(200G EML)及核心测试设备产能供给短缺 [tier: broker]', color:'var(--red)', tier:'broker', src:'国泰君安 2026-05-05', asOf:'2026-06-14' },
    { label:'📋 上游材料国产化率', value:'<mark class="updated">总装 >90% / 上游 EML <20%</mark>', note:'<strong>口径区分:总装国产化率>90% ≠ 上游 100G/200G EML/高端 DSP 自给率<20%</strong>;芯智讯 2026-03 + 长光华芯新品发布会 2025-03-14 双源', color:'var(--red)', tier:'estimate', src:'芯智讯 2026-03 + 长光华芯 2025-03', asOf:'2026-06-14' }
  ],

  // 5 列树状图(骨架框架 + Gemini 28 只分配)
  treeMap: {
    // ============ ① 下游 (3 个 sub-card) ============
    downstream: [
      { name:'AI 数据中心(AI 服务器+交换机)', barrier:'high', note:'英伟达 GB300/Rubin · 华为昇腾 · 单机柜价值量 200 万+', companies: [
        { name:'工业富联', code:'601138', position:'英伟达 AI 服务器整机代工龙头', barrier:'高' },
        { name:'中科曙光', code:'603019', position:'海光信息+智算中心', barrier:'高' },
        { name:'紫光股份', code:'000938', position:'新华三 AI 交换机/服务器', barrier:'高' }
      ]},
      { name:'电信设备(5G/骨干网)', barrier:'mid', note:'—', companies: [
        { name:'中兴通讯', code:'000063', position:'5G 基站+光通信设备', barrier:'高' },
        { name:'烽火通信', code:'600498', position:'光通信传输设备', barrier:'中' }
      ]},
      { name:'消费/工业/汽车', barrier:'low', note:'<strong>A 股无直接消费侧光模块标的</strong>(消费光模块用量小、单价低、利润薄;主战场在 AI 数据中心/电信设备)', companies: [] }
    ],
    // ============ ② 中游 (1 个 sub-card, 8 只光模块) ============
    midstream: [
      { name:'光模块制造(800G/1.6T/CPO/LPO)', barrier:'low', choke:false, note:'制造端 ≥10 家可切换,非物理卡口,但头部龙头规模+硅光技术领先', companies: [
        { name:'中际旭创', code:'300308', position:'全球光模块龙头(800G/1.6T 主力,深度绑定英伟达)', barrier:'极高' },
        { name:'新易盛', code:'300502', position:'800G/1.6T/LPO 核心供应商', barrier:'高' },
        { name:'光迅科技', code:'002281', position:'硅光+模块+芯片一体化', barrier:'高' },
        { name:'华工科技', code:'000988', position:'激光+光模块+传感器', barrier:'中' },
        { name:'联特科技', code:'301205', position:'1.6T 光模块新晋(马来工厂规避关税)', barrier:'中' },
        { name:'剑桥科技', code:'603083', position:'光模块+无线小基站', barrier:'中' },
        { name:'特发信息', code:'000070', position:'光纤缆+中低端光模块(AI 暴露弱)', barrier:'中' },
        { name:'铭普光磁', code:'002902', position:'磁性元器件+光模块转型(光模块占比小)', barrier:'中' }
      ]}
    ],
    // ============ ③ 上游材料 (3 个 sub-card) ============
    materials: [
      { name:'光芯片(DFB/EML/CW/可调激光器/探测器)', barrier:'extreme', choke:true, note:'占光模块 BOM ~25-35% · 全球<5家能批量 100mW+ CW · 卡口候选 ①+②', sourceSegment:'光芯片(DFB/EML/CW/可调激光器/探测器)' },
      { name:'硅光芯片(PIC)设计+代工', barrier:'extreme', choke:true, note:'1.6T 时代渗透率超 50% · CMOS 兼容 · 卡口候选 ③', sourceSegment:'硅光芯片 PIC(设计+代工/材料)' },
      { name:'光器件/光无源(FAU/MPO/AWG/隔离器/透镜)', barrier:'high', choke:false, note:'占光模块 BOM ~15-25% · CPO 推动 MPO 通道数 4→16→32→64+', sourceSegment:'光器件/光无源(FAU/MPO/AWG/隔离器/透镜)' }
    ],
    // ============ ④ 上游设备 (2 个 sub-card) ============
    equipment: [
      { name:'光模块测试设备(误码仪/光功率计/示波器)', barrier:'high', choke:false, note:'1.6T 推动测试精度升级 · Keysight/EXFO 海外主导 · 国产替代中', sourceSegment:'光模块测试与封装设备' },
      { name:'光模块封装+自动化设备(贴片/耦合/共晶焊)', barrier:'high', choke:false, note:'<strong>A 股纯封装+自动化设备无独立标的</strong>(罗博特科已并入"硅光 PIC"段,因拟收购 ficonTEC 切硅光耦合);键合/共晶焊设备依赖海外(K&S/AST 等)。', companies: [] }
    ],
    // ============ ⑤ 侧枝 (1 个 sub-card) ============
    sideBranches: [
      { name:'AI 服务器 PCB + 覆铜板(光模块间接配套)', barrier:'extreme', note:'光模块装入 AI 服务器 → AI 服务器 PCB/CCL 是间接上游配套', sourceSegment:'侧枝：AI 服务器 PCB + 覆铜板(光模块间接配套)' }
    ]
  },

  // 6 环节 segments —— 与 treeMap 5 列子节点 1:1 对齐
  segments: [
    {
      name:'光芯片(DFB/EML/CW/可调激光器/探测器)',
      costRatio:'光模块 BOM ~25-35%',
      barrier:'extreme', choke:true, border:true,
      intro:'光芯片是光模块的"心脏",决定模块的速率/距离/成本三大核心指标。<strong>全球<5家</strong>能批量 100mW+ CW 激光器,海外寡头(Lumentum/Coherent/Broadcom)主导。InP CW 激光器是 CPO/硅光架构唯一外置光源,需求随硅光渗透率(2026 首超 50%)呈指数级爆发。100G/200G EML 是 1.6T 单波 200G PAM4 调制核心,产能集中在海外极少数 IDM 大厂。',
      globalLandscape: [
        { lbl:'🥇 Lumentum(美)', val:'CW/EML 全球龙头', note:'InP 材料+外延工艺双壁垒' },
        { lbl:'🥈 Coherent(美)', val:'EML/CW 主力', note:'原 II-VI 与 Finisar 合并' },
        { lbl:'🥉 Broadcom(美)', val:'高速 EML', note:'200G EML 在研' },
        { lbl:'国内突破', val:'长光华芯 70mW CW / 源杰 100G EML', note:'国产化率<15%,从 0 到 1 突破期' }
      ],
      stocks: [
        { rank:1, name:'源杰科技', code:'688498', position:'国内极其稀缺的 100G/200G EML 量产及 IDM 平台', barrier:'极高', trend:'up', trendNote:'100G EML 订单兑现预期强,但估值受情绪波动', logic:'<strong>卡口 ② 主标的</strong>:国内极其稀缺的 100G/200G EML 量产及 IDM 平台。100G EML 开始交付,长光华芯发布 200G PAM4 EML。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 壁垒极高(4)但当前估值分位较高(2),业绩兑现节奏需观察', valAsOf:'2026-06-14', tier:'broker' },
        { rank:2, name:'长光华芯', code:'688048', position:'大功率 CW 激光器及高阶 VCSEL 国产化排头兵', barrier:'高', trend:'up', trendNote:'70mW CW 激光器发布填补空白,静待大客户验证', logic:'<strong>卡口 ① 主标的</strong>:大功率 CW 激光器(70mW CWDM4)+高阶 VCSEL 国产化排头兵。政策扶持力度大,产能正在释放。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 政策(4)+壁垒(4)双高,业绩能见度(3)中等(早期导入期),估值 PE 失真', valAsOf:'2026-06-14', tier:'broker' },
        { rank:3, name:'仕佳光子', code:'688313', position:'AWG 及 DFB 芯片细分龙头,无源+有源双轮驱动', barrier:'高', trend:'flat', trendNote:'传统数通需求复苏,但高端 AI 占比较小', logic:'AWG 及 DFB 芯片细分龙头,无源+有源双轮驱动。业绩能见度中等,供给稳定。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 AWG+DFB 双线,业绩能见度(3)+供给(3)中等', valAsOf:'2026-06-14', tier:'broker' },
        { rank:4, name:'炬光科技', code:'688167', position:'微光学器件及激光元器件全球领先,受益上游材料爆发', barrier:'高', trend:'flat', trendNote:'泛半导体与汽车业务拖累部分利润,光通信稳步增长', logic:'微光学器件及激光元器件全球领先,泛半导体+汽车+光通信三线。持久度好但短期业绩能见度一般。',
          dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 持久度(4)好但短期业绩(3)一般', valAsOf:'2026-06-14', tier:'broker' },
        { rank:5, name:'永鼎股份', code:'600105', position:'滤光片及部分光通信芯片研发能力,主做光纤缆', barrier:'中', trend:'down', trendNote:'AI 光模块核心增量相关性较弱', logic:'具备滤光片及部分光通信芯片研发能力,主做光纤缆。技术壁垒相对较低,估值合理,AI 暴露弱。',
          dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 壁垒(2)低+AI 暴露弱,纯超跌反弹逻辑', valAsOf:'2026-06-14', tier:'estimate' }
      ]
    },
    {
      name:'硅光芯片 PIC(设计+代工/材料)',
      costRatio:'光模块/光引擎 ~35%',
      barrier:'extreme', choke:true, border:true,
      intro:'硅光 PIC 是 1.6T 时代"光电共封装"的核心载体。2026 年硅光模块销售额预计首超整体光模块市场 50%。<strong>A 股</strong>无直接硅光代工标的(台积电 COUPE 平台主导),但 PIC 设计、TFLN 调制器(光库)、MEMS 代工(赛微)、硅光/CPO 耦合设备(罗博特科·拟收购 ficonTEC)构成国产化梯队。',
      globalLandscape: [
        { lbl:'🥇 TSMC COUPE 平台', val:'硅光代工全球主导', note:'3nm/5nm CMOS 工艺' },
        { lbl:'🥈 Intel Silicon Photonics', val:'硅光集成老牌', note:'可插拔模块主力' },
        { lbl:'🥉 Cisco Acacia', val:'相干硅光', note:'长距传输方案' }
      ],
      stocks: [
        { rank:1, name:'罗博特科', code:'300757', position:'拟收购 ficonTEC,垄断硅光/CPO 耦合与测试设备全球绝大部分产能', barrier:'极高', trend:'up', trendNote:'ficonTEC 并表预期及 1.6T 设备订单爆发', logic:'<strong>卡口 ③ 设备侧主标的</strong>:拟收购 ficonTEC,垄断硅光/CPO 耦合与测试设备全球绝大部分产能。垄断级壁垒+供给极度紧缺。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 垄断级壁垒(4)+供给极度紧缺(2),并表节点决定业绩弹性', valAsOf:'2026-06-14', tier:'broker' },
        { rank:2, name:'光库科技', code:'300620', position:'薄膜铌酸锂(TFLN)调制器绝对龙头,下一代相干通信核心', barrier:'极高', trend:'up', trendNote:'产业节点趋近,1.6T/3.2T 超长距传输方案开始导入', logic:'<strong>卡口 ③ 材料侧主标的</strong>:薄膜铌酸锂(TFLN)调制器绝对龙头,1.6T/3.2T 相干模块核心。技术壁垒高,但放量节点需观察。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 TFLN 壁垒(4)高,产能供给(3)稳定,估值(2)偏贵', valAsOf:'2026-06-14', tier:'broker' },
        { rank:3, name:'赛微电子', code:'300456', position:'全球 MEMS 代工龙头,具备硅光芯片代工制造能力与产能', barrier:'极高', trend:'up', trendNote:'受益于硅光模块流片需求大增及北京产线放量', logic:'全球 MEMS 代工龙头,硅光芯片代工制造能力。代工壁垒高,但折旧压力压制短期利润。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 代工壁垒(4)高,折旧压力压制短期利润', valAsOf:'2026-06-14', tier:'broker' }
      ]
    },
    {
      name:'光器件/光无源(FAU/MPO/AWG/隔离器/透镜)',
      costRatio:'光模块 BOM ~15-25%',
      barrier:'high', choke:false, border:false,
      intro:'CPO 推动 FAU/MPO 通道数从 4→16→32→64+,光器件需求随之爆发。天孚通信是全球光器件平台型龙头,深度绑定英伟达;太辰光/腾景科技/中瓷电子为细分领域代表。',
      globalLandscape: [
        { lbl:'🥇 天孚通信(国内)', val:'全球光器件龙头', note:'深度绑定英伟达,FA/MPO 全系列' },
        { lbl:'海外龙头', val:'Lumentum/Coherent/II-VI', note:'有源光器件主导' }
      ],
      stocks: [
        { rank:1, name:'天孚通信', code:'300394', position:'全球光器件龙头,深度绑定英伟达', barrier:'极高', trend:'flat', trendNote:'业绩连续超预期兑现,利润率一骑绝尘', logic:'全球光器件龙头,一站式提供从光引擎到隔离器核心组件,深度绑定英伟达。极高能见度但估值分位进入警戒区。',
          dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 极高能见度(4)+壁垒(4),估值分位进入警戒区(2)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:2, name:'太辰光', code:'300570', position:'MPO 高密度光纤连接器龙头,直接受益 AI 集群高密度布线', barrier:'中', trend:'up', trendNote:'北美大客户订单持续落地,北美建厂规避关税', logic:'MPO 高密度光纤连接器龙头,直接受益 AI 集群高密度布线。需求稳定可见,壁垒适中。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 需求稳定可见(4),壁垒(3)适中', valAsOf:'2026-06-14', tier:'broker' },
        { rank:3, name:'腾景科技', code:'688195', position:'精密光学元器件供应商,为核心模块厂提供滤光片/透镜', barrier:'中', trend:'up', trendNote:'跟随主设备商放量,合肥产线产能爬坡', logic:'精密光学元器件供应商,跟随主设备商放量。稳健的二线供应商,估值偏合理。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 稳健二线供应商,估值偏合理', valAsOf:'2026-06-14', tier:'broker' },
        { rank:4, name:'中瓷电子', code:'003031', position:'国内光通信陶瓷封装基板绝对龙头', barrier:'极高', trend:'up', trendNote:'消费电子回暖叠加高端 800G 光模块基板国产替代加速', logic:'国内光通信陶瓷封装基板绝对龙头,材料级卡脖子环节,自主可控急先锋。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 材料级卡脖子环节(4),自主可控急先锋(政策 4)', valAsOf:'2026-06-14', tier:'broker' }
      ]
    },
    {
      name:'光模块制造(800G/1.6T/CPO/LPO)',
      costRatio:'产业链总价值 ~40-50%',
      barrier:'low', choke:false, border:false,
      intro:'全球光模块制造 ≥10 家可切换,中游是充分竞争行业——<strong>不构成物理卡口</strong>。但中际旭创规模优势+硅光技术领先构成事实上的行业主导地位。1.6T 时代继续领跑并独揽首批核心份额。',
      globalLandscape: [
        { lbl:'🥇 中际旭创(国内)', val:'全球光模块龙头', note:'1.6T 时代继续领跑,独揽首批核心份额' },
        { lbl:'🥈 新易盛(国内)', val:'800G/1.6T/LPO 核心', note:'LPO 路线核心推手,业绩弹性极强' },
        { lbl:'🥉 光迅科技(国内)', val:'硅光+模块+芯片一体化', note:'内资电信盘基本面深厚' }
      ],
      stocks: [
        { rank:1, name:'中际旭创', code:'300308', position:'全球市占第一,1.6T 时代继续领跑并独揽首批核心份额', barrier:'极高', trend:'flat', trendNote:'Q1/Q2 财报不断验证景气度,博弈 2026 终局市占', logic:'全球市占率第一,1.6T 时代继续领跑。龙头能见度爆表,但估值存在微小透支。',
          dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 龙头能见度爆表(4),估值存在微小透支(2)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:2, name:'新易盛', code:'300502', position:'北美云厂商破局者,LPO 路线核心推手,业绩弹性极强', barrier:'高', trend:'up', trendNote:'在 Meta 及 Amazon 供应链中份额持续攀升,利润率改善', logic:'北美云厂商破局者,LPO 路线核心推手。弹性极大,客户拓展能见度高。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 弹性极大,客户拓展能见度高(4)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:3, name:'光迅科技', code:'002281', position:'稀缺的"光芯片+器件+模块"垂直整合大厂,内资电信盘基本面深厚', barrier:'极高', trend:'up', trendNote:'自研芯片能力降低 BOM 成本,数通 1.6T 取得突破', logic:'稀缺的"光芯片+器件+模块"垂直整合大厂。IDM 模式抗风险极强,估值安全垫较厚。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 IDM 模式抗风险极强(4),估值安全垫较厚(3)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:4, name:'华工科技', code:'000988', position:'全球领先的光模块厂,硅光与 LPO 布局深远', barrier:'中', trend:'flat', trendNote:'在北美市场面临一定拓展压力,国内算力市场份额稳固', logic:'全球领先的光模块厂,硅光与 LPO 布局深远。估值较低,但北美 AI 纯度略逊旭创。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 估值(3)较低,北美 AI 纯度略逊旭创', valAsOf:'2026-06-14', tier:'estimate' },
        { rank:5, name:'联特科技', code:'301205', position:'海外制造基地布局早,马来西亚工厂规避关税风险', barrier:'中', trend:'flat', trendNote:'800G 产能爬坡中,博弈能否挤入北美核心供应链', logic:'海外制造基地布局早,马来西亚工厂规避关税风险。具有突围潜力,但能见度偏低且估值弹性大。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 突围潜力,能见度(2)偏低+估值弹性大(2)', valAsOf:'2026-06-14', tier:'estimate' },
        { rank:6, name:'剑桥科技', code:'603083', position:'收购 Macom 日本资产切入高端光模块,LPO 路线积极跟跑者', barrier:'中', trend:'flat', trendNote:'前期炒作退潮,回归业绩验证期,1.6T 进展尚需跟踪', logic:'收购 Macom 日本资产切入高端光模块。基本面等待反转信号,估值已大幅回调。',
          dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 基本面等待反转信号,估值(3)已大幅回调', valAsOf:'2026-06-14', tier:'estimate' },
        { rank:7, name:'特发信息', code:'000070', position:'控股四川华拓,主营光纤缆及中低端光模块业务', barrier:'中', trend:'down', trendNote:'主要依赖国内政企及运营商市场,受地方财力牵制', logic:'控股四川华拓,主营光纤缆及中低端光模块业务。AI 算力关联度极低,纯超跌反弹逻辑。',
          dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'down',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 AI 算力关联度极低(2),纯超跌反弹逻辑', valAsOf:'2026-06-14', tier:'estimate' },
        { rank:8, name:'铭普光磁', code:'002902', position:'磁性元器件起家,积极向硅光模块与光器件转型', barrier:'中', trend:'flat', trendNote:'概念属性强于业绩兑现,光模块业务占比仍较小', logic:'磁性元器件起家,积极向硅光模块与光器件转型。壁垒有限,估值投机溢价高。',
          dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 壁垒(2)有限,估值投机溢价高(2)', valAsOf:'2026-06-14', tier:'estimate' }
      ]
    },
    {
      name:'光模块测试与封装设备',
      costRatio:'制造投资 ~10-15%',
      barrier:'high', choke:false, border:false,
      intro:'1.6T 高速光模块对测试设备精度要求提升,误码仪/光功率计/示波器国产替代加速。Keysight/EXFO 海外主导,普源/鼎阳/坤恒等国产化中,杰普特 MOPA 激光器龙头拓展至光模块测试。',
      globalLandscape: [
        { lbl:'🥇 Keysight(美)', val:'误码仪/示波器全球龙头', note:'高端测试设备' },
        { lbl:'🥈 EXFO(加)', val:'光通信测试', note:'OTDR/光功率计' },
        { lbl:'国内突破', val:'普源/鼎阳/坤恒/杰普特', note:'国产替代中' }
      ],
      stocks: [
        { rank:1, name:'杰普特', code:'688025', position:'MOPA 激光器龙头,拓展至光模块测试仪(BER/光示波器)', barrier:'高', trend:'up', trendNote:'受益 1.6T 测试设备国产替代及苹果 MR 设备检修订单', logic:'MOPA 激光器龙头,拓展至光模块测试仪。设备国产化逻辑硬,估值处于合理区间。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 设备国产化逻辑硬(4),估值合理(3)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:2, name:'普源精电', code:'688337', position:'国内数字示波器龙头,13GHz 高端示波器切入高速光通信测试', barrier:'极高', trend:'flat', trendNote:'高端化战略见效,但面临 Keysight 等海外巨头压制', logic:'国内数字示波器龙头,13GHz 高端示波器切入高速光通信测试。自主可控纯度极高,研发壁垒极强。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 自主可控纯度极高(4),研发壁垒极强(4)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:3, name:'鼎阳科技', code:'688112', position:'通用电子测试测量仪器龙头', barrier:'高', trend:'flat', trendNote:'教育科研市场平稳,产业端 1.6T 渗透仍在初期', logic:'通用电子测试测量仪器龙头,产品线涵盖射频微波及光通信基础测试。增长稳健,估值具备较高安全边际。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 增长稳健,估值安全边际(3)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:4, name:'坤恒顺维', code:'688283', position:'高端无线电测试仿真仪器破局者,拓展至光网络层测试', barrier:'高', trend:'up', trendNote:'受下游特定行业招投标延迟影响,业绩承压后探底企稳', logic:'高端无线电测试仿真仪器破局者。短期能见度受损,但政策底线支撑强。',
          dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 短期能见度受损(2),政策底线支撑强(4)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:5, name:'华兴源创', code:'688001', position:'面板及半导体检测设备龙头,参股或自研部分光电融合测试', barrier:'中', trend:'flat', trendNote:'消费电子复苏为主线,光通信测试占比尚小', logic:'面板及半导体检测设备龙头。基本面看苹果链脸色,算力溢价有限。',
          dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 基本面看苹果链,算力溢价有限', valAsOf:'2026-06-14', tier:'estimate' }
      ]
    },
    {
      name:'侧枝：AI 服务器 PCB + 覆铜板(光模块间接配套)',
      costRatio:'AI 服务器主板 BOM 约 15-25%',
      barrier:'extreme', choke:false, border:false,
      intro:'光模块最终装入 AI 服务器 → AI 服务器 PCB + 覆铜板(CCL)是光模块的<strong>间接上游配套</strong>。沪电/胜宏/生益是这条侧枝主线,也是 PCB 赛道本身的核心标的(跨赛道共享)。',
      globalLandscape: [
        { lbl:'🥇 沪电股份', val:'数通+AI 交换机 PCB 龙头', note:'78 层背板认证·Q1+62.9%' },
        { lbl:'🥈 胜宏科技', val:'Nvidia 显卡 PCB 核心', note:'GB300 PCB 主供' },
        { lbl:'🥉 生益科技', val:'覆铜板大陆第二', note:'M9 CCL 认证·Q1+105%' }
      ],
      stocks: [
        { rank:1, name:'沪电股份', code:'002463', position:'全球数通及 AI 交换机高多层 PCB 绝对龙头', barrier:'极高', trend:'flat', trendNote:'800G/1.6T 交换机及算力主板 HDI 订单饱满,满产满销', logic:'全球数通及 AI 交换机高多层 PCB 绝对龙头。业绩极度透明,产能紧缺,极具王者相。',
          dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 业绩极度透明(4)+产能紧缺(2),极具王者相', valAsOf:'2026-06-14', tier:'broker' },
        { rank:2, name:'胜宏科技', code:'300476', position:'Nvidia 显卡 PCB 核心供应商,加速切入 AI 服务器主板', barrier:'高', trend:'up', trendNote:'产品结构向高阶 HDI 转移,盈利能力逐季修复', logic:'Nvidia 显卡 PCB 核心供应商。算力绑定深厚,估值对比沪电具备一定性价比。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 算力绑定深厚,估值具备一定性价比(3)', valAsOf:'2026-06-14', tier:'broker' },
        { rank:3, name:'生益科技', code:'600183', position:'国内覆铜板(CCL)龙头,高端 M6/M7 级材料通过北美大客户认证', barrier:'高', trend:'up', trendNote:'传统 CCL 触底反弹,高速材料打破海外垄断放量', logic:'国内覆铜板(CCL)龙头,高端 M6/M7 级材料。原材料国产替代典范,估值极具吸引力。',
          dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
          dims6Note:'🆪 国产替代典范(4),估值极具吸引力(3)', valAsOf:'2026-06-14', tier:'broker' }
      ]
    }
  ],

  // 中游制造(按 PCB 范式单列,与 segments[3] 内容重复但视图独立)
  midstream: {
    description:'光模块制造是充分竞争行业——全球≥10 家可切换,<strong>不构成物理卡口</strong>。但中际旭创规模优势+硅光技术领先构成事实上的行业主导地位。卡口结论见 segments[0-2] + chokePoints。',
    stocks: [
      { rank:1, name:'中际旭创', code:'300308', barrier:'极高', trend:'flat', trendNote:'Q1/Q2 财报不断验证景气度,博弈 2026 终局市占', note:'<strong>全球光模块龙头</strong> · 1.6T 独揽首批核心份额 · 深度绑定英伟达/谷歌', dims6:[
        { key:'durability', score:5, trend:'flat', tier:'estimate' },
        { key:'visibility', score:5, trend:'up', tier:'estimate' },
        { key:'policy', score:3, trend:'flat', tier:'estimate' },
        { key:'supply', score:3, trend:'flat', tier:'estimate' },
        { key:'valuation', score:1, trend:'down', tier:'estimate' },
        { key:'barrier', score:5, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 壁垒安全垫(5)+景气持续性(5)双满,业绩可见度(5)季度财报连续验证;但估值性价比(1)反映历史极高分位+情绪溢价;供需(3)是中游制造的天然中性;政策(3)中美科技博弈双向风险同在', tier:'broker' },
      { rank:2, name:'新易盛', code:'300502', barrier:'高', trend:'up', trendNote:'Meta/Amazon 供应链中份额持续攀升', note:'<strong>800G/1.6T/LPO 核心供应商</strong> · 北美云厂商破局者 · 业绩弹性极强', dims6:[
        { key:'durability', score:4, trend:'up', tier:'estimate' },
        { key:'visibility', score:4, trend:'up', tier:'estimate' },
        { key:'policy', score:3, trend:'flat', tier:'estimate' },
        { key:'supply', score:3, trend:'flat', tier:'estimate' },
        { key:'valuation', score:2, trend:'down', tier:'estimate' },
        { key:'barrier', score:4, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 景气(4)+可见度(4)次于旭创但仍在高位;估值(2)略好于龙头;壁垒(4)中游第二梯队龙头;弹性大但客户集中度+北美关税风险同步放大', tier:'broker' },
      { rank:3, name:'光迅科技', code:'002281', barrier:'极高', trend:'up', trendNote:'自研芯片降低 BOM 成本,数通 1.6T 取得突破', note:'<strong>硅光+模块+芯片一体化</strong> · IDM 模式 · 1.6T 硅光批量', dims6:[
        { key:'durability', score:4, trend:'up', tier:'estimate' },
        { key:'visibility', score:4, trend:'up', tier:'estimate' },
        { key:'policy', score:4, trend:'up', tier:'estimate' },
        { key:'supply', score:4, trend:'up', tier:'estimate' },
        { key:'valuation', score:2, trend:'down', tier:'estimate' },
        { key:'barrier', score:5, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 壁垒(5)硅光+模块+芯片 IDM 一体化,中游唯一自研光芯片;政策(4)国产替代直接受益;估值(2)反映 IDM 重资产折价;供给(4)上游芯片自给缓解外部卡口', tier:'broker' },
      { rank:4, name:'华工科技', code:'000988', barrier:'中', trend:'flat', trendNote:'北美市场拓展承压,国内份额稳固', note:'<strong>激光+光模块+传感器</strong> · 激光业务对冲 · 北美 AI 纯度略逊旭创', dims6:[
        { key:'durability', score:3, trend:'flat', tier:'estimate' },
        { key:'visibility', score:3, trend:'flat', tier:'estimate' },
        { key:'policy', score:3, trend:'flat', tier:'estimate' },
        { key:'supply', score:3, trend:'flat', tier:'estimate' },
        { key:'valuation', score:3, trend:'flat', tier:'estimate' },
        { key:'barrier', score:2, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 激光业务对冲光模块景气,北美 AI 纯度低拖累估值弹性;壁垒(2)中游第二梯队;各项 3 分为行业中性,无显著差异化', tier:'broker' },
      { rank:5, name:'联特科技', code:'301205', barrier:'中', trend:'flat', trendNote:'800G 产能爬坡中,博弈挤入北美核心供应链', note:'<strong>1.6T 光模块新晋</strong> · 马来工厂规避关税 · 突围潜力', dims6:[
        { key:'durability', score:3, trend:'up', tier:'estimate' },
        { key:'visibility', score:3, trend:'up', tier:'estimate' },
        { key:'policy', score:4, trend:'up', tier:'estimate' },
        { key:'supply', score:3, trend:'up', tier:'estimate' },
        { key:'valuation', score:3, trend:'flat', tier:'estimate' },
        { key:'barrier', score:2, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 马来工厂规避关税是政策(4)差异化亮点;1.6T 新晋突围有博弈空间;但壁垒(2)客户认证未稳,属高赔率低胜率标的', tier:'estimate' },
      { rank:6, name:'剑桥科技', code:'603083', barrier:'中', trend:'flat', trendNote:'前期炒作退潮,回归业绩验证期', note:'<strong>光模块+无线小基站</strong> · 收购 Macom 日本资产 · LPO 跟跑', dims6:[
        { key:'durability', score:3, trend:'flat', tier:'estimate' },
        { key:'visibility', score:2, trend:'down', tier:'estimate' },
        { key:'policy', score:3, trend:'flat', tier:'estimate' },
        { key:'supply', score:2, trend:'flat', tier:'estimate' },
        { key:'valuation', score:3, trend:'flat', tier:'estimate' },
        { key:'barrier', score:2, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 LPO 跟跑+Macom 日本资产整合存不确定性;可见度(2)与供给(2)双低;属修复型标的,等业绩验证', tier:'estimate' },
      { rank:7, name:'特发信息', code:'000070', barrier:'中', trend:'down', trendNote:'主要依赖国内政企及运营商', note:'<strong>光纤缆+中低端光模块</strong> · AI 暴露弱 · 纯超跌反弹', dims6:[
        { key:'durability', score:2, trend:'down', tier:'estimate' },
        { key:'visibility', score:2, trend:'flat', tier:'estimate' },
        { key:'policy', score:2, trend:'flat', tier:'estimate' },
        { key:'supply', score:2, trend:'flat', tier:'estimate' },
        { key:'valuation', score:4, trend:'up', tier:'estimate' },
        { key:'barrier', score:2, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 估值(4)是唯一亮点(超跌反弹);其余维度均偏弱,AI 暴露弱,纯题材属性,无卡口逻辑支撑', tier:'estimate' },
      { rank:8, name:'铭普光磁', code:'002902', barrier:'中', trend:'flat', trendNote:'概念属性强于业绩兑现', note:'<strong>磁性元器件+光模块转型</strong> · 壁垒有限 · 估值投机溢价', dims6:[
        { key:'durability', score:2, trend:'flat', tier:'estimate' },
        { key:'visibility', score:2, trend:'flat', tier:'estimate' },
        { key:'policy', score:2, trend:'flat', tier:'estimate' },
        { key:'supply', score:2, trend:'flat', tier:'estimate' },
        { key:'valuation', score:2, trend:'down', tier:'estimate' },
        { key:'barrier', score:1, trend:'flat', tier:'estimate' }
      ], dims6Note:'🆪 壁垒(1)最低,概念属性强;估值(2)已透支;属纯题材标的,无业绩/卡口逻辑支撑', tier:'estimate' }
    ]
  },

  // 四问筛选(基于 Gemini 核实的硬事实填实 q1-q4note,信源同 logic/verification 段)
  fourQuestions: {
    segments: [
      {
        name:'光芯片(100mW+ CW 激光器)',
        stocks: [
          { name:'源杰科技', code:'688498', q1:true, q1note:'全球具备 100mW+ CW InP 激光器量产能力的供应商 ≤3 家(Coherent/Lumentum/源杰部分品类)', q2:true, q2note:'InP 外延+晶圆扩产周期 18-24 个月(LC 2026-06 + 中金研报口径一致)', q3:true, q3note:'CPO/硅光架构需外置高功率 CW 光源,不可被 EML 或硅光直接替代', q4:true, q4note:'英伟达 GB300/Rubin 1.6T + 谷歌 TPU v6 1.6T 模块刚需 CW 光源(LC 2026-06 报告披露 1.6T 需求超 1200 万只)', hits:4, strength:'★★★' },
          { name:'长光华芯', code:'688048', q1:false, q1note:'100G/200G EML 全球供应商家数较多(源杰/Lumentum/Coherent/Broadcom 等 ≥4 家),寡头格局弱于 CW', q2:true, q2note:'EML 量产周期 12-18 个月,介于 CW 激光器与硅光 PIC 之间', q3:false, q3note:'源杰等已实现 100G EML 量产,200G 在送样测试,海外 IDM 大厂可替代', q4:true, q4note:'1.6T 8x200G EML 架构仍是主流(LC 2026-06),但有被硅光方案分流的可能', hits:2, strength:'★★☆' }
        ]
      },
      {
        name:'硅光芯片 PIC(设计+代工)',
        stocks: [
          { name:'光迅科技', code:'002281', q1:false, q1note:'硅光设计+代工全球可独立完成 >5 家(Intel/Marvell/Broadcom + 中际旭创等模块厂自研),寡头格局未形成', q2:true, q2note:'1.6T 硅光模块客户验证周期 12-18 个月(中际旭创 1.6T 硅光批量公告 2026-Q1)', q3:false, q3note:'中际旭创/新易盛等模块厂具备硅光自研能力,光迅非唯一卡口', q4:true, q4note:'CPO 核心器件+硅光渗透率 2026 预计 >50%(LC 2026-06 报告),确定性高', hits:2, strength:'★★☆' }
        ]
      },
      {
        name:'光模块制造(充分竞争)',
        stocks: [
          { name:'中际旭创', code:'300308', q1:false, q1note:'全球光模块制造厂 >10 家可切换(新易盛/光迅/Coherent/II-VI/Lumentum/华工等),非寡头格局', q2:false, q2note:'800G/1.6T 量产已规模化,扩产周期 6-9 个月,非产能瓶颈', q3:false, q3note:'新易盛/光迅/Coherent/II-VI/Lumentum 均可替代,客户可分单', q4:false, q4note:'光模块非上游卡口,属中游充分竞争,1.6T 需求再强也分流', hits:0, strength:null }
        ]
      }
    ]
  },

  // 3 大卡口(Gemini valuation/verification array → PCB object)
  chokePoints: [
    {
      rank:1, name:'长光华芯', code:'688048', segment:'大功率 CW 激光器', strength:'★★★',
      logic:'硅光模块与 CPO 架构的唯一外置"引擎",不可或缺的光源核心。硅光渗透率在 2026 年首超 50%,必然带动提供连续波光源的 InP CW 激光器需求呈指数级爆发。',
      tags:['高壁垒','高功率(70mW+)','InP 材料','硅光命脉'],
      valuation: {
        pe:'PE-TTM 失真(早期导入,2026 利润近零/Gemini 核实 2025 年报母公司未弥补亏损 PE 为负)',
        peAbsolute:'PE-TTM 失真(2025 年报母公司未弥补亏损、PE 为负,不作硬依据);上市<5y 不构成 5y 分位;同 PCB 圣泉 301217 案例处理',
        pePercentile:null,
        grossMargin:'30.09%(2025 综合毛利,经营扭亏爬坡期,巨潮 2026-04 一季报披露)',
        fromHigh:'(2026-06-14 数据·相对前高位置未独立核实)',
        asOf:'2026-06-14',
        tier:'broker',
        src:'巨潮资讯网 2025 年报 + 2026 一季报 http://www.cninfo.com.cn · PE 失真为 primary / 毛利率为 primary',
        note:'🆪 估值逻辑:稀缺性溢价+硅光技术放量前夜的 PEG 预期提升. 单模块价值占比 ~10-15%. 2026 年市场空间估算:超 5 亿美元. 国产渗透现状:本土自给率<15%,长光华芯等厂商刚完成从 0 到 1 突破. ⚠️ 2025 年报母公司未弥补亏损致 PE 失真,建议改用 PS(收入规模) / 在研产品大客户验证进度交叉验证;毛利率 30.09% 是 IDM 重资产折价典型水平(圣泉 M9 同档)'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'InP CW 激光器需求已带动供应短缺(LC 2026-06 报告)', howToCheck:'查 LightCounting 2026 Q2 报告原文,看 InP CW 供需比具体数字;对比 Lumentum/Coherent 季报披露的产能利用率', falsifySignal:'缺货快速缓解 / 海外大厂释放新产能 → 卡口降级', status:'pending' },
          { type:'技术突破', claim:'长光华芯公开发布 70mW CWDM4 CW Laser 填补国内空白(2025-03-14)', howToCheck:'查长光华芯公司公告/官网新品发布;查大客户(光迅/中际旭创)导入验证进度', falsifySignal:'客户验证失败 / 海外大厂降价压制 → 卡口降级', status:'pending' },
          { type:'风险核查', claim:'高功率良率爬坡不及预期,Lumentum 等海外大厂专利压制', howToCheck:'查中金公司研报风险提示;查长光华芯最新季报毛利率与研发投入', falsifySignal:'毛利率大幅下滑 / 核心专利诉讼失利 → 卡口降级', status:'pending' },
          { type:'口径区分', claim:'此处市占率为国产化供应比率(自给率),非全球出货市占率', howToCheck:'对比 LC / 中金 / 招商证券三家独立报告对国产化率口径定义', falsifySignal:'口径混乱无法对齐 → 评级降级', status:'pending' }
        ],
        note:'🆪 初始版本验证清单 — 实际状态需手动核查后切换 status: pending→verified/falsified'
      }
    },
    {
      rank:2, name:'源杰科技', code:'688498', segment:'100G/200G EML 光芯片', strength:'★★★',
      logic:'800G(单波 100G)与 1.6T(单波 200G)光模块内部单体价值量最高的电吸收调制激光器。1.6T 时代主流方案仍将是 8x200G EML 架构,产能集中在海外极少数 IDM 大厂,国内具备量产能力的标的极具稀缺性。',
      tags:['单波 200G','PAM4 调制','IDM 模式','价值量极高'],
      valuation: {
        pe:'PE-TTM 394.68x (2026-05-15 收盘口径,业绩兑现期流动性溢价,broker)',
        peAbsolute:'PE-TTM 394.68x(新浪财经 2026-05-15,broker 口径,业绩拐点初期流动性溢价);PE(2025A) ~155x(estimate 券商研报一致性预期,待核);上市<5y 不构成 5y 分位',
        pePercentile:null,
        grossMargin:'58.15%(2025 年报披露,数据中业务毛利率 >72%,整体光芯片 58.15%)',
        fromHigh:'(2026-06-14 数据·相对前高位置未独立核实)',
        asOf:'2026-06-14',
        tier:'broker',
        src:'新浪财经 PE 页 https://finance.sina.com.cn (2026-05-15) + 证券时报 2025 年报披露毛利率 · PE 为 broker(非一手)/ 毛利率为 primary',
        note:'🆪 估值逻辑:高壁垒带来高毛利,业绩弹性极大,属赛道"皇冠上的明珠". 单模块价值占比 ~20-30%. 2026 年市场空间估算:约 10-15 亿美元. 国产渗透现状:100G 小批量供货,200G 多在送样测试期. ⚠️ PE-TTM 394.68x 是 TTM 口径(2025 利润基数极低所致)流动性溢价,非可比常态;PE(2025A) ~155x 仅为券商预测,estimate 待核;估值极高,谨防业绩兑现节奏不及预期'
      },
      verification: {
        items: [
          { type:'产能缺口', claim:'LC 提示 InP EML 产能短缺,需求超出供应 30%,2026 年底前难缓解', howToCheck:'查 LC 2026 Q2 报告原文,看 InP EML 供需比具体数字;对比 Lumentum/Coherent/Broadcom 季报', falsifySignal:'缺口快速收窄 / 海外大厂集中扩产 → 卡口降级', status:'pending' },
          { type:'国产突破', claim:'源杰科技 100G EML 开始交付,长光华芯发布 200G PAM4 EML(2026-04 公告)', howToCheck:'查沪深交易所公司公告(投资者问答)原文;查下游模块厂(中际旭创/新易盛)导入验证进度', falsifySignal:'客户验证失败 / 200G 量产延期 → 卡口降级', status:'pending' },
          { type:'风险核查', claim:'美国对核心外延片生长设备的出口管制,以及下游 DSP 厂商绑售自家光芯片的排他性挤压', howToCheck:'查国盛证券风险提示;查源杰科技投资者关系活动记录', falsifySignal:'出口管制升级 / 核心客户切换 → 卡口降级', status:'pending' },
          { type:'口径对齐', claim:'数据口径为美元计算的全球光芯片 TAM(Total Addressable Market)', howToCheck:'对比 LC / 中信建投 / 中金三家独立报告对 TAM 口径定义', falsifySignal:'口径混乱无法对齐 → 评级降级', status:'pending' }
        ],
        note:'🆪 初始版本验证清单 — 实际状态需手动核查后切换'
      }
    },
    {
      rank:3, name:'光库科技', code:'300620', segment:'硅光 PIC 设计+薄膜铌酸锂(TFLN)', strength:'★★☆',
      logic:'强代际替代性。利用 CMOS 工艺实现光子器件的高密度集成,解决 1.6T 时代功耗与成本瓶颈。一旦良率跨过经济学临界点,硅光方案的 BOM 成本将显著低于传统分立方案(EML),设计与代工环节将通吃长尾利润。',
      tags:['CMOS 兼容','光电共封装','薄膜铌酸锂','降本增效'],
      valuation: {
        pe:'PE-TTM 失真(2026-06-14 实时行情数据未核;业绩拐点初期,沿用范围值口径)',
        peAbsolute:'PE-TTM 失真(2026-06-14 实时数据未核,estimate);Gemini 标注光库实际 PE ~71.5x(口径差异待核);上市<5y 不构成 5y 分位',
        pePercentile:null,
        grossMargin:'26.47%(2025H1 光通讯器件板块毛利率,巨潮 2025 半年度报告披露,broker 口径,待 2025 年报最终归集数据更新)',
        fromHigh:'(2026-06-14 数据·相对前高位置未独立核实)',
        asOf:'2026-06-14',
        tier:'estimate',
        src:'巨潮资讯网 光库科技 2025 半年度报告 http://www.cninfo.com.cn · 毛利率为 broker(半年度口径,非全年)/ PE 为 estimate 待核',
        note:'🆪 估值逻辑:渗透率非线性跃升期(S 曲线陡峭段)的典型成长股估值. PIC 芯片占硅光模块价值量超 30%. 2026 年市场份额估测:硅光模块销售额将首超整体光模块市场的 50%. 国产渗透现状:中际旭创等模块厂具备设计能力,赛微等具备硅光/CPO 代工能力. ⚠️ PE-TTM 失真(2026-06-14 数据未核),estimate 待核;毛利率 26.47% 是 2025H1 半年度口径,非全年最终值;上市<5y 不构成 5y 分位'
      },
      verification: {
        items: [
          { type:'趋势验证', claim:'2026 年硅光模块预计市占率>50%,台积电与三星全面进军硅光制造代工', howToCheck:'查台积电北美技术论坛 2026-05 资料;查 LightCounting 2026 硅光模块销售额数据', falsifySignal:'硅光渗透率不及预期 / 海外大厂放缓代工投入 → 卡口降级', status:'pending' },
          { type:'技术路线验证', claim:'薄膜铌酸锂(TFLN)在 1.6T 相干模块中崭露头角,光库科技具备先发优势', howToCheck:'查天风证券研报 2026-03 原文;查光库科技公司公告/官网 TFLN 量产计划', falsifySignal:'TFLN 路线被替代 / 光库量产延期 → 卡口降级', status:'pending' },
          { type:'风险核查', claim:'硅光耦合工艺难度高,当前规模化生产的良率不稳定性依然存在', howToCheck:'查招商证券研报 2026-04 风险提示;查光库科技最新季报毛利率水平', falsifySignal:'良率持续低于 80% / 毛利率大幅下滑 → 卡口降级', status:'pending' },
          { type:'口径对齐', claim:'硅光占比口径为销售额占比,非单纯出货量', howToCheck:'对比 LC / 招商证券 / 中信建投三家独立报告对硅光占比口径定义', falsifySignal:'口径混乱无法对齐 → 评级降级', status:'pending' }
        ],
        note:'🆪 初始版本验证清单 — 实际状态需手动核查后切换'
      }
    }
  ],

  // 3 条供需缺口(Gemini 细类)
  supplyGap: [
    { segment:'1.6T 光模块', demand:'2026 年全球需求超 1200 万只,头部 CSP 需求暴增 [tier: estimate][来源1: 发现报告 2025-06-16] [来源2: 维科号 2026-05,存疑(待核)]', capacity:'封装产能充足,但受限核心组件,实际有效产出约 800-1000 万只', gap:'约 20-30% 绝对缺口', rate:'供需比 ~0.8:1,紧平衡', bottleneck:'极度依赖 Marvell/Broadcom 的 DSP 电芯片交期,以及 200G EML 的良率分配', tier:'broker', src:'招商证券通信组深度报告 2026-05' },
    { segment:'200G EML 光芯片', demand:'配合 1.6T 及 800G 下沉,2026 年需求激增至数千万颗级别 [tier: broker][来源: 中信建投测算 2026-04]', capacity:'产能死锁于海外巨头(Lumentum/Coherent),国内刚起步', gap:'全球缺口极高,国内近乎 100% 依赖进口分配', rate:'国产供需比 < 0.1:1', bottleneck:'InP 衬底材料的海外出口管制威胁,及高频电极设计和外延生长的良率墙', tier:'primary', src:'长光华芯公开纪要/ICC 讯石产业调研 2026-04' },
    { segment:'大功率 CW 激光器', demand:'CPO/硅光模块销售占比在 2026 年突破 50%,配套高功率光源需求呈指数级爆发 [tier: primary][来源: LightCounting 2026-06-02]', capacity:'大厂优先保供自身高端模块,外部商用流通盘极度稀缺', gap:'高缺口,特定波段(如 1310nm 70mW+)现货一芯难求', rate:'缺货率达 20-40%', bottleneck:'大功率下的散热处理导致寿命测试难过关,且生产耗费大量测试设备机时', tier:'media', src:'华为 JDC 社区/C114 通信网 2026-05' }
  ],

  methodologyNotes:'光模块产业链的卡口特征:<strong>制造端(中游)≥10 家可切换 = 不构成物理卡口</strong>(segments[3] 4 问 0 命中,方法论正常结果);<strong>卡口集中在上游光芯片/硅光 PIC 端</strong>(segments[0-1])。3 大卡口候选 = ① 大功率 CW 激光器(长光华芯主供,★) ② 100G/200G 高速 EML(源杰科技,★) ③ 硅光 PIC+TFLN(光库科技,★☆)。<br><br><strong>【口径铁律】</strong>光模块总装国产化率>90% 但上游 100G/200G EML 自给率<20%——两者完全不同口径(总装出货量 vs 高端光芯片供应),不可混为一谈。<br><br><strong>【方法论边界】</strong>本赛道 28 只 A 股覆盖 6 段(光芯片 5/硅光 PIC 3/光器件 4/光模块制造 8/测试设备 5/侧枝 PCB-CCL 3)。原骨架 22 只被 Gemini 重写为 28 只:罗博特科从"测试设备"段移到"硅光 PIC"段(因拟收购 ficonTEC 切硅光耦合),原"精测电子/思林杰"被"普源精电/鼎阳科技/坤恒顺维/华兴源创"替代(测试设备国产替代代表更新)。侧枝从"光纤光缆"改用"AI 服务器 PCB+CCL"——后者"光模块装入 AI 服务器"逻辑更聚焦主线,接受与 PCB 赛道跨赛道共享。'
};

})(window.CHAINS);
