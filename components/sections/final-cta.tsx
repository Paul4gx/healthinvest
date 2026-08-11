"use client";

import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="bg-hi-navy-deep py-10 text-white md:py-16">
      <Container className="max-w-4xl text-center">
        <Reveal>
          <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em]">
            Build lasting specialist healthcare capacity with us
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            We work with governments, hospitals, investors, development partners
            and healthcare organisations to turn underused assets and unmet demand
            into sustainable care platforms.
          </p>
          <div className="mt-8 flex w-full justify-center px-1">
            <CtaButton
              href="/contact?intent=partnership"
              variant="secondary"
              className="w-full max-w-full sm:w-auto"
              wrapperClassName="w-full max-w-full sm:w-auto"
            >
              Start a Partnership Conversation
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
