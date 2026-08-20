"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { TeamMember } from "@/types";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function TeamBioModal({
  member,
  onClose,
}: {
  member: TeamMember | null;
  onClose: () => void;
}) {
  const reduce = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!member) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [member, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {member ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION.base }}
        >
          <button
            type="button"
            aria-label="Close biography"
            className="absolute inset-0 bg-[#02051e]/55 backdrop-blur-[6px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-bio-title"
            className="relative z-10 grid w-full max-w-[920px] overflow-hidden rounded-[24px] bg-[#f6f4ef] shadow-[0_24px_80px_rgba(2,5,30,0.28)] md:grid-cols-[minmax(240px,34%)_minmax(0,1fr)]"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: MOTION.ease }}
          >
            <div className="flex items-center justify-center bg-hi-navy-mid px-8 py-12 md:min-h-[420px] md:py-16">
              <div className="relative size-[168px] overflow-hidden rounded-full ring-[3px] ring-white/35 md:size-[200px]">
                <Image
                  src={member.image}
                  alt=""
                  fill
                  className="object-cover object-[center_18%]"
                  sizes="200px"
                />
              </div>
            </div>

            <div className="relative px-7 py-10 md:px-12 md:py-12">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-[#dfe4ee] text-hi-ink transition-colors hover:bg-[#d0d7e4]"
              >
                <X className="size-4" strokeWidth={2.25} />
              </button>

              <h2
                id="team-bio-title"
                className="pr-12 font-display text-[clamp(1.75rem,3vw,2.35rem)] font-normal leading-tight tracking-[-0.03em] text-hi-ink"
              >
                {member.name}
              </h2>
              <p className="mt-2 text-[13px] font-medium tracking-[0.08em] text-hi-primary uppercase">
                {member.role}
              </p>
              <div className="mt-6 h-px w-full bg-hi-black/10" />
              <p className="mt-6 text-[12px] font-medium tracking-[0.14em] text-hi-primary uppercase">
                About
              </p>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-hi-black/80 md:text-base md:leading-[1.65]">
                {member.bio.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
