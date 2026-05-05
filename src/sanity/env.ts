// Tolerant env access. If Sanity isn't configured, the content layer falls
// back to the in-repo placeholder data so the site keeps working during
// initial setup. `isSanityConfigured` is the gate.

// Some hosting UIs let editors paste values with stray whitespace or wrapping
// quotes; clean those before they reach Sanity, which is strict about format.
function clean(v: string | undefined): string {
  if (!v) return "";
  return v.trim().replace(/^["']|["']$/g, "").trim();
}

export const projectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const dataset =
  clean(process.env.NEXT_PUBLIC_SANITY_DATASET) || "production";
export const apiVersion =
  clean(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || "2025-01-01";

// Optional — only needed for previewing draft content.
export const readToken = clean(process.env.SANITY_API_READ_TOKEN);

// Used to verify webhook signatures from Sanity.
export const revalidateSecret = clean(process.env.SANITY_REVALIDATE_SECRET);

// Sanity project IDs are a-z, 0-9, and dashes only. Refuse to mark as
// configured if the value is malformed — better to fall back to placeholders
// than to crash at request time with a cryptic Sanity error.
const PROJECT_ID_RE = /^[a-z0-9-]+$/;
export const isSanityConfigured =
  projectId.length > 0 && PROJECT_ID_RE.test(projectId);

let warned = false;
export function warnFallbackOnce() {
  if (warned) return;
  warned = true;
  if (projectId.length > 0 && !PROJECT_ID_RE.test(projectId)) {
    // eslint-disable-next-line no-console
    console.warn(
      `[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID="${projectId}" is malformed (must be a-z, 0-9, or dashes). Falling back to placeholder content.`,
    );
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — serving placeholder content from /src/content. Set it in .env.local once your Sanity project exists.",
  );
}
