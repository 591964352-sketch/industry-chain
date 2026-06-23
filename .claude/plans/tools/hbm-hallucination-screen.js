// hbm-hallucination-screen.js
// 用途：对豆包返回内容做幻觉筛查（HBM 链专用）
// 输入：豆包返回文本（方案 G 7 段式）+ stock code + stock name
// 输出：风险评分 + 可疑事件清单 + 验证状态
// 教训（2026-06-21）：002288 超华已退市但被纳入 P1 流程，
//                   豆包返回大量 2026 幻觉事件（HVLP 铜箔/玉林基地/
//                   宁德时代比亚迪等）被采信为 down 判定依据。
// 本脚本设计为通用防御——任何 stock 都可能被豆包编造内容。
// 复用自 pcb-hallucination-screen.js（2026-06-23 HBM R1 批 1），
//   改 5 处：require 路径 / CHAINS 键名 / knownCustomers 客户表
//        / knownDelistDates 保留 002288 / 测试用例替换为 HBM 4 只代表股。

global.window = {};
require('d:/乌龟/产业链全景/data/hbm.js');
const c = global.window.CHAINS.hbm;

// ============ 配置：阈值与模式 ============

const CONFIG = {
  // Layer 2 阈值（2026-06-22 R3-15+ 6 样本校准：超华 13 / 东材 23 / 宏昌 21 / 彤程 25 / 圣泉 21 / 世名 16）
  // 旧值 15/20 基于超华单案例倒推（~10 项幻觉事件），但正常 stock 在方案 G 7 段式下天然返回 16-25 项
  // ⚠️ 本次样本量仍较小（1 异常 + 5 正常 = 6 样本），未来需追加样本复核
  eventDensityWarning: 30,    // >30 警告（6 样本校准后）
  eventDensityCritical: 40,   // >40 严重（6 样本校准后）

  // 单段落事件数阈值（同批次校准：超华 ~4 / 正常 4-6）
  paragraphDensityWarning: 7, // >7 警告（6 样本校准后）
  paragraphDensityCritical: 12,// >12 严重（6 样本校准后）

  // Layer 1 触发关键词
  anomalyKeywords: ['退市', '停牌', '已退', '暂停上市', 'ST'],

  // Layer 3 数字模式（核心卡口指标）
  // R3-15+ 修复:所有数字模式加 (?<![\d.]) 前置 + (?![\d]) 后置
  //   防止 \d+ 回溯匹配出子串（如 "4008.97 万元" 拆成 "008.97 万元"）
  // R3-18 修复:digits 计数逻辑收紧
  //   旧版 5 正则含吨/亿/万米/良率/倍/分位 → 豆包返回内容频繁出现 5000 吨/100 万米/
  //   良率 70-80%/PE-TTM 100 倍 等描述性数字,hbm.js 中未必有原文锚定,导致 R3-17 批 1+批 2
  //   全部 34 只 stock 触发 Layer 3 警告(false positive)
  //   修复:仅保留"会变的关键市场指标"——市占率/CAGR/缺口率/国产化率 + PE-TTM 倍数分位
  //   排除:单位词(吨/亿/万元/万米/万张/万平/μm)、良率、年份季度(2026Q4/2025H1)、
  //        产品代号(M9/GB300/TPU4/H100)——通过主正则不匹配已隐式排除
  numberPatterns: [
    // ① 市占率/市占 + 百分号(核心卡口指标)
    /市占率?\s*(?<![\d.])\d+(?:\.\d+)?\s*%(?![\d])/g,
    // ② CAGR/缺口率/国产化率 + 百分号(broker 报告核心指标)
    /(?:CAGR|缺口率|国产化率)\s*(?<![\d.])\d+(?:\.\d+)?\s*%(?![\d])/g,
    // ③ PE-TTM/PB + 倍数/分位(估值核心指标)
    /PE-?TTM?\s*(?<![\d.])\d+(?:\.\d+)?\s*(?:倍|分位)(?![\d])/g,
    /PB\s*(?<![\d.])\d+(?:\.\d+)?\s*(?:倍|分位)(?![\d])/g
  ],

  // R3-18 新增:正面排除规则(命中后从数字列表剔除)
  excludePatterns: [
    // ① 产品代号(字母+数字+字母/数字,如 M9/GB300/TPU4/H100/B200)
    /\b[A-Z]+[A-Za-z]*\d+[A-Za-z0-9]*\b/g,
    // ② 年份季度(20\d{2}Q[1-4]/20\d{2}H[1-2])
    /20\d{2}[QH][1-4]/g
  ],

  // Layer 4 客户名识别关键词（HBM 产业链已知客户/对手/同业）
  knownCustomers: [
    // 海外本体
    'SK海力士', '海力士', 'SK hynix', '三星', 'Samsung', '美光', 'Micron',
    // 设备/材料海外寡头
    'Besi', 'ASMPT', '东京电子', 'TEL', '默克', 'Merck', '空气化工', 'APD',
    '泰瑞达', 'Teradyne', '爱德万', 'Advantest', '住友', 'Sumitomo', '昭和电工', 'Resonac',
    // 中游制造/封测
    '台积电', 'TSMC', '台积', 'CoWoS', 'CoPoS', '盛合晶微',
    // 国产卡口
    '长鑫', 'CXMT', '武汉新芯', 'YMTC', '华为', '昇腾', '海光', '寒武纪', 'AMD', 'NVIDIA', '英伟达',
    // A 股同业
    '雅克', '韩国先科', 'UP Chemical', '华海诚科', '拓荆', '北方华创', '中微', '华海清科',
    '联瑞', '壹石通', '飞凯', '德邦', '圣泉', '通富', '太极', '海太', '长电', '华天', '甬矽',
    '深科技', '长川', '华峰', '精测', '亚威', '赛腾', '安集', '鼎龙', '南大光电', '华特气体',
    '江波龙', '兆易', '佰维', '香农芯创', '沃格光电'
  ],

  // 时间窗口（18 个月）
  queryWindowMonths: 18,

  // 已知 stock 退市日期（可手动维护）
  // 002288 是 PCB 退市 case,保留作为全局防御
  knownDelistDates: {
    '002288': '2026-05-18'  // 超华科技（PCB 链·HBM 链未涉及·保留防御）
  }
};

