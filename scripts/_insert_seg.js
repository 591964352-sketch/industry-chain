const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

const newSegment = `    ,{
      name: '耗材-钻针',
      stocks: [
        { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
      ]
    }
`;

// 直接搜索: L517 '    },' + L518 '  ]'
// 用具体的字符串模式
const searchStr = '\r\n    },\r\n  ]\r\n};\r\n';
const idx = src.indexOf(searchStr);
if (idx === -1) {
  // Try without \r
  const searchStr2 = '\n    },\n  ]\n};\n';
  const idx2 = src.indexOf(searchStr2);
  if (idx2 === -1) {
    console.log('Pattern not found');
  } else {
    console.log('Found pattern at idx', idx2);
    const before = src.slice(0, idx2);
    const after = src.slice(idx2 + searchStr2.length);
    src = before + '    },\n' + newSegment + '  ]\n};\n' + after;
    console.log('Inserted new segment');
  }
} else {
  console.log('Found pattern at idx', idx);
  const before = src.slice(0, idx);
  const after = src.slice(idx + searchStr.length);
  src = before + '\r\n    },\r\n' + newSegment + '\r\n  ]\r\n};\r\n' + after;
  console.log('Inserted new segment');
}

fs.writeFileSync('data/pcb.js', src);

// Verify
const lines = src.split('\n');
for (let i = 510; i < 535; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}

// Verify 688625 in pcb.js
console.log('\n=== Verification ===');
console.log('688625 in pcb.js:', src.includes("code:'688625'"));
console.log('耗材-钻针 in pcb.js:', src.includes('耗材-钻针'));