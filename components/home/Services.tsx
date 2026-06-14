"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Custom projects",
    description: "Bring your own idea — we scope, design, and build it from scratch. Any platform, any complexity. Tell us what you need.",
    tags: ["Any Platform", "Custom Scope", "Full Build"],
    href: "/contact",
    accentColor: "#2B7FD4",
    size: "lg",
  },
  {
    title: "IoT & embedded systems",
    description: "Arduino, ESP32, Raspberry Pi. Sensor integration, wireless comms, real-time dashboards — built and tested.",
    tags: ["Arduino", "ESP32", "MQTT", "Blynk"],
    href: "/projects#iot",
    accentColor: "#7c3aed",
    size: "sm",
  },
  {
    title: "Software projects",
    description: "Web apps, mobile apps, automation scripts. Python, React, Node.js.",
    tags: ["Python", "React", "Node.js"],
    href: "/projects#software",
    accentColor: "#059669",
    size: "sm",
  },
  {
    title: "Electronics & PCB",
    description: "Circuit design, PCB layout, prototyping. Concept to working hardware.",
    tags: ["PCB", "Circuit", "Prototyping"],
    href: "/projects#electronics",
    accentColor: "#d97706",
    size: "sm",
  },
];

export default function Services() {
  return (
    <section className="py-24 sm:py-32 bg-[#080E1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="eyebrow mb-3">What we build</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-white">
              Final year project<br />services.
            </h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/40 hover:text-white transition-colors shrink-0">
            All services <ArrowUpRight size={13} />
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8">

          {/* Big featured card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:row-span-2 lg:col-span-1"
          >
            <Link href={services[0].href}
              className="group flex flex-col h-full bg-[#080E1A] p-10 hover:bg-white/[0.03] transition-colors duration-300 min-h-[420px]">
              {/* Number */}
              <div className="text-[6rem] font-extrabold leading-none tracking-[-0.05em] mb-auto"
                style={{ WebkitTextStroke: `1.5px ${services[0].accentColor}`, color: "transparent" }}>
                01
              </div>
              <div>
                <h3 className="text-2xl font-extrabold uppercase tracking-[-0.02em] text-white mb-3">
                  {services[0].title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{services[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {services[0].tags.map((t) => (
                    <span key={t} className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                      style={{ borderColor: `${services[0].accentColor}40`, color: services[0].accentColor }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all"
                  style={{ color: services[0].accentColor }}>
                  Explore <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* 3 smaller cards */}
          {services.slice(1).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.07 }}
            >
              <Link href={s.href}
                className="group flex flex-col h-full bg-[#080E1A] p-8 hover:bg-white/[0.03] transition-colors duration-300 min-h-[200px]">
                <div className="flex items-start justify-between mb-auto">
                  <span className="text-4xl font-extrabold leading-none tracking-[-0.04em]"
                    style={{ WebkitTextStroke: `1.5px ${s.accentColor}`, color: "transparent" }}>
                    0{i + 2}
                  </span>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors mt-1" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-extrabold uppercase tracking-[-0.01em] text-white mb-2">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {s.tags.map((t) => (
                      <span key={t} className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{ borderColor: `${s.accentColor}40`, color: s.accentColor }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
