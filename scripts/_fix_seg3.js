const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Insert before `  ],\n  ];\n// ★ commit 4.13` (segments closing)
const segEndPattern = /\n  \},\n  \];\n\/\/ ★ commit 4\.13/;
const segMatch = src.match(segEndPattern);
if (segMatch) {
  const newSegment = `  ,{
    name: '耗材-钻针',
    stocks: [
      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
    ]
  }
`;
  src = src.replace(segEndPattern, '\n  },\n' + newSegment + '];\n// ★ commit 4.13');
  console.log('Inserted new segment at correct position ✓');
} else {
  console.log('Pattern not found');
}

fs.writeFileSync('data/pcb.js', src);

// Verify
const lines = src.split('\n');
for (let i = 380; i < 400; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 80)));
}