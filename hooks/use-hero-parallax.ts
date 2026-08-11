"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Light scroll cue for sticky heroes — text only, no image zoom. */
export function useHeroParallax() {
  const reduce = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 140,
    damping: 32,
    mass: 0.28,
  });

  const textY = useTransform(smoothY, (y) =>
    reduce ? 0 : Math.min(y, 420) * -0.22
  );
  const textOpacity = useTransform(smoothY, (y) =>
    reduce ? 1 : Math.max(0.2, 1 - y / 480)
  );
  const dim = useTransform(smoothY, (y) =>
    reduce ? 0 : Math.min(0.32, y / 1200)
  );

  return { textY, textOpacity, dim };
}
