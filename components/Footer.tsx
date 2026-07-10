import Link from "next/link";
import { Mail, Facebook, Instagram } from "lucide-react";
import Logo from "@/components/Logo";

const nav = {
  Services: [
    { label: "All services", href: "/services" },
    { label: "FYP project Malaysia", href: "/services/fyp-project-malaysia" },
    { label: "FYP project Penang", href: "/services/fyp-project-penang" },
    { label: "IoT project Malaysia", href: "/services/iot-project-malaysia" },
    { label: "ESP32 project Malaysia", href: "/services/esp32-project-malaysia" },
    { label: "Arduino project Malaysia", href: "/services/arduino-project-malaysia" },
    { label: "Software FYP Malaysia", href: "/services/software-fyp-malaysia" },
  ],
  Company: [
    { label: "Projects", href: "/catalog" },
    { label: "Components", href: "/components" },
    { label: "Topics", href: "/topics" },
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
    <footer className="bg-[#040810] border-t border-white/6" aria-label="Site footer">

      {/* Top marquee — deliverables */}
      <div className="border-b border-white/6 py-5 overflow-hidden">
        <div className="marquee-track marquee-forward flex items-center gap-0">
          {Array(2).fill([
            "FYP PROJECTS", "IoT SYSTEMS", "ARDUINO", "ESP32", "PCB DESIGN",
            "WEB APPS", "MOBILE APPS", "RASPBERRY PI", "COACHING", "SCHEMATICS",
            "NATIONWIDE DELIVERY", "FREE QUOTE",
          ]).flat().map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-white/20">{item}</span>
              <span className="w-1 h-1 rounded-full bg-brand-blue/50" />
            </span>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2">
            <Logo className="w-36 h-auto mb-5" variant="light" />
            <p className="text-white/30 text-sm leading-relaxed max-w-[26ch] mb-6">
              Malaysia&apos;s engineering & technology company for FYP projects and commercial software. Based in Penang.
            </p>
            <div className="flex items-center gap-1">
              <a href="mailto:rectronx@gmail.com" className="p-2 rounded-lg text-white/25 hover:text-white transition-colors" aria-label="Email">
                <Mail size={16} />
              </a>
              <a href="https://www.facebook.com/rectronx.circuits" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/25 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/rectronx.circuits" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/25 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.tiktok.com/@rectronxcircuits" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/25 hover:text-white transition-colors" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(nav).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-white/25 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/35 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Rectronx Circuits. All rights reserved.</p>
          <p className="text-white/20 text-xs">+60 11-7279 2500 · rectronx@gmail.com · Penang, Malaysia</p>
        </div>
      </div>
    </footer>
  );
}
