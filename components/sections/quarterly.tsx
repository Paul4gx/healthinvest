"use client";

import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { BlogCard } from "@/components/sections/blog-card";
import { BLOG_POSTS } from "@/content/site";

export function Quarterly() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.375rem)] font-normal leading-[1.07] tracking-[-0.02em] text-hi-black">
                The Quarterly
              </h2>
              <p className="font-display text-[clamp(1.5rem,3vw,2rem)] font-light text-[#535353]">
                By Health Invest
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <CtaButton href="/insights" variant="primary">
              All Issues
            </CtaButton>
          </Reveal>
        </div>

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[31px]">
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
