"""scripts/_verify_dist_filter.py · 验证距离表筛选 + 截图"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
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

        # 验证 1：距离表筛选按钮存在
        result = await page.evaluate("""() => {
            const out = {};
            const coreBtn = document.getElementById('dist-filter-core');
            const allBtn = document.getElementById('dist-filter-all');
            const tbody = document.getElementById('dist-tbody');
            out.coreBtnExists = !!coreBtn;
            out.allBtnExists = !!allBtn;
            out.tbodyExists = !!tbody;
            out.totalRows = tbody ? tbody.querySelectorAll('tr').length : 0;
            out.visibleRows = tbody ? Array.from(tbody.querySelectorAll('tr')).filter(tr => tr.style.display !== 'none').length : 0;
            out.hiddenRows = tbody ? Array.from(tbody.querySelectorAll('tr')).filter(tr => tr.style.display === 'none').length : 0;
            // 检查数据属性
            const barriers = tbody ? Array.from(tbody.querySelectorAll('tr')).map(tr => tr.dataset.barrier) : [];
            out.barrierValues = barriers.reduce((acc, b) => { acc[b] = (acc[b]||0)+1; return acc; }, {});
            // 按钮默认样式（core 应高亮）
            out.coreBtnBg = coreBtn ? window.getComputedStyle(coreBtn).background.slice(0, 50) : null;
            out.allBtnBg = allBtn ? window.getComputedStyle(allBtn).background.slice(0, 50) : null;
            // 检查 39 只
            out.summaryText = allBtn ? allBtn.innerText : null;
            // 持仓空状态卡徽章文字（如果有空交易）
            return out;
        }""")
        print('=== 综合验证 ===')
        for k, v in result.items():
            print(f'  {k}: {v}')

        # 滚动到信号 C 距离表区域
        await page.evaluate("""() => {
            const tbody = document.getElementById('dist-tbody');
            const details = tbody ? tbody.closest('details') : null;
            if (details) details.open = true;
            // 滚到 details summary 顶部（让 summary + 切换按钮 + 表头都可见）
            if (details) details.scrollIntoView({behavior:'instant', block:'start'});
        }""")
        await asyncio.sleep(0.8)

        # 截图：从 details summary 开始
        await page.screenshot(
            path='d:/乌龟/产业链全景/screenshots/visual_audit/signal_c_distance.png',
            clip={'x': 230, 'y': 0, 'width': 1210, 'height': 1000}
        )
        print('+ signal_c_distance.png')

        print(f'\nJS errors: {errors}')
        await browser.close()

asyncio.run(main())