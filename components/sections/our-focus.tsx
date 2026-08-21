"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { OUR_FOCUS } from "@/content/site";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const TONES = [
  "bg-[#4c5393]",
  "bg-[#2d3474]",
  "bg-[#171e5e]",
  "bg-[#1a1a1a]",
] as const;

const ICONS = [
  "/icons/focus/nephrology.svg", // cancer mark (exported under this filename)
  "/icons/focus/oncology.svg",
  "/icons/focus/cardiology.svg",
  "/icons/focus/diagnostics.svg",
] as const;

export function OurFocus() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const reduce = usePrefersReducedMotion();

  return (
    <section className="overflow-hidden bg-[#171e5e] py-14 md:py-16">
      <Container>
        <Reveal>
          <SectionLabel tone="light">{OUR_FOCUS.eyebrow}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-[1266px] font-display text-[clamp(1.55rem,3.8vw,3.25rem)] font-normal leading-[1.15] tracking-[-0.02em] text-white">
            {OUR_FOCUS.intro}
          </p>
        </Reveal>

        <div
          className="relative mt-10 md:mt-14"
          onMouseLeave={() => setExpanded(null)}
        >
          {OUR_FOCUS.areas.map((area, i) => {
            const isOpen = expanded === i;
            const isLast = i === OUR_FOCUS.areas.length - 1;

            return (
              <motion.button
                key={area.number}
                type="button"
                aria-expanded={isOpen}
                onMouseEnter={() => setExpanded(i)}
                onFocus={() => setExpanded(i)}
                onClick={() => {
                  if (window.matchMedia("(hover: hover)").matches) return;
                  setExpanded((current) => (current === i ? null : i));
                }}
                className={cn(
                  "relative grid w-full grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-3 overflow-hidden rounded-t-[20px] px-4 py-5 text-left text-white sm:gap-x-4 sm:rounded-t-[24px] sm:px-6 sm:py-7 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-x-8 md:rounded-t-[30px] md:px-10 md:py-9",
                  isLast
                    ? "rounded-b-[20px] sm:rounded-b-[24px] md:rounded-b-[30px]"
                    : "rounded-b-none",
                  TONES[i % TONES.length],
                  i > 0 && "-mt-2 sm:-mt-3 md:-mt-5"
                )}
                style={{ zIndex: i + 1 }}
                whileHover={reduce ? undefined : { y: isOpen ? 0 : -1 }}
                transition={{ duration: MOTION.base, ease: MOTION.ease }}
              >
                <span className="pt-1 text-[14px] tracking-[-0.02em] text-white/85 sm:pt-1.5 sm:text-[16px] md:pt-2 md:text-[20px]">
                  {area.number}
                </span>

                <div className="ml-0 grid w-full max-w-none grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-3 sm:ml-auto sm:max-w-[34rem] sm:grid-cols-[2.75rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-x-5">
                  <span className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center sm:size-8 md:mt-1 md:size-10">
                    <img
                      src={ICONS[i]}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>

                  <div className="min-w-0">
                    <span className="block font-display text-[clamp(1.35rem,4vw,2.45rem)] font-normal leading-none tracking-[-0.03em]">
                      {area.title}
                    </span>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.32, ease: MOTION.ease }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-[14px] leading-relaxed text-white/85 sm:pt-4 md:pt-5 md:text-[20px]">
                        {area.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
