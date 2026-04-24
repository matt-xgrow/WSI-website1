"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { CheckIcon } from "./icons";

const SERVICES = [
  "Pressure Washing",
  "House Washing",
  "Roof Cleaning",
  "Gutter Cleaning",
  "Window Cleaning",
  "Solar Panels",
  "Driveway",
  "Commercial / Strata",
  "Other",
];
const SURFACES = ["Under 50m²", "50–150m²", "150–300m²", "300m² or more", "Not sure"];
const URGENCIES = ["This week", "Next 2 weeks", "This month", "Just scoping"];

type Data = {
  service: string;
  surface: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  notes: string;
};

const INITIAL: Data = {
  service: "",
  surface: "",
  urgency: "",
  name: "",
  phone: "",
  email: "",
  postcode: "",
  notes: "",
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
            A fixed price in your inbox by <em className="hl-orange" style={{ color: "var(--orange-2)" }}>tomorrow</em>.
          </h2>
          <p className="quote-blurb">
            Three questions, thirty seconds. No pushy follow-ups, no hidden
            fees, no phone call unless you ask for one.
          </p>

          <div className="quote-benefits">
            <div className="qb-item">
              <span className="qb-icon">✓</span>
              <div>
                <strong>24-hour turnaround</strong>
                <span>Quote back by end of next business day.</span>
              </div>
            </div>
            <div className="qb-item">
              <span className="qb-icon">✓</span>
              <div>
                <strong>Fixed pricing</strong>
                <span>No hourly surprises. The number we quote is the number you pay.</span>
              </div>
            </div>
            <div className="qb-item">
              <span className="qb-icon">✓</span>
              <div>
                <strong>Or just call us</strong>
                <span>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a> · Mon–Sun, 7am–7pm
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
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [data, setData] = useState<Data>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 0) return !!data.service;
    if (step === 1) return !!data.surface && !!data.urgency;
    if (step === 2) return !!data.name && !!data.phone;
    return true;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canNext()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          suburb: data.postcode,
          service: data.service,
          propertyType: data.surface,
          message: `Timing: ${data.urgency}. ${data.notes}`.trim(),
          sourcePath: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(result.message ?? "Something went wrong. Please call us.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please call us.");
    }
  };

  if (status === "success") {
    return (
      <div className="quote-success">
        <div className="success-mark">
          <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 24 L21 30 L33 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Quote request received.</h3>
        <p>
          Thanks {data.name.split(" ")[0]}. We&rsquo;ll be in touch within 24
          business hours with a fixed quote for your {data.service.toLowerCase()} job.
        </p>
        <div className="success-meta">
          <div>
            <span>Service</span>
            <strong>{data.service}</strong>
          </div>
          <div>
            <span>Surface</span>
            <strong>{data.surface}</strong>
          </div>
          <div>
            <span>Timing</span>
            <strong>{data.urgency}</strong>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setStatus("idle");
            setStep(0);
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
      <div className="quote-progress">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`qp-step ${step >= i ? "done" : ""}`}>
            <span className="qp-num">{i + 1}</span>
            <span className="qp-label">{["Service", "Details", "Contact"][i]}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="quote-step">
          <div className="q-label">What do you need cleaned?</div>
          <div className="q-grid">
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                className={`q-option ${data.service === s ? "selected" : ""}`}
                onClick={() => update("service", s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="quote-step">
          <div className="q-label">Approximate size</div>
          <div className="q-grid q-grid-2">
            {SURFACES.map((s) => (
              <button
                key={s}
                type="button"
                className={`q-option ${data.surface === s ? "selected" : ""}`}
                onClick={() => update("surface", s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="q-label q-label-gap">When do you need it done?</div>
          <div className="q-grid q-grid-2">
            {URGENCIES.map((u) => (
              <button
                key={u}
                type="button"
                className={`q-option ${data.urgency === u ? "selected" : ""}`}
                onClick={() => update("urgency", u)}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="quote-step">
          <div className="q-row">
            <div className="q-field">
              <label>Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="First and last"
                autoComplete="name"
                required
              />
            </div>
            <div className="q-field">
              <label>Phone</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="04xx xxx xxx"
                autoComplete="tel"
                required
              />
            </div>
          </div>
          <div className="q-row">
            <div className="q-field">
              <label>Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="q-field">
              <label>Postcode</label>
              <input
                type="text"
                value={data.postcode}
                onChange={(e) => update("postcode", e.target.value)}
                placeholder="4000"
                autoComplete="postal-code"
              />
            </div>
          </div>
          <div className="q-field">
            <label>
              Anything else? <span>(optional)</span>
            </label>
            <textarea
              value={data.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Access notes, preferred time, multi-surface jobs…"
              rows={3}
            />
          </div>
          {status === "error" && errorMsg && (
            <p style={{ color: "#b42318", fontSize: 13, margin: "10px 0 0" }} role="status" aria-live="polite">
              <CheckIcon style={{ display: "none" }} />
              {errorMsg}
            </p>
          )}
        </div>
      )}

      <div className="quote-actions">
        {step > 0 && (
          <button
            type="button"
            className="btn btn-ghost btn-md"
            onClick={() => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s))}
          >
            ← Back
          </button>
        )}
        <div className="quote-action-spacer" />
        {step < 2 ? (
          <button
            type="button"
            className="btn btn-orange btn-md"
            disabled={!canNext()}
            onClick={() => setStep((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : s))}
          >
            Continue →
          </button>
        ) : (
          <button type="submit" className="btn btn-orange btn-md" disabled={!canNext() || status === "loading"}>
            {status === "loading" ? "Sending..." : "Request quote →"}
          </button>
        )}
      </div>
    </form>
  );
}