// ============ Layer 1: stock 状态检测 ============

function checkStockStatus(code) {
  const status = {
    code,
    isDelisted: false,
    isSuspended: false,
    isST: false,
    delistDate: null,
    evidence: []
  };

  // 1. 检查 knownDelistDates
  if (CONFIG.knownDelistDates[code]) {
    status.isDelisted = true;
    status.delistDate = CONFIG.knownDelistDates[code];
    status.evidence.push('knownDelistDates: ' + status.delistDate);
  }

  // 2. 扫描 hbm.js 所有字段找退市/停牌标注
  function scanObject(obj, path) {
    if (!obj || typeof obj !== 'object') return;
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        const text = obj[key];
        for (const keyword of CONFIG.anomalyKeywords) {
          if (text.includes(keyword)) {
            status.evidence.push(path + '.' + key + ': "' + keyword + '" in "' + text.substring(0, 60) + '..."');
            if (keyword === '退市' || keyword === '已退') status.isDelisted = true;
            if (keyword === '停牌') status.isSuspended = true;
            if (keyword === 'ST') status.isST = true;
          }
        }
      } else if (typeof obj[key] === 'object') {
        scanObject(obj[key], path + '.' + key);
      }
    }
  }

  scanObject(c, 'CHAINS.hbm');

  // 3. 提取退市日期
  const datePattern = /\d{4}[-年]\d{1,2}[-月]?\d{0,2}[-日]?/g;
  for (const ev of status.evidence) {
    const match = ev.match(datePattern);
    if (match && !status.delistDate) {
      status.delistDate = match[0].replace(/[年月日]/g, '-').replace(/-$/, '');
    }
  }

  return status;
}

// ============ 解析豆包返回 ============

