"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCourse {
  code: string;
  title: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
}

const fallbackCourses: FeaturedCourse[] = [
  {
    code: "MBBS",
    title: "Bachelor of Medicine & Surgery",
    description: "Foundation of medical excellence. The gateway to a career in clinical medicine and healthcare leadership.",
    image: "/courses/mbbs.jpg",
    href: "/mbbs",
    featured: true,
  },
  {
    code: "MD/MS",
    title: "Doctor of Medicine / Master of Surgery",
    description: "Advanced clinical specialisation across medical and surgical disciplines for physicians seeking mastery.",
    image: "/courses/md-ms.jpg",
    href: "/md-ms/kerala",
    featured: true,
  },
  {
    code: "MDS",
    title: "Master of Dental Surgery",
    description: "Premier dental specialisation covering nine clinical and non-clinical branches for dentistry excellence.",
    image: "/courses/mds.jpg",
    href: "/mds/conservative-dentistry",
    featured: true,
  },
  {
    code: "MBA",
    title: "Master of Business Administration",
    description: "Strategic leadership and management education for future business leaders and healthcare administrators.",
    image: "/courses/mba.jpg",
    href: "#enquiry",
    featured: false,
  },
  {
    code: "MTTM",
    title: "Master of Tourism & Travel Management",
    description: "Comprehensive programme in tourism management, hospitality operations, and travel industry leadership.",
    image: "/courses/mttm.jpg",
    href: "#enquiry",
    featured: false,
  },
];

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<FeaturedCourse[]>(
    fallbackCourses.filter((course) => course.featured)
  );
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/v1/courses`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          const featured = json.data.filter((course: FeaturedCourse) => course.featured);
          if (featured.length > 0) {
            setCourses(featured);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setCourses(fallbackCourses.filter((course) => course.featured));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          courses.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, i]);
            }, i * 100);
          });
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [courses]);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-10 md:py-16 bg-black"
    >
      {/* Section Divider Top - Removed as requested for cleaner look */}
      {/* <div className="section-divider mb-32" /> */}

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-2">
            <span className="w-8 h-[1px] bg-white/20" />
            Academic Programs
            <span className="w-8 h-[1px] bg-white/20" />
          </span>
          <h2 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight leading-tight text-white">
            Featured
            <span className="font-semibold text-white"> Courses</span>
          </h2>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <Link
              key={course.code}
              href={course.href}
              className={`relative rounded-none overflow-hidden group bg-transparent transition-all duration-500 ease-in-out transform flex flex-col cursor-pointer
                ${visibleCards.includes(i)
                  ? "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0"
                  : i === 0
                    ? "opacity-0 -translate-x-16"
                    : i === 1
                      ? "opacity-0 translate-y-16"
                      : "opacity-0 scale-75"
                }`
              }
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-70 overflow-hidden">
                <Image src={course.image} alt={course.title} fill className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
              </div>
              {/* Content */}
              <div className="pt-8 flex flex-col flex-grow">
                <div className="max-w-sm">
                  <h3 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-[#ED1C24] transition-colors">
                    {course.code}
                  </h3>
                  <p className="text-sm tracking-[0.15em] uppercase text-white font-bold mt-1 mb-4">
                    {course.title}
                  </p>
                  <p className="text-sm md:text-base text-white font-medium leading-relaxed mb-6 flex-grow">
                    {course.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}
