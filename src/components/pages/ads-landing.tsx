import type { Metadata } from "next";
import Image from "next/image";
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
import { ADS_REVIEWS, BRISBANE_SUBURBS } from "@/lib/ads-reviews";
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
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
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
          <h2>{page.surfacesTitle}</h2>
          <p>{page.surfacesIntro}</p>
          <ul className="surfaces-grid">
            {page.surfaces.map((surface) => (
              <li key={surface.title}>
                <h3 className="surface-name">{surface.title}</h3>
                <p className="surface-note">{surface.body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="content-section">
          <h2>Brisbane homes deserve real cleaning results.</h2>
          <p>Use real job imagery instead of generic stock photos so the ad-to-page experience feels credible and consistent.</p>
          <div className="surfaces-grid">
            <figure>
              <Image src="/design/pressure-1.jpg" alt="WSI Cleaning team member washing a residential exterior" width={720} height={480} />
              <figcaption>Residential exterior wash. WSI Cleaning, Brisbane.</figcaption>
            </figure>
            <figure>
              <Image src="/design/pressure-2.jpg" alt="WSI Cleaning technician cleaning an exterior property" width={720} height={480} />
              <figcaption>Professional exterior cleaning. Controlled process, QLD.</figcaption>
            </figure>
          </div>
        </section>
        <section className="content-section">
          <h2>{page.stepsTitle}</h2>
          <p>{page.stepsIntro}</p>
          <ol className="process-list">
            {page.steps.map((step, index) => (
              <li key={step.title}>
                <span className="process-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="content-section">
          <h2>What Brisbane homeowners say</h2>
          <p>Excellent. Trusted by local homeowners. 4.9/5 from {site.reviewCount} Google reviews.</p>
          {ADS_REVIEWS.map((review) => (
            <article key={review.name}>
              <h3>{review.name}</h3>
              <p>{review.when}. {review.text}</p>
            </article>
          ))}
        </section>
        <section className="content-section">
          <h2>{page.areaTitle}</h2>
          <p>{page.areaBody}</p>
          <h3>Popular Brisbane suburbs we service</h3>
          <ul className="suburb-list">
            {BRISBANE_SUBURBS.map((suburb) => (
              <li key={suburb}>{suburb}</li>
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
        <section className="content-section">
          <h2>{page.closingTitle}</h2>
          <p>{page.closingBody}</p>
        </section>
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
