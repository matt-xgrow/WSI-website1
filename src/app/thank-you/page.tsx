import type { Metadata } from "next";
import Link from "next/link";
import { AdsConversion } from "@/components/analytics/ads-conversion";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { TopBar } from "@/components/site/top-bar";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { BASELINE_META } from "@/lib/seo/baseline-meta";
import { site } from "@/lib/site";

const meta = BASELINE_META["/thank-you/"];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: "/thank-you/" },
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = first(params.lead_name);
  const service = first(params.service);
  const city = first(params.city) || first(params.suburb);

  return (
    <>
      <AdsConversion />
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Thank you", url: "/thank-you/" },
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
              Request received
            </span>
            <h1>Thanks — your quote request is in.</h1>
            <p>
              {name ? `Thanks ${name}. ` : ""}
              We’ll call you within 24 business hours with a fixed price — no obligation.
              {service ? ` Service: ${service}.` : ""}
              {city ? ` Suburb: ${city}.` : ""}
            </p>
            <ol className="process-list">
              <li>
                <span className="process-num">01</span>
                <div>
                  <h2 className="process-step-title">We review your details</h2>
                  <p>The service, location and any notes you left us.</p>
                </div>
              </li>
              <li>
                <span className="process-num">02</span>
                <div>
                  <h2 className="process-step-title">We call or text you</h2>
                  <p>Usually within 24 business hours, often sooner.</p>
                </div>
              </li>
              <li>
                <span className="process-num">03</span>
                <div>
                  <h2 className="process-step-title">You get a fixed price</h2>
                  <p>No hourly surprises — book only if it works for you.</p>
                </div>
              </li>
            </ol>
            <div className="hero-actions">
              <a className="btn btn-orange btn-lg" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
              <Link className="btn btn-ghost btn-lg" href="/">
                Back to home
              </Link>
            </div>
            <p>Need something sooner? Give us a call — otherwise, you can safely close this tab.</p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
