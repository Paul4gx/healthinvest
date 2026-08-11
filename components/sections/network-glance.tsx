"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { StatsRow } from "@/components/sections/stats-row";
import { InvestTicker } from "@/components/sections/invest-ticker";
import { STATS } from "@/content/site";

export function NetworkGlance() {
  return (
    <section className="bg-hi-navy-deep py-7 text-white md:py-14">
      <Container>
        <Reveal>
          <h2 className="text-[clamp(1.55rem,6vw,2.5rem)] font-normal tracking-[-0.02em]">
            A growing specialist care network
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/75 md:mt-3 md:text-base">
            Network at a glance.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6 md:mt-12">
          <StatsRow items={STATS} />
        </Reveal>

        <Reveal delay={0.16} className="border-t border-white/10 pt-7 md:pt-14">
          <InvestTicker />
        </Reveal>
      </Container>
    </section>
  );
}
