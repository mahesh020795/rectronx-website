"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

const stats = [
  { value: "400+", label: "Projects Delivered" },
  { value: "500+", label: "Project Titles Available" },
  { value: "8", label: "Years Active" },
  { value: "12", label: "Commercial Products Built" },
];

const tags = ["Arduino", "ESP32", "IoT", "Raspberry Pi", "Python", "React"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16 pb-0">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,rgba(43,127,212,0.07),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Text + CTAs ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Badge pill */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 bg-brand-blue-light text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                Malaysia&apos;s Engineering &amp; Technology Company
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-navy leading-tight tracking-tight"
            >
              Malaysia&apos;s Engineering &amp; Technology Company for{" "}
              <span className="text-brand-blue">FYP Projects</span>{" "}
              &amp; Software Products
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={item}
              className="mt-5 text-lg text-slate-500 leading-relaxed max-w-lg"
            >
              From custom Final Year Projects in IoT, Arduino &amp; Raspberry Pi
              — to SaaS products that solve real commercial customers&apos; problems.
              Rectronx Circuits delivers quality engineering, every time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-start gap-3"
            >
              <WhatsAppButton
                label="Get a Free Quote"
                message="Hi Rectronx! I'd like to get a quote for my project."
                className="text-base px-6 py-3 justify-center"
              />
              <Link href="/projects" className="btn-secondary text-base px-6 py-3 justify-center text-center">
                View Projects <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-5"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-brand-navy">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech tag pills */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap gap-2"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {["Arduino", "ESP32", "IoT", "Raspberry Pi"].includes(tag) ? (
                    <Cpu size={10} />
                  ) : (
                    <Code2 size={10} />
                  )}
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Visual card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex items-start justify-center lg:justify-end mt-4 lg:mt-0"
          >
            {/* Tilted image card — no rotation on mobile */}
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl sm:-rotate-2">
                <Image
                  src="/images/project-hero.jpeg"
                  alt="Rectronx IoT gas sensor project — MQ2/MQ5 detector with OLED display"
                  width={800}
                  height={540}
                  className="w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 448px"
                  quality={80}
                  priority
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white text-sm font-semibold">
                    IoT Gas Detector — Student FYP by Rectronx Circuits
                  </span>
                </div>
              </div>

              {/* Floating badges */}
              {/* Top-left badge — visible on all sizes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-xl px-3 py-2 shadow-lg border border-slate-100 flex items-center gap-2"
              >
                <span className="text-lg">🎓</span>
                <div>
                  <div className="text-xs font-bold text-brand-navy">400+ Projects</div>
                  <div className="text-[10px] text-slate-400">Delivered</div>
                </div>
              </motion.div>

              {/* Side badges — hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="hidden sm:block absolute -top-3 -right-4 bg-brand-blue rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="text-xs font-bold text-white">IoT</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="hidden sm:block absolute -bottom-4 -right-5 bg-white rounded-xl px-3 py-2 shadow-lg border border-slate-100"
              >
                <div className="text-xs font-bold text-brand-navy">Arduino ⚡</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="hidden sm:block absolute bottom-10 -left-8 bg-brand-navy rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="text-xs font-bold text-white">ESP32</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
