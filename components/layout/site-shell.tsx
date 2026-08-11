"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/navigation/header";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function SiteShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <Header variant="solid" />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          id="main-content"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{
            duration: reduce ? 0 : MOTION.medium,
            ease: MOTION.ease,
          }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {footer}
    </>
  );
}
