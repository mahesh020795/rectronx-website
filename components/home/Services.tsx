"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Zap, Box, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Cpu,
    title: "IoT & Embedded Systems",
    description:
      "Custom IoT projects using Arduino, ESP32, Raspberry Pi, and more. Sensor integration, wireless communication, real-time monitoring.",
    tags: ["Arduino", "ESP32", "MQTT", "Blynk"],
    href: "/projects#iot",
    accent: "from-blue-500 to-brand-blue",
  },
  {
    icon: Code2,
    title: "Software Projects",
    description:
      "Web apps, mobile apps, desktop applications, and automation scripts. Python, React, Node.js — built to your exact requirements.",
    tags: ["Python", "React", "Node.js", "REST API"],
    href: "/projects#software",
    accent: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Electronics & PCB",
    description:
      "Circuit design, PCB layout, and electronics prototyping. From concept to working hardware, ready for submission.",
    tags: ["Circuit Design", "PCB", "Prototyping"],
    href: "/projects#electronics",
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: Box,
    title: "Mechanical & Robotics",
    description:
      "Mechanical system design, robot prototypes, and automation. CAD design integrated with embedded control systems.",
    tags: ["CAD", "Robotics", "Automation", "3D Print"],
    href: "/projects#mechanical",
    accent: "from-emerald-500 to-teal-600",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-label">What We Do</span>
          <h2 className="mt-3 text-4xl font-bold text-brand-navy tracking-tight">
            Final Year Project Services
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            We specialise in helping students complete their FYP on time,
            with quality work that meets university requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={s.href}
                className="group block bg-white rounded-2xl p-8 h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Colored top border accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.accent}`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center mb-6 shadow-md`}>
                  <s.icon size={22} className="text-white" />
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-3">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {s.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Learn more link */}
                <div className="mt-6 flex items-center gap-1.5 text-brand-blue text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
