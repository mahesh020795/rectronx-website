"use client";

import { motion } from "framer-motion";
import { MessageSquare, Car, ScanLine, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    icon: MessageSquare,
    name: "Spark",
    tagline: "AI WhatsApp Assistant",
    description: "Automate customer conversations for Malaysian SMEs.",
    badge: "Live",
    badgeColor: "bg-green-100 text-green-700",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    href: "/products#spark",
  },
  {
    icon: Car,
    name: "Smart Parking System",
    tagline: "Commercial Building Solution",
    description: "Real-time slot monitoring & RFID payment integration.",
    badge: "Deployed",
    badgeColor: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/products#parking",
  },
  {
    icon: ScanLine,
    name: "Attendance & Access Control",
    tagline: "Schools, Factories & Offices",
    description: "Biometric fingerprint + RFID dual-authentication system.",
    badge: "Deployed",
    badgeColor: "bg-violet-100 text-violet-700",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    href: "/products#attendance",
  },
  {
    icon: MapPin,
    name: "Fleet Tracking Dashboard",
    tagline: "GPS Fleet Management",
    description: "Live GPS tracking, route history & driver behavior monitoring.",
    badge: "Deployed",
    badgeColor: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    href: "/products#fleet",
  },
];

export default function Products() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="section-label">Commercial Products</span>
            <h2 className="mt-3 text-4xl font-bold text-brand-navy tracking-tight">
              Built for Real Business
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl">
              4 products deployed across Malaysia for real businesses.
            </p>
          </div>
          <Link href="/products" className="btn-secondary shrink-0">
            View All Products <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 2x2 product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={product.href}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className={`w-12 h-12 rounded-xl ${product.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon size={22} className={product.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-brand-navy text-sm">{product.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    </div>
                    <p className="text-xs text-brand-blue font-medium mb-1">{product.tagline}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{product.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
