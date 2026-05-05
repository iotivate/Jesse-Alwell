import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSite } from "@/lib/content";

const sitemap = [
  {
    title: "Explore",
    links: [
      { href: "/work", label: "Work" },
      { href: "/collections/paintings", label: "Paintings" },
      { href: "/collections/digital", label: "Digital" },
      { href: "/collections/sculptures", label: "Sculpture" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/exhibitions", label: "Exhibitions" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export async function Footer() {
  const site = await getSite();
  return (
    <footer className="bg-ink-900 border-t border-cream/10">
      <div className="mx-auto grid max-w-(--container-page) gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cream/60">
            {site.newsletterHeading}
          </p>
          <p className="mt-3 max-w-sm text-sm text-cream/70">
            {site.newsletterBody}
          </p>
          <form className="mt-5 flex max-w-sm gap-2">
            <Input
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
              required
            />
            <Button type="submit" variant="accent" size="md">
              Join
            </Button>
          </form>
        </div>

        {sitemap.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-[0.3em] text-cream/60">
              {group.title}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cream/60">
            Connect
          </p>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-cream">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-(--container-page) flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/50 sm:flex-row lg:px-10">
          <p>
            © {new Date().getFullYear()} {site.artistName}. All rights reserved.
          </p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
