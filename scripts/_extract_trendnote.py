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

        result = await page.evaluate("""() => {
          const pcb = window.CHAINS.pcb;
          const segStocks = [];
          pcb.segments.forEach((seg, segIdx) => {
            if (seg.stocks) seg.stocks.forEach(s => segStocks.push({ ...s, segIdx, segName: seg.name }));
          });
          const midStocks = [];
          if (pcb.midstream && pcb.midstream.stocks) {
            pcb.midstream.stocks.forEach(s => midStocks.push({ ...s, segIdx: 'mid', segName: pcb.midstream.name || 'midstream' }));
          }
          const allStocksMap = new Map();
          [...segStocks, ...midStocks].forEach(s => {
            if (!allStocksMap.has(s.code)) allStocksMap.set(s.code, s);
          });
          const uniqueStocks = [...allStocksMap.values()];

          // 用户指定 6 只
          const targetCodes = ['600183', '603256', '600176', '002436', '001389'];
          const userTargets = [];
          targetCodes.forEach(code => {
            const s = allStocksMap.get(code);
            if (s) {
              userTargets.push({
                code: s.code,
                name: s.name,
                barrier: s.barrier,
                tier: s.tier,
                trend: s.trend,
                segName: s.segName,
                trendNote: s.trendNote || '(空)',
                trendNoteLen: (s.trendNote || '').length
              });
            } else {
              userTargets.push({ code, error: 'pcb.js 中不存在' });
            }
          });

          // trend=up 但 trendNote 缺正面关键词的所有 stock
          const positiveKeywords = ['+', '增长', '上升', '量产', '认证', '第一', '龙头', '首', '突破', '独家', '全球第一', '全球第二'];
          const missing = [];
          uniqueStocks.forEach(s => {
            if (s.trend === 'up') {
              const note = s.trendNote || '';
              const hasPositive = positiveKeywords.some(kw => note.includes(kw));
              if (!hasPositive) {
                missing.push({
                  code: s.code,
                  name: s.name,
                  barrier: s.barrier,
                  segName: s.segName,
                  trend: s.trend,
                  trendNote: note,
                  trendNoteLen: note.length
                });
              }
            }
          });

          return { userTargets, missing };
        }""")

        print('=' * 70)
        print('  用户指定 5 只 stock 完整 trendNote')
        print('=' * 70)
        for t in result['userTargets']:
            print(f'\n【{t.get("code","?")} {t.get("name","?")}】')
            if 'error' in t:
                print(f'  ✗ {t["error"]}')
                continue
            print(f'  segment: {t.get("segName","?")}')
            print(f'  barrier: {t.get("barrier","?")} / tier: {t.get("tier","?")} / trend: {t.get("trend","?")}')
            print(f'  trendNote 长度: {t.get("trendNoteLen",0)} 字符')
            print(f'  trendNote 全文: 「{t.get("trendNote","")}」')

        print()
        print('=' * 70)
        print(f'  全部 trend=up 但 trendNote 缺正面关键词的 stock（{len(result["missing"])} 只）')
        print('=' * 70)
        for i, m in enumerate(result['missing'], 1):
            print(f'\n{i}. 【{m["code"]} {m["name"]}】  segment: {m["segName"]} / barrier: {m["barrier"]}')
            print(f'   trendNote ({m["trendNoteLen"]} 字符): 「{m["trendNote"]}」')

        await browser.close()

asyncio.run(main())