function parseDoubaoContent(content) {
  const sections = {};
  const sectionPattern = /【(\d)\.\s*([^】]+)】\s*([\s\S]*?)(?=【\d\.|###\s|$)/g;
  let match;
  while ((match = sectionPattern.exec(content)) !== null) {
    const num = match[1];
    const title = match[2].trim();
    const body = match[3].trim();
    sections['section' + num] = { title, body };
  }
  return sections;
}

// ============ 提取独立事件 ============

function extractEvents(sections) {
  const events = [];
  for (const key in sections) {
    const { title, body } = sections[key];
    const sentences = body.split(/[；;。]/).filter(s => s.trim().length > 5);
    for (const sentence of sentences) {
      events.push({
        section: title,
        text: sentence.trim(),
        date: extractDate(sentence)
      });
    }
  }
  return events;
}

function extractDate(text) {
  const datePattern = /\d{4}[-年]\d{1,2}(?:[-月]\d{1,2})?[-日]?/g;
  const matches = text.match(datePattern);
  if (matches && matches.length > 0) {
    return matches[0].replace(/[年月日]/g, '-').replace(/-$/, '');
  }
  return null;
}

// ============ Layer 2: 事件密度检测 ============

function checkEventDensity(events) {
  const findings = [];
  const totalEvents = events.length;

  if (totalEvents > CONFIG.eventDensityCritical) {
    findings.push({
      layer: 'Layer 2 - 事件密度',
      severity: '❌ 严重',
      detail: '总事件数 ' + totalEvents + ' > ' + CONFIG.eventDensityCritical + ' 阈值，疑似幻觉（超华案例：~10 项）',
      metric: { totalEvents: totalEvents, threshold: CONFIG.eventDensityCritical }
    });
  } else if (totalEvents > CONFIG.eventDensityWarning) {
    findings.push({
      layer: 'Layer 2 - 事件密度',
      severity: '⚠️ 警告',
      detail: '总事件数 ' + totalEvents + ' > ' + CONFIG.eventDensityWarning + ' 阈值，需核查',
      metric: { totalEvents: totalEvents, threshold: CONFIG.eventDensityWarning }
    });
  }

  const sectionCounts = {};
  for (const event of events) {
    // 修复 R3-15+ L2-段落误报：排除【5. 品类归属】【6. 未查到】【7. 信源清单】三段
    // 这三段是元数据，不是事实事件，不应计入段落事件密度
    if (event.section.includes('品类归属') || event.section.includes('未查到') || event.section.includes('信源清单')) continue;
    sectionCounts[event.section] = (sectionCounts[event.section] || 0) + 1;
  }
  for (const section in sectionCounts) {
    const count = sectionCounts[section];
    if (count > CONFIG.paragraphDensityCritical) {
      findings.push({
        layer: 'Layer 2 - 单段落密度',
        severity: '❌ 严重',
        detail: '【' + section + '】段落含 ' + count + ' 项事件 > ' + CONFIG.paragraphDensityCritical + ' 阈值',
        metric: { section: section, count: count, threshold: CONFIG.paragraphDensityCritical }
      });
    } else if (count > CONFIG.paragraphDensityWarning) {
      findings.push({
        layer: 'Layer 2 - 单段落密度',
        severity: '⚠️ 警告',
        detail: '【' + section + '】段落含 ' + count + ' 项事件 > ' + CONFIG.paragraphDensityWarning + ' 阈值',
        metric: { section: section, count: count, threshold: CONFIG.paragraphDensityWarning }
      });
    }
  }

  return findings;
}

// ============ Layer 1: 退市窗口检测 ============

function checkDelistedWindow(events, stockStatus, sections) {
  const findings = [];

  if (!stockStatus.isDelisted && !stockStatus.isSuspended) {
    return findings;
  }

  const cutoffDate = stockStatus.delistDate;

  // 检查 1: 有日期的事件是否在退市后
  const eventsAfterDelist = events.filter(e => e.date && e.date >= cutoffDate);

  if (eventsAfterDelist.length > 0) {
    findings.push({
      layer: 'Layer 1 - 退市后事件',
      severity: '❌ 严重',
      detail: eventsAfterDelist.length + ' 项有日期的事件发生在 stock 退市（' + cutoffDate + '）之后，强烈疑似幻觉',
      evidence: eventsAfterDelist.map(e => e.date + ': ' + e.text.substring(0, 50) + '...'),
      metric: { cutoffDate: cutoffDate, eventsAfterDelist: eventsAfterDelist.length }
    });
  }

  // 检查 2: 已退市 stock 不应有"实质性事件"（不只是"未查到"）
  let substantiveCount = 0;
  for (const key in sections) {
    const { title, body } = sections[key];
    if (title.includes('未查到') || title.includes('信源清单') || title.includes('口径归属')) continue;
    const substantiveFacts = body.split(/[；;。]/).filter(s => {
      const t = s.trim();
      if (t.length <= 10) return false;
      if (t.includes('未查到')) return false;
      if (t.includes('未通过')) return false;
      if (t.includes('未发现')) return false;
      return true;
    });
    substantiveCount += substantiveFacts.length;
  }

  if (substantiveCount > 0) {
    findings.push({
      layer: 'Layer 1 - 退市窗口',
      severity: '❌ 严重',
      detail: 'stock 已退市/停牌（' + cutoffDate + '），但豆包返回包含 ' + substantiveCount + ' 项实质性事件描述，已退市公司不应有 2024-2026 新事件——强烈疑似幻觉',
      metric: { cutoffDate: cutoffDate, substantiveCount: substantiveCount }
    });
  }

  return findings;
}

// ============ Layer 3: 数字可验证性 ============

function extractNumbers(text) {
  const numbers = [];
  // 1. 主正则提取
  for (const pattern of CONFIG.numberPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      for (const m of matches) {
        numbers.push(m.trim());
      }
    }
  }
  // 2. 排除规则——命中后剔除(R3-18 新增)
  const filtered = [];
  for (const num of numbers) {
    let shouldExclude = false;
    for (const exPattern of (CONFIG.excludePatterns || [])) {
      exPattern.lastIndex = 0; // 重置全局 regex lastIndex
      if (exPattern.test(num)) {
        shouldExclude = true;
        break;
      }
    }
    if (!shouldExclude) {
      filtered.push(num);
    }
  }
  return filtered;
}

