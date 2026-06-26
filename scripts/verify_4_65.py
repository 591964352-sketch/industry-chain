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

        # 展开所有 segments
        await page.evaluate("""() => {
            document.querySelectorAll('.segment-card.collapsible').forEach(c => c.classList.remove('collapsed'));
        }""")
        await asyncio.sleep(1)

        # ===== 1. 面板收起状态（初始）=====
        print("=" * 70)
        print("=== 4.65 验收 1：面板收起状态 ===")
        s1 = await page.evaluate("""() => {
            const main = document.querySelector('.main-area');
            const panel = document.getElementById('changelog-panel');
            const cs = getComputedStyle(main);
            return {
                panelCollapsed: panel?.classList.contains('collapsed'),
                mainPaddingRight: cs.paddingRight,
                mainHasChangelogOpen: main?.classList.contains('changelog-open')
            };
        }""")
        print(f"  panel.collapsed = {s1['panelCollapsed']}")
        print(f"  .main-area padding-right = {s1['mainPaddingRight']}")
        print(f"  .main-area.changelog-open = {s1['mainHasChangelogOpen']}")
        print(f"  验收：padding-right 应为 20px {'✅' if s1['mainPaddingRight'] == '20px' else '❌'}")

        # 截面板收起图
        await page.evaluate("document.querySelector('#section-upstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_65_panel_collapsed.png", full_page=False)
        print(f"\n  截图：4_65_panel_collapsed.png")

        # ===== 2. 点击徽章展开面板 =====
        print("\n=== 4.65 验收 2：面板展开状态 ===")
        # 点击数据变更徽章
        await page.evaluate("toggleChangelog()")
        await asyncio.sleep(1)  # 等 transition 0.3s

        s2 = await page.evaluate("""() => {
            const main = document.querySelector('.main-area');
            const panel = document.getElementById('changelog-panel');
            const cs = getComputedStyle(main);
            return {
                panelCollapsed: panel?.classList.contains('collapsed'),
                mainPaddingRight: cs.paddingRight,
                mainHasChangelogOpen: main?.classList.contains('changelog-open'),
                panelRight: panel ? Math.round(panel.getBoundingClientRect().right) : null,
                mainRight: main ? Math.round(main.getBoundingClientRect().right) : null
            };
        }""")
        print(f"  panel.collapsed = {s2['panelCollapsed']}")
        print(f"  .main-area padding-right = {s2['mainPaddingRight']}")
        print(f"  .main-area.changelog-open = {s2['mainHasChangelogOpen']}")
        print(f"  panel.right = {s2['panelRight']}px")
        print(f"  main.right = {s2['mainRight']}px")
        if s2['panelRight'] is not None and s2['mainRight'] is not None:
            overlap = s2['mainRight'] - s2['panelRight']
            print(f"  重叠距离 = {overlap}px {'✅ 无重叠' if overlap <= 0 else '❌ 重叠 ' + str(overlap) + 'px'}")
        print(f"  验收：padding-right 应为 220px {'✅' if s2['mainPaddingRight'] == '220px' else '❌'}")

        # 截面板展开图（验证表格不被遮挡）
        await page.evaluate("document.querySelector('#section-upstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_65_panel_expanded.png", full_page=False)
        print(f"\n  截图：4_65_panel_expanded.png")

        # ===== 3. 中游精简视图标注验证 =====
        print("\n=== 4.65 验收 3：中游精简视图标注 ===")
        mid = await page.evaluate("""() => {
            const segCards = Array.from(document.querySelectorAll('.segment-card'));
            const midSeg = segCards.find(c => c.querySelector('.seg-title')?.innerText.includes('PCB 制造'));
            if (!midSeg) return {err: 'no midstream segment'};
            const title = midSeg.querySelector('.seg-title');
            return {
                titleText: title?.innerText?.split(String.fromCharCode(10))[0]?.slice(0, 60),
                hasNote: title?.innerText?.includes('精简视图') || false,
                hasArrow: title?.innerText?.includes('⬇') || false
            };
        }""")
        print(f"  中游标题：{mid.get('titleText', '(未找到)')}")
        print(f"  含「精简视图」标注：{mid.get('hasNote', False)} {'✅' if mid.get('hasNote') else '❌'}")
        print(f"  含「⬇」符号：{mid.get('hasArrow', False)} {'✅' if mid.get('hasArrow') else '❌'}")

        await browser.close()

asyncio.run(main())
