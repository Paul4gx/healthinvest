import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { BLOG_POSTS } from "@/content/site";
import { InsightArticleBody } from "@/components/sections/insight-article-body";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-white pb-12 pt-24 md:pb-16 md:pt-28">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-hi-accent">
            {post.category}
          </p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-normal tracking-[-0.03em] text-hi-ink">
            {post.title}
          </h1>
          <p className="mt-4 text-hi-muted">
            {new Date(post.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </Reveal>
        <Reveal delay={0.08} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[24px]">
          <Image
            key={post.image}
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width:896px) 100vw, 896px"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10">
            <InsightArticleBody post={post} />
          </div>
          <div className="mt-12">
            <CtaButton href="/insights" variant="primary">
              Back to insights
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
