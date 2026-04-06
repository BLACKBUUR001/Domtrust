import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-logo">
            <img src="/assets/logos/domtrust-logo-icon-white.png" alt="DomTrust Icon" />
            <span>Domtrust</span>
          </Link>
          <p>Services domestiques de confiance à Dakar. Vérifiés, notés, proches de chez vous.</p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/domtrust/about/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn"><Linkedin /></a>
            <a href="https://www.facebook.com/profile.php?id=61587944276246" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook"><Facebook /></a>
            <a href="https://www.instagram.com/domtrust/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram"><Instagram /></a>
            <a href="https://x.com/domtrust" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Twitter"><Twitter /></a>
            <a href="https://www.tiktok.com/@domtrust" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="TikTok">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Navigation</h5>
          <Link to="/">Accueil</Link>
          <Link to="/services">Services</Link>
          <Link to="/a-propos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <Link to="/services">Garde d'enfant</Link>
          <Link to="/services">Nettoyage de maison</Link>
          <Link to="/services">Aide domestique</Link>
        </div>

        <div className="footer-col">
          <h5>Agences & Prestataires</h5>
          <Link to="/services#agences">Devenir agence partenaire</Link>
          <Link to="/services#prestataires">Devenir prestataire</Link>
          <Link to="/contact">Nous contacter</Link>
          <a href="#">Conditions d'utilisation</a>
          <a href="#">Politique de confidentialité</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025 DomTrust · Dakar, Sénégal · Tous droits réservés</span>
        <div className="footer-payments">
          <span className="payment-badge">Mobile Money</span>
          <span className="payment-badge">Paiement Sécurisé</span>
        </div>
      </div>
    </footer>
  );
}
