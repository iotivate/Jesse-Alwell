import { getPress, getSite } from "@/lib/content";

export async function Press() {
  const [quotes, site] = await Promise.all([getPress(), getSite()]);
  return (
    <section className="bg-ink-900 border-t border-cream/10 py-20 lg:py-24">
      <div className="mx-auto max-w-(--container-page) px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-cream/50">
          {site.pressHeading}
        </p>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {quotes.map((q, i) => (
            <li key={i} className="border-l border-ochre-500/60 pl-6">
              <p className="font-display text-lg leading-relaxed text-cream/90">
                &ldquo;{q.quote}&rdquo;
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cream/60">
                {q.author} · {q.outlet}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
