import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import {
  breadcrumbSchema,
  faqPageSchemaFromList,
  graph,
  serviceSchema,
} from "@/lib/seo/schema";
import type { AdsPage } from "@/lib/ads-pages";
import { site, SITE_URL } from "@/lib/site";

export function adsMetadata(page: AdsPage): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    robots: { index: false, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
    },
  };
}

export function AdsLanding({ page }: { page: AdsPage }) {
  const pageSchema = graph(
    serviceSchema({
      name: page.h1,
      description: page.description,
      slug: page.path.replaceAll("/", "") || "service",
      image: "/images/house-wash.jpg",
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: page.h1, url: page.path },
    ]),
    faqPageSchemaFromList(page.faqs, `${SITE_URL}${page.path}#faq`),
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <main className="page-shell">
        <TopBar />
        <Nav />
        <section className="sub-hero">
          <div>
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              {page.eyebrow}
            </span>
            <h1>{page.h1}</h1>
            <p>{page.lede}</p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="#quote">
                Get my free quote →
              </Link>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
            <p>
              {site.rating}/5 from {site.reviewCount} Google reviews · {site.insuranceLabel} · Local Brisbane team · Free fixed quote
            </p>
          </div>
        </section>
        <section className="content-section">
          <h2>Built for Brisbane homes.</h2>
          <ul className="surfaces-grid">
            {page.points.map((point) => (
              <li key={point.title}>
                <h3 className="surface-name">{point.title}</h3>
                <p className="surface-note">{point.body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="content-section">
          <h2>What this clean covers.</h2>
          <ul className="surfaces-grid">
            {page.surfaces.map((surface) => (
              <li key={surface.title}>
                <h3 className="surface-name">{surface.title}</h3>
                <p className="surface-note">{surface.body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="content-section service-faqs" id="faq">
          <h2>Questions Brisbane homeowners ask.</h2>
          <div className="faq-list-inline">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="faq-item-inline">
                <summary>
                  <h3>{faq.q}</h3>
                  <span aria-hidden="true" className="faq-toggle">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
