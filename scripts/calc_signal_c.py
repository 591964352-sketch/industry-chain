"""
scripts/calc_signal_c.py
★ 阶段五 commit 4.16：信号 C 基础数据计算（量比 + 近 N 天 pePercentile 最大值）

输入：data/pcb.auto.js（commit 4.15 写入的 volume_history + 既有 pe_history）
输出：每个 stock 加 4 个字段 · 写回 pcb.auto.js
  · volRatio5d       = mean(volume[-5:]) / mean(volume[-60:])
                       （跳过 volume=0 的天 · 不足 60 天返回 null）
  · maxPctl30d/60d/90d = 近 N 天内每个 pe 在全历史中的分位的最大值
                       （亏损股或 pe_ttm=null 时全部为 null）

按 plan §6.8 数据准确度优先：
- 不拉网络（commit 4.15 已存 volume_history 进 pcb.auto.js）
- 数据源单一：baostock volume + pe
- 字段命名风格与 calc_percentile.py 一致（小驼峰 · 数字单位作后缀）

硬约束：不触碰 pcb.manual.js / pcb.js / index.html
"""
import re
import sys
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
AUTO_JS = ROOT / 'data' / 'pcb.auto.js'

# 阈值常量
VR_WINDOW_SHORT = 5        # 短均量窗口（5 日）
VR_WINDOW_LONG = 60        # 长均量窗口（60 日）
PCTL_WINDOWS = [30, 60, 90]  # 近 N 天分位最大值的 3 个窗口


def load_valuations():
    """用 Node.js 把 pcb.auto.js 的 valuations 字段转 JSON 字符串。
    避开正则解析 JS 语法坑（IIFE + Windows GBK 等问题）。
    """
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
    return json.loads(out.stdout)


def calc_vol_ratio_5d(volume_history):
    """volRatio5d = mean(volume[-5:]) / mean(volume[-60:])
       - 跳过 volume=0 的天
       - 不足 60 天历史返回 None
    """
    if not volume_history:
        return None

    valid = [v['volume'] for v in volume_history if v.get('volume') is not None and v['volume'] > 0]

    if len(valid) < VR_WINDOW_LONG:
        # 不足 60 天有效数据
        return None

    short_avg = sum(valid[-VR_WINDOW_SHORT:]) / VR_WINDOW_SHORT
    long_avg = sum(valid[-VR_WINDOW_LONG:]) / VR_WINDOW_LONG

    if long_avg == 0:
        return None

    return round(short_avg / long_avg, 4)


def calc_max_pctl_window(pe_history, pe_ttm, window_days):
    """maxPctl{N}d = 近 N 天内每个 pe 在全历史中的分位的最大值
       - 亏损股（pe_ttm=null）返回 None
       - 不足 N 天历史返回 None
       - 用 (pes <= pe).sum() / len(pes) * 100 计算（与 calc_percentile.py 一致）
    """
    if pe_ttm is None or not pe_history:
        return None

    # 提取全部历史 pe
    all_pes = [h['pe'] for h in pe_history if h.get('pe') is not None]
    if not all_pes:
        return None

    # 取近 N 天的 pe 子集（按 date 排序·取最后 N 条）
    sorted_hist = sorted(pe_history, key=lambda h: h.get('date', ''))
    recent = sorted_hist[-window_days:]
    recent_pes = [h['pe'] for h in recent if h.get('pe') is not None]

    if not recent_pes:
        return None

    # 算每个 pe 的分位，取最大
    n = len(all_pes)
    max_pctl = 0.0
    for p in recent_pes:
        pctl = sum(1 for x in all_pes if x <= p) / n * 100
        if pctl > max_pctl:
            max_pctl = pctl

    return round(max_pctl, 2)


def calc_stock_signal_c(code, val):
    """算单只 stock 的 volRatio5d + maxPctl30d/60d/90d。

    输入：val = {pe_ttm, pe_history: [...], volume_history: [...]}
    输出：{volRatio5d, maxPctl30d, maxPctl60d, maxPctl90d}
    """
    pe_ttm = val.get('pe_ttm')
    pe_history = val.get('pe_history', [])
    volume_history = val.get('volume_history', [])

    return {
        'volRatio5d': calc_vol_ratio_5d(volume_history),
        'maxPctl30d': calc_max_pctl_window(pe_history, pe_ttm, 30),
        'maxPctl60d': calc_max_pctl_window(pe_history, pe_ttm, 60),
        'maxPctl90d': calc_max_pctl_window(pe_history, pe_ttm, 90),
    }


