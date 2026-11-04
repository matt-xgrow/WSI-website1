import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { Reviews } from "@/components/site/reviews";
import { ServicesSection } from "@/components/site/services-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { WhyUs } from "@/components/site/why-us";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/seo/schema";
import { BASELINE_META } from "@/lib/seo/baseline-meta";
import { site } from "@/lib/site";

const meta = BASELINE_META["/house-washing-brisbane/"];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: "/house-washing-brisbane/" },
  robots: { index: false, follow: true },
};

export default function HouseWashingBrisbanePage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "House washing Brisbane", url: "/house-washing-brisbane/" },
          ]),
          faqPageSchema(),
        )}
      />
      <main className="page-shell">
        <TopBar />
        <Nav />
        <section className="sub-hero">
          <div>
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Brisbane · Est. {site.foundingYear}
            </span>
            <h1>
              Exterior cleaning, <em className="hl-orange">done right</em>, quoted fixed.
            </h1>
            <p>
              House washing, pressure cleaning, windows, gutters, roofs, driveways, solar panels and more — one trusted local crew, fully insured, {site.rating}/5 from {site.reviewCount} Google reviews.
            </p>
            <div className="hero-actions">
              <a className="btn btn-orange btn-lg" href="#quote">
                Get my free quote →
              </a>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
        <ServicesSection />
        <WhyUs />
        <Reviews />
        <FAQ />
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
