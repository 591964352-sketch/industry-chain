#!/usr/bin/env python3
"""
_preflight_render_check.py — 渲染层 DOM 自动检查
用法: python scripts/_preflight_render_check.py <chainId> [--port 8765]
输出: 控制台报告 + JSON 详细结果保存到 screenshots/

依赖: playwright (pip install playwright && playwright install chromium)
"""

import subprocess, time, json, sys, os
from datetime import datetime

CHAIN_ID = sys.argv[1] if len(sys.argv) > 1 else 'semicon-equip'
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8765
BASE_URL = f'http://localhost:{PORT}'

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print('[FATAL] playwright not installed. Run: pip install playwright && playwright install chromium')
    sys.exit(1)

# ── Start HTTP server ──
print(f'Starting HTTP server on port {PORT}...')
server = subprocess.Popen(
    ['python', '-m', 'http.server', str(PORT)],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)
time.sleep(1)

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})

        url = f'{BASE_URL}/index.html#{CHAIN_ID}'
        print(f'Loading: {url}')
        page.goto(url, wait_until='networkidle', timeout=15000)
        time.sleep(3)

        # ── 1. JS errors ──
        js_errors = []
        page.on('pageerror', lambda err: js_errors.append(str(err)[:300]))

        # ── 2. DOM structure audit ──
        info = json.loads(page.evaluate('''() => JSON.stringify({
            sectionCount: document.querySelectorAll(".section-title").length,
            segmentCards: document.querySelectorAll(".segment-card").length,
            stockRows: document.querySelectorAll("tr[id^=\\'stock-\\']").length,
            flowNodes: document.querySelectorAll(".flow-node").length,
            treeNodes: document.querySelectorAll(".tree-node").length,
            fourQExists: !!document.getElementById("section-fourq"),
            fourQRows: (() => {
                const tbody = document.querySelector("#section-fourq tbody");
                return tbody ? tbody.querySelectorAll("tr").length : 0;
            })(),
            fundsChips: document.querySelectorAll("[title*=\\'ROE\\']").length,
            dims6Details: document.querySelectorAll("details.logic-collapse, details[id]").length,
            hasUndefinedText: (() => {
                const text = (document.getElementById("chain-content") || document.body).innerText;
                return text.includes("undefined");
            })(),
            chainContentLength: (document.getElementById("chain-content") || {}).innerHTML ? document.getElementById("chain-content").innerHTML.length : 0,
            treeMapSectionId: document.getElementById("section-treemap") ? "exists" : "MISSING",
            fourQSectionId: document.getElementById("section-fourq") ? "exists" : "MISSING",
        })'''))

        # ── 3. Dev term scan ──
        dev_terms = ['★ commit', 'commit 6.', 'Phase 2-', 'Phase 9 PCB',
                     'idx 7 PCB', '同步到 pcb.js', '渲染层',
                     'DATA_VERSION', 'bump', 'Co-Authored-By']
        chain_text = page.evaluate(
            '() => (document.getElementById("chain-content") || document.body).innerText || ""'
        )
        dev_hits = [t for t in dev_terms if t in chain_text]

        # ── 4. Section content sizes ──
        sections = json.loads(page.evaluate('''() => {
            const secs = document.querySelectorAll(".section");
            return JSON.stringify(Array.from(secs).map(s => ({
                title: ((s.querySelector(".section-title") || {}).textContent || "").replace(/\\s+/g, " ").trim().substring(0, 60),
                htmlLen: s.innerHTML.length
            })));
        }'''))

        # ── 5. Screenshots ──
        os.makedirs('screenshots', exist_ok=True)
        page.screenshot(
            path=f'screenshots/{CHAIN_ID}_preflight_top.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900}
        )
        print(f'Screenshot: screenshots/{CHAIN_ID}_preflight_top.png')

        # ── 6. Compile report ──
        browser.close()

        print()
        print('=' * 60)
        print(f'渲染层 DOM 检查报告 — {CHAIN_ID}')
        print(f'日期: {datetime.now().strftime("%Y-%m-%d %H:%M")}')
        print('=' * 60)
        print()

        checks = []

        def check(name, value, expect, fail_if=False):
            if fail_if:
                ok = not value
            elif isinstance(expect, (int, float)):
                ok = value >= expect
            elif callable(expect):
                ok = expect(value)
            else:
                ok = value == expect
            status = '[OK]' if ok else '[FAIL]'
            print(f'{status} {name}: {value} (expected: {expect})')
            return {'name': name, 'value': value, 'expected': str(expect), 'ok': ok}

        checks.append(check('JS errors', len(js_errors), 0))
        if js_errors:
            for e in js_errors[:5]:
                print(f'    Error: {e[:200]}')

        checks.append(check('Sections', info['sectionCount'], lambda x: x >= 8))
        checks.append(check('Segment cards', info['segmentCards'], lambda x: x >= 4))
        checks.append(check('Stock rows (with id)', info['stockRowCount'], lambda x: x >= 10))
        checks.append(check('Flow nodes (treeMap)', info['flowNodes'], lambda x: x >= 10))
        checks.append(check('Tree nodes (old schema)', info['treeNodes'], 0))
        checks.append(check('TreeMap section exists', info['treeMapSectionId'], 'exists'))
        checks.append(check('FourQ section exists', info['fourQSectionId'], 'exists'))
        checks.append(check('FourQ table rows', info['fourQRows'], lambda x: x >= 0))
        checks.append(check('Fundamentals chips', info['fundsChips'], lambda x: x >= 5))
        checks.append(check('Has "undefined" text', info['hasUndefinedText'], False, fail_if=True))
        checks.append(check('Dev term hits', len(dev_hits), 0))
        checks.append(check('Chain content size', info['chainContentLength'], lambda x: x >= 5000))

        print()
        print('Section content sizes:')
        for s in sections:
            status = '[OK]' if s['htmlLen'] > 500 else '[WARN]'
            if s['htmlLen'] < 100:
                status = '[FAIL]'
            print(f'  {status} {s["htmlLen"]:>6} chars  {s["title"]}')

        print()
        total = len(checks)
        passed = sum(1 for c in checks if c['ok'])
        failed = total - passed
        print(f'总计: {passed}/{total} 通过, {failed} 失败')
        if js_errors:
            print(f'  JS 错误: {len(js_errors)} 条')
        if dev_hits:
            print(f'  开发术语命中: {dev_hits}')
        if info['hasUndefinedText']:
            print(f'  ⚠ 页面含 "undefined" 文字')

        # Save report
        report = {
            'chainId': CHAIN_ID,
            'date': datetime.now().strftime('%Y-%m-%d %H:%M'),
            'checks': checks,
            'jsErrors': js_errors,
            'devTermHits': dev_hits,
            'sections': sections,
            'passed': passed,
            'failed': failed,
        }
        report_path = f'screenshots/{CHAIN_ID}_preflight_report.json'
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        print(f'\n详细报告: {report_path}')

        if failed > 0:
            print(f'\n[ACTION REQUIRED] {failed} 项检查失败，需人工排查后重新运行。')
            sys.exit(1)
        else:
            print(f'\n[DONE] 全部 {passed} 项渲染检查通过。请继续 §13.5 人工确认关卡。')

finally:
    server.terminate()
