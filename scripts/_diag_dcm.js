const fs = require('fs');
const src = fs.readFileSync('data/pcb.js', 'utf8');
const idx = src.indexOf('CHAINS.pcb.demandChainMeta');
console.log('位置:', idx);
console.log('文件总长:', src.length);

// 找 demandChainMeta 的开括号 {
let i = idx;
while (i < src.length && src[i] !== '{') i++;
const openBrace = i;
console.log('开括号 at:', openBrace);

// 配对找闭合 }
let depth = 1;
i = openBrace + 1;
let inStr = false;
let strCh = '';
while (i < src.length && depth > 0) {
  const c = src[i];
  if (inStr) {
    if (c === '\\') { i += 2; continue; }
    if (c === strCh) inStr = false;
  } else {
    if (c === "'" || c === '"') { inStr = true; strCh = c; }
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        console.log('demandChainMeta 闭合 } at:', i);
        console.log('闭合位置内容:', JSON.stringify(src.slice(i, i + 60)));
        break;
      }
    }
  }
  i++;
}

// 用 Function 包装测试这一段
const testSrc = src.slice(0, openBrace + 1) + src.slice(openBrace + 1, i + 1);
// 直接把这段拿出来用 new Function 包一下
try {
  const fn = new Function('return (' + testSrc + ');');
  const result = fn();
  console.log('eval 成功');
  console.log('segments:', result.segments ? result.segments.length : 'N/A');
  console.log('cagr:', result.segments ? result.segments.map(s => s.name + '=' + s.cagr).join(' / ') : 'N/A');
} catch (e) {
  console.log('eval ERR:', e.message);
}