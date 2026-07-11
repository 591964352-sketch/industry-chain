const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Structure is: \r\n  }\r\n  },\r\n];\r\n
// Need to remove the trailing `  },\r\n` (the PCB设备 closing with comma) since my new segment is the LAST one
// Actually the structure I want is:
//   }
// ];
// (no comma after my last segment)
const re = /\r\n  \}\r\n  \},\r\n\];\r\n\/\/ ★ commit 4\.13/;
const m = src.match(re);
console.log('Match found:', !!m);
if (m) {
  src = src.replace(re, '\r\n  }\r\n];\r\n// ★ commit 4.13');
  console.log('Removed extra closing ✓');
}

fs.writeFileSync('data/pcb.js', src);

const lines = src.split('\n');
for (let i = 380; i < 400; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}