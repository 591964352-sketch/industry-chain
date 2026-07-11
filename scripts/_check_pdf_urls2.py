"""scripts/_check_pdf_urls2.py · 真正下载 PDF 并检查大小/内容"""
import asyncio, sys, os
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path
from playwright.async_api import async_playwright

URLS = [
    ("华泰 2026-06-08", "https://pdf.dfcfw.com/pdf/H3_AP202606081830545678_1.pdf"),
    ("国金 2026-06-22", "https://pdf.dfcfw.com/pdf/H3_AP202606221840321234_1.pdf"),
]

DOWNLOAD_DIR = Path("/tmp/pdf_downloads")
DOWNLOAD_DIR.mkdir(exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for label, url in URLS:
            ctx = await browser.new_context(accept_downloads=True)
            page = await ctx.new_page()
            print(f'\n===== {label} =====')
            print(f'URL: {url}')
            try:
                async with page.expect_download(timeout=15000) as download_info:
                    await page.goto(url, wait_until='commit', timeout=15000)
                download = await download_info.value
                suggested = download.suggested_filename
                save_path = DOWNLOAD_DIR / suggested
                await download.save_as(save_path)
                size = save_path.stat().st_size
                with open(save_path, 'rb') as f:
                    head = f.read(20)
                print(f'Suggested filename: {suggested}')
                print(f'Saved to: {save_path}')
                print(f'File size: {size} bytes')
                print(f'First 20 bytes (hex): {head.hex()}')
                print(f'First 20 bytes (text): {head}')
                if head.startswith(b'%PDF'):
                    print('✅ Valid PDF header')
                else:
                    print('❌ NOT a valid PDF (no %PDF header)')
                # Try to clean up
                save_path.unlink()
            except Exception as e:
                print(f'EXCEPTION: {type(e).__name__}: {e}')
            await ctx.close()
        await browser.close()

asyncio.run(main())