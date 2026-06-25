// data/pcb.manual.js  —— 阶段二 commit 2.1：手动层（人工填·脚本只读不写）
// 由 index.html 在 data/pcb.js 之前以 <script src="data/pcb.manual.js"></script> 加载。
// PCB 38 只 stock 单点真理·以 stock code 为键·多段引用同一份·解决 ④ 胜宏 300476 不一致 bug 准备
// 脚本只重写 *.auto.json（阶段三 commit 3.3+），绝不触碰本文件。
//
// 数据来源（pcb.js 原样抽取·未改 1 字）：
//   segments（7 段 35 只）+ midstream（10 只 + 7 只跨段 = 5 只新增）+ fourQ（4 段 30 只 + 688234 同公司异码）
//   跨段合并后 unique 38 只（含 1 只 stock code 错误 688234/301150，commit 2.3 解决）
//   chokePoints 3 只 + prosperity override + 6 只国外 referenceChokepoints
//
// 字段保留（不动 logic·不动 pcb.js）：
//   code/name/rank/barrier/tier/position/dims6/src/valAsOf/trend/trendNote/hits/strength/segments
// 不抽（commit 2.2 才有意义）：
//   logic（含 PE-TTM 数字原文·阶段三 commit 3.1 脚本不动）·valuation（commit 2.2 auto.json）
//
// ⚠️ §6.2 硬红线：本文件是手动层·脚本严禁重写·新 commit 一律按 STOCK_REGISTRY[code] 单点真理

