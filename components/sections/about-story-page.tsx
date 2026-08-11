"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { PageHero } from "@/components/sections/page-hero";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { MOTION, SITE } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ABOUT,
  HOME_MODEL_STEPS,
  IMPACT,
  PILLARS,
} from "@/content/site";
import { cn } from "@/lib/utils";

const COLLAGE = [
  {
    src: "/images/home/strip-1.jpg",
    alt: "Clinician with a patient in a care setting",
    className: "col-span-2 aspect-[16/10]",
  },
  {
    src: "/images/home/strip-2.jpg",
    alt: "Hands-on clinical care",
    className: "aspect-[4/3]",
  },
  {
    src: "/images/home/strip-3.jpg",
    alt: "Specialist healthcare professional at work",
    className: "aspect-[4/3]",
  },
] as const;

const STORY_CARDS = [
  {
    title: IMPACT.sections[1].title,
    body: IMPACT.sections[1].body,
    image: "/images/gallery/ren-3.jpg",
    alt: "Patient receiving specialist care",
  },
  {
    title: IMPACT.sections[0].title,
    body: IMPACT.sections[0].body,
    image: "/images/gallery/onco-4.jpg",
    alt: "Clinicians collaborating on specialist treatment",
  },
  {
    title: IMPACT.sections[3].title,
    body: IMPACT.sections[3].body,
    image: "/images/operations/rencare.png",
    alt: "Specialist centre delivering care closer to home",
  },
] as const;

const PILLAR_IMAGES = [
  {
    image: "/images/about/partner.jpg",
    alt: "Care teams joining hands in partnership",
  },
  {
    image: "/images/about/technology-halcyon.png",
    alt: "Halcyon radiotherapy system supporting specialist cancer care",
  },
  {
    image: "/images/about/operational-excellence-vitalbeam.jpg",
    alt: "OncoClinics team delivering radiotherapy with a VitalBeam system",
  },
] as const;

export function AboutStoryPage() {
  return (
    <>
      <PageHero
        title="About Us"
        image="/images/gallery/hero-brand.png"
        alt="Health Invest Africa brand in the community"
      />

      <PageBody>
        <IntroSection />

        <StoryBand
          image="/images/home/what-we-do.jpg"
          alt="Healthcare professionals reviewing patient care together"
          title={ABOUT.purpose.title}
          body={ABOUT.purpose.body}
        />

        <CardGrid cards={STORY_CARDS} />

        <StoryBand
          image="/images/about/hero-team.png"
          alt="Healthcare professionals collaborating in a clinical facility"
          title={ABOUT.ambition.title}
          body={ABOUT.ambition.body}
          overlay="left"
        />

        <CardGrid
          cards={PILLARS.map((pillar, index) => ({
            title: pillar.title,
            body: pillar.body,
            image: PILLAR_IMAGES[index].image,
            alt: PILLAR_IMAGES[index].alt,
          }))}
        />

        <BrandBanner />

        <FeatureColumns />
      </PageBody>
    </>
  );
}

function IntroSection() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="bg-white py-10 md:py-16">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
        <Stagger className="grid grid-cols-2 gap-3 md:gap-4">
          {COLLAGE.map((photo, index) => (
            <StaggerItem key={photo.src} className={photo.className}>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 1.02 }}
                transition={{ duration: MOTION.base, ease: MOTION.ease }}
                className="relative h-full min-h-[140px] overflow-hidden rounded-[20px] md:rounded-[28px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={cn(
                    "object-cover transition duration-500",
                    index === 0 && "object-[center_30%]"
                  )}
                  sizes="(max-width:1024px) 90vw, 40vw"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2rem,4vw,3.35rem)] font-normal leading-[1.12] tracking-[-0.03em]">
            <span className="text-hi-ink">Building the systems</span>{" "}
            <span className="text-hi-black/50">
              that make specialty care possible
            </span>
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-hi-black/80 md:text-lg">
            <p>{ABOUT.intro}</p>
            <p>{ABOUT.platformNote.body}</p>
            <p>{ABOUT.why.body}</p>
          </div>
          <div className="mt-8">
            <CtaButton href="/our-model" variant="primary">
              Explore Our Model
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function StoryBand({
  image,
  alt,
  title,
  body,
  overlay = "bottom",
}: {
  image: string;
  alt: string;
  title: string;
  body: string;
  overlay?: "bottom" | "left";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[460px] overflow-hidden text-white md:min-h-[620px]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className={
            overlay === "left"
              ? "absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25 md:bg-gradient-to-r md:from-black/80 md:via-black/45 md:to-transparent"
              : "absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20"
          }
        />
      </motion.div>

      <Container className="relative z-10 flex min-h-[420px] flex-col justify-end py-8 md:min-h-[620px] md:py-16">
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(1.85rem,6vw,3.75rem)] font-light leading-[1.08] tracking-[-0.03em]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function CardGrid({
  cards,
}: {
  cards: readonly {
    title: string;
    body: string;
    image: string;
    alt: string;
  }[];
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="bg-white py-10 md:py-14">
      <Container>
        <Stagger className="grid gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                whileTap={reduce ? undefined : { y: -4, scale: 0.99 }}
                transition={{ duration: MOTION.base, ease: MOTION.ease }}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-hi-surface shadow-[0_1px_0_rgba(21,27,80,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(21,27,80,0.12)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="text-[1.35rem] font-normal leading-snug tracking-[-0.02em] text-hi-ink md:text-[1.5rem]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-hi-black/75 md:text-base">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function BrandBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[380px] items-center justify-center overflow-hidden text-white md:min-h-[520px]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale }}
      >
        <Image
          src="/images/gallery/onco-5.jpg"
          alt="Clinical team delivering specialist care"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>
      <Reveal className="relative z-10 px-[var(--spacing-gutter)] text-center">
        <p className="text-[clamp(2rem,8vw,5rem)] font-light tracking-[-0.04em]">
          {SITE.brandLine}
        </p>
      </Reveal>
    </section>
  );
}

function FeatureColumns() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {HOME_MODEL_STEPS.map((step, index) => (
            <StaggerItem
              key={step.number}
              className={cn(
                "lg:px-8",
                index > 0 && "lg:border-l lg:border-hi-black/10",
                index === 0 && "lg:pl-0",
                index === HOME_MODEL_STEPS.length - 1 && "lg:pr-0"
              )}
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce ? undefined : { y: -2, scale: 0.99 }}
                transition={{ duration: MOTION.base, ease: MOTION.ease }}
              >
                <p className="font-display text-sm font-medium text-hi-accent">
                  {step.number}
                </p>
                <h3 className="mt-3 text-xl tracking-[-0.02em] text-hi-ink md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-hi-black/75 md:text-base">
                  {step.body}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
