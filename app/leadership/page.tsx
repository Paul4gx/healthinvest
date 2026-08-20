import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { TeamGrid } from "@/components/sections/team-grid";
import { Reveal } from "@/components/ui/reveal";
import { LEADERSHIP, LEADERSHIP_INTRO } from "@/content/site";

export const metadata: Metadata = {
  title: "Leadership Team | Health Invest Africa",
  description:
    "Meet the investment, clinical, quality and operations leaders behind Health Invest Africa’s specialist healthcare platforms.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        title="Leadership"
        image="/images/team/leadership.png"
        alt="Health Invest Africa leadership team"
      />
      <PageBody>
      <section className="bg-white py-10 md:py-16">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal tracking-[-0.02em] text-hi-ink">
              Leadership across investment, operations and clinical care
            </h2>
            <p className="mt-6 max-w-[1528px] text-lg leading-relaxed text-hi-black md:text-xl md:leading-relaxed">
              {LEADERSHIP_INTRO}
            </p>
          </Reveal>
          <TeamGrid members={LEADERSHIP} />
        </Container>
      </section>
      </PageBody>
    </>
  );
}
