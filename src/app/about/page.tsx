import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { WorkImage } from "@/components/work-image";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About the artist.",
};

export default async function AboutPage() {
  const site = await getSite();
  const portrait = site.portrait ?? {
    kind: "placeholder" as const,
    seed: "portrait",
    alt: `Portrait of ${site.artistName}`,
  };
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-ochre-300">
          About
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
          {site.aboutHeadline}
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="relative aspect-[4/5] w-full max-w-md">
            <WorkImage
              image={portrait}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-cream/85">
              {site.aboutBody}
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream/70">
              Based in {site.location}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
