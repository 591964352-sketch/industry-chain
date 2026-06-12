// data/ai-full-chain.js — 升级九 STEP 4 小步 2：AI 全产业链 (Meta-Sector 整合视图) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.ai-full-chain 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== AI 全产业链（Meta-Sector） ====================
CHAINS['ai-full-chain'] = {
  id: 'ai-full-chain', name: 'AI 全产业链', icon: '🧠',
  plainIntro: {
    analogy: 'AI = 计算 × 存储 × 互联 × 供电 × 散热 — 五个物理维度，缺一不可',
    paragraphs: [
      '普通投研从"AI服务器出货量"开始分析。我们换个角度——<strong>从物理定律出发，把AI产业链拆成五个不可再拆的基本维度</strong>：',
      '<strong>计算（Compute）</strong>：GPU = 晶体管密度 × 芯片面积 × 架构效率。物理极限：3nm以下量子隧穿效应，单芯片面积受光罩尺寸约束→Chiplet是唯一路径→<strong>先进封装成为卡口</strong>。',
      '<strong>存储（Memory）</strong>：HBM = 3D堆叠 × 带宽密度。物理极限：TSV微凸点间距≤45μm→<strong>混合键合成为卡口</strong>。DRAM工艺与逻辑工艺不兼容→存储芯片必须独立制造。',
      '<strong>互联（Interconnect）</strong>：带宽 = 通道数 × 每通道速率 / 距离。物理极限：铜的RC延迟在224Gbps触顶→224G以上必须转向光互联。<strong>硅是间接带隙半导体→不能高效发光→必须用III-V族（InP/GaAs）→化合物半导体成为卡口。</strong>',
      '<strong>供电（Power）</strong>：GB300单机柜功耗~140kW。物理极限：传统UPS转换效率~92%，HVDC可达98%。BBU超级电容响应速度<1ms，锂电池>10ms。',
      '<strong>散热（Cooling）</strong>：热力学第二定律不可违反。单相液冷散热密度~50kW/rack，风冷~20kW/rack→<strong>液冷是120kW+机柜的刚需，不是选项</strong>。'
    ],
    flowSteps: ['物理定律','计算(晶体管×面积×架构)','存储(带宽×容量/功耗)','互联(带宽×距离/衰减)','供电(功率密度×效率)','散热(热密度/冷媒)','→ 五维满足 → AI集群成立'],
    highlightBox: '<strong>💡 第一性原理的核心贡献</strong>：把"AI产业链"从行业术语翻译成物理约束——<strong>硅不能发光→光子学必须用III-V族、铜RC延迟触顶→224G以上必光进铜退、热力学第二定律→液冷不是选项是必须</strong>。这三个物理事实不随英伟达架构升级、不随中美博弈变化、不随市场情绪波动——它们是方法论的"地基"。<br><br><strong>🔑 关键推论</strong>：AI产业链最大卡口不在A股——GPU（英伟达>80%）、HBM（海力士/三星/美光）、CoWoS（台积电垄断）、EUV光刻机（ASML 100%）——全球寡头都不是A股上市公司。A股能抓的卡口是：<strong>卖铲人</strong>（北方华创/拓荆）、<strong>材料商</strong>（东材科技/菲利华/铜冠铜箔/南大光电）、<strong>组件卡口</strong>（英维克/沃尔核材/源杰科技）。'
  },
  overview: [
    { label:'🌍 全球AI芯片市场(2026E)', value:'~$1650亿', note:'GPU+ASIC+FPGA，英伟达>80%', color:'var(--accent)' },
    { label:'🖥️ AI服务器出货(2026E)', value:'GB300 5.5-8.5万台', note:'Vera Rubin H2接棒，价值量再翻倍', color:'var(--green)' },
    { label:'💰 AI数据中心CapEx(2026E)', value:'$3000亿+', note:'北美四巨头+中国BAT，+45% YoY', color:'var(--blue)' },
    { label:'🧠 HBM市场规模(2026E)', value:'$300亿+', note:'占DRAM总营收30%+，海力士>50%', color:'var(--accent)' },
    { label:'🔴 A股可抓卡口标的', value:'~10个', note:'集中在材料+组件+设备环节', color:'var(--red)' },
    { label:'⚠️ 不在A股的核心卡口', value:'GPU/HBM/CoWoS/EUV', note:'全球寡头均非A股上市（最大遗憾）', color:'var(--red)' },
    { label:'⚡ 核心驱动', value:'Scaling Law + Rubin架构', note:'英伟达年更架构→硬件迭代加速', color:null },
    { label:'📋 A股投资逻辑', value:'卖铲人+材料+组件', note:'东材/菲利华/铜冠/沃尔/英维克/源杰/北方华创/华大九天', color:'var(--green)' }
  ],
  treeMap: {
    downstream: { name:'AI应用层：Agent·代码助手·AI搜索·办公·自动驾驶·科学研究', barrier:'low', note:'软件/服务驱动→类卡口（数据+生态+用户粘性），详见 AI应用 赛道' },
    systemAssembly: { name:'AI服务器整机 (ODM/OEM/JDM)', barrier:'low', note:'工业富联(GB300独家)·浪潮·华勤→CR5<40%→充分竞争·无卡口' },
    // 物理维度1：计算
    computeLabel: '▼ 物理维度①：计算 — GPU/HBM/先进封装',
    compute: [
      { name:'GPU/AI芯片', barrier:'extreme', choke:true, note:'英伟达>80%垄断(不在A股)·寒武纪/海光国产替代·华为昇腾(非上市)' },
      { name:'HBM高带宽存储', barrier:'extreme', choke:true, note:'海力士50%+三星35%+美光15%(均不在A股)·长鑫存储(未上市)' },
      { name:'先进封装 CoWoS', barrier:'extreme', choke:true, note:'台积电垄断(不在A股)·长电/通富代工溢出·拓荆混合键合(A股✓)' }
    ],
    // 物理维度2：互联
    interconnectLabel: '▼ 物理维度②：互联 — 铜连接 + CPO光互联',
    interconnect: [
      { name:'铜连接(224G/448G背板)', barrier:'extreme', choke:true, note:'安费诺一供·沃尔核材(A股✓)224G全球24%·博创AEC' },
      { name:'CPO/硅光引擎', barrier:'extreme', choke:true, note:'CW激光器源杰科技(A股✓)国内唯一100mW量产·中际旭创全球龙头(非卡口)' }
    ],
    // 物理维度3+4：供电+散热
    pcLabel: '▼ 物理维度③④：供电 + 散热 — 机柜级基础设施',
    pc: [
      { name:'液冷散热(CDU/冷板)', barrier:'high', choke:true, note:'英维克(A股✓)国内唯一NPN Tier1·高澜/申菱跟随' },
      { name:'BBU/超级电容', barrier:'high', choke:true, note:'江海股份(A股✓)全球仅3家认证·麦格米特HVDC' }
    ],
    // 上游制造
    mfgLabel: '▼ 上游制造：半导体设备 + EDA — 国产替代主战场',
    manufacturing: [
      { name:'半导体设备(刻蚀/薄膜/清洗)', barrier:'extreme', choke:true, note:'北方华创(A股✓)国内唯一平台型·全球第5·中微刻蚀·拓荆薄膜' },
      { name:'EDA设计工具', barrier:'extreme', choke:true, note:'Synopsys/Cadence/西门子81%·华大九天(A股✓)国内唯一全流程' },
      { name:'晶圆制造(7nm以下)', barrier:'extreme', choke:false, note:'台积电56%+三星(不在A股)·中芯国际(A股✓)但制程落后→非卡口' }
    ],
    // 上游材料
    matLabel: '▼ 上游材料：物理卡口最密集区 — 全球≤3家的"物质基础"',
    materials: [
      { name:'M9碳氢树脂', barrier:'extreme', choke:true, note:'全球仅2家·东材科技(A股✓)国内唯一·缺口63%' },
      { name:'Q布/石英纤维布', barrier:'extreme', choke:true, note:'菲利华(A股✓)全球~80%绝对龙头·缺口>40%' },
      { name:'HVLP4铜箔', barrier:'extreme', choke:true, note:'日韩四强85%·铜冠铜箔(A股✓)国内唯一全系列·缺口23%' },
      { name:'ArF光刻胶', barrier:'extreme', choke:true, note:'日本70%+·南大光电(A股✓)国内唯一量产·缺口~98%' },
      { name:'ABF载板膜', barrier:'extreme', choke:true, note:'味之素垄断97%(不在A股)·华正新材CBF膜对彪(A股✓)' }
    ]
  },
  // 苏格拉底六问
  socraticInquiry: {
    intro: '在拆解 AI 产业链之前，先用苏格拉底六步法追问市场共识——哪些"常识"其实是未经检验的假设？',
    questions: [
      { step:'① 澄清', question:'「AI算力需求会持续爆发」——你说的"算力"具体指什么？训练还是推理？2年还是10年？', challenge:'训练需求可能见顶（Scaling Law边际递减、数据墙），但推理需求（Agent/自动驾驶/科学计算）长期CAGR>50%，是真正的长期驱动。训练和推理的硬件需求不同——训练重HBM带宽，推理重内存容量。' },
      { step:'② 追问假设', question:'「GPU是AI芯片的唯一选择」——这个结论建立在什么前提上？', challenge:'CUDA生态壁垒是GPU的真正护城河，不是芯片本身。ASIC（Google TPU/华为昇腾）在特定场景效率比GPU高5-10倍。一旦软件生态成熟，ASIC可能蚕食GPU份额。但CUDA有15年积累——这个假设短期内仍成立。' },
      { step:'③ 追问证据', question:'「光互连是AI集群的瓶颈」——有什么反面证据？', challenge:'铜连接（224G/448G）在3米内竞争力极强——英伟达GB300用了大量铜背板。正交背板架构+448G铜缆可能将光互联的大规模部署推迟到2028年。反面证据充分→CPO是方向但timing不确定。' },
      { step:'④ 换视角', question:'「GPU/CoWoS/HBM/EUV四大卡口都不在A股，所以A股没机会」——反对这个观点的人会怎么说？', challenge:'AI需求增长→GPU出货量暴增→PCB/CCL/铜箔/树脂/液冷/铜连接所有配套都在暴增。AI不是一只股票，而是一个生态系统。卖铲人+材料商+组件卡口在A股有真标的，且业绩Q1已兑现（东材+103%/生益+105%/源杰+1153%/北方华创+25.8%）。' },
      { step:'⑤ 追问后果', question:'「如果Scaling Law失效了」——对AI产业链意味着什么？', challenge:'Pre-training Scaling可能放缓，但推理时Scaling（o1/o3/o4范式）刚刚开始→推理集群需求爆发。即使训练集群增速放缓，GPU/HBM/光模块/液冷的总盘子仍在扩大，只是增速从100%降到50%。产业链的物理卡口逻辑不因增速变化而失效。' },
      { step:'⑥ 回到原问题', question:'我们一开始到底要解决什么问题？', challenge:'不是「AI产业链哪些环节会涨」——那是算命。我们要找的是「<strong>哪些环节无论谁赢（英伟达or华为or自研）、无论什么架构（铜or光）、无论什么路线（训练or推理），都必须用且供给不可复制</strong>」。答案是：物理定律约束下的上游材料+核心设备+特定组件。' }
    ],
    conclusion: '经过六步追问，AI产业链的确定性不在"哪个技术路线会赢"，而在<strong>三个不可绕过的物理约束</strong>：①硅不能高效发光→光子学必用III-V族化合物半导体；②铜RC延迟随频率指数上升→224G以上必须光进铜退或换新材料；③热力学第二定律不可违反→液冷是120kW+机柜的刚需。这三个物理事实不随架构升级、不随中美博弈、不随市场情绪变化——它们是Serenity方法论的第一性原理锚点。'
  },
  // 奥卡姆剃刀
  occamRazor: {
    intro: '奥卡姆剃刀三原则：①实体最小化（能不引入新概念就不引入）；②假设最简化（假设越少，出错面越小）；③简单优先（两个解释同样好→选更简单的）。以下逐层修剪AI产业链，剃掉所有充分竞争/可替代环节。',
    cuts: [
      { layer:'AI服务器整机制造', verdict:'✂️ 剃掉', cls:'cut', reason:'全球>10家ODM/OEM（工业富联/浪潮/华勤/广达/纬创/英业达）→客户可切换供应商→不满足"不可替代"。头部企业非常优秀但非卡口——奥卡姆剃刀第一刀。' },
      { layer:'光模块组装', verdict:'✂️ 剃掉', cls:'cut', reason:'中际旭创/新易盛/光迅科技/华工科技/Finisar/AAOI→全球>10家→充分竞争。光模块的"卡口"不在组装本身，而在上游CW激光器（全球<5家）。剃掉组装，保留激光器。' },
      { layer:'PCB制造', verdict:'✂️ 剃掉', cls:'cut', reason:'全球100+家→无寡头。胜宏科技（显卡PCB全球~55%）和沪电股份（78层背板）非常优秀，但客户可以切给其他PCB厂→不构成物理卡口。上游材料（CCL/树脂/Q布/铜箔）才是真正的卡口。' },
      { layer:'晶圆制造', verdict:'✂️ 剃掉（A股视角）', cls:'cut', reason:'台积电56%全球份额→是物理卡口但不在A股。中芯国际制程落后（N+2≈7nm）→不满足"不可替代"。保留半导体设备商（北方华创/中微/拓荆）→卖铲人逻辑成立。' },
      { layer:'传统DRAM/NAND', verdict:'✂️ 剃掉', cls:'cut', reason:'全球>5家（三星/海力士/美光/铠侠/WD/长存）→非寡头。HBM是卡口但三星/海力士/美光均不在A股。保留混合键合设备商（拓荆科技）→HBM封装的核心设备卖铲人。' },
      { layer:'中低压功率器件', verdict:'✂️ 剃掉', cls:'cut', reason:'全球>20家MOSFET/IGBT供应商→充分竞争。SiC衬底是卡口（天岳先进/天科合达）但已在功率半导赛道覆盖→不重复。' }
    ],
    keepers: '经奥卡姆剃刀六刀修剪后，AI产业链从5000+标的被剃到<strong>~15个真正不可绕过的环节</strong>。保留的核心逻辑：上游材料（5个）+核心设备（3个）+特定组件（4个）+芯片（2个国产替代）。这些保留标的进入Serenity四问筛选。'
  },
  segments: [
    {
      name:'算力核心层：GPU + HBM — AI的"大脑+短期记忆"', costRatio:'AI服务器BOM 60-70%', barrier:'extreme', choke:true, border:true,
      intro:'GPU和HBM是AI算力栈的绝对核心。英伟达GPU全球市占>80%，HBM被海力士(50%+)/三星(35%)/美光(15%)三家垄断。<strong>核心矛盾：全球寡头均不在A股上市。</strong>A股只能抓两条替代逻辑：①国产AI芯片（寒武纪/海光信息）→性能差距仍大但地缘风险下不得不选；②先进封装设备（拓荆科技/长电科技）→CoWoS/SHRINK由台积电垄断，但国产封测链在追赶。',
      globalLandscape: [
        { lbl:'🥇 英伟达（美）', val:'GPU/AI芯片>80%全球份额', note:'B300/Rubin架构年更，CUDA生态壁垒15年' },
        { lbl:'🥈 海力士+三星+美光', val:'HBM全球100%垄断', note:'海力士HBM3E 50%+市占，12Hi 2026Q3量产' },
        { lbl:'🥉 寒武纪+海光信息（A股）', val:'国产AI芯片仅2家上市', note:'寒武纪思元系列Q1营收+4230%，海光深算DCU对标A100' },
        { lbl:'华为昇腾（非上市）', val:'国产AI芯片最强选手', note:'昇腾910C已批量供货，但华为不在A股→抓产业链配套' }
      ],
      stocks: [
        { rank:1, name:'寒武纪', code:'688256', position:'国产AI芯片唯一上市GPU标的', barrier:'极高', hits:3, strength:'★★☆', logic:'思元系列AI训练/推理芯片。Q1营收14.26亿+4230%。但全球GPU>5家（英伟达/AMD/Intel/华为/寒武纪）→非绝对寡头。CUDA生态差距大。降级★★☆' },
        { rank:2, name:'海光信息', code:'688041', position:'国产DCU对标A100', barrier:'极高', hits:3, strength:'★★☆', logic:'深算系列DCU兼容ROCm生态。2025营收102亿+52%。x86 CPU+DCU双轮驱动。但AMD MI400+Intel Gaudi竞争→非独家。降级★★☆' },
        { rank:3, name:'景嘉微', code:'300474', position:'国产小型GPU', barrier:'高', hits:null, strength:null, logic:'JM9系列GPU用于图形渲染/边缘AI。不是数据中心级AI芯片→定位不同。' }
      ]
    },
    {
      name:'互联层：铜连接 + CPO光通信 — 数据的"高速公路"', costRatio:'AI集群成本的15-20%', barrier:'extreme', choke:true, border:true,
      intro:'AI集群中数千张GPU需要互相通信。互联层分为<strong>短距铜连接</strong>（3米内，224G/448G背板线缆）和<strong>长距光互联</strong>（>3米，CPO/可插拔光模块）。物理定律决定了铜的RC延迟随频率指数上升→224Gbps以上铜缆衰减严重→必须光进铜退。但448G铜缆的突破将光互联大规模部署推迟到2028年。',
      globalLandscape: [
        { lbl:'🥇 安费诺（美）+沃尔核材（A股）', val:'224G铜缆全球格局', note:'安费诺一供，沃尔全球市占24.2%国内唯一，深度绑定安费诺全系' },
        { lbl:'🥈 Lumentum/源杰科技', val:'CW激光器寡头', note:'源杰国内唯一100mW CW量产，Q1净利+1153%，毛利率77.81%' },
        { lbl:'中际旭创（A股）', val:'全球光模块龙头', note:'Q1营收195亿+192%，净利57.35亿+262%，但光模块制造>10家→非卡口' },
        { lbl:'博创科技（A股）', val:'800G/1.6T AEC铜缆', note:'通过英伟达认证，短距互联光退铜进核心受益' }
      ],
      stocks: [
        { rank:1, name:'沃尔核材', code:'002130', position:'224G铜缆全球24.2%，国内唯一量产', barrier:'极高', hits:4, strength:'★★★', logic:'深度绑定安费诺→间接进英伟达GB200/GB300全系。448G已送样。卡位20余台进口发泡芯线挤出机→产能壁垒极高。2025高速通信线收入10.17亿+238%。' },
        { rank:2, name:'源杰科技', code:'300498', position:'国内唯一100mW CW激光器量产', barrier:'极高', hits:4, strength:'★★★', logic:'Q1营收+321%，净利+1153%。CW激光器全球<5家，毛利率77.81%。100mW仅支持900万支1.6T→缺口>50%。EML良率爬坡是核心催化剂。' },
        { rank:3, name:'博创科技', code:'300548', position:'800G/1.6T AEC铜缆龙头', barrier:'高', hits:3, strength:'★★☆', logic:'通过英伟达认证。短距互联光退铜进核心受益。但也面临光模块回抢份额风险→降级★★☆。' }
      ]
    },
    {
      name:'热管理层：液冷散热 — AI数据中心的"空调"', costRatio:'GB300单机柜散热成本~8-12%', barrier:'high', choke:true, border:false,
      intro:'GB300单机柜功耗~140kW→传统风冷上限~20kW/rack→<strong>液冷是120kW+机柜的刚需</strong>。单相液冷散热密度~50kW/rack，两相浸没液冷可达100kW+。英伟达GB300标配液冷方案，液冷渗透率从2024年<10%提升至2026年>50%。核心壁垒：NPN认证（英伟达合作伙伴网络）→验证周期12-15月。',
      globalLandscape: [
        { lbl:'🥇 英维克（A股）', val:'国内唯一英伟达NPN Tier1液冷供应商', note:'CDU/冷板全栈方案，独占英伟达中国液冷份额>60%' },
        { lbl:'高澜股份/申菱环境', val:'液冷第二梯队', note:'高澜Q1液冷营收+180%，但非NPN Tier1→非独家' }
      ],
      stocks: [
        { rank:1, name:'英维克', code:'002837', position:'国内唯一NPN Tier1液冷', barrier:'极高', hits:4, strength:'★★★', logic:'独家英伟达NPN认证→验证周期12-15月→一旦导入极难替换。CDU+冷板+Manifold全栈方案。Q1液冷营收预计+200%+。GB300标配液冷→2026-2027确定性极高。' },
        { rank:2, name:'高澜股份', code:'300499', position:'液冷CDU第二梯队', barrier:'高', hits:2, strength:null, logic:'Q1液冷营收+180%，但非NPN Tier1→申菱/英维克可替代→非寡头。' }
      ]
    },
    {
      name:'电源层：BBU超级电容 + HVDC — 算力的"心脏供血"', costRatio:'单机柜电源成本~5-8%', barrier:'high', choke:true, border:false,
      intro:'GB300机柜采用48V HVDC供电架构，需要BBU（后备电池单元）超级电容在断电瞬间（<1ms）提供缓冲。传统锂电池响应时间>10ms→会导致GPU掉电→<strong>BBU超级电容是GB300的刚需</strong>。全球仅3家通过AI服务器超容认证。HVDC转换效率98% vs 传统UPS 92%→240kW机柜年省电费~$15万。',
      globalLandscape: [
        { lbl:'🥇 江海股份（A股）', val:'超级电容全球仅3家AI认证', note:'GB300 BBU标配单柜价值5万元，同时受益新能源+AI双驱动' },
        { lbl:'麦格米特（A股）', val:'英伟达HVDC电源合作商', note:'48V HVDC方案直接适配GB300，海外市场拓展中' }
      ],
      stocks: [
        { rank:1, name:'江海股份', code:'002484', position:'超级电容全球仅3家AI认证', barrier:'极高', hits:3, strength:'★★☆', logic:'GB300 BBU标配→单柜价值5万元。全球仅3家通过认证→格局极好。同时受益新能源（光伏逆变器）+AI（BBU）双驱动。但日本Chemi-Con和Maxwell可替代→非独家。降级★★☆。' },
        { rank:2, name:'麦格米特', code:'002851', position:'英伟达HVDC电源合作商', barrier:'高', hits:null, strength:null, logic:'HVDC方案直接适配GB300 48V架构。但供应商可替代→台达/光宝等也有HVDC方案。非寡头。' }
      ]
    },
    {
      name:'制造封测层：CoWoS先进封装 + 半导体设备', costRatio:'芯片制造成本的30-50%', barrier:'extreme', choke:true, border:true,
      intro:'先进封装（CoWoS/SHRINK）是AI芯片从设计到量产的关键环节。台积电CoWoS产能100%垄断英伟达GPU封装→<strong>不在A股</strong>。但国产封测链（长电/通富/华天）在追赶。更关键的卡口在<strong>半导体设备（北方华创/中微/拓荆）和EDA工具（华大九天）</strong>——它们是整个AI芯片制造链条的"卖铲人"。',
      globalLandscape: [
        { lbl:'🥇 ASML（荷兰）+应用材料+Lam', val:'全球半导体设备三巨头', note:'EUV光刻机ASML 100%垄断·刻蚀/薄膜/检测被美日欧瓜分' },
        { lbl:'🥈 北方华创（A股）', val:'国内唯一平台型设备商·全球第5', note:'Q1营收103亿+25.8%，在手订单>650亿排至2027Q3' },
        { lbl:'Synopsys/Cadence/西门子', val:'全球EDA三巨头占81%', note:'华大九天全球第6，国内唯一全流程EDA→国产替代唯一' }
      ],
      stocks: [
        { rank:1, name:'北方华创', code:'002371', position:'国内唯一平台型设备商·全球第5', barrier:'极高', hits:4, strength:'★★★', logic:'覆盖刻蚀/薄膜/清洗/热处理全环节。全球PVD市占12%。Q1营收103亿+25.8%，净利16.35亿。在手订单>650亿→2026-2027业绩确定性极高。设备验证周期18-24月→一旦导入几乎不换。' },
        { rank:2, name:'华大九天', code:'301269', position:'国内EDA绝对龙头·全球第6', barrier:'极高', hits:4, strength:'★★★', logic:'国内唯一全流程EDA+3DIC设计验证。Q1营收2.57亿+9.65%。Synopsys/Cadence/西门子垄断81%→国产替代空间巨大。境外营收+127.5%。短期亏损（研发费用率64.84%）是战略投入。' },
        { rank:3, name:'拓荆科技', code:'688072', position:'PECVD+ALD+混合键合', barrier:'极高', hits:3, strength:'★★☆', logic:'HBM先进封装核心设备（混合键合）。全球仅3-4家→格局极好。但三星/海力士自研设备可部分替代→降级★★☆。PECVD国内龙头+ALD量产。' }
      ]
    },
    {
      name:'材料层：PCB上游 + 半导体材料 — 卡口最密集的"物质基础"', costRatio:'CCL占PCB成本30-40%/光刻胶占晶圆成本~5%', barrier:'extreme', choke:true, border:true,
      intro:'这是AI产业链<strong>物理卡口最密集的一层</strong>——五个环节全球供应商均≤3家，且都在A股有标的。从PCB上游（M9碳氢树脂/Q布/HVLP4铜箔）到半导体材料（ArF光刻胶/ABF载板膜），每一个都是"没它不行、全球没几家能做、扩产12月+"的经典物理卡口。详见 PCB 和 半导体 赛道的独立分析。',
      globalLandscape: [
        { lbl:'🥇 东材科技+JX化学', val:'全球唯二M9碳氢树脂认证', note:'东材国内唯一，缺口63%，眉山2026.6.30投料试产' },
        { lbl:'🥇 菲利华', val:'Q布全球~80%绝对龙头', note:'国内唯一全产业链自主，缺口>40%，台光锁定500-700万米' },
        { lbl:'🥇 铜冠铜箔', val:'国内唯一HVLP1-4全系列量产', note:'锁定10台三船设备(全球70%)，日韩四强垄断85%+' },
        { lbl:'🥇 南大光电', val:'国内唯一ArF光刻胶量产', note:'日本垄断70%+，通过中芯28nm验证，14nm浸没式验证完成' }
      ],
      stocks: [
        { rank:1, name:'东材科技', code:'601208', position:'全球唯二M9碳氢树脂认证', barrier:'极高', hits:4, strength:'★★★', logic:'Q1净利1.87亿+103%。台光独供2-3年排他协议。眉山3500吨2026.6.30投料试产（提前至Q2末）。价格80-120万元/吨，毛利率50%+。缺口63%。' },
        { rank:2, name:'菲利华', code:'300395', position:'Q布全球~80%绝对龙头', barrier:'极高', hits:4, strength:'★★★', logic:'Q1营收6.22亿+53%，净利1.44亿+37%。国产唯一全产业链。已通过英伟达/台积电/台光全链路认证。缺口>40%。毛利55-65%。' },
        { rank:3, name:'铜冠铜箔', code:'301217', position:'国内唯一HVLP1-4全系列量产', barrier:'极高', hits:4, strength:'★★★', logic:'锁定10台三船MSP-8000设备（全球70%）。日韩四强垄断85%+。阴极辊交期18-24月。2026年底全球月缺口~23%。2027市占率预期42%。' },
        { rank:4, name:'南大光电', code:'300346', position:'国内唯一ArF光刻胶量产', barrier:'极高', hits:4, strength:'★★★', logic:'Q1营收6.62亿+5.45%，净利1.24亿+29.97%。通过中芯28nm验证，累计6款ArF通过验证。光刻胶国产化<5%。日本垄断70%+→替代空间20倍。' }
      ]
    }
  ],
  midstream: {
    description: '中游环节（AI服务器整机/光模块组装/PCB制造/晶圆制造）经奥卡姆剃刀修剪后全部判定为充分竞争→不构成物理卡口。头部企业（工业富联/中际旭创/胜宏科技/沪电股份/中芯国际）非常优秀，但客户可切换供应商→不满足Serenity不可替代标准。详见各子赛道的独立分析。',
    stocks: []
  },
  fourQuestions: { segments: [
    { name:'算力核心', stocks:[
      { name:'寒武纪', code:'688256', q1:true, q1note:'国产GPU唯一上市', q2:true, q2note:'芯片验证12月+', q3:false, q3note:'英伟达/AMD/华为可替', q4:true, q4note:'地缘风险下刚需', hits:3, strength:'★★☆' },
      { name:'海光信息', code:'688041', q1:true, q1note:'国产DCU唯二', q2:true, q2note:'', q3:false, q3note:'AMD/Intel可替', q4:true, q4note:'', hits:3, strength:'★★☆' }
    ]},
    { name:'先进封装', stocks:[
      { name:'拓荆科技', code:'688072', q1:true, q1note:'PECVD国内龙头', q2:true, q2note:'设备验证18-24月', q3:false, q3note:'三星/海力士自研可部分替', q4:true, q4note:'HBM封装刚需', hits:3, strength:'★★☆' },
      { name:'长电科技', code:'600584', q1:false, q1note:'全球>10家OSAT', q2:true, q2note:'', q3:false, q3note:'通富/华天可替', q4:true, q4note:'', hits:2, strength:null }
    ]},
    { name:'互联-铜连接', stocks:[
      { name:'沃尔核材', code:'002130', q1:true, q1note:'224G国内唯一量产', q2:true, q2note:'设备交期12月+', q3:true, q3note:'3米内无替代方案', q4:true, q4note:'GB300背板刚需', hits:4, strength:'★★★' },
      { name:'博创科技', code:'300548', q1:true, q1note:'800G AEC认证', q2:true, q2note:'', q3:false, q3note:'光模块可回抢份额', q4:true, q4note:'', hits:3, strength:'★★☆' }
    ]},
    { name:'互联-CPO', stocks:[
      { name:'源杰科技', code:'300498', q1:true, q1note:'全球<5家CW激光器', q2:true, q2note:'EML良率爬坡12月+', q3:true, q3note:'硅光引擎必用外置光源', q4:true, q4note:'1.6T/3.2T刚需', hits:4, strength:'★★★' }
    ]},
    { name:'供电散热', stocks:[
      { name:'英维克', code:'002837', q1:true, q1note:'国内唯一NPN Tier1', q2:true, q2note:'认证12-15月', q3:true, q3note:'热力学定律不可违', q4:true, q4note:'GB300标配液冷', hits:4, strength:'★★★' },
      { name:'江海股份', code:'002484', q1:true, q1note:'全球仅3家认证', q2:true, q2note:'认证12月+', q3:false, q3note:'Chemi-Con/Maxwell可替', q4:true, q4note:'BBU标配', hits:3, strength:'★★☆' }
    ]},
    { name:'上游设备', stocks:[
      { name:'北方华创', code:'002371', q1:true, q1note:'国内平台型唯一', q2:true, q2note:'设备验证18-24月', q3:true, q3note:'多环节全覆盖', q4:true, q4note:'晶圆厂扩产刚需', hits:4, strength:'★★★' },
      { name:'华大九天', code:'301269', q1:true, q1note:'Synopsys/Cadence/西门子81%', q2:true, q2note:'切换周期3-5年', q3:true, q3note:'无替代全流程EDA', q4:true, q4note:'芯片设计刚需', hits:4, strength:'★★★' }
    ]},
    { name:'上游材料', stocks:[
      { name:'东材科技', code:'601208', q1:true, q1note:'全球仅2家认证', q2:true, q2note:'产线建设18月+', q3:true, q3note:'M9必用碳氢树脂', q4:true, q4note:'AI PCB刚需', hits:4, strength:'★★★' },
      { name:'菲利华', code:'300395', q1:true, q1note:'全球~80%龙头', q2:true, q2note:'扩产12月+', q3:true, q3note:'无替代材料', q4:true, q4note:'台光锁定订单', hits:4, strength:'★★★' },
      { name:'铜冠铜箔', code:'301217', q1:true, q1note:'国内唯一全系列', q2:true, q2note:'设备交期18-24月', q3:true, q3note:'M9必须HVLP4', q4:true, q4note:'CCL厂刚需', hits:4, strength:'★★★' },
      { name:'南大光电', code:'300346', q1:true, q1note:'国内唯一ArF量产', q2:true, q2note:'认证1-2年', q3:true, q3note:'日本70%+垄断', q4:true, q4note:'光刻工艺刚需', hits:4, strength:'★★★' }
    ]}
  ]},
  chokePoints: [
    { rank:1, name:'东材科技', code:'601208', segment:'M9碳氢树脂', strength:'★★★', logic:'全球<strong>仅2家</strong>通过英伟达M9碳氢树脂认证。台光独供2-3年排他协议。眉山3500吨<strong>2026年6月30日投料试产</strong>。Q1净利1.87亿+103%。2026年全球缺口<strong>~5000吨（63%）</strong>。价格80-120万元/吨，毛利率50%+。M10树脂已进入客户验证。', tags:['全球双寡头','缺口63%','Q1净利+103%','M10验证中'] },
    { rank:2, name:'菲利华', code:'300395', segment:'Q布/石英纤维布', strength:'★★★', logic:'<strong>Q布全球市占约80%，绝对龙头</strong>。国内唯一全产业链自主。已通过英伟达/台积电/台光全链路认证。台光锁定500-700万米。全球缺口<strong>>40%</strong>。Q1营收6.22亿+53%。毛利率55-65%。', tags:['全球80%龙头','缺口>40%','Q1营收+53%','全链路认证'] },
    { rank:3, name:'铜冠铜箔', code:'301217', segment:'HVLP4铜箔', strength:'★★★', logic:'国内<strong>唯一</strong>HVLP1-4全系列量产。<strong>锁定10台三船MSP-8000设备（全球70%）</strong>，未来3年产能确定性最强。日韩四强垄断85%+。阴极辊设备交期18-24月。2026年底全球月缺口<strong>~23%</strong>。2027市占率预期42%。', tags:['国产唯一','锁定全球70%设备','缺口23%','已量产全系列'] },
    { rank:4, name:'沃尔核材', code:'002130', segment:'224G铜连接', strength:'★★★', logic:'<strong>224G铜缆国内唯一量产</strong>，全球市占24.2%。深度绑定安费诺→间接进英伟达GB200/GB300全系。448G已送样验证。卡位20余台进口发泡芯线挤出机→产能壁垒极高。2025高速通信线收入10.17亿（+238%）。', tags:['国内唯一量产','全球24%','绑定安费诺','448G送样'] },
    { rank:5, name:'英维克', code:'002837', segment:'液冷散热', strength:'★★★', logic:'国内<strong>唯一英伟达NPN Tier1液冷供应商</strong>。CDU+冷板+Manifold全栈方案。GB300标配液冷→单机柜散热成本8-12%。NPN认证周期12-15月→先发优势至少保持2-3年。GB300 5.5-8.5万台→液冷市场空间~$30-50亿。', tags:['独家NPN Tier1','认证12-15月','GB300标配','先发2-3年'] },
    { rank:6, name:'源杰科技', code:'300498', segment:'CW激光器', strength:'★★★', logic:'<strong>国内唯一100mW CW激光器量产</strong>，全球仅Lumentum/源杰/住友等<5家能量产。Q1营收+321%，净利+1153%，毛利率77.81%。100mW仅支持约900万支1.6T→缺口>50%。CPO架构必用外置CW光源→硅光渗透率从40%→75%。', tags:['全球<5家','Q1净利+1153%','毛利率78%','缺口>50%'] },
    { rank:7, name:'北方华创', code:'002371', segment:'半导体设备', strength:'★★★', logic:'国内<strong>唯一平台型半导体设备商</strong>，全球第5。覆盖刻蚀/薄膜/清洗/热处理全环节。Q1营收103亿+25.8%，在手订单>650亿排至2027Q3。设备验证周期18-24月→一旦导入极难替换。国产设备价格低20-40%+中美博弈催化。', tags:['国内唯一平台型','全球第5','订单650亿+','验证周期锁定'] },
    { rank:8, name:'华大九天', code:'301269', segment:'EDA工具', strength:'★★★', logic:'国内<strong>唯一全流程EDA设计平台</strong>，全球第6。Synopsys/Cadence/西门子垄断81%→国产替代空间巨大。3DIC设计验证全流程国内唯一。Q1营收2.57亿+9.65%，境外营收+127.5%。芯片设计必须用EDA→物理刚需。', tags:['三巨头81%垄断','国内唯一替代','3DIC全流程','境外+127.5%'] },
    { rank:9, name:'南大光电', code:'300346', segment:'ArF光刻胶', strength:'★★★', logic:'国内<strong>唯一ArF光刻胶量产</strong>企业。ArF浸没式光刻胶国产化率0-2%。通过中芯28nm验证，14nm浸没式验证完成。日本6家（JSR/TOK/信越/住友/富士/杜邦日本）垄断70%+。认证周期1-2年→导入极难替换。光刻胶是半导体材料壁垒最高品种→配方含数千种组分。', tags:['国内唯一ArF量产','日本70%垄断','14nm验证','数千种组分壁垒'] },
    { rank:10, name:'拓荆科技', code:'688072', segment:'混合键合设备', strength:'★★☆', logic:'HBM先进封装核心设备（混合键合+临时键合+解键合）。全球仅3-4家供应商→格局极好。PECVD国内龙头+ALD/SACVD量产。但三星电子/海力士自研设备可部分替代混合键合→非绝对寡头。HBM扩产潮→2026年设备需求翻倍。', tags:['全球仅3-4家','HBM设备核心','国产PECVD龙头','三星/海力士可部分替'] }
  ],
  supplyGap: [
    { segment:'M9碳氢树脂', demand:'~8,000吨/年(2026E)', capacity:'~3,000吨/年(有效)', gap:'~5,000吨', rate:'~63%', bottleneck:'仅东材+JX化学认证，东材眉山3500吨2026.6.30投料' },
    { segment:'Q布', demand:'~1,500-1,800万米/年', capacity:'~1,000-1,500万米/年', gap:'~300-685万米', rate:'>40%', bottleneck:'菲利华+日东纺产能，扩产需12-18月' },
    { segment:'HVLP4铜箔', demand:'~1,849吨/月(H2)', capacity:'~1,424吨/月', gap:'~425吨/月', rate:'~23%', bottleneck:'阴极辊设备交期18-24月，日本JCU垄断' },
    { segment:'100mW CW激光器', demand:'~2,000万颗/年(2026E)', capacity:'~900万颗/年(有效)', gap:'~1,100万颗', rate:'>50%', bottleneck:'EML良率爬坡+InP衬底产能' },
    { segment:'ArF光刻胶', demand:'~$20亿+(全球)', capacity:'日本70%+·中国<5%', gap:'~98%进口', rate:'~98%', bottleneck:'数千种组分配方+认证周期1-2年' }
  ],
  methodologyNotes: 'AI全产业链是四层方法论（苏格拉底提问→第一性原理→奥卡姆剃刀→Serenity物理卡口）的完整演练场。最大收获不是"找到10个卡口标的"，而是明确了<strong>方法论的有效边界</strong>：①最核心的物理卡口（GPU/HBM/CoWoS/EUV）均不在A股→A股只能抓卖铲人+材料商+组件卡口；②奥卡姆剃刀砍掉了80%的"优秀但非卡口"标的（中际旭创/胜宏科技/沪电股份/工业富联都是好公司但不是卡口）；③苏格拉底六问揭示了最大的风险——铜连接448G突破可能推迟CPO大规模部署、ASIC蚕食GPU份额、Scaling Law见顶可能导致训练集群需求断崖。投资时需在"物理卡口的高确定性"和"技术替代的风险"之间取得平衡。详见各子赛道（PCB/半导体/AI服务器/HBM/CPO/AI应用）的独立分析。'
};


})(window.CHAINS);
