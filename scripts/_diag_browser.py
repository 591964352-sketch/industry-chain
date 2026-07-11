import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
        page.on('console', lambda m: errors.append(f'console.{m.type}: {m.text}'))

        await page.goto('http://localhost:8765/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(3)

        result = await page.evaluate("""() => {
          const pcb = window.CHAINS && window.CHAINS.pcb;
          if (!pcb) return { error: 'CHAINS.pcb not found' };
          const dcm = pcb.demandChainMeta;
          if (!dcm) {
            return { dcmExists: false, pcbKeys: Object.keys(pcb) };
          }
          return {
            dcmExists: true,
            segmentsCount: dcm.segments ? dcm.segments.length : 0,
            segments: dcm.segments ? dcm.segments.map(s => ({ name: s.name, cagr: s.cagr, cagrRange: s.cagrRange })) : []
          };
        }""")
        print('=== demandChainMeta check (browser) ===')
        print(result)

        if errors:
            print('\n=== Browser errors ===')
            seen = set()
            for e in errors:
                if e in seen: continue
                seen.add(e)
                print(' ', e)
        else:
            print('\n[OK] No browser errors')

        await browser.close()

asyncio.run(main())