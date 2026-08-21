import type {
  BlogPost,
  LocationItem,
  ModelStep,
  PlatformCard,
  StatItem,
  TeamMember,
} from "@/types";

export const HOME_HERO = {
  title: "We bring Specialty Care\nto the Underserved",
  subtitle:
    "Across Africa, many patients still travel far or go without the specialist care they need. Health Invest Africa builds sustainable care networks that bring cancer, renal and other specialist services closer to underserved communities.",
};

export const WHO_WE_ARE = {
  eyebrow: "WHO WE ARE",
  title: "Investing in Life,\nOne Patient at a Time.",
  body: "At Health Invest, we believe that beyond treatment, healthcare is an investment in life itself. In a country where access to quality healthcare remains a challenge, we are reshaping the narrative by investing in medical infrastructure, cutting-edge technology, and, most importantly, the people who make healing possible.\n\nOur focus is on non-communicable diseases\u2014silent threats like kidney disease and cancer that often go undiagnosed until it\u2019s too late. Through Rencare and Oncoclinics, we are creating a healthcare ecosystem where patients receive not just treatment, but hope, dignity, and a fighting chance at life.\n\nBut we are more than a healthcare provider\u2014we are a collective of specialised institutions tackling different aspects of medical care, each with autonomy but bound by a shared mission: to redefine what is possible in African healthcare.",
};

export const OUR_FOCUS = {
  eyebrow: "OUR FOCUS",
  intro: "Our networks deliver accessible critical care for the most urgent non communicable diseases (NCDs) impacting Nigeria and Sub-Saharan Africa.",
  areas: [
    {
      number: "01",
      title: "Oncology",
      description:
        "Radiation Oncology services using state-of-the-art imaging, planning, and treatment technologies and techniques.",
    },
    {
      number: "02",
      title: "Nephrology",
      description:
        "Renal replacement therapy through best-in-class dialysis and medication",
    },
    {
      number: "03",
      title: "Cardiology",
      description:
        "Cardiovascular care through our advanced cardiac catheterization lab",
    },
    {
      number: "04",
      title: "Diagnostics",
      description: "Imaging solutions in select locations",
    },
  ],
};

export const OUR_MISSION_HOME = {
  title: "Our\nMission",
  body: "Every two seconds, a person under the age of 70 dies of a non-communicable disease (NCD), and more than 85% of those deaths occur in low-to-medium income countries. As it stands, more than 27% of deaths in Nigeria are caused by NCDs.\n\nWe estimate that more than 200 linear accelerators are required for adequate cancer care in Nigeria, however fewer than 10 machines are currently installed in the country. Furthermore, Nigeria requires more than 6,000 hemodialysis machines for effective renal care, with only roughly 10% of this number currently installed.\n\nOur mission is to help bridge this gap by developing and operating a network of specialty centres which provide reliable, quality, and accessible healthcare to all.",
};

export const STATS: StatItem[] = [
  { value: 12, label: "Medical Centers", icon: "centers" },
  { value: 200, suffix: "+", label: "Medical Professionals", icon: "professionals" },
  { value: 250, suffix: "+", label: "Patients Treated Per Day", icon: "patients" },
];

export const HOME_MISSION = {
  title: "Building Africa’s Specialist Healthcare Networks",
  body: "Health Invest Africa develops and operates specialist healthcare platforms through sustainable partnerships, efficient capital deployment, technology and operational excellence.",
};

