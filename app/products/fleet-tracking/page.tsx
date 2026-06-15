import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Navigation, BarChart2, Bell, Fuel, Shield,
  ArrowLeft, ArrowUpRight, Check, Clock, Cpu, Server, Database,
  Route, AlertTriangle,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Fleet & Vehicle Tracking System Malaysia | GPS Live Dashboard — Rectronx",
  description:
    "Commercial GPS fleet tracking system with live dashboard deployed across Malaysia. Real-time vehicle location, route history, driver behaviour monitoring, fuel analytics, and automated SMS alerts for geofence and speeding.",
  keywords: ["fleet tracking system malaysia", "gps vehicle tracking malaysia", "fleet management system", "vehicle tracking malaysia", "lorry tracking system malaysia", "commercial fleet gps"],
  alternates: { canonical: "/products/fleet-tracking", languages: { "en-MY": "https://rectronx.com/products/fleet-tracking" } },
  openGraph: {
    title: "Fleet & Vehicle Tracking System Malaysia — Rectronx Circuits",
    description: "Real-time GPS tracking, route history, driver behaviour, fuel analytics, and instant SMS alerts. Deployed for commercial fleets across Malaysia.",
    url: "https://rectronx.com/products/fleet-tracking",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Fleet & Vehicle Tracking System by Rectronx" }],
  },
};

