import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CTASection.css';

export default function CTASection({ title, subtitle, buttonText, buttonLink }) {
  return (
    <div className="cta-section">
      <div className="cta-content">
        <h2>{title || "Rejoignez la liste d'attente DomTrust"}</h2>
        <p>{subtitle || "Soyez parmi les premiers à accéder à la plateforme au lancement à Dakar."}</p>
      </div>
      <Link to={buttonLink || "/contact"} className="btn-navy">
        {buttonText || "Je m'inscris maintenant"}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
