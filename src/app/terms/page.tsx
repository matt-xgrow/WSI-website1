import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { site, SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/terms`;
const TITLE = "Terms of Service";
const DESCRIPTION =
  "Terms that apply when you request a quote, book a clean or use the WSI Cleaning website.";
const UPDATED = "2026-04-26";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${TITLE} — WSI Cleaning`,
    description: DESCRIPTION,
    url: "/terms",
    type: "article",
    publishedTime: UPDATED,
    modifiedTime: UPDATED,
  },
};

export default function TermsPage() {
  const pageSchema = graph(
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: `${TITLE} — ${site.name}`,
      description: DESCRIPTION,
      datePublished: UPDATED,
      dateModified: UPDATED,
      inLanguage: "en-AU",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Terms of Service", url: "/terms" },
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
              Legal
            </span>
            <h1>
              Terms of <em className="hl-orange">Service</em>.
            </h1>
            <p>
              Plain-English terms covering quotes, bookings, the work itself
              and the guarantee. Last updated 26 April 2026.
            </p>
          </div>
        </section>

        <section className="content-section">
          <h2>About these terms</h2>
          <p>
            These terms apply when you request a quote, book a clean, or use
            this website. The contracting party is {site.legalName} (ABN{" "}
            {site.abnDisplay}). By requesting a quote or booking work you agree
            to these terms.
          </p>
        </section>

        <section className="content-section">
          <h2>Quotes</h2>
          <ul>
            <li>
              Quotes are returned in writing within 24 business hours of
              enquiry.
            </li>
            <li>
              Quotes are fixed-price for the scope described in the quote. If
              the scope changes on the day, we will price the change in writing
              before continuing.
            </li>
            <li>
              Quotes are valid for 30 days. After 30 days we may need to
              re-quote if conditions or input costs have changed.
            </li>
            <li>
              Quotes are based on the information you provide. If access,
              substrate, condition or scope is materially different on the day
              we may need to re-quote before starting.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Bookings and cancellations</h2>
          <ul>
            <li>
              A booking is confirmed when we&rsquo;ve agreed a date in writing.
            </li>
            <li>
              You can reschedule or cancel up to 24 hours before the booking
              at no charge. Inside 24 hours we may charge a travel fee.
            </li>
            <li>
              Heavy rain or unsafe conditions on the day may require us to
              postpone. We do not charge for weather-driven postponements.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Payment</h2>
          <ul>
            <li>
              Residential jobs are invoiced on completion and payable within 7
              days unless otherwise agreed.
            </li>
            <li>
              Commercial, strata and recurring work follows the terms in the
              service agreement.
            </li>
            <li>
              Accepted payment methods: bank transfer, card, Apple Pay, Google
              Pay, PayPal and Afterpay. Invoice terms available for commercial
              and strata clients.
            </li>
            <li>
              Overdue invoices may attract a late fee and recovery costs in
              accordance with Australian law.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>The work and our 24-hour guarantee</h2>
          <ul>
            <li>
              We use the cleaning method appropriate to the surface (soft wash,
              pressure wash, or deionised-water) — never the wrong method
              because it&rsquo;s cheaper or faster.
            </li>
            <li>
              If you&rsquo;re not satisfied with the result, tell us within 24
              hours of completion and we&rsquo;ll come back and fix it at no
              extra cost.
            </li>
            <li>
              Pre-existing damage (cracked render, loose tiles, failing paint,
              corroded metal) is documented and excluded from the guarantee
              where it&rsquo;s outside our control.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Liability and insurance</h2>
          <ul>
            <li>
              {site.legalName} carries {site.insuranceLabel.toLowerCase()}.
              Certificates of currency are issued on request.
            </li>
            <li>
              We are not liable for pre-existing damage to surfaces, failed
              waterproofing that allows water ingress during cleaning, or items
              not declared by the client.
            </li>
            <li>
              Our maximum liability for any one job is limited to the value of
              that job, except where a higher liability is required by
              Australian Consumer Law.
            </li>
            <li>
              Nothing in these terms excludes any non-excludable rights you have
              under the Australian Consumer Law.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Photos of completed work</h2>
          <p>
            We may take before-and-after photos of completed work for our own
            quality and marketing records. If you&rsquo;d prefer we don&rsquo;t,
            tell us before the job and we&rsquo;ll note it on the booking.
            Identifiable details (house number, vehicle plates) are blurred or
            cropped from any public use.
          </p>
        </section>

        <section className="content-section">
          <h2>Website use</h2>
          <p>
            Content on this website is provided for general information. We try
            to keep it accurate but it&rsquo;s not a substitute for a written
            quote. We may update or change the website at any time.
          </p>
        </section>

        <section className="content-section">
          <h2>Contact</h2>
          <p>
            {site.legalName}
            <br />
            ABN {site.abnDisplay}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
          </p>
          <p>
            <Link href="/">← Back to home</Link>
          </p>
        </section>

        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
