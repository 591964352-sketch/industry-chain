"""scripts/_check_pdf_urls.py · 用 Playwright 实际访问 2 条 dfcfw PDF URL 看是否真实可下载"""
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
        for label, url in URLS:
            ctx = await browser.new_context()
            page = await ctx.new_page()
            console_msgs = []
            page.on('console', lambda m: console_msgs.append(f'[{m.type}] {m.text}'))
            page.on('pageerror', lambda e: console_msgs.append(f'[error] {e}'))
            try:
                resp = await page.goto(url, wait_until='load', timeout=15000)
                status = resp.status if resp else 'NO RESPONSE'
                headers = resp.headers if resp else {}
                content_type = headers.get('content-type', 'N/A')
                content_length = headers.get('content-length', 'N/A')
                # Try to get body content as text
                body_text = await page.evaluate("() => document.body ? document.body.innerText : ''")
                title = await page.title()
                # Try to get raw bytes
                content_size = await page.evaluate("""async () => {
                    try {
                        const r = await fetch(window.location.href);
                        const buf = await r.arrayBuffer();
                        return buf.byteLength;
                    } catch(e) { return 'fetch error: ' + e.message; }
                }""")
                print(f'\n===== {label} =====')
                print(f'URL: {url}')
                print(f'HTTP Status: {status}')
                print(f'Content-Type: {content_type}')
                print(f'Content-Length header: {content_length}')
                print(f'Page Title: {title}')
                print(f'Body innerText (first 300): {body_text[:300]}')
                print(f'Body byte size via fetch: {content_size}')
                print(f'Console msgs: {console_msgs[:5]}')
            except Exception as e:
                print(f'\n===== {label} =====')
                print(f'URL: {url}')
                print(f'EXCEPTION: {e}')
            await ctx.close()
        await browser.close()

asyncio.run(main())