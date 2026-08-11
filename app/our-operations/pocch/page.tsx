import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { POCCH } from "@/content/site";

export const metadata: Metadata = {
  title: "POCCH | Dr. Peter Odili Cancer & Cardiovascular Hospital",
  description:
    "Dr. Peter Odili Specialist Cancer & Cardiovascular Hospital in Port Harcourt delivers oncology, cardiovascular, renal, surgical and diagnostic care.",
};

export default function PocchPage() {
  return (
    <>
      <PageHero
        title="POCCH"
        image="/images/operations/pocch.png"
        alt="Dr. Peter Odili Cancer Cardiovascular Diagnostics and Treatment Centre"
      />
      <PageBody>
      <section className="bg-white py-10 md:py-16">
        <Container>
          <Reveal>
            <h2 className="max-w-[18ch] text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              {POCCH.title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-hi-black/85">
              {POCCH.overview}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-hi-black/85">
              {POCCH.specialties}
            </p>
            <p className="mt-5 text-base text-hi-black/70">
              {POCCH.locations[0].name}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton href={POCCH.website} variant="primary">
                Visit POCCH
              </CtaButton>
              <CtaButton href="/contact?intent=corporate" variant="outline">
                Contact the Corporate Team
              </CtaButton>
            </div>
          </Reveal>
        </Container>
      </section>
      </PageBody>
    </>
  );
}
