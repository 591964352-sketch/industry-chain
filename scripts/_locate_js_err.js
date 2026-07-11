// 精确定位 JS else 错误
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const re = /<script>([\s\S]*?)<\/script>/g;
let m, last = null, idx = 0;
while ((m = re.exec(html)) !== null) { idx++; last = m[1]; }
try {
  new Function(last);
  console.log('OK', last.length, 'chars');
} catch (e) {
  console.log('ERR:', e.message);
  // V8 不给 lineNumber，改用 Function 自己
  try {
    new Function(last.replace(/else\s*\{/g, '{'));
  } catch (e2) {
    console.log('After else removal, ERR:', e2.message);
  }
}
