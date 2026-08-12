"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
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

function useIsDesktopHero() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return desktop;
}

export function HomeHero() {
  const { textY, textOpacity, dim } = useHeroParallax();
  const reduce = usePrefersReducedMotion();
  const desktop = useIsDesktopHero();
  const [loopIndex, setLoopIndex] = useState(LOOP_START);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const skipSnapRef = useRef(false);
  const loopIndexRef = useRef(loopIndex);
  const lockedMobileHeightRef = useRef<number | null>(null);
  const swipeRef = useRef<{ x: number; y: number; locked: "x" | "y" | null } | null>(
    null
  );
  const x = useMotionValue(0);
  const realIndex = realFromLoop(loopIndex);
  loopIndexRef.current = loopIndex;

  const measure = useCallback(() => {
    const next = viewportRef.current?.offsetWidth ?? 0;
    widthRef.current = next;
    setWidth(next);
  }, []);

  /** Freeze mobile hero px height so browser chrome show/hide doesn't resize `dvh`/`svh` mid-scroll. */
  const lockMobileHeroHeight = useCallback((force = false) => {
    const node = viewportRef.current;
    if (!node) return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      lockedMobileHeightRef.current = null;
      node.style.removeProperty("height");
      node.style.removeProperty("max-height");
      node.style.removeProperty("--mobile-hero-h");
      return;
    }
    if (force || lockedMobileHeightRef.current == null) {
      lockedMobileHeightRef.current = Math.min(
        Math.round(window.innerHeight * 0.66),
        616
      );
    }
    const h = lockedMobileHeightRef.current;
    node.style.setProperty("--mobile-hero-h", `${h}px`);
    node.style.height = `${h}px`;
    node.style.maxHeight = `${h}px`;
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
    lockMobileHeroHeight();
    x.set(-LOOP_START * (viewportRef.current?.offsetWidth ?? 0));
    const node = viewportRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      measure();
      const w = viewportRef.current?.offsetWidth ?? 0;
      x.set(-loopIndexRef.current * w);
    });
    ro.observe(node);

    const relock = () => {
      lockedMobileHeightRef.current = null;
      lockMobileHeroHeight(true);
      measure();
      x.set(-loopIndexRef.current * (viewportRef.current?.offsetWidth ?? 0));
    };
    window.addEventListener("orientationchange", relock);
    const mq = window.matchMedia("(min-width: 1024px)");
    mq.addEventListener("change", relock);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", relock);
      mq.removeEventListener("change", relock);
    };
  }, [lockMobileHeroHeight, measure, x]);

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

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    if (desktop || reduce) return;
    const t = event.touches[0];
    if (!t) return;
    swipeRef.current = { x: t.clientX, y: t.clientY, locked: null };
  }, [desktop, reduce]);

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    const start = swipeRef.current;
    const t = event.touches[0];
    if (!start || !t || start.locked) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Prefer vertical scroll; only lock to swipe after a clearer horizontal intent.
    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return;
    start.locked = Math.abs(dx) > Math.abs(dy) * 1.35 ? "x" : "y";
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const start = swipeRef.current;
      swipeRef.current = null;
      if (desktop || reduce) return;
      if (!start || start.locked !== "x") return;
      const t = event.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - start.x;
      if (Math.abs(dx) < 48) return;
      goLoop(dx < 0 ? loopIndex + 1 : loopIndex - 1);
    },
    [desktop, goLoop, loopIndex, reduce]
  );

  const slideW = Math.max(width, 1);
  const parallaxStyle = desktop
    ? { y: textY, opacity: textOpacity }
    : undefined;

  return (
    <section className="relative w-full bg-[#4C5393] pt-[var(--header-height)]">
      <div
        ref={viewportRef}
        className="relative h-[66svh] max-h-[616px] overflow-hidden lg:h-[var(--hero-height)] lg:max-h-none lg:min-h-[var(--hero-height)] lg:cursor-grab lg:active:cursor-grabbing"
        role="region"
        aria-roledescription="carousel"
        aria-label="Homepage hero"
        style={{ touchAction: desktop ? "pan-x" : "manipulation" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="flex h-full select-none"
          style={{ x, width: slideW * LOOP.length }}
          drag={reduce || !desktop ? false : "x"}
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
                <SplitSlide parallaxStyle={parallaxStyle} />
              ) : (
                <CinematicSlide parallaxStyle={parallaxStyle} />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] hidden bg-hi-navy-deep lg:block"
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
  parallaxStyle,
}: {
  parallaxStyle:
    | { y: ReturnType<typeof useHeroParallax>["textY"]; opacity: ReturnType<typeof useHeroParallax>["textOpacity"] }
    | undefined;
}) {
  return (
    <div className="relative flex h-full flex-col bg-[#4C5393] lg:block">
      {/* Short landscape crop on mobile so ~half the photo shows; desktop keeps the right-half split. */}
      <div className="relative aspect-[2/1] max-h-[47%] min-h-[10.5rem] shrink-0 overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-auto lg:max-h-none lg:min-h-0 lg:w-1/2">
        <Image
          src="/images/hero/home-family-consultation.webp"
          alt="A clinician consulting with a parent and child"
          fill
          priority
          unoptimized
          draggable={false}
          className="pointer-events-none scale-x-[-1] object-cover object-top lg:object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="relative z-[1] flex min-h-0 flex-1 items-center bg-[#4C5393] pb-14 pt-4 lg:absolute lg:inset-0 lg:z-auto lg:bg-transparent lg:pb-24 lg:pt-0">
        <Container>
          <motion.div
            className="flex w-full min-w-0 max-w-[34rem] flex-col gap-2.5 lg:gap-6"
            style={parallaxStyle}
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
              <h1 className="text-[clamp(1.35rem,5.6vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
                We bring{" "}
                <span className="lg:whitespace-nowrap">specialty care</span>{" "}
                <span className="block">to the underserved</span>
              </h1>
            </HeroRise>
            <HeroRise delay={0.28}>
              <p className="max-w-[640px] text-[13px] leading-relaxed text-white/90 lg:hidden">
                {HOME_HERO.bodyMobile}
              </p>
              <p className="hidden max-w-[640px] text-[13px] leading-relaxed text-white/90 lg:block lg:text-lg lg:leading-7">
                {HOME_HERO.body}
              </p>
            </HeroRise>
            <HeroRise delay={0.38}>
              <div
                className="pt-1"
                onPointerDown={(event) => event.stopPropagation()}
              >
                <CtaButton
                  href="/our-operations"
                  variant="secondary"
                  wrapperClassName="self-start"
                >
                  Explore Our Operations
                </CtaButton>
              </div>
            </HeroRise>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

function CinematicSlide({
  parallaxStyle,
}: {
  parallaxStyle:
    | { y: ReturnType<typeof useHeroParallax>["textY"]; opacity: ReturnType<typeof useHeroParallax>["textOpacity"] }
    | undefined;
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#47261b]/90 via-[#47261b]/55 to-[#47261b]/20 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#47261b]/80 via-[#47261b]/45 to-transparent lg:block" />
      <Container className="relative z-10 flex h-full flex-col justify-end pb-14 pt-6 lg:absolute lg:inset-0 lg:justify-center lg:pb-24 lg:pt-0">
        <motion.div
          className="flex w-full max-w-[820px] flex-col gap-3 lg:gap-6"
          style={parallaxStyle}
        >
          <HeroRise delay={0.08}>
            <SectionLabel tone="light">Our mission</SectionLabel>
          </HeroRise>
          <HeroRise delay={0.18}>
            <h1 className="text-[clamp(1.45rem,6vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
              Building{" "}
              <span className="whitespace-nowrap">Africa’s Specialist</span>{" "}
              <span className="lg:block">Healthcare Networks</span>
            </h1>
          </HeroRise>
          <HeroRise delay={0.28}>
            <p className="max-w-[640px] text-sm leading-relaxed text-white/90 lg:text-lg lg:leading-7">
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
                variant="secondary"
                wrapperClassName="self-start"
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
