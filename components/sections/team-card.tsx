"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function TeamCard({
  member,
  onViewBio,
  className,
}: {
  member: TeamMember;
  onViewBio: () => void;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: MOTION.base, ease: MOTION.ease }}
      className={cn("group flex h-full flex-col overflow-hidden rounded-none", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-none">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          loading="lazy"
          className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width:1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-xl font-normal tracking-[-0.02em] text-hi-ink md:text-[1.65rem]">
          {member.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-hi-ink/70 md:text-[15px]">
          {member.role}
        </p>
        <button
          type="button"
          onClick={onViewBio}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-hi-ink px-5 py-2.5 text-[13px] font-medium tracking-[-0.01em] text-hi-ink transition-colors duration-200 hover:bg-hi-ink hover:text-white"
        >
          View Bio
          <ArrowRight className="size-3.5" strokeWidth={2} />
        </button>
      </div>
    </motion.article>
  );
}
