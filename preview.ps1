param(
  [int]$Port = 8000,
  [switch]$NoOpen
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

function Test-PortAvailable {
  param([int]$CandidatePort)
  $listener = $null
  try {
    $address = [System.Net.IPAddress]::Parse("127.0.0.1")
    $listener = [System.Net.Sockets.TcpListener]::new($address, $CandidatePort)
    $listener.Start()
    return $true
  } catch {
    return $false
  } finally {
    if ($listener) {
      $listener.Stop()
    }
  }
}

while (-not (Test-PortAvailable -CandidatePort $Port)) {
  $Port += 1
}

$Url = "http://127.0.0.1:$Port/"
Write-Host "Preview available at $Url"
Write-Host "Press Ctrl+C to stop the preview server."

if (-not $NoOpen) {
  Start-Process -FilePath powershell -WindowStyle Hidden -ArgumentList @(
    "-NoProfile",
    "-Command",
    "Start-Sleep -Milliseconds 700; Start-Process '$Url'"
  )
}

python -m http.server $Port --bind 127.0.0.1
