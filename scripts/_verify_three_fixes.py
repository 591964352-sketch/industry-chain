"""scripts/_verify_three_fixes.py · 验证 3 项修改 + 2 张截图"""
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
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        # 验证修改 1+2+3
        result = await page.evaluate("""() => {
            const out = {};
            const c = window.CHAINS && window.CHAINS.pcb;
            out.hasProsperity = !!c && !!c.prosperity;
            out.valuationScore = c && c.prosperity && c.prosperity.dims
              ? c.prosperity.dims.find(d => d.key === 'valuation')?.score : null;
            out.barrierScore = c && c.prosperity && c.prosperity.dims
              ? c.prosperity.dims.find(d => d.key === 'barrier')?.score : null;
            // valuationHigh 检测
            const lt = (typeof computeLtFit === 'function') ? computeLtFit(c.prosperity) : null;
            out.ltRisk = lt ? lt.risk : null;
            out.ltValuationHigh = lt ? lt.valuationHigh : null;
            out.ltScore = lt ? lt.score : null;
            // actionHtml 检测
            const hero = document.querySelector('.hero-banner');
            out.heroExists = !!hero;
            const actionDiv = hero ? Array.from(hero.querySelectorAll('div')).find(d => d.innerText && d.innerText.includes('🔴 当前无进场机会')) : null;
            out.actionDivFound = !!actionDiv;
            out.actionDivText = actionDiv ? actionDiv.innerText.slice(0, 80) : null;
            // valuationHigh verdict 提示
            const valuationHighHint = hero ? Array.from(hero.querySelectorAll('div')).find(d => d.innerText && d.innerText.includes('估值处于历史高位') && d.innerText.includes('等待PE分位回落至成长赛道阈值')) : null;
            // 直接在 hero 之外的景气六维 verdict 区域
            const verdict = document.querySelector('#section-prosperity .highlight-box');
            out.verdictExists = !!verdict;
            out.verdictHasValuationHint = verdict ? verdict.innerText.includes('估值处于历史高位') : false;
            out.verdictHasSafetyRisk = verdict ? verdict.innerText.includes('⚠安全垫不足') : false;
            // 安全垫不足标记（综合分行）
            const safety = document.querySelector('#section-prosperity');
            out.hasSafetyRiskInSection = safety ? safety.innerText.includes('⚠安全垫不足') : false;
            // PE上限文字
            const peLimitTexts = [];
            if (verdict) {
              document.querySelectorAll('details summary').forEach(s => {
                if (s.innerText.includes('查看信号触发条件')) {
                  peLimitTexts.push(s.parentElement.innerText);
                }
              });
            }
            out.peLimitTexts = peLimitTexts.slice(0, 2).map(t => t.slice(0, 200));
            return out;
        }""")
        print('=== 综合验证 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        # 截图 1: hero_top
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/hero_top.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 700}
        )
        print('\n1. + hero_top.png')

        # 截图 2: prosperity_section
        await page.evaluate("document.getElementById('section-prosperity').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/prosperity_section.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 1400}
        )
        print('2. + prosperity_section.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())