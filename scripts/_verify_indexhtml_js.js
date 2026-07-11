// 验证 index.html 主 inline script 的 JS 语法
// 提取 <script>...</script> 块内 JS 代码（排除 <script src="...">）
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// 找主 inline script: 第二个 <script>...</script>（第一个是 manifest 块）
// 用正则非贪婪匹配: <script>(?![^>]*src=)...</script>
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
let m;
const codes = [];
while ((m = re.exec(html)) !== null) {
  codes.push(m[1]);
}

console.log('找到 inline <script> 块数:', codes.length);
codes.forEach((code, i) => {
  try {
    // 包装 IIFE 让 document.write 不报 ReferenceError
    new Function('var document={write:function(){}};var window={};' + code);
    console.log('  #' + i + ' JS OK (' + code.length + ' chars)');
  } catch (e) {
    console.log('  #' + i + ' JS ERR:', e.message);
  }
});