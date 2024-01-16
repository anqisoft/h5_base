@ECHO OFF
if "%1%"=="" ( exit )

set filename=%1%

set pwd=%cd%\
set root=%pwd%..\..\

set jsGoal=test\js\%filename%.js

set deno_json_path=%root%deno.json
cd %root%src\test\
start "deno bundle -c %deno_json_path% --no-check %filename%.ts %root%%jsGoal%" deno bundle -c %deno_json_path% --no-check %filename%.ts %root%%jsGoal% || pause

ping 127.0.0.1 -n 3 >nul
cd %root%bat\
compressOneJs.bat ..\%jsGoal%