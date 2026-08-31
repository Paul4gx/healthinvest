import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { PageBody } from "@/components/layout/page-body";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { ONCOCLINICS } from "@/content/site";

export const metadata: Metadata = {
  title: "OncoClinics | Cancer Care Operations",
  description:
    "OncoClinics develops and operates oncology services through partnerships that expand access to reliable cancer care.",
};

export default function OncoClinicsPage() {
  return (
    <>
      <PageHero
        title="OncoClinics"
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
                Visit OncoClinics
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

          <Reveal delay={0.12} className="mt-12 overflow-hidden rounded-[20px] border border-hi-black/10 bg-white">
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <div className="relative min-h-[200px] md:min-h-[260px]">
                <Image
                  src="/images/blog/project-strawn.webp"
                  alt="Project STRAWN launch ceremony"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 40vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
                  Insights
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-[-0.02em] text-hi-ink">
                  Project STRAWN: Strengthening Nigeria&apos;s Radiotherapy Workforce
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-hi-black/80">
                  Read how Project STRAWN is strengthening Nigeria&apos;s radiotherapy
                  workforce so investments in cancer infrastructure translate into safe,
                  effective care for patients.
                </p>
                <div className="mt-6">
                  <CtaButton href="/insights/project-strawn-launch-ceremony" variant="primary">
                    Read the article
                  </CtaButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      </PageBody>
    </>
  );
}
