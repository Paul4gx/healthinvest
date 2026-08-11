import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { ONCOCLINICS } from "@/content/site";

export const metadata: Metadata = {
  title: "OncoClinics Africa | Cancer Care Operations",
  description:
    "OncoClinics Africa develops and operates oncology services through partnerships that expand access to reliable cancer care.",
};

export default function OncoClinicsPage() {
  return (
    <>
      <PageHero
        title="OncoClinics Africa"
        image="/images/operations/oncoclinics.png"
        alt="OncoClinics radiotherapy treatment room"
      />
      <PageBody>
      <section className="bg-white py-10 md:py-16">
        <Container>
          <Reveal>
            <h2 className="max-w-[18ch] text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              {ONCOCLINICS.title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-hi-black/85">
              {ONCOCLINICS.overview}
            </p>
            <p className="mt-4 font-medium text-hi-primary">{ONCOCLINICS.metric}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton href="https://oncoclinicsafrica.com/" variant="primary">
                Visit OncoClinics Africa
              </CtaButton>
              <CtaButton href="/contact?intent=partnership" variant="outline">
                Discuss an Oncology Partnership
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-14">
            <h3 className="text-2xl text-hi-ink">Where OncoClinics operates</h3>
            <ul className="mt-6 space-y-3">
              {ONCOCLINICS.locations.map((loc) => (
                <li
                  key={loc.name}
                  className="border-l-2 border-hi-accent pl-4 text-base text-hi-black/85 md:text-lg"
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 rounded-[20px] bg-hi-surface p-8">
            <h3 className="text-xl text-hi-ink">Strengthening the people behind cancer care</h3>
            <p className="mt-4 max-w-3xl text-hi-black/80">
              OncoClinics invests in clinical training, technical capability and recurring
              professional development, including workforce initiatives such as Project
              STRAWN.
            </p>
          </Reveal>
        </Container>
      </section>
      </PageBody>
    </>
  );
}
