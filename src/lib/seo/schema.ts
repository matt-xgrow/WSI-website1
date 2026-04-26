import { FAQ_ITEMS } from "@/lib/faq";
import { services, site, SITE_URL } from "@/lib/site";

const ID = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  business: `${SITE_URL}/#business`,
  faq: `${SITE_URL}/#faq`,
} as const;

const AREAS_SERVED = [
  {
    "@type": "City" as const,
    name: "Brisbane",
    sameAs: "https://en.wikipedia.org/wiki/Brisbane",
  },
  {
    "@type": "City" as const,
    name: "Gold Coast",
    sameAs: "https://en.wikipedia.org/wiki/Gold_Coast,_Queensland",
  },
  {
    "@type": "City" as const,
    name: "Sunshine Coast",
    sameAs: "https://en.wikipedia.org/wiki/Sunshine_Coast,_Queensland",
  },
];

const SERVICE_AREA_GEO = {
  "@type": "GeoCircle" as const,
  geoMidpoint: {
    "@type": "GeoCoordinates" as const,
    latitude: -27.4698,
    longitude: 153.0251,
  },
  geoRadius: "120000",
};

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ID.organization,
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/design/logo-color.png`,
      width: 512,
      height: 512,
    },
    email: site.email,
    telephone: site.phoneE164,
    foundingDate: String(site.foundingYear),
    sameAs: site.socialLinks,
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "ABN",
        value: site.abn,
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE_URL,
    name: site.name,
    publisher: { "@id": ID.organization },
    inLanguage: "en-AU",
  };
}

export function localBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": ID.business,
    name: site.legalName,
    alternateName: site.name,
    description:
      "Exterior cleaning specialists serving Brisbane, Gold Coast and Sunshine Coast — pressure washing, soft-wash house cleaning, roof, gutter, window, solar panel, driveway, strata and commercial cleaning.",
    url: SITE_URL,
    telephone: site.phoneE164,
    email: site.email,
    image: `${SITE_URL}/images/house-wash.jpg`,
    logo: `${SITE_URL}/design/logo-color.png`,
    priceRange: "$$",
    foundingDate: String(site.foundingYear),
    slogan: "Premium exterior cleaning across South East Queensland",
    parentOrganization: { "@id": ID.organization },
    areaServed: AREAS_SERVED,
    serviceArea: SERVICE_AREA_GEO,
    address: {
      "@type": "PostalAddress",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
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
          "Sunday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: String(site.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Insurance",
        name: site.insuranceLabel,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Business Registration",
        name: `Australian Business Number (ABN) ${site.abnDisplay}`,
      },
    ],
    identifier: [
      { "@type": "PropertyValue", propertyID: "ABN", value: site.abn },
    ],
    knowsAbout: [
      "Pressure washing",
      "Soft washing",
      "Roof cleaning",
      "Gutter cleaning",
      "Window cleaning",
      "Solar panel cleaning",
      "Strata cleaning",
      "Driveway cleaning",
      "Commercial exterior cleaning",
    ],
    sameAs: site.socialLinks,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Exterior Cleaning Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: `${SITE_URL}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function faqPageSchema() {
  return {
    "@type": "FAQPage",
    "@id": ID.faq,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.business },
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  slug: string;
  image: string;
  serviceType?: string;
};

export function serviceSchema(input: ServiceSchemaInput) {
  const url = `${SITE_URL}/services/${input.slug}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.serviceType ?? input.name,
    description: input.description,
    url,
    image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}`,
    category: "Exterior Cleaning",
    provider: { "@id": ID.business },
    areaServed: AREAS_SERVED,
    audience: {
      "@type": "Audience",
      audienceType:
        "Homeowners, body corporate managers and commercial property managers in South East Queensland",
    },
    offers: {
      "@type": "Offer",
      url: `${url}#quote`,
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "AUD",
        description: "Fixed quote returned within 24 business hours",
      },
    },
    termsOfService: `Fully insured (${site.insuranceLabel}). 24-hour satisfaction guarantee.`,
  };
}

type LocationSchemaInput = {
  name: string;
  slug: string;
  description: string;
};

export function locationServiceSchema(input: LocationSchemaInput) {
  const url = `${SITE_URL}/locations/${input.slug}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Exterior Cleaning Services ${input.name}`,
    description: input.description,
    url,
    provider: { "@id": ID.business },
    areaServed: {
      "@type": "City",
      name: input.name,
      address: {
        "@type": "PostalAddress",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
    },
    serviceType: "Exterior Cleaning",
    category: "Exterior Cleaning",
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http") ? crumb.url : `${SITE_URL}${crumb.url}`,
    })),
  };
}

type FaqInput = { q: string; a: string };

export function faqPageSchemaFromList(items: FaqInput[], pageId: string) {
  return {
    "@type": "FAQPage",
    "@id": pageId,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function graph(...nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
