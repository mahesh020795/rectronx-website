"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Zap, Box } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Cpu,
    title: "IoT & Embedded Systems",
    description:
      "Custom IoT projects using Arduino, ESP32, Raspberry Pi, and more. Sensor integration, wireless communication, real-time monitoring.",
    tags: ["Arduino", "ESP32", "MQTT", "Blynk"],
    href: "/projects#iot",
  },
  {
    icon: Code2,
    title: "Software Projects",
    description:
      "Web apps, desktop applications, and automation scripts. Python, React, Node.js — built to your exact requirements.",
    tags: ["Python", "React", "Node.js", "REST API"],
    href: "/projects#software",
  },
  {
    icon: Zap,
    title: "Electronics & PCB",
    description:
      "Circuit design, PCB layout, and electronics prototyping. From concept to working hardware, ready for submission.",
    tags: ["Circuit Design", "PCB", "Prototyping"],
    href: "/projects#electronics",
  },
  {
    icon: Box,
    title: "Mechanical & Robotics",
    description:
      "Mechanical system design, robot prototypes, and automation. CAD design integrated with embedded control systems.",
    tags: ["CAD", "Robotics", "Automation", "3D Print"],
    href: "/projects#mechanical",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={s.href} className="card p-6 flex flex-col h-full group block">
                <div className="w-10 h-10 rounded-lg bg-brand-blue-light flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-colors duration-300">
                  <s.icon size={18} className="text-brand-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-brand-navy mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
