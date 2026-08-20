"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { useVideoModal } from "@/components/ui/video-modal";

export function WhatWeDo() {
  const { openVideo } = useVideoModal();

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <Reveal>
          <button
            type="button"
            onClick={() => openVideo()}
            aria-label="Play video: What We Do"
            className="group relative block w-full overflow-hidden rounded-[24px] text-left md:rounded-[30px]"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[1528/692]">
              <Image
                src="/images/home/what-we-do.jpg"
                alt="Clinicians reviewing a care plan"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 1528px"
              />
              <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/40" />
            </div>

            <div className="absolute inset-0 flex items-end justify-between gap-3 p-5 sm:gap-4 sm:p-10 lg:p-12">
              <h2 className="font-display text-[clamp(1.85rem,6vw,4.375rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
                What We Do
              </h2>
              <span
                className="relative size-12 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:size-20 lg:size-24"
                aria-hidden
              >
                <img
                  src="/icons/play-cutout.svg"
                  alt=""
                  className="size-full object-contain"
                />
              </span>
            </div>
          </button>
        </Reveal>
      </Container>
    </section>
  );
}
