"""scripts/_verify_grid.py · 精确验证三列 grid"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)

        result = await page.evaluate("""() => {
            // 找所有 display:grid 元素
            const allGrids = Array.from(document.querySelectorAll('*')).filter(el => {
                const s = window.getComputedStyle(el);
                return s.display === 'grid';
            });
            return {
                count: allGrids.length,
                details: allGrids.map((el, i) => {
                    const s = window.getComputedStyle(el);
                    const cs = window.getComputedStyle(el.parentElement);
                    return {
                        i,
                        tag: el.tagName,
                        cls: el.className,
                        cols: s.gridTemplateColumns,
                        gap: s.gap,
                        children: el.children.length,
                        childTags: Array.from(el.children).slice(0, 6).map(c => c.tagName + '.' + (c.className || '').slice(0, 30)),
                        parentClass: el.parentElement ? el.parentElement.className.slice(0, 40) : '',
                        parentParentClass: el.parentElement && el.parentElement.parentElement ? el.parentElement.parentElement.className.slice(0, 40) : '',
                    };
                })
            };
        }""")
        print('=== 所有 grid 元素 ===')
        print(f'总 grid 数: {result["count"]}')
        for d in result['details']:
            print(f'\n[{d["i"]}] {d["tag"]}.{d["cls"]}')
            print(f'  cols: {d["cols"]}')
            print(f'  gap: {d["gap"]}')
            print(f'  children: {d["children"]}')
            print(f'  childTags: {d["childTags"]}')
            print(f'  parentClass: {d["parentClass"]}')
            print(f'  parentParentClass: {d["parentParentClass"]}')

        # 找 1fr 1fr 2fr grid
        targetGrid = await page.evaluate("""() => {
            const el = Array.from(document.querySelectorAll('*')).find(el => {
                const s = window.getComputedStyle(el);
                return s.display === 'grid' && s.gridTemplateColumns.includes('1fr 1fr 2fr');
            });
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                found: true,
                top: r.top,
                left: r.left,
                width: r.width,
                height: r.height,
                childCount: el.children.length,
                childClasses: Array.from(el.children).map(c => c.className),
                childHeaders: Array.from(el.children).map(c => {
                    const h = c.querySelector('.card-header');
                    return h ? h.innerText.slice(0, 40) : 'NO HEADER';
                }),
            };
        }""")
        print(f'\n=== 1fr 1fr 2fr grid ===')
        if targetGrid:
            print(f'  found: {targetGrid["found"]}')
            print(f'  bbox: top={targetGrid["top"]}, left={targetGrid["left"]}, w={targetGrid["width"]}, h={targetGrid["height"]}')
            print(f'  childCount: {targetGrid["childCount"]}')
            print(f'  childClasses: {targetGrid["childClasses"]}')
            print(f'  childHeaders: {targetGrid["childHeaders"]}')
        else:
            print('  ❌ NOT FOUND')

        await browser.close()

asyncio.run(main())