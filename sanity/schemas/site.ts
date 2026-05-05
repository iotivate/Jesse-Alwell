import { defineField, defineType } from "sanity";

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ],
  });

// Singleton — there's only one Site document. Studio prevents creating more.
export const site = defineType({
  name: "site",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "sections", title: "Home sections" },
    { name: "shopTeaser", title: "Shop teaser" },
    { name: "pages", title: "Page intros" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ── General ──────────────────────────────────────────────────────────────
    defineField({
      name: "artistName",
      title: "Artist name",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      description: "Shown in the hero, under the name.",
      group: "general",
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 2,
      group: "general",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Abuja, Nigeria",
      group: "general",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (r) => r.email(),
      group: "general",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "general",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),

    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow text",
      type: "string",
      description: 'Small caps text above the artist name. Default: "Visual Artist".',
      group: "hero",
    }),
    {
      ...imageField(
        "heroImage",
        "Hero image",
        "Full-bleed background behind the artist name. 2400px+ wide; off-center subjects work well.",
      ),
      group: "hero",
    },

    // ── About ────────────────────────────────────────────────────────────────
    defineField({
      name: "aboutEyebrow",
      title: "Eyebrow text",
      type: "string",
      description: 'Small caps tag. Default: "About the Artist".',
      group: "about",
    }),
    defineField({
      name: "aboutHeadline",
      title: "Headline",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Body",
      type: "text",
      rows: 6,
      group: "about",
    }),
    {
      ...imageField(
        "portrait",
        "Portrait photo",
        "Shown in the About section and on the About page.",
      ),
      group: "about",
    },

    // ── Home — section headings ──────────────────────────────────────────────
    defineField({
      name: "featuredHeading",
      title: "Featured Works heading",
      type: "string",
      description: 'Default: "Featured Works".',
      group: "sections",
    }),
    defineField({
      name: "collectionsHeading",
      title: "Collections heading",
      type: "string",
      description: 'Default: "Collections".',
      group: "sections",
    }),
    defineField({
      name: "pressHeading",
      title: "Press heading",
      type: "string",
      description: 'Default: "In the Press".',
      group: "sections",
    }),

    // ── Shop teaser ──────────────────────────────────────────────────────────
    defineField({
      name: "shopTeaserEyebrow",
      title: "Eyebrow text",
      type: "string",
      group: "shopTeaser",
    }),
    defineField({
      name: "shopTeaserHeadline",
      title: "Headline",
      type: "string",
      group: "shopTeaser",
    }),
    defineField({
      name: "shopTeaserBody",
      title: "Body",
      type: "text",
      rows: 3,
      group: "shopTeaser",
    }),
    {
      ...imageField(
        "shopTeaserImageA",
        "Image — left",
        "Optional. Falls back to a gradient panel if empty.",
      ),
      group: "shopTeaser",
    },
    {
      ...imageField(
        "shopTeaserImageB",
        "Image — right",
        "Optional. Falls back to a gradient panel if empty.",
      ),
      group: "shopTeaser",
    },

    // ── Page intros ──────────────────────────────────────────────────────────
    defineField({
      name: "workPageHeading",
      title: "Work page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "workPageIntro",
      title: "Work page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),
    defineField({
      name: "shopPageHeading",
      title: "Shop page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "shopPageIntro",
      title: "Shop page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),
    defineField({
      name: "exhibitionsPageHeading",
      title: "Exhibitions page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "exhibitionsPageIntro",
      title: "Exhibitions page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),
    defineField({
      name: "contactPageHeading",
      title: "Contact page — heading",
      type: "string",
      group: "pages",
    }),
    defineField({
      name: "contactPageIntro",
      title: "Contact page — intro",
      type: "text",
      rows: 3,
      group: "pages",
    }),

    // ── Footer ───────────────────────────────────────────────────────────────
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter blurb",
      type: "text",
      rows: 2,
      group: "footer",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
