import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ShieldQuestion } from 'lucide-react';
import './ErrorPage.css';

export default function ErrorPage({ type = '404' }) {
  const is404 = type === '404';

  return (
    <div className="error-page">
      <div className="error-bg">
        <div className="error-glow"></div>
        <div className="error-dots"></div>
      </div>

      <div className="error-container">
        <div className="error-visual">
          <div className="error-code-wrapper">
            <h1 className="error-code">{is404 ? '404' : '500'}</h1>
            <div className="error-icon">
              <ShieldQuestion size={120} />
            </div>
          </div>
        </div>

        <div className="error-content">
          <h2 className="error-title">
            {is404 ? 'Oups ! Page introuvable' : 'Erreur de serveur'}
          </h2>
          <p className="error-text">
            {is404 
              ? "La page que vous recherchez semble s'être égarée dans les couloirs de DomTrust. Elle a peut-être été déplacée ou n'existe plus."
              : "Un problème technique est survenu de notre côté. Nos techniciens sont déjà sur le coup pour rétablir la situation."}
          </p>
          
          <div className="error-actions">
            <Link to="/" className="btn-primary">
              <Home size={18} />
              Retour à l'accueil
            </Link>
            <Link to="/contact" className="btn-ghost">
              <ArrowLeft size={18} />
              Besoin d'aide ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
