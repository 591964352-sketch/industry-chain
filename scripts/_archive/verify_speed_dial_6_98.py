# scripts/verify_speed_dial_6_98.py
# ★ commit 6.98 验证脚本（Python Playwright 版本）
# 1. 模拟用户从顶部打开 PCB / semicon-equip / storage-interface 三链页面（不滚动）
# 2. 测量 choke-speed-dial 板块位置 + 截图
# 3. 对比 PCB 与 storage-interface 的 #section-decision 位置
import io
import sys
import json
from playwright.sync_api import sync_playwright

# Windows 代理兼容:stdout 强制 utf-8
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

BASE = 'http://localhost:8765/index.html'
chains = [
    {'id': 'pcb',             'hash': '#pcb',             'label': 'PCB 印制电路板'},
    {'id': 'semicon-equip',   'hash': '#semicon-equip',   'label': '半导体设备'},
    {'id': 'storage-interface','hash': '#storage-interface','label': '存储与接口'},
]
results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))

    for c in chains:
        url = BASE + c['hash']
        page.goto(url, wait_until='networkidle', timeout=45000)
        page.wait_for_timeout(2000)
        # 1. 页面 DOM 测量
        info = page.evaluate('''() => {
            function bbox(el) {
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return {
                    pageTop: Math.round(r.top + window.scrollY),
                    height: Math.round(r.height),
                    visibleNow: r.top < window.innerHeight && r.bottom > 0,
                    innerTop: Math.round(r.top),
                };
            }
            const dial = document.getElementById('choke-speed-dial');
            const decision = document.getElementById('section-decision');
            const overview = document.getElementById('section-overview');
            const stocks = [];
            if (dial) {
                dial.querySelectorAll('strong').forEach(s => stocks.push(s.textContent.trim()));
            }
            return {
                dial: bbox(dial),
                decision: bbox(decision),
                overview: bbox(overview),
                viewportH: window.innerHeight,
                stocks,
            };
        }''')
        # 2. 截图（默认 viewport 顶部，未滚动）
        ss_path = f"data/speeddial_{c['id']}_top.png"
        page.screenshot(path=ss_path, full_page=False)
        # 3. 截图（在速览板块滚动到位后）
        ss_path2 = f"data/speeddial_{c['id']}_centered.png"
        if info['dial'] and info['dial']['pageTop'] > 0:
            page.evaluate(f"window.scrollTo(0, {info['dial']['pageTop'] - 80});")
            page.wait_for_timeout(400)
            page.screenshot(path=ss_path2, full_page=False)
            page.evaluate('window.scrollTo(0, 0)')
            page.wait_for_timeout(400)

        results.append({
            'chainId': c['id'],
            'chainLabel': c['label'],
            'errs': len(errs),
            'overviewTop': info['overview']['pageTop'] if info['overview'] else None,
            'decisionTop': info['decision']['pageTop'] if info['decision'] else None,
            'dialTop': info['dial']['pageTop'] if info['dial'] else None,
            'dialHeight': info['dial']['height'] if info['dial'] else None,
            'dialInViewportAtTop': info['dial']['visibleNow'] if info['dial'] else False,
            'dialStocks': info['stocks'],
            'screenshot_top': ss_path,
            'screenshot_centered': ss_path2,
        })
        errs.clear()

    browser.close()

print('\n=== 速览板块位置验证 (commit 6.98) ===\n')
print('viewport: 1440 x 900, 模拟用户从顶部打开\n')
for r in results:
    print(f"【{r['chainLabel']}】({r['chainId']})")
    print(f"  • 顶部 overview:          pageTop = {r['overviewTop']}px")
    print(f"  • #section-decision:      pageTop = {r['decisionTop']}px")
    print(f"  • 🔒速览板块 speed-dial:  pageTop = {r['dialTop']}px  (高 {r['dialHeight']}px)")
    visible = '✅ 是' if r['dialInViewportAtTop'] else '❌ 否（仍需滚动）'
    print(f"  • 默认打开（不滚）viewport 内可见: {visible}")
    print(f"  • 包含代表股: {r['dialStocks']}")
    print(f"  • JS errors: {r['errs']}")
    print(f"  • 截图（未滚动）: {r['screenshot_top']}")
    print(f"  • 截图（滚到位）: {r['screenshot_centered']}\n")

pcb = next((r for r in results if r['chainId'] == 'pcb'), None)
si  = next((r for r in results if r['chainId'] == 'storage-interface'), None)
if pcb and si:
    diff = si['decisionTop'] - pcb['decisionTop']
    print('=== 关键对比：PCB vs storage-interface ===')
    print(f"  • 决策 section 位置:    PCB={pcb['decisionTop']}px · SI={si['decisionTop']}px")
    print(f"  • 相差: {diff:+d}px ({'SI 页面' + str(abs(diff)) + 'px 更长' if diff>0 else 'PCB 页面' + str(abs(diff)) + 'px 更长'})")
    print(f"  • 速览板块位置:        PCB={pcb['dialTop']}px · SI={si['dialTop']}px")
    # 计算"用户在第一屏看到速览板块"的概率
    print()
    print('=== 设计参考 ===')
    print('  • viewport 高度 900px。用户在第一屏能看到 pageTop < 900px 的元素。')
    print('  • 速览板块设计目标: pageTop < 900px，保证不滚动即可见。')
    pcb_in_first = pcb['dialTop'] is not None and pcb['dialTop'] < 900
    si_in_first  = si['dialTop'] is not None and si['dialTop'] < 900
    print(f"  • PCB 速览在第一屏内: {pcb_in_first}")
    print(f"  • SI 速览在第一屏内: {si_in_first}")
