@echo off
REM ============================================================================
REM 产业链全景·启动项安装器
REM 功能：把 start-silent.vbs 的快捷方式复制到 Windows 启动文件夹
REM       实现「开机自启 → 双击浏览器收藏夹即可打开网页」
REM
REM 使用：双击本 bat · 一键完成配置
REM 后续：每日开机后 5-10 秒，两个 server 自动起
REM       浏览器点收藏夹 → http://localhost:8765/index.html#pcb
REM ============================================================================

echo [安装器] 准备配置开机自启...

REM Windows 启动文件夹路径
set STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup

REM 检查启动文件夹是否存在
if not exist "%STARTUP_FOLDER%" (
    echo [错误] 找不到启动文件夹：%STARTUP_FOLDER%
    echo [提示] 请手动按 Win+R → 输入 shell:startup → 回车
    pause
    exit /b 1
)

REM 源文件路径
set SOURCE_VBS=D:\乌龟\产业链全景\start-silent.vbs
set SHORTCUT_NAME=产业链全景-启动器.lnk

if not exist "%SOURCE_VBS%" (
    echo [错误] 找不到源文件：%SOURCE_VBS%
    pause
    exit /b 1
)

REM 用 PowerShell 创建快捷方式（避免第三方工具依赖）
echo [安装器] 创建快捷方式...
powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%STARTUP_FOLDER%\%SHORTCUT_NAME%'); $s.TargetPath = '%SOURCE_VBS%'; $s.WorkingDirectory = 'D:\乌龟\产业链全景'; $s.WindowStyle = 7; $s.Description = '产业链全景·每日启动两个 HTTP server（8765 静态 + 8081 机构信号）'; $s.Save()"

if exist "%STARTUP_FOLDER%\%SHORTCUT_NAME%" (
    echo.
    echo [安装器] ✓ 配置成功！
    echo.
    echo 下一步：
    echo   1. 在浏览器收藏夹添加：http://localhost:8765/index.html#pcb
    echo   2. 每日开机后等待 5 秒，两个 server 自动启动
    echo   3. 浏览器点收藏夹即可打开产业链全景（含机构信号）
    echo.
    echo 启动项位置：%STARTUP_FOLDER%\%SHORTCUT_NAME%
) else (
    echo [错误] 创建快捷方式失败
)

pause