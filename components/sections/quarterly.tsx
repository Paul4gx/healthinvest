"use client";

import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { BlogCard } from "@/components/sections/blog-card";
import { BLOG_POSTS } from "@/content/site";

export function Quarterly() {
  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.125rem)] font-normal tracking-[-0.02em] text-hi-black">
                The Quarterly
              </h2>
              <p className="mt-2 text-lg text-hi-muted">By Health Invest</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <CtaButton href="/insights" variant="primary">
              View All Issues
            </CtaButton>
          </Reveal>
        </div>

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
