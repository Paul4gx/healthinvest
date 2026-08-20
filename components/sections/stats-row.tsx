"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { StatItem } from "@/types";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const TONES = ["bg-[#4c5393]", "bg-[#353d76]", "bg-[#232957]"] as const;

const ICONS: Record<StatItem["icon"], string> = {
  centers: "/icons/stats/centers.svg",
  professionals: "/icons/stats/professionals.svg",
  patients: "/icons/stats/patients.svg",
};

function useCountUp(target: number, enabled: boolean, duration = 900) {
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
    <article
      ref={ref}
      className={cn(
        "relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden rounded-none px-4 py-8 text-center text-white sm:min-h-[200px] sm:px-5 sm:py-10 md:min-h-[320px] md:px-10 md:py-14",
        tone
      )}
    >
      <div
        className="absolute top-3 left-3 flex size-12 items-center justify-center sm:top-4 sm:left-4 sm:size-14 md:top-6 md:left-6 md:size-[80px]"
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full bg-white/[0.08]" />
        <img
          src={ICONS[item.icon]}
          alt=""
          className="relative z-10 h-[46%] w-[46%] object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <p className="font-display text-[clamp(2rem,8vw,3.75rem)] leading-none tracking-[-0.03em]">
          {count}
          {item.suffix}
        </p>
        <p className="max-w-[14ch] text-[clamp(0.9rem,3.2vw,1.35rem)] font-normal leading-tight">
          {item.label}
        </p>
      </div>
    </article>
  );
}

export function StatsRow({ items }: { items: StatItem[] }) {
  return (
    <div className="grid overflow-hidden rounded-none sm:grid-cols-3">
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
