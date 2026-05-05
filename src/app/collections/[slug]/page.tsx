import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { WorkImage } from "@/components/work-image";
import { getCollection, getCollections } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCollection(slug);
  if (!c) return {};
  return { title: c.title, description: c.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <Link
          href="/work"
          className="text-xs uppercase tracking-[0.18em] text-cream/60 hover:text-cream"
        >
          ← All Work
        </Link>
        <header className="mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ochre-300">
            Collection
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="mt-4 max-w-xl text-base text-cream/70">
              {collection.description}
            </p>
          )}
        </header>

        {collection.works.length === 0 ? (
          <p className="mt-12 text-cream/60">No works in this collection yet.</p>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {collection.works.map((w) => (
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
        )}
      </main>
      <Footer />
    </>
  );
}
