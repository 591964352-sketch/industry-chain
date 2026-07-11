// 4.85 第一步：chainStory 写入 pcb.js plainIntro
const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');
const before = src.length;

// chainStory 数组定义（10 环节·直接来自用户指令）
// 注意：作为 plainIntro 内部字段，紧跟 highlightBox 后
// 对象字面量内字段都用 'key':'value' 单引号，array 元素用 { ... }，内嵌字符串全部无未转义单引号
const chainStory = `    chainStory: [
      { step:1, name:'碳氢树脂/M9材料',
        desc:'AI服务器信号速度由它决定，Df越低信号损耗越小，M9是Rubin架构指定材料',
        barrier:'极高', choke:true,
        domestic:'已量产12%·含验证28%（大陆企业/全球·2026-Q2）',
        barrierNote:'全球仅3家通过英伟达M9认证（日企+东材+台塑），认证周期18-24个月',
        keyStocks:['601208','605589','300522'],
        source:'L2 CPCA·L3灼识咨询·2026-Q2' },
      { step:2, name:'石英布/Q布',
        desc:'M9 CCL必须使用的低损耗增强材料，替代普通玻纤布，全球仅3家稳定量产',
        barrier:'极高', choke:true,
        domestic:'已量产18%·含验证32%（大陆企业/全球·2026-Q2）',
        barrierNote:'全球日东纺40%/圣戈班25%/菲利华15%，国内菲利华+中材合计约80%',
        keyStocks:['300395','002080'],
        source:'L2 CPCA·L3灼识咨询·2026-Q2' },
      { step:3, name:'HVLP4铜箔',
        desc:'M9 CCL必须配套超低轮廓铜箔，表面粗糙度决定高频信号完整性',
        barrier:'高', choke:false,
        domestic:'已批量21%·含验证35%（大陆企业/全球·2026-Q2）',
        barrierNote:'日本三井金属仍主导高端，铜冠/德福国产化加速但差距仍在',
        keyStocks:['301217','301511'],
        source:'L2 CPCA·L3 Prismark·2026-Q2' },
      { step:4, name:'覆铜板CCL（M9）',
        desc:'把树脂+石英布+铜箔压合成PCB的原始基板，PCB成本约27%来自CCL',
        barrier:'极高', choke:true,
        domestic:'已批量9%·含验证30%（大陆企业/全球·2026-Q2）',
        barrierNote:'台光60-70%/生益30-35%，大陆仅生益获英伟达M9认证，认证壁垒极高',
        keyStocks:['600183','603186'],
        source:'L2 CPCA·L3灼识咨询·2026-Q2' },
      { step:5, name:'PCB专用设备',
        desc:'钻孔/曝光/电镀是PCB制造核心工序，M9材料升级驱动设备量价齐升',
        barrier:'高', choke:false,
        domestic:'整体47%·高端AI算力22%（大陆企业·2026-Q2）',
        barrierNote:'高端设备：激光钻日本三菱主导/曝光以色列Orbotech主导/水平镀德国安美特主导',
        keyStocks:['301200','688630','688700'],
        source:'L2 CPCA·L3 Prismark·2026-Q2' },
      { step:6, name:'PCB钻针耗材',
        desc:'PCB制造关键耗材，M9材料更硬导致钻针寿命从1000孔降至100-200孔，用量暴增',
        barrier:'高', choke:false,
        domestic:'中国企业（含台湾）全球58%·高端AI钻针75%（2025全年）',
        barrierNote:'鼎泰高科全球第一28.9%，中钨旗下金洲精工全球第二，中国已是输出方',
        keyStocks:['301377'],
        source:'L2 CPCA·L3弗若斯特沙利文·2026-Q2' },
      { step:7, name:'中游AI服务器PCB制造',
        desc:'AI服务器单台PCB价值量是普通服务器14.6倍，78层正交背板是最高壁垒产品',
        barrier:'极高', choke:false,
        domestic:'大陆全球41%·英伟达链43%·华为昇腾链92%（2026-Q2）',
        barrierNote:'胜宏+沪电垄断UBB背板，深南+兴森突破ABF载板，大陆制造能力全球领先',
        keyStocks:['300476','002463','002916','002436'],
        source:'L2 CPCA·L3 Prismark·2026-Q2' },
      { step:8, name:'中游消费/汽车PCB制造',
        desc:'消费电子PCB增长放缓（CAGR 2.1%），汽车电子PCB高速增长（CAGR 4.0-4.2%）',
        barrier:'中', choke:false,
        domestic:'大陆全球PCB总市场56%（Prismark大陆口径·2026-Q2）',
        barrierNote:'鹏鼎苹果链FPC内部75%，东山汽车PCB国内9.2%，客户认证是核心壁垒',
        keyStocks:['002938','002384'],
        source:'L3 Prismark·2026-Q2' },
      { step:9, name:'下游：AI服务器',
        desc:'2024全球AI服务器PCB市场19亿美元（Prismark），2024-2028 CAGR 38.5%，最快增长赛道',
        barrier:'—', choke:false,
        domestic:'—',
        barrierNote:'Rubin Ultra单台PCB价值量11.67万美元，普通服务器0.8万美元，相差14.6倍',
        keyStocks:[],
        source:'L3 Prismark·L4国金/摩根士丹利·2026-Q2' },
      { step:10, name:'下游：汽车/通信/消费',
        desc:'汽车电子CAGR 4.0%·通信5G CAGR 3.2%·消费电子CAGR 2.1%，三大下游分化明显',
        barrier:'—', choke:false,
        domestic:'—',
        barrierNote:'2024全球PCB总市场735.65亿美元，2028预测898-902亿，CAGR 5.5%',
        keyStocks:[],
        source:'L3 Prismark·L2 CPCA·2026-Q2' }
    ],
`;

