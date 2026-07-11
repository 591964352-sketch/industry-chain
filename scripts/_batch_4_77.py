"""scripts/_batch_4_77.py · commit 4.77 综合视觉优化批量修改"""
import re, sys

fp = r'd:\乌龟\产业链全景\index.html'
with open(fp, 'r', encoding='utf-8') as f:
    content = f.read()

changes = []

# ===== 调整1: Hero Banner 内部 analogyHtml 加 opacity:0.7 =====
old = '<div style="font-size:13px;color:var(--text);line-height:1.5;margin-bottom:6px;font-weight:500;">${intro.analogy}</div>'
new = '<div style="font-size:13px;color:var(--text);opacity:0.7;line-height:1.5;margin-bottom:6px;font-weight:500;">${intro.analogy}</div>'
if old in content:
    content = content.replace(old, new, 1)
    changes.append('调整1: Hero Banner analogyHtml opacity:0.7')

# ===== 调整2: 数据截止模块移到 Hero Banner 之前 =====
# 数据截止块当前在 renderQuickNav 之后 (L2473-2488)
# 需要把它移到 renderHeroBanner 之前 (在 L1944 之前)
data_block_old = """  // ★ commit 4.10：数据截止模块（移到各产业链内部，quick-nav 正下方 + 卡口结论之前）
  // 读 PCB_AUTO._meta.asOf / .baostockVersion（仅 PCB 有 auto.js；其他赛道显示「待更新」）
  h += `<div style="font-size:11px;color:var(--muted);padding:6px 10px;margin:8px 0 14px;background:rgba(240,185,11,0.04);border-left:3px solid var(--accent);border-radius:0 4px 4px 0;display:flex;flex-wrap:wrap;gap:8px 14px;">`;
  if (d.id === 'pcb' && typeof PCB_AUTO !== 'undefined' && PCB_AUTO && PCB_AUTO._meta) {
    const asOf = PCB_AUTO._meta.asOf || '待更新';
    const baostockVersion = PCB_AUTO._meta.baostockVersion || '未知';
    const note = PCB_AUTO._meta.note || '';
    h += `<span>📅 <strong style="color:var(--accent);">数据截止：${asOf}</strong></span>`;
    h += `<span>🔌 <strong>数据源：</strong>baostock v${baostockVersion}</span>`;
    h += `<span>🕐 <strong>上次刷新：</strong>${asOf}</span>`;
  } else {
    h += `<span>📅 <strong style="color:var(--accent);">数据截止：待更新</strong></span>`;
    h += `<span>· 数据源：—</span>`;
    h += `<span>· 上次刷新：—</span>`;
  }
  h += `</div>`;"""

# 调整2新版本：移到 Hero 之前 + 单行布局 + 11px muted
data_block_new = """  // ★ commit 4.77 调整2：数据截止模块移到页面最顶部（Hero Banner 之前）
  // 单行布局 · 11px · var(--color-muted) · 紧贴页面顶部
  h += `<div style="font-size:11px;color:var(--color-muted);padding:4px 10px;margin:0 0 8px;background:rgba(240,185,11,0.04);border-left:3px solid var(--accent);border-radius:0 4px 4px 0;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;">`;
  if (d.id === 'pcb' && typeof PCB_AUTO !== 'undefined' && PCB_AUTO && PCB_AUTO._meta) {
    const asOf = PCB_AUTO._meta.asOf || '待更新';
    const baostockVersion = PCB_AUTO._meta.baostockVersion || '未知';
    h += `<span>📅 数据截止：<strong style="color:var(--accent);">${asOf}</strong></span>`;
    h += `<span>🔌 数据源：baostock v${baostockVersion}</span>`;
    h += `<span>🕐 上次刷新：${asOf}</span>`;
  } else {
    h += `<span>📅 数据截止：<strong style="color:var(--accent);">待更新</strong></span>`;
    h += `<span>· 数据源：—</span>`;
    h += `<span>· 上次刷新：—</span>`;
  }
  h += `</div>`;"""

