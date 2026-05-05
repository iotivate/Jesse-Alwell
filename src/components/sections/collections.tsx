import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCollections, getSite } from "@/lib/content";

export async function Collections() {
  const [collections, site] = await Promise.all([
    getCollections(),
    getSite(),
  ]);
  return (
    <section className="bg-ink-800 py-20 lg:py-28">
      <div className="mx-auto max-w-(--container-page) px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {site.collectionsHeading}
          </h2>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cream/70 hover:text-cream"
          >
            Explore All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-px bg-cream/10 lg:grid-cols-4">
          {collections.map((c) => (
            <li key={c.slug} className="bg-ink-800">
              <Link
                href={`/collections/${c.slug}`}
                className="group flex aspect-square flex-col justify-between p-6 transition-colors hover:bg-ink-700"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-cream/50">
                  {c.count} {c.count === 1 ? "work" : "works"}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-tight">
                    {c.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cream/70 transition-colors group-hover:text-ochre-300">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
