// scripts/compute_moat_timing.js (fixed)
var fs = require('fs');

var FIT_CONFIG = {
  moat: { durability: 0.25, barrier: 0.25, visibility: 0.20, supply: 0.20, policy: 0.10 },
  timing: { valuation: 1.00 }
};

var chainId = process.argv[2];
if (!chainId) { console.log('Usage: node scripts/compute_moat_timing.js <chainId>'); process.exit(1); }

var manualPath = 'data/' + chainId + '.manual.js';
if (!fs.existsSync(manualPath)) { console.log('ERROR: not found'); process.exit(1); }

global.window = {};
var raw = fs.readFileSync(manualPath, 'utf8');
eval(raw);

var manualKey = chainId.toUpperCase().replace(/-/g, '_') + '_MANUAL';
var nsName = chainId === 'pcb' ? 'PCB_MANUAL' : manualKey;
var manual = global.window[nsName];
if (!manual || !manual.stocks) { console.log('ERROR: no stocks'); process.exit(1); }

// Build the full data object that will go into Object.assign
// First, collect all top-level keys from the existing manual
var dataObj = {};
Object.keys(manual).forEach(function(k) {
  dataObj[k] = manual[k];
});

// Modify stocks
var updated = 0;
Object.keys(dataObj.stocks).forEach(function(code) {
  var s = dataObj.stocks[code];
  if (!s.dims6 || s.dims6.length < 6) return;
  var d = {};
  s.dims6.forEach(function(x) { d[x.key] = x.score; });
  s.moatScore = Math.round(
    ((d.durability || 3) / 5 * 0.25 + (d.barrier || 3) / 5 * 0.25 +
     (d.visibility || 3) / 5 * 0.20 + (d.supply || 3) / 5 * 0.20 +
     (d.policy || 3) / 5 * 0.10) * 100
  );
  s.timingScore = Math.round((d.valuation / 5) * 100);
  s.quadrant = s.moatScore >= 60 && s.timingScore >= 50 ? 'core' :
               s.moatScore >= 60 && s.timingScore < 50 ? 'hold' :
               s.moatScore < 60 && s.timingScore >= 40 ? 'watch' : 'skip';
  s.moatComputedAt = new Date().toISOString().substring(0, 10);
  updated++;
});

// Reconstruct file
var newContent = 'window.' + nsName + ' = window.' + nsName + ' || {};\n';
newContent += '(function(MANUAL){\n';
newContent += '  Object.assign(MANUAL, ' + JSON.stringify(dataObj, null, 2) + ');\n';
newContent += '})(window.' + nsName + ');\n';

fs.writeFileSync(manualPath, newContent, 'utf8');
console.log(chainId + ': ' + updated + ' stocks updated');
var codes = Object.keys(dataObj.stocks).slice(0, 3);
codes.forEach(function(code) {
  var s = dataObj.stocks[code];
  console.log('  ' + code + ' ' + s.name + ' moat=' + s.moatScore + ' timing=' + s.timingScore + ' q=' + s.quadrant);
});

// Validate
global.window = {};
eval(newContent);
var m2 = global.window[nsName];
console.log('Validate: ' + Object.keys(m2.stocks).length + ' stocks, moatOK=' + (m2.stocks[Object.keys(m2.stocks)[0]].moatScore !== undefined));
