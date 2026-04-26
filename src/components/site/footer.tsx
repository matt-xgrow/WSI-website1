import Image from "next/image";
import Link from "next/link";
import { locations, services, site } from "@/lib/site";

const FOOTER_SERVICE_LIMIT = 6;

const PAYMENT_METHODS = [
  { name: "Visa", file: "visa" },
  { name: "Mastercard", file: "mastercard" },
  { name: "American Express", file: "americanexpress" },
  { name: "Apple Pay", file: "applepay" },
  { name: "Google Pay", file: "googlepay" },
  { name: "Afterpay", file: "afterpay" },
];

export function Footer() {
  const featuredServices = services.slice(0, FOOTER_SERVICE_LIMIT);

  return (
    <>
      <div className="footer-cta-strip">
        <div className="footer-cta">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Ready when you are
            </div>
            <p className="footer-cta-title-dark">
              Let&rsquo;s make it look new again.
            </p>
          </div>
          <div className="footer-cta-actions">
            <a href={site.phoneHref} className="btn btn-ghost btn-lg">
              Call {site.phoneDisplay}
            </a>
            <Link href="/#quote" className="btn btn-orange btn-lg">
              Request a quote →
            </Link>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col footer-col-wide">
            <Image
              src="/design/logo-white.png"
              alt="WSI Cleaning"
              width={240}
              height={120}
              className="footer-logo-img"
              style={{ height: 60, width: "auto" }}
            />
            <p className="footer-about">
              WSI Cleaning is a Brisbane-based exterior cleaning company
              servicing homeowners, body corporate managers and commercial
              clients across South East Queensland since {site.foundingYear}.
              ABN {site.abnDisplay} · {site.insuranceLabel}.
            </p>
            <div
              className="footer-pay"
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              {PAYMENT_METHODS.map((p) => (
                <span
                  key={p.name}
                  aria-label={p.name}
                  style={{ display: "inline-flex" }}
                >
                  <Image
                    src={`/images/payment/${p.file}.svg`}
                    alt={p.name}
                    width={36}
                    height={24}
                    style={{
                      height: "24px",
                      width: "auto",
                      filter: "brightness(0) invert(1)",
                      opacity: 0.75,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-col-heading">Services</p>
            <ul>
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-heading">Locations</p>
            <ul>
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`}>
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-heading">Contact</p>
            <ul>
              <li>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>Mon–Sun · 7am–7pm</li>
              <li>
                ABN {site.abnDisplay} · {site.insuranceLabel}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </footer>
    </>
  );
}
