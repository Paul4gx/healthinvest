"use client";

import { useEffect, useState } from "react";
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

  const parallaxStyle = desktop
    ? { y: textY, opacity: textOpacity }
    : undefined;

  return (
    <section
      className={cn(
        "sticky top-0 z-0 w-full overflow-hidden bg-hi-navy-deep",
        className
      )}
    >
      <div className="relative h-[min(72svh,680px)] min-h-[360px] w-full md:h-[calc(70svh+50px)] md:min-h-[470px] lg:h-[calc(72svh+50px)] lg:min-h-[530px]">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className={cn("object-cover object-top", imageClassName)}
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/45 to-transparent md:block" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-hi-navy-deep lg:block"
          style={{ opacity: desktop ? dim : 0 }}
        />
        <Container className="relative z-10 flex h-full flex-col justify-end pb-10 pt-[var(--header-height)] md:absolute md:inset-0 md:justify-center md:pb-0 md:pt-0">
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
