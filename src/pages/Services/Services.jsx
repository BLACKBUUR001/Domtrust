import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Eye, BarChart3, Award, Wallet, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { services } from '../../data/services';
import { ServiceCard } from '../../components/ServiceCard/ServiceCard';
import CTASection from '../../components/CTASection/CTASection';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO/SEO';
import PageTransition from '../../components/Animated/PageTransition';
import { initReveal, showToast } from '../../utils/reveal';
import { submitAgencyForm } from '../../utils/api';
import './Services.css';

export default function Services() {
  const [agencyForm, setAgencyForm] = useState({
    agency_name: '', manager: '', phone: '', nb_providers: '1 – 5 prestataires', coverage_zone: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    return initReveal();
  }, []);

  const handleAgencyChange = (e) => {
    setAgencyForm({ ...agencyForm, [e.target.name]: e.target.value });
  };

  const handleAgencySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitAgencyForm(agencyForm);
      showToast('Demande envoyée ! Nous vous contacterons sous 48h.');
      setAgencyForm({ agency_name: '', manager: '', phone: '', nb_providers: '1 – 5 prestataires', coverage_zone: '' });
    } catch (err) {
      showToast(err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO 
        title="Nos Services Domestiques à Dakar" 
        description="Parcourez nos services : nettoyage, garde d'enfant, cuisine. Devenez prestataire ou agence partenaire DomTrust dès aujourd'hui."
      />
      <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="services-hero">
        <div className="services-hero-content">
          <div className="section-label">Services DomTrust</div>
          <h1 className="section-title">
            Tous vos besoins,<br />un seul endroit de confiance
          </h1>
          <p className="section-sub">
            Des prestataires vérifiés et des agences partenaires pour chaque service domestique.
            Réservez en quelques secondes, payez en toute sécurité.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="services-grid-section">
        <div className="section-label">Ce que nous proposons</div>
        <h2 className="section-title">Nos services à domicile</h2>
        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i} />
          ))}
        </div>
      </section>

      {/* ── Prestataires ── */}
      <section className="prestataire-section" id="prestataires">
        <div className="prestataire-inner">
          <div>
            <div className="section-label">Pour les prestataires</div>
            <h2 className="section-title">Devenez prestataire DomTrust</h2>
            <p className="section-sub">
              Rejoignez le réseau de prestataires vérifiés de DomTrust et développez votre activité avec des clients de confiance.
            </p>
            <div className="prestataire-benefits">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="prestataire-benefit">
                <div className="prestataire-benefit-icon"><Wallet /></div>
                <div>
                  <h4>Revenus réguliers</h4>
                  <p>Recevez des missions correspondant à vos compétences et votre zone géographique.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="prestataire-benefit">
                <div className="prestataire-benefit-icon"><Clock /></div>
                <div>
                  <h4>Flexibilité totale</h4>
                  <p>Choisissez vos horaires et acceptez uniquement les missions qui vous conviennent.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="prestataire-benefit">
                <div className="prestataire-benefit-icon"><TrendingUp /></div>
                <div>
                  <h4>Évolution de carrière</h4>
                  <p>Collectez des avis positifs, montez en grade et accédez à des missions premium.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="prestataire-visual"
          >
            <div className="prestataire-visual-content">
              <h3>Rejoignez +200 prestataires</h3>
              <p>Inscrivez-vous gratuitement et commencez à recevoir des missions dès la validation de votre profil.</p>
              <Link to="/contact" className="btn-primary">
                Devenir prestataire <ArrowRight size={16} />
              </Link>
              <div className="prestataire-stats">
                <div className="prestataire-stat">
                  <div className="prestataire-stat-value">96%</div>
                  <div className="prestataire-stat-label">Taux de satisfaction</div>
                </div>
                <div className="prestataire-stat">
                  <div className="prestataire-stat-value">48h</div>
                  <div className="prestataire-stat-label">Délai de validation</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Agency Partner ── */}
      <section className="agency-section" id="agences">
        <div className="agency-inner">
          <div>
            <div className="section-label" style={{ color: 'var(--amber)' }}>Pour les agences</div>
            <h2 className="section-title">Devenez agence partenaire DomTrust</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Vous gérez une agence de services domestiques à Dakar ? Rejoignez notre réseau et accédez à des milliers de foyers vérifiés.
            </p>
            <div className="agency-benefits">
              <div className="agency-benefit">
                <div className="benefit-check"><Check size={12} /></div>
                <p><strong>Visibilité maximale</strong> — Profil sponsorisé et accès prioritaire aux demandes clients</p>
              </div>
              <div className="agency-benefit">
                <div className="benefit-check"><Check size={12} /></div>
                <p><strong>Gestion simplifiée</strong> — Tableau de bord dédié pour gérer vos prestataires et réservations</p>
              </div>
              <div className="agency-benefit">
                <div className="benefit-check"><Check size={12} /></div>
                <p><strong>Commission optimisée</strong> — Tarification agence préférentielle avec abonnement premium</p>
              </div>
              <div className="agency-benefit">
                <div className="benefit-check"><Check size={12} /></div>
                <p><strong>Badge partenaire officiel</strong> — Label de confiance DomTrust pour tous vos prestataires</p>
              </div>
            </div>
          </div>

          <form className="agency-form-card" onSubmit={handleAgencySubmit}>
            <h3>Inscription agence partenaire</h3>
            <div className="form-group">
              <label>Nom de l'agence *</label>
              <input type="text" name="agency_name" value={agencyForm.agency_name} onChange={handleAgencyChange} placeholder="Ex : Agence Teranga Services" required />
            </div>
            <div className="form-group">
              <label>Responsable *</label>
              <input type="text" name="manager" value={agencyForm.manager} onChange={handleAgencyChange} placeholder="Votre nom complet" required />
            </div>
            <div className="form-group">
              <label>Téléphone (WhatsApp) *</label>
              <input type="tel" name="phone" value={agencyForm.phone} onChange={handleAgencyChange} placeholder="+221 77 000 00 00" required />
            </div>
            <div className="form-group">
              <label>Nombre de prestataires</label>
              <select name="nb_providers" value={agencyForm.nb_providers} onChange={handleAgencyChange}>
                <option>1 – 5 prestataires</option>
                <option>6 – 20 prestataires</option>
                <option>21 – 50 prestataires</option>
                <option>50+ prestataires</option>
              </select>
            </div>
            <div className="form-group">
              <label>Zone de couverture</label>
              <input type="text" name="coverage_zone" value={agencyForm.coverage_zone} onChange={handleAgencyChange} placeholder="Ex : Almadies, Plateau, Mermoz..." />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }} disabled={loading}>
              {loading ? (<>Envoi en cours... <Loader2 size={16} className="spin" /></>) : (<>Soumettre ma candidature <ArrowRight size={16} /></>)}
            </button>
          </form>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Prêt à faire confiance à DomTrust ?"
        subtitle="Rejoignez la liste d'attente et soyez parmi les premiers à accéder à la plateforme."
      />

      <Footer />
    </div>
    </PageTransition>
  );
}