export const PLATFORMS: PlatformCard[] = [
  {
    id: "oncoclinics",
    name: "OncoClinics Africa",
    href: "/our-operations/oncoclinics-africa",
    externalUrl: "https://oncoclinicsafrica.com/",
    summary:
      "Developing and operating radiotherapy and cancer-care services in partnership with leading healthcare institutions.",
    cta: "Visit OncoClinics Africa",
    image: "/images/operations/oncoclinics.png",
    logo: "/logos/oncoclinics.png",
    metric: "2,500+ cancer patients supported to date",
  },
  {
    id: "rencare",
    name: "Rencare Africa",
    href: "/our-operations/rencare-africa",
    externalUrl: "https://www.rencareafrica.com/",
    summary:
      "Operating reliable dialysis and renal-care centres designed around access, clinical quality and sustainable partnerships.",
    cta: "Visit Rencare Africa",
    image: "/images/operations/rencare-bay.png",
    logo: "/logos/rencare.svg",
    metric: "25,000+ dialysis sessions delivered",
  },
  {
    id: "pocch",
    name: "POCCH",
    href: "/our-operations/pocch",
    externalUrl: "https://peterodilihospital.com/",
    summary:
      "A leading tertiary hospital in Port Harcourt delivering oncology, cardiovascular, renal, surgical and diagnostic care under one roof.",
    cta: "Visit POCCH",
    image: "/images/operations/pocch-exterior.png",
    logo: "/logos/pocch.svg",
  },
];

export const HOME_MODEL_STEPS: ModelStep[] = [
  {
    number: "01",
    title: "Partner",
    body: "Identify an institution, market need and service opportunity with the potential for sustainable impact.",
  },
  {
    number: "02",
    title: "Deploy",
    body: "Structure the investment, infrastructure, equipment, technology and workforce required for the service.",
  },
  {
    number: "03",
    title: "Operate",
    body: "Manage clinical and administrative operations with defined quality, financial and performance controls.",
  },
  {
    number: "04",
    title: "Scale",
    body: "Apply network knowledge, shared systems and partnership experience to expand access responsibly.",
  },
];

export const PILLARS = [
  {
    title: "Partnerships",
    body: "Work with public and private host institutions to unlock existing infrastructure, resources and local capability.",
  },
  {
    title: "Technology",
    body: "Deploy appropriate medical and digital technologies to strengthen access, quality, monitoring and coordination.",
  },
  {
    title: "Operational excellence",
    body: "Standardise clinical and administrative processes, apply disciplined financial controls and build repeatable operating systems.",
  },
];

export const ABOUT = {
  heroTitle: "About Health Invest Africa",
  title: "Building the systems that make specialty care possible",
  intro:
    "Health Invest Africa is a healthcare investment and operations platform expanding access to specialized care across Africa. We build, own and operate scalable healthcare networks across cancer care, renal care and specialist hospital services.",
  platformNote: {
    title: "An operating platform, not simply an infrastructure investor",
    body: "We combine capital, clinical operations, technology, workforce support and disciplined management to turn healthcare assets into reliable services that can grow and endure.",
  },
  why: {
    title: "Specialty care remains out of reach for too many people",
    body: "Demand for cancer care, renal care and other specialist services is growing faster than available capacity. We work with institutions to close this gap through practical, scalable and accountable delivery models.",
  },
  what: {
    title: "We build and operate the systems behind care",
    body: "We identify viable opportunities, structure partnerships, deploy assets, establish teams, manage performance and strengthen services over time. Our responsibility continues beyond construction or equipment supply.",
  },
  purpose: {
    title: "Bring reliable specialty care closer to the people who need it",
    body: "We focus on delivery models that are clinically responsible, financially sustainable and adaptable across different communities and institutions. We do this by combining sustainable partnerships, efficient capital deployment, appropriate technology, workforce development and operational excellence.",
  },
  ambition: {
    title:
      "Become a trusted execution partner for specialist healthcare across Sub-Saharan Africa",
    body: "We are building a platform through which institutions and capital partners can create durable healthcare capacity and measurable access.",
  },
  closing:
    "We invest beyond infrastructure. We invest in the systems, technology and people that make reliable care possible. We invest in life.",
};

