const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Use indexOf with CRLF (file uses \r\n line endings)
const searchStr = '\r\n  },\r\n];\r\n// ★ commit 4.13';
const idx = src.indexOf(searchStr);
console.log('idx:', idx);
if (idx === -1) {
  console.log('Pattern not found');
} else {
  const newSegment = `  ,{
    name: '耗材-钻针',
    stocks: [
      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
    ]
  }
`;
  // Insert before \r\n  },\r\n];
  src = src.slice(0, idx + 2) + newSegment + '  },\r\n];\r\n// ★ commit 4.13' + src.slice(idx + searchStr.length);
  console.log('Inserted ✓');
}

fs.writeFileSync('data/pcb.js', src);

// Verify
const lines = src.split('\n');
for (let i = 380; i < 410; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}