"use client";

import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { HOME_MODEL_STEPS } from "@/content/site";

const CAPABILITIES = [
  {
    number: "01",
    title: "Partnerships",
    line: "Unlock resources with host institutions.",
  },
  {
    number: "02",
    title: "Technology",
    line: "Bridge gaps in access, quality and coordination.",
  },
  {
    number: "03",
    title: "Operational excellence",
    line: "Turn infrastructure into reliable, sustainable care.",
  },
] as const;

export function ModelTeaser() {
  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
              Our model
            </p>
            <h2 className="mt-4 text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              From infrastructure to lasting care
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-hi-black/85">
              We work with host institutions to unlock existing assets, deploy the
              right capital and technology, build capable teams and manage services
              through repeatable operating systems.
            </p>
            <div className="mt-6">
              <CtaButton href="/our-model" variant="primary">
                See How Our Model Works
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_MODEL_STEPS.map((step) => (
            <StaggerItem
              key={step.number}
              className="rounded-[20px] border border-hi-black/8 bg-hi-surface p-6"
            >
              <p className="font-display text-sm text-hi-accent">{step.number}</p>
              <h3 className="mt-3 text-xl text-hi-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-hi-black/75">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16 border-t border-hi-black/10 pt-12">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
            Three capabilities
          </p>
          <h3 className="mt-3 max-w-[22ch] text-[clamp(1.5rem,3vw,2rem)] font-normal text-hi-ink">
            Three capabilities power the model
          </h3>
        </Reveal>

        <Stagger className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
          {CAPABILITIES.map((item, index) => (
            <StaggerItem
              key={item.title}
              className={
                index > 0
                  ? "md:border-l md:border-hi-black/10 md:pl-10 lg:pl-12"
                  : undefined
              }
            >
              <p className="font-display text-sm text-hi-accent">{item.number}</p>
              <h4 className="mt-3 text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold tracking-[-0.03em] text-hi-ink">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-hi-black/70 md:text-base">
                {item.line}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
