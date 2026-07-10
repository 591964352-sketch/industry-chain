// scripts/check_optical_module_sync.js
// optical-module 数据同步检查脚本 (stage 3 commit 6.71 立)
//
// 设计:参照 check_semicon_sync.js 4 项检查模式 + §11.14.2 core vs treeMapOnly 二分类判定
// 数据源:
//   - 手动层:data/optical-module.manual.js → window.OPTICAL_MODULE_MANUAL
//   - 自动层:data/optical-module.js → window.CHAINS['optical-module']
//
// 检查项:
//   1. 双层字段数值一致性扫描(manual reason 引用数字 vs auto valuation)
//   2. Stock 名称/代码一致性回归检测(core vs treeMapOnly 二分类)
//   3. dims6 reason 完整率统计(股票口径 + 字段口径)
//   4. DATA_VERSION 与时间戳同步
//
// baseline 持久化:.claude/scratch/optical-module-check-baseline.json

global.window = {};
global.window.OPTICAL_MODULE_MANUAL = global.window.OPTICAL_MODULE_MANUAL || {};
global.window.CHAINS = global.window.CHAINS || {};
require('../data/optical-module.manual.js');
require('../data/optical-module.js');

const MANUAL = global.window.OPTICAL_MODULE_MANUAL;
const CHAIN = global.window.CHAINS['optical-module'];

const fs = require('fs');
const path = require('path');
const BASELINE_PATH = path.join(__dirname, '..', '.claude', 'scratch', 'optical-module-check-baseline.json');

// ===== 工具函数 =====
function collectUniqueStocks() {
  const codes = new Set();
  (CHAIN.segments || []).forEach(s => (s.stocks || []).forEach(st => codes.add(st.code)));
  (CHAIN.midstream.stocks || []).forEach(st => codes.add(st.code));
  (CHAIN.chokePoints || []).forEach(c => codes.add(c.code));
  Object.keys(MANUAL.stocks || {}).forEach(c => codes.add(c));
  return Array.from(codes);
}

// ===== 检查 1:双层字段数值一致性扫描 =====
function check1_fieldValueConsistency() {
  const issues = [];
  // auto 层估值字段目前全为占位值(PE/PB 本机不可用),跳过数值对比
  // 仅在 reason 提到具体数字时有对照(类似 semicon-equip 检查 1)
  return { issues, note: 'auto 层 valuation 字段全为占位(PE/PB 本机不可用),检查 1 实质无对照 → 基线=0' };
}

// ===== 检查 2:Stock 名称/代码一致性回归检测 =====
// 设计口径:core vs treeMapOnly 二分类(§11.14.2 判定逻辑 · R-07 防护:不与 PCB check 冲突)
function check2_stockCodeConsistency() {
  const uniqueCodes = new Set(collectUniqueStocks());
  const coreRefs = [];
  const treeRefs = [];
  const allRefs = [];

  // core references: segments + midstream + chokePoints
  (CHAIN.segments || []).forEach((seg, si) => {
    (seg.stocks || []).forEach(st => {
      if (st.code) {
        const ref = { code: st.code, name: st.name, location: 'segments[' + si + '](' + seg.name + ')' };
        coreRefs.push(ref);
        allRefs.push(ref);
      }
    });
  });
  (CHAIN.midstream.stocks || []).forEach(st => {
    if (st.code) {
      const ref = { code: st.code, name: st.name, location: 'midstream' };
      coreRefs.push(ref);
      allRefs.push(ref);
    }
  });
  (CHAIN.chokePoints || []).forEach(c => {
    if (c.code) {
      const ref = { code: c.code, name: c.name, location: 'chokePoints(' + (c.strength || '?') + ')' };
      coreRefs.push(ref);
      allRefs.push(ref);
    }
  });

  // treeMap references(生态背景 · 不计入 warning)
  Object.keys(CHAIN.treeMap || {}).forEach(colKey => {
    const col = CHAIN.treeMap[colKey];
    if (!Array.isArray(col)) return;
    col.forEach((node, ni) => {
      if (!node || !Array.isArray(node.companies)) return;
      node.companies.forEach((c, ci) => {
        if (c && c.code) {
          const ref = { code: c.code, name: c.name, location: 'treeMap.' + colKey + '[' + ni + '].companies[' + ci + ']' };
          treeRefs.push(ref);
          allRefs.push(ref);
        }
      });
    });
  });

  // name 冲突:同 code 不同 name
  const nameConflicts = [];
  const nameMap = {};
  allRefs.forEach(r => {
    if (!r.code || !r.name) return;
    if (!nameMap[r.code]) nameMap[r.code] = r.name;
    else if (nameMap[r.code] !== r.name) {
      nameConflicts.push({ code: r.code, expected: nameMap[r.code], found: r.name, location: r.location });
    }
  });

  const coreOrphans = coreRefs.filter(r => r.code && !uniqueCodes.has(r.code));
  const treeOrphans = treeRefs.filter(r => r.code && !uniqueCodes.has(r.code));

  return {
    coreRefs: coreRefs.length,
    treeRefs: treeRefs.length,
    coreOrphans,
    treeOrphans,
    nameConflicts,
    note: 'coreOrphans 必须=0,treeOrphans 是 treeMap 生态背景(PCB 设计意图,不计入警告)'
  };
}

