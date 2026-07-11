// 4.83 第3步：更新 demandChainMeta 3 个 CAGR
// AI 服务器 30% → 38.5%
// 通信/5G 5.4% → 3.2%
// 消费电子 2.8% → 2.1%
const fs = require('fs');
let src = fs.readFileSync('data/pcb.js', 'utf8');
const before = src.length;

// 替换规则：使用精确上下文锚定，避免误改
// pcb.js 使用 CRLF 行尾，必须用 \r\n 精确匹配
const updates = [
  {
    name: 'AI 服务器 CAGR: 32 → 38.5',
    find: "key: 'aiServer', name: 'AI 服务器', sharePct: 40,\r\n        cagr: 32, cagrRange: '30%-35%', cagrTier: 'broker'",
    replace: "key: 'aiServer', name: 'AI 服务器', sharePct: 40,\r\n        cagr: 38.5, cagrRange: '35%-42%', cagrTier: 'broker'"
  },
  {
    name: '通信/5G CAGR: 5.4 → 3.2',
    find: "key: 'comm', name: '通信/5G', sharePct: 20,\r\n        cagr: 5.4, cagrRange: '5.4%-8%', cagrTier: 'broker'",
    replace: "key: 'comm', name: '通信/5G', sharePct: 20,\r\n        cagr: 3.2, cagrRange: '2.8%-3.8%', cagrTier: 'broker'"
  },
  {
    name: '消费电子 CAGR: 2.8 → 2.1',
    find: "key: 'consumer', name: '消费电子', sharePct: 15,\r\n        cagr: 2.8, cagrRange: '2.6%-3.0%', cagrTier: 'broker'",
    replace: "key: 'consumer', name: '消费电子', sharePct: 15,\r\n        cagr: 2.1, cagrRange: '1.8%-2.4%', cagrTier: 'broker'"
  }
];

let successCount = 0;
for (const u of updates) {
  if (src.includes(u.find)) {
    src = src.replace(u.find, u.replace);
    console.log('✓', u.name);
    successCount++;
  } else {
    console.log('✗ 未找到:', u.name);
  }
}

console.log('\n成功:', successCount, '/', updates.length);

if (successCount === updates.length) {
  fs.writeFileSync('data/pcb.js', src);
  console.log('File size before:', before, 'after:', src.length, 'diff:', src.length - before);

  // 验证
  try {
    new Function(src);
    console.log('JS syntax OK');
  } catch (e) {
    console.log('JS ERR:', e.message);
  }

  // 验证修改结果
  const verify = src.match(/key: '\w+'[\s\S]*?cagr: [\d.]+/g);
  console.log('\nCAGR 验证:');
  if (verify) verify.forEach(v => console.log('  ', v.replace(/\n/g, ' ')));
} else {
  console.log('部分失败，未写入文件');
}