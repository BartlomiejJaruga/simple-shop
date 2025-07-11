@echo off
title Start Simple-Shop

set MINIWEB=miniweb.exe
set PORT=8080

start cmd /k "echo Starting MiniWeb Server... & echo [INFO] Close this cmd window to stop the server [INFO] & %MINIWEB% -p %PORT%"

timeout /t 1 > nul

start http://localhost:%PORT%

exit