function checkNumberVerification(sections, hbmText) {
  const findings = [];
  const unverified = [];

  const allText = Object.values(sections).map(s => s.body).join('\n');
  const numbers = extractNumbers(allText);

  for (const num of numbers) {
    if (!hbmText.includes(num)) {
      unverified.push(num);
    }
  }

  if (unverified.length > 0) {
    findings.push({
      layer: 'Layer 3 - 数字可验证性',
      severity: '⚠️ 待验证',
      detail: unverified.length + '/' + numbers.length + ' 个数字未在 hbm.js 已有数据中找到佐证',
      evidence: unverified.slice(0, 10)
    });
  }

  return findings;
}

// ============ Layer 4: 客户名可验证性 ============

function extractCustomers(text) {
  const customers = [];
  for (const keyword of CONFIG.knownCustomers) {
    if (text.includes(keyword)) {
      customers.push(keyword);
    }
  }
  return customers;
}

function checkCustomerVerification(sections, hbmText) {
  const findings = [];
  const unverified = [];

  const allText = Object.values(sections).map(s => s.body).join('\n');
  const customers = extractCustomers(allText);

  for (const customer of customers) {
    if (!hbmText.includes(customer)) {
      unverified.push(customer);
    }
  }

  if (unverified.length > 0) {
    findings.push({
      layer: 'Layer 4 - 客户名可验证性',
      severity: '⚠️ 待验证',
      detail: unverified.length + '/' + customers.length + ' 个客户名未在 hbm.js 已有数据中找到佐证',
      evidence: unverified
    });
  }

  return findings;
}

// ============ 综合风险评分 ============
// Layer 1（退市窗口）+ Layer 2（事件密度）：计入 risk score
// Layer 3（数字可验证性）+ Layer 4（客户名可验证性）：仅显示为参考信息，不计分
// 理由：避免新事件被误报为"未佐证"——真实新事件可能尚未写入 hbm.js

function calculateRiskScore(findings) {
  let score = 0;
  for (const f of findings) {
    if (f.severity === '❌ 严重') score += 10;
    else if (f.severity === '⚠️ 警告') score += 3;
    // ⚠️ 待验证（Layer 3/4）不计分
  }
  return score;
}

