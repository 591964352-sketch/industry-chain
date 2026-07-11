' ============================================================================
' 产业链全景·静默启动器（VBS 版·ANSI 编码）
' 功能：用 WScript.Shell 调用 start-silent.bat，不显示任何窗口
' ============================================================================

Set WshShell = CreateObject("WScript.Shell")

' 设置工作目录（避免中文路径问题）
WshShell.CurrentDirectory = "D:\乌龟\产业链全景"

' 用 wscript.Exec 异步执行 bat（更可靠，比 Run 更适合长跑进程）
Set objExec = WshShell.Exec("cmd /c D:\乌龟\产业链全景\start-silent.bat")

' 立即释放（bat 自己 start /B 子进程后会自己结束）
Set objExec = Nothing
Set WshShell = Nothing
