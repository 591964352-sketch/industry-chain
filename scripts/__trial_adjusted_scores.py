#!/usr/bin/env python3
"""__trial_adjusted_scores.py — 试算 19 只虚高 stock 的调整后 valuation score"""
import json

with open('.claude/scratch/pcb_cagr_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

inflated = [
    ('301200','大族数控',3,100.00),
    ('301377','鼎泰高科',3,99.88),
    ('002913','奥士康',3,99.83),
    ('600183','生益科技',3,99.67),
    ('605589','圣泉集团',3,99.66),
    ('603920','世运电路',3,97.11),
    ('001389','广合科技',3,96.28),
    ('688388','嘉元科技',3,88.93),
    ('600176','中国巨石',2,100.00),
    ('603002','宏昌电子',2,99.83),
    ('601208','东材科技',2,99.75),
    ('002080','中材科技',2,99.75),
    ('603256','宏和科技',2,99.51),
    ('603186','华正新材',2,96.62),
    ('300476','胜宏科技',2,90.17),
    ('603650','彤程新材',2,89.35),
    ('301150','中一科技',3,80.50),
    ('603519','南亚新材',3,76.71),
    ('688183','生益电子',4,59.50),
]

def score_from_pe(pe):
    if pe < 30: return 5
    if pe < 50: return 4
    if pe < 70: return 3
    if pe < 85: return 2
    return 1

print(f'code     name     revCAGR  npCAGR  qual   adj   rawPE   adjPE curr  new  S10 note')
print('-'*100)

stats = {'improved_2':0,'improved_1':0,'aligned':0,'no_change':0,'still_gap':0}
detail = []

for code, name, curr_score, raw_pe in inflated:
    r = data['results'].get(code)
    if not r:
        print(f'{code:<8} {name:<8} {"N/A":>7} {"N/A":>7} {"N/A":>5} {"N/A":>5} {raw_pe:>7.2f}% {"N/A":>7} {curr_score:>4} {"?":>4} {"?":>4}')
        continue

    rev_cagr = r['rev_cagr'] or 0
    np_cagr = r['np_cagr'] or 0
    quality = r['quality']
    adj = r['adj']

    if raw_pe > 70:
        adj_pe = max(50.0, raw_pe + adj)
    else:
        adj_pe = raw_pe

    new_score = score_from_pe(adj_pe)
    s10_score = score_from_pe(raw_pe)
    delta = new_score - curr_score
    gap = new_score - s10_score

    note = ''
    if raw_pe <= 70:
        note = '[PE<=70% no adj]'
    elif adj == 0:
        note = '[low growth no adj]'
    elif gap > 0:
        note = f'[still +{gap} vs S10]'

    if delta == 2: stats['improved_2'] += 1; note += ' **改善2档'
    elif delta == 1: stats['improved_1'] += 1; note += ' **改善1档'
    if gap == 0: stats['aligned'] += 1; note += ' ==对齐S10'
    if gap > 0: stats['still_gap'] += 1
    if delta == 0 and gap > 0: stats['no_change'] += 1

    print(f'{code:<8} {name:<8} {rev_cagr:>6.1f}% {np_cagr:>6.1f}% {quality:>4.1f} {adj:>5.0f}pp {raw_pe:>6.2f}% {adj_pe:>6.2f}% {curr_score:>4} {new_score:>4} {s10_score:>4} {note}')
    detail.append({'code':code,'name':name,'curr':curr_score,'new':new_score,'s10':s10_score,'adj_pe':adj_pe,'adj':adj})

print()
print('='*60)
print('汇总')
print(f'  改善 2 档 (虚高2→对齐):  {stats["improved_2"]}')
print(f'  改善 1 档 (虚高2→1/1→对齐): {stats["improved_1"]}')
print(f'  完全对齐 S10:             {stats["aligned"]}')
print(f'  无变化 (调整不触发):       {stats["no_change"]}')
print(f'  仍有差距 (改善后仍虚高):   {stats["still_gap"]}')
print(f'  总计:                      {len(inflated)}')

# Cross-validation candidates: pick 5-8 with diverse characteristics
print()
print('='*60)
print('交叉验证候选 (5-8 只, 覆盖不同调整模式)')
print()

# Pick: 1 high-growth aligned, 1 medium-growth improved, 1 low-growth no-change,
#       1 PE<=70% no-adj, 1 loss-making, 1 extreme PE, 1 moderate PE, 1 high-growth still-gap
candidates = []
for d in detail:
    if d['code'] == '301200': candidates.append((d, '高增长+极端PE+改善1档(adj=-18pp)'))
    if d['code'] == '600183': candidates.append((d, '高增长+极端PE+改善1档(adj=-10pp)'))
    if d['code'] == '688183': candidates.append((d, 'PE<=70%不触发调整'))
    if d['code'] == '603186': candidates.append((d, '中增长+高PE+改善1档(adj=-5pp)'))
    if d['code'] == '605589': candidates.append((d, '低增长+极端PE+无adj'))
    if d['code'] == '301377': candidates.append((d, '中高增长+极端PE+对齐S10(adj=-10pp)'))
    if d['code'] == '601208': candidates.append((d, '中等增长+极端PE+改善1档(adj=-2pp)'))
    if d['code'] == '300476': candidates.append((d, '高增长+高PE+改善1档(adj=-18pp)'))

for d, reason in candidates:
    print(f'  {d["code"]} {d["name"]}: curr={d["curr"]} new={d["new"]} s10={d["s10"]} adjPE={d["adj_pe"]:.1f}% adj={d["adj"]:.0f}pp | {reason}')
