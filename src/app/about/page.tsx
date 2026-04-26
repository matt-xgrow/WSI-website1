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
import { services, site, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About WSI Cleaning",
  description: `Brisbane-based exterior cleaning company operating across South East Queensland since ${site.foundingYear}. ABN ${site.abnDisplay}. ${site.insuranceLabel}. ${site.rating}/5 from ${site.reviewCount} Google reviews.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About WSI Cleaning",
    description: `Exterior cleaning specialists since ${site.foundingYear}. ${site.insuranceLabel}. Brisbane, Gold Coast, Sunshine Coast.`,
    url: "/about",
    images: [{ url: "/images/wsi-team.jpg" }],
    type: "website",
  },
};

const PRINCIPLES = [
  {
    title: "Fixed quotes in writing, in 24 hours",
    body: "Every job is priced per surface — square metreage, condition, access — not per hour. The number you see on the quote is the number you pay. Quotes are returned within 24 business hours of enquiry.",
  },
  {
    title: "Right method for the surface",
    body: "Soft wash for any surface where high pressure would do damage (render, paint, weatherboard, fibre cement, roof tiles). Pressure wash for what you walk or drive on (concrete, pavers, retaining walls). Deionised water for glass and solar.",
  },
  {
    title: "Photo-documented work",
    body: "Gutter cleans, strata cycles and any commercial scope are documented with before-and-after photos sent with the invoice — useful for landlords, body corporate compliance and insurance records.",
  },
  {
    title: "24-hour satisfaction guarantee",
    body: "If you're not happy with the finish, tell us within 24 hours and we'll come back and fix it at no extra cost. We don't consider a job done until you're happy.",
  },
];

const COMPLIANCE = [
  {
    label: "Australian Business Number",
    value: site.abnDisplay,
    note: "ABN-registered Australian business since 2014.",
  },
  {
    label: "Public liability insurance",
    value: "$20,000,000",
    note: "Certificates of currency issued on request before any strata, commercial or government job.",
  },
  {
    label: "Contractor inductions",
    value: "Cm3 · Rapid Global · Avetta",
    note: "Inducted on the major Australian contractor management systems used by strata and commercial sites.",
  },
  {
    label: "Working at heights",
    value: "Site-specific SWMS",
    note: "Safe Work Method Statements issued for any roof, gutter or EWP work.",
  },
];

export default function AboutPage() {
  const pageSchema = graph(
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ]),
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#about`,
      url: `${SITE_URL}/about`,
      name: "About WSI Cleaning",
      description: `Exterior cleaning specialists serving Brisbane, Gold Coast and Sunshine Coast since ${site.foundingYear}. ABN ${site.abnDisplay}.`,
      mainEntity: { "@id": `${SITE_URL}/#business` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    }
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
              About WSI Cleaning
            </span>
            <h1>
              {site.yearsInBusiness}+ years cleaning the{" "}
              <em className="hl-orange">outside</em> of Queensland homes.
            </h1>
            <p>
              WSI Cleaning is a Brisbane-based exterior cleaning company,
              operating across Brisbane, the Gold Coast and the Sunshine Coast
              since {site.foundingYear}. We service residential homes, body
              corporate properties and commercial buildings — house washes,
              pressure cleans, window work, gutter clears, roof treatments,
              solar panel cleans, and full strata maintenance scopes.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-orange btn-lg" href="/#quote">
                Get a free quote →
              </Link>
              <a className="btn btn-ghost btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="sub-hero-img">
            <Image
              src="/images/wsi-team.jpg"
              alt={`The WSI Cleaning team on a Brisbane job — operating since ${site.foundingYear}`}
              width={720}
              height={450}
              priority
            />
          </div>
        </section>

        <section className="content-section service-lead">
          <p className="service-lead-text">
            Founded in {site.foundingYear}, WSI Cleaning has built a steady
            base of repeat residential, body corporate and commercial clients
            across South East Queensland — {site.rating}/5 stars from{" "}
            {site.reviewCount} Google reviews,{" "}
            {site.insuranceLabel.toLowerCase()}, and a service area covering
            Brisbane, the Gold Coast and the Sunshine Coast. We
            don&rsquo;t do interior cleaning. We don&rsquo;t do garden work.
            Everything we do is exterior — surfaces that take weather, salt,
            mould and traffic, and the chemistry and pressure required to
            restore them safely.
          </p>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            How we operate
          </span>
          <h2>The principles that guide every job.</h2>
          <ul className="surfaces-grid">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <h3 className="surface-name">{p.title}</h3>
                <p className="surface-note">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Methodology
          </span>
          <h2>The right method for every surface.</h2>
          <p>
            Most exterior cleaning failures come from using the wrong tool on
            the wrong surface — pressure-washing render and stripping the
            coating, blasting roof tiles loose, scratching coated glass with
            stiff brushes. Our entire process is built around matching method
            to substrate, not the other way around.
          </p>
          <ul className="surfaces-grid">
            <li>
              <h3 className="surface-name">Soft washing (under 500 PSI)</h3>
              <p className="surface-note">
                Render, paint, weatherboard, fibre cement, roof tiles and
                building facades. Detergent-led — chemistry kills mould and
                algae at the spore level.
              </p>
            </li>
            <li>
              <h3 className="surface-name">
                Pressure washing (1,500–4,000 PSI)
              </h3>
              <p className="surface-note">
                Concrete, exposed aggregate, pavers, retaining walls,
                driveways and pool surrounds. Surface-cleaner-led for even
                results without zebra striping.
              </p>
            </li>
            <li>
              <h3 className="surface-name">Deionised water + soft brushes</h3>
              <p className="surface-note">
                Solar panels, glass facades and high-rise windows. Mineral-free
                water dries with no spotting; warranty-safe on PV.
              </p>
            </li>
            <li>
              <h3 className="surface-name">EWP and rope access (heights)</h3>
              <p className="surface-note">
                EWP for buildings to 3 storeys; hired access for higher work.
                Site-specific SWMS issued before every working-at-heights job.
              </p>
            </li>
          </ul>
          <p>
            <Link href="/services/pressure-washing">
              Read more on soft wash vs pressure wash →
            </Link>
          </p>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Compliance and credentials
          </span>
          <h2>Documented, insured, inducted.</h2>
          <ul className="surfaces-grid">
            {COMPLIANCE.map((item) => (
              <li key={item.label}>
                <h3 className="surface-name">{item.label}</h3>
                <p
                  className="surface-note"
                  style={{ fontWeight: 600, color: "var(--ink-1)" }}
                >
                  {item.value}
                </p>
                <p className="surface-note">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Where we work
          </span>
          <h2>South East Queensland — three metro hubs.</h2>
          <p>
            We operate from a Brisbane base across three metro markets in South
            East Queensland. Brisbane is the primary service area with
            same-week scheduling for residential. The Gold Coast and Sunshine
            Coast are run as weekly batched trips so multiple jobs share the
            travel time.
          </p>
          <ul className="suburb-list">
            <li>
              <Link href="/locations/brisbane">Brisbane →</Link>
            </li>
            <li>
              <Link href="/locations/gold-coast">Gold Coast →</Link>
            </li>
            <li>
              <Link href="/locations/sunshine-coast">Sunshine Coast →</Link>
            </li>
          </ul>
        </section>

        <section className="content-section">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            What we clean
          </span>
          <h2>Nine exterior cleaning services.</h2>
          <p>
            Every service we offer is exterior. We don&rsquo;t do interior
            cleaning, garden work or pest control — exterior surface care is
            the only thing we do, and the only thing we want to do.
          </p>
          <ul className="suburb-list">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  {service.name} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
