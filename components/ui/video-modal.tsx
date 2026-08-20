"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MOTION, SITE } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type VideoModalContextValue = {
  openVideo: (videoId?: string) => void;
  closeVideo: () => void;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) {
    throw new Error("useVideoModal must be used within VideoModalProvider");
  }
  return ctx;
}

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeVideo = useCallback(() => setVideoId(null), []);

  const openVideo = useCallback((id?: string) => {
    setVideoId(id || SITE.videoId);
  }, []);

  useEffect(() => {
    if (!videoId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [videoId, closeVideo]);

  const value = useMemo(
    () => ({ openVideo, closeVideo }),
    [openVideo, closeVideo]
  );

  return (
    <VideoModalContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {videoId ? (
                <motion.div
                  className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: MOTION.base }}
                >
                  <button
                    type="button"
                    aria-label="Close video"
                    className="absolute inset-0 bg-[#02051e]/75 backdrop-blur-md"
                    onClick={closeVideo}
                  />

                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Watch video"
                    className="relative z-10 w-full max-w-[1100px]"
                    initial={reduce ? false : { opacity: 0, y: 28, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: MOTION.ease }}
                  >
                    <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[#00cff3]/20 blur-3xl" />
                    <button
                      type="button"
                      onClick={closeVideo}
                      aria-label="Close"
                      className="absolute top-3 right-3 z-20 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:-top-14 md:right-0 md:bg-white/10"
                    >
                      <X className="size-4" strokeWidth={2.25} />
                    </button>
                    <div className="relative overflow-hidden rounded-[20px] bg-black shadow-[0_32px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/15 md:rounded-[28px]">
                      <div className="aspect-video w-full">
                        <iframe
                          title="Health Invest video"
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </VideoModalContext.Provider>
  );
}
