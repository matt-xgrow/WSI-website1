import { NextResponse } from "next/server";
import { sendLeadToGhl } from "@/lib/ghl";

const services = new Set([
  "House Washing",
  "Pressure Cleaning",
  "Window Cleaning",
  "Gutter Cleaning",
  "Other Exterior Cleaning",
]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      name: clean(body.name),
      phone: clean(body.phone),
      email: clean(body.email),
      suburb: clean(body.suburb),
      service: clean(body.service),
      propertyType: clean(body.propertyType),
      message: clean(body.message),
      sourcePath: clean(body.sourcePath),
    };

    if (!payload.name || !payload.phone || !payload.suburb) {
      return NextResponse.json(
        { message: "Name, phone and suburb are required." },
        { status: 400 },
      );
    }

    if (!services.has(payload.service)) {
      return NextResponse.json(
        { message: "Please choose a valid service." },
        { status: 400 },
      );
    }

    await sendLeadToGhl(payload);

    return NextResponse.json({
      ok: true,
      message: "Thanks. WSI Cleaning will contact you shortly.",
    });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { message: "We could not send the enquiry. Please call 0426 400 029." },
      { status: 500 },
    );
  }
}

