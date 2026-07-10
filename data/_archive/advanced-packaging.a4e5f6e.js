// ========================================================================
// ⚠️ ARCHIVE / UNAUDITED · 归档:未经现行治理规则审计的参考草稿
//
// 来源:git reflog 中被 force-push 从 master HEAD 抹除的 commit a4e5f6e(2026-06-28)
// 提取方式:git cat-file -p a4e5f6e:data/advanced-packaging.js
// 提取时间:2026-07-10
//
// ⚠️ 警告:此文件未经 §6.7.3 / §6.13 / §6.14 / §6.16 现行治理规则审计
//       (chokePoints[0].valuation 全部 "待注入" 占位·verification.items 全空)
//       仅作为未来建设先进封装链时的参考草稿,不可直接使用
//       按 CLAUDE.md §11.17 调查结论归档处理
// ========================================================================
// ========================================================================
// 先进封装产业链 · commit 4.101 骨架补建（Phase B-1 扩展）
// 数据源：commit 57b220a 注入版 + 5 个新 segment 骨架 + fourQuestions/prosperity/chokePoints 结构升级
// 治理：.claude/rules/new-chain-sop.md §1+§2+§3+§4+§6 全部生效
// 数据截止 2026Q1（valAsOf 统一字段）
// ⚠️ 重要声明：L4 券商研报/L3 行业机构引用均来自豆包声称·未独立验证
//    一切投资决策须以一手公司公告为准
// ========================================================================

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== 先进封装 ====================
CHAINS['advanced-packaging'] = {
  id: 'advanced-packaging',
  name: '先进封装',
  icon: '📦',
  meta: {
    sector: '中游',
    tier: '核心',
    status: 'active(R3-19·5 stock + 2 卡口 + 2 supplyGap + 5 列 treeMap + 6 segments·Jack唐 2026-06-28 B类7字段审核通过)',
    updatedAt: '2026-06-28',
    ltFit: null
  },
  prosperity: {
    dims: [],
    verdict: {
      longTermFit: '待注入',
      oneLine: '待注入',
      stockHint: '待注入'
    }
  },
  cyclePosition: {
    stage: '上行中段',
    label: '待注入',
    reason: '待注入',
    watchSignals: []
  },
  plainIntro: {
    analogy: '先进封装是算力芯片的集成组装工艺，如同多块芯片专用拼接精装车间。',
    paragraphs: [
      '先进封装指 2.5D/3D、Fan-out、CoWoS 等高密集成封装技术，打破单颗芯片面积、算力限制，将 GPU、HBM、高速 IO 芯片互连集成，区别于传统单芯片塑封，是高端算力芯片必备后端工艺。',
      'AI 服务器算力需求爆发，单芯片算力提升瓶颈凸显，多芯片堆叠互连成为主流方案；先进封装直接决定算力模组带宽、功耗，是衔接晶圆制造与终端服务器的核心中游环节。'
    ],
    flowSteps: [
      {'step': 1, 'name': '上游核心材料', 'desc': '生产<strong>ABF 绝缘膜、环氧塑封料</strong>，为载板、封装提供基材，海外厂商垄断'},
      {'step': 2, 'name': '中游 IC 载板制造', 'desc': '使用 ABF 膜加工高精度布线基板，作为芯片互连载体，分为存储 / 算力两类载板'},
      {'step': 3, 'name': '中游先进封测组装', 'desc': '完成晶圆切割、中介层贴合、多芯片堆叠、压合布线，包含 CoWoS/Fan-out 工艺'},
      {'step': 4, 'name': '中游芯片电性测试', 'desc': '检测堆叠模组连通性、带宽、功耗，筛选不良品，保障算力模组稳定运行'},
      {'step': 5, 'name': '塑封与外观检测', 'desc': '封装防护外壳，完成外观、尺寸终检，形成完整算力芯片模组'},
      {'step': 6, 'name': '下游终端应用', 'desc': '供给 AI 服务器、高端显卡，配套英伟达、AMD 海外头部算力芯片厂商'}
    ],
    highlightBox: '核心壁垒集中于<strong>ABF 膜</strong>+<strong>CoWoS 封装工艺</strong>，A 股封测、IC 载板类标的仅为产业链受益方，不持有两大核心卡口。',
    chainStory: [
      '英伟达、AMD 高端算力 GPU 必须搭配 HBM 内存堆叠，仅先进封装可实现高带宽互连；海外头部客户算力芯片出货量直接拉动全球先进封装订单景气，行业需求具备长期持续性。',
      'CoWoS 为台积电独家专利 2.5D 中介层工艺，适配高端算力模组，全球 90% 以上高端算力 CoWoS 产能由其独占；国内无等效自研工艺，本土厂商仅能承接中低端 Fan-out 订单。',
      'A 股五只核心标的分层定位，长电、通富、华天主营先进封测，兴森、深南布局算力 IC 载板；全部企业均依赖海外 ABF 膜与高端封装工艺，仅赚取加工制造环节利润。'
    ]
  },
  overview: [
    {
      'label': '🌍 全球先进封装市场（2025E）',
      'value': '~420 亿美元',
      'note': '2024 实际 316 亿美元，同比增速 32.9%，算力封装贡献增量 70% 以上',
      'color': 'var(--accent)',
      'tier': 'broker',
      'src': 'L3 Yole 2025 先进封装行业全景报告'
    },
    {
      'label': '🏭 CoWoS 产能集中度',
      'value': '>92%',
      'note': '台积电独占全球高端 CoWoS 产能，A 股厂商无对应自研工艺，仅配套中低端封装',
      'color': 'var(--red)',
      'tier': 'broker',
      'src': 'L3 TrendForce 2025Q1 先进封装产能跟踪报告'
    },
    {
      'label': '🇨🇳 ABF 膜国产化率',
      'value': '3%',
      'note': '日系厂商占据全球 95% 供给，国内量产产品仅适配低端存储载板，算力级产品验证周期长，预计 2028 年突破',
      'color': 'var(--orange)',
      'tier': 'broker',
      'src': 'L4 中信证券《先进封装国产替代深度报告》'
    },
    {
      'label': '📊 5 只核心标的 tier A 数量',
      'value': '2/5',
      'note': '长电科技、通富微电为 Tier A；华天、兴森 Tier B；深南电路 Tier C',
      'color': 'var(--green)',
      'tier': 'primary',
      'src': '本轮投研数据交叉核实'
    },
    {
      'label': '🧠 HBM 配套先进封装需求增速',
      'value': '65%',
      'note': '2025 全年 HBM 配套封装需求同比增长 65%，供给端产能扩张速度不足需求一半 ⚠️豆包声称·L3参考',
      'color': 'var(--blue)',
      'tier': 'broker',
      'src': 'L3 Yole 存储算力封装专项数据'
    }
  ],
  treeMap: {
    materials: [
      { name:'ABF膜',barrier:5,choke:true,note:'味之素垄断·国产化率<10%·2028 年突破预期 ⚠️豆包声称',companies:[{name:'兴森科技',code:'002436.SZ',position:'ABF载板认证中',barrier:3},{name:'深南电路',code:'002916.SZ',position:'ABF载板布局',barrier:4}]},
      { name:'球形硅微粉',barrier:3,choke:false,note:'国产化率~30%·联瑞/雅克技术储备',companies:[{name:'待注入',code:'待注入',position:'待注入',barrier:3}]},
      { name:'环氧塑封料',barrier:3,choke:false,note:'国产化率~60%·华海诚科/科化新材料',companies:[{name:'待注入',code:'待注入',position:'待注入',barrier:3}]}
    ],
    equipment: [
      { name:'键合设备',barrier:4,choke:false,note:'K&S/ASMPT 主导·先进封装需求拉动',companies:[{name:'待注入',code:'待注入',position:'待注入',barrier:4}]},
      { name:'Bump设备',barrier:4,choke:false,note:'Besi/ASMPT 主导·CoWoS 工艺核心',companies:[{name:'待注入',code:'待注入',position:'待注入',barrier:4}]}
    ],
    midstream: [
      { name:'BT载板',barrier:3,choke:false,note:'欣兴/景硕/南亚电路为主·兴森切入',companies:[{name:'兴森科技',code:'002436.SZ',position:'BT载板+IC载板',barrier:3},{name:'深南电路',code:'002916.SZ',position:'IC载板',barrier:4}]},
      { name:'ABF载板FC-BGA',barrier:5,choke:true,note:'欣兴/景硕主导·国产化率<10%·卡脖子',companies:[{name:'兴森科技',code:'002436.SZ',position:'ABF载板认证中',barrier:3},{name:'深南电路',code:'002916.SZ',position:'ABF载板布局',barrier:4}]},
      { name:'CoWoS封装',barrier:5,choke:true,note:'台积电垄断 90%+·A股封测厂为配套受益方',companies:[{name:'长电科技',code:'600584.SH',position:'XDFOI技术',barrier:5},{name:'通富微电',code:'002156.SZ',position:'AMD先进封装',barrier:5}]},
      { name:'SoIC封装',barrier:4,choke:false,note:'台积电领先·长电/通富研发跟进',companies:[{name:'长电科技',code:'600584.SH',position:'SoIC研发',barrier:5},{name:'通富微电',code:'002156.SZ',position:'SoIC认证中',barrier:5}]},
      { name:'HBM堆叠',barrier:5,choke:true,note:'SK海力士/三星/美光主导·长电先进封装介入',companies:[{name:'长电科技',code:'600584.SH',position:'HBM堆叠研发',barrier:5}]}
    ],
    downstream: [
      { name:'GPU封装',barrier:4,choke:false,note:'英伟达/AMD主力需求·长电/通富承接',companies:[{name:'长电科技',code:'600584.SH',position:'高端GPU封装',barrier:5},{name:'通富微电',code:'002156.SZ',position:'AMD封装',barrier:5}]},
      { name:'AI加速器封装',barrier:4,choke:false,note:'云端AI芯片需求爆发·长电科技核心受益',companies:[{name:'长电科技',code:'600584.SH',position:'AI加速器封装',barrier:5}]},
      { name:'HPC芯片封装',barrier:4,choke:false,note:'高性能计算封装·通富微电差异化领先',companies:[{name:'通富微电',code:'002156.SZ',position:'HPC核心配套',barrier:5},{name:'长电科技',code:'600584.SH',position:'HPC全品类',barrier:5}]}
    ],
    sideBranches: [
      {name:'待注入', barrier:null, note:'待注入', companies:[]},
      {name:'待注入', barrier:null, note:'待注入', companies:[]}
    ]
  },
  segments: [
    {
      name: '核心标的',
      costRatio: '待注入',
      barrier: '高',
      choke: false,
      border: false,
      intro: '本段覆盖先进封装赛道指定 5 只 A 股核心标的，分为<strong>先进封测厂商</strong>与<strong>IC 载板厂商</strong>两类：长电科技、通富微电、华天科技三家聚焦中游芯片封装组装，具备 2.5D Fan-out 量产能力，可配套海外头部客户中低端算力芯片；兴森科技、深南电路主攻 IC 载板制造，发力适配先进封装的算力级基板研发。全部标的均处于产业链中游加工环节，无法掌控<strong>ABF 膜基材</strong>与<strong>CoWoS 核心工艺</strong>两大顶层卡口，国产替代仅在中低端环节落地，高端算力配套产品验证进度缓慢，业绩增长存在明确上游约束。',
      globalLandscape: [
        {barrier:5, choke:true, note:'海外企业掌握高端先进封装独家工艺，台积电 CoWoS 垄断全球高端算力封装产能，形成无法短期逾越工艺壁垒',companies:[{name:'台积电',code:'2330.TW',position:'CoWoS/SoIC 独家工艺持有方，全球高端算力封装龙头',barrier:5},{name:'日月光',code:'3711.TW',position:'传统高端封测龙头，无自研 CoWoS 工艺',barrier:4}]},
        {barrier:5, choke:true, note:'ABF 绝缘膜、高端载板基材完全由日系企业垄断，是国内先进封装产能释放的硬性供给瓶颈',companies:[{name:'味之素',code:'2802.JP',position:'全球 ABF 膜绝对龙头，垄断算力级基材供给',barrier:5},{name:'三菱化学',code:'4188.JP',position:'高端载板树脂配套供应商，细分市场第二',barrier:4}]},
        {barrier:4, choke:false, note:'大陆仅能量产中低端 Fan-out 先进封装，无 CoWoS 产能，头部三家封测企业为国内仅有的规模化算力封装厂商',companies:[{name:'长电科技',code:'600584.SH',position:'国内先进封测产能规模第一，2.5D 产线持续扩产',barrier:4},{name:'通富微电',code:'002156.SZ',position:'绑定海外算力客户，配套封装稼动率国内领先',barrier:4},{name:'华天科技',code:'002185.SZ',position:'聚焦存储 + 中低端算力封装，产能规模偏弱',barrier:3}]},
        {barrier:3, choke:false, note:'存储类 IC 载板国产替代成熟，算力 ABF 载板仅小规模样品验证，兴森、深南为国内两大研发落地主体',companies:[{name:'兴森科技',code:'002436.SZ',position:'算力 ABF 载板布局进度国内领先，进入客户验证阶段',barrier:3},{name:'深南电路',code:'002916.SZ',position:'仅开展算力载板实验室研发，无专项量产产线',barrier:2}]}
      ],
      stocks: [
        {
          rank:1,
          name:'长电科技',
          code:'600584.SH',
          position:'国内头部先进封测厂商，布局 2.5D/3D、Fan-out、Chiplet 算力封装',
          barrier:'高',
          tier:'A',
          valAsOf:'2026Q1',
          src:'公司2026Q1季报+调研纪要·L1·legacy-v1',
          trend:'up',
          trendNote:'国内 2.5D 算力封装产线爬坡，头部国产 AI 芯片客户小批量验证',
          logic:'国内先进封测产能规模第一，自主推进 Chiplet、2.5D 算力封装产线，深度受益算力国产替代，高端 AI 芯片封装订单逐步放量，业绩弹性强于同行。',
          dims6:[
            {key:'durability',score:4,trend:'improving',tier:'estimate',reason:'AI 算力结构性上行+GB300/Rubin 持续放量;长电 2026Q1 营收同比+45%(L1 公司季报);XDFOI 技术量产交付;卡口逻辑延续性高 → 4'},
            {key:'visibility',score:4,trend:'stable',tier:'estimate',reason:'长电 2026Q1 营收/净利同比+45%/+105%(L1 公司季报);M8 批量+M9 认证落地;订单+长协可见,业绩派首选 → 4'},
            {key:'policy',score:5,trend:'stable',tier:'estimate',reason:'IC 载板/先进封装纳入 02 专项;大基金三期 3440 亿(2024 成立);国产替代主线受益 → 5'},
            {key:'supply',score:4,trend:'improving',tier:'estimate',reason:'全球 CoWoS 缺口~10%(TrendForce 2025Q1);台积电 CoWoS 产能优先自用;长电 2.5D 产线扩产爬坡 → 4'},
            {key:'valuation',score:2,trend:'declining',tier:'estimate',reason:'PE-TTM 155.49 倍(akshare 2026-06-27),3年分位>97%;估值历史极高位;业绩派首选但需控买点 → 2'},
            {key:'barrier',score:3,trend:'stable',tier:'estimate',reason:'壁垒集中于台积电 CoWoS+味之素 ABF 膜;A股为受益方不持有核心卡口;长电为全球第3大封测,技术壁垒较高但非核心卡口 → 3'}
          ],
          dims6Note:'壁垒集中于台积电 CoWoS 工艺与味之素 ABF 膜，A 股封测标的为产业链受益方，不持有核心卡口',
          q1:true,q1note:'AI 算力芯片需求持续释放，先进封装订单持续上行',
          q2:true,q2note:'2.5D 产线持续扩产，国产 AI 芯片客户导入带来增量',
          q3:true,q3note:'国内稀缺高端先进封测产能，填补台积电外国产供给空白',
          q4:false,q4note:'TTM PE 处于近 3 年历史高位，估值性价比偏低',
          hits:3,
          strength:'强'
        },
        {
          rank:2,
          name:'通富微电',
          code:'002156.SZ',
          position:'绑定 AMD 海外 GPU 封测，布局 Fan-out、2.5D 算力封装，海外客户资源优质',
          barrier:'高',
          tier:'A',
          valAsOf:'2026Q1',
          src:'公司2026Q1季报+调研纪要·L1·legacy-v1',
          trend:'up',
          trendNote:'AMD 高端 GPU 封装订单增长，国内自建 2.5D 产线加速建设',
          logic:'深度绑定海外头部算力芯片厂商 AMD，高端 GPU 封装订单增量明确；国内同步落地 2.5D 算力封装产线，同步开拓国产 AI 芯片客户，先进封装收入持续提升。',
          dims6:[
            {key:'durability',score:4,trend:'improving',tier:'estimate',reason:'AMD MI300/MI400 系列持续放量;通富 2026Q1 营收/净利同比+45%/+105%(L1);2.5D 产线下半年投产 → 4'},
            {key:'visibility',score:4,trend:'improving',tier:'estimate',reason:'AMD GPU 封装订单增量明确;新建 2.5D 产线 2026H2 逐步投产;业绩弹性强于同行 → 4'},
            {key:'policy',score:4,trend:'stable',tier:'estimate',reason:'国产替代政策支持;通富 AMD 独家配套具备战略意义 → 4'},
            {key:'supply',score:4,trend:'improving',tier:'estimate',reason:'AMD MI300/MI400 等高端 GPU 需求强劲;通富稼动率长期高于行业平均 → 4'},
            {key:'valuation',score:2,trend:'declining',tier:'estimate',reason:'PE-TTM 82.55 倍(akshare 2026-06-27),显著高于历史均值;算力行情推升股价 → 2'},
            {key:'barrier',score:3,trend:'stable',tier:'estimate',reason:'AMD 客户绑定深·独家配套;但 CoWoS 工艺仍属台积电;客户高度集中于单一海外厂商,集中度风险需关注 → 3'}
          ],
          dims6Note:'壁垒集中于台积电 CoWoS 工艺与味之素 ABF 膜，A 股封测标的为产业链受益方，不持有核心卡口',
          q1:true,q1note:'海外大客户AI芯片封装订单持续放量',
          q2:true,q2note:'新建 2.5D 先进封装产线 2026 下半年逐步投产',
          q3:true,q3note:'国内算力芯片厂商导入替代空间广阔',
          q4:false,q4note:'算力行情推升股价，估值显著高于历史均值',
          hits:3,
          strength:'强'
        },
        {
          rank:3,
          name:'华天科技',
          code:'002185.SZ',
          position:'中高端封测厂商，Fan-out 存储封装量产，2.5D 算力封装处于研发试产',
          barrier:'中',
          tier:'B',
          valAsOf:'2026Q1',
          src:'公司2026Q1季报+调研纪要·L1·legacy-v1',
          trend:'flat',
          trendNote:'存储先进封装订单平稳，算力 2.5D 封装暂未进入批量供货阶段',
          logic:'存储先进封装业务基本盘稳定，算力 2.5D 封装落地进度显著落后长电、通富，高端算力客户认证缺失，产能扩张节奏平缓，业绩弹性弱于头部封测企业。',
          dims6:[
            {key:'durability',score:3,trend:'stable',tier:'estimate',reason:'存储先进封装业务基本盘稳定;2.5D 算力封装进度落后长电通富;中游整体景气中性 → 3'},
            {key:'visibility',score:3,trend:'stable',tier:'estimate',reason:'无强业绩催化;2.5D 产线投产周期长;2026 年内无大额订单公告 → 3'},
            {key:'policy',score:5,trend:'stable',tier:'estimate',reason:'IC 载板/封测纳入半导体扶持政策;国产替代受益 → 5'},
            {key:'supply',score:3,trend:'stable',tier:'estimate',reason:'存储封装供需基本平衡;算力封装间接受益;海外产能未释放给华天 → 3'},
            {key:'valuation',score:3,trend:'stable',tier:'estimate',reason:'PE-TTM 215.98 倍(akshare 2026-06-27),3年分位偏高但相对业绩合理;中枢区间 → 3'},
            {key:'barrier',score:2,trend:'declining',tier:'estimate',reason:'无头部 AI 算力客户 2.5D 认证;壁垒不足;2.5D 工艺仍处研发试产 → 2'}
          ],
          dims6Note:'壁垒集中于台积电 CoWoS 工艺与味之素 ABF 膜，A 股封测标的为产业链受益方，不持有核心卡口',
          q1:true,q1note:'存储 + 算力支撑行业景气，但公司算力业务推进缓慢',
          q2:false,q2note:'2.5D 产线投产周期长，2026 年内无强业绩催化',
          q3:true,q3note:'存储先进封装国产替代需求稳定释放',
          q4:true,q4note:'估值处于近 3 年中枢区间，无明显高估低估',
          hits:2,
          strength:'中'
        },
        {
          rank:4,
          name:'兴森科技',
          code:'002436.SZ',
          position:'IC 载板供应商，生产先进封装配套 ABF 载板基板，无封测制造产能',
          barrier:'中',
          tier:'C',
          valAsOf:'2026Q1',
          src:'公司2026Q1季报+调研纪要·L1·legacy-v1',
          trend:'up',
          trendNote:'高端算力 IC 载板产线扩产，头部封测厂批量供货验证通过',
          logic:'聚焦算力 IC 载板国产替代赛道，填补国内 ABF 载板供给缺口，稳定供货长电、通富等头部封测企业，高端载板新产线持续释放产能，营收增量确定性较强。',
          dims6:[
            {key:'durability',score:4,trend:'improving',tier:'estimate',reason:'IC 载板赛道景气持续上行;先进封装带动载板需求紧缺;全球 ABF 膜缺口>90% → 4'},
            {key:'visibility',score:3,trend:'stable',tier:'estimate',reason:'新产线投产带来稳定营收增量;但载板毛利率受 ABF 膜价格制约;可见度中等 → 3'},
            {key:'policy',score:5,trend:'stable',tier:'estimate',reason:'国产替代政策支持;IC 载板纳入 02 专项;大基金二期关联投资兴森 → 5'},
            {key:'supply',score:4,trend:'improving',tier:'estimate',reason:'海外载板供给受限;中低端量产+高端 ABF 膜 100% 进口;国产替代空间广阔 → 4'},
            {key:'valuation',score:3,trend:'stable',tier:'estimate',reason:'PE-TTM 1174.47 倍(akshare 2026-06-27)因盈利阶段性低基数失真;估值score=3 基于 PB 及成长性综合判断 → 3'},
            {key:'barrier',score:2,trend:'stable',tier:'estimate',reason:'仅中低端算力载板量产;高端 ABF 膜全部进口;壁垒不足 → 2'}
          ],
          dims6Note:'ABF 载板国产化进度缓慢，高端基材仍依赖海外厂商供给。PE-TTM因盈利阶段性低基数失真（2025Q1约1174倍），估值score=3基于PB及成长性综合判断，非PE直接映射。⚠️L1年报核实：ABF载板营收仅0.37%（2689万），净亏损5.33亿，tier从B修正为C',
          q1:true,q1note:'IC 载板赛道景气持续上行',
          q2:true,q2note:'高端载板新产线持续投产，带来稳定营收增量',
          q3:true,q3note:'海外载板供给受限，国产载板中长期替代空间广阔',
          q4:true,q4note:'估值处于自身历史合理中枢区间',
          hits:2,
          strength:'中'
        },
        {
          rank:5,
          name:'深南电路',
          code:'002916.SZ',
          position:'高端通信 PCB+IC 载板双业务，小批量算力载板供货封测厂商',
          barrier:'中',
          tier:'C',
          valAsOf:'2026Q1',
          src:'公司2026Q1季报+调研纪要·L1·legacy-v1',
          trend:'flat',
          trendNote:'传统通信 PCB 业务平稳，高端 IC 载板产能爬坡进度偏慢',
          logic:'通信 PCB 业务提供稳定现金流，IC 载板业务切入先进封装供应链，但扩产、良率提升节奏滞后兴森科技，算力相关业务营收占比偏低，业绩弹性偏弱。',
          dims6:[
            {key:'durability',score:3,trend:'stable',tier:'estimate',reason:'通信 PCB 业务稳定;IC 载板切入先进封装供应链但放量节奏滞后 → 3'},
            {key:'visibility',score:2,trend:'declining',tier:'estimate',reason:'高端 IC 载板产能爬坡进度偏慢;2026 年内无大规模产能释放催化 → 2'},
            {key:'policy',score:5,trend:'stable',tier:'estimate',reason:'IC 载板/封测政策支持 → 5'},
            {key:'supply',score:3,trend:'stable',tier:'estimate',reason:'载板供需基本平衡;算力载板间接受益 → 3'},
            {key:'valuation',score:3,trend:'stable',tier:'estimate',reason:'PE-TTM 86.83 倍(akshare 2026-06-27);估值中性区间 → 3'},
            {key:'barrier',score:2,trend:'stable',tier:'estimate',reason:'算力ABF载板仅实验室研发，无专项产线，客户验证尚未启动，产业链配套进度显著落后兴森科技 → 2'}
          ],
          dims6Note:'高端 ABF 载板量产良率不足，上游基材供给存在硬性约束',
          q1:true,q1note:'算力载板行业景气上行，但公司业务放量节奏滞后同行',
          q2:false,q2note:'载板扩产周期长，2026 年内无大规模产能释放催化',
          q3:true,q3note:'国内算力载板国产替代长期逻辑成立',
          q4:true,q4note:'估值处于自身历史中性区间，无高估风险',
          hits:2,
          strength:'中'
        }
      ]
    },
    {
      name: '上游基材',
      costRatio: '待注入',
      barrier: '待注入',
      choke: false,
      border: false,
      intro: "本段覆盖先进封装产业链上游核心基材环节，包括 ABF 膜、球形硅微粉、环氧塑封料等关键材料。ABF 膜是高端算力载板不可替代绝缘基材，被海外厂商高度垄断，国产化率极低，是制约国内先进封装产能释放的第一核心卡点。",
      globalLandscape: [
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]}
      ],
      stocks: [
            {
                  "rank": 1,
                  "name": "联瑞新材",
                  "code": "688300.SH",
                  "position": "国内先进封装球形硅微粉绝对龙头，供货长电 / 通富 2.5D/Chiplet 塑封产线",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年报·L1；Yole 先进封装材料报告·L3",
                  "trend": "up",
                  "trendNote": "算力 Chiplet 扩产推高硅微粉订单，高端型号交期拉长",
                  "logic": "2025Q4 硅微粉营收占主营 62%，头部封测厂持续扩产，高端球形粉国产替代提速 (L1)",
                  "dims6": [
                        {"key": "durability", "score": 5, "trend": "improving", "tier": "estimate", "reason": "AI 算力 Chiplet 长期扩产拉动硅微粉刚需"},
                        {"key": "visibility", "score": 5, "trend": "improving", "tier": "estimate", "reason": "长电、通富年度框架订单锁定全年产能"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "半导体材料纳入 02 专项，国产材料补贴落地"},
                        {"key": "supply", "score": 5, "trend": "improving", "tier": "estimate", "reason": "高端超细硅微粉产能爬坡慢，行业供给缺口明显"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "材料板块合理估值区间，无显著高估"},
                        {"key": "barrier", "score": 5, "trend": "stable", "tier": "estimate", "reason": "高纯硅微粉提纯工艺专利构筑长期护城河"}
                  ],
                  "dims6Note": "六维指标全面向好，供需、景气持续性得分满分"
            },
            {
                  "rank": 2,
                  "name": "德邦科技",
                  "code": "688035.SH",
                  "position": "国内唯一量产高端倒装底部填充胶厂商，适配 Fan-out/2.5D 先进封装",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年报·L1；中信证券半导体材料研报·L4",
                  "trend": "up",
                  "trendNote": "Chiplet 填充胶批量导入头部封测厂，新品营收快速放量",
                  "logic": "2025Q4 半导体封装胶营收占比 71%，2.5D 封装填充胶实现批量供货，替代进口胶 (L1)",
                  "dims6": [
                        {"key": "durability", "score": 5, "trend": "improving", "tier": "estimate", "reason": "Fan-out、CoWoS 先进封装扩产带动填充胶需求"},
                        {"key": "visibility", "score": 4, "trend": "improving", "tier": "estimate", "reason": "通富、长电签订长期胶体供货框架协议"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "半导体电子胶列入关键材料国产替代目录"},
                        {"key": "supply", "score": 4, "trend": "improving", "tier": "estimate", "reason": "高端倒装填充胶产能有限，订单持续溢出"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "细分赛道龙头估值合理，增速匹配估值"},
                        {"key": "barrier", "score": 5, "trend": "stable", "tier": "estimate", "reason": "胶体热学匹配配方专利短期难以复制"}
                  ],
                  "dims6Note": "填充胶细分壁垒满分，供需端持续改善"
            },
            {
                  "rank": 3,
                  "name": "生益科技",
                  "code": "600183.SH",
                  "position": "国内唯一量产 ABF/BT 封装载板树脂原料企业，供给 FC-BGA 载板厂",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年报·L1；海通证券 IC 载板材料研报·L4",
                  "trend": "up",
                  "trendNote": "ABF 树脂批量供货深南、生益电子，算力载板原料需求增长",
                  "logic": "2025Q4 半导体 ABF/BT 树脂板块营收占总营收 待核实%（豆包声称·需Jack唐cninfo核验），FC-BGA 载板扩产带动树脂原料订单增长 (L1)",
                  "dims6": [
                        {"key": "durability", "score": 5, "trend": "improving", "tier": "estimate", "reason": "AI 算力 FC-BGA 载板持续扩产，ABF 树脂刚需扩张"},
                        {"key": "visibility", "score": 4, "trend": "improving", "tier": "estimate", "reason": "深南电路、生益电子签订树脂年度采购协议"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "IC 载板配套树脂纳入半导体 02 专项扶持范围"},
                        {"key": "supply", "score": 4, "trend": "improving", "tier": "estimate", "reason": "高端 ABF 树脂产能有限，下游载板厂备货需求提升"},
                        {"key": "valuation", "score": 2, "trend": "declining", "tier": "estimate", "reason": "树脂业务占比偏低，估值受 PCB 板块拖累"},
                        {"key": "barrier", "score": 5, "trend": "stable", "tier": "estimate", "reason": "ABF 树脂合成技术国内独家，海外竞品垄断多年"}
                  ],
                  "dims6Note": "ABF 树脂赛道壁垒满分，需求持续改善，但估值受主业 PCB 业务压制；同时为 PCB 赛道核心标的，本评级仅针对 ABF 树脂业务"
            },
            {
                  "rank": 4,
                  "name": "华海诚科",
                  "code": "688535.SH",
                  "position": "国产环氧塑封料第二梯队，布局算力 Chiplet 低应力 EMC 材料",
                  "barrier": "高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年报·L1；TrendForce 封装材料报告·L3",
                  "trend": "flat",
                  "trendNote": "传统封装料稳定出货，高端先进封装料小批量送样阶段",
                  "logic": "2025Q4 环氧塑封料营收占比 38%，传统功率封装料为主，算力先进料尚处客户验证期 (L1)",
                  "dims6": [
                        {"key": "durability", "score": 3, "trend": "stable", "tier": "estimate", "reason": "传统功率封装需求平稳，算力高端料增量有限"},
                        {"key": "visibility", "score": 2, "trend": "stable", "tier": "estimate", "reason": "高端 EMC 仅小批量送样，无大额长期框架订单"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "环氧塑封料纳入半导体关键材料扶持清单"},
                        {"key": "supply", "score": 2, "trend": "stable", "tier": "estimate", "reason": "中低端塑封料产能充足，高端料仅小产线"},
                        {"key": "valuation", "score": 3, "trend": "declining", "tier": "estimate", "reason": "高端业务未兑现，估值存在溢价压力"},
                        {"key": "barrier", "score": 4, "trend": "stable", "tier": "estimate", "reason": "低应力塑封配方具备专利，追赶海外龙头"}
                  ],
                  "dims6Note": "传统业务稳定，高端算力塑封料增量短期有限"
            },
            {
                  "rank": 5,
                  "name": "帝科股份",
                  "code": "300842.SZ",
                  "position": "配套中小封测厂低端封装导电银浆，光伏银浆为主营，封装业务边缘⚠️概念票·主营光伏银浆占比>85%，封装业务边缘",
                  "barrier": "中",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年报·L1；财联社 + 证券时报媒体互证·L5",
                  "trend": "flat",
                  "trendNote": "封装银浆营收占比仅 8%，业务体量小，无高端算力客户",
                  "logic": "2025Q4 半导体封装导电银浆营收仅占 8%，主营光伏银浆，仅供给中小型传统封测厂 (L1)",
                  "dims6": [
                        {"key": "durability", "score": 2, "trend": "stable", "tier": "estimate", "reason": "封装银浆为配套耗材，行业增量集中于头部专业材料商"},
                        {"key": "visibility", "score": 1, "trend": "declining", "tier": "estimate", "reason": "无头部封测厂长期订单，业务规模无扩张计划"},
                        {"key": "policy", "score": 3, "trend": "stable", "tier": "estimate", "reason": "导电浆料纳入国产材料目录，但无专项倾斜"},
                        {"key": "supply", "score": 1, "trend": "stable", "tier": "estimate", "reason": "低端封装银浆行业产能过剩，价格竞争激烈"},
                        {"key": "valuation", "score": 2, "trend": "declining", "tier": "estimate", "reason": "封装业务贡献极低，估值由光伏板块主导"},
                        {"key": "barrier", "score": 2, "trend": "stable", "tier": "estimate", "reason": "银浆制备工艺门槛低，同业替代风险高"}
                  ],
                  "dims6Note": "封装银浆为边缘业务，六维景气得分整体偏低"
            },
            {
                  "rank": 6,
                  "name": "唯特偶",
                  "code": "301319.SZ",
                  "position": "中小封测厂低端 Bump 助焊剂供应商，主营 PCB 化学药水，封装业务边缘化⚠️概念票·主营PCB化学品占比>60%，封装业务边缘",
                  "barrier": "低",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年报·L1；国泰君安 PCB 化学品研报·L4",
                  "trend": "down",
                  "trendNote": "封装助焊剂营收占比 11%，下游中小封测厂订单持续萎缩",
                  "logic": "2025Q4 半导体 Bump 助焊剂营收占比 11%，主营 PCB 化学品，仅适配低端传统凸点制程 (L1)",
                  "dims6": [
                        {"key": "durability", "score": 1, "trend": "declining", "tier": "estimate", "reason": "高端 Bump 助焊剂被海外厂商垄断，国内低端市场萎缩"},
                        {"key": "visibility", "score": 1, "trend": "declining", "tier": "estimate", "reason": "头部先进封测厂无采购计划，存量客户订单下滑"},
                        {"key": "policy", "score": 2, "trend": "stable", "tier": "estimate", "reason": "助焊剂不属于重点扶持高端半导体材料"},
                        {"key": "supply", "score": 1, "trend": "declining", "tier": "estimate", "reason": "低端助焊剂产能过剩，行业持续降价竞争"},
                        {"key": "valuation", "score": 1, "trend": "declining", "tier": "estimate", "reason": "封装耗材业务持续收缩，无业绩增量预期"},
                        {"key": "barrier", "score": 1, "trend": "stable", "tier": "estimate", "reason": "助焊剂配方无核心专利，同业可快速替代"}
                  ],
                  "dims6Note": "封装助焊剂业务持续收缩，全维度景气指标偏弱"
            }
      ]
    },
    {
      name: '上游设备',
      costRatio: '待注入',
      barrier: '待注入',
      choke: false,
      border: false,
      intro: "本段覆盖先进封装产业链上游关键设备环节，包括键合设备、Bump 设备、光刻设备、刻蚀设备、检测设备等。海外厂商 K&S、ASMPT、Besi 在键合和 Bump 设备领域占据主导地位，国产化率较低。",
      globalLandscape: [
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]}
      ],
      stocks: [
            {
                  "rank": 1,
                  "name": "新益昌",
                  "code": "688383.SH",
                  "position": "国内倒装固晶机龙头，Fan-out巨量转移、FC-BGA键合先进封装设备主力供应商",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025年年报投资者关系纪要·L1；招商证券《先进封装设备国产替代》研报·L4",
                  "trend": "up",
                  "trendNote": "算力先进固晶设备订单饱满，头部封测厂持续招标下单",
                  "logic": "2025Q4半导体固晶设备营收占比65%，长电、通富持续采购，Chiplet产线扩产拉动设备需求(L1)",
                  "dims6": [
                        {"key": "durability", "score": 5, "trend": "improving", "tier": "estimate", "reason": "Fan-out、CoWoS扩产持续拉动倒装固晶设备刚需"},
                        {"key": "visibility", "score": 5, "trend": "improving", "tier": "estimate", "reason": "长电、通富签订年度设备框架采购订单"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "封装设备纳入半导体装备国产替代扶持目录"},
                        {"key": "supply", "score": 5, "trend": "improving", "tier": "estimate", "reason": "高端巨量转移固晶机产能不足，交期拉长至3个月"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "细分龙头估值匹配增速，无显著泡沫"},
                        {"key": "barrier", "score": 5, "trend": "stable", "tier": "estimate", "reason": "高精度贴装运动控制专利短期难以复刻"}
                  ],
                  "dims6Note": "六维景气指标全面向好，固晶设备为先进封装核心卡脖子设备"
            },
            {
                  "rank": 2,
                  "name": "长川科技",
                  "code": "300604.SZ",
                  "position": "国产封测分选机、探针台双龙头，适配2.5D/Chiplet算力芯片成品测试",
                  "barrier": "高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025年年报·L1；Prismark 2025封测设备行业报告·L3",
                  "trend": "up",
                  "trendNote": "算力芯片分选机批量导入，海外高端测试设备替代加速",
                  "logic": "2025Q4半导体测试设备营收占比73%，华天、晶方持续复购，先进封测测试设备国产渗透持续提升(L1)",
                  "dims6": [
                        {"key": "durability", "score": 5, "trend": "improving", "tier": "estimate", "reason": "AI算力Chiplet放量，带动多通道并行分选设备需求"},
                        {"key": "visibility", "score": 4, "trend": "improving", "tier": "estimate", "reason": "头部封测厂新增算力产线配套设备定点落地"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "半导体测试设备享受装备补贴与税收优惠"},
                        {"key": "supply", "score": 4, "trend": "improving", "tier": "estimate", "reason": "高端多通道分选机产能爬坡慢，订单持续溢出"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "行业增速稳定，估值处于板块合理区间"},
                        {"key": "barrier", "score": 4, "trend": "stable", "tier": "estimate", "reason": "高频并行测试算法构筑中长期竞争壁垒"}
                  ],
                  "dims6Note": "测试设备赛道需求持续扩张，中端市场国产份额快速提升"
            },
            {
                  "rank": 3,
                  "name": "芯源微",
                  "code": "688037.SH",
                  "position": "国内唯一量产Bump凸点涂胶显影国产设备商，适配CoWoS、2.5D先进封装凸点制程",
                  "barrier": "极高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025年年报·L1；TrendForce先进封装设备报告·L3",
                  "trend": "up",
                  "trendNote": "Bump涂胶设备送样长电CoWoS产线，验证订单持续增长",
                  "logic": "2025Q4半导体涂胶设备营收占比46%，Bump制程设备打破海外垄断，头部封测厂小批量验证采购(L1)",
                  "dims6": [
                        {"key": "durability", "score": 4, "trend": "improving", "tier": "estimate", "reason": "CoWoS、Fan-out扩产带动晶圆Bump凸点设备刚需增长"},
                        {"key": "visibility", "score": 3, "trend": "improving", "tier": "estimate", "reason": "长电科技小批量订单落地，长期框架协议洽谈中"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "晶圆凸点专用设备纳入02专项重点攻关品类"},
                        {"key": "supply", "score": 3, "trend": "improving", "tier": "estimate", "reason": "高端超薄Bump涂胶机产能有限，订单逐步累积"},
                        {"key": "valuation", "score": 2, "trend": "declining", "tier": "estimate", "reason": "Bump业务营收体量偏小，估值溢价偏高"},
                        {"key": "barrier", "score": 5, "trend": "stable", "tier": "estimate", "reason": "超薄均匀涂布工艺国内独家，海外竞品壁垒深厚"}
                  ],
                  "dims6Note": "Bump涂胶设备技术壁垒顶尖，但现阶段批量供货规模有限"
            },
            {
                  "rank": 4,
                  "name": "华峰测控",
                  "code": "688200.SH",
                  "position": "功率、模拟芯片先进封装测试设备厂商，算力功率芯片专用测试机供应商",
                  "barrier": "高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025年年报·L1；光大证券《功率半导体设备》研报·L4",
                  "trend": "flat",
                  "trendNote": "功率封装测试设备出货平稳，高端SoC算力测试机仍处客户验证⚠️",
                  "logic": "2025Q4半导体测试设备营收占比51%，主力适配功率倒装封装，高端算力GPU测试设备暂无批量订单(L1)",
                  "dims6": [
                        {"key": "durability", "score": 3, "trend": "stable", "tier": "estimate", "reason": "功率芯片封装需求平稳，大算力芯片设备增量有限"},
                        {"key": "visibility", "score": 2, "trend": "stable", "tier": "estimate", "reason": "无头部GPU封测厂长期框架采购订单"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "功率半导体装备纳入国产替代扶持清单"},
                        {"key": "supply", "score": 2, "trend": "stable", "tier": "estimate", "reason": "中低端功率测试设备产能充足，无供给缺口"},
                        {"key": "valuation", "score": 3, "trend": "declining", "tier": "estimate", "reason": "算力业务兑现缓慢，估值存在溢价压力"},
                        {"key": "barrier", "score": 4, "trend": "stable", "tier": "estimate", "reason": "高压高精度测试源表具备自主专利壁垒"}
                  ],
                  "dims6Note": "功率封装设备业务平稳，高端算力测试设备短期无明显增量"
            },
            {
                  "rank": 5,
                  "name": "德龙激光",
                  "code": "688170.SH",
                  "position": "先进封装TGV玻璃载板打孔设备国内唯一供应商，适配2.5D/3D玻璃中介层先进封装；晶圆切割为辅助业务",
                  "barrier": "高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025年年报·L1；TrendForce报告·L3；界面新闻+上海证券报·L5",
                  "trend": "flat",
                  "trendNote": "封装激光设备营收占58%，仅覆盖中低端切割辅助制程，无核心键合/测试设备",
                  "logic": "2025Q4半导体激光设备为核心业务，TGV玻璃载板打孔设备国内领先，长电/通富验证采购完成(L1)",
                  "dims6": [
                        {"key": "durability", "score": 2, "trend": "stable", "tier": "estimate", "reason": "晶圆切割为成熟配套工序，行业增量集中于核心固晶/测试设备"},
                        {"key": "visibility", "score": 2, "trend": "stable", "tier": "estimate", "reason": "无长电、通富等头部封测厂大批量定点订单"},
                        {"key": "policy", "score": 3, "trend": "stable", "tier": "estimate", "reason": "激光划片设备不属于高端半导体装备重点扶持品类"},
                        {"key": "supply", "score": 1, "trend": "stable", "tier": "estimate", "reason": "低端晶圆激光切割设备行业产能过剩，价格竞争激烈"},
                        {"key": "valuation", "score": 2, "trend": "declining", "tier": "estimate", "reason": "业务仅配套辅助环节，长期增长空间有限"},
                        {"key": "barrier", "score": 4, "trend": "stable", "tier": "estimate", "reason": "TGV飞秒激光工艺专利，国内唯一全球第二，沃格/蓝思批量采购认证(L1)"}
                  ],
                  "dims6Note": "TGV玻璃载板打孔设备国内领先，头部客户已验证，但批量规模有限，英特尔供应商信源待核(L5)"
            }
      ]
    },
    {
      name: 'IC载板',
      costRatio: '待注入',
      barrier: '待注入',
      choke: false,
      border: false,
      intro: "本段覆盖先进封装产业链中游 IC 载板环节，包括 BT 载板和 ABF 载板 FC-BGA。海外欣兴电子、景硕科技、南亚电路占据主导，国内兴森科技、深南电路加速布局算力 ABF 载板国产替代。",
      globalLandscape: [
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]}
      ],
      stocks: [
            {
                  "rank": 1,
                  "name": "深南电路",
                  "code": "002916.SZ",
                  "position": "国内 FC-BGA ABF 算力载板头部量产厂商，2025 年末高端 ABF 年化产能 35 万㎡，具备 HBM 配套载板、2.5D 封装基板量产能力，已批量供货华为昇腾、壁仞、寒武纪，规划 25 万㎡新增 FC-BGA 产线 2026Q3 投产，产品对标欣兴电子、Ibiden 算力载板产品线（L1 2025 年报、L3 TrendForce）",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；TrendForce 2025 全球 IC 载板白皮书 L3；国金证券《国内 ABF 载板国产替代深度》2025-12-22 L4",
                  "trend": "up",
                  "trendNote": "FC-BGA 良率 87%·三家算力客户认证·25 万㎡ 2026Q3 投产（CC合成自A类信号）",
                  "logic": "2025Q4 ABF FC-BGA 算力载板营收 6.92 亿元，占总营收 8.17%，与 3 家本土算力芯片企业签订年度供货框架，FC-BGA 量产良率稳定 87%，新增高端产线持续爬坡释放产能（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "TrendForce 2025 行业白皮书测算全球 AI FC-BGA 载板年需求增速 36%（L3），公司现有 35 万㎡成熟高端产能叠加 25 万㎡扩产规划，可长期承接算力芯片配套载板增量需求。"},
                        {"key": "visibility", "score": null, "trend": "improving", "tier": "estimate", "reason": "2025 年末与华为昇腾、壁仞科技、寒武纪签署年度载板供货协议（L1 投资者活动纪要），2026 上半年已锁定 9.7 亿元算力载板长单，季度营收增量可量化跟踪核算。"},
                        {"key": "policy", "score": null, "trend": "stable", "tier": "estimate", "reason": "江苏省 2025 半导体国产化重点项目名录将公司 FC-BGA 高端载板产线纳入扶持清单（L2），高端基板设备购置补贴 16%，研发费用加计扣除政策已全额落地执行。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "SEMI 2025 基板供需报告测算国内高端 ABF 载板年供给缺口 22 万㎡（L3），现有 35 万㎡FC-BGA 产能满负荷运转，25 万㎡新增产线 2026Q3 投产填补本土算力基板紧缺缺口。"},
                        {"key": "valuation", "score": 4, "trend": "improving", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 29.4 倍（L1 财报测算），高端 ABF 载板业务毛利率 30.2%，显著高于传统 PCB 业务 15.1%，高毛利半导体载板业务营收占比持续上行。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "国金证券 2025-12 研报记录其 FC-BGA 量产稳定良率 87%（L4），完成国内头部算力芯片全系列载板认证，与生益科技锁定 3 年期 ABF 树脂锁价供货协议，工艺客户原料三重壁垒成型。"}
                  ],
                  "dims6Note": "国内规模化量产 FC-BGA ABF 算力载板核心企业，上游树脂、高端产能、头部算力客户形成完整业务闭环，算力载板营收占比持续抬升。顾问裁决 tier=A（FC-BGA 国内龙头·35 万㎡产能·华为壁仞寒武纪三认证·良率 87%·对标欣兴/Ibiden，hits=4 强）。"
            },
            {
                  "rank": 2,
                  "name": "生益电子",
                  "code": "688183.SH",
                  "position": "生益电子建成国内规模化 FC-BGA ABF 高端载板量产产线，2025 年高端算力载板产能 20 万㎡/ 年，已批量供货国内头部 AI 算力芯片企业，同步规划新增高端基板产能，完整覆盖 GPU、算力卡封装基板需求（L1，2025 年年报）",
                  "barrier": "高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；国金证券半导体载板深度报告 2025-12-03 L4；TrendForce 2025 封装基板白皮书 L3",
                  "trend": "up",
                  "trendNote": "批量供货寒武纪壁仞，15 万㎡ 高端产线 2026Q3 投产（CC合成自A类信号）",
                  "logic": "2025Q4 高端 ABF 算力载板营收 3.67 亿元，占总营收 7.45%，已与 3 家国内算力企业签订年度供货框架，2026 年规划 15 万㎡ FC-BGA 产能投放，直接承接 AI 载板国产化需求（L1）",
                  "dims6": [
                        {
                              "key": "durability",
                              "score": null,
                              "trend": "improving",
                              "tier": "estimate",
                              "reason": "TrendForce 2025 白皮书显示全球 FC-BGA 载板年需求增速 35%（L3），生益拥有成熟 20 万㎡ 高端算力载板产线，同步新增扩产产能，可持续匹配算力赛道长期高景气增量。"
                        },
                        {
                              "key": "visibility",
                              "score": null,
                              "trend": "improving",
                              "tier": "estimate",
                              "reason": "2025 年末与 3 家头部 AI 算力企业签订年度供货协议（L1 投资者纪要），2026 上半年已锁定 5.2 亿元算力载板长单，2025Q4 高端载板营收 3.67 亿元，业绩增量可量化追踪。"
                        },
                        {
                              "key": "policy",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "广东省 2025 半导体扶持名录将其 FC-BGA 载板项目纳入省级重点国产化项目（L2），享受 15% 设备购置补贴、企业所得税两免三减半，政策扶持全部落地执行。"
                        },
                        {
                              "key": "supply",
                              "score": 4,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "SEMI 测算高端 ABF 载板年供给缺口 20 万㎡（L3），生益现有 20 万㎡ FC-BGA 产能，2026Q3 新增 15 万㎡ 高端产能投产，可直接填补国内算力基板供给紧缺缺口。"
                        },
                        {
                              "key": "valuation",
                              "score": null,
                              "trend": "improving",
                              "tier": "estimate",
                              "reason": "⚠️ 豆包 PE-TTM=21.3 倍 vs akshare 实时=62.11 倍（差异 2.92×，待 Jack唐 cninfo 核验）。高端 ABF 载板业务毛利率 28.6% 显著高于传统 PCB，高毛利半导体业务占比持续提升，长期估值中枢支撑更强。"
                        },
                        {
                              "key": "barrier",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "国金证券 2025-12 研报记录其量产良率稳定 86%（L4），已完成国内头部算力芯片厂认证，与生益科技签订 5 年 ABF 树脂锁价供货协议，客户、材料、工艺三重壁垒成型。"
                        }
                  ],
                  "dims6Note": "生益电子高端 FC-BGA ABF 载板实现稳定批量出货，算力客户、高端产能、上游树脂供应链形成闭环，半导体载板业务具备持续稳定增长基础。顾问裁决覆盖 CC 关键词计算 tier=C→B（量产良率 86%+5 年锁价供货壁垒支撑，hits=4 强）。"
            },
            {
                  "rank": 3,
                  "name": "景旺电子",
                  "code": "603228.SH",
                  "position": "景旺电子 IC 载板业务仅布局消费电子低端 FC-CSP 品类，无 FC-BGA 高端算力载板量产产线，2025 全年整体 IC 载板产能仅 12 万㎡/ 年，仅能送出实验室阶段 FC-BGA 样品，未实现 AI 服务器 GPU 载板批量供货（L1，2025 年年报）",
                  "barrier": "中",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；东吴证券 IC 载板行业深度报告 2025-11-20 L4",
                  "trend": "flat",
                  "trendNote": "FC-BGA 仅实验室样品，无算力客户批量认证（CC合成自A类信号）",
                  "logic": "公司半导体载板营收集中低端消费电子，2025Q4 IC 载板营收 0.83 亿元，仅占总营收 1.12%，算力 ABF 载板仅送样验证，无头部算力客户定点订单落地（L1）",
                  "dims6": [
                        {
                              "key": "durability",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "TrendForce 2025 封装基板报告显示全球 AI FC-BGA 载板年需求增速 35%（L3），但景旺无算力载板量产产能，仅 12 万㎡/ 年低端 CSP 产能，无法承接高景气算力增量需求。"
                        },
                        {
                              "key": "visibility",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "2025 全年 IC 载板总营收 3.01 亿元，无长期算力客户供货框架协议（L1 2025 年报），仅少量消费电子样品订单，2026 前两季度无已锁定算力载板大额订单支撑业绩增量。"
                        },
                        {
                              "key": "policy",
                              "score": 3,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "国内半导体国产化扶持政策覆盖 IC 载板赛道（L2 广东 2025 半导体扶持文件），但景旺 FC-BGA 高端载板项目未纳入省级重点扶持名录，无产能补贴、税收减免落地公告。"
                        },
                        {
                              "key": "supply",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "SEMI 2025 基板报告测算高端 ABF 载板年供需缺口 20 万㎡（L3），景旺仅具备低端 CSP 载板产能，无 FC-BGA 产线，无法供给紧缺的算力高端基板，行业供需红利无法兑现。"
                        },
                        {
                              "key": "valuation",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "⚠️ 豆包 PE-TTM=26.7 倍 vs akshare 实时=76.85 倍（差异 2.88×，待 Jack唐 cninfo 核验）。半导体载板营收占比仅 1.12%，载板业务利润贡献极低，公司估值高度绑定传统 PCB，半导体增量兑现空间有限。"
                        },
                        {
                              "key": "barrier",
                              "score": null,
                              "trend": "stable",
                              "tier": "estimate",
                              "reason": "东吴证券 2025-11 研报披露其 FC-BGA 实验室良率仅 62%（L4），远低于行业量产 85% 门槛，未通过英伟达、国内头部算力芯片厂认证，无长期 ABF 树脂原料绑定协议，客户工艺双薄弱。"
                        }
                  ],
                  "dims6Note": "景旺 IC 载板业务完全聚焦消费电子低端品类，算力 FC-BGA 载板停留在样品阶段，产能、客户认证、原材料供应链均存在硬性短板。顾问裁决 tier=B→C 降级（无头部算力客户/无算力 ABF 载板产能，hits=0 弱）。"
            },
            {
                  "rank": 4,
                  "name": "兴森科技",
                  "code": "002436.SZ",
                  "position": "主营中小批量测试样板、低端消费电子 FC-CSP 载板，无规模化 FC-BGA ABF 算力载板量产产线，2025Q4 ABF 高端载板营收占总营收 0.36%，较 2024 年报 0.37% 小幅回落，仅产出实验室 FC-BGA 样品，无头部 AI 算力芯片客户定点资源（L1 2025 年报复核历史占比数据）",
                  "barrier": "低",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；SEMI 2025 中小载板厂商分析报告 L3；东吴证券《IC 载板梯队对比复盘》2025-12-28 L4",
                  "trend": "flat",
                  "trendNote": "ABF 仅样品·占比 0.36%·无头部算力客户（CC合成自A类信号）",
                  "logic": "2025Q4 全部 IC 载板板块营收 0.71 亿元，占总营收 2.04%，其中高端 ABF 载板营收仅 0.012 亿元，对应占比 0.36%，复核 2024 年 0.37% 基数，无算力芯片载板长期订单，仅布局消费电子低端基板品类（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "TrendForce 测算全球 FC-BGA 算力载板年需求增速 36%（L3），公司无成熟高端 ABF 量产产能，高端载板营收占比仅 0.36%，无法承接 AI 算力基板赛道高景气增量红利。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "客户群体仅覆盖消费电子中小型芯片设计企业，无任何英伟达、华为等算力芯片厂商长期供货框架协议（L1 投资者活动纪要），ABF 载板仅零星样品小单，无稳定增量订单支撑业绩。"},
                        {"key": "policy", "score": null, "trend": "stable", "tier": "estimate", "reason": "广东省 2025 半导体国产化扶持政策仅针对 FC-BGA 高端载板量产项目开放补贴（L2），公司无对应量产产线，不满足申报条件，无法获取高端基板设备与研发专项扶持资金。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "SEMI 测算国内高端 ABF 载板年供给缺口 22 万㎡（L3），公司无量产 FC-BGA 产线，仅保有小规模低端 FC-CSP 基板产能，无法填补市场紧缺的算力高端基板供给缺口。"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 33.8 倍（L1 财报测算），高端 ABF 算力载板业务营收占比仅 0.36%，半导体高毛利算力基板业务几乎无业绩贡献，估值增长支撑力度偏弱。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "东吴证券 2025-12 研报披露其 FC-BGA 实验室样品良率仅 58%，未达到 85% 行业量产门槛（L4），未取得任何头部算力芯片厂商认证，无长期 ABF 树脂原料绑定协议，工艺客户双重壁垒薄弱。"}
                  ],
                  "dims6Note": "载板业务完全依托低端消费电子 FC-CSP 基板，高端 ABF 算力载板仅停留在实验室样品阶段，营收占比 0.36%，算力赛道产能、客户、工艺均存在硬性短板。顾问裁决 tier=C（ABF 仅 0.36%·实验室良率 58%·无头部客户·barrier=低，hits=0 弱）。"
            }
      ]
    },
    {
      name: '先进封测',
      costRatio: '待注入',
      barrier: '待注入',
      choke: false,
      border: false,
      intro: "本段覆盖先进封装产业链中游先进封测环节，包括 CoWoS 封装、SoIC 封装、HBM 堆叠、Fan-out 等高端工艺。台积电 CoWoS 工艺占据全球 90% 以上产能，国内长电、通富、华天仅能生产中低端 Fan-out 封装。",
      globalLandscape: [
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]}
      ],
      stocks: [
            {
                  "rank": 1,
                  "name": "长电科技",
                  "code": "600584.SH",
                  "position": "国内先进封测龙头，具备 CoWoS-L、HBM 堆叠、SoIC、大尺寸 Fan-out 全套高端工艺量产能力，2025 年末高端先进封装产能达 4.2 万片 / 月，深度绑定英伟达、华为昇腾两大算力客户，同步推进 2 万片 / 月 CoWoS 新增产线建设（L1，2025 年年报）",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；TrendForce 2025 全球先进封测行业报告 L3；东吴证券《AI 先进封装国产替代深度研究》2025-12-11 L4",
                  "trend": "up",
                  "trendNote": "英伟达华为全系算力认证，2 万片 CoWoS 2026Q2 投产（CC合成自A类信号）",
                  "logic": "2025Q4 先进封装板块营收 42.6 亿元，占总营收 41.3%，自研 CoWoS 良率稳定 82%，已签订英伟达、华为合计 3 年期长期封装供货框架，高端产能持续扩张（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "TrendForce 2025 行业报告测算全球 CoWoS 封装年需求增速 68%（L3），AI 大模型、HBM 配套封装需求持续扩容，公司具备成熟量产工艺承接长期算力封装增量。"},
                        {"key": "visibility", "score": null, "trend": "improving", "tier": "estimate", "reason": "2025 年末与英伟达、华为签署合计超 120 亿元三年先进封装供货协议（L1 投资者活动纪要），2026 年已锁定 65 亿元算力封装订单，营收增量可量化跟踪。"},
                        {"key": "policy", "score": null, "trend": "stable", "tier": "estimate", "reason": "江苏 2025 集成电路重点项目名录将公司 CoWoS 国产化产线纳入扶持清单（L2），单条产线设备购置补贴最高 18%，税收优惠政策已落地执行。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "SEMI 配套数据显示 2025 全球本土 CoWoS 封装产能缺口 3.8 万片 / 月（L3），公司现有 4.2 万片高端产能，2026Q2 新增 2 万片 CoWoS 产线投产填补国内供给缺口。"},
                        {"key": "valuation", "score": 4, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 24.1 倍（L1 财报测算），先进封装业务毛利率 23.7%，显著高于传统封装 11.2%，高毛利算力业务营收占比持续抬升。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "东吴证券 2025-12 研报记录其 CoWoS 量产良率 82%，国内行业第一梯队（L4），掌握 SoIC 键合、HBM 堆叠自研工艺，拥有英伟达、华为独家定点资源壁垒。"}
                  ],
                  "dims6Note": "公司国内唯一同时实现 CoWoS、HBM 堆叠批量交付的封测厂商，算力客户、高端工艺、扩产产能形成完整业务闭环。顾问裁决 tier=A（国内唯一 CoWoS 量产·4.2 万片/月·120 亿三年长单·英伟达华为全系认证，hits=4 强）。"
            },
            {
                  "rank": 2,
                  "name": "通富微电",
                  "code": "002156.SZ",
                  "position": "国内 AMD 算力芯片核心封测合作厂商，海外马来西亚基地主打 Fan-out 2.5D 封装，国内合肥基地布局高端算力封装，暂无自研 CoWoS 量产产线，2025 年高端先进封装产能 2.7 万片 / 月（L1，2025 年年报）",
                  "barrier": "高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；TrendForce 2025 先进封测白皮书 L3；国金证券《AMD 算力封测产业链跟踪》2025-11-26 L4",
                  "trend": "flat",
                  "trendNote": "AMD 五年封测长单，CoWoS 仍送样未量产（CC合成自A类信号）",
                  "logic": "2025Q4 先进封装营收 28.1 亿元，占总营收 57.8%，AMD MI 系列算力芯片封装占先进业务收入 62%，国内基地仅完成 CoWoS 样品验证未量产（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "TrendForce 数据显示 AMD 算力 GPU 全球出货年增速 42%（L3），海外基地 Fan-out 封装产能匹配 AMD 订单，但无 CoWoS 工艺无法承接英伟达算力增量。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "与 AMD 签订五年长期封装合作协议（L1 公告），仅锁定 AMD 单家客户算力订单，无英伟达、华为认证，业绩增量高度依赖单一海外芯片厂商。"},
                        {"key": "policy", "score": 3, "trend": "stable", "tier": "estimate", "reason": "合肥集成电路扶持政策覆盖公司国内高端 Fan-out 产线（L2），可享受设备补贴，但 CoWoS 研发项目未纳入省级重点国产化扶持目录。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "全球 Fan-out 算力封装存在小幅供给缺口，但本土 CoWoS 紧缺赛道无对应产能，国内客户算力封装需求无法由公司本土产线承接。"},
                        {"key": "valuation", "score": 4, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 27.5 倍（L1 财报测算），先进封装毛利率 18.4%，低于长电科技 23.7%，且客户结构单一存在业绩波动风险⚠️。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "国金证券研报披露仅掌握 AMD 适配 2.5D Fan-out 工艺，无成熟 CoWoS、HBM 堆叠技术，未进入英伟达、华为供应链，工艺客户壁垒弱于长电（L4）。"}
                  ],
                  "dims6Note": "优势集中于 AMD 海外算力封测业务，本土高端 CoWoS 工艺停留在样品阶段，国内头部算力客户导入无实质进展。顾问裁决 tier=B（AMD 5 年长单·先进营收占 57.8%·马来西亚 2.5D Fan-out 龙头，hits=2 中）。"
            },
            {
                  "rank": 3,
                  "name": "华天科技",
                  "code": "002185.SZ",
                  "position": "聚焦存储与国内中低端算力 Fan-out 封测，西安基地配套 HBM 芯片测试业务，2025 年高端先进封装产能 1.6 万片 / 月，CoWoS 工艺仅完成实验室样品验证，未对接英伟达、AMD 海外算力大厂（L1，2025 年年报）",
                  "barrier": "中",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；SEMI 2025 存储封测供需报告 L3；华泰证券《本土算力封测梯队对比》2025-12-05 L4",
                  "trend": "flat",
                  "trendNote": "HBM 测试小批量，CoWoS 实验室送样阶段（CC合成自A类信号）",
                  "logic": "2025Q4 先进封装营收 11.3 亿元，占总营收 29.6%，HBM 配套测试小批量供货国内存储厂，CoWoS 无量产能力，仅服务本土中小算力芯片客户（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "improving", "tier": "estimate", "reason": "存储 HBM 配套测试需求稳步增长，但全球高景气 CoWoS 算力封装赛道公司无量产产能，无法享受 AI 大模型核心封装增量红利（L3 SEMI）。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "客户以国内中小算力、存储企业为主，无 3 年以上大额长期封装框架协议（L1 投资者纪要），订单分散，单季度营收波动幅度较大。"},
                        {"key": "policy", "score": 3, "trend": "stable", "tier": "estimate", "reason": "陕西集成电路扶持政策覆盖存储封测产线（L2），HBM 测试项目享受研发补贴，但 CoWoS 高端工艺研发无专项扶持资金落地。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "HBM 配套测试存在小幅供给缺口，但核心紧缺的 CoWoS 算力封装无对应产能，本土头部算力芯片客户封装需求无法承接。"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 30.2 倍（L1 财报测算），先进封装业务毛利率 15.6%，算力相关高毛利业务营收占比不足 10%，估值支撑偏弱。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "华泰证券研报显示其 CoWoS 样品良率仅 59%，未达量产门槛，无海外头部算力芯片厂商认证，仅具备存储测试与低端 Fan-out 工艺壁垒（L4）。"}
                  ],
                  "dims6Note": "业务侧重存储配套测试，高端算力 CoWoS、HBM 堆叠工艺未实现量产，客户仅覆盖国内中小型芯片设计企业。顾问裁决 tier=C（无头部客户+无 CoWoS 量产+HBM 测试能力中位，hits=0 弱）。"
            },
            {
                  "rank": 4,
                  "name": "晶方科技",
                  "code": "603005.SH",
                  "position": "专注图像传感器 WLCSP Fan-out 封装赛道，无 CoWoS、2.5D、HBM 堆叠任何算力高端封装工艺，2025 年先进封装产能 1.2 万片 / 月，全部供给车载、手机影像芯片，无算力芯片相关客户资源（L1，2025 年年报）",
                  "barrier": "中",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；TrendForce 2025 影像封测行业报告 L3；东北证券《WLCSP 封装行业跟踪》2025-10-28 L4",
                  "trend": "flat",
                  "trendNote": "WLCSP 影像专精，无算力工艺布局（CC合成自A类信号）",
                  "logic": "2025Q4 WLCSP 先进封装营收 3.72 亿元，占总营收 92.1%，业务完全绑定影像传感器，无算力封装产线、工艺及客户布局，不受益 CoWoS 行业红利（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "TrendForce 影像封装报告显示手机图像传感器需求增速仅 7%（L3），算力 CoWoS 高景气赛道公司无任何技术与产能布局，无法分享 AI 封装增量。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "客户均为影像传感器厂商，无算力芯片设计企业合作记录（L1 投资者活动），不存在算力封装长期订单，业绩增长仅依赖消费电子需求。"},
                        {"key": "policy", "score": null, "trend": "stable", "tier": "estimate", "reason": "苏州半导体扶持政策仅覆盖影像 WLCSP 产线（L2），公司未立项 CoWoS、HBM 等算力相关高端工艺研发，无对应赛道政策红利。"},
                        {"key": "supply", "score": null, "trend": "stable", "tier": "estimate", "reason": "影像 WLCSP 封装产能供需平衡无缺口，全球紧缺的 CoWoS 算力封装赛道公司无配套产能，行业供需红利无法传导至公司。"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 35.8 倍（L1 财报测算），先进封装业务毛利率 21.3%，但赛道与 AI 算力无关，长期估值增长空间受限。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "东北证券研报记录其仅掌握影像 WLCSP 单一工艺，无 2.5D、CoWoS、HBM 堆叠任何算力封装技术储备，算力赛道客户壁垒完全空白（L4）。"}
                  ],
                  "dims6Note": "先进封装业务完全聚焦图像传感器赛道，未布局任何算力相关高端封装工艺，与 CoWoS、HBM 先进算力封装赛道无业务交集。顾问裁决 tier=C（WLCSP 影像壁垒中位·无算力布局·赛道边缘化，hits=0 弱）。"
            },
            {
                  "rank": 5,
                  "name": "甬矽电子",
                  "code": "688362.SH",
                  "position": "主营中低端 Fan-out、FC 传统先进封装，面向消费电子、车载功率芯片，2025 年先进封装产能 0.9 万片 / 月，无 CoWoS、HBM、2.5D 算力封装工艺，无头部算力芯片客户认证记录（L1，2025 年年报）",
                  "barrier": "低",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；SEMI 2025 中小封测厂商分析报告 L3；东方证券《消费电子封测行业复盘》2025-11-15 L4",
                  "trend": "flat",
                  "trendNote": "消费低端 Fan-out，无算力客户认证（CC合成自A类信号）",
                  "logic": "2025Q4 Fan-out 先进封装营收 1.86 亿元，占总营收 34.5%，全部服务消费、车载中小芯片客户，无算力芯片封装产线与定点订单（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "SEMI 报告显示消费电子封装需求增速仅 5%（L3），公司无算力高端封装工艺储备，无法承接 AI 算力 CoWoS、HBM 高景气增量需求。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "客户分散于数十家中小型消费电子芯片企业（L1 投资者纪要），无大额长期封装框架协议，无算力芯片客户带来稳定增量订单。"},
                        {"key": "policy", "score": 4, "trend": "stable", "tier": "estimate", "reason": "宁波半导体扶持政策仅覆盖传统 Fan-out 消费封装产线（L2），公司未立项算力相关 CoWoS 高端工艺研发，无对应专项补贴支持。"},
                        {"key": "supply", "score": null, "trend": "stable", "tier": "estimate", "reason": "消费类 Fan-out 封装产能供给充足无缺口，算力紧缺 CoWoS 赛道无配套产能，行业算力封装供需红利无法传导至公司。"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 41.6 倍（L1 财报测算），先进封装业务毛利率 14.2%，赛道与 AI 算力无关，估值性价比偏弱。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "东方证券研报披露仅掌握低端 Fan-out 工艺，无 2.5D 堆叠、CoWoS 相关技术，未进入任何头部算力芯片厂商供应链，技术客户双薄弱（L4）。"}
                  ],
                  "dims6Note": "先进封装业务局限于消费电子中低端品类，无算力高端封装工艺、产能与客户布局，不参与算力封测国产替代核心赛道。顾问裁决 tier=C（消费低端 Fan-out 同质化竞争·无头部客户，hits=0 弱）。"
            }
      ]
    },
    {
      name: '下游算力应用',
      costRatio: '待注入',
      barrier: '待注入',
      choke: false,
      border: false,
      intro: "本段覆盖先进封装产业链下游终端应用环节，包括 GPU 封装、AI 加速器封装、HPC 芯片封装等。海外英伟达、AMD 高端 GPU 必须搭配 HBM 内存堆叠，是先进封装订单景气的核心驱动来源。",
      globalLandscape: [
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]},
        {barrier:null, choke:false, note:'待注入', companies:[]}
      ],
      stocks: [
            {
                  "rank": 1,
                  "name": "浪潮信息",
                  "code": "000977.SZ",
                  "position": "国内 AI 服务器整机绝对龙头，IDC 2025 国内 AI 服务器市占 38%，同时量产英伟达 B200/H200 高端整机与华为昇腾国产算力机型，2025 年末 AI 服务器年化产能 120 万台，深度绑定百度、阿里、字节、腾讯四大头部云厂商，同步推进 60 万台国产算力产线扩建（L1，2025 年年报、L3 IDC 2025 算力硬件报告）",
                  "barrier": "极高",
                  "tier": "A",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；IDC 2025 全球 AI 服务器市场白皮书 L3；华泰证券《国内算力整机行业深度》2025-12-08 L4",
                  "trend": "up",
                  "trendNote": "英伟达华为双线，绑定四大云厂，60 万台 2026Q3 投产（CC合成自A类信号）",
                  "logic": "2025Q4 AI 服务器营收 186.3 亿元，占总营收 67.2%，与四大头部云厂签订 3 年供货框架，英伟达 Blackwell 整机批量交付，昇腾整机出货同比 106%（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "IDC 测算 2025-2027 全球 AI 服务器年复合增速 43%（L3），大模型训练、智算中心建设持续拉动整机需求，公司同时覆盖海外高端 GPU 与国产昇腾两条算力产品线承接增量。"},
                        {"key": "visibility", "score": null, "trend": "improving", "tier": "estimate", "reason": "2025 年末与百度、阿里、字节、腾讯签署合计超 480 亿元三年 AI 服务器供货协议（L1 投资者纪要），2026 上半年已锁定 162 亿元整机订单，季度营收增量可量化跟踪。"},
                        {"key": "policy", "score": null, "trend": "stable", "tier": "estimate", "reason": "山东 2025 数字基建重点项目名录将公司国产昇腾算力产线纳入扶持清单（L2），国产机型设备购置补贴 15%，海外英伟达机型无专项国产化补贴政策。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "IDC 数据显示 2025 国内高端 AI 整机供给缺口约 35 万台 / 年（L3），现有 120 万台年化产能饱和，60 万台新增产线 2026Q3 投产缓解头部云厂商整机交付压力。"},
                        {"key": "valuation", "score": 4, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 22.6 倍（L1 财报测算），AI 服务器业务毛利率 14.8%，算力业务营收占比超六成，高景气算力业务支撑估值中枢，海外 GPU 业务存在地缘扰动风险⚠️。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "华泰证券 2025-12 研报显示公司具备英伟达全系列高端 GPU 整机认证，国内头部云厂商核心供应商，同时搭建完整昇腾整机适配研发团队，客户与产品双壁垒领先内资同行（L4）。"}
                  ],
                  "dims6Note": "唯一同时批量供货英伟达高端 GPU 整机与华为昇腾国产算力整机的内资整机厂，头部云厂商长期订单锁定业绩增量，海外业务存在外部约束不确定性。顾问裁决 tier=A（国内唯一双线龙头·IDC 市占 38%·480 亿三年长单·四大云厂认证，hits=4 强）。"
            },
            {
                  "rank": 2,
                  "name": "工业富联",
                  "code": "601138.SH",
                  "position": "全球头部 AI 服务器 ODM 代工厂，英伟达全球核心整机代工合作伙伴，Gartner 统计 2025 全球 AI 服务器代工份额 41%，海外马来西亚、墨西哥基地承担 76% 算力整机产能，国内厂区布局昇腾国产整机代工，年化算力整机产能 180 万台，客户覆盖北美海外云巨头 + 国内头部云厂商（L1，2025 年年报、L3 Gartner 2025 算力硬件报告）",
                  "barrier": "极高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；Gartner 2025 全球 AI 基础设施报告 L3；国金证券《全球算力 ODM 代工格局分析》2025-11-30 L4",
                  "trend": "up",
                  "trendNote": "英伟达 Blackwell 全球独家代工，海外产能满产（CC合成自A类信号）",
                  "logic": "2025Q4 AI 算力硬件营收 321.7 亿元，占总营收 31.5%，英伟达 H200/B200 整机代工订单饱满，海外产能为主，国内昇腾整机代工 2026 年逐步放量（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "improving", "tier": "estimate", "reason": "Gartner 测算全球海外云厂商 AI 整机采购年增速 47%（L3），英伟达高端 GPU 整机代工需求持续扩张，但国内国产算力整机业务体量偏小，增量贡献有限。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "与英伟达签订五年整机代工长期协议（L1 公告），订单以海外客户为主，国内云厂商代工订单占算力业务收入仅 18%，业绩增量高度依赖北美海外客户需求。"},
                        {"key": "policy", "score": 3, "trend": "stable", "tier": "estimate", "reason": "广东 2025 智能制造补贴政策覆盖国内昇腾代工产线（L2），可享受设备购置补贴，但海外基地产能无法享受国内算力国产化扶持政策红利。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "全球英伟达高端整机代工产能存在明显缺口，公司海外 137 万台年化代工产能满产，国内昇腾代工产能仅 43 万台，本土国产算力供给补充力度有限。"},
                        {"key": "valuation", "score": 4, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 18.3 倍（L1 财报测算），算力代工业务毛利率 8.7%，低于自有品牌整机厂商，海外业务占比过高易受海外贸易政策扰动⚠️。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "国金证券研报披露其英伟达全系列 GPU 整机独家代工资质，海外大规模量产交付能力行业领先，但无自有整机品牌，国产昇腾整机适配研发投入低于内资整机厂（L4）。"}
                  ],
                  "dims6Note": "全球英伟达算力整机核心代工厂，产能集中海外，国内国产昇腾整机业务起步较晚，缺少自有品牌整机客户资源。顾问裁决 tier=B（英伟达 Blackwell 全球独家代工·Gartner 41% 全球份额·海外 137 万台满产，hits=1 弱·barrier=极高）。"
            },
            {
                  "rank": 3,
                  "name": "紫光股份",
                  "code": "000938.SZ",
                  "position": "国内算力网络设备 + 国产昇腾 AI 服务器整机厂商，子公司新华三负责整机与交换机业务，IDC 统计 2025 国内昇腾整机市占 12%，主打政企、运营商算力项目，算力交换机与昇腾整机打包销售，无英伟达高端 GPU 整机生产资质，年化 AI 服务器产能 32 万台（L1，2025 年年报、L3 IDC 2025 国产算力报告）",
                  "barrier": "高",
                  "tier": "B",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；IDC 2025 中国国产算力基础设施白皮书 L3；东吴证券《政企算力产业链跟踪》2025-12-15 L4",
                  "trend": "flat",
                  "trendNote": "昇腾 + 交换机打包，运营商渠道为核心（CC合成自A类信号）",
                  "logic": "2025Q4 算力硬件（服务器 + 交换机）营收 74.2 亿元，占总营收 39.6%，昇腾 910B 整机批量供货三大运营商，算力交换机随政企智算中心建设同步放量（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "IDC 数据显示国内政企、运营商国产算力采购年增速 36%（L3），但公司无英伟达高端整机产品线，无法承接互联网大厂海外 GPU 算力整机增量需求。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "客户以三大运营商、地方政企单位为主，单项目订单分散，无单家互联网头部云厂三年以上大额整机供货框架（L1 投资者活动纪要），季度营收波动幅度偏大。"},
                        {"key": "policy", "score": null, "trend": "stable", "tier": "estimate", "reason": "浙江 2025 国资数字基建扶持政策全面覆盖公司昇腾整机与算力交换机产线（L2），国产算力设备采购补贴最高 20%，全部业务均可享受国产化政策红利。"},
                        {"key": "supply", "score": 4, "trend": "stable", "tier": "estimate", "reason": "政企端国产昇腾整机存在小幅供给缺口，但互联网大厂紧缺的英伟达高端整机无对应产能，无法承接互联网头部厂商算力整机订单。"},
                        {"key": "valuation", "score": 4, "trend": "improving", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 27.9 倍（L1 财报测算），昇腾整机业务毛利率 12.3%，算力交换机业务毛利更高，但互联网高景气算力客户覆盖缺失，估值增长空间受限。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "东吴证券研报显示其算力交换机 + 昇腾整机一体化打包交付为差异化优势，但未取得英伟达任何 GPU 整机认证，互联网头部云厂商客户资源储备薄弱（L4）。"}
                  ],
                  "dims6Note": "聚焦政企、运营商国产算力市场，具备网络设备协同配套优势，但缺失英伟达高端整机产品线，无法切入互联网大厂核心算力采购体系。顾问裁决 tier=B（昇腾 12% 国内市占 + 算力交换机协同 + 运营商渠道核心，hits=2 中）。"
            },
            {
                  "rank": 4,
                  "name": "拓维信息",
                  "code": "002261.SZ",
                  "position": "华为昇腾生态核心中小型整机厂商，仅布局国产昇腾 AI 服务器，无英伟达 GPU 整机研发与生产资质，IDC 2025 国内昇腾整机市占 17%，主打地方政府智算中心、区域中小 AI 企业订单，年化 AI 服务器产能 15 万台，无全国性头部互联网云厂商合作记录（L1，2025 年年报、L4 东吴证券昇腾产业链研报）",
                  "barrier": "低",
                  "tier": "C",
                  "valAsOf": "2025Q4",
                  "src": "2025 年年度报告 L1；IDC 2025 国产算力细分市场报告 L3；东吴证券《华为昇腾整机梯队对比》2025-12-20 L4",
                  "trend": "flat",
                  "trendNote": "纯昇腾中小整机，地方智算中心批量（CC合成自A类信号）",
                  "logic": "2025Q4 昇腾 AI 服务器营收 12.8 亿元，占总营收 46.3%，整机全部搭载华为昇腾芯片，多地地方智算中心签订年度框架，无海外 GPU 整机相关业务收入（L1）",
                  "dims6": [
                        {"key": "durability", "score": null, "trend": "stable", "tier": "estimate", "reason": "IDC 测算地方政府智算中心国产算力采购增速 40%（L3），但公司仅覆盖区域中小客户，无互联网大厂算力整机供给能力，无法承接高景气互联网算力增量。"},
                        {"key": "visibility", "score": null, "trend": "stable", "tier": "estimate", "reason": "客户分散于全国二十余省市地方城投、区域小型 AI 企业，单项目订单规模均低于 2 亿元，无三年以上大额长期整机供货框架（L1 投资者纪要）。"},
                        {"key": "policy", "score": 3, "trend": "stable", "tier": "estimate", "reason": "湖南 2025 人工智能产业扶持政策覆盖昇腾整机产线（L2），地方智算中心采购国产设备配套补贴，仅适配地方政企渠道业务，无全国性互联网扶持资源。"},
                        {"key": "supply", "score": null, "trend": "stable", "tier": "estimate", "reason": "地方县域智算中心昇腾整机存在小幅需求缺口，但互联网大厂紧缺的英伟达高端整机无配套产能，行业核心算力供需红利无法承接。"},
                        {"key": "valuation", "score": 3, "trend": "stable", "tier": "estimate", "reason": "2025Q4 整体 PE-TTM 36.4 倍（L1 财报测算），昇腾整机业务毛利率 11.5%，算力业务营收规模偏小，客户分散且无头部互联网客户，估值性价比偏弱。"},
                        {"key": "barrier", "score": null, "trend": "stable", "tier": "estimate", "reason": "东吴证券研报披露仅掌握昇腾基础整机适配能力，无英伟达 GPU 整机认证，客户仅局限地方政企，研发产能规模均显著低于浪潮、紫光股份（L4）。"}
                  ],
                  "dims6Note": "纯昇腾生态中小整机厂商，业务全部面向地方政府区域智算项目，无英伟达整机能力、无头部互联网云厂商稳定订单，业务体量偏小。顾问裁决 tier=C（地方政企渠道·无头部客户·体量小·barrier=低，hits=1 弱）。"
            }
      ]
    }
  ],
  midstream: {
    description: '先进封装中游覆盖两大细分赛道：先进封测、算力 IC 载板。封测环节包含 Fan-out、2.5D 堆叠组装与电性检测，A 股长电科技、华天科技、通富微电为本土核心封测厂商；IC 载板环节依托 ABF 基材制作芯片互连基板，兴森科技、深南电路为国内主要布局企业。中游全环节均依赖上游海外 ABF 膜材料与高端 CoWoS 工艺，本土企业仅承担加工制造环节，核心技术无自主掌控能力。',
    stocks: [
      {name:'长电科技', code:'600584.SH', note:'待注入'},
      {name:'通富微电', code:'002156.SZ', note:'待注入'},
      {name:'华天科技', code:'002185.SZ', note:'待注入'},
      {name:'兴森科技', code:'002436.SZ', note:'待注入'},
      {name:'深南电路', code:'002916.SZ', note:'待注入'}
    ]
  },
  fourQuestions: {
    segments: [
      {
        name: '核心标的',
        stocks: []
      },
      {
        name: '上游基材',
        stocks: [
            {
                "name": "联瑞新材",
                "code": "688300.SH",
                "q1": true,
                "q1note": "高端球形硅微粉交期延长至 3 个月，客户排队锁产能",
                "q2": true,
                "q2note": "先进封装硅微粉国产渗透率由 2024 年 21% 升至 2025 年 35%(L3)",
                "q3": true,
                "q3note": "长电、通富、华天全产线批量认证通过 (L1)",
                "q4": true,
                "q4note": "年产万吨高端硅微粉新产线 2026Q2 逐步释放",
                "hits": 4,
                "strength": "强"
            },
            {
                "name": "德邦科技",
                "code": "688035.SH",
                "q1": true,
                "q1note": "算力芯片专用底部填充胶产能饱和，新增订单排期 2 个月",
                "q2": true,
                "q2note": "先进封装填充胶国产份额自 12% 提升至 27%(L4)",
                "q3": true,
                "q3note": "长电、通富、晶方科技完成全制程认证 (L1)",
                "q4": true,
                "q4note": "新建半导体胶产线 2026Q2 投产，产能翻倍",
                "hits": 4,
                "strength": "强"
            },
            {
                "name": "生益科技",
                "code": "600183.SH",
                "q1": true,
                "q1note": "高 Tg ABF 树脂产能紧张，下游载板厂提前锁料",
                "q2": true,
                "q2note": "大陆 FC-BGA 载板国产树脂渗透率自 8% 升至 22%(L4)",
                "q3": true,
                "q3note": "深南电路、生益电子高端载板产线批量认证 (L1)",
                "q4": true,
                "q4note": "新建 ABF 树脂产线 2026Q2 投产，产能提升 50%",
                "hits": 4,
                "strength": "强"
            },
            {
                "name": "华海诚科",
                "code": "688535.SH",
                "q1": false,
                "q1note": "中低端功率塑封料产能充足，高端料仅小批量试产无紧缺",
                "q2": true,
                "q2note": "功率封装 EMC 国产渗透率持续上行，算力料小幅渗透 (L3)",
                "q3": true,
                "q3note": "长电、华天完成中端功率封装料认证，算力料未批量 (L1)",
                "q4": false,
                "q4note": "高端算力 EMC 产线仍在调试，暂无明确放量节点",
                "hits": 2,
                "strength": "中"
            },
            {
                "name": "帝科股份",
                "code": "300842.SZ",
                "q1": false,
                "q1note": "低端封装银浆市场供给充足，无产能紧缺现象",
                "q2": false,
                "q2note": "公司封装银浆份额无增长，增量被专业材料企业抢占 (L5)",
                "q3": false,
                "q3note": "仅小型地方封测厂送样，未进入长电 / 通富供应链 (L1)",
                "q4": false,
                "q4note": "无封装银浆扩产、新客户导入规划",
                "hits": 0,
                "strength": "弱"
            },
            {
                "name": "唯特偶",
                "code": "301319.SZ",
                "q1": false,
                "q1note": "低端 Bump 助焊剂市场供给过剩，行业持续降价抢单",
                "q2": false,
                "q2note": "高端先进封装助焊剂国产份额停滞，公司份额持续下滑 (L4)",
                "q3": false,
                "q3note": "未通过长电、通富高端 Bump 产线认证，仅小厂试用 (L1)",
                "q4": false,
                "q4note": "无封装助焊剂新品研发、产能扩张规划",
                "hits": 0,
                "strength": "弱"
            }
        ]
      },
      {
        name: '上游设备',
        stocks: [
            {
                "name": "新益昌",
                "code": "688383.SH",
                "q1": true,
                "q1note": "算力专用倒装固晶机产能饱和，新增订单排队3个月交付",
                "q2": true,
                "q2note": "国内先进固晶设备国产化率自14%升至29%(L4)",
                "q3": true,
                "q3note": "长电科技、通富微电全产线批量采购认证完成(L1)",
                "q4": true,
                "q4note": "新建设备装配产线2026Q2投产，产能提升60%",
                "hits": 4,
                "strength": "强"
            },
            {
                "name": "长川科技",
                "code": "300604.SZ",
                "q1": true,
                "q1note": "算力芯片专用分选机排单2个月，交付周期持续拉长",
                "q2": true,
                "q2note": "国内封测分选设备国产化率提升11个百分点至36%(L3)",
                "q3": true,
                "q3note": "华天科技、晶方科技大批量采购落地(L1)",
                "q4": true,
                "q4note": "新一代8通道探针台2026Q2批量出货交付客户",
                "hits": 4,
                "strength": "强"
            },
            {
                "name": "芯源微",
                "code": "688037.SH",
                "q1": true,
                "q1note": "适配CoWoS的高端Bump涂胶机产能紧张，交付周期拉长",
                "q2": true,
                "q2note": "国内Bump涂胶设备国产化从零突破，份额持续提升(L3)",
                "q3": true,
                "q3note": "长电科技CoWoS产线小批量采购验证完成(L1)",
                "q4": true,
                "q4note": "第二代大尺寸Bump涂胶设备2026Q2量产交付客户",
                "hits": 3,
                "strength": "强"
            },
            {
                "name": "华峰测控",
                "code": "688200.SH",
                "q1": false,
                "q1note": "功率封装测试设备产能充足，交付周期维持正常水平",
                "q2": true,
                "q2note": "功率芯片测试设备国产渗透率持续上行(L4)",
                "q3": true,
                "q3note": "华天、通富功率封测产线完成认证采购(L1)",
                "q4": false,
                "q4note": "高端算力SoC测试设备仍验证，无明确放量节点",
                "hits": 2,
                "strength": "中"
            },
            {
                "name": "德龙激光",
                "code": "688170.SH",
                "q1": false,
                "q1note": "低端晶圆激光切割设备产能充足，高端TGV设备客户验证未量产",
                "q2": true,
                "q2note": "TGV玻璃中介层国产化率提升，2025年订单过亿(L1年报)",
                "q3": true,
                "q3note": "长电科技、通富微电2.5D玻璃中介层产线验证采购完成(L1年报)；英特尔供应商⚠️L5待核",
                "q4": false,
                "q4note": "TGV设备仍处客户验证阶段，2026Q2前无明确放量节点",
                "hits": 2,
                "strength": "中"
            }
        ]
      },
      {
        name: 'IC载板',
        stocks: [
            {
                "name": "深南电路",
                "code": "002916.SZ",
                "q1": true,
                "q1note": "现有 35 万㎡FC-BGA 产线交付交期拉长至 15 周，在手订单覆盖至 2027 年，25 万㎡新增高端产线加急建设缓解整机厂商基板交付压力。",
                "q2": true,
                "q2note": "TrendForce 统计本土高端 ABF 载板国产份额由 2024 年 13% 升至 2025 年末 27%，深南电路贡献本土算力载板增量占比超 65%（L3）。",
                "q3": true,
                "q3note": "已完成华为昇腾 910B、壁仞 BR100、寒武纪思元全系列算力芯片 FC-BGA 载板批量认证，实现稳定批量供货。",
                "q4": true,
                "q4note": "2026Q3 25 万㎡FC-BGA 高端产线投产落地，全年算力载板长期框架订单集中确认收入，HBM 配套载板订单逐步放量。",
                "hits": 4,
                "strength": "强"
            },
            {
                "name": "生益电子",
                "code": "688183.SH",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "景旺电子",
                "code": "603228.SH",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "兴森科技",
                "code": "002436.SZ",
                "q1": false,
                "q1note": "无 FC-BGA ABF 量产产线，仅少量实验室样品产出，不具备规模化交付能力，无法承接市场紧缺的 AI 算力高端载板订单。",
                "q2": false,
                "q2note": "本土高端 ABF 算力载板国产替代增量无任何贡献，仅低端消费 CSP 基板市场份额小幅稳定，算力载板赛道无份额提升相关数据。",
                "q3": false,
                "q3note": "未通过英伟达、AMD、华为昇腾及国内寒武纪、壁仞等头部算力芯片厂商 FC-BGA 载板批量认证，无算力载板供货落地记录。",
                "q4": false,
                "q4note": "未来两季度无 FC-BGA 高端产线新建、算力客户认证落地计划，仅小幅扩充低端消费 CSP 基板产能，不存在算力载板相关业绩催化节点。",
                "hits": 0,
                "strength": "弱"
            }
        ]
      },
      {
        name: '先进封测',
        stocks: [
            {
                "name": "长电科技",
                "code": "600584.SH",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "通富微电",
                "code": "002156.SZ",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "华天科技",
                "code": "002185.SZ",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "晶方科技",
                "code": "603005.SH",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "甬矽电子",
                "code": "688362.SH",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            }
        ]
      },
      {
        name: '下游算力应用',
        stocks: [
            {
                "name": "浪潮信息",
                "code": "000977.SZ",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "工业富联",
                "code": "601138.SH",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "紫光股份",
                "code": "000938.SZ",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            },
            {
                "name": "拓维信息",
                "code": "002261.SZ",
                "q1": null,
                "q1note": "待注入",
                "q2": null,
                "q2note": "待注入",
                "q3": null,
                "q3note": "待注入",
                "q4": null,
                "q4note": "待注入",
                "hits": null,
                "strength": "待注入"
            }
        ]
      }
    ]
  },
  chokePoints: [
    {
      rank: 1,
      name: 'ABF膜',
      code: '',
      segment: '上游材料·算力 IC 载板基材',
      strength: '★★★',
      logic: 'ABF 膜是高端算力载板不可替代绝缘基材，<strong>日系企业垄断全球 95% 以上产能</strong>，国内国产化率仅 3%；算力级 ABF 膜配方、精密涂布、高温固化全套设备均依赖海外，国内企业仅能小规模量产存储低端产品，布线精度无法匹配 CoWoS 封装需求，客户验证周期普遍超 24 个月，短期难以填补供给缺口，是制约国内先进封装产能释放的第一核心卡点。',
      tags: ['材料垄断', '算力刚需', '国产化率极低', '2028 年突破预期'],
        valuation: {
          pe: '待注入',
          peAbsolute: '待注入',
          pePercentile: '待注入',
          asOf: '待注入',
          note: '待注入',
          grossMargin: '待注入',
          fromHigh: '待注入',
          entryZone: '待注入'
        },
        verification: {
          items: [],
          status: '待注入',
          checkedAt: '待注入',
          note: '待注入'
        }
    },
    {
      rank: 2,
      name: 'CoWoS封装',
      code: '',
      segment: '中游封测·高端算力专属工艺',
      strength: '★★★',
      logic: 'CoWoS 为台积电独家持有 2.5D 中介层封装专利工艺，<strong>占据全球高端算力封装 92% 以上产能</strong>，适配英伟达、AMD 高端 GPU+HBM 堆叠模组；国内无等效自研工艺路线，A 股长电、通富、华天仅可生产中低端 Fan-out 封装，无法承接高端 CoWoS 订单；工艺壁垒包含中介层掩膜、高精度贴合、专属测试程序，专利壁垒短期无法突破，算力高端封装环节完全受制海外。',
      tags: ['工艺专利垄断', '高端算力刚需', '国内无替代', '产能长期紧缺'],
        valuation: {
          pe: '待注入',
          peAbsolute: '待注入',
          pePercentile: '待注入',
          asOf: '待注入',
          note: '待注入',
          grossMargin: '待注入',
          fromHigh: '待注入',
          entryZone: '待注入'
        },
        verification: {
          items: [],
          status: '待注入',
          checkedAt: '待注入',
          note: '待注入'
        }
    }
  ],
  supplyGap: [
    {
      segment: 'ABF 膜（算力级）',
      demand: '1.2 万吨 / 年 (2025E)',
      capacity: '国产量产 0.036 万吨 / 年',
      gap: '1.164 万吨',
      rate: '97% 缺口率',
      bottleneck: '高端树脂配方、精密涂布设备日系垄断，国内良率不足行业头部 1/3',
      tier: 'broker',
      src: 'L4 中信证券先进封装深度报告·L4'
    },
    {
      segment: 'CoWoS 算力封装',
      demand: '180 万片 / 年 (2025E)',
      capacity: '台积电自有 140 万片 / 年',
      gap: '40 万片',
      rate: '22% 缺口率',
      bottleneck: '工艺专利独家持有，产线建设周期 24 个月以上，无国内替代工艺路线',
      tier: 'broker',
      src: 'L3 TrendForce 2025Q1 产能跟踪·L3'
    }
  ],
  methodologyNotes: '先进封装核心壁垒集中于台积电CoWoS工艺与味之素ABF膜，A股封测/载板标的为产业链受益方而非卡口持有方，投资逻辑基于景气受益而非技术壁垒，需关注台积电扩产进度与ABF膜国产化突破时间节点'
};

})(window.CHAINS);
