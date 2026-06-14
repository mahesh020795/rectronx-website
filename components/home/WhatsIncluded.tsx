"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const included = [
  { label: "Full source code", desc: "Clean, commented, ready for report" },
  { label: "All components", desc: "Every hardware part sourced and provided" },
  { label: "PCB / copper board", desc: "Circuit built on proper board" },
  { label: "Professional soldering", desc: "Hand-soldered, tested connections" },
  { label: "Project casing", desc: "Enclosure for a clean finished look" },
  { label: "Nationwide shipping", desc: "Delivered to your door, anywhere in Malaysia" },
  { label: "Circuit schematics", desc: "Full wiring diagrams for your report" },
  { label: "Coaching session", desc: "We walk you through how everything works" },
];

export default function WhatsIncluded() {
  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden grain-overlay"
      style={{ background: "linear-gradient(160deg, #0B1628 0%, #0F1C2E 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "-5%",
          width: "45%",
          height: "60%",
          background: "radial-gradient(ellipse at center, rgba(43,127,212,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-brand-blue text-xs font-semibold tracking-[0.10em] uppercase bg-brand-blue/12 border border-brand-blue/20 px-3 py-1.5 rounded-full mb-6">
              Everything included
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-5">
              One price.
              <br />
              Everything done.
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-[38ch]">
              No hidden costs, no missing parts, no surprises. Your project price covers everything — from hardware to documentation.
            </p>
            <div className="mt-9">
              <WhatsAppButton
                label="Get a free quote"
                message="Hi Rectronx! I'd like to know the price for my FYP project."
              />
            </div>
            {/* Trust badge */}
            <p className="mt-5 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check size={9} className="text-emerald-400" />
              </span>
              Free quote · No commitment · Delivered anywhere in Malaysia
            </p>
          </motion.div>

          {/* Right — checklist grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {included.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 glass rounded-xl p-4"
                >
                  <div className="w-6 h-6 rounded-lg bg-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
