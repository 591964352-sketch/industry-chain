"""
scripts/fetch_close_history.py
★ 阶段三 commit 3.5：baostock 拉 close 历史 + 真实价格 fromHigh

用户指令：
- 拉 38 只股票近 5 年 close 价格历史（baostock query_history_k_data_plus）
- 算 fromHigh: (current_close - high_5y) / high_5y（负数表示从高点回落）
- 用真实 fromHigh 覆盖 pcb.auto.js 里的 fromHigh_pe 占位字段·字段改名为 fromHigh
- 亏损股/错码股同样算（价格回落和盈亏无关）
- 输出数据自查报告（§7.2 格式）+ 列出 5 只卡口的 fromHigh 值

按 plan §4.3 派生字段 + §6.8 数据准确度优先：
- 沿用 baostock 单源（akshare 已移除·adata 是财报接口）
- baostock adapter 改名 raise 不静默（§4.2 准确性护栏）
- 字段改名 fromHigh_pe → fromHigh（commit 3.5 用户指令）
- close 字段保留作交叉验证（closeLatest + closeHigh5y）

硬约束：不触碰 pcb.manual.js（脚本硬约束）
"""
import re
import sys
import json
from pathlib import Path
import baostock as bs


ROOT = Path(__file__).resolve().parent.parent
AUTO_JS = ROOT / 'data' / 'pcb.auto.js'

START_DATE = '2021-06-23'
END_DATE = '2026-06-23'
ASOF = datetime_now_str = None  # 占位· 下面初始化


def to_baostock_code(code):
    """A 股 code 6 位 → baostock prefix"""
    if code.startswith('60') or code.startswith('688'):
        return f'sh.{code}'
    if code.startswith('00') or code.startswith('30'):
        return f'sz.{code}'
    raise ValueError(f'❌ 未知 A 股 code 前缀：{code}')


