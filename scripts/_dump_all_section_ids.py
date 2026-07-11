"""scripts/_dump_all_section_ids.py · dump 所有 section id"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 1500})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        result = await page.evaluate("""() => {
          const cc = document.getElementById('chain-content');
          if (!cc) return null;
          const all = Array.from(cc.querySelectorAll('[id^="section-"]'));
          return all.map(el => ({
            id: el.id,
            tag: el.tagName,
            cls: el.className,
            top: Math.round(el.getBoundingClientRect().top + window.scrollY),
            h: Math.round(el.getBoundingClientRect().height),
            childrenCount: el.children.length
          }));
        }""")

        print(f'共 {len(result)} 个 section-* 元素:')
        for r in result:
            print(f'  y={r["top"]:>5d} h={r["h"]:>4d} · id={r["id"]:<25s} · tag={r["tag"]} · children={r["childrenCount"]} · cls="{r["cls"]}"')

        # Also check section-plain specifically
        plain = await page.evaluate("""() => {
          const el = document.getElementById('section-plain');
          if (!el) return 'NOT FOUND';
          const r = el.getBoundingClientRect();
          return {
            found: true,
            top: Math.round(r.top + window.scrollY),
            h: Math.round(r.height),
            text: el.textContent.slice(0, 100),
            innerHTML_start: el.outerHTML.slice(0, 200)
          };
        }""")
        print('\nsection-plain:', plain)
        await browser.close()

asyncio.run(main())