# Start backend + frontend (website) in twee aparte vensters, zodat je niet
# zelf meerdere terminals hoeft te openen en commando's achter elkaar te typen.
#
# Gebruik (vanuit de projectmap):
#   .\start.ps1
#
# Foutmelding "running scripts is disabled"? Draai dan:
#   powershell -ExecutionPolicy Bypass -File .\start.ps1

$Root = $PSScriptRoot

Write-Host "Backend wordt gestart in een nieuw venster (http://127.0.0.1:8000/docs)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& '$Root\start-backend.bat'"

Write-Host "Frontend (website) wordt gestart in een nieuw venster (http://localhost:3000)..."
$frontendCommand = "Set-Location '$Root\frontend'; if (-not (Test-Path node_modules)) { npm install }; npm run web"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand

Write-Host ""
Write-Host "Klaar. Er zijn nu twee vensters geopend: backend en frontend." -ForegroundColor Green
Write-Host "Sluit die vensters (of Ctrl+C erin) om ze te stoppen."
