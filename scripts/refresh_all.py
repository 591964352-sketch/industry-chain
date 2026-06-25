# -*- coding: utf-8 -*-
"""
scripts/refresh_all.py
★ commit 4.23：一键刷新脚本（按顺序调用所有刷新/计算脚本）
★ commit 4.36：在 5 步之前加 Step 0 校验 stock code-name 一致性
★ commit 4.38：在 Step 5 后加 Step 6 拉取基本面数据注入 pcb.manual.js

调用顺序（7 步）：
  Step 0. scripts/validate_stock_codes.py  —— akshare 校验 pcb.manual.js stock code-name 一致性（阻断式）
  1. scripts/refresh_pcb_valuation.py      —— baostock 拉 PE 历史（5y 日频）
  2. scripts/calc_percentile.py             —— numpy 算 PE 分位（不拉网络）
  3. scripts/fetch_close_history.py         —— baostock 拉 close 历史 + fromHigh
  4. scripts/fetch_volume_history.py        —— baostock 拉 volume + turn 5y 日频
  5. scripts/calc_signal_c.py               —— 量比 + 近 N 天分位最大值（不拉网络）
  6. scripts/fetch_fundamentals.py          —— akshare 拉 ROE/毛利/营收/净利同比/FCF 注入 pcb.manual.js

行为规范：
  · 每步完成后打印进度「[OK] Step X/7 完成：xxx.py」
  · 任何一步失败（非零 exit code / exception）→ 立即停止并打印错误，不继续下一步
  · 最后输出总耗时（秒 + 分钟）
  · 支持命令行参数：
      --skip-fetch    跳过步骤 1/3/4/6（网络拉取）· 只跑步骤 2/5（本地计算）
                      用于数据已是最新时快速重算分位 + 信号 C
      --skip-validate 跳过 Step 0（紧急情况下用 · 已确认 pcb.manual.js 干净）
      --help          显示帮助

硬约束（commit 4.23 + 4.36 + 4.38）：
  · 只新建本脚本文件，不改任何 data/ 数据文件
  · 不修改 7 个被调用脚本
  · 失败立即终止·不静默吞错·不强行继续

⚠️ 副作用说明：
  · 本脚本端到端执行 7 个子脚本，运行后会刷新 data/pcb.auto.js（PE/分位/close/volume/C 信号）
    + data/pcb.manual.js（fundamentals 字段）—— 这是预期行为，用户跑本脚本就是为了一键刷新数据
  · commit 4.23 同步修复了两个写入脚本的幂等性 bug（calc_percentile.py /
    calc_signal_c.py 之前会重复跑追加字段·现已改为「已存在则覆盖更新」）
  · commit 4.36 加 Step 0 校验：防止 pcb.manual.js 里的 stock code-name 错位
    注入估值时按 code 拉数据，name 写错 → 数据错位 / 假数据伪装
  · commit 4.38 加 Step 6 拉取基本面：commit 4.38 用花括号深度跟踪防注入错位
  · 如需跳过 Step 0（紧急情况），使用 --skip-validate
  · 如需跳过网络拉取只重算本地数据，使用 --skip-fetch
"""

import argparse
import io
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# Windows GBK 控制台兼容
if sys.platform == 'win32':
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    except Exception:
        pass

# ==================== 路径配置 ====================
SCRIPT_DIR = Path(__file__).resolve().parent         # scripts/
PROJECT_ROOT = SCRIPT_DIR.parent                      # 项目根目录 d:\乌龟\产业链全景\

# 7 个被调用脚本（按用户指定顺序）
STEPS = [
    ('validate_stock_codes.py',  'akshare 校验 pcb.manual.js stock code-name 一致性（阻断式）'),
    ('refresh_pcb_valuation.py', 'baostock 拉 PE 历史（5y 日频）'),
    ('calc_percentile.py',       'numpy 算 PE 分位（不拉网络）'),
    ('fetch_close_history.py',   'baostock 拉 close 历史 + fromHigh'),
    ('fetch_volume_history.py',  'baostock 拉 volume + turn 5y 日频'),
    ('calc_signal_c.py',         '量比 + 近 N 天分位最大值（不拉网络）'),
    ('fetch_fundamentals.py',    'akshare 拉 ROE/毛利/营收净利同比/FCF 注入 pcb.manual.js'),
]

# --skip-fetch 跳过的步骤索引（0-based）：refresh_pcb_valuation / fetch_close_history / fetch_volume_history / fetch_fundamentals
SKIP_FETCH_INDICES = {1, 3, 4, 6}

# --skip-validate 跳过的步骤索引（0-based）：validate_stock_codes
SKIP_VALIDATE_INDICES = {0}

# 总步骤数（用于进度显示）
TOTAL_STEPS = len(STEPS)


