"""
scripts/calc_percentile.py
★ 阶段三 commit 3.2：numpy 算 PE 分位（不拉网络·只读 pcb.auto.js）
★ commit 4.12：扩展 3 条自动 flag 规则（lastHistDate 过期 / pePercentile 极端高 / 单源 PE 数据）

输入：data/pcb.auto.js（commit 3.1.2 生成的 38 只 pe_history 序列）
输出：每个 stock 加 4 个字段 · 写回 pcb.auto.js
  · pePercentile (5年窗口·当前 pe_ttm 在历史中的百分位·0-100)
  · entryZone: {p30, p70}（pe_history 的 30%/70% 分位·"当前 PE 跌到多少可关注"参考）
  · fromHigh_pe (pe_history max 的回落幅度·负数·近似非价格·commit 3.5 再补 close)
  · flag (异常标注·⚠️PE异常高/极低/历史<1y/数据过期/分位极端高/单源PE)

按 plan §4.3 派生字段 + §6.4 双源降级标注 + commit 4.12 自动规则：
- 不拉网络（commit 3.1.2 已存 pe_history 进 pcb.auto.js）
- adata 双源校验跳过（adata.get_core_index 是季度财报·不是日频 PE-TTM·无法直接校验 baostock 日频 peTTM）
- 改用 pe_history 内部一致性校验（commit 3.2 不严格双源）
- 真实价格 fromHigh 需要 close 历史·commit 3.5 再补（标 fromHigh_pe 区分）

硬约束：
- 不触碰 pcb.manual.js（§6.2 红线）
- 极端值 pe_ttm>500 标 ⚠️PE异常高·可能失真（用户指令）
- 亏损股 pe_ttm=null：pePercentile=null / entryZone 保留历史分位参考 / fromHigh_pe=null
- 不静默用估算覆盖（§6.8 数据准确度优先）
- commit 4.12：3 条自动 flag（数据过期/分位极端高/单源）· 不覆盖已有 flag·用 ' · ' 拼接
"""
import re
import sys
import json
from datetime import date
from pathlib import Path
import numpy as np

# ★ commit 4.12：Windows GBK stdout 不能 print ⚠️ 等 emoji，强制 utf-8
try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
AUTO_JS = ROOT / 'data' / 'pcb.auto.js'

# 阈值常量
EXTREME_PE_HIGH = 500       # pe_ttm > 500 标 ⚠️PE异常高（用户指令）
EXTREME_PE_LOW = 10          # pe_ttm < 10 标 ⚠️PE极低
ENTRY_ZONE_PCTL_LOW = 30     # 30% 分位
ENTRY_ZONE_PCTL_HIGH = 70    # 70% 分位
WIN_HISTORY_MIN = 252        # 1 年（≈ 252 个交易日）· 历史<1y 标 ⚠️分位可能失真
HISTORY_STALE_DAYS = 60      # ★ commit 4.12：lastHistDate 距今 > 60 天 → 数据过期
EXTREME_PCTL = 99            # ★ commit 4.12：pePercentile >= 99% → 历史最贵区间
TODAY = date.today()         # ★ commit 4.12：脚本运行日期（计算距今天数）


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