window.PCB_MANUAL = window.PCB_MANUAL || {};
(function(MANUAL){

  // ========== ① 单点真理：38 只 stock ==========
  MANUAL.stocks = {
    '001389': { code:'001389', name:'广合科技', rank:5, barrier:'高', tier:'primary',
      position:'专注算力PCB（服务器/交换机）·算力纯度最高',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'算力纯度最高',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] },

    '002080': { code:'002080', name:'中材科技', rank:3, barrier:'中', tier:'primary',
      position:'国内Low Dk市占35%·石英布独供胜宏GB300',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'石英布胜宏独家·GB300认证·Low-Dk二代已批量·华为昇腾',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] },

    '002384': { code:'002384', name:'东山精密', rank:3, barrier:'中', tier:'primary',
      position:'边缘AI设备PCB全球第一(2025市占26.9%)·全球PCB前3(市占4.2%)·FPC软板全球第二(市占24.5%)·含光模块业务(索尔思光电 IDM 国内唯一 200G EML)',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:3,trend:'flat',tier:'estimate'}],
      src:'2026Q1/2025年报+Prismark', valAsOf:'2026-06-22', trend:'up', trendNote:'28层GB200+32层GB300·1.6T光模块·Meta自研背板·Rubin样品·Q1+143%',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] },

    '002436': { code:'002436', name:'兴森科技', rank:2, barrier:'高', tier:'primary',
      position:'ABF载板国产化追赶者·HBM级ABF唯一',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'FCBGA Rubin 200批量供货·双AI巨头·台积电BT载板验证·寒武纪壁仞量产·Q1+157%',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'}] },

    '002443': { code:'002443', name:'金洲精工', rank:5, barrier:'中', tier:'primary',
      position:'PCB钻针全球第二·全球PCB微钻市占20.8%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'钻针全球第二20.8%·0.02mm沪电·30倍径胜宏景旺·3年长期协议·Q1+76%',
      segments:[{idx:5,name:'PCB专用设备'}] },

    '002463': { code:'002463', name:'沪电股份', rank:1, barrier:'高', tier:'primary',
      position:'GB200/GB300 交换机及高多层板核心供应商之一，与景旺电子等共同供应（非独家）；78 层 M9 正交背板已通过英伟达认证并量产',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;沪电为英伟达 H100/H200 提供 22-26 层高多层板,H200 UBB 主板份额超 70%(截至 2025),泰国工厂 2025.10 投产承接 GB300 订单,延续性极强 → 5'},{key:'visibility',score:5,trend:'up',reason:'26Q1 营收 62.14 亿+53.91%,归母 12.42 亿+62.9%,AI 营收占比升至~60%,英伟达份额>50%;2025 净利 38.22 亿+47.74%;业绩兑现极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项+大基金二期关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:4,trend:'up',reason:'与景旺电子等共同供应 GB200 服务器 UBB 基板/PCB 组件(非独家);AI 算力高多层板扩产潮直接利好,趋势向上 → 4'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 62.91 倍/3 年分位 90.48%(asOf 2026-06-16),估值偏高,趋势向下(性价比恶化);扣分项为估值高位,需控买点 → 2'},{key:'barrier',score:4,trend:'flat',reason:'英伟达 H100/H200 高多层板主供+78 层背板认证,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 4'}],
      src:'2026Q1/2025年报+券商研报', valAsOf:'2026-06-22', trend:'up', trendNote:'GB200 22层量产·GB300 112G/224G背板·Rubin+233%·AMD扩产·谷歌TPU v5·Meta自研背板验证·Q1+78%',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}], growthAdj:true, peAbsMax:120 },

    '002636': { code:'002636', name:'金安国纪', rank:4, barrier:'中', tier:'primary',
      position:'国内龙头·全球CCL第7',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:2,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'M7已量产·M8在研·Q1+763.91%',
      segments:[{idx:0,name:'覆铜板 CCL'}] },

    '002913': { code:'002913', name:'奥士康', rank:10, barrier:'中', tier:'primary',
      position:'通过供应体系向英伟达供货·AI暴露弱',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-04-26', trend:'up', trendNote:'向高端HDI/多层切换',
      // ★ commit 4.28：trendHistory 字段（历史 trend 数组·commit 4.18 减仓3 / 清仓1 实装前置）
      //   用途：判断 trend 从 up 变 down（清仓触发）· 数组按日期降序·最新在前
      trendHistory: [
        { date: '2026-04-26', trend: 'up',   note: '向高端HDI/多层切换·AI暴露弱' },
        { date: '2026-05-20', trend: 'flat', note: 'Q2业绩走平·高端HDI验证延后' },
        { date: '2026-06-15', trend: 'down', note: 'Q2预告同比下滑·HDI验证未达预期' }
      ],
      segments:[{idx:'midstream',name:'中游'}] },

    '002916': { code:'002916', name:'深南电路', rank:1, barrier:'极高', tier:'primary',
      position:'国内唯一ABF载板批量交付·大陆内资ABF市占~63%·全球PCB营收前10',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'20层ABF GB200量产·28层Rubin批量·M10样品⚠️单源待核(2026-05-26互动易)·英伟达+AMD双AI·谷歌TPU4 FC-BGA·Q1+86%',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'},{idx:'midstream',name:'中游'}], growthAdj:true, peAbsMax:120 },

    '002938': { code:'002938', name:'鹏鼎控股', rank:5, barrier:'高', tier:'primary',
      position:'全球PCB营收连续9年第一·FPC软板全球第二(2025市占25%)',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',reason:'全球 PCB 营收连续 9 年第一+FPC 软板全球第二(2025 市占 25%);消费电子占比~70%→AI 转型中;2026-01-15 调研披露"算力直接客户订单导入元年",AI 多场景布局推进中;趋势走平(消费弱) → 3'},{key:'visibility',score:2,trend:'down',reason:'26Q1 营收 79.86 亿同比-1.25%,归母净利 4.63 亿同比-5.21%,扣非-31.85%;AI 业务尚未兑现到整体业绩,业绩可见度低,趋势向下 → 2'},{key:'policy',score:3,trend:'flat',reason:'苹果链稳定+AI 转型政策中性,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',reason:'覆盖 AI 服务器/光模块/交换机等多场景;消费占比~70% 受消费电子周期影响,趋势走平 → 3'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 67.54 倍/3 年分位 99.58%(asOf 2026-06-16),估值贵(动态 PE~130x、TTM~65x,截至 2026-05-22),趋势向下 → 2'},{key:'barrier',score:4,trend:'flat',reason:'全球 PCB 营收 9 连冠+FPC 全球第二,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待 AI 转型兑现 → 4'}],
      src:'2026Q1/2025年报+Prismark', valAsOf:'2026-06-22', trend:'up', trendNote:'GB200 20层·GB300 HDI·9连冠·AI暴露5.41%·海外云厂商小批量·Q1-10%',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] },

    '300395': { code:'300395', name:'菲利华', rank:1, barrier:'极高', tier:'primary',
      position:'Q布业务处认证阶段(2025年收入9,837.37万元/占总营收4.88%)·石英砂环节中试阶段(非独家,石英股份等亦布局)·制品环节技术领先',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:1,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      src:'2026Q1/2025年报', valAsOf:'2026-06-22', trend:'up', trendNote:'英伟达全额预购2026年600-700万米Q布',
      hits:4, strength:'★★★',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}], growthAdj:true, peAbsMax:120,
      // ★ commit 4.33：closeOverride（用户人工核实 from 同花顺/东方财富 2026-06-25）
      closeOverride: { closeLatest: 133.55, closeHigh5y: 151.46, src: 'manual_ths', asOf: '2026-06-25' } },

    '300476': { code:'300476', name:'胜宏科技', rank:2, barrier:'高', tier:'primary',
      position:'英伟达显卡PCB全球份额约50%(一供,Prismark 2026);GB300 OAM子板核心供应商;2025年AI业务营收83.4亿(占比43%、同比+11倍、毛利率40-45%),在手订单饱满排至2026年底',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',reason:'AI 算力结构性上行+GB300 持续放量;胜宏供应 GB300 OAM 五阶 HDI 板,单板价值量提升 30%+;数据中心 PCB 占比近 50%,延续性极强 → 5'},{key:'visibility',score:5,trend:'up',reason:'2025 净利 43.12 亿+273.52%(A 股 PCB 首位),26Q1 营收 55.19 亿+28%,净利 12.88 亿+40%;英伟达 Tier1·显卡 PCB 全球~50%(Prismark 2026),业绩弹性极强,趋势向上 → 5'},{key:'policy',score:3,trend:'flat',reason:'AI capex 市场驱动+IC 载板 02 专项关联,政策中性偏顺风;制造端政策驱动有限,趋势走平 → 3'},{key:'supply',score:4,trend:'up',reason:'2025Q1 英伟达订单占比超 70%(历史参考),AI 高多层板扩产潮直接利好;趋势向上 → 4'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 74.65 倍/3 年分位 95.98%(asOf 2026-06-16),估值高位,趋势向下(性价比恶化);扣分项为估值最贵,需控买点 → 2'},{key:'barrier',score:4,trend:'flat',reason:'英伟达 Tier1+GB300 主供+显卡 PCB 全球~50%,壁垒中等偏上;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 4'}],
      src:'2026Q1/2025年报+Prismark', valAsOf:'2026-06-22', trend:'up', trendNote:'GB300 OAM核心·显卡PCB全球50%·谷歌微软ASIC·字节阿里云·Q1 15.2亿',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}], growthAdj:true, peAbsMax:120 },

    '300522': { code:'300522', name:'世名科技', rank:3, barrier:'高', tier:'primary',
      position:'盘锦500吨已投产·M9方案已认证',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'500吨已投产·M9方案7月小批量供货·2500吨2027Q1',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] },

    '301150': { code:'301150', name:'中一科技', rank:5, barrier:'中', tier:'primary',
      position:'高性能电子铜箔·HVLP4在研',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'锂电主业70%·HVLP4在研·Q1净利+2297%·台资试样',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] },

    '301200': { code:'301200', name:'大族数控', rank:2, barrier:'高', tier:'primary',
      position:'钻孔设备全球第二·AI高多层板设备市占40-50%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'钻孔国内70%·沪电胜宏认证·英伟达2亿订单·景旺鹏鼎·ABF激光样品·Q1+108%',
      segments:[{idx:5,name:'PCB专用设备'}] },

    '301217': { code:'301217', name:'铜冠铜箔', rank:1, barrier:'极高', tier:'primary',
      position:'国内唯一HVLP1-4全系列量产·2027市占预期42%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'GB200/GB300 HVLP4量产·深南长期协议·HVLP5样品',
      hits:4, strength:'★★★',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] },

    '301377': { code:'301377', name:'鼎泰高科', rank:1, barrier:'高', tier:'primary',
      position:'PCB钻针全球第一(2024年市占26.8%/2025H1进一步提升至28.9%)',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'钻针全球第一28.9%·0.01mm沪电深南·80倍径验证·HBM样品·Q1+96%',
      segments:[{idx:5,name:'PCB专用设备'}], growthAdj:true, peAbsMax:120 },

    '301511': { code:'301511', name:'德福科技', rank:2, barrier:'高', tier:'primary',
      position:'进入英伟达供应链·电子电路铜箔年产能5万吨可柔性切换·HVLP4已在部分客户小规模放量(2025年报)·HVLP5完成样品认证',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'全球第二HVLP4出货·HVLP5样品认证完成✅已双源核实(兴业证券·2026-05-16)·3μm载体铜箔·AMD MI300',
      hits:3, strength:'★★☆',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] },

    '600110': { code:'600110', name:'诺德股份', rank:3, barrier:'中', tier:'primary',
      position:'6μm极薄铜箔量产·服务器铜箔市占>25%·2026Q1扭亏',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'HVLP3量产·HVLP4验证中·6μm良率92%·Q1扭亏',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] },

    '600176': { code:'600176', name:'中国巨石', rank:4, barrier:'中', tier:'primary',
      position:'电子纱产能国内第一(市占25%)·全球电子玻纤市占~23%(淮安扩产后升至~28%)·全球玻纤龙头',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'E-glass生益/台光·淮安3.9亿米·Low-Dk研发·AI纯度低',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] },

    '600183': { code:'600183', name:'生益科技', rank:1, barrier:'极高', tier:'primary',
      position:'全球高端覆铜板第一梯队·M9等级大陆唯一进入英伟达供应链(与台光/松下并列三大供应商)·全球市占14-15%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'M9 GB200/GB300批量·AMD MI300·谷歌TPU 78层',
      segments:[{idx:0,name:'覆铜板 CCL'}], growthAdj:true, peAbsMax:120 },

    '601208': { code:'601208', name:'东材科技', rank:1, barrier:'极高', tier:'primary',
      position:'全球唯二M9碳氢树脂认证·国内唯一',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:5,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:5,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'M9 GB300量产·M10验证中·台光独家',
      hits:4, strength:'★★★',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}], growthAdj:true, peAbsMax:120 },

    '603002': { code:'603002', name:'宏昌电子', rank:4, barrier:'中', tier:'primary',
      position:'环氧树脂龙头·GBF增层膜送样',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'台积电低Alpha·珠海三期8万吨·52项专利·Q1+60%',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] },

    '603186': { code:'603186', name:'华正新材', rank:2, barrier:'高', tier:'primary',
      position:'华为昇腾CCL核心供·CBF积层膜对标味之素ABF',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'CBF国产唯一·海思/中芯/长电/通富·ABF中试送样',
      segments:[{idx:0,name:'覆铜板 CCL'},{idx:4,name:'IC封装基板（ABF载板）'}] },

    '603228': { code:'603228', name:'景旺电子', rank:4, barrier:'中', tier:'primary',
      position:'2024年首次成为全球第一大汽车PCB供应商(2023年已进全球前三);英伟达H100/GB300交换机托盘核心供应商之一,与日本名幸等共同供应GB200服务器UBB基板',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',reason:'2024 年首次成为全球第一大汽车 PCB 供应商(2023 已进全球前三);英伟达 H100/GB300 交换机托盘核心供应商之一;汽车+消费双轮+AI 高阶 HDI 转型,延续性高 → 4'},{key:'visibility',score:3,trend:'flat',reason:'26Q1 营收 38.92 亿,归母 2.33 亿,毛利率 18.76% 稳健;2023.4 获英伟达合格供应商认证,2024 年高阶 HDI 一次性通过认证;正交背板项目获研发标(单源待核),趋势走平 → 3'},{key:'policy',score:3,trend:'flat',reason:'汽车 PCB+AI 高阶 HDI 政策中性,趋势走平 → 3'},{key:'supply',score:3,trend:'flat',reason:'综合 PCB(软板/硬板/金属基),AI 纯度低;2026 全年规划新增约 200 万平米高端产能(珠海金湾+泰国基地),趋势走平(扩产中) → 3'},{key:'valuation',score:2,trend:'down',reason:'PE-TTM 67.58 倍/3 年分位 99.42%(asOf 2026-06-16),估值高位,趋势向下(分位回踩中);扣分项为 AI 纯度低 → 2'},{key:'barrier',score:3,trend:'flat',reason:'英伟达二级供应商+全球 PCB 第 9+汽车 PCB 全球第一,壁垒中等;非物理卡口(全球供应商>5 家),壁垒待高端化兑现 → 3'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'Rubin中板40%+·正交背板25%+·Switch板·车载PCB全球9%·Q1+62%',
      segments:[{idx:6,name:'AI PCB 制造(中游)'},{idx:'midstream',name:'中游'}] },

    '603256': { code:'603256', name:'宏和科技', rank:2, barrier:'高', tier:'primary',
      position:'4μm极薄布全球唯一量产·全球市占~50%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'4μm GB300全球唯一·黄石10亿米2027Q2·3μm验证中',
      hits:3, strength:'★★☆',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] },

    '603519': { code:'603519', name:'南亚新材', rank:3, barrier:'高', tier:'primary',
      position:'刚性CCL全球前10·大陆第三(Prismark·2023年度)·M8量产M9测试中',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:4,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'M7已量产·M8验证中·M9在研',
      segments:[{idx:0,name:'覆铜板 CCL'}] },

    '603650': { code:'603650', name:'彤程新材', rank:5, barrier:'中', tier:'primary',
      position:'电子级酚醛树脂·对标SABIC PPO',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:2,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'up',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'电子级酚醛+中芯/长江存储·PPO在研',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] },

    '603920': { code:'603920', name:'世运电路', rank:9, barrier:'中', tier:'primary',
      position:'特斯拉汽车/人形机器人PCB·汽车赛道稳定',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-04-26', trend:'up', trendNote:'28层AI服务器板+转型AI/机器人',
      segments:[{idx:'midstream',name:'中游'}] },

    '603936': { code:'603936', name:'博敏电子', rank:5, barrier:'中', tier:'primary',
      position:'PCB+汽车切入ABF',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'down',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'down', trendNote:'ABF规模<1%·HBM在研·Q1亏损·Switch/正交背板·AI载板落后',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'}] },

    '605006': { code:'605006', name:'山东玻纤', rank:5, barrier:'中', tier:'primary',
      position:'电子布老牌·ECR玻纤纱',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:2,trend:'down',tier:'estimate'},{key:'visibility',score:2,trend:'down',tier:'estimate'},{key:'policy',score:2,trend:'flat',tier:'estimate'},{key:'supply',score:2,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'down', trendNote:'E-glass中端PCB·非Q布·市占5%·Q1+20%',
      segments:[{idx:2,name:'玻纤布/Q布（石英纤维布）'}] },

    '605589': { code:'605589', name:'圣泉集团', rank:2, barrier:'高', tier:'primary',
      position:'PPO国内唯一量产·全球第四',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:4,trend:'up',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'PPO M8已量产·碳氢已批量·1500吨Q4投产',
      segments:[{idx:1,name:'电子树脂（碳氢树脂/PPO）'}] },

    '688183': { code:'688183', name:'生益电子', rank:6, barrier:'高', tier:'primary',
      position:'AI服务器PCB黑马·生益科技子公司',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:5,trend:'up',tier:'estimate'},{key:'visibility',score:5,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'净利+5倍',
      segments:[{idx:'midstream',name:'中游'}] },

    '688300': { code:'688300', name:'联瑞新材', rank:4, barrier:'中', tier:'primary',
      position:'亚微米球形硅微粉·球形硅微粉国内市占~40%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:3,trend:'flat',tier:'estimate'},{key:'visibility',score:3,trend:'flat',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:3,trend:'flat',tier:'estimate'},{key:'valuation',score:2,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'flat', trendNote:'球形硅微粉·揖斐电+深南兴森·长电·M9/M10纳米样品·AI暴露18%·Rubin低α未启动·Q1+32%',
      segments:[{idx:4,name:'IC封装基板（ABF载板）'}] },

    '688388': { code:'688388', name:'嘉元科技', rank:4, barrier:'中', tier:'primary',
      position:'极薄铜箔4.5μm市占>50%',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:3,trend:'flat',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'2026Q1季报(2026-04-27)+新浪财经2026-04-29', valAsOf:'2026-06-22', trend:'up', trendNote:'A股第三HVLP4小批量·生益试样1亿·Q1+392.77%',
      segments:[{idx:3,name:'铜箔（HVLP4超低轮廓铜箔）'}] },

    '688630': { code:'688630', name:'芯碁微装', rank:3, barrier:'高', tier:'primary',
      position:'PCB直接成像设备全球市占率18.8%(2025年,收入口径,全球第一,领先第二名3.1pct)·全球唯一覆盖PCB/IC载板/先进封装/掩膜版四场景的企业',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:4,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'LDI全球第一18.8%·3-4μm胜宏·ABF载板深南量产·英伟达1.5亿·兴森华正新增·Q2批量交付',
      segments:[{idx:5,name:'PCB专用设备'}], growthAdj:true, peAbsMax:120 },

    '688700': { code:'688700', name:'东威科技', rank:4, barrier:'中', tier:'primary',
      position:'VCP电镀国内市占>50%·AI订单>5亿',
      investable:true, region:'国内',
      dims6:[{key:'durability',score:4,trend:'up',tier:'estimate'},{key:'visibility',score:4,trend:'up',tier:'estimate'},{key:'policy',score:3,trend:'flat',tier:'estimate'},{key:'supply',score:4,trend:'up',tier:'estimate'},{key:'valuation',score:2,trend:'down',tier:'estimate'},{key:'barrier',score:2,trend:'flat',tier:'estimate'}],
      src:'akshare/新浪财经(基于公司季报)', valAsOf:'2026-06-22', trend:'up', trendNote:'VCP国内50%+·沪电胜宏东山认证·AI订单5亿+200%·景旺鹏鼎·ABF载板验证',
      segments:[{idx:5,name:'PCB专用设备'}] }
  };

  // ========== ② 5 个 chokePoints 注解（手动层·logic/valuation 在 pcb.js） ==========
  // ★ commit 4.11：补全 002916 深南电路 + 600183 生益科技 两条弱卡口（rank 4/5 · ★★☆）
  //   - pcb.js DERIVED 生成 5 只卡口时通过 origCP.find() 找 orig 注解
  //   - 当前 pcb.js 仅写 origCP 为 CHAINS.pcb.chokePoints 自身的引用（line 671），不读 manual.chokePoints
  //   - 此处新增的 rank 4/5 注解作为「待 pcb.js 接入」准备；当前不生效
  //   - 不破坏既有 3 只强卡口（★★★）字段
  MANUAL.chokePoints = {
    '601208': { code:'601208', name:'东材科技', segment:'M9碳氢树脂', strength:'★★★', tags:['双寡头','无替代','缺口63%','Q1净利+103%'], verification:null, lowScoreNote:null },
    '300395': { code:'300395', name:'菲利华', segment:'Q布/石英纤维布', strength:'★★★', tags:['≥55%绝对龙头','无替代','缺口>40%','毛利55-65%'], verification:null, lowScoreNote:null },
    '301217': { code:'301217', name:'铜冠铜箔', segment:'HVLP4铜箔', strength:'★★★', tags:['国产唯一','设备锁定全球70%','缺口23%','已量产'], verification:null, lowScoreNote:null },
    // 弱卡口 rank 4/5（★2☆）· 补全 logic 150+ 字 + tags 4 个 + verification 4 项
    '002916': {
      code:'002916', name:'深南电路', segment:'IC封装基板(ABF载板)', strength:'★★☆',
      tags:['国内唯一ABF批量','装联3in1','华为昇腾一供>60%','Q1净利+73%'],
      // ★ commit 4.11 修复：logic 提到顶级（pcb.js DERIVED 走 manualAnnot.logic || orig.logic）
      logic: '<strong>国内唯一ABF载板批量交付</strong>·<strong>PCB+封装基板+装联3-in-1</strong>全产业链布局·广州60亿扩产中·华为昇腾一供占比>60%·AMD核心PCB供应商·英伟达/谷歌/Meta等海外巨头覆盖·2026Q1营收48.19亿、归母8.50亿+73%·Q1毛利率30%+ 稳健增长·非物理卡口但具备α·ABF膜仍依赖日本味之素97%进口·材料端才是绝对寡头',
      verification: {
        logic: '<strong>国内唯一ABF载板批量交付</strong>·<strong>PCB+封装基板+装联3-in-1</strong>全产业链布局·广州60亿扩产中·华为昇腾一供占比>60%·AMD核心PCB供应商·英伟达/谷歌/Meta等海外巨头覆盖·2026Q1营收48.19亿、归母8.50亿+73%·Q1毛利率30%+ 稳健增长·非物理卡口但具备α·ABF膜仍依赖日本味之素97%进口·材料端才是绝对寡头',
        sources: [
          { tier:'primary', desc:'公司 2026Q1 季报（cninfo 巨潮·2026-04-26）', src:'巨潮 cninfo 2026Q1' },
          { tier:'broker', desc:'招商证券深度报告·2025Q4 测算国内 ABF 载板唯一批量交付', src:'招商证券 2025-12' },
          { tier:'broker', desc:'Prismark 2026 全球封装基板格局·深南全球占比 1.8%', src:'Prismark 2026' }
        ],
        falsifySignal: 'ABF 膜国内突破 / 兴森科技 FC-BGA 量产放量 → 深南 ABF 卡口降级'
      },
      lowScoreNote: '★★☆ 而非 ★★★ 原因：ABF 膜材料端才是绝对寡头（日本味之素 97%）·深南仅在载板加工端·非材料卡口'
    },
    '600183': {
      code:'600183', name:'生益科技', segment:'覆铜板 CCL', strength:'★★☆',
      tags:['M9大陆唯一','全球市占14-15%','Q1净利+105%','毛利率28%+'],
      // ★ commit 4.11 修复：logic 提到顶级（pcb.js DERIVED 走 manualAnnot.logic || orig.logic）
      logic: '<strong>M9 等级大陆唯一</strong>进入英伟达供应链·与台光（台）、松下（日）并列三大供应商·全球高端 CCL 第一梯队·M8 已批量应用、M9 已取得英伟达全链路认证·Q1 营收 81.41 亿+45%、归母 11.58 亿+105%·Q1 毛利率 28.10%·AI 服务器 + 800G 光模块 PCB 双轮驱动·<strong>注意</strong>：覆铜板环节国际竞争充分（非物理卡口）·台光占英伟达 AI 服务器 CCL 用量 ~95%·生益占 14-15%（整体 CCL 口径）·M9 细分品类口径下可能 30-40%（口径差异）',
      verification: {
        logic: '<strong>M9 等级大陆唯一</strong>进入英伟达供应链·与台光（台）、松下（日）并列三大供应商·全球高端 CCL 第一梯队·M8 已批量应用、M9 已取得英伟达全链路认证·Q1 营收 81.41 亿+45%、归母 11.58 亿+105%·Q1 毛利率 28.10%·AI 服务器 + 800G 光模块 PCB 双轮驱动·<strong>注意</strong>：覆铜板环节国际竞争充分（非物理卡口）·台光占英伟达 AI 服务器 CCL 用量 ~95%·生益占 14-15%（整体 CCL 口径）·M9 细分品类口径下可能 30-40%（口径差异）',
        sources: [
          { tier:'primary', desc:'公司 2026Q1 季报 + 2025 年报（cninfo 巨潮·2026-04-28）', src:'巨潮 cninfo 2026Q1' },
          { tier:'primary', desc:'2026-05-08 业绩说明会·M9 CCL 批量供货英伟达', src:'公司业绩说明会 2026-05-08' },
          { tier:'broker', desc:'招商证券研报·2026-01-15 M9 CCL 全链路测算', src:'招商证券 2026-01-15' }
        ],
        falsifySignal: '台光大陆扩产 / 台积电 CoWoS 改用其他 CCL → M9 卡口降级'
      },
      lowScoreNote: '★★☆ 而非 ★★★ 原因：覆铜板环节国际竞争充分（台光占 ~95%）·生益仅 M9 细分品类有认证·非物理卡口'
    }
  };

  // ========== ③ prosperity override（默认 null·阶段三 3.5 可填） ==========
  MANUAL.prosperity = { override: null };

  // ========== ④ referenceChokepoints（国外卡脖子主体·不进估值管线） ==========
  MANUAL.referenceChokepoints = [
    { name:'三井金属', region:'日本', barrier:'HVLP4 铜箔', replacementCode:'301217' },
    { name:'味之素',   region:'日本', barrier:'ABF 膜',   replacementCode:'603186' },
    { name:'日东纺 Nittobo', region:'日本', barrier:'Q 布/石英纤维布', replacementCode:'300395' },
    { name:'JX 化学',  region:'日本', barrier:'M9 碳氢树脂', replacementCode:'601208' },
    { name:'IBIDEN',   region:'日本', barrier:'FC-BGA 载板', replacementCode:'002916' },
    { name:'Resonac',  region:'日本', barrier:'BT 载板', replacementCode:'—' }
  ];

  // ========== ⑤ 全站单点真理注入到 window.STOCK_REGISTRY（不破坏既有 pcb.js） ==========
  // 渲染函数仍优先读 STOCK_REGISTRY[code]（commit 2.3 才正式改 segments.stocks 结构）
  // 当前 STOCK_REGISTRY 已是 const 在 index.html line 748·这里 append-only 不覆盖
  if (typeof window !== 'undefined') {
    if (!window.STOCK_REGISTRY) window.STOCK_REGISTRY = {};
    Object.keys(MANUAL.stocks).forEach(code => {
      window.STOCK_REGISTRY[code] = MANUAL.stocks[code];
    });
  }

  // ★ commit 4.17：信号 C 全局市场风险档位（normal/caution/extreme）
  //   · normal: 默认档·按标准阈值触发信号 C
  //   · caution: 所有分位阈值 +10pp · 仓位建议降一档
  //   · extreme: 禁止触发任何信号 C（市场极端风险）
  MANUAL.marketRisk = 'normal';

})(window.PCB_MANUAL);
