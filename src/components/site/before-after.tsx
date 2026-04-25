"use client";

import Image from "next/image";
import { useState } from "react";

const PROJECTS = [
  {
    id: 0,
    title: "Pressure Washing",
    before: "/design/pressure-1.jpg",
    after: "/design/pressure-2.jpg",
  },
  {
    id: 1,
    title: "Window Cleaning",
    before: "/images/window-clean.jpg",
    after: "/images/commercial-windows.jpg",
  },
  {
    id: 2,
    title: "Roof Cleaning",
    before: "/images/house-wash.jpg",
    after: "/images/residential-aerial.jpg",
  },
];

export function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const project = PROJECTS[currentIndex];

  return (
    <section className="py-24 bg-gray-50 flex flex-col items-center" id="gallery">
      <h2 className="text-3xl md:text-4xl font-medium text-[#1F2A66] mb-12 text-center max-w-2xl px-4">
        See the dramatic difference our services make
      </h2>

      <div className="w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Carousel Container */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-white group">
          
          {/* Split Image Display */}
          <div className="absolute inset-0 w-full h-full">
            {/* After Image (Background) */}
            <Image 
              src={project.after} 
              alt={`${project.title} After`} 
              fill 
              className="object-cover" 
              priority
            />
            {/* Before Image (Foreground, clipped 50%) */}
            <div className="absolute inset-0 w-1/2 h-full overflow-hidden border-r-2 border-white">
              <img 
                src={project.before} 
                alt={`${project.title} Before`} 
                className="absolute inset-0 h-full max-w-none object-cover object-left" 
                style={{ width: "200%" }}
              />
            </div>
            
            {/* Text Labels */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm tracking-wider">
              BEFORE
            </div>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm tracking-wider">
              AFTER
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-[#1F2A66] shadow-lg flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-[#1F2A66] shadow-lg flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Floating Badge (Bottom Left relative to container) */}
        <div className="w-full relative -mt-6 z-10 flex justify-start pl-6 md:pl-10">
          <div className="bg-gray-500/90 text-white font-medium px-6 py-3 rounded-lg shadow-lg backdrop-blur-md text-lg">
            {project.title}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-[#1F2A66] w-6" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
