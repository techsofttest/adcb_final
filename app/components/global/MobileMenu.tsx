"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { statesData } from "../../mbbs/[slug]/statesData";
import { specialtiesData } from "../../mds/[slug]/specialtiesData";
import { mdmsBranchesData } from "../../md-ms/[slug]/branchesData";
import { mdmsGuideData } from "../../md-ms/[slug]/mdmsGuideData";

const stripHtml = (html?: string) =>
  html ? html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "") : null;

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  navLinks: NavLink[];
}

interface SubCategory {
  shortTitle: string;
  fullTitle: string;
  description?: string;
  points?: string[];
  video: string;
  image: string;
  href: string;
}

interface CourseDetails {
  video: string;
  image: string;
  href: string;
  title: string;
  subCategories?: SubCategory[];
}

const hardcodedCourseDetails: Record<string, CourseDetails> = {
  MBBS: {
    video: "/banner/mbbs.mp4",
    image: "/courses/mbbs.jpg",
    href: "/mbbs",
    title: "Bachelor of Medicine & Surgery",
    subCategories: [
      { shortTitle: "Tamil Nadu", fullTitle: "MBBS in Tamil Nadu", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/tamil-nadu" },
      { shortTitle: "Kerala", fullTitle: "MBBS in Kerala", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/kerala" },
      { shortTitle: "Karnataka", fullTitle: "MBBS in Karnataka", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/karnataka" },
      { shortTitle: "Pondicherry", fullTitle: "MBBS in Pondicherry", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/pondicherry" },
      { shortTitle: "Telangana", fullTitle: "MBBS in Telangana", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/telangana" },
      { shortTitle: "Andhra Pradesh", fullTitle: "MBBS in Andhra Pradesh", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/andhra-pradesh" },
      { shortTitle: "Haryana", fullTitle: "MBBS in Haryana", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/haryana" },
      { shortTitle: "Punjab", fullTitle: "MBBS in Punjab", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/punjab" },
      { shortTitle: "Himachal Pradesh", fullTitle: "MBBS in Himachal Pradesh", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/himachal-pradesh" },
      { shortTitle: "Uttar Pradesh", fullTitle: "MBBS in Uttar Pradesh", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/uttar-pradesh" },
      { shortTitle: "Bihar", fullTitle: "MBBS in Bihar", video: "/banner/mbbs.mp4", image: "/courses/mbbs.jpg", href: "/mbbs/bihar" },
    ],
  },
  MDS: {
    video: "/banner/md.mp4",
    image: "/courses/mds.jpg",
    href: "/mds",
    title: "Master of Dental Surgery",
    subCategories: [
      { shortTitle: "Conservative Dentistry", fullTitle: "Conservative Dentistry & Endodontics", video: "/banner/md.mp4", image: "/mds/conservative-dentistry.jpg", href: "/mds/conservative-dentistry" },
      { shortTitle: "Orthodontics", fullTitle: "Orthodontics & Dentofacial Orthopaedics", video: "/banner/md.mp4", image: "/mds/orthodontics.jpg", href: "/mds/orthodontics" },
      { shortTitle: "Prosthodontics", fullTitle: "Prosthodontics & Crown and Bridge", video: "/banner/md.mp4", image: "/mds/prosthodontics.jpg", href: "/mds/prosthodontics" },
      { shortTitle: "Oral Surgery", fullTitle: "Oral & Maxillofacial Surgery (OMFS)", video: "/banner/md.mp4", image: "/mds/oral-maxillofacial-surgery.jpg", href: "/mds/oral-surgery" },
      { shortTitle: "Periodontology", fullTitle: "Periodontology", video: "/banner/md.mp4", image: "/mds/periodontology.jpg", href: "/mds/periodontology" },
      { shortTitle: "Pediatric Dentistry", fullTitle: "Pediatric & Preventive Dentistry", video: "/banner/md.mp4", image: "/mds/pediatric-dentistry.jpg", href: "/mds/pediatric-dentistry" },
      { shortTitle: "Oral Medicine", fullTitle: "Oral Medicine & Radiology", video: "/banner/md.mp4", image: "/mds/oral-medicine-radiology.jpg", href: "/mds/oral-medicine" },
      { shortTitle: "Oral Pathology", fullTitle: "Oral & Maxillofacial Pathology", video: "/banner/md.mp4", image: "/mds/oral-pathology.jpg", href: "/mds/oral-pathology" },
      { shortTitle: "Public Health Dentistry", fullTitle: "Public Health Dentistry (PHD)", video: "/banner/md.mp4", image: "/mds/public-health-dentistry.jpg", href: "/mds/public-health-dentistry" },
    ]
  },
  "MD/MS": {
    video: "/banner/md.mp4",
    image: "/courses/md-ms.jpg",
    href: "/md-ms",
    title: "Doctor of Medicine / Master of Surgery",
    subCategories: [
      { shortTitle: "Kerala", fullTitle: "MD/MS in Kerala", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/kerala" },
      { shortTitle: "Karnataka", fullTitle: "MD/MS in Karnataka", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/karnataka" },
      { shortTitle: "Tamil Nadu", fullTitle: "MD/MS in Tamil Nadu", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/tamil-nadu" },
      { shortTitle: "Andhra Pradesh", fullTitle: "MD/MS in Andhra Pradesh", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/andhra-pradesh" },
      { shortTitle: "Telangana", fullTitle: "MD/MS in Telangana", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/telangana" },
      { shortTitle: "Uttar Pradesh", fullTitle: "MD/MS in Uttar Pradesh", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/uttar-pradesh" },
      { shortTitle: "Bihar", fullTitle: "MD/MS in Bihar", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/bihar" },
      { shortTitle: "Chhattisgarh", fullTitle: "MD/MS in Chhattisgarh", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/chhattisgarh" },
      { shortTitle: "Punjab", fullTitle: "MD/MS in Punjab", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/punjab" },
      { shortTitle: "Haryana", fullTitle: "MD/MS in Haryana", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/haryana" },
      { shortTitle: "Pondicherry", fullTitle: "MD/MS in Pondicherry", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/pondicherry" },
      { shortTitle: "West Bengal", fullTitle: "MD/MS in West Bengal", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/west-bengal" },
      { shortTitle: "Himachal Pradesh", fullTitle: "MD/MS in Himachal Pradesh", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/himachal-pradesh" },
      { shortTitle: "Uttarakhand", fullTitle: "MD/MS in Uttarakhand", video: "/banner/md.mp4", image: "/courses/md-ms.jpg", href: "/md-ms/uttarakhand" },
    ],
  },
  DNB: {
    video: "/banner/md.mp4",
    image: "/courses/md-ms.jpg",
    href: "/dnb",
    title: "Diplomate of National Board",
  },
};

export default function MobileMenu({
  mobileOpen,
  setMobileOpen,
  navLinks,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [activeCourse, setActiveCourse] = useState<string | null>(null); // e.g. 'MDS'
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [apiCourses, setApiCourses] = useState<{ name: string }[] | null>(null);
  const [apiMbbsStates, setApiMbbsStates] = useState<{
    state: string;
    slug: string;
    banner_title: string | null;
    banner_description: string | null;
    preview_title: string | null;
    preview_points: string[] | null;
  }[] | null>(null);
  const [apiMdmsContents, setApiMdmsContents] = useState<{
    state: string;
    slug: string;
    banner_title: string | null;
    banner_description: string | null;
    preview_title: string | null;
    preview_points: string[] | null;
  }[] | null>(null);
  const [apiMdsContents, setApiMdsContents] = useState<{
    slug: string;
    title: string;
    banner_title: string | null;
    banner_description: string | null;
    overview_content: string | null;
    preview_title: string | null;
    preview_points: string[] | null;
  }[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/v1/courses`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setApiCourses(json.data);
        }
      })
      .catch(() => {
        if (!cancelled) setApiCourses(null);
      });

    fetch(`/api/v1/mbbs-states`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setApiMbbsStates(json.data);
        }
      })
      .catch(() => {
        if (!cancelled) setApiMbbsStates(null);
      });

    fetch(`/api/v1/mdms`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setApiMdmsContents(json.data);
        }
      })
      .catch(() => {
        if (!cancelled) setApiMdmsContents(null);
      });

    fetch(`/api/v1/mds`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setApiMdsContents(json.data);
        }
      })
      .catch(() => {
        if (!cancelled) setApiMdsContents(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Close menu when navigating to the same page the user is already on
  const handleLinkClick = (href: string, fallback?: () => void) => {
    if (pathname === href) {
      setMobileOpen(false);
    } else if (fallback) {
      fallback();
    }
  };

  useEffect(() => {
    if (!mobileOpen) {
      setActiveCourse(null);
      setActiveSubCategory(null);
      setShowSubMenu(false);
    }
  }, [mobileOpen]);

  const handleCourseClick = (label: string) => {
    if (courseDetails[label]) {
      const course = courseDetails[label];
      if (course.subCategories && course.subCategories.length > 0) {
        setActiveCourse(label);
        setShowSubMenu(true);
        // Never auto-show the banner on a course click — just open the list and keep the menu open
        setActiveSubCategory(null);
      } else {
        // No subcategories, just show the main course detail
        setActiveCourse(label);
        setShowSubMenu(false);
        setActiveSubCategory(null);
      }
    }
  };

  const handleSubCategoryHover = (subCategory: SubCategory) => {
    setActiveSubCategory(subCategory);
  };

  const handleBackClick = () => {
    setShowSubMenu(false);
    setActiveSubCategory(null);
    // Keep activeCourse to show the main menu again
  };

  const courseDetails: Record<string, CourseDetails> = apiMbbsStates
    ? {
        ...hardcodedCourseDetails,
        MBBS: {
          ...hardcodedCourseDetails.MBBS,
          subCategories: apiMbbsStates.map((state) => ({
            shortTitle: state.state,
            fullTitle: `MBBS in ${state.state}`,
            video: hardcodedCourseDetails.MBBS.video,
            image: hardcodedCourseDetails.MBBS.image,
            href: `/mbbs/${state.slug}`,
          })),
        },
      }
    : hardcodedCourseDetails;

  const staticLinks = navLinks.filter((link) => !courseDetails[link.label]);
  const fallbackCourseLinks = navLinks.filter((link) => courseDetails[link.label]);
  const courseLinks = apiCourses
    ? fallbackCourseLinks.map((link) => {
        const course = apiCourses.find((c) => c.name === link.label);
        return {
          label: link.label,
          href: course ? (courseDetails[course.name]?.href ?? "/" + slugify(course.name)) : link.href,
        };
      })
    : fallbackCourseLinks;

  const menuLinks = [...staticLinks.slice(0, 1), ...courseLinks, ...staticLinks.slice(1)];

  const activeVideo = activeSubCategory?.video || (activeCourse ? courseDetails[activeCourse]?.video : null);
  const activeImage = activeSubCategory?.image || (activeCourse && !showSubMenu ? courseDetails[activeCourse]?.image : null);
  const activeTitle = activeSubCategory?.fullTitle || (activeCourse && !showSubMenu ? courseDetails[activeCourse]?.title : null);
  const activeDescription = activeSubCategory?.description || (activeCourse && !showSubMenu ? null : null);
  const activePoints = activeSubCategory?.points || null;
  const activeHref = activeSubCategory?.href || (activeCourse && !showSubMenu ? courseDetails[activeCourse]?.href : null);

  const href = activeSubCategory?.href ?? "";
  const stateSlug = href ? href.split("/").pop() : undefined;
  const mdmsData = href.startsWith("/md-ms/") && stateSlug ? mdmsBranchesData[stateSlug] : undefined;
  const stateData = href.startsWith("/mbbs/") && stateSlug ? statesData[stateSlug] : undefined;
  const apiStateData = href.startsWith("/mbbs/") && stateSlug
    ? apiMbbsStates?.find((state) => state.slug === stateSlug)
    : undefined;
  const apiMdmsData = href.startsWith("/md-ms/") && stateSlug
    ? apiMdmsContents?.find((state) => state.slug === stateSlug)
    : undefined;
  const specialtyData = href.startsWith("/mds/") && stateSlug ? specialtiesData[stateSlug] : undefined;
  const apiMdsData = href.startsWith("/mds/") && stateSlug
    ? apiMdsContents?.find((specialty) => specialty.slug === stateSlug)
    : undefined;
  const guideFirstSection = href.startsWith("/md-ms/") && stateSlug ? mdmsGuideData[stateSlug]?.[0] : undefined;
  const bannerTitle =
    apiStateData?.banner_title ||
    stateData?.bannerTitle ||
    apiMdmsData?.banner_title ||
    mdmsData?.bannerTitle ||
    apiMdsData?.title ||
    apiMdsData?.banner_title ||
    specialtyData?.bannerTitle ||
    activeTitle;
  const previewSectionTitle =
    apiMdmsData?.preview_title ||
    guideFirstSection?.label ||
    apiStateData?.preview_title ||
    stateData?.previewTitle ||
    apiMdsData?.preview_title ||
    (specialtyData || mdmsData ? "Key Focus Areas" : null);
  const bannerDescription =
    apiMdmsData?.banner_description ||
    (href.startsWith("/mds/") ? (apiMdsData?.overview_content ? stripHtml(apiMdsData.overview_content) : apiMdsData?.banner_description) : null) ||
    (href.startsWith("/mbbs/")
      ? null
      : guideFirstSection
        ? null
        : (activeDescription || (specialtyData ? stripHtml(specialtyData.overviewContent) : mdmsData ? stripHtml(mdmsData.overviewContent) : null)));
  const bannerPoints =
    (apiMdmsData?.preview_points?.length ? apiMdmsData.preview_points : guideFirstSection?.questions) ||
    apiStateData?.preview_points?.filter(Boolean) ||
    stateData?.previewPoints ||
    (apiMdsData?.preview_points?.length ? apiMdsData.preview_points : null) ||
    specialtyData?.specialties?.[0]?.highlights ||
    specialtyData?.middleBanner?.points ||
    mdmsData?.highlights ||
    activePoints ||
    null;

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-[60] flex items-stretch justify-start transition-all duration-700 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      onClick={() => setMobileOpen(false)}
    >
      {/* Left Menu Panel */}
      <div
        className={`relative bg-black/20 backdrop-blur-2xl border-r border-white/10 ${activeSubCategory ? "hidden lg:flex lg:w-1/2" : "w-full"
          } max-w-md shadow-2xl transition-all duration-700 flex flex-col h-full overflow-hidden ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Video (Triggered on active course) */}
        {activeVideo && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              key={activeVideo}
              src={activeVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-25"
            />
            {/* Dark gradient tint overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" /> */}
          </div>
        )}

        {/* Header area with Close Button */}
        <div className="relative z-10 flex items-center justify-between px-6 py-6 border-b border-white/10 w-full">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logo/logo-white.png"
              alt="ADCB Consultancy Logo"
              width={48}
              height={48}
              priority
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="relative z-10 flex-1 p-6 md:p-10 overflow-y-auto bg-transparent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {showSubMenu && activeCourse && courseDetails[activeCourse]?.subCategories ? (
            // Sub-menu view
            <div className="animate-fade-in">
              <button onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-4 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                Back to Courses
              </button>
              {courseDetails[activeCourse]?.subCategories?.map((subLink, index) => (
                <a
                  key={subLink.shortTitle}
                  href={subLink.href}
                  onClick={(e) => {
                    // Always show the preview banner — never navigate or close the menu here
                    e.preventDefault();
                    handleSubCategoryHover(subLink);
                  }}
                  className="flex items-center justify-end py-2 group"
                >
                  <span className={`font-medium text-xl transition-colors text-right ${activeSubCategory?.shortTitle === subLink.shortTitle ? "text-white" : "text-white/40 group-hover:text-white"}`}>
                    {subLink.shortTitle}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            // Main menu view
            menuLinks.map((link, index) => {
              const isCourse = !!courseDetails[link.label];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (pathname === link.href) {
                      // Already on this page — just close the menu
                      e.preventDefault();
                      setMobileOpen(false);
                    } else if (isCourse) {
                      // Courses with sub-categories open their sub-menu — never navigate away
                      if (courseDetails[link.label]?.subCategories?.length) {
                        e.preventDefault();
                        handleCourseClick(link.label);
                      } else {
                        // Courses without sub-categories (e.g. DNB) go straight to their page
                        setMobileOpen(false);
                      }
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                  className={`flex items-center justify-end py-2 group transform transition-all duration-700 ease-out ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-[320px] opacity-0"
                    }`}
                  style={{
                    transitionDelay: mobileOpen
                      ? `${index * 100}ms`
                      : `${(menuLinks.length - 1 - index) * 60}ms`,
                  }}
                >
                  <span className={`font-medium text-xl transition-colors text-right ${activeCourse === link.label && !showSubMenu ? "text-white" : "text-white/40 group-hover:text-white"
                    }`}>
                    {link.label}
                  </span>
                </a>
              );
            })
          )}
        </div>
      </div>

      {/* Right-side Details Section (side-by-side with menu on all screens) */}
      <div
        className={`${activeImage && activeTitle && activeHref
          ? "flex"
          : "hidden lg:flex"
          } flex-col flex-1 items-center justify-center relative h-full`}
        onClick={(e) => e.stopPropagation()}
      >
        {activeImage && activeTitle && activeHref && (
          <div
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box (Full size, full height) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                key={activeImage}
                src={activeImage}
                alt={activeTitle}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              {/* Dark overlay and gradient to help the content stand out */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60" />
            </div>

            {/* Mobile-only back & close controls */}
            <button
              onClick={() => setActiveSubCategory(null)}
              className="lg:hidden absolute top-6 left-6 z-30 flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              aria-label="Back to state list"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden absolute top-6 right-6 z-30 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Left-aligned Content, Centered Read More Button */}
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-start gap-5 text-left px-6 sm:px-10 md:px-16 pt-16 sm:pt-20 max-w-3xl max-h-full overflow-y-auto">
              <div className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold font-[var(--font-outfit)] leading-tight">
                {bannerTitle}
              </div>
              {previewSectionTitle && (
                <div className="text-white text-sm font-semibold uppercase tracking-widest">
                  {previewSectionTitle}
                </div>
              )}
              {bannerDescription && (
                <p className="text-white/85 text-base md:text-lg font-light leading-relaxed line-clamp-4">
                  {bannerDescription}
                </p>
              )}
              {bannerPoints && bannerPoints.length > 0 && (
                <ul className="flex flex-col items-start gap-3">
                  {bannerPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-white/85 text-sm sm:text-base font-light">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              <div className="pt-2 w-full flex justify-start">
                <Button
                  href={activeHref}
                  onClick={() => setMobileOpen(false)}
                  variant="primary"
                  className="ed"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
