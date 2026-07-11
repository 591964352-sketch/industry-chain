"""scripts/_verify_two_fixes.py · 验证 toggleChangelog 修复 + 重截 sidebar + downstream(1200px)"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 1500})
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 验证 toggleChangelog 修复
        info_before = await page.evaluate("""() => {
            const panel = document.getElementById('changelog-panel');
            const toggle = document.getElementById('cl-toggle');
            return {
                panelClass: panel.className,
                toggleClass: toggle.className,
                panelRect: panel.getBoundingClientRect(),
                toggleRect: toggle.getBoundingClientRect()
            };
        }""")
        print('=== 初始状态 ===')
        for k, v in info_before.items():
            print(f'  {k}: {v}')

        # 点 ✕ 关闭面板
        await page.evaluate("toggleChangelog()")
        await asyncio.sleep(0.5)

        info_after = await page.evaluate("""() => {
            const panel = document.getElementById('changelog-panel');
            const toggle = document.getElementById('cl-toggle');
            return {
                panelClass: panel.className,
                toggleClass: toggle.className,
                toggleRect: toggle.getBoundingClientRect(),
                toggleVisible: window.getComputedStyle(toggle).visibility,
                toggleTransform: window.getComputedStyle(toggle).transform,
            };
        }""")
        print('\n=== 点 ✕ 关闭后 ===')
        for k, v in info_after.items():
            print(f'  {k}: {v}')

        # 截图 sidebar_button_closed.png（点 ✕ 后右侧 200px · y=0~300）
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 0, 'width': 200, 'height': 300}
        )
        print('\n1. + sidebar_button_closed.png (toggle visible at right:6px)')

        # 截图 downstream_section.png（1200px 高度）
        # 先展开 #section-demand-chain
        await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (el) el.classList.remove('collapsed');
        }""")
        await asyncio.sleep(0.3)
        await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)

        info3 = await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            const r = el ? el.getBoundingClientRect() : null;
            return r ? {top: r.top, height: r.height, bottom: r.bottom} : null;
        }""")
        print(f'\n[downstream] section-demand-chain: {info3}')

        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 1200}
        )
        print('2. + downstream_section.png (1440x1200)')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())