function getVerdict(score, hasReferenceInfo) {
  if (score >= 10) return '❌ 强烈疑似幻觉';
  if (score >= 5) return '⚠️ 部分可疑';
  // score < 5 时即使有 Layer 3/4 ⚠️ 待验证 也判定为"✅ 通过（仅参考）"
  // 避免新事件（尚未写入 hbm.js）触发强制人工复核的"假阳性"
  return hasReferenceInfo ? '✅ 通过（仅参考）' : '✅ 通过';
}

// ============ 主函数 ============

function screenHallucination(content, stockCode, stockName) {
  const sections = parseDoubaoContent(content);
  const events = extractEvents(sections);

  const stockStatus = checkStockStatus(stockCode);
  const hbmText = JSON.stringify(c);

  const findings = [];

  findings.push.apply(findings, checkDelistedWindow(events, stockStatus, sections));
  findings.push.apply(findings, checkEventDensity(events));
  findings.push.apply(findings, checkNumberVerification(sections, hbmText));
  findings.push.apply(findings, checkCustomerVerification(sections, hbmText));

  const riskScore = calculateRiskScore(findings);
  const hasReferenceInfo = findings.some(f => f.severity === '⚠️ 待验证');
  const verdict = getVerdict(riskScore, hasReferenceInfo);

  return {
    stockCode: stockCode,
    stockName: stockName,
    totalEvents: events.length,
    stockStatus: stockStatus,
    findings: findings,
    riskScore: riskScore,
    verdict: verdict
  };
}

// ============ 测试用例（HBM 4 只代表股）============

