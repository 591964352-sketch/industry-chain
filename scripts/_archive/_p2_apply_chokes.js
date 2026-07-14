// scripts/_p2_apply_chokes.js
// ★ 整体应用 4 只新 chokes 到 storage-interface.js
// 步骤:
//   1. 用 grep/sed 提取原安集条目真实内容(from 1829 行之前的结构部分)
//   2. 用 Read 工具读取 1829 行之前的 healthy choke 区域
//   3. 把损坏区域(1829-1939 行)整体替换为 [chokePoints 5 只] 干净 JSON
//   4. Write 整体写回
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SI_PATH = path.join(ROOT, 'data/storage-interface.js');

// 1. 读取损坏文件
let atxt = fs.readFileSync(SI_PATH, 'utf8');

// 2. 找到损坏区域: 1829 行的 '    }' (原 chokepoint 第一只的 } ) 到 1940 行的 '    }\n  ],\n  "supplyGap"'
//    其中 1829 是 rank1 末尾 }, 1939 是最后一行的 stray '    }', 1940 行是空行
// 3. 提取: 原 rank1 安集真正的 plainLanguageNote + strengthNote + verification + valuation + logic + tags
//    这部分在 1810-1829 区域是健康的, 我已经看到了——可直接复用

const rank1Healthy = `      "plainLanguageNote": "<strong>💡 大白话：为什么安集科技是物理卡口？</strong><br><br>CMP抛光液就像是芯片制造的“牙膏”——每一层电路刻好后，需要用这种特殊研磨液把表面磨得像镜面一样光滑，才能继续往上盖下一层。一颗HBM内存堆叠12层，每层都要磨到误差不到1纳米（相当于把足球场磨平到高低差不到一根头发丝），全世界只有五六家公司能干这个活。<br><br>安集科技是国内唯一能量产高端抛光液的公司，中芯国际、长江存储这些国产晶圆厂根本离不开它——因为换一家抛光液供应商，良率可能直接暴跌，验证新供应商需要12-18个月。这期间产线不能停、客户不能等——这就是典型的<strong>“我不是最大，但你没我不行”</strong>的物理卡口逻辑。物理定律不会因为你急就网开一面：化学机械抛光的精度取决于配方，配方是几十个变量反复试验出来的，不是花钱就能买到的。",
      "strengthNote": "2026-07-14 6.92 立:本链首次入选 chokePoints 的 Phase B 第二批独立评估股票(A类,非跨链复用). barrier=5 来自 L1 abstract_ths 财务时序+L4 头部券商研报行业共识(§11.23 数据局限已记录,本链 L3 全球 CMP 抛光液厂商格局报告待补). moat=94 来自 storage-interface 链 5 维权重(durability 0.25 + barrier 0.25 + visibility 0.20 + supply 0.20 + policy 0.10)×100 公式反推. 本链 seg[1] HBM 封装材料 语境下,与 HBM 介质层抛光精度强相关. risk 门控:无(barrier=5+moat≥60)."`;

// 4. 加载 _p2_gen_chokes_out.json (5 只 chokes 的 JSON 字符串)
const jsonOut = fs.readFileSync(path.join(__dirname, '_p2_gen_chokes_out.json'), 'utf8');
const allChokesParsed = JSON.parse(jsonOut);
console.log('从 JSON 读出 5 只:', allChokesParsed.map(c => c.rank + ':' + c.code).join(' / '));

