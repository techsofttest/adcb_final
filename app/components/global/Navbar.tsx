"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchModal from "../ui/SearchModal";
import { Button } from "../ui/Button";
import MobileMenu from "./MobileMenu";
import MbbsStateSelector from "./MbbsStateSelector";
import MdsSpecialtySelector from "./MdsSpecialtySelector";
import MdMsBranchSelector from "./MdMsBranchSelector";

const navLinks = [
  { label: "Home", href: "/" },
  // { label: "About Us", href: "/about" },
  { label: "MBBS", href: "/mbbs" },
  { label: "MDS", href: "/mds" },
  { label: "MD/MS", href: "/#international" },
  { label: "DNB", href: "/dnb" },
  { label: "International Opportunities", href: "/international-opportunities" },
  { label: "Contact", href: "/contact" },
];

const useTypingAnimation = (words: string[], typeSpeed = 100, deleteSpeed = 50, delay = 2000) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words, typeSpeed, deleteSpeed, delay]);

  return text;
};

export default function Navbar() {
  const pathname = usePathname();
  const isCourseInnerPage = pathname.startsWith("/mbbs") || pathname.startsWith("/mds") || pathname.startsWith("/md-ms") || pathname.startsWith("/dnb");

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPng, setShowPng] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPng(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY < 50);
      setVisible(lastScrollY > currentScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || showSearch ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, showSearch]);

  const searchKeywords = useMemo(() => ["for courses", "for universities", "a speciality"], []);
  const animatedSearchText = useTypingAnimation(searchKeywords);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
          } ${atTop ? "bg-transparent" : "bg-black/50 backdrop-blur-md border-b border-white/10"}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
          <div className={`flex items-center justify-between transition-all duration-300 ${atTop ? "h-20 sm:h-32" : "h-16 sm:h-24"}`}>
            {/* Left: Mobile Hamburger */}
            <div className={`flex md:flex-1 md:justify-start md:order-1 ${isCourseInnerPage ? "order-3" : "flex-1 order-1 justify-start"}`}>
              <button
                className="group flex items-center justify-center gap-x-3 rounded-full transition-colors h-16 cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col items-center justify-center gap-y-2">
                  <span
                    className={`block h-[2px] w-7 origin-center rounded-full transition-all duration-300 ease-in-out bg-white ${mobileOpen
                      ? "translate-y-[5px] rotate-45" : "group-hover:-translate-x-0.5"
                      }`}
                  />
                  <span
                    className={`block h-[2px] w-7 origin-center rounded-full transition-all duration-300 ease-in-out bg-white ${mobileOpen
                      ? "-translate-y-[5px] -rotate-45" : "group-hover:translate-x-0.5"
                      }`}
                  />
                </div>
                <span className="text-sm font-medium transition-colors text-white/80 group-hover:text-white hidden sm:inline">
                  Menu
                </span>
              </button>
            </div>

            {/* Center: Logo */}
            <div className={`flex-shrink-0 md:order-2 md:flex-initial ${isCourseInnerPage ? "order-1 flex-1 flex justify-start" : "order-2"}`}>
              <Link href="/" className="block relative transition-all duration-300 hover:opacity-80 h-14 w-[95px] sm:h-20 sm:w-[130px]">
                {!isCourseInnerPage && (
                  <Image
                    src="/logo/animated7.gif"
                    alt="ADCB Consultancy Logo"
                    width={180}
                    height={120}
                    style={{ width: "auto", height: "auto" }}
                    className={`absolute inset-0 w-auto object-contain transition-all duration-300 h-14 sm:h-20 ${showPng ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                    priority
                  />
                )}
                <Image
                  src="/logo/logo-white4.png"
                  alt="ADCB Consultancy Logo"
                  width={180}
                  height={120}
                  style={{ width: "auto", height: "auto" }}
                  className={`absolute inset-0 w-auto object-contain transition-all duration-300 h-14 sm:h-20 ${isCourseInnerPage ? "opacity-100" : (showPng ? "opacity-100" : "opacity-0 pointer-events-none")
                    }`}
                  priority
                />
              </Link>
            </div>

            {/* Right: MBBS State Selector + MDS Specialty Selector + Branch Dropdown */}
            <div className={`flex items-center gap-1.5 sm:gap-3 md:flex-1 md:justify-end md:order-3 mr-4 ${isCourseInnerPage ? "order-2 justify-end" : "order-3 flex-1 justify-end"}`}>
              <MbbsStateSelector />
              <MdsSpecialtySelector />
              <MdMsBranchSelector />

              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setBranchDropdownOpen(true)}
                onMouseLeave={() => setBranchDropdownOpen(false)}
              >
                <Button
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  variant="ghost"
                  className="rounded-full flex items-center gap-1.5 sm:gap-2 border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 text-white hover:shadow-white/5 active:scale-95 max-sm:w-8 max-sm:h-8 max-sm:!p-0 max-sm:justify-center text-sm"
                >
                  <span className="hidden md:inline">FIND AN ADCB BRANCH</span>
                  {/* Location Icon on Mobile */}
                  <svg
                    className="w-4 h-4 block md:hidden"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {/* Dropdown Arrow on Desktop */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${branchDropdownOpen ? "rotate-180" : ""} hidden md:block`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>

                {branchDropdownOpen && (
                  <div className="absolute right-0 pt-3 w-56 z-50">
                    <div className="rounded-md border border-white/15 bg-black/85 backdrop-blur-md shadow-2xl overflow-hidden transform transition-all duration-300">
                      <div className="py-1">
                        <Link
                          href="/contact/kochi"
                          className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b border-white/5"
                          onClick={() => setBranchDropdownOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 text-white/50 group-hover:text-[#ED1C24] transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Kochi</span>
                        </Link>
                        <Link
                          href="/contact/calicut"
                          className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setBranchDropdownOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 text-white/50 group-hover:text-[#ED1C24] transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Calicut</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Menu*/}
      <MobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navLinks={navLinks}
      />

      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
