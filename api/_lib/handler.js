import pool, { initDB } from '../../server/db.js';
import { sendContactEmail, sendAgencyEmail } from '../../server/utils/mailer.js';
import { validateContact, validateAgency } from '../../server/utils/validate.js';

let dbReady = null;
function ensureDB() {
  if (!dbReady) dbReady = initDB();
  return dbReady;
}

const MAX_BODY = 32 * 1024;
const rateMap = new Map();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_MAX = 10;

function checkRate(ip) {
  const now = Date.now();
  const arr = (rateMap.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  if (arr.length >= RATE_MAX) {
    rateMap.set(ip, arr);
    return false;
  }
  arr.push(now);
  rateMap.set(ip, arr);
  return true;
}

function getIP(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return await new Promise((resolve, reject) => {
    let raw = '';
    let bytes = 0;
    req.on('data', chunk => {
      bytes += chunk.length;
      if (bytes > MAX_BODY) {
        reject(new Error('Corps de requête trop volumineux'));
        req.destroy();
        return;
      }
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch { reject(new Error('JSON invalide')); }
    });
    req.on('error', reject);
  });
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
  const devOk = origin && /^http:\/\/(localhost|127\.0\.0\.1):(5173|4173)$/.test(origin);
  if (origin && (allowed.includes(origin) || devOk)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function createSubmissionHandler({ kind, table, columns, sendEmail, validate }) {
  return async function handler(req, res) {
    applyCors(req, res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    if (!checkRate(getIP(req))) {
      return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans quelques minutes.' });
    }

    let body;
    try {
      body = await readBody(req);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { error, data } = validate(body || {});
    if (error) return res.status(400).json({ error });

    try {
      await ensureDB();
      const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
      const values = columns.map(c => data[c]);
      const result = await pool.query(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, created_at`,
        values
      );

      sendEmail(data).catch(err => console.error(`Email ${kind}:`, err.message));

      return res.status(201).json({
        success: true,
        message: kind === 'agency' ? 'Candidature envoyée avec succès !' : 'Message envoyé avec succès !',
        id: result.rows[0].id
      });
    } catch (err) {
      console.error(`Erreur ${kind}:`, err.message);
      return res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
    }
  };
}

export const contactHandler = createSubmissionHandler({
  kind: 'contact',
  table: 'contact_submissions',
  columns: ['fname', 'lname', 'email', 'phone', 'subject', 'message'],
  validate: validateContact,
  sendEmail: sendContactEmail
});

export const agencyHandler = createSubmissionHandler({
  kind: 'agency',
  table: 'agency_submissions',
  columns: ['agency_name', 'manager', 'phone', 'nb_providers', 'coverage_zone'],
  validate: validateAgency,
  sendEmail: sendAgencyEmail
});
