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
  body: "At Health Invest Africa, we believe that beyond treatment, healthcare is an investment in life itself. In a region where access to quality healthcare remains a challenge, we are reshaping the narrative by investing in medical infrastructure, cutting-edge technology, and, most importantly, the people who make healing possible.\n\nOur focus is on non communicable diseases, silent threats like kidney disease and cancer that often go undiagnosed until it\u2019s too late. Through our platforms, we are creating a healthcare ecosystem where patients receive not just treatment, but hope, dignity, and a fighting chance at life.\n\nBut we are more than a healthcare provider. We are a collective of specialised institutions tackling different aspects of medical care, each with autonomy but bound by a shared mission: to redefine what is possible in African healthcare.",
};

export const OUR_FOCUS = {
  eyebrow: "OUR FOCUS",
  intro: "Our networks deliver accessible critical care for the most urgent non communicable diseases (NCDs) impacting Nigeria and Sub-Saharan Africa.",
  areas: [
    {
      number: "01",
      title: "Oncology",
      description:
        "Comprehensive cancer care spanning diagnosis, radiation oncology, clinical treatment and multidisciplinary pathways.",
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
      description: "Modern cardiovascular care.",
    },
    {
      number: "04",
      title: "Imaging",
      description: "Advanced imaging solutions.",
    },
  ],
};

export const OUR_MISSION_HOME = {
  title: "Our\nMission",
  subtitle: "We bring specialty care to the underserved.",
  body: "Across Africa, many patients still travel far or go without the specialist care they need. Health Invest Africa builds and operates healthcare platforms that bring oncology, nephrology, cardiology and advanced imaging closer to underserved communities.\n\nThrough sustainable partnerships, investment in infrastructure and clinical teams, and disciplined operations, we are expanding reliable specialty care across Nigeria and the wider region.",
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
    name: "OncoClinics",
    href: "/our-operations/oncoclinics-africa",
    externalUrl: "https://oncoclinicsafrica.com/",
    summary:
      "Developing and operating radiotherapy and cancer-care services in partnership with leading healthcare institutions.",
    cta: "Visit OncoClinics",
    image: "/images/operations/oncoclinic.webp",
    logo: "/logos/oncoclinics.png",
    metric: "3,500 patients treated to date",
  },
  {
    id: "rencare",
    name: "Rencare Africa",
    href: "/our-operations/rencare-africa",
    externalUrl: "https://www.rencareafrica.com/",
    summary:
      "Operating reliable dialysis and renal-care centres designed around access, clinical quality and sustainable partnerships.",
    cta: "Visit Rencare Africa",
    image: "/images/operations/rencare.webp",
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
    image: "/images/operations/Dr. Peter Odili Cancer and Cadiovascular Hospital.webp",
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
  introTitle: "Building and operating specialist healthcare capacity",
  introBody:
    "Health Invest Africa is a healthcare investment and operations platform. We identify partnership opportunities, deploy capital and infrastructure, and manage the clinical and administrative operations that turn specialist services into reliable, accessible care.\n\nOur operating model combines partnership structuring, equipment and technology deployment, workforce development, and disciplined financial and quality management. We remain accountable for performance long after assets are installed, ensuring services are clinically responsible, financially sustainable and built to endure.\n\nThrough focused healthcare platforms across oncology, nephrology, cardiology and advanced imaging, we are creating scalable networks that expand specialist capacity across Nigeria and the wider region.",
  stories: {
    title: "The Human Stories\nThat Define Us",
    body: "While our strategy focuses on large-scale transformation, the heart of our story lies in the lives we impact every day.",
  },
  storyColumns: [
    {
      title: "Patients Who Find Hope",
      body: "A father at Rencare receives life-saving dialysis, giving him more time with his family. A young mother at OncoClinics, once without options, now fights cancer with access to world-class treatment.",
    },
    {
      title: "Clinicians Who Lead With Passion",
      body: "From the physicists in Ebonyi to the therapists in Enugu, our medical professionals are not just providing care. They are rewriting what it means to practice medicine in Nigeria.",
    },
    {
      title: "Centers That Bring Healing Closer",
      body: "In Enugu, where our journey began, we see the power of a well-built healthcare system. In Sokoto, we witness the impact of efficiency and strong infrastructure. Each center tells a different chapter in our story.",
    },
  ],
  africa: {
    title: "Redefining Healthcare Investment in Africa",
    body: "The healthcare system in Nigeria has long been plagued by gaps in infrastructure, affordability, expertise, and patient trust. Health Invest Africa is bridging those gaps, not just by building medical centers but by fostering an entirely new approach to healthcare investment.",
  },
  africaColumns: [
    {
      title: "Building Infrastructure through Partnerships",
      body: "Collaboration is at the centre of what we do. We specialise in deploying healthcare capacity through partnerships with public and private sectors, and we leverage our robust supplier network to ensure uninterrupted quality care across our facilities.",
    },
    {
      title: "Technology-Enabled Operations",
      body: "We focus on deploying modern treatment technology and tools to ensure the best care possible, and we utilise AI to bridge staffing and expertise gaps.",
    },
    {
      title: "Sustained Operational Excellence",
      body: "We build robust, consistent operations that enable high-quality care across every location in our network.",
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
      body: "The human touch in every consultation, every surgery, and every reassuring word that brings hope to patients and their families.",
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
    "OncoClinics expands access to cancer care. Rencare Africa builds reliable renal-care capacity. POCCH provides integrated specialist hospital services in Port Harcourt.",
  footprint:
    "HIA’s network spans 12 centres across Nigeria (figures subject to the dated management-approved data register).",
};

export const ONCOCLINICS = {
  title: "Expanding Access to Advanced Cancer Care",
  overview:
    "OncoClinics develops and operates oncology services in partnership with public and private healthcare institutions. The platform combines specialist equipment, clinical operations, multidisciplinary expertise and workforce development to bring cancer care closer to patients and strengthen local treatment capacity.",
  metric: "3,500 patients treated to date",
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
      name: "University of Benin Teaching Hospital, Edo",
      city: "Edo",
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
  metric: "25,000+ dialysis sessions delivered",
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
      name: "Rencare Dialysis Centre, Ikeja, Lagos",
      city: "Lagos-Ikeja",
    },
    {
      name: "Rencare Dialysis Centre, Alimosho, Lagos",
      city: "Lagos-Alimosho",
    },
  ] satisfies LocationItem[],
};

