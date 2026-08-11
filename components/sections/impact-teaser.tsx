"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

export function ImpactTeaser() {
  return (
    <section className="relative min-h-[560px] overflow-hidden text-white md:min-h-[720px]">
      <Image
        src="/images/home/our-mission.jpg"
        alt="Clinician delivering specialist care"
        fill
        className="object-cover object-[center_20%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-hi-navy-mid via-hi-navy-mid/75 to-hi-navy-mid/10"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[560px] flex-col justify-center py-10 md:min-h-[720px] md:py-16">
        <div className="max-w-[640px]">
          <Reveal>
            <h2 className="max-w-[14ch] text-[clamp(2.25rem,5vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.03em]">
              Infrastructure is only the beginning
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Our wider impact includes workforce development, patient-support
              initiatives, stronger operational data and the growth of local
              specialist capability.
            </p>
            <div className="mt-8">
              <CtaButton href="/impact" variant="secondary">
                Explore Our Impact
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute right-[var(--spacing-gutter)] top-1/2 hidden size-[96px] -translate-y-1/2 opacity-90 md:block lg:size-[115px]"
          aria-hidden
        >
          <Image
            src="/icons/logo-icon.svg"
            alt=""
            fill
            className="object-contain"
            sizes="115px"
          />
        </div>
      </Container>
    </section>
  );
}
