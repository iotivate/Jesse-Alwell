import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { getExhibitions, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Exhibitions",
  description: "Past and upcoming exhibitions.",
};

function formatDateRange(start: string, end?: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const s = new Date(start).toLocaleDateString("en-US", opts);
  if (!end) return s;
  const e = new Date(end).toLocaleDateString("en-US", opts);
  return `${s} – ${e}`;
}

export default async function ExhibitionsPage() {
  const [site, exhibitions] = await Promise.all([
    getSite(),
    getExhibitions(),
  ]);
  const now = new Date().toISOString().slice(0, 10);
  const upcoming = exhibitions.filter((e) => (e.end ?? e.start) >= now);
  const past = exhibitions.filter((e) => (e.end ?? e.start) < now);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-ochre-300">
          Exhibitions
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
          {site.exhibitionsPageHeading}
        </h1>
        {site.exhibitionsPageIntro && (
          <p className="mt-4 max-w-xl text-cream/70">
            {site.exhibitionsPageIntro}
          </p>
        )}

        {exhibitions.length === 0 ? (
          <p className="mt-12 text-cream/60">
            No exhibitions listed yet.
          </p>
        ) : (
          <div className="mt-16 space-y-16">
            {upcoming.length > 0 && (
              <Section title="Upcoming" items={upcoming} />
            )}
            {past.length > 0 && <Section title="Past" items={past} />}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: { title: string; venue: string; city: string; start: string; end?: string }[];
}) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.3em] text-cream/50">
        {title}
      </h2>
      <ul className="mt-6 divide-y divide-cream/10">
        {items.map((e) => (
          <li
            key={`${e.title}-${e.start}`}
            className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
          >
            <div>
              <h3 className="font-display text-2xl tracking-tight">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-cream/70">
                {e.venue} · {e.city}
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-cream/60">
              {formatDateRange(e.start, e.end)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
