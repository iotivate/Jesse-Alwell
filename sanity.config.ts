import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "Alwell Art",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Singleton: never offer "create" in the global "+" for site.
    templates: (prev) => prev.filter((t) => t.schemaType !== "site"),
  },
  document: {
    // Hide "duplicate" / "delete" actions on the singleton.
    actions: (prev, { schemaType }) =>
      schemaType === "site"
        ? prev.filter(
            (a) =>
              a.action !== undefined &&
              !["unpublish", "delete", "duplicate"].includes(a.action),
          )
        : prev,
  },
});
