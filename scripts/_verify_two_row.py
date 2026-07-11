"""scripts/_verify_two_row.py · 两行布局验证 + 3 张截图"""
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

        # 综合验证
        result = await page.evaluate("""() => {
            const out = {};

            // 修改 1 验证：景气六维独占全宽
            const prosperityCard = Array.from(document.querySelectorAll('.card')).find(c => {
                const h = c.querySelector('.card-header');
                return h && h.innerText.includes('景气六维');
            });
            if (prosperityCard) {
                const r = prosperityCard.getBoundingClientRect();
                out.prosperityCardWidth = r.width;
                out.prosperityCardHeight = r.height;
            }

            // 修改 1 验证：1fr 2fr grid（第二行）
            const grid = Array.from(document.querySelectorAll('div')).find(d => {
                const s = window.getComputedStyle(d);
                return s.display === 'grid' && s.gridTemplateColumns.split(' ').length === 2 &&
                       d.querySelector('.card-header')?.innerText.includes('周期位置');
            });
            if (grid) {
                const s = window.getComputedStyle(grid);
                out.gridTemplateColumns = s.gridTemplateColumns;
                out.gridChildCount = grid.children.length;
                out.gridChildHeaders = Array.from(grid.children).map(c => {
                    const h = c.querySelector('.card-header');
                    return h ? h.innerText.slice(0, 30) : 'NO HEADER';
                });
                out.gridChildWidths = Array.from(grid.children).map(c => c.getBoundingClientRect().width);
            } else {
                out.gridFound = false;
            }

            // 修改 2 验证：距离表 details summary
            const distSummary = Array.from(document.querySelectorAll('details summary')).find(s => s.innerText.includes('只距离'));
            if (distSummary) {
                out.distSummaryText = distSummary.innerText;
                out.distDetailsOpen = distSummary.parentElement.open;
            } else {
                out.distSummaryFound = false;
            }

            // 信号 C 卡 margin-top
            const signalCCard = Array.from(document.querySelectorAll('.card')).find(c => {
                const h = c.querySelector('.card-header');
                return h && h.innerText.includes('信号 C');
            });
            if (signalCCard) {
                const s = window.getComputedStyle(signalCCard);
                out.signalCMarginTop = s.marginTop;
                // 确认不在 grid 内
                const parent = signalCCard.parentElement;
                out.signalCParentIsGrid = parent && window.getComputedStyle(parent).display === 'grid';
            }

            return out;
        }""")
        print('=== 综合验证 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        # 截图 1: prosperity_section（两行布局）
        await page.evaluate("document.getElementById('section-prosperity').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 1100})
        print('\n1. + prosperity_section.png')

        # 截图 2: sidebar_button_closed — 关掉数据变更面板
        # 找到数据变更面板的关闭按钮
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.evaluate("""() => {
            const cl = document.querySelector('.changelog-panel, #changelog, [class*="changelog"]');
            if (cl) cl.style.display = 'none';
            // 尝试点击关闭按钮
            const closeBtn = document.querySelector('.cl-close, [onclick*="toggleChangelog"], .close-btn');
            if (closeBtn) closeBtn.click();
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button_closed.png', clip={'x': 1180, 'y': 200, 'width': 260, 'height': 400})
        print('2. + sidebar_button_closed.png')

        # 截图 3: downstream_section
        await page.evaluate("""() => {
            const el = document.querySelector('.choke-summary, [class*="choke"]');
            if (el) el.scrollIntoView({behavior:'instant', block:'start'});
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 500})
        print('3. + downstream_section.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())