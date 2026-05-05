import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WorkImage } from "@/components/work-image";
import { getSite } from "@/lib/content";

export async function Hero() {
  const site = await getSite();
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 min-h-[88svh] flex flex-col">
      {/* Hero image (when uploaded) — full-bleed behind the title. */}
      {site.heroImage && (
        <div aria-hidden className="absolute inset-0 -z-20">
          <WorkImage
            image={site.heroImage}
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Painterly tint — gives the gradient look even when an image is set,
          and is the only background when no image is uploaded. Darker on the
          left so the title stays legible. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: site.heroImage
            ? "linear-gradient(90deg, rgba(12,10,8,0.85) 0%, rgba(12,10,8,0.55) 45%, rgba(12,10,8,0.15) 100%)"
            : "radial-gradient(60% 80% at 70% 40%, oklch(0.45 0.10 35) 0%, transparent 70%), linear-gradient(120deg, oklch(0.18 0.02 60) 0%, oklch(0.10 0.02 50) 100%)",
        }}
      />
      {!site.heroImage && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.7),transparent_55%)]"
        />
      )}

      <div className="mx-auto flex w-full max-w-(--container-page) flex-1 items-center px-6 lg:px-10">
        <div className="max-w-2xl pt-32 pb-20 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-ochre-300">
            {site.heroEyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-cream sm:text-7xl lg:text-8xl">
            {site.artistName}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75">
            {site.tagline}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/work" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto">
                View Portfolio
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                About Me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
