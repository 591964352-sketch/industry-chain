# -*- coding: utf-8 -*-
"""
scripts/fetch_fundamentals.py
★ commit 4.38：从 akshare 拉取每只 stock 最新一期季报基本面数据 · 注入 pcb.manual.js 的 fundamentals 字段

背景（commit 4.38 立）：
  · pcb.manual.js 长期缺基本面质量层（ROE / 毛利率 / 营收净利同比 / 自由现金流 / 剪刀差预警）
  · 信号扫描只覆盖估值 + 量价 · 缺基本面维度 · 无法识别"高估值但盈利强劲"vs"高估值且盈利恶化"
  · 本脚本补这一层 · 为 §6.11 三重核验（业务归属校验）提供数据基础

数据源（akshare 三个接口 · 组合使用）：
  1. ak.stock_profit_sheet_by_report_em(symbol='SH601208')
       → 利润表（营收/营业成本/归母净利润 + 同比 _YOY 字段）
       → 报告期最新 = 2026-Q1
  2. ak.stock_balance_sheet_by_report_em(symbol='SH601208')
       → 资产负债表（TOTAL_PARENT_EQUITY 归母净资产）
  3. ak.stock_cash_flow_sheet_by_report_em(symbol='SH601208')
       → 现金流量表（NETCASH_OPERATE 经营现金流 / NETCASH_INVEST 投资现金流）

派生字段计算口径（避免引入估值主观判断）：
  · ROE（★ commit 4.58）优先 akshare 利润表 ROEJQ 字段（加权平均·季报披露口径·与同花顺/巨潮 F10 一致）·
    降级用年化近似（当季归母净利 × 4 / 最新归母净资产 × 100）· 降级时在 note 标注 "（近似值）"
  · 毛利率（%）= (营收 - 营业成本) / 营收 × 100
  · 营收同比（%）= TOTAL_OPERATE_INCOME_YOY（接口直接给）
  · 净利同比（%）= PARENT_NETPROFIT_YOY（接口直接给）
  · 自由现金流（FCF）= NETCASH_OPERATE + NETCASH_INVEST
       fcfPositive = (FCF > 0)
  · 毛利率趋势（grossMarginTrend）：
      当期 vs 上一期（去年同期同类型报告）
      差值 > 0.5pp → up
      差值 < -0.5pp → down
      否则 → flat
  · 剪刀差预警（scissorGap）：
      净利增速 < 营收增速 - 5pp → warn（增收不增利）
      净利增速 < 0 且 营收增速 > 0 → danger（最严重）
      否则 → ok

注入目标（pcb.manual.js）：
  每只 stock 块新增 `fundamentals: { asOf, roe, grossMargin, grossMarginTrend,
                                       revenueGrowth, netProfitGrowth, fcfPositive,
                                       scissorGap, note, source }`

幂等性（commit 4.38 硬约束）：
  · fundamentals 字段已存在 → 覆盖更新 · 不重复插入
  · 失败 → fundamentals 字段保留结构但值为 null + _fetchError 说明
  · 不阻断其他 stock 继续拉取

硬约束（§6.2 + §6.8）：
  · 只注入 / 覆盖 pcb.manual.js 的 fundamentals 字段 · 不动其他字段
  · akshare 是「覆盖广但非 primary」的二级数据源 · §6.4 单源不充分 → 在 commit message 里标 ⚪单源待核
"""

import argparse
import io
import json
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANUAL_JS = ROOT / 'data' / 'pcb.manual.js'


# ==================== Windows GBK 控制台兼容 ====================
if sys.platform == 'win32':
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    except Exception:
        pass


# ==================== akshare 前缀映射 ====================
def to_akshare_symbol(code):
    """6 位 stock code → akshare EM 接口 symbol 格式（'SH601208' / 'SZ002463'）"""
    if code.startswith(('60', '688')):
        return f'SH{code}'
    if code.startswith(('00', '30')):
        return f'SZ{code}'
    raise ValueError(f'未知 A 股 code 前缀: {code}')


