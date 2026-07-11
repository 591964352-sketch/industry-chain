const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Step 1: Revert misplaced new segment in fourQuestions area
// Pattern to remove: ",{\n      name: '耗材-钻针',\n      stocks: [\n        { ...688625... }\n      ]\n    }"
const revertPattern = /\s*,?\{\s*name:\s*'耗材-钻针',[\s\S]*?\}\s*\n\s*\}/;
const revertMatch = src.match(revertPattern);
if (revertMatch) {
  src = src.replace(revertPattern, '\n');
  console.log('1. 回滚误插入的四问段位置 ✓');
} else {
  console.log('1. 未找到误插入段 (可能已不存在)');
}

// Step 2: Insert into segments array (correct location)
// Pattern: '    },\n  ];\n// ★ commit 4.13' → new segment + this pattern
const segEndPattern = /\n  \];\n\/\/ ★ commit 4\.13/;
const segMatch = src.match(segEndPattern);
if (segMatch) {
  const newSegment = `  ,{
    name: '耗材-钻针',
    stocks: [
      { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
    ]
  }
`;
  src = src.replace(segEndPattern, '\n' + newSegment + '];\n// ★ commit 4.13');
  console.log('2. 正确插入到 segments 数组 ✓');
} else {
  console.log('2. 未找到 segments 结束标记');
}

fs.writeFileSync('data/pcb.js', src);
console.log('\n--- Verification ---');
const lines = src.split('\n');
// Find 耗材-钻针 line
for (let i = 0; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('耗材-钻针')) {
    console.log('Line ' + (i+1) + ':', JSON.stringify(lines[i].slice(0, 80)));
  }
}