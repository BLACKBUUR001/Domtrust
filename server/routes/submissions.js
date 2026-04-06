import { Router } from 'express';
import pool from '../db.js';
import { sendContactEmail, sendAgencyEmail } from '../utils/mailer.js';

const router = Router();

// POST /api/submissions/contact
router.post('/contact', async (req, res) => {
  const { fname, lname, email, phone, subject, message } = req.body;

  // Validation
  if (!fname || !email) {
    return res.status(400).json({ error: 'Prénom et email sont obligatoires.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_submissions (fname, lname, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [fname, lname || null, email, phone || null, subject || null, message || null]
    );

    console.log(`📩 Nouveau contact: ${fname} ${lname || ''} (${email})`);

    // Envoi email
    try {
      await sendContactEmail(req.body);
      console.log('📧 Email de contact envoyé avec succès');
    } catch (mailErr) {
      console.error('❌ Erreur envoi email (contact):', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès !',
      id: result.rows[0].id
    });
  } catch (err) {
    console.error('❌ Erreur insertion contact:', err.message);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

// POST /api/submissions/agency
router.post('/agency', async (req, res) => {
  const { agency_name, manager, phone, nb_providers, coverage_zone } = req.body;

  // Validation
  if (!agency_name || !manager || !phone) {
    return res.status(400).json({ error: 'Nom d\'agence, responsable et téléphone sont obligatoires.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO agency_submissions (agency_name, manager, phone, nb_providers, coverage_zone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [agency_name, manager, phone, nb_providers || null, coverage_zone || null]
    );

    console.log(`🏢 Nouvelle agence: ${agency_name} — ${manager} (${phone})`);

    // Envoi email
    try {
      await sendAgencyEmail(req.body);
      console.log('📧 Email agence envoyé avec succès');
    } catch (mailErr) {
      console.error('❌ Erreur envoi email (agence):', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Candidature envoyée avec succès !',
      id: result.rows[0].id
    });
  } catch (err) {
    console.error('❌ Erreur insertion agence:', err.message);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

export default router;
