import { Metadata } from "next";
import { MessageSquare, ArrowUpRight, Car, ScanLine, MapPin, Leaf, Check } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Commercial Software Products Malaysia | Spark AI, Smart Parking, Smart Plant — Rectronx",
  description:
    "Commercial software products deployed across Malaysia by Rectronx Circuits — Spark AI WhatsApp assistant, Smart Parking System, Attendance & Access Control, Fleet Tracking, and Smart Plant Monitor IoT system.",
  keywords: ["whatsapp ai bot malaysia", "spark ai whatsapp", "smart parking system malaysia", "attendance system malaysia", "fleet tracking malaysia", "commercial software malaysia", "smart plant monitor iot", "plant monitoring system malaysia"],
  alternates: { canonical: "/products", languages: { "en-MY": "https://rectronx.com/products" } },
  openGraph: {
    title: "Commercial Software Products Malaysia — Rectronx Circuits",
    description:
      "Real products deployed across Malaysia — Spark AI WhatsApp assistant, Smart Parking, Attendance & Access Control, Fleet Tracking.",
    url: "https://rectronx.com/products",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Rectronx Circuits Commercial Products" }],
  },
};

const otherProducts = [
  {
    id: "parking",
    icon: Car,
    badge: "Deployed",
    color: "blue",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-t-blue-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "Smart Parking Management System",
    description:
      "Full-stack parking management system deployed in commercial buildings. Real-time slot monitoring, automated payment integration, RFID vehicle identification, and owner dashboard with analytics.",
    features: [
      "Real-time slot availability display",
      "RFID vehicle identification",
      "Automated payment & ticketing",
      "Owner analytics dashboard",
      "SMS/app alerts for full capacity",
    ],
    whatsappMsg: "Hi Rectronx! I'd like to inquire about the Smart Parking Management System.",
    whatsappLabel: "Inquire about Parking System",
    detailUrl: "/products/smart-parking",
  },
  {
    id: "attendance",
    icon: ScanLine,
    badge: "Deployed",
    color: "violet",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    borderColor: "border-t-violet-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "Attendance & Access Control System",
    description:
      "Enterprise attendance and access control deployed for schools, factories, and offices. Biometric fingerprint + RFID card dual-authentication with real-time database sync.",
    features: [
      "Fingerprint + RFID dual authentication",
      "Real-time attendance database",
      "Auto-generate attendance reports",
      "Multi-door / multi-location support",
      "SMS alerts for unauthorized access",
    ],
    whatsappMsg: "Hi Rectronx! I'd like to inquire about the Attendance & Access Control System.",
    whatsappLabel: "Inquire about Attendance System",
    detailUrl: "/products/attendance-access-control",
  },
  {
    id: "fleet",
    icon: MapPin,
    badge: "Deployed",
    color: "emerald",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-t-emerald-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "Fleet & Vehicle Tracking Dashboard",
    description:
      "Commercial GPS fleet tracking system with live dashboard. Real-time vehicle location, route history, driver behavior monitoring, and automated SMS alerts for commercial fleets.",
    features: [
      "Real-time GPS tracking on live map",
      "Route history & playback",
      "Driver behavior monitoring",
      "Fuel consumption analytics",
      "Instant SMS alerts for speeding/geofence breach",
    ],
    whatsappMsg: "Hi Rectronx! I'd like to inquire about the Fleet & Vehicle Tracking Dashboard.",
    whatsappLabel: "Inquire about Fleet Tracking",
    detailUrl: "/products/fleet-tracking",
  },
  {
    id: "smart-plant",
    icon: Leaf,
    badge: "Available",
    color: "green",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-t-green-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "Smart Plant Monitor",
    description:
      "IoT-based smart plant monitoring and auto-irrigation system. ESP32 hardware with 6 sensors streams live data to a Flutter mobile app via Firebase — with scheduled watering, push alerts, and remote pump control.",
    features: [
      "Live soil moisture, temperature & humidity",
      "Auto-irrigation with schedule control",
      "Push notifications for low water & dry soil",
      "Remote pump ON/OFF/Auto from app",
      "24-hour sensor history with charts",
    ],
    whatsappMsg: "Hi Rectronx! I'd like to inquire about the Smart Plant Monitor system.",
    whatsappLabel: "Inquire about Smart Plant Monitor",
    detailUrl: "/products/smart-plant-monitor",
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Products", url: "https://rectronx.com/products" },
      ])} />
      <JsonLd schema={itemListSchema([
        { position: 1, name: "Spark — AI WhatsApp Assistant", url: "https://rectronx.com/products#spark" },
        { position: 2, name: "Smart Parking Management System", url: "https://rectronx.com/products#parking" },
        { position: 3, name: "Attendance & Access Control System", url: "https://rectronx.com/products#attendance" },
        { position: 4, name: "Fleet & Vehicle Tracking Dashboard", url: "https://rectronx.com/products#fleet" },
        { position: 5, name: "Smart Plant Monitor", url: "https://rectronx.com/products/smart-plant-monitor" },
      ])} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-label">Commercial Products</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-navy tracking-tight">
            Built for Real Business
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Beyond FYP work, Rectronx Circuits ships commercial products deployed in real businesses across Malaysia.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-16 py-6 bg-slate-50 rounded-2xl border border-slate-100">
          {[
            { value: "5", label: "Commercial Products" },
            { value: "Deployed", label: "Across Malaysia" },
            { value: "Real", label: "Business Clients" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-brand-navy">{s.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FLAGSHIP — Spark (full width, premium) */}
        <div id="spark" className="mb-10">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg flex flex-col md:flex-row min-h-0">
            {/* Left navy panel */}
            <div
              className="relative w-full md:w-2/5 bg-brand-navy flex flex-col items-center justify-center py-10 px-8 overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(43,127,212,0.18) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(43,127,212,0.25),transparent)]" />
              <div className="relative flex flex-col items-center text-center">
                {/* Flagship badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  ★ Flagship Product
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                  <MessageSquare size={28} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">Spark</div>
                <div className="mt-2 text-blue-300 text-sm font-medium">by Rectronx</div>
                <div className="mt-4 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Live
                </div>
              </div>
            </div>

            {/* Right content panel */}
            <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-brand-navy">
                AI-powered WhatsApp assistant for your business
              </h2>
              <p className="mt-3 text-slate-500 leading-relaxed">
                Spark connects to your WhatsApp number and handles customer conversations automatically using AI. Answer FAQs, capture leads, send updates, and never miss an inquiry — even while you sleep. Built specifically for Malaysian SMEs.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Auto-reply customer messages with AI",
                  "Capture and qualify leads automatically",
                  "Integrate with your existing business workflow",
                  "Dashboard to monitor all conversations",
                  "Setup in minutes, no technical knowledge needed",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                      <Check size={11} className="text-brand-blue" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton
                  label="Get Spark for Your Business"
                  message="Hi! I'm interested in Spark for my business. Can you tell me more?"
                />
                <Link href="/products/spark" className="btn-secondary">
                  Learn More <ArrowUpRight size={14} />
                </Link>
                <a
                  href="https://dashboard.rectronx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Open Dashboard <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3-product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                id={product.id}
                className={`rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden border-t-4 ${product.borderColor}`}
              >
                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + badge row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${product.iconBg} flex items-center justify-center`}>
                      <Icon size={22} className={product.iconColor} />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.badgeBg}`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Title + description */}
                  <h3 className="text-lg font-bold text-brand-navy mb-3">{product.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check size={14} className="text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex flex-col gap-2">
                    <WhatsAppButton
                      label={product.whatsappLabel}
                      message={product.whatsappMsg}
                      className="w-full justify-center text-sm"
                    />
                    {product.detailUrl && (
                      <Link
                        href={product.detailUrl}
                        className="btn-secondary w-full justify-center text-sm text-center"
                      >
                        View Details <ArrowUpRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
