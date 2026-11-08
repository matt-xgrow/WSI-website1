import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import {
  CalendarIcon,
  GoogleGIcon,
  ShieldIcon,
  StarIcon,
} from "@/components/site/icons";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqPageSchemaFromList,
  graph,
  serviceSchema,
} from "@/lib/seo/schema";
import { getServiceContent } from "@/lib/service-content";
import { getService, locations, site, SITE_URL } from "@/lib/site";

import { baselineFor } from "@/lib/seo/baseline-meta";

export function serviceMetadata(slug: string): Metadata {
  const service = getService(slug);
  if (!service) return {};
  const canonical = `/${service.slug}/`;
  const baseline = baselineFor(canonical);
  return {
    title: { absolute: baseline?.title ?? service.title },
    description: baseline?.description ?? service.description,
    alternates: { canonical },
    openGraph: {
      title: service.title,
      description: service.description,
      url: canonical,
      images: [{ url: service.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

const SERVICE_IMAGE_MAP: Record<string, string> = {
  "house-washing": "/images/residential-aerial.jpg",
  "pressure-washing": "/images/commercial-pressure.jpg",
  "window-cleaning": "/images/commercial-windows.jpg",
  "gutter-cleaning": "/images/soft-wash.jpg",
  "roof-cleaning": "/images/soft-wash.jpg",
  "driveway-cleaning": "/images/commercial-pressure.jpg",
  "solar-panel-cleaning": "/images/glass-wash.jpg",
  "strata-cleaning": "/images/commercial-aerial.jpg",
  "commercial-cleaning": "/images/commercial-pressure.jpg",
};

const HERO_ALT_MAP: Record<string, string> = {
  "house-washing":
    "Soft-wash exterior house cleaning on a rendered Brisbane home",
  "pressure-washing":
    "Commercial pressure washing of a concrete driveway in Brisbane",
  "window-cleaning":
    "Streak-free residential window cleaning on a Queenslander",
  "gutter-cleaning":
    "Roof gutter cleaning before storm season in South East Queensland",
  "roof-cleaning":
    "Soft-wash roof cleaning on a tile roof in subtropical Brisbane",
  "driveway-cleaning":
    "Pressure-cleaned exposed-aggregate driveway after WSI Cleaning service",
  "solar-panel-cleaning":
    "Deionised-water solar panel cleaning on a Brisbane rooftop array",
  "strata-cleaning":
    "Strata complex common-area pressure clean by WSI Cleaning",
  "commercial-cleaning":
    "Commercial facade cleaning of an office building in Brisbane CBD",
};

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const heroImage = SERVICE_IMAGE_MAP[service.slug] ?? service.image;
  const heroAlt =
    HERO_ALT_MAP[service.slug] ??
    `${service.name} job by WSI Cleaning in Brisbane`;
  const hardSurfaceHero =
    service.slug === "pressure-washing" || service.slug === "driveway-cleaning";
  if (hardSurfaceHero) {
    preload("/images/heroes/hard-surface-800.webp", {
      as: "image",
      fetchPriority: "high",
      imageSrcSet:
        "/images/heroes/hard-surface-800.webp 800w, /images/heroes/hard-surface.webp 960w",
      imageSizes: "(max-width: 900px) 100vw, 720px",
    });
  }
  const content = getServiceContent(service.slug);
  const canonical = `/${service.slug}/`;
  const pageId = `${SITE_URL}${canonical}#faq`;

  const pageSchema = graph(
    serviceSchema({
      name: service.name,
      description: service.description,
      slug: service.slug,
      image: heroImage,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/#services" },
      { name: service.name, url: canonical },
    ]),
    ...(content ? [faqPageSchemaFromList(content.faqs, pageId)] : [])
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <main className="page-shell">
        <TopBar />
        <Nav />

        <section className={hardSurfaceHero ? "sub-hero sub-hero-lcp" : "sub-hero"}>
          {hardSurfaceHero ? (
            <div className="sub-hero-img">
              <img
                src="/images/heroes/hard-surface-800.webp"
                srcSet="/images/heroes/hard-surface-800.webp 800w, /images/heroes/hard-surface.webp 960w"
                sizes="(max-width: 900px) 100vw, 720px"
                alt={heroAlt}
                width={960}
                height={600}
                fetchPriority="high"
                loading="eager"
              />
            </div>
          ) : null}
          <div>
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              {service.eyebrow}
            </span>
            <h1>{baselineFor(canonical)?.h1 ?? service.name}</h1>
            <p>{service.description}</p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="#quote">
                Get a free quote →
              </Link>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>

            <div className="trust-strip">
              <div className="trust-item trust-google">
                <GoogleGIcon />
                <div
                  className="trust-stars"
                  aria-label={`Rated ${site.rating} on Google`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} style={{ color: "#FBBC05" }} />
                  ))}
                </div>
                <div className="trust-text">
                  <strong>Rated {site.rating}</strong>
                  <span>on Google</span>
                </div>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <ShieldIcon style={{ color: "var(--cyan-ink)" }} />
                <div className="trust-text">
                  <strong>$20M</strong>
                  <span>Public liability</span>
                </div>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <CalendarIcon style={{ color: "var(--cyan-ink)" }} />
                <div className="trust-text">
                  <strong>{site.yearsInBusiness}+ yrs</strong>
                  <span>On the ground</span>
                </div>
              </div>
            </div>
          </div>
          {hardSurfaceHero ? null : (
          <div className="sub-hero-img">
              <Image
                src={heroImage}
                alt={heroAlt}
                width={720}
                height={450}
                priority
                fetchPriority="high"
                sizes="(max-width: 900px) 100vw, 720px"
              />
          </div>
          )}
        </section>

        {content && (
          <section className="content-section service-lead">
            <p className="service-lead-text">{content.lead}</p>
          </section>
        )}

        <section className="answer-grid">
          <div className="answer-card">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Who this is for
            </span>
            <h2>Right match for your property.</h2>
            <p>{service.intent}</p>
          </div>
          <div className="answer-card">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Why WSI is a fit
            </span>
            <h2>Built on {site.yearsInBusiness} years of surface care.</h2>
            <p>{service.proof}</p>
          </div>
        </section>

        {content && (
          <div className="band-tint">
            <section className="content-section service-definition">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                The basics
              </span>
              <h2>{content.definition.title}</h2>
              <p>{content.definition.body}</p>
            </section>
          </div>
        )}

        {content && (
          <section className="content-section service-process">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Our process
            </span>
            <h2>How we approach a {service.name.toLowerCase()} job.</h2>
            <ol className="process-list">
              {content.process.map((step, i) => (
                <li key={step.title}>
                  <span className="process-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {content && (
          <section className="content-section service-surfaces">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Surfaces we clean
            </span>
            <h2>What this service covers.</h2>
            <ul className="surfaces-grid">
              {content.surfaces.map((surface) => (
                <li key={surface.name}>
                  <h3 className="surface-name">{surface.name}</h3>
                  <p className="surface-note">{surface.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {content && (
          <div className="band-tint">
            <section className="content-section service-faqs">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                Frequently asked
              </span>
              <h2>{service.name} questions, answered.</h2>
              <div className="faq-list-inline">
                {content.faqs.map((faq) => (
                  <details key={faq.q} className="faq-item-inline">
                    <summary>
                      <h3>{faq.q}</h3>
                      <span aria-hidden="true" className="faq-toggle">
                        +
                      </span>
                    </summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        )}

        <section className="content-section service-links">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            {service.name} by area
          </span>
          <h2>{service.name} in your city.</h2>
          <div className="service-links-grid">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/${location.slug}/`}
              >
                {service.name} in {location.name} →
              </Link>
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
