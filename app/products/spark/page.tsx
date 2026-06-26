import { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare, Bot, Users, BarChart2, Bell, Zap,
  ArrowLeft, ArrowUpRight, Check, Globe, Shield,
  Smartphone, Server, Database, Cpu,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "Spark AI WhatsApp Assistant Malaysia | Rectronx",
  },
  description:
    "Spark is an AI WhatsApp assistant for Malaysian SMEs. Auto-reply 24/7, capture leads, monitor conversations and set up fast.",
  keywords: ["whatsapp ai bot malaysia", "spark ai whatsapp assistant", "whatsapp chatbot malaysia", "ai customer service malaysia", "whatsapp business automation malaysia"],
  alternates: { canonical: "/products/spark", languages: { "en-MY": "https://rectronx.com/products/spark" } },
  openGraph: {
    title: "Spark — AI WhatsApp Assistant for Malaysian Businesses | Rectronx",
    description: "Auto-reply customers 24/7, capture leads, and monitor all conversations from a dashboard. Built for Malaysian SMEs.",
    url: "https://rectronx.com/products/spark",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Spark AI WhatsApp Assistant by Rectronx" }],
  },
};

const features = [
  { icon: Bot,          label: "AI Auto-Reply",          desc: "Responds to customer messages instantly using AI trained on your business info — FAQs, pricing, hours, and more.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Users,        label: "Lead Capture",           desc: "Identifies new inquiries, collects contact details, and logs every lead automatically to your dashboard.", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: Bell,         label: "Smart Notifications",    desc: "Alerts you on your phone when a customer needs a human — Spark handles the rest autonomously.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: BarChart2,    label: "Conversation Dashboard", desc: "Full view of every customer conversation, response stats, and lead pipeline in one clean web dashboard.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Zap,          label: "Instant Setup",          desc: "Connect your WhatsApp Business number, upload your business info, and Spark is live — usually within a day.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Globe,        label: "Multi-Language",         desc: "Handles conversations in English and Bahasa Malaysia naturally, without needing separate configurations.", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Shield,       label: "Private & Secure",       desc: "All conversations are encrypted. Your customer data stays under your account — never shared or sold.", color: "text-red-400", bg: "bg-red-50" },
  { icon: MessageSquare,label: "Human Handoff",          desc: "When a conversation needs a human touch, Spark flags it and steps aside — seamless, no customer confusion.", color: "text-cyan-500", bg: "bg-cyan-50" },
];

const howItWorks = [
  { step: "01", title: "Connect number",       desc: "Link your WhatsApp Business number to Spark via our onboarding flow" },
  { step: "02", title: "Upload business info", desc: "Add your FAQs, pricing, services, and working hours" },
  { step: "03", title: "AI learns",            desc: "Spark trains on your content and is ready to handle conversations" },
  { step: "04", title: "Customer messages",    desc: "A customer WhatsApps you — Spark replies instantly, 24/7" },
  { step: "05", title: "You stay in control",  desc: "Monitor from the dashboard, jump in anytime, or let Spark handle it all" },
];

const techStack = [
  { icon: Cpu,      label: "AI Layer",   items: ["Large language model (LLM) backbone", "Custom fine-tuning per business", "Context-aware conversation memory", "Sentiment & intent detection"] },
  { icon: Server,   label: "Backend",    items: ["Node.js API server", "WhatsApp Business Cloud API", "Webhook-based message routing", "Rate limiting & queue management"] },
  { icon: Database, label: "Dashboard",  items: ["Real-time conversation feed", "Lead pipeline & analytics", "Next.js web dashboard", "Firebase / Supabase data layer"] },
];

const useCases = [
  { title: "Retail & E-commerce",    desc: "Answer product questions, share pricing, confirm orders, and follow up on abandoned carts — without lifting a finger." },
  { title: "F&B & Restaurants",      desc: "Handle reservation inquiries, share menus, confirm table bookings, and collect feedback automatically." },
  { title: "Service Businesses",     desc: "Qualify leads, book appointments, send reminders, and collect customer info before you even see the message." },
  { title: "Education Centres",      desc: "Answer course inquiries, share schedules, and route serious leads to an admissions team automatically." },
];