// 插入位置：plainIntro 关闭 `},` 之前（紧跟 highlightBox）
// 用 indexOf 定位 plainIntro 关闭 `},` 位置（在 overview 之前）
const ovIdx = src.indexOf('overview: [');
if (ovIdx === -1) {
  console.log('✗ 未找到 overview: [');
  process.exit(1);
}
// 从 ovIdx 往回找 `},`
const closeIdx = src.lastIndexOf('},', ovIdx);
if (closeIdx === -1) {
  console.log('✗ 未找到 plainIntro 关闭 }');
  process.exit(1);
}
console.log('plainIntro close }, at:', closeIdx);
console.log('前后各 30 字符:');
console.log('  before:', JSON.stringify(src.slice(closeIdx - 30, closeIdx)));
console.log('  after :', JSON.stringify(src.slice(closeIdx, closeIdx + 30)));

// 在 closeIdx 位置插入 chainStory 字段
const before_ = src.slice(0, closeIdx);
const after_ = src.slice(closeIdx);
src = before_ + chainStory + after_;

fs.writeFileSync('data/pcb.js', src);
console.log('\\nFile size before:', before, 'after:', src.length, 'diff:', src.length - before);

// JS 验证
try {
  new Function(src);
  console.log('✓ JS syntax OK');
} catch (e) {
  console.log('✗ JS ERR:', e.message);
}

// chainStory 验证
global.window = {};
const realSrc = fs.readFileSync('data/pcb.js', 'utf8');
// 模拟执行顶层代码
try {
  // 简单验证 chainStory 字段存在
  const idx = realSrc.indexOf('chainStory:');
  console.log('chainStory: 字段出现位置:', idx);
  if (idx > 0) {
    const next = realSrc.slice(idx, idx + 100);
    console.log('chainStory 起始:', JSON.stringify(next));
  }

  // 验证 10 个 step
  const steps = (realSrc.match(/step:\d+/g) || []).length;
  console.log('step:数字 出现次数:', steps);
} catch (e) {
  console.log('verify ERR:', e.message);
}