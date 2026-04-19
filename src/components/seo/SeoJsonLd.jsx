export default function SeoJsonLd({ data }) {
  const { brand, contact } = data;

  const cityStateCountry = brand.location?.label || 'United States';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: brand.name,
    jobTitle: brand.title,
    description: brand.intro,
    email: contact.email ? `mailto:${contact.email}` : undefined,
    telephone: contact.phone || undefined,

    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newport Beach',
      addressRegion: 'CA',
      addressCountry: 'US',
    },

    worksFor: [
      { '@type': 'Organization', name: 'CalcSim' },
      { '@type': 'Organization', name: 'Freelancer' },
    ],

    sameAs: (brand.profiles || []).map((p) => p.url).filter(Boolean),

    knowsAbout: brand.knowsAbout || undefined,

    // Helpful extra label for SERP previews
    areaServed: cityStateCountry,
  };

  // remove undefined fields to keep JSON clean
  const cleaned = JSON.parse(JSON.stringify(jsonLd));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleaned) }}
    />
  );
}
