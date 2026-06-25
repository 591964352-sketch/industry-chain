# -*- coding: utf-8 -*-
"""
scripts/validate_stock_codes.py
★ commit 4.36：stock code-name 一致性校验

背景（commit 4.35 教训）：
  · pcb.manual.js 历史上出现过 code-name 错位问题（不匹配真实 A 股）
  · 例 1：'002443':{ name:'金洲精工', ... } —— 实际 A 股 002443 是「金洲管道」(管道公司)
  · 例 2：'603519':{ name:'南亚新材', ... } —— 实际 A 股 603519 是「神马电力」(电力公司)
  · 真实南亚新材 code = 688519（金洲精工 / 南亚新材 这两家根本不在 A 股主板 002443 / 603519 位置上）
  · 根因：手工填 pcb.manual.js 时凭印象写错 code（或引用过期数据未核对）
  · 后果：注入估值时按 code 拉数据，name 与 code 不匹配 → 数据错位 / 假数据伪装

功能：
  · 从 akshare 拉取 A 股全量 code-name 映射（ak.stock_info_a_code_name()）
  · 对比 pcb.manual.js 里每个 stock 的 code + name 是否一致
  · 不一致 → ❌ 报错并退出 1（阻断后续脚本）
  · 一致 → ✅ 正常退出 0（放行 refresh_all.py 后续步骤）

输出格式：
  ✅ 002463 沪电股份 · 一致
  ❌ 002443 金洲精工 · 实际是「金洲管道」 → 请修正 pcb.manual.js

参数：
  --warn-only    只打印警告，不阻断（exit 0）· 用于 CI 监测场景

硬约束（§6.2 + §6.8）：
  · 不触碰 pcb.manual.js / pcb.auto.js / pcb.js / index.html
  · akshare 是「覆盖广但非 primary」的二级数据源 · 错位捕获是其价值
  · akshare 偶有 stock 漏网（退市/暂停的 code 仍可能在 akshare 列表里）· 用 name 比对二次确认

退出码：
  0  = 全部一致 / --warn-only 模式
  1  = 至少 1 只 stock code-name 不一致（阻断 refresh_all.py）
  2  = akshare 接口拉取失败（脚本异常）
"""

import argparse
import io
import re
import subprocess
import sys
from pathlib import Path

# Windows GBK 控制台兼容（python -X utf8 也可，但脚本端兜底最稳）
if sys.platform == 'win32':
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent.parent
MANUAL_JS = ROOT / 'data' / 'pcb.manual.js'


def load_pcb_manual_stocks():
    """用 Node 子进程加载 pcb.manual.js，提取 stocks dict 的 (code, name) 列表。

    用 subprocess + node 而非自己写正则：
      · pcb.manual.js 是 IIFE 包裹的 window.PCB_MANUAL 结构
      · 正则很难处理嵌套 dict / 字符串转义 / 注释里的同款字符
      · Node 加载 + JSON.stringify 是 100% 准确的解析方式
    """
    node_code = """
global.window = {};
require('./data/pcb.manual.js');
const stocks = global.window.PCB_MANUAL.stocks || {};
const result = [];
Object.keys(stocks).forEach(code => {
  const s = stocks[code];
  if (s && s.code && s.name) {
    result.push({ code: s.code, name: s.name });
  }
});
process.stdout.write(JSON.stringify(result));
"""
    proc = subprocess.run(
        ['node', '-e', node_code],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding='utf-8'
    )
    if proc.returncode != 0:
        raise RuntimeError(f'Node 加载 pcb.manual.js 失败:\n{proc.stderr}')
    import json
    return json.loads(proc.stdout)


def fetch_akshare_code_name_map():
    """akshare 拉 A 股全量 (code, name) 映射。

    Returns:
        dict: { '002463': '沪电股份', '600183': '生益科技', ... }

    Raises:
        RuntimeError: akshare 接口失败
    """
    try:
        import akshare as ak
    except ImportError:
        raise RuntimeError('akshare 未安装（pip install akshare）')

    df = ak.stock_info_a_code_name()
    if df is None or len(df) == 0:
        raise RuntimeError('akshare stock_info_a_code_name 返回空数据')

    # 列名 'code' / 'name'（已验证）
    if 'code' not in df.columns or 'name' not in df.columns:
        raise RuntimeError(f'akshare 返回列名异常: {df.columns.tolist()}')

    # 标准化：code 6 位 str，name 去空白
    return {
        str(row['code']).zfill(6): str(row['name']).strip()
        for _, row in df.iterrows()
    }


