"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, Cpu, GraduationCap } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Titles",
    description:
      "Explore our catalog of 500+ FYP titles across IoT, Arduino, Raspberry Pi, and Software. Filter by category or search by keyword.",
    color: "bg-blue-50 text-brand-blue",
    iconBg: "bg-brand-blue",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "WhatsApp Us",
    description:
      "Tell us your topic, deadline, and university requirements. We reply within 2 hours and give you a free quote — no commitment needed.",
    color: "bg-violet-50 text-violet-600",
    iconBg: "bg-violet-600",
  },
  {
    icon: Cpu,
    step: "03",
    title: "We Build It",
    description:
      "Our engineers build your project with real components, working code, and full testing. You get progress updates along the way.",
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-600",
  },
  {
    icon: GraduationCap,
    step: "04",
    title: "You Submit",
    description:
      "Receive your complete project with hardware, source code, and full documentation ready for submission and viva presentation.",
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-600",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            From Title to Submission in 4 Steps
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            We&apos;ve helped 500+ students get their FYP done. Here&apos;s exactly how the
            process works — no surprises.
          </p>
        </div>

        {/* Steps grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5"
        >
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={item} className="relative">
              {/* Connector line — hidden on mobile/sm */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-[calc(100%-0px)] w-full h-px border-t-2 border-dashed border-slate-200 z-0 translate-x-3" />
              )}

              <div className="relative z-10 bg-slate-50 rounded-2xl p-6 h-full border border-slate-100 hover:border-brand-blue/30 hover:shadow-md transition-all duration-200">
                {/* Step number */}
                <span className="text-xs font-bold text-slate-300 mb-3 block tracking-widest">
                  STEP {s.step}
                </span>
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-4 shadow-sm`}
                >
                  <s.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-brand-navy text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Ready to get started? It takes less than 2 minutes to reach us.
          </p>
          <WhatsAppButton
            label="Start Now — It's Free to Ask"
            message="Hi Rectronx! I'd like to know more about how the FYP process works."
          />
        </div>
      </div>
    </section>
  );
}
