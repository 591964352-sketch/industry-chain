"""scripts/_verify_holding_fix.py · 验证 3 个场景 + 截图"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 1500})
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))

        # ========== 场景 1：空交易（localStorage 无 myTrades）==========
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 确保 localStorage 干净
        await page.evaluate("() => { localStorage.removeItem('myTrades'); }")
        await page.reload(wait_until='load')
        await asyncio.sleep(3)

        result1 = await page.evaluate("""() => {
            const hm = window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.holdingMeta;
            const sec = document.getElementById('section-holding');
            const emptyHint = sec ? sec.innerText.includes('暂无持仓记录') : false;
            return {
                hasHoldingMeta: !!hm,
                hasOpenPosition: hm ? hm.hasOpenPosition : null,
                openCodesCount: hm && hm.openCodes ? hm.openCodes.length : 0,
                triggeredListLen: hm && hm.triggeredList ? hm.triggeredList.length : 0,
                statsReduceCount: hm && hm.stats ? hm.stats.reduce_count : null,
                sectionExists: !!sec,
                emptyHintShown: emptyHint,
                sectionTextPreview: sec ? sec.innerText.slice(0, 300) : null
            };
        }""")
        print('=== 场景 1：空交易 ===')
        for k, v in result1.items():
            print(f'  {k}: {v}')

        # 截图
        await page.evaluate("document.getElementById('section-holding').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/holding_empty.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 500}
        )
        print('+ holding_empty.png')

        # ========== 场景 2：单笔买入 002463 沪电股份 100股 ==========
        await page.evaluate("""() => {
            const trade = {
                cardId: 'pcb_002463',
                code: '002463',
                name: '沪电股份',
                side: 'buy',
                qty: 100,
                price: 50,
                createdAt: new Date().toISOString(),
                breakReason: '',
                note: '',
                triggerSignal: '手动',
                attribution: {driver:null, confidence:null, note:null}
            };
            localStorage.setItem('myTrades', JSON.stringify([trade]));
        }""")
        await page.reload(wait_until='load')
        await asyncio.sleep(3)

        result2 = await page.evaluate("""() => {
            const hm = window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.holdingMeta;
            return {
                hasOpenPosition: hm ? hm.hasOpenPosition : null,
                openCodes: hm ? hm.openCodes : null,
                openCodesDetail: hm ? hm.openCodesDetail : null,
                triggeredListLen: hm && hm.triggeredList ? hm.triggeredList.length : 0,
                triggeredCodes: hm && hm.triggeredList ? hm.triggeredList.map(s => s.code) : null,
                statsReduceCount: hm && hm.stats ? hm.stats.reduce_count : null,
                statsExitCount: hm && hm.stats ? hm.stats.exit_count : null
            };
        }""")
        print('\n=== 场景 2：单笔买入 002463 100股 ===')
        for k, v in result2.items():
            print(f'  {k}: {v}')

        await page.evaluate("document.getElementById('section-holding').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/holding_single.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 700}
        )
        print('+ holding_single.png')

        # ========== 场景 3：多只持仓（含 002463 + 002384 + 600176）==========
        await page.evaluate("""() => {
            const trades = [
                { cardId:'pcb_002463', code:'002463', name:'沪电股份', side:'buy', qty:100, price:50, createdAt:'2026-06-01T10:00:00Z', triggerSignal:'手动', attribution:{driver:null,confidence:null,note:null} },
                { cardId:'pcb_002384', code:'002384', name:'东山精密', side:'buy', qty:200, price:35, createdAt:'2026-06-02T10:00:00Z', triggerSignal:'手动', attribution:{driver:null,confidence:null,note:null} },
                { cardId:'pcb_600176', code:'600176', name:'中国巨石', side:'buy', qty:500, price:14, createdAt:'2026-06-03T10:00:00Z', triggerSignal:'手动', attribution:{driver:null,confidence:null,note:null} },
                { cardId:'pcb_002384', code:'002384', name:'东山精密', side:'sell', qty:50, price:38, createdAt:'2026-06-20T10:00:00Z', triggerSignal:'减仓', attribution:{driver:null,confidence:null,note:null} }
            ];
            localStorage.setItem('myTrades', JSON.stringify(trades));
        }""")
        await page.reload(wait_until='load')
        await asyncio.sleep(3)

        result3 = await page.evaluate("""() => {
            const hm = window.CHAINS && window.CHAINS.pcb && window.CHAINS.pcb.holdingMeta;
            return {
                hasOpenPosition: hm ? hm.hasOpenPosition : null,
                openCodes: hm ? hm.openCodes : null,
                openCodesDetail: hm ? hm.openCodesDetail : null,
                triggeredListLen: hm && hm.triggeredList ? hm.triggeredList.length : 0,
                triggeredCodes: hm && hm.triggeredList ? hm.triggeredList.map(s => s.code) : null,
                statsReduceCount: hm && hm.stats ? hm.stats.reduce_count : null,
                statsExitCount: hm && hm.stats ? hm.stats.exit_count : null
            };
        }""")
        print('\n=== 场景 3：多只持仓（含 sell 减仓后） ===')
        for k, v in result3.items():
            print(f'  {k}: {v}')

        await page.evaluate("document.getElementById('section-holding').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/holding_multi.png',
            clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900}
        )
        print('+ holding_multi.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())