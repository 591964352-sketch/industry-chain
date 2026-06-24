"""
scripts/fetch_volume_history.py
★ 阶段五 commit 4.15：baostock 拉 volume + turn 历史（信号 C 数据基础）

用户指令：
- 仿 fetch_close_history.py 结构
- 拉 37 只股票近 5 年日频 volume（成交量）+ turn（换手率）
- fields: 'date,volume,turn,tradestatus'
- 只保留 tradestatus=1 的交易日数据
- volume=0 的记录跳过（停牌日）
- 写入 pcb.auto.js 新字段：volume_history: [{date, volume, turn}, ...]
- 不触碰 pe_history / close 等现有字段

按 plan §6.8 数据准确度优先：
- 沿用 baostock 单源（akshare 已移除·adata 是财报接口）
- baostock adapter 改名 raise 不静默（§4.2 准确性护栏）
- 字段新增 volume_history（与 pe_history 并列·独立存储 volume/turn 时间序列）

硬约束：不触碰 pcb.manual.js / pcb.js / index.html
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


def to_baostock_code(code):
    """A 股 code 6 位 → baostock prefix"""
    if code.startswith('60') or code.startswith('688'):
        return f'sh.{code}'
    if code.startswith('00') or code.startswith('30'):
        return f'sz.{code}'
    raise ValueError(f'❌ 未知 A 股 code 前缀：{code}')


def fetch_volume_series(code):
    """返回 (volume_history_list, error_msg)
       volume_history_list = [{date: 'YYYY-MM-DD', volume: float, turn: float}, ...]
       - 只保留 tradestatus=1 的交易日
       - 跳过 volume=0 的记录（停牌日）
    """
    bs_code = to_baostock_code(code)
    rs = bs.query_history_k_data_plus(
        bs_code,
        'date,volume,turn,tradestatus',
        start_date=START_DATE,
        end_date=END_DATE,
        frequency='d',
        adjustflag='2'
    )
    # adapter 改名/缺字段校验（§4.2 准确性护栏）
    if rs is None:
        raise AttributeError(f'❌ baostock 接口返回 None（疑似改名）')
    if not hasattr(rs, 'error_code'):
        raise AttributeError(f'❌ baostock ResultSet 缺 error_code 属性（疑似改名）')
    if rs.error_code != '0':
        raise RuntimeError(f'❌ baostock query 报错：{rs.error_code} {rs.error_msg}')

    raw = []
    while rs.next():
        raw.append(rs.get_row_data())

    if not raw:
        return ([], '空数据')

    volume_history = []
    skipped_zero = 0
    skipped_nontradestatus = 0
    for row in raw:
        date_str, vol_str, turn_str, status_str = row[0], row[1], row[2], row[3]
        # 过滤非交易日
        if status_str != '1':
            skipped_nontradestatus += 1
            continue
        # 过滤 volume=0
        if not vol_str or vol_str.strip() == '':
            continue
        try:
            vol = float(vol_str)
        except ValueError:
            continue
        if vol == 0:
            skipped_zero += 1
            continue
        # turn 字段可能空（如亏损股/早期数据）
        turn = None
        if turn_str and turn_str.strip() != '':
            try:
                turn = float(turn_str)
            except ValueError:
                turn = None
        volume_history.append({
            'date': date_str,
            'volume': vol,
            'turn': turn
        })

    return (volume_history, None, skipped_zero, skipped_nontradestatus)


def main():
    print(f'========================================')
    print(f'阶段五 commit 4.15 · volume + turn 历史')
    print(f'========================================')
    print(f'window: {START_DATE} ~ {END_DATE} (5y)')
    print(f'fields: date,volume,turn,tradestatus')
    print(f'过滤规则: tradestatus=1 + volume>0')
    print()

    # 1) 读 pcb.auto.js valuations
    print('加载 pcb.auto.js valuations ...')
    import subprocess
    out = subprocess.run(
        ['node', '-e', '''
            global.window = {};
            require('./data/pcb.auto.js');
            process.stdout.write(JSON.stringify(Object.keys(global.window.PCB_AUTO.valuations)));
        '''],
        cwd=ROOT, capture_output=True, text=True, encoding='utf-8'
    )
    if out.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.auto.js 失败:\n{out.stderr}')
    codes = json.loads(out.stdout)
    print(f'✓ 加载 {len(codes)} 只 stock')
    print()

    # 2) baostock login
    lg = bs.login()
    if lg.error_code != '0':
        raise RuntimeError(f'❌ baostock login 失败')
    print(f'✓ baostock login')
    print()

    # 3) 拉每只 volume + turn
    print('拉 volume + turn 历史（5 年窗口·日频·仅交易日·volume>0）...')
    print('失败策略: 每只最多重试 3 次· 每次失败等待 3 秒')
    results = {}        # code -> volume_history list
    success = 0
    failed = 0
    nodata = 0
    total_rows = 0
    avg_rows = 0
    total_skipped_zero = 0
    total_skipped_nontradestatus = 0

    import time as _time

    for i, code in enumerate(codes, 1):
        vol_hist = []
        last_err = None
        # ★ commit 4.15 retry: 每只最多 3 次 · 每次失败等 3 秒
        for attempt in range(1, 4):
            try:
                vol_hist, err, skipped_zero, skipped_nontradestatus = fetch_volume_series(code)
                last_err = err
                if err:
                    vol_hist = []
                    if attempt < 3:
                        print(f'  [{i:2d}/{len(codes)}] {code} · ⚠️ attempt {attempt}/3 失败（{err}）· 等 3s 重试')
                        _time.sleep(3)
                        continue
                    break
                # 成功
                break
            except Exception as e:
                last_err = f'{type(e).__name__}: {str(e)[:60]}'
                vol_hist = []
                if attempt < 3:
                    print(f'  [{i:2d}/{len(codes)}] {code} · ⚠️ attempt {attempt}/3 异常（{last_err}）· 等 3s 重试')
                    _time.sleep(3)
                    continue
                break

        if vol_hist:
            results[code] = vol_hist
            total_rows += len(vol_hist)
            total_skipped_zero += skipped_zero
            total_skipped_nontradestatus += skipped_nontradestatus
            success += 1
            first_date = vol_hist[0]['date']
            last_date = vol_hist[-1]['date']
            print(f'  [{i:2d}/{len(codes)}] {code} · ✅ {len(vol_hist)} 条 ({first_date} ~ {last_date}) · 跳过停牌 {skipped_zero} + 非交易日 {skipped_nontradestatus}')
        elif last_err:
            results[code] = []
            failed += 1
            print(f'  [{i:2d}/{len(codes)}] {code} · ❌ FAILED × 3 次（{last_err}）')
        else:
            results[code] = []
            nodata += 1
            print(f'  [{i:2d}/{len(codes)}] {code} · 跳过（无数据）')

    avg_rows = round(total_rows / success, 1) if success > 0 else 0
    bs.logout()
    print()
    print(f'========================================')
    print(f'摘要')
    print(f'========================================')
    print(f'成功（volume+turn 数据有效）: {success} 只')
    print(f'跳过（无数据）: {nodata} 只')
    print(f'失败（拉取错误）: {failed} 只')
    print(f'总计: {len(codes)} 只')
    print(f'总行数: {total_rows}')
    print(f'平均行数: {avg_rows} 条/只')
    print(f'总跳过 volume=0 行: {total_skipped_zero}')
    print(f'总跳过非交易日行: {total_skipped_nontradestatus}')
    print()

    # 5 只卡口抽样
    print('--- 5 只卡口 volume 抽样 ---')
    for code in ['601208', '300395', '301217', '002916', '600183']:
        vol_hist = results.get(code, [])
        if vol_hist:
            print(f'  {code} · {len(vol_hist)} 条 · 最新: {vol_hist[-1]["date"]} vol={vol_hist[-1]["volume"]:.0f} turn={vol_hist[-1]["turn"]}')
        else:
            print(f'  {code} · 无数据')
    print()

    # 4) 注入回 pcb.auto.js（新增 volume_history 字段·不触碰 pe_history / close 等现有字段）
    print('注入回 pcb.auto.js（新增 volume_history 字段）...')
    text = AUTO_JS.read_text(encoding='utf-8')
    injected = 0
    skipped_no_match = []
    for code, vol_hist in results.items():
        # ★ commit 4.15：插入点 = pe_history: [ 之前（每个 stock 块内只有 1 处）
        #   格式: 'code': { pe_ttm: ..., pe_history: [  → 在 'pe_history: [' 前插入 volume_history 字段
        #   旧格式:      pe_ttm: ...,
        #               pe_history: [
        #   新格式:      pe_ttm: ...,
        #               volume_history: [...],
        #               pe_history: [
        if not vol_hist:
            # 无数据也插入 volume_history: []（保持字段一致）
            vol_hist_str = '[]'
        else:
            # 构造紧凑 JSON-like 字面量
            rows = []
            for h in vol_hist:
                turn_str = 'null' if h['turn'] is None else f"{h['turn']:.4f}"
                rows.append(f"      {{date: \"{h['date']}\", volume: {h['volume']:.0f}, turn: {turn_str}}}")
            vol_hist_str = '[\n' + ',\n'.join(rows) + '\n    ]'

        pattern = re.compile(
            rf"(    '{re.escape(code)}': \{{)([\s\S]*?)(      pe_history: \[)",
            re.MULTILINE
        )
        def replacer(match):
            head, mid, tail = match.group(1), match.group(2), match.group(3)
            indent = '      '
            return f"{head}{mid}{indent}volume_history: {vol_hist_str},\n{tail}"
        text, n = pattern.subn(replacer, text, count=1)
        if n > 0:
            injected += 1
        else:
            skipped_no_match.append(code)

    AUTO_JS.write_text(text, encoding='utf-8')
    print(f'✓ 注入完成（{injected}/{len(codes)}）')
    if skipped_no_match:
        print(f'  ⚠️ 未匹配 {len(skipped_no_match)} 只: {", ".join(skipped_no_match[:5])}{"..." if len(skipped_no_match)>5 else ""}')
    print()

    # 更新 _meta.note
    new_note = '★ 阶段三 commit 3.5 + 阶段五 commit 4.15：numpy 算 pePercentile/entryZone/fromHigh_pe + close 字段 + volume_history 字段（baostock volume+turn 5y 日频·信号 C 数据基础）· 不拉网络·基于 commit 3.1.2 pe_history 序列'
    text = AUTO_JS.read_text(encoding='utf-8')
    text = re.sub(
        r"note: '★ [^']+',",
        f"note: '{new_note}',",
        text, count=1
    )
    AUTO_JS.write_text(text, encoding='utf-8')
    print(f'✓ _meta.note 已更新为 commit 4.15')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'\n❌ 脚本异常退出: {type(e).__name__}: {e}', file=sys.stderr)
        sys.exit(1)
