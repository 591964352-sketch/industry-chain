const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// 修复双逗号: '},,{' → '},{'
const re = /\},\s*,\s*\{/g;
const matches = src.match(re);
console.log('双逗号出现次数:', matches ? matches.length : 0);

src = src.replace(re, '},{');

fs.writeFileSync('data/pcb.js', src);

// Verify
const lines = src.split('\n');
for (let i = 514; i < 530; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}