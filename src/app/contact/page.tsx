import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { QuoteSection } from "@/components/site/quote-section";
import { StickyCTA } from "@/components/site/sticky-cta";
import { TopBar } from "@/components/site/top-bar";
import { breadcrumbSchema, graph, localBusinessSchema } from "@/lib/seo/schema";
import { BASELINE_META } from "@/lib/seo/baseline-meta";
import { site } from "@/lib/site";

const meta = BASELINE_META["/contact/"];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact/" },
          ]),
        )}
      />
      <main className="page-shell">
        <TopBar />
        <Nav />
        <section className="sub-hero">
          <div>
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Contact WSI Cleaning
            </span>
            <h1>Get a fixed quote, or call us.</h1>
            <p>
              Exterior cleaning across Brisbane and the Sunshine Coast. Quotes in writing within 24 business hours. ABN {site.abnDisplay}. {site.insuranceLabel}.
            </p>
            <ul>
              <li>
                Phone: <a href={site.phoneHref}>{site.phoneDisplay}</a> ({site.phoneE164})
              </li>
              <li>
                Email: <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                WhatsApp: <a href={site.whatsappHref}>Message {site.phoneDisplay}</a>
              </li>
              <li>Hours: 7am–7pm, seven days</li>
            </ul>
          </div>
        </section>
        <QuoteSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
