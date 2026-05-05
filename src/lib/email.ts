import { Resend } from "resend";

// Lazy: only construct the client when actually sending. This lets the app
// build and run without RESEND_API_KEY set (dev / preview).
function getClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

type InquiryEmail = {
  name: string;
  email: string;
  message: string;
  workSlug?: string;
};

export async function sendInquiryEmail(payload: InquiryEmail) {
  const client = getClient();
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!client || !to || !from) {
    // No-op in dev / preview — surface the payload to the server log so
    // the developer can see the form actually wired through.
    console.info("[inquiry] email not configured, payload:", payload);
    return { ok: true as const, delivered: false as const };
  }

  const subject = payload.workSlug
    ? `Inquiry — ${payload.workSlug}`
    : `New inquiry from ${payload.name}`;

  const { error } = await client.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject,
    text: [
      `From: ${payload.name} <${payload.email}>`,
      payload.workSlug ? `Work: ${payload.workSlug}` : null,
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[inquiry] resend error:", error);
    return { ok: false as const, error: "send_failed" as const };
  }

  return { ok: true as const, delivered: true as const };
}
