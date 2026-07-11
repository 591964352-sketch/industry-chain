"""scripts/_check_signalc.py · 检查 signalCMeta stats 实际口径"""
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

        # 执行用户的 console 命令
        out1 = await page.evaluate("() => { return JSON.stringify(window.CHAINS?.pcb?.signalCMeta?.stats); }")
        print('signalCMeta stats:', out1)

        out2 = await page.evaluate("""() => {
          const stats = window.CHAINS?.pcb?.signalCMeta?.stats;
          if (!stats) return null;
          const triggered_total = stats.triggered_total || 0;
          const excluded = Object.values(stats.excluded || {}).reduce((a,b)=>a+b, 0);
          return { triggered_total, excluded, sum: triggered_total + excluded, excluded_keys: Object.keys(stats.excluded || {}), excluded_values: stats.excluded };
        }""")
        print('scanned total breakdown:', out2)

        # 也检查 triggeredList 长度
        out3 = await page.evaluate("""() => {
          const stats = window.CHAINS?.pcb?.signalCMeta?.stats;
          const tl = window.CHAINS?.pcb?.signalCMeta?.stats?.triggeredList;
          return {
            triggeredList_length: Array.isArray(tl) ? tl.length : 'not array',
            reduce_count: stats?.reduce_count,
            exit_count: stats?.exit_count
          };
        }""")
        print('triggeredList info:', out3)
        await browser.close()

asyncio.run(main())