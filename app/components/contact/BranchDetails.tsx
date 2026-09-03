import Image from "next/image";

interface BranchDetailsProps {
  branch: {
    city: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

export default function BranchDetails({ branch }: BranchDetailsProps) { 
  
  return (
    <section id="details" className="py-12 sm:py-20 border-b border-zinc-900 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        {/* Title on Top, Content Below */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-2">
            <span className="w-8 h-[1px] bg-white/20" />
            OFFICE LOCATION & DIRECTIONS
            <span className="w-8 h-[1px] bg-white/20" />
          </span>
          <h2 className="font-[var(--font-outfit)] text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight leading-tight text-white">
            Our
            <span className="font-semibold text-white"> {branch.city} Presence</span>
          </h2>
        </div>

        {/* Contact Details Below it with an Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Image side */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[450px] overflow-hidden bg-transparent">
            <Image
              src="/contact/contact2.jpg"
              alt={`${branch.city} Branch Office`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-w: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Details side */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-transparent py-4 relative overflow-hidden">
            <div>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                      OFFICE ADDRESS
                    </h4>
                    <p className="text-base text-zinc-200 leading-relaxed font-normal">
                      {branch.address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-zinc-900">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                        PHONE NUMBER
                      </h4>
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-base text-zinc-200 font-semibold hover:text-white transition-colors"
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-zinc-900">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                        EMAIL ADDRESS
                      </h4>
                      <a
                        href={`mailto:${branch.email}`}
                        className="text-base text-zinc-200 font-semibold hover:text-white transition-colors"
                      >
                        {branch.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start pt-6 border-t border-zinc-900">
                  <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                      WORKING HOURS
                    </h4>
                    <p className="text-base text-zinc-200">
                      {branch.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
