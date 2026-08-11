"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CtaVariant = "primary" | "secondary" | "ghost" | "outline";
type CtaIcon = "arrow" | "play" | "down" | "none";

type CtaButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  icon?: CtaIcon;
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const variants: Record<CtaVariant, string> = {
  primary:
    "bg-hi-navy-deep text-white hover:bg-[#010314] shadow-sm hover:shadow-md",
  secondary:
    "bg-white text-hi-navy-deep hover:bg-white/95 shadow-sm hover:shadow-md",
  ghost: "bg-transparent text-white border-2 border-white hover:bg-white/10",
  outline:
    "bg-transparent text-hi-navy-deep border-2 border-hi-navy-deep hover:bg-hi-navy-deep/[0.04]",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className,
  magnetic = true,
  type = "button",
  onClick,
  disabled = false,
}: CtaButtonProps) {
  const reduce = usePrefersReducedMotion();
  const external = Boolean(href?.startsWith("http"));
  const Icon =
    icon === "play" ? Play : icon === "down" ? ChevronDown : ArrowRight;
  const showIcon = icon !== "none";

  const content = (
    <>
      <span className="relative z-10 min-w-0 flex-1 pl-1 pr-1 text-left text-[13px] font-medium tracking-[-0.01em] sm:flex-none sm:text-[14px]">
        {children}
      </span>
      {showIcon ? (
        <span
          className="relative z-10 flex size-8 items-center justify-center rounded-full bg-hi-accent text-white transition-transform duration-200 group-hover:scale-110 group-active:scale-110"
          aria-hidden
        >
          <Icon
            className={cn("size-3.5", icon === "play" && "fill-current")}
            strokeWidth={2.25}
          />
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    "group relative inline-flex h-12 min-w-0 max-w-full items-center justify-between gap-3 rounded-pill pl-5 pr-2 transition-all duration-200 ease-out sm:min-w-[154px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hi-accent focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className
  );

  const inner = href ? (
    external ? (
      <a href={href} className={classes}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );

  return (
    <motion.div
      whileHover={reduce || !magnetic || disabled ? undefined : { y: -2 }}
      whileTap={
        reduce || !magnetic || disabled ? undefined : { y: -2, scale: 0.98 }
      }
      transition={{ duration: MOTION.fast, ease: MOTION.ease }}
      className="inline-flex max-w-full"
    >
      {inner}
    </motion.div>
  );
}
