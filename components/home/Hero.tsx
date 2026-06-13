"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Code2 } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(43,127,212,0.08),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          Malaysia&apos;s Tech Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy leading-tight tracking-tight"
        >
          Malaysia&apos;s Tech Studio
          <br />
          for <span className="text-brand-blue">FYP Projects</span>
          <br />
          &amp; Software Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
        >
          From custom Final Year Projects in IoT, Arduino &amp; Raspberry Pi —
          to SaaS products that solve real problems. Rectronx delivers quality
          engineering, every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <WhatsAppButton
            label="Get a Free Quote"
            message="Hi Rectronx! I'd like to get a quote for my project."
            className="text-base px-6 py-3"
          />
          <Link href="/projects" className="btn-secondary text-base px-6 py-3">
            View Projects <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "100+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Students" },
            { value: "4+", label: "Years Experience" },
            { value: "3", label: "SaaS Products" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-brand-navy">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {["Arduino", "Raspberry Pi", "IoT", "ESP32", "Python", "React", "Node.js"].map(
            (tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {tag.includes("Pi") || tag === "Arduino" || tag === "IoT" || tag === "ESP32" ? (
                  <Cpu size={11} />
                ) : (
                  <Code2 size={11} />
                )}
                {tag}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
