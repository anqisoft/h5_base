::@ECHO OFF
set pwd=%cd%\

set deno_json_path=%cd%\..\..\deno.json
cd ..\..\src\

start "" deno bundle -c %deno_json_path% --no-check index.ts ..\dist\h5_base.js || pause

ping 127.0.0.1 -n 3 >nul

cd %pwd%
deno run --allow-read --allow-write remove_export_statements.ts ..\..\dist\h5_base.js

cd %pwd%..\
start "" compressJs.bat