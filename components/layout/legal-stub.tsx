import { Container } from "@/components/layout/container";

export function LegalStub({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-white pb-12 pt-24 md:pb-16 md:pt-28">
      <Container className="max-w-3xl">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] text-hi-ink">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-hi-black/85">{body}</p>
        <p className="mt-6 text-sm text-hi-muted">
          Placeholder — replace with counsel-approved copy before launch.
        </p>
      </Container>
    </section>
  );
}
