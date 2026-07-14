// scripts/verify_speed_dial_6_98.js
// ★ commit 6.98 验证脚本
// 1. 模拟用户从顶部打开 PCB/SE/SI 三链页面（不滚动）
// 2. 测量 choke-speed-dial 板块位置 + 截图
// 3. 对比 PCB 与 SI 的 #section-decision 位置
'use strict';
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // 静默 JS 错误
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));

  // 测三链
  const chains = [
    { id: 'pcb',             hash: '#pcb',             label: 'PCB 印制电路板' },
    { id: 'semicon-equip',   hash: '#semicon-equip',   label: '半导体设备' },
    { id: 'storage-interface', hash: '#storage-interface', label: '存储与接口' },
  ];

  const results = [];
  for (const c of chains) {
    const url = 'http://localhost:8765/index.html' + c.hash;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // 不滚动，停留 1.5s 让 renderChain 完成
    await page.waitForTimeout(1500);
    // 测量 speed-dial 位置
    const info = await page.evaluate(() => {
      const dial = document.getElementById('choke-speed-dial');
      const decision = document.getElementById('section-decision');
      const overview = document.getElementById('section-overview');
      function bbox(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          pageTop: Math.round(r.top + window.scrollY),
          height: Math.round(r.height),
          visibleNow: r.top < window.innerHeight && r.bottom > 0,
          innerTop: Math.round(r.top),
        };
      }
      // 提取 speed-dial 内的两只股票名
      let stocks = [];
      if (dial) {
        const strongs = dial.querySelectorAll('strong');
        strongs.forEach(s => stocks.push(s.textContent.trim()));
      }
      return {
        dial: bbox(dial),
        decision: bbox(decision),
        overview: bbox(overview),
        viewportH: window.innerHeight,
        stocks,
      };
    });
    // 截图（无滚动,viewport 顶部）
    const screenshotName = `data/speeddial_${c.id}_top.png`;
    await page.screenshot({ path: screenshotName, fullPage: false });

    // 如果 speed-dial 在 viewport 内,直接看到
    const inViewport = info.dial && info.dial.innerTop < info.viewportH && info.dial.innerTop > -info.dial.height;
    results.push({
      chainId: c.id,
      chainLabel: c.label,
      errs: errs.length,
      decisionTop: info.decision?.pageTop ?? null,
      overviewTop: info.overview?.pageTop ?? null,
      dialTop: info.dial?.pageTop ?? null,
      dialHeight: info.dial?.height ?? null,
      dialInViewportAtTop: info.dial?.visibleNow === true,
      dialStocks: info.stocks,
      screenshot: screenshotName,
    });
  }

  console.log('\n=== 速览板块位置验证 (commit 6.98) ===\n');
  console.log('viewport: 1440 x 900, 模拟用户从顶部打开\n');
  for (const r of results) {
    console.log(`【${r.chainLabel}】(${r.chainId})`);
    console.log(`  • 顶部 overview:       pageTop = ${r.overviewTop}px`);
    console.log(`  • #section-decision:   pageTop = ${r.decisionTop}px`);
    console.log(`  • 速览板块 speed-dial: pageTop = ${r.dialTop}px  (高 ${r.dialHeight}px)`);
    console.log(`  • 默认打开（无滚动）时是否在 viewport 内可见: ${r.dialInViewportAtTop ? '✅ 是' : '❌ 否（需要滚动）'}`);
    console.log(`  • 包含股票: ${r.dialStocks.join(' + ')}`);
    console.log(`  • JS errors: ${r.errs}`);
    console.log(`  • 截图: ${r.screenshot}\n`);
  }
  // 差值对比
  const pcb = results.find(r => r.chainId === 'pcb');
  const si  = results.find(r => r.chainId === 'storage-interface');
  if (pcb && si) {
    console.log('=== 关键对比：PCB vs storage-interface ===');
    console.log(`  • 决策 section 位置: PCB=${pcb.decisionTop}px · SI=${si.decisionTop}px · 差距=${si.decisionTop-pcb.decisionTop}px (${(si.decisionTop-pcb.decisionTop)/1000>0?'SI 更长':'PCB 更长'})`);
    console.log(`  • 速览板块位置:     PCB=${pcb.dialTop}px · SI=${si.dialTop}px`);
  }

  await browser.close();
})();
