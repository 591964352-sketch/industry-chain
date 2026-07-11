// 4.84 删除 002443 金洲精工
const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');
const before = src.length;

function findObjectBounds(src, startIdx) {
  // 从 startIdx 向前找 { 作为对象起始
  let objStart = src.lastIndexOf('{', startIdx);

  // 栈匹配找对象结束位置
  let depth = 1;
  let i = objStart + 1;
  let inStr = false;
  let strCh = '';
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i += 2; continue; }
      if (c === strCh) inStr = false;
    } else {
      if (c === "'" || c === '"') { inStr = true; strCh = c; }
      else if (c === '{' || c === '[') depth++;
      else if (c === '}' || c === ']') depth--;
    }
    i++;
  }
  return { objStart, objEnd: i - 1 };
}

// === 1) 删除 segments 中的 002443 ===
const seg002443 = src.indexOf("rank:5, name:'金洲精工'");
if (seg002443 === -1) {
  console.log('✗ 未找到 segments 中 002443');
  process.exit(1);
}
console.log('segments 002443 anchor at:', seg002443);

const segBounds = findObjectBounds(src, seg002443);
console.log('segments objStart:', segBounds.objStart, 'objEnd:', segBounds.objEnd);
console.log('对象前后 30 字符:');
console.log('  before:', JSON.stringify(src.slice(segBounds.objStart - 30, segBounds.objStart)));
console.log('  after :', JSON.stringify(src.slice(segBounds.objEnd + 1, segBounds.objEnd + 30)));

// 删除 segments 中 002443 对象 + 它前后的空白 + 紧随的逗号
// 策略：删除 objStart 到 objEnd+1，并处理前后逗号
let removeStart = segBounds.objStart;
let removeEnd = segBounds.objEnd + 1;

// 向后看是否有逗号（删除对象同时删逗号）
let nextChar = src[removeEnd];
console.log('对象后第一字符:', JSON.stringify(nextChar));

// 如果后面是逗号，则一并删
if (nextChar === ',') {
  removeEnd++;
  nextChar = src[removeEnd];
  console.log('删除尾随逗号，删除范围扩展到:', removeEnd);
}

// 如果前面是逗号+换行（说明这不是数组最后一个），也需要删除前一个逗号
// 但前面通常是 \n        { ...这种，不需要删前一个逗号
let prevChar = src[removeStart - 1];
console.log('对象前最后字符:', JSON.stringify(prevChar));

// 如果前面是 , （说明前一个对象有逗号，这是合理的，不需要处理）
// 如果前面是 \n （说明这是该数组第一个，删了就直接换行）
if (prevChar === ',') {
  // 不删前逗号（属于上一个对象的）
} else if (prevChar === '\n') {
  // 是数组第一个对象，删了会留 \n        } - 检查 removeStart 之前的 \n
}

// 实际执行删除
const beforeSeg = src.slice(0, removeStart);
const afterSeg = src.slice(removeEnd);
src = beforeSeg + afterSeg;
console.log('segments 删除完成。当前长度:', src.length);

// === 2) 删除 fourQuestions 中的 002443 ===
const fq002443 = src.indexOf("name:'金洲精工', code:'002443'");
if (fq002443 === -1) {
  console.log('✗ 未找到 fourQuestions 中 002443');
  process.exit(1);
}
console.log('\\nfourQuestions 002443 anchor at:', fq002443);

const fqBounds = findObjectBounds(src, fq002443);
console.log('fourQuestions objStart:', fqBounds.objStart, 'objEnd:', fqBounds.objEnd);

// 看对象前的换行情况，决定是否调整
let fqPrev = src[fqBounds.objStart - 1];
let fqNext = src[fqBounds.objEnd + 1];
console.log('fourQuestions 对象前:', JSON.stringify(fqPrev));
console.log('fourQuestions 对象后:', JSON.stringify(fqNext));

let fqRemoveStart = fqBounds.objStart;
let fqRemoveEnd = fqBounds.objEnd + 1;
if (fqNext === ',') {
  fqRemoveEnd++;
  console.log('fourQuestions 删除尾随逗号');
}

const beforeFq = src.slice(0, fqRemoveStart);
const afterFq = src.slice(fqRemoveEnd);
src = beforeFq + afterFq;
console.log('fourQuestions 删除完成。当前长度:', src.length);

// 写文件
fs.writeFileSync('data/pcb.js', src);
console.log('\\nFile size before:', before, 'after:', src.length, 'diff:', src.length - before);

// 验证 JS 语法
try {
  new Function(src);
  console.log('✓ JS syntax OK');
} catch (e) {
  console.log('✗ JS ERR:', e.message);
}

// 验证 002443 已全部删除
const re = /002443/g;
let cnt = 0;
while (re.exec(src) !== null) cnt++;
console.log('\\n002443 剩余出现次数:', cnt);

// 验证 301377 鼎泰高科仍存在
const dt = src.match(/code:'301377'/g);
console.log('301377 剩余出现次数:', (dt || []).length);