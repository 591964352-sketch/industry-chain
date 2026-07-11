"""scripts/_verify_three_col.py · 4.77 任务 A/B/C 综合验证 + 截图"""
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

        # 关键验证
        result = await page.evaluate("""() => {
            const out = {};

            // 任务 A: 景气仪表盘 details max-width/box-sizing/overflow
            const macroDetails = document.querySelector('#section-macro details');
            if (macroDetails) {
                const s = window.getComputedStyle(macroDetails);
                out.macroMaxWidth = s.maxWidth;
                out.macroBoxSizing = s.boxSizing;
                out.macroOverflow = s.overflow;
                out.macroBgWidth = macroDetails.getBoundingClientRect().width;
                out.macroViewportWidth = window.innerWidth;
                out.macroExceeds = macroDetails.getBoundingClientRect().right > window.innerWidth;
            }

            // 任务 B: 三列并排 grid
            const gridEl = Array.from(document.querySelectorAll('div')).find(d =>
                window.getComputedStyle(d).display === 'grid' &&
                window.getComputedStyle(d).gridTemplateColumns.includes('1fr')
            );
            if (gridEl) {
                const s = window.getComputedStyle(gridEl);
                out.gridTemplateColumns = s.gridTemplateColumns;
                out.gridGap = s.gap;
                // 找到 grid 的三个直接子 div
                const cards = Array.from(gridEl.children).filter(c => c.classList && c.classList.contains('card'));
                out.gridChildCount = cards.length;
                out.gridCardTitles = cards.map(c => {
                    const h = c.querySelector('.card-header');
                    return h ? h.innerText.slice(0, 30) : '';
                });
            } else {
                out.gridFound = false;
            }

            // 任务 B: 信号 C 距离表 details 折叠
            const distDetails = Array.from(document.querySelectorAll('details summary')).find(s => s.innerText.includes('38 只距离'));
            out.distDetailsExists = !!distDetails;
            if (distDetails) {
                out.distDetailsOpen = distDetails.parentElement.open;
                out.distDetailsSummary = distDetails.innerText.slice(0, 50);
            }

            // 任务 C: 检查还有没有 font-size 10/9/8px
            const smallFontEls = [];
            document.querySelectorAll('*').forEach(el => {
                const s = window.getComputedStyle(el);
                const fz = parseFloat(s.fontSize);
                if (fz > 0 && fz < 11) {
                    smallFontEls.push({ tag: el.tagName, fontSize: s.fontSize, text: el.innerText ? el.innerText.slice(0, 20) : '' });
                }
            });
            out.smallFontCount = smallFontEls.length;
            out.smallFontSample = smallFontEls.slice(0, 5);

            // 信号 C 卡不在三列内
            const signalCCard = Array.from(document.querySelectorAll('.card-header')).find(h => h.innerText.includes('信号 C'));
            out.signalCTitleExists = !!signalCCard;
            if (signalCCard) {
                const card = signalCCard.closest('.card');
                const parent = card ? card.parentElement : null;
                out.signalCParentIsGrid = parent && window.getComputedStyle(parent).display === 'grid';
            }

            return out;
        }""")
        print('=== 综合验证 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        # 重新截图 6 张
        # 1. full_page
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/full_page.png', full_page=True)
        print('\n1. + full_page.png')

        # 2. hero_top
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/hero_top.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 700})
        print('2. + hero_top.png')

        # 3. prosperity_section (三列并排)
        await page.evaluate("document.getElementById('section-prosperity').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 800})
        print('3. + prosperity_section.png')

        # 4. holding_section
        await page.evaluate("document.getElementById('section-holding').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/holding_section.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600})
        print('4. + holding_section.png')

        # 5. sidebar_button
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button.png', clip={'x': 1180, 'y': 200, 'width': 260, 'height': 300})
        print('5. + sidebar_button.png')

        # 6. downstream_section (数据来源明细折叠)
        await page.evaluate("""() => {
            const el = document.querySelector('.choke-summary');
            if (el) el.scrollIntoView({behavior:'instant', block:'start'});
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 500})
        print('6. + downstream_section.png')

        # 7. signal_c_distance 折叠状态
        await page.evaluate("""() => {
            const el = Array.from(document.querySelectorAll('details summary')).find(s => s.innerText.includes('38 只距离'));
            if (el) el.parentElement.scrollIntoView({behavior:'instant', block:'start'});
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(path='d:/乌龟/产业链全景/screenshots/visual_audit/signal_c_distance.png', clip={'x': 230, 'y': 0, 'width': 1210, 'height': 500})
        print('7. + signal_c_distance.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())