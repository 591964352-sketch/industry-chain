// 4.85 第一步 v2：chainStory 写入 pcb.js plainIntro
// 关键修复：用 \r\n 精确匹配 CRLF 行尾 + 关闭 }, 之前正确插入
const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');
const before = src.length;

// 步骤1：定位 plainIntro 关闭 }, 位置
const ovIdx = src.indexOf('overview: [');
if (ovIdx === -1) { console.log('✗ no overview'); process.exit(1); }
const closeIdx = src.lastIndexOf('},', ovIdx);
if (closeIdx === -1) { console.log('✗ no close },'); process.exit(1); }
console.log('closeIdx:', closeIdx);
console.log('before closeIdx (10 chars):', JSON.stringify(src.slice(closeIdx - 10, closeIdx)));
console.log('after closeIdx (10 chars):', JSON.stringify(src.slice(closeIdx, closeIdx + 10)));

// 步骤2：构造 chainStory 字段内容（CRLF 行尾 + 4 空格缩进）
// 直接以 \r\n 显式构造
function cs(steps) {
  let out = '    chainStory: [\r\n';
  steps.forEach((s, i) => {
    out += '      { step:' + s.step + ', name:\'' + s.name + '\',\r\n';
    out += '        desc:\'' + s.desc + '\',\r\n';
    out += '        barrier:\'' + s.barrier + '\', choke:' + s.choke + ',\r\n';
    out += '        domestic:\'' + s.domestic + '\',\r\n';
    out += '        barrierNote:\'' + s.barrierNote + '\',\r\n';
    out += '        keyStocks:[' + s.keyStocks.map(c => "'" + c + "'").join(',') + '],\r\n';
    out += '        source:\'' + s.source + '\' }' + (i < steps.length - 1 ? ',\r\n' : '\r\n');
  });
  out += '    ],\r\n';
  return out;
}

const steps = [
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
];

const chainStoryStr = cs(steps);
console.log('\n=== chainStory 字符串前 300 字符 ===');
console.log(JSON.stringify(chainStoryStr.slice(0, 300)));
console.log('\n=== chainStory 字符串末 200 字符 ===');
console.log(JSON.stringify(chainStoryStr.slice(-200)));

// 步骤3：在 closeIdx 处插入（注意 closeIdx 指向 `}`，所以插入后变成:
//   highlightBox: '...',\r\n    chainStory: [...],\r\n  },\r\n  overview: [
const before_ = src.slice(0, closeIdx);
const after_ = src.slice(closeIdx);
src = before_ + chainStoryStr + after_;

fs.writeFileSync('data/pcb.js', src);
console.log('\nFile size before:', before, 'after:', src.length, 'diff:', src.length - before);

// JS 验证
try {
  new Function(src);
  console.log('✓ JS syntax OK');
} catch (e) {
  console.log('✗ JS ERR:', e.message);
}

// step 计数验证
const stepCount = (src.match(/step:\d+/g) || []).length;
console.log('step:N 出现次数:', stepCount);

// 模拟执行检查 chainStory 数据完整
try {
  global.window = {};
  eval(src);
  const cs_data = global.window.CHAINS.pcb.plainIntro.chainStory;
  console.log('\n✓ plainIntro.chainStory 数组长度:', cs_data.length);
  cs_data.forEach((s, i) => {
    console.log('  Step', s.step, '·', s.name, '·barrier=' + s.barrier + '·choke=' + s.choke + '·stocks=' + s.keyStocks.length);
  });
} catch (e) {
  console.log('eval ERR:', e.message);
}