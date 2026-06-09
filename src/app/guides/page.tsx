import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { GUIDES } from "@/lib/guides";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/guides`;
const TITLE =
  "Exterior Cleaning Guides — Brisbane & Sunshine Coast Cost, Method & Frequency";
const DESCRIPTION =
  "Pricing guides, method comparisons and frequency calendars for house washing, pressure cleaning and window cleaning across Brisbane and the Sunshine Coast. Written from real jobs — not generic templates.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/guides",
    type: "website",
    images: [{ url: "/images/soft-wash.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/soft-wash.jpg"],
  },
};

const CATEGORIES: {
  key: "house-washing" | "pressure-washing" | "window-cleaning" | "method";
  label: string;
  blurb: string;
}[] = [
  {
    key: "method",
    label: "Method",
    blurb:
      "How soft washing, pressure washing and deionised-water cleaning differ — and which one your surface actually needs.",
  },
  {
    key: "house-washing",
    label: "House washing",
    blurb:
      "Cost, frequency and what's included for soft-washed house exteriors across Brisbane and the Sunshine Coast.",
  },
  {
    key: "pressure-washing",
    label: "Pressure washing",
    blurb:
      "Driveways, pavers, pool surrounds and concrete — pricing per square metre and how to identify what's growing.",
  },
  {
    key: "window-cleaning",
    label: "Window cleaning",
    blurb:
      "Per-pane pricing, frequency by property type, and the salt-haze problem on coastal Sunshine Coast glass.",
  },
];

export default function GuidesIndex() {
  const itemListSchema = {
    "@type": "ItemList",
    "@id": `${PAGE_URL}#guides-list`,
    name: "WSI Cleaning — Exterior Cleaning Guides",
    description: DESCRIPTION,
    numberOfItems: GUIDES.length,
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/guides/${g.slug}`,
      name: g.title,
    })),
  };

  const collectionSchema = {
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    mainEntity: { "@id": `${PAGE_URL}#guides-list` },
    dateModified: CONTENT_UPDATED.guides,
  };

  const pageSchema = graph(
    collectionSchema,
    itemListSchema,
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
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
              Guides & resources
            </span>
            <h1>
              Exterior cleaning, <em className="hl-orange">explained</em>.
            </h1>
            <p>
              Pricing guides, method comparisons and frequency calendars for
              house washing, pressure washing and window cleaning across
              Brisbane and the Sunshine Coast. Written from real jobs — not
              generic templates.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="/#quote">
                Get a free quote →
              </Link>
              <Link className="btn btn-ghost btn-lg" href="#all-guides">
                Browse all guides
              </Link>
            </div>
          </div>
          <div className="sub-hero-img">
            <Image
              src="/images/soft-wash.jpg"
              alt="Exterior cleaning guides for Brisbane and Sunshine Coast properties"
              width={720}
              height={450}
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Browse by topic
          </span>
          <h2>What do you need to know?</h2>
          <div className="guides-cat-grid">
            {CATEGORIES.map((cat) => {
              const inCat = GUIDES.filter(
                (g) => g.category === cat.key
              ).length;
              return (
                <Link
                  key={cat.key}
                  href={`#cat-${cat.key}`}
                  className="guides-cat-card"
                >
                  <span className="guides-cat-count">{inCat} guides</span>
                  <h3>{cat.label}</h3>
                  <p>{cat.blurb}</p>
                  <span className="guides-cat-cta">View guides →</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="content-section" id="all-guides">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            All guides
          </span>
          <h2>Every guide we&rsquo;ve written.</h2>

          {CATEGORIES.map((cat) => {
            const items = GUIDES.filter((g) => g.category === cat.key);
            if (!items.length) return null;
            return (
              <div
                key={cat.key}
                id={`cat-${cat.key}`}
                style={{ marginTop: 36 }}
              >
                <h3 style={{ marginBottom: 16, fontSize: 22 }}>
                  {cat.label}
                </h3>
                <ul className="suburb-list">
                  {items.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/guides/${g.slug}`}>
                        <strong>{g.headline.replace(/[.?]$/, "")}</strong>
                        <br />
                        <span
                          style={{
                            color: "var(--ink-1, #525866)",
                            fontSize: 14,
                          }}
                        >
                          {g.region} · {g.readingMinutes} min read · Updated{" "}
                          {new Date(
                            `${g.updated}T00:00:00`
                          ).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