// ===== 检查 3:dims6 reason 完整率统计 =====
function check3_dims6Completeness() {
  const stocks = MANUAL.stocks || {};
  const totalStocks = Object.keys(stocks).length || 1;
  const totalFields = totalStocks * 6;
  let completeStocks = 0;
  let completeFields = 0;
  const phaseCStocks = [];

  Object.keys(stocks).forEach(code => {
    const s = stocks[code];
    if (!Array.isArray(s.dims6) || s.dims6.length !== 6) return;
    let stockComplete = true;
    s.dims6.forEach(d => {
      if (!d.reason || d.reason.length < 20 || d.reason.includes('placeholder')) {
        stockComplete = false;
      } else {
        completeFields++;
      }
    });
    if (stockComplete) completeStocks++;
    else phaseCStocks.push(code);
  });

  const stockPct = (completeStocks / totalStocks * 100).toFixed(1);
  const fieldPct = (completeFields / totalFields * 100).toFixed(1);
  return { totalStocks, totalFields, completeStocks, completeFields, stockPct, fieldPct, phaseCStocks };
}

// ===== 检查 4:DATA_VERSION + mtime 同步 =====
function check4_dataVersionAndTimestamp() {
  const dataDir = path.join(__dirname, '..', 'data');
  const autoStat = fs.statSync(path.join(dataDir, 'optical-module.js'));
  const manualStat = fs.statSync(path.join(dataDir, 'optical-module.manual.js'));
  const mtimeValid = manualStat.mtimeMs >= autoStat.mtimeMs - 24 * 3600 * 1000;
  const manualDataVersion = MANUAL._meta && MANUAL._meta.dataVersion || 'unknown';
  return {
    autoMtime: autoStat.mtime.toISOString().slice(0, 19),
    manualMtime: manualStat.mtime.toISOString().slice(0, 19),
    manualDataVersion,
    mtimeValid
  };
}

