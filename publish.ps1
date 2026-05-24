param(
  [string]$Message
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git is not installed or is not available on PATH."
  exit 1
}

if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}

$Remote = ""
try {
  $Remote = git remote get-url origin
} catch {
  $Remote = ""
}

if (-not $Remote) {
  Write-Host "No GitHub remote is configured yet."
  Write-Host "Create a GitHub repository named <your-github-username>.github.io, then run:"
  Write-Host "git remote add origin https://github.com/<your-github-username>/<your-github-username>.github.io.git"
  exit 1
}

$Branch = git branch --show-current
if (-not $Branch) {
  $Branch = "main"
  git checkout -B main
}

git add .
$Changes = git status --porcelain
if (-not $Changes) {
  Write-Host "No website changes to publish."
  exit 0
}

if (-not $Message) {
  $Message = "Update website $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

git commit -m $Message
git push origin $Branch

Write-Host "Published changes. GitHub Pages may take a minute or two to refresh."
