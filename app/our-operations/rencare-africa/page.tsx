import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { RENCARE } from "@/content/site";

export const metadata: Metadata = {
  title: "Rencare Africa | Dialysis and Renal Care Operations",
  description:
    "Rencare Africa develops and operates reliable dialysis and renal-care services through institutional partnerships.",
};

export default function RencarePage() {
  return (
    <>
      <PageHero
        title="Rencare Africa"
        image="/images/operations/rencare.png"
        alt="Rencare dialysis treatment room"
      />
      <PageBody>
      <section className="bg-white py-10 md:py-16">
        <Container>
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              {RENCARE.title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-hi-black/85">
              {RENCARE.overview}
            </p>
            <p className="mt-4 font-medium text-hi-primary">{RENCARE.metric}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton href="https://www.rencareafrica.com/" variant="primary">
                Visit Rencare Africa
              </CtaButton>
              <CtaButton href="/contact?intent=partnership" variant="outline">
                Discuss a Renal Care Partnership
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-14">
            <h3 className="text-2xl text-hi-ink">Where Rencare operates</h3>
            <ul className="mt-6 space-y-3">
              {RENCARE.locations.map((loc) => (
                <li
                  key={loc.name}
                  className="border-l-2 border-hi-accent pl-4 text-base text-hi-black/85 md:text-lg"
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
      </PageBody>
    </>
  );
}
