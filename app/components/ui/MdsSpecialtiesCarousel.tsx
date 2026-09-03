"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SpecialtyItem {
  slug: string;
  title: string;
  image: string;
}

const specialtiesList: SpecialtyItem[] = [
  { slug: "conservative-dentistry", title: "Conservative Dentistry & Endodontics", image: "/mds/conservative-dentistry.jpg" },
  { slug: "orthodontics", title: "Orthodontics & Dentofacial Orthopaedics", image: "/mds/orthodontics.jpg" },
  { slug: "prosthodontics", title: "Prosthodontics & Crown and Bridge", image: "/mds/prosthodontics.jpg" },
  { slug: "oral-surgery", title: "Oral & Maxillofacial Surgery (OMFS)", image: "/mds/oral-maxillofacial-surgery.jpg" },
  { slug: "periodontology", title: "Periodontology", image: "/mds/periodontology.jpg" },
  { slug: "pediatric-dentistry", title: "Pediatric & Preventive Dentistry", image: "/mds/pediatric-dentistry.jpg" },
  { slug: "oral-medicine", title: "Oral Medicine & Radiology", image: "/mds/oral-medicine-radiology.jpg" },
  { slug: "oral-pathology", title: "Oral & Maxillofacial Pathology", image: "/mds/oral-pathology.jpg" },
  { slug: "public-health-dentistry", title: "Public Health Dentistry", image: "/mds/public-health-dentistry.jpg" }
];

interface MdsSpecialtiesCarouselProps {
  currentSlug: string;
}

export default function MdsSpecialtiesCarousel({ currentSlug }: MdsSpecialtiesCarouselProps) {
  const items = specialtiesList.filter(item => item.slug !== currentSlug);
  const [activeIndex, setActiveIndex] = useState<number>(items.length);
  const [cursorType, setCursorType] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isOverActive, setIsOverActive] = useState<boolean>(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const extendedItems = [...items, ...items, ...items];

  const nextSlide = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev + 1);
  };
  const prevSlide = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (activeIndex >= items.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(activeIndex - items.length);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (activeIndex < items.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(activeIndex + items.length);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, items.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  const handleCarouselClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If hovering in the center region (over active card), click does not trigger slide control
    if (isOverActive) return;
    if (!carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midpoint = rect.width / 2;
    if (clickX < midpoint) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const midpoint = rect.width / 2;
    
    // Mathematically determine if mouse is hovering in the center card region
    const isMobile = window.innerWidth < 768;
    const cardHalf = isMobile ? 140 : 190;
    const overActive = Math.abs(mouseX - midpoint) < cardHalf;
    
    setIsOverActive(overActive);
    setCursorType(mouseX < midpoint ? "left" : "right");
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    const threshold = 40; // minimum swipe distance in pixels
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    touchStartRef.current = null;
  };

  return (
    <section className="specialties-carousel-container relative py-16 md:py-24 bg-black overflow-hidden px-4 md:px-12 border-t border-white/5">
      {/* Responsive variables block */}
      <style>{`
        .specialties-carousel-container {
          --card-width: 280px;
          --card-gap: 24px;
          --card-step: calc(var(--card-width) + var(--card-gap));
          --card-half: calc(var(--card-width) / 2);
        }
        @media (min-width: 768px) {
          .specialties-carousel-container {
            --card-width: 340px;
            --card-gap: 32px;
          }
        }
        @media (min-width: 1024px) {
          .specialties-carousel-container {
            --card-width: 380px;
            --card-gap: 32px;
          }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto z-10 relative">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-3">
            <span className="w-8 h-[1px] bg-white/20" />
            Explore More
            <span className="w-8 h-[1px] bg-white/20" />
          </span>
          <h2 className="font-[var(--font-outfit)] text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
            Other <span className="font-semibold text-white">Specialties</span>
          </h2>
        </div>

        <div
          ref={carouselRef}
          onClick={handleCarouselClick}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsOverActive(false);
          }}
          className={`relative w-full overflow-hidden h-[320px] md:h-[400px] select-none ${
            isHovered ? "lg:cursor-none" : ""
          }`}
        >
          {/* Custom Cursor Button UI - Hidden on touch screens */}
          {isHovered && typeof window !== "undefined" && (
            <div
              className={`hidden lg:flex fixed pointer-events-none z-50 w-16 h-16 rounded-full bg-white text-black items-center justify-center shadow-2xl transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
                isOverActive ? "text-xs font-bold tracking-widest uppercase" : "text-lg font-bold"
              }`}
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }}
            >
              {isOverActive ? "view" : (cursorType === "left" ? "←" : "→")}
            </div>
          )}

          <div
            className={`flex gap-[var(--card-gap)] items-end h-full ${
              isTransitioning ? "transition-transform duration-700 ease-in-out" : "transition-none"
            }`}
            style={{
              transform: `translateX(calc(50% - var(--card-half) - ${activeIndex} * var(--card-step)))`
            }}
          >
            {extendedItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={`${item.slug}-${index}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isTransitioning) return;
                    if (isActive) {
                      window.location.href = `/mds/${item.slug}`;
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className={`flex-shrink-0 w-[var(--card-width)] flex flex-col border-0 rounded-none cursor-pointer transition-all duration-700 ease-in-out group ${
                    isActive ? "opacity-100 scale-[1.01]" : "opacity-40 scale-100"
                  }`}
                >
                  {/* Image container above content, active card has more height */}
                  <div
                    className={`relative w-full overflow-hidden transition-all duration-700 ease-in-out select-none pointer-events-none ${
                      isActive
                        ? "h-[200px] md:h-[280px]"
                        : "h-[140px] md:h-[200px]"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 380px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  </div>

                  {/* Content below the image */}
                  <div className="pt-6 flex flex-col text-white text-center">
                    <h3 className="font-[var(--font-outfit)] text-lg md:text-xl font-bold tracking-tight mb-2 hover:text-[var(--color-accent-light)] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isTransitioning) return;
                setActiveIndex(items.length + idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex % items.length === idx ? "bg-white w-4" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
