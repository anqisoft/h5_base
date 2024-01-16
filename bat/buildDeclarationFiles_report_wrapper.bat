@ECHO OFF

cd..
start "" tsc --declaration -t esnext --emitDeclarationOnly --outDir types src\report_wrapper.ts

exit

::tsc --declaration -p .\ -t esnext --emitDeclarationOnly --outDir types