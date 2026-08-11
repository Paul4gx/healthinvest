import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import {
  FOOTER_INFO_LINKS,
  LEGAL_LINKS,
  PLATFORM_LINKS,
  SITE,
} from "@/lib/constants";
import { FOOTER_STATEMENT } from "@/content/site";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-hi-navy-deep text-white">
      <Container className="relative z-10 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1.4fr] lg:gap-12">
          <div>
            <Logo
              variant="light"
              className="[&_img]:brightness-0 [&_img]:invert"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 md:mt-6 md:text-base">
              {FOOTER_STATEMENT}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 lg:gap-8">
            <div>
              <p className="mb-3 text-sm font-medium text-white/55 md:mb-6">
                Corporate
              </p>
              <ul className="flex flex-col gap-2 text-[11px] leading-snug md:gap-2.5 md:text-sm md:leading-normal">
                {FOOTER_INFO_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 hover:text-hi-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-white/55 md:mb-6">
                Platforms
              </p>
              <ul className="flex flex-col gap-2 text-[11px] leading-snug md:gap-2.5 md:text-sm md:leading-normal">
                {PLATFORM_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 hover:text-hi-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mb-3 mt-6 text-sm font-medium text-white/55 md:mb-4 md:mt-8">
                Social
              </p>
              <SocialLinks />
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-6 lg:col-span-1 lg:block lg:gap-0">
              <div>
                <p className="mb-3 text-sm font-medium text-white/55 md:mb-6">
                  Contact
                </p>
                <ul className="flex flex-col gap-2 text-[11px] leading-snug md:gap-2.5 md:text-sm md:leading-normal">
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="inline-flex max-w-full items-center gap-1.5 transition-colors duration-200 hover:text-hi-accent md:gap-2.5"
                    >
                      <Mail
                        className="size-3.5 shrink-0 md:size-4"
                        strokeWidth={1.75}
                      />
                      <span className="whitespace-nowrap">{SITE.email}</span>
                    </a>
                  </li>
                  <li className="inline-flex items-start gap-1.5 leading-snug md:max-w-[320px] md:gap-2.5 md:leading-relaxed">
                    <MapPin
                      className="mt-0.5 size-3.5 shrink-0 md:size-4"
                      strokeWidth={1.75}
                    />
                    <span className="min-w-0">{SITE.address}</span>
                  </li>
                  <li>
                    <a
                      href={`tel:${SITE.phone}`}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 hover:text-hi-accent md:gap-2.5"
                    >
                      <Phone className="size-3.5 shrink-0 md:size-4" strokeWidth={1.75} />
                      {SITE.phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:mt-8">
                <p className="mb-3 text-sm font-medium text-white/55 md:mb-4">
                  Legal
                </p>
                <ul className="flex flex-col gap-2 text-[11px] leading-snug text-white/80 md:gap-2.5 md:text-sm md:leading-normal">
                  {LEGAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors duration-200 hover:text-hi-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p
          className="mt-8 border-t border-white/10 pt-5 text-sm text-white/70 md:mt-10"
          suppressHydrationWarning
        >
          © {year}. {SITE.legalName}. All Rights Reserved.
        </p>
      </Container>

      <div
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-[280px] w-[280px] opacity-25 sm:block md:h-[413px] md:w-[418px]"
        aria-hidden
      >
        <Image
          src="/icons/logo-icon.svg"
          alt=""
          fill
          className="object-contain object-right-bottom"
          sizes="418px"
        />
      </div>
    </footer>
  );
}
