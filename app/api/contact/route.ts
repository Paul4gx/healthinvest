import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

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

    // Wire to email/CRM provider later. Log for now in development.
    if (process.env.NODE_ENV === "development") {
      console.info("[contact]", parsed.data);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