def fetch_close_series(code):
    """返回 (rows_count, latest_close, high_5y, error_msg)
       真实价格 fromHigh 用此算
    """
    bs_code = to_baostock_code(code)
    rs = bs.query_history_k_data_plus(
        bs_code,
        'date,close',
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
    if rs.error_code != '0':
        raise RuntimeError(f'❌ baostock query 报错：{rs.error_code} {rs.error_msg}')

    data_list = []
    while rs.next():
        data_list.append(rs.get_row_data())

    if not data_list:
        return (0, None, None, '空数据')

    rows = len(data_list)

    # 最新 close（最后一个有效 close）
    latest_close = None
    for row in reversed(data_list):
        close_str = row[1]
        if not close_str or close_str.strip() == '':
            continue
        try:
            latest_close = float(close_str)
            break
        except ValueError:
            continue

    # 5 年最高 close
    closes = []
    for row in data_list:
        close_str = row[1]
        if not close_str or close_str.strip() == '':
            continue
        try:
            closes.append(float(close_str))
        except ValueError:
            continue
    high_5y = max(closes) if closes else None

    return (rows, latest_close, high_5y, None)


def main():
    global ASOF
    from datetime import datetime
    ASOF = datetime.now().strftime('%Y-%m-%d')

    print(f'========================================')
    print(f'阶段三 commit 3.5 · 真实价格 fromHigh')
    print(f'========================================')
    print(f'asOf: {ASOF}')
    print(f'window: {START_DATE} ~ {END_DATE} (5y)')
    print(f'flag: ⚠️单源(akshare缺失·adata非PE历史接口)')
    print()

    # 1) 读 pcb.auto.js valuations
    print('加载 pcb.auto.js valuations ...')
    import subprocess
    out = subprocess.run(
        ['node', '-e', '''
            global.window = {};
            require('./data/pcb.auto.js');
            process.stdout.write(JSON.stringify(global.window.PCB_AUTO.valuations));
        '''],
        cwd=ROOT, capture_output=True, text=True, encoding='utf-8'
    )
    if out.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.auto.js 失败:\n{out.stderr}')
    valuations = json.loads(out.stdout)
    print(f'✓ 加载 {len(valuations)} 只 stock')
    print()

    # 2) baostock login
    lg = bs.login()
    if lg.error_code != '0':
        raise RuntimeError(f'❌ baostock login 失败')
    print(f'✓ baostock login')
    print()

    # 3) 拉每只 close
    print('拉 close 历史（5 年窗口·日频）...')
    results = {}        # code -> {closeLatest, closeHigh5y, fromHigh}
    success = 0
    failed = 0
    nodata = 0

    codes = list(valuations.keys())
    for i, code in enumerate(codes, 1):
        try:
            rows, latest, high, err = fetch_close_series(code)
            if latest is None or high is None:
                results[code] = {'closeLatest': None, 'closeHigh5y': None, 'fromHigh': None, 'flag': '⚠️close 数据缺失'}
                nodata += 1
                print(f'  [{i:2d}/{len(codes)}] {code} · 跳过（无数据）')
            else:
                from_high = round((latest - high) / high, 4)
                results[code] = {
                    'closeLatest': round(latest, 4),
                    'closeHigh5y': round(high, 4),
                    'fromHigh': from_high,
                    'flag': None
                }
                success += 1
                print(f'  [{i:2d}/{len(codes)}] {code} · close={latest:.2f} · high_5y={high:.2f} · fromHigh={from_high:+.4f}')
        except Exception as e:
            failed += 1
            results[code] = {'closeLatest': None, 'closeHigh5y': None, 'fromHigh': None, 'flag': f'⚠️拉取失败:{type(e).__name__}'}
            print(f'  [{i:2d}/{len(codes)}] {code} · ❌ FAILED: {str(e)[:80]}')

    bs.logout()
    print()
    print(f'========================================')
    print(f'摘要')
    print(f'========================================')
    print(f'成功（close 数据有效）: {success} 只')
    print(f'跳过（无数据）: {nodata} 只')
    print(f'失败（拉取错误）: {failed} 只')
    print(f'总计: {len(codes)} 只')
    print()

    # 5 只卡口抽样
    print('--- 5 只卡口真实价格 fromHigh ---')
    for code in ['601208', '300395', '301217', '002916', '600183']:
        r = results.get(code, {})
        print(f'  {code} · close={r.get("closeLatest")} · high_5y={r.get("closeHigh5y")} · fromHigh={r.get("fromHigh")}')
    print()

    # 4) 注入回 pcb.auto.js（改名 fromHigh_pe → fromHigh + 加 close 字段 + 删除 fromHigh_pe）
    print('注入回 pcb.auto.js（字段改名 fromHigh_pe → fromHigh + 删除 fromHigh_pe）...')
    text = AUTO_JS.read_text(encoding='utf-8')
    injected = 0
    for code, r in results.items():
        # 匹配: 'code': { ...      fromHigh_pe: 数值/null,
        # ★ commit 3.5 修 bug：删 fromHigh_pe 整行（包括 \n），插入 fromHigh + close 字段
        pattern = re.compile(
            rf"(    '{re.escape(code)}': \{{)([\s\S]*?)(      fromHigh_pe: [^,\n]+,)",
            re.MULTILINE
        )
        def replacer(match):
            head, mid, tail = match.group(1), match.group(2), match.group(3)
            # tail 格式: '      fromHigh_pe: 数值,'
            # 删掉整个 fromHigh_pe 行（前缀 6 空格 + fromHigh_pe: ...）
            new_lines = []
            if r['fromHigh'] is not None:
                new_lines.append(f"      fromHigh: {r['fromHigh']},  // ★ commit 3.5：真实价格回落（替代 commit 3.2 fromHigh_pe 近似）")
            else:
                new_lines.append(f"      fromHigh: null,  // ⚠️ close 数据缺失")
            new_lines.append(f"      closeLatest: {r['closeLatest'] if r['closeLatest'] is not None else 'null'},")
            new_lines.append(f"      closeHigh5y: {r['closeHigh5y'] if r['closeHigh5y'] is not None else 'null'},")
            return head + mid + '\n'.join(new_lines) + '\n'
        text, n = pattern.subn(replacer, text, count=1)
        if n > 0:
            injected += 1
        else:
            print(f'  ⚠️ 未匹配 {code}（可能格式变了）')

    # 更新 _meta.note
    text = re.sub(
        r"note: '★ [^']+',",
        "note: '★ 阶段三 commit 3.5：真实价格 fromHigh + close 字段·baostock query_history_k_data_plus（替代 commit 3.2 fromHigh_pe PE 近似）',",
        text, count=1
    )

    AUTO_JS.write_text(text, encoding='utf-8')
    print(f'✓ 注入完成（{injected}/{len(codes)}）')

    return results


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'\n❌ 脚本异常退出: {type(e).__name__}: {e}', file=sys.stderr)
        sys.exit(1)
