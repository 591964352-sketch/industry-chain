// check_tree_sourceseg.js — treeMap sourceSegment 粒度 + 空companies 依赖检测
// 检测 2 种模式:
//   模式A(高危): 同一 sourceSegment 被 ≥2 个节点引用 + 至少 1 个引用节点的 companies=[]
//     → 不同节点会通过 fallback 显示完全相同的公司列表（光模块链事故根因）
//   模式B(一般风险): 单个节点的 companies=[] + sourceSegment 存在
//     → 该节点依赖 fallback 显示 segment stocks, 如果 segment 粒度粗于节点粒度则可能显示不相关公司
// 用法: node scripts/check_tree_sourceseg.js [chainId]
//       无参数时审计全部常用链

const fs = require('fs');
const path = require('path');
const chainId = process.argv[2];

function auditChain(id) {
  global.window = global.window || {};
  const f = path.join(__dirname, '..', 'data', id + '.js');
  if (!fs.existsSync(f)) { console.log(id + ': file not found'); return; }
  eval(fs.readFileSync(f, 'utf8'));
  const c = global.window.CHAINS[id];
  if (!c || !c.treeMap) { console.log(id + ': no treeMap'); return; }

  console.log('══════ ' + id + ' ══════\n');

  // === 统计：全部 sourceSegment → 引用节点清单 ===
  const usage = {};
  ['downstream', 'midstream', 'materials', 'equipment', 'sideBranches'].forEach(col => {
    (c.treeMap[col] || []).forEach((node, i) => {
      if (!node.sourceSegment) return;
      if (!usage[node.sourceSegment]) usage[node.sourceSegment] = [];
      usage[node.sourceSegment].push({
        col, idx: i, name: node.name,
        companiesLen: (node.companies || []).length
      });
    });
  });

  // === 统计：companies=[] + sourceSegment 存在的节点（不论是否多引用） ===
  const emptyWithSeg = [];
  ['downstream', 'midstream', 'materials', 'equipment', 'sideBranches'].forEach(col => {
    (c.treeMap[col] || []).forEach((node, i) => {
      if ((node.companies || []).length === 0 && node.sourceSegment) {
        emptyWithSeg.push({ col, idx: i, name: node.name, sourceSegment: node.sourceSegment });
      }
    });
  });

  // === 输出 ===
  console.log('--- 全部 sourceSegment 引用统计 ---');
  if (Object.keys(usage).length === 0) {
    console.log('  (该链 treeMap 节点均无 sourceSegment 字段)');
  } else {
    Object.entries(usage).forEach(([seg, refs]) => {
      const multiFlag = refs.length >= 2 ? ' [≥2节点共享]' : '';
      const emptyCount = refs.filter(r => r.companiesLen === 0).length;
      const emptyFlag = emptyCount > 0 ? ' [含'+emptyCount+'空companies]' : '';
      console.log('  "' + seg + '" → ' + refs.length + '个节点引用' + multiFlag + emptyFlag);
      refs.forEach(r => {
        console.log('    ' + r.col + '[' + r.idx + '] ' + r.name + ' (companies=' + r.companiesLen + ')');
      });
    });
  }

  console.log('\n--- companies=[] 且依赖 sourceSegment 回退的节点 ---');
  if (emptyWithSeg.length === 0) {
    console.log('  ✅ 0 个这样的节点');
  } else {
    console.log('  ' + emptyWithSeg.length + ' 个节点（如果 sourceSegment 指向的 segment 与节点主题不一致，存在显示错误风险）:');
    emptyWithSeg.forEach(n => {
      // Check if any OTHER node shares the same sourceSegment
      const shared = usage[n.sourceSegment].length >= 2;
      const sharedFlag = shared ? ' ⚠️该sourceSegment被多个节点共享' : '';
      console.log('  ' + n.col + '[' + n.idx + '] ' + n.name + ' → "' + n.sourceSegment + '"' + sharedFlag);
    });
  }

  // === 模式A: 高危 ===
  let issuesA = 0;
  Object.entries(usage).forEach(([seg, refs]) => {
    if (refs.length < 2) return;
    const emptyRefs = refs.filter(r => r.companiesLen === 0);
    if (emptyRefs.length === 0) return;
    issuesA++;
    console.log('\n[模式A·高危] sourceSegment="' + seg + '" 被' + refs.length + '个节点共享,其中' + emptyRefs.length + '个companies为空→回退将显示相同列表');
  });
  if (issuesA === 0) console.log('\n[模式A] ✅ 无高危');

  console.log('');
}

if (chainId) {
  auditChain(chainId);
} else {
  ['optical-module', 'pcb', 'semicon-equip', 'storage-interface'].forEach(auditChain);
  console.log('用法: node scripts/check_tree_sourceseg.js [chainId]');
  console.log('无参数时审计全部常用链');
}
