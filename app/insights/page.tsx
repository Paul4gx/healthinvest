import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BlogCard } from "@/components/sections/blog-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { BLOG_POSTS } from "@/content/site";

export const metadata: Metadata = {
  title: "Healthcare News and Insights | Health Invest Africa",
  description:
    "Read HIA perspectives on healthcare investment, specialist operations, workforce, access and sustainable partnerships in Africa.",
};

export default function InsightsPage() {
  return (
    <section className="bg-white pb-12 pt-24 md:pb-16 md:pt-28">
      <Container>
        <Reveal>
          <p className="text-hi-accent">The Quarterly</p>
          <h1 className="mt-3 text-[clamp(2.5rem,5vw,4rem)] font-normal tracking-[-0.03em] text-hi-ink">
            News and Insights for the Future of African Healthcare
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-hi-muted">
            Perspectives on healthcare investment, specialist operations, workforce
            development, access and sustainable partnerships.
          </p>
        </Reveal>
        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
