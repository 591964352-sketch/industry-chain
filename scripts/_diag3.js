// 读 HEAD 版本（git show）来比较 plainIntro 真实结构
const { execSync } = require('child_process');
const headSrc = execSync('git show HEAD:data/pcb.js', { encoding: 'utf8' });

const piIdx = headSrc.indexOf('plainIntro:');
console.log('HEAD plainIntro at:', piIdx);

let depth = 0;
let i = piIdx;
let inStr = false;
let strCh = '';
let firstClose = -1;
while (i < headSrc.length) {
  const c = headSrc[i];
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
console.log('HEAD plainIntro 关闭 } at:', firstClose);
console.log('HEAD plainIntro 关闭处 30 字符:', JSON.stringify(headSrc.slice(firstClose - 30, firstClose + 30)));

// 看 HEAD 中 highlightBox 后面的字段
const hbEnd = headSrc.indexOf('highlightBox:');
console.log('HEAD highlightBox at:', hbEnd);

// HEAD 中 plainIntro 内的字段顺序
console.log('\n=== HEAD plainIntro 字段顺序 ===');
const piContent = headSrc.slice(piIdx, firstClose + 1);
const keyMatches = [...piContent.matchAll(/\n    (\w+):/g)];
keyMatches.forEach(m => console.log('  ', m[1]));

// 也看当前 working tree 的状态
const curSrc = require('fs').readFileSync('data/pcb.js', 'utf8');
console.log('\n=== Current working tree plainIntro 字段顺序 ===');
const curPi = curSrc.indexOf('plainIntro:');
let curDepth = 0;
let j = curPi;
let curInStr = false;
let curStrCh = '';
let curFirstClose = -1;
while (j < curSrc.length) {
  const c = curSrc[j];
  if (curInStr) {
    if (c === '\\') { j += 2; continue; }
    if (c === curStrCh) curInStr = false;
  } else {
    if (c === "'" || c === '"') { curInStr = true; curStrCh = c; }
    else if (c === '{' || c === '[') curDepth++;
    else if (c === '}' || c === ']') {
      curDepth--;
      if (curDepth === 0 && curFirstClose === -1) {
        curFirstClose = j;
        break;
      }
    }
  }
  j++;
}
console.log('Current plainIntro 关闭 at:', curFirstClose);
const curContent = curSrc.slice(curPi, curFirstClose + 1);
const curKeys = [...curContent.matchAll(/\n    (\w+):/g)];
curKeys.forEach(m => console.log('  ', m[1]));