def inject_to_auto_js(results):
    """用正则替换 pcb.auto.js·给每个 stock 的 valuation 块加/覆盖 4 个新字段。

    ★ commit 4.23 幂等性修复：
      - 写入前先检测 4 个字段（volRatio5d + maxPctl30d/60d/90d）是否已存在
      - 已存在 → 原地覆盖更新（不追加）
      - 不存在 → 在 source 前插入（原始行为）
      - 重复跑两次后 pcb.auto.js 行数不变
    """
    text = AUTO_JS.read_text(encoding='utf-8')

    injected = 0
    # 4 个字段名（与 pcb.auto.js 字面量一致）
    FIELDS = ['volRatio5d', 'maxPctl30d', 'maxPctl60d', 'maxPctl90d']

    for code, r in results.items():
        # 注意：pcb.auto.js 中 stock code 是字符串字面量（带单引号）
        pattern = re.compile(
            rf"(    '{re.escape(code)}': \{{)([\s\S]*?)(      source: \{{)",
            re.MULTILINE
        )
        m = pattern.search(text)
        if not m:
            print(f'  ⚠️ 未匹配 {code}（可能格式变了）')
            continue

        head, mid, tail = m.group(1), m.group(2), m.group(3)
        block = mid

        # ★ commit 4.23：检测 4 个字段是否已存在
        existing_fields = {}
        for fld in FIELDS:
            # 匹配 "      fldName: ..."（含尾部逗号）
            fpat = re.compile(rf"^      {fld}: (.*?)(?=,\s*$|,)", re.MULTILINE)
            fmatch = fpat.search(block)
            if fmatch:
                existing_fields[fld] = (fmatch.start(), fmatch.end())

        # 构造新字段值
        new_field_lines = {}
        new_field_lines['volRatio5d'] = f"      volRatio5d: {r['volRatio5d'] if r['volRatio5d'] is not None else 'null'},  // ★ commit 4.16：5日均量/60日均量（不足60天为null）"
        for w in PCTL_WINDOWS:
            key = f'maxPctl{w}d'
            new_field_lines[key] = f"      {key}: {r[key] if r[key] is not None else 'null'},  // ★ commit 4.16：近{w}天pePercentile最大值"

        if existing_fields:
            # ★ 全部覆盖：逐字段替换·按 start 倒序（避免偏移）
            sorted_existing = sorted(existing_fields.items(), key=lambda kv: kv[1][0], reverse=True)
            new_mid = block
            for fld, (s, e) in sorted_existing:
                line_end = new_mid.find('\n', e)
                if line_end == -1:
                    line_end = len(new_mid)
                else:
                    line_end += 1   # 包含换行符
                new_mid = new_mid[:s] + new_field_lines[fld] + '\n' + new_mid[line_end:]
            text = text[:m.start(2)] + new_mid + text[m.end(2):]
            injected += 1
        else:
            # 原始路径：4 个字段都不存在 → 在 source 前插入
            insert_lines = list(new_field_lines.values())
            new_mid = block + '\n'.join(insert_lines) + '\n      '
            text = text[:m.start(2)] + new_mid + text[m.end(2):]
            injected += 1

    # 更新 _meta.note
    text = re.sub(
        r"note: '★ [^']+',",
        "note: '★ 阶段三 commit 3.5 + 阶段五 commit 4.15/4.16：pePercentile/entryZone/fromHigh_pe + close + volume_history 字段 + 4 个信号 C 字段（volRatio5d/maxPctl30d/60d/90d）· 不拉网络·基于 commit 4.15 volume_history + commit 3.1.2 pe_history 序列',",
        text, count=1
    )

    AUTO_JS.write_text(text, encoding='utf-8')
    return injected


def main():
    print(f'========================================')
    print(f'阶段五 commit 4.16 · 信号 C 基础数据')
    print(f'========================================')
    print(f'volRatio5d 窗口: {VR_WINDOW_SHORT}/{VR_WINDOW_LONG} 日')
    print(f'pctl 窗口: {PCTL_WINDOWS} 日')
    print()

    # 1) 加载 valuations
    print('加载 pcb.auto.js valuations ...')
    valuations = load_valuations()
    print(f'✓ 加载 {len(valuations)} 只 stock')
    print()

    # 2) 逐只算 4 个字段
    print('逐只算 volRatio5d + maxPctl30d/60d/90d ...')
    results = {}
    for code, val in valuations.items():
        if val is None:
            results[code] = {'volRatio5d': None, 'maxPctl30d': None, 'maxPctl60d': None, 'maxPctl90d': None}
            continue
        results[code] = calc_stock_signal_c(code, val)
    print(f'✓ 算完 {len(results)} 只')
    print()

    # 3) 摘要统计
    vol_ok = sum(1 for r in results.values() if r['volRatio5d'] is not None)
    vol_loss = sum(1 for r in results.values() if r['volRatio5d'] is None)
    pctl30_ok = sum(1 for r in results.values() if r['maxPctl30d'] is not None)
    pctl60_ok = sum(1 for r in results.values() if r['maxPctl60d'] is not None)
    pctl90_ok = sum(1 for r in results.values() if r['maxPctl90d'] is not None)
    print(f'========================================')
    print(f'摘要')
    print(f'========================================')
    print(f'volRatio5d 有值: {vol_ok} / {len(results)}')
    print(f'volRatio5d 不足60天（null）: {vol_loss} 只')
    print(f'maxPctl30d 有值: {pctl30_ok} / {len(results)}')
    print(f'maxPctl60d 有值: {pctl60_ok} / {len(results)}')
    print(f'maxPctl90d 有值: {pctl90_ok} / {len(results)}')
    print()

    # 4) 5 只卡口抽样
    print('--- 5 只卡口 4 个字段 ---')
    for code in ['601208', '300395', '301217', '002916', '600183']:
        r = results.get(code, {})
        print(f'  {code}: volRatio5d={r.get("volRatio5d")}  maxPctl30d={r.get("maxPctl30d")}  maxPctl60d={r.get("maxPctl60d")}  maxPctl90d={r.get("maxPctl90d")}')
    print()

    # 5) 注入回 pcb.auto.js
    print('注入回 pcb.auto.js（新增 4 个字段）...')
    n = inject_to_auto_js(results)
    print(f'✓ 写入完成（{n}/{len(results)}）')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'\n❌ 脚本异常退出: {type(e).__name__}: {e}', file=sys.stderr)
        sys.exit(1)
