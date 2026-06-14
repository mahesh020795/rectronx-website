"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, Cpu, GraduationCap } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse titles",
    description:
      "Explore 500+ FYP titles across IoT, Arduino, Raspberry Pi, and Software. Filter by category or search by keyword.",
    color: "#2B7FD4",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "WhatsApp us",
    description:
      "Share your topic, deadline, and university requirements. We reply within 2 hours with a free quote — no commitment needed.",
    color: "#7c3aed",
  },
  {
    icon: Cpu,
    step: "03",
    title: "We build it",
    description:
      "Our engineers build your project with real components, working code, and full testing. Progress updates along the way.",
    color: "#059669",
  },
  {
    icon: GraduationCap,
    step: "04",
    title: "You submit",
    description:
      "Receive hardware, source code, schematics, and documentation — ready for submission and viva presentation.",
    color: "#d97706",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label-pill mb-4 inline-flex">How it works</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-brand-navy-mid tracking-[-0.02em] max-w-md">
              From title to submission in 4 steps
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              We&apos;ve helped 400+ students get their FYP done. Here&apos;s exactly how the process works.
            </p>
          </div>
        </div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[28px] left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-px bg-slate-100 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col"
              >
                {/* Step circle with number */}
                <div className="flex items-center gap-3 mb-5 lg:flex-col lg:items-start lg:gap-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md lg:mb-4"
                    style={{ backgroundColor: s.color, boxShadow: `0 8px 24px ${s.color}30` }}
                  >
                    <s.icon size={22} className="text-white" />
                  </div>
                  {/* Mobile: step label next to icon */}
                  <span className="text-[0.68rem] font-bold text-slate-300 tracking-[0.15em] uppercase lg:hidden">
                    Step {s.step}
                  </span>
                </div>

                {/* Desktop: step number above */}
                <span className="hidden lg:block text-[0.68rem] font-bold text-slate-300 tracking-[0.15em] uppercase mb-2">
                  Step {s.step}
                </span>

                <h3 className="font-bold text-brand-navy-mid text-lg mb-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center gap-3 pt-10 border-t border-slate-100"
        >
          <p className="text-slate-500 text-sm">
            Ready to start? Less than 2 minutes to reach us.
          </p>
          <WhatsAppButton
            label="Start now — it's free to ask"
            message="Hi Rectronx! I'd like to know more about how the FYP process works."
          />
        </motion.div>
      </div>
    </section>
  );
}
