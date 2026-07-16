// check_business_identity_match.js — 自动检测"业务错位污染"
// 用法: node scripts/check_business_identity_match.js [chainId]
// 支持: storage-interface / pcb / semicon-equip / 任意chainId

const fs = require('fs');
const path = require('path');
const chainId = process.argv[2] || 'storage-interface';
const autoFile = path.join(__dirname, '..', 'data', chainId + '.js');
if (!fs.existsSync(autoFile)) { console.error('File not found:', autoFile); process.exit(1); }

global.window = global.window || {};
eval(fs.readFileSync(autoFile, 'utf8'));
const chain = global.window.CHAINS[chainId];
if (!chain) { console.error('Chain not loaded:', chainId); process.exit(1); }

// 通用词黑名单
const STOP_WORDS = new Set([
  '有限公司','股份','科技','电子','半导体','材料','设备','芯片','技术','产业','集团','控股',
  '全球','国内','国产','国际','行业','市场','领先','龙头','第一','第二','第三','唯一',
  '公司','产品','业务','客户','供应商','厂商','企业','平台',
  '工艺','制造','生产','研发','设计','销售','应用','领域','场景',
  '壁垒','卡口','份额','市占','占比','营收','利润','增速','增长',
  '基于','财务','数据','报告','实测','来源','分析','估值','分位','映射',
  '本链','语境','定位','符合','分档','要求','国产替代','政策','中性',
  '供给','需求','下游','上游','核心','关键','环节','方面',
]);

// 模板文本指纹（用于排除手动层通用模板）
const TEMPLATE_FINGERPRINTS = [
  '基于 L1 akshare abstract_ths 财务时序与 L4 行业格局报告',
  '全部数据取自 L1 stock_financial_abstract_ths',
  '供需分析基于 L1 akshare 经营时序 + L4 头部券商报告',
  '半导体存储与 HBM 产业链国产替代政策中性偏正面',
  '按 §10.2 静态 PE 分位映射仅用于 timingScore 计算',
  '★ 财务数据复用自 semicon-equip 链已验证的 L1 数据',
];

function isTemplateText(text) {
  return TEMPLATE_FINGERPRINTS.some(fp => text.includes(fp));
}

function extractKeywords(stock, segName) {
  const kw = new Set();
  const pos = (stock.position || '').replace(/[·•·]/g, '·');
  const logic = (stock.logic || '').substring(0, 300);

  // A. 股票名称
  if (stock.name) kw.add(stock.name);
  if (stock.code) kw.add(stock.code);

  // B. 英文缩写/专有名词（从 position+logic 提取）
  const combined = pos + ' ' + logic;
  const engTerms = combined.match(/[A-Z][A-Za-z0-9/+\-]{2,}(?:\s*[·/\-]\s*[A-Z][A-Za-z0-9/+\-]{2,})?/g) || [];
  engTerms.forEach(t => { if (t.length >= 2 && t.length <= 20) kw.add(t.trim()); });
  // Also common Chinese-English mixed terms
  const mixedTerms = combined.match(/[一-鿿]{2,4}[A-Z][A-Za-z]{2,}/g) || [];
  mixedTerms.forEach(t => kw.add(t));

  // C. 从 position 提取中文关键词（2-4 字）
  const cWords = pos.match(/[一-鿿]{2,4}/g) || [];
  cWords.forEach(w => { if (!STOP_WORDS.has(w) && w.length >= 2) kw.add(w); });

  // D. 从 segment name 提取
  (segName || '').match(/[一-鿿]{2,4}/g)?.forEach(w => { if (!STOP_WORDS.has(w)) kw.add(w); });

  // E. 从 logic 前200字提取高频词
  const lWords = logic.match(/[一-鿿A-Za-z]{2,6}/g) || [];
  const freq = {};
  lWords.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  Object.entries(freq)
    .filter(([, c]) => c >= 2)
    .filter(([w]) => !STOP_WORDS.has(w))
    .forEach(([w]) => { if (w.length >= 2) kw.add(w); });

  return [...kw].filter(w => w.length >= 2);
}

// 收集所有 stock
const allStocks = [];
(chain.segments || []).forEach(seg => {
  (seg.stocks || []).forEach(s => {
    allStocks.push({ code: s.code, name: s.name, seg: seg.name, keywords: extractKeywords(s, seg.name), logic: s.logic || '' });
  });
});
// 对 midstream stocks 也建立索引
if (chain.midstream?.stocks) {
  chain.midstream.stocks.forEach(s => {
    if (!allStocks.find(x => x.code === s.code)) {
      allStocks.push({ code: s.code, name: s.name, seg: '中游环节', keywords: extractKeywords(s, '中游环节'), logic: s.logic || s.note || '' });
    }
  });
}

