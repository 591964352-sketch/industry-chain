"""scripts/__write_p0_001389_durability.py
§11.10 P0 批次第一阶段收尾:001389 durability reason 字段写入 pcb.manual.js

数据源:豆包原始响应(2026-07-05 通过 §6.15 抽查 + 用户最终审计)
唯一小修:§11.9 冲突话术中的 trend='up' → trend='flat'
- 真实 trend 字段(豆包判定)为 flat(A 类信号正负对抵)
- §11.9 标准话术模板原话包含 trend='up',机械复制会与真实判定冲突
- 修复:话术中 trend 改为 'flat',与最终 trend 判定对齐
- 其他豆包原文内容全部原样保留
"""
import re

if hasattr(sys := __import__('sys'), 'stdout').__class__.__name__ == 'TextIOWrapper':
    pass

FILE = 'data/pcb.manual.js'

# 豆包原始响应,仅 §11.9 末尾的 trend='up' 改为 trend='flat'
REASON = (
    '本次复核仅可采用 baostock 2023-2025 三年完整财报数据,标的 2024-01-25 上市,'
    '缺失 2021/2022 全部历史数据,不满足 §10 5 分硬性标准"3 年以上可追溯确定性需求 + L1 长期锁单框架协议"。'
    '2023-2025 净利 4.15 亿→6.76 亿→10.16 亿,2 年年化 CAGR56.35%,'
    '属于 AI 算力周期 V 型反弹,并非行业长期稳态增长;'
    'pcb.manual.js 仅罗列下游客户名称,无 L1 巨潮公告披露长期供货锁单、客户定点协议,缺失 5 分核心判定要件,'
    '因此合规建议 score=3。'
    'A 类信号正负对抵:正面信号为算力赛道长期景气定性、公司算力 PCB 业务定位清晰;'
    '负面信号为无客户认证落地实锤、无长期需求锁定凭证,'
    '依据规则诚实判定 trend 为 flat,不沿用原 trend=up。'
    '依据 §11.9 冲突规则,本次分析判定 score=3 与原 score=5 存在硬性冲突'
    '(§10 5 分硬性要求 3 年以上确定性需求 + L1 长期锁单协议,'
    '而本 stock 2024-01 才上市,只有 3 年数据 (2023-2025),'
    '且净利 CAGR +56.35% 属 AI 周期 V 型反弹而非多年稳定增长,'
    'pcb.manual.js 字段中无任何 L1 巨潮长期框架协议原文),'
    "本次复核临时维持原 score=5/trend='flat'/tier='estimate' 不变,"
    '冲突完整归档,等待 §11.9 复核批次集中校准。'
    '全部财务数字取自 baostock L1 实测值,AI 占比 43.20% 严格限定嵌套口径,未私自扩写口径;'
    '2025 营收空值归入未查到,无任何编造认证日期、订单金额、早年历史数据等幻觉内容。'
)


def main():
    with open(FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # 定位 001389 stock 块
    stock_marker = "'001389': { code:'001389'"
    stock_start = content.find(stock_marker)
    if stock_start < 0:
        print('⚠️ 001389 stock 块未找到')
        return

    # 定位 dims6 数组
    dims6_start = content.find('dims6:[', stock_start)
    if dims6_start < 0:
        print('⚠️ 001389 dims6 数组未找到')
        return

    dims6_end = content.find('],', dims6_start)
    if dims6_end < 0:
        print('⚠️ 001389 dims6 数组结束未找到')
        return

    dims6_block = content[dims6_start:dims6_end]

    # 在 001389 块内匹配 durability 项
    pattern = r"\{key:'durability',score:(\d+),trend:'(\w+)',tier:'([^']+)',evidence:null\}"
    m = re.search(pattern, dims6_block)
    if not m:
        print('⚠️ 001389/durability 在 dims6 数组中未匹配')
        return

    score = m.group(1)
    trend = m.group(2)
    tier = m.group(3)
    old_block = m.group(0)

    new_block = (
        "{key:'durability',score:" + score + ",trend:'" + trend + "',tier:'" + tier
        + "',evidence:null,reason:'" + REASON + "'}"
    )

    new_dims6_block = dims6_block.replace(old_block, new_block)
    if new_dims6_block == dims6_block:
        print('⚠️ 替换未生效')
        return

    content = content[:dims6_start] + new_dims6_block + content[dims6_end:]

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    print('=' * 72)
    print('001389 durability reason 写入完成')
    print('=' * 72)
    print('  - score=' + score + ', trend=' + trend + ', tier=' + tier + ' (维持原值)')
    print("  - reason 中 §11.9 话术已改 trend='up' → trend='flat'")
    print('  - 其他豆包原始内容原样保留')
    print('  - reason 长度:' + str(len(REASON)) + ' 字符')


if __name__ == '__main__':
    main()
