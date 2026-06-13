import { Metadata } from "next";
import { Cpu, Code2, Zap, Users } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About Rectronx | Malaysia Tech Studio for FYP & Software Products",
  description:
    "Learn about Rectronx — a tech studio from Malaysia building software products and delivering custom engineering solutions.",
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

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <span className="section-label">About Rectronx</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-navy tracking-tight">
            A Tech Studio from Malaysia
          </h1>
          <p className="mt-5 text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Rectronx started with one goal: help engineering students build
            projects they&apos;re proud of. Today we do that and more — building
            our own software products alongside the client work that started it all.
          </p>
        </div>

        <div className="prose prose-slate max-w-none mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">Our Story</h2>
            <p className="text-slate-600 leading-relaxed">
              Rectronx Circuits was founded to solve a problem every engineering
              student faces: you have a great idea for your Final Year Project, but
              turning that idea into working hardware and software — while juggling
              coursework and exams — is overwhelming.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              We stepped in to bridge that gap. Starting with IoT and Arduino
              projects, we&apos;ve grown into a full-service tech studio handling
              everything from embedded systems to web applications. Along the way,
              we built Spark — our own AI-powered WhatsApp product for businesses.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Today, Rectronx stands as both a trusted FYP partner for hundreds of
              students across Malaysia and a growing software studio shipping
              products used by real businesses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {values.map((v) => (
            <div key={v.title} className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-blue-light flex items-center justify-center mb-4">
                <v.icon size={18} className="text-brand-blue" />
              </div>
              <h3 className="font-semibold text-brand-navy mb-2">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-16 bg-slate-50 rounded-2xl p-8">
          {[
            { value: "100+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Students" },
            { value: "4+", label: "Years Active" },
            { value: "3", label: "Products Built" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-brand-navy">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Want to Work Together?
          </h2>
          <p className="text-slate-500 mb-6">
            Whether it&apos;s a FYP or a software project, we&apos;d love to hear from you.
          </p>
          <WhatsAppButton
            label="Start a Conversation"
            message="Hi Rectronx! I'd like to work together."
          />
        </div>
      </div>
    </div>
  );
}
