"""scripts/_task_b_three_col.py · 任务 B 三列并排修改"""
import re

fp = r'd:\乌龟\产业链全景\index.html'
with open(fp, 'r', encoding='utf-8') as f:
    content = f.read()

# ===== 标记三个卡片的精确位置（按注释锚点定位） =====
# 1. 景气六维卡 起点
SIX_START = '  // ★ 升级九 STEP 2B：景气六维卡（可选字段，没填 prosperity 就不渲染；0 CSS 增量，全 inline 复用 var(--*) 调色板）'
SIX_END = '    h += `</div>`;\n  }\n  // ★ 升级三：周期位置卡片（可选字段，没填 cyclePosition 就不渲染）'

# 2. 周期位置卡 起点（独立 if 块）
CYCLE_START = '  // ★ 升级三：周期位置卡片（可选字段，没填 cyclePosition 就不渲染）'
CYCLE_END = '    h += `</div>`;\n  }\n  // ★ 阶段四 commit 4.3：买入信号 A/B 监测 section（program-derived · commit 3.4 注入 · 读取 CHAINS.pcb.signalMeta.stats）'

# 3. 买入信号 A/B 卡
SIGNAL_START = '  // ★ 阶段四 commit 4.3：买入信号 A/B 监测 section（program-derived · commit 3.4 注入 · 读取 CHAINS.pcb.signalMeta.stats）'
SIGNAL_END = '    h += `</div>`;\n  }\n\n  // ★ 阶段五 commit 4.19：信号 C 监测 card（在 ① section 内·紧跟 A/B 监测之后）'

# ===== 方案：在 section-prosperity 起始处声明 hThreeCol，结束后条件渲染 =====

# 1. 在 section-prosperity 起始声明 hThreeCol=''
ANCHOR_NEW = 'h += `<div class="section-desc">数据来源：公开研报及行业数据交叉验证。</div><div class="overview-grid">`;'
ANCHOR_NEW_NEW = 'h += `<div class="section-desc">数据来源：公开研报及行业数据交叉验证。</div><div class="overview-grid">`;\n  let hThreeCol = "";'
if ANCHOR_NEW in content:
    content = content.replace(ANCHOR_NEW, ANCHOR_NEW_NEW, 1)
    print('+ 声明 hThreeCol')
else:
    print('FAIL: ANCHOR_NEW not found')

# 2. 关闭 overview-grid 后,补一个 h += '</div>'
# 找到 "  });\n  // ★ 升级九 STEP 2B" 模式
ANCHOR_OVERVIEW_END = '  });\n  // ★ 升级九 STEP 2B：景气六维卡'
ANCHOR_OVERVIEW_END_NEW = '  });\n  h += `</div>`;\n  // ★ 升级九 STEP 2B：景气六维卡'
if ANCHOR_OVERVIEW_END in content:
    content = content.replace(ANCHOR_OVERVIEW_END, ANCHOR_OVERVIEW_END_NEW, 1)
    print('+ overview-grid 显式关闭')
else:
    print('FAIL: ANCHOR_OVERVIEW_END not found')

# 3. 把三张卡的 h += 改为 hThreeCol +=（卡片内 margin-top:18px 改 0）
# 三张卡卡片起始位置都是 `<div class="card" style="padding:20px;margin-top:18px;...`
# 但景气六维卡含有 radar-wrap 复杂结构。处理 margin-top:18px → 0 需要谨慎。

# 用 Python regex 替换六维卡内所有 h +=  → hThreeCol += (在景气六维卡范围内)
six_block_match = re.search(re.escape(SIX_START) + r'[\s\S]+?' + re.escape(SIX_END.split('\n')[0]), content)
if six_block_match:
    six_block = six_block_match.group(0)
    # 替换 margin-top:18px → margin-top:0 (限定本块)
    six_block_new = six_block.replace('margin-top:18px', 'margin-top:0')
    # 替换 h += → hThreeCol += (在本块内)
    six_block_new = six_block_new.replace('h += ', 'hThreeCol += ')
    content = content.replace(six_block, six_block_new)
    print('+ 景气六维卡 改 hThreeCol')
else:
    print('FAIL: six_block not found')

# 周期位置卡
cycle_block_match = re.search(re.escape(CYCLE_START) + r'[\s\S]+?' + re.escape(CYCLE_END.split('\n')[0]), content)
if cycle_block_match:
    cycle_block = cycle_block_match.group(0)
    cycle_block_new = cycle_block.replace('margin-top:18px', 'margin-top:0')
    cycle_block_new = cycle_block_new.replace('h += ', 'hThreeCol += ')
    content = content.replace(cycle_block, cycle_block_new)
    print('+ 周期位置卡 改 hThreeCol')
else:
    print('FAIL: cycle_block not found')

# 买入信号 A/B 卡
signal_block_match = re.search(re.escape(SIGNAL_START) + r'[\s\S]+?' + re.escape(SIGNAL_END.split('\n')[0]), content)
if signal_block_match:
    signal_block = signal_block_match.group(0)
    signal_block_new = signal_block.replace('margin-top:18px', 'margin-top:0')
    signal_block_new = signal_block_new.replace('margin-top:14px', 'margin-top:0')
    signal_block_new = signal_block_new.replace('h += ', 'hThreeCol += ')
    content = content.replace(signal_block, signal_block_new)
    print('+ 买入信号卡 改 hThreeCol')
