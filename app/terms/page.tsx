import type { Metadata } from "next";
import { LegalStub } from "@/components/layout/legal-stub";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${SITE.name}`,
};

export default function TermsPage() {
  return (
    <LegalStub
      title="Terms of Use"
      body="Approved Terms of Use for healthinvest.com.ng will be published here before public launch."
    />
  );
}

