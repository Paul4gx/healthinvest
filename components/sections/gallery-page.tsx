"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { Reveal } from "@/components/ui/reveal";
import { GALLERY_EVENTS } from "@/content/site";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { GalleryBrand, GalleryEvent, GalleryEventImage } from "@/types";

const GALLERY_TABS = [
  ["oncoclinics", "OncoClinics"],
  ["rencare", "Rencare"],
  ["pocch", "POCCH"],
] as const satisfies readonly (readonly [GalleryBrand, string])[];

function eventsForBrand(brand: GalleryBrand) {
  return GALLERY_EVENTS.filter(
    (event) => event.brand === brand && event.images.length > 0
  ).sort((a, b) => Number(b.year) - Number(a.year));
}

function BentoCell({
  image,
  className,
  priority = false,
}: {
  image: GalleryEventImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative min-h-[140px] overflow-hidden rounded-[16px] bg-hi-surface sm:min-h-[160px] sm:rounded-[20px]",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width:768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-hi-navy-deep/0 transition group-hover:bg-hi-navy-deep/15" />
    </div>
  );
}

function EventBentoGrid({
  images,
  priorityFirst = false,
}: {
  images: GalleryEventImage[];
  priorityFirst?: boolean;
}) {
  if (images.length === 6) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-[minmax(160px,1fr)_minmax(160px,1fr)_minmax(120px,0.75fr)]">
        <BentoCell
          image={images[0]}
          priority={priorityFirst}
          className="col-span-2 row-span-2 min-h-[220px] md:min-h-[340px]"
        />
        <BentoCell image={images[1]} className="min-h-[120px]" />
        <BentoCell image={images[2]} className="min-h-[120px]" />
        <BentoCell image={images[3]} className="min-h-[120px]" />
        <BentoCell image={images[4]} className="min-h-[120px]" />
        <BentoCell
          image={images[5]}
          className="col-span-2 min-h-[140px] md:col-span-4"
        />
      </div>
    );
  }

  if (images.length === 5) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-2">
        <BentoCell
          image={images[0]}
          priority={priorityFirst}
          className="col-span-2 row-span-2 min-h-[220px] md:min-h-[320px]"
        />
        {images.slice(1).map((image) => (
          <BentoCell key={image.src} image={image} />
        ))}
      </div>
    );
  }

  if (images.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <BentoCell
            key={image.src}
            image={image}
            priority={priorityFirst && index === 0}
            className="min-h-[160px] sm:min-h-[200px]"
          />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
        <BentoCell
          image={images[0]}
          priority={priorityFirst}
          className="min-h-[200px] sm:col-span-2 sm:min-h-[280px]"
        />
        <div className="grid grid-cols-2 gap-2 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
          <BentoCell image={images[1]} className="min-h-[140px]" />
          <BentoCell image={images[2]} className="min-h-[140px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
      {images.map((image, index) => (
        <BentoCell
          key={image.src}
          image={image}
          priority={priorityFirst && index === 0}
          className="min-h-[160px]"
        />
      ))}
    </div>
  );
}

function GalleryEventSection({
  event,
  index,
  priorityFirst = false,
}: {
  event: GalleryEvent;
  index: number;
  priorityFirst?: boolean;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.article
      id={event.id}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : Math.min(index * 0.06, 0.18),
        ease: MOTION.ease,
      }}
      className={cn(
        "scroll-mt-28 py-10 md:py-14",
        index % 2 === 1 ? "bg-[#f5f6f8]" : "bg-white"
      )}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-pill bg-hi-primary px-4 py-1.5 text-sm font-medium text-white">
                {event.year}
              </span>
              {event.location ? (
                <span className="text-sm font-medium text-hi-black/50">
                  {event.location}
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-normal leading-[1.12] tracking-[-0.03em] text-hi-ink">
              {event.title}
            </h3>
            {event.summary ? (
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-hi-black/75 md:text-base">
                {event.summary}
              </p>
            ) : null}
            <p className="mt-4 text-sm text-hi-black/45">
              {event.images.length}{" "}
              {event.images.length === 1 ? "photo" : "photos"}
            </p>
          </div>

          <EventBentoGrid images={event.images} priorityFirst={priorityFirst} />
        </div>
      </Container>
    </motion.article>
  );
}

export default function GalleryPageClient() {
  const [brand, setBrand] = useState<GalleryBrand>("oncoclinics");
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const reduce = usePrefersReducedMotion();

  const events = useMemo(() => eventsForBrand(brand), [brand]);

  const scrollToEvent = (eventId: string) => {
    setActiveEventId(eventId);
    document.getElementById(eventId)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <PageHero
        title="Gallery"
        image="/images/gallery/rencare-1.webp"
        alt="Rencare dialysis treatment room"
      />

      <PageBody>
        <section className="border-b border-hi-black/8 bg-white py-10 md:py-12">
          <Container>
            <Reveal>
              <p className="text-center font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal tracking-[-0.02em] text-hi-ink">
                Past events across our platforms
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-hi-black/70 md:text-base">
                Browse moments from commissioning ceremonies, centre openings
                and community events across OncoClinics, Rencare and POCCH.
              </p>
            </Reveal>

            <div
              className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center rounded-pill bg-hi-accent-soft/40 p-1"
              role="tablist"
              aria-label="Gallery platform"
            >
              {GALLERY_TABS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={brand === value}
                  onClick={() => {
                    setBrand(value);
                    setActiveEventId(null);
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

            {events.length > 1 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={brand}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: MOTION.base, ease: MOTION.ease }}
                  className="mt-6 flex justify-center"
                >
                  <div
                    className="flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    role="tablist"
                    aria-label="Gallery events"
                  >
                    {events.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        role="tab"
                        aria-selected={activeEventId === event.id}
                        onClick={() => scrollToEvent(event.id)}
                        className={cn(
                          "shrink-0 rounded-pill border px-4 py-2 text-sm transition-colors md:px-5",
                          activeEventId === event.id
                            ? "border-hi-primary bg-hi-primary/5 text-hi-primary"
                            : "border-hi-black/10 text-hi-black/70 hover:border-hi-primary/30 hover:text-hi-primary"
                        )}
                      >
                        {event.year} · {event.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </Container>
        </section>

        <AnimatePresence mode="wait">
          <motion.div
            key={brand}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: MOTION.medium, ease: MOTION.ease }}
          >
            {events.length > 0 ? (
              events.map((event, index) => (
                <GalleryEventSection
                  key={event.id}
                  event={event}
                  index={index}
                  priorityFirst={index === 0}
                />
              ))
            ) : (
              <section className="bg-white py-16">
                <Container>
                  <p className="text-center text-hi-black/60">
                    Event photos for this platform will be added soon.
                  </p>
                </Container>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </PageBody>
    </>
  );
}
