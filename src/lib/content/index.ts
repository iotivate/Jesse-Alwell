// The seam: page components import only from this module. When Sanity is
// configured (NEXT_PUBLIC_SANITY_PROJECT_ID set), all reads go to the CMS;
// otherwise we fall back to the in-repo placeholder content so the site
// keeps working through the initial setup.

import { works as worksData } from "@/content/works";
import { collections as collectionsData } from "@/content/collections";
import { press as pressData } from "@/content/press";
import { site as siteData } from "@/content/site";
import { client } from "@/sanity/client";
import { isSanityConfigured, warnFallbackOnce } from "@/sanity/env";
import {
  allCollectionsQuery,
  allExhibitionsQuery,
  allPressQuery,
  allWorksQuery,
  collectionBySlugQuery,
  featuredWorksQuery,
  siteQuery,
  workBySlugQuery,
} from "@/sanity/queries";
import type {
  Collection,
  Exhibition,
  PressQuote,
  SiteConfig,
  Work,
  WorkImage,
} from "./types";

// ── Sanity → app-type mappers ────────────────────────────────────────────────

type SanityImage = {
  asset?: {
    _id: string;
    metadata?: { dimensions?: { width: number; height: number } };
  } | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
};

function mapImage(img: SanityImage | null | undefined, fallbackSeed: string): WorkImage {
  if (!img?.asset) {
    return { kind: "placeholder", seed: fallbackSeed, alt: img?.alt ?? "Artwork" };
  }
  return {
    kind: "sanity",
    asset: img,
    alt: img.alt ?? "Artwork",
    width: img.asset.metadata?.dimensions?.width,
    height: img.asset.metadata?.dimensions?.height,
  };
}

function mapImageOptional(
  img: SanityImage | null | undefined,
): WorkImage | undefined {
  return img?.asset ? mapImage(img, "image") : undefined;
}

type SanityWork = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions?: string;
  collection?: string;
  cover: SanityImage;
  images?: SanityImage[];
  description?: string;
  forSale?: boolean;
  price?: { amount: number; currency: "USD" | "NGN" };
  featured?: boolean;
};

function mapWork(w: SanityWork): Work {
  return {
    slug: w.slug,
    title: w.title,
    year: w.year,
    medium: w.medium,
    dimensions: w.dimensions ?? undefined,
    collection: w.collection ?? undefined,
    cover: mapImage(w.cover, w.slug),
    images: w.images?.length
      ? w.images.map((img, i) => mapImage(img, `${w.slug}-${i}`))
      : undefined,
    description: w.description ?? undefined,
    forSale: Boolean(w.forSale),
    price: w.price ?? undefined,
    featured: Boolean(w.featured),
  };
}

// Null/empty-coalesce: prefer `value`, fall back to `fallback`.
function nz<T extends string>(
  value: T | null | undefined,
  fallback: T,
): T {
  return value && value.length > 0 ? value : fallback;
}

// ── Public accessors ─────────────────────────────────────────────────────────

type RawSite = {
  [K in keyof SiteConfig]?: SiteConfig[K] | null;
} & {
  heroImage?: SanityImage | null;
  portrait?: SanityImage | null;
  shopTeaserImageA?: SanityImage | null;
  shopTeaserImageB?: SanityImage | null;
};

