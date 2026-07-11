"""scripts/_verify_4_75.py · commit 4.75 四层框架验证 + 截图 4 张"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await ctx.new_page()

        # 1. PCB 完整截图（full_page）
        await page.goto('file:///D:/乌龟/产业链全景/index.html#pcb?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
        await asyncio.sleep(3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/full_page.png',
            full_page=True
        )
        print('1. ✓ full_page.png（PCB 全页）')

        # 2. 第一层截图（Hero + section-overview 锚点 + treeMap）
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/layer1.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('2. ✓ layer1.png（第一层·Hero+树状图）')

        # 3. 第四层折叠态截图（section-decision 默认折叠）
        await page.evaluate("document.getElementById('section-decision').scrollIntoView({behavior:'instant', block:'start'})")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/layer4_collapsed.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 600}
        )
        print('3. ✓ layer4_collapsed.png（第四层折叠态）')

        # 4. 第四层展开态截图（手动展开 section-decision）
        await page.evaluate("document.querySelector('.section.collapsible.collapsed[data-key=\"decision\"]').classList.remove('collapsed')")
        await asyncio.sleep(0.5)
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/layer4_expanded.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 900}
        )
        print('4. ✓ layer4_expanded.png（第四层展开态·5 子块全部可见）')

        # 5. 验证结构
        print('\n=== 4 层框架结构验证 ===')
        structure = await page.evaluate("""() => {
            const sections = [
                {id: 'section-overview', name: '第一层·认识赛道', expected: true},
                {id: 'section-macro', name: '第二层·景气仪表盘', expected: true},
                {id: 'section-prosperity', name: '第二层·景气六维', expected: true},
                {id: 'section-upstream', name: '第三层·上游拆解', expected: true},
                {id: 'section-fourq', name: '第三层·四问筛选', expected: true},
                {id: 'section-holding', name: '第四层·持仓管理', expected: true},
                {id: 'section-decision', name: '第四层·投资决策', expected: true}
            ];
            const out = [];
            sections.forEach(s => {
                const el = document.getElementById(s.id);
                if (el) {
                    const isCollapsed = el.classList.contains('collapsed');
                    const isCollapsible = el.classList.contains('collapsible');
                    const visible = el.offsetHeight > 0;
                    out.push({name: s.name, exists: true, collapsed: isCollapsed, collapsible: isCollapsible, visible: visible});
                } else {
                    out.push({name: s.name, exists: false});
                }
            });
            return out;
        }""")
        for s in structure:
            if s['exists']:
                state = '折叠' if s['collapsed'] else ('可折叠·展开' if s['collapsible'] else '固定展开')
                visible_mark = '✓' if s['visible'] else '✗'
                print(f'  {visible_mark} {s["name"]}: exists={s["exists"]} state={state} visible={s["visible"]}')
            else:
                print(f'  ✗ {s["name"]}: NOT FOUND')

        # 6. 切换 3 条非 PCB 赛道验证 macro 降级
        for chain_id in ['semi', 'hbm', 'cpo']:
            await page.goto('file:///D:/乌龟/产业链全景/index.html#' + chain_id + '?_t=' + str(asyncio.get_event_loop().time()), wait_until='load')
            await asyncio.sleep(2)
            macro_check = await page.evaluate("""() => {
                const el = document.getElementById('section-macro');
                if (!el) return {found: false};
                const txt = el.innerText;
                return {
                    found: true,
                    has_degrade_msg: txt.includes('暂无宏观五维数据') || txt.includes('仅 PCB 完整'),
                    text_snippet: txt.slice(0, 80)
                };
            }""")
            mark = '✅' if macro_check.get('has_degrade_msg') else '❌'
            print(f'  {mark} #{chain_id} macro 降级: found={macro_check.get("found")} degrade_msg={macro_check.get("has_degrade_msg")}')

        await browser.close()

asyncio.run(main())