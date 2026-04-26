import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { TopBar } from "@/components/site/top-bar";
import { locations, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "We couldn't find that page. Browse our exterior cleaning services and service areas, or get in touch for a quote.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="page-shell">
      <TopBar />
      <Nav />

      <section className="sub-hero" style={{ minHeight: "auto" }}>
        <div>
          <span className="hero-eyebrow">
            <span className="eyebrow-dot" />
            404
          </span>
          <h1>
            We couldn&rsquo;t find that <em className="hl-orange">page</em>.
          </h1>
          <p>
            The link may have moved, been renamed, or never existed. Try one of
            the routes below, or get in touch and we&rsquo;ll point you at the
            right place.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-orange btn-lg" href="/">
              Back to home →
            </Link>
            <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="content-section">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          Browse services
        </span>
        <h2>What we clean.</h2>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            listStyle: "none",
            padding: 0,
            marginTop: 24,
          }}
        >
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`}>{service.name} →</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          Service areas
        </span>
        <h2>Where we work.</h2>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            listStyle: "none",
            padding: 0,
            marginTop: 24,
          }}
        >
          {locations.map((location) => (
            <li key={location.slug}>
              <Link href={`/locations/${location.slug}`}>
                {location.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
