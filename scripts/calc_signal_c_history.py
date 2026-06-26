"""
scripts/calc_signal_c_history.py
★ commit 4.57：信号 C 5 年历史回放

输入：pcb.auto.js pe_history + pcb.close_history.js close_history + pcb.auto.js volume_history + pcb.manual.js stock 元数据
输出：注入到 pcb.js 的 CHAINS.pcb.signalCHistory 全局块

触发条件（★ 必须与实时 signalCMeta 一致 · data/pcb.js L865-959）：
  条件 A（4 子条件 AND）：
    ① pctlDrop ≤ -15pp (pePercentile - maxPctl90d)
    ② barrier === '极高'
    ③ fromHigh ≤ -15%
    ④ volRatio5d ≤ 1.5
  条件 B（5 子条件 AND）：
    ① pePercentile < 60 (growthAdj) 或 < 50 (普通)
    ② fromHigh ≤ -10%
    ③ volRatio5d ≤ 1.5
    ④ barrier ∈ {'极高', '高'}
    ⑤ trend !== 'down'
  关系：A OR B（任一触发即计入 triggeredList）
  硬性排除：pe_ttm=null(亏损) / flag含'⚠️PE异常高' / investable=false / region!=='国内' / marketRisk='extreme'

§6.2 红线：所有记录带 flag='⚠️历史回放·非真实记录'
"""
import re, sys, json
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parent.parent
AUTO_JS = ROOT / 'data' / 'pcb.auto.js'
MANUAL_JS = ROOT / 'data' / 'pcb.manual.js'
CLOSE_JS = ROOT / 'data' / 'pcb.close_history.js'
PCB_JS = ROOT / 'data' / 'pcb.js'

# ★ 必须与 pcb.js SIGNAL_C 一致
PCTL_DROP_A = 15            # A: pctlDrop ≤ -15pp
FROM_HIGH_A = -0.15         # A: fromHigh ≤ -15%
FROM_HIGH_B = -0.10         # B: fromHigh ≤ -10%
VOL_RATIO_MAX = 1.5         # 共用
PCTL_GROWTH_B = 60          # B: growthAdj pePercentile 上限
PCTL_NORMAL_B = 50          # B: 普通 pePercentile 上限
HOLDING_DAYS = [30, 60, 90]
WIN_HISTORY_MIN = 252       # 与 calc_percentile.py 一致


