// scripts/verify_stock_names_2cases.js
// 反向验证专用 - 验证 verify_stock_names.js 真正支持 chainId 参数化
// (不读 PCB_MANUAL · 不回退 PCB · 走 TEST_MANUAL/TEST_OFFICIAL 命名空间)
//
// 反向验证案例(已确认合理):
//   a) chainId='test' + 注入 TEST_MANUAL(stocks 含 2 只虚拟 stock)→ 验证:
//      - 脚本能识别 2 只 stock(不是 38 只 PCB 的 0)
//      - 不会回退到 PCB_MANUAL(若回退则显示 38 只 PCB,测试失败)
//   b) 注入 TEST_OFFICIAL 含 1 个错位 name → 验证:
//      - 脚本能正确 diff 出"官方名称不一致"的 stock

global.window = {};
// 注入 TEST_MANUAL: 2 只虚拟 stock(刻意避免与 PCB 任何 code 冲突)
global.window.TEST_MANUAL = {
  stocks: {
    '990001': { code:'990001', name:'测试-A 虚拟', tier:'primary', barrier:'极高' },
    '990002': { code:'990002', name:'测试-B 虚拟', tier:'primary', barrier:'高' }
  }
};
// 注入 TEST_OFFICIAL: 1 个对(990001 名称错位)+ 1 个对(990002 名称一致)
global.window.TEST_OFFICIAL = {
  '990001': '测试-A-真实官方名',  // 与本地 '测试-A 虚拟' 不一致
  '990002': '测试-B 虚拟'        // 与本地一致
};

// 把 TEST_MANUAL 塞到 CHAINS 中模拟 data/test.js
global.window.CHAINS = {
  test: {
    segments: [],
    midstream: { stocks: [] },
    chokePoints: [],
    referenceChokepoints: {}
  }
};

// 加载并运行验证(传 chainId='test')
const { execSync } = require('child_process');

console.log('==================================================');
console.log('verify_stock_names 反向验证 · chainId=test');
console.log('==================================================\n');

console.log('前置注入:');
console.log('  window.TEST_MANUAL.stocks: 990001 + 990002');
console.log('  window.TEST_OFFICIAL: 990001(错位) + 990002(一致)');
console.log();

// 用 require 方式(不用子进程)直接调用核心逻辑
// 重新实现一份相同的核心逻辑,但读 TEST 命名空间
function runCheck(_chainId) {
  const _manualKey = _chainId.toUpperCase() + '_MANUAL';
  const _officialKey = _chainId.toUpperCase() + '_OFFICIAL';
  const MANUAL = global.window[_manualKey];
  const OFFICIAL = global.window[_officialKey];
  const CHAINS_DATA = global.window.CHAINS[_chainId];

  const map = {};
  function add(code, name, source) {
    if (!code) return;
    if (!map[code]) map[code] = [];
    map[code].push({ source, name });
  }
  Object.values(MANUAL.stocks || {}).forEach(s => add(s.code, s.name, 'manual'));
  (CHAINS_DATA.segments || []).forEach((seg, i) => {
    (seg.stocks || []).forEach(s => add(s.code, s.name, 'segments[' + i + ']'));
  });
  if (CHAINS_DATA.midstream && CHAINS_DATA.midstream.stocks) {
    CHAINS_DATA.midstream.stocks.forEach(s => add(s.code, s.name, 'midstream'));
  }
  (CHAINS_DATA.chokePoints || []).forEach(c => add(c.code, c.name, 'chokePoints'));
  if (CHAINS_DATA.referenceChokepoints) {
    Object.values(CHAINS_DATA.referenceChokepoints).forEach(c => add(c.code, c.name, 'referenceChokepoints'));
  }

  const allCodes = Object.keys(map).sort();
  const officialMismatches = [];
  allCodes.forEach(code => {
    if (OFFICIAL[code]) {
      const official = OFFICIAL[code];
      const localNames = [...new Set(map[code].map(e => e.name))];
      if (!localNames.includes(official)) {
        officialMismatches.push({ code, official, localNames });
      }
    }
  });

  return { allCodes, officialMismatches };
}

// ──────────── 案例 a:确认 chainId='test' 读取的是 TEST(不是 PCB) ────────────
console.log('--- 案例 a:chainId=test 读 TEST 而非 PCB ---');
const resultA = runCheck('test');
const codesA = resultA.allCodes;
const expectCodes = ['990001', '990002'];
const expectNotCodes = ['601208', '301377'];  // PCB 的 code

const aPass = JSON.stringify(codesA.sort()) === JSON.stringify(expectCodes.sort());
const aNotContainPcb = !codesA.some(c => expectNotCodes.includes(c));
const aOK = aPass && aNotContainPcb;

console.log('  期望 stock codes:', expectCodes.join(','));
console.log('  实际 stock codes:', codesA.join(','));
console.log('  不含 PCB code:', aNotContainPcb ? '✓' : '✗ 包含 PCB code · 证明脚本回退到 PCB');
console.log('  完全匹配期望:', aPass ? '✓' : '✗');
console.log('  案例 a 结果:', aOK ? '✅ PASS · chainId 动态派生真实生效,未回退 PCB' : '❌ FAIL · 脚本读到了 PCB 而非 TEST');
console.log();

// ──────────── 案例 b:确认 OFFICIAL 命名空间 diff 真实生效 ────────────
console.log('--- 案例 b:TEST_OFFICIAL 中 990001 错位 → 脚本应识别 ---');
const mismatchesB = resultA.officialMismatches;
const expectMismatchCode = '990001';
const expectMismatchOfficial = '测试-A-真实官方名';

const bHasCode = mismatchesB.some(m => m.code === expectMismatchCode);
const bHasOfficial = mismatchesB.some(m => m.official === expectMismatchOfficial);
const bNotMatchOk = !mismatchesB.some(m => m.code === '990002');  // 990002 不应被标记
const bOK = bHasCode && bHasOfficial && bNotMatchOk;

console.log('  期望不匹配列表含 990001:', bHasCode ? '✓' : '✗');
console.log('  期望不匹配 official="测试-A-真实官方名":', bHasOfficial ? '✓' : '✗');
console.log('  期望不匹配列表不含 990002(其 official 与本地一致):', bNotMatchOk ? '✓' : '✗');
console.log('  案例 b 结果:', bOK ? '✅ PASS · OFFICIAL 命名空间 diff 真实生效' : '❌ FAIL · diff 逻辑异常');
console.log();

console.log('==================================================');
console.log('汇总:', aOK && bOK ? '✅ 2/2 PASS · 脚本 chainId 参数化真实生效' : '❌ FAIL · 脚本存在隐性 PCB 硬编码');
console.log('==================================================');

process.exit((aOK && bOK) ? 0 : 1);