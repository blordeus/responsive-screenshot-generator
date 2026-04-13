@echo off
title Screenshotter GUI
echo.
echo  Starting Screenshotter GUI...
echo  Opening at http://localhost:8765
echo.

:: Run from the folder where this .bat file lives
cd /d "%~dp0"

:: Use venv if available, otherwise fall back to system Python
if exist ".venv\Scripts\python.exe" (
    set PYTHON=.venv\Scripts\python.exe
) else (
    set PYTHON=python
)

%PYTHON% app.py

:: If Python isn't found, show a helpful message
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: Could not start. For a local venv setup run:
    echo    python -m venv .venv
    echo    .venv\Scripts\pip install -r requirements.txt
    pause
)
