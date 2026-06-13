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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-brand-navy rounded-2xl px-8 py-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(43,127,212,0.3),transparent)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto text-base">
              Tell us what you need. We&apos;ll review your requirements and give you
              a free quote within 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppButton
                label="Chat with Us Now"
                message="Hi Rectronx! I'd like to discuss my project requirements."
                className="text-base px-6 py-3"
              />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
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
