const fs = require('fs');
const src = fs.readFileSync('index.html', 'utf8');

// 找 section-meta 的渲染起始位置
const metaIdx = src.indexOf('id="section-meta"');
console.log('section-meta 渲染起始位置:', metaIdx);

// 找每个 section 渲染块的位置
const sections = [
  'section-treemap','section-overview','section-prosperity','section-macro',
  'section-demand-chain','section-upstream','section-midstream','section-fourq',
  'section-decision','section-holding','section-plain','section-meta'
];
const positions = sections.map(id => {
  const pat = 'id="' + id + '"';
  const idx = src.indexOf(pat);
  return { id, idx };
});
positions.sort((a, b) => a.idx - b.idx);
console.log('\n=== Section 物理顺序（按 index.html 渲染代码位置）===');
positions.forEach(p => {
  console.log(`  ${p.idx}\t${p.id}`);
});

// 找 section-meta 前后最近的 section
const metaPos = positions.find(p => p.id === 'section-meta');
const before = positions.filter(p => p.idx < metaPos.idx).pop();
const after = positions.find(p => p.idx > metaPos.idx);
console.log(`\nsection-meta 在 ${before.id} 之后，${after ? after.id : '末尾'} 之前`);

// section-meta 内部的字段名
const metaContent = src.slice(metaPos.idx, metaPos.idx + 2000);
const fields = [...metaContent.matchAll(/<h4[^>]*>([^<]+)<\/h4>/g)];
console.log('\n=== section-meta 内容标题 ===');
fields.forEach(m => console.log('  ', m[1]));