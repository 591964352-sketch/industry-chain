"""
scripts/_reorder_sections.py · 重组 renderChain section 拼接顺序（commit 4.82 · v2）

基于 4.80 稳定版行号切割（物理行号 5839 行）。
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

INDEX = r'd:\乌龟\产业链全景\index.html'
BACKUP = r'd:\乌龟\产业链全景\index.html.bak.4.82.pre'

with open(INDEX, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 物理行号（1-based）→ 切割点
# pre_rc_end_line = A_data_hero 起始行
# A_data_hero = L2024-2040 (17 行)
# B_treemap_pcb = L2041-2266 (226 行)
# M_demand = L2267-2336 (70 行)
# B2_treemap_old = L2337-2439 (103 行)
# section-overview 锚点 = L2440-2444 (5 行) — 删除
# C_macro = L2445-2560 (116 行)
# Q_quicknav = L2561-2565 (5 行) — 移到 A_data_hero 末尾
# D_holding = L2566-2822 (257 行)
# E_decision = L2823-3112 (290 行)
# F_meta = L3113-3191 (79 行)
# G_prosperity = L3193-3585 (393 行)
# H_occam = L3586-3601 (16 行)
# I_plain = L3602-3616 (15 行)
# J_upstream = L3617-3730 (114 行)
# K_midstream = L3731-3762 (32 行)
# L_fourq = L3763-3800 (38 行)
# post_rc = L3801-end

# 块定义（start_line, end_line_inclusive）
BLOCKS = {
    'A_data_hero':     (2024, 2040),  # 数据截止 + Hero Banner
    'B_treemap_pcb':   (2041, 2266),  # 树状图 PCB 5 列
    'M_demand':        (2267, 2336),  # 下游需求传导
    'B2_treemap_old':  (2337, 2439),  # 树状图旧 schema 兜底
    'C_macro':         (2445, 2560),  # 景气仪表盘
    'Q_quicknav':      (2561, 2565),  # 顶部锚点栏
    'D_holding':       (2566, 2822),  # 持仓管理
    'E_decision':      (2823, 3112),  # 投资决策
    'F_meta':          (3113, 3191),  # ⑥ 后段（卡脖子参考+供需缺口+方法论）
    'G_prosperity':    (3193, 3585),  # 赛道概览
    'H_occam':         (3586, 3601),  # 奥卡姆剃刀（仅 ai-full-chain）
    'I_plain':         (3602, 3616),  # 白话解读
    'J_upstream':      (3617, 3730),  # 上游深度拆解
    'K_midstream':     (3731, 3762),  # 中游
    'L_fourq':         (3763, 3800),  # 四问筛选
}

# 验证
for name, (s, e) in BLOCKS.items():
    if s < 1 or e > len(lines):
        print(f'OUT_OF_RANGE {name} L{s}-{e} (file {len(lines)} lines)'); sys.exit(1)
    print(f'  {name}: L{s}-L{e} ({e-s+1} lines)')

# 切割：pre_rc (L1-2023) + 14 块 + post_rc (L3801-end)
# 注意：跳过 L2440-2444 (section-overview 锚点) — 5 行删除
# 跳过 L3192 (空行/分隔)
# 跳过 L2566 之前的空行（L2564-2565）

pre_rc = lines[:2023]   # 0-2022
post_rc = lines[3800:]  # 3800-末尾 (L3801 开始)

# 抽取各块
blocks = {n: lines[s-1:e] for n, (s, e) in BLOCKS.items()}

# 验证：合计 + 跳过的行数 = 2023 + 块合计 + 跳过行 + post_rc
skipped_lines = 5 + 1  # section-overview 5 行 + L3192 空行
total_block_lines = sum(e - s + 1 for s, e in BLOCKS.values())
expected = 2023 + total_block_lines + skipped_lines + len(post_rc)
print(f'\n  pre_rc: 2023 lines')
print(f'  total_blocks: {total_block_lines} lines')
print(f'  skipped: {skipped_lines} lines')
print(f'  post_rc: {len(post_rc)} lines')
print(f'  sum: {expected} (file {len(lines)} lines) {"OK" if expected == len(lines) else "MISMATCH"}')

# ============= 拼接新顺序 =============
# 把 Q_quicknav 合并到 A_data_hero 末尾
hero_with_nav = blocks['A_data_hero'] + blocks['Q_quicknav']

NEW_ORDER = [
    ('A_data_hero',     hero_with_nav),    # 1. 数据截止 + QuickNav + Hero
    ('B_treemap_pcb',   blocks['B_treemap_pcb']),    # 2. 树状图 ② PCB 5 列
    ('B2_treemap_old',  blocks['B2_treemap_old']),   # 3. 树状图旧 schema 兜底
    ('G_prosperity',    blocks['G_prosperity']),     # 4. 赛道概览 ③
    ('C_macro',         blocks['C_macro']),          # 5. 景气仪表盘
    ('M_demand',        blocks['M_demand']),         # 6. 下游需求 ④
    ('J_upstream',      blocks['J_upstream']),       # 7. 上游 ⑤
    ('K_midstream',     blocks['K_midstream']),      # 8. 中游 ⑥
    ('L_fourq',         blocks['L_fourq']),          # 9. 四问 ⑦
    ('D_holding',       blocks['D_holding']),        # 10. 持仓 🔔
    ('E_decision',      blocks['E_decision']),       # 11. 投资决策 📊
    ('F_meta',          blocks['F_meta']),           # 12. ⑥ 后段（融入 decision）
    ('H_occam',         blocks['H_occam']),          # 13. 奥卡姆（ai-full-chain）
    ('I_plain',         blocks['I_plain']),          # 14. 白话 ⑧ 最末
]

# 拼接为 list of lines
new_body_lines = []
for name, block_lines in NEW_ORDER:
    new_body_lines.extend(block_lines)

# 重新拼装
new_lines = pre_rc + new_body_lines + post_rc

# 验证新行数
print(f'\n  new file: {len(new_lines)} lines (orig {len(lines)})')

# ============= 同步更新 section 编号 =============
# 编号在 line content 中，修改后写回
# 1. F_meta: ② ⑥ 后段 → ⑥ 后段（删 ②）
# 2. I_plain: ⑤ → ⑧
# 3. J_upstream: ⑥ → ⑤ (含 remainingSegs)
# 4. K_midstream: ⑦ → ⑥
# 5. L_fourq: ⑧ → ⑦
# 6. M_demand: ⑤ → ④

replacements = [
    ('② ⑥ 后段：卡脖子参考', '⑥ 后段：卡脖子参考'),
    ('<span class="num num-plain">⑤</span>', '<span class="num num-plain">⑧</span>'),
    ('<span class="num num-up">⑥</span> 上游深度拆解', '<span class="num num-up">⑤</span> 上游深度拆解'),
    ('<span class="num num-mid">⑥</span> 中游 — 制造与封测（半导体晶圆/封测）',
     '<span class="num num-mid">⑤</span> 中游 — 制造与封测（半导体晶圆/封测）'),
    ('<span class="num num-mid">⑦</span>', '<span class="num num-mid">⑥</span>'),
    ('<span class="num num-ser">⑧</span> 物理卡口 四问筛选', '<span class="num num-ser">⑦</span> 物理卡口 四问筛选'),
    ('<span class="num num-chain">⑤</span> 下游需求传导', '<span class="num num-chain">④</span> 下游需求传导'),
]

replaced_count = 0
for old, new in replacements:
    count_before = sum(1 for ln in new_lines if old in ln)
    if count_before > 0:
        new_lines = [ln.replace(old, new) for ln in new_lines]
        replaced_count += count_before
        print(f'  REPLACE_OK x{count_before}: {old[:50]}...')
    else:
        print(f'  REPLACE_MISS: {old[:50]}...')

print(f'\n  total replacements: {replaced_count}')

# 写回
with open(INDEX, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'\nDONE. {len(new_lines)} lines written.')
