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

        # 滚动到上游段位 section
        await page.evaluate("document.querySelector('#section-upstream').scrollIntoView({behavior:'instant'})")
        await asyncio.sleep(1)

        # 截图上游段位完整视图
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_154459/desktop_segments.png", full_page=False)
        print("desktop_segments.png saved")

        await browser.close()

asyncio.run(main())
