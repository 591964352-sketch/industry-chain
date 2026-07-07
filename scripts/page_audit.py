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

# ── 8. 数据层同步状态检测(commit 6.68 立 · 2026-07-07)
# 检查 manifest 数组中被注释掉的数据文件 vs 实际磁盘上对应文件状态
# 不阻断 commit,仅 WARNING 提示(见 CLAUDE_CORE_RULES.md §13.X.6)
print("\n【8】数据层同步状态检测(manifest vs 实际文件)")
import re as _re2
# 找 manifest 数组中被注释的 .js 文件(如 // 'pcb.auto',)
manifest_block_match = _re2.search(r'DATA_MANIFEST\s*=\s*\[(.*?)\];', html, _re2.DOTALL)
if manifest_block_match:
    manifest_block = manifest_block_match.group(1)
    # 提取被注释的行(以 // 开头,含 <id> 引用,manifest 用短名如 'pcb.auto' / 'pcb.close_history' 不带 .js 后缀)
    # regex 不强制 .js 后缀,匹配后手动拼 .js 路径
    commented_files = _re2.findall(r'//\s*[\'"]([a-z0-9\-_]+(?:\.[a-z0-9\-_]+)*)[\'"]', manifest_block)
    # 提取实际启用的文件(非注释行)·用于对照
    active_files = _re2.findall(r'(?<!//\s)[\'"]([a-z0-9\-_]+(?:\.[a-z0-9\-_]+)*)[\'"]', manifest_block)

    # 计算 manual.js mtime 作为 L1 时间锚
    manual_js_path = Path(__file__).parent.parent / "data" / "pcb.manual.js"
    manual_mtime = manual_js_path.stat().st_mtime if manual_js_path.exists() else 0
    import datetime as _dt
    manual_mtime_str = _dt.datetime.fromtimestamp(manual_mtime).strftime('%Y-%m-%d') if manual_mtime else '未知'
    print(f"  锚点:pcb.manual.js mtime = {manual_mtime_str}")

    # 检查每个被注释的文件
    if not commented_files:
        check("manifest 数组中无被注释的数据文件", True, "无需检测")
    else:
        for commented_file in commented_files:
            # 转换为磁盘路径(data/<file>.js)— commented_file 是 manifest 中的短名(不含 .js 后缀)
            disk_path = Path(__file__).parent.parent / "data" / (commented_file + '.js')
            if not disk_path.exists():
                # 文件不存在,这是正常的(可能本来就未生成)
                check(f"manifest 注释文件 {commented_file} 状态", True,
                      f"磁盘文件不存在,无需同步检测")
                continue

            # 文件存在,需要计算 mtime 差距
            file_mtime = disk_path.stat().st_mtime
            file_mtime_str = _dt.datetime.fromtimestamp(file_mtime).strftime('%Y-%m-%d')
            age_days = (manual_mtime - file_mtime) / 86400.0

            if age_days > 30:
                # 警告性滞后(L1 比 L3 新 30 天以上),不阻断 commit,仅 WARNING
                print(f"  [WARNING] manifest 注释文件 {commented_file} (mtime={file_mtime_str}) "
                      f"比 pcb.manual.js (mtime={manual_mtime_str}) 滞后 {age_days:.0f} 天 · "
                      f"该数据层可能已长期未同步,请确认是否需要处理")
            elif age_days > 0:
                # 提示性滞后(0~30 天)
                print(f"  [INFO] manifest 注释文件 {commented_file} (mtime={file_mtime_str}) "
                      f"比 pcb.manual.js (mtime={manual_mtime_str}) 滞后 {age_days:.0f} 天 · 提示性滞后")
            else:
                # 完全同步
                print(f"  [OK] manifest 注释文件 {commented_file} (mtime={file_mtime_str}) "
                      f"与 pcb.manual.js 同步或更新")

        # 整体状态 PASS(因不阻断 commit)
        check("manifest 数组 vs 实际文件状态(不阻断 commit · 警告性)", True,
              f"已扫描 {len(commented_files)} 个被注释的数据文件 · 详见上方 INFO/WARNING 输出")
else:
    check("manifest 数组 vs 实际文件状态", False, "未找到 DATA_MANIFEST 数组定义")

# ── 汇总 ──
print(f"\n{'='*50}")
print(f"审计结果：{PASS_COUNT}项通过 / {FAIL_COUNT}项失败")
print(f"{'='*50}\n")
sys.exit(0 if FAIL_COUNT == 0 else 1)
