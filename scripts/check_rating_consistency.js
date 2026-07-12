// scripts/check_rating_consistency.js
// 跨字段评级一致性自动检测脚本 · 2026-07-12 立
// 用法: node scripts/check_rating_consistency.js [chainId]
//       node scripts/check_rating_consistency.js pcb
//       node scripts/check_rating_consistency.js semicon-equip
//       node scripts/check_rating_consistency.js --all
//
// 集成: §13 新链上线前置检查清单强制项 · page_audit.py 第【9】项调用

var fs = require('fs');
var vm = require('vm');

// ===== CONFIG =====
var FIT_CONFIG = {
  moat: { durability: 0.25, barrier: 0.25, visibility: 0.20, supply: 0.20, policy: 0.10 },
  timing: { valuation: 1.00 }
};

// ===== HELPERS =====
function loadChain(chainId) {
  global.window = {};
  // Load manual layer first (for dims6)
  var manualPath = 'data/' + chainId + '.manual.js';
  if (!fs.existsSync(manualPath)) {
    console.log('[SKIP] ' + chainId + ': no manual.js');
    return null;
  }
  eval(fs.readFileSync(manualPath, 'utf8'));
  var manualKey = chainId.toUpperCase().replace(/-/g, '_') + '_MANUAL';
  var manual = global.window[manualKey];
  if (!manual || !manual.stocks) { console.log('[SKIP] ' + chainId + ': manual layer empty'); return null; }

  // Load auto layer for chokePoints and fourQuestions
  var autoPath = 'data/' + chainId + '.js';
  var c = fs.readFileSync(autoPath, 'utf8');
  var ctx = vm.createContext({ window: {} });
  try { new vm.Script(c).runInContext(ctx); } catch(e) { eval(c); }
  var auto = ctx.window.CHAINS[chainId] || global.window.CHAINS[chainId];
  if (!auto) { console.log('[SKIP] ' + chainId + ': auto layer empty'); return null; }

  return { chainId: chainId, auto: auto, manual: manual };
}

function computeMoatTiming(dims6) {
  var d = {};
  dims6.forEach(function(x) { d[x.key] = x.score; });
  var moat = Math.round(
    ((d.durability || 3) / 5 * 0.25 + (d.barrier || 3) / 5 * 0.25 +
     (d.visibility || 3) / 5 * 0.20 + (d.supply || 3) / 5 * 0.20 +
     (d.policy || 3) / 5 * 0.10) * 100
  );
  var timing = Math.round(((d.valuation || 3) / 5) * 100);
  var quadrant = moat >= 60 && timing >= 50 ? 'core' :
                 moat >= 60 && timing < 50 ? 'hold' :
                 moat < 60 && timing >= 40 ? 'watch' : 'skip';
  return { moatScore: moat, timingScore: timing, quadrant: quadrant };
}

function isAuthorizedOverride(stock, chokePoint, fourQ) {
  var hasStrengthNote = !!(chokePoint && chokePoint.strengthNote &&
    chokePoint.strengthNote.length >= 20);
  var hasQ1Note = !!(fourQ && fourQ.q1note && fourQ.q1note.length >= 20);
  var hasVerifyNote = !!(chokePoint && chokePoint.verification &&
    chokePoint.verification.note && chokePoint.verification.note.length >= 20);
  return {
    authorized: hasStrengthNote || hasQ1Note || hasVerifyNote,
    sources: [hasStrengthNote ? 'strengthNote' : null,
              hasQ1Note ? 'q1note' : null,
              hasVerifyNote ? 'verification.note' : null].filter(Boolean)
  };
}

// ===== RULES =====
function checkR1(chain) {
  // fourQuestions.strength vs hits 衍生一致性
  var issues = [];
  (chain.auto.fourQuestions.segments || []).forEach(function(seg) {
    (seg.stocks || []).forEach(function(s) {
      var expected = { 4: '★★★', 3: '★★☆', 2: '★☆☆', 1: '☆☆☆', 0: null }[s.hits || 0];
      if (s.strength !== expected) {
        issues.push({
          severity: 'BLOCK',
          code: s.code,
          name: s.name,
          msg: 'fourQ.strength=' + (s.strength || 'null') + ' 但 hits=' + (s.hits || 0) + ' 衍生值应为 ' + (expected || 'null')
        });
      }
    });
  });
  return issues;
}

