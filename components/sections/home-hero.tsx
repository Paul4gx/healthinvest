"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { HeroRise } from "@/components/ui/hero-rise";
import { SectionLabel } from "@/components/ui/section-label";
import { HOME_HERO, HOME_MISSION } from "@/content/site";
import { useHeroParallax } from "@/hooks/use-hero-parallax";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5000;
const SLIDES = [
  { id: "01", label: "Network" },
  { id: "02", label: "Mission" },
] as const;

/** [clone 02] [01] [02] [clone 01] so drag/autoplay can loop without reversing */
const LOOP = [1, 0, 1, 0] as const;
const LOOP_START = 1;

const SPRING = { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.7 };

function realFromLoop(loopIndex: number) {
  return LOOP[loopIndex] ?? 0;
}

export function HomeHero() {
  const { textY, textOpacity, dim } = useHeroParallax();
  const reduce = usePrefersReducedMotion();
  const [loopIndex, setLoopIndex] = useState(LOOP_START);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const skipSnapRef = useRef(false);
  const loopIndexRef = useRef(loopIndex);
  const x = useMotionValue(0);
  const realIndex = realFromLoop(loopIndex);
  loopIndexRef.current = loopIndex;

  const measure = useCallback(() => {
    const next = viewportRef.current?.offsetWidth ?? 0;
    widthRef.current = next;
    setWidth(next);
  }, []);

  const snapTo = useCallback(
    (i: number, instant = false) => {
      const w = widthRef.current;
      if (!w) return;
      const target = -i * w;
      if (instant || reduce) {
        x.set(target);
        return;
      }
      animate(x, target, SPRING).then(() => {
        if (loopIndexRef.current !== i) return;
        if (i === LOOP.length - 1) {
          skipSnapRef.current = true;
          x.set(-LOOP_START * w);
          setLoopIndex(LOOP_START);
        } else if (i === 0) {
          skipSnapRef.current = true;
          x.set(-2 * w);
          setLoopIndex(2);
        }
      });
    },
    [reduce, x]
  );

  const goLoop = useCallback((next: number) => {
    setLoopIndex(Math.max(0, Math.min(LOOP.length - 1, next)));
  }, []);

  const goReal = useCallback((real: number) => {
    setLoopIndex(real === 0 ? 1 : 2);
  }, []);

  useLayoutEffect(() => {
    measure();
    x.set(-LOOP_START * (viewportRef.current?.offsetWidth ?? 0));
    const node = viewportRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      measure();
      const w = viewportRef.current?.offsetWidth ?? 0;
      x.set(-loopIndexRef.current * w);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [measure, x]);

  useEffect(() => {
    if (skipSnapRef.current) {
      skipSnapRef.current = false;
      return;
    }
    snapTo(loopIndex);
  }, [loopIndex, snapTo]);

  useEffect(() => {
    if (reduce || dragging || hidden) return;
    const timer = window.setTimeout(() => goLoop(loopIndex + 1), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [loopIndex, dragging, hidden, reduce, goLoop]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setDragging(false);
      const w = widthRef.current || 1;
      const shouldFlip =
        Math.abs(info.offset.x) > w * 0.1 || Math.abs(info.velocity.x) > 380;
      if (shouldFlip) {
        goLoop(info.offset.x < 0 || info.velocity.x < 0 ? loopIndex + 1 : loopIndex - 1);
      } else {
        snapTo(loopIndex);
      }
    },
    [goLoop, loopIndex, snapTo]
  );

  const slideW = Math.max(width, 1);

  return (
    <section className="relative w-full bg-[#4C5393] pt-[var(--header-height)]">
      <div
        ref={viewportRef}
        className="relative h-[65dvh] min-h-[65dvh] cursor-grab overflow-hidden active:cursor-grabbing md:h-[var(--hero-height)] md:min-h-[var(--hero-height)]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Homepage hero"
        style={{ touchAction: "pan-x" }}
      >
        <motion.div
          className="flex h-full select-none"
          style={{ x, width: slideW * LOOP.length }}
          drag={reduce ? false : "x"}
          dragElastic={0.18}
          dragMomentum={false}
          dragConstraints={{
            left: -slideW * (LOOP.length - 1),
            right: 0,
          }}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {LOOP.map((real, i) => (
            <div
              key={`loop-${i}`}
              className="h-full shrink-0"
              style={{ width: slideW }}
              aria-hidden={real !== realIndex}
            >
              {real === 0 ? (
                <SplitSlide
                  active={realIndex === 0 && i === loopIndex}
                  textY={textY}
                  textOpacity={textOpacity}
                />
              ) : (
                <CinematicSlide textY={textY} textOpacity={textOpacity} />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] hidden bg-hi-navy-deep md:block"
          style={{ opacity: dim }}
        />

        <HeroPager
          index={realIndex}
          paused={dragging || hidden || reduce}
          onSelect={goReal}
        />
      </div>
    </section>
  );
}

function SplitSlide({
  active,
  textY,
  textOpacity,
}: {
  active: boolean;
  textY: ReturnType<typeof useHeroParallax>["textY"];
  textOpacity: ReturnType<typeof useHeroParallax>["textOpacity"];
}) {
  return (
    <div className="relative h-full bg-[#4C5393]">
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero/home-family-consultation.webp"
          alt="A clinician consulting with a parent and child"
          fill
          priority
          unoptimized
          draggable={false}
          className="pointer-events-none scale-x-[-1] object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4C5393] via-[#4C5393]/80 to-[#4C5393]/35" />
      </div>

      <div className="absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden md:block">
        <Image
          src="/images/hero/home-family-consultation.webp"
          alt=""
          fill
          priority
          unoptimized
          draggable={false}
          className="pointer-events-none scale-x-[-1] object-cover object-center"
          sizes="50vw"
        />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-[4.5rem] pt-6 md:absolute md:inset-0 md:justify-center md:pb-24 md:pt-0">
          <motion.div
            className="flex w-full max-w-[34rem] flex-col gap-3 md:gap-6"
            style={{ y: textY, opacity: textOpacity }}
          >
            <HeroRise delay={0.08}>
              <SectionLabel
                tone="light"
                className="items-start [&>span:last-child]:max-w-none [&>span:last-child]:leading-snug"
              >
                Specialist healthcare
                <br />
                investment and operations in Africa
              </SectionLabel>
            </HeroRise>
            <HeroRise delay={0.18}>
              <h1 className="text-[clamp(1.55rem,6.4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
                We bring{" "}
                <span className="whitespace-nowrap">specialty care</span>{" "}
                <span className="block">to the underserved</span>
              </h1>
            </HeroRise>
            <HeroRise delay={0.28}>
              <p className="line-clamp-3 max-w-[640px] text-sm leading-relaxed text-white/90 md:line-clamp-none md:text-lg md:leading-7">
                {HOME_HERO.body}
              </p>
            </HeroRise>
            <HeroRise delay={0.38}>
              <div
                className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
                onPointerDown={(event) => event.stopPropagation()}
              >
                <CtaButton
                  href="/our-operations"
                  variant="primary"
                  className="w-full max-w-full ring-1 ring-white/35 sm:w-auto"
                >
                  Explore Our Operations
                </CtaButton>
                <Link
                  href="/our-model"
                  tabIndex={active ? 0 : -1}
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-white sm:text-[14px]"
                >
                  <span className="border-b border-white/40 pb-0.5 transition-colors duration-300 group-hover:border-white">
                    Our model
                  </span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </HeroRise>
          </motion.div>
      </Container>
    </div>
  );
}

function CinematicSlide({
  textY,
  textOpacity,
}: {
  textY: ReturnType<typeof useHeroParallax>["textY"];
  textOpacity: ReturnType<typeof useHeroParallax>["textOpacity"];
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/hero/home-consultation.webp"
        alt="Clinician consulting with a patient in a care setting"
        fill
        priority
        unoptimized
        draggable={false}
        className="pointer-events-none object-cover object-center"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#47261b]/90 via-[#47261b]/55 to-[#47261b]/20 md:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#47261b]/80 via-[#47261b]/45 to-transparent md:block" />
      <Container className="relative z-10 flex h-full flex-col justify-end pb-[4.5rem] pt-6 md:absolute md:inset-0 md:justify-center md:pb-24 md:pt-0">
        <motion.div
          className="flex w-full max-w-[820px] flex-col gap-3 md:gap-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          <HeroRise delay={0.08}>
            <SectionLabel tone="light">Our mission</SectionLabel>
          </HeroRise>
          <HeroRise delay={0.18}>
            <h1 className="text-[clamp(1.55rem,6.4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
              Building{" "}
              <span className="whitespace-nowrap">Africa’s Specialist</span>{" "}
              <span className="md:block">Healthcare Networks</span>
            </h1>
          </HeroRise>
          <HeroRise delay={0.28}>
            <p className="line-clamp-3 max-w-[640px] text-sm leading-relaxed text-white/90 md:line-clamp-none md:text-lg md:leading-7">
              {HOME_MISSION.body}
            </p>
          </HeroRise>
          <HeroRise delay={0.38}>
            <div
              className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <CtaButton
                href="/our-operations"
                variant="primary"
                className="w-full max-w-full sm:w-auto"
              >
                Explore Our Operations
              </CtaButton>
            </div>
          </HeroRise>
        </motion.div>
      </Container>
    </div>
  );
}

function HeroPager({
  index,
  paused,
  onSelect,
}: {
  index: number;
  paused: boolean;
  onSelect: (next: number) => void;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-4 z-[4] md:bottom-8"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <Container className="pointer-events-auto flex items-end gap-4 md:gap-5">
      {SLIDES.map((slide, i) => {
        const current = i === index;
        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show slide ${slide.id}, ${slide.label}`}
            aria-current={current ? "true" : undefined}
            className="group flex min-w-[4.5rem] flex-col gap-2 text-left"
          >
            <span
              className={cn(
                "text-[11px] font-medium tracking-[0.18em] transition-colors duration-300",
                current ? "text-white" : "text-white/45 group-hover:text-white/75"
              )}
            >
              {slide.id}
            </span>
            <span className="relative h-px w-full overflow-hidden bg-white/25">
              <span
                key={`${index}-${current ? "on" : "off"}`}
                className={cn(
                  "absolute inset-y-0 left-0 origin-left bg-white",
                  current ? "w-full" : "w-0"
                )}
                style={
                  current
                    ? {
                        animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }
                    : undefined
                }
              />
            </span>
          </button>
        );
      })}
      </Container>
    </div>
  );
}
