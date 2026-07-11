const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');
const lines = src.split('\n');

// Find the broken structure: pattern is multiple lines around 耗材-钻针
// Specifically find line with "  ,{" right after "    ]" line (the stocks closing)
// And the next-but-one line should be "  }," (PCB设备 closing - this should NOT be there)

const out = [];
let i = 0;
let fixed = false;

while (i < lines.length) {
  if (i > 0 && lines[i-1] && lines[i-1].includes('    ]') &&
      lines[i].trim() === ',{' &&
      i+1 < lines.length && lines[i+1] && lines[i+1].includes('name:') && lines[i+1].includes('耗材-钻针')) {
    // Found the broken pattern at lines i-1 (']') and i (',{')
    // Change line i from ',{' to '},{'
    out.push(lines[i-1]);      // '    ]'
    out.push('  },{');           // FIXED: PCB设备 closing + new segment opening (no comma between } and {)
    i++;  // skip next line (the 'name' line which is already in original lines array)
    continue;
  }
  // Find pattern where structure should be '  }' followed by '];' (no comma)
  // And there's an EXTRA '  },' between them
  if (i > 0 && lines[i-1] && lines[i-1].trim() === '}' && !lines[i-1].includes('{') &&
      lines[i] && lines[i].trim() === '},' &&
      i+1 < lines.length && lines[i+1] && lines[i+1].trim() === '];') {
    // Skip the extra '  },' line
    if (!fixed) {
      out.push(lines[i-1]);  // '  }'
      i++;  // skip the extra '  },' line
      i++;  // skip '];'
      out.push(lines[i-1]);  // actually, we've already incremented past
      fixed = true;
      continue;
    }
  }
  out.push(lines[i]);
  i++;
}

// Restore CRLF
fs.writeFileSync('data/pcb.js', out.join('\r\n'));

console.log('Fixed. Result:');
const newLines = fs.readFileSync('data/pcb.js', 'utf8').split('\n');
for (let i = 380; i < 400; i++) {
  if (newLines[i]) console.log((i+1)+':', JSON.stringify(newLines[i].slice(0, 100)));
}