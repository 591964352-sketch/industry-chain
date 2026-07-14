# scripts/verify_no_truncation_6_98d.py
# ★ commit 6.98d 验证 - 大白话解读完整可见性 + 截图
import io, sys, json
from playwright.sync_api import sync_playwright

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

BASE = 'http://localhost:8765/index.html'

# 读源数据
import re
with open('data/_plainnotes_dump.json', 'r', encoding='utf-8') as f:
    src = json.load(f)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # 默认 1440x900 → 允许 viewport 临时放大
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))

    for chain_id in ['pcb', 'semicon-equip']:
        url = BASE + '#' + chain_id
        page.goto(url, wait_until='networkidle', timeout=45000)
        page.wait_for_timeout(2500)

        # 检查 DOM 实际渲染文本 vs 源数据
        check = page.evaluate('''() => {
            const dial = document.getElementById('choke-speed-dial');
            if (!dial) return { err: 'speed-dial not found' };
            // 速度板块内只有 2 张卡(每张一个 border-left 容器)
            const cards = dial.querySelectorAll('div[style*="border-left:3px solid var(--accent)"]');
            const out = [];
            for (const card of cards) {
                const name = card.querySelector('strong')?.textContent.trim() || '';
                const codeSpan = card.querySelector('span[style*="color:var(--muted)"]');
                const code = codeSpan?.textContent.trim() || '';
                // 取容器内最后一个 div(包含大白话全文 + strong 标题)
                const divs = card.querySelectorAll('div');
                let noteHtml = '', noteText = '', noteBoxRect = null;
                for (const d of divs) {
                    const txt = (d.textContent || '').trim();
                    if (txt.length > 80) {
                        noteHtml = d.innerHTML;
                        noteText = txt;
                        noteBoxRect = d.getBoundingClientRect();
                        break;
                    }
                }
                out.push({
                    name, code,
                    textLen: noteText.length,
                    htmlLen: noteHtml.length,
                    cardHeight: Math.round(card.getBoundingClientRect().height),
                    cardTop: Math.round(card.getBoundingClientRect().top + window.scrollY),
                    noteBoxHeight: noteBoxRect ? Math.round(noteBoxRect.height) : 0,
                    noteScrollHeight: noteText.length ? Math.round(card.querySelector('div[style*="white-space:pre-wrap"]')?.scrollHeight || 0) : 0,
                    noteScrollHeightContainer: (() => {
                        const tc = card.querySelector('div[style*="white-space:pre-wrap"]');
                        if (!tc) return null;
                        return { clientH: tc.clientHeight, scrollH: tc.scrollHeight, overflow: tc.scrollHeight > tc.clientHeight };
                    })(),
                    noteStart: noteText.slice(0, 40),
                    noteEnd: noteText.slice(-40),
                });
            }
            const dialRect = dial.getBoundingClientRect();
            return { cards: out, dialHeight: Math.round(dialRect.height), dialTop: Math.round(dialRect.top + window.scrollY) };
        }''')

        print(f'\n=== {chain_id} ===')
        if 'err' in check:
            print(f'  ❌ {check["err"]}'); continue

        print(f'  speed-dial 整体: pageTop={check["dialTop"]}px, 高={check["dialHeight"]}px')
        for i, card in enumerate(check['cards']):
            src_note = src[chain_id].get(card['code'], {}).get('full', '')
            src_text = re.sub(r'<br\s*\/?>', ' / ', src_note)
            src_text = re.sub(r'<[^>]+>', '', src_text).strip()
            src_len = len(src_text)
            vis_len = card['textLen']
            truncated = '✅ 完整' if vis_len >= src_len - 3 else '❌ 截断'
            shc = card['noteScrollHeightContainer']
            print(f'  [{i}] {card["name"]}({card["code"]}):')
            print(f'       源文本(去HTML):{src_len} 字符')
            print(f'       DOM 渲染:{vis_len} 字符 - {truncated}')
            print(f'       容器 clientH={shc["clientH"] if shc else "?"} / scrollH={shc["scrollH"] if shc else "?"}'
                  + (' ⚠️ 内容溢出' if shc and shc.get('overflow') else ' ✅ 自适应撑高'))
            print(f'       卡片总高:{card["cardHeight"]}px (pageTop={card["cardTop"]})')
            print(f'       开头:"{card["noteStart"]}"')
            print(f'       结尾:"{card["noteEnd"]}"')

        # 临时 viewport 高度 = 容纳整个 speed-dial (滚动后)
        dial_top = check['dialTop']
        needed_h = check['dialHeight'] + 120
        page.set_viewport_size({'width': 1440, 'height': needed_h})
        page.evaluate(f"window.scrollTo(0, {dial_top - 60});")
        page.wait_for_timeout(500)
        ss = f'data/fulltext_{chain_id}_dial.png'
        page.screenshot(path=ss, full_page=False)
        print(f'  📸 完整速览截图(viewport {needed_h}px): {ss}')

        # 再分别截图每张卡的细节 - 用 DOM element screenshot
        page.evaluate(f"window.scrollTo(0, {dial_top - 60});")
        page.wait_for_timeout(300)
        cards_locator = page.locator('#choke-speed-dial > div > div')
        cnt = cards_locator.count()
        for j in range(cnt):
            card_loc = cards_locator.nth(j)
            full = card_loc.inner_text()
            h = card_loc.bounding_box()
            name = full.split('\n')[0] if full else f'card-{j}'
            safe_name = (name.replace(' ', '_').replace('/','_').replace('（','_').replace('）','_'))[:30]
            ss2 = f'data/fulltext_{chain_id}_card_{j}_{safe_name}.png'
            card_loc.screenshot(path=ss2)
            print(f'     📸 卡片 {j} ({name}) 局部截图: {ss2} (本地高度 {h["height"]:.0f}px)')

        # 还原
        page.set_viewport_size({'width': 1440, 'height': 900})
        page.evaluate('window.scrollTo(0, 0);')
        page.wait_for_timeout(300)

    print(f'\nJS errors: {len(errs)}')
    browser.close()
