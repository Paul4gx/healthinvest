"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { StatItem } from "@/types";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const TONES = ["bg-[#4c5393]", "bg-[#353d76]", "bg-[#232957]"] as const;

const ICONS = {
  centers: "/icons/stats/centers.svg",
  professionals: "/icons/stats/professionals.svg",
  patients: "/icons/stats/patients.svg",
} as const;

function useCountUp(target: number, enabled: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);

  return value;
}

function StatCard({
  item,
  tone,
}: {
  item: StatItem;
  tone: (typeof TONES)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = usePrefersReducedMotion();
  const count = useCountUp(item.value, inView && !reduce);

  return (
    <motion.article
      ref={ref}
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { y: -4, scale: 0.99 }}
      transition={{ duration: MOTION.base, ease: MOTION.ease }}
      className={cn(
        "group relative z-0 min-h-[148px] overflow-hidden text-white transition-shadow duration-200 hover:z-10 hover:shadow-[0_16px_40px_rgba(2,5,30,0.28)] sm:min-h-[200px] md:h-[260px]",
        tone
      )}
    >
      <div className="absolute left-3.5 top-3.5 size-[40px] transition-transform duration-200 ease-out group-hover:scale-105 sm:left-5 sm:top-5 sm:size-[56px] md:left-6 md:top-6 md:size-[80px]">
        <Image
          src="/icons/stats/circle.svg"
          alt=""
          width={80}
          height={80}
          className="size-full"
        />
        <span className="absolute inset-[14%] flex items-center justify-center overflow-hidden">
          <Image
            src={ICONS[item.icon]}
            alt=""
            width={64}
            height={64}
            className="size-full object-contain"
          />
        </span>
      </div>

      <div className="flex h-full flex-col items-center justify-center px-4 pb-5 pt-14 text-center sm:px-5 sm:pb-7 sm:pt-16 md:pt-14">
        {item.prefix ? (
          <p className="mb-0.5 text-xs font-normal text-white/80 sm:mb-1 sm:text-sm md:text-base">
            {item.prefix.trim()}
          </p>
        ) : null}
        <p className="text-[clamp(2rem,8vw,3.5rem)] leading-none tracking-[-0.03em]">
          {count}
          {item.suffix}
        </p>
        <p className="mt-1.5 max-w-[16ch] text-xs leading-snug text-white/90 sm:mt-2 sm:text-sm md:mt-3 md:text-lg">
          {item.label}
        </p>
      </div>
    </motion.article>
  );
}

export function StatsRow({ items }: { items: StatItem[] }) {
  return (
    <div className="grid sm:grid-cols-3">
      {items.map((item, index) => (
        <StatCard
          key={item.label}
          item={item}
          tone={TONES[index % TONES.length]}
        />
      ))}
    </div>
  );
}
