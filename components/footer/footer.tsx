import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { SITE } from "@/lib/constants";

const INFO_LINKS = [
  { href: "/about", label: "About" },
  { href: "/leadership", label: "Our Team" },
  { href: "/our-operations", label: "Our Operations" },
  { href: "/insights", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIAL_LINKS = [
  { href: SITE.instagram, label: "Instagram" },
  { href: SITE.linkedIn, label: "LinkedIn" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#02051e] text-white">
      <Container className="relative z-10 py-10 md:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="shrink-0">
            <Logo
              variant="light"
              className="[&_img]:brightness-0 [&_img]:invert"
            />
          </div>

          <div className="flex flex-1 flex-wrap gap-x-16 gap-y-10 text-[16px]">
            <div className="flex flex-col gap-6">
              <p className="font-medium text-[#818181]">Information</p>
              {INFO_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white transition-colors hover:text-hi-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-medium text-[#818181]">Social Media</p>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-hi-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-medium text-[#818181]">Contact</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-white transition-colors hover:text-hi-accent"
              >
                {SITE.email}
              </a>
              <p className="text-white">
                9 Ade Adedeji Close, Lekki Phase One, Lagos State.
              </p>
              <a
                href={`tel:${SITE.phone}`}
                className="text-white transition-colors hover:text-hi-accent"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        <p
          className="mt-10 border-t border-white/10 pt-6 text-[16px] text-white"
          suppressHydrationWarning
        >
          &copy; {year}. Health Invest. All Rights Reserved.
        </p>
      </Container>

      <div
        className="pointer-events-none absolute -right-8 bottom-0 hidden h-[413px] w-[418px] opacity-20 md:block"
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
