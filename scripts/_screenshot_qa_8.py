"""scripts/_screenshot_qa_8.py · 最终全页质检 8 张截图
1. full_page.png（全页）
2. hero_top.png（顶部800px）
3. prosperity_section.png（赛道概览）
4. macro_dashboard.png（景气仪表盘展开）
5. holding_section.png（持仓管理空状态）
6. plain_section_open.png（白话解读展开·chainStory）
7. signal_c_distance.png（信号C距离表）
8. sidebar_button_closed.png（侧边栏关闭后右侧边缘）
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

        # ==========================================
        # 1. full_page.png（全页）
        # ==========================================
        await page.goto('http://localhost:8765/index.html#pcb', wait_until='networkidle')
        await asyncio.sleep(2)

        # 全页结构检查
        structure = await page.evaluate("""() => {
          const sections = ['section-treemap','section-overview','section-prosperity','section-macro',
            'section-demand-chain','section-upstream','section-midstream','section-fourq',
            'section-decision','section-holding','section-plain'];
          return sections.map(id => {
            const el = document.querySelector('#' + id);
            if (!el) return { id, found: false };
            const r = el.getBoundingClientRect();
            return {
              id, found: true,
              top: window.pageYOffset + r.top,
              height: r.height,
              collapsed: el.classList.contains('collapsed')
            };
          });
        }""")
        print('=== Section 结构（按物理顺序）===')
        for s in structure:
            mark = '✓' if s.get('found') else '✗'
            print(f'  {mark} {s["id"]} top={s.get("top","?")}px h={s.get("height","?")}px collapsed={s.get("collapsed","?")}')

        # 滚到顶部，截全页（用 1440 宽度，高度由内容决定）
        await page.evaluate("() => window.scrollTo(0, 0)")
        await asyncio.sleep(0.5)
        await page.screenshot(path='screenshots/full_page.png', full_page=True)
        print('✓ 1. full_page.png saved')

        # ==========================================
        # 2. hero_top.png（顶部800px）
        # ==========================================
        await page.screenshot(path='screenshots/hero_top.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 800})
        print('✓ 2. hero_top.png saved (1440x800)')

        # ==========================================
        # 3. prosperity_section.png（赛道概览：overview-grid+景气六维+周期+买入信号）
        # ==========================================
        # 找到 section-prosperity 位置并展开
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
        if sec_top > 0:
            await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
            await asyncio.sleep(0.5)
            await page.screenshot(path='screenshots/prosperity_section.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900})
            print(f'✓ 3. prosperity_section.png saved')
        else:
            print('✗ section-prosperity 未找到')

        # ==========================================
        # 4. macro_dashboard.png（景气仪表盘展开状态）
        # ==========================================
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-macro');
          if (sec && sec.classList.contains('collapsed')) {
            const title = sec.querySelector('.section-title');
            if (title) title.click();
          }
        }""")
        await asyncio.sleep(1)
        sec_top = await page.evaluate("""() => {
          const sec = document.querySelector('#section-macro');
          if (!sec) return -1;
          const r = sec.getBoundingClientRect();
          return window.pageYOffset + r.top;
        }""")
        if sec_top > 0:
            await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
            await asyncio.sleep(0.5)
            await page.screenshot(path='screenshots/macro_dashboard.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900})
            print(f'✓ 4. macro_dashboard.png saved')
        else:
            print('✗ section-macro 未找到')

        # ==========================================
        # 5. holding_section.png（持仓管理空状态引导）
        # ==========================================
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-holding');
          if (sec && sec.classList.contains('collapsed')) {
            const title = sec.querySelector('.section-title');
            if (title) title.click();
          }
        }""")
        await asyncio.sleep(1)
        sec_top = await page.evaluate("""() => {
          const sec = document.querySelector('#section-holding');
          if (!sec) return -1;
          const r = sec.getBoundingClientRect();
          return window.pageYOffset + r.top;
        }""")
        if sec_top > 0:
            await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
            await asyncio.sleep(0.5)
            await page.screenshot(path='screenshots/holding_section.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900})
            print(f'✓ 5. holding_section.png saved')
        else:
            print('✗ section-holding 未找到')

        # ==========================================
        # 6. plain_section_open.png（白话解读展开·chainStory）
        # ==========================================
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          if (sec && sec.classList.contains('collapsed')) {
            const title = sec.querySelector('.section-title');
            if (title) title.click();
          }
        }""")
        await asyncio.sleep(1)
        sec_top = await page.evaluate("""() => {
          const sec = document.querySelector('#section-plain');
          if (!sec) return -1;
          const r = sec.getBoundingClientRect();
          return window.pageYOffset + r.top;
        }""")
        if sec_top > 0:
            await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
            await asyncio.sleep(0.5)
            await page.screenshot(path='screenshots/plain_section_open.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 1200})
            print(f'✓ 6. plain_section_open.png saved (1440x1200)')
        else:
            print('✗ section-plain 未找到')

        # ==========================================
        # 7. signal_c_distance.png（信号C距离表）
        # ==========================================
        # 信号C 在 section-decision 内部。先展开 section-decision
        await page.evaluate("""() => {
          const sec = document.querySelector('#section-decision');
          if (sec && sec.classList.contains('collapsed')) {
            const title = sec.querySelector('.section-title');
            if (title) title.click();
          }
        }""")
        await asyncio.sleep(1)

        # 找含 "信号C" 或 "核心卡口" 的元素
        sig_c_info = await page.evaluate("""() => {
          // 找含 "核心卡口筛选" 或 "距离表" 的 h3/div
          const candidates = Array.from(document.querySelectorAll('h3, div'));
          const target = candidates.find(el => {
            const txt = el.textContent || '';
            return txt.includes('核心卡口') && txt.includes('距离') && txt.length < 200;
          });
          if (!target) return { found: false };
          const r = target.getBoundingClientRect();
          return {
            found: true,
            top: window.pageYOffset + r.top,
            text: target.textContent.slice(0, 80)
          };
        }""")
        print('=== 信号C 元素查找 ===')
        print(sig_c_info)

        if sig_c_info.get('found'):
            await page.evaluate(f"() => window.scrollTo(0, {sig_c_info['top'] - 40})")
            await asyncio.sleep(0.5)
            await page.screenshot(path='screenshots/signal_c_distance.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900})
            print(f'✓ 7. signal_c_distance.png saved')
        else:
            # 退而求其次：截 section-decision 顶部
            sec_top = await page.evaluate("""() => {
              const sec = document.querySelector('#section-decision');
              if (!sec) return -1;
              const r = sec.getBoundingClientRect();
              return window.pageYOffset + r.top;
            }""")
            if sec_top > 0:
                await page.evaluate(f"() => window.scrollTo(0, {sec_top - 20})")
                await asyncio.sleep(0.5)
                await page.screenshot(path='screenshots/signal_c_distance.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 900})
                print(f'✓ 7. signal_c_distance.png saved (fallback to section-decision)')

        # ==========================================
        # 8. sidebar_button_closed.png（侧边栏关闭后右侧边缘）
        # ==========================================
        # 关闭侧边栏
        await page.evaluate("""() => {
          const sidebar = document.querySelector('.sidebar-nav');
          if (sidebar) {
            sidebar.classList.add('closed');
            // 触发可能的 close 事件
            const closeBtn = sidebar.querySelector('.close-btn, [onclick*="close"]');
            if (closeBtn) closeBtn.click();
          }
          // 同时看是否有 toggleSidebar 函数
          if (typeof window.toggleSidebar === 'function') {
            try { window.toggleSidebar(); } catch (e) {}
          }
        }""")
        await asyncio.sleep(1)

        await page.evaluate("() => window.scrollTo(0, 0)")
        await asyncio.sleep(0.5)

        # 检查侧边栏状态
        sidebar_state = await page.evaluate("""() => {
          const sidebar = document.querySelector('.sidebar-nav');
          if (!sidebar) return { found: false };
          const r = sidebar.getBoundingClientRect();
          return {
            found: true,
            left: r.left, width: r.width,
            classList: sidebar.className,
            visible: r.width > 0 && r.left >= -10
          };
        }""")
        print('=== 侧边栏状态（点击后）===')
        print(sidebar_state)

        # 截右侧边缘（1280-1440 一带，看唤醒按钮）
        await page.screenshot(path='screenshots/sidebar_button_closed.png', clip={'x': 1280, 'y': 0, 'width': 160, 'height': 700})
        print('✓ 8. sidebar_button_closed.png saved (右侧边缘 160x700)')

        # ==========================================
        # 错误日志
        # ==========================================
        if errors:
            print('\n=== Page errors（仅 console.error 与 pageerror）===')
            seen = set()
            for e in errors:
                if e in seen: continue
                seen.add(e)
                print(' ', e)
        else:
            print('\n✓ No page errors')

        await browser.close()
        print('\n=== 全部 8 张截图完成 ===')

asyncio.run(main())