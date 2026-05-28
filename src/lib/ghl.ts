type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  suburb: string;
  location?: string;
  service: string;
  propertyType: string;
  message?: string;
  sourcePath?: string;
};

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/6ksBbMfBYrXKzD7guCyk/webhook-trigger/014a9d2a-7fcd-45dc-9ebc-1b29f3609760";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() ?? name.trim();
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

export async function sendLeadToGhl(payload: LeadPayload) {
  const { firstName, lastName } = splitName(payload.name);

  const response = await fetch(GHL_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      full_name: payload.name,
      phone: payload.phone,
      email: payload.email || "",
      suburb: payload.suburb,
      location: payload.location || "",
      service: payload.service,
      property_type: payload.propertyType,
      message: payload.message || "",
      source_path: payload.sourcePath || "",
      source: "Website",
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }

  return response;
}
