// __inject_se_fundamentals.js
// 读取 se_fundamentals_batch.json → 注入 semicon-equip.manual.js stocks[code].fundamentals
// 用法: node scripts/__inject_se_fundamentals.js

const fs = require('fs');
const path = require('path');

// ★ P0-5 立 · 写入前校验：禁止开发术语污染用户可见字段
//   2026-07-11 PCB 数据污染事故(28处)的根因防御——所有批量写入脚本必须调用此函数
//   C1 事故: commit 编号/Phase 标记/开发操作说明被误写入 logic/position/trendNote 等字段
const FORBIDDEN_DEV_TERMS = [
  '★ commit', 'commit 6.', 'Phase 2-', 'Phase 9 PCB',
  'idx 7 PCB', '同步到 pcb.js', '渲染层',
  'DATA_VERSION', 'bump', 'Co-Authored-By',
];
function validateNoDevTerms(text, fieldName, stockCode) {
  if (typeof text !== 'string' || !text) return;
  for (const term of FORBIDDEN_DEV_TERMS) {
    if (text.includes(term)) {
      const msg = `[CONTAMINATION BLOCKED] ${stockCode}.${fieldName} contains dev term "${term}". Refusing to write.`;
      console.error(msg);
      throw new Error(msg);
    }
  }
}

const FUND_JSON = path.join(__dirname, '..', 'se_fundamentals_batch.json');
const MANUAL_JS = path.join(__dirname, '..', 'data', 'semicon-equip.manual.js');

// ── 1. 读取 fundamentals JSON ──
const fundData = JSON.parse(fs.readFileSync(FUND_JSON, 'utf8'));
const funds = fundData.fundamentals;
console.log(`读取 ${funds.length} 条 fundamentals 记录`);

// ── 2. 读取 manual.js，通过 eval 获取内存对象 ──
global.window = {};
eval(fs.readFileSync(MANUAL_JS, 'utf8'));
const manual = global.window.SEMICON_EQUIP_MANUAL;
if (!manual) { console.error('SEMICON_EQUIP_MANUAL not found!'); process.exit(1); }

// ── 3. 注入 fundamentals ──
let injected = 0;
let skipped = 0;
let notFound = 0;

funds.forEach(f => {
  const code = f.code;
  const stock = manual.stocks[code];
  if (!stock) {
    console.log(`  ⚠ ${code} not found in manual.js stocks`);
    notFound++;
    return;
  }
  // 提取 fundamentals 字段（去掉 _ 前缀的辅助字段）
  const fundObj = {
    asOf: f.asOf,
    roe: f.roe,
    grossMargin: f.grossMargin,
    revenueGrowth: f.revenueGrowth,
    netProfitGrowth: f.netProfitGrowth,
    scissorGap: f.scissorGap,
    source: f.source,
  };
  stock.fundamentals = fundObj;
  injected++;
  console.log(`  ${code}: ROE=${f.roe}% GM=${f.grossMargin}% scissor=${f.scissorGap}`);
});

console.log(`\n注入: ${injected} | 跳过: ${skipped} | 未找到: ${notFound}`);

// ── 4. 写回 ──
// manual.js 是 IIFE 结构: (function(SEMICON_EQUIP_MANUAL){ ... })(window.SEMICON_EQUIP_MANUAL);
// 我们找到 CHAINS 对象赋值部分并重建
const original = fs.readFileSync(MANUAL_JS, 'utf8');

// 提取 IIFE 包裹部分: window.SEMICON_EQUIP_MANUAL = window.SEMICON_EQUIP_MANUAL || {};
// 然后是 (function(MANUAL){ ... MANUAL.stocks = {...}; ... })(window.SEMICON_EQUIP_MANUAL);

// 重建整个 manual.js 内容
// 保留命名空间声明: window.SEMICON_EQUIP_MANUAL = window.SEMICON_EQUIP_MANUAL || {};
const nsDecl = 'window.SEMICON_EQUIP_MANUAL = window.SEMICON_EQUIP_MANUAL || {};';

// 序列化 manual 对象
const manualJson = JSON.stringify(manual, null, 2);

const newContent = [
  '// data/semicon-equip.manual.js -- 半导体设备产业链 · 手动层 (dim6 + fundamentals + moat/timing)',
  '//',
  '// 触发: Phase A 骨架 commit 同期 (P0-1 双层拆分, commit 6.62)',
  '// 命名空间: window.SEMICON_EQUIP_MANUAL (连字符 chainId 经 getManualNamespace 解析)',
  `// 更新: ${new Date().toISOString().split('T')[0]} · fundamentals 批量注入 (scripts/refresh_se_fundamentals.py + __inject_se_fundamentals.js)`,
  '//',
  nsDecl,
  `(function(MANUAL){`,
  `  Object.assign(MANUAL, ${manualJson});`,
  `})(window.SEMICON_EQUIP_MANUAL);`,
  ''
].join('\n');

fs.writeFileSync(MANUAL_JS, newContent, 'utf8');
console.log(`\n写入 ${MANUAL_JS} (${newContent.length} chars)`);

// ── 5. 验证 ──
// 重新加载验证
delete global.window.SEMICON_EQUIP_MANUAL;
eval(newContent);
const m2 = global.window.SEMICON_EQUIP_MANUAL;
if (!m2 || !m2.stocks) {
  console.error('VERIFY FAILED: manual not reloadable');
  process.exit(1);
}

let verifyOk = 0;
Object.keys(m2.stocks).forEach(code => {
  const s = m2.stocks[code];
  if (s.fundamentals && s.fundamentals.asOf) verifyOk++;
});
console.log(`验证: ${verifyOk}/${Object.keys(m2.stocks).length} stocks have fundamentals`);

// 保留 dims6 字段
const dimsCount = Object.values(m2.stocks).reduce((sum, s) => {
  return sum + (Array.isArray(s.dims6) ? s.dims6.length : 0);
}, 0);
console.log(`验证: ${dimsCount} total dims6 entries preserved`);

if (verifyOk === Object.keys(m2.stocks).length) {
  console.log('\n[DONE] fundamentals 注入完成');
} else {
  console.error('\n[FAIL] 验证不通过');
  process.exit(1);
}
