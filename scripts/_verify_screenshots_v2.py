"""scripts/_verify_screenshots_v2.py · 3 张精确截图 v2 - 用正确的 section id + 扩大 viewport"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 1500})  # 初始就给大 viewport
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # ===== 1. prosperity_section.png =====
        # 用 element.screenshot 直接截 #section-prosperity 的实际渲染高度
        # 但 element.screenshot 高度有限；改方案：scrollIntoView 后用 viewport clip 截 1400px
        await page.evaluate("""() => {
            const el = document.getElementById('section-prosperity');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)

        # 检查 section-prosperity 高度
        info1 = await page.evaluate("""() => {
            const el = document.getElementById('section-prosperity');
            const r = el.getBoundingClientRect();
            return {top: r.top, height: r.height, bottom: r.bottom};
        }""")
        print(f'prosperity: top={info1["top"]}, height={info1["height"]}, bottom={info1["bottom"]}')

        # viewport clip 从 y=0 截 1400px（保证覆盖到第三行 grid 之后）
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 1400}
        )
        print('1. + prosperity_section.png (clip 1440x1400)')

        # ===== 2. sidebar_button_closed.png =====
        # 切回标准 viewport，关闭数据变更面板，截右侧边缘
        await page.set_viewport_size({'width': 1440, 'height': 900})
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 关闭数据变更面板：找 onClick 触发关闭的按钮并 click
        await page.evaluate("""() => {
            // 找到数据变更面板的 ✕ 按钮（多种方式）
            const candidates = document.querySelectorAll('button, .close, [class*="close"], span[onclick]');
            for (const el of candidates) {
                const txt = (el.innerText || el.textContent || '').trim();
                if (txt === '✕' || txt === '×' || txt === 'X' || txt === 'x') {
                    try { el.click(); } catch(e) {}
                }
            }
        }""")
        await asyncio.sleep(0.3)

        # 检查面板是否还在显示，找唤起按钮
        info2 = await page.evaluate("""() => {
            const clToggle = document.getElementById('cl-toggle');
            const clPanel = document.getElementById('cl-panel');
            const allPanels = document.querySelectorAll('[class*="changelog"], [id*="changelog" i]');
            return {
                clToggleExists: !!clToggle,
                clToggleClasses: clToggle ? clToggle.className : '',
                clToggleRect: clToggle ? clToggle.getBoundingClientRect() : null,
                clPanelExists: !!clPanel,
                clPanelVisible: clPanel ? window.getComputedStyle(clPanel).display !== 'none' : null,
                panelsVisible: Array.from(allPanels).map(p => ({
                    id: p.id,
                    cls: p.className,
                    visible: window.getComputedStyle(p).display !== 'none',
                    rect: p.getBoundingClientRect()
                }))
            };
        }""")
        print(f'\n[sidebar] clToggle={info2["clToggleExists"]} clPanel={info2["clPanelVisible"]}')
        print(f'[sidebar] clToggle rect: {info2["clToggleRect"]}')
        for p in info2['panelsVisible']:
            print(f'  panel id={p["id"]} cls={p["cls"][:40]} visible={p["visible"]} rect={p["rect"]}')

        # 截右侧边缘 width=200, height=300, y=360 (top:40% of 900)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 360, 'width': 200, 'height': 300}
        )
        print('2. + sidebar_button_closed.png')

        # ===== 3. downstream_section.png =====
        # 找 #section-demand-chain（下游需求传导），scrollIntoView 后截 600px
        await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)

        # 检查 section 位置
        info3 = await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            const r = el ? el.getBoundingClientRect() : null;
            return r ? {top: r.top, height: r.height, bottom: r.bottom} : null;
        }""")
        print(f'\ndownstream (section-demand-chain): {info3}')

        # viewport clip 从 y=0 截 600px
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 600}
        )
        print('3. + downstream_section.png (clip 1440x600)')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())