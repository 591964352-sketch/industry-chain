// generate_audit_doc.js
// 程序化生成 PCB + semicon-equip 对照文档（飞书格式 Markdown）
// 用法: node scripts/generate_audit_doc.js [pcb|semi|all]
// 强制要求: 对照文档必须从磁盘读取，禁止人工填写（§13 防御规则）

var fs = require('fs');

var QCN = { core:'核心', hold:'持有观察', watch:'观察', skip:'跳过' };
var TREND = { up:'↑', down:'↓', flat:'→' };
var BARRIER_LABEL = { 5:'极高', 4:'高', 3:'中', 2:'低', 1:'低' };

function loadChain(chainId) {
  global.window = {};
  var manualPath = 'data/' + chainId + '.manual.js';
  var autoPath = 'data/' + chainId + '.js';
  if (!fs.existsSync(manualPath) || !fs.existsSync(autoPath)) return null;
  eval(fs.readFileSync(manualPath, 'utf8'));
  var manualKey = chainId.toUpperCase().replace(/-/g, '_') + '_MANUAL';
  var manual = global.window[manualKey];
  global.window = {};
  eval(fs.readFileSync(autoPath, 'utf8'));
  var auto = global.window.CHAINS[chainId];
  if (!auto || !manual || !manual.stocks) return null;
  return { auto: auto, manual: manual };
}

function getDim(dims6, key) {
  if (!dims6) return null;
  return (dims6 || []).find(function(d) { return d.key === key; }) || null;
}

function dimCell(d) {
  if (!d) return '—';
  return d.score + (TREND[d.trend] || '');
}

function stockRowInline(stock, manualStock) {
  var dims6 = (manualStock && manualStock.dims6) || [];
  var d = {};
  ['durability','visibility','policy','supply','valuation','barrier'].forEach(function(k) {
    d[k] = getDim(dims6, k);
  });
  return stock.code + ' | ' + stock.name + ' | ' + stock.barrier + ' | ' +
    dimCell(d.durability) + ' | ' + dimCell(d.visibility) + ' | ' +
    dimCell(d.policy) + ' | ' + dimCell(d.supply) + ' | ' +
    dimCell(d.valuation) + ' | ' + dimCell(d.barrier) + ' | ' +
    (manualStock ? (manualStock.moatScore !== undefined ? manualStock.moatScore : '-') : '-') + ' | ' +
    (manualStock && manualStock.timingScore !== undefined ? manualStock.timingScore : '-') + ' | ' +
    (manualStock && manualStock.quadrant ? QCN[manualStock.quadrant] : '-') + ' | ' +
    (stock.position ? stock.position.substring(0,60) : '');
}

function fourQRow(s) {
  return '| ' + s.code + ' | ' + s.name + ' | ' +
    (s.q1 ? '✓' : '✗') + ' | ' + (s.q2 ? '✓' : '✗') + ' | ' +
    (s.q3 ? '✓' : '✗') + ' | ' + (s.q4 ? '✓' : '✗') + ' | ' +
    s.hits + ' | ' + (s.strength || '-') + ' |';
}

function fourQVariantRow(s) {
  return '| ' + s.code + ' | ' + s.name + ' | ' +
    (s.q1p ? '✓' : '✗') + ' | ' + (s.q2p ? '✓' : '✗') + ' | ' +
    (s.q3p ? '✓' : '✗') + ' | ' + (s.q4p ? '✓' : '✗') + ' | ' +
    s.hits + ' | ' + (s.strength || '-') + ' |';
}

