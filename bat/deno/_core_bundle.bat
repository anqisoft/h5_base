@ECHO OFF
if "%1%"=="" ( exit )

set filename=%1%

set pwd=%cd%\
set root=%pwd%..\..\

set jsGoal=dist\%filename%.js

set deno_json_path=%root%deno.json
cd %root%src\
start "deno bundle -c %deno_json_path% --no-check %filename%.ts %root%%jsGoal%" deno bundle -c %deno_json_path% --no-check %filename%.ts %root%%jsGoal% || pause

ping 127.0.0.1 -n 3 >nul
cd %root%bat\deno
::echo deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\%filename%.js
::start "deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\%filename%.js" deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\%filename%.js
::echo deno run --allow-read --allow-write remove_export_statements.ts %root%%jsGoal%
start "deno run --allow-read --allow-write remove_export_statements.ts %root%%jsGoal%" deno run --allow-read --allow-write remove_export_statements.ts %root%%jsGoal%

::ping 127.0.0.1 -n 3 >nul
cd %root%bat\
start "compressOneJs.bat %root%bat\..\%jsGoal%" compressOneJs.bat ..\%jsGoal%

ping 127.0.0.1 -n 3 >nul
xcopy /y %root%dist\%filename%*.js %root%test\js\

::pause