# ==================== 加载 pcb.manual.js stocks ====================
def load_pcb_manual_stocks():
    """用 Node 子进程加载 pcb.manual.js 提取 stocks 字典的 code 列表。"""
    node_code = """
global.window = {};
require('./data/pcb.manual.js');
const stocks = global.window.PCB_MANUAL.stocks || {};
const result = Object.keys(stocks).filter(c => stocks[c] && stocks[c].code && stocks[c].name);
process.stdout.write(JSON.stringify(result));
"""
    proc = subprocess.run(
        ['node', '-e', node_code],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding='utf-8'
    )
    if proc.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.manual.js 失败:\n{proc.stderr}')
    return json.loads(proc.stdout)


# ==================== akshare 拉取三表 ====================
def fetch_three_statements(code):
    """拉取一只 stock 的利润表 / 资产负债表 / 现金流量表（EM 接口）。

    Returns:
        dict: {
          'profit': DataFrame,    # 利润表（按报告期 · 最新在前）
          'balance': DataFrame,   # 资产负债表（按报告期 · 最新在前）
          'cashflow': DataFrame,  # 现金流量表（按报告期 · 最新在前）
        }

    Raises:
        RuntimeError: 任一接口失败
    """
    try:
        import akshare as ak
    except ImportError:
        raise RuntimeError('akshare 未安装（pip install akshare）')

    symbol = to_akshare_symbol(code)
    profit = ak.stock_profit_sheet_by_report_em(symbol=symbol)
    balance = ak.stock_balance_sheet_by_report_em(symbol=symbol)
    cashflow = ak.stock_cash_flow_sheet_by_report_em(symbol=symbol)
    if profit is None or len(profit) == 0:
        raise RuntimeError('利润表为空')
    if balance is None or len(balance) == 0:
        raise RuntimeError('资产负债表为空')
    if cashflow is None or len(cashflow) == 0:
        raise RuntimeError('现金流量表为空')
    return {'profit': profit, 'balance': balance, 'cashflow': cashflow}


