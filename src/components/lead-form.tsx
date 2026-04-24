"use client";

import { ArrowRight, CheckCircle2, Loader2, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

const serviceOptions = [
  "House Washing",
  "Pressure Cleaning",
  "Window Cleaning",
  "Gutter Cleaning",
  "Other Exterior Cleaning",
];

const propertyOptions = [
  "Residential home",
  "Commercial property",
  "Strata / body corporate",
  "Real estate / pre-sale",
];

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      suburb: String(formData.get("suburb") ?? ""),
      service: String(formData.get("service") ?? ""),
      propertyType: String(formData.get("propertyType") ?? ""),
      message: String(formData.get("message") ?? ""),
      sourcePath: window.location.pathname,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setState("error");
      setMessage(result.message ?? "Something went wrong. Please call us.");
      return;
    }

    form.reset();
    setState("success");
    setMessage(result.message);
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="form-heading">
        <span>Free quote · No obligation</span>
        <strong>Tell us what needs cleaning.</strong>
      </div>

      <div className="form-grid">
        <label>
          Name
          <input name="name" autoComplete="name" placeholder="Jane Smith" required />
        </label>
        <label>
          Phone
          <input name="phone" autoComplete="tel" placeholder="04xx xxx xxx" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        </label>
        <label>
          Suburb
          <input name="suburb" autoComplete="address-level2" placeholder="e.g. Paddington" required />
        </label>
        <label>
          Service
          <select name="service" defaultValue="House Washing" required>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Property type
          <select name="propertyType" defaultValue="Residential home" required>
            {propertyOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      {!compact && (
        <label>
          Notes (optional)
          <textarea
            name="message"
            rows={3}
            placeholder="Example: house wash in Paddington, two-storey home, some mould on the shaded side."
          />
        </label>
      )}

      <div className="form-actions">
        <button className="primary-button" disabled={state === "loading"}>
          {state === "loading" ? (
            <Loader2 size={18} className="spin" />
          ) : (
            <ArrowRight size={18} />
          )}
          {state === "loading" ? "Sending..." : "Get my quote"}
        </button>
        <a className="phone-link" href={site.phoneHref}>
          <Phone size={18} />
          {site.phoneDisplay}
        </a>
      </div>

      {message && (
        <p className={state === "success" ? "form-success" : "form-error"} role="status" aria-live="polite">
          {state === "success" && <CheckCircle2 size={18} />}
          {message}
        </p>
      )}
    </form>
  );
}