def validate(akshare_map, pcb_stocks, warn_only=False):
    """核心校验逻辑。返回 (errors, warnings, stats) 三个列表/字典。"""
    errors = []
    warnings = []

    # 用 name 反向索引：name -> [code1, code2, ...]（处理异名同 code / 同名异 code）
    name_to_codes = {}
    for code, name in akshare_map.items():
        name_to_codes.setdefault(name, []).append(code)

    for s in pcb_stocks:
        code = s['code']
        name = s['name']
        akshare_name = akshare_map.get(code)
        if akshare_name is None:
            errors.append({
                'code': code,
                'pcb_name': name,
                'actual': '(akshare 无此 code · 可能已退市/暂停上市)',
                'type': 'code_missing'
            })
            continue
        if akshare_name != name:
            errors.append({
                'code': code,
                'pcb_name': name,
                'actual': akshare_name,
                'type': 'name_mismatch'
            })
            continue
        # 同名异 code 检查（次级防御 · 概率极低）
        same_name_codes = name_to_codes.get(name, [])
        if len(same_name_codes) > 1 and code in same_name_codes:
            other_codes = [c for c in same_name_codes if c != code]
            warnings.append({
                'code': code,
                'pcb_name': name,
                'msg': f'⚠️ 同名「{name}」在 A 股有多个 code（{code} / {", ".join(other_codes)}）· 确认 {code} 是正确的那只'
            })

    stats = {
        'total': len(pcb_stocks),
        'passed': len(pcb_stocks) - len(errors),
        'errors': len(errors),
        'warnings': len(warnings)
    }
    return errors, warnings, stats


def print_report(pcb_stocks, akshare_map, errors, warnings, stats, warn_only):
    print('=' * 60)
    print('★ commit 4.36 · stock code-name 一致性校验')
    print('=' * 60)
    print(f'pcb.manual.js stock 数: {stats["total"]}')
    print(f'akshare A 股全量: {len(akshare_map)} 只')
    print(f'模式: {"--warn-only (只警告不阻断)" if warn_only else "严格 (❌ 阻断)"}')
    print()

    # 1) 已通过
    passed_codes = {e['code'] for e in errors}
    for s in pcb_stocks:
        if s['code'] not in passed_codes:
            print(f'  [PASS] {s["code"]} {s["name"]} · 一致')

    # 2) 错误
    for e in errors:
        if e['type'] == 'code_missing':
            print(f'  [FAIL] {e["code"]} {e["pcb_name"]} · {e["actual"]}')
        else:
            print(f'  [FAIL] {e["code"]} {e["pcb_name"]} · 实际是「{e["actual"]}」 -> 请修正 pcb.manual.js')

    # 3) 警告
    for w in warnings:
        print(f'  {w["msg"]}')

    print()
    print('=' * 60)
    print(f'摘要: 通过 {stats["passed"]} · 错误 {stats["errors"]} · 警告 {stats["warnings"]}')
    print('=' * 60)


def main():
    parser = argparse.ArgumentParser(
        description='校验 pcb.manual.js 的 stock code-name 是否与 akshare A 股全量表一致',
        epilog='示例：python scripts/validate_stock_codes.py            # 严格模式（❌ 阻断）\n'
               '      python scripts/validate_stock_codes.py --warn-only # 只警告不阻断',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--warn-only',
        action='store_true',
        help='只打印警告不阻断（exit 0）· 用于 CI 监测场景'
    )
    args = parser.parse_args()

    # 1) 加载 pcb.manual.js stocks
    print(f'加载 pcb.manual.js ...')
    try:
        pcb_stocks = load_pcb_manual_stocks()
    except Exception as e:
        print(f'\n❌ 加载失败: {type(e).__name__}: {e}', file=sys.stderr)
        return 2
    print(f'  [OK] 解析 {len(pcb_stocks)} 只 stock')
    print()

    # 2) akshare 拉 A 股全量
    print(f'拉 akshare A 股全量 code-name 映射 ...')
    try:
        akshare_map = fetch_akshare_code_name_map()
    except Exception as e:
        print(f'\n❌ akshare 拉取失败: {type(e).__name__}: {e}', file=sys.stderr)
        print('   请检查网络 / akshare 安装', file=sys.stderr)
        return 2
    print(f'  [OK] 拉取 {len(akshare_map)} 只 A 股')
    print()

    # 3) 校验
    errors, warnings, stats = validate(akshare_map, pcb_stocks, args.warn_only)

    # 4) 输出报告
    print_report(pcb_stocks, akshare_map, errors, warnings, stats, args.warn_only)

    # 5) 决定退出码
    if errors:
        if args.warn_only:
            print()
            print('[WARN] --warn-only 模式：发现错误但不阻断（exit 0）')
            return 0
        print()
        print('[FAIL] 存在 code-name 错位 -> 阻断 refresh_all.py 后续步骤')
        print('       请修正 pcb.manual.js 后重新运行本脚本')
        return 1

    if warnings:
        print()
        print('[WARN] 存在同名异 code 警告 -> 建议人工确认')

    print()
    print('[OK] 全部 stock code-name 一致')
    return 0


if __name__ == '__main__':
    sys.exit(main())
