import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { ModelIntro } from "@/components/sections/model-intro";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SplitColumns } from "@/components/ui/split-columns";
import { MODEL_PAGE, PILLARS } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Healthcare Investment and Operating Model | HIA",
  description:
    "Explore HIA’s partnership-led model for deploying, operating and scaling financially sustainable specialist healthcare services.",
};

const MODEL_COLUMNS = [
  {
    lead: "Partnerships",
    rest: "that unlock capability",
    body: PILLARS[0].body,
    image: "/images/home/what-we-do.jpg",
    imageAlt: "Clinician in a host-institution care setting",
  },
  {
    lead: "Technology",
    rest: "that strengthens access",
    body: PILLARS[1].body,
    image: "/images/operations/onco.jpg",
    imageAlt: "Specialist using clinical technology in a treatment centre",
  },
  {
    lead: "Operational",
    rest: "excellence",
    body: PILLARS[2].body,
    image: "/images/about/operational-excellence-vitalbeam.jpg",
    imageAlt: "OncoClinics team delivering radiotherapy with a VitalBeam system",
  },
] as const;

export default function OurModelPage() {
  return (
    <>
      <PageHero
        title="Our Model"
        image="/images/home/mission.jpg"
        alt="Healthcare operations in progress"
      />
      <PageBody>
      <ModelIntro />

      <SplitColumns items={MODEL_COLUMNS} className="pb-4 md:pb-6" />

      <section className="bg-white pb-10 pt-4 md:pb-16 md:pt-6">
        <Container>
          <Reveal>
            <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] text-hi-ink">
              How the model works
            </h3>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {MODEL_PAGE.steps.map((step) => (
              <StaggerItem
                key={step.number}
                className="rounded-[20px] border border-hi-black/8 p-6 md:p-8"
              >
                <p className="font-display text-hi-accent">{step.number}</p>
                <h3 className="mt-3 text-xl text-hi-ink md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-hi-black/80">
                  {step.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      </PageBody>
    </>
  );
}
