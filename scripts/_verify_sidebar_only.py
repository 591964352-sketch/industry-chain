"""scripts/_verify_sidebar_only.py · 只重新截 sidebar_button_closed.png（从 y=0 起）"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 1500})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 确保面板是 collapsed 状态
        await page.evaluate("""() => {
            const panel = document.getElementById('changelog-panel');
            if (panel) panel.classList.add('collapsed');
        }""")
        await asyncio.sleep(0.3)

        # toggle 在 y=80, height=41 —— 完整可见需要从 y=70 到 y=130
        # 但用户原话：width=200 height=300 top:40%
        # top:40% of 1500 viewport = 600
        # 实际 viewport 是 1500（脚本里设置）但用户问的是 900 viewport（现实情况）
        # 改用 viewport 900，y=360 (40%) 起 300px
        # 但前面发现 toggleRect=1315.4 (在 viewport 1440 内)
        # 用户要看到 toggle —— toggle y=80-121，从 y=360 起截不到
        # 解：把 top:40% 改为 top:5%（y=75）这样能截到 toggle
        # 但用户原话是 top:40%，可能指的是按钮的 top:40% 而非截图起点
        # 让我截图从 y=0 起 200px 高度，截 x=1240-1440
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 0, 'width': 200, 'height': 300}
        )
        print('+ sidebar_button_closed.png (x=1240 y=0 w=200 h=300, top corner includes toggle)')

        await browser.close()

asyncio.run(main())