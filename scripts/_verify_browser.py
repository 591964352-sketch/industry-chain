"""scripts/_verify_browser.py · 在浏览器中检查 signalMeta 是否真正存在"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        page.on('console', lambda m: print(f'  [console.{m.type}] {m.text}'))
        page.on('pageerror', lambda e: print(f'  [pageerror] {e}'))
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 检查 window.PCB_MANUAL / PCB_AUTO 是否注入
        result = await page.evaluate("""() => {
            return {
                PCB_MANUAL_exists: typeof window.PCB_MANUAL !== 'undefined',
                PCB_MANUAL_keys: window.PCB_MANUAL ? Object.keys(window.PCB_MANUAL) : null,
                PCB_MANUAL_stocks_count: (window.PCB_MANUAL && window.PCB_MANUAL.stocks) ? Object.keys(window.PCB_MANUAL.stocks).length : 0,
                PCB_AUTO_exists: typeof window.PCB_AUTO !== 'undefined',
                CHAINS_pcb_signalMeta: !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.signalMeta),
                CHAINS_pcb_signalCMeta: !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.signalCMeta),
                CHAINS_pcb_cyclePosition: !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.cyclePosition),
                CHAINS_pcb_prosperity: !!(window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.prosperity),
            };
        }""")
        print('=== 浏览器运行时数据状态 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        await browser.close()

asyncio.run(main())