// 取 rank 1 (安集) 的 plainLanguageNote / strengthNote 用真实的(从 rank1Healthy 提取)
const realRank1PlainNote = /"plainLanguageNote": "([^"]*(?:\\.[^"]*)*)",\s*"strengthNote": "([^"]*(?:\\.[^"]*)*)"/.exec(rank1Healthy.replace(/[\r\n]/g, ' '));
if (realRank1PlainNote) {
  // 更新为真实内容
  allChokesParsed[0].plainLanguageNote = realRank1PlainNote[1];
  allChokesParsed[0].strengthNote = realRank1PlainNote[2];
  console.log('rank1 安集 plainLanguageNote 已回填真实内容,长度 =', allChokesParsed[0].plainLanguageNote.length);
}
// 其他字段全部从 rank1 原有的恢复(via vm 读 .originalAji placeholder 不行, 需要 from disk)
//
// 更稳: 既然我们只需要 4 只新 chokes 加入到 array. 第 1 只安集保持原状(磁盘中 1829-1829 行部分)
//  我们只需要替换 line 1829-1939 损坏区域为 [rank 2-5 4 只干净 JSON]

// 5. 加载只剩 rank 2-5 的 JSON
const newChokesArr = allChokesParsed.slice(1);  // rank 2,3,4,5
const newChokesStr = JSON.stringify(newChokesArr, null, 2);
// indented 增加一层 (因为在 chokePoints array 内部)
const newChokesIndented = newChokesStr.split('\n').map((line, i) => {
  if (i === 0) return line;  // [ 开头
  return '    ' + line;  // 每个内层字段缩进 4
}).join('\n');
console.log('newChokesStr first line:', newChokesStr.slice(0, 30));
console.log('---');

// 6. 现在的问题: 我们仍要保留原 rank1 数据(1822-1829 区域), 只置换 1829-1939 区域
// 方案: 找到唯一的 锚点 "}\n  ],\n  "supplyGap"", 然后把 "}\n  ],\n" 之间的内容替换
// 但是 1829 行 `    }` 后接 1830 `{` 是损坏的, 我们要全部剔除 + 重新插入

// 简化策略: 找 "},\n    {\n      \"rank\": 2," 这个字符串(从损坏区开始),
//   替换到 "    }\n  ],\n  "supplyGap"" 之间的所有内容

const damagedStart = '    },\n    {\n      "rank": 2,';
// 注意: 原文件 1939 '    }\n  ],\n  "supplyGap": [\n' 这种格式 — 我们要保留 `"supplyGap": [` 后的所有内容
// 锚点只切到\n  ], 后面立即接 ` "supplyGap": [` — 用较长锚点保证不切到 supplyGap 内容
const damagedEnd = '    }\n  ],\n  "supplyGap": [';

const startIdx = atxt.indexOf(damagedStart);
const endIdx = atxt.indexOf(damagedEnd);
if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) {
  console.error('[FAIL] 锚点位置异常', { startIdx, endIdx });
  process.exit(1);
}
console.log('damaged region: line', atxt.slice(0, startIdx).split('\n').length, 'to', atxt.slice(0, endIdx).split('\n').length);

// 7. 构造修复后区域
// 旧: "},\n    {\n      "rank": 2,...    }\n  ],\n  "supplyGap":"
// 新: "},\n" + newChokesIndented + "\n    }\n  ],\n  "supplyGap":"
// 注: 末尾必须有 '    },\n  ],' (即最后一个元素的 }, 然后 数组 ]), 由 newChokesIndented 提供的 [..] 含 4 只
// 但 newChokesIndented 是 "[..." 整括数组 - 我们要拆掉 [], 只嵌入 4 个对象

const newChokesJsonNoBrackets = newChokesStr.slice(1, newChokesStr.lastIndexOf(']')).trim();
const newChokesFinal = newChokesJsonNoBrackets.split('\n').map(line => '    ' + line).join('\n');

// fixup:
// 当前损坏区域: 起始于 '    },' (rank1 安集结束 },) 中间是 rank2-5 末尾直到
//   "    }\n  ],\n  "supplyGap""
// 我们保留 rank1 结束 '    },' 之前的部分全部不动, 替换 '      "rank": 2,...    }\n  ],\n  "supplyGap"'
const slice1 = atxt.slice(0, startIdx);
const slice2 = atxt.slice(endIdx);
const finalContent = slice1 + '    },\n' + newChokesFinal + '\n  ],\n  "supplyGap":';
console.log('replaced. new total length =', finalContent.length);

fs.writeFileSync(SI_PATH, finalContent);
console.log('[OK] § storage-interface.js 修复完成');

// 8. 立即 node --check 验证
const { execSync } = require('child_process');
try {
  execSync('node --check data/storage-interface.js', { cwd: ROOT, stdio: 'inherit' });
  console.log('\n[OK] § node --check PASS');
} catch (e) {
  console.error('\n[FAIL] node --check 仍报错,需手工修复');
}

// 9. vm 加载验证
const vm = require('vm');
const ctx2 = { window: {} };
vm.createContext(ctx2);
try {
  new vm.Script(finalContent).runInContext(ctx2);
  const ch = ctx2.window.CHAINS['storage-interface'];
  console.log('\n=== vm 加载验证 ===');
  console.log('chokePoints count =', ch.chokePoints.length);
  ch.chokePoints.forEach((c, i) => {
    const pn = c.plainLanguageNote || '';
    console.log(`  rank ${c.rank}: ${c.code} ${c.name} strength=${c.strength} plainNote=${pn.length}字`);
  });
} catch (e) {
  console.error('[FAIL] vm 加载:', e.message);
}
