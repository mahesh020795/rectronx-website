import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Final Year Projects", href: "/projects" },
    { label: "IoT Solutions", href: "/projects#iot" },
    { label: "Software Projects", href: "/projects#software" },
    { label: "Electronics Projects", href: "/projects#electronics" },
  ],
  Products: [
    { label: "Spark", href: "/products#spark" },
    { label: "All Products", href: "/products" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="Rectronx"
              width={130}
              height={38}
              className="h-9 w-auto mb-4"
            />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              A tech studio from Malaysia. We build software products and
              deliver custom engineering solutions for students and businesses.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="mailto:rectronx@gmail.com"
                className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.facebook.com/rectronx.circuits"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/rectronx.circuits"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@rectronxcircuits"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-brand-blue transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Rectronx. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-blue transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
