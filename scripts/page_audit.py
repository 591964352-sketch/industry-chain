"""
page_audit.py · PCB产业链看板工程质量审计
每次commit后运行：python scripts/page_audit.py
"""

import re, sys
from pathlib import Path

# 修复 Windows 控制台 GBK 编码问题
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

TARGET = Path(__file__).parent.parent / "index.html"
PASS_COUNT = 0
FAIL_COUNT = 0

def check(name, condition, detail=""):
    global PASS_COUNT, FAIL_COUNT
    if condition:
        print(f"  [PASS] {name}")
        PASS_COUNT += 1
    else:
        print(f"  [FAIL] {name}  ->  {detail}")
        FAIL_COUNT += 1

print(f"\n{'='*50}")
print(f"page_audit.py · {TARGET.name}")
print(f"{'='*50}\n")

html = TARGET.read_text(encoding="utf-8")

# ── 1. barrier变量残留 ──
print("【1】barrier变量残留检查")
for var in ["--barrier-extreme", "--barrier-high", "--barrier-mid", "--barrier-low"]:
    count = html.count(var)
    check(f"{var} = 0处", count == 0, f"发现{count}处")

# ── 2. 字号约束（4.48 收敛档：11/13/14/16/20 + 历史档 9/10/12/15 留待 4.51 统一）──
print("\n【2】字号约束检查")
allowed = {"9px", "10px", "11px", "12px", "13px", "14px", "15px", "16px", "20px"}
found_sizes = set(re.findall(r'font-size:\s*(\d+px)', html))
illegal = found_sizes - allowed
check("字号只用允许档位", len(illegal) == 0, f"违规字号: {illegal}")

# ── 3. renderXXX函数必须接收chainId ──
print("\n【3】chainId参数检查")
render_funcs = re.findall(r'function (render\w+)\s*\(([^)]*)\)', html)
# 白名单：业务级函数（不依赖具体链）允许不收 chainId
NO_CHAINID_WHITELIST = {
    "renderCards", "renderTrades", "renderArena", "renderMacroDashboard",
    "renderStopLossPlan", "renderDecisionScoreCard", "renderFundamentalsBlock",
    "renderQuickNav", "renderChangelog", "renderCardItem",
    "renderSignalTriggerHistory", "renderSignalWinRateStats",
    "renderPortfolioPnL", "renderTradeAttributionStats", "renderStockArena"
}
no_chainid = [(name, args) for name, args in render_funcs
              if "chainId" not in args
              and name not in NO_CHAINID_WHITELIST]
check("新增renderXXX函数接收chainId", len(no_chainid) == 0,
      f"缺chainId: {[n for n,a in no_chainid]}")

# ── 4. 禁止产业链特定函数名 ──
print("\n【4】函数命名检查")
pcb_funcs = re.findall(r'function render(?:PCB|Pcb)\w+', html)
check("无renderPCBxxx函数名", len(pcb_funcs) == 0, f"违规函数: {pcb_funcs}")

# ── 5. 硬编码颜色检查（排除 :root 变量定义）──
print("\n【5】硬编码颜色检查")
# 移除 :root 块内的硬编码（变量定义本身需要硬编码值）
html_no_root = re.sub(r':root\s*\{[^}]*\}', '', html, flags=re.DOTALL)
semantic_colors = ["#3fb950", "#f85149", "#d29922", "#58a6ff", "#bc8cff", "#8b949e"]
for color in semantic_colors:
    count = html_no_root.count(color)
    check(f"{color}未硬编码", count == 0, f"发现{count}处硬编码")

# ── 6. 文件大小合理性 ──
print("\n【6】文件大小检查")
size = len(html)
check("文件大小<500KB", size < 500000, f"当前{size//1000}KB")

# ── 7. 双层架构同步检查(pcb.manual.js ↔ pcb.js)· commit 5.9 立 ──
print("\n【7】双层架构 stock 列表同步检查")
import subprocess
sync_script = Path(__file__).parent / "check_manual_pcb_sync.js"
if sync_script.exists():
    try:
        result = subprocess.run(
            ["node", str(sync_script)],
            capture_output=True, text=True, encoding="utf-8",
            timeout=30, cwd=str(Path(__file__).parent.parent)
        )
        sync_ok = result.returncode == 0
        sync_stdout = result.stdout or ""
        # 用正则提取 6 位 stock code
        import re as _re
        codes = _re.findall(r'\b\d{6}\b', sync_stdout)
        unique_codes = sorted(set(codes))
        sync_summary = ','.join(unique_codes) if unique_codes else ''
        check("双层架构 stock 列表完全同步", sync_ok,
              f"悬空 stock:{sync_summary or '无 · 完整同步'}" if sync_ok
              else f"差异 stock:{sync_summary or '详见 scripts/check_manual_pcb_sync.js 完整输出'}")
    except Exception as ex:
        check("双层架构 stock 列表完全同步", False, f"执行异常:{type(ex).__name__}: {ex}")
else:
    check("双层架构 stock 列表完全同步", False, "scripts/check_manual_pcb_sync.js 不存在")

# ── 汇总 ──
print(f"\n{'='*50}")
print(f"审计结果：{PASS_COUNT}项通过 / {FAIL_COUNT}项失败")
print(f"{'='*50}\n")
sys.exit(0 if FAIL_COUNT == 0 else 1)
