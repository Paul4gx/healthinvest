import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { Reveal } from "@/components/ui/reveal";
import { SplitColumns } from "@/components/ui/split-columns";
import { IMPACT, STATS } from "@/content/site";
import { StatsRow } from "@/components/sections/stats-row";
import { ImpactProofRail } from "@/components/sections/impact-proof-rail";
import { ImpactEvidence } from "@/components/sections/impact-evidence";

export const metadata: Metadata = {
  title: "Our Impact | Health Invest Africa",
  description:
    "See how HIA supports specialist healthcare access, workforce development, patient support and sustainable local capability.",
};

const IMPACT_COLUMNS = [
  {
    lead: "Reducing",
    rest: "barriers around treatment",
    body: IMPACT.sections[1].body,
    image: "/images/home/strip-3.jpg",
    imageAlt: "Clinician supporting a patient through treatment",
  },
  {
    lead: "Developing",
    rest: "specialist healthcare capability",
    body: IMPACT.sections[0].body,
    image: "/images/gallery/ren-5.jpg",
    imageAlt: "Specialist sharing clinical guidance with a patient",
  },
  {
    lead: "Care",
    rest: "closer to home",
    body: IMPACT.sections[3].body,
    image: "/images/operations/rencare.png",
    imageAlt: "Specialist care delivered in a local centre",
  },
] as const;

export default function ImpactPage() {
  return (
    <>
      <PageHero
        title="Impact"
        image="/images/home/our-mission.jpg"
        alt="Clinician delivering specialist care"
      />
      <PageBody>
      <section className="bg-white py-10 md:py-16">
        <Container>
          <Reveal className="w-full">
            <h2 className="w-full text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
              {IMPACT.title}
            </h2>
            <p className="mt-6 w-full text-lg leading-relaxed text-hi-black/85">
              {IMPACT.intro}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <h3 className="text-xl text-hi-ink">Our current reported scale</h3>
            <div className="mt-8">
              <StatsRow items={STATS} />
              <ImpactProofRail />
            </div>
          </Reveal>
        </Container>
      </section>

      <SplitColumns items={IMPACT_COLUMNS} />

      <ImpactEvidence />
      </PageBody>
    </>
  );
}
