import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { getService, services, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | WSI Cleaning`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

const SERVICE_IMAGE_MAP: Record<string, string> = {
  "house-washing-brisbane": "/images/residential-aerial.jpg",
  "pressure-cleaning-brisbane": "/images/commercial-pressure.jpg",
  "window-cleaning-brisbane": "/images/commercial-windows.jpg",
  "gutter-cleaning-brisbane": "/images/soft-wash.jpg",
};

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const heroImage = SERVICE_IMAGE_MAP[service.slug] ?? service.image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      telephone: site.phoneDisplay,
      url: site.url,
    },
    areaServed: ["Brisbane", "Gold Coast", "Sunshine Coast"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page-shell">
        <TopBar />
        <Nav />

        <section className="sub-hero">
          <div>
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              {service.eyebrow}
            </span>
            <h1>
              {service.name} <em className="hl-orange">Brisbane</em>.
            </h1>
            <p>{service.description}</p>
            <div className="hero-actions">
              <a className="btn btn-orange btn-lg" href="#quote">
                Get a free quote →
              </a>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="sub-hero-img">
            <Image
              src={heroImage}
              alt={service.title}
              width={720}
              height={900}
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
            <h2>Built on ten years of surface care.</h2>
            <p>{service.proof}</p>
          </div>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            About this service
          </span>
          <h2>
            {service.name} — done the <em className="hl-orange">right way</em> for your surface.
          </h2>
          <p>
            We bring {service.name.toLowerCase()} to Brisbane homes, strata and
            commercial properties across the wider metro area. Every job starts
            with a quick look at the surface, the level of build-up and the
            safest cleaning method — so the finish lasts longer and the surface
            is never compromised.
          </p>
          <p>
            Every WSI crew arrives with commercial-grade equipment, the right
            cleaning chemistry and $20M public liability cover. We work
            efficiently, leave the area tidy and give you honest advice about
            what the property actually needs.
          </p>
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
