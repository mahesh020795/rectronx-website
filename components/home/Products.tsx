"use client";

import { motion } from "framer-motion";
import { MessageSquare, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const sparkFeatures = [
  "Automated WhatsApp responses 24/7",
  "Lead capture & CRM integration",
  "FAQ handling & smart routing",
  "Built for Malaysian SMEs",
];

export default function Products() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
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
          <Link href="/products" className="btn-secondary shrink-0">
            All Products <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Spark Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg flex flex-col md:flex-row"
        >
          {/* Left navy panel — 40% */}
          <div
            className="relative md:w-2/5 bg-brand-navy flex flex-col items-center justify-center p-10 overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(43,127,212,0.18) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(43,127,212,0.25),transparent)]" />

            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <MessageSquare size={28} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">Spark</div>
              <div className="mt-2 text-blue-300 text-sm font-medium">by Rectronx</div>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Live
              </div>
            </div>
          </div>

          {/* Right content panel — 60% */}
          <div className="md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-brand-navy">
              AI-powered WhatsApp assistant for your business
            </h3>
            <p className="mt-3 text-slate-500 leading-relaxed">
              Automate customer conversations, answer FAQs, capture leads, and manage
              inquiries — all through WhatsApp. Built for Malaysian SMEs who want to
              scale support without scaling headcount.
            </p>

            {/* Features list */}
            <ul className="mt-6 space-y-2.5">
              {sparkFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <Check size={11} className="text-brand-blue" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products#spark"
                className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5"
              >
                Learn More <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/products#spark"
                className="btn-secondary inline-flex items-center gap-2 text-sm px-5 py-2.5"
              >
                See Demo
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Coming soon card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center"
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
    </section>
  );
}