function checkR2(chain) {
  // chokePoints.strength vs dims6.barrier 一致性
  var issues = [];
  (chain.auto.chokePoints || []).forEach(function(cp) {
    var ms = chain.manual.stocks[cp.code];
    if (!ms || !ms.dims6) return;
    var barrierDim = ms.dims6.find(function(d) { return d.key === 'barrier'; });
    if (!barrierDim) return;
    var b = barrierDim.score;

    // barrier≥5 should be ★★★
    if (b >= 5 && cp.strength !== '★★★') {
      var auth = isAuthorizedOverride(ms, cp, null);
      issues.push({
        severity: auth.authorized ? 'AUTHORIZED' : 'BLOCK',
        code: cp.code, name: cp.name,
        msg: (auth.authorized ? '✅ ' : '🚨 ') + 'barrier=' + b + ' 但 choke=' + cp.strength +
          (auth.authorized ? ' (理由: ' + auth.sources.join(', ') + ')' : ' —— 无 strengthNote 书面理由，未授权矛盾')
      });
    }
    // barrier=4 with choke=★★★ needs override justification
    if (b === 4 && cp.strength === '★★★') {
      var auth2 = isAuthorizedOverride(ms, cp, null);
      issues.push({
        severity: auth2.authorized ? 'AUTHORIZED' : 'WARN',
        code: cp.code, name: cp.name,
        msg: (auth2.authorized ? '✅ ' : '⚠️ ') + 'barrier=4 但 choke=★★★（上修）' +
          (auth2.authorized ? ' (理由: ' + auth2.sources.join(', ') + ')' : ' —— 无书面理由，可能偏高')
      });
    }
    // barrier≤3 shouldn't be in chokePoints
    if (b <= 3) {
      var auth3 = isAuthorizedOverride(ms, cp, null);
      issues.push({
        severity: auth3.authorized ? 'AUTHORIZED' : 'BLOCK',
        code: cp.code, name: cp.name,
        msg: (auth3.authorized ? '✅ ' : '🚨 ') + 'barrier=' + b + ' ≤3 不应进入 chokePoints' +
          (auth3.authorized ? ' (理由: ' + auth3.sources.join(', ') + ')' : ' —— 不满足物理卡口硬标准')
      });
    }
  });
  return issues;
}

function checkR3(chain) {
  // chokePoints.strength vs fourQuestions cross-validation
  // ★ 2026-07-12 v2: variant 型四问（techBarrier）自动跳过标准型 q1-q4/hits 检查
  //   改用 variant 自身的 q1p-q4p/hits 做交叉验证
  var issues = [];
  (chain.auto.chokePoints || []).forEach(function(cp) {
    // Find fourQ data (with segment context for variant detection)
    var fq = null, fqSeg = null;
    (chain.auto.fourQuestions.segments || []).forEach(function(seg) {
      (seg.stocks || []).forEach(function(s) {
        if (s.code === cp.code) { fq = s; fqSeg = seg; }
      });
    });
    if (!fq) return;

    var isVariant = !!(fqSeg && fqSeg.variant === 'techBarrier');

    // ★ v2: variant 段位 → 完全跳过标准型 q1-q4/hits 检查
    //   标准型四问对 variant 段位无意义（如 AI PCB 制造段全球竞争者>20家，
    //   q1"全球≤3家"永远不成立），variant 有自己的 q1p-q4p 评估维度
    if (isVariant) {
      // 但需验证 variant 字段本身是否已填写（q1p-q4p 至少有一项为 true）
      var variantHits = (typeof fq.hits === 'number') ? fq.hits : (
        [fq.q1p, fq.q2p, fq.q3p, fq.q4p].filter(function(x) { return x === true; }).length
      );
      if (variantHits === 0) {
        issues.push({
          severity: 'WARN',
          code: cp.code, name: cp.name,
          msg: '⚠️ techBarrier variant 已声明但 q1p-q4p 全部未填写 —— chokePoint 入选合理性未经 variant 四问验证'
        });
      }
      // variant 填写完整 → 静默跳过，不产生任何 WARN
      return;
    }

    var hits = fq.hits || 0;
    var auth = isAuthorizedOverride(null, cp, fq);

    // fourQ hits=0 means never filled
    if (hits === 0) {
      issues.push({
        severity: 'WARN',
        code: cp.code, name: cp.name,
        msg: '⚠️ fourQ hits=0 —— chokePoint 入选合理性未经四问验证'
      });
      return;
    }
    // ★ Generalized: any mismatch between derived strength from hits and chokePoint strength
    var derivedStr = {4:'★★★',3:'★★☆',2:'★☆☆',1:'☆☆☆',0:null}[hits];
    if (derivedStr && cp.strength !== derivedStr) {
      if (derivedStr === '★★★' && cp.strength !== '★★★') {
        // fourQ says ★★★ but choke is lower → potentially undervalued
        issues.push({
          severity: auth.authorized ? 'AUTHORIZED' : 'WARN',
          code: cp.code, name: cp.name,
          msg: (auth.authorized ? '✅ ' : '⚠️ ') + 'fourQ hits=' + hits + '→★★★ 但 choke=' + cp.strength +
            ' —— 可能被低估' + (auth.authorized ? ' (理由: ' + auth.sources.join(', ') + ')' : ' ·需 strengthNote')
        });
      } else if (derivedStr === '★★☆' && cp.strength === '★★★') {
        // fourQ says ★★☆ but choke is ★★★ → fourQ lower than choke
        issues.push({
          severity: auth.authorized ? 'AUTHORIZED' : 'WARN',
          code: cp.code, name: cp.name,
          msg: (auth.authorized ? '✅ ' : '⚠️ ') + 'fourQ hits=' + hits + '→★★☆ 但 choke=★★★' +
            ' —— 四问星级低于卡口星级' + (auth.authorized ? ' (理由: ' + auth.sources.join(', ') + ')' : ' ·需 q1note/strengthNote 说明偏离理由')
        });
      } else {
        // Other mismatch
        issues.push({
          severity: auth.authorized ? 'AUTHORIZED' : 'WARN',
          code: cp.code, name: cp.name,
          msg: (auth.authorized ? '✅ ' : '⚠️ ') + 'fourQ hits=' + hits + '→' + derivedStr + ' 但 choke=' + cp.strength +
            (auth.authorized ? ' (理由: ' + auth.sources.join(', ') + ')' : ' ·评级不一致')
        });
      }
    }
  });
  return issues;
}

