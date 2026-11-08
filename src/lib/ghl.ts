import { CAMPAIGN_KEYS, type CampaignParams } from "@/lib/campaign";

export const GHL_WEBHOOK_URL =
  process.env.GHL_WEBHOOK_URL?.trim() ||
  "https://services.leadconnectorhq.com/hooks/6ksBbMfBYrXKzD7guCyk/webhook-trigger/6bfc99c0-fcce-4629-8dd5-9317512cdd68";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  suburb: string;
  service: string;
  message?: string;
  sourcePath?: string;
  campaign?: CampaignParams;
};

export async function sendLeadToGhl(payload: LeadPayload) {
  const body: Record<string, string> = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email || "",
    suburb: payload.suburb,
    location: payload.suburb,
    city: payload.suburb,
    service: payload.service,
    message: payload.message || "",
    sourcePath: payload.sourcePath || "",
    source: "Website",
  };

  for (const key of CAMPAIGN_KEYS) {
    const value = payload.campaign?.[key];
    if (value) body[key] = value;
  }

  const response = await fetch(GHL_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }

  return response;
}