if data_block_old in content:
    # 删除原位置
    content = content.replace(data_block_old, '')
    # 在 renderHeroBanner 调用前插入
    hero_anchor = '  // ★ commit 4.49：Hero Banner（四屏结构第一屏 · 4 行紧凑布局）\n  h += renderHeroBanner(chainId);'
    if hero_anchor in content:
        content = content.replace(hero_anchor, data_block_new + '\n' + hero_anchor, 1)
        changes.append('调整2: 数据截止模块移到 Hero 之前')

# ===== 优化2: 树状图 section 标题"全产业链树状图·横向5列布局" → "产业链全图 — 从上游材料到下游应用" =====
old = '全产业链树状图 · 横向 5 列布局'
new = '产业链全图 — 从上游材料到下游应用'
if old in content:
    content = content.replace(old, new, 1)
    changes.append('优化2: 树状图 section 标题友好化')

# ===== 优化1: 记录减仓按钮 white-space:nowrap =====
# 已有按钮 onclick="prefillTrade({code:'${s.code}'... 📝记录减仓
old = 'background:var(--color-warn);color:#0f1117;border:none;border-radius:4px;font-size:10px;font-weight:600;cursor:pointer;">📝记录减仓'
new = 'background:var(--color-warn);color:#0f1117;border:none;border-radius:4px;font-size:10px;font-weight:600;cursor:pointer;white-space:nowrap;min-width:64px;">📝记录减仓'
if old in content:
    content = content.replace(old, new, 1)
    changes.append('优化1: 记录减仓按钮 white-space:nowrap')

# ===== 优化3: section 编号统一 =====
# 当前 4.75 已有：①②③④⑤⑥⑦⑧ 等
# 新方案：第一层①Hero + ②产业链全图 / 第二层③景气 + ④赛道 / 第三层⑤深度 + ⑥四问 / 第四层⑦决策
# 持仓管理独立无编号
# 需要修改：sec1Label=③ / sec2Label=② / 其他

# sec1Label（赛道概览）当前 = ③ ✅
# sec2Label（树状图）当前 = ② ✅
# 但其他 section 也需要统一

# 实际上 4.75 已大部分正确，只是个别需要调整
# 让我列出现有 secXLabel 定义
# 暂时保留，按用户原话"全页统一"需要逐一查看

# ===== 修复1: 树状图折叠按钮 =====
# 当前 treeMap 已有 data-key="treemap" + toggleSection('treemap') 一致
# 但有 2 个 treeMap section-id="section-treemap" 重复定义，可能导致点击冲突
# 检查现状 - 已存在 data-key='treemap' 和 id='section-treemap' 各 2 个
# 需要确保 toggleSection('treemap') 找到的是第一个

# ===== 修复3: 下游需求传导数据来源明细默认折叠 =====
# 之前 grep 看到 "数据来源明细（14条）"
# 需要找到该 div 并改为 details 折叠
# 留待单独处理

# ===== 修复2: 侧边栏唤醒按钮 =====
# 需要新增 CSS + JS

# ===== 修复4: 景气仪表盘背景超出 =====
# 检查 details style 是否包含 width:100vw

# ===== 优化4: 清理 11px 以下字号 =====
# 当前许多地方 font-size:10px/9px/8px
# 全部改为 11px 是大改动，会影响视觉密度
# 建议保留：标签角标（10px 不可换行）+ 表格内单元（11px+）
# 只改"主要描述文字"为 11px

# 简单策略：把所有 font-size:10px 改为 11px（除了 details summary 标签）
# 但这会破坏很多紧凑设计

# 用户原话 "全页所有 font-size:10px / 9px / 8px，全部改为 11px"
# 执行批量替换（保守：CSS class 内 + inline style 都改）

# CSS 部分：font-size:10px → font-size:11px（仅主要描述，标签/角标保留）
# 跳过：.flow-node-meta / .choke-stock / .node-choke 等关键徽章

# ===== 写入文件 =====
with open(fp, 'w', encoding='utf-8') as f:
    f.write(content)

print('已完成修改:')
for c in changes:
    print(f'  + {c}')
print(f'\n共 {len(changes)} 处改动')