def run_step(idx_1based, script_name, description, work_dir, total=TOTAL_STEPS):
    """执行单个脚本·失败抛异常终止后续"""
    script_path = SCRIPT_DIR / script_name
    if not script_path.exists():
        raise FileNotFoundError(f'Step {idx_1based} 脚本不存在: {script_path}')

    print(f'  [RUN] Step {idx_1based}/{total}: {script_name}  — {description}')
    print(f'     工作目录: {work_dir}')
    print(f'     开始时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    sys.stdout.flush()

    step_start = time.time()
    try:
        # 不捕获 stdout/stderr·直接继承·让用户实时看到子脚本输出
        result = subprocess.run(
            [sys.executable, str(script_path)],
            cwd=str(work_dir),
            check=False                            # 不抛异常·手动判断 exit code
        )
    except Exception as e:
        elapsed = time.time() - step_start
        print(f'\n[FAIL] Step {idx_1based}/{total} 失败（异常·耗时 {elapsed:.1f}s）: {script_name}')
        print(f'       错误信息: {e}')
        raise

    elapsed = time.time() - step_start
    if result.returncode != 0:
        print(f'\n[FAIL] Step {idx_1based}/{total} 失败（exit code = {result.returncode}·耗时 {elapsed:.1f}s）: {script_name}')
        raise SystemExit(f'刷新流程终止于 Step {idx_1based}（{script_name}·exit={result.returncode}）')

    print(f'  [OK] Step {idx_1based}/{total} 完成：{script_name}（耗时 {elapsed:.1f}s）')
    print()
    sys.stdout.flush()
    return elapsed


def main():
    parser = argparse.ArgumentParser(
        description='一键刷新 PCB 链路全部数据（7 步顺序执行）',
        epilog='示例：python scripts/refresh_all.py                    # 全量刷新（7 步含 Step 0 校验 + Step 6 基本面）\n'
               '      python scripts/refresh_all.py --skip-fetch        # 跳过网络·只跑本地计算（3 步）\n'
               '      python scripts/refresh_all.py --skip-validate    # 跳过 Step 0 校验（紧急情况）\n'
               '      python scripts/refresh_all.py --skip-fetch --skip-validate   # 组合：只跑 2/5 计算步',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--skip-fetch',
        action='store_true',
        help='跳过网络拉取（步骤 1/3/4/6 = 拉取 PE/close/volume/fundamentals）· 只跑本地计算（步骤 2/5）'
    )
    parser.add_argument(
        '--skip-validate',
        action='store_true',
        help='跳过 Step 0 stock code-name 校验（紧急情况用 · 已确认 pcb.manual.js 干净）'
    )
    args = parser.parse_args()

    print('=' * 60)
    print(f'[REFRESH] PCB 一键刷新脚本（commit 4.36 含 Step 0 校验）·开始时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    modes = []
    if args.skip_fetch:
        modes.append('--skip-fetch（跳过网络拉取·只跑本地计算）')
    if args.skip_validate:
        modes.append('--skip-validate（跳过 Step 0 校验）')
    if modes:
        for m in modes:
            print(f'   模式: {m}')
    else:
        print(f'   模式: 全量（Step 0 校验 + 5 步刷新）')
    print(f'   项目根: {PROJECT_ROOT}')
    print(f'   脚本目录: {SCRIPT_DIR}')
    print('=' * 60)
    print()
    sys.stdout.flush()

    total_start = time.time()
    executed = []      # [(idx, name, elapsed), ...]
    skipped = []        # [(idx, name, reason), ...]

    for idx, (script_name, description) in enumerate(STEPS):
        idx_1based = idx + 1
        # --skip-validate 跳过 Step 0（仅跳过 0 号）
        if args.skip_validate and idx in SKIP_VALIDATE_INDICES:
            skipped.append((idx_1based, script_name, 'skip-validate 模式'))
            print(f'  [SKIP] Step {idx_1based}/{TOTAL_STEPS} 跳过: {script_name}  — {description}（--skip-validate）')
            print()
            sys.stdout.flush()
            continue
        # --skip-fetch 跳过 1/3/4
        if args.skip_fetch and idx in SKIP_FETCH_INDICES:
            skipped.append((idx_1based, script_name, 'skip-fetch 模式'))
            print(f'  [SKIP] Step {idx_1based}/{TOTAL_STEPS} 跳过: {script_name}  — {description}（--skip-fetch）')
            print()
            sys.stdout.flush()
            continue
        elapsed = run_step(idx_1based, script_name, description, work_dir=PROJECT_ROOT)
        executed.append((idx_1based, script_name, elapsed))

    total_elapsed = time.time() - total_start

    print('=' * 60)
    print(f'[DONE] 全部刷新完成！')
    print(f'   总耗时: {total_elapsed:.1f}s（{total_elapsed/60:.1f} 分钟）')
    print(f'   执行步骤: {len(executed)} 个')
    if executed:
        print(f'   步骤详情:')
        for idx_1based, name, elapsed in executed:
            print(f'     · Step {idx_1based}/{TOTAL_STEPS}  {name:30s}  {elapsed:6.1f}s')
    if skipped:
        print(f'   跳过步骤: {len(skipped)} 个')
        for idx_1based, name, reason in skipped:
            print(f'     · Step {idx_1based}/{TOTAL_STEPS}  {name:30s}  ({reason})')
    print(f'   完成时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    print('=' * 60)
    return 0


if __name__ == '__main__':
    sys.exit(main())