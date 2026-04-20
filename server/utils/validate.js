const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9\s().-]{6,30}$/;

export function clean(v, max = 500) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max);
}

export function escapeHtml(v) {
  if (v === undefined || v === null) return '';
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function validateContact(body) {
  const fname = clean(body.fname, 100);
  const lname = clean(body.lname, 100);
  const email = clean(body.email, 255);
  const phone = clean(body.phone, 50);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 5000);

  if (!fname) return { error: 'Le prénom est obligatoire.' };
  if (!email) return { error: 'L\'email est obligatoire.' };
  if (!EMAIL_RE.test(email)) return { error: 'Format d\'email invalide.' };
  if (phone && !PHONE_RE.test(phone)) return { error: 'Format de téléphone invalide.' };

  return { data: { fname, lname, email, phone, subject, message } };
}

export function validateAgency(body) {
  const agency_name = clean(body.agency_name, 200);
  const manager = clean(body.manager, 200);
  const phone = clean(body.phone, 50);
  const nb_providers = clean(body.nb_providers, 50);
  const coverage_zone = clean(body.coverage_zone, 300);

  if (!agency_name) return { error: 'Le nom de l\'agence est obligatoire.' };
  if (!manager) return { error: 'Le nom du responsable est obligatoire.' };
  if (!phone) return { error: 'Le téléphone est obligatoire.' };
  if (!PHONE_RE.test(phone)) return { error: 'Format de téléphone invalide.' };

  return { data: { agency_name, manager, phone, nb_providers, coverage_zone } };
}
