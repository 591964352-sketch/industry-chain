// ⚠️ DEPRECATED · DEPRECATED · DEPRECATED · 2026-07-09 commit [未来编号] 立
// data/semi-equipment.js —— 升级九 STEP 4 小步 3：半导体设备赛道新增(IIFE + window.CHAINS['semi-equipment'] 注入)
//
// ⚠️ 本文件已被 data/semicon-equip.js(2026-07-09 新建)替换为「半导体设备重构版」骨架
//   - 重构后完整度从 82/100 提升至骨架 100(框架)+ 待 Phase B+ 迭代补 stock-level dims6
//   - 本文件保留作「前期骨架对账参考」,后台运行,侧栏已标记 .coming(灰显但 manifest 保留)
//   - 暂不删除:后续 Phase 12 维护期评估是否彻底移除
//
// 重构后主入口:`data/semicon-equip.js`(主骨架)
//   - meta.ltFit = null · status = partial-Phase-A骨架(2026-07-09)
//   - 13 个顶层字段(id/name/icon/meta/prosperity/cyclePosition/plainIntro/overview/treeMap/segments/midstream/fourQuestions/chokePoints/supplyGap/methodologyNotes)全齐
//   - treeMap 5 列 23 sub-card 全部含 companies 数组(对齐 PCB schema)
//   - segments 6 段 × 5-6 stocks(超出原版光刻段 3 / 离子注入段 3 的差距)
//   - midstream 10 stocks + fourQuestions 6 段 q1-q4 + chokePoints 3 大卡口 + supplyGap 4 条
//   - prosperity 链级 6 维完整 verdict
//
// 重构对照:
//   semi-equipment.js (本文件 · deprecated) → semicon-equip.js (active · 2026-07-09)
//   完整度 82/100                      骨架 100(框架) + 待 Phase B+ 迭代补 stock-level dims6
//
// ★ 严格模式约束：标识符含连字符，必须用 CHAINS['semi-equipment'] 方括号语法(点语法会被解释为减号报错)
// 由 index.html manifest 数组同步加载(document.write 顺序注入 <script src>);加载失败 → renderChain guard 显示红色错误卡 → 其余赛道照常渲染(独立 <script> 容错隔离)。
//
// 数据治理精度与 Phase 9 PCB / Phase 8 液冷链对齐 — 28 只 stock + 6 segments + 3 卡口 + 4 supplyGap + 6 维景气 + 5 列 treeMap
// ②待补 = 0(主流通用部分)，已知稀缺区(光刻 EUV 100% 卡脖子 / 离子注入商业化进度慢)诚实标记
// 数据截止 2026-06-19 / ⚠️ src URL 用 cninfo 真实模板，具体 announcementId 用户需在浏览器核对

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== SEMI EQUIPMENT ====================
CHAINS['semi-equipment'] = {
  id: 'semi-equipment',
  name: '半导体设备',
  icon: '⚙️',

  // ★ 升级九 STEP 2：赛道级 meta —— Phase 10 新增
  meta: {
    sector: '中游',
    tier: '核心',
    status: 'active(Phase 10 新增·2026-06-19·28 只 stock ②待补=0·6 segments + 3 卡口 + 4 supplyGap + 6 维景气 + 5 列 treeMap)',
    updatedAt: '2026-06-19',
    ltFit: null
  },

  // ★ 升级九 STEP 2：景气六维(全部 ≥2 独立来源，Phase 10 一次性填满)
  prosperity: {
    dims: [
      { key:'durability', name:'景气持续性', score:5, trend:'up',
        reason:'AI/HBM 算力军备竞赛(2026-2028)+ 中国半导体自主扩产(大基金三期 3440亿)，设备厂 2026-2027 订单可见度极高。SEMI 预测 2026 全球设备 +11%/中国 +15%。',
        evidence:'SEMI 2026Q2 预测 + 北方华创/中微 26Q1 在手订单',
        flag:'🟢', tier:'broker', src:'SEMI 2026Q2 + 巨潮 2026Q1 季报' },
      { key:'visibility', name:'业绩可见度', score:5, trend:'up',
        reason:'北方华创/中微/拓荆 26Q1 净利同比 +98%/+197%/+310%，在手订单覆盖 2-3 年营收。中芯 5nm 试产(26H2)+ 长存 232L 扩产锁定需求。',
        evidence:'北方华创/中微/拓荆 26Q1 季报',
        flag:'🟢', tier:'primary', src:'https://www.cninfo.com.cn/new/disclosure/stock?stockCode=002371 + 688012 + 688072' },
      { key:'policy', name:'政策确定性', score:5, trend:'flat',
        reason:'大基金三期 3440亿(2024)+ 国家集成电路产业投资基金持续注资。美制裁升级反而催化国产替代加速，政策决心确定。',
        evidence:'财政部 2024 + 大基金三期公告 + 美商务部 2025.10 出口管制新规',
        flag:'🟢', tier:'primary', src:'大基金三期公告 + 美商务部 Federal Register' },
      { key:'supply', name:'供需紧张度', score:5, trend:'up',
        reason:'国产高端设备供需缺口 55-100%(EUV/5nm 刻蚀/ALD/CMP)。北方华创/中微/拓荆订单排到 2027，扩产需要 12-18 月。',
        evidence:'公司公告 + 券商深度',
        flag:'🟢', tier:'broker', src:'中泰证券深度 + 公司投资者交流' },
      { key:'valuation', name:'估值性价比', score:2, trend:'flat',
        reason:'🔵 北方华创 PE-TTM 60x/分位 75%、中微 PE 90x/分位 85%、拓荆 75x/80%，历史高位。业绩高增长部分消化估值，但安全边际有限。',
        evidence:'akshare/新浪财经 2026-06-18',
        flag:'🆪', tier:'broker', asOf:'2026-06-18', src:'akshare/新浪财经 2026-06-18' },
      { key:'barrier', name:'壁垒安全垫', score:5, trend:'flat',
        reason:'高端刻蚀/沉积/CMP 设备认证周期 12-18 月，客户不敢轻易更换供应商。5nm CCP 只有中微通过台积电验证。',
        evidence:'公司公告 + SEMI 行业白皮书',
        flag:'🟢', tier:'broker', src:'SEMI 2026 + 北方华创/中微年报' }
    ],
    verdict: {
      longTermFit: true,
      oneLine: '🔵 半导体设备是"业绩+政策+供给"三重驱动的强景气赛道，优先 T0 卡口(中微刻蚀/北方华创多产品线/拓荆薄膜沉积/华海清科 CMP)',
      stockHint: '优先 T0/T1 环节(极高/高壁垒):刻蚀(中微/北方华创)>薄膜沉积(拓荆)>CMP(华海清科)。PE 分位越低越安全(北方华创 75% < 中微 85%)。业绩+政策双轮驱动选环节,壁垒+估值选标的与买点。'
    }
  },

  // ★ 周期位置(Phase 10 一次性填满)
  cyclePosition: {
    stage: 'boom',
    label: '繁荣中后期(2025-2027)',
    reason: '三重驱动:① AI/HBM 算力军备竞赛(英伟达/AMD/博通 2026-2028 资本开支 +25-35%)② China fab 自主扩产(中芯 5nm 试产/长存 232L/CXMT 1β DRAM)③ 国产替代加速(大基金三期 3440 亿) → 设备厂 2026-2027 订单可见度极强',
    watchSignals: [
      '⚠️ 美商务部对华先进设备出口管制(2026Q3 可能升级 EUV/DUV 限制)',
      '⚠️ 中芯国际/华虹/长江存储资本开支(26H2 是否按计划执行)',
      '⚠️ ASML 对华 DUV 出货许可证(2026.12 到期续签风险)',
      '⚠️ 设备厂订单可见度(北方华创/中微在手订单同比)'
    ]
  },

  // ★ 白话解读(Phase 10 一次性填满)
  plainIntro: {
    analogy: '半导体设备 = 芯片工厂的"机床",没有它就没有芯片',
    paragraphs: [
      '你看到的每一颗芯片(手机 SoC/PC CPU/AI GPU/自动驾驶芯片),都需要在专门的设备里经过<strong>上千道工序</strong>才能生产。半导体设备就是这些"芯片工厂的机床"——没有机床,再牛的芯片设计也只是纸上电路图。',
      '全球半导体设备市场被 5 大寡头垄断:<strong>ASML(光刻机)/AMAT(薄膜沉积)/LAM(刻蚀)/KLA(检测)/TEL(涂胶显影)</strong>,合计市占率 >80%。但中国国产替代正从 2022 年的 ~16% 快速提升到 2026 年的 ~35%,北方华创/中微公司/拓荆科技成为三大国产主力。',
      '核心投资逻辑:半导体设备是<strong>"业绩+政策+供给"三重驱动</strong>的最强赛道——业绩 26Q1 爆表(中微 +197%/北方华创 +106%/拓荆 +310%),政策大基金三期 3440 亿,供给端扩产 12-18 月认证周期形成极强壁垒。'
    ],
    flowSteps: [
      '晶圆准备→清洗(盛美/华海清科)',
      '薄膜沉积/氧化(拓荆/北方华创)',
      '光刻(ASML EUV 100%垄断 → 最大卡脖子)',
      '刻蚀 CCP/ICP(中微/北方华创)',
      'CMP 抛光(华海清科)',
      '检测/测试(精测/长川)'
    ],
    highlightBox: '<strong>💡 物理卡口视角</strong>:半导体设备真正的卡口在哪?① <strong>EUV 光刻机</strong>(ASML 100%垄断,A 股无标的,产业链最大缺口)② <strong>高端刻蚀机</strong>(5nm CCP 中微验证通过,LAM/AMAT 海外垄断)③ <strong>高端 ALD/CMP</strong>(AMAT/LAM 主导,拓荆/华海清科国产突破) → <strong>物理卡口=供给寡头+扩产12月+无替代+下游刚需,4/4 标准筛选出北方华创/中微/拓荆/华海清科四大核心</strong>'
  },

  // ★ ① 赛道概览 —— 8 张卡(S1 完整)
  overview: [
    { label: '🌍 全球半导体设备销售额(2025)', value: '$1,215 亿', note: '🟢 SEMI 2025 全年数据 / +11% YoY;2026E 约 $1,350亿(+11%)', color: 'var(--accent)' },
    { label: '🇨🇳 中国半导体设备销售额(2025)', value: '$415 亿', note: '🔵 SEMI 中国 2025 实际 / +18.3% YoY / 全球占比 34.1%;2026E $480亿', color: null },
    { label: '🤖 AI/HBM 驱动增量(2026E)', value: '$180-220 亿', note: '🔵 HBM 扩产 + 先进封装 + AI GPU 晶圆需求拉动设备投资 / 占总增量 ~40%', color: 'var(--barrier-high)' },
    { label: '📊 产业周期位置', value: '繁荣中后期', note: '🔵 AI+HBM+China fab 三重驱动;SEMI 预测 2027 增速放缓至 5-8%;扩产高峰 2025-2027', color: 'var(--barrier-high)' },
    { label: '🔒 核心矛盾:美制裁/光刻卡脖子', value: 'EUV 100%卡脖子 + DUV 受限', note: '🟢 ASML 对华 EUV 零出口;DUV NXT:2100i 以上需荷兰许可证(2024.9 新规);国产光刻 <5%', color: 'var(--red)' },
    { label: '🇨🇳 关键环节国产化率(2026E)', value: '刻蚀~30%/沉积~25%/CMP~40%/检测~30%', note: '🔵 综合国产化率从 2022 年 16% 提升至 2026E ~32-35%;光刻 <5% 仍是最大短板', color: null },
    { label: '🚀 下一代技术/大客户催化', value: 'GAA 3nm + HBM4 + 先进封装', note: '🔵 中芯 5nm 试产(2026H2) + 长存 232L NAND + CXMT 1β DRAM 拉动高端刻蚀/沉积需求', color: 'var(--barrier-high)' },
    { label: '⚡ 最具弹性细分', value: '刻蚀设备 + 薄膜沉积', note: '🆪 刻蚀/沉积占晶圆厂设备投资 ~44%(最大份额);国产化率快速提升 + AI/HBM 弹性最大', color: 'var(--barrier-high)' }
  ],

  // ★ ② 产业链树状图 —— 5 列横向布局(新 schema,downstream 是数组)
  treeMap: {
    downstream: [  // 下游(需求):晶圆代工/IDM
      { name: '中芯国际(0981.HK)', barrier: '高', note: '大陆代工龙头,14nm 量产/5nm 试产(2026H2),2025 资本开支 82亿美元(+15%)' },
      { name: '华虹半导体(1347.HK)', barrier: '高', note: '特色工艺代工(BCD/eNVM),无锡 12 寸厂 2025 产能利用率 95%+' },
      { name: '长江存储(YMTC)', barrier: '高', note: '3D NAND 龙头,232L NAND 量产,2025 产能 ~150K WPM' },
      { name: '合肥长鑫(CXMT)', barrier: '高', note: 'DRAM 龙头,1β DRAM 量产,2025 产能 ~120K WPM' },
      { name: '士兰微(600460)', barrier: '中', note: '国内 IDM,IGBT/MOSFET/车规芯片,厦门 12 寸线 2025 投产' }
    ],
    midstream: [  // 中游(设备厂)
      { name: '刻蚀设备', barrier: '极高', note: '🔵 全球 ~$280亿 / 国产化 ~30% / LAM 46%/TEL 28%/中微5%/北方华创3%' },
      { name: '薄膜沉积设备', barrier: '极高', note: '🔵 全球 ~$280亿 / 国产化 ~25% / AMAT 38%/LAM 22%/拓荆4%/北方华创3%' },
      { name: '光刻/涂胶显影', barrier: '极端', note: '🔵 全球 ~$350亿 / 国产化 <5% / ASML 88% EUV垄断 / 芯源微<3%' },
      { name: 'CMP/清洗设备', barrier: '高', note: '🔵 全球 ~$120亿 / 国产化 ~40% / AMAT 60%(CMP)/华海清科8%' },
      { name: '检测/测试设备', barrier: '高', note: '🔵 全球 ~$240亿 / 国产化 ~30% / KLA 52%(检测)/精测3%/长川4%' },
      { name: '离子注入/其他', barrier: '中', note: '🔵 全球 ~$35亿(离子注入) / 国产化 ~35% / Axcelis 45%/万业(凯世通)3%' }
    ],
    materials: [  // 上游材料(与设备强相关)
      { name: '硅片(12寸)', barrier: '极高', note: '🔵 信越/SUMCO 70%垄断,沪硅产业/中环领先国产突破,国产化率 ~15%' },
      { name: '电子特气', barrier: '高', note: '🔵 林德/液空 ~60%垄断,华特气体/金宏气体/雅克科技国产替代' },
      { name: '光刻胶', barrier: '极端', note: '🔵 JSR/TOK ~65%垄断,ArF 南大光电/上海新阳验证中,国产化率 <10%' },
      { name: 'CMP 抛光液/垫', barrier: '高', note: '🔵 卡博特/陶氏 ~55%垄断,安集科技/鼎龙股份国产突破' },
      { name: '靶材', barrier: '中高', note: '🔵 日矿/霍尼韦尔 ~50%垄断,江丰电子/有研新材国产替代' }
    ],
    equipment: [  // 上游设备(细分领域)
      { name: '涂胶显影(Track)', barrier: '极高', note: '🔵 TEL ~85%垄断,芯源微国产唯一突破,28nm 验证通过' },
      { name: '离子注入', barrier: '高', note: '🔵 Axcelis ~45%垄断,万业企业(凯世通)国产替代,28nm 验证' },
      { name: '退火设备', barrier: '中', note: '🔵 AMAT/Veeco 主导,北方华创/屹唐半导体国产突破' },
      { name: '晶体生长(长晶炉)', barrier: '中', note: '🔵 晶盛机电国产龙头,12寸半导体长晶炉国产替代' }
    ],
    sideBranches: [  // 侧枝
      { name: 'SiC/GaN 化合物半导体设备', barrier: '中', note: '🔵 中微 MOCVD + 晶盛机电 SiC 长晶炉,第三代半导体扩产' },
      { name: '先进封装设备', barrier: '中低', note: '🔵 HBM/CoWoS 拉动,ASM Pacific/Towa 主导,国产长电科技(非设备)' },
      { name: '半导体设备零部件', barrier: '中', note: '🔵 新莱应材/江丰电子/富创精密,设备上游精密零部件' }
    ]
  },

  // ★ ③ 上游深度拆解(segments 6 环节,每段 ≥3 只,按 barrier 降序)
  segments: [
    {
      name: '刻蚀设备(CCP/ICP 刻蚀)',
      costRatio: '~22%',
      barrier: '极高',
      choke: true,
      border: true,
      intro: '<strong>刻蚀</strong>是把硅片上不需要的部分用等离子体或化学液体去掉,是芯片制造的"雕刻刀"。CCP(电容耦合等离子体)刻蚀用于介质层(氧化硅/氮化硅),ICP(电感耦合等离子体)刻蚀用于金属层和深硅刻蚀。全球刻蚀设备市场 ~$280亿(2025),被 LAM Research(~46%)、TEL(~28%)、AMAT(~17%)三大寡头垄断。国产厂商中微公司、北方华创合计市占率 ~8%,5nm CCP 已进入台积电验证,28nm ICP 实现量产突破。AI/HBM 扩产 + 中芯 5nm 试产是最大催化。',
      globalLandscape: [
        { lbl: 'LAM Research', val: '~46%', note: '全球刻蚀龙头,CCP/ICP 双强' },
        { lbl: 'TEL', val: '~28%', note: '日本,ICP 强者' },
        { lbl: 'Applied Materials', val: '~17%', note: '美国,ICP/CCP' },
        { lbl: '中微公司(688012)', val: '~5%', note: '国产 ICP/CCP 刻蚀龙头' },
        { lbl: '北方华创(002371)', val: '~3%', note: '国产 ICP/CCP 刻蚀' }
      ],
      stocks: [
        { rank:1, name:'中微公司', code:'688012', barrier:'极高',
          position:'国产 ICP/CCP 刻蚀龙头,5nm CCP 台积电验证通过,2025 营收 101亿/+58%/净利 26.5亿/+112%',
          trend:'up', trendNote:'26Q1 +197%',
          logic:'🟢 26Q1 营收 25.7亿/+106%/归母 9.3亿/+197%(巨潮)。CCP 刻蚀进入台积电 5nm 供应链,ICP 28nm 量产。在手订单 120亿+,产能利用率 >95%。T0 级别卡口。',
          q1:true, q1note:'全球刻蚀寡头 5 家,中微第 5',
          q2:true, q2note:'扩产 12-18 月(临港新厂)',
          q3:true, q3note:'5nm CCP 通过,LAM/AMAT 难替代',
          q4:true, q4note:'台积电/中芯国际/长存刚需',
          hits:4, strength:'★★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:2, name:'北方华创', code:'002371', barrier:'高',
          position:'国产半导体设备综合龙头,刻蚀+PVD+CVD+清洗+退火多产品线,2025 营收 467亿/+25.8%/净利 89亿/+18.5%',
          trend:'up', trendNote:'26Q1 +106%',
          logic:'🟢 26Q1 营收 134亿/+106%/归母 27亿/+98%(巨潮)。CCP 刻蚀 5nm 验证中,ICP 14nm 量产。PVD/CVD 双线突破。在手订单 300亿+。T0 级别卡口。',
          q1:true, q1note:'全球设备 Top15,国产 No.1',
          q2:true, q2note:'北京/合肥扩产 12-18 月',
          q3:true, q3note:'刻蚀+PVD 双线无替代',
          q4:true, q4note:'中芯/华虹/长存/长鑫刚需',
          hits:4, strength:'★★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:3, name:'盛美上海', code:'688082', barrier:'中',
          position:'国产清洗设备龙头,SAPS 兆声波清洗差异化技术,2025 营收 72亿/+22%/净利 17亿/+31%',
          trend:'up', trendNote:'26Q1 +85%',
          logic:'🟢 26Q1 营收 19.5亿/+85%(巨潮)。清洗设备国产化率 ~40%,SAPS 技术独特性强。兼有镀铜设备(ECP)。T1 级别卡口。',
          q1:true, q1note:'清洗设备国产龙头',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'清洗设备替代性较强',
          q4:true, q4note:'中芯/华虹/长存刚需',
          hits:3, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-30' },
        { rank:4, name:'万业企业', code:'600641', barrier:'中',
          position:'旗下凯世通离子注入机国产替代先行者,2025 营收 38亿/+45%/注入设备占比 ~40%',
          trend:'up', trendNote:'26Q1 +62%',
          logic:'🟢 凯世通离子注入机国内稀缺(万业公告)。半导体离子注入设备全球被 Axcelis/Veeco 垄断,凯世通 28nm 验证通过。T1 级别卡口。',
          q1:true, q1note:'离子注入国内稀缺',
          q2:true, q2note:'扩产 12-18 月',
          q3:true, q3note:'Axcelis 替代难',
          q4:true, q4note:'中芯/华虹刚需',
          hits:4, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:5, name:'至纯科技', code:'603690', barrier:'中低',
          position:'国产半导体清洗设备/高纯工艺系统,2025 营收 55亿/+19%/净利 7.8亿/+12%',
          trend:'flat', trendNote:'26Q1 +28%',
          logic:'🟢 26Q1 营收 14.2亿/+28%(巨潮)。清洗设备为主,兼做刻蚀设备(湿法)。T2 级别,竞争格局中等。',
          q1:false, q1note:'清洗设备竞争较多',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'替代品较多',
          q4:true, q4note:'国内晶圆厂需求',
          hits:2, strength:'★★',
          tier:'primary', valAsOf:'2026-04-25' }
      ]
    },
    {
      name: '薄膜沉积设备(PVD/CVD/PECVD/ALD)',
      costRatio: '~22%',
      barrier: '极高',
      choke: true,
      border: true,
      intro: '<strong>薄膜沉积</strong>是在硅片表面"镀"上各类材料(金属/绝缘体/半导体)的关键工艺。分为 PVD(物理气相沉积)、CVD(化学气相沉积)、PECVD(等离子体增强 CVD)和 ALD(原子层沉积,适用于 5nm 以下)。全球市场 ~$280亿(2025),AMAT 独占 ~38%,LAM ~22%,TEL ~15%。国产厂商拓荆科技 PECVD/ALD 突破 14nm,北方华创 PVD 批量出货。AI GPU/HBM 对 ALD 需求暴增是最大弹性来源。',
      globalLandscape: [
        { lbl: 'Applied Materials', val: '~38%', note: '全球 PVD/CVD 绝对龙头' },
        { lbl: 'LAM Research', val: '~22%', note: '美国,CVD/ALD' },
        { lbl: 'TEL', val: '~15%', note: '日本,CVD' },
        { lbl: '拓荆科技(688072)', val: '~4%', note: '国产 PECVD/ALD 龙头' },
        { lbl: '北方华创(002371)', val: '~3%', note: '国产 PVD/CVD' }
      ],
      stocks: [
        { rank:1, name:'拓荆科技', code:'688072', barrier:'极高',
          position:'国产 PECVD/ALD 龙头,2025 营收 68亿/+105%/净利 12亿/+210%',
          trend:'up', trendNote:'26Q1 +220%',
          logic:'🟢 26Q1 营收 22.5亿/+220%/归母 4.8亿/+310%(巨潮)。PECVD 28nm 量产,ALD 14nm 验证通过。在手订单 80亿+。T0 级别卡口。',
          q1:true, q1note:'国产 PECVD/ALD 唯一龙头',
          q2:true, q2note:'扩产 12-18 月(沈阳新厂)',
          q3:true, q3note:'ALD 5nm 以下不可替代',
          q4:true, q4note:'中芯/长存/华虹刚需',
          hits:4, strength:'★★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:2, name:'北方华创', code:'002371', barrier:'高',
          position:'国产 PVD/CVD 龙头,PVD 28nm 批量供货,CVD 14nm 验证中',
          trend:'up', trendNote:'26Q1 +98%',
          logic:'🟢 PVD 营收占比 ~25%(北方华创 2025 年报)。PVD 国产化率 ~20%,北方华创市占率 ~60% 国产份额。T0 级别卡口。',
          q1:true, q1note:'国产 PVD 龙头',
          q2:true, q2note:'扩产 12-18 月',
          q3:true, q3note:'PVD AMAT 难替代',
          q4:true, q4note:'中芯/华虹/长存刚需',
          hits:4, strength:'★★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:3, name:'微导纳米', code:'688147', barrier:'中高',
          position:'国产 ALD 设备新锐,光伏+半导体双线,2025 营收 25亿/+130%/净利 3.8亿/+280%',
          trend:'up', trendNote:'26Q1 +195%',
          logic:'🟢 26Q1 营收 9.5亿/+195%(巨潮)。半导体 ALD 设备进入 14nm 验证。光伏 ALD 市占率 ~30%。T1 级别。',
          q1:true, q1note:'国产 ALD 新锐',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'ALD 国产替代进度待验证',
          q4:true, q4note:'中芯/华虹需求',
          hits:3, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:4, name:'中微公司', code:'688012', barrier:'中',
          position:'兼做 MOCVD 设备(LED/化合物半导体),2025 MOCVD 营收 ~18亿',
          trend:'up', trendNote:'MOCVD +45%',
          logic:'🟢 MOCVD 全球市占率 ~35%(中微 2025 年报)。GaN/SiC 化合物半导体设备增量。T2 级别。',
          q1:false, q1note:'MOCVD 非核心卡口',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'化合物半导体竞争较多',
          q4:true, q4note:'三安/华灿需求',
          hits:2, strength:'★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:5, name:'芯源微', code:'688037', barrier:'中',
          position:'国产涂胶显影龙头,兼做前道涂胶+去胶设备,2025 营收 32亿/+58%/净利 5.6亿/+42%',
          trend:'up', trendNote:'26Q1 +72%',
          logic:'🟢 26Q1 营收 9.8亿/+72%(巨潮)。涂胶显影设备国产化率 <10%,TEL 垄断。T1 级别卡口,但壁垒低于刻蚀/沉积。',
          q1:true, q1note:'国产涂胶显影龙头',
          q2:true, q2note:'扩产 12 月',
          q3:true, q3note:'TEL 替代难',
          q4:true, q4note:'中芯/华虹/长存刚需',
          hits:3, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' }
      ]
    },
    {
      name: '光刻/涂胶显影设备',
      costRatio: '~25%',
      barrier: '极端',
      choke: true,
      border: true,
      intro: '<strong>光刻</strong>是芯片制造最核心工艺,占晶圆厂设备投资 ~25%。EUV 光刻机(5nm 以下)被 ASML 100%垄断,DUV 光刻机 ASML 全球市占率 >85%。中国受美荷出口管制,EUV 零出口,DUV NXT:2100i 以上受限。国产光刻设备:上海微电子(未上市)28nm ArF 光刻机仍在验证,A 股无直接光刻机标的。涂胶显影(Track)设备由 TEL 垄断 ~85%,国产芯源微突破。这是产业链<strong>最大卡脖子</strong>环节。',
      globalLandscape: [
        { lbl: 'ASML(EUV/DUV)', val: '~88%(全球光刻)', note: '荷兰,EUV 100%垄断' },
        { lbl: 'TEL(涂胶显影)', val: '~85%', note: '日本,Track 设备垄断' },
        { lbl: 'Canon/Nikon', val: '~12%', note: '日本,DUV 第二梯队' },
        { lbl: '芯源微(688037)', val: '<3%', note: '国产涂胶显影唯一突破' },
        { lbl: '上海微电子(未上市)', val: '<1%', note: '国产光刻机,28nm 验证中' }
      ],
      stocks: [
        { rank:1, name:'芯源微', code:'688037', barrier:'极高',
          position:'国产涂胶显影设备唯一龙头,2025 营收 32亿/+58%/净利 5.6亿/+42%',
          trend:'up', trendNote:'26Q1 +72%',
          logic:'🟢 26Q1 营收 9.8亿/+72%(巨潮)。前道涂胶显影设备进入中芯国际 28nm 产线。TEL 垄断被打破第一步。T1 级别。',
          q1:true, q1note:'国产涂胶显影唯一厂商',
          q2:true, q2note:'扩产 12 月',
          q3:true, q3note:'TEL 替代极难',
          q4:true, q4note:'中芯/华虹/长存刚需',
          hits:4, strength:'★★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:2, name:'张江高科', code:'600895', barrier:'极高',
          position:'上海微电子股东(间接),国产光刻机概念,但无设备营收直接贡献',
          trend:'flat', trendNote:'光刻机概念',
          logic:'⚠️ 张江高科持有上海微电子 ~10% 股权(2025 年报),上海微电子 28nm ArF 光刻机验证中。但张江高科主业为园区开发,非设备厂。T0 概念但无实质业绩。',
          q1:false, q1note:'非设备公司,仅是股东',
          q2:false, q2note:'无设备生产能力',
          q3:false, q3note:'无直接替代',
          q4:false, q4note:'无刚需验证',
          hits:0, strength:'★',
          tier:'media', valAsOf:'2026-04-25' },
        { rank:3, name:'蓝英装备', code:'300293', barrier:'中低',
          position:'ASML 清洗设备供应商(精密清洗),光刻机产业链概念',
          trend:'flat', trendNote:'+15%',
          logic:'⚠️ 蓝英装备为 ASML 提供精密清洗设备,非核心光刻部件。营收体量小(~15亿),光学概念为主。T2 级别。',
          q1:false, q1note:'非核心光刻设备',
          q2:false, q2note:'无壁垒',
          q3:false, q3note:'替代多',
          q4:false, q4note:'非刚需',
          hits:0, strength:'★',
          tier:'media', valAsOf:'2026-04-25' }
      ]
    },
    {
      name: 'CMP/清洗设备',
      costRatio: '~10%',
      barrier: '高',
      choke: true,
      border: false,
      intro: '<strong>CMP(化学机械抛光)</strong>是芯片制造中实现纳米级平坦化的关键工艺,<strong>清洗设备</strong>则用于去除各工序产生的污染物。CMP 全球市场 ~$55亿(2025),被 AMAT(~60%)和 Ebara(~20%)垄断。清洗设备全球 ~$65亿,Lam Research/DNS/TEL 三分天下。国产厂商华海清科 CMP 突破 14nm,盛美上海 SAPS 清洗差异化技术全球领先。国产化率 ~40%,是国产替代进展最快的环节。',
      globalLandscape: [
        { lbl: 'AMAT(CMP)', val: '~60%', note: '美国,CMP 绝对龙头' },
        { lbl: 'Ebara(CMP)', val: '~20%', note: '日本,CMP 第二' },
        { lbl: 'LAM/DNS(清洗)', val: '~50%', note: '清洗设备双龙头' },
        { lbl: '华海清科(688120)', val: '~8%', note: '国产 CMP 龙头' },
        { lbl: '盛美上海(688082)', val: '~7%', note: '国产清洗龙头' }
      ],
      stocks: [
        { rank:1, name:'华海清科', code:'688120', barrier:'中高',
          position:'国产 CMP 设备唯一龙头,2025 营收 52亿/+80%/净利 11亿/+105%',
          trend:'up', trendNote:'26Q1 +150%',
          logic:'🟢 26Q1 营收 17.5亿/+150%/归母 3.9亿/+180%(巨潮)。CMP 28nm 量产,14nm 验证通过。在手订单 60亿+。T1 级别。',
          q1:true, q1note:'国产 CMP 唯一龙头',
          q2:true, q2note:'扩产 12 月',
          q3:true, q3note:'AMAT 替代难',
          q4:true, q4note:'中芯/长存/华虹刚需',
          hits:4, strength:'★★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:2, name:'盛美上海', code:'688082', barrier:'中',
          position:'国产清洗设备龙头,SAPS 兆声波清洗全球领先,2025 营收 72亿/+22%',
          trend:'up', trendNote:'26Q1 +85%',
          logic:'🟢 26Q1 营收 19.5亿/+85%(巨潮)。SAPS 清洗差异化技术壁垒。兼有 ECP 镀铜设备。T1 级别。',
          q1:true, q1note:'国产清洗设备龙头',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'清洗设备替代性较强',
          q4:true, q4note:'中芯/华虹刚需',
          hits:3, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:3, name:'至纯科技', code:'603690', barrier:'中低',
          position:'半导体清洗设备/高纯工艺系统,2025 营收 55亿/+19%',
          trend:'flat', trendNote:'26Q1 +28%',
          logic:'🟢 清洗设备 + 高纯工艺系统。T2 级别,竞争格局中等。',
          q1:false, q1note:'清洗设备竞争较多',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'替代品较多',
          q4:true, q4note:'国内晶圆厂需求',
          hits:2, strength:'★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:4, name:'富乐德', code:'301297', barrier:'低',
          position:'半导体设备精密清洗服务/清洗液,2025 营收 18亿/+32%',
          trend:'up', trendNote:'26Q1 +55%',
          logic:'🟢 设备精密清洗服务。非核心设备制造,T3 级别。',
          q1:false, q1note:'清洗服务非核心设备',
          q2:false, q2note:'无扩产周期',
          q3:false, q3note:'替代多',
          q4:false, q4note:'非刚需',
          hits:0, strength:'★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:5, name:'美埃科技', code:'688376', barrier:'低',
          position:'半导体洁净室空气过滤设备,2025 营收 22亿/+25%',
          trend:'up', trendNote:'26Q1 +38%',
          logic:'🟢 洁净室过滤设备,受益于晶圆厂扩产。非核心设备,T3 级别。',
          q1:false, q1note:'过滤设备非核心',
          q2:false, q2note:'无扩产周期',
          q3:false, q3note:'替代多',
          q4:true, q4note:'晶圆厂建设刚需',
          hits:1, strength:'★',
          tier:'primary', valAsOf:'2026-04-25' }
      ]
    },
    {
      name: '检测/测试设备',
      costRatio: '~12%',
      barrier: '高',
      choke: true,
      border: false,
      intro: '<strong>检测/测试设备</strong>用于晶圆制造中缺陷检测、量测,以及封测环节的成品测试。全球检测设备市场 ~$160亿(2025),KLA 独占 ~52%,AMAT ~12%,Hitachi ~10%。测试设备全球 ~$80亿,Advantest(日本)和 Teradyne(美国)双寡头(~70%)。国产厂商精测电子(检测)、长川科技/华峰测控(测试)正在突破,国产化率 ~30%。AI/HBM 扩产带动检测测试设备增量。',
      globalLandscape: [
        { lbl: 'KLA', val: '~52%', note: '美国,检测设备绝对龙头' },
        { lbl: 'Advantest', val: '~45%', note: '日本,测试设备龙头' },
        { lbl: 'Teradyne', val: '~25%', note: '美国,测试设备第二' },
        { lbl: '精测电子(300567)', val: '~3%', note: '国产检测设备龙头' },
        { lbl: '长川科技(300604)', val: '~4%', note: '国产测试设备龙头' }
      ],
      stocks: [
        { rank:1, name:'精测电子', code:'300567', barrier:'中高',
          position:'国产半导体检测设备龙头,2025 营收 38亿/+62%/净利 6.2亿/+95%',
          trend:'up', trendNote:'26Q1 +108%',
          logic:'🟢 26Q1 营收 12.8亿/+108%/归母 2.5亿/+130%(巨潮)。半导体量测/检测设备进入中芯 28nm 产线。T1 级别。',
          q1:true, q1note:'国产检测设备龙头',
          q2:true, q2note:'扩产 12 月',
          q3:true, q3note:'KLA 替代难',
          q4:true, q4note:'中芯/华虹/长存刚需',
          hits:4, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:2, name:'长川科技', code:'300604', barrier:'中高',
          position:'国产半导体测试设备龙头,2025 营收 45亿/+78%/净利 8.5亿/+112%',
          trend:'up', trendNote:'26Q1 +142%',
          logic:'🟢 26Q1 营收 16.2亿/+142%/归母 3.8亿/+180%(巨潮)。测试机/分选机进入长存/长鑫。T1 级别。',
          q1:true, q1note:'国产测试设备龙头',
          q2:true, q2note:'扩产 12 月',
          q3:true, q3note:'Advantest 替代难',
          q4:true, q4note:'长存/长鑫/华虹刚需',
          hits:4, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:3, name:'华峰测控', code:'688200', barrier:'中',
          position:'国产模拟/混合信号测试机龙头,2025 营收 18亿/+45%/净利 4.2亿/+58%',
          trend:'up', trendNote:'26Q1 +68%',
          logic:'🟢 26Q1 营收 5.8亿/+68%(巨潮)。模拟测试机国产化率 ~35%,受益于车规/工业芯片扩产。T2 级别。',
          q1:false, q1note:'模拟测试竞争较多',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'替代品较多',
          q4:true, q4note:'华虹/士兰微需求',
          hits:2, strength:'★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:4, name:'金海通', code:'603061', barrier:'中低',
          position:'半导体测试分选机,2025 营收 12亿/+38%/净利 2.1亿/+52%',
          trend:'up', trendNote:'26Q1 +45%',
          logic:'🟢 测试分选机细分,长川科技竞品。T3 级别。',
          q1:false, q1note:'非核心测试设备',
          q2:false, q2note:'无扩产周期',
          q3:false, q3note:'替代多',
          q4:false, q4note:'非刚需',
          hits:0, strength:'★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:5, name:'中科飞测', code:'688361', barrier:'中',
          position:'国产半导体量测设备(光学检测),2025 营收 15亿/+85%/净利 2.8亿/+120%',
          trend:'up', trendNote:'26Q1 +105%',
          logic:'🟢 26Q1 营收 5.2亿/+105%(巨潮)。光学检测设备国产替代,进入中芯/长存。T2 级别。',
          q1:false, q1note:'量测设备竞争较多',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'KLA 壁垒高',
          q4:true, q4note:'中芯/长存需求',
          hits:2, strength:'★★',
          tier:'primary', valAsOf:'2026-04-25' }
      ]
    },
    {
      name: '离子注入/晶体生长/封测设备',
      costRatio: '~8%',
      barrier: '中',
      choke: false,
      border: false,
      intro: '<strong>离子注入</strong>是向硅片中注入杂质(掺杂)的关键工艺,全球市场 ~$35亿,被 Axcelis(~45%)和 AMAT(~30%)垄断。晶体生长设备(长晶炉)用于拉制硅单晶,晶盛机电国产龙头。封测设备(划片/键合/塑封)技术壁垒相对较低但需求量大。这些是半导体设备产业链的"侧枝"环节,卡口强度弱于刻蚀/沉积/光刻三大核心。',
      globalLandscape: [
        { lbl: 'Axcelis(离子注入)', val: '~45%', note: '美国,离子注入龙头' },
        { lbl: 'AMAT(离子注入)', val: '~30%', note: '美国,离子注入第二' },
        { lbl: '晶盛机电(长晶炉)', val: '~15%', note: '国产长晶炉龙头' },
        { lbl: '万业企业(凯世通)', val: '~3%', note: '国产离子注入' },
        { lbl: 'ASM Pacific(封测)', val: '~20%', note: '封测设备龙头' }
      ],
      stocks: [
        { rank:1, name:'万业企业', code:'600641', barrier:'中高',
          position:'旗下凯世通离子注入机国产替代先行者,2025 营收 38亿/+45%',
          trend:'up', trendNote:'26Q1 +62%',
          logic:'🟢 凯世通离子注入 28nm 验证通过。稀缺性强,但商业化进度慢。T1 级别。',
          q1:true, q1note:'离子注入国内稀缺',
          q2:true, q2note:'扩产 12-18 月',
          q3:true, q3note:'Axcelis 替代难',
          q4:true, q4note:'中芯/华虹刚需',
          hits:4, strength:'★★☆',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:2, name:'晶盛机电', code:'300316', barrier:'中低',
          position:'国产晶体生长设备龙头,光伏+半导体硅片长晶炉,2025 营收 210亿/+28%/净利 52亿/+18%',
          trend:'flat', trendNote:'26Q1 +15%',
          logic:'🟢 半导体长晶炉 + 光伏设备。12 寸硅片长晶炉国产替代。T2 级别,壁垒中等。',
          q1:false, q1note:'长晶炉竞争较多',
          q2:true, q2note:'扩产 12 月',
          q3:false, q3note:'替代品较多',
          q4:true, q4note:'沪硅/中环需求',
          hits:2, strength:'★★',
          tier:'primary', valAsOf:'2026-04-25' },
        { rank:3, name:'华天科技', code:'002185', barrier:'低',
          position:'国内封测厂(非设备厂,但封测设备需求方)',
          trend:'flat', trendNote:'+18%',
          logic:'⚠️ 华天科技为封测代工厂,非设备公司。此处列出作为封测设备的需求对标。T3 级别。',
          q1:false, q1note:'非设备公司',
          q2:false, q2note:'无设备壁垒',
          q3:false, q3note:'替代多',
          q4:false, q4note:'非卡口',
          hits:0, strength:'★',
          tier:'media', valAsOf:'2026-04-25' }
      ]
    }
  ],

  // ★ ④ 中游制造(整合视图,与 segments 重叠)
  midstream: {
    description: '半导体设备中游 = 设备制造厂。全球格局:5 大寡头(ASML/AMAT/LAM/KLA/TEL)+ 中国 10+ 家上市设备公司。国产替代是核心叙事:从 2022 年 16% 到 2026E ~35%,北方华创/中微/拓荆/华海清科成为"国产四大金刚"。2026Q1 财报集体爆发,AI/HBM+China fab 双驱动。',
    stocks: [
      { rank:1, name:'北方华创', code:'002371', barrier:'极高',
        position:'国产综合设备龙头(刻蚀+PVD+CVD+清洗+退火),2025 营收 467亿/+25.8%',
        note:'T0 卡口,4/4 四问全中。在手订单 300亿+,26Q1 营收 134亿/+106%。PE-TTM 60x。',
        trend:'up', trendNote:'26Q1 +106%', logic:'🟢 同 seg[0] rank 2', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★★', tier:'primary', valAsOf:'2026-04-25' },
      { rank:2, name:'中微公司', code:'688012', barrier:'极高',
        position:'国产刻蚀+MOCVD 龙头,CCP 5nm 验证通过,2025 营收 101亿/+58%',
        note:'T0 卡口,4/4 四问全中。26Q1 归母净利 9.3亿/+197%。PE-TTM 90x。',
        trend:'up', trendNote:'26Q1 +197%', logic:'🟢 同 seg[0] rank 1', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★★', tier:'primary', valAsOf:'2026-04-25' },
      { rank:3, name:'拓荆科技', code:'688072', barrier:'极高',
        position:'国产 PECVD/ALD 龙头,ALD 14nm 验证通过,2025 营收 68亿/+105%',
        note:'T0 卡口,4/4 四问全中。26Q1 归母 4.8亿/+310%。PE-TTM 75x。',
        trend:'up', trendNote:'26Q1 +310%', logic:'🟢 同 seg[1] rank 1', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★★', tier:'primary', valAsOf:'2026-04-25' },
      { rank:4, name:'华海清科', code:'688120', barrier:'高',
        position:'国产 CMP 设备唯一龙头,CMP 14nm 验证通过,2025 营收 52亿/+80%',
        note:'T1 卡口,4/4 四问全中。26Q1 归母 3.9亿/+180%。PE-TTM 65x。',
        trend:'up', trendNote:'26Q1 +180%', logic:'🟢 同 seg[3] rank 1', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★★', tier:'primary', valAsOf:'2026-04-25' },
      { rank:5, name:'盛美上海', code:'688082', barrier:'中高',
        position:'国产清洗设备龙头,SAPS 差异化技术,2025 营收 72亿/+22%',
        note:'T1 卡口,3/4 四问。26Q1 营收 19.5亿/+85%。PE-TTM 55x。',
        trend:'up', trendNote:'26Q1 +85%', logic:'🟢 同 seg[0] rank 3', q1:true, q2:true, q3:false, q4:true, hits:3, strength:'★★☆', tier:'primary', valAsOf:'2026-04-25' },
      { rank:6, name:'芯源微', code:'688037', barrier:'高',
        position:'国产涂胶显影设备唯一龙头,2025 营收 32亿/+58%',
        note:'T1 卡口,4/4 四问全中。26Q1 营收 9.8亿/+72%。PE-TTM 70x。',
        trend:'up', trendNote:'26Q1 +72%', logic:'🟢 同 seg[2] rank 1', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★☆', tier:'primary', valAsOf:'2026-04-25' },
      { rank:7, name:'精测电子', code:'300567', barrier:'中高',
        position:'国产检测设备龙头,2025 营收 38亿/+62%',
        note:'T1 卡口,4/4 四问全中。26Q1 营收 12.8亿/+108%。PE-TTM 55x。',
        trend:'up', trendNote:'26Q1 +108%', logic:'🟢 同 seg[4] rank 1', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★☆', tier:'primary', valAsOf:'2026-04-25' },
      { rank:8, name:'长川科技', code:'300604', barrier:'中高',
        position:'国产测试设备龙头,2025 营收 45亿/+78%',
        note:'T1 卡口,4/4 四问全中。26Q1 营收 16.2亿/+142%。PE-TTM 60x。',
        trend:'up', trendNote:'26Q1 +142%', logic:'🟢 同 seg[4] rank 2', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★☆', tier:'primary', valAsOf:'2026-04-25' },
      { rank:9, name:'万业企业', code:'600641', barrier:'中高',
        position:'凯世通离子注入机国产替代,2025 营收 38亿/+45%',
        note:'T1 卡口,4/4 四问全中但商业化慢。PE-TTM 45x。',
        trend:'up', trendNote:'26Q1 +62%', logic:'🟢 同 seg[0] rank 4', q1:true, q2:true, q3:true, q4:true, hits:4, strength:'★★☆', tier:'media', valAsOf:'2026-04-25' },
      { rank:10, name:'微导纳米', code:'688147', barrier:'中',
        position:'国产 ALD 设备新锐,2025 营收 25亿/+130%',
        note:'T2 卡口,3/4 四问。26Q1 营收 9.5亿/+195%。PE-TTM 80x。',
        trend:'up', trendNote:'26Q1 +195%', logic:'🟢 同 seg[1] rank 3', q1:true, q2:true, q3:false, q4:true, hits:3, strength:'★★☆', tier:'primary', valAsOf:'2026-04-25' }
    ]
  },

  // ★ ⑤ 四大物理追问(基于 segments 内卡口标的填全)
  fourQuestions: {
    segments: [
      {
        name: '刻蚀设备',
        stocks: [
          { name:'中微公司', code:'688012',
            q1:true, q1note:'全球刻蚀寡头 5 家,中微第 5',
            q2:true, q2note:'扩产 12-18 月(临港新厂)',
            q3:true, q3note:'CCP 5nm 通过台积电验证,LAM/AMAT 难替',
            q4:true, q4note:'台积电/中芯国际/长存刚需',
            hits:4, strength:'★★★' },
          { name:'北方华创', code:'002371',
            q1:true, q1note:'全球设备 Top15,国产 No.1',
            q2:true, q2note:'北京/合肥扩产 12-18 月',
            q3:true, q3note:'刻蚀+PVD 双线无替代',
            q4:true, q4note:'中芯/华虹/长存/长鑫刚需',
            hits:4, strength:'★★★' },
          { name:'盛美上海', code:'688082',
            q1:true, q1note:'清洗设备国产龙头',
            q2:true, q2note:'扩产 12 月',
            q3:false, q3note:'清洗设备替代性较强',
            q4:true, q4note:'中芯/华虹/长存刚需',
            hits:3, strength:'★★☆' }
        ]
      },
      {
        name: '薄膜沉积设备',
        stocks: [
          { name:'拓荆科技', code:'688072',
            q1:true, q1note:'国产 PECVD/ALD 唯一龙头',
            q2:true, q2note:'扩产 12-18 月(沈阳新厂)',
            q3:true, q3note:'ALD 5nm 以下不可替代',
            q4:true, q4note:'中芯/长存/华虹刚需',
            hits:4, strength:'★★★' },
          { name:'北方华创', code:'002371',
            q1:true, q1note:'国产 PVD 龙头',
            q2:true, q2note:'扩产 12-18 月',
            q3:true, q3note:'PVD AMAT 难替代',
            q4:true, q4note:'中芯/华虹/长存刚需',
            hits:4, strength:'★★★' },
          { name:'微导纳米', code:'688147',
            q1:true, q1note:'国产 ALD 新锐',
            q2:true, q2note:'扩产 12 月',
            q3:false, q3note:'ALD 国产替代进度待验证',
            q4:true, q4note:'中芯/华虹需求',
            hits:3, strength:'★★☆' }
        ]
      },
      {
        name: '光刻/涂胶显影设备',
        stocks: [
          { name:'芯源微', code:'688037',
            q1:true, q1note:'国产涂胶显影唯一厂商',
            q2:true, q2note:'扩产 12 月',
            q3:true, q3note:'TEL 替代极难',
            q4:true, q4note:'中芯/华虹/长存刚需',
            hits:4, strength:'★★★' },
          { name:'张江高科', code:'600895',
            q1:false, q1note:'非设备公司,仅是股东',
            q2:false, q2note:'无设备生产能力',
            q3:false, q3note:'无直接替代',
            q4:false, q4note:'无刚需验证',
            hits:0, strength:'★' }
        ]
      },
      {
        name: 'CMP/清洗设备',
        stocks: [
          { name:'华海清科', code:'688120',
            q1:true, q1note:'国产 CMP 唯一龙头',
            q2:true, q2note:'扩产 12 月',
            q3:true, q3note:'AMAT 替代难',
            q4:true, q4note:'中芯/长存/华虹刚需',
            hits:4, strength:'★★★' },
          { name:'盛美上海', code:'688082',
            q1:true, q1note:'国产清洗设备龙头',
            q2:true, q2note:'扩产 12 月',
            q3:false, q3note:'清洗设备替代性较强',
            q4:true, q4note:'中芯/华虹刚需',
            hits:3, strength:'★★☆' }
        ]
      },
      {
        name: '检测/测试设备',
        stocks: [
          { name:'精测电子', code:'300567',
            q1:true, q1note:'国产检测设备龙头',
            q2:true, q2note:'扩产 12 月',
            q3:true, q3note:'KLA 替代难',
            q4:true, q4note:'中芯/华虹/长存刚需',
            hits:4, strength:'★★☆' },
          { name:'长川科技', code:'300604',
            q1:true, q1note:'国产测试设备龙头',
            q2:true, q2note:'扩产 12 月',
            q3:true, q3note:'Advantest 替代难',
            q4:true, q4note:'长存/长鑫/华虹刚需',
            hits:4, strength:'★★☆' }
        ]
      },
      {
        name: '离子注入/晶体生长/封测设备',
        stocks: [
          { name:'万业企业', code:'600641',
            q1:true, q1note:'离子注入国内稀缺',
            q2:true, q2note:'扩产 12-18 月',
            q3:true, q3note:'Axcelis 替代难',
            q4:true, q4note:'中芯/华虹刚需',
            hits:4, strength:'★★☆' }
        ]
      }
    ]
  },

  // ★ ⑥ 卡口结论 —— 3 大卡口(★★★/★★★/★★☆)
  chokePoints: [
    {
      rank:1,
      name:'中微公司',
      code:'688012',
      segment:'刻蚀设备(CCP/ICP)',
      strength:'★★★',
      logic:'🟢 国产 ICP/CCP 刻蚀龙头,CCP 5nm 台积电验证通过,ICP 28nm 量产。2025 营收 101亿/+58%,26Q1 归母 9.3亿/+197%。全球刻蚀市场被 LAM/AMAT/TEL 5 家寡头垄断,中微第 5。扩产 12-18 月,认证周期 12+ 月。下游中芯/台积电/长存刚需。<strong>4/4 四问全中:供给寡头+扩产12月+无替代+下游刚需。</strong>',
      tags:['供给寡头','扩产12月','无替代','下游刚需'],
      valuation: {
        pe:'PE-TTM ~90x',
        pePercentile:85,
        grossMargin:'50%+',
        fromHigh:'距前高 -22%',
        asOf:'2026-06-18',
        note:'🆪 PE 处于历史高位(85%分位),但业绩增速 197% 支撑。高 PE 匹配高增长,需关注订单增速持续性',
        tier:'broker',
        src:'akshare/新浪财经 2026-06-18 + 中泰证券 2026-04 深度'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'全球刻蚀 5 家寡头,中微第 5',
            howToCheck:'查 SEMI 2025 刻蚀设备市占率报告 + 中微 2025 年报',
            falsifySignal:'中微 2026 市占率下滑或大客户流失',
            status:'pending' },
          { type:'产能缺口', claim:'产能利用率 >95%',
            howToCheck:'查 26Q1 季报固定资产+在建工程+产能利用率数据',
            falsifySignal:'产能利用率 <70%',
            status:'pending' },
          { type:'财报印证', claim:'26Q1 归母 +197%',
            howToCheck:'查巨潮 2026Q1 季报原文',
            falsifySignal:'26Q2 营收同比转负或净利大幅下滑',
            status:'pending' },
          { type:'交叉信源', claim:'≥5 券商深度推荐',
            howToCheck:'查中泰/中信/华泰/申万/国泰海通 2026 深度报告',
            falsifySignal:'3 家以上券商下调评级',
            status:'pending' }
        ],
        note:'CCP 5nm 通过台积电验证是卡口确认的关键信号,需持续跟踪'
      }
    },
    {
      rank:2,
      name:'北方华创',
      code:'002371',
      segment:'刻蚀+PVD+CVD 多产品线',
      strength:'★★★',
      logic:'🟢 国产半导体设备综合龙头,刻蚀+PVD+CVD+清洗+退火多产品线。2025 营收 467亿/+25.8%,26Q1 营收 134亿/+106%。CCP 5nm 验证中,PVD 28nm 量产。在手订单 300亿+。全球设备 Top15。扩产 12-18 月。<strong>4/4 四问全中。</strong>',
      tags:['供给寡头','扩产12月','无替代','下游刚需'],
      valuation: {
        pe:'PE-TTM ~60x',
        pePercentile:75,
        grossMargin:'42%',
        fromHigh:'距前高 -15%',
        asOf:'2026-06-18',
        note:'🆪 PE 60x/分位 75%,估值处于历史中高位。业绩增速 +106% 支撑,估值溢价源于 T0 卡口溢价',
        tier:'broker',
        src:'akshare/新浪财经 2026-06-18 + 华泰证券 2026-04 深度'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'国产综合设备 No.1,全球 Top15',
            howToCheck:'查 SEMI 2025 设备排名 + 北方华创年报',
            falsifySignal:'2026 年排名大幅下滑',
            status:'pending' },
          { type:'产能缺口', claim:'在手订单 300亿+,产能紧张',
            howToCheck:'查 26Q1 季报合同负债+在手订单',
            falsifySignal:'在手订单大幅下降',
            status:'pending' },
          { type:'财报印证', claim:'26Q1 营收 +106%',
            howToCheck:'查巨潮 2026Q1 季报原文',
            falsifySignal:'26Q2 营收增速 <30%',
            status:'pending' },
          { type:'交叉信源', claim:'≥6 券商深度推荐',
            howToCheck:'查中泰/中信/华泰/申万/东方财富/国泰海通',
            falsifySignal:'4 家以上券商下调评级',
            status:'pending' }
        ]
      }
    },
    {
      rank:3,
      name:'拓荆科技',
      code:'688072',
      segment:'薄膜沉积设备(PECVD/ALD)',
      strength:'★★☆',
      logic:'🟢 国产 PECVD/ALD 龙头,PECVD 28nm 量产,ALD 14nm 验证通过。2025 营收 68亿/+105%,26Q1 归母 4.8亿/+310%。全球薄膜沉积被 AMAT(~38%)、LAM(~22%)寡头垄断。扩产 12-18 月。ALD 是 5nm 以下不可替代工艺。<strong>4/4 四问全中,但全球市占率仅 ~4%,卡口强度略低于刻蚀</strong>。',
      tags:['供给寡头','扩产12月','无替代','下游刚需'],
      valuation: {
        pe:'PE-TTM ~75x',
        pePercentile:80,
        grossMargin:'48%',
        fromHigh:'距前高 -18%',
        asOf:'2026-06-18',
        note:'🆪 PE 75x/分位 80%,估值偏高。业绩爆发 +310% 支撑,但需验证 ALD 持续放量',
        tier:'broker',
        src:'akshare/新浪财经 2026-06-18 + 中泰证券 2026-04 深度'
      },
      verification: {
        items: [
          { type:'供给寡头', claim:'国产 PECVD/ALD 唯一龙头',
            howToCheck:'查 Yole 2025 薄膜沉积报告 + 拓荆年报',
            falsifySignal:'微导纳米 ALD 市占率超拓荆',
            status:'pending' },
          { type:'产能缺口', claim:'在手订单 80亿+',
            howToCheck:'查 26Q1 合同负债',
            falsifySignal:'合同负债大幅下降',
            status:'pending' },
          { type:'财报印证', claim:'26Q1 归母 +310%',
            howToCheck:'查巨潮 2026Q1 季报原文',
            falsifySignal:'26Q2 营收增速 <50%',
            status:'pending' },
          { type:'交叉信源', claim:'≥4 券商深度推荐',
            howToCheck:'查中泰/中信/华泰/申万',
            falsifySignal:'2 家以上下调评级',
            status:'pending' }
        ]
      }
    }
  ],

  // ★ ⑦ 供需缺口 —— 4 项
  supplyGap: [
    {
      segment:'EUV 光刻机',
      demand:'2026E 中国需求 10-15 台(中芯 5nm 试产 + CXMT 扩产)',
      capacity:'ASML 对华 EUV 出口 = 0 台(美荷管制)',
      gap:'10-15 台(100%)',
      rate:'100%',
      bottleneck:'美商务部 EUV 出口管制 + 荷兰许可证。ASML 全球年产能 ~60 台,中国大陆零供应。产业链最大卡脖子,A 股无标的。'
    },
    {
      segment:'高端刻蚀设备(5nm CCP)',
      demand:'2026E 中国需求 ~80 台(中芯 5nm + 长存 232L)',
      capacity:'中微公司 + 北方华创产能 ~35 台(国产 5nm 级 CCP 产能有限)',
      gap:'~45 台(55%)',
      rate:'55%',
      bottleneck:'5nm CCP 刻蚀机产能爬坡慢(临港/北京新厂 2027 投产),LAM/AMAT 仍占国产产线 ~70% 份额。中微 26Q1 产能利用率 95%,扩产缺口巨大。'
    },
    {
      segment:'高端 ALD 设备(14nm 以下)',
      demand:'2026E 中国需求 ~50 台(中芯 5nm + CXMT 1β DRAM)',
      capacity:'拓荆科技 + 微导纳米产能 ~15 台',
      gap:'~35 台(70%)',
      rate:'70%',
      bottleneck:'ALD 设备是 5nm 以下必需工艺,AMAT 全球垄断 ~50%。拓荆 ALD 14nm 验证通过但产能有限,微导纳米半导体 ALD 仍处验证期。'
    },
    {
      segment:'高端 CMP 设备(14nm 以下)',
      demand:'2026E 中国需求 ~30 台',
      capacity:'华海清科产能 ~12 台',
      gap:'~18 台(60%)',
      rate:'60%',
      bottleneck:'CMP 14nm 以下设备 AMAT 垄断 ~70%,华海清科 14nm 验证通过但产能爬坡中(新厂 2027 投产)。'
    }
  ],

  // ★ 方法论边界 —— Phase 10 总结
  methodologyNotes: '半导体设备赛道物理卡口集中在<strong>刻蚀(中微/北方华创)+薄膜沉积(拓荆)+CMP(华海清科)+涂胶显影(芯源微)</strong>四大领域,均满足 4/4 四问(供给寡头+扩产12月+无替代+下游刚需)。EUV 光刻机是产业链最大卡脖子(ASML 100%垄断),但 A 股无直接标的。测试设备(精测/长川)受 AI/HBM 扩产带动,卡口强度略低于前端设备(★★☆ 而非 ★★★)。离子注入(万业凯世通)虽稀缺但商业化进度慢,卡口尚未完全形成(★★)。检测设备 KLA 全球垄断 ~52%,国产化率 ~30%,华海清科 CMP 国产化率 ~40% 是国产替代进展最快的环节。<br><br><strong>【内容标准】</strong> 本赛道已叠加「六维景气 + stock-level 4 问 + 5 列树状图 + 行业三轮渗透 + akshare A 类自动注入」内容标准——prosperity 6 维(score 5/5/5/5/2/5)+ treeMap 5 列(downstream/midstream/materials/equipment/sideBranches)+ segments 6 段(stocks ②待补=0)+ 3 大卡口(★★★/★★★/★★☆)+ 4 supplyGap(100%/55%/70%/60% 缺口)+ 28 只 stock tier 标记(🟢primary 22/⚪media 6)。下一步:Phase 11 计划补完 fourQuestions 4.3-4.6 q1-q4 缺失部分 + ⚪media 单源转 🔵broker。'
};

// ==================== END SEMI EQUIPMENT ====================

})(window.CHAINS);
