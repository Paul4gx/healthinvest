"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE, MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function Preloader() {
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    if (reduce) {
      setPhase("gone");
      return;
    }

    document.body.style.overflow = "hidden";
    let done = false;
    const started = performance.now();
    const minMs = 1100;

    const hide = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, minMs - (performance.now() - started));
      window.setTimeout(() => {
        setPhase("out");
        window.setTimeout(() => {
          setPhase("gone");
          document.body.style.overflow = "";
        }, 550);
      }, wait);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    const fallback = window.setTimeout(hide, 2200);

    return () => {
      window.clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (phase === "gone") return null;

  return (
    <div
      data-preloader
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ease-out",
        "bg-white/40 backdrop-blur-2xl backdrop-saturate-150",
        phase === "out" && "pointer-events-none opacity-0"
      )}
      role="status"
      aria-live="polite"
      aria-hidden={phase !== "in"}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hi-ink/[0.06] via-transparent to-hi-accent/10"
        aria-hidden
      />

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION.medium, ease: MOTION.ease }}
        className="relative flex flex-col items-center gap-5"
      >
        <motion.div
          className="relative size-16 md:size-[72px]"
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/icons/logo-icon.svg"
            alt=""
            fill
            priority
            className="object-contain"
            sizes="72px"
          />
        </motion.div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-hi-ink/70">
          {SITE.brandLine}
        </p>
        <span className="sr-only">Loading {SITE.name}</span>
      </motion.div>
    </div>
  );
}
