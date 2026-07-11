const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const m = html.match(/<script>\s*\n\s*\/\/ ={5,}\n\/\/ DATA LAYER[\s\S]+?<\/script>/);
if (!m) {
  // 退路：取第二个 <script> 块（即主 inline script）
  const all = [...html.matchAll(/<script>([\s\S]+?)<\/script>/g)];
  if (all.length < 2) { console.log('NO_MATCH_AND_FALLBACK_FAIL'); process.exit(1); }
  var code = all[1][1];
  console.log('FALLBACK_USED');
} else {
  var code = m[0].replace(/^<script>/, '').replace(/<\/script>$/, '');
}
try {
  new Function(code);
  console.log('SYNTAX_OK', code.length, 'chars');
} catch (e) {
  console.log('SYNTAX_ERR', e.message);
  process.exit(1);
}

// 13 链条加载
global.window = {};
const manifest = ['pcb','semi','ai-server','hbm','robotics','autonomous-driving','power-semi','ai-apps','cpo','solid-battery','low-altitude','commercial-aero','ai-full-chain'];
let loaded = 0;
for (const id of manifest) {
  try {
    require(path.join(ROOT, 'data', id + '.js'));
    loaded++;
  } catch (e) {
    console.log('LOAD_FAIL', id, e.message);
  }
}
console.log('LOADED', loaded, '/', manifest.length);
console.log('CHAINS', Object.keys(global.window.CHAINS).join(','));
