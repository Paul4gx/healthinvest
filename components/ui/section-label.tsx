import Image from "next/image";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionLabel({
  children,
  className,
  tone = "dark",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        className
      )}
    >
      <span
        className="relative size-[38px] shrink-0 overflow-visible"
        aria-hidden
      >
        <Image
          src="/icons/logo-icon.svg"
          alt=""
          width={39}
          height={39}
          className="size-full object-contain"
        />
      </span>
      <span
        className={cn(
          "max-w-[22ch] font-display text-[12px] font-medium uppercase leading-snug tracking-[0.08em] sm:max-w-none sm:text-[14px] sm:leading-normal",
          tone === "dark" ? "text-hi-accent" : "text-hi-accent-soft"
        )}
      >
        {children}
      </span>
    </div>
  );
}
