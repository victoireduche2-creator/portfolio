@echo off
setlocal enabledelayedexpansion

:: dossier courant
set "SOURCE=."

:: qualité jpg
set "QUALITY=92"

:: vérifie ImageMagick
where magick >nul 2>&1
if errorlevel 1 (
    echo ImageMagick non installe ou absent du PATH
    pause
    exit /b
)

echo Conversion PNG / HEIC / autres vers JPG...
echo.

for /r "%SOURCE%" %%F in (*.heic *.heif *.png *.bmp *.gif *.tif *.tiff *.webp *.jpeg *.jfif *.HEIC) do (
    set "OUT=%%~dpnF.jpg"
    echo Conversion : %%F
    magick "%%F" -auto-orient -background white -alpha remove -alpha off -quality %QUALITY% "!OUT!"
)

echo.
echo Termine.
pause