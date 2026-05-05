// Content shape — locked early so the Phase 2 swap to Sanity is mechanical.
// Page components import accessors from `lib/content`, never these files directly.

import type { SanityImageSource } from "@sanity/image-url";

// An image is either a Sanity asset (real, optimized via Sanity CDN) or a
// deterministic placeholder (gradient fallback when no asset is uploaded yet).
export type WorkImage =
  | {
      kind: "sanity";
      asset: SanityImageSource;
      alt: string;
      width?: number;
      height?: number;
    }
  | {
      kind: "placeholder";
      seed: string;
      alt: string;
    };

export type Currency = "USD" | "NGN";

export type Work = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions?: string;
  collection?: string;
  cover: WorkImage;
  images?: WorkImage[];
  description?: string;
  forSale: boolean;
  price?: { amount: number; currency: Currency };
  featured?: boolean;
};

export type Collection = {
  slug: string;
  title: string;
  description?: string;
  cover?: WorkImage;
};

export type PressQuote = {
  quote: string;
  author: string;
  outlet: string;
};

export type Exhibition = {
  title: string;
  venue: string;
  city: string;
  start: string; // ISO date
  end?: string;
};

export type SiteConfig = {
  // Identity
  artistName: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  socials: { label: string; href: string }[];

  // Hero
  heroEyebrow: string;
  heroImage?: WorkImage;

  // About section / page
  aboutEyebrow: string;
  aboutHeadline: string;
  aboutBody: string;
  portrait?: WorkImage;

  // Home — section headings
  featuredHeading: string;
  collectionsHeading: string;
  pressHeading: string;

  // Home — shop teaser
  shopTeaserEyebrow: string;
  shopTeaserHeadline: string;
  shopTeaserBody: string;
  shopTeaserImageA?: WorkImage;
  shopTeaserImageB?: WorkImage;

  // Page intros
  workPageHeading: string;
  workPageIntro: string;
  shopPageHeading: string;
  shopPageIntro: string;
  exhibitionsPageHeading: string;
  exhibitionsPageIntro: string;
  contactPageHeading: string;
  contactPageIntro: string;

  // Footer
  newsletterHeading: string;
  newsletterBody: string;
};
