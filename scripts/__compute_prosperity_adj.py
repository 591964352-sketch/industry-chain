#!/usr/bin/env python3
"""__compute_prosperity_adj.py — 景气度调整系数试算
拉取 PCB 38 只 stock 的 baostock/akshare 3 年营收/净利数据，
计算 CAGR + 盈利质量因子，试算 19 只虚高 stock 的调整后 valuation score。
"""

import akshare as ak
import json
import sys
import traceback
from datetime import datetime
from decimal import Decimal, Context, ROUND_HALF_EVEN

_CTX = Context(prec=28, rounding=ROUND_HALF_EVEN)

def exact(value):
    if isinstance(value, Decimal): return value
    if isinstance(value, float): return Decimal(str(value))
    return Decimal(str(value))

def parse_yi(val):
    """解析亿/万元后缀的金额字符串"""
    if val is None: return None
    s = str(val).strip().replace(',', '').replace('，', '')
    if s in ('', '—', '-', 'N/A', 'nan'): return None
    unit = 1.0
    if '万' in s: s = s.replace('万', ''); unit = 0.0001
    elif '亿' in s: s = s.replace('亿', '')
    try: return float(s) * unit
    except: return None

# PCB 38 stocks (from pcb.manual.js stock keys)
PCB_CODES = [
    '000657','001389','002080','002384','002436','002463','002636','002913',
    '002916','002938','300179','300395','300476','300522','301150','301200',
    '301217','301377','301511','600110','600176','600183','603002','603186',
    '603228','603256','603519','603650','603920','603936','605006','605589',
    '688183','688300','688388','688630','688700','601208',
]

# 前缀映射 (简化版 — baostock 不可用，直接用 akshare ths)
# akshare ths 接口不需要前缀

results = {}
failed = []

print(f'拉取 {len(PCB_CODES)} 只 stock...')
for i, code in enumerate(PCB_CODES):
    try:
        df = ak.stock_financial_abstract_ths(symbol=code, indicator='按年度')
    except Exception as e:
        print(f'  [{i+1:>2}/{len(PCB_CODES)}] {code} ❌ {e}')
        failed.append(code)
        continue

    if df is None or len(df) < 3:
        print(f'  [{i+1:>2}/{len(PCB_CODES)}] {code} ⚠ rows={len(df) if df is not None else 0}')
        failed.append(code)
        continue

    # 取最近 4 年（2022-2025），计算 2023→2025 的 3 年 CAGR
    years_data = []
    for row_idx in range(len(df)):
        row = df.iloc[row_idx]
        period = str(row['报告期']).strip()
        rev = parse_yi(row['营业总收入'])
        np_ = parse_yi(row['净利润'])
        if rev is not None and np_ is not None:
            years_data.append({'period': period, 'rev': rev, 'np': np_})

    if len(years_data) < 3:
        print(f'  [{i+1:>2}/{len(PCB_CODES)}] {code} ⚠ valid years={len(years_data)}')
        failed.append(code)
        continue

    # 取最后 4 年
    recent = years_data[-4:] if len(years_data) >= 4 else years_data[-3:]

    # 计算 CAGR
    first = recent[0]
    last = recent[-1]
    n_years = len(recent) - 1  # e.g. 2022→2023→2024→2025 = 3 years

    if first['rev'] <= 0 or last['rev'] <= 0:
        rev_cagr = None
    else:
        rev_cagr = float((exact(last['rev']) / exact(first['rev'])) ** (Decimal(1)/Decimal(n_years)) - 1) * 100

    # 净利 CAGR — 处理负值
    if first['np'] <= 0:
        np_cagr = None  # 从亏损起步，CAGR 无意义
    elif last['np'] <= 0:
        np_cagr = None
    else:
        np_cagr = float((exact(last['np']) / exact(first['np'])) ** (Decimal(1)/Decimal(n_years)) - 1) * 100

    # 盈利质量因子
    if rev_cagr is not None and np_cagr is not None:
        if np_cagr >= rev_cagr * 0.7:
            quality = 1.0
        elif np_cagr >= rev_cagr * 0.3:
            quality = 0.6
        else:
            quality = 0.3
    elif rev_cagr is not None and np_cagr is None:
        quality = 0.3  # 亏损或无法计算 → 最低质量
    else:
        quality = 0.3

    # 景气调整量
    if rev_cagr is None:
        adj = 0
    elif rev_cagr >= 40:
        adj = -25 * quality
    elif rev_cagr >= 25:
        adj = -18 * quality
    elif rev_cagr >= 15:
        adj = -10 * quality
    elif rev_cagr >= 5:
        adj = -5 * quality
    else:
        adj = 0

    results[code] = {
        'periods': f"{first['period']}→{last['period']}",
        'rev_first': round(first['rev'], 2),
        'rev_last': round(last['rev'], 2),
        'np_first': round(first['np'], 2),
        'np_last': round(last['np'], 2),
        'rev_cagr': round(rev_cagr, 1) if rev_cagr is not None else None,
        'np_cagr': round(np_cagr, 1) if np_cagr is not None else None,
        'quality': quality,
        'adj': round(adj, 1),
        'rev_yoy': round(float((exact(last['rev']) / exact(recent[-2]['rev']) - 1) * 100), 1) if len(recent) >= 2 and recent[-2]['rev'] > 0 else None,
    }
    flag = ''
    if last['np'] <= 0: flag = ' [LOSS]'
    if rev_cagr is None: flag += ' [NO_CAGR]'
    print(f'  [{i+1:>2}/{len(PCB_CODES)}] {code} | {first["period"]}→{last["period"]} | revCAGR={results[code]["rev_cagr"]}% npCAGR={results[code]["np_cagr"]}% | quality={quality} adj={adj:.0f}pp{flag}')

print(f'\n{"="*60}')
print(f'成功: {len(results)}/{len(PCB_CODES)}, 失败: {len(failed)}')
if failed: print(f'失败: {", ".join(failed)}')

# Save
output = {
    '_meta': {'date': datetime.now().strftime('%Y-%m-%d %H:%M'), 'source': 'akshare stock_financial_abstract_ths'},
    'results': results,
    'failed': failed,
}
with open('.claude/scratch/pcb_cagr_data.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)
print(f'数据已保存: .claude/scratch/pcb_cagr_data.json')
