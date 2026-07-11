"""scripts/_screenshot_4_85b.py · 重新截图 plain_section_open.png
按用户步骤：
1. 用 Playwright 打开页面
2. 找到 id="section-plain" 的元素
3. 先点击展开（section-plain 默认折叠，需要点击标题展开）
4. 等待渲染完成后，对 section-plain 元素做 scrollIntoView
5. 截从 section-plain 顶部往下 1200px 的区域
6. 保存为 plain_section_open.png
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

        # Step 1: 用 Playwright 打开页面（用 HTTP 走 8765，与用户浏览器一致）
        await page.goto('http://localhost:8765/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(2)
        print('✓ Step 1: 页面已加载')

        # Step 2: 找到 id="section-plain"
        sec_exists = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          if (!sec) return { found: false };
          const r = sec.getBoundingClientRect();
          return { found: true, top: r.top, height: r.height, collapsed: sec.classList.contains('collapsed') };
        }""")
        print('=== Step 2: section-plain 初始状态 ===')
        print(sec_exists)

        if not sec_exists.get('found'):
            print('✗ section-plain 元素未找到')
            await browser.close()
            return

        # Step 3: 点击展开（section-plain 默认折叠，点击标题）
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          const title = sec.querySelector('.section-title');
          if (title) title.click();
        }""")
        await asyncio.sleep(1)
        print('✓ Step 3: 已点击 section-title 展开')

        # 再次检查状态
        sec_state = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          const body = sec.querySelector('.section-body');
          const r = sec.getBoundingClientRect();
          const bodyStyle = body ? window.getComputedStyle(body).display : 'no-body';
          return {
            top: r.top, height: r.height,
            collapsed: sec.classList.contains('collapsed'),
            bodyDisplay: bodyStyle
          };
        }""")
        print('=== 展开后状态 ===')
        print(sec_state)

        # Step 4: 等待渲染完成 + scrollIntoView
        await asyncio.sleep(1)  # 等 chainStory 渲染完成

        await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          sec.scrollIntoView({ behavior: 'instant', block: 'start' });
          window.scrollBy(0, -20);  // 留 20px 顶部空间避免被 sticky header 遮挡
        }""")
        await asyncio.sleep(1)
        print('✓ Step 4: scrollIntoView 完成')

        # 验证 chainStory 已渲染
        chain_info = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          const allDivs = Array.from(sec.querySelectorAll('div'));
          const titleDiv = allDivs.find(d => d.textContent.includes('产业链全景·从原材料到终端应用'));
          if (!titleDiv) return { found: false };
          const container = titleDiv.parentElement;
          const r = container.getBoundingClientRect();
          const stepDivs = container.querySelectorAll('div[style*="grid-template-columns:20px"]');
          return {
            found: true,
            top: r.top, height: r.height, bottom: r.bottom,
            stepCount: stepDivs.length
          };
        }""")
        print('=== chainStory 渲染状态 ===')
        print(chain_info)

        # Step 5: 截从 section-plain 顶部往下 1200px 的区域
        sec_top = sec_state.get('top', 0)
        # section-plain 可能在 viewport 外，需要取绝对位置（pageYOffset + rect.top）
        sec_abs_top = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          const r = sec.getBoundingClientRect();
          return window.pageYOffset + r.top;
        }""")
        print(f'section-plain 绝对 Y 位置: {sec_abs_top}')

        # 用 page.screenshot 的 clip 截 1440x1200 区域
        # 注意：clip 是 viewport 坐标，所以需要让 section-plain 在 viewport 顶部
        await page.evaluate(f"""() => {{
          window.scrollTo(0, {sec_abs_top});
        }}""")
        await asyncio.sleep(0.5)

        # 取最终截图位置（scroll 后 top 应接近 0）
        final_top = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          const r = sec.getBoundingClientRect();
          return r.top;
        }""")
        print(f'scroll 后 section-plain viewport top: {final_top}')

        # 截 1440x1200 区域
        await page.screenshot(
            path='screenshots/plain_section_open.png',
            clip={'x': 0, 'y': max(0, int(final_top)), 'width': 1440, 'height': 1200}
        )
        print('✓ Step 5-6: screenshots/plain_section_open.png saved (1440x1200)')

        # 也保存 hero_top.png 用同一端口
        await page.evaluate("() => window.scrollTo(0, 0)")
        await asyncio.sleep(0.5)
        await page.screenshot(path='screenshots/hero_top.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 700})
        print('✓ screenshots/hero_top.png refreshed')

        if errors:
            print('\n=== Page errors ===')
            for e in errors:
                print(' ', e)
        else:
            print('\n✓ No page errors')

        await browser.close()

asyncio.run(main())