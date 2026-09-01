"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import type { GalleryEvent } from "@/types";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type GalleryLightboxProps = {
  event: GalleryEvent | null;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function GalleryLightbox({
  event,
  index,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const reduce = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const images = event?.images ?? [];
  const total = images.length;
  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < total - 1;
  const imageLoading = Boolean(current && current.src !== loadedSrc);

  const goPrev = useCallback(() => {
    if (hasPrev) onIndexChange(index - 1);
  }, [hasPrev, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (hasNext) onIndexChange(index + 1);
  }, [hasNext, index, onIndexChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!event) setLoadedSrc(null);
  }, [event]);

  useEffect(() => {
    if (!current) return;
    const probe = new window.Image();
    probe.src = current.src;
    if (probe.complete) setLoadedSrc(current.src);
  }, [current?.src]);

  useEffect(() => {
    if (!event) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose();
      if (keyboardEvent.key === "ArrowLeft") goPrev();
      if (keyboardEvent.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [event, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!event) return;
    const thumb = document.getElementById(`gallery-thumb-${index}`);
    thumb?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [event, index, reduce]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {event && current ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION.base }}
        >
          <button
            type="button"
            aria-label="Close gallery preview"
            className="absolute inset-0 bg-[#02051e]/88 backdrop-blur-[4px]"
            onClick={onClose}
          />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <header className="flex shrink-0 items-start justify-between gap-4 px-4 pt-4 md:px-8 md:pt-6">
              <div className="min-w-0 text-white">
                <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">
                  {event.year}
                  {event.location ? ` · ${event.location}` : ""}
                </p>
                <h2 className="mt-1 font-display text-[clamp(1.1rem,2.5vw,1.65rem)] font-normal leading-tight tracking-[-0.02em]">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  {index + 1} of {total}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="size-5" strokeWidth={2.25} />
              </button>
            </header>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 py-4 md:px-20">
              {hasPrev ? (
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(clickEvent) => {
                    clickEvent.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-2 z-20 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6 md:size-12"
                >
                  <ChevronLeft className="size-6" strokeWidth={2.25} />
                </button>
              ) : null}

              <motion.div
                key={current.src}
                className="relative flex min-h-[min(40vh,320px)] w-full max-w-[min(92vw,1100px)] items-center justify-center"
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: MOTION.ease }}
              >
                {imageLoading ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading image"
                  >
                    <Loader2
                      className="size-10 animate-spin text-white/75"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="text-sm text-white/55">Loading photo…</span>
                  </div>
                ) : null}

                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1400}
                  height={1050}
                  className={cn(
                    "max-h-[min(68vh,720px)] w-auto max-w-full rounded-[12px] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-opacity duration-200",
                    imageLoading ? "opacity-0" : "opacity-100"
                  )}
                  sizes="(max-width: 768px) 95vw, 1100px"
                  priority
                  onLoad={() => setLoadedSrc(current.src)}
                  onError={() => setLoadedSrc(current.src)}
                />
              </motion.div>

              {hasNext ? (
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(clickEvent) => {
                    clickEvent.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-2 z-20 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:size-12"
                >
                  <ChevronRight className="size-6" strokeWidth={2.25} />
                </button>
              ) : null}
            </div>

            <div className="shrink-0 border-t border-white/10 bg-[#02051e]/40 px-4 py-4 md:px-8 md:py-5">
              <p className="mb-3 text-center text-[11px] font-medium tracking-[0.12em] text-white/50 uppercase md:text-left">
                Album
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((image, imageIndex) => (
                  <button
                    key={image.src}
                    id={`gallery-thumb-${imageIndex}`}
                    type="button"
                    aria-label={`View photo ${imageIndex + 1}`}
                    aria-current={imageIndex === index}
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      onIndexChange(imageIndex);
                    }}
                    className={cn(
                      "relative h-16 w-20 shrink-0 overflow-hidden rounded-[10px] border-2 transition-all md:h-[72px] md:w-[96px]",
                      imageIndex === index
                        ? "border-white ring-2 ring-white/30"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
