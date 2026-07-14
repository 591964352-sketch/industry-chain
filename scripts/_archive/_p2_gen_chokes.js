'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// 1. 不从损坏文件读, 用占位对象表示原安集条目(chokePoints[0])
const originalAji = {
  rank: 1,
  name: '安集科技',
  code: '688019',
  segment: 'seg[1] HBM 封装材料 · CMP 抛光液',
  strength: '★★★',
  // 已知字段(完整 plainLanguageNote 不会重写,只用作 fallback 锚点)
  plainLanguageNote: '[原安集 plainLanguageNote,不会修改,从磁盘文件读取回填]',
  strengthNote: '[原安集 strengthNote,不会修改]',
  verification: { items: [], note: '[原安集 verification,不会修改]' },
  valuation: { tier: 'estimate', asOf: '2026-07-14', note: '[原 valuation]' },
  logic: '[原 logic]',
  tags: ['CMP抛光液国产第一', 'HBM堆叠介质抛光刚需', '本链独立评估(A类)非跨链复用'],
};
console.log('占位原安集条目 rank=', originalAji.rank);
console.log('注: 真正落地时要把原安集所有字段从 storage-interface.js 原始行 1821-1829 提取回填');

// 2. 构造 4 只新 chokePoint (内存里)
const newChokes = [];
newChokes.push({
  rank: 2,
  name: '澜起科技',
  code: '688008',
  segment: 'seg[2] DDR5/LPDDR5 主控与 RCD · DDR5 RCD 全球稀缺型卡口',
  strength: '★★★',
  logic: `DDR5 RCD(寄存时钟驱动器)是服务器 DDR5 内存条上的核心指挥芯片——全球仅澜起+Rambus+瑞萨(Renesas 收购 IDT)三家可量产。澜起 2025 年报 L1 实测: 营收 54.56亿(+49.94%)、净利 22.36亿(+58.35%)、毛利率 62.23%、互连类芯片占公司总营收 94.18%;全球市占~40%;国内唯一认证≥12个月量产厂商;Intel/AMD 平台服务器 OEM 客户切换成本极高(数据中心兼容性测试≥6月+库存建立≥3月)。

⚠ 护城河被侵蚀风险: 2025 年三星电子已宣布自研 DDR5 RCD 芯片,预计 2025 下半年量产,优先应用于三星自家服务器 DRAM 模组——这意味着“客户离不开你”的耐久性正在被侵蚀。澜起基本盘仍稳(2025 营收同比 +49.94%/第四子代 RCD 7200MT/s 已规模出货),但三星自建产能是行业公开关注点(来源: 多家 L5 财经媒体 2025 报道, 具体自供率数字未检索到 L1/L4 原始信源, 此处不引用未核实数字)。`,
  tags: ['DDR5 RCD 全球双寡头', '全球≤3家量产+认证≥12月', 'L1 2025 营收+49.94%', '⚠ 三星 2025 自研 RCD 风险'],
  valuation: { tier: 'estimate', asOf: '2026-07-14', note: '详见 §11.7 batch 2 supply+barrier reason 补全批次关联卡片 (估值待 Phase 2 实测校准)' },
  verification: { items: [], note: '★ commit 6.99 立(2026-07-14):澜起从 commit 6.88 Phase B 试点晋级正式 chokePoint。主要变更:① 解锁 phaseBTestTrial=false;② 加 4 问字段 hits=1/strength=★☆☆(R1 衍生 q1=true);③ verification 加三星自研 RCD 风险标注(L5 媒体多源报道,具体自供率未检索到 L1/L4 原始信源,故不写具体百分比);④ plainLanguageNote 重写加入风险提示。' },
  plainLanguageNote: '<strong>💡 大白话:为什么澜起科技是卡口?</strong><br><br>把服务器内存条想象成一座超大型图书馆——几十台“图书管理员”同时指挥上百本书的存取节奏,没有他们所有人会撞在一起打架。澜起科技做的就是这颗指甲盖大小的“图书管理员”芯片,叫 DDR5 RCD。<br><br>全球能造这种芯片的只有三家公司:澜起、美国的 Rambus、日本的瑞萨(收购了 IDT)。澜起市占大概 40%,国内独一份。2025年它的营收 54.56 亿(+49.94%)、净利 22.36 亿(+58.35%),毛利率高达 62%——这是“全球稀缺”的真金白银背书。<br><br>但这道护城河不是铁打的——<strong>最大的客户之一三星电子,2025 年已经宣布要自己研发 RCD 芯片。</strong>虽然目前还处于早期阶段、自供比例不高,但这是一个明确信号:连最离不开澜起的客户,都在想办法“不再依赖你”。所以澜起的基本盘还在(DDR5 RCD 量价齐升、第四子代 7200MT/s 已规模出货),但这道护城河的耐久性正在被一点一点侵蚀——它不是“客户永远离不开你”,而是“客户暂时还离不开你”。',
  strengthNote: '★ commit 6.99 立(2026-07-14):  DDR5 RCD 全球稀缺型卡口·barrier=5+moat=全链计算+strength=★★★·详见 verification.note',
});
newChokes.push({
  rank: 3,
  name: '北方华创',
  code: '002371',
  segment: 'seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(7 大类设备平台)',
  strength: '★★☆',
  logic: `北方华创是 A 股稀缺的“多产品线综合性半导体设备平台型公司”——单 ICP/CCP/PVD/CVD/清洗等多种设备。HBM 制造所需的刻蚀、薄膜沉积、清洗等关键设备都在其产品线中。

⚠ 卡口性质: <strong>国产替代型卡口</strong>——不是“全球只有你会做”,而是“在中国大陆特定 HBM 制造市场,外国公司暂时进不来,国产的你是唯一选择”。全球 HBM 设备市场被 AMAT/Lam Research/东京电子三家外国巨头主导 90%+,北方华创+中微合计全球份额约 2.6%-3.58%。但在中国 HBM/存储制造细分场景(如长江存储、长鑫存储、中芯国际等国产产线),北方华创已是多品类核心设备供应商。

⚠ 护城河风险来源: 这类卡口的耐久性取决于<strong>出口管制/贸易政策的持续性</strong>。如果地缘政治缓和、外国设备重新自由进入中国市场,北方华创的护城河可能被削弱。这跟澜起科技“全球物理稀缺型”卡口的风险来源不同——澜起的风险是客户自建产能,北方华创的风险是外国厂家重新入场。

L1 abstract_ths 实测(2025 全年): 营收 300.75亿(YoY +30.85%)/净利 56.22亿(YoY -1.77% 温和下降)/毛利率 35%。2026Q1 营收 103.23亿(YoY +25.80%)/净利 16.35亿(YoY +3.42% 企稳回升)。`,
  tags: ['国产替代型卡口', 'HBM/刻蚀/沉积多品类平台', 'L1 2025 营收 300.75亿', '⚠ 地缘政治/出口管制依赖'],
  valuation: { tier: 'estimate', asOf: '2026-07-14', note: '详见 §11.7 batch 2 supply+barrier reason 补全批次关联卡片 (估值待 Phase 2 实测校准)' },
  verification: { items: [], note: '★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5(技术领先+客户端验证≥18月)+moat=85+quadrant=core·strength=★★☆(本批次未达 ★★★ 是因为全球份额<4% + 卡口来源是政策非物理稀缺)。' },
  plainLanguageNote: '<strong>💡 大白话:为什么北方华创是卡口?</strong><br><br>半导体制造就像组装一台超级复杂的相机——需要 200 多道工序,每道工序都有专用设备(光刻机、刻蚀机、薄膜沉积设备、清洗机...)。北方华创能造其中好几类关键设备,产品线铺得比大多数国产设备公司都宽——刻蚀、薄膜沉积、清洗、单晶炉等等。<br><br>但这里有个关键区分——<strong>这不是“全球只有你会做”的卡口,而是“国产替代型”卡口</strong>。打个比方:在 HBM 内存这个具体场景里,北方华创的客户(长江存储/中芯国际/长鑫存储)需要买刻蚀机,美国应用材料(AMAT)、泛林(Lam Research)、东京电子这些外国巨头本来占 90% 全球份额——但因为出口管制+地缘政治,这些公司的高端设备暂时进不来中国市场,北方华创就成为客户“唯一可批量获得”的国产选择。2025 营收 300.75 亿(+30.85%)——这就是真金白银的市场份额。<br><br><strong>这种卡口的护城河有天然的脆弱性</strong>: 如果未来地缘政治缓和、美国半导体设备重新自由出口中国,北方华创就要正面对决 AMAT 和 Lam——它能打得过吗? 答案是部分能、部分不能。这是“国产替代型”卡口的核心矛盾: 政策保护期+技术追赶同时进行,一旦外部环境变化,卡口就可能松动。',
  strengthNote: '★ commit 6.99 立(2026-07-14):  国产替代型卡口(7 大类设备平台)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note',
});
newChokes.push({
  rank: 4,
  name: '中微公司',
  code: '688012',
  segment: 'seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(CCP 刻蚀龙头)',
  strength: '★★☆',
  logic: `中微公司专攻半导体刻蚀设备(CCP/ICP),在长江存储、中芯国际、华虹等国产晶圆厂的刻蚀设备份额已超 40%。HBM 制造的 TSV(硅通孔)工艺核心步骤就是刻蚀——没有刻蚀,HBM 3D 堆叠无法实现。

⚠ 卡口性质: <strong>国产替代型卡口</strong>。中微全球刻蚀设备份额约 5.1%(TrendForce 2025),Lam Research/AMAT/东京电子/Hitachi 全球 CR4>90%——中微+北方华创合计全球份额约 2.6%-3.58%,仍非全球玩家。但在 HBM 这个具体细分场景(国产 HBM 制造产线),中微已是国产 CCP 刻蚀绝对龙头。

⚠ 卡口性质不同于澜起/安集: 澜起/安集是“全球≤3家”的物理稀缺,中微/北方华创是“中国国产化替代”政策保护——两者护城河来源不同,风险来源也不同

L1 abstract_ths 实测: 2025 营收 123.85亿(+36.62%)/净利 21.11亿(+30.69%)。2026Q1 营收 29.15亿(+34.13%)/净利 9.30亿(YoY +197.20% 业绩拐点)。`,
  tags: ['国产替代型卡口', 'CCP 刻蚀国产第一', 'HBM TSV 核心', 'L1 2025 营收+36.62%'],
  valuation: { tier: 'estimate', asOf: '2026-07-14', note: '详见 §11.7 batch 2 supply+barrier reason 补全批次关联卡片 (估值待 Phase 2 实测校准)' },
  verification: { items: [], note: '★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5+moat=85+strength=★★☆+quadrant=core·CCP 刻蚀国产替代窗口期+TSV 工艺核心地位双重支撑。' },
  plainLanguageNote: '<strong>💡 大白话:为什么中微公司是卡口?</strong><br><br>制造一块 HBM 内存,需要把 12 层 DRAM 像千层蛋糕一样垂直堆起来——每层之间用一根根头发丝粗细的“硅通孔(TSV)”打通。这种比头发丝还细的孔必须用“等离子体刻蚀机”挖出来,精度要求在纳米级——一年偏差一根头发丝都失败。中微公司做的就是这种“等离子刻蚀机(CCP)”。<br><br>中微在国内 HBM 制造的国产产线(长江存储等)里基本是 CCP 刻蚀的唯一选择,市占超过 40%。但在全球范围内,这个赛道是 Lam Research(美国)、AMAT(美国)、东京电子(日本)、日立(日本)四家占 90%+,中微全球份额只有约 5%。<br><br><strong>这是典型的“国产替代型”卡口</strong>: 国外巨头不是做不出来这种刻蚀机(事实上他们的更先进),而是因为出口管制进不来中国市场,所以中微成了“国产唯一能做大客户量产订单的玩家”。<br><br>这种卡口的两面性: 一面是现在几年内保护期窗口很厚;另一面是当未来如果地缘政治缓和、外国设备重新进入,中微就要在正面战场和 Lam Research 掰手腕——这跟澜起科技那种“全球就三家”的卡口完全不同。澜起的护城河是物理定律,中微的护城河是政策红利。',
  strengthNote: '★ commit 6.99 立(2026-07-14):  国产替代型卡口(CCP 刻蚀龙头)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note',
});
newChokes.push({
  rank: 5,
  name: '华海清科',
  code: '688120',
  segment: 'seg[0] HBM 堆叠与混合键合 · 国产替代型卡口(12寸 CMP 国产第一)',
  strength: '★★☆',
  logic: `华海清科是国产 12 寸 CMP(化学机械抛光)设备绝对龙头——长江存储、中芯国际、华虹等国产晶圆厂的核心 CMP 设备供应商。CMP 设备在 HBM 多层堆叠工艺中关键,因为每一层堆叠之前都需要抛光电介质层,达到纳米级平整度。

⚠ 与 688019 安集科技(本链 seg[1] 已有 chokePoint)的区别:
• 安集科技 = CMP <strong>抛光液</strong>(消耗品, 由华海清科的 CMP 设备使用)
• 华海清科 = CMP <strong>设备</strong>(设备, 用安集科技抛光液)
两者是上下游关系,各自垄断所在细分,本批次双卡口确立 cmp 抛光“液+机”完整物理稀缺链。

⚠ 卡口性质: <strong>国产替代型卡口</strong>(与安集“全球≤5家”形成对比,安集是物理稀缺,华海是政策保护)。华海清科全球 CMP 设备份额<5%(Ebara/AMAT 全球 CR4>85%),但在国产 HBM/存储产线是 12 寸 CMP 绝对龙头。

L1 abstract_ths 实测: 2025 营收 +80%+YoY,具体数字+净利率水平见 manual 字段。`,
  tags: ['国产替代型卡口', '12寸 CMP 国产第一', '与安集科技(抛光液)配套', '长江存储+中芯国际核心供应商'],
  valuation: { tier: 'estimate', asOf: '2026-07-14', note: '详见 §11.7 batch 2 supply+barrier reason 补全批次关联卡片 (估值待 Phase 2 实测校准)' },
  verification: { items: [], note: '★ commit 6.99 立:本链 seg[0] 国产替代型卡口·barrier=5+moat=79+strength=★★☆+quadrant=hold(对比 安集 core)。✅ 与安集形成 cmp 液+机双卡口完整闭环。' },
  plainLanguageNote: '<strong>💡 大白话:为什么华海清科是卡口?</strong><br><br>想象一下:把 12 层 DRAM 像千层蛋糕一样垂直堆叠起来,每层之间必须平坦得像镜子一样——这需要“化学机械抛光(CMP)”设备来磨。在国产 HBM 制造产线里,这个关键设备 12 寸 CMP 国产第一,就是华海清科。<br><br>但需要澄清一个关键事实—— <strong>本链已有 688019 安集科技(本批次既有 chokePoint)在做 CMP <em>抛光液</em>,华海清科做的是 CMP <em>设备</em>——两者是上下游关系</strong>。打个比方: 安集是“牙膏”(消耗品),华海是“牙刷机”(工具)。使用 HBM 制造工艺时,先用华海的设备,再灌入安集的抛光液,然后磨平。<br><br>全球范围内,CMP 设备(Ebara/AMAT 全球 CR4>85%)是被外国巨头主导的。华海清科全球份额<5%,但在中国国产 HBM/存储产线是 12 寸 CMP 绝对龙头——这就是“国产替代型”卡口: 政策环境让外国巨头暂时进不来,国产华海成了唯一可批量获得的设备供应商。2025 营收高速增长+净利率稳定足以佐证。<br><br>同样,这种卡口的脆弱性也很明显: 若未来政策变化,华海将面对 Ebara/AMAT 的正面竞争——届时能不能打得过,要回到技术本身的护城河,而不是政策保护的窗口。',
  strengthNote: '★ commit 6.99 立(2026-07-14):  国产替代型卡口(12寸 CMP 国产第一)·barrier=5+moat=全链计算+strength=★★☆·详见 verification.note',
});

// 3. 合并 + JSON.stringify
const allChokes = [originalAji, ...newChokes];
const out = JSON.stringify(allChokes, null, 2);
console.log('allChokes count =', allChokes.length);
console.log('output chars =', out.length);

// 4. 写到临时文件
fs.writeFileSync(path.join(__dirname, '_p2_gen_chokes_out.json'), out);
console.log('written _p2_gen_chokes_out.json');

// 5. 验证 round-trip
const parsed = JSON.parse(out);
console.log('parse OK, count =', parsed.length);
parsed.forEach(c => {
  console.log(`  rank ${c.rank}: ${c.code} ${c.name} plainNote=${c.plainLanguageNote ? c.plainLanguageNote.length + '字' : '缺失'}`);
});
