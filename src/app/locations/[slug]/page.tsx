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
  graph,
  locationServiceSchema,
} from "@/lib/seo/schema";
import { getLocation, locations, services, site } from "@/lib/site";

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

  const isPrimary = location.slug === "brisbane";
  const heroImg = LOCATION_HERO[location.slug] ?? "/images/aerial-clean.jpg";

  const pageSchema = graph(
    locationServiceSchema({
      name: location.name,
      slug: location.slug,
      description: location.description,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Service Areas", url: "/#areas" },
      { name: location.name, url: `/locations/${location.slug}` },
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

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Working in {location.name}
          </span>
          <h2>
            {isPrimary
              ? "Brisbane homes and businesses, cleaned by a local crew."
              : `${location.name} bookings, handled by our Brisbane-based team.`}
          </h2>
          <p>
            {isPrimary
              ? `Brisbane is home for WSI Cleaning and where we book most of our house washing, pressure cleaning, window cleaning and gutter work. We know the local architecture, the weather patterns and the surfaces that need extra care.`
              : `We take on ${location.name} jobs whenever our crews are heading down the coast. Brisbane stays our priority area, so we'll let you know about availability when you get in touch.`}
          </p>
        </section>

        <section className="location-areas-grid">
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
              <span>{service.name}</span>
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
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
