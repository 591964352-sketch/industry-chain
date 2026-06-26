"""
scripts/fetch_close_history_series.py
★ commit 4.57：拉 close_history 序列·输出独立文件 data/pcb.close_history.js

输入：baostock（优先）/ akshare（降级）
输出：data/pcb.close_history.js（IIFE 包裹 window.PCB_CLOSE_HISTORY 字典）

设计理由：避免 pcb.auto.js 膨胀（4.2 MB → 6.5 MB）· 独立文件按需加载
§6.2 红线：不写入 pcb.manual.js
§6.8 数据准确度优先：拉取失败时该 stock 不写入·不覆盖
"""
import re, sys, json
from pathlib import Path
from datetime import datetime

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parent.parent
AUTO_JS = ROOT / 'data' / 'pcb.auto.js'
OUTPUT_JS = ROOT / 'data' / 'pcb.close_history.js'
START_DATE = '2021-06-23'  # 与 pe_history 对齐
END_DATE = datetime.now().strftime('%Y-%m-%d')


def to_baostock_code(code):
    if code.startswith('60') or code.startswith('688'): return f'sh.{code}'
    if code.startswith('00') or code.startswith('30'): return f'sz.{code}'
    raise ValueError(f'未知 code: {code}')


def fetch_close_baostock(code):
    """baostock 单源拉取（★ commit 4.57 修复：加 login/logout）"""
    try:
        import baostock as bs
        bs.login()
        rs = bs.query_history_k_data_plus(
            to_baostock_code(code), 'date,close',
            start_date=START_DATE, end_date=END_DATE,
            frequency='d', adjustflag='2')
        data_list = []
        while (rs.error_code == '0') and rs.next():
            r = rs.get_row_data()
            if r[1]:
                try: data_list.append({'date': r[0], 'close': round(float(r[1]), 2)})
                except ValueError: continue
        bs.logout()
        return (data_list, None) if data_list else (None, 'baostock 空数据')
    except Exception as e:
        try: bs.logout()
        except: pass
        return None, f'baostock 异常: {type(e).__name__}: {str(e)[:60]}'


def fetch_close_akshare(code):
    """akshare 降级"""
    try:
        import akshare as ak
        df = ak.stock_zh_a_hist(
            symbol=code, period='daily',
            start_date=START_DATE.replace('-', ''),
            end_date=END_DATE.replace('-', ''), adjust='qfq')
        if df is None or len(df) == 0: return None, 'akshare 空数据'
        data_list = []
        for _, row in df.iterrows():
            try: data_list.append({'date': str(row['日期'])[:10], 'close': round(float(row['收盘']), 2)})
            except (ValueError, KeyError): continue
        return data_list, None
    except Exception as e:
        return None, f'akshare 异常: {type(e).__name__}: {str(e)[:60]}'


def write_output_js(results):
    """生成 data/pcb.close_history.js（IIFE 包裹 window.PCB_CLOSE_HISTORY）"""
    asof = END_DATE
    lines = [
        "// data/pcb.close_history.js  ——  commit 4.57：信号 C 历史回放数据层",
        "// 由 scripts/fetch_close_history_series.py 生成·不手动编辑",
        "// 数据源:baostock(优先) / akshare(降级)·单源合规",
        "// 设计理由:避免 pcb.auto.js 膨胀(4.2MB → +2.3MB)·独立文件按需加载",
        "// §6.2 红线:不写入 pcb.manual.js",
        "",
        ";(function(){",
        "  window.PCB_CLOSE_HISTORY = {",
    ]
    success_count = 0
    for code, (data_list, err) in results.items():
        if not data_list: continue
        lines.append(f"    '{code}': {json.dumps(data_list, ensure_ascii=False)},")
        success_count += 1
    lines.extend([
        f"  }};",
        f"  window.PCB_CLOSE_HISTORY._meta = {{ asOf: '{asof}', source: 'baostock/akshare', count: {success_count} }};",
        "})();",
    ])
    OUTPUT_JS.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    return success_count


def main():
    print('='*60)
    print('commit 4.57 · close_history 序列拉取（输出 pcb.close_history.js）')
    print(f'窗口: {START_DATE} ~ {END_DATE}')
    print('='*60)
    # 加载 stock code 列表
    import subprocess
    out = subprocess.run(['node', '-e', '''
        global.window = {}; require('./data/pcb.auto.js');
        process.stdout.write(JSON.stringify(Object.keys(global.window.PCB_AUTO.valuations)));
    '''], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    if out.returncode != 0:
        raise RuntimeError(f'Node 加载失败:\n{out.stderr}')
    codes = json.loads(out.stdout)
    print(f'开始拉取 {len(codes)} 只 stock...')
    results = {}
    for code in codes:
        data, err = fetch_close_baostock(code)
        if not data:
            print(f'  ↪️ {code} baostock 失败（{err}）· 降级 akshare')
            data, err = fetch_close_akshare(code)
        results[code] = (data, err)
        n = len(data) if data else 0
        print(f'  {code}: {n} 条' + (f' ({err})' if err else ''))
    print(f'\n生成 {OUTPUT_JS.name} ...')
    n = write_output_js(results)
    print(f'✓ 完成（{n}/{len(codes)} · 文件大小: {OUTPUT_JS.stat().st_size/1024:.1f} KB）')


if __name__ == '__main__':
    main()