import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WorkImage } from "@/components/work-image";
import { getSite } from "@/lib/content";
import type { WorkImage as WorkImageType } from "@/lib/content/types";

export async function ShopTeaser() {
  const site = await getSite();
  const imgA: WorkImageType = site.shopTeaserImageA ?? {
    kind: "placeholder",
    seed: "shop-a",
    alt: "Available work",
  };
  const imgB: WorkImageType = site.shopTeaserImageB ?? {
    kind: "placeholder",
    seed: "shop-b",
    alt: "Available work",
  };
  return (
    <section className="bg-cream text-ink-900 py-20 lg:py-28">
      <div className="mx-auto grid max-w-(--container-page) items-center gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ochre-700">
            {site.shopTeaserEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            {site.shopTeaserHeadline}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700">
            {site.shopTeaserBody}
          </p>
          <div className="mt-8">
            <Link href="/shop">
              <Button variant="accent">Browse Shop</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[3/4] overflow-hidden">
            <WorkImage image={imgA} sizes="(max-width: 1024px) 50vw, 25vw" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden mt-10">
            <WorkImage image={imgB} sizes="(max-width: 1024px) 50vw, 25vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
