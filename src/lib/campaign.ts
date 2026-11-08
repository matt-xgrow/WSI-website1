export const CAMPAIGN_KEYS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type CampaignKey = (typeof CAMPAIGN_KEYS)[number];
export type CampaignParams = Partial<Record<CampaignKey, string>>;

const STORAGE_KEY = "wsi_campaign";

function fromSearch(search: string): CampaignParams {
  const params = new URLSearchParams(search);
  const out: CampaignParams = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)?.trim();
    if (value) out[key] = value;
  }
  return out;
}

export function readCampaignParams(): CampaignParams {
  if (typeof window === "undefined") return {};
  const fromUrl = fromSearch(window.location.search);
  let stored: CampaignParams = {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as CampaignParams;
  } catch {
    stored = {};
  }
  const merged = { ...stored, ...fromUrl };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* private mode */
  }
  return merged;
}
