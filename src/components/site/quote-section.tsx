"use client";

import { useState } from "react";
import { trackLeadSubmitted } from "@/lib/analytics";
import { readCampaignParams } from "@/lib/campaign";
import { site } from "@/lib/site";

const SERVICES = [
  "House Washing",
  "Pressure Washing",
  "Window Cleaning",
  "Gutter Cleaning",
  "Roof Cleaning",
  "Driveway Cleaning",
  "Solar Panel Cleaning",
  "Strata Cleaning",
  "Commercial Buildings",
  "Not sure / general enquiry",
];

type Data = {
  services: string[];
  name: string;
  phone: string;
  email: string;
  suburb: string;
  notes: string;
  company_website: string;
};

const INITIAL: Data = {
  services: [],
  name: "",
  phone: "",
  email: "",
  suburb: "",
  notes: "",
  company_website: "",
};

export function QuoteSection() {
  return (
    <section className="quote-sec" id="quote">
      <div className="quote-layout">
        <div className="quote-left">
          <span className="eyebrow eyebrow-light">
            <span className="eyebrow-line" />
            Get a free quote
          </span>
          <h2 className="section-title section-title-light">
            A{" "}
            <em className="hl-orange" style={{ color: "var(--orange-2)" }}>
              fixed price
            </em>
            , no hidden fees.
          </h2>
          <p className="quote-blurb">
            Quick and simple. No pushy follow-ups, no hidden fees, no phone
            call unless you ask for one.
          </p>

          <div className="quote-benefits">
            <div className="qb-item">
              <span className="qb-icon">✓</span>
              <div>
                <strong>Fast response</strong>
                <span>
                  We&rsquo;ll get back to you as quickly as possible — usually
                  within one business day.
                </span>
              </div>
            </div>
            <div className="qb-item">
              <span className="qb-icon">✓</span>
              <div>
                <strong>Fixed pricing</strong>
                <span>
                  No hourly surprises. The number we quote is the number you
                  pay.
                </span>
              </div>
            </div>
            <div className="qb-item">
              <span className="qb-icon">✓</span>
              <div>
                <strong>Or just call us</strong>
                <span>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a> · Mon–Sun,
                  7am–7pm
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="quote-right">
          <div className="quote-card">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [data, setData] = useState<Data>(INITIAL);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = <K extends keyof Data>(k: K, v: Data[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleService = (service: string) => {
    setData((current) => {
      const has = current.services.includes(service);
      return {
        ...current,
        services: has
          ? current.services.filter((item) => item !== service)
          : [...current.services, service],
      };
    });
  };

  const canSubmit =
    data.services.length > 0 && !!data.name && !!data.phone && !!data.suburb;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");
    const campaign = readCampaignParams();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          suburb: data.suburb,
          service: data.services.join(", "),
          message: data.notes.trim(),
          company_website: data.company_website,
          sourcePath: window.location.pathname,
          ...campaign,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          result.message ??
            `Something went wrong. Please call us on ${site.phoneDisplay}.`,
        );
        return;
      }
      trackLeadSubmitted({
        form_name: "quote_section_form",
        service: data.services.join(", "),
        location: data.suburb,
      });
      const redirectParams = new URLSearchParams();
      for (const [key, value] of Object.entries(campaign)) {
        if (value) redirectParams.set(key, value);
      }
      redirectParams.set("service", data.services.join(", "));
      redirectParams.set("suburb", data.suburb);
      redirectParams.set("city", data.suburb);
      redirectParams.set("lead_name", data.name.split(" ")[0] || data.name);
      window.location.assign(`/thank-you/?${redirectParams.toString()}`);
    } catch {
      setStatus("error");
      setErrorMsg(
        `Network error. Please call us on ${site.phoneDisplay}.`,
      );
    }
  };

  if (status === "success") {
    return (
      <div className="quote-success">
        <div className="success-mark">
          <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M15 24 L21 30 L33 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>Quote request received.</h3>
        <p>
          Thanks {data.name.split(" ")[0]}. We&rsquo;ll be in touch within 24
          business hours with a fixed quote for your{" "}
          {data.services.join(", ").toLowerCase()} job in {data.suburb}.
        </p>
        <div className="success-meta">
          <div>
            <span>Service</span>
            <strong>{data.services.join(", ")}</strong>
          </div>
          <div>
            <span>Contact</span>
            <strong>{data.phone}</strong>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setStatus("idle");
            setData(INITIAL);
          }}
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="q-row">
        <div className="q-field">
          <label id="qf-service-label">
            Service <span>(select all that apply)</span>
          </label>
          <div className="service-checks" role="group" aria-labelledby="qf-service-label">
            {SERVICES.map((service) => (
              <label key={service} className="service-check">
                <input
                  type="checkbox"
                  name="service"
                  value={service}
                  checked={data.services.includes(service)}
                  onChange={() => toggleService(service)}
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="q-field">
          <label htmlFor="qf-suburb">Suburb</label>
          <input
            id="qf-suburb"
            name="suburb"
            type="text"
            value={data.suburb}
            onChange={(e) => update("suburb", e.target.value)}
            placeholder="e.g. Paddington"
            autoComplete="address-level2"
            required
          />
        </div>
      </div>

      <div className="q-row">
        <div className="q-field">
          <label htmlFor="qf-name">Name</label>
          <input
            id="qf-name"
            type="text"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="First and last"
            autoComplete="name"
            required
          />
        </div>
        <div className="q-field">
          <label htmlFor="qf-phone">Phone</label>
          <input
            id="qf-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="04xx xxx xxx"
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </div>
      </div>

      <div className="q-field" style={{ marginBottom: 14 }}>
        <label htmlFor="qf-email">Email</label>
        <input
          id="qf-email"
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="quote-honeypot" aria-hidden="true">
        <label htmlFor="qf-company">Company website</label>
        <input
          id="qf-company"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.company_website}
          onChange={(e) => update("company_website", e.target.value)}
        />
      </div>

      <div className="q-field">
        <label htmlFor="qf-notes">
          Anything else? <span>(optional)</span>
        </label>
        <textarea
          id="qf-notes"
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Access notes, preferred time, multi-surface jobs…"
          rows={3}
        />
      </div>

      {status === "error" && errorMsg && (
        <p
          style={{ color: "#b42318", fontSize: 13, margin: "10px 0 0" }}
          role="status"
          aria-live="polite"
        >
          {errorMsg}
        </p>
      )}

      <div className="quote-actions">
        <div className="quote-action-spacer" />
        <button
          type="submit"
          className="btn btn-orange btn-md"
          disabled={!canSubmit || status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Request quote →"}
        </button>
      </div>
    </form>
  );
}