def calc_stock_percentile(code, val):
    """算单只 stock 的 pePercentile / entryZone / fromHigh_pe / flag。

    输入：val = {pe_ttm, pe_history: [{date, pe}, ...], ...}
    输出：{pePercentile, entryZone, fromHigh_pe, flag}
    """
    pe_ttm = val.get('pe_ttm')
    history = val.get('pe_history', [])

    # ★ commit 4.12：辅助函数 - 计算 lastHistDate 距今天数
    def _last_hist_age_days():
        if not history or not history[-1].get('date'):
            return None
        try:
            last_date = date.fromisoformat(history[-1]['date'])
            return (TODAY - last_date).days
        except (ValueError, TypeError):
            return None

    # ★ commit 4.14：辅助函数 - 最近30天是否有有效 PE>0 数据
    def _has_recent_valid_pe(days=30):
        if not history:
            return False
        try:
            cutoff = (TODAY - __import__('datetime').timedelta(days=days)).isoformat()
        except Exception:
            return False
        # 取最近 30 天内（含 cutoff 之后）的所有 pe，看是否有 >0
        for h in reversed(history):
            if h.get('date', '') < cutoff:
                return False  # 已超出窗口
            try:
                pe_val = float(h.get('pe', 0) or 0)
                if pe_val > 0:
                    return True
            except (ValueError, TypeError):
                continue
        return False

    # 1) 亏损股分支（pe_ttm=None）：分位/回落 null· entryZone 保留历史参考
    if pe_ttm is None:
        # ★ commit 4.14：数据过期 flag 重写·触发条件改为「近30天无有效 PE>0 数据」
        #   原条件「lastHistDate 距今 > 60 天」对 600110/603936 误报（baostock 实际未停·只是 PE 为负）
        #   新条件检查最近 30 天是否有任何有效 PE>0 数据
        flag_extra = []
        if not _has_recent_valid_pe(30):
            # 进一步查最近一次有效 PE>0 的天数（用于显示「近 X 天」）
            last_valid_date = None
            for h in reversed(history):
                try:
                    pe_val = float(h.get('pe', 0) or 0)
                    if pe_val > 0:
                        last_valid_date = h['date']
                        break
                except (ValueError, TypeError):
                    continue
            days_no_valid = (TODAY - date.fromisoformat(last_valid_date)).days if last_valid_date else None
            if days_no_valid is not None:
                flag_extra.append(f'⚠️持续亏损·近{days_no_valid}天无有效PE数据')
            else:
                flag_extra.append(f'⚠️持续亏损·无历史有效PE数据')
        if len(history) >= WIN_HISTORY_MIN:
            pes = np.array([h['pe'] for h in history])
            base_flag = '⚠️亏损股·pe_ttm=null·历史分位保留参考'
            return {
                'pePercentile': None,   # 当前亏损·无意义
                'entryZone': {
                    'p30': round(float(np.percentile(pes, ENTRY_ZONE_PCTL_LOW)), 2),
                    'p70': round(float(np.percentile(pes, ENTRY_ZONE_PCTL_HIGH)), 2)
                },
                'fromHigh_pe': None,
                'flag': ' · '.join([base_flag] + flag_extra) if flag_extra else base_flag
            }
        else:
            base_flag = f'⚠️亏损股·历史<1y({len(history)}条)'
            return {
                'pePercentile': None,
                'entryZone': None,
                'fromHigh_pe': None,
                'flag': ' · '.join([base_flag] + flag_extra) if flag_extra else base_flag
            }

    # 2) 正常股分支
    if not history or len(history) < 1:
        return {
            'pePercentile': None,
            'entryZone': None,
            'fromHigh_pe': None,
            'flag': '⚠️无历史数据'
        }

    pes = np.array([h['pe'] for h in history])

    # pePercentile：当前 pe_ttm 在历史中的百分位（≤pe_ttm 的历史占比· 0-100）
    pe_pctile = round(float((pes <= pe_ttm).sum() / len(pes) * 100), 2)

    # entryZone: 30%/70% 分位
    p30 = round(float(np.percentile(pes, ENTRY_ZONE_PCTL_LOW)), 2)
    p70 = round(float(np.percentile(pes, ENTRY_ZONE_PCTL_HIGH)), 2)

    # fromHigh_pe: 当前 PE 相对历史 max 的回落幅度（负数表示低于历史最高）
    max_pe = float(pes.max())
    from_high_pe = round((pe_ttm - max_pe) / max_pe, 4)

    # flags 检测（原有 3 条 + commit 4.12 新增 3 条 · 用 ' · ' 拼接不覆盖）
    flags = []
    if pe_ttm > EXTREME_PE_HIGH:
        flags.append('⚠️PE异常高·可能失真')
    if pe_ttm < EXTREME_PE_LOW:
        flags.append('⚠️PE极低·可能数据异常')
    if len(history) < WIN_HISTORY_MIN:
        flags.append(f'⚠️历史<1y({len(history)}条)·分位可能失真')
    # ★ commit 4.12 规则 1：lastHistDate 距今 > 60 天 → 数据过期
    age_days = _last_hist_age_days()
    if age_days is not None and age_days > HISTORY_STALE_DAYS:
        flags.append(f'⚠️数据过期·历史停止更新({age_days}天前)')
    # ★ commit 4.12 规则 2：pePercentile >= 99% → 历史最贵区间
    if pe_pctile >= EXTREME_PCTL:
        flags.append(f'⚠️分位极端高·历史最贵区间({pe_pctile}%)')
    # ★ commit 4.12 规则 3：所有有效 PE 股（pe_ttm 有值）都标单源 PE 数据
    flags.append('⚠️单源PE数据(baostock)')
    # ★ commit 4.14 规则 4：688183 生益电子历史含极端 PE（2024 业绩暴跌·83 天 PE>1000）→ 分位参考价值有限
    if code == '688183':
        extreme_pe_days = int((pes > 1000).sum())
        if extreme_pe_days > 0:
            flags.append(f'⚠️历史含极端PE(2024业绩暴跌·{extreme_pe_days}天PE>1000)·分位参考价值有限')
    # ★ commit 4.14 规则 5：300476 胜宏科技分位与同花顺存在口径差异（baostock vs 同花顺约8%偏差）
    if code == '300476':
        flags.append('⚠️分位与同花顺存在口径差异(baostock vs 同花顺约8%偏差)')

    return {
        'pePercentile': pe_pctile,
        'entryZone': {'p30': p30, 'p70': p70},
        'fromHigh_pe': from_high_pe,
        'flag': ' · '.join(flags) if flags else None
    }


