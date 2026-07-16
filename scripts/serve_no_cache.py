#!/usr/bin/env python3
"""本地开发服务器 · 强制禁用所有缓存
用法: python scripts/serve_no_cache.py [端口·默认8765]

Python http.server 默认不发送 Cache-Control 头，
浏览器启发式缓存导致用户看到旧版本 JS 数据文件。
本服务器对所有响应强制添加 Cache-Control: no-store。"""

import http.server
import sys
import os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
        # Add no-cache headers BEFORE calling super().end_headers()
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # 精简日志：只显示 200/304 状态
        if hasattr(self, 'command'):
            # 跳过 favicon 请求
            if 'favicon' in (args[0] if args else ''):
                return
        print(f"[{self.log_date_time_string()}] {args[0] if args else ''}")

if __name__ == '__main__':
    os.chdir(DIR)
    server = http.server.HTTPServer(('0.0.0.0', PORT), NoCacheHandler)
    print(f'[OK] No-cache dev server started on port {PORT}')
    print(f'   URL: http://localhost:{PORT}/index.html')
    print(f'   Dir: {DIR}')
    print(f'   Response: Cache-Control: no-store')
    print(f'   Press Ctrl+C to stop')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n服务器已停止')
        server.server_close()
