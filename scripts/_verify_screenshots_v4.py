"""scripts/_verify_screenshots_v4.py · 4 张截图 v4 - 强制设置 viewport + 修复 sidebar 截图"""
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
        # 关键：必须保证 viewport 是 1440 宽
        # 直接设置 viewport 不通过 set_viewport_size（可能影响 page size）
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)

        # 触发 toggleChangelog() 关闭面板
        await page.evaluate("""() => {
            // 直接调 toggleChangelog() 函数
            if (typeof toggleChangelog === 'function') {
                // 当前面板是 collapsed（已隐藏），要让它显示
                // 但用户要的是"关闭状态"截图——已 collapsed 状态就是关闭
                // 让我们看清楚当前状态
                const panel = document.getElementById('changelog-panel');
                console.log('before panel.className:', panel.className);
                // 强制设为 collapsed
                panel.classList.add('collapsed');
                console.log('after panel.className:', panel.className);
            }
        }""")
        await asyncio.sleep(0.3)

        info = await page.evaluate("""() => {
            const panel = document.getElementById('changelog-panel');
            const toggle = document.getElementById('cl-toggle');
            return {
                windowInnerWidth: window.innerWidth,
                windowInnerHeight: window.innerHeight,
                documentClientWidth: document.documentElement.clientWidth,
                panelClass: panel ? panel.className : 'NO',
                panelRect: panel ? panel.getBoundingClientRect() : null,
                toggleRect: toggle ? toggle.getBoundingClientRect() : null,
                toggleComputed: toggle ? {
                    right: window.getComputedStyle(toggle).right,
                    top: window.getComputedStyle(toggle).top,
                    transform: window.getComputedStyle(toggle).transform,
                    visibility: window.getComputedStyle(toggle).visibility
                } : null
            };
        }""")
        print(f'[sidebar] innerWidth={info["windowInnerWidth"]} innerHeight={info["windowInnerHeight"]}')
        print(f'[sidebar] panelClass={info["panelClass"]}')
        print(f'[sidebar] panelRect={info["panelRect"]}')
        print(f'[sidebar] toggleRect={info["toggleRect"]}')
        print(f'[sidebar] toggleComputed={info["toggleComputed"]}')

        # viewport 1440 宽，截图右侧 200px (x=1240~1440)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 360, 'width': 200, 'height': 300}
        )
        print('2. + sidebar_button_closed.png')

        # ===== 3. downstream_section.png =====
        # 强制展开 section-demand-chain
        await page.evaluate("""() => {
            const el = document.getElementById('section-demand-chain');
            if (el) {
                el.classList.remove('collapsed');
            }
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
            return {
                className: el ? el.className : null,
                height: r ? r.height : null,
                top: r ? r.top : null,
                bodyExists: el ? !!el.querySelector('.section-body') : false,
                innerTextLen: el ? el.innerText.length : 0
            };
        }""")
        print(f'\n[downstream] {info3}')

        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 600}
        )
        print('3. + downstream_section.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())