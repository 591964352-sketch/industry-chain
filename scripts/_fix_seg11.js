const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// The actual broken content uses mixed line endings
// Let me find the broken pattern using simpler substring matching

// Step 1: Find the line with '  ,{' and replace with '  },{'
// Pattern: stocks close ']' then '  ,{' (this '  ,{' should be '  },{')
const re1 = /\]\r\n  ,\{\r\n    name: '耗材-钻针',/g;
const m1 = src.match(re1);
console.log('Pattern 1 matches:', m1 ? m1.length : 0);
if (m1) {
  src = src.replace(re1, ']\r\n  },{\r\n    name: \'耗材-钻针\',');
  console.log('Step 1 fixed ✓');
}

// Step 2: The ']' after '{rank:1, ...}' line should have \r\n after it
// Current: }\r\n    ] 𝟐  } 𝟐  },\r\n];
// Target:  }\r\n    ]\r\n  }\r\n  },\r\n]; (NO wait - new segment is last so no comma)
// Actually target: }\r\n    ]\r\n  }\r\n]; (drop extra '  },' line)

const re2 = /\}\r\n    \]\n  \}\n  \},\r\n\];/g;
const m2 = src.match(re2);
console.log('Pattern 2 matches:', m2 ? m2.length : 0);
if (m2) {
  src = src.replace(re2, '}\r\n    ]\r\n  }\r\n];');
  console.log('Step 2 fixed ✓');
}

fs.writeFileSync('data/pcb.js', src);

// Verify
const lines = src.split('\n');
for (let i = 380; i < 400; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}

try {
  global.window={};
  eval(src);
  console.log('JS syntax OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}