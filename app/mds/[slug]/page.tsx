import Navbar from "../../components/global/Navbar";
import PreFooterCTA from "../../components/global/PreFooterCTA";
import Footer from "../../components/global/Footer";
import WhatsAppButton from "../../components/global/WhatsAppButton";
import ScrollAnimatedImage from "../../components/ui/ScrollAnimatedImage";
import Banner from "../../components/global/Banner";
import ContentSection from "../../components/ui/ContentSection";
import CustomVideoPlayer from "../../components/ui/CustomVideoPlayer";
import ClinicalAreasSpotlight from "../../components/spotlight/ClinicalAreasSpotlight";
import InternationalPathways from "../../components/home/InternationalPathways";
import { notFound } from "next/navigation";
import { specialtiesData, type MiddleBannerData, type SpecialtyItem, type CountryItem, type RecommendationData } from "./specialtiesData";
import MdsSpecialtiesCarousel from "../../components/ui/MdsSpecialtiesCarousel";
import { getSeoMeta } from "@/lib/seo";
import API_BASE_URL from "@/lib/apiUrl";

interface ApiMdsContent {
  slug: string;
  title: string | null;
  banner_title: string | null;
  banner_description: string | null;
  banner_image: string | null;
  overview_title: string | null;
  overview_content: string | null;
  middle_banner: MiddleBannerData | null;
  specialties: SpecialtyItem[] | null;
  countries: CountryItem[] | null;
  recommendation: RecommendationData | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
}

async function getMdsContent(slug: string): Promise<ApiMdsContent | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/mds/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data) return null;
    return json.data as ApiMdsContent;
  } catch {
    return null;
  }
}

// Generate dynamic metadata for Next.js 15/16
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [data, apiContent] = await Promise.all([specialtiesData[slug], getMdsContent(slug)]);

  if (apiContent?.meta_title && apiContent.meta_description) {
    return {
      title: apiContent.meta_title,
      description: apiContent.meta_description,
      keywords: apiContent.meta_keywords ?? undefined,
    };
  }

  const sectionSeo = await getSeoMeta("mds");
  if (sectionSeo?.meta_title && sectionSeo.meta_description) {
    return {
      title: sectionSeo.meta_title,
      description: sectionSeo.meta_description,
      keywords: sectionSeo.meta_keywords ?? undefined,
    };
  }

  if (!data) {
    return {
      title: "MDS Admissions & Counselling | ADCB Consultancy",
      description: "Explore Master of Dental Surgery (MDS) specializations, counselling guidance, and global licensing pathways for dentists.",
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function MdsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, apiContent] = await Promise.all([specialtiesData[slug], getMdsContent(slug)]);

  // If slug is not found in our data, trigger Next.js notFound()
  if (!data) {
    notFound();
  }

  const content = {
    title: apiContent?.title || data.title,
    bannerTitle: apiContent?.banner_title || data.bannerTitle,
    bannerDescription: apiContent?.banner_description || data.bannerDescription,
    bannerImage: data.bannerImage,
    overviewTitle: apiContent?.overview_title || data.overviewTitle,
    overviewContent: apiContent?.overview_content || data.overviewContent,
    middleBanner: apiContent?.middle_banner || data.middleBanner,
    specialties: apiContent?.specialties?.length ? apiContent.specialties : data.specialties,
    countries: apiContent?.countries?.length ? apiContent.countries : data.countries,
    recommendation: apiContent?.recommendation || data.recommendation,
  };



  return (
    <>
      <Navbar />
      {/* Main content wrapper that slides over the footer */}
      <main className="relative z-20 bg-white shadow-[0_15px_30px_rgba(0,0,0,0.5)] min-h-screen flex flex-col">
        {/* Banner Section */}
        {content.title && (
          <Banner
            title={content.bannerTitle || content.title}
            description={content.bannerDescription}
            imageSrc={content.bannerImage}
            imageAlt={content.title}
          />
        )}

        {/* Overview Section */}
        {content.overviewContent && (
          <ContentSection
            id="overview"
            title={content.overviewTitle || content.title}
            content={content.overviewContent}
          />
        )}

        {/* Clinical Areas Spotlight Section */}
        {content.specialties && content.specialties.length > 0 && (
          <div id="specialties">
            <ClinicalAreasSpotlight specialties={content.specialties} />
          </div>
        )}

        {/* Custom Video Section (Boxed, with custom play cursor on hover) */}
        <CustomVideoPlayer
          videoSrc="/banner/md.mp4"
          videoTitle="ADCB Consultancy Campus Tour"
        />

        {/* Overview Scroll Animated Section */}
        {content.middleBanner && (
          <ScrollAnimatedImage
            variant="expand"
            foregroundImageSrc="/page-banner/mds-middle4.jpg"
            foregroundImageAlt="ADCB Consultancy Global Opportunities backdrop"
          >
            <section className="absolute inset-0 z-20 flex flex-col justify-center py-6 px-6 md:py-12 md:px-20 lg:py-20 lg:px-80 bg-black/65 text-white">
              <article className="max-w-4xl w-full text-left">
                <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-3">
                  {content.middleBanner.title || "International Scope"}
                  <span className="w-8 h-[1px] bg-white/20" />
                </span>
                <h2 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight leading-relaxed max-w-3xl mb-6">
                  {content.middleBanner.description}
                </h2>
                {content.middleBanner.points && content.middleBanner.points.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl text-left mb-6">
                    {content.middleBanner.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-white/90">
                        <span className="text-[var(--color-accent)] font-bold flex-shrink-0 mt-1">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {content.middleBanner.descriptionAfter && (
                  <p className="text-white/85 text-sm md:text-base max-w-3xl mt-4 leading-relaxed">
                    {content.middleBanner.descriptionAfter}
                  </p>
                )}
              </article>
            </section>
          </ScrollAnimatedImage>
        )}

        {/* International Pathways Section */}
        {content.countries && content.countries.length > 0 && content.recommendation && (
          <InternationalPathways
            title="Best Countries for"
            titleHighlight={content.title}
            countries={content.countries}
            recommendation={content.recommendation}
          />
        )}

        {/* Bottom Scroll Animated Image Section with CTA Overlay */}
        <ScrollAnimatedImage
          variant="expand"
          foregroundImageSrc="/page-banner/mds-middle2.png"
          foregroundImageAlt="ADCB Consultancy Clinic Setup"
        >
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-black/55 text-white">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-[var(--font-outfit)] text-xl sm:text-2xl md:text-3xl font-normal tracking-tight leading-tight">
                Secure your dream MDS <br /> clinical specialization with expert, <br /> end-to-end counselling support.
              </h2>
            </div>
          </div>
        </ScrollAnimatedImage>

        {/* Other Specialties Carousel Section */}
        <MdsSpecialtiesCarousel currentSlug={slug} />

        <PreFooterCTA />
      </main>

      {/* Sticky footer wrapper that gets revealed as the user scrolls */}
      <div className="sticky bottom-0 z-10 w-full">
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}
