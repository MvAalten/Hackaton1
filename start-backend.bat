@echo off
REM Start de backend (FastAPI) met een dubbelklik.
REM Maakt de virtuele omgeving aan als die nog niet bestaat, installeert
REM dependencies indien nodig, en start daarna de server.

setlocal
cd /d "%~dp0backend"

if not exist ".venv\Scripts\python.exe" (
    echo [1/3] Virtuele omgeving aanmaken...
    python -m venv .venv
    if errorlevel 1 (
        echo Kon geen virtuele omgeving aanmaken. Is Python geinstalleerd en in PATH?
        pause
        exit /b 1
    )
) else (
    echo [1/3] Virtuele omgeving bestaat al, wordt overgeslagen.
)

echo [2/3] Dependencies installeren/controleren...
".venv\Scripts\python.exe" -m pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo Installeren van dependencies is mislukt.
    pause
    exit /b 1
)

echo [3/3] Server starten op http://127.0.0.1:8000 (docs: /docs)...
start "" http://127.0.0.1:8000/docs
".venv\Scripts\python.exe" -m uvicorn app.main:app --reload

pause