if (require.main === module) {
  const huahaichengkeContent = '### 688535 华海诚科\n\n【1. 认证进展】\n2024-Q4 至 2026-Q2 期间持续向 SK 海力士送样 GMC 颗粒状环氧塑封料样品，2025 年 11 月通过小批量验证；2026 年 3 月获华为深圳哈勃参股正式公告（但具体持股比例与锁定期未官方披露）；2026 年 5 月实现月产 50 吨稳定出货，标志 GMC 国产替代日系住友/昭和电工进入实质阶段。\n\n【2. 客户切换/新增】\n核心客户结构以国内封测厂为主（通富微电/长电科技/华天科技），HBM 后道封测用量随长鑫 CXMT HBM2 量产爬坡同步增长；未查到 SK 海力士/三星直接采购的官方信息。\n\n【3. 新进入者动态】\n在 GMC 颗粒状环氧塑封料市场，全球仅日本住友/昭和电工+华海诚科三家通过认证，2024-2026 期间未查到第四家厂商宣布量产或重大突破。\n\n【4. 技术/产能壁垒】\nGMC 配方核心专利未被其他厂商突破；2025 年华海诚科 IPO 募投扩产至年产 500 吨，2026 年规划再扩至 1500 吨；low-α 球形硅微粉（联瑞新材供）作为核心填料占比 70-90%，配方锁定后切换成本极高。\n\n【5. 口径归属】\n本只 stock 全部事实属 GMC 颗粒状环氧塑封料段口径\n\n【6. 未查到】\n- 华为哈勃参股的精确持股比例与锁定期官方披露\n- SK 海力士/三星直接采购 GMC 的官方合同信息\n- GMC 国产替代的精确市占率数据（住友/昭和当前份额）\n\n【7. 信源清单】\n- 券商深度研报 + 2026 年 5 月 12 日\n- 公司公告 + 2025 年 11 月（认证通过）\n- 行业新闻 + 2026 年 4 月 8 日';

  console.log('========== 测试 1: 688535 华海诚科（应通过）==========');
  const result1 = screenHallucination(huahaichengkeContent, '688535', '华海诚科');
  console.log('Stock:', result1.stockCode, result1.stockName);
  console.log('Stock 状态:', JSON.stringify(result1.stockStatus, null, 2));
  console.log('总事件数:', result1.totalEvents);
  console.log('Findings:');
  result1.findings.forEach(f => {
    console.log('  [' + f.severity + '] ' + f.layer + ': ' + f.detail);
    if (f.evidence) console.log('    证据: ' + JSON.stringify(f.evidence).substring(0, 200));
  });
  console.log('风险评分:', result1.riskScore);
  console.log('判定:', result1.verdict);
  console.log();

  const yakeContent = '### 002409 雅克科技\n\n【1. 认证进展】\n2024-Q4 至 2026-Q2 期间，子公司韩国先科（UP Chemical）持续为 SK 海力士供应 HBM 堆叠介质层前驱体；HBM3E 12 层堆叠用高介电常数前驱体已通过验证并批量供货；HBM4 16Hi/20Hi 用新一代前驱体送样中，预计 2026H2 进入验证阶段。\n\n【2. 客户切换/新增】\n核心客户结构以 SK 海力士与合肥长鑫为主，海力士收入占 UP Chemical 总收入约 50%（媒体口径、未独立核实）；2025 年起对长鑫 CXMT 供货量持续增长，HBM2 量产爬坡直接拉动前驱体用量。\n\n【3. 新进入者动态】\n在 HBM 前驱体市场，全球仅默克 Merck/空气化工 APD/韩国先科三家主导；2024-2026 期间未查到第四家厂商宣布量产或重大突破，UP Chemical 持续受益于 HBM 产能长协锁死至 2027 的结构性短缺。\n\n【4. 技术/产能壁垒】\n前驱体配方核心专利未被其他厂商突破；UP Chemical 韩国工厂 2025 年完成二期扩产，产能提升约 30%；前驱体技术贯穿 HBM 全世代，从 HBM2 到 HBM4 配方持续迭代。\n\n【5. 口径归属】\n本只 stock 全部事实属前驱体材料段口径\n\n【6. 未查到】\n- SK 海力士收入占 UP Chemical 50% 的官方财报披露\n- HBM4 前驱体的具体认证时间表\n\n【7. 信源清单】\n- 券商深度研报 + 2026 年 4 月 22 日\n- 公司公告 + 2025 年（UP Chemical 二期扩产）\n- 行业新闻 + 2026 年 3 月 15 日';

  console.log('========== 测试 2: 002409 雅克科技（应通过）==========');
  const result2 = screenHallucination(yakeContent, '002409', '雅克科技');
  console.log('Stock:', result2.stockCode, result2.stockName);
  console.log('Stock 状态:', JSON.stringify(result2.stockStatus, null, 2));
  console.log('总事件数:', result2.totalEvents);
  console.log('Findings:');
  result2.findings.forEach(f => {
    console.log('  [' + f.severity + '] ' + f.layer + ': ' + f.detail);
    if (f.evidence) console.log('    证据: ' + JSON.stringify(f.evidence).substring(0, 200));
  });
  console.log('风险评分:', result2.riskScore);
  console.log('判定:', result2.verdict);
  console.log();

  const tuojingContent = '### 688072 拓荆科技\n\n【1. 认证进展】\n2024-Q4 至 2026-Q2 期间，国产唯一量产 PECVD 设备持续向存储双雄（长鑫 CXMT/武汉新芯）批量供货；混合键合设备仍处于研发阶段，2026 年 5 月完成工程样机验证，但未查到向客户正式送样的官方信息；Besi 仍主导 HBM4 混合键合设备市场。\n\n【2. 客户切换/新增】\n核心客户结构以国内存储/逻辑晶圆厂为主，存储双雄订单占比约 30-40%（行业研究口径、未独立核实）；2025 年起对中芯国际/华虹半导体供货量持续增长。\n\n【3. 新进入者动态】\n在国产 PECVD 设备市场，拓荆科技保持唯一量产地位，2024-2026 期间未查到北方华创/中微公司实现 PECVD 量产突破；混合键合设备全球仅 Besi 垄断，国产追赶者仍处于早期阶段。\n\n【4. 技术/产能壁垒】\nPECVD 设备核心专利未被其他国产厂商突破，薄膜沉积国内市占 >25%；2026 年 H1 在手订单饱满（公司公告披露超 100 亿元）；混合键合设备量产时间表仍未明确。\n\n【5. 口径归属】\n本只 stock 全部事实属混合键合及核心设备段口径\n\n【6. 未查到】\n- 存储双雄订单占比 30-40% 的官方财报披露\n- 混合键合设备向客户正式送样的官方公告\n\n【7. 信源清单】\n- 券商深度研报 + 2026 年 5 月 8 日\n- 公司公告 + 2026 年 4 月（一季报）\n- 行业新闻 + 2026 年 3 月 22 日';

  console.log('========== 测试 3: 688072 拓荆科技（应通过）==========');
  const result3 = screenHallucination(tuojingContent, '688072', '拓荆科技');
  console.log('Stock:', result3.stockCode, result3.stockName);
  console.log('Stock 状态:', JSON.stringify(result3.stockStatus, null, 2));
  console.log('总事件数:', result3.totalEvents);
  console.log('Findings:');
  result3.findings.forEach(f => {
    console.log('  [' + f.severity + '] ' + f.layer + ': ' + f.detail);
    if (f.evidence) console.log('    证据: ' + JSON.stringify(f.evidence).substring(0, 200));
  });
  console.log('风险评分:', result3.riskScore);
  console.log('判定:', result3.verdict);
  console.log();

  const beifanghuachuangContent = '### 002371 北方华创\n\n【1. 认证进展】\n2024-Q4 至 2026-Q2 期间，作为国内最大平台型设备商，持续向存储/逻辑晶圆厂批量供货刻蚀/薄膜/清洗/热处理设备；HBM 混合键合 Qomola HPD30 设备仍处于研发阶段，未查到正式出货给 HBM 客户的官方公告。\n\n【2. 客户切换/新增】\n核心客户结构以国内存储/逻辑晶圆厂为主，2026Q1 营收 103.23 亿+25.8%，净利 16.35 亿+3.42%（研发投入拖累）；未查到英伟达/三星等海外客户对北方华创的明确采购信息。\n\n【3. 新进入者动态】\n在国产平台型设备市场，北方华创保持龙头地位（全球第 5）；2024-2026 期间未查到国产平台型设备商对其发起实质挑战。\n\n【4. 技术/产能壁垒】\n刻蚀/薄膜/键合核心专利未被其他国产厂商突破；2026 年 H1 在手订单饱满（公司一季报披露超 200 亿元）；PE-TTM 估值约 57x（2026-06-10 收盘），处于历史 80% 分位以上。\n\n【5. 口径归属】\n本只 stock 全部事实属混合键合及核心设备段口径（含刻蚀/薄膜多品类）\n\n【6. 未查到】\n- HBM 混合键合 Qomola HPD30 正式出货给 HBM 客户的官方公告\n- 海外客户对北方华创的明确采购信息\n\n【7. 信源清单】\n- 公司一季报 + 2026 年 4 月\n- 券商深度研报 + 2026 年 5 月 15 日\n- 同花顺估值数据 + 2026-06-10 收盘';

  console.log('========== 测试 4: 002371 北方华创（应通过）==========');
  const result4 = screenHallucination(beifanghuachuangContent, '002371', '北方华创');
  console.log('Stock:', result4.stockCode, result4.stockName);
  console.log('Stock 状态:', JSON.stringify(result4.stockStatus, null, 2));
  console.log('总事件数:', result4.totalEvents);
  console.log('Findings:');
  result4.findings.forEach(f => {
    console.log('  [' + f.severity + '] ' + f.layer + ': ' + f.detail);
    if (f.evidence) console.log('    证据: ' + JSON.stringify(f.evidence).substring(0, 200));
  });
  console.log('风险评分:', result4.riskScore);
  console.log('判定:', result4.verdict);
}

module.exports = {
  screenHallucination: screenHallucination,
  checkStockStatus: checkStockStatus,
  parseDoubaoContent: parseDoubaoContent,
  extractEvents: extractEvents,
  checkEventDensity: checkEventDensity,
  checkDelistedWindow: checkDelistedWindow,
  checkNumberVerification: checkNumberVerification,
  checkCustomerVerification: checkCustomerVerification,
  CONFIG: CONFIG
};
