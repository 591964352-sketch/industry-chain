// 4.87 section-meta 移位（方案 C）
// 从当前位置（line 2975-3072，section-demand-chain 之后）移到 section-midstream（line 3193-3221）之后
const fs = require('fs');
let src = fs.readFileSync('index.html', 'utf8');
const before = src.length;

// 1) 定位 section-meta 块起始（含注释行 2975）
const metaStart = src.indexOf('  // ② ⑥ 后段：卡脖子参考 + 供需缺口 + 方法论（默认折叠）\r\n');
if (metaStart === -1) {
  console.log('✗ 未找到 section-meta 注释行');
  process.exit(1);
}
console.log('section-meta 起始:', metaStart);

// 2) 定位 section-meta 块结束（if 块关闭 `}` 单独一行）
// 找到 "  // Section 3/4/5: Upstream Segments" 注释行
const upstreamComment = src.indexOf('  // Section 3/4/5: Upstream Segments', metaStart);
if (upstreamComment === -1) {
  console.log('✗ 未找到 Section 3/4/5 注释');
  process.exit(1);
}
// 块结束 = upstreamComment 之前的 \n\n\n 中最后一个 \n\n 之后
// 实际上 line 3072 是 `}` 关闭块，line 3073 是空行，line 3074 是新注释
// metaEnd = upstreamComment 之前的所有内容 + 回溯到 `}` 行结束
const beforeUpstream = src.slice(0, upstreamComment);
// metaEnd 是 beforeUpstream 末尾的回溯：最后一个 } 在自己的行
// 找 beforeUpstream 中最后一个 '  }\n' 模式
const lastBraceIdx = beforeUpstream.lastIndexOf('  }\r\n');
if (lastBraceIdx === -1) {
  console.log('✗ 未找到 meta 块关闭 }');
  process.exit(1);
}
const metaEnd = lastBraceIdx + '  }\r\n'.length; // 不包含块结束后的 \r\n（让 \r\n 留在原位置）
console.log('section-meta 结束:', metaEnd);

// 取出 section-meta 块内容（含前置注释 + if 块）
const metaBlock = src.slice(metaStart, metaEnd);
console.log('section-meta 块长度:', metaBlock.length);
console.log('section-meta 起始 50 字符:', JSON.stringify(metaBlock.slice(0, 50)));
console.log('section-meta 结束 50 字符:', JSON.stringify(metaBlock.slice(-50)));

// 3) 定位 section-midstream 块结束（要在此之后插入 section-meta）
// section-midstream 在 line 3193 开始，section-fourq 在 line 3222 开始
// 找 "  h += `<div class=\"section collapsible\" data-key=\"fourq\"" 位置
const fourqStart = src.indexOf('  h += `<div class="section collapsible" data-key="fourq"', metaStart);
if (fourqStart === -1) {
  console.log('✗ 未找到 section-fourq 起始');
  process.exit(1);
}
console.log('section-fourq 起始:', fourqStart);

// 找 section-fourq 之前的最后 } - section-midstream 块结束
// section-midstream 在 fourqStart 之前结束
const beforeFourq = src.slice(0, fourqStart);
// 找 section-midstream 块结束：最后 "  }\n" 之前一个（实际上 midstream 的 `}`）
// 但 midstream 是多个 segment 渲染，最后的 } 是 if 块关闭
const lastMidBrace = beforeFourq.lastIndexOf('  }\r\n');
if (lastMidBrace === -1) {
  console.log('✗ 未找到 midstream 块关闭 }');
  process.exit(1);
}
const midEnd = lastMidBrace + '  }\r\n'.length;
console.log('section-midstream 结束:', midEnd);

// 4) 执行移动：
//    a) 从 src 删除 metaStart 到 metaEnd 区域
//    b) 在 midEnd 位置插入 metaBlock 内容

let newSrc = src.slice(0, metaStart) + src.slice(metaEnd);
// metaStart 之后的位置 = metaEnd - metaStart 个字符被删除
// newSrc 中 midEnd 位置 = midEnd - (metaEnd - metaStart)
// 但 midEnd < metaStart? 让我看 midEnd 和 metaStart 的大小
console.log(`metaStart=${metaStart}, metaEnd=${metaEnd}, midEnd=${midEnd}`);
// 如果 midEnd > metaStart，需要调整 midEnd 位置
let adjustedMidEnd = midEnd;
if (midEnd > metaStart) {
  adjustedMidEnd = midEnd - (metaEnd - metaStart);
  console.log('调整后 midEnd:', adjustedMidEnd);
}

// 在 newSrc 的 adjustedMidEnd 位置插入 metaBlock
const beforeInsert = newSrc.slice(0, adjustedMidEnd);
const afterInsert = newSrc.slice(adjustedMidEnd);
// 在插入位置后加一个空行分隔
newSrc = beforeInsert + metaBlock + '\n' + afterInsert;

// 5) 写文件
fs.writeFileSync('index.html', newSrc);
console.log('\\nFile size before:', before, 'after:', newSrc.length, 'diff:', newSrc.length - before);

// 6) JS 语法验证
try {
  new Function(newSrc);
  console.log('✓ JS syntax OK');
} catch (e) {
  console.log('✗ JS ERR:', e.message);
}

// 7) 验证 section 物理顺序（用字符串位置比较）
const sections = ['section-treemap','section-overview','section-prosperity','section-macro',
  'section-demand-chain','section-upstream','section-midstream','section-fourq',
  'section-decision','section-holding','section-plain','section-meta'];
const positions = sections.map(id => ({ id, idx: newSrc.indexOf('id="' + id + '"') }));
positions.sort((a, b) => a.idx - b.idx);
console.log('\\n=== 移位后 Section 物理顺序（按渲染代码位置）===');
positions.forEach(p => console.log(`  ${p.idx}\t${p.id}`));