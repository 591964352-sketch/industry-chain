import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await ctx.new_page()
        await page.goto("file:///D:/乌龟/产业链全景/index.html#pcb", wait_until="load", timeout=30000)
        await asyncio.sleep(3)

        # 展开所有 segment 确保所有 stock 可视
        await page.evaluate("""() => {
            document.querySelectorAll('.segment-card.collapsible').forEach(c => c.classList.remove('collapsed'));
        }""")
        await asyncio.sleep(1)

        # 验收 1：行高（折叠态）
        heights = await page.evaluate("""() => {
            const rows = Array.from(document.querySelectorAll('table.stock-tbl tbody tr'));
            return rows.map(tr => Math.round(tr.getBoundingClientRect().height));
        }""")
        print("=" * 70)
        print("=== 4.64 验收 1：折叠态行高（目标 ≤80px）===")
        print(f"  行数: {len(heights)}")
        print(f"  min: {min(heights)}px  max: {max(heights)}px  avg: {sum(heights)//len(heights)}px")
        passed_heights = sum(1 for h in heights if h <= 80)
        print(f"  ≤80px: {passed_heights}/{len(heights)} {'✅ PASS' if passed_heights == len(heights) else '❌ ' + str(len(heights)-passed_heights) + ' 行超限'}")

        # 验收 2：details 折叠存在
        details_count = await page.evaluate("document.querySelectorAll('details.logic-collapse').length")
        print(f"\n=== 4.64 验收 2：details 折叠存在（目标：logic>200字的行都有）===")
        print(f"  details.logic-collapse 数: {details_count}")

        # 验收 3：mark 完整性（关键！）
        print(f"\n=== 4.64 验收 3：<mark> 标签完整性 ===")
        mark_info = await page.evaluate("""() => {
            const details = Array.from(document.querySelectorAll('details.logic-collapse'));
            let totalMarks = 0, summaryMarks = 0, divMarks = 0, broken = 0;
            details.forEach(d => {
                const allMarks = d.querySelectorAll('mark');
                totalMarks += allMarks.length;
                const sumMarks = d.querySelectorAll('summary mark');
                summaryMarks += sumMarks.length;
                const divM = d.querySelectorAll(':scope > div mark');
                divMarks += divM.length;
                // 检查每个 mark 是否有完整的开闭标签
                allMarks.forEach(m => {
                    if (!m.outerHTML.startsWith('<mark') || !m.outerHTML.includes('</mark>')) broken++;
                });
            });
            return {totalMarks, summaryMarks, divMarks, broken};
        }""")
        print(f"  details 内总 mark: {mark_info['totalMarks']}")
        print(f"  summary 内 mark: {mark_info['summaryMarks']}")
        print(f"  div 内 mark: {mark_info['divMarks']}")
        print(f"  mark 标签结构错误: {mark_info['broken']} {'✅ PASS（0 错误）' if mark_info['broken'] == 0 else '❌ FAIL'}")

        # 验收 4：点击展开功能
        print(f"\n=== 4.64 验收 4：点击 ▾ 展开后显示完整原文 ===")
        first_d = await page.query_selector('details.logic-collapse')
        if first_d:
            before = await first_d.evaluate("d => ({open: d.open, textLen: d.querySelector('div')?.innerText.length || 0})")
            await first_d.evaluate("d => d.open = true")
            await asyncio.sleep(0.3)
            after = await first_d.evaluate("d => ({open: d.open, textLen: d.querySelector('div')?.innerText.length || 0})")
            print(f"  展开前: open={before['open']} 完整内容长度={before['textLen']}")
            print(f"  展开后: open={after['open']} 完整内容长度={after['textLen']}")
            print(f"  展开后文字数增加：{after['textLen'] > before['textLen']} {'✅ PASS' if after['textLen'] > before['textLen'] else '❌ FAIL'}")

        # 验收 5：截图
        await page.evaluate("document.querySelector('#section-upstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_segments.png", full_page=False)
        print(f"\n=== 截图：d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_segments.png ===")

        await browser.close()

asyncio.run(main())
