"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function TeamCard({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { y: -4, scale: 0.99 }}
      transition={{ duration: MOTION.base, ease: MOTION.ease }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          loading="lazy"
          className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width:1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col bg-hi-navy-mid px-5 py-5 text-white md:px-6 md:py-6">
        <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-hi-accent-soft">{member.role}</p>
        {member.bio ? (
          <p className="mt-4 text-sm leading-relaxed text-white/80">{member.bio}</p>
        ) : null}
      </div>
    </motion.article>
  );
}
