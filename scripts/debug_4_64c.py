import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await ctx.new_page()
        await page.goto("http://localhost:8000/index.html#pcb", wait_until="networkidle", timeout=30000)
        await asyncio.sleep(2)

        # 直接看 details 的 open 属性
        result = await page.evaluate("""() => {
            const detailsList = Array.from(document.querySelectorAll('details.logic-collapse'));
            return detailsList.slice(0, 3).map((d, i) => ({
                idx: i,
                open: d.open,
                openAttr: d.hasAttribute('open'),
                hasSummary: !!d.querySelector('summary'),
                summaryText: d.querySelector('summary')?.innerText?.slice(0, 80) || '(no summary)',
                innerDiv: d.querySelector('div')?.innerText?.slice(0, 60) || '(no div)'
            }));
        }""")
        for r in result:
            print(f"[{r['idx']}] open={r['open']} openAttr={r['openAttr']} hasSummary={r['hasSummary']}")
            print(f"    summary: {r['summaryText']}")
            print(f"    div: {r['innerDiv']}")

        # 行高测量 - 仅 summary 折叠态
        heights = await page.evaluate("""() => {
            const detailsList = Array.from(document.querySelectorAll('details.logic-collapse'));
            const heights = [];
            detailsList.forEach(d => {
                const tr = d.closest('tr');
                if (tr) heights.push(Math.round(tr.getBoundingClientRect().height));
            });
            return heights;
        }""")
        print(f"\n行高（折叠态 details 默认关闭）: {heights}")
        if heights:
            print(f"  max={max(heights)} avg={sum(heights)//len(heights)} count={len(heights)}")

        await browser.close()

asyncio.run(main())
