"""scripts/_verify_4_76.py · commit 4.76 视觉修复第二轮验证 + 截图"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 截图 1: layer1
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/layer1.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('1. ✓ layer1.png')

        # 截图 2: signals_section
        await page.evaluate("document.querySelector('.section.collapsible.collapsed[data-key=\"decision\"]').classList.remove('collapsed')")
        await asyncio.sleep(0.3)
        await page.evaluate("document.getElementById('section-decision').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/signals_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('2. ✓ signals_section.png')

        # 截图 3: full_page
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/full_page.png',
            full_page=True
        )
        print('3. ✓ full_page.png')

        # 验证修复
        result = await page.evaluate("""() => {
            // 修复1: treeMap 编号是②
            const treeMapTitle = document.querySelector('#section-treemap .section-title');
            const treeMapNum = treeMapTitle ? treeMapTitle.querySelector('.num').innerText : '';
            const treeMapDescCollapsed = treeMapTitle ? !!treeMapTitle.parentElement.querySelector('details') : false;
            // 修复3: 副标题
            const sub = document.querySelector('.header .subtitle');
            const subStyle = sub ? window.getComputedStyle(sub) : null;
            // 修复4: 信号 C 距离表代码列宽
            const distTable = Array.from(document.querySelectorAll('table.stock-tbl')).find(t => t.querySelector('thead th:nth-child(3)')?.innerText.includes('PE回调'));
            const codeColWidth = distTable ? distTable.querySelector('colgroup col:first-child').style.width : '';
            // 修复5: segment 列 overflow
            const buyTable = Array.from(document.querySelectorAll('table.stock-tbl')).find(t => t.querySelector('thead th:nth-child(3)')?.innerText.includes('段位'));
            const segTd = buyTable ? buyTable.querySelector('tbody tr td:nth-child(3)') : null;
            const segStyle = segTd ? window.getComputedStyle(segTd) : null;
            // 修复6: 信号阈值 details 折叠
            const thrDetails = Array.from(document.querySelectorAll('details summary')).filter(s => s.innerText.includes('查看信号触发条件'));
            return {
                treeMapNum,
                treeMapDescCollapsed,
                subFontSize: subStyle ? subStyle.fontSize : '',
                subColor: subStyle ? subStyle.color : '',
                subOpacity: subStyle ? subStyle.opacity : '',
                distCodeColWidth: codeColWidth,
                segOverflow: segStyle ? segStyle.overflow : '',
                segWhiteSpace: segStyle ? segStyle.whiteSpace : '',
                thrDetailsCount: thrDetails.length
            };
        }""")
        print('\n=== 修复验证 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        await browser.close()

asyncio.run(main())