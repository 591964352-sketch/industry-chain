// 修复 601208 东材科技 durability reason 中未经核实的 2026-04-24 解除日期
// 删除 4-24 具体日期,改为 "具体解除日期归【6. 未查到】"

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const changes = [
  {
    name: 'durability reason 第1处:1) 后实体',
    old: "实控人熊海涛 2026-01-27 留置、2026-04-24 解除,公司治理已正常化(L1 公告原文)",
    new: "实控人治理事件经历留置阶段(2026-01-27 留置 L1 公告披露),后续解除情况需以公司最新公告为准(具体解除日期经本机 L1 巨潮原文不可及 + cninfo 网络封禁 双重不可核实,具体解除日期归【6. 未查到】)",
  },
  {
    name: 'durability reason trend 段:1)',
    old: "Trend 判定 down 表征:1) 实控人留置解除 A 类中性偏正面,2)",
    new: "Trend 判定 down 表征:1) 实控人留置事件已演进至解除阶段 A 类中性偏正面(具体解除日期归未查到),2)",
  },
  {
    name: 'durability reason §10 判定段:本次 L1 公司公告',
    old: "本次 L1 财务连续 5 年时序 + L1 公司公告(解除留置+眉山项目)+ L4",
    new: "本次 L1 财务连续 5 年时序 + L1 公司公告(留置事件相关+眉山项目)+ L4",
  },
  {
    name: 'durability reason 豆包自查:实控人留置/解除日期条目',
    old: "实控人留置/解除日期(2026-01-27 / 2026-04-24)严格基于 L1 公司公告披露项;",
    new: "实控人具体留置日 2026-01-27 基于 L1 公司公告披露项;具体解除日期经投顾核实 + 本机 L1 巨潮原文不可及双重不可核实归【6. 未查到】;",
  },
  {
    name: 'durability reason 豆包自查:不采用清单补充',
    old: "不采用任何具体客户锁单金额/认证日期/海外厂商具体名单等未核实数字;",
    new: "不采用任何具体客户锁单金额/认证日期/海外厂商具体名单/具体解除日期等未核实数字;",
  },
];

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) return startPos + 10 + m.index;
  return code.length;
}

const stock = '601208';
const stockStart = code.indexOf(`'${stock}':`);
if (stockStart < 0) { console.log('NOT FOUND'); process.exit(1); }
const stockEnd = findStockEnd(code, stockStart);
const stockBlock = code.substring(stockStart, stockEnd);

let newBlock = stockBlock;
let totalReplaced = 0;
for (const change of changes) {
  const occurrences = (newBlock.match(new RegExp(escapeRegex(change.old), 'g')) || []).length;
  if (occurrences === 0) {
    console.log(`[${stock}] [MISS] ${change.name}`);
    continue;
  }
  if (occurrences > 1) {
    console.log(`[${stock}] [AMBIGUOUS ${occurrences}] ${change.name}`);
    continue;
  }
  newBlock = newBlock.split(change.old).join(change.new);
  totalReplaced += 1;
  console.log(`[${stock}] [OK] ${change.name}`);
}

if (newBlock !== stockBlock) {
  code = code.substring(0, stockStart) + newBlock + code.substring(stockEnd);
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log(`\n总替换: ${totalReplaced} 处 (预期 ${changes.length} 处)`);
  console.log('write done');
}
