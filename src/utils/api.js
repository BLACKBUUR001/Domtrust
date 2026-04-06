const API_BASE = 'http://localhost:3001/api';

export async function submitContactForm(data) {
  const response = await fetch(`${API_BASE}/submissions/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Erreur lors de l\'envoi');
  }

  return result;
}

export async function submitAgencyForm(data) {
  const response = await fetch(`${API_BASE}/submissions/agency`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Erreur lors de l\'envoi');
  }

  return result;
}
