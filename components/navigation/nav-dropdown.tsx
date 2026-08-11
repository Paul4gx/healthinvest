"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type NavDropdownItem = {
  href: string;
  label: string;
};

type NavDropdownProps = {
  href: string;
  label: string;
  items: readonly NavDropdownItem[];
  overlayMode?: boolean;
  mobile?: boolean;
  menuLabel?: string;
};

export function NavDropdown({
  href,
  label,
  items,
  overlayMode = false,
  mobile = false,
  menuLabel,
}: NavDropdownProps) {
  const pathname = usePathname();
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [open, setOpen] = useState(false);

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    items.some(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (mobile) {
    return (
      <div>
        <div className="flex items-center">
          <Link
            href={href}
            className={cn(
              "flex-1 rounded-xl px-4 py-3 font-display text-lg",
              active
                ? "bg-hi-primary/10 text-hi-primary"
                : "text-hi-black hover:bg-hi-surface"
            )}
          >
            {label}
          </Link>
          <button
            type="button"
            className="mr-1 inline-flex size-11 items-center justify-center rounded-xl text-hi-black hover:bg-hi-surface"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? `Hide ${label} menu` : `Show ${label} menu`}
            onClick={() => setOpen((value) => !value)}
          >
            <ChevronDown
              className={cn("size-5 transition-transform duration-200", open && "rotate-180")}
            />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={menuId}
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: MOTION.base, ease: MOTION.ease }}
              className="overflow-hidden"
            >
              <ul className="mb-2 ml-4 flex flex-col border-l border-hi-black/10 py-1">
                {items.map((item) => {
                  const current = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-xl px-4 py-2.5 text-base",
                          current
                            ? "text-hi-primary"
                            : "text-hi-black/80 hover:bg-hi-surface hover:text-hi-primary"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href={href}
        className={cn(
          "group relative inline-flex items-center gap-1 whitespace-nowrap font-display text-[13px] tracking-[-0.01em] transition-colors duration-200 2xl:text-[15px]",
          overlayMode
            ? "text-white/90 hover:text-white"
            : "text-hi-black hover:text-hi-primary",
          active && (overlayMode ? "text-white" : "text-hi-primary")
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
        <span
          className={cn(
            "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100",
            active && "scale-x-100"
          )}
        />
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={menuLabel ?? label}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: MOTION.fast, ease: MOTION.ease }}
            className="absolute left-1/2 top-full z-50 w-[240px] -translate-x-1/2 pt-3"
          >
            <ul className="overflow-hidden rounded-2xl bg-white py-2 shadow-[0_16px_40px_rgba(21,27,80,0.14)] ring-1 ring-hi-black/8">
              {items.map((item) => {
                const current = pathname === item.href;
                return (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      role="menuitem"
                      className={cn(
                        "block px-4 py-2.5 text-sm tracking-[-0.01em] transition-colors",
                        current
                          ? "bg-hi-primary/8 text-hi-primary"
                          : "text-hi-black hover:bg-hi-surface hover:text-hi-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
