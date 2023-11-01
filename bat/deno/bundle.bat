@ECHO OFF
set deno_json_path=%cd%\..\..\deno.json
cd ..\..\ts\

deno bundle -c %deno_json_path% --no-check index.ts ..\index.js || pause