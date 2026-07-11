"""scripts/_verify_sidebar_only3.py · 主动关闭面板 + 截图"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 主动调用 toggleChangelog() 关闭面板
        await page.evaluate("""() => {
            if (typeof toggleChangelog === 'function') {
                toggleChangelog();
            }
        }""")
        await asyncio.sleep(0.5)

        info = await page.evaluate("""() => {
            const panel = document.getElementById('changelog-panel');
            const toggle = document.getElementById('cl-toggle');
            return {
                panelClass: panel.className,
                panelTransform: window.getComputedStyle(panel).transform,
                panelRect: panel.getBoundingClientRect(),
                toggleClass: toggle.className,
                toggleRect: toggle.getBoundingClientRect(),
            };
        }""")
        print('=== 关闭后状态 ===')
        for k, v in info.items():
            print(f'  {k}: {v}')

        # 截图：从 y=70 起 300px 高（覆盖 toggle y=80-121）
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 70, 'width': 200, 'height': 300}
        )
        print('+ sidebar_button_closed.png')

        await browser.close()

asyncio.run(main())