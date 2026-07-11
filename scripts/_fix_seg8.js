const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');

// Current broken structure around lines 382-390:
// 382: "    ]\r\n"
// 383: "  ,{\r\n"
// 384: "    name: '耗材-钻针',\r\n"
// 385: "    stocks: [\r\n"
// 386: "      { ...688625... }\r\n"
// 387: "    ]"
// 388: "  }"
// 389: "  },\r\n"
// 390: "];\r\n"

// What we want:
// "    ]\r\n"
// "  },{\r\n"        <- PCB设备 closing + new segment opening (comma before {, no \r\n between } and {)
// "    name: '耗材-钻针',\r\n"
// ...
// "    ]\r\n"
// "  }\r\n"          <- new segment close (no trailing comma)
// "];\r\n"

// Fix:
// 1. Change `  ,{` at L383 to `  },{`  (add closing brace of previous segment)
// 2. Change `    ]\n  }` (L387-388, no \r\n) to `    ]\r\n  }\r\n`

// Fix 1: replace L383 '  ,{' with '  },{'
src = src.replace(/\r\n  ,\{\r\n    name: '耗材-钻针',/, '\r\n  },{\r\n    name: \'耗材-钻针\',');

// Fix 2: ensure L388 '  }' has \r\n
src = src.replace(/\r\n    \]\r\n  \}\r\n  \},\r\n\];\r\n\/\/ ★ commit 4\.13/, '\r\n    ]\r\n  }\r\n];\r\n// ★ commit 4.13');

fs.writeFileSync('data/pcb.js', src);

const lines = src.split('\n');
for (let i = 380; i < 400; i++) {
  if (lines[i]) console.log((i+1)+':', JSON.stringify(lines[i].slice(0, 100)));
}