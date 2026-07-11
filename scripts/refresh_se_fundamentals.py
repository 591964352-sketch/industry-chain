#!/usr/bin/env python3
"""refresh_se_fundamentals.py — semicon-equip 链 21 只 stock fundamentals 拉取脚本

数据源: akshare stock_financial_abstract_ths (同花顺财务摘要, L1 权威源 · §6.17)
用途: 补齐 semicon-equip.manual.js stocks[code].fundamentals 字段,
      消除渲染层"📊 待补"占位符

输出: se_fundamentals_batch.json (21 条 fundamentals 记录)
      供 CC 后续 Node.js 注入脚本读取并写入 semicon-equip.manual.js

执行: python scripts/refresh_se_fundamentals.py

依赖: akshare >= 1.18.60, pandas
"""

import akshare as ak
import json
import re
import sys
import traceback
from datetime import datetime

# ============================================================================
# 配置区
# ============================================================================

# semicon-equip 链全部 21 只 stock (来源: semicon-equip.manual.js stocks keys)
STOCK_CODES = [
    '688012',   # 中微公司    — CCP 刻蚀龙头
    '002371',   # 北方华创    — 综合设备龙头
    '688072',   # 拓荆科技    — PECVD/ALD 龙头
    '688120',   # 华海清科    — CMP 龙头
    '688037',   # 芯源微      — 涂胶显影龙头
    '688082',   # 盛美上海    — 清洗设备龙头
    '600641',   # 万业企业    — 离子注入 (凯世通母公司)
    '603690',   # 至纯科技    — 湿法清洗+特气
    '688765',   # 微导纳米    — ALD 设备
    '688200',   # 华峰测控    — 测试机龙头
    '300567',   # 精测电子    — 前道量测+后道测试
    '300604',   # 长川科技    — 后道测试机龙头
    '300316',   # 晶盛机电    — 晶体生长龙头
    '688502',   # 茂莱光学    — 光刻配套光学
    '002222',   # 福晶科技    — 非线性光学晶体
    '300293',   # 蓝英装备    — 光刻机清洗配套
    '603061',   # 金海通      — 测试分选机
    '688361',   # 中科飞测    — 前道量测+缺陷检测
    '301297',   # 富乐德      — 陶瓷清洗部件
    '688376',   # 美埃科技    — 洁净室FFU配套
    '300450',   # 先导智能    — 光伏锂电设备·半导体培育
]

OUTPUT_FILE = 'se_fundamentals_batch.json'

# ============================================================================
# 数据解析
# ============================================================================

def parse_pct(val) -> float | None:
    """解析百分比字符串, 如 '39.17%' → 39.17, '-5.30%' → -5.30"""
    if val is None:
        return None
    s = str(val).strip()
    if s in ('', '—', '-', 'N/A', 'nan'):
        return None
    s = s.replace('%', '').strip()
    try:
        return float(s)
    except ValueError:
        return None


def parse_yi(val) -> float | None:
    """解析'亿'后缀字符串, 如 '21.11亿' → 21.11, '-0.13亿' → -0.13"""
    if val is None:
        return None
    s = str(val).strip()
    if s in ('', '—', '-', 'N/A', 'nan'):
        return None
    s = s.replace('亿', '').strip()
    try:
        return float(s)
    except ValueError:
        return None


def compute_scissor(revenue_growth: float | None, net_profit_growth: float | None) -> str | None:
    """剪刀差判定:
    - danger: 营收正增长但净利负增长(增收不增利), 或营收降幅小于净利降幅
    - warn:   营收正增长但净利增速远低于营收增速(利润转化率低)
    - ok:     增速方向一致, 利润转化正常
    """
    if revenue_growth is None or net_profit_growth is None:
        return None

    rev = revenue_growth
    np = net_profit_growth

    # 增收不增利
    if rev > 0 and np < 0:
        return 'danger'
    # 双降且利润跌得更狠
    if rev < 0 and np < 0 and np < rev:
        return 'danger'
    # 增收但利润增速不到营收增速的一半
    if rev > 0 and np >= 0 and np < rev * 0.5:
        return 'warn'
    return 'ok'


# ============================================================================
# 主流程
# ============================================================================

