import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  graph,
  serviceSchema,
} from "@/lib/seo/schema";
import { getService, services, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const canonical = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
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

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const heroImage = SERVICE_IMAGE_MAP[service.slug] ?? service.image;
  const heroAlt = `${service.name} job by WSI Cleaning in Brisbane`;

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
      { name: service.name, url: `/services/${service.slug}` },
    ])
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
              {service.eyebrow}
            </span>
            <h1>{service.name}</h1>
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
                  aria-label={`${site.rating} out of 5 from ${site.reviewCount} Google reviews`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} style={{ color: "#FBBC05" }} />
                  ))}
                </div>
                <div className="trust-text">
                  <strong>{site.rating}</strong>
                  <span>{site.reviewCountLabel} Google reviews</span>
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
          <div className="sub-hero-img">
            <Image
              src={heroImage}
              alt={heroAlt}
              width={720}
              height={450}
              priority
            />
          </div>
        </section>

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

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            About this service
          </span>
          <h2>
            {service.name} — done the{" "}
            <em className="hl-orange">right way</em> for your surface.
          </h2>
          <p>
            We provide {service.name.toLowerCase()} across Brisbane, Gold Coast
            and Sunshine Coast. Every job starts with a quick look at the
            surface, the level of build-up and the safest cleaning method — so
            the finish lasts longer and the surface is never compromised.
          </p>
          <p>
            Every WSI crew arrives with commercial-grade equipment, the right
            cleaning chemistry and {site.insuranceLabel.toLowerCase()}. We work
            efficiently, leave the area tidy and give you honest advice about
            what the property actually needs. Quotes are returned within 24
            business hours and fixed in writing before we start.
          </p>
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}