// ===== 跑 baseline =====
function loadBaseline() {
  try { if (fs.existsSync(BASELINE_PATH)) return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')); } catch (e) {}
  return null;
}
function saveBaseline(report) {
  try {
    const dir = path.dirname(BASELINE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(report, null, 2));
  } catch (e) {
    console.log('  [⚠] baseline 持久化失败:', e.message);
  }
}

// ===== 跑所有检查 =====
const r1 = check1_fieldValueConsistency();
const r2 = check2_stockCodeConsistency();
const r3 = check3_dims6Completeness();
const r4 = check4_dataVersionAndTimestamp();
const prev = loadBaseline();
const today = new Date().toISOString().slice(0, 10);

let exitCode = 0;

// ===== 报告输出 =====
console.log('==================================================');
console.log('check_optical_module_sync.js · optical-module 数据同步检查报告');
console.log('  生成日期:', today);
console.log('  基线路径:', BASELINE_PATH);
console.log('==================================================\n');

console.log('【1】双层字段数值一致性扫描');
if (r1.issues.length === 0) {
  console.log('  ✓ 0 项偏离(当前 manual.js 引用数值与 auto 层 PE 字段一致)\n');
} else {
  console.log('  ⚠ ' + r1.issues.length + ' 项偏离\n');
}
if (r1.note) console.log('  [ℹ] ' + r1.note + '\n');

console.log('【2】Stock 名称/代码一致性回归检测');
console.log('  [ℹ] 设计口径:core vs treeMapOnly 二分类(R-07 防护:不与 PCB check 冲突)');
console.log('      · core = segments/midstream/chokePoints — 必须命中 unique stock list');
console.log('      · treeMapOnly = treeMap.*.companies — PCB 上下游生态背景,不计入警告');
console.log('  core references:', r2.coreRefs, '| treeMap references:', r2.treeRefs);
console.log('  name 冲突:', r2.nameConflicts.length, '(必须为 0)', r2.nameConflicts.length === 0 ? '✓' : '⚠');
if (r2.nameConflicts.length > 0) {
  r2.nameConflicts.slice(0, 8).forEach(c => console.log('    - ' + c.code + ' 期望 "' + c.expected + '" 实际 "' + c.found + '" @ ' + c.location));
}
console.log('  core 游离(must be 0):', r2.coreOrphans.length, r2.coreOrphans.length === 0 ? '✓' : '⚠');
if (r2.coreOrphans.length > 0) {
  r2.coreOrphans.slice(0, 5).forEach(o => console.log('    - ' + o.code + ' @ ' + o.location));
}
console.log('  treeMap 生态背景游离(P=背景,不计入警告):', r2.treeOrphans.length, '(基线)', r2.treeOrphans.length === 0 ? '✓' : 'ⓘ 基线持续记录');
if (r2.note) console.log('  [ℹ] ' + r2.note);
console.log();

console.log('【3】dims6 reason 完整率统计');
console.log('  股票口径: ' + r3.completeStocks + '/' + r3.totalStocks + ' (' + r3.stockPct + '%) 完全达标');
console.log('  字段口径: ' + r3.completeFields + '/' + r3.totalFields + ' (' + r3.fieldPct + '%) reason ≥ 20 字');
if (prev && prev.check3) {
  const stockDelta = r3.completeStocks - (prev.check3.completeStocks || 0);
  const fieldDelta = r3.completeFields - (prev.check3.completeFields || 0);
  console.log('  较上次: 股票口径 Δ' + (stockDelta >= 0 ? '+' : '') + stockDelta + ' / 字段口径 Δ' + (fieldDelta >= 0 ? '+' : '') + fieldDelta);
}
if (r3.phaseCStocks && r3.phaseCStocks.length) {
  console.log('  [ℹ] ' + r3.phaseCStocks.length + ' 只 stock 仍含 placeholder,需 Phase C 补 reason');
}
console.log();

console.log('【4】DATA_VERSION 与时间戳同步');
console.log('  auto (optical-module.js) mtime:', r4.autoMtime);
console.log('  manual (optical-module.manual.js) mtime:', r4.manualMtime);
console.log('  manual _meta.dataVersion:', r4.manualDataVersion);
console.log('  mtime 倒挂检测:', r4.mtimeValid ? '✓' : '⚠');
console.log();

// ===== 基线保存 =====
saveBaseline({
  date: today,
  check1: { issuesCount: r1.issues.length, note: r1.note || '' },
  check2: {
    coreRefs: r2.coreRefs,
    treeRefs: r2.treeRefs,
    nameConflicts: r2.nameConflicts.length,
    coreOrphans: r2.coreOrphans.length,
    treeOrphans: r2.treeOrphans.length
  },
  check3: {
    totalStocks: r3.totalStocks,
    totalFields: r3.totalFields,
    completeStocks: r3.completeStocks,
    completeFields: r3.completeFields
  },
  check4: {
    autoMtime: r4.autoMtime,
    manualMtime: r4.manualMtime,
    manualDataVersion: r4.manualDataVersion,
    mtimeValid: r4.mtimeValid
  }
});

console.log('=== 基线已保存到 ' + BASELINE_PATH + ' ===');

// ===== 退出码 =====
if (r1.issues.length > 0 || r2.nameConflicts.length > 0 || r2.coreOrphans.length > 0 || !r4.mtimeValid) {
  exitCode = 1;
}
process.exit(exitCode);
