import { Metadata } from "next";
import { Cpu, Code2, Zap, Box } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "FYP Projects Portfolio | Arduino, IoT & Software — Rectronx Malaysia",
  description:
    "Browse 100+ Final Year Projects delivered across Malaysia. IoT, Arduino, ESP32, Raspberry Pi, Software & Robotics FYP solutions with full documentation.",
};

const categories = [
  {
    id: "iot",
    label: "IoT & Embedded",
    icon: Cpu,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: "software",
    label: "Software",
    icon: Code2,
    color: "text-violet-600 bg-violet-50",
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: Zap,
    color: "text-amber-600 bg-amber-50",
  },
  {
    id: "mechanical",
    label: "Mechanical & Robotics",
    icon: Box,
    color: "text-emerald-600 bg-emerald-50",
  },
];

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

const categoryColors: Record<string, string> = {
  iot: "bg-blue-50 text-blue-600",
  software: "bg-violet-50 text-violet-600",
  electronics: "bg-amber-50 text-amber-600",
  mechanical: "bg-emerald-50 text-emerald-600",
};

const categoryLabels: Record<string, string> = {
  iot: "IoT",
  software: "Software",
  electronics: "Electronics",
  mechanical: "Robotics",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <span className="section-label">Our Portfolio</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-navy tracking-tight">
            Final Year Projects
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
            Real projects delivered to real students. Every project is built
            to your university&apos;s requirements, with documentation included.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              label="Request a Custom Project"
              message="Hi Rectronx! I'd like to request a custom FYP."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${c.color}`}
            >
              <c.icon size={14} />
              {c.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allProjects.map((p) => (
            <div key={p.title} id={p.category} className="card p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[p.category]}`}>
                  {categoryLabels[p.category]}
                </span>
              </div>
              <h3 className="font-semibold text-brand-navy mb-2">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-brand-navy">Don&apos;t See Your Project Type?</h2>
          <p className="mt-3 text-slate-500 max-w-md mx-auto">
            We handle all types of FYPs. Send us your brief and we&apos;ll tell you if we can help.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              label="Send Your Requirements"
              message="Hi Rectronx! I have a custom FYP requirement I'd like to discuss."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
