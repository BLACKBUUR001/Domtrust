$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = Get-Location
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

Write-Host "👀 Surveillance active sur DomTrust... (Appuyez sur Ctrl+C pour arrêter)" -ForegroundColor Cyan

while($true) {
    $change = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::All, 10000)
    if($change.TimedOut -eq $false) {
        # On attend 2 secondes de plus pour laisser le temps aux sauvegardes multiples de finir
        Start-Sleep -Seconds 2
        Write-Host "🚀 Modification détectée ! synchronisation..." -ForegroundColor Yellow
        git add .
        # On vérifie s'il y a vraiment quelque chose à committer
        $status = git status --porcelain
        if ($status) {
            git commit -m "Auto-sync : $(Get-Date -Format 'dd/MM HH:mm:ss')" --quiet
            git push origin main --quiet
            Write-Host "✅ GitHub mis à jour à $(Get-Date -Format 'HH:mm:ss') !" -ForegroundColor Green
        } else {
            Write-Host "ℹ️ Rien à synchroniser finalement." -ForegroundColor Gray
        }
    }
}
