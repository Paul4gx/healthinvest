"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { LocationItem } from "@/types";

type OperationBlockProps = {
  name: string;
  overview: string;
  locations: LocationItem[];
  href: string;
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  knockOutBlack?: boolean;
  align?: "left" | "right";
  cta?: string;
  note?: string;
};

export function OperationBlock({
  name,
  overview,
  locations,
  href,
  image,
  imageAlt,
  logo,
  logoAlt,
  knockOutBlack = false,
  align = "left",
  cta = "Learn More",
  note,
}: OperationBlockProps) {
  return (
    <article className="relative md:overflow-hidden md:rounded-[24px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] md:absolute md:inset-0 md:aspect-auto md:rounded-[24px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width:1728px) 100vw, 1728px"
        />
      </div>

      <div
        className={cn(
          "relative z-10 -mt-10 px-3 md:mt-0 md:flex md:min-h-[520px] md:items-center md:px-8 md:py-8 lg:px-10 lg:py-10",
          align === "right" ? "md:justify-end" : "md:justify-start"
        )}
      >
        <Reveal
          className={cn(
            "w-full max-w-xl lg:max-w-[32rem]",
            align === "right" ? "md:ml-auto" : "md:mr-auto"
          )}
        >
          <div className="relative isolate overflow-hidden rounded-[20px] bg-hi-navy-deep text-white shadow-[0_16px_40px_rgba(2,5,30,0.22)] ring-1 ring-inset ring-white/25 md:rounded-[24px] md:shadow-[0_16px_40px_rgba(2,5,30,0.18)]">
            <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
              <Image
                src={image}
                alt=""
                fill
                loading="lazy"
                className="scale-[1.04] object-cover"
                sizes="(max-width:768px) 100vw, 32rem"
              />
              <div
                className="absolute inset-0 rounded-[inherit] bg-hi-navy-deep/80 backdrop-blur-2xl backdrop-saturate-150"
                aria-hidden
              />
            </div>
            <div className="relative z-10 p-4 md:p-6 lg:p-7">
              <h2 className="sr-only">{name}</h2>
              <div className="inline-flex max-w-full items-center">
                {logo.endsWith(".svg") ? (
                  <img
                    src={logo}
                    alt={logoAlt}
                    className={cn(
                      "h-auto w-[min(100%,168px)] object-contain md:w-[196px]",
                      knockOutBlack && "mix-blend-screen"
                    )}
                  />
                ) : (
                  <Image
                    src={logo}
                    alt={logoAlt}
                    width={320}
                    height={96}
                    className={cn(
                      "h-auto w-[min(100%,168px)] object-contain md:w-[196px]",
                      knockOutBlack && "mix-blend-screen"
                    )}
                  />
                )}
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-white/90 md:mt-4 md:text-[0.95rem] md:leading-[1.55]">
                {overview}
              </p>
              {note ? (
                <p className="mt-3 text-xs leading-relaxed text-white/70 md:text-sm">
                  {note}
                </p>
              ) : null}
              {locations.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {locations.map((location) => {
                    const label = location.city ?? location.name;
                    const showAddress =
                      Boolean(location.city) && location.name !== location.city;

                    return (
                      <li key={location.name}>
                        <span
                          title={location.name}
                          className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] py-1 pl-1 pr-3 text-white backdrop-blur-sm"
                        >
                          <span
                            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-hi-accent text-hi-navy-deep"
                            aria-hidden
                          >
                            <MapPin className="size-3" strokeWidth={2.4} />
                          </span>
                          <span className="min-w-0 text-left leading-tight">
                            <span className="block text-[12px] font-medium tracking-[-0.01em]">
                              {label}
                            </span>
                            {showAddress && locations.length === 1 ? (
                              <span className="block text-[10px] font-normal text-white/70">
                                {location.name}
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              <div className="mt-5 md:mt-6">
                <CtaButton
                  href={href}
                  variant="secondary"
                  className="w-full max-w-full sm:w-auto"
                >
                  {cta}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
