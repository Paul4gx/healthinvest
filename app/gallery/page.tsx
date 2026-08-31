import type { Metadata } from "next";
import GalleryPageClient from "@/components/sections/gallery-page";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Stories of wellness from OncoClinics and Rencare.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