def inject_to_auto_js(results):
    """用正则替换 pcb.auto.js·给每个 stock 的 valuation 块加/覆盖新字段。

    ★ commit 4.23 幂等性修复：
      - 写入前先检测 4 个字段（pePercentile/entryZone/fromHigh_pe/flag）是否已存在
      - 已存在 → 原地覆盖更新（不追加）
      - 不存在 → 在 source 前插入（原始行为）
      - 重复跑两次后 pcb.auto.js 行数不变
    """
    text = AUTO_JS.read_text(encoding='utf-8')

    # 4 个字段名（与 pcb.auto.js 字面量一致）
    FIELDS = ['pePercentile', 'entryZone', 'fromHigh_pe', 'flag']

    for code, r in results.items():
        # 匹配 '  600183': { ...\n      source: {（注：pcb.auto.js 中 stock code 是字符串字面量带单引号）
        pattern = re.compile(
            rf"(    '{re.escape(code)}': \{{)([\s\S]*?)(      source: \{{)",
            re.MULTILINE
        )
        m = pattern.search(text)
        if not m:
            print(f'  ⚠️ 未匹配 {code}（可能格式变了）')
            continue

        head, mid, tail = m.group(1), m.group(2), m.group(3)
        block = mid  # code 块内（不含 head/tail）

        # ★ commit 4.23：检测 4 个字段是否已存在
        # 已存在的字段：原地覆盖；不存在的字段：在 source 前插入
        existing_fields = {}
        for fld in FIELDS:
            # 匹配 "      fldName: ..."（到行尾或逗号）
            fpat = re.compile(rf"^      {fld}: (.*?)(?=,\s*$|,)", re.MULTILINE)
            fmatch = fpat.search(block)
            if fmatch:
                existing_fields[fld] = (fmatch.start(), fmatch.end())

        # 构造新字段值（不依赖 raw JS 文本·直接构造新行）
        new_field_lines = {}    # fld -> 构造的 JS 行（无尾部换行）
        new_field_lines['pePercentile'] = f"      pePercentile: {r['pePercentile'] if r['pePercentile'] is not None else 'null'},"
        if r['entryZone'] is not None:
            new_field_lines['entryZone'] = f"      entryZone: {{p30: {r['entryZone']['p30']}, p70: {r['entryZone']['p70']}}},"
        else:
            new_field_lines['entryZone'] = "      entryZone: null,"
        new_field_lines['fromHigh_pe'] = f"      fromHigh_pe: {r['fromHigh_pe'] if r['fromHigh_pe'] is not None else 'null'},"
        if r.get('flag'):
            flag_safe = r['flag'].replace('\\', '\\\\').replace('"', '\\"')
            new_field_lines['flag'] = f'      flag: "{flag_safe}",'
        else:
            new_field_lines['flag'] = "      flag: null,"

        if existing_fields:
            # ★ 全部覆盖：逐字段替换（field name + content 不变·只换 value 部分）
            # 在 mid 内部按 start 倒序替换·避免偏移
            sorted_existing = sorted(existing_fields.items(), key=lambda kv: kv[1][0], reverse=True)
            new_mid = block
            for fld, (s, e) in sorted_existing:
                # 找原行（包括尾部换行）
                line_end = new_mid.find('\n', e)
                if line_end == -1:
                    line_end = len(new_mid)
                else:
                    line_end += 1   # 包含换行符
                # 替换整行
                # 注意：field name 保留（防止误改），但 content 替换
                # 原行可能是 "      pePercentile: 99.75," 之类，新行同前缀换 value
                # 用新的 new_field_lines[fld] 直接整行替换
                new_mid = new_mid[:s] + new_field_lines[fld] + '\n' + new_mid[line_end:]
            text = text[:m.start(2)] + new_mid + text[m.end(2):]
        else:
            # 原始路径：4 个字段都不存在 → 在 source 前插入
            insert_lines = list(new_field_lines.values())
            new_mid = block + '\n'.join(insert_lines) + '\n      '
            text = text[:m.start(2)] + new_mid + text[m.end(2):]

    # 更新 _meta.note
    text = re.sub(
        r"note: '★ [^']+',",
        "note: '★ 阶段三 commit 3.2 + commit 4.12：numpy 算 pePercentile/entryZone/fromHigh_pe · 3 条自动 flag(数据过期/分位极端高/单源PE)· 不拉网络·基于 commit 3.1.2 pe_history 序列',",
        text, count=1
    )

    AUTO_JS.write_text(text, encoding='utf-8')


