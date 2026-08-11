"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { IMPACT } from "@/content/site";

export function ImpactEvidence() {
  const section = IMPACT.sections[2];

  return (
    <section className="bg-hi-surface py-10 md:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
              Evidence
            </p>
            <h3 className="mt-3 max-w-[16ch] text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal tracking-[-0.02em] text-hi-ink">
              {section.title}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-hi-black/80 md:text-lg">
              {section.body}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-hi-navy-mid md:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
              <Image
                src="/images/operations/rencare-bay.png"
                alt="Dialysis treatment bays in a Rencare centre"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 58vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hi-navy-deep/35 via-transparent to-transparent"
                aria-hidden
              />
              <p className="absolute bottom-4 left-4 max-w-[18ch] rounded-full bg-white/95 px-4 py-2 text-xs font-medium tracking-[-0.01em] text-hi-ink shadow-sm md:bottom-5 md:left-5 md:text-sm">
                Operating data from the network
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