function checkR4(chain) {
  // segments.barrier label vs dims6.barrier.score 映射
  var issues = [];
  var map = { 5: '极高', 4: '高', 3: '中', 2: '低', 1: '低' };
  (chain.auto.segments || []).forEach(function(seg) {
    (seg.stocks || []).forEach(function(s) {
      var ms = chain.manual.stocks[s.code];
      if (!ms || !ms.dims6) return;
      var barrierDim = ms.dims6.find(function(d) { return d.key === 'barrier'; });
      if (!barrierDim) return;
      var expected = map[barrierDim.score];
      if (s.barrier !== expected) {
        issues.push({
          severity: 'WARN',
          code: s.code, name: s.name,
          msg: 'seg.barrier="' + s.barrier + '" 但 dims6 barrier=' + barrierDim.score + ' 应映射为"' + expected + '"'
        });
      }
    });
  });
  // Also check midstream
  if (chain.auto.midstream && chain.auto.midstream.stocks) {
    chain.auto.midstream.stocks.forEach(function(s) {
      var ms = chain.manual.stocks[s.code];
      if (!ms || !ms.dims6) return;
      var barrierDim = ms.dims6.find(function(d) { return d.key === 'barrier'; });
      if (!barrierDim) return;
      var expected = map[barrierDim.score];
      if (s.barrier !== expected) {
        issues.push({
          severity: 'WARN',
          code: s.code, name: s.name,
          msg: 'midstream.barrier="' + s.barrier + '" 但 dims6 barrier=' + barrierDim.score + ' 应映射为"' + expected + '"'
        });
      }
    });
  }
  return issues;
}

function checkR5(chain) {
  // moatScore/timingScore vs dims6 衍生一致性
  var issues = [];
  Object.keys(chain.manual.stocks).forEach(function(code) {
    var s = chain.manual.stocks[code];
    if (!s.dims6) return;
    var computed = computeMoatTiming(s.dims6);
    if (s.moatScore !== undefined && s.moatScore !== computed.moatScore) {
      issues.push({
        severity: 'WARN',
        code: code, name: s.name,
        msg: 'moatScore 不一致: 存储=' + s.moatScore + ' 衍生=' + computed.moatScore + ' —— 需重跑 compute_moat_timing.js'
      });
    }
    if (s.timingScore !== undefined && s.timingScore !== computed.timingScore) {
      issues.push({
        severity: 'WARN',
        code: code, name: s.name,
        msg: 'timingScore 不一致: 存储=' + s.timingScore + ' 衍生=' + computed.timingScore
      });
    }
  });
  return issues;
}

