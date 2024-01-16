@echo off
if "%1%"=="" ( exit )

set filename=%1%
set pwd=%cd%\
set src=%pwd%%filename%
set goal=%pwd%%filename:.js=.min.js%
start /B "" uglifyjs %src% -m -o %goal%