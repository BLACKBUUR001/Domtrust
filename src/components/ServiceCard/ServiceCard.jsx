import { Check } from 'lucide-react';
import './ServiceCard.css';

export function ServiceCard({ service, className = '', delay = 0 }) {
  const Icon = service.icon;
  return (
    <div className={`service-card reveal ${className}`} style={{ transitionDelay: `${delay * 0.1}s` }}>
      <div className="service-card-top">
        {service.image && (
          <img src={service.image} alt={service.name} className="service-card-img" />
        )}
        <div className="service-card-overlay"></div>
        <div className="service-card-header-content">
          <div className="service-card-icon">
            <Icon />
          </div>
          <div className="service-card-name">{service.name}</div>
        </div>
      </div>
      <div className="service-card-body">
        <p className="service-card-desc">{service.description}</p>
        <div className="service-card-features">
          {service.features.map((feat, i) => (
            <div key={i} className="service-card-feat">
              <Check />
              {feat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceCardMini({ service, onClick, className = '', delay = 0 }) {
  const Icon = service.icon;
  return (
    <div
      className={`service-card-mini reveal ${className}`}
      onClick={onClick}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="service-card-mini-icon">
        <Icon />
      </div>
      <div className="service-card-mini-name">{service.name}</div>
    </div>
  );
}
