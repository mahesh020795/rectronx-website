"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";
import clsx from "clsx";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/catalog", label: "Catalog" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* 2px brand accent line at top */}
      <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-brand-blue" />

      <header
        className={clsx(
          "fixed top-0.5 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-slate-100/80 shadow-[0_1px_20px_rgba(11,22,40,0.08)]"
            : isHome
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-slate-100"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="Rectronx home">
            <Logo
              className="w-32 lg:w-36 h-auto"
              variant={!scrolled && isHome ? "light" : "default"}
            />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive(l.href)
                    ? "text-brand-blue"
                    : !scrolled && isHome
                    ? "text-white/80 hover:text-white"
                    : "text-slate-600 hover:text-brand-navy-mid"
                )}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={clsx(
                "text-sm font-medium transition-colors",
                !scrolled && isHome ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-brand-navy-mid"
              )}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-blue-dark transition-all duration-200 shadow-navy-sm hover:shadow-glow hover:-translate-y-px"
            >
              Get a quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={clsx(
              "lg:hidden p-2 rounded-lg transition-colors",
              !scrolled && isHome ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
            )}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={clsx(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white/97 backdrop-blur-xl border-b border-slate-100 px-4 pb-5 pt-2 shadow-premium">
            <nav className="space-y-0.5 mb-4" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center justify-between px-3 py-[11px] min-h-[44px] text-sm font-medium rounded-xl transition-colors",
                  pathname === "/" ? "text-brand-blue bg-brand-blue/8" : "text-slate-700 hover:text-brand-navy-mid hover:bg-slate-50"
                )}
              >
                Home <ChevronRight size={14} className="text-slate-400" />
              </Link>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center justify-between px-3 py-[11px] min-h-[44px] text-sm font-medium rounded-xl transition-colors",
                    isActive(l.href)
                      ? "text-brand-blue bg-brand-blue/8"
                      : "text-slate-700 hover:text-brand-navy-mid hover:bg-slate-50"
                  )}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              ))}
            </nav>

            <a
              href="https://wa.me/601172792500?text=Hi%20Rectronx!%20I%27d%20like%20to%20get%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-brand-blue text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-brand-blue-dark transition-colors"
            >
              Get a free quote
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
