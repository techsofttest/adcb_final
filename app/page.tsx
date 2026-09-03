import Navbar from "./components/global/Navbar";
import HeroSection from "./components/home/HeroSection";
import PondicherryBanner from "./components/home/PondicherryBanner";
import FeaturedCourses from "./components/home/FeaturedCourses";
// import WhyChooseUs from "./components/home/WhyChooseUs";
import PreFooterCTA from "./components/global/PreFooterCTA";
import Footer from "./components/global/Footer";
import WhatsAppButton from "./components/global/WhatsAppButton";
import { buildSeoMetadata } from "@/lib/seo";
import API_BASE_URL from "@/lib/apiUrl";

export async function generateMetadata() {
  return buildSeoMetadata(
    "home",
    "ADCB Consultancy | Premium Educational Admission & Career Counselling",
    "ADCB Consultancy provides elite educational admission assistance and career counselling for MBBS, MD/MS, MDS, MBA, and MTTM programs. Expert guidance for international pathways including UAE, UK, Australia, and Canada.",
    "ADCB, education consultancy, MBBS admission, MDS, MD MS, MBA, MTTM, dental speciality, study abroad, career counselling, UAE dental license"
  );
}

interface ApiCourse {
  code: string;
  title: string;
  description: string | null;
  image: string | null;
  href: string | null;
  featured?: boolean;
}

interface FeaturedCourseProps {
  code: string;
  title: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
}

async function getFeaturedCourses(): Promise<FeaturedCourseProps[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/courses`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (!json || !Array.isArray(json.data)) return [];
    return json.data
      .filter((c: ApiCourse) => c.featured)
      .map((c: ApiCourse) => ({
        code: c.code,
        title: c.title,
        description: c.description ?? "",
        image: c.image ?? "",
        href: c.href ?? "#",
        featured: c.featured,
      })) as FeaturedCourseProps[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();
  return (
    <>
      <Navbar />
      {/* Main content wrapper that slides over the footer */}
      <div className="relative z-20 bg-white shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
        <main>
          <HeroSection />
          <PondicherryBanner />
          <PondicherryBanner
            id="md-banner"
            videoSrc="/banner/md.mp4"
            title="MDS Admissions in Andhra Pradesh"
            description="Secure your MDS seat in premier medical colleges in Andhra Pradesh. Experience top-tier education with affordable fee structures."
            buttonText="Explore MDS in AP"
            buttonHref="#enquiry"
          />
          <FeaturedCourses initialCourses={featuredCourses} />
          {/* <WhyChooseUs />  */}
          <PreFooterCTA />
        </main>
      </div>
      {/* Sticky footer wrapper that gets revealed as the user scrolls */}
      <div className="sticky bottom-0 z-10 w-full">
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}
