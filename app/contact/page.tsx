import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SITE } from "@/lib/constants";
import { CONTACT_PATIENT_ROUTES } from "@/content/site";
import { SocialLinks } from "@/components/ui/social-links";
import {
  CancerIcon,
  HospitalIcon,
  RenalIcon,
} from "@/components/ui/specialty-icons";

const PLATFORM_ICONS = {
  cancer: CancerIcon,
  renal: RenalIcon,
  hospital: HospitalIcon,
} as const;

export const metadata: Metadata = {
  title: "Contact Health Invest Africa | Partnerships and Enquiries",
  description:
    "Contact Health Invest Africa for partnership, investment, media, career or corporate enquiries.",
};

const rows = [
  { icon: MapPin, label: SITE.address, href: undefined as string | undefined },
  { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone}` },
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        image="/images/contact/hero-brand.webp"
        alt="Health Invest Africa brand in the community"
      />

      <PageBody>
      <section className="bg-white py-10 md:py-14">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              Let’s build stronger healthcare systems together
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-hi-black/80">
              For partnership, investment, media, career or corporate enquiries, contact
              the Health Invest Africa team.
            </p>
          </Reveal>

          <div className="mt-14">
            <div className="grid lg:grid-cols-2 lg:items-stretch">
              <div className="relative flex h-full flex-col overflow-hidden text-white">
                <Image
                  src="/images/contact/hero.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-hi-navy-deep/80 backdrop-blur-2xl backdrop-saturate-150" />
                <div className="relative z-10 flex h-full flex-col border border-white/25 p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl text-white">Looking for care?</h3>
                <p className="mt-3 text-white/80">
                  For cancer-care enquiries, contact OncoClinics Africa. For dialysis and
                  renal-care enquiries, contact Rencare Africa. For specialist hospital
                  care — cancer, heart, kidney, surgery and diagnostics — contact POCCH.
                </p>
                <Stagger className="mt-6 grid flex-1 gap-4">
                  {CONTACT_PATIENT_ROUTES.map((route) => {
                    const Icon = PLATFORM_ICONS[route.id];
                    const external = route.href.startsWith("http");
                    const linkClassName =
                      "group flex h-full items-start gap-4 border border-white/20 p-5 transition-colors hover:bg-white/5";
                    const body = (
                      <>
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white bg-transparent text-white">
                          <Icon className="h-7 w-7" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-3">
                            <h4 className="text-lg font-normal text-white">{route.title}</h4>
                            <ArrowUpRight
                              className="size-5 shrink-0 text-hi-accent-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              strokeWidth={1.75}
                            />
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-white/80">
                            {route.body}
                          </span>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-hi-accent-soft">
                            {route.cta}
                            <ArrowUpRight className="size-3.5" strokeWidth={2} />
                          </span>
                        </span>
                      </>
                    );

                    return (
                      <StaggerItem key={route.id} className="h-full">
                        {external ? (
                          <a
                            href={route.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassName}
                          >
                            {body}
                          </a>
                        ) : (
                          <Link href={route.href} className={linkClassName}>
                            {body}
                          </Link>
                        )}
                      </StaggerItem>
                    );
                  })}
                </Stagger>
                </div>
              </div>

              <Suspense fallback={null}>
                <ContactForm className="h-full rounded-none shadow-none" />
              </Suspense>
            </div>

            <div className="mt-8 bg-hi-navy-deep px-6 py-8 text-white md:mt-10 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h3 className="text-xl font-normal tracking-[-0.02em] text-white md:text-2xl">
                    Contact Info
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {rows.map((row) => {
                      const Icon = row.icon;
                      const content = (
                        <>
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-hi-accent text-white">
                            <Icon className="size-5" strokeWidth={1.75} />
                          </span>
                          <span className="pt-2 text-sm leading-relaxed text-white md:text-base">
                            {row.label}
                          </span>
                        </>
                      );
                      return (
                        <li key={row.label}>
                          {row.href ? (
                            <a
                              href={row.href}
                              className="flex items-start gap-4 transition hover:text-hi-accent-soft"
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="flex items-start gap-4">{content}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-normal tracking-[-0.02em] text-white md:text-2xl">
                    Social
                  </h3>
                  <SocialLinks variant="contact" tone="light" className="mt-5" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-hi-surface">
        <div className="relative h-[320px] w-full md:h-[472px]">
          <iframe
            title="Health Invest Africa location map"
            className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=1608%20Adeola%20Hopewell%2C%20Victoria%20Island%2C%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>
      </PageBody>
    </>
  );
}
