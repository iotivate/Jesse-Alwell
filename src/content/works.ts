import type { Work, WorkImage } from "@/lib/content/types";

const placeholder = (slug: string): WorkImage => ({
  kind: "placeholder",
  seed: slug,
  alt: "Artwork preview",
});

export const works: Work[] = [
  {
    slug: "echoes-of-her",
    title: "Echoes of Her",
    year: 2025,
    medium: "Oil on canvas",
    dimensions: "120 × 90 cm",
    collection: "paintings",
    cover: placeholder("echoes-of-her"),
    description:
      "A study of memory and inheritance. The figure dissolves at the edges into the textures of her grandmother's wrapper.",
    forSale: true,
    price: { amount: 4200, currency: "USD" },
    featured: true,
  },
  {
    slug: "thoughts-untamed",
    title: "Thoughts Untamed",
    year: 2024,
    medium: "Mixed media on canvas",
    dimensions: "100 × 80 cm",
    collection: "paintings",
    cover: placeholder("thoughts-untamed"),
    description:
      "An interior portrait — the sitter's face rendered with restraint, the air around her in chaos.",
    forSale: true,
    price: { amount: 3600, currency: "USD" },
    featured: true,
  },
  {
    slug: "quiet-strength",
    title: "Quiet Strength",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: "90 × 70 cm",
    collection: "paintings",
    cover: placeholder("quiet-strength"),
    description:
      "Part of an ongoing series on stillness as a form of resistance.",
    forSale: false,
    featured: true,
  },
  {
    slug: "beyond-the-surface",
    title: "Beyond the Surface",
    year: 2023,
    medium: "Digital, archival print",
    dimensions: "Edition of 12, 60 × 80 cm",
    collection: "digital",
    cover: placeholder("beyond-the-surface"),
    description:
      "A digital-native work exploring what the brushstroke becomes when it is no longer bound by physics.",
    forSale: true,
    price: { amount: 1800, currency: "USD" },
    featured: true,
  },
  {
    slug: "fragments",
    title: "Fragments",
    year: 2023,
    medium: "Bronze",
    dimensions: "42 cm tall",
    collection: "sculptures",
    cover: placeholder("fragments"),
    description: "Cast bronze, patinated.",
    forSale: true,
    price: { amount: 6800, currency: "USD" },
  },
  {
    slug: "interior-light",
    title: "Interior Light",
    year: 2025,
    medium: "Oil on canvas",
    dimensions: "80 × 60 cm",
    collection: "paintings",
    cover: placeholder("interior-light"),
    description: "Late afternoon, studio window, the model resting.",
    forSale: true,
    price: { amount: 2900, currency: "USD" },
  },
];
