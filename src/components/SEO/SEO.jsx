import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://domtrust.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/hero-realistic.png`;

const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'DomTrust',
  description: "Plateforme de services domestiques de confiance à Dakar : garde d'enfant, nettoyage, aide ménagère. Prestataires vérifiés et agences partenaires.",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logos/domtrust-logo-full.png`,
  image: DEFAULT_OG_IMAGE,
  telephone: '+221770000000',
  email: 'contact@domtrust.sn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sonatel Academy',
    addressLocality: 'Dakar',
    addressCountry: 'SN'
  },
  areaServed: { '@type': 'City', name: 'Dakar' },
  sameAs: [
    'https://www.linkedin.com/company/domtrust/',
    'https://www.facebook.com/profile.php?id=61587944276246',
    'https://www.instagram.com/domtrust/',
    'https://x.com/domtrust'
  ]
};

export default function SEO({
  title,
  description,
  name = 'DomTrust',
  type = 'website',
  image,
  noIndex = false
}) {
  const location = useLocation();
  const fullTitle = title ? `${title} | ${name}` : `${name} — Services domestiques de confiance à Dakar`;
  const defaultDesc = "DomTrust — Trouvez des prestataires de services à domicile vérifiés à Dakar. Nettoyage, garde d'enfant, cuisine et plus encore en toute confiance.";
  const desc = description || defaultDesc;
  const canonical = `${SITE_URL}${location.pathname}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="fr_SN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@domtrust" />

      {/* Local SEO Sénégal */}
      <meta name="geo.region" content="SN-DK" />
      <meta name="geo.placename" content="Dakar" />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(ORGANIZATION_JSONLD)}
      </script>
    </Helmet>
  );
}
