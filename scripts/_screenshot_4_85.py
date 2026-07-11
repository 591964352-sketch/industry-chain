"""scripts/_screenshot_4_85.py · 截图 plain_section.png + hero_top.png"""
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
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda m: errors.append(f'console.{m.type}: {m.text}') if m.type in ('error',) else None)

        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(2)

        # === 1. hero_top.png：顶部 700px 整体 ===
        Path('screenshots').mkdir(exist_ok=True)
        await page.screenshot(path='screenshots/hero_top.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 700})
        print('✓ screenshots/hero_top.png saved')

        # === 2. plain_section.png：展开 section-plain，截 chainStory 完整显示 ===
        # 展开 section-plain（默认折叠）
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          if (!sec) return { found: false };
          const body = sec.querySelector('.section-body');
          if (body) body.style.display = 'block';
          sec.classList.remove('collapsed');
          // 滚动到 section-plain 顶部
          sec.scrollIntoView({ behavior: 'instant', block: 'start' });
          return { found: true };
        }""")
        await asyncio.sleep(1)

        # 验证 chainStory 是否已渲染
        chain_info = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          if (!sec) return { found: false };
          // 找含 "产业链全景·从原材料到终端应用" 的 div
          const allDivs = Array.from(sec.querySelectorAll('div'));
          const titleDiv = allDivs.find(d => d.textContent.includes('产业链全景·从原材料到终端应用'));
          if (!titleDiv) return { found: false };
          // 找 chainStory 容器（titleDiv 的父 div）
          const container = titleDiv.parentElement;
          const r = container.getBoundingClientRect();
          // 数 chainStory 子步骤（grid 布局 div）
          const stepDivs = container.querySelectorAll('div[style*="grid-template-columns:20px"]');
          return { found: true, top: r.top, height: r.height, stepCount: stepDivs.length, bottom: r.bottom };
        }""")
        print('=== chainStory 容器信息 ===')
        print(chain_info)

        # 取整页高度，让 plain_section.png 包含 chainStory 完整内容
        if chain_info.get('found'):
            # 滚动到 chainStory 起始位置
            await page.evaluate(f"""() => {{
              const sec = document.querySelector('#section-plain');
              sec.scrollIntoView({{ behavior: 'instant', block: 'start' }});
            }}""")
            await asyncio.sleep(0.5)

            # 整页截图（包含 chainStory + 后续段落）
            await page.screenshot(path='screenshots/plain_section.png', full_page=True)
            print('✓ screenshots/plain_section.png saved (full_page)')
        else:
            print('✗ chainStory 未找到，仅截 section-plain 当前可见区域')
            await page.screenshot(path='screenshots/plain_section.png')
            print('✓ screenshots/plain_section.png saved')

        if errors:
            print('\n=== Page errors ===')
            for e in errors:
                print(' ', e)
        else:
            print('\n✓ No page errors')

        await browser.close()

asyncio.run(main())