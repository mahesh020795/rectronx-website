import { Metadata } from "next";
import Link from "next/link";
import {
  Leaf, Wifi, Bell, BarChart2, Droplets, Thermometer,
  Sun, Gauge, FlaskConical, Check, ArrowLeft, ArrowUpRight,
  Smartphone, Cpu, Cloud,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Smart Plant Monitor — IoT Plant Monitoring & Auto-Irrigation System | Rectronx",
  description:
    "ESP32-based smart plant monitoring system with Flutter mobile app. Live soil moisture, temperature, humidity, light, and water level sensors. Auto-irrigation, push notifications, and remote pump control via Firebase.",
  keywords: [
    "smart plant monitor malaysia",
    "iot plant monitoring system",
    "esp32 plant watering system",
    "auto irrigation system malaysia",
    "flutter iot app malaysia",
    "smart garden system",
    "plant sensor system",
    "rectronx iot product",
  ],
  alternates: { canonical: "/products/smart-plant-monitor", languages: { "en-MY": "https://rectronx.com/products/smart-plant-monitor" } },
  openGraph: {
    title: "Smart Plant Monitor — IoT Auto-Irrigation System | Rectronx Circuits",
    description: "ESP32 + Flutter mobile app for real-time plant monitoring and automatic irrigation. 6 sensors, push alerts, remote control.",
    url: "https://rectronx.com/products/smart-plant-monitor",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Smart Plant Monitor by Rectronx" }],
  },
};

const sensors = [
  { icon: Droplets,    label: "Soil Moisture",    desc: "Capacitive sensor reads soil wetness % in real time",      color: "text-blue-500",   bg: "bg-blue-50"   },
  { icon: Thermometer, label: "Air Temperature",   desc: "DHT11 measures ambient temperature up to 0.5°C accuracy",  color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Gauge,       label: "Humidity",          desc: "DHT11 relative humidity monitoring for optimal plant health", color: "text-teal-500",  bg: "bg-teal-50"   },
  { icon: Sun,         label: "Light Intensity",   desc: "BH1750 measures lux level for light sufficiency tracking",  color: "text-amber-500",  bg: "bg-amber-50"  },
  { icon: Droplets,    label: "Water Tank Level",  desc: "HC-SR04 ultrasonic sensor measures tank water level in cm", color: "text-cyan-500",   bg: "bg-cyan-50"   },
  { icon: FlaskConical,label: "Soil Temperature",  desc: "DS18B20 waterproof probe for accurate root-zone temp",      color: "text-red-400",    bg: "bg-red-50"    },
];

const appFeatures = [
  { icon: BarChart2, label: "Live Dashboard",        desc: "All 6 sensor readings updated every 30 seconds" },
  { icon: Bell,      label: "Push Notifications",    desc: "Alerts for dry soil, low water, and high temperature" },
  { icon: Droplets,  label: "Pump Control",          desc: "Manual ON/OFF or full Auto mode from your phone" },
  { icon: Leaf,      label: "Watering Schedules",    desc: "Set time, days, and duration for automated watering" },
  { icon: BarChart2, label: "Sensor History Charts", desc: "24-hour line charts for every sensor with min/avg/max" },
  { icon: Gauge,     label: "Custom Thresholds",     desc: "Set your own alert thresholds directly from the app" },
];

const techStack = [
  { icon: Cpu,        label: "Hardware",  items: ["ESP32 microcontroller", "DHT11 · BH1750 · HC-SR04", "DS18B20 · Relay module", "16×2 I²C LCD display"] },
  { icon: Smartphone, label: "Mobile App", items: ["Flutter (Android)", "Provider state management", "fl_chart for sensor graphs", "Firebase Auth + FCM"] },
  { icon: Cloud,      label: "Backend",   items: ["Firebase Realtime Database", "Firebase Cloud Messaging", "Real-time data streaming", "Per-user secure data isolation"] },
];

const howItWorks = [
  { step: "01", title: "Sensors read",     desc: "ESP32 reads all 6 sensors every 30 seconds" },
  { step: "02", title: "Data uploaded",    desc: "Readings pushed to Firebase Realtime Database instantly" },
  { step: "03", title: "App syncs",        desc: "Flutter app streams live data — no manual refresh needed" },
  { step: "04", title: "Alerts sent",      desc: "ESP32 triggers FCM push notifications on threshold breach" },
  { step: "05", title: "You take action",  desc: "Tap to run the pump, adjust schedule, or check history" },
];

export default function SmartPlantMonitorPage() {
  return (
    <div className="pt-24 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Products", url: "https://rectronx.com/products" },
        { name: "Smart Plant Monitor", url: "https://rectronx.com/products/smart-plant-monitor" },
      ])} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* Back */}
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row mb-16">
          {/* Left green panel */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center justify-center py-14 px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-green-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                IoT Product
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Leaf size={36} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-white tracking-tight">Smart Plant</div>
              <div className="text-2xl font-bold text-green-300 tracking-tight">Monitor</div>
              <div className="mt-2 text-green-300 text-sm font-medium">by Rectronx Circuits</div>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-brand-navy leading-snug">
              IoT plant monitoring & auto-irrigation system
            </h1>
            <p className="mt-3 text-slate-500 leading-relaxed">
              A complete hardware + software solution for smart plant care. An ESP32 reads 6 sensors continuously and streams live data to a Flutter mobile app via Firebase — giving you full visibility and remote control over your plant&apos;s environment, anywhere, anytime.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "6 sensors: soil, air temp, humidity, light, water level, soil temp",
                "Auto-irrigation — pump runs on schedule or when soil gets too dry",
                "Push notifications for critical alerts",
                "Remote pump control from your phone",
                "Full sensor history with charts",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-green-600" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton
                label="Get This for My Business"
                message="Hi Rectronx! I'm interested in the Smart Plant Monitor system. Can you tell me more?"
              />
              <a
                href="https://github.com/mahesh020795/smart-plant-monitor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View on GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Sensors */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Hardware</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">6 sensors, one device</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Every sensor chosen to give a complete picture of your plant&apos;s health and environment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sensors.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-slate-100 p-6 hover:border-green-200 hover:shadow-sm transition-all">
                  <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={s.color} />
                  </div>
                  <h3 className="font-bold text-brand-navy mb-1">{s.label}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16 bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="section-label">Flow</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">How it works</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-4">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="flex-1 flex flex-col items-center text-center relative">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm mb-3 shrink-0">
                  {step.step}
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px border-t-2 border-dashed border-green-200" />
                )}
                <h3 className="font-bold text-brand-navy text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Mobile App</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Everything in your pocket</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">The Flutter Android app connects to your plant in real time via Firebase.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {appFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex gap-4 p-5 rounded-xl border border-slate-100 hover:border-green-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-1">{f.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Technology</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Built with proven tech</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-brand-navy flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-bold text-brand-navy">{t.label}</h3>
                  </div>
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={13} className="text-green-500 shrink-0" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-brand-navy text-white p-10 md:p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-5">
            <Leaf size={24} className="text-green-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Want this for your farm, nursery, or greenhouse?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Rectronx builds and delivers the complete system — hardware, firmware, and mobile app — tailored to your specific setup.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WhatsAppButton
              label="Get a Quote"
              message="Hi Rectronx! I'm interested in the Smart Plant Monitor for my business. Can you give me a quote?"
            />
            <Link href="/contact" className="btn-secondary border-white/20 text-white hover:bg-white/10">
              Contact Us <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
