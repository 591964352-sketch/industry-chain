"""scripts/_report_all_stocks.py · 输出 pcb.manual.js 全部 stock 完整评分数据（只读·不修改）"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 收集所有 stock + dims6 + 综合分 + segment
        r = await page.evaluate("""() => {
            const m = window.PCB_MANUAL && window.PCB_MANUAL.stocks;
            const d = window.CHAINS && window.CHAINS.pcb;
            const out = [];
            // 先收集所有 stock code（从 segments + midstream + chokePoints 三个来源）
            const allCodes = new Set();
            if (d) {
                (d.segments || []).forEach((seg, i) => {
                    (seg.stocks || []).forEach(ss => allCodes.add(ss.code));
                    if (seg.companies) seg.companies.forEach(ss => allCodes.add(ss.code));
                });
                if (d.midstream && d.midstream.stocks) d.midstream.stocks.forEach(ss => allCodes.add(ss.code));
            }
            // 对每个 code，从 PCB_MANUAL.stocks 取完整数据
            allCodes.forEach(code => {
                const s = m && m[code];
                if (!s) return;
                const dims = {};
                let durability = 0, visibility = 0, policy = 0, supply = 0, valuation = 0, barrier = 0;
                if (s.dims6) {
                    s.dims6.forEach(d => {
                        dims[d.key] = d.score;
                        if (d.key === 'durability') durability = d.score;
                        else if (d.key === 'visibility') visibility = d.score;
                        else if (d.key === 'policy') policy = d.score;
                        else if (d.key === 'supply') supply = d.score;
                        else if (d.key === 'valuation') valuation = d.score;
                        else if (d.key === 'barrier') barrier = d.score;
                    });
                }
                // 段位识别（从 segments 路径）
                let segmentPath = '';
                if (d) {
                    (d.segments || []).forEach((seg, i) => {
                        (seg.stocks || []).forEach(ss => {
                            if (ss.code === code) {
                                const cur = 'seg[' + i + '] ' + seg.name;
                                if (!segmentPath.includes(cur)) segmentPath = segmentPath ? segmentPath + ' / ' + cur : cur;
                            }
                        });
                        if (seg.companies) seg.companies.forEach(ss => {
                            if (ss.code === code) {
                                const cur = 'seg[' + i + '].companies ' + seg.name;
                                if (!segmentPath.includes(cur)) segmentPath = segmentPath ? segmentPath + ' / ' + cur : cur;
                            }
                        });
                    });
                    if (d.midstream && d.midstream.stocks) d.midstream.stocks.forEach((ss, i) => {
                        if (ss.code === code) {
                            segmentPath = segmentPath ? segmentPath + ' / midstream.stocks[' + i + ']' : 'midstream.stocks[' + i + ']';
                        }
                    });
                }
                // 计算综合分
                const f = (typeof computeStockFit === 'function' && s.dims6) ? computeStockFit(s.dims6) : null;
                out.push({
                    code: code,
                    name: s.name,
                    rank: s.rank,
                    segment: segmentPath || 'N/A',
                    barrier: s.barrier || '中',
                    durability: durability,
                    visibility: visibility,
                    policy: policy,
                    supply: supply,
                    valuation: valuation,
                    barrier_score: barrier,
                    fit_score: f ? f.score : null,
                    fit_tier: f ? f.tier : null
                });
            });
            return out;
        }""")

        # 按综合分降序
        r.sort(key=lambda x: -(x['fit_score'] or 0))

        print('=' * 130)
        print('PCB 全部 stock 完整评分数据（按综合分降序）')
        print('=' * 130)
        print(f'{"#":<3} {"代码":<8} {"简称":<10} {"barrier":<6} {"持续":<4} {"兑现":<4} {"政策":<4} {"供需":<4} {"估值":<4} {"壁垒":<4} {"综合分":<6} {"档位":<8} {"段位"}')
        print('-' * 130)
        for i, s in enumerate(r, 1):
            print(f'{i:<3} {s["code"]:<8} {s["name"]:<10} {s["barrier"]:<6} {s["durability"]:<4} {s["visibility"]:<4} {s["policy"]:<4} {s["supply"]:<4} {s["valuation"]:<4} {s["barrier_score"]:<4} {s["fit_score"]:<6} {s["fit_tier"] or "":<8} {s["segment"][:80]}')

        # ===== 4 个统计维度 =====

        # 维度 1: 上游材料 segment（覆铜板/电子树脂/玻纤布/铜箔）
        print()
        print('=' * 130)
        print('维度 1: 上游材料 segment（覆铜板/电子树脂/玻纤布/铜箔）')
        print('=' * 130)
        upstream_keywords = ['覆铜板', 'CCL', '电子树脂', '树脂', '玻纤布', '铜箔', 'HVLP']
        upstream = [s for s in r if any(kw in s['segment'] for kw in upstream_keywords)]
        upstream.sort(key=lambda x: -(x['fit_score'] or 0))
        print(f'{"代码":<8} {"简称":<10} {"barrier":<6} {"综合分":<6} {"档位":<8} {"段位"}')
        print('-' * 130)
        for s in upstream:
            print(f'{s["code"]:<8} {s["name"]:<10} {s["barrier"]:<6} {s["fit_score"]:<6} {s["fit_tier"] or "":<8} {s["segment"][:100]}')

        # 维度 2: 中游 PCB 制造
        print()
        print('=' * 130)
        print('维度 2: 中游 PCB 制造')
        print('=' * 130)
        midstream = [s for s in r if 'midstream' in s['segment']]
        midstream.sort(key=lambda x: -(x['fit_score'] or 0))
        print(f'{"代码":<8} {"简称":<10} {"barrier":<6} {"综合分":<6} {"档位":<8} {"段位"}')
        print('-' * 130)
        for s in midstream:
            print(f'{s["code"]:<8} {s["name"]:<10} {s["barrier"]:<6} {s["fit_score"]:<6} {s["fit_tier"] or "":<8} {s["segment"][:100]}')

        # 维度 3: barrier='极高' stock
        print()
        print('=' * 130)
        print('维度 3: barrier=极高 的 stock')
        print('=' * 130)
        extreme = [s for s in r if s['barrier'] == '极高']
        extreme.sort(key=lambda x: -(x['fit_score'] or 0))
        print(f'{"代码":<8} {"简称":<10} {"综合分":<6} {"档位":<8} {"壁垒分":<6} {"段位"}')
        print('-' * 130)
        for s in extreme:
            print(f'{s["code"]:<8} {s["name"]:<10} {s["fit_score"]:<6} {s["fit_tier"] or "":<8} {s["barrier_score"]:<6} {s["segment"][:100]}')
        print(f'合计: {len(extreme)} 只')

        # 维度 4: durability + visibility ≥ 4 的 stock
        print()
        print('=' * 130)
        print('维度 4: durability(持续性) + visibility(可见度) 同时 ≥ 4 的 stock')
        print('=' * 130)
        dual4 = [s for s in r if s['durability'] >= 4 and s['visibility'] >= 4]
        dual4.sort(key=lambda x: -(x['fit_score'] or 0))
        print(f'{"代码":<8} {"简称":<10} {"持续":<4} {"兑现":<4} {"barrier":<6} {"综合分":<6} {"档位":<8}')
        print('-' * 130)
        for s in dual4:
            print(f'{s["code"]:<8} {s["name"]:<10} {s["durability"]:<4} {s["visibility"]:<4} {s["barrier"]:<6} {s["fit_score"]:<6} {s["fit_tier"] or "":<8}')
        print(f'合计: {len(dual4)} 只')

        # 汇总
        print()
        print('=' * 130)
        print('汇总统计')
        print('=' * 130)
        print(f'  全部 stock 数: {len(r)}')
        print(f'  上游材料: {len(upstream)} 只')
        print(f'  中游 PCB 制造: {len(midstream)} 只')
        print(f'  barrier=极高: {len(extreme)} 只')
        print(f'  durability+visibility ≥ 4: {len(dual4)} 只')

        await browser.close()

asyncio.run(main())