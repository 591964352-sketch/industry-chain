/**
 * check_schema_completeness.js — 全字段完备性自动检测
 * 对照PCB链(金标准)检查任意链的字段完整性和字段名一致性
 * 用法: node scripts/check_schema_completeness.js [chainId]
 */
const fs = require('fs');
const path = require('path');
const targetChain = process.argv[2];

global.window = {};
const dataDir = path.resolve(__dirname, '..', 'data');
const allFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') && !f.includes('.manual') && !f.includes('.bak') && !f.startsWith('_'));
const allChains = allFiles.map(f => f.replace('.js', ''));
const chainsToCheck = targetChain ? [targetChain] : allChains;

// Load all chains
chainsToCheck.forEach(id => { try { require('../data/' + id + '.js'); } catch(e) {} });

// PCB golden standard
const PCB = global.window.CHAINS.pcb;
if (!PCB && !targetChain) { console.log('ERROR: PCB chain not found'); process.exit(1); }

// PCB-specific fields that other chains shouldn't need
const PCB_ONLY_TOP = ['chokePointsMeta','signalMeta','signalCMeta','signalCHistory','holdingMeta'];

function checkChain(chainId) {
  const CH = global.window.CHAINS[chainId];
  if (!CH) { console.log('❌ ' + chainId + ': CHAINS entry not found'); return {errors:1}; }

  let errors = 0, warnings = 0;

  // === TOP LEVEL ===
  if (PCB) {
    const pcbTop = Object.keys(PCB).filter(k => !PCB_ONLY_TOP.includes(k));
    pcbTop.forEach(k => {
      if (CH[k] === undefined || CH[k] === null) {
        console.log('  ❌ TOP.' + k + ': MISSING');
        errors++;
      }
    });
  }

  // === SEGMENT LEVEL ===
  if (PCB && PCB.segments && PCB.segments[0]) {
    const pcbSegKeys = Object.keys(PCB.segments[0]);
    (CH.segments || []).forEach((seg, si) => {
      pcbSegKeys.forEach(k => {
        if (seg[k] === undefined || seg[k] === null) {
          console.log('  ❌ SEG[' + si + '].' + k + ': MISSING (' + (seg.name||'?') + ')');
          errors++;
        }
      });
    });
  }

  // === STOCK LEVEL ===
  if (PCB && PCB.segments && PCB.segments[0] && PCB.segments[0].stocks) {
    const pcbStkKeys = Object.keys(PCB.segments[0].stocks[0]);
    (CH.segments || []).forEach((seg, si) => {
      (seg.stocks || []).forEach((s, j) => {
        pcbStkKeys.forEach(k => {
          if (s[k] === undefined || s[k] === null) {
            console.log('  ❌ SEG[' + si + '].stocks[' + j + '].' + k + ': MISSING (' + (s.code||'?') + ' ' + (s.name||'?') + ')');
            errors++;
          }
        });
      });
    });
  }

  // === SUPPLYGAP (includes treeMapMatches for treeMap badge rendering) ===
  if (PCB && PCB.supplyGap && PCB.supplyGap[0] && CH.supplyGap) {
    const pcbSGKeys = Object.keys(PCB.supplyGap[0]);
    CH.supplyGap.forEach((g, i) => {
      pcbSGKeys.forEach(k => {
        if (g[k] === undefined || g[k] === null || g[k] === '') {
          console.log('  ❌ supplyGap[' + i + '].' + k + ': MISSING (' + (g.segment||g.name||'?') + ')');
          errors++;
        }
      });
      // treeMapMatches is needed for treeMap badge display
      if (!g.treeMapMatches || !Array.isArray(g.treeMapMatches) || g.treeMapMatches.length === 0) {
        console.log('  ⚠️ supplyGap[' + i + '].treeMapMatches: MISSING/EMPTY (' + (g.segment||g.name||'?') + ' · treeMap供需缺口框无法显示)');
        warnings++;
      }
    });
  }

  // === OVERVIEW ===
  if (PCB && PCB.overview && PCB.overview[0] && CH.overview) {
    const pcbOVKeys = Object.keys(PCB.overview[0]);
    CH.overview.forEach((o, i) => {
      pcbOVKeys.forEach(k => {
        if (o[k] === undefined || o[k] === null) {
          console.log('  ⚠️ overview[' + i + '].' + k + ': MISSING');
          warnings++;
        }
      });
    });
  }

  // === CYCLEPOSITION ===
  if (PCB && PCB.cyclePosition && CH.cyclePosition) {
    const pcbCPKeys = Object.keys(PCB.cyclePosition);
    pcbCPKeys.forEach(k => {
      if (CH.cyclePosition[k] === undefined || CH.cyclePosition[k] === null) {
        console.log('  ❌ cyclePosition.' + k + ': MISSING');
        errors++;
      }
    });
  }

  // === MIDSTREAM (upgraded to errors — missing rank causes visible undefined) ===
  if (PCB && PCB.midstream && PCB.midstream.stocks && PCB.midstream.stocks[0] && CH.midstream && CH.midstream.stocks) {
    const pcbMSKeys = Object.keys(PCB.midstream.stocks[0]);
    CH.midstream.stocks.forEach((s, i) => {
      pcbMSKeys.forEach(k => {
        // rank/barrier/code are critical rendering fields — missing = visible undefined
        const isCritical = ['rank','barrier','code','name'].includes(k);
        if (s[k] === undefined || s[k] === null) {
          if (isCritical) {
            console.log('  ❌ midstream.stocks[' + i + '].' + k + ': MISSING (' + (s.code||'?') + ')');
            errors++;
          } else {
            console.log('  ⚠️ midstream.stocks[' + i + '].' + k + ': MISSING (' + (s.code||'?') + ')');
            warnings++;
          }
        }
      });
    });
  }

  // === CHOKEPOINTS (NEW — was completely missing before 2026-07-17) ===
  if (PCB && PCB.chokePoints && PCB.chokePoints[0] && CH.chokePoints && CH.chokePoints.length > 0) {
    const pcbCPKeys = Object.keys(PCB.chokePoints[0]);
    CH.chokePoints.forEach((cp, i) => {
      pcbCPKeys.forEach(k => {
        // segment/strength/logic are critical — missing = visible "🔒 undefined"
        const isCritical = ['segment','strength','logic','code','name'].includes(k);
        if (cp[k] === undefined || cp[k] === null) {
          if (isCritical) {
            console.log('  ❌ chokePoints[' + i + '].' + k + ': MISSING (' + (cp.code||'?') + ')');
            errors++;
          } else {
            console.log('  ⚠️ chokePoints[' + i + '].' + k + ': MISSING (' + (cp.code||'?') + ')');
            warnings++;
          }
        }
      });
    });
  }

  // === fourQuestions ===
  if (CH.fourQuestions && CH.fourQuestions.segments) {
    CH.fourQuestions.segments.forEach((seg, si) => {
      if (seg.stocks) {
        seg.stocks.forEach((s, j) => {
          ['q1','q2','q3','q4'].forEach(q => {
            if (s[q] === undefined || s[q] === null) {
              console.log('  ❌ fourQuestions[' + si + '].stocks[' + j + '].' + q + ': MISSING (' + (s.code||'?') + ')');
              errors++;
            }
          });
          if (s.hits === undefined || s.hits === null) {
            console.log('  ⚠️ fourQuestions[' + si + '].stocks[' + j + '].hits: MISSING (' + (s.code||'?') + ')');
            warnings++;
          }
        });
      }
    });
  }

  return {errors, warnings};
}

console.log('========================================');
console.log('check_schema_completeness · 字段完备性检测');
console.log('========================================\n');

chainsToCheck.forEach(chainId => {
  console.log('=== ' + chainId + ' ===');
  const result = checkChain(chainId);
  const status = result.errors === 0 ? '✅' : '❌';
  console.log(status + ' ' + chainId + ': ' + result.errors + ' errors, ' + result.warnings + ' warnings\n');
});
