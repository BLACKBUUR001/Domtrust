import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './ServiceCard.css';

export function ServiceCard({ service, className = '', delay = 0 }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`service-card ${className}`}
    >
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
              <Check size={16} />
              {feat}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ServiceCardMini({ service, onClick, className = '', delay = 0 }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay * 0.05 }}
      className={`service-card-mini ${className}`}
      onClick={onClick}
    >
      <div className="service-card-mini-icon">
        <Icon />
      </div>
      <div className="service-card-mini-name">{service.name}</div>
    </motion.div>
  );
}
