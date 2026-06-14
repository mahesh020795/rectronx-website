"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

const stats = [
  { value: "400+", label: "Projects delivered" },
  { value: "500+", label: "Titles available" },
  { value: "8 yrs", label: "Experience" },
  { value: "4.7★", label: "Google rating" },
];

const tags = ["Arduino", "ESP32", "IoT", "Raspberry Pi", "Python", "React"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16 grain-overlay"
      style={{ background: "linear-gradient(160deg, #0B1628 0%, #0F1C2E 50%, #0d1e35 100%)" }}
      aria-label="Hero section"
    >
      {/* Ambient blue glow — top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-5%",
          width: "55%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(43,127,212,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Secondary glow — bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0",
          left: "-10%",
          width: "40%",
          height: "50%",
          background: "radial-gradient(ellipse at center, rgba(43,127,212,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Text + CTAs ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 text-brand-blue text-xs font-semibold tracking-[0.10em] uppercase bg-brand-blue/12 border border-brand-blue/20 px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                Malaysia&apos;s engineering & technology company
              </span>
            </motion.div>

            {/* H1 — large, tight, weighted */}
            <motion.h1
              variants={item}
              className="text-[2.6rem] sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            >
              FYP projects
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #4da3f5 0%, #2B7FD4 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                done right.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={item}
              className="mt-6 text-[1.05rem] text-slate-300/80 leading-[1.7] max-w-[42ch]"
            >
              Custom IoT, Arduino &amp; Raspberry Pi final year projects from Penang.
              Hardware, code, documentation — all in one price. Delivered on time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <WhatsAppButton
                label="Get a free quote"
                message="Hi Rectronx! I'd like to get a quote for my FYP project."
                className="text-[0.95rem] px-6 py-3 justify-center font-semibold"
              />
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 px-6 py-3 rounded-lg text-[0.95rem] font-medium hover:border-white/30 hover:text-white transition-all duration-200 hover:bg-white/5"
              >
                Browse 500+ titles <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-4 gap-4 border-t border-white/8 pt-10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-[-0.02em]">
                    {s.value}
                  </div>
                  <div className="text-[0.72rem] text-slate-400 mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech pills */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-400 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {["Arduino", "ESP32", "IoT", "Raspberry Pi"].includes(tag) ? (
                    <Cpu size={9} className="text-brand-blue" />
                  ) : (
                    <Code2 size={9} className="text-brand-blue" />
                  )}
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Project image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end order-first lg:order-last lg:pt-14"
          >
            <div className="relative w-full max-w-[420px] mx-auto">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(43,127,212,0.35) 0%, transparent 70%)",
                  filter: "blur(32px)",
                  transform: "scale(0.9) translateY(16px)",
                }}
              />

              {/* Image card */}
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                <Image
                  src="/images/project-hero.jpeg"
                  alt="IoT gas detector project built by Rectronx Circuits — MQ2/MQ5 sensor with OLED display"
                  width={800}
                  height={560}
                  className="w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  quality={85}
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-[0.65rem] font-medium tracking-widest uppercase mb-1">Student FYP by Rectronx</p>
                    <p className="text-white text-sm font-semibold leading-snug">IoT gas detector — ESP32 + OLED</p>
                  </div>
                </div>
              </div>

              {/* Floating badge — 400+ projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-5 -left-5 glass rounded-xl px-3 py-2.5 flex items-center gap-2.5"
              >
                <span className="text-xl">🎓</span>
                <div>
                  <div className="text-xs font-bold text-white">400+ Projects</div>
                  <div className="text-[10px] text-slate-400">Delivered</div>
                </div>
              </motion.div>

              {/* Floating badge — response time */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Replies in 2 hrs</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 ml-3.5">WhatsApp response</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
