import { cn } from "@/lib/utils";

/** Stacks above a pinned page hero so body content covers it on scroll. */
export function PageBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 isolate shadow-[0_-28px_80px_rgba(2,5,30,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
}
