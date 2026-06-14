"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const included = [
  { label: "Coding", desc: "Full source code, clean and commented" },
  { label: "Components", desc: "All hardware parts sourced and provided" },
  { label: "PCB / Copper Board", desc: "Circuit built on copper donut board" },
  { label: "Soldering", desc: "Professional hand-soldered connections" },
  { label: "Casing", desc: "Enclosure for a clean finished look" },
  { label: "Shipping", desc: "Delivered to your door anywhere in Malaysia" },
  { label: "Schematics & Circuit Diagram", desc: "Full wiring diagrams for your report" },
  { label: "Coaching Class", desc: "We walk you through how everything works" },
];

export default function WhatsIncluded() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2B7FD4] bg-[#EBF4FF] px-3 py-1 rounded-full mb-3">
            Everything Included
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E]">
            One Price. Everything Done.
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            No hidden costs, no missing parts. Your project price covers everything from hardware to documentation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {included.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex flex-col gap-2 bg-slate-50 rounded-xl p-5 border border-slate-100"
            >
              <CheckCircle2 size={20} className="text-[#2B7FD4] shrink-0" />
              <p className="font-semibold text-[#0F1C2E] text-sm">{item.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <WhatsAppButton
            label="Get a Free Quote on WhatsApp"
            message="Hi Rectronx! I'd like to know the price for my FYP project."
          />
        </div>
      </div>
    </section>
  );
}
