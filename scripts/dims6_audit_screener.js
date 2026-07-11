// scripts/dims6_audit_screener.js
//
// §6.16 dims6Audit 体检脚本 · commit 6.78 后配套工具
//
// 目的:
//   - 一次性扫描 37 只 PCB 股票(不含 300522 概念票)的所有 score=5 维度
//   - 按 §6.16 第 2 条 A/B 类关键指标 + 长度阈值筛选"疑似不达标"维度
//   - 输出排序候选清单(高优先级在前),便于人工定向复核
//
// 关联上下文:
//   - §6.16 (CLAUDE.md:928) 立 4 条硬约束,本次脚本检测第 1+2+4 条:
//     · 第 1 条:覆盖所有 score=5 维度(本脚本扫描范围)
//     · 第 2 条:reason 必须含 A 类(全球≤3 家 + 认证≥18 月)或 B 类(卡口转移)关键论据
//     · 第 4 条:reason 含"estimate"等占位符 + score=5 是显式禁止的情况
//   - §11.11 (CLAUDE.md) 暂缓全面推进,但保留本体检脚本作为轻量级工具
//   - 300395 dims6Audit 完整 audit 后,本次扫描以参考其 reason 长度(400-750 字)作为基准
//
// 阈值设计(实测体感):
//   - score=5 维度 reason ≥ 400 字 → 通常有充分 A/B 类论据(参考 300395 完整 audit)
//   - reason < 200 字 → 红旗(严重过短,几乎不可能含 5 分硬指标)
//   - reason 200-400 字 → 黄灯(需要人工复核是否论据充实)
//   - 含占位符("estimate" / "待补" / "TODO" 等)→ 红旗(§6.16 第 4 条禁止)
//
// 副作用:无。脚本只读 scans + 输出候选清单,不修改任何数据文件。

'use strict';

const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const PCB_38 = [
  '000657','001389','002080','002384','002436','002463','002636','002913','002916','002938',
  '300179','300395','300476','301150','301200','301217','301377','301511',
  '600110','600176','600183','601208',
  '603002','603186','603228','603256','603519','603650','603920','603936',
  '605006','605589',
  '688183','688300','688388','688630','688700',
];
const FORMAL_37 = PCB_38.filter(c => c !== '300522');

// §6.16 第 2 条关键论据关键词
const KEYWORDS_A_HARD = [
  '全球≤3 家', '全球≤3家', '全球前三', '全球前 3', '全球前3',
  '全球唯一', '国内唯一', '国内前三', '国内前 3', '国内前3',
  '全球第一', '全球第三', '前 3 家', '前3家', '前 3', '前 2 家', '前2家',
];
const KEYWORDS_A_CYCLE = [
  '认证≥18 月', '认证≥18月', '认证 18 月', '认证 18 月', '认证 ≥18 月',
  '18-24 月', '18-24 月', '18-24月',
  '认证 ≥18 月', '认证周期 18', '认证周期≥18',
  '认证壁垒 6-18 月', '认证 6-18', '认证壁垒 ≥18',
  '≥18 月', '≥18 月 认证', '≥18 月认证',
];
const KEYWORDS_B = [
  '卡口转移', '卡口 已 转移', '卡口已转移', '卡口 转移',
  '卡口转 移至', '卡口 转移至',
  '加工端 已有', '加工端已有', '加工端 N 家', '加工端多家', '加工端 多家',
  '加工端 ≥', '加工端 ≥5 家', '加工端 ≥5 家',
  '上游 卡口', '上游卡口', '上游 卡口逻辑',
  '转移到 上游', '转移到上游', '卡口转移至上游', '卡口转移到上游',
  '转移到上游', '卡口 转移到 上游',
];

// ============ 配置 ============
// 占位符 pattern 精确化(避免误判合法 tier/position 字段值表述)
//   只匹配"estimate 作为数据/字段内容的占位符":
//   - ❌ 不匹配 tier='estimate'(字段值)
//   - ❌ 不匹配 (estimate)(字段类型标注)
//   - ❌ 不匹配 (estimate→L4)(commit 元注释引用)
//   - ✅ 匹配 "estimate 待核 / 暂无 / 数据为 estimate"
const PLACEHOLDER_PATTERNS = [
  // estimate 紧跟"未核实/待核/占位/暂无/无值"
  /estimate\s*[,，、。;；]?\s*(?:待核|未核|占位|暂无|无数据|未填|无值)/i,

  // "数据/字段内容/字段值/取值" 后是 estimate(数据描述语境)
  /(?:数据|字段内容|字段值|取值|本字段|具体\s*[\d一二三四五六七八九十]*\s*个?)\s*[:是为的]?\s*estimate/i,

  // "估计" 作动词("估计本字段""估计占比")
  /估计\s*(?:本|此)\s*(?:字段|数据|占比|数值|情况)/i,

  // 其他常见占位符
  /\b待补\b/,
  /\b待人工核实\b/, /\b待人工审\b/, /\b待人工\b/,
  /\bTODO\b/, /\bFIXME\b/, /\bTBD\b/,
  /\b占位\b/, /\b占位符\b/, /\b待填写\b/, /\b待确认\b/,
  /\b未填\b/, /\b未补\b/, /\b未完成\b/, /\b未核\b/,
  /\bnot verified\b/i, /\bunknown\b/i,
];

