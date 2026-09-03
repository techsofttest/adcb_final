// Define TypeScript interfaces for our static data
export interface SpecialtyItem {
  title: string;
  image: string;
  highlights: string[];
}

export interface CountryItem {
  name: string;
  flag: string;
  image: string;
  highlights: string[];
}

export interface RecommendationData {
  title: string;
  description: string;
  bullets: string[];
  buttonText: string;
  buttonHref: string;
  backgroundImageSrc: string;
  descriptionAfter?: string;
}

export interface MiddleBannerData {
  title?: string;
  description: string;
  points?: string[];
  descriptionAfter?: string;
}

export interface SpecialtyData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerImage: string;
  overviewTitle: string;
  overviewContent: string;
  middleBanner?: MiddleBannerData;
  specialties?: SpecialtyItem[];
  countries?: CountryItem[];
  recommendation?: RecommendationData;
}

// Data dictionary for all 9 branches
export const specialtiesData: Record<string, SpecialtyData> = {
  "conservative-dentistry": {
    title: "Conservative Dentistry & Endodontics",
    metaTitle: "Conservative Dentistry & Endodontics | MDS Admissions",
    metaDescription: "Learn about Conservative Dentistry & Endodontics MDS clinical specialization, counselling options, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/conservative-dentistry.jpg",
    overviewTitle: "Conservative Dentistry & Endodontics",
    overviewContent: "Conservative Dentistry & Endodontics is one of the most sought-after clinical branches in MDS. The branch primarily focuses on restoring teeth, aesthetic restorations, smile enhancement, and advanced root canal treatments.It offers strong patient flow because restorative and endodontic procedures are required in almost every dental practice. It is a highly hands-on clinical branch with opportunities in private practice, specialty clinics, academics, and corporate dentistry.",
    middleBanner: {
      title: "International Scope",
      description: "Your MDS degree can open pathways abroad after obtaining the required local license."
    },
    specialties: [
      {
        title: "Key area including conservative dentistry",
        image: "/page-banner/mds-middle3a.jpg",
        highlights: [
          "Dental fillings (for cavities)",
          "Aesthetic restorations (tooth-colored fillings, veneers)",
          "Management of tooth wear and fractures",
          "Preventive care (fluoride therapy, sealants)"
        ]
      },
      {
        title: "Key area including Endodontics",
        image: "/courses/mds.jpg",
        highlights: [
          "Common procedures:",
          "Root canal treatment (RCT)",
          "Retreatment of failed RCT",
          "Management of dental trauma",
          "Surgical endodontics (apicoectomy)"
        ]
      }
    ],
    countries: [
      {
        name: "United Arab Emirates",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Fastest pathway for Indian MDS graduates",
          "DHA / DOH / MOH licensing",
          "Strong demand for specialists",
          "Average Endodontist salaries often range from AED 15,000–35,000+ per month depending on experience and setup."
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Good demand for specialist dentists",
          "Tax-free income",
          "Easier transition compared to Western countries."
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "High-income healthcare market",
          "Strong demand for experienced specialists."
        ]
      },
      {
        name: "Oman",
        flag: "/c-flag/oman.png",
        image: "/pathway/oman.jpg",
        highlights: [
          "Growing dental sector",
          "Attractive specialist compensation."
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Requires ORE/LDS pathway",
          "Long-term career growth and specialist recognition."
        ]
      },
      {
        name: "Australia and New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "ADC registration pathway",
          "Excellent quality of life and earning potential."
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "NDEB equivalency process",
          "Longer licensing route but excellent long-term opportunities."
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your goal is to start working abroad as early as possible after MDS, UAE is usually the most practical and popular destination for Indian Endodontists because of:",
      bullets: [
        "Relatively straightforward licensing pathways",
        "Strong Indian dentist community",
        "Good specialist demand",
        "Tax-efficient earnings",
        "Geographic proximity to India."
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg"
    }
  },
  "orthodontics": {
    title: "Orthodontics & Dentofacial Orthopaedics",
    metaTitle: "Orthodontics & Dentofacial Orthopaedics | MDS Admissions",
    metaDescription: "Learn about Orthodontics & Dentofacial Orthopaedics MDS specialization, counselling guidance, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/orthodontics.jpg",
    overviewTitle: "Orthodontics & Dentofacial Orthopaedics",
    overviewContent: "Orthodontics & Dentofacial Orthopaedics is the branch which focuses on correcting malaligned teeth, managing bite-related issues, and guiding facial growth and development using various orthodontic appliances and treatment modalities. <br> <br> Orthodontics Focuses on tooth movement Commonly uses braces and aligners Can be performed at any age Corrects dental malocclusion Dentofacial Orthopedics Focuses on jaw and facial bone growth Uses growth-modification appliances Most effective during growth periods Corrects skeletal malocclusion.",
    middleBanner: {
      title: "International Scope",
      description: "Orthodontics is among the most recognized dental specialties globally."
    },
    specialties: [
      {
        title: "Orthodontics",
        image: "/page-banner/mds-middle3a.jpg",
        highlights: [
          "Focuses on tooth movement",
          "Commonly uses braces and aligners",
          "Can be performed at any age",
          "Corrects dental malocclusion"
        ]
      },
      {
        title: "Dentofacial Orthopedics",
        image: "/courses/mds.jpg",
        highlights: [
          "Focuses on jaw and facial bone growth",
          "Uses growth-modification appliances",
          "Most effective during growth periods",
          "Corrects skeletal malocclusion"
        ]
      }
    ],
    countries: [
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Strong demand for specialist orthodontists",
          "Popular destination for Indian MDS graduates",
          "Attractive tax-free income",
          "Easier licensing pathway compared to many Western countries"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "High demand for orthodontic treatment",
          "Good specialist salaries",
          "Tax-free earnings"
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "Premium healthcare market",
          "Strong demand for aesthetic dentistry and orthodontics"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Growing demand for orthodontic specialists",
          "Excellent long-term career growth",
          "Requires registration/licensing pathways"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "One of the highest-paying markets for dental specialists",
          "Excellent quality of life",
          "Competitive licensing process"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Good work-life balance",
          "Demand for specialist dental services"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "High earning potential",
          "Strong demand for orthodontic treatment",
          "Longer licensing and equivalency pathway"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "Among the highest-paying countries for orthodontists",
          "Requires advanced licensing and credential recognition",
          "Significant long-term earning potential"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your goal is quick international placement after MDS, UAE is generally the most practical choice because of:",
      bullets: [
        "Strong demand for orthodontists",
        "Tax-free income",
        "Large expatriate patient base",
        "Simpler transition for Indian dentists"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "If your goal is maximum long-term earnings and career growth, Australia, Canada, and the USA are often considered the strongest destinations, although the licensing pathway is more demanding."
    }
  },
  "prosthodontics": {
    title: "Prosthodontics & Crown and Bridge",
    metaTitle: "Prosthodontics & Crown and Bridge | MDS Admissions",
    metaDescription: "Learn about Prosthodontics & Crown and Bridge MDS specialization, counselling advice, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/prosthodontics.jpg",
    overviewTitle: "Prosthodontics & Crown and Bridge",
    overviewContent: "Prosthodontics & Crown and Bridge is a specialized branch focused on the replacement and rehabilitation of missing or damaged teeth. It deals with crowns, bridges, dentures, full-mouth rehabilitation, implant-supported prostheses, and restoring both function and aesthetics.",
    middleBanner: {
      title: "International Scope",
      description: "Prosthodontics is globally recognized, especially because of the increasing demand for:",
      points: [
        "Dental Implants",
        "Digital Smile Design",
        "Full Mouth Rehabilitation",
        "Geriatric Dental Care"
      ]
    },
    // specialties: [
    //   {
    //     title: "Prosthodontics & Crown and Bridge",
    //     image: "/page-banner/mds-middle3a.jpg",
    //     highlights: [
    //       "Crowns, bridges, and dentures",
    //       "Full-mouth rehabilitation",
    //       "Implant-supported prostheses",
    //       "Restoring both function and aesthetics"
    //     ]
    //   },
    //   {
    //     title: "Key Focus Areas & Global Demand",
    //     image: "/courses/mds.jpg",
    //     highlights: [
    //       "Dental Implants",
    //       "Digital Smile Design",
    //       "Full Mouth Rehabilitation",
    //       "Geriatric Dental Care"
    //     ]
    //   }
    // ],
    countries: [
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Strong demand for implant and cosmetic dentistry",
          "Attractive tax-free earnings",
          "Popular destination for Indian MDS graduates"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Growing demand for prosthetic and implant treatments",
          "Good specialist salaries",
          "Tax-free income"
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "High-end dental practices",
          "Strong demand for aesthetic and implant dentistry"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Excellent opportunities for specialists",
          "High acceptance of implant dentistry",
          "Strong earning potential"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Demand for restorative and prosthetic specialists",
          "Excellent work-life balance"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "Aging population creates consistent demand for prosthodontic services",
          "High long-term earning potential"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Growing demand for restorative specialists",
          "Opportunities in hospitals, academia, and private practice"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "One of the highest-paying countries for Prosthodontists",
          "Strong demand for implant and cosmetic rehabilitation",
          "Requires a more extensive licensing pathway"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your goal is working abroad soon after MDS, UAE is usually the most practical choice because of:",
      bullets: [
        "High demand for implant and restorative specialists",
        "Tax-free income",
        "Easier transition for Indian dentists",
        "Large private healthcare sector"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "If your goal is maximum long-term career growth and earnings, USA, Australia, and Canada are often considered the best destinations for Prosthodontists, particularly those skilled in implantology and digital dentistry."
    }
  },
  "oral-surgery": {
    title: "Oral & Maxillofacial Surgery (OMFS)",
    metaTitle: "Oral & Maxillofacial Surgery (OMFS) | MDS Admissions",
    metaDescription: "Learn about Oral & Maxillofacial Surgery (OMFS) MDS specialization, counselling advice, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/oral-maxillofacial-surgery.jpg",
    overviewTitle: "Oral & Maxillofacial Surgery (OMFS)",
    overviewContent: "OMFS goes far beyond routine tooth extractions. The specialty deals with facial trauma, jaw surgeries, impacted teeth, oral pathologies, facial infections, cysts and tumors, implant surgeries, and various reconstructive procedures involving the face and jaws.<br><br>One of the major advantages of this branch is the surgical training and operating theatre exposure you receive during MDS. It is often preferred by candidates who want a more medically oriented and procedure-driven career compared to conventional dental practice.<br><br>Oral and maxillofacial surgeons are trained to perform procedures under local anesthesia, sedation, and general anesthesia.",
    middleBanner: {
      title: "International Scope",
      description: "OMFS is one of the most globally recognized dental specialties because surgical expertise is in demand across both dental and hospital settings."
    },
    // specialties: [
    //   {
    //     title: "Surgical Training & Exposure",
    //     image: "/page-banner/mds-middle3a.jpg",
    //     highlights: [
    //       "Facial trauma and jaw surgeries",
    //       "Impacted teeth and oral pathologies",
    //       "Facial infections, cysts, and tumors",
    //       "Implant surgeries and reconstructive procedures"
    //     ]
    //   },
    //   {
    //     title: "Clinical Environment",
    //     image: "/courses/mds.jpg",
    //     highlights: [
    //       "Surgical training and operating theatre exposure during MDS",
    //       "Preferred for medically oriented and procedure-driven careers",
    //       "Procedures performed under local anesthesia, sedation, and general anesthesia"
    //     ]
    //   }
    // ],
    countries: [
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Strong demand for implant and oral surgeons",
          "Tax-free income",
          "Large private healthcare sector"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Excellent opportunities in hospitals and specialty centers",
          "Attractive specialist salaries",
          "Tax-free earnings"
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "Growing healthcare infrastructure",
          "High demand for surgical specialists"
        ]
      },
      {
        name: "Oman",
        flag: "/c-flag/oman.png",
        image: "/pathway/oman.jpg",
        highlights: [
          "Consistent demand for OMFS and implant surgeons",
          "Good compensation packages"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Strong demand for OMFS professionals",
          "Opportunities in hospitals and academic institutions",
          "Additional training requirements may apply"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Excellent earning potential",
          "High demand for oral surgery and implant services",
          "Competitive licensing pathway"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Good opportunities in public and private healthcare sectors"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "High demand for oral surgery services",
          "Strong long-term earning potential"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "Among the highest-paying destinations for OMFS specialists",
          "Extensive training and licensing requirements",
          "Exceptional long-term career prospects"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your objective is starting an international career soon after MDS, UAE is generally the most practical option because of:",
      bullets: [
        "Strong demand for OMFS specialists",
        "High implant surgery volume",
        "Tax-free income",
        "Relatively smoother transition for Indian dentists"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "If your objective is maximum career growth, surgical exposure, and earnings, the USA, Australia, and Canada offer some of the strongest long-term opportunities, although their licensing pathways are more demanding."
    }
  },
  "periodontology": {
    title: "Periodontology",
    metaTitle: "Periodontology Specialty | MDS Admissions",
    metaDescription: "Learn about Periodontology MDS specialization, counselling advice, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/periodontology.jpg",
    overviewTitle: "Periodontology",
    overviewContent: "Periodontology is a clinical specialty focused on the prevention, diagnosis, and treatment of diseases affecting the gums and supporting structures of the teeth. It also plays a major role in implant dentistry, which has become one of the fastest-growing areas in dental practice.<br><br>Many candidates choose Periodontology because it provides surgical exposure without being as extensive as OMFS, while also offering strong opportunities in implantology. With increasing awareness about oral health and dental implants, the scope of the branch continues to grow.",
    middleBanner: {
      title: "International Scope",
      description: "Periodontology is recognized worldwide, particularly because:",
      points: [
        "Gum disease is highly prevalent globally.",
        "Dental implant treatment continues to grow rapidly.",
        "Specialists trained in periodontal surgery and implantology are in demand."
      ]
    },
    countries: [
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "High demand for implant and periodontal specialists",
          "Tax-free income",
          "Strong private healthcare sector"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Excellent opportunities in specialist dental centers",
          "Attractive salaries",
          "Tax-free earnings"
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "Growing demand for advanced periodontal and implant treatments",
          "Premium healthcare market"
        ]
      },
      {
        name: "Oman",
        flag: "/c-flag/oman.png",
        image: "/pathway/oman.jpg",
        highlights: [
          "Consistent demand for dental specialists",
          "Good compensation packages"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Strong demand for implant and periodontal services",
          "Excellent earning potential",
          "High quality of life"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Growing need for specialist dental care",
          "Good work-life balance"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "Aging population creates demand for periodontal and implant treatments",
          "High long-term earning potential"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Opportunities in specialist practice, hospitals, and academia",
          "Stable career growth"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "One of the highest-paying markets for Periodontists",
          "Strong demand for implant and regenerative procedures",
          "Extensive licensing pathway"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your goal is working abroad soon after MDS, UAE is generally the most practical option because:",
      bullets: [
        "Implant dentistry is growing rapidly.",
        "Specialist Periodontists are in demand.",
        "Tax-free income.",
        "Easier transition for Indian dentists."
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "If your goal is maximum long-term earnings and career growth, USA, Australia, and Canada are among the strongest destinations, especially for Periodontists with expertise in implantology and regenerative procedures."
    }
  },
  "pediatric-dentistry": {
    title: "Pediatric & Preventive Dentistry",
    metaTitle: "Pediatric & Preventive Dentistry | MDS Admissions",
    metaDescription: "Learn about Pediatric & Preventive Dentistry MDS specialization, counselling details, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/pediatric-dentistry.jpg",
    overviewTitle: "Pediatric & Preventive Dentistry",
    overviewContent: "Pediatric & Preventive Dentistry is a specialty dedicated to the oral health care of infants, children, adolescents, and patients with special healthcare needs. The branch focuses not only on treating dental problems but also on preventing them at an early stage.<br><br>The specialty combines clinical dentistry with child psychology and preventive healthcare.",
    middleBanner: {
      title: "International Scope",
      description: "Pedodontics is highly valued globally because:",
      points: [
        "Preventive dentistry is a major focus in developed countries.",
        "Governments and healthcare systems prioritize children's oral health.",
        "There is growing demand for specialists trained in behavior management and special-needs dentistry."
      ]
    },
    specialties: [
      {
        title: "Pediatric dentistry focuses on:",
        image: "/page-banner/mds-middle3a.jpg",
        highlights: [
          "Prevention of dental diseases in children",
          "Diagnosis and treatment of oral conditions in growing children",
          "Management of dental growth and development",
          "Behavior guidance of young patients",
          "Dental care for children with special needs"
        ]
      }
    ],
    countries: [
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Strong demand for pediatric dental specialists",
          "Growing family healthcare sector",
          "Tax-free income"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Excellent opportunities in hospitals and specialty clinics",
          "High demand for child healthcare services",
          "Tax-free earnings"
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "Premium healthcare infrastructure",
          "Demand for pediatric specialists"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Strong emphasis on preventive and child dental care",
          "Opportunities in public health and private practice"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "High demand for pediatric dental services",
          "Excellent work-life balance",
          "Strong earning potential"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Good opportunities in community and specialist dental services"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "Significant focus on preventive dentistry",
          "High demand for pediatric specialists"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "One of the most established markets for Pediatric Dentistry",
          "Excellent earning potential",
          "Strong demand in private practice and children's hospitals"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your goal is working abroad soon after MDS, UAE is often the most accessible option because of:",
      bullets: [
        "Demand for pediatric specialists",
        "Attractive tax-free salaries",
        "Large expatriate population with growing healthcare needs"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "If your goal is long-term career growth and specialization, USA, Canada, and Australia are generally considered the best destinations because Pediatric Dentistry is a highly recognized and well-developed specialty in these countries."
    }
  },
  "oral-medicine": {
    title: "Oral Medicine & Radiology",
    metaTitle: "Oral Medicine & Radiology | MDS Admissions",
    metaDescription: "Learn about Oral Medicine & Radiology MDS specialization, counselling guidance, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/oral-medicine-radiology.jpg",
    overviewTitle: "Oral Medicine & Radiology",
    overviewContent: "Oral Medicine & Radiology is a specialty that focuses on the diagnosis and non-surgical management of oral and maxillofacial diseases, along with advanced dental imaging and radiographic interpretation and mostly includes diagnosis, case evaluation, treatment planning, and the medical aspects of dentistry.<br><br>The radiology component includes interpretation of advanced imaging such as CBCT and other maxillofacial imaging techniques, which are becoming increasingly important in modern dental practice.",
    middleBanner: {
      title: "International Scope",
      description: "OMR is a niche specialty globally, but demand is steadily increasing because of:",
      points: [
        "Expansion of CBCT and 3D imaging",
        "Growth of digital dentistry",
        "Increased focus on oral cancer screening",
        "Need for specialist radiology reporting"
      ]
    },
    countries: [
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Growing demand for CBCT and advanced dental imaging",
          "Opportunities in large dental chains and diagnostic centers",
          "Tax-free income"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Expanding healthcare sector",
          "Demand for specialists in oral diagnosis and radiology"
        ]
      },
      {
        name: "Qatar",
        flag: "/c-flag/qatar.png",
        image: "/pathway/qatar.jpg",
        highlights: [
          "Modern healthcare infrastructure",
          "Increasing adoption of advanced dental imaging"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Strong opportunities in academia, hospitals, and diagnostic services",
          "Growing demand for oral medicine specialists"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Advanced digital dentistry market",
          "Good opportunities in radiology and academic institutions"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "Demand for diagnostic specialists and educators",
          "Strong healthcare system"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "Excellent opportunities in Oral Medicine and Oral & Maxillofacial Radiology",
          "High earning potential",
          "Advanced imaging and research facilities"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "For quick international opportunities, UAE is generally the most practical option due to:",
      bullets: [
        "Growing diagnostic imaging market",
        "Demand for experienced dental specialists",
        "Tax-free income"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "For long-term academic, diagnostic, and research careers, the USA, Australia, Canada, and the UK are often the strongest destinations because Oral Medicine and Oral Radiology are more established and recognized specialties there."
    }
  },
  "oral-pathology": {
    title: "Oral Pathology",
    metaTitle: "Oral & Maxillofacial Pathology | MDS Admissions",
    metaDescription: "Learn about Oral & Maxillofacial Pathology MDS specialization, academic scope, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/oral-pathology.jpg",
    overviewTitle: "Oral Pathology",
    overviewContent: "Oral Pathology is a specialty focused on the diagnosis and study of diseases affecting the oral and maxillofacial region at the microscopic and cellular level. It plays a crucial role in identifying oral lesions, cysts, tumors, potentially malignant disorders, and various oral diseases.<br><br>The specialty combines pathology, microbiology, laboratory diagnostics, and research, making it a good option for candidates who enjoy analytical thinking and diagnostic sciences more than extensive clinical procedures.",
    middleBanner: {
      title: "International Scope",
      description: "Oral Pathology is a specialized field with opportunities in:",
      points: [
        "Universities",
        "Research Institutions",
        "Diagnostic Laboratories",
        "Hospital Pathology Departments",
        "Oral Cancer Centers"
      ],
      descriptionAfter: "The demand is generally stronger in countries with advanced healthcare, research infrastructure, and cancer screening programs."
    },
    countries: [
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "One of the best countries for Oral Pathology",
          "Strong demand in universities, hospitals, and diagnostic laboratories",
          "Excellent opportunities for research and academic careers"
        ]
      },
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "Good opportunities in academia and pathology services",
          "Strong healthcare and research infrastructure"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Opportunities in hospitals, universities, and oral medicine departments",
          "Well-developed oral cancer screening programs"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Demand for pathology and oral disease specialists",
          "Excellent research and academic opportunities"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Opportunities in public healthcare and academic institutions"
        ]
      },
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Limited but growing opportunities in diagnostic centers and academic institutions",
          "Better suited for experienced specialists"
        ]
      },
      {
        name: "Saudi Arabia",
        flag: "/c-flag/sa.png",
        image: "/pathway/saudi-arabia.jpg",
        highlights: [
          "Opportunities in universities and large healthcare institutions",
          "Growing focus on specialist healthcare services"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your primary interest is research, academics, pathology reporting, and oral cancer diagnostics, the United States is generally considered the best destination because of:",
      bullets: [
        "Advanced pathology infrastructure",
        "Strong research funding",
        "Excellent academic opportunities",
        "High specialist recognition"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg",
      descriptionAfter: "For those seeking a balance of quality of life and career opportunities, Canada, Australia, and the UK are also excellent choices."
    }
  },
  "public-health-dentistry": {
    title: "Public Health Dentistry",
    metaTitle: "Public Health Dentistry | MDS Admissions",
    metaDescription: "Learn about Public Health Dentistry MDS specialization, community outreach programs, and global licensing pathways.",
    bannerTitle: "MDS Admissions & Counselling",
    bannerDescription: "Transform your dental career. Get expert, transparent guidance for NEET MDS counselling and secure admissions in top-tier dental colleges.",
    bannerImage: "/mds/public-health-dentistry.jpg",
    overviewTitle: "Public Health Dentistry",
    overviewContent: "Public Health Dentistry is a specialty that focuses on improving oral health at the community and population level rather than treating individual patients alone. The branch deals with oral health promotion, disease prevention, epidemiology, public health programs, research, and healthcare planning.<br><br>It involves academics, research, public health initiatives, healthcare administration, and policy-making. It provides a broader perspective on dentistry by focusing on community needs, preventive strategies, and large-scale oral health programs.",
    middleBanner: {
      title: "International Scope",
      description: "Public Health Dentistry has strong opportunities globally because governments and healthcare systems increasingly focus on:",
      points: [
        "Disease Prevention",
        "Community Health Programs",
        "Healthcare Policy",
        "Oral Health Research",
        "Public Health Management"
      ]
    },
    countries: [
      {
        name: "Canada",
        flag: "/c-flag/ca.png",
        image: "/pathway/canada.jpg",
        highlights: [
          "Excellent opportunities in public health programs",
          "Strong focus on preventive healthcare",
          "Demand for public health professionals and researchers"
        ]
      },
      {
        name: "Australia",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Well-developed public healthcare system",
          "Strong emphasis on oral health promotion and prevention",
          "Excellent work-life balance"
        ]
      },
      {
        name: "New Zealand",
        flag: "/c-flag/au.webp",
        image: "/pathway/australia.jpg",
        highlights: [
          "Community-focused healthcare model",
          "Good opportunities in public health services"
        ]
      },
      {
        name: "United Kingdom",
        flag: "/c-flag/uk.png",
        image: "/pathway/united-kingdom.jpg",
        highlights: [
          "Opportunities within the National Health Service (NHS)",
          "Strong public health infrastructure",
          "Research and academic positions"
        ]
      },
      {
        name: "United States",
        flag: "/c-flag/usa.png",
        image: "/pathway/usa.jpg",
        highlights: [
          "Opportunities in universities, public health agencies, and research organizations",
          "Excellent career growth for those pursuing public health leadership"
        ]
      },
      {
        name: "UAE",
        flag: "/c-flag/uae.png",
        image: "/pathway/united-arab-emirates.jpg",
        highlights: [
          "Growing healthcare sector",
          "Opportunities in healthcare administration and public health initiatives"
        ]
      }
    ],
    recommendation: {
      title: "Best Country Recommendation",
      description: "If your goal is to build a career in public health, healthcare policy, research, and administration, Canada and Australia are often considered the best destinations because of:",
      bullets: [
        "Strong preventive healthcare systems",
        "High investment in public health programs",
        "Excellent opportunities for research and leadership roles",
        "Better work-life balance"
      ],
      buttonText: "Contact Us",
      buttonHref: "/contact",
      backgroundImageSrc: "/page-banner/uae-banner.jpg"
    }
  }
};
