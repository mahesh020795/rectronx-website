import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  FileText,
  Globe,
  MessageCircle,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema, serviceSchema } from "@/lib/schema";
import { getAllServicePages } from "@/lib/services";

const BASE = "https://rectronx.com";

export const metadata: Metadata = {
  title: {
    absolute: "FYP Project Services Malaysia | Rectronx",
  },
  description:
    "Rectronx services for FYP project support in Malaysia and Penang: IoT, ESP32, Arduino, software, website, app and AI/ML project planning.",
  keywords: [
    "fyp project services malaysia",
    "fyp project penang",
    "iot project malaysia",
    "esp32 project malaysia",
    "arduino project malaysia",
    "software fyp malaysia",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "FYP Project Services Malaysia | Rectronx",
    description:
      "Clean service hub for Rectronx FYP support: Malaysia, Penang, IoT, ESP32, Arduino, software, website, app and AI/ML projects.",
    url: `${BASE}/services`,
    type: "website",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Rectronx FYP Project Services" }],
  },
};

const mainServices = [
  {
    title: "FYP Project Support",
    description:
      "Turn a rough title into a realistic proposal, architecture, prototype plan, testing flow and presentation-ready explanation.",
    href: "/services/fyp-project-malaysia",
    icon: FileText,
    tags: ["Proposal", "Prototype", "Report"],
  },
  {
    title: "IoT & Embedded Systems",
    description:
      "Sensor monitoring, automation, alerts, dashboards and hardware workflows using ESP32, Arduino, Raspberry Pi and common modules.",
    href: "/services/iot-project-malaysia",
    icon: Cpu,
    tags: ["ESP32", "Arduino", "Sensors"],
  },
  {
    title: "Website & Mobile App Projects",
    description:
      "Student-friendly web apps, mobile apps, admin dashboards, booking systems, Firebase apps and database-driven platforms.",
    href: "/services/software-fyp-malaysia",
    icon: Code2,
    tags: ["Web App", "Mobile App", "Firebase"],
  },
  {
    title: "AI/ML Project Support",
    description:
      "Practical AI/ML scopes with realistic datasets, evaluation metrics and honest limitations for final year project presentation.",
    href: "/topics/ai-ml",
    icon: Bot,
    tags: ["Prediction", "Vision", "Classification"],
  },
  {
    title: "Component & Platform Guidance",
    description:
      "Choose suitable boards, sensors, wireless modules and power approaches before committing to a title or buying parts.",
    href: "/components",
    icon: Cpu,
    tags: ["Components", "Pinout", "Wiring"],
  },
  {
    title: "Commercial Product Development",
    description:
      "For business systems beyond FYP: smart parking, fleet tracking, attendance control, IoT monitoring and software products.",
    href: "/products",
    icon: Globe,
    tags: ["Business", "Dashboard", "Deployment"],
  },
];

const localSupport = [
  {
    title: "Malaysia FYP Support",
    description:
      "For students across Malaysia looking for IoT, embedded, software, app or AI/ML final year project guidance.",
    href: "/services/fyp-project-malaysia",
  },
  {
    title: "Penang FYP Support",
    description:
      "For Penang students who want local Rectronx project support, clearer planning and practical prototype direction.",
    href: "/services/fyp-project-penang",
  },
];

const focusedSupport = [
  { label: "ESP32 Projects", href: "/services/esp32-project-malaysia" },
  { label: "Arduino Projects", href: "/services/arduino-project-malaysia" },
  { label: "IoT Projects", href: "/services/iot-project-malaysia" },
  { label: "Software FYP", href: "/services/software-fyp-malaysia" },
];

export default function ServicesPage() {
  const services = getAllServicePages();

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: BASE },
            { name: "Services", url: `${BASE}/services` },
          ]),
          itemListSchema(
            services.map((service, index) => ({
              name: service.title,
              url: `${BASE}/services/${service.slug}`,
              position: index + 1,
            }))
          ),
          serviceSchema({
            name: "FYP Project Services Malaysia",
            description:
              "Final year project support for Malaysian students across IoT, embedded systems, software, apps and AI/ML.",
            url: `${BASE}/services`,
            areaServed: ["Malaysia", "Penang"],
          }),
        ]}
      />

      <section className="bg-brand-navy px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Services
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Project Services Without the Confusing Scope
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Choose the type of help you need first. If location matters, use the
            local support section below. The project catalog, components and resources
            stay separate so the site remains easy to understand.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">
              Browse Project Ideas <ArrowUpRight size={14} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Discuss a Project <MessageCircle size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Main Services
          </p>
          <h2 className="text-3xl font-bold text-brand-navy">Start with what you want to build</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These are grouped by user intent, not by repeated location keywords. That makes
            the page easier to scan while still keeping the SEO landing pages connected.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-blue hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-blue">
                  Explore service
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
              Local Support
            </p>
            <h2 className="text-3xl font-bold text-brand-navy">Malaysia and Penang pages stay separate</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Location pages are useful for local SEO, but they should not make the main
              Services page feel repetitive. Here they sit in their own small section.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {localSupport.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-brand-blue hover:bg-white hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-blue">
                  View local page
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
                Focused Support
              </p>
              <h2 className="text-2xl font-bold text-brand-navy">Already know your platform?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Jump directly into the platform-specific service pages when you already
                know the project should use ESP32, Arduino, IoT or software.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {focusedSupport.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-brand-blue hover:text-brand-blue"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div className="mb-6 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
            SEO Landing Pages
          </p>
          <h2 className="text-2xl font-bold text-brand-navy">All service pages remain crawlable</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This compact list keeps Google discovery clear without making the top of the
            page feel like the same service repeated several times.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-blue hover:shadow-sm"
            >
              <h3 className="text-sm font-bold text-brand-navy">{service.shortTitle}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{service.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-brand-blue">
                Open page
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            "Services explains how Rectronx can help, while Projects remains the 500+ title database.",
            "Local pages are separated from main services, so the page does not feel repetitive.",
            "Focused platform pages still link into topics, components and project ideas for SEO.",
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <p className="text-sm leading-6 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
