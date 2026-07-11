const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// 找到 segments 数组的最后一段 - L517 的 "    }," 后插入新 segment
// 新 segment 用完整结构

const newSegment = `    ,{
      name: '耗材-钻针',
      stocks: [
        { rank:1, name:'鼎泰高科', code:'688625', barrier:'高', tier:'primary', valAsOf:'2026-06-22', src:'akshare/新浪财经(基于公司季报)', trend:'up', trendNote:'钻针全球第一29.2%·50倍径独家·高端AI钻针70-80%·2025均价1.38元/支' }
      ]
    }
`;

// 找到 segments 数组的最后 "    }," + "\n  ]" 模式
const re = /\n    \},\n  \]/;
const m = src.match(re);
if (m) {
  // 在最后 "    }," 后面插入逗号 + 新段
  const idx = m.index + m[0].indexOf('\n  ]');
  const before = src.slice(0, idx);
  const after = src.slice(idx);
  src = before + newSegment + after;
  console.log('✓ 已新增 segment "耗材-钻针" + stock 688625 鼎泰高科');
  console.log('  插入位置: ' + (idx + 1) + ' 字符');
} else {
  console.log('✗ segments 结束标记未找到');
}

fs.writeFileSync('data/pcb.js', src);

// 验证
const lines = src.split('\n');
let newSegLine = -1;
for (let i = 430; i < 560; i++) {
  if (lines[i] && lines[i].includes('耗材-钻针')) {
    newSegLine = i + 1;
    console.log('  验证: line ' + newSegLine + ': ' + JSON.stringify(lines[i]));
  }
  if (lines[i] && lines[i].includes("code:'688625'")) {
    console.log('  验证: 688625 line ' + (i+1) + ': ' + JSON.stringify(lines[i].slice(0, 120)));
  }
}