// En production (même domaine Vercel) : VITE_API_URL vide -> URL relative "/api"
// En développement local : VITE_API_URL=http://localhost:3001 (ou laisse "/api" avec proxy Vite)
const API_BASE = `${import.meta.env.VITE_API_URL || ''}/api`;

async function postJSON(path, data) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    throw new Error('Impossible de joindre le serveur. Vérifiez votre connexion.');
  }

  let result = {};
  try {
    result = await response.json();
  } catch {
    // Réponse non-JSON
  }

  if (!response.ok) {
    throw new Error(result.error || `Erreur ${response.status}`);
  }
  return result;
}

export function submitContactForm(data) {
  return postJSON('/submissions/contact', data);
}

export function submitAgencyForm(data) {
  return postJSON('/submissions/agency', data);
}
