import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import pool from '../db.js';
import { sendContactEmail, sendAgencyEmail } from '../utils/mailer.js';
import { validateContact, validateAgency } from '../utils/validate.js';

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes. Réessayez dans quelques minutes.' }
});

router.post('/contact', submitLimiter, async (req, res) => {
  const { error, data } = validateContact(req.body || {});
  if (error) return res.status(400).json({ error });

  try {
    const result = await pool.query(
      `INSERT INTO contact_submissions (fname, lname, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [data.fname, data.lname, data.email, data.phone, data.subject, data.message]
    );

    sendContactEmail(data).catch(err =>
      console.error('Erreur envoi email (contact):', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès !',
      id: result.rows[0].id
    });
  } catch (err) {
    console.error('Erreur insertion contact:', err.message);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

router.post('/agency', submitLimiter, async (req, res) => {
  const { error, data } = validateAgency(req.body || {});
  if (error) return res.status(400).json({ error });

  try {
    const result = await pool.query(
      `INSERT INTO agency_submissions (agency_name, manager, phone, nb_providers, coverage_zone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [data.agency_name, data.manager, data.phone, data.nb_providers, data.coverage_zone]
    );

    sendAgencyEmail(data).catch(err =>
      console.error('Erreur envoi email (agence):', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Candidature envoyée avec succès !',
      id: result.rows[0].id
    });
  } catch (err) {
    console.error('Erreur insertion agence:', err.message);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

export default router;
