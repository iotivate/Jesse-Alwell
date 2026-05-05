import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { WorkImage } from "@/components/work-image";
import { getSite, getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description: "Available works — inquire to purchase.",
};

export default async function ShopPage() {
  const [allWorks, site] = await Promise.all([getWorks(), getSite()]);
  const works = allWorks.filter((w) => w.forSale);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-ochre-300">
          Shop
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
          {site.shopPageHeading}
        </h1>
        <p className="mt-4 max-w-xl text-cream/70">{site.shopPageIntro}</p>

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
                <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="font-display text-lg tracking-tight sm:text-xl">
                    {w.title}
                  </h2>
                  {w.price && (
                    <span className="text-xs uppercase tracking-[0.18em] text-cream/70">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: w.price.currency,
                        maximumFractionDigits: 0,
                      }).format(w.price.amount)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream/60 sm:text-xs">
                  {w.medium} · {w.year}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