def fetch_one(code: str) -> dict | None:
    """拉取单只 stock 的 fundamentals 数据"""
    try:
        df = ak.stock_financial_abstract_ths(symbol=code, indicator='按年度')
    except Exception as e:
        print(f'  ❌ {code} akshare 调用失败: {e}')
        return None

    if df is None or len(df) == 0:
        print(f'  ❌ {code} 返回空 DataFrame')
        return None

    # --- 取最新一行 ---
    latest = df.iloc[-1]
    period_raw = str(latest['报告期']).strip()

    # 提取原始值
    roe_raw       = latest['净资产收益率']        # 如 '9.97%'
    gm_raw        = latest['销售毛利率']          # 如 '39.17%'
    rev_yoy_raw   = latest['营业总收入同比增长率']  # 如 '36.62%'
    np_yoy_raw    = latest['净利润同比增长率']     # 如 '30.69%'
    net_profit_raw = latest['净利润']            # 如 '21.11亿' (用于验证)

    # 解析
    roe = parse_pct(roe_raw)
    gross_margin = parse_pct(gm_raw)
    revenue_growth = parse_pct(rev_yoy_raw)
    net_profit_growth = parse_pct(np_yoy_raw)
    net_profit_yi = parse_yi(net_profit_raw)

    # 剪刀差
    scissor = compute_scissor(revenue_growth, net_profit_growth)

    # 输出诊断
    flag = ''
    if net_profit_yi is not None and net_profit_yi < 0:
        flag = ' [LOSS]'

    print(f'  {code} | {period_raw} | ROE={roe}% GM={gross_margin}% '
          f'revYoY={revenue_growth}% npYoY={net_profit_growth}% '
          f'scissor={scissor} netProfit={net_profit_yi}bn{flag}')

    return {
        'code': code,
        'asOf': period_raw,
        'roe': roe,
        'grossMargin': gross_margin,
        'revenueGrowth': revenue_growth,
        'netProfitGrowth': net_profit_growth,
        'scissorGap': scissor,
        'source': 'akshare(stock_financial_abstract_ths)',
        '_fetchedAt': datetime.now().strftime('%Y-%m-%d %H:%M'),
        '_netProfit_yi': net_profit_yi,   # 辅助验证, 不写入 manual.js
    }


def main():
    print('=' * 70)
    print('semicon-equip fundamentals 拉取')
    print(f'目标: {len(STOCK_CODES)} 只 stock')
    print(f'数据源: akshare stock_financial_abstract_ths (按年度)')
    print('=' * 70)
    print()

    results = []
    failed = []

    for i, code in enumerate(STOCK_CODES, start=1):
        print(f'[{i:>2}/{len(STOCK_CODES)}] {code} ...')
        data = fetch_one(code)
        if data is None:
            failed.append(code)
        else:
            results.append(data)

    print()
    print('=' * 70)
    print(f'完成: {len(results)}/{len(STOCK_CODES)} 成功, {len(failed)} 失败')
    if failed:
        print(f'失败 codes: {", ".join(failed)}')
    print('=' * 70)

    # 快览
    print()
    print('--- scissorGap 分布 ---')
    from collections import Counter
    scissor_dist = Counter(r['scissorGap'] for r in results)
    for k, v in sorted(scissor_dist.items(), key=lambda x: str(x[0])):
        codes = [r['code'] for r in results if r['scissorGap'] == k]
        print(f'  {k}: {v} 只 — {", ".join(codes)}')

    print()
    print('--- 亏损/微利 stock ---')
    loss_stocks = [r for r in results if r['_netProfit_yi'] is not None and r['_netProfit_yi'] < 0]
    if loss_stocks:
        for r in loss_stocks:
            print(f'  {r["code"]} netProfit={r["_netProfit_yi"]}亿 ROE={r["roe"]}%')
    else:
        print('  全部盈利 ✓')

    # 写入 JSON
    output = {
        '_meta': {
            'description': 'semicon-equip 链 21 只 stock fundamentals 批量拉取结果',
            'source': 'akshare stock_financial_abstract_ths (按年度)',
            'fetchedAt': datetime.now().strftime('%Y-%m-%d %H:%M'),
            'totalStocks': len(results),
            'failedCodes': failed,
            'fields': ['code', 'asOf', 'roe', 'grossMargin', 'revenueGrowth',
                       'netProfitGrowth', 'scissorGap', 'source'],
        },
        'fundamentals': results,
    }

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f'\n[DONE] 结果已写入 {OUTPUT_FILE}')
    print(f'   CC 下一步: node scripts/__inject_se_fundamentals.js 注入 semicon-equip.manual.js')

    # 非零退出码表示有失败
    if failed:
        sys.exit(1)


if __name__ == '__main__':
    main()
