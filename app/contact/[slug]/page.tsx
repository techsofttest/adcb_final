import Navbar from "../../components/global/Navbar";
import PreFooterCTA from "../../components/global/PreFooterCTA";
import Footer from "../../components/global/Footer";
import WhatsAppButton from "../../components/global/WhatsAppButton";
import Banner from "../../components/global/Banner";
import { notFound } from "next/navigation";
import BranchDetails from "../../components/contact/BranchDetails";
import BranchMap from "../../components/contact/BranchMap";
import BranchForm from "../../components/contact/BranchForm";
import BranchFAQ from "../../components/contact/BranchFAQ";
import { buildSeoMetadata } from "@/lib/seo";
import API_BASE_URL from "@/lib/apiUrl";

interface BranchDetailsData {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
}

const branchData: Record<string, BranchDetailsData> = {
  kochi: {
    city: "Kochi",
    address: "1st Floor, SKM TOWER, Aysha Rd, Anjumuri, Chalakkavattom, Vyttila, Kochi, Ernakulam, Kerala 682019",
    phone: "6282700600",
    email: "adcbedtech@gmail.com",
    hours: "Mon to Sat: 9:30AM - 6:30PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4875.974395956055!2d76.3135180758632!3d9.981159573356994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d235c28e0b7%3A0xb9e9e3ee4e913ea7!2sADCB%20EDTECH%20PVT%20LTD!5e1!3m2!1sen!2sin!4v1788503170222!5m2!1sen!2sin"
  },
  calicut: {
    city: "Calicut",
    address: "3rd Floor, PK Tower, Rarichan Road, Near Pittapillil Agencies, Eranhipalam, Kozhikode - 673006",
    phone: "6282700600",
    email: "adcbedtech@gmail.com",
    hours: "Mon to Sat: 9:30AM - 6:30PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.853044146197!2d75.78720191479934!3d11.258753091995166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593bf1bb470f%3A0x6e9f16e451b6ad7f!2sMavoor%20Rd%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1658428800000!5m2!1sen!2sin"
  }
};


interface ApiBranch {
  slug: string;
  branch: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
  map_embed_url: string;
}

async function getBranchFaqs(category: string): Promise<Array<{ question: string; answer: string }>> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/faqs?category=${encodeURIComponent(category)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

async function getBranchData(slug: string): Promise<BranchDetailsData | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/contacts?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const apiBranch: ApiBranch | undefined = Array.isArray(json.data) ? json.data[0] : undefined;
    if (!apiBranch) return null;
    return {
      city: apiBranch.branch,
      address: apiBranch.address,
      phone: apiBranch.phone,
      email: apiBranch.email,
      hours: apiBranch.working_hours,
      mapEmbedUrl: apiBranch.map_embed_url,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = branchData[slug.toLowerCase()];
  if (!branch) {
    return {
      title: "Branch Not Found | ADCB Consultancy",
    };
  }
  const fallbackTitle = `${branch.city} Office | ADCB Consultancy`;
  const fallbackDescription = `Connect with our ${branch.city} branch for medical admission counselling. Location: ${branch.address}, Phone: ${branch.phone}.`;
  return buildSeoMetadata("contact", fallbackTitle, fallbackDescription);
}

export default async function BranchContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugKey = slug.toLowerCase();
  const localBranch = branchData[slugKey];

  if (!localBranch) {
    notFound();
  }

  const apiBranch = await getBranchData(slugKey);
  const branch = {
    ...localBranch,
    ...(apiBranch ?? {}),
    mapEmbedUrl: localBranch.mapEmbedUrl,
  };

  const faqs = await getBranchFaqs(branch.city);

  return (
    <>
      <Navbar />
      <main className="relative z-20 bg-black shadow-[0_15px_30px_rgba(0,0,0,0.5)] min-h-screen flex flex-col">
        {/* Banner Section */}
        <Banner
          title={`${branch.city} Office`}
          description={`Direct contact information and route map for ADCB Consultancy branch in ${branch.city}, Kerala.`}
          imageSrc="/contact/contact5.jpg"
          imageAlt={`${branch.city} Office Banner`}
          buttonText="View Address"
          buttonHref="#details"
        />

        {/* Modular Branch components */}
        <BranchDetails branch={branch} />
        <BranchMap branch={branch} />
        <BranchForm branch={branch} />
        <BranchFAQ branch={branch} faqs={faqs} />

        <PreFooterCTA />
      </main>

      <div className="sticky bottom-0 z-10 w-full">
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}
