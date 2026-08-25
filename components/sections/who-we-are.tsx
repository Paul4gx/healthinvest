"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { WHO_WE_ARE } from "@/content/site";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const PHOTOS = [
  {
    src: "/images/home/slider-1.webp",
    alt: "A clinician holding a tablet",
  },
  {
    src: "/images/home/slider-2.webp",
    alt: "A doctor reviewing results with a patient",
  },
  {
    src: "/images/home/slider-3.webp",
    alt: "A clinician with a patient in a care setting",
  },
  {
    src: "/images/home/slider-4.webp",
    alt: "Hands-on clinical care",
  },
  {
    src: "/images/home/slider-5.webp",
    alt: "A specialist healthcare professional at work",
  },
  {
    src: "/images/home/slider-6.webp",
    alt: "Clinicians reviewing care together",
  },
] as const;

const SPEED_PX_PER_SEC = 40;

export function WhoWeAre() {
  const reduce = usePrefersReducedMotion();
  const trackNodeRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const draggingRef = useRef(false);
  const inertiaRef = useRef<ReturnType<typeof animate> | null>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const x = useMotionValue(0);
  const loop = [...PHOTOS, ...PHOTOS];

  const wrapX = useCallback(
    (value: number) => {
      if (loopWidth <= 0) return value;
      let next = value;
      while (next <= -loopWidth) next += loopWidth;
      while (next > 0) next -= loopWidth;
      return next;
    },
    [loopWidth]
  );

  const measure = useCallback(() => {
    const node = trackNodeRef.current;
    if (!node) return;
    const next = Math.round(node.scrollWidth / 2);
    if (next > 0) setLoopWidth(next);
  }, []);

  const setTrackRef = useCallback(
    (node: HTMLDivElement | null) => {
      resizeObserverRef.current?.disconnect();
      trackNodeRef.current = node;
      if (!node) return;

      measure();
      const ro = new ResizeObserver(() => measure());
      ro.observe(node);
      resizeObserverRef.current = ro;

      node.querySelectorAll("img").forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", measure, { once: true });
        }
      });
    },
    [measure]
  );

  useEffect(() => {
    return () => resizeObserverRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const release = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("touchend", release);
    window.addEventListener("touchcancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
    };
  }, []);

  useEffect(() => {
    if (reduce || loopWidth <= 0) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;

      if (!draggingRef.current) {
        x.set(wrapX(x.get() - SPEED_PX_PER_SEC * dt));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loopWidth, reduce, wrapX, x]);

  const onDragStart = () => {
    inertiaRef.current?.stop();
    draggingRef.current = true;
  };

  const onDrag = () => {
    x.set(wrapX(x.get()));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    x.set(wrapX(x.get()));

    if (reduce || loopWidth <= 0) {
      draggingRef.current = false;
      return;
    }

    inertiaRef.current = animate(x, x.get() + info.velocity.x * 0.2, {
      type: "inertia",
      velocity: info.velocity.x,
      power: 0.5,
      timeConstant: 300,
      restDelta: 0.5,
      onUpdate: (latest) => {
        const wrapped = wrapX(latest);
        if (wrapped !== latest) x.set(wrapped);
      },
      onComplete: () => {
        x.set(wrapX(x.get()));
        draggingRef.current = false;
      },
    });
  };

  return (
    <section className="overflow-hidden bg-white py-10 md:py-16">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Reveal>
              <SectionLabel>{WHO_WE_ARE.eyebrow}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 whitespace-pre-line font-display text-[clamp(2.35rem,5.2vw,4.375rem)] font-normal leading-[1.05] tracking-[-0.02em] text-hi-primary">
                {WHO_WE_ARE.title}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5 text-[16px] leading-[1.55] text-hi-black lg:pt-1 md:text-[20px] md:leading-[1.45]">
              {WHO_WE_ARE.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-10 md:mt-14">
        <div className="cursor-grab overflow-hidden pl-[var(--spacing-gutter)] active:cursor-grabbing">
          <motion.div
            ref={setTrackRef}
            className="flex w-max gap-4 sm:gap-6"
            style={{ x }}
            drag={reduce ? false : "x"}
            dragDirectionLock
            dragElastic={0.02}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          >
            {loop.map((photo, i) => (
              <div
                key={`${photo.src}-${i}`}
                className={cn(
                  "relative h-[min(58vw,420px)] w-[min(72vw,493px)] shrink-0 overflow-hidden rounded-[16px] select-none sm:h-[min(52vw,552px)] sm:w-[min(46vw,493px)] sm:rounded-[20px]"
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  loading="lazy"
                  className="pointer-events-none object-cover"
                  sizes="(max-width:768px) 72vw, 493px"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/10" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
