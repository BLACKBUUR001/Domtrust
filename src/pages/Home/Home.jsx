import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Star, Smartphone, MapPin, Users, Building2 } from 'lucide-react';
import { services, testimonials, stats } from '../../data/services';
import { ServiceCardMini } from '../../components/ServiceCard/ServiceCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import CTASection from '../../components/CTASection/CTASection';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO/SEO';
import PageTransition from '../../components/Animated/PageTransition';
import { initReveal } from '../../utils/reveal';
import './Home.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Home() {
  useEffect(() => initReveal(), []);

  return (
    <PageTransition>
      <SEO 
        title="Services à domicile en toute confiance à Dakar" 
        description="Faites appel à des prestataires vérifiés pour le nettoyage, la garde d'enfant et plus encore à Dakar."
      />
      <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-dots"></div>
        <div className="hero-shape"></div>

        <div className="hero-container">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Des services à domicile<br />en toute <span>confiance</span>
            </h1>
            <p className="hero-sub">
              DomTrust connecte les foyers dakarois avec des prestataires vérifiés et des agences partenaires.
              Garde d'enfant, nettoyage, aide ménagère trouvez le bon professionnel en quelques secondes.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">
                Rejoindre la liste d'attente
                <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-ghost">Voir les services</Link>
            </div>
          </motion.div>

          <div className="hero-visual">
            <div className="hero-collage">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="collage-item item-1">
                <img src="/assets/images/service-nettoyage.png" alt="Nettoyage DomTrust" />
                <div className="collage-label">Nettoyage</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="collage-item item-2">
                <img src="/assets/images/service-garde-enfant.png" alt="Garde d'enfant DomTrust" />
                <div className="collage-label">Garde d'enfant</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="collage-item item-3">
                <img src="/assets/images/service-aide-domestique.png" alt="Aide domestique DomTrust" />
                <div className="collage-label">Cuisine & Aide</div>
              </motion.div>

              {/* Floating Testimonials */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 1, duration: 0.5 }}
                className="floating-card card-1"
              >
                <div className="floating-card-avatar">
                  <img src="/assets/images/user-fatou.png" alt="Fatou" />
                </div>
                <div className="floating-card-info">
                  <div className="floating-card-name">Fatou S.</div>
                  <div className="floating-card-text">"Garde d'enfant parfaite !"</div>
                  <div className="floating-card-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="var(--amber)" color="var(--amber)" />)}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 1.2, duration: 0.5 }}
                className="floating-card card-2"
              >
                <div className="floating-card-avatar">
                  <img src="/assets/images/user-moussa.png" alt="Moussa" />
                </div>
                <div className="floating-card-info">
                  <div className="floating-card-name">Moussa K.</div>
                  <div className="floating-card-text">"Nettoyage impeccable"</div>
                  <div className="floating-card-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="var(--amber)" color="var(--amber)" />)}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="hero-stats-bar">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why DomTrust ── */}
      <section className="why-section">
        <div className="why-grid">
          <div className="why-visual">
            <div className="why-card-main">
              <h4>Vérification complète</h4>
              <p>Chaque prestataire et agence est vérifié(e) avant d'être référencé(e) sur la plateforme.</p>
              <div className="why-progress">
                <div className="why-progress-label"><span>Niveau de confiance</span><span>96%</span></div>
                <div className="why-progress-bar"><div className="why-progress-fill" style={{ width: '96%' }}></div></div>
              </div>
              <div className="why-progress" style={{ marginTop: '12px' }}>
                <div className="why-progress-label"><span>Satisfaction client</span><span>94%</span></div>
                <div className="why-progress-bar"><div className="why-progress-fill" style={{ width: '94%' }}></div></div>
              </div>
            </div>
            <div className="why-card-float">
              <div className="why-icon-box"><MapPin /></div>
              <div>
                <div className="why-float-title">Prestataires à proximité</div>
                <div className="why-float-sub">Géolocalisation en temps réel</div>
              </div>
            </div>
          </div>

          <div>
            <div className="section-label">Pourquoi DomTrust ?</div>
            <h2 className="section-title">La confiance, au cœur de chaque service</h2>
            <p className="section-sub">
              Notre étude terrain révèle que 50% des ménages dakarois citent la sécurité comme priorité absolue.
              DomTrust a été conçu pour y répondre.
            </p>
            <div className="pillars">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="pillar">
                <div className="pillar-icon"><Shield /></div>
                <div>
                  <h4>Prestataires & agences 100% vérifiés</h4>
                  <p>Photos, adresse, identité et antécédents contrôlés avant toute mise en ligne.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="pillar">
                <div className="pillar-icon"><Star /></div>
                <div>
                  <h4>Avis certifiés & transparents</h4>
                  <p>42,1% des utilisateurs exigent des avis vérifiés. Chez nous, chaque note est authentique.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="pillar">
                <div className="pillar-icon"><Smartphone /></div>
                <div>
                  <h4>Paiement mobile sécurisé</h4>
                  <p>Options de paiement locales intégrées pour une flexibilité totale et une sécurité garantie.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mini Services ── */}
      <section className="mini-services-section">
        <div className="mini-services-header">
          <div className="section-label">Nos services</div>
          <h2 className="section-title">Tout ce dont votre foyer a besoin</h2>
        </div>
        <div className="mini-services-grid">
          {services.map((service, i) => (
            <ServiceCardMini key={service.id} service={service} delay={i} />
          ))}
        </div>
        <div className="mini-services-cta">
          <Link to="/services" className="btn-primary">
            Voir tous les services
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Agences & Prestataires ── */}
      <section className="actors-section">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div className="section-label">Deux modèles, une même confiance</div>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Agences & Prestataires</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', margin: '0 auto' }}>
            DomTrust vous connecte avec des prestataires indépendants vérifiés ET des agences partenaires certifiées.
          </p>
        </div>
        <div className="actors-grid">
          <div className="actor-card reveal">
            <div className="actor-card-icon"><Users /></div>
            <h3>Prestataires indépendants</h3>
            <p>
              Des professionnels vérifiés individuellement : identité contrôlée, compétences validées,
              avis certifiés. Choisissez directement le prestataire qui vous convient.
            </p>
            <Link to="/services" className="btn-primary">
              En savoir plus <ArrowRight size={14} />
            </Link>
          </div>
          <div className="actor-card reveal reveal-delay-1">
            <div className="actor-card-icon"><Building2 /></div>
            <h3>Agences partenaires</h3>
            <p>
              Des agences de services domestiques certifiées DomTrust, avec des équipes formées
              et un suivi qualité garanti. Le badge partenaire officiel pour plus de confiance.
            </p>
            <Link to="/services" className="btn-primary">
              Devenir partenaire <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <HowItWorks />

      {/* ── Testimonials ── */}
      <section className="trust-section">
        <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>
          <div className="section-label">Ils nous font confiance</div>
          <h2 className="section-title">Ce que disent nos utilisateurs</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection />

      {/* ── Footer ── */}
      <Footer />
    </div>
    </PageTransition>
  );
}

