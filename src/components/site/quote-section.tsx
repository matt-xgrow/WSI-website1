"use client";

import { useEffect, useId, useRef, useState } from "react";
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

function ServiceMultiSelect({
  services,
  selected,
  onToggle,
}: {
  services: string[];
  selected: string[];
  onToggle: (service: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const option = document.getElementById(`${listId}-option-${active}`);
    option?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (open ? (index + 1) % services.length : index));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((index) =>
        open ? (index - 1 + services.length) % services.length : index,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setOpen(true);
      setActive(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setOpen(true);
      setActive(services.length - 1);
      return;
    }
    if (event.key === "Escape") {
      if (!open) return;
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      onToggle(services[active]);
    }
  };

  return (
    <div className="service-multi" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="service-multi-trigger"
        id="qf-service-trigger"
        aria-labelledby="qf-service-label qf-service-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-option-${active}` : undefined}
        aria-required="true"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        {selected.length === 0 ? (
          <span className="service-multi-placeholder">Select services</span>
        ) : (
          <span className="service-multi-chips">
            {selected.map((service) => (
              <span key={service} className="service-chip">
                {service}
              </span>
            ))}
          </span>
        )}
        <span className="service-multi-meta">
          {selected.length > 0 ? `${selected.length} selected` : ""}
          <span className="service-multi-caret" aria-hidden="true">
            ▾
          </span>
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          className="service-multi-list"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby="qf-service-label"
        >
          {services.map((service, index) => {
            const isSelected = selected.includes(service);
            return (
              <li
                key={service}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={
                  index === active
                    ? "service-multi-option is-active"
                    : "service-multi-option"
                }
                onMouseEnter={() => setActive(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onToggle(service)}
              >
                <span className="service-multi-box" aria-hidden="true">
                  {isSelected ? "✓" : ""}
                </span>
                {service}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

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
          <ServiceMultiSelect
            services={SERVICES}
            selected={data.services}
            onToggle={toggleService}
          />
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
