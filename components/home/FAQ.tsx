"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

const faqs = [
  {
    q: "How does it work? Do I just tell you what I need?",
    a: "Yes — WhatsApp us your FYP title or idea, your university requirements, and your submission deadline. We'll review it and send you a free quote within 2 hours. Once confirmed, we start building and keep you updated throughout.",
  },
  {
    q: "Will my university or supervisor know?",
    a: "We treat every project with full confidentiality. We don't share client details, and the project is delivered as your work. Many students also use our project as a base and expand on it themselves — which is a completely valid approach.",
  },
  {
    q: "How long does it take to complete?",
    a: "Most IoT and Arduino projects take 1–2 weeks. Software-heavy projects or more complex systems may take 2–4 weeks depending on scope. We work to your deadline — tell us when you need it and we'll plan accordingly.",
  },
  {
    q: "What if I need changes after receiving the project?",
    a: "We include revision rounds as part of the project. If something doesn't work as expected or your supervisor requests changes, let us know and we'll fix it. We don't disappear after delivery.",
  },
  {
    q: "Do I get the source code and documentation?",
    a: "Yes. Every project is delivered with full source code, circuit diagrams (if applicable), and a project documentation report that you can use as the foundation for your FYP write-up.",
  },
  {
    q: "What types of projects do you handle?",
    a: "IoT (ESP32, NodeMCU, Arduino), Raspberry Pi projects, standalone Arduino systems, Python/Flask web applications, React/Next.js web apps, mobile apps, and more. If you're unsure, just ask — we've likely done something similar before.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on complexity, components needed, and timeline. Simple Arduino projects start at a lower range; full IoT systems with web dashboards or mobile apps are priced higher. WhatsApp us with your brief and we'll give you an honest quote with no hidden costs.",
  },
  {
    q: "Can you help me understand the project for my viva?",
    a: "Absolutely. We explain how the system works so you're comfortable presenting it. We can also walk you through the technical parts — sensors, circuit logic, code flow — so you can answer supervisor questions confidently.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <JsonLd schema={faqSchema(faqs)} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Questions Students Ask Before Reaching Out
          </h2>
          <p className="mt-3 text-slate-500">
            We get these a lot. Here are honest answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-brand-blue/30 transition-colors duration-200"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-brand-navy text-sm sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                    open === i ? "rotate-180 text-brand-blue" : ""
                  }`}
                />
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
                    <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Still have a question? Ask us directly on WhatsApp.
          </p>
          <WhatsAppButton
            label="Ask Us on WhatsApp"
            message="Hi Rectronx! I have a question about getting my FYP done."
          />
        </div>
      </div>
    </section>
  );
}
