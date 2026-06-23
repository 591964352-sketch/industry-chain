// data/pcb.auto.js  —— 阶段三 commit 3.1：baostock 单源拉 38 只 stock pe_ttm 历史（5 年窗口）
// 由 scripts/refresh_pcb_valuation.py 生成（不手动编辑）。
//
// 数据源：baostock.query_history_k_data_plus（单源·akshare 已移除·adata 是财报接口非 PE 历史）
// 验证标准：rows > 1000（5 年日频）· peTTM 列真实数值（不全为空）
//
// ⚠️ §6.8 数据准确度优先：本文件由脚本生成·不允许手动编辑·失败 stock 保持 null 不静默用估算覆盖
// ⚠️ §6.4 双源降级：akshare 缺失·baostock 单源·source.flag 显式标注
// ⚠️ §4.2 adapter 改名必须 raise：脚本已严格执行（akshare 缺失时报错退出·不替换其他接口）
//
// 字段语义：
//   pe_ttm: 最新交易日 peTTM 数值（float）或 null（亏损/失败）
//   source: { pe: '...', verify: null, flag: '...' }（verify 留空等 commit 3.2 adata 补充）
//   baostockStamp: '0.9.2/<日期>'
//   asOf: '<YYYY-MM-DD>'
//
// commit 3.2 工作：算 pePercentile / fromHigh / entryZone（分位计算）· 不在本 commit 范围
window.PCB_AUTO = {
  _meta: {
    asOf: '2026-06-23',
    baostockVersion: '00.9.20',
    akshareVersion: null,
    window: '5y (2021-06-23 ~ 2026-06-23)',
    note: '★ 阶段三 commit 3.1：baostock 单源拉 pe_ttm 历史·akshare stock_a_indicator_lg 已移除·adata 是财报接口非 PE 历史',
    sourceFlag: '⚠️单源(akshare缺失·adata非PE历史接口)',
    stats: {
      success: 34,
      lossSkip: 4,
      failed: 0,
      failedCodes: []
    }
  },
  valuations: {
    '001389': {
      pe_ttm: 74.0019,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002080': {
      pe_ttm: 65.6495,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002384': {
      pe_ttm: 228.958,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002436': {
      pe_ttm: 571.197,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002443': {
      pe_ttm: 39.1955,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002463': {
      pe_ttm: 61.9547,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002636': {
      pe_ttm: 165.0368,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002913': {
      pe_ttm: 100.0717,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002916': {
      pe_ttm: 79.8391,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '002938': {
      pe_ttm: 66.7401,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '300395': {
      pe_ttm: 138.9558,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '300476': {
      pe_ttm: 71.0244,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '300522': {
      pe_ttm: 434.3357,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '301150': {
      pe_ttm: 134.2672,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '301200': {
      pe_ttm: 164.4117,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '301217': {
      pe_ttm: 867.1971,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '301377': {
      pe_ttm: 397.1007,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '301511': {
      pe_ttm: 365.5394,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '600110': {
      pe_ttm: null,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口) · 亏损/PE无意义"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '600176': {
      pe_ttm: 61.7197,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '600183': {
      pe_ttm: 103.8009,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '601208': {
      pe_ttm: 190.8061,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603002': {
      pe_ttm: 901.1781,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603186': {
      pe_ttm: 125.5478,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603228': {
      pe_ttm: 63.0955,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603256': {
      pe_ttm: 720.4238,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603519': {
      pe_ttm: 26.4623,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603650': {
      pe_ttm: 73.9676,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603920': {
      pe_ttm: 70.001,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '603936': {
      pe_ttm: null,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口) · 亏损/PE无意义"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '605006': {
      pe_ttm: null,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口) · 亏损/PE无意义"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '605589': {
      pe_ttm: 57.3135,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '688183': {
      pe_ttm: 61.841,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '688234': {
      pe_ttm: null,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口) · 亏损/PE无意义"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '688300': {
      pe_ttm: 191.5202,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '688388': {
      pe_ttm: 184.3719,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '688630': {
      pe_ttm: 176.0136,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    },
    '688700': {
      pe_ttm: 180.9568,
      source: {
        pe: 'baostock.query_history_k_data_plus',
        verify: null,
        flag: "⚠️单源(akshare缺失·adata非PE历史接口)"
      },
      baostockStamp: '00.9.20/2026-06-23',
      asOf: '2026-06-23'
    }
  }
};
