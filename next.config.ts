import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true,
          formats: ["image/avif", "image/webp"] as const,
          deviceSizes: [360, 390, 430, 640, 768, 1024, 1280, 1440, 1600, 1920],
          imageSizes: [64, 96, 128, 256, 384],
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [360, 390, 430, 640, 768, 1024, 1280, 1440, 1600, 1920],
          imageSizes: [64, 96, 128, 256, 384],
        },
      }),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  ...(!isStaticExport
    ? {
        async redirects() {
          return [
            { source: "/about-us", destination: "/about", permanent: true },
            { source: "/about-us/", destination: "/about", permanent: true },
            {
              source: "/our-operation",
              destination: "/our-operations",
              permanent: true,
            },
            {
              source: "/our-operation/",
              destination: "/our-operations",
              permanent: true,
            },
            {
              source: "/operations",
              destination: "/our-operations",
              permanent: true,
            },
            {
              source: "/operations/:path*",
              destination: "/our-operations/:path*",
              permanent: true,
            },
            { source: "/our-team", destination: "/leadership", permanent: true },
            {
              source: "/our-team/",
              destination: "/leadership",
              permanent: true,
            },
            { source: "/team", destination: "/leadership", permanent: true },
            { source: "/team/", destination: "/leadership", permanent: true },
            { source: "/blog", destination: "/insights", permanent: true },
            {
              source: "/blog/:slug",
              destination: "/insights/:slug",
              permanent: true,
            },
            { source: "/contact-us", destination: "/contact", permanent: true },
            {
              source: "/contact-us/",
              destination: "/contact",
              permanent: true,
            },
            {
              source: "/privacy-policy",
              destination: "/privacy",
              permanent: true,
            },
            {
              source: "/privacy-policy/",
              destination: "/privacy",
              permanent: true,
            },
            { source: "/events", destination: "/insights", permanent: true },
            { source: "/events/", destination: "/insights", permanent: true },
          ];
        },
      }
    : {}),
};

export default nextConfig;
