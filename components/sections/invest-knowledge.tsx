"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const WORDS = [
  "knowledge",
  "people",
  "technology",
  "care",
  "expertise",
  "innovation",
  "finance",
  "life",
] as const;

const COPIES = 3;
const LOOP = Array.from({ length: COPIES }, () => [...WORDS]).flat();
const START = WORDS.length;
const WRAP_AT = WORDS.length * 2;
const INTERVAL_MS = 2600;
const SPIN_MS = 0.78;

export function InvestKnowledge() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState<number>(START);
  const [slotWidth, setSlotWidth] = useState(0);
  const [rowH, setRowH] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const instantRef = useRef(true);
  const prevIndexRef = useRef(index);
  const y = useMotionValue(0);

  useLayoutEffect(() => {
    const root = measureRef.current;
    if (!root) return;
    const measure = () => {
      const nodes = root.querySelectorAll<HTMLSpanElement>("[data-word]");
      const widest = Math.max(
        0,
        ...Array.from(nodes, (n) => Math.ceil(n.getBoundingClientRect().width))
      );
      const glyph = nodes[0]?.getBoundingClientRect().height ?? 0;
      setSlotWidth(widest);
      setRowH(Math.ceil(glyph * 1.62));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!rowH) return;
    const target = -index * rowH - rowH / 2;
    const indexChanged = prevIndexRef.current !== index;
    prevIndexRef.current = index;
    if (instantRef.current || !indexChanged) {
      y.set(target);
      instantRef.current = false;
      return;
    }
    const controls = animate(y, target, {
      duration: SPIN_MS,
      ease: MOTION.ease,
    });
    return () => controls.stop();
  }, [index, rowH, y]);

  useEffect(() => {
    if (!rowH || reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [rowH, reduce]);

  useEffect(() => {
    if (index !== WRAP_AT || !rowH) return;
    const t = window.setTimeout(() => {
      instantRef.current = true;
      setIndex(START);
    }, SPIN_MS * 1000 + 40);
    return () => window.clearTimeout(t);
  }, [index, rowH]);

  return (
    <section className="relative flex h-[min(72svh,480px)] items-center justify-center overflow-hidden bg-[#02051e] sm:h-[560px] md:h-[820px]">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="absolute aspect-square h-[144%] rounded-full border border-white/[0.12]" />
        <div className="absolute aspect-square h-full rounded-full border border-white/[0.12]" />
      </div>

      <span
        ref={measureRef}
        className="pointer-events-none absolute -left-[9999px] top-0 font-display text-[clamp(1.45rem,5.5vw,3.25rem)] font-normal leading-none whitespace-nowrap opacity-0"
        aria-hidden
      >
        {WORDS.map((w) => (
          <span key={w} data-word className="inline-block">
            {w}
          </span>
        ))}
      </span>

      <p className="sr-only">We invest in {WORDS.join(", ")}.</p>

      <div
        className="relative z-10 flex max-w-full items-center justify-center px-[var(--spacing-gutter)] font-display text-[clamp(1.45rem,5.5vw,3.25rem)] font-normal leading-none tracking-[-0.02em]"
        aria-hidden
      >
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-[0.32em] gap-y-1">
          <span className="relative z-10 shrink-0 text-white">We invest in</span>
          <div
            className="relative h-[1.05em] shrink-0"
            style={slotWidth ? { width: slotWidth } : undefined}
          >
            {rowH === 0 ? (
              <span className="flex h-full items-center whitespace-nowrap text-white">
                {WORDS[0]}
              </span>
            ) : (
              <div
                className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden"
                style={{ height: rowH * 5 }}
              >
                <motion.div
                  className="absolute top-1/2 left-0 will-change-transform"
                  style={{ y }}
                >
                  {LOOP.map((word, i) => (
                    <TickerWord
                      key={`${word}-${i}`}
                      word={word}
                      i={i}
                      y={y}
                      rowH={rowH}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerWord({
  word,
  i,
  y,
  rowH,
}: {
  word: string;
  i: number;
  y: MotionValue<number>;
  rowH: number;
}) {
  const color = useTransform(y, (latest) => {
    if (!rowH) return "rgb(255,255,255)";
    const dist = Math.abs(i * rowH + rowH / 2 + latest) / rowH;
    if (dist < 0.35) return "rgb(255,255,255)";
    if (dist < 1.35) return "rgba(154, 172, 224, 0.48)";
    if (dist < 2.35) return "rgba(154, 172, 224, 0.16)";
    return "rgba(154, 172, 224, 0)";
  });

  return (
    <div
      className="flex items-center"
      style={{ height: rowH || undefined }}
    >
      <motion.span className="whitespace-nowrap" style={{ color }}>
        {word}
      </motion.span>
    </div>
  );
}
