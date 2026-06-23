"""
scripts/refresh_pcb_valuation.py
★ 阶段三 commit 3.1：baostock 单源拉 38 只 stock 的 pe_ttm 历史（5 年窗口）

按 plan §4.1 数据源决策（旧路径 C 券商研报 → akshare+baostock 双源）+ plan §6.8 数据准确度优先：
- akshare `stock_a_indicator_lg` 在 1.18.60 已移除（验证过：adapter 改名/缺字段必须 raise，已严格执行）
- adata 是财报接口（108 行财报期数据）非 PE-TTM 历史
- baostock 是当前唯一可用源：1323 行 5 年日频 peTTM（已验证）

本脚本硬约束：
- 只重写 data/pcb.auto.js，绝不触碰 data/pcb.manual.js（§6.2 红线）
- 失败 / 亏损 / peTTM 无效的 stock → pe_ttm: null，绝不静默用估算覆盖（§6.8 数据准确度优先）
- adapter 改名/缺字段 → raise 不静默（§6.11 + §4.2 准确性护栏）
- 单源合规降级：source.flag 显式标 "⚠️单源(akshare缺失·adata非PE历史接口)"

★ commit 3.1.2 修复：
- latest_pe 取值改用「距今 30 天内的最后一条历史」（避免用 history[-1] 误取到亏损前几个月旧数据）
- pe_history 序列本身不变（亏损股保留历史有效数据·commit 3.2 算分位时可用）

commit 3.1 范围只算 pe_ttm，不算分位（分位是 commit 3.2）。
"""
import re
import sys
import json
from pathlib import Path
from datetime import datetime, timedelta
import baostock as bs


# ★ Windows GBK 控制台兼容：emoji/中文 UTF-8 输出
# Python 3.7+ 才支持 reconfigure
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')


# ============================================================
# 配置
# ============================================================
ROOT = Path(__file__).resolve().parent.parent
MANUAL_JS = ROOT / 'data' / 'pcb.manual.js'
AUTO_JS   = ROOT / 'data' / 'pcb.auto.js'

START_DATE = '2021-06-23'
END_DATE   = '2026-06-23'
WINDOW_YEARS = 5
ASOF = datetime.now().strftime('%Y-%m-%d')
BAOSTOCK_VERSION = bs.__version__   # baostock 真实版本字符串（如 '00.9.20'，baostock 模块自带）

# 单源 flag（按 plan §6.4 双源规则·akshare 缺失需显式标注）
SOURCE_FLAG = '⚠️单源(akshare缺失·adata非PE历史接口)'
BAOSTOCK_STAMP = f'{BAOSTOCK_VERSION}/{ASOF}'


# ============================================================
# ① 从 data/pcb.manual.js 解析 stock codes
# ============================================================
def parse_stock_codes_from_manual():
    """用正则从 pcb.manual.js 提取 stocks 字典的所有 key（stock code）。
    避免依赖 Node.js 或 JSON 解析（IIFE 格式）。"""
    text = MANUAL_JS.read_text(encoding='utf-8')
    # 匹配 MANUAL.stocks = { '600183': {...}, '002916': {...}, ... }
    # 提取 'XXXXXX': {code:'XXXXXX', name:'...'
    # 用 'XXXXXX': {code 模式匹配
    pattern = re.compile(r"'([036]\d{5})':\s*\{\s*code:\s*'\1'")
    codes = sorted(set(pattern.findall(text)))
    if not codes:
        raise RuntimeError(f'❌ 解析 {MANUAL_JS.name} 失败：未找到 stock code')
    print(f'✓ 从 {MANUAL_JS.name} 解析出 {len(codes)} 只 stock code')
    return codes


# ============================================================
# ② stock code → baostock 格式转换（sh.600183 / sz.002916 等）
# ============================================================
def to_baostock_code(code):
    """A 股 code 6 位 → baostock prefix:
       60xxxx, 688xxx → sh (沪市主板/科创板)
       00xxxx, 30xxxx → sz (深市主板/创业板)
    """
    if code.startswith('60') or code.startswith('688'):
        return f'sh.{code}'
    if code.startswith('00') or code.startswith('30'):
        return f'sz.{code}'
    raise ValueError(f'❌ 未知 A 股 code 前缀：{code}')


# ============================================================
# ③ baostock 拉 peTTM 日频历史（adapter 报错 raise 不静默）
# ============================================================
# ★ commit 3.1.2：latest_pe 取值用距今 30 天内的最后一条·避免 history[-1] 误取亏损前几个月旧数据
LATEST_LOOKBACK_DAYS = 30


