# Commit rapide et push vers origin/main
# .env, node_modules, dist sont exclus via .gitignore

$status = git status --porcelain
if (-not $status) {
    Write-Host "Aucun changement a commiter." -ForegroundColor Gray
    exit 0
}

git add -A
$msg = "chore: sync $(Get-Date -Format 'dd/MM/yyyy HH:mm')"
git commit -m $msg
if ($LASTEXITCODE -ne 0) {
    Write-Host "Echec du commit." -ForegroundColor Red
    exit 1
}
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "Code pousse sur GitHub avec succes." -ForegroundColor Green
} else {
    Write-Host "Echec du push." -ForegroundColor Red
}
