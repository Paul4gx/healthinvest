import type { Metadata } from "next";
import { LegalStub } from "@/components/layout/legal-stub";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `Privacy Notice for ${SITE.name}`,
};

export default function PrivacyPage() {
  return (
    <LegalStub
      title="Privacy Notice"
      body="This page will publish the approved Health Invest Africa Privacy Notice before analytics and production contact forms are enabled. Until then, please do not submit confidential medical information through the corporate enquiry form."
    />
  );
}