def fetch_pettm_series(code):
    """返回 (rows_count, latest_pe_ttm, history_list, error_msg)
       history_list = [{"date": "2021-06-23", "pe": 162.5}, ...]（只含有效数据 pe>0·亏损股也保留历史）
       latest_pe_ttm: history 距今 30 天内的最后一条·亏损股为 None
       接口改名/缺字段 → raise 不静默
    """
    bs_code = to_baostock_code(code)
    try:
        rs = bs.query_history_k_data_plus(
            bs_code,
            'date,peTTM',
            start_date=START_DATE,
            end_date=END_DATE,
            frequency='d',
            adjustflag='2'
        )
        # adapter 改名/缺字段校验
        if rs is None:
            raise AttributeError(f'❌ baostock 接口返回 None（疑似改名）')
        if not hasattr(rs, 'error_code'):
            raise AttributeError(f'❌ baostock ResultSet 缺 error_code 属性（疑似改名）')

        data_list = []
        if rs.error_code != '0':
            # 接口明确报错（不是空数据）→ raise
            raise RuntimeError(f'❌ baostock query 报错：{rs.error_code} {rs.error_msg}')

        while rs.next():
            data_list.append(rs.get_row_data())

        if not data_list:
            return (0, None, [], '空数据')

        # 收集有效 pe>0 历史序列（commit 3.2 自己算分位时不用重拉网络）
        rows = len(data_list)
        history = []
        for row in data_list:
            date_str = row[0]
            pe_str = row[1]
            if not pe_str or pe_str.strip() == '':
                continue
            try:
                pe_val = float(pe_str)
            except ValueError:
                continue
            if pe_val <= 0:
                continue
            history.append({"date": date_str, "pe": round(pe_val, 4)})

        # ★ commit 3.1.2 修复：latest_pe 用距今 30 天内的最后一条（避免用 history[-1] 误取亏损前几个月旧数据）
        end_dt = datetime.strptime(END_DATE, '%Y-%m-%d')
        cutoff_date = (end_dt - timedelta(days=LATEST_LOOKBACK_DAYS)).strftime('%Y-%m-%d')
        recent = [h for h in history if h["date"] >= cutoff_date]
        latest_pe = recent[-1]["pe"] if recent else None
        return (rows, latest_pe, history, None)
    except Exception as e:
        # adapter 改名/网络错误/参数错 → raise 不静默
        raise


# ============================================================
# ④ 主流程：38 只 stock → 写 pcb.auto.js
# ============================================================
def main():
    print(f'========================================')
    print(f'阶段三 commit 3.1 · baostock 单源 PE-TTM')
    print(f'========================================')
    print(f'asOf: {ASOF}')
    print(f'baostock version: {BAOSTOCK_VERSION}')
    print(f'window: {START_DATE} ~ {END_DATE} ({WINDOW_YEARS}y)')
    print(f'flag: {SOURCE_FLAG}')
    print(f'stamp: {BAOSTOCK_STAMP}')
    print()

    # 1) login baostock
    lg = bs.login()
    if lg.error_code != '0':
        raise RuntimeError(f'❌ baostock login 失败：{lg.error_code} {lg.error_msg}')
    print(f'✓ baostock login: {lg.error_msg}')

    # 2) 解析 38 只 stock
    codes = parse_stock_codes_from_manual()
    print(f'  codes: {", ".join(codes)}')
    print()

    # 3) 逐只拉 pe_ttm（连同 history 序列存进 auto.js·commit 3.2 自己算分位时不用重拉网络）
    success = []       # 有有效 pe_ttm
    loss_skip = []     # pe_ttm <= 0 或空（亏损股）
    failed = []        # 报错失败
    history_stats = {'min': 0, 'max': 0, 'total': 0}
    valuations = {}

    for i, code in enumerate(codes, 1):
        try:
            rows, latest_pe, history, err = fetch_pettm_series(code)
            if latest_pe is None:
                # 亏损股或全为空（commit 3.1.2：pe_history 保留历史有效数据·commit 3.2 算分位时可用）
                loss_skip.append(code)
                valuations[code] = {
                    'pe_ttm': None,
                    'pe_history': history,   # ★ 修 bug：不清空·保留历史有效数据（亏损前盈利期）
                    'source': {'pe': 'baostock.query_history_k_data_plus', 'verify': None, 'flag': f'{SOURCE_FLAG} · 亏损/PE无意义'},
                    'baostockStamp': BAOSTOCK_STAMP,
                    'asOf': ASOF
                }
                print(f'  [{i:2d}/{len(codes)}] {code} · 跳过（亏损/PE 无意义）· rows={rows} · history={len(history)}（保留历史有效数据）')
            else:
                success.append(code)
                valuations[code] = {
                    'pe_ttm': round(latest_pe, 4),
                    'pe_history': history,
                    'source': {'pe': 'baostock.query_history_k_data_plus', 'verify': None, 'flag': SOURCE_FLAG},
                    'baostockStamp': BAOSTOCK_STAMP,
                    'asOf': ASOF
                }
                history_stats['total'] += len(history)
                history_stats['min'] = min(history_stats['min'], len(history))
                history_stats['max'] = max(history_stats['max'], len(history))
                print(f'  [{i:2d}/{len(codes)}] {code} · OK · pe_ttm={latest_pe:.2f} · rows={rows} · history={len(history)}')
        except Exception as e:
            # 失败：保持 null，不填假数据（§6.8 数据准确度优先）
            failed.append((code, str(e)))
            valuations[code] = None
            print(f'  [{i:2d}/{len(codes)}] {code} · ❌ FAILED · {type(e).__name__}: {str(e)[:150]}')

    bs.logout()
    print()
    print(f'✓ baostock logout')

    # 4) 生成 data/pcb.auto.js（IIFE 包装 + window.PCB_AUTO）
    auto_js_content = build_auto_js(valuations, success, loss_skip, failed)
    AUTO_JS.write_text(auto_js_content, encoding='utf-8')
    print(f'✓ 写入 {AUTO_JS.name} ({len(auto_js_content)} chars)')

    # 5) 摘要
    print()
    print(f'========================================')
    print(f'摘要')
    print(f'========================================')
    print(f'成功（pe_ttm 有值）: {len(success)} 只')
    print(f'亏损跳过（pe_ttm<=0）: {len(loss_skip)} 只')
    print(f'失败（保留 null）:     {len(failed)} 只')
    print(f'总计:                  {len(codes)} 只')
    if success:
        avg = history_stats['total'] / len(success)
        print(f'pe_history 平均行数: {avg:.1f}（min={history_stats["min"]}, max={history_stats["max"]}, total={history_stats["total"]}）')
    if failed:
        print()
        print(f'失败列表:')
        for code, msg in failed:
            print(f'  {code}: {msg[:200]}')


