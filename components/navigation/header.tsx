"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/layout/container";
import { NAV_LINKS, MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type HeaderProps = {
  variant?: "solid" | "overlay";
};

export function Header({ variant = "solid" }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlayMode = variant === "overlay" && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled || open || variant === "solid"
          ? "bg-white shadow-[0_1px_0_rgba(26,26,26,0.06)]"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo
          priority
          variant={overlayMode ? "light" : "dark"}
          className={cn(overlayMode && "[&_img]:brightness-0 [&_img]:invert")}
        />

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap font-display text-[16px] tracking-[-0.01em] transition-colors duration-200",
                  overlayMode
                    ? "text-hi-black hover:text-hi-primary"
                    : "text-hi-black hover:text-hi-primary",
                  active && "text-hi-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={cn(
            "group/menu relative inline-flex size-11 items-center justify-center lg:hidden",
            overlayMode ? "text-white" : "text-hi-black"
          )}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative flex h-[13px] w-[22px] flex-col justify-between">
            <span
              className={cn(
                "block h-px w-full origin-center rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-[12px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/menu:w-full",
                open && "w-full scale-x-0 opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-px w-[17px] origin-center rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/menu:w-full",
                open && "w-full -translate-y-[6px] -rotate-45"
              )}
            />
          </span>
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: MOTION.base, ease: MOTION.ease }}
            className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain border-t border-hi-black/5 bg-white lg:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-[var(--spacing-gutter)] py-5 pb-8"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.04,
                      duration: MOTION.base,
                      ease: MOTION.ease,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 font-display text-lg",
                        active
                          ? "bg-hi-primary/10 text-hi-primary"
                          : "text-hi-black hover:bg-hi-surface"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
