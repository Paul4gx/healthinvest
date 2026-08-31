export type NavLink = {
  href: string;
  label: string;
  children?: readonly { href: string; label: string }[];
};

export type BlogReference = {
  text: string;
  href?: string;
};

export type BlogPostSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "references"; items: BlogReference[] }
  | { type: "tags"; items: string[] };

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  body?: string[];
  sections?: BlogPostSection[];
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type StatItem = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: "centers" | "professionals" | "patients";
};

export type PlatformCard = {
  id: string;
  name: string;
  href: string;
  externalUrl: string | null;
  summary: string;
  cta: string;
  image: string;
  logo: string;
  knockOutBlack?: boolean;
  metric?: string;
};

export type ModelStep = {
  number: string;
  title: string;
  body: string;
};

export type LocationItem = {
  name: string;
  city?: string;
};

export type EnquiryType =
  | "partnership"
  | "investment"
  | "media"
  | "careers"
  | "corporate"
  | "other";

export type GalleryBrand = "oncoclinics" | "rencare" | "pocch";

export type GalleryEventImage = {
  src: string;
  alt: string;
};

export type GalleryEvent = {
  id: string;
  brand: GalleryBrand;
  title: string;
  year: string;
  summary?: string;
  location?: string;
  images: GalleryEventImage[];
};
