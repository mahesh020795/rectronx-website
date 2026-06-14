"use client";

import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-24 sm:py-32 bg-[#080E1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-brand-blue rounded-3xl px-8 sm:px-16 py-16 sm:py-24"
        >
          {/* Circuit traces inside CTA */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" aria-hidden="true">
            <defs>
              <style>{`.ctrace{stroke:#fff;stroke-width:1;fill:none;stroke-dasharray:6 6;animation:dashFlow 20s linear infinite}@keyframes dashFlow{to{stroke-dashoffset:-200}}`}</style>
            </defs>
            <path className="ctrace" d="M0,60 H200 V40 H400 V60 H700" />
            <path className="ctrace" d="M0,120 H150 V100 H350 V120 H600 V100 H900" />
            <path className="ctrace" d="M100,0 V80 H120 V160" />
            <path className="ctrace" d="M350,0 V70 H370 V150" />
            <circle cx="200" cy="60" r="4" fill="#fff" opacity="0.5" />
            <circle cx="400" cy="60" r="4" fill="#fff" opacity="0.5" />
            <circle cx="350" cy="120" r="4" fill="#fff" opacity="0.5" />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-white/60 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] mb-5">
                400+ students trusted us
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.04em] text-white leading-[0.95] mb-6">
                Ready to start your project?
              </h2>
              <p className="text-white/70 leading-relaxed max-w-[42ch]">
                WhatsApp us your requirements. Free quote in 2 hours. No commitment needed.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <WhatsAppButton
                label="Chat with us now"
                message="Hi Rectronx! I'd like to discuss my project requirements."
                className="justify-center text-sm font-extrabold uppercase tracking-wider px-8 py-4 rounded-full bg-white text-[#080E1A] hover:bg-white/90"
              />
              <Link href="/projects"
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all">
                See example projects <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
