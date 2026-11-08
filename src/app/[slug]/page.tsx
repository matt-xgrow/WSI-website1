import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage, locationMetadata } from "@/components/pages/location-page";
import { ServicePage, serviceMetadata } from "@/components/pages/service-page";
import { getLocation, getService, locations, services } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...services.map((service) => ({ slug: service.slug })),
    ...locations.map((location) => ({ slug: location.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (getService(slug)) return serviceMetadata(slug);
  if (getLocation(slug)) return locationMetadata(slug);
  return {};
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (getService(slug)) return <ServicePage slug={slug} />;
  if (getLocation(slug)) return <LocationPage slug={slug} />;
  notFound();
}
