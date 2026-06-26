"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trackWhatsAppLead } from "@/lib/analytics";

const categoryImages: Record<string, string> = {
  iot: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
  electronics: "https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=500&q=80",
  software: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  mechanical: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80",
};

const categoryColors: Record<string, string> = {
  iot: "bg-blue-600 text-white",
  software: "bg-violet-600 text-white",
  electronics: "bg-amber-600 text-white",
  mechanical: "bg-emerald-600 text-white",
};

const categoryLabels: Record<string, string> = {
  iot: "IoT & Embedded",
  software: "Software",
  electronics: "Electronics",
  mechanical: "Robotics",
};

const allProjects = [
  { title: "Smart Temperature Controller", category: "iot", tags: ["ESP32", "Blynk", "Sensor"], description: "Real-time temperature monitoring with mobile dashboard and auto alerts." },
  { title: "GSM-Based Security System", category: "electronics", tags: ["Arduino", "GSM", "PIR"], description: "Home alarm system with SMS alerts and keypad access control." },
  { title: "Inventory Management System", category: "software", tags: ["Python", "Flask", "MySQL"], description: "Web-based inventory tracker with barcode scanning and reporting." },
  { title: "IoT Plant Monitoring", category: "iot", tags: ["NodeMCU", "MQTT", "Telegram"], description: "Auto-watering plant system with soil and humidity monitoring." },
  { title: "Line Following Robot", category: "mechanical", tags: ["Arduino", "PID", "IR Sensors"], description: "Autonomous robot with PID-controlled line tracking." },
  { title: "RFID Attendance System", category: "software", tags: ["RFID", "PHP", "MySQL"], description: "Card-tap attendance with web portal and auto-reporting." },
  { title: "Smart Parking System", category: "iot", tags: ["Arduino", "Ultrasonic", "LCD"], description: "Automated parking slot detection with LED and LCD indicators." },
  { title: "DC Motor Speed Control", category: "electronics", tags: ["Arduino", "PWM", "L298N"], description: "Closed-loop DC motor control with PID and real-time feedback." },
  { title: "Water Quality Monitor", category: "iot", tags: ["ESP32", "pH Sensor", "TDS"], description: "Measures pH, turbidity, and TDS with cloud logging via MQTT." },
  { title: "Student Result System", category: "software", tags: ["PHP", "MySQL", "Bootstrap"], description: "Academic result management portal for students and lecturers." },
  { title: "Robotic Arm", category: "mechanical", tags: ["Servo", "Arduino", "Joystick"], description: "4-DOF robotic arm with manual and automated control modes." },
  { title: "Fire Detection System", category: "electronics", tags: ["Arduino", "Flame Sensor", "Buzzer"], description: "Multi-zone fire alarm with GSM notification and relay control." },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "iot", label: "IoT & Embedded" },
  { key: "software", label: "Software" },
  { key: "electronics", label: "Electronics" },
  { key: "mechanical", label: "Robotics" },
];

export default function ProjectsClient() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeTab);

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2B7FD4] bg-blue-50 px-3 py-1 rounded-full mb-3">
              Our Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] tracking-tight">
              Final Year Projects
            </h1>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
              Real projects delivered to real students. Every project is built to your
              university&apos;s requirements, with full documentation included.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            {[
              { value: "400+", label: "Projects Delivered" },
              { value: "500+", label: "Project Titles Available" },
              { value: "Free", label: "Consultation" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-slate-200 rounded-xl px-8 py-4 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-[#2B7FD4]">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <WhatsAppButton
              label="Request a Custom Project"
              message="Hi Rectronx! I'd like to request a custom FYP."
              trackingSource="projects_hero"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Filter tabs */}
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 flex-nowrap sm:flex-wrap sm:justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab.key
                  ? "bg-[#2B7FD4] text-white border-[#2B7FD4] shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#2B7FD4] hover:text-[#2B7FD4]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={categoryImages[p.category]}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                {/* Category badge overlay */}
                <span
                  className={`absolute bottom-2 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    categoryColors[p.category]
                  }`}
                >
                  {categoryLabels[p.category]}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-[#0F1C2E] text-base mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA link */}
                <a
                  href={`https://wa.me/601172792500?text=Hi%20Rectronx!%20I%27m%20interested%20in%20a%20project%20similar%20to%20${encodeURIComponent(p.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppLead("projects_card")}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2B7FD4] hover:gap-2.5 transition-all"
                >
                  Get Similar Project <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#0F1C2E] rounded-2xl p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Don&apos;t See Your Project Type?
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            We handle all types of FYPs. Send us your brief and we&apos;ll tell you if we
            can help.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              label="Send Your Requirements"
              message="Hi Rectronx! I have a custom FYP requirement I'd like to discuss."
              trackingSource="projects_bottom_cta"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
