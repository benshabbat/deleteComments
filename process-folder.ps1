# PowerShell script to process all JS files in a folder
# Usage: .\process-folder.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$FolderPath = ".",
    
    [Parameter(Mandatory=$false)]
    [switch]$Recursive,
    
    [Parameter(Mandatory=$false)]
    [switch]$Overwrite
)

Write-Host "`n=== Delete JS Comments - Folder Processor ===" -ForegroundColor Cyan
Write-Host "Folder: $FolderPath" -ForegroundColor Yellow
Write-Host "Recursive: $Recursive" -ForegroundColor Yellow
Write-Host "Overwrite: $Overwrite`n" -ForegroundColor Yellow

$files = if ($Recursive) {
    Get-ChildItem -Path $FolderPath -Filter "*.js" -Recurse -File
} else {
    Get-ChildItem -Path $FolderPath -Filter "*.js" -File
}

$processed = 0
$failed = 0

foreach ($file in $files) {
    try {
        if ($Overwrite) {
            Write-Host "Processing: $($file.Name) (overwrite)..." -NoNewline
            delete-js-comments $file.FullName --overwrite 2>&1 | Out-Null
        } else {
            $outputFile = Join-Path $file.DirectoryName "$($file.BaseName).clean.js"
            Write-Host "Processing: $($file.Name) -> $($file.BaseName).clean.js..." -NoNewline
            delete-js-comments $file.FullName $outputFile 2>&1 | Out-Null
        }
        Write-Host " ✓" -ForegroundColor Green
        $processed++
    } catch {
        Write-Host " ✗ Error: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "✓ Processed: $processed files" -ForegroundColor Green
if ($failed -gt 0) {
    Write-Host "✗ Failed: $failed files" -ForegroundColor Red
}
Write-Host ""
