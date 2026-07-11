"""scripts/_inspect_chains2.py · 用户指定 console.log 输出"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        logs = []
        page.on('console', lambda m: logs.append(f'[{m.type}] {m.text}'))
        page.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 用户最新指定的 console.log
        await page.evaluate("""() => {
            console.log({
              prosperity: !!(window.CHAINS?.pcb?.prosperity?.dims?.length === 6),
              dims_length: window.CHAINS?.pcb?.prosperity?.dims?.length,
              cyclePosition: !!(window.CHAINS?.pcb?.cyclePosition?.stage),
              signalMeta: !!(window.CHAINS?.pcb?.signalMeta?.stats)
            });
        }""")

        print('=== 用户最新 console.log 输出 ===')
        for line in logs:
            if 'prosperity' in line or 'cyclePosition' in line or 'signalMeta' in line or 'dims_length' in line:
                print(line)

        await browser.close()

asyncio.run(main())