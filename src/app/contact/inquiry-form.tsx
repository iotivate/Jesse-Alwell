"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitInquiry, type InquiryState } from "./actions";

const initial: InquiryState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send Inquiry"}
    </Button>
  );
}

export function InquiryForm({ workSlug }: { workSlug?: string }) {
  const [state, formAction] = useActionState(submitInquiry, initial);

  if (state.status === "ok") {
    return (
      <div className="border border-ochre-500/40 bg-ochre-500/5 p-8">
        <h2 className="font-display text-2xl">Thanks — message received.</h2>
        <p className="mt-3 text-cream/70">
          You&apos;ll hear back within a few days. For urgent inquiries, email
          directly.
        </p>
      </div>
    );
  }

  const fieldErrors =
    state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      {workSlug && <input type="hidden" name="workSlug" value={workSlug} />}

      {/* Honeypot — kept out of tab order and visually hidden. */}
      <div aria-hidden className="hidden">
        <label>
          Company (leave empty)
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
        />
        {fieldErrors.name && (
          <p className="text-xs text-ochre-300">{fieldErrors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
        />
        {fieldErrors.email && (
          <p className="text-xs text-ochre-300">{fieldErrors.email}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">
          {workSlug ? `Message about "${workSlug}"` : "Message"}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message && (
          <p className="text-xs text-ochre-300">{fieldErrors.message}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-ochre-300">{state.message}</p>
      )}

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
