import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { getSite, getWork } from "@/lib/content";
import { InquiryForm } from "./inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquire about a piece, a commission, or an exhibition.",
};

type Search = { work?: string };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { work: workSlug } = await searchParams;
  const [site, work] = await Promise.all([
    getSite(),
    workSlug ? getWork(workSlug) : Promise.resolve(undefined),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-(--container-page) flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ochre-300">
              Contact
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
              {work ? "Inquire about this piece" : site.contactPageHeading}
            </h1>
            <p className="mt-6 max-w-md text-cream/75">
              {work
                ? `Interested in "${work.title}" — fill in the form and you'll hear back within a few days.`
                : site.contactPageIntro}
            </p>

            <dl className="mt-10 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-cream/50">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-ochre-300"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-cream/50">
                  Studio
                </dt>
                <dd>{site.location}</dd>
              </div>
            </dl>
          </div>

          <div>
            <InquiryForm workSlug={work?.slug} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
