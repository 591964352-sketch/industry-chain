const fs = require('fs');
const src = fs.readFileSync('data/pcb.js', 'utf8');
global.window = {};
try {
  eval(src);
  const cs = global.window.CHAINS.pcb.plainIntro.chainStory;
  console.log('✓ chainStory 数组长度:', cs.length);
  cs.forEach((s, i) => {
    console.log('  Step ' + s.step + ' · ' + s.name + ' · barrier=' + s.barrier + ' · stocks=' + s.keyStocks.length + ' · ' + s.source.slice(0, 25));
  });

  // 验证 plainIntro 其他字段未被破坏
  const pi = global.window.CHAINS.pcb.plainIntro;
  console.log('\nplainIntro 字段:');
  console.log('  analogy:', pi.analogy.slice(0, 30) + '...');
  console.log('  paragraphs:', pi.paragraphs.length, '段');
  console.log('  flowSteps:', pi.flowSteps.length, '步');
  console.log('  highlightBox:', pi.highlightBox.slice(0, 30) + '...');
  console.log('  chainStory:', pi.chainStory.length, '步骤');
} catch (e) {
  console.log('eval ERR:', e.message);
}