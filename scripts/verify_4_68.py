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

        # 1. 验证历史回放卡片 max-height + overflow-y 生效
        print("=" * 70)
        print("=== 4.68 验收 1：历史回放卡片 max-height + overflow-y 生效 ===")
        s1 = await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('信号 C 历史回放')) {
                    const cs = window.getComputedStyle(c);
                    return {
                        maxHeight: cs.maxHeight,
                        overflowY: cs.overflowY,
                        actualHeight: c.offsetHeight,
                        scrollHeight: c.scrollHeight,
                        isScrollable: c.scrollHeight > c.offsetHeight
                    };
                }
            }
            return {error: '未找到历史回放卡'};
        }""")
        if 'error' in s1:
            print(f"  ❌ {s1['error']}")
            await browser.close()
            return
        print(f"  max-height: {s1['maxHeight']} {'✅' if s1['maxHeight'] == '400px' else '❌'}")
        print(f"  overflow-y: {s1['overflowY']} {'✅' if s1['overflowY'] == 'auto' else '❌'}")
        print(f"  实际高度: {s1['actualHeight']}px（应 ≤ 400px）{'✅' if s1['actualHeight'] <= 400 else '❌'}")
        print(f"  内容高度: {s1['scrollHeight']}px")
        print(f"  可滚动: {s1['isScrollable']}（展开明细时）")

        # 2. details 默认折叠
        print(f"\n=== 4.68 验收 2：details 默认折叠 ===")
        s2 = await page.evaluate("""() => {
            const details = document.querySelectorAll('details');
            for (const d of details) {
                if (d.innerText.includes('查看历史触发明细')) {
                    return {open: d.open, hasOpenAttr: d.hasAttribute('open')};
                }
            }
            return {error: '未找到触发明细 details'};
        }""")
        if 'error' in s2:
            print(f"  ❌ {s2['error']}")
        else:
            print(f"  details.open = {s2['open']}（应为 false）{'✅' if not s2['open'] else '❌'}")
            print(f"  含 open 属性: {s2['hasOpenAttr']}（应为 false）{'✅' if not s2['hasOpenAttr'] else '❌'}")

        # 3. 截图 signals_section.png（不展开明细）
        print(f"\n=== 4.68 验收 3：截图 signals_section.png（默认折叠态） ===")
        await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('信号 C 历史回放')) {
                    c.scrollIntoView({behavior:'instant', block:'center'});
                    return;
                }
            }
        }""")
        await asyncio.sleep(1)
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_171500/signals_section.png", full_page=False)
        print(f"  ✓ 截图: signals_section.png")

        # 4. 验证 choke card 仍在视口内
        print(f"\n=== 4.68 验收 4：choke card 视口可见 ===")
        s4 = await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card, [class*="choke"]');
            const out = [];
            for (const c of cards) {
                const txt = c.innerText || '';
                if (txt.includes('choke') || txt.includes('卡口') || txt.includes('601208') || txt.includes('东材')) {
                    const rect = c.getBoundingClientRect();
                    out.push({
                        text: txt.slice(0, 30),
                        top: Math.round(rect.top),
                        bottom: Math.round(rect.bottom),
                        inViewport: rect.top < 900 && rect.bottom > 0
                    });
                }
            }
            return out.slice(0, 5);
        }""")
        for i, c in enumerate(s4):
            print(f"  [{i+1}] top={c['top']}px bottom={c['bottom']}px inViewport={c['inViewport']} {c['text']}")

        # 5. 主动展开明细再截图
        print(f"\n=== 4.68 验收 5：展开明细后截图 signals_section_expanded.png ===")
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
        await page.screenshot(path="d:/乌龟/产业链全景/screenshots/check_20260626_171500/signals_section_expanded.png", full_page=False)
        print(f"  ✓ 截图: signals_section_expanded.png（用户主动展开后·卡片内滚动）")

        # 6. 验证展开后卡片高度仍 ≤ 400px
        print(f"\n=== 4.68 验收 6：展开明细后卡片高度 ===")
        s6 = await page.evaluate("""() => {
            const cards = document.querySelectorAll('.card');
            for (const c of cards) {
                if (c.innerText.includes('信号 C 历史回放')) {
                    return {
                        actualHeight: c.offsetHeight,
                        scrollHeight: c.scrollHeight,
                        isScrollable: c.scrollHeight > c.offsetHeight
                    };
                }
            }
        }""")
        print(f"  实际高度: {s6['actualHeight']}px（应 ≤ 400px）{'✅' if s6['actualHeight'] <= 400 else '❌'}")
        print(f"  内容高度: {s6['scrollHeight']}px")
        print(f"  可滚动: {s6['isScrollable']}（明细过长时·卡片内独立滚动）{'✅' if s6['isScrollable'] else '— 内容没溢出'}")

        await browser.close()
        print(f"\n=== 4.68 验收全部完成 ===")

asyncio.run(main())
