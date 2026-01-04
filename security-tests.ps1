# Security Test Suite for delete-js-comments CLI

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Security Test Suite" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$passed = 0
$failed = 0

function Test-SecurityCheck {
    param(
        [string]$TestName,
        [string]$Command,
        [string]$ExpectedError
    )
    
    Write-Host "Test: $TestName" -ForegroundColor Yellow
    
    $output = Invoke-Expression "$Command 2>&1" | Out-String
    
    if ($output -match $ExpectedError) {
        Write-Host "  [PASS] Blocked as expected`n" -ForegroundColor Green
        $script:passed++
        return $true
    } else {
        Write-Host "  [FAIL] Did not block properly" -ForegroundColor Red
        Write-Host "  Output: $output`n" -ForegroundColor Red
        $script:failed++
        return $false
    }
}

function Test-SuccessCheck {
    param(
        [string]$TestName,
        [string]$Command
    )
    
    Write-Host "Test: $TestName" -ForegroundColor Yellow
    
    $output = Invoke-Expression "$Command 2>&1" | Out-String
    
    if ($LASTEXITCODE -eq 0 -or $output -notmatch "Error:") {
        Write-Host "  [PASS] Executed successfully`n" -ForegroundColor Green
        $script:passed++
        return $true
    } else {
        Write-Host "  [FAIL] Should have succeeded" -ForegroundColor Red
        Write-Host "  Output: $output`n" -ForegroundColor Red
        $script:failed++
        return $false
    }
}

# Create test file
@"
// This is a comment
const x = 1;
/* Multi-line
   comment */
const y = 2;
"@ | Out-File -FilePath "test-secure.js" -Encoding utf8

Write-Host "Path Traversal Tests" -ForegroundColor Cyan
Write-Host "---------------------`n" -ForegroundColor Cyan

Test-SecurityCheck `
    -TestName "Path traversal with ../" `
    -Command "node bin/cli.js ../../../Windows/System32/test.js" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Absolute Windows path" `
    -Command "node bin/cli.js C:\Windows\System32\test.js" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "UNC path" `
    -Command 'node bin/cli.js "\\server\share\file.js"' `
    -ExpectedError "Access denied"

Write-Host "`nSensitive File Tests" -ForegroundColor Cyan
Write-Host "---------------------`n" -ForegroundColor Cyan

Test-SecurityCheck `
    -TestName "Block .env file" `
    -Command "node bin/cli.js .env" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Block package-lock.json" `
    -Command "node bin/cli.js package-lock.json" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Block .npmrc" `
    -Command "node bin/cli.js .npmrc" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Block config.json" `
    -Command "node bin/cli.js config.json" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Block files with 'password'" `
    -Command "node bin/cli.js password.js" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Block files with 'secret'" `
    -Command "node bin/cli.js secret.js" `
    -ExpectedError "Access denied"

Test-SecurityCheck `
    -TestName "Block .key files" `
    -Command "node bin/cli.js private.key" `
    -ExpectedError "Access denied"

Write-Host "`nFile Type Validation Tests" -ForegroundColor Cyan
Write-Host "---------------------------`n" -ForegroundColor Cyan

Test-SecurityCheck `
    -TestName "Block .txt file" `
    -Command "node bin/cli.js test.txt" `
    -ExpectedError "Only JavaScript files"

Test-SecurityCheck `
    -TestName "Block .json file" `
    -Command "node bin/cli.js package.json" `
    -ExpectedError "Access denied|Only JavaScript files"

Test-SecurityCheck `
    -TestName "Block .exe file" `
    -Command "node bin/cli.js malware.exe" `
    -ExpectedError "Access denied|Only JavaScript files"

Write-Host "`nArgument Validation Tests" -ForegroundColor Cyan
Write-Host "-------------------------`n" -ForegroundColor Cyan

Test-SecurityCheck `
    -TestName "Missing argument for -o flag" `
    -Command "node bin/cli.js test-secure.js -o" `
    -ExpectedError "--output requires a file path"

Write-Host "`nValid Operations Tests" -ForegroundColor Cyan
Write-Host "----------------------`n" -ForegroundColor Cyan

Test-SuccessCheck `
    -TestName "Process valid JS file" `
    -Command "node bin/cli.js test-secure.js"

Test-SuccessCheck `
    -TestName "Process .mjs file" `
    -Command "@'
// comment
export const x = 1;
'@ | Out-File -FilePath 'test.mjs' -Encoding utf8; node bin/cli.js test.mjs"

Test-SuccessCheck `
    -TestName "Process .cjs file" `
    -Command "@'
// comment
const x = 1;
'@ | Out-File -FilePath 'test.cjs' -Encoding utf8; node bin/cli.js test.cjs"

Test-SuccessCheck `
    -TestName "Overwrite valid file" `
    -Command "node bin/cli.js test-secure.js --overwrite"

# Cleanup
Remove-Item -Path "test-secure.js", "test.mjs", "test.cjs" -ErrorAction SilentlyContinue

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Test Results" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "Total:  $($passed + $failed)`n" -ForegroundColor Cyan

if ($failed -eq 0) {
    Write-Host "All security tests passed!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Some security tests failed!" -ForegroundColor Red
    exit 1
}
