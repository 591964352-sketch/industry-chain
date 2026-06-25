# -*- coding: utf-8 -*-
"""
scripts/cleanup_pcb_auto_duplicates.py
★ commit 4.23：清理 pcb.auto.js 历史重复字段 + volume_history 副本

背景：
  · commit 4.16 引入 calc_signal_c.py 时已存在 3 种重复 bug：
    1) 8 字段（pePercentile / entryZone / fromHigh_pe / flag /
       volRatio5d / maxPctl30d/60d/90d）每只 stock 块内出现 3 次
    2) volume_history 数组每只 stock 块内出现 2 份（不是你说的 26 只·实测 37 只都有）
    3) _meta.note 等顶层字段被重复更新（re.sub 不影响行数）
  · 共 111 个 pePercentile / 111 个 entryZone / 148 个 flag / 74 个 volume_history
  · 应清理到每只 stock 每字段 1 次（共 37 只 stock = 37 个）

清理策略（commit 4.23）：
  · 每只 stock 块内·对 8 字段 + volume_history·保留最后一次出现的行/块
  · volume_history 是数组（带嵌套 date 对象）·需按完整块删除
  · 已验证：volume_history 2 份内容完全相同（commit 4.15 重新拉时追加重复）

硬约束：
  · 只动 data/pcb.auto.js 一个文件
  · 不触碰 pcb.manual.js / pcb.js / index.html
  · JS 语法保持正确
  · 13 条赛道加载正常

用法：
  python scripts/cleanup_pcb_auto_duplicates.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUTO_JS = ROOT / 'data' / 'pcb.auto.js'

# 8 个字段名
FIELDS = ['pePercentile', 'entryZone', 'fromHigh_pe', 'flag',
          'volRatio5d', 'maxPctl30d', 'maxPctl60d', 'maxPctl90d',
          'closeLatest', 'closeHigh5y', 'fromHigh']   # ★ commit 4.30：补 close 3 字段

# 数组型字段（需要按完整块删除）
ARRAY_FIELDS = ['volume_history', 'pe_history']


def find_stock_blocks(lines):
    """找每只 stock 块的 [start, end) 范围。"""
    blocks = []
    starts = []
    for i, l in enumerate(lines):
        if re.match(r"^    '\d{6}': \{$", l):
            starts.append(i)
    for idx, s in enumerate(starts):
        if idx + 1 < len(starts):
            e = starts[idx + 1]
        else:
            e = len(lines)
            for j in range(len(lines) - 1, s, -1):
                if lines[j].strip() == '},':
                    e = j + 1
                    break
        blocks.append((s, e))
    return blocks


def find_array_block_end(lines, start_idx):
    """从 start_idx 开始（'      volume_history: [' 行）向后找匹配的 '],' 行。
    处理嵌套：count [ +=1, count ] +=1, count 到 0 时结束。
    """
    line = lines[start_idx]
    # 找 '],' 结束（同一只 stock 块内的第一个顶层 '],'）
    bracket_count = 0
    for j in range(start_idx, len(lines)):
        cur = lines[j]
        # 计算这一行的 [ 和 ]
        # 但要小心：日期字符串 / 注释中的 [ ] 不计入
        # 简化：只数左 / 中括号
        for ch in cur:
            if ch == '[':
                bracket_count += 1
            elif ch == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    return j + 1   # 包含 '],' 行
        # 简化处理失败 fallback：找独立 '],' 行
    # fallback: 找单独 '],' 行
    for j in range(start_idx + 1, len(lines)):
        if lines[j].strip() == '],':
            return j + 1
    return start_idx + 1


def main():
    text = AUTO_JS.read_text(encoding='utf-8')
    lines = text.split('\n')
    original_lines = len(lines)

    # 步骤 1：统计原始字段数
    original_counts = {}
    for fld in FIELDS:
        pat = re.compile(rf'^[ \t]*{re.escape(fld)}:\s', re.MULTILINE)
        original_counts[fld] = len(pat.findall(text))
    # 数组字段统计（只数顶级块开头）
    for fld in ARRAY_FIELDS:
        original_counts[fld] = sum(1 for l in lines if re.match(rf'^[ \t]*{re.escape(fld)}:\s*\[', l))

    print(f'=== 清理前字段统计 ===')
    print(f'  字段名                : 总次数')
    for fld in FIELDS + ARRAY_FIELDS:
        print(f'  {fld:20s}: {original_counts[fld]:6d}')
    print(f'  pcb.auto.js 总行数: {original_lines}')
    print()

    # 步骤 2：找 stock 块
    blocks = find_stock_blocks(lines)
    print(f'=== 识别到 {len(blocks)} 只 stock 块 ===')
    print()

    # 步骤 3：标记要删除的行
    to_delete = set()

    for s, e in blocks:
        # 找 source 行作为 block 边界（不在 source 之后找 8 字段）
        source_start = e
        for j in range(s, e):
            if re.match(r'^\s+source:\s*\{$', lines[j]):
                source_start = j
                break

        # 8 字段：保留每个字段最后一次出现的行
        for fld in FIELDS:
            occurrences = []
            for j in range(s, source_start):
                if re.match(r'^[ \t]*' + re.escape(fld) + r':\s', lines[j]):
                    occurrences.append(j)
            if len(occurrences) > 1:
                for j in occurrences[:-1]:
                    to_delete.add(j)

        # 数组字段（volume_history / pe_history）：保留每个数组最后一次出现的整块
        for fld in ARRAY_FIELDS:
            array_starts = []
            for j in range(s, source_start):
                if re.match(r'^[ \t]*' + re.escape(fld) + r':\s*\[', lines[j]):
                    array_starts.append(j)
            # 每个 array_starts 是一个完整数组块的起点·向后扫描到 '],'
            array_blocks = []   # [(start, end), ...]
            for as_ in array_starts:
                ae = find_array_block_end(lines, as_)
                array_blocks.append((as_, ae))
            # 保留最后 1 个·删除前 N-1 个整块
            if len(array_blocks) > 1:
                for as_, ae in array_blocks[:-1]:
                    for j in range(as_, ae):
                        to_delete.add(j)

    # 步骤 4：删除标记的行
    new_lines = [line for i, line in enumerate(lines) if i not in to_delete]
    deleted = len(to_delete)

    # 步骤 5：写回
    new_text = '\n'.join(new_lines)
    AUTO_JS.write_text(new_text, encoding='utf-8')

    # 步骤 6：验证清理后
    new_counts = {}
    for fld in FIELDS:
        pat = re.compile(rf'^[ \t]*{re.escape(fld)}:\s', re.MULTILINE)
        new_counts[fld] = len(pat.findall(new_text))
    for fld in ARRAY_FIELDS:
        new_counts[fld] = sum(1 for l in new_text.split('\n') if re.match(rf'^[ \t]*{re.escape(fld)}:\s*\[', l))

    print(f'=== 清理后字段统计 ===')
    print(f'  字段名                : 清理前 | 清理后 | 删除数')
    for fld in FIELDS + ARRAY_FIELDS:
        before = original_counts[fld]
        after = new_counts[fld]
        print(f'  {fld:20s}: {before:6d} | {after:6d} | {before - after}')
    print(f'  pcb.auto.js 总行数: {len(new_lines)}（减少 {original_lines - len(new_lines)}）')
    print()
    print(f'✅ 清理完成。共删除 {deleted} 行。')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'\n❌ 脚本异常退出: {type(e).__name__}: {e}', file=sys.stderr)
        sys.exit(1)