// §6.16 P2 检测:barrier 维度认证周期是否量化
//   只查 barrier + score=5 的维度(其他 dim 不强制)
//   "长/较长/长周期"等定性词有,但缺"X 月"数字 → P2
const CYCLE_QUANTIFIED_PATTERNS = [
  /\d+\s*个?月/,                          // "18 月" "18 个月"
  /\d+-\d+\s*月/,                          // "6-18 月"
  /认证\s*\d+\s*月/,                       // "认证 18 月"
  /≥\s*\d+\s*月/,                          // "≥ 18 月"
  /超过\s*\d+\s*月/,                        // "超过 18 月"
  /超\s*\d+\s*月/,                          // "超 18 月"
  /长[达至]?\s*\d+\s*月/,                    // "长达 18 月"
];
const CYCLE_QUALITATIVE_KEYWORDS = [
  '认证周期长', '周期长', '较长', '周期较长',
  '长周期', '验证周期长', '认证需时', '认证壁垒较长', '认证壁垒高',
];

const LENGTH_HIGH_RISK = 200;  // < 200 字:红旗,严重过短
const LENGTH_MEDIUM_RISK = 400; // 200-400 字:黄灯,需复核

// ============ 加载 pcb.manual.js ============
function loadPcbManual() {
  const file = path.resolve(__dirname, '..', 'data', 'pcb.manual.js');
  const c = fs.readFileSync(file, 'utf-8');
  const lines = c.split('\n');
  // IIFE 起始 line 31 (0-indexed: 30),line 1539 是关闭
  const iife = lines.slice(30).join('\n');
  const vm = require('vm');
  const ctx = { window: { PCB_MANUAL: {} } };
  vm.createContext(ctx);
  vm.runInContext(iife, ctx);
  return ctx.window.PCB_MANUAL;
}

// ============ 检测函数 ============
function checkPlaceholder(reason) {
  const matched = [];
  for (const p of PLACEHOLDER_PATTERNS) {
    if (p.test(reason)) matched.push(p.toString().slice(0, 50));
  }
  return matched;
}

function checkCycleQuantified(reason) {
  // 只针对 barrier 维度调用
  const quantified = CYCLE_QUANTIFIED_PATTERNS.some(re => re.test(reason));
  const qualitative = CYCLE_QUALITATIVE_KEYWORDS.some(kw => reason.includes(kw));
  if (!quantified && qualitative) {
    return {
      flag: true,
      reason: '只有定性描述(长/较长/长周期),缺失具体认证周期数字(如 "18 个月")',
    };
  }
  return { flag: false, reason: '' };
}

function checkAClass(reason) {
  const hardHit = KEYWORDS_A_HARD.filter(kw => reason.includes(kw));
  const cycleHit = KEYWORDS_A_CYCLE.filter(kw => reason.includes(kw));
  // A 类:硬指标(全球/国内唯一等)+ 认证周期(18 月/6-18 月)同时存在
  return { passes: hardHit.length > 0 && cycleHit.length > 0, hardHit, cycleHit };
}

function checkBClass(reason) {
  const hits = KEYWORDS_B.filter(kw => reason.includes(kw));
  return { passes: hits.length > 0, hits };
}

function classifyFlag(d) {
  const flags = [];
  const reason = d.reason || '';
  const len = reason.length;

  // Priority 0: 占位符违规(最高优先级,§6.16 第 4 条禁止)
  const placeholders = checkPlaceholder(reason);
  if (placeholders.length > 0) {
    flags.push({
      priority: 'P0-占位符违规',
      trigger: `占位符命中: ${placeholders.slice(0, 2).join('; ')}`,
    });
  }

  // Priority 1: reason 长度严重过短(红旗,< 200)
  if (len < LENGTH_HIGH_RISK) {
    flags.push({
      priority: 'P1-红旗:严重过短',
      trigger: `reason 长度 = ${len} 字(< ${LENGTH_HIGH_RISK} 红旗阈值)`,
    });
  } else if (len < LENGTH_MEDIUM_RISK) {
    // Priority 2: 黄灯(< 400)
    flags.push({
      priority: 'P2-黄灯:可能不达标',
      trigger: `reason 长度 = ${len} 字(< ${LENGTH_MEDIUM_RISK} 黄灯阈值)`,
    });
  }

  // P2-2 (新增·认证周期未量化):只对 barrier + score=5 检查
  if (d.key === 'barrier') {
    const cycle = checkCycleQuantified(reason);
    if (cycle.flag) {
      flags.push({
        priority: 'P2-认证周期未量化',
        trigger: cycle.reason,
      });
    }
  }

  // Priority 3: A/B 类关键论据缺失(优先级比 P1/P2 低,但与长度无关)
  const a = checkAClass(reason);
  const b = checkBClass(reason);
  if (!a.passes && !b.passes) {
    flags.push({
      priority: 'P3-疑似不达标',
      trigger: '既无 A 类(全球/国内唯一 + 认证周期 ≥18 月)也无 B 类(卡口转移)关键论据',
    });
  }

  return flags;
}

