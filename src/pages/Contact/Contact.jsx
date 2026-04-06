import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram, Twitter, Map, ArrowRight, Loader2 } from 'lucide-react';
import { coverageZones } from '../../data/services';
import Footer from '../../components/Footer/Footer';
import { initReveal, showToast } from '../../utils/reveal';
import { submitContactForm } from '../../utils/api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    initReveal();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fname || !form.email) {
      showToast('Veuillez remplir les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      await submitContactForm(form);
      showToast(`Merci ${form.fname} ! On revient vers vous sous 24h.`);
      setForm({ fname: '', lname: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      showToast(err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="section-label">Contactez-nous</div>
          <h1 className="section-title">Parlons de votre projet</h1>
          <p className="section-sub">
            Une question, une suggestion, ou vous souhaitez rejoindre la liste d'attente ?
            Nous sommes là pour vous répondre.
          </p>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="contact-section">
        <div className="contact-inner">
          <div className="contact-info">
            <div>
              <div className="section-label">Restons connectés</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Nous contacter</h2>
            </div>

            <div className="contact-block">
              <div className="contact-block-icon"><MapPin /></div>
              <div>
                <h4>Adresse</h4>
                <p>Sonatel Academy, Dakar<br />Sénégal, Afrique de l'Ouest</p>
              </div>
            </div>

            <div className="contact-block">
              <div className="contact-block-icon"><Phone /></div>
              <div>
                <h4>Téléphone & WhatsApp</h4>
                <a href="tel:+221770000000">+221 77 000 00 00</a>
              </div>
            </div>

            <div className="contact-block">
              <div className="contact-block-icon"><Mail /></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:contact@domtrust.sn">contact@domtrust.sn</a>
              </div>
            </div>

            <div className="contact-social">
              <h4>Réseaux sociaux</h4>
              <div className="contact-social-links">
                <a href="https://www.linkedin.com/company/domtrust/about/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn"><Linkedin /></a>
                <a href="https://www.facebook.com/profile.php?id=61587944276246" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Facebook"><Facebook /></a>
                <a href="https://www.instagram.com/domtrust/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Instagram"><Instagram /></a>
                <a href="https://x.com/domtrust" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Twitter"><Twitter /></a>
                <a href="https://www.tiktok.com/@domtrust" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="TikTok">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="contact-hours">
              <h4><Clock /> Horaires</h4>
              <p>Lun – Sam : 08h00 – 20h00<br />Dimanche : 09h00 – 17h00</p>
            </div>
          </div>

          <form className="contact-form-card" onSubmit={handleSubmit}>
            <h3>Envoyez-nous un message</h3>
            <div className="contact-form-row">
              <div className="form-group">
                <label>Prénom *</label>
                <input type="text" name="fname" value={form.fname} onChange={handleChange} placeholder="Votre prénom" required />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" name="lname" value={form.lname} onChange={handleChange} placeholder="Votre nom" />
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+221 77 000 00 00" />
            </div>
            <div className="form-group">
              <label>Objet</label>
              <select name="subject" value={form.subject} onChange={handleChange}>
                <option value="">Sélectionnez un objet</option>
                <option>Rejoindre la waitlist</option>
                <option>Devenir prestataire</option>
                <option>Partenariat agence</option>
                <option>Question générale</option>
                <option>Signaler un problème</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Décrivez votre demande..." style={{ height: '120px' }}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }} disabled={loading}>
              {loading ? (<>Envoi en cours... <Loader2 size={16} className="spin" /></>) : (<>Envoyer le message <ArrowRight size={16} /></>)}
            </button>
            <p className="contact-form-note">Réponse sous 24h · Vos données sont protégées</p>
          </form>
        </div>
      </section>

      {/* ── Map Banner ── */}
      <section className="map-banner">
        <div className="map-inner">
          <div className="map-info">
            <h3>Notre zone de couverture initiale</h3>
            <p>DomTrust se lance d'abord dans les quartiers résidentiels de Dakar, avant de s'étendre à l'ensemble du Sénégal.</p>
            <div className="map-badges">
              {coverageZones.map((zone) => (
                <span key={zone} className="map-badge">{zone}</span>
              ))}
            </div>
          </div>
          <div className="map-visual">
            <Map />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
