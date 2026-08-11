import type { Metadata } from "next";
import { LegalStub } from "@/components/layout/legal-stub";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: `Cookie Notice for ${SITE.name}`,
};

export default function CookiesPage() {
  return (
    <LegalStub
      title="Cookie Notice"
      body="This Cookie Notice will explain how Health Invest Africa uses essential and optional cookies once approved legal copy and consent requirements are confirmed."
    />
  );
}

