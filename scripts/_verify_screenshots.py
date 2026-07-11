"""scripts/_verify_screenshots.py · 3 张精确截图（按元素 scrollIntoView + element-relative 高度）"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # ===== 1. prosperity_section.png =====
        # scrollIntoView 让 #section-prosperity 顶部对齐视口顶部
        # 然后截 viewport 从 y=0 起 1400px（足够覆盖两行布局）
        await page.evaluate("""() => {
            const el = document.getElementById('section-prosperity');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)

        # 用 page.screenshot clip 从当前视口顶部截 1400px（高度超 viewport）
        # Playwright 不支持直接截超过 viewport 高度的 clip，改用 full_page 但要确保 section-prosperity 顶部对齐
        # 改用 element.screenshot()：直接截 #section-prosperity + 加 1400px 高度（如果需要）
        # 但 element.screenshot 只截元素本身高度。改方案：临时给 section-prosperity 加 min-height:1400px 不行。
        # 最稳：用 viewport clip 从当前 scrollY 截 1400px —— 即使超过 viewport 浏览器会自动滚
        # Playwright screenshot 的 clip 不支持 y < 0，所以扩大 viewport 高度
        await page.set_viewport_size({'width': 1440, 'height': 1500})
        await page.evaluate("""() => {
            const el = document.getElementById('section-prosperity');
            if (el) el.scrollIntoView({behavior: 'instant', block: 'start'});
        }""")
        await asyncio.sleep(0.5)
        section_top = await page.evaluate("() => document.getElementById('section-prosperity').getBoundingClientRect().top")
        print(f'prosperity section top after scroll: {section_top}')

        # 截从 viewport 顶部 (0) 到 1400px
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 1400}
        )
        print('1. + prosperity_section.png (viewport 1400px high)')

        # ===== 2. sidebar_button_closed.png =====
        # 恢复小 viewport 模拟真实使用场景，关闭数据变更面板，截右侧边缘
        await page.set_viewport_size({'width': 1440, 'height': 900})
        await asyncio.sleep(0.3)

        # 关闭数据变更面板：找关闭按钮并 click
        closed = await page.evaluate("""() => {
            // 找数据变更面板的关闭按钮（多种选择器）
            const candidates = document.querySelectorAll('[onclick*="toggleChangelog"], .cl-close, .changelog .close, [class*="close"]');
            let clicked = false;
            candidates.forEach(el => {
                if (el.tagName === 'BUTTON' || el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'DIV') {
                    try { el.click(); clicked = true; } catch(e) {}
                }
            });
            return clicked;
        }""")
        print(f'close button clicked: {closed}')

        # 如果没自动关闭，手动隐藏 changelog
        await page.evaluate("""() => {
            // 隐藏所有 changelog 面板
            document.querySelectorAll('[id*="changelog" i], [class*="changelog" i], [class*="cl-panel" i]').forEach(el => {
                el.style.display = 'none';
            });
        }""")
        await asyncio.sleep(0.5)

        # 截右侧边缘 width=200, height=300 from top:40%（即 y=360）
        # 截图的 x = 1440 - 200 = 1240
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png',
            clip={'x': 1240, 'y': 360, 'width': 200, 'height': 300}
        )
        print('2. + sidebar_button_closed.png (right edge x=1240 width=200 y=360 height=300)')

        # ===== 3. downstream_section.png =====
        # 找下游需求传导 section 锚点
        await page.evaluate("""() => {
            // 找 section-downstream 或 textContent 含「下游需求传导」的 section
            const all = document.querySelectorAll('.section, [id*="downstream"], [id*="demand"]');
            for (const el of all) {
                if (el.innerText && (el.innerText.includes('下游需求传导') || el.id === 'section-downstream')) {
                    el.scrollIntoView({behavior: 'instant', block: 'start'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(0.5)

        # 截 viewport 顶部往下 600px
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('3. + downstream_section.png (viewport top 600px)')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())