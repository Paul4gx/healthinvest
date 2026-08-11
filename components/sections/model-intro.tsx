"use client";

import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { MODEL_PAGE } from "@/content/site";

export function ModelIntro() {
  return (
    <section className="overflow-x-hidden bg-white py-10 md:py-16">
      <div className="mx-auto grid w-full max-w-[1728px] items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-0">
        <Reveal className="px-[var(--spacing-gutter)] lg:pr-10 xl:pr-16">
          <h2 className="max-w-[18ch] text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
            {MODEL_PAGE.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-hi-black/85">
            {MODEL_PAGE.intro}
          </p>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
            Partnership-led. Operationally accountable. Built to scale.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-hi-black/75 md:text-lg">
            {MODEL_PAGE.overview}
          </p>
          <div className="mt-8">
            <CtaButton href="/contact?intent=partnership" variant="primary">
              Discuss a Partnership
            </CtaButton>
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className="px-[var(--spacing-gutter)] lg:w-[calc(100%+max(0px,calc((100vw-1728px)/2)))] lg:px-0"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-hi-navy-mid md:aspect-[5/4] lg:aspect-auto lg:min-h-[560px] lg:rounded-l-[28px] lg:rounded-r-none">
            <Image
              src="/images/about/partner.jpg"
              alt="Care teams joining hands with a host institution"
              fill
              loading="lazy"
              className="object-cover object-[center_35%]"
              sizes="(max-width:1024px) 100vw, 54vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