export const ABOUT_PAGE = {
  heroTitle: "About Us",
  introEyebrow: "WHO ARE WE",
  stories: {
    title: "The Human Stories\nThat Define Us",
    body: "While our strategy focuses on large-scale transformation, the heart of our story lies in the lives we impact every day.",
  },
  storyColumns: [
    {
      title: "Patients Who Find Hope",
      body: "A father at Rencare receives life-saving dialysis, giving him more time with his family. A young mother at Oncoclinics, once without options, now fights cancer with access to world-class treatment.",
    },
    {
      title: "Clinicians Who Lead With Passion",
      body: "From the physicists in Ebonyi to the therapists in Enugu, our medical professionals are not just providing care\u2014they are rewriting what it means to practice medicine in Nigeria.",
    },
    {
      title: "Centers That Bring Healing Closer",
      body: "In Enugu, where our journey began, we see the power of a well-built healthcare system. In Sokoto, we witness the impact of efficiency and strong infrastructure. Each center tells a different chapter in our story.",
    },
  ],
  africa: {
    title: "Redefining Healthcare Investment in Africa",
    body: "The healthcare system in Nigeria has long been plagued by gaps\u2014gaps in infrastructure, affordability, expertise, and patient trust. Health Invest is bridging those gaps, not just by building medical centers but by fostering an entirely new approach to healthcare investment.",
  },
  africaColumns: [
    {
      title: "Building Infrastructure for a Stronger Tomorrow",
      body: "With multiple dialysis and oncology centers, we are creating the largest privately managed multi-location healthcare network in Nigeria, ensuring that advanced treatment is not limited to just a few cities.",
    },
    {
      title: "Tackling Systemic Challenges",
      body: "From solving power issues in our centers to training and retaining top-tier medical professionals, we are proving that quality healthcare is achievable with the right model.",
    },
    {
      title: "Sustainability Through Collaboration",
      body: "Whether it\u2019s working with government agencies, insurance companies, or research institutions, we are committed to long-term, systemic change in healthcare.",
    },
  ],
  brandLine: "We invest in life.",
  values: [
    {
      title: "Technology & Equipment",
      body: "Cutting-edge diagnostic tools, advanced treatment methods, and life-saving medical innovations.",
    },
    {
      title: "Finance",
      body: "The funding that fuels accessibility, affordability, and expansion of our specialized clinics nationwide.",
    },
    {
      title: "Expertise & Knowledge",
      body: "A team of highly skilled doctors, researchers, and medical professionals committed to advancing healthcare solutions.",
    },
    {
      title: "Care & Time",
      body: "The human touch\u2014every consultation, every surgery, every reassuring word that brings hope to patients and their families.",
    },
  ],
};

export const MODEL_PAGE = {
  title: "A Sustainable Model for Specialist Healthcare Delivery",
  intro:
    "HIA brings investment and operating capability together. We partner with institutions, deploy assets efficiently and remain accountable for the performance of the services we help create.",
  overview:
    "Our model is designed around the realities of specialist healthcare in Sub-Saharan Africa: constrained capital, underused assets, workforce gaps and the need for reliable day-to-day management.",
  steps: [
    {
      number: "01",
      title: "Identify and structure the opportunity",
      body: "We assess demand, existing infrastructure, partner capability, clinical requirements and the path to operational sustainability.",
    },
    {
      number: "02",
      title: "Align the partnership and investment",
      body: "Capital requirements and responsibilities are structured according to the opportunity and each partner’s contribution.",
    },
    {
      number: "03",
      title: "Deploy the service",
      body: "We coordinate infrastructure, equipment, technology, recruitment, training, protocols and operational readiness.",
    },
    {
      number: "04",
      title: "Manage performance directly",
      body: "HIA applies clinical, financial and administrative controls to support quality, access, accountability and continuous improvement.",
    },
    {
      number: "05",
      title: "Use network knowledge to scale",
      body: "Shared expertise, systems, data and purchasing power make future centres faster to establish and more efficient to operate.",
    },
  ] satisfies ModelStep[],
};

export const OPERATIONS_LANDING = {
  title: "Specialist Healthcare Platforms Built to Deliver",
  intro:
    "Health Invest Africa operates through focused healthcare platforms that combine specialist clinical services with disciplined operations and partnership-led growth.",
  expression:
    "OncoClinics Africa expands access to cancer care. Rencare Africa builds reliable renal-care capacity. POCCH provides integrated specialist hospital services in Port Harcourt.",
  footprint:
    "HIA’s network spans 12 centres across Nigeria (figures subject to the dated management-approved data register).",
};

