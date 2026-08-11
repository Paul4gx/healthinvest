import type { Metadata } from "next";
import { AboutStoryPage } from "@/components/sections/about-story-page";

export const metadata: Metadata = {
  title: "About Us | Health Invest Africa",
  description:
    "Learn how Health Invest Africa combines investment, infrastructure, technology, clinical capability and operations to expand specialist healthcare access.",
};

export default function AboutStoryRoute() {
  return <AboutStoryPage />;
}