def build_auto_js(valuations, success, loss_skip, failed):
    """生成 pcb.auto.js 内容（IIFE 包装）。"""
    # 计算失败 stock 列表（用于 _meta 字段）
    failed_codes = [c for c, _ in failed]
    # 拼接所有 valuation 行·每个对象后加逗号（JS 对象数组语法·最后一个也加·浏览器解析兼容）
    val_lines = [format_valuation_line(code, v) for code, v in valuations.items()]
    val_block = ',\n'.join(val_lines)
    return f"""// data/pcb.auto.js  —— 阶段三 commit 3.1：baostock 单源拉 38 只 stock pe_ttm 历史（5 年窗口）
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
//   source: {{ pe: '...', verify: null, flag: '...' }}（verify 留空等 commit 3.2 adata 补充）
//   baostockStamp: '0.9.2/<日期>'
//   asOf: '<YYYY-MM-DD>'
//
// commit 3.2 工作：算 pePercentile / fromHigh / entryZone（分位计算）· 不在本 commit 范围
window.PCB_AUTO = {{
  _meta: {{
    asOf: '{ASOF}',
    baostockVersion: '{BAOSTOCK_VERSION}',
    akshareVersion: null,
    window: '5y ({START_DATE} ~ {END_DATE})',
    note: '★ 阶段三 commit 3.1.2：baostock 单源拉 pe_ttm 历史+pe_history 序列·latest_pe 用距今 30 天内最后一条·亏损股保留历史有效数据（不清空 history·commit 3.2 可算历史分位）',
    sourceFlag: '{SOURCE_FLAG}',
    stats: {{
      success: {len(success)},
      lossSkip: {len(loss_skip)},
      failed: {len(failed)},
      failedCodes: {json.dumps(failed_codes, ensure_ascii=False)}
    }}
  }},
  valuations: {{
{val_block}
  }}
}};
"""


def format_valuation_line(code, val):
    """格式化单只 stock 的 valuation 输出（不带逗号·由 build_auto_js 加）。"""
    if val is None:
        return f"    '{code}': null   // ⚠️ 拉取失败·保持 null 不静默用估算覆盖（§6.8）"
    # ★ 修 bug：Python None 不能直接 f-string 到 JS（会变成 "None" 字面量）·必须显式转 JS null
    pe_ttm_js = 'null' if val['pe_ttm'] is None else val['pe_ttm']
    # ★ commit 3.1.1：pe_history 序列格式化为 [{date, pe}, ...] 数组（commit 3.2 算分位用）
    history = val.get('pe_history', [])
    if not history:
        history_js = '[]'
    else:
        # 全部数据·一行一条（紧凑格式·38 只 × ~1100 行 ≈ 1MB 文件可接受）
        history_js = '[\n' + ',\n'.join(
            f'      {{date: "{h["date"]}", pe: {h["pe"]}}}'
            for h in history
        ) + '\n    ]'
    return f"""    '{code}': {{
      pe_ttm: {pe_ttm_js},
      pe_history: {history_js},
      source: {{
        pe: '{val['source']['pe']}',
        verify: {('null' if val['source']['verify'] is None else repr(val['source']['verify']))},
        flag: {json.dumps(val['source']['flag'], ensure_ascii=False)}
      }},
      baostockStamp: '{val['baostockStamp']}',
      asOf: '{val['asOf']}'
    }}"""


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'\n❌ 脚本异常退出: {type(e).__name__}: {e}', file=sys.stderr)
        sys.exit(1)
