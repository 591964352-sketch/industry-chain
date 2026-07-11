"""scripts/_check_pdf_urls3.py · 用 page.context.fetch 直接拿响应字节"""
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

URLS = [
    ("华泰 2026-06-08", "https://pdf.dfcfw.com/pdf/H3_AP202606081830545678_1.pdf"),
    ("国金 2026-06-22", "https://pdf.dfcfw.com/pdf/H3_AP202606221840321234_1.pdf"),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context()
        for label, url in URLS:
            print(f'\n===== {label} =====')
            print(f'URL: {url}')
            try:
                resp = await ctx.request.get(url)
                print(f'HTTP Status: {resp.status}')
                print(f'Content-Type: {resp.headers.get("content-type", "N/A")}')
                print(f'Content-Length: {resp.headers.get("content-length", "N/A")}')
                body = await resp.body()
                print(f'Body byte size: {len(body)}')
                print(f'First 20 bytes (hex): {body[:20].hex()}')
                print(f'First 50 bytes (text, replace non-printable): {body[:50].decode("utf-8", errors="replace")}')
                if body.startswith(b'%PDF'):
                    print('✅ Valid PDF header')
                else:
                    print('❌ NOT a valid PDF (no %PDF header)')
                    if b'404' in body[:1000] or b'Not Found' in body[:1000] or b'not found' in body[:1000]:
                        print('⚠️ Body contains "404/Not Found" — empty/404 stub')
            except Exception as e:
                print(f'EXCEPTION: {type(e).__name__}: {e}')
        await browser.close()

asyncio.run(main())