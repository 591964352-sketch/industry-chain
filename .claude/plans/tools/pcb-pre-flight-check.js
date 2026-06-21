// PCB pre-flight-check.js
// 用途：stock 上市状态预检（退市/停牌/ST/异常标注）
// 输入：动态提取 pcb.js 中所有 stock code（segments + midstream + fourQuestions）
// 输出：每只 stock 的状态报告 + 写入 .claude/scratch/stock-status-report.md
// 触发时机：每次 P1 / 数据刷新任务开始前必须运行
// 教训（2026-06-21）：002288 超华科技已退市但被纳入 P1 流程，
//                   导致豆包返回大量 2026 幻觉事件并被采信为 down 判定依据。

global.window = {};
require('d:/乌龟/产业链全景/data/pcb.js');
const c = global.window.CHAINS.pcb;
const fs = require('fs');

// 动态提取所有 stock code（segments + midstream + fourQuestions 三路径覆盖）
// 不再硬编码——避免人工维护清单与 pcb.js 实际 stock 不一致导致的"安静漏检"
const STOCK_CODES = (() => {
  const codes = new Set();

  // 1. segments 段
  if (c.segments) {
    c.segments.forEach(seg => {
      if (seg.stocks) {
        seg.stocks.forEach(st => {
          if (st.code) codes.add(st.code);
        });
      }
    });
  }

  // 2. midstream 段（PCB 设备/中游 PCB 制造——可能漏列）
  if (c.midstream && c.midstream.stocks) {
    c.midstream.stocks.forEach(st => {
      if (st.code) codes.add(st.code);
    });
  }

  // 3. fourQuestions 段
  if (c.fourQuestions && c.fourQuestions.segments) {
    c.fourQuestions.segments.forEach(seg => {
      if (seg.stocks) {
        seg.stocks.forEach(st => {
          if (st.code) codes.add(st.code);
        });
      }
    });
  }

  return [...codes].sort();
})();

// 异常关键词正则（覆盖中文/英文）
const ANOMALY_PATTERNS = [
  { pattern: /退市/g, label: '退市' },
  { pattern: /停牌/g, label: '停牌' },
  { pattern: /已退/g, label: '已退' },
  { pattern: /ST(?!R)/g, label: 'ST' },
  { pattern: /暂停上市/g, label: '暂停上市' },
  { pattern: /delisted/gi, label: 'delisted' },
  { pattern: /suspended/gi, label: 'suspended' }
];

// 扫描字段
const FIELDS_TO_SCAN = ['position', 'note', 'q1note', 'q2note', 'q3note', 'q4note',
                         'logic', 'src', 'trendNote', 'dims6Note'];

function findInSegments(code) {
  const locations = [];
  if (c.segments) {
    c.segments.forEach((seg, sIdx) => {
      if (seg.stocks) {
        seg.stocks.forEach((st, stIdx) => {
          if (st.code === code) {
            locations.push({
              segment: 'segments[' + sIdx + '] ' + seg.name,
              stockIdx: stIdx,
              name: st.name
            });
          }
        });
      }
    });
  }
  return locations;
}

function findInMidstream(code) {
  const locations = [];
  if (c.midstream && c.midstream.stocks) {
    c.midstream.stocks.forEach((st, idx) => {
      if (st.code === code) {
        locations.push({
          segment: 'midstream.stocks[' + idx + ']',
          stockIdx: idx,
          name: st.name
        });
      }
    });
  }
  return locations;
}

function findInFourQuestions(code) {
  const locations = [];
  if (c.fourQuestions && c.fourQuestions.segments) {
    c.fourQuestions.segments.forEach((seg, sIdx) => {
      if (seg.stocks) {
        seg.stocks.forEach((st, stIdx) => {
          if (st.code === code) {
            locations.push({
              segment: 'fourQuestions.segments[' + sIdx + '] ' + seg.name,
              stockIdx: stIdx,
              name: st.name
            });
          }
        });
      }
    });
  }
  return locations;
}

function checkAnomaly(text) {
  if (!text) return null;
  for (const ap of ANOMALY_PATTERNS) {
    const match = text.match(ap.pattern);
    if (match) return { keyword: match[0], label: ap.label };
  }
  return null;
}

function scanFieldsForAnomaly(obj) {
  const anomalies = [];
  for (const field of FIELDS_TO_SCAN) {
    if (obj[field] && typeof obj[field] === 'string') {
      const anomaly = checkAnomaly(obj[field]);
      if (anomaly) {
        anomalies.push({
          field,
          keyword: anomaly.keyword,
          label: anomaly.label,
          snippet: obj[field].substring(0, 80)
        });
      }
    }
  }
  return anomalies;
}

const report = [];
const anomalyStocks = [];

