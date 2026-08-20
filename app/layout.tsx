import type { Metadata } from "next";
import { fontAeonik, fontMontserrat } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/site-shell";
import { Footer } from "@/components/footer/footer";
import { Preloader } from "@/components/ui/preloader";
import { VideoModalProvider } from "@/components/ui/video-modal";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Specialist Healthcare Investment & Operations`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontMontserrat.variable} ${fontAeonik.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${fontMontserrat.className} min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased`}
        suppressHydrationWarning
      >
        <Preloader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to content
        </a>
        <VideoModalProvider>
          <SiteShell footer={<Footer />}>{children}</SiteShell>
        </VideoModalProvider>
      </body>
    </html>
  );
}
