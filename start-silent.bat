@echo off
REM ============================================================================
REM 产业链全景·每日启动器（ANSI 编码）
REM 功能：后台启动 HTTP server（8765 端口）
REM ============================================================================

cd /d "D:\乌龟\产业链全景"

echo [启动器] 检查 8765 端口...
netstat -ano | findstr ":8765 " >nul
if %ERRORLEVEL% NEQ 0 (
    echo [启动器] 启动 8765 静态 server...
    start "产业链-8765" /B py -m http.server 8765
) else (
    echo [启动器] 8765 已在运行
)

echo [启动器] 等待 3 秒...
timeout /t 3 /nobreak >nul

echo [启动器] 当前端口状态：
netstat -ano | findstr ":8765 " | findstr "LISTENING" >nul && echo   [√] 8765 监听中 || echo   [X] 8765 未监听

echo [启动器] 完成。可在浏览器打开 http://localhost:8765/index.html#pcb
exit
