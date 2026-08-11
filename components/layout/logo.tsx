import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  priority?: boolean;
};

export function Logo({ className, variant = "dark", priority }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "relative inline-flex h-8 w-[148px] shrink-0 items-center focus-visible:outline-none sm:h-10 sm:w-[180px] md:h-[43px] md:w-[224px]",
        className
      )}
      aria-label={`${SITE.name} home`}
    >
      <Image
        src="/icons/logo-nav.svg"
        alt={SITE.name}
        fill
        priority={priority}
        className={cn(
          "object-contain object-left",
          variant === "light" && "brightness-0 invert"
        )}
        sizes="224px"
      />
    </Link>
  );
}
