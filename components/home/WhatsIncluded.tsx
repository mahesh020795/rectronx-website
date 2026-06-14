"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const included = [
  "Full source code",
  "All hardware components",
  "PCB / copper board",
  "Professional soldering",
  "Project casing",
  "Nationwide shipping",
  "Circuit schematics",
  "Coaching session",
];

export default function WhatsIncluded() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0B1628" }}>
      {/* Top border blue accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-4">Everything included</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.92] text-white mb-8">
              One price.<br />
              <span className="text-outline-blue">Everything</span><br />
              done.
            </h2>
            <p className="text-white/40 leading-relaxed max-w-[36ch] mb-10">
              No hidden costs, no missing parts. Hardware, code, schematics, and documentation — all in your quote.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#080E1A] text-xs font-extrabold uppercase tracking-wider px-7 py-3.5 rounded-full hover:-translate-y-px hover:shadow-white-sm transition-all duration-200"
            >
              Get a free quote <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Right — checklist */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/8">
              {included.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#0B1628] px-6 py-5 group hover:bg-white/[0.04] transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-brand-blue text-lg font-extrabold">✓</span>
                    <span className="text-white font-semibold text-sm">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
    </section>
  );
}
