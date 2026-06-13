"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import WhatsAppButton from "@/components/WhatsAppButton";
import Logo from "@/components/Logo";
import { CheckCircle2, Loader2, ArrowRight, Clock, MessageCircle } from "lucide-react";

// Confetti piece component
function ConfettiPiece({ style }: { style: React.CSSProperties }) {
  return <div className="confetti-piece" style={style} />;
}

const CONFETTI_COLORS = ["#2B7FD4", "#0F1C2E", "#22c55e", "#f59e0b", "#ec4899"];

function generateConfetti(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: `${Math.random() * 0.6}s`,
    duration: `${0.9 + Math.random() * 0.6}s`,
  }));
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [confetti, setConfetti] = useState<ReturnType<typeof generateConfetti>>([]);

  useEffect(() => {
    if (status === "success") {
      setConfetti(generateConfetti(18));
      const t = setTimeout(() => setConfetti([]), 1500);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await getSupabase().from("contact_submissions").insert([form]);
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <span className="section-label">Get in Touch</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Let&apos;s Talk
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Have a project in mind? Send us a message and we&apos;ll get back to
            you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left side */}
          <div className="w-full lg:w-auto lg:shrink-0 lg:max-w-xs space-y-6 sm:space-y-8">
            {/* Logo + reply badge */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Logo className="h-10 w-auto" />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Typically reply within 2 hours
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <Clock size={11} />
                  Office hours: Mon–Fri, 9am–10pm MYT
                </p>
              </div>
            </div>

            {/* WhatsApp section */}
            <div className="bg-[#f0faf4] border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle size={15} className="text-white" />
                </div>
                <h2 className="text-sm font-semibold text-slate-800">
                  Fastest Way to Reach Us
                </h2>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                For the quickest response, message us directly on WhatsApp.
                We typically reply within a few hours.
              </p>
              <WhatsAppButton
                label="Open WhatsApp Chat"
                message="Hi Rectronx! I'd like to get in touch."
                className="w-full justify-center"
              />
            </div>

            {/* Contact info */}
            <div className="border border-slate-100 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-brand-navy mb-4">
                Contact Info
              </h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</dt>
                  <dd>
                    <a href="mailto:rectronx@gmail.com" className="text-slate-700 hover:text-brand-blue transition-colors font-medium">
                      rectronx@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">WhatsApp</dt>
                  <dd className="text-slate-700 font-medium">+60 11-7279 2500</dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">Based In</dt>
                  <dd className="text-slate-700 font-medium">Malaysia 🇲🇾</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Form card */}
          <div className="relative w-full bg-white rounded-2xl border border-slate-100 shadow-[0_4px_32px_0_rgba(0,0,0,0.10)] p-5 sm:p-8">
            {/* Confetti overlay */}
            {confetti.length > 0 && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-10">
                {confetti.map((c) => (
                  <ConfettiPiece
                    key={c.id}
                    style={{
                      left: c.left,
                      top: "20%",
                      background: c.color,
                      animationDelay: c.delay,
                      animationDuration: c.duration,
                    }}
                  />
                ))}
              </div>
            )}

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                  <CheckCircle2 size={36} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Message Sent!</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-xs">
                  We&apos;ll get back to you within 2 hours during office hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 btn-secondary text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-brand-navy mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all duration-200 bg-slate-50 hover:bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all duration-200 bg-slate-50 hover:bg-white"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all duration-200 bg-slate-50 hover:bg-white"
                      placeholder="+60 1X-XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all duration-200 resize-none bg-slate-50 hover:bg-white"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      Something went wrong. Please try WhatsApp instead.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 w-full bg-brand-blue text-white px-5 py-3.5 rounded-lg font-semibold text-sm hover:bg-brand-blue-dark transition-all duration-200 shadow-sm disabled:opacity-60 group"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
