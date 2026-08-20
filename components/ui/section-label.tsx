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
          "max-w-[22ch] font-display text-[16px] font-normal uppercase leading-none tracking-[-0.02em] sm:max-w-none sm:text-[20px]",
          tone === "dark" ? "text-hi-black" : "text-white"
        )}
      >
        {children}
      </span>
    </div>
  );
}
