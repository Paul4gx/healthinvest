import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

/**
 * Optional server proxy for contact submissions.
 * The contact form posts directly to Formspree (works on static hosting too).
 * This route remains available for Node deployments / future spam checks.
 */
const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ??
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  "https://formspree.io/f/xoeqbzbb";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const values = parsed.data;
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        organisation: values.organisation,
        email: values.email,
        telephone: values.telephone || "",
        enquiryType: values.enquiryType,
        message: values.message,
        _replyto: values.email,
        _subject: `HIA enquiry: ${values.enquiryType}`,
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error ?? "Formspree error" },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
