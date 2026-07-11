const fs = require('fs');
let m = fs.readFileSync('data/pcb.manual.js', 'utf8');

// Extract the exact text from the file and remove it
const marker = '用户口径修正(2026-07-05 commit 6.44 前置自查)';
const idx = m.indexOf(marker);
const trailStart = m.lastIndexOf('▍▍▍▍', idx);
const afterMarker = m.indexOf('▍tier=', idx);
const exactOld = m.substring(trailStart, afterMarker);

console.log('Removing:', exactOld.length, 'chars');
m = m.substring(0, trailStart) + m.substring(afterMarker);
fs.writeFileSync('data/pcb.manual.js', m, 'utf8');
console.log('✓ 002636 visibility: cleaned via extraction');
// Verify
const newIdx = m.indexOf(marker);
console.log('Marker still present?', newIdx >= 0 ? 'YES ⚠' : 'NO ✓');
