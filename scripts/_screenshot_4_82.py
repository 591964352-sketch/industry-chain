"""scripts/_screenshot_4_82.py · 截图 hero_top.png（路径2：锚点栏仍在 Hero 下方 1406px）"""
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

        # ===== 1. 全页结构 dump（用于报告） =====
        nav_info = await page.evaluate("""() => {
          const nav = document.querySelector('.quick-nav');
          if (!nav) return { found: false };
          const anchors = Array.from(nav.querySelectorAll('a')).map(a => ({
            text: a.textContent.trim(),
            href: a.getAttribute('href')
          }));
          const r = nav.getBoundingClientRect();
          return { found: true, anchors, top: r.top, bottom: r.bottom, height: r.height };
        }""")
        print('=== quick-nav 锚点信息 ===')
        if nav_info.get('found'):
            print(f'位置: top={nav_info["top"]}px  bottom={nav_info["bottom"]}px  height={nav_info["height"]}px')
            print(f'共 {len(nav_info["anchors"])} 条:')
            for i, a in enumerate(nav_info['anchors']):
                print(f'  {i+1}. "{a["text"]}" → {a["href"]}')
        else:
            print('NOT FOUND!')

        # ===== 2. 取链路上 5 处 section 标题的实际渲染编号 =====
        titles_info = await page.evaluate("""() => {
          const ids = ['section-demand-chain', 'section-upstream', 'section-midstream', 'section-fourq', 'section-plain'];
          return ids.map(id => {
            const el = document.getElementById(id);
            if (!el) return { id, found: false };
            const titleEl = el.querySelector('.section-title');
            const numEl = titleEl ? titleEl.querySelector('.num') : null;
            return {
              id,
              found: true,
              numText: numEl ? numEl.textContent.trim() : '(no .num)',
              titleText: titleEl ? titleEl.textContent.trim().slice(0, 60) : '(no title)'
            };
          });
        }""")
        print('\n=== 5 处 section 标题渲染编号 ===')
        for t in titles_info:
            print(f'  {t["id"]:30s} num="{t["numText"]}" title="{t["titleText"]}"')

        # ===== 3. 截图：将 quick-nav 滚到视口顶部，截 1500px 高 =====
        await page.evaluate("""() => {
          const nav = document.querySelector('.quick-nav');
          if (nav) {
            const r = nav.getBoundingClientRect();
            window.scrollTo({top: window.scrollY + r.top - 20, behavior: 'instant'});
          }
        }""")
        await asyncio.sleep(0.5)
        await page.evaluate("window.scrollBy(0, -40)")  # 多滚一点，把上方 Hero + 树状图 + 景气仪表盘 头部露出来
        await asyncio.sleep(0.3)

        out = 'd:/乌龟/产业链全景/screenshots/hero_top.png'
        Path(out).parent.mkdir(parents=True, exist_ok=True)
        await page.screenshot(path=out, clip={'x': 0, 'y': 0, 'width': 1440, 'height': 1500})
        print(f'\n截图已保存：{out} (1440x1500)')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())