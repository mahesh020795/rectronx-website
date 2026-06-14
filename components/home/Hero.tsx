"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

const rotating = ["ARDUINO", "ESP32", "IOT", "RASPBERRY PI", "PYTHON"];

const stats = [
  { value: "400+", label: "Projects" },
  { value: "500+", label: "Titles" },
  { value: "8", label: "Years" },
  { value: "4.7★", label: "Rating" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
      style={{ background: "#080E1A" }}
      aria-label="Hero"
    >
      {/* Circuit SVG background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <style>{`
            .trace { stroke: #2B7FD4; stroke-width: 1; fill: none; stroke-dasharray: 6 6; animation: dashFlow 18s linear infinite; }
            .trace2 { stroke: #2B7FD4; stroke-width: 1; fill: none; stroke-dasharray: 4 8; animation: dashFlow 26s linear infinite reverse; }
            .node { fill: #2B7FD4; animation: pulse 3s ease-in-out infinite; }
            @keyframes dashFlow { to { stroke-dashoffset: -200; } }
            @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
          `}</style>
        </defs>
        {/* Horizontal traces */}
        <path className="trace" d="M0,120 H300 V80 H600 V120 H900 V60 H1400" />
        <path className="trace2" d="M0,300 H200 V260 H500 V300 H800 V240 H1200 V300 H1440" />
        <path className="trace" d="M0,500 H150 V460 H450 V500 H700 V440 H1100 V500 H1440" />
        <path className="trace2" d="M0,700 H250 V660 H550 V700 H850 V650 H1200" />
        {/* Vertical traces */}
        <path className="trace" d="M200,0 V200 H240 V400 H200 V600" />
        <path className="trace2" d="M500,0 V150 H540 V350 H500 V550 H540 V750" />
        <path className="trace" d="M900,0 V180 H940 V380 H900 V580" />
        <path className="trace2" d="M1200,0 V220 H1240 V450 H1200 V700" />
        {/* Nodes */}
        <circle className="node" cx="300" cy="120" r="4" />
        <circle className="node" cx="600" cy="120" r="4" />
        <circle className="node" cx="500" cy="300" r="4" />
        <circle className="node" cx="800" cy="300" r="4" />
        <circle className="node" cx="450" cy="500" r="4" />
        <circle className="node" cx="700" cy="500" r="4" />
        <circle className="node" cx="200" cy="200" r="3" />
        <circle className="node" cx="500" cy="350" r="3" />
        <circle className="node" cx="900" cy="180" r="3" />
        <circle className="node" cx="1200" cy="450" r="3" />
      </svg>

      {/* Blue ambient glow */}
      <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(43,127,212,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">

          {/* LEFT */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="eyebrow">Penang&apos;s Engineering &amp; Technology Company</span>
            </motion.div>

            {/* Headline — massive */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] font-extrabold leading-[0.92] tracking-[-0.04em] uppercase"
              >
                <span className="text-outline block">Final Year</span>
                <span className="text-white block">Projects.</span>
              </motion.h1>
            </div>

            {/* Rotating tech word */}
            <div className="h-12 sm:h-16 flex items-center gap-3 mt-4 mb-10">
              <span className="text-white/30 text-sm font-bold uppercase tracking-widest">for</span>
              <div className="overflow-hidden h-10 sm:h-14 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotating[idx]}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-brand-blue text-2xl sm:text-4xl font-extrabold uppercase tracking-tight"
                  >
                    {rotating[idx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-white/30 text-sm font-bold uppercase tracking-widest">students</span>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <WhatsAppButton
                label="Get a free quote"
                message="Hi Rectronx! I'd like to get a quote for my FYP project."
                className="justify-center text-sm font-extrabold uppercase tracking-wider px-7 py-3.5 rounded-full"
              />
              <Link href="/catalog"
                className="btn-outline text-sm justify-center">
                Browse 500+ titles <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-4 gap-6 border-t border-white/8 pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.03em]">{s.value}</div>
                  <div className="text-[0.65rem] text-white/35 uppercase tracking-[0.15em] mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(43,127,212,0.3) 0%, transparent 70%)", filter: "blur(24px)" }} />

            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}>
              <Image
                src="/images/project-hero.jpeg"
                alt="IoT gas detector FYP project built by Rectronx — ESP32 with OLED display"
                width={840}
                height={620}
                className="w-full object-cover"
                sizes="420px"
                quality={85}
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080E1A]/80 via-[#080E1A]/10 to-transparent" />

              {/* Image caption */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="eyebrow text-white/40 mb-1">Student FYP · Rectronx Circuits</p>
                <p className="text-white font-bold text-sm">IoT gas detector — ESP32 + OLED</p>
              </div>
            </div>

            {/* Floating badge — replies in 2h */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute -bottom-4 -left-6 bg-brand-blue rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white text-xs font-extrabold uppercase tracking-wider">Replies in 2 hrs</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="relative z-10 border-t border-white/8 overflow-hidden py-4 mt-4">
        <div className="marquee-track marquee-forward flex items-center gap-0">
          {Array(2).fill(["ARDUINO", "ESP32", "RASPBERRY PI", "PYTHON", "REACT", "MQTT", "BLYNK", "PCB DESIGN", "NODE.JS", "C/C++", "MOBILE APPS", "IOT SYSTEMS"]).flat().map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-white/30">{item}</span>
              <span className="w-1 h-1 rounded-full bg-brand-blue" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
