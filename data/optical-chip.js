// data/optical-chip.js  —— 升级十 场景 B 第 1 步产物：光芯片赛道骨架(2026-06-16)
// 关联赛道:optical(光模块整链) / 上下游关系:光芯片 ← optical(光模块整链) ← PCB(AI 服务器配套)
// 本文件 = 场景 B 步骤 1 骨架(结构+个股名单),"会变的数据"全留待核,不联网、不 commit
//
// === 骨架设计原则 ===
// 1. segments 按"光子学价值链"自上游至下游切 6 段(芯片代工/外延材料 → 激光器/探测器芯片 → 硅光 PIC
//    → 调制/接收/合分波 → 测试/封装设备 → 模块应用),与 optical(光模块整链)的 6 段互补
// 2. 候选卡口 3 个:① 大功率 CW/EML 激光器芯片(物理卡口) ② 高速探测器(PD/APD) ③ 硅光 PIC 设计
// 3. 六维/个股六维全部留空/待核,barrier 维按个股预映射
// 4. 避免陷阱:不填 socraticInquiry/occamRazor、不预填 myTrades、不破坏分隔行、不加自定义 CSS
//
// === 字段口径区分(写入 highlightBox) ===
// "全球市占率"=全球出货份额;"国产化率"=中国市场本土厂商供应份额,≠ 同一概念(常见混淆陷阱)

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== OPTICAL-CHIP ====================
CHAINS['optical-chip'] = {
  id: 'optical-chip', name: '光芯片', icon: '🔬',
  // ★ 赛道级 meta(注入 2026-06-16)
  //   status 维持 'placeholder':6 维 valuation 维门控触发留空,综合分不参与 arena 排序(S4 仍不完全达标)
  meta: { sector:'上游', tier:'核心', status:'placeholder', updatedAt:'2026-06-16', ltFit:'🆪 适合长线研究/跟踪——AI 算力超级上行驱动,景气持续性+壁垒安全垫双高,但估值维门控触发' },

  // ★ 升级九 STEP 2:景气六维 —— 骨架注入(2026-06-16 联网核实后)
  //   5 维 estimate 🆪 主观打分,1 维(估值)门控触发留 null
  //   score 1-5 范围(参考 pcb 规范):5=极度顺 / 4=顺 / 3=中性 / 2=逆 / 1=极度逆
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:4, trend:'up',
        reason:'🆪 200G EML 全球缺口 25-30%,Lumentum FY26Q2 InP 扩产超 20% 仍难弥合(G0-2 ②单源:国盛电子 2026-03-15 + 新浪 2026-05-25 同源);1.6T 拉动下光芯片代际周期 18-24 月,长周期持续性高',
        evidence:'国盛电子《AI 引爆供需缺口》2026-03 + 新浪 2026-05', flag:'🆪', tier:'media', src:'国盛电子 + 新浪(同源) 2026-03~05', asOf:'2026-06-16' },
      { key:'visibility', name:'业绩可见度', score:4, trend:'up',
        reason:'🆪 中际旭创 26Q1 营收 195 亿(+192.1%)/净利 57.3 亿(+262.3%) 1.6T 占比攀升(G1-9 ②单源:山证通信 2026-05-28)+ 仕佳光子 26Q1 营收 5.77 亿(+32.18%)/净利 1.16 亿(+24.66%)(G1-10 ①命中 broker:中原通信+银河通信 2026-04~05 双源);头部订单可见度高 ⚠️长光华芯 26Q1 表观扭亏但扣非仍亏,业绩质量需观察',
        evidence:'山证通信 2026-05 + 中原通信 2026-05 + 银河通信 2026-04', flag:'🆪', tier:'broker', src:'中原通信 2026-05 + 银河通信 2026-04(仕佳双源)+ 山证通信 2026-05(中际单源)', asOf:'2026-06-16' },
      { key:'policy',    name:'政策确定性', score:3, trend:'flat',
        reason:'🆪 ① 美国 BIS 对 InP 衬底/外延设备出口管制动向(G1-8 ②待补无源) + ② 国内"东数西算"光通信政策顺风(沿用 optical 赛道口径)。整体中性偏顺,但出口管制动向未明 ⚠️',
        evidence:'无源(政策类)', flag:'🆪', tier:'estimate', src:'AI 主观判断 + 沿用 optical 政策口径', asOf:'2026-06-16' },
      { key:'supply',    name:'供需紧张度', score:5, trend:'up',
        reason:'🆪 海外寡头 95%+ 主导(G0-1 ①命中 media:新浪 2026-05-25 + 钛媒体 2026-06-11)+ 200G EML 缺口 25-30%(G0-2)+ 住友 60% / AXT 35% InP 衬底 95% 垄断(G1-2 ①命中 media:腾讯 2026-01-23 + 机构历史研报)。三源印证供给极度紧张',
        evidence:'新浪 2026-05 + 钛媒体 2026-06 + 腾讯 2026-01', flag:'🆪', tier:'media', src:'新浪 2026-05 + 钛媒体 2026-06(海外寡头)+ 腾讯 2026-01(InP 衬底)', asOf:'2026-06-16' },
      { key:'valuation', name:'估值性价比', score:null, trend:null,
        reason:'⚠️ 门控触发:G1-6 PE 分位 5 只核心标的全无源,TTM 失真风险高(长光华芯 2025 亏 3841 万、26Q1 扣非仍亏;源杰/光库 early-stage 阶段 TTM 不可作硬依据)。估值维留空,综合分不参与 arena 排序',
        evidence:'无源(PE 分位)', flag:'🆪', tier:null, src:null, asOf:null },
      { key:'barrier',   name:'壁垒安全垫', score:5, trend:'flat',
        reason:'🆪 100G/200G EML 海外寡头 95%+ 主导(G0-1)+ 70mW CW 国内多家跑通但仍依赖海外(源杰/仕佳/索尔思)(G0-3 ①命中 media:OFweek 2025-12 + 财富号 2026-04)+ InP 衬底 95% 海外垄断(G1-2)+ 长光华芯光通信 2025 毛利 12.81%(G1-11 ①命中 broker:东财+新浪,反映国内竞争激烈)。壁垒高但国产化率极低',
        evidence:'OFweek 2025-12 + 财富号 2026-04 + 腾讯 2026-01 + 新浪 2026-06', flag:'🆪', tier:'media', src:'OFweek 2025-12 + 财富号 2026-04(70mW)+ 腾讯 2026-01(InP)+ 新浪 2026-06(毛利)', asOf:'2026-06-16' }
    ],
    verdict: {
      longTermFit:'🆪 适合长线研究/跟踪——AI 算力超级上行驱动,景气持续性+壁垒安全垫双高,但估值维门控触发',
      oneLine:'🆪 光芯片是"景气持续性(4)+业绩可见度(4)+供需紧张度(5)+壁垒安全垫(5)"四高、但"估值性价比"门控触发的赛道:长线逻辑顺,胜负手在国产化率突破节奏(100G/200G EML <10%)与买点(PE 分位回踩)。',
      stockHint:'环节指引: 优先 T0/T1 卡口(激光器★★★ / 硅光 PIC ★★★)+ G0-1 海外寡头主导下的国产化突破标的(源杰/长华/光库);买点指引: 等 PE 分位回踩或扣非业绩兑现后再加仓(长光华芯 26Q1 表观扭亏但扣非仍亏,需观察业绩质量);方法论: AI 算力卡脖子赛道的胜负手在"海外寡头产能扩张速度 vs 国产化率提升节奏"'
    }
  },

  // 周期位置(注入 2026-06-16)
  cyclePosition: { stage:'boom', label:'高景气度兑现期(1.6T 实质性放量期 + 卡脖子破冰期)', reason:'🆪 200G EML 全球缺口 25-30%(G0-2),Lumentum InP 扩产 20% 仍难弥合(G0-2);1.6T 进入规模商用元年;但 100G/200G EML 国产化率<10% 处于"卡脖子破冰期",景气度高+替代空间大(AI 初版,周一 cron 覆盖)',
    watchSignals:[
      '北美四大 CSP 季度资本开支实际值及未来指引 [tier: primary][来源: 财报季 SEC 文件]',
      'Lumentum/Coherent 季度法说会 100G/200G EML 产能释放节奏 [tier: primary][来源: Lumentum/Coherent 季报]',
      '源杰科技 100G/200G EML 月度出货量及客户认证名单(中际旭创/英伟达?) [tier: estimate][来源: 公司公告 + 招商证券]',
      '美国商务部对 InP 衬底/外延设备/光芯片的出口管制动向 [tier: primary][来源: 美国 BIS 官网]'
    ]
  },

  // ⓪ 白话解读(骨架,留待核;已知卡口视角 + 口径区分预填)
  plainIntro: {
    analogy: '光芯片 = 数据中心里"GPU 之间对话用的麦克风和耳机"',
    paragraphs: [
      '光模块里那块头发丝粗细的小芯片,就是把电信号"翻译"成光信号(激光器)、以及"翻译"回电信号(探测器)的核心元器件。<strong>光模块的速率、距离、功耗,90% 由光芯片决定</strong>,但这块小东西全球能做的不到 10 家,中国大陆 100G 以上高速 EML 国产化率<10%。',
      '<strong>光芯片赛道在哪?</strong> 它是 optical(光模块整链)赛道最上游、最卡脖子的环节——光模块全球出货 60% 在中国做,但里头的高速光芯片高度依赖美日进口。本赛道的核心机会是"国产化率<20% 高速光芯片从 0 到 1 突破"。'
    ],
    flowSteps: ['InP/GaAs 衬底+外延材料','DFB/EML/CW 激光器芯片','PD/APD 探测器芯片','硅光 PIC 设计/代工','合/分波/调制器芯片','装入光模块(800G/1.6T/CPO/LPO)'],
    highlightBox: '<strong>💡 物理卡口 视角:光芯片是 optical 整链上游真正的"物理卡口"。</strong><br>① <strong>大功率 CW 激光器芯片</strong>:硅光/CPO 架构唯一外置"光源引擎",全球<5家能批量 100mW+ CW 芯片,长光华芯 70mW CWDM4 是国内从 0 到 1 突破<br>② <strong>100G/200G 高速 EML 芯片</strong>:1.6T 单波 200G PAM4 调制核心,海外寡头(Lumentum/Coherent/Broadcom)主导,源杰科技 100G EML 已小规模量产<br>③ <strong>硅光 PIC 设计</strong>:CMOS 工艺高密度集成,解决 1.6T 功耗/成本瓶颈,光库 TFLN/赛微 MEMS 代工/罗博特科(拟收购 ficonTEC)耦合设备构成国产化梯队<br><br><strong>【核查员警示】</strong><br>1. 严格区分"全球市占率"(中国模块大厂>60%)与"国产化率"(高阶光芯片自给率<20%)——本赛道大量混淆陷阱<br>2. InP/GaAs 衬底+外延工艺是上游上游,A 股无直接纯标的(云南锗业/有研新材等小份额)<br>3. 200G EML 全球仅 2-3 家有产能量产,工艺/产能数据务必 ≥2 源核实<br>(数据基准: 2026-06-16 骨架,全部硬数据待核)'
  },

  // ① 赛道概览(2026-06-16 联网核实后注入)
  //   ①命中 4 项 / ②单源降级 1 项 / ②待补 3 项(全留"待核")
  overview: [
    { label:'🌍 全球光芯片市场(2026E)', value:'待核', note:'<strong>⚠️ 概念偷换陷阱警示</strong>:新闻中"260 亿美元"特指下游 AI 光模块/收发器市场(TrendForce 2026E,+57.6%,①命中 media:新浪 2026-04-21 + 飞象网 2026-04),<strong>≠ 上游"光芯片"市场</strong>。光芯片市场规模无一手统计,需 ≥2 源(LC/Yole)核实', color:'var(--accent)', tier:'media', src:'新浪 2026-04-21 + 飞象网 2026-04(下游 260 亿 ≠ 上游光芯片)', asOf:'2026-04-21' },
    { label:'🇨🇳 中国大陆全球占比',     value:'待核', note:'⚠️ <strong>无源待补</strong>:光芯片全球出货份额 vs 中国市场自给率 双口径数据无一手统计(可参考 optical 赛道"中国大陆 60% 模块整链"),光芯片侧需 LC/Yole 核实', color:'var(--blue)',   tier:null, src:'无源(待补)', asOf:null },
    { label:'🤖 AI 算力核心驱动',         value:'🆪 1.6T 拉动 + 200G EML 缺口 25-30%', note:'🆪 1.6T 模块进入规模商用元年,200G EML 缺口 25-30%(G0-2 ②单源:国盛电子 2026-03-15),Lumentum InP 扩产 20% 仍难弥合,景气持续性高', color:'var(--green)',  tier:'media', src:'国盛电子 2026-03-15(单源存疑)', asOf:'2026-06-16' },
    { label:'🏭 产业阶段',                value:'1.6T 商用爆发初期 + 国产化率<10%', note:'🆪 下游 1.6T 商用爆发初期(TrendForce 2026E 260 亿/+57.6%),但上游 100G/200G EML 国产化率<10%(G0-1 海外寡头 95%+)', color:'var(--accent)', tier:'media', src:'TrendForce 2026Q1(下游)+ 新浪 2026-05(海外寡头)', asOf:'2026-04-21' },
    { label:'📐 1.6T EML/CW 需求(2026E)', value:'缺口 25-30%', note:'🆪 <strong>② 单源存疑</strong>:200G EML 全球缺口 25-30%(G0-2 国盛电子 2026-03-15 + 新浪 2026-05-25 同源)。1.6T 终端需求量 2000 万只(美银)vs 500 万只(Cignal AI)的两源差异待核', color:'var(--red)',    tier:'media', src:'国盛电子 2026-03-15 + 新浪 2026-05-25(同源) + 美银/Cignal AI 待核', asOf:'2026-03-15' },
    { label:'⚡ 下一代催化',              value:'3.2T 标准化 + CPO 商用 + ficonTEC 并表', note:'🆪 ① IEEE 802.3dj 3.2T 标准制定中 ② CPO 进入联合开发(罗博特科·ficonTEC 100% 控股 + 联合英伟达开发下一代 CPO,G0-5 ①命中 media:AASTOCKS 2026-06-16) ③ OFC 2026 新品。⚠️ ①+② 待核', color:null,           tier:'media', src:'AASTOCKS 2026-06-16(ficonTEC 100% 控股)+ IEEE 待核', asOf:'2026-06-16' },
    { label:'🔴 核心矛盾',                value:'海外寡头 95%+ vs 国产化率<10%', note:'🟢 <strong>① 命中(多源印证)</strong>:海外 100G/200G EML 寡头格局 — Lumentum 100G EML 全球市占≈70% + Coherent 200G EML 全球市占>40% + Broadcom≈20%(G0-1 新浪 2026-05-25 + 钛媒体 2026-06-11 双源印证方向性事实),InP 衬底住友 60% + AXT 35% 合计 95%(G1-2 腾讯 2026-01-23 + 机构历史研报)。国产化率<10% 卡脖子', color:'var(--red)',    tier:'media', src:'新浪 2026-05-25 + 钛媒体 2026-06-11(海外 EML)+ 腾讯 2026-01-23(InP 衬底)', asOf:'2026-06-11' },
    { label:'📋 高速光芯片国产化率(分型)', value:'<mark class="updated">EML <10% · CW 多家跑通 · InP 衬底 <5%</mark>', note:'🟢 <strong>① 命中(分型标注)</strong>:\n  - **100G/200G EML**: 国产化率<10%,海外寡头 95%+(G0-1 双源)\n  - **70mW CW 激光器**: 国内源杰/仕佳/索尔思等多家跑通(G0-3 ①命中 media:OFweek 2025-12-19 + 财富号 2026-04-12),但批量产能/客户认证无源\n  - **InP 衬底**: 国产化率<5%,住友 60% + AXT 35% 合计 95% 垄断(G1-2)\n  - **高速 APD 探测器**: 国产化率无源(Hamamatsu 等海外寡头,G1-3 全无源)\n  - **TFLN 调制器**: 光库科技为国产化领先厂商(全球市占无第三方口径,G0-6)', color:'var(--red)',   tier:'media', src:'新浪 2026-05-25 + 钛媒体 2026-06-11(EML)+ OFweek 2025-12-19 + 财富号 2026-04-12(CW)+ 腾讯 2026-01-23(InP 衬底)', asOf:'2026-06-12' }
  ],

  // ② 5 列树状图(列名与 PCB 完全一致)
  treeMap: {
    // ============ ① 下游 (光模块/光器件/通信设备) ============
    downstream: [
      { name:'光模块制造(800G/1.6T/CPO/LPO)', barrier:'mid', note:'光芯片的直接下游,买激光器/探测器芯片回去贴装', companies: [
        { name:'中际旭创', code:'300308', position:'全球光模块龙头(800G/1.6T 主力,深度绑定英伟达)', barrier:'极高' },
        { name:'新易盛',   code:'300502', position:'800G/1.6T/LPO 核心供应商',                          barrier:'高' },
        { name:'光迅科技', code:'002281', position:'硅光+模块+芯片一体化',                              barrier:'高' },
        { name:'华工科技', code:'000988', position:'激光+光模块+传感器',                                  barrier:'中' }
      ]},
      { name:'光器件/光无源(FAU/MPO/AWG/隔离器)', barrier:'mid', note:'光芯片的次级下游,做分波/合波/隔离', companies: [
        { name:'天孚通信', code:'300394', position:'全球光器件龙头,深度绑定英伟达', barrier:'高' },
        { name:'太辰光',   code:'300570', position:'无源光器件(分路器/连接器)细分', barrier:'中' }
      ]},
      { name:'电信设备(5G/骨干网/光网络)', barrier:'low', note:'—', companies: [
        { name:'中兴通讯', code:'000063', position:'5G 基站+光通信设备', barrier:'高' },
        { name:'烽火通信', code:'600498', position:'光通信传输设备',   barrier:'中' }
      ]}
    ],
    // ============ ② 中游(光芯片本身,核心 6 环节) ============
    midstream: [
      { name:'光芯片设计/制造(本赛道核心)', barrier:'extreme', choke:true, note:'🆪 本赛道的"制造端",即 segments[0-5] 的全部公司', companies:[
        { name:'源杰科技',  code:'688498', position:'国内 100G/200G EML IDM 平台,1.6T 卡口候选',   barrier:'极高' },
        { name:'长光华芯',  code:'688048', position:'大功率 CW 激光器(70mW CWDM4)国产化领先厂商之一(非唯一,源杰/仕佳/索尔思亦已实现)', barrier:'极高' },
        { name:'光库科技',  code:'300620', position:'TFLN 调制器国产化领先厂商(全球市占无第三方口径)', barrier:'极高' },
        { name:'罗博特科',  code:'300757', position:'拟收购 ficonTEC(100% 控股),硅光/CPO 耦合设备关键', barrier:'极高' },
        { name:'赛微电子',  code:'300456', position:'全球 MEMS 代工龙头,硅光 PIC 代工能力',         barrier:'极高' },
        { name:'仕佳光子',  code:'688313', position:'AWG/DFB 芯片细分龙头,无源+有源双轮',            barrier:'高'   },
        { name:'中际旭创',  code:'300308', position:'光模块龙头(自研硅光 PIC,装入自家模块)',         barrier:'高'   },
        { name:'光迅科技',  code:'002281', position:'硅光+模块+芯片一体化',                          barrier:'高'   }
      ]}
    ],
    // ============ ③ 上游材料(InP/GaAs 衬底+外延工艺) ============
    materials: [
      { name:'III-V 族衬底(InP/GaAs)+外延片', barrier:'extreme', choke:false, note:'🟢 <strong>① 命中(双源)</strong>:海外住友≈60% + AXT(北京通美)≈35% 合计 95%+ 垄断(G1-2 腾讯 2026-01-23 + 机构历史研报),光芯片最上游最卡脖子环节。A 股云南锗业/有研新材小份额,云南锗业+天通股份 GaAs/InP 衬底有研发布局', companies: [
        { name:'云南锗业', code:'002428', position:'锗衬底+光纤掺杂+磷化铟(参股),A 股稀缺的 III-V 族材料标的', barrier:'高' },
        { name:'有研新材', code:'600206', position:'化合物半导体材料(参股),覆盖 GaAs/InP 部分', barrier:'中' },
        { name:'天通股份', code:'600330', position:'压电晶体+LED 蓝宝石衬底(参股布局 InP/GaAs)', barrier:'中' },
        { name:'三安光电', code:'600703', position:'LED+化合物半导体(湖南三安),InP/GaAs 外延有布局', barrier:'中' }
      ]},
      { name:'光学石英/光学薄膜(隔离器/透镜/滤光片基础材料)', barrier:'high', choke:false, note:'光芯片封装的辅助材料,菲利华/欧晶科技等', companies: [
        { name:'菲利华',   code:'300395', position:'Q 布龙头+光学石英材料,本赛道辅助材料侧', barrier:'高' },
        { name:'欧晶科技', code:'001269', position:'光伏+半导体石英坩埚(光芯片间接)', barrier:'中' }
      ]}
    ],
    // ============ ④ 上游设备(外延 MOCVD/光刻/刻蚀/测试) ============
    equipment: [
      { name:'外延/光刻/刻蚀设备(MOCVD/EBeam)', barrier:'extreme', choke:false, note:'🆪 光芯片代工的核心设备,Aixtron/VEECO 等海外绝对主导(70%+),国内中微/北方华创有部分突破;⚠️ <strong>跨赛道映射陷阱</strong>:华峰/长川/精测是"传统半导体测试设备",不能映射到"光通信测试"', companies: [
        { name:'中微公司',   code:'688012', position:'刻蚀+MOCVD 设备,化合物半导体(LED/InP)外延设备', barrier:'高' },
        { name:'北方华创',   code:'002371', position:'刻蚀/PVD/CVD/外延,化合物半导体设备部分',         barrier:'高' },
        { name:'拓荆科技',   code:'688072', position:'薄膜沉积(PECVD),III-V 族外延有相关产品',         barrier:'中' }
      ]},
      { name:'光芯片测试/封装设备', barrier:'high', choke:false, note:'⚪ <strong>② 单源存疑</strong>:海外 Keysight + Anritsu 合计 84% 光通信测试份额(G0-7 财富号 2025-09-09 单源,⚠️ 跨赛道陷阱:本土约 16% 中联讯仪器占 9.9%,不可将华峰/长川/精测市场份额生搬硬套至"光通信测试");EXFO + 罗博特科·ficonTEC 耦合设备 100% 控股(G0-5)', companies: [
        { name:'罗博特科',   code:'300757', position:'拟收购 ficonTEC(100% 控股,联合英伟达开发 CPO),光芯片耦合/测试设备关键', barrier:'极高' },
        { name:'华峰测控',   code:'688200', position:'模拟/混合信号 IC 测试机(光芯片驱动 IC 测试侧,⚠️ 跨赛道映射陷阱)', barrier:'中' },
        { name:'长川科技',   code:'300604', position:'IC 测试机+分选机(光芯片 CP/FT,⚠️ 跨赛道映射陷阱)',           barrier:'中' },
        { name:'精测电子',   code:'300567', position:'显示/半导体测试设备(光芯片晶圆测试侧,⚠️ 跨赛道映射陷阱)',           barrier:'中' }
      ]}
    ],
    // ============ ⑤ 侧枝(光芯片相关的卡脖子交叉环节) ============
    sideBranches: [
      { name:'硅光/CPO 耦合与测试设备(光芯片封装关键)', barrier:'extreme', note:'光芯片装入硅光模块/CPO 的关键耦合设备,ficonTEC(罗博特科拟收购)全球垄断', sourceSegment:'segments[2]硅光 PIC' },
      { name:'薄膜铌酸锂(TFLN)调制器(光芯片侧枝)', barrier:'extreme', note:'TFLN 是 1.6T/3.2T 相干模块核心,光库科技全球龙头', sourceSegment:'segments[2]硅光 PIC' },
      { name:'AI 服务器 PCB + 覆铜板(光芯片间接配套)', barrier:'extreme', note:'光模块装入 AI 服务器 → PCB/CCL 是间接上游,详见 pcb 赛道', sourceSegment:'pcb-segments' }
    ]
  },

  // 6 环节 segments(光子学价值链)—— 与 treeMap 中游 sub-card 1:1 对应
  segments: [
    // === segments[0] 激光器芯片(DFB/EML/CW/可调)—— 卡口候选 ① ===
    {
      name:'激光器芯片(DFB/EML/CW/可调)',
      costRatio:'光模块 BOM ~15-20%',
      barrier:'extreme', choke:true, border:true,
      intro:'激光器芯片是光模块的"光源",决定发射距离/速率/功耗。<strong>卡口候选 ①</strong>:<strong>🟢 ① 命中(双源)</strong>:Lumentum 100G EML 全球市占≈70% / Coherent 200G EML 全球市占>40% / Broadcom≈20%(G0-1 新浪 2026-05-25 + 钛媒体 2026-06-11)。100G/200G EML 国产化率<10%,A 股源杰 100G EML 已批量出货进 800G 供应链(G0-4 ①命中 media:OFweek 2025-12 + 新浪 2026-05),70mW CW 国内源杰/仕佳/索尔思等多家跑通(G0-3)。',
      globalLandscape: [
        { lbl:'🥇 Lumentum(美)',  val:'100G EML 全球市占≈70%',  note:'①命中:新浪 2026-05-25 + 钛媒体 2026-06-11' },
        { lbl:'🥈 Coherent(美)',  val:'200G EML 全球市占>40%',  note:'①命中:同上' },
        { lbl:'🥉 Broadcom(美)',  val:'全球市占≈20%',             note:'①命中:同上' },
        { lbl:'国内突破',          val:'源杰 100G EML 批量出货 / 长华/仕佳/索尔思 70mW CW', note:'①命中 G0-3+ G0-4(多家跑通,非唯一)' }
      ],
      stocks: [
        { rank:1, name:'源杰科技',  code:'688498', position:'国内 100G/200G EML IDM 平台,1.6T 卡口候选',     barrier:'极高', trend:'up', trendNote:'100G EML 批量出货 + 进 800G 供应链,1.6T 200G 待发', logic:'<strong>① 命中(G0-4)</strong>:100G EML 已批量出货 + 进入 800G 光模块供应链(OFweek 2025-12-19 + 新浪 2026-05-25)。⚠️ <strong>放量陷阱</strong>:"进入 800G 供应链"≠ "核心主供",需警惕小批量送样 vs 规模量产差异;200G EML 2026 量产进度无源,待补', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}], dims6Note:'🟢 100G EML 批量出货 + 200G EML 待发 + 卡口国产化龙头', valAsOf:'2026-05-25', tier:'media', src:'OFweek 2025-12-19 + 新浪 2026-05-25' },
        { rank:2, name:'长光华芯',  code:'688048', position:'大功率 CW 激光器芯片(70mW CWDM4)国产化领先厂商之一', barrier:'极高', trend:'up', trendNote:'26Q1 表观扭亏但扣非仍亏,光通信 2025 毛利仅 12.81%', logic:'<strong>① 命中(G0-3 + G1-11)</strong>:70mW CW 国内多家跑通之一(非唯一,源杰/仕佳/索尔思亦已实现);⚠️ <strong>G3 反向陷阱</strong>:26Q1 表观扭亏(归母净利+445%环比)但<strong>扣非净利润仍为负</strong>(东方财富研报 + 新浪财经《盈利"掺水"》2026-06-11),<strong>不可挂钩"光芯片业务回暖"</strong>;2025 光通信业务营收 4119.38 万,毛利率骤降至 12.81%(同比下降明显)', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 26Q1 表观扭亏但扣非仍亏,光通信 2025 毛利仅 12.81%', valAsOf:'2026-06-11', tier:'broker', src:'东方财富 2026 + 新浪财经 2026-06-11' },
        { rank:3, name:'仕佳光子',  code:'688313', position:'AWG/DFB 芯片细分龙头,无源+有源双轮',            barrier:'高',   trend:'up', trendNote:'26Q1 营收+32.18%/净利+24.66%,AWG+DFB 双驱', logic:'<strong>① 命中(G1-10 双源)</strong>:26Q1 营收 5.77 亿(同比+32.18% 核实)/归母净利 1.16 亿(+24.66% 核实)(中原通信 2026-05-08 + 银河通信 2026-04-21 双源交叉);AWG+DFB 双业务驱动;⚠️ AWG/DFB/EML 细分占比无源,扣非 1.07 亿/+16.31% 待补', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 营收+32.18%/净利+24.66% 双源', valAsOf:'2026-05-08', tier:'broker', src:'中原通信 2026-05-08 + 银河通信 2026-04-21' },
        { rank:4, name:'永鼎股份',  code:'600105', position:'子公司鼎芯光电布局 EML/CW 光芯片', barrier:'中',   trend:'flat', trendNote:'26Q1 净利-45.19%(去年同期 2.92 亿投资收益高基数),剔除后经营性利润大增', logic:'<strong>② 待补(G1-12)</strong>:子公司鼎芯光电布局 EML/CW,已签"保供"协议,但<strong>具体客户/出货量/26Q1 财务数据</strong>无源(待核);26Q1 净利 1.59 亿/-45.19% 来自去年同期 2.92 亿投资收益高基数,非经营性下滑。⚠️ G3 反向陷阱:不能将"整体经营"映射到光芯片子板块', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 26Q1 净利-45.19%(高基数);鼎芯光电 EML/CW 待核', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'三安光电',  code:'600703', position:'化合物半导体(湖南三安)InP/GaAs 外延+激光器',     barrier:'中',   trend:null, trendNote:'EML/CW 进展待核', logic:'<strong>待核</strong>:湖南三安 InP/GaAs 外延有布局,激光器业务体量/客户无源', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(湖南三安 InP/GaAs)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'华工科技',  code:'000988', position:'激光+光模块+传感器,激光器芯片子业务',            barrier:'中',   trend:null, trendNote:'EML/CW 进展待核', logic:'<strong>待核</strong>:激光器芯片子业务,具体 EML/CW 业务体量无源', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(激光器子业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[1] 探测器芯片(PD/APD)—— 卡口候选 ② ===
    {
      name:'探测器芯片(PD/APD/SPAD)',
      costRatio:'光模块 BOM ~5-8%',
      barrier:'high', choke:true, border:false,
      intro:'探测器芯片是光模块的"耳朵",把光信号"翻译"回电信号。<strong>卡口候选 ②</strong>:<strong>② 待补(G1-3 全无源)</strong>:Hamamatsu(日)/First Sensor(已被 TE 收购)/Excelitas(美)三家寡头格局清晰,但<strong>精确全球市占无第三方一手数据</strong>。A 股纯 APD/SPAD 标的稀缺,核心标的多与激光器集成或与光学集成。',
      globalLandscape: [
        { lbl:'🥇 Hamamatsu(日)', val:'APD/SPAD 全球龙头',  note:'②待补(精确%无源)' },
        { lbl:'🥈 First Sensor(德)', val:'高速 APD 主力',     note:'已被 TE Connectivity 收购' },
        { lbl:'🥉 Excelitas(美)', val:'红外探测器',            note:'—' }
      ],
      stocks: [
        { rank:1, name:'源杰科技',  code:'688498', position:'PD 探测器芯片(与 EML 同平台)同步布局',          barrier:'高',   trend:null, trendNote:'PD 业务体量待核', logic:'<strong>待核</strong>:PD 探测器芯片与 EML 同平台,具体业务体量/客户/良率无源(待补)', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'待核(PD 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:2, name:'长光华芯',  code:'688048', position:'VCSEL 探测器+激光雷达 PD 业务',                  barrier:'高',   trend:null, trendNote:'PD 业务体量待核', logic:'<strong>待核</strong>:VCSEL 探测器+激光雷达 PD 业务,具体体量/客户无源(待补);⚠️ G3 反向陷阱:不可将 26Q1 表观扭亏挂钩到 PD 业务回暖(同 segments[0])', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(PD 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:3, name:'炬光科技',  code:'688167', position:'激光雷达 VCSEL+PD 阵列,激光器/探测器一体',         barrier:'中',   trend:null, trendNote:'PD 业务体量待核', logic:'<strong>待核</strong>:激光雷达 VCSEL+PD 阵列,具体 PD 业务体量无源(待补);⚠️ 26Q1 归母净利-1320 万(同比减亏 59% 仍亏),不能将"减亏"映射到 PD 业务回暖', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(PD 阵列业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'水晶光电',  code:'002273', position:'光学薄膜+红外截止滤光片+激光雷达罩(探测器侧)',     barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光学薄膜+红外滤光片+激光雷达罩,非纯探测器芯片厂商,业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(光学薄膜侧)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'奥比中光',  code:'688322', position:'3D 视觉感知芯片+SPAD 单光子探测器',                barrier:'中',   trend:null, trendNote:'SPAD 业务体量待核', logic:'<strong>待核</strong>:3D 视觉感知芯片+SPAD 单光子探测器,SPAD 业务体量/客户无源(待补);A 股纯 SPAD 标的稀缺', dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(SPAD 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[2] 硅光 PIC(设计+代工/材料)—— 卡口候选 ③ ===
    {
      name:'硅光 PIC(设计+代工/材料)',
      costRatio:'光模块/光引擎 ~30-40%',
      barrier:'extreme', choke:true, border:true,
      intro:'硅光 PIC 是 1.6T 时代"光电共封装"的核心载体。<strong>卡口候选 ③</strong>:<strong>① 命中(G0-5 双源)</strong>:罗博特科·ficonTEC 100% 控股已确认,正与英伟达联合开发下一代 CPO(AASTOCKS 2026-06-16 官方公告双渠道源);⚠️ ficonTEC 2025 全年营收/净利/设备市占/客户结构<strong>无源(待补)</strong>;光库 TFLN 调制器 26Q1 净利预告 4370-4587 万(+303-323%)兑现(G0-6 ①命中 broker:财联社 2026-04-13 + 新浪财经 2026-04-13),<strong>全球市占无第三方口径</strong>,应称"TFLN 调制器国产化领先厂商"。',
      globalLandscape: [
        { lbl:'🥇 TSMC COUPE 平台', val:'硅光代工全球主导',  note:'3nm/5nm CMOS 工艺' },
        { lbl:'🥈 Intel Silicon Photonics', val:'硅光集成老牌',  note:'可插拔模块主力' },
        { lbl:'🥉 Cisco Acacia', val:'相干硅光',               note:'长距传输方案' }
      ],
      stocks: [
        { rank:1, name:'罗博特科',  code:'300757', position:'拟收购 ficonTEC(100% 控股,联合英伟达开发 CPO)', barrier:'极高', trend:'up', trendNote:'ficonTEC 100% 控股+联合英伟达 CPO,但 26Q1 整体仍亏', logic:'<strong>① 命中(G0-5 双源)</strong>:截至 2026-06-16,ficonTEC 已确认为"全资子公司(集团持股 100%)",正与英伟达联合开发下一代 CPO(AASTOCKS 2026-06-16 官方公告双渠道源);⚠️ <strong>G3 反向陷阱</strong>:26Q1 营收 1.64 亿/+69.33% / 归母净利-3882 万(亏损扩大),不能将"整体亏损"映射到 ficonTEC 光通信业务下行(光伏设备承压),<strong>26Q1 ficonTEC 单独营收/净利无源</strong>,业务板块拆分待补', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 ficonTEC 100% 控股+联合英伟达 CPO;⚠️ G3 反向陷阱:整体亏损不能映射 ficonTEC', valAsOf:'2026-06-16', tier:'media', src:'AASTOCKS 2026-06-16(双源)' },
        { rank:2, name:'光库科技',  code:'300620', position:'TFLN 调制器国产化领先厂商(全球市占无第三方口径)', barrier:'极高', trend:'up', trendNote:'26Q1 净利预告 4370-4587 万/+303-323% 兑现', logic:'<strong>① 命中(G0-6 双源)</strong>:26Q1 净利预告 4370-4587 万元,同比+303-323%(财联社 2026-04-13 + 新浪财经 2026-04-13);⚠️ <strong>绝对化陷阱</strong>:缺乏第三方权威口径确认其全球市占率,应降级表述为"TFLN 调制器国产化领先厂商"而非"全球龙头";⚠️ 1.6T 相干 TFLN 渗透率无源(待补)', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 净利预告+303-323% 双源;⚠️ 全球市占无第三方口径', valAsOf:'2026-04-13', tier:'broker', src:'财联社 2026-04-13 + 新浪财经 2026-04-13' },
        { rank:3, name:'赛微电子',  code:'300456', position:'全球 MEMS 代工龙头,硅光 PIC 代工能力与产能',      barrier:'极高', trend:null, trendNote:'26Q1 由盈转亏(瑞典 Silex 不再并表)', logic:'<strong>待核</strong>:MEMS 代工龙头,硅光 PIC 代工能力有布局,但<strong>硅光代工业务体量/客户无源</strong>(待补);26Q1 营收 9854 万/-62.68%(瑞典 Silex 不再并表致口径腰斩)/归母净利-4910 万(由盈转亏),与硅光代工无关', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'待核(硅光 PIC 代工业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'中际旭创',  code:'300308', position:'硅光模块龙头(自研硅光 PIC,装入自家模块)',        barrier:'高',   trend:'up', trendNote:'26Q1 营收+192.1%/净利+262.3%,1.6T 占比攀升', logic:'<strong>② 单源(G1-9)</strong>:26Q1 营收 195.0 亿(同/环比+192.1%/+47.3%)/归母净利 57.3 亿(+262.3%/+56.5%)(山证通信 2026-05-28,单源);1.6T 高端产品比重攀升驱动业绩;⚠️ 26Q1 预付款精确值+锁产能光芯片厂商穿透名单<strong>无源(待补)</strong>;自研硅光 PIC 装入自家模块', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚪ 26Q1 营收+192.1%/净利+262.3%(单源)', valAsOf:'2026-05-28', tier:'broker', src:'山证通信 2026-05-28(单源存疑)' },
        { rank:5, name:'光迅科技',  code:'002281', position:'硅光 PIC 设计+模块一体化',                       barrier:'高',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:硅光 PIC 设计+模块一体化,具体硅光 PIC 业务体量/客户无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(PIC 业务体量)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'新易盛',    code:'300502', position:'硅光模块+激光器混合集成,1.6T 主力供应商',         barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:硅光模块+激光器混合集成,1.6T 主力供应商,具体硅光 PIC 业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(硅光模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:7, name:'华工科技',  code:'000988', position:'硅光传感器+激光雷达',                             barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:硅光传感器+激光雷达,具体硅光业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(硅光传感器业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:8, name:'腾景科技',  code:'688195', position:'光学元件(分路器/波分复用器),硅光模块辅助',         barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光学元件(分路器/波分复用器),硅光模块辅助,业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(光学元件业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[3] 调制/合分波芯片(MZM/AWG/VOA) ===
    {
      name:'调制/合分波芯片(MZM/AWG/VOA)',
      costRatio:'光模块 BOM ~10-15%',
      barrier:'high', choke:false, border:false,
      intro:'调制器(MZM/IQ 调制器)、合分波器(AWG/WDM)、可变光衰减器(VOA)是光模块的"信号处理核心"。LiNbO3 调制器传统主导(Lumentum),TFLN(薄膜铌酸锂)是下一代 1.6T/3.2T 相干通信的关键(光库科技国产化领先厂商)。',
      globalLandscape: [
        { lbl:'🥇 Lumentum(美)', val:'LiNbO3 调制器全球龙头',  note:'—' },
        { lbl:'🥈 光库科技(中)', val:'TFLN 调制器国产化领先厂商', note:'26Q1 净利预告+303-323%' }
      ],
      stocks: [
        { rank:1, name:'光库科技',  code:'300620', position:'TFLN 调制器国产化领先厂商(本环节第一)', barrier:'极高', trend:'up', trendNote:'26Q1 净利预告+303-323%,TFLN 量产兑现', logic:'<strong>① 命中(复用 G0-6)</strong>:TFLN 调制器国产化领先厂商,26Q1 净利预告 4370-4587 万/+303-323%(财联社+新浪财);⚠️ <strong>绝对化陷阱</strong>:全球市占无第三方口径,应称"国产化领先"而非"全球龙头"', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 净利+303-323% 双源', valAsOf:'2026-04-13', tier:'broker', src:'财联社 2026-04-13 + 新浪财经 2026-04-13' },
        { rank:2, name:'仕佳光子',  code:'688313', position:'AWG 阵列波导光栅(合分波)国产化龙头',                barrier:'高',   trend:'up', trendNote:'26Q1 营收+32.18%/净利+24.66%(复用 segments[0])', logic:'<strong>① 命中(复用 G1-10)</strong>:AWG 阵列波导光栅(合分波)国产化龙头,26Q1 营收 5.77 亿/+32.18%/净利 1.16 亿/+24.66%(中原+银河双源);AWG/DFB/EML 细分占比无源', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'🟢 26Q1 营收+32.18%/净利+24.66% 双源', valAsOf:'2026-05-08', tier:'broker', src:'中原通信 2026-05-08 + 银河通信 2026-04-21' },
        { rank:3, name:'中兴通讯',  code:'000063', position:'光通信设备整机(含自研调制器)',                   barrier:'高',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光通信设备整机(含自研调制器),具体调制器业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(调制器子业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'天孚通信',  code:'300394', position:'光器件平台,含 AWG 辅助',                          barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光器件平台,具体 AWG 业务体量无源(待补);详见 optical 赛道已注入数据', dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'待核(AWG 业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'太辰光',    code:'300570', position:'无源光器件(AWG/分路器/连接器)',                    barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:无源光器件(AWG/分路器/连接器),具体业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(无源光器件业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[4] 光芯片测试与封装设备 ===
    {
      name:'光芯片测试与封装设备',
      costRatio:'占光芯片厂商 CapEx ~15-20%',
      barrier:'extreme', choke:false, border:false,
      intro:'光芯片晶圆测试(CP)、成品测试(FT)、封装(共晶焊/FlipChip/光学耦合)需要专门的设备。Keysight/EXFO 海外主导(Keysight+Anritsu 合计 84% 光通信测试份额,②单源存疑),国内华峰测控/长川科技/精测电子在 IC 测试侧有突破,⚠️ <strong>跨赛道映射陷阱</strong>:华峰/长川/精测是"传统半导体测试设备",<strong>不能映射到"光通信测试"</strong>子板块;光芯片专用测试设备(误码仪/光功率计)国产替代初期。',
      globalLandscape: [
        { lbl:'🥇 Keysight(美)', val:'光通信测试全球龙头',  note:'②单源存疑:Keysight+Anritsu 合计 84%' },
        { lbl:'🥈 EXFO(加)',    val:'光通信测试设备',         note:'营收拆分无源' }
      ],
      stocks: [
        { rank:1, name:'罗博特科',  code:'300757', position:'拟收购 ficonTEC(100% 控股),光芯片耦合/测试设备关键', barrier:'极高', trend:'up', trendNote:'复用 segments[2] (G0-5 双源)', logic:'<strong>① 命中(复用 G0-5)</strong>:ficonTEC 100% 控股,联合英伟达开发 CPO,光芯片耦合/测试设备关键;⚠️ ficonTEC 2025 营收/净利/全球市占/客户结构<strong>无源</strong>;26Q1 整体仍亏(G3 反向陷阱)', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}], dims6Note:'🟢 ficonTEC 100% 控股(复用)', valAsOf:'2026-06-16', tier:'media', src:'AASTOCKS 2026-06-16(双源)' },
        { rank:2, name:'华峰测控',  code:'688200', position:'模拟/混合信号 IC 测试机(光芯片驱动 IC,⚠️ 跨赛道映射陷阱)', barrier:'高',   trend:null, trendNote:'光通信占比待核', logic:'<strong>待核</strong>:模拟/混合信号 IC 测试机,⚠️ <strong>跨赛道映射陷阱</strong>:华峰是"传统半导体测试设备"厂商,<strong>不能将其市场份额生搬硬套至"光通信测试"</strong>子板块,光通信测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 跨赛道映射陷阱', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:3, name:'长川科技',  code:'300604', position:'IC 测试机+分选机(光芯片 CP/FT,⚠️ 跨赛道映射陷阱)', barrier:'高',   trend:null, trendNote:'光通信占比待核', logic:'<strong>待核</strong>:IC 测试机+分选机,⚠️ <strong>跨赛道映射陷阱</strong>:长川是"传统半导体测试设备"厂商,光通信测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 跨赛道映射陷阱', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:4, name:'精测电子',  code:'300567', position:'显示/半导体测试设备(光芯片晶圆测试侧,⚠️ 跨赛道映射陷阱)', barrier:'中',   trend:null, trendNote:'光通信占比待核', logic:'<strong>待核</strong>:显示/半导体测试设备,⚠️ <strong>跨赛道映射陷阱</strong>:光通信测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'⚠️ 跨赛道映射陷阱', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'普源精电',  code:'688337', position:'示波器/波形发生器(光芯片研发测试)',                barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:示波器/波形发生器,光芯片研发测试业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(研发测试业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'鼎阳科技',  code:'688112', position:'数字示波器+信号发生器(光芯片研发侧)',              barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:数字示波器+信号发生器,光芯片研发侧业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(研发测试业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    },
    // === segments[5] 模块应用与下游集成(光模块/光器件集成) ===
    {
      name:'模块应用与下游集成(光模块整链)',
      costRatio:'光芯片下游 100%',
      barrier:'mid', choke:false, border:false,
      intro:'本环节是光芯片的下游,光模块厂商把激光器/探测器/调制器芯片集成成 800G/1.6T 模块。本环节不是物理卡口(≥10 家可切换),但订单兑现度直接决定光芯片厂商的业绩弹性。详见 optical(光模块整链)赛道。',
      globalLandscape: [
        { lbl:'🥇 中际旭创',  val:'全球光模块龙头(英伟达链)', note:'—' },
        { lbl:'🥈 Coherent', val:'美国光模块大厂',               note:'原 II-VI + Finisar' }
      ],
      stocks: [
        { rank:1, name:'中际旭创',  code:'300308', position:'全球光模块龙头(800G/1.6T 主力,深度绑定英伟达)',   barrier:'极高', trend:'up', trendNote:'26Q1 营收+192.1%/净利+262.3%(复用 segments[2])', logic:'<strong>② 单源(复用 G1-9)</strong>:26Q1 营收 195.0 亿(+192.1%/+47.3%)/归母净利 57.3 亿(+262.3%/+56.5%)(山证通信 2026-05-28,单源);1.6T 高端占比攀升;⚠️ 26Q1 预付款+锁产能名单<strong>无源</strong>', dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'⚪ 26Q1 营收+192.1%/净利+262.3%(单源)', valAsOf:'2026-05-28', tier:'broker', src:'山证通信 2026-05-28(单源存疑)' },
        { rank:2, name:'新易盛',    code:'300502', position:'800G/1.6T/LPO 核心供应商',                            barrier:'高',   trend:null, trendNote:'详见 optical 赛道', logic:'<strong>待核</strong>:800G/1.6T/LPO 核心供应商,具体业务体量/客户无源(详见 optical 赛道已注入)', dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'详见 optical 赛道', valAsOf:null, tier:null, src:'无源(详见 optical)' },
        { rank:3, name:'光迅科技',  code:'002281', position:'硅光+模块+芯片一体化',                                 barrier:'高',   trend:null, trendNote:'详见 optical 赛道', logic:'<strong>待核</strong>:硅光+模块+芯片一体化,具体业务体量无源(详见 optical 赛道已注入)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'详见 optical 赛道', valAsOf:null, tier:null, src:'无源(详见 optical)' },
        { rank:4, name:'华工科技',  code:'000988', position:'激光+光模块+传感器',                                     barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:激光+光模块+传感器,具体模块业务体量无源(待补)', dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:5, name:'剑桥科技',  code:'603083', position:'光模块+无线小基站',                                       barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:光模块+无线小基站,具体模块业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:6, name:'天孚通信',  code:'300394', position:'光器件平台龙头(深度配套光模块厂商)',                       barrier:'中',   trend:null, trendNote:'详见 optical 赛道', logic:'<strong>待核</strong>:光器件平台龙头,具体业务体量无源(详见 optical 赛道已注入)', dims6:[{key:'durability',score:4,trend:'flat',tier:'estimate'},{key:'visibility',score:4,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}], dims6Note:'详见 optical 赛道', valAsOf:null, tier:null, src:'无源(详见 optical)' },
        { rank:7, name:'联特科技',  code:'301205', position:'1.6T 光模块新晋(马来工厂规避关税)',                       barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:1.6T 光模块新晋,马来工厂规避关税,业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(模块业务)', valAsOf:null, tier:null, src:'无源(待补)' },
        { rank:8, name:'博创科技', code:'300548', position:'PLC 光分路器+AWG 国产化',                                                          barrier:'中',   trend:null, trendNote:'业务侧待核', logic:'<strong>待核</strong>:PLC 光分路器+AWG 国产化,具体模块业务体量无源(待补)', dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}], dims6Note:'待核(光分路器/AWG 业务)', valAsOf:null, tier:null, src:'无源(待补)' }
      ]
    }
  ],

  // 四大物理追问(注入 2026-06-16 · seg[0]激光器 / seg[2]硅光 PIC / seg[3]调制/合分波)
  // ★ schema 修复:必须用 'segments'(PCB 同款),不是 'segs'
  // ★ 用段级 schema(每段一行 4 问),因为个股 4 问数据无源
  fourQuestions: {
    segments: [
      { name:'激光器芯片(DFB/EML/CW/可调)', segName:'激光器芯片',
        q1:'供给寡头格局是否成立? ①命中(G0-1 双源):Lumentum 100G EML ≈70% / Coherent 200G EML >40% / Broadcom ≈20%(海外 95%+)',
        q2:'产能周期与扩产节奏? ①命中(G0-2 ②单源):Lumentum InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%',
        q3:'替代缺位? ①命中(G0-3 双源):国内 70mW CW 多家跑通(源杰/仕佳/索尔思),但 100G/200G EML 国产化率<10%',
        q4:'下游刚需? ①命中(G0-1):1.6T 拉动 + 200G EML 全球缺口 25-30% + 中际旭创 26Q1 营收+192.1%',
        hits:4, strength:'★★★' },
      { name:'硅光 PIC(设计+代工/材料)', segName:'硅光 PIC',
        q1:'供给寡头格局? ①命中:TSMC COUPE 硅光代工全球主导,罗博特科·ficonTEC 100% 控股已确认(联合英伟达开发 CPO)',
        q2:'产能周期? ①命中:1.6T 硅光模块销售额预计首超整体光模块市场 50%(LC 数据,精确值无源)',
        q3:'替代缺位? ①命中(G0-6 + G0-5 双源):TFLN 光库国产化领先厂商 + ficonTEC 100% 控股(全球市占/客户结构无源)',
        q4:'下游刚需? ①命中:1.6T + CPO 商用爆发 + 中际旭创 26Q1 营收+192.1% 印证 1.6T 占比攀升',
        hits:4, strength:'★★★' },
      { name:'调制/合分波芯片(MZM/AWG/VOA)', segName:'调制/合分波芯片',
        q1:'供给寡头格局? ①命中(G0-6):Lumentum LiNbO3 主导,光库 TFLN 国产化破冰(全球市占无第三方口径)',
        q2:'产能周期? ⚠️ 待核:TFLN 1.6T 渗透率无第三方一手数据',
        q3:'替代缺位? ①命中(G0-6 + G1-10 双源):光库 26Q1 净利预告+303-323% + 仕佳 AWG 国产化龙头 26Q1 营收+32.18%',
        q4:'下游刚需? ⚠️ 待核:1.6T 相干模块需求口径无源,需 LC/Yole 核实',
        hits:3, strength:'★★☆' }
    ]
  },

  // ③ 卡口候选 3 个(★★★/★★☆/★★★)—— 至少 1 个 ★★★(实际 2 个)
  // 评级:segments[0]激光器(★★★) / segments[1]探测器(★★☆) / segments[2]硅光 PIC(★★★)
  chokePoints: [
    {
      name:'大功率 CW/EML 激光器芯片', barrier:'extreme', tier:'★★★',
      target:'100G/200G 高速 EML + 大功率 CW 激光器国产化',
      companies:[
        { name:'源杰科技',  code:'688498', reason:'① 命中(G0-4):100G EML 已批量出货 + 进入 800G 供应链(OFweek 2025-12-19 + 新浪 2026-05-25 双源)' },
        { name:'长光华芯',  code:'688048', reason:'① 命中(G0-3 + G1-11):70mW CW 国内多家跑通之一(非唯一)+ 26Q1 表观扭亏但扣非仍亏' }
      ],
      hits:4, strength:'★★★', tags:['卡脖子','国产化','AI 算力','1.6T 200G EML 缺口 25-30%'],
      valuation: { pePercentile:null, marketCap:null, targetPrice:null, src:null, asOf:null, tier:null, note:'⚠️ G1-6 PE 分位无源,TTM 失真风险高(early-stage),估值维门控触发留空' },
      verification: { items:[
        { type:'产能',  claim:'Lumentum InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%', howToCheck:'Lumentum/Coherent 季报 + 国盛电子《AI 引爆供需缺口》2026-03-15', falsifySignal:'Lumentum 200G EML 季度出货量超 50% 增长 + 第二家中国厂商 200G EML 量产', status:'pending' },
        { type:'市占',  claim:'Lumentum 100G EML 全球市占≈70% / Coherent 200G EML >40% / Broadcom≈20%(海外 95%+)', howToCheck:'LightCounting 季度报告 + Yole 年度报告', falsifySignal:'第三家中国厂商 100G EML 月产能超 50 万只', status:'pending' },
        { type:'客户',  claim:'源杰 100G EML 进入 800G 供应链(具体客户名单无源)', howToCheck:'源杰 2026 中报 + 招商证券深度研报 + 中际旭创供应链披露', falsifySignal:'中际旭创/英伟达明确表示源杰/长华非核心主供', status:'pending' },
        { type:'技术',  claim:'国内 70mW CW 已有源杰/仕佳/索尔思等多家跑通(非唯一)', howToCheck:'OFweek 2025-12-19 + 财富号 2026-04-12 双源', falsifySignal:'第二家中国厂商 200G EML 流片成功 + 良率超 30%', status:'pending' }
      ]}
    },
    {
      name:'高速探测器芯片(PD/APD)', barrier:'high', tier:'★★☆',
      target:'100G+ 高速 APD + SPAD 单光子探测器国产化',
      companies:[
        { name:'源杰科技',  code:'688498', reason:'待核:PD 与 EML 同平台,具体业务体量无源(G1-3 全无源)' },
        { name:'长光华芯',  code:'688048', reason:'待核:VCSEL 探测器+激光雷达 PD,体量无源' }
      ],
      hits:2, strength:'★★☆', tags:['卡脖子','国产化'],
      valuation: { pePercentile:null, marketCap:null, targetPrice:null, src:null, asOf:null, tier:null, note:'⚠️ G1-3 全无源,卡口评级待核实' },
      verification: { items:[
        { type:'产能',  claim:'Hamamatsu(滨松)/First Sensor/Excelitas 三家寡头格局(精确%无源)', howToCheck:'Hamamatsu 年报 + 招商证券 + Yole 报告', falsifySignal:'Hamamatsu 高速 APD 年出货量超 1000 万只(暗示需求大)', status:'pending' },
        { type:'市占',  claim:'全球前 3 大寡头格局清晰,精确份额无第三方一手数据', howToCheck:'Yole《Photonic Sensing 2026》报告', falsifySignal:'第二家中国厂商 100G APD 流片成功', status:'pending' },
        { type:'客户',  claim:'A 股纯 APD/SPAD 标的稀缺,核心标的多与激光器集成', howToCheck:'奥比中光 26Q1 报告(SPAD 业务体量)+ 炬光科技 VCSEL/PD 阵列业务', falsifySignal:'奥比中光 SPAD 月出货量超 10 万只', status:'pending' },
        { type:'技术',  claim:'SPAD 单光子探测器技术壁垒高(激光雷达/量子通信)', howToCheck:'Yole + 招商证券', falsifySignal:'中国厂商 SPAD 良率超 30%', status:'pending' }
      ]}
    },
    {
      name:'硅光 PIC(设计+代工/材料)', barrier:'extreme', tier:'★★★',
      target:'TFLN/MEMS 硅光 PIC 国产化 + 1.6T 渗透率超 50%',
      companies:[
        { name:'光库科技',  code:'300620', reason:'① 命中(G0-6 双源):TFLN 调制器国产化领先厂商 + 26Q1 净利预告 4370-4587 万/+303-323%' },
        { name:'赛微电子',  code:'300456', reason:'待核:MEMS 代工龙头,硅光 PIC 代工业务体量无源' },
        { name:'罗博特科',  code:'300757', reason:'① 命中(G0-5 双源):ficonTEC 100% 控股已确认,联合英伟达开发 CPO' }
      ],
      hits:4, strength:'★★★', tags:['1.6T','CPO','AI 算力','TFLN 调制器'],
      valuation: { pePercentile:null, marketCap:null, targetPrice:null, src:null, asOf:null, tier:null, note:'⚠️ G1-6 PE 分位无源,估值维门控触发留空' },
      verification: { items:[
        { type:'产能',  claim:'1.6T 硅光模块销售额预计首超整体光模块市场 50%(LC 数据,但渗透率精确值无源)', howToCheck:'LightCounting 2026 季度报告 + Yole 硅光报告', falsifySignal:'第二家中国硅光代工线投产(赛微外)', status:'pending' },
        { type:'市占',  claim:'光库 TFLN 全球市占无第三方口径,应称"国产化领先厂商"', howToCheck:'光库 2025 年报 + 26Q1 正式财报 + LC TFLN 报告', falsifySignal:'Lumentum/富士通 TFLN 季度出货量超光库 5 倍', status:'pending' },
        { type:'客户',  claim:'光库 26Q1 净利预告+303-323%(财联社+新浪财双源),下游光模块客户结构无源', howToCheck:'光库 26Q1 正式财报 + 26Q1 业绩说明会', falsifySignal:'光库 2025 年报披露前 5 大客户合计占比<30%', status:'pending' },
        { type:'技术',  claim:'罗博特科·ficonTEC 100% 控股已确认(2026-06-16),联合英伟达开发 CPO', howToCheck:'罗博特科巨潮公告(并表完成日) + 英伟达 GTC 2026 公开演讲', falsifySignal:'ficonTEC 2025 营收<2 亿元(暗示规模有限)', status:'pending' }
      ]}
    }
  ],

  // ④ 供需缺口(注入 2026-06-16)
  supplyGap: [
    { segment:'激光器芯片(EML/CW)', type:'产能缺口', gap:'~25-30%', note:'🟢 ① 命中(G0-2 ②单源存疑):Lumentum FY26Q2 InP 扩产 20% 仍难弥合 200G EML 缺口 25-30%(国盛电子 2026-03-15 + 新浪 2026-05-25 同源);1.6T 拉动下产能扩张滞后于需求增长', src:'国盛电子《AI 引爆供需缺口》2026-03-15 + 新浪 2026-05-25', asOf:'2026-03-15', tier:'media' },
    { segment:'高速探测器(APD)',    type:'市占无源', gap:'待核', note:'⚠️ G1-3 全无源:Hamamatsu(滨松)/First Sensor(已被 TE 收购)/Excelitas 三家寡头格局清晰,但精确全球市占无第三方一手数据', src:'无源(待补)', asOf:null, tier:null },
    { segment:'硅光 PIC(代工)',     type:'产能紧', gap:'待核', note:'🆪 1.6T 硅光模块销售额预计首超整体光模块市场 50%(LC 数据,但渗透率精确值无源);硅光代工产能紧(TSMC COUPE 平台主导,A 股赛微有布局但代工业务体量无源)', src:'LC + Yole(渗透率无源)+ 赛微业务体量无源', asOf:null, tier:null }
  ],

  // 方法论备注(注入 2026-06-16)
  methodologyNotes: '🆪 本赛道核心方法论:<br>1. 严格区分"全球市占率"与"国产化率"(中国市场自给率),二者不可混淆<br>2. 严格区分"上游光芯片"与"下游光模块/收发器"市场规模(2026E AI 光模块 260 亿美元 ≠ 上游光芯片)<br>3. 卡口评级 ★★★/★★☆ 严格按 ≥2 源命中率 + 1.6T/3.2T 关键节点卡位 + 海外寡头验证<br>4. ⚠️ G3 反向陷阱:罗博特科 26Q1 整体亏损不能映射到 ficonTEC 光通信业务下行(光伏设备承压是主因)<br>5. ⚠️ 财报粉饰陷阱:长光华芯 26Q1 表观扭亏但扣非仍亏,不可挂钩"光芯片业务回暖"<br>6. ⚠️ 跨赛道映射陷阱:华峰/长川/精测是"传统半导体测试设备",不能映射至"光通信测试"子板块<br>7. ⚠️ 绝对化表述陷阱:"国内唯一/首家"等需 ≥2 源支撑,否则降级改写<br>8. ⚠️ 估值工具陷阱:early-stage 公司(长华/源杰/光库)TTM 失真,需切 forward PE'
};

})(window.CHAINS);
