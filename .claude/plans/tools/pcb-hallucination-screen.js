// hallucination-screen.js
// 用途：对豆包返回内容做幻觉筛查
// 输入：豆包返回文本（方案 G 7 段式）+ stock code + stock name
// 输出：风险评分 + 可疑事件清单 + 验证状态
// 教训（2026-06-21）：002288 超华已退市但被纳入 P1 流程，
//                   豆包返回大量 2026 幻觉事件（HVLP 铜箔/玉林基地/
//                   宁德时代比亚迪等）被采信为 down 判定依据。
// 本脚本设计为通用防御——任何 stock 都可能被豆包编造内容。
// 本文件为临时测试版（写在 .claude/scratch/），测试通过后再迁移到永久路径。

global.window = {};
require('d:/乌龟/产业链全景/data/pcb.js');
const c = global.window.CHAINS.pcb;

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
  //   良率 70-80%/PE-TTM 100 倍 等描述性数字,pcb.js 中未必有原文锚定,导致 R3-17 批 1+批 2
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

  // Layer 4 客户名识别关键词（PCB 产业链已知客户/对手）
  knownCustomers: [
    '英伟达', 'NVIDIA', 'AMD', '台积电', 'TSMC',
    '台光', '松下', 'Resonac', '三菱瓦斯', '三井', '日东纺', 'Nittobo',
    '生益', '华正', '南亚', '金安', '超华',
    '深南电路', '兴森', '景旺', '胜宏', '东山', '鹏鼎', '广合', '生益电子',
    '宁德时代', '比亚迪', '特斯拉', '博世', 'Meta', '微软', 'AWS', 'Oracle',
    '华为', '昇腾', '海光', '寒武纪',
    '铜冠', '德福', '诺德', '嘉元', '中一',
    '菲利华', '宏和', '中材', '中国巨石', '山东玻纤', '圣泉', '世名', '宏昌', '彤程', '东材'
  ],

  // 时间窗口（18 个月）
  queryWindowMonths: 18,

  // 已知 stock 退市日期（可手动维护）
  knownDelistDates: {
    '002288': '2026-05-18'  // 超华科技
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

  // 2. 扫描 pcb.js 所有字段找退市/停牌标注
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

  scanObject(c, 'CHAINS.pcb');

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

function checkNumberVerification(sections, pcbText) {
  const findings = [];
  const unverified = [];

  const allText = Object.values(sections).map(s => s.body).join('\n');
  const numbers = extractNumbers(allText);

  for (const num of numbers) {
    if (!pcbText.includes(num)) {
      unverified.push(num);
    }
  }

  if (unverified.length > 0) {
    findings.push({
      layer: 'Layer 3 - 数字可验证性',
      severity: '⚠️ 待验证',
      detail: unverified.length + '/' + numbers.length + ' 个数字未在 pcb.js 已有数据中找到佐证',
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

function checkCustomerVerification(sections, pcbText) {
  const findings = [];
  const unverified = [];

  const allText = Object.values(sections).map(s => s.body).join('\n');
  const customers = extractCustomers(allText);

  for (const customer of customers) {
    if (!pcbText.includes(customer)) {
      unverified.push(customer);
    }
  }

  if (unverified.length > 0) {
    findings.push({
      layer: 'Layer 4 - 客户名可验证性',
      severity: '⚠️ 待验证',
      detail: unverified.length + '/' + customers.length + ' 个客户名未在 pcb.js 已有数据中找到佐证',
      evidence: unverified
    });
  }

  return findings;
}

// ============ 综合风险评分 ============
// Layer 1（退市窗口）+ Layer 2（事件密度）：计入 risk score
// Layer 3（数字可验证性）+ Layer 4（客户名可验证性）：仅显示为参考信息，不计分
// 理由：避免新事件被误报为"未佐证"——真实新事件可能尚未写入 pcb.js

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
  // 避免新事件（尚未写入 pcb.js）触发强制人工复核的"假阳性"
  return hasReferenceInfo ? '✅ 通过（仅参考）' : '✅ 通过';
}

// ============ 主函数 ============

function screenHallucination(content, stockCode, stockName) {
  const sections = parseDoubaoContent(content);
  const events = extractEvents(sections);

  const stockStatus = checkStockStatus(stockCode);
  const pcbText = JSON.stringify(c);

  const findings = [];

  findings.push.apply(findings, checkDelistedWindow(events, stockStatus, sections));
  findings.push.apply(findings, checkEventDensity(events));
  findings.push.apply(findings, checkNumberVerification(sections, pcbText));
  findings.push.apply(findings, checkCustomerVerification(sections, pcbText));

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

// ============ 测试用例 ============

if (require.main === module) {
  const chaohuaContent = '### 002288 超华科技\n\n【1. 认证进展】\n2024-Q4 至 2026-Q2 期间，未查到获得任何新的 AI 高端客户认证的信息；HVLP 铜箔已通过头部客户认证，开始批量出货；与景旺电子、胜宏科技、中京电子、博敏电子、南亚新材、兴森科技等国内众多 PCB 领域头部企业签订了战略合作协议，成功加入深南电路供应链体系。\n\n【2. 客户切换/新增】\n核心客户结构以 PCB 领域头部企业为主，未查到重大变化；绑定宁德时代、比亚迪等新能源汽车领域客户，新能源汽车领域营收占比达 35%（同比+8%）。\n\n【3. 新进入者动态】\n在中端 CCL + 铜箔一体化市场，未查到被其他厂商挑战的明确信息；公司作为业内少有的"铜箔-覆铜板-PCB"全产业链企业，铜箔自给率超 80%，成本优势显著，仍保持稳定市场地位。\n\n【4. 技术/产能壁垒】\n2024 年 8 月 18 日起持续亏损，2026 年一季度仍未扭亏（akshare 无 2026Q1 数据）；2025 年 7 月 2 日启动建设超华玉林年产 10 万吨高精度铜箔和 1000 万张高频覆铜板产业基地项目（一期），计划 15 个月内完成 2 万吨高精度铜箔和 1000 万张高频覆铜板生产线的建设并投产；2024 年加速推进高频高速覆铜板、IC 载板等高端产品研发，突破车载雷达、6G 通信基材技术瓶颈。\n\n【5. 口径归属】\n本只 stock 全部事实属 CCL 段口径（含铜箔一体化）\n\n【6. 未查到】\n- 2024-Q4 至 2026-Q2 期间 AI 高端客户认证的具体信息\n- 中端 CCL + 铜箔一体化市场被其他厂商挑战的具体数据\n- 2026 年一季度扭亏为盈的官方财务数据\n- 玉林基地一期投产的官方公告\n\n【7. 信源清单】\n- 行业新闻 + 2026 年 6 月 15 日\n- 行业数据 + 2026 年 5 月 18 日\n- 券商研报 + 2025 年 7 月 22 日\n- 券商研报 + 2025 年 5 月 9 日';

  console.log('========== 测试 1: 002288 超华科技（应识别为幻觉）==========');
  const result1 = screenHallucination(chaohuaContent, '002288', '超华科技');
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

  const shengyiContent = '### 600183 生益科技\n\n【1. 认证进展】\n2025 年 12 月正式通过英伟达 M9 级 CCL 认证（GB300/Rubin 架构），成为中国大陆唯一、全球仅 3 家可批量量产的厂商；2026 年 3 月开始加速出货，良率稳定在 90%（行业平均 70%）；M10 材料已送样英伟达测试，预计 2027 年量产，将用于 Rubin Ultra 高端型号。\n\n【2. 客户切换/新增】\n核心客户结构以英伟达为主，2026 年 M9 订单已锁定至 2026 年底，在 Rubin 交换机框架中将占据 50% 份额；子公司生益电子为亚马逊云服务（AWS）供应 PCB；未查到 AMD、谷歌 TPU、华为昇腾等新客户认证的明确信息。\n\n【3. 新进入者动态】\n在 M9 CCL 市场，2024-2026 期间中国大陆暂无其他厂商实现量产或重大突破，生益科技仍保持唯一英伟达认证的大陆厂商地位。\n\n【4. 技术/产能壁垒】\nM9 等级 CCL 核心专利/技术未被其他厂商突破，生益科技良率达 90% 显著高于行业平均 70%；2026 年 M9 产能规划 110 万平方米，无新产线投产或停产的公开信息；同时掌握碳氢、PTFE 两套 M10 技术路线，技术壁垒持续巩固。\n\n【5. 口径归属】\n本只 stock 全部事实属 CCL 段口径\n\n【6. 未查到】\n- AMD、谷歌 TPU、华为昇腾等新客户认证的明确信息\n- M9 级 CCL 核心专利被突破的具体信息\n\n【7. 信源清单】\n- 券商研报 + 2026 年 5 月 19 日\n- 行业新闻 + 2026 年 5 月 26 日';

  console.log('========== 测试 2: 600183 生益科技（应通过）==========');
  const result2 = screenHallucination(shengyiContent, '600183', '生益科技');
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

  const nanyaContent = '### 603519 南亚新材\n\n【1. 认证进展】\nM9 CCL 未查到通过英伟达或台光直接认证的官方信息；2026 年 4 月有市场传闻称通过英伟达认证，但未得到公司官方确认；800Gbps 高速材料（NY-P4）已量产并通过深南电路、沪电股份等头部 PCB 厂商间接进入英伟达供应链；M10 材料于 2026 年 1 月向英伟达提交样品测试，2026 年 4 月投资者互动答复中披露技术攻关已全部收尾。\n\n【2. 客户切换/新增】\n核心客户结构以华为昇腾为主，PPO 产品批量应用于昇腾服务器 CPU 母板及 GPU 模组板，是华为高速覆铜板主要供应商之一；GB200 配套 M8 级材料间接订单同比增长超 95%；未查到客户结构重大变化的其他信息。\n\n【3. 新进入者动态】\n在中国大陆第三的位置上，未查到被其他厂商挑战或反超的明确信息；公司仍保持全球前十、内资第三的刚性 CCL 市场地位。\n\n【4. 技术/产能壁垒】\nM9 CCL 未查到正式量产落地的官方信息，仍处于测试阶段；2024-Q4 至 2026-Q2 期间未查到新产线投产或停产的公开信息；M10 材料为国内率先推出，技术路线已通过英伟达初步筛选。\n\n【5. 口径归属】\n本只 stock 全部事实属 CCL 段口径\n\n【6. 未查到】\n- M9 CCL 通过英伟达或台光直接认证的官方确认信息及具体时间\n- 被其他厂商挑战或反超的官方数据\n\n【7. 信源清单】\n- 券商研报 + 2026 年 3 月 17 日\n- 公司公告/互动平台 + 2026 年 4 月下旬';

  console.log('========== 测试 3: 603519 南亚新材（应通过）==========');
  const result3 = screenHallucination(nanyaContent, '603519', '南亚新材');
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

  const jinanContent = '### 002636 金安国纪\n\n【1. 认证进展】\n2024-Q4 至 2026-Q2 期间，在 AI 高端 CCL (M9/M8) 未获得任何客户认证；2026 年 6 月 10 日和 6 月 16 日两次发布澄清公告，明确表示未与英伟达、华为有过接触或业务合作；高频高速覆铜板尚在实验室研发及客户送样阶段，尚未形成收入。\n\n【2. 客户切换/新增】\n核心客户结构以消费电子、家电、中端 PCB 厂为主，未查到重大变化；公司明确表示主要客户为 PCB 工厂；2026 年未新增 AI 服务器等高端领域客户。\n\n【3. 新进入者动态】\n在中端 CCL 市场，未查到被其他大陆厂商挑战的明确信息；公司作为国内龙头、全球 CCL 第 7，在中低端 CCL 市场仍保持稳定地位；2026 年定增 13 亿扩产高等级覆铜板。\n\n【4. 技术/产能壁垒】\n无 AI 高端产线投产或重大技改的官方信息；2026 年 6 月开工建设年产 4000 万平方米高等级覆铜板项目，预计 2028 年建成；宁国覆铜板技改剩余 2 条线预计 2026 年下半年投产，新增 1600 万张/年产能。\n\n【5. 口径归属】\n本只 stock 全部事实属 CCL 段口径（中低端为主）\n\n【6. 未查到】\n- AI 高端 CCL (M9/M8) 的任何客户认证信息\n- 中端 CCL 市场被其他大陆厂商挑战的具体数据\n\n【7. 信源清单】\n- 公司公告 + 2026 年 6 月 10 日\n- 公司公告 + 2026 年 6 月 16 日\n- 行业新闻 + 2026 年 6 月 19 日';

  console.log('========== 测试 4: 002636 金安国纪（应通过）==========');
  const result4 = screenHallucination(jinanContent, '002636', '金安国纪');
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