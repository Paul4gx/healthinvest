"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { MOTION } from "@/lib/constants";
import { ABOUT_PAGE } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const COLLAGE = [
  {
    src: "/images/about/about-section-1.webp",
    alt: "A clinician with a patient",
    className: "col-span-2 aspect-[16/10]",
  },
  {
    src: "/images/about/about-section-2.webp",
    alt: "Hands-on clinical care",
    className: "aspect-[4/3]",
  },
  {
    src: "/images/about/about-section-3.webp",
    alt: "A specialist healthcare professional",
    className: "aspect-[4/3]",
  },
] as const;

export function AboutStoryPage() {
  return (
    <>
      <AboutHero />
      <IntroSection />
      <PhotoBand
        image="/images/about/redefining-africa.jpg"
        alt="A clinician speaking with a patient"
        title={ABOUT_PAGE.africa.title}
        body={ABOUT_PAGE.africa.body}
      />
      <TextColumns items={ABOUT_PAGE.africaColumns} />
      <PhotoBand
        image="/images/about/human_stories.webp"
        alt="Clinicians reviewing care together"
        title={ABOUT_PAGE.stories.title}
        body={ABOUT_PAGE.stories.body}
        stacked
      />
      <TextColumns items={ABOUT_PAGE.storyColumns} />
      <BrandBanner />
      <ValueColumns />
    </>
  );
}

function AboutHero() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="relative h-[min(72svh,640px)] min-h-[400px] w-full overflow-hidden bg-hi-navy-deep pt-[var(--header-height)] md:h-[min(calc(78svh+50px),870px)] md:min-h-[530px]">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: MOTION.ease }}
      >
        <Image
          src="/images/about/hero-about.webp"
          alt="Healthcare professionals serving communities across Africa"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
      <Container className="relative z-10 flex h-full items-end pb-10 md:items-center md:pb-0">
        <motion.h1
          className="font-display text-[clamp(2.25rem,10vw,5.375rem)] font-light leading-[1.02] tracking-[-0.03em] text-white"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: MOTION.ease }}
        >
          {ABOUT_PAGE.heroTitle}
        </motion.h1>
      </Container>
    </section>
  );
}

