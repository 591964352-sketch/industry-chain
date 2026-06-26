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

        # 1. Tab1 默认激活 + TOP10 按综合分降序
        print("=" * 70)
        print("=== 4.66 验收 1：Tab1 默认激活 + TOP10 降序 ===")
        s1 = await page.evaluate("""() => {
            const tab1 = document.getElementById('rankTab1');
            const tab1Btn = document.getElementById('rankTab1Btn');
            const tab2 = document.getElementById('rankTab2');
            const tab3 = document.getElementById('rankTab3');
            const rows = tab1?.querySelectorAll('tbody tr') || [];
            const scores = Array.from(rows).map(tr => {
                const tds = tr.querySelectorAll('td');
                return parseInt(tds[4]?.innerText.trim() || '0');
            });
            const codes = Array.from(rows).map(tr => tr.querySelectorAll('td')[2]?.innerText.trim());
            const names = Array.from(rows).map(tr => tr.querySelectorAll('td')[1]?.innerText.trim());
            const descOrdered = scores.every((s, i) => i === 0 || s <= scores[i-1]);
            return {
                tab1Display: tab1?.style.display !== 'none',
                tab2Display: tab2?.style.display !== 'none',
                tab3Display: tab3?.style.display !== 'none',
                tab1BtnActive: tab1Btn?.classList.contains('active'),
                rowCount: rows.length,
                scores, codes, names,
                descOrdered
            };
        }""")
        print(f"  Tab1 显示: {s1['tab1Display']} {'✅' if s1['tab1Display'] else '❌'}")
        print(f"  Tab2 隐藏: {not s1['tab2Display']} {'✅' if not s1['tab2Display'] else '❌'}")
        print(f"  Tab3 隐藏: {not s1['tab3Display']} {'✅' if not s1['tab3Display'] else '❌'}")
        print(f"  Tab1 按钮激活: {s1['tab1BtnActive']} {'✅' if s1['tab1BtnActive'] else '❌'}")
        print(f"  TOP10 行数: {s1['rowCount']} {'✅' if s1['rowCount'] == 10 else '❌'}")
        print(f"  分数降序: {s1['descOrdered']} {'✅' if s1['descOrdered'] else '❌'}")

        # 2. 沪电股份 002463 / 生益电子 688183 在 TOP1/TOP2
        print(f"\n=== 4.66 验收 2：沪电股份 002463 / 生益电子 688183 TOP1/TOP2 ===")
        print(f"  [1] {s1['names'][0]} {s1['codes'][0]} {s1['scores'][0]}分")
        print(f"  [2] {s1['names'][1]} {s1['codes'][1]} {s1['scores'][1]}分")
        print(f"  沪电股份在 TOP1 或 TOP2: {'✅' if (s1['codes'][0]=='002463' or s1['codes'][1]=='002463') else '❌'}")
        print(f"  生益电子在 TOP1 或 TOP2: {'✅' if (s1['codes'][0]=='688183' or s1['codes'][1]=='688183') else '❌'}")

        # 3. 切到 Tab2 + 验证 7 个 segment 龙头
        print(f"\n=== 4.66 验收 3：Tab2 段位龙头 ===")
        await page.click('#rankTab2Btn')
        await asyncio.sleep(0.5)
        s3 = await page.evaluate("""() => {
            const tab2 = document.getElementById('rankTab2');
            const rows = tab2?.querySelectorAll('tbody tr') || [];
            return {
                tab2Display: tab2?.style.display !== 'none',
                tab1Display: document.getElementById('rankTab1')?.style.display !== 'none',
                rowCount: rows.length,
                segNames: Array.from(rows).map(tr => tr.querySelectorAll('td')[0]?.innerText.trim().slice(0, 20))
            };
        }""")
        print(f"  Tab2 显示: {s3['tab2Display']} {'✅' if s3['tab2Display'] else '❌'}")
        print(f"  Tab1 已隐藏: {not s3['tab1Display']} {'✅' if not s3['tab1Display'] else '❌'}")
        print(f"  龙头行数: {s3['rowCount']}（应为 7 = 6 上游 + 1 中游）{'✅' if s3['rowCount'] == 7 else '❌ ' + str(s3['rowCount'])}")
        for i, n in enumerate(s3['segNames']):
            print(f"    [{i+1}] {n}")

        # 4. 切到 Tab3 + 验证 risk 列表
        print(f"\n=== 4.66 验收 4：Tab3 风险预警 ===")
        await page.click('#rankTab3Btn')
        await asyncio.sleep(0.5)
        s4 = await page.evaluate("""() => {
            const tab3 = document.getElementById('rankTab3');
            const rows = tab3?.querySelectorAll('tbody tr') || [];
            return {
                tab3Display: tab3?.style.display !== 'none',
                rowCount: rows.length,
                codes: Array.from(rows).map(tr => tr.querySelectorAll('td')[2]?.innerText.trim()),
                weakDims: Array.from(rows).map(tr => tr.querySelectorAll('td')[6]?.innerText.trim())
            };
        }""")
        print(f"  Tab3 显示: {s4['tab3Display']} {'✅' if s4['tab3Display'] else '❌'}")
        print(f"  risk 行数: {s4['rowCount']}（PCB 应为 5）{'✅' if s4['rowCount'] == 5 else '❌ ' + str(s4['rowCount'])}")
        for i, (c, w) in enumerate(zip(s4['codes'], s4['weakDims'])):
            print(f"    [{i+1}] {c} 短板={w}")

        # 5. 截图：切回 Tab1 后截 ranking 卡片
        print(f"\n=== 4.66 验收 5：截图 desktop_ranking.png ===")
        await page.click('#rankTab1Btn')
        await asyncio.sleep(0.5)
        await page.evaluate("document.querySelector('#rankTab1').scrollIntoView({behavior:'instant', block:'center'})")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_66_ranking.png", full_page=False)
        print(f"  截图: 4_66_ranking.png")

        # 6. 无 dims6 的 chainId 静默降级
        print(f"\n=== 4.66 验收 6：无 dims6 chainId 静默降级 ===")
        s6 = await page.evaluate("""() => {
            // 调用函数检查 hbm 链（应该有 dims6 但模拟无数据的链）
            try {
                // 直接测试 renderStockRankingPanel 对不存在的链
                const result1 = renderStockRankingPanel('nonexistent');
                return {nonExist: result1 === ''};
            } catch (e) { return {error: e.message}; }
        }""")
        print(f"  renderStockRankingPanel('nonexistent') 返回 '': {s6.get('nonExist', False)} {'✅' if s6.get('nonExist') else '❌'}")

        await browser.close()

asyncio.run(main())
