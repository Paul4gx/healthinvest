"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { MOTION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type SplitColumn = {
  lead: string;
  rest?: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

const CARD_STYLES = [
  {
    surface:
      "bg-[linear-gradient(180deg,#ffffff_0%,#f6f7fa_55%,#eef0f4_100%)]",
    wash: "from-hi-ink/0 via-hi-ink/[0.02] to-hi-ink/[0.05]",
    hoverWash: "group-hover:opacity-100",
  },
  {
    surface:
      "bg-[linear-gradient(180deg,#f3f4f8_0%,#e7e9f0_55%,#d9dce6_100%)]",
    wash: "from-hi-ink/[0.03] via-hi-ink/[0.06] to-hi-ink/[0.10]",
    hoverWash: "group-hover:opacity-100",
  },
  {
    surface:
      "bg-[linear-gradient(180deg,#e4e6ef_0%,#d2d5e2_50%,#c0c4d4_100%)]",
    wash: "from-hi-ink/[0.06] via-hi-ink/[0.10] to-hi-ink/[0.16]",
    hoverWash: "group-hover:opacity-100",
  },
] as const;

export function SplitColumns({
  items,
  className,
}: {
  items: readonly SplitColumn[];
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <section className={cn("bg-white py-10 md:py-16", className)}>
      <Container>
        <div className="grid md:grid-cols-3">
          {items.map((item, index) => {
            const tone = CARD_STYLES[index] ?? CARD_STYLES[CARD_STYLES.length - 1];
            const hasImage = Boolean(item.image);

            return (
              <motion.article
                key={`${item.lead}-${item.rest ?? ""}`}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: MOTION.slow,
                  ease: MOTION.ease,
                  delay: reduce ? 0 : index * 0.12,
                }}
                whileHover={
                  reduce
                    ? undefined
                    : { y: -10, transition: { duration: MOTION.base, ease: MOTION.ease } }
                }
                whileTap={
                  reduce
                    ? undefined
                    : { y: -6, transition: { duration: MOTION.fast, ease: MOTION.ease } }
                }
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-none",
                  hasImage
                    ? "min-h-[420px] md:min-h-[560px] lg:min-h-[620px]"
                    : "min-h-[420px] justify-between p-8 md:min-h-[560px] md:p-10 lg:min-h-[620px] lg:p-12",
                  tone.surface,
                  "shadow-[0_1px_0_rgba(21,27,80,0.04)] transition-shadow duration-500",
                  "hover:shadow-[0_22px_50px_rgba(21,27,80,0.14)]"
                )}
              >
                {hasImage ? (
                  <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden">
                    <Image
                      src={item.image!}
                      alt={item.imageAlt ?? ""}
                      fill
                      loading="lazy"
                      className="object-cover transition duration-500 group-hover:scale-[1.04] group-active:scale-[1.03]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                        tone.wash,
                        tone.hoverWash
                      )}
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute inset-x-8 top-0 h-[2px] origin-left scale-x-0 bg-hi-accent transition-transform duration-500 ease-out group-hover:scale-x-100 md:inset-x-10"
                      aria-hidden
                    />
                  </>
                )}

                <div
                  className={cn(
                    "relative flex flex-1 flex-col justify-between",
                    hasImage && "p-8 md:p-10 lg:px-12 lg:py-10"
                  )}
                >
                  {hasImage ? (
                    <span
                      className="pointer-events-none absolute inset-x-8 top-0 h-[2px] origin-left scale-x-0 bg-hi-accent transition-transform duration-500 ease-out group-hover:scale-x-100 md:inset-x-10"
                      aria-hidden
                    />
                  ) : null}
                  <h3 className="relative w-full text-[clamp(1.85rem,3.2vw,2.85rem)] font-light leading-[1.12] tracking-[-0.03em] text-hi-ink">
                    <span className="font-semibold">{item.lead}</span>
                    {item.rest ? (
                      <>
                        {" "}
                        <span className="font-light">{item.rest}</span>
                      </>
                    ) : null}
                  </h3>
                  <p
                    className={cn(
                      "relative w-full text-sm leading-relaxed text-hi-black/75 md:text-[15px] md:leading-7",
                      hasImage ? "mt-8 md:mt-10" : "mt-16 md:mt-0"
                    )}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
