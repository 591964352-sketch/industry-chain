"""scripts/_verify_screenshots_v3.py · 3 张精确截图 v3 - 展开下游需求传导 + 真实关闭面板"""
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

        # ===== 1. prosperity_section.png (1400px) =====
        await page.evaluate("""() => {
            const el = document.getElementById('section-prosperity');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 1400}
        )
        print('1. + prosperity_section.png (1440x1400)')

        # ===== 2. sidebar_button_closed.png =====
        # 关闭数据变更面板（找 ✕ 按钮真实点击）
        await page.set_viewport_size({'width': 1440, 'height': 900})
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 真实点击 changelog-close ✕ 按钮（id="changelog-close"）
        await page.evaluate("""() => {
            // 真实点击 ✕ 按钮（class="changelog-close"）
            const closeBtn = document.querySelector('.changelog-close');
            if (closeBtn) {
                closeBtn.click();
            }
        }""")
        await asyncio.sleep(0.5)

        info2 = await page.evaluate("""() => {
            const clPanel = document.getElementById('changelog-panel');
            const clToggle = document.getElementById('cl-toggle');
            const allBtns = document.querySelectorAll('button, .cl-toggle, [id*="toggle"]');
            return {
                panelClass: clPanel ? clPanel.className : 'NO PANEL',
                panelVisible: clPanel ? window.getComputedStyle(clPanel).display !== 'none' : null,
                toggleExists: !!clToggle,
                toggleRect: clToggle ? clToggle.getBoundingClientRect() : null,
                toggleStyle: clToggle ? {
                    position: window.getComputedStyle(clToggle).position,
                    right: window.getComputedStyle(clToggle).right,
                    top: window.getComputedStyle(clToggle).top,
                    display: window.getComputedStyle(clToggle).display,
                    visibility: window.getComputedStyle(clToggle).visibility
                } : null
            };
        }""")
        print(f'\n[sidebar] panelClass={info2["panelClass"]} panelVisible={info2["panelVisible"]}')
        print(f'[sidebar] toggleExists={info2["toggleExists"]} toggleStyle={info2["toggleStyle"]}')
        print(f'[sidebar] toggleRect={info2["toggleRect"]}')

        # 截右侧 200px 宽 x 360 y 300px 高（覆盖 right:0 区域）
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 360, 'width': 200, 'height': 300}
        )
        print('2. + sidebar_button_closed.png')

        # ===== 3. downstream_section.png =====
        # 先展开 #section-demand-chain，再 scrollIntoView，截 600px
        await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (el) {
                // 移除 collapsed class 强制展开
                el.classList.remove('collapsed');
                // 触发展开后的内容渲染（如果是用 toggleSection 控制）
                if (typeof toggleSection === 'function') {
                    toggleSection('demand');
                }
            }
        }""")
        await asyncio.sleep(0.5)
        await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)

        info3 = await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                top: r.top,
                height: r.height,
                bottom: r.bottom,
                className: el.className,
                sectionBody: el.querySelector('.section-body') ? 'has body' : 'no body',
                innerText: el.innerText.slice(0, 200)
            };
        }""")
        print(f'\n[downstream] info: {info3}')

        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 600}
        )
        print('3. + downstream_section.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())