const features = [
  { icon: MapPin,        label: "Live GPS Tracking",      desc: "See every vehicle's exact position on a live map, updating every 30 seconds. Know where your fleet is at all times.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Route,         label: "Route History Playback", desc: "Replay any vehicle's full route for any past date. See exactly where it went, how long it stopped, and at what speed.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: AlertTriangle, label: "Speeding Detection",     desc: "System flags when any driver exceeds a set speed limit. Instant SMS to fleet manager — before a fine arrives.", color: "text-red-400", bg: "bg-red-50" },
  { icon: Navigation,    label: "Geofence Alerts",        desc: "Define zones on the map. Get alerted the moment a vehicle enters or exits an area — after hours, out-of-route, or restricted.", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: Fuel,          label: "Fuel Analytics",         desc: "Monitor fuel consumption per vehicle, per route, per driver. Identify inefficiency and reduce fuel costs with real data.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: BarChart2,     label: "Driver Behaviour",       desc: "Scores each driver on harsh braking, sharp cornering, and speeding events. Reward good drivers, coach problem ones.", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Clock,         label: "Idle Time Monitoring",   desc: "Tracks how long engines run while stationary. Excessive idling costs fuel and engine hours — now visible and manageable.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Bell,          label: "Instant SMS Alerts",     desc: "Critical events — speeding, geofence breach, vehicle breakdown — trigger SMS to designated managers within seconds.", color: "text-cyan-500", bg: "bg-cyan-50" },
];

const howItWorks = [
  { step: "01", title: "GPS unit installed", desc: "Compact GPS tracker installed discreetly in each vehicle — wired to power" },
  { step: "02", title: "Data transmitted",   desc: "Location, speed, and engine data sent to cloud server every 30 seconds via SIM card" },
  { step: "03", title: "Map updates live",   desc: "Fleet dashboard shows all vehicles in real time on an interactive map" },
  { step: "04", title: "Events detected",    desc: "Speeding, geofence breach, and harsh driving trigger instant alerts" },
  { step: "05", title: "Reports generated",  desc: "Manager reviews daily fleet reports, fuel usage, and driver scores" },
];

const techStack = [
  { icon: Cpu,      label: "Hardware",   items: ["4G LTE GPS tracker unit", "Tamper-proof OBD / hardwired install", "Fuel sensor integration (optional)", "Engine diagnostics port reading", "Backup battery for power-cut detection"] },
  { icon: Server,   label: "Backend",    items: ["Real-time GPS data ingestion", "Geofence engine with polygon zones", "Driver behaviour scoring algorithm", "SMS gateway for instant alerts", "Historical data storage (12 months)"] },
  { icon: Database, label: "Dashboard",  items: ["Live fleet map (all vehicles)", "Route history & playback tool", "Fleet performance analytics", "Fuel consumption reports", "Driver leaderboard & event logs"] },
];

const deployedFor = [
  { title: "Logistics & Delivery Companies", desc: "Track every lorry and van in your fleet in real time. Know if drivers are taking unauthorised detours or stopping unnecessarily. Reduce overtime claims with accurate trip records." },
  { title: "Construction & Heavy Equipment", desc: "Monitor machinery on site and in transit. Geofence your construction sites — get alerted if equipment leaves the boundary after hours." },
  { title: "School Bus & Transport Services", desc: "Parents and schools know exactly where buses are. Route deviation alerts protect students. Driver behaviour scoring ensures safety standards are met." },
  { title: "Sales & Field Service Teams",    desc: "Verify that sales reps visited their assigned accounts. Track mileage accurately for claims. Eliminate disputes with route history as evidence." },
];

export default function FleetTrackingPage() {
  return (
    <div className="pt-24 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Products", url: "https://rectronx.com/products" },
        { name: "Fleet & Vehicle Tracking", url: "https://rectronx.com/products/fleet-tracking" },
      ])} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row mb-16 shadow-lg">
          <div className="w-full md:w-2/5 bg-gradient-to-br from-emerald-700 to-emerald-900 flex flex-col items-center justify-center py-14 px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Deployed
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <MapPin size={36} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">Fleet &</div>
              <div className="text-2xl font-bold text-emerald-300 tracking-tight">Vehicle Tracking</div>
              <div className="mt-2 text-emerald-300 text-sm font-medium">by Rectronx Circuits</div>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Deployed in Malaysia
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-xl font-bold text-white">30s</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Update interval</div>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-xl font-bold text-white">Live</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Map dashboard</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-brand-navy leading-snug">
              GPS fleet tracking with live dashboard & driver behaviour monitoring
            </h1>
            <p className="mt-3 text-slate-500 leading-relaxed">
              A commercial GPS fleet management system deployed for businesses across Malaysia. Real-time vehicle location on a live map, full route history and playback, driver behaviour scoring, fuel consumption analytics, and instant SMS alerts for speeding and geofence breaches.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Live GPS map — all vehicles updating every 30 seconds",
                "Full route history playback for any vehicle, any date",
                "Instant SMS alerts for speeding and geofence breaches",
                "Driver behaviour scoring — braking, cornering, speeding",
                "Fuel consumption analytics per vehicle and per route",
                "Idle time monitoring to reduce wasted fuel and engine hours",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-emerald-600" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton
                label="Inquire About Fleet Tracking"
                message="Hi Rectronx! I'm interested in the Fleet & Vehicle Tracking system. Can you share more details and pricing?"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Features</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Full visibility of your fleet</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Know where every vehicle is, what every driver is doing, and how much every trip costs — in real time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="rounded-xl border border-slate-100 p-6 hover:border-emerald-200 hover:shadow-sm transition-all">
                  <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={f.color} />
                  </div>
                  <h3 className="font-bold text-brand-navy mb-1 text-sm">{f.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
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
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3 shrink-0">
                  {step.step}
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px border-t-2 border-dashed border-emerald-200" />
                )}
                <h3 className="font-bold text-brand-navy text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deployed for */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Industries</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Built for fleet-dependent businesses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deployedFor.map((u) => (
              <div key={u.title} className="rounded-xl border border-slate-100 p-6 hover:border-emerald-200 transition-colors">
                <h3 className="font-bold text-brand-navy mb-2">{u.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Technology</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">4G GPS hardware. Cloud-powered platform.</h2>
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
                        <Check size={13} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
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
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
            <MapPin size={24} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Take control of your fleet today</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We supply the GPS units, handle installation, and configure the dashboard for your fleet. Usually operational within a week.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WhatsAppButton
              label="Get a Fleet Quote"
              message="Hi Rectronx! I'm interested in fleet tracking for my vehicles. Can we discuss pricing and setup?"
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
