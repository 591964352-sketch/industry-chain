"""inspect distStocks 内部结构"""
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
        result = await page.evaluate("""() => {
          // 触发距离表展开
          const sum = Array.from(document.querySelectorAll('details summary')).find(s => s.innerText.includes('只距离'));
          if (sum) sum.click();
          return null;
        }""")
        await asyncio.sleep(0.5)
        result = await page.evaluate("""() => {
          const tbody = document.getElementById('dist-tbody');
          if (!tbody) return {found: false};
          const rows = Array.from(tbody.querySelectorAll('tr'));
          const first = rows[0];
          const barriers = rows.map(r => r.dataset.barrier);
          const counts = barriers.reduce((a,b)=>{a[b]=(a[b]||0)+1;return a;},{});
          // 手动检查 PCB_MANUAL
          const m = window.PCB_MANUAL && window.PCB_MANUAL.stocks ? window.PCB_MANUAL.stocks : {};
          const sample002463 = m['002463'];
          return {
            rowsCount: rows.length,
            firstTrHTML: first ? first.outerHTML.slice(0, 300) : null,
            barrierCounts: counts,
            sample002463Barrier: sample002463 ? sample002463.barrier : null,
            sample002463Code: sample002463 ? sample002463.code : null
          };
        }""")
        print(result)
        await browser.close()

asyncio.run(main())