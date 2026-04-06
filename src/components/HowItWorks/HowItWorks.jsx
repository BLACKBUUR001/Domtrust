import { useState } from 'react';
import { howItWorksData } from '../../data/services';
import './HowItWorks.css';

const tabs = [
  { key: 'client', label: howItWorksData.client.label },
  { key: 'prestataire', label: howItWorksData.prestataire.label },
  { key: 'agence', label: howItWorksData.agence.label },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('client');
  const currentData = howItWorksData[activeTab];

  return (
    <section className="how-it-works">
      <div className="how-it-works-header">
        <div className="section-label">Comment ça marche</div>
        <h2 className="section-title">Simple, rapide, en toute confiance</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Que vous soyez client, prestataire indépendant ou agence, DomTrust s'adapte à vos besoins.
        </p>
      </div>

      <div className="how-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`how-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="how-steps-wrapper">
        <div className="how-steps" key={activeTab}>
          {currentData.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="how-step">
                <div className="how-step-number">{index + 1}</div>
                <div className="how-step-icon">
                  <Icon />
                </div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
