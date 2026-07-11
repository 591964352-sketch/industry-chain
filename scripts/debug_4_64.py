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

        # 直接抓所有 stock-tbl 的 HTML 样本
        html = await page.evaluate("""() => {
            const tbls = document.querySelectorAll('table.stock-tbl');
            const result = [];
            tbls.forEach((t, idx) => {
                const segTitle = t.closest('.segment-card')?.querySelector('.seg-title')?.innerText?.split(String.fromCharCode(10))[0]?.slice(0, 30) || '?';
                const firstRow = t.querySelector('tbody tr');
                const logicCell = firstRow?.querySelectorAll('td');
                const lastTd = logicCell?.[logicCell.length - 1];
                result.push({
                    idx,
                    seg: segTitle,
                    lastTdHtml: lastTd ? lastTd.innerHTML.slice(0, 200) : '(empty)',
                    hasDetails: !!t.querySelector('details.logic-collapse')
                });
            });
            return result;
        }""")

        print(f"=== total tables: {len(html)} ===")
        for r in html:
            print(f"\n[{r['idx']}] {r['seg']}")
            print(f"    hasDetails={r['hasDetails']}")
            print(f"    lastTdHtml: {r['lastTdHtml'][:200]}")

        await browser.close()

asyncio.run(main())
