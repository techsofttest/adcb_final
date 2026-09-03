"use client";

import { useEffect, useRef, useState } from "react";

const whyChooseUs = [
  {
    image: "/why-us/personalised-guidance.png",
    title: "Personalised Guidance",
    description:
      "One-on-one counselling sessions tailored to your academic profile, career aspirations, and financial considerations.",
  },
  {
    image: "/why-us/end-to-end-support.png",
    title: "End-to-End Support",
    description:
      "From course selection to university admission, documentation, visa guidance, and post-admission placement assistance.",
  },
  {
    image: "/why-us/international-licensing.png",
    title: "International Licensing",
    description:
      "Expert guidance on DHA, DOH, MOH, ORE, ADC, NDEB, and other international licensing pathways for dental professionals.",
  },
  {
    image: "/why-us/transparent-process.png",
    title: "Transparent Process",
    description:
      "Complete transparency in fee structures, admission timelines, and university selection with no hidden charges.",
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = whyChooseUs.length - slidesToShow;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = whyChooseUs.length - slidesToShow;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative py-10 md:py-16 bg-[#030303]"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Why Choose Us */}
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0 skew-y-0" : "opacity-0 translate-y-16 -skew-y-1"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-2">
              <span className="w-8 h-[1px] bg-white/20" />
              Our Commitment
              <span className="w-8 h-[1px] bg-white/20" />
            </span>
            <h2 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight leading-tight text-white">
              Why Choose
              <span className="font-semibold text-white"> ADCB</span>
            </h2>
          </div>

          <div className="relative mt-12 px-2 md:px-12">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 md:left-4 top-[35%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 md:right-4 top-[35%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out -mx-4"
                style={{
                  transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                }}
              >
                {whyChooseUs.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex-shrink-0 w-full md:w-1/2 px-4 transition-all duration-1000 transform ${
                      isVisible
                        ? "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0"
                        : i === 0
                        ? "opacity-0 -translate-x-12"
                        : i === 1
                        ? "opacity-0 scale-90"
                        : i === 2
                        ? "opacity-0 translate-y-12"
                        : "opacity-0 rotate-3 scale-95"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none mb-6 bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    {/* Text Content */}
                    <div className="px-1">
                      <h4 className="font-[var(--font-outfit)] text-xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/70 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: whyChooseUs.length - slidesToShow + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === i 
                      ? "w-8 bg-white" 
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
