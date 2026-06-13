"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "Spark",
    tagline: "AI-powered WhatsApp assistant for your business",
    description:
      "Automate customer conversations, answer FAQs, capture leads, and manage inquiries — all through WhatsApp. Built for Malaysian SMEs.",
    status: "Live",
    href: "/products#spark",
    icon: MessageSquare,
    color: "bg-green-50 text-green-600",
    badge: "bg-green-100 text-green-700",
  },
];

export default function Products() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="section-label">Our Products</span>
            <h2 className="mt-3 text-4xl font-bold text-brand-navy tracking-tight">
              Software We&apos;ve Built
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl">
              Beyond client work, we ship our own products. Real tools solving
              real problems.
            </p>
          </div>
          <Link
            href="/products"
            className="btn-secondary shrink-0"
          >
            All Products <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={p.href}
                className="card p-8 flex flex-col gap-5 group block h-full"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.color.split(" ")[0]}`}>
                    <p.icon size={22} className={p.color.split(" ")[1]} />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.badge}`}>
                    {p.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">{p.name}</h3>
                  <p className="text-brand-blue text-sm font-medium mt-0.5">{p.tagline}</p>
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-brand-blue text-sm font-medium mt-auto group-hover:gap-2 transition-all">
                  Learn more <ArrowUpRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-8 flex flex-col items-center justify-center text-center border-dashed"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
              <span className="text-2xl font-light text-slate-400">+</span>
            </div>
            <h3 className="font-semibold text-slate-700">More Coming Soon</h3>
            <p className="text-slate-400 text-sm mt-2">
              We&apos;re always building. Follow us to stay updated.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
