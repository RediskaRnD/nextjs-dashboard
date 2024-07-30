@echo off
cd /d "%~dp0"
pg_dump --schema-only -d dashboard -U postgres > schema.sql && sqlc generate && exit
pause