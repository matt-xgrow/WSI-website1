import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <div>
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line" />
            Ready when you are
          </div>
          <h3 className="footer-cta-title">Let&rsquo;s make it look new again.</h3>
        </div>
        <div className="footer-cta-actions">
          <a href={site.phoneHref} className="btn btn-ghost-light btn-lg">
            Call {site.phoneDisplay}
          </a>
          <a href="#quote" className="btn btn-orange btn-lg">
            Request a quote →
          </a>
        </div>
      </div>

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
            WSI Cleaning is a Brisbane-based exterior cleaning company serving
            homeowners, strata and commercial clients across Queensland and New
            South Wales since 2014.
          </p>
          <div className="footer-pay">
            {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Afterpay"].map((p) => (
              <span key={p} className="pay-chip">{p}</span>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="/services/pressure-cleaning-brisbane">Pressure Washing</a></li>
            <li><a href="/services/house-washing-brisbane">House Washing</a></li>
            <li><a href="#services">Roof Cleaning</a></li>
            <li><a href="/services/gutter-cleaning-brisbane">Gutter Cleaning</a></li>
            <li><a href="/services/window-cleaning-brisbane">Window Cleaning</a></li>
            <li><a href="#services">Commercial & Strata</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Locations</h5>
          <ul>
            <li><a href="/locations/brisbane">Brisbane</a></li>
            <li><a href="/locations/sunshine-coast">Sunshine Coast</a></li>
            <li><a href="/locations/gold-coast">Gold Coast</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href={site.phoneHref}>{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>Mon–Sun · 7am–7pm</li>
            <li>ABN verified · $20M insured</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} WSI Cleaning. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
