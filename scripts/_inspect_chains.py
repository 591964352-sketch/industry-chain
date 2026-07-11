"""scripts/_inspect_chains.py · 控制台查询 CHAINS.pcb 关键字段"""
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

        # 执行用户指定的 4 行 console.log
        await page.evaluate("""() => {
            console.log('prosperity:', !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.prosperity));
            console.log('cyclePosition:', !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.cyclePosition));
            console.log('signalMeta:', !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.signalMeta));
            console.log('dims length:', window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.prosperity && window.CHAINS.pcb.prosperity.dims && window.CHAINS.pcb.prosperity.dims.length);
        }""")

        print('=== 浏览器控制台完整输出 ===')
        for line in logs:
            print(line)

        await browser.close()

asyncio.run(main())