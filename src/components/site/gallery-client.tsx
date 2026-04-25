"use client";

import { useState } from "react";
import Image from "next/image";
import { services } from "@/lib/site";

const galleryImages = [
  { id: 1, src: "/images/house-wash.jpg", title: "Residential House Wash", category: "house-washing-brisbane" },
  { id: 2, src: "/images/pressure-cleaning.jpg", title: "Driveway Pressure Clean", category: "pressure-cleaning-brisbane" },
  { id: 3, src: "/images/commercial-windows.jpg", title: "Commercial Windows", category: "window-cleaning-brisbane" },
  { id: 4, src: "/images/gutter-cleaning.jpg", title: "Gutter Maintenance", category: "gutter-cleaning-brisbane" },
  { id: 5, src: "/images/soft-wash.jpg", title: "Roof Soft Wash", category: "roof-cleaning-brisbane" },
  { id: 6, src: "/images/commercial-pressure.jpg", title: "Building Washdown", category: "commercial-building-washing-brisbane" },
  { id: 7, src: "/images/commercial-aerial.jpg", title: "Strata Complex Clean", category: "strata-cleaning-brisbane" },
  { id: 8, src: "/images/glass-wash.jpg", title: "Solar Panel Care", category: "solar-panel-cleaning-brisbane" },
  { id: 9, src: "/images/residential-aerial.jpg", title: "Deck & Patio Revival", category: "deck-and-patio-cleaning-brisbane" },
  { id: 10, src: "/images/aerial-clean.jpg", title: "Tennis Court Refresh", category: "tennis-court-cleaning-brisbane" },
  { id: 11, src: "/images/drone-aerial.jpg", title: "High-Reach Inspection", category: "roof-cleaning-brisbane" },
  { id: 12, src: "/images/window-clean.jpg", title: "Streak-Free Glass", category: "window-cleaning-brisbane" },
];

export function GalleryClient() {
  const [filter, setFilter] = useState<string>("all");

  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Get active categories present in the images
  const activeCategorySlugs = Array.from(new Set(galleryImages.map(img => img.category)));
  const filterOptions = services.filter(s => activeCategorySlugs.includes(s.slug));

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-16">
          <span className="eyebrow mb-4">
            <span className="eyebrow-line" />
            Our Work
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-[#1F2A66] tracking-tight mb-8">
            See the <em className="hl-orange">difference</em>.
          </h1>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`filter-chip ${filter === "all" ? "active" : ""}`}
            >
              All Work
              <span className="chip-count">{galleryImages.length}</span>
            </button>
            {filterOptions.map((service) => {
              const count = galleryImages.filter(img => img.category === service.slug).length;
              return (
                <button
                  key={service.slug}
                  onClick={() => setFilter(service.slug)}
                  className={`filter-chip ${filter === service.slug ? "active" : ""}`}
                >
                  {service.name}
                  <span className="chip-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => {
            const serviceName = services.find(s => s.slug === image.category)?.name || "Service";
            return (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl bg-[#1F2A66] border border-gray-200 aspect-[4/3] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(31,42,102,0.3)]"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A66]/90 via-[#1F2A66]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase tracking-widest font-medium text-[#3DC6ED] bg-[#3DC6ED]/10 px-2 py-1 rounded backdrop-blur-md mb-2 inline-block">
                      {serviceName}
                    </span>
                    <h3 className="text-white font-display text-xl tracking-tight">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found for this category.
          </div>
        )}
      </div>
    </section>
  );
}
