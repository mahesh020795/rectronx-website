"use client";

import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-brand-navy rounded-3xl px-6 sm:px-8 py-14 sm:py-20 relative overflow-hidden"
        >
          {/* Bottom radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(43,127,212,0.35),transparent)]" />

          {/* Decorative overlapping circles — right side, hidden on mobile */}
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none">
            <div className="w-80 h-80 rounded-full border-2 border-brand-blue/20 absolute -top-16 -left-16" />
            <div className="w-64 h-64 rounded-full bg-brand-blue/10 absolute top-0 left-0" />
            <div className="w-48 h-48 rounded-full bg-brand-blue/15 absolute top-8 left-8" />
            <div className="w-32 h-32 rounded-full bg-brand-blue/25 absolute top-16 left-16" />
          </div>

          {/* Content */}
          <div className="relative max-w-2xl text-center sm:text-left">
            {/* Social proof */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 mx-auto sm:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Join 50+ students who trusted Rectronx with their FYP
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to Start
              <br />
              Your Project?
            </h2>
            <p className="mt-5 text-slate-400 max-w-md text-base leading-relaxed">
              Tell us what you need. We&apos;ll review your requirements and give you
              a free quote within 24 hours.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <WhatsAppButton
                label="Chat with Us Now"
                message="Hi Rectronx! I'd like to discuss my project requirements."
                className="text-base px-6 py-3"
              />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/5"
              >
                See Example Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
