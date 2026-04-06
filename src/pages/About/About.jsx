import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Rocket, Heart, Code, UserCheck, BarChart3 } from 'lucide-react';
import { teamMembers } from '../../data/services';
import CTASection from '../../components/CTASection/CTASection';
import Footer from '../../components/Footer/Footer';
import { initReveal } from '../../utils/reveal';
import './About.css';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    initReveal();
  }, []);

  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="about-hero">
        <div>
          <div className="section-label">Notre histoire</div>
          <h1 className="section-title">Nés d'un besoin réel. Construits sur la confiance.</h1>
          <p className="section-sub">
            DomTrust est né d'un constat simple : trouver un prestataire domestique fiable à Dakar est un véritable défi.
            Notre mission est d'y remédier, grâce à la technologie et à la transparence.
          </p>
          <div className="about-hero-actions">
            <Link to="/contact" className="btn-primary">
              Rejoindre la waitlist <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-ghost">Nos services</Link>
          </div>
        </div>
        <div className="about-hero-img reveal">
          <img src="/assets/images/about-team-realistic.png" alt="Équipe DomTrust" className="about-team-img" />
          <div className="about-img-overlay">
            <img src="/assets/logos/domtrust-logo-icon-white.png" alt="DomTrust Icon" className="about-floating-logo-mini" />
          </div>
        </div>
      </section>

      {/* ── Mission Cards ── */}
      <section className="mission-section">
        <div className="section-label">Notre raison d'être</div>
        <h2 className="section-title">Vision, Mission, Valeurs</h2>
        <div className="mission-grid">
          <div className="mission-card navy-bg reveal">
            <div className="mission-card-icon"><Target /></div>
            <h3>Notre Vision</h3>
            <p>Devenir la référence incontournable des services domestiques en Afrique de l'Ouest — une plateforme où chaque foyer peut trouver le bon professionnel, en toute sécurité.</p>
          </div>
          <div className="mission-card amber-bg reveal reveal-delay-1">
            <div className="mission-card-icon"><Rocket /></div>
            <h3>Notre Mission</h3>
            <p>Connecter les ménages dakarois avec des prestataires vérifiés et des agences certifiées, accessibles et bien notés, en simplifiant radicalement le processus.</p>
          </div>
          <div className="mission-card light-bg reveal reveal-delay-2">
            <div className="mission-card-icon"><Heart /></div>
            <h3>Nos Valeurs</h3>
            <p>Confiance, transparence, proximité et inclusion. Nous croyons que chaque foyer mérite un accès équitable à des services de qualité.</p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="values-section">
        <div className="section-label">En chiffres</div>
        <h2 className="section-title">Ce que dit notre étude de marché</h2>
        <div className="values-grid">
          <div className="value-item reveal">
            <div className="value-num">83%</div>
            <div className="value-label">Femmes actives</div>
            <div className="value-desc">Notre cœur de cible : femmes de 20–40 ans dans les quartiers résidentiels de Dakar</div>
          </div>
          <div className="value-item reveal reveal-delay-1">
            <div className="value-num">50%</div>
            <div className="value-label">Priorité sécurité</div>
            <div className="value-desc">La moitié des sondés cite la confiance et la sécurité comme critère n°1</div>
          </div>
          <div className="value-item reveal reveal-delay-2">
            <div className="value-num">42%</div>
            <div className="value-label">Avis certifiés</div>
            <div className="value-desc">Exigent des avis vérifiés et authentiques avant toute décision</div>
          </div>
          <div className="value-item reveal reveal-delay-3">
            <div className="value-num">58%</div>
            <div className="value-label">Qualité insuffisante</div>
            <div className="value-desc">Signalent des problèmes de qualité avec les prestataires actuels</div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="team-section">
        <div className="section-label">L'équipe fondatrice</div>
        <h2 className="section-title">Les visages derrière DomTrust</h2>
        <div className="team-grid">
          {teamMembers.map((member, i) => {
            const icons = [Code, UserCheck, BarChart3];
            const TeamIcon = icons[i];
            return (
              <div key={member.id} className={`team-card reveal ${i > 0 ? `reveal-delay-${i}` : ''}`}>
                <div className="team-card-top" style={{ background: member.gradient }}>
                  <TeamIcon />
                </div>
                <div className="team-card-body">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-bio">{member.bio}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Prêt à rejoindre l'aventure DomTrust ?"
        subtitle="Inscrivez-vous sur la liste d'attente et soyez parmi les premiers."
        buttonText="Je m'inscris"
      />

      <Footer />
    </div>
  );
}