export async function getSite(): Promise<SiteConfig> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return siteData;
  }
  const r = await client.fetch<RawSite | null>(siteQuery);
  return {
    artistName: nz(r?.artistName, siteData.artistName),
    tagline: nz(r?.tagline, siteData.tagline),
    bio: nz(r?.bio, siteData.bio),
    location: nz(r?.location, siteData.location),
    email: nz(r?.email, siteData.email),
    socials: r?.socials?.length ? r.socials : siteData.socials,

    heroEyebrow: nz(r?.heroEyebrow, siteData.heroEyebrow),
    heroImage: mapImageOptional(r?.heroImage) ?? siteData.heroImage,

    aboutEyebrow: nz(r?.aboutEyebrow, siteData.aboutEyebrow),
    aboutHeadline: nz(r?.aboutHeadline, siteData.aboutHeadline),
    aboutBody: nz(r?.aboutBody, siteData.aboutBody),
    portrait: mapImageOptional(r?.portrait) ?? siteData.portrait,

    featuredHeading: nz(r?.featuredHeading, siteData.featuredHeading),
    collectionsHeading: nz(r?.collectionsHeading, siteData.collectionsHeading),
    pressHeading: nz(r?.pressHeading, siteData.pressHeading),

    shopTeaserEyebrow: nz(r?.shopTeaserEyebrow, siteData.shopTeaserEyebrow),
    shopTeaserHeadline: nz(r?.shopTeaserHeadline, siteData.shopTeaserHeadline),
    shopTeaserBody: nz(r?.shopTeaserBody, siteData.shopTeaserBody),
    shopTeaserImageA:
      mapImageOptional(r?.shopTeaserImageA) ?? siteData.shopTeaserImageA,
    shopTeaserImageB:
      mapImageOptional(r?.shopTeaserImageB) ?? siteData.shopTeaserImageB,

    workPageHeading: nz(r?.workPageHeading, siteData.workPageHeading),
    workPageIntro: r?.workPageIntro ?? siteData.workPageIntro,
    shopPageHeading: nz(r?.shopPageHeading, siteData.shopPageHeading),
    shopPageIntro: nz(r?.shopPageIntro, siteData.shopPageIntro),
    exhibitionsPageHeading: nz(
      r?.exhibitionsPageHeading,
      siteData.exhibitionsPageHeading,
    ),
    exhibitionsPageIntro: nz(
      r?.exhibitionsPageIntro,
      siteData.exhibitionsPageIntro,
    ),
    contactPageHeading: nz(r?.contactPageHeading, siteData.contactPageHeading),
    contactPageIntro: nz(r?.contactPageIntro, siteData.contactPageIntro),

    newsletterHeading: nz(r?.newsletterHeading, siteData.newsletterHeading),
    newsletterBody: nz(r?.newsletterBody, siteData.newsletterBody),
  };
}

export async function getWorks(): Promise<Work[]> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return worksData;
  }
  const result = await client.fetch<SanityWork[]>(allWorksQuery);
  return result.map(mapWork);
}

export async function getFeaturedWorks(limit = 4): Promise<Work[]> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return worksData.filter((w) => w.featured).slice(0, limit);
  }
  const result = await client.fetch<SanityWork[]>(featuredWorksQuery, { limit });
  return result.map(mapWork);
}

export async function getWork(slug: string): Promise<Work | undefined> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return worksData.find((w) => w.slug === slug);
  }
  const result = await client.fetch<SanityWork | null>(workBySlugQuery, { slug });
  return result ? mapWork(result) : undefined;
}

export async function getCollections(): Promise<
  (Collection & { count: number })[]
> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return collectionsData.map((c) => ({
      ...c,
      count: worksData.filter((w) => w.collection === c.slug).length,
    }));
  }
  type Row = Collection & { count: number };
  return client.fetch<Row[]>(allCollectionsQuery);
}

export async function getCollection(
  slug: string,
): Promise<(Collection & { works: Work[] }) | undefined> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    const c = collectionsData.find((x) => x.slug === slug);
    if (!c) return undefined;
    return { ...c, works: worksData.filter((w) => w.collection === slug) };
  }
  type Row = Collection & { works: SanityWork[] };
  const row = await client.fetch<Row | null>(collectionBySlugQuery, { slug });
  if (!row) return undefined;
  return { ...row, works: row.works.map(mapWork) };
}

export async function getPress(): Promise<PressQuote[]> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return pressData;
  }
  return client.fetch<PressQuote[]>(allPressQuery);
}

export async function getExhibitions(): Promise<Exhibition[]> {
  if (!isSanityConfigured || !client) {
    warnFallbackOnce();
    return [];
  }
  return client.fetch<Exhibition[]>(allExhibitionsQuery);
}

export type {
  Collection,
  Exhibition,
  PressQuote,
  SiteConfig,
  Work,
  WorkImage,
} from "./types";
