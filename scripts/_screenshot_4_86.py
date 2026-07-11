"""scripts/_screenshot_4_86.py · 4.86 修复后重新截图
1. prosperity_section.png（overview-grid 第2行4格·确认无**符号）
2. signal_c_distance_v2.png（找 section-prosperity 含"查看全部" details 元素·点击展开·截800px）
"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
        page.on('console', lambda m: errors.append(f'console.{m.type}: {m.text}') if m.type == 'error' else None)

        Path('screenshots').mkdir(exist_ok=True)
        await page.goto('http://localhost:8765/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(2)

        # === 1. prosperity_section.png（overview-grid 第2行4格）===
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-prosperity');
          if (sec && sec.classList.contains('collapsed')) {
            const title = sec.querySelector('.section-title');
            if (title) title.click();
          }
        }""")
        await asyncio.sleep(1)

        # 滚动到 section-prosperity
        sec_top = await page.evaluate("""() => {
          const sec = document.querySelector('#section-prosperity');
          if (!sec) return -1;
          const r = sec.getBoundingClientRect();
          return window.pageYOffset + r.top;
        }""")
        print(f'section-prosperity 绝对 Y: {sec_top}')
        if sec_top > 0:
            await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
            await asyncio.sleep(0.5)
            await page.screenshot(path='screenshots/prosperity_section.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900})
            print('✓ 1. prosperity_section.png saved')

        # === 2. signal_c_distance_v2.png ===
        # 找 section-prosperity 里含"查看全部" details 元素
        details_info = await page.evaluate("""() => {
          const sec = document.querySelector('#section-prosperity');
          if (!sec) return { found: false };
          // 找 details 元素或其子元素含"查看全部"
          const detailsList = Array.from(sec.querySelectorAll('details'));
          const target = detailsList.find(d => d.textContent.includes('查看全部'));
          if (!target) {
            // 退而求其次：找任何含"查看全部"的容器
            const allEls = Array.from(sec.querySelectorAll('*'));
            const fallback = allEls.find(el => el.textContent.includes('查看全部') && el.children.length < 5);
            if (fallback) {
              const r = fallback.getBoundingClientRect();
              return { found: true, tag: fallback.tagName, top: window.pageYOffset + r.top, text: fallback.textContent.slice(0, 50) };
            }
            return { found: false };
          }
          const r = target.getBoundingClientRect();
          return {
            found: true,
            tag: 'details',
            top: window.pageYOffset + r.top,
            open: target.open,
            text: target.textContent.slice(0, 80)
          };
        }""")
        print('=== details 元素查找 ===')
        print(details_info)

        if details_info.get('found'):
            target_top = details_info['top']
            await page.evaluate(f"() => window.scrollTo(0, {target_top - 40})")
            await asyncio.sleep(0.5)

            # 如果是 details 元素，点击展开（如果未展开）
            if details_info.get('tag') == 'details' and not details_info.get('open'):
                await page.evaluate("""() => {
                  const sec = document.querySelector('#section-prosperity');
                  const detailsList = Array.from(sec.querySelectorAll('details'));
                  const target = detailsList.find(d => d.textContent.includes('查看全部'));
                  if (target) target.open = true;
                }""")
                await asyncio.sleep(1)

            # 截该元素区域高度 800px
            await page.screenshot(path='screenshots/signal_c_distance_v2.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 800})
            print('✓ 2. signal_c_distance_v2.png saved (1440x800)')
        else:
            print('✗ section-prosperity 中未找到含"查看全部"的元素')
            # 退而求其次：截 section-prosperity 顶部
            if sec_top > 0:
                await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
                await asyncio.sleep(0.5)
                await page.screenshot(path='screenshots/signal_c_distance_v2.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 800})
                print('✓ 2. signal_c_distance_v2.png saved (fallback)')

        if errors:
            print('\n=== Page errors ===')
            seen = set()
            for e in errors:
                if e in seen: continue
                seen.add(e)
                print(' ', e)
        else:
            print('\n✓ No page errors')

        await browser.close()

asyncio.run(main())