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

        segs = await page.evaluate("""() => {
            const cards = Array.from(document.querySelectorAll('.segment-card'));
            return cards.map(c => {
                const title = c.querySelector('.seg-title');
                const txt = title ? title.innerText : '';
                return {
                    text: txt.replace(/\\n/g, ' ').slice(0, 80),
                    collapsed: c.classList.contains('collapsed'),
                    hasLock: txt.indexOf('🔒') !== -1,
                    hasStockCount: /\\d+ 只 stock/.test(txt)
                };
            });
        }""")

        print("=== segment header 验证 ===")
        for i, s in enumerate(segs):
            print("[%d] collapsed=%s  🔒=%s  stock=%s  text='%s'" % (i, s["collapsed"], s["hasLock"], s["hasStockCount"], s["text"]))

        await browser.close()

asyncio.run(main())
