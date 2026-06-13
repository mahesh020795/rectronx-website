"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import clsx from "clsx";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <Logo className="h-9 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-navy rounded-lg hover:bg-slate-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Contact Us
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-slate-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pb-4 pt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-brand-blue rounded-lg"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/601172792500"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3 w-full justify-center"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}
