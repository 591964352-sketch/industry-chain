"""scripts/_verify_4_77.py · commit 4.77 综合视觉优化验证 + 6 张截图"""
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

        # 1. full_page
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/full_page.png',
            full_page=True
        )
        print('1. + full_page.png')

        # 2. hero_top（顶部：数据截止+Hero+白话+树状图）
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/hero_top.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 700}
        )
        print('2. + hero_top.png')

        # 3. prosperity_section（景气六维+周期+买入信号）
        await page.evaluate("document.getElementById('section-prosperity').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('3. + prosperity_section.png')

        # 4. holding_section（持仓管理）
        await page.evaluate("document.getElementById('section-holding').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/holding_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('4. + holding_section.png')

        # 5. sidebar_button（侧边栏唤醒按钮 · 看 cl-toggle 是否显示）
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/sidebar_button.png',
            clip={'x': 1180, 'y': 200, 'width': 260, 'height': 300}
        )
        print('5. + sidebar_button.png')

        # 6. downstream_section（下游需求传导 · 数据来源明细折叠）
        await page.evaluate("""() => {
            const el = document.querySelector('.choke-summary');
            if (el) el.scrollIntoView({behavior:'instant', block:'start'});
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/downstream_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 500}
        )
        print('6. + downstream_section.png')

        # 验证关键修复
        result = await page.evaluate("""() => {
            // 调整2: 数据截止在 Hero 之前
            const hero = document.querySelector('.hero-banner');
            const dataBox = hero ? hero.previousElementSibling : null;
            const dataText = dataBox ? dataBox.innerText.slice(0, 40) : '';
            // 修复2: cl-toggle 默认显示
            const clToggle = document.getElementById('cl-toggle');
            const clToggleVisible = clToggle ? !clToggle.classList.contains('hidden') : false;
            // 修复3: 下游需求传导数据来源明细默认折叠
            const chokeDetail = document.querySelector('.choke-detail');
            const chokeDetailDisplay = chokeDetail ? window.getComputedStyle(chokeDetail).display : '';
            // 调整1: Hero 内部 analogy opacity
            const heroAnalogy = hero ? hero.querySelector('div[style*="opacity"]') : null;
            // 优化2: 树状图 section 标题
            const treeTitle = document.querySelector('#section-treemap .section-title');
            const treeTitleText = treeTitle ? treeTitle.innerText : '';
            return {
                dataBeforeHero: dataText,
                clToggleVisible,
                chokeDetailDisplay,
                treeTitleText
            };
        }""")
        print('\n=== 关键修复验证 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        print(f'\nJS errors: {errors}')

        await browser.close()

asyncio.run(main())