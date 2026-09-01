"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/ui/cta-button";
import { GALLERY_EVENTS } from "@/content/site";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import type { GalleryBrand, GalleryEvent, GalleryEventImage } from "@/types";

const INITIAL_VISIBLE = 6;

const GALLERY_TABS = [
  ["rencare", "Rencare"],
  ["pocch", "POCCH"],
  ["oncoclinics", "OncoClinics"],
] as const satisfies readonly (readonly [GalleryBrand, string])[];

const HERO_IMAGE = "/images/gallery/hero-brand-2.webp";

function eventsForBrand(brand: GalleryBrand) {
  return GALLERY_EVENTS.filter(
    (event) => event.brand === brand && event.images.length > 0
  );
}

function EventPhoto({
  image,
  priority = false,
  onOpen,
}: {
  image: GalleryEventImage;
  priority?: boolean;
  onOpen: () => void;
}) {
  return (
    <figure className="group mb-3 break-inside-avoid sm:mb-4">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-zoom-in overflow-hidden rounded-[16px] bg-hi-surface text-left sm:rounded-[20px]"
        aria-label={`Open ${image.alt}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1000}
          height={1250}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          style={{ width: "100%", height: "auto" }}
        />
      </button>
    </figure>
  );
}

function EventPhotoGrid({
  images,
  priorityFirst = false,
  onImageClick,
}: {
  images: GalleryEventImage[];
  priorityFirst?: boolean;
  onImageClick: (index: number) => void;
}) {
  const [visible, setVisible] = useState(
    Math.min(INITIAL_VISIBLE, images.length)
  );
  const reduce = usePrefersReducedMotion();
  const shown = images.slice(0, visible);
  const canShowMore = visible < images.length;

  return (
    <div>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {shown.map((image, index) => (
          <motion.div
            key={image.src}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: reduce ? 0 : Math.min(index * 0.04, 0.24),
              ease: MOTION.ease,
            }}
          >
            <EventPhoto
              image={image}
              priority={priorityFirst && index === 0}
              onOpen={() => onImageClick(index)}
            />
          </motion.div>
        ))}
      </div>

      {canShowMore ? (
        <div className="mt-6 flex justify-center lg:justify-start">
          <CtaButton
            type="button"
            icon="down"
            variant="outline"
            onClick={() =>
              setVisible((current) =>
                Math.min(current + INITIAL_VISIBLE, images.length)
              )
            }
          >
            Show more photos
          </CtaButton>
        </div>
      ) : null}
    </div>
  );
}

function GalleryEventSection({
  event,
  index,
  priorityFirst = false,
  onImageClick,
}: {
  event: GalleryEvent;
  index: number;
  priorityFirst?: boolean;
  onImageClick: (index: number) => void;
}) {
  const reduce = usePrefersReducedMotion();
  const jumpLabel = event.location
    ? `${event.title} · ${event.location}`
    : event.title;

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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
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
            <span className="sr-only">{jumpLabel}</span>
          </div>

          <EventPhotoGrid
            images={event.images}
            priorityFirst={priorityFirst}
            onImageClick={onImageClick}
          />
        </div>
      </Container>
    </motion.article>
  );
}

type LightboxState = {
  event: GalleryEvent;
  index: number;
};

export default function GalleryPageClient() {
  const [brand, setBrand] = useState<GalleryBrand>("rencare");
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
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
        image={HERO_IMAGE}
        alt="Gallery across Health Invest Africa platforms"
      />

      <PageBody>
        <section className="border-b border-hi-black/8 bg-white py-10 md:py-12">
          <Container>
            <Reveal>
              <p className="text-center font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal tracking-[-0.02em] text-hi-ink">
                Past events across our platforms
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-hi-black/70 md:text-base">
                Browse moments from community outreach, awareness days and
                partnership events across Rencare, POCCH and OncoClinics.
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
                        {event.location
                          ? `${event.title} · ${event.location}`
                          : `${event.year} · ${event.title}`}
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
                  onImageClick={(imageIndex) =>
                    setLightbox({ event, index: imageIndex })
                  }
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

      <GalleryLightbox
        event={lightbox?.event ?? null}
        index={lightbox?.index ?? 0}
        onClose={() => setLightbox(null)}
        onIndexChange={(index) =>
          setLightbox((current) =>
            current ? { ...current, index } : current
          )
        }
      />
    </>
  );
}