export const ONCOCLINICS = {
  title: "Expanding Access to Advanced Cancer Care",
  overview:
    "OncoClinics Africa develops and operates oncology services in partnership with public and private healthcare institutions. The platform combines specialist equipment, clinical operations, multidisciplinary expertise and workforce development to bring cancer care closer to patients and strengthen local treatment capacity.",
  metric: "2,500+ cancer patients supported to date",
  locations: [
    {
      name: "University of Nigeria Teaching Hospital, Enugu",
      city: "Enugu",
    },
    {
      name: "David Umahi Federal University of Health Sciences, Ebonyi",
      city: "Ebonyi",
    },
    {
      name: "Usmanu Danfodiyo University Teaching Hospital, Sokoto",
      city: "Sokoto",
    },
    {
      name: "University of Benin Teaching Hospital, Benin City",
      city: "Benin City",
    },
    {
      name: "Federal Teaching Hospital, Katsina",
      city: "Katsina",
    },
  ] satisfies LocationItem[],
};

export const RENCARE = {
  title: "Reliable Renal Care, Built to Scale",
  overview:
    "Rencare Africa develops and operates dialysis and renal-care services through partnerships with leading healthcare institutions. Rencare combines clinical teams, equipment, consumables, quality controls and efficient centre management to deliver consistent renal-care services across its network.",
  metric: "25,000+ dialysis sessions delivered (as of 2026)",
  locations: [
    {
      name: "Redeemer’s-Rencare Dialysis Centre, Ibadan",
      city: "Ibadan",
    },
    {
      name: "Cedarcrest-Rencare Dialysis Unit, Abuja",
      city: "Abuja",
    },
    {
      name: "Rencare Dialysis Centre, Lagos",
      city: "Lagos",
    },
    {
      name: "Rencare Dialysis Centre, Alimosho General Hospital, Lagos",
      city: "Alimosho",
    },
  ] satisfies LocationItem[],
};

export const POCCH = {
  title: "Dr. Peter Odili Specialist Cancer & Cardiovascular Hospital",
  overview:
    "Dr. Peter Odili Specialist Cancer & Cardiovascular Hospital (POCCH) is a leading tertiary healthcare institution located in Port Harcourt, dedicated to delivering advanced and compassionate medical care at international standards.",
  specialties:
    "Our hospital specializes in oncology (cancer care), cardiovascular medicine, renal (kidney) care, advanced surgery, and precision diagnostics, all under one roof.",
  website: "https://peterodilihospital.com/",
  locations: [
    {
      name: "120 Ikwerre Road, Rumuokwuta, Port Harcourt",
      city: "Port Harcourt",
    },
  ] satisfies LocationItem[],
};

export const IMPACT = {
  title: "Infrastructure Is Only the Beginning",
  intro:
    "HIA’s impact extends beyond facilities and equipment. We strengthen the workforce, support patient access, improve operating data and build local capability that can endure.",
  proof:
    "Established in 2022 · 12 centres · 200+ professionals · More than 250 patients treated per day · 2,500+ cancer patients treated to date · 25,000+ dialysis sessions delivered",
  ledger: [
    {
      value: "2022",
      label: "Year established",
      href: null,
      note: null,
    },
    {
      value: "2,500+",
      label: "Cancer patients treated to date",
      href: "/our-operations/oncoclinics-africa",
      note: "OncoClinics Africa",
    },
    {
      value: "25,000+",
      label: "Dialysis sessions delivered",
      href: "/our-operations/rencare-africa",
      note: "Rencare Africa",
    },
  ],
  sections: [
    {
      title: "Developing specialist healthcare capability",
      body: "HIA supports licensing processes, recurring training, professional development and selected conference participation to strengthen local clinical and technical capacity—including workforce initiatives such as Project STRAWN.",
    },
    {
      title: "Reducing barriers around treatment",
      body: "Selected initiatives include paediatric radiotherapy support and affordable accommodation options for cancer patients in approved locations.",
    },
    {
      title: "Building evidence for better access",
      body: "More consistent service delivery and operating data can help healthcare payers better understand demand, utilisation and the requirements of specialist non-communicable disease care.",
    },
    {
      title: "Reducing avoidable outbound medical travel",
      body: "By expanding reliable specialist services and strengthening local expertise, HIA aims to help more patients receive appropriate care closer to home.",
    },
  ],
};

