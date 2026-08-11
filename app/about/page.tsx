import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT } from "@/content/site";

export const metadata: Metadata = {
  title: "About Health Invest Africa | Our Purpose and Platform",
  description:
    "Learn how Health Invest Africa combines investment, infrastructure, technology, clinical capability and operations to expand specialist healthcare access.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={ABOUT.heroTitle}
        image="/images/about/hero.jpg"
        alt="Clinician reviewing patient information"
      />

      <PageBody>
      <section className="bg-white py-10 md:py-16">
        <Container className="max-w-5xl">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[-0.02em] text-hi-ink">
              {ABOUT.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-hi-black/85 md:text-xl">
              {ABOUT.intro}
            </p>
            <div className="mt-8">
              <CtaButton href="/our-model" variant="primary">
                Explore Our Model
              </CtaButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section
        title={ABOUT.platformNote.title}
        body={ABOUT.platformNote.body}
        tone="surface"
      />
      <Section title={ABOUT.why.title} body={ABOUT.why.body} eyebrow="Why we exist" />
      <Section
        title={ABOUT.what.title}
        body={ABOUT.what.body}
        eyebrow="What we do"
        tone="surface"
      />
      <Section
        title={ABOUT.purpose.title}
        body={ABOUT.purpose.body}
        eyebrow="Our purpose"
      />
      <Section
        title={ABOUT.ambition.title}
        body={ABOUT.ambition.body}
        eyebrow="Our ambition"
        tone="surface"
      />

      <section className="bg-hi-navy-deep py-10 text-white md:py-16">
        <Container className="max-w-4xl text-center">
          <Reveal>
            <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-snug tracking-[-0.02em]">
              {ABOUT.closing}
            </p>
          </Reveal>
        </Container>
      </section>
      </PageBody>
    </>
  );
}

function Section({
  title,
  body,
  eyebrow,
  tone = "white",
}: {
  title: string;
  body: string;
  eyebrow?: string;
  tone?: "white" | "surface";
}) {
  return (
    <section
      className={
        tone === "surface" ? "bg-hi-surface py-10 md:py-14" : "bg-white py-10 md:py-14"
      }
    >
      <Container className="max-w-5xl">
        <Reveal>
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.6rem,3vw,2.5rem)] font-normal tracking-[-0.02em] text-hi-ink">
            {title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-hi-black/85">
            {body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
