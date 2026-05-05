import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WorkImage } from "@/components/work-image";
import { getSite } from "@/lib/content";

export async function About() {
  const site = await getSite();
  const portrait = site.portrait ?? {
    kind: "placeholder" as const,
    seed: "portrait",
    alt: `Portrait of ${site.artistName}`,
  };
  return (
    <section className="bg-cream text-ink-900 py-20 lg:py-28">
      <div className="mx-auto grid max-w-(--container-page) gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden">
          <WorkImage
            image={portrait}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ochre-700">
            {site.aboutEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            {site.aboutHeadline}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
            {site.aboutBody}
          </p>
          <div className="mt-8">
            <Link href="/about">
              <Button variant="accent">Read Full Bio</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
