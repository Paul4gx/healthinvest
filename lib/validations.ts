import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  organisation: z.string().min(2, "Please enter your organisation"),
  email: z.string().email("Enter a valid work email address"),
  telephone: z.string().optional(),
  enquiryType: z.enum(
    ["partnership", "investment", "media", "careers", "corporate", "other"],
    { required_error: "Select an enquiry type" }
  ),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Please acknowledge the Privacy Notice",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
