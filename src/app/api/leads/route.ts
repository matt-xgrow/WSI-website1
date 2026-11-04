import { NextResponse } from "next/server";
import type { CampaignParams } from "@/lib/campaign";
import { CAMPAIGN_KEYS } from "@/lib/campaign";
import { sendLeadToGhl } from "@/lib/ghl";
import { site } from "@/lib/site";

const services = new Set([
  "House Washing",
  "Pressure Washing",
  "Pressure Cleaning",
  "Window Cleaning",
  "Gutter Cleaning",
  "Roof Cleaning",
  "Driveway Cleaning",
  "Solar Panel Cleaning",
  "Strata Cleaning",
  "Commercial Buildings",
  "Not sure / general enquiry",
  "Other Exterior Cleaning",
  "Other",
]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (clean(body.company_website)) {
      return NextResponse.json({ ok: true, message: "Thanks." });
    }

    const serviceParts = clean(body.service)
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    const payload = {
      name: clean(body.name),
      phone: clean(body.phone),
      email: clean(body.email),
      suburb: clean(body.suburb) || clean(body.city) || clean(body.location),
      service: serviceParts.join(", "),
      message: clean(body.message) || clean(body.notes),
      sourcePath: clean(body.sourcePath),
    };

    if (!payload.name || !payload.phone || !payload.suburb || serviceParts.length === 0) {
      return NextResponse.json(
        {
          message: `Please add your name, phone, suburb and at least one service, or call ${site.phoneDisplay}.`,
        },
        { status: 400 },
      );
    }

    if (serviceParts.some((part) => !services.has(part))) {
      return NextResponse.json(
        { message: `Please choose a valid service, or call ${site.phoneDisplay}.` },
        { status: 400 },
      );
    }

    const campaign: CampaignParams = {};
    for (const key of CAMPAIGN_KEYS) {
      const value = clean(body[key]);
      if (value) campaign[key] = value;
    }

    await sendLeadToGhl({ ...payload, campaign });

    return NextResponse.json({
      ok: true,
      message: "Thanks. WSI Cleaning will contact you shortly.",
    });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      {
        message: `We could not send the enquiry. Please call ${site.phoneDisplay}.`,
      },
      { status: 500 },
    );
  }
}
