const fs = require('fs');
const src = fs.readFileSync('data/pcb.js', 'utf8');
const csIdx = src.indexOf('chainStory:');
console.log('chainStory at:', csIdx);
console.log('前 30 字符:', JSON.stringify(src.slice(csIdx - 30, csIdx)));
console.log('后 30 字符:', JSON.stringify(src.slice(csIdx, csIdx + 30)));
console.log();

// 找 plainIntro 起始位置和关闭位置
const piStart = src.indexOf('plainIntro:');
console.log('plainIntro at:', piStart);

// 解析到 chainStory 时的 brace depth
let depth = 0;
let i = piStart;
let inStr = false;
let strCh = '';
while (i < src.length) {
  const c = src[i];
  if (inStr) {
    if (c === '\\') { i += 2; continue; }
    if (c === strCh) inStr = false;
  } else {
    if (c === "'" || c === '"') { inStr = true; strCh = c; }
    else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') depth--;
  }
  if (i === csIdx) {
    console.log('At chainStory: depth=', depth, ' inStr=', inStr, ' char=', JSON.stringify(src[i-2]) + JSON.stringify(src[i-1]) + JSON.stringify(src[i]));
    break;
  }
  i++;
}