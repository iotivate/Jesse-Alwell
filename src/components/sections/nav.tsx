"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

type NavProps = {
  artistName: string;
  location?: string;
  overlay?: boolean;
};

export function Nav({ artistName, location, overlay = false }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-colors duration-200",
        solid
          ? "bg-ink-900/85 backdrop-blur-md border-b border-cream/10"
          : "bg-transparent",
        overlay && "-mb-20",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav className="mx-auto flex max-w-(--container-page) items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.2em] uppercase"
          onClick={() => setOpen(false)}
        >
          {artistName}
        </Link>

        <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            aria-label="Shop"
            className="text-cream/80 hover:text-cream"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="text-cream/80 hover:text-cream md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        className={cn(
          "fixed inset-0 z-50 bg-ink-900 transition-opacity duration-200 md:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-lg tracking-[0.2em] uppercase"
          >
            {artistName}
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-cream/80 hover:text-cream"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-2 px-6 pt-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-3xl tracking-tight text-cream hover:text-ochre-300"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {location && (
          <div className="mt-12 border-t border-cream/10 px-6 py-6 text-xs uppercase tracking-[0.18em] text-cream/50">
            {location}
          </div>
        )}
      </div>
    </header>
  );
}
