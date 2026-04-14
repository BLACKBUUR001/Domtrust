import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Home, Layout, Info, Mail, ShieldCheck, FileText } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO/SEO';
import PageTransition from '../../components/Animated/PageTransition';
import './Sitemap.css';

export default function Sitemap() {
  const sitemapData = [
    {
      title: "Pages Principales",
      icon: <Layout size={20} />,
      links: [
        { name: "Accueil", path: "/", description: "Trésorier de confiance pour vos services à domicile." },
        { name: "Services", path: "/services", description: "Découvrez notre catalogue de services vérifiés." },
        { name: "À propos", path: "/a-propos", description: "L'histoire, la mission et l'équipe de DomTrust." },
        { name: "Contact", path: "/contact", description: "Rejoignez la liste d'attente ou posez vos questions." },
      ]
    },
    {
      title: "Services Spontanés",
      icon: <ShieldCheck size={20} />,
      links: [
        { name: "Garde d'enfant", path: "/services", description: "Nounous et baby-sitters qualifiées à Dakar." },
        { name: "Nettoyage", path: "/services", description: "Services de ménage et entretien professionnel." },
        { name: "Aide Domestique", path: "/services", description: "Cuisine et aide au foyer quotidienne." },
      ]
    },
    {
      title: "Devenir Partenaire",
      icon: <ArrowRight size={20} />,
      links: [
        { name: "Devenir Prestataire", path: "/services#prestataires", description: "Rejoignez notre réseau de professionnels." },
        { name: "Agence Partenaire", path: "/services#agences", description: "Collaborez avec DomTrust en tant qu'agence." },
      ]
    },
    {
      title: "Légal & Info",
      icon: <FileText size={20} />,
      links: [
        { name: "Mentions Légales", path: "#", description: "Informations juridiques sur la plateforme." },
        { name: "Confidentialité", path: "#", description: "Gestion de vos données personnelles." },
        { name: "Plan du Site", path: "/sitemap", description: "Vue d'ensemble de l'architecture du site." },
      ]
    }
  ];

  return (
    <PageTransition>
      <SEO 
        title="Plan du site — Sitemap" 
        description="Parcourez l'ensemble des pages et services proposés par DomTrust à Dakar."
      />
      <div className="page-wrapper sitemap-page">
        <header className="sitemap-header">
          <div className="section-label">Navigation</div>
          <h1 className="section-title">Plan du site</h1>
          <p className="section-sub">
            Retrouvez facilement toutes les rubriques de DomTrust pour une navigation simplifiée.
          </p>
        </header>

        <section className="sitemap-container">
          <div className="sitemap-grid">
            {sitemapData.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="sitemap-section"
              >
                <div className="sitemap-section-title">
                  {section.icon}
                  <h3>{section.title}</h3>
                </div>
                <div className="sitemap-links">
                  {section.links.map((link, lIdx) => (
                    <Link key={lIdx} to={link.path} className="sitemap-link-card">
                      <div className="sitemap-link-info">
                        <span className="link-name">{link.name}</span>
                        <span className="link-desc">{link.description}</span>
                      </div>
                      <ArrowRight size={14} className="link-arrow" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
