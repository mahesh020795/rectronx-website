"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

const faqs = [
  { q: "How does it work?", a: "WhatsApp us your FYP title, university requirements, and deadline. We send a free quote within 2 hours. Once confirmed, we build and send progress updates throughout." },
  { q: "Is my project information kept private?", a: "Yes — full confidentiality. We don't share your project details, requirements, or personal information with anyone." },
  { q: "How long does it take?", a: "Most IoT and Arduino projects take 1–2 weeks. Software-heavy or complex systems may take 2–4 weeks. Tell us your deadline and we'll plan accordingly." },
  { q: "What if I need changes after delivery?", a: "Before we start, we lock in the full scope together. If something isn't working as agreed, we'll fix it. New requirements added after the build starts are quoted separately." },
  { q: "Do I get source code and documentation?", a: "Yes. Every project comes with full source code, circuit diagrams (if applicable), and a documentation report you can use as the base of your FYP write-up." },
  { q: "What types of projects do you handle?", a: "IoT (ESP32, NodeMCU, Arduino), Raspberry Pi, Python/Flask, React/Next.js web apps, mobile apps, and more. If unsure, just ask." },
  { q: "How much does it cost?", a: "Depends on complexity, components, and timeline. Simple Arduino projects start lower; full IoT systems with web dashboards are higher. WhatsApp us for an honest quote with no hidden costs." },
  { q: "Do you provide support after delivery?", a: "Yes. We explain how everything works — circuit logic, sensor setup, and code flow — so you fully understand what was built." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 bg-[#080E1A]">
      <JsonLd schema={faqSchema(faqs)} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 lg:gap-24">

          {/* Left sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-[-0.03em] text-white mb-6 leading-[1.0]">
              Questions<br />students<br />ask.
            </h2>
            <p className="text-white/30 text-sm leading-relaxed mb-8">
              Honest answers before you reach out.
            </p>
            <WhatsAppButton
              label="Ask us anything"
              message="Hi Rectronx! I have a question about getting my FYP done."
            />
          </div>

          {/* Accordion */}
          <div className="border-t border-white/8">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-white/8"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                  aria-expanded={open === i}
                >
                  <span className={`font-bold text-base leading-snug transition-colors ${open === i ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-200 ${open === i ? "bg-brand-blue border-brand-blue text-white rotate-45" : "border-white/15 text-white/30"}`}>
                    <Plus size={13} />
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
                      <p className="pb-6 text-white/40 text-sm leading-relaxed max-w-[60ch]">{faq.a}</p>
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
