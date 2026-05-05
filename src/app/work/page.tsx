import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { WorkImage } from "@/components/work-image";
import { getSite, getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected works — paintings, digital art, and sculpture.",
};

export default async function WorkIndex() {
  const [works, site] = await Promise.all([getWorks(), getSite()]);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-ochre-300">
            Portfolio
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
            {site.workPageHeading}
          </h1>
          {site.workPageIntro && (
            <p className="mt-4 max-w-xl text-cream/70">{site.workPageIntro}</p>
          )}
        </header>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {works.map((w) => (
            <li key={w.slug}>
              <Link href={`/work/${w.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <WorkImage
                    image={w.cover}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="font-display text-lg tracking-tight sm:text-xl">
                    {w.title}
                  </h2>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/60 sm:text-xs">
                    {w.medium} · {w.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
