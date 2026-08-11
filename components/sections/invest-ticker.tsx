"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const INVEST_WORDS = [
  "life",
  "knowledge",
  "people",
  "technology",
  "care",
  "expertise",
  "innovation",
  "finance",
] as const;

const INTERVAL_MS = 2400;
const SPIN_MS = 0.75;
const FACE_DEPTH = 34;

export function InvestTicker({ className }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [ready, setReady] = useState(false);
  const [slotWidth, setSlotWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    const root = measureRef.current;
    if (!root) return;

    const measure = () => {
      const nodes = root.querySelectorAll<HTMLSpanElement>("[data-word]");
      const widest = Math.max(
        0,
        ...Array.from(nodes, (node) =>
          Math.ceil(node.getBoundingClientRect().width)
        )
      );
      setSlotWidth(widest);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || reduce) return;
    const id = window.setInterval(() => {
      setSpinning(true);
      setIndex((current) => (current + 1) % INVEST_WORDS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [ready, reduce]);

  const outgoingIndex =
    (index - 1 + INVEST_WORDS.length) % INVEST_WORDS.length;
  const outgoing = INVEST_WORDS[outgoingIndex];
  const incoming = INVEST_WORDS[index];
  const showCube = ready && spinning && !reduce;

  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <svg
          viewBox="0 0 800 800"
          className="size-[min(90vw,520px)] opacity-[0.12]"
          fill="none"
        >
          {[110, 180, 250, 320].map((r) => (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              stroke="currentColor"
              strokeWidth="1"
              className="text-white"
            />
          ))}
        </svg>
      </div>

      <span
        ref={measureRef}
        className="pointer-events-none absolute -left-[9999px] top-0 text-[clamp(1.25rem,5.5vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] whitespace-nowrap opacity-0"
        aria-hidden
      >
        {INVEST_WORDS.map((word) => (
          <span key={word} data-word className="inline-block">
            {word}
          </span>
        ))}
      </span>

      <p className="sr-only">We invest in {INVEST_WORDS.join(", ")}.</p>

      {/* Fixed centered row — stacks on narrow screens so it never overflows */}
      <div
        className="relative z-10 flex items-center justify-center text-[clamp(1.25rem,5.5vw,2.5rem)] font-semibold leading-none tracking-[-0.03em]"
        aria-hidden
      >
        <span className="inline-flex max-w-full flex-col items-center gap-y-2 sm:flex-row sm:items-center sm:gap-x-[0.35em] sm:gap-y-0">
          <span className="shrink-0 text-white/90">We invest in</span>

          <span
            className="relative inline-block h-[1.5em] shrink-0 overflow-visible text-left [perspective:1100px]"
            style={slotWidth ? { width: slotWidth } : undefined}
          >
            {!showCube ? (
              <span className="flex h-full items-center justify-start whitespace-nowrap text-white/90">
                {INVEST_WORDS[0]}
              </span>
            ) : (
              <motion.span
                key={index}
                className="relative block h-full w-full [transform-style:preserve-3d]"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -90 }}
                transition={{
                  duration: SPIN_MS,
                  ease: MOTION.ease,
                }}
              >
                {/* Front — leaving word (sentence white) */}
                <span
                  className="absolute inset-0 flex items-center justify-start whitespace-nowrap text-white/90 [backface-visibility:hidden]"
                  style={{ transform: `translateZ(${FACE_DEPTH}px)` }}
                >
                  {outgoing}
                </span>

                {/* Bottom — arriving word: blue while turning, white when aligned */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-start whitespace-nowrap [backface-visibility:hidden]"
                  style={{
                    transform: `rotateX(-90deg) translateZ(${FACE_DEPTH}px)`,
                  }}
                  initial={{ color: "var(--hi-accent-soft)" }}
                  animate={{ color: "rgba(255,255,255,0.9)" }}
                  transition={{
                    duration: SPIN_MS,
                    ease: MOTION.ease,
                  }}
                >
                  {incoming}
                </motion.span>

                {/* Top — faint blue keeps the cube accent mid-spin */}
                <span
                  className="absolute inset-0 flex items-center justify-start whitespace-nowrap text-hi-accent-soft/35 [backface-visibility:hidden]"
                  style={{
                    transform: `rotateX(90deg) translateZ(${FACE_DEPTH}px)`,
                  }}
                >
                  {outgoing}
                </span>
              </motion.span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
