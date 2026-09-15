# Zet de code uit frontend/ in een React Native-project.
#
# Voorwaarde (eenmalig, handmatig, want interactief):
#   npx @react-native-community/cli init DeKastKiosk
# Draai dat commando vanuit de map BOVEN deze projectmap, zodat er een map
# "DeKastKiosk" naast "Hackaton1" ontstaat. Draai dit script daarna.
#
# Gebruik:
#   .\setup-frontend.ps1
#   .\setup-frontend.ps1 -TargetPath "C:\pad\naar\DeKastKiosk"

param(
    [string]$TargetPath = (Join-Path $PSScriptRoot "..\DeKastKiosk")
)

$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot
$FrontendSrc = Join-Path $RepoRoot "frontend"

$TargetPath = [System.IO.Path]::GetFullPath($TargetPath)

if (-not (Test-Path (Join-Path $TargetPath "package.json"))) {
    Write-Host "Geen React Native-project gevonden op: $TargetPath" -ForegroundColor Red
    Write-Host "Maak het eerst aan met (vanuit de map boven dit project):"
    Write-Host "  npx @react-native-community/cli init DeKastKiosk"
    Write-Host "Of geef het juiste pad mee: .\setup-frontend.ps1 -TargetPath ""C:\pad\naar\DeKastKiosk"""
    exit 1
}

Write-Host "[1/5] App-code kopieren naar $TargetPath\src ..."
$TargetSrc = Join-Path $TargetPath "src"
if (Test-Path $TargetSrc) {
    Remove-Item $TargetSrc -Recurse -Force
}
Copy-Item (Join-Path $FrontendSrc "src") $TargetSrc -Recurse -Force

Write-Host "[2/5] Dependencies samenvoegen in package.json ..."
$sourcePkg = Get-Content (Join-Path $FrontendSrc "package.json") -Raw | ConvertFrom-Json
$targetPkgPath = Join-Path $TargetPath "package.json"
$targetPkg = Get-Content $targetPkgPath -Raw | ConvertFrom-Json

if (-not $targetPkg.dependencies) {
    $targetPkg | Add-Member -NotePropertyName dependencies -NotePropertyValue ([PSCustomObject]@{})
}
if (-not $targetPkg.devDependencies) {
    $targetPkg | Add-Member -NotePropertyName devDependencies -NotePropertyValue ([PSCustomObject]@{})
}

foreach ($prop in $sourcePkg.dependencies.PSObject.Properties) {
    $targetPkg.dependencies | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value -Force
}
foreach ($prop in $sourcePkg.devDependencies.PSObject.Properties) {
    $targetPkg.devDependencies | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value -Force
}

$targetPkg | ConvertTo-Json -Depth 10 | Set-Content $targetPkgPath -Encoding utf8

Write-Host "[3/5] index.js aanpassen naar ./src/App ..."
$indexJsPath = Join-Path $TargetPath "index.js"
if (Test-Path $indexJsPath) {
    $content = Get-Content $indexJsPath -Raw
    $patched = $content -replace "from\s+['""]\./App['""]", "from './src/App'"
    Set-Content $indexJsPath $patched -Encoding utf8
} else {
    Write-Host "  Waarschuwing: index.js niet gevonden, sla deze stap over." -ForegroundColor Yellow
}

Write-Host "[4/5] NFC-permissie toevoegen aan AndroidManifest.xml ..."
$manifestPath = Join-Path $TargetPath "android\app\src\main\AndroidManifest.xml"
if (Test-Path $manifestPath) {
    $manifest = Get-Content $manifestPath -Raw
    if ($manifest -notmatch "android\.permission\.NFC") {
        $manifest = $manifest -replace "(<manifest[^>]*>)", "`$1`n    <uses-permission android:name=""android.permission.NFC"" />"
        Set-Content $manifestPath $manifest -Encoding utf8
    } else {
        Write-Host "  NFC-permissie stond er al in."
    }
} else {
    Write-Host "  Waarschuwing: AndroidManifest.xml niet gevonden, sla deze stap over." -ForegroundColor Yellow
}

Write-Host "[5/5] npm install draaien ..."
Push-Location $TargetPath
npm install
Pop-Location

Write-Host ""
Write-Host "Klaar. Start de app voortaan met:" -ForegroundColor Green
Write-Host "  cd `"$TargetPath`""
Write-Host "  npm run android"
