@echo off
title Start Simple-Shop

set MINIWEB=server\miniweb.exe
set PORT=8080
set ROOT=.

start cmd /k "echo Starting MiniWeb Server... & echo [INFO] Close this cmd window to stop the server [INFO] & echo. & %MINIWEB% -p %PORT% -d %ROOT%"

timeout /t 1 > nul

start http://localhost:%PORT%

exit
