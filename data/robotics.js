// data/robotics.js — 升级九 STEP 4 小步 2：ROBOTICS (人形机器人) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.robotics 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== ROBOTICS ====================
CHAINS.robotics = {
  id: 'robotics', name: '人形机器人', icon: '🤖',
  plainIntro: {
    analogy: '人形机器人 = "会走路的智能手机"——它不是一个硬件，是把AI大脑装进人类身体',
    paragraphs: [
      '2026年是人形机器人从"概念炒作"到<strong>"量产兑现"</strong>的转折年。特斯拉Optimus Gen3上半年定型量产，宇树科技6月IPO上会，国内整机企业超140家，年出货量1.44万台，全球占比84.7%。一台人形机器人约50万元成本——<strong>核心零部件占60%以上</strong>，整机制造反而不怎么赚钱（宇树利润已腰斩）。产业链价值分布：<strong>上游吃肉、中游跑量、下游落地</strong>。',
      '<strong>人形机器人和工业机器人有什么本质区别？</strong>工业机器人（机械臂）在固定位置重复单一动作，核心是减速器+伺服电机。人形机器人要能走、能抓、能感知环境——多了<strong>行星滚柱丝杠（线性执行器）、六维力传感器（触觉）、IMU（平衡感）、灵巧手（精细操作）</strong>四大增量。这些零部件A股大部分有标的，而且技术壁垒比工业机器人高出1-2个数量级。'
    ],
    flowSteps: ['AI大脑→芯片+算法','感知层→六维力传感器+IMU+3D视觉','执行层→丝杠+减速器+电机','灵巧手→微型电机+电子皮肤','关节模组→集成组装','整机→特斯拉Optimus/宇树/傅利叶'],
    highlightBox: '<strong>💡 物理卡口 视角：人形机器人产业目前无绝对寡头，但有几个"潜在卡口"值得跟踪：</strong><br>① <strong>行星滚柱丝杠</strong>：特斯拉Optimus核心传动部件，精度要求相当于发丝的1/100，全球能批量供货的企业<5家。恒立液压已小批量供货。② <strong>六维力传感器</strong>：柯力传感A股唯一量产，2026产能10万套，送样50家客户。③ <strong>谐波减速器</strong>：绿的谐波国产绝对龙头，单价打到1300元（日本哈默纳科一半），特斯拉供应链。但以上环节尚处"0→1"阶段，需跟踪订单兑现。'
  },
  overview: [
    { label: '🤖 全球市场（2030E）', value: '~$260亿', note: '特斯拉Optimus年产百万台', color: 'var(--accent)' },
    { label: '🇨🇳 中国出货量（2025）', value: '1.44万台', note: '全球占比84.7%，>140家整机企业', color: 'var(--blue)' },
    { label: '🔩 行星滚柱丝杠需求(2029E)', value: '~1400万根', note: '单台14-28根·市场112亿元', color: 'var(--red)' },
    { label: '🏭 产业阶段', value: '0→1爆发前夜', note: '特斯拉Gen3定型·宇树IPO上会6月', color: 'var(--green)' },
    { label: '💰 成本分布', value: '电机30%+减速器19%', note: '传感器12%+丝杠15%+整机25%', color: null },
    { label: '⚡ 核心催化', value: '特斯拉Optimus Gen3', note: '上半年量产·供应链定点加速', color: null },
    { label: '🔴 核心矛盾', value: '0→1→业绩未兑现', note: '多数丝杠/传感器企业Q1尚未体现', color: 'var(--red)' },
    { label: '📋 六维力传感器', value: '国产单价2.7万/颗', note: '仅为海外1/4·柯力A股唯一量产', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: '工业制造·仓储物流·家庭服务·医疗', barrier: 'low', note: '工业先行→特斯拉工厂内应用→2027+家庭场景' },
    midstream: { name: '整机制造（特斯拉/宇树/傅利叶/优必选/小鹏等140+家）', barrier: 'low', note: '充分竞争·价格战已开启→宇树利润腰斩·无卡口' },
    equipment: [
      { name: '行星滚柱丝杠（线性执行器）', barrier: 'extreme', choke: true, note: '全球能批量<5家·恒立液压小批量供货' },
      { name: '六维力/力矩传感器', barrier: 'extreme', choke: true, note: '柯力传感A股唯一量产·毛利率40-45%' },
      { name: '谐波减速器', barrier: 'extreme', choke: false, note: '绿的谐波国产绝对龙头·特斯拉供应链' }
    ],
    materials: [
      { name: '空心杯电机/无框力矩电机', barrier: 'high', choke: false, note: '鸣志电器/鼎智科技→灵巧手核心动力' },
      { name: 'IMU惯性测量单元', barrier: 'high', choke: false, note: '芯动联科→人形姿态控制必需品' },
      { name: '电子皮肤/触觉传感器', barrier: 'high', choke: false, note: '汉威科技→灵巧手精密操作' }
    ],
    sideBranches: [
      { name: 'RV减速器（双环传动）', barrier: 'high', note: '关节扭转执行核心·国产化率提升中' },
      { name: '人形机器人整机(宇树)→6月IPO', barrier: 'mid', note: '整机竞争激烈·A股无纯正标的' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// Robotics Segments
CHAINS.robotics.segments = [
  {
    name: '行星滚柱丝杠 — 线性执行器核心"肌肉"', costRatio: '整机~15%', barrier: 'extreme', choke: true, border: true,
    intro: '行星滚柱丝杠是把<strong>旋转运动→直线运动</strong>的精密传动件，是人形机器人区别于工业机器人的<strong>核心增量部件</strong>。单台人形机器人需14-28根全套丝杠，价值量极高。精度要求：导程误差<1μm（相当于发丝的1/100），寿命要求>10000小时——普通工业丝杠<strong>完全无法满足</strong>。全球能批量供应人形机器人丝杠的企业<5家（日本THK/NSK+欧洲SKF+中国恒立液压/鼎智科技）。',
    globalLandscape: [
      { lbl: '🥇 THK+NSK（日）', val: '日本精密丝杠双寡头', note: '人形机器人丝杠标准制定者' },
      { lbl: '🥈 恒立液压（中）', val: '行星滚柱丝杠已小批量供货', note: '2026Q1营收32.1亿+32.5%' },
      { lbl: '🥉 鼎智科技（中）', val: '丝杠国产先锋', note: '送样特斯拉/优必选·等待定点' },
      { lbl: '五洲新春/北特科技（中）', val: '丝杠/轴承双线布局', note: '已进头部整机厂供应链' }
    ],
    stocks: [
      { rank:1, name:'恒立液压', code:'601100', position:'国产唯一批量供货机器人丝杠', barrier:'极高', hits:3, strength:'★★☆', logic:'工程机械液压件龙头转型。丝杠技术同源。Q1营收32.1亿+32.5%。但机器人丝杠收入占比尚<5%→短期弹性有限' },
      { rank:2, name:'鼎智科技', code:'873593', position:'行星滚柱丝杠国产先锋', barrier:'高', hits:null, strength:null, logic:'送样特斯拉/优必选。纯正机器人丝杠标的。但量产节奏不确定' },
      { rank:3, name:'五洲新春', code:'603667', position:'丝杠/轴承双线', barrier:'中', hits:null, strength:null, logic:'浙商证券重点关注。已进头部整机厂供应链' }
    ]
  },
  {
    name: '六维力传感器 — 机器人的"触觉神经"', costRatio: '整机~8%', barrier: 'extreme', choke: true, border: true,
    intro: '六维力/力矩传感器能同时感知三个方向的力和三个方向的力矩，是人形机器人实现<strong>精密力控操作（拧螺丝、端水杯等）</strong>的必需品。单台价值约8000元。国产单价约2.7万元/颗，仅为海外产品的1/4~1/3。核心瓶颈：<strong>解耦算法+应变片工艺壁垒极高</strong>，全球能批量供货企业<5家。柯力传感是A股唯一量产企业，2026年产能10万套，订单排至2027年。',
    globalLandscape: [
      { lbl: '🥇 ATI（美）+HBM（德）', val: '全球六维力传感器双寡头', note: '单价>10万/颗' },
      { lbl: '🥈 柯力传感（中）', val: 'A股唯一量产·产能10万套/年', note: '2025出货量+120%·订单排至2027' },
      { lbl: '🥉 安培龙/东华测试（中）', val: '募资/技术布局中', note: '已送样/小批量阶段' }
    ],
    stocks: [
      { rank:1, name:'柯力传感', code:'603662', position:'A股唯一六维力传感器量产', barrier:'极高', hits:4, strength:'★★★', logic:'2026产能10万套。毛利率40-45%。一次送样50家客户。2025出货量+120%。2026年稳健策略首选标的之一' },
      { rank:2, name:'安培龙', code:'301413', position:'募资六维力传感器产业化', barrier:'高', hits:null, strength:null, logic:'已进入送样/小批量阶段。但量产节点尚不明确' },
      { rank:3, name:'汉威科技', code:'300007', position:'电子皮肤+六维力双线', barrier:'高', hits:null, strength:null, logic:'电子皮肤是触觉传感器前沿方向。但六维力传感器尚处研发阶段' }
    ]
  },
  {
    name: '谐波减速器 — 关节"肌腱"', costRatio: '整机~19%', barrier: 'extreme', choke: false, border: false,
    intro: '谐波减速器是机器人关节的核心传动件，单台人形机器人需20-30个。国产格局：<strong>绿的谐波</strong>一家独大（国产市占>60%），已将单价打到1300元（日本哈默纳科一半）。2026产能扩至<strong>30万</strong>台（人形专用占比约40%）。Q1营收1.40亿+42.96%，净利3263万+61.17%。卡口判定：全球≥5家→非绝对寡头，但国产龙头地位稳固。',
    globalLandscape: [
      { lbl: '🥇 哈默纳科（日）', val: '全球谐波减速器龙头', note: '单价~2600元，产能不足' },
      { lbl: '🥈 绿的谐波（中）', val: '国产市占>60%', note: '单价1300元（日系一半）·产能30万台' }
    ],
    stocks: [
      { rank:1, name:'绿的谐波', code:'688017', position:'国产谐波减速器绝对龙头·特斯拉供应链', barrier:'极高', hits:3, strength:'★★☆', logic:'Q1营收1.40亿+43%/净利3263万+61%。2026产能30万台。213亩新厂区建设中。已进入特斯拉供应链' },
      { rank:2, name:'中大力德', code:'002896', position:'全品类减速器(谐波+RV+行星)', barrier:'高', hits:null, strength:null, logic:'宇树/智元供应商。全品类布局降低技术路线风险' }
    ]
  },
  {
    name: '空心杯电机/灵巧手动力', costRatio: '整机~10%', barrier: 'high', choke: false, border: false,
    intro: '灵巧手每根手指需要1-2颗微型电机驱动，单台机器人需<strong>12-30颗空心杯电机</strong>。空心杯电机功率密度是传统电机的3-5倍，体积缩小60%——这是手指空间限制下的<strong>唯一选择</strong>。但全球供应商>10家→不构成寡头卡口。',
    globalLandscape: [
      { lbl: '鸣志电器（中）', val: '混合式步进电机全球TOP3', note: '空心杯电机进特斯拉供应链' },
      { lbl: '鼎智科技（中）', val: '微型传动系统', note: '灵巧手微型模组布局' }
    ],
    stocks: [
      { rank:1, name:'鸣志电器', code:'603728', position:'空心杯电机国内龙头·特斯拉供应链', barrier:'高', hits:null, strength:null, logic:'混合式步进全球TOP3。灵巧手电机已进特斯拉供应链。但全球>10家→非寡头' },
      { rank:2, name:'鼎智科技', code:'873593', position:'丝杠+微型电机双线', barrier:'中', hits:null, strength:null, logic:'灵巧手微型传动模组布局。但竞争格局分散' }
    ]
  }
];

// Robotics Four Questions
CHAINS.robotics.fourQuestions = {
  segments: [
    {
      name: '行星滚柱丝杠',
      stocks: [
        { name:'恒立液压', code:'601100', q1:true, q1note:'全球<5家批量', q2:true, q2note:'精密丝杠扩产>12月', q3:true, q3note:'精度/寿命要求无法替代', q4:true, q4note:'Optimus核心传动件', hits:4, strength:'★★★' },
        { name:'鼎智科技', code:'873593', q1:false, q1note:'全球≥5家', q2:true, q2note:'', q3:false, q3note:'THK/NSK可替', q4:true, q4note:'', hits:2, strength:null }
      ]
    },
    {
      name: '六维力传感器',
      stocks: [
        { name:'柯力传感', code:'603662', q1:true, q1note:'A股唯一量产', q2:true, q2note:'扩产12月+', q3:true, q3note:'算法壁垒极高', q4:true, q4note:'精密操作刚需', hits:4, strength:'★★★' }
      ]
    },
    {
      name: '谐波减速器',
      stocks: [
        { name:'绿的谐波', code:'688017', q1:true, q1note:'国产市占>60%', q2:true, q2note:'扩产30万台', q3:false, q3note:'哈默纳科/中大力德等可替', q4:true, q4note:'机器人关节刚需', hits:3, strength:'★★☆' }
      ]
    },
    {
      name: '空心杯电机（竞争分散）',
      stocks: [
        { name:'鸣志电器', code:'603728', q1:false, q1note:'全球>10家', q2:false, q2note:'', q3:false, q3note:'Maxon/Faulhaber可替', q4:true, q4note:'', hits:1, strength:null }
      ]
    }
  ]
};

// Robotics Choke Points
CHAINS.robotics.chokePoints = [
  { rank:1, name:'恒立液压', code:'601100', segment:'行星滚柱丝杠', strength:'★★★', logic:'全球<strong><5家</strong>能批量供应人形机器人行星滚柱丝杠。精度要求<1μm、寿命>10000小时——工业丝杠无法替代。特斯拉Optimus核心传动件（每台14-28根）。Q1营收32.1亿+32.5%。但机器人丝杠收入占比<5%→短期弹性有限。', tags:['全球<5家','特斯拉Optimus核心','<1μm精度','收入占比尚小'] },
  { rank:2, name:'柯力传感', code:'603662', segment:'六维力传感器', strength:'★★★', logic:'A股<strong>唯一</strong>量产六维力传感器。毛利率40-45%。2026产能10万套。订单排至2027年。国产单价仅为海外1/4。六维力传感器是精密力控操作（拧螺丝/端水杯）的必需品→没有它机器人就是"暴力机器"。', tags:['A股唯一量产','毛利率40%+','订单排至2027','海外价格4x'] },
  { rank:3, name:'绿的谐波', code:'688017', segment:'谐波减速器', strength:'★★☆', logic:'国产<strong>绝对龙头</strong>（市占>60%）。单价仅为日本一半。特斯拉供应链核心。2026产能30万台。但全球≥5家→非独家寡头。谐波减速器的"卡口"在于品牌信任和产能规模，而非物理垄断。', tags:['国产市占>60%','特斯拉供应链','产能30万台','非独家寡头'] }
];
CHAINS.robotics.supplyGap = [
  { segment:'行星滚柱丝杠', demand:'2029E~1400万根(含工业)', capacity:'全球<5家可批量', gap:'缺口>80%(2026)', rate:'>80%', bottleneck:'精密磨削设备+工艺Know-how' },
  { segment:'六维力传感器', demand:'2026E~50万套（含工业）', capacity:'国产~15-20万套', gap:'~30万套', rate:'~60%', bottleneck:'解耦算法+应变片工艺' }
];
CHAINS.robotics.methodologyNotes = '人形机器人2026年最大特征：0→1爆发前夜，但多数标的业绩尚未体现。行星滚柱丝杠和六维力传感器最接近"卡口"标准，但需要等订单兑现。与PCB/半导体的成熟卡口不同，机器人是"前瞻性卡口"——全球供应商确实极少、技术壁垒确实极高、下游需求确实刚需，但行业本身还没有大规模放量。建议把关注点放在"是否获得特斯拉Optimus/宇树/优必选定点"上——这是验证卡口真伪的核心指标。';


})(window.CHAINS);
