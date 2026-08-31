import type { BlogPost, BlogPostSection } from "@/types";

function renderSection(section: BlogPostSection, index: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p key={index} className="text-lg leading-relaxed text-hi-black/90">
          {section.text}
        </p>
      );
    case "heading":
      return (
        <h2
          key={index}
          className="pt-2 font-display text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-[-0.02em] text-hi-ink"
        >
          {section.text}
        </h2>
      );
    case "list":
      return (
        <ul
          key={index}
          className="list-disc space-y-3 pl-5 text-lg leading-relaxed text-hi-black/90"
        >
          {section.items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      );
    case "tags":
      return (
        <div key={index} className="flex flex-wrap gap-2 pt-2">
          {section.items.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-hi-accent-soft/50 px-3 py-1.5 text-sm font-medium text-hi-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    case "references":
      return (
        <ol
          key={index}
          className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-hi-black/80"
        >
          {section.items.map((reference) => (
            <li key={reference.text.slice(0, 48)}>
              {reference.href ? (
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-hi-primary/30 underline-offset-2 transition hover:text-hi-primary"
                >
                  {reference.text}
                </a>
              ) : (
                reference.text
              )}
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export function InsightArticleBody({ post }: { post: BlogPost }) {
  if (post.sections?.length) {
    return (
      <div className="space-y-5">
        <p className="text-lg leading-relaxed text-hi-black/90">{post.excerpt}</p>
        {post.sections.map((section, index) => renderSection(section, index))}
      </div>
    );
  }

  return (
    <div className="space-y-5 text-lg leading-relaxed text-hi-black/90">
      <p>{post.excerpt}</p>
      {post.body?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      )) ?? (
        <p>
          Health Invest Africa continues to expand specialty capacity across Nigeria
          through OncoClinics and Rencare Africa, investing in infrastructure,
          clinicians and systems that make quality care reachable.
        </p>
      )}
    </div>
  );
}
