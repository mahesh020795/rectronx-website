"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top accent bar — brand blue, 2px, fixed */}
      <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-brand-blue" />

      <header
        className={clsx(
          "fixed top-0.5 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo className="h-7 lg:h-9 w-auto" />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive(l.href)
                    ? "text-brand-blue"
                    : "text-slate-600 hover:text-brand-navy"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-600 hover:text-brand-navy transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-dark transition-colors duration-200 shadow-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu — slide down */}
        <div
          className={clsx(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pb-5 pt-2 shadow-lg">
            <div className="space-y-0.5 mb-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center justify-between px-3 py-[11px] min-h-[44px] text-sm font-medium rounded-lg transition-colors",
                    isActive(l.href)
                      ? "text-brand-blue bg-brand-blue-light"
                      : "text-slate-700 hover:text-brand-navy hover:bg-slate-50"
                  )}
                >
                  {l.label}
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "601172792500"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
