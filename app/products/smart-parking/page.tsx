import { Metadata } from "next";
import Link from "next/link";
import {
  Car, Wifi, CreditCard, BarChart2, Bell, Shield,
  ArrowLeft, ArrowUpRight, Check, Smartphone, Server, Database, Cpu,
  MapPin, Clock,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "Smart Parking System Malaysia | Rectronx",
  },
  description:
    "Smart parking system for Malaysia with RFID access, live bay sensors, automated payment, owner dashboard and site installation support.",
  keywords: ["smart parking system malaysia", "parking management system", "rfid parking malaysia", "automated parking malaysia", "car park management system"],
  alternates: { canonical: "/products/smart-parking", languages: { "en-MY": "https://rectronx.com/products/smart-parking" } },
  openGraph: {
    title: "Smart Parking Management System — Rectronx Circuits Malaysia",
    description: "Real-time slot monitoring, RFID vehicle identification, automated payment and owner dashboard. Deployed in commercial buildings across Malaysia.",
    url: "https://rectronx.com/products/smart-parking",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Smart Parking Management System by Rectronx" }],
  },
};

const features = [
  { icon: MapPin,      label: "Real-Time Slot Display",   desc: "LED indicators and web dashboard show live availability for every parking bay — drivers find spots instantly.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Car,         label: "RFID Vehicle ID",          desc: "RFID tags identify registered vehicles at entry and exit — no tickets, no barriers blocking, seamless flow.", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: CreditCard,  label: "Automated Payment",        desc: "Payment is calculated by duration and processed automatically. Reduces queues and eliminates cashier costs.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: BarChart2,   label: "Owner Dashboard",          desc: "Real-time and historical occupancy data, revenue reports, peak hour analytics — all in one web dashboard.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Bell,        label: "Full Capacity Alerts",     desc: "SMS and app alerts notify operators when the car park reaches capacity so they can redirect traffic quickly.", color: "text-red-400", bg: "bg-red-50" },
  { icon: Shield,      label: "Secure Access Control",    desc: "Entry and exit gates only open for authorised RFID tags — prevents unauthorised entry and tailgating.", color: "text-teal-500", bg: "bg-teal-50" },
];

const howItWorks = [
  { step: "01", title: "Vehicle arrives",    desc: "RFID reader at entry identifies the vehicle tag and logs entry time" },
  { step: "02", title: "Gate opens",         desc: "Barrier lifts automatically for registered vehicles — no manual ticketing" },
  { step: "03", title: "Slot tracked",       desc: "Sensor in each bay updates the dashboard and LED display in real time" },
  { step: "04", title: "Vehicle exits",      desc: "Exit reader logs departure, calculates duration, processes payment" },
  { step: "05", title: "Data recorded",      desc: "All transactions, occupancy, and revenue logged to the owner dashboard" },
];

const techStack = [
  { icon: Cpu,      label: "Hardware",   items: ["RFID readers (entry & exit)", "Ultrasonic bay sensors", "LED slot indicators", "Automated barrier gate", "On-site controller unit"] },
  { icon: Server,   label: "Backend",    items: ["Node.js API server", "Real-time vehicle tracking", "Payment processing integration", "SMS gateway for alerts", "Secure access logs"] },
  { icon: Database, label: "Dashboard",  items: ["Live occupancy map", "Revenue & transaction reports", "Peak hour analytics", "Multi-location support", "Role-based admin access"] },
];

const deployedFor = [
  { title: "Commercial Office Buildings",  desc: "Tenants use RFID tags for seamless daily access. Visitors pay automatically. Building management tracks usage without manual counting." },
  { title: "Shopping Complexes",           desc: "High-volume entry/exit handled without queues. Payment integrated at exit barriers. Management gets real-time revenue data." },
  { title: "Hotels & Serviced Apartments", desc: "Guest vehicles registered at check-in. Seamless access for the duration of stay. Overstay billing automated." },
  { title: "Corporate Campuses",           desc: "Employees, visitors, and delivery vehicles each get different access levels. Logs every entry for security compliance." },
];

export default function SmartParkingPage() {
  return (
    <div className="pt-24 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Products", url: "https://rectronx.com/products" },
        { name: "Smart Parking System", url: "https://rectronx.com/products/smart-parking" },
      ])} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row mb-16 shadow-lg">
          <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col items-center justify-center py-14 px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Deployed
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Car size={36} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-white tracking-tight">Smart</div>
              <div className="text-2xl font-bold text-blue-300 tracking-tight">Parking</div>
              <div className="mt-2 text-blue-300 text-sm font-medium">by Rectronx Circuits</div>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Deployed in Malaysia
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold text-white">Real</div>
                  <div className="text-xs text-blue-200 mt-0.5">-time slots</div>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold text-white">Zero</div>
                  <div className="text-xs text-blue-200 mt-0.5">Manual cashier</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-brand-navy leading-snug">
              Full-stack smart parking management system
            </h1>
            <p className="mt-3 text-slate-500 leading-relaxed">
              A complete IoT-powered parking solution deployed in commercial buildings across Malaysia. Real-time slot monitoring, RFID vehicle identification, automated payment processing, and a live owner dashboard — replacing manual ticketing entirely.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Real-time parking slot availability on LED displays and web dashboard",
                "RFID-based vehicle identification — no physical tickets needed",
                "Automated payment calculated by duration at exit",
                "SMS and app alerts when car park is at full capacity",
                "Owner analytics: revenue, occupancy, peak hours",
                "Scalable — single car park or multi-location deployment",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-blue-600" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton
                label="Inquire About This System"
                message="Hi Rectronx! I'm interested in the Smart Parking Management System. Can you share more details and pricing?"
                trackingSource="smart_parking_hero"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Features</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Everything in one system</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Hardware, software, and analytics — fully integrated so you never have to manage multiple vendors.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="rounded-xl border border-slate-100 p-6 hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={f.color} />
                  </div>
                  <h3 className="font-bold text-brand-navy mb-1">{f.label}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
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
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-3 shrink-0">
                  {step.step}
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px border-t-2 border-dashed border-blue-200" />
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
            <span className="section-label">Use Cases</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Deployed across property types</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deployedFor.map((u) => (
              <div key={u.title} className="rounded-xl border border-slate-100 p-6 hover:border-blue-200 transition-colors">
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
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Built with proven hardware & software</h2>
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
                        <Check size={13} className="text-blue-500 shrink-0" strokeWidth={2.5} />
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
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-5">
            <Car size={24} className="text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to modernise your car park?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We handle everything — hardware installation, software setup, and ongoing support. WhatsApp us to discuss your property.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WhatsAppButton
              label="Get a Site Assessment"
              message="Hi Rectronx! I'm interested in the Smart Parking System for my property. Can we arrange a site assessment?"
              trackingSource="smart_parking_bottom_cta"
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
