# BORTE - GitHub push script
# Marka Git la rakibo, PowerShell-ka ku orod: .\github-push.ps1

$ErrorActionPreference = "Stop"
$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoPath

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git lama helin. Rakib Git for Windows: https://git-scm.com/download/win" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}

git add .
git status

$msg = "BORTE shopping website"
git commit -m $msg 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Wax isbeddel ah ma jiraan ama commit hore ayaa jiray." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Hadda samee GitHub repo: https://github.com/new" -ForegroundColor Cyan
Write-Host "Magaca repo tusaale: borte-shopping" -ForegroundColor Cyan
Write-Host ""
$username = Read-Host "GitHub username-kaaga geli"
$reponame = Read-Host "Magaca repo-ga geli (tusaale: borte-shopping)"

if (-not $username -or -not $reponame) {
  Write-Host "Username ama repo name ma buuxna." -ForegroundColor Red
  exit 1
}

$remote = "https://github.com/$username/$reponame.git"

git remote remove origin 2>$null
git remote add origin $remote
git push -u origin main

Write-Host ""
Write-Host "Waa la push gareeyay!" -ForegroundColor Green
Write-Host "Repo: https://github.com/$username/$reponame" -ForegroundColor Green
Write-Host "GitHub Pages: Settings > Pages > main branch > root" -ForegroundColor Green
