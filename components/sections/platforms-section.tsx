"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { PLATFORMS } from "@/content/site";
import type { PlatformCard } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const GAP = 24;
const AUTOPLAY_MS = 4800;
const SPRING = { type: "spring" as const, stiffness: 280, damping: 34, mass: 0.85 };

/** Triple the set so we can loop without a visible jump. */
const LOOP = [...PLATFORMS, ...PLATFORMS, ...PLATFORMS];
const LOOP_START = PLATFORMS.length;

function useSlidesPerView() {
  const [spv, setSpv] = useState(1);

  useEffect(() => {
    const sync = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setSpv(2.75);
      else if (window.matchMedia("(min-width: 768px)").matches) setSpv(2);
      else setSpv(1);
    };
    sync();
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    mqMd.addEventListener("change", sync);
    mqLg.addEventListener("change", sync);
    return () => {
      mqMd.removeEventListener("change", sync);
      mqLg.removeEventListener("change", sync);
    };
  }, []);

  return spv;
}

function PlatformSlide({
  platform,
  index,
}: {
  platform: PlatformCard;
  index: number;
}) {
  const ordinal = String((index % PLATFORMS.length) + 1).padStart(2, "0");

  return (
    <article
      className="group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[22px] border border-hi-black/[0.06] bg-white shadow-[0_1px_0_rgba(26,26,26,0.04)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_18px_40px_rgba(2,5,30,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-hi-navy-deep/10">
        <Image
          src={platform.image}
          alt=""
          fill
          loading="lazy"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width:768px) 90vw, (max-width:1024px) 45vw, 34vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hi-navy-deep/35 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 font-display text-[11px] font-medium tracking-[0.2em] text-white/90">
          {ordinal}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
        <h3 className="text-[clamp(1.25rem,2.2vw,1.65rem)] font-normal leading-snug tracking-[-0.02em] text-hi-ink">
          {platform.name}
        </h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-hi-black/75 md:text-[15px]">
          {platform.summary}
        </p>
        {platform.metric ? (
          <p className="mt-4 text-[13px] font-medium tracking-[-0.01em] text-hi-primary">
            {platform.metric}
          </p>
        ) : (
          <div className="mt-4 h-[1.25rem]" aria-hidden />
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hi-black/[0.06] pt-5">
          <Link
            href={platform.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-hi-primary transition-colors hover:text-hi-primary-hover"
          >
            Learn more
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          {platform.externalUrl ? (
            <a
              href={platform.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-hi-ink/70 transition-colors hover:text-hi-ink"
            >
              Visit site
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function PlatformsSection() {
  const reduce = usePrefersReducedMotion();
  const slidesPerView = useSlidesPerView();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [loopIndex, setLoopIndex] = useState(LOOP_START);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const loopIndexRef = useRef(LOOP_START);
  const skipSnapRef = useRef(false);
  const stepRef = useRef(0);
  const x = useMotionValue(0);

  const realIndex = ((loopIndex % PLATFORMS.length) + PLATFORMS.length) % PLATFORMS.length;

  const measure = useCallback(() => {
    const node = viewportRef.current;
    if (!node) return;
    const vw = node.clientWidth;
    const nextWidth = (vw - GAP * (slidesPerView - 1)) / slidesPerView;
    const step = nextWidth + GAP;
    stepRef.current = step;
    setSlideWidth(nextWidth);
    x.set(-loopIndexRef.current * step);
  }, [slidesPerView, x]);

  const snapTo = useCallback(
    (i: number, instant = false) => {
      const step = stepRef.current;
      if (!step) return;
      const target = -i * step;
      if (instant || reduce) {
        x.set(target);
        return;
      }
      animate(x, target, SPRING).then(() => {
        if (loopIndexRef.current !== i) return;
        if (i >= PLATFORMS.length * 2) {
          skipSnapRef.current = true;
          x.set(-LOOP_START * step);
          setLoopIndex(LOOP_START);
        } else if (i < PLATFORMS.length) {
          skipSnapRef.current = true;
          const reset = i + PLATFORMS.length;
          x.set(-reset * step);
          setLoopIndex(reset);
        }
      });
    },
    [reduce, x]
  );

  const go = useCallback((next: number) => {
    setLoopIndex(Math.max(0, Math.min(LOOP.length - 1, next)));
  }, []);

  const goReal = useCallback((real: number) => {
    const base = Math.floor(loopIndexRef.current / PLATFORMS.length) * PLATFORMS.length;
    let next = base + real;
    if (next === loopIndexRef.current) return;
    if (next < PLATFORMS.length) next += PLATFORMS.length;
    if (next >= PLATFORMS.length * 2) next -= PLATFORMS.length;
    setLoopIndex(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const node = viewportRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(node);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    loopIndexRef.current = loopIndex;
    if (skipSnapRef.current) {
      skipSnapRef.current = false;
      return;
    }
    snapTo(loopIndex);
  }, [loopIndex, snapTo]);

  useEffect(() => {
    if (reduce || paused || dragging) return;
    const id = window.setInterval(() => {
      go(loopIndexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, dragging, go]);

  const onDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    setDragging(false);
    const step = stepRef.current || 1;
    const projected = -x.get() / step - info.velocity.x / 800;
    const next = Math.round(projected);
    go(Math.max(0, Math.min(LOOP.length - 1, next)));
  };

  return (
    <section className="bg-hi-surface py-10 md:py-16">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <Reveal className="min-w-0 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
              Our healthcare platforms
            </p>
            <h2 className="mt-4 text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              Each platform combines specialist expertise with disciplined
              operations
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="flex shrink-0 items-center gap-2 self-start md:self-end">
            <button
              type="button"
              aria-label="Previous platform"
              onClick={() => go(loopIndexRef.current - 1)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-hi-black/10 bg-white text-hi-ink transition hover:border-hi-primary/30 hover:text-hi-primary"
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next platform"
              onClick={() => go(loopIndexRef.current + 1)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-hi-black/10 bg-white text-hi-ink transition hover:border-hi-primary/30 hover:text-hi-primary"
            >
              <ChevronRight className="size-5" strokeWidth={1.75} />
            </button>
          </Reveal>
        </div>
      </Container>

      <div
        ref={viewportRef}
        className="relative mt-10 cursor-grab overflow-hidden active:cursor-grabbing md:mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
        style={{
          paddingLeft: "var(--spacing-gutter)",
          touchAction: "pan-y",
        }}
      >
        <motion.div
          className="flex items-stretch"
          style={{ x, gap: GAP }}
          drag={reduce ? false : "x"}
          dragConstraints={{
            left: -Math.max(0, (LOOP.length - 1) * (slideWidth + GAP)),
            right: 0,
          }}
          dragElastic={0.12}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {LOOP.map((platform, i) => (
            <div
              key={`${platform.id}-${i}`}
              className="flex shrink-0 self-stretch"
              style={{ width: slideWidth || undefined }}
            >
              <PlatformSlide platform={platform} index={i} />
            </div>
          ))}
        </motion.div>
      </div>

      <Container className="mt-8 md:mt-10">
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Platform slides"
        >
          {PLATFORMS.map((platform, i) => {
            const current = i === realIndex;
            return (
              <button
                key={platform.id}
                type="button"
                role="tab"
                aria-selected={current}
                aria-label={`Show ${platform.name}`}
                onClick={() => goReal(i)}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={cn(
                    "block h-px overflow-hidden rounded-full bg-hi-black/15 transition-all duration-300 ease-out",
                    current ? "w-10" : "w-5 group-hover:bg-hi-black/30"
                  )}
                >
                  {current && !reduce ? (
                    <motion.span
                      key={`${realIndex}-${paused || dragging ? "p" : "r"}`}
                      className="block h-full w-full origin-left bg-hi-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={
                        paused || dragging
                          ? { duration: 0 }
                          : { duration: AUTOPLAY_MS / 1000, ease: "linear" }
                      }
                    />
                  ) : (
                    <span
                      className={cn(
                        "block h-full w-full bg-hi-primary",
                        current ? "opacity-100" : "opacity-0"
                      )}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
