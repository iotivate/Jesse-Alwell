import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/env";

// Sanity webhook handler. Configure in Sanity dashboard:
//   GROQ filter: *  (or narrower if you want)
//   Trigger: create / update / delete
//   HTTP method: POST
//   Secret: same value as SANITY_REVALIDATE_SECRET in Vercel env vars.
//
// On publish, Sanity POSTs here; we verify the signature and revalidate the
// affected route(s). Anything we don't recognize triggers a homepage refresh.

type Body = {
  _type?: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<Body>(req, revalidateSecret);
  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }
  if (!body?._type) {
    return new Response("Bad payload", { status: 400 });
  }

  const paths = pathsForChange(body);
  for (const p of paths) revalidatePath(p);

  return Response.json({ revalidated: true, paths });
}

function pathsForChange(body: Body): string[] {
  switch (body._type) {
    case "site":
      return ["/", "/about", "/contact", "/work", "/shop"];
    case "work":
      return [
        "/",
        "/work",
        "/shop",
        body.slug ? `/work/${body.slug}` : "/work",
      ];
    case "collection":
      return [
        "/",
        "/work",
        body.slug ? `/collections/${body.slug}` : "/work",
      ];
    case "press":
      return ["/"];
    case "exhibition":
      return ["/exhibitions"];
    default:
      return ["/"];
  }
}
