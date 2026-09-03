"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import ConsultationModal from "../ui/ConsultationModal";

export default function PreFooterCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#030303] py-8 md:py-12 overflow-hidden"
    >
      {/* Background Slanting Brand Bars */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -bottom-[20%] left-[5%] w-32 h-[140%] bg-black rotate-12 transform origin-bottom-left opacity-[0.03]" />
        <div className="absolute -bottom-[20%] left-[15%] w-20 h-[140%] bg-[#ED1C24] rotate-12 transform origin-bottom-left opacity-[0.05]" />
        <div className="absolute -bottom-[20%] left-[21%] w-16 h-[140%] bg-[#FFCC00] rotate-12 transform origin-bottom-left opacity-[0.07]" />

        <div className="absolute -bottom-[20%] right-[10%] w-24 h-[140%] bg-[#ED1C24] rotate-12 transform origin-bottom-left opacity-[0.04]" />
        <div className="absolute -bottom-[20%] right-[16%] w-16 h-[140%] bg-[#FFCC00] rotate-12 transform origin-bottom-left opacity-[0.06]" />
        <div className="absolute -bottom-[20%] right-[22%] w-28 h-[140%] bg-black rotate-12 transform origin-bottom-left opacity-[0.03]" />
      </div> */}

      {/* Stacked building images - positioned in the right background with low opacity */}
      <div className="absolute inset-y-0 right-0 w-[45%] pointer-events-none hidden lg:block z-0 opacity-20">
        <div className="relative w-full h-full">
          <img
            src="/cta/united-kingdom.png"
            alt="UK Building"
            className="absolute bottom-0 right-72 h-[45%] object-contain object-bottom"
          />
          <img
            src="/cta/saudi-arabia.png"
            alt="Saudi Building"
            className="absolute bottom-0 right-56 h-[55%] object-contain object-bottom"
          />
          <img
            src="/cta/uae.png"
            alt="UAE Building"
            className="absolute bottom-0 right-40 h-[65%] object-contain object-bottom"
          />
          <img
            src="/cta/cta-13.png"
            alt="Cta Building 1"
            className="absolute bottom-0 right-28 h-[75%] object-contain object-bottom"
          />
          <img
            src="/cta/cta-15.png"
            alt="Cta Building 2"
            className="absolute bottom-0 right-14 h-[60%] object-contain object-bottom"
          />
          <img
            src="/cta/cta-14.png"
            alt="Cta Building 3"
            className="absolute bottom-0 right-0 h-[45%] object-contain object-bottom"
          />
        </div>
      </div>

      <div className={`relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 w-full">
          {/* Left: Text Content */}
          <div className="max-w-2xl text-left">
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1 block">
              START TODAY
            </span>
            <h3 className="font-[var(--font-outfit)] text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
              Ready to Begin Your
              <span className="text-white font-extrabold"> Journey?</span>
            </h3>
            <p className="text-xs md:text-sm text-white/70 font-medium leading-relaxed">
              Connect with our expert counsellors for personalised admission guidance. <br /> Your future starts with the right decision.
            </p>
          </div>

          {/* Right: CTA buttons aligned to the right end */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center shrink-0">
            <Button onClick={() => setConsultationOpen(true)} variant="primary" className="rounded-none whitespace-nowrap">
              Book Free Consultation
            </Button>
            <Button href="tel:+916282700600" variant="outlineWhite" className="rounded-none whitespace-nowrap">
              Call Us Now
            </Button>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </section>
  );
}
