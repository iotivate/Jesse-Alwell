import { createClient, type SanityClient } from "@sanity/client";
import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  readToken,
} from "./env";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Pages are revalidated by webhook; CDN cache is fine for reads.
      useCdn: true,
      perspective: "published",
    })
  : null;

// Authenticated client for previewing drafts (Phase 2.5 if we add preview).
export const draftClient: SanityClient | null =
  isSanityConfigured && readToken
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: readToken,
        perspective: "drafts",
      })
    : null;
