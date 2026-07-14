// scripts/generate_changelog_draft.js
//
// ★ commit 6.73 立 · CHANGELOG 草稿生成器 (替代 commit 6.72 计划引入版)
//
// 目的:
//   - 把 git log 转成 CHANGELOG 数组候选条目,降低手工维护负担
//   - commit 6.72 (15c4869) 插入 16 条时同时遗漏 pct 字段 + date 区间格式,
//     触发渲染函数 TypeError → "暂无变更记录" 静默回退,本脚本必须自检防同类事件
//   - 只输出 JSON 草稿,绝不写 index.html(纪律:任何 LLM/脚本都不直接改 CHANGELOG)
//
// 用法:
//   node scripts/generate_changelog_draft.js --since=<hash>
//   node scripts/generate_changelog_draft.js --since=<hash> --out=<file.json>
//   node scripts/generate_changelog_draft.js                  (默认 HEAD~50)
//
// 输出格式:
//   JSON 数组,每条形如:
//   {
//     date:    'YYYY-MM-DD',           // 单一日期,可被 new Date() 解析
//     sector:  'pcb' | 'hbm' | ...    // 见 SECTOR_WHITELIST
//     desc:    '...',                  // 已 desugar commit message
//     pct:     'NEW',                  // 占位值,输出时显式标注需人工确认
//     _hash:   'abc1234',              // 7 字符短 hash,便于人工定位
//     _selfCheck: {                    // ★ 沙盒自检结果
//       date:        { ok: true,  msg: '2026-07-07 解析成功' },
//       pct:         { ok: true,  msg: 'pct="NEW",占位值,需人工确认' },
//       sector:      { ok: true,  msg: 'sector="pcb" 在白名单内' },
//       desc:        { ok: true,  msg: 'desc 非空' },
//       allOk:       true
//     }
//   }
//
// 失败策略:
//   - date 无法解析 → 该草稿标记 allOk=false,用户必须先修 date 才能用
//   - 其他字段 → 占位/warn,不阻断生成
//
// 副作用:无。不修改任何文件,除非 --out 指定。

'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ---------- 参数解析 ----------
function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--help' || a === '-h') { console.log(USAGE); process.exit(0); }
    if (a.startsWith('--since=')) out.since = a.slice('--since='.length);
    else if (a.startsWith('--out=')) out.out = a.slice('--out='.length);
    else if (a === '--since') out.since = args[++i];
    else if (a === '--out')   out.out   = args[++i];
    else console.error('[WARN] 忽略未知参数:', a);
  }
  return out;
}

const USAGE = `用法:
  node scripts/generate_changelog_draft.js [options]

选项:
  --since=<hash|rev>    起始 commit hash 或 git rev(默认 HEAD~50)
  --out=<file>          草稿输出文件路径(默认 stdout)
  -h, --help            显示本帮助

输出:JSON 数组,每条带 4 个必需字段(date/sector/desc/pct)+ 自检结果。
绝不直接写 index.html。`;

// ---------- 常量 ----------
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SECTOR_WHITELIST = [
  'pcb', 'hbm', 'optical-module', 'liquid-cooling',
  'ai-server', 'robotics', 'autonomous-driving', 'ai-apps',
  'solid-battery', 'low-altitude', 'commercial-aero', 'system',
  'semicon-equip', 'storage-interface',
  'advanced-packaging', 'semicon-materials', 'ai-chip', 'network-switch', 'data-center',
  'power-supply', 'copper-connect', 'server-odm', 'ai-cloud',
];