def main():
    print(f'========================================')
    print(f'阶段三 commit 3.2 · numpy 算 PE 分位（不拉网络）')
    print(f'========================================')
    print(f'EXTREME_PE_HIGH = {EXTREME_PE_HIGH} (pe_ttm>此值标 ⚠️PE异常高)')
    print(f'EXTREME_PE_LOW = {EXTREME_PE_LOW} (pe_ttm<此值标 ⚠️PE极低)')
    print(f'WIN_HISTORY_MIN = {WIN_HISTORY_MIN} (历史<此值标 ⚠️分位可能失真)')
    print()

    # 1) 加载 valuations
    print('加载 pcb.auto.js valuations ...')
    valuations = load_valuations()
    print(f'✓ 加载 {len(valuations)} 只 stock')
    print()

    # 2) 逐只算分位
    print('逐只算 PE 分位 ...')
    results = {}
    for code, val in valuations.items():
        if val is None:
            results[code] = {
                'pePercentile': None, 'entryZone': None, 'fromHigh_pe': None,
                'flag': '⚠️拉取失败'
            }
        else:
            results[code] = calc_stock_percentile(code, val)
    print(f'✓ 算完 {len(results)} 只')
    print()

    # 3) 摘要统计
    pe_pctl_ok = sum(1 for r in results.values() if r['pePercentile'] is not None)
    entry_ok = sum(1 for r in results.values() if r['entryZone'] is not None)
    from_high_ok = sum(1 for r in results.values() if r['fromHigh_pe'] is not None)
    extreme_high = sum(1 for code, r in results.items()
                        if valuations.get(code) and valuations[code].get('pe_ttm')
                        and valuations[code]['pe_ttm'] > EXTREME_PE_HIGH)
    history_short = sum(1 for r in results.values() if r['flag'] and '<1y' in r['flag'])

    print(f'========================================')
    print(f'摘要')
    print(f'========================================')
    print(f'pePercentile 有值: {pe_pctl_ok} / {len(results)}')
    print(f'entryZone 有值: {entry_ok} / {len(results)}')
    print(f'fromHigh_pe 有值: {from_high_ok} / {len(results)}')
    print(f'pe_ttm > {EXTREME_PE_HIGH} 异常: {extreme_high} 只')
    print(f'历史<1y（分位可能失真）: {history_short} 只')
    # ★ commit 4.12：3 条新规则统计
    stale_count = sum(1 for code, r in results.items() if r['flag'] and '数据过期' in r['flag'])
    extreme_pctl_count = sum(1 for r in results.values() if r['flag'] and '分位极端高' in r['flag'])
    single_source_count = sum(1 for r in results.values() if r['flag'] and '单源PE数据' in r['flag'])
    print(f'★ commit 4.12：')
    print(f'  数据过期（距今 > {HISTORY_STALE_DAYS} 天）: {stale_count} 只')
    print(f'  分位极端高（≥ {EXTREME_PCTL}%）: {extreme_pctl_count} 只')
    print(f'  单源PE数据（baostock）: {single_source_count} 只')
    print()

    # 4) 5 只卡口抽样
    print('--- 5 只卡口分位 ---')
    for code in ['601208', '300395', '301217', '002916', '600183']:
        r = results.get(code, {})
        v = valuations.get(code, {})
        pe = v.get('pe_ttm')
        print(f'  {code} pe_ttm={pe} · pePercentile={r.get("pePercentile")}% · '
              f'entryZone={r.get("entryZone")} · fromHigh_pe={r.get("fromHigh_pe")} · '
              f'flag={r.get("flag")}')
    print()

    # 5) 注入回 pcb.auto.js
    print('注入回 pcb.auto.js ...')
    inject_to_auto_js(results)
    print(f'✓ 写入完成')

    # 6) 返回 results 给可能的调用方（调试用）
    return results


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'\\n❌ 脚本异常退出: {type(e).__name__}: {e}', file=sys.stderr)
        sys.exit(1)
