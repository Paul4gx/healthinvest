"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { IMPACT } from "@/content/site";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function ImpactProofRail() {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="grid items-stretch sm:grid-cols-3">
      {IMPACT.ledger.map((item, index) => {
        const inner = (
          <>
            <p className="text-[clamp(1.75rem,3vw,2.35rem)] font-medium tracking-[-0.03em] text-hi-ink">
              {item.value}
            </p>
            <p className="mt-1 text-sm leading-snug text-hi-black/70">{item.label}</p>
            <p className="mt-3 inline-flex min-h-[1.25rem] items-center gap-1 text-xs font-medium text-hi-navy-deep">
              {item.note ? (
                <>
                  {item.note}
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/rail:translate-x-0.5 group-hover/rail:-translate-y-0.5 group-active/rail:translate-x-0.5 group-active/rail:-translate-y-0.5" />
                </>
              ) : (
                <span className="invisible" aria-hidden>
                  —
                </span>
              )}
            </p>
          </>
        );

        const classes = cn(
          "group/rail relative flex h-full min-h-[160px] flex-col items-center justify-center bg-[#67d2f1] px-5 py-6 text-center md:min-h-[168px] md:px-7",
          index > 0 && "border-t border-white/50 sm:border-l sm:border-t-0",
          item.href && "transition-colors duration-200 hover:bg-[#4fc4e8] active:bg-[#4fc4e8]"
        );

        return (
          <motion.div
            key={item.label}
            className="h-full"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: MOTION.medium,
              ease: MOTION.ease,
              delay: reduce ? 0 : 0.08 * index,
            }}
          >
            {item.href ? (
              <Link href={item.href} className={classes}>
                {inner}
              </Link>
            ) : (
              <div className={classes}>{inner}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