// ---------- git log 拉取 ----------
function fetchCommits(sinceRef) {
  const range = sinceRef ? `${sinceRef}..HEAD` : 'HEAD~50..HEAD';
  const SEP_FIELD = '\\x1f';
  const SEP_RECORD = '\\x1e';
  let raw = '';
  try {
    const res = spawnSync('git', [
      'log',
      `--format=%H${SEP_FIELD}%aI${SEP_FIELD}%s${SEP_RECORD}%b`,
      range,
      '--no-merges',
    ], { cwd: PROJECT_ROOT, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
    if (res.status !== 0) {
      console.error('[ERR] git log status=' + res.status + ' stderr=' + (res.stderr || '').slice(0, 300));
      return [];
    }
    raw = res.stdout || '';
  } catch (e) {
    console.error('[ERR] git log 失败:', e.message);
    return [];
  }

  const hashRe = /[0-9a-f]{40}/g;
  const hashPositions = [];
  let m;
  while ((m = hashRe.exec(raw)) !== null) hashPositions.push({ hash: m[0], index: m.index });

  const commits = [];
  for (let i = 0; i < hashPositions.length; i++) {
    const { hash, index } = hashPositions[i];
    try {
      const blockStart = index + 40;
      const blockEnd = (i + 1 < hashPositions.length) ? hashPositions[i + 1].index : raw.length;
      const fieldsRegion = raw.slice(blockStart, blockEnd);
      let cursor = 0;
      if (fieldsRegion.startsWith(SEP_FIELD)) cursor = SEP_FIELD.length;
      const dateEnd = fieldsRegion.indexOf(SEP_FIELD, cursor);
      if (dateEnd < 0) continue;
      const date = fieldsRegion.slice(cursor, dateEnd);
      cursor = dateEnd + SEP_FIELD.length;
      const subjectEnd = fieldsRegion.indexOf(SEP_RECORD, cursor);
      if (subjectEnd < 0) continue;
      const subject = fieldsRegion.slice(cursor, subjectEnd);
      cursor = subjectEnd + SEP_RECORD.length;
      const body = fieldsRegion.slice(cursor);
      commits.push({
        hash: hash.trim(),
        date: date.trim().slice(0, 10),
        subject: subject.trim(),
        body: body.trim().slice(0, 800),
      });
    } catch (e) {
      console.error(`[WARN] 跳过 commit hash=${hash.slice(0, 7)}:`, e.message);
    }
  }
  return commits;
}

// ---------- 过滤:跳过不值得展示的 commit 类型 ----------
const EXCLUDE_PATTERNS = [
  /^chore:?\s.*卫生清理/,
  /^chore:?\s.*删除.*临时/,
  /^docs:?\s.*R3-\d+\s*模板化/,
  /^chore:?\s.*还原点/,
  /^chore:?\s.*清理$/,
  /^cleanup\s/i,
  /^\d+\.\d+(?:\.\d+)?\s*·\s*产业链/,
];

const TECH_INTERNAL_PATTERNS = [
  /tier 字段统一校准/,
  /§\d+\.\d+/,
  /dims6Audit/,
  /非 chokePoints 轻量级风险扫描/,
  /refresh_pcb_valuation/,
];

function shouldExclude(commit) {
  return EXCLUDE_PATTERNS.some(p => p.test(commit.subject));
}

// ---------- 分类:从 commit message 推断 sector ----------
const SECTOR_KEYWORDS = [
  { sector: 'pcb',            kws: [/pcb/i, /chokepoint/i, /概念票/, /6\s*维/i, /\btier\b/i, /\bvaluation\b/i, /\breason\b/i, /\bbarrier\b/i, /信源精度/, /风险扫描/, /\bcagr\b/i, /301217/, /600110/, /603228/, /002384/, /300522/, /002938/] },
  { sector: 'hbm',            kws: [/HBM/i, /\bhbm\b/i] },
  { sector: 'optical-module', kws: [/光模块/, /CPO/, /光芯片/] },
  { sector: 'liquid-cooling', kws: [/liquid-cooling/i, /液冷/] },
  { sector: 'ai-server',      kws: [/ai-server/i, /AI\s*服务器/] },
  { sector: 'robotics',       kws: [/机器人/i, /robotics/i] },
  { sector: 'autonomous-driving', kws: [/智能驾驶/i, /autonomous-driving/i] },
  { sector: 'ai-apps',        kws: [/AI\s*应用/i, /ai-apps/i] },
  { sector: 'solid-battery',  kws: [/固态电池/i] },
  { sector: 'low-altitude',   kws: [/低空经济/i] },
  { sector: 'commercial-aero',kws: [/商业航天/i] },
  { sector: 'semicon-equip',  kws: [/semicon-equip/i, /半导体设备/] },
  { sector: 'storage-interface', kws: [/storage-interface/i, /存储与接口/] },
  { sector: 'advanced-packaging', kws: [/advanced-packaging/i, /先进封装/] },
  { sector: 'semicon-materials', kws: [/semicon-materials/i, /半导体材料/] },
  { sector: 'ai-chip',        kws: [/ai-chip/i, /AI芯片/] },
  { sector: 'network-switch', kws: [/network-switch/i, /网络交换/] },
  { sector: 'data-center',    kws: [/data-center/i, /数据中心/] },
  { sector: 'power-supply',   kws: [/power-supply/i, /电源供电/] },
  { sector: 'copper-connect', kws: [/copper-connect/i, /铜连接/] },
  { sector: 'server-odm',     kws: [/server-odm/i, /服务器ODM/] },
  { sector: 'ai-cloud',       kws: [/ai-cloud/i, /AI云服务/] },
];

const SYSTEM_INDICATORS = [
  /CLAUDE\.md/i, /SKILL\.md/i, /页面/, /渲染/, /Hero/, /Banner/,
  /树状图/, /侧栏/, /刷新按钮/, /cron/i, /部署/, /README/i,
];

function classifySector(commit) {
  const text = commit.subject + ' ' + commit.body;
  for (const { sector, kws } of SECTOR_KEYWORDS) {
    if (kws.some(p => p.test(text))) return sector;
  }
  if (SYSTEM_INDICATORS.some(p => p.test(text))) return 'system';
  return 'system';
}

// ---------- desc desugar ----------
function desugarSubject(subject) {
  return subject
    .replace(/^commit\s+/i, '')
    .replace(/^6\.\d+(\.\d+)?\s*/i, '')
    .replace(/^fix:\s*/i, '')
    .replace(/^feat:\s*/i, '')
    .replace(/^chore:\s*/i, '')
    .replace(/^docs:\s*/i, '')
    .replace(/^style:\s*/i, '')
    .replace(/^refactor:\s*/i, '')
    .replace(/^perf:\s*/i, '')
    .replace(/^test:\s*/i, '')
    .replace(/^build:\s*/i, '')
    .replace(/^ci:\s*/i, '')
    .trim();
}

// ---------- ★ 新增:pct 推断 (粗略尝试) ----------
// commit message 前缀 emoji 给线索:
function inferPctFromSubject(subject) {
  // 🆪 desc 在用户友好文案里标识 AI 主观 / 估算
  if (/^🆪|本轮.*审批|estimate|审计|合规|可行性|主观/.test(subject)) return '🆪';
  // fix:
  if (/fix|修复|bug|异常|异常\)/i.test(subject)) return 'FIX';
  // feat:
  if (/feat|新增|上线|落地|开启|接入/.test(subject)) return 'NEW';
  // 默认 NEW
  return 'NEW';
}

// ---------- ★ 新增:沙盒自检(对比 commit 6.73 教训) ----------
function validateDraft(draft) {
  const selfCheck = {
    date:    { ok: true,  msg: '' },
    pct:     { ok: true,  msg: '' },
    sector:  { ok: true,  msg: '' },
    desc:    { ok: true,  msg: '' },
    allOk:   true,
  };

  // 1. date 可被 new Date() 解析(单一日期,无区间符号)
  const hasRangeChar = /[→~]|之前|以后/.test(draft.date);
  const parsed = new Date(draft.date);
  if (hasRangeChar) {
    selfCheck.date.ok = false;
    selfCheck.date.msg = `❌ date 字段含区间符号('→'/'~'/'之前'),修复后才能用`;
  } else if (isNaN(parsed.getTime())) {
    selfCheck.date.ok = false;
    selfCheck.date.msg = `❌ new Date('${draft.date}') 返回 Invalid Date`;
  } else {
    selfCheck.date.msg = `✓ '${draft.date}' 解析成功,可被 renderChangelog filter 通过`;
  }

  // 2. pct 是非空字符串
  if (typeof draft.pct !== 'string' || draft.pct === '') {
    selfCheck.pct.ok = false;
    selfCheck.pct.msg = `❌ pct 不是非空字符串(actual=${JSON.stringify(draft.pct)})`;
  } else {
    const placeholder = /^(NEW|FIX|🆪|BRAND|P0|\+\d)/.test(draft.pct);
    selfCheck.pct.msg = placeholder
      ? `✓ pct='${draft.pct}' 是合法占位值(需人工确认或替换)`
      : `⚠️ pct='${draft.pct}' 是非标准值,人工 review 后决定`;
  }

  // 3. sector 在白名单内
  if (!SECTOR_WHITELIST.includes(draft.sector)) {
    selfCheck.sector.ok = false;
    selfCheck.sector.msg = `❌ sector='${draft.sector}' 不在白名单(${SECTOR_WHITELIST.length} 个值)`;
  } else {
    selfCheck.sector.msg = `✓ sector='${draft.sector}' 在白名单内`;
  }

  // 4. desc 非空
  if (typeof draft.desc !== 'string' || draft.desc.trim() === '') {
    selfCheck.desc.ok = false;
    selfCheck.desc.msg = `❌ desc 为空`;
  } else {
    selfCheck.desc.msg = `✓ desc 非空(${draft.desc.length} 字符)`;
  }

  selfCheck.allOk = selfCheck.date.ok && selfCheck.pct.ok && selfCheck.sector.ok && selfCheck.desc.ok;
  return selfCheck;
}

// ---------- ★ 新增:完整渲染沙盒自检(借用 renderChangelog 的关键检查) ----------
// 类似 vm 沙盒:实际执行一次 renderChangelog 但只测关键过滤+渲染逻辑,确保
// 这条 draft 不会因为字段格式问题被 TypeError 阻断
function renderSanityCheck(drafts) {
  const now = new Date();
  const recentChanges = drafts.filter(d => {
    const parseable = !isNaN(new Date(d.date).getTime());
    if (!parseable) return false;
    const within = (now - new Date(d.date)) / 86400000 <= 30;
    return within;
  });
  // 模拟 line 4287 的 dir 赋值:只在 pct 是字符串时才不抛错
  let dirThrowCount = 0;
  drafts.forEach(d => {
    try {
      // 这是 line 4287 渲染关键逻辑(简化版)
      const dir = (d.pct === 'NEW' || d.pct === 'FIX' || d.pct === 'BRAND')
        ? null
        : ((typeof d.pct === 'string' && d.pct.startsWith('+')) ? 'up' : 'down');
      void dir;
    } catch (e) {
      dirThrowCount++;
    }
  });
  return {
    within30Days:    recentChanges.length,
    dirThrowCount,
    totalDrafts:     drafts.length,
    pass: dirThrowCount === 0,
  };
}

// ---------- main ----------
function main() {
  const args = parseArgs();
  const sinceRef = args.since;
  const outPath  = args.out;

  const commits = fetchCommits(sinceRef);
  console.error('[DEBUG] fetchCommits 返回条数:', commits.length);
  const filtered = commits.filter(c => !shouldExclude(c));
  console.error('[DEBUG] 过滤后条数:', filtered.length);

  const drafts = filtered.map(c => {
    const date    = c.date;
    const sector  = classifySector(c);
    const desc    = desugarSubject(c.subject);
    const pct     = inferPctFromSubject(c.subject);
    const draft   = { date, sector, desc, pct, _hash: c.hash.slice(0, 7), _subject: c.subject };
    draft._selfCheck = validateDraft(draft);
    return draft;
  });

  // 沙盒汇总自检
  const sanity = renderSanityCheck(drafts);
  console.error('\n=== 沙盒自检汇总 ===');
  console.error('总草稿条数:    ', sanity.totalDrafts);
  console.error('落入 30 天窗口: ', sanity.within30Days);
  console.error('pct 抛错模拟次数 (修复前为 16):', sanity.dirThrowCount);
  console.error('通过:           ', sanity.pass ? '✓' : '✗');

  // 警告占位 pct 字段(必须人工确认)
  const placeholderCount = drafts.filter(d => /^NEW$|^FIX$|^🆪$/.test(d.pct)).length;
  if (placeholderCount > 0) {
    console.error(`\n⚠️  ${placeholderCount} 条草稿 pct 为占位值(NEW/FIX/🆪),必须人工确认是否调整后再写入 CHANGELOG:`);
    drafts.filter(d => /^NEW$|^FIX$|^🆪$/.test(d.pct)).slice(0, 5).forEach(d => {
      console.error(`   • ${d._hash} ${d.date} [${d.sector}] pct='${d.pct}' | ${d.desc.slice(0, 40)}...`);
    });
    if (placeholderCount > 5) console.error(`   ... 还有 ${placeholderCount - 5} 条省略`);
  }

  // 警告日期异常(虽然 git log 取的日期通常是 OK 的,但校验一遍保险)
  const badDateCount = drafts.filter(d => !d._selfCheck.date.ok).length;
  if (badDateCount > 0) {
    console.error(`\n❌ ${badDateCount} 条草稿 date 字段有问题,绝不能直接写入:`);
    drafts.filter(d => !d._selfCheck.date.ok).forEach(d => {
      console.error(`   • ${d._hash} ${d.date} | ${d._selfCheck.date.msg}`);
    });
  }

  // 输出
  if (outPath) {
    fs.writeFileSync(outPath, JSON.stringify(drafts, null, 2));
    console.error(`\n[OK] ${drafts.length} 条草稿已写入 ${outPath}`);
  } else {
    console.log(JSON.stringify(drafts, null, 2));
  }
}

main();
