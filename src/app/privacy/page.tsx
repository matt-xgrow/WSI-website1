import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { site, SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/privacy`;
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How WSI Cleaning collects, uses, stores and protects your personal information when you request a quote or use our website.";
const UPDATED = "2026-04-26";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${TITLE} — WSI Cleaning`,
    description: DESCRIPTION,
    url: "/privacy",
    type: "article",
    publishedTime: UPDATED,
    modifiedTime: UPDATED,
  },
};

export default function PrivacyPage() {
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
      { name: "Privacy Policy", url: "/privacy" },
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
              Privacy <em className="hl-orange">Policy</em>.
            </h1>
            <p>
              How {site.legalName} collects, uses and protects your personal
              information. Last updated 26 April 2026.
            </p>
          </div>
        </section>

        <section className="content-section">
          <h2>Who we are</h2>
          <p>
            {site.legalName} (ABN {site.abnDisplay}) is an Australian exterior
            cleaning business operating from Brisbane, Queensland. In this
            policy &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer
            to {site.legalName}. We comply with the Australian Privacy
            Principles set out in the{" "}
            <em>Privacy Act 1988 (Cth)</em>.
          </p>
        </section>

        <section className="content-section">
          <h2>What information we collect</h2>
          <p>
            We only collect information you knowingly provide when you request a
            quote, book a job, or contact us. This typically includes:
          </p>
          <ul>
            <li>Your name</li>
            <li>Phone number and email address</li>
            <li>Property address (so we can quote the job)</li>
            <li>Details about the property and the work you&rsquo;d like done</li>
            <li>
              Photos you upload of the property (optional, only if you send them
              with your enquiry)
            </li>
          </ul>
          <p>
            We do not collect financial information through this website.
            Payments are processed by third-party providers (bank, card
            processor, PayPal, Afterpay) under their own privacy terms.
          </p>
        </section>

        <section className="content-section">
          <h2>How we use it</h2>
          <ul>
            <li>To prepare and send you a written quote</li>
            <li>To schedule, confirm and complete the work you&rsquo;ve booked</li>
            <li>To send invoices and receipts</li>
            <li>To follow up if you asked us to</li>
            <li>To send recurring service reminders if you&rsquo;ve opted in</li>
            <li>To comply with our legal and tax obligations</li>
          </ul>
          <p>
            We do not sell your information. We do not share it with third
            parties for marketing.
          </p>
        </section>

        <section className="content-section">
          <h2>Cookies and analytics</h2>
          <p>
            Our website uses minimal first-party cookies for site functionality
            and aggregated analytics (page views, traffic sources). We do not
            run advertising trackers on this site. Analytics data is anonymised
            and is not used to identify individuals.
          </p>
        </section>

        <section className="content-section">
          <h2>How we store and protect your information</h2>
          <p>
            Quote and customer records are stored in access-controlled business
            systems. Records are retained for the period required by Australian
            tax law (typically 7 years for invoiced work) and then destroyed.
            Where you ask us to delete data and we have no legal reason to keep
            it, we will do so.
          </p>
        </section>

        <section className="content-section">
          <h2>Your rights</h2>
          <p>You can ask us at any time to:</p>
          <ul>
            <li>See what personal information we hold about you</li>
            <li>Correct it if it&rsquo;s wrong</li>
            <li>Delete it (where we&rsquo;re not required to retain it)</li>
            <li>Unsubscribe from any reminders or follow-ups</li>
          </ul>
          <p>
            Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a href={site.phoneHref}>{site.phoneDisplay}</a> and we&rsquo;ll
            action your request within 30 days.
          </p>
        </section>

        <section className="content-section">
          <h2>Complaints</h2>
          <p>
            If you believe we&rsquo;ve mishandled your personal information,
            email <a href={`mailto:${site.email}`}>{site.email}</a> with the
            subject line &ldquo;Privacy complaint&rdquo;. If you&rsquo;re not
            satisfied with our response you can lodge a complaint with the
            Office of the Australian Information Commissioner (OAIC) at{" "}
            <a
              href="https://www.oaic.gov.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              oaic.gov.au
            </a>
            .
          </p>
        </section>

        <section className="content-section">
          <h2>Contact</h2>
          <p>
            {site.legalName}
            <br />
            ABN {site.abnDisplay}
            <br />
            Brisbane, Queensland, Australia
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
