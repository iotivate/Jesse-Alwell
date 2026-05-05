"use server";

import { z } from "zod";
import { sendInquiryEmail } from "@/lib/email";

const InquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  message: z.string().trim().min(10, "Message is too short").max(4000),
  workSlug: z.string().trim().max(120).optional(),
  // Honeypot — bots fill hidden fields. Real users won't.
  company: z.string().max(0).optional(),
});

export type InquiryState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; fieldErrors?: Record<string, string>; message?: string };

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    workSlug: formData.get("workSlug") || undefined,
    company: formData.get("company") || undefined,
  };

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) return { status: "ok" };

  const result = await sendInquiryEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    workSlug: parsed.data.workSlug,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Couldn't send right now — please try again in a minute.",
    };
  }

  return { status: "ok" };
}
