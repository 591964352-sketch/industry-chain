"""
scripts/calc_signal_c_history.py
★ commit 4.57：信号 C 5 年历史回放
★ commit 4.67：历史回放参数放宽（与实时信号 SIGNAL_C 分离·仅研究用）

输入：pcb.auto.js pe_history + pcb.close_history.js close_history + pcb.auto.js volume_history + pcb.manual.js stock 元数据
输出：注入到 pcb.js 的 CHAINS.pcb.signalCHistory 全局块

★ commit 4.67：历史回放研究参数（比实时信号 SIGNAL_C 更宽松）
  目的：增加历史样本量·研究胜率规律
  注意：此参数仅用于历史回放·不影响 pcb.js SIGNAL_C 实时触发逻辑

触发条件（★ 4.67 历史研究参数 · 与实时信号不同）：
  条件 A（4 子条件 AND）：
    ① pctlDrop ≤ -10pp (pePercentile - maxPctl90d)        # 4.67 放宽：-15 → -10
    ② barrier ∈ {'极高', '高'}                              # 4.67 放宽：'极高' → ['极高', '高']
    ③ fromHigh ≤ -10%                                       # 4.67 放宽：-15% → -10%
    ④ volRatio5d ≤ 1.5
  条件 B（5 子条件 AND）：
    ① pePercentile < 75 (growthAdj) 或 < 65 (普通)            # 4.67 放宽：60/50 → 75/65
    ② fromHigh ≤ -8%                                        # 4.67 放宽：-10% → -8%
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

# ★ commit 4.67：历史回放研究参数（比实时信号 SIGNAL_C 宽松）
#   实时信号阈值见 pcb.js SIGNAL_C（L867-876），不动
#   此处放宽目的：增加历史样本量·研究胜率规律·不影响 pcb.js 实时触发逻辑
PCTL_DROP_A = 10            # A: pctlDrop ≤ -10pp （4.67 放宽：15 → 10）
FROM_HIGH_A = -0.10         # A: fromHigh ≤ -10% （4.67 放宽：-0.15 → -0.10）
FROM_HIGH_B = -0.08         # B: fromHigh ≤ -8% （4.67 放宽：-0.10 → -0.08）
VOL_RATIO_MAX = 1.5         # 共用（保持）
PCTL_GROWTH_B = 75          # B: growthAdj pePercentile 上限 （4.67 放宽：60 → 75）
PCTL_NORMAL_B = 65          # B: 普通 pePercentile 上限 （4.67 放宽：50 → 65）
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


def check_signal_c(val, manual_stock, target_date, close_history=None):
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

    # ★ commit 4.67 bug 修复：close_history 通过参数传入（之前从 val 取永远 None）
    ch = close_history if close_history is not None else val.get('close_history', [])
    from_high = calc_from_high(ch, target_date)
    if from_high is None:
        return {'excluded': 'close_no_data'}

    vol_ratio = calc_vol_ratio_5d(val.get('volume_history', []), target_date)
    if vol_ratio is None:
        return {'excluded': 'volRatio_no_data'}

    barrier = manual_stock.get('barrier', '')
    trend = manual_stock.get('trend', '')
    is_growth_adj = manual_stock.get('growthAdj', False)

    # 条件 A：4 子条件 AND ★ commit 4.67 barrier 放宽到 ['极高', '高']
    hit_a = (pctl_drop <= -PCTL_DROP_A
             and barrier in ('极高', '高')
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
        result = check_signal_c(val, manual_stock, date, close_history)
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
    """注入到 pcb.js CHAINS.pcb.signalCHistory（替换现有块·不重复追加）

    ★ commit 4.67 修复：原版每次运行都在 signalCMeta 后追加新 signalCHistory 块
    导致 pcb.js 累积 4 个重复块·本次改为：先删旧块（如果有）→ 再在 signalCMeta 后插入
    """
    text = PCB_JS.read_text(encoding='utf-8')

    # 1) 定位 signalCMeta 块（注入锚点）
    cm_pattern = re.compile(r"(  CHAINS\.pcb\.signalCMeta = \{[\s\S]*?\n  \};)", re.MULTILINE)
    cm_match = cm_pattern.search(text)
    if not cm_match:
        raise RuntimeError('未找到 signalCMeta 块·注入失败')

    # 2) 删除现有 signalCHistory 块（幂等性·防重复）
    #    模式：从 signalCMeta 块结尾到下一个 `  };` 顶层缩进结束·匹配整个 signalCHistory 块
    hist_pattern = re.compile(r"\n+  CHAINS\.pcb\.signalCHistory = \{[\s\S]*?\n  \};", re.MULTILINE)
    text_no_hist = hist_pattern.sub('', text)
    hist_removed = hist_pattern.findall(text)
    if hist_removed:
        print(f'  ↻ 删除 {len(hist_removed)} 个旧 signalCHistory 块（幂等性保护）')

    # 3) 在 signalCMeta 块后插入新块（用清理后的文本重新定位）
    cm_match_new = cm_pattern.search(text_no_hist)
    if not cm_match_new:
        raise RuntimeError('清理旧块后 signalCMeta 块丢失（异常）')

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
    note: '★ commit 4.67：历史回放参数放宽（pctlDrop 15→10·barrier 极高→极高/高·fromHigh -15%→-10%·pePctl 60/50→75/65）·仅研究用·不影响 pcb.js SIGNAL_C 实时逻辑'
  }};"""
    final_text = text_no_hist[:cm_match_new.end()] + new_block + text_no_hist[cm_match_new.end():]
    PCB_JS.write_text(final_text, encoding='utf-8')


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