// ===== R6: barrier=5 候选新增扫描 =====
function checkR6(chain) {
  var issues = [];
  var chokes = new Set();
  (chain.auto.chokePoints || []).forEach(function(cp) { chokes.add(cp.code); });

  // 计算现有 chokePoints moat 最低值
  var chokeMoats = [];
  (chain.auto.chokePoints || []).forEach(function(cp) {
    var ms = chain.manual.stocks[cp.code];
    if (ms && ms.dims6) {
      chokeMoats.push(computeMoatTiming(ms.dims6).moatScore);
    }
  });
  var lowestMoat = chokeMoats.length > 0 ? Math.min.apply(null, chokeMoats) : 60;

  // 扫描全部 segments
  var allStocks = [];
  (chain.auto.segments || []).forEach(function(seg) {
    (seg.stocks || []).forEach(function(s) { allStocks.push(s); });
  });
  if (chain.auto.midstream && chain.auto.midstream.stocks) {
    chain.auto.midstream.stocks.forEach(function(s) { allStocks.push(s); });
  }

  var seen = new Set();
  allStocks.forEach(function(s) {
    if (seen.has(s.code)) return;
    seen.add(s.code);
    if (chokes.has(s.code)) return;

    var ms = chain.manual.stocks[s.code];
    if (!ms || !ms.dims6) return;
    var b = ms.dims6.find(function(d) { return d.key === 'barrier'; });
    if (!b || b.score < 5) return;

    var moat = computeMoatTiming(ms.dims6).moatScore;
    if (moat >= lowestMoat) {
      issues.push({
        severity: 'WARN',
        code: s.code, name: s.name,
        msg: '🔍 barrier=5(极高) + moat=' + moat + ' ≥ 最低 choke moat(' + lowestMoat +
          ') 但不在 chokePoints 中 —— 候选新增，需人工核实是否纳入'
      });
    }
  });
  return issues;
}

// ===== MAIN =====
var targetChain = process.argv[2] || '--all';
var chains = targetChain === '--all' ? ['pcb', 'semicon-equip'] : [targetChain];

var allResults = {};

chains.forEach(function(chainId) {
  var chain = loadChain(chainId);
  if (!chain) return;

  var issues = [];
  issues = issues.concat(checkR1(chain).map(function(i) { i.rule = 'R1'; return i; }));
  issues = issues.concat(checkR2(chain).map(function(i) { i.rule = 'R2'; return i; }));
  issues = issues.concat(checkR3(chain).map(function(i) { i.rule = 'R3'; return i; }));
  issues = issues.concat(checkR4(chain).map(function(i) { i.rule = 'R4'; return i; }));
  issues = issues.concat(checkR5(chain).map(function(i) { i.rule = 'R5'; return i; }));
  issues = issues.concat(checkR6(chain).map(function(i) { i.rule = 'R6'; return i; }));

  var blocks = issues.filter(function(i) { return i.severity === 'BLOCK'; });
  var warns = issues.filter(function(i) { return i.severity === 'WARN'; });
  var auths = issues.filter(function(i) { return i.severity === 'AUTHORIZED'; });

  console.log('=== ' + chainId + ' ===');
  console.log('  BLOCK: ' + blocks.length + ' | WARN: ' + warns.length + ' | AUTHORIZED: ' + auths.length + ' | Total: ' + issues.length);

  if (blocks.length > 0) {
    console.log('  [BLOCK]');
    blocks.forEach(function(i) { console.log('    ' + i.code + ' ' + i.name + ': ' + i.msg); });
  }
  if (warns.length > 0) {
    console.log('  [WARN]');
    warns.forEach(function(i) { console.log('    ' + i.code + ' ' + i.name + ': ' + i.msg); });
  }
  if (auths.length > 0) {
    console.log('  [AUTHORIZED]');
    auths.forEach(function(i) { console.log('    ' + i.code + ' ' + i.name + ': ' + i.msg); });
  }
  console.log('');

  allResults[chainId] = { blocks: blocks.length, warns: warns.length, auths: auths.length, issues: issues };
});

// Summary
console.log('=== SUMMARY ===');
var totalBlock = 0, totalWarn = 0, totalAuth = 0;
Object.keys(allResults).forEach(function(k) {
  var r = allResults[k];
  totalBlock += r.blocks; totalWarn += r.warns; totalAuth += r.auths;
  console.log(k + ': ' + r.blocks + ' BLOCK / ' + r.warns + ' WARN / ' + r.auths + ' AUTHORIZED');
});
console.log('TOTAL: ' + totalBlock + ' BLOCK / ' + totalWarn + ' WARN / ' + totalAuth + ' AUTHORIZED');

// Exit code
process.exit(totalBlock > 0 ? 1 : 0);
