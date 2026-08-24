"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/Button";

const useRotatingText = (items: string[], interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsAnimating(false);
      }, 500); // Half a second for the exit animation
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  return { currentText: items[currentIndex], isAnimating };
};

const OVERVIEW_ITEMS = [
  {
    title: "NEET PG Counselling Overview",
    desc: "50% AIQ seats in government medical colleges across India through MCC counselling",
  },
  {
    title: "State Counselling",
    desc: "50% state quota seats in government and 100% private colleges of your domicile state",
  },
  {
    title: "Deemed Universities",
    desc: "Premium deemed medical universities with world-class infrastructure",
  },
  {
    title: "Management Quota",
    desc: "Direct admission in private medical colleges under management quota",
  },
  {
    title: "NRI Quota",
    desc: "Special NRI sponsored seats in private and deemed medical colleges",
  },
  {
    title: "Choice Filling Guidance",
    desc: "Strategic choice filling to maximize your chances based on rank analysis",
  },
  {
    title: "Seat Allotment Support",
    desc: "Complete assistance during seat allotment rounds and upgradation",
  },
  {
    title: "Reporting & Admission",
    desc: "End-to-end support from reporting to final admission formalities",
  },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroTitles = useMemo(
    () => [
      "Shape Your Medical Career With Precision",
      "Your Gateway to Premier Medical Schools",
      "Expert Guidance for Global Admissions",
    ],
    []
  );
  const { currentText, isAnimating } = useRotatingText(heroTitles);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const [activeOverview, setActiveOverview] = useState(0);
  const [overviewPaused, setOverviewPaused] = useState(false);
  const [headingIn, setHeadingIn] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    setHeadingIn(false);
    const t = setTimeout(() => setHeadingIn(true), 700);
    return () => clearTimeout(t);
  }, [activeOverview, isVisible]);

  useEffect(() => {
    if (overviewPaused) return;
    const interval = setInterval(() => {
      setActiveOverview((i) => (i + 1) % OVERVIEW_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [overviewPaused]);

  return (
    <section id="hero" className="relative min-h-screen lg:min-h-[105vh] w-full bg-[#030303] overflow-hidden flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover animate-slow-zoom"
          src="/hero-sec/adcb-hero2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Bottom Right Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-20 w-full flex-grow flex flex-col justify-center pb-12 pt-28">

        {/* Title above Carousel */}
        <div className="mb-6">
          {/* <span className="text-xs uppercase tracking-[0.2em] text-[#c0a062] font-bold block mb-1">Counselling & Pathways</span> */}
          <h2 className="font-[var(--font-outfit)] text-white tracking-wide">
            <span
              className={`block text-3xl sm:text-4xl md:text-5xl font-bold transition-all duration-500 ease-out ${isVisible && headingIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
            >
              NEET PG 2026
            </span>
            <span
              className={`block mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-white/90 transition-all duration-500 ease-out ${isVisible && headingIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
              style={{ transitionDelay: isVisible && headingIn ? "120ms" : "0ms" }}
            >
              All India <span className="text-[#c0a062] px-0.5">|</span> DNB{" "}
              <span className="text-[#c0a062] px-0.5">|</span> NBE-DIPLOMA
            </span>
            <span
              className={`block text-lg sm:text-xl md:text-2xl font-semibold text-white/90 transition-all duration-500 ease-out ${isVisible && headingIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
              style={{ transitionDelay: isVisible && headingIn ? "240ms" : "0ms" }}
            >
              DEEMED MGMT. QUOTA <span className="text-[#c0a062] px-0.5">|</span>{" "}
              NRI QUOTA
            </span>
          </h2>
        </div>

        {/* NEET PG Counselling Overview */}
        <div
          className={`mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div
            className="relative h-[130px] sm:h-[110px] md:h-[96px]"
            onMouseEnter={() => setOverviewPaused(true)}
            onMouseLeave={() => setOverviewPaused(false)}
          >
            {(() => {
              const prevIdx = (activeOverview - 1 + OVERVIEW_ITEMS.length) % OVERVIEW_ITEMS.length;
              return OVERVIEW_ITEMS.map((item, idx) => {
                const isActive = idx === activeOverview;
                const isRed = idx % 2 === 0;
                return (
                  <div
                    key={item.title}
                    className={`max-w-3xl transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : idx === prevIdx
                          ? "absolute inset-x-0 top-0 opacity-0 -translate-y-10 pointer-events-none"
                          : "absolute inset-x-0 top-0 opacity-0 translate-y-10 pointer-events-none"
                    }`}
                  >
                    <div
                      className={`flex gap-4 items-start p-4 md:p-5 rounded-md bg-white/[0.04] border backdrop-blur-sm transition-colors duration-300 ${
                        isRed
                          ? "border-white/10 hover:border-[#eb2525]/50"
                          : "border-white/10 hover:border-[#c0a062]/50"
                      }`}
                    >
                      <span
                        className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                          isRed ? "bg-[#eb2525]" : "bg-[#c0a062]"
                        }`}
                      />
                      <div className="text-left">
                        <h4 className="text-white text-base md:text-lg font-bold leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

      </div>
    </section>
  );
}
