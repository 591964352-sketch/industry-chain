import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
        page.on('console', lambda m: errors.append(f'console.{m.type}: {m.text}') if m.type == 'error' else None)

        await page.goto('http://localhost:8765/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(3)

        # 综合深度检查
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

          // dims6
          let dims6Missing = 0, dims6Wrong = 0;
          uniqueStocks.forEach(s => {
            if (!s.dims6) dims6Missing++;
            else if (!Array.isArray(s.dims6) || s.dims6.length !== 6) dims6Wrong++;
          });

          // 字段完整性
          const required = ['code', 'name', 'barrier', 'tier', 'trend', 'trendNote'];
          const fieldCounts = {};
          required.forEach(f => fieldCounts[f] = 0);
          const missingFieldStocks = [];
          uniqueStocks.forEach(s => {
            required.forEach(f => {
              if (s[f] !== undefined && s[f] !== null && s[f] !== '') fieldCounts[f]++;
            });
            const missing = required.filter(f => !s[f]);
            if (missing.length) missingFieldStocks.push(`${s.code} ${s.name}: 缺 ${missing.join(',')}`);
          });

          // barrier 分布
          const barrierCounts = {};
          uniqueStocks.forEach(s => {
            const b = s.barrier || '(空)';
            barrierCounts[b] = (barrierCounts[b] || 0) + 1;
          });

          // fourQuestions 是对象
          const fqStocks = [];
          if (pcb.fourQuestions && pcb.fourQuestions.segments) {
            pcb.fourQuestions.segments.forEach(seg => {
              if (seg.stocks) seg.stocks.forEach(s => fqStocks.push(s));
            });
          }
          const fqMap = new Map();
          fqStocks.forEach(s => fqMap.set(s.code, s));

          // barrier=极高 stock 在 fourQ 中 q1 是否 true
          const extremeStocks = uniqueStocks.filter(s => s.barrier === '极高');
          const extremeLogic = {
            total: extremeStocks.length,
            q1True: 0, q1False: 0, noFQ: 0,
            samples: []
          };
          extremeStocks.forEach(s => {
            const fq = fqMap.get(s.code);
            if (!fq) {
              extremeLogic.noFQ++;
              if (extremeLogic.samples.length < 3) extremeLogic.samples.push({ code: s.code, name: s.name, fq: '无' });
            } else if (fq.q1 === true) {
              extremeLogic.q1True++;
            } else {
              extremeLogic.q1False++;
              if (extremeLogic.samples.length < 3) extremeLogic.samples.push({ code: s.code, name: s.name, q1: fq.q1 });
            }
          });

          // trend=up 的 trendNote 含正面关键词
          const positiveKeywords = ['+', '增长', '上升', '量产', '认证', '第一', '龙头', '首', '突破', '独家', '全球第一', '全球第二'];
          let trendUpCount = 0, trendUpPositive = 0, trendUpNegative = [];
          uniqueStocks.forEach(s => {
            if (s.trend === 'up') {
              trendUpCount++;
              const hasPositive = positiveKeywords.some(kw => (s.trendNote || '').includes(kw));
              if (hasPositive) trendUpPositive++;
              else trendUpNegative.push(s.code + ' ' + s.name);
            }
          });

          // demandChainMeta CAGR
          const cagr = pcb.demandChainMeta && pcb.demandChainMeta.segments ? pcb.demandChainMeta.segments.map(s => ({ name: s.name, cagr: s.cagr })) : [];

          // chainStory keyStocks 完整性
          const cs = pcb.plainIntro && pcb.plainIntro.chainStory;
          let csMissing = [];
          if (cs) {
            cs.forEach(step => {
              (step.keyStocks || []).forEach(code => {
                if (!allStocksMap.has(code)) csMissing.push(`Step ${step.step}: ${code}`);
              });
            });
          }

          return {
            segmentsStocks: segStocks.length,
            midstreamStocks: midStocks.length,
            uniqueStocks: uniqueStocks.length,
            overviewLen: pcb.overview ? pcb.overview.length : 0,
            dims6Missing, dims6Wrong,
            fieldCounts, missingFieldStocks,
            barrierCounts,
            fqStocksCount: fqStocks.length,
            extremeLogic,
            trendUpCount, trendUpPositive, trendUpNegative: trendUpNegative.slice(0, 10),
            cagr,
            csLen: cs ? cs.length : 0,
            csMissing
          };
        }""")
        print('==================================================')
        print('PCB 链路最终深度检查（浏览器加载）')
        print('==================================================\n')

        print('## 检查 1: 数据一致性')
        print(f'  segments stock 总数: {result["segmentsStocks"]}')
        print(f'  midstream stock 总数: {result["midstreamStocks"]}')
        print(f'  去重 unique stock 总数: {result["uniqueStocks"]}')
        print(f'  index.html 显示 36 只 → {"✓ 一致" if result["uniqueStocks"] == 36 else "✗ 不一致"}')
        print(f'  dims6 缺失: {result["dims6Missing"]}, 长度≠6: {result["dims6Wrong"]}')
        print(f'  overview 数组长度: {result["overviewLen"]} (期望 8)')
        print(f'  demandChainMeta CAGR: {result["cagr"]}')
        print(f'  chainStory 长度: {result["csLen"]} (期望 10)')
        print(f'  chainStory 缺 stock: {result["csMissing"] if result["csMissing"] else "✓ 无"}')
        print()

        print('## 检查 2: stock 字段完整性')
        for k, v in result['fieldCounts'].items():
            pct = v / result['uniqueStocks'] * 100
            print(f'  {k}: {v}/{result["uniqueStocks"]} = {pct:.1f}%')
        if result['missingFieldStocks']:
            print('  缺字段 stock:')
            for s in result['missingFieldStocks'][:10]:
                print(f'    {s}')
        else:
            print('  ✓ 所有 stock 字段完整')
        print()

        print('## 检查 3: barrier 分布')
        for b in ['极高', '高', '中', '低']:
            cnt = result['barrierCounts'].get(b, 0)
            print(f'  {b}: {cnt} 只')
        other = {k: v for k, v in result['barrierCounts'].items() if k not in ['极高', '高', '中', '低']}
        if other:
            print(f'  其他: {other}')
        print()

        print('## 检查 4: 逻辑一致性')
        print(f'  fourQuestions.segments 内 stock 总数: {result["fqStocksCount"]}')
        el = result['extremeLogic']
        print(f'  barrier=极高 stock 共 {el["total"]} 只:')
        print(f'    fourQuestions.q1=true: {el["q1True"]}')
        print(f'    fourQuestions.q1≠true: {el["q1False"]}')
        print(f'    fourQuestions 缺失: {el["noFQ"]}')
        if el['samples']:
            print(f'    示例: {el["samples"]}')
        print(f'  trend=up 共 {result["trendUpCount"]} 只, trendNote 含正面关键词: {result["trendUpPositive"]}')
        if result['trendUpNegative']:
            print(f'    缺正面关键词: {result["trendUpNegative"][:5]}')
        print()

        # 检查 5: 渲染函数（在浏览器里检查全局函数）
        funcCheck = await page.evaluate("""() => {
          return {
            findStock: typeof findStock,
            setDistFilter: typeof setDistFilter,
            toggleChangelog: typeof toggleChangelog
          };
        }""")
        print('## 检查 5: 渲染函数')
        for fn, t in funcCheck.items():
            mark = ' ✓' if t == 'function' else ' ✗'
            print(f'  {fn}: {t}{mark}')
        print()

        if errors:
            print('## 浏览器加载错误')
            seen = set()
            for e in errors:
                if e in seen: continue
                seen.add(e)
                print(f'  {e}')
        else:
            print('## 浏览器加载: ✓ 无错误')

        await browser.close()

asyncio.run(main())