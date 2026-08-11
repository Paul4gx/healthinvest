"use client";

import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { HOME_MISSION } from "@/content/site";

export function HomeMission() {
  return (
    <section className="bg-white py-10 md:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
            Our mission
          </p>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-hi-ink">
            {HOME_MISSION.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg leading-relaxed text-hi-black/85">{HOME_MISSION.body}</p>
          <div className="mt-8">
            <CtaButton href="/our-operations" variant="primary">
              Explore Our Operations
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
