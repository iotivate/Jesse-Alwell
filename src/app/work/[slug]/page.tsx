import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { WorkImage } from "@/components/work-image";
import { Button } from "@/components/ui/button";
import { getWork, getWorks } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description ?? `${work.title} — ${work.medium}, ${work.year}.`,
  };
}

function formatPrice(p: { amount: number; currency: "USD" | "NGN" }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: p.currency,
    maximumFractionDigits: 0,
  }).format(p.amount);
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-12 lg:px-10 lg:py-16">
        <Link
          href="/work"
          className="text-xs uppercase tracking-[0.18em] text-cream/60 hover:text-cream"
        >
          ← All Work
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <WorkImage
              image={work.cover}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="lg:pt-6">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
              {work.title}
            </h1>
            <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-cream/50 uppercase tracking-[0.18em] text-xs">
                Year
              </dt>
              <dd>{work.year}</dd>
              <dt className="text-cream/50 uppercase tracking-[0.18em] text-xs">
                Medium
              </dt>
              <dd>{work.medium}</dd>
              {work.dimensions && (
                <>
                  <dt className="text-cream/50 uppercase tracking-[0.18em] text-xs">
                    Size
                  </dt>
                  <dd>{work.dimensions}</dd>
                </>
              )}
              <dt className="text-cream/50 uppercase tracking-[0.18em] text-xs">
                Status
              </dt>
              <dd>
                {work.forSale && work.price
                  ? formatPrice(work.price)
                  : work.forSale
                    ? "Available — price on request"
                    : "Not for sale"}
              </dd>
            </dl>

            {work.description && (
              <p className="mt-8 max-w-md text-base leading-relaxed text-cream/80">
                {work.description}
              </p>
            )}

            {work.forSale && (
              <div className="mt-10">
                <Link href={`/contact?work=${encodeURIComponent(work.slug)}`}>
                  <Button variant="accent" size="lg">
                    Inquire to Buy
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
