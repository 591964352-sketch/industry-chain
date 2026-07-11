"""scripts/_screenshot_4_82_step1.py · 截图 prosperity_section.png + 输出实际 DOM 顺序"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path
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

        # ===== 1. 实际 DOM 顺序验证 =====
        order = await page.evaluate("""() => {
          const cc = document.getElementById('chain-content');
          if (!cc) return null;
          const sections = Array.from(cc.querySelectorAll('[id^="section-"], .section'));
          const result = [];
          const seen = new Set();
          sections.forEach(el => {
            const id = el.id || '(no id)';
            const tag = el.tagName;
            const cls = el.className.split(' ').slice(0,2).join(' ');
            const key = id + '|' + tag + '|' + cls;
            if (seen.has(key)) return;
            seen.add(key);
            const titleEl = el.querySelector(':scope > .section-title');
            const titleText = titleEl ? titleEl.textContent.trim().slice(0, 50) : '(no title)';
            const r = el.getBoundingClientRect();
            result.push({
              idx: result.length + 1,
              id,
              tag,
              cls,
              top: Math.round(r.top + window.scrollY),
              height: Math.round(r.height),
              title: titleText
            });
          });
          return result;
        }""")

        print('=== chain-content 实际 DOM 顺序 ===')
        if order:
            for s in order:
                print(f'  {s["idx"]:2d}. y={s["top"]:>5d} h={s["height"]:>4d}px · id="{s["id"]}" · "{s["title"]}"')

        # ===== 2. 截图：prosperity_section.png =====
        out = 'd:/乌龟/产业链全景/screenshots/prosperity_section.png'
        Path(out).parent.mkdir(parents=True, exist_ok=True)
        # 找到 section-prosperity 元素并截图
        loc = page.locator('#section-prosperity')
        if await loc.count() > 0:
            await loc.first.scroll_into_view_if_needed()
            await asyncio.sleep(0.5)
            await loc.first.screenshot(path=out)
            size_kb = Path(out).stat().st_size / 1024
            print(f'\n截图已保存：{out} ({size_kb:.1f} KB)')
        else:
            print('ERROR: section-prosperity not found')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())