export const LEADERSHIP_INTRO =
  "HIA directly oversees the clinical operations of more than 200 clinicians across its growing specialist care network. These teams are supported by an agile corporate function and led by a management team with deep and broad expertise across healthcare investment, clinical operations, quality, finance and multi-site service delivery.";

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Zahi El Khatib",
    role: "Founder and Managing Director",
    image: "/images/team/georges.jpg",
    bio: "Zahi El Khatib has 20 years of experience in private equity and investment banking across Africa, the Middle East and Europe. He previously served as a Managing Director at Actis.",
  },
  {
    name: "Georges Abou Nader",
    role: "Director",
    image: "/images/team/zahi.jpg",
    bio: "Georges Abou Nader previously served as a Vice President in Credit Suisse’s investment banking division in London. He has extensive experience supporting high-growth companies with strategy development and business-plan execution.",
  },
  {
    name: "Chinwe Egbuta",
    role: "Head of Human Resources and Administration",
    image: "/images/team/chinwe-egbuta.png",
    bio: "Chinwe Egbuta has experience leading human resources and administration across multi-site organisations. She has supported the strengthening of HIA’s policies, procedures and employee-engagement systems.",
  },
  {
    name: "Dr Uchenna Okoro",
    role: "Clinical Coordinator, OncoClinics Africa",
    image: "/images/team/uchenna-okoro.png",
    bio: "Dr Uchenna Okoro is an oncologist with experience establishing and managing oncology operations. He previously supported oncology services at Evercare Hospital and served as lead oncologist at Federal Medical Centre, Ebute Metta.",
  },
  // {
  //   name: "Dr Etima Ukpe",
  //   role: "Operations Manager, OncoClinics Africa",
  //   image: "/images/home/strip-3.jpg",
  //   bio: "Dr Etima Ukpe is a medical doctor with experience in healthcare management and clinical operations. She previously served as Managing Director at Neon Health Services.",
  // },
  {
    name: "Dr Abou Dao",
    role: "Senior Radiation Oncologist, OncoClinics Africa",
    image: "/images/team/abou-dao.png",
    bio: "Dr Abou Dao is a radiation oncologist with 14 years of specialist experience. He previously taught at Joseph Ki-Zerbo University in Ouagadougou and led the Bogodogo radiotherapy centre.",
  },
  {
    name: "Toni Rahme",
    role: "Chief Executive Officer, POCCH",
    image: "/images/team/toni-rahme-portrait.png",
    bio: "Toni Rahme is an experienced healthcare manager with a background in developing and operating multi-site healthcare organisations. He previously served as Chief Operating Officer of Farah Group in Côte d’Ivoire.",
  },
  // {
  //   name: "Francis Byron Opinion",
  //   role: "Chief Quality Officer, POCCH",
  //   image: "/images/home/what-we-do.jpg",
  //   bio: "Francis Byron Opinion has 25 years of experience in the Gulf region, with expertise in nursing education, healthcare quality and international accreditation.",
  // },
  {
    name: "Samson Abiola",
    role: "Operations Manager, Rencare Africa",
    image: "/images/team/samson-abiola.png",
    bio: "Samson Abiola has more than 14 years of experience developing and implementing critical and chronic healthcare solutions. He previously served as General Manager at ADCEM Healthcare Limited and as a management accountant at Fidson Healthcare Plc.",
  },
  {
    name: "Morountodun Sowemimo",
    role: "Business Transformation Manager",
    image: "/images/team/morountodun-sowemimo.png",
    bio: "Morountodun Sowemimo is a business transformation professional with experience supporting enterprise-wide change programmes across healthcare and other sectors. At HIA, she supports business improvement, programme coordination and strategic execution.",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "unexpected-realities-accessible-healthcare",
    category: "ISSUE 01:",
    title: "The Unexpected Realities of Accessible Healthcare",
    excerpt:
      "What it takes to deliver specialty care where infrastructure, power and talent are constrained.",
    image: "/images/blog/issue-1.jpg",
    date: "2025-01-15",
  },
  {
    slug: "building-oncology-capacity-nigeria",
    category: "ISSUE 02:",
    title: "Lessons from Years of Investing in Africa\u2019s Healthcare",
    excerpt:
      "How OncoClinics Africa is closing the gap in radiotherapy and cancer pathways.",
    image: "/images/home/strip-2.jpg",
    date: "2025-04-10",
  },
  {
    slug: "renal-care-closer-to-home",
    category: "ISSUE 03:",
    title: "Building from Within Sustaining Medical Talent in Nigeria",
    excerpt:
      "Expanding dialysis access through Rencare Africa’s multi-location network.",
    image: "/images/home/strip-3.jpg",
    date: "2025-07-22",
  },
];

