"""scripts/_verify_4_71.py · commit 4.71 持仓管理视觉优化验收"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 1. 修复1: 持仓管理统计行高度
        r1 = await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('持仓管理')) {
                    const flexRows = c.querySelectorAll('div[style*="display:flex"]');
                    for (const fr of flexRows) {
                        const txt = fr.innerText || '';
                        if (txt.includes('需减仓') && txt.includes('需清仓')) {
                            const cs = window.getComputedStyle(fr);
                            return {
                                text: txt,
                                height: fr.offsetHeight,
                                display: cs.display,
                                gap: cs.gap
                            };
                        }
                    }
                }
            }
            return {error: 'not found'};
        }""")
        print('=== 修复1: 持仓管理统计行 ===')
        if 'error' in r1:
            print(f'  ❌ {r1["error"]}')
        else:
            ok = r1['height'] <= 60
            print(f'  height: {r1["height"]}px {"✅" if ok else "❌"} (目标 ≤60px · 旧 120px)')
            print(f'  display: {r1["display"]} gap: {r1["gap"]}')
            print(f'  text: {r1["text"]}')

        # 2. 修复2: 减仓规则 details 折叠
        r2 = await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('持仓管理')) {
                    const details = c.querySelectorAll('details');
                    for (const d of details) {
                        if (d.innerText.includes('减仓规则')) {
                            return {
                                open: d.open,
                                hasOpenAttr: d.hasAttribute('open'),
                                summaryText: d.querySelector('summary') ? d.querySelector('summary').innerText : null
                            };
                        }
                    }
                }
            }
            return {error: 'no details found'};
        }""")
        print('\n=== 修复2: 减仓规则 details ===')
        if 'error' in r2:
            print(f'  ❌ {r2["error"]}')
        else:
            ok = not r2['open']
            print(f'  details.open: {r2["open"]} {"✅" if ok else "❌"} 默认折叠')
            print(f'  hasOpenAttr: {r2["hasOpenAttr"]}')
            print(f'  summaryText: {r2["summaryText"]}')

        # 3. 截 holding_section.png
        await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('持仓管理')) {
                    c.scrollIntoView({behavior:'instant', block:'start'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/holding_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('\n  ✓ 截图: screenshots/visual_audit/holding_section.png')
        await browser.close()

asyncio.run(main())