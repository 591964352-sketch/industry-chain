const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Find the closing of segments array (];) followed by comment
// Pattern:  '  },\n  ];\n// ★ commit 4.13'
// Use indexOf to be more robust
const idx = src.indexOf('  ];\n// ★ commit 4.13');
if (idx === -1) {
  // Try alternative pattern
  const idx2 = src.indexOf('];\n// ★ commit 4.13');
  if (idx2 === -1) {
    console.log('Pattern not found at all');
  } else {
    console.log('Found alt pattern at idx', idx2);
    const newSegment = `  ,{
    name: '耗材-钻针',
    stocks: [
      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
    ]
  }
`;
    src = src.slice(0, idx2) + newSegment + src.slice(idx2);
    console.log('Inserted ✓');
  }
} else {
  console.log('Found pattern at idx', idx);
  const newSegment = `  ,{
    name: '耗材-钻针',
    stocks: [
      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
    ]
  }
`;
  src = src.slice(0, idx) + newSegment + src.slice(idx);
  console.log('Inserted ✓');
}

fs.writeFileSync('data/pcb.js', src);

// Verify
const lines = src.split('\n');
for (let i = 380; i < 410; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}