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
  faqPageSchemaFromList,
  graph,
  serviceLocationSchema,
} from "@/lib/seo/schema";
import { getServiceContent } from "@/lib/service-content";
import { getLocationContent } from "@/lib/location-content";
import { getServiceLocationContent } from "@/lib/service-location-content";
import {
  getLocation,
  getService,
  locations,
  services,
  site,
  SITE_URL,
} from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string; city: string }>;
};

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

export function generateStaticParams() {
  return services.flatMap((service) =>
    locations.map((location) => ({
      slug: service.slug,
      city: location.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, city } = await params;
  const service = getService(slug);
  const location = getLocation(city);
  if (!service || !location) return {};

  const canonical = `/services/${service.slug}/${location.slug}`;
  const title = `${service.name} ${location.name}`;
  const description = `${service.name} in ${location.name}, QLD by WSI Cleaning — ${site.experienceLabel} experience, ${site.insuranceLabel}, ${site.rating}★ from ${site.reviewCountLabel} Google reviews. Fixed quotes returned within 24 business hours.`;
  const heroImage = SERVICE_IMAGE_MAP[service.slug] ?? service.image;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | WSI Cleaning`,
      description,
      url: canonical,
      images: [{ url: heroImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | WSI Cleaning`,
      description,
      images: [heroImage],
    },
  };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { slug, city } = await params;
  const service = getService(slug);
  const location = getLocation(city);
  if (!service || !location) notFound();

  const combo = getServiceLocationContent(service.slug, location.slug);
  if (!combo) notFound();

  const serviceContent = getServiceContent(service.slug);
  const locationContent = getLocationContent(location.slug);
  const heroImage = SERVICE_IMAGE_MAP[service.slug] ?? service.image;
  const heroAlt = `${service.name} job by WSI Cleaning in ${location.name}, QLD`;
  const canonical = `/services/${service.slug}/${location.slug}`;
  const faqId = `${SITE_URL}${canonical}#faq`;

  // Combo FAQs lead (unique to this page); service FAQs add depth.
  const faqList = [...combo.faqs, ...(serviceContent?.faqs ?? [])];

  const otherCity = locations.find((l) => l.slug !== location.slug);

  const pageSchema = graph(
    serviceLocationSchema({
      serviceName: service.name,
      cityName: location.name,
      description: combo.angle[0],
      serviceSlug: service.slug,
      citySlug: location.slug,
      image: heroImage,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/#services" },
      { name: service.name, url: `/services/${service.slug}` },
      { name: location.name, url: canonical },
    ]),
    faqPageSchemaFromList(faqList, faqId),
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
              {service.eyebrow} · {location.name}
            </span>
            <h1>
              {service.name} in{" "}
              <em className="hl-orange">{location.name}</em>.
            </h1>
            <p>{combo.angle[0]}</p>
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
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
        </section>

        <section className="content-section service-lead">
          {combo.angle.slice(1).map((paragraph, i) => (
            <p key={i} className="service-lead-text">
              {paragraph}
            </p>
          ))}
        </section>

        {locationContent && (
          <section className="content-section">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Local context · {location.name}
            </span>
            <h2>{locationContent.climate.title}</h2>
            <p>{locationContent.climate.body}</p>
          </section>
        )}

        {serviceContent && (
          <section className="content-section service-process">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Our process
            </span>
            <h2>
              How we approach {service.name.toLowerCase()} in {location.name}.
            </h2>
            <ol className="process-list">
              {serviceContent.process.map((step, i) => (
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

        {serviceContent && serviceContent.surfaces.length > 0 && (
          <section className="content-section service-surfaces">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Surfaces we clean
            </span>
            <h2>What this service covers.</h2>
            <ul className="surfaces-grid">
              {serviceContent.surfaces.map((surface) => (
                <li key={surface.name}>
                  <h3 className="surface-name">{surface.name}</h3>
                  <p className="surface-note">{surface.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {locationContent && locationContent.suburbs.length > 0 && (
          <section className="content-section">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Suburbs we cover
            </span>
            <h2>
              {service.name} across {location.name}.
            </h2>
            <ul className="suburb-list">
              {locationContent.suburbs.map((suburb) => (
                <li key={suburb}>{suburb}</li>
              ))}
              <li className="suburb-more">+ surrounding suburbs</li>
            </ul>
          </section>
        )}

        <section className="content-section service-faqs">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            {location.name} questions
          </span>
          <h2>
            {service.name} in {location.name}, answered.
          </h2>
          <div className="faq-list-inline">
            {faqList.map((faq) => (
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

        <section className="content-section service-links">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Keep exploring
          </span>
          <div className="service-links-grid">
            {otherCity && (
              <Link href={`/services/${service.slug}/${otherCity.slug}`}>
                {service.name} in {otherCity.name} →
              </Link>
            )}
            <Link href={`/services/${service.slug}`}>
              All about {service.name.toLowerCase()} →
            </Link>
            <Link href={`/locations/${location.slug}`}>
              All services in {location.name} →
            </Link>
            {combo.relatedGuide && (
              <Link href={`/guides/${combo.relatedGuide.slug}`}>
                {combo.relatedGuide.label} →
              </Link>
            )}
          </div>
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
