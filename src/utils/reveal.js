// Scroll reveal utility — retourne une fonction cleanup
export function initReveal() {
  let observer = null;
  const timeoutId = setTimeout(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!els.length) return;
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => observer.observe(el));
  }, 50);

  return () => {
    clearTimeout(timeoutId);
    if (observer) observer.disconnect();
  };
}

// Toast notification
let toastTimer = null;
export function showToast(msg) {
  const existing = document.getElementById('global-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'global-toast';
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span><span>${msg || 'Message envoyé avec succès !'}</span>`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}