export default function SparkPage() {
  return (
    <div className="pt-24 bg-white text-slate-900">
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Products", url: "https://rectronx.com/products" },
        { name: "Spark — AI WhatsApp Assistant", url: "https://rectronx.com/products/spark" },
      ])} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row mb-16 shadow-lg">
          <div className="w-full md:w-2/5 bg-brand-navy flex flex-col items-center justify-center py-14 px-8 relative overflow-hidden"
            style={{ backgroundImage: "radial-gradient(circle, rgba(43,127,212,0.18) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(43,127,212,0.25),transparent)]" />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ★ Flagship Product
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <MessageSquare size={36} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-white tracking-tight">Spark</div>
              <div className="mt-1 text-blue-300 text-sm font-medium">by Rectronx Circuits</div>
              <div className="mt-5 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-blue-200 mt-0.5">Always on</div>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold text-white">&lt;2s</div>
                  <div className="text-xs text-blue-200 mt-0.5">Reply time</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 bg-white p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-brand-navy leading-snug">
              AI-powered WhatsApp assistant for your business
            </h1>
            <p className="mt-3 text-slate-500 leading-relaxed">
              Spark connects to your WhatsApp Business number and handles customer conversations automatically using AI. Answer FAQs, capture leads, send updates, and never miss an inquiry — even at 3am. Built specifically for Malaysian SMEs who can&apos;t afford to miss a single customer message.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Replies to customers in under 2 seconds, 24 hours a day",
                "Trained on your specific business — pricing, services, FAQs",
                "Captures and qualifies leads before you see them",
                "Full conversation dashboard — nothing slips through",
                "Human handoff when it matters — Spark steps aside cleanly",
                "Handles English and Bahasa Malaysia naturally",
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
                label="Get Spark for My Business"
                message="Hi Rectronx! I'm interested in Spark for my business. Can you tell me more about pricing and setup?"
                trackingSource="spark_hero"
              />
              <a href="https://dashboard.rectronx.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Open Dashboard <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Features</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Everything your business needs</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Spark handles the repetitive customer communication so you can focus on the work that actually needs you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="rounded-xl border border-slate-100 p-6 hover:border-blue-200 hover:shadow-sm transition-all">
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
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">How Spark works</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-4">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="flex-1 flex flex-col items-center text-center relative">
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm mb-3 shrink-0">
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

        {/* App Preview Showcase */}
        <div className="mb-16 rounded-2xl overflow-hidden bg-[#0a1628] relative">
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          {/* glow blobs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center gap-0">

            {/* Left: text content */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-5">
                <Smartphone size={11} /> Web Dashboard
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Every conversation,<br />
                <span className="text-blue-400">one clean dashboard</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
                See your AI performance at a glance — conversation volume, resolution rate, customer satisfaction, and every chat in one place. Built for owners who want visibility without micromanaging.
              </p>

              {/* Live stats row matching the screenshot */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { value: "247", label: "Conversations", delta: "+12%" },
                  { value: "18",  label: "Active Today", delta: "Live" },
                  { value: "34",  label: "Resolved Today", delta: "+8%" },
                  { value: "94.2%", label: "Satisfaction", delta: "+4.2%" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">{s.value}</span>
                      <span className="text-[10px] text-green-400 font-semibold">{s.delta}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Annotated feature list */}
              <div className="space-y-4">
                {[
                  { label: "AI Insights, automatically", sub: "Spark surfaces patterns — peak hours, satisfaction shifts, wait times — no digging required", color: "bg-blue-500" },
                  { label: "Weekly conversation trends", sub: "Visual chart of volume across the week so you spot busy periods instantly", color: "bg-cyan-400" },
                  { label: "Live conversation feed", sub: "See every WhatsApp and Live Chat conversation with unread counts in real time", color: "bg-violet-400" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
                    <div>
                      <div className="text-white text-sm font-semibold">{item.label}</div>
                      <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton
                  label="See Spark in Action"
                  message="Hi Rectronx! Can I get a demo of the Spark dashboard for my business?"
                  trackingSource="spark_demo_cta"
                />
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="w-full lg:w-1/2 flex items-end justify-center px-8 pb-0 pt-10 lg:pt-10">
              <div className="relative max-w-[260px] w-full">
                {/* glow under phone */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-blue-500/30 blur-xl rounded-full" />
                {/* phone shell */}
                <div className="relative rounded-[2.8rem] overflow-hidden border-[6px] border-[#16243a] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(96,165,250,0.12)]">
                  {/* status bar overlay */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#0a1628]/80 z-10 flex items-center justify-between px-5">
                    <span className="text-white text-[10px] font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="text-white text-[10px]">▌▌▌▌</span>
                    </div>
                  </div>
                  {/* screenshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/spark-app-screen.jpeg"
                    alt="Spark AI WhatsApp Assistant Dashboard — live conversation stats, AI insights, and weekly trends"
                    className="w-full block"
                    loading="lazy"
                  />
                </div>
                {/* notch */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-20 h-5 bg-[#16243a] rounded-b-xl z-20" />
              </div>
            </div>

          </div>
        </div>

        {/* Desktop Dashboard Showcase */}
        <div className="mb-16 rounded-2xl overflow-hidden bg-[#0a1628] relative">
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          {/* glow blobs */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-green-400/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-8 md:p-12 lg:p-16">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-5">
                  <BarChart2 size={11} /> Desktop Dashboard
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mt-3">
                  Full business control,<br />
                  <span className="text-blue-400">from your computer</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mt-3 max-w-lg">
                  The Spark desktop dashboard gives you a complete operational view — revenue, pipeline, live conversations, AI insights, and channel breakdown — all in one screen.
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-3 shrink-0">
                {[
                  { value: "RM 12,450", label: "Revenue", delta: "+14.2%" },
                  { value: "24.6%",     label: "Conversion", delta: "+5.1%" },
                  { value: "5",         label: "Active Jobs", delta: "+25%" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center min-w-[90px]">
                    <div className="text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[10px] text-green-400 font-semibold">{s.delta}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser mockup */}
            <div className="relative">
              {/* glow under screen */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-blue-500/20 blur-2xl rounded-full" />

              {/* browser chrome */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(96,165,250,0.1)]">
                {/* browser toolbar */}
                <div className="bg-[#0f1e35] border-b border-white/10 px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-1 text-xs text-slate-500 flex items-center gap-2">
                    <Shield size={10} className="text-green-400 shrink-0" />
                    dashboard.rectronx.com
                  </div>
                  <div className="flex gap-2 opacity-40">
                    <div className="w-4 h-4 rounded bg-white/10" />
                    <div className="w-4 h-4 rounded bg-white/10" />
                  </div>
                </div>
                {/* screenshot */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/spark-dashboard-desktop.jpeg"
                  alt="Spark AI Platform Desktop Dashboard — revenue, pipeline, conversations, AI insights, and channel breakdown"
                  className="w-full block"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Annotated callouts below the screen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
              {[
                { color: "bg-blue-500",  label: "Needs Attention panel",    sub: "3 leads waiting, 2 quotations pending, 1 approval — your to-do list, automated" },
                { color: "bg-green-400", label: "Revenue & pipeline KPIs",  sub: "RM 12,450 revenue, 8 in pipeline, 5 active jobs — all with month-on-month deltas" },
                { color: "bg-violet-400",label: "AI Engine Insights",       sub: "Satisfaction up 4.2%, 2 customers waiting >2h, peak time 10AM–2PM — surfaced automatically" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
                  <div>
                    <div className="text-white text-sm font-semibold">{item.label}</div>
                    <div className="text-slate-500 text-xs mt-1 leading-relaxed">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Use cases */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-label">Who It&apos;s For</span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Works for any Malaysian SME</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {useCases.map((u) => (
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
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">Built on reliable infrastructure</h2>
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
                        <Check size={13} className="text-brand-blue shrink-0" strokeWidth={2.5} />
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
            <MessageSquare size={24} className="text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stop missing customer messages</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Spark is ready to deploy for your business. WhatsApp us and we&apos;ll have it running within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WhatsAppButton
              label="Get Spark Now"
              message="Hi Rectronx! I want to get Spark for my business. What's the next step?"
              trackingSource="spark_bottom_cta"
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
