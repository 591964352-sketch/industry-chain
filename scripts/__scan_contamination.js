// scan pcb.js and pcb.manual.js for developer-language contamination
var fs = require('fs');
global.window = { CHAINS: {} };

// Load data
eval(fs.readFileSync('data/pcb.js', 'utf8'));
eval(fs.readFileSync('data/pcb.manual.js', 'utf8'));

var chain = global.window.CHAINS.pcb;
var manual = global.window.PCB_MANUAL;

// Keywords that indicate developer contamination (not investment language)
var devKeywords = [
  'commit', 'idx ', 'pcb.manual.js', '渲染层', '同步到', 'bump',
  'DATA_VERSION', '★commit', '★ commit', 'P0-', 'Phase ',
  'CLAUDE.md', 'SKILL.md', 'manual/auto 双层', 'getEffective',
  'window.CHAINS', 'window.PCB_MANUAL', 'IIFE', 'manifest',
  'data/pcb', 'data/pcb.manual', 'backup', 'Node.js', 'eval(',
  'develop', 'dev note', 'TODO', 'FIXME', 'hack', 'workaround',
  '批量', '脚本', '注入', '写入脚本', '重跑', 'revert',
  'git log', 'git show', 'commit message', 'Co-Authored',
];

var findings = [];

// Helper: check a text field
function checkField(source, stockCode, stockName, fieldName, text) {
  if (typeof text !== 'string' || !text) return;
  devKeywords.forEach(function(kw) {
    var idx = text.indexOf(kw);
    if (idx >= 0) {
      var snippet = text.substring(Math.max(0, idx - 30), Math.min(text.length, idx + 80));
      findings.push({
        source: source,
        code: stockCode,
        name: stockName || '',
        field: fieldName,
        keyword: kw,
        snippet: snippet.trim()
      });
    }
  });
}

// 1. Scan pcb.js segments stocks
(chain.segments || []).forEach(function(seg) {
  (seg.stocks || []).forEach(function(s) {
    ['logic', 'position', 'trendNote', 'note'].forEach(function(f) {
      checkField('pcb.js segments', s.code, s.name, f, s[f]);
    });
  });
});

// 2. Scan pcb.js midstream
if (chain.midstream && chain.midstream.stocks) {
  chain.midstream.stocks.forEach(function(s) {
    ['logic', 'position', 'trendNote', 'note'].forEach(function(f) {
      checkField('pcb.js midstream', s.code, s.name, f, s[f]);
    });
  });
}

// 3. Scan pcb.js chokePoints
(chain.chokePoints || []).forEach(function(cp) {
  ['logic', 'verification'].forEach(function(f) {
    checkField('pcb.js chokePoints', cp.code, cp.name, f, cp[f]);
  });
});

// 4. Scan pcb.manual.js stocks
var manualStocks = manual.stocks;
Object.keys(manualStocks).forEach(function(code) {
  var s = manualStocks[code];
  // Check top-level fields
  ['position', 'investableReason', 'positionNote', 'trendNote', 'logic'].forEach(function(f) {
    checkField('pcb.manual.js stocks', code, s.name || '', f, s[f]);
  });
  // Check dims6 reason fields
  if (Array.isArray(s.dims6)) {
    s.dims6.forEach(function(d, i) {
      checkField('pcb.manual.js dims6', code, s.name || '', 'dims6[' + i + '].reason(' + d.key + ')', d.reason);
      checkField('pcb.manual.js dims6', code, s.name || '', 'dims6[' + i + '].evidence(' + d.key + ')', d.evidence);
    });
  }
  // Check fundamentals
  if (s.fundamentals) {
    checkField('pcb.manual.js fundamentals', code, s.name || '', 'fundamentals.note', s.fundamentals.note);
    checkField('pcb.manual.js fundamentals', code, s.name || '', 'fundamentals.source', s.fundamentals.source);
  }
  // Check riskMetrics
  if (s.riskMetrics) {
    checkField('pcb.manual.js riskMetrics', code, s.name || '', 'riskMetrics.note', s.riskMetrics.note);
  }
});

// 5. Scan chain-level fields
['methodologyNotes'].forEach(function(f) {
  checkField('pcb.js chain-level', '', '', f, chain[f]);
});

// 6. Scan pcb.manual.js _meta and other root fields
['methodologyNotes', '_meta'].forEach(function(f) {
  var val = manual[f];
  if (typeof val === 'string') {
    checkField('pcb.manual.js root', '', '', f, val);
  }
});

// Report findings (deduplicate by code+field+keyword)
var seen = {};
var unique = [];
findings.forEach(function(f) {
  var key = f.code + '|' + f.field + '|' + f.keyword;
  if (!seen[key]) {
    seen[key] = true;
    unique.push(f);
  }
});

console.log('=== CONTAMINATION SCAN RESULTS ===');
console.log('Total findings: ' + findings.length + ' (unique: ' + unique.length + ')');
console.log();

// Group by stock
var byCode = {};
unique.forEach(function(f) {
  var code = f.code || '(chain-level)';
  if (!byCode[code]) byCode[code] = [];
  byCode[code].push(f);
});

Object.keys(byCode).sort().forEach(function(code) {
  var items = byCode[code];
  console.log('--- ' + code + (items[0].name ? ' ' + items[0].name : '') + ' (' + items.length + ' hits) ---');
  items.forEach(function(f) {
    console.log('  [' + f.field + '] keyword=\"' + f.keyword + '\"');
    console.log('    ' + f.snippet);
  });
  console.log();
});
