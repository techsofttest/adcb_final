"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const universities = [
  { name: "University of Oxford", country: "United Kingdom", logo: "/university/oxford.png" },
  { name: "Harvard University", country: "United States", logo: "/university/harvard.png" },
  { name: "University of Cambridge", country: "United Kingdom", logo: "/university/cambridge.png" },
  { name: "Stanford University", country: "United States", logo: "/university/stanford.png" },
  { name: "Massachusetts Institute of Technology", country: "United States", logo: "/university/mit.png" },
  { name: "Princeton University", country: "United States", logo: "/university/princeton.png" },
  { name: "University of Toronto", country: "Canada", logo: "/university/toronto.png" },
  { name: "ETH Zurich", country: "Switzerland", logo: "/university/eth-zurich.png" },
];

export default function FeaturedUniversities() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="universities"
      ref={sectionRef}
      className="relative py-10 md:py-16 bg-white overflow-hidden"
    >
      {/* Background Slanting Brand Bars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* <div className="absolute -top-[20%] left-[14%] w-32 h-[160%] bg-black -rotate-24 transform origin-top-left opacity-[0.03]" />
        <div className="absolute -top-[20%] left-[28%] w-20 h-[160%] bg-[#ED1C24] -rotate-24 transform origin-top-left opacity-[0.05]" />
        <div className="absolute -top-[20%] left-[38%] w-16 h-[160%] bg-[#FFCC00] -rotate-24 transform origin-top-left opacity-[0.07]" /> */}

        {/* <div className="absolute -top-[20%] right-[8%] w-24 h-[140%] bg-[#ED1C24] -rotate-12 transform origin-top-left opacity-[0.04]" />
        <div className="absolute -top-[20%] right-[16%] w-16 h-[140%] bg-[#FFCC00] -rotate-12 transform origin-top-left opacity-[0.06]" />
        <div className="absolute -top-[20%] right-[22%] w-28 h-[140%] bg-black -rotate-12 transform origin-top-left opacity-[0.03]" /> */}
      </div>

      <div className={`relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 transition-all duration-1000 transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}>
        {/* Universities Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-black font-medium mb-6">
            <span className="w-8 h-[1px] bg-black" />
            Our Network
            <span className="w-8 h-[1px] bg-black" />
          </span>
          <h2 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight leading-tight text-black">
            Featured
            <span className="font-semibold text-black"> Universities</span>
          </h2>
        </div>

        {/* University Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...universities, ...universities, ...universities].map((uni, i) => (
              <div
                key={`${uni.name}-${i}`}
                className="flex-shrink-0 w-48 mx-6 flex flex-col items-center justify-center gap-4 group"
              >
                <div className="relative w-full h-14">
                  <Image
                    src={uni.logo}
                    alt={`${uni.name} Logo`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs tracking-widest uppercase text-black/50 font-medium">
                    {uni.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
