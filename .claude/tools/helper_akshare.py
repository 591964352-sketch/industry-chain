# -*- coding: utf-8 -*-
"""
helper_akshare.py · akshare 验证助手 v2
供 auto-verify.js 调用，返回 JSON
修复 akshare 1.18.60 + pandas 新版本兼容性问题
"""
import akshare as ak
import json
import os
import sys

# 修复 Windows GBK 编码
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CACHE_DIR = os.path.dirname(os.path.abspath(__file__))
SPOT_CACHE = os.path.join(CACHE_DIR, '_akshare_spot_cache.json')


def verify_code_name(code, expected_name):
    """验证1+2：code 是否存在 A 股 + 名称匹配"""
    try:
        df = ak.stock_info_a_code_name()
        match = df[df['code'] == code]
        if len(match) == 0:
            return {
                'valid': False, 'code': code, 'name': '',
                'error': 'code not found in A股 5528 只列表'
            }
        actual_name = str(match.iloc[0]['name']).strip()
        return {
            'valid': True,
            'code': code,
            'name': actual_name,
            'name_match': (actual_name == expected_name.strip()),
            'expected_name': expected_name
        }
    except Exception as e:
        return {'valid': False, 'code': code, 'error': str(e)[:200]}


def _get_spot_cached():
    """缓存 stock_zh_a_spot_em（首次拉取 90 秒，后续读缓存）"""
    if os.path.exists(SPOT_CACHE):
        with open(SPOT_CACHE, 'r', encoding='utf-8') as f:
            return json.load(f)
    df = ak.stock_zh_a_spot_em()
    records = df.to_dict(orient='records')
    with open(SPOT_CACHE, 'w', encoding='utf-8') as f:
        json.dump(records, f, ensure_ascii=False)
    return records


def get_indicator(code):
    """验证4：PE-TTM 等指标"""
    try:
        spot = _get_spot_cached()
        for r in spot:
            if str(r.get('代码', '')) == code:
                return {
                    'valid': True,
                    'code': code,
                    'name': r.get('名称', ''),
                    'pe_ttm': r.get('市盈率-动态'),
                    'pb': r.get('市净率'),
                    'price': r.get('最新价'),
                    'change_pct': r.get('涨跌幅'),
                    'market_cap': r.get('总市值')
                }
        return {'valid': False, 'code': code, 'error': 'not found in spot cache'}
    except Exception as e:
        return {'valid': False, 'code': code, 'error': str(e)[:200]}


def get_financial(code):
    """验证3：最新季报营收/净利"""
    try:
        df = ak.stock_financial_abstract(symbol=code)
        if df is None or len(df) == 0:
            return {'valid': False, 'code': code, 'error': 'empty financial data'}
        latest = df.iloc[0]
        return {
            'valid': True,
            'code': code,
            'report_date': str(latest.get('报告期', '')),
            'revenue': str(latest.get('营业总收入', '')),
            'net_profit': str(latest.get('净利润', '')),
            'roe': str(latest.get('净资产收益率', ''))
        }
    except Exception as e:
        return {'valid': False, 'code': code, 'error': str(e)[:200]}


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'help'
    if cmd == 'code':
        code = sys.argv[2]
        expected = sys.argv[3] if len(sys.argv) > 3 else ''
        print(json.dumps(verify_code_name(code, expected), ensure_ascii=False))
    elif cmd == 'indicator':
        code = sys.argv[2]
        print(json.dumps(get_indicator(code), ensure_ascii=False))
    elif cmd == 'financial':
        code = sys.argv[2]
        print(json.dumps(get_financial(code), ensure_ascii=False))
    elif cmd == 'warm-cache':
        # 预热 spot 缓存
        _ = _get_spot_cached()
        print(json.dumps({'cache_ready': True, 'path': SPOT_CACHE}, ensure_ascii=False))
    else:
        print(json.dumps({'error': 'unknown command: ' + cmd}, ensure_ascii=False))