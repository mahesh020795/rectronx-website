"use client";

import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";

const steps = [
  {
    step: "01",
    title: "Browse titles",
    description: "Explore 500+ FYP titles across IoT, Arduino, Raspberry Pi, and Software. Pick yours or bring your own idea.",
    accent: "#2B7FD4",
  },
  {
    step: "02",
    title: "WhatsApp us",
    description: "Share your topic, deadline, and university requirements. We reply within 2 hours with a free quote.",
    accent: "#7c3aed",
  },
  {
    step: "03",
    title: "We build it",
    description: "Engineers build your project with real hardware, working code, and full testing. Progress updates throughout.",
    accent: "#059669",
  },
  {
    step: "04",
    title: "You submit",
    description: "Get hardware, source code, schematics, and documentation — ready for submission and viva presentation.",
    accent: "#d97706",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-[#080E1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/8 pb-10"
        >
          <div>
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-white">
              Title to submission<br />in 4 steps.
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-[28ch] leading-relaxed">
            400+ students have been through this process. Here&apos;s exactly what happens.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#080E1A] p-8 group hover:bg-white/[0.03] transition-colors duration-300"
            >
              {/* Giant step number */}
              <div
                className="text-[5rem] sm:text-[6rem] font-extrabold leading-none tracking-[-0.05em] mb-6 text-outline select-none"
                style={{ WebkitTextStroke: `2px ${s.accent}`, color: "transparent" }}
              >
                {s.step}
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-[-0.01em] text-white mb-3">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3"
        >
          <WhatsAppButton
            label="Start now — free to ask"
            message="Hi Rectronx! I'd like to know more about the FYP process."
            trackingSource="home_how_it_works"
          />
          <p className="text-white/30 text-xs uppercase tracking-widest">No commitment needed</p>
        </motion.div>
      </div>
    </section>
  );
}
