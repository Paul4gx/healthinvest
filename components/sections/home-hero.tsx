"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { HOME_HERO } from "@/content/site";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HomeHero() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="relative h-[min(100svh,1000px)] min-h-[480px] w-full overflow-hidden bg-hi-primary pt-[var(--header-height)] md:min-h-[560px]">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: MOTION.ease }}
      >
        <Image
          src="/images/home/figma-hero.jpg"
          alt="A clinician consulting with a patient"
          fill
          priority
          className="object-cover object-[70%_center] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <Container className="relative z-10 flex h-full flex-col justify-center py-10 md:py-0">
        <div className="flex max-w-[810px] flex-col gap-5 md:gap-6">
          <motion.h1
            className="font-display text-[clamp(1.85rem,7vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-white"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: MOTION.ease }}
          >
            {HOME_HERO.title}
          </motion.h1>

          <motion.p
            className="max-w-[621px] text-[15px] leading-relaxed text-white md:text-[16px] md:leading-[24px]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: MOTION.ease }}
          >
            {HOME_HERO.subtitle}
          </motion.p>

          <motion.div
            className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-[19px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: MOTION.ease }}
          >
            <CtaButton
              href="/about"
              variant="secondary"
              className="w-full sm:w-auto"
              wrapperClassName="w-full sm:w-auto"
            >
              Learn more
            </CtaButton>
            <CtaButton
              variant="ghost"
              icon="play"
              className="w-full sm:w-auto"
              wrapperClassName="w-full sm:w-auto"
            >
              Watch video
            </CtaButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
