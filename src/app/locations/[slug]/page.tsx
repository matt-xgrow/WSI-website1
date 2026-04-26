import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqPageSchemaFromList,
  graph,
  locationServiceSchema,
} from "@/lib/seo/schema";
import { getLocationContent } from "@/lib/location-content";
import { getLocation, locations, services, site, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const LOCATION_HERO: Record<string, string> = {
  brisbane: "/images/commercial-pressure.jpg",
  "gold-coast": "/images/residential-aerial.jpg",
  "sunshine-coast": "/images/glass-wash.jpg",
};

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  const canonical = `/locations/${location.slug}`;
  const heroImage = LOCATION_HERO[location.slug] ?? "/images/aerial-clean.jpg";
  return {
    title: location.title,
    description: location.description,
    alternates: { canonical },
    openGraph: {
      title: location.title,
      description: location.description,
      url: canonical,
      images: [{ url: heroImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: location.title,
      description: location.description,
      images: [heroImage],
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const heroImg = LOCATION_HERO[location.slug] ?? "/images/aerial-clean.jpg";
  const content = getLocationContent(location.slug);
  const canonical = `/locations/${location.slug}`;
  const faqId = `${SITE_URL}${canonical}#faq`;

  const pageSchema = graph(
    locationServiceSchema({
      name: location.name,
      slug: location.slug,
      description: location.description,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Service Areas", url: "/#areas" },
      { name: location.name, url: canonical },
    ]),
    ...(content ? [faqPageSchemaFromList(content.faqs, faqId)] : [])
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
              {location.priority}
            </span>
            <h1>
              Exterior cleaning in{" "}
              <em className="hl-orange">{location.name}</em>.
            </h1>
            <p>{location.description}</p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="#quote">
                Get a free quote →
              </Link>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="sub-hero-img">
            <Image
              src={heroImg}
              alt={`WSI Cleaning service area in ${location.name}, QLD`}
              width={720}
              height={450}
              priority
            />
          </div>
        </section>

        {content && (
          <section className="content-section service-lead">
            <p className="service-lead-text">{content.lead}</p>
            {content.stats.length > 0 && (
              <ul className="location-stats">
                {content.stats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {content && (
          <section className="content-section">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Local context
            </span>
            <h2>{content.climate.title}</h2>
            <p>{content.climate.body}</p>
          </section>
        )}

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Working in {location.name}
          </span>
          <h2>What we do most often in {location.name}.</h2>
          {content?.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>

        {content && content.suburbs.length > 0 && (
          <section className="content-section">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Suburbs we cover
            </span>
            <h2>{location.name} suburbs in our service area.</h2>
            <ul className="suburb-list">
              {content.suburbs.map((suburb) => (
                <li key={suburb}>{suburb}</li>
              ))}
              <li className="suburb-more">+ surrounding suburbs</li>
            </ul>
          </section>
        )}

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Services in {location.name}
          </span>
          <h2>What we clean across {location.name}.</h2>
          <div className="location-areas-grid">
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                aria-label={`${service.name} in ${location.name}`}
              >
                <Image
                  src={service.image}
                  alt=""
                  width={72}
                  height={72}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    objectFit: "cover",
                  }}
                />
                <span>
                  {service.name} in {location.name}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 3 L11 8 L5 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <strong>{service.description}</strong>
              </Link>
            ))}
          </div>
        </section>

        {content && (
          <section className="content-section service-faqs">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              {location.name} questions
            </span>
            <h2>Frequently asked about {location.name}.</h2>
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
        )}

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
