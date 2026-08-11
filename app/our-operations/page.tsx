import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { OperationBlock } from "@/components/sections/operation-block";
import { ONCOCLINICS, POCCH, RENCARE } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Healthcare Operations | OncoClinics, Rencare and POCCH",
  description:
    "Explore the oncology, renal-care and specialist hospital platforms operated by Health Invest Africa.",
};

export default function OurOperationsPage() {
  return (
    <>
      <PageHero
        title="Our Operations"
        image="/images/operations/hero.jpg"
        alt="Medical professionals across the HIA network"
      />

      <PageBody>
        <section className="bg-[#c5c9d1] py-10 md:py-16">
          <Container className="flex flex-col gap-7 md:gap-10 lg:gap-12">
            <OperationBlock
              name="OncoClinics"
              overview={ONCOCLINICS.overview}
              locations={ONCOCLINICS.locations}
              href="/our-operations/oncoclinics-africa"
              image="/images/operations/oncoclinics.png"
              imageAlt="OncoClinics radiotherapy treatment room"
              logo="/logos/oncoclinics.png"
              logoAlt="OncoClinics"
              align="right"
            />

            <OperationBlock
              name="Rencare"
              overview={RENCARE.overview}
              locations={RENCARE.locations}
              href="/our-operations/rencare-africa"
              image="/images/operations/rencare-bay.png"
              imageAlt="Rencare dialysis treatment bay"
              logo="/logos/rencare.svg"
              logoAlt="Rencare"
            />

            <OperationBlock
              name="POCCH"
              overview={`${POCCH.overview} ${POCCH.specialties}`}
              locations={POCCH.locations}
              href="/our-operations/pocch"
              image="/images/operations/pocch-exterior.png"
              imageAlt="Dr. Peter Odili Cancer and Cardiovascular Hospital exterior"
              logo="/logos/pocch.svg"
              logoAlt="Dr. Peter Odili Cancer and Cardiovascular Hospital"
              align="right"
            />
          </Container>
        </section>
      </PageBody>
    </>
  );
}
