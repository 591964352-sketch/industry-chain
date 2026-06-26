import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await ctx.new_page()
        await page.goto("file:///D:/乌龟/产业链全景/index.html#pcb", wait_until="domcontentloaded", timeout=30000)
        await asyncio.sleep(3)

        # 强制展开所有 choke segments（确保所有 6 个上游 segment 都可见）
        await page.evaluate("""() => {
            document.querySelectorAll('.segment-card.collapsible').forEach(c => {
                if (c.classList.contains('collapsed')) c.classList.remove('collapsed');
            });
        }""")
        await asyncio.sleep(1)

        result = await page.evaluate("""() => {
            const segCards = Array.from(document.querySelectorAll('.segment-card'));
            const reports = [];
            segCards.forEach(card => {
                const titleEl = card.querySelector('.seg-title');
                const title = titleEl ? titleEl.innerText.split(String.fromCharCode(10))[0].slice(0, 25) : '?';
                const tbl = card.querySelector('table.stock-tbl');
                if (!tbl) { reports.push({title, hasTable: false}); return; }
                const rows = Array.from(tbl.querySelectorAll('tbody tr'));
                const rowData = rows.map(tr => {
                    const rect = tr.getBoundingClientRect();
                    const cells = tr.querySelectorAll('td');
                    const lastTd = cells[cells.length - 1];
                    const details = lastTd?.querySelector('details.logic-collapse');
                    const summary = details?.querySelector('summary');
                    const markInSummary = summary ? summary.querySelectorAll('mark').length : 0;
                    const markTotal = details ? details.querySelectorAll('mark').length : 0;
                    return {
                        height: Math.round(rect.height),
                        hasLogicCollapse: !!details,
                        collapsed: details ? !details.open : null,
                        summaryLen: summary ? summary.innerText.length : 0,
                        fullLen: lastTd?.innerText.length || 0,
                        markInSummary, markTotal,
                        markComplete: markTotal > 0 && markInSummary === markTotal
                    };
                });
                const heights = rowData.map(r => r.height).filter(h => h > 0);
                const hasLogic = rowData.filter(r => r.hasLogicCollapse).length;
                const markOK = rowData.filter(r => r.markComplete).length;
                reports.push({
                    title, rows: rowData.length,
                    maxHeight: heights.length ? Math.max(...heights) : 0,
                    avgHeight: heights.length ? Math.round(heights.reduce((a,b)=>a+b,0)/heights.length) : 0,
                    hasLogic, markOK,
                    sample: rowData[0] || null
                });
            });
            return reports;
        }""")

        print("=== 4.64 验收（强制展开后）===")
        print("=" * 80)
        all_pass = True
        total_rows = 0
        total_logic = 0
        total_mark_ok = 0
        for i, r in enumerate(result):
            if not r.get("hasTable", True):
                print(f"[{i}] {r['title']} (无 stock-tbl)")
                continue
            total_rows += r["rows"]
            total_logic += r["hasLogic"]
            total_mark_ok += r["markOK"]
            status = "✓" if r["maxHeight"] <= 80 else "❌"
            print(f"[{i}] {r['title']}")
            print(f"     rows={r['rows']} maxH={r['maxHeight']}px {status} avg={r['avgHeight']}px logicCollapse={r['hasLogic']}/{r['rows']} mark完整={r['markOK']}/{r['hasLogic']}")
            if r["maxHeight"] > 80:
                all_pass = False

        print(f"\n=== 汇总 ===")
        print(f"  行数: {total_rows}")
        print(f"  logicCollapse 行: {total_logic}")
        print(f"  mark 完整行: {total_mark_ok}")
        print(f"  行高≤80px 验收: {'✅ PASS' if all_pass else '❌ FAIL'}")
        print(f"  mark 完整性: {total_mark_ok}/{total_logic} {'✅' if total_mark_ok == total_logic else '❌'}")

        # 展开所有 details 后再次量高度
        await page.evaluate("""() => {
            document.querySelectorAll('details.logic-collapse').forEach(d => d.open = true);
        }""")
        await asyncio.sleep(1)
        expanded_heights = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('table.stock-tbl tbody tr')).map(tr => Math.round(tr.getBoundingClientRect().height));
        }""")
        print(f"\n=== 全部展开后行高: min={min(expanded_heights)} max={max(expanded_heights)} avg={sum(expanded_heights)//len(expanded_heights)} ===")

        await browser.close()

asyncio.run(main())
