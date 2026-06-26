"""
screenshot_check.py · 页面视觉截图
需要安装：pip install playwright && playwright install chromium
运行：python scripts/screenshot_check.py
截图输出到：screenshots/check_YYYYMMDD_HHMMSS/

★ commit 4.50：增加 section_signal_top3.png（卡口结论区 · 紧跟 Hero 底部 · 含 TOP3 预告 + 头 1-2 张 choke card）
★ commit 4.52 遗 留：mobile_hero.png height: 300→400px（4 行 Hero 完整捕获）
"""

import asyncio, sys
from pathlib import Path
from datetime import datetime

async def take_screenshots():
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("请先安装：pip install playwright && playwright install chromium")
        sys.exit(1)

    target = Path(__file__).parent.parent / "index.html"
    url = f"file:///{target.as_posix()}"
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_dir = Path(__file__).parent.parent / "screenshots" / f"check_{ts}"
    out_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto(url)
        await page.wait_for_timeout(1000)

        # 1. 桌面全页
        await page.screenshot(path=out_dir / "desktop_full.png", full_page=True)

        # 2. 桌面 Hero 顶部（1440×300 · 覆盖 Hero Banner + 后续 100px）
        await page.screenshot(path=out_dir / "desktop_hero.png",
                             clip={"x":0,"y":0,"width":1440,"height":300})

        # 3. 移动端 Hero 顶部（375×400 · 4.52 改：原 300px 不足·提升 400px 覆盖完整 4 行 + TOP3 预告衔接）
        await page.set_viewport_size({"width": 375, "height": 812})
        await page.screenshot(path=out_dir / "mobile_hero.png",
                             clip={"x":0,"y":0,"width":375,"height":400})

        # 4. ★ commit 4.50：卡口结论区截图（紧跟 Hero 底部 · 含 TOP3 预告 + 头几张 choke card）
        #   动态获取 Hero 底部 y 坐标（避免硬编码 hero 高度变化导致截图偏移）
        hero_bottom = await page.evaluate("""
          () => {
            const hero = document.querySelector('.hero-banner');
            if (hero) return hero.getBoundingClientRect().bottom;
            return 200;  // 兜底：未找到 .hero-banner 时假设 Hero 高 200px
          }
        """)
        # 桌面尺寸下重新设 viewport
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.screenshot(path=out_dir / "section_signal_top3.png",
                             clip={"x":230, "y":hero_bottom, "width":1210, "height":500})

        await browser.close()

    print(f"\n截图已保存到：{out_dir}")
    print("请将以下文件发给顾问审核：")
    for f in sorted(out_dir.iterdir()):
        size_kb = f.stat().st_size / 1024
        print(f"  {f.name:30s}  {size_kb:8.1f} KB")

asyncio.run(take_screenshots())
