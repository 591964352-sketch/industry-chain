# scripts/verify_si_render_v2.py
# Playwright: storage-interface 验证 5 chokes (含 character support)
import io, sys, json, re
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.goto('http://localhost:8765/index.html#storage-interface', wait_until='networkidle', timeout=45000)
    page.wait_for_timeout(2500)
    page.evaluate('document.querySelectorAll("details").forEach(d=>d.open=true);')
    page.wait_for_timeout(500)

    out = page.evaluate('''() => {
        const out = { chokes: [] };
        const grid = document.querySelector('.choke-grid');
        if (grid) {
            // 用 .choke-card 边界, 而不是 grid 内的 div
            grid.querySelectorAll(':scope > .choke-card').forEach((c, i) => {
                const h3 = c.querySelector('h3');
                const name = h3 ? h3.textContent.trim() : '';
                const code = c.querySelector('h3 span[style*="font-muted"], h3 span[style*="color:var(--muted)"]')?.textContent.trim();
                // 找 plainNote 容器 — 用边框样式定位
                let plainNoteLen = 0, noteStart = '', noteEnd = '';
                c.querySelectorAll('div[style*="border-left:3px solid var(--accent)"]').forEach(d => {
                    const t = (d.textContent || '').trim();
                    if (t.includes('大白话') && t.length > 100) {
                        plainNoteLen = t.length;
                        noteStart = t.slice(0, 50);
                        noteEnd = t.slice(-50);
                    }
                });
                const cardRect = c.getBoundingClientRect();
                out.chokes.push({ i, name, code, plainNoteLen, noteStart, noteEnd, cardTop: Math.round(cardRect.top + window.scrollY), cardHeight: Math.round(cardRect.height) });
            });
        }
        const allTxt = document.body.innerText;
        out.chainStoryStep7Ok = /CXL 内存池化控制器[\s\S]{0,1500}前瞻卡位/.test(allTxt);
        out.chainStoryStep8Ok = /PCIe Retimer[\s\S]{0,3000}前瞻卡位[\s\S]{0,2500}没有真正专注[\s\S]{0,200}独立标的/.test(allTxt);
        // 龙迅股份不应在 5 张 choke-card 中作为独立项渲染
        const cardsTxt = Array.from(document.querySelectorAll('.choke-card')).map(c => c.textContent).join('|');
        out.longXunInSeg4 = /688486[\s\S]{0,50}龙迅股份/.test(cardsTxt);
        // seg[4] PCIe Retimer stocks 应不再含龙迅
        const segsHtml = document.body.innerHTML;
        out.seg4HasLongXun = /"name": "PCIe Retimer\/Redriver 接口"[\s\S]{0,800}龙迅股份/.test(segsHtml);
        out.speedDialExists = !!document.getElementById('choke-speed-dial');
        return out;
    }''')

    print('=== storage-interface 渲染验证 v2 ===')
    print('JS errors:', len(errs))
    print('choke-card count:', len(out['chokes']), '(预期 5)')
    expected_codes = {'688019': '安集', '688008': '澜起', '002371': '北方华创', '688012': '中微', '688120': '华海'}
    found_codes = set()
    for c in out['chokes']:
        code = (c.get('code') or '').strip()
        found_codes.add(code)
        ok = '✅' if c['plainNoteLen'] >= 350 else '⚠️'
        print(f"  [{c['i']+1}] {code} {c['name'][:40]:40s} plainNoteLen={c['plainNoteLen']:4d} {ok} 高={c['cardHeight']}px top={c['cardTop']}")
        print(f"      开头: {c['noteStart'][:60]}")
        print(f"      结尾: ...{c['noteEnd']}")
    missing = set(expected_codes.keys()) - found_codes
    if missing:
        print(f'\n❌ 缺失卡片: {missing}')
    else:
        print(f'\n✅ 全部 5 只卡片已渲染')
    print(f'\nchainStory Step 7 前瞻卡位: {"✅" if out["chainStoryStep7Ok"] else "❌"}')
    print(f'chainStory Step 8 前瞻卡位 + A股无独立标的: {"✅" if out["chainStoryStep8Ok"] else "❌"}')
    print(f'龙迅股份(688486)已从 seg[4] 移除: {"✅ 不出现" if not out["longXunInSeg4"] else "❌ 仍然存在"}')
    print(f'速度板块 (PCB/SE 专属, SI 不应渲染): {"✅ 不存在" if not out["speedDialExists"] else "❌ 存在(意外)"}')

    # 截图
    page.evaluate("document.querySelector('.choke-grid')?.scrollIntoView()")
    page.wait_for_timeout(500)
    page.screenshot(path='data/si_phase1_chokes_full.png', full_page=False)
    print(f'\n截图: data/si_phase1_chokes_full.png')
    browser.close()
