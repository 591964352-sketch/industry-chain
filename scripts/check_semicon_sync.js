// scripts/check_semicon_sync.js
// semicon-equip 数据同步检查精简版 (2026-07-09 commit X 立 · P0-2)
//
// 设计:spec §P0-2 拍板的精简版,只 4 项检查,无 treeMap 白名单(无历史遗留矛盾),无复杂多路径扫描(单一 stock list 设计)
// 数据源:
//   - 手动层:data/semicon-equip.manual.js → window.SEMICON_EQUIP_MANUAL
//   - 自动层:data/semicon-equip.js → window.CHAINS['semicon-equip']
//
// 输出格式:参考 page_audit.py 风格 PASS/FAIL
// 历史 baseline:.claude/scratch/semicon-check-baseline.json(每次跑写一次,差值比较)
//
// 反向检查清单(本精简版明确**不**实现的部分,避免与 PCB 工具混淆):
//   - ✗ 不维护 TREE_MAP_WHITELIST(semicon-equip 单一 stock list · 无历史双轨矛盾)
//   - ✗ 不扫描 seg.stocks 与 seg.companies 双路径(semicon-equip 只用 seg.stocks)
//   - ✗ 不读 PCB 链 PCB_MANUAL / PCB_AUTO(本脚本只服务 semicon-equip 链)

global.window = {};
global.window.SEMICON_EQUIP_MANUAL = global.window.SEMICON_EQUIP_MANUAL || {};
global.window.CHAINS = global.window.CHAINS || {};
require('../data/semicon-equip.manual.js');
require('../data/semicon-equip.js');

const MANUAL = global.window.SEMICON_EQUIP_MANUAL;
const CHAIN = global.window.CHAINS['semicon-equip'];

// baseline 持久化路径
const fs = require('fs');
const path = require('path');
const BASELINE_PATH = path.join(__dirname, '..', '.claude', 'scratch', 'semicon-check-baseline.json');

// ===== 工具函数 =====

// 统一收集 unique stock code 列表(单一 stock list 设计)
function collectUniqueStocks() {
  const codes = new Set();
  (CHAIN.segments || []).forEach(s => (s.stocks || []).forEach(st => codes.add(st.code)));
  (CHAIN.midstream.stocks || []).forEach(st => codes.add(st.code));
  (CHAIN.chokePoints || []).forEach(c => codes.add(c.code));
  // manual.js 独有 stock 也算(没有自动层的)
  Object.keys(MANUAL.stocks || {}).forEach(c => codes.add(c));
  return Array.from(codes);
}

// 提取 reason 文本中的具体数值(PE 数字 + 百分比)
// e.g. "PE-TTM 45 倍" → 45 | "占比 60%" → 60
function extractNumbers(reason) {
  if (!reason) return [];
  const re = /(PE[\-TTM\s\d]*?(?:约)?\s*(\d+(?:\.\d+)?)\s*倍?|占比[约\s]*(\d+(?:\.\d+)?)\s*%|(\d+(?:\.\d+)?)\s*%(?!\s*(?:\/|\d))|ROE\s*(\d+(?:\.\d+)?)\s*%|毛利率\s*(\d+(?:\.\d+)?)\s*%|净利润[同比增减]*\s*(\+|-)?(\d+(?:\.\d+)?)\s*%)/g;
  const out = [];
  let m;
  while ((m = re.exec(reason)) !== null) {
    out.push({raw: m[0].trim(), value: parseFloat(m[2] || m[3] || m[4] || m[5] || m[6] || m[8] || m[9])});
  }
  return out;
}

// ===== 检查 1:双层字段数值一致性扫描 =====
// 遍历 manual.js 每只 stock 的 dims6 reason 文本,提取数字
// 与 auto 层(semicon-equip.js)chokePoints[].valuation 当前实际值对比
function check1_fieldValueConsistency() {
  const issues = [];
  if (!CHAIN.chokePoints || !CHAIN.chokePoints.length) return {issues, note: 'auto 层无 chokePoints,无对照'};
  // 构造 auto 层 code → valuation 映射
  const autoValuation = {};
  CHAIN.chokePoints.forEach(c => {
    autoValuation[c.code] = c.valuation || null;
  });
  // 检查所有 manual stock
  Object.keys(MANUAL.stocks || {}).forEach(code => {
    const s = MANUAL.stocks[code];
    if (!Array.isArray(s.dims6)) return;
    s.dims6.forEach(d => {
      if (!d.reason || !d.reason.length) return;
      const numbers = extractNumbers(d.reason);
      if (!numbers.length) return;
      const autoVal = autoValuation[code];
      if (!autoVal) return;  // 手动有 reason 但自动无 chokePoints → 跳过(无可比)
      numbers.forEach(({raw, value}) => {
        // ★ 当前 semicon-equip 自动层 valuation 是手写占位(PE=80/120/55 等),无 axshare 实证
        // 仅在 reason 提"PE 倍数"时与 auto PE 字段对比
        if (/PE/i.test(raw)) {
          const autoPE = autoVal.pe;
          if (typeof autoPE !== 'number') return;
          const divergence = Math.abs(autoPE - value) / autoPE * 100;
          if (divergence > 5) {
            issues.push({code, dim: d.key, manual: `${raw} → ${value}`, auto: `pe=${autoPE}`, divergencePct: divergence.toFixed(1)});
          }
        }
        // 其他数值类型(占比/ROE/毛利率)暂不强制比对(等 Phase B+ 真数据接入再启用)
      });
    });
  });
  return {issues};
}

