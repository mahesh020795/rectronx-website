"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import clsx from "clsx";
import { trackWhatsAppLead } from "@/lib/analytics";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/catalog", label: "Catalog" },
  { href: "/components", label: "Components" },
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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-brand-blue" />

      <header
        className={clsx(
          "fixed top-0.5 inset-x-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "bg-[#080E1A]/95 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" aria-label="Rectronx home">
            <Logo className="w-32 lg:w-36 h-auto" variant="light" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] rounded-lg transition-colors duration-200",
                  isActive(l.href)
                    ? "text-brand-blue"
                    : "text-white/50 hover:text-white"
                )}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="text-xs font-bold uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors">
              Contact
            </Link>
            <Link
              href="/contact"
              className="bg-brand-blue text-white text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-brand-blue-dark transition-all duration-200 hover:-translate-y-px hover:shadow-glow"
            >
              Get a quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="bg-[#080E1A] border-b border-white/8 px-5 pb-6 pt-2">
            <nav className="space-y-0.5 mb-5" aria-label="Mobile navigation">
              <Link href="/" onClick={() => setOpen(false)}
                className={clsx("block px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] rounded-xl transition-colors",
                  pathname === "/" ? "text-brand-blue" : "text-white/60 hover:text-white")}>
                Home
              </Link>
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={clsx("block px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] rounded-xl transition-colors",
                    isActive(l.href) ? "text-brand-blue" : "text-white/60 hover:text-white")}
                  aria-current={isActive(l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <a href="https://wa.me/601172792500?text=Hi%20Rectronx!%20I%27d%20like%20a%20quote."
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead("mobile_nav_quote")}
              className="block w-full text-center bg-brand-blue text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors">
              Get a free quote
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
