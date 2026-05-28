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
      Authorization: `Bearer ${token}`,
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

const WSI_CLEANING_PIPELINE_ID = "1Dzi7g5aq1lbdJ9L96vR";
const WSI_CLEANING_LEADS_STAGE_ID = "1c2bbfc2-b4d1-48f0-9fb1-eeb5d498865e";

const FIELD_LOCATION = "k23P1i7zooGvygpt4Xvs";
const FIELD_SERVICE_NEEDED = "Tg6st45oxQXEA0vfm4rf";
const FIELD_PROPERTY_TYPE = "LTIznpsmYSBl7RBgJ8xd";

export async function sendLeadToGhl(payload: LeadPayload) {
  const { locationId } = getGhlConfig();
  const { firstName, lastName } = splitName(payload.name);

  const contact = await ghlFetch<{ contact?: { id?: string }; id?: string }>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      name: payload.name,
      phone: payload.phone,
      email: payload.email || undefined,
      city: payload.suburb,
      locationId,
      source: "Website",
      tags: [],
      customFields: [
        { id: FIELD_LOCATION, field_value: payload.location || "Brisbane" },
        { id: FIELD_SERVICE_NEEDED, field_value: payload.service },
        { id: FIELD_PROPERTY_TYPE, field_value: payload.propertyType },
      ],
    }),
  });

  const contactId = contact.contact?.id ?? contact.id;
  if (contactId) {
    await ghlFetch("/opportunities/", {
      method: "POST",
      body: JSON.stringify({
        pipelineId: WSI_CLEANING_PIPELINE_ID,
        locationId,
        name: `${payload.name} — ${payload.service}`,
        pipelineStageId: WSI_CLEANING_LEADS_STAGE_ID,
        status: "open",
        contactId,
      }),
    });
  }

  return contact;
}

