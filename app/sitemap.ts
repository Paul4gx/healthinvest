import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/about/story",
    "/our-model",
    "/our-operations",
    "/our-operations/oncoclinics-africa",
    "/our-operations/rencare-africa",
    "/our-operations/pocch",
    "/impact",
    "/leadership",
    "/insights",
    "/contact",
    "/privacy",
    "/cookies",
    "/terms",
    "/accessibility",
    "/gallery",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