export const POCCH = {
  title: "Dr. Peter Odili Specialist Cancer & Cardiovascular Hospital",
  overview:
    "Health Invest Africa operates Dr. Peter Odili Specialist Cancer & Cardiovascular Hospital (POCCH), a leading tertiary healthcare institution in Port Harcourt dedicated to delivering advanced and compassionate medical care at international standards.",
  specialties:
    "The hospital specialises in oncology (cancer care), cardiovascular medicine, renal (kidney) care, advanced surgery, and precision diagnostics, all under one roof.",
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
    "Established in 2022 · 12 centres · 200+ professionals · More than 250 patients treated per day · 3,500 patients treated to date · 25,000+ dialysis sessions delivered",
  ledger: [
    {
      value: "2022",
      label: "Year established",
      href: null,
      note: null,
    },
    {
      value: "3,500",
      label: "Patients treated to date",
      href: "/our-operations/oncoclinics-africa",
      note: "OncoClinics",
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
      body: "HIA supports licensing processes, recurring training, professional development and selected conference participation to strengthen local clinical and technical capacity, including workforce initiatives such as Project STRAWN.",
    },
    {
      title: "Reducing barriers around treatment",
      body: "Selected initiatives include paediatric radiotherapy support and affordable accommodation options for cancer patients in approved locations.",
    },
    {
      title: "Building evidence for better access",
      body: "More consistent service delivery and operating data can help healthcare payers better understand demand, utilisation and the requirements of specialist non communicable diseases care.",
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
    role: "Clinical Coordinator, OncoClinics",
    image: "/images/team/uchenna-okoro.png",
    bio: "Dr Uchenna Okoro is an oncologist with experience establishing and managing oncology operations. He previously supported oncology services at Evercare Hospital and served as lead oncologist at Federal Medical Centre, Ebute Metta.",
  },
  // {
  //   name: "Dr Etima Ukpe",
  //   role: "Operations Manager, OncoClinics",
  //   image: "/images/home/strip-3.jpg",
  //   bio: "Dr Etima Ukpe is a medical doctor with experience in healthcare management and clinical operations. She previously served as Managing Director at Neon Health Services.",
  // },
  {
    name: "Dr Abou Dao",
    role: "Senior Radiation Oncologist, OncoClinics",
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
    slug: "project-strawn-launch-ceremony",
    category: "Workforce Development",
    title:
      "Project STRAWN: Strengthening Nigeria\u2019s Radiotherapy Workforce for Better Cancer Care",
    excerpt:
      "Infrastructure alone does not deliver cancer care. Project STRAWN strengthens Nigeria\u2019s radiotherapy workforce so investments in equipment translate into safe, effective treatment for patients.",
    image: "/images/blog/project-strawn.webp",
    date: "2025-09-18",
    sections: [
      {
        type: "heading",
        text: "What is the missing link between cancer infrastructure and care?",
      },
      {
        type: "paragraph",
        text: "This is a question at the heart of our work at Health Invest Africa.",
      },
      {
        type: "paragraph",
        text: "Across Nigeria, investment in cancer infrastructure is expanding much-needed treatment capacity. But infrastructure alone does not deliver care.",
      },
      {
        type: "paragraph",
        text: "A radiotherapy machine is essential. Yet for that machine to translate into safe, effective treatment, patients also need skilled professionals, clear clinical pathways, quality-assurance systems, strong hospital processes, appropriate regulatory oversight, and the practical support required to begin and complete treatment.",
      },
      {
        type: "paragraph",
        text: "For us, building healthcare capacity means investing in all of these elements together.",
      },
      {
        type: "heading",
        text: "Infrastructure is only the beginning",
      },
      {
        type: "paragraph",
        text: "Specialist healthcare depends on more than equipment.",
      },
      {
        type: "paragraph",
        text: "A functioning cancer-care system requires the right technology, but it also depends on the people who operate it, the institutions that support them, and the systems that ensure care is delivered safely and consistently.",
      },
      {
        type: "paragraph",
        text: "This is particularly important in radiotherapy, where treatment planning, quality assurance, radiation safety, equipment operation and multidisciplinary coordination require specialised expertise.",
      },
      {
        type: "paragraph",
        text: "As Nigeria continues to strengthen its cancer-care infrastructure, developing the workforce behind that infrastructure must remain an equally important priority.",
      },
      {
        type: "heading",
        text: "Building Nigeria\u2019s radiotherapy workforce",
      },
      {
        type: "paragraph",
        text: "This thinking underpins Project STRAWN: Strengthening Radiation Therapy Workforce in Nigeria, an initiative of Health Invest Africa\u2019s oncology platform, OncoClinics, in partnership with the University of Nigeria Teaching Hospital, Ituku-Ozalla, Enugu (UNTH).",
      },
      {
        type: "paragraph",
        text: "Project STRAWN was presented to the Honourable Minister of State for Health and Social Welfare, Dr. Iziaq Kunle Salako, who described the initiative as timely and relevant to Nigeria\u2019s cancer-control priorities, particularly in the area of workforce development.",
      },
      {
        type: "paragraph",
        text: "The programme is designed to help strengthen Nigeria\u2019s radiotherapy workforce pipeline through a structured, supervised and competency-based pathway for developing professionals who support the delivery of radiotherapy services.",
      },
      {
        type: "paragraph",
        text: "At its core is a simple principle: investment in cancer infrastructure must be matched by investment in the people who make that infrastructure work.",
      },
      {
        type: "heading",
        text: "From healthcare investment to patient impact",
      },
      {
        type: "paragraph",
        text: "For patients, the value of a radiotherapy facility is ultimately measured by whether they can access treatment that is safe, reliable and clinically appropriate.",
      },
      {
        type: "paragraph",
        text: "That requires more than installing equipment.",
      },
      {
        type: "paragraph",
        text: "It means developing professionals with the competencies required to use that equipment effectively. It means supporting quality and safety standards. It means strengthening the systems around treatment delivery and building pathways that help patients move through care with greater consistency.",
      },
      {
        type: "paragraph",
        text: "Project STRAWN brings together public- and private-sector partners across Nigeria\u2019s health system to contribute toward this goal.",
      },
      {
        type: "paragraph",
        text: "By strengthening workforce capacity alongside infrastructure, the initiative aims to help ensure that investments in radiotherapy translate into something more meaningful: better access to quality cancer care and improved outcomes for patients.",
      },
      {
        type: "heading",
        text: "Partnership is part of the infrastructure",
      },
      {
        type: "paragraph",
        text: "No single organisation can address the workforce and infrastructure needs of cancer care alone.",
      },
      {
        type: "paragraph",
        text: "Sustainable progress requires collaboration between government, teaching institutions, healthcare providers, technology partners, professional communities and the private sector.",
      },
      {
        type: "paragraph",
        text: "Health Invest Africa is grateful to the Federal Ministry of Health and Social Welfare, the Honourable Minister of State for Health and Social Welfare, the University of Nigeria Teaching Hospital, Siemens Healthineers, and the technical and institutional partners contributing to Project STRAWN.",
      },
      {
        type: "paragraph",
        text: "Their participation reflects a broader understanding that strengthening specialist healthcare requires shared responsibility and long-term collaboration.",
      },
      {
        type: "heading",
        text: "Building beyond facilities",
      },
      {
        type: "paragraph",
        text: "At Health Invest Africa, we believe that healthcare investment should ultimately be measured by what it makes possible for people.",
      },
      {
        type: "paragraph",
        text: "The future of specialty healthcare in Africa will not be built by facilities alone.",
      },
      {
        type: "paragraph",
        text: "It will be built by the infrastructure, systems, partnerships and people behind them, working together to ensure that patients can access the specialist care they need.",
      },
      {
        type: "paragraph",
        text: "At Health Invest Africa, we invest in life.",
      },
    ],
  },
  {
    slug: "nigeria-ncd-health-crisis",
    category: "Health Policy",
    title: "Nigeria\u2019s Silent Health Crisis",
    excerpt:
      "Non communicable diseases are surging across Nigeria. Here is what the data shows, and how Health Invest Africa is strengthening systems to close the gap.",
    image: "/images/blog/health-crisis.webp",
    date: "2026-08-12",
    sections: [
      {
        type: "paragraph",
        text: "Nigeria is facing a silent health crisis, and it isn\u2019t the one most people expect.",
      },
      {
        type: "paragraph",
        text: "It is the hidden culprit behind countless obituaries reading \u201cpassed away after a brief illness\u201d or \u201clost to a protracted battle.\u201d",
      },
      {
        type: "paragraph",
        text: "For decades, public health efforts across sub-Saharan Africa have focused on communicable diseases like Tuberculosis and HIV. However, according to the 2022 Lancet Nigeria Commission, non communicable diseases (NCDs) like cancer, cardiovascular, and chronic kidney diseases are surging, almost overtaking communicable, maternal, neonatal, and nutritional diseases as the leading contributor to age-standardized mortality in Nigeria.",
      },
      {
        type: "paragraph",
        text: "Nigeria faces a double disease burden: communicable illnesses drive youth mortality, while non communicable diseases (NCDs) surge among the elderly. Here are some facts:",
      },
      {
        type: "image",
        src: "/images/blog/nigeria-double-burden-of-disease.webp",
        alt: "Nigeria\u2019s double burden of disease: communicable illnesses and non communicable diseases",
        caption: "Nigeria\u2019s double burden of disease",
      },
      {
        type: "list",
        items: [
          "Life Expectancy: Stands at just over 54 years according to World Bank data, ranking among the lowest globally.",
          "Regional Risk Shift: NCD deaths across the WHO African Region rose from 24.2% in 2000 to 37.1% in 2019. In Nigeria, NCDs claimed 567 lives per 100,000 people in 2019.",
          "Mortality Profile (2023): Communicable diseases claimed 1.04 million lives in Nigeria, while NCDs accounted for 602,000 deaths, and injuries caused 140,000.",
          "Hypertension Prevalence: 1 in 3 Nigerian adults has hypertension, a major driver of cardiovascular disease and NCD mortality.",
          "Structural Bottlenecks: Cancer care and NCD management are crippled by missing diagnostic tools, low health literacy, and severe delivery delays.",
          "Financial Strain: 70% of healthcare spending is out-of-pocket, driving catastrophic health spending that forces households into poverty.",
          "Patient Impact: Every statistic translates to citizens facing long travel, high costs, and dangerous delays before treatment begins.",
        ],
      },
      {
        type: "image",
        src: "/images/blog/the-numbers-tell-a-story.webp",
        alt: "Key statistics on Nigeria\u2019s non communicable disease burden",
        caption: "The numbers tell a story",
      },
      {
        type: "heading",
        text: "What is the way forward?",
      },
      {
        type: "paragraph",
        text: "Currently, there are two broad efforts required to address the growing NCD burden: stronger implementation and enforcement of existing NCD-related policies, and strengthening healthcare systems to improve the diagnosis and treatment of NCDs.",
      },
      {
        type: "paragraph",
        text: "From a policy point of view, while policies exist, implementation remains a significant gap. For instance, the enforcement of existing regulations on health-harming products that elevate the risk of non communicable diseases has been inconsistent or, often, nonexistent. These products include sugar-sweetened beverages, ultra-processed foods, skin-lightening cosmetics, and tobacco, as outlined in the 2019 National Multisectoral Action Plan for the Prevention and Control of Non-Communicable Diseases.",
      },
      {
        type: "paragraph",
        text: "In terms of systems strengthening, Health Invest Africa (HIA) is built specifically to respond to this key lever of the NCD crisis. HIA strengthens and activates existing healthcare systems and assets through its management and specialist healthcare platforms.",
      },
      {
        type: "image",
        src: "/images/blog/one-healthcare-system-three-specialist-platforms.webp",
        alt: "One healthcare system with three specialist platforms: OncoClinics, Rencare and POCCH",
        caption: "One healthcare system, three specialist platforms",
      },
      {
        type: "paragraph",
        text: "HIA has developed platforms that sit at the intersection of public and private healthcare, enabling stronger cooperation and improving the ability of existing systems to diagnose and treat NCDs. To achieve this, HIA operates specialized care models, including OncoClinics for cancer care and Rencare for kidney care. Furthermore, HIA has launched a hospital management platform designed to empower healthcare assets that would otherwise be underutilized, with the first project being the Dr. Peter Odili Cancer and Cardiovascular Hospital (POCCH).",
      },
      {
        type: "paragraph",
        text: "Follow for more and learn how we are collaborating with government and stakeholders to close the NCD gap in Nigeria.",
      },
      {
        type: "tags",
        items: [
          "#WeInvestInLife",
          "#HealthcareInAfrica",
          "#HealthSystems",
          "#PublicPrivatePartnerships",
        ],
      },
      {
        type: "heading",
        text: "References",
      },
      {
        type: "references",
        items: [
          {
            text: "Abubakar, I., Dalglish et al. (2022). The Lancet Nigeria Commission: investing in health and the future of the nation. The Lancet, 399(10330), 1155\u20131200.",
            href: "https://doi.org/10.1016/S0140-6736(21)02488-0",
          },
          {
            text: "Barry, A. et. Al. (2025). Non-communicable diseases in the WHO African region: analysis of risk factors, mortality, and responses based on WHO data. Scientific Reports, 15.",
            href: "https://doi.org/10.1038/s41598-025-97180-3",
          },
          {
            text: "Nwankwo, M., Makena, W., Idris, A. et al. Prevalence of hypertension among adults in Nigeria: a systematic review and meta-analysis. BMC Cardiovasc Disord 26, 330 (2026).",
            href: "https://doi.org/10.1186/s12872-026-05722-y",
          },
          {
            text: "Odunyemi A, Rahman T and Alam K. (2023). Economic burden of non-communicable diseases on households in Nigeria: evidence from the Nigeria living standard survey 2018-19. BMC Public Health. 2023 Aug 17;23(1):1563.",
            href: "https://www.springermedicine.com/economic-burden-of-non-communicable-diseases-on-households-in-ni/25933356",
          },
          {
            text: "Ritchie, H. (2026). Health: Nigeria Country Profile. Our World in Data.",
            href: "https://ourworldindata.org/profile/health/nigeria",
          },
          {
            text: "Venley, N. N. (2026, May 4th). Nigeria ranks lowest in global life expectancy. International Centre for Investigative Reporting.",
            href: "https://www.icirnigeria.org/nigeria-ranks-lowest-in-global-life-expectancy/",
          },
          {
            text: "World Bank. (n.d.). Life expectancy at birth, total (years) - Nigeria. World Bank Gender Data Portal. Retrieved August 12, 2026.",
            href: "https://genderdata.worldbank.org/en/indicator/sp-dyn-le00-in?gender=total",
          },
        ],
      },
    ],
  },
  {
    slug: "bringing-renal-care-closer-to-home",
    category: "Renal Care",
    title: "Bringing Renal Care Closer to Home",
    excerpt:
      "Chronic kidney disease is one of Nigeria\u2019s fastest-growing non communicable disease challenges. Through Rencare, Health Invest Africa is expanding reliable dialysis access through institutional partnerships.",
    image: "/images/gallery/rencare-1.webp",
    date: "2025-06-20",
    sections: [
      {
        type: "paragraph",
        text: "For many Nigerian families, chronic kidney disease arrives with little warning and few nearby options for treatment.",
      },
      {
        type: "paragraph",
        text: "What begins as a manageable condition can quickly become a life-defining challenge when dialysis centres are far away, waiting times are long, and the cost of regular treatment places sustained pressure on household finances.",
      },
      {
        type: "paragraph",
        text: "As non communicable diseases continue to rise across Nigeria, renal care is no longer a specialist concern at the margins of the health system. It is a growing public health priority that demands reliable capacity, closer to the communities that need it.",
      },
      {
        type: "heading",
        text: "A growing burden few families are prepared for",
      },
      {
        type: "paragraph",
        text: "Chronic kidney disease often progresses quietly. By the time many patients require renal replacement therapy, the nearest dependable dialysis service may be hours away, in another city, or simply unavailable when it is needed most.",
      },
      {
        type: "paragraph",
        text: "Nigeria requires thousands more dialysis machines than are currently installed to meet national need. Yet closing that gap is not only a question of equipment. It is also a question of where services are located, how consistently they operate, and whether patients can access care without exhausting time, money and hope before treatment even begins.",
      },
      {
        type: "heading",
        text: "Why access matters as much as equipment",
      },
      {
        type: "paragraph",
        text: "Dialysis is not a one-time intervention. It is recurring, clinically demanding care that depends on trained teams, reliable infrastructure, quality controls and disciplined day-to-day operations.",
      },
      {
        type: "paragraph",
        text: "For patients, the difference between a functioning renal service and an underused facility is measured in missed sessions, delayed referrals, long journeys and treatment interruptions that put lives at risk.",
      },
      {
        type: "paragraph",
        text: "That is why Health Invest Africa approaches renal care as an operating challenge, not simply an infrastructure project. Sustainable dialysis capacity requires institutions, partnerships and management systems that keep services running well over time.",
      },
      {
        type: "heading",
        text: "Building dialysis capacity through partnership",
      },
      {
        type: "paragraph",
        text: "Through Rencare, Health Invest Africa develops and operates dialysis services in partnership with leading healthcare institutions. Rather than working in isolation, the platform combines clinical teams, equipment, consumables, quality controls and centre management to deliver consistent renal care across its network.",
      },
      {
        type: "paragraph",
        text: "This partnership-led model helps unlock existing healthcare assets, strengthen service delivery and bring dialysis closer to patients in cities including Ibadan, Abuja, Lagos-Ikeja and Lagos-Alimosho.",
      },
      {
        type: "paragraph",
        text: "To date, Rencare has delivered more than 25,000 dialysis sessions, reflecting both the scale of unmet need and the importance of building services patients can return to with confidence.",
      },
      {
        type: "heading",
        text: "What reliable renal care requires",
      },
      {
        type: "paragraph",
        text: "A dialysis centre only works when the systems around it work.",
      },
      {
        type: "paragraph",
        text: "That means appropriate staffing, preventive maintenance, infection control, patient scheduling, supply chain reliability and financial discipline. It also means designing services around the realities patients face: travel distance, affordability, continuity of care and trust in the institution providing treatment.",
      },
      {
        type: "paragraph",
        text: "By standardising operations while adapting to local institutional contexts, Rencare aims to make renal care more dependable, not only in major urban centres but across a growing network of locations.",
      },
      {
        type: "heading",
        text: "From centres to networks",
      },
      {
        type: "paragraph",
        text: "The long-term goal is not a single standout facility. It is a network of renal services that can scale responsibly, share operational learning and expand access without compromising clinical quality.",
      },
      {
        type: "paragraph",
        text: "For Health Invest Africa, that is the essence of specialist healthcare investment: building platforms that turn capacity into care, and care into better outcomes for patients who would otherwise go without.",
      },
      {
        type: "paragraph",
        text: "At Health Invest Africa, we invest in life.",
      },
    ],
  },
];

export const CONTACT_PATIENT_ROUTES = [
  {
    id: "cancer" as const,
    title: "Cancer care",
    body: "For cancer care enquiries, contact OncoClinics.",
    href: "https://oncoclinicsafrica.com/",
    cta: "OncoClinics",
  },
  {
    id: "renal" as const,
    title: "Dialysis & renal care",
    body: "For dialysis and renal care enquiries, contact Rencare Africa.",
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

function gallerySrc(...segments: string[]) {
  return encodeURI(`/images/gallery/${segments.join("/")}`);
}

function numberedImages(
  folderSegments: string[],
  count: number,
  alt: string
) {
  return Array.from({ length: count }, (_, index) => {
    const n = index + 1;
    return {
      src: gallerySrc(...folderSegments, `${n}.webp`),
      alt: `${alt}, photo ${n}`,
    };
  });
}

export const GALLERY_EVENTS = [
  {
    id: "rencare-ibadan-church-outreach-2026",
    brand: "rencare" as const,
    title: "Ibadan Church Outreach",
    year: "2026",
    location: "Ibadan",
    summary:
      "Community kidney health outreach with church partners in Ibadan.",
    images: numberedImages(
      ["Rencare", "2026", "Ibadan Church Outreach"],
      4,
      "Rencare Ibadan church outreach"
    ),
  },
  {
    id: "rencare-nurses-week-2026",
    brand: "rencare" as const,
    title: "Nurses Week",
    year: "2026",
    location: "Rencare Network",
    summary:
      "Celebrating the nurses who deliver dialysis care across the Rencare network.",
    images: numberedImages(
      ["Rencare", "2026", "Nurses Week"],
      7,
      "Rencare Nurses Week"
    ),
  },
  {
    id: "rencare-wkd-2026-bodija",
    brand: "rencare" as const,
    title: "World Kidney Day",
    year: "2026",
    location: "Bodija, Ibadan",
    summary:
      "Community outreach and kidney health awareness activities in Bodija, Ibadan for World Kidney Day 2026.",
    images: numberedImages(
      ["Rencare", "2026", "World Kidney Day - WKD 2026", "Ibadan Bodija Ibadan"],
      8,
      "Rencare World Kidney Day in Bodija, Ibadan"
    ),
  },
  {
    id: "rencare-wkd-2026-rccg",
    brand: "rencare" as const,
    title: "World Kidney Day",
    year: "2026",
    location: "RCCG, Ibadan",
    summary:
      "Rencare World Kidney Day engagement with the RCCG community in Ibadan.",
    images: numberedImages(
      ["Rencare", "2026", "World Kidney Day - WKD 2026", "Ibadan RCCG"],
      8,
      "Rencare World Kidney Day at RCCG Ibadan"
    ),
  },
  {
    id: "rencare-wkd-2026-magodo",
    brand: "rencare" as const,
    title: "World Kidney Day",
    year: "2026",
    location: "Magodo, Lagos",
    summary:
      "Partnership event in Magodo marking World Kidney Day 2026 with Rencare.",
    images: numberedImages(
      ["Rencare", "2026", "World Kidney Day - WKD 2026", "Magodo Partnership Event"],
      8,
      "Rencare World Kidney Day partnership event in Magodo"
    ),
  },
  {
    id: "pocch-world-cancer-day-2026",
    brand: "pocch" as const,
    title: "World Cancer Day March",
    year: "2026",
    location: "Port Harcourt",
    summary:
      "POCCH Cancer March marking World Cancer Day, bringing awareness and solidarity across Port Harcourt.",
    images: numberedImages(
      ["POCCH", "2026", "POCCH Cancer MARCH - World Cancer Day"],
      15,
      "POCCH World Cancer Day march"
    ),
  },
];

export const FOOTER_STATEMENT =
  "Health Invest Africa develops and operates specialist healthcare networks through sustainable partnerships.";
