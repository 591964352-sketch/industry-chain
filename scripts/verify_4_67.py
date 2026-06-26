import asyncio
import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await ctx.new_page()
        await page.goto("file:///D:/乌龟/产业链全景/index.html#pcb", wait_until="load", timeout=30000)
        await asyncio.sleep(3)

        # 1. signalCHistory 块注入验证
        print("=" * 70)
        print("=== 4.67 验收 1：signalCHistory 块注入验证 ===")
        s1 = await page.evaluate("""() => {
            const d = CHAINS.pcb;
            if (!d) return {error: 'CHAINS.pcb undefined'};
            if (!d.signalCHistory) return {error: 'signalCHistory undefined'};
            const sh = d.signalCHistory;
            return {
                runs: sh.runs.length,
                config: sh.config,
                stats: sh.stats,
                note: sh.note,
                flagSample: sh.runs[0]?.flag,
                conditionsSample: sh.runs[0]?.conditions,
                firstRun: sh.runs[0],
                lastRun: sh.runs[sh.runs.length-1]
            };
        }""")
        if 'error' in s1:
            print(f"  ❌ {s1['error']}")
            await browser.close()
            return
        print(f"  ✓ signalCHistory 块已注入")
        print(f"  ✓ runs 总数: {s1['runs']}（4.57 是 0 条·4.67 放宽后应有 >0 条）")
        print(f"  ✓ config: {s1['config']}")
        print(f"  ✓ stats: {s1['stats']}")
        print(f"  ✓ note: {s1['note']}")
        print(f"  ✓ 首条 flag: {s1['flagSample']}")
        print(f"  ✓ 首条 conditions: {s1['conditionsSample']}")
        print(f"  ✓ 首条 date: {s1['firstRun']['date']} {s1['firstRun']['name']}({s1['firstRun']['code']}) 入场价={s1['firstRun']['entryPrice']}")
        print(f"  ✓ 末条 date: {s1['lastRun']['date']} {s1['lastRun']['name']}({s1['lastRun']['code']})")

        # 2. renderSignalCHistoryPanel 渲染验证
        print(f"\n=== 4.67 验收 2：renderSignalCHistoryPanel 渲染验证 ===")
        s2 = await page.evaluate("""() => {
            const html = renderSignalCHistoryPanel('pcb');
            const hasHeader = html.includes('信号 C 历史回放');
            const hasWarn = html.includes('⚠️历史回放');
            const hasStats = html.includes('总触发') && html.includes('30 天胜率');
            const hasTable = html.includes('入场价') && html.includes('查看历史触发明细');
            return {
                htmlLen: html.length,
                hasHeader, hasWarn, hasStats, hasTable,
                first300: html.slice(0, 300)
            };
        }""")
        print(f"  渲染 HTML 长度: {s2['htmlLen']} 字节")
        print(f"  ✓ 标题渲染: {s2['hasHeader']}")
        print(f"  ✓ ⚠️红标渲染: {s2['hasWarn']}")
        print(f"  ✓ 3 胜率卡渲染: {s2['hasStats']}")
        print(f"  ✓ 触发明细表渲染: {s2['hasTable']}")
        print(f"  HTML 前 300 字符: {s2['first300']}")

        # 3. 截图 signal_history.png
        print(f"\n=== 4.67 验收 3：截图 signal_history.png ===")
        await page.evaluate("""() => {
            // 找到信号 C 历史回放卡并滚动到可见
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('信号 C 历史回放')) {
                    c.scrollIntoView({behavior:'instant', block:'center'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_170000/signal_history.png", full_page=False)
        print(f"  ✓ 截图: signal_history.png")

        # 4. 展开触发明细表再截一张
        print(f"\n=== 4.67 验收 4：展开明细表 + 截图 signal_history_detail.png ===")
        await page.evaluate("""() => {
            const details = document.querySelectorAll('details');
            for (const d of details) {
                if (d.innerText.includes('查看历史触发明细')) {
                    d.open = true;
                    d.scrollIntoView({behavior:'instant', block:'center'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_170000/signal_history_detail.png", full_page=False)
        print(f"  ✓ 截图: signal_history_detail.png（展开触发明细表）")

        # 5. 实时 SIGNAL_C 未受影响（triggered=0 保持）
        print(f"\n=== 4.67 验收 5：实时 SIGNAL_C 未受影响（triggered=0 保持） ===")
        s5 = await page.evaluate("""() => {
            const d = CHAINS.pcb;
            if (!d || !d.signalCMeta) return {error: 'signalCMeta undefined'};
            return d.signalCMeta.stats;
        }""")
        if 'error' in s5:
            print(f"  ❌ {s5['error']}")
        else:
            print(f"  ✓ 实时 triggered_A={s5['triggered_A']} / triggered_B={s5['triggered_B']} / triggered_total={s5['triggered_total']}")
            print(f"  ✓ 实时排除统计: loss={s5['excluded']['loss']} / extremePe={s5['excluded']['extremePe']} / pctlDrop_insufficient={s5['excluded']['pctlDrop_insufficient']}")

        await browser.close()
        print(f"\n=== 4.67 验收全部完成 ===")

asyncio.run(main())
