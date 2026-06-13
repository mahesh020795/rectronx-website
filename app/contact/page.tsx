"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("contact_submissions").insert([form]);
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <span className="section-label">Get in Touch</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-navy tracking-tight">
            Let&apos;s Talk
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Have a project in mind? Send us a message and we&apos;ll get back to
            you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-brand-navy mb-2">
                Fastest Way to Reach Us
              </h2>
              <p className="text-slate-500 text-sm mb-4">
                For the quickest response, message us directly on WhatsApp.
                We typically reply within a few hours.
              </p>
              <WhatsAppButton
                label="Open WhatsApp Chat"
                message="Hi Rectronx! I'd like to get in touch."
                className="w-full justify-center"
              />
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h2 className="text-lg font-semibold text-brand-navy mb-4">
                Contact Info
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</dt>
                  <dd>
                    <a href="mailto:rectronx@gmail.com" className="text-slate-700 hover:text-brand-blue transition-colors">
                      rectronx@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">WhatsApp</dt>
                  <dd className="text-slate-700">+60 11-7279 2500</dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">Based In</dt>
                  <dd className="text-slate-700">Malaysia</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="card p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-brand-navy">Message Sent!</h3>
                <p className="text-slate-500 text-sm mt-2">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 btn-secondary text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow"
                    placeholder="+60 1X-XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try WhatsApp instead.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