# ==================== 派生字段计算 ====================
def compute_fundamentals(code, stmts):
    """从三表 DataFrame 提取并计算基本面字段。

    Args:
        code: stock code
        stmts: dict {profit, balance, cashflow} 三表 DataFrame（最新行在前）

    Returns:
        dict: { asOf, roe, grossMargin, grossMarginTrend, revenueGrowth,
                netProfitGrowth, fcfPositive, scissorGap, note, source, _fetchError? }
    """
    import pandas as pd

    profit = stmts['profit']
    balance = stmts['balance']
    cashflow = stmts['cashflow']

    # 最新行（df 按 REPORT_DATE 降序 · 第 0 行 = 最新）
    p_curr = profit.iloc[0]
    b_curr = balance.iloc[0]
    c_curr = cashflow.iloc[0]

    # pandas Timestamp 化（接口返回有时是 str · 统一转 Timestamp 以调用 .year / .month）
    as_of_date = pd.Timestamp(p_curr['REPORT_DATE'])
    as_of_type = str(p_curr['REPORT_TYPE'])

    # 1) 营收 + 营业成本
    revenue = float(p_curr['TOTAL_OPERATE_INCOME']) if pd.notna(p_curr['TOTAL_OPERATE_INCOME']) else None
    op_cost = float(p_curr['OPERATE_COST']) if pd.notna(p_curr['OPERATE_COST']) else None

    # 2) 毛利率（自算）
    gross_margin = None
    if revenue and op_cost and revenue > 0:
        gross_margin = round((1 - op_cost / revenue) * 100, 2)

    # 3) 归母净利润 + 同比
    net_profit = float(p_curr['PARENT_NETPROFIT']) if pd.notna(p_curr['PARENT_NETPROFIT']) else None
    rev_growth = float(p_curr['TOTAL_OPERATE_INCOME_YOY']) if pd.notna(p_curr['TOTAL_OPERATE_INCOME_YOY']) else None
    np_growth = float(p_curr['PARENT_NETPROFIT_YOY']) if pd.notna(p_curr['PARENT_NETPROFIT_YOY']) else None

    # 4) ROE（★ commit 4.59：优先 2025 年报全年口径 · 降级 ROEJQ · 降级年化近似）
    equity = float(b_curr['TOTAL_PARENT_EQUITY']) if pd.notna(b_curr['TOTAL_PARENT_EQUITY']) else None
    roe = None
    roe_source = None   # 标识 ROE 来源（'annual' / 'ROEJQ' / 'approx' / None）· 用于 note 标注

    # ★ commit 4.59：找 2025 年报数据（profit + balance）
    annual_profit = None
    annual_balance = None
    for _i in range(len(profit)):
        _row = profit.iloc[_i]
        _row_date = pd.Timestamp(_row['REPORT_DATE'])
        if _row_date.year == 2025 and str(_row['REPORT_TYPE']) == '年报':
            annual_profit = _row
            break
    for _j in range(len(balance)):
        _brow = balance.iloc[_j]
        _brow_date = pd.Timestamp(_brow['REPORT_DATE'])
        if _brow_date.year == 2025 and str(_brow['REPORT_TYPE']) == '年报':
            annual_balance = _brow
            break

    # ★ commit 4.59：优先用 2025 年报全年口径（与巨潮/同花顺 F10 公告一致）
    if annual_profit is not None and annual_balance is not None:
        _annual_net = float(annual_profit['PARENT_NETPROFIT']) if pd.notna(annual_profit['PARENT_NETPROFIT']) else None
        _annual_eq = float(annual_balance['TOTAL_PARENT_EQUITY']) if pd.notna(annual_balance['TOTAL_PARENT_EQUITY']) else None
        if _annual_net is not None and _annual_eq and _annual_eq > 0:
            roe = round((_annual_net / _annual_eq) * 100, 2)
            roe_source = 'annual'

    # ★ commit 4.59：新增 roeQuarterly 字段（单季 ROE，不年化·真实反映当季盈利能力）
    roe_quarterly = None
    if net_profit is not None and equity and equity > 0:
        roe_quarterly = round((net_profit / equity) * 100, 2)

    # ★ 降级 1：ROEJQ 字段（commit 4.58 保留·若未来 akshare 升级支持）
    if roe is None and 'ROEJQ' in profit.columns:
        _roe_jq = float(p_curr['ROEJQ']) if pd.notna(p_curr['ROEJQ']) else None
        if _roe_jq is not None and -100 < _roe_jq < 100:
            roe = round(_roe_jq, 2)
            roe_source = 'ROEJQ'
    # ★ 降级 2：年化近似（commit 4.38 旧版逻辑·最后兜底）
    if roe is None:
        if net_profit is not None and equity and equity > 0:
            roe = round((net_profit * 4 / equity) * 100, 2)
            roe_source = 'approx'

    # 5) 自由现金流 FCF = 经营 + 投资
    op_cf = float(c_curr['NETCASH_OPERATE']) if pd.notna(c_curr['NETCASH_OPERATE']) else None
    inv_cf = float(c_curr['NETCASH_INVEST']) if pd.notna(c_curr['NETCASH_INVEST']) else None
    fcf = None
    fcf_positive = None
    if op_cf is not None and inv_cf is not None:
        fcf = round((op_cf + inv_cf) / 1e8, 4)  # 单位：亿元
        fcf_positive = (fcf > 0)

    # 6) 毛利率趋势（grossMarginTrend）· 与上一期（去年同期同类型）比较
    gross_margin_trend = None
    if gross_margin is not None:
        # 找去年同期同类型报告（如 2026-Q1 → 2025-Q1）
        prev_year = as_of_date.year - 1
        prev_match = None
        for i in range(1, min(len(profit), 6)):  # 看最近 5 条历史
            row = profit.iloc[i]
            row_date = pd.Timestamp(row['REPORT_DATE'])
            if (row_date.year == prev_year
                    and row_date.month == as_of_date.month
                    and str(row['REPORT_TYPE']) == as_of_type):
                prev_match = row
                break
        if prev_match is not None:
            prev_rev = float(prev_match['TOTAL_OPERATE_INCOME']) if pd.notna(prev_match['TOTAL_OPERATE_INCOME']) else None
            prev_cost = float(prev_match['OPERATE_COST']) if pd.notna(prev_match['OPERATE_COST']) else None
            if prev_rev and prev_cost and prev_rev > 0:
                prev_gm = (1 - prev_cost / prev_rev) * 100
                diff = gross_margin - prev_gm
                if diff > 0.5:
                    gross_margin_trend = 'up'
                elif diff < -0.5:
                    gross_margin_trend = 'down'
                else:
                    gross_margin_trend = 'flat'
        if gross_margin_trend is None:
            gross_margin_trend = 'flat'  # 无对比数据 → 默认 flat

    # 7) 剪刀差预警（scissorGap）
    scissor_gap = None
    if rev_growth is not None and np_growth is not None:
        if np_growth < 0 and rev_growth > 0:
            scissor_gap = 'danger'
        elif np_growth < (rev_growth - 5):
            scissor_gap = 'warn'
        else:
            scissor_gap = 'ok'

    # 8) 一句话 note（基于关键指标自动生成）
    note_parts = []
    if roe is not None:
        # ★ commit 4.59：年报口径 / 近似值标注
        if roe_source == 'annual':
            roe_note = f'ROE(年报) {roe}%'
        elif roe_source == 'approx':
            roe_note = f'ROE(近似) {roe}%'
        elif roe_source == 'ROEJQ':
            roe_note = f'ROE(加权) {roe}%'
        else:
            roe_note = f'ROE {roe}%'
        note_parts.append(roe_note)
    if gross_margin is not None:
        note_parts.append(f'毛利 {gross_margin}%')
    if rev_growth is not None and np_growth is not None:
        note_parts.append(f'营收/净利同比 {rev_growth:+.1f}%/{np_growth:+.1f}%')
    if fcf_positive is not None:
        note_parts.append('FCF+' if fcf_positive else 'FCF-')
    if scissor_gap and scissor_gap != 'ok':
        note_parts.append(f'剪刀差={scissor_gap}')
    note = ' · '.join(note_parts) if note_parts else '数据待补'

    # 9) 数据日期 label（asOf 用 "2026-Q1" 格式）
    if as_of_date.month == 3:
        as_of_label = f'{as_of_date.year}-Q1'
    elif as_of_date.month == 6:
        as_of_label = f'{as_of_date.year}-Q2'
    elif as_of_date.month == 9:
        as_of_label = f'{as_of_date.year}-Q3'
    elif as_of_date.month == 12:
        as_of_label = f'{as_of_date.year}-Q4'
    else:
        as_of_label = f'{as_of_date.year}-{as_of_type}'

    return {
        'asOf': as_of_label,
        'roe': roe,
        'roeQuarterly': roe_quarterly,   # ★ commit 4.59：单季 ROE·不年化
        'grossMargin': gross_margin,
        'grossMarginTrend': gross_margin_trend,
        'revenueGrowth': rev_growth,
        'netProfitGrowth': np_growth,
        'fcfPositive': fcf_positive,
        'scissorGap': scissor_gap,
        'note': note,
        'source': 'akshare(stock_profit_sheet_by_report_em + stock_balance_sheet_by_report_em + stock_cash_flow_sheet_by_report_em)'
    }


