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
        "@container/stat group relative z-0 overflow-hidden text-white transition-shadow duration-200 hover:z-10 hover:shadow-[0_16px_40px_rgba(2,5,30,0.28)]",
        "min-h-[148px] sm:min-h-[188px] md:min-h-[205px] lg:min-h-[228px] xl:h-[260px] xl:min-h-0",
        tone
      )}
    >
      <div
        className={cn(
          "absolute transition-transform duration-200 ease-out group-hover:scale-105",
          "left-3.5 top-3.5 size-10",
          "sm:left-4 sm:top-4 sm:size-11",
          "md:left-4 md:top-4 md:size-[52px]",
          "lg:left-5 lg:top-5 lg:size-16",
          "xl:left-6 xl:top-6 xl:size-[80px]"
        )}
      >
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

      <div
        className={cn(
          "flex h-full flex-col items-center justify-center text-center",
          "px-4 pb-5 pt-14",
          "sm:px-4 sm:pb-6 sm:pt-[3.75rem]",
          "md:px-4 md:pb-6 md:pt-14",
          "lg:px-5 lg:pb-7 lg:pt-14",
          "xl:px-5 xl:pb-7 xl:pt-14"
        )}
      >
        {item.prefix ? (
          <p
            className={cn(
              "mb-0.5 font-normal text-white/80",
              "text-[11px] sm:text-xs md:text-xs lg:text-sm xl:text-base",
              "sm:mb-1"
            )}
          >
            {item.prefix.trim()}
          </p>
        ) : null}
        <p
          className={cn(
            "leading-none tracking-[-0.03em]",
            "text-[clamp(2rem,8vw,2.75rem)]",
            "sm:text-[clamp(1.75rem,16cqw,2.25rem)]",
            "md:text-[clamp(1.9rem,15cqw,2.5rem)]",
            "lg:text-[clamp(2.15rem,14cqw,2.85rem)]",
            "xl:text-[clamp(2.5rem,16cqw,3.5rem)]"
          )}
        >
          {count}
          {item.suffix}
        </p>
        <p
          className={cn(
            "mt-1.5 max-w-[15ch] leading-snug text-white/90",
            "text-xs sm:mt-1.5 sm:max-w-[13ch] sm:text-[13px]",
            "md:mt-2 md:max-w-[14ch] md:text-sm",
            "lg:mt-2.5 lg:max-w-[15ch] lg:text-base",
            "xl:mt-3 xl:max-w-[16ch] xl:text-lg"
          )}
        >
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