else:
    print('FAIL: signal_block not found')

# 4. 在 section 闭合前 (L3462 的 h += '</div>') 之前加 grid 容器
# 找到 section-prosperity 结束位置
SEC_END_ANCHOR = '  // ★ commit 4.62：持仓管理信号 card 已上移到 SECTION ① 顶部（紧跟 section 标题·在 signalC TOP3 之前）\n  //   原位置（原 L2649-L2875）已删除·避免重复渲染\n\n  h += `</div>`;'
SEC_END_ANCHOR_NEW = '''  // ★ commit 4.62：持仓管理信号 card 已上移到 SECTION ① 顶部（紧跟 section 标题·在 signalC TOP3 之前）
  //   原位置（原 L2649-L2875）已删除·避免重复渲染

  // ★ commit 4.77 布局调整3：景气六维 + 周期位置 + 买入信号三列并排
  if (hThreeCol) h += `<div style="display:grid;grid-template-columns:1fr 1fr 2fr;gap:16px;margin-top:18px;align-items:start;">` + hThreeCol + `</div>`;

  h += `</div>`;'''
if SEC_END_ANCHOR in content:
    content = content.replace(SEC_END_ANCHOR, SEC_END_ANCHOR_NEW, 1)
    print('+ 插入三列 grid 容器')
else:
    print('FAIL: SEC_END_ANCHOR not found')

# 5. 38 只距离表加 details 默认折叠
# 找到 "📏 信号 C 距离显示（38 只扫描池 · 按总距离升序 · 越小越接近触发）"
DIST_TABLE_ANCHOR = '''h += `<div style="font-size:12px;color:var(--muted);font-weight:600;margin-top:16px;margin-bottom:4px;">📏 信号 C 距离显示（38 只扫描池 · 按总距离升序 · 越小越接近触发）</div>`;
    h += `<div style="font-size:10px;color:var(--muted);margin-bottom:8px;line-height:1.5;">阈值：PE 回调 ≥ 15pp · 股价回撤 ≥ 15% · 缩量 volRatio5d ≤ 1.5 · 全部满足才触发信号 C 条件 A</div>`;
    // ★ commit 4.50：distStocks 计算提取为 computeDistStocks(d) 内部函数·复用避免 38 只循环+sort 重复
    const distStocks = computeDistStocks(d);
    // 渲染距离表（前 20 只 + 显示「全部 38 只」可滚动）
    h += `<div class="tbl-scroll"><table class="stock-tbl" style="font-size:12px;table-layout:fixed;word-break:keep-all;">`;'''

DIST_TABLE_ANCHOR_NEW = '''// ★ commit 4.77 调整3：38 只距离表默认折叠（details/summary）
    h += `<details style="margin-top:16px;margin-bottom:8px;"><summary style="cursor:pointer;list-style:none;outline:none;font-size:12px;color:var(--muted);font-weight:600;">📏 查看全部 38 只距离 · 按总距离升序</summary>`;
    h += `<div style="margin-top:8px;font-size:10px;color:var(--muted);line-height:1.5;">阈值：PE 回调 ≥ 15pp · 股价回撤 ≥ 15% · 缩量 volRatio5d ≤ 1.5 · 全部满足才触发信号 C 条件 A</div>`;
    // ★ commit 4.50：distStocks 计算提取为 computeDistStocks(d) 内部函数·复用避免 38 只循环+sort 重复
    const distStocks = computeDistStocks(d);
    // 渲染距离表（前 20 只 + 显示「全部 38 只」可滚动）
    h += `<div class="tbl-scroll"><table class="stock-tbl" style="font-size:12px;table-layout:fixed;word-break:keep-all;">`;'''

# 找到距离表结束标签 </table></div> 后加 </details>
DIST_TABLE_END_ANCHOR = '''    h += `</tbody></table></div>`;

    // ★ commit 4.26：信号 C 触发历史（localStorage · 累积复盘数据）'''
DIST_TABLE_END_ANCHOR_NEW = '''    h += `</tbody></table></div>`;
    h += `</details>`;

    // ★ commit 4.26：信号 C 触发历史（localStorage · 累积复盘数据）'''

if DIST_TABLE_ANCHOR in content:
    content = content.replace(DIST_TABLE_ANCHOR, DIST_TABLE_ANCHOR_NEW, 1)
    print('+ 距离表折叠开启')
else:
    print('FAIL: DIST_TABLE_ANCHOR not found')

if DIST_TABLE_END_ANCHOR in content:
    content = content.replace(DIST_TABLE_END_ANCHOR, DIST_TABLE_END_ANCHOR_NEW, 1)
    print('+ 距离表折叠关闭')
else:
    print('FAIL: DIST_TABLE_END_ANCHOR not found')

# 写入
with open(fp, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n=== 任务 B 完成 ===')