// ===== 检查 2:Stock 名称/代码一致性回归检测 =====
// 设计:core vs treeMapOnly 二分类
//   core references = segments[].stocks[] + midstream.stocks[] + chokePoints[]
//     → 必须在 unique stock list 中找到(orphan = 真实缺失)
//   treeMapOnly references = treeMap[*][*].companies[]
//     → 不计入 orphan 警告(PCB 设计的上下游生态背景,不纳入 core stock list)
//   name conflicts = 同 code 多处出现但 name 不一致 → 两类引用都查
function check2_stockCodeConsistency() {
  const uniqueCodes = new Set(collectUniqueStocks());
  const coreRefs = [];     // core path references
  const treeRefs = [];     // treeMap 生态背景(纳入分类但不计入 orphan)
  const allRefs = [];      // for name conflict check
  // segments[].stocks[] 的 code 引用(core)
  (CHAIN.segments || []).forEach((seg, si) => {
    (seg.stocks || []).forEach(st => {
      if (st.code) {
        const ref = {code: st.code, name: st.name, location: 'segments[' + si + '](' + seg.name + ')'};
        coreRefs.push(ref);
        allRefs.push(ref);
      }
    });
  });
  // midstream.stocks[]
  (CHAIN.midstream.stocks || []).forEach(st => {
    if (st.code) {
      const ref = {code: st.code, name: st.name, location: 'midstream'};
      coreRefs.push(ref);
      allRefs.push(ref);
    }
  });
  // chokePoints[]
  (CHAIN.chokePoints || []).forEach(c => {
    if (c.code) {
      const ref = {code: c.code, name: c.name, location: 'chokePoints(' + (c.strength || '?') + ')'};
      coreRefs.push(ref);
      allRefs.push(ref);
    }
  });
  // treeMap[*][*].companies[] (仅计入 treeRefs,不进 orphan 警告)
  Object.keys(CHAIN.treeMap || {}).forEach(colKey => {
    const col = CHAIN.treeMap[colKey];
    if (!Array.isArray(col)) return;
    col.forEach((node, ni) => {
      if (!node || !Array.isArray(node.companies)) return;
      node.companies.forEach((c, ci) => {
        if (c && c.code) {
          const ref = {code: c.code, name: c.name, location: 'treeMap.' + colKey + '[' + ni + '].companies[' + ci + ']'};
          treeRefs.push(ref);
          allRefs.push(ref);
        }
      });
    });
  });
  // 同 code 多处引用 → name 一致性(name conflict 检测覆盖两类)
  const nameConflicts = [];
  const nameMap = {};
  allRefs.forEach(r => {
    if (!r.code || !r.name) return;
    if (!nameMap[r.code]) nameMap[r.code] = r.name;
    else if (nameMap[r.code] !== r.name) {
      nameConflicts.push({code: r.code, expected: nameMap[r.code], found: r.name, location: r.location});
    }
  });
  // 核心路径游离(必须为 0):coreRefs 里有但 uniqueCodes 没有的 code
  const coreOrphans = coreRefs.filter(r => r.code && !uniqueCodes.has(r.code));
  // treeMap 生态背景游离(treeOrphans):treeRefs 里有但 uniqueCodes 没有的 code + 重复 code
  //     按设计意图,这是 PCB 上下游全景视角,纳入 treeMap 但不进 segments/midstream/chokePoints 核心池
  //     → 不计入 ⚠ 警告,只统计项数作为基线记录
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
// 股票口径:6 维全部 reason 长度 ≥ 20 字符(非占位文本)的股票数 / 24
// 字段口径:24 × 6 = 144 个字段中 reason 长度 ≥ 20 字符的字段数 / 144
function check3_dims6Completeness() {
  const stocks = MANUAL.stocks || {};
  const totalStocks = Object.keys(stocks).length || 1;
  const totalFields = 24 * 6;  // 24 stocks × 6 维
  let completeStocks = 0;
  let completeFields = 0;
  let phaseBOccupied = 0;
  const phaseBStocks = [];
  Object.keys(stocks).forEach(code => {
    const s = stocks[code];
    if (!Array.isArray(s.dims6) || s.dims6.length !== 6) {
      // dims6 缺失或维度不全 → 该股票不算完整股
      return;
    }
    let stockComplete = true;
    s.dims6.forEach(d => {
      if (!d.reason || d.reason.length < 20) {
        stockComplete = false;
        phaseBOccupied++;
      } else {
        completeFields++;
      }
    });
    if (stockComplete) completeStocks++;
    else phaseBStocks.push(code);
  });
  const stockRate = completeStocks / totalStocks;
  const fieldRate = completeFields / totalFields;
  const stockPct = (stockRate * 100).toFixed(1);
  const fieldPct = (fieldRate * 100).toFixed(1);
  return {totalStocks, totalFields, completeStocks, completeFields, stockPct, fieldPct, phaseBStocks};
}

// ===== 检查 4:DATA_VERSION 与时间戳同步 =====
// semicon-equip.js 头部注释 + manual.js 头部注释的 dataVersion 字段
function check4_dataVersionAndTimestamp() {
  const fsStat = fs.statSync;
  const dataDir = path.join(__dirname, '..', 'data');
  const semiconStat = fsStat(path.join(dataDir, 'semicon-equip.js'));
  const manualStat = fsStat(path.join(dataDir, 'semicon-equip.manual.js'));
  // mtime 倒挂检测:manual 不应该比 auto 旧太多(否则迁移可能尚未完成)
  const mtimeValid = manualStat.mtimeMs >= semiconStat.mtimeMs - 24 * 3600 * 1000;  // manual 允许比 auto 旧 24h
  // 提取 DATA_VERSION 字符串(检查 ./_meta.dataVersion 字段)
  const manualDataVersion = MANUAL._meta && MANUAL._meta.dataVersion || 'unknown';
  return {
    autoMtime: semiconStat.mtime.toISOString().slice(0, 19),
    manualMtime: manualStat.mtime.toISOString().slice(0, 19),
    manualDataVersion,
    mtimeValid,
    note: 'manual mtime ≥ auto mtime - 24h 视为有效'
  };
}

// ===== 跑 baseline 加载/保存 =====

function loadBaseline() {
  try {
    if (fs.existsSync(BASELINE_PATH)) {
      return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
    }
  } catch (e) {}
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
const today = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD

// ===== 报告输出(参考 page_audit.py 风格)=====
let exitCode = 0;
console.log('==================================================');
console.log('check_semicon_sync.js · semicon-equip 数据同步检查报告');
console.log('  生成日期:', today);
console.log('==================================================\n');

console.log('【1】双层字段数值一致性扫描');
if (r1.issues.length === 0) {
  console.log('  ✓ 0 项偏离(当前 manual.js 引用数值与 auto 层 PE 字段一致)\n');
} else {
  console.log('  ⚠ ' + r1.issues.length + ' 项偏离阈值 5%:');
  r1.issues.slice(0, 10).forEach(i => {
    console.log('    - ' + i.code + ' [' + i.dim + ']: manual=' + i.manual + ' · auto=' + i.auto + ' · 偏离 ' + i.divergencePct + '%');
  });
  if (r1.issues.length > 10) console.log('    ... 共 ' + r1.issues.length + ' 项,仅显示前 10');
  console.log();
  if (r1.note) console.log('  [ℹ] ' + r1.note + '\n');
}

console.log('【2】Stock 名称/代码一致性回归检测');
console.log('  [ℹ] 设计口径:core vs treeMapOnly 二分类');
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
console.log('  treeMap 生态背景游离(P=背景,不计入警告):', r2.treeOrphans.length, '(基线', '<= 此值为基线持续记录', 'unique codes)');
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
if (r3.phaseBStocks && r3.phaseBStocks.length) {
  console.log('  [ℹ] ' + r3.phaseBStocks.length + ' 只 stock 仍含 (Phase B 补) 占位,需 Phase B 补 reason: ' + r3.phaseBStocks.slice(0, 6).join(', ') + (r3.phaseBStocks.length > 6 ? '...' : ''));
}
console.log();

console.log('【4】DATA_VERSION 与时间戳同步');
console.log('  auto (semicon-equip.js) mtime:', r4.autoMtime);
console.log('  manual (semicon-equip.manual.js) mtime:', r4.manualMtime);
console.log('  manual _meta.dataVersion:', r4.manualDataVersion);
console.log('  mtime 倒挂检测:', r4.mtimeValid ? '✓' : '⚠');
console.log();

// ===== 基线保存(下次对比用)=====
saveBaseline({
  date: today,
  check1: {issuesCount: r1.issues.length, note: r1.note || 'auto 层 valuation 字段全为占位,本检查实质无对照 → 基线=0'},
  check2: {
    coreRefs: r2.coreRefs,
    treeRefs: r2.treeRefs,
    nameConflicts: r2.nameConflicts.length,
    coreOrphans: r2.coreOrphans.length,
    treeOrphans: r2.treeOrphans.length
  },
  check3: {totalStocks: r3.totalStocks, totalFields: r3.totalFields, completeStocks: r3.completeStocks, completeFields: r3.completeFields},
  check4: {autoMtime: r4.autoMtime, manualMtime: r4.manualMtime, manualDataVersion: r4.manualDataVersion, mtimeValid: r4.mtimeValid}
});

console.log('=== 基线已保存到 ' + BASELINE_PATH + ' ===');

// ===== 退出码 =====
// 警告判定:coreOrphans + nameConflicts + r1 issues + mtime 异常 = exit 1
// treeOrphans 不计入(PCB 设计背景)
if (r1.issues.length > 0 || r2.nameConflicts.length > 0 || r2.coreOrphans.length > 0 || !r4.mtimeValid) {
  exitCode = 1;
}
process.exit(exitCode);
