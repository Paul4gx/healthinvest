"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types";
import { MOTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { y: -4, scale: 0.99 }}
      transition={{ duration: MOTION.base, ease: MOTION.ease }}
      className={cn("group flex h-full flex-col gap-[22px]", className)}
    >
      <Link href={`/insights/${post.slug}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[488/273] overflow-hidden">
          <Image
            key={post.image}
            src={post.image}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 origin-left scale-x-0 bg-hi-primary/20 transition-transform duration-500 group-hover:scale-x-100" />
        </div>
        <div className="mt-[22px] flex flex-col gap-2.5 md:gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-hi-accent md:text-sm">
            {post.category}
          </p>
          <h3 className="font-display text-xl font-normal leading-8 text-hi-black transition-colors duration-200 group-hover:text-hi-primary md:text-[29.5px] md:leading-[37px]">
            {post.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}
