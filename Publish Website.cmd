@echo off
set /p MESSAGE=Commit message, or press Enter for an automatic message: 
if "%MESSAGE%"=="" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publish.ps1"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publish.ps1" "%MESSAGE%"
)
pause
