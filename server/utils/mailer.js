import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { escapeHtml as e } from './validate.js';

dotenv.config();

// Créer le transporteur Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Envoie une notification email pour une soumission de formulaire Contact
 */
export async function sendContactEmail(data) {
  const { fname, lname, email, phone, subject, message } = data;

  const mailOptions = {
    from: `"DomTrust Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📩 Nouveau message Contact — ${fname} ${lname || ''}`,
    replyTo: email,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0a1628 0%, #162544 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #e8a020; margin: 0; font-size: 24px;">DomTrust</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Nouveau message depuis le formulaire de contact</p>
        </div>
        <div style="padding: 32px 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Prénom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(fname)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(lname) || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;"><a href="mailto:${encodeURIComponent(email)}" style="color: #e8a020;">${e(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(phone) || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Objet</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(subject) || '—'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #fff; border-radius: 8px; border-left: 4px solid #e8a020;">
            <p style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Message</p>
            <p style="color: #0a1628; line-height: 1.6; margin: 0; white-space: pre-wrap;">${e(message) || '(Aucun message)'}</p>
          </div>
        </div>
        <div style="background: #0a1628; padding: 16px 24px; text-align: center;">
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">© ${new Date().getFullYear()} DomTrust — Services domestiques de confiance</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

/**
 * Envoie une notification email pour une candidature d'agence partenaire
 */
export async function sendAgencyEmail(data) {
  const { agency_name, manager, phone, nb_providers, coverage_zone } = data;

  const mailOptions = {
    from: `"DomTrust Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `🏢 Nouvelle candidature Agence — ${agency_name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0a1628 0%, #162544 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #e8a020; margin: 0; font-size: 24px;">DomTrust</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Nouvelle candidature agence partenaire</p>
        </div>
        <div style="padding: 32px 24px;">
          <div style="background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 16px; border: 1px solid #e9ecef;">
            <h2 style="color: #0a1628; margin: 0 0 4px; font-size: 20px;">${e(agency_name)}</h2>
            <p style="color: #6c757d; margin: 0; font-size: 14px;">Demande de partenariat</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 160px;">Responsable</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(manager)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;"><a href="tel:${encodeURIComponent(phone)}" style="color: #e8a020;">${e(phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Nb. prestataires</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(nb_providers) || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Zone de couverture</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #0a1628; font-weight: 600;">${e(coverage_zone) || '—'}</td>
            </tr>
          </table>
        </div>
        <div style="background: #0a1628; padding: 16px 24px; text-align: center;">
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">© ${new Date().getFullYear()} DomTrust — Services domestiques de confiance</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}
