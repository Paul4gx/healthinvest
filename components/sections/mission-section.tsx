"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { StatsRow } from "@/components/sections/stats-row";
import { OUR_MISSION_HOME, STATS } from "@/content/site";

export function MissionSection() {
  return (
    <section className="relative overflow-hidden rounded-none bg-white">
      <div className="relative min-h-[640px] overflow-hidden rounded-none md:min-h-[820px] lg:min-h-[954px]">
        <div className="absolute inset-0 rounded-none">
          <Image
            src="/images/home/our_missson.webp"
            alt="A healthcare professional"
            fill
            loading="lazy"
            className="rounded-none object-cover object-[70%_center] md:object-right"
            sizes="100vw"
          />
          <div className="absolute inset-0 rounded-none bg-gradient-to-t from-[#171e5e]/95 via-[#171e5e]/70 to-[#171e5e]/25 md:bg-none" />
          <div
            className="absolute inset-0 hidden rounded-none md:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(23, 30, 94) 0%, rgba(23, 30, 94, 0) 77%)",
            }}
          />
        </div>

        <Container className="relative z-10 flex min-h-[640px] flex-col rounded-none pt-12 md:min-h-[820px] md:pt-16 lg:min-h-[954px] lg:pt-20">
          <Reveal>
            <h2 className="whitespace-pre-line font-display text-[clamp(2.75rem,12vw,9.375rem)] font-normal leading-[0.95] tracking-[-0.02em] text-white">
              {OUR_MISSION_HOME.title}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-4 max-w-[627px] font-display text-[clamp(1.25rem,3vw,2rem)] font-normal leading-snug tracking-[-0.02em] text-white/90 md:mt-6">
              {OUR_MISSION_HOME.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex max-w-[627px] flex-col gap-4 text-[15px] leading-relaxed text-white md:mt-10 md:gap-5 md:text-[20px] md:leading-[1.45]">
              {OUR_MISSION_HOME.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-7 md:mt-10">
            <CtaButton href="/about" variant="primary">
              Learn More
            </CtaButton>
          </Reveal>

          <div className="mt-auto pt-10 md:pt-16">
            <StatsRow items={STATS} />
          </div>
        </Container>
      </div>
    </section>
  );
}