function IntroSection() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="bg-white py-8 md:py-12">
      <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <Stagger className="order-2 grid grid-cols-2 gap-3 md:gap-4 lg:order-1">
          {COLLAGE.map((photo, index) => (
            <StaggerItem key={photo.src} className={photo.className}>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                transition={{ duration: MOTION.base, ease: MOTION.ease }}
                className="relative h-full min-h-[100px] overflow-hidden rounded-[16px] sm:min-h-[140px] sm:rounded-[20px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={cn(
                    "object-cover transition duration-500",
                    index === 0 && "object-[center_30%]"
                  )}
                  sizes="(max-width:1024px) 90vw, 42vw"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="order-1 lg:order-2">
          <SectionLabel>{ABOUT_PAGE.introEyebrow}</SectionLabel>
          <h2 className="mt-5 whitespace-pre-line font-display text-[clamp(1.85rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-hi-primary md:mt-6">
            {ABOUT_PAGE.introTitle}
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-hi-black md:mt-6 md:gap-5 md:text-[20px] md:leading-[1.45]">
            {ABOUT_PAGE.introBody.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PhotoBand({
  image,
  alt,
  title,
  body,
  stacked = false,
}: {
  image: string;
  alt: string;
  title: string;
  body: string;
  stacked?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f5f6f8] text-white">
      <Container className="relative py-0">
        <div className="relative min-h-[380px] overflow-hidden md:min-h-[680px]">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="(max-width:1728px) 100vw, 1528px"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          {stacked ? (
            <div className="relative z-10 flex min-h-[380px] flex-col justify-end px-5 py-8 md:min-h-[680px] md:px-10 md:py-14 lg:px-12 lg:pb-16">
              <Reveal>
                <h2 className="max-w-[18ch] whitespace-pre-line font-display text-[clamp(1.75rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em]">
                  {title}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-white/90 md:mt-5 md:text-[18px]">
                  {body}
                </p>
              </Reveal>
            </div>
          ) : (
            <div className="relative z-10 grid min-h-[380px] content-end items-start md:min-h-[680px] md:grid-cols-2">
              <Reveal className="px-5 py-8 md:px-10 md:py-14 lg:px-12 lg:pb-16">
                <h2 className="font-display text-[clamp(1.75rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em]">
                  {title}
                </h2>
              </Reveal>
              <Reveal
                delay={0.08}
                className="px-5 pb-8 md:px-10 md:py-14 lg:px-12 lg:pb-16"
              >
                <p className="text-[15px] leading-relaxed text-white/90 md:text-[18px]">
                  {body}
                </p>
              </Reveal>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

const COLUMN_TONES = ["bg-[#f8f8f9]", "bg-[#f3f4f6]", "bg-[#eceef2]"] as const;

function splitTitle(title: string) {
  const [lead, ...rest] = title.trim().split(/\s+/);
  return { lead, rest: rest.join(" ") };
}

function TextColumns({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="bg-[#f5f6f8]">
      <Container>
        <Stagger className="grid overflow-hidden md:grid-cols-3 md:grid-rows-[auto_1fr]">
          {items.map((item, index) => {
            const { lead, rest } = splitTitle(item.title);

            return (
              <StaggerItem key={item.title} className="h-full md:contents">
                <motion.article
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ duration: MOTION.base, ease: MOTION.ease }}
                  className={cn(
                    "flex h-full min-h-0 flex-col gap-10 px-6 py-10 md:col-span-1 md:row-span-2 md:grid md:min-h-[420px] md:grid-rows-subgrid md:gap-16 md:px-10 md:py-16 lg:gap-20 lg:px-12 lg:py-[72px]",
                    COLUMN_TONES[index % COLUMN_TONES.length]
                  )}
                >
                  <h3 className="max-w-[14ch] font-display text-[clamp(1.45rem,3.5vw,2.35rem)] leading-[1.12] tracking-[-0.03em] text-black">
                    <span className="font-medium">{lead}</span>
                    {rest ? (
                      <>
                        {" "}
                        <span className="font-light text-black/45">{rest}</span>
                      </>
                    ) : null}
                  </h3>
                  <p className="max-w-[36ch] self-start text-[14px] leading-relaxed text-black md:text-[16px] md:leading-[1.55]">
                    {item.body}
                  </p>
                </motion.article>
              </StaggerItem>
            );
          })}
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
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[280px] items-center justify-center overflow-hidden text-white md:min-h-[520px]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale }}
      >
        <Image
          src="/images/about/we-invest-in-life.jpg"
          alt="A surgeon in an operating room"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
      <Reveal className="relative z-10 px-[var(--spacing-gutter)] text-center">
        <p className="font-display text-[clamp(1.85rem,7vw,5rem)] font-normal tracking-[-0.04em]">
          {ABOUT_PAGE.brandLine}
        </p>
      </Reveal>
    </section>
  );
}

function ValueColumns() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <Container>
        <div className="bg-[#f1f1f1] px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
          <Stagger className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:grid-rows-[auto_1fr] lg:gap-x-0 lg:gap-y-14">
            {ABOUT_PAGE.values.map((value, index) => (
              <StaggerItem key={value.title} className="h-full lg:contents">
                <motion.div
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: MOTION.base, ease: MOTION.ease }}
                  className={cn(
                    "relative flex h-full flex-col gap-8 lg:col-span-1 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-14 lg:px-8 xl:px-10",
                    index === 0 && "lg:pl-0",
                    index === ABOUT_PAGE.values.length - 1 && "lg:pr-0"
                  )}
                >
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 left-0 hidden h-[78%] w-px -translate-y-1/2 bg-hi-black/15 lg:block"
                    />
                  ) : null}
                  <h3 className="max-w-[12ch] font-display text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-black">
                    {value.title}
                  </h3>
                  <p className="self-start text-[14px] leading-relaxed text-black md:text-[16px] md:leading-[1.55]">
                    {value.body}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
