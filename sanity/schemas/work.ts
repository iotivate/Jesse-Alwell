import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Additional images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required().min(1900).max(2100),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      description: "Oil on canvas, Bronze, Digital archival print, etc.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "e.g. 120 × 90 cm",
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "forSale",
      title: "For sale",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "object",
      fields: [
        defineField({
          name: "amount",
          title: "Amount",
          type: "number",
          validation: (r) => r.min(0),
        }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          options: { list: ["USD", "NGN"] },
          initialValue: "USD",
        }),
      ],
      hidden: ({ parent }) => !parent?.forSale,
    }),
    defineField({
      name: "featured",
      title: "Featured on landing",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year, newest first",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "cover",
    },
    prepare({ title, year, media }) {
      return { title, subtitle: year ? String(year) : undefined, media };
    },
  },
});
