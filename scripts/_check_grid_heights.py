"""scripts/_check_grid_heights.py · 检查 overview-grid 实际高度"""
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

        heights = await page.evaluate("""() => {
          const grid = document.querySelector('.overview-grid');
          if (!grid) return null;
          const items = Array.from(grid.querySelectorAll('.overview-item'));
          return items.map((it, i) => {
            const r = it.getBoundingClientRect();
            return { idx: i+1, w: Math.round(r.width), h: Math.round(r.height), label: it.querySelector('.label')?.textContent.trim() || '' };
          });
        }""")

        print('=== overview-grid 实际高度（验证 align-items:stretch）===')
        if heights:
            for it in heights:
                print(f'  {it["idx"]}. w={it["w"]} h={it["h"]} · label="{it["label"]}"')
            print()
            # 按高度分组检查每行 4 个是否一致
            print('--- 按行分组 (4列) ---')
            for r in range(0, len(heights), 4):
                row = heights[r:r+4]
                hs = [it["h"] for it in row]
                print(f'  行 {r//4 + 1}: heights={hs} (max-min={max(hs)-min(hs)})')
        await browser.close()

asyncio.run(main())