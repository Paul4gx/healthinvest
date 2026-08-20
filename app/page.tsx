import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { InvestKnowledge } from "@/components/sections/invest-knowledge";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { OurFocus } from "@/components/sections/our-focus";
import { MissionSection } from "@/components/sections/mission-section";
import { Quarterly } from "@/components/sections/quarterly";
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
      <WhoWeAre />
      <InvestKnowledge />
      <WhatWeDo />
      <OurFocus />
      <MissionSection />
      <Quarterly />
    </>
  );
}
