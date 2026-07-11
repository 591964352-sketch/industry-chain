// scripts/remove_688234.js —— commit 4.0 修复 1：删 pcb.auto.js 688234 块
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'data', 'pcb.auto.js');
const text = fs.readFileSync(FILE, 'utf8');
const lines = text.split('\n');

// 找 688234 块（用 .startsWith 绕开 CRLF）
let startLine = -1;
let endLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith("    '688234': {")) {
    startLine = i;
    continue;
  }
  if (startLine >= 0 && endLine < 0 && lines[i].trim() === '},') {
    endLine = i;
    break;
  }
}

if (startLine < 0 || endLine < 0) {
  console.log('FAIL: 未找到 688234 块');
  process.exit(1);
}

console.log('688234 block: L' + (startLine + 1) + ' ~ L' + (endLine + 1) + ' (' + (endLine - startLine + 1) + ' lines)');

const newLines = lines.slice(0, startLine).concat(lines.slice(endLine + 1));
fs.writeFileSync(FILE, newLines.join('\n'), 'utf8');

console.log('OK: pcb.auto.js 已删 688234 块');
console.log('  原行数: ' + lines.length);
console.log('  新行数: ' + newLines.length);
console.log('  减少: ' + (lines.length - newLines.length) + ' 行');
