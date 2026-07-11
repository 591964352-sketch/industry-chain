// 二分查找 JS 错误位置
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const re = /<script>([\s\S]*?)<\/script>/g;
let m, last = null, idx = 0;
while ((m = re.exec(html)) !== null) { idx++; last = m[1]; }
const lines = last.split('\n');

// 二分：找到第一个 try { ... } catch 错位的位置
function test(startLine, endLine) {
  const sub = lines.slice(0, endLine).join('\n');
  try { new Function(sub); return true; } catch (e) { return false; }
}

// 二分查找第一个错误位置
let lo = 0, hi = lines.length;
while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (test(0, mid)) { lo = mid + 1; } else { hi = mid; }
}
console.log('first error line (script-internal, 0-based):', lo);
console.log('context (lines lo-3 to lo+2):');
for (let i = Math.max(0, lo - 3); i < Math.min(lines.length, lo + 3); i++) {
  console.log(`  [${i}] ${lines[i]}`);
}
