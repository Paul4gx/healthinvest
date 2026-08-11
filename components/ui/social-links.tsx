import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SocialId = (typeof SOCIAL_LINKS)[number]["id"];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const ICONS: Record<SocialId, typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

export function SocialLinks({
  variant = "footer",
  tone = "dark",
  className,
}: {
  variant?: "footer" | "contact";
  tone?: "dark" | "light";
  className?: string;
}) {
  const contact = variant === "contact";
  const light = tone === "light";

  return (
    <ul
      className={cn(
        contact ? "space-y-3" : "flex flex-col gap-2.5 text-sm",
        className
      )}
    >
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.id];

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-200",
                contact
                  ? cn(
                      "flex items-start gap-4",
                      light ? "hover:text-hi-accent-soft" : "hover:text-hi-primary"
                    )
                  : "inline-flex items-center gap-3 hover:text-hi-accent"
              )}
            >
              {contact ? (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-hi-accent text-white">
                  <Icon className="size-5" />
                </span>
              ) : (
                <Icon className="size-4 shrink-0" />
              )}
              <span
                className={cn(
                  contact && "pt-2 text-sm leading-relaxed md:text-base",
                  contact && (light ? "text-white" : "text-hi-black")
                )}
              >
                {link.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
