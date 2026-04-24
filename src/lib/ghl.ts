type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  suburb: string;
  service: string;
  propertyType: string;
  message?: string;
  sourcePath?: string;
};

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() ?? name.trim();
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

function getGhlConfig() {
  const token = process.env.GHL_PRIVATE_TOKEN?.trim();
  const locationId = process.env.GHL_LOCATION_ID?.trim();

  if (!token || !locationId) {
    throw new Error("Missing GoHighLevel configuration");
  }

  return { token, locationId };
}

async function ghlFetch<T>(path: string, init: RequestInit): Promise<T> {
  const { token } = getGhlConfig();
  const response = await fetch(`${GHL_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      Version: GHL_VERSION,
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : `GoHighLevel request failed with ${response.status}`,
    );
  }

  return data as T;
}

export async function sendLeadToGhl(payload: LeadPayload) {
  const { locationId } = getGhlConfig();
  const { firstName, lastName } = splitName(payload.name);
  const normalizedService = payload.service.toLowerCase().replace(/\s+/g, "-");

  return ghlFetch<{ contact?: { id?: string }; id?: string }>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      name: payload.name,
      phone: payload.phone,
      email: payload.email || undefined,
      city: payload.suburb,
      locationId,
      source: "WSI Cleaning Website",
      tags: [
        "website-lead",
        "wsi-cleaning",
        "brisbane-focus",
        normalizedService,
        payload.propertyType.toLowerCase().replace(/\s+/g, "-"),
      ],
      customFields: [],
    }),
  });
}

