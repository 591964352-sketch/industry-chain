const fs = require('fs');
const src = fs.readFileSync('data/pcb.js', 'utf8');

// 找 plainIntro 关闭位置（精确配对）
const piIdx = src.indexOf('plainIntro:');
console.log('plainIntro at:', piIdx);

let depth = 0;
let i = piIdx;
let inStr = false;
let strCh = '';
let firstClose = -1;
while (i < src.length) {
  const c = src[i];
  if (inStr) {
    if (c === '\\') { i += 2; continue; }
    if (c === strCh) inStr = false;
  } else {
    if (c === "'" || c === '"') { inStr = true; strCh = c; }
    else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') {
      depth--;
      if (depth === 0 && firstClose === -1) {
        firstClose = i;
        break;
      }
    }
  }
  i++;
}
console.log('plainIntro 关闭 } at:', firstClose);
console.log('plainIntro 关闭处 30 字符:', JSON.stringify(src.slice(firstClose - 30, firstClose + 30)));
console.log();

// 看 plainIntro 内字段（用于确认 chainStory 应该在哪个位置）
const piContent = src.slice(piIdx, firstClose + 1);
// 数每个 key: 的出现位置
let j = 0;
while ((j = piContent.indexOf('\n  ', j)) !== -1) {
  const next = piContent.indexOf(':', j);
  const key = piContent.slice(j + 3, next).trim();
  console.log('plainIntro key:', key);
  j = next;
}