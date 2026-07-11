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

        # 1. 检查 PCB_AUTO 数据
        auto_info = await page.evaluate("""() => {
          const auto = window.PCB_AUTO;
          if (!auto) return { exists: false };
          const meta = auto._meta || {};
          const codes = Object.keys(auto).filter(k => k !== '_meta').slice(0, 5);
          const sample = codes.length > 0 ? auto[codes[0]] : null;
          const sampleKeys = sample ? Object.keys(sample).filter(k => k !== 'volume_history' && k !== 'pe_history') : [];
          return {
            exists: true,
            meta: meta,
            totalCodes: codes.length,
            sampleCode: codes[0],
            sampleFields: sampleKeys
          };
        }""")
        print('=== PCB_AUTO 检查 ===')
        print('exists:', auto_info.get('exists'))
        if auto_info.get('exists'):
            m = auto_info['meta']
            print('  _meta.asOf:', m.get('asOf'))
            print('  _meta.baostockVersion:', m.get('baostockVersion'))
            print('  _meta.akshareVersion:', m.get('akshareVersion'))
            print('  _meta.sourceFlag:', m.get('sourceFlag'))
            print('  _meta.window:', m.get('window'))
            print('  _meta.stats:', m.get('stats'))
            print('  totalCodes:', auto_info['totalCodes'])
            print('  sampleCode:', auto_info['sampleCode'])
            print('  sampleFields:', auto_info['sampleFields'])

        # 2. 002463 字段
        hudian = await page.evaluate("""() => {
          const auto = window.PCB_AUTO;
          if (!auto || !auto['002463']) return null;
          const a = auto['002463'];
          const fields = {};
          Object.keys(a).forEach(k => {
            if (k === 'volume_history' || k === 'pe_history') {
              fields[k] = '(array len=' + (a[k] ? a[k].length : 0) + ')';
            } else if (typeof a[k] === 'object') {
              fields[k] = JSON.stringify(a[k]);
            } else {
              fields[k] = a[k];
            }
          });
          return fields;
        }""")
        print('\n=== 002463 沪电股份 PCB_AUTO 字段 ===')
        print(hudian)

        # 3. 002463 在 pcb.js 中是否有写死的 pe_ttm 等字段
        hudian_pcbjs = await page.evaluate("""() => {
          const segStocks = [];
          window.CHAINS.pcb.segments.forEach((seg, segIdx) => {
            if (seg.stocks) seg.stocks.forEach(s => segStocks.push({ ...s, segIdx, segName: seg.name }));
          });
          const midStocks = [];
          if (window.CHAINS.pcb.midstream && window.CHAINS.pcb.midstream.stocks) {
            window.CHAINS.pcb.midstream.stocks.forEach(s => midStocks.push({ ...s, segIdx: 'mid', segName: window.CHAINS.pcb.midstream.name }));
          }
          const allStocksMap = new Map();
          [...segStocks, ...midStocks].forEach(s => {
            if (!allStocksMap.has(s.code)) allStocksMap.set(s.code, s);
          });
          const s = allStocksMap.get('002463');
          if (!s) return null;
          return {
            name: s.name,
            fields: Object.keys(s),
            pe_ttm: s.pe_ttm,
            pePercentile: s.pePercentile,
            fromHigh: s.fromHigh,
            closeLatest: s.closeLatest,
            volRatio5d: s.volRatio5d,
            source: s.src || s.source
          };
        }""")
        print('\n=== 002463 在 pcb.js 中的字段 ===')
        print(hudian_pcbjs)

        # 4. 检查是否有代码从 PCB_AUTO 注入到 CHAINS.pcb.segments
        injection_check = await page.evaluate("""() => {
          // 在 index.html 里搜 PCB_AUTO 引用模式
          const scripts = Array.from(document.querySelectorAll('script'));
          const allScriptText = scripts.map(s => s.textContent).join('\\n');
          const hasAutoInject = allScriptText.includes('PCB_AUTO');
          // 看 pcb.segments 内是否有 code 002463 且有非写死字段
          return {
            hasAutoInject: hasAutoInject,
            scriptLen: allScriptText.length
          };
        }""")
        print('\n=== index.html PCB_AUTO 注入检查 ===')
        print(injection_check)

        await browser.close()

asyncio.run(main())