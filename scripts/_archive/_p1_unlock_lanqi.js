// scripts/_p1_unlock_lanqi.js
// ★ 阶段 1-1: 解锁澜起 phaseBTestTrial=false (auto + manual)
// 严格使用唯一锚点(先 count=1 验证)
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SI_PATH = path.join(ROOT, 'data/storage-interface.js');
const SI_MANUAL_PATH = path.join(ROOT, 'data/storage-interface.manual.js');

let changed = 0;

// === 1. auto 层: 解除 seg[2] 澜起 phaseBTestTrial=false ===
const autoOld = `"scoringStatus": "primary",
          "phaseBTestTrial": true`;
const autoNew = `"scoringStatus": "primary-confirmed",
          "phaseBTestTrial": false`;

let atxt = fs.readFileSync(SI_PATH, 'utf8');
const aCount = atxt.split(autoOld).length - 1;
if (aCount !== 1) {
  console.error('[FAIL] auto layer 锚点出现次数:', aCount, '(必须=1)');
  process.exit(1);
}
atxt = atxt.replace(autoOld, autoNew);
fs.writeFileSync(SI_PATH, atxt);
changed++;
console.log('[OK] § auto.seg[2].688008 phaseBTestTrial=false + scoringStatus=primary-confirmed');
console.log('    new file size:', atxt.length, 'chars');

// === 2. manual 层: 解除 stock.phaseBTestTrial = false ===
// manual 文件锚点: 澜起的 segment 设置分支
const manOld = `if (code === '688008') {
      stock.segments = [
        { idx: 2, name: 'DDR5/LPDDR5 主控与 RCD' },
        { idx: 3, name: 'CXL 内存池化与互连' },
        { idx: 4, name: 'PCIe Retimer/Redriver 接口' }
      ];
      stock.investableReason = '🏠 主场:seg[2] DDR5 RCD 全球双寡头(与Rambus)·2025营收54.56亿(+49.94%)·DDR5 RCD占比~78-81%·基于akshare abstract_ths L1实证 | 关联提及(不重复计分):seg[3] CXL MXC(<2%)·seg[4] PCIe Retimer(7-11%) | Phase B 试点 (phaseBTestTrial=true) | verifiedAt 2026-07-13';`;

const manNew = `if (code === '688008') {
      stock.segments = [
        { idx: 2, name: 'DDR5/LPDDR5 主控与 RCD' },
        { idx: 3, name: 'CXL 内存池化与互连' },
        { idx: 4, name: 'PCIe Retimer/Redriver 接口' }
      ];
      stock.phaseBTestTrial = false;  // ★ 2026-07-14 6.99 解锁 R6 · 原 commit 6.88 试点已晋级 chokePoint
      stock.investableReason = '🏠 主场:seg[2] DDR5 RCD 全球双寡头(与Rambus)·2025营收54.56亿(+49.94%)·DDR5 RCD占比~78-81%·基于akshare abstract_ths L1实证 | 关联提及(不重复计分):seg[3] CXL MXC(<2%)·seg[4] PCIe Retimer(7-11%) | 6.99 解锁 Phase B 试点(原 commit 6.88) | verifiedAt 2026-07-14';`;

let mtxt = fs.readFileSync(SI_MANUAL_PATH, 'utf8');
const mCount = mtxt.split(manOld).length - 1;
if (mCount !== 1) {
  console.error('[FAIL] manual 锚点出现次数:', mCount, '(必须=1)');
  process.exit(1);
}
mtxt = mtxt.replace(manOld, manNew);
fs.writeFileSync(SI_MANUAL_PATH, mtxt);
changed++;
console.log('[OK] § manual.688008 phaseBTestTrial=false + investableReason 注明 6.99 解锁');

// === 3. 加载验证 ===
delete require.cache[require.resolve(SI_PATH)];
delete require.cache[require.resolve(SI_MANUAL_PATH)];
const ch = require(SI_PATH);
const lanqi = ch['storage-interface'].segments[2].stocks.find(s => s.code === '688008');
console.log('\n=== 验证 ===');
console.log('auto.seg[2].688008.phaseBTestTrial =', lanqi.phaseBTestTrial);
console.log('auto.seg[2].688008.scoringStatus =', lanqi.scoringStatus);

if (lanqi.phaseBTestTrial !== false || lanqi.scoringStatus !== 'primary-confirmed') {
  console.error('[FAIL] 解锁后状态不符');
  process.exit(1);
}
console.log('阶段 1-1 (unlock) 完成. 共 changed:', changed);
