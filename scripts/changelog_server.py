#!/usr/bin/env python3
# scripts/changelog_server.py —— 极简 HTTP 接口（commit 4.10）
# 用法：python scripts/changelog_server.py [port]
# GET /api/changelog?chain=pcb
#   返回 [{hash, date, message}, ...] —— 近 90 天 git log 中含 chain 关键词的 commit
# GET /api/changelog?chain=all
#   返回所有近 90 天 commit（不分赛道）
# index.html 在 init() 调用 renderChangelog() 前先 fetch /api/changelog，
#   接口可用：用接口数据填充面板；接口不可用：fallback 到内置 CHANGELOG 数组。

import http.server
import json
import subprocess
import sys
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # 仓库根
CHAIN_KEYWORDS = {
    'pcb': ['pcb', 'PCB'],
    'semi': ['semi', '半导体'],
    'ai-server': ['ai-server', 'AI服务器', 'ai server'],
    'hbm': ['hbm', 'HBM'],
    'robotics': ['robotics', '人形机器人', '机器人'],
    'autonomous-driving': ['autonomous', '自动驾驶', '智能驾驶'],
    'ai-apps': ['ai-apps', 'AI应用'],
    'solid-battery': ['solid-battery', '固态电池'],
    'low-altitude': ['low-altitude', '低空经济'],
    'commercial-aero': ['commercial-aero', '商业航天'],
    'liquid-cooling': ['liquid-cooling', '液冷'],
    'advanced-packaging': ['advanced-packaging', '先进封装'],
    'semicon-materials': ['semicon-materials', '半导体材料'],
    'ai-chip': ['ai-chip', 'AI芯片'],
    'network-switch': ['network-switch', '网络交换'],
    'data-center': ['data-center', '数据中心'],
    'power-supply': ['power-supply', '电源供电'],
    'copper-connect': ['copper-connect', '铜连接'],
    'server-odm': ['server-odm', '服务器ODM'],
    'ai-cloud': ['ai-cloud', 'AI云服务'],
}


def get_git_log(days: int = 90):
    """执行 git log --oneline --since=90 days ago"""
    try:
        out = subprocess.check_output(
            ['git', 'log', '--oneline', f'--since={days} days ago'],
            cwd=str(ROOT),
            stderr=subprocess.DEVNULL,
            text=True,
            encoding='utf-8',
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        return []
    commits = []
    for line in out.splitlines():
        line = line.strip()
        if not line:
            continue
        # 格式：<hash> <subject>  —— subject 可能含中文
        parts = line.split(' ', 1)
        if len(parts) < 2:
            continue
        commit_hash, message = parts[0], parts[1]
        # 取 commit 日期（用 git show -s --format=%ci 二次查询；这里简化用 commit msg 前的 hash）
        # 为减少 git 调用，date 用 message 第一段（如 'feat:' 之前的）
        commits.append({'hash': commit_hash, 'message': message})
    return commits


def get_commit_date(commit_hash: str) -> str:
    """查单个 commit 的日期（ISO 短格式 YYYY-MM-DD）"""
    try:
        out = subprocess.check_output(
            ['git', 'show', '-s', '--format=%ci', commit_hash],
            cwd=str(ROOT),
            stderr=subprocess.DEVNULL,
            text=True,
            encoding='utf-8',
        ).strip()
        # 形如 2026-06-24 11:08:25 +0800 → 取前 10 字符
        return out[:10] if out else 'unknown'
    except (subprocess.CalledProcessError, FileNotFoundError):
        return 'unknown'


def filter_by_chain(commits, chain: str):
    """按 chain 关键词过滤 commit message"""
    if chain == 'all':
        return commits
    keywords = CHAIN_KEYWORDS.get(chain, [chain])
    matched = []
    for c in commits:
        msg_lower = c['message'].lower()
        if any(kw.lower() in msg_lower for kw in keywords):
            matched.append(c)
    return matched


class ChangelogHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != '/api/changelog':
            self.send_error(404, 'Not Found')
            return
        qs = urllib.parse.parse_qs(parsed.query)
        chain = (qs.get('chain', ['all'])[0]).strip().lower()

        commits = get_git_log(days=90)
        for c in commits:
            c['date'] = get_commit_date(c['hash'])
        commits = filter_by_chain(commits, chain)

        body = json.dumps({'chain': chain, 'count': len(commits), 'commits': commits}, ensure_ascii=False).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        # 静默访问日志（避免污染终端）
        pass


def main():
    port = 8769
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    server = http.server.HTTPServer(('127.0.0.1', port), ChangelogHandler)
    print(f'changelog_server.py 启动 · http://127.0.0.1:{port}/api/changelog?chain=pcb')
    print('按 Ctrl+C 退出')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
        print('\n已停止')


if __name__ == '__main__':
    main()