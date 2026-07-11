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

        # 1. 收集所有 segment 的 stock-tbl 行（每个 segment 一张表）
        result = await page.evaluate("""() => {
            const segCards = Array.from(document.querySelectorAll('.segment-card'));
            const reports = [];

            segCards.forEach(card => {
                const titleEl = card.querySelector('.seg-title');
                const title = titleEl ? titleEl.innerText.replace(/\\n/g, ' ').trim().slice(0, 40) : '?';
                const tbl = card.querySelector('table.stock-tbl');
                if (!tbl) {
                    reports.push({title, hasTable: false});
                    return;
                }
                // 计算列宽 (从 colgroup)
                const colgroup = tbl.querySelector('colgroup');
                const cols = colgroup ? Array.from(colgroup.querySelectorAll('col')).map(c => c.style.width || '?') : [];

                // 表头
                const ths = Array.from(tbl.querySelectorAll('thead th')).map(th => th.innerText.trim());

                // 所有行（tbody tr）
                const rows = Array.from(tbl.querySelectorAll('tbody tr'));
                const rowData = rows.map(tr => {
                    const tds = Array.from(tr.querySelectorAll('td'));
                    return tds.map(td => td.innerText.replace(/\\n/g, ' | ').trim());
                });

                // 计算 logic 字段（第 5 列或最后列）的字数
                const logicColIdx = ths.findIndex(h => h.includes('逻辑') || h.includes('理由') || h.includes('原因'));
                const logicLens = rowData.map(r => logicColIdx >= 0 ? (r[logicColIdx] || '').length : 0);

                reports.push({
                    title,
                    hasTable: true,
                    cols,
                    ths,
                    rows: rows.length,
                    logicColIdx,
                    logicLens,
                    avgLogicLen: logicLens.length ? Math.round(logicLens.reduce((a, b) => a + b, 0) / logicLens.length) : 0,
                    maxLogicLen: logicLens.length ? Math.max(...logicLens) : 0,
                    sampleLogic: logicColIdx >= 0 && rowData[0] ? rowData[0][logicColIdx] : ''
                });
            });
            return reports;
        }""")

        print("=== PCB segments stock-tbl 密度诊断 ===")
        print("=" * 70)
        total_rows = 0
        for i, r in enumerate(result):
            print(f"\n[{i}] {r['title']}")
            if not r.get('hasTable'):
                print("    (无 stock-tbl)")
                continue
            print(f"    列数={len(r['ths'])} 列宽={r['cols']}")
            print(f"    表头={r['ths']}")
            print(f"    行数={r['rows']}  逻辑列索引={r['logicColIdx']}")
            print(f"    逻辑字段平均字数={r['avgLogicLen']}  最大={r['maxLogicLen']}")
            print(f"    样本逻辑: {r['sampleLogic'][:80]}...")
            total_rows += r['rows']

        print(f"\n=== 总计：{total_rows} 只 stock（≈ 35~38 区间）===")

        # 2. 全局 CSS 字号检查
        css_info = await page.evaluate("""() => {
            const tbl = document.querySelector('.stock-tbl');
            if (!tbl) return null;
            const cs = getComputedStyle(tbl);
            const td = tbl.querySelector('td');
            const tdCs = td ? getComputedStyle(td) : null;
            const th = tbl.querySelector('thead th');
            const thCs = th ? getComputedStyle(th) : null;
            return {
                tblFontSize: cs.fontSize,
                tblLineHeight: cs.lineHeight,
                tblTableLayout: cs.tableLayout,
                tdFontSize: tdCs ? tdCs.fontSize : null,
                tdPadding: tdCs ? tdCs.padding : null,
                thFontSize: thCs ? thCs.fontSize : null,
                thPadding: thCs ? thCs.padding : null
            };
        }""")
        print("\n=== stock-tbl CSS 诊断 ===")
        print(json.dumps(css_info, indent=2, ensure_ascii=False))

        await browser.close()

asyncio.run(main())
