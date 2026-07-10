// Centralized JSON-LD structured data for SEO.
// These power Google rich results: business card, sitelinks search, FAQ
// accordions, breadcrumbs, and article rich snippets.

const BASE = "https://rectronx.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Rectronx Circuits",
  url: BASE,
  logo: `${BASE}/images/logo-transparent.png`,
  image: `${BASE}/og-image.png`,
  description:
    "Malaysia's engineering & technology company for Final Year Projects and commercial software products. Custom IoT, Arduino, ESP32, Raspberry Pi FYP solutions in Penang.",
  email: "rectronx@gmail.com",
  telephone: "+60-11-72792500",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+60-11-72792500",
      contactType: "customer support",
      contactOption: "TollFree",
      areaServed: "MY",
      availableLanguage: ["English", "Malay"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "MY",
      availableLanguage: ["English", "Malay"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1-3-8, BL Business Centre, Solok Thean Tek",
    addressLocality: "Ayer Itam",
    postalCode: "11500",
    addressRegion: "Pulau Pinang",
    addressCountry: "MY",
  },
  sameAs: [
    "https://www.facebook.com/rectronx.circuits",
    "https://www.instagram.com/rectronx.circuits",
    "https://www.tiktok.com/@rectronxcircuits",
  ],
};

// LocalBusiness — strongest signal for "near me" / local Penang searches.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE}/#localbusiness`,
  name: "Rectronx Circuits",
  image: `${BASE}/og-image.png`,
  url: BASE,
  telephone: "+60-11-72792500",
  email: "rectronx@gmail.com",
  priceRange: "RM",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1-3-8, BL Business Centre, Solok Thean Tek",
    addressLocality: "Ayer Itam",
    postalCode: "11500",
    addressRegion: "Pulau Pinang",
    addressCountry: "MY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.3996,
    longitude: 100.2754,
  },
  areaServed: [
    { "@type": "Country", name: "Malaysia" },
    { "@type": "State", name: "Penang" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "400",
    bestRating: "5",
    worstRating: "1",
  },
  hasMap: "https://maps.google.com/?q=Rectronx+Circuits+Penang",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
  ],
};

// WebSite + SearchAction — enables the Google sitelinks search box.
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "Rectronx Circuits",
  description:
    "Final Year Projects & commercial software from Penang, Malaysia — IoT, Arduino, ESP32, Raspberry Pi.",
  publisher: { "@id": `${BASE}/#organization` },
  inLanguage: "en-MY",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE}/catalog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Rectronx Circuits", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Rectronx Circuits",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/images/logo-transparent.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${post.slug}`,
    },
    inLanguage: "en-MY",
  };
}

export function componentTechArticleSchema(component: {
  name: string;
  slug: string;
  description: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${component.name} Guide`,
    description: component.description,
    datePublished: component.updatedAt,
    dateModified: component.updatedAt,
    author: { "@type": "Organization", name: "Rectronx Circuits", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Rectronx Circuits",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/images/logo-transparent.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/components/${component.slug}`,
    },
    inLanguage: "en-MY",
  };
}

export function catalogProjectTechArticleSchema(project: {
  title: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.description,
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    author: { "@type": "Organization", name: "Rectronx Circuits", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Rectronx Circuits",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/images/logo-transparent.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/catalog/${project.slug}`,
    },
    inLanguage: "en-MY",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    url: service.url,
    description: service.description,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: service.areaServed
      ? service.areaServed.map((area) => ({ "@type": "Place", name: area }))
      : { "@type": "Country", name: "Malaysia" },
    audience: { "@type": "Audience", audienceType: "University Students" },
  };
}

export function itemListSchema(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE}/contact#contactpage`,
    url: `${BASE}/contact`,
    name: "Contact Rectronx Circuits",
    description: "Contact Rectronx Circuits for Final Year Project development and commercial software. Free quote via WhatsApp within 2 hours.",
    mainEntity: {
      "@id": `${BASE}/#organization`,
    },
  };
}

// Small helper component-less injector — returns a <script> string payload.
export function jsonLdProps(schema: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  };
}
