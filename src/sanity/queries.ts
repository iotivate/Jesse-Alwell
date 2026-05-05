import { groq } from "next-sanity";

const imageFields = groq`
  asset->{
    _id,
    metadata { dimensions { width, height } }
  },
  alt,
  hotspot,
  crop
`;

const workFields = groq`
  _id,
  "slug": slug.current,
  title,
  year,
  medium,
  dimensions,
  description,
  forSale,
  featured,
  "order": coalesce(order, 0),
  price,
  cover { ${imageFields} },
  "collection": collection->slug.current
`;

export const siteQuery = groq`*[_type == "site"][0]{
  artistName,
  tagline,
  bio,
  location,
  email,
  socials,

  heroEyebrow,
  heroImage { ${imageFields} },

  aboutEyebrow,
  aboutHeadline,
  aboutBody,
  portrait { ${imageFields} },

  featuredHeading,
  collectionsHeading,
  pressHeading,

  shopTeaserEyebrow,
  shopTeaserHeadline,
  shopTeaserBody,
  shopTeaserImageA { ${imageFields} },
  shopTeaserImageB { ${imageFields} },

  workPageHeading,
  workPageIntro,
  shopPageHeading,
  shopPageIntro,
  exhibitionsPageHeading,
  exhibitionsPageIntro,
  contactPageHeading,
  contactPageIntro,

  newsletterHeading,
  newsletterBody
}`;

export const allWorksQuery = groq`*[_type == "work"]
  | order(order asc, year desc) { ${workFields} }`;

export const featuredWorksQuery = groq`*[_type == "work" && featured == true]
  | order(order asc, year desc) [0...$limit] { ${workFields} }`;

export const workBySlugQuery = groq`*[_type == "work" && slug.current == $slug][0]{
  ${workFields},
  images[] { ${imageFields} }
}`;

export const allCollectionsQuery = groq`*[_type == "collection"]
  | order(order asc) {
    _id,
    "slug": slug.current,
    title,
    description,
    cover { ${imageFields} },
    "count": count(*[_type == "work" && references(^._id)])
  }`;

export const collectionBySlugQuery = groq`*[_type == "collection" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  description,
  cover { ${imageFields} },
  "works": *[_type == "work" && references(^._id)]
    | order(order asc, year desc) { ${workFields} }
}`;

export const allPressQuery = groq`*[_type == "press"]
  | order(order asc) { quote, author, outlet }`;

export const allExhibitionsQuery = groq`*[_type == "exhibition"]
  | order(start desc) { title, venue, city, start, end }`;