STOCK_CODES.forEach(code => {
  const segLocations = findInSegments(code);
  const midLocations = findInMidstream(code);
  const fqLocations = findInFourQuestions(code);

  const allLocations = [...segLocations, ...midLocations, ...fqLocations];

  if (allLocations.length === 0) {
    report.push({
      code, name: '(未找到)',
      status: '⚠️ NOT_FOUND',
      detail: '在 pcb.js 中未找到该 stock code',
      segLocations: [], midLocations: [], fqLocations: [], anomalies: []
    });
    anomalyStocks.push(code);
    return;
  }

  const anomalies = [];

  // 扫描所有 stock 对象
  c.segments.forEach(seg => {
    if (seg.stocks) {
      seg.stocks.forEach(st => {
        if (st.code === code) {
          anomalies.push(...scanFieldsForAnomaly(st));
        }
      });
    }
  });
  if (c.midstream && c.midstream.stocks) {
    c.midstream.stocks.forEach(st => {
      if (st.code === code) {
        anomalies.push(...scanFieldsForAnomaly(st));
      }
    });
  }
  c.fourQuestions.segments.forEach(seg => {
    if (seg.stocks) {
      seg.stocks.forEach(st => {
        if (st.code === code) {
          anomalies.push(...scanFieldsForAnomaly(st));
        }
      });
    }
  });

  let status = '✅ 正常';
  if (anomalies.length > 0) {
    status = '❌ 异常';
    anomalyStocks.push(code);
  }

  report.push({
    code,
    name: allLocations[0].name,
    status,
    segLocations: segLocations.map(l => l.segment + '/stocks[' + l.stockIdx + ']'),
    midLocations: midLocations.map(l => l.segment),
    fqLocations: fqLocations.map(l => l.segment + '/stocks[' + l.stockIdx + ']'),
    anomalies
  });
});

// 控制台输出
console.log('========== Pre-Flight Check · 上市状态预检报告 ==========');
console.log('检查时间: 2026-06-21');
console.log('动态提取 stock 总数: ' + STOCK_CODES.length);
console.log('异常 stock 数: ' + anomalyStocks.length);
console.log();
console.log('--- 详细列表 ---');
report.forEach(r => {
  console.log('---');
  console.log(r.code + ' ' + r.name + ' [' + r.status + ']');
  if (r.segLocations.length > 0) {
    console.log('  segments: ' + r.segLocations.join(', '));
  }
  if (r.midLocations.length > 0) {
    console.log('  midstream: ' + r.midLocations.join(', '));
  }
  if (r.fqLocations.length > 0) {
    console.log('  fourQuestions: ' + r.fqLocations.join(', '));
  }
  if (r.anomalies.length > 0) {
    console.log('  ⚠️ 异常字段:');
    r.anomalies.forEach(a => {
      console.log('    - ' + a.field + ' 包含"' + a.keyword + '" (' + a.label + '): ' + a.snippet + '...');
    });
  }
});

console.log();
console.log('========== 异常 stock 汇总 ==========');
if (anomalyStocks.length === 0) {
  console.log('无异常 stock');
} else {
  anomalyStocks.forEach(code => {
    const r = report.find(x => x.code === code);
    console.log(code + ' ' + r.name + ' - ' + r.status);
  });
}

// 写入报告文件
const reportContent = '# PCB Stock 上市状态预检报告\n\n' +
  '**检查时间**: 2026-06-21\n' +
  '**动态提取 stock 总数**: ' + STOCK_CODES.length + '\n' +
  '**异常 stock 数**: ' + anomalyStocks.length + '\n\n' +
  '## 动态提取 stock 清单（按字母排序）\n\n' +
  STOCK_CODES.join(', ') + '\n\n' +
  '## 详细报告\n\n' +
  report.map(r => {
    let s = '### ' + r.code + ' ' + r.name + ' [' + r.status + ']\n';
    if (r.segLocations.length > 0) s += '- **segments**: ' + r.segLocations.join(', ') + '\n';
    if (r.midLocations.length > 0) s += '- **midstream**: ' + r.midLocations.join(', ') + '\n';
    if (r.fqLocations.length > 0) s += '- **fourQuestions**: ' + r.fqLocations.join(', ') + '\n';
    if (r.anomalies.length > 0) {
      s += '- **异常字段**:\n';
      r.anomalies.forEach(a => {
        s += '  - ' + a.field + ' 包含"' + a.keyword + '" (' + a.label + '): ' + a.snippet + '...\n';
      });
    }
    return s;
  }).join('\n') + '\n\n## 异常 stock 汇总\n\n' +
  (anomalyStocks.length === 0 ? '无异常 stock\n' :
   anomalyStocks.map(code => {
     const r = report.find(x => x.code === code);
     return '- ' + code + ' ' + r.name + ' [' + r.status + ']';
   }).join('\n') + '\n');

fs.writeFileSync('d:/乌龟/产业链全景/.claude/scratch/stock-status-report.md', reportContent);
console.log();
console.log('报告已写入: .claude/scratch/stock-status-report.md');