def pd_timestamp(year, month, day):
    """构造 pandas Timestamp（避免触发 datelib 异常）"""
    import pandas as pd
    return pd.Timestamp(year=year, month=month, day=day)


# ==================== 注入到 pcb.manual.js ====================
def _format_value(v):
    """格式化注入值 · null / bool / str / number 区分。"""
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, str):
        # 转义内部单引号
        return "'" + v.replace('\\', '\\\\').replace("'", "\\'") + "'"
    if isinstance(v, (int, float)):
        return repr(v)
    return repr(v)


def find_stock_block_range(text, code):
    """找到 pcb.manual.js 里 stock code 对应块的 [start, end] 范围。

    重要：stock 块结构是 `    'CODE': { ... }`（4 空格缩进）。返回 (start, end, line_no)：
      · start = `    'CODE': {` 行起始字符索引
      · end = 匹配 `}` 字符索引
      · line_no = start 所在行号

    防错位：只匹配文件**第一个** `    'CODE': {`（用 search 而非 findall），且用花括号深度跟踪定位 end。

    Returns:
        (start_idx, end_idx, line_no) · 找不到返回 None
    """
    pat = re.compile(rf"^    '{re.escape(code)}': \{{", re.MULTILINE)
    m = pat.search(text)
    if not m:
        return None
    start = m.end()
    depth = 1
    i = start
    while i < len(text) and depth > 0:
        ch = text[i]
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                line_no = text[:m.start()].count('\n') + 1
                return (m.start(), i, line_no)
        i += 1
    return None


