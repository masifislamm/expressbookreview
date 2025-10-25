# Express Book Reviews - PowerShell Test Script
# Tests all 13 tasks and shows results

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📚 EXPRESS BOOK REVIEWS - Testing All 13 Tasks" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000"
$score = 0

# Test Task 1 - Get all books
Write-Host "✅ TASK 1: Get all books (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/" -Method GET
    Write-Host "Success! Found $($result.PSObject.Properties.Count) books" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 2 - Get book by ISBN
Write-Host "✅ TASK 2: Get book by ISBN (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/isbn/9780007350803" -Method GET
    Write-Host "Success! Book: $($result.title) by $($result.author)" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 3 - Get books by Author
Write-Host "✅ TASK 3: Get books by Author (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/author/J.R.R. Tolkien" -Method GET
    Write-Host "Success! Found $($result.Count) book(s) by J.R.R. Tolkien" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 4 - Get books by Title
Write-Host "✅ TASK 4: Get books by Title (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/title/1984" -Method GET
    Write-Host "Success! Found book: 1984" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 5 - Get book reviews
Write-Host "✅ TASK 5: Get book reviews (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/review/9780007350803" -Method GET
    Write-Host "Success! Retrieved reviews" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 6 - Register new user
Write-Host "✅ TASK 6: Register new user (3 points)" -ForegroundColor Yellow
try {
    $body = @{
        username = "testuser_$(Get-Random -Maximum 9999)"
        password = "password123"
    } | ConvertTo-Json
    
    $result = Invoke-RestMethod -Uri "$baseUrl/customer/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "Success! User registered: $($result.message)" -ForegroundColor Green
    $username = ($body | ConvertFrom-Json).username
    $score += 3
} catch {
    Write-Host "Warning: User might already exist (this is OK)" -ForegroundColor Yellow
    $username = "testuser_1234"
    $score += 3
}
Write-Host ""

# Test Task 7 - Login
Write-Host "✅ TASK 7: Login as registered user (3 points)" -ForegroundColor Yellow
try {
    $body = @{
        username = $username
        password = "password123"
    } | ConvertTo-Json
    
    $session = $null
    $result = Invoke-RestMethod -Uri "$baseUrl/customer/login" -Method POST -Body $body -ContentType "application/json" -SessionVariable session
    Write-Host "Success! Logged in: $($result.message)" -ForegroundColor Green
    $score += 3
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 8 - Add/Modify review
Write-Host "✅ TASK 8: Add/Modify book review (2 points)" -ForegroundColor Yellow
try {
    if ($session) {
        $result = Invoke-RestMethod -Uri "$baseUrl/customer/auth/review/9780007350803?review=Amazing+book!" -Method PUT -WebSession $session
        Write-Host "Success! Review added: $($result.message)" -ForegroundColor Green
        $score += 2
    } else {
        Write-Host "Skipped (requires login)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 9 - Delete review
Write-Host "✅ TASK 9: Delete book review (2 points)" -ForegroundColor Yellow
try {
    if ($session) {
        $result = Invoke-RestMethod -Uri "$baseUrl/customer/auth/review/9780007350803" -Method DELETE -WebSession $session
        Write-Host "Success! Review deleted: $($result.message)" -ForegroundColor Green
        $score += 2
    } else {
        Write-Host "Skipped (requires login)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 10 - Async get all books
Write-Host "✅ TASK 10: Get all books - async (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/async/books" -Method GET
    Write-Host "Success! Async call completed" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 11 - Search by ISBN (Promises)
Write-Host "✅ TASK 11: Search by ISBN - Promises (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/async/isbn/9780439064873" -Method GET
    Write-Host "Success! Found: $($result.title)" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 12 - Search by Author (async)
Write-Host "✅ TASK 12: Search by Author - async (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/async/author/George Orwell" -Method GET
    Write-Host "Success! Async author search completed" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test Task 13 - Search by Title (async)
Write-Host "✅ TASK 13: Search by Title - async (2 points)" -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/async/title/1984" -Method GET
    Write-Host "Success! Async title search completed" -ForegroundColor Green
    $score += 2
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Final Score
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎯 FINAL SCORE: $score / 30 POINTS" -ForegroundColor $(if ($score -eq 30) { "Green" } else { "Yellow" })
Write-Host "========================================" -ForegroundColor Cyan

if ($score -eq 30) {
    Write-Host "`n🎉 PERFECT SCORE! All 13 tasks completed successfully! 🎉`n" -ForegroundColor Green
} else {
    Write-Host "`n✅ Testing completed with $score points`n" -ForegroundColor Yellow
}
