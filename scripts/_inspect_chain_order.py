"""scripts/_inspect_chain_order.py · 查询 chain-content 内 section/card 顺序"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 1500})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)
        order = await page.evaluate("""() => {
          const container = document.getElementById('chain-content');
          const blocks = container.querySelectorAll('.section, .card, [id^="section-"]');
          const out = [];
          blocks.forEach((el, i) => {
            const id = el.id || '';
            const title = el.querySelector('.section-title, .card-header, h1, h2, h3')?.textContent?.trim().slice(0, 40) || '';
            const tag = el.tagName;
            out.push(`${i+1}. [${tag}] id="${id}" · "${title}"`);
          });
          return out;
        }""")
        print('=== chain-content 顺序 ===')
        for line in order:
            print(line)
        await browser.close()

asyncio.run(main())