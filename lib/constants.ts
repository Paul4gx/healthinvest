export const SITE = {
  name: "Health Invest Africa",
  shortName: "HIA",
  legalName: "Health Invest Africa",
  email: "info@healthinvest.com.ng",
  phone: "+234803211625",
  phoneDisplay: "+234 803 211 625",
  address: "1608 Adeola Hopewell, Victoria Island, Lagos",
  url: "https://healthinvest.com.ng",
  linkedIn: "https://www.linkedin.com/company/health-invest-africa/",
  instagram: "https://www.instagram.com/healthinvestafrica",
  description:
    "Health Invest Africa develops and operates oncology, renal-care and specialist hospital networks through sustainable partnerships across Nigeria and Africa.",
  brandLine: "We invest in life.",
  mission: "We bring specialty care to the underserved.",
} as const;

export const PLATFORM_LINKS = [
  {
    href: "/our-operations/oncoclinics-africa",
    label: "OncoClinics Africa",
    external: "https://oncoclinicsafrica.com/",
  },
  {
    href: "/our-operations/rencare-africa",
    label: "Rencare Africa",
    external: "https://www.rencareafrica.com/",
  },
  {
    href: "/our-operations/pocch",
    label: "POCCH",
    external: "https://peterodilihospital.com/",
  },
] as const;

export const RESOURCE_LINKS = [
  { href: "/insights", label: "Insights" },
  { href: "/gallery", label: "Gallery" },
] as const;

export const NAV_LINKS = [
  { href: "/about/story", label: "About" },
  { href: "/our-model", label: "Our Model" },
  { href: "/our-operations", label: "Our Operations", children: PLATFORM_LINKS },
  { href: "/impact", label: "Impact" },
  { href: "/leadership", label: "Leadership" },
  { href: "/insights", label: "Resources", children: RESOURCE_LINKS },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_INFO_LINKS = [
  { href: "/about/story", label: "About" },
  { href: "/our-model", label: "Our Model" },
  { href: "/our-operations", label: "Our Operations" },
  { href: "/impact", label: "Impact" },
  { href: "/leadership", label: "Leadership" },
  { href: "/insights", label: "Insights" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Notice" },
  { href: "/cookies", label: "Cookie Notice" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/accessibility", label: "Accessibility Statement" },
] as const;

export const SOCIAL_LINKS = [
  { id: "linkedin", href: SITE.linkedIn, label: "LinkedIn" },
  { id: "instagram", href: SITE.instagram, label: "Instagram" },
] as const;

export const MOTION = {
  fast: 0.15,
  base: 0.25,
  medium: 0.4,
  slow: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;
