import { site } from "@/lib/site";
import { BeforeAfter } from "@/components/site/before-after";
import { FAQ } from "@/components/site/faq";
import { FAQ_ITEMS } from "@/lib/faq";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Nav } from "@/components/site/nav";
import { Process } from "@/components/site/process";
import { QuoteSection } from "@/components/site/quote-section";
import { Reviews } from "@/components/site/reviews";
import { ServiceAreas } from "@/components/site/service-areas";
import { ServicesSection } from "@/components/site/services-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { WhyUs } from "@/components/site/why-us";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        name: site.legalName,
        description:
          "Professional exterior cleaning services including pressure washing, house washing, roof cleaning, gutter cleaning, window cleaning and commercial strata maintenance across Queensland.",
        url: site.url,
        telephone: site.phoneHref.replace("tel:", ""),
        email: site.email,
        priceRange: "$$",
        image: `${site.url}/images/house-wash.jpg`,
        logo: `${site.url}/design/logo-color.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Brisbane",
          addressRegion: "QLD",
          postalCode: "4124",
          addressCountry: "AU",
        },
        areaServed: [
          { "@type": "City", name: "Brisbane" },
          { "@type": "City", name: "Sunshine Coast" },
          { "@type": "City", name: "Gold Coast" },
        ],
        foundingDate: "2014",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: site.reviewCountLabel.replace("+", ""),
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "07:00",
          closes: "19:00",
        },
        sameAs: [site.mapsUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exterior Cleaning Services",
          itemListElement: [
            "Pressure Washing",
            "House Washing",
            "Roof Cleaning",
            "Gutter Cleaning",
            "Window Cleaning",
            "Solar Panel Cleaning",
            "Commercial & Strata Cleaning",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="accent-cyan density-regular hero-split">
        <TopBar />
        <Nav />
        <Hero />
        <Marquee />
        <ServicesSection />
        <BeforeAfter />
        <WhyUs />
        <ServiceAreas />
        <Process />
        <Reviews />
        <FAQ />
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </div>
    </>
  );
}
