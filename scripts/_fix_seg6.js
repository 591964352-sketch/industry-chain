const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Remove the extra `  },` before `];\r\n// ★ commit 4.13`
// Currently structure is:
//   }
//   },
// ];
// Should be:
//   }
// ];
const re = /\r\n  \},\r\n  \},\r\n\];\r\n\/\/ ★ commit 4\.13/;
const m = src.match(re);
if (m) {
  src = src.replace(re, '\r\n  }\r\n];\r\n// ★ commit 4.13');
  console.log('Removed extra `},` ✓');
} else {
  console.log('Pattern not found');
}

fs.writeFileSync('data/pcb.js', src);

const lines = src.split('\n');
for (let i = 380; i < 400; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}