// data/ai-apps.js — 升级九 STEP 4 小步 2：AI APPLICATIONS (AI 应用) 数据外置（IIFE 包原代码一字不改）
// 由 index.html manifest 数组同步加载（document.write 顺序注入 <script src>），window.CHAINS.ai-apps 注入后供主 script 渲染。
// 加载失败 → renderChain guard 显示红色错误卡而非白屏 → 其余赛道不连坐（独立 <script> 容错隔离）。

window.CHAINS = window.CHAINS || {};
(function(CHAINS){

// ==================== AI APPLICATIONS ====================
CHAINS['ai-apps'] = {
  id: 'ai-apps', name: 'AI应用', icon: '🧠',
  plainIntro: {
    analogy: 'AI应用 = AI时代的"石油化工厂"——把底层算力(石油原料)加工成各行各业能直接用的"产品"',
    paragraphs: [
      '2026年被定义为<strong>"AI应用元年"</strong>。如果说2023-2025是"烧钱建炼油厂（买GPU/建数据中心）"，那2026年开始是<strong>"炼油厂出产品"</strong>——DeepSeek V4、字节豆包（月活1.57亿）、Kimi Agent集群（300子Agent协作）、智谱GLM-5等大模型层出不穷。AI从"能做PPT"进化到"能编复杂代码/能分析财报/能跨系统自动完成工作流"，商业价值开始<strong>从预期转向兑现</strong>。',
      '<strong>AI应用赛道的物理卡口在哪？</strong>说实话——软件/服务层很难用"企业数量≤3家/产能扩产≥12月"这种物理框架来筛。大模型确实是寡头格局（DeepSeek/豆包/文心/Kimi/通义<10家），但它们的壁垒是<strong>数据飞轮+用户生态+模型迭代速度</strong>，不是物理产能。所以这个章节的处理方式不同于硬件赛道——我们承认方法论局限，但依然按框架格式输出，标注"类卡口"而非"物理卡口"。核心抓<strong>数据价值链（数据采集/标注/版权）+ 企业级AI Agent落地 + 国产算力生态受益</strong>三个方向。'
    ],
    flowSteps: ['大模型→DeepSeek/Kimi/智谱/豆包','数据→Hugging Face+爬虫+版权语料','MaaS平台→阿里云/火山引擎/百度','AI Agent→编程/客服/营销/办公','落地应用→WPS AI/Fensai/BlueFocus'],
    highlightBox: '<strong>⚠️ 方法论重要说明：AI应用赛道是软件/服务驱动的产业链，"物理卡口"框架适用性有限。</strong><br>本章节的关键调整：① 大模型层："寡头"指数据和生态垄断而非物理产能；② 应用层：壁垒来自网络效应和用户粘性而非硬件产能；③ 标注的"卡口"实际是"类卡口"——有寡头特征但非传统物理瓶颈。④ 大模型公司大多未上市（DeepSeek/豆包/Kimi/智谱），A股主要抓关联产业链标的。'
  },
  overview: [
    { label: '🤖 中国AI应用市场(2025)', value: '~182亿', note: 'AI Agent行业+78%·2026E>300亿', color: 'var(--accent)' },
    { label: '📱 豆包月活', value: '1.57亿', note: '中国原生AI App榜首·环比+6.6%', color: 'var(--blue)' },
    { label: '🏭 产业阶段', value: '商业化拐点', note: '推理需求=训练8倍·应用>基建', color: 'var(--green)' },
    { label: '🧠 国产大模型数量', value: '>200个', note: '真正商业化<5家·集中度在快速提升', color: null },
    { label: '📐 AI Agent覆盖率目标(2027)', value: '>70%', note: '国务院智能体政策写入2026政府报告', color: null },
    { label: '⚡ 核心催化', value: '大模型从10→100', note: 'DeepSeek V4+智谱IPO(150亿)+字节AI商业化', color: null },
    { label: '🔴 核心矛盾', value: '大模型未上市', note: 'A股只能抓赋能/关联/生态标的', color: 'var(--red)' },
    { label: '💻 AI推理算力占比', value: '全球70-80%', note: '推理算力是训练的8倍→国产算力受益', color: 'var(--green)' }
  ],
  treeMap: {
    downstream: { name: 'C端(搜索/助手/创作/社交)·B端(Agent/编程/客服/营销)', barrier: 'low', note: '用户基数庞大·但付费转化率仍在爬坡' },
    midstream: { name: 'AI应用/Agent开发商', barrier: 'low', note: '金山办公/科大讯飞/蓝色光标/汉得信息→充分竞争·无卡口' },
    equipment: [
      { name: '大模型(类卡口/数据+生态壁垒)', barrier: 'extreme', choke: true, note: 'DeepSeek/豆包/Kimi/智谱<10家·A股关联抓生态' },
      { name: 'AI芯片/算力(物理卡口)', barrier: 'extreme', choke: true, note: '寒武纪/海光→已在半导体赛道覆盖' }
    ],
    materials: [
      { name: '训练数据/数据要素(版权壁垒)', barrier: 'high', choke: false, note: '高质量语料→大模型"石油"·版权护城河' },
      { name: 'AI安全/风控', barrier: 'high', choke: false, note: '360/深信服→AI防火墙/内容审核' }
    ],
    sideBranches: [
      { name: 'AI编程(Copilot/CodeBuddy)', barrier: 'mid', note: 'GitHub Copilot+TONGYI Lingma+商汤Raccoon' },
      { name: 'AI搜索→替代传统搜索', barrier: 'mid', note: '百度重构·豆包搜索·Kimi探索版' }
    ]
  },
  segments: [],
  midstream: { description: '', stocks: [] },
  fourQuestions: { segments: [] },
  chokePoints: [],
  supplyGap: []
};

// AI Apps Segments — Note: 软件导向, "卡口"=数据/生态/用户粘性
CHAINS['ai-apps'].segments = [
  {
    name: '国产大模型生态 — "类卡口"的数据+生态壁垒', costRatio: '—（软件/服务）', barrier: 'extreme', choke: true, border: true,
    intro: '中国大模型市场呈现<strong>5-6家寡头格局</strong>：字节豆包（1.57亿月活第一）、DeepSeek（开源标杆+V4待发）、Kimi（Agent集群300子Agent）、百度文心、阿里通义、智谱GLM-5。大模型的壁垒不是"物理产能"，而是：① <strong>用户数据飞轮</strong>——越多用户→越多数据→模型越强→越多用户；② <strong>生态锁定</strong>——一旦企业深度集成某个大模型API，切换成本极高（重写Prompt/调整Agent/重新测试）。③ <strong>资本壁垒</strong>——训练一次大模型成本$5000万+。但所有这些非A股直接标的——A股只能抓生态关联。',
    globalLandscape: [
      { lbl: '🥇 字节豆包（非上市）', val: '月活1.57亿·环比+6.6%', note: '扣子3.0 Agent平台·视频模型Seedance 2.0月收>10亿' },
      { lbl: '🥈 DeepSeek（非上市）', val: '开源标杆·V4待发', note: '高性价比路线·推理成本极低·代码/多模态补齐中' },
      { lbl: '🥉 Kimi/智谱（非上市/拟IPO）', val: 'Kimi 300子Agent集群', note: '智谱GLM-5·A股二次上市计划·拟募150亿' },
      { lbl: '百度文心/阿里通义（上市）', val: '互联网巨头AI布局', note: '百度港股·阿里港股→全链条整合' }
    ],
    stocks: [
      { rank:1, name:'寒武纪', code:'688256', position:'国产AI芯片龙头·大模型算力底座', barrier:'极高', hits:null, strength:null, logic:'中国云端AI加速器国产份额~41%。深度绑定国产大模型算力需求。但已在半导体赛道覆盖。此处标注为AI应用上游核心' },
      { rank:2, name:'金山办公', code:'688111', position:'WPS AI办公应用标杆', barrier:'高', hits:null, strength:null, logic:'多个券商推荐AI应用核心标的。WPS亿级用户基础+AI功能付费率持续提升。DeepSeek生态关联标的' },
      { rank:3, name:'科大讯飞', code:'002230', position:'星火大模型+教育/医疗/办公多场景', barrier:'高', hits:null, strength:null, logic:'教育领域AI应用最深度落地的A股标的。自研大模型横跨教育/医疗/金融。但星火月活远小于豆包/DeepSeek' }
    ]
  },
  {
    name: 'AI Agent/企业应用 — 商业化的"最后一公里"', costRatio: '—（订阅/SaaS）', barrier: 'high', choke: false, border: false,
    intro: 'AI Agent是2026年最火的AI应用方向——不只是一个聊天窗口，而是能<strong>自主规划任务→调用工具→执行工作流→自我纠错</strong>的智能体。腾讯WorkBuddy、Kimi Work(300子Agent集群)、字节扣子3.0（多Agent集群协作）等产品密集发布。A股标的：汉得信息（企业级Agent/SAP生态）、蓝色光标（AI营销Agent）、鼎捷数智（制造业Agent）。但竞争格局极度分散→不构成寡头。',
    globalLandscape: [
      { lbl: '汉得信息（中）', val: '企业级AI Agent落地先锋', note: 'SAP生态+企业流程再造' },
      { lbl: '蓝色光标（中）', val: 'AI营销Agent', note: '字节豆包生态关联→火山引擎合作' },
      { lbl: '鼎捷数智（中）', val: '制造业AI Agent', note: '工业场景AI应用' }
    ],
    stocks: [
      { rank:1, name:'汉得信息', code:'300170', position:'企业级AI Agent+企业流程再造', barrier:'高', hits:null, strength:null, logic:'SAP生态+企业数字化。AI Agent落地场景丰富→但竞争格局极度分散' },
      { rank:2, name:'蓝色光标', code:'300058', position:'AI营销Agent+字节豆包生态', barrier:'中', hits:null, strength:null, logic:'字节豆包营销应用核心合作伙伴。火山引擎AI营销方案核心代理' },
      { rank:3, name:'合合信息', code:'688615', position:'AI文档智能+OCR一哥', barrier:'高', hits:null, strength:null, logic:'扫描全能王/名片全能王用户>10亿。文档AI场景壁垒' }
    ]
  },
  {
    name: '训练数据/数据要素 — 大模型的"石油"', costRatio: '—（数据资产）', barrier: 'high', choke: false, border: false,
    intro: '大模型训练需要<strong>海量高质量语料</strong>——没有数据就没有智能。2025年全球AI训练数据市场约$30亿。核心壁垒：<strong>版权语料</strong>（出版社/新闻社的独家授权）。中文高质量语料供给远小于英文，头部出版社/新闻社数据是"限量资源"。但数据市场参与者众多→不构成寡头。A股主要看数据标注+AI训练数据服务商。',
    globalLandscape: [
      { lbl: '海天瑞声（中）', val: '国内AI训练数据龙头', note: '语音/图像/文本数据标注服务' },
      { lbl: '云赛智联（中）', val: '数据要素+IDC+算力服务', note: '上海数据交易所+DeepSeek生态' }
    ],
    stocks: [
      { rank:1, name:'海天瑞声', code:'688787', position:'国内AI训练数据龙头', barrier:'高', hits:null, strength:null, logic:'为大模型企业提供标注/训练数据。语音+文本+视觉数据全链。但非寡头' },
      { rank:2, name:'云赛智联', code:'600602', position:'数据要素+智算中心+DeepSeek生态', barrier:'中', hits:null, strength:null, logic:'上海数据交易所+AI算力服务。DeepSeek生态关联标的' }
    ]
  },
  {
    name: 'AI安全 — 大模型的"免疫系统"', costRatio: '—', barrier: 'high', choke: false, border: false,
    intro: 'AI应用的爆发也带来<strong>AI安全（AI Safety）</strong>的巨大需求——大模型输出审查、对抗攻击防御、AI生成内容检测、数据隐私保护。360、深信服等传统安全厂商+AI原生安全新秀共同竞争。卡口判定：参与者>10家→不构成物理卡口。但AI安全是"非做不可"的刚需。',
    globalLandscape: [
      { lbl: '360/深信服（中）', val: 'AI防火墙+内容审核安全', note: '传统安全厂商AI化转型' },
      { lbl: '奇安信（中）', val: 'AI安全方案', note: '政府/央企客户护城河' }
    ],
    stocks: [
      { rank:1, name:'三六零', code:'601360', position:'AI安全方案+大模型安全护栏', barrier:'高', hits:null, strength:null, logic:'AI防火墙+内容安全审核。自研大模型+安全基因。政府/央企客户壁垒' },
      { rank:2, name:'深信服', code:'300454', position:'AI安全+云计算', barrier:'高', hits:null, strength:null, logic:'企业级AI安全方案。但竞争格局分散' }
    ]
  }
];

// AI Apps "Four Questions" — 调整为软件/服务视角
CHAINS['ai-apps'].fourQuestions = {
  segments: [
    {
      name: '大模型层（类卡口/数据+生态）',
      stocks: [
        { name:'字节豆包(未上市)', code:'—', q1:true, q1note:'月活1.57亿/第一', q2:true, q2note:'模型迭代数月级积累', q3:true, q3note:'用户数据飞轮', q4:true, q4note:'千行百业刚需', hits:4, strength:'★★★' },
        { name:'DeepSeek(未上市)', code:'—', q1:true, q1note:'开源社区垄断性', q2:true, q2note:'', q3:false, q3note:'开源=无替代壁垒', q4:true, q4note:'', hits:3, strength:'★★☆' },
        { name:'智谱GLM-5(拟IPO)', code:'—', q1:true, q1note:'政府/央企市场寡头', q2:true, q2note:'', q3:true, q3note:'政务AI生态绑定', q4:true, q4note:'', hits:4, strength:'★★★' }
      ]
    },
    {
      name: 'AI应用/Agent（竞争分散）',
      stocks: [
        { name:'金山办公', code:'688111', q1:false, q1note:'办公AI不止WPS', q2:false, q2note:'', q3:false, q3note:'Microsoft/飞书可替', q4:true, q4note:'亿级用户刚需', hits:1, strength:null },
        { name:'科大讯飞', code:'002230', q1:false, q1note:'教育AI>5家', q2:true, q2note:'', q3:false, q3note:'百度/字节可替', q4:true, q4note:'', hits:2, strength:null }
      ]
    }
  ]
};

// AI Apps "Choke Points" — 标注为"类卡口"而非"物理卡口"
CHAINS['ai-apps'].chokePoints = [
  { rank:1, name:'寒武纪(算力底座)', code:'688256', segment:'AI推理芯片→国产算力卡口', strength:'★★★', logic:'与大模型直接相关的最硬"物理卡口"——AI推理算力。中国云端AI加速器国产份额<strong>~41%</strong>。大模型推理需求是训练的8倍→应用越多→推理芯片需求越大。已出业绩拐点。但此为硬件逻辑→在半导体赛道已有覆盖。此处作为AI应用的上游核心卡口标示。', tags:['国产算力~41%','推理需求8x训练','刚需不可替代','已在半导体赛道覆盖'] },
  { rank:2, name:'字节豆包生态(类卡口)', code:'—(非A股直接)', segment:'大模型生态→A股关联抓', strength:'★★☆', logic:'豆包月活<strong>1.57亿</strong>中国原生AI App第一。视频大模型Seedance 2.0在短剧行业渗透率~95%/单月收入>10亿。扣子3.0 Agent平台。字节AI生态的A股映射：<strong>蓝色光标(营销AI)、掌阅科技(内容AI)、汉得信息(企业AI)</strong>。不是物理卡口，但生态垄断力极强→类卡口。', tags:['月活1.57亿','短剧渗透95%','生态垄断','类卡口非物理'] }
];
CHAINS['ai-apps'].supplyGap = []; // 软件赛道无物理供需缺口

CHAINS['ai-apps'].methodologyNotes = 'AI应用赛道是对Serenity物理卡口框架最大的挑战。软件/服务产业链的核心壁垒不是物理产能（扩产≥12月/全球≤3家），而是：① 数据飞轮（越多用户→越多数据→模型越强）；② 生态锁定（企业一旦集成大模型API/Agent，切换成本极高）；③ 资本壁垒（训练一次大模型成本$5000万+）。这三点构成了"类卡口"——有寡头特征但非物理瓶颈。另外，中国最优秀的大模型公司（DeepSeek/豆包/Kimi/智谱）大多未上市→A股只能抓关联标的。建议将此赛道定位为"AI基础设施（半导体+服务器）的应用端催化"——大模型越强→对算力/存储/液冷的需求越大→物理卡口赛道的持续催化。';


})(window.CHAINS);
