"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { PLATFORMS } from "@/content/site";

export function PlatformsSection() {
  return (
    <section className="bg-hi-surface py-10 md:py-16">
      <Container>
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-hi-accent">
            Our healthcare platforms
          </p>
          <h2 className="mt-4 w-full text-[clamp(1.85rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
            Each platform combines specialist expertise with disciplined operations
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <StaggerItem key={platform.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={platform.image}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="text-2xl font-normal tracking-[-0.02em] text-hi-ink">
                    {platform.name}
                  </h3>
                  {/* Platform logos — paused while marks are finalized
                  <div className="inline-flex max-w-full items-center">
                    {platform.logo.endsWith(".svg") ? (
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="h-auto w-[min(100%,200px)] object-contain"
                      />
                    ) : (
                      <Image
                        src={platform.logo}
                        alt={platform.name}
                        width={280}
                        height={84}
                        className="h-auto w-[min(100%,200px)] object-contain"
                      />
                    )}
                  </div>
                  */}
                  <p className="mt-5 flex-1 text-base leading-relaxed text-hi-black/80">
                    {platform.summary}
                  </p>
                  {platform.metric ? (
                    <p className="mt-4 text-sm font-medium text-hi-primary">
                      {platform.metric}
                    </p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={platform.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-hi-primary underline-offset-4 hover:underline"
                    >
                      Learn more
                      <ArrowUpRight className="size-4" />
                    </Link>
                    {platform.externalUrl ? (
                      <a
                        href={platform.externalUrl}
                        className="inline-flex items-center gap-2 text-sm font-medium text-hi-ink underline-offset-4 hover:underline"
                      >
                        {platform.cta}
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
