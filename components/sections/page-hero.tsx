"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { HeroRise } from "@/components/ui/hero-rise";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

type PageHeroProps = {
  title: string;
  image: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

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

export function PageHero({
  title,
  image,
  alt,
  className,
  imageClassName,
}: PageHeroProps) {
  const { textY, textOpacity, dim } = useHeroParallax();
  const desktop = useIsDesktopHero();
  const frameRef = useRef<HTMLDivElement>(null);
  const lockedMobileHeightRef = useRef<number | null>(null);

  /** Freeze mobile height so browser chrome show/hide doesn't resize `dvh` mid-scroll. */
  const lockMobileHeroHeight = useCallback((force = false) => {
    const node = frameRef.current;
    if (!node) return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      lockedMobileHeightRef.current = null;
      node.style.removeProperty("height");
      node.style.removeProperty("min-height");
      node.style.removeProperty("max-height");
      return;
    }
    if (force || lockedMobileHeightRef.current == null) {
      const tablet = window.matchMedia("(min-width: 768px)").matches;
      lockedMobileHeightRef.current = tablet
        ? Math.min(Math.round(window.innerHeight * 0.72), 760)
        : Math.min(Math.round(window.innerHeight * 0.72), 680);
    }
    const h = lockedMobileHeightRef.current;
    node.style.height = `${h}px`;
    node.style.minHeight = `${h}px`;
    node.style.maxHeight = `${h}px`;
  }, []);

  useLayoutEffect(() => {
    lockMobileHeroHeight();
    const relock = () => {
      lockedMobileHeightRef.current = null;
      lockMobileHeroHeight(true);
    };
    window.addEventListener("orientationchange", relock);
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqTablet = window.matchMedia("(min-width: 768px)");
    mqDesktop.addEventListener("change", relock);
    mqTablet.addEventListener("change", relock);
    return () => {
      window.removeEventListener("orientationchange", relock);
      mqDesktop.removeEventListener("change", relock);
      mqTablet.removeEventListener("change", relock);
    };
  }, [lockMobileHeroHeight]);

  const parallaxStyle = desktop
    ? { y: textY, opacity: textOpacity }
    : undefined;

  return (
    <section
      className={cn(
        "sticky top-0 z-0 w-full bg-hi-navy-deep pt-[var(--header-height)]",
        className
      )}
    >
      <div
        ref={frameRef}
        className="relative flex h-[72svh] min-h-[72svh] w-full flex-col justify-end overflow-hidden md:block md:h-[70svh] md:min-h-[70svh] lg:h-[72svh] lg:min-h-[72svh] lg:max-h-none"
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className={cn(
            "object-cover object-[center_calc(50%-50px)]",
            imageClassName
          )}
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/45 to-transparent md:block" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-hi-navy-deep lg:block"
          style={{ opacity: desktop ? dim : 0 }}
        />
        <Container className="relative z-10 pb-10 pt-8 md:absolute md:inset-0 md:flex md:items-center md:pb-0 md:pt-0">
          <motion.div style={parallaxStyle}>
            <HeroRise delay={0.12}>
              <h1 className="max-w-[12ch] text-left text-[clamp(2.15rem,9vw,5.375rem)] font-light leading-[1.05] tracking-[-0.03em] text-white md:max-w-[14ch] md:text-[clamp(2.5rem,6vw,4.5rem)]">
                {title}
              </h1>
            </HeroRise>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
