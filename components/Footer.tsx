import Link from "next/link";
import { Mail, Facebook, Instagram, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";

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
};

const contactInfo = [
  { label: "Email", value: "rectronx@gmail.com", href: "mailto:rectronx@gmail.com" },
  { label: "WhatsApp", value: "+60 11-7279 2500", href: "https://wa.me/601172792500" },
  { label: "Address", value: "1-3-8, BL Business Centre, Solok Thean Tek, 11500 Ayer Itam, Pulau Pinang 🇲🇾", href: null },
];

export default function Footer() {
  return (
    <>
      {/* CTA Strip — above dark footer */}
      <div className="bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-semibold text-brand-navy">
              Get FYP tips in your WhatsApp
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Weekly tips, project ideas, and tech updates — straight to your phone.
            </p>
          </div>
          <a
            href="https://wa.me/601172792500?text=Hi%20Rectronx!%20I%20want%20to%20get%20FYP%20tips."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#1ebe5d] transition-colors shadow-sm"
          >
            <MessageCircle size={18} />
            Join on WhatsApp
          </a>
        </div>
      </div>

      {/* Dark footer */}
      <footer
        className="mt-0"
        style={{ background: "#0F1C2E", borderTop: "2px solid #2B7FD4" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="md:col-span-1">
              <Logo className="h-9 w-auto mb-4" variant="light" />
              <p className="text-slate-400 text-sm leading-relaxed">
                Building tech that works.
              </p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Rectronx Circuits — FYP solutions, commercial software products, and IoT systems from Penang, Malaysia.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 mt-5">
                <a
                  href="mailto:rectronx@gmail.com"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={17} />
                </a>
                <a
                  href="https://www.facebook.com/rectronx.circuits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={17} />
                </a>
                <a
                  href="https://www.instagram.com/rectronx.circuits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href="https://www.tiktok.com/@rectronxcircuits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="TikTok"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.Services.map((item) => (
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

            {/* Products */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Products
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.Products.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((item) => (
                  <li key={item.label}>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-400">{item.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Rectronx Circuits. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Built with ❤️ in Malaysia
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
