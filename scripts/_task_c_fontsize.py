"""scripts/_task_c_fontsize.py · 任务 C 清理 </style> 之后的 JS 字号"""
import re

fp = r'd:\乌龟\产业链全景\index.html'
with open(fp, 'r', encoding='utf-8') as f:
    content = f.read()

# 找 </style> 位置
style_end = content.index('</style>') + len('</style>')
prefix = content[:style_end]
suffix = content[style_end:]

# 在 suffix 中替换 font-size:10px / 9px / 8px → 11px
# 保留 font-size:11px / 12px / 13px / 14px / 15px / 16px / 18px / 20px 不变
patterns = [
    (r'font-size\s*:\s*10px', 'font-size:11px'),
    (r'font-size\s*:\s*9px', 'font-size:11px'),
    (r'font-size\s*:\s*8px', 'font-size:11px'),
]
counts = []
new_suffix = suffix
for pat, rep in patterns:
    n = len(re.findall(pat, new_suffix))
    new_suffix = re.sub(pat, rep, new_suffix)
    counts.append((pat, n))

new_content = prefix + new_suffix

with open(fp, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('字号清理完成:')
for pat, n in counts:
    print(f'  {pat} -> font-size:11px : {n} 处')
print(f'\n总改动: {sum(c for _, c in counts)} 处')