"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

const faqs = [
  {
    q: "How does it work? Do I just tell you what I need?",
    a: "Yes — WhatsApp us your FYP title or idea, your university requirements, and your submission deadline. We'll review it and send you a free quote within 2 hours. Once confirmed, we start building and keep you updated throughout.",
  },
  {
    q: "Is my project information kept private?",
    a: "Yes — we treat all client information with full confidentiality. We don't share your project details, requirements, or personal information with anyone.",
  },
  {
    q: "How long does it take to complete?",
    a: "Most IoT and Arduino projects take 1–2 weeks. Software-heavy projects or more complex systems may take 2–4 weeks depending on scope. We work to your deadline — tell us when you need it and we'll plan accordingly.",
  },
  {
    q: "What if I need changes after receiving the project?",
    a: "Before we start, we sit down with you to lock in the full scope — features, components, and deliverables. This protects both sides and keeps the project on track. If something isn't working as agreed, we'll make it right. Any new requirements added after the build has started will be scoped and quoted separately.",
  },
  {
    q: "Do I get the source code and documentation?",
    a: "Yes. Every project is delivered with full source code, circuit diagrams (if applicable), and a project documentation report that you can use as the foundation for your FYP write-up.",
  },
  {
    q: "What types of projects do you handle?",
    a: "IoT (ESP32, NodeMCU, Arduino), Raspberry Pi projects, Python/Flask web applications, React/Next.js web apps, mobile apps, and more. If you're unsure, just ask — we've likely done something similar before.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on complexity, components needed, and timeline. Simple Arduino projects start at a lower range; full IoT systems with web dashboards or mobile apps are priced higher. WhatsApp us with your brief and we'll give you an honest quote with no hidden costs.",
  },
  {
    q: "Do you provide support after delivery?",
    a: "Yes. We're available after delivery to explain how the system works — the circuit logic, sensor setup, and code flow. We want you to fully understand what was built.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 bg-slate-50/60">
      <JsonLd schema={faqSchema(faqs)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 gap-10">

          {/* Left — sticky header */}
          <div className="lg:w-72 shrink-0 lg:sticky lg:top-24">
            <span className="section-label-pill mb-4 inline-flex">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-mid tracking-[-0.02em] mb-4">
              Questions students ask
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Honest answers before you reach out.
            </p>
            <WhatsAppButton
              label="Ask us anything"
              message="Hi Rectronx! I have a question about getting my FYP done."
            />
          </div>

          {/* Right — accordion */}
          <div className="flex-1 space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  open === i
                    ? "border-brand-blue/25 bg-white shadow-card"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-brand-navy-mid text-sm sm:text-[0.95rem] leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-200 ${
                      open === i ? "bg-brand-blue text-white rotate-45" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Plus size={14} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
