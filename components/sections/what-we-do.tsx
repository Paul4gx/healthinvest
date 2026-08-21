"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
// import { useVideoModal } from "@/components/ui/video-modal";

export function WhatWeDo() {
  // Video play paused until the client supplies a video
  // const { openVideo } = useVideoModal();

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="relative w-full overflow-hidden rounded-[24px] md:rounded-[30px]">
            {/* Was a play button; restore onClick={() => openVideo()} when video is ready */}
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[1528/692]">
              <Image
                src="/images/home/what-we-do.jpg"
                alt="Clinicians reviewing a care plan"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width:768px) 100vw, 1528px"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="absolute inset-0 flex items-end justify-between gap-3 p-5 sm:gap-4 sm:p-10 lg:p-12">
              <h2 className="font-display text-[clamp(1.85rem,6vw,4.375rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
                What We Do
              </h2>
              {/* Play control paused until the client supplies a video
              <span
                className="relative size-12 shrink-0 sm:size-20 lg:size-24"
                aria-hidden
              >
                <img
                  src="/icons/play-cutout.svg"
                  alt=""
                  className="size-full object-contain"
                />
              </span>
              */}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
