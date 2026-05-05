import { defineField, defineType } from "sanity";

export const exhibition = defineType({
  name: "exhibition",
  title: "Exhibition",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "start",
      title: "Start date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "end",
      title: "End date",
      type: "date",
    }),
  ],
  orderings: [
    {
      title: "Most recent first",
      name: "startDesc",
      by: [{ field: "start", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "venue", date: "start" },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: [subtitle, date ? new Date(date).getFullYear() : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
