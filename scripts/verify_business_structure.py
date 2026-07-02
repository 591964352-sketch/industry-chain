#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/verify_business_structure.py
akshare stock_zygc_em 全量 38 只 stock 主营构成核对(2026-07-02 立)

用途:
  - 用 akshare stock_zygc_em 接口(底层走 emweb.securities.eastmoney.com)
    对 pcb.manual.js 全部 38 只 stock 拉取最新一期主营构成
  - 按 MAINOP_TYPE=2(产品)和 MAINOP_TYPE=1(行业)两个口径分别输出占比
  - 与 pcb.manual.js 中 position/investableReason 描述做对比
  - 输出差异清单:哪些一致 / 哪些有偏差(偏差幅度 + 错误点)

输出:
  - stdout: 摘要报告
  - .claude/scratch/business-structure-diff-<date>.json: 完整差异清单

不自动修改数据(任务 1 要求)。
"""

import sys
import io
import json
import time
import re
import requests
from datetime import datetime

# 强制 stdout UTF-8(避免 Windows GBK 控制台乱码)
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# ──────────── 加载 pcb.manual.js 38 只 stock code ────────────
import subprocess
result = subprocess.run(
    ['node', '-e',
     "global.window={};require('./data/pcb.manual.js');"
     "const stocks=Object.values(window.PCB_MANUAL.stocks);"
     "process.stdout.write(JSON.stringify(stocks.map(s=>({code:s.code,name:s.name,position:s.position||'',investableReason:s.investableReason||''}))));"],
    capture_output=True, encoding='utf-8', cwd='d:\\乌龟\\产业链全景'
)
stocks_meta = json.loads(result.stdout)
print(f'[1] 加载 pcb.manual.js 完成 · {len(stocks_meta)} 只 stock\n')

# ──────────── 拉取 akshare 主营构成 ────────────
def market_prefix(code):
    """A 股 code 前缀:6/5/9 开头 SH,0/3 开头 SZ"""
    if code.startswith(('6', '5', '9')):
        return 'SH' + code
    return 'SZ' + code

def fetch_zygc(code, retries=2):
    """emweb 接口:返回 zygcfx 列表(多期多 type)"""
    url = 'https://emweb.securities.eastmoney.com/PC_HSF10/BusinessAnalysis/PageAjax'
    for attempt in range(retries):
        try:
            r = requests.get(url, params={'code': market_prefix(code)}, timeout=10)
            r.encoding = 'gbk'
            data = r.json()
            zygcfx = data.get('zygcfx', [])
            if not zygcfx:
                return None
            # 取最新一期(按 REPORT_DATE 排序)
            latest_date = max(x['REPORT_DATE'] for x in zygcfx)
            latest = [x for x in zygcfx if x['REPORT_DATE'] == latest_date]
            return {'report_date': latest_date, 'rows': latest}
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1)
            else:
                return {'error': str(e)}

print('[2] 拉取 38 只 stock 主营构成...')
all_results = {}
errors = []
for i, s in enumerate(stocks_meta):
    code = s['code']
    print(f'  [{i+1}/{len(stocks_meta)}] {code} {s["name"]} ...', end=' ', flush=True)
    res = fetch_zygc(code)
    if res is None:
        print('FAIL (no data)')
        errors.append({'code': code, 'name': s['name'], 'reason': 'zygcfx 空'})
        continue
    if 'error' in res:
        print(f'FAIL ({res["error"]})')
        errors.append({'code': code, 'name': s['name'], 'reason': res['error']})
        continue
    # 按 MAINOP_TYPE 整理
    by_type = {'1': [], '2': [], '3': []}  # 行业 / 产品 / 地区
    for row in res['rows']:
        t = row.get('MAINOP_TYPE', '')
        ratio = float(row.get('MBI_RATIO', 0))
        if t in by_type:
            by_type[t].append({
                'item': row.get('ITEM_NAME', ''),
                'ratio_pct': round(ratio * 100, 2),
                'income_yi': round(float(row.get('MAIN_BUSINESS_INCOME', 0)) / 1e8, 2)
            })
    # 排序
    for t in by_type:
        by_type[t].sort(key=lambda x: -x['ratio_pct'])

    all_results[code] = {
        'name': s['name'],
        'position': s['position'],
        'investableReason': s['investableReason'],
        'report_date': res['report_date'],
        'by_industry': by_type['1'],
        'by_product': by_type['2'],
        'by_region': by_type['3']
    }
    print(f'OK · {res["report_date"]} · 行业 {len(by_type["1"])} 行 / 产品 {len(by_type["2"])} 行 / 地区 {len(by_type["3"])} 行')
    time.sleep(0.3)  # 避免请求过快

print(f'\n[3] 拉取完成 · 成功 {len(all_results)} / 失败 {len(errors)}\n')

# ──────────── 关键词提取 + 偏差检测 ────────────
# 提取 position / investableReason 中的占比数字 + 业务名
PCT_RE = re.compile(r'(\d+(?:\.\d+)?)\s*[%％]')
PCT_RANGE_RE = re.compile(r'(\d+(?:\.\d+)?)\s*[%％]\s*[-~到至]\s*(\d+(?:\.\d+)?)\s*[%％]')

# 数字周围出现这些关键词 → 跳过(非主营占比口径)
SKIP_KEYWORDS = [
    '同比', '增长', '增幅', '降幅', '增速',
    '市占率', '市占', '份额',
    '产能利用', '产能利用率',
    '良率', '合格率',
    '毛利率', '净利率', '净利同比',
    '产销率',
    'YoY', 'yoy',
    'PE分位', 'PE-TTM', 'PE-', '估值',
    '涨幅', '跌幅',
]

# 数字周围出现这些关键词 → 纳入(明确主营占比口径)
INCLUDE_KEYWORDS = [
    '占比', '占公司', '占主营', '营收占比', '主营占比',
    '占营业收入', '占营收', '营业总收入', '总营收占比', '收入占比'
]

def extract_caliber_marked_pcts(text):
    """仅提取文本中明确标注为'营收占比/主营占比'口径的 % 数字
    跳过:同比/+%/增速/YoY/市占率/产能利用率/良率/毛利率/净利率/估值等
    """
    if not text:
        return []
    results = []
    for m in re.finditer(r'(\d+(?:\.\d+)?)\s*[%％]', text):
        pct = float(m.group(1))
        start = max(0, m.start() - 20)
        end = min(len(text), m.end() + 8)
        context = text[start:end]

        # 跳过:任意跳过关键词出现在 context
        if any(kw in context for kw in SKIP_KEYWORDS):
            continue

        # 纳入:任意纳入关键词出现在 context
        if any(kw in context for kw in INCLUDE_KEYWORDS):
            results.append({'pct': pct, 'context': context})
            continue

        # 兜底:无明确口径标注 → 不纳入(避免误报)

    return results

# 保留旧 extract_pcts 以便日志输出跳过的数字
def extract_pcts(text):
    """提取文本中所有百分比数字(供日志)"""
    return [float(m) for m in PCT_RE.findall(text or '')]

def check_deviation(code, stock_data):
    """对单只 stock 检查 position/investableReason 中的占比描述与 akshare 真实数据偏差
    仅对比明确标注'主营占比/营收占比'口径的数字(extract_caliber_marked_pcts)
    """
    issues = []

    by_product = stock_data['by_product']
    by_industry = stock_data['by_industry']
    pos = stock_data['position']
    reason = stock_data['investableReason']

    if not by_product and not by_industry:
        return None  # 无主营构成数据

    # 提取文本中**明确标注主营占比**的数字
    text = (pos or '') + ' ' + (reason or '')
    text_pcts_marked = extract_caliber_marked_pcts(text)
    text_pcts_all = extract_pcts(text)
    text_pcts = [x['pct'] for x in text_pcts_marked]

    if not text_pcts:
        # 没有"占比"类数字 → 检查是否有"主营产品名"标注问题(产品名一致性独立判断)
        # 但不算偏差
        return None  # 文本中无主营占比数字,无法核对

    # 取 akshare 主营构成(产品口径)Top 1 占比作为对比基准
    main_ratio = by_product[0]['ratio_pct'] if by_product else (by_industry[0]['ratio_pct'] if by_industry else None)
    main_name = by_product[0]['item'] if by_product else (by_industry[0]['item'] if by_industry else None)

    if main_ratio is None:
        return None

    # 检查文本中的占比数字是否与主营占比差距过大
    worst_diff = 0
    worst_pct = None
    worst_ctx = None
    for item in text_pcts_marked:
        pct = item['pct']
        diff = abs(pct - main_ratio)
        if diff > worst_diff:
            worst_diff = diff
            worst_pct = pct
            worst_ctx = item['context']

    # 偏差 >5pp 算显著差异
    threshold = 5.0
    if worst_diff > threshold:
        issues.append({
            'type': '占比偏差',
            'main_product': main_name,
            'akshare_main_ratio': main_ratio,
            'text_pct': worst_pct,
            'diff_pp': round(worst_diff, 2),
            'text_context': worst_ctx
        })

    # 检查文本中的产品名是否与 akshare 一致(简单匹配)
    # 例如:文本说"锂电铜箔"但 akshare 是"PCB 铜箔"
    if by_product and main_name and pos:
        # akshare 主产品名是否在 position 文本里
        if main_name not in pos and main_name.replace(' ', '') not in pos.replace(' ', ''):
            # 检查 akshare 的次要产品是否在 position 里
            akshare_names = [x['item'] for x in by_product[:3]]
            in_position = [n for n in akshare_names if n in pos]
            if not in_position and akshare_names:
                issues.append({
                    'type': '产品名不一致',
                    'akshare_main': main_name,
                    'akshare_top3': akshare_names,
                    'position_excerpt': pos[:80]
                })

    return issues if issues else None

print('[4] 对比 position/investableReason 与 akshare 真实数据...\n')
diff_summary = {
    '一致': [],
    '显著偏差': [],
    '文本无占比无法核对': [],
    'akshare 拉取失败': errors
}

for code, stock_data in all_results.items():
    issues = check_deviation(code, stock_data)
    if issues is None:
        diff_summary['文本无占比无法核对'].append({'code': code, 'name': stock_data['name']})
    elif len(issues) == 0:
        diff_summary['一致'].append({'code': code, 'name': stock_data['name']})
    else:
        diff_summary['显著偏差'].append({
            'code': code,
            'name': stock_data['name'],
            'issues': issues
        })

# ──────────── 输出报告 ────────────
print('=' * 60)
print('【差异清单汇总】')
print('=' * 60)
print(f'  一致(无偏差): {len(diff_summary["一致"])}')
print(f'  显著偏差(>5pp 或产品名不一致): {len(diff_summary["显著偏差"])}')
print(f'  文本无占比无法核对: {len(diff_summary["文本无占比无法核对"])}')
print(f'  akshare 拉取失败: {len(diff_summary["akshare 拉取失败"])}')
print()

print('=' * 60)
print('【显著偏差清单】')
print('=' * 60)
for d in diff_summary['显著偏差']:
    print(f'\n  {d["code"]} {d["name"]}')
    for issue in d['issues']:
        if issue['type'] == '占比偏差':
            print(f'    [占比偏差] 主营={issue["main_product"]} akshare占比={issue["akshare_main_ratio"]}% / 文本占比={issue["text_pct"]}% / 偏差={issue["diff_pp"]}pp')
        elif issue['type'] == '产品名不一致':
            print(f'    [产品名不一致] akshare 主营={issue["akshare_main"]} / Top3={issue["akshare_top3"]}')
            print(f'      本地 position 摘录:{issue["position_excerpt"]}')

print()
print('=' * 60)
print('【一致清单】')
print('=' * 60)
for d in diff_summary['一致']:
    print(f'  {d["code"]} {d["name"]}')

print()
print('=' * 60)
print('【akshare 拉取失败清单】')
print('=' * 60)
for d in diff_summary['akshare 拉取失败']:
    print(f'  {d["code"]} {d["name"]} · {d["reason"]}')

# ──────────── 写差异清单到 JSON ────────────
out_path = f'.claude/scratch/business-structure-diff-{datetime.now().strftime("%Y-%m-%d")}.json'
try:
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump({
            'date': datetime.now().strftime('%Y-%m-%d'),
            'summary': {
                '一致': len(diff_summary['一致']),
                '显著偏差': len(diff_summary['显著偏差']),
                '文本无占比无法核对': len(diff_summary['文本无占比无法核对']),
                'akshare_拉取失败': len(diff_summary['akshare 拉取失败'])
            },
            'diff_list': diff_summary,
            'full_results': all_results
        }, f, ensure_ascii=False, indent=2)
    print(f'\n[5] 完整差异清单已写入:{out_path}')
except Exception as e:
    print(f'\n[5] JSON 写入失败:{e}')
    import traceback
    traceback.print_exc()