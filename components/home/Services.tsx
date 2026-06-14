"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Zap, Box, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Cpu,
    title: "IoT & embedded systems",
    description:
      "Custom IoT projects using Arduino, ESP32, Raspberry Pi, and more. Sensor integration, wireless communication, real-time monitoring — built and tested.",
    tags: ["Arduino", "ESP32", "MQTT", "Blynk"],
    href: "/projects#iot",
    color: "#2B7FD4",
    bg: "rgba(43,127,212,0.08)",
    border: "rgba(43,127,212,0.15)",
    featured: true,
  },
  {
    icon: Code2,
    title: "Software projects",
    description:
      "Web apps, mobile apps, desktop applications, and automation scripts. Python, React, Node.js — built to your exact requirements.",
    tags: ["Python", "React", "Node.js", "REST API"],
    href: "/projects#software",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.15)",
    featured: false,
  },
  {
    icon: Zap,
    title: "Electronics & PCB",
    description:
      "Circuit design, PCB layout, and electronics prototyping. From concept to working hardware ready for submission.",
    tags: ["Circuit Design", "PCB", "Prototyping"],
    href: "/projects#electronics",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.15)",
    featured: false,
  },
  {
    icon: Box,
    title: "Mechanical & robotics",
    description:
      "Mechanical system design, robot prototypes, and automation. CAD design integrated with embedded control systems.",
    tags: ["CAD", "Robotics", "Automation", "3D Print"],
    href: "/projects#mechanical",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.15)",
    featured: false,
  },
];

export default function Services() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-14">
          <div>
            <span className="section-label-pill mb-4 inline-flex">What we do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-brand-navy-mid tracking-[-0.02em] max-w-sm">
              Final year project services
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Specialists in helping engineering students complete their FYP on time, with quality that meets university requirements.
          </p>
        </div>

        {/* Asymmetric grid: 1 large featured + 3 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Featured — IoT (spans 2 rows on lg) */}
          {(() => {
            const s = services[0];
            const Icon = s.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lg:row-span-2"
              >
                <Link
                  href={s.href}
                  className="group flex flex-col h-full bg-white rounded-2xl p-8 border hover-lift transition-all duration-300 relative overflow-hidden"
                  style={{ borderColor: s.border }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: s.color }} />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                    style={{ backgroundColor: s.color, boxShadow: `0 8px 24px ${s.color}35` }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy-mid mb-3 tracking-[-0.01em]">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed flex-1">{s.description}</p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg border"
                        style={{ background: s.bg, borderColor: s.border, color: s.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200" style={{ color: s.color }}>
                    Explore projects <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            );
          })()}

          {/* 3 smaller cards */}
          {services.slice(1).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={s.href}
                className="group flex flex-col h-full bg-white rounded-2xl p-6 border hover-lift transition-all duration-300 relative overflow-hidden"
                style={{ borderColor: s.border }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: s.color }} />

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: s.color, boxShadow: `0 6px 16px ${s.color}30` }}
                  >
                    <s.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-brand-navy-mid text-base mt-2 tracking-[-0.01em]">{s.title}</h3>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed flex-1">{s.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[0.7rem] font-medium px-2 py-0.5 rounded-md border"
                      style={{ background: s.bg, borderColor: s.border, color: s.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200" style={{ color: s.color }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
