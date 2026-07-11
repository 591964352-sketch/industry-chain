"""scripts/_move_holding_to_after_fourq.py
移动 section-holding 块（持仓管理）从当前位置到 section-fourq 之后。
操作：cut L2565-L2820 (256 lines), paste after L3799 (end of section-fourq)。
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

INDEX = r'd:\乌龟\产业链全景\index.html'
HOLDING_START = 2565  # 起始（含注释行）· 1-based
HOLDING_END   = 2820  # 结束（含关闭注释）· 1-based
FOURQ_END     = 3799  # section-fourq 闭合行（h += 收尾）· 1-based

with open(INDEX, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 0-based 索引
hs = HOLDING_START - 1   # 2564
he = HOLDING_END         # 2820 (exclusive)
fe = FOURQ_END           # 3799 (exclusive)

print(f'原文件总行数: {len(lines)}')
print(f'section-holding 块: L{HOLDING_START}-L{HOLDING_END} ({he - hs} lines, 0-based [{hs}:{he}])')
print(f'section-fourq 结束: L{FOURQ_END} (0-based [{fe}:])')

# 切片重拼
part1 = lines[0:hs]                # 渲染前部（L1-L2564）
part_holding = lines[hs:he]        # section-holding 块（L2565-L2820）
part2 = lines[he:fe]               # 中间段（L2821-L3799，包括空行/其他 section）
part3 = lines[fe:]                 # 渲染后部（L3800 之后，包括空行 + comment + container.innerHTML）

# 新顺序：part1 + part2 + part_holding + part3
# 也就是：把 section-holding 插到 part2 之后（part2 末尾就是 section-fourq 结束）
new_lines = part1 + part2 + part_holding + part3

print(f'新文件总行数: {len(new_lines)}（应等于原行数 {len(lines)}）')
assert len(new_lines) == len(lines), '行数不一致！'

# 写回
with open(INDEX, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

# 验证：检查关键字符串在新文件中的位置
text = ''.join(new_lines)
hold_start = text.find('★ commit 4.75：第四层·持仓管理')
hold_end = text.find('关闭 section-holding（持仓管理 section · 默认展开）')
fourq_end_pos = text.find('⑧ 关闭：card / fourq-wrap / section-body / section')
print(f'\n=== 验证位置 ===')
print(f'持仓管理注释位置: char {hold_start}')
print(f'持仓管理关闭注释位置: char {hold_end}')
print(f'四问关闭注释位置: char {fourq_end_pos}')
print(f'持仓管理 in 四问关闭之后? {hold_end > fourq_end_pos}')

print('\nDONE.')