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

        # 检查上游 segments 的最后一列 td 数量 + 内容
        result = await page.evaluate("""() => {
            const segCards = Array.from(document.querySelectorAll('.segment-card'));
            const reports = [];
            segCards.forEach(card => {
                const titleEl = card.querySelector('.seg-title');
                const title = titleEl ? titleEl.innerText.split(String.fromCharCode(10))[0].slice(0, 30) : '?';
                const tbl = card.querySelector('table.stock-tbl');
                if (!tbl) return;
                const firstRow = tbl.querySelector('tbody tr');
                if (!firstRow) return;
                const cells = firstRow.querySelectorAll('td');
                const lastTd = cells[cells.length - 1];
                reports.push({
                    title,
                    cellCount: cells.length,
                    lastTdLen: lastTd ? lastTd.innerText.length : 0,
                    lastTdHasDetails: lastTd ? !!lastTd.querySelector('details') : false,
                    lastTdHasDiv: lastTd ? !!lastTd.querySelector('div') : false,
                    lastTdHasMark: lastTd ? !!lastTd.querySelector('mark') : false,
                    lastTdSnippet: lastTd ? lastTd.innerHTML.slice(0, 80) : '(empty)'
                });
            });
            return reports;
        }""")

        for r in result:
            print(f"[{r['title']}]")
            print(f"    cellCount={r['cellCount']} lastTdLen={r['lastTdLen']}")
            print(f"    details={r['lastTdHasDetails']} div={r['lastTdHasDiv']} mark={r['lastTdHasMark']}")
            print(f"    snippet: {r['lastTdSnippet']}")

        await browser.close()

asyncio.run(main())
