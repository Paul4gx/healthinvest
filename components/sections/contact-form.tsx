"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui/cta-button";

const ENQUIRY_OPTIONS: { value: ContactFormValues["enquiryType"]; label: string }[] = [
  { value: "partnership", label: "Partnership" },
  { value: "investment", label: "Investment" },
  { value: "media", label: "Media" },
  { value: "careers", label: "Careers" },
  { value: "corporate", label: "Corporate" },
  { value: "other", label: "Other" },
];

const ENQUIRY_VALUES = ENQUIRY_OPTIONS.map((o) => o.value);

function resolveEnquiry(
  value: string | null | undefined
): ContactFormValues["enquiryType"] {
  return ENQUIRY_VALUES.includes(value as ContactFormValues["enquiryType"])
    ? (value as ContactFormValues["enquiryType"])
    : "corporate";
}

export function ContactForm({
  className,
  defaultEnquiry,
}: {
  className?: string;
  defaultEnquiry?: ContactFormValues["enquiryType"];
}) {
  const searchParams = useSearchParams();
  const enquiryDefault = resolveEnquiry(
    defaultEnquiry ?? searchParams.get("intent")
  );
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      enquiryType: enquiryDefault,
      privacy: false,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset({
        enquiryType: enquiryDefault,
        privacy: false,
        name: "",
        organisation: "",
        email: "",
        telephone: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex h-full flex-col rounded-none bg-hi-surface p-6 shadow-sm md:p-8",
        className
      )}
      noValidate
    >
      <h2 className="mb-2 text-[clamp(1.75rem,3vw,2rem)] font-normal tracking-[-0.02em] text-hi-ink">
        Corporate enquiry form
      </h2>
      <p className="mb-6 text-sm text-hi-muted">
        Please do not submit confidential medical information. For clinical enquiries,
        contact the relevant healthcare platform directly.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name*" error={errors.name?.message} id="name">
          <Input
            id="name"
            autoComplete="name"
            className="h-[50px] rounded-none border-transparent bg-white px-4"
            {...register("name")}
          />
        </Field>
        <Field
          label="Organisation*"
          error={errors.organisation?.message}
          id="organisation"
        >
          <Input
            id="organisation"
            autoComplete="organization"
            className="h-[50px] rounded-none border-transparent bg-white px-4"
            {...register("organisation")}
          />
        </Field>
        <Field label="Work email*" error={errors.email?.message} id="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-[50px] rounded-none border-transparent bg-white px-4"
            {...register("email")}
          />
        </Field>
        <Field label="Telephone (optional)" error={errors.telephone?.message} id="telephone">
          <Input
            id="telephone"
            type="tel"
            autoComplete="tel"
            className="h-[50px] rounded-none border-transparent bg-white px-4"
            {...register("telephone")}
          />
        </Field>
        <Field
          label="Enquiry type*"
          error={errors.enquiryType?.message}
          id="enquiryType"
          className="sm:col-span-2"
        >
          <select
            id="enquiryType"
            className="h-[50px] w-full rounded-none border-transparent bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-hi-primary"
            {...register("enquiryType")}
          >
            {ENQUIRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Message*"
          error={errors.message?.message}
          id="message"
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            rows={5}
            className="min-h-[145px] rounded-none border-transparent bg-white px-4 py-3"
            {...register("message")}
          />
        </Field>
      </div>

      <div className="mt-4">
        <label className="flex items-start gap-3 text-sm text-hi-black/85">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded-none border-hi-black/20"
            {...register("privacy")}
          />
          <span>
            I acknowledge that my information will be processed in accordance with the{" "}
            <a href="/privacy" className="text-hi-primary underline-offset-2 hover:underline">
              Health Invest Africa Privacy Notice
            </a>
            .
          </span>
        </label>
        {errors.privacy?.message ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.privacy.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <CtaButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send Enquiry"}
        </CtaButton>
        {status === "success" ? (
          <p className="text-sm text-emerald-700" role="status">
            Enquiry sent. We’ll be in touch.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600" role="alert">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
