"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Smart Temperature Controller",
    category: "IoT",
    description:
      "ESP32-based temperature monitoring system with real-time dashboard, SMS alerts, and mobile app control via Blynk.",
    tags: ["ESP32", "Blynk", "Sensor", "OLED"],
    icon: Cpu,
  },
  {
    title: "GSM-Based Security System",
    category: "Electronics",
    description:
      "Home security alarm system with GSM module for SMS alerts, PIR motion detection, and keypad access control.",
    tags: ["Arduino", "GSM", "PIR", "Keypad"],
    icon: Cpu,
  },
  {
    title: "Inventory Management System",
    category: "Software",
    description:
      "Web-based inventory tracking system with barcode scanning, low-stock alerts, and detailed reporting dashboard.",
    tags: ["Python", "Flask", "MySQL", "Bootstrap"],
    icon: Code2,
  },
  {
    title: "IoT Plant Monitoring",
    category: "IoT",
    description:
      "Automated plant care system monitoring soil moisture, humidity, and light — with auto-watering and Telegram notifications.",
    tags: ["NodeMCU", "MQTT", "Telegram Bot"],
    icon: Cpu,
  },
  {
    title: "Line Following Robot",
    category: "Robotics",
    description:
      "Autonomous robot that navigates using infrared sensors, with PID control for smooth and accurate line tracking.",
    tags: ["Arduino", "PID", "IR Sensors", "Motor Driver"],
    icon: Cpu,
  },
  {
    title: "Student Attendance System",
    category: "Software",
    description:
      "RFID-based attendance tracking with web portal for lecturers, automated reports, and real-time student notifications.",
    tags: ["RFID", "PHP", "MySQL", "Arduino"],
    icon: Code2,
  },
];

const categoryColors: Record<string, string> = {
  IoT: "bg-blue-50 text-blue-600",
  Electronics: "bg-amber-50 text-amber-600",
  Software: "bg-violet-50 text-violet-600",
  Robotics: "bg-emerald-50 text-emerald-600",
};

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="section-label">Our Work</span>
            <h2 className="mt-3 text-4xl font-bold text-brand-navy tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl">
              A sample of the engineering projects we&apos;ve delivered for students
              across Malaysia.
            </p>
          </div>
          <Link href="/projects" className="btn-secondary shrink-0">
            All Projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="card p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    categoryColors[p.category] || "bg-slate-100 text-slate-500"
                  }`}
                >
                  {p.category}
                </span>
                <p.icon size={16} className="text-slate-300" />
              </div>
              <h3 className="font-semibold text-brand-navy mb-2">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
