/* eslint-disable no-console */
// Seeds the Sanity dataset with the placeholder content from /src/content.
// Idempotent — re-running the script overwrites existing docs by stable _id,
// so feel free to run it multiple times during early setup.
//
// Usage:
//   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
//      SANITY_WRITE_TOKEN in .env.local. The write token must have Editor
//      or Admin scope (Sanity dashboard → API → Tokens → Create).
//   2. `npm run seed`
//
// Images aren't seeded — your friend uploads those in the Studio.

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import path from "node:path";
import { works } from "../src/content/works";
import { collections } from "../src/content/collections";
import { press } from "../src/content/press";
import { site } from "../src/content/site";

config({ path: path.resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN in .env.local — create one in the Sanity dashboard with Editor scope.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function main() {
  console.log(`Seeding project=${projectId} dataset=${dataset}…`);

  // Collections first — works reference them.
  for (const c of collections) {
    const _id = `collection.${c.slug}`;
    await client.createOrReplace({
      _id,
      _type: "collection",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      description: c.description,
      order: collections.indexOf(c),
    });
    console.log(`  collection ${c.slug}`);
  }

  // Site singleton.
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "site",
    artistName: site.artistName,
    tagline: site.tagline,
    bio: site.bio,
    aboutHeadline: site.aboutHeadline,
    aboutBody: site.aboutBody,
    location: site.location,
    email: site.email,
    socials: site.socials.map((s, i) => ({
      _key: `social-${i}`,
      label: s.label,
      href: s.href,
    })),
  });
  console.log("  site settings");

  // Works.
  for (const w of works) {
    const _id = `work.${w.slug}`;
    await client.createOrReplace({
      _id,
      _type: "work",
      title: w.title,
      slug: { _type: "slug", current: w.slug },
      year: w.year,
      medium: w.medium,
      dimensions: w.dimensions,
      description: w.description,
      forSale: w.forSale,
      featured: w.featured ?? false,
      order: works.indexOf(w),
      price: w.price,
      collection: w.collection
        ? { _type: "reference", _ref: `collection.${w.collection}` }
        : undefined,
    });
    console.log(`  work ${w.slug}`);
  }

  // Press quotes.
  for (let i = 0; i < press.length; i++) {
    const p = press[i];
    await client.createOrReplace({
      _id: `press.${i}`,
      _type: "press",
      quote: p.quote,
      author: p.author,
      outlet: p.outlet,
      order: i,
    });
    console.log(`  press ${i}`);
  }

  console.log("✓ done. Open /studio to edit.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
