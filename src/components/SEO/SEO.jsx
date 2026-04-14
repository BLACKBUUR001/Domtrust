import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name = 'DomTrust', type = 'website' }) {
  const fullTitle = title ? `${title} | ${name}` : name;
  const defaultDesc = "DomTrust — Trouvez des prestataires de services à domicile vérifiés à Dakar. Nettoyage, garde d'enfant, cuisine et plus encore en toute confiance.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description || defaultDesc} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      
      {/* Local SEO for Senegal */}
      <meta name="geo.region" content="SN" />
      <meta name="geo.placename" content="Dakar" />
    </Helmet>
  );
}
