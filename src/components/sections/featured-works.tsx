import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedWorks, getSite } from "@/lib/content";
import { WorkImage } from "@/components/work-image";

export async function FeaturedWorks() {
  const [works, site] = await Promise.all([getFeaturedWorks(4), getSite()]);
  return (
    <section className="bg-ink-800 py-20 lg:py-28">
      <div className="mx-auto max-w-(--container-page) px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {site.featuredHeading}
          </h2>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cream/70 hover:text-cream"
          >
            <span className="hidden sm:inline">View All Works</span>
            <span className="sm:hidden">All Works</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {works.map((w) => (
            <li key={w.slug}>
              <Link href={`/work/${w.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <WorkImage
                    image={w.cover}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-base tracking-tight sm:text-lg">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/60 sm:text-xs">
                    {w.medium} · {w.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