function previewReason(reason) {
  return reason.slice(0, 100).replace(/\n/g, ' ');
}

// ============ 主流程 ============
function main() {
  const ch = loadPcbManual();
  console.log('=== §6.16 dims6Audit 体检脚本 · 扫描 37 只 PCB 正式股票 ===\n');
  console.log('基准:300395 完整 audit 字段(reason 长度 400-750 字)+ §6.16 第 2 条 A/B 类关键论据\n');

  const allScore5 = [];
  for (const code of FORMAL_37) {
    const stock = ch.stocks[code];
    if (!stock || !stock.dims6) continue;
    for (const d of stock.dims6) {
      if (d.score === 5) {
        const flags = classifyFlag(d);
        allScore5.push({
          code, name: stock.name, dim: d.key,
          score: d.score, tier: d.tier, trend: d.trend,
          reasonLen: (d.reason || '').length,
          reason: d.reason || '',
          flags,
        });
      }
    }
  }

  console.log(`扫描范围:${FORMAL_37.length} 只股票`);
  console.log(`score=5 维度总数:${allScore5.length}\n`);

  // 优先级分类
  const buckets = {
    'P0-占位符违规': [],
    'P1-红旗:严重过短': [],
    'P2-黄灯:可能不达标': [],
    'P2-认证周期未量化': [],
    'P3-疑似不达标': [],
  };
  for (const item of allScore5) {
    for (const f of item.flags) {
      if (buckets[f.priority]) buckets[f.priority].push({...item, ...f});
    }
  }
  // 同时给"无 flags 的通过项"
  const passing = allScore5.filter(i => i.flags.length === 0);

  console.log('=== 扫描统计 ===');
  for (const [k, v] of Object.entries(buckets)) {
    console.log(`  ${k}: ${v.length} 条`);
  }
  console.log(`  通过(无 flags):${passing.length} 条`);
  console.log(`  汇总:13 条 score=5 中,需人工审查=${13 - passing.length} 条,通过=${passing.length} 条\n`);

  // 优先级排序输出
  console.log('=== 完整候选清单(按优先级排序)===');

  const priorityOrder = ['P0-占位符违规', 'P1-红旗:严重过短', 'P2-黄灯:可能不达标', 'P2-认证周期未量化', 'P3-疑似不达标'];

  for (const prio of priorityOrder) {
    const items = buckets[prio];
    if (items.length === 0) continue;
    console.log(`\n[${prio}] 共 ${items.length} 条`);
    items.forEach((it, i) => {
      console.log(`\n  #${i + 1} ${it.code} ${it.name} · ${it.dim}`);
      console.log(`     score=${it.score} / trend=${it.trend} / tier=${it.tier} / reason.length=${it.reasonLen}`);
      console.log(`     触发: ${it.trigger}`);
      console.log(`     preview: "${previewReason(it.reason)}..."`);
    });
  }

  console.log('\n=== 通过(score=5 且无 flags)===');
  if (passing.length === 0) {
    console.log('  无');
  } else {
    passing.forEach((it, i) => {
      console.log(`  ${i + 1}. ${it.code} ${it.name} · ${it.dim} (reason.length=${it.reasonLen})`);
    });
  }

  console.log('\n=== 总结 ===');
  console.log(`扫描维度总数:${allScore5.length}`);
  console.log(`需人工复核(任何 P0/P1/P2/P3):${allScore5.length - passing.length} 条`);
  console.log(`无需复核(通过):${passing.length} 条`);
  console.log(`  P0 占位符违规:        ${buckets['P0-占位符违规'].length}`);
  console.log(`  P1 红旗严重过短:      ${buckets['P1-红旗:严重过短'].length}`);
  console.log(`  P2 黄灯可能不达标:    ${buckets['P2-黄灯:可能不达标'].length}`);
  console.log(`  P2 认证周期未量化:    ${buckets['P2-认证周期未量化'].length}`);
  console.log(`  P3 疑似不达标:        ${buckets['P3-疑似不达标'].length}`);
}

main();
