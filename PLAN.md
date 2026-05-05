# Alwell Art — Portfolio Site Plan

A portfolio website for an artist friend. Inspired by the Ada Okeke mockup (warm dark palette, serif display, image-heavy).

## Goals & constraints

- **Phase 1 (now):** Contact-to-buy. Maintainer is the developer (you). Hosting budget: $0.
- **Phase 2 (later):** Real e-commerce. Artist self-manages content. Paid tiers acceptable.
- **Non-negotiables:** Production-grade from day one. Image performance, SEO, and accessibility cannot be "fixed later" — design choices today must not block them.

## Stack

### Core
| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Built-in image optimization, SSR/SSG, server actions, best-in-class SEO. Free. |
| Language | **TypeScript** (strict) | Catches schema drift when content layer swaps later. |
| Styling | **Tailwind CSS** + custom design tokens | Fast iteration, matches warm-dark/serif aesthetic via tokens. |
| UI primitives | **shadcn/ui** | Accessible Radix primitives we own and can restyle. |
| Fonts | `next/font` with a serif display + clean sans pairing | Self-hosted, no FOUT, no Google CDN dependency. |
| Icons | **lucide-react** | Tree-shakeable, matches shadcn. |

### Content layer (designed for swap)
| Phase | Source | Loader |
|---|---|---|
| Phase 1 | MDX / typed TS files in `/content` | `lib/content.ts` exports typed accessors |
| Phase 2 | **Sanity** (free tier) | Same `lib/content.ts` API — only the implementation changes |

The page components import from `lib/content.ts` and never touch the data source directly. This is the seam that lets us migrate without rewriting pages.

### Forms & email
- **Resend** (free: 3k emails/month) + Next.js **server actions** for the contact-to-buy form.
- Form state via **react-hook-form** + **zod** (input validation enforced at schema level — required fields, EmailStr-equivalent).

### Hosting & infra
- **Vercel** hobby tier (free): preview deploys, edge network, image optimization included.
- **GitHub** repo, main → production, PRs → preview URLs.
- Domain: register separately (~$12/yr — only non-zero cost).

### Phase 2 additions (not built yet, but architected for)
- **Stripe Checkout** for payments (no backend needed; drop-in).
- **Sanity** as CMS (artist self-edits).
- Inventory + work metadata moves into Sanity; pages stay unchanged.

## Site structure (from the mockup)

1. **Hero** — full-bleed portrait, nav, artist name (serif), short bio, two CTAs.
2. **Featured Works** — 4-up grid; each card links to a work detail page.
3. **About** — story blurb + photo of the artist.
4. **Collections** — categorized groupings (Paintings, Digital, Sculptures, Exhibitions) with item counts.
5. **Shop teaser** — "Own a piece" — currently routes to contact form prefilled with the work; later routes to Stripe.
6. **Press** — pull quotes + outlet logos.
7. **Footer** — newsletter, sitemap, socials, address.

### Routes
- `/` — landing
- `/work` — full grid
- `/work/[slug]` — single piece, with "Inquire to buy" CTA
- `/collections/[slug]` — filtered grid
- `/about`
- `/exhibitions`
- `/shop` — phase 1: same as `/work` with "Inquire" CTA. Phase 2: cart + checkout.
- `/contact`
- `/api/inquire` — server action handler (Resend)

## Data shape (locked early so the swap is mechanical)

```ts
// lib/content/types.ts
type Work = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions?: string;
  collection?: string;          // slug
  images: { src: string; alt: string; w: number; h: number }[];
  description?: string;
  forSale: boolean;
  price?: { amount: number; currency: 'USD' | 'NGN' };
};

type Collection = { slug: string; title: string; description?: string };
type PressQuote = { quote: string; author: string; outlet: string; logoSrc?: string };
type Exhibition = { title: string; venue: string; city: string; start: string; end?: string };
```

This shape maps 1:1 to a Sanity schema later.

## Performance & quality bar

- **Images:** every image goes through `next/image` with width/height; LCP image preloaded.
- **Lighthouse target:** 95+ across the board on production build before launch.
- **A11y:** keyboard-navigable, alt text required by type system (`alt: string`, not `alt?: string`), color contrast checked against the warm-dark palette.
- **SEO:** per-page metadata via `generateMetadata`, OpenGraph images per work, sitemap.xml, robots.txt.
- **Analytics:** Vercel Web Analytics (free tier) — privacy-friendly, no cookie banner needed.

## Security

- Contact form: zod validation server-side, rate-limited (Vercel KV free tier or Upstash free tier if needed), honeypot field, no email contents echoed back.
- No secrets in client bundle; Resend key in Vercel env vars only.
- CSP headers via `next.config.js` (script-src self, img-src self + Sanity CDN later).

## Repo layout

```
alwellart/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # landing
│   │   ├── work/
│   │   ├── collections/
│   │   ├── about/
│   │   └── contact/
│   ├── api/inquire/route.ts
│   └── layout.tsx
├── components/
│   ├── sections/                 # Hero, FeaturedWorks, About, etc.
│   └── ui/                       # shadcn-generated
├── content/                      # Phase 1 source of truth
│   ├── works/*.mdx
│   ├── collections.ts
│   └── press.ts
├── lib/
│   ├── content/                  # the swap seam
│   │   ├── types.ts
│   │   └── index.ts              # getWorks, getWork, getCollections, ...
│   └── email.ts                  # Resend client
├── public/images/                # static assets (optimized later via next/image)
├── styles/
└── PLAN.md                       # this file
```

## Build order

1. **Scaffold** — Next + TS + Tailwind + shadcn, design tokens, fonts, base layout.
2. **Content layer** — types, file-based loaders, 2–3 sample works to drive the UI.
3. **Sections** — Hero, FeaturedWorks, About, Collections, Press, Footer.
4. **Routes** — `/work`, `/work/[slug]`, `/collections/[slug]`, `/about`, `/contact`.
5. **Inquire flow** — server action + Resend + zod validation + rate limit.
6. **Polish** — metadata, OG images, sitemap, analytics, Lighthouse pass.
7. **Deploy** — Vercel + custom domain.
8. **Phase 2 (later):** Sanity migration + Stripe Checkout.

## Open decisions (resolve before scaffolding)

- [ ] Friend's name + handle (for branding, copy, domain).
- [ ] Domain choice (and who registers it).
- [ ] Currency for Phase 2 (USD, NGN, both?).
- [ ] Newsletter: skip for v1, or wire Resend audiences / Buttondown free tier?
- [ ] Exhibitions section: included in v1 or deferred?
