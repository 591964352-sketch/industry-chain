"""scripts/_verify_4_74.py · 豆包返回 300476+002463 三重验证 + 对比表整理"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 1. 三重验证
        r = await page.evaluate("""() => {
            const m = window.PCB_MANUAL && window.PCB_MANUAL.stocks;
            const d = window.CHAINS && window.CHAINS.pcb;
            const codes = ['300476', '002463', '002916', '688183'];
            const out = {};
            for (const code of codes) {
                const s = m && m[code];
                const positions = [];
                if (s && d) {
                    if (d.midstream && d.midstream.stocks) d.midstream.stocks.forEach((ss, i) => { if (ss.code === code) positions.push({via: 'midstream.stocks['+i+']', barrier: ss.barrier}); });
                    (d.segments || []).forEach((seg, i) => {
                        (seg.stocks || []).forEach(ss => { if (ss.code === code) positions.push({via: 'seg['+i+'].stocks', barrier: ss.barrier}); });
                        if (seg.companies) seg.companies.forEach(ss => { if (ss.code === code) positions.push({via: 'seg['+i+'].companies', barrier: ss.barrier}); });
                    });
                    if (d.chokePoints) d.chokePoints.forEach((c, i) => { if (c.code === code) positions.push({via: 'chokePoints['+i+']', rank: c.rank, barrier: c.barrier}); });
                }
                out[code] = {name: s ? s.name : 'NOT_FOUND', inManual: !!s, positions: positions};
            }
            return out;
        }""")

        print('=== 三重验证 · stock code/段位/name ===')
        for code in ['300476', '002463', '002916', '688183']:
            s = r[code]
            label = '✅' if s['inManual'] else '❌'
            print(f'  {code} {s["name"]}: in PCB_MANUAL={s["inManual"]} {label}')
            for p in s['positions']:
                print(f'    {p["via"]}: barrier={p.get("barrier","None")}')

        # 2. 关键事实交叉验证
        print()
        print('=== 关键事实交叉验证（豆包 vs pcb.js）===')
        cross = await page.evaluate("""() => {
            const m = window.PCB_MANUAL && window.PCB_MANUAL.stocks;
            const out = {};
            // 300476 关键事实
            const s1 = m && m['300476'];
            if (s1) {
                out['300476'] = {
                    name: s1.name,
                    rank: s1.rank,
                    position: s1.position,
                    tier: s1.tier,
                    barrier: s1.barrier,
                    trend: s1.trend,
                    trendNote: s1.trendNote
                };
            }
            const s2 = m && m['002463'];
            if (s2) {
                out['002463'] = {
                    name: s2.name,
                    rank: s2.rank,
                    position: s2.position,
                    tier: s2.tier,
                    barrier: s2.barrier,
                    trend: s2.trend,
                    trendNote: s2.trendNote
                };
            }
            return out;
        }""")
        for code in ['300476', '002463']:
            s = cross.get(code, {})
            print(f'  {code} {s.get("name")} (rank={s.get("rank")}, barrier={s.get("barrier")}):')
            print(f'    position: {s.get("position","")[:200]}...')
            print(f'    trendNote: {s.get("trendNote","")}')

        await browser.close()

asyncio.run(main())