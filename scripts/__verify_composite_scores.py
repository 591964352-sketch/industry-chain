#!/usr/bin/env python3
"""__verify_composite_scores.py — Playwright截图验证600183和301200综合分"""
import subprocess, time, json, sys, os
from datetime import datetime

PORT = 8765
BASE_URL = f'http://localhost:{PORT}'

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print('[FATAL] playwright not installed')
    sys.exit(1)

# Start HTTP server
print(f'Starting HTTP server on port {PORT}...')
server = subprocess.Popen(['python', '-m', 'http.server', str(PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.5)

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})

        url = f'{BASE_URL}/index.html#pcb'
        print(f'Loading: {url}')
        page.goto(url, wait_until='networkidle', timeout=15000)
        time.sleep(4)  # Wait for all JS to render

        # Check for JS errors
        js_errors = []
        page.on('pageerror', lambda err: js_errors.append(str(err)[:200]))

        # Find composite scores for target stocks
        # The composite score appears in the "🆪 六维 ▾" chip: "综合 XX/100"
        info = page.evaluate('''() => {
            const stocks = {};
            const rows = document.querySelectorAll('tr[id^="stock-"]');
            rows.forEach(row => {
                const id = row.id;
                // Extract stock code from id like "stock-600183-seg0"
                const match = id.match(/stock-(\\d+)-/);
                if (!match) return;
                const code = match[1];
                // Find composite score text in the row
                const text = row.innerText;
                const scoreMatch = text.match(/综合\\s*(\\d+)\\s*\\/\\s*100/);
                if (scoreMatch) {
                    stocks[code] = {
                        score: parseInt(scoreMatch[1]),
                        id: id,
                        textSnippet: text.substring(0, 300)
                    };
                }
            });
            return stocks;
        }''')

        print('\n=== PCB页面综合分 ===')
        for code in ['600183', '301200']:
            if code in info:
                print(f'  {code}: 综合={info[code]["score"]}/100 (id={info[code]["id"]})')
            else:
                print(f'  {code}: NOT FOUND on page')

        # Also check a control stock
        if '300476' in info:
            print(f'  300476 (control): 综合={info["300476"]["score"]}/100')

        # Take screenshot of the page
        os.makedirs('screenshots', exist_ok=True)
        page.screenshot(path=f'screenshots/pcb_verify_{datetime.now().strftime("%H%M%S")}.png', full_page=False)
        print(f'\nScreenshot saved: screenshots/pcb_verify_*.png')

        # Take a targeted screenshot: scroll to 600183's segment
        # Find the segment containing 600183
        seg_info = page.evaluate('''() => {
            const segs = document.querySelectorAll('.segment-card');
            let target = null;
            segs.forEach(seg => {
                if (seg.innerText.includes('600183')) target = seg.getBoundingClientRect();
            });
            return target ? {x:0, y:target.y-50, width:1440, height:400} : null;
        }''')
        if seg_info:
            page.screenshot(path=f'screenshots/pcb_600183_seg_{datetime.now().strftime("%H%M%S")}.png', clip=seg_info)
            print('Targeted screenshot of 600183 segment saved')

        browser.close()

        # Report
        print()
        if js_errors:
            print(f'JS errors: {len(js_errors)}')
            for e in js_errors[:3]: print(f'  {e[:150]}')
        else:
            print('JS errors: 0')

        # Verify expected values
        expected = {'600183': 50, '301200': 59}
        ok = True
        for code, exp in expected.items():
            if code not in info:
                print(f'FAIL: {code} not found')
                ok = False
            elif info[code]['score'] != exp:
                print(f'FAIL: {code} got {info[code]["score"]}, expected {exp}')
                ok = False
            else:
                print(f'PASS: {code} = {exp}/100')

        if ok: print('\n✓ 综合分验证通过')
        else: print('\n✗ 综合分验证失败')
        sys.exit(0 if ok else 1)

finally:
    server.terminate()
