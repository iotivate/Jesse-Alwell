import type { StructureResolver } from "sanity/structure";

// Custom Studio sidebar:
// - "Site settings" appears as a single editable doc (singleton).
// - Other types appear as ordinary lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("site")
        .child(
          S.document()
            .schemaType("site")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
      S.divider(),
      S.documentTypeListItem("work").title("Works"),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("press").title("Press"),
      S.documentTypeListItem("exhibition").title("Exhibitions"),
    ]);
