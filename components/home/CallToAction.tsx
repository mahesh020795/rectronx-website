"use client";

import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl grain-overlay"
          style={{ background: "linear-gradient(135deg, #0B1628 0%, #0F1C2E 60%, #102240 100%)" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "150%",
              background: "radial-gradient(ellipse at center, rgba(43,127,212,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 px-8 sm:px-14 py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10">
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/25 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                400+ students trusted us
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white tracking-[-0.02em] leading-[1.1]">
                Ready to start
                <br />
                your project?
              </h2>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-[38ch]">
                WhatsApp us your requirements. We review and send a free quote within 2 hours — no commitment needed.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <WhatsAppButton
                label="Chat with us now"
                message="Hi Rectronx! I'd like to discuss my project requirements."
                className="text-[0.95rem] px-7 py-3.5 justify-center font-semibold"
              />
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/80 hover:text-white text-sm font-medium px-7 py-3.5 rounded-lg transition-all duration-200"
              >
                See example projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