def inject_fundamentals(code, fundamentals):
    """把 fundamentals dict 注入到 pcb.manual.js 对应 stock 块。

    注入策略（幂等性 + 防错位）：
      · 步骤 1: 用花括号跟踪找到 stock 块的 [start, end] 范围
      · 步骤 2: 检查此范围内是否已存在 fundamentals 字段
        - 是 → 覆盖
        - 否 → 在 stock 块结尾 `}` 前插入
      · 不依赖 '},' 字符匹配或非贪婪 `[\s\S]*?`（避免误匹配其他 stock 的字段）

    Returns:
        str: 'injected' | 'overwritten' | 'failed'
        str: error message if failed
    """
    text = MANUAL_JS.read_text(encoding='utf-8')

    # 构造新值（11 字段 · ★ commit 4.59 加 roeQuarterly）
    inner_lines = []
    for k in ['asOf', 'roe', 'roeQuarterly', 'grossMargin', 'grossMarginTrend', 'revenueGrowth', 'netProfitGrowth', 'fcfPositive', 'scissorGap', 'note', 'source']:
        v = fundamentals.get(k)
        inner_lines.append(f"        {k}: {_format_value(v)},")
    fund_block_inner = '{\n' + '\n'.join(inner_lines) + '\n      }'

    # 步骤 1: 花括号跟踪找 stock 块 [start, end]
    rng = find_stock_block_range(text, code)
    if rng is None:
        return 'failed', f'pcb.manual.js 中未找到 stock {code} 块（花括号跟踪失败）'
    block_start, block_end, _ = rng
    block_text = text[block_start:block_end + 1]   # 含结束 `}`

    # 步骤 2: 检查此 stock 块内是否已存在 fundamentals 字段
    fund_pat = re.compile(
        r"^      fundamentals: \{[^}]*\},?",
        re.MULTILINE
    )
    fund_match = fund_pat.search(block_text)

    if fund_match:
        # 路径 A: 覆盖现有 fundamentals 块（只在 stock 块范围内 · 不会越界）
        new_block_text = fund_pat.sub(
            f"      fundamentals: {fund_block_inner},",
            block_text,
            count=1
        )
        new_text = text[:block_start] + new_block_text + text[block_end + 1:]
        MANUAL_JS.write_text(new_text, encoding='utf-8')
        return 'overwritten', None

    # 路径 B: 不存在 → 在 stock 块 `}` 前插入
    # 检查前一个非空白字符是不是 `,`（防 peAbsMax:120 后缺逗号）
    k = block_end - 1
    while k >= 0 and text[k] in ' \t\n':
        k -= 1
    last_non_ws = text[k] if k >= 0 else ''
    insert_text = f"      fundamentals: {fund_block_inner},\n"
    if last_non_ws != ',':
        new_text = text[:block_end] + ',' + '\n' + insert_text + text[block_end:]
    else:
        new_text = text[:block_end] + '\n' + insert_text + text[block_end:]
    MANUAL_JS.write_text(new_text, encoding='utf-8')
    return 'injected', None


