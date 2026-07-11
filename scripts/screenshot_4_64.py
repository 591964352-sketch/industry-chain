import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 1100})
        page = await ctx.new_page()
        await page.goto("file:///D:/乌龟/产业链全景/index.html#pcb", wait_until="load", timeout=30000)
        await asyncio.sleep(3)
        # 展开所有 segments
        await page.evaluate("""() => {
            document.querySelectorAll('.segment-card.collapsible').forEach(c => c.classList.remove('collapsed'));
        }""")
        await asyncio.sleep(1)
        # 滚动到中游 PCB 制造
        await page.evaluate("document.querySelector('#section-midstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_midstream.png", full_page=False)
        # 再滚动到上游
        await page.evaluate("document.querySelector('#section-upstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_upstream.png", full_page=False)
        # 展开第一个 details 看效果
        first_d = await page.query_selector('details.logic-collapse')
        if first_d:
            await first_d.evaluate("d => d.open = true")
            await asyncio.sleep(0.5)
            await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/4_64_expanded.png", full_page=False)
        print("OK")
        await browser.close()

asyncio.run(main())
