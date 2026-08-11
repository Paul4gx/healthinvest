import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { NetworkGlance } from "@/components/sections/network-glance";
import { HomeMission } from "@/components/sections/home-mission";
import { PlatformsSection } from "@/components/sections/platforms-section";
import { ModelTeaser } from "@/components/sections/model-teaser";
import { ImpactTeaser } from "@/components/sections/impact-teaser";
import { Quarterly } from "@/components/sections/quarterly";
import { FinalCta } from "@/components/sections/final-cta";
import { PageBody } from "@/components/layout/page-body";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} | Specialist Healthcare Investment & Operations`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PageBody>
        <NetworkGlance />
        <HomeMission />
        <PlatformsSection />
        <ModelTeaser />
        <ImpactTeaser />
        <Quarterly />
        <FinalCta />
      </PageBody>
    </>
  );
}