def find_stock_block_range(text, code):
    """找到 pcb.manual.js 里 stock code 对应块的 [start, end] 范围。

    重要：stock 块结构是 `    'CODE': { ... }`（4 空格缩进）。返回 (start, end, line_no)：
      · start = `    'CODE': {` 行起始字符索引
      · end = 匹配 `}` 字符索引
      · line_no = start 所在行号

    防错位：只匹配文件**第一个** `    'CODE': {`（用 search 而非 findall），且用花括号深度跟踪定位 end。

    Returns:
        (start_idx, end_idx, line_no) · 找不到返回 None
    """
    pat = re.compile(rf"^    '{re.escape(code)}': \{{", re.MULTILINE)
    m = pat.search(text)
    if not m:
        return None
    start = m.end()
    depth = 1
    i = start
    while i < len(text) and depth > 0:
        ch = text[i]
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                line_no = text[:m.start()].count('\n') + 1
                return (m.start(), i, line_no)
        i += 1
    return None


# ==================== 主流程 ====================
def main():
    parser = argparse.ArgumentParser(
        description='从 akshare 拉取基本面数据 · 注入 pcb.manual.js 的 fundamentals 字段',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--limit', type=int, default=None,
        help='限制处理的 stock 数（测试用）'
    )
    parser.add_argument(
        '--code', type=str, default=None,
        help='只处理指定 stock code（测试用）'
    )
    args = parser.parse_args()

    print('=' * 60)
    print(f'[FUNDAMENTALS] commit 4.38 · 基本面质量层注入')
    print(f'   开始时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    print(f'   数据源: akshare EM 接口（三表）')
    print('=' * 60)
    print()
    sys.stdout.flush()

    # 1) 加载 stock code 列表
    print('加载 pcb.manual.js ...')
    codes = load_pcb_manual_stocks()
    if args.code:
        codes = [c for c in codes if c == args.code]
    if args.limit:
        codes = codes[:args.limit]
    print(f'  [OK] 待处理 {len(codes)} 只 stock')
    print()
    sys.stdout.flush()

    # 2) 逐只拉取
    success_count = 0
    failed_count = 0
    injected_count = 0
    overwritten_count = 0

    for i, code in enumerate(codes, 1):
        t0 = time.time()
        try:
            stmts = fetch_three_statements(code)
            fundamentals = compute_fundamentals(code, stmts)
            status, err = inject_fundamentals(code, fundamentals)
            if status == 'failed':
                failed_count += 1
                print(f'  [{i:2d}/{len(codes)}] {code} · [FAIL] 注入失败: {err}')
            elif status == 'injected':
                injected_count += 1
                success_count += 1
                elapsed = time.time() - t0
                f = fundamentals
                print(f'  [{i:2d}/{len(codes)}] {code} · [NEW]   roe={f["roe"]}  gm={f["grossMargin"]}  '
                      f'revG={f["revenueGrowth"]}  npG={f["netProfitGrowth"]}  fcf+={f["fcfPositive"]}  '
                      f'scissor={f["scissorGap"]}  ({elapsed:.1f}s)')
            elif status == 'overwritten':
                overwritten_count += 1
                success_count += 1
                elapsed = time.time() - t0
                f = fundamentals
                print(f'  [{i:2d}/{len(codes)}] {code} · [UPD]   roe={f["roe"]}  gm={f["grossMargin"]}  '
                      f'revG={f["revenueGrowth"]}  npG={f["netProfitGrowth"]}  fcf+={f["fcfPositive"]}  '
                      f'scissor={f["scissorGap"]}  ({elapsed:.1f}s)')
        except Exception as e:
            failed_count += 1
            elapsed = time.time() - t0
            print(f'  [{i:2d}/{len(codes)}] {code} · [FAIL] {type(e).__name__}: {str(e)[:80]}  ({elapsed:.1f}s)')
        sys.stdout.flush()

    print()
    print('=' * 60)
    print(f'[FUNDAMENTALS] 摘要')
    print(f'   总数: {len(codes)} 只')
    print(f'   成功: {success_count} 只')
    print(f'     - 新增注入: {injected_count} 只')
    print(f'     - 覆盖更新: {overwritten_count} 只')
    print(f'   失败: {failed_count} 只')
    print(f'   完成时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    print('=' * 60)

    if failed_count > 0:
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
