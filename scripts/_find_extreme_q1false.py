import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        await page.goto('http://localhost:8765/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(3)

        # 找 barrier=极高 但 fourQuestions.q1=false 的 stock
        result = await page.evaluate("""() => {
          const pcb = window.CHAINS.pcb;
          const segStocks = [];
          pcb.segments.forEach(seg => {
            if (seg.stocks) seg.stocks.forEach(s => segStocks.push({ ...s, segName: seg.name }));
          });
          const midStocks = [];
          if (pcb.midstream && pcb.midstream.stocks) {
            pcb.midstream.stocks.forEach(s => midStocks.push({ ...s, segName: pcb.midstream.name || 'midstream' }));
          }
          const allStocksMap = new Map();
          [...segStocks, ...midStocks].forEach(s => {
            if (!allStocksMap.has(s.code)) allStocksMap.set(s.code, s);
          });
          const fqMap = new Map();
          if (pcb.fourQuestions && pcb.fourQuestions.segments) {
            pcb.fourQuestions.segments.forEach(seg => {
              if (seg.stocks) seg.stocks.forEach(s => fqMap.set(s.code, { ...s, segName: seg.name }));
            });
          }
          const extremeQ1False = [];
          [...allStocksMap.values()].forEach(s => {
            if (s.barrier === '极高') {
              const fq = fqMap.get(s.code);
              if (fq && fq.q1 === false) {
                extremeQ1False.push({
                  code: s.code,
                  name: s.name,
                  segName: s.segName,
                  q1note: fq.q1note,
                  fqSegName: fq.segName,
                  existingNote: fq.note || null
                });
              }
            }
          });
          return extremeQ1False;
        }""")
        print('=== barrier=极高 但 fourQuestions.q1=false 的 stock ===')
        for i, s in enumerate(result, 1):
            print(f'\n{i}. [{s["code"]} {s["name"]}]')
            print(f'   segment: {s["segName"]}')
            print(f'   fourQ segName: {s["fqSegName"]}')
            print(f'   q1note: {s["q1note"]}')
            if s["existingNote"]:
                print(f'   existing note: {s["existingNote"]}')

        await browser.close()

asyncio.run(main())