def load_valuations():
    import subprocess
    out = subprocess.run(['node', '-e', '''
        global.window = {}; require('./data/pcb.auto.js');
        process.stdout.write(JSON.stringify(global.window.PCB_AUTO.valuations));
    '''], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    if out.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.auto.js 失败:\n{out.stderr}')
    return json.loads(out.stdout)


def load_close_history():
    import subprocess
    out = subprocess.run(['node', '-e', '''
        global.window = {}; require('./data/pcb.close_history.js');
        process.stdout.write(JSON.stringify(global.window.PCB_CLOSE_HISTORY));
    '''], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    if out.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.close_history.js 失败:\n{out.stderr}')
    return json.loads(out.stdout)


def load_manual_stocks():
    """加载 pcb.manual.js 的 stock 元数据（barrier/trend/region/investable/growthAdj/flag）"""
    import subprocess
    out = subprocess.run(['node', '-e', '''
        global.window = {}; require('./data/pcb.manual.js');
        const m = global.window.PCB_MANUAL.stocks;
        const result = {};
        Object.keys(m).forEach(code => {
          const s = m[code];
          result[code] = {
            name: s.name,
            barrier: s.barrier,
            trend: s.trend,
            region: s.region,
            investable: s.investable,
            growthAdj: s.growthAdj || false,
            flag: s.flag || (s.fundamentals && s.fundamentals.note) || ''
          };
        });
        process.stdout.write(JSON.stringify(result));
    '''], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    if out.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.manual.js 失败:\n{out.stderr}')
    return json.loads(out.stdout)


def calc_pctl_at_date(pe_history, target_date, target_pe):
    """target_date 当日 PE 在历史中的分位（仅 ≤ target_date 的历史）"""
    past = [h for h in pe_history if h['date'] <= target_date and h.get('pe') is not None and h.get('pe', 0) > 0]
    if len(past) < WIN_HISTORY_MIN: return None
    pes = [h['pe'] for h in past]
    return (sum(1 for x in pes if x <= target_pe) / len(pes)) * 100


def calc_max_pctl_90d(pe_history, target_date):
    """近 90 天 maxPctl（仅 ≤ target_date 数据）"""
    past = [h for h in pe_history if h['date'] <= target_date and h.get('pe') is not None and h.get('pe', 0) > 0]
    if len(past) < 90: return None
    recent = past[-90:]
    all_pes = [h['pe'] for h in past]
    max_pctl = 0
    for pe_item in recent:
        pctl = (sum(1 for x in all_pes if x <= pe_item['pe']) / len(all_pes)) * 100
        max_pctl = max(max_pctl, pctl)
    return round(max_pctl, 2)


def calc_from_high(close_history, target_date):
    """距历史 max 回撤（仅 ≤ target_date 数据）"""
    past = [h['close'] for h in close_history if h['date'] <= target_date]
    if not past: return None
    return round((past[-1] - max(past)) / max(past), 4)


def calc_vol_ratio_5d(volume_history, target_date):
    """5日/60日 量比（仅 ≤ target_date 数据）"""
    past = [h for h in volume_history if h['date'] <= target_date and h.get('volume', 0) > 0]
    if len(past) < 60: return None
    vols = [h['volume'] for h in past]
    avg5 = sum(vols[-5:]) / 5
    avg60 = sum(vols[-60:]) / 60
    return round(avg5 / avg60, 4) if avg60 else None


def check_excluded(val, manual_stock):
    """硬性排除检查"""
    # pe_ttm=null（亏损股）
    if val.get('pe_ttm') is None: return 'pe_ttm_null'
    # flag 含 '⚠️PE异常高'
    if '⚠️PE异常高' in (manual_stock.get('flag') or ''): return 'pe_extreme_high'
    # investable=false
    if manual_stock.get('investable') is False: return 'investable_false'
    # region !== '国内'
    if manual_stock.get('region') != '国内': return 'region_not_cn'
    return None  # 不被排除


def check_signal_c(val, manual_stock, target_date):
    """检查 target_date 是否触发信号 C（A OR B）"""
    # 硬性排除
    excluded = check_excluded(val, manual_stock)
    if excluded: return {'excluded': excluded}

    pe_history = val.get('pe_history', [])
    # 找 target_date 当日 PE
    pe_at_date = next((h.get('pe') for h in pe_history if h['date'] == target_date), None)
    if pe_at_date is None or pe_at_date <= 0:
        return {'excluded': 'pe_no_data'}

    pctl = calc_pctl_at_date(pe_history, target_date, pe_at_date)
    max_pctl = calc_max_pctl_90d(pe_history, target_date)
    if pctl is None or max_pctl is None:
        return {'excluded': 'pctl_insufficient'}
    pctl_drop = pctl - max_pctl  # 注意：pctl_drop ≤ -15 触发 → pctl - maxPctl ≤ -15

    from_high = calc_from_high(val.get('close_history', []) or val.get('_close_history', []), target_date)
    if from_high is None:
        return {'excluded': 'close_no_data'}

    vol_ratio = calc_vol_ratio_5d(val.get('volume_history', []), target_date)
    if vol_ratio is None:
        return {'excluded': 'volRatio_no_data'}

    barrier = manual_stock.get('barrier', '')
    trend = manual_stock.get('trend', '')
    is_growth_adj = manual_stock.get('growthAdj', False)

    # 条件 A：4 子条件 AND
    hit_a = (pctl_drop <= -PCTL_DROP_A
             and barrier == '极高'
             and from_high <= FROM_HIGH_A
             and vol_ratio <= VOL_RATIO_MAX)

    # 条件 B：5 子条件 AND
    pctl_b = PCTL_GROWTH_B if is_growth_adj else PCTL_NORMAL_B
    hit_b = (pctl < pctl_b
             and from_high <= FROM_HIGH_B
             and vol_ratio <= VOL_RATIO_MAX
             and barrier in ('极高', '高')
             and trend != 'down')

    if not hit_a and not hit_b:
        return {'excluded': 'not_triggered'}

    return {
        'hit': True,
        'hitA': hit_a,
        'hitB': hit_b,
        'pctl': round(pctl, 2),
        'maxPctl90d': max_pctl,
        'pctlDrop': round(pctl_drop, 2),
        'fromHigh': from_high,
        'volRatio5d': vol_ratio,
    }


def calc_returns(close_history, entry_date, days):
    """entry_date 后 N 天收益"""
    future = [h for h in close_history if h['date'] > entry_date]
    if len(future) < days: return None, None
    entry_close = next((h['close'] for h in close_history if h['date'] == entry_date), None)
    if entry_close is None: return None, None
    exit_close = future[days - 1]['close']
    return exit_close, round((exit_close - entry_close) / entry_close, 4)


def replay_stock(code, val, manual_stock, close_history):
    """单只 stock 历史回放"""
    pe_history = val.get('pe_history', [])
    if not pe_history or not close_history:
        return []
    trade_dates = sorted(set(h['date'] for h in close_history))
    runs = []
    for date in trade_dates:
        result = check_signal_c(val, manual_stock, date)
        if not result.get('hit'): continue
        entry_price = next((h['close'] for h in close_history if h['date'] == date), None)
        if entry_price is None: continue
        conditions = []
        if result['hitA']: conditions.append('A')
        if result['hitB']: conditions.append('B')
        d30p, r30 = calc_returns(close_history, date, 30)
        d60p, r60 = calc_returns(close_history, date, 60)
        d90p, r90 = calc_returns(close_history, date, 90)
        runs.append({
            'date': date,
            'code': code,
            'name': manual_stock.get('name', ''),
            'conditions': '+'.join(conditions),
            'entryPrice': round(entry_price, 2),
            'd30Price': d30p, 'd60Price': d60p, 'd90Price': d90p,
            'return30': r30, 'return60': r60, 'return90': r90,
            'pctlDrop': result['pctlDrop'],
            'fromHigh': result['fromHigh'],
            'volRatio5d': result['volRatio5d'],
            'flag': '⚠️历史回放·非真实记录',
        })
    return runs


def calc_win_stats(runs):
    stats = {
        'totalRuns': len(runs),
        'winRate30': None, 'winRate60': None, 'winRate90': None,
        'avgReturn30': None, 'avgReturn60': None, 'avgReturn90': None,
        'maxWin': None, 'maxLoss': None,
        'triggeredByA': sum(1 for r in runs if 'A' in r['conditions']),
        'triggeredByB': sum(1 for r in runs if 'B' in r['conditions']),
    }
    for d in [30, 60, 90]:
        key = f'return{d}'
        valid = [r[key] for r in runs if r[key] is not None]
        if not valid: continue
        wins = sum(1 for r in valid if r > 0)
        stats[f'winRate{d}'] = round(wins / len(valid) * 100, 2)
        stats[f'avgReturn{d}'] = round(sum(valid) / len(valid) * 100, 2)
    all_r = [r[k] for r in runs for k in ['return30','return60','return90'] if r[k] is not None]
    if all_r:
        stats['maxWin'] = round(max(all_r) * 100, 2)
        stats['maxLoss'] = round(min(all_r) * 100, 2)
    return stats


def inject_to_pcb_js(signalCHistory):
    """注入到 pcb.js CHAINS.pcb.signalCHistory（在 signalCMeta 之后）"""
    text = PCB_JS.read_text(encoding='utf-8')
    pattern = re.compile(r"(  CHAINS\.pcb\.signalCMeta = \{[\s\S]*?\n  \};)", re.MULTILINE)
    m = pattern.search(text)
    if not m: raise RuntimeError('未找到 signalCMeta 块·注入失败')

    new_block = f"""
  CHAINS.pcb.signalCHistory = {{
    config: {{
      pctlDropThreshold: {PCTL_DROP_A},
      fromHighA: {FROM_HIGH_A},
      fromHighB: {FROM_HIGH_B},
      volRatioMax: {VOL_RATIO_MAX},
      pctlGrowthB: {PCTL_GROWTH_B},
      pctlNormalB: {PCTL_NORMAL_B},
      holdingDays: {HOLDING_DAYS},
      relationship: 'A OR B'
    }},
    runs: {json.dumps(signalCHistory['runs'], ensure_ascii=False)},
    stats: {json.dumps(signalCHistory['stats'], ensure_ascii=False)},
    note: '★ commit 4.57：信号 C 5 年历史回放·触发条件与实时 signalCMeta 一致 (A OR B) · 所有记录 flag ⚠️历史回放·非真实记录 · §6.2 红线不写入 pcb.manual.js'
  }};"""
    text = text[:m.end()] + new_block + text[m.end():]
    PCB_JS.write_text(text, encoding='utf-8')


def main():
    print('='*60)
    print('commit 4.57 · 信号 C 5 年历史回放')
    print(f'A 条件: pctlDrop≤-{PCTL_DROP_A}pp + barrier=极高 + fromHigh≤{FROM_HIGH_A} + volRatio≤{VOL_RATIO_MAX}')
    print(f'B 条件: pctl<{PCTL_GROWTH_B}/{PCTL_NORMAL_B} + fromHigh≤{FROM_HIGH_B} + volRatio≤{VOL_RATIO_MAX} + barrier∈{{极高,高}} + trend≠down')
    print('关系: A OR B')
    print('='*60)
    valuations = load_valuations()
    close_histories = load_close_history()
    manual_stocks = load_manual_stocks()
    print(f'加载 {len(valuations)} 只 stock · {len(close_histories)} close_history · {len(manual_stocks)} manual_stocks')

    all_runs = []
    for code, val in valuations.items():
        if val is None: continue
        manual_stock = manual_stocks.get(code, {})
        if not manual_stock: continue
        close_history = close_histories.get(code, [])
        if not close_history: continue
        runs = replay_stock(code, val, manual_stock, close_history)
        all_runs.extend(runs)
        if runs: print(f'  {code} {manual_stock.get("name","")}: {len(runs)} 条')

    all_runs.sort(key=lambda r: r['date'])
    stats = calc_win_stats(all_runs)
    print(f'\n总触发 {stats["totalRuns"]} 条 (A: {stats["triggeredByA"]} / B: {stats["triggeredByB"]})')
    print(f'30/60/90 天胜率: {stats["winRate30"]}% / {stats["winRate60"]}% / {stats["winRate90"]}%')
    print(f'30/60/90 天均收益: {stats["avgReturn30"]}% / {stats["avgReturn60"]}% / {stats["avgReturn90"]}%')

    print('注入 pcb.js signalCHistory ...')
    inject_to_pcb_js({'runs': all_runs, 'stats': stats})
    print('✓ 完成')


if __name__ == '__main__':
    main()