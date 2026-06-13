import { Metadata } from "next";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Software Products | Spark WhatsApp AI — Rectronx",
  description:
    "Software products built by Rectronx — Spark AI WhatsApp assistant and more.",
};

export default function ProductsPage() {
  return (
    <div className="pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <span className="section-label">Products</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-navy tracking-tight">
            Software We&apos;ve Built
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Beyond client projects, Rectronx builds its own software products.
            Tools that solve real problems for real businesses.
          </p>
        </div>

        <div id="spark" className="card p-10 max-w-3xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
              <MessageSquare size={28} className="text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-brand-navy">Spark</h2>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-brand-blue font-medium mb-4">
                AI-powered WhatsApp assistant for your business
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Spark connects to your WhatsApp number and handles customer
                conversations automatically using AI. Answer FAQs, capture
                leads, send updates, and never miss an inquiry — even while
                you sleep. Built specifically for Malaysian SMEs.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Auto-reply customer messages with AI",
                  "Capture and qualify leads automatically",
                  "Integrate with your existing business workflow",
                  "Dashboard to monitor all conversations",
                  "Setup in minutes, no technical knowledge needed",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <WhatsAppButton
                  label="Get Spark for Your Business"
                  message="Hi! I'm interested in Spark for my business. Can you tell me more?"
                />
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

        <div className="mt-10 card p-10 max-w-3xl mx-auto text-center border-dashed">
          <h3 className="text-lg font-semibold text-slate-700">More Products in Development</h3>
          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            We&apos;re always building. Follow us on social media to be the first to know.
          </p>
        </div>
      </div>
    </div>
  );
}
