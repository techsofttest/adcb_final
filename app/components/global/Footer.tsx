import Link from "next/link";
import Image from "next/image";


const column1 = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

const column2 = [
  { label: "Blog & News", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const column3 = [
  { label: "MBBS", href: "/mbbs" },
];

const column4 = [
  { label: "DNB", href: "/dnb" },
];

const column5 = [
  { label: "MDS", href: "/mds/conservative-dentistry" },
];

const column6 = [
  { label: "MD / MS", href: "/md-ms/kerala" },
];



const socialLinks = [
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/adcbedtech",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/adcb_edtech",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const renderColumn = (items: { label: string; href: string }[]) => (
    <div className="flex flex-col space-y-4">
      {items.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-[11px] font-semibold text-white/70 hover:text-[#ED1C24] transition-colors duration-300 tracking-[0.15em] uppercase"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <footer className="relative bg-black text-white border-t border-white/[0.04] overflow-hidden">
      {/* Subtle watermark background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[1440px] h-[150px] pointer-events-none z-0">
        <img
          src="/footer/adcb2.svg"
          alt="ADCB Watermark Logo"
          className="w-full h-full object-contain object-bottom opacity-10"
        />
      </div>

      {/* Top Section: Centered Logo */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pt-8 flex flex-col items-center">
        <Link href="/" className="block mb-6">
          <Image
            src="/logo/logo-white.png"
            alt="ADCB Consultancy Logo"
            width={70}
            height={70}
            style={{ width: "auto", height: "auto" }}
            className="h-[70px] w-auto transition-opacity duration-300 hover:opacity-80"
            priority
          />
        </Link>
      </div>

      {/* Thin Divider Line */}
      <div className="border-t border-white/[0.08]" />

      {/* Middle Section: 6 columns of links */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 text-left">
          {renderColumn(column1)}
          {renderColumn(column2)}
          {renderColumn(column3)}
          {renderColumn(column4)}
          {renderColumn(column5)}
          {renderColumn(column6)}
        </div>
      </div>

      {/* Thin Divider Line */}
      <div className="border-t border-white/[0.08]" />

      {/* Bottom Section: Socials Left, Legal Right */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Icons (no boxes, direct SVGs like the image) */}
          <div className="flex gap-6 items-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-right">
            <span className="text-[11px] text-white/40 tracking-[0.1em] uppercase">
              © {currentYear} ADCB Consultancy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
