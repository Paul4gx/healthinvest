"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { GALLERY_IMAGES } from "@/content/site";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const PAGE_SIZE = 6;

const GALLERY_TABS = [
  ["oncoclinics", "OncoClinics"],
  ["rencare", "Rencare"],
  ["pocch", "POCCH"],
] as const;

type GalleryBrand = (typeof GALLERY_TABS)[number][0];

export default function GalleryPageClient() {
  const [brand, setBrand] = useState<GalleryBrand>("oncoclinics");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const reduce = usePrefersReducedMotion();

  const filtered = useMemo(
    () => GALLERY_IMAGES.filter((img) => img.brand === brand),
    [brand]
  );

  const shown = filtered.slice(0, visible);
  const canShowMore = visible < filtered.length;

  return (
    <>
      <PageHero
        title="Gallery"
        image="/images/gallery/hero-brand.webp"
        alt="Health Invest Africa brand in the community"
      />

      <PageBody>
      <section className="bg-white py-10 md:py-14">
        <Container>
          <Reveal>
            <p className="text-center text-[clamp(1.5rem,3vw,2.75rem)] font-normal tracking-[-0.02em] text-hi-ink">
              Stories of wellness, captured.
            </p>
          </Reveal>

          <div
            className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center rounded-pill bg-hi-accent-soft/40 p-1"
            role="tablist"
            aria-label="Gallery brand"
          >
            {GALLERY_TABS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={brand === value}
                onClick={() => {
                  setBrand(value);
                  setVisible(PAGE_SIZE);
                }}
                className={cn(
                  "rounded-pill px-6 py-2.5 text-sm font-medium transition-all duration-250 md:px-8",
                  brand === value
                    ? "bg-hi-primary text-white shadow-sm"
                    : "text-hi-ink hover:bg-white/60"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={brand}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: MOTION.medium, ease: MOTION.ease }}
              className="mt-10"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {shown.map((img, index) => (
                  <motion.div
                    key={img.src}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: reduce ? 0 : Math.min(index * 0.05, 0.3),
                      ease: MOTION.ease,
                    }}
                  >
                    <div className="group relative aspect-square overflow-hidden rounded-[20px]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-hi-navy-deep/0 transition group-hover:bg-hi-navy-deep/20" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {canShowMore ? (
            <div className="mt-10 flex justify-center">
              <CtaButton
                type="button"
                icon="down"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                Show more
              </CtaButton>
            </div>
          ) : null}
        </Container>
      </section>
      </PageBody>
    </>
  );
}
