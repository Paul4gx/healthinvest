"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeroRise } from "@/components/ui/hero-rise";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

type PageHeroProps = {
  title: string;
  image: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

export function PageHero({
  title,
  image,
  alt,
  className,
  imageClassName,
}: PageHeroProps) {
  const { textY, textOpacity, dim } = useHeroParallax();

  return (
    <section
      className={cn(
        "sticky top-0 z-0 w-full bg-hi-navy-deep pt-[var(--header-height)]",
        className
      )}
    >
      <div className="relative flex min-h-[var(--hero-height)] w-full flex-col justify-end overflow-hidden md:block md:h-[var(--hero-height)] md:min-h-0">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className={cn("object-cover object-center", imageClassName)}
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/45 to-transparent md:block" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-hi-navy-deep md:block"
          style={{ opacity: dim }}
        />
        <div className="relative z-10 px-[var(--spacing-gutter)] pb-10 pt-8 md:absolute md:inset-0 md:flex md:items-center md:pb-0 md:pt-0">
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <HeroRise delay={0.12}>
              <h1 className="max-w-[12ch] text-left text-[clamp(2.15rem,9vw,5.375rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                {title}
              </h1>
            </HeroRise>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