function generateChain(chainId) {
  var chain = loadChain(chainId);
  if (!chain) return '# ' + chainId + ' 链数据加载失败\n';
  var md = '';
  md += '# ' + (chainId === 'pcb' ? 'PCB 印制电路板' : '半导体设备') + ' 产业链全景对照文档\n\n';
  md += '> 生成日期：' + new Date().toISOString().slice(0,10) + ' · 基于磁盘 ' + chainId + '.js + ' + chainId + '.manual.js · 程序化生成（scripts/generate_audit_doc.js）\n\n';

  // 概览
  var segCount = chain.auto.segments.length;
  var chokeCount = (chain.auto.chokePoints || []).length;
  var stockCount = Object.keys(chain.manual.stocks).length;
  md += '## 一、赛道概览\n\n';
  md += '- 赛道 ID：`' + chainId + '`\n';
  md += '- 分支（segment）数量：' + segCount + ' 个\n';
  md += '- 核心标的（chokePoints）：' + chokeCount + ' 只\n';
  if (chainId === 'semicon-equip') {
    md += '- fourQuestions 段数：' + chain.auto.fourQuestions.segments.length + ' 段\n';
    md += '- chainStory 步数：' + (chain.auto.plainIntro.chainStory ? chain.auto.plainIntro.chainStory.length : 0) + ' step\n';
  }
  md += '- 手动层 stock 总数：' + stockCount + ' 只\n\n';

  // segments
  md += '## 二、各分支个股明细\n\n';
  chain.auto.segments.forEach(function(seg, si) {
    md += '### ' + (si+1) + '. ' + seg.name + '\n\n';
    md += '| # | 代码 | 名称 | 壁垒 | 持续 | 可见 | 政策 | 供需 | 估值 | 壁垒分 | moat | timing | quadrant | 一句话定位 |\n';
    md += '|---|------|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|------|\n';
    (seg.stocks || []).forEach(function(s, i) {
      md += '| ' + (i+1) + ' | ' + stockRowInline(s, chain.manual.stocks[s.code]) + '\n';
    });
    md += '\n';
  });

  // fourQuestions
  md += '## 三、四问筛选命中情况\n\n';
  if (chainId === 'semicon-equip') {
    md += '> 半导体设备行业 Q2/Q3/Q4 系统性数据不足（§11.23），仅 Q1 全球寡头格局可验证。\n\n';
  }
  (chain.auto.fourQuestions.segments || []).forEach(function(seg) {
    var isVariant = seg.variant === 'techBarrier';
    md += '### ' + seg.name + (isVariant ? ' [variant: techBarrier]' : '') + '\n\n';
    if (isVariant) {
      md += '> 标准型 q1「全球≤3家」在此段位永远不成立，改用技术壁垒+客户认证+规模市占+不可替代性四维评估（§11.23）\n\n';
      md += '| 代码 | 名称 | Q1p(认证≥18月) | Q2p(技术领先) | Q3p(规模≥20%) | Q4p(不可替代) | hits | 星级 |\n';
      md += '|------|------|:--:|:--:|:--:|:--:|:--:|:--:|\n';
      (seg.stocks || []).forEach(function(s) {
        md += fourQVariantRow(s) + '\n';
      });
    } else {
      md += '| 代码 | 名称 | Q1(≤3家) | Q2(≥12月扩产) | Q3(≥2年替代) | Q4(≥6月认证) | hits | 星级 |\n';
      md += '|------|------|:--:|:--:|:--:|:--:|:--:|:--:|\n';
      (seg.stocks || []).forEach(function(s) {
        md += fourQRow(s) + '\n';
      });
    }
    md += '\n';
  });

  // midstream
  if (chain.auto.midstream && chain.auto.midstream.stocks) {
    md += '## 四、中游环节\n\n';
    md += '| 代码 | 名称 | 壁垒 | moat |\n';
    md += '|------|------|:--:|:--:|\n';
    chain.auto.midstream.stocks.forEach(function(s) {
      var ms = chain.manual.stocks[s.code];
      md += '| ' + s.code + ' | ' + s.name + ' | ' + s.barrier + ' | ' + (ms && ms.moatScore !== undefined ? ms.moatScore : '-') + ' |\n';
    });
    md += '\n';
  }

  // chokePoints
  md += '## 五、核心卡口标的（chokePoints · ' + chokeCount + ' 只·moat 降序）\n\n';
  md += '| # | 代码 | 名称 | 分支 | moat | timing | barrier | 星级 | 一句话卡口逻辑 |\n';
  md += '|---|------|------|------|:--:|:--:|:--:|:--:|------|\n';
  var chokes = (chain.auto.chokePoints || []).slice().sort(function(a, b) {
    var ma = (chain.manual.stocks[a.code] || {}).moatScore || 0;
    var mb = (chain.manual.stocks[b.code] || {}).moatScore || 0;
    return mb - ma;
  });
  chokes.forEach(function(cp, i) {
    var ms = chain.manual.stocks[cp.code] || {};
    var oneLiner = (cp.logic || '').split('。')[0].substring(0, 100);
    md += '| ' + (i+1) + ' | ' + cp.code + ' | ' + cp.name + ' | ' + (cp.segment || '') + ' | ' +
      (ms.moatScore || '-') + ' | ' + (ms.timingScore || '-') + ' | ' +
      ((getDim(ms.dims6, 'barrier') || {}).score || '-') + ' | ' + cp.strength + ' | ' + oneLiner + ' |\n';
  });
  md += '\n';

  return md;
}

var target = process.argv[2] || 'all';
var chains = target === 'all' ? ['pcb', 'semicon-equip'] : [target];
chains.forEach(function(c) {
  var content = generateChain(c);
  var outFile = '.claude/scratch/' + c + '_audit_doc.md';
  fs.writeFileSync(outFile, content, 'utf8');
  console.log('Generated: ' + outFile + ' (' + content.split('\n').length + ' lines, ' + content.length + ' bytes)');
});