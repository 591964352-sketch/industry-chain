"""scripts/_verify_4_75_amend.py · commit 4.75 amend 验证 + 截图 3 张"""
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

        # 截图 1: full_page
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/full_page.png',
            full_page=True
        )
        print('1. ✓ full_page.png')

        # 截图 2: layer1（Hero + 树状图）
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/layer1.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('2. ✓ layer1.png')

        # 截图 3: 信号 C 距离表区域（section-decision 展开态）
        await page.evaluate("document.querySelector('.section.collapsible.collapsed[data-key=\"decision\"]').classList.remove('collapsed')")
        await asyncio.sleep(0.3)
        # 滚动到信号 C 距离表
        await page.evaluate("""() => {
            const distLabel = document.evaluate(\"//div[contains(text(), '信号 C 距离显示')]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (distLabel) distLabel.scrollIntoView({behavior:'instant', block:'start'});
        }""")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/signal_c_distance.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('3. ✓ signal_c_distance.png（信号 C 距离表 + 买入信号监测）')

        # 验证表格列宽修复
        result = await page.evaluate("""() => {
            // 找所有距离表 · 检查 colgroup 简称列宽度
            const tables = document.querySelectorAll('table.stock-tbl');
            const out = [];
            tables.forEach((t, i) => {
                const cs = window.getComputedStyle(t);
                const hasFixed = cs.tableLayout === 'fixed';
                const hasKeepAll = cs.wordBreak === 'keep-all';
                const ths = t.querySelectorAll('thead th');
                let nameColWidth = null;
                ths.forEach((th, j) => {
                    if (th.innerText === '简称') nameColWidth = th.offsetWidth;
                });
                const firstRow = t.querySelector('tbody tr');
                const firstNameCell = firstRow ? firstRow.querySelectorAll('td')[1] : null;
                const cellText = firstNameCell ? firstNameCell.innerText : '';
                out.push({
                    tableIdx: i,
                    hasFixed,
                    hasKeepAll,
                    nameColWidth,
                    firstNameText: cellText.slice(0, 20),
                    firstNameHeight: firstNameCell ? firstNameCell.offsetHeight : null
                });
            });
            return out;
        }""")
        print('\n=== 表格列宽验证 ===')
        for i, t in enumerate(result[:5]):
            mark = '✅' if t['hasFixed'] and t['hasKeepAll'] and t['nameColWidth'] and t['nameColWidth'] > 60 else '⚠️'
            print(f"  [{i}] table-{t['tableIdx']}: fixed={t['hasFixed']} keep-all={t['hasKeepAll']} 简称列宽={t['nameColWidth']}px 首格={t['firstNameText']} 高={t['firstNameHeight']}px {mark}")

        await browser.close()

asyncio.run(main())