"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Framer's useReducedMotion() is null on the server and boolean on the client.
 * Branching markup or inline styles on that value causes hydration mismatches.
 * Return false until after mount so SSR HTML always matches the first client render.
 */
export function usePrefersReducedMotion() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready && !!reduce;
}
