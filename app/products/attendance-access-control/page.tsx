import { Metadata } from "next";
import Link from "next/link";
import {
  ScanLine, Fingerprint, Shield, BarChart2, Bell, Users,
  ArrowLeft, ArrowUpRight, Check, Clock, Cpu, Server, Database,
  FileText, Lock,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Attendance & Access Control System Malaysia | Fingerprint + RFID — Rectronx",
  description:
    "Enterprise attendance and access control system deployed for schools, factories, and offices across Malaysia. Biometric fingerprint + RFID dual-authentication with real-time database sync and auto-generated reports.",
  keywords: ["attendance system malaysia", "access control system malaysia", "fingerprint attendance system", "rfid attendance malaysia", "biometric attendance malaysia", "school attendance system"],
  alternates: { canonical: "/products/attendance-access-control", languages: { "en-MY": "https://rectronx.com/products/attendance-access-control" } },
  openGraph: {
    title: "Attendance & Access Control System Malaysia — Rectronx Circuits",
    description: "Fingerprint + RFID dual-authentication. Real-time database sync, auto-generated attendance reports, multi-door support.",
    url: "https://rectronx.com/products/attendance-access-control",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Attendance & Access Control System by Rectronx" }],
  },
};

const features = [
  { icon: Fingerprint, label: "Fingerprint Authentication", desc: "Biometric fingerprint scanner ensures only authorised individuals can clock in — impossible to buddy-punch.", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: ScanLine,    label: "RFID Card Access",           desc: "Dual-mode: staff can use RFID card as an alternative or backup to fingerprint. Both methods log to the same database.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Database,    label: "Real-Time Database Sync",    desc: "Every clock-in and access event syncs to the cloud instantly — view live attendance from anywhere.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: FileText,    label: "Auto-Generated Reports",     desc: "Daily, weekly, and monthly attendance reports generated automatically and exportable to Excel or PDF.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Lock,        label: "Multi-Door Access Control",  desc: "Different staff get different access permissions. A warehouse worker accesses the floor — not the server room.", color: "text-red-400", bg: "bg-red-50" },
  { icon: Bell,        label: "Unauthorised Access Alerts", desc: "Instant SMS alert to admin when someone attempts to access a restricted area they don't have clearance for.", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Clock,       label: "Late & Overtime Tracking",   desc: "System flags late arrivals, early departures, and overtime automatically. No manual checking of time cards.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Users,       label: "Multi-Location Support",     desc: "Deploy across multiple branches or departments — all data consolidates into one central admin dashboard.", color: "text-cyan-500", bg: "bg-cyan-50" },
];

const howItWorks = [
  { step: "01", title: "Staff registers",     desc: "Fingerprint and RFID card enrolled in the system during onboarding" },
  { step: "02", title: "Daily clock-in",      desc: "Staff scans finger or taps card at the terminal to record attendance" },
  { step: "03", title: "Access granted",      desc: "Door unlocks only if the person is authorised for that specific entry point" },
  { step: "04", title: "Data syncs live",     desc: "Every event logs to the cloud database in real time — visible instantly" },
  { step: "05", title: "Reports generated",   desc: "Admin downloads attendance summary, late reports, or exports to payroll" },
];

const techStack = [
  { icon: Cpu,      label: "Hardware",   items: ["Fingerprint biometric module", "RFID card reader (125kHz / 13.56MHz)", "Electric door lock / magnetic lock", "Access control panel unit", "Wiegand protocol wiring"] },
  { icon: Server,   label: "Backend",    items: ["Real-time attendance engine", "Role-based access permission matrix", "SMS gateway for instant alerts", "Cloud database with redundancy", "REST API for payroll integration"] },
  { icon: Database, label: "Dashboard",  items: ["Live staff attendance map", "Auto attendance & leave reports", "Access event audit logs", "Excel / PDF export", "Multi-admin with role controls"] },
];

const deployedFor = [
  { title: "Schools & Universities",  desc: "Track student and staff attendance accurately. Restrict access to labs, server rooms, or staff areas. Reports for admin and payroll." },
  { title: "Factories & Warehouses",  desc: "Zone-based access control keeps workers in authorised areas. Accurate shift attendance feeds directly into payroll calculations." },
  { title: "Offices & Corporates",    desc: "Replace punch cards entirely. Different access levels per department. Visitor management at reception. Full audit trail." },
  { title: "Clinics & Medical Centres", desc: "Staff access restricted areas like dispensaries and records rooms. Attendance auto-synced to HR system. No manual reconciliation." },
];

export default function AttendanceAccessControlPage() {
  return (
    <div className="pt-24 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Products", url: "https://rectronx.com/products" },
        { name: "Attendance & Access Control", url: "https://rectronx.com/products/attendance-access-control" },
      ])} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row mb-16 shadow-lg">
          <div className="w-full md:w-2/5 bg-gradient-to-br from-violet-700 to-violet-900 flex flex-col items-center justify-center py-14 px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-violet-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Deployed
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <ScanLine size={36} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">Attendance &</div>
              <div className="text-2xl font-bold text-violet-300 tracking-tight">Access Control</div>
              <div className="mt-2 text-violet-300 text-sm font-medium">by Rectronx Circuits</div>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Deployed in Malaysia
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-xl font-bold text-white">Dual</div>
                  <div className="text-xs text-violet-200 mt-0.5">Auth modes</div>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-xl font-bold text-white">Auto</div>
                  <div className="text-xs text-violet-200 mt-0.5">Reports</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-brand-navy leading-snug">
              Enterprise attendance & access control — fingerprint + RFID
            </h1>
            <p className="mt-3 text-slate-500 leading-relaxed">
              A complete attendance and access control solution deployed for schools, factories, and offices across Malaysia. Biometric fingerprint and RFID card dual-authentication with real-time cloud sync, automatic report generation, and instant SMS alerts for unauthorised access attempts.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Fingerprint + RFID dual authentication — no buddy-punching possible",
                "Real-time attendance sync to cloud dashboard from any device",
                "Auto-generated daily, weekly, and monthly reports",
                "Multi-door access with different permissions per staff role",
                "Instant SMS alert on unauthorised access attempt",
                "Overtime, late arrival, and early departure tracking",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-violet-600" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <WhatsAppButton
                label="Inquire About This System"
                message="Hi Rectronx! I'm interested in the Attendance & Access Control System. Can you share more details?"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Features</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Built for real workplaces</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Every feature designed around how Malaysian businesses actually operate — not textbook theory.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="rounded-xl border border-slate-100 p-6 hover:border-violet-200 hover:shadow-sm transition-all">
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
                <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm mb-3 shrink-0">
                  {step.step}
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px border-t-2 border-dashed border-violet-200" />
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
            <span className="section-label">Deployments</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Suits any organisation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deployedFor.map((u) => (
              <div key={u.title} className="rounded-xl border border-slate-100 p-6 hover:border-violet-200 transition-colors">
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
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Proven hardware. Reliable software.</h2>
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
                        <Check size={13} className="text-violet-500 shrink-0" strokeWidth={2.5} />
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
          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center mx-auto mb-5">
            <ScanLine size={24} className="text-violet-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Replace punch cards for good</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We install the hardware, configure the software, and train your admin team. Full system operational within days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WhatsAppButton
              label="Get a System Quote"
              message="Hi Rectronx! I'm interested in the Attendance & Access Control System. How do we get started?"
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
