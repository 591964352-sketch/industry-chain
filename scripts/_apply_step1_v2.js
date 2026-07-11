// 4.83 第一步精简版：只含 barrier + trendNote，不含 688625 鼎泰高科
const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');
const before = src.length;

// === A) 002443 金洲精工 barrier 中 → 极高 ===
const re002443 = /(code:'002443',[\s\S]*?barrier:')中(')/;
if (re002443.test(src)) {
  src = src.replace(re002443, '$1极高$2');
  console.log('A. 002443 barrier: 中 → 极高 ✓');
}

// === B) 删除 沪电/胜宏 的「全球首家/全球独家」 ===
src = src.replace(/·全球首家/g, '');
src = src.replace(/·全球独家/g, '');
console.log('B. 删除"全球首家/独家": done');

// === C) 19 只 stock trendNote 追加 ===
const appendMap = {
  '601208': '·眉山3500吨2026Q3爬坡',
  '605589': '·GB200国内份额60-70%',
  '300522': '·松下M9方案首入日系',
  '301217': '·池州1万吨2026Q4',
  '301511': '·AMD MI300份额60%',
  '600183': '·英伟达链国产30-35%',
  '002463': '·UBB英伟达链60-70%',
  '300476': '·UBB英伟达链30-40%·毛利率22.72%',
  '002916': '·2024总营收104.94亿',
  '002436': '·双AI平台量产·ABF占比10→25%',
  '002938': '·苹果链FPC75%',
  '002384': '·汽车+AI营收占比43%',
  '603186': '·特斯拉比亚迪量产·工信部目录',
  '688630': '·GB300 LDI认证',
  '301200': '·超快激光M9适用',
  '688700': '·水平镀三合一沪电40%',
  '002443': '·50倍径独家·高端70-80%',
  '300395': '·Rubin全系列认证',
  '002080': '·胜宏Q布独家·台光二供',
  '603256': '·台积电Low-Dk认证'
};

let appendedCount = 0;
const notFoundCodes = [];

for (const [code, addition] of Object.entries(appendMap)) {
  const re = new RegExp("code:'" + code + "'", 'g');
  let match;
  let success = false;
  while ((match = re.exec(src)) !== null) {
    const codeIdx = match.index;
    const after = src.slice(codeIdx);
    const searchBlock = after.slice(0, 5000);
    const tnMatch = searchBlock.match(/trendNote:'([^']*)'/);
    if (tnMatch) {
      const oldNote = tnMatch[1];
      const combined = oldNote + addition;
      const finalNote = combined.length > 40 ? combined.slice(0, 40) : combined;
      const globalIdx = codeIdx + after.indexOf(tnMatch[0]);
      const before_ = src.slice(0, globalIdx);
      const after_ = src.slice(globalIdx + tnMatch[0].length);
      src = before_ + "trendNote:'" + finalNote + "'" + after_;
      appendedCount++;
      console.log('  ✓ ' + code + ' (' + oldNote.length + '字→' + finalNote.length + '字)');
      success = true;
      break;
    }
  }
  if (!success) {
    notFoundCodes.push(code);
  }
}
console.log('C. trendNote追加:', appendedCount, '/', Object.keys(appendMap).length);
if (notFoundCodes.length) console.log('  ! 未找到:', notFoundCodes.join(','));

fs.writeFileSync('data/pcb.js', src);
console.log('\nFile size before:', before, 'after:', src.length, 'diff:', src.length - before);