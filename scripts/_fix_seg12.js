const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Known exact pattern at offset 64091:
// "    ]\r\n  ,{\n    name: '耗材-钻针',\n    stocks: [\n      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }\n    ]\n  }\n  },\r\n];\r\n// ★ commit 4.13"

const brokenStr = "    ]\r\n  ,{\n    name: '耗材-钻针',\n    stocks: [\n      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }\n    ]\n  }\n  },\r\n];\r\n// ★ commit 4.13";

const fixedStr = "    ]\r\n  },{\r\n    name: '耗材-钻针',\r\n    stocks: [\r\n      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }\r\n    ]\r\n  }\r\n];\r\n// ★ commit 4.13";

const idx = src.indexOf(brokenStr);
console.log('idx:', idx);
if (idx !== -1) {
  src = src.slice(0, idx) + fixedStr + src.slice(idx + brokenStr.length);
  console.log('Fixed ✓');
} else {
  console.log('Broken pattern not found');
}

fs.writeFileSync('data/pcb.js', src);

// Verify structure
const lines = src.split('\n');
for (let i = 380; i < 400; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}

// Validate JS syntax
try {
  global.window = {};
  new Function(src);
  console.log('JS syntax OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}