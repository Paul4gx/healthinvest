import type { Metadata } from "next";
import { LegalStub } from "@/components/layout/legal-stub";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `Accessibility Statement for ${SITE.name}`,
};

export default function AccessibilityPage() {
  return (
    <LegalStub
      title="Accessibility Statement"
      body="Health Invest Africa aims to meet WCAG 2.2 Level AA. This statement will be completed with contact routes for accessibility feedback before launch."
    />
  );
}

