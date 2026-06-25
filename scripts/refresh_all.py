# -*- coding: utf-8 -*-
"""
scripts/refresh_all.py
★ commit 4.23：一键刷新脚本（按顺序调用所有刷新/计算脚本）

调用顺序（5 步）：
  1. scripts/refresh_pcb_valuation.py  —— baostock 拉 PE 历史（5y 日频）
  2. scripts/calc_percentile.py         —— numpy 算 PE 分位（不拉网络）
  3. scripts/fetch_close_history.py     —— baostock 拉 close 历史 + fromHigh
  4. scripts/fetch_volume_history.py    —— baostock 拉 volume + turn 5y 日频
  5. scripts/calc_signal_c.py           —— 量比 + 近 N 天分位最大值（不拉网络）

行为规范：
  · 每步完成后打印进度「✅ Step X/5 完成：xxx.py」
  · 任何一步失败（非零 exit code / exception）→ 立即停止并打印错误，不继续下一步
  · 最后输出总耗时（秒 + 分钟）
  · 支持命令行参数：
      --skip-fetch  跳过步骤 1/3/4（网络拉取）· 只跑步骤 2/5（本地计算）
                    用于数据已是最新时快速重算分位 + 信号 C
      --help        显示帮助

硬约束（commit 4.23）：
  · 只新建本脚本文件，不改任何 data/ 数据文件
  · 不修改 5 个被调用脚本
  · 失败立即终止·不静默吞错·不强行继续

⚠️ 副作用说明：
  · 本脚本端到端执行 5 个子脚本，运行后会刷新 data/pcb.auto.js
    （calc_percentile.py / calc_signal_c.py 都会写回 4 个新字段）
    这是预期行为 —— 用户跑本脚本就是为了一键刷新数据
  · commit 4.23 同步修复了两个写入脚本的幂等性 bug（calc_percentile.py /
    calc_signal_c.py 之前会重复跑追加字段·现已改为「已存在则覆盖更新」）
  · 如需跳过网络拉取只重算本地数据，使用 --skip-fetch
"""

import argparse
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# ==================== 路径配置 ====================
SCRIPT_DIR = Path(__file__).resolve().parent         # scripts/
PROJECT_ROOT = SCRIPT_DIR.parent                      # 项目根目录 d:\乌龟\产业链全景\

# 5 个被调用脚本（按用户指定顺序）
STEPS = [
    ('refresh_pcb_valuation.py', 'baostock 拉 PE 历史（5y 日频）'),
    ('calc_percentile.py',        'numpy 算 PE 分位（不拉网络）'),
    ('fetch_close_history.py',    'baostock 拉 close 历史 + fromHigh'),
    ('fetch_volume_history.py',   'baostock 拉 volume + turn 5y 日频'),
    ('calc_signal_c.py',          '量比 + 近 N 天分位最大值（不拉网络）'),
]

# --skip-fetch 跳过的步骤索引（0-based）：refresh_pcb_valuation / fetch_close_history / fetch_volume_history
SKIP_FETCH_INDICES = {0, 2, 3}


def run_step(idx_1based, script_name, description, work_dir):
    """执行单个脚本·失败抛异常终止后续"""
    script_path = SCRIPT_DIR / script_name
    if not script_path.exists():
        raise FileNotFoundError(f'Step {idx_1based} 脚本不存在: {script_path}')

    print(f'  ⏳ Step {idx_1based}/5: {script_name}  — {description}')
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
        print(f'\n❌ Step {idx_1based}/5 失败（异常·耗时 {elapsed:.1f}s）: {script_name}')
        print(f'   错误信息: {e}')
        raise

    elapsed = time.time() - step_start
    if result.returncode != 0:
        print(f'\n❌ Step {idx_1based}/5 失败（exit code = {result.returncode}·耗时 {elapsed:.1f}s）: {script_name}')
        raise SystemExit(f'刷新流程终止于 Step {idx_1based}（{script_name}·exit={result.returncode}）')

    print(f'  ✅ Step {idx_1based}/5 完成：{script_name}（耗时 {elapsed:.1f}s）')
    print()
    sys.stdout.flush()
    return elapsed


def main():
    parser = argparse.ArgumentParser(
        description='一键刷新 PCB 链路全部数据（5 步顺序执行）',
        epilog='示例：python scripts/refresh_all.py          # 全量刷新（5 步）\n'
               '      python scripts/refresh_all.py --skip-fetch  # 跳过网络·只跑本地计算（2 步）',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--skip-fetch',
        action='store_true',
        help='跳过网络拉取（步骤 1/3/4）·只跑本地计算（步骤 2/5）·用于数据已是最新时快速重算分位 + 信号 C'
    )
    args = parser.parse_args()

    print('=' * 60)
    print(f'🔄 PCB 一键刷新脚本（commit 4.23）·开始时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    if args.skip_fetch:
        print('   模式: --skip-fetch（跳过网络拉取·只跑本地计算）')
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
        if args.skip_fetch and idx in SKIP_FETCH_INDICES:
            skipped.append((idx_1based, script_name, 'skip-fetch 模式'))
            print(f'  ⏭️  Step {idx_1based}/5 跳过: {script_name}  — {description}（--skip-fetch）')
            print()
            sys.stdout.flush()
            continue
        elapsed = run_step(idx_1based, script_name, description, work_dir=PROJECT_ROOT)
        executed.append((idx_1based, script_name, elapsed))

    total_elapsed = time.time() - total_start

    print('=' * 60)
    print(f'🎉 全部刷新完成！')
    print(f'   总耗时: {total_elapsed:.1f}s（{total_elapsed/60:.1f} 分钟）')
    print(f'   执行步骤: {len(executed)} 个')
    if executed:
        print(f'   步骤详情:')
        for idx_1based, name, elapsed in executed:
            print(f'     · Step {idx_1based}/5  {name:30s}  {elapsed:6.1f}s')
    if skipped:
        print(f'   跳过步骤: {len(skipped)} 个')
        for idx_1based, name, reason in skipped:
            print(f'     · Step {idx_1based}/5  {name:30s}  ({reason})')
    print(f'   完成时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    print('=' * 60)
    return 0


if __name__ == '__main__':
    sys.exit(main())