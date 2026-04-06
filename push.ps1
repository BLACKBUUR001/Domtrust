git add .
$msg = "Mise à jour du code le " + (Get-Date -Format "dd/MM/yyyy HH:mm")
git commit -m $msg
git push origin main
Write-Host "✅ Code mis à jour sur GitHub avec succès !" -ForegroundColor Green
pause