// 收集检查位置
const checks = [];
(chain.segments || []).forEach(seg => {
  (seg.stocks || []).forEach(s => {
    if (s.logic && s.logic.length > 30) checks.push({ code: s.code, name: s.name, field: 'segments.logic', seg: seg.name, text: s.logic });
  });
});
if (chain.midstream?.stocks) {
  chain.midstream.stocks.forEach(s => {
    if (s.logic && s.logic.length > 30) checks.push({ code: s.code, name: s.name, field: 'midstream.logic', seg: '中游环节', text: s.logic });
    if (s.note && !s.logic && s.note.length > 30) checks.push({ code: s.code, name: s.name, field: 'midstream.note', seg: '中游环节', text: s.note });
  });
}
(chain.chokePoints || []).forEach(p => {
  if (p.logic && p.logic.length > 30) checks.push({ code: p.code, name: p.name, field: 'chokePoints.logic', seg: p.segment || '', text: p.logic });
  if (p.plainLanguageNote && p.plainLanguageNote.length > 30) checks.push({ code: p.code, name: p.name, field: 'chokePoints.pln', seg: p.segment || '', text: p.plainLanguageNote });
});

// 执行检查
const issues = [];

// 1. 重复文本检测（仅检查非模板文本）
const textMap = new Map();
checks.filter(c => !isTemplateText(c.text)).forEach(c => {
  const hash = c.text.substring(0, 100).trim();
  if (!textMap.has(hash)) textMap.set(hash, []);
  textMap.get(hash).push(c);
});
textMap.forEach((entries, hash) => {
  const codes = new Set(entries.map(e => e.code));
  if (codes.size >= 2 && hash.length > 40) {
    issues.push({
      type: 'DUPLICATE',
      severity: 'HIGH',
      detail: `完全相同的文本出现在 ${codes.size} 只股票: ${[...codes].join(', ')}`,
      preview: hash.substring(0, 80),
      affected: entries.map(e => e.code + ':' + e.field).join(' | ')
    });
  }
});

// 2. 身份关键词匹配（仅检查 segments/midstream/chokePoints，跳过模板文本）
checks.filter(c => !isTemplateText(c.text) && !c.field.includes('manual')).forEach(c => {
  const stock = allStocks.find(s => s.code === c.code);
  if (!stock || stock.keywords.length === 0) return;
  const text = c.text;
  const selfHits = stock.keywords.filter(kw => text.includes(kw));
  const selfScore = selfHits.length;

  const otherHits = [];
  allStocks.forEach(other => {
    if (other.code === c.code) return;
    const uniqueKws = other.keywords.filter(kw =>
      kw.length >= 3 && !STOP_WORDS.has(kw) && text.includes(kw)
    );
    if (uniqueKws.length >= 2) {
      otherHits.push({ code: other.code, name: other.name, kws: uniqueKws.slice(0, 3) });
    }
  });

  if (selfScore === 0 && c.text.length > 30) {
    issues.push({
      type: 'IDENTITY_LOST',
      severity: 'HIGH',
      detail: `${c.code} ${c.name} 在 ${c.field} 中未找到自身关键词(候选:${stock.keywords.slice(0,6).join(',')})`,
      preview: text.substring(0, 100),
      affected: c.code + ':' + c.field
    });
  } else if (otherHits.length >= 2 && selfScore <= 1) {
    issues.push({
      type: 'SUSPECT_MISMATCH',
      severity: 'MEDIUM',
      detail: `${c.code} ${c.name} 在 ${c.field}: 自身命中${selfScore}, 但出现其他公司关键词: ${otherHits.map(o => o.name).join(', ')}`,
      preview: text.substring(0, 80),
      affected: c.code + ':' + c.field
    });
  }
});

// 3. 跨链污染关键词
const crossChainTerms = ['石英坩埚', '铜箔价格', '玻纤布', 'ABF载板', 'PCB钻针', 'CCL覆铜板', 'M9碳氢树脂'];
crossChainTerms.forEach(term => {
  checks.forEach(c => {
    if (c.text.includes(term)) {
      issues.push({
        type: 'CROSS_CHAIN_POLLUTION',
        severity: 'HIGH',
        detail: `${c.code} ${c.name}/${c.field} 发现跨链污染词: "${term}"`,
        preview: c.text.substring(Math.max(0, c.text.indexOf(term) - 30), c.text.indexOf(term) + 40),
        affected: c.code + ':' + c.field
      });
    }
  });
});

// 输出
console.log(`\n=== ${chainId} 业务身份一致性检查 ===`);
console.log(`扫描: ${checks.length} 个位置, ${allStocks.length} 只stock, ${allStocks.reduce((s,st)=>s+st.keywords.length,0)} 个关键词\n`);

if (issues.length === 0) {
  console.log('✅ 未发现业务错位污染');
  process.exit(0);
}

const counts = {};
issues.forEach(i => { counts[i.type] = (counts[i.type] || 0) + 1; });
console.log(`${issues.length} 个可疑项: ${Object.entries(counts).map(([t,c])=>t+':'+c).join(', ')}\n`);

issues.forEach((issue, i) => {
  console.log(`[${i+1}] ${issue.type} | ${issue.severity}`);
  console.log(`  ${issue.detail}`);
  console.log(`  预览: ${issue.preview}`);
  console.log('');
});

process.exit(issues.some(i => i.severity === 'HIGH') ? 1 : 0);