export const CONTACT_PATIENT_ROUTES = [
  {
    id: "cancer" as const,
    title: "Cancer care",
    body: "For cancer-care enquiries, contact OncoClinics Africa.",
    href: "https://oncoclinicsafrica.com/",
    cta: "OncoClinics Africa",
  },
  {
    id: "renal" as const,
    title: "Dialysis & renal care",
    body: "For dialysis and renal-care enquiries, contact Rencare Africa.",
    href: "https://www.rencareafrica.com/",
    cta: "Rencare Africa",
  },
  {
    id: "hospital" as const,
    title: "POCCH",
    body: "Oncology, cardiovascular, renal, surgical and diagnostic care under one roof.",
    href: "https://peterodilihospital.com/",
    cta: "POCCH",
  },
];

export const GALLERY_IMAGES = [
  { src: "/images/operations/oncoclinics.png", alt: "OncoClinics radiotherapy treatment room", brand: "oncoclinics" as const },
  { src: "/images/gallery/onco-1.jpg", alt: "OncoClinics clinical team", brand: "oncoclinics" as const },
  { src: "/images/gallery/onco-2.jpg", alt: "Radiotherapy suite", brand: "oncoclinics" as const },
  { src: "/images/gallery/onco-3.jpg", alt: "Patient consultation", brand: "oncoclinics" as const },
  { src: "/images/gallery/onco-4.jpg", alt: "Medical imaging", brand: "oncoclinics" as const },
  { src: "/images/gallery/onco-5.jpg", alt: "Clinic exterior", brand: "oncoclinics" as const },
  { src: "/images/gallery/onco-6.jpg", alt: "Care team", brand: "oncoclinics" as const },
  { src: "/images/operations/rencare.png", alt: "Rencare dialysis treatment room", brand: "rencare" as const },
  { src: "/images/gallery/ren-1.jpg", alt: "Dialysis chairs", brand: "rencare" as const },
  { src: "/images/gallery/ren-2.jpg", alt: "Nephrology nurse", brand: "rencare" as const },
  { src: "/images/gallery/ren-3.jpg", alt: "Rencare facility", brand: "rencare" as const },
  { src: "/images/gallery/ren-4.jpg", alt: "Patient care", brand: "rencare" as const },
  { src: "/images/gallery/ren-5.jpg", alt: "Medical equipment", brand: "rencare" as const },
  { src: "/images/gallery/ren-6.jpg", alt: "Clinic corridor", brand: "rencare" as const },
  { src: "/images/operations/pocch.png", alt: "Dr. Peter Odili Cancer Cardiovascular Diagnostics and Treatment Centre", brand: "pocch" as const },
  { src: "/images/home/mission.jpg", alt: "POCCH specialist reviewing a patient record", brand: "pocch" as const },
  { src: "/images/home/strip-3.jpg", alt: "POCCH consultation between clinician and patient", brand: "pocch" as const },
];

export const FOOTER_STATEMENT =
  "Health Invest Africa develops and operates specialist healthcare networks through sustainable partnerships.";
