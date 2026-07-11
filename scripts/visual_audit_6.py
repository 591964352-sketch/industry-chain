"""
scripts/visual_audit_6.py
★ 视觉诊断：6 张截图（无代码修改·纯审计）

1. full_page.png         全页（device_scale_factor=0.5 缩放·full_page=True）
2. hero_section.png      Hero 区（顶部 500px）
3. holding_section.png   持仓管理（滚动到 y=500 后截 600px）
4. ranking_section.png   基本面排名榜（动态定位·h=600）
5. signals_section.png   信号C TOP3 + 历史回放（动态定位·h=500）
6. segments_section.png  上游 stock 表格（展开电子树脂 segment·h=600）
"""
import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

OUT = 'd:/乌龟/产业链全景/screenshots/visual_audit'

async def main():
    async with async_playwright() as p:
        # full_page 用 0.5 倍 device_scale_factor 缩放
        browser = await p.chromium.launch()
        ctx_full = await browser.new_context(
            viewport={'width': 1440, 'height': 900},
            device_scale_factor=0.5
        )
        page_full = await ctx_full.new_page()
        await page_full.goto('file:///D:/乌龟/产业链全景/index.html#pcb', wait_until='load', timeout=30000)
        await asyncio.sleep(3)
        await page_full.screenshot(path=f'{OUT}/full_page.png', full_page=True)
        print(f'1. ✓ full_page.png (full_page=True, scale=0.5)')
        await ctx_full.close()

        # 其他 5 张用 1.0 倍（保证清晰度）
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb', wait_until='load', timeout=30000)
        await asyncio.sleep(3)

        # 2. hero_section（页面顶部 500px）
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path=f'{OUT}/hero_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 500}
        )
        print(f'2. ✓ hero_section.png (x=230, y=0, w=1210, h=500)')

        # 3. holding_section（滚动到 y=500 截 600px）
        await page.evaluate("window.scrollTo(0, 500)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path=f'{OUT}/holding_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print(f'3. ✓ holding_section.png (scroll y=500, w=1210, h=600)')

        # 4. ranking_section（动态定位：滚到基本面排名卡居中）
        await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('基本面质量横向排名')) {
                    c.scrollIntoView({behavior:'instant', block:'start'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path=f'{OUT}/ranking_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print(f'4. ✓ ranking_section.png (基本面排名卡居中, h=600)')

        # 5. signals_section（信号C TOP3 + 历史回放）
        await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('距离最近 TOP3')) {
                    c.scrollIntoView({behavior:'instant', block:'start'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path=f'{OUT}/signals_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 500}
        )
        print(f'5. ✓ signals_section.png (TOP3 + 历史回放, h=500)')

        # 6. segments_section（展开电子树脂 segment 后截图）
        # 先找到电子树脂 segment header 滚到顶部
        await page.evaluate("""() => {
            // 找含「电子树脂」字样的 details 元素
            const allDetails = document.querySelectorAll('details');
            for (const d of allDetails) {
                if (d.innerText.includes('电子树脂')) {
                    d.open = true;
                    d.scrollIntoView({behavior:'instant', block:'start'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path=f'{OUT}/segments_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print(f'6. ✓ segments_section.png (电子树脂 segment 展开, h=600)')

        await browser.close()
        print(f'\n=== 6 张截图全部保存到 {OUT}/ ===')

asyncio.run(main())
