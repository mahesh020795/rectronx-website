import { Metadata } from "next";
import { Cpu, Code2, Zap, Users, Trophy, Smile, Clock, Package, CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Rectronx Circuits | Penang Engineering & Technology Company Since 2016",
  description:
    "Learn about Rectronx Circuits — founded in Penang 2016, delivering 400+ Final Year Projects and commercial software products across Malaysia. IoT, Arduino, ESP32 specialists.",
  keywords: ["about rectronx", "rectronx circuits penang", "FYP company malaysia", "engineering company penang", "IoT company malaysia"],
  alternates: { canonical: "/about", languages: { "en-MY": "https://rectronx.com/about" } },
  openGraph: {
    title: "About Rectronx Circuits — Penang Engineering & Technology Company Since 2016",
    description:
      "Founded in 2016, delivering 400+ Final Year Projects and commercial software products across Malaysia.",
    url: "https://rectronx.com/about",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Rectronx Circuits — Penang Engineering & Technology Company" }],
  },
};

const values = [
  {
    icon: Cpu,
    title: "Quality Engineering",
    description: "Every project we deliver is built properly — not just enough to pass, but built to work reliably.",
  },
  {
    icon: Code2,
    title: "Real Products",
    description: "We don't just do client work. We build our own products, which means we understand what it takes to ship.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We respect your deadlines. FYP submissions wait for no one, and neither do we.",
  },
  {
    icon: Users,
    title: "Student-First",
    description: "We started by helping students. That's still at the core of everything we do.",
  },
];

const stats = [
  { value: "400+", label: "Projects Delivered", icon: Trophy },
  { value: "500+", label: "Project Titles Available", icon: Smile },
  { value: "8", label: "Years Active", icon: Clock },
  { value: "12", label: "Commercial Products Built", icon: Package },
];

export default function AboutPage() {
  return (
    <div className="pt-16 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "About", url: "https://rectronx.com/about" },
      ])} />
      {/* Hero banner */}
      <div className="relative w-full h-56 sm:h-72 lg:h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
          alt="Team working"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/60 to-brand-navy/80" />
        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-brand-blue text-xs font-semibold tracking-widest uppercase mb-3 bg-brand-blue/10 border border-brand-blue/30 px-3 py-1 rounded-full">
            About Rectronx
          </span>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Rectronx Circuits, Penang
          </h1>
          <p className="text-slate-300 mt-3 text-base max-w-xl">
            From FYP projects to commercial systems — Malaysia&apos;s Engineering &amp; Technology Company.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Story section with left border accent */}
        <div className="mb-16">
          <div className="border-l-4 border-brand-blue pl-6 mb-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-1">Our Story</h2>
            <p className="text-brand-blue text-sm font-medium">How it all started</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 space-y-4">
            <p className="text-slate-600 leading-relaxed">
              Rectronx Circuits was founded to solve a problem every engineering
              student faces: you have a great idea for your Final Year Project, but
              turning that idea into working hardware and software — while juggling
              coursework and exams — is overwhelming.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We stepped in to bridge that gap. Starting with IoT and Arduino
              projects, we&apos;ve grown into a full-service technology company handling
              everything from embedded systems to web applications. Along the way,
              we built Spark — our own AI-powered WhatsApp product for businesses.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, Rectronx stands as both a trusted FYP partner for hundreds of
              students across Malaysia and a growing engineering &amp; technology company shipping
              products used by real businesses.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="section-label">Our Journey</span>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy">Milestones</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
            <div className="space-y-10">
              {[
                { year: "2016", title: "Founded", desc: "Rectronx Circuits established in Penang, Malaysia." },
                { year: "2017", title: "First Projects", desc: "Delivered our first 10 FYP projects to engineering students." },
                { year: "2019", title: "Smart Parking", desc: "Launched our first commercial product — a Smart Parking System." },
                { year: "2020", title: "200+ Projects", desc: "Crossed the 200 projects delivered milestone across Malaysia." },
                { year: "2021", title: "Attendance & Access Control", desc: "Launched enterprise Attendance & Access Control system." },
                { year: "2023", title: "Fleet Tracking", desc: "Released Fleet Tracking system for commercial vehicle management." },
                { year: "2024", title: "Spark Launched", desc: "Built and launched Spark — our AI-powered WhatsApp platform for businesses." },
                { year: "2025", title: "400+ Projects", desc: "Reached 400+ projects delivered and 12 commercial products built." },
                { year: "2026", title: "Spark Full Features", desc: "Flagship Spark release with full feature suite — our most powerful product yet." },
              ].map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={m.year} className="relative flex items-center">
                    {/* Left slot */}
                    <div className="hidden sm:flex w-1/2 justify-end pr-10">
                      {isLeft && (
                        <div className="max-w-xs text-right">
                          <p className="text-2xl font-bold text-brand-blue">{m.year}</p>
                          <p className="font-semibold text-slate-800 mt-0.5">{m.title}</p>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                        </div>
                      )}
                    </div>
                    {/* Dot — center */}
                    <div className="relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 mr-6 sm:mr-0">
                      <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center shadow-md ring-4 ring-white">
                        <CheckCircle2 size={16} className="text-white" />
                      </div>
                    </div>
                    {/* Right slot */}
                    <div className="flex-1 sm:w-1/2 sm:flex-none sm:pl-10">
                      {/* Mobile: always show */}
                      <div className="sm:hidden">
                        <p className="text-xl font-bold text-brand-blue">{m.year}</p>
                        <p className="font-semibold text-brand-navy mt-0.5">{m.title}</p>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                      {/* Desktop: only show if right-side entry */}
                      {!isLeft && (
                        <div className="hidden sm:block max-w-xs">
                          <p className="text-2xl font-bold text-brand-blue">{m.year}</p>
                          <p className="font-semibold text-slate-800 mt-0.5">{m.title}</p>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values cards */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="section-label">What We Stand For</span>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-interactive p-7 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-colors duration-200">
                  <v.icon size={20} className="text-brand-blue group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-semibold text-brand-navy mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mb-16 bg-gradient-to-br from-brand-navy to-[#1A2E4A] rounded-2xl p-10 text-white">
          <div className="text-center mb-8">
            <p className="text-brand-blue text-xs font-semibold tracking-widest uppercase">By the Numbers</p>
            <h2 className="text-2xl font-bold text-white mt-2">Our Impact So Far</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="group">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-200">
                    <s.icon size={18} className="text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* End CTA with pattern */}
        <div className="relative text-center rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-8 sm:p-12">
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(#2B7FD4 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            <span className="section-label mb-3 block">Let&apos;s Build Together</span>
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Want to Work Together?
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Whether it&apos;s a FYP or a software project, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppButton
                label="Start a Conversation"
                message="Hi Rectronx! I'd like to work together."
              />
              <Link href="/contact" className="btn-secondary">
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
