"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { HeroRise } from "@/components/ui/hero-rise";
import { SectionLabel } from "@/components/ui/section-label";
import { HOME_HERO } from "@/content/site";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

export function HomeHero() {
  const { textY, textOpacity, dim } = useHeroParallax();

  return (
    <section className="sticky top-0 z-0 w-full bg-hi-navy-deep pt-[var(--header-height)]">
      <div className="relative flex min-h-[var(--hero-height)] w-full flex-col justify-end overflow-hidden md:block md:h-[var(--hero-height)] md:min-h-0">
        <Image
          src="/images/hero/home-consultation.png"
          alt="Clinician consulting with a patient in a care setting"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Mobile: bottom scrim for readable white type; desktop: left fade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/45 to-transparent md:block" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-hi-navy-deep md:block"
          style={{ opacity: dim }}
        />
        <Container className="relative z-10 pb-10 pt-8 md:absolute md:inset-0 md:flex md:items-center md:pb-24 md:pt-0">
          <motion.div
            className="flex w-full max-w-[820px] flex-col gap-5 md:gap-6"
            style={{ y: textY, opacity: textOpacity }}
          >
            <HeroRise delay={0.08}>
              <SectionLabel tone="light">{HOME_HERO.eyebrow}</SectionLabel>
            </HeroRise>
            <HeroRise delay={0.18}>
              <h1 className="text-balance text-[clamp(2rem,7vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
                We bring specialty{" "}
                <span className="md:block">care to the underserved</span>
              </h1>
            </HeroRise>
            <HeroRise delay={0.28}>
              <p className="max-w-[640px] text-base leading-7 text-white/90 md:text-lg">
                {HOME_HERO.body}
              </p>
            </HeroRise>
            <HeroRise delay={0.38}>
              <div className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4">
                <CtaButton
                  href="/our-operations"
                  variant="secondary"
                  className="w-full max-w-full sm:w-auto"
                >
                  Explore Our Operations
                </CtaButton>
                <CtaButton
                  href="/contact?intent=partnership"
                  variant="ghost"
                  className="w-full max-w-full sm:w-auto"
                >
                  Partner With Us
                </CtaButton>
              </div>
            </HeroRise>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
