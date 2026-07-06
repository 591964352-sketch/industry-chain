// tier 字段统一校准·第二批(10 只 stock · 40 处改动 · 修正版)
// 修正点:301377 visibility 已是 L1 不需要改;603920 visibility 已是 L1 不需要改
// 确认事实:602913 全部维持;301377 supply L3 维持不动(歧义#1 裁决)
// 确认事实:688388 五字段 estimate→L4(歧义#2 裁决,不是 L1)

const fs = require('fs');
let code = fs.readFileSync('data/pcb.manual.js', 'utf8');

const stockOrder = ['605589', '002938', '600183', '002913', '301377', '301511', '603256', '603519', '688388', '603186', '603920'];

const changesByStock = {
  '605589': [
    ['durability', 4, 'flat', 'L4', 'L1'],
    ['visibility', 3, 'flat', 'L4', 'L1'],
    ['valuation', 3, 'flat', 'L4', 'L1'],
    ['barrier', 5, 'flat', 'L3', 'L1'],
  ],
  '002938': [
    ['durability', 3, 'flat', 'L4', 'L1'],
    ['visibility', 3, 'flat', 'L4', 'L1'],
    ['valuation', 3, 'flat', 'L4', 'L1'],
    ['barrier', 4, 'flat', 'L3', 'L1'],
  ],
  '600183': [
    ['durability', 4, 'up', 'estimate', 'L1'],
    ['visibility', 3, 'flat', 'estimate', 'L1'],
    ['supply', 4, 'up', 'estimate', 'L1'],
    ['valuation', 3, 'down', 'estimate', 'L1'],
    ['barrier', 5, 'flat', 'estimate', 'L1'],
  ],
  '002913': [],
  '301377': [
    ['durability', 4, 'up', 'L4', 'L1'],
    // visibility 已是 L1(commit 6.52 / 6.53 已处理)
    // supply L3 维持不动(歧义#1 裁决)
  ],
  '301511': [
    ['durability', 4, 'up', 'estimate', 'L1'],
    ['visibility', 3, 'flat', 'estimate', 'L1'],
    ['supply', 4, 'up', 'estimate', 'L1'],
    ['valuation', 3, 'flat', 'estimate', 'L1'],
    ['barrier', 4, 'flat', 'estimate', 'L1'],
  ],
  '603256': [
    ['durability', 4, 'up', 'estimate', 'L1'],
    ['visibility', 3, 'flat', 'estimate', 'L1'],
    ['supply', 4, 'up', 'estimate', 'L1'],
    ['valuation', 2, 'down', 'estimate', 'L1'],
    ['barrier', 4, 'flat', 'estimate', 'L1'],
  ],
  '603519': [
    ['durability', 3, 'flat', 'estimate', 'L1'],
    ['visibility', 3, 'flat', 'estimate', 'L1'],
    ['supply', 3, 'flat', 'estimate', 'L1'],
    ['valuation', 3, 'flat', 'estimate', 'L1'],
    ['barrier', 4, 'flat', 'estimate', 'L1'],
  ],
  '688388': [
    ['durability', 3, 'flat', 'estimate', 'L4'],
    ['visibility', 3, 'flat', 'estimate', 'L4'],
    ['supply', 4, 'up', 'estimate', 'L4'],
    ['valuation', 3, 'flat', 'estimate', 'L4'],
    ['barrier', 2, 'flat', 'estimate', 'L4'],
  ],
  '603186': [
    ['durability', 4, 'up', 'estimate', 'L1'],
    ['visibility', 3, 'flat', 'estimate', 'L1'],
    ['supply', 3, 'flat', 'estimate', 'L1'],
    ['valuation', 2, 'flat', 'estimate', 'L1'],
    ['barrier', 4, 'flat', 'estimate', 'L1'],
  ],
  '603920': [
    // visibility 已是 L1(无需改)
    ['valuation', 3, 'flat', 'estimate', 'L1'],
  ],
};

function findStockEnd(code, startPos) {
  const sub = code.substring(startPos + 10);
  const m = sub.match(/'\d{6}':\s*\{/);
  if (m) {
    return startPos + 10 + m.index;
  }
  return code.length;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let totalReplaced = 0;
let stockSummary = {};
for (const stock of stockOrder) {
  const stockStart = code.indexOf(`'${stock}':`);
  if (stockStart === -1) {
    console.log(`[${stock}] NOT FOUND stock start`);
    continue;
  }
  const stockEnd = findStockEnd(code, stockStart);
  const before = code.substring(0, stockStart);
  const stockBlock = code.substring(stockStart, stockEnd);
  const after = code.substring(stockEnd);

  let newBlock = stockBlock;
  const changes = changesByStock[stock] || [];
  let stockCount = 0;
  const stockLog = [];
  for (const [dim, score, trend, oldTier, newTier] of changes) {
    const oldStr = `key:'${dim}',score:${score},trend:'${trend}',tier:'${oldTier}'`;
    const newStr = `key:'${dim}',score:${score},trend:'${trend}',tier:'${newTier}'`;
    const occurrences = (newBlock.match(new RegExp(escapeRegex(oldStr), 'g')) || []).length;
    if (occurrences === 0) {
      console.log(`[${stock}] [${dim}] NOT FOUND: ${oldStr}`);
      stockLog.push(`${dim}: MISS`);
      continue;
    }
    if (occurrences > 1) {
      console.log(`[${stock}] [${dim}] AMBIGUOUS: ${occurrences} 处匹配,跳过`);
      stockLog.push(`${dim}: AMBIGUOUS(${occurrences})`);
      continue;
    }
    newBlock = newBlock.split(oldStr).join(newStr);
    console.log(`[${stock}] [${dim}] ${oldTier}→${newTier}`);
    stockCount += 1;
    stockLog.push(`${dim}:${oldTier}→${newTier}`);
  }
  totalReplaced += stockCount;
  stockSummary[stock] = stockLog;

  if (newBlock !== stockBlock) {
    code = before + newBlock + after;
  }
}

// 预期改动数 = 4+4+5+0+1+5+5+5+5+5+1 = 40
const expectedTotal = 40;
console.log(`\n总替换: ${totalReplaced} 处 (预期 ${expectedTotal} 处)`);
if (totalReplaced === expectedTotal) {
  fs.writeFileSync('data/pcb.manual.js', code);
  console.log('write done');
} else {
  console.log('数量不匹配,未写入文件');
}

console.log('\n=== 各 stock 改动汇总 ===');
for (const stock of stockOrder) {
  const planned = (changesByStock[stock] || []).length;
  const success = (stockSummary[stock] || []).filter(l => l.includes('→')).length;
  console.log(`\n[${stock}] ${planned} 计划 · ${success} 成功`);
  if (stockSummary[stock]) {
    for (const log of stockSummary[stock]) console.log(`  - ${log}`);
  }
}
