"""scripts/_verify_sidebar_only2.py · 精确诊断 + 截图右侧区域"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})  # 标准 900
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 触发关闭：panel 加 collapsed（默认已有，确保）+ toggle 保持 visible
        info = await page.evaluate("""() => {
            const panel = document.getElementById('changelog-panel');
            const toggle = document.getElementById('cl-toggle');
            const ps = window.getComputedStyle(panel);
            const ts = window.getComputedStyle(toggle);
            return {
                panelClass: panel.className,
                panelRect: panel.getBoundingClientRect(),
                panelTransform: ps.transform,
                panelRight: ps.right,
                panelDisplay: ps.display,
                panelOverflow: ps.overflow,
                toggleClass: toggle.className,
                toggleRect: toggle.getBoundingClientRect(),
                toggleRight: ts.right,
                toggleVisibility: ts.visibility,
                toggleTransform: ts.transform,
            };
        }""")
        print('=== 状态诊断 ===')
        for k, v in info.items():
            print(f'  {k}: {v}')

        # 截图：从 y=70 起（覆盖 toggle 的 y=80-121）300px 高，x=1240-1440
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 70, 'width': 200, 'height': 300}
        )
        print('+ sidebar_button_closed.png (x=1240 y=70 w=200 h=300)')

        await browser.close()

asyncio.run(main())