import Link from "next/link";
import { Mail, Facebook, Instagram } from "lucide-react";
import Logo from "@/components/Logo";

const nav = {
  Services: [
    { label: "Final year projects", href: "/projects" },
    { label: "IoT solutions", href: "/projects#iot" },
    { label: "Software projects", href: "/projects#software" },
    { label: "Electronics & PCB", href: "/projects#electronics" },
    { label: "Project catalog", href: "/catalog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <>
      {/* Pre-footer CTA strip */}
      <div
        className="relative overflow-hidden grain-overlay"
        style={{ background: "linear-gradient(135deg, #0B1628 0%, #0F1C2E 100%)" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "150%",
            background: "radial-gradient(ellipse at center, rgba(43,127,212,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-brand-blue mb-3">
              Get started today
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.02em] max-w-md">
              Ready to get your FYP done?
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-sm">
              WhatsApp us your topic and deadline. Free quote in 2 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/601172792500?text=Hi%20Rectronx!%20I%27d%20like%20a%20quote%20for%20my%20FYP."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-brand-blue-dark transition-all duration-200 hover:-translate-y-px shadow-glow"
            >
              Get a free quote
            </a>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 px-6 py-3 rounded-xl text-sm font-medium hover:border-white/30 hover:text-white transition-all duration-200"
            >
              Browse project titles
            </Link>
          </div>
        </div>
      </div>

      {/* Dark footer */}
      <footer
        style={{ background: "#060e1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        aria-label="Site footer"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

            {/* Brand — wider */}
            <div className="col-span-2">
              <Logo className="w-36 h-auto mb-4" variant="light" />
              <p className="text-slate-400 text-sm leading-relaxed max-w-[26ch]">
                Malaysia&apos;s engineering & technology company for FYP projects and commercial software. Based in Penang.
              </p>

              {/* Social */}
              <div className="flex items-center gap-1 mt-5">
                <a
                  href="mailto:rectronx@gmail.com"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Email Rectronx"
                >
                  <Mail size={16} />
                </a>
                <a
                  href="https://www.facebook.com/rectronx.circuits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Rectronx on Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/rectronx.circuits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Rectronx on Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@rectronxcircuits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Rectronx on TikTok"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(nav).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-[0.65rem] font-semibold text-slate-500 uppercase tracking-[0.14em] mb-4">
                  {section}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/6 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Rectronx Circuits Sdn Bhd. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-slate-600 text-xs">
              <span>+60 11-7279 2500</span>
              <span>·</span>
              <a href="mailto:rectronx@gmail.com" className="hover:text-slate-400 transition-colors">rectronx@gmail.com</a>
              <span>·</span>
              <span>Penang, Malaysia</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
