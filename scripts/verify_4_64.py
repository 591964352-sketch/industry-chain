import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await ctx.new_page()
        await page.goto("http://localhost:8000/index.html#pcb", wait_until="networkidle", timeout=30000)
        await asyncio.sleep(2)

        # 1. 滚动到上游 segments section
        await page.evaluate("document.querySelector('#section-upstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)

        # 2. 收集 7 张表的行高 + 折叠状态
        result = await page.evaluate("""() => {
            const segCards = Array.from(document.querySelectorAll('.segment-card'));
            const reports = [];

            segCards.forEach(card => {
                const titleEl = card.querySelector('.seg-title');
                const title = titleEl ? titleEl.innerText.replace(/\\n/g, ' ').trim().slice(0, 30) : '?';
                const tbl = card.querySelector('table.stock-tbl');
                if (!tbl) { reports.push({title, hasTable: false}); return; }

                const rows = Array.from(tbl.querySelectorAll('tbody tr'));
                const rowReports = rows.map((tr, idx) => {
                    const rect = tr.getBoundingClientRect();
                    const cells = Array.from(tr.querySelectorAll('td'));
                    const logicCell = cells[cells.length - 1];
                    const details = logicCell ? logicCell.querySelector('details.logic-collapse') : null;
                    const summary = details ? details.querySelector('summary') : null;
                    const _markInSummary = summary ? summary.querySelectorAll('mark').length : 0;
                    const _markTotal = details ? details.querySelectorAll('mark').length : 0;
                    return {
                        idx,
                        height: Math.round(rect.height),
                        collapsed: details ? !details.open : null,
                        hasDetails: !!details,
                        summaryText: summary ? summary.innerText.slice(0, 40) : '',
                        markInSummary: _markInSummary,
                        markTotal: _markTotal,
                        markComplete: _markTotal > 0 && _markInSummary === _markTotal
                    };
                });
                const heights = rowReports.map(r => r.height).filter(h => h > 0);
                const detailsRows = rowReports.filter(r => r.hasDetails);
                const markCompleteRows = rowReports.filter(r => r.markComplete);
                reports.push({
                    title,
                    rows: rowReports.length,
                    maxHeight: heights.length ? Math.max(...heights) : 0,
                    avgHeight: heights.length ? Math.round(heights.reduce((a,b)=>a+b,0)/heights.length) : 0,
                    detailsRows: detailsRows.length,
                    markCompleteRows: markCompleteRows.length,
                    sample: rowReports[0] || null
                });
            });
            return reports;
        }""")

        print("=== 4.64 验收：7 张表折叠态行高 ===")
        print("=" * 80)
        all_pass = True
        total_rows = 0
        total_details = 0
        total_mark_complete = 0
        for i, r in enumerate(result):
            if not r.get("hasTable", True):
                print(f"[{i}] {r['title']} (无 stock-tbl)")
                continue
            total_rows += r["rows"]
            total_details += r["detailsRows"]
            total_mark_complete += r["markCompleteRows"]
            status = "✓" if r["maxHeight"] <= 80 else "❌"
            print(f"[{i}] {r['title']}")
            print(f"     rows={r['rows']} maxHeight={r['maxHeight']}px {status} avg={r['avgHeight']}px details={r['detailsRows']}/{r['rows']} mark完整={r['markCompleteRows']}/{r['detailsRows']}")
            if r["maxHeight"] > 80:
                all_pass = False

        print(f"\n=== 汇总：{total_rows} 行 · {total_details} 行有 details · {total_mark_complete} 行 mark 完整 ===")
        print(f"行高≤80px 验收：{'✅ PASS' if all_pass else '❌ FAIL'}")
        print(f"mark 完整性：{total_mark_complete}/{total_details} {'✅' if total_mark_complete == total_details else '❌'}")

        # 3. 点击"▾ 展开"测试
        print("\n=== 折叠展开测试 ===")
        details_count = await page.evaluate("""() => {
            const d = document.querySelector('details.logic-collapse');
            if (!d) return {found: false};
            return {found: true, collapsed: !d.open};
        }""")
        print(f"找到首个 details: {details_count}")

        if details_count["found"]:
            # 找到第一个 details 并展开
            target = await page.query_selector('details.logic-collapse')
            if target:
                await target.evaluate("d => d.open = true")
                await asyncio.sleep(0.5)
                open_state = await target.evaluate("d => d.open")
                print(f"展开后 open={open_state} {'✅' if open_state else '❌'}")
                # 完整内容文字长度
                full_text_len = await target.evaluate("d => d.innerText.length")
                print(f"展开后完整内容文字长度={full_text_len} 字符")

        # 4. 截图
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_segments.png", full_page=False)
        print("\n=== 截图：d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_segments.png ===")

        await browser.close()

asyncio.run(main())
